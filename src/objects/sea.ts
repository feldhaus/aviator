import {
  BufferGeometry,
  CylinderGeometry,
  Geometry,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
  Vector3,
} from 'three';
import { COLOR } from '../color';
import { HALF_PI, TAU } from '../utils/math';

interface IWaveAnimationData {
  vertex: Vector3,
  position: Vector3;
  angle: number;
  amplitude: number;
  speed: number;
}

/**
 * CylinderGeometry type guards.
 * @param geometry
 */
function isCylinderGeometry(
  geometry: Geometry | BufferGeometry,
): geometry is CylinderGeometry {
  return geometry.type === 'CylinderGeometry';
}

export default class Sea {
  public mesh: Mesh;
  private waves: IWaveAnimationData[];

  constructor() {
    // create the geometry (shape) of the cylinder
    const geometry = new CylinderGeometry(600, 600, 800, 40, 10);

    // rotate the geometry on the x axis
    geometry.applyMatrix4(new Matrix4().makeRotationX(-HALF_PI));

    // ensure the continuity of the waves
    geometry.mergeVertices();

    // create the material
    const material = new MeshPhongMaterial({
      color: COLOR.blue,
      transparent: true,
      opacity: 0.6,
      flatShading: true,
    });

    this.mesh = new Mesh(geometry, material);

    // allow the sea to receive shadows
    this.mesh.receiveShadow = true;

    this.defineWavesAnimationData();
  }

  public update(): void {
    this.moveWaves();
    this.mesh.rotation.z += 0.005;
  }

  /**
   * Store waves data to use in the animation.
   * @param geometry
   */
  private defineWavesAnimationData(): void {
    if (!isCylinderGeometry(this.mesh.geometry)) return;

    // create an array to store new data associated to each vertex
    this.waves = this.mesh.geometry.vertices.reduce(
      (array: IWaveAnimationData[], vertex: Vector3) => [
        ...array,
        {
          vertex,
          position: vertex.clone(),
          angle: Math.random() * TAU,
          amplitude: 5 + Math.random() * 15,
          speed: 0.016 + Math.random() * 0.032,
        },
      ],
      [],
    );
  }

  /**
   * Rotate each vertex of the cylinder around its initial position,
   * by giving it a speed rotation, and a distance (radius of the rotation).
   */
  private moveWaves(): void {
    if (!isCylinderGeometry(this.mesh.geometry)) return;

    this.waves.forEach((data: IWaveAnimationData) => {
      // eslint-disable-next-line no-param-reassign
      data.vertex.x = data.position.x + Math.cos(data.angle) * data.amplitude;
      // eslint-disable-next-line no-param-reassign
      data.vertex.y = data.position.y + Math.sin(data.angle) * data.amplitude;
      // eslint-disable-next-line no-param-reassign
      data.angle += data.speed;
    });

    // tell the renderer that the geometry of the sea has changed
    // three.js caches the geometries and ignores any changes
    this.mesh.geometry.verticesNeedUpdate = true;
  }
}

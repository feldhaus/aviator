import {
  CylinderGeometry,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
} from 'three';
import { COLOR } from './color';

export default class Sea {
  public mesh: Mesh;

  constructor() {
    // create the geometry (shape) of the cylinder
    const geometry = new CylinderGeometry(600, 600, 800, 40, 10);

    // rotate the geometry on the x axis
    geometry.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2));

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
  }

  public update(): void {
    this.mesh.rotation.z += 0.005;
  }
}

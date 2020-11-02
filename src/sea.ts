import {
  CylinderGeometry,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
} from 'three';

export default class Sea {
  public mesh: Mesh;

  constructor() {
    // create the geometry (shape) of the cylinder
    const geometry = new CylinderGeometry(600, 600, 800, 40, 10);

    // rotate the geometry on the x axis
    geometry.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2));

    // create the material
    const material = new MeshPhongMaterial({
      color: 0x68c3c0,
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

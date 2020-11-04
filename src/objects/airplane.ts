import {
  BoxGeometry, Mesh, MeshPhongMaterial, Object3D,
} from 'three';
import { COLOR } from '../color';

export default class AirPlane {
  public mesh: Object3D;
  private propeller: Mesh;

  constructor() {
    // create an empty container that will hold the different parts of the airplane
    this.mesh = new Object3D();

    this.createCockipt();
    this.createEngine();
    this.createTail();
    this.createWing();
    this.createPropeller();
  }

  public update(): void {
    this.propeller.rotation.x += 0.3;
  }

  /**
   * Create the cabin.
   */
  private createCockipt() {
    const geomCockpit = new BoxGeometry(60, 50, 50, 1, 1, 1);
    geomCockpit.vertices[4].y -= 10;
    geomCockpit.vertices[4].z += 20;
    geomCockpit.vertices[5].y -= 10;
    geomCockpit.vertices[5].z -= 20;
    geomCockpit.vertices[6].y += 30;
    geomCockpit.vertices[6].z += 20;
    geomCockpit.vertices[7].y += 30;
    geomCockpit.vertices[7].z -= 20;
    const matCockpit = new MeshPhongMaterial({
      color: COLOR.red,
      flatShading: true,
    });
    const cockpit = new Mesh(geomCockpit, matCockpit);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.mesh.add(cockpit);
  }

  /**
   * Create the engine.
   */
  private createEngine() {
    const geomEngine = new BoxGeometry(20, 50, 50, 1, 1, 1);
    const matEngine = new MeshPhongMaterial({
      color: COLOR.white,
      flatShading: true,
    });
    const engine = new Mesh(geomEngine, matEngine);
    engine.position.x = 40;
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.mesh.add(engine);
  }

  /**
   * Create the tail.
   */
  private createTail() {
    const geomTail = new BoxGeometry(15, 20, 5, 1, 1, 1);
    const matTail = new MeshPhongMaterial({
      color: COLOR.red,
      flatShading: true,
    });
    const tailPlane = new Mesh(geomTail, matTail);
    tailPlane.position.set(-35, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);
  }

  /**
   * Create the wing.
   */
  private createWing() {
    const geomWing = new BoxGeometry(40, 8, 150, 1, 1, 1);
    geomWing.vertices[0].z = 30;
    geomWing.vertices[2].z = 30;
    geomWing.vertices[1].z = -30;
    geomWing.vertices[3].z = -30;
    const matWing = new MeshPhongMaterial({
      color: COLOR.red,
      flatShading: true,
    });
    const sideWing = new Mesh(geomWing, matWing);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    this.mesh.add(sideWing);
  }

  /**
   * Create the propeller.
   */
  private createPropeller() {
    const geomPropeller = new BoxGeometry(20, 10, 10, 1, 1, 1);
    const matPropeller = new MeshPhongMaterial({
      color: COLOR.brown,
      flatShading: true,
    });
    this.propeller = new Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    const geomBlade = new BoxGeometry(1, 100, 20, 1, 1, 1);
    const matBlade = new MeshPhongMaterial({
      color: COLOR.brownDark,
      flatShading: true,
    });

    const blade = new Mesh(geomBlade, matBlade);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.propeller.add(blade);
    this.propeller.position.set(50, 0, 0);
    this.mesh.add(this.propeller);
  }
}
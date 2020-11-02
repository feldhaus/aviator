import {
  BoxGeometry, Mesh, MeshPhongMaterial, Object3D,
} from 'three';

export default class AirPlane {
  public mesh: Object3D;
  private propeller: Mesh;

  constructor() {
    this.mesh = new Object3D();

    this.createCabin();
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
  private createCabin() {
    const geomCockpit = new BoxGeometry(60, 50, 50, 1, 1, 1);
    const matCockpit = new MeshPhongMaterial({
      color: 0xf25346,
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
      color: 0xd8d0d1,
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
    const geomTailPlane = new BoxGeometry(15, 20, 5, 1, 1, 1);
    const matTailPlane = new MeshPhongMaterial({
      color: 0xf25346,
      flatShading: true,
    });
    const tailPlane = new Mesh(geomTailPlane, matTailPlane);
    tailPlane.position.set(-35, 25, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    this.mesh.add(tailPlane);
  }

  /**
   * Create the wing.
   */
  private createWing() {
    const geomSideWing = new BoxGeometry(40, 8, 150, 1, 1, 1);
    const matSideWing = new MeshPhongMaterial({
      color: 0xf25346,
      flatShading: true,
    });
    const sideWing = new Mesh(geomSideWing, matSideWing);
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
      color: 0x59332e,
      flatShading: true,
    });
    this.propeller = new Mesh(geomPropeller, matPropeller);
    this.propeller.castShadow = true;
    this.propeller.receiveShadow = true;

    const geomBlade = new BoxGeometry(1, 100, 20, 1, 1, 1);
    const matBlade = new MeshPhongMaterial({
      color: 0x23190f,
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

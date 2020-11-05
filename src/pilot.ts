import {
  BoxGeometry,
  Matrix4,
  Mesh,
  MeshLambertMaterial,
  MeshPhongMaterial,
  Object3D,
} from 'three';
import { COLOR } from './color';

export default class Pilot {
  public mesh: Object3D;
  private angleHairs: number;
  private hairsTop: Object3D;

  constructor() {
    // create an empty container that will hold the different parts of the pilot
    this.mesh = new Object3D();

    // angleHairs is a property used to animate the hair later
    this.angleHairs = 0;

    this.createBody();
    this.createHead();
    this.createHair();
    this.createGlass();
  }

  public update() {
    // get the hair
    const hairs = this.hairsTop.children;

    // update them according to the angle angleHairs
    const l = hairs.length;
    for (let i = 0; i < l; i++) {
      const h = hairs[i];
      // each hair element will scale on cyclical basis between 75% and 100% of its original size
      h.scale.y = 0.75 + Math.cos(this.angleHairs + i / 3) * 0.25;
    }
    // increment the angle for the next frame
    this.angleHairs += 0.16;
  }

  private createBody() {
    // Body of the pilot
    const bodyGeom = new BoxGeometry(15, 15, 15);
    const bodyMat = new MeshPhongMaterial({
      color: COLOR.brown,
      flatShading: true,
    });
    const body = new Mesh(bodyGeom, bodyMat);
    body.position.set(2, -12, 0);
    this.mesh.add(body);
  }

  private createHead() {
    const faceGeom = new BoxGeometry(10, 10, 10);
    const faceMat = new MeshLambertMaterial({
      color: COLOR.pink,
    });
    const face = new Mesh(faceGeom, faceMat);
    this.mesh.add(face);

    const earGeom = new BoxGeometry(2, 3, 2);

    const earL = new Mesh(earGeom, faceMat);
    earL.position.set(0, 0, -6);
    this.mesh.add(earL);

    const earR = earL.clone();
    earR.position.set(0, 0, 6);
    this.mesh.add(earR);
  }

  private createHair() {
    const hairGeom = new BoxGeometry(4, 4, 4);
    const hairMat = new MeshLambertMaterial({
      color: COLOR.brown,
    });
    const hair = new Mesh(hairGeom, hairMat);
    // Align the shape of the hair to its bottom boundary, that will make it easier to scale.
    hair.geometry.applyMatrix4(new Matrix4().makeTranslation(0, 2, 0));

    // create a container for the hair
    const hairs = new Object3D();

    // create a container for the hairs at the top
    // of the head (the ones that will be animated)
    this.hairsTop = new Object3D();

    // create the hairs at the top of the head
    // and position them on a 3 x 4 grid
    for (let i = 0; i < 12; i++) {
      const h = hair.clone();
      const col = i % 3;
      const row = Math.floor(i / 3);
      const startPosZ = -4;
      const startPosX = -4;
      h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
      this.hairsTop.add(h);
    }
    hairs.add(this.hairsTop);

    // create the hairs at the side of the face
    const hairSideGeom = new BoxGeometry(12, 4, 2);
    hairSideGeom.applyMatrix4(new Matrix4().makeTranslation(-6, 0, 0));
    const hairSideR = new Mesh(hairSideGeom, hairMat);
    const hairSideL = hairSideR.clone();
    hairSideR.position.set(8, -2, 6);
    hairSideL.position.set(8, -2, -6);
    hairs.add(hairSideR);
    hairs.add(hairSideL);

    // create the hairs at the back of the head
    const hairBackGeom = new BoxGeometry(2, 8, 10);
    const hairBack = new Mesh(hairBackGeom, hairMat);
    hairBack.position.set(-1, -4, 0);
    hairs.add(hairBack);
    hairs.position.set(-5, 5, 0);

    this.mesh.add(hairs);
  }

  private createGlass() {
    const glassGeom = new BoxGeometry(5, 5, 5);
    const glassMat = new MeshLambertMaterial({
      color: COLOR.brown,
    });
    const glassR = new Mesh(glassGeom, glassMat);
    glassR.position.set(6, 0, 3);
    const glassL = glassR.clone();
    glassL.position.z = -glassR.position.z;

    const glassAGeom = new BoxGeometry(11, 1, 11);
    const glassA = new Mesh(glassAGeom, glassMat);
    this.mesh.add(glassR);
    this.mesh.add(glassL);
    this.mesh.add(glassA);
  }
}

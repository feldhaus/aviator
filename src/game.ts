import {
  DirectionalLight,
  Fog,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import Sea from './sea';

export default class Game {
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;

  constructor(width: number, height: number) {
    this.createScene(width, height);
    this.createLights();
    this.createSea();
  }

  // eslint-disable-next-line no-undef
  public get view(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  /**
   * Render the scene.
   */
  public update(): void {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Update height and width of the renderer and the camera.
   * @param width
   * @param height
   */
  public resize(width: number, height: number): void {
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Set up the scene, the camera and the renderer.
   * @param width
   * @param height
   */
  private createScene(width: number, height: number): void {
    // create the scene
    this.scene = new Scene();

    // add a fog effect to the scene
    // same color as the background color
    this.scene.fog = new Fog(0xf7d9aa, 100, 950);

    // create the camera and set its position
    this.camera = new PerspectiveCamera(60, width / height, 1, 1000);
    this.camera.position.x = 0;
    this.camera.position.z = 200;
    this.camera.position.y = 100;

    // create the renderer
    this.renderer = new WebGLRenderer({
      // allow transparency to show the gradient background
      alpha: true,
      // activate the anti-aliasing
      // this is less performant but, as the project is low-poly based, it should be fine :)
      antialias: true,
    });

    // define the size of the renderer
    this.renderer.setSize(width, height);

    // enable shadow rendering
    this.renderer.shadowMap.enabled = true;
  }

  /**
   * Create and set up the lights.
   */
  private createLights(): void {
    // a hemisphere light is a gradient colored light
    const hemisphereLight = new HemisphereLight(
      // the sky color
      0xaaaaaa,
      // the ground color
      0x000000,
      // intensity of the light
      0.9,
    );

    // a directional light shines from a specific direction
    // it acts like the sun, that means that all the rays produced are parallel
    const shadowLight = new DirectionalLight(0xffffff, 0.9);

    // set the direction of the light
    shadowLight.position.set(150, 350, 350);

    // allow shadow casting
    shadowLight.castShadow = true;

    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // define the resolution of the shadow
    // the higher the better, but also the more expensive and less performant
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // to activate the lights, just add them to the scene
    this.scene.add(hemisphereLight);
    this.scene.add(shadowLight);
  }

  /**
   * Create the sea.
   */
  private createSea(): void {
    const sea = new Sea();
    sea.mesh.position.y = -600;
    this.scene.add(sea.mesh);
  }
}

import Game from './game';

const game = new Game(window.innerWidth, window.innerHeight);

window.onload = (): void => {
  // eslint-disable-next-line no-console
  console.log('loaded');

  document.body.appendChild(game.view);
  game.resize(window.innerWidth, window.innerHeight);

  function animate() {
    requestAnimationFrame(animate);
    game.update();
  }
  requestAnimationFrame(animate);
};

window.onresize = (): void => {
  // eslint-disable-next-line no-console
  console.log('resize', window.innerWidth, window.innerHeight);
  game.resize(window.innerWidth, window.innerHeight);
};

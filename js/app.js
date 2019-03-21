(() => {
  /* The main handler for the app */
  class ColorHandler {

    static init() {
      // Store the color container.
      this.container = document.querySelector('.colors__container');
      // Store the header color container.
      this.headerColor = document.querySelector('.header__color');
      // Store the start button.
      this.startBtn = document.querySelector('#start');
      this.startBtn.onclick = () => this.start();

      // Store the message container.
      this.messageContainer = document.querySelector('.navbar__message');

      // Set the current level.
      this.level = 'easy';
      this.initLevels();

      this.start();
    }

    static start() {
      // Empty the color box container.
      this.container.innerHTML = '';
      // Set the correct class to the levels btns.
      this.levels.forEach(btn => btn.id === this.level ? btn.classList.add('is-active') : btn.classList.remove('is-active'));

      // Clear the message.
      this.setMessage('', true);
      // Unset the background to the header.
      this.headerColor.parentElement.style.backgroundColor = '';

      // Start the level based on the current level.
      switch (this.level) {
        case 'hard':
          this.startHardLevel();
          break;
        default:
          this.startEasyLevel();
      }
    }

    /* Generate and place the color boxes in the display */
    static generateColorBox(num) {
      this.colorBoxes = [];
      for(let i = 0; i < num; i++) {
        this.colorBoxes.push(new ColorBox(...getRandomColor(0, 255), this.container));
      }
      this.setCurrentColor(num);
    }

    /* Start the levels */
    static startHardLevel() {
      this.generateColorBox(6);
    }

    static startEasyLevel() {
      this.generateColorBox(3);
    }

    /* Set the current color to select and change the header */
    static setCurrentColor(num) {
      this.currentColor = this.colorBoxes[getRandomInt(0, num - 1)].color;
      this.headerColor.innerHTML = `RGB(${this.currentColor})`;
    }

    static initLevels() {
      // Store the levels buttons.
      let levels = document.querySelector('.navbar__levels').children;
      this.levels = Array.from(levels);

      this.levels.forEach(btn => btn.onclick = (e) => {
        this.level = e.target.id;
        this.start();
      });
    }

    static setMessage(msg, status) {
      if (status) {
        this.messageContainer.classList.add('success');
        this.messageContainer.classList.remove('failure');
      } else {
        this.messageContainer.classList.add('failure');
        this.messageContainer.classList.remove('success');
      }
      this.messageContainer.innerHTML = msg;
    }

  }

  /* Represents a color box */
  class ColorBox {

    constructor(red, green, blue, container) {
      // Create the colorbox element.
      this.el = document.createElement('div');
      this.el.classList.add('colors__picker', 'btn');

      // Add the background color
      this.color = colorToString(red, green, blue);
      this.el.style.backgroundColor = `rgb(${colorToString(red, green, blue)})`;

      // Append the color in the container.
      container.appendChild(this.el);

      // Add the onclick listener.
      this.el.onclick = this.onClick.bind(this);
    }

    onClick() {
      // Check if the color is the same with the current color
      if (this.color === ColorHandler.currentColor) {
        // Set the success message
        ColorHandler.setMessage('Success!', true);
        // Set the background to the header
        ColorHandler.headerColor.parentElement.style.backgroundColor = `rgb(${this.color})`;
        // Set the background to all the color boxes and remove the click listener
        ColorHandler.colorBoxes.forEach(box => {
          box.el.classList.remove('btn');
          box.el.onclick = ColorHandler.start.bind(ColorHandler);
          box.el.style.backgroundColor = `rgb(${this.color})`;
        });
      } else {
        // Remove the btn class and the listener.
        this.el.classList.remove('btn');
        this.el.style.backgroundColor = '';
        this.el.onclick = null;
        ColorHandler.setMessage('Try Again!', false);
      }
    }

  }

  /* Turn color values into string */
  function colorToString(red, green, blue) {
    return `${ red }, ${ green }, ${ blue }`;
  }

  /* Get a random integer between min max values */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /* Get a random color betwwen min max values */
  function getRandomColor(min, max) {
    if (min < 0 || max > 255 || min > 255 || max < 0) {
      console.log('Min and max should be between 0 - 255 values!');
      return false;
    }
    if (min > max || min === max) {
      console.log('Min should be smaller than max!');
      return false;
    }
    // Generate 3 random numbers for red, green and blue
    let red = getRandomInt(min, max);
    let green = getRandomInt(min, max);
    let blue = getRandomInt(min, max);

    return [red, green, blue];
  }

  /* Run everything when the dom loads */
  document.addEventListener('DOMContentLoaded', ColorHandler.init.bind(ColorHandler));
})();

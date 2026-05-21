/* /blocks/teaser/teaser.js */

/**
 * Bock options are applied as classes to the block's DOM
 * element along side the `block` and `<block-name>` classes.
 *
 * @param {HTMLElement} block represents the block's' DOM element/tree
 * */
function getOptions(block) {
  // Get the block's classes, excluding 'block' and 'teaser'.
  return [...block.classList].filter((c) => !['block', 'teaser'].includes(c));
}

/**
* Adds a zoom effect to image using event listeners.
*
* When the CTA button is hovered over, the image zooms in.
*
* @param {HTMLElement} block represents the block's' DOM tree
*/
function addEventListeners(block) {
  const button = block.querySelector('.button');
  const image = block.querySelector('.image');

  if (!button || !image) return;

  button.addEventListener('mouseover', () => {
    image.classList.add('zoom');
  });

  button.addEventListener('mouseout', () => {
    image.classList.remove('zoom');
  });
}

/**
 * Entry point to block's JavaScript.
 * Must be exported as default and accept a block's DOM element.
 * This function is called by the project's style.js, and passed the block's element.
 *
 * @param {HTMLElement} block represents the block's' DOM element/tree
 */
export default function decorate(block) {
/* This JavaScript makes minor adjustments to the block's DOM */

  /* Common treatments for all options */
  const content = block.querySelector(':scope > div:last-child');
  const title = block.querySelector('h1,h2,h3,h4,h5,h6') || content?.querySelector('p:first-of-type');
  const image = block.querySelector('img');

  content?.classList.add('content');
  title?.classList.add('title');
  image?.classList.add('image');

  // Process each paragraph and mark it as text or terms-and-conditions
  block.querySelectorAll('p').forEach((p) => {
    const innerHTML = p.innerHTML?.trim();
    if (innerHTML?.startsWith('Terms and conditions:')) {
      p.classList.add('terms-and-conditions');
    }
  });

  /* Conditional treatments for specific options */
  const options = getOptions(block);
  if (options.includes('side-by-side')) {
    /* For side-by-side teaser, add the image-wrapper a higher-level div to support CSS */
    block.querySelector(':scope > div:first-child')?.classList.add('image-wrapper');
  } else if (!options.length) {
    /* For the default option, add the image-wrapper to the picture element to support CSS */
    block.querySelector('picture')?.classList.add('image-wrapper');
  }

  addEventListeners(block);
}

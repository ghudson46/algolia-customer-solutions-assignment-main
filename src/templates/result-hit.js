const resultHit = (hit, { sendEvent }) => {
  return `
    <a class="result-hit">
      <div class="result-hit__image-container">
        <img class="result-hit__image" src="${hit.image}" />
      </div>
      <div class="result-hit__details">
        <h3 class="result-hit__name">${hit._highlightResult.name.value}</h3>
        <p class="result-hit__price">$${hit.price}</p>
      </div>
      <div class="result-hit__controls">
        <button id="view-item-${hit.objectID}" class="result-hit__view">View</button>
        <button id="add-to-cart-${hit.objectID}" class="result-hit__cart">Add To Cart</button>
        <span id="cart-message-${hit.objectID}" class="cart-message" style="display:none; margin-left: 8px; color: green; font-weight: bold;">
          Added to cart
        </span>
      </div>
    </a>
  `;
};

export const attachEventListeners = (hit, sendEvent, queryID) => {
  const viewButton = document.getElementById(`view-item-${hit.objectID}`);
  const addToCartButton = document.getElementById(`add-to-cart-${hit.objectID}`);
  const cartMessage = document.getElementById(`cart-message-${hit.objectID}`);

  if (viewButton) {
    viewButton.addEventListener('click', () => {
      sendEvent('click', hit, "Product Clicked", { queryID });
    });
  }

  if (addToCartButton) {
    addToCartButton.addEventListener('click', () => {
      sendEvent('conversion', hit, "Product Added to Cart", { queryID });

      // Show the "Added to cart" message
      if (cartMessage) {
        cartMessage.style.display = 'inline';
        setTimeout(() => {
          cartMessage.style.display = 'none';
        }, 2000); // Hide after 2 seconds
      }
    });
  }
};

export default resultHit;

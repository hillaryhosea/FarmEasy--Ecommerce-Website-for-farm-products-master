function createProductCard(product) {
    return `
      <div class="col-md-3">
        <div class="product-top">
          <img src="${product.imageUrl}">
          <div class="overlay-right">
            <button type="button" class="btn btn-secondary" title="Quick Shop">
              <i class="fa fa-eye"></i>
            </button>
            <button type="button" class="btn btn-secondary" title="Add to Wishlist">
              <i class="fa fa-heart-o"></i>
            </button>
            <button type="button" class="btn btn-secondary" title="Add to Cart">
              <i class="fa fa-shopping-cart"></i>
            </button>
          </div>
        </div>
        <div class="product-bottom text-center">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-half-o"></i>
          <h3>${product.name}</h3>
          <div class="product-description" data-name="${product.name}" data-price="${product.price}">
            <p class="product-price">&#8377; ${product.price}</p>
            <form class="add-to-cart" action="cart.html">
              <div>
                <label for="qty-${product.name}">Quantity</label>
                <input type="text" name="qty-${product.name}" id="qty-${product.name}" class="qty" value="1" />
              </div>
              <p><input type="submit" value="Add to cart" class="btn" /></p>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  
# Your Lovable Shop

i attached a pic how i want the website, dont worry about the pics in, i will change it. on the top i want in the right corner a search button, a login button and a basket. below i want shop, about us, payment policy, shipping terms button. where is the "flour & grains" etc thats where i want the categories of the product, below the favorites. and the footer will be the contact          i want a Flutter e-commerce application structured around modular page views, centralized callbacks, and state-driven UI updates. if i open any categories then coming same style page like this with the products. if i click on homescreen or in the category any product the i wanna see the same style




App Structure




Models (lib/models/): Stores data structures such as Product (product.dart) to hold product details across the app.

Product Views (lib/product_detail_page.dart): Renders detailed item views, quantity selectors, suggested items, and app bar actions.

Payment & Utilities (lib/payment_guide_page.dart): Contains user payment instructions and external link handling via url_launcher.

How It Works




State & Callbacks: The application uses a top-down data flow. Parent widgets manage the state and pass properties (cart, isLoggedIn, userEmail) and triggers (onAddToCart, onOpenCart, onShowAuth, onSearch, onSelectCategory) to child screens.

Cart System: Selecting quantity and clicking "Add to Cart" passes item quantities to onAddToCart and updates the app bar badge count based on cart.length. Tapping the cart icon calls onOpenCart to trigger the shopping cart drawer or popup.

Authentication Flow: The app header dynamically displays a "Log In / Sign Up" button when isLoggedIn is false, or switches to display the user's email address once authenticated.

Navigation: Selecting suggested products replaces the current route to update the view, while category selection and search triggers delegate filtering back to the main app view.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/da72c561-5eb3-4016-8e36-141c9520a88b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

# Shopping Cart Kata

Try it out at https://shoppingkata.vercel.app/

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Running the Tests](#running-the-tests)

## Overview

This is a simple ReactJS/NextJS front-end that allows a user to view some products and interact with a shopping cart as follows:

- see products and their details
- add a product to their shopping cart
- see products in their shopping cart
- remove one product from their cart
- remove all products from their cart with a single action
- increase and decrease the quantity of an item in the cart

I have:

1. used a clean folder structure
2. used Create Next App (instead of Create React App)
3. used `/products.json` to build the product catalogue
4. used React Bootstrap
5. used TDD (see the git history), and included both e2e and unit tests. As the complexity of this task was mainly in the effects of the add/remove items buttons, I mainly used integration tests to be confident about these interactions. I unit tested key functions where useful. I did all this using Jest and React Testing Library, and did not feel Cypress would add anything on top of those e2e tests. If the project were to grow, however, they would probably come in use.
6. included TypeScript types and interfaces.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

[Download Node.js v8 or above](https://github.com/nodejs/node#download)

### Installing

Clone the repo

```bash
git clone git@github.com:rwalle61/shopping-cart-kata.git
```

Install dependencies

```bash
yarn install
```

### Run the app

```bash
# dev mode
yarn dev

# production
yarn build
yarn start
```

The app will be running at `http://localhost:3000`.

## Running the Tests

### Jest watch mode

```bash
yarn test
```

### All tests

```bash
yarn test:ci
```

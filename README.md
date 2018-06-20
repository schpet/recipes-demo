# Recipes Demo

Trying out a couple things:

- a rails api serving graphql
- a rails frontend app serving a react app styled with react-native-web, bundled
  with webpack via webpacker
- a react native app using the same code as the web app

## URLs

https://schpet-recipes-demo.herokuapp.com/

## Setup

```
cd web
bundle install
yarn
bin/rails s

# for native app
bin/setup # <-- does npm link type of thing
cd native
yarn
yarn start
```

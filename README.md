# Moneyflow wiki

## Check the online wiki
Just follow this [link](https://moneyflow-wiki.herokuapp.com/)

## Installation

Clone this repo and install dependencies:

```
git clone https://github.com/MathieuVeber/moneyflow-demo
// OR
git clone git@github.com:MathieuVeber/moneyflow-demo.git

cd moneyflow-demo/frontend
yarn install

cd ../backend
yarn install
```

Add a `.env` file in the `backend` folder with the following configuration:
```
DATABASE_URL=<database_url>
NODE_ENV=<development|production>
```

## Run locally

Run both backend and frontend

```
cd moneyflow-demo/backend
yarn build
yarn start
```

```
cd ../frontend
yarn start
```
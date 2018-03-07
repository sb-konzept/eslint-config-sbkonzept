# eslint-config-sbkonzept

This package provides our .eslintrc as an extensible shared config.

## Usage

We export three ESLint configurations for your usage.

### eslint-config-sbkonzept

Our default export contains all of our ESLint rules, including ECMAScript 6+ and React. It requires `eslint`, `eslint-plugin-import`, `eslint-plugin-react`, `eslint-plugin-jsx-a11y` and `babel-eslint`.

If you use yarn, run `cat node_modules/eslint-config-sbkonzept/package.json | jq .peerDependencies` to list the peer dependencies and versions, then run `yarn add --dev <dependency>@<version>` for each listed peer dependency.

1. Install the correct versions of each package, which are listed by the command:

  ```sh
  cat node_modules/eslint-config-sbkonzept/package.json | jq .peerDependencies
  ```

  Linux/OSX users can run

  ```sh
  yarn add -D sb-konzept/eslint-config-sbkonzept
  cat node_modules/eslint-config-sbkonzept/package.json | jq -M .peerDependencies | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add -D
  ```

  Which produces and runs a command like:

  ```sh
  yarn add --dev eslint-config-airbnb eslint@^#.#.# eslint-plugin-jsx-a11y@^#.#.# eslint-plugin-import@^#.#.# eslint-plugin-react@^#.#.# babel-eslint@^#.#.#
  ```

2. Add `"extends": "sbkonzept"` to your package.json under the key `eslintConfig`

  ```json
  {
    "eslintConfig": {
      "extends": "sbkonzept"
    }
  }
  ```

3. Install `prettier-eslint-cli`

  ```sh
  yarn add --dev prettier-eslint-cli
  ```

4. Add additional scripts to your package.json

  ```json
  {
    "scripts": {
      "lint": "eslint src",
      "prettify": "prettier-eslint src/**/*.js --write"
    }
  }
  ```

  ## Git-Hooks

  1. Install `husky` and `lint-staged`

  ```sh
  yarn add -D lint-staged husky
  ```

  2. Add `lint-staged` config to the package.json

  ```json
  {
    "lint-staged": {
      "*.js": [
        "yarn prettify",
        "yarn lint",
        "git add"
      ]
    }
  }
  ```
  3. Add a precommit script to the package.json

  ```json
  {
    "scripts": {
      "precommit": "lint-staged"
    }
  }
  ```

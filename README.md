# Package Template

### Overview

Welcome to the Package Template repository! This template serves as a foundational structure for creating TypeScript
packages. Leveraging Rollup and its associated plugins, it streamlines the process of building and transforming code
into various Node.js module types, including ES Modules and CommonJS.

### Features

- **Tree-shaking**: With Rollup as the build tool, the template inherently provides tree shaking, optimizing bundle size
  by removing unused code.
- **Type-safety**: TypeScript integration ensures type safety throughout development, with the template generating type
  definitions for improved code completion.
- **Minification**: The output code is minified using `@rollup/plugin-terse`, reducing file size for improved
  performance.
- **Multiple formats**: The final build supports multiple Node.js module formats, including CommonJS and ES Modules,
  offering flexibility for different environments.
- **Prettier**: Integrated Prettier ensures consistent code formatting, enhancing readability and maintainability.

### Getting Started

To begin, clone the project to your local machine:

```bash
git clone https://github.com/Bonny-kato/pkg-template.git dream-library
```

Navigate to the project folder you specified, in this case `dream-library`

```bash
cd dream-library
```

Open the folder in your favorite editor to start coding!

### Folder struture

- `index.ts`- Located at the root folder, this file exports everything from the src folder.
- `src/index` - Export code from this folder to make it accessible from the library.
- `.prettierrc`- Prettier configuration file.
- `rollup.config.mjs` - Rollup configuration file
- `tsconfig.json` - Typescript configuration file

<br/>

### Testing Your Package Local

Testing your package locally is very crucial, and it is a highly recommended step before publishing your package. Here
are the steps to follow to test your library locally.

1. **Build for production**: Run build command to optimize code for the production, to do so run the following command

    ```bash
    npm run build
    ```

2. **Link your local package**: From the root of your package directory create a symlink globally using `npm link`.

    ```bash
    npm link
    ```
   This will create a symlink globally so that you can use your package as if it were installed globally.
   <br/>
   <br/>

3. **Use the local package in your project**: In the directory of your project where you intend to utilize the local
   package, create a symlink to it using `npm link <package_name>`.

    ```bash
    cd my-project
    npm link my-package
    ```

   This command will create a symlink in your project's `node_modules` folder that points to your local package.
   You can now utilize `my-package` in your project just like any other installed package. Any changes made
   to `my-package` will be instantly reflected in your project, without the necessity of republishing or reinstalling
   the package.

    <br/>

4. **Unlinking**:

   Remember to unlink the package once you've finished testing, using `npm unlink <package_name>` in your project
   directory.

    ```bash
    cd my-project
    npm unlink my-package
    ```

<br/>

### Publish the Package

To publish your package to npm, follow these steps:

1. Ensure you have an npm account. If not, create one at [npmjs.com/signup](https://www.npmjs.com/signup).
2. Log in to npm by running the following command in your terminal and following the prompts:
    ```bash
    npm login
    ```
3. Update the package version in your package.json file.
4. Build your package:
    ```bash
    npm run build
    ```
5. Publish your package to npm:
    ```bash
    npm publish --access public
    ```
   This command will publish your package to npm's public registry.

   <br/>

### Showcase

Check out these libraries built on top of this template:

- [@bonny-kato/httpclient](https://www.npmjs.com/package/@bonny-kato/httpclient) - a simple HTTP client for making
  asynchronous HTTP requests in JavaScript using built-in fetch api
- [@bonny-kato/localstorage](https://www.npmjs.com/package/@bonny-kato/httpclient) - wrapper library for working
  with  `localstorage` browser storage api

### Contributions

Contributions to this starter template are welcome! Your feedback is valuable in improving this template. Feel free to
share your thoughts and suggestions.
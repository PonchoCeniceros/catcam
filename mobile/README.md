

## Build commands
```Bash
npx webpack # build web project
npx light-server -s ./dist -p 3000 # launch server

# create ionic project
ionic capacitor add ios --no-build     
ionic capacitor add android --no-build 

# ionic project synchronization
ionic capacitor sync ios --no-build    
ionic capacitor sync android --no-build

# open ios/android IDE's        
npx cap open ios                       
npx cap open android                   
```


## Dependencies
```Bash
npm init
npm i -D webpack webpack-cli html-webpack-plugin copy-webpack-plugin
npm i -D @babel/core @babel/preset-env @babel/preset-react
npm i -D babel-loader css-loader postcss-loader style-loader prefixer
npm i -D tailwindcss
npm i react react-dom onnxruntime-web
```

## Config files
### Webpack
```Bash
touch webpack.config.js
echo "const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const copyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.index.js'
    },
    plugins: [
        new htmlPlugin({template: './src/index.html'}),
        new copyPlugin({
            patterns: [
              { from: 'src/models/*.onnx', to: '[name][ext]' },
              { from: 'node_modules/onnxruntime-web/dist/*.wasm', to: '[name][ext]' },
            ],
        }),
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: {loader: 'babel-loader'},
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
              'postcss-loader',
            ],
        }]
    },
    mode: 'production'
}
" >> webpack.config.js
```

### Postccs
```Bash
touch postcss.config.js
echo "module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer'),
  ],
}" >> postcss.config.js
```

### Tailwind
```Bash
touch tailwind.config.js
echo "/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
}" >> tailwind.config.js
```

### Babel
```Bash
touch .babelrc
echo "{
  'presets': [
    '@babel/preset-env',
    '@babel/preset-react'
  ]
}
" >> .babelrc
```

## Project structure
```Bash
mkdir ./src
mkdir ./src/components && touch ./src/components/.keep
mkdir ./src/hooks && touch ./src/hooks/.keep
mkdir ./src/helpers && touch ./src/helpers/.keep
mkdir ./src/views
mkdir ./src/views/modals && touch ./src/views/modals/.keep   
mkdir ./src/views/pages && touch ./src/views/pages/.keep
touch ./src/views/app.js
touch ./src/index.js
touch ./src/index.html
mkdir ./src/assets
mkdir ./src/assets/styles
touch ./src/assets/styles/index.css
touch ./src/assets/styles/layout.css
mkdir ./src/models
touch ./src/models/.keep
```

## Project base files
### index.css
```Bash
echo "@tailwind base;
@tailwind components;
@tailwind utilities;
" >> ./src/assets/styles/index.css
```

### index.js
```Bash
echo "import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './views/app';
import './assets/styles/index.css';

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);" >> ./src/index.js
```

### index.html
```Bash
echo "<\!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='UTF-8'>
    <!-- <meta name='viewport' content='width=device-width, initial-scale=1.0'> -->
    <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>App</title>
  </head>
  <body>
    <div id='root'></div>
  </body>
</html>" >> ./src/index.html
```

### app.js
```Bash
echo "import React from 'react';

const App = () => {
  return (
    <h1 className='text-8xl font-extrabold text-transparent bg-clip-text
                   bg-gradient-to-b from-[#45CAFF] via-[#173C5A] to-[#FF1B6B]'>
    Happy coding!
    </h1>
  );
};
export default App;" >> ./src/views/app.js
```

## Mobile project
### Dependences
```Bash
npm i -D @capacitor/core @capacitor/cli
```

### Environment variables
```Bash
appname=nameofyourapp
bundleid=io.ionic.nameofyourapp
```

### Capacitor's config file
```Bash
touch capacitor.config.json
echo "{
  \"appId\": \"${bundleid}\",
  \"appName\": \"${appname}\",
  \"bundledWebRuntime\": false,
  \"npmClient\": \"npm\",
  \"webDir\": \"dist\",
  \"cordova\": {}
}" >> capacitor.config.json
```

### Ionic's config files
```Bash
touch ionic.config.json
echo "{
  \"name\": \"${appname}\",
  \"integrations\": {
    \"capacitor\": {}
  },
  \"type\": \"react\"
}" >> ionic.config.json
```

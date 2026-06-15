---
aliases:
- /fr/serverless/troubleshooting/serverless_tracing_and_bundlers
- /fr/serverless/troubleshooting/serverless_tracing_and_webpack
further_reading:
- link: /serverless/installation/nodejs
  tag: Documentation
  text: Instrumenter des applications Node.js
title: Tracing Lambda Node.js et compatibilité de bundlers
---

## Présentation

Les bibliothèques de tracing Datadog (`dd-trace`) ne sont malheureusement pas compatibles avec les bundlers tels que [Webpack][1] ou [esbuild][2],, en raison de l'utilisation d'importations conditionnelles ainsi que d'autres problèmes. Bien que les bundlers ne puissent pas générer `dd-trace`, votre application peut tout de même utiliser les bibliothèques `dd-trace` et `datadog-lambda-js` fournies par la couche Lambda Datadog prédéfinie. Pour ce faire, suivez les instructions ci-dessous.

## Webpack
1. Suivez les [instructions d'installation pour Node.js][3] et vérifiez que la couche Lambda Datadog pour Node.js a bien été ajoutée à votre fonction Lambda.
2. Excluez `datadog-lambda-js` et `dd-trace`, soit en les supprimant de votre `package.json`, soit en définissant une [règle dʼexclusion][4]. Cela indique au bundler qu'il n'est pas nécessaire de les générer en tant que dépendances, puisqu'ils sont déjà disponibles dans le runtime Lambda fourni par la couche Lambda Datadog.
3. Marquez vos dépendances comme étant [externes][5]. Cela indique au bundler de les exclure du bundle de sortie. Elles seront alors mises en paquets dans `node_modules`.

    **webpack.config.js**

    ```javascript
    const nodeExternals = require("webpack-node-externals");

    module.exports = {
      // Use webpack-node-externals to exclude all node dependencies.
      // You can manually set the externals too.
      externals: [nodeExternals()],
      module: {
        rules: [
          {
            // Provided by the Datadog Lambda layer and the Lambda Runtime.
            exclude: [
              // AWS SDK v3
              /^@aws-sdk.*/,
              // AWS SDK v2
              /aws-sdk/,
              /datadog-lambda-js/,
              /dd-trace/
            ],
          }
        ]
      },
    }
    ```

    Si vous utilisez le plugin `serverless-webpack` et que vous avez défini l'option `includeModules` sur une valeur autre que `false`, le plugin [regroupe automatiquement les modules externes sous `node_modules`][6]. Vous devez donc forcer l'exclusion de `datadog-lambda-js` et `dd-trace`. Ignorez cette étape si vous n'utilisez pas `serverless-webpack` ou que l'option `includeModules` n'est pas définie dans votre fichier `serverless.yml`.

    **serverless.yml**

    ```yaml
    custom:
      webpack:
        # You only need the following if you already have the includeModules option configured.
        includeModules:
          # ... your existing configuration for includeModules
          forceExclude:
            # @aws-sdk for the AWS SDK v3
            - @aws-sdk
            # aws-sdk for the AWS SDK v2
            - aws-sdk
            - datadog-lambda-js
            - dd-trace
        packagerOptions:
          scripts:
            # Optional, only needed when they are included as transitive dependencies 
            - rm -rf node_modules/datadog-lambda-js node_modules/dd-trace
    ```

    Pour mieux contrôler les dépendances qui sont incluses, vous pouvez également inclure votre `webpack.config.js` dans votre configuration `serverless-webpack` :

    ```yaml
    custom:
      webpack:
        forceExclude:
          # @aws-sdk for the AWS SDK v3
          - @aws-sdk
          # aws-sdk for the AWS SDK v2
          - aws-sdk
          - datadog-lambda-js
          - dd-trace
        webpackConfig: 'webpack.config.js'
    ```

## esbuild
1. Suivez les [instructions d'installation pour Node.js][3] et vérifiez que la couche Lambda Datadog pour Node.js a bien été ajoutée à votre fonction Lambda.
2. Supprimez `datadog-lambda-js` et `dd-trace` de votre `package.json` et du processus de build, puisqu'ils sont déjà disponibles dans le runtime Lambda fourni par la couche Lambda Datadog.
3. Marquez vos dépendances comme étant [externes][7]. Cela indique au bundler de les exclure du bundle de sortie. Elles seront alors mises en paquets dans `node_modules`.

    **esbuild.config.js**

    ```javascript
    const esbuild = require('esbuild');

    esbuild.build({
      // ... your existing esbuild configuration
      // Same effect as manually passing each dependency to `external`
      packages: 'external'
    })
    ```

    Si vous utilisez le plugin `serverless-esbuild`, vous pouvez externaliser toutes les dépendances avec `esbuild-node-externals` en tant que plugin esbuild. Cela [met automatiquement en paquet les modules externes sous `node_modules`][8].

    **serverless.yml**

    ```yaml
    custom:
      esbuild:
        exclude: 
          # @aws-sdk for the AWS SDK v3
          - @aws-sdk
          # aws-sdk for the AWS SDK v2
          - aws-sdk
          - datadog-lambda-js
          - dd-trace
        plugins: plugins.js
        # You can also set the specific dependencies to externalize instead of using `plugins`
        external: [...]
    ```

    ```javascript
    // plugins.js
    const { nodeExternalsPlugin } = require('esbuild-node-externals')

    module.exports = [nodeExternalsPlugin()]
    ```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: https://esbuild.github.io/
[3]: /fr/serverless/installation/nodejs
[4]: https://webpack.js.org/configuration/module/#ruleexclude
[5]: https://webpack.js.org/configuration/externals/
[6]: https://github.com/serverless-heaven/serverless-webpack#node-modules--externals
[7]: https://esbuild.github.io/api/#external
[8]: https://www.npmjs.com/package/esbuild-node-externals
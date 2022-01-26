---
title: Tracing Lambda Node.js et compatibilité de webpack
kind: documentation
further_reading:
  - link: /serverless/installation/nodejs
    tag: Documentation
    text: Instrumenter des applications Node.js
---
# Compatibilité

Les bibliothèques de tracing Datadog (`dd-trace`) ne sont malheureusement pas compatibles avec [webpack][1], en raison de l'utilisation d'importations conditionnelles ainsi que d'autres problèmes. Bien que webpack ne puisse pas générer `dd-trace`, votre application peut tout de même utiliser les bibliothèques `dd-trace` et `datadog-lambda-js` fournies par la couche Lambda Datadog prédéfinie. Pour ce faire, suivez les instructions ci-dessous :

1. Suivez les [instructions d'installation pour Node.js][2] et vérifiez que la couche Lambda Datadog a bien été ajoutée à votre fonction Lambda.
2. Définissez `datadog-lambda-js` et `dd-trace` comme des [externals][3] pour webpack. Cela indique à webpack qu'il n'est pas nécessaire de les générer en tant que dépendances, puisqu'ils sont déjà disponibles dans le runtime Lambda fourni par la couche Lambda Datadog.

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // use webpack-node-externals to exclude all node dependencies.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

3. Supprimez `datadog-lambda-js` et `dd-trace` de votre fichier `package.json` et de votre processus de build.
4. Si vous utilisez `serverless-webpack` et Serverless Framework, excluez `datadog-lambda-js` et `dd-trace` de votre fichier `serverless.yml`.

    **serverless.yml**

    ```
    custom:
      webpack:
        includeModules:
          forceExclude:
            - dd-trace
            - datadog-lambda-js
    ```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: /fr/serverless/installation/nodejs
[3]: https://webpack.js.org/configuration/externals/
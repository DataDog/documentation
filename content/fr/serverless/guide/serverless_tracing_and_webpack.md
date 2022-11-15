---
aliases:
- /fr/serverless/troubleshooting/serverless_tracing_and_webpack
further_reading:
- link: /serverless/installation/nodejs
  tag: Documentation
  text: Instrumenter des applications Node.js
kind: documentation
title: Tracing Lambda Node.js et compatibilité de Webpack
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
4. Si vous utilisez le plug-in `serverless-webpack` ou `serverless-esbuild` pour Serverless Framework, excluez `datadog-lambda-js` et `dd-trace` de votre fichier `serverless.yml`.

    **serverless.yml**

    ```
    custom:
      webpack: # for webpack
        includeModules:
          forceExclude:
            - dd-trace
            - datadog-lambda-js
      esbuild: # for esbuild
        exclude: ["dd-trace", "datadog-lambda-js", "aws-sdk"] # aws-sdk is included because it is the default for `exclude`
    ```

    **Remarque :** si vous utilisez des dépendances transitives sur `datadog-lambda-js` ou `dd-trace`, il est possible que cette exclusion ne suffise pas. En effet, **forceExclude** ne permet pas d'éviter l'inclusion d'une de ces bibliothèques. Si vous rencontrez ce problème, vous pouvez essayer de supprimer manuellement ces bibliothèques à l'aide du code suivant :

    ```
    custom:
      webpack:
        packagerOptions:
          scripts:
            - rm -rf node_modules/datadog-lambda-js node_modules/dd-trace
    ```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: /fr/serverless/installation/nodejs
[3]: https://webpack.js.org/configuration/externals/
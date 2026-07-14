---
aliases:
- /fr/serverless/troubleshooting/serverless_tracing_and_webpack
further_reading:
- link: /serverless/installation/nodejs
  tag: Documentation
  text: Instrumenter des applications Node.js
title: Tracing Lambda Node.js et compatibilité de Webpack
---

## Présentation

Les bibliothèques de tracing Datadog (`dd-trace`) ne sont malheureusement pas compatibles avec les bundlers tels que [webpack][1], en raison de l'utilisation d'importations conditionnelles ainsi que d'autres problèmes. Bien que webpack ne puisse pas générer `dd-trace`, votre application peut tout de même utiliser les bibliothèques `dd-trace` et `datadog-lambda-js` fournies par la couche Lambda Datadog prédéfinie. Pour ce faire, suivez les instructions ci-dessous.

## webpack
1. Suivez les [instructions d'installation pour Node.js][2] et vérifiez que la couche Lambda Datadog pour Node.js a bien été ajoutée à votre fonction Lambda.
2. Supprimez `datadog-lambda-js` et `dd-trace` de votre fichier `package.json` et de votre processus de build.
3. Définissez `datadog-lambda-js` et `dd-trace` comme des [externals][3]. Cela indique au bundler qu'il n'est pas nécessaire de les générer en tant que dépendances, puisqu'ils sont déjà disponibles dans le runtime Lambda fourni par la couche Lambda Datadog.

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // use webpack-node-externals to exclude all node dependencies.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

4. Si vous utilisez `serverless-webpack` et que vous avez défini l'option `includeModules` sur une valeur autre que `false`, serverless-webpack [regroupe automatiquement les modules externes sous node_modules][5]. Vous devez donc forcer l'exclusion de `datadog-lambda-js` et `dd-trace`. Ignorez cette étape si vous n'utilisez pas `serverless-webpack` ou que l'option `includeModules` n'est pas définie dans votre fichier serverless.yml.

    **serverless.yml**

    ```
    custom:
      webpack:
        # Note: You only need the following if you already have the includeModules option configured
        includeModules:
          # ... your existing configuration for includeModules
          forceExclude:
            - dd-trace
            - datadog-lambda-js
        packagerOptions:
          scripts:
            # optional, only needed when they are included as transitive dependencies 
            - rm -rf node_modules/datadog-lambda-js node_modules/dd-trace
    ```

## esbuild
1. Suivez les [instructions d'installation pour Node.js][2] et vérifiez que la couche Lambda Datadog pour Node.js a bien été ajoutée à votre fonction Lambda.
2. Supprimez `datadog-lambda-js` et `dd-trace` de votre fichier `package.json` et de votre processus de build.
3. Définissez `datadog-lambda-js` et `dd-trace` comme des [externals][4]. Cela indique au bundler qu'il n'est pas nécessaire de les générer en tant que dépendances, puisqu'ils sont déjà disponibles dans le runtime Lambda fourni par la couche Lambda Datadog.
4. Suivez les étapes indiquées à la rubrique [Prise en charge d'esbuild][6] (en anglais) pour utiliser le plug-in esbuild de Datadog. Celui-ci permet d'instrumenter des dépendances groupées.

    **esbuild.config.js (si vous utilisez esbuild-config)**

    ```
    {
      "external": ["dd-trace", "datadog-lambda-js"],
    }
    ```

    **serverless.yml (si vous utilisez serverless-esbuild)**

    ```
    custom:
      esbuild:
        exclude: ["dd-trace", "datadog-lambda-js", "aws-sdk"] # aws-sdk is needed because it is the default value for `exclude`
    ```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: /fr/serverless/installation/nodejs
[3]: https://webpack.js.org/configuration/externals/
[4]: https://esbuild.github.io/api/#external
[5]: https://github.com/serverless-heaven/serverless-webpack#node-modules--externals
[6]: /fr/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#esbuild-support
---
aliases:
- /es/serverless/troubleshooting/serverless_tracing_and_webpack
further_reading:
- link: /serverless/installation/nodejs
  tag: Documentación
  text: Instrumentación de aplicaciones de Node.js
title: Compatibilidad del rastreo de Lambda y webpack con Node.js
---

## Información general

Las bibliotecas de rastreo de Datadog (`dd-trace`) son conocidas por no ser compatibles con empaquetadores como [webpack][1] debido al uso de importaciones condicionales y otros problemas. Aunque webpack no puede compilar `dd-trace`, tu aplicación puede seguir utilizando las bibliotecas `dd-trace` y `datadog-lambda-js` de la capa de Lambda de Datadog precompilada. Sigue las siguientes instrucciones.

## webpack
1. Sigue las [instrucciones de instalación para Node.js][2] y asegúrate de que la capa de Lambda de Datadog para Node.js se añada a tu función de Lambda.
2. Elimina `datadog-lambda-js` y `dd-trace` de `package.json` y del proceso de compilación.
3. Marca `datadog-lambda-js` y `dd-trace` como [externos][3]. De este modo se indica al empaquetador que omita compilarlos como dependencias, puesto que ya están disponibles en el tiempo de ejecución de Lambda de la capa de Lambda de Datadog.

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // use webpack-node-externals to exclude all node dependencies.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

4. Si utilizas `serverless-webpack` y tienes la opción `includeModules` definida como cualquier valor distinto de `false`, serverless-webpack automáticamente [empaqueta módulos externos en node_modules][5]. Por lo tanto, debes forzar la exclusión de `datadog-lambda-js` y `dd-trace`. Omite este paso si no utilizas `serverless-webpack` o no tienes la opción `includeModules` en tu archivo serverless.yml.

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
1. Sigue las [instrucciones de instalación para Node.js][2] y asegúrate de que la capa de Lambda de Datadog para Node.js se añada a tu función de Lambda.
2. Elimina `datadog-lambda-js` y `dd-trace` de `package.json` y del proceso de compilación.
3. Marca `datadog-lambda-js` y `dd-trace` como [externos][4]. De este modo se indica al empaquetador que omita compilarlos como dependencias, puesto que ya están disponibles en el tiempo de ejecución de Lambda de la capa de Lambda de Datadog.
4. Sigue los pasos de la página de [soporte de Esbuild][6] para utilizar el complemento Esbuild de Datadog. Esto permite la instrumentación de dependencias empaquetadas.

    **esbuild.config.js (si utilizas esbuild-config)**

    ```
    {
      "external": ["dd-trace", "datadog-lambda-js"],
    }
    ```

    **serverless.yml (si utilizas serverless-esbuild)**

    ```
    custom:
      esbuild:
        exclude: ["dd-trace", "datadog-lambda-js", "aws-sdk"] # aws-sdk is needed because it is the default value for `exclude`
    ```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: /es/serverless/installation/nodejs
[3]: https://webpack.js.org/configuration/externals/
[4]: https://esbuild.github.io/api/#external
[5]: https://github.com/serverless-heaven/serverless-webpack#node-modules--externals
[6]: /es/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#esbuild-support
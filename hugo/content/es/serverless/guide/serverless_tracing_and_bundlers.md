---
aliases:
- /es/serverless/troubleshooting/serverless_tracing_and_bundlers
- /es/serverless/troubleshooting/serverless_tracing_and_webpack
further_reading:
- link: /serverless/installation/nodejs
  tag: Documentación
  text: Instrumentación de aplicaciones de Node.js
title: Compatibilidad del rastreo de Lambda y los empaquetadores con Node.js
---

## Información general

Las bibliotecas de rastreo de Datadog (`dd-trace`) son conocidas por no ser compatibles con empaquetadores como [Webpack][1] o [esbuild][2] debido al uso de importaciones condicionales y otros problemas. Aunque los empaquetadores no pueden compilar `dd-trace`, tu aplicación puede seguir utilizando las bibliotecas `dd-trace` y `datadog-lambda-js` de la capa de Lambda de Datadog precompilada. Sigue las instrucciones que se indican abajo.

## Webpack
1. Sigue las [instrucciones de instalación para Node.js][3] y asegúrate de que la capa de Lambda de Datadog para Node.js se añada a tu función de Lambda.
2. Excluye `datadog-lambda-js` y `dd-trace`, ya sea eliminándolos de `package.json` o definiendo una [regla de exclusión][4]. Al excluirlos, se indica al empaquetador que omita compilarlos como dependencias, puesto que ya están disponibles en el tiempo de ejecución de Lambda de la capa de Lambda de Datadog.
3. Marca tus dependencias como [externas][5]. Esto indica al empaquetador que las excluya del paquete de salida; en su lugar, se empaquetan en `node_modules`.

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

    Si utilizas el complemento `serverless-webpack` y tienes la opción `includeModules` definida como cualquier valor distinto de `false`, el complemento automáticamente [empaqueta módulos externos en `node_modules`][6]. Por lo tanto, debes forzar la exclusión de `datadog-lambda-js` y `dd-trace`. Omite este paso si no utilizas `serverless-webpack` o no tienes la opción `includeModules` en tu archivo `serverless.yml`.

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

    Para tener un mayor control sobre qué dependencias se incluyen, también puedes incluir `webpack.config.js` en la configuración de `serverless-webpack`:

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
1. Sigue las [instrucciones de instalación para Node.js][3] y asegúrate de que la capa de Lambda de Datadog para Node.js se añada a tu función de Lambda.
2. Elimina `datadog-lambda-js` y `dd-trace` de `package.json` y del proceso de compilación, puesto que ya están disponibles en el tiempo de ejecución de Lambda de la capa de Lambda de Datadog.
3. Marca tus dependencias como [externas][7]. Esto indica al empaquetador que las excluya del paquete de salida; en su lugar, se empaquetan en `node_modules`.

    **esbuild.config.js**

    ```javascript
    const esbuild = require('esbuild');

    esbuild.build({
      // ... your existing esbuild configuration
      // Same effect as manually passing each dependency to `external`
      packages: 'external'
    })
    ```

    Si utilizas el complemento `serverless-esbuild`, puedes externalizar todas las dependencias con `esbuild-node-externals` como un complemento esbuild. Automáticamente [empaqueta módulos externos en `node_modules`][8].

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

## AWS CDK

Si despliegas funciones de Lambda de Node.js con la construcción `NodeJsFunction`, pero no utilizas `esbuild` ni Typescript, todavía puedes utilizar Datadog para observar tus aplicaciones serverless.

1. Sigue las instrucciones de instalación para Node.js y asegúrate de que la capa de Lambda de Datadog para Node.js se añada a tu función de Lambda.
2. Elimina `datadog-lambda-js` y `dd-trace` de `package.json` y del proceso de compilación, puesto que ya están disponibles en el tiempo de ejecución de Lambda de la capa de Lambda de Datadog.
3. Utiliza la construcción `NodejsFunction` en el CDK. Asegúrate de configurar la propiedad `entry` para que sea la ruta al archivo que contiene el controlador de tu función de Lambda, `depsLockFilePath` como la ruta al archivo de bloqueo para el gestor de paquetes que utilizas y `bundling.commandHooks.beforeBundling` para asegurarte de que todas las dependencias estén instaladas.

   **lambdaFunction.ts**
    ```typescript    
    const nodeFunction = new NodejsFunction(this, "test", {
      runtime: Runtime.NODEJS_20_X,
      entry: './functions/consumer/index.js', // The Javascript file for your Lambda function handler
      handler: 'handler',
      depsLockFilePath: './package-lock.json', // The path to the lock file for your respective package manager (npm, yarn etc)
      bundling: {
        commandHooks: {
          beforeBundling(inputDir: string, outputDir: string) {
            return [
              `cd ${inputDir}`,
              'npm install', // Ensure all dependencies are installed before your Javascript file is zipped and deployed
            ]
          },
          beforeInstall() {
            return []
          },
          afterBundling() {
            return []
          }
        },
        externalModules: ['@aws-sdk/client-dynamodb'] // The AWS SDK is included as part of the Node.js Lambda runtime
      }
    });
    ```

## AWS CDK y esbuild

La construcción `NodeJsFunction` del AWS CDK utiliza esbuild. La configuración predeterminada no es compatible con las bibliotecas de rastreo de Datadog. El CDK permite anular la configuración predeterminada y proporcionar un archivo esbuild personalizado para admitir el empaquetado y las bibliotecas de rastreo de Datadog:

1. Sigue las instrucciones de instalación para Node.js y asegúrate de que la capa de Lambda de Datadog para Node.js se añada a tu función de Lambda.
2. Elimina `datadog-lambda-js` y `dd-trace` de `package.json` y del proceso de compilación, puesto que ya están disponibles en el tiempo de ejecución de Lambda de la capa de Lambda de Datadog.
3. Crea un archivo `esbuild` para cada una de tus funciones de Lambda. Se necesita un archivo `esbuild` por cada función de Lambda para poder especificar los puntos de entrada por separado. Fíjate en las propiedades `entryPoint` y `outfile`. Por ejemplo, si tuvieras una segunda función de Lambda en tu proyecto llamada `producer`, entonces el punto de entrada sería `./functions/producer.ts` y el archivo de salida sería `/out/producer/index.js`.

    **buildConsumer.js**
    ```javascript
    const ddPlugin = require('dd-trace/esbuild')
    const esbuild = require('esbuild')

    esbuild.build({
      entryPoints: ['./functions/consumer.ts'],
      outfile: 'out/consumer/index.js',
      plugins: [ddPlugin],
      // Other esbuild configuration
      external: [
        // esbuild cannot bundle native modules
        '@datadog/native-metrics',

        // required if you use profiling
        '@datadog/pprof',

        // required if you use Datadog security features
        '@datadog/native-appsec',
        '@datadog/native-iast-taint-tracking',
        '@datadog/wasm-js-rewriter',

        // required if you encounter graphql errors during the build step
        'graphql/language/visitor',
        'graphql/language/printer',
        'graphql/utilities',
        '@aws-sdk/client-sqs'

        // if you are using the package, instead of the layer
        'datadog-lambda-js'
      ]
    }).catch((err) => {
      console.error(err)
      process.exit(1)
    })
    ```

4. Cuando definas `NodeJsFunction` en el CDK, utiliza la función `Code.fromCustomCommand` para especificar la ruta a tu archivo `esbuild` personalizado y una carpeta de salida. Para cada función de Lambda, especifica el archivo `esbuild` individual definido en el tercer paso. La carpeta de salida debe coincidir con la carpeta del `outfile` en tu archivo `esbuild`.

    **lambdaFunction.ts**
    ```typescript
    // This path will likely be different for each individual Lambda function
    const pathToBuildFile = '../functions/buildConsumer.js';

    // Ensure the files for each Lambda function are generated into their own directory
    const pathToOutputFolder = '../out/consumer/';

    const code = Code.fromCustomCommand(
      pathToOutputFolder,
      ['node', pathToBuildFile],
    );

    const consumerLambdaFunction = new NodejsFunction(this, props.functionName, {
      runtime: Runtime.NODEJS_20_X,
      code: code,
      handler: 'index.handler',
      memorySize: 512,
      bundling: {
        platform: 'node',
        esbuildArgs: {
          "--bundle": "true"
        },
        target: 'node20'
      }
    });
    ```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: https://esbuild.github.io/
[3]: /es/serverless/installation/nodejs
[4]: https://webpack.js.org/configuration/module/#ruleexclude
[5]: https://webpack.js.org/configuration/externals/
[6]: https://github.com/serverless-heaven/serverless-webpack#node-modules--externals
[7]: https://esbuild.github.io/api/#external
[8]: https://www.npmjs.com/package/esbuild-node-externals

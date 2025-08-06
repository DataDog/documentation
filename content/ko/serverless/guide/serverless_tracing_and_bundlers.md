---
aliases:
- /ko/serverless/troubleshooting/serverless_tracing_and_bundlers
- /ko/serverless/troubleshooting/serverless_tracing_and_webpack
further_reading:
- link: /serverless/installation/nodejs
  tag: 설명서
  text: Node.js 애플리케이션 계측
title: Node.js Lambda 추적 및 번들러 호환성
---

## 개요

Datadog의 추적 라이브러리(`dd-trace`)는 조건부 가져오기 사용과 기타 문제로 인해 [웹팩][1]이나 [esbuild][2]와 같은 번들러와 호환되지 않습니다. 번들러로 `dd-trace`를 만들 수는 없지만 Datadog Lambda 레이어에서 기본으로 제공하는 `dd-trace`와 `datadog-lambda-js` 라이브러리를 애플리케이션에서 사용할 수 있습니다. 아래 설명서를 참고하세요.

## 웹팩
1. [Node.js용 설치 지침][3]을 따르고 Node.js용 Datadog Lambda 레이어가 Lambda 함수에 추가되었는지 확인합니다.
2. `package.json`에서 제거하거나 [예외 규칙][4]을 설정해 `datadog-lambda-js`와 `dd-trace`를 제외합니다. 이렇게 제외하면 번들러에서 이 둘을 종속성으로 빌드하지 않습니다. 이 둘은 Datadog Lamda 레이어에서 제공하는 Lamda 런타임에서 이미 사용 가능하기 때문에 이와 같이 제외합니다.
3. 종속성을 [externals][5]로 표시합니다. 이를 통해 종속성을 출력 번들에서 제외하도록 번들러에 지시하며, 대신 `node_modules`에 패키지 됩니다.

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

   `serverless-webpack` 플러그인을 사용하고 있고 `includeModules` 옵션이 `false`가 아닌 다른 값으로 지정되어 있으면 플러그인이 자동으로 [외부 모듈을 `node_modules` 아래 패키징][6]합니다. 따라서 `datadog-lambda-js`와 `dd-trace`를 반드시 강제로 제외해야 합니다. `serverless-webpack`을 사용하지 않거나 `serverless.yml`에 `includeModules` 옵션이 없는 경우에는 이 단계를 건너뛰세요.

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

   어떤 종속성을 포함할지 더 세밀하게 제어하려면 `serverless-webpack` 설정에서 `webpack.config.js`를 포함할 수도 있습니다:

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
1. [Node.js용 설치 지침][3]을 따르고 Node.js용 Datadog Lambda 레이어가 Lambda 함수에 추가되었는지 확인합니다.
2. 빌드 프로세스와 `package.json`에서 `datadog-lambda-js`와 `dd-trace`를 제거합니다. Datadog Lambda 레이어에서 제공하는 Lambda 런타임에서 이미 사용할 수 있기 때문입니다.
3. 종속성을 [externals][5]로 표시합니다. 이를 통해 종속성을 출력 번들에서 제외하도록 번들러에 지시하며, 대신 `node_modules`에 패키지 됩니다.

    **esbuild.config.js**

    ```javascript
    const esbuild = require('esbuild');

    esbuild.build({
      // ... your existing esbuild configuration
      // Same effect as manually passing each dependency to `external`
      packages: 'external'
    })
    ```

    `serverless-esbuild` 플러그인을 사용하는 경우 `esbuild-node-externals`를 에스빌드 플러그인으로 사용해 모든 종속성을 표면화할 수 있습니다. 자동으로 [외부 모듈을 `node_modules` 아래 패키징][8]합니다.

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

`NodeJsFunction` 컨스트럭트를 사용하여 Node.js Lambda 함수를 배포하지만 `esbuild` 또는 Typescript를 사용하지 않는 경우에도 Datadog을 사용하여 서버리스 애플리케이션을 관찰할 수 있습니다.

1. Node.js의 설치 지침대로 진행하고, Node.js용 Datadog Lambda 계층이 Lambda 함수에 추가되었는지 확인하세요.
2. Datadog Lambda Layer에서 제공하는 Lambda 런타임에 이미 포함되어 있으므로 `package.json` 및 빌드 프로세스에서 `datadog-lambda-js` 및 `dd-trace`를 제거합니다. 
3. CDK에서 `NodejsFunction` 컨스트럭트를 사용합니다. `entry` 속성이 Lambda 함수 핸들러가 포함된 파일 경로로 설정되어 있는지, `depsLockFilePath`가 사용 중인 패키지 관리자의 잠금 파일 경로로 설정되어 있는지 확인해야 합니다. 또 `bundling.commandHooks.beforeBundling`을 설정하여 모든 종속성이 설치되도록 합니다.

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

## AWS CDK & esbuild

AWS CDK에서 `NodeJsFunction` 컨스트럭트는 esbuild를 사용합니다. 기본 구성은 Datadog의 추적 라이브러리와 호환되지 않습니다. CDK를 사용하면 기본 구성을 재정의하고 번들링 및 Datadog 추적 라이브러리를 지원하는 사용자 지정 esbuild 파일을 제공할 수 있습니다.

1. Node.js에 대한 설치 지침대로 진행하고, Node.js용 Datadog Lambda 계층이 Lambda 함수에 추가되었는지 확인하세요.
2. Datadog Lambda Layer에서 제공하는 Lambda 런타임에 이미 포함되어 있으므로 `package.json` 및 빌드 프로세스에서 `datadog-lambda-js` 및 `dd-trace`를 제거합니다. 
3. 각 Lambda 함수에 `esbuild` 파일을 만듭니다. 각 진입점을 별도로 지정할 수 있도록 Lambda 함수마다 별도의 `esbuild` 파일이 필요합니다. `entryPoint` 및 `outfile` 속성을 확인하세요. 예를 들어 `producer`라는 프로젝트에 두 번째 Lambda 함수가 있는 경우 진입점은 `./functions/producer.ts`며, 출력 파일은 `/out/producer/index.js`입니다.

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
        '@datadog/native-iast-rewriter',

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

4. CDK에서 `NodeJsFunction`을 정의할 때 `Code.fromCustomCommand` 함수를 사용하여 사용자 지정 `esbuild` 파일 경로 및 출력 폴더를 지정합니다. 각 Lambda 함수 3단계에서 정의한 개별 `esbuild` 파일을 지정하세요. 출력 폴더는 `esbuild` 파일의 `outfile` 폴더와 일치해야 합니다.

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

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: https://esbuild.github.io/
[3]: /ko/serverless/installation/nodejs
[4]: https://webpack.js.org/configuration/module/#ruleexclude
[5]: https://webpack.js.org/configuration/externals/
[6]: https://github.com/serverless-heaven/serverless-webpack#node-modules--externals
[7]: https://esbuild.github.io/api/#external
[8]: https://www.npmjs.com/package/esbuild-node-externals
---
aliases:
- /ko/serverless/troubleshooting/serverless_tracing_and_webpack
further_reading:
- link: /serverless/installation/nodejs
  tag: 설명서
  text: Node.js 애플리케이션 계측
title: Node.js Lambda 추적 및 웹팩 호환성
---

## 개요

Datadog의 추적 라이브러리(`dd-trace`)는 조건부 가져오기 사용 및 기타 문제로 인해 [웹팩][1]과 같은 번들러와 호환되지 않습니다. 웹팩은 `dd-trace`를 만들 수 없지만 애플리케이션은 사전에 만들어진 Datadog Lambda 레이어에서 제공하는 `dd-trace` 및 `datadog-lambda-js` 라이브러리를 계속 사용할 수 있습니다. 아래 설명서를 참고하세요.

## 웹팩
1. [Node.js용 설치 지침][2]을 따라 Node.js에 대한 Datadog Lambda 레이어가 Lambda 함수에 추가되었는지 확인합니다.
2. `package.json`와 빌드 프로세스에서 `datadog-lambda-js`와 `dd-trace`를 제거합니다.
3. `datadog-lambda-js`와 `dd-trace`를 [외부][3]로 표시합니다. Datadog Lambda 레이어에서 제공하는 Lambda 런타임에서 이미 사용할 수 있기 때문에 번들러가 이들을 종속성으로 만들지 않고 건너 뜁니다.

    **webpack.config.js**

    ```
    var nodeExternals = require("webpack-node-externals");

    module.exports = {
      // use webpack-node-externals to exclude all node dependencies.
      // You can manually set the externals too.
      externals: [nodeExternals(), "dd-trace", "datadog-lambda-js"],
    };
    ```

4. `serverless-webpack`를 사용하고 `false`이외의 값으로 설정된 옵션`includeModules`이 있을 경우 서버리스 웹팩이 자동으로 [노드_모듈 아래에 외부 모듈을 패키징합니다][5]. 따라서 `datadog-lambda-js`와 `dd-trace`제외를 강제로 적용해야 합니다. `serverless-webpack`를 사용하지 않거나 serverless.yml에 `includeModules` 옵션이 없는 경우 이 단계를 건너뜁니다.

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
1. [Node.js용 설치 지침][2]에 따라 Node.js에 대한 Datadog Lambda 레이어가 Lambda 함수에 추가되었는지 확인합니다.
2. `package.json`와 빌드 프로세스에서 `datadog-lambda-js`와 `dd-trace`를 제거합니다.
3. `datadog-lambda-js`와 `dd-trace`를 [외부][3]로 표시합니다. Datadog Lambda 레이어에서 제공하는 Lambda 런타임에서 이미 사용할 수 있기 때문에 번들러가 이들을 종속성으로 만들지 않고 건너 뜁니다.
4. [에스빌드(esbuild) 지원][6] 페이지의 단계에 따라 Datadog의 에스빌드(esbuild) 플러그인을 사용하세요. 번들 종속성을 계측할 수 있습니다.

    **esbuild.config.js (esbuild-config을 사용하는 경우)**

    ```
    {
      "external": ["dd-trace", "datadog-lambda-js"],
    }
    ```

    **serverless.yml (serverless-esbuild를 사용하는 경우)**

    ```
    custom:
      esbuild:
        exclude: ["dd-trace", "datadog-lambda-js", "aws-sdk"] # aws-sdk is needed because it is the default value for `exclude`
    ```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org
[2]: /ko/serverless/installation/nodejs
[3]: https://webpack.js.org/configuration/externals/
[4]: https://esbuild.github.io/api/#external
[5]: https://github.com/serverless-heaven/serverless-webpack#node-modules--externals
[6]: /ko/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#esbuild-support
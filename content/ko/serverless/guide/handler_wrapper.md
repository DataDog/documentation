---
title: Lambda 핸들러를 코드로 래핑
---

Python 및 Node.js Lambda 함수의 경우, 개별 호출을 계측하려면 Datadog Lambda 라이브러리가 Lambda 핸들러 함수를 래핑해야 합니다. 이렇게 하려면 함수의 핸들러를 `datadog_lambda.handler.handler`와 같은 Datadog 핸들러 함수로 설정하고 Datadog 핸들러가 호출할 원래의 핸들러 함수로 환경 변수 `DD_LAMBDA_HANDLER`가 설정되야 합니다.

Lambda 함수 설정이 Datadog 핸들러 리디렉션과 호환되지 않는 경우 함수 코드에 Datadog 래퍼를 대신 적용할 수 있습니다.

1. [Python][1] 또는 [Node.js][2]에 대한 **커스텀** 설치 설명서에 따라 Datadog 서버리스 모니터링을 설치합니다.
2. 핸들러 함수를 설정하기 위해 단계를 건너뜁니다.
3. 환경 변수 `DD_LAMBDA_HANDLER`를 설정하기 위해 단계를 건너뜁니다.
4. 함수 코드에 Datadog 래퍼를 적용합니다:
    ```python
    # for python
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    @datadog_lambda_wrapper
    def my_lambda_handle(event, context):
        # your function code
    ```

    ```js
    // for node.js
    const { datadog } = require("datadog-lambda-js");
    const tracer = require("dd-trace").init({
      // optional tracer options
    });

    module.exports.myHandler = datadog(myHandler, {
      // my function code
    }, {
      // optional datadog config, e.g., custom trace context extractor
      traceExtractor: () => {},
    });
    ```

[1]: /ko/serverless/installation/python?tab=custom
[2]: /ko/serverless/installation/nodejs?tab=custom
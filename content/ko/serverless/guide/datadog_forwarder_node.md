---
kind: 가이드
title: Datadog 포워더를 사용하여 Node.js 서버리스 애플리케이션 계측하기
---

## 개요

<div class="alert alert-warning">
Datadog 서버리스 신규 사용자인 경우 <a href="/serverless/installation/nodejs">Datadog Lambda 확장을 사용해 Lambda 함수를 계측하기 위한 지침을 따르세요.</a> Lambda에서 즉시 사용할 수 있는 기능을 제공하기 전 Datadog 포워더를 사용해 Datadog 서버리스를 설정한 경우 이 가이드를 따라 인스턴스를 유지 관리하세요.
</div>

## 전제 조건

AWS Lambda 트레이스, 향상된 메트릭, 커스텀 메트릭, 로그를 수집하려면 [Datadog 포워더 Lambda 함수][2]가 필요합니다.

## 설정

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI는 기존 Lambda 함수의 설정을 변경하여, 새롭게 배포할 필요 없이 계측하도록 해줍니다. 가장 빠르게 시작하는 방법은 Datadog의 서버리스 모니터링을 이용하는 것입니다.

또한 CI/CD 파이프라인에 명령을 추가하여 모든 서버리스 애플리케이션에 대한 계측을 활성화할 수 있습니다. Datadog CLI 명령에 의해 변경된 내용이 재정의되지 않도록 일반 서버리스 애플리케이션 배포 *후* 명령을 실행합니다.

### 설치

NPM 또는 Yarn과 함께 Datadog CLI를 설치합니다:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### 계측

함수를 계측하려면 [AWS 크리덴셜][1]과 함께 다음 명령을 실행합니다.

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder <forwarder_arn>
```

플레이스홀더를 채우려면:
- `<functionname>` 및 `<another_functionname>`를  Lambda 함수 이름으로 교체합니다.
- `<aws_region>`을 AWS 리전 이름으로 대체합니다.
- `<layer_version>`을 원하는 Datadog Lambda Library 버전으로 교체합니다. 최신 버전은 `{{< latest-lambda-layer-version layer="node" >}}`입니다.
- `<forwarder_arn>`을 포워더 ARN으로 교체합니다 ([포워더 설명서][2] 참조).

예를 들면 다음과 같습니다.

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="node" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```
{{< site-region region="us,us3,us5,eu,gov" >}}
Lambda 함수가 코드 서명을 사용하도록 설정된 경우 Datadog CLI를 사용하여 계측하려면 먼저 Datadog의 서명 프로파일 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}
{{< site-region region="ap1" >}}
Lambda 함수가 코드 서명을 사용하도록 설정된 경우 Datadog CLI를 사용하여 계측하려면 먼저 Datadog의 서명 프로파일 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc``)을 함수의 [코드 서명 설정][1]에 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

자세한 내용 및 추가 파라미터는 [CLI 설명서][4]에서 확인할 수 있습니다.

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
[4]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog 서버리스 플러그인][1]은 레이어를 사용하여 Datadog Lambda 라이브러리를 함수에 자동으로 추가하고 [Datadog 포워더][2]를 통해 메트릭, 트레이스 및 로그를 Datadog으로 전송하도록 함수를 설정합니다.

{{< site-region region="us,us3,us5,eu,gov" >}}
Lambda 함수가 코드 서명을 사용하도록 설정된 경우 Datadog 서버리스 플러그인을 설치하기 전 함수의 [코드 서명 설정][1]에 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

{{< site-region region="ap1" >}}
Lambda 함수가 코드 서명을 사용하도록 설정된 경우 Datadog 서버리스 플러그인을 설치하기 전 함수의 [코드 서명 설정][1]에 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

Datadog Serverless Plugin을 설치하고 설정하려면 다음 절차를 따라주세요.

1. Datadog Serverless Plugin을 설치합니다.
    ```
    yarn add --dev serverless-plugin-datadog
    ```
2. `serverless.yml`에서 다음을 추가합니다:
    ```
    plugins:
      - serverless-plugin-datadog
    ```
3. `serverless.yml`에서 다음 섹션도 추가합니다:
    ```
    custom:
      datadog:
        forwarderArn: # The Datadog Forwarder ARN goes here.
    ```
   Datadog 포워더 ARN 또는 설치에 대한 자세한 내용은 [여기][2]를 참조하세요. 또한, 추가적인 설정 방법은 [플러그인 설명서][1]을 참조하세요.

**참고**: Lambda 함수가 Datadog의 트레이스 라이브러리와 [웹팩][5]을 동시에 사용하는 경우 다음 [추가 설정 단계][4]를 따라야 합니다.


[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
[4]: /ko/serverless/guide/serverless_tracing_and_webpack/
[5]: https://webpack.js.org/
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation 매크로][1]는 레이어를 사용하여 Datadog Lambda 라이브러리를 함수에 추가하기 위해 SAM 애플리케이션을 템플릿을 자동으로 변환하고, [Datadog 포워더][2]를 통해 메트릭, 트레이스 및 로그를 Datadog으로 전송하도록 함수를 설정합니다.

### 설치

[AWS 크리덴셜][3]과 함께 다음 명령을 실행하여 매크로 AWS 리소스를 설치하는 CloudFormation 스택을 배포합니다. 계정에서 특정 지역에 대해 매크로를 한 번만 설치하면 됩니다. 매크로를 최신 버전으로 업데이트하려면 `create-stack`를 `update-stack`로 대체합니다.

```sh
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

매크로가 배포되어 사용할 준비가 되었습니다.

### 계측

`template.yml`에서 SAM에 대한 `AWS::Serverless` 변환 **후** `Transform` 섹션 아래에 다음을 추가합니다.

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      stackName: !Ref "AWS::StackName"
      nodeLayerVersion: "{{< latest-lambda-layer-version layer="node" >}}"
      forwarderArn: "<FORWARDER_ARN>"
      service: "<SERVICE>" # Optional
      env: "<ENV>" # Optional
```

플레이스홀더를 채우려면:
- `<FORWARDER_ARN>`를 포워더 ARN으로 대체합니다 ([포워더 설명서][2] 참조).
- `<SERVICE>`와 `<ENV>`를 서비스와 환경값으로 대체합니다. 

{{< site-region region="us,us3,us5,eu,gov" >}}
Lambda 함수가 코드 서명을 사용하도록 설정된 경우 매크로를 사용하려면 먼저 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

{{< site-region region="ap1" >}}
Lambda 함수가 코드 서명을 사용하도록 설정된 경우 매크로를 사용하려면 먼저 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

자세한 정보와 추가적인 파라미터는 [매크로 설명서][1]에서 확인할 수 있습니다.

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog CDK 컨스트럭트][1]는 다음과 같은 방법으로 서버리스 애플리케이션에서 메트릭, 트레이스 및 로그 수집을 자동으로 설정합니다:

-  Python 및 Node.js Lambda 함수에 대한 Datadog Lambda 라이브러리를 설치 및 설정합니다.
- Lambda 함수에서 트레이스 및 커스텀 메트릭 수집을 활성화합니다.
- Datadog 포워더에서 Lambda 함수 로그 그룹으로의 구독을 관리합니다.

### 설치

CDK 프로젝트에서 다음 Yarn 또는 NPM 명령을 실행하여 Datadog CDK 컨스트럭트 라이브러리를 설치합니다:

```sh
#Yarn
yarn add --dev datadog-cdk-constructs

#NPM
npm install datadog-cdk-constructs --save-dev
```

### 계측

이 함수를 계측하려면 AWS CDK 앱에서 `datadog-cdk-construct` 모듈을 가져온 뒤 다음 설정을 추가합니다 (이 예시는 TypeScript이나 다른 언어에서의 사용법도 유사함):

```typescript
import * as cdk from "@aws-cdk/core";
import { Datadog } from "datadog-cdk-constructs";

class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const datadog = new Datadog(this, "Datadog", {
      nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}},
      forwarderArn: "<FORWARDER_ARN>",
      service: "<SERVICE>",  // Optional
      env: "<ENV>",  // Optional
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
  }
}
```

플레이스홀더를 채우려면:

- `<FORWARDER_ARN>`를 포워더 ARN으로 대체합니다 ([포워더 설명서][2] 참조).
- `<SERVICE>`와 `<ENV>`를 서비스와 환경값으로 대체합니다. 

{{< site-region region="us,us3,us5,eu,gov" >}}
람다 함수가 코드 서명을 사용하도록 구성된 경우 매크로를 사용려면 먼저 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc``)을 함수의 [코드 서명 설정][1]에 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

{{< site-region region="ap1" >}}
Lambda 함수가 코드 서명을 사용하도록 설정된 경우 매크로를 사용하려면 먼저 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

자세한 내용 및 추가적인 파라미터는 [Datadog CDK NPM 페이지][1]에서 확인할 수 있습니다.


[1]: https://www.npmjs.com/package/datadog-cdk-constructs
[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
{{% /tab %}}
{{% tab "컨테이너 이미지" %}}

### 설치

Lambda 함수를 컨테이너 이미지로 배포하는 경우 Datadog  Lambd다 라이브러리를 레이어로 사용할 수 없습니다. 대신 Datadog Lambda 라이브러리를 이미지 내 함수의 종속성으로 설치해야 하며, Datadog 트레이스를 사용하는 경우에도 `dd-trace`를 설치해야 합니다.

**NPM**:

```sh
npm install --save datadog-lambda-js dd-trace
```

**Yarn**:

```sh
yarn add datadog-lambda-js dd-trace
```

**참고**: `datadog-lambda-js` 패키지의 보조 버전은 항상 레이어 버전과 일치합니다. 예를 들어 `datadog-lambda-js v0.5.0`는 레이어 버전 5의 내용과 일치합니다.

### 설정

함수를 설정하려면 다음 단계를 따르세요:

1. 이미지의 `CMD` 값을 `node_modules/datadog-lambda-js/dist/handler.handler`로 설정합니다. AWS 또는 도커 파일에서 직접 설정할 수 있습니다. **참고**: 둘 다 설정한 경우 AWS에서 설정한 값이 도커 파일의 값보다 우선합니다.
2. AWS에서 다음 환경 변수를 설정하세요:
  - `myfunc.handler`와 같이 `DD_LAMBDA_HANDLER`를 원래 핸들러로 설정합니다.
  - `DD_TRACE_ENABLED`를 `true`로 설정합니다.
  - `DD_FLUSH_TO_LOG`를 `true`로 설정합니다.
3. 필요 시 적절한 값을 사용하여 함수에 `service`와 `env` 태그를 추가합니다.

### 구독

메트릭, 트레이스, 로그를 Datadog으로 보내려면 각 함수 로그 그룹에 Datadog 포워더 Lamda 함수를 등록합니다.

1. [Datadog 포워더를 설치하지 않았다면 먼저 설치하세요][1].
2. [Datadog 포워더를 함수의 로그 그룹에 등록합니다][2].


[1]: https://docs.datadoghq.com/ko/serverless/forwarder/
[2]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "커스텀" %}}

### 설치

Datadog Lambda 라이브러리는 레이어 또는 JavaScript 패키지로 가져올 수 있습니다.

**참고**: `datadog-lambda-js` 패키지의 보조 버전은 항상 레이어 버전과 일치합니다. 예를 들어 datadog-lambda-js v0.5.0는 레이어 버전 5의 내용과 일치합니다.

#### 레이어 사용하기

다음 형식에 맞추어 ARN을 사용해 Lambda 함수의 [레이어를 설정합니다][1].

```
# For us,us3,us5,eu regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# For us-gov regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>

# For ap1 region
arn:aws-us-gov:lambda:<AWS_REGION>:417141415827:layer:Datadog-<RUNTIME>:<VERSION>
```

사용 가능한`RUNTIME`옵션은 `Node12-x`, `Node14-x` 및 `Node16-x`입니다. 최신 `VERSION`은 `{{< latest-lambda-layer-version layer="node" >}}`입니다. 예를 들어:

{{< site-region region="us,us3,us5,eu,gov" >}}
```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Node16-x:{{< latest-lambda-layer-version layer="node" >}}
```

Lambda 함수가 코드 서명을 사용하도록 설정된 경우 Datadog Lambda 라이브러리를 레이어로 추가하려면 먼저 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

{{< site-region region="ap1" >}}
```
arn:aws:lambda:us-east-1:417141415827:layer:Datadog-Node16-x:{{< latest-lambda-layer-version layer="node" >}}
```

Lambda 함수가 코드 서명을 사용하도록 설정된 경우 Datadog Lambda 라이브러리를 레이어로 추가하려면 먼저 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}


#### 패키지 사용하기

**NPM**:

```
npm install --save datadog-lambda-js
```

**Yarn**:

```
yarn add datadog-lambda-js
```

[최신 릴리스][3]를 참조하세요.

### 설정

함수를 설정하려면 다음 단계를 따르세요:

1. 레이어를 사용하는 경우 함수 핸들러를 `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler`로 설정하거나 패키지를 사용하는 경우 `node_modules/datadog-lambda-js/dist/handler.handler`로 설정합니다.
2. 환경 변수 `DD_LAMBDA_HANDLER`를 `myfunc.handler`와 같이 원래의 핸들러로 설정합니다.
3. 환경 변수 `DD_TRACE_ENABLED`를 `true`로 설정합니다.
4. 환경 변수 `DD_FLUSH_TO_LOG`를 `true`로 설정합니다.
5. 필요 시 적절한 값을 사용하여 함수에 `service`와 `env` 태그를 추가합니다.

**참고**: Lambda 함수가 Datadog의 추적 라이브러리와 [웹팩][5]을 동시에 사용하는 경우 다음 [추가 설정 단계][4]를 따라야 합니다.

### 구독

메트릭, 트레이스, 로그를 Datadog로 보내려면 각 함수 로그 그룹에서 Datadog Forwarder Lamda 함수를 구독하세요. 

1. [Datadog 포워더를 설치하지 않았다면 먼저 설치하세요][6].
2. [Datadog 포워더를 함수의 로그 그룹에 등록합니다][7].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: https://www.npmjs.com/package/datadog-lambda-js
[4]: /ko/serverless/guide/serverless_tracing_and_webpack/
[5]: https://webpack.js.org/
[6]: https://docs.datadoghq.com/ko/serverless/forwarder/
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{< /tabs >}}

### 태그

선택 사항이지만 Datadog은 [통합 서비스 태깅 설명서][2]에 따라 `env`,`service` 및 `version`태그를 사용해 서버리스 애플리케이션을 태깅할 것을 권장합니다.

## 탐색

위의 단계에 따라 함수를 설정한 후 [서버리스 홈페이지][3]에서 메트릭, 로그 및 트레이스를 확인합니다.

## 커스텀 비즈니스 로직 모니터링

커스텀 메트릭 또는 스팬을 제출하려면 아래 샘플 코드를 참조하세요:

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require("datadog-lambda-js");
const tracer = require("dd-trace");

// submit a custom span named "sleep"
const sleep = tracer.wrap("sleep", (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
});

exports.handler = async (event) => {
  // add custom tags to the lambda function span,
  // does NOT work when X-Ray tracing is enabled
  const span = tracer.scope().active();
  span.setTag('customer_id', '123456');

  await sleep(100);

  // submit a custom span
  const sandwich = tracer.trace('hello.world', () => {
    console.log('Hello, World!');
  });

  // submit a custom metric
  sendDistributionMetric(
    "coffee_house.order_value", // metric name
    12.45, // metric value
    "product:latte", // tag
    "order:online", // another tag
  );

  // submit a custom metric with timestamp
  sendDistributionMetricWithDate(
    "coffee_house.order_value", // metric name
    12.45, // metric value
    new Date(Date.now()), // date, must be within last 20 mins
    "product:latte", // tag
    "order:online", // another tag
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from serverless!"),
  };
  return response;
};
```

커스텀 메트릭 제출에 대한 자세한 내용은 [서버리스 커스텀 메트릭][4]을 참조하세요. 커스텀 계측에 대한 자세한 내용은 [커스텀 계측][5]의 Datadog APM 설명서를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/serverless/forwarder
[2]: /ko/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /ko/serverless/custom_metrics?tab=nodejs
[5]: /ko/tracing/custom_instrumentation/nodejs/
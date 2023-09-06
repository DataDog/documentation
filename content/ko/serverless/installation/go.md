---
aliases:
- /ko/serverless/datadog_lambda_library/go/
further_reading:
- link: /serverless/configuration
  tag: 설명서
  text: 서버리스 모니터링 설정하기
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: 설명서
  text: 서버리스 모니터링 트러블슈팅
- link: serverless/custom_metrics/
  tag: 설명서
  text: 서버리스 애플리케이션용 커스텀 메트릭 제출하기
kind: 설명서
title: Go 서버리스 애플리케이션 계측
---

<div class="alert alert-warning">Go 람다 함수가 여전히 런타임 <code>go1.x</code>를 사용하고 <code>provided.al2</code> 런타임으로 마이그레이션할 수 없다면, <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_go">Datadog 포워더(Forwarder)를 사용해 계측해야 합니다</a>. 또는 이 가이드의 지침을 따라 Datadog 람다 확장을 사용해 계측하세요.</div>

<div class="alert alert-warning">Lambda 함수가 인터넷에 액세스할 수 없는 VPC에 배포된 경우 <code>datadoghq.com</code> <a href="/getting_started/site/">Datadog 사이트</a>에서는 <a href="/agent/guide/private-link/">AWS PrivateLink</a>를 사용하고, 그 외의 모든 사이트에서는 <a href="/agent/proxy/">프록시를 사용해</a> 데이터를 전송할 수 있습니다.</div>

## 설치

{{< tabs >}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1]이 [Datadog Lambda Extension][2]을 통해 메트릭, 트레이스, 로그를 Datadog로 전송하도록 함수를 자동 설정합니다.

Datadog Serverless Plugin을 설치하고 설정하려면 다음 절차를 따라주세요.

### Datadog Serverless Plugin 설치하기:

```sh
serverless plugin install --name serverless-plugin-datadog
```

### `serverless.yml`을 업데이트합니다.

```yaml
custom:
  datadog:
    site: <DATADOG_SITE>
    apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
```

플레이스홀더 채우기:
- 텔레메트리를 전송할 [Datadog 사이트][3]로 `<DATADOG_SITE>`를 대체합니다.
- `<DATADOG_API_KEY_SECRET_ARN>`을 Datadog API 키가 안전하게 저장된 AWS 시크릿의 ARN으로 대체합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). 또한, `secretsmanager:GetSecretValue` 권한이 있어야 합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 플레인 텍스트로 설정할 수 있습니다.

더 자세한 정보와 추가 설정 방법은 [플러그인 설명서][1]에서 찾아볼 수 있습니다.

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/extension
[3]: https://docs.datadoghq.com/ko/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container Image" %}}

1. Datadog Lambda Extension을 설치합니다.

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

   `<TAG>`를 특정 버전 번호(예: `{{< latest-lambda-layer-version layer="extension" >}}`) 또는 `latest`로 대체합니다. 이용 가능한 태그 목록은 [Amazon ECR 리포지터리][1]에서 확인할 수 있습니다.

2. 필요한 환경 변수를 설정합니다.

    - `DD_SITE`를 {{< region-param key="dd_site" code="true" >}}(오른쪽에서 올바른 사이트(SITE)가 선택되었는지 확인)로 설정합니다.
    - `DD_API_KEY_SECRET_ARN`을 [Datadog API 키][3]가 안전하게 저장된 AWS 시크릿의 ARN으로 대체합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). 또한, `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY`를 사용하고 Datadog API 키를 플레인 텍스트로 설정할 수 있습니다.
    - 선택적으로 `DD_UNIVERSAL_INSTRUMENTATION: true`를 설정하여 람다 요청 및 응답 페이로드 캡처, 수신 람다 이벤트에서 APM 스팬 추론 등 [고급 설정][3]의 이점을 누릴 수 있습니다.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ko/serverless/configuration/
{{% /tab %}}
{{% tab "커스텀" %}}
### Datadog Lambda Extension을 설치합니다.

AWS 리전 및 아키텍처 기준 ARN 형식을 따라 Datadog 람다 확장의 [람다 레이어를 람다 함수에 추가하세요][1].

{{< site-region region="us,us3,us5,eu,gov" >}}
```sh
# AWS 상업 리전에 구축된 x86 기반 람다의 경우 이 형식 사용
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# AWS 상업 리전에 구축된 arm64 기반 람다의 경우 이 형식 사용
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

# AWS GovCloud 리전에 구축된 x86 기반 람다의 경우 이 형식 사용
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# AWS GovCloud 리전에 구축된 arm64 기반 람다의 경우 이 형식 사용
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
```
{{< /site-region >}}

{{< site-region region="ap1" >}}
```sh
# AWS 상업 리전에 구축된 x86 기반 람다의 경우 이 형식 사용
arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# AWS 상업 리전에 구축된 arm64 기반 람다의 경우 이 형식 사용
arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

# AWS GovCloud 리전에 구축된 x86 람다의 경우 이 형식 사용
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

# AWS GovCloud 리전에 구축된 arms64 기반 람다의 경우 이 형식 사용
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
```
{{< /site-region >}}

`<AWS_REGION>`를 `us-east-1`와 같이 유효한 AWS 지역으로 대체합니다. 

### 필수 환경 변수 설정

- `DD_SITE`를 {{< region-param key="dd_site" code="true" >}}(오른쪽에서 올바른 사이트(SITE)가 선택되었는지 확인)로 설정합니다.
- `DD_API_KEY_SECRET_ARN`을 [Datadog API 키[2]가 안전하게 저장되는 AWS 암호 ARN으로 설정하세요. 키는 일반 텍스트 문자열(JSON blob 안 됨)로 저장해야 합니다. `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY` 키를 사용하고 일반 텍스트로 Datadog API 키를 설정할 수 있습니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

### Datadog 람다 라이브러리 설치하기

```
go get github.com/DataDog/datadog-lambda-go
```

### 람다 함수 코드 업데이트

```go
package main

import (
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/DataDog/datadog-lambda-go"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
)

func main() {
  // Wrap your lambda handler
  lambda.Start(ddlambda.WrapFunction(myHandler, nil))
}

func myHandler(ctx context.Context, event MyEvent) (string, error) {
  // Trace an HTTP request
  req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
  client := http.Client{}
  client = *httptrace.WrapClient(&client)
  client.Do(req)

  // Submit a custom metric
  ddlambda.Metric(
    "coffee_house.order_value", // Metric name
    12.45, // Metric value
    "product:latte", "order:online" // Associated tags
  )

  // Create a custom span
  s, _ := tracer.StartSpanFromContext(ctx, "child.span")
  time.Sleep(100 * time.Millisecond)
  s.Finish()
}
```

## 다음 단계

- 축하합니다! 이제 [서버리스 홈페이지][1]에서 메트릭, 로그 및 트레이스를 확인할 수 있습니다.
- [위협 모니터링][4]을 켜서 귀하의 서비스를 목표로 하는 공격자에 대한 알림을 받으세요.
- 텔레메트리 수집 중 문제가 발생한 경우 [트러블슈팅 가이드][4]를 참조하세요
- [고급 설정][3]을 참조해 다음을 수행할 수 있습니다.
    - 태그를 사용해 텔레메트리 연결
    - AWS API Gateway, SQS 등의 텔레메트리 수집
    - Lambda 리퀘스트 및 리스폰스 페이로드 확인
    - Lambda 함수의 오류를 소스 코드에 링크
    - 로그나 트레이스에서 민감 정보를 필터링 또는 스크러빙

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /ko/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /ko/serverless/configuration/
[4]: /ko/security/application_security/enabling/serverless/?tab=serverlessframework
---
further_reading:
- link: /serverless/configuration/
  tag: 설명서
  text: 서버리스 모니터링 설정하기
- link: /integrations/amazon_lambda/
  tag: 설명서
  text: AWS Lambda 통합
title: Lambda Web Adapter
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Lambda Web Adapter는 평가판입니다.
{{< /callout >}}

## 개요

AWS [Lambda Web Adapter][1]는 개발자가 AWS Lambda에서 웹 애플리케이션을 실행할 수 있도록 지원하는 프레임워크입니다.

Datadog는 Node.js 및 Python 런타임을 위한 Lambda Web Adapter를 지원하며, 이를 통해 AWS Lambda에서 실행되는 웹 애플리케이션을 모니터링할 수 있는 솔루션을 제공합니다.

## Datadog 통합 방법

Lambda Web Adapter는 Docker 이미지 또는 Zip 파일 형식으로 패키징된 Lambda 함수를 실행할 수 있습니다. 다음 단계는 두 형식 모두에서 Datadog을 사용해 Lambda Web Adapter를 계측하는 데 필요합니다:

1. [Lambda Web Adapter 및 Datadog 확장 추가](#1-add-the-lambda-web-adapter-and-datadog-extension)
2. [필수 Datadog 환경 변수 설정](#2-set-the-required-datadog-environment-variables)
3. [준비 상태 엔드포인트의 트레이싱 무시](#3-ignore-tracing-for-the-readiness-endpoint-required-only-when-using-datadog-tracing)(Datadog 트레이싱 사용 시에만 필요)

#### 1. Lambda Web Adapter 및 Datadog 확장 추가

{{< tabs >}}
{{% tab "Container deployment" %}}
이 구성에는 Datadog Lambda 확장 `v77+` 및 Lambda Web Adapter `v0.9.1+`가 필요합니다. 컨테이너 배포 구성의 예시는 [Github][2]에서 확인할 수 있습니다.<br><br>

```Dockerfile
COPY --from=public.ecr.aws/datadog/lambda-extension:77 /opt/. /opt/
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter
```

[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
{{% /tab %}}

{{% tab "Zip deployment" %}}
이 구성에는 Datadog Lambda 확장 `v77+`와 Lambda Web Adapter `v25+`가 필요합니다. Zip 배포 구성의 예시는 [Github][3]에서 확인할 수 있습니다.


**x86용**

```shell
arn:aws:lambda:${AWS::Region}:464622532012:layer:Datadog-Extension:77
arn:aws:lambda:${AWS::Region}:753240598075:layer:LambdaAdapterLayerX86:25
```

**ARM용**
```shell
arn:aws:lambda:${AWS::Region}:464622532012:layer:Datadog-Extension-ARM:77
arn:aws:lambda:${AWS::Region}:753240598075:layer:LambdaAdapterLayerArm64:25
```
[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
{{% /tab %}}
{{< /tabs >}}

#### 2. 필수 Datadog 환경 변수 설정
{{< tabs >}}
{{% tab "Container deployment" %}}

Lambda에는 명시적인 종료 메커니즘이 없기 때문에, Lambda 런타임 환경이 "frozen" 상태가 될 때 트레이스가 손실되지 않도록 가능한 한 빨리 플러시해야 합니다.

투명 트레이싱을 사용하려면 Datadog 확장이 Lambda Web Adapter보다 먼저 요청을 프록시할 수 있어야 하므로, 이를 허용하도록 `AWS_LWA_LAMBDA_RUNTIME_API_PROXY`를 설정해야 합니다. 포트는 사용 가능한 아무 포트나 설정할 수 있습니다.

```bash
DD_TRACE_PARTIAL_FLUSH_MIN_SPANS=1
DD_TRACE_PARTIAL_FLUSH_ENABLED=false

AWS_LWA_LAMBDA_RUNTIME_API_PROXY=127.0.0.1:9002

DD_API_KEY=$YOUR_API_KEY
DD_SERVICE=$YOUR_SERVICE_NAME
```

[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
{{% /tab %}}

{{% tab "Zip deployment" %}}

Lambda에는 명시적인 종료 메커니즘이 없기 때문에, Lambda 런타임 환경이 "frozen" 상태가 될 때 트레이스가 손실되지 않도록 가능한 한 빨리 플러시해야 합니다.

투명 트레이싱을 사용하려면 Datadog 확장이 Lambda Web Adapter보다 먼저 요청을 프록시할 수 있어야 하므로, 이를 허용하도록 `AWS_LWA_LAMBDA_RUNTIME_API_PROXY`를 설정해야 합니다. 포트는 사용 가능한 아무 포트나 설정할 수 있습니다.

```bash
DD_TRACE_PARTIAL_FLUSH_MIN_SPANS=1
DD_TRACE_PARTIAL_FLUSH_ENABLED=false

AWS_LWA_LAMBDA_RUNTIME_API_PROXY=127.0.0.1:9002

AWS_LAMBDA_EXEC_WRAPPER=/opt/bootstrap

DD_API_KEY=$YOUR_API_KEY
DD_SERVICE=$YOUR_SERVICE_NAME
```
[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
 {{% /tab %}}
{{< /tabs >}}

#### 3. 준비 상태 엔드포인트 트레이싱 무시
\*_이 단계는 Datadog 트레이싱을 사용하는 경우에만 필요합니다_.
{{< tabs >}}
{{% tab "Container deployment" %}}

Lambda Web Adapter는 로드된 후 준비 점검 요청을 전송하므로, Datadog 확장은 이를 Lambda 함수를 트리거한 요청과 연결해서는 안 됩니다.

구성은 런타임에 따라 달라집니다. 준비 상태 엔드포인트가 기본값(`/`에서 `GET`)이라고 가정하면,

**Node.js**

```js
const tracer = require('dd-trace').init();
tracer.use('http', {
    blocklist: ['/']
});
 ```

**Python**

```python 
import ddtrace

ddtrace.patch_all()
from ddtrace.trace import tracer, TraceFilter
...
class IgnoreEndpointFilter(TraceFilter):
    def __init__(self, pattern, method):
        self.pattern = re.compile(pattern)
        self.method = method

    def process_trace(self, trace):
        for span in trace:
            url = span.get_tag("http.url")
            if (
                url is not None
                and self.pattern.match(url)
                and self.method == span.get_tag("http.method")
            ):
                return None
        return trace


tracer.configure(
    trace_processors=[IgnoreEndpointFilter(r"http://127.0.0.1:8080/", "GET")]
)
```
[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
 {{% /tab %}}

{{% tab "Zip deployment" %}}

Lambda Web Adapter는 로드된 후 준비 점검 요청을 전송하므로, Datadog 확장은 이를 Lambda 함수를 트리거한 요청과 연결해서는 안 됩니다.

구성은 런타임에 따라 달라집니다. 준비 상태 엔드포인트가 기본값(`/`에서 `GET`)이라고 가정하면,

**NodeJs**

```js
const tracer = require('dd-trace').init();
tracer.use('http', {
    blocklist: ['/']
});
```

**Python**

```python
import ddtrace

ddtrace.patch_all()
from ddtrace.trace import tracer, TraceFilter
...
class IgnoreEndpointFilter(TraceFilter):
    def __init__(self, pattern, method):
        self.pattern = re.compile(pattern)
        self.method = method

    def process_trace(self, trace):
        for span in trace:
            url = span.get_tag("http.url")
            if (
                url is not None
                and self.pattern.match(url)
                and self.method == span.get_tag("http.method")
            ):
                return None
        return trace


tracer.configure(
    trace_processors=[IgnoreEndpointFilter(r"http://127.0.0.1:8080/", "GET")]
)

```
[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
 {{% /tab %}}
{{< /tabs >}}



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
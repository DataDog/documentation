---

title: Datadog 포워더(Forwarder)를 사용한 루비(Ruby) 서버리스 애플리케이션 계측하기
---

## 개요

<div class="alert alert-warning">
Datadog 서버리스 신규 사용자인 경우 대신 <a href="/serverless/installation/ruby">Datadog 람다 확장을 사용해 람다 함수를 계측하기 위한 지침을 따르세요.</a> 람다에서 즉시 사용할 수 있는 기능을 제공하기 전 Datadog 포워더를 사용해 Datadog 서버리스를 설정한 경우 이 가이드를 따라 인스턴스를 유지관리하세요.
</div>

## 전제 조건

[Datadog 포워더(Forwarder) 람다 기능/함수][1]는 AWS 람다 트레이스, 향상된 메트릭, 커스텀 메트릭 및 로그를 수집하는 데 필요합니다.

## 설정

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI는 기존 Lambda 함수의 설정을 변경하여, 새롭게 배포할 필요 없이 계측하도록 해줍니다. 가장 빠르게 시작하는 방법은 Datadog의 서버리스 모니터링을 이용하는 것입니다.

또한 CI/CD 파이프라인에 명령을 추가하여 모든 서버리스 응용프로그램에 대한 계측을 활성화할 수 있습니다. Datadog CLI 명령에 의해 변경된 내용이 재정의되지 않도록 일반 서버리스 응용 프로그램 배포 *후* 명령을 실행합니다.

### 설치

NPM 또는 Yarn과 함께 Datadog CLI를 설치합니다:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### 계측

기능을 계측하려면 [AWS 증명서][1]과 함께 다음 명령을 실행합니다.

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder <forwarder_arn>
```

플레이스홀더 채우기:
- `<functionname>`및 `<another_functionname>`를 람다 함수 이름으로 대체합니다.
- `<aws_region>`을 AWS 리전 이름으로 대체합니다.
- 원하는 버전의 Datadog 람다 라이브러리를 `<layer_version>`으로 대체하세요. 최신 버전은 `{{< latest-lambda-layer-version layer="ruby" >}}`입니다.
- `<forwarder_arn>`을 포워더(Forwarder) ARN으로 대체합니다([포워더(Forwarder) 설명서][2] 참조).

예를 들어:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="ruby" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```

코드 서명에 사용할 람다 함수가 구성되어 있는 경우 Datadog 서명 프로파일 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][4]에 추가해야 Datadog CLI를 사용해 계측할 수 있습니다.

추가 정보와 추가 파라미터는 [CLI 설명서][3]에서 찾을 수 있습니다.

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
[3]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "서버리스 프레임워크" %}}

[Datadog 서버리스 플러그인][1]은 레이어를 사용하여 Datadog Lambda 라이브러리를 함수에 자동으로 추가하고 [Datadog 포워더][2]를 통해 메트릭, 트레이스 및 로그를 Datadog으로 전송하도록 함수를 설정합니다.

코드 서명에 사용할 람다 함수가 구성되어 있는 경우 Datadog 서명 프로파일 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][4]에 추가해야 Datadog 서버리스 플러그인을 설치할 수 있습니다.

Datadog 서버리스 플러그인을 설치 및 설정하려면 다음 단계를 따르세요:

1. Datadog 서버리스 플러그인을 설치합니다.
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


[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
[3]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "커스텀" %}}

### 설치

Datadog 람다 라이브러리는 레이어나 젬(GEM)으로 설치할 수 있습니다. 대부분의 함수의 경우 Datadog는 라이브러리를 레이어로 설치하는 것을 권장합니다. 람다 함수가 컨테이너 이미지로 구축된 경우 라이브러리를 젬으로 설치해야 합니다.

`datadog-lambda` 젬의 부 버전은 항상 레이어 버전과 일치해야 합니다. 예를 들어 datadog-lambda v0.5.0는 레이어 버전 5 콘텐츠와 일치해야 합니다.

#### 레이어 사용하기

다음 형식에 맞추어 ARN을 사용해 Lambda 함수의 [레이어를 설정합니다][1].

```
# For us,us3,us5,eu regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# For us-gov regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>
```

사용 가능한 `RUNTIME` 옵션은 `Ruby2-7`과 `Ruby3-2`입니다. 최신 `VERSION` 버전은 `{{< latest-lambda-layer-version layer="ruby" >}}`입니다. 예시:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-Ruby3-2:{{< latest-lambda-layer-version layer="ruby" >}}
```

코드 서명에 사용할 람다 함수가 구성되어 있는 경우 Datadog 서명 프로파일 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][4]에 추가해야 Datadog 람다 라이브러리를 레이어로 추가할 수 있습니다.

#### 젬 사용

사전 빌드된 Datadog 람다 레이어를 사용할 수 없는 경우 다음을 Gemfile에 대신 추가할 수 있습니다.

```Gemfile
gem 'datadog-lambda'
gem 'ddtrace'
```

`ddtrace`는 네이티브 확장을 포함하며 네이티브 확장은 아마존 리눅스(Amazon Linux)에 대해 컴파일되어야 AWS 람바와 함께 작동할 수 있습니다. 그러므로 Datadog은 람다를 컨테이너 이미지로 빌드하고 구축할 것을 권장합니다. 함수를 컨테이너 이미지로 구축할 수 없고 Datadog APM을 사용하길 원한다면 Datadog은 람다 라이브러리를 gem 대신 레이어로 설치할 것을 권장합니다.

함수의 도커 파일에서 `bundle install` 실행 전 `gcc`, `gmp-devel`, `make`를 설치하여 네이티브 확장이 성공적으로 컴파일되도록 합니다.

```dockerfile
FROM <base image>

# assemble your container image

RUN yum -y install gcc gmp-devel make
RUN bundle config set path 'vendor/bundle'
RUN bundle install
```

### 설정

Datadog 애플리케이션 성능 모니터링(APM)을 활성화하고 Datadog 람다 라이브러리에서 제공하는 래퍼(wrapper)를 사용해 람다 핸들러 함수를 래핑합니다. 

```ruby
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Enable the instrumentation
end

def handler(event:, context:)
    Datadog::Lambda.wrap(event, context) do
        return { statusCode: 200, body: 'Hello World' }
    end
end
```

### 연결

Datadog 포워더 람다 함수를 함수의 각 로그 그룹에 보냅니다. 이를 통해 Datadog에 메트릭, 트레이스와 로그를 전송할 수 있습니다.

1. [아직 설치하지 않았다면 Datadog 포워더를 설치하세요][2].
2. [함수의 로그 그룹에 Datadog 포워더를 보냅니다][3].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
[3]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{< /tabs >}}

### 태그

선택 사항이지만 Datadog은 [통합 서비스 태깅 설명서][2]에 따라 `env`,`service` 및 `version`태그를 사용해 서버리스 애플리케이션을 태깅할 것을 권장합니다.

## 탐색

위의 단계에 따라 함수를 설정한 후 [서버리스 홈페이지][3]에서 메트릭, 로그 및 트레이스를 확인합니다.

### 커스텀 비즈니스 로직 모니터링

커스텀 메트릭 또는 스팬을 제출하려면 아래 샘플 코드를 참조하세요:

```ruby
require 'ddtrace'
require 'datadog/lambda'

Datadog::Lambda.configure_apm do |c|
# Enable the instrumentation
end

def handler(event:, context:)
    # Apply the Datadog wrapper
    Datadog::Lambda::wrap(event, context) do
        # Add custom tags to the lambda function span,
        # does NOT work when X-Ray tracing is enabled
        current_span = Datadog::Tracing.active_span
        current_span.set_tag('customer.id', '123456')

        some_operation()

        Datadog::Tracing.trace('hello.world') do |span|
          puts "Hello, World!"
        end

        # Submit a custom metric
        Datadog::Lambda.metric(
          'coffee_house.order_value', # metric name
          12.45, # metric value
          time: Time.now.utc, # optional, must be within last 20 mins
          "product":"latte", # tag
          "order":"online" # another tag
        )
    end
end

# Instrument the function
def some_operation()
    Datadog::Tracing.trace('some_operation') do |span|
        # Do something here
    end
end
```

커스텀 메트릭 제출에 대한 자세한 내용은 [서버리스 커스텀 메트릭][4]을 참조하세요. 커스텀 계측에 대한 자세한 내용은 [커스텀 계측][5]의 Datadog APM 설명서를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/serverless/forwarder
[2]: /ko/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /ko/serverless/custom_metrics?tab=ruby
[5]: /ko/tracing/custom_instrumentation/ruby/
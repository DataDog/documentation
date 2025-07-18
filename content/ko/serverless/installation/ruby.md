---
aliases:
- /ko/serverless/datadog_lambda_library/ruby/
further_reading:
- link: serverless/datadog_lambda_library/ruby
  tag: 설명서
  text: 루비(Ruby)의 Datadog Lambda 라이브러리
- link: serverless/distributed_tracing/
  tag: 설명서
  text: 서버리스 애플리케이션 \u0008추적
- link: serverless/custom_metrics/
  tag: 설명서
  text: 서버리스 애플리케이션용 커스텀 메트릭 제출하기
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: 설명서
  text: 서버리스 모니터링 트러블슈팅
kind: 설명서
title: 루비(Ruby) 서버리스 애플리케이션 계측하기
---

<div class="alert alert-warning">이전에 Datadog 포워더(Forwarder)를 사용하여 Lambda 함수를 설정한 경우 <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_ruby">Datadog 포워더(Forwarder)를 사용해 계측하기</a>를 참조하세요. 또는, 이 안내서의 지침에 따라 Datadog Lambda 확장을 사용하여 계측하세요.</div>

<div class="alert alert-warning">Lambda 함수가 인터넷에 액세스할 수 없는 VPC에 배포된 경우 <code>datadoghq.com</code> <a href="/getting_started/site/">Datadog 사이트</a>에서는 <a href="/agent/guide/private-link/">AWS PrivateLink</a>를 사용하고, 그 외의 모든 사이트에서는 <a href="/agent/proxy/">프록시를 사용해</a> 데이터를 전송할 수 있습니다.</div>

## 설치

Datadog은 서버리스 애플리케이션 계측을 활성화하는 다양한 방법을 제공합니다. 아래에서 사용자의 요구에 가장 적합한 방법을 선택하세요. Datadog은 일반적으로 Datadog CLI 사용을 권장합니다. 애플리케이션이 컨테이너 이미지로 배포된 경우 *반드시* "컨테이너 이미지"에 대한 지침서를 따라야 합니다.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI는 기존 Lambda 함수의 설정을 변경하여, 새롭게 배포할 필요 없이 계측하도록 해줍니다. 가장 빠르게 시작하는 방법은 Datadog의 서버리스 모니터링을 이용하는 것입니다.

1. 람다 함수 설정하기

   Datadog 애플리케이션 성능 모니터링(APM)을 활성화하고 Datadog 람다 라이브러리에서 제공하는 래퍼를 사용하여 람다 핸들러 함수를 래핑합니다.

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

2. Datadog CLI 클라이언트 설치

    ```sh
    npm install -g @datadog/datadog-ci
    ```

3. Datadog 서버리스 모니터링이 익숙하지 않은 경우, 인터랙티브 모드에서 Datadog CLI를 부팅하고 빠른 시작용 가이드를 따라 첫 설치를 완료하세요. 이렇게 하면 나머지 단계를 무시할 수 있습니다. 실제 애플리케이션에 Datadog를 영구적으로 설치하려면 이 단계를 건너뛰고 나머지 단계에 따라 일반적인 배포 _이후에 _ CI/CD 파이프라인에서 Datadog CLI 명령을 실행하세요.

    ```sh
    datadog-ci lambda instrument -i
    ```

4. AWS 자격증명을 설정합니다.

   Datadog CLI를 사용하려면 AWS 람다 서비스에 액세스해야 하며, [인증 정보 확인][1]을 위해 AWS 자바스크립트(Javascript) SDK에 의존합니다. AWS CLI를 호출할 때 사용한 것과 동일한 방법으로 AWS 증명서를 설정해야 합니다.

5. Datadog 사이트를 설정합니다.

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

   `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 대체하세요. (오른쪽에 올바른 사이트가 선택되었는지 확인합니다.)

6. Datadog API 키를 설정합니다.

   Datadog는 보안상의 목적과 간단한 로테이션을 위해 Datadog API 키를 AWS Secrets Manager에 저장해두시길 권장합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). Lambda 함수에 필요한 `secretsmanager:GetSecretValue` IAM 권한이 있는지 확인하세요.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

   빠른 테스트를 위해 Datadog API 키를 플레인 텍스트로 설정할 수도 있습니다.

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

7. Lambda 함수 계측

    **참고**: 람다 함수를 개발 환경 또는 스테이징 환경에서 먼저 계측해보세요! 계측 결과가 만족스럽지 않은 경우, 같은 인수로 `uninstrument`를 실행해 변경을 원래대로 복원하세요.

   람다 함수를 계측하려면 다음의 명령어를 실행하세요.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="ruby" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

   플레이스홀더를 채우는 방법:
    - `<functionname>` 및 `<another_functionname>`을 Lambda 함수 이름으로 대체합니다. 또는 `--functions-regex`를 사용해 특정 정규 표현식과 이름이 일치하는 여러 함수를 자동 계측할 수 있습니다.
    - `<aws_region>`을 AWS 지역 이름으로 대체합니다.

    이외의 파라미터는 [CLI 설명서][3]에서 찾아볼 수 있습니다.


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "서버리스 프레임워크" %}}

[Datadog 서버리스 플러그인][1]이 [Datadog 람다 확장][2]을 통해 메트릭, 트레이스, 로그를 Datadog로 전송하도록 함수를 자동 설정합니다.

Datadog 서버리스 플러그인을 설치 및 설정하려면 다음 단계를 따르세요:

1. 람다 함수 설정하기

   Datadog APM을 활성화하고 Datadog 람다 라이브러리에서 제공하는 래퍼를 사용하여 람다 핸들러 함수를 래핑합니다.

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

2. Datadog 서버리스 플러그인을 설치합니다.

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

3. `serverless.yml`을 업데이트합니다.

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

   플레이스홀더를 채우는 방법:
    - `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 대체하세요. (오른쪽에 올바른 사이트가 선택되었는지 확인합니다.)
    - `<DATADOG_API_KEY_SECRET_ARN>`을 [Datadog API 키][4]가 안전하게 저장된 AWS 암호 ARN으로 대체합니다. 키는 일반 텍스트 문자열로로 저장해야 합니다(JSON blob 안 됨). 또한, `secretsmanager:GetSecretValue` 권한이 있어야 합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.

    더 자세한 정보와 추가 설정 방법은 [플러그인 설명서][1]에서 찾아볼 수 있습니다.

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container Image" %}}

1. Datadog 람다 라이브러리 설치하기

   람다 함수를 컨테이너 이미지로 배포하는 경우 Datadog 람다 라이브러리를 람다 레이어로 사용할 수 없습니다. 대신 이미지 내에서 Datadog 람다 및 트레이싱 라이브러리를 패키지화해야 합니다.

    다음을 Gemfile에 추가합니다:

    ```Gemfile
    gem 'datadog-lambda'
    gem 'ddtrace'
    ```

    `ddtrace`에는 AWS 람다와 함께 작동하도록 Amazon Linux에 컴파일해야 하는 기본 확장이 포함되어 있습니다.

   함수의 도커 파일에서 `bundle install`를 실행하기 전에 `gcc`, `gmp-devel`및 `make`를 설치하여 네이티브 확장자를 성공적으로 컴파일할 수 있도록 합니다.

    ```dockerfile
    FROM <base image>

    # assemble your container image

    RUN yum -y install gcc gmp-devel make
    RUN bundle config set path 'vendor/bundle'
    RUN bundle install
    ```

2. Datadog 람다 확장을 설치합니다.

   다음을 도커 파일에 추가하여 Datadog 람다 확장을 컨테이너 이미지에 추가합니다:

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
    ```

   `<TAG>`를 특정 버전 번호(예: `{{< latest-lambda-layer-version layer="extension" >}}`) 또는 `latest`로 대체합니다. 이용 가능한 태그 목록은 [Amazon ECR 리포지터리][1]에서 확인할 수 있습니다.

3. 람다 함수 설정하기

   Datadog APM을 활성화하고 Datadog 람다 라이브러리에서 제공하는 래퍼를 사용하여 람다 핸들러 함수를 래핑합니다.

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

4. Datadog 사이트 및 API 키 설정하기

    - 환경 변수 `DD_SITE`를 {{< region-param key="dd_site" code="true" >}}로 설정하세요 (오른쪽에서 올바른 사이트가 선택되었는지 확인).
    - 환경 변수 `DD_API_KEY_SECRET_ARN`을 [Datadog API 키][4]가 안전하게 저장된 AWS 시크릿의 ARN으로 대체합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). 또한, `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY`를 사용하고 Datadog API 키를 플레인 텍스트로 설정할 수 있습니다.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "커스텀" %}}

<div class="alert alert-info">서버리스 프레임워크와 같이 Datadog이 지원하는 서버리스 개발 도구를 사용하지 않는 경우 <a href="./?tab=datadogcli">Datadog CLI</a>를 사용한 서버리스 애플리케이션 계측을 권장합니다 .</div>

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Datadog 람다 라이브러리 설치하기

   Datadog 람다 라이브러리는 레이어 또는 gem으로 설치할 수 있습니다. 대부분의 함수에 대해 Datadog은 라이브러리를 레이어로 설치할 것을 권장합니다. 람다 기능이 컨테이너 이미지로 배포된 경우 라이브러리를 gem으로 설치해야 합니다.

   `datadog-lambda` gem의 보조 버전은 항상 레이어 버전과 일치합니다. 예를 들어 datadog-lambda v0.5.0은 레이어 버전 5의 내용과 일치합니다.

    - 옵션 A: 다음 형식의 ARN을 사용하여 람다 함수에 사용할 [레이어 설정][1]:

      ```sh
      # Use this format for AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}

      # Use this format for AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}
      ```

      `<AWS_REGION>`를 `us-east-1`와 같이 유효한 AWS 지역으로 대체합니다. 가능한 `RUNTIME`옵션은 `Ruby2-7`와 `Ruby3-2`입니다.

    - 옵션 B: 사전 구축된 Datadog 람다 레이어를 사용할 수 없는 경우, 대신 Gemfile에 추가하여 gem`datadog-lambda`와 `ddtrace`을 설치할 수 있습니다:

      ```Gemfile
      gem 'datadog-lambda'
      gem 'ddtrace'
      ```

      `ddtrace`는 네이티브 확장을 포함하며 네이티브 확장은 아마존 리눅스(Amazon Linux)에 대해 컴파일되어야 AWS 람바와 함께 작동할 수 있습니다. 그러므로 Datadog은 람다를 컨테이너 이미지로 빌드하고 구축할 것을 권장합니다. 함수를 컨테이너 이미지로 구축할 수 없고 Datadog APM을 사용하길 원한다면 Datadog는 람다 라이브러리를 gem 대신 레이어로 설치할 것을 권장합니다.

      함수의 Dockerfile에서 `bundle install` 실행 전 `gcc`, `gmp-devel`, `make`를 설치하여 네이티브 확장이 성공적으로 컴파일되도록 합니다.

      ```dockerfile
      FROM <base image>

      # assemble your container image

      RUN yum -y install gcc gmp-devel make
      RUN bundle config set path 'vendor/bundle'
      RUN bundle install
      ```

2. Datadog 람다 확장 설치

    - 옵션 A: 다음 형식의 ARN을 사용하여 람다 함수에 사용할 [레이어 설정][1]:

      ```sh
      # Use this format for x86-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for arm64-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for x86-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
      ```

      `<AWS_REGION>`를 `us-east-1`와 같이 유효한 AWS 지역으로 대체합니다. 

    - 옵션 B: 도커 파일에 다음을 추가하여 Datadog 람다 확장을 컨테이너 이미지에 추가합니다:

      ```dockerfile
      COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
      ```

      `<TAG>`를 특정 버전 번호(예: `{{< latest-lambda-layer-version layer="extension" >}}`) 또는 `latest`로 대체합니다. 이용 가능한 태그 목록은 [Amazon ECR 리포지터리][1]에서 확인할 수 있습니다.


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://gallery.ecr.aws/datadog/lambda-extension
{{< /site-region >}}

{{< site-region region="ap1" >}}
1. Datadog 람다 라이브러리 설치하기

   Datadog 람다 라이브러리는 레이어 또는 gem으로 설치할 수 있습니다. 대부분의 함수에 대해 Datadog은 라이브러리를 레이어로 설치할 것을 권장합니다. 람다 기능이 컨테이너 이미지로 배포된 경우 라이브러리를 gem으로 설치해야 합니다.

   `datadog-lambda` gem의 보조 버전은 항상 레이어 버전과 일치합니다. 예를 들어 datadog-lambda v0.5.0은 레이어 버전 5의 내용과 일치합니다.

    - 옵션 A: 다음 형식의 ARN을 사용하여 람다 기능/함수에 사용할 [레이어 설정][1]:

      ```sh
      # Use this format for AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}

      # Use this format for AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="ruby" >}}
      ```

      `<AWS_REGION>`를 `us-east-1`와 같이 유효한 AWS 지역으로 대체합니다. 가능한 `RUNTIME`옵션은 `Ruby2-7`와 `Ruby3-2`입니다.

    - 옵션 B: 사전 구축된 Datadog 람다 레이어를 사용할 수 없는 경우, 대신 Gemfile에 추가하여 gem `datadog-lambda`와 `ddtrace`을 설치할 수 있습니다:

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

2. Datadog 람다 확장 설치

    - 옵션 A: 다음 형식의 ARN을 사용하여 람다 함수에 사용할 [레이어 설정][1]:

      ```sh
      # Use this format for x86-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for arm64-based Lambda deployed in AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for x86-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

      # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
      ```

      `<AWS_REGION>`를 `us-east-1`와 같이 유효한 AWS 지역으로 대체합니다. 

    - 옵션 B: 도커 파일에 다음을 추가하여 Datadog 람다 확장을 컨테이너 이미지에 추가합니다:

      ```dockerfile
      COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
      ```

      `<TAG>`를 특정 버전 번호(예: `{{< latest-lambda-layer-version layer="extension" >}}`) 또는 `latest`로 대체합니다. 이용 가능한 태그 목록은 [Amazon ECR 리포지터리][1]에서 확인할 수 있습니다.


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://gallery.ecr.aws/datadog/lambda-extension
{{< /site-region >}}

3. 람다 함수 설정하기

   Datadog APM을 활성화하고 Datadog 람다 라이브러리에서 제공하는 래퍼를 사용하여 람다 핸들러 함수를 래핑합니다.

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

4. Datadog 사이트 및 API 키 설정하기

    - 환경 변수 `DD_SITE`를 {{< region-param key="dd_site" code="true" >}} (정확한 사이트가 정확한 곳에 선택되었는지 확인하세요)로 대체합니다. 
    - 환경 변수 `DD_API_KEY_SECRET_ARN`을 [Datadog API 키][4]가 안전하게 저장된 AWS 시크릿의 ARN으로 대체합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). 또한, `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY`를 사용하고 Datadog API 키를 플레인 텍스트로 설정할 수 있습니다.

[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## 다음 단계

- [서버리스 홈페이지][4]에서 메트릭, 로그 및 트레이스를 확인할 수 있습니다. 
- [위협 모니터링][9]을 설정하여 서비스를 노리는 공격자에 대한 알림을 받습니다.
- [커스텀 비즈니스 로직 모니터링](#monitor-custom-business-logic)을 위해 샘플 코드를 참조하세요.
- 텔레메트리를 수집하는 데 문제가 있는 경우 [문제 해결 가이드][5]를 참조하세요.
- [고급 설정][6]을 참조하여
    - 태그를 활용해 텔레메트리 연결
    - AWS API Gateway, SQS 등의 텔레메트리 수집
    - 람다 요청과 응답 페이로드 캡처
    - Lambda 함수의 오류를 소스 코드에 링크
    - 로그나 트레이스에서 민감 정보를 필터링 또는 스크러빙

### 커스텀 비즈니스 로직 모니터링

커스텀 비즈니스 로직을 모니터링하려면 아래 샘플 코드를 사용하여 커스텀 메트릭 또는 스팬(span)을 제출하세요. 추가 옵션은 [서버리스 애플리케이션에 대한 커스텀 메트릭 제출][7] 및 [커스텀 계측][8]에 대한 애플리케이션 성능 모니터링(APM) 가이드를 참조하세요.

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

커스텀 메트릭 제출에 대한 자세한 내용은 [서버리스 커스텀 메트릭][7]을 참조하세요. 커스텀 계측에 대한 자세한 내용은 [커스텀 계측][8]의 Datadog 애플리케이션 성능 모니터링(APM) 설명서를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/serverless/forwarder/
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[4]: https://app.datadoghq.com/functions
[5]: /ko/serverless/guide/troubleshoot_serverless_monitoring/
[6]: /ko/serverless/configuration
[7]: /ko/serverless/custom_metrics?tab=ruby
[8]: /ko/tracing/custom_instrumentation/ruby/
[9]: /ko/security/application_security/enabling/serverless/?tab=serverlessframework
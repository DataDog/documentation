---
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
title: .NET 서버리스 애플리케이션의 계측
---

<div class="alert alert-warning">Datadog Lambda Extension은 .NET Lambda 함수의 `x86_64` 아키텍처만을 지원합니다. .NET Lambda 함수가 `arm64` 아키텍처를 사용하는 경우, 대신 <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_dotnet">Datadog Forwarder를 이용해 계측</a>해야 합니다.</div>

<div class="alert alert-warning">Lambda 함수가 공용 인터넷에 액세스할 수 없는 VPC에 배포된 경우 <code>datadoghq.com</code> <a href="/getting_started/site/">Datadog 사이트</a>에서는 <a href="/agent/guide/private-link/">AWS PrivateLink</a>를 사용하고, 그 외의 모든 사이트에서는 <a href="/agent/proxy/">프록시를 사용해</a> 데이터를 전송할 수 있습니다.</div>

## 설치

Datadog는 다양한 서버리스 애플리케이션 계측 방법을 제공합니다. 아래에서 니즈에 가장 적합한 방법을 선택하세요. 일반적으로는 Datadog CLI를 사용하시길 권장합니다.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI는 기존 Lambda 함수의 설정을 변경하여, 새롭게 배포할 필요 없이 계측하도록 해줍니다. 가장 빠르게 시작하는 방법은 Datadog의 서버리스 모니터링을 이용하는 것입니다.

1. Datadog CLI 클라이언트를 설치합니다.

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Datadog 서버리스 모니터링이 익숙하지 않은 경우, 인터랙티브 모드에서 Datadog CLI를 부팅하고 빠른 시작용 가이드를 따라 첫 설치를 완료하세요. 이렇게 하면 나머지 단계를 무시할 수 있습니다. 실제 애플리케이션에 Datadog를 영구적으로 설치하려면 이 단계를 건너뛰고 나머지 단계에 따라 일반적인 배포 _이후에 _ CI/CD 파이프라인에서 Datadog CLI 명령을 실행하세요.

    ```sh
    datadog-ci lambda instrument -i
    ```

3. AWS 자격증명을 설정합니다.

   Datadog CLI는 AWS Lambda 서비스의 액세스가 필요하며, AWS 자바스크립트(Javascript) SDK를 [자격증명 시 활용합니다][1]. AWS CLI를 호출할 때와 동일한 방법으로 AWS 자격증명이 구성되어 있는지 확인하세요.

4. Datadog 사이트를 설정합니다.

   텔레메트리 전송 대상으로 [Datadog 사이트][2]를 지정합니다. 기본값은 `datadoghq.com`입니다.

    ```sh
    export DATADOG_SITE="<DD_SITE>" # such as datadoghq.com, datadoghq.eu or ddog-gov.com
    ```

5. Datadog API 키를 설정합니다.

   Datadog는 보안상의 목적과 간단한 로테이션을 위해 Datadog API 키를 AWS Secrets Manager에 저장해두시길 권장합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). Lambda 함수에 필요한 `secretsmanager:GetSecretValue` IAM 권한이 있는지 확인하세요.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

   빠른 테스트를 위해 Datadog API 키를 플레인 텍스트로 설정할 수도 있습니다.

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Lambda 함수 계측

    **참조**: Lambda 함수를 개발 환경 또는 스테이징 환경에서 먼저 계측해보세요! 계측 결과가 만족스럽지 않은 경우, 같은 인수로 `uninstrument`를 실행해 변경을 원래대로 복원하세요.

   Lambda 함수를 계측하려면 다음의 명령어를 실행하세요.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="dd-trace-dotnet" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

   플레이스홀더에 내용을 입력하려면:
    - `<functionname>` 및 `<another_functionname>`을 Lambda 함수 이름으로 대체합니다. 또는 `--functions-regex`를 사용해 특정 정규 표현식과 이름이 일치하는 여러 함수를 자동 계측할 수 있습니다.
    - `<aws_region>`을 AWS 리전 이름으로 대체합니다.

    이외의 파라미터는 [CLI 설명서][3]에서 찾아볼 수 있습니다.

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/kr/getting_started/site/
[3]: https://docs.datadoghq.com/kr/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Plugin][1]이 [Datadog Lambda Extension][2]을 통해 메트릭, 트레이스, 로그를 Datadog로 전송하도록 함수를 자동 설정합니다.

Datadog Serverless Plugin을 설치하고 설정하려면 다음 절차를 따라주세요.

1. Datadog Serverless Plugin을 설치합니다.

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. `serverless.yml`을 업데이트합니다.

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

   플레이스홀더에 내용을 입력하려면:
    - `<DATADOG_SITE>`를 텔레메트리 전송 대상인 [Datadog 사이트][3]로 대체합니다.
    - `<DATADOG_API_KEY_SECRET_ARN>`을 [Datadog API 키][4]가 안전하게 저장된 AWS 시크릿의 ARN으로 대체합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). 또한, `secretsmanager:GetSecretValue` 권한이 있어야 합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 플레인 텍스트로 설정할 수 있습니다.

    더 자세한 정보와 추가 설정 방법은 [플러그인 설명서][1]에서 찾아볼 수 있습니다.

[1]: https://docs.datadoghq.com/kr/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/kr/serverless/libraries_integrations/extension
[3]: https://docs.datadoghq.com/kr/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "컨테이너 이미지" %}}

1. Datadog Lambda Extension을 설치합니다.

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
    ```

   `<TAG>`를 특정 버전 번호(예: `{{< latest-lambda-layer-version layer="extension" >}}`) 또는 `latest`로 대체합니다. 이용 가능한 태그 목록은 [Amazon ECR 리포지터리][1]에서 확인할 수 있습니다.

2. Datadog .NET APM 클라이언트를 설치합니다.

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget https://github.com/DataDog/dd-trace-dotnet/releases/download/v<TRACER_VERSION>/datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    RUN mkdir /opt/datadog
    RUN tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz
    ENV CORECLR_ENABLE_PROFILING=1
    ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    ENV DD_DOTNET_TRACER_HOME=/opt/datadog
    ```

   `<TRACER_VERSION>`을 사용하고 싶은 `dd-trace-dotnet` 버전 번호로 대체합니다(예: `2.3.0`). 최소 지원 버전은 2.3.0입니다. 최신 `dd-trace-dotnet` 버전은 [GitHub][2]에서 확인할 수 있습니다.

3. 필요한 환경 변수를 설정합니다.

    - 환경 변수 `DD_SITE`를 텔레메트리 전송 대상인 [Datadog 사이트][3]로 설정합니다.
    - 환경 변수 `DD_API_KEY_SECRET_ARN`을 [Datadog API 키][4]가 안전하게 저장된 AWS 시크릿의 ARN으로 대체합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). 또한, `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY`를 사용하고 Datadog API 키를 플레인 텍스트로 설정할 수 있습니다.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://github.com/DataDog/dd-trace-dotnet/releases
[3]: https://docs.datadoghq.com/kr/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "커스텀" %}}

1. Datadog Lambda Extension을 설치합니다.

   다음 형식에 맞추어 ARN을 사용해 Lambda 함수의 [레이어를 설정합니다][1].

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`

2. Datadog .NET APM 클라이언트를 설치합니다.

   다음 형식에 맞추어 ARN을 사용해 Lambda 함수의 [레이어를 설정합니다][1].

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}`

3. 필요한 환경 변수를 설정합니다.

    - `CORECLR_ENABLE_PROFILING`을 `1`로 설정하세요.
    - `CORECLR_PROFILER`를 `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}`로 설정하세요.
    - `CORECLR_PROFILER_PATH`를 `/opt/datadog/Datadog.Trace.ClrProfiler.Native.so`로 설정하세요.
    - `DD_DOTNET_TRACER_HOME`를 `/opt/datadog`로 설정하세요.
    - `DD_SITE`를 텔레메트리 전송 대상인 [Datadog 사이트][2]로 설정하세요.
    - `DD_API_KEY_SECRET_ARN`을 [Datadog API 키][3]가 안전하게 저장된 AWS 시크릿의 ARN으로 대체합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). 또한, `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY`를 사용하고 Datadog API 키를 플레인 텍스트로 설정할 수 있습니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/kr/getting_started/site/
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## 다음 단계

- 이제 [Serverless Homepage][1]에서 메트릭, 로그, 트레이스를 조회할 수 있습니다.
- [커스텀 메트릭][2] 또는 [APM 스팬(span)][3]을 제출해 비즈니스 로직을 모니터링할 수 있습니다.
- 텔레메트리 수집 중 문제가 발생한 경우 [트러블슈팅 가이드][4]를 참조하세요
- [고급 설정][5]을 참조해 다음 기능을 사용할 수도 있습니다.
    - 태그를 활용해 텔레메트리 연결
    - AWS API Gateway, SQS 등의 텔레메트리 수집
    - Lambda 리퀘스트 및 리스폰스 페이로드 확인
    - Lambda 함수의 오류를 소스 코드에 링크
    - 로그나 트레이스에서 민감 정보를 필터링 또는 스크러빙

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/kr/metrics/dogstatsd_metrics_submission/
[3]: /kr/tracing/custom_instrumentation/dotnet/
[4]: /kr/serverless/guide/troubleshoot_serverless_monitoring/
[5]: /kr/serverless/configuration/
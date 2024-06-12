---
aliases:
- /ko/security/application_security/getting_started/serverless
further_reading:
- link: /security/application_security/how-appsec-works/
  tag: 설명서
  text: 애플리케이션 보안 작동 방법
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB 애플리케이션 보안 관리 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: 애플리케이션 보안 관리 트러블슈팅
- link: /security/application_security/threats/
  tag: 설명서
  text: 애플리케이션 위협 관리
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: 블로그
  text: Datadog 보안이 Google Cloud 기능의 규정을 준수하고 위협으로부터 보호하도록 확장됨
kind: 설명서
title: 서버리스에서 ASM 활성화
---

{{< partial name="security-platform/appsec-serverless.html" >}}</br>

서버리스 기능에 사용할 수 있는 ASM 기능에 대해 자세히 알아보려면 [호환성 요구 사항][4]을 참고하세요.

## AWS Lambda

AWS Lambda에 ASM을 구성하는 데에는 다음 요소가 포함됩니다.

1. 취약하거나 위험 요소가 있는 기능을 파악하는 ASM의 이점을 누릴 수 있습니다. [Service Catalog의 Security 탭][1]에서 이 정보를 확인할 수 있습니다.
2. [Datadog CLI](https://docs.datadoghq.com/serverless/serverless_integrations/cli), [AWS CDK](https://github.com/DataDog/datadog-cdk-constructs), [Datadog Serverless Framework 플러그인][6]을 사용하거나 Datadog 추적 레이어를 수동으로 사용해 ASM 계측을 설정합니다.
3. 애플리케이션에서 보안 신호를 트리거해 Datadog에서 결과 정보를 표시하는 것을 확인합니다.

### 사전 필수 요건

- [Serverless APM Tracing][apm-lambda-tracing-setup]은 Lambda 함수에 설치되어 Datadog로 트레이스를 바로 전송합니다.
  X-Ray 추적만으로는 ASM에 충분치 않기 때문에 APM Tracing을 활성화해야 합니다.

### 시작하기

{{< tabs >}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Framework 플러그인][1]을 사용해 ASM을 사용해 자동으로 Lambda를 구성하고 배포할 수 있습니다.

Datadog Serverless Framwork 플러그인을 설치하고 구성하려면 다음을 따르세요.

1. Datadog Serverless Framework 플러그인을 설치합니다.
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```

2. `serverless.yml`에서 `enableASM` 구성 파라미터를 업데이트해 ASM을 활성화합니다.
   ```yaml
   custom:
     datadog:
       enableASM: true
   ```

   일반적으로 새 `serverless.yml` 파일에는 최소 다음이 포함되어 있습니다.
   ```yaml
   custom:
     datadog:
       apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}" # or apiKey
       enableDDTracing: true
       enableASM: true
   ```
   Lambda 설정을 더 자세히 구성하려면 [플러그인 파라미터][4] 전체 목록을 확인하세요.

4. 함수를 다시 배포하고 호출합니다. 몇 분 후에 [ASM 보기][3]에 표시됩니다.

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[4]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/plugin/#configuration-parameters

{{% /tab %}}
{{% tab "Datadog CLI" %}}

Datadog CLI는 기존 Lambda 함수의 구성을 변경하여 새롭게 배포할 필요 없이 계측하도록 해줍니다. 가장 빠르게 시작하는 방법은 Datadog의 서버리스 모니터링을 이용하는 것입니다.

**내 함수에 첫 추적을 구성하는 중일 경우** 다음 단계를 실하세요.

1. Datadog CLI 클라이언트를 설치합니다.

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Datadog 서버리스 모니터링이 익숙하지 않은 경우, 인터랙티브 모드에서 Datadog CLI를 부팅하고 빠른 시작용 가이드를 따라 첫 설치를 완료하세요. 이렇게 하면 나머지 단계를 건너뛸 수 있습니다. 실제 애플리케이션에 Datadog를 영구적으로 설치하려면 이 단계를 건너뛰고 나머지 단계에 따라 일반적인 배포 이후에 CI/CD 파이프라인에서 Datadog CLI 명령을 실행하세요.

    ```sh
    datadog-ci lambda instrument -i --appsec
    ```

3. AWS 자격증명을 구성합니다.

   Datadog CLI를 사용하려면 AWS Lambda 서비스에 액세스할 수 있어야 하며, [인증 정보 확인][1]을 위해 AWS JavaScript SDK가 필요합니다. AWS CLI를 호출할 때 사용한 것과 동일한 방법으로 AWS 자격 증명을 설정해야 합니다.

4. Datadog 사이트를 구성합니다.

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

   `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 변경하세요(이 페이지 오른쪽에 올바른 **Datadog site**가 선택되어 있는지 확인). 

5. Datadog API 키를 구성합니다.

   Datadog에서는 보안을 지키기 위해 Datadog API 키를 AWS Secrets Manager에 저장하는 것을 권장합니다. 또한 키를 (JSON Blob이 아닌) 일반 텍스트 문자열로 저장해야 합니다. Lambda 함수에 필수 `secretsmanager:GetSecretValue` IAM 권한이 있는지 확인하세요.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

   테스트를 위해 Datadog API 키를 일반 텍스트로 설정할 수도 있습니다.

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Lambda 함수를 계측합니다.

   Lambda 함수를 계측하려면 다음 명령을 실행하세요.

    ```sh
    datadog-ci lambda instrument --appsec -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

   자리 표시자를 채우는 방법:
    - `<functionname>` 및 `<another_functionname>`를  Lambda 함수 이름으로 교체합니다.
    - 또는 `--functions-regex`를 사용해 특정 정규 표현식과 이름이 일치하는 여러 함수를 자동 계측할 수 있습니다.
    - `<aws_region>`을 AWS 리전 이름으로 대체합니다.

    **참고**: Lambda 함수를 개발이나 스테이징 환경에서 먼저 계측해 보세요. 계측 결과가 만족스럽지 않은 경우, 같은 인수로 `uninstrument`를 실행해 변경을 원래대로 복원하세요.

   이외의 파라미터는 [CLI 설명서][2]에서 찾아볼 수 있습니다.


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli

{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog CDK 구문][1]은 자동으로 Lambda 레이어를 사용해 함수에서 Datadog를 설치합니다. 함수를 설정하여 Datadog Lambda Extension을 통해 Datadog에 메트릭, 트레이스 및 로그를 전송합니다.

1. Datadog CDK 구문 라이브러리를 설치합니다.

    ```sh
    # For AWS CDK v1
    pip install datadog-cdk-constructs

    # For AWS CDK v2
    pip install datadog-cdk-constructs-v2
    ```

2. Lambda 함수 계측

    ```python
    # For AWS CDK v1
    from datadog_cdk_constructs import Datadog
    # NOT SUPPORTED IN V1

    # For AWS CDK v2
    from datadog_cdk_constructs_v2 import Datadog

    datadog = Datadog(self, "Datadog",
        python_layer_version={{< latest-lambda-layer-version layer="python" >}},
        extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
        site="<DATADOG_SITE>",
        api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>", // or api_key
        enable_asm=True,
      )
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
    ```

   자리 표시자를 채우는 방법:
    - `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}}로 변경하세요. (오른쪽에 올바른 사이트가 선택되었는지 확인합니다.)
    - `<DATADOG_API_KEY_SECRET_ARN>`을 [Datadog API 키][2]가 안전하게 저장된 AWS 암호 ARN으로 대체합니다. 키는 일반 텍스트 문자열로로 저장해야 합니다(JSON blob 안 됨). 또 `secretsmanager:GetSecretValue` 권한이 있어야 합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.

    자세한 정보 및 추가 파라미터는 [Datadog CDK 설명서][1]에서 찾아볼 수 있습니다.

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "커스텀" %}}

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Datadog 트레이서를 설치합니다.
   - **Python**
       ```sh
       # Use this format for x86-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for x86-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:72
          ```
          `<AWS_REGION>`을  `us-east-1`와 같은 유효 AWS 리전으로 변경하세요. 사용할 수 있는 `RUNTIME` 옵션은 `Python37`, `Python38`, `Python39`입니다.

   - **Node**
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
         ```
         `<AWS_REGION>`을 `us-east-1`와 같은 유효한 AWS 리전으로 변경하세요. 사용 가능한 RUNTIME 옵션은 {{< latest-lambda-layer-version layer="node-versions" >}}입니다.

   - **Java**: Lambda가 배포된 위치에 따라 다음 형식 중 하나의 ARN을 사용해 Lambda 함수의 [레이어를 구성][1]하세요. `<AWS_REGION>`을 `us-east-1`와 같은 유효 AWS 리전으로 바꾸세요.
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     ```
   - **Go**: Go 트레이서는 레이어에 의존하지 않고 일반 Go 모듈입니다. 다음으로 최신 버전으로 업그레이드할 수 있습니다.
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET**: Lambda가 배포된 위치에 따라 다음 형식 중 하나의 ARN을 사용해 Lambda 함수의 [레이어를 구성][1]하세요. `<AWS_REGION>`을 `us-east-1`와 같은 유효 AWS 리전으로 바꾸세요.
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     ```
2. 다음 형식 중 하나의 ARN을 사용해 Lambda 함수의 레이어를 구성하여 Datadog Lambda Extension을 설치합니다. `<AWS_REGION>`를 `us-east-1`와 같은 유효 AWS 리전으로 바꾸세요.
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```
   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

{{< site-region region="ap1" >}}
1. Datadog 트레이서를 설치합니다.
   - **Python**
       ```sh
       # Use this format for x86-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for x86-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}
          ```
         `<AWS_REGION>`을 `us-east-1`와 같은 유효한 AWS 리전으로 변경하세요. 사용 가능한 `RUNTIME` 옵션은 {{< latest-lambda-layer-version layer="python-versions" >}}입니다.
.

   - **Node**
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
         ```
         `<AWS_REGION>`을 `us-east-1`와 같은 유효한 AWS 리전으로 변경하세요. 사용 가능한 RUNTIME 옵션은 {{< latest-lambda-layer-version layer="node-versions" >}}입니다.


   - **Java**: Lambda가 배포된 위치에 따라 다음 형식 중 하나의 ARN을 사용해 Lambda 함수의 [레이어를 구성][1]하세요. `<AWS_REGION>`을 `us-east-1`와 같은 유효 AWS 리전으로 바꾸세요.
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     ```
   - **Go**: Go 트레이서는 레이어에 의존하지 않고 일반 Go 모듈입니다. 다음으로 최신 버전으로 업그레이드할 수 있습니다.
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET**: Lambda가 배포된 위치에 따라 다음 형식 중 하나의 ARN을 사용해 Lambda 함수의 [레이어를 구성][1]하세요. `<AWS_REGION>`을 `us-east-1`와 같은 유효 AWS 리전으로 바꾸세요.
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     ```
2. 다음 형식 중 하나의 ARN을 사용해 Lambda 함수의 레이어를 구성하여 Datadog Lambda Extension을 설치합니다. `<AWS_REGION>`를 `us-east-1`와 같은 유효 AWS 리전으로 바꾸세요.
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```

   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

3. 함수 배포에 다음 환경 변수를 추가해 ASM을 활성화합니다.
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```

4. **Node**와 **Python** 함수의 경우, 함수 핸들러가 올바르게 설정되어 있는지 다시 확인하세요.
    - **Node**: 함수 핸들러를 `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler`로 설정합니다.
       - 또 환경 변수 `DD_LAMBDA_HANDLER`를 `myfunc.handler`와 같은 원래 핸들러로 설정합니다.
    - **Python**: 함수 핸들러를 `datadog_lambda.handler.handler`로 설정하세요.
       - 또 환경 변수 `DD_LAMBDA_HANDLER`를 `myfunc.handler`와 같은 원래 핸들러로 설정합니다.

5. 함수를 다시 배포하고 호출합니다. 몇 분 후에 [ASM 보기][3]에 표시됩니다.

[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

## Google Cloud Run

<div class="alert alert-info">Google Cloud Run에서의 ASM 지원은 베타 서비스 중입니다.</a></div>

### `serverless-init` 작동 방식

`serverless-init` 애플리케이션은 프로세스를 래핑하고 하위 프로세스로 실행합니다. 메트릭을 위해 DogStatsD 리스너를, 트레이스를 위해 Trace Agent를 실행합니다. 로그는 애플리케이션에서 stdout/stderr 스트림을 래핑해 수집합니다. 부트스트래핑 후에는 `serverless-init`에서 명령을 하위 프로세스로 실행합니다.

전체 계측을 얻으려면 내 Docker 컨테이너에서 실행하는 첫 명령으로 `datadog-init`을 호출하세요. 엔트리 포인트로 설정하거나 CMD 첫 인수로 설정해 이 작업을 할 수 있습니다.

### 시작하기

{{< tabs >}}
{{% tab "NodeJS" %}}
Dockerfile에 다음 명령과 인수를 추가하세요.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
```

#### 설명

1. Docker 이미지에 Datadog `serverless-init`을 복사합니다.

   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog Node.js 트레이서를 Docker 이미지에 복사합니다.

   ```dockerfile
   COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
   ```

   [수동 트레이서 계측 방법][1]에 안내된 대로 애플리케이션에 바로 Datadog 트레이서 라이브러리를 설치하는 경우에는 이 단계를 건너뛰세요.

3. (선택사항) Datadog 태그를 추가합니다.

   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-nodejs
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Datadog `serverless-init` 프로세스에서 애플리케이션을 래핑하도록 엔트리 포인트를 변경합니다.
   **참고**: Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 [대체 구성 방법](#alt-node)을 참고하세요.

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. 엔트리 포인트에 래핑된 이진 애플리케이션을 실행합니다. 상황에 맞게 명령줄을 수정하세요. 
   ```dockerfile
   CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
   ```
#### 대체 구성 방법{#alt-node}
Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 대신 CMD 인수를 수정할 수 있습니다.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/nodejs/bin/node", "/path/to/your/app.js"]
{{< /highlight >}}

엔트리 포인트도 계측해야 하는 경우 엔트리 포인트와 CMD 인수를 맞바꿀 수 있습니다. 자세한 정보는 [`serverless-init`이 작동하는 방식](#how-serverless-init-works)을 참고하세요.

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "/nodejs/bin/node", "/path/to/your/app.js"]
{{< /highlight >}}

실행할 명령이 `datadog-init` 인수로 전달되는 한, 전체 계측을 받을 수 있습니다.

[1]: /ko/tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Python" %}}

Dockerfile에 다음 명령과 인수를 추가하세요.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

#### 설명

1. Docker 이미지에 Datadog `serverless-init`을 복사합니다.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Python 트레이서를 설치합니다.
   ```dockerfile
   RUN pip install --target /dd_tracer/python/ ddtrace
   ```
   [수동 트레이서 계측 방법][1]에 안내된 대로 애플리케이션에 바로 Datadog 트레이서 라이브러리를 설치하는 경우에는 이 단계를 건너뛰세요.

3. (선택사항) Datadog 태그를 추가합니다.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-python
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Datadog `serverless-init` 프로세스에서 애플리케이션을 래핑하도록 엔트리 포인트를 변경합니다.
   **참고**: Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 [대체 구성 방법](#alt-python)을 참고하세요.
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. 엔트리 포인트에 래핑된 이진 애플리케이션을 Datadog 트레이스 라이브러리를 이용해 실행합니다. 상황에 맞게 명령줄을 수정하세요. 
   ```dockerfile
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
   ```
#### 대체 구성 방법{#alt-python}
Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 대신 CMD 인수를 수정할 수 있습니다.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

엔트리 포인트도 계측해야 하는 경우 엔트리 포인트와 CMD 인수를 맞바꿀 수 있습니다. 자세한 정보는 [`serverless-init`이 작동하는 방식](#how-serverless-init-works)을 참고하세요.

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

실행할 명령이 `datadog-init` 인수로 전달되는 한, 전체 계측을 받을 수 있습니다.

[1]: /ko/tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Java" %}}

Dockerfile에 다음 명령과 인수를 추가하세요.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["./mvnw", "spring-boot:run"]
```
#### 설명

1. Docker 이미지에 Datadog `serverless-init`을 복사합니다.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog Java 트레이서를 Docker 이미지에 추가합니다.
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
   ```
   [수동 트레이서 계측 방법][1]에 안내된 대로 애플리케이션에 바로 Datadog 트레이서 라이브러리를 설치하는 경우에는 이 단계를 건너뛰세요.

3. (선택사항) Datadog 태그를 추가합니다.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-java
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Datadog `serverless-init` 프로세스에서 애플리케이션을 래핑하도록 엔트리 포인트를 변경합니다.
   **참고**: Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 [대체 구성 방법](#alt-java)을 참고하세요.
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. 엔트리 포인트에 래핑된 이진 애플리케이션을 실행합니다. 상황에 맞게 명령줄을 수정하세요. 
   ```dockerfile
   CMD ["./mvnw", "spring-boot:run"]
   ```

#### 대체 구성 방법{#alt-java}
Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 대신 CMD 인수를 수정할 수 있습니다.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

엔트리 포인트도 계측해야 하는 경우 엔트리 포인트와 CMD 인수를 맞바꿀 수 있습니다. 자세한 정보는 [`serverless-init`이 작동하는 방식](#how-serverless-init-works)을 참고하세요.

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

실행할 명령이 `datadog-init` 인수로 전달되는 한, 전체 계측을 받을 수 있습니다.

[1]: /ko/tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Go" %}}

애플리케이션을 배포하기 전에 Go 트레이서를 [수동으로 설치][1]하세요. "appsec" 태그를 활성화(`go build --tags "appsec" ...`)한 상태에서 Go 이진을 컴파일합니다. Dockerfile에 다음 명령과 인수를 추가하세요.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
```

#### 설명

1. Docker 이미지에 Datadog `serverless-init`을 복사합니다.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

4. Datadog `serverless-init` 프로세스에서 애플리케이션을 래핑하도록 엔트리 포인트를 변경합니다.
   **참고**: Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 [대체 구성 방법](#alt-go)을 참고하세요.
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. (선택사항) Datadog 태그를 추가합니다.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-go
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. 엔트리 포인트에 래핑된 이진 애플리케이션을 실행합니다. 상황에 맞게 명령줄을 수정하세요. 
   ```dockerfile
   CMD ["/path/to/your-go-binary"]
   ```

#### 대체 구성 방법{#alt-go}
Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 대신 CMD 인수를 수정할 수 있습니다.

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/path/to/your-go-binary"]
{{< /highlight >}}

엔트리 포인트도 계측해야 하는 경우 엔트리 포인트와 CMD 인수를 맞바꿀 수 있습니다. 자세한 정보는 [`serverless-init`이 작동하는 방식](#how-serverless-init-works)을 참고하세요.

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/path/to/your-go-binary"]
{{< /highlight >}}

실행할 명령이 `datadog-init` 인수로 전달되는 한, 전체 계측을 받을 수 있습니다.

[1]: /ko/tracing/trace_collection/dd_libraries/go

{{% /tab %}}
{{% tab ".NET" %}}

Dockerfile에 다음 명령과 인수를 추가하세요.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"]
```

#### 설명

1. Docker 이미지에 Datadog `serverless-init`을 복사합니다.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog .NET 트레이서를 Docker 이미지에 복사합니다.
   ```dockerfile
   COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
   ```
   [수동 트레이서 계측 방법][1]에 안내된 대로 애플리케이션에 바로 Datadog 트레이서 라이브러리를 설치하는 경우에는 이 단계를 건너뛰세요.

3. (선택사항) Datadog 태그를 추가합니다.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-dotnet
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Datadog `serverless-init` 프로세스에서 애플리케이션을 래핑하도록 엔트리 포인트를 변경합니다.
   **참고**: Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 [대체 구성 방법](#alt-dotnet)을 참고하세요.
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. 엔트리 포인트에 래핑된 이진 애플리케이션을 실행합니다. 상황에 맞게 명령줄을 수정하세요. 
   ```dockerfile
   CMD ["dotnet", "helloworld.dll"]
   ```
#### 대체 구성 방법{#alt-dotnet}
Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 대신 CMD 인수를 수정할 수 있습니다.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "dotnet", "helloworld.dll"]
{{< /highlight >}}

엔트리 포인트도 계측해야 하는 경우 엔트리 포인트와 CMD 인수를 맞바꿀 수 있습니다. 자세한 정보는 [`serverless-init`이 작동하는 방식](#how-serverless-init-works)을 참고하세요.

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "dotnet", "helloworld.dll"]
{{< /highlight >}}

실행할 명령이 `datadog-init` 인수로 전달되는 한, 전체 계측을 받을 수 있습니다.

[1]: /ko/tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation

{{% /tab %}}
{{% tab "Ruby" %}}

애플리케이션을 배포하기 전에 Ruby 트레이서를 [수동으로 설치][1]하세요. [예시 애플리케이션][2]을 참고하세요.

Dockerfile에 다음 명령과 인수를 추가하세요.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

#### 설명

1. Docker 이미지에 Datadog `serverless-init`을 복사합니다.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (선택사항) Datadog 태그를 추가합니다.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_APPSEC_ENABLED=1
   ENV DD_VERSION=1
   ```

3. Cloud Run에서 트레이스 전파가 제대로 작동하려면 이 환경 변수가 필요합니다. Datadog로 계측되는 다운스트림 서비스 모두에 이 변수를 설정하세요.
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Datadog `serverless-init` 프로세스에서 애플리케이션을 래핑하도록 엔트리 포인트를 변경합니다.
   **참고**: Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 [대체 구성 방법](#alt-ruby)을 참고하세요.
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. 엔트리 포인트에 래핑된 이진 애플리케이션을 실행합니다. 상황에 맞게 명령줄을 수정하세요. 
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
#### 대체 구성 방법{#alt-ruby}
Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 대신 CMD 인수를 수정할 수 있습니다.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

엔트리 포인트도 계측해야 하는 경우 엔트리 포인트와 CMD 인수를 맞바꿀 수 있습니다. 자세한 정보는 [`serverless-init`이 작동하는 방식](#how-serverless-init-works)을 참고하세요.

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

실행할 명령이 `datadog-init` 인수로 전달되는 한, 전체 계측을 받을 수 있습니다.

[1]: /ko/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

{{% /tab %}}
{{% tab "PHP" %}}

Dockerfile에 다음 명령과 인수를 추가하세요.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# Apache 및 mod_php 기반 이미지에 다음을 사용하세요
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["apache2-foreground"]

# Nginx 및 php-fpm 기반 이미지에 다음을 사용하세요
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD php-fpm; nginx -g daemon off;
```

**참고**: `datadog-init` 엔트리 포인트는 프로세스를 래핑한 후 로그를 수집합니다. 로그가 제대로 작동하려면 Apache, Nginx, 또는 PHP 프로세스가 출력을 `stdout`로 보내야 합니다.

#### 설명


1. Docker 이미지에 Datadog `serverless-init`을 복사합니다.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog PHP 트레이서를 복사하고 설치합니다.
   ```dockerfile
   ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
   RUN php /datadog-setup.php --php-bin=all
   ```
   [수동 트레이서 계측 방법][1]에 안내된 대로 애플리케이션에 바로 Datadog 트레이서 라이브러리를 설치하는 경우에는 이 단계를 건너뛰세요.

3. (선택사항) Datadog 태그를 추가합니다.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-php
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` 프로세스에서 애플리케이션을 래핑하도록 엔트리 포인트를 변경합니다.
   **참고**: Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 [대체 구성 방법](#alt-php)을 참고하세요.
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. 애플리케이션을 실행합니다.

   Apache와 mod_php 기반 이미지에 다음을 사용하세요.
   ```dockerfile
   RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
   EXPOSE 8080
   CMD ["apache2-foreground"]
   ```

   Nginx와 php-fpm 기반 이미지에 다음을 사용하세요.
   ```dockerfile
   RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
   EXPOSE 8080
   CMD php-fpm; nginx -g daemon off;
   ```
#### 대체 구성 방법{#alt-php}
Dockerfile에 이미 정의된 엔트리 포인트가 있고 Apache와 mod_php 기반 이미지를 사용하는 중이라면, 대신 CMD 인수를 수정할 수 있습니다.

{{< highlight dockerfile "hl_lines=9" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["/app/datadog-init", "apache2-foreground"]
{{< /highlight >}}

엔트리 포인트도 계측해야 하는 경우 엔트리 포인트와 CMD 인수를 맞바꿀 수 있습니다. 자세한 정보는 [`serverless-init`이 작동하는 방식](#how-serverless-init-works)을 참고하세요.

{{< highlight dockerfile "hl_lines=7 12 17" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# Apache와 mod_php 기반 이미지에 다음을 사용하세요.
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["your_entrypoint.sh", "apache2-foreground"]

# Nginx와 php-fpm 기반 이미지에 다음을 사용하세요.
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD your_entrypoint.sh php-fpm; your_entrypoint.sh nginx -g daemon off;
{{< /highlight >}}

실행할 명령이 `datadog-init` 인수로 전달되는 한, 전체 계측을 받을 수 있습니다.

[1]: /ko/tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension

{{% /tab %}}
{{< /tabs >}}

## Azure App Service

### 설정
#### 애플리케이션 설정
애플리케이션에서 ASM을 활성화하려면 먼저 Azure 구성 설정의 **Application Settings** 아래에 다음 키-값 쌍을 추가하세요.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service 설정: Azure UI의 설정 섹션 아래에 애플리케이션 설정. DD_API_KEY, DD_SERVICE, DD_START_APP 3개의 설정이 있음." style="width:80%;" >}}

- `DD_API_KEY`는 Datadog API 키입니다.
- `DD_CUSTOM_METRICS_ENABLED`(선택사항)은 [커스텀 메트릭](#custom-metrics)을 활성화합니다.
- `DD_SITE`는 Datadog 사이트 [파라미터][2]입니다. 내 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. 기본값은 `datadoghq.com`입니다.
- `DD_SERVICE`는 이 프로그램에 사용된 서비스 이름입니다. 기본값은 `package.json`의 이름 필드 값입니다.
- `DD_START_APP`는 애플리케이션을 시작할 때 사용되는 명령입니다(예: `node ./bin/www`).(Tomcat에서 실행하는 애플리케이션에는 필요 없음).
- Application Security를 활성화하려면 `DD_APPSEC_ENABLED` 값이 1이어야 합니다.

### 시작 명령 확인

기본 제공 런타임의 코드 배포 옵션으로 빌드된 Linux Azure App Service Web Apps의 경우 언어에 따라 시작 명령이 다릅니다. 기본값은 [Azure 설명서][7]에 안내되어 있습니다. 다음 예를 참고하세요.

`DD_START_APP` 환경 변수에서 이 값을 설정하세요. 다음은 `datadog-demo`라는 이름의 애플리케이션의 예시입니다.

| 런타임   | `DD_START_APP` 예시 값                                                               | 설명                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | [Node PM2 구성 파일][12]이나 스크립트 파일 실행.                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | 기본값으로 내 웹 앱 이름을 사용하는 `.dll` 파일 실행.<br /><br /> **참고**: 명령에서 사용하는 `.dll` 파일 이름이 내 `.dll` 파일 이름과 일치해야 합니다. 경우에 따라 일치하지 않을 수도 있습니다.         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | 스크립트를 바른 위치로 복사하고 애플리케이션 실행.                                                                                                                                                                           |
| Python    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | 커스텀 [시작 스크립트][13]. 이 예시에서는 Gunicorn 명령을 실행해 Django 앱을 시작합니다.                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | 앱을 시작하는 명령. Tomcat에서 실행하는 애플리케이션에는 필요하지 않습니다.                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up


**참고**: 새 설정을 저장하면 애플리케이션이 재시작됩니다.

#### 일반 설정 설정하기

{{< tabs >}}
{{% tab "Node, .NET, PHP, Python" %}}
**General settings**로 이동해 **Startup Command** 필드에 다음을 추가하세요.

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.4.0/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Azure App Service 설정: Azure UI 설정 섹션 아래에 있는 스택 설정. 스택 아래 주 버전과 부 버전 필드에 '시작 명령' 필드가 있고 위의 curl 명령이 입력되어 있음." style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
릴리스에서 [`datadog_wrapper`][8] 파일을 다운로드하고 Azure CLI 명령을 사용하여 애플리케이션에 업로드합니다.

```
  az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}


## 위협 감지 테스트

Application Security Management 보안 감지가 작동하는지 확인하려면 알려진 공격 패턴을 애플리케이션에 보내세요. 예를 들어 사용자 에이전트 헤더가 `dd-test-scanner-log`로 설정된 요청을 보내 [보안 스캐너 공격][6] 시도를 트리거할 수 있습니다.
   ```sh
   curl -A 'dd-test-scanner-log' https://your-function-url/existing-route
   ```
애플리케이션을 활성화 및 실행하고 몇 분 후 **위협 정보가 [애플리케이션 신호 탐색기][3]**에 표시됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /ko/serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /ko/security/application_security/enabling/compatibility/serverless
[5]: /ko/security/default_rules/security-scan-detected/
[6]: /ko/serverless/libraries_integrations/plugin/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/
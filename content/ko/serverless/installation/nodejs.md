---
aliases:
- /ko/serverless/datadog_lambda_library/nodejs/
- /ko/serverless/guide/nodejs/
further_reading:
- link: /serverless/configuration
  tag: 설명서
  text: 서버리스 모니터링 설정하기
- link: /serverless/guide/serverless_tracing_and_bundlers/
  tag: 설명서
  text: Node.js 람바 트레이싱 및 번들러 호환성
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: 설명서
  text: 서버리스 모니터링 트러블슈팅
- link: serverless/custom_metrics/
  tag: 설명서
  text: 서버리스 애플리케이션용 커스텀 메트릭 제출하기
kind: 설명서
title: Node.js 서버리스 애플리케이션 계측하기
---

<div class="alert alert-warning">이전에 Datadog 포워더(Forwarder)를 사용하여 람다 함수를 설정한 경우 <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_ruby">Datadog 포워더(Forwarder)를 사용해 계측하기</a>를 참조하세요. 아니면 이 안내서의 지침에 따라 Datadog 람다 확장을 사용하여 계측하세요.</div>

<div class="alert alert-warning">Lambda 함수가 공용 인터넷에 액세스할 수 없는 VPC에 배포된 경우, <code>datadoghq.com</code> <a href="/getting_started/site/">Datadog 사이트</a>에서는 <a href="/agent/guide/private-link/">AWS PrivateLink</a>를 사용하고, 그 외의 모든 사이트에서는 <a href="/agent/proxy/">프록시를 사용해</a> 데이터를 전송할 수 있습니다.</div>

<div class="alert alert-warning">웹팩이나 에스빌드(esbuild)를 사용해 번들링하는 경우 <a href="/serverless/guide/serverless_tracing_and_bundlers/">Datadog 라이브러리를 외부로 표시해야 할 수 있습니다</a>.

## 설치

데이터독은 서버리스 응용프로그램을 위한 계측을 활성화하는 다양한 방법을 제공합니다. 아래에서 사용자의 요구에 가장 적합한 방법을 선택하세요. Datadog는 일반적으로 Datadog CLI를 사용하는 것이 좋습니다. 응용 프로그램이 컨테이너 이미지로 배포된 경우 *반드시* "컨테이너 이미지"에 대한 지침서를 따라야 합니다.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI는 기존 Lambda 함수의 설정을 변경하여, 새롭게 배포할 필요 없이 계측하도록 해줍니다. 가장 빠르게 시작하는 방법은 Datadog의 서버리스 모니터링을 이용하는 것입니다.

1. Datadog CLI 클라이언트 설치

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Datadog 서버리스 모니터링이 익숙하지 않은 경우, 인터랙티브 모드에서 Datadog CLI를 부팅하고 빠른 시작용 가이드를 따라 첫 설치를 완료하세요. 이렇게 하면 나머지 단계를 무시할 수 있습니다. 실제 애플리케이션에 Datadog를 영구적으로 설치하려면 이 단계를 건너뛰고 나머지 단계에 따라 일반적인 배포 _이후에 _ CI/CD 파이프라인에서 Datadog CLI 명령을 실행하세요.

    ```sh
    datadog-ci lambda instrument -i
    ```

3. AWS 자격증명 설정

   Datadog CLI를 사용하려면 AWS 람다 서비스에 액세스해야 하며, [인증 정보 확인][1]을 위해 AWS 자바스크립트(Javascript) SDK에 의존합니다. AWS CLI를 호출할 때 사용한 것과 동일한 방법으로 AWS 증명서를 설정해야 합니다.

4. Datadog 사이트 설정

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

   `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right)로 대체합니다.

5. Datadog API 키 설정

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
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

   플레이스홀더에 내용을 입력하려면:
    - `<functionname>` 및 `<another_functionname>` 부분을 Lambda 함수 이름으로 대체합니다. 또는 `--functions-regex`를 사용해 특정 정규 표현식과 이름이 일치하는 여러 함수를 자동 계측할 수 있습니다.
    - `<aws_region>` 부분을 AWS 리전 이름으로 대체합니다.

    이외의 파라미터는 [CLI 설명서][3]에서 찾아볼 수 있습니다.


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

<div class="alert alert-info">If you are instead deploying your Serverless Framework app <a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro">JSON 개체를 JavaScript 파일에서 네이티브 가져오기하여</a> 대신 서버리스 프레임워크 앱을 구축하는 경우(예: <code>serverless.ts</code> 파일 사용), <a href="./?tab=custom">커스텀 설치 지침</a>을 따르세요.</div>

[Datadog Serverless Plugin][1]이 [Datadog Lambda Extension][2]을 통해 메트릭, 트레이스, 로그를 Datadog로 전송하도록 함수를 자동 설정합니다.

Datadog Serverless Plugin을 설치하고 설정하려면 다음 절차를 따라주세요.

1. Datadog Serverless Plugin 설치하기:

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
    - `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}} (정확한 사이트가 정확한 곳에 선택되었는지 확인하세요)로 대체합니다. 
    - `<DATADOG_API_KEY_SECRET_ARN>`을 [Datadog API 키][4]가 안전하게 저장된 AWS 시크릿의 ARN으로 대체합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). 또한, `secretsmanager:GetSecretValue` 권한이 있어야 합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 플레인 텍스트로 설정할 수 있습니다.

    더 자세한 정보와 추가 설정 방법은 [플러그인 설명서][1]에서 찾아볼 수 있습니다.

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation 매크로][1]는 람다 레이어를 사용하여 함수에 Datadog 설치하기 위한 SAM 애플리케이션 템플릿을 자동으로 변환합니다. 또한 함수를 설정해 [Datadog 람다 확장][2]을 통해 Datadog에 메트릭, 트레이스 및 로그를 전송할 수 있습니다.

1. Datadog CloudFormation 매크로 설치

   [AWS 자격 증명][3]을 사용해 다음 명령을 실행하여 CloudFormation 스택을 구축합니다. 해당 스택은 매크로 AWS 리소스를 설치합니다. 계정에서 주어진 지역에 대해 **1회만** 매크로를 설치하면 됩니다. `create-stack`을 `update-stack`으로 대체하여 최신 버전으로 매크로를 업데이트합니다.

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

   이제 매크로가 구축되어 사용할 준비가 되었습니다.

2. Lambda 함수 계측

   SAM을 위한 `template.yml` 파일의 `Transform` 섹션에서 `AWS::Serverless`가 변환한 **이후** `DatadogServerless` 변환을 추가합니다.

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}}
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

   플레이스홀더에 내용을 입력하려면:
    - `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}} (정확한 사이트가 정확한 곳에 선택되었는지 확인하세요)로 대체합니다. 
    - `<DATADOG_API_KEY_SECRET_ARN>`을 [Datadog API 키][4]가 안전하게 저장된 AWS 암호 ARN으로 대체합니다. 키는 일반 텍스트 문자열로로 저장해야 합니다(JSON blob 안 됨). 또한, `secretsmanager:GetSecretValue` 권한이 있어야 합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.

    자세한 정보와 추가 파라미터는 [매크로 설명서][1]에서 확인할 수 있습니다.


[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog CDK 구문][1]은 자동으로 람다 레이어를 사용해 함수에서 Datadog를 설치합니다. 함수를 설정하여 Datadog 람다 확장을 통해 Datadog에 메트릭, 트레이스 및 로그를 전송합니다.

1. Datadog CDK 구문 라이브러리 설치

    ```sh
    # For AWS CDK v1
    npm install datadog-cdk-constructs --save-dev

    # For AWS CDK v2
    npm install datadog-cdk-constructs-v2 --save-dev
    ```

2. Lambda 함수 계측

    ```javascript
    // For AWS CDK v1
    import { Datadog } from "datadog-cdk-constructs";

    // For AWS CDK v2
    import { Datadog } from "datadog-cdk-constructs-v2";

    const datadog = new Datadog(this, "Datadog", {
        nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}},
        extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}},
        site: "<DATADOG_SITE>",
        apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    });
    datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
    ```

   플레이스홀더에 내용을 입력하려면:
    - `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}} (정확한 사이트가 정확한 곳에 선택되었는지 확인하세요)로 대체합니다. 
    - `<DATADOG_API_KEY_SECRET_ARN>`을 [Datadog API 키][2]가 안전하게 저장된 AWS 암호 ARN으로 대체합니다. 키는 일반 텍스트 문자열로로 저장해야 합니다(JSON blob 안 됨). 또한, `secretsmanager:GetSecretValue` 권한이 있어야 합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.

    자세한 정보 및 추가 파라미터는 [Datadog CDK 설명서][1]에서 찾아볼 수 있습니다.

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Container Image" %}}

1. Datadog 람다 라이브러리 설치하기

   람다 기능/함수를 컨테이너 이미지로 배포하는 경우 Datadog 람다 라이브러리를 람다 레이어로 사용할 수 없습니다. 대신 이미지 내에서 Datadog 람다 및 트레이싱 라이브러리를 패키지화해야 합니다.

    ```sh
    npm install datadog-lambda-js dd-trace
    ```

   `datadog-lambda-js` 패키지의 부 버전은 항상 레이어 버전과 일치해야 하니 참고하세요. 예를 들어 `datadog-lambda-js v0.5.0`는 레이어 버전 5 콘텐츠와 일치해야 합니다.

2. Datadog Lambda Extension을 설치합니다.

   다음을 도커 파일에 추가하여 Datadog 람다 확장을 컨테이너 이미지에 추가합니다:

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
    ```

   `<TAG>`를 특정 버전 번호(예: `{{< latest-lambda-layer-version layer="extension" >}}`) 또는 `latest`로 대체합니다. 이용 가능한 태그 목록은 [Amazon ECR 리포지터리][1]에서 확인할 수 있습니다.

3. 핸들러 함수 리디렉션

    - 이미지의 `CMD` 값을 `node_modules/datadog-lambda-js/dist/handler.handler`로 설정합니다. AWS 또는 도커 파일에서 직접 설정할 수 있습니다. **참고**: 둘 다 설정한 경우 AWS에서 설정한 값이 도커 파일의 값보다 우선합니다.
    - 환경 변수`DD_LAMBDA_HANDLER`를 `myfunc.handler`와 같이 기존 핸들러로 설정합니다.
    - 컨테이너와 함께 에스모듈을 사용하는 경우 `handler.js` 파일을 제거해야 합니다. 이 파일은 노드 12에 존재하며 AWS에서 노드 12 지원을 중단하면 제거됩니다.
      ```dockerfile
      RUN rm node_modules/datadog-lambda-js/dist/handler.js
      CMD ["node_modules/datadog-lambda-js/dist/handler.handler"]
      ```

    **참고**: 람다 함수가 `arm64`에서 실행되는 경우 arm64 기반 아마존 리눅스(Linux) 환경에서 컨테이너 이미지를 빌드하거나 [함수 코드에 Datadog 래퍼를 적용해야 합니다][2] 또한 Datadog 핸들러 리디렉션과 호환되지 않는 타사 보안 또는 모니터링 도구를 사용하는 경우 수행해야 할 수 있습니다.

4. Datadog 사이트 및 API 키 설정

    - 환경 변수 `DD_SITE`를 {{< region-param key="dd_site" code="true" >}} (정확한 사이트가 정확한 곳에 선택되었는지 확인하세요)로 대체합니다. 
    - 환경 변수 `DD_API_KEY_SECRET_ARN`을 [Datadog API 키][4]가 안전하게 저장된 AWS 시크릿의 ARN으로 대체합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). 또한, `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY`를 사용하고 Datadog API 키를 플레인 텍스트로 설정할 수 있습니다.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://docs.datadoghq.com/ko/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "커스텀" %}}

<div class="alert alert-info">서버리스 프레임워크 또는 AWS CDK 등 Datadog를 지원하는 서버리스 개발 도구를 사용하지 않는 경우  Datadog에서는 <a href="./?tab=datadogcli">Datadog CLI</a>를 사용해 서버리스 애플리케이션을 계측할 것을 강력히 권장합니다.</div>

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Datadog 람다 라이브러리 설치하기

   Datadog 람다 라이브러리는 레이어(권장) _또는_ 자바스크립트(Javascript) 패키지로 가져올 수 있습니다.

   **참고**: `datadog-lambda-js` 패키지의 보조 버전은 항상 레이어 버전과 일치합니다. 예를 들어 datadog-lambda-js v0.5.0는 레이어 버전 5의 내용과 일치합니다.

    - 옵션 A: 다음 형식의 ARN을 사용하여 람다 기능/함수에 사용할 [레이어 설정][1]:

      ```sh
      # Use this format for AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

      # Use this format for AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
      ```

      `<AWS_REGION>`을 `us-east-1` 등 유효한 AWS 리전으로 대체합니다. 사용 가능한 `RUNTIME` 옵션은 `Node12-x`, `Node14-x`, `Node16-x` 및 `Node18-x`입니다.

    - 옵션 B: 사전 빌드한 Datadog 람다 레이어를 사용할 수 없는 경우 대신 원하는 패키지 관리자를 사용하여 `datadog-lambda-js` 및 `dd-trace` 패키지를 설치할 수 있습니다.

      ```
      npm install datadog-lambda-js dd-trace
      ```

2. Datadog Lambda Extension을 설치합니다.

   다음 형식에 맞추어 ARN을 사용해 Lambda 함수의 [레이어를 설정합니다][1].

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

   `us-east-1` 등 유효한 AWS 지역으로 `<AWS_REGION>`을 대체합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

{{< site-region region="ap1" >}}
1. Datadog 람다 라이브러리 설치하기

   Datadog 람다 라이브러리는 레이어(권장) _또는_ 자바스크립트(Javascript) 패키지로 가져올 수 있습니다.

   **참고**: `datadog-lambda-js` 패키지의 보조 버전은 항상 레이어 버전과 일치합니다. 예를 들어 datadog-lambda-js v0.5.0는 레이어 버전 5의 내용과 일치합니다.

    - 옵션 A: 다음 형식의 ARN을 사용하여 람다 기능/함수에 사용할 [레이어 설정][1]:

      ```sh
      # Use this format for AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

      # Use this format for AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
      ```

      `<AWS_REGION>`을 `us-east-1` 등 유효한 AWS 리전으로 대체합니다. 사용 가능한 `RUNTIME` 옵션은 `Node12-x`, `Node14-x`, `Node16-x` 및 `Node18-x`입니다.

    - 옵션 B: 사전 빌드한 Datadog 람다 레이어를 사용할 수 없는 경우 대신 원하는 패키지 관리자를 사용하여 `datadog-lambda-js` 및 `dd-trace` 패키지를 설치할 수 있습니다.

      ```
      npm install datadog-lambda-js dd-trace
      ```

2. Datadog Lambda Extension을 설치합니다.

   다음 형식에 맞추어 ARN을 사용해 Lambda 함수의 [레이어를 설정합니다][1].

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

   `us-east-1` 등 유효한 AWS 지역으로 `<AWS_REGION>`을 대체합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

3. 핸들러 함수 리디렉션

    - 레이어를 사용하는 경우 를 기능/함수 핸들러를  `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler`로 설정하거나 패키지를 사용하는 경우 `node_modules/datadog-lambda-js/dist/handler.handler`로 설정합니다.
    - 환경 변수`DD_LAMBDA_HANDLER`를 `myfunc.handler`와 같이 기존 핸들러로 설정합니다.

    **참고**: 람다 함수가 `arm64`에서 실행되고 `datadog-lambda-js` 라이브러리가 NPM 패키지(1단계 옵션 B)로 설치된 경우, [함수 코드에 Datadog 래퍼를 적용해야 합니다][2] 또한 Datadog 핸들러 리디렉션과 호환되지 않는 타사 보안 또는 모니터링 도구를 사용하는 경우 수행해야 할 수 있습니다.

4. Datadog 사이트 및 API 키 설정하기

    - 환경 변수 `DD_SITE`를 {{< region-param key="dd_site" code="true" >}} (정확한 사이트가 정확한 곳에 선택되었는지 확인하세요)로 대체합니다. 
    - 환경 변수 `DD_API_KEY_SECRET_ARN`을 [Datadog API 키][4]가 안전하게 저장된 AWS 시크릿의 ARN으로 대체합니다. 키는 플레인 텍스트 스트링으로 저장해야 합니다(JSON blob이 아님에 유의하세요). 또한, `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY`를 사용하고 Datadog API 키를 플레인 텍스트로 설정할 수 있습니다.

[2]: https://docs.datadoghq.com/ko/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## 다음 단계

- 축하합니다! 이제 [서버리스 홈페이지][1]에서 메트릭, 로그 및 트레이스를 확인할 수 있습니다.
- 귀하의 서비스를 목표로 하는 공격자에 대한 알림을 받으려면 [위협 모니터링][6]을 켭니다.
- [사용자 지정 비즈니스 로직 모니터링하기](#monitor-custom-business-logic)위해 샘플 코드 참조
- 텔레메트리 수집 중 문제가 발생한 경우 [트러블슈팅 가이드][4]를 참조하세요
- [고급 설정][3]을 참조하고
    - 태그를 활용해 텔레메트리 연결
    - AWS API Gateway, SQS 등의 텔레메트리 수집
    - Lambda 리퀘스트 및 리스폰스 페이로드 확인
    - Lambda 함수의 오류를 소스 코드에 링크
    - 로그나 트레이스에서 민감 정보를 필터링 또는 스크러빙

### 커스텀 비즈니스 로직 모니터링

커스텀 비즈니스 로직을 모니터링하려면, 아래와 동일한 코드를 사용해 커스텀 메트릭 또는 스팬을 제출합니다. 추가 옵션의 경우 [서버리스 애플리케이션을 위한 커스텀 메트릭 제출][4]과 [커스텀 계측][5]을 위한 APM 가이드를 참조하세요.

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require('datadog-lambda-js');
const tracer = require('dd-trace');

// submit a custom span named "sleep"
const sleep = tracer.wrap('sleep', (ms) => {
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
        'coffee_house.order_value', // metric name
        12.45, // metric value
        'product:latte', // tag
        'order:online' // another tag
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from serverless!')
    };
    return response;
};
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /ko/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /ko/serverless/configuration/
[4]: /ko/serverless/custom_metrics?tab=nodejs
[5]: /ko/tracing/custom_instrumentation/nodejs/
[6]: /ko/security/application_security/enabling/serverless/?tab=serverlessframework
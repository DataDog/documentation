---
aliases:
- /ko/serverless/troubleshooting/installing_the_forwarder/
- /ko/serverless/forwarder/
- /ko/serverless/libraries_integrations/forwarder/
dependencies:
- https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/README.md
title: Datadog Forwarder
---
## 개요

Datadog Forwarder는 로그를 AWS에서 Datadog로 전송하는 AWS Lambda 함수입니다. 특히 다음에 특화되어 있습니다.

- CloudWatch, ELB, S3, CloudTrail, VPC, SNS, CloudFront 로그를 Datadog에 전송
- S3 이벤트를 Datadog에 전송
- Kinesis 데이터 스트림 이벤트를 Datadog로 전송(CloudWatch 로그만 지원됨)
- 메트릭, 트레이스, 로그를 AWS Lambda 함수에서 Datadog로 전송. Datadog에서는 [Datadog Lambda 확장][1]을 사용해 Lambda 함수를 모니터링할 것을 권고합니다.

서버리스를 사용하면서 Forwarder로 메트릭, 트레이스, 로그를 AWS Lambda 함수에서 Datadog로 보내는 고객의 경우 [Datadog Lambda 확장][3]으로 이미그레이션해 Lambda 실행 환경에서 바로 텔레메트리를 수집하세요. 서버리스 모니터링 환경에서도 Forwarder를 사용할 수 있으나 최신 기능에 따른 업데이트를 지원하지 않습니다.

Datadog Forwarder로 AWS 서비스 로그를 전송하는 방법에 관한 자세한 내용은 [AWS 서비스 로그를 Datadog Lambda 함수로 전송하는 방법][2]을 참고하세요.

## 설치

Datadog에서는 [CloudFormation](#cloudformation)를 사용해 자동으로 Forwarder를 설치하기를 권고합니다. 또 [Terraform](#terraform)이나 [수동 작업](#manual)으로 설정 프로세스를 완료할 수도 있습니다. 설치한 후에는 Forwarder를 구독하고 [트리거를 설정][4]해 S3 버킷이나 ClouwdWatch 로그 그룹과 같은 소스를 로깅할 수 있습니다.

{{< tabs >}}
{{% tab "CloudFormation" %}}

### CloudFormation

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml)

1. 관리자 AWS 계정이나 역할로 로그인해 위 버튼으로 CloudFormation Stack을 배포하세요.
2. `DdApiKey`을 작성하고 적절한 `DdSite`를 선택하세요. 다른 파라미터는 선택 사항입니다.
3. **Create stack**을 클릭하고 생성 완료될 때까지 기다리세요.
4. 스택의 "Resource" 탭 아래에서 로직 ID `Forwarder`로 설치된 포워더 Lambda 함수를 찾으세요.
5. [설치한 Forwarder의 트리거를 설정하세요][101].
6. 여러 AWS 리전에서 운영 중일 경우 다른 리전에서도 위 단계를 반복하세요.

Datadog AWS 통합 페이지에서 [CloudFormatin 템플릿][102]를 사용해 AWS 통합을 이미 활성화한 경우, Datadog Lambda Forwarder 함수를 포함한 상태로 계정이 이미 와 프로비저닝되었을 수 있습니다. 이 경우 계정에서 로그를 내보내기 할 AWS 리전에 Datadog Lambda를 추가 설치하기만 하면 됩니다.

**참고:** 로직이 Lambda 레이어를 통해 실행되기 때문에 Datadog Lambda Forwarder 함수 코드 블록은 비워져 있는 상태입니다.

[101]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#set-up-triggers
[102]: https://github.com/DataDog/cloudformation-template/tree/master/aws

{{% /tab %}}
{{% tab "Terraform" %}}

### Terraform

CloudForm 템플릿에 Terraform 리소스 [`aws_cloudformation_stack`][101]을 래퍼로 사용해 Forwarder를 설치하세요.

Datadog에서는 별도의 Terraform 구성을 사용하기를 권장합니다.

- AWS Secret MAnager의 첫 번째 항목을 사용해 [Datadog API 키][102]를 저장하고 적용 출력의 비밀 ARN을 기재해 두세요.
- 그리고 포워더의 구성을 생성하고 `DdApiKeySecretArn` 파라미터를 통해 비밀 ARN을 제공하세요.
- 마지막으로 구성에서 [포워더에서 트리거를 설정][103]하세요.

API 키와 포워더 구성을 구분하면 포워더를 업데이트할 때 Datadog API 키를 제공할 필요가 없습니다. 추후에 포워더를 업데이트나 업그레이드할 때 포워더 구성을 다시 적용하면 됩니다.

#### 구성 예시

```tf

variable "dd_api_key" {
  type        = string
  description = "Datadog API key"
}

resource "aws_secretsmanager_secret" "dd_api_key" {
  name        = "datadog_api_key"
  description = "Encrypted Datadog API Key"
}

resource "aws_secretsmanager_secret_version" "dd_api_key" {
  secret_id     = aws_secretsmanager_secret.dd_api_key.id
  secret_string = var.dd_api_key
}

output "dd_api_key" {
  value = aws_secretsmanager_secret.dd_api_key.arn
}
```

```tf
# Use the Datadog Forwarder to ship logs from S3 and CloudWatch, as well as observability data from Lambda functions to Datadog. For more information, see https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring
resource "aws_cloudformation_stack" "datadog_forwarder" {
  name         = "datadog-forwarder"
  capabilities = ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
  parameters   = {
    DdApiKeySecretArn  = "REPLACE ME WITH THE SECRETS ARN",
    DdSite             = "<SITE>",
    FunctionName       = "datadog-forwarder"
  }
  template_url = "https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml"
}
```

**참고**: `DdSite` 파라미터가 내 [Datadog 사이트][104]와 일치하는지 다시 확인하세요. 이 페이지 우측에 있는 사이트를 선택하세요. 위 샘플 구성에서 `<SITE>`를 {{< region-param key="dd_site" code="true" >}}로 변경하세요.

[101]: https://www.terraform.io/docs/providers/aws/r/cloudformation_stack
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#set-up-triggers
[104]: https://docs.datadoghq.com/ko/getting_started/site/#access-the-datadog-site

{{% /tab %}}
{{% tab "수동" %}}

### 수동

제공한 CloudFormation 템플릿으로 설치할 수 없는 경우 다음 단계에 따라 Forwarder를 수동으로 설치할 수 있습니다. 문제 티켓을 개시하거나 요청을 풀링해 템플릿을 개선할 수 있는 방법을 언제든지 알려주세요.

1. 최신 [릴리즈][101]의 `aws-dd-forwarder-<VERSION>.zip`을 사용해 Python 3.11 Lambda 함수를 생성하세요.
2. AWS Secret Manager에서 [Datadog API 키][102]를 저장하고 환경 변수 `DD_API_KEY_SECRET_ARN`을 Lambda 함수의 비밀 ARN으로 설정한 후 `secretsmanager:GetSecretValue` 권한을 Lambda 실행 역할에 부여하세요.
3. S3 버킷에서 로그를 전송해야 하는 경우 Lambda 실행 역할에 `s3:GetObject` 권한을 추가하세요.
4. Forwarder에서 환경 변수 `DD_ENHANCED_METRICS`을 `false`로 설정하세요. 이렇게 하면 Forwarder에서 고급 메트릭 생성을 중단하지만 다른 Lambda로 커스텀 메트릭을 전송은 계속 합니다.
5. 일부 AWS 계정의 경우 트리거가 Cloudwatch 로그 그룹이 포워더를 호출하는 리소스 기반 정책을 자동으로 생성하지 않도록 구성되어 있습니다. [CloudWatchLogPermissions][103]참조해 Cloudwatch 로그 이벤트를 호출하려면 필요한 포워더 권한을 확인하세요.
6. [트리거를 구성][104]하세요.
7. S3 버킷을 생성하고 환경 변수 `DD_S3_BUCKET_NAME`을 버킷 이름으로 설정하세요. 또 이 버킷의 Lambda 실행 역할에 `s3:GetObject`, `s3:PutObject`, `s3:ListBucket`, `s3:DeleteObject` 권한을 부여하세요. 이 버킷은 다른 태그 캐시(예: Lambda, S3, Step 함수, 로그 그룹)를 저장하는 데 사용됩니다. 또 전송 예외가 있을 경우 전송되지 않은 이벤트를 저장하는 데 사용됩니다.
8. 환경 변수 `DD_STORE_FAILED_EVENTS`를 `true`로 설정해 S3 버킷에 이벤트 데이터를 저장하도록 포워더를 활성화하세요. 로그, 메트릭, 또는 트레이스 전송 예외가 있을 경우, 포워더는 관련 데이터를 S3 버킷에 저장합니다. 문자열이 있는 문자열에 `retry` 키워드가 설정된 이벤트 수신(수동으로 트리거 가능, 아래 참조)과 같은 커스텀 호출의 경우, 포워더가 저장된 이벤트를 다시 전송 시도합니다. 이 시도가 성공하면 버킷 스토리지가 정리됩니다.

```bash
aws lambda invoke --function-name <function-name> --payload '{"retry":"true"}' out
```

[101]: https://github.com/DataDog/datadog-serverless-functions/releases
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: https://github.com/DataDog/datadog-serverless-functions/blob/029bd46e5c6d4e8b1ae647ed3b4d1917ac3cd793/aws/logs_monitoring/template.yaml#L680
[104]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers

{{% /tab %}}
{{< /tabs >}}

### 새 버전으로 업그레이드

1. CloudFormation 스택에서 [datadog-forwarder(이름 재정의를 하지 않은 경우)][5]를 찾으세요. [Datadog AWS 통합 스택][6]의 일부로 Forwarder를 이미 설치한 경우 루트 스택 대신 중첩된 Forwarder 스택을 업데이트해야 합니다. 
2. CloudFormation 스택의 "Resrouces" 탭에서 실제 Forwarder Lambda 함수를 찾고 구성 페이지로 이동하세요. 새 버전에서 문제가 생겨 롤백해야 할 경우를 대비해 `3.73.0`와 같이 태그 `dd_forwarder_version` 값을 메모해 두세요.
3. `https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml` 탬플릿을 사용해 스택을 업데이트하세요. `latest`를 `3.73.0.yaml`과 같이 특정 버전으로 변경할 수 있습니다. 필요할 경우 업데이트를 적용하기 전에 변경된 세트를 다시 한번 검토하세요.

최신 버전으로 업그레이드하는 데 문제가 생길 경우 트러블슈팅 섹션을 확인하세요.

### 구 버전에서 +3.107.0로 업그레이드

버전 3.107.0부터 수신 지점에 예외가 발생할 경우 Lambda 함수에서 전송되지 않은 이벤트를 저장하는 새 기능이 생겼습니다. 이 기능을 `DD_STORE_FAILED_EVENTS` 환경 변수로 활성화한 경우 태그 캐시를 저장하는 S3 버킷의 지정된 dir에 실패 이벤트가 저장됩니다. 이와 동일한 버킷에 고유한 subdir을 사용해 여러 Lambda 함수의 로그를 저장할 수 있습니다.

### 구 버전에서 +3.106.0으로 업그레이드

버전 3.106.0부터 `DD_S3_BUCKET_NAME`에 구성된 S3 버킷에 저장된 캐시 파일 이름에 접두사를 추가하도록 업데이트되었습니다. 이에 따라 같은 버킷을 사용해 여러 함수의 캐시 파일을 저장할 수 있습니다.
또 이 버전부터 기본적으로 포워더가 S3에 내보내는 모든 태그에 커스텀 S3 버킷 태그를 추가합니다. 예를 들어 서비스가 대상 S3 버킷으로 로그를 보내도록 구성되어 있으면 로그를 풀링 및 전송할 때 포워더가 버킷 태그를 추가합니다.

### 구 버전에서 +3.99.0으로 업그레이드

버전 3.99.0부터 Lambda 함수에 **Python 3.11**이 필요하도록 업데이트되었습니다. 이전 포워더를 +3.99.0 이상으로 업그레이드하는 경우에는 AWS Lambda 함수가 Python 3.11을 사용하도록 구성되어 있는지 확인하세요.

### 구 버전을 +3.98.0으로 업그레이드

버전 3.98.0부터 Lambda 함수에 **Python 3.10**이 필요하도록 업데이트되었습니다. 이전 포워더를 3.98.0 이상으로 업그레이드하는 경우에는 AWS Lambda 함수가 Python 3.10을 사용하도록 구성되어 있는지 확인하세요.

### 구 버전을 +3.74.0으로 업그레이드

버전 3.74.0부터 Lambda 함수에 **Python 3.9**가 필요하도록 업데이트되었습니다. 이전 포워더를 3.74.0 이상으로 업그레이드하는 경우에는 AWS Lambda 함수가 Python 3.9을 사용하도록 구성되어 있는지 확인하세요.

### 구 버전에서 +3.49.0으로 업그레이드

버전 3.49.0부터 Lambda 함수에 **Python 3.8**가 필요하도록 업데이트되었습니다. 이전 포워더를 3.49.0 이상으로 업그레이드하는 경우에는 AWS Lambda 함수가 Python 3.8을 사용하도록 구성되어 있는지 확인하세요.

### 구 버전에서 +3.0.0으로 업그레이드

버전 3.0.0부터 Forwarder Lambda 함수가 CloudFormation에서 관리됩니다. 이전 포워더를 3.0.0 이상으로 업그레이드하려면 아래 단계를 따르세요.

1. [설치](#installation) 단계에 따라 Forwarder를 새로 설치하세요.
2. 스택의 "Resource" 탭 아래에서 로직 ID `Forwarder`로 설치된 포워더 Lambda 함수를 찾으세요.
3. 트리거 몇 개(CloudWatch 로그 그룹 구독 필터 및 S3 버킷 이벤트 알림)를 수동으로 구 포워더에서 새 포워더로 마이그레이션 하세요.
4. 새 포워더가 잘 작동하는지 확인하세요. 예를 들어 오류 없이 정기적으로 호출되는지 보세요.
5. 마이그레이션된 트리거(소스)가 Datadog 로그 탐색기에 나타나는지 확인하고 상태가 정상인지 확인하세요.
6. 모든 트리거를 새 포워더로 마이그레이션하세요.
   - Datadog에서 [자동으로][6] 트리거를 작동하도록 관리했다면 AWS 통합 페이지의 **Log Collection** 탭에서 포워더 Lambda ARN을 업데이트하세요.
   - 트리거를 [수동으로][7] 관리했다면 수동으로 마이그레이션해야 합니다(또는 스크립트를 사용).
7. 구 포워더 Lambda 함수의 호출 개수가 0인지 확인하세요.
8. 모두 정상인 것을 확인했다면 구 포워더 Lambda 함수를 삭제하세요.
9. 구 포워더 Lambda 함수가 여러 AWS 계정과 리전에 설치되어 있다면 모든 계정과 리전에서 위 단계를 반복하세요.

### 삭제하기

포워더 CloudFormation 스택에서 생성한 포워더와 기타 AWS 리소스를 안전하게 삭제하려면 다음 단계를 따르세요

1. CloudFormation 스택에서 [datadog-forwarder(이름을 재정의하지 않은 경우)][5]를 찾으세요. 또는 "This function belongs to an application. Click here to manage it." 메시지에 있는 링크를 클릭해 Forwarder Lambda 함수의 관리 콘솔에서 스택을 찾을 수도 있습니다. 그리고 애플리케이션 페이지에 있는 "Deployments" 탭을 클릭하세요.
2. "Delete"을 클릭해 CloudFormation 스택을 삭제하세요.

### 포워더 설정 조정

1. [datadog-forwarder(이름을 재정의하지 않은 경우)][5] CloudFormation 스택을 찾으세요
2. 현재 템플릿을 사용해 스택을 업데이트하세요.
3. 파라미터 값을 조정하세요.

Datadog에서는 Lambda 함수를 직접 편집하는 것보다 CloudFormatino을 통해 Forwarder 설정을 조정하는 것을 권고합니다. [`template.yaml` 파일][8]에서 설정 설명과 스택을 실행할 때 보이는 스택 생성 사용자 인터페이스를 찾으세요. 템플릿을 통한 추가 설정 조정을 하고 싶으면 풀 요청을 제출하세요.

## 트러블슈팅

최신 [릴리즈][9]에서 최근 이슈가 모두 해결되었는지 확인하세요.

### 로깅

Forwarder Lambda 함수에서 환경 변수 `DD_LOG_LEVEL`을 `debug`로 설정해 상세 로깅을 임시 활성화하세요(나중에 삭제하는 것을 잊지 마세요). 디버깅 로그를 통해 Lambda 함수가 수신하는 이벤트 페이로드와 Datadog로 전송되는 데이터(로그, 메트릭, 또는 트레이스) 페이로드를 정확하게 알 수 있습니다.

추가 로깅이나 코드를 더해 더 깊이 조사할 수 있습니다. [기여](contributing) 섹션에서 로컬 변경으로 Forwarder 코드를 구축하는 방법에 관한 지침을 확인할 수 있습니다.

### 포워더 업데이트 문제

Forwarder의 `.zip` 코드로 수동 업데이트를 할 때 Forwarder 설치 Cloudformation 업데이트와 충돌할 수 있습니다. 후자의 경우 코드가 Lambda 레이어(`3.33.0` 버전 기본 설치 값)에 패키징되어 있어 호출 오류가 발생할 수 있습니다. 이 경우 Cloudformation을 통해 스택을 최신 버전으로 두 번 연속 업데이트하면(첫 설치에 `InstallAsLayer`를 `false`로 설정하고, 그 후 `true`로 설정) `.zip` 잔여 구성 요소가 삭제되기 때문에 문제가 해결됩니다.

그래도 해결하지 못했다면 디버깅 로그를 복사하고 티켓을 개설하여 [Datadog 지원팀][10]에 문의하세요.

### JSON 형식 로그가 Datadog에 나타나지 않을 경우

로그에 Datadog가 타임스탬프로 구문 분석하는 속성이 있을 경우 해당 타임스탬프가 최신이고 올바른 형식인지 확인해야 합니다. [로그 날짜 리매퍼][24]를 참고해 타임스탬프로 구문 분석하는 속성과 유효한 타임스탬프인지 확인하는 방법을 알아보세요.

### S3 트리거 생성 문제

S3 트리거를 생성할 때 다음과 같은 오류가 발생할 경우 이 AWS [문서](https://aws.amazon.com/blogs/compute/fanout-s3-event-notifications-to-multiple-endpoints/)에 안내된 팬아웃 아키텍처를 따를 것을 권고합니다.

```
An error occurred when creating the trigger: Configuration is ambiguously defined. Cannot have overlapping suffixes in two rules if the prefixes are overlapping for the same event type.
```

## 기여하기

풀 요청을 환영합니다. 다음은 풀 요청 빠른 가이드입니다.

1. 구현하기 전에 기능이나 버그 수정에 관해 논의하고 싶을 경우 [Datadog Slack 커뮤니티][11]의 `#serverless` 채널을 이용해 주세요.
1. 분기 나누기, 복제하기, 생성하기
   ```bash
   git clone git@github.com:<your-username>/datadog-serverless-functions.git
   git checkout -b <my-branch>
   ```
1. 코드 변경하기
1. 로컬 변경 사항 빌드하기
   ```bash
   cd aws/logs_monitoring
   ./tools/build_bundle.sh <SEMANTIC_VERSION> # any unique version is fine
   ```
1. 테스트 Forwarder를 변경한 코드와 테스트로 업데이트:
   ```bash
   # Upload in the AWS Lambda console if you don't have AWS CLI
   aws lambda update-function-code \
       --region <AWS_REGION> \
       --function-name <FORWARDER_NAME> \
       --zip-file fileb://.forwarder/aws-dd-forwarder-<SEMANTIC_VERSION>.zip
   ```
1. 유닛 테스트를 실행합니다.
   ```
   python -m unittest discover . # for code in Python
   ./trace_forwarder/scripts/run_tests.sh # for code in Go
   ```
1. 통합 테스트를 실행합니다.

   ```bash
   ./tools/integration_tests/integration_tests.sh

   # to update the snapshots if changes are expected
   ./tools/integration_tests/integration_tests.sh --update
   ```

1. 변경 사항이 CloudFormation 템플릿에 영향을 주면 내 AWS 계정에 설치 테스트를 실행하세요.
   ```bash
   ./tools/installation_test.sh
   ```
1. 분기를 푸시하고 [풀 요청을 제출][12]합니다.

## 고급

### 여러 대상으로 로그 전송

로그를 여러 Datadog 조직이나 다른 대상으로 전송해야 하는 경우 `AdditionalTargetLambdaArns` Cloudformatino 파라미터를 구성해 Datadog Forwarder가 수신 로그를 지정 Lambda 함수에 복사하도록 구성하세요. 이와 같은 추가 Lambda 함수는 Datadog Forwarder에서 수신하는 `event`와 비동기적으로 호출됩니다.

### AWS PrivateLink 지원

VPC 프라이빗 서브넷에서 Forwarder를 실행하고 AWS PrivateLink를 통해 데이터를 전송할 수 있습니다. AWS PrivateLink는 AWS에서 호스팅한 [Datadog 사이트][3]에서만 구성할 수 있습니다(예 `datadoghq.com`, `datadoghq.eu`는 안 됨).

1. Datadog `api`, `http-logs.intake`, `trace.agent` 엔드포인트를 VPC에 추가하려면 [이 지침][14]을 따르세요.
2. VPC에 AWS Secrets MAnager와 S3 엔드포인트를 추가하려면 이 [지침][15]을 따르세요.
3. CloudFormation 템플릿으로  Forwarder를 설치하는 경우:
   1. `UseVPC`를 `true`로 설정하세요.
   2. 내 VPC 설정에 따라 `VPCSecurityGroupIds`와 `VPCSubnetIds`를 설정하세요.
   3. AWS Resource Group Tagging API는 PrivateLink를 지원하지 않으므로 `DdFetchLambdaTags`를 `false`로 설정하세요.

#### DdUsePrivateLink는 사용 종료되었습니다.

[v3.41.0][16]부터 `DdUsePrivateLink` 옵션이 사용되지 않습니다. 이 옵션은 Forwarder에서 데이터 수신에 PrivateLink 엔드포인트의 특별 세트를 사용할 때 사용되었습니다(`pvtlink.api.{{< region-param key="dd_site" code="true" >}}`, `api-pvtlink.logs.{{< region-param key="dd_site" code="true" >}}`, `trace-pvtlink.agent.{{< region-param key="dd_site" code="true" >}}`). v3.41.0부터 Forwarder는 수신 엔드포인트의 일반 DNS이름으로 PrivateLink를 통해 Datadog로 데이터를 전송할 수 있습니다(`api.{{< region-param key="dd_site" code="true" >}}`, `http-intake.logs.{{< region-param key="dd_site" code="true" >}}`, `trace.agent.{{< region-param key="dd_site" code="true" >}}`). 따라서 `DdUsePrivateLink` 옵션을 더 이상 사용할 수 없습니다. 

`DdUsePrivateLink`를 `true`로 설정한 구 버전의 Forwarder를 사용하는 경우 구성한 PrivateLink 엔드포인트와 [Datadog 설명서에 안내된 것]과 일치하지 않을 수 있습니다. 해당 설명서에서 구 PrivateLink 엔드포인트가 삭제되었지만 기능은 아직 작동합니다. Forwarder를 업그레이드 할 때 변경해야 할 사항이 없고 `DdUsePrivateLink`를 활성화한 상태로 두고 구 엔드포인트를 계속 사용할 수 있습니다.

그러나 새 엔드포인트로 전환하고 싶으면 위의 업데이트된 지침을 따르세요.

1. 새 엔드포인트를 `api.{{< region-param key="dd_site" code="true" >}}`, `http-intake.logs.{{< region-param key="dd_site" code="true" >}}`, `trace.agent.{{< region-param key="dd_site" code="true" >}}`로 설정하세요.
2. `DdUseVPC`를 `true`로 설정하세요.
3. `DdUsePrivateLink`를 `false`로 설정하세요.

### AWS VPC와 프록시 지원

직접 공용 인터넷에 액세스하지 않고 Forwarder를 VPC에 배포해야 하는데 Datadog에 연결할 때 AWS PrivateLink를 사용할 수 없을 경우(예: Datadog EU 사이트인 `datadoghq.eu`에서 호스팅 중인 조직), 프록시를 통해 데이터를 전송할 수 있습니다.

1. Forwarder가 공용 서브넷으로 배포된 경우가 아니라면 이 [지침][15]을 따라 Secrets Manager와 S3의 엔드포인트를 VPC에 추가하세요. 그러면 Forwarder에서 해당 서비스에 액세스할 수 있습니다.
2. 다음 구성([HAProxy][17] 또는 [NGINX][18])으로 프록시를 업데이트하세요. 다른 프록시를 사용하거나 Web Proxy를 사용하는 경우 Datadog 도메인을 허용 목록에 추가하세요(예 `.{{< region-param key="dd_site" code="true" >}}`).
3. CloudFormation 템플릿으로 Forwarder를 설치할 경우 `DdUseVPC`, `VPCSecurityGroupIds`, `VPCSubnetIds`를 설정하세요.
4. 아직 AWS VPC에서는 Resource Groups Tagging API의 엔드포인트를 지원하지 않기 때문에 `DdFetchLambdaTags` 옵션이 비활성화되었는지 확인해야 합니다.
5. HAProxy 또는 NGINX를 사용하는 경우:

- `DdApiUrl`를 `http://<proxy_host>:3834` 또는 `https://<proxy_host>:3834`로 설정하세요.
- `DdTraceIntakeUrl`을 `http://<proxy_host>:3835` 또는 `https://<proxy_host>:3835`로 설정하세요.
- `DdUrl`을 `<proxy_host>`로, `DdPort`를 `3837`로 설정하세요.

Web Proxy를 사용할 경우:

- `DdHttpProxyURL`을 내 프록시 엔드포인트로 설정하세요(예: `http://<proxy_host>:<port>` 또는, 내 프록시에 사용자 이름과 비밀번호가 있을 경우에는 `http://<username>:<password>@<proxy_host>:<port>`).

7. `http`를 사용해 프록시에 연결할 경우 `DdNoSsl`을 `true`로 설정하세요.
8. 자체 서명 인증서로 `https`를 사용해 프록시에 연결할 경우 `DdSkipSslValidation`을 `true`로 설정하세요.

### 코드 서명

Datadog Forwarder는 Datadog가 서명합니다. Forwarder의 무결성을 인증하려면 수동 설치 방법을 사용하세요. [Datadog의 Signing Profie ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 포함하는 [코드 서명 구성을 생성][19]한 후 Forwarder Lambda 함수와 연결하고 Forwarder Zip 파일을 업로드하세요.

## CloudFormation 파라미터

### 필수

`DdApiKey`
: [Datadog API 키][20]. **Organization Settings** > **API Keys**에서 찾을 수 있습니다. API 키는 AWS Secrets Manager에 저장됩니다. 이미 Secrets Manager에 Datadog API 키가 저장되어 있으면 대신 `DdApiKeySecretArn`을 사용하세요.

`DdApiKeySecretArn`
: 이미 Secrets Manager에 저장되어 있는 경우 Datadog API 키를 저장 중인 비밀의 ARN. 키-값 쌍이 아니라 일반 텍스트로 비밀을 저장해야 합니다.

`DdSite`
: 메트릭과 로그가 전송될 [Datadog 사이트][13]. 내 Datadog 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.

### Lambda 함수(선택 사항)

`FunctionName`
: Datadog Forwarder Lambda 함수의 이름. 기존 CloudFormation 스택을 업데이트할 때 이 이름을 변경하지 마세요. 그러지 않으면 기존 포워더 함수가 교체되고 다른 트리거를 잃게 됩니다.

`MemorySize`
: Datadog Forwarder Lambda 함수의 메모리 규모.

`Timeout`
: Datadog Forwarder Lambda 함수의 시간 제한

`ReservedConcurrency`
: Datadog Forwarder Lambda 함수의 예약된 동시 실행. 값이 배워져 있으면 예약되지 않은 계정 동시 실행이 사용됩니다.
Datadog에서는 예약된 동시 실행을 최소 10으로 설정하기를 권장합니다. 그러나 사용자가 직접 한도를 올려야 하기 때문에 기본 값은 0으로 되어 있습니다. 예약되지 않은 계정 동시 실행을 사용 중이라면 내 환경에 있는 다른 Lambda 함수를 제한할 수 있습니다.

`LogRetentionInDays`
: Datadog Forwarder Lambda 함수로 생성된 CloudWatch 로그 보유 기간

### 로그 포워더(선택 사항)

`DdTags`
: 전송된 로그에 커스텀 태그를 추가합니다. 커스텀 태그는 쉼표로 띄어쓰기 없이 구분됩니다(예: `env:prod,stack:classic`).

`DdMultilineLogRegexPattern`
: S3의 멀티라인 로그에서 새 줄을 감지할 때 제공된 정규식을 사용합니다(예: `\d{2}\/\d{2}\/\d{4}`와 같이 "11/10/2014"와 같은 패턴으로 시작하는 멀티라인 로그).

`DdUseTcp`
: 기본적으로 포워더는 포트 443을 통해 HTTPS를 사용해 로그를 전송합니다. SSL 암호화 TCP 연결을 사용해 로그를 전송하려면 이 파라미터를 true로 설정하세요.

`DdNoSsl`
: 로그를 전송할 때 SSL을 비활성화합니다. 프록시를 통해 로그를 전송할 경우 true로 설정하세요.

`DdUrl`
: 로그를 전송하는 엔드포인트 URL. 프록시를 통해 로그를 전송할 때 유용합니다.

`DdPort`
: 로그를 전송하는 엔드포인트 포트. 프록시를 통해 로그를 전송할 때 유용합니다.

`DdSkipSslValidation`
: 엔드포인트에서 제공하는 인증서를 확인하지 않고 HTTPS를 통해 로그를 전송합니다. 포워더와 로그 수집 엔드포인트 사이의 트래픽 암호화는 계속되지만 대상 SSL 인증서가 유효한지는 확인하지 않습니다.

`DdUseCompression`
: 로그 압축을 비활성하기 위해 false로 설정됩니다. HTTP를 통해 로그를 전송할 때만 유효합니다.

`DdCompressionLevel`
: 압축 수준을 0(압축 없음)에서 9(최대 압축) 사이로 설정합니다. 기본 압축 수준은 6입니다. 압축 수준을 올리면 발송 네트워크 트래픽이 줄어드는 효과를 볼 수 있습니다. 그러나 Forwarder 실행 시간이 늘어납니다.

`DdForwardLog`
: 로그 전송을 비활성화하려면 false로 설정합니다. 그러나 Lambda 함수 메트릭과 트레이스 등 다른 관측 데이터는 계속 전송됩니다.

### 로그 스크러빙(선택 사항)

`RedactIp`
: `\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}`와 일치하는 텍스트를 `xxx.xxx.xxx.xxx`로 대체합니다.

`RedactEmail`
: `[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+`와 일치하는 텍스트를 `xxxxx@xxxxx.com`로 대체합니다.

`DdScrubbingRule`
: 제공한 정규식과 일치하는 텍스트를 `xxxxx`(기본값)으로 대체하거나 `DdScrubbingRuleReplacement`(지정한 경우)로 대체합니다. 로그 스크러빙 규칙은 Lambda 함수에 의해 자동으로 추가되는 메타데이터를 포함한 전체 JSON 형식 로그에 적용됩니다. 패턴의 각 인스턴스에 일치하는 텍스트가 있을 경우, 각 로그에서 일치하는 텍스트가 없을 때까지 교체됩니다. `.*`와 같이 비효율적인 정규식을 사용하면 Lambda 함수의 속도가 느려집니다.

`DdScrubbingRuleReplacement`
: DdScrubbingRule과 일치하는 텍스트를 제정된 텍스트로 교체합니다.

### 로그 필터링(선택 사항)

`ExcludeAtMatch`
: 지정된 정규식과 일치하는 로그를 전송하지 않습니다. `ExcludeAtMatch`와 `IncludeAtMatch`에 모두 일치할 경우에는 제외됩니다.

`IncludeAtMatch`
: 지정한 정규식과 일치하는 로그만 전송하며 `ExcludeAtMatch`와 일치하더라도 제외하지 않습니다.

필터링 규칙은 Forwarder에 의해 자동으로 추가되는 메타데이터를 포함한 전체 JSON 형식 로그에 적용됩니다. 그러나 로그가 Datadog에 전송된 후에 [로그 파이프라인][21]에 의해 적용된 변형은 Forwarder에서 로그를 필터링할 때 사용할 수 없습니다. `.*`와 같이 비효율적인 정규식을 사용하면 Forwarder의 속도가 느려질 수 있습니다.

로그 필터링에 사용할 수 있는 정규식 예시:

- Lambda 플랫폼 로그 포함(또는 제외): `"(START|END) RequestId:\s`. JSON Blob(`{"message": "START RequestId...."}`)에 있는 로그 메시지의 앞 부분과 일치시키기 위해 앞에 `"`가 필요합니다. Datadog에서는 `REPORT` 로그를 유지하기를 권장하는데, 서버리스 함수 보기에서 호출 목록을 채우기 위해 사용되기 때문입니다.
- CloudTrail 오류 메시지만 포함: `errorMessage`
- HTTP 4XX 또는 5XX 오류 코드를 포함한 로그만 포함: `\b[4|5][0-9][0-9]\b`
- `message` 필드에 특정 JSON 키/값 쌍이 포함되어 있는 CloudWatch 로그만 포함: `\"awsRegion\":\"us-east-1\"`
  - CloudWatch 로그 이벤트의 메시지 필드는 문자열로 코딩되어 있습니다. 예를 들어 `{"awsRegion": "us-east-1"}`는 `{\"awsRegion\":\"us-east-1\"}`로 코딩되어 있습니다. 따라서 제공한 패턴에 `\` 이스케이프 문자가 포함되어 있어야 합니다(예: `\"awsRegion\":\"us-east-1\"`).

내 로그에 여러 패턴을 테스트해보려면 [디버그 로그](#troubleshooting)를 켜세요.

### 고급(선택 사항)

`DdFetchLambdaTags`
: GetResources API 호출을 사용해 Forwarder가 Lambda 태그를 가져오도록 하고, 로그, 메트릭, 트레이스에 적용합니다. True로 설정하면 `tag:GetResources` 권한이 자동으로 Lambda 실행 IAM 역할에 추가됩니다.

`DdFetchLogGroupTags`
: ListTagsLogGroup을 사용해 포워더에서 Log Group 태그를 가져오도록 하고, 로그, 메트릭, 트레이스에 적용합니다. True로 설정하면 `logs:ListTagsLogGroup` 권한이 자동으로 Lambda 실행 IAM 역할에 추가됩니다.

`DdFetchStepFunctionsTags`
: GetResources API 호출을 사용해 Forwarder가 Step Functions 태그를 가져오도록 하고, 로그와 트레이스에 적용합니다(Step Functions 추적이 활성화되어 있는 경우). True로 설정하면 `tag:GetResources` 권한이 자동으로 Lambda 실행 IAM 역할에 추가됩니다.

`DdStepFunctionTraceEnabled`
: Step Functions 추적을 활성화하려면 true로 설정합니다.

`SourceZipUrl`
: 필요할 경우에만 변경하세요. 함수 소스 코드의 기본 위치를 재정의합니다.

`PermissionsBoundaryArn`
: 권한 경계 정책의 ARN

`DdUsePrivateLink`(사용되지 않음)
: AWS PrivateLink를 통해 로그와 메트릭을 전송하려면 True로 설정. [AWS PrivateLink]를 통해 Datadog 연결[2]을 참고하세요.

`DdHttpProxyURL`
: 표준 웹 프록시 환경 변수 HTTP_PROXY와 HTTPS_PROXY를 설정합니다. 이는 내 프록시 서버가 노출하는 URL 엔드포인트입니다. 이를 AWS Private Link와 함께 사용하지 마세요.`DdSkipSslValidation`을 True로 설정하세요.

`DdNoProxy`
: 표준 웹 프록시 환경 변수 `NO_PROXY`를 설정합니다. 웹 프록시에서 제외되어야 하는, 쉼표로 구분된 도메인 이름 목록입니다.

`VPCSecurityGroupIds`
: 쉼표로 구분된 VPC Security Group ID 목록입니다. AWS PrivateLink가 활성화되어 있을 때 사용합니다.

`VPCSubnetIds`
: 쉼표로 구분된 VPC 서브넷 ID 목록입니다. AWS PrivateLink가 활성화되어 있을 때 사용합니다

`AdditionalTargetLambdaArns`
: 쉼표로 구분된 Lambda ARN 목록입니다. Datadog Forwarder에서 수신하는 `event`와 동일하게, 비동기적으로 호출됩니다.

`InstallAsLayer`
: 레이어 기반 설치 흐름을 사용할지 여부를 결정합니다. False로 설정하면 레거시 설치 흐름을 사용하며, 이 경우 GitHub에서 S3 버킷으로 포워더 코드를 복사하는 두 번째 함수를 설치합니다.

`LayerARN`
: 포워더 코드를 포함하는 레이어의 ARN입니다. 값이 비워져 있으면 스크립트는 포워더에서 게시된 버전을 사용합니다. 기본값은 비워져 있습니다.

## 권한

기본 옵션으로 CloudFormation Stack을 배포하려면 아래 권한이 있어야 합니다. 그래야 Datadog API 키를 비밀로 저장하고, S3 버킷을 생성해 Forwarder 코드(ZIP 파일)을 저장하며, Lambda 함수를 생성할 수 있습니다(실행 역할과 로그 그룹 포함).

**IAM 문**:

```json
{
  "Effect": "Allow",
  "Action": [
    "cloudformation:*",
    "secretsmanager:CreateSecret",
    "secretsmanager:TagResource",
    "s3:CreateBucket",
    "s3:GetObject",
    "s3:PutEncryptionConfiguration",
    "s3:PutBucketPublicAccessBlock",
    "iam:CreateRole",
    "iam:GetRole",
    "iam:PassRole",
    "iam:PutRolePolicy",
    "iam:AttachRolePolicy",
    "lambda:CreateFunction",
    "lambda:GetFunction",
    "lambda:GetFunctionConfiguration",
    "lambda:GetLayerVersion",
    "lambda:InvokeFunction",
    "lambda:PutFunctionConcurrency",
    "lambda:AddPermission",
    "lambda:TagResource",
    "logs:CreateLogGroup",
    "logs:DescribeLogGroups",
    "logs:PutRetentionPolicy"
  ],
  "Resource": "*"
}
```

CloudFormation 스택을 생성하려면 다음 기능이 있어야 합니다.

- CAPABILITY_AUTO_EXPAND, 포워더 템플릿이 [AWS SAM 매크로][23]와 같은 매크로를 사용하기 때문.
- CAPABILTY_IAM/NAMED_IAM, Forwarder에서 IAM 역할을 생성하기 때문.

CloudFormation Stack에서는 다음 IAM 역할을 생성합니다.

- ForwarderRole: Lambda 함수의 실행 역할. S3에서 로그 읽기, Secrets Manager에서 Datadog API 키를 가져오기, 자체 로그 쓰기 등에 필요함.

**IAM 문**

```json
[
  {
    "Effect": "Allow",
    "Action": [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ],
    "Resource": "*"
  },
  {
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::*",
    "Effect": "Allow"
  },
  {
    "Action": ["secretsmanager:GetSecretValue"],
    "Resource": "<ARN of DdApiKeySecret>",
    "Effect": "Allow"
  }
]
```

- `ForwarderZipCopierRole`: ForwarderZipCopier Lambda 함수 실행 역할. S3 버킷에 Forwarder 배포 ZIP 파일을 다운로드할 때 필요함.

**IAM 문**:

```json
[
  {
    "Effect": "Allow",
    "Action": [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ],
    "Resource": "*"
  },
  {
    "Action": [
      "s3:ListBucket",
      "s3:PutObject",
      "s3:DeleteObject"
    ],
    "Resource": "<S3Bucket to Store the Forwarder Zip>",
    "Effect": "Allow"
  }
]
```

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog Lambda 함수로 AWS 서비스 로그 전송][2]

[1]: https://github.com/DataDog/datadog-lambda-extension
[2]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[3]: https://docs.datadoghq.com/ko/serverless/guide/extension_motivation/
[4]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[5]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[6]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[7]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/template.yaml
[9]: https://github.com/DataDog/datadog-serverless-functions/releases
[10]: https://docs.datadoghq.com/ko/help/
[11]: https://chat.datadoghq.com/
[12]: https://github.com/your-username/datadog-serverless-functions/compare/datadog:master...master
[13]: https://docs.datadoghq.com/ko/getting_started/site/
[14]: https://docs.datadoghq.com/ko/agent/guide/private-link/?tab=logs#create-your-vpc-endpoint
[15]: https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint
[16]: https://github.com/DataDog/datadog-serverless-functions/releases/tag/aws-dd-forwarder-3.41.0
[17]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/haproxy.txt
[18]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/nginx.txt
[19]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-console
[20]: https://app.datadoghq.com/organization-settings/api-keys
[21]: https://docs.datadoghq.com/ko/logs/processing/pipelines/
[22]: https://docs.datadoghq.com/ko/agent/guide/private-link/
[23]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-aws-serverless.html
[24]: https://docs.datadoghq.com/ko/logs/log_configuration/processors/?tab=ui#log-date-remapper
---
aliases:
- /ko/integrations/faq/aws-batch-ecs-fargate
- /ko/agent/guide/aws-batch-ecs-fargate-datadog-agent
description: ECS Fargate에서 실행되는 AWS Batch 작업과 함께 Datadog Agent를 배포하여 포괄적인 모니터링을 수행하세요.
further_reading:
- link: integrations/ecs_fargate/?tab=webui#aws-batch-on-ecs-fargate
  tag: 설명서
  text: AWS Batch를 포함하는 AWS Fargate 기반 Amazon ECS
- link: https://www.datadoghq.com/architecture/using-datadog-with-ecs-fargate/
  tag: 아키텍처 센터
  text: ECS Fargate와 함께 Datadog 사용
title: ECS Fargate와 Datadog Agent를 포함하는 AWS Batch
---
컨테이너를 작업 정의에 추가하여 AWS Batch 작업 컨테이너와 함께 Datadog Agent를 실행할 수 있습니다.

## 전제 조건 {#prerequisites}

* AWS Batch 컴퓨팅 환경
* 컴퓨팅 환경과 연결된 AWS Batch 작업 대기열

## 작업 정의 생성 {#create-the-job-definition}

{{< tabs >}}
{{% tab "AWS 웹 UI" %}}

1. [AWS Web Console][1]에 로그인하고 AWS Batch 섹션으로 이동합니다.
2. 왼쪽 메뉴에서 {{< ui >}}Job Definitions{{< /ui >}}를 클릭한 다음 {{< ui >}}Create{{< /ui >}} 버튼을 클릭하거나 기존 AWS Batch 작업 정의를 선택합니다.
3. 새 작업 정의:
    1. 오케스트레이션 유형으로 {{< ui >}}Fargate{{< /ui >}}를 선택합니다.
    2. 옵션을 {{< ui >}}Use legacy containerProperties structure{{< /ui >}} 선택 해제합니다. 
    3. {{< ui >}}Job Definition Name{{< /ui >}}을 입력합니다(예: `my-app-and-datadog`).
    4. 실행 IAM 역할을 선택합니다. 아래의 [IAM 정책 생성 또는 수정](#create-or-modify-your-iam-policy) 섹션에서 권한 요구 사항을 확인하세요.
    5. {{< ui >}}Assign public IP{{< /ui >}}를 활성화하여 아웃바운드 네트워크 액세스를 허용한 다음 {{< ui >}}Next{{< /ui >}} 버튼을 클릭합니다.
    6. Datadog Agent 컨테이너를 설정합니다.
        1. 의 경우 {{< ui >}}Container name{{< /ui >}} `datadog-agent`를 입력합니다.
        2. 의 경우 {{< ui >}}Image{{< /ui >}} `public.ecr.aws/datadog/agent:latest`를 입력합니다.
        3. 필요에 따라 {{< ui >}}CPU{{< /ui >}} 및 {{< ui >}}Memory{{< /ui >}} 리소스 요구 사항을 설정합니다.
        4. 의 경우 {{< ui >}}Env Variables{{< /ui >}} {{< ui >}}Key{{< /ui >}} `DD_API_KEY`를 추가하고 [Datadog API 키][2]를 값으로 입력합니다.
        5. {{< ui >}}Key{{< /ui >}} `ECS_FARGATE` 및 값 `true`를 사용하여 다른 환경 변수를 추가합니다. {{< ui >}}Add{{< /ui >}}을 클릭하여 컨테이너를 추가합니다.
        6. {{< ui >}}Key{{< /ui >}} `DD_SITE` 및 값을 사용하여 다른 환경 변수를 추가합니다. {{< region-param key="dd_site" code="true" >}}. 설정하지 않으면 기본값은 `datadoghq.com`입니다.
    7. 다른 애플리케이션 컨테이너를 작업 정의에 추가합니다.
    8. AWS Batch는 [Fluent Bit 및 Firelens][3]를 지원합니다. Datadog을 통해 애플리케이션 컨테이너의 로그 수집 활성화:
       1. 작업 정의에 별도의 로그 라우터 컨테이너를 생성합니다.
       2. 컨테이너에 대한 이미지 `amazon/aws-for-fluent-bit:stable"`를 구성합니다.
       3. Firelens 구성 섹션:
          - {{< ui >}}Type{{< /ui >}}을 `fluentbit`으로 구성합니다.
          - {{< ui >}}Options{{< /ui >}}을 구성하여 `enable-ecs-log-metadata`를 `true`로 설정하고 {{< ui >}}Name{{< /ui >}} 및 {{< ui >}}Value{{< /ui >}}을 각각 추가합니다.
       4. 로그 구성 섹션(애플리케이션 컨테이너):
          - {{< ui >}}Log Driver{{< /ui >}}를 `awsfirelens`로 구성합니다.
          - {{< ui >}}Options{{< /ui >}}을 구성하여 [ECS Fargate Fluent Bit 및 Firelens 섹션][4]의 2단계와 유사하게 다음 {{< ui >}}Name{{< /ui >}} 및 {{< ui >}}Value{{< /ui >}}를 추가합니다.
    10. {{< ui >}}Create job definition{{< /ui >}}을 클릭하여 작업 정의를 생성합니다.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/ko/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. [datadog-agent-aws-batch-ecs-fargate.json][1]을 다운로드합니다. 

   **참고**: 인터넷 탐색기를 사용하는 경우 아래에 언급된 JSON 파일이 포함된 gzip 파일로 다운로드될 수 있습니다.
2. JSON을 `JOB_DEFINITION_NAME`, [Datadog API 키][2] 및 적절한 `DD_SITE`로 업데이트합니다({{< region-param key="dd_site" code="true" >}}).

   **참고**: 환경 변수 `ECS_FARGATE`는 이미 `"true"`로 설정되어 있습니다.
3. 다른 애플리케이션 컨테이너를 작업 정의에 추가합니다.
4. AWS Batch는 [Fluent Bit 및 Firelens][3]를 지원합니다. Datadog을 통해 애플리케이션 컨테이너의 로그 수집 활성화:
   - JSON 파일의 `containers` 섹션에 다음을 포함하는 `log_router` 컨테이너를 추가합니다.
     ```json
      {
          "name": "log_router",
          "image": "amazon/aws-for-fluent-bit:stable",
          "essential": true,
          "firelensConfiguration": {
              "type": "fluentbit",
              "options": {
                  "enable-ecs-log-metadata": "true"
              }
          },
          "resourceRequirements": [
              {
                  "value": "0.25",
                  "type": "VCPU"
              },
              {
                  "value": "512",
                  "type": "MEMORY"
              }
          ]
      }
     ```
   - 애플리케이션 컨테이너에서 [ECS Fargate Fluent Bit 및 Firelens 섹션][4]의 2단계와 유사한 관련 `logConfiguration` 옵션을 추가합니다.
5. 다음 명령을 실행하여 작업 정의를 등록합니다.

   ```bash
   aws batch register-job-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-aws-batch-ecs-fargate.json
   ```

[1]: https://docs.datadoghq.com/ko/resources/json/datadog-agent-aws-batch-ecs-fargate.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/ko/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens
{{% /tab %}}
{{< /tabs >}}

## AWS Batch 작업 제출 {#submit-the-aws-batch-job}

{{< tabs >}}
{{% tab "AWS 웹 UI" %}}

1. [AWS Web Console][1]에 로그인하고 AWS Batch 섹션으로 이동합니다. 필요한 경우 [컴퓨팅 환경][2] 및 컴퓨팅 환경과 연결된 [작업 대기열][3]을 생성합니다.
2. {{< ui >}}Jobs{{< /ui >}} 탭에서 {{< ui >}}Submit new job{{< /ui >}} 버튼을 클릭합니다.
3. {{< ui >}}Job name{{< /ui >}}을 입력합니다.
4. {{< ui >}}Job Definition{{< /ui >}}에 이전 단계에서 생성한 작업을 선택합니다.
5. Datadog Agent를 실행할 작업 대기열을 선택합니다.
6. {{< ui >}}Container overrides{{< /ui >}}는 선택 사항입니다.
7. {{< ui >}}Next{{< /ui >}} 버튼을 클릭한 다음 {{< ui >}}Create job{{< /ui >}} 버튼을 클릭합니다.

[1]: https://aws.amazon.com/console
[2]: https://docs.aws.amazon.com/batch/latest/userguide/create-compute-environment.html
[3]: https://docs.aws.amazon.com/batch/latest/userguide/create-job-queue-fargate.html

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. 다음 명령을 실행하여 작업 정의 작업을 제출합니다.

```bash
aws batch submit-job --job-name <JOB_NAME> \
--job-queue <JOB_QUEUE_NAME> \
--job-definition <JOB_DEFINITION_NAME>:1
```

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
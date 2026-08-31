---
description: 아카이빙 및 리하이드레이션을 위해 Datadog 리하이드레이션이 가능한 형식으로 Amazon S3에 로그를 전송하는 방법을
  알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Datadog Archives 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Datadog Archives 목적지를 사용하여 Datadog 리하이드레이션 가능 형식으로 [아카이브][1]를 위해 Amazon S3로 로그를 보냅니다. 그런 다음 [Archive Search][16]를 사용하여 이러한 로그를 쿼리할 수 있습니다. 전체 플랫폼 액세스를 위해 결과를 다시 인덱싱해야 할 때 Archive Search의 {{< ui >}}Search & Rehydration{{< /ui >}} 모드를 사용하세요.

**참고**: 
- Datadog Archives 목적지는 gzip을 사용하여 로그를 압축합니다.
- JSON 또는 Parquet 형식으로 Amazon S3에 로그를 전송하려면 [Amazon S3][12] 목적지를 사용하세요.

[Datadog Archives 목적지를 사용하여 로그를 Snowflake로 라우팅](#route-logs-to-snowflake-using-the-datadog-archives-destination)할 수도 있습니다.

## 전제 조건 {#prerequisites}

Datadog Archives 목적지를 사용하려면 [Datadog Log Archives](#configure-log-archives)를 구성할 수 있도록 Datadog의 [AWS 통합][3]을 설치해야 합니다.

## Log Archives 구성 {#configure-log-archives}

Datadog Log Archives가 이미 구성되어 있다면 [파이프라인 목적지 설정하기](#set-up-the-destination-for-your-pipeline)로 건너뛰세요.

{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}

### Observability Pipelines Worker가 S3 버킷에 쓸 수 있도록 허용하는 IAM 정책을 설정하세요 {#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket}

1. [IAM console][11]로 이동합니다.
1. 왼쪽 사이드 메뉴에서 **Policies**를 선택합니다.
1.  **Create policy**를 클릭합니다.
1.  **Specify permissions** 섹션에서 **JSON**을 클릭합니다.
1. 아래 정책을 복사하여 **Policy editor**에 붙여넣습니다. `<MY_BUCKET_NAME_1>` 및 `<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>`을 이전 섹션에서 생성한 S3 버킷 정보로 바꿉니다.
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "DatadogUploadAndRehydrateLogArchives",
                "Effect": "Allow",
                "Action": ["s3:PutObject", "s3:GetObject"],
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>/*"
            },
            {
                "Sid": "DatadogRehydrateLogArchivesListBucket",
                "Effect": "Allow",
                "Action": "s3:ListBucket",
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>"
            }
        ]
    }
    ```
1. **Next**를 클릭합니다.
1. 정책을 설명하는 이름을 입력합니다.
1. 필요시 태그를 추가합니다.
1.  **Create policy**를 클릭합니다.

{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/amazon_eks %}}

{{% /tab %}}
{{% tab "Linux(APT)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_apt %}}

{{% /tab %}}
{{% tab "Linux(RPM)" %}}

{{% observability_pipelines/configure_log_archive/amazon_s3/linux_rpm %}}

{{% /tab %}}
{{< /tabs >}}

### S3 버킷을 Datadog Log Archives에 연결 {#connect-the-s3-bucket-to-datadog-log-archives}

1. Datadog [Log Forwarding][17]으로 이동합니다.
1. **New archive**를 클릭합니다.
1. 아카이브를 설명하는 이름을 입력합니다.
1. 로그 파이프라인을 통과하는 모든 로그를 필터링하여 해당 로그가 이 아카이브로 들어가지 않도록 쿼리를 추가하세요. 예를 들어, 파이프라인을 통과하는 로그에 해당 태그가 추가되지 않았다고 가정하여 쿼리 `observability_pipelines_read_only_archive`를 추가하세요.
1. **AWS S3**를 선택합니다.
1. 버킷이 있는 AWS 계정을 선택합니다.
1. S3 버킷 이름을 입력합니다.
1. 필요시 경로를 입력합니다.
1. 확인을 요구하는 문장에 체크 표시합니다.
1. 필요시 태그를 추가하고 리하이드레이션을 위한 최대 스캔 크기를 정의하세요. 자세한 내용은 [고급 설정][18]을 참조하세요.
1. **Save**를 클릭합니다.

추가 정보는 [Log Archives 설명서][1]을 참조하세요.

## 파이프라인 목적지 설정하기{#set-up-the-destination-for-your-pipeline}

[Archive Logs 파이프라인을 설정][4]할 때 Datadog Archives 목적지를 구성하세요. 파이프라인은 [UI][13]에서 설정할 수 있으며, [API][14] 또는 [Terraform][15]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

파이프라인 UI에서 Datadog Archives 목적지를 선택한 후 다음 단계를 따르세요.

1. S3 버킷 이름을 입력합니다. Log Archives를 구성한 경우, 이전에 생성한 버킷의 이름을 입력하세요.
1. S3 버킷이 있는 AWS 리전을 입력합니다.
1. 키 접두사를 입력합니다.
    - 접두사는 객체를 파티셔닝하는 데 유용합니다. 예를 들어, 접두사를 객체 키로 사용하여 특정 디렉터리 아래에 객체를 저장하세요. 이 용도로 접두사를 사용하는 경우, 디렉터리 경로로 작동하도록 `/`로 끝나야 합니다. 후행 `/`는 자동으로 추가되지 않습니다.
    - 로그의 특정 필드를 기반으로 로그를 다른 객체 키로 라우팅하려면 [템플릿 구문][8]을 참조하세요.
     - **참고**: Datadog은 접두사를 디렉터리 이름으로 시작하고 선행 슬래시(`/`) 없이 시작할 것을 권장합니다. 예를 들어, `app-logs/` 또는 `service-logs/`.
1. {{< ui >}}Storage Class{{< /ui >}} 드롭다운 메뉴에서 S3 버킷의 스토리지 클래스를 선택합니다. 로그를 아카이빙하고 리하이드레이션하려는 경우:
    - **참고**: 리하이드레이션은 다음 [스토리지 클래스][9]만 지원합니다.
        - Standard
        - Intelligent-Tiering. 단, [선택 사항인 비동기식 아카이브 액세스 계층][10]이 모두 비활성화된 경우에만 지원됩니다.
        - Standard-IA
        - One Zone-IA
    - 다른 스토리지 클래스의 아카이브에서 리하이드레이션하려면 먼저 해당 아카이브를 위의 지원되는 스토리지 클래스 중 하나로 이동해야 합니다.
    - Amazon S3 목적지 설정에 따라 로그 아카이브를 구성하는 방법은 이 페이지의 [예시 목적지 및 로그 아카이브 설정](#example-destination-and-log-archive-setup) 섹션을 참조하세요.

### 선택적 설정 {#optional-settings}

#### AWS 인증 {#aws-authentication}

AWS 인증 옵션을 선택하세요. [이전에 생성한 사용자 또는 역할](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket)만 인증에 사용하는 경우 {{< ui >}}Assume role{{< /ui >}}을 선택하지 마세요. 이전에 생성한 사용자 또는 역할이 AWS 리소스에 액세스하기 위해 다른 역할을 맡아야 하는 경우에만 {{< ui >}}Assume role{{< /ui >}}을 선택하세요. 맡은 역할의 권한은 명시적으로 정의되어야 합니다.<br>{{< ui >}}Assume role{{< /ui >}}을 선택하는 경우:
1. 맡으려는 IAM 역할의 ARN을 입력합니다.
    - **참고:** [이전에 생성한 사용자 또는 역할](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket)은 Worker가 AWS로 인증할 수 있도록 이 역할을 맡을 권한이 있어야 합니다.
1. (필요시) 맡은 역할의 세션 이름과 외부 ID를 입력합니다.

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

### 예시 목적지 및 로그 아카이브 설정 {#example-destination-and-log-archive-setup}

Datadog Archives 목적지에 대해 다음 값을 입력하는 경우:
- S3 버킷 이름: `test-op-bucket`
- 모든 객체 키에 적용할 접두사: `op-logs`
- 생성된 객체에 대한 스토리지 클래스: `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_destination.png" alt="예시 값을 사용한 Datadog Archives 목적지 설정" style="width:40%;" >}}

그러면 Log Archives를 위해 S3 버킷을 구성할 때 입력해야 하는 값은 다음과 같습니다.

- S3 버킷: `test-op-bucket`
- 경로: `op-logs`
- 스토리지 클래스: `Standard`

{{< img src="observability_pipelines/setup/amazon_s3_archive.png" alt="예시 값을 사용한 로그 아카이브 구성" style="width:70%;" >}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

구성할 시크릿 식별자가 없습니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Datadog Archives 목적지를 사용하여 Snowflake로 로그 라우팅 {#route-logs-to-snowflake-using-the-datadog-archives-destination}

Snowflake에서 Snowpipe를 구성하여 해당 로그를 자동으로 수집하도록 함으로써 Datadog Archives 목적지를 사용하여 Observability Pipelines에서 Snowflake로 로그를 라우팅할 수 있습니다. Snowpipe는 S3 버킷에서 새 파일을 지속적으로 모니터링하고 이를 Snowflake 테이블로 자동으로 수집하여 분석이나 추가 처리를 위한 실시간에 가까운 데이터 가용성을 보장합니다. Observability Pipelines에서 로그를 수집하면 S3 버킷에 기록됩니다. 설정 방법:
1. [Log Archives를 ](#configure-log-archives)구성합니다.
1. [파이프라인 설정][5]을 통해 Datadog Archives를 로그 목적지로 사용합니다. [파이프라인 목적지 설정](#set-up-the-destination-for-your-pipeline)에 자세히 설명된 구성을 사용하세요.
1. Snowflake에서 Snowpipe를 설정합니다. 자세한 지침은 [Amazon S3에서 Snowpipe 자동화][6]를 참조하세요.

## 목적지의 작동 방식 {#how-the-destination-works}

### AWS 인증 {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### 권한 {#permissions}

Observability Pipelines Worker가 Amazon S3로 로그를 전송하려면 다음 정책 권한이 필요합니다.

- `s3:ListBucket`
- `s3:PutObject`
- `s3:GetObject`

### 이벤트 배치 처리 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][7]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 없음           | 100               | 900                 |

[1]: /ko/logs/log_configuration/archives/
[2]: /ko/logs/log_configuration/rehydrating/
[3]: /ko/integrations/amazon_web_services/#setup
[4]: /ko/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /ko/observability_pipelines/configuration/set_up_pipelines/
[6]: https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3
[7]: /ko/observability_pipelines/destinations/#event-batching
[8]: /ko/observability_pipelines/destinations/#template-syntax
[9]: /ko/logs/log_configuration/archives/?tab=awss3#storage-class
[10]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
[11]: https://console.aws.amazon.com/iam/
[12]: /ko/observability_pipelines/destinations/amazon_s3/
[13]: https://app.datadoghq.com/observability-pipelines
[14]: /ko/api/latest/observability-pipelines/
[16]: /ko/logs/explorer/archive_search/
[15]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[17]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[18]: /ko/logs/log_configuration/archives/?tab=awss3#advanced-settings
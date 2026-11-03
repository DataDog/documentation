---
description: Amazon S3 목적지 구성 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Amazon S3 목적지
---
{{< product-availability >}}

{{< callout url="#" btn_hidden="true" header="false">}}
Amazon S3 목적지는 미리 보기로 제공되고 있습니다. 액세스 권한은 계정 관리자에게 문의하세요.
{{< /callout >}}

##  개요 {#overview}

Amazon S3 목적지를 사용하여 JSON 또는 Parquet 형식의 로그를 Amazon S3로 전송하세요. [자동 생성된 Parquet 스키마](#automatically-generated-parquet-schema)를 참조하세요.

또한 [Amazon S3 목적지를 사용하여 로그를 Snowflake로 라우팅](#route-logs-to-snowflake-using-the-amazon-s3-destination)할 수도 있습니다.

**참고**: 로그를 S3 버킷으로 전송한 후 나중에 Datadog에서 분석 및 조사를 위해 [리하이드레이션][1]하려면 [Datadog Archives][2] 목적지를 사용하세요.

## Amazon S3 버킷 설정 {#set-up-an-amazon-s3-bucket}

{{% observability_pipelines/configure_log_archive/amazon_s3/instructions %}}


### Worker가 S3 버킷에 쓸 수 있도록 허용하는 IAM 정책 설정 {#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket}

1. [IAM console][3]로 이동합니다.
1. 왼쪽 사이드 메뉴에서 **Policies**를 선택합니다.
1. **Create policy**를 클릭합니다.
1. **Specify permissions** 섹션에서 **JSON**을 클릭합니다.
1. 아래 정책을 복사하여 **Policy editor**에 붙여넣습니다. `<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>`을 이전 섹션에서 생성한 S3 버킷 정보로 바꿉니다.
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "DatadogOPUpload",
                "Effect": "Allow",
                "Action": [
                    "s3:PutObject"
                ],
                "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1>/<MY_OPTIONAL_BUCKET_PATH_1>/*"
            }
        ]
    }
    ```
1. **Next**를 클릭합니다.
1. 설명이 포함된 정책 이름을 입력합니다.
1. 필요시 태그를 추가합니다.
1. **Create policy**를 클릭합니다.

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

## 파이프라인 목적지 설정 {#set-up-the-destination-for-your-pipeline}

[파이프라인을 설정][11]할 때 Amazon S3 목적지를 설정하세요. 파이프라인은 [UI][8]에서 설정할 수 있으며, [API][9] 또는 [Terraform][10]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

파이프라인 UI에서 Amazon S3 목적지를 선택한 후 다음 단계를 따르세요.

1. S3 버킷 이름을 입력합니다. Log Archives를 구성한 경우, 이전에 생성한 버킷의 이름을 입력하세요.
1. S3 버킷이 있는 AWS 리전을 입력합니다.
1. (선택 사항) 키 접두사를 입력합니다.
    - 접두사는 객체를 파티셔닝하는 데 유용합니다. 예를 들어, 접두사를 객체 키로 사용하여 특정 디렉터리 아래에 객체를 저장하세요. 이 용도로 접두사를 사용하는 경우, 디렉터리 경로로 작동하도록 `/`로 끝나야 합니다. 후행 `/`는 자동으로 추가되지 않습니다.
      - 로그의 특정 필드를 기반으로 로그를 다른 객체 키로 라우팅하려면 [템플릿 구문][4]을 참조하세요.
    - **참고**:
        - Datadog은 접두사를 디렉터리 이름으로 시작하고 선행 슬래시(`/`) 없이 시작할 것을 권장합니다. 예를 들어, `app-logs/` 또는 `service-logs/`.
        - [Datadog Archives][2] 목적지와 동일한 S3 접두사를 **사용하지 마세요**. Amazon S3 목적지는 다른 형식으로 파일을 작성하며, 동일한 접두사에 두 파일 유형을 모두 포함하면 리하이드레이션 문제가 발생할 수 있습니다.
1. {{< ui >}}Storage Class{{< /ui >}} 드롭다운 메뉴에서 S3 버킷의 스토리지 클래스를 선택합니다.
1. {{< ui >}}Encoding{{< /ui >}} 드롭다운 메뉴에서 사용할 인코딩을 선택합니다({{< ui >}}JSON{{< /ui >}} 또는 {{< ui >}}Parquet{{< /ui >}}).
    - **참고**: {{< ui >}}Parquet{{< /ui >}}의 경우, 스키마는 배치별로 생성되며 달라질 수 있습니다. [자동 생성된 Parquet 스키마](#automatically-generated-parquet-schema)를 참조하세요.
1. {{< ui >}}Compression - Algorithm{{< /ui >}} 드롭다운 메뉴에서 압축 알고리즘을 선택합니다. 선택한 방식에 따라 다음을 설정하세요.
    - {{< ui >}}Parquet{{< /ui >}}: `zstd`를 선택하는 경우 Datadog은 `snappy` 또는 낮은 압축 수준을 권장합니다.
    - {{< ui >}}JSON{{< /ui >}}: Datadog은 `gzip`를 권장합니다.

### 선택적 설정 {#optional-settings}

#### 배치 처리 {#batching}

1. 최대 배치 크기를 입력하고 드롭다운 메뉴에서 단위({{< ui >}}MB{{< /ui >}} 또는 {{< ui >}}GB{{< /ui >}})를 선택합니다. 구성하지 않으면 기본값은 `100`MB 입니다.
1. 배치 처리 제한 시간을 초 단위로 입력합니다. 구성하지 않으면 기본값은 `900`초입니다.

#### 서버 측 암호화 {#server-side-encryption}

1. {{< ui >}}Server-Side Encryption{{< /ui >}} 드롭다운 메뉴에서 S3 버킷의 암호화 유형을 선택합니다({{< ui >}}AWS KMS{{< /ui >}} 또는 {{< ui >}}AES256{{< /ui >}}).
1. {{< ui >}}AWS KMS{{< /ui >}}를 선택한 경우, AWS KMS 키 ID를 입력합니다.

#### AWS 인증 {#aws-authentication}

AWS 인증 옵션을 선택하세요. [이전에 생성한 사용자 또는 역할](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket)만 인증에 사용하는 경우 {{< ui >}}Assume role{{< /ui >}}을 선택하지 마세요. 이전에 생성한 사용자 또는 역할이 AWS 리소스에 액세스하기 위해 다른 역할을 맡아야 하는 경우에만 {{< ui >}}Assume role{{< /ui >}}을 선택하세요. 맡은 역할의 권한은 명시적으로 정의되어야 합니다.<br>{{< ui >}}Assume role{{< /ui >}}을 선택하는 경우:
1. 맡으려는 IAM 역할의 ARN을 입력합니다.
    - **참고:** [이전에 생성한 사용자 또는 역할](#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket)은 Worker가 AWS로 인증할 수 있도록 이 역할을 맡을 권한이 있어야 합니다.
1. (필요시) 맡은 역할의 세션 이름과 외부 ID를 입력합니다.

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

구성할 시크릿 식별자가 없습니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/destination_env_vars/datadog_archives_amazon_s3 %}}

{{% /tab %}}
{{< /tabs >}}

## Amazon S3 목적지를 사용하여 Snowflake로 로그 라우팅 {#route-logs-to-snowflake-using-the-amazon-s3-destination}

Snowflake에서 Snowpipe를 구성하여 해당 로그를 자동으로 수집하도록 함으로써 Amazon S3 목적지를 사용하여 Observability Pipelines에서 Snowflake로 로그를 라우팅할 수 있습니다. Snowpipe는 S3 버킷에서 새 파일을 지속적으로 모니터링하고 이를 Snowflake 테이블로 자동으로 수집하여 분석이나 추가 처리를 위한 실시간에 가까운 데이터 가용성을 보장합니다. Observability Pipelines에서 로그를 수집하면 S3 버킷에 기록됩니다. 설정 방법은 다음과 같습니다.
1. [파이프라인 설정][5]을 통해 Amazon S3를 로그 목적지로 사용합니다. [파이프라인 목적지 설정](#set-up-the-destination-for-your-pipeline)에 자세히 설명된 구성을 사용하세요.
1. Snowflake에서 Snowpipe를 설정합니다. 자세한 지침은 [Amazon S3에서 Snowpipe 자동화][6]를 참조하세요.

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][12] 및 [목적지 버퍼 메트릭][13]에 대해서는 [Pipelines 사용량 메트릭][14] 설명서를 참조하세요. Amazon S3 목적지 메트릭을 필터링하거나 그룹화하려면 태그 `component_type:amazon_s3_generic`을 사용하세요.

## 목적지의 작동 방식 {#how-the-destination-works}

### AWS 인증 {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

#### 권한 {#permissions}

Observability Pipelines Worker가 Amazon S3로 로그를 전송하려면 다음 정책 권한이 필요합니다.

- `s3:PutObject`

### 자동 생성된 Parquet 스키마 {#automatically-generated-parquet-schema}

Observability Pipelines Worker는 이벤트 배치를 수집하고 해당 이벤트에 대한 스키마를 생성한 다음 배치를 S3로 플러시합니다. 스키마는 현재 이벤트 배치만을 기반으로 하므로 배치마다 다를 수 있습니다.

### 이벤트 배치 처리 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][7]를 참조하세요.

| 최대 이벤트     | 최대 바이트       | 시간 초과(초)   |
|----------------| ----------------| --------------------|
| 없음           | 100,000,000     | 900                 |

[1]: /ko/logs/log_configuration/rehydrating/
[2]: /ko/observability_pipelines/destinations/datadog_archives/
[3]: https://console.aws.amazon.com/iam/
[4]: /ko/observability_pipelines/destinations/#template-syntax
[5]: /ko/observability_pipelines/configuration/set_up_pipelines/
[6]: https://docs.snowflake.com/en/user-guide/data-load-snowpipe-auto-s3
[7]: /ko/observability_pipelines/destinations/#event-batching
[8]: https://app.datadoghq.com/observability-pipelines
[9]: /ko/api/latest/observability-pipelines/
[10]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[11]: /ko/observability_pipelines/configuration/set_up_pipelines/
[12]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[13]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[14]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
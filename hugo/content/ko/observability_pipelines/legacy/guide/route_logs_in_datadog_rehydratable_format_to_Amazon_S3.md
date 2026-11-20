---
aliases:
- /ko/observability_pipelines/guide/route_logs_in_datadog_rehydratable_format_to_Amazon_S3/
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: 설명서
  text: 관측성 파이프라인에서 데이터 작업하기
- link: /logs/log_configuration/archives/
  tag: 설명서
  text: 로그 아카이브 자세히 알아보기
- link: /logs/log_configuration/rehydrating/
  tag: 설명서
  text: 로그 아카이브 복원에 대해 자세히 알아보기
title: (레거시) 로그를 Datadog에서 복원 가능한 형식으로 Amazon S3로 라우팅합니다.
---

<div class="alert alert-warning">Observability Pipelines Datadog 아카이브 대상은 베타 버전입니다.</div>

## 개요

Observability Pipelines `datadog_archives` 대상은 로그를 Datadog에서 리하이드레이션 가능한 형식으로 포맷한 다음 [로그 아카이브][1]로 라우팅합니다. 이러한 로그는 Datadog로 수집되지 않고 아카이브로 직접 라우팅됩니다. 그런 다음 분석 및 조사가 필요할 때 Datadog에서 아카이브를 다시 리하이드레이션 할 수 있습니다.

Observability Pipelines Datadog 아카이브 대상은 다음과 같은 경우에 유용합니다.
- 노이즈 많은 로그가 많지만 로그 관리에서 임시로 색인화해야 할 수 있습니다.
- 유지 정책이 있습니다.

예를 들어, 이 첫 번째 다이어그램에서 일부 로그는 보관을 위해 클라우드 스토리지로, 다른 로그는 분석 및 조사를 위해 Datadog로 전송됩니다. 그러나 클라우드 스토리지로 직접 전송된 로그는 조사할 필요가 있을 때 Datadog에서 다시 리하이드레이션 할 수 없습니다.

{{< img src="observability_pipelines/guide/datadog_archives/op-cloud-storage.png" alt="클라우드 스토리지와 Datadog로 이동하는 로그를 보여주는 다이어그램" >}}

두 번째 다이어그램에서는 첫 번째 다이어그램에서 클라우드 스토리지로 이동한 로그를 포함하여 모든 로그가 Datadog 에이전트로 이동합니다. 그러나 두 번째 시나리오에서는 로그가 Datadog에 수집되기 전에 `datadog_archives` 대상 시스템에서 클라우드 스토리지로 직접 이동해야 할 로그를 포맷하고 Datadog Log Archives로 라우팅합니다. Log Archive의 로그는 필요에 따라 Datadog에서 다시 리하이드레이션 할 수 있습니다.

{{< img src="observability_pipelines/guide/datadog_archives/op-datadog-archives.png" alt="Datadog로 전송되는 모든 로그를 보여주는 다이어그램" >}}

본 지침에서는 다음 단계를 설명합니다.

- [로그아카이브 구성](#configure-a-log-archive)
- [`datadog_archives` 대상 구성](#configure-the-datadog_archives-destination)
- [아카이브 리하이드레이션](#rehydrate-your-archive)

`datadog_archives`는 Observability Pipelines Worker 버전 1.5 이상에서 사용할 수 있습니다.

## Log Archive 구성

### Amazon S3 버킷 생성하기

{{< site-region region="us,us3,us5" >}}
지역 간 데이터 전송 수수료와 클라우드 스토리지 비용이 어떻게 영향을 받을 수 있는지에 대해서는 [AWS 가격][1]을 참조하세요.

[1]: https://aws.amazon.com/s3/pricing/
{{< /site-region >}}

1. [Amazon S3 버킷][2]으로 이동합니다. 
1. **Create bucket**을 클릭합니다.
1. 버킷을 설명하는 이름을 입력합니다.
1. 버킷을 공개적으로 읽을 수 있도록 설정하지 마세요.
1. 옵션으로 태그를 추가합니다.
1. **Create bucket**을 클릭합니다.

### Worker가 S3 버킷을 작성할 수 있도록 허용하는 IAM 정책을 설정하세요.

1. [IAM 콘솔][3]로 이동합니다.
1. 왼쪽 사이드 메뉴에서 **Policies**를 선택합니다.
1. **Create policy**을 클릭합니다.
1. **Specify permissions** 섹션에서 **JSON**을 클릭합니다.
1. 하단의 정책을 복사하여 **정책 편집기**에 붙여넣습니다. `<MY_BUCKET_NAME>` 및 `<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>`을 앞서 생성한 S3 버킷의 정보로 바꿉니다.
{{< code-block lang="json">}}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DatadogUploadAndRehydrateLogArchives",
            "Effect": "Allow",
            "Action": ["s3:PutObject", "s3:GetObject"],
            "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*"
        },
        {
            "Sid": "DatadogRehydrateLogArchivesListBucket",
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::<MY_BUCKET_NAME>"
        }
    ]
}
{{< /code-block >}}
1. **Next**를 클릭합니다.
1. 정책을 설명하는 이름을 입력합니다
1. 옵션으로 태그를 추가합니다.
1. **Create policy**을 클릭합니다.

{{< tabs >}}
{{% tab "Docker" %}}

### IAM 사용자 생성하기

IAM 사용자를 생성하고 이전에 만든 IAM 정책을 연결합니다.

1. [IAM 콘솔][1]로 이동합니다.
1. 왼쪽 사이드 메뉴에서 **Users**를 선택합니다.
1. **Create user**를 클릭합니다.
1. 사용자 이름을 입력합니다.
1. **Next**를 클릭합니다.
1. **Attach policies directly**를 선택합니다.
1. 이전에 만든 IAM 정책을 선택하여 새 IAM 사용자와 연결합니다.
1. **Next**를 클릭합니다.
1. 옵션으로 태그를 추가합니다.
1. **Create user**를 클릭합니다.

새 IAM 사용자의 액세스 자격 증명을 만듭니다. 이 자격 증명을 `AWS_ACCESS_KEY` 및 `AWS_SECRET_ACCESS_KEY`로 저장합니다.

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "AWS EKS" %}}

### 서비스 계정 생성

[서비스 계정 생성][1]을 클릭하여 위에서 만든 정책을 사용합니다. Helm 구성에서 `${DD_ARCHIVES_SERVICE_ACCOUNT}`를 서비스 계정의 이름으로 바꿉니다.


[1]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html
{{% /tab %}}
{{% tab "APT-based Linux" %}}

### IAM 사용자 생성하기

IAM 사용자를 생성하고 이전에 만든 IAM 정책을 연결합니다.

1. [IAM 콘솔][1]로 이동합니다.
1. 왼쪽 사이드 메뉴에서 **Users**를 선택합니다.
1. **Create user**를 클릭합니다.
1. 사용자 이름을 입력합니다.
1. **Next**를 클릭합니다.
1. **Attach policies directly**를 선택합니다.
1. 이전에 만든 IAM 정책을 선택하여 새 IAM 사용자와 연결합니다.
1. **Next**를 클릭합니다.
1. 옵션으로 태그를 추가합니다.
1. **Create user**를 클릭합니다.

새 IAM 사용자의 액세스 자격 증명을 만듭니다. 이 자격 증명을 `AWS_ACCESS_KEY` 및 `AWS_SECRET_ACCESS_KEY`로 저장합니다.

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "RPM-based Linux" %}}

### IAM 사용자 생성하기

IAM 사용자를 생성하고 이전에 만든 IAM 정책을 연결합니다.

1. [IAM 콘솔][1]로 이동합니다.
1. 왼쪽 사이드 메뉴에서 **Users**를 선택합니다.
1. **Create user**를 클릭합니다.
1. 사용자 이름을 입력합니다.
1. **Next**를 클릭합니다.
1. **Attach policies directly**를 선택합니다.
1. 이전에 만든 IAM 정책을 선택하여 새 IAM 사용자와 연결합니다.
1. **Next**를 클릭합니다.
1. 옵션으로 태그를 추가합니다.
1. **Create user**를 클릭합니다.

새 IAM 사용자의 액세스 자격 증명을 만듭니다. 이 자격 증명을 `AWS_ACCESS_KEY` 및 `AWS_SECRET_ACCESS_KEY`로 저장합니다.

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

### IAM 인스턴스 프로필에 정책을 첨부합니다.

Terraform으로 생성된 IAM 인스턴스 프로필에 정책을 첨부합니다. 이는 `iam-role-name` 출력 아래에서 찾을 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

### S3 버킷을 Datadog 로그 아카이브에 연결하기

1. Datadog [로그 전달][4]로 이동합니다.
1. **새 아카이브 추가**를 클릭합니다.
1. 구체적인 아카이브 이름을 입력합니다.
1. 로그 파이프라인을 거치는 모든 로그를 필터링하는 쿼리를 추가하여 해당 로그가 이 아카이브로 유입되지 않도록 합니다. 예를 들어 `observability_pipelines_read_only_archive` 쿼리를 추가하면 해당 태그가 추가된 파이프라인으로 로그가 유입되지 않습니다.
1. **AWS S3**을 선택합니다.
1. 버킷이 있는 AWS 계정을 선택합니다.
1. S3 버킷 이름을 입력합니다.
1. 선택적으로 경로를 입력합니다.
1. 확인을 요구하는 문장에 체크 표시합니다.
1. 선택 사항으로 태그를 추가하고 리하이드레이션을 위한 최대 스캔 크기를 정의합니다. 자세한 내용은 [고급 설정][5]을 참조하세요.
1. **저장**을 클릭합니다.

자세한 내용은 [Log Archives 설명서][6]를 참조하세요.

## `datadog_archives` 대상 구성

[구성 파일](#config-file) 또는 [파이프라인 빌더 UI](#config-file)를 사용하여 `datadog_archives` 대상을 구성할 수 있습니다.

<div class="alert alert-warning">워커가 다음에서 오지 않는 로그를 수집하는 경우 Datadog Agent에서 오지 않고 Datadog 보관 대상으로 라우팅되는 로그를 수집하는 경우 해당 로그에는 <a href="https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#reserved-attributes">예약된 속성이</a> 태그가 지정되지 않습니다. 즉, Datadog 원격 분석 및 <a href="https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=kubernetes">통합 서비스 태깅의</a> 이점을 잃게 됩니다. 예를 들어, syslog가 <code>datadog_archives로</code> 전송되고 해당 로그의 <code>상태</code> 태그가 상태의 예약 속성 대신 <code>심각도이고</code> 호스트 태그가 호스트의 예약 속성 <code>호스트</code> 대신 <code>호스트 이름</code>이라고 가정해 보겠습니다. 이러한 로그가 Datadog에서 리하이드레이션되면 로그의 <code>상태는</code> 모두 <code>info</code>로 설정되고 로그에 호스트 이름 태그가 사라집니다.</div>

### 설정 파일

수동 배포의 경우, Datadog의 [샘플 파이프라인 구성 파일][7]에는 Datadog에서 리하이드레이션 가능한 형식으로 Amazon S3로 로그를 전송하기 위한 싱크가 포함되어 있습니다.

{{< tabs >}}
{{% tab "Docker" %}}

샘플 파이프라인 구성 파일에서 `AWS_ACCESS_KEY_ID` 및 `AWS_SECRET_ACCESS_KEY`를 앞서 만든 AWS 자격 증명으로 바꿉니다.

{{% /tab %}}
{{% tab "AWS EKS" %}}

샘플 파이프라인 구성 파일에서 `AWS_ACCESS_KEY_ID` 및 `AWS_SECRET_ACCESS_KEY`를 앞서 만든 AWS 자격 증명으로 바꿉니다.

{{% /tab %}}
{{% tab "APT-based Linux" %}}

샘플 파이프라인 구성 파일에서 `AWS_ACCESS_KEY_ID` 및 `AWS_SECRET_ACCESS_KEY`를 앞서 만든 AWS 자격 증명으로 바꿉니다.

{{% /tab %}}
{{% tab "RPM-based Linux" %}}

샘플 파이프라인 구성 파일에서 `AWS_ACCESS_KEY_ID` 및 `AWS_SECRET_ACCESS_KEY`를 앞서 만든 AWS 자격 증명으로 바꿉니다.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

S3 구성에 따라 `${DD_ARCHIVES_BUCKET}` 및 $`{DD_ARCHIVES_REGION}` 파라미터를 바꿉니다.

{{% /tab %}}
{{< /tabs >}}

### Pipeline 빌더 UI

1. [Pipeline][8]으로 이동합니다.
1. (선택 사항) 리맵 변환을 추가하여 `datadog_archives`로 이동하는 모든 로그에 태그를 지정합니다.   
  a. *Edit** 을 클릭한 다음 **Add Transforms**에서 **Add More**를 클릭합니다.
  b. **Remap** 타일을 클릭합니다.
  c. 구성 요소의 설명적 이름을 입력합니다.  
  d. **Inputs** 필드에서 이 대상을 연결할 소스를 선택합니다.  
  e. ***Source** 섹션에 `.sender = "observability_pipelines_worker"`를 추가합니다.  
  f. **Save**을 클릭합니다.  
  g. Pipeline으로 다시 이동합니다. 
1. **편집**을 클릭합니다.
1. **Add Destination** 타일에서 **Add More**를 클릭합니다.
1. **Datadog Archives** 타일을 클릭합니다.
1. 구성 요소의 설명적 이름을 입력합니다.
1. 이 대상을 연결할 소스 또는 변환을 선택합니다.

{{< tabs >}}
{{% tab "AWS S3" %}}

7. **Bucket**  필드에 앞서 만든 S3 버킷의 이름을 입력합니다.
8. **Service** 필드에 `aws_s3`을 입력합니다.
9. 해당 특정 구성 옵션을 활성화하려면 **AWS S3**를 토글합니다.
10. **Storage Class** 필드에서 드롭다운 메뉴의 스토리지 클래스를 선택합니다.
11. 사례에 따라 다른 구성 옵션을 설정하세요.
12. **저장**을 클릭합니다.

{{% /tab %}}
{{% tab "Azure Blob" %}}

7. **Bucket** 필드에 앞서 만든 S3 버킷의 이름을 입력합니다.
8. **Service** 필드에 `azure_blob`을 입력합니다.
9. 해당 특정 구성 옵션을 사용하려면 **Azure Blob**을 전환하세요.
10. Azure Blob Storage Account 연결 문자열을 입력합니다.
11. 사례에 따라 다른 구성 옵션을 설정하세요.
12. **저장**을 클릭합니다.

{{% /tab %}}
{{% tab "GCP Cloud Storage" %}}

7. **Bucket** 필드에 앞서 만든 S3 버킷의 이름을 입력합니다.
8. **Service** 필드에 `gcp_cloud_storage`을 입력합니다.
9. 특정 구성 옵션을 활성화하려면 **GCP Cloud Storage** 를 토글합니다.
10. 사례에 따라 구성 옵션을 설정하세요.
11. **저장**을 클릭합니다.

{{% /tab %}}
{{< /tabs >}}

원격 구성을 사용하는 경우에는 UI에서 Pipeline에 변경 사항을 배포합니다. 수동 구성의 경우 업데이트된 구성을 다운로드하고 Worker를 다시 시작합니다.

모든 구성 옵션에 대한 자세한 내용은 [Datadog 아카이브 참조][9]를 확인하세요.

## 아카이브 리하이드레이션

해당 로그를 분석하고 조사할 수 있도록 [아카이브에서 리하이드레이션하기][10]를 참조하여 Datadog에서 아카이브를 리하이드레이션하는 방법을 알아보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/archives/
[2]: https://s3.console.aws.amazon.com/s3/home
[3]: https://console.aws.amazon.com/iam/
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[5]: /ko/logs/log_configuration/archives/#advanced-settings
[6]: /ko/logs/log_configuration/archives
[7]: /ko/observability_pipelines/legacy/setup/datadog_with_archiving#install-the-observability-pipelines-worker
[8]: https://app.datadoghq.com/observability-pipelines/
[9]: /ko/observability_pipelines/legacy/reference/sinks/#datadogarchivessink
[10]: /ko/logs/log_configuration/rehydrating/
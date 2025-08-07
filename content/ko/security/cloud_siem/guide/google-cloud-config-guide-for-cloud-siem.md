---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: 설명서
  text: Cloud SIEM 기본 탐지 규칙 살펴보기
- link: /security/cloud_siem/investigate_security_signals
  tag: 설명서
  text: 보안 시그널 익스플로러 알아보기
- link: /security/cloud_siem/detection_rules/
  tag: 설명서
  text: 새 탐지 규칙 생성
- link: /integrations/google_cloud_platform/#log-collection
  tag: 설명서
  text: Google Cloud Platform 로그 수집하기
- link: https://www.datadoghq.com/blog/visualize-google-cloud-activity-cloud-siem-investigator/
  tag: 블로그
  text: Datadog Cloud SIEM Investigator로 Google Cloud 환경 활동 시각화
title: Cloud SIEM용 Google Cloud 구성 가이드
---

## 개요

[Datadog Cloud SIEM][1]은 Datadog에서 처리되는 모든 로그에 탐지 규칙을 적용하여 표적 공격, 위협 인텔리전스에 등록된 IP가 시스템과 통신하는 행위, 안전하지 않은 리소스 수정과 같은 위협을 탐지합니다. 이러한 위협은 Security Signals Explorer에서 Security Signals로 분류됩니다.

[Google Cloud Dataflow][2]와 [Datadog 템플릿][3]을 사용하여 Google Cloud 서비스의 로그를 Datadog으로 전달하세요. 이 가이드에서는 Google Cloud 감사 로그를 사용하여 위협을 탐지하는 방법에 대해 알아봅니다.

1. [Data Access 감사 로그를 활성화합니다](#enable-data-access-audit-logs)
1. [Google Cloud 게시/구독(Pub/Sub) 토픽과 풀 구독을 만들어](#create-a-google-cloud-publishsubscription-pubsub-system) 구성된 로그 싱크에서 로그를 받습니다
1. [사용자 정의 Dataflow 작업자 서비스 계정을 만듭니다](#create-a-custom-dataflow-worker-service-account)
1. [Pub/Sub에 로그를 게시하기 위해 로그 싱크를 만듭니다](#create-a-log-sink-to-publish-logs-to-the-pubsub)
1. [Dataflow 작업을 만들고 실행합니다](#create-and-run-the-dataflow-job)
1. [Cloud SIEM을 사용하여 Security Signals를 분류합니다](#use-cloud-siem-to-triage-security-signals)

<div class="alert alert-danger">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Pub/Sub Push 구독을 통한 Google Cloud 로그 수집 기능은</a> 다음과 같은 이유로 더 이상 지원되지 않습니다.

- Google Cloud VPC가 있는 경우 Push 구독은 VPC 외부의 엔드포인트에 액세스할 수 없습니다.
- Push 구독은 이벤트 압축이나 일괄 처리를 제공하지 않으므로 소량의 로그에만 적합합니다.

<strong>Push</strong> 구독 관련 문서는 기존 설정 문제 해결 또는 편집을 위해서만 유지됩니다. <strong>Pull</strong> 구독과 Datadog Dataflow 템플릿을 함께 사용하여 Google Cloud 로그를 Datadog으로 전달하세요.
</div>

## Data Access 감사 로그 활성화

1. IAM & Admin Console > [Audit Log][4]로 이동합니다.
1. 데이터 액세스 로그를 활성화할 서비스를 선택합니다.
1. **Log Types** 패널에서 **Admin Read**, **Data Read**, **Data Write**를 활성화합니다.
1. **저장**을 클릭합니다.

### 새 서비스에 대한 기본 구성 변경

새로운 Google Cloud 서비스가 추가되면 [기본 감사 구성][5]이 적용됩니다.

새로운 Google Cloud 서비스에 대한 Data Access 감사 로그를 캡처하려면 기본 감사 구성을 수정하세요.

1. **IAM & Admin Console > [Audit Log][4]**로 이동합니다.
1. **Admin Read**, **Data Read**, **Data Write**를 활성화합니다.
1. **저장**을 클릭합니다.

## Google Cloud 게시/구독(Pub/Sub) 시스템 만들기

1. Pub/Sub > [Topics][5]로 이동합니다.
1. **Create Topic**을 클릭합니다.
1. 토픽을 설명하는 이름을 입력합니다. (예: `export-audit-logs-to-datadog`)
1. **Add a default subscription**이 선택된 상태로 두면 기본 구성 값을 갖는 구독이 생성됩니다. 구독 이름은 토픽 이름에 "-sub"가 추가된 형태로 자동 생성됩니다. 이 구독 이름은 나중에 [Dataflow 작업](#create-and-run-the-dataflow-job)을 생성할 때 사용됩니다.
1. **생성**을 클릭합니다.

### outputDeadletterTopic 파라미터에 대한 추가 토픽 및 구독 생성
Datadog API에서 거부된 로그 메시지를 처리하기 위한 추가 토픽과 기본 구독을 생성합니다. 이 토픽은 나중에 [Dataflow 작업](#create-and-run-the-dataflow-job)을 설정할 때 사용됩니다.

1. Pub/Sub > [Topics][5]로 다시 이동합니다.
1. **Create Topic**을 클릭합니다.
1. 토픽을 설명하는 이름을 입력합니다.
1. **Add a default subscription**을 선택된 상태로 둡니다.
1. **생성**을 클릭합니다.

**경고**: Pub/Sub에는 [Google Cloud 할당량 및 제한 사항][6]이 적용됩니다. 로그 수가 이러한 제한을 초과하는 경우, Datadog은 로그를 여러 토픽으로 분할할 것을 권장합니다. 이러한 제한에 가까워질 때 알림을 보내는 모니터를 설정하려면 [로그 전달 모니터링][7]을 참고하세요.

### Secret Manager에서 시크릿 만들기

Datadog은 유효한 Datadog API 키 값을 사용하여 [Secret Manager][8]에서 시크릿을 생성할 것을 권장합니다. 이 시크릿은 나중에 [Dataflow 작업](#create-and-run-the-dataflow-job)을 설정할 때 사용됩니다.

1. Security > [Secret Manager][8]로 이동합니다.
1. **Create Secret**을 클릭합니다.
1. 시크릿 이름을 입력합니다.
1. [Datadog API 키][9]를 복사하여 **Secret value** 섹션에 붙여넣습니다.
1. 필요에 따라 다른 구성을 설정합니다.
1. **Create Secret**을 클릭합니다.

## 사용자 정의 Dataflow 작업자 서비스 계정 만들기

Dataflow 파이프라인 작업자는 기본적으로 프로젝트의 [Compute Engine 기본 서비스 계정][10]을 사용하며, 이 계정은 프로젝트의 모든 리소스에 대한 권한을 부여합니다. 운영 환경에서 로그를 전달하는 경우, 필요한 역할과 권한만 포함된 사용자 정의 작업자 서비스 계정을 만들고 이 서비스 계정을 Dataflow 파이프라인 작업자에 할당하세요.

**참고**: Dataflow 파이프라인 작업자용 사용자 지정 서비스 계정을 만들지 않는 경우 기본 Compute Engine 서비스 계정에 아래의 [필수 권한](#required-permissions)이 있는지 확인하세요.

1. Google Cloud의 [Service Account][11] 페이지로 이동합니다.
1. 프로젝트를 선택합니다.
1. **Create Service Account**를 클릭합니다.
1. 서비스 계정을 설명하는 이름을 입력합니다.
1. **Create and Continue**를 클릭합니다.
1. 다음 역할을 추가합니다.
    ##### 필수 권한
    | 역할 | 경로 | 설명 |
    | -------------  | ----------- | ----------- |
    | [Dataflow Admin][12] | `roles/dataflow.admin` |  이 서비스 계정이 Dataflow 관리 작업을 하도록 허용합니다.
    | [Dataflow Worker][13] | `roles/dataflow.worker` |  이 서비스 계정이 Dataflow 작업을 하도록 허용합니다.
    | [Pub/Sub Viewer][14] | `roles/pubsub.viewer` | 이 서비스 계정이 Google Cloud 로그를 통해 Pub/Sub 구독 메시지를 볼 수 있도록 허용합니다.
    | [Pub/Sub Subscriber][15] | `roles/pubsub.subscriber` | 이 서비스 계정이 Google Cloud 로그를 통해 Pub/Sub 구독 메시지를 사용하도록 허용합니다.
    | [Pub/Sub Publisher][16] | `roles/pubsub.publisher` | 이 서비스 계정이 실패한 메시지를 별도의 구독에 게시하도록 허용합니다. 이를 통해 로그를 분석하거나 다시 보낼 수 있습니다.
    | [Secret Manager Secret Accessor][17] | `roles/secretmanager.secretAccessor` | 이 서비스 계정이 Secret Manager에서 Datadog API 키에 액세스하도록 허용합니다.
    | [Storage Object Admin][18] | `roles/storage.objectAdmin` | 이 서비스 계정이 스테이징 파일용으로 지정된 Cloud Storage 버킷을 읽고 쓸 수 있도록 허용합니다.
7. **Continue**를 클릭합니다.
8. **Done**을 클릭합니다.

##  Pub/Sub에 로그를 게시할 로그 싱크 만들기

1. Google Cloud의 [Logs Explorer][19]로 이동합니다.
1. 왼쪽 사이드 메뉴에서 **Log Router**를 선택합니다.
1. **Create Sink**를 클릭합니다.
1. 싱크를 설명하는 이름을 입력합니다.
1. **Next**를 클릭합니다.
1. **Select Sink Service** 드롭다운 메뉴에서 **Cloud Pub/Sub topic**을 선택합니다.
    **참고**: Cloud Pub/Sub 토픽은 다른 프로젝트에 위치할 수 있습니다.
1. **Select a Cloud Pub/Sub topic**에서 앞서 만든 Pub/Sub를 선택합니다.
1. **Next**를 클릭합니다.
1. Datadog에 전송하려는 로그 포함 필터를 입력합니다.
1. **Next**를 클릭합니다.
1. (선택 사항) Datadog에 전송하고 싶지 않은 로그를 제외하려면 제외 필터를 입력하세요.
1. **Create Sink**를 클릭합니다.

**참고**: Google Cloud Logging에서 서로 다른 싱크를 사용하여 동일한 Pub/Sub 토픽으로 여러 개의 내보내기를 생성할 수 있습니다.

## Dataflow 작업 생성 및 실행

1. Google Cloud [Dataflow][20]로 이동합니다.
1. **Create job from template**을 클릭합니다.
1. 작업 이름을 입력합니다.
1. 지역 엔드포인트를 선택합니다.
1. **Dataflow template** 드롭다운 메뉴에서 **Pub/Sub to Datadog**을 선택합니다.
1. **Required Parameters** 섹션에서 다음을 실행합니다.
      a. **Pub/Sub input subscription** 드롭다운 메뉴에서 새 [Pub/Sub 시스템](#create-a-google-cloud-publishsubscription-pubsub-system)을 생성할 때 앞서 만든 기본 구독을 선택합니다.
      b. **Datadog Logs API URL** 필드에 다음을 입력합니다.
      ```
      https://{{< region-param key="http_endpoint" code="true" >}}
      ```
      **참고**: 위의 URL을 복사하기 전에 이 문서 페이지 오른쪽에 있는 Datadog 사이트 셀렉터가 해당 Datadog 사이트로 설정되어 있는지 확인하세요.
      c. **Output deadletter Pub/Sub topic** 필드에서 Datadog API에서 거부된 메시지를 수신하기 위해 이전에 만든 [추가 토픽](#create-an-additional-topic-and-subscription-for-outputdeadlettertopic)을 선택합니다.
      d. **Temporary location** 필드에서 저장소 버킷의 임시 파일 경로를 지정합니다.
1. 이전에 Datadog API 키 값에 대한 [시크릿을 Secret Manager에서 생성한](#create-a-secret-in-secret-manager) 경우:
    a. 추가 필드를 보려면 **Optional Parameters**를 클릭합니다.
    b. **Google Cloud Secret Manager ID** 필드에 시크릿의 리소스 이름을 입력합니다. 
        리소스 이름을 확인하려면 [Secret Manager][8]에서 해당 시크릿으로 이동한 다음 시크릿을 클릭합니다. **Action** 아래에 있는 세 개의 점을 클릭하고 **Copy resource name**을 선택합니다.
    c. **Source of the API key passed** 필드에서 `SECRET_MANAGER`를 입력합니다.
1. Datadog API 키 값에 시크릿을 사용하지 않는 경우:
    - **권장**:
        - `Source of API key passed`를 `KMS`로 설정합니다.
        - `Google Cloud KMS key for the API key`를 해당 Cloud KMS 키 ID로 설정합니다.
        - `Logs API Key`를 암호화된 API 키로 설정합니다.
    - **권장하지 않음*: `Source of API key passed`를 `PLAINTEXT`로 설정하고, `Logs API Key`를  일반 텍스트 API 키로 설정.
1. 사용 가능한 다른 옵션에 관한 자세한 내용은 Dataflow 템플릿의 [템플릿 파라미터][21]를 참고하세요.
1. 사용자 지정 작업자 서비스 계정을 만들었다면 **Service account email** 드롭다운 메뉴에서 해당 계정을 선택합니다.
1. **Run Job**을 클릭합니다.

[Datadog Log Explorer][22]에서 Cloud Pub/Sub 토픽에 전달된 새로운 로깅 이벤트를 확인합니다.

## Cloud SIEM로 보안 신호 분류

Cloud SIEM은 방금 설정한 Google Cloud 감사 로그를 포함하여 처리된 모든 로그에 기본 탐지 규칙을 적용합니다. 탐지 규칙을 통해 위협이 탐지되면 Security Signal이 생성되고, Security Signals Explorer에서 확인할 수 있습니다.

- [Cloud SIEM Signals Explorer][23]로 이동하여 위협을 확인하고 분류하세요. 자세한 내용은 Security Signals Explorer를 참고하세요.
- [Google Cloud Audit Log 대시보드][24]를 사용하여 비정상적인 활동을 조사할 수도 있습니다.
- 로그에 적용되는 [기본 탐지 규칙][25]을 확인하세요.
- 특정 사용 사례와 일치하는 위협을 탐지하기 위해 [새로운 규칙][26]을 만듭니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/
[2]: https://cloud.google.com/dataflow?hl=en
[3]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[4]: https://console.cloud.google.com/iam-admin/audit
[5]: https://console.cloud.google.com/cloudpubsub/topic
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: /ko/integrations/google_cloud_platform/#monitor-the-cloud-pubsub-log-forwarding
[8]: https://console.cloud.google.com/security/secret-manager
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://cloud.google.com/compute/docs/access/service-accounts#default_service_account
[11]: https://console.cloud.google.com/iam-admin/serviceaccounts
[12]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.admin
[13]: https://cloud.google.com/dataflow/docs/concepts/access-control#dataflow.worker
[14]: https://cloud.google.com/pubsub/docs/access-control#pubsub.viewer
[15]: https://cloud.google.com/pubsub/docs/access-control#pubsub.subscriber
[16]: https://cloud.google.com/pubsub/docs/access-control#pubsub.publisher
[17]: https://cloud.google.com/secret-manager/docs/access-control#secretmanager.secretAccessor
[18]: https://cloud.google.com/storage/docs/access-control/iam-roles/
[19]: https://console.cloud.google.com/logs/
[20]: https://console.cloud.google.com/dataflow/
[21]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog#template-parameters
[22]: https://app.datadoghq.com/logs/
[23]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc&product=siem
[24]: https://app.datadoghq.com/dash/integration/30509/google-cloud-audit-log
[25]: /ko/security/default_rules/#cat-cloud-siem
[26]: /ko/security/detection_rules/
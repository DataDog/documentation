---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: 설명서
  text: Cloud SIEM 기본 탐지 규칙 살펴보기
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: 설명서
  text: 보안 신호 탐색기 알아보기
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: 설명서
  text: 사용자 지정 탐지 규칙 생성
- link: /integrations/google_cloud_platform/#log-collection
  tag: 설명서
  text: Google Cloud Platform 로그 수집하기
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: 블로그
  text: Datadog으로 Google Cloud AI 스택 평가, 최적화 및 보안 강화
- link: https://www.datadoghq.com/blog/visualize-google-cloud-activity-cloud-siem-investigator/
  tag: 블로그
  text: Datadog Cloud SIEM Investigator로 Google Cloud 환경 활동 시각화
title: Cloud SIEM용 Google Cloud 구성 가이드
---
## 개요 {#overview}

[Datadog Cloud SIEM][1]은 Datadog에서 처리된 모든 로그에 탐지 규칙을 적용하여 표적 공격, 시스템과 통신하는 위협 인텔리전스 목록의 IP, 안전하지 않은 리소스 변경과 같은 위협을 탐지합니다. 탐지된 위협은 분류할 수 있도록 Security Signals Explorer에 보안 신호로 표시됩니다.

[Google Cloud Dataflow][2]와 [Datadog 템플릿][3]을 사용하여 Google Cloud 서비스에서 Datadog으로 로그를 전달합니다. 이 가이드에서는 Google Cloud 감사 로그를 사용하여 위협 탐지를 시작할 수 있도록 다음 단계를 안내합니다.

1. [Data Access 감사 로그 활성화](#enable-data-access-audit-logs)
1. [구성된 로그 싱크에서 로그를 수신하기 위해 Google Cloud 게시/구독(Pub/Sub) 주제와 풀 구독을 생성](#create-a-google-cloud-publishsubscription-pubsub-system)
1. [사용자 지정 Dataflow 작업자 서비스 계정 생성](#create-a-custom-dataflow-worker-service-account)
1. [Pub/Sub에 로그를 게시할 로그 싱크 생성](#create-a-log-sink-to-publish-logs-to-the-pubsub)
1. [Dataflow 작업 생성 및 실행](#create-and-run-the-dataflow-job)
1. [Cloud SIEM을 사용하여 보안 신호 분류](#use-cloud-siem-to-triage-security-signals)

<div class="alert alert-warning">

<a href="https://docs.datadoghq.com/logs/guide/collect-google-cloud-logs-with-push/" target="_blank">Pub/Sub Push 구독을 통한 Google Cloud 로그 수집</a>은 다음과 같은 사유로 지원 중단 절차를 밟고 있습니다.

- Google Cloud VPC가 있는 경우, Push 구독은 VPC 외부의 엔드포인트에 액세스할 수 없습니다.
- Push 구독은 이벤트 압축이나 일괄 처리를 제공하지 않으므로 로그 볼륨이 적은 경우에만 적합합니다.

<strong>Push</strong> 구독에 대한 문서는 문제 해결 또는 레거시 설정 수정 목적으로만 유지 관리됩니다. 대신 <strong>Pull</strong> 구독과 Datadog Dataflow 템플릿을 사용하여 Google Cloud 로그를 Datadog으로 전달합니다.
</div>

## Data Access 감사 로그 활성화 {#enable-data-access-audit-logs}

1. IAM & Admin Console > [Audit Log][4]로 이동합니다.
1. 데이터 액세스 로그를 활성화할 서비스를 선택합니다.
1. **Log Types** 패널에서 {{< ui >}}Admin Read{{< /ui >}}, {{< ui >}}Data Read{{< /ui >}}, {{< ui >}}Data Write{{< /ui >}}를 활성화합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

### 새 서비스에 대한 기본 구성 변경 {#change-default-configuration-for-new-services}

새로운 Google Cloud 서비스가 추가되면 [기본 감사 구성][5]이 적용됩니다.

새로운 Google Cloud 서비스에 대한 Data Access 감사 로그를 캡처하려면 기본 감사 구성을 수정하세요.

1. **IAM & Admin Console > [Audit Log][4]**로 이동합니다.
1. {{< ui >}}Admin Read{{< /ui >}}, {{< ui >}}Data Read{{< /ui >}} 및 {{< ui >}}Data Write{{< /ui >}}를 활성화합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## Google Cloud 게시/구독(Pub/Sub) 시스템 생성 {#create-a-google-cloud-publishsubscription-pubsub-system}

1. Pub/Sub > [Topics][5]로 이동합니다.
1. {{< ui >}}Create Topic{{< /ui >}}을 클릭합니다.
1. 토픽을 설명하는 이름을 입력합니다. 예를 들어, `export-audit-logs-to-datadog`입니다.
1. 기본 구성 값으로 구독이 생성되도록 **Add a default subscription**을 선택된 상태로 둡니다. 구독 이름은 토픽 이름 뒤에 '-sub'가 추가된 형태로 자동 생성됩니다. 이 구독 이름은 나중에 [Dataflow 작업](#create-and-run-the-dataflow-job)을 생성할 때 사용됩니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

### outputDeadletterTopic 파라미터에 대한 추가 토픽 및 구독 생성 {#create-an-additional-topic-and-subscription-for-outputdeadlettertopic-parameter}
Datadog API에서 거부된 로그 메시지를 처리하기 위해 추가 토픽 및 기본 구독을 생성합니다. 이 토픽은 나중에 [Dataflow 작업](#create-and-run-the-dataflow-job)을 설정할 때 사용됩니다.

1. Pub/Sub > [Topics][5]로 다시 이동합니다.
1. {{< ui >}}Create Topic{{< /ui >}}을 클릭합니다.
1. 토픽을 설명하는 이름을 입력합니다.
1. **Add a default subscription**을 선택된 상태로 둡니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

**경고**: Pub/sub은 [Google Cloud 할당량 및 제한][6]의 적용을 받습니다. 로그 수가 이러한 제한보다 많으면 Datadog은 여러 토픽에 걸쳐 로그를 분할할 것을 권장합니다. 해당 제한에 가까워졌을 때 알림을 받도록 모니터를 설정하는 방법은 [로그 포워딩 모니터링][7]을 참조하세요.

### Secret Manager에서 시크릿 생성 {#create-a-secret-in-secret-manager}

Datadog은 유효한 Datadog API 키 값을 사용하여 [Secret Manager][8]에 시크릿을 생성할 것을 권장합니다. 이 시크릿은 나중에 [Dataflow 작업](#create-and-run-the-dataflow-job)을 설정할 때 사용됩니다.

1. Security > [Secret Manager][8]로 이동합니다.
1. {{< ui >}}Create Secret{{< /ui >}}를 클릭합니다.
1. 시크릿 이름을 입력합니다.
1. [Datadog API 키][9]를 복사하여 **Secret value** 섹션에 붙여넣습니다.
1. 필요시 사용 사례에 맞게 다른 구성도 설정합니다.
1. {{< ui >}}Create Secret{{< /ui >}}를 클릭합니다.

## 사용자 지정 Dataflow 작업자 서비스 계정 생성 {#create-a-custom-dataflow-worker-service-account}

Dataflow 파이프라인 작업자의 기본 동작은 프로젝트의 [Compute Engine 기본 서비스 계정][10]을 사용하는 것이며, 이 계정은 프로젝트의 모든 리소스에 대한 권한을 부여합니다. 프로덕션 환경에서 로그를 전달하는 경우 필요한 역할과 권한만 있는 사용자 지정 작업자 서비스 계정을 생성하고 이 서비스 계정을 Dataflow 파이프라인 작업자에 할당합니다.

**참고**: Dataflow 파이프라인 작업자용 사용자 지정 서비스 계정을 생성하지 않는 경우 기본 Compute Engine 서비스 계정에 아래의 [필수 권한](#required-permissions)이 있는지 확인합니다.

1. Google Cloud의 [서비스 계정][11] 페이지로 이동합니다.
1. 프로젝트를 선택합니다.
1. {{< ui >}}Create Service Account{{< /ui >}}를 클릭합니다.
1. 서비스 계정을 설명하는 이름을 입력합니다.
1. {{< ui >}}Create and Continue{{< /ui >}}를 클릭합니다.
1. 다음 역할을 추가합니다.
##### 필수 권한
    | 역할 | 경로 | 설명 |
    | -------------  | ----------- | ----------- |
    | [Dataflow Admin][12] | `roles/dataflow.admin` |  이 서비스 계정이 Dataflow 관리 작업을 수행하도록 허용합니다.
    | [Dataflow Worker][13] | `roles/dataflow.worker` |  이 서비스 계정이 Dataflow 작업을 수행하도록 허용합니다.
    | [Pub/Sub Viewer][14] | `roles/pubsub.viewer` | 이 서비스 계정이 Google Cloud 로그가 포함된 Pub/Sub 구독의 메시지를 조회하도록 허용합니다.
    | [Pub/Sub Subscriber][15] | `roles/pubsub.subscriber` | 이 서비스 계정이 Google Cloud 로그가 포함된 Pub/Sub 구독의 메시지를 소비하도록 허용합니다.
    | [Pub/Sub Publisher][16] | `roles/pubsub.publisher` | 이 서비스 계정이 실패한 메시지를 별도의 구독에 게시하도록 허용합니다. 이를 통해 로그를 분석하거나 다시 보낼 수 있습니다.
    | [Secret Manager Secret Accessor][17] | `roles/secretmanager.secretAccessor` | 이 서비스 계정이 Secret Manager에서 Datadog API 키에 액세스하도록 허용합니다.
    | [Storage Object Admin][18] | `roles/storage.objectAdmin` | 이 서비스 계정이 스테이징 파일용으로 지정된 Cloud Storage 버킷을 읽고 쓸 수 있도록 허용합니다 |
7. {{< ui >}}Continue{{< /ui >}}를 클릭합니다.
8. {{< ui >}}Done{{< /ui >}}을 클릭합니다.

##  Pub/Sub에 로그를 게시할 로그 싱크 생성 {#create-a-log-sink-to-publish-logs-to-the-pubsub}

1. Google Cloud의 [Logs Explorer][19]로 이동합니다.
1. 왼쪽 사이드 메뉴에서 {{< ui >}}Log Router{{< /ui >}}를 선택합니다.
1. {{< ui >}}Create Sink{{< /ui >}}를 클릭합니다.
1. 싱크를 설명하는 이름을 입력합니다.
1. {{< ui >}}Next{{< /ui >}}를 클릭합니다.
1. **Select Sink Service** 드롭다운 메뉴에서 {{< ui >}}Cloud Pub/Sub topic{{< /ui >}}을 선택합니다.
    **참고**: Cloud Pub/Sub 토픽은 다른 프로젝트에 위치할 수 있습니다.
1. **Select a Cloud Pub/Sub topic**에서 앞서 만든 Pub/Sub 토픽을 선택합니다.
1. {{< ui >}}Next{{< /ui >}}를 클릭합니다.
1. Datadog에 전송하려는 로그의 포함 필터를 입력합니다.
1. {{< ui >}}Next{{< /ui >}}를 클릭합니다.
1. 필요시 Datadog에 전송하지 않을 로그를 지정하는 제외 필터를 입력합니다.
1. {{< ui >}}Create Sink{{< /ui >}}를 클릭합니다.

**참고**: Google Cloud Logging에서 서로 다른 싱크를 사용하여 동일한 Pub/Sub 토픽으로 여러 개의 내보내기를 생성할 수 있습니다.

## Dataflow 작업 생성 및 실행 {#create-and-run-the-dataflow-job}

1. Google Cloud [Dataflow][20]로 이동합니다.
1. {{< ui >}}Create job from template{{< /ui >}}을 클릭합니다.
1. 작업 이름을 입력합니다.
1. 지역 엔드포인트를 선택합니다.
1. **Dataflow template** 드롭다운 메뉴에서 {{< ui >}}Pub/Sub to Datadog{{< /ui >}}을 선택합니다.
1. **Required Parameters** 섹션에서 다음을 설정합니다.
   1. **Pub/Sub input subscription** 드롭다운 메뉴에서 앞서 새 [Pub/Sub system](#create-a-google-cloud-publishsubscription-pubsub-system)을 생성할 때 만들어진 기본 구독을 선택합니다.
   1. **Datadog Logs API URL** 필드에 다음을 입력합니다.
      ```
      https://{{< region-param key="http_endpoint" code="true" >}}
      ```
      **Note**: Ensure that the Datadog site selector on the right of this documentation page is set to your Datadog site before copying the URL above.
   1. **Output deadletter Pub/Sub topic** 필드에서 Datadog API가 거부한 메시지를 수신하기 위해 앞서 생성한 [추가 토픽](#create-an-additional-topic-and-subscription-for-outputdeadlettertopic)을 선택합니다.
   1. **Temporary location** 필드에 스토리지 버킷의 임시 파일 경로를 지정합니다.
1. 이전에 Datadog API 키 값에 대한 [시크릿을 Secret Manager에서 생성한](#create-a-secret-in-secret-manager) 경우 다음 단계를 따르세요.
   1. 추가 필드를 확인하려면 {{< ui >}}Optional Parameters{{< /ui >}}를 클릭합니다.
   1. **Google Cloud Secret Manager ID** 필드에 시크릿의 리소스 이름을 입력합니다.<br />
      리소스 이름을 확인하려면 [Secret Manager][8]에서 해당 시크릿으로 이동합니다. 시크릿을 클릭합니다. **Action** 아래의 점 3개를 클릭한 다음 {{< ui >}}Copy resource name{{< /ui >}}을 선택합니다.
   1. **Source of the API key passed** 필드에 `SECRET_MANAGER`를 입력합니다.
1. Datadog API 키 값에 시크릿을 사용하지 않는 경우:
    - **권장**:
        - `Source of API key passed`를 `KMS`로 설정합니다.
        - `Google Cloud KMS  key for the API key`를 Cloud KMS 키 ID로 설정합니다.
        - `Logs API Key`를 암호화된 API 키로 설정합니다.
    - **권장하지 않음**: `Source of API key passed`를 `PLAINTEXT`로 설정하고 `Logs API Key`를 일반 텍스트 API 키로 설정합니다.
1. 사용 가능한 다른 옵션에 관한 자세한 내용은 Dataflow 템플릿의 [Template parameters][21]를 참조하세요.
1. 사용자 지정 작업자 서비스 계정을 생성했다면 **Service account email** 드롭다운 메뉴에서 해당 계정을 선택합니다.
1. {{< ui >}}Run Job{{< /ui >}}을 클릭합니다.

[Datadog Log Explorer][22]에서 Cloud Pub/Sub 토픽에 전달된 새로운 로깅 이벤트를 확인합니다.

## Cloud SIEM을 사용하여 보안 신호 분류 {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM은 방금 설정한 Google Cloud 감사 로그를 포함하여 처리된 모든 로그에 기본 제공 탐지 규칙을 적용합니다. 탐지 규칙으로 위협이 탐지되면 보안 신호가 생성되며 Security Signals Explorer에서 확인할 수 있습니다.

- [Cloud SIEM Signals Explorer][23]로 이동하여 위협을 확인하고 분류합니다. 자세한 내용은 Security Signals Explorer를 참조하세요.
- [Google Cloud Audit Log dashboard][24]를 사용하여 비정상적인 활동을 조사할 수도 있습니다.
- 로그에 적용되는 [기본 제공 탐지 규칙][25]을 확인합니다.
- 특정 사용 사례에 해당하는 위협을 탐지하는 [새 규칙][26]을 생성합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_siem/
[2]: https://cloud.google.com/dataflow?hl=en
[3]: https://cloud.google.com/dataflow/docs/guides/templates/provided/pubsub-to-datadog
[4]: https://console.cloud.google.com/iam-admin/audit
[5]: https://console.cloud.google.com/cloudpubsub/topic
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: /ko/logs/guide/google-cloud-log-forwarding/#monitor-the-cloud-pubsub-log-forwarding
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
[23]: https://app.datadoghq.com/security/siem/signals?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc
[24]: https://app.datadoghq.com/dash/integration/30509/google-cloud-audit-log
[25]: /ko/security/default_rules/#cat-cloud-siem
[26]: /ko/security/detection_rules/
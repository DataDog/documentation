---
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/explorer/#visualize
  tag: 설명서
  text: 로그 분석 실행하기
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
kind: 설명서
title: Pub/Sub Push 구독으로 Google Cloud 로그 수집
---

<div class="alert alert-danger">
이 페이지에서는 레거시 Pub/Sub Push 구독과 관련된 구성 정보와 함께 지원 중단된 기능을 다루고 있어 레거시 설정 문제를 해결하거나 수정하는 데 유용합니다. Datadog Dataflow 템플릿과 함께 <strong>Pull</strong> 구독을 사용하여 Google Cloud 로그를 Datadog에 전달합니다. 자세한 내용은 Google Cloud 통합 페이지의 <a href="https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection" target="_blank">로그 수집</a>을 참조하세요.
</div>

## 개요

이 가이드에서는 [Google Cloud Pub/Sub][1] 주제에 대한 **Push** 구독을 통해 Google Cloud 서비스의 로그를 Datadog으로 전달하는 방법을 설명합니다.

GCE 또는 GKE에서 실행되는 애플리케이션에서 로그를 수집하려면 [Datadog Agent][2]를 사용할 수도 있습니다.

**참고**: Google Cloud 환경에 [Google Cloud VPC][3]가 있는 경우 **Push** 구독은 VPC 외부 엔드포인트에 액세스할 수 없습니다.

## 설정

### 전제 조건

[Google Cloud Platform 통합][4]이 성공적으로 설치되었습니다.

### Cloud Pub/Sub 주제 생성

1. [Cloud Pub/Sub 콘솔][5]로 이동하여 새 주제를 만듭니다.

    {{< img src="integrations/google_cloud_platform/create_topic_no_default_sub.png" alt="기본 구독 없이 주제 만들기" style="width:80%;">}}

2. 해당 주제에 `export-logs-to-datadog`과 같은 명시적인 이름을 지정하고 **Create**를 클릭합니다.

**경고**: Pub/Sub에는 [Google Cloud 할당량 및 제한사항][6]이 적용됩니다. 보유한 로그 수가 해당 제한보다 높은 경우 Datadog에서는 로그를 여러 주제로 분할할 것을 권장합니다. 해당 제한에 도달하는 경우 모니터 알림 설정에 대한 자세한 내용은 [Log Forwarding 모니터링 섹션](#monitor-the-log-forwarding)을 참조하세요.

### Cloud Pub/Sub 구독을 통해 Datadog에 로그 전달

1. [Cloud Pub/Sub 콘솔][5]의 왼쪽 탐색 메뉴에서  **Subscriptions**을 선택한 후 **Create Subscription**을 클릭합니다.
2. 구독 ID를 생성하고 이전에 생성한 주제를 선택합니다.
3. `Push` 메서드를 선택하고 다음 명령을 입력하여 `<DATADOG_API_KEY>`를 유효한 [Datadog API 키][7] 값으로 바꿉니다.
```
https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&dd-protocol=gcp
```
**참고**: 위 명령을 복사하기 전에 페이지 오른쪽의 `Datadog site` 선택기가 [Datadog 사이트][8]로 설정되어 있는지 확인하세요.

4. **Subscription expiration**, **Acknowledgment deadline**, **Message retention duration**, **Dead lettering**과 같은 추가 옵션을 설정합니다.
5.  **Retry policy**에서 **Retry after exponential backoff delay**를 선택합니다.
6. 하단의 **Create** 버튼을 클릭합니다.

Pub/Sub는 Google Cloud Logging에서 로그를 수신하여 Datadog에 전달할 준비가 되었습니다.

### Google Cloud에서 로그 내보내기

1. [Google Cloud Logs Explorer 페이지][9]로 이동하여 내보내야 하는 로그를 필터링하세요.
2. **Log Router** 탭에서 **Create Sink**를 선택합니다.
3. 싱크의 이름을 제공합니다.
4. **Cloud Pub/Sub**를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub를 선택합니다.
   **참고**: Pub/Sub는 다른 프로젝트에 있을 수 있습니다.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Export Google Cloud Pub/Sub Logs to Pub Sub" >}}

5. **Create Sink**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

**참고**: Google Cloud Logging에서 서로 다른 싱크가 있는 동일한 Pub/Sub로 여러 내보내기를 만들 수 있습니다.

## 로그 포워딩 모니터링

Pub/Sub에는 [Google Cloud 할당량 및 제한사항][6]이 적용됩니다. 보유한 로그 수가 해당 제한보다 높은 경우 Datadog에서는 다양한 필터를 사용하여 로그를 여러 주제로 분할할 것을 권장합니다.

이 할당량에 도달했을 때 자동으로 알림을 받으려면 [Pub/Sub 메트릭 통합][10]을 활성화하고 메트릭 `gcp.pubsub.subscription.num_outstanding_messages`에 모니터를 설정하세요. 아래 예에 따라 로그를 Datadog으로 내보내는 구독에서 이 모니터를 필터링하여 1000을 초과하지 않도록 합니다.

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring-v2.png" alt="Pub Sub 모니터링" style="width:80%;">}}

### 샘플링 로그

(선택 사항) [샘플 함수][11]를 사용하여 쿼리하는 동안 로그를 샘플링할 수 있습니다. 예를 들어 로그의 10%만 포함하려면 `sample(insertId, 0.1)`을 사용합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/pubsub/docs/overview
[2]: /ko/agent/
[3]: https://cloud.google.com/vpc
[4]: /ko/integrations/google_cloud_platform/#installation
[5]: https://console.cloud.google.com/cloudpubsub/topicList
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[8]: /ko/getting_started/site/
[9]: https://console.cloud.google.com/logs/viewer
[10]: https://docs.datadoghq.com/ko/integrations/google_cloud_pubsub/
[11]: https://cloud.google.com/logging/docs/view/logging-query-language#sample
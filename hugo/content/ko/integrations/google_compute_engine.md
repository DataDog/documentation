---
categories:
- cloud
- configuration & deployment
- google cloud
- log collection
- network
- os & system
custom_kind: 통합
dependencies: []
description: 사용 중인 인스턴스를 추적하고 계정 사용량 메트릭을 할당 제한량과 비교합니다.
doc_link: https://docs.datadoghq.com/integrations/google_compute_engine/
draft: false
git_integration_title: google_compute_engine
has_logo: true
integration_id: google-compute-engine
integration_title: Google Compute Engine
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_compute_engine
public_title: Datadog-Google Compute Engine 통합
short_description: 사용 중인 인스턴스를 추적하고 계정 사용량 메트릭 을 할당 제한량과 비교합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Google Cloud Compute Engine은 Google의 혁신적인 데이터 센터와 전 세계 파이버 네트워크에서 실행되는 가상 머신을 제공해 드립니다.

Google Compute Engine 메트릭을 수집하면 다음을 할 수 있습니다.

- Compute Engine 성능을 시각화합니다.
- Compute Engine 성능과 애플리케이션의 상관 관계를 파악합니다.

## 설정

### 메트릭 수집

#### 설치

아직 설치하지 않았다면 먼저 [Google 클라우드 플랫폼 통합][1]을 설정합니다. 그 외 다른 설치가 필요하지 않습니다.

#### 설정

커스텀 Compute Engine 레이블을 태그로 수집하려면 클라우드 에셋 인벤토리 권한을 활성화합니다.

### 로그 수집

Google Compute Engine 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][2]하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Compute Engine 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지][3]로 이동해 Google Compute Engine 로그를 필터링하세요.
2. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub Sub로 내보내기" >}}

4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

### 설정

#### 호스트 수집 제한

Datadog을 사용하여 GCE 인스턴스의 하위 집합을 모니터링하려면 해당 GCE 인스턴스에 `datadog:true` 등의 GCE 레이블을 할당합니다. 그 다음 [Datadog GCP 통합 타일][4]에서 **선택적으로 메트릭 수집 제한** 텍스트 상자의 태그를 지정합니다. 태그를 설정하여 가상 머신을 필터링하는 방법에 대한 자세한 내용을 확인하려면 [Google Cloud Platform 통합 문서][5]를 참조하세요.

#### GCE 자동 음소거

Datadog는 GCE API의 호스트 상태에 따라 GCE 오토스케일링으로 트리거된 Google Compute Engine(GCE) 인스턴스의 수동 종료 및 인스턴스 종료와 관련된 모니터링을 사전 음소거할 수 있습니다. **자동 음소거된 호스트 표시**를 체크하여 자동 음소거된 GCE 인스턴스를 [다운타임 모니터링][6] 페이지에 목록화됩니다.

예상되는 GCE 인스턴스 종료에 대한 모니터링을 음소거하려면 [Google Cloud Platform 통합 타일][1]의 **GCE 자동 음소거**란에 체크합니다.

{{< img src="integrations/google_compute_engine/gce_automuting.png" alt="GCE Automuting" >}}

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-compute-engine" >}}


### 이벤트

Google Cloud Compute Engine 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud Compute Engine 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

## 참고 자료

-   [Google Compute Engine 메트릭 모니터링][9]
-   [Google Compute Engine 메트릭 수집하기][10]
-   [Datadog으로 Google Compute Engine 모니터링하기][11]

[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://app.datadoghq.com/integrations/google_cloud_platform
[5]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#configuration
[6]: https://app.datadoghq.com/monitors/downtimes
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/google_compute_engine/google_compute_engine_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/
[9]: https://www.datadoghq.com/blog/monitoring-google-compute-engine-performance
[10]: https://www.datadoghq.com/blog/how-to-collect-gce-metrics
[11]: https://www.datadoghq.com/blog/monitor-google-compute-engine-with-datadog
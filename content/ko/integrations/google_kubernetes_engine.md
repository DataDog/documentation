---
categories:
- cloud
- 컨테이너
- google cloud
- 쿠버네티스(Kubernetes)
- 로그 수집
- 네트워크
custom_kind: 통합
dependencies: []
description: GKE 리소스 사용량을 모니터링합니다.
doc_link: https://docs.datadoghq.com/integrations/google_kubernetes_engine/
draft: false
git_integration_title: google_kubernetes_engine
has_logo: true
integration_id: google-kubernetes-engine
integration_title: Google Kubernetes Engine, Cloud
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_kubernetes_engine
public_title: Datadog-Google Kubernetes Engine, Cloud 통합
short_description: GKE 리소스 사용량을 모니터링합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Google Kubernetes Engine(GKE)은 도커(Docker) 컨테이너 실행을 위한 강력한 클러스터 관리자 및 오케스트레이션 시스템입니다.

Google Kubernetes Engine으로 메트릭을 수집하면 다음 작업을 수행할 수 있습니다.

- GKE 컨테이너와 GKE 컨트롤 플레인의 성능을 시각화합니다.
- GKE 컨테이너의 성능과 애플리케이션의 상관 관계를 파악합니다.

본 통합에는 다음과 같은 두 개의 별도 프리셋 대시보드가 제공됩니다.

- 표준 GKE 대시보드는 Google 통합으로 수집한 GKE 및 GKE 컨트롤 플레인 메트릭을 제공합니다.
- 강화 GKE 대시보드는 Datadog의 에이전트 기반 쿠버네티스(Kubernetes) 통합으로 수집한 메트릭과 Google 통합으로 수집한 GKE 컨트롤 플레인 메트릭 을 제공합니다.

표준 대시보드는 간단한 설정만으로 GKE에서 옵저빌리티를 제공합니다. 강화 대시보드는 추가 설정 단계가 필요하지만, 실시간 쿠버네티스(Kubernetes) 메트릭을 더 제공합니다. 대개 프로덕션 환경에서 워크로드를 모니터링할 목적으로 대시보드를 복제 및 사용자 정의할 때 더 적합합니다.

자체 호스팅된 쿠버네티스(Kubernetes) 클러스터와 달리, GKE 컨트롤 플레인은 Google이 관리하며 클러스터에서 실행되는 Datadog 에이전트에서는 접근할 수 없습니다. 따라서 GKE 컨트롤 플레인의 옵저빌리티를 활용하려면 클러스터를 모니터링하는데 Datadog 에이전트를 주로 사용하더라도 Google 통합이 필요합니다.

## 설정

### 메트릭 수집

#### 설치

1. 아직 설치하지 않았다면, [먼저 Google Cloud Platform 통합][1]을 설정하세요. 기본 메트릭 및 프리셋 대시보드를 활용하는 데에는 추가 설치 단계가 필요하지 않습니다.

2. 강화 대시보드를 채우고 애플리케이션 성능 모니터링(APM) 추적, 로깅, 프로파일링, 보안 및 기타 Datadog 서비스를 활성화하려면 [GKE 클러스터에 Datadog 에이전트를 설치하세요][2].

3. 컨트롤 플레인 메트릭을 채우려면 [GKE 컨트롤 플레인 메트릭][3]을 활성화해야 합니다. 컨트롤 플레인 메트릭을 사용하면 쿠버네티스(Kubernetes) 컨트롤 플레인 작업에 관한 옵저빌리티를 활용할 수 있으며, 이는 GKE에서 Google이 관리합니다.

### 로그 수집

Google Kubernetes Engine 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][4]하세요.

해당 작업이 완료되면 Google Cloud Logging에서 Google Kubernetes Engine 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [GCP 로그 탐색기 페이지][5]로 이동하여 쿠버네티스(Kubernetes) 및 GKE 로그를 필터링합니다.
2. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub Sub로 내보내기" >}}

4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-kubernetes-engine" >}}


### 이벤트

Google Kubernetes Engine 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Kubernetes Engine 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.


[1]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/ko/integrations/gke/?tab=standard
[3]: https://cloud.google.com/stackdriver/docs/solutions/gke/managing-metrics#enable-control-plane-metrics
[4]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[5]: https://console.cloud.google.com/logs/viewer
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/google_kubernetes_engine/google_kubernetes_engine_metadata.csv
[7]: https://docs.datadoghq.com/ko/help/
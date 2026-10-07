---
categories:
- cloud
- 오케스트레이션
- google cloud
- 로그 수집
custom_kind: 통합
dependencies: []
description: Anthos 클러스터용 Cloud Run에서 메트릭 및 로그를 수집하고 Datadog에서 분석합니다.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_run_for_anthos/
draft: false
further_reading:
- link: https://docs.datadoghq.com/integrations/google_cloud_run/
  tag: 설명서
  text: Google Cloud Run 통합
git_integration_title: google_cloud_run_for_anthos
has_logo: true
integration_id: google-cloud-run-for-anthos
integration_title: Anthos용 Google Cloud Run
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_run_for_anthos
public_title: Anthos용 Datadog-Google Cloud Run 통합
short_description: Anthos 클러스터용 Cloud Run에서 메트릭 및 로그를 수집하고 Datadog에서 분석합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Anthos용 Google Cloud Run은 하이브리드 및 멀티클라우드 환경을 위한 유연한 서버리스 개발 플랫폼입니다. Anthos용 Google Cloud Run은 Google이 관리 및 완벽 지원하는 [Knative][1] 제품입니다. 완전관리형 Google Cloud를 사용하는 경우 [Google Cloud Run 문서][2]를 참조하세요.

Datadog Google Cloud Platform 통합을 사용하여 Anthos용 Google Cloud Run에서 메트릭을 수집합니다.

## 설정

### 메트릭 수집

#### 설치

아직 설치하지 않은 경우 먼저 [Google Cloud Platform 통합][3]을 설정하세요.

이미 Workload Identity를 사용하여 Anthos용 Cloud Run 서비스를 인증한 경우 추가 단계가 필요하지 않습니다.

Workload Identity를 활성화하지 않은 경우, 마이그레이션하여 Workload Identity를 사용하도록 설정해야 Knative 메트릭 수집을 시작할 수 있습니다. 쿠버네티스(Kubernetes) 서비스 계정을 Google 서비스 계정에 바인딩하고 수집하려는 각 서비스에서 메트릭 Workload Identity를 사용하도록 설정하는 작업이 포함됩니다.

자세한 설정 지침을 확인하려면 [Google Cloud Workload Identity][4]를 참조하세요.

### 로그 수집

Anthos용 Google Cloud Run는 [서비스 로그][5]를 노출합니다.
Google Cloud Run 로그는 Google Cloud Logging으로 수집하여 클라우드 Pub/Sub 토픽을 통해 데이터 플로우 작업으로 전송됩니다. 아직 설정하지 않았다면 [Datadog 데이터 플로우 템플릿으로 로깅을 설정][6]하세요.

이 작업이 완료되면 Google Cloud Logging에서 Google Cloud Run 로그를 Pub/Sub 주제로 내보냅니다.

1. [Anthos용 Cloud Run][7]으로 이동하여 원하는 서비스 을 클릭하고 **로그** 탭으로 이동합니다.
2. **로그 탐색기에서 보기**를 클릭하여 **Google Cloud Logging 페이지**로 이동합니다.
2. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.
3. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub Sub로 내보내기" >}}

4. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

### 추적 및 커스텀 메트릭
[Datadog 어드미션 컨트롤러][8]를 사용하여 애플리케이션 성능 모니터링(APM) 트레이서 및 DogStatsD 클라이언트를 자동 설정합니다. 다음 방법 중 하나를 사용하여 `DD_AGENT_HOST` 및 `DD_ENTITY_ID` 환경 변수를 삽입합니다.

- `admission.datadoghq.com/enabled: "true"` 레이블을 포드에 추가합니다.
- `mutateUnlabelled: true`를 설정하여 클러스터 에이전트 어드미션 컨트롤러를 설정합니다.

포드가 환경 변수를 수신하지 않도록 하려면 `admission.datadoghq.com/enabled: "false"` 레이블을 추가합니다. 본 기능은 `mutateUnlabelled: true`을 설정한 경우에도 동작합니다. 자세한 내용을 확인하려면 [Datadog 어드미션 컨트롤러][8] 문서를 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "google-cloud-run-for-anthos" >}}


### 이벤트

Anthos용 Google Cloud Run 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Anthos용 Google Cloud Run 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://knative.dev/
[2]: https://docs.datadoghq.com/ko/integrations/google_cloud_run/
[3]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity
[5]: https://cloud.google.com/anthos/run/docs/logging
[6]: https://docs.datadoghq.com/ko/integrations/google_cloud_platform/#log-collection
[7]: https://console.cloud.google.com/anthos/run
[8]: https://docs.datadoghq.com/ko/containers/cluster_agent/admission_controller/
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_run_for_anthos/google_cloud_run_for_anthos_metadata.csv
[10]: https://docs.datadoghq.com/ko/help/

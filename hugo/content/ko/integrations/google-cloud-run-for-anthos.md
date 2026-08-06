---
aliases:
- /ko/integrations/google_cloud_run_for_anthos
app_id: google-cloud-run-for-anthos
categories:
- 클라우드
- 오케스트레이션
- google cloud
- 로그 수집
custom_kind: 통합
description: 하이브리드 및 멀티클라우드 환경에서 서버리스 워크로드를 지원하는 관리형 Knative 제품입니다.
further_reading:
- link: https://docs.datadoghq.com/integrations/google_cloud_run/
  tag: 설명서
  text: Google Cloud Run for Anthos 문서
media: []
title: Anthos용 Google Cloud Run
---
## 개요

Google Cloud Run for Anthos는 하이브리드 및 멀티클라우드 환경을 위한 유연한 서버리스 개발 플랫폼입니다. Google Cloud Run for Anthos는 Google이 관리 및 완벽 지원하는 [Knative](https://knative.dev/) 제품입니다. 완전관리형 Google Cloud를 사용하는 경우 [Google Cloud Run 문서](https://docs.datadoghq.com/integrations/google-cloud-run/)를 참조하세요.

Datadog Google Cloud Platform 통합을 사용하여 Anthos용 Google Cloud Run에서 메트릭을 수집합니다.

## 설정

### 메트릭 수집

#### 설치

아직 설정하지 않았다면, 먼저 [Google Cloud 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요.

이미 Workload Identity를 사용하여 Anthos용 Cloud Run 서비스를 인증한 경우 추가 단계가 필요하지 않습니다.

Workload Identity를 활성화하지 않은 경우, 마이그레이션하여 Workload Identity를 사용하도록 설정해야 Knative 메트릭 수집을 시작할 수 있습니다. 쿠버네티스(Kubernetes) 서비스 계정을 Google 서비스 계정에 바인딩하고 수집하려는 각 서비스에서 메트릭 Workload Identity를 사용하도록 설정하는 작업이 포함됩니다.

자세한 설정 지침은 [Google Cloud Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity)를 참조하세요.

### 로그 수집

Google Cloud Run for Anthos 로그는 [서비스 로그]를 노출합니다(https://cloud.google.com/anthos/run/docs/logging).
Google Cloud Run 로그는 Google Cloud Logging으로 수집되어 Cloud Pub/Sub 토픽을 통해 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 로깅을 설정](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection)하세요.

이 작업이 완료되면 Google Cloud Logging에서 Google Cloud Run 로그를 Pub/Sub 주제로 내보냅니다.

1. [Cloud Run for Anthos](https://console.cloud.google.com/anthos/run)으로 이동하여 원하는 서비스를 클릭하고 **Logs** 탭으로 이동합니다.

1. **로그 탐색기에서 보기**를 클릭하여 **Google Cloud Logging 페이지**로 이동합니다.

1. **Create Sink**를 클릭하고 그에 따라 싱크 이름을 지정합니다.

1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub 로그를 Pub/Sub로 내보내기" >}}

1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

### 추적 및 커스텀 메트릭

[Datadog Admission Controller](https://docs.datadoghq.com/containers/cluster_agent/admission_controller/)를 사용하여 애플리케이션 성능 모니터링(APM) 트레이서 및 DogStatsD 클라이언트를 자동 설정합니다. 다음 방법 중 하나를 사용하여 `DD_AGENT_HOST` 및 `DD_ENTITY_ID` 환경 변수를 삽입합니다.

- `admission.datadoghq.com/enabled: "true"` 레이블을 포드에 추가합니다.
- `mutateUnlabelled: true`를 설정하여 클러스터 에이전트 어드미션 컨트롤러를 설정합니다.

포드가 환경 변수를 수신하지 않도록 하려면 `admission.datadoghq.com/enabled: "false"` 레이블을 추가합니다. 본 기능은 `mutateUnlabelled: true`을 설정한 경우에도 동작합니다. 자세한 내용을 확인하려면 [Datadog Admission Controller](https://docs.datadoghq.com/containers/cluster_agent/admission_controller/) 문서를 참조하세요.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.knative.eventing.broker.event_count** <br>(count) | 브로커가 수신한 이벤트 수.|
| **gcp.knative.eventing.trigger.event_count** <br>(count) | 트리거가 수신한 이벤트 수.|
| **gcp.knative.eventing.trigger.event_dispatch_latencies.avg** <br>(gauge) | 트리거 구독자에게 이벤트를 디스패칭하는 데 소요된 평균 시간.<br>_millisecond로 표시_ |
| **gcp.knative.eventing.trigger.event_dispatch_latencies.p99** <br>(gauge) | 트리거 구독자에게 이벤트를 디스패칭하는 데 소요된 시간의 99번째 백분위수.<br>_millisecond로 표시_ |
| **gcp.knative.eventing.trigger.event_dispatch_latencies.p95** <br>(gauge) | 트리거 구독자에게 이벤트를 디스패칭하는 데 소요된 시간의 95번째 백분위수.<br>_millisecond로 표시_ |
| **gcp.knative.eventing.trigger.event_processing_latencies.avg** <br>(gauge) | 트리거 구독자에게 디스패칭하기 전에 이벤트를 처리하는 데 소요된 평균 시간.<br>_millisecond로 표시_ |
| **gcp.knative.eventing.trigger.event_processing_latencies.p99** <br>(gauge) | 트리거 구독자에게 디스패칭하기 전에 이벤트를 처리하는 데 소요된 시간의 99번째 백분위수.<br>_millisecond로 표시_ |
| **gcp.knative.eventing.trigger.event_processing_latencies.p95** <br>(gauge) | 트리거 구독자에게 디스패칭하기 전에 이벤트를 처리하는 데 소요된 시간의 95번째 백분위수.<br>_millisecond로 표시_ |
| **gcp.knative.serving.activator.request_count** <br>(count) | 액티베이터로 라우팅되는 요청의 수.<br>_request로 표시_ |
| **gcp.knative.serving.activator.request_latencies.avg** <br>(gauge) | 액티베이터를 통과하는 요청의 평균 서비스 요청 시간(millisecond).<br>_millisecond로 표시_ |
| **gcp.knative.serving.activator.request_latencies.p99** <br>(gauge) | 액티베이터를 통과하는 요청의 서비스 요청 시간(millisecond)의 99번째 백분위수.<br>_millisecond로 표시_ |
| **gcp.knative.serving.activator.request_latencies.p95** <br>(gauge) | 액티베이터를 통과하는 요청의 서비스 요청 시간(millisecond)의 95번째 백분위수.<br>_millisecond로 표시_ |
| **gcp.knative.serving.autoscaler.actual_pods** <br>(gauge) | 현재 할당된 포드 수.|
| **gcp.knative.serving.autoscaler.desired_pods** <br>(gauge) | 오토스케일러가 할당하려는 포드 수.|
| **gcp.knative.serving.autoscaler.panic_mode** <br>(gauge) | 오토스케일러가 리비전에 패닉 모드 상태이면 1로, 그렇지 않으면 0으로 설정합니다.|
| **gcp.knative.serving.autoscaler.panic_request_concurrency** <br>(gauge) | 짧은 패닉 오토스케일링 기간(panic autoscaling window) 동안 포드당 관찰된 평균 요청 동시성.<br>_request로 표시_ |
| **gcp.knative.serving.autoscaler.requested_pods** <br>(gauge) | 오토스케일러가 Kubernetes에 요청한 포드 수.|
| **gcp.knative.serving.autoscaler.stable_request_concurrency** <br>(gauge) | 안정 오토스케일링 기간(stable autoscaling window) 동안 포드당 관찰된 평균 요청 동시성.<br>_request로 표시_ |
| **gcp.knative.serving.autoscaler.target_concurrency_per_pod** <br>(gauge) | 안정 오토스케일링 기간(stable autoscaling window) 동안 포드당 목표 평균 요청 동시성.<br>_request로 표시_ |
| **gcp.knative.serving.revision.request_count** <br>(count) | 리비전에 도달한 요청 수.<br>_request로 표시_ |
| **gcp.knative.serving.revision.request_latencies.avg** <br>(gauge) | 리비전에 도달한 요청의 평균 서비스 요청 시간(millisecond).<br>_millisecond로 표시_ |
| **gcp.knative.serving.revision.request_latencies.p99** <br>(gauge) | 리비전에 도달한 요청의 서비스 요청 시간(millisecond)의 99번째 백분위수.<br>_millisecond로 표시_ |
| **gcp.knative.serving.revision.request_latencies.p95** <br>(gauge) | 리비전에 도달한 요청의 서비스 요청 시간(millisecond)의 95번째 백분위수.<br>_millisecond로 표시_ |

### 이벤트

Anthos용 Google Cloud Run 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Anthos용 Google Cloud Run 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}
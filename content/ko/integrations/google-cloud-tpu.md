---
aliases:
- /ko/integrations/google_cloud_tpu
app_id: google-cloud-tpu
categories:
- metrics
- google cloud
- log collection
- ai/ml
custom_kind: integration
description: ML 모델 개발을 위한 확장 가능하고 사용자 친화적인 클라우드 리소스를 통한 Tensor 프로세싱 유닛의 이점.
integration_version: 1.0.0
media: []
title: Google Cloud TPU
---
## 개요

Google Cloud TPU 프로덕트는 최첨단 ML 모델을 실행하는 모든 ML 연구자, ML 엔지니어, 개발자, 데이터 사이언티스트가 확장 가능하며 사용하기 쉬운 클라우드 컴퓨팅 리소스를 통해 텐서 프로세싱 유닛(TPU)의 이점을 활용할 수 있도록 도와드립니다.

Datadog Google Cloud Platform 통합을 사용하여 Google Cloud TPU에서 메트릭을 수집합니다.

## 설정

### 설치

Google Cloud TPU를 사용하려면 [Google Cloud Platform 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하기만 하면 됩니다.

### 로그 수집

Google Cloud TPU 로그는 Google Cloud Logging을 통해 수집되어 Cloud Pub/Sub 토픽을 거쳐 Dataflow 작업으로 전송됩니다. 아직 로깅을 설정하지 않았다면 [Datadog Dataflow 템플릿을 사용하여 설정하세요](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

해당 작업이 완료되면 Google Cloud Logging에서 Google Cloud TPU 로그를 다음 Pub/Sub 주제로 내보냅니다.

1. [Google Cloud Logging 페이지](https://console.cloud.google.com/logs/viewer)로 이동하여 Google Cloud TPU 로그를 필터링하세요.
1. **Create Export**를 클릭하고 싱크 이름을 지정하세요.
1. "Cloud Pub/Sub"를 대상으로 선택하고 해당 목적으로 생성된 Pub/Sub 주제를 선택합니다. **참고**: Pub/Sub 주제는 다른 프로젝트에 있을 수 있습니다.
1. **Create**를 클릭하고 확인 메시지가 나타날 때까지 기다립니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.tpu.cpu.utilization** <br>(gauge) | TPU 워커의 CPU 사용률(퍼센트)<br>_percent로 표시_ |
| **gcp.tpu.memory.usage** <br>(gauge) | 메모리 사용량(바이트)<br>_byte로 표시_ |
| **gcp.tpu.network.received_bytes_count** <br>(count) | 이 서버가 네트워크를 통해 수신한 데이터의 누적 바이트 수.<br>_byte로 표시_ |
| **gcp.tpu.network.sent_bytes_count** <br>(count) | 이 서버가 네트워크를 통해 전송한 데이터의 누적 바이트 수.<br>_byte로 표시_ |
| **gcp.tpu.accelerator.duty_cycle** <br>(count) | 샘플 기간 동안 엑셀러레이터가 실제 처리 작업을 수행한 시간의 백분율<br>_percent로 표시_ |
| **gcp.tpu.instance.uptime_total** <br>(count) | VM이 시작된 후 경과한 시간(초)<br>_second로 표시_ |
| **gcp.gke.node.accelerator.tensorcore_utilization** <br>(count) | 사용 중인 Tensorcore의 현재 백분율.<br>_percent로 표시_ |
| **gcp.gke.node.accelerator.duty_cycle** <br>(count) | 지난 샘플 기간(10초) 동안 엑셀러레이터가 실제 처리 작업을 수행한 시간의 백분율.<br>_percent로 표시_ |
| **gcp.gke.node.accelerator.memory_used** <br>(count) | 현재 할당된 엑셀레이터 메모리(바이트 단위)<br>_byte로 표시_ |
| **gcp.gke.node.accelerator.memory_total** <br>(count) | 총 엑셀레이터 메모리(바이트 단위)<br>_byte로 표시_ |
| **gcp.gke.node.accelerator.memory_bandwidth_utilization** <br>(count) | 사용 중인 엑셀러레이터 메모리 대역폭의 현재 백분율.<br>_percent로 표시_ |
| **gcp.gke.container.accelerator.tensorcore_utilization** <br>(count) | 사용 중인 Tensorcore의 현재 백분율.<br>_percent로 표시_ |
| **gcp.gke.container.accelerator.duty_cycle** <br>(count) | 지난 샘플 기간(10초) 동안 엑셀러레이터가 실제 처리 작업을 수행한 시간의 백분율.<br>_percent로 표시_ |
| **gcp.gke.container.accelerator.memory_used** <br>(count) | 현재 할당된 엑셀레이터 메모리(바이트 단위)<br>_byte로 표시_ |
| **gcp.gke.container.accelerator.memory_total** <br>(count) | 총 엑셀레이터 메모리(바이트 단위)<br>_byte로 표시_ |
| **gcp.gke.container.accelerator.memory_bandwidth_utilization** <br>(count) | 사용 중인 엑셀러레이터 메모리 대역폭의 현재 백분율.<br>_percent로 표시_ |

### 이벤트

Google Cloud TPU 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Google Cloud TPU 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.
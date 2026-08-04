---
aliases:
- /ko/integrations/nvidia_nim
app_id: nvidia-nim
categories:
- log collection
- ai/ml
custom_kind: 통합
description: NVIDIA NIM과 Datadog을 통합하면 Prometheus 메트릭을 수집하고 모니터링함으로써 GPU를 실시간으로 관찰할
  수 있습니다.
integration_version: 2.0.0
media: []
supported_os:
- linux
- 윈도우즈(Windows)
- macos
title: Nvidia NIM
---
## 개요

본 점검은 Datadog Agent로 [NVIDIA NIM](https://docs.nvidia.com/nim/large-language-models/latest/observability.html)을 모니터링합니다.

## 설정

<div class="alert alert-warning">
이 통합 기능은 현재 Preview 단계입니다. 향후 제공 여부는 변경될 수 있습니다.
</div>

아래 지침에 따라 호스트에서 실행 중인 Agent에 이 점검을 설치하고 설정하세요. 컨테이너화된 환경의 경우 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/)에서 해당 지침을 적용하는 방법에 관한 가이드를 참고하세요.

**필수조건**:

- 이 점검에는 Agent v7.61.0+가 필요합니다.
- 본 점검에서는 메트릭 수집을 위해 [OpenMetrics](https://docs.datadoghq.com/integrations/openmetrics/)를 사용하며, Python 3이 필요합니다.

\`### Installation
NVIDIA NIM 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있어 서버에 추가로 설치할 필요가 없습니다.

#### LLM Observability: LLM 애플리케이션에서 NVIDIA Nim으로 이루어지는 호출을 엔드투엔드 가시화

NVIDIA NIM은 OpenAI 클라이언트를 사용하여 [NVIDIA NIM](https://www.nvidia.com/en-us/ai/)의 API 호출을 처리합니다. NVIDIA NIM을 사용하여 애플리케이션을 모니터링하고 LLM Observability를 설정하려면 [OpenAI 통합](https://docs.datadoghq.com/integrations/openai) 설명서를 따르세요.
\`

### 설정

NVIDIA NIM은 요청 통계를 나타내는 Prometheus [메트릭](https://docs.nvidia.com/nim/large-language-models/latest/observability.html)을 제공합니다. 기본적으로 해당 메트릭은 http://localhost:8000/metrics 에서 사용할 수 있습니다. Datadog Agent은 해당 통합을 사용하여 노출된 메트릭을 수집합니다. 아래 지침에 따라 일부 또는 모든 컴포넌트에서 데이터 수집을 구성할 수 있습니다.

NVIDIA NIM 성능 데이터 수집을 시작하려면:

1. NVIDIA NIM 성능 데이터 수집을 시작하려면 Agent 구성 디렉터리 루트의 `conf.d/` 폴더에 있는 `nvidia_nim.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [샘플 nvidia_nim.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/nvidia_nim/datadog_checks/nvidia_nim/data/conf.yaml.example)을 참고하세요.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### 검증

[Agent 상태 하위 명령을 실행하고](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) Checks 섹션에서 `nvidia_nim`를 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **nvidia_nim.e2e_request_latency.seconds.bucket** <br>(count) | 초 단위 버킷별 엔드 투 엔드 요청 레이턴시 관측 값.|
| **nvidia_nim.e2e_request_latency.seconds.count** <br>(count) | 엔드 투 엔드 요청 레이턴시의 총 관측 횟수.|
| **nvidia_nim.e2e_request_latency.seconds.sum** <br>(count) | 엔드 투 엔드 요청 레이턴시(초)의 합계.<br>_second로 표시_ |
| **nvidia_nim.generation_tokens.count** <br>(count) | 처리된 생성 토큰 수.<br>_token으로 표시_ |
| **nvidia_nim.gpu_cache_usage_percent** <br>(gauge) | GPU KV 캐시 사용량. 1은 100% 사용량을 의미합니다.<br>_fraction으로 표시_ |
| **nvidia_nim.num_request.max** <br>(gauge) | 동시에 실행 중인 최대 요청 수.<br>_request로 표시_ |
| **nvidia_nim.num_requests.running** <br>(gauge) | 현재 GPU에서 실행 중인 요청 수.<br>_request로 표시_ |
| **nvidia_nim.num_requests.waiting** <br>(gauge) | 대기 중인 요청 수.<br>_request로 표시_ |
| **nvidia_nim.process.cpu_seconds.count** <br>(count) | 총 사용자 및 시스템 CPU 사용 시간(초)<br>_Second로 표시됨_ |
| **nvidia_nim.process.max_fds** <br>(gauge) | 열려 있는 파일 디스크립터 최대 수.<br>_file로 표시됨_ |
| **nvidia_nim.process.open_fds** <br>(gauge) | 오픈 파일 디스크립터의 수.<br>_file로 표시됨_ |
| **nvidia_nim.process.resident_memory_bytes** <br>(gauge) | 레지던트 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **nvidia_nim.process.start_time_seconds** <br>(gauge) | 프로세스 시작 후 경과 시간(초).<br>_second로 표시_ |
| **nvidia_nim.process.virtual_memory_bytes** <br>(gauge) | 버추얼 메모리 크기(바이트)<br>_byte로 표시됨_ |
| **nvidia_nim.prompt_tokens.count** <br>(count) | 처리된 프리필 토큰 수.<br>_token으로 표시_ |
| **nvidia_nim.python.gc.collections.count** <br>(count) | 이 생성이 수집된 횟수.|
| **nvidia_nim.python.gc.objects.collected.count** <br>(count) | GC 중에 수집된 오브젝트.|
| **nvidia_nim.python.gc.objects.uncollectable.count** <br>(count) | GC 중에 발견된 수집할 수 없는 객체.|
| **nvidia_nim.python.info** <br>(gauge) | Python 플랫폼 정보.|
| **nvidia_nim.request.failure.count** <br>(count) | 실패한 요청 카운트.<br>_request로 표시_ |
| **nvidia_nim.request.finish.count** <br>(count) | 종료된 요청 카운트.<br>_request로 표시_ |
| **nvidia_nim.request.generation_tokens.bucket** <br>(count) | 처리된 생성 토큰 수.|
| **nvidia_nim.request.generation_tokens.count** <br>(count) | 처리된 생성 토큰 수.|
| **nvidia_nim.request.generation_tokens.sum** <br>(count) | 처리된 생성 토큰 수.<br>_token으로 표시_ |
| **nvidia_nim.request.prompt_tokens.bucket** <br>(count) | 처리된 프리필 토큰 수.|
| **nvidia_nim.request.prompt_tokens.count** <br>(count) | 처리된 프리필 토큰 수.|
| **nvidia_nim.request.prompt_tokens.sum** <br>(count) | 처리된 프리필 토큰 수.<br>_token으로 표시_ |
| **nvidia_nim.request.success.count** <br>(count) | 성공적으로 처리된 요청의 카운트입니다.|
| **nvidia_nim.time_per_output_token.seconds.bucket** <br>(count) | 초 단위 버킷별 출력 토큰당 소요 시간 관측값.|
| **nvidia_nim.time_per_output_token.seconds.count** <br>(count) | 출력 토큰당 소요 시간의 총 관측 횟수.|
| **nvidia_nim.time_per_output_token.seconds.sum** <br>(count) | 출력 토큰당 시간의 합계(초).<br>_second로 표시_ |
| **nvidia_nim.time_to_first_token.seconds.bucket** <br>(count) | 초 단위 버킷별 첫 번째 토큰 생성 시간 관측값.|
| **nvidia_nim.time_to_first_token.seconds.count** <br>(count) | 첫 번째 토큰 생성 시간의 총 관측 횟수.|
| **nvidia_nim.time_to_first_token.seconds.sum** <br>(count) | 첫 번째 토큰 생성 시간의 합계(초).<br>_second로 표시_ |

### 이벤트

NVIDIA NIM 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

**nvidia_nim.openmetrics.health**

Agent가 NVIDIA NIM OpenMetrics 엔드포인트에 연결할 수 없는 경우 `CRITICAL`을 반환하고, 그 외에는 `OK`를 반환합니다.

_상태: ok, critical_

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.
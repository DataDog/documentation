---
app_id: google-gemini
app_uuid: 93179a9e-98f8-48fe-843a-59f9c9bb84df
assets:
  dashboards:
    LLM Observability Overview Dashboard: assets/dashboards/llm_observability_overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31079799
    source_type_name: Google Gemini
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ai/ml
- google cloud
- 메트릭
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_gemini
integration_id: google-gemini
integration_title: Google Gemini
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_gemini
public_title: Google Gemini
short_description: 애플리케이션 수준에서 Google Gemini 사용 및 상태 모니터링
supported_os:
- linux
- 윈도우즈(Windows)
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Google Cloud
  - Category::Metrics
  - Submitted Data Type::Traces
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 애플리케이션 수준에서 Google Gemini 사용 및 상태 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Gemini
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 개요

[Google Gemini][1]를 사용하여 챗봇이나 데이터 추출 도구와 같은 LLM 기반 애플리케이션을 모니터링하고 문제를 해결하며 평가합니다.

LLM 애플리케이션을 구축하는 경우 Datadog의 LLM Observability를 사용하여 문제의 근본 원인을 조사하고, 운영 성능을 모니터링하며, LLM 애플리케이션의 품질, 개인 정보 보호 및 안전성을 평가하세요.

트레이스 조사 방법 예시를 보려면 [LLM Observability 추적 뷰 동영상][2]을 확인하세요.

## 설정

### LLM Observability: Google Gemini를 사용하여 LLM 애플리케이션에 대한 엔드투엔드 가시성 확보
다양한 환경에서 LLM Observability를 활성화할 수 있습니다. 시나리오에 따라 적절한 설정을 따르세요.

#### Python용 설치

##### Datadog Agent가 없는 경우:
1. `ddtrace` 패키지를 설치합니다.

  ```shell
    pip install ddtrace
  ```

2. 다음 명령으로 애플리케이션을 시작하고 Agentless 모드를 활성화합니다.

  ```shell
    DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_AGENTLESS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
  ```

##### Datadog Agent가 설치되어 있는 경우:
1. Agent가 실행 중이고 APM과 StatsD가 활성화되어 있는지 확인하세요. 예를 들어 Docker에서 다음 명령을 사용하세요.

  ```shell
  docker run -d \
    --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<DATADOG_API_KEY> \
    -p 127.0.0.1:8126:8126/tcp \
    -p 127.0.0.1:8125:8125/udp \
    -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
    -e DD_APM_ENABLED=true \
    gcr.io/datadoghq/agent:latest
  ```

2. 설치되어 있지 않다면 `ddtrace` 패키지를 설치합니다.

  ```shell
    pip install ddtrace
  ```

3. `ddtrace-run` 명령을 사용하여 추적을 자동으로 활성화하는 애플리케이션을 시작합니다.

  ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
  ```

**참고**: Agent가 사용자 지정 호스트 또는 포트에서 실행되는 경우 `DD_AGENT_HOST` 및 `DD_TRACE_AGENT_PORT`를 적절히 설정하세요.

##### 서버리스 환경에서 LLM Observability를 실행하는 경우:

다음 환경 변수를 설정하여 LLM Observability를 활성화합니다.

  ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
  ```

**참고**: 서버리스 환경에서 Datadog은 서버리스 함수 실행이 완료되면 자동으로 스팬을 플러시합니다.

##### 자동 Google Gemini 추적

Google Gemini 통합은 Google AI Python SDK의 콘텐츠 생성 호출에 대한 자동 추적 기능을 제공합니다. 이를 통해 지연 시간, 오류, 입출력 메시지, 그리고 Google Gemini 작업의 토큰 사용량을 파악할 수 있습니다.

다음 메서드는 동기 및 비동기 Google Gemini 작업 모두에 추적됩니다.
- 콘텐츠 생성(스트리밍 호출 포함): `model.generate_content()`, `model.generate_content_async()`
- 채팅 메시지: `chat.send_message()`, `chat.send_message_async()`

이 메서드에는 추가 설정이 필요하지 않습니다.

##### 검증
애플리케이션 로그에서 스팬 생성이 성공적으로 완료되었는지 확인하여 LLM Observability가 스팬을 제대로 캡처하고 있는지 확인하세요. 다음 명령을 실행하여 `ddtrace` 통합 상태를 확인할 수도 있습니다.

  ```shell
  ddtrace-run --info
  ```

다음 메시지가 표시되는지 확인하여 설정이 완료되었는지 확인하세요.

  ```shell
  Agent error: None
  ```

##### 디버깅
설치 중에 문제가 발생하면 `--debug` 플래그를 전달하여 디버그 로깅을 활성화하세요.

  ```shell
  ddtrace-run --debug
  ```

여기에는 Google Gemini 트레이스 문제를 포함하여 데이터 전송이나 계측과 관련된 모든 오류가 표시됩니다.

## 수집한 데이터

### 메트릭

Google Gemini 통합은 메트릭을 포함하지 않습니다.

### 서비스 점검

Google Gemini 통합은 서비스 점검을 포함하지 않습니다.

### 이벤트

Google Gemini 통합은 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.


[1]: https://gemini.google.com/
[2]: https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max
[3]: https://docs.datadoghq.com/ko/help/
---
aliases:
- /ko/tracing/troubleshooting/apm_rate_limits
title: 에이전트 요율 제한
---

## 최대 연결 제한

에이전트 로그에 다음 오류 메시지가 있으면 기본 APM 연결 제한 수인 2000을 초과했다는 의미입니다.

```
ERROR | (pkg/trace/logutil/throttled.go:38 in log) | http.Server: http: Accept error: request has been rate-limited; retrying in 80ms
```

에이전트의 APM 연결 제한 수를 늘리려면 에이전트 구성 파일에서 `connection_limit` 속성을 구성하세요(`apm_config:` 섹션 아래). 컨테이너화된 배포(예: Docker나 쿠버네티스)의 경우, `DD_APM_CONNECTION_LIMIT` 환경 변수를 사용하세요.

## 최대 메모리 제한

에이전트 로그에 다음 오류 메시지가 있으면 에이전트의 최대 메모리 사용이 150% 초과했다는 의미입니다.

```
CRITICAL | (pkg/trace/api/api.go:703 in watchdog) | Killing process. Memory threshold exceeded: 8238.08M / 715.26M
CRITICAL | (pkg/trace/osutil/file.go:39 in Exitf) | OOM
```

에이전트의 최대 메모리 제한을 늘리려면 에이전트 구성 파일 내 `apm_config` 섹션 아래에서 `max_memory` 속성을 구성하세요. 컨테이너화된 배포(예: Docker나 쿠버네티스)의 경우, `DD_APM_MAX_MEMORY` 환경 변수를 사용하세요.

쿠버네티스와 같은 오케스트레이션에서 메모리 제한을 처리하도록 하려면, Datadog 에이전트 7.23.0 버전부터 이 제한을 `0`으로 설정해 비활성화하면 됩니다.

## 최대 CPU 백분율

이 설정은 APM 에이전트가 사용하는 최대 CPU 백분율을 정의합니다. 쿠버네티스 외 환경에서는 기본값이 50이며, 이는 0.5 코어와 동일한 값입니다(100=1 코어). 이 제한 값에 도달하면 CPU 사용이 제한 값 밑으로 떨어질 때까지 페이로드가 거부됩니다. 이는 현재 취소된 페이로드 비율을 나타내는 `datadog.trace_agent.receiver.ratelimit`으로 반영되며, 값이 1이면 취소된 트레이스가 없다는 의미입니다. [Service Table View][1] 내 `Limited Resource` 경고에서도 이를 확인할 수 있습니다.

Datadog 에이전트의 리소스 제한을 오케스트레이터(또는 기타 외부 서비스)로 관리하고 싶을 경우, Datadog에서는 환경 변수 `DD_APM_MAX_CPU_PERCENT`를 `0`으로 설정해 비활성화하는 것을 권장합니다(Datadog 에이전트 7.23.0부터 지원).

[1]: /ko/tracing/trace_pipeline/ingestion_controls/#service-table-view
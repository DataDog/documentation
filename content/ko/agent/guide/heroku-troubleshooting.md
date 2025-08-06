---
aliases:
- /ko/agent/faq/heroku-troubleshooting/
title: Datadog-Heroku 빌드팩 트러블슈팅
---

Heroku 디버깅을 시작하려면 [Agent 설명서][1]에 있는 정보/디버깅 명령 목록과 함께 `agent-wrapper` 명령을 사용하세요.

예를 들어, Datadog 에이전트 및 활성화된 통합의 상태를 표시하려면 실행합니다.

```shell
agent-wrapper status
```

다음으로, 커스텀 메트릭을 전송하여 Datadog Agent가 수신 대기 중인지 확인하세요. 프로젝트 디렉터리에서 다음을 실행합니다.

```shell
heroku run bash

# Dyno가 시작되고 명령줄에 있는 경우
echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

잠시 후, 메트릭 탐색기를 사용하여 메트릭이 수신되었는지 확인합니다.

실행 중인 Dyno에서 Agent와 Trace Agent 로그를 얻는 것도 도움이 될 수 있습니다.

Datadog Agent 로그 다운로드:

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog.log --dyno=<YOUR DYNO NAME>
```

Datadog Trace Agent 로그 다운로드:

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog-apm.log --dyno=<YOUR DYNO NAME>
```

## 플레어 전송 

[`agent-wrapper` 명령][1]을 실행하여 플레어를 생성합니다:

```shell
agent-wrapper flare
```

[1]: /ko/agent/configuration/agent-commands/#agent-status-and-information
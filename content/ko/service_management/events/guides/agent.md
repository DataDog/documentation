---
aliases:
- /ko/events/agent/
- /ko/events/guides/agent
further_reading:
- link: /developers/custom_checks/write_agent_check/
  tag: 설명서
  text: 커스텀 Agent 점검 작성
kind: 지침
title: 커스텀 Agent 점검을 이용하는 이벤트
---

## 제출

커스텀 Agent 점검에서 이벤트를 제출하려면 `event(<EVENT_DICT>)` 기능을 사용하세요.

```text
self.event(
            {
              "timestamp": <TIMESTAMP_EPOCH>,
              "event_type": "<EVENT_NAME>",
              "msg_title": "<TITLE>",
              "msg_text": "<MESSAGE>",
              "aggregation_key": "<AGGREGATION_KEY>",
              "alert_type": "<ALERT_TYPE>",
              "source_type_name": "<SOURCE_TYPE>",
              "host": "<HOSTNAME>",
              "tags": ["<TAGS>"],
              "priority": "<PRIORITY>"
            }
)
```

이벤트 딕셔너리에서 다음 키와 데이터 유형을 사용할 수 있습니다.

| 키                | 유형            | 필수 | 설명                                                   |
|--------------------|-----------------|----------|---------------------------------------------------------------|
| `timestamp`        | 정수         | 예      | 이벤트 epoch 타임스탬프                             |
| `event_type`       | 스트링          | 예      | 이벤트 이름                                                |
| `msg_title`        | 스트링          | 예      | 이벤트 타이틀                                        |
| `msg_text`         | 스트링          | 예      | 이벤트 텍스트 본문                                    |
| `aggregation_key`  | 스트링          | 아니요       | 이벤트 집계에 사용할 키                           |
| `alert_type`       | 스트링          | 아니요       | `error`, `warning`, `success` 또는 `info`(기본값 `info`) |
| `source_type_name` | 스트링          | 아니요       | 소스 유형 이름                                     |
| `host`             | 스트링          | 아니요       | 호스트 이름                                                 |
| `tags`             | 스트링 목록 | 아니요       | 이 이벤트와 연결된 태그 목록입니다.                    |
| `priority`         | 스트링          | 아니요       | 이벤트 우선도를 지정합니다(`normal` 또는 `low`).      |

### 예시

이것은 하나의 이벤트를 주기적으로 전송하기 위해 커스텀 Agent 점검을 사용하는 예시입니다. 자세한 내용은 [커스텀 Agent 점검 생성하기][1]를 참조하세요.

1. [Agent의 configuration 디렉토리][2] 루트의 `conf.d/` 폴더에  `event_example.d/` 디렉토리를 새로 만듭니다.

2. `event_example.d/` 폴더에서 다음 콘텐츠가 있는 `event_example.yaml`(이)라는 설정 파일을 만듭니다.

    ```yaml
    instances: [{}]
    ```

3. `conf.d/` 폴더에서 한 수준 위에 위치한 `checks.d/` 폴더로 이동합니다.
4. 이 폴더에서 다음 콘텐츠가 있는 `event_example.py`(이)라는 커스텀 점검 파일을 만듭니다.

    {{< code-block lang="python" filename="event_example.py" >}}
    from datadog_checks.base import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.event(
                {
                    "timestamp": time.time(),
                    "event_type": "Error",
                    "msg_title": "이벤트 예시",
                    "msg_text": "Datadog의 이벤트 예시입니다.",
                    "alert_type": "error",
                }
            )
    {{< /code-block >}}

5. [Restart the Agent][3].
6. 검증을 위해 [Agent의 상태 명령어][4]를 실행하고 Checks 섹션에서 `event_example`(을)를 찾습니다.

    ```
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        event_example (1.0.0)
        ---------------------
          Instance ID: event_example:d884b5186b651429 [OK]
          Total Runs: 2
          Metric Samples: Last Run: 0, Total: 0
          Events: Last Run: 1, Total: 2
          Service Checks: Last Run: 0, Total: 0
          Average Execution Time : 0s

        (...)
    ```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/developers/custom_checks/write_agent_check/
[2]: /ko/agent/configuration/agent-configuration-files/#agent-configuration-directory
[3]: /ko/agent/configuration/agent-commands/#restart-the-agent
[4]: /ko/agent/configuration/agent-commands/#agent-information
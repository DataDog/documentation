---
aliases:
- /ko/agent/faq/how-to-get-more-logging-from-the-agent
- /ko/agent/faq/agent-5-container-more-log
further_reading:
- link: /agent/troubleshooting/send_a_flare/
  tag: 설명서
  text: Agent Flare 보내기
- link: /agent/troubleshooting/agent_check_status/
  tag: 설명서
  text: Agent 점검의 상태 파악하기
title: 디버그 모드
---

## 개요

Agent의 로그 레벨 설정은 기본적으로 `INFO`입니다. 그러나 로그 레벨을 `DEBUG`로 설정하여 로그에서 더 많은 정보를 알아볼 수도 있습니다.

**참조**: 디버그 모드는 디버그 목적으로만 설계되었습니다. 디버그 모드 사용 시 인덱스화 로그의 수가 늘어나므로, `DEBUG`는 특정 기간에만 활성화하시길 권장합니다. 디버그를 완료했다면 로그 레벨을 다시 `INFO`로 설정하세요.

Agent 전체 디버그 모드를 활성화하는 방법은 다음과 같습니다.

1. 로컬 `datadog.yaml` 파일을 수정하세요. 사용하는 OS에 맞게 구체적인 안내를 받으려면 [Agent 주요 설정 파일][1]을 참조하시기 바랍니다.

2. `# log_level: INFO`를 `log_level: DEBUG`로 치환합니다(`#`을 삭제해 라인의 코멘트를 해제하세요).

3. Datadog Agent를 재시작하세요. OS에 맞게 구체적인 안내를 확인하려면 [Agent 명령어][2]를 참조하시기 바랍니다.

4. 몇 분 기다리시면 로그가 생성됩니다. OS에 맞는 안내를 확인하려면 [Agent 로그 파일][3]을 참조하세요.

## 컨테이너화 Agent

컨테이너 Agent에서 디버그 모드를 활성화하려면 Agent 부팅 시 `DD_LOG_LEVEL=debug`를 사용하세요.

Agent v6.19/ v7.19 이상의 버전에서는 다음을 사용하여 런타임에서 Agent 로그 레벨을 설정할 수 있습니다.

```shell
agent config set log_level debug
```

트레이스-에이전트 컨테이너의 로그 레벨은 에이전트 컨테이너에서 했던 것처럼 런타임에서 변경할 수 **없습니다**. 전용 트레이스-에이전트 컨테이너의 경우 `DD_LOG_LEVEL` 변수를 `debug`로 설정한 후 재배포해야 합니다.

[**Helm**][4]을 사용하는 경우 `datadog-values.yaml` 파일에서 `logLevel: INFO`를 `logLevel: DEBUG`로 변경하고 다시 배포합니다.

## Agent 로그 레벨

다음의 Agent 로그 레벨은 `log_level` 또는 `DD_LOG_LEVEL`로 활용할 수 있습니다.

| 옵션     | Critical 로그 | Error 로그 | Warn 로그 | Info 로그 | Debug 로그 | Trace 로그 |
|------------|---------------|------------|-----------|-----------|------------|------------|
| `'OFF'`      |               |            |           |           |            |            |
| `'CRITICAL'` | {{< X >}}     |            |           |           |            |            |
| `'ERROR'`    | {{< X >}}     | {{< X >}}  |           |           |            |            |
| `'WARN'`     | {{< X >}}     | {{< X >}}  | {{< X >}} |           |            |            |
| `'INFO'`     | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} |            |            |
| `'DEBUG'`    | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  |            |
| `'TRACE'`    | {{< X >}}     | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}}  |

**참조**: 로그 레벨을 설정 파일에서 `'OFF'`로 설정하는 경우, 값이 부적절하게 파싱(parsing)되는 경우를 막기 위해 주석을 반드시 달아야 합니다. 다른 로그 레벨에서는 주석이 부수적인 요소입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /ko/agent/configuration/agent-commands/#restart-the-agent
[3]: /ko/agent/configuration/agent-log-files/
[4]: https://github.com/DataDog/helm-charts/blob/637472f105f42e8b444981ea2a38e955161c8e3a/charts/datadog/values.yaml#L125
---
further_reading:
- link: /developers/custom_checks/write_agent_check/
  tag: 설명서
  text: Agent 커스텀 점검 생성하기
title: '서비스 점검 제출: Agent 점검'
---

커스텀 Agent 점검에서 Datadog로 서비스 점검 내용을 전송하려면 `AgentCheck` 클래스의 사전 정의된 `service_check()` 함수를 사용하세요.

```python
self.service_check(name, status, tags=None, hostname=None, message=None)
```

`service_check()` 함수에서 이용 가능한 각종 파라미터와 데이터 유형은 다음과 같습니다.

| 파라미터  | 유형            | 필수 | 기본값 | 설명                                                                                                   |
|------------|-----------------|----------|---------------|---------------------------------------------------------------------------------------------------------------|
| `name`     | 스트링          | 네      | -             | 서비스 점검의 이름.                                                                                |
| `status`   | 정수             | 네      | -             | 서비스 상태를 설명하는 정수: OK에는 `0`, Warning에는 `1`, Critical에는 `2`, Unknown에는 `3`이 표시됩니다. |
| `tags`     | 스트링 목록 | 아니요       | `None`        | 서비스 점검과 관련된 태그의 목록.                                                          |
| `hostname` | 스트링          | 아니요       | 현재 호스트  | 서비스 점검과 관련된 호스트네임. 기본값은 현재 호스트입니다.                                |
| `message`  | 스트링          | 아니요       | `None`        | 추가 정보 또는 현 상태가 발생한 이유에 대한 설명.                                          |

## 예시

주기적으로 하나의 서비스 점검만을 전송하는 Agent 점검의 예시를 보여드리겠습니다. 더 자세한 정보를 확인하려면 [커스텀 Agent 점검 생성하기][1] 가이드를 참조하시기 바랍니다.

1. Agent의 [`conf.d/` 폴더][2]에 새 디렉터리 `service_check_example.d/`를 생성합니다.

2. `service_check_example.d/` 폴더에 `service_check_example.yaml`라는 이름의 내용 없는 설정 파일을 만들고, 다음의 내용을 입력합니다.

    ```yaml
    instances: [{}]
    ```

3. `conf.d/` 폴더에서 한 수준 위에 위치한 `checks.d/` 폴더로 이동합니다.
4. 이 폴더 안에 커스텀 점검 파일을 만들어 `service_check_example.py`라고 이름을 지정하고, 다음의 내용을 입력합니다.

    {{< code-block lang="python" filename="service_check_example.py" >}}
from datadog_checks.base import AgentCheck

__version__ = "1.0.0"

class MyClass(AgentCheck):
    def check(self, instance):
        self.service_check('example_service_check', 0, message='Example application is up and running.')
    {{< /code-block >}}

5. [Agent를 다시 시작합니다][3].

6. 커스텀 점검이 [Agent 상태 명령어][4]와 함께 제대로 작동하는지 확인합니다. 다음과 같은 메시지가 표시되어야 합니다.

    ```text
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        service_check_example (1.0.0)
        -----------------------------
          Instance ID: service_check_example:d884b5186b651429 [OK]
          Total Runs: 1
          Metric Samples: Last Run: 0, Total: 0
          Events: Last Run: 0, Total: 0
          Service Checks: Last Run: 1, Total: 1
          Average Execution Time : 2ms

        (...)
    ```

7. 마지막으로 [Datadog 서비스 점검 요약][5] 설명서를 참조해 서비스 점검이 다음을 보고하는지 확인하세요.

{{< img src="developers/service_checks/agent_service_checks_submission/service_check.png" alt="서비스 점검" style="width:80%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/custom_checks/write_agent_check/
[2]: /ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /ko/agent/guide/agent-commands/#restart-the-agent
[4]: /ko/agent/guide/agent-commands/#agent-information
[5]: https://app.datadoghq.com/check/summary
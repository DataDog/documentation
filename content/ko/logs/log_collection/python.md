---
aliases:
- /ko/logs/languages/python
further_reading:
- link: https://www.datadoghq.com/blog/python-logging-best-practices/
  tag: 블로그
  text: Python으로 로그를 수집, 사용자 지정, 중앙화하는 방법 알아보기
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 배우기
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 알아보기
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: 설명서
  text: 로그 수집 트러블슈팅 가이드
- link: /glossary/#tail
  tag: 용어
  text: '"tail"에 대한 용어 항목'
kind: 설명서
title: Python 로그 수집
---

## 개요

Python 로그를 Datadog에 전송하려면 호스트의 파일을 로깅하도록 Python 로거를 설정한 후 Datadog 에이전트로 해당 파일을 [테일링][12]합니다.

## 로거 설정

Python 로그는 트레이스백으로 인해 처리하기 복잡할 수 있습니다. 트레이스백으로 인해 로그가 여러 줄로 분할되어 원본 로그 이벤트와 연결하기 어렵습니다. Datadog은 이러한 문제를 해결하기 위해 로깅 시 JSON 포맷터를 사용할 것을 강력히 권장합니다. 해당 포맷터를 사용할 경우 다음 작업이 가능합니다.

* 스택 트레이스가 올바른 로그 이벤트로 래핑되도록 합니다.
* 로그 이벤트의 모든 속성(심각도, 로거 이름, 스레드 이름 등)이 올바르게 추출되었는지 확인합니다.

다음 로깅 라이브러리용 설정 예시를 참조하세요.

* [JSON-log-formatter][1]
* [Python-json-logger][2]
* [django-datadog-logger][3]*

*[Python 로거][6]에는 커스텀 속성 추가용 `extra` 파라미터가 있습니다. `DJANGO_DATADOG_LOGGER_EXTRA_INCLUDE`로 `extra` 파라미터를 추가할 로거의 이름과 일치하는 정규식을 지정합니다.

## Datadog 에이전트 설정

[로그 수집][7]이 활성화되면 [사용자 지정 로그 수집][8]을 설정해 로그 파일을 테일링하고 다음 단계에 따라 Datadog으로 전송하세요.

1. `conf.d/` 에이전트 설정 디렉터리에 `python.d/` 폴더를 생성합니다.
2. 다음을 사용해 `conf.d/python.d/` 디렉터리에 `conf.yaml` 파일을 생성합니다.
    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "<PATH_TO_PYTHON_LOG>.log"
        service: "<SERVICE_NAME>"
        source: python
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
3. [에이전트를 재시작합니다][5].
4. [에이전트 상태 하위 명령][9]을 실행하고 `Checks` 섹션에서 `python`를 찾아 로그가 Datadog에 전송되었는지 확인합니다.

로그가 JSON 형식이면 Datadog은 자동으로 [로그 메시지를 파싱][10]하여 로그 속성을 추출합니다. [로그 탐색기][11]로 로그를 확인하고 문제를 해결하세요.

## 로그 및 트레이스에 서비스 연결

본 애플리케이션에서 APM이 이 활성화된 경우, [APM Python 지침에 따라][4] 트레이스 ID, 스팬 ID, `env`, `service`, `version`을 자동으로 로그에 추가해 로그와 트레이스를 연결하세요.

**참고**: APM 트레이서가 로그에 `service`를 삽입하면 에이전트 설정에서 값 집합이 재구성됩니다.

본 작업이 완료되면 로그는 다음과 같은 형식이어야 합니다.

```xml
2019-01-07 15:20:15,972 DEBUG [flask.app] [app.py:100] [dd.trace_id=5688176451479556031 dd.span_id=4663104081780224235] - this is an example
```

로그가 JSON 형식일 경우 트레이스 값이 최상위 수준, 최상위 `extra` 수준, 또는 `record.extra` 블록에 위치할 때 자동 추출됩니다. 다음은 트레이스 값이 자동으로 파싱되는 유효한 JSON 로그의 예시입니다.

```json
{
  "message":"프라이빗 메서드입니다",
  "dd.trace_id":"18287620314539322434",
  "dd.span_id":"8440638443344356350",
  "dd.env":"dev",
  "dd.service":"logs",
  "dd.version":"1.0.0"
}
```

```json
{
  "message":"프라이빗 메서드입니다",
  "extra":{
    "dd.trace_id":"18287620314539322434",
    "dd.span_id":"8440638443344356350",
    "dd.env":"dev",
    "dd.service":"logs",
    "dd.version":"1.0.0"
  }
}
```

```json
{
"message":"프라이빗 메서드입니다",
  "record":{
    "extra":{
      "dd.trace_id":"1734396609740561719",
      "dd.span_id":"17877262712156101004",
      "dd.env":"dev",
      "dd.service":"logs",
      "dd.version":"1.0.0"
    }
  }
}
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.python.org/pypi/JSON-log-formatter/
[2]: https://github.com/madzak/python-json-logger
[3]: https://pypi.org/project/django-datadog-logger/
[4]: /ko/tracing/other_telemetry/connect_logs_and_traces/python
[5]: /ko/agent/configuration/agent-commands/
[6]: https://docs.python.org/3/library/logging.html#logging
[7]: /ko/agent/logs/?tab=tailfiles#activate-log-collection
[8]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[9]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: /ko/logs/log_configuration/parsing/
[11]: /ko/logs/explorer/#overview
[12]: /ko/glossary/#tail
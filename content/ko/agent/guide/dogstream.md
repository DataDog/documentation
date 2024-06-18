---
aliases:
- /ko/agent/faq/dogstream
private: true
title: Dogstream
---

<div class="alert alert-danger">
에이전트 5의 기능은 더 이상 사용되지 않습니다. 새로운 기능 릴리스가 중단되었습니다.
<br>
에이전트 버전 6을 사용할 수 있습니다! 새로운 기능을 사용하려면 <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">최신 버전으로 업그레이드</a>하세요.
</div>

로그 파일에는 중요한 애플리케이션과 비즈니스 데이터가 포함되어 있습니다.
안타깝게도 로그 파일은 무시되기 때문에
이 값은 종종 실현되지 않습니다. Datadog 에이전트는 로그에서 메트릭과 이벤트를 파싱하여 
내부의 데이터를 실시간으로 항상 그래프로 나타낼 수 있도록 이 문제를 해결하는 데 도움이 됩니다.

## 파싱 메트릭

Datadog 에이전트는 로그 파일에서 직접 메트릭을 읽을 수 있습니다:

- 별도의 프로그래밍 없이 Datadog 표준 로그 형식에서
- 사용자 정의된 로그 파싱 함수를 사용하여 다른 로그 형식에서

### Datadog 표준 로그 형식

Datadog 로그의 형식은 다음과 같습니다:

    metric unix_timestamp value [attribute1=v1 attributes2=v2 ...]

예를 들어, `/var/log/web.log` 내용이 다음과 같다고 가정해보세요:

    me.web.requests 1320786966 157 metric_type=counter unit=request
    me.web.latency 1320786966 250 metric_type=gauge unit=ms

그런 다음 Datadog가 메트릭을 읽는 데 필요한 것은 이 행을 에이전트 설정 파일(일반적으로 `/etc/dd-agent/datadog.conf`에)에 추가하는 것입니다:

    dogstreams: /var/log/web.log

다음과 같이 여러 로그 파일을 지정할 수도 있습니다:

    dogstreams: /var/log/web.log, /var/log/db.log, /var/log/cache.log

### 파싱 커스텀 로그 형식

—벤더 또는 레거시 소프트웨어와 같은— 다른 로그 형식을 파싱하려면 커스텀 파이썬(Python) 함수를 사용하여 에이전트 설정 파일에 다음 형식으로 로그 파일을 지정하여 로그에서 적절한 필드를 추출할 수 있습니다:

    dogstreams: /var/log/web.log:parsers:parse_web

`parsers:parse_web`부분은 커스텀 파이썬(Python) 함수가 에이전트`PYTHONPATH`에 `parsers`라는 패키지에 저장되어 있음을 나타내며 `parsers`패키지에는 `parse_web`라는 함수가 있습니다. 에이전트`PYTHONPATH`는 에이전트 시작 스크립트`/etc/init.d/datadog-agent`의 에이전트 버전에 대한 수퍼바이저 설정에 설정되어 있습니다.

파서가 에이전트`PYTHONPATH`에서 라이브가 **아닌** 경우 대체 구문을 사용하여 라인 파서를 설정할 수 있습니다:

    dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser

이 형식에서 에이전트는 `/path/to/my/parsers_module.py`에서 `custom_parser`가 호출된 함수를 가져오려고 시도합니다.

커스텀 로그 파서가 작동하지 않는 경우 가장 먼저 점검해야 할 것은 에이전트 컬렉터(Collector) 로그입니다:

* 에이전트가 함수를 가져올 수 없는 경우 `Could not load Dogstream line parser`를 찾습니다.

* 모두 잘 작동할 시 `dogstream: parsing {filename} with {function name} (requested {config option text})`를 확인하세요.

<div class="alert alert-warning">
dogstreams이 작동하는지 테스트하려면 에이전트가 모니터링하도록 설정한 기존 로그 파일을 편집할 줄을 추가하지 마세요. 에이전트는 각 로그 파일의 끝 부분만 <a href="/glossary/#tail">추적</a>하므로 파일의 다른 부분에서 변경한 내용을 인식하지 못합니다.
</div>

### 파싱 함수 쓰기

커스텀 파싱 함수는 다음과 같습니다:

- 두 개의 파라미터: 파이썬(Python) 로거 개체(디버깅용)와 파싱할 현재 행의 문자열 파라미터입니다.
- 투플 또는 투플 목록을 반환합니다:

     `(metric (str), timestamp (unix timestamp), value (float), attributes (dict))`

    여기서 특성에는 적어도 metric_type 키를 포함해야 합니다. 지정된 메트릭이 카운터인지 게이지인지 지정합니다.

    줄이 맞지 않으면 `None`를 반환합니다.

### 메트릭 수집

다음과 같이 기록된 고유 문자로 구분된 정규 형식이 아닌 로그에서 메트릭을 수집한다고 가정합니다:

```text
user.crashes|2016-05-28 20:24:43.463930|24|LotusNotes,Outlook,Explorer
```

다음과 같은 로그-파서를 설정하여 Datadog 계정의 이 기록된 데이터에서 메트릭을 수집할 수 있습니다:

```파이썬(Python)

시간 가져오기
날짜시간에서 날짜시간 가져오기
...
def my_log_parser(logger, test):
    metric_name, date, metric_value, extras = line.split('|')
    # 타임스탬프를 가정하여 iso8601 날짜를 유닉스 타임스탬프로 변환
    # 문자열이 파싱하는 시스템과 동일한 시간대에 있습니다.
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
    tags = extras.split(',')
    date = time.mktime(date.timetuple())
    metric_attributes = {
        'tags': tags,
        'metric_type': 'gauge',
    }
    return (metric_name, date, metric_value, metric_attributes)
```

그런 다음, 다음과 같이 dogstream 옵션을 포함하도록 `datadog.conf`를 설정할 수 있습니다:

```text
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# (참고, 윈도우즈(Windows) 사용자는 각 "/"를 이스케이프된 "\\"로 바꿔야 합니다.)
```

이 예에서는 값이 24인 "user.crash"라는 게이지 유형 메트릭을 수집하고 마지막에 이름이 지정된 3개의 애플리케이션으로 태그를 지정합니다.

경고: 동일한 로그 패스에서 동일한 메트릭을 수집할 수 있는 횟수에 제한이 있습니다. 에이전트는 다른 속성(태그 등)이 있더라도 로그된 메트릭을 동일한 메트릭의 후속 제출로 덮어쓰기 시작합니다. 로그에서 수집된 메트릭의 타임스탬프가 충분히 다른 경우에는 이 문제를 다소 완화할 수 있지만 일반적으로 로그에 한 개의 메트릭을 10초 정도에 한 번만 제출하여 수집하는 것을 권장합니다. 이름이 다른 메트릭을 수집할 때는 해당 덮어쓰기는 문제되지 않습니다.

## 파싱 이벤트

이벤트 파싱은 위에서 설명한 것과 동일한 커스텀 파싱 함수를 통해 수행됩니다. 단, 커스텀 파싱 함수에서
`dict`(또는 `dict`의 `list`)를 반환하는 경우 Datadog는 메트릭 대신 이벤트로 처리합니다.

이벤트 필드는 다음과 같습니다(굵은 굵기로 표시하면 필드가 필요함):

| 항목           | 유형        | 값                                                                                                                                                                                                                             |
|-----------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **msg_title**   | 스트링      | 전체 텍스트 검색으로 인덱싱되는 이벤트 제목입니다.                                                                                                                                                                         |
| **timestamp**   | 정수     | 유닉스 에포크 타임스탬프입니다. 생략된 경우 기본적으로 에이전트가 이벤트를 파싱한 시간입니다.                                                                                                                                        |
| **msg_text**    | 스트링      | 이벤트 본문, 전체 텍스트 검색으로 색인화합니다.                                                                                                                                                                           |
| alert_type      | string enum | 이벤트의 심각도를 나타냅니다. `error`, `warning`,`success`또는 `info` 중 하나여야 합니다. 생략된 경우 기본값은 `info`입니다. `alert_type:value`로 검색 가능합니다                                                                  |
| event_type      | 스트링      | 어떤 종류의 이벤트인지 설명합니다. 집계 키의 일부로 사용                                                                                                                                                         |
| aggregation_key | 스트링      | 이벤트가 영향을 준 것을 설명합니다. 집계 키의 일부로 사용                                                                                                                                              |
| host            | 스트링      | 이 이벤트가 시작된 호스트의 이름입니다. 이벤트는 [태깅][1] 페이지 또는 [태깅 API][2]를 사용하여 이 호스트에 지정한 모든 태그로 자동으로 태그가 지정됩니다. 호스트 값은 집계 키의 일부로 사용됩니다. |
| **priority**    | 스트링      | 이벤트가 스트림에서 기본적으로 표시되는지 숨겼는지 여부를 결정합니다. `low` 또는 `normal` 중 하나여야 합니다                                                                                                                      |

24시간 시간 내에 동일한 집계 키를 가진 이벤트는 스트림에서 함께 집계됩니다.
집계 키는 다음 필드의 조합입니다:

- event_type
- aggregation_key
- host

이벤트 파서의 예는 에이전트와 함께 번들로 제공된 [카산드라 압축 이벤트 파서][3]를 참조하세요.

### 이벤트 수집

모든 종류의 관련 정보를 추가할 수 있는 충분한 제어 권한이 있고 고유한 문자로 지능적으로 구분되어 다음과 같이 기록되는 로깅에서 이벤트를 수집한다고 가정합니다:

```text
2016-05-28 18:35:31.164705|Crash_Report|Windows95|A terrible crash happened!|A crash was reported on Joe M's computer|LotusNotes,Outlook,InternetExplorer
```

다음과 같은 로그 파서를 설정하여 Datadog[이벤트 탐색기][4]의 이 기록된 데이터에서 이벤트를 생성할 수 있습니다:

```파이썬(Python)

시간 가져오기
날짜시간에서 날짜시간 가져오기
...
def my_log_parser(logger, line):

    # 선을 필드로 분할
    date, report_type, system, title, message, extras = line.split('|')
    # 추가 태그를 추가로 분할
    tags = extras.split(',')
    # 타임스탬프를 가정하여 iso8601 날짜를 유닉스 타임스탬프로 변환
    # 문자열이 파싱하는 시스템과 동일한 시간대에 있습니다.
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
    date = time.mktime(date.timetuple())
    logged_event = {
        'msg_title': title,
        'timestamp': date,
        'msg_text': message,
        'priority': 'normal',
        'event_type': report_type,
        'aggregation_key': system,
        'tags': tags,
        'alert_type': 'error'
    }
    return logged_event
```

그런 다음 Dogstream 옵션을 다음과 같이 포함하도록 `datadog.conf`을 설정할 수 있습니다:

```text
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# (참고, 윈도우즈(Windows) 사용자는 각 "/"를 이스케이프된 "\\"로 바꿔야 합니다.)
```

이 파서로 파싱된 이 특정 로그 라인은 Datadog에서 다음 이벤트를 생성했습니다:

{{< img src="agent/faq/log_event_in_dd.jpg" alt="Datadog에서 로그 이벤트" style="width:70%;">}}

## 커스텀 파싱 함수로 추가 파라미터 전송

메트릭이나 이벤트를 플랫폼으로 전송하도록 커스텀  파서를 설정한 후에는 `datadog.conf`에서 다음과 같은 작업이 수행되어야 합니다:

```text
dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser
```

그리고 parsers_module.py 함수에서 다음과 같이 정의됩니다:

```python
def custom_parser(logger, line)
```

함수의 패리티를 변경하여 [에이전트 예][5]와 같이 추가 파라미터를 얻을 수 있습니다.

따라서 설정 파일을 다음과 같이 변경할 경우:

```text
dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser:customvar1:customvar2
```

그리고 파싱 함수는 다음과 같습니다:

```python
def custom_parser(logger, line, parser_state, *parser_args):
```

**parser_args**에 parser_args[0] 및 parser_args[1]을 사용하여 코드에서 사용할 준비가 된 튜플 파라미터(`<CUSTOM_VAR_1>`, `<CUSTOM_VAR_2>`)가 있습니다.

**참고**: 파라미터 **parser_state**를 사용할 필요는 없지만 함수의 서명에 있어야 합니다. 그리고 파라미터가 하나뿐이라면 **parser_args[1]**를 사용해야 얻을 수 있습니다.

예를 들어, 설명서와 동일한 파서가 있지만, 이번에는 로그에서 메트릭 이름을 추출하지 않고 이 파라미터로 인해 설정할 경우:

설정 파일에는 다음이 있습니다:

```text
dogstreams: /Users/Documents/Parser/test.log:/Users/Documents/Parser/myparser.py:parse_web:logmetric
```

## 트러블슈팅

버그가 발생하므로 로그 파서에서 역추적을 볼 수 있는 것이 중요합니다. [에이전트 로그][6]를 "디버그" 수준으로 설정한 상태에서 에이전트를 실행하는 경우 이 작업을 수행할 수 있습니다. [라인][7]을 제거하고 편집한 다음 [에이전트 재시작][8]을 사용하여 `datadog.conf`에서 에이전트의 로그 수준을 설정할 수 있습니다. 올바르게 설정되면 커스텀 로그 파서의 오류로 인한 추적을 `collector.log`파일에서 찾을 수 있으며 일반적으로 문자열 checks.collector(datadog.py:278)가 포함됩니다. | 줄을 파싱하는 동안 발생한 오류입니다 (오류가 발생할 가능성이 있는 [에이전트 코드][9] 참조).

**참고**: 커스텀 로그 파서를 변경할 때마다 [에이전트 재시작][8]을 실행하세요.

커스텀 로그 파서 함수의 범위를 넘어서는 오류가 발생할 것으로 의심되는 경우에는 [지원팀으로 연락][10]하세요. 먼저 에이전트의 로그 수준을 "디버그"로 설정하고 새 로그가 파일에 추가되는지 확인하면서 몇 분 동안 에이전트를 실행한 다음 에이전트로부터 [플레어 명령을 실행][11]하세요. 이를 통해 문제를 효과적으로 해결하는 데 필요한 정보를 지원 팀에 제공할 수 있습니다.

[1]: https://app.datadoghq.com/infrastructure#tags
[2]: /ko/api/v1/tags/
[3]: https://github.com/DataDog/dd-agent/blob/master/dogstream/cassandra.py
[4]: /ko/events/
[5]: https://github.com/DataDog/dd-agent/blob/5.13.x/checks/datadog.py#L210
[6]: /ko/agent/configuration/agent-log-files/
[7]: https://github.com/DataDog/dd-agent/blob/5.7.x/datadog.conf.example#L211
[8]: /ko/agent/configuration/agent-commands/
[9]: https://github.com/DataDog/dd-agent/blob/5.7.x/checks/datadog.py#L278
[10]: /ko/help/
[11]: /ko/agent/troubleshooting/send_a_flare/
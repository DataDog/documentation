---
code_lang: 파이썬(Python)
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: GitHub
  text: 소스 코드
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: Pypi
  text: API 설명서
- link: /tracing/trace_collection/trace_context_propagation/python/
  tag: 설명서
  text: 트레이스 컨텍스트 전파
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스, 트레이스 탐색
- link: tracing/
  tag: 고급 사용
  text: 고급 사용
title: 파이썬(Python) 추적 라이브러리 설정하기
type: multi-code-lang
---

코드로 추적 라이브러리를 설정한 다음 에이전트를 설정하여 애플리케이션 성능 모니터링(APM) 데이터를 수집합니다. 옵션으로 [통합 서비스 태깅][1] 설정 등, 원하는 대로 추적 라이브러리를 설정합니다.

**ddtrace-run**을 사용하는 경우 다음 [환경 변수 옵션][2]을 사용할 수 있습니다.

`DD_TRACE_DEBUG`
: **기본값**: `false`<br>
트레이서에서 디버그 로깅을 활성화합니다.

`DD_PATCH_MODULES`
: 이 애플리케이션 실행에 대해 패치된 모듈을 재정의합니다. 다음 형식을 따릅니다. `DD_PATCH_MODULES=module:patch,module:patch...`

서비스를 위해 `env`, `service` 및 `version`을 설정하는 데 `DD_ENV`, `DD_SERVICE` 및 `DD_VERSION`를 사용할 것을 권장합니다. [통합 서비스 태깅][1] 설명서를 참조하여 이러한 환경 변수 설정 방법에 대한 권장 사항을 확인하세요.

`DD_ENV`
: 애플리케이션 환경을 설정합니다. 예: `prod`, `pre-prod`, `staging`. [환경 설정 방법][3]에서 자세히 알아보세요. 버전 0.38 이상에서 사용할 수 있습니다.

`DD_SERVICE`
: 이 애플리케이션에서 사용되는 서비스 이름입니다. Pylons, Flask 또는 Django와 같은 웹 프레임워크 통합을 위한 미들웨어를 설정할 때 통과된 값입니다. 웹 통합 없이 추적하려면 서비스 이름을 코드로 설정하는 것이 좋습니다([예를 들어 Django 문서를 참조하세요][4]). 버전 0.38 이상에서 사용할 수 있습니다.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **기본값**: `tracecontext,Datadog`<br>
추적 헤더를 삽입할 때 사용하는 전파 방식입니다. 예를 들어 `DD_TRACE_PROPAGATION_STYLE_INJECT=Datadog,B3`를 사용하여 Datadog 및 B3 형식 모두에 삽입할 수 있습니다.

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **기본값**:  `DD_TRACE_PROPAGATION_STYLE_INJECT`(`tracecontext,Datadog`)<br> 값입니다.
추적 헤더 추출 시 사용하는 전파 방식입니다. 여러 값이 제공되면 검색된 첫 번째 헤더 일치 항목을 사용합니다. 매칭 순서는 제공된 값 순서입니다. 예를 들어, `DD_TRACE_PROPAGATION_STYLE_EXTRACT=B3,Datadog`는 `B3` 헤더를 먼저 찾고 해당 헤더를 사용할 수 없는 경우에만 `Datadog` 헤더를 사용합니다. 

`DD_SERVICE_MAPPING`
: 트레이스에서 서비스 이름을 바꾸는 것을 허용하려면 서비스 이름 매핑을 정의하세요. 예: `postgres:postgresql,defaultdb:postgresql`. 버전 0.47 이상에서 사용할 수 있습니다.

`DD_VERSION`
: 애플리케이션 버전을 설정합니다. 예: `1.2.3`, `6c44da20`, `2020.02.13`. 버전 0.38 이상에서 사용할 수 있습니다.

`DD_TRACE_SAMPLE_RATE`
: 트레이스 볼륨 제어를 활성화합니다.

`DD_TRACE_SAMPLING_RULES`
: **기본값**: `[]`<br>
JSON 개체 어레이입니다. 각 개체에는 `"sample_rate"`이 있어야 합니다. `"name"` 및 `"service"` 필드는 선택 항목입니다. `"sample_rate"` 값은  `0.0`~`1.0`(포함)이어야 합니다. 규칙은 트레이스의 샘플 비율을 결정하기 위해 설정된 순서로 적용됩니다. 

`DD_TRACE_RATE_LIMIT`
:  파이썬(Python) 프로세스별로 초당 샘플링하기 위한 최대 스팬 개수입니다 . 기본값은  `DD_TRACE_SAMPLE_RATE`이 설정된 경우 `100`입니다. 또는 비율 제한을 Datadog 에이전트에 위임할 수 있습니다.

`DD_SPAN_SAMPLING_RULES`
: **기본값**: `[]`<br>
SON 개체 어레이입니다. 스팬의 샘플 비율을 결정하기 위해 규칙은 설정된 순서로 적용됩니다. `sample_rate` 값은 0.0~1.0(포함)이어야 합니다.
자세한 정보는 [수집 메커니즘][5]을 참조하세요.<br>
**예:**<br>
  - 다음과 같이 서비스 `my-service` 및 작업 이름 `http.request`의 스팬(span) 샘플 속도를 50%로 설정하고, 최대 초당 50 트레이스로 설정합니다: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`


`DD_TAGS`
: 모든 스팬과 프로파일에 추가되는 기본 태그 목록입니다 예: `layer:api,team:intake,key:value`. 0.38 버전 이상에서 사용할 수 있습니다.

`DD_TRACE_HEADER_TAGS`
: **기본값**: `null`<br>
루트 스팬에서 태그로 보고된 헤더 이름의 쉼표로 구분된 목록입니다. 예: `DD_TRACE_HEADER_TAGS="User-Agent:http.user_agent,Referer:http.referer,Content-Type:http.content_type,Etag:http.etag"`.

`DD_TRACE_ENABLED`
: **기본값**: `true`<br>
웹 프레임워크 및 라이브러리 계측을 활성화합니다. `false`의 경우 애플리케이션 코드는 트레이스를 생성하지 않습니다.

`DD_AGENT_HOST`
: **기본값**: `localhost`<br>
기본 트레이서가 트레이스를 전송하려는 트레이스 에이전트 호스트의 주소를 재정의합니다.

`DD_AGENT_PORT`
: **기본값**: `8126`<br>
기본 트레이서가 트레이스를 전송하는 포트를 재정의합니다. [에이전트 설정][13]에서 `receiver_port` 또는  `DD_APM_RECEIVER_PORT`를 기본값 `8126` 외 다른 값으로 설정하면 `DD_AGENT_PORT` 또는 `DD_TRACE_AGENT_URL`이 일치해야 합니다.

`DD_TRACE_AGENT_URL`
: 트레이서가 제출하는 트레이스 에이전트의 URL입니다. 설정되면, 호스트 이름 및 포트보다 우선순위를 갖습니다.  Datadog 에이전트에서 설정된 `datadog.yaml` 파일 또는 `DD_APM_RECEIVER_SOCKET` 환경 변수에서 `apm_config.receiver_socket` 설정과 결합된 UDS(Unix Domain Socket)를 지원합니다. 예를 들어, HTTP URL을 위한 `DD_TRACE_AGENT_URL=http://localhost:8126` 및 UDS를 위한 `DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket`이 있습니다. [에이전트 설정][13]은 `receiver_port` 또는 `DD_APM_RECEIVER_PORT`를 기본값 `8126` 외 다른 값으로 설정하면  `DD_AGENT_PORT` 또는 `DD_TRACE_AGENT_URL`이 일치해야 합니다. 

`DD_DOGSTATSD_URL`
: DogStatsD 메트릭을 위한 Datadog 에이전트에 연결하는 데 사용되는 URL입니다. 설정된 경우 호스트 이름과 포트 대비 우선순위를 갖습니다. Datadog 에이전트에 설정된 `datadog.yaml` 파일 또는 `DD_DOGSTATSD_SOCKET` 환경 변수에서 `dogstatsd_socket` 설정과 결합된 USD(Unix Domain Socket)을 지원합니다. 예를 들어 UDP URL을 위한 `DD_DOGSTATSD_URL=udp://localhost:8126` 및 UDS를 위한 `DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket`가 있습니다. [에이전트 설정][13]에서  `dogstatsd_port` 또는 `DD_DOGSTATSD_PORT`를 기본값 `8125` 외 다른 값으로 설정하면, 트레이싱 라이브러리 `DD_DOGSTATSD_URL` 또는 `DD_DOGSTATSD_PORT`가 일치해야 합니다.

`DD_DOGSTATSD_HOST`
: **기본값**: `localhost`<br>
기본 트레이서가 DogStatsD 메트릭을 전송하려는 트레이스 에이전트 호스트의 주소를 재정의합니다.  `DD_DOGSTATSD_HOST`를 재정의하려면 `DD_AGENT_HOST`를 사용합니다.

`DD_DOGSTATSD_PORT`
: **기본값**: `8125`<br>
기본 트레이서가 DogStatsD 메트릭을 제출하려는 포트를 재정의합니다. [에이전트 설정][13]에서 `dogstatsd_port` 또는 `DD_DOGSTATSD_PORT`를 기본값 `8125` 외 다른 값으로 설정하면, 이 추적 라이브러리   `DD_DOGSTATSD_PORT` 또는 `DD_DOGSTATSD_URL`이 일치해야 합니다.

`DD_LOGS_INJECTION`
: **기본값**: `false`<br>
 [로그 및 트레이스 수집 연결][6]을 활성화합니다.



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /ko/tracing/guide/setting_primary_tags_to_scope/
[4]: https://ddtrace.readthedocs.io/en/stable/integrations.html#django
[5]: /ko/tracing/trace_pipeline/ingestion_mechanisms/
[6]: /ko/tracing/other_telemetry/connect_logs_and_traces/python/
[13]: /ko/agent/configuration/network/#configure-ports
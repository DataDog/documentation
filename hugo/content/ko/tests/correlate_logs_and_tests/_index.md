---
description: 로그와 테스트 트레이스를 상호 연결하세요.
further_reading:
- link: /tests
  tag: 설명서
  text: Test Optimization에 대해 알아보기
title: 로그와 테스트 상호 연결
---
## 개요 {#overview}

Test Optimization 데이터를 [Datadog에 주입된 로그][1]와 상호 연결하여 특정 테스트 사례에 대한 로그를 확인하고 분석할 수 있습니다.

{{< img src="continuous_integration/correlate_logs_and_tests.png"
  alt="로그와 테스트의 상관관계를 활용하여 특정 테스트 사례의 로그를 검토하세요." style="width:90%" >}}

## 설정 {#setup}

상관관계는 [테스트 데이터를 Datadog으로 전송][2]하는 방식에 따라 다르게 구성할 수 있습니다.

{{< tabs >}}
{{% tab "클라우드 CI 공급자(Agentless)" %}}

### Java {#java}

Agentless 로그 전송은 다음 언어 및 프레임워크에서 지원됩니다.

-   `dd-trace-java >= 1.35.2` 및 Log4j2

다음 환경 변수를 사용하여 Agentless 로그 전송을 활성화하고 구성합니다.

| 이름                                                | 설명                                 | 기본값 |
| --------------------------------------------------- | ------------------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED`(필수)    | 로그 전송 활성화/비활성화             | `false`       |
| `DD_AGENTLESS_LOG_SUBMISSION_LEVEL`(선택 사항)      | Agentless 전송을 위한 로그 수준 설정     | `INFO`        |
| `DD_AGENTLESS_LOG_SUBMISSION_QUEUE_SIZE`(선택 사항) | 대기 중인 로그 큐의 최대 크기 설정 | `1024`        |
| `DD_AGENTLESS_LOG_SUBMISSION_URL`(선택 사항)        | 로그 전송을 위한 사용자 지정 URL 설정         | -             |

### JavaScript/TypeScript {#javascripttypescript}

Agentless 로그 전송은 다음 트레이서 버전 및 로깅 라이브러리에서 지원됩니다.

v4 릴리스 라인의 - `dd-trace-js v4.48.0 이상` 또는 v5 릴리스 라인의 `dd-trace-js v5.24.0 이상`(`winston` 포함)
v5 릴리스 라인의 - `dd-trace-js v5.124.0 이상` 또는 v6 릴리스 라인의 `dd-trace-js v6.13.0 이상`(`pino` 또는 `bunyan` 포함)

다음 환경 변수를 사용하여 Agentless 로그 전송을 활성화하고 구성합니다.

| 이름                                             | 설명                         | 기본값 |
| ------------------------------------------------ | ----------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED`(필수) | 로그 전송 활성화/비활성화     | `false`       |
| `DD_AGENTLESS_LOG_SUBMISSION_URL`(선택 사항)     | 로그 전송을 위한 사용자 지정 URL 설정 | -             |

### .NET {#net}

Agentless 로그 전송은 다음 언어 및 프레임워크에서 지원됩니다.

-   `dd-trace-dotnet >= 2.50.0` 및 XUnit TestOutputHelper.

다음 환경 변수를 사용하여 Agentless 로그 전송을 활성화하고 구성합니다.

| 이름                                      | 설명                                   | 기본값 |
| ----------------------------------------- | --------------------------------------------- | ------------- |
| `DD_CIVISIBILITY_LOGS_ENABLED`(필수) | CI Visibility 로그 전송 활성화/비활성화 | `false`       |

### Swift {#swift}

다음 환경 변수를 사용하여 로그 전송을 활성화하고 구성합니다.

| 이름                               | 설명                            | 기본값 |
| ---------------------------------- | -------------------------------------- | ------------- |
| `DD_ENABLE_STDOUT_INSTRUMENTATION` | stdout 로그 전송 활성화/비활성화 | `false`       |
| `DD_ENABLE_STDERR_INSTRUMENTATION` | stderr 로그 전송 활성화/비활성화 | `false`       |

### Python {#python}

요구 사항: `ddtrace >= 4.8.0`.

로그 전송은 pytest 테스트 프레임워크에서 지원되며, 표준 라이브러리 `logging` 모듈을 통해 로그가 출력되는 경우에만 지원됩니다.

다음 환경 변수를 사용하여 Agentless 로그 전송 모드를 활성화합니다.

| 이름                                             | 설명                     | 기본값 |
| ------------------------------------------------ | ------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED`(필수) | 로그 전송 활성화/비활성화 | `false`       |

Agentless 모드 대신 **Datadog Agent**를 사용하는 경우, 환경에서 `DD_LOGS_INJECTION=true`를 설정합니다.

#### 외부 프로세스 로그 {#out-of-process-logs}

별도의 프로세스에서 테스트로 트리거된 코드를 실행할 때, 로그를 상호 연결하려면 해당 테스트 트레이스의 `trace_id` 및 `span_id`가 필요합니다. `ddtrace.testing.logs.DDTestLogsHandler`(`ddtrace >= 4.11.0`)를 사용하여 해당 로그 레코드를 Datadog 로그 수집기로 전송하고, 기존 테스트 트레이스와 상호 연결합니다.

`DDTestLogsHandler`는 백엔드(Agentless 또는 EVP 프록시)를 감지하기 위해 pytest 플러그인과 동일한 환경 변수를 읽습니다. 해당 변수를 사용할 수 있는 모든 하위 프로세스에서 사용 가능합니다.

**Agentless 모드**(`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` 설정):

| 변수     | 설명     | 기본값         |
| ------------ | --------------- | --------------- |
| `DD_API_KEY` | Datadog API 키 | (필수)      |
| `DD_SITE`    | Datadog 사이트    | `datadoghq.com` |

**Agent/EVP proxy 모드**(기본값):

| 변수                  | 설명    | 기본값     |
| ------------------------- | -------------- | ----------- |
| `DD_TRACE_AGENT_URL`      | 전체 Agent URL | -           |
| `DD_TRACE_AGENT_HOSTNAME` | Agent 호스트 이름 | `localhost` |
| `DD_TRACE_AGENT_PORT`     | Agent 포트     | `8126`      |

##### 작업자당 스레드 {#thread-per-worker}

테스트 작업자당 하나의 스레드를 지정하려면 `ThreadLocalCorrelationFilter`를 사용하여 각 스레드의 로그 레코드를 올바른 테스트 트레이스와 상호 연결합니다.

```python
import logging
from ddtrace.testing.logs import DDTestLogsHandler, ThreadLocalCorrelationFilter

with DDTestLogsHandler(service="my-service") as handler:
    correlation = ThreadLocalCorrelationFilter()
    handler.addFilter(correlation)
    logging.getLogger().addHandler(handler)

    while True:
        job = queue.get()  # queue and run_test are provided by your worker framework
        correlation.set_context(trace_id=job.trace_id, span_id=job.span_id)
        run_test(job.item)
```

`DDTestLogsHandler`는 컨텍스트 관리자로 사용할 경우 버퍼링된 레코드를 자동으로 플러시합니다. 컨텍스트 관리자 형식을 사용하지 않는 경우 `handler.close()`를 호출합니다.

##### Asyncio 작업자 {#asyncio-workers}

Asyncio 기반 작업자의 경우, 스레드 로컬 스토리지가 `asyncio.Task` 경계를 넘어 전파되지 않으므로 `ThreadLocalCorrelationFilter`는 asyncio 기반 작업자와 호환되지 않습니다. `CorrelationFilter` 클래스를 상속하고 대신 `contextvars.ContextVar`를 사용합니다. 이벤트 루프는 `await` 경계를 넘어 자동으로 전파됩니다.

```python
import asyncio
import contextvars
import logging
from ddtrace.testing.logs import CorrelationFilter, DDTestLogsHandler

class ContextVarCorrelationFilter(CorrelationFilter):
    def __init__(self):
        super().__init__()
        self._trace_id = contextvars.ContextVar("dd_trace_id", default=None)
        self._span_id = contextvars.ContextVar("dd_span_id", default=None)

    def set_context(self, trace_id, span_id):
        self._trace_id.set(trace_id)
        self._span_id.set(span_id)

    def get_trace_id(self):
        return self._trace_id.get()

    def get_span_id(self):
        return self._span_id.get()

async def run_one(job, correlation):
    correlation.set_context(trace_id=job.trace_id, span_id=job.span_id)
    await run_test(job.item)

async def main(jobs):
    with DDTestLogsHandler(service="my-service") as handler:
        correlation = ContextVarCorrelationFilter()
        handler.addFilter(correlation)
        logging.getLogger().addHandler(handler)
        await asyncio.gather(*(run_one(job, correlation) for job in jobs))
```

### Ruby {#ruby}

Rails 애플리케이션에서는 Test Optimization을 통한 에이전트리스 로그 전송이 지원됩니다. 활성화하기 전에
애플리케이션이 [Datadog 트레이싱으로 계측][1]되었는지 확인하세요.

Agentless 로그 전송을 사용하려면 `datadog-ci` 버전 `0.16` 이상이 필요합니다. 다음과 같은 로깅 라이브러리가 지원됩니다.

-   `activesupport >= 5.0`(`ActiveSupport::TaggedLogging`을 사용하는 경우에만)
-   `lograge >= 0.14`
-   `semantic_logger >= 4.0`

다음 환경 변수를 사용하여 로그 전송을 활성화합니다.

| 이름                                             | 설명                     | 기본값 |
| ------------------------------------------------ | ------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED`(필수) | 로그 전송 활성화/비활성화 | `false`       |

[1]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#rails-or-hanami-applications

{{% /tab %}}
{{% tab "온-프레미스 CI 공급자(Datadog Agent)" %}}

1. Datadog Agent를 통해 [로그 수집 설정][1]을 진행합니다.
2. [로그 및 트레이스 상호 연결][2]에 명시된 단계를 따릅니다.

[1]: /ko/logs/log_collection/
[2]: /ko/tracing/other_telemetry/connect_logs_and_traces/

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_collection/
[2]: /ko/tests/setup/
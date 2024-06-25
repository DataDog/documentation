---
further_reading:
- link: /getting_started/tagging/unified_service_tagging/
  tag: 설명서
  text: 통합 서비스 태깅에 대해 알아보기
- link: /tracing/other_telemetry/connect_logs_and_traces
  tag: 설명서
  text: 로그 및 트레이스 연결
- link: /real_user_monitoring/platform/connect_rum_and_traces/
  tag: 설명서
  text: RUM & 세션 리플레이 및 트레이스 연결하기
- link: /synthetics/apm/
  tag: 설명서
  text: 신서틱(Synthetic) 테스트 및 트레이스 연결하기
kind: 지침
title: 제품 간 상호 연결로 쉬운 트러블슈팅
---

## 개요

[통합 서비스 태깅][1]으로 높은 수준의 상호 연관 기능을 지원합니다. 조사의 시작점은 싱글 로그, 트레이스, 보기 또는 신서틱(Synthetic) 테스트가 될 수도 있습니다. 로그, 트레이스, 보기를 다른 데이터와 상호 연관시키면 비즈니스 영향을 예측하고 문제의 근본 원인을 빠르게 파악하는 데 유용한 컨텍스트를 얻을 수 있습니다.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/full-stack-cover.png" alt="풀스택 상호연결" style="width:100%;" >}}

본 지침에서는 풀스택 데이터를 상호 연관시키는 방법을 알아봅니다. 사용 사례에 따라 아래의 특정 단계를 건너뛸 수도 있습니다. 다른 단계에 종속된 단계는 명확하게 설명되어 있습니다.

1. [서버측 로그와 트레이스 상호 연결하기](#correlate-server-side-logs-with-traces)
   * [애플리케이션 로그 상호 연결하기](#correlate-application-logs)
   * [프록시 로그 상호 연결하기](#correlate-proxy-logs)
   * [데이터베이스 로그 상호 연결하기](#correlate-database-logs)
2. [프론트엔드 제품 상호 연결하기](#correlate-frontend-products)
   * [브라우저 로그와 RUM 상호 연결하기](#correlate-browser-logs-with-rum)
3. [사용자 경험과 서버 동작을 상호 연결하기](#correlate-user-experience-with-server-behavior)
   * [RUM 보기와 트레이스 상호 연결하기](#correlate-rum-views-with-traces)
   * [트레이스 상호 연결 기능을 활용하여 신서틱 테스트 트러블슈팅](#leverage-trace-correlation-to-troubleshoot-synthetic-tests)

## 서버측 로그와 트레이스 상호 연결하기

사용자가 애플리케이션 사용 중에 오류가 발생하거나 레이턴시가 높아지는 경우, 문제가 있는 요청의 특정 로그를 살펴보면 문제의 원인을 정확히 파악할 수 있습니다. 특정 요청과 관련된 모든 로그를 취합하면 요청이 처음부터 끝까지 어떻게 처리되었는지 자세히 확인할 수 있으므로 문제를 신속하게 진단할 수 있습니다.

로그와 트레이스를 상호 연결하면 `trace_id`을 사용하여 [엔티티 수준의 일관성을 유지하는 공격적인 샘플링 전략][2]을 쉽게 구사할 수 있습니다.

[애플리케이션 로그 상호 연관](#correlate-application-logs) 기능은 스택 전반에서 광범위한 가시성을 제공해 드리지만, 일부 특정 사용 사례의 경우 스택에 더 복잡한 상관관계가 필요합니다. 다음 링크를 눌러서 사용 사례별 설정을 완료하세요.

* [프록시 로그 상호 연결하기](#correlate-proxy-logs)
* [데이터베이스 로그 상호 연결하기](#correlate-database-logs)

### 애플리케이션 로그 상호 연결하기

#### 이런 작업을 왜 하나요?

애플리케이션 로그는 코드 및 비즈니스 로직 문제 대부분에 대한 컨텍스트를 제공합니다. 심지어 다른 서비스 문제를 해결할 수도 있습니다(예: 대부분의 ORM 로그 데이터베이스 오류).

#### 어떻게 작동할까요?

[다양한 OOTB 상호 연결][3] 중 하나를 활용합니다. 커스텀 트레이서를 사용하거나 문제가 있는 경우 [상호 연결 FAQ][4]를 참고하세요.

### 프록시 로그 상호 연결하기

#### 이런 작업을 왜 하나요?

프록시 로그는 애플리케이션 로그보다 더 많은 정보를 제공합니다. 또한 정적 콘텐츠와 리디렉션에 대한 정보를 제공하며 더 폭넓은 엔트리 포인트를 다룹니다.

#### 어떻게 작동할까요?

애플리케이션 트레이서는 기본적으로 트레이스 ID를 생성합니다. 이는 HTTP 요청 헤더에 `x-datadog-trace-id`을 삽입하여 변경할 수 있습니다.

#### NGINX

##### 오픈트레이싱 설정

[NGINX 트레이싱 통합][5]을 참조하세요.

##### 로그에 트레이스 ID 삽입

트레이스 ID는 `opentracing_context_x_datadog_trace_id` 변수로 저장됩니다. NGINX 설정 파일 `/etc/nginx/nginx.conf`의 HTTP 섹션에 다음 설정 블록을 추가하여 NGINX 로그 형식을 업데이트합니다.

```conf
http {
  log_format main '$remote_addr - $opentracing_context_x_datadog_trace_id $http_x_forwarded_user [$time_local] "$request" '
          '$status $body_bytes_sent "$http_referer" '
          '"$http_user_agent" "$http_x_forwarded_for" ';

  access_log /var/log/nginx/access.log;
}
```

##### 파이프라인에서 트레이스 ID 파싱

1. NGINX 파이프라인을 복제합니다.

2. 첫 번째 [grok 파서][6]를 사용자 지정합니다.
   - **파싱 규칙**에서 첫 번째 파싱 규칙을 다음과 같이 바꿉니다.
   ```text
   access.common %{_client_ip} %{_ident} %{_trace_id} %{_auth} \[%{_date_access}\] "(?>%{_method} |)%{_url}(?> %{_version}|)" %{_status_code} (?>%{_bytes_written}|-)
   ```
   - **도움말 규칙**의 **고급 설정**에서 다음 코드를 추가합니다.
   ```text
   _trace_id %{notSpace:dd.trace_id:nullIf("-")}
   ```

3. `dd.trace_id` 속성에 [트레이스 ID 리매퍼(remapper)][7]를 추가합니다.

### 데이터베이스 로그 상호 연결하기

#### 이런 작업을 왜 하나요?

로그 데이터베이스는 쿼리 유사성, 다양한 익명화 작업, 높은 사용량으로 인해 컨텍스트 파악이 어려운 경우가 많습니다.

예를 들어, 프로덕션 속도가 느린 쿼리는 시간과 리소스를 많이 투자하지 않으면 재현 및 분석이 어렵습니다. 다음은 속도가 느린 쿼리 분석을 트레이스와 상호 연관시키는 방법의 예시입니다.

#### 어떻게 작동할까요?

#### PostgreSQL

##### 데이터베이스 로그 보강하기

PostgreSQL 기본 로그는 상세하지 않습니다. [본 통합 지침][8]를 참조하여 보강하세요.

속도가 느린 쿼리 모범 사례에서는 속도가 느린 구문 실행 계획을 자동으로 로깅할 것을 제안하기에 `EXPLAIN`을 직접 실행하지 않아도 됩니다. `EXPLAIN`을 자동으로 실행하려면 다음과 같이 `/etc/postgresql/<VERSION>/main/postgresql.conf`으로 업데이트하세요.

```conf
session_preload_libraries = 'auto_explain'
auto_explain.log_min_duration = '500ms'
```

500ms보다 긴 쿼리는 실행 계획을 로깅합니다.

**참고**: `auto_explain.log_analyze = 'true'`은 더 많은 정보를 제공해 드리지만 성능에 큰 영향을 미칩니다. 자세한 내용을 확인하려면 [공식 문서][9]를 참조하세요.

##### 데이터베이스 로그에 trace_id를 삽입합니다.

`trace_id`을 [SQL 주석][10]과 같이 데이터베이스 로그 대부분에 삽입합니다. 다음은 Flask와 SQLAlchemy를 사용한 예제입니다.

```python
if os.environ.get('DD_LOGS_INJECTION') == 'true':
    from ddtrace import tracer
    from sqlalchemy.engine import Engine
    from sqlalchemy import event

    @event.listens_for(Engine, "before_cursor_execute", retval=True)
    def comment_sql_calls(conn, cursor, statement, parameters, context, executemany):
        trace_ctx = tracer.get_log_correlation_context()
        statement = f"{statement} -- dd.trace_id=<{trace_ctx['trace_id']}>"
        return statement, parameters
```

**참고**: 쿼리 구문이 포함된 로그만 상호 연결됩니다. `ERROR:  duplicate key value violates unique constraint "<TABLE_KEY>"` 과 같은 로그 오류는 컨텍스트에서 벗어납니다. 대부분 애플리케이션 로그를 통해 오류 정보를 얻을 수 있습니다.

다음과 같이 PostgreSQL 파이프라인을 복제하고 사용자 지정합니다.

1. 신규 [grok 파서][6]를 추가합니다.
   ```text
   extract_trace %{data}\s+--\s+dd.trace_id=<%{notSpace:dd.trace_id}>\s+%{data}
   ```

2. `dd.trace_id` 속성에 [트레이스 ID 리매퍼(remapper)][7]를 추가합니다.

다음은 속도가 느린 트레이서에서의 느린 쿼리 실행 계획의 예시입니다.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/slow-query-root-cause.png" alt="느린 쿼리 로그 상호 연결" style="width:100%;" >}}

## 프런트엔드 제품 상호 연결

### 브라우저 로그를 RUM & 세션 리플레이와 상호 연결하기

#### 이런 작업을 왜 하나요?

RUM 이벤트 내부 [브라우저 로그][11]는 문제에 관한 컨텍스트와 통찰을 제공합니다. 다음 예시에서 브라우저 로그는 잘못된 쿼리의 근본 원인이 유효하지 않은 사용자 ID임을 나타냅니다.

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/browser-logs-in-rum.png" alt="RUM 작업의 브라우저 로그" style="width:100%;" >}}

브라우저 로그와 RUM을 상호 연결하면 `session_id` 및 `view.id` 등의 속성을 사용하여 [엔티티 수준의 일관성을 유지하는 공격적인 샘플링 전략][2]을 쉽게 구사할 수 있습니다.

#### 어떻게 작동할까요?

브라우저 로그와 RUM 이벤트는 자동으로 상호 연결됩니다. 자세한 내용을 확인하려면 [RUM & 세션 리플레이 빌링][12]를 참조하세요. [RUM 브라우저 SDK와 로그 SDK의 설정을 일치][13]시켜야 합니다.

## 사용자 경험과 서버 동작을 상호 연결하기

기존의 백엔드와 프론트엔드 모니터링은는 사일로화되어 있어 스택 전반의 문제를 해결하려면 별도의 워크플로우가 필요할 수도 있습니다. Datadog 풀스택 상호 연관 기능을 사용하면 브라우저 문제든 데이터베이스 다운타임이든 문제의 근본 원인을 알아내어 사용자에게 미치는 영향을 파악할 수 있습니다.

본 섹션에서는 이러한 상호 연관을 활성화하는 방법을 알아봅니다.

* [RUM 보기와 트레이스 상호 연결하기](#correlate-rum-views-with-traces)
* [트레이스 상호 연결 기능을 활용하여 신서틱 테스트 트러블슈팅](#leverage-trace-correlation-to-troubleshoot-synthetic-tests)

### RUM 보기와 트레이스 상호 연결하기

#### 이런 작업을 왜 하나요?

RUM & 세션 리플레이가 포함된 애플리케이션 성능 모니터링(APM) 통합으로 다음과 같이 프론트엔드 및 백엔드 데이터를 하나의 렌즈에서 확인할 수 있습니다.

* 프론트엔드를 포함한 스택의 모든 곳에서 문제를 빠르게 파악합니다.
* 사용자의 경험을 완전히 이해합니다.

#### 어떻게 작동할까요?

[트레이스 탐색기][14] 및 [RUM 탐색기][15]의 애플리케이션 성능 모니터링(APM) 트레이스에서 RUM 보기에 액세스할 수 있습니다. 자세한 내용을 확인하려면 [RUM 및 트레이스 연결][16]을 참조하세요. 

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/trace-details-rum.png" alt="트레이서의 RUM 정보" style="width:100%;" >}}

RUM 보기와 서버 로그 사이에는 직접적 상관관계가 없습니다. 로그의 RUM 이벤트와 RUM 이벤트의 로그를 확인하려면 **트레이스** 탭을 클릭합니다. 

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/rum-action-server-logs.png" alt="RUM 작업 트레이스 미리보기의 로그" style="width:100%;" >}}

### 트레이스 상호 연결 기능을 활용하여 신서틱 테스트 트러블슈팅

#### 이런 작업을 왜 하나요?

신서틱(Synthetic) 모니터링을 활용한 애플리케이션 성능 모니터링(APM) 통합 기능을 사용하면 테스트를 실행하여 생성한 트레이스로 테스트 실행 실패 문제의 근본 원인을 알아낼 수 있습니다

{{< img src="logs/guide/ease-troubleshooting-with-cross-product-correlation/synthetic-trace-root-cause.png" alt="신서틱 테스트 실패의 근본 원인" style="width:100%;" >}}

백엔드, 인프라스트럭처, 트레이스의 로그 정보, RUM 이벤트([브라우저 테스트][17]만 해당)와 테스트의 네트워크 관련 세부 정보가 있으면 애플리케이션의 동작 및 사용자 경험에 대한 추가 세부 정보에 접근할 수 있습니다.

#### 어떻게 작동할까요?

애플리케이션의 엔드포인트에서 애플리케이션 성능 모니터링(APM)을 활성화한 다음 [신서틱(Synthetic) 모니터링 & 지속적 테스트 페이지][18]에서 애플리케이션 성능 모니터링(APM) 트레이스에 접근합니다.

자세한 내용을 확인하려면 [신서틱 테스트 및 트레이스 연결][19]을 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/unified_service_tagging
[2]: /ko/logs/indexes/#sampling-consistently-with-higher-level-entities
[3]: /ko/tracing/other_telemetry/connect_logs_and_traces
[4]: /ko/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
[5]: /ko/tracing/trace_collection/proxy_setup/?tab=nginx
[6]: /ko/logs/log_configuration/processors/#grok-parser
[7]: /ko/logs/log_configuration/processors/#trace-remapper
[8]: /ko/integrations/postgres/?tab=host#log-collection
[9]: https://www.postgresql.org/docs/13/auto-explain.html
[10]: https://www.postgresql.org/docs/13/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
[11]: /ko/logs/log_collection/javascript/
[12]: /ko/account_management/billing/rum/#how-do-you-view-logs-from-the-browser-collector-in-rum
[13]: /ko/real_user_monitoring/browser/setup/#initialization-parameters
[14]: https://app.datadoghq.com/apm/traces
[15]: https://app.datadoghq.com/rum/explorer
[16]: /ko/real_user_monitoring/platform/connect_rum_and_traces
[17]: /ko/synthetics/browser_tests/
[18]: https://app.datadoghq.com/synthetics/tests
[19]: /ko/synthetics/apm
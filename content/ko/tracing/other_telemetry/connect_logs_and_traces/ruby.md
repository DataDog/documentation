---
aliases:
- /ko/tracing/connect_logs_and_traces/ruby
code_lang: 루비(Ruby)
code_lang_weight: 40
description: 루비(Ruby) 로그와 트레이스를 연결하여 Datadog에서 상호 연결시킵니다.
further_reading:
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: 블로그
  text: 로그 요청을 트레이스와 자동으로 상호 연결
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 길라잡이
  text: 제품 간 상관관계를 활용한 쉬운 트러블슈팅
kind: 설명서
title: 루비(Ruby) 로그와 트레이스 상호 연결
type: multi-code-lang
---

## 트레이스 상호 연결

로깅 등 대부분의 경우 더욱 원활하게 상호 참조할 수 있도록 트레이스 ID를 다른 이벤트 또는 데이터 스트림과 상호 연결시키는 것이 유용할 수도 있습니다.

### Rails 애플리케이션 로깅

#### 자동 삽입

기본 로거(`ActiveSupport::TaggedLogging`), `lograge`, 또는 `semantic_logger`를 사용하는 Rails 애플리케이션의 경우 트레이스 ID 삽입은 자동 설정됩니다. 관련 로그를 트레이스에 연결하려면 [트레이스 리매퍼(remapper)][1]를 추가해야 합니다.

#### 수동 삽입

로거에 상호 연결 ID를 추가하려면 `Datadog::Tracing.correlation`으로 상호 연결 ID를 검색하는 로그 포맷터를 추가한 다음 메시지에 이를 추가합니다.

Datadog 로깅과 정확하게 상호 연결하려면, 로그 메시지에 다음이 순차적으로 표시되는지 확인하세요.

 - `dd.env=<ENV>`: `<ENV>`는 `Datadog::Tracing.correlation.env`과 같습니다. 환경이 설정되지 않은 경우 생략합니다.
 - `dd.service=<SERVICE>`: `<SERVICE>`은 `Datadog::Tracing.correlation.service`과 같습니다. 기본 서비스 이름이 설정되지 않은 경우 생략합니다.
 - `dd.version=<VERSION>`: `<VERSION>`은 `Datadog::Tracing.correlation.version`과 같습니다. 애플리케이션 버전이 설정되지 않은 경우 생략합니다.
 - `dd.trace_id=<TRACE_ID>`: `<TRACE_ID>`는 `Datadog::Tracing.correlation.trace_id`, 또는 로깅 중 트레이스가 활성화되지 않은 경우 `0`와 같습니다.
 - `dd.span_id=<SPAN_ID>`: `<SPAN_ID>`는 `Datadog::Tracing.correlation.span_id`, 또는 로깅 중 트레이스가 활성화되지 않은 경우 `0`와 같습니다.

`Datadog::Tracing.log_correlation`은 기본값으로 `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>` 을 반환합니다.

트레이스가 활성화 되어 있지 않고 애플리케이션 환경 & 버전이 설정되지 않은 경우 `dd.service= dd.trace_id=0 dd.span_id=0`를 반환합니다.

다음은 실제 예시입니다.

```ruby
require 'ddtrace'
require 'logger'

Datadog.configure do |c|
  c.env = 'production'
  c.service = 'billing-api'
  c.version = '2.5.17'
end

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

# 활성화된 트레이스가 없을 경우
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] 트레이싱되지 않는 작업입니다.

# 활성화된 트레이스가 있을 경우
Datadog::Tracing.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] 트레이싱되는 작업입니다.
```
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/processors/?tab=ui#trace-remapper
---
aliases:
- /ko/tracing/opentracing/ruby
- /ko/tracing/manual_instrumentation/ruby
- /ko/tracing/custom_instrumentation/ruby
- /ko/tracing/setup_overview/custom_instrumentation/ruby
- /ko/tracing/trace_collection/custom_instrumentation/ruby
code_lang: 루비(Ruby)
code_lang_weight: 20
description: Datadog에 커스텀 트레이스를 전송하여 루비(Ruby) 애플리케이션을 수동 계측합니다.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: 설명서
  text: 로그 및 트레이스를 서로 연결
- link: tracing/glossary/
  tag: 설명서
  text: 서비스, 리소스 및 트레이스 탐색
kind: 설명서
title: Datadog 라이브러리로 루비(Ruby) 커스텀 계측
type: multi-code-lang
---
<div class="alert alert-info">
자동 계측 및 설정 지침을 아직 읽지 않으셨다면 <a href="https://docs.datadoghq.com/tracing/setup/루비(Ruby)/">루비(Ruby) 설정 지침을</a> 참조하세요.
</div>

본 페이지에서는 Datadog 애플리케이션 성능 모니터링(APM)으로 식별 가능성을 추가 및 커스터마이징하는 예시를 자세히 살펴봅니다.

## 태그 추가

[스팬(span)][2]에 커스텀 [스팬(span) 태그][1]를 추가하여 Datadog 내에서 식별 가능성을 커스터마이징합니다. 스팬(span) 태그는 수신받는 트레이스에 적용되어, 관찰한 동작을 판매자 계층, 결제 금액 또는 사용자 ID 등의 코드 수준 정보와 상호 연관시킵니다.

### 커스텀 스팬(span) 태그 추가

애플리케이션 코드 내의 동적 값(예: `customer.id`)에 해당하는 스팬(span)에 커스텀 태그를 추가합니다.

{{< tabs >}}
{{% tab "Active Span" %}}
코드 내 메서드에서 현재 활성 [스팬(span)][1]에 접근합니다.  

**참고**: 메서드가 호출되었는데 활성 스팬(span)이 없다면 `active_span`은 `nil`입니다.

```ruby
require 'ddtrace'

# '/shopping_cart/:customer_id', to: 'shopping_cart#index' 가져오기
class ShoppingCartController < ApplicationController
  # GET /shopping_cart
  def index
    # 활성 스팬을 가져와 customer_id -> 254889로 설정
    Datadog::Tracing.active_span&.set_tag('customer.id', params.permit([:customer_id]))

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

[1]: /ko/tracing/glossary/#spans
{{% /tab %}}

{{% tab "수동 계측 스팬" %}}

`#set_tag`을 호출하여 `Datadog::Span` 오브젝트에 직접 [태그][1]를 추가합니다:

```ruby
# Sinatra 엔드포인트 예시,
# 요청에 관한 Datadog 트레이싱을 통해.
get '/posts' do
  Datadog::Tracing.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
    span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
  end
end
```


[1]: /ko/tracing/glossary/#span-tags
{{% /tab %}}
{{< /tabs >}}

### 모든 스팬(span)에 글로벌 태그 추가

트레이서를 `tags` 옵션으로 설정하여 모든 [스팬(span)][2]에 [태그][1]를 추가합니다:

```ruby
Datadog.configure do |c|
  c.tags = { 'team' => 'qa' }
end
```

`DD_TAGS` 환경변수를 사용하여 애플리케이션의 모든 스팬(span)에 태그를 설정할 수도 있습니다. 루비(Ruby) 환경변수에 대한 자세한 내용을 확인하려면 [설정 문서][3]를 참조하세요.

### 스팬(span)에 오류 설정

스팬(span)에 오류를 설정하는 방법은 다음 두 가지입니다.

- `span.set_error`을 호출하고 예외 오브젝트를 전달합니다. 해당 작업으로 오류 유형, 메시지, 백트레이스가 자동 추출됩니다.

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  span = Datadog::Tracing.trace('example.trace')
  puts 'some work'
  sleep(1)
  raise StandardError, "This is an exception"
rescue StandardError => error
  Datadog::Tracing.active_span&.set_error(error)
  raise
ensure
  span.finish
end

example_method()
```

- 또는 오류 유형, 메시지 및 백트레이스를 설정하는 `tracer.trace`을 기본값으로 사용합니다. 이 동작을 설정하면 `on_error` 옵션을 사용할 수 있는데, 이는 해당 블록이 `trace`에 제공되어 오류가 발생하면 호출되는 핸들러입니다. Proc는 `span`, `error`을 인수로 제공합니다. `on_error`은 기본값으로 스팬(span)에 오류를 설정합니다.

`on_error` 동작 기본값:

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError, "This is an exception"
end

Datadog::Tracing.trace('example.trace') do |span|
  example_method()
end
```

`on_error` 동작 커스터마이징:

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is a special exception"
end

custom_error_handler = proc do |span, error|
  span.set_tag('custom_tag', 'custom_value')
  span.set_error(error) unless error.message.include?("a special exception")
end

Datadog::Tracing.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```

## 스팬(span) 추가

지원하는 라이브러리 계측([라이브러리 호환성][4] 참조) 방식을 사용하지 않는다면 코드를 수동 계측할 수도 있습니다. 루비(Ruby) 코드를 래핑하는`Datadog::Tracing.trace` 방식을 사용하여 코드에 트레이싱을 추가할 수 있습니다.

루비(Ruby) 코드를 트레이싱하려면 `Datadog::Tracing.trace` 방식을 사용할 수 있습니다.

```ruby
Datadog::Tracing.trace(name, resource: resource, **options) do |span|
  # 계측하고 싶은 코드에 해당 블록을 래핑합니다.
  # 여기서 스팬(span)을 수정할 수도 있습니다.
  # 예를 들어, 리소스 이름을 변경하거나 태그를 설정합니다.
end
```

여기서 `name`은 수행 중인 일반 작업을 설명하는 `String`입니다(예: `'web.request'`, 또는 `'request.parse'`).

`resource`은 동작 중인 작업의 이름이 표시되는 `String`입니다. 동일한 리소스 값을 가진 트레이스는 메트릭 용도별로 그룹화됩니다. 리소스는 대개 URL, 쿼리, 요청 등과 같이 도메인에 따라 특화됩니다(예: Article#submit', http://example.com/articles/list.).

사용 가능한 모든 `**options`을 보려면 [참조 가이드][5]를 확인하세요.

### 신규 스팬(span) 수동 생성

코드 블록에 프로그래밍 방식으로 스팬(span)을 생성합니다. 이렇게 생성한 스팬(span)은 다른 트레이싱 메커니즘과 자동 통합됩니다. 즉, 트레이싱이 이미 시작된 경우, 수동 스팬(span)은 호출자를 부모 스팬(span)으로 설정합니다. 이와 비슷하게, 래핑한 코드 블록에서 호출한 트레이스 메서드는 수동 스팬(span)을 부모로 설정합니다.

```ruby
# Sinatra 엔드포인트 예시.
# 요청, 데이터베이스 트레이싱 및
# 렌더링 단계를 Datadog 트레이싱함.
get '/posts' do
  Datadog::Tracing.trace('web.request', service: '<SERVICE_NAME>', resource: 'GET /posts') do |span|
    # 활성 레코드 호출 트레이싱
    Datadog::Tracing.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # APM 태그 추가
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # 템플릿 렌더링 트레이싱
    Datadog::Tracing.trace('template.render') do
      erb :index
    end
  end
end
```

### 트레이스 후처리

일부 애플리케이션의 경우 Datadog에 전송하기 전에 트레이스를 변경 또는 필터링해야 할 수도 있습니다. 처리 파이프라인을 사용하면 이러한 작업을 정의하는 *프로세서*를 생성할 수 있습니다.

#### 필터링

블록이 트루이면 다음과 같이 `Datadog::Tracing::Pipeline::SpanFilter` 프로세서를 활용하여 스팬(span)을 제거할 수 있습니다:

```ruby
Datadog::Tracing.before_flush(
  # 특정 리소스와 매치되는 스팬을 제거합니다.
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # 로컬 호스트로 트래픽되는 스팬을 제거합니다.
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### 처리

`Datadog::Tracing::Pipeline::SpanProcessor` 프로세서를 사용하여 다음과 같이 스팬(span)을 수정할 수도 있습니다:

```ruby
Datadog::Tracing.before_flush(
  # 리소스 필드에서 매칭되는 텍스트 제거
  Datadog::Tracing::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

#### 커스텀 프로세서

프로세서는 `trace`을 인수(`Datadog::Span`의 `Array`)로 받는 `#call`에 응답하는 어떤 오브젝트든 될 수 있습니다.

예를 들어, 다음과 같은 짧은 블록 구문을 사용합니다:

```ruby
Datadog::Tracing.before_flush do |trace|
   # 처리 로직...
   trace
end
```

다음 예제는 복잡한 사후 처리 로직을 실행하는 프로세서를 구현합니다:

```ruby
Datadog::Tracing.before_flush do |trace|
  trace.spans.each do |span|
    originalPrice = span.get_tag('order.price'))
    discount = span.get_tag('order.discount'))

    # 기타 태그 계산으로 태그 설정
    if (originalPrice != nil && discount != nil)
      span.set_tag('order.value', originalPrice - discount)
    end
  end
  trace
end
```

커스텀 프로세서 클래스:

```ruby
class MyCustomProcessor
  def call(trace)
    # 처리 로직...
    trace
  end
end

Datadog::Tracing.before_flush(MyCustomProcessor.new)
```

두 경우 모두 프로세서 메서드는 `trace` 오브젝트를 *반드시* 반환해야 하며, 해당 반환값은 파이프라인의 다음 프로세서에 전달됩니다.


## 트레이스 클라이언트 및 에이전트 설정

B3 헤더를 사용하여 컨텍스트를 전파할 용도로 트레이싱 클라이언트와 Datadog 에이전트를 모두 추가 설정할 수 있습니다. 아울러, 서비스 상태 점검과 같이 계산 메트릭에 포함하고 싶지 않은 트레이스가 있다면, Datadog으로 트레이스 전송 시 특정 리소스를 제외할 수도 있습니다.

### 헤더를 추출 및 삽입하여 컨텍스트 전파

헤더를 삽입 및 추출하여 분산 트레이스 컨텍스트 전파를 설정할 수 있습니다. 자세한 내용은 확인하려면 [트레이스 컨텍스트 전파][6]를 참조하세요.


### 리소스 필터링

서비스 상태 점검과 같이 Datadog에 트레이스를 전송하는 신서틱 트레픽을 제거할 목적으로 리소스 이름별로 트레이스를 제외할 수 있습니다. 해당 설정과 기타 보안 및 미세 조정 설정은 [보안][7] 페이지에서 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/glossary/#span-tags
[2]: /ko/tracing/glossary/#spans
[3]: /ko/tracing/setup/ruby/#environment-and-tags
[4]: /ko/tracing/compatibility_requirements/ruby/
[5]: /ko/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
[6]: /ko/tracing/trace_collection/trace_context_propagation/ruby/
[7]: /ko/tracing/security
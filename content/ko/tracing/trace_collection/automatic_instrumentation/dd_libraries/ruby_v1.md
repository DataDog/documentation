---
dependencies:
- https://github.com/DataDog/dd-trace-rb/blob/release/docs/legacy/GettingStarted-v1.md
title: (레거시) Ruby 애플리케이션 추적
---
<div class="alert alert-danger">이 문서는 <code>ddtrace</code> gem v1.x용입니다. <code>datadog</code> gem v2.0 이상을 사용하는 경우 최신 <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/">Ruby 애플리케이션 추적</a> 설명서를 참조하세요.

`ddtrace`는 Datadog의 Ruby용 추적 클라이언트입니다. 웹 서버와 데이터베이스, 마이크로서비스에서 요청을 추적하여 개발자가 병목 현상과 문제가 되는 요청에 대한 높은 가시성을 확보할 수 있도록 합니다.

## 시작하기

**0.x 버전에서 업그레이드하는 경우 [업그레이드 가이드](https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10)를 확인하세요.**

일반 APM 문서는 [설정 문서][설정 문서]를 참조하세요.

애플리케이션이 Datadog에 정보를 보낸 후 APM이 어떻게 보이는지에 대한 자세한 내용은 [용어 및 개념][시각화 문서]를 참조하세요.

라이브러리 API 문서는 [YARD 문서][yard 문서]를 참조하세요.

참여하려면 [기여 가이드라인][기여 문서] 및 [개발 가이드][개발 문서]를 확인하세요.

[setup docs]: https://docs.datadoghq.com/tracing/
[development docs]: https://github.com/DataDog/dd-trace-rb/blob/master/README.md#development
[visualization docs]: https://docs.datadoghq.com/tracing/glossary/
[contribution docs]: https://github.com/DataDog/dd-trace-rb/blob/master/CONTRIBUTING.md
[development docs]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/DevelopmentGuide.md
[yard docs]: https://www.rubydoc.info/gems/ddtrace/

## 호환성 요구 사항

Datadog의 Ruby 라이브러리 지원 전체 목록은 [호환성 요구 사항][1]을 참조하세요.

## 설치

Ruby 애플리케이션에 추적을 추가하기 위한 단계입니다.

1. 추적을 위해 Datadog Agent 설정
2. 애플리케이션의 계측
3. 애플리케이션을 Datadog Agent에 연결

### 추적을 위해 Datadog Agent 설정

`ddtrace`를 설치하기 전에 `ddtrace`가 추적 데이터를 보낼 [Datadog Agent를 설치](https://docs.datadoghq.com/agent/)하세요.

그런 다음 Datadog Agent가 트레이스를 수신하도록 다음과 같이 구성하세요.

 - Agent 환경에서 `DD_APM_ENABLED=true` 설정

또는

 - [Agent 구성 파일](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)에 `apm_enabled: true` 추가

*컨테이너화된 환경에서는...*

 - Agent 환경에서 `DD_APM_NON_LOCAL_TRAFFIC=true` 설정

또는

 - [Agent 구성 파일](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)에 `apm_non_local_traffic: true` 추가

Agent가 컨테이너화된 환경에서 트레이스를 수신하도록 구성되었는지 확인하려면 다음 설정 지침을 참고하세요. [Docker](https://docs.datadoghq.com/agent/docker/apm/?tab=ruby), [Kubernetes](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm), [Amazon ECS](https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ruby),  [Fargate](https://docs.datadoghq.com/integrations/ecs_fargate/#trace-collection)

#### 트레이스 데이터 수집 구성

Datadog Agent는 기본적으로 `8126` 포트에서 HTTP를 통해 트레이스를 수신합니다.

다음을 사용하여 Agent가 트레이스 데이터를 수신하는 프로토콜이나 포트를 변경할 수 있습니다.

**TCP를 통한 HTTP의 경우**:

 - Agent 환경에서 `DD_APM_RECEIVER_PORT=<port>` 설정

또는

 - [Agent 구성 파일](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)에 `apm_config: receiver_port: <port>` 추가

 **Unix Domain Socket (UDS)의 경우**:

 - `DD_APM_RECEIVER_SOCKET=<path-to-socket-file>` 설정

또는

 - [Agent 구성 파일](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)에 `apm_config: receiver_socket: <path-to-socket-file>` 추가

### 애플리케이션의 계측

#### Rails 또는 Hanami 애플리케이션

1. Gemfile에 `ddtrace` gem을 추가합니다.

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace', require: 'ddtrace/auto_instrument'
    ```

2. `bundle install`을 사용하여 gem을 설치합니다.

3. 다음을 포함하는 `config/initializers/datadog.rb` 파일을 만듭니다.

    ```ruby
    Datadog.configure do |c|
      # Add additional configuration here.
      # Activate integrations, change tracer settings, etc...
    end
    ```

   이 블록을 사용하면 다음을 수행할 수 있습니다.

      - [추가 구성 추가](#additional-configuration)
      - [계측 활성화 또는 재구성](#integration-instrumentation)

#### 다른 Ruby 애플리케이션

애플리케이션이 위의 지원되는 gem(Rails 또는 Hanami)을 사용하지 않는 경우 다음과 같이 설정할 수 있습니다.

1. Gemfile에 `ddtrace` gem을 추가합니다.

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. `bundle install`을 사용하여 gem을 설치합니다.
3. 계측되어야 하는 모든 [지원되는 라이브러리 또는 프레임워크](#integration-instrumentation)를 `require`합니다.
4. 애플리케이션에 `require 'ddtrace/auto_instrument'`를 추가합니다. _참고:_ 지원되는 라이브러리나 프레임워크를 요구한 _후에_ 이 작업을 수행해야 합니다.

    ```ruby
    # Example frameworks and libraries
    require 'sinatra'
    require 'faraday'
    require 'redis'

    require 'ddtrace/auto_instrument'
    ```

5. 애플리케이션에 구성 블록을 추가합니다.

    ```ruby
    Datadog.configure do |c|
      # Add additional configuration here.
      # Activate integrations, change tracer settings, etc...
    end
    ```

   이 블록을 사용하면 다음을 수행할 수 있습니다.

      - [추가 구성 추가](#additional-configuration)
      - [계측 활성화 또는 재구성](#integration-instrumentation)

#### OpenTracing 구성하기

1. Gemfile에 `ddtrace` gem을 추가합니다.

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. `bundle install`을 사용하여 gem을 설치합니다.
3. OpenTracing 구성 파일에 다음을 추가합니다.

    ```ruby
    require 'opentracing'
    require 'datadog/tracing'
    require 'datadog/opentracer'

    # Activate the Datadog tracer for OpenTracing
    OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new
    ```

4. 애플리케이션에 구성 블록을 추가합니다.

    ```ruby
    Datadog.configure do |c|
      # Configure the Datadog tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration,
      # no additional integrations will be traced, only
      # what you have instrumented with OpenTracing.
    end
    ```

   이 블록을 사용하면 다음을 수행할 수 있습니다.

      - [추가 Datadog 구성 추가](#additional-configuration)
      - [Datadog 계측 활성화 또는 재구성](#integration-instrumentation)

#### OpenTelemetry 구성하기

OTLP를 사용하여 OpenTelemetry 트레이스를 Datadog Agent(`ddtrace` 없이)에 직접 보낼 수 있습니다. 자세한 내용은 [Datadog Agent에서 OTLP 수집](https://docs.datadoghq.com/tracing/setup_overview/open_standards/#otlp-ingest-in-datadog-agent) 문서를 확인하세요.

### 애플리케이션을 Datadog Agent에 연결

기본적으로 `ddtrace`는 나열된 우선순위에서 사용 가능한 첫 번째 설정을 사용하여 Agent에 연결합니다.

1. 명시적으로 제공된 구성 설정(호스트 이름/포트/전송)을 통해
2. `/var/run/datadog/apm.socket`에 위치한 Unix Domain Socket(UDS)을 통해
3. TCP를 거쳐 HTTP를 통해 `127.0.0.1:8126`로

Datadog Agent가 이러한 위치 중 하나에서 수신 대기하는 경우 추가 구성이 필요하지 않습니다.

Agent가 애플리케이션과 다른 호스트 또는 컨테이너에서 실행되거나 다른 프로토콜을 통해 트레이스를 보내려는 경우 이에 따라 애플리케이션을 구성해야 합니다.

  - [TCP를 거쳐 HTTP를 통해 트레이스 데이터를 Agent로 보내는 방법](#changing-default-agent-hostname-and-port)
  - [Unix Domain Socket(UDS)을 통해 Agent로 트레이스 데이터를 보내는 방법](#using-the-unix-domain-socket-uds-adapter)

### 최종 설치 단계

설정이 완료되면 몇 분 내에 서비스가 [APM 서비스 페이지](https://app.datadoghq.com/apm/services)에 표시됩니다. [APM UI 사용][시각화 문서]에 대해 자세히 알아보세요.

## 수동 계측

지원되는 프레임워크 계측을 사용하지 않는 경우 코드를 수동으로 계측할 수 있습니다.

루비(Ruby) 코드를 트레이싱하려면 `Datadog::Tracing.trace` 방식을 사용할 수 있습니다.

```ruby
Datadog::Tracing.trace(name, **options) do |span, trace|
  # 계측하려는 코드 주위에 이 블록을 래핑합니다.
  # 또한 여기에서 스팬을 수정할 수 있습니다.
  # 예: 리소스 이름 변경, 태그 설정 등...
end
```

여기서 `name`은 수행 중인 일반 작업을 설명하는 `String`입니다(예: `'web.request'`, 또는 `'request.parse'`).

`options`는 키워드 인수(선택 사항)입니다.

| 키 | 유형 | 설명 | 기본값 |
| --------------- | ----------------------- | --- | --- |
| `autostart`     | `Bool`                  | 시간 측정을 자동으로 시작할지 여부입니다. `false`이면 사용자가 `span.start`를 호출해야 합니다. | `true` |
| `continue_from` | `Datadog::TraceDigest`  | 다른 실행 컨텍스트에서 시작된 트레이스를 계속합니다. TraceDigest는 연속 지점을 설명합니다. | `nil` |
| `on_error`      | `Proc`                  | 스팬에서 오류가 발생할 때 오류 처리 동작을 재정의합니다. `span` 및 `error`가 인수로 제공됩니다. 기본적으로 스팬에 대한 오류를 설정합니다. | `proc { |span, error| span.set_error(error) unless span.nil? }` |
| `resource`      | `String`                | 작업 중인 리소스 또는 액션의 이름입니다. 리소스 값이 동일한 트레이스는 메트릭을 위해 그룹화되지만 여전히 독립적으로 볼 수 있습니다. 일반적으로 URL, 쿼리, 요청 등과 같은 도메인별로 다릅니다(예: `'Article#submit'`, `http://example.com/articles/list`.) | 스팬의 `name` |
| `service`       | `String`                | 이 스팬이 속한 서비스 이름(예: `'my-web-service'`) | 트레이서 `default-service`, `$PROGRAM_NAME`, `'ruby'` |
| `start_time`    | `Time`                  | 스팬이 실제로 시작될 때. 이미 발생한 이벤트를 추적할 때 유용합니다. | `Time.now` |
| `tags`          | `Hash`                  | 스팬에 추가해야 하는 추가 태그. | `{}` |
| `type`          | `String`                | 스팬 유형 (예: `'http'`, `'db'` 등) | `nil` |

`service` 및 `resource`를 최소값으로 설정하는 것이 좋습니다. `nil`로 `service` 또는 `resource`가 없는 스팬은 Datadog agent에 의해 삭제됩니다.

실제 수동 계측의 예:

```ruby
get '/posts' do
  Datadog::Tracing.trace('web.request', service: 'my-blog', resource: 'GET /posts') do |span|
    # activerecord 호출 추적
    Datadog::Tracing.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # APM 태그 추가
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # 템플릿 렌더링 추적
    Datadog::Tracing.trace('template.render') do
      erb :index
    end
  end
end
```

### 비동기 추적

코드 블록 주위에 `Datadog::Tracing.trace`를 래핑하는 것이 항상 가능하지는 않습니다. 일부 이벤트 또는 알림 기반 계측은 이벤트가 시작되거나 종료될 때만 알림을 보낼 수 있습니다.

이러한 작업을 추적하려면 블록 없이 `Datadog::Tracing.trace`를 호출하여 코드를 비동기적으로 추적할 수 있습니다.

```ruby
# 일부 계측 프레임워크는 이벤트가 완료된 후 이를 호출합니다.
def db_query(start, finish, query)
  span = Datadog::Tracing.trace('database.query', start_time: start)
  span.resource = query
  span.finish(finish)
end
```

블록 없이 `Datadog::Tracing.trace`를 호출하면 함수는 시작되었지만 완료되지 않은 `Datadog::Tracing::SpanOperation`를 반환하게 됩니다. 그런 다음 이 스팬를 원하는 대로 수정한 다음 `finish`로 닫을 수 있습니다.

*완료되지 않은 스팬을 남겨두면 안 됩니다.* 트레이스가 완료될 때 열려 있는 스팬이 있으면 트레이스가 삭제됩니다. 이런 일이 발생할 수 있다고 의심되면 [디버그 모드를 활성화](#additional-configuration)하여 경고를 확인할 수 있습니다.

시작/종료 이벤트를 처리할 때 이 시나리오를 방지하려면 `Datadog::Tracing.active_span`를 사용하여 현재 활성 스팬을 가져올 수 있습니다.

```ruby
# 예: ActiveSupport::Notifications는 이벤트가 시작될 때 이를 호출합니다.
def start(name, id, payload)
  # 스팬 시작
  Datadog::Tracing.trace(name)
end

# 예: ActiveSupport::Notifications는 이벤트가 종료될 때 이를 호출합니다.
def finish(name, id, payload)
  # 현재 활성 스팬을 가져옵니다 (thread-safe)
  current_span = Datadog::Tracing.active_span
  unless current_span.nil?
    current_span.resource = payload[:query]
    current_span.finish
  end
end
```
### 중첩된 메서드에서 트레이스 강화

모든 메서드에서 현재 활성화된 스팬에 추가 정보를 태그할 수 있습니다. 그러나 메서드가 호출되고 현재 활성화된 스팬이 없으면 `active_span`은 nil이 됩니다.

```ruby
# 예: 활성 스팬에 태그 추가

current_span = Datadog::Tracing.active_span
current_span.set_tag('my_tag', 'my_value') unless current_span.nil?
```

`active_trace` 메서드를 사용하여 현재 활성 트레이스를 가져올 수도 있습니다. 활성 트레이스가 없으면 이 메서드는 `nil`을 반환됩니다.

```ruby
# 예: 활성 트레이스에 액세스

current_trace = Datadog::Tracing.active_trace
```

## 통합 계측

널리 사용되는 많은 라이브러리와 프레임워크는 기본적으로 지원되며 자동 계측이 가능합니다. 자동으로 활성화되지는 않지만 `Datadog.configure` API를 사용하여 쉽게 활성화하고 구성할 수 있습니다.

```ruby
Datadog.configure do |c|
  # 통합 활성화 및 구성
  c.tracing.instrument :integration_name, **options
end
```

`options`는 통합별 구성에 대한 키워드 인수입니다.

사용 가능한 통합 및 지원 버전 목록은 [Ruby 통합 호환성][2]을 참조하세요.

사용 가능한 통합에 대한 구성 옵션 목록은 다음을 참조하세요.

#### CI 가시성

Datadog CI Visibility의 경우 다음 `Datadog.configure` API를 사용하여 라이브러리 계측을 활성화하고 구성할 수 있습니다.

```ruby
Datadog.configure do |c|
  # 통합 활성화 및 구성
  c.ci.instrument :integration_name, **options
end
```

`options`는 통합별 구성에 대한 키워드 인수입니다.

사용 가능한 통합 및 지원 버전 목록은 [Ruby CI 통합 호환성][3]을 참조하세요.

### Action Cable

Action Cable 통합은 브로드캐스트 메시지와 채널 액션을 추적합니다.

`Datadog.configure`를 통해 활성화할 수 있습니다

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_cable
end
```

### Action Mailer

Action Mailer 통합은 Rails 5 ActionMailer 액션에 대한 추적을 제공합니다.

`Datadog.configure`를 통해 활성화할 수 있습니다

```ruby
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :action_mailer, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `email_data` | `action_mailer.deliver` 스팬에 추가 이메일 페이로드 메타데이터를 추가할지 여부입니다. 필드에는 `['subject', 'to', 'from', 'bcc', 'cc', 'date', 'perform_deliveries']`가 ​​포함됩니다. | `false` |

### Action Pack

대부분의 경우 Action Pack은 Rails의 일부로 설정되지만 별도로 활성화할 수도 있습니다.

```ruby
require 'actionpack'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_pack
end
```

### Action View

대부분의 경우 Action View는 Rails의 일부로 설정되지만 별도로 활성화할 수도 있습니다.

```ruby
require 'actionview'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :action_view, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| ---| --- | --- |
| `template_base_path` | 템플릿 이름을 파싱할 때 사용됩니다. 템플릿을 `views/` 폴더에 저장하지 않는 경우 이 값을 변경해야 할 수도 있습니다. | `'views/'` |

### Active Job

대부분의 경우 Active Job은 Rails의 일부로 설정되지만 별도로 활성화할 수도 있습니다.

```ruby
require 'active_job'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_job
end

ExampleJob.perform_later
```

### Active Model Serializers

Active Model Serializers 통합은 버전 0.9 이상에 대한 `serialize` 이벤트와 버전 0.10 이상에 대한 `render` 이벤트를 추적합니다.

```ruby
require 'active_model_serializers'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_model_serializers
end

my_object = MyModel.new(name: 'my object')
ActiveModelSerializers::SerializableResource.new(test_obj).serializable_hash
```

### Active Record

대부분의 경우 Active Record는 웹 프레임워크(Rails, Sinatra…)의 일부로 설정되지만 단독으로 설정할 수도 있습니다.

```ruby
require 'tmpdir'
require 'sqlite3'
require 'active_record'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_record, **options
end

Dir::Tmpname.create(['test', '.sqlite']) do |db|
  conn = ActiveRecord::Base.establish_connection(adapter: 'sqlite3',
                                                 database: db)
  conn.connection.execute('SELECT 42') # traced!
end
```

`options`는 다음 키워드 인수입니다.

| 키            | 설명                                                                                                                                                                                       | 기본값                                    |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------|
| `service_name` | SQL 쿼리 계측에 대한 서비스 이름을 재정의합니다. ActiveRecord 인스턴스화 계측은 항상 애플리케이션에 구성된 서비스 이름을 사용합니다. | 데이터베이스 어댑터 이름(예: `'mysql2'`) |

**데이터베이스별 트레이스 설정 구성**

다음 `describes` 옵션을 사용하여 데이터베이스 연결별로 트레이스 설정을 구성할 수 있습니다.

```ruby
# 연결 키와 함께 `:describes` 옵션을 제공하세요.
# 다음 키는 모두 허용되며 서로 동일합니다.
# 블록이 제공되면 위에 나열된 구성 옵션을 
# 허용하는 Settings 개체가 생성됩니다.


Datadog.configure do |c|
  # config/database.yml의 데이터베이스 연결과 일치하는 기호
  # ActiveRecord와 함께 Rails를 사용하는 경우에만 사용할 수 있습니다.
  c.tracing.instrument :active_record, describes: :secondary_database, service_name: 'secondary-db'

  # 블록 구성 패턴
  c.tracing.instrument :active_record, describes: :secondary_database do |second_db|
    second_db.service_name = 'secondary-db'
  end

  # 다음 연결 설정이 포함된 연결 문자열:
  #  adapter, username, host, port, database
  # 다른 필드는 무시됩니다.
  c.tracing.instrument :active_record, describes: 'mysql2://root@127.0.0.1:3306/mysql', service_name: 'secondary-db'

  # 다음 연결 설정 해시:
  # adapter, username, host, port, database
  # 다른 필드는 무시됩니다.
  c.tracing.instrument :active_record, describes: {
      adapter:  'mysql2',
      host:     '127.0.0.1',
      port:     '3306',
      database: 'mysql',
      username: 'root'
    },
    service_name: 'secondary-db'

  # `makara` gem을 사용하는 경우, 연결 `role`과 일치시키는 것이 가능합니다:
  c.tracing.instrument :active_record, describes: { makara_role: 'primary' }, service_name: 'primary-db'
  c.tracing.instrument :active_record, describes: { makara_role: 'replica' }, service_name: 'secondary-db'
end
```

데이터베이스 연결 필드의 부분 일치를 기반으로 구성을 생성할 수도 있습니다.

```ruby
Datadog.configure do |c|
  # 호스트 `127.0.0.1`의 모든 연결과 일치시킵니다.
  c.tracing.instrument :active_record, describes: { host:  '127.0.0.1' }, service_name: 'local-db'

  # 모든 `mysql2` 연결과 일치시킵니다.
  c.tracing.instrument :active_record, describes: { adapter: 'mysql2'}, service_name: 'mysql-db'

  # 모든 `mysql2`연결을 `reports` 데이터베이스와 일치시킵니다.
  #
  # 일치하는 `describe` 구성이 여러 개인 경우 최신 구성이 적용됩니다.
  # 이 경우 어댑터 `mysql`과 데이터베이스 `reports`의 연결은
  #  `service_name: 'mysql-db'`가 아닌 `service_name: 'reports-db'`로 구성됩니다.
  c.tracing.instrument :active_record, describes: { adapter: 'mysql2', database:  'reports'}, service_name: 'reports-db'
end
```

여러 `describes` 구성이 연결과 일치하는 경우 일치하는 최신 구성 규칙이 적용됩니다.

ActiveRecord가 `describes`에서 정의한 키와 일치하는 연결을 사용하는 이벤트를 추적하는 경우 해당 연결에 할당된 트레이스 설정을 사용합니다. 연결이 설명된 연결과 일치하지 않으면 대신에 `c.tracing.instrument :active_record`에서 정의한 기본 설정을 사용합니다.

### Active Support

대부분의 경우 Active Support는 Rails의 일부로 설정되지만 별도로 활성화할 수도 있습니다.

```ruby
require 'activesupport'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :active_support, **options
end

cache = ActiveSupport::Cache::MemoryStore.new
cache.read('city')
```

`options`는 다음 키워드 인수입니다.

| 키             | 설명                                                                                                                                                                                        | 기본값                |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|
| `cache_service` | `active_support` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `active_support-cache` |

### AWS

AWS 통합은 AWS 서비스(S3, ElastiCache 등)와의 모든 상호 작용(예: API 호출)을 추적합니다.

```ruby
require 'aws-sdk'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :aws, **options
end

# 추적된 호출 수행
Aws::S3::Client.new.list_buckets
```

`options`는 다음 키워드 인수입니다.

| 키            | Env Var                     | 설명                                                                                                                                                                             | 기본값 |
|----------------|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `service_name` | `DD_TRACE_AWS_SERVICE_NAME` | `aws` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `aws`   |
| `peer_service` | `DD_TRACE_AWS_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                    | `nil`   |



### Concurrent Ruby

Concurrent Ruby 통합은 `::Concurrent::Future` 및 `Concurrent::Async` 사용 시 컨텍스트 전파에 대한 지원을 추가하고 `Future#execute` 및 `Concurrent::Async#async` 내에서 추적된 코드가 올바른 상위 세트를 갖도록 보장합니다.

통합을 활성화하려면 `Datadog.configure` 메서드를 사용합니다.

```ruby
# Inside Rails 이니셜라이저 또는 이와 동등한 기능
Datadog.configure do |c|
  # 컨텍스트를 전파하는 ExecutorService를 사용하기 위해 Concurrent::Future를 덧붙입니다.
  c.tracing.instrument :concurrent_ruby
end

# Concurrent::Future 내에서 실행되는 코드에 컨텍스트를 전달합니다.
Datadog::Tracing.trace('outer') do
  Concurrent::Future.execute { Datadog::Tracing.trace('inner') { } }.wait
end

# Concurrent::Async 내에서 실행되는 코드에 컨텍스트를 전달합니다.
class MyClass
  include ConcurrentAsync

  def foo
    Datadog::Tracing.trace('inner') { }
  end
end

Datadog::Tracing.trace('outer') do
  MyClass.new.async.foo
end
```

### Cucumber

Cucumber 통합은 `cucumber` 프레임워크를 사용할 때 시나리오 및 단계의 모든 실행을 추적합니다.

통합을 활성화하려면 `Datadog.configure` 메서드를 사용합니다.

```ruby
require 'cucumber'
require 'ddtrace'

# 기본 Cucumber 통합 구성 
Datadog.configure do |c|
  c.ci.instrument :cucumber, **options
end

# 시나리오의 태그를 활성 스팬에 연결하는 방법의 예
Around do |scenario, block|
  active_span = Datadog.configuration[:cucumber][:tracer].active_span
  unless active_span.nil?
    scenario.tags.filter { |tag| tag.include? ':' }.each do |tag|
      active_span.set_tag(*tag.name.split(':', 2))
    end
  end
  block.call
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `enabled` | Cucumber 테스트를 추적해야 하는지 여부를 정의합니다. 일시적으로 추적을 비활성화하는 데 유용합니다. `true` 또는 `false` | `true` |
| `service_name` | `cucumber` 통합에 사용되는 서비스 이름 | `'cucumber'` |
| `operation_name` | `cucumber` 계측에 사용되는 작업 이름. 예를 들어 자동 트레이스 메트릭의 이름을 바꾸려는 경우 유용합니다. 예: `trace.#{operation_name}.errors`. | `'cucumber.test'` |

### Dalli

Dalli 통합은 `memcached` 서버에 대한 모든 호출을 추적합니다.

```ruby
require 'dalli'
require 'ddtrace'

# 기본 Dalli 추적 동작 구성
Datadog.configure do |c|
  c.tracing.instrument :dalli, **options
end

# 단일 클라이언트에 대한 Dalli 추적 동작 구성
client = Dalli::Client.new('localhost:11211', **options)
client.set('abc', 123)
```

`options`는 다음 키워드 인수입니다.

| 키            | Env Var                       | 설명                                                                                                                                                                               | 기본값     |
|----------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| `command_enabled` | `DD_TRACE_MEMCACHED_COMMAND_ENABLED` | 명령을 `memcached.command` 태그로 수집합니다. 명령 `keys`에는 잠재적으로 민감한 정보가 포함될 수 있습니다. | `false` |
| `service_name` | `DD_TRACE_DALLI_SERVICE_NAME` | `dalli` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `memcached` |
| `peer_service` | `DD_TRACE_DALLI_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                      | `nil`       |


### DelayedJob

DelayedJob 통합은 수명 주기 후크를 사용하여 작업 실행 및 대기열 추가를 추적합니다.

`Datadog.configure`를 통해 활성화할 수 있습니다

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :delayed_job, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `error_handler` | 작업에서 오류가 발생할 때 호출되는 사용자 정의 오류 핸들러입니다. `span` 및 `error`가 인수로 제공됩니다. 기본적으로 스팬에 대한 오류를 설정하며 일시적인 오류를 무시하는 데 유용합니다. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Elasticsearch

Elasticsearch 통합은 `Client` 개체에서 `perform_request`에 대한 모든 호출을 추적합니다.

```ruby
require 'elasticsearch/transport'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :elasticsearch, **options
end

# Elasticsearch에 쿼리 수행
client = Elasticsearch::Client.new url: 'http://127.0.0.1:9200'
response = client.perform_request 'GET', '_cluster/health'

# 특정 클라이언트 인스턴스에 대한 전역 구성을 재정의하려는 경우
Datadog.configure_onto(client.transport, **options)
```

`options`는 다음 키워드 인수입니다.

| 키            | Env Var                               | 설명                                                                                                                                                                                       | 기본값         |
|----------------|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------|
| `service_name` | `DD_TRACE_ELASTICSEARCH_SERVICE_NAME` | `elasticsearch` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `elasticsearch` |
| `peer_service` | `DD_TRACE_ELASTICSEARCH_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                              | `nil`           |
| `quantize`     |                                       | 양자화 옵션을 포함하는 해시입니다. 양자화하지 않기 위해 `:show` 키 배열을 포함하거나(또는 양자화를 건너뛰기 위해 `:all`) 완전히 제외하기 위해 `:exclude` 키 배열을 포함할 수 있습니다.       | `{}`            |


### Ethon

`ethon` 통합은 `Easy` 또는 `Multi` 개체를 통해 모든 HTTP 요청을 추적합니다. 이 통합은 `Ethon`을 기반으로 한 `Typhoeus` 라이브러리를 지원합니다.

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :ethon, **options

  # (선택 사항) 정규식과 일치하는 호스트 이름에 대해 다른 서비스 이름을 지정하세요.
  c.tracing.instrument :ethon, describes: /user-[^.]+\.example\.com/ do |ethon|
    ethon.service_name = 'user.example.com'
    ethon.split_by_domain = false # split_by_domain 기본값이 true인 경우에만 필요합니다.
  end
end
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                       | 설명                                                                                                                                                                               | 기본값 |
|-----------------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `service_name`        | `DD_TRACE_ETHON_SERVICE_NAME` | `ethon` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `ethon` |
| `peer_service`        | `DD_TRACE_ETHON_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                      | `nil`   |
| `distributed_tracing` |                               | [분산 추적]을 활성화합니다(#distributed-tracing)                                                                                                                                       | `true`  |
| `split_by_domain`     |                               | `true`로 설정된 경우 요청 도메인을 서비스 이름으로 사용합니다.                                                                                                                           | `false` |



### Excon

`ddtrace` 미들웨어를 통해 `excon` 통합이 가능합니다.

```ruby
require 'excon'
require 'ddtrace'

# 기본 Excon 추적 동작 구성
Datadog.configure do |c|
  c.tracing.instrument :excon, **options

  # (선택 사항) 정규식과 일치하는 호스트 이름에 대해 다른 서비스 이름을 지정하세요.
  c.tracing.instrument :excon, describes: /user-[^.]+\.example\.com/ do |excon|
    excon.service_name = 'user.example.com'
    excon.split_by_domain = false # split_by_domain 기본값이 true인 경우에만 필요합니다.
  end
end

connection = Excon.new('https://example.com')
connection.get
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                       | 설명                                                                                                                                                                               | 기본값 |
|-----------------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `service_name`        | `DD_TRACE_EXCON_SERVICE_NAME` | `excon` 계측을 실행하는 애플리케이션 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `excon` |
| `peer_service`        | `DD_TRACE_EXCON_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                      | `nil`   |
| `distributed_tracing` |                               | [분산 추적]을 활성화합니다(#distributed-tracing)                                                                                                                                       | `true`  |
| `split_by_domain`     |                               | `true`로 설정된 경우 요청 도메인을 서비스 이름으로 사용합니다.                                                                                                                           | `false` |
| `error_handler`       |                               | `response` 파라미터를 허용하는 `Proc`. *truthy* 값으로 평가되면 트레이스 스팬이 오류로 표시됩니다. 기본적으로 5XX 응답만 오류로 설정됩니다.                    | `nil`   |


**다른 설정을 사용하도록 연결 구성**

Excon에서 여러 연결을 사용하는 경우 미들웨어로 생성자를 구성하여 각 연결에 서로 다른 설정을 지정할 수 있습니다.

```ruby
# 기본 미들웨어 스택 주위에 Datadog 추적 미들웨어를 래핑합니다.
Excon.new(
  'http://example.com',
  middlewares: Datadog::Tracing::Contrib::Excon::Middleware.with(options).around_default_stack
)

# 미들웨어를 사용자 정의 미들웨어 스택에 삽입합니다.
# 참고: 트레이스 미들웨어는 ResponseParser 뒤에 삽입해야 합니다!
Excon.new(
  'http://example.com',
  middlewares: [
    Excon::Middleware::ResponseParser,
    Datadog::Tracing::Contrib::Excon::Middleware.with(options),
    Excon::Middleware::Idempotent
  ]
)
```

여기서 `options`은 위 표에 나열된 파라미터 중 하나를 포함하는 해시입니다.

### Faraday

`ddtrace` 미들웨어를 통해 `faraday` 통합이 가능합니다.

```ruby
require 'faraday'
require 'ddtrace'

# 기본 Faraday 추적 동작 구성
Datadog.configure do |c|
  c.tracing.instrument :faraday, **options

  # (선택 사항) 정규식과 일치하는 호스트 이름에 대해 다른 서비스 이름을 지정하세요.
  c.tracing.instrument :faraday, describes: /user-[^.]+\.example\.com/ do |faraday|
    faraday.service_name = 'user.example.com'
    faraday.split_by_domain = false # split_by_domain 기본값이 true인 경우에만 필요합니다.
  end
end

# 특정 클라이언트 인스턴스에 대한 전역 구성을 재정의하려는 경우
connection = Faraday.new('https://example.com') do |builder|
  builder.use(:ddtrace, **options)
  builder.adapter Faraday.default_adapter
end

connection.get('/foo')
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                         | 설명                                                                                                                                                                                 | 기본값   |
|-----------------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| `service_name`        | `DD_TRACE_FARADAY_SERVICE_NAME` | `faraday` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `faraday` |
| `peer_service`        | `DD_TRACE_FARADAY_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                        | `nil`     |
| `distributed_tracing` |                                 | [분산 추적]을 활성화합니다(#distributed-tracing)                                                                                                                                         | `true`    |
| `split_by_domain`     |                                 | `true`로 설정된 경우 요청 도메인을 서비스 이름으로 사용합니다.                                                                                                                             | `false`   |
| `error_handler`       |                                 | `response` 파라미터를 허용하는 `Proc`. *truthy* 값으로 평가되면 트레이스 스팬이 오류로 표시됩니다. 기본적으로 5XX 응답만 오류로 설정됩니다.                      | `nil`     |
| `on_error` | 요청에서 오류가 발생할 때 호출되는 사용자 정의 오류 핸들러. `span` 및 `error`가 인수로 제공됩니다. 기본적으로 스팬에 대한 오류를 설정합니다. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Grape

Grape 통합은 Grape 엔드포인트 및 필터에 계측을 추가합니다. 이 통합은 Rack and Rails와 같은 다른 통합과 나란히 작동할 수 있습니다.

통합을 활성화하려면 Grape 애플리케이션을 정의하기 전에 `Datadog.configure` 메서드를 사용하세요.

```ruby
# api.rb
require 'grape'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :grape, **options
end

# 그런 다음 애플리케이션을 정의합니다.
class RackTestingAPI < Grape::API
  desc 'main endpoint'
  get :success do
    'Hello world!'
  end
end
```

`options`는 다음 키워드 인수입니다.

| 키              | Env Var                  | 설명                                                                                                                   | 기본값 |
|------------------|--------------------------|-------------------------------------------------------------------------------------------------------------------------------|---------|
| `enabled`        | `DD_TRACE_GRAPE_ENABLED` | Grape를 추적해야 하는지 여부를 정의합니다. 일시적으로 추적을 비활성화하는 데 유용합니다. `true` 또는 `false`                           | `true`  |
| `error_statuses` |                          | 오류로 표시되어야 하는 상태 코드 또는 상태 코드 범위를 정의합니다. `'404,405,500-599'` 또는 `[404,405,'500-599']` | `nil`   |


### GraphQL

GraphQL 통합은 GraphQL 쿼리에 대한 계측을 활성화합니다.

통합을 활성화하려면 `Datadog.configure` 메서드를 사용합니다.

```ruby
# Inside Rails 이니셜라이저 또는 이와 동등
Datadog.configure do |c|
  c.tracing.instrument :graphql, schemas: [YourSchema], **options
end

# 그런 다음 GraphQL 쿼리를 실행합니다.
YourSchema.execute(query, variables: {}, context: {}, operation_name: nil)
```

이 `instrument :graphql` 메서드는 다음 파라미터를 허용합니다. `options`을 추가 옵션으로 대체할 수 있습니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `schemas` | 필수. 추적할 `GraphQL::Schema` 개체의 배열입니다. 이 구성에 제공된 옵션을 사용하여 나열된 모든 스키마에 추적이 추가됩니다. 아무것도 제공하지 않으면 추적이 활성화되지 않습니다. | `[]` |
| `service_name` | graphql 계측에 사용되는 서비스 이름 | `'ruby-graphql'` |

**GraphQL 스키마 수동 구성**

스키마에 대한 트레이서 설정을 개별적으로 구성하려는 경우(예: 서로 다른 서비스 이름을 가진 여러 스키마가 있는 경우) 스키마 정의에서 [GraphQL API를 사용하여](http://graphql-ruby.org/queries/tracing.html) 다음을 추가할 수 있습니다.

```ruby
# Class 기반 스키마
class YourSchema < GraphQL::Schema
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

```ruby
# .define-style 스키마
YourSchema = GraphQL::Schema.define do
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

또는 이미 정의된 스키마를 수정할 수 있습니다.

```ruby
# Class 기반 스키마
YourSchema.use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
)
```

```ruby
# .define-style 스키마
YourSchema.define do
  use(
    GraphQL::Tracing::DataDogTracing,
    service: 'graphql'
  )
end
```

이중 추적을 피하기 위해 수동으로 구성하기로 선택한 경우 `Datadog.configure`에서 `instrument :graphql`을 *하지 마세요*. GraphQL 추적을 구성하는 이 두 가지 방법은 상호 배타적인 것으로 간주됩니다.

### gRPC

`grpc` 통합은 서비스의 원격 프로시저 호출을 실행하기 전에 미들웨어로 실행되는 클라이언트 및 서버 인터셉터를 모두 추가합니다. gRPC 애플리케이션이 분산되는 경우가 많기 때문에 통합은 클라이언트와 서버 간에 트레이스 정보를 공유합니다.

통합을 설정하려면 다음과 같이 `Datadog.configure` 메서드를 사용하세요.

```ruby
require 'grpc'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :grpc, **options
end

# 서버 측
server = GRPC::RpcServer.new
server.add_http2_port('localhost:50051', :this_port_is_insecure)
server.handle(Demo)
server.run_till_terminated

# 클라이언트 측
client = Demo.rpc_stub_class.new('localhost:50051', :this_channel_is_insecure)
client.my_endpoint(DemoMessage.new(contents: 'hello!'))
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                      | 설명                                                                                                                                                                              | 기본값                                                            |
|-----------------------|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `service_name`        | `DD_TRACE_GRPC_SERVICE_NAME` | `grpc` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `grpc`                                                             |
| `peer_service`        | `DD_TRACE_GRPC_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                     | `nil`                                                              |
| `distributed_tracing` |                              | [분산 추적]을 활성화합니다(#distributed-tracing)                                                                                                                                      | `true`                                                             |
| `server_error_handler`       |                              | 서버 오류가 있을 때 호출되는 사용자 정의 오류 핸들러입니다. `span` 및 `error` 파라미터를 허용하는 `Proc`입니다. 기본적으로 스팬에 대한 오류를 설정합니다.                                         | `proc { \|span, error \| span.set_error(error) unless span.nil? }` |
| `client_error_handler`       |                              | 클라이언트 오류가 있을 때 호출되는 사용자 정의 오류 핸들러입니다. `span` 및 `error` 파라미터를 허용하는 `Proc`입니다. 기본적으로 스팬에 대한 오류를 설정합니다.                                         | `proc { \|span, error \| span.set_error(error) unless span.nil? }` |

지원 중단 알림:
- `error_handler`는 제거될 예정입니다. 대신 `server_error_handler`를 사용하세요.

**다른 설정을 사용하도록 클라이언트 구성**

여러 개별 서비스를 호출하는 여러 클라이언트가 있는 상황에서는 다음과 같이 Datadog 인터셉터를 직접 전달할 수 있습니다.

```ruby
configured_interceptor = Datadog::Tracing::Contrib::GRPC::DatadogInterceptor::Client.new do |c|
  c.service_name = "Alternate"
end

alternate_client = Demo::Echo::Service.rpc_stub_class.new(
  'localhost:50052',
  :this_channel_is_insecure,
  :interceptors => [configured_interceptor]
)
```

통합을 통해 `configured_interceptor`가 해당 클라이언트 인스턴스에 대한 고유한 추적을 설정합니다.

### hanami

`hanami` 통합은 hanami 애플리케이션에 대한 라우팅, 액션 및 렌더링을 계측합니다. `hanami` 계측을 활성화하려면 다음을 사용하여 자동 계측을 수행하는 것이 좋습니다.

```
gem 'ddtrace', require: 'ddtrace/auto_instrument'
```

그리고 `config/initializers` 폴더에 초기화 파일을 만듭니다.

```ruby
# config/initializers/datadog.rb
Datadog.configure do |c|
  c.tracing.instrument :hanami, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `service_name` | `hanami` 계측에 대한 서비스 이름. | `nil` |


### http.rb

http.rb 통합은 Http.rb gem을 사용하여 모든 HTTP 호출을 추적합니다.

```ruby
require 'http'
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :httprb, **options
  # (선택 사항) 정규식과 일치하는 호스트 이름에 대해 다른 서비스 이름을 지정하세요.
  c.tracing.instrument :httprb, describes: /user-[^.]+\.example\.com/ do |httprb|
    httprb.service_name = 'user.example.com'
    httprb.split_by_domain = false # split_by_domain 기본값이 true인 경우에만 필요합니다.
  end
end
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                                  | 설명                                                                                                                                                                                | 기본값     |
|-----------------------|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| `service_name`        | `DD_TRACE_HTTPRB_SERVICE_NAME`           | `httprb` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `httprb`    |
| `peer_service`        | `DD_TRACE_HTTPRB_PEER_SERVICE`           | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                       | `nil`       |
| `distributed_tracing` |                                          | [분산 추적]을 활성화합니다(#distributed-tracing)                                                                                                                                        | `true`      |
| `split_by_domain`     |                                          | `true`로 설정된 경우 요청 도메인을 서비스 이름으로 사용합니다.                                                                                                                            | `false`     |
| `error_status_codes`  | `DD_TRACE_HTTPCLIENT_ERROR_STATUS_CODES` | 오류로 추적되어야 하는 HTTP 상태 코드의 범위 또는 배열입니다.                                                                                                                       | `400...600` |


### httpclient

httpclient 통합은 httpclient gem을 사용하여 모든 HTTP 호출을 추적합니다.

```ruby
require 'httpclient'
require 'ddtrace'
Datadog.configure do |c|
  c.tracing.instrument :httpclient, **options
  # (선택 사항) 정규식과 일치하는 호스트 이름에 대해 다른 서비스 이름을 지정하세요.
  c.tracing.instrument :httpclient, describes: /user-[^.]+\.example\.com/ do |httpclient|
    httpclient.service_name = 'user.example.com'
    httpclient.split_by_domain = false # split_by_domain 기본값이 true인 경우에만 필요합니다.
  end
end
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                                  | 설명                                                                                                                                                                                    | 기본값      |
|-----------------------|------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| `service_name`        | `DD_TRACE_HTTPCLIENT_SERVICE_NAME`       | `httpclient` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `httpclient` |
| `peer_service`        | `DD_TRACE_HTTPCLIENT_PEER_SERVICE`       | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                           | `nil`        |
| `distributed_tracing` |                                          | [분산 추적]을 활성화합니다(#distributed-tracing)                                                                                                                                            | `true`       |
| `split_by_domain`     |                                          | `true`로 설정된 경우 요청 도메인을 서비스 이름으로 사용합니다.                                                                                                                                | `false`      |
| `error_status_codes`  | `DD_TRACE_HTTPCLIENT_ERROR_STATUS_CODES` | 오류로 추적되어야 하는 HTTP 상태 코드의 범위 또는 배열입니다.                                                                                                                           | `400...600`  |


### httpx

`httpx`는 [`ddtrace`와의 자체 통합]을 유지합니다 (https://honeyryderchuck.gitlab.io/httpx/wiki/Datadog-Adapter):

```ruby
require "ddtrace"
require "httpx/adapters/datadog"

Datadog.configure do |c|
  c.tracing.instrument :httpx

  # (선택 사항) 정규식과 일치하는 호스트 이름에 대해 다른 서비스 이름을 지정하세요.
  c.tracing.instrument :httpx, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # split_by_domain 기본값이 true인 경우에만 필요합니다.
  end
end
```

### Kafka

Kafka 통합은 `ruby-kafka` gem 추적을 제공합니다.

`Datadog.configure`를 통해 활성화할 수 있습니다

```ruby
require 'active_support/notifications' # 'ruby-kafka' 계측을 활성화하는 데 필요합니다.
require 'kafka'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :kafka
end
```

### Minitest

Minitest 통합은 `minitest` 테스트 프레임워크를 사용할 때 모든 테스트 실행을 추적합니다.

통합을 활성화하려면 `Datadog.configure` 메서드를 사용합니다.

```ruby
require 'minitest'
require 'ddtrace'

# 기본 Minitest 통합 구성
Datadog.configure do |c|
  c.ci.instrument :minitest, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `enabled` | Minitest 테스트를 추적해야 하는지 여부를 정의합니다. 일시적으로 추적을 비활성화하는 데 유용합니다. `true` 또는 `false` | `true` |
| `service_name` | `minitest` 통합에 사용되는 서비스 이름 | `'minitest'` |
| `operation_name` | `minitest` 계측에 사용되는 작업 이름. 자동 트레이스 메트릭의 이름을 바꾸려는 경우 유용합니다. 예: `trace.#{operation_name}.errors` | `'minitest.test'` |

### MongoDB

통합은 [MongoDB Ruby 드라이버](https://github.com/mongodb/mongo-ruby-driver)에서 MongoDB 클러스터로 전송된 모든 `Command`을 추적합니다. 확장을 통해 Mongoid와 같은 Object Document Mappers (ODM)는 공식 Ruby 드라이버를 사용하는 경우 자동으로 계측됩니다. 통합을 활성화하려면 다음을 수행하세요.

```ruby
require 'mongo'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :mongo, **options
end

# MongoDB 클라이언트를 생성하고 평소처럼 사용하세요.
client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })

# 특정 클라이언트 인스턴스에 대한 전역 구성을 재정의하려는 경우
Datadog.configure_onto(client, **options)
```

`options`는 다음 키워드 인수입니다.

| 키            | Env Var                       | 설명                                                                                                                                                                                 | 기본값                                          |
|----------------|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| `service_name` | `DD_TRACE_MONGO_SERVICE_NAME` | `mongo` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration)   | `mongodb`                                        |
| `peer_service` | `DD_TRACE_MONGO_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                        | `nil`                                            |
| `quantize`     |                               | 양자화 옵션을 포함하는 해시입니다. 양자화하지 않기 위해 `:show` 키 배열을 포함하거나 (또는 양자화를 건너뛰기 위해 `:all`)  완전히 제외하기 위해 `:exclude` 키 배열을 포함할 수 있습니다. | `{ show: [:collection, :database, :operation] }` |

**연결별 트레이스 설정 구성**

`describes` 옵션을 사용하여 연결당 트레이스 설정을 구성할 수 있습니다.

```ruby
# 연결 키와 함께 `:describes` 옵션을 제공하세요.
# 다음 키는 모두 허용되며 서로 동일합니다.
# 블록이 제공되면 위에 나열된 구성 옵션을
# 허용하는 설정 개체가 생성됩니다. 

Datadog.configure do |c|
  # 네트워크 연결 문자열
  c.tracing.instrument :mongo, describes: '127.0.0.1:27017', service_name: 'mongo-primary'

  # 네트워크 연결 정규식
  c.tracing.instrument :mongo, describes: /localhost.*/, service_name: 'mongo-secondary'
end

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })
# 추적된 호출은 `mongo-primary` 서비스에 속합니다.

client = Mongo::Client.new([ 'localhost:27017' ], :database => 'artists')
collection = client[:people]
collection.insert_one({ name: 'Steve' })
# 추적된 호출은 `mongo-secondary` 서비스에 속합니다.
```

여러 `describes` 구성이 연결과 일치하는 경우 일치하는 최신 구성 규칙이 적용됩니다.

### MySQL2

MySQL2 통합은 `mysql2` gem을 통해 전송된 모든 SQL 명령을 추적합니다.

```ruby
require 'mysql2'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :mysql2, **options
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT * FROM users WHERE group='x'")
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                        | 설명                                                                                                                                                                                                                                                                                                                                                             | 기본값      |
|-----------------------|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| `service_name`        | `DD_TRACE_MYSQL2_SERVICE_NAME` | `mysql2` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration)                                                                                                                                                                              | `mysql2`     |
| `peer_service`        | `DD_TRACE_MYSQL2_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                                                                                                                                                                                                    | `nil`        |
| `comment_propagation` | `DD_DBM_PROPAGATION_MODE`      | 데이터베이스 모니터링을 위한 SQL 주석 전파 모드. <br />(예: `disabled`  \| `service`\| `full`). <br /><br />**중요**: *SQL 주석 전파를 활성화하면 잠재적으로 기밀 데이터(서비스 이름)가 데이터베이스에 저장되어 데이터베이스 액세스 권한을 가진 제3자가 접근할 수 있다는 점에 유의하세요.* | `'disabled'` |
| `on_error` | | MySQL에서 오류가 발생할 때 호출되는 사용자 정의 오류 핸들러입니다. `span` 및 `error`가 인수로 제공됩니다. 기본적으로 스팬에 대한 오류를 설정합니다. 애플리케이션 수준에서 처리되는 오류를 무시하는 데 유용합니다. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
### Net/HTTP

Net/HTTP 통합은 표준 lib Net::HTTP 모듈을 사용하여 모든 HTTP 호출을 추적합니다.

```ruby
require 'net/http'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :http, **options

  # (선택 사항) 정규식과 일치하는 호스트 이름에 대해 다른 서비스 이름을 지정하세요.
  c.tracing.instrument :http, describes: /user-[^.]+\.example\.com/ do |http|
    http.service_name = 'user.example.com'
    http.split_by_domain = false # split_by_domain 기본값이 true인 경우에만 필요합니다.
  end
end

Net::HTTP.start('127.0.0.1', 8080) do |http|
  request = Net::HTTP::Get.new '/index'
  response = http.request(request)
end

content = Net::HTTP.get(URI('http://127.0.0.1/index.html'))
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                            | 설명                                                                                                                                                                                  | 기본값     |
|-----------------------|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------|
| `service_name`        | `DD_TRACE_NET_HTTP_SERVICE_NAME`   | `net/http` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `net/http`  |
| `peer_service`        | `DD_TRACE_NET_HTTP_PEER_SERVICE`   | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                         | `nil`       |
| `distributed_tracing` |                                    | [분산 추적]을 활성화합니다(#distributed-tracing)                                                                                                                                          | `true`      |
| `split_by_domain`     |                                    | `true`로 설정된 경우 요청 도메인을 서비스 이름으로 사용합니다.                                                                                                                              | `false`     |
| `error_status_codes`  | `DD_TRACE_HTTP_ERROR_STATUS_CODES` | 오류로 추적되어야 하는 HTTP 상태 코드의 범위 또는 배열입니다.                                                                                                                         | `400...600` |

각 연결 개체를 개별적으로 구성하려면 다음과 같이 `Datadog.configure_onto`를 사용할 수 있습니다.

```ruby
client = Net::HTTP.new(host, port)
Datadog.configure_onto(client, **options)
```

### OpenSearch

OpenSearch 통합은 `Client` 개체에서  `perform_request`에 대한 모든 호출을 추적합니다.

```ruby
require 'opensearch'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :opensearch, **options
end

# OpenSearch에 쿼리 수행
client = OpenSearch::Client.new(
  host: 'https://localhost:9200',
  user: 'user',
  password: 'password',
)
client.cluster.health
```

`options`는 다음 키워드 인수입니다.

| 키            | Env Var                            | 설명                                                                                                                                                                                    | 기본값      |
|----------------|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| `service_name` | `DD_TRACE_OPENSEARCH_SERVICE_NAME` | `opensearch` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `opensearch` |
| `peer_service` | `DD_TRACE_OPENSEARCH_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                           | `nil`        |
| `quantize`     |                                    | 양자화 옵션을 포함하는 해시입니다. 양자화하지 않기 위해 `:show` 키 배열을 포함하거나 (또는 양자화를 건너뛰기 위해 `:all`)  완전히 제외하기 위해 `:exclude` 키 배열을 포함할 수 있습니다.    | `{}`         |

### Postgres

PG 통합은 `pg` gem을 통해 전송된 SQL 명령을 추적합니다.
* `exec`, `exec_params`, `exec_prepared`;
* `async_exec`, `async_exec_params`, `async_exec_prepared`; 또는
* `sync_exec`, `sync_exec_params`, `sync_exec_prepared`

```ruby
require 'pg'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :pg, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                    | 설명                                                                                                                                                                                                                                                                                                                                                             | 기본값      |
|-----------------------|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| `enabled` || Postgres를 추적해야 하는지 여부를 정의합니다. | `true` |
| `service_name`        | `DD_TRACE_PG_SERVICE_NAME` | `pg` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration)                                                                                                                                                                                  | `pg`         |
| `peer_service`        | `DD_TRACE_PG_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                                                                                                                                                                                                    | `nil`        |
| `comment_propagation` | `DD_DBM_PROPAGATION_MODE`  | 데이터베이스 모니터링을 위한 SQL 주석 전파 모드. <br />(예: `disabled`  \| `service`\| `full`). <br /><br />**중요**: *SQL 주석 전파를 활성화하면 잠재적으로 기밀 데이터(서비스 이름)가 데이터베이스에 저장되어 데이터베이스 액세스 권한을 가진 제3자가 접근할 수 있다는 점에 유의하세요.* | `'disabled'` |
| `error_handler` || 오류가 발생할 때 호출되는 사용자 정의 오류 핸들러입니다. `span` 및 `error`가 인수로 제공됩니다. 기본적으로 스팬에 대한 오류를 설정합니다. 애플리케이션 수준에서 처리되는 오류를 무시하는 데 유용합니다. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Presto

Presto 통합은 `presto-client` gem을 통해 전송된 모든 SQL 명령을 추적합니다.

```ruby
require 'presto-client'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :presto, **options
end

client = Presto::Client.new(
  server: "localhost:8880",
  ssl: {verify: false},
  catalog: "native",
  schema: "default",
  time_zone: "US/Pacific",
  language: "English",
  http_debug: true,
)

client.run("select * from system.nodes")
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                        | 설명                                                                                                                                                                                | 기본값  |
|-----------------------|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `service_name`        | `DD_TRACE_PRESTO_SERVICE_NAME` | `presto` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `presto` |
| `peer_service`        | `DD_TRACE_PRESTO_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                       | `nil`    |


### Qless

Qless 통합은 수명 주기 후크를 사용하여 작업 실행을 추적합니다.

Qless 작업에 추적을 추가하려면:

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :qless, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키            | Env Var                 | 설명                                                    | 기본값 |
|----------------|-------------------------|----------------------------------------------------------------|---------|
| `tag_job_data` | `DD_QLESS_TAG_JOB_DATA` | 작업 인수로 태그 지정을 활성화합니다. 활성화는 `true`, 비활성화는 `false` | `false` |
| `tag_job_tags` | `DD_QLESS_TAG_JOB_TAGS` | 작업 태그로 태그 지정을 활성화합니다. 활성화는 `true`, 비활성화는 `false`      | `false` |

### Que

Que 통합은 작업 실행을 추적하는 미들웨어입니다.

`Datadog.configure`를 통해 활성화할 수 있습니다

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :que, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키             | Env Var                         | 설명                                                                                                                                                                 | 기본값                                                            |
|-----------------|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `enabled`       | `DD_TRACE_QUE_ENABLED`          | Que를 추적해야 하는지 여부를 정의합니다. 일시적으로 추적을 비활성화하는 데 유용합니다. `true` 또는 `false`                                                                           | `true`                                                             |
| `tag_args`      | `DD_TRACE_QUE_TAG_ARGS_ENABLED` | 작업 인수 필드의 태그 지정을 활성화합니다. 활성화는 `true`, 비활성화는 `false`                                                                                                        | `false`                                                            |
| `tag_data`      | `DD_TRACE_QUE_TAG_DATA_ENABLED` | 작업 데이터 필드의 태그 지정을 활성화합니다. 활성화는 `true`, 비활성화는 `false`                                                                                                        | `false`                                                            |
| `error_handler` |                                 | 작업에서 오류가 발생할 때 호출되는 사용자 정의 오류 핸들러입니다. `span` 및 `error`가 인수로 제공됩니다. 기본적으로 스팬에 대한 오류를 설정하며 일시적인 오류를 무시하는 데 유용합니다. | `proc { \|span, error \| span.set_error(error) unless span.nil? }` |

### Racecar

Racecar 통합은 Racecar 작업에 대한 추적을 제공합니다.

`Datadog.configure`를 통해 활성화할 수 있습니다

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :racecar, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                         | 설명                                                                                                                                                                                 | 기본값   |
|-----------------------|---------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| `service_name`        | `DD_TRACE_RACECAR_SERVICE_NAME` | `racecar` 계측을 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `racecar` |
|
### Rack

Rack 통합은 모든 요청이 기본 프레임워크나 애플리케이션에 도달하기 전에 추적하는 미들웨어를 제공합니다. Rack 최소 인터페이스에 응답하여 Rack 수준에서 가져올 수 있는 합리적인 값을 제공합니다.

이 통합은 Rails와 같은 웹 프레임워크를 통해 자동으로 활성화됩니다. 일반 Rack 애플리케이션을 사용하는 경우 `config.ru`으로의 통합을 활성화하세요.

```ruby
# config.ru 예시
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rack, **options
end

use Datadog::Tracing::Contrib::Rack::TraceMiddleware

app = proc do |env|
  [ 200, {'Content-Type' => 'text/plain'}, ['OK'] ]
end

run app
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `application` | Rack 애플리케이션. `middleware_names`에 필수입니다. | `nil` |
| `distributed_tracing` | 추적 헤더가 수신되면 이 서비스 트레이스가 다른 서비스의 트레이스와 연결되도록 [분산 추적](#distributed-tracing)을 활성화합니다. | `true` |
| `headers` | `rack.request`에 태그로 추가할 HTTP 요청 또는 응답 헤더의 해시입니다. Array 값이 포함된 `request` 및 `response` 키를 수락합니다 (예: `['Last-Modified']`). 그리고 `http.request.headers.*` 및 `http.response.headers.*` 태그를 각각 추가합니다. 이 옵션은 전역 `DD_TRACE_HEADER_TAGS`을 재정의합니다. 자세한 내용은 [루트 스팬에 헤더 태그 적용][헤더 태그]를 참조하세요. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `middleware_names` | 마지막으로 실행된 미들웨어 클래스를 `rack` 스팬의 리소스 이름으로 사용하려면 이 옵션을 활성화합니다. `rails` 계측과 함께 활성화된 경우 `rack` 리소스 이름을 활성 `rails` 컨트롤러로 설정하여 `rails`가 우선적으로 적용됩니다. 사용하려면  `application` 옵션이 필수입니다. | `false` |
| `quantize` | 양자화 옵션을 포함하는 해시입니다. `:query` 또는 `:fragment`을 포함할 수 있습니다. | `{}` |
| `quantize.base` | URL 기반(스키마, 호스트, 포트)에 대한 동작을 정의합니다. `http.base_url` 태그를 설정하지 않고 `http.url` 태그에 URL 기반을 유지하려면 `:show`, 또는 기본적으로 경로와 설정 `http.base_url`을 그대로 두고 `http.url` 태그에서 URL 기반을 제거하기 위해서는 `nil`일 수 있습니다. 옵션은 `quantize` 옵션 안에 중첩되어야 합니다. | `nil` |
| `quantize.query` | URL 양자화의 쿼리 부분에 대한 옵션이 포함된 해시입니다. `:show` 또는 `:exclude`을 포함할 수 있습니다. 아래 옵션을 참조하세요. 옵션은 `quantize` 옵션 안에 중첩되어야 합니다. | `{}` |
| `quantize.query.show` | 항상 표시되어야 하는 값을 정의합니다. 모든 값을 표시하는 `:all` 또는 값을 표시하지 않는 `nil` 문자열 배열일 수 있습니다. 옵션은 `query` 옵션 안에 중첩되어야 합니다. | `nil` |
| `quantize.query.exclude` | 완전히 제거해야 하는 값을 정의합니다. 쿼리 문자열을 완전히 제거하는 `:all` 또는 아무것도 제외하지 않는 `nil` 문자열 배열일 수 있습니다. 옵션은 `query` 옵션 안에 중첩되어야 합니다. | `nil` |
| `quantize.query.obfuscate` | 쿼리 문자열 수정 동작을 정의합니다. 옵션의 해시일 수 있으며, 기본 내부 난독화 설정을 사용하려면 `:internal`, 또는 난독화를 비활성화하려면 `nil`입니다. 난독화는 키-값 작업이 아닌 문자열 방식 작업입니다. 활성화되었다면 따로 설정하지 않은 경우 `query.show`의 기본값은 `:all`입니다. 옵션은 `query` 옵션 안에 중첩되어야 합니다. | `nil` |
| `quantize.query.obfuscate.with` | 난독화된 일치 항목을 대체할 문자열을 정의합니다. 문자열일 수 있습니다. 옵션은 `query.obfuscate` 옵션 안에 중첩되어야 합니다. | `'<redacted>'` |
| `quantize.query.obfuscate.regex` | 쿼리 문자열을 수정할 정규식을 정의합니다. Regexp일 수도 있고 잘 알려진 민감한 데이터를 수정하는 기본 내부 Regexp를 사용하기 위한 `:internal`일 수 있습니다. 각 일치 항목은 `query.obfuscate.with`로 대체하여 완전히 수정됩니다. 옵션은 `query.obfuscate` 옵션 안에 중첩되어야 합니다. | `:internal` |
| `quantize.fragment` | URL 조각의 동작을 정의합니다. URL 조각을 표시하는 `:show` 또는 조각을 제거하는 `nil`일 수 있습니다. 옵션은 `quantize` 옵션 안에 중첩되어야 합니다. | `nil` |
| `request_queuing` | 프런트엔드 서버의 대기열에서 소요된 HTTP 요청 시간을 추적합니다. 설정 세부정보는 [HTTP 요청 대기열](#http-request-queuing)을 참조하세요. | `false` |
| `web_service_name` | 프런트엔드 서버 요청 대기열 스팬의 서비스 이름 (예: `'nginx'`) | `'web-server'` |

지원 중단 알림:
- 향후 버전에서는 `quantize.base`의 기본값이 `:exclude`에서 `:show`로 변경됩니다. 따라서 `:show`로 이전하는 것이 좋습니다.
- 향후 버전에서는 `quantize.query.show`의 기본값이 `:all`로, `quantize.query.obfuscate`가 `:internal`로 변경됩니다. 따라서 해당 값으로 이전하는 것이 좋습니다.

**URL 양자화 동작 구성**

```ruby
Datadog.configure do |c|
  # 기본 동작: 모든 값이 양자화되고, 베이스가 제거되고, 조각이 제거됩니다.
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by
  # http://example.com:8080/path?categories[]=1&categories[]=2 --> /path?categories[]

  # URL 베이스 (스키마, 호스트, 포트) 제거
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { base: :exclude }

  # URL 베이스 표시
  # http://example.com/path?category_id=1&sort_by=asc#featured --> http://example.com/path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { base: :show }

  # 'category_id'와 정확히 일치하는 쿼리 문자열 파라미터의 값 표시
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id=1&sort_by
  c.tracing.instrument :rack, quantize: { query: { show: ['category_id'] } }

  # 모든 쿼리 문자열 파라미터에 대한 모든 값 표시
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id=1&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { show: :all } }

  # 'sort_by'와 정확히 일치하는 쿼리 문자열 파라미터를 완전히 제외
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id
  c.tracing.instrument :rack, quantize: { query: { exclude: ['sort_by'] } }

  # 쿼리 문자열을 완전히 제거하
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path
  c.tracing.instrument :rack, quantize: { query: { exclude: :all } }

  # URL 조각 표시
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?category_id&sort_by#featured
  c.tracing.instrument :rack, quantize: { fragment: :show }

  # 쿼리 문자열을 난독화하고 기본적으로 모든 값을 표시
  # http://example.com/path?password=qwerty&sort_by=asc#featured --> /path?<redacted>&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: {} } }

  # 제공된 정규식을 사용하여 쿼리 문자열을 난독화하고 기본적으로 모든 값을 표시
  # http://example.com/path?category_id=1&sort_by=asc#featured --> /path?<redacted>&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: { regex: /category_id=\d+/ } } }

  # 사용자 정의 교정 문자열을 사용하여 쿼리 문자열 난독화
  # http://example.com/path?password=qwerty&sort_by=asc#featured --> /path?REMOVED&sort_by=asc
  c.tracing.instrument :rack, quantize: { query: { obfuscate: { with: 'REMOVED' } } }
end
```

### Rails

Rails 통합은 요청, 데이터베이스 호출, 템플릿 렌더링 및 캐시 읽기/쓰기/삭제 작업을 추적합니다. 통합에서는 Active Support Instrumentation을 사용하여 API에 의해 계측된 모든 작업이 추적되도록  Notification API를 수신합니다.

Rails 계측을 활성화하려면 `config/initializers` 폴더에 초기화 파일을 생성하세요.

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rails, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `distributed_tracing` | 추적 헤더가 수신되면 이 서비스 트레이스가 다른 서비스의 트레이스와 연결되도록 [분산 추적](#distributed-tracing)을 활성화합니다. | `true` |
| `request_queuing` | 프런트엔드 서버의 대기열에서 소요된 HTTP 요청 시간을 추적합니다. 설정 세부정보는 [HTTP 요청 대기열](#http-request-queuing)을 참조하세요. | `false` |
| `middleware` | Rails 애플리케이션에 트레이스 미들웨어를 추가합니다. 미들웨어가 로드되는 것을 원하지 않으면 `false`로 설정하세요 | `true` |
| `middleware_names` | 미들웨어 이름을 트레이스의 리소스로 표시하기 위해 단락된 미들웨어 요청을 활성화합니다. | `false` |
| `service_name` | 애플리케이션 요청 추적 시 사용되는 서비스 이름(`rack` 레벨에서) | `'<app_name>'` (Rails 애플리케이션 네임스페이스에서 추론됨) |
| `template_base_path` | 템플릿 이름을 파싱할 때 사용됩니다. 템플릿을 `views/` 폴더에 저장하지 않는 경우 이 값을 변경해야 할 수도 있습니다. | `'views/'` |

**지원 버전**

| MRI 버전  | JRuby 버전 | Rails 버전 |
| ------------- | -------------- | -------------- |
|  2.1          |                |  3.2 - 4.2     |
|  2.2 - 2.3    |                |  3.2 - 5.2     |
|  2.4          |                |  4.2.8 - 5.2   |
|  2.5          |                |  4.2.8 - 6.1   |
|  2.6 - 2.7    |  9.2           |  5.0 - 6.1     |
|  3.0 - 3.2    |                |  6.1           |

### Rake

`rake` 통합을 활성화하고 계측해야 하는 Rake 작업 목록을 제공하여 Rake 작업 주변에 계측을 추가할 수 있습니다.

**장기 실행 Rake 작업을 계측하지 마세요. 이러한 작업은 작업이 완료될 때까지 절대 플러시되지 않는 메모리에서 큰 트레이스를 집계할 수 있습니다.**

장기 실행 작업의 경우 반복되는 코드 경로 주위에 [수동 계측](#manual-instrumentation)을 사용하세요.

Rake 작업 추적을 활성화하려면 다음을 `Rakefile`에 추가하세요.

```ruby
# Rakefile 상단에서:
require 'rake'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rake, tasks: ['my_task'], **options
end

task :my_task do
  # 여기서 작업을 수행하세요.
end

Rake::Task['my_task'].invoke
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `enabled` | Rake 작업을 추적해야 하는지 여부를 정의합니다. 일시적으로 추적을 비활성화하는 데 유용합니다. `true` 또는 `false` | `true` |
| `quantize` | 작업 인수의 양자화 옵션을 포함하는 해시입니다. 자세한 내용과 예시는 아래를 참조하세요. | `{}` |
| `service_name` | `rake` 계측에 사용되는 서비스 이름 | `'rake'` |
| `tasks` | 계측할 Rake 작업의 이름 | `[]` |

**작업 양자화 동작 구성**

```ruby
Datadog.configure do |c|
  # :one, :two, :three를 허용하는 작업이 있다고 가정하면
  # 'foo', 'bar', 'baz'로 호출됩니다

  # 기본 동작: 모든 인수가 양자화됩니다.
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: '?', three: '?' }
  c.tracing.instrument :rake

  # :two와 정확히 일치하는 인수의 값 표시
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: 'bar', three: '?' }
  c.tracing.instrument :rake, quantize: { args: { show: [:two] } }

  # 모든 인수에 대한 모든 값을 표시
  # `rake.invoke.args` tag  --> ['foo', 'bar', 'baz']
  # `rake.execute.args` tag --> { one: 'foo', two: 'bar', three: 'baz' }
  c.tracing.instrument :rake, quantize: { args: { show: :all } }

  # :three와 정확히 일치하는 인수를 완전히 제외
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> { one: '?', two: '?' }
  c.tracing.instrument :rake, quantize: { args: { exclude: [:three] } }

  # 인수를 완전히 제거
  # `rake.invoke.args` tag  --> ['?']
  # `rake.execute.args` tag --> {}
  c.tracing.instrument :rake, quantize: { args: { exclude: :all } }
end
```

### Redis

Redis 통합은 파이프라인뿐만 아니라 간단한 호출도 추적합니다.

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis, **options
end

# Redis 명령 수행
redis = Redis.new
redis.set 'foo', 'bar'
```

`options`는 다음 키워드 인수입니다.

| 키            | Env Var                       | 설명                                                                                                                                                                               | 기본값 |
|----------------|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `service_name` | `DD_TRACE_REDIS_SERVICE_NAME` | `redis` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `redis` |
| `peer_service` | `DD_TRACE_REDIS_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                      | `nil`   |
| `command_args` | `DD_REDIS_COMMAND_ARGS`       | 명령 인수(예: `GET key`에서 `key`)를 리소스 이름 및 태그로 표시합니다. `false`이면 명령 이름만 표시됩니다(예: `GET`). | false |


**인스턴스별 트레이스 설정 구성**

Redis 버전 5 이상:

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis # Enabling integration instrumentation is still required
end

customer_cache = Redis.new(custom: { datadog: { service_name: 'custom-cache' } })
invoice_cache = Redis.new(custom: { datadog: { service_name: 'invoice-cache' } })

# 추적된 호출은 `customer-cache` 서비스에 속합니다.
customer_cache.get(...)
# 추적된 호출은 `invoice-cache` 서비스에 속합니다.
invoice_cache.get(...)
```

독립형 `RedisClient`:

```ruby
require "redis-client"
require "ddtrace"

redis = RedisClient.config(custom: { datadog: { service_name: "my-custom-redis" } }).new_client

Datadog.configure do |c|
  c.tracing.instrument :redis # 통합 계측 활성화는 여전히 필요합니다.
end

redis.call('PING')
```

Redis 버전 5 이전:

```ruby
require 'redis'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :redis # Enabling integration instrumentation is still required
end

customer_cache = Redis.new
invoice_cache = Redis.new

Datadog.configure_onto(customer_cache, service_name: 'customer-cache')
Datadog.configure_onto(invoice_cache, service_name: 'invoice-cache')

# 추적된 호출은 `customer-cache` 서비스에 속합니다.
customer_cache.get(...)
# 추적된 호출은 `invoice-cache` 서비스에 속합니다.
invoice_cache.get(...)
```

**연결별 트레이스 설정 구성**

`describes` 옵션을 사용하여 연결당 트레이스 설정을 구성할 수 있습니다.

```ruby
# 연결 키와 함께 `:describes` 옵션을 제공하세요.
# 다음 키는 모두 허용되며 서로 동일합니다.
# 블록이 제공되면 위에 나열된 구성 옵션을 허용하는 
# Settings 개체가 생성됩니다.

Datadog.configure do |c|
  # 모든 Redis 클라이언트의 기본 구성
  c.tracing.instrument :redis, service_name: 'redis-default'

  # 특정 Unix 소켓과 일치하는 구성
  c.tracing.instrument :redis, describes: { url: 'unix://path/to/file' }, service_name: 'redis-unix'

  # 네트워크 연결의 경우 매칭 중에 다음 필드만 고려됩니다.
  # scheme, host, port, db
  # 다른 필드는 무시됩니다.

  # 네트워크 연결 문자열
  c.tracing.instrument :redis, describes: 'redis://127.0.0.1:6379/0', service_name: 'redis-connection-string'
  c.tracing.instrument :redis, describes: { url: 'redis://127.0.0.1:6379/1' }, service_name: 'redis-connection-url'
  # 네트워크 클라이언트 해시
  c.tracing.instrument :redis, describes: { host: 'my-host.com', port: 6379, db: 1, scheme: 'redis' }, service_name: 'redis-connection-hash'
  # 연결 해시의 하위 집합만 해당
  c.tracing.instrument :redis, describes: { host: ENV['APP_CACHE_HOST'], port: ENV['APP_CACHE_PORT'] }, service_name: 'redis-cache'
  c.tracing.instrument :redis, describes: { host: ENV['SIDEKIQ_CACHE_HOST'] }, service_name: 'redis-sidekiq'
end
```

여러 `describes` 구성이 연결과 일치하는 경우 일치하는 최신 구성 규칙이 적용됩니다.

### Resque

Resque 통합은 `perform` 메서드를 래핑하는 Resque 후크를 사용합니다.

Resque 작업에 추적을 추가하려면:

```ruby
require 'resque'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :resque, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `error_handler` | 작업에서 오류가 발생할 때 호출되는 사용자 정의 오류 핸들러입니다. `span` 및 `error`가 인수로 제공됩니다. 기본적으로 스팬에 대한 오류를 설정하며 일시적인 오류를 무시하는 데 유용합니다. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Rest Client

`ddtrace` 미들웨어를 통해 `rest-client` 통합을 이용할 수 있습니다.

```ruby
require 'rest_client'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :rest_client, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                             | 설명                                                                                                                                                                                     | 기본값       |
|-----------------------|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `service_name`        | `DD_TRACE_REST_CLIENT_SERVICE_NAME` | `rest_client` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration) | `rest_client` |
| `peer_service`        | `DD_TRACE_REST_CLIENT_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                            | `nil`         |
| `distributed_tracing` |                                     | [분산 추적]을 활성화합니다(#distributed-tracing)                                                                                                                                             | `true`        |
| `split_by_domain`     |                                     | Uses the request domain as the service name when set to `true`.                                                                                                                                 | `false`       |

### Roda

Roda 통합은 요청을 추적합니다.

**Roda** 통합은 `Datadog.configure`를 통해 활성화할 수 있습니다. 분산 추적을 위해 `use Datadog::Tracing::Contrib::Rack::TraceMiddleware`를 통해 **Rack**과 함께 이 통합을 사용하는 것이 좋습니다.

```ruby
require "roda"
require "ddtrace"

class SampleApp < Roda
  use Datadog::Tracing::Contrib::Rack::TraceMiddleware

  Datadog.configure do |c|
    c.tracing.instrument :roda, **options
  end

  route do |r|
    r.root do
      r.get do
        'Hello World!'
      end
    end
  end
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `service_name` | `roda` 계측에 대한 서비스 이름. | `'nil'` |

### RSpec

RSpec 통합은 `rspec` 테스트 프레임워크를 사용할 때 예제 그룹 및 예제의 모든 실행을 추적합니다.

통합을 활성화하려면 `Datadog.configure` 메서드를 사용합니다.

```ruby
require 'rspec'
require 'ddtrace'

# 기본 RSpec 통합 구성
Datadog.configure do |c|
  c.ci.instrument :rspec, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `enabled` | RSpec 테스트를 추적해야 하는지 여부를 정의합니다. 일시적으로 추적을 비활성화하는 데 유용합니다. `true` 또는 `false` | `true` |
| `service_name` | `rspec` 계측에 사용되는 서비스 이름 | `'rspec'` |
| `operation_name` | `rspec` 계측에 사용되는 작업 이름. 자동 트레이스 메트릭의 이름을 바꾸려는 경우 유용합니다. 예: `trace.#{operation_name}.errors` | `'rspec.example'` |

### Sequel

Sequel 통합은 데이터베이스에 대한 쿼리를 추적합니다.

```ruby
require 'sequel'
require 'ddtrace'

# 데이터베이스에 연결
database = Sequel.sqlite

# 테이블 생성
database.create_table :articles do
  primary_key :id
  String :name
end

Datadog.configure do |c|
  c.tracing.instrument :sequel, **options
end

# 쿼리 수행
articles = database[:articles]
articles.all
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `service_name` | `sequel` 계측에 대한 서비스 이름. | 데이터베이스 어댑터 이름(예: `'mysql2'`) |

**다른 설정을 사용하도록 데이터베이스 구성**

Sequel과 함께 여러 데이터베이스를 사용하는 경우 해당 `Sequel::Database` 개체를 구성하여 각 데이터베이스에 서로 다른 설정을 지정할 수 있습니다.

```ruby
sqlite_database = Sequel.sqlite
postgres_database = Sequel.connect('postgres://user:password@host:port/database_name')

# 서로 다른 서비스 이름으로 각 데이터베이스 구성
Datadog.configure_onto(sqlite_database, service_name: 'my-sqlite-db')
Datadog.configure_onto(postgres_database, service_name: 'my-postgres-db')
```

### Shoryuken

Shoryuken 통합은 작업 실행을 추적하는 서버 측 미들웨어입니다.

`Datadog.configure`를 통해 활성화할 수 있습니다

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :shoryuken, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `tag_body` | SQS 메시지 본문이 포함된 태그 스팬 `true` 또는 `false` | `false` |
| `error_handler` | 작업에서 오류가 발생할 때 호출되는 사용자 정의 오류 핸들러입니다. `span` 및 `error`가 인수로 제공됩니다. 기본적으로 스팬에 대한 오류를 설정하며 일시적인 오류를 무시하는 데 유용합니다. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Sidekiq

Sidekiq 통합은 작업 대기열 및 실행을 각각 추적하는 클라이언트 측 및 서버 측 미들웨어입니다.

`Datadog.configure`를 통해 활성화할 수 있습니다

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sidekiq, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `distributed_tracing` | [분산 추적](#distributed-tracing)을 활성화하면 `sidekiq.push` 스팬과 `sidekiq.job` 스팬 사이에 상위-하위 관계가 생성됩니다. <br /><br /> **중요**: *비동기 처리를 위해  distributed_tracing을  활성화하면 트레이스 그래프가 크게 변경될 수 있습니다. 이러한 경우에는 장기 실행 작업, 재시도된 작업, 먼 미래에 예약된 작업이 포함됩니다. 이 기능을 활성화한 후 트레이스를 검사하세요.* | `false` |
| `tag_args` | 작업 인수 태그 지정을 활성화합니다. 활성화는 `true`, 비활성화는 `false` | `false` |
| `error_handler` | 작업에서 오류가 발생할 때 호출되는 사용자 정의 오류 핸들러입니다. `span` 및 `error`가 인수로 제공됩니다. 기본적으로 스팬에 대한 오류를 설정하며 일시적인 오류를 무시하는 데 유용합니다. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |
| `quantize` | 작업 인수의 양자화 옵션을 포함하는 해시입니다. | `{}` |

### Sinatra

Sinatra 통합은 요청 및 템플릿 렌더링을 추적합니다.

추적 클라이언트 사용을 시작하려면 애플리케이션/경로를 정의하기 전, 그리고 `sinatra` 또는 `sinatra/base` 이후에 `ddtrace` 및 `instrument :sinatra`를 가져와야 합니다.

#### 클래식 애플리케이션

```ruby
require 'sinatra'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sinatra, **options
end

get '/' do
  'Hello world!'
end
```

#### 모듈형 애플리케이션

```ruby
require 'sinatra/base'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sinatra, **options
end

class NestedApp < Sinatra::Base
  get '/nested' do
    'Hello from nested app!'
  end
end

class App < Sinatra::Base
  use NestedApp

  get '/' do
    'Hello world!'
  end
end
```

#### 계측 옵션

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `distributed_tracing` | 추적 헤더가 수신되면 이 서비스 트레이스가 다른 서비스의 트레이스와 연결되도록 [분산 추적](#distributed-tracing)을 활성화합니다. | `true` |
| `headers` | `sinatra.request`에 태그로 추가할 HTTP 요청 또는 응답 헤더의 해시입니다. 배열 값이 포함된  `request` 및 `response` 키를 수락합니다 (예: `['Last-Modified']`). `http.request.headers.*` 및 `http.response.headers.*` 태그를 각각 추가합니다. 이 옵션은 전역 `DD_TRACE_HEADER_TAGS`를 재정의합니다. 자세한 내용은 [루트 스팬에 헤더 태그 적용][헤더 태그]를 참조하세요. | `{ response: ['Content-Type', 'X-Request-ID'] }` |
| `resource_script_names` | 리소스 이름 앞에 스크립트 이름 추가 | `false` |

### Sneakers

 Sneakers 통합은 작업 실행을 추적하는 서버 측 미들웨어입니다.

`Datadog.configure`를 통해 활성화할 수 있습니다

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sneakers, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `enabled` | Sneakers를 추적해야 하는지 여부를 정의합니다. 일시적으로 추적을 비활성화하는 데 유용합니다. `true` 또는 `false` | `true` |
| `tag_body` | 작업 메시지의 태그 지정을 활성화합니다. 활성화는 `true`, 비활성화는 `false` | `false` |
| `error_handler` | 작업에서 오류가 발생할 때 호출되는 사용자 정의 오류 핸들러입니다. `span` 및 `error`가 인수로 제공됩니다. 기본적으로 스팬에 대한 오류를 설정하며 일시적인 오류를 무시하는 데 유용합니다. | `proc { \|span, error\| span.set_error(error) unless span.nil? }` |

### Stripe

Stripe 통합은 Stripe API 요청을 추적합니다.

`Datadog.configure`를 통해 활성화할 수 있습니다

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :stripe, **options
end
```

`options`는 다음 키워드 인수입니다.

| 키 | 설명 | 기본값 |
| --- | ----------- | ------- |
| `enabled` | Stripe을 추적해야 하는지 여부를 정의합니다. 일시적으로 추적을 비활성화하는 데 유용합니다. `true` 또는 `false` | `true` |

### Sucker Punch

`sucker_punch` 통합은 모든 예약된 작업을 추적합니다.

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :sucker_punch
end

# 이 작업의 실행이 추적됩니다.
LogJob.perform_async('login')
```

### Trilogy

Trilogy 통합은 `trilogy` gem을 통해 전송된 모든 SQL 명령을 추적합니다.

```ruby
require 'trilogy'
require 'ddtrace'

Datadog.configure do |c|
  c.tracing.instrument :trilogy, **options
end

client = Trilogy.new(host: "localhost", username: "root")
client.query("SELECT * FROM users WHERE group='x'")
```

`options`는 다음 키워드 인수입니다.

| 키                   | Env Var                        | 설명                                                                                                                                                                                                                                                                                                                                                             | 기본값      |
|-----------------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------|
| `service_name`        | `DD_TRACE_TRILOGY_SERVICE_NAME` | `trilogy` 계측을 실행하는 애플리케이션의 이름. `global_default_service_name`에 의해 재정의될 수 있습니다. [자세한 내용은 *추가 구성* 참조](#additional-configuration)  | `trilogy` |
| `peer_service`        | `DD_TRACE_TRILOGY_PEER_SERVICE` | 애플리케이션이 연결되는 외부 서비스 이름                                                                                                                                         | `nil`     |

## 추가 설정

`ddtrace` 의 기본 동작을 변경하려면 우선 순위에 따라 1을 가장 높은 순서로 사용할 수 있습니다.

1. [원격 구성](https://docs.datadoghq.com/agent/remote_config).
2. `Datadog.configure` 블록 내부에 설정된 옵션, 예:
    ```ruby
    Datadog.configure do |c|
      c.service = 'billing-api'
      c.env = ENV['RACK_ENV']

      c.tracing.report_hostname = true
      c.tracing.test_mode.enabled = (ENV['RACK_ENV'] == 'test')
    end
    ```
3. 환경 변수

**옵션에 더 높은 우선순위 값이 설정된 경우 해당 옵션을 더 낮은 우선순위 값으로 설정해도 유효 값은 변경되지 않습니다.**

예를 들어 [원격 구성](#remote-configuration)으로 `tracing.sampling.default_rate`를 구성한 경우 `Datadog.configure` 블록을 통해 해당 값을 변경해도 유효하지 않습니다.

**사용 가능한 구성 옵션:**

| 설정                                                 | Env Var                                                 | 기본값                      | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|---------------------------------------------------------|---------------------------------------------------------|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **전역**                                              |                                                         |                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `agent.host`                                            | `DD_AGENT_HOST`                                         | `127.0.0.1`                  | 트레이스 데이터가 전송될 Agent의 호스트 이름.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `agent.port`                                            | `DD_TRACE_AGENT_PORT`                                   | `8126`                       | 트레이스 데이터가 전송될 Agent 호스트의 포트. [Agent 구성](#configuring-trace-data-ingestion)에서 `receiver_port` 또는 `DD_APM_RECEIVER_PORT`가 기본값 `8126`이 아닌 다른 값으로 설정된 경우 `DD_TRACE_AGENT_PORT` 또는 `DD_TRACE_AGENT_URL`과 일치해야 합니다.                                                                                                                                                                                                                                                                                                        |
|                                                         | `DD_TRACE_AGENT_URL`                                    | `nil`                        | 트레이스가 전송되는 URL 엔드포인트를 설정합니다. `agent.host` 및 `agent.port`보다 우선순위가 높습니다. [Agent 구성](#configuring-trace-data-ingestion)에서 `receiver_port` 또는 `DD_APM_RECEIVER_PORT`가 기본값 `8126`이 아닌 다른 값으로 설정된 경우 `DD_TRACE_AGENT_PORT` 또는 `DD_TRACE_AGENT_URL`과 일치해야 합니다.                                                                                                                                                                                                                                                               |
| `diagnostics.debug`                                     | `DD_TRACE_DEBUG`                                        | `false`                      | 디버그 모드를 활성화하거나 비활성화합니다. 장황한 로그를 출력합니다. **프로덕션 또는 기타 민감한 환경에는 권장되지 않습니다.** 자세한 내용은 [디버깅 및 진단](#debugging-and-diagnostics)을 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                   |
| `diagnostics.startup_logs.enabled`                      | `DD_TRACE_STARTUP_LOGS`                                 | `nil`                        | 시작 구성 및 진단을 로그에 출력합니다. 애플리케이션 시작 시 추적 상태를 평가합니다. 자세한 내용은 [디버깅 및 진단](#debugging-and-diagnostics)을 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                |
| `env`                                                   | `DD_ENV`                                                | `nil`                        | 애플리케이션 환경 (예: `production`, `staging` 등). 이 값은 모든 트레이스에 태그로 설정됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `service`                                               | `DD_SERVICE`                                            | *Ruby 파일명*              | 애플리케이션 기본 서비스 이름 (예: `billing-api`). 이 값은 모든 트레이스에 태그로 설정됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `tags`                                                  | `DD_TAGS`                                               | `nil`                        | `,`로 구분된 값 쌍의 커스텀 태그 (예: `layer:api,team:intake`). 이러한 태그는 모든 트레이스에 설정됩니다. 자세한 내용은 [환경 및 태그](#environment-and-tags)를 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                         |
| `time_now_provider`                                     |                                                         | `->{ Time.now }`             | 시간을 검색하는 방법을 변경합니다. 자세한 내용은 [시간 제공자 설정](#setting-the-time-provider)을 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `version`                                               | `DD_VERSION`                                            | `nil`                        | 애플리케이션 버전(예: `2.5`, `202003181415`, `1.3-alpha` 등). 이 값은 모든 트레이스에서 태그로 설정됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `telemetry.enabled`                                     | `DD_INSTRUMENTATION_TELEMETRY_ENABLED`                  | `true`                       | Datadog으로 원격 측정 데이터 전송을 활성화할 수 있습니다. [여기](https://docs.datadoghq.com/tracing/configure_data_security/#telemetry-collection)에 설명된 대로 비활성화할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                         |
| **추적**                                             |                                                         |                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `tracing.contrib.peer_service_mapping`                  | `DD_TRACE_PEER_SERVICE_MAPPING`                         | `nil`                        | 모든 계측에서 `peer.service` 태그 재매핑을 정의합니다. `old_value1:new_value1, old_value2:new_value2, ...` 목록을 제공하세요.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tracing.contrib.global_default_service_name.enabled`   | `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`     | `false`                      | 모든 계측에서 `service_name`의 기본값을 애플리케이션 서비스 이름으로 변경합니다. [Inferred Services Beta](https://docs.datadoghq.com/tracing/guide/inferred-service-opt-in)와 함께 사용됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `tracing.distributed_tracing.propagation_extract_first` | `DD_TRACE_PROPAGATION_EXTRACT_FIRST` | `false` | 첫 번째로 유효한 전파 형식이 감지되면 즉시 종료합니다. 자세한 내용은 [분산 추적](#distributed-tracing)을 참조하세요. |
| `tracing.distributed_tracing.propagation_extract_style` | `DD_TRACE_PROPAGATION_STYLE_EXTRACT`                    | `['Datadog','tracecontext']` | 추출할 분산 추적 전파 형식입니다. `DD_TRACE_PROPAGATION_STYLE`을 재정의합니다. 자세한 내용은 [분산 추적](#distributed-tracing)을 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `tracing.distributed_tracing.propagation_inject_style`  | `DD_TRACE_PROPAGATION_STYLE_INJECT`                     | `['Datadog','tracecontext']` | 주입할 분산 추적 전파 형식입니다. `DD_TRACE_PROPAGATION_STYLE`을 재정의합니다. 자세한 내용은 [분산 추적](#distributed-tracing)을 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tracing.distributed_tracing.propagation_style`         | `DD_TRACE_PROPAGATION_STYLE`                            | `nil`                        | 추출 및 주입을 위한 분산 추적 전파 형식입니다. 자세한 내용은 [분산 추적](#distributed-tracing)을 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `tracing.enabled`                                       | `DD_TRACE_ENABLED`                                      | `true`                       | 추적을 활성화하거나 비활성화합니다. `false` 설정된 경우 계측은 계속 실행되지만 트레이스 에이전트로 트레이스가 전송되지 않습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `tracing.header_tags`                                   | `DD_TRACE_HEADER_TAGS`                                  | `nil`                        | HTTP 헤더를 스팬 태그로 기록합니다. 자세한 내용은 [루트 스팬에 헤더 태그 적용][헤더 태그]를 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `tracing.instrument(<integration-name>, <options...>)`  |                                                         |                              | 특정 라이브러리에 대한 계측을 활성화합니다. 자세한 내용은 [통합 계측](#integration-instrumentation)을 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `tracing.log_injection`                                 | `DD_LOGS_INJECTION`                                     | `true`                       | [Trace Correlation](#trace-correlation) 정보가 있는 경우 Rails 로그에 삽입합니다. 기본 로거(`ActiveSupport::TaggedLogging`), `lograge`, `semantic_logger`를 지원합니다.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `tracing.partial_flush.enabled`                         |                                                         | `false`                      | 부분 플러시를 활성화하거나 비활성화합니다. 부분 플러시는 트레이스의 완료된 부분을 Agent에 제출합니다. 스팬이 많은 장기 실행 작업(예: jobs)을 추적할 때 사용됩니다.                                                                                                                                                                                                                                                                                                                                                                                                 |
| `tracing.partial_flush.min_spans_threshold`             |                                                         | `500`                        | 부분 플러시가 완료된 스팬을 제출하기 전에 트레이스에서 완료되어야 하는 스팬 수입니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tracing.sampler`                                       |                                                         | `nil`                        | 고급 사용에만 해당됩니다. 사용자 정의 `Datadog::Tracing::Sampling::Sampler` 인스턴스를 설정합니다. 제공된 경우 트레이서는 이 샘플러를 사용하여 샘플링 동작을 결정합니다. 자세한 내용은 [애플리케이션 측 샘플링](#application-side-sampling)을 참조하세요.                                                                                                                                                                                                                                                                                                                                                |
| `tracing.sampling.default_rate`                         | `DD_TRACE_SAMPLE_RATE`                                  | `nil`                        | `0.0` (0%)와 `1.0` (100%) 사이에서 트레이스 샘플링 속도를 설정합니다. 자세한 내용은 [애플리케이션 측 샘플링](#application-side-sampling)을 참조하세요.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `tracing.sampling.rate_limit`                           | `DD_TRACE_RATE_LIMIT`                                   | `100` (초당)           | 샘플링할 초당 최대 트레이스 수를 설정합니다. 트래픽 급증 시 수집량 초과를 방지하기 위해 속도 제한을 설정합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tracing.sampling.rules`                                | `DD_TRACE_SAMPLING_RULES`                               | `nil`                        | 로컬 루트 스팬과 일치하는 트레이스 수준 샘플링 규칙을 설정합니다. 형식은 JSON과 함께 `String`이며, 개체 배열을 포함합니다. 각 개체에는 부동 속성 `sample_rate`(0.0에서 1.0 사이 포함)이 있어야 하며 선택적으로 `name`, `service`, `resource`, `tags` 문자열 속성이 있어야 합니다. `name`, `service`, `resource`, `tags`가 샘플링 규칙이 적용되는 트레이스를 제어합니다. 모두 없으면 이 규칙이 모든 트레이스에 적용됩니다. 규칙은 배열에서 선언된 순서대로 평가됩니다. 일치하는 첫 번째 항목만 적용되고, 적용되는 항목이 없으면 `tracing.sampling.default_rate`가 적용됩니다. |
| `tracing.sampling.span_rules`                           | `DD_SPAN_SAMPLING_RULES`,`ENV_SPAN_SAMPLING_RULES_FILE` | `nil`                        | [단일 스팬 샘플링](#single-span-sampling) 규칙을 설정합니다. 이러한 규칙을 사용하면 해당 트레이스가 삭제된 경우에도 스팬을 유지할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tracing.trace_id_128_bit_generation_enabled`           | `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`           | `true`                       | 128비트 트레이스 ID를 생성하려면 `true`, 64비트 트레이스 ID를 생성하려면 `false`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `tracing.report_hostname`                               | `DD_TRACE_REPORT_HOSTNAME`                              | `false`                      | 트레이스에 호스트 이름 태그를 추가합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `tracing.test_mode.enabled`                             | `DD_TRACE_TEST_MODE_ENABLED`                            | `false`                      | 테스트 스위트에서 추적을 사용하기 위해 테스트 모드를 활성화하거나 비활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `tracing.test_mode.trace_flush`                         |                                                         | `nil`                        | 트레이스 플러시 동작을 결정하는 개체입니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

#### 커스텀 로깅

기본적으로 모든 로그는 기본 Ruby 로거에 의해 처리됩니다. Rails를 사용할 때 애플리케이션 로그 파일에 메시지가 표시되어야 합니다.

Datadog 클라이언트 로그 메시지에는 `[ddtrace]` 표시가 있으므로 다른 메시지와 격리할 수 있습니다.

또한 `log` 설정을 사용해 기본 로거를 재정의하고 이를 사용자 지정 로거로 교체할 수도 있습니다.

```ruby
f = File.new("my-custom.log", "w+") # 로그 메시지가 있어야 합니다.
Datadog.configure do |c|
  c.logger.instance = Logger.new(f) # 기본 로거 재정의
  c.logger.level = ::Logger::INFO
end

Datadog.logger.info { "this is typically called by tracing code" }
```

#### 환경 및 태그

기본적으로 트레이스 Agent (이 라이브러리가 아니라 다양한 클라이언트에서 데이터를 수집하는 백그라운드에서 실행되는 프로그램)는 Agent 구성 파일에 설정된 태그를 사용합니다. 다음 환경 변수를 사용하여 트레이스 및 메트릭에 자동으로 태그를 지정하도록 애플리케이션을 구성할 수 있습니다.

 - `DD_ENV`: 애플리케이션 환경 (예: `production`, `staging` 등)
 - `DD_SERVICE`: 애플리케이션 기본 서비스 이름 (예: `billing-api`)
 - `DD_VERSION`: 애플리케이션 버전 (예: `2.5`, `202003181415`, `1.3-alpha` 등)
 - `DD_TAGS`: `,`으로 구분된 값 쌍의 커스텀 태그  (예: `layer:api,team:intake`)
    -  `DD_ENV`, `DD_SERVICE`, `DD_VERSION`가 설정되어 있으면 `DD_TAGS`에 정의된 모든 `env`/`service`/`version` 태그를 재정의합니다.
    - `DD_ENV`, `DD_SERVICE`, `DD_VERSION`이 설정되어 있지 않으면 `DD_TAGS`에 정의된 태그는 각각`env`/`service`/`version`을 생성하기 위해 사용됩니다.

이러한 값은 트레이서 수준에서 재정의될 수도 있습니다.

```ruby
Datadog.configure do |c|
  c.service = 'billing-api'
  c.env = 'test'
  c.tags = { 'team' => 'qa' }
  c.version = '1.3-alpha'
end
```

애플리케이션별로 이 값을 설정할 수 있으므로 동일한 호스트에서 서로 다른 환경에 대해 보고하는 여러 애플리케이션을 가질 수 있습니다.

태그는 개별 스팬에 직접 설정할 수도 있으며, 이는 애플리케이션 수준에서 정의된 충돌하는 태그를 대체합니다.

#### 디버깅 및 진단

추적을 위해 진단을 생성하는 두 가지 방법이 있습니다.

##### 디버그 모드 활성화

라이브러리를 디버그 모드로 전환하면 억제된 오류를 포함하여 추적 활동에 대한 자세한 로그가 생성됩니다. 이 출력은 오류를 식별하거나 Agent에 대한 트레이스 출력을 확인하는 데 도움이 될 수 있습니다.

`diagnostics.debug = true` 또는 `DD_TRACE_DEBUG`를 통해 활성화할 수 있습니다.

```ruby
Datadog.configure { |c| c.diagnostics.debug = true }
```

매우 장황하게 로드되기 때문에 **프로덕션이나 기타 민감한 환경에서는 이 기능을 사용하지 않는 것이 좋습니다**. 애플리케이션 로드를 제어할 수 있는 통제된 환경에서 사용하는 것이 가장 좋습니다.

##### Startup 로그 활성화

Startup 로그는 애플리케이션이 처음 구성될 때 추적 상태에 대한 보고서를 생성합니다. 이는 구성 및 계측이 올바르게 활성화되었는지 확인하는 데 도움이 될 수 있습니다.

`diagnostics.startup_logs.enabled = true` 또는 `DD_TRACE_STARTUP_LOGS`를 통해 활성화할 수 있습니다. 

```ruby
Datadog.configure { |c| c.diagnostics.startup_logs.enabled = true }
```

기본적으로 이는 `ddtrace`가 애플리케이션이 비개발 환경에서 실행되고 있음을 감지할 때마다 활성화됩니다.

### 샘플링

사용 가능한 모든 샘플링 옵션 목록은 [수집 메커니즘](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=ruby)을 참조하세요.


#### 우선순위 샘플링

우선순위 샘플링은 분산 추적에 전파되는 우선순위 속성을 사용하여 트레이스를 유지할지 여부를 결정합니다. 해당 값은 트레이스가 얼마나 중요한지 Agent와 백엔드에 나타냅니다.

샘플러는 우선순위를 다음 값으로 설정할 수 있습니다.

 - `Datadog::Tracing::Sampling::Ext::Priority::AUTO_REJECT`: 샘플러는 자동으로 트레이스를 거부하기로 결정했습니다.
 - `Datadog::Tracing::Sampling::Ext::Priority::AUTO_KEEP`: 샘플러는 자동으로 트레이스를 유지하기로 결정했습니다..

우선순위 샘플링은 기본적으로 활성화되어 있습니다. 이를 활성화하면 샘플링된 분산 추적이 완료됩니다. 활성화된 후 샘플러는 서비스 및 볼륨에 따라 트레이스에 자동으로 0 또는 1의 우선순위를 할당합니다.

관심 없는 트레이스를 삭제하거나 중요한 트레이스를 유지하기 위해 이 우선순위를 수동으로 설정할 수도 있습니다. 이를 위해 `TraceOperation#sampling_priority`를 다음으로 설정합니다.

 - `Datadog::Tracing::Sampling::Ext::Priority::USER_REJECT`: 사용자가 트레이스를 거부하도록 요청했습니다.
 - `Datadog::Tracing::Sampling::Ext::Priority::USER_KEEP`: 사용자가 트레이스를 유지하도록 요청했습니다.

[분산 추적](#distributed-tracing)을 사용하지 않는 경우 트레이스가 완료되지 않는 한 언제든지 우선순위를 변경할 수 있습니다. 그러나 분산 컨텍스트에서 유용하려면 컨텍스트 전파(포크, RPC 호출) 전에 수행되어야 합니다. 컨텍스트가 전파된 후 우선순위를 변경하면 분산 추적의 다른 부분이 다른 우선순위를 사용하게 됩니다. 일부 부분은 유지되고 일부 부분은 거부될 수 있으며 이로 인해 트레이스가 부분적으로 저장되고 불완전한 상태로 유지될 수 있습니다.

이러한 이유로 우선순위를 변경할 경우 최대한 빨리 변경하는 것을 권장합니다.

샘플링 우선순위를 변경하려면 다음 방법을 사용할 수 있습니다.

```ruby
# 활성 추적을 거부합니다.
Datadog::Tracing.reject!

# 활성 추적을 유지합니다.
Datadog::Tracing.keep!
```

활성화된 트레이스가 없을 때에는 `Datadog::Tracing.reject!` 및 `Datadog::Tracing.keep!`을 사용하는 것이 안전합니다.

특정 트레이스 인스턴스를 거부할 수도 있습니다.

```ruby
# 먼저 활성 추적을 가져옵니다.
trace = Datadog::Tracing.active_trace

# 트레이스를 거부합니다.
trace.reject!

# 트레이스를 유지합니다.
trace.keep!
```

#### 단일 스팬 샘플링

트레이스 수준 샘플링 규칙에 의해 해당 트레이스가 삭제되더라도 스팬을 유지하도록 허용하는 샘플링 규칙을 구성할 수 있습니다.

이를 통해 추적 수준 샘플링이 적용될 때 중요한 스팬을 유지할 수 있습니다. 단일 스팬 샘플링을 사용하여 스팬을 삭제할 수 없습니다.

이를 구성하려면 [수집 메커니즘 문서](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=ruby#single-spans)를 참조하세요.

#### 애플리케이션 측 샘플링

Datadog Agent는 트레이스를 샘플링하여 대역폭 사용량을 줄일 수 있지만 애플리케이션 측 샘플링은 호스트 애플리케이션의 성능 오버헤드를 줄여줍니다.

**애플리케이션 측 샘플링은 가능한 한 빨리 트레이스를 삭제합니다. 이로 인해 [Ingestion Controls](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_controls/) 페이지에서 정확한 샘플링 비율을 보고할 만큼 충분한 정보를 수신하지 못하게 됩니다. 추적 오버헤드를 줄이는 것이 중요한 경우에만 사용하세요.**

이 기능을 사용하는 경우 더 나은 지원을 위해 [GitHub에서 이슈를 열어주세요](https://github.com/DataDog/dd-trace-rb/issues/new).

다음 설정을 사용하여 *애플리케이션 측 샘플링*을 구성할 수 있습니다.

```ruby
# 애플리케이션 측 샘플링 활성화:  Ingestion Controls 페이지가 정확하지 않습니다.
sampler = Datadog::Tracing::Sampling::RateSampler.new(0.5) # 트레이스의 50% 샘플링

Datadog.configure do |c|
  c.tracing.sampler = sampler
end
```

이러한 설정에 대한 자세한 내용은 [추가 구성](#additional-configuration)을 참조하세요.

### 분산 추적

분산 추적을 사용하면 계측된 여러 애플리케이션에 트레이스를 전파할 수 있으므로 요청이 서비스당 별도의 트레이스가 아닌 단일 트레이스로 표시될 수 있습니다.

애플리케이션 경계를 넘어 요청을 추적하려면 다음 사항이 각 애플리케이션 간에 전파되어야 합니다.

| 속성              | 유형    | 설명                                                                                                                 |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| **트레이스 ID**          | 정수 | 트레이스의 ID. 이 값은 동일한 트레이스에 속한 모든 요청에서 동일해야 합니다.                           |
| **상위 스팬 ID**    | 정수 | 요청이 발생한 서비스의 스팬 ID. 이 값은 트레이스 내의 각 요청마다 항상 다릅니다. |
| *샘플링 우선순위** | 정수 | 트레이스의 샘플링 우선순위 수준. 이 값은 동일한 트레이스에 속한 모든 요청에서 동일해야 합니다.     |

이러한 전파는 다음과 같이 시각화할 수 있습니다.

```
Service A:
  Trace ID:  100000000000000001
  Parent ID: 0
  Span ID:   100000000000000123
  Priority:  1

  |
  | Service B Request:
  |   Metadata:
  |     Trace ID:  100000000000000001
  |     Parent ID: 100000000000000123
  |     Priority:  1
  |
  V

Service B:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000123
  Span ID:   100000000000000456
  Priority:  1

  |
  | Service C Request:
  |   Metadata:
  |     Trace ID:  100000000000000001
  |     Parent ID: 100000000000000456
  |     Priority:  1
  |
  V

Service C:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000456
  Span ID:   100000000000000789
  Priority:  1
```

**HTTP를 통해**

계측된 애플리케이션 간의 HTTP 요청의 경우 이 트레이스 메타데이터는 HTTP 요청 헤더를 사용하여 전파됩니다.

| 속성              | 유형    | HTTP 헤더 이름              |
| --------------------- | ------- | ----------------------------- |
| **트레이스 ID**          | 정수 | `x-datadog-trace-id`          |
| **상위 스팬 ID**    | 정수 | `x-datadog-parent-id`         |
| *샘플링 우선순위** | 정수 | `x-datadog-sampling-priority` |

다음과 같습니다:

```
Service A:
  Trace ID:  100000000000000001
  Parent ID: 0
  Span ID:   100000000000000123
  Priority:  1

  |
  | Service B HTTP Request:
  |   Headers:
  |     x-datadog-trace-id:          100000000000000001
  |     x-datadog-parent-id:         100000000000000123
  |     x-datadog-sampling-priority: 1
  |
  V

Service B:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000123
  Span ID:   100000000000000456
  Priority:  1

  |
  | Service C HTTP Request:
  |   Headers:
  |     x-datadog-trace-id:          100000000000000001
  |     x-datadog-parent-id:         100000000000000456
  |     x-datadog-sampling-priority: 1
  |
  V

Service C:
  Trace ID:  100000000000000001
  Parent ID: 100000000000000456
  Span ID:   100000000000000789
  Priority:  1
```

#### 분산 헤더 형식

추적은 다음 분산 추적 형식을 지원합니다.

 - `Datadog`
 - `tracecontext`: [W3C Trace Context](https://www.w3.org/TR/trace-context/)
 - `b3multi`: [B3 multiple-headers](https://github.com/openzipkin/b3-propagation#multiple-headers)
 - `b3`: [B3 single-header](https://github.com/openzipkin/b3-propagation#single-header)
 - `none`: 작동하지 않음

`Datadog.configure`를 통해 이러한 형식 사용을 활성화하거나 비활성화할 수 있습니다.

```ruby
Datadog.configure do |c|
  # 추출해야 하는 헤더 형식 목록
  c.tracing.distributed_tracing.propagation_extract_style = [ 'tracecontext', 'Datadog', 'b3' ]

  # 삽입되어야 하는 헤더 형식 목록
  c.tracing.distributed_tracing.propagation_inject_style = [ 'tracecontext', 'Datadog' ]
end
```

**통합을 위한 분산 추적 활성화**

`ddtrace`에 포함된 많은 통합은 분산 추적을 지원합니다. 분산 추적은 Agent v7 및 대부분의 Agent v6 버전에서 기본적으로 활성화됩니다. 필요한 경우 구성 설정을 사용하여 분산 추적을 활성화할 수 있습니다.

- 애플리케이션이 분산 추적이 활성화된 서비스로부터 요청을 받으면 이러한 요청을 처리하는 통합(예: Rails)에서 분산 추적을 활성화해야 합니다.
- 애플리케이션이 분산 추적이 활성화된 서비스에 요청을 보내는 경우 이러한 요청을 보내는 통합(예: Faraday)에서 분산 추적을 활성화해야 합니다.
- 애플리케이션이 분산 추적을 구현하는 요청을 보내고 받는 경우 이러한 요청을 처리하는 모든 통합을 활성화해야 합니다.

통합에서 분산 추적을 활성화하는 방법에 대한 자세한 내용은 해당 설명서를 참조하세요.

- [Excon](#excon)
- [Faraday](#faraday)
- [Rest Client](#rest-client)
- [Net/HTTP](#nethttp)
- [Rack](#rack)
- [Rails](#rails)
- [Sinatra](#sinatra)
- [http.rb](#httprb)
- [httpclient](#httpclient)
- [httpx](#httpx)

**HTTP 전파자 사용**

이 메타데이터를 더 쉽게 전파하는 프로세스를 만들기 위해 `Datadog::Tracing::Propagation::HTTP` 모듈을 사용할 수 있습니다.

클라이언트에서:

```ruby
Datadog::Tracing.trace('web.call') do |span, trace|
  # 요청 헤더에 트레이스 헤더 삽입 (`env`는 해시여야 함)
  Datadog::Tracing::Propagation::HTTP.inject!(trace.to_digest, env)
end
```

서버에서:

```ruby
trace_digest = Datadog::Tracing::Propagation::HTTP.extract(request.env)

Datadog::Tracing.trace('web.work', continue_from: trace_digest) do |span|
  # 웹 작업을 하세요.
end
```

### HTTP 요청 대기열

HTTP 요청에서 발생하는 트레이스는 요청이 Ruby 애플리케이션에 도달하기 전에 프런트엔드 웹 서버 또는 로드 밸런서 큐에서 소요된 시간을 포함하도록 구성할 수 있습니다.

이 기능은 기본적으로 비활성화되어 있습니다. 활성화하려면 웹 서버(예: Nginx)에서 `X-Request-Start` 또는 `X-Queue-Start` 헤더를 추가해야 합니다. 다음은 Nginx 구성 예입니다.

```
# /etc/nginx/conf.d/ruby_service.conf
server {
    listen 8080;

    location / {
      proxy_set_header X-Request-Start "t=${msec}";
      proxy_pass http://web:3000;
    }
}
```

그런 다음 요청 대기열 기능을 활성화해야 합니다. `:request_queuing` 구성에는 다음 옵션을 사용할 수 있습니다.

| 옵션             | 설명 |
| ------------------ | ----------- |
| `:include_request` | `http_server.queue` 스팬은 요청 처리가 시작될 때까지의 대기 시간과 *함께* 요청을 처리하는 데 소요된 총 시간을 포함하는 트레이스의 루트 스팬입니다. 구성이 `true`로 설정된 경우의 동작이며, `true`로 설정된 경우의 선택된 구성입니다. |
| `:exclude_request` | `http.proxy.request` 스팬은 트레이스의 루트 스팬이 되며, `http.proxy.queue` 하위 스팬 기간은 요청 처리가 시작될 때까지의 대기 시간만 나타냅니다. *이 기능은 실험 중인 기능입니다!* |

Rack 기반 애플리케이션인 경우 자세한 내용은 [관련 문서](#rack)를 참조하세요.

### Processing Pipeline

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

프로세서는 `trace`를 인수(`Datadog::Span`의 `Array`)로 를 받아들이는 `#call`에 응답하는 모든 개체가 될 수 있습니다.

예를 들어, 다음과 같은 짧은 블록 구문을 사용합니다:

```ruby
Datadog::Tracing.before_flush do |trace|
   # 처리 로직...
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

#### Caveats

1. 제거된 스팬은 모니터 및 대시보드에 영향을 미치는 트레이스 메트릭을 생성하지 않습니다.
2. 스팬을 삭제하면 모든 하위 스팬도 삭제됩니다. 이렇게 하면 트레이스 그래프에서 상위 스팬이 누락된 하위 스팬이 발생하지 않습니다. 
3. [디버그 모드 로그](#enabling-debug-mode)는 Processing Pipeline이 실행되기 *전에* 스팬 상태를 보고합니다. 수정되거나 제거된 스팬은 디버그 모드 로그에 원래 상태를 표시합니다.

### 트레이스 상호 연결

로깅과 같은 대다수 작업의 경우, 보다 원활하게 상호 참조할 수 있도록 트레이스 ID를 다른 이벤트 또는 데이터 스트림과 상호 연결시키는 것이 유용할 수도 있습니다.

#### Rails 애플리케이션 로깅의 경우 

##### 자동

기본 로거(`ActiveSupport::TaggedLogging`), `lograge` 또는 `semantic_logger`를 사용하는 Rails 애플리케이션의 경우 트레이스 상관 관계 주입이 기본적으로 활성화됩니다.

환경 변수 `DD_LOGS_INJECTION=false`를 설정하여 비활성화할 수 있습니다.

#### Ruby 애플리케이션 로깅의 경우

로거에 상호 연결 ID를 추가하려면 `Datadog::Tracing.correlation`으로 상호 연결 ID를 검색하는 로그 포맷터를 추가한 다음 메시지에 이를 추가합니다.

Datadog 로깅과 정확하게 상호 연결하려면, 로그 메시지에 다음이 순차적으로 표시되는지 확인하세요.

 - `dd.env=<ENV>`: `<ENV>`는 `Datadog::Tracing.correlation.env`과 같습니다. 환경이 설정되지 않은 경우 이를 생략합니다.
 - `dd.service=<SERVICE>`: `<SERVICE>` 은 `Datadog::Tracing.correlation.service`과 같습니다. 기본 서비스 이름이 설정되지 않은 경우 생략합니다.
 - `dd.version=<VERSION>`: `<VERSION>`은 `Datadog::Tracing.correlation.version`과 같습니다. 애플리케이션 버전이 설정되지 않은 경우 생략합니다.
 - `dd.trace_id=<TRACE_ID>`: `<TRACE_ID>`는 `Datadog::Tracing.correlation.trace_id`, 또는 로깅 중 트레이스가 활성화되지 않은 경우 `0`와 같습니다.
 - `dd.span_id=<SPAN_ID>`: `<SPAN_ID>`는 `Datadog::Tracing.correlation.span_id`, 또는 로깅 중 트레이스가 활성화되지 않은 경우 `0`와 같습니다.

`Datadog::Tracing.log_correlation`는 `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>`를 반환합니다.

트레이스가 활성화되지 않고 애플리케이션 환경 및 버전이 구성되지 않은 경우 `dd.env= dd.service= dd.version= dd.trace_id=0 dd.span_id=0`를 반환합니다.

다음은 실제 예시입니다.

```ruby
require 'ddtrace'
require 'logger'

ENV['DD_ENV'] = 'production'
ENV['DD_SERVICE'] = 'billing-api'
ENV['DD_VERSION'] = '2.5.17'

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

# 트레이스가 활성화되지 않은 경우
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# 트레이스가 활성화된 경우
Datadog::Tracing.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```

### 전송 계층 구성

기본적으로 `ddtrace`는 나열된 우선순위에서 사용 가능한 첫 번째 설정을 사용하여 Agent에 연결합니다.

1. 명시적으로 제공된 구성 설정(호스트 이름/포트/전송)을 통해
2. `/var/run/datadog/apm.socket`에 있는 UDS(Unix Domain Socket)를 통해
3. TCP를 거쳐 HTTP를 통해 `127.0.0.1:8126`로

그러나 트레이스 데이터를 대체 대상으로 보내거나 대체 프로토콜을 사용하여 트레이서를 구성할 수 있습니다.

#### 기본 Agent 호스트 이름 및 포트 변경

Agent 호스트 및 포트를 변경하려면, `DD_AGENT_HOST`와 `DD_TRACE_AGENT_PORT`를 제공합니다.  

또는 `Datadog.configure` 블록 내에서 다음 설정을 제공합니다.

```ruby
Datadog.configure do |c|
  c.agent.host = '127.0.0.1'
  c.agent.port = 8126
end
```

자세한 내용은 [추가 구성](#additional-configuration)을 참조하세요.

#### Net::HTTP 어댑터 사용

`Net` 어댑터는 TCP를 통해 `Net::HTTP`를 사용하여 트레이스를 제출합니다. 이는 기본 전송 어댑터입니다.

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # 호스트 이름, 포트 및 추가 옵션. :timeout은 초 단위입니다.
    t.adapter :net_http, '127.0.0.1', 8126, timeout: 30
  }
end
```

#### Unix Domain Socket (UDS) 어댑터 사용

`UnixSocket` 어댑터는 Unix 소켓을 통해 `Net::HTTP`를 사용하여 트레이스를 제출합니다.

사용하려면 먼저 Unix 소켓을 수신하도록 트레이스 Agent를 구성한 후 다음을 사용하여 트레이서를 구성하세요.

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # Agent Unix 소켓을 추적하기 위한 로컬 경로 제공
    t.adapter :unix, '/tmp/ddagent/trace.sock'
  }
end
```

#### 전송 테스트 어댑터 사용

`Test` 어댑터는 선택적으로 요청을 버퍼링할 수 있는 무작동 전송입니다. 테스트 스위트 또는 기타 비프로덕션 환경에서 사용됩니다.

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # 전송을 무작동 모드로 설정합니다. 트레이스를 유지하지 않습니다.
    t.adapter :test

    # 또는 트레이스 출력을 검사하기 위한 버퍼를 제공할 수 있습니다.
    # 버퍼는 '<<'에 응답해야 합니다.
    t.adapter :test, []
  }
end
```

#### 커스텀 전송 어댑터 사용

커스텀 어댑터는 다음을 사용하여 구성할 수 있습니다.

```ruby
Datadog.configure do |c|
  c.tracing.transport_options = proc { |t|
    # 어댑터 인스턴스 초기화 및 전달
    custom_adapter = CustomAdapter.new
    t.adapter custom_adapter
  }
end
```

### 시간 제공자 설정

기본적으로 추적은 단조 시계를 사용하여 스팬 기간을 측정하고, 시작 및 종료 시간에 타임스탬프(`->{ Time.now }`)를 사용합니다.

테스트할 때 다른 시간 제공자를 사용하는 것이 도움이 될 수 있습니다.

타임스탬프를 제공하는 함수를 변경하려면 다음을 구성합니다.

```ruby
Datadog.configure do |c|
  # 예를 들어 Timecop의 경우 `->{ Time.now_without_mock_time }`을 사용해 트레이서가 실제 벽 시간을 사용할 수 있습니다.
  c.time_now_provider = -> { Time.now_without_mock_time }
end
```

스팬 기간 계산은 가능한 경우 시스템 단조 시계를 계속 사용하므로 이 설정의 영향을 받지 않습니다.

### 메트릭

트레이서와 해당 통합은 애플리케이션 성능에 대한 유용한 인사이트를 제공하는 추가 메트릭을 생성할 수 있습니다. 이러한 메트릭은 `dogstatsd-ruby`를 사용하여 수집되며 트레이스를 보내는 동일한 Datadog Agent로 보낼 수 있습니다.

메트릭 수집을 위해 다음과 같이 애플리케이션을 구성하세요.

1. [StatsD용 Datadog Agent 구성하기](https://docs.datadoghq.com/developers/dogstatsd/#setup)
2. Gemfile에 `gem 'dogstatsd-ruby', '~> 5.3'` 추가

#### 애플리케이션 런타임의 경우

런타임 메트릭이 구성된 경우 트레이스 라이브러리는 애플리케이션 상태에 대한 메트릭을 자동으로 수집하고 전송합니다.

런타임 메트릭을 구성하려면 다음 구성을 추가하세요.

```ruby
# config/initializers/datadog.rb
require 'datadog/statsd'
require 'ddtrace'

Datadog.configure do |c|
  # 런타임 메트릭 수집을 활성화하려면  `true`로 설정하세요. 기본값: `false`
  # 이를 위해 DD_RUNTIME_METRICS_ENABLED=true를 설정할 수도 있습니다.
  c.runtime_metrics.enabled = true

  # (선택 사항) 런타임 메트릭 전송에 사용되는 Statsd 인스턴스를 구성할 수 있습니다.
  # `dogstatsd-ruby`가 사용 가능한 경우 Statsd는 기본 설정으로 자동 구성됩니다. 
  # Datadog Agent의 호스트와 포트로 구성할 수 있습니다; 기본값: 'localhost:8125'
  c.runtime_metrics.statsd = Datadog::Statsd.new
end
```

`Datadog::Statsd` 구성에 대한 자세한 내용은  [Dogstatsd 문서](https://www.rubydoc.info/github/DataDog/dogstatsd-ruby/master/frames)를 참조하세요.

통계는 VM별로 다르며 다음이 포함됩니다.

| 이름                        | 유형    | 설명                                                   | 사용 가능한 경우       |
| --------------------------  | ------- | ------------------------------------------------------------- | ------------------ |
| `runtime.ruby.class_count`  | `gauge` | 메모리 공간의 클래스 수                            | CRuby              |
| `runtime.ruby.gc.*`         | `gauge` | 가비지 수집 통계: `GC.stat`에서 수집됩니다.      | 모든 런타임       |
| `runtime.ruby.yjit.*`       | `gauge` | `RubyVM::YJIT.runtime_stats`에서 수집된 YJIT 통계  | CRuby (활성화된 경우) |
| `runtime.ruby.thread_count` | `gauge` | 스레드 수                                            | 모든 런타임       |
| `runtime.ruby.global_constant_state`        | `gauge` | 전역 정수 캐시 생성                                                                     | CRuby ≤ 3.1                                                                                     |
| `runtime.ruby.global_method_state`          | `gauge` | [전역 메서드 캐시 생성](https://tenderlovemaking.com/2015/12/23/inline-caching-in-mri.html) | [CRuby 2.x](https://docs.ruby-lang.org/en/3.0.0/NEWS_md.html#label-Implementation+improvements) |
| `runtime.ruby.constant_cache_invalidations` | `gauge` | 정수 캐시 무효화                                                                         | CRuby ≥ 3.2                                                                                     |
| `runtime.ruby.constant_cache_misses`        | `gauge` | 정수 캐시 실패                                                                                | CRuby ≥ 3.2                                                                                     |


또한 모든 메트릭에는 다음 태그가 포함됩니다.

| 이름         | 설명                                             |
| ------------ | ------------------------------------------------------- |
| `language`   | 추적된 프로그래밍 언어 (예: `ruby`)              |
| `service`    | 이 메트릭과 연결된 서비스 목록      |

### OpenTracing

OpenTracing으로 Datadog을 설정하는 방법에 대한 자세한 내용은 [OpenTracing 구성](#configuring-opentracing) 섹션을 참조하세요.

**Datadog 트레이서 설정 구성**

기본 제공 Datadog 트레이서는 다음과 같이 글로벌 트레이서 설정 시 `Datadog::Tracer`과 일치하는 옵션을 전달하여 설정할 수 있습니다.

```ruby
# 여기서 `options`는 Datadog::Tracer에 제공된 옵션의 해시입니다.
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(**options)
```

[추가 구성](#additional-configuration) 섹션에 설명된 `Datadog.configure`를 사용하여 구성할 수도 있습니다.

**통합 활성화 및 구성**

기본적으로 Datadog으로 OpenTracing을 구성해도 Datadog에서 제공하는 추가 계측이 자동으로 활성화되지 않습니다. 애플리케이션에 있는 OpenTracing 계측에서만 스팬 및 트레이스를 받게 됩니다.

그러나 Datadog에서 제공하는 추가 계측은 `Datadog.configure`를 사용하여 OpenTracing과 함께 활성화할 수 있으며 추적을 더욱 강화할 수 있습니다. 이를 활성화하려면 [통합 계측](#integration-instrumentation)을 참조하세요.

**지원되는 직렬화 형식**

| 유형                           | 도움이 필요하신가요? | 추가 정보 |
| ------------------------------ | ---------- | ---------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Yes        |                        |
| `OpenTracing::FORMAT_RACK`     | Yes        | Rack 형식의 해상도 손실로 인해 대문자 또는 `-`가 포함된 이름을 가진 아이템은 돌아올 때 각각 소문자 및 `_`로 변환됨을 유의하세요. 이러한 문자를 피하거나 수신자 측에서 조정하는 것이 좋습니다. |
| `OpenTracing::FORMAT_BINARY`   | 아니요         |                        |

### 프로파일링

`ddtrace`는 프로덕션 환경 내에서 메서드 수준 애플리케이션 리소스 사용량을 측정하는 프로필을 생성할 수 있습니다. 이러한 프로필은 기존 트레이스 계측 외부의 Ruby 코드에 사용된 리소스에 대한 인사이트를 제공합니다.

**설정**

프로파일링을 시작하려면 [Ruby 프로파일러 활성화](https://docs.datadoghq.com/tracing/profiler/enabling/ruby/) 가이드를 따르세요.

#### 트러블슈팅

프로파일링 관련 문제가 발생하는 경우 [프로파일러 문제 해결 가이드](https://docs.datadoghq.com/tracing/profiler/profiler_troubleshooting/?code-lang=ruby)를 확인하세요.

#### Resque 작업 프로파일링

[Resque](https://github.com/resque/resque) 작업을 프로파일링할 때 [Resque](https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks) 문서에 설명된 `RUN_AT_EXIT_HOOKS=1` 옵션을 설정해야 합니다. 

이 플래그가 없으면 Resque가 이 정보를 제출하기 전에 작업자 프로세스를 종료하므로 단기 Resque 작업에 대한 프로필을 사용할 수 없습니다.

## 알려진 이슈 및 권장 구성

### 페이로드가 너무 큼

기본적으로 Datadog은 계측된 애플리케이션 내에서 메모리 오버헤드를 방지하기 위해 트레이스 페이로드의 크기를 제한합니다. 결과적으로 수천 개의 작업이 포함된 트레이스가 Datadog으로 전송되지 않을 수 있습니다.

트레이스가 누락된 경우 [디버그 모드](#debugging-and-diagnostics)를 활성화하여 `"Dropping trace. Payload too large"`를 포함한 메시지가 기록되는지 확인하세요.

디버그 모드는 장황하므로 **Datadog에서는 이 기능을 활성화한 상태로 두거나 프로덕션 환경에서 활성화하는 것을 권장하지 않습니다.** 확인 후 필요하지 않으면 비활성화하세요. [Datadog Agent 로그](https://docs.datadoghq.com/agent/guide/agent-log-files/)에서 유사한 메시지를 검사할 수 있습니다.

큰 페이로드로 인해 트레이스가 삭제된 것을 확인한 경우 [partial_flush](#additional-configuration) 설정을 활성화하여 큰 트레이스를 더 작은 덩어리로 분할합니다.

### 스택 수준이 너무 깊음

Datadog 추적은 다른 공통 라이브러리(예: Rails, Rack 등)에 계측을 추가하여 트레이스 데이터를 수집합니다. 일부 라이브러리는 이 계측을 추가하는 API를 제공하지만 일부는 그렇지 않습니다. 계측 API가 없는 라이브러리에 계측을 추가하기 위해 Datadog은 "monkey-patching" 이라는 기술을 사용하여 해당 라이브러리의 코드를 수정합니다.

Ruby 버전 1.9.3 및 이전 버전에서는 "monkey-patching"에 종종 [`alias_method`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-alias_method) 사용이 포함되었습니다. 기존 Ruby 메서드를 파괴하여 대체하는 *메서드 재작성*으로도 알려져 있습니다. 그러나 이 방법은 두 라이브러리가 동일한 메서드를 "다시 작성"하려고 시도하는 경우 종종 충돌 및 오류를 발생시킵니다. (예: 동일한 방법을 계측하려는 두 개의 서로 다른 APM 패키지.)

Ruby 2.0에서는 [`Module#prepend`](https://ruby-doc.org/core-3.0.0/Module.html#method-i-prepend) 기능이 도입되었습니다. 이 기능은 파괴적인 메서드 재작성을 방지하고 동일한 메서드에 여러 개의 "monkey patches"를 허용합니다. 결과적으로 이는 "monkey patches" 코드에 대한 가장 안전하고 선호되는 수단이 되었습니다.

Datadog 계측은 비파괴적으로 계측을 추가하는 `Module#prepend` 기능을 거의 독점적으로 사용합니다. 그러나 일부 다른 라이브러리(일반적으로 Ruby 2.0 이전 버전을 지원하는 라이브러리)는 여전히 Datadog 계측과 충돌을 일으키는 `alias_method`를 사용하여 `SystemStackError` 또는 `stack level too deep` 오류가 발생합니다. 

해당 라이브러리 내에 `alias_method` 구현이 존재하기 때문에 일반적으로 Datadog은 이를 수정할 수 없습니다. 그러나 일부 라이브러리에서 사용할 수 있는 방법이 있습니다.

* `rack-mini-profiler`: [Net::HTTP 스택 수준이 너무 깊은 오류](https://github.com/MiniProfiler/rack-mini-profiler#nethttp-stack-level-too-deep-errors).

알려진 해결 방법이 없는 라이브러리의 경우 테스트를 위해 라이브러리를 다른 환경으로 분리하거나 `alias` 또는 `Module#alias_method`를 사용하여 라이브러리를 제거하는 것이 좋습니다.

추가 질문이 있거나 문제를 보고하려면 [Datadog 지원팀에 문의](https://docs.datadoghq.com/help)하세요.

### Resque 작업자가 종료 시 중단됨

Resque는 기본적으로 작업별로 프로세스를 포크하므로 ddtrace로 계측된 경우 드물게 resque 처리가 종료 시에 중단될 수 있습니다.

이를 해결하려면 `FORK_PER_JOB` 환경 변수를 `false`로 설정하여 이 동작을 비활성화하는 것이 좋습니다.

이 이슈에 대한 자세한 내용은 [여기](https://github.com/DataDog/dd-trace-rb/issues/3015)를 참조하세요.

<!---->

[header tags]: https://docs.datadoghq.com/tracing/configure_data_security/#collect-headers
[1]: https://docs.datadoghq.com/ko/tracing/trace_collection/compatibility/ruby/
[2]: https://docs.datadoghq.com/ko/tracing/trace_collection/compatibility/ruby#integrations
[3]: https://docs.datadoghq.com/ko/tracing/trace_collection/compatibility/ruby#ci-visibility-integrations
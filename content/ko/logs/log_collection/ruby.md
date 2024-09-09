---
aliases:
- /ko/logs/languages/ruby
further_reading:
- link: https://github.com/roidrage/lograge
  tag: 깃허브(Githun)
  text: Lograge 설명서
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: 로그 수집 트러블슈팅 가이드
- link: https://www.datadoghq.com/blog/managing-rails-application-logs/
  tag: 블로그
  text: Rails 애플리케이션 로그를 수집, 커스터마이즈 및 관리하는 방법
- link: https://www.datadoghq.com/blog/log-file-control-with-logrotate/
  tag: 블로그
  text: logrotate를 사용해 로그 파일을 관리하는 방법
- link: /glossary/#tail
  tag: 설정
  text: '"tail"에 대한 용어 항목'
title: Rails 로그 수집에서의 루비(Ruby)
---

## 개요

Datadog에 로그를 전송하려면  [`Lograge`][1]를 사용해 파일에 기록하고 Datadog 에이전트를 통해 이 파일을 [테일링][11]합니다. 루비(Ruby)를 사용한 로깅 설정 시 [예약된 속성][2]을 고려하세요.

Lograge를 사용하면 이 예시와 같은 표준 텍스트 기반 로그 형식을 변환할 수 있습니다.

```text
Started GET "/" for 127.0.0.1 at 2012-03-10 14:28:14 +0100
Processing by HomeController#index as HTML
  Rendered text template within layouts/application (0.0ms)
  Rendered layouts/_assets.html.erb (2.0ms)
  Rendered layouts/_top.html.erb (2.6ms)
  Rendered layouts/_about.html.erb (0.3ms)
  Rendered layouts/_google_analytics.html.erb (0.4ms)
Completed 200 OK in 79ms (Views: 78.8ms | ActiveRecord: 0.0ms)
```

다음 JSON 형식 로그는 보다 체계적인 구조를 제공합니다. 

```json
{
  "timestamp": "2016-01-12T19:15:19.118829+01:00",
  "level": "INFO",
  "logger": "Rails",
  "method": "GET",
  "path": "/jobs/833552.json",
  "format": "json",
  "controller": "jobs",
  "action": "show",
  "status": 200,
  "duration": 58.33,
  "view": 40.43,
  "db": 15.26
}
```

## 로거 설치 및 설정

{{< tabs >}}
{{% tab "Lograge" %}}

1. `lograge` 젬을 프로젝트에 추가합니다.
    ```ruby
    gem 'lograge'
    ```
2. 걸정 파일에서 다음을 구성해 Lograge를 설정합니다.
    ```ruby
    # Lograge config
    config.lograge.enabled = true

    # This specifies to log in JSON format
    config.lograge.formatter = Lograge::Formatters::Json.new

    ## Disables log coloration
    config.colorize_logging = false

    # Log to a dedicated file
    config.lograge.logger = ActiveSupport::Logger.new(Rails.root.join('log', "#{Rails.env}.log"))

    # This is useful if you want to log query parameters
    config.lograge.custom_options = lambda do |event|
        { :ddsource => 'ruby',
          :params => event.payload[:params].reject { |k| %w(controller action).include? k }
        }
    end
    ```
   **참고**: 또한 Lograge는 로그에 컨텍스트 정보를 추가할 수 있습니다. 자세한 정보는 [Lograge 설명서][1]를 참조하세요.

이 설정에 대한 더 자세한 정보는 [Rails 애플리케이션 로그 수집, 커스터마이즈 및 관리 방법][2]을 참조하세요.

### RocketPants

`config/initializers/lograge_rocketpants.rb` 파일(프로젝트에 따라 위치는 달라질 수 있음)에서 `rocket_pants` 컨트롤러에 대해 Lograge를 설정하는 방법:

```ruby
# Come from here:
#   https://github.com/Sutto/rocket_pants/issues/111
app = Rails.application
if app.config.lograge.enabled
  ActiveSupport::LogSubscriber.log_subscribers.each do |subscriber|
    case subscriber
      when ActionController::LogSubscriber
        Lograge.unsubscribe(:rocket_pants, subscriber)
    end
  end
  Lograge::RequestLogSubscriber.attach_to :rocket_pants
end
```

[1]: https://github.com/roidrage/lograge#installation
[2]: https://www.datadoghq.com/blog/managing-rails-application-logs
{{% /tab %}}
{{% tab "Grape" %}}

1. `grape_logging` 젬을 프로젝트에 추가합니다.

    ```ruby
    gem 'grape_logging'
    ```
2. Grape에 추가 설정을 더합니다.

    ```ruby
    use GrapeLogging::Middleware::RequestLogger,
          instrumentation_key: 'grape',
          include: [ GrapeLogging::Loggers::Response.new,
                    GrapeLogging::Loggers::FilterParameters.new ]
    ```
3. `config/initializers/instrumentation.rb` 파일을 생성하고 다음 설정을 추가합니다.

    ```ruby
    # Subscribe to grape request and log with a logger dedicated to Grape
    grape_logger = Logging.logger['Grape']
    ActiveSupport::Notifications.subscribe('grape') do |name, starts, ends, notification_id, payload|
        grape_logger.info payload
    end
    ```

{{% /tab %}}
{{< /tabs >}}
## Datadog 에이전트 설정

[로그 수집이 활성화되면][3] 다음을 수행해 [커스텀 로그 수집][4]을 설정해 로그 파일을 테일링하고 Datadog에 전송합니다.

1.  [에이전트 설정 디렉터리][5]의 `conf.d/`에서 `ruby.d/` 폴더를 생성합니다. 
2. 다음 내용을 포함해 `ruby.d/`에서 `conf.yaml` 파일을 생성합니다.
    ```yaml
      logs:
        - type: file
          path: "<RUBY_LOG_FILE_PATH>.log"
          service: <SERVICE_NAME>
          source: ruby
          sourcecategory: sourcecode
          ## Uncomment the following processing rule for multiline logs if they
          ## start by the date with the format yyyy-mm-dd
          #log_processing_rules:
          #  - type: multi_line
          #    name: new_log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
4. [에이전트를 재시작합니다][6].
5. [에이전트 상태 하위 명령][8]을 실행하고 `Checks` 섹션 아래에서 `ruby`를 찾아 로그가 성공적으로 Datadog에 전송되었는지 확인합니다.

로그가 JSON 형식에 있는 경우 Datadog는 자동으로 [로그 메시지를 파싱][9]하여 로그 속성을 추출하세요. [로그 탐색기][10]를 사용하여 로그를 확인하고 트러블슈팅합니다.

## 로그 및 트레이스 연결

애플리케이션 성능 모니터링(APM)이 이 애플리케이션에서 활성화된 경우, [APM 루비 로깅 지침][7]을 따라 애플리케이션 로그 및 트레이스 간 연결을 향상하여 자동으로 로그에 트레이스와 스팬 ID를 추가할 수 있습니다. 

## 모범 사례

가능한 경우 로그에 추가 컨텍스트(사용자, 세션, 작업 및 메트릭)를 더합니다.

단순한 문자열 메시지를 로깅하는 대신, 다음 예시에 표시된 대로 로그 해시를 사용할 수 있습니다.

```ruby
my_hash = {'user' => '1234', 'button_name'=>'save','message' => 'User 1234 clicked on button saved'};
logger.info(my_hash);
```

해시는 JSON으로 변환되어 `user` 및 `button_name`에 대해 분석을 수행할 수 있습니다.

```json
{
  "timestamp": "2016-01-12T19:15:18.683575+01:00",
  "level": "INFO",
  "logger": "WelcomeController",
  "message": {
    "user": "1234",
    "button_name": "save",
    "message": "User 1234 clicked on button saved"
  }
}
```
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/roidrage/lograge
[2]: /ko/logs/log_configuration/attributes_naming_convention/#reserved-attributes
[3]: /ko/agent/logs/?tab=tailfiles#activate-log-collection
[4]: /ko/agent/logs/?tab=tailfiles#custom-log-collection
[5]: /ko/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /ko/agent/configuration/agent-commands/#restart-the-agent
[7]: /ko/tracing/other_telemetry/connect_logs_and_traces/ruby/
[8]: /ko/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[9]: /ko/logs/log_configuration/parsing
[10]: /ko/logs/explorer/
[11]: /ko/glossary/#tail
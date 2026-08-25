---
aliases:
- /ko/error_tracking/logs
description: 로그에서 백엔드 오류를 추적하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: 블로그
  text: Datadog 오류 추적을 통해 애플리케이션 문제 파악
- link: /logs/error_tracking/explorer/
  tag: 문서
  text: 오류 추적 탐색기에 대해 알아보기
is_beta: true
title: 백엔드 오류 로그 추적
---

## 개요

아직 Datadog로 로그를 수집하고 있지 않다면 [로그 설명서][10]를 참조하여 로그를 설정하세요. `source` 태그(언어 지정)가 올바르게 구성되었는지 확인하세요. Datadog에서는 Agent 기반 로그 수집을 설정할 것을 권장합니다.

## 설정

**Python**, **Java**, **Ruby**와 같은 언어의 경우 로그의 `source` 태그가 올바르게 구성되어 있으면 추가 구성이 필요하지 않습니다. 모든 필수 속성은 자동으로 태그가 지정되어 Datadog로 전송됩니다.

**C#**, **.NET**, **Go**, **Node.js**와 같은 백엔드 언어의 경우 각 섹션의 코드 예제에서 오류 로그를 올바르게 구성하고 로그의 `error.stack`에 필요한 스택 트레이스를 첨부하는 방법을 보여줍니다.

이미 Datadog로 스택 추적을 보내고 있는데 `error.stack`에 없는 경우, [일반 로그 리매퍼][8]를 설정하여 스택 트레이스를 Datadog의 올바른 속성으로 리매핑할 수 있습니다.

이슈에서 인라인 코드 조각을 구성하려면 [소스 코드 통합][9]을 설정하세요. Error Tracking에 코드 조각을 추가하는 데는 APM이 필요하지 않으며, 보강 태그와 연결된 리포지토리는 둘 다 동일합니다.

#### Error Tracking 속성 

Error Tracking을 활성화하려면 로그에 다음 속성이 포함되어야 합니다.

- `error.kind` 또는 `error.stack` 필드입니다. **참고**: `error.stack`을 사용하는 경우 유효한 스택 트레이스여야 합니다.
- `Service` 속성
- 상태 수준은 `ERROR`, `CRITICAL`, `ALERT`, 또는 `EMERGENCY` 입니다.

아래 안내된 나머지 속성은 선택 사항이나 오류 그룹화를 개선하는 데 도움이 됩니다.

특정 속성은 Datadog 내에 전용 UI 표시가 있습니다. Error Tracking에서 이러한 기능을 사용하려면 다음 속성 이름을 사용합니다.

| 속성            | 설명                                                             |
|----------------------|-------------------------------------------------------------------------|
| `error.stack`        | 실제 스택 추적                                                      |
| `error.message`      | 스택 추적에 포함된 오류 메시지                              |
| `error.kind`         | 오류의 유형 또는 "종류"(예: "Exception" 또는 "OSError") |

**참고**: 기본적으로 통합 파이프라인은 기본 로깅 라이브러리 파라미터를 해당 특정 속성으로 리매핑하고 스택 추적 또는 트레이스백을 파싱하여 자동으로 `error.message`와 `error.kind`를 추출하려고 시도합니다.

자세한 내용은 전체 [소스 코드 속성 문서][11]를 참조하세요.

### C# 및 .NET

{{< tabs >}}
{{% tab "Serilog" %}}

C#용 로그 수집을 설정하지 않은 경우 [C# 로그 수집 설명서][1]를 참조하세요.

탐지된 예외를 직접 로깅하려면 옵션으로 다음을 사용할 수도 있습니다.

```csharp
var log = new LoggerConfiguration()
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")
    .Enrich.WithExceptionDetails()
    .CreateLogger();
try {
  // ...
} catch (Exception ex) {
  // 로그 호출 첫 인수로 예외 전달
  log.Error(ex, "an exception occurred");
}
```

[1]: /ko/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{% tab "NLog" %}}

C#용 로그 수집을 설정하지 않은 경우 [C# 로그 수집 설명서][1]를 참조하세요.

탐지된 예외를 직접 로깅하려면 옵션으로 다음을 사용할 수도 있습니다.

```csharp
private static Logger log = LogManager.GetCurrentClassLogger();

static void Main(string[] args)
{
  try {
    // ...
  } catch (Exception ex) {
    // 로그 호출의 두 번째 인수로 예외 전달
    log.ErrorException("an exception occurred", ex);
  }
}
```

[1]: /ko/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{% tab "Log4Net" %}}

C#용 로그 수집을 설정하지 않은 경우 [C# 로그 수집 설명서][1]를 참조하세요.

탐지된 예외를 직접 로깅하려면 옵션으로 다음을 사용할 수도 있습니다.

```csharp
class Program
{
  private static ILog logger = LogManager.GetLogger(typeof(Program));

  static void Main(string[] args)
  {
    try {
      // ...
    } catch (Exception ex) {
      // 로그 호출의 두 번째 인수로 예외 전달
      log.Error("an exception occurred", ex);
    }
  }
}
```

[1]: /ko/logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{< /tabs >}}

### Go

#### Logrus

Go에 로그 수집을 설정하지 않은 경우 [Go 로그 수집 설명서][3]를 참조하세요.

탐지된 예외를 직접 로깅하려면 옵션으로 다음을 사용할 수도 있습니다.

```go
// for https://github.com/pkg/errors
type stackTracer interface {
    StackTrace() errors.StackTrace
}

type errorField struct {
  Kind    string `json:"kind"`
  Stack   string `json:"stack"`
  Message string `json:"message"`
}

func ErrorField(err error) errorField {
    var stack string
    if serr, ok := err.(stackTracer); ok {
        st := serr.StackTrace()
        stack = fmt.Sprintf("%+v", st)
        if len(stack) > 0 && stack[0] == '\n' {
            stack = stack[1:]
        }
    }
    return errorField{
        Kind: reflect.TypeOf(err).String(),
        Stack: stack,
        Message: err.Error(),
    }
}


log.WithFields(log.Fields{
    "error": ErrorField(err)
}).Error("an exception occurred")
```

### Java(파싱됨)

Java용 로그 수집을 설정하지 않은 경우 [Java 로그 수집 설명서][4]를 참조하세요. 로그에 `source:java` 태그가 있는지 확인하세요.

{{< tabs >}}
{{% tab "Log4j" %}}

탐지된 예외를 직접 로깅하려면 옵션으로 다음을 사용할 수도 있습니다.

```java
Logger logger = LogManager.getLogger("HelloWorld");
try {
  // ...
} catch (Exception e) {
  // 로그 호출의 마지막 인수로 예외 전달
  logger.error("an exception occurred", e)
}
```

{{% /tab %}}
{{% tab "SLF4J" %}}

탐지된 예외를 직접 로깅하려면 옵션으로 다음을 사용할 수도 있습니다.

```java
Logger logger = LoggerFactory.getLogger(NameOfTheClass.class);
try {
  // ...
} catch (Exception e) {
  // 로그 호출의 마지막 인수로 예외 전달
  logger.error("an exception occurred", e)
}
```

{{% /tab %}}
{{< /tabs >}}

### Node.js

#### Winston(JSON)

Node.js에 관해 로그 수집을 설정하지 않은 경우 [Node.js 로그 수집 설명서][5]를 참조하세요.

탐지된 예외를 직접 로깅하려면 옵션으로 다음을 사용할 수도 있습니다.

```json
try {
  // ...
} catch (e) {
  logger.error("an exception occurred", {
    error: {
      message: e.message,
      stack: e.stack
    }
  });
}
```

### PHP

#### Monolog(JSON)

PHP용 로그 수집을 설정하지 않은 경우 [PHP 로그 수집 설명서][12]를 참조하세요.

탐지된 예외를 직접 로깅하려면 옵션으로 다음을 사용할 수도 있습니다.

```php
try {
    // ...
} catch (\Exception $e) {
    $logger->error('An error occurred', [
        'error.message' => $e->getMessage(),
        'error.kind' => get_class($e),
        'error.stack' => $e->getTraceAsString(),
    ]);
}
```

### Python

#### 로깅

Python용 로그 수집을 설정하지 않은 경우 [Python 로그 수집 설명서][6]를 참조하세요. 로그에 `source:python` 태그가 있는지 확인하세요.

탐지된 예외를 직접 로깅하려면 옵션으로 다음을 사용할 수도 있습니다.

```python
try:
  // ...
except:
  logging.exception('an exception occurred')
```

### Ruby on Rails

#### 사용자 지정 로거 포맷터

Ruby on Rails에 대해 로그 수집을 설정하지 않은 경우 [Ruby on Rails 로그 수집 설명서][7]를 참조하세요.

수동으로 오류를 기록하려면 JSON을 사용하여 포맷터를 만들고 예외 값을 올바른 필드에 매핑하세요,

```ruby
require 'json'
require 'logger'

class JsonWithErrorFieldFormatter < ::Logger::Formatter
    def call(severity, datetime, progname, message)
        log = {
            timestamp: "#{datetime.to_s}",
            level: severity,
        }

        if message.is_a?(Hash)
            log = log.merge(message)
        elsif message.is_a?(Exception)
            log['message'] = message.inspect
            log['error'] = {
                kind: message.class,
                message: message.message,
                stack: message.backtrace.join("\n"),
            }
        else
            log['message'] = message.is_a?(String) ? message : message.inspect
        end

        JSON.dump(log) + "\n"
    end
end
```

그리고 로거에서 사용하세요.
```ruby
logger = Logger.new(STDOUT)
logger.formatter = JsonWithErrorFieldFormatter.new
```

**Lograge**를 사용하는 경우 형식이 지정된 오류 로그를 전송하도록 설정할 수도 있습니다.
``` ruby
Rails.application.configure do
    jsonLogger = Logger.new(STDOUT) # 에이전트 구성에 따라 STDOUT 또는 파일
    jsonLogger.formatter = JsonWithErrorFieldFormatter.new

    # Rails 기본 TaggedLogging 로거를 json 포맷터를 사용하여 새 로거로 교체합니다.
    # TaggedLogging은 더 복잡한 json 형식 메시지와 호환되지 않습니다.
    config.logger = jsonLogger

    # Lograge 구성
    config.lograge.enabled = true
    config.lograge.formatter = Lograge::Formatters::Raw.new

    # 로그 색상을 비활성화합니다.
    config.colorize_logging = false

    # 올바른 필드에 대한 예외 로깅을 구성합니다.
    config.lograge.custom_options = 람다 do |event|
        if event.payload[:exception_object]
            return {
                level: 'ERROR',
                message: event.payload[:exception_object].inspect,
                error: {
                    kind: event.payload[:exception_object].class,
                    message: event.payload[:exception_object].message,
                    stack: event.payload[:exception_object].backtrace.join("\n")
                }
            }
        end
    end
end
```
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking
[2]: https://app.datadoghq.com/logs/onboarding/client
[3]: /ko/logs/log_collection/go/
[4]: /ko/logs/log_collection/java/?tab=log4j
[5]: /ko/logs/log_collection/nodejs/?tab=winston30
[6]: /ko/logs/log_collection/python/?tab=jsonlogformatter
[7]: /ko/logs/log_collection/ruby/
[8]: /ko/logs/log_configuration/processors/?tab=ui#remapper
[9]: https://app.datadoghq.com/source-code/setup/apm
[10]: /ko/logs/log_collection/
[11]: /ko/logs/log_configuration/attributes_naming_convention/#source-code
[12]: /ko/logs/log_collection/php/
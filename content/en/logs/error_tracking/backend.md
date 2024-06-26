---
title: Track Backend Errors
kind: documentation
description: Learn how to track backend errors from your logs.
is_beta: true
further_reading:
  - link: 'https://www.datadoghq.com/blog/error-tracking/'
    tag: 'Blog'
    text: 'Make sense of application issues with Datadog Error Tracking'
  - link: '/logs/error_tracking/explorer/'
    tag: 'Documentation'
    text: 'Learn about the Error Tracking Explorer'
---

## Overview

If you aren't already collecting logs with Datadog, see the [Logs documentation][10] to set up logs. Ensure that the `source` tag (specifying language) is properly configured. Datadog recommends setting up Agent-based log collection.

## Setup

For languages such as **Python**, **Java**, and **Ruby**, no additional configuration is needed if the `source` tag in your logs is configured correctly. All required attributes are automatically tagged and sent to Datadog.

For backend languages such as **C#**, **.NET**, **Go**, and **Node.js**, the code examples in each section demonstrate how to properly configure an error log and attach the required stack trace in the log's `error.stack`.

If you are already sending stack traces to Datadog but they are not in `error.stack`, you can set up a [generic log remapper][8] to remap the stack trace to the correct attribute in Datadog.

To configure inline code snippets in issues, set up the [source code integration][9]. Adding code snippets in Error Tracking for Logs does not require APM; the enrichment tags and linked repository is the same for both.

#### Attributes for Error Tracking

To enable Error Tracking, logs must include both of the following:

- either an `error.type` or `error.stack` field
- a status level of `ERROR`, `CRITICAL`, `ALERT`, or `EMERGENCY`

The remaining attributes listed below are optional, but their presence improves error grouping.

Specific attributes have a dedicated UI display within Datadog. To enable these functionalities for Error Tracking, use the following attribute names:

| Attribute            | Description                                                             |
|----------------------|-------------------------------------------------------------------------|
| `error.stack`        | Actual stack trace                                                      |
| `error.message`      | Error message contained in the stack trace                              |
| `error.kind`         | The type or "kind" of an error (for example, "Exception", or "OSError") |

**Note**: By default, integration Pipelines attempt to remap default logging library parameters to those specific attributes and parse stack traces or traceback to automatically extract the `error.message` and `error.kind`.

For more information, see the complete [source code attributes documentation][11].

### C# and .NET

{{< tabs >}}
{{% tab "Serilog" %}}

If you have not set up log collection for C#, see the [C# Log Collection documentation][1].

To log a caught exception yourself, you may optionally use:

```csharp
var log = new LoggerConfiguration()
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")
    .Enrich.WithExceptionDetails()
    .CreateLogger();
try {
  // …
} catch (Exception ex) {
  // pass exception as first argument of log call
  log.Error(ex, "an exception occurred");
}
```

[1]: /logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{% tab "NLog" %}}

If you have not set up log collection for C#, see the [C# Log Collection documentation][1].

To log a caught exception yourself, you may optionally use:

```csharp
private static Logger log = LogManager.GetCurrentClassLogger();

static void Main(string[] args)
{
  try {
    // …
  } catch (Exception ex) {
    // pass exception as second argument of log call
    log.ErrorException("an exception occurred", ex);
  }
}
```

[1]: /logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{% tab "Log4Net" %}}

If you have not set up log collection for C#, see the [C# Log Collection documentation][1].

To log a caught exception yourself, you may optionally use:

```csharp
class Program
{
  private static ILog logger = LogManager.GetLogger(typeof(Program));

  static void Main(string[] args)
  {
    try {
      // …
    } catch (Exception ex) {
      // pass exception as second argument of log call
      log.Error("an exception occurred", ex);
    }
  }
}
```

[1]: /logs/log_collection/csharp/?tab=serilog

{{% /tab %}}
{{< /tabs >}}

### Go

#### Logrus

If you have not set up log collection for Go, see the [Go Log Collection documentation][3].

To log a caught exception yourself, you may optionally use:

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

### Java (parsed)

If you have not set up log collection for Java, see the [Java Log Collection documentation][4]. Ensure your logs are tagged with `source:java`.

{{< tabs >}}
{{% tab "Log4j" %}}

To log a caught exception yourself, you may optionally use:

```java
Logger logger = LogManager.getLogger("HelloWorld");
try {
  // …
} catch (Exception e) {
  // pass exception as last argument of log call
  logger.error("an exception occurred", e)
}
```

{{% /tab %}}
{{% tab "SLF4J" %}}

To log a caught exception yourself, you may optionally use:

```java
Logger logger = LoggerFactory.getLogger(NameOfTheClass.class);
try {
  // …
} catch (Exception e) {
  // pass exception as last argument of log call
  logger.error("an exception occurred", e)
}
```

{{% /tab %}}
{{< /tabs >}}

### Node.js

#### Winston (JSON)

If you have not set up log collection for Node.js, see the [Node.js Log Collection documentation][5].

To log a caught exception yourself, you may optionally use:

```json
try {
  // …
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

#### Monolog (JSON)

If you have not set up log collection for PHP, see the [PHP Log Collection documentation][12].

To log a caught exception yourself, you may optionally use:

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

#### Logging

If you have not setup log collection for Python, see the [Python Log Collection documentation][6]. Ensure your logs are tagged with `source:python`.

To log a caught exception yourself, you may optionally use:

```python
try:
  // …
except:
  logging.exception('an exception occurred')
```

### Ruby on Rails

#### Custom logger formatter

If you have not set up log collection for Ruby on Rails, see the [Ruby on Rails Log Collection documentation][7].

To manually log an error, create a formatter using JSON and map the exception values to the correct fields:

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

And use it in your logger:
```ruby
logger = Logger.new(STDOUT)
logger.formatter = JsonWithErrorFieldFormatter.new
```

If you use **Lograge**, you can also set it up to send formatted error logs:
``` ruby
Rails.application.configure do
    jsonLogger = Logger.new(STDOUT) # STDOUT or file depending on your agent configuration
    jsonLogger.formatter = JsonWithErrorFieldFormatter.new

    # Replacing Rails default TaggedLogging logger with a new one with the json formatter.
    # TaggedLogging is incompatible with more complex json format messages
    config.logger = jsonLogger

    # Lograge config
    config.lograge.enabled = true
    config.lograge.formatter = Lograge::Formatters::Raw.new

    # Disables log coloration
    config.colorize_logging = false

    # Configure logging of exceptions to the correct fields
    config.lograge.custom_options = lambda do |event|
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
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/error-tracking
[2]: https://app.datadoghq.com/logs/onboarding/client
[3]: /logs/log_collection/go/
[4]: /logs/log_collection/java/?tab=log4j
[5]: /logs/log_collection/nodejs/?tab=winston30
[6]: /logs/log_collection/python/?tab=jsonlogformatter
[7]: /logs/log_collection/ruby/
[8]: /logs/log_configuration/processors/?tab=ui#remapper
[9]: https://app.datadoghq.com/source-code/setup/apm
[10]: /logs/log_collection/
[11]: /logs/log_configuration/attributes_naming_convention/#source-code
[12]: /logs/log_collection/php/

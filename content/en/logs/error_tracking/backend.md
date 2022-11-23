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

If you aren’t already collecting Logs with Datadog, follow the Logs Setup Documentation to set up Logs. Ensure that the source tag (specifying language) is correctly configured. Agent-based log collection is recommended.

For **Python**, **Java**, and **Ruby**, no additional configuration is needed if the `source` tag in your logs is configured correctly. All required attributes will be automatically tagged and sent to Datadog. 

For other languages, The backend language examples below show how to properly configure a error log and attach the required stack trace in the log's `error.stack`.

If you are already sending stack traces to Datadog but they are not in `error.stack`, you can set up a [generic log remapper][8] to remap the stack trace to the correct attribute in Datadog.

To configure inline code snippets in issues, use the [in-app enablement here][9]. You may notice that the setup is built around APM; snippets in Error Tracking for Logs do not require APM. The enrichment tags and repository linkage is the same.

## Setup

### C# and .NET

{{< tabs >}}
{{% tab "Serilog" %}}

If you have not setup log collection for C#, see the [C# Log Collection documentation][1].

### Log an error

To log an error yourself, along with information about the stack trace, use the following:

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

If you have not setup log collection for C#, see the [C# Log Collection documentation][1].

### Log an error

To log an error yourself, along with information about the stack trace, use the following:

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

If you have not setup log collection for C#, see the [C# Log Collection documentation][1].

### Log an error

To log an error yourself, along with information about the stack trace, use the following:

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

If you have not setup log collection for Go, see the [Go Log Collection documentation][3].

#### Log an error

To log an error yourself, along with information about the stack trace, use the following:

```go
// for https://github.com/pkg/errors
type stackTracer interface {
	StackTrace() errors.StackTrace
}

type errorField struct {
  kind    string `json:"kind"`
  stack   string `json:"stack"`
  message string `json:"message"`
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
    return ErrorField{
        kind: reflect.TypeOf(err).String(),
        stack: stack,
        message: err.Error(),
    }
}


log.WithFields(log.Fields{
    "error": ErrorField(err)
}).Error("an exception occurred")
```

### Java (parsed)

If you have not setup log collection for Java, see the [Java Log Collection documentation][4]. Ensure your logs are tagged with `source:java`.

{{< tabs >}}
{{% tab "Log4j" %}}

### Log an error

To log an error yourself, along with information about the stack trace, use the following:

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

### Log an error

To log an error yourself, along with information about the stack trace, use the following:

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

### NodeJS

#### Winston (JSON)

If you have not setup log collection for NodeJS, see the [NodeJS Log Collection documentation][5].

#### Log an error

To log an error yourself, along with information about the stack trace, use the following:

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

### Python

#### Logging

If you have not setup log collection for Python, see the [Python Log Collection documentation][6]. Ensure your logs are tagged with `source:python`.

#### Log an error

```python
try:
  // …
except:
  logging.exception('an exception occurred')
```

### Ruby on Rails

#### Lograge (JSON)

If you have not setup log collection for Ruby on Rails, see the [Ruby on Rails Log Collection documentation][7]. 

#### Log an error

```ruby
# Lograge config
config.lograge.enabled = true

# This specifies to log in JSON format
config.lograge.formatter = Lograge::Formatters::Json.new

# Disables log coloration
config.colorize_logging = false

# Log to a dedicated file
config.lograge.logger = ActiveSupport::Logger.new(Rails.root.join('log', "#{Rails.env}.log"))

# Configure logging of exceptions to the correct fields
config.lograge.custom_options = lambda do |event|
    {
      error: {
        type: event.payload[:exception][0],
        message: event.payload[:exception][1],
        stack: event.payload[:exception_object].backtrace
      }
    }
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
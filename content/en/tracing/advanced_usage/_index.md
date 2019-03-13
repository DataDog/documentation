---
title: Advanced Languages instrumentation
kind: documentation
---

## Custom Tagging

Custom tagging allows adding tags in the form of key-value pairs to specific spans. These tags are used to correlate traces with other Datadog products to provide more details about specific spans.

[Read more about tagging][1]

{{< tabs >}}
{{% tab "Java" %}}
Tags are key-value pairs attached to spans. All tags share a single namespace.

The Datadog UI uses specific tags to set UI properties, such as an application's service name. A full list of these tags can be found in the [Datadog][1] and [OpenTracing][2] APIs.

**Custom Tags**:

Custom tags are set using the OpenTracing API.

Custom tags may be set for auto-instrumentation by grabbing the active span out of the global tracer.

```java
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet
class ServletImpl extends AbstractHttpServlet {
  @Override
  void doGet(HttpServletRequest req, HttpServletResponse resp) {
    final Tracer tracer = GlobalTracer.get();
    if (tracer != null && tracer.activeSpan() != null) {
      tracer.activeSpan().setTag("customer.id", 12345);
      tracer.activeSpan().setTag("http.url", "/login");
    }
    // servlet impl
  }
}
```


[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/DDTags.java
[2]: https://github.com/opentracing/opentracing-java/blob/master/opentracing-api/src/main/java/io/opentracing/tag/Tags.java
{{% /tab %}}
{{% tab "Python" %}}

**Adding tags to a span**

Add tags directly to a span by calling `set_tag`. For example, with the following route handler:

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
def handle_customer(customer_id):
  with tracer.trace('web.request') as span:
    span.set_tag('customer.id', customer_id)
```

**Adding tags to a current active span**

The current span can be retrieved from the context in order to set tags. This way, if a span was started by the instrumentation, you can retrieve the span and add custom tags. Note that if a span does not exist, `None` is returned:

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
@tracer.wrap()
def handle_customer(customer_id):
  # get the active span in the context, put there by tracer.wrap()
  current_span = tracer.current_span()
  if current_span:
    current_span.set_tag('customer.id', customer_id)
```

**Adding tags globally to all spans**

Add tags to all spans by configuring the tracer with the `tracer.set_tags` method:

```python
from ddtrace import tracer

tracer.set_tags({ 'env': 'prod' })
```

{{% /tab %}}
{{% tab "Ruby" %}}

**Adding tags to a span**

Add tags directly to `Datadog::Span` objects by calling `#set_tag`:

```ruby
# An example of a Sinatra endpoint,
# with Datadog tracing around the request.
get '/posts' do
  Datadog.tracer.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
  end
end
```

**Adding tags to a current active span**

Access the current active span from any method within your code. Note, however, that if the method is called and there is no span currently active, `active_span` is nil.

```ruby
# e.g. adding tag to active span

current_span = Datadog.tracer.active_span
current_span.set_tag('<TAG_KEY>', '<TAG_VALUE>') unless current_span.nil?
```

**Adding tags globally to all spans**

Add tags to all spans by configuring the tracer with the `tags` option:

```ruby
Datadog.configure do |c|
  c.tracer tags: { 'env' => 'prod' }
end
```

See the [API documentation][1] for more details.

[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#environment-and-tags
{{% /tab %}}
{{% tab "Go" %}}

**Adding tags to a span**

Add tags directly to a `Span` interface by calling `SetTag`:

```go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Set tag
    span.SetTag("http.url", r.URL.Path)
}

func main() {
    tracer.Start(tracer.WithServiceName("<SERVICE_NAME>"))
    defer tracer.Stop()
    http.HandleFunc("/posts", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

**Adding tags to a Span attached to a Context**

Datadog's integrations make use of the `Context` type to propagate the current active span. If you want to add a tag to a span attached to a `Context` via automatic instrumentation, call the `SpanFromContext` function:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Retrieve a span for a web request attached to a Go Context.
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
        // Set tag
        span.SetTag("http.url", r.URL.Path)
    }
}
```

**Adding tags globally to all spans**

Add tags to all spans by configuring the tracer with the `tags` option:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(
        tracer.WithGlobalTag("datacenter", "us-1"),
        tracer.WithGlobalTag("env", "prod"),
    )
    defer tracer.Stop()
}
```

{{% /tab %}}
{{% tab "Node.js" %}}

**Adding tags to a span**

Add tags directly to span objects by calling `setTag` or `addTags`:

```javascript
// An example of an Express endpoint,
// with Datadog tracing around the request.
app.get('/posts', (req, res) => {
  const span = tracer.startSpan('web.request')

  span.setTag('http.url', req.url)
  span.addTags({
    'http.method': req.method
  })
})
```

**Adding tags to a current active span**

Access the current active span from any method within your code. Note, however, that if the method is called and there is no span currently active, `tracer.scopeManager().active()` returns `null`.

```javascript
// e.g. adding tag to active span

const scope = tracer.scopeManager().active()
const span = scope.span()

span.setTag('<TAG_KEY>', '<TAG_VALUE>')
```

{{% /tab %}}
{{% tab ".NET" %}}

**Adding tags to a span**

Add tags directly to a `Datadog.Trace.Span` object by calling `Span.SetTag()`. For example:

```csharp
using Datadog.Trace;

// get the global tracer
var tracer = Tracer.Instance;

// get the currently active span (can be null)
var span = tracer.ActiveScope?.Span;

// add a tag to the span
span?.SetTag("<TAG_KEY>", "<TAG_VALUE>");
```

**Note**: `Datadog.Trace.Tracer.Instance.ActiveScope` returns `null` if there is no active span.

{{% /tab %}}
{{% tab "PHP" %}}

**Adding tags to a span**

Add tags directly to a `DDTrace\Span` object by calling `Span::setTag()`.

```php
dd_trace('<FUNCTION_NAME>', function () {
    $scope = \DDTrace\GlobalTracer::get()
      ->startActiveSpan('<FUNCTION_NAME>');
    $span = $scope->getSpan();
    $span->setTag('<TAG_KEY>', '<TAG_VALUE>');

    $result = <FUNCTION_NAME>();

    $scope->close();
    return $result;
});
```

**Adding tags to a current active span**

```php
// Get the currently active span (can be null)
$span = \DDTrace\GlobalTracer::get()->getActiveSpan();
if (null !== $span) {
  // Add a tag to the span
  $span->setTag('<TAG_KEY>', '<TAG_VALUE>');
}
```

**Note**: `Tracer::getActiveSpan()` returns `null` if there is no active span.

**Adding tags globally to all spans**

Use the environment variable `DD_TRACE_GLOBAL_TAGS` to add tags to all the generated spans. See the [PHP configuration][1]
section for details on how environment variables should be set.

```ini
DD_TRACE_GLOBAL_TAGS=key1:value1,key2:value2
```

[1]: /tracing/languages/php/#configuration

{{% /tab %}}
{{% tab "C++" %}}

Add tags directly to a span object by calling `Span::SetTag`. For example:

```cpp
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
span->SetTag("key must be string", "Values are variable types");
span->SetTag("key must be string", 1234);
```

Values are of [variable type][1] and can be complex objects. Values are serialized as JSON, with the exception of a string value being serialized bare (without extra quotation marks).

[1]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
{{% /tab %}}
{{< /tabs >}}

## Change Agent Hostname

Configure your application level tracers to submit traces to a custom Agent hostname. See the examples below for each supported language:

{{< tabs >}}
{{% tab "Java" %}}

The Java Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`.

```bash
java -javaagent:<DD-JAVA-AGENT-PATH>.jar -jar <YOUR_APPLICATION_PATH>.jar
```

You can also use system properties:

```bash
java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
     -Ddd.agent.host=$DD_AGENT_HOST \
     -Ddd.agent.port=$DD_TRACE_AGENT_PORT \
     -jar <YOUR_APPLICATION_PATH>.jar
```

{{% /tab %}}
{{% tab "Python" %}}

The Python Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

{{% /tab %}}
{{% tab "Ruby" %}}

The Ruby Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```ruby
Datadog.configure do |c|
  c.tracer hostname: ENV['DD_AGENT_HOST'],
           port: ENV['DD_TRACE_AGENT_PORT']
end
```

{{% /tab %}}
{{% tab "Go" %}}

The Go Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```go
package main

import (
    "net"
    "os"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    addr := net.JoinHostPort(
        os.Getenv("DD_AGENT_HOST"),
        os.Getenv("DD_TRACE_AGENT_PORT"),
    )
    tracer.Start(tracer.WithAgentAddr(addr))
    defer tracer.Stop()
}

```

{{% /tab %}}
{{% tab "Node.js" %}}

The NodeJS Tracing Module automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```js
const tracer = require('dd-trace').init({
  hostname: process.env.DD_AGENT_HOST,
  port: process.env.DD_TRACE_AGENT_PORT
})
```

{{% /tab %}}
{{% tab "PHP" %}}

The PHP tracer automatically looks for and initializes with the ENV variables `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`

```php
putenv('DD_AGENT_HOST=localhost');
putenv('DD_TRACE_AGENT_PORT=8126');
```

{{% /tab %}}
{{< /tabs >}}

## Runtime Metrics

Enable runtime metrics collection in the tracing client to gain additional insight into an application's performance. Runtime metrics can be viewed in the context of a service, correlated in the Trace View at the time of a given request, and utilized anywhere in the platform.

{{< img src="tracing/jvm_runtime_trace.png" alt="JVM Runtime Trace" responsive="true" style="width:100%;">}}

{{< tabs >}}
{{% tab "Java" %}}

### Automatic Configuration

JVM metrics collection can be enabled with one configuration parameter in the tracing client:

* System Property: `-Ddd.jmxfetch.enabled=true`
* Environment Variable: `DD_JMXFETCH_ENABLED=true`

JVM metrics can be viewed in correlation with your Java services. You can get started [here][1]. 

{{< img src="tracing/jvm-runtime.png" alt="JVM Runtime" responsive="true" style="width:100%;">}}

**Note**: For the runtime UI, `dd-trace-java` >= [`0.24.0`][5] is supported.   

### Data Collected

The following metrics are collected by default after enabling JVM metrics.

{{< get-metrics-from-git "java" >}}

Along with displaying these metrics in your APM Service Page, Datadog provides a [default JVM Runtime Dashboard][4] with the `service` and `runtime-id` tags that are applied to these metrics. 

Additional JMX metrics can be added using configuration files that are passed to `jmxfetch.metrics-configs`. You can also enable existing Datadog JMX integrations individually with the `dd.integration.<name>` parameter. This auto-embeds configuration from Datadog's [existing JMX configuration files][2]. See the [JMX Integration][3] for further details on configuration. 

### Collecting JVM Metrics in Containerized Environments

By default, JVM metrics from your application are sent to the Datadog Agent over port 8125. If you are running the Agent as a container, ensure that `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [is set to true][6], and that port 8125 is open on the Agent. For example: in Kubernetes, [bind the DogstatsD port to a host port][7]; in ECS, [set the approriate flags in your task definition][8].

[1]: https://app.datadoghq.com/apm/services
[2]: https://github.com/DataDog/integrations-core/search?q=jmx_metrics&unscoped_q=jmx_metrics
[3]: /integrations/java/#configuration
[4]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[5]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
[6]: https://docs.datadoghq.com/agent/docker/#dogstatsd-custom-metrics
[7]: https://docs.datadoghq.com/agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[8]: https://docs.datadoghq.com/integrations/amazon_ecs/?tab=python#create-an-ecs-task

{{% /tab %}}
{{% tab "Python" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
{{% /tab %}}
{{% tab "Ruby" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
{{% /tab %}}
{{% tab "Go" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help

{{% /tab %}}
{{% tab "Node.js" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help

{{% /tab %}}
{{% tab ".NET" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help

{{% /tab %}}
{{% tab "PHP" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help

{{% /tab %}}
{{< /tabs >}}

## Manual Instrumentation

Manual instrumentation allows programmatic creation of traces to send to Datadog. This is useful for tracing in-house code not captured by automatic instrumentation. Before instrumenting your application, review Datadog’s [APM Terminology][2] and familiarize yourself with the core concepts of Datadog APM.


{{< tabs >}}
{{% tab "Java" %}}

If you aren't using a [supported framework instrumentation][1], or you would like additional depth in your application’s traces, you may want to manually instrument your code.

Do this either using the Trace annotation for simple method call tracing, or with the [OpenTracing API][2] for complex tracing.

Datadog's Trace annotation is provided by the [dd-trace-api dependency][3].

**Example Usage**

```java
import datadog.trace.api.Trace;

public class MyClass {
  @Trace
  public static void myMethod() {
    // your method implementation here
  }
}
```


[1]: /tracing/languages/java/#compatibility
[2]: #opentracing
[3]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
{{% /tab %}}
{{% tab "Python" %}}

If you aren't using supported library instrumentation (see [library compatibility][1]), you may want to manually instrument your code.

You may also want to extend the functionality of the `ddtrace` library or gain finer control over instrumenting your application. Several techniques are provided by the library to accomplish this.

The following examples use the global tracer object which can be imported via:

```python
  from ddtrace import tracer
```

**Decorator**

`ddtrace` provides a decorator that can be used to trace a particular method in your application:

```python
  @tracer.wrap()
  def business_logic():
    """A method that would be of interest to trace."""
    # ...
    # ...
```

API details for the decorator can be found at [`ddtrace.Tracer.wrap()`][2]

**Context Manager**

To trace an arbitrary block of code, you can use the [`ddtrace.Span`][3] context manager:

```python
  # trace some interesting operation
  with tracer.trace('interesting.operations'):
    # do some interesting operation(s)
    # ...
    # ...
```

Further API details can be found at [`ddtrace.Tracer()`][4]

**Using the API**

If the above methods are still not enough to satisfy your tracing needs, a manual API is provided which allows you to start and finish spans however you may require:

```python
  span = tracer.trace('operations.of.interest')

  # do some operation(s) of interest in between

  # NOTE: make sure to call span.finish() or the entire trace is not sent
  # to Datadog
  span.finish()
```

API details of the decorator can be found here:

- [`ddtrace.Tracer.trace`][5]
- [`ddtrace.Span.finish`][6]



[1]: /tracing/languages/python/#compatibility
[2]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.wrap
[3]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span
[4]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#tracer
[5]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.trace
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{% tab "Ruby" %}}

If you aren't using supported library instrumentation (see [library compatibility][1]), you may want to to manually instrument your code. Adding tracing to your code is easy using the `Datadog.tracer.trace` method, which you can wrap around any Ruby code.

**Example Usage**

```ruby
# An example of a Sinatra endpoint,
# with Datadog tracing around the request,
# database query, and rendering steps.
get '/posts' do
  Datadog.tracer.trace('web.request', service: '<SERVICE_NAME>', resource: 'GET /posts') do |span|
    # Trace the activerecord call
    Datadog.tracer.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Add some APM tags
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Trace the template rendering
    Datadog.tracer.trace('template.render') do
      erb :index
    end
  end
end
```

For more details about manual instrumentation, check out the [API documentation][2].


[1]: /tracing/languages/ruby/#compatibility
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#manual-instrumentation
{{% /tab %}}
{{% tab "Go" %}}

If you aren't using supported library instrumentation (see [Library compatibility][1]), you may want to to manually instrument your code.

To make use of manual instrumentation, use the `tracer` package which is documented on Datadog's [godoc page][2].

Create a distributed trace by manually propagating the tracing context:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    span, ctx := tracer.StartSpanFromContext(r.Context(), "post.process")
    req, err := http.NewRequest("GET", "http://example.com", nil)
    req = req.WithContext(ctx)
    // Inject the span Context in the Request headers
    err = tracer.Inject(span.Context(), tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Handle or log injection error
    }
    http.DefaultClient.Do(req)
}
```

Then, on the server side, to continue the trace, start a new Span from the extracted `Context`:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Extract the span Context and continue the trace in this service
    sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Handle or log extraction error
    }

    span := tracer.StartSpan("post.filter", tracer.ChildOf(sctx))
    defer span.Finish()
}
```

**Example Usage**

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    // Start the tracer with zero or more options.
    tracer.Start(tracer.WithServiceName("<SERVICE_NAME>"))
    defer tracer.Stop()

    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Set metadata
    span.SetTag("<TAG_KEY>", "<TAG_VALUE>")
}
```


[1]: /tracing/languages/go/#compatibility
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
{{% /tab %}}
{{% tab "Node.js" %}}

If you aren’t using supported library instrumentation (see [Library compatibility][1]), you may want to manually instrument your code.

The following example initializes a Datadog Tracer and creates a span called `web.request`:

```javascript
const tracer = require('dd-trace').init()
const span = tracer.startSpan('web.request')

span.setTag('http.url', '/login')
span.finish()
```

For more information on manual instrumentation, see the [API documentation][2].


[1]: /tracing/languages/nodejs/#compatibility
[2]: https://datadog.github.io/dd-trace-js/#manual-instrumentation
{{% /tab %}}
{{% tab ".NET" %}}

If you aren’t using libraries supported by automatic instrumentation (see [Library compatibility][1]), you should manually instrument your code.

The following example uses the global Datadog Tracer and creates a span to trace a web request:

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    var span = scope.Span;
    span.Type = SpanTypes.Web;
    span.ResourceName = request.Url;
    span.SetTag(Tags.HttpMethod, request.Method);

    // do some work...
}
```


[1]: /tracing/languages/dotnet/#compatibility
{{% /tab %}}

{{% tab "PHP" %}}

Even if Datdog does not officially support your web framework, you may not need to perform any manual instrumentation. See [automatic instrumentation][1] for more details.

If you really need manual instrumentation, e.g., because you want to trace specific custom methods in your application, first install the PHP tracer dependency with Composer:

```bash
$ composer require datadog/dd-trace
```

#### Trace a custom function or method

The `dd_trace()` function hooks into existing functions and methods to:

* Open a span before the code executes
* Set additional tags or errors on the span
* Close the span when it is done
* Modify the arguments or the return value

For example, the following snippet traces the `CustomDriver::doWork()` method, adds custom tags, reports any exceptions as errors on the span, and then re-throws the exceptions.

```php
dd_trace("CustomDriver", "doWork", function (...$args) {
    // Start a new span
    $scope = GlobalTracer::get()->startActiveSpan('CustomDriver.doWork');
    $span = $scope->getSpan();

    // Access object members via $this
    $span->setTag(Tags\RESOURCE_NAME, $this->workToDo);

    try {
        // Execute the original method
        $result = $this->doWork(...$args);
        // Set a tag based on the return value
        $span->setTag('doWork.size', count($result));
        return $result;
    } catch (Exception $e) {
        // Inform the tracer that there was an exception thrown
        $span->setError($e);
        // Bubble up the exception
        throw $e
    } finally {
        // Close the span
        $span->finish();
    }
});
```

The root span an be accessed later on directly from the global tracer via `Tracer::getRootScope()`. This is useful in contexts where the metadata to be added to the root span does not exist in early script execution.

```php
$rootSpan = \DDTrace\GlobalTracer::get()
    ->getRootScope()
    ->getSpan();
$rootSpan->setTag(\DDTrace\Tag::HTTP_STATUS_CODE, 200);
```

#### Zend Framework 1 manual instrumentation

Zend Framework 1 is automatically instrumented by default, so you are not required to modify your ZF1 project. However, if automatic instrumentation is disabled, enable the tracer manually.

First, [download the latest source code from the releases page][2]. Extract the zip file and copy the `src/DDTrace` folder to your application's `/library` folder. Then add the following to your `application/configs/application.ini` file:

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = APPLICATION_PATH "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

#### Manual instrumentation and php code optimization

Prior to PHP 7, some frameworks provided ways to compile PHP classes—e.g., through the Laravel's `php artisan optimize` command.

While this [has been deprecated][3] if you are using PHP 7.x, you still may use this caching mechanism in your app prior to version 7.x. In this case, Datadog suggests you use the [OpenTracing][4] API instead of adding `datadog/dd-trace` to your Composer file.


[1]: /tracing/languages/php/#automatic-instrumentation
[2]: https://github.com/DataDog/dd-trace-php/releases/latest
[3]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize
[4]: #opentracing

{{% /tab %}}
{{% tab "C++" %}}

To manually instrument your code, install the tracer as in the setup examples, and then use the tracer object to create spans.

```cpp
{
  // Create a root span.
  auto root_span = tracer->StartSpan("operation_name");
  // Create a child span.
  auto child_span = tracer->StartSpan(
      "operation_name",
      {opentracing::ChildOf(&root_span->context())});
  // Spans can be finished at a specific time ...
  child_span->Finish();
} // ... or when they are destructed (root_span finishes here).
```

Distributed tracing can be accomplished by [using the `Inject` and `Extract` methods on the tracer][1], which accept [generic `Reader` and `Writer` types][2]. Priority sampling (enabled by default) should be on to ensure uniform delivery of spans.

```cpp
// Allows writing propagation headers to a simple map<string, string>.
// Copied from https://github.com/opentracing/opentracing-cpp/blob/master/mocktracer/test/propagation_test.cpp
struct HTTPHeadersCarrier : HTTPHeadersReader, HTTPHeadersWriter {
  HTTPHeadersCarrier(std::unordered_map<std::string, std::string>& text_map_)
      : text_map(text_map_) {}

  expected<void> Set(string_view key, string_view value) const override {
    text_map[key] = value;
    return {};
  }

  expected<void> ForeachKey(
      std::function<expected<void>(string_view key, string_view value)> f)
      const override {
    for (const auto& key_value : text_map) {
      auto result = f(key_value.first, key_value.second);
      if (!result) return result;
    }
    return {};
  }

  std::unordered_map<std::string, std::string>& text_map;
};

void example() {
  auto tracer = ...
  std::unordered_map<std::string, std::string> headers;
  HTTPHeadersCarrier carrier(headers);

  auto span = tracer->StartSpan("operation_name");
  tracer->Inject(span->context(), carrier);
  // `headers` now populated with the headers needed to propagate the span.
}
```

[1]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[2]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h

{{% /tab %}}
{{< /tabs >}}

## OpenTracing

OpenTracing is a vendor-neutral, cross-language standard for tracing applications. Datadog offers OpenTracing implementations for many APM tracers. For more details see [opentracing.io][3].


{{< tabs >}}
{{% tab "Java" %}}

Use the [OpenTracing API][1] and the Datadog Tracer (dd-trace-ot) library to measure execution times for specific pieces of code. This lets you trace your application more precisely than you can with the Java Agent alone.

**Setup**:

For Maven, add this to `pom.xml`:

```xml
<!-- OpenTracing API -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-api</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- OpenTracing Util -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-util</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- Datadog Tracer (only needed if you do not use dd-java-agent) -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-ot</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>
```

For Gradle, add:

```
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.31.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.31.0"
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

Configure your application using environment variables or system properties as discussed in the [configuration][2] section.


**Manual Instrumentation with OpenTracing**:

Use a combination of these if the automatic instrumentation isn’t providing you enough depth or detail.

Create a distributed trace using manual instrumentation with OpenTracing:

```java
// Step 1: Inject the Datadog headers in the client code
try (Scope scope = tracer.buildSpan("httpClientSpan").startActive(true)) {
    final Span span = scope.span();
    HttpRequest request = /* your code here */;

    tracer.inject(span.context(),
                  Format.Builtin.HTTP_HEADERS,
                  new MyHttpHeadersInjectAdapter(request));

    // http request impl...
}

public static class MyHttpHeadersInjectAdapter implements TextMap {
  private final HttpRequest httpRequest;

  public HttpHeadersInjectAdapter(final HttpRequest httpRequest) {
    this.httpRequest = httpRequest;
  }

  @Override
  public void put(final String key, final String value) {
    httpRequest.addHeader(key, value);
  }

  @Override
  public Iterator<Map.Entry<String, String>> iterator() {
    throw new UnsupportedOperationException("This class should be used only with tracer#inject()");
  }
}

// Step 2: Extract the Datadog headers in the server code
HttpRequest request = /* your code here */;

final SpanContext extractedContext =
  GlobalTracer.get().extract(Format.Builtin.HTTP_HEADERS,
                             new MyHttpRequestExtractAdapter(request));

try (Scope scope = tracer.buildSpan("httpServerSpan").asChildOf(extractedContext).startActive(true)) {
    final Span span = scope.span(); // is a child of http client span in step 1
    // http server impl...
}

public class MyHttpRequestExtractAdapter implements TextMap {
  private final HttpRequest request;

  public HttpRequestExtractAdapter(final HttpRequest request) {
    this.request = request;
  }

  @Override
  public Iterator<Map.Entry<String, String>> iterator() {
    return request.headers().iterator();
  }

  @Override
  public void put(final String key, final String value) {
    throw new UnsupportedOperationException("This class should be used only with Tracer.extract()!");
  }
}
```

Using try-finally:

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        /*
         * 1. Configure your application using environment variables or system properties
         * 2. Using dd-java-agent (-javaagent:/path/to/dd-java-agent.jar),
         *    GlobalTracer is automatically instantiated.
         */
        Tracer tracer = GlobalTracer.get();

        Scope scope = tracer.buildSpan("<OPERATION_NAME>").startActive(true);
        try {
            scope.span().setTag(DDTags.SERVICE_NAME, "<SERVICE_NAME>");

            // The code you're tracing
            Thread.sleep(1000);

        // If you don't call close(), the span data will NOT make it to Datadog!
        } finally {
            scope.close();
        }
    }
}
```

Alternatively, wrap the code you want to trace in a `try-with-resources` statement:

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        Tracer tracer = GlobalTracer.get();

        try (Scope scope = tracer.buildSpan("<OPERATION_NAME>").startActive(true)) {
            scope.span().setTag(DDTags.SERVICE_NAME, "<SERVICE_NAME>");
            Thread.sleep(1000);
        }
    }
}
```

In this case, you don't need to call `scope.close()`.

If you’re not using `dd-java-agent.jar`, you must register a configured tracer with `GlobalTracer`. For this, call `GlobalTracer.register(new DDTracer())` early on in your application startup (e.g., main method).

```java
import datadog.opentracing.DDTracer;
import datadog.trace.api.sampling.AllSampler;
import datadog.trace.common.writer.DDAgentWriter;

import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class Application {

    public static void main(String[] args) {

        // Initialize the tracer from environment variables or system properties
        Tracer tracer = new DDTracer();
        GlobalTracer.register(tracer);
        // register the same tracer with the Datadog API
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);

        // OR from the API
        Writer writer = new DDAgentWriter();
        Sampler sampler = new AllSampler();
        Tracer tracer = new DDTracer(writer, sampler);
        GlobalTracer.register(tracer);
        // register the same tracer with the Datadog API
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);

        // ...
    }
}
```

**Manual Instrumentation for Async Traces**:

Create asynchronous traces with manual instrumentation using the OpenTracing API.

```java
// Step 1: start the Scope/Span on the work submission thread
try (Scope scope = tracer.buildSpan("ServiceHandlerSpan").startActive(false)) {
    final Span span = scope.span();
    doAsyncWork(new Runnable() {
        @Override
        public void run() {
            // Step 2: reactivate the Span in the worker thread
            try (Scope scope = tracer.scopeManager().activate(span, false)) {
              // worker thread impl...
            }
        }
    });
    // submission thread impl...
}
```
Notice the above examples only use the OpenTracing classes. Check the [OpenTracing API][1] for more details and information.


[1]: https://github.com/opentracing/opentracing-java
[2]: /tracing/languages/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

Support for OpenTracing in the Python tracer is currently in beta.

**Setup**:

OpenTracing support is included in the `ddtrace` package. Use `pip` to install the required `opentracing` package :

```sh
$ pip install ddtrace[opentracing]
```

**Usage**:

The OpenTracing convention for initializing a tracer is to define an initialization method that configures and instantiates a new tracer and overwrites the global `opentracing.tracer` reference:

```python
import time
import opentracing
from ddtrace.opentracer import Tracer, set_global_tracer

def init_tracer(service_name):
    config = {
      'agent_hostname': 'localhost',
      'agent_port': 8126,
    }
    tracer = Tracer(service_name, config=config)
    set_global_tracer(tracer)
    return tracer

def my_operation():
  span = opentracing.tracer.start_span('<OPERATION_NAME>')
  span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
  time.sleep(0.05)
  span.finish()

init_tracer('<SERVICE_NAME>')
my_operation()
```

For more advanced usage and configuration information see [Datadog Python Opentracing API docs][1] and the [Python OpenTracing repo][2].


[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#opentracing
[2]: https://github.com/opentracing/opentracing-python
{{% /tab %}}
{{% tab "Ruby" %}}

Support for OpenTracing with Ruby is coming soon. Reach out to [the Datadog support team][1] to be part of the beta.


[1]: /help
{{% /tab %}}
{{% tab "Go" %}}

Import the [`opentracer` package][1] to expose the Datadog tracer as an [OpenTracing][2] compatible tracer.

**Example**:

A basic usage example:

```go
package main

import (
    "github.com/opentracing/opentracing-go"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // Start the regular tracer and return it as an opentracing.Tracer interface. You
    // may use the same set of options as you normally would with the Datadog tracer.
    t := opentracer.New(tracer.WithServiceName("<SERVICE_NAME>"))

    // Stop it using the regular Stop call for the tracer package.
    defer tracer.Stop()

    // Set the global OpenTracing tracer.
    opentracing.SetGlobalTracer(t)

    // Use the OpenTracing API as usual.
}
```

**Note**: Using the [OpenTracing API][3] in parallel with the regular API or Datadog integrations is fully supported. Under the hood, all of them make use of the same tracer. See the [API documentation][1] for more examples and details.

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[2]: http://opentracing.io
[3]: https://github.com/opentracing/opentracing-go
{{% /tab %}}
{{% tab "Node.js" %}}
This library is OpenTracing compliant. Use the ([OpenTracing API][1] and the Datadog Tracer ([dd-trace][2]) library to measure execution times for specific pieces of code. In the following example, a Datadog Tracer is initialized and used as a global tracer:


```javascript
// server.js

const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)

const app = require('./app.js')

// app.js

const tracer = opentracing.globalTracer()
```

The following tags are available to override Datadog specific options:

* `service.name`: The service name to be used for this span. The service name from the tracer is used if this is not provided.
* `resource.name`: The resource name to be used for this span. The operation name is used if this is not provided.
* `span.type`: The span type to be used for this span. The span type falls back to `custom` if not provided.

[1]: https://doc.esdoc.org/github.com/opentracing/opentracing-javascript
[2]: https://datadog.github.io/dd-trace-js
{{% /tab %}}
{{% tab ".NET" %}}

For OpenTracing support, add the [`Datadog.Trace.OpenTracing`][1] NuGet package to your application. During application start-up, initialize the OpenTracing library:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // create an OpenTracing ITracer with default setting
    OpenTracing.ITracer tracer =
        Datadog.Trace.OpenTracing.OpenTracingTracerFactory.CreateTracer();

    // to use tracer with ASP.NET Core dependency injection
    services.AddSingleton<ITracer>(tracer);

    // to use tracer with OpenTracing.GlobalTracer.Instance
    GlobalTracer.Register(tracer);
}
```


[1]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing
{{% /tab %}}
{{% tab "PHP" %}}

The PHP tracer supports OpenTracing via the [**opentracing/opentracing** library][1] which is installed with Composer:

```bash
$ composer require opentracing/opentracing:1.0.0-beta5
```

When [automatic instrumentation][2] is enabled, an OpenTracing-compatible tracer is made available as the global tracer:

```php
$otTracer = \OpenTracing\GlobalTracer::get();
$span = $otTracer->startActiveSpan('web.request')->getSpan();
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...Use OpenTracing as expected
```


[1]: https://github.com/opentracing/opentracing-php
[2]: /tracing/languages/php/#automatic-instrumentation
{{% /tab %}}
{{% tab "C++" %}}

The Datadog C++ tracer can only be used through the OpenTracing API. The usage instructions in this document all describe generic OpenTracing functionality.

{{% /tab %}}
{{< /tabs >}}

## Forced Tracing

APM enables priority sampling by default to allows traces between two Datadog endpoints to be sampled together. This prevents trace sampling from removing segments of a distributed trace (i.e. ensures completeness) and helps removing unimportant ones. You can override this functionality to force keep a trace (critical transaction, debug mode, etc.) by the agent and the server using forced tracing.

Note: <TODO (Optional): Include link from API documentation for cases where it doesn't work>

For a more detailed explanations of sampling, check the [sampling and storage][5] documentation.

{{< tabs >}}
{{% tab "Java" %}}

Set tag to manually force trace:

```java
import datadog.trace.api.Trace;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.common.sampling.ForcedTracing;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();
        // ask the sampler to force the current trace
        //TODO: Tentative
        ddspan.setTag(ForcedTracing.keep);
        // method impl follows
    }
}
```


{{% /tab %}}
{{% tab "Python" %}}

Set tag to manually force trace:

To set a custom priority to a trace:

```python
from ddtrace.ext.priority import FORCE_TRACE

span = tracer.current_span()

# indicate to force a trace
#TODO: Tentative
span.context.setTag(FORCE_TRACE)
```

{{% /tab %}}
{{% tab "Ruby" %}}

Set tag to manually force trace:


```ruby
# Indicate to force a trace
#TODO: Tentative
span.context.set_tag(Datadog::Ext::FORCE_TRACE)

```

{{% /tab %}}
{{% tab "Go" %}}

Set tag to manually force trace:

```go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Indicate to force a trace
    //Tentative
    span.SetTag(ext.ForceTrace)
}
```


{{% /tab %}}
{{% tab "Node.js" %}}

Set tag to manually force trace:

```javascript



// Indicate to force a trace
//TODO: Tentative
span.setTag('force.trace')
```


{{% /tab %}}
{{% tab ".NET" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
{{% /tab %}}
{{% tab "PHP" %}}

Priority sampling is enabled by default.

{{% /tab %}}
{{% tab "C++" %}}

Set tag to manually force trace:

```cpp
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// Force this trace
//TODO: Tentative
span->SetTag("force.trace"); 

```

{{% /tab %}}
{{< /tabs >}}

## Correlate Traces and Logs

The correlation between Datadog APM and Datadog Log Management is improved by automatically adding a `trace_id` and `span_id` in your logs with the Tracing Libraries. This can then be used in the platform to show you the exact logs correlated to the observed trace.

Before correlating traces with logs, ensure your logs are either [sent as JSON][6], or [parsed by the proper language level log processor][7]. 

Your language level logs *must* be turned into Datadog attributes in order for traces and logs correlation to work.

{{< img src="tracing/trace_id_injection.png" alt="Logs in Traces" responsive="true" style="width:100%;">}}

{{< tabs >}}
{{% tab "Java" %}}

Use one of the following options to inject Java trace information into your logs:

**Automatic Trace ID Injection**

Enable injection in the Java Tracer's [configuration][1] by setting `Ddd.logs.injection=true` or through environment variable `DD_LOGS_INJECTION=true`.

**Note**: Currently only **slf4j** is supported for MDC autoinjection.

If the logs are already JSON formatted, there is nothing left to do. If the logs are raw formatted, update your formatter to include `dd.trace_id` and `dd.span_id` in your logger configuration:

```
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

**Manual Trace ID Injection**

If you prefer to manually correlate your traces with your logs, leverage the Datadog API to retrieve correlation identifiers:

* Use `CorrelationIdentifier#getTraceId()` and `CorrelationIdentifier#getSpanId()` API methods to inject identifiers at the beginning and end of each span to log (see examples below).
* Configure MDC to use the injected Keys:
  * `dd.trace_id` Active Trace ID during the log statement (or `0` if no trace)
  * `dd.span_id` Active Span ID during the log statement (or `0` if no trace)

* `log4j2` example:

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
try {
    ThreadContext.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    ThreadContext.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Log something

finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```

* `slf4j/logback` example:

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// there must be spans started and active before this block.
try {
    MDC.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    MDC.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Log something

finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```

Then update your logger configuration to include `dd.trace_id` and `dd.span_id` in your log pattern:

```
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

**Note**: If you are not using a [Datadog Log Integration][2] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][3].

[See the Java logging documentation][2] for more details about specific logger implementation or to learn how to log in JSON.

[1]: https://docs.datadoghq.com/tracing/languages/java/#configuration
[2]: https://docs.datadoghq.com/logs/log_collection/java/?tab=log4j#raw-format
[3]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Python" %}}

Use one of the following options to inject Python trace information into your logs:

**Automatic Trace ID Injection With Standard Library Logging**

Enable injection with the environment variable `DD_LOGS_INJECTION=true` when using `ddtrace-run`.

**Note**: The standard library `logging` is supported for auto-injection. Any libraries, such as `json_log_formatter`, that extend the standard library module are also supported for auto-injection. `ddtrace-run` calls `logging.basicConfig` before executing your application. If the root logger has a handler configured, your application must modify the root logger and handler directly.

**Manual Trace ID Injection with Standard Library Logging**

If you prefer to manually correlate your traces with your logs, patch your `logging` module by updating your log formatter to include the ``dd.trace_id`` and ``dd.span_id`` attributes from the log record.

The configuration below is used by the automatic injection method and is supported by default in the Python Log Integration:

``` python
from ddtrace import patch_all; patch_all(logging=True)
import logging
from ddtrace import tracer

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

@tracer.wrap()
def hello():
    log.info('Hello, World!')

hello()
```


**Manual Trace ID Injection without Standard Library Logging**

If you are not using the standard library `logging` module, you can use the `ddtrace.helpers.get_correlation_ids()` to inject tracer information into your logs. As an illustration of this approach, the following example defines a function as a *processor* in `structlog` to add `dd.trace_id` and `dd.span_id` to the log output:

``` python
from ddtrace.helpers import get_correlation_ids

import structlog


def tracer_injection(logger, log_method, event_dict):
    # get correlation ids from current tracer context
    trace_id, span_id = get_correlation_ids()

    # add ids to structlog event dictionary
    # if no trace present, set ids to 0
    event_dict['dd.trace_id'] = trace_id or 0
    event_dict['dd.span_id'] = span_id or 0

    return event_dict


structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.JSONRenderer()
    ]
)
log = structlog.get_logger()
```

Once the logger is configured, executing a traced function that logs an event yields the injected tracer information:

```
>>> traced_func()
{"event": "In tracer context", "trace_id": 9982398928418628468, "span_id": 10130028953923355146}
```

**Note**: If you are not using a [Datadog Log Integration][1] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][2].

[See the Python logging documentation][1] to ensure that the Python Log Integration is properly configured so that your Python logs are automatically parsed.

[1]: https://docs.datadoghq.com/logs/log_collection/python/#configure-the-datadog-agent
[2]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Ruby" %}}

Use one of the following options to inject Ruby trace information into your logs:

**Automatic Trace ID Injection for Rails Applications using Lograge (recommended)**

After [setting up Lograge in a Rails application][1], modify the `custom_options` block in your environment configuration file (e.g. `config/environments/production.rb`) to add the trace IDs:

```ruby
config.lograge.custom_options = lambda do |event|
  # Retrieves trace information for current thread
  correlation = Datadog.tracer.active_correlation

  {
    # Adds IDs as tags to log output
    :dd => {
      :trace_id => correlation.trace_id,
      :span_id => correlation.span_id
    },
    :ddsource => ["ruby"],
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
end
```

**Automatic Trace ID Injection for default Rails Applications**

Rails applications which are configured with a `ActiveSupport::TaggedLogging` logger can append trace IDs as tags to log output. The default Rails logger implements this tagged logging, making it easier to add trace tags.

In your Rails environment configuration file (e.g. `config/environments/production.rb`), add the following:

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end
```

This appends trace tags to web requests:

```
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206]   Article Load (0.5ms)  SELECT "articles".* FROM "articles"
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```

**Manual Trace ID Injection for Ruby Applications**

To add trace IDs to your own logger, add a log formatter which retrieves the trace IDs with `Datadog.tracer.active_correlation`, then add the trace IDs to the message.

To ensure proper log correlation, verify the following is present in each message:

 - `dd.trace_id=<TRACE_ID>`: Where `<TRACE_ID>` is equal to `Datadog.tracer.active_correlation.trace_id` or `0` if no trace is active during logging.
 - `dd.span_id=<SPAN_ID>`: Where `<SPAN_ID>` is equal to `Datadog.tracer.active_correlation.span_id` or `0` if no trace is active during logging.

By default, `Datadog::Correlation::Identifier#to_s` returns `dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>`.

An example of this in practice:

```ruby
require 'ddtrace'
require 'logger'

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog.tracer.active_correlation}] #{msg}\n"
end

# When no trace is active
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# When a trace is active
Datadog.tracer.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```

**Note**: If you are not using a [Datadog Log Integration][2] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][3].

See the [Ruby logging documentation][2] to verify the Ruby log integration is properly configured and your ruby logs are automatically parsed.

[1]: https://docs.datadoghq.com/logs/log_collection/ruby
[2]: https://docs.datadoghq.com/logs/log_collection/ruby/#configure-the-datadog-agent
[3]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Go" %}}

Use the following example to inject Go trace information into your logs.

**Manual Trace ID Injection for Go**

The Go tracer exposes two API calls to allow printing trace and span identifiers along with log statements using exported methods from `SpanContext` type:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Retrieve Trace ID and Span ID
    traceID := span.Context().TraceID()
    spanID := span.Context().SpanID()

    // Append them to log messages as fields:
    log.Printf("my log message dd.trace_id=%d dd.span_id=%d", traceID, spanID)
}
```

The above example illustrates how to use the span's context in the standard library's `log` package. Similar logic may be applied to 3rd party packages too.


**Note**: If you are not using a [Datadog Log Integration][1] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][2].

[1]: https://docs.datadoghq.com/tracing/languages/go/#configuration
[2]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Node.js" %}}

Use one the following options to inject Node trace information into your logs.

**Automatic Trace ID Injection With Supported Logging Libraries (recommended)**

Enable injection with the environment variable `DD_LOGS_INJECTION=true` or by configuring the tracer directly:

```javascript
const tracer = require('dd-trace').init({
  logInjection: true
})
```

This enables automatic trace ID injection for `winston`, `bunyan`, and `pino`.

**Note**: Automatic injection only works for logs formatted as JSON.

**Manual Trace ID Injection for JSON Formatted Logs**

If you are using a logging library not supported for automatic injection but are using JSON format, it's possible to do manual injection directly in your code.

Example using `console` as the underlying logger:

```javascript
const tracer = require('dd-trace')

class Logger {
  log (level, message) {
    const scope = tracer.scopeManager().active()
    const time = (new Date()).toISOString()
    const record = { time, level, message }

    if (scope && scope.span()) {
      tracer.inject(scope.span().context(), record)
    }

    console.log(record)
  }
}

module.exports = Logger
```

**Manual Trace ID Injection for Raw Formatted Logs**

To ensure proper log correlation, verify the following is present in each log entry:

- `dd.trace_id=<TRACE_ID>`: Where `<TRACE_ID>` is equal to `tracer.scopeManager().active().span().context().toTraceId()` or `0` if no trace is active during logging.
- `dd.span_id=<SPAN_ID>`: Where `<SPAN_ID>` is equal to `tracer.scopeManager().active().span().context().toSpanId()` or `0` if no trace is active during logging.

You should append or prepend these 2 strings directly to the message part of the log entry. This allows you to correlate trace and logs without having to alter your parsing rules.

Example using `console` as the underlying logger:

```javascript
const tracer = require('dd-trace').init()

class Logger {
  log (level, message) {
    const scope = tracer.scopeManager().active()
    const time = (new Date()).toISOString()
    const format = '[%s] [%s] - dd.trace_id=%s dd.span_id=%s %s'

    let traceId = 0
    let spanId = 0

    if (scope && scope.span()) {
      const context = scope.span().context()

      traceId = context.toTraceId()
      spanId = context.toSpanId()
    }

    console.log(format, time, level.toUpperCase(), traceId, spanId, message)
  }
}

module.exports = Logger
```

**Note**: If you are not using a [Datadog Log Integration][1] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][2].


[1]: https://docs.datadoghq.com/logs/log_collection/nodejs
[2]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab ".NET" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
{{% /tab %}}
{{% tab "PHP" %}}

Use the following example to inject PHP trace information into your logs.

**Manual Trace ID Injection**

```php
$span = \DDTrace\GlobalTracer::get()->getActiveSpan();
$append = sprintf(
    ' [dd.trace_id=%d dd.span_id=%d]',
    $span->getTraceId(),
    $span->getSpanId()
);
my_error_logger('Error message.' . $append);
```

If the logger implements the [**monolog/monolog** library][1], use `Logger::pushProcessor()` to automatically append the identifiers to all the log messages:

```php
$logger->pushProcessor(function ($record) {
    $span = \DDTrace\GlobalTracer::get()->getActiveSpan();
    if (null === $span) {
        return $record;
    }
    $record['message'] .= sprintf(
        ' [dd.trace_id=%d dd.span_id=%d]',
        $span->getTraceId(),
        $span->getSpanId()
    );
    return $record;
});
```

**Note**: If you are not using a [Datadog Log Integration][2] to parse your logs, custom log parsing rules need to ensure that `trace_id` and `span_id` are being parsed as a string. More information can be found in the [FAQ on this topic][3].

[1]: https://github.com/Seldaek/monolog
[2]: https://docs.datadoghq.com/logs/log_collection/php
[3]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{< /tabs >}}

## Debugging

Datadog debug settings are used to diagnose issues or audit trace data.

We discourage enabling debug mode on your production systems as it increases the number of events that are sent to your loggers. Use sparingly for debugging purposes only.

{{< tabs >}}
{{% tab "Java" %}}

To return debug level application logs, enable debug mode with the flag `-Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug` when starting the JVM.

{{% /tab %}}
{{% tab "Python" %}}

Debugging is disabled by default.

To enable it set the environment variable `DATADOG_TRACE_DEBUG=true` when using `ddtrace-run`.
{{% /tab %}}
{{% tab "Ruby" %}}

Debug mode is disabled by default. To enable:

```ruby
Datadog.configure do |c|
  c.tracer debug: true
end
```

**Application Logs**:

By default, all logs are processed by the default Ruby logger. When using Rails, you should see the messages in your application log file.

Datadog client log messages are marked with `[ddtrace]`, so you can isolate them from other messages.

Additionally, it is possible to override the default logger and replace it with a custom one. This is done using the ``log`` attribute of the tracer.

```ruby
f = File.new("<FILENAME>.log", "w+")           # Log messages should go there
Datadog.configure do |c|
  c.tracer log: Logger.new(f)                 # Overriding the default tracer
end

Datadog::Tracer.log.info { "this is typically called by tracing code" }
```

See [the API documentation][1] for more details.


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#custom-logging
{{% /tab %}}
{{% tab "Go" %}}

Debug mode on the tracer can be enabled as a `Start` config, resulting in more verbose logging:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithDebugMode(true))
    defer tracer.Stop()
}
```

{{% /tab %}}

{{% tab "Node.js" %}}

Debug mode is disabled by default, to enable it:

```javascript
const tracer = require('dd-trace').init({
  debug: true
})
```

**Application Logs**:

By default, logging from this library is disabled. In order to get debbuging information and errors sent to logs, the `debug` options should be set to `true` in the [init()][1] method.


The tracer will then log debug information to `console.log()` and errors to `console.error()`. This behavior can be changed by passing a custom logger to the tracer. The logger should contain `debug()` and `error()` methods that can handle messages and errors, respectively.

For example:

```javascript
const bunyan = require('bunyan')
const logger = bunyan.createLogger({
  name: 'dd-trace',
  level: 'trace'
})

const tracer = require('dd-trace').init({
  logger: {
    debug: message => logger.trace(message),
    error: err => logger.error(err)
  },
  debug: true
})
```

For more tracer settings, check out the [API documentation][2].


[1]: https://datadog.github.io/dd-trace-js/Tracer.html#init
[2]: https://datadog.github.io/dd-trace-js/#tracer-settings
{{% /tab %}}
{{% tab ".NET" %}}

Debug mode is disabled by default. To enable it, set the `isDebugEnabled` argument to `true` when creating a new tracer instance:

```csharp
var tracer = Datadog.Trace.Tracer.Create(isDebugEnabled: true);
```

{{% /tab %}}
{{% tab "PHP" %}}

Debug mode is disabled by default. To enable it, set the environment variable `DD_TRACE_DEBUG=true`. See the PHP [configuration docs][1] for details about how and when this environment variable value should be set in order
to be properly handled by the tracer.

In order to tell PHP where it should put `error_log` messages, you can either set it at the server level, or as a PHP `ini` parameter, which is the standard way to configure PHP behavior.

If you are using an Apache server, use the `ErrorLog` directive.
If you are using an NGINX server, use the `error_log` directive.
If you are configuring instead at the PHP level, use PHP's `error_log` ini parameter.

[1]: http://php.net/manual/en/install.php
[2]: https://www.php-fig.org/psr/psr-3
{{% /tab %}}
{{% tab "C++" %}}

The release binary libraries are all compiled with debug symbols added to the optimized release. It is possible to use gdb or lldb to debug the library and to read core dumps. If you are building the library from source, pass the argument `-DCMAKE_BUILD_TYPE=RelWithDebInfo` to cmake to compile an optimized build with debug symbols.

```bash
cd .build
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make
make install
```

{{% /tab %}}
{{< /tabs >}}

## Security

Sensitive information within your traces can be scrubbed [automatically](#automatic-scrubbing) or [manually](#replace-rules).

#### Automatic scrubbing

Automatic scrubbing is available for some services, such as ElasticSearch, MongoDB, Redis, Memcached, and HTTP server and client request URLs. Below is an example configuration snippet documenting all the available options.

```yaml
apm_config:
  # Defines obfuscation rules for sensitive data. Disabled by default.
  obfuscation:
    # ElasticSearch obfuscation rules. Applies to spans of type "elasticsearch".
    # More specifically, to the "elasticsearch.body" tag.
    elasticsearch:
      enabled: true
      # Values for the keys listed here will not be obfuscated.
      keep_values:
        - client_id
        - product_id

    # MongoDB obfuscation rules. Applies to spans of type "mongodb".
    # More specifically, to the "mongodb.query" tag.
    mongodb:
      enabled: true
      # Values for the keys listed here will not be obfuscated.
      keep_values:
        - document_id
        - template_id

    # HTTP obfuscation rules for "http.url" tags in spans of type "http".
    http:
      # If true, query strings in URLs will be obfuscated.
      remove_query_string: true
      # If true, path segments in URLs containing digits will be replaced by "?"
      remove_paths_with_digits: true

    # When enabled, stack traces will be removed (replaced by "?").
    remove_stack_traces: true

    # Obfuscation rules for spans of type "redis". Applies to the "redis.raw_command" tags.
    redis:
      enabled: true

    # Obfuscation rules for spans of type "memcached". Applies to the "memcached.command" tag.
    memcached:
      enabled: true
```

#### Replace rules

To scrub sensitive data from your span's tags, use the `replace_tags` setting. It is a list containing one or more groups of parameters that describe how to perform replacements of sensitive data within your tags. These parameters are:

* `name`: The key of the tag to replace. To match all tags, use `*`. To match the resource, use `resource.name`.
* `pattern`: The regexp pattern to match against.
* `repl`: The replacement string.

For example:

```yaml
apm_config:
  replace_tags:
    # Replace all numbers following the `token/` string in the tag "http.url" with "?":
    - name: "http.url"
      pattern: "token/(.*)"
      repl: "?"
    # Replace all the occurrences of "foo" in any tag with "bar":
    - name: "*"
      pattern: "foo"
      repl: "bar"
    # Remove all "error.stack" tag's value.
    - name: "error.stack"
      pattern: "(?s).*"
```

[1]: /tagging
[2]: /tracing/visualization/services_list
[3]: http://opentracing.io
[4]: #priority-sampling
[5]: /tracing/getting_further/trace_sampling_and_storage
[6]: /logs/log_collection/?tab=tailexistingfiles#send-your-application-logs-in-json
[7]: /logs/log_collection/?tab=tailexistingfiles#enabling-log-collection-from-integrations

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

Our integrations make use of the `Context` type to propagate the current active span. If you want to add a tag to a span attached to a `Context` via automatic instrumentation, call the `SpanFromContext` function:

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

Not supported with automatic instrumentation.

Manual instrumentations of the tracer can set an associative array of global tags via the `global_tags` configuration key.

```php
$config = [
    'global_tags' => [
        '<TAG_KEY>' => '<TAG_VALUE>',
    ]
];
$tracer = new \DDTrace\Tracer(null, null, $config);
\DDTrace\GlobalTracer::set($tracer);
```

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

If you aren’t using a [framework supported by automatic instrumentation][1], manually instrument your code.

First install the PHP tracer dependency with Composer:

```bash
$ composer require datadog/dd-trace
```

Then use the PHP tracer bootstrap to initialize the global tracer and create a root span to start the trace:

```php
// The existing Composer autoloader
require __DIR__ . '/../vendor/autoload.php';

// Add the PHP tracer bootstrap
require __DIR__ . '/../vendor/datadog/dd-trace/bridge/dd_init.php';

$span = \DDTrace\GlobalTracer::get()
    ->startRootSpan('web.request')
    ->getSpan();
$span->setResource($_SERVER['REQUEST_URI']);
$span->setTag(\DDTrace\Tag::SPAN_TYPE, \DDTrace\Type::WEB_SERVLET);
$span->setTag(\DDTrace\Tag::HTTP_METHOD, $_SERVER['REQUEST_METHOD']);

// Run the app here...
```

The root span an be accessed later on directly from the global tracer via `Tracer::getRootScope()`. This is useful in contexts where the metadata to be added to the root span does not exist in early script execution.

```php
$rootSpan = \DDTrace\GlobalTracer::get()
    ->getRootScope()
    ->getSpan();
$rootSpan->setTag(\DDTrace\Tag::HTTP_STATUS_CODE, 200);
```


[1]: /tracing/languages/php/#framework-compatibility
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

## Distributed Tracing

Distributed tracing allows you to propagate a single trace across multiple services and hosts, so you can see performance end-to-end. Linking is implemented by injecting Datadog Metadata into the request headers.

Distributed tracing headers are language agnostic. A trace started in one language may propagate to another (for example, from Python to Java).

Distributed traces may sample inconsistently when the linked traces run on different hosts. To ensure that distributed traces are complete, enable [priority sampling][4].


{{< tabs >}}
{{% tab "Java" %}}

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

{{% /tab %}}
{{% tab "Python" %}}

Distributed tracing is disabled by default. Refer to the configuration documentation for each framework to enable it.

Distributed tracing is supported in the following frameworks: 

| Framework/Library | API Documentation                                                   |
| ----------------- | :------------------------------------------------------------------ |
| aiohttp           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp  |
| bottle            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle   |
| django            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django   |
| falcon            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon   |
| flask             | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask    |
| pylons            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons   |
| pyramid           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid  |
| requests          | http://pypi.datadoghq.com/trace/docs/web_integrations.html#requests |
| tornado           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado  |

To add your own distributed tracing check the [Datadog API documentation][1].


[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#http-client
{{% /tab %}}
{{% tab "Ruby" %}} 

Distributed tracing is disabled by default. Refer to the configuration documentation for each framework to enable it.

Distributed tracing is supported in the following frameworks:

| Framework/Library | API Documentation                                                                    |
| ----------------- | :----------------------------------------------------------------------------------- |
| Excon             | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#excon      |
| Faraday           | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#faraday    |
| Net/HTTP          | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#nethttp    |
| Rack              | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rack       |
| Rails             | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rails      |
| Rest Client       | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#restclient |
| Sinatra           | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sinatra    |

For more details about how to activate and configure distributed tracing, see the [API documentation][1].


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#distributed-tracing
{{% /tab %}}
{{% tab "Go" %}}

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

{{% /tab %}}
{{% tab "Node.js" %}}

Distributed tracing is enabled by default for all supported integrations (see [Compatibility][1]).


[1]: /tracing/languages/nodejs/#compatibility
{{% /tab %}}
{{% tab ".NET" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
{{% /tab %}}
{{% tab "PHP" %}}

Distributed tracing is enabled by default. 

{{% /tab %}}
{{% tab "C++" %}}

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

## Priority Sampling

Priority sampling allows traces between two Datadog endpoints to be sampled together. This prevents trace sampling from removing segments of a distributed trace (i.e. ensures completeness). Additionally, APM traces expose sampling flags to configure how specific traces are sampled.

Priority sampling automatically assigns and propagates a priority value along all traces, depending on their service and volume. Priorities can also be set manually to drop non-interesting traces or keep important ones.

For a more detailed explanations of sampling and priority sampling, check the [sampling and storage][5] documentation. 


{{< tabs >}}
{{% tab "Java" %}}

Priority sampling is enabled by default. To disable it, configure the `priority.sampling` flag to `false` ([see how to configure the java client][1]).


Current Priority Values (more may be added in the future):

| Sampling Value | Effect                                                                                                     |
| -------------- | :--------------------------------------------------------------------------------------------------------- |
| `SAMPLER_DROP` | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| `SAMPLER_KEEP` | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| `USER_DROP`    | The user asked to not keep the trace. The Agent will drop it.                                              |
| `USER_KEEP`    | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |

Manually set trace priority:

```java
import datadog.trace.api.Trace;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.common.sampling.PrioritySampling;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();
        // ask the sampler to keep the current trace
        ddspan.setSamplingPriority(PrioritySampling.USER_KEEP);
        // method impl follows
    }
}
```

[1]: /tracing/languages/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

Priority sampling is disabled by default. To enable it, configure the `priority_sampling` flag using the `tracer.configure` method:

```python
tracer.configure(priority_sampling=True)
```

To set a custom priority to a trace:

```python
from ddtrace.ext.priority import USER_REJECT, USER_KEEP

span = tracer.current_span()

# indicate to not keep the trace
span.context.sampling_priority = USER_REJECT
```

The following priorities can be used.

| Sampling Value | Effect                                                                                                     |
| -------------- | :--------------------------------------------------------------------------------------------------------- |
| AUTO_REJECT    | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| AUTO_KEEP      | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| USER_REJECT    | The user asked to not keep the trace. The Agent will drop it.                                              |
| USER_KEEP      | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |

{{% /tab %}}
{{% tab "Ruby" %}}

Priority sampling is disabled by default. Enabling it ensures that your sampled distributed traces will be complete. To enable the priority sampling:

```ruby
Datadog.configure do |c|
  c.tracer priority_sampling: true
end
```

Once enabled, the sampler automatically assigns a value of `AUTO_REJECT` or `AUTO_KEEP` to traces, depending on their service and volume.

You can also set this priority manually to either drop a non-interesting trace or to keep an important one. For that, set the `Context#sampling_priority` to:

```ruby
# To reject the trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_REJECT

# To keep the trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_KEEP
```

Possible values for the sampling priority tag are:

| Sampling Value                        | Effect                                                                                                     |
| ------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `Datadog::Ext::Priority::AUTO_REJECT` | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| `Datadog::Ext::Priority::AUTO_KEEP`   | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| `Datadog::Ext::Priority::USER_REJECT` | The user asked to not keep the trace. The Agent will drop it.                                              |
| `Datadog::Ext::Priority::USER_KEEP`   | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |

When not using [distributed tracing](#distributed-tracing), you may change the priority at any time, as long as the trace is not finished yet. However, it must be done before any context propagation (e.g. fork, RPC calls) to be effective in a distributed context. Changing the priority after such context has been propagated causes different parts of a distributed trace to use different priorities. Some parts might be kept, some parts might be rejected, and consequently this can cause the trace to be partially stored and remain incomplete.

It is recommended that changing priority be done as soon as possible, when the root span has just been created.

See the [API documentation][1] for more details.


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#priority-sampling
{{% /tab %}}
{{% tab "Go" %}}

For more details about how to use and configure distributed tracing, check out the [godoc page][1].

Set the sampling priority of a trace by adding the `sampling.priority` tag to its root span. This is then propagated throughout the entire stack. For example:

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

    // Set priority sampling as a regular tag
    span.SetTag(ext.SamplingPriority, ext.PriorityUserKeep)
}
```

Possible values for the sampling priority tag are:

| Sampling Value         | Effect                                                                                                     |
| ---------------------- | :--------------------------------------------------------------------------------------------------------- |
| ext.PriorityAutoReject | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| ext.PriorityAutoKeep   | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| ext.PriorityUserReject | The user asked to not keep the trace. The Agent will drop it.                                              |
| ext.PriorityUserKeep   | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |


[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
{{% /tab %}}
{{% tab "Node.js" %}}

Priority sampling is enabled by default. The sampler automatically assigns a value of `AUTO_REJECT` or `AUTO_KEEP` to traces, depending on their service and volume.

Set this priority manually to either drop a non-interesting trace or to keep an important one with the `sampling.priority` tag:

```javascript
const priority = require('dd-trace/ext/priority')

// To reject the trace
span.setTag('sampling.priority', priority.USER_REJECT)

// To keep the trace
span.setTag('sampling.priority', priority.USER_KEEP)
```

Possible values for the sampling priority tag are:

| Sampling Value | Effect                                                                                                     |
| -------------- | :--------------------------------------------------------------------------------------------------------- |
| `AUTO_REJECT`  | The sampler automatically decided to not keep the trace. The Agent will drop it.                           |
| `AUTO_KEEP`    | The sampler automatically decided to keep the trace. The Agent will keep it. Might be sampled server-side. |
| `USER_REJECT`  | The user asked to not keep the trace. The Agent will drop it.                                              |
| `USER_KEEP`    | The user asked to keep the trace. The Agent will keep it. The server will keep it too.                     |

Once the sampling priority has been set, it cannot be changed. This is done automatically whenever a span is finished or the trace is propagated. Setting it manually should thus be done before either occur.

{{% /tab %}}
{{% tab ".NET" %}}

Coming Soon. Reach out to [the Datadog support team][1] to be part of the beta.

[1]: /help
{{% /tab %}}
{{% tab "PHP" %}}

Priority sampling is enabled by default. 

{{% /tab %}}
{{% tab "C++" %}}

Priority sampling is enabled by default, and can be disabled in the TracerOptions. You can mark a span to be kept or discarded by setting the tag `sampling.priority`. A value of `0` means reject/don't sample. Any value greater than 0 means keep/sample.

```cpp
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
span->SetTag("sampling.priority", 1); // Keep this span.
auto another_span = tracer->StartSpan("operation_name");
another_span->SetTag("sampling.priority", 0); // Discard this span.
```

{{% /tab %}}
{{< /tabs >}}

## Logging

For each generated trace, there are very likely log events written by the monitored functions and applications. 
The purpose of this section is to explain how the correlation between traces and logs can be improved by automatically adding  a trace id in your logs and then use it in the Datadog platform to show you the exact logs correlated to the observed trace.

{{< img src="tracing/logs_in_trace.png" alt="Logs in Traces" responsive="true" style="width:70%;">}}

{{< tabs >}}
{{% tab "Java" %}}

Leverage the MDC Frameworks ([Map Diagnostic Context][1]) to automatically correlate trace and span IDs into your logs. Datadog MDC keys may be injected automatically with a tracer integration, or manually injected with the Datadog API.

There are three possible implementations depending on the logging configuration:

1. Automatically inject trace IDs in JSON formatted logs
2. Automatically inject trace IDs in raw formatted logs
3. Manually inject trace IDs

**1. Automatic Trace IDs Injection for JSON Formatted Logs**

Enable injection in the [Java Tracer's configuration][2] via the `dd.logs.injection` parameter.

**Note**: Currently only **slf4j** is supported for MDC autoinjection.

**2. Automatic Trace IDs Injection for Raw Formatted Logs**

Enable injection in the [Java Tracer's configuration][2]. 

**Note**: Currently only **slf4j** is supported for MDC auto-injection.

If the logs are already JSON formatted, there should be nothing left to do. 
2. Update your formatter to include `dd.trace_id` and `dd.span_id` in your logger configuration:

```
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

**3. Manual Trace IDs Injection**

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

[See our Java logging documentation][3] for more details about specific logger implementation or to learn how to log in JSON.

[1]: https://logback.qos.ch/manual/mdc.html
[2]: https://docs.datadoghq.com/tracing/languages/java/#configuration
[3]: https://docs.datadoghq.com/logs/log_collection/java/?tab=log4j#raw-format
{{% /tab %}}
{{% tab "Python" %}}

Use one the two following options to inject Python trace information into your logs:

**1. Automatic Trace IDs Injection**

Set the environment variable `DD_LOGS_INJECTION=true` when using `ddtrace-run`.

**2. Manual Trace IDs Injection**

Patch your `logging` module by updating your log formatter to include the ``dd.trace_id`` and ``dd.span_id`` attributes from the log record.

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

[See our Python logging documentation][1] to ensure that the Python Log Integration is properly configured so that your Python logs are automatically parsed.


[1]: https://docs.datadoghq.com/logs/log_collection/python/#configure-the-datadog-agent
{{% /tab %}}
{{% tab "Ruby" %}}

Use one the two following options to inject Ruby trace information into your logs:

**1. Enable Trace IDs Injection for Rails Applications**

Rails applications which are configured with a `ActiveSupport::TaggedLogging` logger can append correlation IDs as tags to log output. The default Rails logger implements this tagged logging, making it easier to add correlation tags.

In your Rails environment configuration file, add the following:

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end
```

The logs are generated in a format that is supported by default in the Ruby log Integration:

```
# Web requests will produce:
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```

**2. Manual Trace IDs Injection for Ruby Applications**

Use `Datadog.tracer.active_correlation` method to inject trace identifiers in the log format:

- `dd.trace_id`:  Active Trace ID during the log statement (or 0 if no trace)
- `dd.span_id`: Active Span ID during the log statement (or 0 if no trace)
 
By default, `Datadog.tracer.active_correlation` returns `dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>`.
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

[See our Ruby logging documentation][1] to ensure that the Ruby log integration is properly configured and your ruby logs automatically parsed.

[1]: https://docs.datadoghq.com/logs/log_collection/ruby/#configure-the-datadog-agent
{{% /tab %}}
{{% tab "Go" %}}
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
}
```

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

The following example injects the required `dd.trace_id` and `dd.span_id` identifiers into the log message to associate the log entry with the current trace.

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


[1]: https://github.com/Seldaek/monolog
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

Debug mode is disabled by default. To enable it, set the environment variable `DD_TRACE_DEBUG=true`.

```php
putenv('DD_TRACE_DEBUG=true');
```

**Application Logs**:

By default, logging from the PHP tracer is disabled. In order to get debugging information and errors sent to logs, set a [PSR-3 logger][1] singleton.

```php
\DDTrace\Log\Logger::set(
    new \DDTrace\Log\PsrLogger($logger)
);
```


[1]: https://www.php-fig.org/psr/psr-3
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

---
title: Manual Tracing
kind: documentation
---

// ...

{{< tabs >}}
{{% tab "Java" %}}
## Java

Before instrumenting your application, review Datadog’s [APM Terminology][apm terminology] and familiarize yourself with the core concepts of Datadog APM. If you aren't using a [supported framework instrumentation][java framework], or you would like additional depth in your application’s traces, you may want to to manually instrument your code.

Do this either using the Trace annotation for simple method call tracing or with the [OpenTracing API][opentracing] for complex tracing.

[opentracing]: /tracing/setup_advanced/open_tracing
[java framework]: /tracing/setup_basic/java/#integrations
[apm terminology]: /tracing/visualization/services_list/

{{% /tab %}}
{{% tab "Python" %}}
{{% /tab %}}
{{% tab "Ruby" %}}
## Ruby

If you aren't using supported library instrumentation (see [Library compatibility][ruby lib comptability], you may want to to manually instrument your code. Adding tracing to your code is easy using the `Datadog.tracer.trace` method, which you can wrap around any Ruby code.

```ruby
get '/posts' do
  Datadog.tracer.trace('web.request', service: 'my-blog', resource: 'GET /posts') do |span|
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

For more details about manual instrumentation, check out the [API documentation][ruby api doc].

[ruby api doc]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#manual-instrumentation
[ruby lib comptability]: /tracing/setup_basic/ruby/#library-compatibility

{{% /tab %}}
{{% tab "Go" %}}
## Go

To make use of manual instrumentation, use the `tracer` package which is documented on our [godoc page][tracer godoc]. One simple example would be:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    // Start the tracer with zero or more options.
    tracer.Start(tracer.WithServiceName("my-service"))
    defer tracer.Stop()

    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Set metadata
    span.SetTag("my_tag", "my_value")
}
```

[tracer godoc]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer

{{% /tab %}}
{{% tab "Node.js" %}}
## NodeJS

If you aren’t using supported library instrumentation (see [Compatibility][nodejs compatibility]), you may want to manually instrument your code.

The following example initializes a Datadog Tracer and creates a Span called `web.request`:

```javascript
const tracer = require('dd-trace').init()
const span = tracer.startSpan('web.request')

span.setTag('http.url', '/login')
span.finish()
```

For more information on manual instrumentation, check out the [API documentation][nodejs api doc].

[nodejs api doc]: https://datadog.github.io/dd-trace-js/#manual-instrumentation
[nodejs compatibility]: /tracing/setup_basic/nodejs/#compatibility

{{% /tab %}}
{{< /tabs >}}

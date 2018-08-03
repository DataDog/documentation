---
title: Custom Tracing
kind: documentation
---


## Java

Tags are key-value pairs attached to spans. All tags share a single namespace.

The Datadog UI uses specific tags to set UI properties, such as an application's service name. A full list of these tags can be found in the [Datadog][11] and [OpenTracing][12] APIs.

### Custom Tags

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
      tracer.activeSpan().setTag("org.id", 12345);
      tracer.activeSpan().setTag("http.url", "/login");
    }
    // servlet impl
  }
}
```


[11]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/DDTags.java
[12]: https://github.com/opentracing/opentracing-java/blob/master/opentracing-api/src/main/java/io/opentracing/tag/Tags.java
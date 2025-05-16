---
title: Lambda Web Adapter (Preview)
---

[Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter) is a technology that allows you to run web applications on AWS Lambda. Datadog offers support for Lambda Web Adapter for NodeJs and Python runtimes, allowing you to monitor your web applications running on AWS Lambda.

# How to integrate Datadog

From the web application perspective, running in Lambda Web Adapter is similar to running in a web server. But the Datadog instrumentation has to be configured specifically for this setup, depending on whether the application is being deployed using a container or a zip file.
In any case, the following steps are required:

1. Adding the Lambda Web Adapter and Datadog extension
2. Setting the required Datadog environment variables
3. Ignore tracing for the readiness endpoint\*

This last step is required only when using Datadog tracing

## Container deployment

A full example is on [Github](https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog)

1. Adding the Lambda Web Adapter and Datadog extension. Make sure to use 77 or later for Datadog and 0.9.1 or later for Lambda Web Adapter.

```Dockerfile
COPY --from=public.ecr.aws/datadog/lambda-extension:77 /opt/. /opt/
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter
```

2. Setting the required Datadog environment variables. Since there is no explicit shutdown system for Lambda, traces must be flushed as soon as possible so they are not lost when the Lambda runtime environment is "frozen". Furthermore, the transparent tracing requires the Datadog extension to proxy requests before the Lambda Web Adapter, so the `AWS_LWA_LAMBDA_RUNTIME_API_PROXY` must be set to allow that. The port can be set with any available port

```bash
DD_TRACE_PARTIAL_FLUSH_MIN_SPANS=1
DD_TRACE_PARTIAL_FLUSH_ENABLED=false

AWS_LWA_LAMBDA_RUNTIME_API_PROXY=127.0.0.1:9002

DD_API_KEY=$YOUR_API_KEY
DD_SERVICE=$YOUR_SERVICE_NAME
```

3. Ignore tracing for the readiness endpoint. Since the Lambda Web Adapter is sending readiness check requests once it is loaded, the Datadog extension should not link them to the request that triggered the Lambda function. This can be done in different ways depending on the runtime. Assuming the readiness endpoint is the default (`GET` at `/`):

{{< tabs >}}
{{% tab "NodeJs" %}}

```js
const tracer = require('dd-trace').init();
tracer.use('http', {
    blocklist: ['/']
});
```

{{% /tab %}}
{{% tab "Python" %}}

```python
import ddtrace

ddtrace.patch_all()
from ddtrace.trace import tracer, TraceFilter
...
class IgnoreEndpointFilter(TraceFilter):
    def __init__(self, pattern, method):
        self.pattern = re.compile(pattern)
        self.method = method

    def process_trace(self, trace):
        for span in trace:
            url = span.get_tag("http.url")
            if (
                url is not None
                and self.pattern.match(url)
                and self.method == span.get_tag("http.method")
            ):
                return None
        return trace


tracer.configure(
    trace_processors=[IgnoreEndpointFilter(r"http://127.0.0.1:8080/", "GET")]
)

```

{{% /tab %}}
{{< /tabs >}}

## Zip deployment

A full example is on [Github](https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog)

1. Adding the Lambda Web Adapter and Datadog extension. Make sure to use 77 or later for Datadog and 25 or later for Lambda Web Adapter.

```
arn:aws:lambda:${AWS::Region}:464622532012:layer:Datadog-Extension:77
arn:aws:lambda:${AWS::Region}:753240598075:layer:LambdaAdapterLayerX86:25
```

for x86 and

```
arn:aws:lambda:${AWS::Region}:464622532012:layer:Datadog-Extension-ARM:77
arn:aws:lambda:${AWS::Region}:753240598075:layer:LambdaAdapterLayerArm64:25
```

for ARM

2. Setting the required Datadog environment variables. Since there is no explicit shutdown system for Lambda, traces must be flushed as soon as possible so that their are not lost when the Lambda runtime environment is "frozen". Furthermore, the transparent tracing requires the Datadog extension to proxy requests before the Lambda Web Adapter, so the `AWS_LWA_LAMBDA_RUNTIME_API_PROXY` must be set to allow that. The port can be set with any available port

```bash
DD_TRACE_PARTIAL_FLUSH_MIN_SPANS=1
DD_TRACE_PARTIAL_FLUSH_ENABLED=false

AWS_LWA_LAMBDA_RUNTIME_API_PROXY=127.0.0.1:9002

AWS_LAMBDA_EXEC_WRAPPER=/opt/bootstrap

DD_API_KEY=$YOUR_API_KEY
DD_SERVICE=$YOUR_SERVICE_NAME
```

3. Ignore tracing for the readiness endpoint. Since the Lambda Web Adapter is sending readiness check requests once it is loaded, the Datadog extension should not link them to the request that triggered the Lambda function. This can be done in different ways depending on the runtime. Assuming the readiness endpoint is the default (`GET` at `/`):

{{< tabs >}}
{{% tab "NodeJs" %}}

```js
const tracer = require('dd-trace').init();
tracer.use('http', {
    blocklist: ['/']
});
```

{{% /tab %}}
{{% tab "Python" %}}

```python
import ddtrace

ddtrace.patch_all()
from ddtrace.trace import tracer, TraceFilter
...
class IgnoreEndpointFilter(TraceFilter):
    def __init__(self, pattern, method):
        self.pattern = re.compile(pattern)
        self.method = method

    def process_trace(self, trace):
        for span in trace:
            url = span.get_tag("http.url")
            if (
                url is not None
                and self.pattern.match(url)
                and self.method == span.get_tag("http.method")
            ):
                return None
        return trace


tracer.configure(
    trace_processors=[IgnoreEndpointFilter(r"http://127.0.0.1:8080/", "GET")]
)

```

{{% /tab %}}
{{< /tabs >}}

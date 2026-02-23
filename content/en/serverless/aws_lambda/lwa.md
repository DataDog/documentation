---
title: Lambda Web Adapter
further_reading:
    - link: '/serverless/configuration/'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring'
    - link: "/integrations/amazon_lambda/"
      tag: "Documentation"
      text: "AWS Lambda Integration"
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Lambda Web Adapter is in Preview.
{{< /callout >}}

## Overview

The AWS [Lambda Web Adapter][1] is a framework that allows developers to run web applications on AWS Lambda. 

Datadog supports Lambda Web Adapter for Node.js and Python runtimes, therefore providing you a solution to monitoring your web applications running on AWS Lambda.

## How to integrate Datadog

The Lambda Web Adapter can run Lambda functions that are packaged as docker images or as Zip files. The following steps are required for instrumenting the Lambda Web Adapter with Datadog for both formats:

1. [Add the Lambda Web Adapter and Datadog extension](#1-add-the-lambda-web-adapter-and-datadog-extension)
2. [Set the required Datadog environment variables](#2-set-the-required-datadog-environment-variables)
3. [Ignore tracing for the readiness endpoint](#3-ignore-tracing-for-the-readiness-endpoint-required-only-when-using-datadog-tracing) (_*required only when using Datadog tracing_)

#### 1. Add the Lambda Web Adapter and Datadog extension

{{< tabs >}}
{{% tab "Container deployment" %}}
This configuration requires Datadog Lambda extension `v77+` and Lambda Web Adapter `v0.9.1+`. See a sample of the container deployment configuration on [Github][2].<br><br>

```Dockerfile
COPY --from=public.ecr.aws/datadog/lambda-extension:77 /opt/. /opt/
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter
```

[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
{{% /tab %}}

{{% tab "Zip deployment" %}}
This requires Datadog Lambda extension `v77+` and `v25+` or later for Lambda Web Adapter. See a sample of the Zip deployment configuration on [Github][3]. 


**for x86**

```shell
arn:aws:lambda:${AWS::Region}:464622532012:layer:Datadog-Extension:77
arn:aws:lambda:${AWS::Region}:753240598075:layer:LambdaAdapterLayerX86:25
```

**for ARM**
```shell
arn:aws:lambda:${AWS::Region}:464622532012:layer:Datadog-Extension-ARM:77
arn:aws:lambda:${AWS::Region}:753240598075:layer:LambdaAdapterLayerArm64:25
```
[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
{{% /tab %}}
{{< /tabs >}}

#### 2. Set the required Datadog environment variables
{{< tabs >}}
{{% tab "Container deployment" %}}

Since there is no explicit shutdown system for Lambda, traces must be flushed as soon as possible so they are not lost when the Lambda runtime environment is "frozen". 

The transparent tracing requires the Datadog extension to also proxy requests before the Lambda Web Adapter, so the `AWS_LWA_LAMBDA_RUNTIME_API_PROXY` must be set to allow that. The port can be set with any available port.

```bash
DD_TRACE_PARTIAL_FLUSH_MIN_SPANS=1
DD_TRACE_PARTIAL_FLUSH_ENABLED=false

AWS_LWA_LAMBDA_RUNTIME_API_PROXY=127.0.0.1:9002

DD_API_KEY=$YOUR_API_KEY
DD_SERVICE=$YOUR_SERVICE_NAME
```

[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
{{% /tab %}}
 
{{% tab "Zip deployment" %}}

Since there is no explicit shutdown system for Lambda, traces must be flushed as soon as possible so they are not lost when the Lambda runtime environment is "frozen". 

The transparent tracing requires the Datadog extension to also proxy requests before the Lambda Web Adapter, so the `AWS_LWA_LAMBDA_RUNTIME_API_PROXY` must be set to allow that. The port can be set with any available port.

```bash
DD_TRACE_PARTIAL_FLUSH_MIN_SPANS=1
DD_TRACE_PARTIAL_FLUSH_ENABLED=false

AWS_LWA_LAMBDA_RUNTIME_API_PROXY=127.0.0.1:9002

AWS_LAMBDA_EXEC_WRAPPER=/opt/bootstrap

DD_API_KEY=$YOUR_API_KEY
DD_SERVICE=$YOUR_SERVICE_NAME
```
[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
 {{% /tab %}}
{{< /tabs >}}

#### 3. Ignore tracing for the readiness endpoint
\*_This step is required only when using Datadog tracing_.
{{< tabs >}}
{{% tab "Container deployment" %}}

Since the Lambda Web Adapter sends readiness check requests once it is loaded, the Datadog extension must not link them to the request that triggered the Lambda function. 

The configuration differs depending on the runtime. Assuming the readiness endpoint is the default (`GET` at `/`):

**Node.js**

```js
const tracer = require('dd-trace').init();
tracer.use('http', {
    blocklist: ['/']
});
 ```

**Python**

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
[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
 {{% /tab %}}

{{% tab "Zip deployment" %}}

Since the Lambda Web Adapter sends readiness check requests once it is loaded, the Datadog extension must not link them to the request that triggered the Lambda function. 

The configuration differs depending on the runtime. Assuming the readiness endpoint is the default (`GET` at `/`):

**NodeJs**

```js
const tracer = require('dd-trace').init();
tracer.use('http', {
    blocklist: ['/']
});
```

**Python**

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
[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
 {{% /tab %}}
{{< /tabs >}}



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/awslabs/aws-lambda-web-adapter
[2]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
[3]: https://github.com/awslabs/aws-lambda-web-adapter/tree/main/examples/datadog
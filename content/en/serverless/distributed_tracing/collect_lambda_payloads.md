---
title: Collect AWS Lambda Payloads
kind: documentation
description: 'Resolve AWS Lambda function failures faster by monitoring invocation payloads'
further_reading:
    - link: 'serverless'
      text: 'Serverless Monitoring with Datadog'
    - link: 'https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/'
      text: 'Resolve AWS Lambda function failures faster by monitoring invocation payloads'
      tag: 'Blog'
---

{{< img src="serverless/serverless_collect_lambda_payloads.png" alt="Collect AWS Lambda Payloads"  style="width:100%;" >}}

## Overview

You can use Datadog to collect and visualize the JSON request and response payloads of AWS Lambda functions, giving you [deeper insight into your serverless applications and helping troubleshoot Lambda function failures][6].

## Configuration

To instrument your Lambda functions for the first time, follow the [serverless installation instructions][1]. AWS Lambda payload ingestion requires [APM to be configured on your functions][4] and is available for the following Lambda runtimes:
- Python ([v49+][2])
- Node.js ([v64+][3])

Set the `DD_CAPTURE_LAMBDA_PAYLOAD` environment variable to `true` on each of your functions send Lambda request and response payloads to Datadog.

This functionality is also compatible with AWS X-Ray. Follow the steps in the [Datadog-AWS X-Ray integration][5] to enrich AWS Lambda function X-Ray segments with Datadog's Lambda Libraries.

## Obfuscating payload contents

To prevent any sensitive data within request or response JSON objects from being sent to Datadog (like account IDs or addresses), you can to scrub specific parameters from being sent to Datadog.

To do this, add a new file `datadog.yaml` in the same folder as your Lambda function code. Obfuscation of fields in the Lambda payload is then available through [the replace_tags block][7] within `apm_config` settings in `datadog.yaml`:

```yaml
apm_config:
  replace_tags:
    # Replace all the occurrences of "foobar" in any tag with "REDACTED":
    - name: "*"
      pattern: "foobar"
      repl: "REDACTED"
    # Remove all headers with key "auth" and replace with an empty string
    - name: "function.request.headers.auth"
      pattern: "(?s).*"
      repl: ""
    # Remove "apiToken" from any response payload, and replace with "****"
    - name: "function.response.apiToken"
      pattern: "(?s).*"
      repl: "****"
```

As an alternative, you can also populate the `DD_APM_REPLACE_TAGS` environment variable on your Lambda function to obfuscate specific fields:

```yaml
DD_APM_REPLACE_TAGS=[
      {
        "name": "*",
        "pattern": "foobar",
        "repl": "REDACTED"
      },
      {
        "name": "function.request.headers.auth",
        "pattern": "(?s).*",
        "repl": ""
      },
      {
        "name": "function.response.apiToken",
        "pattern": "(?s).*"
        "repl": "****"
      }
]
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/installation
[2]: https://github.com/DataDog/datadog-lambda-python/releases/tag/v49
[3]: https://github.com/DataDog/datadog-lambda-js/releases/tag/v4.64.0
[4]: /serverless/distributed_tracing
[5]: https://docs.datadoghq.com/integrations/amazon_xray/?tab=nodejs#enriching-xray-segments-with-datadog-libraries
[6]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads
[7]: /tracing/setup_overview/configure_data_security/?tab=mongodb#replace-rules-for-tag-filtering

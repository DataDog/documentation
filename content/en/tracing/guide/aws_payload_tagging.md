---
title: Capture Requests and Responses From AWS Services
further_reading:
  - link: '/tracing/'
    tag: 'Documentation'
    text: 'Learn about Datadog APM tracing'
  - link: '/tracing/glossary/'
    tag: 'Documentation'
    text: 'APM Terminology and Overview'
---

## Overview

AWS Payload Extraction captures request and response data exchanged between your application and AWS services. This feature attaches the extracted information as tags to your traces, enabling you to view the data in dashboards and use it for alerting.

## Requirements

The following tracer versions and AWS SDK packages are supported:

| Language | Version            | Instrumented AWS SDK Packages  |
|----------|--------------------|--------------------------------|
| Node.js  | 5.25.0+ or 4.49.0+ | `@aws-sdk/*` (AWS SDK v3)      |
| Java     | 1.42.1+            | `aws-sdk-v2`                   |
| Python   | 2.17.0+            | `botocore` (including `boto3`) |

## How it works

AWS Payload Extraction extracts key-value pairs from hierarchical request and response bodies, converting them into dot-separated tags. For example:

Input JSON:

```json
{  
  "Message": {  
    "foo.bar": "baz",  
    "Arr": ["a", "b"]  
  }  
}
```

Generated tags:

```text
aws.request.body.Message.foo\.bar: baz  
aws.request.body.Message.Arr.0: a  
aws.request.body.Message.Arr.1: b
```

The tracers are configured to match JSON data nested inside JSON documents, which is a common pattern with SQS payloads.

## General configuration

### Enable AWS Payload Extraction

To enable AWS Payload Extraction, set these environment variables:

```sh
# Parse requests
DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING=all

# Parse responses  
DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING=all
```

You can choose to parse:

- Only request bodies
- Only response bodies
- Both request and response bodies

The value `all` indicates that the entire body is used to generate tags. See [Protect sensitive information](#protect-sensitive-information) for more configuration options.

### Protect sensitive information

It's expected that many of these payloads contain *personally identifiable information* (PII).

To protect sensitive information, the tracers replace common PII fields with `'redacted'` (such as phone numbers in SNS). **Note**: You can't disable the default redactions.

You can specify additional fields to redact using [JSONPath][1] syntax in the environment variables. For example:

```sh
DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING=$.Metadata.UserId,$.Attributes.0.Pass
```

This example:
- Redacts the `UserId` field within the `Metadata` object
- Redacts the `Pass` field in the first element of the `Attributes` array
- Applies default redactions
- Processes request bodies only

<div class="alert alert-info">Redaction rules apply across all services and cannot be configured per service.</div>

### Control payload extraction depth

Control the maximum depth of payload extraction with:

```sh
DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH=10
```

The default value is `10`. Nodes beyond this depth are ignored during tag generation. The main reason to modify this value is to adjust performance.

### Disable AWS Payload Extraction

Setting these variables to an empty string or omitting them disables the feature:

```sh
DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING=""
DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING=""
```

## Language-specific configuration

Each tracer implementation provides additional configuration options specific to that language.

{{< programming-lang-wrapper langs="nodejs,python,java" >}}

{{< programming-lang lang="nodejs" >}}
### Supported services

The following services are supported by default:

- SNS
- SQS
- Kinesis
- S3
- EventBridge
- DynamoDB

<div class="alert alert-info">To request support for additional services, open a feature request with the <a href="/help/">Datadog Support</a> team.</div>

### Default redaction rules

The Node.js tracer applies redaction rules on a per-service basis. For example:
- The `$.Endpoint` field is redacted only for SNS service requests.
- Other tracers redact this field across all services.

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
### Supported services

The following services are supported by default:
- SNS
- SQS
- Kinesis
- S3
- EventBridge
- DynamoDB

#### Configure services

To enable tag extraction for additional services, use this environment variable:

```sh
# Default values
DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES=s3,sns,sqs,kinesis,eventbridge
```

Add services by appending to the comma-separated list. For example, to add support for AWS Amplify:

```sh
DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES=s3,sns,sqs,kinesis,eventbridge,dynamodb,amplify
```

<div class="alert alert-danger">
Added services do not include default redactions. Test your application in staging to identify and configure necessary redactions.
</div>

#### Service naming

Service names are case-sensitive and use lowercase. To find valid service names:
1. Visit the [Boto3 Available Services][1] page.
1. Click the service name you want to use.
1. Use the service name from the `boto3.client()` call.

### Configure the number of extracted tags

Control the maximum number of extracted tags with:

```sh
# Default value
DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS=758
```

<div class="alert alert-danger">
The default value (758) is the maximum the Datadog Agent can accept. Increasing this value is not recommended.
</div>

[1]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/index.html
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
### Supported services

The following services are supported:
- SNS
- SQS
- Kinesis
- S3
- EventBridge
- API Gateway



#### Configure services

To enable tag extraction for additional services, use this environment variable:

```sh
# Default values
DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES=ApiGateway,ApiGatewayV2,EventBridge,Sqs,Sns,S3,Kinesis
```

<div class="alert alert-danger">
Added services do not include default redactions. Test your application in staging to identify and configure necessary redactions.
</div>

#### Service naming

Service names are case-sensitive and use PascalCase. To find a service name:

1. Generate a trace that includes the AWS service.
1. Find the service span.
1. Look for the `aws_service` field.

For example:
- For AWS SSO, the resource name is `Sso.GetRoleCredentials`.
- The `aws_service` field shows `Sso`.
- Use `Sso` in your configuration.

### Configure the number of extracted tags

Control the maximum number of extracted tags with:

```sh
DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS=758
```

<div class="alert alert-danger">
The default value (758) is the maximum the Datadog Agent can accept. Increasing this value is not recommended.
</div>

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Best practices

- Different tracers use different JSONPath implementations, so test your queries with each tracer individually.
- Always verify redaction behavior in a Staging environment before enabling in Production.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://jsonpath.com/

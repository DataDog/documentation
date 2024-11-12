---
title: Capture requests and responses from AWS services

further_reading:
  - link: '/tracing/'
    tag: 'Documentation'
    text: 'Learn about Datadog APM tracing'
  - link: '/tracing/glossary/'
    tag: 'Documentation'
    text: 'APM Terminology and Overview'
aliases:
  - /api/latest/tracing/
  - /api/v1/tracing/
  - /api/v2/tracing/
---

## Introduction

AWS Payload Extraction is a feature available in Datadog's Node.js, Python, and Java client tracer libraries. The feature is opt-in and, once enabled, extracts information from request and response bodies sent between a traced application and AWS servers for select AWS services. This information is then attached to spans as tags, allowing it to be viewed in dashboards and even used for things like alerting. Each of the tracers support the following AWS services: SNS, SQS, Kinesis, S3, and EventBridge.

This feature is available as of the following versions of the tracers and packages:

* Node.js: 5.25.0 & 4.49.0  
  * Instruments the **@aws-sdk/\*** family of npm packages (AWS SDK v3).  
* Java: 1.42.1  
  * Instruments the **aws-sdk-v2** package.  
* Python: 2.17.0
  * Instruments the **botocore** (including **boto3**) packages.

Essentially, the feature works by extracting key/value pairs from a hierarchical request body and then flattening them into dot separated tags. As an example of this, consider the following contrived request body:

```
{  
  "Message": {  
    "foo.bar": "baz",  
    "Arr": ["a", "b"]  
  }  
}
```

The tags that are generated from this body look like this:

```
aws.request.body.Message.foo\.bar: baz  
aws.request.body.Message.Arr.0: a  
aws.request.body.Message.Arr.1: b
```

The simplest way to enable this feature is by setting the following two environment variables:

`DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING=all  # parse requests`  
`DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING=all # parse responses`

If neither of these environment variables are set, or if they are set to an empty string, then the feature is disabled entirely. You may choose to parse just the request bodies, the response bodies, or both by assigning a value to the environment variable. Having the value set to **all** means that the entirety of the body will be used for generating tag data. In other words, "**all"** is a value with special meaning. The feature can be further configured by using different values, which will be explained soon.

It's likely–and even expected–that many of these payloads contain PII. For example the Simple Notification Service (SNS) has fields which represent phone numbers, like the **.PhoneNumber** property. For this reason, the tracers include a default list of fields that will have their values redacted (ie. values replaced with `'redacted'`). Note that it's impossible to disable the default redactions.

Of course, nobody knows your application better than you do, so the tracers also allow for an additional list of fields to be redacted. This can be done by changing the aforementioned request and response environment variables to be a comma separated list of additional fields to redact. *Note that currently these fields are redacted from all services and it's not possible to configure redactions on a per-service basis.*

Here's how you might further configure application:

`DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING=$.Metadata.UserId,$.Attributes.0.Pass`

If only this single environment variable were provided to an application with the tracer installed then it would exhibit the following characteristics: Payload extraction would be applied for requests but not for services. The default redactions would be applied for applicable services. The `UserId` field inside of a top level `Metadata` object would be redacted. And for a top level array named `Attributes`, the `Pass` field of the first entry in the array would be redacted. The syntax used for these field definitions is based on [JSONPath](https://jsonpath.com/). *Note: since each tracer uses a different JSONPath implementation (since they're built in different languages) it's possible a query in one tracer might not behave the same in another. Be sure to test your queries in each tracer.*

The tracers are configured so that JSON data nested inside of JSON documents–a common pattern with, say, SQS payloads–will be matched.

Each of the three tracers also supports another environment variable for limiting the depth of the document which is used for payload extraction and defaults to 10\. You will probably never need to adjust this value. Any child nodes after this depth are ignored and won't be used for generating tags. This is used mostly for performance reasons but you may change it to whatever value best suits your application:

`DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH=10`

Nobody wants to accidentally send PII to observability services so it's recommended that you test your application, such as in a staging environment, and to examine the data that your application generates. Only once you're satisfied with the redactions should you enable the feature in production. It's always possible to sneak PII into unanticipated fields so you should always test instead of relying entirely on the default redactions provided by the tracers.

## Differences between individual tracers

Beyond the basic functionality detailed above, the individual tracers support added functionality which can further enhance your application.

### Node.js

The default redaction rules for the Node.js service are configured on a per-service basis. For example, the `$.Endpoint` field is redacted specifically for the SNS service request. However, with the Python and Java tracers, the `$.Endpoint` field is redacted for requests across _all_ services.

The Node.js tracer only supports the following five services: SNS, SQS, Kinesis, S3, and EventBridge. If your application requires support for additional services then please open a feature request via the helpdesk to request additional services.

### Python

The Python tracer only supports the following five services by default: SNS, SQS, Kinesis, S3, and EventBridge. The list of enabled services for tag extraction can be modified by setting an additional environment variable. Add comma separated entries to the environment variable to enable tag extraction from the added services. This represents an exhaustive list of services for tag extraction so if you want to add services you'll need to keep the original six services listed as well. *Note: While you can enable services in this manner they will NOT include default redactions. It is highly recommended that you test your application in staging to build out a list of additional redactions.* Here is the environment variable and the default value:

`DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES=s3,sns,sqs,kinesis,eventbridge`

Note that service names are case sensitive and default to lower-case values. To get a list of valid service names, visit the [Boto3 Available Services](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/index.html) page, find the service you're interested in, and click the link to the service page. For example, the Amplify service has documentation which contains `boto3.client('amplify')`. In this case "amplify" is the entry that you'll need to add to the list to support the Amplify service.

The Python tracer also supports setting a maximum number of tags to extract from a document and apply to a trace. You will probably never need to adjust this value. This number can be modified by changing an environment variable. *Note that increasing the value from the default is not recommended since it is based on the maximum which the Datadog agent can accept.* Here is the environment variable and the default value:

`DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS=758`

### Java

The Java tracer supports the five aforementioned services by default, plus a sixth one: SNS, SQS, Kinesis, S3, EventBridge, and API Gateway. The list of enabled services for tag extraction can be modified by setting an additional environment variable. Add comma separated entries to the environment variable to enable tag extraction for the additional services. This represents an exhaustive list of services for tag extraction so if you want to add services you'll need to keep the original six services listed as well. *Note: While you can enable services in this manner they will NOT include default redactions. It is highly recommended that you test your application in staging to build out a list of additional redactions.*

`DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES=ApiGateway,ApiGatewayV2,EventBridge,Sqs,Sns,S3,Kinesis`

Note that service names are case sensitive and default to pascal case. To get the name of an AWS service you'll first need to examine a trace for the service span from your application. The field in the trace that contains the service name is titled **aws\_service**. For example, the SSO service has a resource name of **Sso.GetRoleCredentials** and has an entry of **aws\_service: Sso**. So in this case the name of the service is **Sso**.

The Java tracer also supports setting a maximum number of tags to extract from a document and apply to a trace. You will probably never need to adjust this value. This number can be modified by changing an environment variable. *Note that increasing the value from the default is not recommended since it is based on the maximum which the Datadog agent can accept.* Here is the environment variable and the default value:

`DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS=758`

## Config Examples
[https://github.com/DataDog/dd-trace-java/pull/7882](https://github.com/DataDog/dd-trace-java/pull/7882) 
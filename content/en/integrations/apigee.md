---
title: Apigee
name: apigee
kind: integration
description: 'Collect Apigee proxy logs to track errors, request response time, duration, latency and monitor performance and issues of the proxies aggregated in one place.'
short_description: 'Collect Apigee logs to track errors, request response time, etc.'
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/apigee.md']
categories:
    - log collection
doc_link: /integrations/apigee/
aliases:
    - logs/log_collection/apigee
has_logo: true
integration_title: Apigee
is_public: true
public_title: Datadog-Apigee
further_reading:
    - link: 'logs/'
      tag: 'Documentation'
      text: 'Log Management'
---

## Overview

Collect Apigee proxy logs to track errors, request response time, duration, latency and monitor performance and issues of the proxies aggregated in one place.
## Setup

#### Log Collection


Collect Apigee proxy logs to Datadog using Apigee [JavaScript policy](https://docs.apigee.com/api-platform/reference/policies/javascript-policy).

The JavaScript has been configured to capture the essential flow variables as log attributes in Datadog. The attributes are named according to the list of standard [attributes](https://docs.datadoghq.com/logs/processing/attributes_naming_convention/#naming-conventions).

##### Setup JavaScript policy to collect Apigee logs to datadog
1. Select the Apigee proxy from which you want to send logs to Datadog.
2. In the selected proxy overview page click on 'DEVELOP' tab located in the top-right corner.

![](https://p-qKFgO2.t2.n0.cdn.getcloudapp.com/items/yAu2BD0m/Image%202020-05-14%20at%202.00.05%20PM.png?v=97a327a0ac87aa84264599adbcff264b)

3. Under 'Navigator' add new JavaScript policy. Then edit the JavaScript file that has been created under 'Resources --> jsc' drop down.
4. Add the following JavaScript code snippet in it (Make sure to set Datadog **API KEY** in `dd_api_url` variable) - 

```
// Set the Datadog API URL here.
// Note: If you are in the Datadog EU site (app.datadoghq.eu), the HTTP log endpoint is http-intake.logs.datadoghq.eu.
var dd_api_url = "https://http-intake.logs.datadoghq.com/v1/input/<API_KEY>?ddsource=apigee";

// Debug
// print(dd_api_url);
// print('Name of the flow: ' + context.flow);

// calculate response times for client, target and total
var request_start_time = context.getVariable('client.received.start.timestamp');
var request_end_time = context.getVariable('client.received.end.timestamp');
var target_start_time = context.getVariable('target.sent.start.timestamp');
var target_end_time = context.getVariable('target.received.end.timestamp');
var total_request_time = request_end_time - request_start_time;
var total_target_time = target_end_time - target_start_time;
var total_client_time = total_request_time - total_target_time;

var timestamp = crypto.dateFormat('YYYY-MM-dd HH:mm:ss.SSS');
var organization = context.getVariable("organization.name");
var networkClientIP = context.getVariable("client.ip");
var httpPort = context.getVariable("client.port");
var environment = context.getVariable("environment.name");
var apiProduct = context.getVariable("apiproduct.name");
var apigeeProxyName = context.getVariable("apiproxy.name");
var apigeeProxyRevision = context.getVariable("apiproxy.revision");
var appName = context.getVariable("developer.app.name");
var httpMethod = context.getVariable("request.verb");
var httpUrl = '' + context.getVariable("client.scheme") + '://' + context.getVariable("request.header.host") + context.getVariable("request.uri");
var httpStatusCode = context.getVariable("message.status.code");
var statusResponse = context.getVariable("message.reason.phrase");
var clientLatency = total_client_time;
var targetLatency = total_target_time;
var totalLatency = total_request_time;
var userAgent = context.getVariable('request.header.User-Agent');
var messageContent = context.getVariable('message.content');


// Datadog log attributes
var logObject = {
    "timestamp": timestamp,
    "organization": organization,
    "network.client.ip": networkClientIP,
    "env": environment,
    "apiProduct": apiProduct,
    "apigee_proxy.name": apigeeProxyName,
    "apigee_proxy.revision": apigeeProxyRevision,
    "appName": appName,
    "http.method": httpMethod,
    "http.url": httpUrl,
    "http.status_code": httpStatusCode,
    "http.port": httpPort,
    "status": statusResponse,
    "clientLatency": clientLatency,
    "targetLatency": targetLatency,
    "totalLatency": totalLatency,
    "http.client.start_time_ms": request_start_time,
    "http.client.end_time_ms": request_end_time,
    "user-agent": userAgent,
    "message": messageContent,
};


var headers = {
    'Content-Type': 'application/json'
};


// Debug
// print('LOGGING OBJECT' + JSON.stringify(logObject));

var myLoggingRequest = new Request(dd_api_url, "POST", headers, JSON.stringify(logObject));

// Send logs to Datadog
httpClient.send(myLoggingRequest);
```

**Note**: Add more Flow variables into JavaScript from official [Apigee Flow Variable documentation](https://docs.apigee.com/api-platform/reference/variables-reference).

## Troubleshooting

Need help? Contact [Datadog support][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
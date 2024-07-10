---
title: Apigee
name: apigee

description: 'Collect Apigee proxy logs to track errors, request response time, duration, latency and monitor performance and issues of the proxies aggregated in one place.'
short_description: 'Collect Apigee logs'
aliases:
- /logs/log_collection/apigee
- /integrations/apigee
further_reading:
- link: 'logs/'
  tag: 'Documentation'
  text: 'Log Management'
integration_id: "apigee"
---

## Overview

Collect Apigee proxy logs to track errors, response time, duration, latency, monitor performance, and proxy issues.

## Setup

### Log collection

{{% site-region region="us,eu" %}}
There are two methods for collecting Apigee logs:

1. Use Apigee's [JavaScript policy][1] to send logs to Datadog.
2. If you already have a syslog server, use the Apigee [MessageLogging policy][2] type to log to a syslog account.

#### Syslog parameter

Use the MessageLogging policy type with the syslog parameter on your API to log custom messages to syslog. Replace `<site_intake_endpoint>` with {{< region-param key="web_integrations_endpoint" code="true" >}} and `<site_port>` with {{< region-param key="web_integrations_port" code="true" >}}, in the following example:

```json
<MessageLogging name="LogToSyslog">
    <DisplayName>datadog-logging</DisplayName>
    <Syslog>
        <Message><YOUR API KEY> test</Message>
        <Host><site_intake_endpoint></Host>
        <Port><site_port></Port>
        <Protocol>TCP</Protocol>
    </Syslog>
</MessageLogging>
```

[1]: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
[2]: https://docs.apigee.com/api-platform/reference/policies/message-logging-policy#samples

{{% /site-region %}}
#### JavaScript policy

Send Apigee proxy logs to Datadog using Apigee's [JavaScript policy][1].

The JavaScript has been configured to capture the essential flow variables as log attributes in Datadog. The attributes are named according to the [list of standard attributes][2].

1. Select the Apigee proxy from which you want to send logs to Datadog.
2. In the selected proxy overview page, click the **DEVELOP** tab located in the top-right corner.

{{< img src="static/images/logs/guide/apigee/apigee_develop.png" alt="Develop" style="width:75%;">}}

3. Under **Navigator**, go to add a new JavaScript policy and edit the JavaScript file created under the **Resources --> jsc** dropdown menu.
4. Add the following JavaScript code snippet in it. Make sure to replace `<DATADOG_API_KEY>` in the `dd_api_url` variable with your [Datadog API KEY][3].

```
// Set the Datadog API URL here.
var dd_api_url = "https://http-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=apigee";

// Debug
// print(dd_api_url);
// print('Name of the flow: ' + context.flow);

// calculate response times for client, target and total
var request_start_time = context.getVariable('client.received.start.timestamp');
var request_end_time = context.getVariable('client.received.end.timestamp');
var system_timestamp = context.getVariable('system.timestamp');
var target_start_time = context.getVariable('target.sent.start.timestamp');
var target_end_time = context.getVariable('target.received.end.timestamp');
var total_request_time = system_timestamp - request_start_time;
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
    "service": appName,
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
    "http.useragent": userAgent,
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

**Note**: Add more flow variables into JavaScript from the official [Apigee flow variable reference][4].

## Troubleshooting

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
[2]: /logs/log_configuration/attributes_naming_convention/#standard-attributes
[4]: https://docs.apigee.com/api-platform/reference/variables-reference
[5]: /help/
[3]: https://app.datadoghq.com/organization-settings/api-keys
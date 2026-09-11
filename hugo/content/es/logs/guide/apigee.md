---
aliases:
- /es/logs/log_collection/apigee
- /es/integrations/apigee
description: Recopila logs de proxy de Apigee para realizar un seguimiento de errores,
  tiempos de respuesta de solicitudes, duración, latencia, rendimiento del monitor
  y problemas de proxies agregados en un solo lugar.
further_reading:
- link: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
  tag: Apigee
  text: Política JavaScript de Apigee
- link: logs/
  tag: Documentación
  text: Gestión de logs
integration_id: apigee
name: apigee
short_description: Recopilar logs de Apigee
title: Apigee
---

## Información general

Recopila logs de proxy de Apigee para realizar un seguimiento de errores, tiempos de respuesta, duración, latencia, rendimiento del monitor y problemas de proxies.

## Configuración

### Recopilación de logs

{{% site-region region="us,eu" %}}
Existen dos métodos para recopilar logs de Apigee:

1. Utiliza la [política JavaScript][1] de Apigee para enviar logs a Datadog.
2. Si ya dispones de un servidor syslog, utiliza el tipo de [política MessageLogging][2] de Apigee para gestionar logs en una cuenta syslog.

#### Parámetro Syslog

Utiliza el tipo de política MessageLogging con el parámetro syslog en tu API para registrar mensajes personalizados en syslog. Sustituye `<site_intake_endpoint>` por {{< region-param key="web_integrations_endpoint" code="true" >}} y `<site_port>` por {{< region-param key="web_integrations_port" code="true" >}}, en el siguiente ejemplo:

```json
<MessageLogging name="LogToSyslog">
    <DisplayName>datadog-logging</DisplayName>
    <Syslog>
        <Message><YOUR API KEY> test</Message>
        <Host><site_intake_endpoint></Host>
        <Port><site_port></Port>
        <Protocol>TCP</Protocol>
    </Syslog>
    <logLevel>ALERT</logLevel>
</MessageLogging>
```

[1]: https://cloud.google.com/apigee/docs/api-platform/reference/policies/javascript-policy?hl=en
[2]: https://cloud.google.com/apigee/docs/api-platform/reference/policies/message-logging-policy

{{% /site-region %}}
#### Política JavaScript

Envía logs de proxy de Apigee a Datadog utilizando la política JavaScript de Apigee. Para obtener instrucciones detalladas, consulta la [documentación de Apigee][1].

1. Selecciona el proxy de Apigee desde el que quieres enviar logs a Datadog.
2. En la página de información general del proxy seleccionada, haz clic en la pestaña **DESARROLLAR**.
3. Selecciona **Nuevo script**.
4. Selecciona JavaScript y añada variables de flujo en JavaScript desde la [referencia de variables de flujo de Apigee][4]. 

{{% collapse-content title="Fragmento de código JavaScript de ejemplo" level="h4" expanded=false %}}

Consulta el siguiente fragmento de código JavaScript de ejemplo. Sustituye `<DATADOG_API_KEY>` en la variable `dd_api_url` por tu [clave de API Datadog][3]. JavaScript se ha configurado para capturar las variables de flujo esenciales como atributos de logs en Datadog. Los atributos se nombran de acuerdo a la lista de atributos estándar.

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
var statusResponse = context.getVariable("response.reason.phrase");
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

{{% /collapse-content %}}


## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
[2]: /es/logs/log_configuration/attributes_naming_convention/#standard-attributes
[4]: https://docs.apigee.com/api-platform/reference/variables-reference
[5]: /es/help/
[3]: https://app.datadoghq.com/organization-settings/api-keys
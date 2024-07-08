---
aliases:
- /es/logs/log_collection/apigee
- /es/integrations/apigee
description: Recopila logs de proxy de Apigee para realizar un seguimiento de errores,
  tiempos de respuesta de solicitudes, duración, latencia, rendimiento del monitor
  y problemas de proxies agregados en un solo lugar.
further_reading:
- link: logs/
  tag: Documentación
  text: Log Management
integration_id: apigee
kind: Guía
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
</MessageLogging>
```

[1]: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
[2]: https://docs.apigee.com/api-platform/reference/policies/message-logging-policy#samples

{{% /site-region %}}
#### Política JavaScript

Envía logs de proxy de Apigee a Datadog utilizando la [política JavaScript][1] de Apigee.

El JavaScript se ha configurado para registrar las variables de flujo esenciales como atributos de logs en Datadog. Los atributos se nombran de acuerdo con la [lista de atributos estándar][2].

1. Selecciona el proxy de Apigee desde el que quieres enviar logs a Datadog.
2. En la página de información general del proxy seleccionada, haz clic en la pestaña **DEVELOP** (Ampliar), situada en la esquina superior derecha.

{{< img src="static/images/logs/guide/apigee/apigee_develop.png" alt="Ampliar" style="width:75%;">}}

3. En **Navigator** (Navegador), añade una nueva política JavaScript y edita el archivo JavaScript creado en el menú desplegable **Resources --> jsc** (Recursos --> jsc).
4. Añade el siguiente fragmento de código JavaScript en él. Asegúrate de sustituir `<Datadog_API_KEY>` en la variable `dd_api_url` por tu [clave de API Datadog][3].

```
// Configura la URL de la API Datadog aquí..
var dd_api_url = "https://http-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=apigee";

// Depurar
// print(dd_api_url);
// print('Name of the flow: ' + context.flow);

// calcular tiempos de respuesta de cliente, destino y total
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


// Atributos de logs de Datadog
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


// Depurar
// print('LOGGING OBJECT' + JSON.stringify(logObject));

var myLoggingRequest = new Request(dd_api_url, "POST", headers, JSON.stringify(logObject));

// Enviar logs a Datadog
httpClient.send(myLoggingRequest);
```

**Nota**: Añade más variables de flujo en JavaScript a partir de la [referencia de la variable de flujo Apigee][4].

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
[2]: /es/logs/log_configuration/attributes_naming_convention/#standard-attributes
[4]: https://docs.apigee.com/api-platform/reference/variables-reference
[5]: /es/help/
[3]: https://app.datadoghq.com/organization-settings/api-keys
---
aliases:
- /fr/logs/log_collection/apigee
- /fr/integrations/apigee
description: Recueillez des logs sur les proxies Apigee afin de surveiller les erreurs,
  les délais de réponse des requêtes, les durées, la latence ainsi que les performances
  et les problèmes des proxies depuis un unique outil.
further_reading:
- link: logs/
  tag: Documentation
  text: Log Management
integration_id: apigee
kind: Guide
name: apigee
short_description: Recueillir des logs Apigee
title: Apigee
---

## Présentation

Recueillez des logs sur les proxies Apigee afin de surveiller les erreurs, les délais de réponse, les durées, la latence ainsi que les performances des monitors et les problèmes des proxies.

## Configuration

### Collecte de logs

{{% site-region region="us,eu" %}}
Il existe deux moyens de recueillir les logs Apigee :

1. Utilisez la [stratégie JavaScript][1] d'Apigee pour envoyer des logs à Datadog.
2. Si vous disposez d'un serveur syslog, utilisez le type de [stratégie MessageLogging][2] d'Apigee pour enregistrer vos logs sur un compte syslog.

#### Paramètre syslog

Utilisez le type de stratégie MessageLogging avec un paramètre syslog sur votre API pour enregistrer des messages personnalisés dans syslog. Remplacez`<site_intake_endpoint>` par {{< region-param key="web_integrations_endpoint" code="true" >}} et `<site_port>` par {{< region-param key="web_integrations_port" code="true" >}} dans lʼexemple suivant :

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

{{< /site-region >}}
#### Stratégie JavaScript

Envoyer des logs sur les proxies Apigee à Datadog en exploitant la [stratégie JavaScript][1] d'Apigee.

JavaScript a été configuré de façon à enregistrer les variables de flux importantes en tant qu'attributs de logs dans Datadog. Les noms des attributs correspondent à la [liste d'attributs standards][2].

1. Sélectionnez le proxy Apigee à partir duquel vous souhaitez envoyer des logs à Datadog.
2. Sur la page de présentation du proxy de votre choix, cliquez sur l'onglet **DEVELOP** en haut à droite.

{{< img src="static/images/logs/guide/apigee/apigee_develop.png" alt="Développer" style="width:75%;">}}

3. Sous **Navigator**, ajoutez une nouvelle stratégie JavaScript. Modifiez ensuite le fichier JavaScript créé, accessible depuis le menu déroulant **Resources --> jsc**.
4. Ajoutez-y l'extrait de code JavaScript suivant. Assurez-vous de remplacer `<DATADOG_API_KEY>` par votre [Clé dʼAPI Datadog][3] dans la variable `dd_api_url`.

```
// Définir ici l'URL de l'API Datadog.
var dd_api_url = "https://http-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=apigee";

// Debugging
// print(dd_api_url);
// print('Name of the flow: ' + context.flow);

// Calculer les délais de réponse pour le client, la cible et le total
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


// Attributs de log Datadog
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


// Debugging
// print('LOGGING OBJECT' + JSON.stringify(logObject));

var myLoggingRequest = new Request(dd_api_url, "POST", headers, JSON.stringify(logObject));

// Envoyer les logs à Datadog
httpClient.send(myLoggingRequest);
```

**Remarque** : pour ajouter de nouvelles variables de flux à JavaScript, consultez la [référence sur les variables de flux][4] de la documentation Apigee officielle (en anglais).

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
[2]: /fr/logs/log_configuration/attributes_naming_convention/#standard-attributes
[4]: https://docs.apigee.com/api-platform/reference/variables-reference
[5]: /fr/help/
[3]: https://app.datadoghq.com/organization-settings/api-keys
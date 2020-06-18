---
title: Apigee
name: apigee
kind: integration
description: 'Recueillez des logs sur les proxies Apigee afin de surveiller les erreurs, les délais de réponse des requêtes, les durées, la latence ainsi que les performances et les problèmes des proxies depuis un unique outil.'
short_description: 'Recueillez des logs Apigee afin de surveiller les erreurs, les délais de réponse des requêtes, et plus encore.'
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/apigee.md'
categories:
  - log collection
doc_link: /integrations/apigee/
aliases:
  - /fr/logs/log_collection/apigee
has_logo: true
integration_title: Apigee
is_public: true
public_title: Datadog/Apigee
further_reading:
  - link: logs/
    tag: Documentation
    text: Log Management
---
## Présentation

Recueillez des logs sur les proxies Apigee afin de surveiller les erreurs, les délais de réponse, les durées, la latence ainsi que les performances et les problèmes des proxies depuis un unique outil.

## Configuration

#### Collecte de logs


Envoyer des logs sur les proxies Apigee à Datadog en exploitant la [stratégie JavaScript][1] d'Apigee.

JavaScript a été configuré de façon à enregistrer les variables de flux importantes en tant qu'attributs de logs dans Datadog. Les noms des attributs correspondent à la [liste d'attributs standards][2].

##### Configurer la stratégie JavaScript pour envoyer des logs Apigee à Datadog
1. Sélectionnez le proxy Apigee à partir duquel vous souhaitez envoyer des logs à Datadog.
2. Sur la page de présentation du proxy de votre choix, cliquez sur l'onglet 'DEVELOP' en haut à droite.

{{< img src="integrations/apigee/apigee_develop.png" alt="Develop"  style="width:75%;">}}

3. Sous 'Navigator', ajoutez une nouvelle stratégie JavaScript. Modifiez ensuite le fichier JavaScript créé, accessible depuis la liste déroulante 'Resources --> jsc'.
4. Ajoutez-y l'extrait de code JavaScript suivant. Assurez-vous de configurer votre **CLÉ_API** dans la variable `dd_api_url`.

```
// Définissez ici l'URL de l'API Datadog.
// Remarque : si vous êtes sur le site européen Datadog (app.datadoghq.eu), l'endpoint des logs HTTP est http-intake.logs.datadoghq.eu.
var dd_api_url = "https://http-intake.logs.datadoghq.com/v1/input/<CLÉ_API>?ddsource=apigee";

// Debugging
// print(dd_api_url);
// print('Name of the flow: ' + context.flow);

// Calculer les temps de réponse pour le client, la cible et le total
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


// Attributs des logs Datadog
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

**Remarque** : pour ajouter de nouvelles variables de flux à JavaScript, consultez la [section dédiée][3] de la documentation Apigee officielle (en anglais).

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.apigee.com/api-platform/reference/policies/javascript-policy
[2]: https://docs.datadoghq.com/fr/logs/processing/attributes_naming_convention/#naming-conventions
[3]: https://docs.apigee.com/api-platform/reference/variables-reference
[4]: /fr/help/
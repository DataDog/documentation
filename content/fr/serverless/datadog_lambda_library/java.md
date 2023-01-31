---
dependencies:
- "https://github.com/DataDog/datadog-lambda-java/blob/master/README.md"
kind: documentation
title: Bibliothèque Lambda Datadog pour Java
---
[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![Licence](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-java/blob/main/LICENSE)
![](https://github.com/DataDog/datadog-lambda-java/workflows/Test%20on%20Master%20branch/badge.svg)
![Bintray](https://img.shields.io/bintray/v/datadog/datadog-maven/datadog-lambda-java)

La bibliothèque client Lambda Datadog pour Java (8 et 11) permet d'utiliser les [métriques Lambda optimisées](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=awsconsole#metriques-lambda-optimisees-transmises-en-temps-reel) 
et le [tracing distribué](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=awsconsole#tracing-avec-l-apm-datadog) 
entre les environnements avec et sans serveur, mais aussi d'envoyer des 
[métriques custom](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=awsconsole#metriques-custom) 
à l'API Datadog.


## Installation

Cette bibliothèque est distribuée via JFrog [Bintray](https://bintray.com/beta/#/datadog/datadog-maven/datadog-lambda-java). Suivez les [instructions d'installation](https://docs.datadoghq.com/serverless/installation/java/) et consultez les métriques optimisées, les traces et les logs de votre fonction dans Datadog. 

## Variables d'environnement

### DD_LOG_LEVEL

Définir sur `debug` pour activer les logs de debugging à partir de la bibliothèque Lambda Datadog. Valeur par défaut : `info`.

### DD_ENHANCED_METRICS

Générer des métriques d'intégration Lambda Datadog optimisées, telles que `aws.lambda.enhanced.invocations` et `aws.lambda.enhanced.errors`. Valeur par défaut : `true`.

## Métriques optimisées

Une fois la bibliothèque [installée](#installation), vous devriez pouvoir consulter des métriques optimisées pour votre fonction Lambda dans Datadog.

Consultez la documentation officielle sur les [métriques Lambda optimisées Datadog](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=java#metriques-lambda-optimisees-transmises-en-temps-reel).

## Métriques custom

Une fois [installée](#installation), vous devriez pouvoir envoyer des métriques custom à partir de votre fonction Lambda.

Consultez les instructions relatives à l'[envoi de métriques custom à partir de fonctions AWS Lambda](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=java#metriques-custom).

## Tracing distribué

Incorporez des en-têtes de tracing à vos requêtes HTTP sortantes pour visualiser votre Lambda en contexte dans l'APM.
La bibliothèque client Lambda pour Java offre des objets de connexion HTTP instrumentés ainsi que des méthodes de helper pour l'instrumentation des connexions HTTP effectuées via l'une des bibliothèques suivantes :

- java.net.HttpUrlConnection
- Apache HTTP Client
- OKHttp3

Vous ne trouvez pas votre client préféré ? Ouvrez un ticket pour effectuer une demande d'ajout. Datadog enrichit continuellement cette bibliothèque.

### Exemples pour HttpUrlConnection

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        URL url = new URL("https://example.com");
        HttpURLConnection instrumentedUrlConnection = dd.makeUrlConnection(url); // En-têtes de tracing inclus

        instrumentedUrlConnection.connect();

        return 7;
    }
}
```

Méthode alternative plus complexe :

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        URL url = new URL("https://example.com");
        HttpURLConnection hc = (HttpURLConnection)url.openConnection();

        // Ajouter les en-têtes de tracing distribué
        hc = (HttpURLConnection) dd.addTraceHeaders(hc);

        hc.connect();

        return 7;
    }
}
```

### Exemples pour Apache HTTP Client

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        HttpClient client = HttpClientBuilder.create().build();

        HttpGet hg = dd.makeHttpGet("https://example.com"); // En-têtes de tracing inclus

        HttpResponse hr = client.execute(hg);
        return 7;
    }
}
```

Méthode alternative plus complexe :

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        HttpClient client = HttpClientBuilder.create().build();
        HttpGet hg = new HttpGet("https://example.com");

        // Ajouter les en-têtes de tracing distribué
        hg = (HttpGet) dd.addTraceHeaders(hg);

        HttpResponse hr = client.execute(hg);
        return 7;
    }
}
```


### Exemples pour OKHttp3 Client

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        HttpClient client = HttpClientBuilder.create().build();
        OkHttpClient okHttpClient = new OkHttpClient.Builder().build();
        Request okHttpRequest = dd.makeRequestBuilder() // En-têtes de tracing inclus
            .url("https://example.com")
            .build(); 

        Response resp = okHttpClient.newCall(okHttpRequest).execute();

        return 7;
    }
}
```

Méthode alternative :

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        HttpClient client = HttpClientBuilder.create().build();
        OkHttpClient okHttpClient = new OkHttpClient.Builder().build();
        Request okHttpRequest = new Request.Builder()
            .url("https://example.com")
            .build();

        // Ajouter les en-têtes de tracing distribué
        okHttpRequest = dd.addTraceHeaders(okHttpRequest);

        Response resp = okHttpClient.newCall(okHttpRequest).execute();

        return 7;
    }
}
```

### Corrélations entre les traces et les logs

Pour mettre en corrélation vos traces et vos logs, vous devez injecter le contexte des traces dans vos messages de logs. Nous avons intégré ce contexte au MDC slf4j, sous la clé `dd.trace_context`, et proposons différentes approches simples pour le récupérer automatiquement. Le contexte des traces est ajouté au MDC suite à l'instanciation des `new DDLambda(...)`.

Voici un exemple de contexte de trace : `[dd.trace_id=3371139772690049666 dd.span_id=13006875827893840236]`.

#### Logs JSON

Si vous utilisez des logs au format JSON, ajoutez l'ID de la trace et de la span à chaque message de log, respectivement à l'aide des clés `dd.trace_id` and `dd.span_id`. Pour obtenir une map contenant les ID de trace et de span, appelez `DDLambda.getTraceContext()`. Effectuez une union entre cette map et les données JSON en cours d'écriture.

#### Logs en texte brut

Si vous utilisez des logs en texte brut, vous devez alors créer un nouveau [parser](https://docs.datadoghq.com/logs/processing/parsing/?tab=matcher). Pour ce faire, dupliquez la pipeline Lambda existante. Le nouveau parser peut extraire le contexte des traces à partir de leur position dans les logs.
Utilisez l'auxilliaire `_trace_context` pour extraire le contexte des traces. Pour la ligne de log suivante :

```
INFO 2020-11-11T14:00:00Z LAMBDA_REQUEST_ID [dd.trace_id=12345 dd.span_id=67890] Ceci est un message de log
```

Votre règle de parser correspond à ce qui suit :

```
my_custom_rule \[%{word:level}\]?\s+%{_timestamp}\s+%{notSpace:lambda.request_id}%{_trace_context}?.*
```

#### Log4j/SLF4J

Nous avons ajouté l'ID des traces au MDC slf4j sous la clé `dd.trace_context`. Pour y accéder, utilisez l'opérateur `%X{dd.trace_context}`. Voici un exemple de `log4j.properties` : 

```
log = .
log4j.rootLogger = DEBUG, LAMBDA

log4j.appender.LAMBDA=com.amazonaws.services.lambda.runtime.log4j.LambdaAppender
log4j.appender.LAMBDA.layout=org.apache.log4j.PatternLayout
log4j.appender.LAMBDA.layout.conversionPattern=%d{yyyy-MM-dd HH:mm:ss} %X{dd.trace_context} %-5p %c:%L - %m%n
```

Cela génère les lignes de log suivantes : `2020-11-13 19:21:53 [dd.trace_id=1168910694192328743 dd.span_id=3204959397041471598] INFO com.serverless.Handler:20 - Test de message de log`.

Comme pour les **logs en texte brut** de la section précédente, vous devez créer un nouveau [parser](https://docs.datadoghq.com/logs/processing/parsing/?tab=matcher) pour pouvoir parser correctement le contexte des traces.


#### Autres solutions de journalisation

Si vous utilisez une autre solution de journalisation, vous pouvez accéder à l'ID de trace à l'aide de la méthode `DDLambda.getTraceContextString()`. Celle-ci renvoie l'ID de votre trace sous la forme d'une chaîne, qui peut être ajoutée à n'importe quel message de log.

## Ouvrir un ticket

Si vous rencontrez un bug avec ce package, faites-le nous savoir. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, indiquez la version de la couche Lambda Datadog, la version de Java et la stack trace, si possible. Indiquez aussi les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, n'hésitez pas à faire une pull request en suivant la [procédure](https://github.com/DataDog/dd-lambda-layer-java/blob/main/CONTRIBUTING.md).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé par Datadog (https://www.datadoghq.com/). Copyright 2020 Datadog, Inc.

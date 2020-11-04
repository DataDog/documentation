---
dependencies:
- "https://github.com/DataDog/datadog-lambda-java/blob/master/README.md"
kind: documentation
title: Bibliothèque Lambda Datadog pour Java
---


[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-java/blob/master/LICENSE)
![](https://github.com/DataDog/datadog-lambda-java/workflows/Test%20on%20Master%20branch/badge.svg)

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

## Tracing

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
        DDLambda dd = new DDLambda(request, lambda);

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
        DDLambda dd = new DDLambda(request, lambda);

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
        DDLambda dd = new DDLambda(request, lambda);

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
        DDLambda dd = new DDLambda(request, lambda);

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
        DDLambda dd = new DDLambda(request, lambda);

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
        DDLambda dd = new DDLambda(request, lambda);

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

## Ouvrir un ticket

Si vous rencontrez un bug avec ce package, faites-le nous savoir. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, indiquez la version de la couche Lambda Datadog, la version de Java et la trace de pile, si possible. Indiquez aussi les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, n'hésitez pas à faire une pull request en suivant la [procédure](https://github.com/DataDog/dd-lambda-layer-js/blob/master/CONTRIBUTING.md).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé chez Datadog (https://www.datadoghq.com/). Copyright 2020 Datadog, Inc.

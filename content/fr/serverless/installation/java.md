---
title: Instrumenter des applications Java
kind: documentation
further_reading:
  - link: serverless/serverless_tagging/
    tag: Documentation
    text: Tagging d'applications sans serveur
  - link: serverless/distributed_tracing/
    tag: Documentation
    text: Tracing d'applications sans serveur
  - link: serverless/custom_metrics/
    tag: Documentation
    text: Envoyer des métriques custom depuis des applications sans serveur
---
## Configuration requise

Si vous n'avez pas encore réalisé la configuration :

- Installez [l'intégration AWS][1]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS.
- Installez la [fonction Lambda du Forwarder Datadog][2], qui est nécessaire pour l'ingestion des traces, des métriques optimisées, des métriques custom et des logs AWS Lambda.

Après avoir installé l'[intégration AWS][1] et le [Forwarder Datadog][2], suivez ces étapes pour instrumenter votre application afin d'envoyer des métriques, des logs et des traces à Datadog.

## Configuration

### Installer la bibliothèque Lambda Datadog

Vous pouvez installer la bibliothèque Lambda de Datadog localement en ajoutant l'un des blocs suivants dans votre fichier `pom.xml` ou `build.gradle` (selon la configuration de votre projet). Remplacez `n.n.n` par le numéro de la dernière version (en ignorant le `v` qui le précède) : ![Bintray][3]

{{< tabs >}}
{{% tab "Maven" %}}

Ajoutez la dépendance suivante dans votre fichier `pom.xml` :

```xml
<repositories>
  <repository>
    <id>datadog-maven</id>
    <url>https://dl.bintray.com/datadog/datadog-maven</url>
  </repository>     
</repositories>
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-lambda-java</artifactId>
  <version>n.n.n</version>
  <type>pom</type>
</dependency>
```

{{% /tab %}}
{{% tab "Gradle" %}}

Ajoutez le bloc suivant dans votre `build.gradle` :

```groovy
repositories {
  maven { url "https://dl.bintray.com/datadog/datadog-maven" }
}
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:n.n.n'
}
```
{{% /tab %}}
{{< /tabs >}}

### Configurer la fonction

1. Activez [le tracing actif AWS X-Ray][4] pour votre fonction Lambda.
2. Incorporez la fonction Lambda de votre gestionnaire à l'aide du wrapper fourni par la bibliothèque Lambda de Datadog.
    ```java
    public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
        public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
            DDLambda dd = new DDLambda(request, lambda);
        }
    }
    ```

### Abonner le Forwarder Datadog aux groupes de logs

Pour pouvoir envoyer des métriques, traces et logs à Datadog, vous devez abonner la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][2].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][5].

## Explorer la surveillance sans serveur de Datadog

Après avoir configuré votre fonction en suivant la procédure ci-dessus, vous devriez pouvoir visualiser vos métriques, logs et traces sur la [page Serverless principale][6].

### Surveiller une logique opérationnelle personnalisée

Si vous souhaitez envoyer une métrique custom, consultez l'exemple de code ci-dessous :


```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, lambda);

        Map<String,String> myTags = new HashMap<String, String>();
            myTags.put("product", "latte");
            myTags.put("order","online");

        // Envoyer une métrique custom
        dd.metric(
            "coffee_house.order_value", // Nom de la métrique
            12.45,                      // Valeur de la métrique
            myTags);                    // Tags associés

        URL url = new URL("https://example.com");
        HttpURLConnection hc = (HttpURLConnection)url.openConnection();

        // Ajouter les en-têtes de tracing distribué
        hc = (HttpURLConnection) dd.addTraceHeaders(hc);

        hc.connect();
    }
}
```

Pour en savoir plus sur l'envoi de métriques custom, consultez [cette page][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/serverless/forwarder/
[3]: https://img.shields.io/bintray/v/datadog/datadog-maven/datadog-lambda-java
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[5]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: https://app.datadoghq.com/functions
[7]: /fr/serverless/custom_metrics?tab=java
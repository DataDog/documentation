---
title: Instrumenter des applications Java
kind: documentation
further_reading:
  - link: serverless/installation/node
    tag: Documentation
    text: Installer la surveillance sans serveur Node.js
  - link: serverless/installation/ruby
    tag: Documentation
    text: Installer la surveillance sans serveur Ruby
  - link: serverless/installation/python
    tag: Documentation
    text: Installer la surveillance sans serveur Python
  - link: serverless/installation/dotnet
    tag: Documentation
    text: Installer la surveillance sans serveur .NET
  - link: serverless/installation/go
    tag: Documentation
    text: Installer la surveillance sans serveur Go
---
Après avoir installé l'[intégration AWS][1] et le [Forwarder Datadog][2], suivez les étapes ci-dessous pour instrumenter votre application afin d'envoyer des métriques, des logs et des traces à Datadog.

## Configuration

### Installer la bibliothèque Lambda Datadog

Vous pouvez installer la bibliothèque Lambda de Datadog localement en exécutant l'une des commandes suivantes selon la configuration de votre projet. Pour obtenir la dernière version, consultez la page des [dernières versions][3].

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
  <version>0.0.5</version>
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
  implementation 'com.datadoghq:datadog-lambda-java:0.0.5'
}
```
{{% /tab %}}
{{< /tabs >}}

### Configurer la fonction

1. Activez [le tracing actif AWS X-Ray][4] pour votre fonction Lambda.

### Abonner le Forwarder Datadog aux groupes de logs

Pour pouvoir envoyer des métriques, traces et logs à Datadog, vous devez abonner la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][2].
2. [Vérifiez que l'option DdFetchLambdaTags est activée][5].
3. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][6].

## Explorer la surveillance sans serveur de Datadog

Après avoir configuré votre fonction en suivant la procédure ci-dessus, vous devriez pouvoir visualiser vos métriques, logs et traces sur la [page Serverless principale][2].

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

[1]: /fr/serverless/#1-install-the-cloud-integration
[2]: https://docs.datadoghq.com/fr/serverless/forwarder/
[3]: https://github.com/DataDog/datadog-lambda-java/releases
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[5]: https://docs.datadoghq.com/fr/serverless/forwarder/#experimental-optional
[6]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://app.datadoghq.com/functions
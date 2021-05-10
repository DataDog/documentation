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
{{< img src="serverless/java-lambda-tracing.png" alt="Surveiller des fonctions Lambda Java avec Datadog"  style="width:100%;">}}

## Configuration requise

Si vous ne l'avez pas encore fait :

- Installez [l'intégration AWS][1]. Datadog pourra ainsi ingérer les métriques Lambda depuis AWS.
- Installez la [fonction Lambda du Forwarder Datadog][2], qui est nécessaire pour l'ingestion des traces, des métriques optimisées, des métriques custom et des logs AWS Lambda.

Après avoir installé l'[intégration AWS][1] et le [Forwarder Datadog][2], suivez les étapes suivantes afin d'instrumenter votre application de façon à envoyer des [métriques Lambda optimisées][3], des logs et des traces à Datadog.
Pour instrumenter entièrement votre application sans serveur grâce au tracing distribué, vos fonctions Lambda Java doivent utiliser les runtimes Java 8 Corretto (`java8.al2`) ou Java 11 (`java11`).

## Configuration

### Installer la bibliothèque Lambda Datadog

Vous pouvez installer localement la bibliothèque Lambda Datadog en ajoutant l'un des blocs de code suivants dans votre fichier `pom.xml` ou `build.gradle` (selon la configuration de votre projet). Remplacez `VERSION` par le numéro de la dernière version (en ignorant le `v` qui le précède) : ![Bintray][4] {{< tabs >}} {{% tab "Maven" %}}

Ajoutez la dépendance suivante dans votre fichier `pom.xml` :

```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-lambda-java</artifactId>
  <version>VERSION</version>
</dependency>
```

{{% /tab %}}
{{% tab "Gradle" %}}

Ajoutez le bloc suivant dans votre `build.gradle` :

```groovy
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```
{{% /tab %}}
{{< /tabs >}}

### Instrumenter la fonction

1. Installez la couche Lambda Datadog sur votre fonction. Pour `VERSION`, consultez la dernière [version][5] :

    ```yaml
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:<VERSION>
    ```

2. Configurez les variables d'environnement suivantes sur votre fonction :

    ```yaml
    JAVA_TOOL_OPTIONS: "-javaagent:\"/opt/java/lib/dd-java-agent.jar\""
    DD_LOGS_INJECTION: "true"
    DD_JMXFETCH_ENABLED: "false"
    DD_TRACE_ENABLED: "true"
    ```

3. Incorporez la fonction Lambda de votre gestionnaire à l'aide du wrapper fourni par la bibliothèque Lambda Datadog :

    ```java
    public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
        public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
            DDLambda ddl = new DDLambda(request, context); //Required to initialize the trace

            do_some_stuff();
            make_some_http_requests();

            ddl.finish(); //Required to finish the active span.
            return new ApiGatewayResponse();
        }
    }
    ```

### Abonner le Forwarder Datadog aux groupes de logs

Pour pouvoir envoyer des métriques, traces et logs à Datadog, vous devez abonner la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][2].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][6].

### Surveiller les démarrages à froid des fonctions Lambda Java

Des démarrages à froid se produisent lorsque vos applications sans serveur voient tout d'un coup leur trafic augmenter, notamment lorsque la fonction en question était inactive ou lorsqu'elle recevait un nombre relativement constant de requêtes. Aux yeux des utilisateurs, les démarrages à froid entraînent des ralentissements ou des délais de réponse plus importants. Dans le but de réduire au maximum les [démarrages à froid][7], nous vous conseillons fortement de configurer un monitor sur la fonction Lambda Java concernée et d'utiliser les informations exploitables liées à vos applications sans serveur.

{{< img src="serverless/java-monitor-cold-starts.png" alt="Surveiller les démarrages à froid d'une fonction Lambda Java"  style="width:100%;">}}

Pour créer un monitor Datadog sur les démarrages à froid d'une fonction Lambda Java, suivez les [étapes de création d'un monitor][8] avec les paramètres suivants :
- Nom de la métrique : `aws.lambda.enhanced.invocations`
- À partir de : `runtime:java*` et `cold_start:true`
- Groupe d'alertes : alertes multiples, avec le déclenchement d'une alerte distincte pour chaque `function_arn`

### Tagging de service unifié

Bien qu'ils soient facultatifs, Datadog vous recommande fortement d'ajouter à vos applications sans serveur les tags `env`, `service`, et `version` comme indiqué dans la [documentation relative au tagging de service unifié][9].

## Explorer la surveillance sans serveur de Datadog

Après avoir configuré votre fonction en suivant la procédure ci-dessus, vous devriez pouvoir visualiser vos métriques, logs et traces sur la [page Serverless principale][10].

### Surveiller une logique opérationnelle personnalisée

Si vous souhaitez envoyer une métrique custom, consultez l'exemple de code ci-dessous :

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda ddl = new DDLambda(request, context);

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
        hc.connect();

        ddl.finish();
    }
}
```

Pour en savoir plus sur l'envoi de métriques custom, consultez [la documentation dédiée][11].

### Associer vos logs à vos traces

Pour associer automatiquement vos logs de fonction Lambda Java à vos traces, consultez les instructions de la section [Associer vos logs Java à vos traces][12].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/serverless/forwarder/
[3]: /fr/serverless/enhanced_lambda_metrics
[4]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[5]: https://github.com/DataDog/datadog-lambda-java/releases/
[6]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: /fr/serverless/insights#cold-starts
[8]: /fr/monitors/monitor_types/metric/?tab=threshold#overview
[9]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[10]: https://app.datadoghq.com/functions
[11]: /fr/serverless/custom_metrics?tab=java
[12]: /fr/tracing/connect_logs_and_traces/java/
---
kind: guide
title: Instrumenter des applications Java sans serveur avec le Forwarder Datadog
---
## Présentation

<div class="alert alert-warning">
Si vous commencez tout juste à utiliser la surveillance sans serveur Datadog, suivez plutôt les <a href="/serverless/installation/java">instructions d'instrumentation des fonctions Lambda avec l'extension Lambda Datadog</a>. Si vous avez configuré la surveillance sans serveur Datadog avec le Forwarder Datadog avant que les fonctionnalités Lambda clés en main ne soient proposées, consultez ce guide pour gérer votre instance.
</div>

<div class="alert alert-danger">
Certaines anciennes versions de <code>datadog-lambda-java</code> importent <code>log4j <=2.14.0</code> en tant que dépendance transitive. Les <a href="#mise-a-niveau">instructions de mise à niveau</a> sont indiquées plus loin dans ce guide.
</div>

## Prérequis

Pour ingérer des traces AWS Lambda, des métriques optimisées, des métriques custom et des logs, vous devez utiliser la [fonction Lambda du Forwarder Datadog][2].

Pour instrumenter entièrement votre application sans serveur grâce au tracing distribué, vos fonctions Lambda Java doivent utiliser le runtime Java 8 Corretto (`java8.al2`),  Java 11 (`java11`) ou Java 17 (`java17`).

## Configuration

### Installation

Installez localement la bibliothèque Lambda Datadog en ajoutant l'un des blocs de code suivants dans `pom.xml` (Maven) ou `build.gradle` (Gradle). Remplacez `VERSION` par le numéro de la dernière version (en ignorant le `v` qui le précède) : ![Maven Central][4]
{{< tabs >}}
{{% tab "Maven" %}}

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

### Instrumentation


1. Installez la couche Lambda Datadog sur votre fonction. La dernière `VERSION` est `{{< latest-lambda-layer-version layer="dd-trace-java" >}}`.

    ```yaml
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:<VERSION>
    ```

2. Configurez les variables d'environnement suivantes sur votre fonction :

    ```yaml
    JAVA_TOOL_OPTIONS: -javaagent:"/opt/java/lib/dd-java-agent.jar" -XX:+TieredCompilation -XX:TieredStopAtLevel=1
    DD_LOGS_INJECTION: true
    DD_JMXFETCH_ENABLED: false
    DD_TRACE_ENABLED: true
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

### Abonnement

Pour pouvoir envoyer des métriques, traces et logs à Datadog, abonnez la fonction Lambda du Forwarder Datadog à chaque groupe de logs de votre fonction.

1. [Si ce n'est pas déjà fait, installez le Forwarder Datadog][2].
2. [Abonnez le Forwarder Datadog aux groupes de logs de votre fonction][5].

### Surveiller les démarrages à froid des fonctions Lambda Java

Des démarrages à froid se produisent lorsque vos applications sans serveur voient tout d'un coup leur trafic augmenter, notamment lorsque la fonction en question était inactive ou lorsqu'elle recevait un nombre relativement constant de requêtes. Aux yeux des utilisateurs, les démarrages à froid entraînent des ralentissements ou des délais de réponse plus importants. Dans le but de [réduire au maximum les démarrages à froid][6], Datadog vous conseille de configurer un monitor sur la fonction Lambda Java concernée et d'utiliser les informations exploitables liées à vos applications sans serveur.

{{< img src="serverless/java-monitor-cold-starts.png" alt="Surveiller les démarrages à froid d'une fonction Lambda Java" style="width:100%;">}}

Pour créer un monitor Datadog sur les démarrages à froid d'une fonction Lambda Java, suivez les [étapes de création d'un monitor][7] et appliquez les paramètres suivants :
- Nom de la métrique : `aws.lambda.enhanced.invocations`
- À partir de : `runtime:java*` et `cold_start:true`
- Groupe d'alertes : alertes multiples, avec le déclenchement d'une alerte distincte pour chaque `function_arn`

### Tag

Bien que cette opération soit facultative, Datadog vous recommande d'ajouter les tags réservés `env`, `service` et `version` à vos applications sans serveur. Pour en savoir plus sur les tags réservés, consultez la section [Tagging de service unifié][8].

## Explorer les logs

Après avoir configuré votre fonction en suivant la procédure ci-dessus, visualisez vos métriques, logs et traces sur la [page Serverless principale][9].

### Surveiller une logique opérationnelle personnalisée

Pour envoyer une métrique custom, consultez l'exemple de code ci-dessous :

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda ddl = new DDLambda(request, context);

        Map<String,Object> myTags = new HashMap<String, Object>();
            myTags.put("product", "latte");
            myTags.put("order","online");

        // Envoyer une métrique custom
        ddl.metric(
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

Pour en savoir plus sur l'envoi de métriques custom, consultez [la documentation dédiée][10].

### Associer vos logs à vos traces

Pour associer automatiquement vos logs de fonction Lambda Java à vos traces, consultez les instructions de la section [Associer vos logs Java à vos traces][11].

<div class="alert alert-info"> Si vous n'utilisez pas le runtime Java approprié, des messages d'erreur, tels que <code>Error opening zip file or JAR manifest missing : /opt/java/lib/dd-java-agent.jar</code>, peuvent s'afficher. Veillez à utiliser le runtime <code>java8.al2</code> ou <code>java11</code>, comme indiqué ci-dessus. </div>

## Mise à niveau

L'Apache Foundation a annoncé que log4j, une bibliothèque de journalisation Java couramment utilisée, est [vulnérable à l'exécution de code à distance][12]. Certaines versions de `datadog-lambda-java` comportent une dépendance transitive sur log4j qui peut être impactée par cette vulnérabilité. Voici les versions concernées :

-  `<=0.3.3`
-  `1.4.0`

La dernière version de `datadog-lambda-java` est ![Maven Central][4]. Utilisez cette version (en ignorant le `v` qui la précède) durant la procédure de mise à jour indiquée ci-dessous.

Si vous ne souhaitez pas effectuer de mise à niveau vers `1.4.x`, la version `0.3.x` a également été mise à jour afin d'inclure les derniers patchs de sécurité relatifs à log4j.
La dernière version `0.3.x` est disponible dans le [référentiel `datadog-lambda-java`][13].

La version de la dépendance `datadog-lambda-java` dans votre fonction Lambda est définie dans `pom.xml` (Maven) ou `build.gradle` (Gradle).

{{< tabs >}}
{{% tab "Maven" %}}

Votre fichier `pom.xml` contient une section qui ressemble à ceci :

```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-lambda-java</artifactId>
  <version>VERSION</version>
</dependency>
```

Remplacez `VERSION` par la dernière version de `datadog-lambda-java` (disponible ci-dessus). Redéployez ensuite votre fonction Lambda.

{{% /tab %}}

{{% tab "Gradle" %}}

Votre fichier `build.gradle` contient une section qui ressemble à ceci :

```groovy
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```

Remplacez `VERSION` par la dernière version de `datadog-lambda-java` (disponible ci-dessus). Redéployez ensuite votre fonction Lambda.

{{% /tab %}}
{{< /tabs>}}

Si vous effectuez une mise à niveau depuis la version 0.3.x vers la version 1.4.x et que vous souhaitez utiliser le traceur `dd-trace-java`, recherchez la référence à la couche Lambda `dd-trace-java` et remplacez-la par ce qui suit :

```
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:dd-trace-java:4
```


[2]: /fr/serverless/forwarder/
[3]: /fr/serverless/enhanced_lambda_metrics
[4]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[5]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: /fr/serverless/insights#cold-starts
[7]: /fr/monitors/types/metric/?tab=threshold#overview
[8]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[9]: https://app.datadoghq.com/functions
[10]: /fr/serverless/custom_metrics?tab=java
[11]: /fr/tracing/other_telemetry/connect_logs_and_traces/java/
[12]: https://www.datadoghq.com/log4j-vulnerability/
[13]: https://github.com/DataDog/datadog-lambda-java/releases
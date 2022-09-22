---
title: Instrumenter des applications Java sans serveur
kind: documentation
further_reading:
  - link: serverless/datadog_lambda_library/java
    tag: Documentation
    text: Bibliothèque Lambda Datadog pour Java
  - link: serverless/distributed_tracing/
    tag: Documentation
    text: Tracing d'applications sans serveur
  - link: serverless/custom_metrics/
    tag: Documentation
    text: Envoyer des métriques custom depuis des applications sans serveur
  - link: /serverless/guide/troubleshoot_serverless_monitoring
    tag: Documentation
    text: Dépannage de la surveillance sans serveur
aliases:
  - /fr/serverless/datadog_lambda_library/java/
---
{{< img src="serverless/java-lambda-tracing.png" alt="Surveiller des fonctions Lambda Java avec Datadog" style="width:100%;">}}

<div class="alert alert-danger">
Certaines versions de datadog-lambda-java importent log4j <=2.14.0 en tant que dépendance transitive. Les <a href="#upgrading">instructions de mise à niveau</a> sont indiquées plus loin dans ce guide.
</div>

## Prérequis

Pour instrumenter entièrement votre application sans serveur grâce au tracing distribué, vos fonctions Lambda Java doivent utiliser le runtime Java 8 Corretto (`java8.al2`) ou Java 11 (`java11`).

Si vous avez déjà configuré vos fonctions Lambda Java à l'aide du Forwarder Datadog, reportez-vous aux [instructions d'installation][1].

## Configuration

{{< tabs >}}
{{% tab "Interface de ligne de commande Datadog" %}}
L'interface de ligne de commande Datadog permet de modifier les configurations des fonctions Lambda existantes pour instrumenter vos applications sans les redéployer. Il s'agit du moyen le plus rapide de tirer parti de la surveillance sans serveur de Datadog.

Vous pouvez également ajouter la [commande d'instrumentation](#instrumentation) à vos pipelines de CI/CD pour instrumenter toutes vos applications sans serveur. Lancez la commande _après_ le déploiement normal de votre application sans serveur, de sorte que les modifications apportées par l'interface de ligne de commande Datadog ne soient pas écrasées.

### Installation

Installez l'interface de ligne de commande Datadog avec NPM ou Yarn :

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Configurer les identifiants

Pour un démarrage rapide, configurez vos [identifiants AWS][1] et Datadog à l'aide de la commande suivante. Pour les applications de production, nous vous recommandons de fournir les variables d'environnement ou les identifiants de manière plus sécurisée.

```bash
export DATADOG_API_KEY="<CLÉ_API_DATADOG>"
export DATADOG_SITE="<SITE_DD>" # par exemple, datadoghq.com, datadoghq.eu, us3.datadoghq.com ou ddog-gov.com
export AWS_ACCESS_KEY_ID="<ID_CLÉ_ACCÈS>"
export AWS_SECRET_ACCESS_KEY="<CLÉ_ACCÈS>"
```

### Instrumentation

**Remarque** : instrumentez d'abord vos fonctions Lambda dans un environnement de type dev ou staging. Si l'instrumentation doit être annulée, lancez `uninstrument` avec les mêmes arguments que ceux utilisés pour l'instrumentation.

Pour instrumenter vos fonctions Lambda, lancez la commande suivante :

```sh
datadog-ci lambda instrument -f <nomfonction> -f <autre_nomfonction> -r <région_aws> -e <version_extension>
```

Renseignez les paramètres fictifs comme suit :

-   Remplacez `<nomfonction>` et `<autre_nomfonction>` par les noms de vos fonctions Lambda.
-   Remplacez `<région_aws>` par le nom de la région AWS.
-   Remplacez `<version_extension>` par la version souhaitée de l'extension Lambda Datadog. La dernière version est `{{< latest-lambda-layer-version layer="extension" >}}`.

Par exemple :

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -e {{< latest-lambda-layer-version layer="extension" >}}
```

Pour obtenir plus de détails ainsi que des paramètres supplémentaires, consultez la section sur l'[interface de ligne de commande Serverless Datadog][2].

[1]: https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/get-started.html
[2]: https://docs.datadoghq.com/fr/serverless/serverless_integrations/cli

{{% /tab %}}
{{% tab "Configuration personnalisée" %}}
### Installer l'extension Lambda Datadog

[Configurez les couches][1] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format suivant :

```
// Pour une architecture x86
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:Datadog-Extension:<VERSION_EXTENSION>
// Pour une architecture arm64
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:Datadog-Extension-ARM:<VERSION_EXTENSION>
```

La dernière `VERSION_EXTENSION` est {{< latest-lambda-layer-version layer="extension" >}}.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html

{{% /tab %}}
{{< /tabs >}}
### Installer le client de tracing Datadog

[Configurez les couches][14] pour votre fonction Lambda à l'aide de l'ARN, en respectant le format suivant :

```
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:dd-trace-java:<VERSION>
```

La dernière `VERSION` est {{< latest-lambda-layer-version layer="dd-trace-java" >}}.

### Installer la bibliothèque Lambda Datadog

Installez localement la bibliothèque Lambda Datadog en ajoutant l'un des blocs de code suivants dans votre fichier `pom.xml` ou `build.gradle` (selon la configuration de votre projet). Remplacez `VERSION` par le numéro de la dernière version (en ignorant le `v` qui le précède) : ![Maven Central][4]
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

### Configurer des variables d'environnement

Configurez les variables d'environnement suivantes sur votre fonction :

```yaml
DD_API_KEY: <CLÉ_API_DATADOG> # Remplacer <CLÉ_API_DATADOG> par votre clé d'API
JAVA_TOOL_OPTIONS: -javaagent:"/opt/java/lib/dd-java-agent.jar" -XX:+TieredCompilation -XX:TieredStopAtLevel=1
DD_LOGS_INJECTION: true
DD_JMXFETCH_ENABLED: false
DD_TRACE_ENABLED: true
```

### Utiliser un wrapper pour incorporer la fonction Lambda du gestionnaire

Incorporez la fonction Lambda de votre gestionnaire à l'aide du wrapper fourni par la bibliothèque Lambda Datadog :

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda ddl = new DDLambda(request, context); // Requis pour initialiser le tracing

        do_some_stuff();
        make_some_http_requests();

        ddl.finish(); // Requis pour mettre fin à la span active.
        return new ApiGatewayResponse();
    }
}
```

### Tagging de service unifié

Datadog recommande d'ajouter à vos applications sans serveur les tags `DD_ENV`, `DD_SERVICE`, `DD_VERSION` et `DD_TAGS`. Consultez la [documentation relative à l'extension Lambda][2] pour en savoir plus.

## Utilisation

Après avoir configuré votre fonction en suivant la procédure ci-dessus, visualisez vos métriques, logs et traces sur la [page Serverless principale][9].

### Surveiller une logique opérationnelle personnalisée

Si vous souhaitez envoyer une métrique custom, consultez l'exemple de code ci-dessous :

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

<div class="alert alert-info"> Si vous n'utilisez pas le runtime Java approprié, des messages d'erreur, tels que « Error opening zip file or JAR manifest missing : /opt/java/lib/dd-java-agent.jar », peuvent s'afficher. Veillez à utiliser le runtime java8.al2 ou java11, comme indiqué ci-dessus. </div>

## Mise à niveau

L'Apache Foundation a annoncé que log4j, une bibliothèque de journalisation Java couramment utilisée, est [vulnérable à l'exécution de code à distance][12]. Certaines versions de `datadog-lambda-java` comportent une dépendance transitive sur log4j qui peut être impactée par cette vulnérabilité. Voici les versions concernées :

-  `<=0.3.3`
-  `1.4.0`

La dernière version de datadog-lambda-java est ![Maven Central][4]. Utilisez cette version (en ignorant le `v` qui le précède) lorsque vous suivez les instructions de mise à niveau ci-dessous.

Si vous ne souhaitez pas effectuer de mise à niveau vers `1.4.x`, la version `0.3.x` a également été mise à jour afin d'inclure les derniers patchs de sécurité relatifs à log4j. La dernière version `0.3.x` est disponible dans le [référentiel datadog-lambda-java][13].

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

Remplacez `VERSION` par la dernière version de `datadog-lambda-java` (disponible ci-dessus).
Ensuite, redéployez votre fonction Lambda.

{{% /tab %}}
{{< /tabs>}}

Si vous effectuez une mise à niveau depuis la version 0.3.x vers la version 1.4.x et que vous souhaitez utiliser le traceur `dd-trace-java`, recherchez la référence à la couche Lambda `dd-trace-java` et remplacez-la par ce qui suit :

```
arn:aws:lambda:<RÉGION_AWS>:464622532012:layer:dd-trace-java:4
````

## Dépannage

Si vous avez suivi les instructions ci-dessus, mais que vous ne parvenez pas à recueillir des données de surveillance, consultez le [guide sur le dépannage de la surveillance sans serveur][15].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/guide/datadog_forwarder_java
[2]: /fr/serverless/libraries_integrations/extension/
[3]: /fr/serverless/enhanced_lambda_metrics
[4]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[5]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: /fr/serverless/insights#cold-starts
[7]: /fr/monitors/create/types/metric/?tab=threshold#overview
[8]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[9]: https://app.datadoghq.com/functions
[10]: /fr/serverless/custom_metrics?tab=java
[11]: /fr/tracing/connect_logs_and_traces/java/
[12]: https://www.datadoghq.com/log4j-vulnerability/
[13]: https://github.com/DataDog/datadog-lambda-java/releases
[14]: https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html
[15]: /fr/serverless/guide/troubleshoot_serverless_monitoring/
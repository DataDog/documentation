---
aliases:
- /fr/tracing/java
- /fr/tracing/languages/java
- /fr/agent/apm/java/
- /fr/tracing/setup/java
- /fr/tracing/setup_overview/java
- /fr/tracing/setup_overview/setup/java
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: GitHub
  text: Code source de l'APM Datadog Java
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces

title: Tracer des applications Java
type: multi-code-lang
---
## Exigences de compatibilité

La dernière version du traceur Java prend en charge toutes les JVM à partir de la version 8. Pour en savoir plus sur les JVM antérieures à la version 8, consultez la section [Runtimes JVM pris en charge][10].

Pour obtenir la liste complète des frameworks et versions Java pris en charge (y compris les anciennes versions et les versions de maintenance), consultez la section relative aux [exigences de compatibilité][1].

## Installation et démarrage

### Suivre la documentation dans l'application (conseillé)

Suivez les [instructions de démarrage rapide][2] fournies dans l'application Datadog pour profiter d'une expérience optimale, et notamment :

- Obtenir des instructions détaillées en fonction de la configuration de votre déploiement (hosts, Docker, Kubernetes ou Amazon ECS) ;
- Définir les tags `service`, `env` et `version` de façon dynamique ;
- Activer le profileur en continu, l'ingestion de 100 % des traces et l'injection des ID de trace dans les logs durant la configuration.

### Configurer l'Agent Datadog pour l'APM

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive des traces à partir de votre application instrumentée. Par défaut, l'Agent Datadog est activé dans votre fichier `datadog.yaml` sous `apm_config` avec `enabled: true`, et écoute les données de tracing sur `http://localhost:8126`. Pour les environnements conteneurisés, suivez les liens ci-dessous afin d'activer la collecte de traces au sein de l'Agent Datadog.

{{< tabs >}}
{{% tab "Conteneurs" %}}

1. Définissez `apm_non_local_traffic: true` dans la section `apm_config` de votre [fichier de configuration principal `datadog.yaml`][1].

2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>

3. Une fois l'application instrumentée, le client de tracing tente d'envoyer les traces au socket de domaine Unix `/var/run/datadog/apm.socket` par défaut. Si le socket n'existe pas, les traces sont envoyées à `http://localhost:8126`.

   Si vous souhaitez spécifier un autre socket, host ou port, utilisez la variable d'environnement `DD_TRACE_AGENT_URL`. Voici quelques exemples :

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket

   ```

   ```bash
   java -javaagent:<DD-JAVA-AGENT-PATH>.jar -jar <YOUR_APPLICATION_PATH>.jar
   ```

   Vous pouvez également utiliser des propriétés système :

   ```bash
   java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
       -Ddd.trace.agent.url=$DD_TRACE_AGENT_URL \
       -jar <YOUR_APPLICATION_PATH>.jar
   ```

   Là encore, le client de tracing tente d'envoyer les statistiques au socket de domaine Unix `/var/run/datadog/dsd.socket`. Si le socket n'existe pas, les statistiques sont envoyées à `http://localhost:8125`.

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Définissez `DD_SITE` dans l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

Pour configurer l'APM Datadog dans AWS Lambda, consultez la documentation dédiée au [tracing de fonctions sans serveur][1].


[1]: /fr/tracing/serverless_functions/
{{% /tab %}}
{{% tab "Autres environnements" %}}

Le tracing est disponible pour un certain nombre d'environnements, tels que [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3] et [Azure App Services][4].

Pour les autres environnements, consultez la documentation relative aux [intégrations][5] pour l'environnement qui vous intéresse. [Contactez l'assistance][6] si vous rencontrez des problèmes de configuration.

[1]: /fr/agent/basic_agent_usage/heroku/#installation
[2]: /fr/integrations/cloud_foundry/#trace-collection
[3]: /fr/integrations/amazon_elasticbeanstalk/
[4]: /fr/infrastructure/serverless/azure_app_services/#overview
[5]: /fr/integrations/
[6]: /fr/help/
{{% /tab %}}
{{< /tabs >}}

### Instrumenter votre application

<div class="alert alert-info">Si vous recueillez des traces à partir d'une application Kubernetes ou à partir d'une application sur un host ou conteneur Linux, plutôt que de suivre les instructions ci-dessous, vous pouvez injecter la bibliothèque de tracing dans votre application. Consultez la page <a href="/tracing/trace_collection/library_injection_local">Injecter des bibliothèques</a> pour obtenir des instructions.</div>

Une fois l'Agent installé, procédez comme suit pour commencer à tracer vos applications :

1. Téléchargez le fichier `dd-java-agent.jar`, qui contient les derniers fichiers de classe de l'Agent, dans un dossier auquel votre utilisateur Datadog peut accéder :

   ```shell
   wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```

   **Remarque :** pour télécharger le dernier build d'une version **majeure** spécifique, utilisez plutôt le lien `https://dtdg.co/java-tracer-vX` en remplaçant `X` par la version majeure souhaitée.
   Par exemple, utilisez `https://dtdg.co/java-tracer-v1` pour obtenir le dernier build de la version 1. Les numéros des versions mineures ne doivent pas être inclus. Vous pouvez également récupérer n'importe quelle version spécifique depuis le [référentiel Maven][3] de Datadog.

2. Pour exécuter votre application à partir d'un IDE, d'un script d'application Maven ou Gradle, ou de la commande `java -jar`, avec le profileur en continu, le suivi des déploiements et l'injection de logs (si vous envoyez des logs à Datadog), ajoutez l'argument JVM `-javaagent` et les options de configuration suivantes, le cas échéant :

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```

    **Remarque :** l'activation du profiling est susceptible d'augmenter vos coûts, en fonction de l'offre APM que vous avez choisie. Consultez la [page des tarifs][4] pour en savoir plus.

| Variable d'environnement      | Propriété système                     | Description|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | L'environnement de votre application (`production`, `staging`, etc.). |
| `DD_SERVICE`   | `dd.service`     | Le nom d'un ensemble de processus qui effectuent la même tâche. Utilisé pour regrouper les statistiques de votre application. |
| `DD_VERSION` | `dd.version` |  La version de votre application (par exemple : `2.5`, `202003181415`, `1.3-alpha`, etc.). |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Active le [Profleur en continu][5] |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Active l'injection automatique des clés MDC pour les ID de span et de trace Datadog. Consultez la section [Utilisation avancée][6] pour en savoir plus. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Définit un taux d'échantillonnage à la racine de la trace pour tous les services.     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   Définit un taux d'échantillonnage à la racine de la trace pour les services qui correspondent à la règle spécifiée.    |

D'autres [options de configuration](#configuration) sont décrites ci-dessous.


### Ajouter le traceur Java à la JVM

Consultez la documentation de votre serveur d'application pour découvrir comment passer `-javaagent` et d'autres arguments JVM. Voici des instructions pour certains frameworks couramment utilisés :

{{< tabs >}}
{{% tab "Spring Boot" %}}

Si votre application s'appelle `my_app.jar`, créez un fichier `my_app.conf`, contenant :

```text
JAVA_OPTS=-javaagent:/chemin/vers/dd-java-agent.jar
```

Pour en savoir plus, consultez la [documentation de Spring Boot][1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

Ouvrez votre fichier de script de démarrage Tomcat, par exemple `setenv.sh` sous Linux, et ajoutez :

```text
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/chemin/vers/dd-java-agent.jar"
```

Sous Windows, il s'agit du fichier `setenv.bat` :

```text
set CATALINA_OPTS=%CATALINA_OPTS% -javaagent:"c:\chemin\vers\dd-java-agent.jar"
```
Si vous ne disposez pas de fichier `setenv`, créez-le dans le répertoire `./bin` du dossier de projet Tomcat.

{{% /tab %}}
{{% tab "JBoss" %}}

- En mode autonome :

  Ajoutez la ligne suivante à la fin de `standalone.conf` :

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/chemin/vers/dd-java-agent.jar"
```

- En mode autonome et sur Windows, ajoutez la ligne suivante à la fin de `standalone.conf.bat` :

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/chemin/vers/dd-java-agent.jar"
```

- En mode domaine :

  Ajoutez la ligne suivante dans le fichier `domain.xml`, sous le tag server-groups.server-group.jvm.jvm-options :

```text
<option value="-javaagent:/chemin/vers/dd-java-agent.jar"/>
```

Pour en savoir plus, consultez la [documentation de JBoss][1].


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

Si vous utilisez `jetty.sh` pour démarrer Jetty en tant que service, ajoutez ce qui suit :

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/chemin/vers/dd-java-agent.jar"
```

Si vous utilisez `start.ini` pour démarrer Jetty, ajoutez la ligne suivante (sous `--exec`, ou ajoutez la ligne `--exec` si elle n'est pas présente) :

```text
-javaagent:/chemin/vers/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

Dans la console d'administration :

1. Sélectionnez **Servers**. Sous **Server Type**, sélectionnez **WebSphere application servers** et choisissez votre serveur.
2. Sélectionnez **Java and Process Management > Process Definition**.
3. Dans la section **Additional Properties**, cliquez sur **Java Virtual Machine**.
4. Dans le champ de texte **Generic JVM arguments**, saisissez :

```text
-javaagent:/chemin/vers/dd-java-agent.jar
```

Pour plus d'informations et d'options, consultez la [documentation relative à WebSphere][1].

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**Remarque**

- Si vous ajoutez l'argument `-javaagent` à votre commande `java -jar`, il doit être ajouté _avant_ l'argument `-jar`, c'est-à-dire en tant qu'option JVM et non en tant qu'argument d'application. Par exemple :

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     Pour en savoir plus, consultez la [documentation Oracle][7] (en anglais).

- N'ajoutez jamais `dd-java-agent` à votre classpath. Cela peut entraîner un comportement inattendu.

## Instrumentation automatique

L'instrumentation automatique pour Java utilise les fonctionnalités d'instrumentation `java-agent` [fournies par la JVM][8]. Lorsqu'un `java-agent` est enregistré, il est capable de modifier les fichiers de classe durant le chargement.

**Remarque :** les classes chargées avec le ClassLoader à distance ne sont pas automatiquement instrumentées.

L'instrumentation peut provenir de l'instrumentation automatique, de l'API OpenTracing ou d'un mélange des deux. L'instrumentation capture généralement les informations suivantes :

- La durée est capturée à l'aide de l'horloge nanoTime de la JVM, sauf si un timestamp est fourni à partir de l'API OpenTracing
- Les paires de tags key/value
- Les erreurs et les stack traces non gérées par l'application
- Le nombre total de traces (requêtes) transmises via le système

## Configuration

Au besoin, configurez la bibliothèque de tracing pour envoyer des données de télémétrie relatives aux performances de l'application, notamment en configurant le tagging de service unifié. Consultez la section [Configuration de la bibliothèque][9] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[4]: /fr/account_management/billing/apm_tracing_profiler/
[5]: /fr/profiler/
[6]: /fr/tracing/other_telemetry/connect_logs_and_traces/java/
[7]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /fr/tracing/trace_collection/library_config/java/
[10]: /fr/tracing/trace_collection/compatibility/java/#supported-jvm-runtimes

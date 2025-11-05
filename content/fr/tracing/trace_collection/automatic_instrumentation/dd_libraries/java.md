---
aliases:
- /fr/tracing/java
- /fr/tracing/languages/java
- /fr/agent/apm/java/
- /fr/tracing/setup/java
- /fr/tracing/setup_overview/java
- /fr/tracing/setup_overview/setup/java
- /fr/tracing/trace_collection/dd_libraries/java/
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: Code source
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

## Prise en main

Avant de commencer, vérifiez que vous avez bien [installé et configuré l'Agent][18].

### Instrumenter votre application

Après avoir installé et configuré votre Agent Datadog, l'étape suivante consiste à ajouter la bibliothèque de traçage directement dans l'application afin de l'instrumenter. Pour en savoir plus, consultez les [informations de compatibilité][1].

Pour commencer à tracer vos applications :

1. Téléchargez le fichier `dd-java-agent.jar`, qui contient les derniers fichiers de classe de l'Agent, dans un dossier auquel votre utilisateur Datadog peut accéder :

{{< tabs >}}
{{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}

   **Remarque :** pour télécharger la dernière build d’une version **majeure** spécifique, utilisez le lien `https://dtdg.co/java-tracer-vX`, où `X` est le numéro de version majeure souhaité.
   Par exemple, utilisez `https://dtdg.co/java-tracer-v1` pour la dernière build de la version 1. Ne pas inclure de numéro de version mineure. Vous pouvez aussi consulter le [dépôt Maven][3] de Datadog pour toute version spécifique.

   **Remarque** : les versions Release Candidate sont disponibles sur GitHub [DataDog/dd-trace-java releases][21]. Elles portent la mention "RC" dans la version et sont recommandées pour des tests en dehors de votre environnement de production. Vous pouvez [vous abonner aux notifications de publication de GitHub][20] pour être informé lorsque de nouvelles Release Candidates sont disponibles pour des tests. Si vous rencontrez des problèmes avec les Release Candidates, contactez [l'assistance Datadog][22].

2. Pour exécuter votre application à partir d'un IDE, d'un script d'application Maven ou Gradle, ou de la commande `java -jar`, avec le profileur en continu, le suivi des déploiements et l'injection de logs (si vous envoyez des logs à Datadog), ajoutez l'argument JVM `-javaagent` et les options de configuration suivantes, le cas échéant :

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    Si vous avez besoin de réduire la taille de votre image et d'omettre des modules, vous pouvez utiliser la commande [jdeps][19] pour identifier les dépendances. Cependant, les modules requis peuvent changer au fil du temps, c'est donc à vos risques et périls.

    <div class="alert alert-warning">L'activation du profilage peut avoir un impact sur votre facture en fonction de votre forfait APM. Pour plus d'informations, consultez la <a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">page des tarifs</a>.</div>

| Variable d'environnement      | Propriété système                     | Rôle|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | L'environnement de votre application (`production`, `staging`, etc.). |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Activez l'injection automatique des clés MDC pour les IDs de trace et de span Datadog. Consultez la section [Utilisation avancée][6] pour en savoir plus. <br><br>À partir de la version 1.18.3, si la [configuration à distance de l'Agent][16] est activée là où ce service est exécuté, vous pouvez définir `DD_LOGS_INJECTION` dans l'interface utilisateur du [Software Catalog][17]. |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Activer le [Continuous Profiler][5] |
| `DD_SERVICE`   | `dd.service`     | Le nom d'un ensemble de processus qui effectuent la même tâche. Utilisé pour regrouper les statistiques de votre application. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Définissez un taux d'échantillonnage à la racine de la trace pour tous les services. <br><br>À partir de la version 1.18.3, si la [configuration à distance de l'Agent][16] est activée là où ce service est exécuté, vous pouvez définir `DD_TRACE_SAMPLE_RATE` dans l'interface utilisateur du [Software Catalog][17].     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   Définit un taux d'échantillonnage à la racine de la trace pour les services qui correspondent à la règle spécifiée.    |
| `DD_VERSION` | `dd.version` |  Version de votre application (par exemple, `2.5`, `202003181415` ou `1.3-alpha`) |

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

#### Linux

Pour activer le traçage lors de l'exécution de Tomcat sous Linux :

1. Ouvrez votre fichier script de démarrage Tomcat, par exemple `setenv.sh`.
2. Ajoutez ce qui suit à `setenv.sh`:
   ```text
   CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
   ```

#### Windows (Tomcat en tant que service Windows)

Pour activer le traçage lors de l'exécution de Tomcat en tant que service Windows :

1. Ouvrez l'utilitaire de maintenance « tomcat@VERSION_MAJOR@w.exe » situé dans le répertoire ./bin du dossier projet Tomcat.
2. Accédez à l'onglet **Java** et ajoutez ce qui suit à `Java Options` :
```text
-javaagent:C:\Npathto\Ndd-java-agent.jar
```
3. Redémarrez vos services Tomcat pour que les modifications soient prises en compte.

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
[11]: /fr/tracing/trace_collection/library_injection_local/
[16]: /fr/agent/remote_config/
[17]: https://app.datadoghq.com/services
[18]: /fr/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html
[20]: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions
[21]: https://github.com/DataDog/dd-trace-java/releases
[22]: https://docs.datadoghq.com/fr/getting_started/support/
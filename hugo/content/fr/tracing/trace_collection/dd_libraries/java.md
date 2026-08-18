---
aliases:
- /fr/tracing/java
- /fr/tracing/languages/java
- /fr/agent/apm/java/
- /fr/tracing/setup/java
- /fr/tracing/setup_overview/java
- /fr/tracing/setup_overview/setup/java
- /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/java
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://github.com/DataDog/dd-trace-java
  tag: Code source
  text: Code source de l'APM Datadog Java
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: https://learn.datadoghq.com/courses/apm-java-host
  tag: Centre d'apprentissage
  text: Configurez APM pour les applications Java
title: Tracer des applications Java
type: multi-code-lang
---
## Exigences de compatibilité {#compatibility-requirements}

Le dernier traceur Java prend en charge toutes les versions de JVM à partir de 8. Pour des informations supplémentaires sur les versions de JVM inférieures à 8, lisez [Runtimes JVM pris en charge][10].

Pour obtenir la liste complète des frameworks et versions Java pris en charge (y compris les anciennes versions et les versions de maintenance), consultez la section relative aux [exigences de compatibilité][1].

## Démarrage {#getting-started}

Avant de commencer, vérifiez que vous avez bien [installé et configuré l'Agent][18].

### Instrumentez votre application {#instrument-your-application}

Après avoir installé et configuré votre agent Datadog, l'étape suivante consiste à ajouter le SDK directement dans l'application pour l'instrumenter. En savoir plus sur [informations de compatibilité][1].

Pour commencer à tracer vos applications :

1. Téléchargez `dd-java-agent.jar` qui contient les derniers fichiers de classe du traceur, dans un dossier accessible par votre utilisateur Datadog :

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

   **Remarque :** Pour télécharger la dernière version d'une version **majeure** spécifique, utilisez le `https://dtdg.co/java-tracer-vX` lien à la place, où `X` est la version majeure souhaitée.
   Par exemple, utilisez `https://dtdg.co/java-tracer-v1` pour la dernière version 1. Les numéros de version mineure ne doivent pas être inclus. Vous pouvez également récupérer n'importe quelle version spécifique depuis le [référentiel Maven][3] de Datadog.

   **Remarque** : Les versions candidates (Release Candidate) sont disponibles sur GitHub [DataDog/dd-trace-java releases][21]. Celles-ci contiennent "RC" dans la version et sont recommandées pour des tests en dehors de votre environnement de production. Vous pouvez [vous abonner aux notifications de version GitHub][20] pour être informé lorsque de nouveaux Release Candidates sont disponibles pour des tests. Si vous rencontrez des problèmes avec les versions candidates (Release Candidates), contactez [le support Datadog][22].

2. Pour exécuter votre application depuis un IDE, un script d'application Maven ou Gradle, ou `java -jar` une commande, avec le Continuous Profiler, le suivi des déploiements et l'injection de journaux (si vous envoyez des journaux à Datadog), ajoutez l'argument `-javaagent` JVM et les options de configuration suivantes, selon le cas :

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    **Note**: If you have a strong need to reduce the size of your image and omit modules, you can use the [`jdeps`][19] command to identify dependencies. However, required modules can change over time, so do this at your own risk.

    **Note**: When running the SDK with Java 24+, you may see warnings related to JNI native access. Suppress these warnings by adding the `--enable-native-access=ALL-UNNAMED` flag. See [JEP 472][23] for more details.

    <div class="alert alert-warning">L'activation du profilage peut avoir un impact sur votre facture en fonction de votre forfait APM. Consultez la <a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">page de tarification</a> pour plus d'informations.</div>

| Variable d'environnement      | Propriété système                     | Description|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | Votre environnement d'application (`production`, `staging`, etc.) |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Activez l'injection automatique de clés MDC pour les identifiants de trace et de span Datadog. Voir [Utilisation avancée][6] pour plus de détails. <br><br>À partir de la version 1.18.3, si [Configuration à distance de l'agent][16] est activée où ce service s'exécute, vous pouvez définir `DD_LOGS_INJECTION` dans l'interface utilisateur du [Catalogue de logiciels][17]. |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Activez le [Continuous Profiler][5] |
| `DD_SERVICE`   | `dd.service`     | Le nom d'un ensemble de processus qui effectuent le même travail. Utilisé pour regrouper les statistiques de votre application. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Définissez un taux d'échantillonnage à la racine de la trace pour tous les services. <br><br> À partir de la version 1.18.3, si [Configuration à distance de l'agent][16] est activée où ce service s'exécute, vous pouvez définir `DD_TRACE_SAMPLE_RATE` dans l'interface utilisateur du [Catalogue de logiciels][17].     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   Définissez un taux d'échantillonnage à la racine de la trace pour les services qui correspondent à la règle spécifiée.    |
| `DD_VERSION` | `dd.version` |  Votre version d'application (par exemple, `2.5`, `202003181415` ou `1.3-alpha`) |

Des options de [configuration supplémentaires](#configuration) sont décrites ci-dessous.


### Ajoutez le SDK Java à la JVM {#add-the-java-sdk-to-the-jvm}

Utilisez la documentation de votre serveur d'application pour déterminer la bonne façon de passer `-javaagent` et d'autres arguments JVM. Voici des instructions pour certains frameworks couramment utilisés :

{{< tabs >}}
{{% tab "Spring Boot" %}}

Si votre application s'appelle `my_app.jar`, créez un `my_app.conf`, contenant :

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

Pour en savoir plus, consultez la [documentation relative à Spring Boot][1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

#### Linux {#linux}

Pour activer le traçage lors de l'exécution de Tomcat sous Linux :

1. Ouvrez votre fichier de script de démarrage Tomcat, par exemple `setenv.sh`.
2. Ajoutez ce qui suit à `setenv.sh` :
   ```text
   CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
   ```

#### Windows (Tomcat en tant que service Windows) {#windows-tomcat-as-a-windows-service}

Pour activer le traçage lors de l'exécution de Tomcat en tant que service Windows :

1. Ouvrez l'utilitaire de maintenance "tomcat@VERSION_MAJOR@w.exe" situé dans le répertoire `./bin` du dossier du projet Tomcat.
2. Naviguez vers l'onglet **Java**, et ajoutez ce qui suit à `Java Options` :

```text
-javaagent:C:\path\to\dd-java-agent.jar
```
3. Redémarrez vos services Tomcat pour que les modifications prennent effet.

{{% /tab %}}
{{% tab "JBoss" %}}

- En mode autonome :

  Ajoutez la ligne suivante à la fin de `standalone.conf` :

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- En mode autonome et sur Windows, ajoutez la ligne suivante à la fin de `standalone.conf.bat` :

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- En mode domaine :

  Ajoutez la ligne suivante dans le fichier `domain.xml`, sous la balise server-groups.server-group.jvm.jvm-options :

```text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

Pour en savoir plus, consultez la [documentation relative à JBoss][1].


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

Si vous utilisez `jetty.sh` pour démarrer Jetty en tant que service, modifiez-le pour ajouter :

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

Si vous utilisez `start.ini` pour démarrer Jetty, ajoutez la ligne suivante (sous `--exec`, ou ajoutez la ligne `--exec` si elle n'est pas encore là) :

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

Dans la console d'administration :

1. Sélectionnez **Serveurs**. Sous **Type de serveur**, sélectionnez **serveurs d'application WebSphere** et sélectionnez votre serveur.
2. Sélectionnez **Java et Gestion des processus > Définition du processus**.
3. Dans la section **Propriétés supplémentaires**, cliquez sur **Machine virtuelle Java**.
4. Dans le champ de texte **Arguments JVM génériques**, entrez :

```text
-javaagent:/path/to/dd-java-agent.jar
```

Pour plus d'informations et d'options, consultez la [documentation de WebSphere][1].

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**Remarque**

- Si vous ajoutez l'argument `-javaagent` à votre commande `java -jar`, il doit être ajouté _avant_ l'argument `-jar`, en tant qu'option JVM, et non en tant qu'argument d'application. Exemple :

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     For more information, see the [Oracle documentation][7].

- N'ajoutez jamais `dd-java-agent` à votre classpath. Cela peut provoquer un comportement inattendu.

## Instrumentation automatique {#automatic-instrumentation}

L'instrumentation automatique pour Java utilise les capacités d'instrumentation `java-agent` [fournies par la JVM][8]. Lorsqu'un `java-agent` est enregistré, il peut modifier les fichiers de classe au moment du chargement.

**Remarque&nbsp;:** Les classes chargées avec un ClassLoader distant ne sont pas instrumentées automatiquement.

L'instrumentation peut provenir de l'auto-instrumentation, de l'API OpenTracing, ou d'un mélange des deux. L'instrumentation capture généralement les informations suivantes :

- La durée de temporisation est capturée à l'aide de l'horloge NanoTime de la JVM, sauf si un horodatage est fourni par l'API OpenTracing
- Paires de balises clé/valeur
- Erreurs et traces de pile qui ne sont pas gérées par l'application
- Un compte total de traces (requêtes) circulant dans le système

## Configuration {#configuration}

Si nécessaire, configurez le SDK pour envoyer les données de télémétrie de performance de l'application selon vos besoins, y compris la configuration du Unified Service Tagging. Lisez [Configuration de la bibliothèque][9] pour plus de détails.

### Configuration distante {#remote-configuration}

La Configuration distante permet à l'Agent Datadog de configurer dynamiquement les paramètres de traçage sans nécessiter de redémarrages d'application. Par défaut, la Configuration distante est activée. Pour le désactiver, définissez la variable d'environnement :

```
DD_REMOTE_CONFIG_ENABLED=false
```

Ou ajoutez la propriété système JVM :

```
-Ddd.remote_config.enabled=false
```

## Lectures complémentaires {#further-reading}

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
[16]: /fr/tracing/guide/remote_config
[17]: https://app.datadoghq.com/services
[18]: /fr/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html
[20]: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions
[21]: https://github.com/DataDog/dd-trace-java/releases
[22]: https://docs.datadoghq.com/fr/getting_started/support/
[23]: https://openjdk.org/jeps/472
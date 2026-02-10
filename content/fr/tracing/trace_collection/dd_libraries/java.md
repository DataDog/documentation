---
title: Tracer des applications Java
aliases:
    - /tracing/java
    - /tracing/languages/java
    - /agent/apm/java/
    - /tracing/setup/java
    - /tracing/setup_overview/java
    - /tracing/setup_overview/setup/java
    - /tracing/trace_collection/automatic_instrumentation/dd_libraries/java
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-java'
      tag: "Source Code"
      text: 'Code source de l''APM Datadog Java'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explorer vos services, ressources et traces'
---
## Exigences de compatibilité

Le dernier traceur Java prend en charge toutes les versions de JVM 8 et supérieures. Pour des informations supplémentaires sur les versions de JVM inférieures à 8, lisez [Runtimes JVM pris en charge][10].

Pour obtenir la liste complète des frameworks et versions Java pris en charge (y compris les anciennes versions et les versions de maintenance), consultez la section relative aux \[exigences de compatibilité]\[1].

## Débuter

Avant de commencer, vérifiez que vous avez bien \[installé et configuré l'Agent]\[14].

### Instrumenter votre application

Après avoir installé et configuré votre Agent Datadog, l'étape suivante consiste à ajouter la bibliothèque de traçage directement dans l'application pour l'instrumenter. Lisez-en plus sur [les informations de compatibilité][1].

Pour commencer à tracer vos applications :

1. Téléchargez `dd-java-agent.jar` qui contient les derniers fichiers de classe de traceur, dans un dossier accessible par votre utilisateur Datadog :

...
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
...
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
...
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
...

   **Remarques :** Pour télécharger la dernière version d'une version **majeure** spécifique, utilisez le lien `https://dtdg.co/java-tracer-vX` à la place, où `X` est la version majeure souhaitée. Par exemple, utilisez `https://dtdg.co/java-tracer-v1` pour la dernière version 1 build. Les numéros de version mineure ne doivent pas être inclus. Alternativement, consultez le [référentiel Maven de Datadog][3] pour toute version spécifique.

   note Les versions Release Candidate sont disponibles sur GitHub [DataDog/dd-trace-java releases][21]. Celles-ci contiennent "RC" dans la version et sont recommandées pour des tests en dehors de votre environnement de production. Vous pouvez [s'abonner aux notifications de version GitHub][20] pour être informé lorsque de nouveaux Release Candidates sont disponibles pour les tests. Si vous rencontrez des problèmes avec les Release Candidates, contactez [le support Datadog][22].

2. Pour exécuter votre application depuis un IDE, un script d'application Maven ou Gradle, ou `java -jar` commande, avec le Profiler Continu, le suivi des déploiements et l'injection de logs (si vous envoyez des logs à Datadog), ajoutez l'argument `-javaagent` JVM et les options de configuration suivantes, selon le cas :

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    note Si vous avez un besoin urgent de réduire la taille de votre image et d'omettre des modules, vous pouvez utiliser la commande [`jdeps`][19] pour identifier les dépendances. Cependant, les modules requis peuvent changer au fil du temps, faites-le donc à vos propres risques.

    note Lors de l'activation du traceur pour Java 24+, vous pouvez voir des avertissements liés à l'accès natif JNI ou à `sun.misc.Unsafe` l'accès mémoire. Supprimez ces avertissements en ajoutant les variables d'environnement `--illegal-native-access=allow` et `--sun-misc-unsafe-memory-access=allow` juste avant l'argument `-javaagent:/path/to/dd-java-agent.jar`. Voir [JEP 472][23] et [JEP 498][24] pour plus d'informations.

    <div class="alert alert-warning">L'activation du profilage peut avoir un impact sur votre facture en fonction de votre bundle APM. Voir la <a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">page de tarification</a> pour plus d'informations.</div>

| Variable d'environnement      | Propriété système                     | Description|
| --------- | --------------------------------- | ------------ |
| ...      | ...                  | Votre environnement d'application (`production`, `staging`, etc.) |
| ...   | ...     | Activer l'injection automatique de clé MDC pour les identifiants de trace et de span Datadog. Voir [Utilisation avancée][6] pour plus de détails. <br><br>À partir de la version 1.18.3, si [la configuration à distance de l'agent][16] est activée où ce service s'exécute, vous pouvez définir `DD_LOGS_INJECTION` dans l'interface utilisateur du [catalogue de logiciels][17]. |
| ...      | ...          | Activer le \[Continuous Profiler]\[5] |
| ...   | ...     | Le nom d'un ensemble de processus qui effectuent le même travail. Utilisé pour regrouper les statistiques de votre application. |
| ... | ... |   Définit un taux d'échantillonnage à la racine de la trace pour tous les services. <br><br> À partir de la version 1.18.3, si [la configuration à distance de l'agent][16] est activée où ce service s'exécute, vous pouvez définir `DD_TRACE_SAMPLE_RATE` dans l'interface utilisateur du [catalogue de logiciels][17].     |
| ... | ... |   Définit un taux d'échantillonnage à la racine de la trace pour les services qui correspondent à la règle spécifiée.    |
| ... | ... |  La version de votre application (par exemple, `2.5`, `202003181415` ou `1.3-alpha`) |

Des [options de configuration](#configuration) supplémentaires sont décrites ci-dessous.


### Ajouter le traceur Java à la JVM

Utilisez la documentation de votre serveur d'application pour déterminer la bonne façon de passer `-javaagent` et d'autres arguments JVM. Voici des instructions pour certains frameworks couramment utilisés :

...

Si votre application s'appelle `my_app.jar`, créez un `my_app.conf`, contenant :

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

Pour en savoir plus, consultez la \[documentation relative à Spring Boot]\[1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
...

#### Linux

Pour activer le traçage lors de l'exécution de Tomcat sous Linux :

1. Ouvrez votre fichier de script de démarrage Tomcat, par exemple `setenv.sh`.
2. Ajoutez ce qui suit à `setenv.sh` :
   ```text
   CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
   ```

#### Windows (Tomcat en tant que service Windows)

Pour activer le traçage lors de l'exécution de Tomcat en tant que service Windows :

1. Ouvrez l'utilitaire de maintenance "tomcat@VERSION_MAJOR@w.exe" situé dans le répertoire `./bin` du dossier du projet Tomcat.
2. Accédez à l'onglet **Java** et ajoutez ce qui suit à `Java Options` :
```text
-javaagent:C:\path\to\dd-java-agent.jar
```
3. Redémarrez vos services Tomcat pour que les modifications soient prises en compte.

...

- En mode autonome :

  Ajoutez la ligne suivante à la fin de `standalone.conf` :

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- En mode autonome et sous Windows, ajoutez la ligne suivante à la fin de `standalone.conf.bat` :

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- En mode domaine :

  Ajoutez la ligne suivante dans le fichier `domain.xml`, sous la balise server-groups.server-group.jvm.jvm-options :

```text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

Pour en savoir plus, consultez la \[documentation relative à JBoss]\[1].


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
...

Si vous utilisez `jetty.sh` pour démarrer Jetty en tant que service, modifiez-le pour ajouter :

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

Si vous utilisez `start.ini` pour démarrer Jetty, ajoutez la ligne suivante (sous `--exec`, ou ajoutez la ligne `--exec` si elle n'est pas encore là) :

```text
-javaagent:/path/to/dd-java-agent.jar
```

...

Dans la console d'administration :

1. Sélectionnez **Serveurs**. Sous **Type de serveur**, sélectionnez **serveurs d'applications WebSphere** et sélectionnez votre serveur.
2. Sélectionnez \*\*Java and Process Management > Process Definition\*\*.
3. Dans la section \*\*Additional Properties\*\*, cliquez sur \*\*Java Virtual Machine\*\*.
4. Dans le champ de texte \*\*Generic JVM arguments\*\*, saisissez :

```text
-javaagent:/path/to/dd-java-agent.jar
```

Pour plus d'informations et d'options, consultez la \[documentation de WebSphere]\[1].

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
...

**Note**

- Si vous ajoutez l'argument `-javaagent` à votre commande `java -jar`, il doit être ajouté _avant_ l'argument `-jar`, en tant qu'option JVM, et non en tant qu'argument d'application. Exemple :

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     Pour en savoir plus, consultez la \[documentation Oracle]\[7] (en anglais).

- N'ajoutez jamais `dd-java-agent` à votre classpath. Cela peut provoquer un comportement inattendu.

## Instrumentation automatique

L'instrumentation automatique pour Java utilise les capacités d'instrumentation `java-agent` [fournies par la JVM][8]. Lorsqu'un `java-agent` est enregistré, il peut modifier les fichiers de classe au moment du chargement.

**Remarques :** Les classes chargées avec un ClassLoader distant ne sont pas instrumentées automatiquement.

L'instrumentation peut provenir de l'auto-instrumentation, de l'API OpenTracing, ou d'un mélange des deux. L'instrumentation capture généralement les informations suivantes :

- La durée est capturée à l'aide de l'horloge nanoTime de la JVM, sauf si un timestamp est fourni à partir de l'API OpenTracing
- Les paires de tags clé/valeur
- Les erreurs et les stack traces non gérées par l'application
- Le nombre total de traces (requêtes) transmises via le système

## Créez un fichier \`conf.yaml\` dans le dossier \`logstash.d/\` précédemment créé.

Si nécessaire, configurez la bibliothèque de traçage pour envoyer les données de télémétrie de performance de l'application comme vous le souhaitez, y compris la configuration du Tagging de Service Unifié. Lisez [Configuration de la bibliothèque][9] pour plus de détails.

### Configuration à distance

La Configuration distante permet à l'Agent Datadog de configurer dynamiquement les paramètres de traçage sans nécessiter de redémarrages d'application. Par défaut, la Configuration distante est activée. Pour la désactiver, définissez la variable d'environnement :

```
DD_REMOTE_CONFIG_ENABLED=false
```

Ou ajoutez la propriété système JVM :

```
-Ddd.remote_config.enabled=false
```

## Pour aller plus loin

...


[1]: /tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[4]: /account_management/billing/apm_tracing_profiler/
[5]: /profiler/
[6]: /tracing/other_telemetry/connect_logs_and_traces/java/
[7]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /tracing/trace_collection/library_config/java/
[10]: /tracing/trace_collection/compatibility/java/#supported-jvm-runtimes
[11]: /tracing/trace_collection/library_injection_local/
[16]: /tracing/guide/remote_config
[17]: https://app.datadoghq.com/services
[18]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html
[20]: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions
[21]: https://github.com/DataDog/dd-trace-java/releases
[22]: https://docs.datadoghq.com/getting_started/support/
[23]: https://openjdk.org/jeps/472
[24]: https://openjdk.org/jeps/498

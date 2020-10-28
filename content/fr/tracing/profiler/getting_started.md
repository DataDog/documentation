---
title: Débuter
kind: Documentation
aliases:
  - /fr/tracing/profiling/getting_started
further_reading:
  - link: tracing/profiler/search_profiles
    tag: Documentation
    text: En savoir plus sur les types de profils disponibles
  - link: tracing/profiler/profiler_troubleshooting
    tag: Documentation
    text: Résoudre les problèmes rencontrés en utilisant le profileur
  - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
    tags: Blog
    text: Présentation du profiling continu en production dans Datadog
---
Le profileur est fourni au sein des bibliothèques de tracing suivantes. Sélectionnez votre langage ci-dessous afin d'activer le profileur pour votre application :

Pour accéder au profileur **Node**, **Ruby**, **PHP** ou **.NET**, [inscrivez-vous][1] à la bêta privée. Nous vous préviendrons lorsque la bêta sera prête.

{{< tabs >}}
{{% tab "Java" %}}

Le profileur Datadog nécessite [Java Flight Recorder][1]. La bibliothèque du profileur Datadog est prise en charge par OpenJDK 11+, Oracle Java 11+,  [OpenJDK 8 pour la plupart des fournisseurs (version 8u262)][2] et Zulu Java 8+ (version mineure 1.8.0_212+). Tous les langages basés sur JVM, tels que Scala, Groovy, Kotlin, ou encore Clojure sont pris en charge. Pour commencer le profiling d'applications :

1. Si vous utilisez déjà Datadog, mettez votre Agent à jour vers la version [7.20.2][3]+ ou [6.20.2][3]+. Si l'APM n'est pas activé et que votre application n'est pas configurée pour envoyer des données à Datadog, dans votre Agent, définissez la variable d'environnement `DD_APM_ENABLED` sur `true` et le port d'écoute sur `8126/TCP`.

2. Téléchargez `dd-java-agent.jar`, qui contient les fichiers de classe de l'Agent Java :

    ```shell
    wget -O dd-java-agent.jar 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.datadoghq&a=dd-java-agent&v=LATEST'
    ```

     **Remarque** : le profileur est disponible dans la bibliothèque `dd-java-agent.jar` dans la version 0.55 et les versions ultérieures.

3. Définissez le flag `-Ddd.profiling.enabled` ou la variable d'environnement `DD_PROFILING_ENABLED` sur `true`. Mettez à jour l'appel de votre service tel que ci-dessous :

    ```diff
    java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
    ```

4. Au bout d'une ou de deux minutes, visualisez vos profils en accédant à [l'APM Datadog puis à la page Profiling][4].


**Remarques** :

- L'argument `-javaagent` doit figurer avant `-jar` et être ajouté en tant qu'option JVM et non en tant qu'argument d'application. Pour en savoir plus, consultez la [documentation Oracle][5] (en anglais) :

    ```shell
    # Good:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # Bad:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

- Nous vous conseillons vivement de spécifier les tags `service` et `version` pour vous permettre de filtrer vos profils selon ces dimensions. Utilisez des variables d'environnement pour définir ces paramètres :

| Variable d'environnement                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Booléen       | Alternative à l'argument `-Ddd.profiling.enabled`. Définissez cette variable d'environnement sur `true` pour activer le profileur.               |
| `DD_SERVICE`                                     | Chaîne        | Le nom de votre [service][3], par exemple, `web-backend`.     |
| `DD_ENV`                                         | Chaîne        | Le nom de votre [environnement][6], par exemple `production`.|
| `DD_VERSION`                                     | Chaîne        | La version de votre service.                             |
| `DD_TAGS`                                        | Chaîne        | Les tags à appliquer à un profil importé. Doit correspondre à une liste de paires `<key>:<value>` séparées par des virgules, par exemple : `layer:api, team:intake`.  |


[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[2]: /fr/tracing/profiler/profiler_troubleshooting/#java-8-support
[3]: https://app.datadoghq.com/account/settings#agent/overview
[4]: https://app.datadoghq.com/profiling
[5]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[6]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{% tab "Python" %}}

Le profileur Datadog nécessite Python 2.7 ou une version ultérieure. Le profiling de mémoire est disponible sur Python 3.5 ou les versions ultérieures. Pour commencer le profiling d'applications :

1. Si vous utilisez déjà Datadog, mettez votre Agent à niveau vers la version [7.20.2][1] ou [6.20.2][1]+.

2. Installez `ddtrace`, qui contient le tracing et le profileur :

    ```shell
    pip install ddtrace
    ```

     **Remarque** : le profileur est disponible dans la bibliothèque `ddtrace` dans la version 0.36 et les versions ultérieures.

3. Pour effectuer automatiquement le profiling de votre code, définissez la variable d'environnement `DD_PROFILING_ENABLED` sur `true` lorsque vous utilisez `ddtrace-run` :

    ```
    DD_PROFILING_ENABLED=true ddtrace-run python app.py
    ```
    **Remarque :** la variable d'environnement `DD_PROFILING_ENABLED` n'est prise en charge que dans les versions 0.40+ de `dd-trace`. Utilisez l'autre méthode si vous exécutez une version plus ancienne de `dd-trace`.

    **Autre méthode**

    Si vous préférez instrumenter le profileur dans votre code, importez `ddtrace.profile.auto`. Une fois l'importation terminée, le profileur démarre :

    ```python
    import ddtrace.profiling.auto
    ```

4. Au bout d'une ou de deux minutes, visualisez vos profils en accédant à [l'APM Datadog puis à la page Profiler][2].

**Remarques** :

- Vous pouvez également effectuer le profiling de votre service en l'exécutant avec le wrapper `pyddprofile` :

    ```shell
    $ pyddprofile server.py
    ```

- Nous vous conseillons vivement d'ajouter des tags tels que `service` et `version` pour vous permettre de filtrer vos profils selon ces dimensions et ainsi d'améliorer votre expérience globale du produit. Utilisez des variables d'environnement pour définir les paramètres :

| Variable d'environnement                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Booléen       | Définissez ce paramètre sur `true` pour activer le profileur. Pris en charge à partir de la version 0.40+ du tracker.              |
| `DD_SERVICE`                                     | Chaîne        | Le nom du [service][3] Datadog.     |
| `DD_ENV`                                         | Chaîne        | Le nom de l'[environnement][4] Datadog, par exemple `production`. |
| `DD_VERSION`                                     | Chaîne        | La version de votre application.                             |
| `DD_TAGS`                                        | Chaîne        | Les tags à appliquer à un profil importé. Doit correspondre à une liste de paires `<key>:<value>` séparées par des virgules, par exemple : `layer:api,team:intake`.   |

<div class="alert alert-info">
Conseillé pour une utilisation avancée uniquement.
</div>

- Lorsque votre processus est dupliqué via `os.fork`, le profileur est arrêté dans le processus enfant.

  Pour Python 3.7+ sur les plateformes POSIX, un nouveau profileur est lancé si vous avez activé le profileur via `pyddprofile` ou `ddtrace.profiling.auto`.

  Si vous créez manuellement un `Profiler()`, utilisez Python < 3.6, ou procédez à l'exécution sur une plateforme non conforme à POSIX, redémarrez manuellement le profileur dans votre enfant avec :

   ```python
   ddtrace.profiling.auto.start_profiler()
   ```

- Si vous souhaitez contrôler manuellement le cycle de vie du profileur, utilisez l'objet `ddtrace.profiling.profiler.Profiler` :

    ```python
    from ddtrace.profiling import Profiler

    prof = Profiler()
    prof.start()

    # At shutdown
    prof.stop()
    ```

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/profiling
[3]: /fr/tracing/visualization/#services
[4]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{% tab "Go" %}}

Le profileur Datadog nécessite Go 1.12 ou une version ultérieure. Pour commencer le profiling d'applications :

1. Si vous utilisez déjà Datadog, mettez votre Agent à niveau vers la version [7.20.2][1] ou [6.20.2][1]+.

2. Accédez à `dd-trace-go` en utilisant la commande :

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1
    ```

     **Remarque** : le profileur est disponible dans la bibliothèque `dd-trace-go` dans la version 1.23.0 et les versions ultérieures.

3. Importez le [profileur][2] au démarrage de votre application :

    ```Go
    import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
    ```

4. Ajoutez le snippet suivant pour démarrer le profileur :

    ```Go
    err := profiler.Start(
        profiler.WithService("<SERVICE_NAME>"),
        profiler.WithEnv("<ENVIRONMENT>"),
        profiler.WithVersion("<APPLICATION_VERSION>"),
        profiler.WithTags("<KEY1>:<VALUE1>,<KEY2>:<VALUE2>"),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

4. Au bout d'une ou de deux minutes, visualisez vos profils en accédant à [l'APM Datadog puis à la page Profiler][3].

**Remarques** :

- Nous vous conseillons vivement d'ajouter des tags tels que `service` et `version` pour vous permettre de filtrer vos profils selon ces dimensions et ainsi d'améliorer votre expérience globale du produit. Utilisez la configuration du profileur pour définir les paramètres :

| Méthode | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | Chaîne        | Le nom du [service][4] Datadog, par exemple `my-web-app`.             |
|  WithEnv         | Chaîne        | Le nom de l'[environnement][5] Datadog, par exemple `production`.         |
|  WithVersion     | Chaîne        | La version de votre application.                                                                             |
|  WithTags        | Chaîne        | Les tags à appliquer à un profil importé. Doit correspond à une liste au format `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. |

- Vous pouvez également définir la configuration du profileur à l'aide de variables d'environnement :

| Variable d'environnement                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_SERVICE`                                     | Chaîne        | Le nom du [service][4] Datadog.     |
| `DD_ENV`                                         | Chaîne        | Le nom de l'[environnement][5] Datadog, par exemple `production`. |
| `DD_VERSION`                                     | Chaîne        | La version de votre application.                             |
| `DD_TAGS`                                        | Chaîne        | Les tags à appliquer à un profil importé. Doit correspondre à une liste de paires `<key>:<value>` séparées par des virgules, par exemple : `layer:api,team:intake`.   |

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[3]: https://app.datadoghq.com/profiling
[4]: /fr/tracing/visualization/#services
[5]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{< /tabs >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.google.com/forms/d/e/1FAIpQLScb9GKmKfSoY6YNV2Wa5P8IzUn02tA7afCahk7S0XHfakjYQw/viewform
---
title: Profiling
kind: Documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
    tags: Blog
    text: Présentation du profiling permanent en production dans Datadog.
  - link: tracing/profiling/proxy
    tag: Documentation
    text: Configurez votre proxy de façon à transmettre vos profils à Datadog.
---
<div class="alert alert-info">
La fonctionnalité de profiling de Datadog est en version bêta. Contactez <a href="/help/">l'assistance Datadog</a> si vous avez des problèmes ou des commentaires dont vous souhaitez nous faire part.
</div>

## Configuration

Les bibliothèques de profiling sont fournies au sein des bibliothèques de tracing suivantes. Sélectionnez votre langage ci-dessous pour activer le profiling pour votre application :

{{< tabs >}}
{{% tab "Java" %}}

Le profileur Datadog nécessite [Java Flight Recorder][1]. La bibliothèque de profiling Datadog est prise en charge par OpenJDK 11+ , Oracle Java 11+ et Zulu Java 8+ (version mineure 1.8.0_212+). Tous les langages basés sur JVM, tels que Scala, Groovy, Kotlin, ou encore Clojure sont pris en charge. Pour commencer le profiling d'applications :

1. Téléchargez `dd-java-agent.jar`, qui contient les fichiers de classe de l'Agent Java, puis ajoutez la version `dd-trace-java` à votre fichier `pom.xml` ou à un fichier équivalent :

    ```shell
    wget -O dd-java-agent.jar 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.datadoghq&a=dd-java-agent&v=LATEST'
    ```

     **Remarque** : la fonctionnalité de profiling est disponible dans la bibliothèque `dd-java-agent.jar` dans la version 0.44 et les versions ultérieures.

2. Mettez à jour l'appel de votre service tel que ci-dessous :

    ```text
    java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.api-key-file=<API_KEY_FILE> -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
    ```

    **Remarque** : avec la version 0.48 ou une version ultérieure de la bibliothèque `dd-java-agent.jar`, si votre organisation se trouve sur le site européen de Datadog, ajoutez `-Ddd.site=datadoghq.eu` ou définissez `DD_SITE=datadoghq.eu` en tant que variable d'environnement.

3. Au bout d'une ou de deux minutes, visualisez vos profils en accédant à [l'APM Datadog puis à la page Profiling][2].

**Remarques** :

- Le `-javaagent` doit être exécuté avant le fichier `-jar`, en l'ajoutant en tant qu'option JVM et non en tant qu'argument d'application. Pour en savoir plus, consultez la [documentation Oracle][3] (en anglais) :

    ```shell
    # Good:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # Bad:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

- Étant donné que les profils sont envoyés directement à Datadog sans utiliser l'Agent Datadog, vous devez transmettre une [clé d'API Datadog][4] valide.

- En guise d'alternative au transfert d'arguments, vous pouvez utiliser une variable d'environnement afin de définir ces paramètres :

| Arguments                     | Variable d'environnement      | Description                                       |
| ----------------------------- | ------------------------- | ------------------------------------------------- |
| `-Ddd.profiling.enabled`      | DD_PROFILING_ENABLED      | Définissez ce paramètre sur `true` pour activer le profiling.                |
| `-Ddd.profiling.api-key-file` | DD_PROFILING_API_KEY_FILE | Fichier qui doit contenir la clé d'API sous forme de chaîne. |
|                               | DD_PROFILING_API_KEY      | Clé d'API Datadog.                                  |
| `-Ddd.site`                   | DD_SITE                   | Le site auquel vous transmettez vos profils (version 0.48 ou ultérieure). Valeurs autorisées : `datadoghq.com` pour le site américain de Datadog (par défaut) et `datadoghq.eu` pour le site européen. |


[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[2]: https://app.datadoghq.com/profiling
[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: /fr/account_management/api-app-keys/#api-keys
{{% /tab %}}

{{% tab "Python" %}}

Le profileur Datadog nécessite Python 2.7 ou une version ultérieure. Le profiling de mémoire fonctionne uniquement sur Python 3.5 ou une version ultérieure. Pour commencer le profiling d'applications :

1. Installez `ddtrace` avec le type `profile`, qui contient le tracing et le profiling :

    ```shell
    pip install ddtrace[profiling]
    ```

     **Remarque** : la fonctionnalité de profiling est disponible dans la bibliothèque `ddtrace` dans la version 0.36 et les versions ultérieures.

2. Ajoutez une [clé d'API Datadog][1] valide dans votre variable d'environnement : `DD_PROFILING_API_KEY`.

3. Définissez `env`, `service` et `version` en tant que tags Datadog dans vos variables d'environnement.

    ```shell
    export DD_PROFILING_TAGS=env:<YOUR_ENVIRONMENT>,service:<YOUR_SERVICE>,version:<YOUR_VERSION>
    ```

4. Pour effectuer automatiquement le profiling de votre code, importez `ddtrace.profile.auto`. Une fois l'importation terminée, le profileur démarre :

    ```python
    import ddtrace.profiling.auto
    ```

5. Au bout d'une ou de deux minutes, visualisez vos profils en accédant à [l'APM Datadog puis à la page Profiling][2].

**Remarques** :

- Vous pouvez également effectuer le profiling de votre service en l'exécutant avec le wrapper `pyddprofile` :

    ```shell
    $ pyddprofile server.py
    ```

- Pour une configuration avancée du profileur ou pour ajouter des tags comme `service` ou `version`, utilisez des variables d'environnement pour définir les paramètres :

| Variable d'environnement                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_API_KEY`                                     | Chaîne        | La [clé d'API Datadog][1] à utiliser lors de l'importation des profils. Ajoutée avec la version 0.37.                                        |
| `DD_PROFILING_API_KEY`                           | Chaîne        | La [clé d'API Datadog][1] à utiliser lors de l'importation de profils. Depuis la version 0.37, cette variable est obsolète et a été remplacée par `DD_API_KEY`. |
| `DD_SITE`                                        | Chaîne        | Si votre organisation se trouve sur le site européen de Datadog, définissez cette variable sur `datadoghq.eu`.                          |
| `DD_SERVICE`                                     | Chaîne        | Le nom du [service][3] Datadog.     |
| `DD_ENV`                                         | Chaîne        | Le nom de l'[environnement][4] Datadog, par exemple `production`, qui peut être défini ici, ou dans `DD_PROFILING_TAGS` avec `DD_PROFILING_TAGS="env:production"`. |
| `DD_VERSION`                                     | Chaîne        | La version de votre application, qui peut être définie ici, ou dans `DD_PROFILING_TAGS` avec `DD_PROFILING_TAGS="version:<VERSION_APPLICATION>"`.                              |
| `DD_TAGS`                                        | Chaîne        | Les tags à appliquer à un profil importé. Doit correspondre à une liste de valeurs `key:value` séparées par des virgules, par exemple : `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. Ajoutée avec la version 0.38.   |
| `DD_PROFILING_TAGS`                              | Chaîne        | Les tags à appliquer à un profil importé. Doit correspondre à une liste de valeurs `key:value` séparées par des virgules, par exemple : `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. Depuis la version 0.38, cette variable est obsolète et a été remplacée par `DD_TAGS`.|

<div class="alert alert-info">
Conseillé pour une utilisation avancée uniquement.
</div>

- Si vous souhaitez contrôler manuellement le cycle de vie du profileur, utilisez l'objet `ddtrace.profiling.profiler.Profiler` :

    ```python
    from ddtrace.profiling import Profiler

    prof = Profiler()
    prof.start()

    # At shutdown
    prof.stop()
    ```

[1]: /fr/account_management/api-app-keys/#api-keys
[2]: https://app.datadoghq.com/profiling
[3]: /fr/tracing/visualization/#services
[4]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{% tab "Go" %}}

Le profileur Datadog nécessite Go 1.12 ou une version ultérieure. Pour commencer le profiling d'applications :

1. Accédez à `dd-trace-go` en utilisant la commande :

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1/profiler
    ```

     **Remarque** : la fonctionnalité de profiling est disponible dans la bibliothèque `dd-trace-go` dans la version 1.23.0 et les versions ultérieures.

2. Importez le [profileur][1] au démarrage de votre application :

    ```Go
    import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
    ```

3. Pour effectuer le profiling de votre code, ajoutez une [clé d'API Datadog][2], définissez votre environnement, votre service et votre version, puis démarrez le profileur :

    ```Go
    err := profiler.Start(
        profiler.WithAPIKey("<DATADOG_API_KEY>")
        profiler.WithService("<SERVICE_NAME>"),
        profiler.WithEnv("<ENVIRONMENT>"),
        profiler.WithTags("version:<APPLICATION_VERSION>"),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

4. Au bout d'une ou de deux minutes, visualisez vos profils en accédant à [l'APM Datadog puis à la page Profiling][3].

Configuration du profileur :

| Méthode | Type          | Description                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithAPIKey      | Chaîne        | La [clé d'API Datadog][2].                                                                             |
|  WithService     | Chaîne        | Le nom du [service][4] Datadog, par exemple `my-web-app`, qui peut être défini ici ou dans `DD_TAGS`.             |
|  WithEnv         | Chaîne        | Le nom de l'[environnement][5] Datadog, par exemple `production`, qui peut être défini ici ou dans `DD_TAGS`.         |
|  WithTags        | Chaîne        | Les tags à appliquer à un profil importé. Doit correspond à une liste au format `<KEY1>:<VALUE1>,<KEY2>:<VALUE2>`. |


[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[2]: /fr/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/profiling
[4]: /fr/tracing/visualization/#services
[5]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{< /tabs >}}

## Profils

Une fois la configuration du profiling terminée, les profils sont disponibles sur la page [APM > Profiling][1] de Datadog :

{{< img src="tracing/profiling/profiling_main_page.png" alt="Page principale du profiling">}}

Chaque ligne correspond au profil d'un processus pendant une courte période. Par défaut, les profils sont importés toutes les minutes. En fonction du langage, le profiling de ces processus est effectué toutes les 15 à 60 secondes.

### Recherche

Vous pouvez appliquer un filtre en fonction de tags d'infrastructure ou de tags d'application définis depuis la [configuration du tracing de votre environnement][2]. Par défaut, les facettes suivantes sont disponibles :

| Facette    | Définition                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------ |
| Env      | L'environnement sur lequel votre application s'exécute (`prod`, `staging`).                                    |
| Service  | Le nom du [service][3] que votre code exécute.                                                     |
| Version  | La version de votre code.                                                                              |
| Host     | Le hostname sur lequel votre processus profilé s'exécute. En cas d'exécution dans Kubernetes, il s'agit du nom du pod. |
| Runtime  | Le type de runtime que le processus profilé exécute (`JVM`, `CPython`).                                |
| Langage | Le langage de votre code (`Java`, `Python`).                                                          |

Les mesures suivantes sont disponibles :

| Mesure           | Définition                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CPU cores              | Somme des charges des processeurs sur tous les cœurs du processus. Cette métrique peut dépasser `100%`, et la limite théorique est `nCœurs` \* `100%`.                                                    |
| Memory Allocation | Le débit d'allocation de mémoire en `Bytes/s` pour le profiling. Cette valeur peut dépasser la quantité maximale de mémoire RAM, car elle peut faire l'objet d'un nettoyage au cours du processus. |

## Profil

Cliquez sur une ligne pour afficher un profil spécifique :

{{< img src="tracing/profiling/profile.png" alt="Un profil spécifique">}}

L'en-tête de profil contient des informations associées à votre profil, telles que le service qui l'a généré ou l'environnement et la version du code pertinents.

Quatre onglets se trouvent sous l'en-tête de profil :

| Onglet          | Définition                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Profiles     | Flamegraph et tableau de synthèse du profil consulté. Vous pouvez basculer entre plusieurs types de profils (`CPU`, `Memory allocation`) |
| Analysis     | Ensemble de fonctions heuristiques qui indiquent d'éventuels problèmes ou points à améliorer dans votre code                                                      |
| Métriques      | Métriques de profiling provenant de tous les profils du même service                                                                              |
| Runtime Info | Toutes les propriétés du runtime sous forme de texte                                                                                                     |

**Remarque** : en haut à droite de chaque profil, vous pouvez effectuer les opérations suivantes :

- Télécharger le profil
- Afficher le profil en mode plein écran

### Types de profils

Dans l'onglet **Profiles**, vous pouvez consulter tous les types de profils disponibles pour un langage donné. Les informations recueillies à propos de votre profil varient en fonction du langage.

{{< tabs >}}
{{% tab "Java" %}}

{{< img src="tracing/profiling/profile.png" alt="Un profil spécifique">}}

Une fois les profils activés, les types suivants sont recueillis :

| Type de profil             | Définition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU in Java Code         | Affiche la durée d'exécution de chaque méthode sur le processeur. Cela inclut le bytecode JVM, mais pas le code natif appelé à partir de la JVM.                                                                                                                                                                     |
| Allocation               | Affiche la quantité de mémoire de tas allouée par chaque méthode, y compris les allocations qui ont été ensuite libérées.                                                                                                                                                                                     |
| Wall Time in Native Code | Affiche le temps passé en code natif. Cette valeur inclut la durée d'exécution du code sur le processeur, de l'attente des E/S et de tout autre événement qui se produit pendant l'exécution de la méthode. Ce profil n'inclut pas le temps passé lors de l'exécution du bytecode JVM, qui constitue généralement une grande partie du code de votre application. |
| Class load               | Affiche le nombre de classes chargées par chaque méthode.                                                                                                                                                                                                                                                 |
| Error                    | Affiche le nombre d'erreurs renvoyées par chaque méthode.                                                                                                                                                                                                                                                  |
| File I/O                 | Affiche le temps passé par chaque méthode pour la lecture et l'écriture de fichiers.                                                                                                                                                                                                                                        |
| Lock                     | Affiche le temps passé par chaque méthode à attendre un verrouillage.                                                                                                                                                                                                                                               |
| Socket I/O               | Affiche le temps passé par chaque méthode à gérer des E/S de socket.                                                                                                                                                                                                                                              |


{{% /tab %}}

{{% tab "Python" %}}

Une fois les profils activés, les types suivants sont recueillis :

| Type de profil             | Définition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU         | Affiche la durée d'exécution de chaque fonction sur le processeur. Cela inclut le bytecode CPython, mais pas le code natif appelé à partir de Python.                                                                                                                                                                     |
| Allocation               | Affiche la quantité de mémoire de tas allouée par chaque fonction, y compris les allocations qui ont été ensuite libérées. Uniquement disponible avec Python 3.                                                                                                                                                                                    |
| Wall | Affiche la durée de chaque fonction. Cette valeur inclut la durée d'exécution du code sur le processeur, de l'attente des E/S et de tout autre événement qui se produit pendant l'exécution de la fonction. |
| Exceptions               | Affiche le nombre d'exceptions interceptées ou non provenant de chaque fonction.                                                                                                                                                                                                                                                 |
| Lock                     | Affiche le temps passé par chaque fonction à attendre un verrouillage.                                                                                                                                                                                                                                               |

{{% /tab %}}

{{% tab "Go" %}}

Une fois les profils activés, les types suivants sont recueillis :

| Type de profil             | Définition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU                      | Affiche la durée d'exécution de chaque fonction sur le processeur.                                                                          |
| Allocation               | Affiche la quantité de mémoire de tas allouée par chaque fonction, y compris les allocations qui ont été ensuite libérées. Cette valeur correspond à `alloc_space` pour Go. Il s'agit d'une mesure très utile pour étudier le nettoyage des charges.              |
| Allocation Count         | Affiche le nombre d'objets allouée dans le mémoire de tas par chaque fonction, y compris les allocations qui ont été ensuite libérées. Il s'agit d'une mesure très utile pour étudier le nettoyage des charges.     |
| Heap                     | Affiche la quantité de mémoire de tas allouée par chaque fonction qui demeure allouée. Cette valeur correspond à `inuse_space` pour Go. Il s'agit d'une mesure très utile pour étudier l'utilisation globale de la mémoire pour votre service.               |
| Heap Count               | Affiche le nombre d'objets alloués dans la mémoire de tas par chaque fonction et qui demeurent alloués. Il s'agit d'une mesure très utile pour étudier l'utilisation globale de la mémoire pour votre service.                              |

{{% /tab %}}

{{< /tabs >}}

## Dépannage

Si vous avez effectué toutes les étapes de configuration nécessaires et que vous ne voyez pas les profils dans la [page de recherche de profils](#rechercher-des-profils), activez le [mode debugging][4] et [ouvrez un ticket d'assistance][5] en fournissant les fichiers de débogage et les informations suivantes :

- Type et version du système d'exploitation (par exemple, Linux Ubuntu 14.04.3)
- Type, version et fournisseur du runtime (par exemple, Java OpenJDK 11 AdoptOpenJDK)

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/profiling
[2]: /fr/tracing/send_traces/#configure-your-environment
[3]: /fr/tracing/visualization/#services
[4]: /fr/tracing/troubleshooting/#tracer-debug-mode
[5]: /fr/help/
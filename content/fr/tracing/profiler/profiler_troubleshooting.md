---
title: Dépannage du profileur
kind: documentation
further_reading:
  - link: /tracing/troubleshooting
    tag: Documentation
    text: Dépannage de l'APM
---
{{< programming-lang-wrapper langs="java,python,go,ruby" >}}
{{< programming-lang lang="java" >}}

## Profils manquants sur la page de recherche de profils

Si vous avez configuré le profileur et que vous ne voyez pas les profils sur la page de recherche de profils, activez le [mode debugging][1] et [ouvrez un ticket d'assistance][2] en fournissant les fichiers de debugging et les informations suivantes :

- Type et version du système d'exploitation (par exemple, Linux Ubuntu 20.04)
- Type, version et fournisseur du runtime (par exemple, Java OpenJDK 11 AdoptOpenJDK)

[1]: /fr/tracing/troubleshooting/#tracer-debug-logs
[2]: /fr/help/

## Réduire la charge de la configuration par défaut

Si la charge de la configuration par défaut n'est pas acceptable, vous pouvez utiliser le profileur avec les paramètres de configuration minimale. Voici ce qui distingue la configuration minimale par rapport à la configuration par défaut :

- Augmentation du seuil d'échantillonnage à 500 ms pour les événements `ThreadSleep`, `ThreadPark` et `JavaMonitorWait`, contre 100 ms par défaut
- Désactivation des événements `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample` et `ExceptionCount`

Pour utiliser la configuration minimale, assurez-vous que vous disposez de la version `0.70.0` de `dd-java-agent`, puis remplacez l'appel de votre service par ce qui suit :

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=minimal -jar <VOTRE_SERVICE>.jar <VOS_FLAGS_DE_SERVICE>
```

## Augmenter la granularité des informations du profileur

Si vous souhaitez augmenter la granularité de vos données de profiling, vous pouvez fournir une configuration `comprehensive`. Veuillez noter que cette approche améliore la granularité, mais augmente également la charge du profileur. Voici ce qui distingue cette configuration de la configuration par défaut :

- Réduction du seuil d'échantillonnage à 10 ms pour les événements `ThreadSleep`, `ThreadPark` et `JavaMonitorWait`, contre 100 ms par défaut
- Activation des événements `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample` et `ExceptionCount`

Pour utiliser cette configuration, assurez-vous que vous disposez de la version `0.70.0` de `dd-trace-java`, puis remplacez l'appel de votre service par ce qui suit :

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=comprehensive -jar <VOTRE_SERVICE>.jar <VOS_FLAGS_DE_SERVICE>
```

## Activer le profileur d'allocation

Avec Java 15 et les versions antérieures, le profileur d'allocation est par défaut désactivé, car il est susceptible d'entraîner une surcharge du profileur pour les applications avec de fortes allocations.

Pour activer le profileur d'allocation, lancez votre application avec le paramètre JVM `-Ddd.profiling.allocation.enabled=true` ou la variable d'environnement `DD_PROFILING_ALLOCATION_ENABLED=true`.

Vous avez également la possibilité d'activer les événements suivants dans votre [fichier modèle de remplacement](#creation-et-utilisation-d-un-fichier-modele-de-remplacement-jfr) `jfp` :

```
jdk.ObjectAllocationInNewTLAB#enabled=true
jdk.ObjectAllocationOutsideTLAB#enabled=true
```

[Découvrez comment utiliser des modèles de remplacement.](#creation-et-utilisation-d-un-fichier-modele-de-remplacement-jfr)

## Activer le profileur de tas
<div class="alert alert-info">La fonctionnalité de profileur de tas Java est en version bêta.</div>
Pour activer le profileur de tas, lancez votre application avec le paramètre JVM `-Ddd.profiling.heap.enabled=true` ou la variable d'environnement `DD_PROFILING_HEAP_ENABLED=true`.

Vous avez également la possibilité d'activer les événements suivants dans votre [fichier modèle de remplacement](#creation-et-utilisation-d-un-fichier-modele-de-remplacement-jfr) `jfp` :

```
jdk.OldObjectSample#enabled=true
```

[Découvrez comment utiliser des modèles de remplacement.](#creation-et-utilisation-d-un-fichier-modele-de-remplacement-jfr)

## Supprimer les données sensibles des profils

Si vos propriétés système contiennent des données sensibles comme des noms d'utilisateurs ou des mots de passe, désactivez l'événement de propriété système en créant un [fichier modèle de remplacement](#creation-et-utilisation-d-un-fichier-modele-de-remplacement-jfr) `jfp` avec `jdk.InitialSystemProperty` désactivé :

```
jdk.InitialSystemProperty#enabled=false
```

[Découvrez comment utiliser des modèles de remplacement.](#creation-et-utilisation-d-un-fichier-modele-de-remplacement-jfr)

## Événements d'allocation importante entraînant une surcharge du profileur

Pour désactiver le profiling des allocations, désactivez les événements suivants dans votre [fichier modèle de remplacement](#creation-et-utilisation-d-un-fichier-modele-de-remplacement-jfr) `jfp` :

```
jdk.ObjectAllocationInNewTLAB#enabled=false
jdk.ObjectAllocationOutsideTLAB#enabled=false
```

[Découvrez comment utiliser des modèles de remplacement.](#creation-et-utilisation-d-un-fichier-modele-de-remplacement-jfr)

## Détection d'une fuite de mémoire ralentissant le récupérateur de mémoire

Pour désactiver la détection des fuites de mémoire, désactivez l'événement suivant dans votre [fichier modèle de remplacement](#creation-et-utilisation-d-un-fichier-modele-de-remplacement-jfr) `jfp` :

```
jdk.OldObjectSample#enabled=false
```

[Découvrez comment utiliser des modèles de remplacement.](#creation-et-utilisation-d-un-fichier-modele-de-remplacement-jfr)

## Exceptions entraînant une surcharge du profileur

Le profileur d'exceptions Datadog présente normalement une empreinte et une charge système minimes. Si de nombreuses exceptions sont créées et renvoyées, cela peut considérablement augmenter la charge du profileur. Cette situation peut par exemple survenir lorsque vous utilisez des exceptions pour la structure de contrôle. En cas de taux d'exceptions anormalement élevé, désactivez temporairement le profiling d'exceptions jusqu'à ce que vous ayez résolu le problème.

Pour désactiver le profiling des exceptions, démarrez le traceur avec le paramètre JVM `-Ddd.integration.throwables.enabled=false`.

N'oubliez pas de réactiver ce paramètre une fois le taux d'exceptions revenu à la normale.

## Prise en charge de Java 8

Les fournisseurs OpenJDK 8 suivants sont pris en charge pour le profiling en continu, car ils intègrent JDK Flight Recorder dans leurs dernières versions :

| Fournisseur                      | Version du JDK intégrant Flight Recorder                      |
| --------------------------- | -------------------------------------------------------------- |
| Azul                        | u212 (u262 recommandée)                                     |
| AdoptOpenJDK                | u262                                                           |
| RedHat                      | u262                                                           |
| Amazon (Corretto)           | u262                                                           |
| Bell-Soft (Liberica)        | u262                                                           |
| Tous les builds upstream de fournisseurs | u272                                                           |

Si votre fournisseur ne figure pas dans la liste, [créez un ticket d'assistance][2]. Nous vous informerons si nous prévoyons de le prendre en charge ou si nous proposons déjà une prise en charge bêta.

## Création et utilisation d'un fichier modèle de remplacement JFR

Les modèles de remplacement vous permettent d'indiquer des propriétés de profiling à remplacer. Toutefois, les paramètres par défaut sont équilibrés pour établir un compromis acceptable entre la charge et la densité des données qui couvrent la plupart des cas d'utilisation. Pour utiliser un fichier de remplacement, procédez comme suit :

1. Créez un fichier de remplacement dans un répertoire accessible par `dd-java-agent` lors de l'appel du service :
    ```
    touch dd-profiler-overrides.jfp
    ```

2. Ajoutez les remplacements de votre choix au fichier jfp. Par exemple, si vous souhaitez désactiver le profiling d'allocations et les propriétés système JVM, votre fichier `dd-profiler-overrides.jfp` ressemblera à ceci :

    ```
    jdk.ObjectAllocationInNewTLAB#enabled=false
    jdk.ObjectAllocationOutsideTLAB#enabled=false
    jdk.InitialSystemProperty#enabled=false
    ```

3. Lorsque vous exécutez votre application avec `dd-java-agent`, l'appel de votre service doit pointer vers le fichier de remplacement avec `-Ddd.profiling.jfr-template-override-file=</chemin/vers/remplacement.jfp>`, par exemple :

    ```
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.trace.sample.rate=1 -Ddd.profiling.jfr-template-override-file=</path/to/override.jfp> -jar path/to/your/app.jar
    ```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

## Profils manquants sur la page de recherche de profils

Si vous avez configuré le profileur et que vous ne voyez pas les profils sur la page de recherche de profils, activez le [mode debugging][1] et [ouvrez un ticket d'assistance][2] en fournissant les fichiers de debugging et les informations suivantes :

- Type et version du système d'exploitation (par exemple, Linux Ubuntu 20.04)
- Type, version et fournisseur du runtime (par exemple, Python 3.9.5)

[1]: /fr/tracing/troubleshooting/#tracer-debug-logs
[2]: /fr/help/

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

## Profils manquants sur la page de recherche de profils

Si vous avez configuré le profileur et que vous ne voyez pas les profils sur la page de recherche de profils, activez le [mode debugging][1] et [ouvrez un ticket d'assistance][2] en fournissant les fichiers de debugging et les informations suivantes :

- Type et version du système d'exploitation (par exemple, Linux Ubuntu 20.04)
- Type, version et fournisseur du runtime (par exemple, Go 1.16.5)

[1]: /fr/tracing/troubleshooting/#tracer-debug-logs
[2]: /fr/help/

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

## Profils manquants sur la page de recherche de profils

Si vous avez configuré le profileur et que vous ne voyez pas les profils sur la page de recherche de profils, activez le [mode debugging][1] et [ouvrez un ticket d'assistance][2] en fournissant les fichiers de debugging et les informations suivantes :

- Type et version du système d'exploitation (par exemple, Linux Ubuntu 20.04)
- Type, version et fournisseur du runtime (par exemple, Ruby 2.7.3)

## Erreurs « stack level too deep (SystemStackError) » des générées par l'application

Le profileur instrumente la VM Ruby de façon à surveiller les créations de threads. Cette instrumentation prend en charge la plupart des autres gems Ruby qui instrumentent également les créations de threads, à quelques exceptions près.

Si vous utilisez l'un des gems ci-dessous, suivez les instructions indiquées :

* `rollbar` : vérifiez que vous utilisez la version 3.1.2 ou une version ultérieure.
* `logging` : désactivez l'héritage du contexte de thread de `logging` en définissant la variable d'environnement `LOGGING_INHERIT_CONTEXT`
  sur `false`.

Si, malgré ces modifications, vous continuez à recevoir des erreurs `SystemStackError`, [ouvrez un ticket d'assistance][2] en prenant soin d'inclure toute la backtrace entraînant l'erreur.

## Profils manquants pour les tâches Resque

Pour effectuer le profiling de tâches [Resque](https://github.com/resque/resque), définissez la variable d'environnement `RUN_AT_EXIT_HOOKS` sur `1`, tel que décrit dans la [documentation Resque](https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks) (en anglais).

En l'absence de ce flag, les profils des tâches Resque de courte durée ne sont pas disponibles.

[1]: /fr/tracing/troubleshooting/#tracer-debug-logs
[2]: /fr/help/

{{< /programming-lang >}}
{{< /programming-lang >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
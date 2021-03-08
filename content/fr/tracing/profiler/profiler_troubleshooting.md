---
title: Dépannage du profileur
kind: documentation
further_reading:
  - link: /tracing/troubleshooting
    tag: Documentation
    text: Dépannage de l'APM
---
## Profils manquants sur la page de recherche de profils

Si vous avez configuré le profileur et que vous ne voyez pas les profils sur la page de recherche de profils, activez le [mode debugging][1] et [ouvrez un ticket d'assistance][2] en fournissant les fichiers de debugging et les informations suivantes :

- Type et version du système d'exploitation (par exemple, Linux Ubuntu 14.04.3)
- Type, version et fournisseur du runtime (par exemple, Java OpenJDK 11 AdoptOpenJDK)

## Réduire la charge de la configuration par défaut

Si la charge de la configuration par défaut n'est pas acceptable, vous pouvez utiliser le profileur avec les paramètres de configuration minimale. Voici ce qui distingue la configuration minimale par rapport à la configuration par défaut :

- Augmentation du seuil d'échantillonnage à 500 ms pour les événements `ThreadSleep`, `ThreadPark` et `JavaMonitorWait`, contre 100 ms par défaut
- Désactivation des événements `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample` et `ExceptionCount`

Pour utiliser la configuration minimale, assurez-vous que vous disposez de la version `0.70.0` de `dd-java-agent`, puis remplacez l'appel de votre service par ce qui suit :

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=minimal -jar <VOTRE_SERVICE>.jar <VOS_FLAGS_DE_SERVICE>
```

## Augmenter la granularité des informations du profileur

Si vous souhaitez augmenter la granularité de vos données de profiling, vous pouvez spécifier une configuration `comprehensive`. Veuillez noter que cette approche améliore la granularité, mais augmente également la charge du profileur. Voici ce qui distingue cette configuration de la configuration par défaut :

- Réduction du seuil d'échantillonnage à 10 ms pour les événements `ThreadSleep`, `ThreadPark` et `JavaMonitorWait`, contre 100 ms par défaut
- Activation des événements `ObjectAllocationInNewTLAB`, `ObjectAllocationOutsideTLAB`, `ExceptionSample` et `ExceptionCount`

Pour utiliser cette configuration, assurez-vous que vous disposez de la version `0.70.0` de `dd-trace-java`, puis remplacez l'appel de votre service par ce qui suit :

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=comprehensive -jar <VOTRE_SERVICE>.jar <VOS_FLAGS_DE_SERVICE>
```

## Supprimer les données sensibles des profils

Si vos propriétés système contiennent des données sensibles comme des noms d'utilisateurs ou des mots de passe, désactivez l'événement de propriété système en créant un [fichier modèle de remplacement](#creation-et-utilisation-d-un-fichier-modele-de-remplacement-jfr) `jfp` avec `jdk.InitialSystemProperty` désactivé :

{{< code-block lang="text" filename="example-template.jfp" >}}
jdk.InitialSystemProperty#enabled=false
{{< /code-block >}}

[Découvrez comment utiliser des modèles de remplacement.](#creating-and-using-a-jfr-template-override-file)

## Événements d'allocation importante entraînant une surcharge du profileur

Pour désactiver le profiling d'allocations, désactivez les événements suivants dans votre [fichier modèle de remplacement](#evenements-d-allocation-importants-entrainant-une-surcharge-du-profileur) `jfp` :

{{< code-block lang="text" filename="example-template.jfp" >}}
jdk.ObjectAllocationInNewTLAB#enabled=false
jdk.ObjectAllocationOutsideTLAB#enabled=false
jdk.OldObjectSample#enabled=false
{{< /code-block >}}

[Découvrez comment utiliser des modèles de remplacement.](#creating-and-using-a-jfr-template-override-file)

## Détection d'une fuite de mémoire ralentissant le récupérateur de mémoire

Pour désactiver la détection des fuites de mémoire, désactivez l'événement suivant dans votre [fichier modèle de remplacement](evenements-d-allocation-importante-entrainant-une-surcharge-du-profileur) `jfp` :

{{< code-block lang="text" filename="example-template.jfp" >}}
jdk.OldObjectSample#enabled=false
{{< /code-block >}}

[Découvrez comment utiliser des modèles de remplacement.](#creating-and-using-a-jfr-template-override-file)

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
| Tous les builds upstream de fournisseurs             | u272                                                           |

Si votre fournisseur ne figure pas dans la liste, [créez un ticket d'assistance][2]. Nous vous informerons si nous prévoyons de le prendre en charge ou si nous proposons déjà une prise en charge bêta.

## Création et utilisation d'un fichier modèle de remplacement JFR

Les modèles de remplacement vous permettent d'indiquer des propriétés de profiling à remplacer. Toutefois, les paramètres par défaut sont équilibrés pour établir un compromis acceptable entre la charge et la densité des données qui couvrent la plupart des cas d'utilisation. Pour utiliser un fichier de remplacement, procédez comme suit :

1. Créez un fichier de remplacement dans un répertoire accessible par `dd-java-agent` lors de l'appel du service :
    ```
    touch dd-profiler-overrides.jfp
    ```

2. Ajoutez les remplacements de votre choix au fichier jfp. Par exemple, si vous souhaitez désactiver le profiling d'allocations et les propriétés système JVM, votre fichier `dd-profiler-overrides.jfp` ressemblera à ceci :

    {{< code-block lang="text" filename="example-template.jfp" >}}
    jdk.ObjectAllocationInNewTLAB#enabled=false
    jdk.ObjectAllocationOutsideTLAB#enabled=false
    jdk.InitialSystemProperty#enabled=false
    {{< /code-block >}}

3. Lorsque vous exécutez votre application avec `dd-java-agent`, l'appel de votre service doit pointer vers le fichier de remplacement avec `-Ddd.profiling.jfr-template-override-file=</chemin/vers/remplacement.jfp>`, par exemple :

    {{< code-block lang="text" filename="example-template.jfp" >}}
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.trace.sample.rate=1 -Ddd.profiling.jfr-template-override-file=</chemin/vers/remplacement.jfp> -jar chemin/vers/votre/app.jar
    {{< /code-block >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/troubleshooting/#tracer-debug-logs
[2]: /fr/help/
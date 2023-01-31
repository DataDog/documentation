---
further_reading:
- link: /tracing/troubleshooting
  tag: Documentation
  text: Dépannage de l'APM
kind: documentation
title: Dépannage du profileur
---

{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php,ddprof" >}}
{{< programming-lang lang="java" >}}

## Profils manquants sur la page de recherche de profils

Si vous avez configuré le profileur et que vous ne voyez pas les profils sur la page de recherche de profils, activez le [mode debugging][1] et [ouvrez un ticket d'assistance][2] en fournissant les fichiers de debugging et les informations suivantes :

- Type et version du système d'exploitation (par exemple, Linux Ubuntu 20.04)
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
<div class="alert alert-info">La fonctionnalité de profileur de tas Java est disponible en version bêta.</div>
<div class="aler alert-info">Cette fonctionnalité requiert au minimum la version 11.0.12, 15.0.4, 16.0.2, 17.0.3 ou 18 de Java.</div>
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

| Fournisseur                      | Version du JDK intégrant Flight Recorder |
| --------------------------- | ----------------------------------------- |
| Azul                        | u212 (u262 recommandée)                |
| AdoptOpenJDK                | u262                                      |
| RedHat                      | u262                                      |
| Amazon (Corretto)           | u262                                      |
| Bell-Soft (Liberica)        | u262                                      |
| Tous les builds upstream de fournisseurs | u272                                      |

Si votre fournisseur n'est pas répertorié, [ouvrez un ticket d'assistance][2], car il est possible que d'autres fournisseurs proposent une version bêta compatible ou prévoient d'en proposer une.

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
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.profiling.jfr-template-override-file=</path/to/override.jfp> -jar path/to/your/app.jar
    ```

[1]: /fr/tracing/troubleshooting/#tracer-debug-logs
[2]: /fr/help/
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

Ce problème ne devrait plus se produire depuis la [version `0.54.0` de `dd-trace-rb`][3]. Si vous le rencontrez tout de même, [ouvrez un ticket d'assistance][2] en prenant soin d'inclure toute la backtrace entraînant l'erreur.

Avant la version `0.54.0`, le profileur devait instrumenter la VM Ruby afin de suivre la création de threads, ce qui entraînait des problèmes de conflits avec l'instrumentation similaire d'autres gems.

Si vous utilisez l'un des gems ci-dessous, suivez les instructions indiquées :

* `rollbar` : vérifiez que vous utilisez la version 3.1.2 ou une version ultérieure.
* `logging` : désactivez l'héritage du contexte de thread de `logging` en définissant la variable d'environnement `LOGGING_INHERIT_CONTEXT`
  sur `false`.

## Profils manquants pour les tâches Resque

Pour le profiling de tâches [Resque][4], vous devez définir la variable d'environnement `RUN_AT_EXIT_HOOKS` sur `1`, tel que décrit dans la [documentation Resque][5] (en anglais).

En l'absence de ce flag, les profils des tâches Resque de courte durée ne sont pas disponibles.

## Profiling non activé en raison de l'échec de la compilation de l'en-tête juste à temps de la VM Ruby

Un problème de compatibilité connu entre la version 2.7 de Ruby et d'anciennes versions de GCC (4.8 et versions antérieures) empêche le bon fonctionnement du profileur ([rapport Ruby en amont][6], [rapport de bug pour `dd-trace-rb` bug report][7]). Cela peut générer le message d'erreur suivant : « Your ddtrace installation is missing support for the Continuous Profiler because compilation of the Ruby VM just-in-time header failed. Your C compiler or Ruby VM just-in-time compiler seem to be broken. »


Pour corriger ce problème, mettez à jour votre système d'exploitation ou votre image Docker afin d'utiliser une version de GCC plus récente que la v4.8.

Pour obtenir plus d'aide concernant ce problème, [contactez l'assistance][2] en prenant soin d'inclure la sortie de la commande `DD_PROFILING_FAIL_INSTALL_IF_MISSING_EXTENSION=true gem install ddtrace` et le fichier `mkmf.log` généré.

[1]: /fr/tracing/troubleshooting/#tracer-debug-logs
[2]: /fr/help/
[3]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.54.0
[4]: https://github.com/resque/resque
[5]: https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks
[6]: https://bugs.ruby-lang.org/issues/18073
[7]: https://github.com/DataDog/dd-trace-rb/issues/1799
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

## Profils manquants sur la page de recherche de profils

Si vous avez configuré le profileur et ne voyez aucun profil dans la page de recherche de profils, effectuez les vérifications suivantes :

1. Assurez-vous que l'Agent est installé, qu'il est en cours d'exécution et qu'il est visible dans le volet Windows Services.

2. Vérifiez le résultat de l'exportation de profils en procédant comme suit :

   1. Activez les logs de debugging en définissant la variable `DD_TRACE_DEBUG` pour l'application. 

   2. Redémarrez l'application.

   3. Ouvrez le fichier de log `DD-Dotnet-Profiler.<Nom Application` situé dans le dossier `%ProgramData%\Datadog-APM\logs\`.

   4. Recherchez le message `Profile data was NOT successfully exported via HTTP POST`.

   5. Vérifiez si des erreurs sont indiquées dans les champs suivants :
      ```
      ["response.StatusCode"]=...,
      ["response.Error"]="...",
      ```

   6. Vérifiez que vous utilisez la bonne URL dans le champ ci-dessous. Si vous avez conservé les paramètres de configuration par défaut, votre champ devrait ressembler à ce qui suit :
      ```
      ["_profilesIngestionEndpoint_url"]="http://127.0.0.1:8126/profiling/v1/input",
      ```
      Si vous avez spécifié dans votre configuration une autre URL d'Agent de trace avec les variables d'environnement `DD_TRACE_AGENT_URL` ou `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT`, les valeurs du champ doivent correspond aux variables. Exemple :
      ```
      ["_profilesIngestionEndpoint_url"]="http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>/profiling/v1/input",
      ```

Si ce n'est pas le cas, activez le [mode debugging][1] et [ouvrez un ticket d'assistance][2] en fournissant les fichiers de debugging et les informations suivantes :
- Type et version du système d'exploitation (par exemple, Windows Server 2019)
- Type et version du runtime (par exemple, .NET Core 6.0)
- Type d'application (par exemple, application Web exécutée dans IIS)


## Charge CPU élevée lors de l'activation du profileur

Le profileur possède une charge fixe. Sa valeur varie, mais devrait avoisiner :
 -  200 ms de temps CPU par seconde sous Linux (0,2 CPU) ; ou
 -  20 ms de temps CPU par seconde sous Windows (0,02 CPU).

En raison de ce coût fixe, il est possible que la charge relative du profileur soit considérable pour les conteneurs de très petite taille. Par exemple, si vous exécutez le profileur sur un conteneur Linux auquel 0,4 CPU a été assigné, le coût fixe de 0,2 CPU engendre une charge relative de 50 %. Ajustez les limites du conteneur pour corriger cela.



[1]: /fr/tracing/troubleshooting/#tracer-debug-logs
[2]: /fr/help/
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

## Profils manquants sur la page de recherche de profils

SI vous avez configuré le profileur et ne voyez aucun profil dans la page de recherche de profils, exécutez la fonction `phpinfo()`. Le profileur s'ancre à `phpinfo()` pour effectuer un diagnostic. Si le serveur Web rencontre des problèmes, exécutez `phpinfo()` depuis celui-ci et non depuis la ligne de commande : en effet, chaque Server API (SAPI) peut être configurée indépendamment.

[Ouvrez un ticket d'assistance][1] en fournissant les informations suivantes :

- Type et version du système d'exploitation (par exemple, Linux Ubuntu 20.04)
- Sortie de `phpinfo()`, qui comprend la version de PHP, le type de SAPI, les versions des bibliothèques Datadog ainsi que le diagnostic du profileur.


[1]: /fr/help/
{{< /programming-lang >}}

{{< programming-lang lang="ddprof" >}}

## Profils manquants sur la page de recherche de profils

Si vous avez configuré le profileur et que vous ne voyez pas les profils sur la page de recherche de profils, activez la [journalisation détaillée][1] et [ouvrez un ticket d'assistance][2] en fournissant les fichiers de log et les informations suivantes :

- Version du kernel Linux (`uname -r`)
- Version de libc (`ldd --version`)
- Valeur de `/proc/sys/kernel/perf_event_paranoid`
- Ligne de commande complète, y compris les arguments du profileur et de l'application

Si vous le souhaitez, vous pouvez également diagnostiquer le problème en activant la journalisation détaillée et en consultant les sections ci-dessous.

### \<ERROR\> Error calling perfopen on watcher

Cette erreur survient généralement lorsque vous ne disposez pas des autorisations adéquates pour interagir avec le profileur. Cela est habituellement causé par la désactivation de fonctionnalités du système d'exploitation requises, qui entraîne l'échec du profiling. Ces paramètres doivent généralement être configurés au niveau des hosts, et non au niveau d'un pod ou d'un conteneur spécifique.

Afin de conserver la configuration après des redémarrages, définissez `perf_event_paranoid` en l'adaptant à votre distribution. Pour diagnostiquer le problème, exécutez la commande suivante :

```shell
echo 1 | sudo tee /proc/sys/kernel/perf_event_paranoid

```

**Remarque** : cette commande doit être exécutée à partir de l'espace de nommage d'un montage dans lequel l'objet `/proc/sys/kernel/perf_event_paranoid` existe et peut être écrit. Pour un conteneur, ce paramètre est hérité à partir du host.

Vous pouvez utiliser deux fonctionnalités pour remplacer la valeur de `perf_event_paranoid` :
- `CAP_SYS_ADMIN` : ajoute de nombreuses autorisations, ce qui peut être déconseillé
- `CAP_PERFMON` : ajoute les fonctionnalités BPF et `perf_event_open` (disponible sous Linux 5.8 et ultérieur)

L'erreur peut également être causée par des problèmes d'autorisations plus rares :
- Le profileur ne parvient pas systématiquement à instrumenter des processus dont l'UID change au démarrage. C'est le cas d'un grand nombre de serveurs Web et de bases de données.
- Le profileur repose sur l'appel système `perf_event_open()`, qui est interdit par certains runtimes de conteneur. Consultez la documentation pertinente pour vérifier si c'est le cas pour votre runtime.
- Certains profils seccomp interdisent l'utilisation de `perf_event_open()`. Si votre système exécute une configuration de ce type, vous ne pourrez pas exécuter le profileur.

### \<WARNING\> Could not finalize watcher

Cet avertissement peut être émis lorsque le système ne parvient pas à allouer suffisamment de mémoire verrouillée pour le profileur. Cela se produit généralement lorsqu'un trop grand nombre d'instances du profileur sont actives sur un host donné. Cette situation est comparable à l'instrumentation sur un même host d'un trop grand nombre de services conteneurisés. Pour résoudre ce problème, augmentez la limite de mémoire `mlock()` ou réduisez le nombre d'applications instrumentées.

Le calcul de cette limite peut tenir compte d'autres outils de profiling.

### \<WARNING\> Failure to establish connection

Cette erreur signifie généralement que le profileur ne parvient pas à se connecter à l'Agent Dataadog. Activez la [journalisation relative à la configuration][3] pour identifier le hostname et le numéro de port utilisé par le profileur pour les téléchargements. Sachez également que le contenu de ce message d'erreur peut indiquer le hostname et le port utilisé. Comparez ces valeurs à la configuration de votre Agent. Consultez la section [Activer le profileur Datadog pour Linux][4] pour découvrir les paramètres d'entrée du profileur ainsi que les valeurs par défaut.

## Profils vides ou creux

Il est possible que vos profils soient vides (erreur « No CPU time reported ») ou qu'ils contiennent uniquement quelques frames. Les applications possédant des informations de symbolisation de mauvaise qualité peuvent rencontrer ce type de problème. Toutefois, il est possible que ces erreurs soient attendues. En effet, le profileur s'active uniquement lorsque l'application instrumentée est planifiée sur le CPU. Les applications peuvent consacrer la plupart de leur temps en dehors du CPU pour de nombreuses raisons (faible charge utilisateur ou temps d'attente élevée, par exemple).

La racine de votre profil correspond au cadre pour lequel le nom de l'application figure entre parenthèses. Si ce cadre indique un temps CPU non négligeable, mais sans le moindre cadre enfant, il est possible que la fidélité du profiling de votre application laisse à désirer. Pour y remédier, vous pouvez considérer les approches suivantes :
- Les binaires « stripped » ne possèdent pas de symboles. Essayez d'utiliser un binaire qui n'est pas « stripped »  ou une image de conteneur non minifiée.
- Il est recommandé d'installer les packages de debugging de certaines applications et bibliothèques. C'est notamment le cas pour les services installés par l'intermédiaire du gestionnaire de package de votre référentiel ou d'un outil similaire.

## Erreur lors du chargement des bibliothèques partagées

Lorsque vous utilisez le profileur en continu pour les langages compilés en tant que bibliothèque dynamique, il est possible que le lancement de votre application échoue et que vous receviez l'erreur suivante :

```
error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

Ce problème survient lorsque votre application inclut la dépendance `libdd_profiling.so`, mais que celle-ci est introuvable lors du rapprochement des dépendances pendant l'exécution. Pour y remédier, suivez l'une des deux méthodes ci-dessous :

- Recréez votre application avec une bibliothèque statique. Dans certains systèmes de build, il n'est pas toujours évident de choisir entre une bibliothèque dynamique et statique. Pour cette raison, utilisez la commande `ldd` pour vérifier si le binaire généré inclut une dépendance dynamique non souhaitée sur `libdd_profiling.so`.
- Copiez `libdd_profiling.so` au sein d'un des répertoires dans le chemin de recherche de l'éditeur de liens dynamique. Pour obtenir la liste des répertoires disponibles, exécutez `ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n` (commande valide sur la plupart des systèmes Linux).

[1]: /fr/tracing/troubleshooting/#tracer-debug-logs
[2]: /fr/help/
[3]: /fr/tracing/profiler/enabling/ddprof/?tab=environmentvariables#configuration
[4]: /fr/tracing/profiler/enabling/ddprof/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
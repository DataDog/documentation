---
aliases:
- /fr/tracing/profiler/enabling/java/
code_lang: java
code_lang_weight: 10
further_reading:
- link: getting_started/profiler
  tag: Documentation
  text: Débuter avec le profileur
- link: profiler/profile_visualizations
  tag: Documentation
  text: En savoir plus sur les visualisations disponibles pour les profils
- link: profiler/profiler_troubleshooting/java
  tag: Documentation
  text: Résoudre les problèmes rencontrés en utilisant le profileur
title: Activer le profileur Java
type: multi-code-lang
---

Le profileur est fourni dans les bibliothèques de tracing Datadog. Si vous utilisez déjà [l'APM pour recueillir des traces][1] pour votre application, vous pouvez ignorer l'installation de la bibliothèque et passer directement à l'activation du profileur.

## Prérequis

Depuis la version 1.0.0 de dd-trace-java, vous avez le choix parmi deux moteurs pour générer des données sur les profils CPU pour les applications Java : le [Java Flight Recorder (JFR)][2] et le profileur Datadog. Depuis la version 1.7.0, le profileur Datadog est utilisé par défaut. Chaque moteur de profileur possède ses propres effets secondaires, exigences, configurations disponibles et limites. Cette page décrit les caractéristiques de chaque moteur. Vous pouvez activer l'un des moteurs ou les deux. Si vous activez les deux moteurs, vous enregistrerez simultanément les deux types de profils.

{{< tabs >}}
{{% tab "Profileur Datadog" %}}

Versions minimales de JDK :

- OpenJDK 8u352+, 11.0.17+, 17.0.5+ (y compris les builds basés sur ces versions, notamment Amazon Corretto, Azul Zulu, etc.)
- Oracle JDK 8u352+, 11.0.17+, 17.0.5+
- OpenJ9 JDK 8u372+, 11.0.18+, 17.0.6+

Le profileur Datadog repose sur la fonction `AsyncGetCallTrace` JVMTI, pour laquelle il existe une [erreur connue][1] découverte avant la version 17.0.5 de JDK. Ce correctif a été backporté pour les versions 11.0.17 et 8u352. Le profileur Datadog n'est pas activé, sauf si le correctif a été appliqué à la JVM sur laquelle le profileur est déployé. Pour utiliser le profileur Datadog, installez au minimum la version 8u352, 11.0.17 ou 17.0.5, ou la dernière version de JVM sans prise en charge à long terme.

[1]: https://bugs.openjdk.org/browse/JDK-8283849
{{% /tab %}}

{{% tab "JFR" %}}

Versions minimales de JDK :
- OpenJDK 11+
- Oracle JDK 11+
- [OpenJDK 8 (version 1.8.0.262/8u262+)][3]
- Azul Zulu 8 (version 1.8.0.212/8u212+).

JFR n'est pas pris en charge par OpenJ9.

**Remarque** : l'activation de Java Flight Recorder pour OracleJDK peut nécessiter une licence commerciale d'Oracle. Contactez votre commercial Oracle pour vérifier si l'utilisation de JFR est incluse ou non dans votre licence.

Puisqu'il est possible que les versions de JDK sans prise en charge à long terme n'incluent pas de patch de stabilité ni de correctifs de performances liés à la bibliothèque du profileur Datadog, utilisez les versions 8, 11 et 17 de JDK avec prise en charge à long terme.

Exigences supplémentaires à respecter pour le profiling des [hotspots de code][11] :
 - OpenJDK 11+ et `dd-trace-java` version 0.65.0+ ; ou
 - OpenJDK 8 8u282+ et `dd-trace-java` version 0.77.0+

[3]: /fr/profiler/profiler_troubleshooting/#java-8-support
[11]: /fr/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces

{{% /tab %}}
{{< /tabs >}}

Tous les langages JVM, comme Java, Scala, Groovy, Kotlin et Clojure, sont pris en charge.

Le profileur en continu n'est pas pris en charge sur les plateformes sans serveur, comme AWS Lambda.

## Installation

Pour commencer le profiling d'applications, procédez comme suit :

1. Si vous utilisez déjà Datadog, mettez à jour votre Agent vers la version [7.20.2][4]+ ou [6.20.2][5]+. Si l'APM n'est pas activée et que votre application n'est pas configurée pour envoyer des données à Datadog, dans votre Agent, définissez la variable d'environnement `DD_APM_ENABLED` sur `true` et le port d'écoute sur `8126/TCP`.

2. Téléchargez `dd-java-agent.jar`, qui contient les fichiers de classe de l'Agent Java :

    ```shell
    wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
    ```

     **Remarque** : le profileur est disponible dans la bibliothèque `dd-java-agent.jar` dans la version 0.55 et les versions ultérieures.

3. Définissez le flag `-Ddd.profiling.enabled` ou la variable d'environnement `DD_PROFILING_ENABLED` sur `true` pour activer le profileur. Spécifiez les paramètres `dd.service`, `dd.env` et `dd.version` pour pouvoir filtrer et regrouper vos profils en fonction de ces dimensions :
   {{< tabs >}}
{{% tab "Arguments des commandes" %}}

Appelez votre service :
```diff
java \
    -javaagent:dd-java-agent.jar \
    -Ddd.service=<VOTRE_SERVICE> \
    -Ddd.env=<VOTRE_ENVIRONNEMENT> \
    -Ddd.version=<VOTRE_VERSION> \
    -Ddd.profiling.enabled=true \
    -XX:FlightRecorderOptions=stackdepth=256 \
    -jar <VOTRE_SERVICE>.jar <VOS_FLAGS_DE_SERVICE>
```

{{% /tab %}}
{{% tab "Variables d'environnement" %}}

```diff
export DD_SERVICE=<VOTRE SERVICE>
export DD_ENV=<VOTRE_ENVIRONNEMENT>
export DD_VERSION=<VOTRE_VERSION>
export DD_PROFILING_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -XX:FlightRecorderOptions=stackdepth=256 \
    -jar <VOTRE_SERVICE>.jar <VOS_FLAGS_DE_SERVICE>
```

{{% /tab %}}
{{< /tabs >}}

    **Remarque** : l'argument `-javaagent` doit figurer avant `-jar` et être ajouté en tant qu'option JVM et non en tant qu'argument d'application. Pour en savoir plus, consultez la [documentation Oracle][6] (en anglais) :

    ```shell
    # Correct :
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # Incorrect :
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

4. Au bout d'une ou de deux minutes, vous pouvez visualiser vos profils en accédant à [l'APM Datadog puis à la page Profiling][7].

### Activer les options du moteur pour le profileur du CPU

Depuis la version 1.5.0 de dd-trace-java, vous pouvez choisir parmi deux profileurs pour le CPU : Datadog ou Java Flight Recorder (JFR). Depuis la version 1.7.0, le profileur Datadog est utilisé par défaut. Il est néanmoins également possible activer JFR pour le profiling du CPU. Vous pouvez activer l'un des moteurs ou les deux. Si vous activez les deux moteurs, vous enregistrerez simultanément les deux types de profils.

Le profileur Datadog enregistre la span active pour chaque échantillon, ce qui améliore la précision des fonctionnalités de profiling des hotspots de code et des endpoints. Une fois activé, ce moteur améliore significativement l'intégration du tracing APM.

Le profileur Datadog comprend plusieurs moteurs de profiling, notamment pour le CPU, le wall clock, les allocations et les fuites de données.


{{< tabs >}}
{{% tab "Profileur Datadog" %}}

Le profileur Datadog est activé par défaut à compter des versions 1.7.0+ de dd-trace-java. Le profiling du CPU Datadog est programmé via des événements de performances. Il génère des résultats plus précis qu'avec le profiling JFR. Pour activer le profiling du CPU, utilisez ce qui suit :

```
export DD_PROFILING_DDPROF_ENABLED=true # valeur par défaut pour les versions 1.7.0+
export DD_PROFILING_DDPROF_CPU_ENABLED=true
```

ou :

```
-Ddd.profiling.ddprof.enabled=true # valeur par défaut pour les versions 1.7.0+
-Ddd.profiling.ddprof.cpu.enabled=true
```

Pour les utilisateurs de JDK Mission Control (JMC), l'événement d'échantillon CPU Datadog est `datadog.ExecutionSample`.

#### Paramètres sous Linux

Le moteur CPU fonctionne sur la plupart des systèmes. Toutefois, si la valeur de `/proc/sys/kernel/perf_event_paranoid` est définie sur `3`, le profileur ne peut pas utiliser d'événement de performance pour planifier l'échantillonnage du CPU. Le moteur doit alors avoir recours à `itimer`, ce qui dégrade la qualité du profiling. Utilisez la commande suivante pour définir `/proc/sys/kernel/perf_event_paranoid` sur `2` ou sur une valeur inférieure : 

```
sudo sh -c 'echo 2 >/proc/sys/kernel/perf_event_paranoid'
```

{{% /tab %}}

{{% tab "JFR" %}}

Pour les versions 1.7.0+, utilisez ce qui suit pour passer du profiling CPU Datadog par défaut au profiling CPU JFR :

```
export DD_PROFILING_DDPROF_CPU_ENABLED=false
```
ou :
```
-Ddd.profiling.ddprof.cpu.enabled=false
```
Pour les utilisateurs de JDK Mission Control (JMC), l'événement d'échantillon CPU JFR est `jdk.ExecutionSample`.

{{% /tab %}}
{{< /tabs >}}


### Moteur wall clock du profileur Datadog

Le moteur de profiling du wall clock permet d'effectuer le profiling des latences. Il s'intègre également parfaitement avec le tracing APM. Le moteur échantillonne tous les threads, sur le CPU ou en dehors, sur lesquels des activités de tracing sont en cours. Il permet également d'identifier la cause des latences au niveau des traces ou spans. Depuis la version 1.7.0, le moteur est activé par défaut.

ou :

```
-Ddd.profiling.ddprof.enabled=true # valeur par défaut pour les versions 1.7.0+
-Ddd.profiling.ddprof.wall.enabled=true
```

Pour les versions 1.7.0+, utilisez ce qui suit pour désactiver le profileur de wall clock :

```
export DD_PROFILING_DDPROF_WALL_ENABLED=false
```
ou :
```
-Ddd.profiling.ddprof.wall.enabled=false
```

Pour les utilisateurs de JMC, l'événement `datadog.MethodSample` est généré pour les échantillons de wall clock.

Le moteur de wall clock ne dépend pas du paramètre `/proc/sys/kernel/perf_event_paranoid`.

### Moteur d'allocations du profileur Datadog

Le moteur de profiling d'allocations Datadog contextualise les profils d'allocation. Il prend en charge les profils d'allocation filtrés par endpoint. Pour les versions de dd-java-agent antérieures à la v1.17.0, le moteur est désactivé par défaut. Vous pouvez toutefois utiliser ce qui suit pour l'activer :

```
export DD_PROFILING_DDPROF_ENABLED=true # valeur par défaut pour les versions 1.7.0+
export DD_PROFILING_DDPROF_ALLOC_ENABLED=true # valeur par défaut pour les versions 1.17.0+
```

ou :

```
-Ddd.profiling.ddprof.enabled=true # valeur par défaut pour les versions 1.7.0+
-Ddd.profiling.ddprof.alloc.enabled=true # valeur par défaut pour les versions 1.17.0+
```

Pour les utilisateurs de JMC, les événements d'allocation Datadog sont `datadog.ObjectAllocationInNewTLAB` et `datadog.ObjectAllocationOutsideTLAB`.

Le moteur du profileur d'allocations ne répond pas du paramètre `/proc/sys/kernel/perf_event_paranoid`.

### Moteur du profileur de mémoire dans le tas active

_Depuis la version 1.17.0_

Le moteur de profileur de mémoire dans le tas active permet d'étudier l'utilisation globale de la mémoire de votre service et d'identifier d'éventuelles fuites de mémoire. Le moteur échantillonne des allocations et vérifie si ces échantillons existent toujours après le dernier cycle de nettoyage de mémoire. Le nombre d'échantillons survivants permet d'estimer le nombre d'objets actifs dans le tas. Le nombre d'échantillons suivis est limité, afin d'éviter une augmentation illimitée de l'utilisation de la mémoire du profileur.

Ce moteur est désactivé par défaut, mais vous pouvez utiliser ce qui suit pour l'activer :

```
export DD_PROFILING_DDPROF_LIVEHEAP_ENABLED=true
```

ou :

```
-Ddd.profiling.ddprof.liveheap.enabled=true
```

Pour les utilisateurs de JMC, l'événement de mémoire dans le tas active Datadog est `datadog.HeapLiveObject`.

Le moteur d'allocations ne dépend pas du paramètre `/proc/sys/kernel/perf_event_paranoid`.

### Collecte des stack traces natives

Si les moteurs de CPU ou wall clock du profileur Datadog sont activés, vous pouvez recueillir des stack traces natives. Celles-ci comprennent les composants internes des JVM, les bibliothèques natives utilisées par votre application ou par la JVM, ainsi que les appels système.

<div class="alert alert-warning">Les stack traces natives ne sont pas recueillies par défaut, car elles ne permettent généralement pas d'obtenir d'informations exploitables. De plus, les stacks natives parcourues peuvent potentiellement nuire à la stabilité de l'application. Testez ce paramètre dans un environnement hors production avant de l'implémenter en production.

Pour activer la collecte de stack traces natives, malgré le fait que cela puisse avoir une incidence sur la stabilité de votre application, définissez ce qui suit :

```
export DD_PROFILING_DDPROF_ENABLED=true # valeur par défaut pour les versions 1.7.0+
export DD_PROFILING_DDPROF_CSTACK=dwarf
```

ou :

```
-Ddd.profiling.ddprof.enabled=true # valeur par défaut pour les versions 1.7.0+
-Ddd.profiling.ddprof.cstack=dwarf
```



## Configuration

Vous pouvez configurer le profileur à l'aide des variables d'environnement suivantes :

| Variable d'environnement                             | Type          | Description                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Booléen       | Alternative à l'argument `-Ddd.profiling.enabled`. Définissez cette variable d'environnement sur `true` pour activer le profileur.               |
| `DD_PROFILING_ALLOCATION_ENABLED`                | Booléen       | Remplace l'argument `-Ddd.profiling.allocation.enabled`. Définissez cette variable sur `true` pour activer le profileur d'allocation. Le profileur doit au préalable avoir été activé. |
| `DD_ENV`                                         | Chaîne        | Le nom de l'[environnement][9], par exemple `production`. |
| `DD_SERVICE`                                     | Chaîne        | Le nom du [service][9], par exemple `web-backend`. |
| `DD_VERSION`                                     | Chaîne        | La [version][9] de votre service. |
| `DD_TAGS`                                        | Chaîne        | Les tags à appliquer à un profil importé. Doit correspondre à une liste de paires `<key>:<value>` séparées par des virgules, par exemple : `layer:api, team:intake`.  |

## Vous avez des doutes sur les prochaines étapes à suivre ?

Le guide [Premiers pas avec le profileur en continu][10] présente un exemple de service problématique et vous explique comment utiliser le profileur en continu pour mieux comprendre le problème et le corriger.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/
[2]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[3]: /fr/profiler/profiler_troubleshooting/#java-8-support
[4]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[5]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: https://app.datadoghq.com/profiling
[8]: /fr/profiler/profiler_troubleshooting/#enabling-the-allocation-profiler
[9]: /fr/getting_started/tagging/unified_service_tagging
[10]: /fr/getting_started/profiler/
[11]: /fr/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
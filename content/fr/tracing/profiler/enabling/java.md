---
code_lang: java
code_lang_weight: 10
further_reading:
- link: getting_started/profiler
  tag: Documentation
  text: Débuter avec le profileur
- link: tracing/profiler/search_profiles
  tag: Documentation
  text: En savoir plus sur les types de profils disponibles
- link: tracing/profiler/profiler_troubleshooting
  tag: Documentation
  text: Résoudre les problèmes rencontrés en utilisant le profileur
kind: Documentation
title: Activation du profileur Java
type: multi-code-lang
---

Le profileur est fourni dans les bibliothèques de tracing Datadog. Si vous utilisez déjà [l'APM pour recueillir des traces][1] pour votre application, vous pouvez ignorer l'installation de la bibliothèque et passer directement à l'activation du profileur.

## Prérequis

Le profileur Datadog nécessite [JDK Flight Recorder][1]. La bibliothèque du profileur Datadog est prise en charge par OpenJDK 11+, Oracle JDK 11+, [OpenJDK 8 (version 8u262+)][3] et Azul Zulu 8+ (version 8u212+). Il n'est pas pris en charge par OpenJ9, car cette technologie n'est pas compatible avec [JDK Flight Recorder][2].

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

## Activer le profileur d'allocation

Avec dd-java-agent v0.84.0+ et Java 15 ou une version antérieure, le profileur d'allocation est désactivé, car il entraîne une surcharge du CPU pour les applications avec de fortes allocations. Cela arrive peu souvent : il est donc conseillé de tester cette configuration dans un environnement staging pour mesurer l'impact que cela peut avoir sur votre application. Pour activer le profileur d'allocation, consultez la rubrique [Activer le profil d'allocation][8].

## Procédure à suivre

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

[1]: /fr/tracing/setup_overview/
[2]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[3]: /fr/tracing/profiler/profiler_troubleshooting/#java-8-support
[4]: https://app.datadoghq.com/account/settings#agent/overview
[5]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: https://app.datadoghq.com/profiling
[8]: /fr/tracing/profiler/profiler_troubleshooting/#enabling-the-allocation-profiler
[9]: /fr/getting_started/tagging/unified_service_tagging
[10]: /fr/getting_started/profiler/
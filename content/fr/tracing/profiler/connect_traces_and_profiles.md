---
further_reading:
- link: tracing
  tag: Documentation
  text: Tracing distribué de l'APM
- link: /tracing/profiler/enabling
  tag: Documentation
  text: Activer le profileur en continu pour votre application
- link: getting_started/profiler
  tag: Documentation
  text: Débuter avec le profileur
kind: Documentation
title: Étudier les traces ou les endpoints lents
---

Si votre application présente des problèmes de performance en production, vous pouvez facilement détecter les goulots d'étranglement en intégrant le tracing distribué aux benchmarks de stack trace du code provenant du profiling. Les données des processus d'application sont automatiquement liées lorsque le tracing distribué de l'APM ainsi que le profileur en continu sont activés.

Vous pouvez passer directement des informations d'une span aux données de profiling depuis l'onglet Code Hotspots, afin d'identifier les lignes de code précises à l'origine des problèmes de performance. Il est également possible de corriger directement depuis l'interface de profiling les problèmes de lenteur et de surconsommation en ressources des endpoints.

## Identifier les hotspots de code dans les traces lentes

{{< img src="tracing/profiling/code_hotspots_tab.mp4" alt="Onglet Code Hotspots affichant les informations de profiling pour une span de trace de l'APM" video=true >}}

### Prérequis

{{< programming-lang-wrapper langs="java,python,go,ruby,.NET,php" >}}
{{< programming-lang lang="java" >}}
L'identification des hotspots de code est activée par défaut lorsque vous [activez le profiling pour votre service][1]. Si votre code est instrumenté manuellement, le profileur en continu nécessite l'activation des spans dans le contexte :

```java
final Span span = tracer.buildSpan("ServicehandlerSpan").start();
try (final Scope scope = tracer.activateSpan(span)) { // obligatoire pour le profileur en continu Datadog pour créer un lien avec une span
    // implémentation du thread de travail
  } finally {
    // 3e étape : clôturer la span une fois le travail terminé
    span.finish();
  }

```

Prérequis :
- OpenJDK 11 ou ultérieur et une bibliothèque de tracing v0.65.0 ou ultérieur ; ou
- pour OpenJDK 8, 8u282 ou ultérieur et une bibliothèque de tracing v0.77.0 ou ultérieur.


[1]: /fr/tracing/profiler/enabling/java
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

L'identification des hotspots de code est activée par défaut lorsque vous [activez le profiling pour votre service][1].

Nécessite une bibliothèque de tracing version 0.44.0 ou une version ultérieure.


[1]: /fr/tracing/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

L'identification des hotspots de code est activée par défaut lorsque vous [activez le profiling pour votre service][1].

Nécessite une bibliothèque de tracing version 0.49.0 ou version ultérieure.


[1]: /fr/tracing/profiler/enabling/ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Pour activer l'identification des hotspots de code pour Go, [activez le profiling pour votre service][1] et vérifiez que :

- vous utilisez la version 1.35.0 ou une version ultérieure de [dd-trace-go][2] ;
- [`DD_PROFILING_CODE_HOTSPOTS_COLLECTION_ENABLED=true`][3] est défini dans votre environnement, ou que l'option [`tracer.WithProfilerCodeHotspots(true)`][3] est transmise à [`tracer.Start()`][4]. Cette option est activée par défaut dans les versions 1.37.0+ de [dd-trace-go][2].
- [`profiler.CPUDuration(60*time.Second)`][5] et [`profiler.WithPeriod(60*time.Second)`][6] sont transmis à [`profiler.Start()`][7] pour capturer les informations de hotspot pour l'ensemble des spans. Ces valeurs sont définies par défaut dans les versions 1.37.0+ de [dd-trace-go][2].


**Attention** : pour Go 1.17 et les versions antérieures, plusieurs bugs (voir [GH-35057][8], [GH-48577][9], [CL-369741][10] et [CL-369983][11]) peuvent nuire à la précision de cette fonctionnalité, notamment si la commande cgo est fréquemment utilisée. Ces bugs devraient être corrigés par la version 1.18.

[1]: /fr/tracing/profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/releases
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithProfilerCodeHotspots
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#Start
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#CPUDuration
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithPeriod
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#Start
[8]: https://github.com/golang/go/issues/35057
[9]: https://github.com/golang/go/issues/48577
[10]: https://go-review.googlesource.com/c/go/+/369741/
[11]: https://go-review.googlesource.com/c/go/+/369983/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

L'identification des hotspots de code est activée par défaut lorsque vous [activez le profiling pour votre service][1].

Nécessite une bibliothèque de tracing version 2.7.0 ou version ultérieure.

[1]: /fr/tracing/profiler/enabling/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

L'identification des hotspots de code est activée par défaut lorsque vous [activez le profiling pour votre service][1].

Nécessite une bibliothèque de tracing version 0.71 ou version ultérieure.

[1]: /fr/tracing/profiler/enabling/php
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Créer un lien entre une span et des données de profiling

Depuis la vue de chaque trace, l'onglet Code Hotspots met en lumière les données de profiling filtrées en fonction de la span sélectionnée.

La vue détaillée sur la gauche affiche la liste des types de temps d'exécution de la span donnée. Cette liste de types varie en fonction du runtime et du langage :

- **Method durations** affiche le temps total d'exécution de chaque méthode à partir votre code.
- **CPU** affiche le temps d'exécution des tâches liées au processeur.
- **Synchronization** affiche le temps d'attente associé au verrouillage d'un objet synchronisé.
- **Garbage collection** affiche le temps d'attente avant l'exécution du garbage collector.
- **VM operations** (Java uniquement) affiche le temps d'attente avant l'exécution des opérations de machines virtuelles autres que celles liées au garbage collector (par exemple, vidages de tas).
- **File I/O** affiche le temps d'attente avant l'exécution de l'opération de lecture/écriture.
- **Socket I/O** affiche le temps d'attente avant l'exécution de l'opération de lecture/écriture réseau.
- **Synchronization** affiche le temps d'attente avant l'exécution d'un appel de notification sur un objet.
- **Other** affiche le temps d'exécution de la span qui ne peut pas être expliqué à partir des données de profiling.

Cliquez sur l'un de ces types pour afficher la liste des méthodes les plus longues à exécuter. Cliquez sur le signe plus `+` pour développer la stack trace cette méthode **dans l'ordre inverse**.

#### Signification de la catégorie « Other »

Il n'est pas inhabituel qu'une petite partie du temps d'exécution soit de type **Other** (moins de 10 %). Voici quelques raisons pouvant expliquer la présence de temps Other :

  - La span que vous avez sélectionnée n'est pas directement associée à une exécution. Les données de profiling sont associées de façon unique à des spans lorsqu'elles s'exécutent sur un thread précis. Par exemple, certaines spans sont créées et utilisées de façon unique en tant que conteneurs virtuels pour une série d'étapes de traitement connexes, et ne sont donc jamais directement associées à une exécution de thread.
  - Le processus de votre application ne peut pas accéder aux ressources CPU à exécuter et a été interrompu. Le profileur n'a aucun moyen d'identifier les ressources en concurrence provenant d'autres processus ou conteneurs.
  - L'application est verrouillée durant la synchronisation ou en raison d'événements d'E/S qui durent chacun moins de 10 ms : le profileur Java reçoit uniquement les données pour les événements de thread interrompu (verrouillages, E/S, parks) d'une durée supérieure à 10 ms. Si vous souhaitez réduire ce seuil, consultez [la documentation sur la modification des valeurs de configuration par défaut][1].
  - La span que vous avez sélectionnée est courte. Le profiling est un mécanisme d'échantillonnage qui examine régulièrement le comportement de votre code. Il se peut qu'il n'y ait pas suffisamment de données représentatives pour les spans qui durent moins de 50 ms.
  - Instrumentation manquante : pour obtenir des données de profiling détaillées, les spans doivent être associées aux threads exécutés en activant ces spans dans le ScopeManager. Comme certaines instrumentations personnalisées n'activent pas ces spans correctement, elles ne peuvent pas être mappées avec les threads exécutés. Si une span provient d'une intégration personnalisée, consultez la [documentation relative à l'instrumentation personnalisée][2] pour essayer de résoudre le problème.

### Visualiser un profil à partir d'une trace

{{< img src="tracing/profiling/flamegraph_view.mp4" alt="Ouvrir une vue du profil dans un flamegraph" video=true >}}

Pour chaque type détaillé, cliquez sur **View profile** pour afficher les mêmes données que celles affichées dans le flamegraph.
Cliquez sur le sélecteur **Span/Trace/Full profile** pour définir le contexte des données :

- **Span** filtre les données de profiling en fonction de la span sélectionnée précédemment.
- **Trace** filtre les données de profiling en fonction de toutes les spans partageant le même processus de service de la span sélectionnée précédemment.
- **Full profile** filtre les données de façon à afficher 60 secondes du processus de service complet qui a exécuté la span sélectionnée précédemment.

## Visualiser les performances du code par endpoint d'API

### Prérequis

{{< programming-lang-wrapper langs="python,go,ruby" >}}
{{< programming-lang lang="python" >}}

Le profiling des endpoints est activé par défaut lors de l'activation du profiling pour votre service [Python][1]. Il nécessite la version 0.54.0 ou une version ultérieure de `dd-trace-py`.
<p></p>

[1]: /fr/tracing/profiler/enabling/python
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
Le profiling des endpoints est désactivé par défaut lors de l'activation du profiling pour votre service [Go][1]. Pour l'activer, vérifiez que :

- vous utilisez la version 1.35.0 ou une version ultérieure de [dd-trace-go][2] ;
- [`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED=true`][3] est défini dans votre environnement, ou que l'option [`tracer.WithProfilerEndpoints(true)`][3] est transmise à [`tracer.Start()`][4]. Cette option est activée par défaut dans les versions 1.37.0+ de [dd-trace-go][2].

**Attention** : pour Go 1.17 et les versions antérieures, plusieurs bugs (voir [GH-35057][8], [GH-48577][9], [CL-369741][10] et [CL-369983][11]) peuvent nuire à la précision de cette fonctionnalité, notamment si la commande cgo est fréquemment utilisée. Ces bugs devraient être corrigés par la version 1.18.

[1]: /fr/tracing/profiler/enabling/go
[2]: https://github.com/DataDog/dd-trace-go/releases
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithProfilerEndpoints
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#Start
[5]: https://github.com/golang/go/issues/35057
[6]: https://github.com/golang/go/issues/48577
[7]: https://go-review.googlesource.com/c/go/+/369741/
[8]: https://go-review.googlesource.com/c/go/+/369983/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Le profiling des endpoints est activé par défaut lors de l'activation du profiling pour votre service [Ruby][1]. Il nécessite la version 0.54.0 ou une version ultérieure de `dd-trace-rb`.
<p></p>

[1]: /fr/tracing/profiler/enabling/ruby
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Filtrer les framegraphs par endpoint

Grâce au profiling d'endpoints, vous pouvez filtrer vos flamegraphs en fonction d'un endpoint de votre service Web, afin d'identifier les endpoints qui souffrent de lenteurs et d'une latence élevée et qui nuisent à l'expérience des utilisateurs finaux. Il n'est pas toujours simple de comprendre ce qui cause ces lenteurs et de corriger les problèmes. Il est possible que ces mauvaises performances s'expliquent par une utilisation des ressources plus importante que prévu : c'est par exemple le cas d'un endpoint qui consomme de nombreux cycles de processeur.

Le profiling des endpoints vous permet d'accomplir ce qui suit :

- Identifier les goulots d'étranglement provoqués par les méthodes qui rallongent le temps de réponse moyen de votre endpoint.
- Isoler les endpoints qui consomment le plus de ressources utiles, comme le processeur et le wall time. Cela est particulièrement intéressant lorsque vous souhaitez optimiser les performances de votre service.
- Vérifier si les lenteurs ou la surconsommation de vos endpoints sont causées par des bibliothèques d'exécution ou du code tiers.

{{< img src="tracing/profiling/endpoint_agg_gif.mp4" alt="Diagnostiquer un endpoint lent grâce à l'agrégation des endpoints" video=true >}}


### Surveiller les endpoints qui consomment le plus de ressources

Il est pertinent de surveiller les endpoints qui consomment le plus de ressources utiles, comme le processeur et le wall time. À l'aide de la liste de ces endpoints, vous pouvez vérifier si les performances de vos endpoints ont décliné ou si vous avez ajouté de nouveaux endpoints qui consomment beaucoup plus de ressources que les autres et ralentissent l'ensemble du service.

{{< img src="tracing/profiling/endpoint_metric.mp4" alt="Représentation des principaux endpoints en termes de consommation de ressources" video=true >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/profiler/profiler_troubleshooting#reduce-overhead-from-default-setup
[2]: /fr/tracing/setup_overview/custom_instrumentation/java#manually-creating-a-new-span
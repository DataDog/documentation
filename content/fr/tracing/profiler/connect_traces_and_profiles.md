---
title: Analyser les hotspots du code à partir des traces
kind: Documentation
further_reading:
  - link: tracing
    tag: Documentation
    text: Tracing distribué de l'APM
  - link: tracing/profiler/getting_started
    tag: Documentation
    text: Activer le profileur en continu pour votre application
  - link: tracing/profiler/intro_to_profiling
    tag: Documentation
    text: Présentation du profiling
---
Si votre application présente des problèmes de performance en production, nous vous conseillons d'associer les informations de tracing distribué de l'APM au profil complet de la stack du code. Les données des processus d'application sont automatiquement liées lorsque le tracing distribué de l'APM ainsi que le profileur en continu sont activés. Vous pouvez donc passer directement des informations d'une span aux données de profiling depuis l'onglet Code Hotspots, afin d'identifier les lignes de code précises à l'origine des problèmes de performance.

{{< img src="tracing/profiling/code_hotspots_tab.gif" alt="Onglet Code Hotspots affichant les informations de profiling pour une span de trace de l'APM">}}

## Prérequis

{{< programming-lang-wrapper langs="java,python" >}}
{{< programming-lang lang="java" >}}
L'identification des hotspots de code est activée par défaut lorsque vous [activez le profiling pour votre service][1]. Si votre code est instrumenté manuellement, le profileur en continu nécessite l'activation des spans dans le scope :

```java
final Span span = tracer.buildSpan("ServicehandlerSpan").start();
try (final Scope scope = tracer.activateSpan(span)) { // obligatoire pour le profileur en continu Datadog pour créer un lien avec une span
    // implémentation du thread de travail
  } finally {
    // 3e étape : clôturer la span une fois le travail terminé
    span.finish();
  }

```

Nécessite une bibliothèque de tracing version 0.65.0 ou une version ultérieure.


[1]: /fr/tracing/profiler/getting_started
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

L'identification des hotspots de code est activée par défaut lorsque vous [activez le profiling pour votre service][1].

Nécessite une bibliothèque de tracing version 0.44.0 ou une version ultérieure.


[1]: /fr/tracing/profiler/getting_started
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Créer un lien entre une span et des données de profiling

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
- **Other** affiche le temps d'exécution de la span qui ne peut pas être expliqué à à partir des données de profiling.

Cliquez sur l'un de ces types pour afficher la liste des méthodes les plus longues à exécuter. Cliquez sur le signe plus `+` pour développer la stack trace cette méthode **dans l'ordre inverse**.

Il n'est pas inhabituel qu'une petite partie du temps d'exécution soit de type **Other** (moins de 10 %). Voici quelques raisons pouvant expliquer la présence de temps Other :

  - La span que vous avez sélectionnée n'est pas directement associée à une exécution. Les données de profiling sont associées de façon unique à des spans lorsqu'elles s'exécutent sur un thread précis. Par exemple, certaines spans sont créées et utilisées de façon unique en tant que conteneurs virtuels pour une série d'étapes de traitement connexes, et ne sont donc jamais directement associées à une exécution de thread.
  - Le processus de votre application ne peut pas accéder aux ressources CPU à exécuter et a été interrompu. Le profileur n'a aucun moyen d'identifier les ressources en concurrence provenant d'autres processus ou conteneurs.
  - L'application est verrouillée durant la synchronisation ou en raison d'événements d'E/S qui durent chacun moins de 10 ms : le profileur Java reçoit uniquement les données pour les événements de thread interrompu (verrouillages, E/S, parks) d'une durée supérieure à 10 ms. Si vous souhaitez réduire ce seuil, consultez [la documentation sur la modification des valeurs de configuration par défaut][1].
  - La span que vous avez sélectionnée est courte. Le profiling est un mécanisme d'échantillonnage qui examine régulièrement le comportement de votre code. Il se peut qu'il n'y ait pas suffisamment de données représentatives pour les spans qui durent moins de 50 ms.
  - Instrumentation manquante : pour obtenir des données de profiling détaillées, les spans doivent être associées aux threads exécutés en activant ces spans dans le ScopeManager. Comme certaines instrumentations personnalisées n'activent pas ces spans correctement, elles ne peut pas être mappées avec les threads exécutés. Si une span provient d'une intégration personnalisée, consultez la [documentation relative à l'instrumentation personnalisée][2] pour essayer de résoudre le problème.

## Visualiser un profil à partir d'une trace

{{< img src="tracing/profiling/flamegraph_view.gif" alt="Ouvrir une vue du profil dans un flamegraph">}}

Pour chaque type détaillé, cliquez sur **View profile** pour afficher les mêmes données que celles affichées dans le flamegraph.
Cliquez sur le sélecteur **Span/Trace/Full profile** pour définir le contexte des données :

- **Span** filtre les données de profiling en fonction de la span sélectionnée précédemment.
- **Trace** filtre les données de profiling en fonction de toutes les spans partageant le même processus de service de la span sélectionnée précédemment.
- **Full profile** filtre les données de façon à afficher 60 secondes du processus de service complet qui a exécuté la span sélectionnée précédemment.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/profiler/profiler_troubleshooting#reduce-overhead-from-default-setup
[2]: /fr/tracing/setup_overview/custom_instrumentation/java#manually-creating-a-new-span
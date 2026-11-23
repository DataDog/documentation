---
aliases:
- /fr/tracing/profiling/search_profiles/
- /fr/tracing/profiler/search_profiles/
- /fr/profiler/search_profiles/
further_reading:
- link: profiler/enabling
  tag: Documentation
  text: Activer le profileur en continu pour votre application
- link: getting_started/profiler
  tag: Documentation
  text: Prise en main du profileur
- link: https://learn.datadoghq.com/courses/continuous-profiler-course
  tag: Centre d'apprentissage
  text: Diagnostiquez les problèmes de performance du code avec Continuous Profiler
- link: https://learn.datadoghq.com/courses/profiling-timeline
  tag: Centre d'apprentissage
  text: Optimisez la latence des requêtes avec Profiling Timeline
- link: https://www.datadoghq.com/blog/introducing-datadog-profiling/
  tag: Blog
  text: Présentation du profiling continu en production dans Datadog
- link: https://www.datadoghq.com/blog/continuous-profiler-timeline-view/
  tag: Blog
  text: Diagnostiquez les inefficacités d'exécution et de code à l'aide de la vue
    chronologique de Continuous Profiler.
- link: https://www.datadoghq.com/blog/profiling-visualizations/
  tag: Blog
  text: Visualisations de profilage accessibles
title: Visualisations de profil
---
## Rechercher des profils {#search-profiles}

{{< img src="profiler/search_profiles4.mp4" alt="Rechercher des profils par tags" video=true >}}

Accédez à {{< ui >}}APM{{< /ui >}} > {{< ui >}}Profiles{{< /ui >}} et sélectionnez un service pour afficher ses profils.

Vous pouvez filtrer selon les tags d'infrastructure ou les tags d'application configurés à partir de votre [configuration de tracing d'environnement][1]. Par défaut, les facettes suivantes sont disponibles :

| Facette   | Définition                                                                |
| ------- | ------------------------------------------------------------------------- |
| Env     | L'environnement sur lequel votre application s'exécute (`production`, `staging`). |
| Service | Le nom du [service][2] sur lequel votre code s'exécute.                        |
| Version | La version de votre code.                                                 |
| Host    | Le nom de host sur lequel votre processus profilé s'exécute.                         |
| Runtime | Le type de runtime sur lequel le processus profilé s'exécute (`JVM`, `CPython`).   |

## Visualisations {#visualizations}

### Graphique en flammes {#flame-graph}

Le graphique en flammes est la visualisation par défaut de Continuous Profiler. Celui ci-dessous montre la quantité de CPU utilisée par chaque méthode et comment chaque méthode a été appelée. D'autres [types de profils][4] sont disponibles selon le langage.

{{< img src="profiler/profiling_viz-flamegraph2.png" alt="Un graphique en flammes" >}}

Par exemple, en partant de la première ligne de l'image précédente, `Thread.run()` a appelé `Thread.runWith(Object, Runnable)`, qui a appelé `ThreadPoolExecutor$Worker.run()`, et ainsi de suite.

La largeur d'un cadre représente la part du CPU total qu'il a consommée. Sur la droite, vous pouvez voir une top list {{< ui >}}CPU time by Method{{< /ui >}} qui ne prend en compte que le temps propre, c'est-à-dire le temps qu'une méthode a passé sur le CPU sans appeler une autre méthode.

Par défaut, les cadres plus sombres indiquent une utilisation plus élevée du CPU, tandis que les cadres plus clairs signifient une utilisation plus faible ; les méthodes les plus gourmandes en ressources sont regroupées sur le côté gauche du graphique en flammes.

Les Flame graphs peuvent être inclus dans les Dashboards et Notebooks avec le [Profiling Flame Graph Widget][5]. Les données de profilage exportées vers un Notebook sont conservées pendant un an.

### Vue chronologique {#timeline-view}

La vue chronologique est équivalente au graphique en flammes, avec des modèles basés sur le temps et la répartition du travail sur [la période d'un seul profil](#single-profile), un seul processus dans le [Profiling Explorer][7] et [une trace][6].

Par rapport au Flame graph, la vue chronologique peut vous aider à :

- Isoler les méthodes à pics de consommation
- Démêler les interactions complexes entre les threads
- Mettre en évidence l'activité du runtime qui a impacté le processus

{{< img src="profiler/profiling_viz-timeline3.png" alt="Une chronologie" >}}

Pour accéder à la vue chronologique :

1. Accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Profiles{{< /ui >}} > {{< ui >}}Explorer{{< /ui >}}][7].
2. Réglez l'option {{< ui >}}Visualize as{{< /ui >}} sur {{< ui >}}Thread Timeline{{< /ui >}}.

Selon le runtime et le langage, les lignes de la chronologie varient :

{{< programming-lang-wrapper langs="java,python,go,ruby,nodejs,dotnet,php,full_host" >}}
{{< programming-lang lang="java" >}}
Chaque ligne représente un **thread**. Les threads issus d'un pool commun sont regroupés. Vous pouvez développer le pool pour afficher les détails de chaque thread.

Les lignes du haut correspondent aux activités du runtime susceptibles d'impacter les performances.

Pour plus d'informations sur le débogage des requêtes p95 lentes ou des délais d'attente à l'aide de la chronologie, consultez l'article de blog [Comprendre la latence des requêtes avec le profilage][1].

[1]: https://www.datadoghq.com/blog/request-latency-profiling/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
Consultez les [prerequisites][1] pour savoir comment activer cette fonctionnalité pour Python.

Chaque ligne représente un **thread**. Les threads issus d'un pool commun sont regroupés. Vous pouvez développer le pool pour afficher les détails de chaque thread.

[1]: /fr/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
Consultez les [prerequisites][1] pour savoir comment activer cette fonctionnalité pour Go.

Chaque ligne représente une **goroutine**. Les goroutines créées par la même instruction `go` sont regroupées. Vous pouvez développer le groupe pour afficher les détails de chaque goroutine.

Les lignes du haut correspondent aux activités du runtime susceptibles d'impacter les performances.

Pour plus d'informations sur le débogage des requêtes p95 lentes ou des délais d'attente à l'aide de la chronologie, consultez l'article de blog [Debug Go Request Latency with Datadog's Profiling Timeline][2].

[1]: /fr/profiler/connect_traces_and_profiles/#prerequisites
[2]: https://blog.felixge.de/debug-go-request-latency-with-datadogs-profiling-timeline/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
Consultez les [prerequisites][1] pour savoir comment activer cette fonctionnalité pour Ruby.

Chaque ligne représente un **thread**. Les threads issus d'un pool commun sont regroupés. Vous pouvez développer le pool pour afficher les détails de chaque thread.

L'ID du thread est affiché sous la forme `native-thread-id (ruby-object-id)` où l'ID du thread natif est `Thread#native_thread_id` (lorsqu'il est disponible) et l'ID de l'objet Ruby est `Thread#object_id`.

**Remarque** : La VM Ruby ou votre système d'exploitation peut réutiliser les ID de threads natifs.

[1]: /fr/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
Consultez les [prerequisites][1] pour savoir comment activer cette fonctionnalité pour Node.js.

Il existe une ligne pour le **thread JavaScript**.

Il peut également y avoir des lignes visualisant divers types d'**activités asynchrones** consistant en des requêtes DNS et des opérations de connexion TCP. Le nombre de lignes correspond à
la concurrence maximale de ces activités afin qu'elles puissent être visualisées sans chevauchements.

Les lignes en haut sont des **activités d'exécution** du garbage collector qui peuvent ajouter une latence supplémentaire à votre requête.

[1]: /fr/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
Chaque ligne représente un **thread**. Les threads portant le même nom sont regroupés. Vous pouvez développer un groupe pour afficher les détails de chaque thread. Notez que les threads explicitement créés par le code sont regroupés sous _Managed Threads_.

Les lignes en haut sont des activités d'exécution qui peuvent avoir un impact sur les performances, telles que l'activité du GC.

L'ID du thread est affiché sous la forme `<unique-id> [#OS-thread-id]`.

**Remarque** : Votre système d'exploitation pourrait réutiliser les identifiants de thread.

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
Consultez les [prerequisites][1] pour savoir comment activer cette fonctionnalité pour PHP.

Il existe une ligne pour chaque **thread** PHP (en PHP NTS, il n'y a qu'une seule ligne car il n'y a qu'un seul thread par processus).
Les fibers qui s'exécutent dans ce **thread** sont représentées dans la même ligne.

Les lignes en haut correspondent aux activités d'exécution qui peuvent ajouter une latence supplémentaire à votre requête, en raison de la compilation de fichiers et de la collecte des déchets (GC).

[1]: /fr/profiler/connect_traces_and_profiles/#prerequisites
{{< /programming-lang >}}

{{< programming-lang lang="full_host" >}}
La vue chronologique n'est actuellement pas prise en charge pour le Full Host profiling.
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Série temporelle et tableau {#timeseries-and-table}

Pour chaque runtime, un large ensemble de métriques est disponible, dont vous pouvez [consulter la liste par série temporelle ][3].

### Call graph {#call-graph}

Le Call graph utilise les mêmes données de profilage que les Flame graphs, mais affiche chaque méthode une seule fois, sous forme de nœud unique, avec des arêtes utilisées pour indiquer quelles méthodes se sont appelées entre elles.

L'épaisseur des arêtes est utilisée pour montrer le temps passé à appeler d'autres méthodes, tandis que la couleur et la taille indiquent le temps propre.

{{< img src="profiler/profiling_viz-callgraph.png" alt="Un Call graph" >}}

### Single profile {#single-profile}

Par défaut, les profils sont téléchargés une fois par minute. Selon le langage, ces processus sont profilés entre 15 et 60 secondes.

Pour afficher un profil spécifique, définissez l'option {{< ui >}}Visualize as{{< /ui >}} sur {{< ui >}}Profile List{{< /ui >}} et cliquez sur un élément dans la liste :

{{< img src="profiler/profiling_single-profile2.png" alt="Select a single profile" >}}

L'en-tête contient des informations associées à votre profil, comme le service qui l'a généré, ou l'environnement et la version du code qui y sont associés.

Quatre onglets se trouvent sous l'en-tête de profil :

| Onglet | Définition |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profiles | Flamegraph et tableau de synthèse du profil consulté. Vous pouvez basculer entre les types de profil (par exemple, `CPU`, `Memory allocation`). |
| Insights | Ensemble de fonctions heuristiques qui indiquent d'éventuels problèmes ou points à améliorer dans votre code.                                                            |
| Metrics | Métriques du profileur provenant de tous les profils du même service.                                                                                     |
| Runtime&nbsp;Info | Propriétés du runtime dans les langues prises en charge et tags des profils.                                                                                       |
| Related&nbsp;Processes | Processus associés au profil.                                                                                                                  |

**Note** : Dans le coin supérieur droit de chaque profil, il existe des options pour :

- Comparer ce profil à d'autres
- View repository commit
- View traces for the same process and time frame
- Download the profile
- Open the profile in full page

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/send_traces/#configure-your-environment
[2]: /fr/tracing/glossary/#services
[3]: https://app.datadoghq.com/profiling/explorer?viz=timeseries
[4]: /fr/profiler/profile_types/
[5]: /fr/dashboards/widgets/profiling_flame_graph
[6]: /fr/profiler/connect_traces_and_profiles/#span-execution-timeline-view
[7]: https://app.datadoghq.com/profiling/explorer?viz=thread_timeline
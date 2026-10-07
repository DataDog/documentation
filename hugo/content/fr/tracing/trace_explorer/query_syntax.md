---
aliases:
- /fr/tracing/search_syntax/
- /fr/tracing/trace_search_analytics/
- /fr/tracing/trace_search/
- /fr/tracing/search
- /fr/tracing/getting_further/apm_events/
- /fr/tracing/trace_search_and_analytics/search/
- /fr/tracing/search/
- /fr/tracing/advanced/search/
- /fr/tracing/app_analytics/search
- /fr/tracing/live_search_and_analytics/search
- /fr/tracing/trace_search_analytics/analytics
- /fr/tracing/analytics
- /fr/tracing/visualization/analytics
- /fr/tracing/trace_search_and_analytics/analytics/
- /fr/tracing/app_analytics/analytics
- /fr/tracing/trace_search_and_analytics/query_syntax
- /fr/tracing/trace_explorer/trace_groups
description: Recherche globale de toutes vos traces avec des tags
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Commencer avec la recherche dans Datadog
- link: /tracing/trace_collection/
  tag: Documentation
  text: Découvrir comment configurer le tracing d'APM avec votre application
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Comprendre comment lire une trace Datadog
- link: /tracing/software_catalog/
  tag: Documentation
  text: Découvrez et recensez les services qui rapportent à Datadog
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: /tracing/services/resource_page/
  tag: Documentation
  text: Plonger au cœur des traces et des performances de vos ressources
title: Syntaxe de requête
---
## Requête de recherche {#search-query}

Tous les paramètres de recherche sont contenus dans l'URL de la page, ce qui permet de partager facilement votre vue.

### Syntaxe de recherche {#search-syntax}

Une requête est composée de *termes* et *opérateurs*.

Il existe deux types de *termes* :

* **Attribut de span** : Contenu du span, collecté avec une instrumentation automatique ou manuelle dans l'application.
* **Tag de span** : Enrichissements de contexte liés au span. Par exemple, des tags d'hôte ou de conteneur décrivant l'infrastructure sur laquelle le service fonctionne.
  
Pour combiner plusieurs *termes* en une requête complexe, utilisez l'un des opérateurs booléens suivants :

| **Opérateur** | **Description**                                                                                        | **Exemple**                  |
|:-------------|:-------------------------------------------------------------------------------------------------------|:-----------------------------|
| `AND`        | **Intersection** : les deux termes figurent dans les événements sélectionnés (si rien n'est ajouté, AND est utilisé par défaut) | authentication AND failure |
| `OR`         | **Union** : l'un ou l'autre des termes figure dans les événements sélectionnés | authentication OR password |
| `-`          | **Exclusion** : le terme suivant n'est PAS dans l'événement | authentication AND -password |

### Recherche d'attribut {#attribute-search}

Pour rechercher un attribut de span, vous devez ajouter `@` au début de la clé de l'attribut.

Par exemple, si vous voulez accéder à une span avec l'attribut ci-dessous, vous pouvez utiliser :

`@git.commit.sha:12345`

```json
  "git": {
    "commit": {
      "sha": "12345"
    },
    "repository": {
      "id": "github.com/datadog/datadog"
    }
  }
```

Les attributs de span sont visibles dans l'onglet **Aperçu** du panneau latéral de trace.

**Remarque :** Vous n'avez pas besoin d'utiliser `@` sur les [attributs réservés][17] : `env`, `operation_name`, `resource_name`, `service`, `status`, `span_id`, `timestamp`, `trace_id`, `type`, `link`

### Recherche de tags {#tags-search}

Vos spans héritent des tags des hosts et des intégrations qui les génèrent.

Exemple :

| Requête                                                        | Correspondance                                                                                             |
|:-------------------------------------------------------------|:--------------------------------------------------------------------------------------------------|
| `(hostname:web-server OR env:prod)`                          | Toutes les traces avec la balise d'infrastructure `hostname:web-server` ou l'attribut réservé `env:prod` |
| `(availability-zone:us-east OR container_name:api-frontend)` | Toutes les traces avec l'une de ces balises d'infrastructure |
| `(service:api AND -kube_deployment:canary)`                  | Toutes les traces du service `api` qui ne sont pas déployées sur le déploiement `canary` |

Les balises de span sont visibles dans l'onglet **Infrastructure** du panneau latéral de trace.

#### Formats de balises non standards {#non-standard-tag-formats}

Si vos balises ne respectent pas [les meilleures pratiques des balises][2], alors n'utilisez pas la syntaxe `key:value`. Utilisez plutôt la requête de recherche suivante :

`tags:<MY_TAG>`

Par exemple, cette balise ne suit pas les meilleures pratiques :  
`auto-discovery.cluster-autoscaler.k8s.io/daffy`

Pour rechercher cette balise, utilisez la requête suivante :  
`tags:"auto-discovery.cluster-autoscaler.k8s.io/daffy"`

### Wildcards{#wildcards}

Pour effectuer une recherche avec un wildcard multi-caractères, utilisez le symbole `*` comme suit :

* `service:web*` correspond à chaque trace ayant un service commençant par `web`
* `@url:data*` correspond à chaque trace ayant un `url` commençant par `data`.

### Valeurs numériques {#numerical-values}

Utilisez `<`, `>`, `<=` ou `>=` pour effectuer une recherche sur des attributs numériques. Par exemple, récupérez toutes les traces ayant un temps de réponse supérieur à 100 ms avec :

`@http.response_time:>100`

Il est également possible de rechercher des attributs numériques dans une plage spécifique. Par exemple, récupérez toutes vos erreurs 4xx avec :

`@http.status_code:[400 TO 499]`

### Autocomplétion {#autocomplete}

Taper une requête complexe peut être fastidieux. Utilisez la fonctionnalité de saisie automatique de la barre de recherche pour compléter votre requête en utilisant des valeurs existantes :

{{< img src="tracing/app_analytics/search/search_bar_autocomplete.png" alt="auto-complétion de la barre de recherche " style="width:60%;">}}

### Échappement des caractères spéciaux {#escaping-of-special-characters}

Les attributs suivants sont considérés comme spéciaux : `?`, `>`, `<`, `:`, `=`, `"`, `~`, `/` et `\` nécessitent un échappement.
Par exemple, pour rechercher des traces contenant `user=JaneDoe` dans leur `url`, la recherche suivante doit être saisie :

`@url:*user\=JaneDoe*`

La même logique doit être appliquée aux espaces dans les attributs de trace. Il n'est pas recommandé d'avoir des espaces dans les attributs de trace, mais dans de tels cas, les espaces nécessitent un échappement.
Si un attribut s'appelle `user.first name`, effectuez une recherche sur cet attribut en échappant l'espace :

`@user.first\ name:myvalue`

### Recherches enregistrées {#saved-searches}

Ne perdez pas de temps à construire les mêmes vues chaque jour. Les recherches enregistrées contiennent votre requête de recherche, les colonnes et l'horizon temporel. Elles sont ensuite disponibles dans la barre de recherche grâce à l'auto-complétion qui correspond soit au nom de la recherche, soit à la requête.

{{< img src="tracing/app_analytics/search/saved_search.png" alt="Recherche enregistrée" style="width:80%;">}}

Pour supprimer une recherche enregistrée, cliquez sur l'icône en forme de corbeille sous le menu déroulant de la recherche de traces.

### Rechercher des services et des entités {#search-for-services-and-entities}

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
Pour rechercher un service, utilisez l'attribut `service`. Pour rechercher un autre [type d'entité][20] (par exemple, une base de données, une file d'attente ou un fournisseur tiers), reposez-vous sur d'autres [attributs pairs][21] que Datadog utilise pour décrire les dépendances qui ne sont pas instrumentées avec APM. Par exemple, pour trouver des spans représentant des appels à une table `users` d'une base de données postgres, utilisez la requête suivante : `@peer.db.name:users @peer.db.system:postgres`

**Remarque** : Le tag `service` du span représente le service **émettant** le span si vous avez migré vers la [nomenclature de service globale][22] en définissant `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAME_ENABLED=true`.

[20]: /fr/tracing/services/inferred_services
[21]: /fr/tracing/services/inferred_services#peer-tags
[22]: /fr/tracing/services/inferred_services#migrate-to-global-default-service-naming
{{< /site-region >}}

## Plage horaire {#time-range}

La plage horaire vous permet d'afficher des traces dans une période donnée. Changez rapidement la plage horaire en sélectionnant une plage prédéfinie dans le menu déroulant (ou [en saisissant une plage horaire personnalisée][3]) :

{{< img src="tracing/app_analytics/search/time_frame2.png" style="width:50%;" alt="Sélectionner la période" >}}

## Table des spans {#span-table}

Le tableau des spans est la liste des spans qui correspondent au contexte sélectionné. Un contexte est défini par un filtre de [barre de recherche](#search-bar) et une [plage horaire](#time-range).

{{< site-region region="ap1,ap2,us3,us5,eu,us" >}}
### La colonne de service {#the-service-column}

Par défaut, la colonne de service affiche l'attribut `service` réservé du span.

{{< img src="tracing/app_analytics/search/span_table_service.png" style="width:60%;" alt="Colonne de service du tableau des spans" >}}

Lorsque la span représente un appel client depuis un service instrumenté vers un service déduit, la colonne service affiche :
- le **service**, identifié par l'attribut `service` réservé.
- le **[service inféré][4]** : nom de l'entité inférée appelée par le service de base, identifiée par l'un des [attributs pairs][5]

{{< img src="tracing/app_analytics/search/span_table_inferred_service.png" style="width:90%;" alt="Colonne de service du tableau des spans avec service inféré" >}}

Lorsque le nom de service est une substitution du nom du service de base, la colonne service affiche :
- le **[service de base][2]** : service à partir duquel le span est émis, identifié par l'attribut `@base_service`.
- le **[service override][3]** : nom du service, différent du nom du service de base, défini automatiquement dans les intégrations Datadog ou modifié via l'API programmatique. Le service override est identifié par l'attribut `service` réservé.

{{< img src="tracing/app_analytics/search/span_table_service_override.png" style="width:80%;" alt="Colonne de service du tableau des spans avec service override" >}}

[2]: /fr/tracing/guide/service_overrides#base-service
[3]: /fr/tracing/guide/service_overrides
[4]: /fr/tracing/services/inferred_services
[5]: /fr/tracing/services/inferred_services#peer-tags
{{< /site-region >}}

### Affichage d'une trace complète {#displaying-a-full-trace}

Cliquez sur une span pour afficher les détails de la trace associée :

{{< img src="tracing/app_analytics/search/trace_in_tracestream.png" alt="Trace dans le flux de traces" style="width:80%;">}}

### Colonnes {#columns}

Pour ajouter d'autres [span tags ou attributs][23] en tant que colonnes à la liste, cliquez sur le bouton **Options** et sélectionnez la dimension que vous souhaitez ajouter :

{{< img src="tracing/app_analytics/search/trace_list_with_column.png" alt="Liste de traces avec colonnes" style="width:80%;">}}

### Groupes de traces {#trace-groups}

Regroupez la requête par toute balise ou attribut span pour observer les comptes de requêtes, les taux d'erreur et les distributions de latence dans la vue de liste. Vous pouvez sélectionner jusqu'à quatre dimensions dans la clause **Grouper par**.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_clause.png" alt="Clause de regroupement" style="width:90%;" >}}

#### Requêtes 'Grouper par' avancées {#advanced-group-by-queries}

Après avoir sélectionné une dimension à regrouper, vous pouvez spécifier d'où obtenir les valeurs de la dimension en utilisant le menu déroulant **de** : 
- **Span** : Regroupez par la dimension du span interrogé (par défaut). Par exemple, `a`.
- **Parent du span** : Regroupez par la dimension spécifiée du span parent des spans correspondant à la requête. Par exemple, pour visualiser comment un point de terminaison API fonctionne en fonction du service qui l'appelle, regroupez par `service` de `parent(a)`.
- **Span racine** : Regroupez par la dimension spécifiée du span racine de la trace. Par exemple, pour analyser les modèles de requêtes backend en fonction des pages frontend d'où proviennent les requêtes, regroupez par `@view.name` de `root`.

{{< img src="/tracing/trace_explorer/trace_groups/group_by_root.png" alt="Regroupez par depuis la racine" style="width:90%;" >}}

#### Voir les groupes de traces dans la liste des groupes {#view-trace-groups-in-the-group-list}

Les groupes de traces sont affichés comme des valeurs uniques de la dimension sélectionnée. Chaque groupe est présenté avec trois indicateurs clés :
- **REQUÊTES** : Nombre de spans au sein du groupe.
- **ERREURS** : Taux d'erreur et nombre d'erreurs.
- **P95 Latency** : Latence P95 des spans.

Pour voir ces indicateurs agrégés sur le span parent ou racine au lieu du span interrogé, sélectionnez `parent(a)` ou `root` dans l'instruction **Afficher les indicateurs de**.

De plus, le `Latency Breakdown` montre comment le temps est réparti entre différents services au sein des requêtes de chaque groupe, vous permettant de repérer visuellement les goulets d'étranglement de latence pour les groupes donnés.

{{< img src="/tracing/trace_explorer/trace_groups/group_list.png" alt="Liste des groupes" style="width:90%;" >}}

Pour une analyse plus approfondie, cliquez sur n'importe quel groupe pour examiner les événements individuels qui composent les métriques agrégées.

## Facettes {#facets}

Une facette affiche toutes les valeurs distinctes d'un attribut ou d'une étiquette et fournit des analyses de base telles que le nombre de traces représentées. Ce commutateur permet également de filtrer vos données.

Les facettes vous permettent de pivoter ou de filtrer vos ensembles de données en fonction d'un attribut donné. Des exemples de facettes incluent des utilisateurs, des services, etc...

{{< img src="tracing/app_analytics/search/facets_demo.png" alt="Démonstration des facettes" style="width:80%;">}}

### Mesures {#measures}

Les mesures sont un type spécifique de facettes destiné aux valeurs quantitatives.

Les mesures vous permettent d'accomplir les tâches suivantes :
* Valeurs agrégées provenant de plusieurs traces. Par exemple, créez une mesure sur le nombre de lignes dans Cassandra et visualisez le P95 ou les référents les plus importants par somme de taille de fichier demandée.
* Calculez numériquement les services ayant la latence la plus élevée pour les valeurs de panier d'achat supérieures à 1000 $.
* Filtrer les valeurs continues. Par exemple, la taille en octets de chaque segment de charge utile d'un flux vidéo.

**Types**

Les mesures disposent d'un entier (long) ou d'une double valeur. Ces deux types proposent des fonctionnalités équivalentes.

**Unités**

Les mesures prennent en charge les unités (temps en secondes ou taille en octets) pour le traitement des ordres de grandeur lors de la requête et de l'affichage. L'unité est une propriété de la mesure elle-même, et non du champ. Par exemple, considérez une mesure de durée en nanosecondes : vous avez une étiquette de portée de `service:A` où `duration:1000` représente `1000 milliseconds`, et d'autres étiquettes de portée de `service:B` où `duration:500` représente `500 microseconds` :
Convertissez la durée en nanosecondes pour toutes les balises span traitées par le processeur arithmétique. Utilisez un multiplicateur de `*1000000` sur les balises span de `service:A`, et un multiplicateur de `*1000` sur les balises span de `service:B`.
Utilisez `duration:>20ms` (voir la syntaxe de recherche pour référence) pour interroger de manière cohérente les balises span des deux services en même temps, et voir un résultat agrégé d'une minute maximum.

### Créez une facette {#create-a-facet}

Pour commencer à utiliser un attribut en tant que facette ou dans une recherche, cliquez dessus et ajoutez-le en tant que facette :

{{< img src="tracing/app_analytics/search/create_facet.png" style="width:50%;" alt="Créez une facette" style="width:50%;">}}

Après avoir créé une nouvelle facette, elle est disponible dans le volet de facettes pour le filtrage et l'analyse de base.

### Panneau de facettes {#facet-panel}

Utilisez des facettes pour filtrer vos traces. La barre de recherche et l'URL reflètent automatiquement vos sélections.

{{< img src="tracing/app_analytics/search/facet_panel.png" alt="Volet des facettes" style="width:30%;">}}

## Visualisations {#visualizations}

Sélectionnez un type de visualisation d'analyse à l'aide du sélecteur d'analyse :

* [Séries temporelles](#timeseries)
* [Liste des meilleurs](#top-list)
* [Tableau](#table)

### Séries temporelles {#timeseries}

Visualisez l'évolution de la métrique `Duration` (ou un compte unique de valeurs d'une facette) sur une période de temps sélectionnée, et (optionnellement) divisez par une facette disponible.

Les analyses de séries temporelles suivantes montrent l'évolution de la **pc99** **durée** par étapes de **5min** pour chaque **Service**.

{{< img src="tracing/app_analytics/analytics/timeserie_example.png" alt="exemple de série temporelle" style="width:90%;">}}

### Liste des meilleurs {#top-list}

Visualisez les meilleures valeurs d'une facette selon leur `Duration` (ou un compte unique de valeurs d'une facette).

Les analyses de liste principale suivantes montrent la **pc99** **durée** de **Service** :

{{< img src="tracing/app_analytics/analytics/top_list_example.png" alt="exemple de liste principale" style="width:90%;">}}

### Table {#table}

Visualisez les valeurs principales d'une facette selon une [mesure][9] choisie (la première mesure que vous choisissez dans la liste), et affichez la valeur des mesures supplémentaires pour les éléments apparaissant dans cette liste principale. Mettez à jour la requête de recherche ou examinez les journaux correspondant à l'une ou l'autre dimension.

* Lorsque plusieurs dimensions sont présentes, les valeurs principales sont déterminées selon la première dimension, puis selon la deuxième dimension parmi les valeurs principales de la première dimension, puis selon la troisième dimension parmi les valeurs principales de la deuxième dimension.
* Lorsque plusieurs mesures sont présentes, la liste supérieure ou inférieure est déterminée selon la première mesure.
* Le sous-total peut différer de la somme réelle des valeurs dans un groupe, car seul un sous-ensemble (supérieur ou inférieur) est affiché. Les événements avec une valeur nulle ou vide pour cette dimension ne sont pas affichés comme un sous-groupe.

**Remarque** : Une visualisation de tableau utilisée pour une seule mesure et une seule dimension est la même qu'une liste principale, juste avec un affichage différent.

Les analyses de journaux de tableau suivantes montrent l'évolution des **codes d'état principaux** selon leur **débit**, ainsi que le nombre d'**adresses IP client** uniques, et ce, au cours des 15 dernières minutes :

{{< img src="tracing/app_analytics/analytics/trace_table_example.png" alt="exemple de liste principale" style="width:90%;">}}

## Traces associées {#related-traces}

Sélectionnez une section du graphique ou cliquez dessus pour l'agrandir ou consulter la liste des [traces][10] correspondant à votre sélection :

{{< img src="tracing/app_analytics/analytics/view_traces.png" alt="Voir les traces" style="width:40%;">}}

## Exporter {#export}

{{< img src="tracing/app_analytics/analytics/export_button.png" alt="Exporter vos analyses" style="width:40%;">}}

Exporter vos requêtes :

* Pour [surveiller][11]
* Pour [tableau de bord][12]
* Pour [notebook][18]

Vous pouvez également générer une nouvelle mesure pour la requête.

**Remarque** : Les requêtes APM dans les tableaux de bord et [notebook] sont basées sur tous les [spans indexés][14]. Les requêtes APM dans les moniteurs sont basées uniquement sur les spans indexés par [custom retention filters][19].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/java/#integrations
[2]: /fr/getting_started/tagging/#tags-best-practices
[3]: /fr/dashboards/guide/custom_time_frames/
[4]: /fr/tracing/trace_search_and_analytics/
[5]: /fr/tracing/glossary/#apm-event
[6]: /fr/tracing/glossary/#services
[7]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[8]: /fr/tracing/trace_search_and_analytics/query_syntax/#facets
[9]: /fr/tracing/trace_search_and_analytics/query_syntax/#measures
[10]: /fr/tracing/glossary/#trace
[11]: /fr/monitors/types/apm/
[12]: /fr/dashboards/#get-started
[13]: /fr/help/
[14]: /fr/tracing/glossary/#indexed-span
[15]: /fr/dashboards/
[16]: /fr/dashboards/widgets/timeseries/
[17]: /fr/monitors/notify/variables/?tab=is_alert#reserved-attributes
[18]: /fr/notebooks/
[19]: /fr/tracing/trace_pipeline/trace_retention/#retention-filters
[23]: /fr/tracing/trace_explorer/span_tags_attributes
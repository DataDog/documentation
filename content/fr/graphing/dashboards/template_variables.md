---
title: Template Variables
kind: documentation
aliases:
  - /fr/graphing/dashboards/template_variables/correlate-metrics-and-events-using-dashboard-template-variables
  - /fr/graphing/dashboards/template_variables/how-do-i-overlay-events-onto-my-dashboards
further_reading:
  - link: graphing/dashboards/
    tag: Documentation
    text: Apprendre à créer des dashboards dans Datadog
  - link: graphing/dashboards/shared_graph
    tag: Documentation
    text: Partager vos graphiques en dehors de Datadog
  - link: graphing/widgets
    tag: Documentation
    text: Découvrir tous les widgets disponibles pour votre dashboard
---
Les Template Variables de dashboard servent à appliquer un nouveau contexte à un ou plusieurs widgets dans votre dashboard, vous permettant ainsi d'explorer de façon dynamique les métriques associées à différents ensembles de tags en utilisant des variables au lieu de tags spécifiques.

## Définir une Template Variable

Une Template Variable sans clé est déjà appliquée sur les nouveaux dashboards. Cliquez sur l'icône en forme de *crayon* pour ouvrir l'éditeur de Template Variable :

{{< img src="graphing/dashboards/template_variables/edit_mode_template_variable.png" alt="Modification d'une Template Variable" responsive="true" style="width:40%;">}}

Une fois dans l'éditeur, cliquez sur **Add Variable +** pour créer votre première Template Variable. Elle est définie par les paramètres suivants :

* **Name** *(obligatoire)* :
  la valeur à afficher pour votre Template Variable dans vos requêtes de graphique.
* **Tag Group** *(obligatoire)* :
    si vos tags respectent les [recommandations relatives aux tags][1] et utilisent le format `key:value`, le Tag Group correspond à la valeur `key` de vos tags.
* **Default Tag** *(facultatif)* :
  la valeur par défaut pour le Tag Group de votre Template Variable.

Une fois votre Template Variable créée, vous remarquerez que l'interface affiche désormais des statistiques concernant son utilisation dans vos graphiques. Sur l'image ci-dessous, la Template Variable n'est utilisée dans aucun des graphiques du dashboard :

{{< img src="graphing/dashboards/template_variables/stats_tv.png" alt="Statistiques d'utilisation de la TV" responsive="true" style="width:40%;">}}

Vous pouvez ajouter cette Template Variable à tous vos widgets de graphique ou la supprimer en cliquant sur les boutons **Remove From All** et **Add to All**, respectivement.

## Utiliser les Template Variables

### Widgets

Une fois votre Template Variable définie, celle-ci apparaît dans les options affichées pour le champ `from` :

{{< img src="graphing/dashboards/template_variables/tv_in_graph.png" alt="Template Variable dans un graphique" responsive="true" style="width:50%;">}}

Une fois le graphique enregistré, la valeur de cette Template Variable est sélectionnée en haut de votre dashboard :

{{< img src="graphing/dashboards/template_variables/selecting_template_variables.png" alt="Sélection d'une Template Variable" responsive="true" style="width:75%;">}}

#### Template Variables avec requêtes d'APM et de log

Étant donné que les métriques, les logs et l'APM partagent les mêmes tags, les Template Variables peuvent être utilisées sur les widgets créés à partir de requêtes d'APM et de log.
De plus, il est possible de définir des Template Variables de log/d'APM basées sur vos facettes de [log][2] ou d'APM. Ces Template Variables commencent par le caractère `@`.

{{< img src="graphing/dashboards/template_variables/log_template_variables.png" alt="Template Variables de log" responsive="true" style="width:85%;">}}

**Remarque** : si vous utilisez le bouton `Add to all`, cette Template Variable sera uniquement ajoutée à l'ensemble des widgets de log/d'APM.

#### Widget de note

Même si le widget de note ne contient aucun graphique, vous pouvez afficher :

* La Template Variable sélectionnée avec la syntaxe `$<CLÉ_TEMPLATE_VARIABLE>`.
* La valeur de la Template Variable sélectionnée avec la syntaxe `$<CLÉ_TEMPLATE_VARIABLE>.value`.

Par exemple, si la configuration du widget de note est la suivante :

```
$env

$env.value
```

La sélection de la valeur `dev` pour la Template Variable `$env` se traduira par le résultat suivant :

{{< img src="graphing/dashboards/template_variables/template_variable_note_widget.png" alt="Template Variables dans le widget de note" responsive="true" style="width:30%;">}}

### Superposer des événements

La recherche d'[événements à superposer][3] vous permet de corréler des métriques avec des événements. Utilisez les Template Variables pour trouver des événements qui partagent certains tags avec les métriques de votre dashboard. Les événements à superposer sont appliqués à l'ensemble d'un graphique individuel.

Les valeurs des Template Variables de dashboard peuvent être directement recueillies en utilisant la syntaxe `$<CLÉ_TEMPLATE_VARIABLE>.value` dans le champ de recherche d'événement.

**Remarque** : les Template Variables de dashboard doivent être des tags de métrique ; les tags issus des événements ne peuvent pas être utilisés comme Template Variables de dashboard.

#### Template Variable unique

Par exemple, pour rechercher des événements partageant le même tag region, utilisez : `tags:region:$region.value`.

{{< img src="graphing/dashboards/template_variables/tv5.png" alt="tv5" responsive="true" style="width:75%;">}}

Dans l'exemple qui suit, la Template Variable correspond à `tags:region:ap-south-1`. Lorsque ces événements apparaissent dans le champ de recherche d'événements à superposer, leur occurrence est signalée par des barres roses sur les graphiques :

{{< img src="graphing/dashboards/template_variables/tv7.png" alt="tv7" responsive="true" style="width:85%;">}}

#### Template Variables multiples

Choisissez plusieurs Template Variables dans le champ de recherche pour afficher tous les événements tagués correspondants. L'exemple suivant utilise la requête : `tags:role:$role.value,env:$env.value`

{{< img src="graphing/dashboards/template_variables/tv8.png" alt="tv8" responsive="true" style="width:85%;">}}

#### Associer des Template Variables à d'autres tags

Utilisez la syntaxe `$<CLÉ_TEMPLATE_VARIABLE>.value` pour recueillir les données `key:value` d'une Template Variable spécifique et l'utiliser avec d'autres filtres.

L'exemple ci-dessous utilise les tags `env` avec le `tag` `hosts` dans la syntaxe de recherche `tags:env:$env.value hosts:$host.value`

{{< img src="graphing/dashboards/template_variables/tv9.png" alt="tv9" responsive="true" style="width:85%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tagging/#tags-best-practices
[2]: /fr/logs/explorer/?tab=facets#setup
[3]: /fr/graphing/event_stream
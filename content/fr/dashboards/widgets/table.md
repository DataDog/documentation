---
title: Widget Tableau
widget_type: query_table
aliases:
  - /fr/graphing/widgets/table/
further_reading:
  - link: /dashboards/timeboards/
    tag: Documentation
    text: Timeboards
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboards
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
## Présentation

La visualisation Tableau est disponible sur les dashboards. Elle permet d'afficher des données agrégées regroupées par clé de tag sous forme de colonnes. L'exemple suivant affiche les métriques `system.cpu.system` et `system.cpu.user` regroupées par `service` :

{{< img src="dashboards/widgets/table/table_widget_1.png" alt="Widget Tableau" style="width:80%;">}}

## Configuration

### Configuration

* Choisissez les données à représenter (ajoutez des colonnes supplémentaires en fonction de vos besoins) :
  * Métrique : consultez la [documentation principale sur les graphiques][1] pour configurer une requête de métrique.
  * Événements de log : consultez la [documentation sur la recherche de logs][2] pour configurer une requête d'événement de log.
  * Spans indexées : consultez la [documentation dédiée][3] pour configurer une requête de span indexée.
  * Événements RUM : consultez la [documentation relative à la syntaxe de recherche RUM][4] pour configurer une requête RUM.
  * Métriques de profiling : consultez la [documentation relative aux profils de recherche][5] pour configurer une requête de profiling.
  * Signaux de sécurité : consultez la [documentation relative au Security Signals Explorer][6] pour configurer une requête de signal de sécurité.
  * Statistiques APM : consultez la [documentation dédiée][7] pour configurer une requête de statistiques APM.
* Vous pouvez renommer les en-têtes de colonne en définissant des alias de métrique.
* Pour les **Rows** (rangs), définissez l'option **Group by** sur la clé de tag à utiliser pour le regroupement. L'exemple ci-dessous affiche les rangs `service`.
* Choisissez une limite pour le nombre de résultats (par défaut, 10).
* Choisissez la métrique à utiliser pour trier le tableau (par défaut, il s'agit de la première colonne).
* Facultatif :
  * Définissez une mise en forme conditionnelle (avec les optons **bar/number** et **color**) en fonction de la valeur des cellules de chaque colonne.
  * Définissez si la barre de recherche doit s'afficher ou non. L'option **Auto**, appliquée par défaut, affiche la barre de recherche en fonction de la taille du widget. Ainsi, si la fenêtre devient trop petite, le widget affiche en priorité les données et masque la barre de recherche. Cette dernière continue à s'afficher en mode plein écran.

{{< img src="dashboards/widgets/table/table_setup_1.png" alt="Configuration du widget Tableau" style="width:80%;">}}

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][8] pour en savoir plus.

Le [schéma JSON][9] utilisé pour le widget Tableau est le suivant :

{{< dashboards-widgets-api >}}

## Formules et fonctions

Vos widgets Tableau peuvent comporter des formules et des fonctions basées sur différentes sources de données.

Dans l'exemple suivant, la colonne `Average` calcule le taux `Total Enterprise Customers` / `Total Revenue Enterprises` pour la `cart_value` des événements de log associés à des données du niveau Enterprise.

{{< img src="dashboards/widgets/table/table_formulas_functions.png" alt="Formules et fonctions du widget Tableau" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/querying/#configuring-a-graph
[2]: /fr/logs/search_syntax/
[3]: /fr/tracing/trace_explorer/query_syntax/
[4]: /fr/real_user_monitoring/explorer/search_syntax
[5]: /fr/tracing/profiler/search_profiles
[6]: /fr/security_monitoring/explorer/
[7]: /fr/dashboards/querying/#configuring-an-apm-stats-graph
[8]: /fr/api/v1/dashboards/
[9]: /fr/dashboards/graphing_json/widget_json/
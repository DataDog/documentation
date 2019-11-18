---
title: Corrélation de métriques
kind: documentation
beta: true
further_reading:
- link: graphing/dashboards
  tag: Documentation
  text: Dashboards Datadog
- link: graphing/notebooks
  tag: Documentation
  text: Notebooks Datadog
- link: /tracing/visualization/service
  tag: Documentation
  text: Page Service APM
- link: /watchdog
  tag: Documentation
  text: Watchdog
---

<div class="alert alert-warning">
Les corrélations sont en bêta publique. Demandez l'accès à cette fonctionnalité en contactant <a href="/help">l'assistance Datadog</a>.
</div>

## Présentation

Les corrélations de métriques vous aident à identifier les causes potentielles d'un problème en recherchant d'autres métriques affichant un comportement anormal dans la même période. Les corrélations examinent vos métriques issues de différentes sources, telles que les dashboards, les intégrations, l'APM et les métriques custom.

## Recherche

Vous pouvez commencer à explorer vos corrélations de métriques depuis n'importe quelle page des dashboards, des notebooks, de l'APM, des stories Watchdog ou de statut des monitors.

* Cliquez sur n'importe quel graphique et sélectionnez **Find correlated metrics**.
* Depuis un graphique affiché en plein écran, cliquez sur l'onglet **Correlations**.
* Les corrélations *tentent* de détecter automatiquement la zone d'intérêt (c'est-à-dire la zone de comportement anormal) pour votre métrique.
* Si la zone d'intérêt n'est pas sélectionnée automatiquement, ou si elle doit être ajustée, dessinez manuellement la zone d'intérêt via l'option [Edit Search](#modifier).
* Datadog recherche d'autres métriques affichant un comportement anormal dans la même période que la zone d'intérêt.

{{< img src="graphing/correlations/dashboard_search1.png" alt="Recherche depuis un dashboard" responsive="true" style="width:80%;">}}

{{< img src="graphing/correlations/dashboard_search2.png" alt="Recherche depuis un dashboard" responsive="true" style="width:80%;">}}

**Remarque** : les recherches de corrélations sont disponibles pour une seule métrique. Pour les graphiques représentant plusieurs métriques, sélectionnez la série qui vous intéresse. Depuis un graphique affiché en plein écran, sélectionnez une série dans la légende du graphique, puis cliquez sur l'onglet **Correlations**.

### Modifier la recherche

Vous pouvez personnaliser les paramètres de recherche par défaut en cliquant sur le bouton **Edit Search**.

* Cliquez sur le graphique et déplacez votre curseur pour définir l'intervalle sur lequel la recherche de corrélations doit être effectuée. Si une zone est déjà sélectionnée (cadre rose), vous pouvez déplacer ou redimensionner la sélection.
* Définissez les sources à utiliser pour la recherche de corrélations (services APM, intégrations, dashboards ou métriques custom).
* Utilisez l'option `Auto-select` ou sélectionnez les catégories de votre choix via l'option `Custom select`. Pour les métriques custom, au moins une catégorie doit être sélectionnée.
* La seule catégorie qui n'est pas sélectionné par défaut est celle des métriques custom. Choisissez les espaces de nommage de métriques ou les métriques uniques à utiliser pour votre recherche de corrélations.

{{< img src="graphing/correlations/edit_search.png" alt="Edit search" responsive="true" style="width:80%;">}}

### Résultats

Une liste de résultats s'affiche sous le graphique de recherche, avec les éléments suivants :

* **Type** : un graphique représentant le type de source (service APM, intégration, dashboard ou métrique custom).
* **Source** : le nom de la source pour les métriques corrélées.
* **Correlations** : le nombre de métriques corrélées trouvées.
* **Preview** : un graphique de prévisualisation des métriques corrélées.

{{< img src="graphing/correlations/search_results.png" alt="Résultats de la recherche" responsive="true" style="width:80%;">}}

Vous pouvez explorer les détails dès le début du chargement des résultats, sans avoir à attendre que celui-ci se termine. Lorsque la recherche est terminée, le message « Search completed! » s'affiche.

## Analyser les résultats

Sélectionnez une rangée dans la liste de résultats pour en examiner les détails.

* Comme avec les dashboards, passez la souris sur un graphique pour créer une ligne synchronisée sur tous les autres graphiques.
* Pour visualiser l'ensemble des sources, supprimez le filtre dans le menu.
* Cliquez sur le nom d'une source de métrique pour y accéder. Par exemple, le nom d'un dashboard renvoie au dashboard concerné.
* Utilisez l'icône d'exportation pour exporter le graphique vers un dashboard ou un notebook, ou pour copier la requête.

{{< img src="graphing/correlations/detail_view.png" alt="Vue détaillée" responsive="true" style="width:90%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

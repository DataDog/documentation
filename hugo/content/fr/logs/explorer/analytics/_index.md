---
aliases:
- /fr/logs/explorer/group
- /fr/logs/group
description: Regroupez les logs interrogés en champs, modèles et transactions, et
  créez plusieurs requêtes de recherche, formules et fonctions pour une analyse approfondie.
further_reading:
- link: logs/explorer/search
  tag: Documentation
  text: Filtrer les logs
- link: logs/explorer/visualize
  tag: Documentation
  text: Créer des visualisations à partir de logs
- link: /logs/explorer/export
  tag: Documentation
  text: Parcourir les vues du Log Explorer
- link: https://www.datadoghq.com/blog/add-context-with-reference-tables/
  tag: Blog
  text: Ajoutez plus de contexte à vos logs avec les tables de référence
title: Analyse de logs
---

## Présentation

Les logs peuvent être utiles en tant qu'événements individuels, mais les sous-ensembles d'événements peuvent également revêtir un certain intérêt. 

{{< whatsnext desc="Pour exposer ces informations, vous pouvez regrouper vos logs en :" >}}
    {{< nextlink href="logs/explorer/analytics/#group-logs-by-fields" >}}Champs{{< /nextlink >}}
    {{< nextlink href="logs/explorer/analytics/patterns" >}}Modèles{{< /nextlink >}}
    {{< nextlink href="logs/explorer/analytics/transactions" >}}Transactions{{< /nextlink >}}
{{< /whatsnext >}}

L'éditeur de requête de logs vous permet de modifier rapidement l'agrégation appliquée à vos logs interrogés. Lorsque vous basculez vers une autre visualisation et un autre type d'agrégation, les champs que vous avez sélectionnés pour regrouper, agréger et mesurer vos logs sont conservés.

{{< img src="logs/explorer/aggregations.jpg" alt="Un graphique à barres représentant des logs et l'option permettant de regrouper des logs dans des champs, patterns et transactions" style="width:100%;" >}}

Vous pouvez ajouter [plusieurs requêtes](#plusieurs-requetes) afin d'analyser simultanément différents ensembles de logs, et appliquez des [formules](#formules) et des [fonctions](#fonctions) à vos requêtes pour approfondir vos analyses.

Les agrégations sont uniquement prises en charge pour les **logs indexés**. Si vous souhaitez agréger des logs qui n'ont pas été indexés, vous pouvez [désactiver temporairement vos filtres d'exclusion][1], générer [des métriques basées sur des logs][2] ou procéder à une [réintégration][3] de logs à partir de vos archives.

## Regrouper les logs en champs

Lors de l'agrégation de logs indexés par **Champs**, tous les logs correspondant à votre filtre de requête sont agrégés dans des groupes en fonction des valeurs de la requête de recherche. 

En plus de ces agrégats, vous pouvez extraire les mesures suivantes :

- Le **nombre de logs** par groupe
- Le **nombre de valeurs codées uniques** pour la valeur d'une recherche de requête par groupe (`count unique of` dans l'interface utilisateur)
- Les **opérations statistiques** (`min`, `max`, `avg` et `percentiles`) effectuées sur les valeurs numériques de la valeur d'une recherche de requête par groupe

Si un log individuel présente plusieurs valeurs de recherche de requête, il appartient à autant de groupes qu'il existe de valeurs. Par exemple, si un log possède à la fois les tags `team:sre` et `team:marketplace`, il est comptabilisé une fois dans le groupe `team:sre` et une fois dans le groupe `team:marketplace`.

### Visualiser les groupes de logs

L'agrégation en **champs** prend en charge une dimension pour la visualisation en [Top List][4], et jusqu'à quatre dimensions pour les visualisations en [série temporelle][5], en [tableau][6], en [carte proportionnelle][7] et en [graphique circulaire][8]. 

Lorsque plusieurs dimensions sont définies, les valeurs les plus élevées sont déterminées en fonction de la première dimension, puis de la seconde dans la fourchette des valeurs les plus élevées de la première dimension, puis de la troisième dans la fourchette des valeurs les plus élevées de la seconde dimension.

### Plusieurs requêtes

Vous pouvez utiliser plusieurs requêtes à la fois avec les [séries temporelles][5] et les [tableaux][4]. Pour ajouter plusieurs requêtes, cliquez sur le bouton `+ Add` en regard de l'éditeur de requêtes. Lorsque vous ajoutez une nouvelle requête, elle copie la valeur et les options de regroupement de la dernière requête définie :

{{< img src="logs/explorer/group/add_multiple_queries.mp4" alt="Un utilisateur ajoutant plusieurs requêtes dans l'éditeur de requête" video=true style="width:100%;" >}}

Pour afficher ou masquer des requêtes dans la visualisation actuelle, cliquez sur leur lettre dans l'éditeur de requête :

{{< img src="logs/explorer/group/select_multiple_queries.jpg" alt="L'éditeur de requête avec deux requêtes, A et B" style="width:100%;" >}}

Par défaut, lorsque vous créez une requête, elle est automatiquement affichée dans la visualisation sélectionnée.

Pour afficher la chronologie de l'une de vos requêtes, sélectionnez la requête en question dans la liste déroulante `Timeline for`. Pour appliquer un filtre basé sur l'une de vos requêtes de recherche, sélectionnez la requête en question dans la liste déroulante `Use facets with`, puis cliquez sur les valeurs dans le [volet des facettes][9]. Les facettes que vous choisissez sont uniquement appliquées à la requête sélectionnée.

{{< img src="logs/explorer/group/query_selector.jpg" alt="L'éditeur de requête affichant la chronologie pour les données sélectionnées, avec des options pour la requête A et la requête B" style="width:100%;" >}}

### Fonctions

Les fonctions sont compatibles avec toutes les visualisations.

Pour appliquer des fonctions à vos logs, cliquez sur l'agrégation `Fields` dans l'éditeur de requête. Vous pouvez également sélectionner un champ à facette auquel vous souhaitez appliquer une fonction, puis cliquer sur l'icône `Σ` en regard de la mesure. Sélectionnez ou recherchez ensuite la fonction que vous souhaitez appliquer au champ de log.

{{< img src="logs/explorer/group/add_function.mp4" alt="Un utilisateur personnalisant une fonction à l'aide de l'éditeur de requête" video=true style="width:100%;" >}}

Toutes les fonctions proposées pour les logs dans l'éditeur graphique des dashboards sont également disponibles dans le Log Explorer :

- [Opérations arithmétiques][10]
- [Interpolation][11]
- [Décalage temporel][12]
- [Taux][13]
- [Lissage][14]
- [Cumul][15]
- [Exclusion][16]

Dans l'exemple ci-dessous, une [fonction d'exclusion][16] est appliquée afin d'exclure certaines valeurs de vos logs :

{{< img src="logs/explorer/group/exclusion_function_logs.jpg" alt="Une requête pour laquelle le paramètre cutoff_min du filtre d'exclusion a été défini sur 100" style="width:100%;" >}}

### Formules

Cliquez sur le bouton `+ Add` dans l'éditeur de requête pour appliquer une formule à une ou plusieurs requêtes. La formule de l'exemple suivant permet de calculer le taux de valeurs uniques de `Cart Id` dans les logs pour les clients dont le niveau est `Merchant Tier: Enterprise` / `Merchant Tier: Premium` :

{{< img src="logs/explorer/group/multiple_query_formula.jpg" alt="L'éditeur de requête avec une formule divisant la requête A par la requête B" style="width:100%;" >}}

Pour appliquer des formules à plusieurs requêtes, toutes les requêtes doivent être regroupées en fonction de la même valeur de recherche de requête. Dans l'exemple ci-dessus, les deux requêtes sont regroupées en fonction de `Webstore Store Name`.

Pour appliquer une fonction à une formule, cliquez sur l'icône `Σ`. Dans l'exemple suivant, une [fonction de décalage temporel][12] est appliquée à la proportion de logs d'erreur parmi l'ensemble des logs, afin de comparer les dernières données avec celles de la semaine précédente :

{{< img src="logs/explorer/group/timeshift_function_logs.jpg" alt="L'éditeur de requête avec une formule utilisant un décalage temporel sur la semaine précédente" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/indexes/#switch-off-switch-on
[2]: /fr/logs/logs_to_metrics
[3]: /fr/logs/log_configuration/rehydrating/
[4]: /fr/logs/explorer/visualize/#top-list
[5]: /fr/logs/explorer/visualize/#timeseries
[6]: /fr/logs/explorer/visualize/#nested-tables
[7]: /fr/dashboards/widgets/treemap
[8]: /fr/dashboards/widgets/pie_chart
[9]: /fr/logs/explorer/facets/#facet-panel
[10]: /fr/dashboards/functions/arithmetic
[11]: /fr/dashboards/functions/interpolation
[12]: /fr/dashboards/functions/timeshift
[13]: /fr/dashboards/functions/rate
[14]: /fr/dashboards/functions/smoothing
[15]: /fr/dashboards/functions/rollup
[16]: /fr/dashboards/functions/exclusion
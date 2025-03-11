---
title: Explorer des échantillons de requêtes
description: Obtenir des informations sur les requêtes en cours d'exécution et identifier les singularités problématiques
further_reading:
  - link: /database_monitoring/
    tag: Documentation
    text: Database Monitoring
  - link: /database_monitoring/data_collected/
    tag: Documentation
    text: Données collectées
  - link: /database_monitoring/troubleshooting/
    tag: Documentation
    text: Dépannage
---
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

La vue Query Samples vous aide à identifier les requêtes qui s'exécutent à un instant donné. Comparez chaque exécution aux performances moyennes de la requête et des requêtes connexes.

Pour accéder à la vue Query Samples depuis l'interface Database Monitoring, accédez à **[APM > Databases][1]**, puis sélectionnez l'onglet **Query Samples**.

La page Query Samples affiche un snapshot ponctuel des requêtes en cours d'exécution et récemment terminées. Puisque ces données sont ponctuelles, le snapshot ne représente pas forcément _toutes_ les requêtes, mais peut vous donner une idée des proportions.

## Rechercher et filtrer des requêtes

La page Query Samples affiche les requêtes de l'ensemble des produits de gestion de bases de données pris en charge (contrairement à la page Query Metrics, où vous devez sélectionner une base de données à analyser). Filtrez la facette `source` pour visualiser des données pour une base de données spécifique (Postgres ou MySQL).

Dans le champ Search, saisissez les tags en fonction desquels filtrer la liste d'échantillons de requêtes. Vous pouvez également utiliser les facettes répertoriées sur la gauche. Les facettes suivantes sont disponibles :

- **Core** : services, sources de produits de gestion de bases de données (Postgres ou MySQL), host et durée.
- **Network** : adresse IP client et ports pour les applications ou proxies qui se connectent à la base de données.
- **Database** : noms de bases de données, curseur relatif aux coûts de plan d'exécution, index, curseur relatif au nombre de lignes renvoyées ou concernées par les requêtes, instructions de requête et utilisateurs.
- **Facettes propres à Postgres et MySQL**

Cliquez sur **Options** pour ajouter des colonnes au tableau. Cliquez sur les en-têtes des colonnes pour les trier en fonction d'une métrique donnée.

### Coût de plan d'exécution

Le coût de plan d'exécution est une mesure sans unité utilisée par la base de données pour comparer deux plans. Cela correspond grossièrement au nombre d'_éléments_ présents dans la base de données (blocs ou pages). Cette mesure sert essentiellement à effectuer des comparaisons relatives de deux plans. Elle ne permet pas d'analyser un seul plan d'exécution. La base de données se base sur cette comparaison pour choisir le plan à utiliser.

Depuis la page Query Samples, vous pouvez filtrer, trier et comparer les coûts de plan d'exécution de plusieurs requêtes. Dans ce contexte, le coût de plan d'exécution ne doit pas être analysé d'un point de vue absolu. Une requête avec un coût de plan d'exécution de 8,5 n'est pas forcément plus efficace qu'une autre avec un coût de 8,7. Cependant, si deux requêtes présentent des coûts très différents alors que cela ne devrait pas être le cas, il peut être utile d'étudier ce qui crée un tel écart. Vous pouvez également trier vos requêtes par coût pour identifier vos requêtes coûteuses, en isolant des facteurs externes comme la latence réseau.

### Index

Vous pouvez filtrer les requêtes avec un plan d'exécution en fonction de l'index de base de données, afin de visualiser les requêtes qui utilisent un index spécifique. Vous pouvez également identifier les index utilisés moins fréquemment en sélectionnant un intervalle de longue durée (par exemple, une semaine), pour obtenir des échantillons représentatifs de requêtes, puis en affichant les index les moins utilisés (le plus petit nombre dans la liste de facettes d'index). Il ne vous reste alors plus qu'à déterminer si le gain de performance obtenu avec ces index vaut la peine de les conserver dans la base de données.

### Nombre de lignes

Filtrez ou triez la vue pour afficher les requêtes qui renvoient ou concernent un grand nombre de lignes lors de l'intervalle sélectionné.

### Durée

Filtrez ou triez la vue pour afficher les requêtes avec le temps d'exécution le plus élevé lors de l'intervalle sélectionné. Pour optimiser vos performances globales, vous pouvez rechercher les propriétaires de ces requêtes lentes et échanger avec eux afin d'améliorer les performances de ces requêtes.

### Détails d'un échantillon

Cliquez sur une requête dans le tableau pour ouvrir la page Sample Details correspondante. Utilisez les carrés Source, Host et Client IP en haut de l'interface pour filtrer la page Sample Queries en fonction des valeurs de cet échantillon ou consulter d'autres informations, comme le dashboard du host ou les métriques de trafic réseau de l'IP client.

{{< img src="database_monitoring/dbm_sd_actions.png" alt="Carrés d'actions de la page Sample Details" style="width:100%;">}}

Par exemple, si vous ouvrez la page du trafic réseau et regroupez les données par service, vous pouvez découvrir le service qui exécute la requête à partir de cette adresse IP.

Les graphiques affichent les métriques de performance d'une requête (nombre d'exécutions, durée et lignes par requête) au cours de l'intervalle spécifié _s'il s'agit d'une [requête courante][2]_. La ligne représente les performances du snapshot de l'échantillon analysé. S'il ne s'agir pas d'une requête courante, les métriques ne sont pas disponibles et les graphiques demeurent donc vierges.

{{< img src="database_monitoring/dbm_sd_graphs.png" alt="Graphiques représentant les métriques de performances de requêtes avec l'indicateur de requête" style="width:100%;">}}

La section Explain Plan affiche des statistiques sur la durée et le coût de l'échantillon actif, _ainsi_ que les moyennes et le centile p90 de tous les snapshots recueillis au cours de l'intervalle.

Le plan d'exécution propose également des mesures pour chaque nœud (étape) qui le constitue. Vous pouvez ainsi consulter le coût de lancement, le coût total, le nombre de lignes du plan et la largeur du plan. Passez le curseur sur l'en-tête d'une colonne pour afficher une description de chaque mesure.

{{< img src="database_monitoring/dbm_sd_explain_plan.png" alt="Statistiques sur les échantillons avec plan d'exécution et métriques sur les étapes" style="width:100%;">}}

## Explorer d'autres visualisations

Outre les échantillons de la liste par défaut, vous pouvez visualiser les données d'échantillons de requêtes sous forme de série temporelle, de top list ou de tableau en cliquant sur l'un des boutons **Visualize as**. Vous disposez ainsi de différentes visualisations pour analyser efficacement vos données. Par exemple, pour afficher les requêtes les plus lentes qui s'exécutent dans un datacenter, sélectionnez **Timeseries**, regroupez les données en fonction de `Statement` et représentez la durée moyenne :

{{< img src="database_monitoring/dbm_qs_timeseries_viz.png" alt="Identifier les requêtes les plus lentes" style="width:100%;">}}

Vous pouvez également identifier une singularité, telle qu'une requête qui s'exécute _généralement_ rapidement, mais parfois lentement, en représentant le centile p90 ou p99 de sa durée.

Utilisez des tableaux pour générer des synthèses (semblables à des rapports) et partagez-les avec d'autres utilisateurs. Par exemple, créez un tableau des requêtes les moins performantes (p75 de la durée), et ajoutez les valeurs moyennes de coût de plan pour chaque requête :

{{< img src="database_monitoring/dbm_qs_p75_duration_table.png" alt="Tableau des requêtes avec le centile p75 de la durée" style="width:100%;">}}

Le bouton **Export** vous permet de partager des données avec votre équipe d'ingénieurs afin d'échanger sur les principaux éléments à améliorer en priorité.

## Dashboards Database Monitoring

Pour accéder rapidement à des dashboards représentant des métriques d'infrastructure et de requête liées à une base de données, cliquez sur le lien **Dashboards** en haut de la page. Vous pouvez utiliser directement les dashboards prêts à l'emploi ou encore les dupliquer et les personnaliser en fonction de vos besoins.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /fr/database_monitoring/data_collected/#which-queries-are-tracked
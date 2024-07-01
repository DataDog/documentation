---
description: Explorer et analyser vos métriques de performance sur les bases de données
  et requêtes
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /integrations/postgres/
  tag: Documentation
  text: Intégration Postgres
- link: /integrations/mysql/
  tag: Documentation
  text: Intégration MySQL
- link: /database_monitoring/data_collected/
  tag: Documentation
  text: Données collectées
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Dépannage
title: Explorer les métriques de requête
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

La vue Query Metrics affiche l'historique des performances de vos requêtes normalisées. Visualisez les profils de performance pour une infrastructure ou des tags personnalisés spécifiques, tels que la zone de disponibilité du centre de données, et recevez une alerte en cas d'anomalie.

Pour accéder à la vue Query Metrics depuis l'interface Database Monitoring, cliquez sur **[APM > Databases][1]**.

La vue affiche les 200_principales_ requêtes, à savoir les 200 requêtes avec les temps d'exécution les plus élevés au cours de l'intervalle sélectionné. Consultez la documentation sur les [requêtes suivies][2] pour en savoir plus. La vue Query Metrics n'affiche pas l'agrégation des métriques pour les requêtes rapides qui ont été exécutées un faible nombre de fois. Les snapshots correspondants sont néanmoins indiqués dans les [échantillons de requêtes][3], tant que ces requêtes ont été exécutées au cours des 15 derniers jours.

## Filtrer et regrouper les requêtes

Sélectionnez votre source de base de données (Postgres ou MySQL) dans la liste déroulante **source** située en haut de la page, spécifiez les tags de recherche à utiliser pour filtrer la liste de requêtes, puis regrouper les requêtes en fonction de tags pour organiser la liste.

Par exemple, il est généralement utile de regrouper les requêtes par host ou cluster afin de visualiser rapidement l'infrastructure sur laquelle elles s'exécutent.

{{< img src="database_monitoring/dbm_qm_group_by.png" alt="Regrouper par tag env" style="width:100%;">}}

Lorsque vous regroupez des requêtes, vous pouvez appliquer jusqu'à trois tags (par exemple, host, env et datacenter) afin d'obtenir des ensembles de résultats filtrés.

{{< img src="database_monitoring/dbm_qm_group_by_three.png" alt="Regrouper les requêtes en fonction de trois tags" style="width:100%;">}}

Développez le groupe pour afficher la liste des requêtes, puis cliquez sur **View all queries in this group** pour copiez les critères de regroupement dans le champ de recherche de la barre de filtre. La page affiche alors uniquement les résultats de la recherche.

## Filtrer les requêtes en fonction de facettes

Les facettes permettant de filtrer la liste des requêtes sont indiquées sur la gauche de l'interface. Voici les facettes disponibles :

- **Core** : services, hosts et environnements.
- **Database** : Postgres propose les facettes `database` et `user`, tandis que MySQL propose les facettes `schema`.
- **Infrastructure** : tags d'infrastructure Datadog standard recueillis par l'Agent.

Sélectionnez ou supprimez des facettes afin d'afficher les requêtes qui vous intéressent.

### Filtrer la vue Query Metrics pour afficher une seule requête

Si vous souhaitez filtrer le contenu de la vue Query Metrics afin d'afficher une seule [requête normalisée][4], appliquez le filtre `query_signature` au lieu de `query`. Les noms de tag sont tronqués après le 200e caractère. De plus, puisque les requêtes peuvent être longues, les tags `query` correspondants ne sont pas forcément uniques. La valeur `query_signature` correspond à un hachage d'une requête normalisée et est utilisée comme ID unique de cette dernière.

Pour filtrer la vue sur une requête précise sans rechercher la valeur de la signature de cette requête, cliquez sur la requête dans la liste pour ouvrir la [page Query Details](#page-query-details). Cliquez ensuite sur **Filter to This Query**. Un filtre basé sur la facette `query_signature` est alors appliqué à la page Query Metrics.

## Explorer les métriques

La liste Query Metrics affiche les métriques liées aux requêtes, à la latence moyenne, au temps total et au pourcentage de temps, ainsi que d'autres métriques qui dépendent de votre système de gestion de bases de données. Cliquez sur le menu **Options** pour définir les métriques qui s'affichent dans la liste. Passez le curseur sur l'en-tête d'une colonne pour afficher une description de chaque type de métrique. Cliquez sur l'en-tête d'une colonne pour trier la liste en fonction de cette métrique.

Pour voir la liste complète des métriques recueillies, consultez la documentation relative aux données recueillies par l'intégration pour votre système de gestion de base de données :

{{< partial name="dbm/dbm-data-collected" >}}
<p></p>

Les vues Database Monitoring affichent principalement les métriques suivantes :
- **MySQL** : `mysql.queries.*`
- **Postgres** : `postgresql.queries.*`


## Page Query Details

Lorsque vous cliquez sur une requête dans la liste Query Metrics, la page Query Details associée à cette requête s'ouvre. L'intégralité du texte de la [requête normalisée][4] et la liste de tous les tags associés à la requête sont affichés en haut de la page. La liste de tags rassemble tous les tags provenant de chaque host sur lequel la requête s'exécute. Parcourez la liste pour découvrir différentes informations, comme le serveur sur lequel la requête s'exécute :

{{< img src="database_monitoring/dbm_qd_tags.png" alt="Liste de tags pour une requête" style="width:100%;">}}

Pour accéder à la [page Query Samples][3] tout en conservant le contexte de cette requête, cliquez sur le bouton **View Query Samples**. Pour revenir à la vue Query Metrics filtrée en fonction de cette requête, cliquez sur le bouton **Filter by This Query**.

{{< img src="database_monitoring/dbm_qd_jump_buttons.png" alt="Afficher rapidement un échantillon de requêtes ou des métriques pour cette requête" style="width:100%;">}}

Si vous passez en revue les détails d'une requête et souhaitez déterminer les hosts sur lesquels elle s'exécute, cliquez sur **Filter by This Query**, puis regroupez les résultats par host. La liste des métriques affiche chaque host sur lequel la requête s'exécute. Triez la vue en fonction de **Percent time** pour vérifier si un host précis est responsable d'une grande partie de la durée d'exécution d'une requête.

{{< img src="database_monitoring/dbm_qm_by_host_usecase.png" alt="Métriques d'une requête regroupées par host" style="width:100%;">}}

Triez la vue en fonction de **Rows/Query** pour vérifier si un host précis renvoie beaucoup plus de lignes que les autres, ce qui pourrait indiquer que le partitionnement n'est pas équilibré entre les hosts.

### Graphiques de métriques

Les graphiques vous permettent de comparer les métriques associées à votre requête à celles associées à toutes les autres requêtes. Vous pouvez ainsi déterminer si la latence moyenne de votre requête est bien plus élevée que celle des autres requêtes, en tenant compte de sa fréquence d'exécution (afin de déterminer l'impact d'éventuelles lenteurs). Le temps d'utilisation de la base de données par votre requête est également comparé à celui de toutes les autres requêtes.

Cliquez sur l'onglet **Metrics** pour afficher d'autres graphiques de métriques pour cette requête.

### Plans d'exécution

Datadog recueille régulièrement des plans d'exécution. Une requête donnée peut donc avoir plusieurs plans. Ces plans sont normalisés et affichés séparément. Vous pouvez ainsi vérifier si les plans d'une requête enregistrent de meilleures performances ou des coûts plus élevés que ceux d'autres requêtes. Dans l'exemple ci-dessous, deux plans d'exécution d'une requête sont représentés ; l'un d'entre eux possède une latence moyenne bien plus faible que l'autre :

{{< img src="database_monitoring/dbm_qd_explain_plans.png" alt="Informations sur les plans d'exécution d'une requête" style="width:100%;">}}

Sélectionnez un plan pour afficher des métriques sur les coûts ou le JSON associé. Cliquez sur **View All Samples for This Plan** pour accéder à la vue Query Samples afin de découvrir [les échantillons associés à la requête][5].

Pour diverses raisons, concernant notamment le type de requête ou les différents paramètres de configuration, les requêtes ne possèdent pas toutes des plans d'exécution. Consultez la section sur le [dépannage][6] pour en savoir plus.

### Onglet Hosts Running This Query

L'onglet **Hosts Running This Query** répertorie les hosts qui exécutent la requête analysée. Il contient un menu contextuel vous permettant d'accéder à des informations sur les hosts, notamment des logs ou des données réseau. Ces informations s'avèrent particulièrement utiles pour identifier l'origine des problèmes de latence.

{{< img src="database_monitoring/dbm_qd_hosts_running_query_menu.png" alt="Menu d'actions d'un host permettant d'accéder à plus d'informations" style="width:100%;">}}

## Dashboards Database Monitoring

Pour accéder rapidement à des dashboards contenant des visualisations sur les métriques d'infrastructure et de requête liées à une base de données, cliquez sur le lien **Dashboards** en haut de la page. Vous pouvez utiliser les dashboards prêts à l'emploi ou les dupliquer et les personnaliser comme bon vous semble.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /fr/database_monitoring/data_collected/#which-queries-are-tracked
[3]: /fr/database_monitoring/query_samples/
[4]: /fr/database_monitoring/data_collected/#normalized-queries
[5]: /fr/database_monitoring/query_samples/#sample-details
[6]: /fr/database_monitoring/troubleshooting/#queries-are-missing-explain-plans
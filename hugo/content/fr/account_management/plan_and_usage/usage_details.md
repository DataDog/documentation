---
aliases:
- /fr/account_management/billing/usage_details/
description: Surveillez votre utilisation de Datadog pour tous les produits grâce
  aux résumés depuis le début du mois, aux tendances d'utilisation, aux principales
  Custom Metrics et à l'utilisation des logs par index.
title: Utilisation détaillée
---
{{< callout url="" btn_hidden="true" header="Nouveau : Bill Overview" respect-site-support="false" >}}
Une nouvelle expérience Bill Overview est désormais disponible en disponibilité limitée et sera déployée automatiquement pour toutes les organisations à partir de mars 2026. [En savoir plus](/account_management/plan_and_usage/bill_overview/).
{{< /callout >}}

## Présentation {#overview}

Les administrateurs peuvent accéder à la page [Usage][1] en survolant leur nom d'utilisateur en bas à gauche, puis en accédant à :
`Plan & Usage`--> `Usage`.

La page Usage affiche l'utilisation regroupée par catégorie de produit. Vous pouvez accéder à un onglet de produit pour afficher l'utilisation propre à cette catégorie ou à l'onglet « All » pour afficher l'utilisation de tous les produits. Chaque onglet fournit les informations suivantes :

* Résumé depuis le début du mois
* Utilisation globale (actuelle et historique)

Certains onglets de produits contiennent également des outils supplémentaires :

* Onglet Custom Metrics : Top Custom Metrics
* Onglet Log Management : Logs Usage by Index

## Résumé depuis le début du mois {#month-to-date-summary}

Cette section résume votre utilisation depuis le début du mois. Dans l'onglet « All », consultez votre utilisation depuis le début du mois des hosts d'infrastructure, des Containers, des Custom Metrics, des APM hosts, des logs et de toute autre partie de la plateforme que vous avez utilisée au cours du mois. 

{{< img src="account_management/billing/usage-details-v2-01.png" alt="Résumé de l'utilisation - Onglet All" >}}

Dans les onglets spécifiques aux produits, consultez votre utilisation depuis le début du mois des produits de cette catégorie.

{{< img src="account_management/billing/usage-details-v2-02.png" alt="Résumé de l'utilisation - Network" >}}

L'utilisation depuis le début du mois indiquée ci-dessus correspond à l'utilisation « All », qui inclut l'utilisation non facturable telle que les essais de produits. La plupart des comptes peuvent consulter l'utilisation « Billable », qui montre uniquement l'utilisation contribuant à votre facture finale. La vue « Billable » détaille votre utilisation par engagements, allocations et utilisation à la demande.

{{< img src="account_management/billing/UsageTilesWithAllPills.png" alt="Résumé de l'utilisation - Billable" >}}
Pour les utilisateurs de l'API, des points de terminaison sont disponibles pour accéder à l'utilisation [« All »][2] et à l'utilisation [« Billable »][3].

L'utilisation depuis le début du mois pour chaque produit est calculée comme suit :

| Produit                   | Description                                                                                                                |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Infra. Hosts             | Affiche le 99e percentile de tous les hosts d'infrastructure distincts sur toutes les heures du mois en cours.                         |
| Containers               | Affiche le niveau maximal de tous les conteneurs distincts sur toutes les heures du mois en cours.                                    |
| APM Hosts                | Affiche le 99e percentile de tous les APM hosts distincts sur toutes les heures du mois en cours.                                    |
| Hosts profilés           | Affiche le 99e percentile de tous les hosts profilés distincts sur toutes les heures du mois en cours.                               |
| Containers profilés      | Affiche la moyenne de tous les Containers profilés distincts sur toutes les heures du mois en cours.                                  |
| Custom Metrics           | Affiche le nombre moyen de [Custom Metrics][4] distinctes sur toutes les heures du mois en cours.                               |
| Ingested Custom Metrics  | Affiche le nombre moyen de Custom Metrics INGESTED distinctes sur toutes les heures du mois en cours.                           |
| Logs ingérés            | Affiche la somme de tous les octets de logs ingérés sur toutes les heures du mois en cours.                                                |
| Logs indexés             | Affiche la somme de tous les événements de logs indexés sur toutes les heures du mois en cours.                                                |
| Logs scannés             | Affiche la somme de tous les octets de logs scannés par Sensitive Data Scanner sur toutes les heures du mois en cours.                       |
| Ingested Spans           | Affiche la somme de toutes les spans ingérées sur toutes les heures du mois en cours.                                                    |
| Indexed Spans            | Affiche la somme de toutes les Indexed Spans indexées sur toutes les heures du mois en cours.                                             |
| Logs analysés (Security) | Affiche la somme de tous les octets de logs analysés ingérés sur toutes les heures du mois en cours.                                       |
| Fonctions Serverless | Affiche la moyenne du nombre de fonctions exécutées 1 fois ou plus chaque heure au cours du mois en cours.              |
| Invocations Serverless | Affiche la somme de toutes les invocations sur toutes les heures du mois en cours.                                                       |
| Tâches Fargate | Affiche la somme de toutes les tâches Fargate sur toutes les heures du mois en cours.                                                     |
| Network Hosts | Affiche le 99e percentile de tous les Network Hosts distincts sur toutes les heures du mois en cours.                                |
| Flux réseau | Affiche la somme de tous les flux réseau indexés sur toutes les heures du mois en cours.                                             |
| Périphériques réseau | Affiche le 99e percentile de tous les périphériques réseau distincts sur toutes les heures du mois en cours.                              |
| Synthetic API Tests      | Affiche la somme de tous les tests Synthetic API sur toutes les heures du mois en cours.                                               |
| Synthetic Browser Tests  | Affiche la somme de tous les tests Synthetic Browser sur toutes les heures du mois en cours.                                           |
| Sessions RUM | Affiche la somme de toutes les sessions RUM distinctes sur toutes les heures du mois en cours.                                             |
| Incident Management | Affiche le nombre d'utilisateurs actifs uniques à ce jour au cours du mois sélectionné ayant interagi avec le cycle de vie des incidents et les chronologies.     |
| Appareils IoT | Affiche le 99e percentile de tous les appareils IoT distincts sur toutes les heures du mois en cours.                                  |


## Tendances d'utilisation {#usage-trends}

La section [Tendances d'utilisation][5] contient des graphiques d'utilisation des produits affichant l'utilisation cumulée pour toutes les organisations d'un compte. Les rapports d'utilisation sont téléchargeables via le bouton {{< ui >}}Download as CSV{{< /ui >}}. Pour chaque organisation, ces rapports incluent une ventilation horaire de l'utilisation par produit. 

{{< img src="account_management/billing/UsageTrendsOverviewAndCSV.png" alt="Page des graphiques Usage Trends dans l'application Datadog avec l'option Download as CSV mise en évidence" style="width:100%; align:left" >}}

Pour les produits avec des sous-types, chaque catégorie est distinguée sur le graphique correspondant à ce produit. 

{{< img src="account_management/billing/UsageGraphsByProductTab.png" alt="Résumé de l'utilisation avec l'onglet infrastructure sélectionné et plusieurs graphiques pour les sous-types d'utilisation de l'infrastructure tels que les Infra Hosts, les hosts Agent et les Containers" style="width:100%; align:left" >}}

Des graphiques plus détaillés sur les sous-types de produits sont disponibles dans l'onglet de chaque produit. Par exemple, une ventilation par type de host est disponible sous l'onglet Infrastructure.

{{< img src="account_management/billing/UsageBreakdownByProductSubtype.png" alt="Section Tendances d'utilisation de l'onglet Infrastructure avec le graphique Infra Hosts contenant les hosts Agent et les hosts AWS, et le graphique Indexed Logs contenant Daily Indexed Live Logs et Cumulative Indexed Live Logs" style="width:100%; align:left" >}}
 
L'utilisation cumulée au fil du temps est disponible pour les produits basés sur la somme.

{{< img src="account_management/billing/CumulativeUsageLine.png" alt="Graphiques pour les Ingested Spans et les Indexed Spans, chacun traçant les données pour les sommes quotidiennes et cumulées de leurs spans respectives" style="width:100%; align:left" >}}

La sélection de la période contient des options pour afficher les graphiques d'utilisation à des intervalles quotidiens, hebdomadaires, mensuels ou annuels.

{{< img src="account_management/billing/TimeGranularity.png" alt="Intervalles de temps sur les graphiques d'utilisation" style="width:100%; align:left" >}}

## Pastilles d'utilisation facturable à la demande et lignes d'engagement {#billable-on-demand-pills-and-committed-lines}

<div class="alert alert-danger">Cette fonctionnalité est en version bêta. Pour demander l'accès et confirmer que votre organisation répond aux critères de la fonctionnalité, contactez votre responsable de compte ou le <a href="https://docs.datadoghq.com/help/">Customer Support</a>.</div>

Les pastilles violettes à la demande mettent en évidence la part de l'utilisation facturable qui correspond à une utilisation à la demande. Les pastilles bleues correspondant aux engagements et aux allocations mettent en évidence la part de votre utilisation couverte par des engagements et des <a href="https://www.datadoghq.com/pricing/allotments/">allocations</a> provenant de produits parents. La ligne `Committed` en pointillés indique les engagements par produit, sans aucune allocation (comme Custom Metrics ou Containers).

Pour afficher les pastilles d'engagement et d'allocation sur une carte, assurez-vous que le bouton {{< ui >}}See included usage{{< /ui >}} est activé :
1. Sur la carte d'utilisation totale où vous souhaitez voir les données d'utilisation engagée et allouée, cliquez sur l'icône en forme d'œil ({{< ui >}}See included usage{{< /ui >}}).
1. L'icône se transforme en un œil barré. Les pastilles d'engagement et d'allocation s'affichent sur la carte.

{{< img src="account_management/billing/UsageTilesWithPillsUsageTrendsWithCommittedLine.png" alt="Pastilles d'utilisation facturable à la demande et lignes d'utilisation engagée sur les graphiques de tendances." style="width:100%; align:left" >}}


## Top Custom Metrics {#top-custom-metrics}

Dans l’onglet Custom Metrics, le tableau Top Custom Metrics propose deux vues de votre utilisation depuis le début du mois et de votre utilisation du jour le plus récent, par exemple celle enregistrée à la date de la dernière mise à jour.

La vue « Top 5000 » fournit les informations suivantes sur vos 5 000 principales métriques personnalisées :
* Nom de la métrique
* Moyenne de métriques personnalisées par heure
* Max de métriques personnalisées par heure
* Pourcentage de contribution de la métrique à l'utilisation globale des métriques personnalisées
* Recherchez une métrique parmi vos 5 000 principales métriques personnalisées
* Ces données peuvent être téléchargées en tant que fichier CSV.

La vue « All » fournit les informations suivantes sur toutes vos métriques personnalisées :
* Nom de la métrique
* Moyenne de métriques personnalisées par heure
* Max de métriques personnalisées par heure
* Recherchez une métrique parmi toutes vos métriques personnalisées
* Ces données peuvent être téléchargées en tant que fichier CSV, avec un maximum de 300 000 métriques personnalisées. Vous pouvez télécharger plus de 300 000 métriques personnalisées à l’aide de notre [endpoint d’API][6].


Pour plus de détails sur une métrique, survolez sa ligne et cliquez sur l'icône de compteur à droite pour ouvrir la métrique sur la page Metrics Catalog. Pour plus d'informations, consultez la [documentation de Metrics Catalog][7].

{{< img src="account_management/billing/usage-metrics-05.png" alt="Vue d'ensemble du tableau Top Custom Metrics" >}}

## Utilisation des logs par index {#logs-usage-by-index}

Dans l'onglet Log Management, ce tableau affiche votre utilisation de logs indexés par heure, jour, mois et année, par nom d'index et période de rétention. Il montre également la répartition entre les logs en direct et les [logs réhydratés][8]. Les informations suivantes sont fournies :

* Nom de l'index
* Période de rétention en jours
* Nombre de logs indexés
* Pourcentage de contribution de l'index à l'utilisation globale des logs indexés pour la période sélectionnée

Ces données peuvent être téléchargées en tant que fichier CSV.

{{< img src="account_management/billing/usage-details-v3-03.png" alt="Utilisation des logs par index" >}}

## Notifications de première utilisation {#first-time-usage-notifications}

<div class="alert alert-danger">Cette fonctionnalité est en version bêta. Pour demander l'accès et confirmer que votre organisation répond aux critères de la fonctionnalité, contactez votre responsable de compte ou le <a href="https://docs.datadoghq.com/help/">Customer Support</a>.</div>

La fonctionnalité Notifications de première utilisation envoie des notifications par e-mail lorsqu'une première utilisation facturable est détectée pour un nouveau produit non inclus dans votre contrat actuel. Les e-mails sont envoyés environ 48 heures après la première occurrence de l'utilisation au cours d'un mois donné.

Après avoir activé la fonctionnalité, un nouvel onglet {{< ui >}}Usage Notifications{{< /ui >}} est ajouté à la page {{< ui >}}Plan and Usage{{< /ui >}} de l'organisation parente. Sur cet onglet, vous trouverez une liste de tous les produits couverts par la fonctionnalité. Décocher une case arrête les notifications pour ce produit pour tous les utilisateurs du compte. Si une première utilisation en dehors de votre contrat actif le plus récent est détectée, les utilisateurs ne reçoivent pas de notification pour les produits dont la case est décochée.

{{< img src="account_management/plan_and_usage/usage-notifications.png" alt="Page des Notifications de première utilisation avec une liste de produits incluant des éléments cochés et décochés" style="width:100%; align:left" >}}

Tout utilisateur disposant des autorisations _Usage Notifications Read_ ou _Write_ reçoit des e-mails. Pour la plupart des organisations, cela signifie tous les administrateurs.

Si votre compte Datadog est multi-organisation, les utilisateurs de l'organisation parente disposant des autorisations nécessaires reçoivent des notifications par e-mail concernant l'utilisation dans les organisations enfants. Ces e-mails indiquent quelle organisation enfant a généré l'utilisation, ainsi que le produit pour lequel l'utilisation a été générée. Les utilisateurs de l'organisation enfant disposant de cette autorisation reçoivent des e-mails uniquement pour leur organisation.

{{< img src="account_management/plan_and_usage/usage-notifications-email.png" alt="E-mail de Notifications de première utilisation avec des détails sur un exemple de première utilisation" style="width:100%; align:left" >}}

## Dépannage {#troubleshooting}

Pour toute question technique, contactez le [support Datadog][9].

Pour toute question relative à la facturation, contactez votre responsable [Customer Success][10].


[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://docs.datadoghq.com/fr/api/latest/usage-metering/#get-usage-across-your-multi-org-account
[3]: https://docs.datadoghq.com/fr/api/latest/usage-metering/#get-billable-usage-across-your-account
[4]: /fr/metrics/custom_metrics/
[5]: https://app.datadoghq.com/billing/usage
[6]: https://docs.datadoghq.com/fr/api/latest/usage-metering/#get-all-custom-metrics-by-hourly-average
[7]: /fr/metrics/catalog/#overview
[8]: https://docs.datadoghq.com/fr/logs/archives/rehydrating/?tab=awss3#overview
[9]: /fr/help/
[10]: mailto:success@datadoghq.com
[11]: /fr/account_management/plan_and_usage/bill_overview/
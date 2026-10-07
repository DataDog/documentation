---
aliases:
- /fr/account_management/billing/usage_details/
description: Surveillez votre utilisation de Datadog dans tous les produits avec des
  résumés depuis le début du mois, des tendances d'utilisation, les principales métriques
  custom et l'utilisation des logs par index.
title: Utilisation détaillée
---

## Présentation

Les administrateurs peuvent accéder à la page [Usage][1] en survolant leur nom d'utilisateur en bas à gauche, puis en accédant à :  
`Plan & Usage` --> `Usage`.

La page Usage affiche vos informations d'utilisation pour chaque catégorie de produits. Accédez à l'onglet d'un produit pour afficher l'utilisation de cette catégorie de produits en particulier, ou sélectionnez l'onglet « All » pour afficher l'utilisation de tous les produits. Chaque onglet fournit les informations suivantes :

* Month-to-Date Summary
* Overall Usage (current and historical)

Certains onglets contiennent également des outils supplémentaires :

* Onglet Custom Metrics : Top Custom Metrics
* Onglet Log Management : Logs Usage By Index

## Month-to-Date Summary

Cette section résume votre utilisation pour le mois en cours. L'onglet « All » indique des données sur votre utilisation des hosts d'infrastructure, des conteneurs, des métriques custom, des hosts APM, des logs et de toute autre partie de la plateforme utilisée pendant le mois en cours.

{{< img src="account_management/billing/usage-details-v2-01.png" alt="Résumé de l'utilisation - Onglet All" >}}

Chaque onglet spécifique à un produit affiche votre utilisation mensuelle des produits dans cette catégorie.

{{< img src="account_management/billing/usage-details-v2-02.png" alt="Résumé de l'utilisation - Network" >}}

L'utilisation depuis le début du mois affichée ci-dessus correspond à l'utilisation « All », qui inclut l'utilisation non facturable comme les périodes d'essai des produits. La plupart des comptes peuvent consulter l'utilisation « Billable », qui n'affiche que l'utilisation contribuant à votre facture finale. La vue « Billable » détaille votre utilisation par engagements, allocations et utilisation à la demande.

{{< img src="account_management/billing/UsageTilesWithAllPills.png" alt="Résumé de l'utilisation - Billable" >}}
Pour les utilisateurs de l'API, des endpoints sont disponibles pour accéder à l'utilisation [All][2] et à l'utilisation [Billable][3].

L'utilisation de chaque produit pour le mois en cours est calculée comme suit :

| Produit                   | Rôle                                                                                                                |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Infra. Hosts             | Affiche le 99e centile de tous les hosts d'infrastructure distincts pour toutes les heures du mois actuel.                         |
| Conteneurs               | Affiche la limite supérieure de tous les conteneurs distincts pour toutes les heures du mois actuel.                                    |
| Hosts APM                | Affiche le nombre total de hosts d'APM distincts au 99e centile pour toutes les heures du mois actuel.                                    |
| Profiled Hosts           | Affiche le 99e centile de tous les hosts profilés distincts pour toutes les heures du mois actuel.                               |
| Profiled Containers      | Affiche la moyenne de tous les conteneurs profilés distincts pour toutes les heures du mois actuel.                                  |
| Métriques custom           | Affiche le nombre moyen de [métriques custom][4] distinctes pour toutes les heures du mois actuel.                               |
| Métriques custom ingérées  | Affiche le nombre moyen de métriques custom INGÉRÉES distinctes pour toutes les heures du mois actuel.                           |
| Logs ingérés            | Affiche la somme de tous les octets de logs ingérés pour toutes les heures du mois actuel.                                                |
| Indexed Logs             | Affiche la somme de tous les événements de log indexés pour toutes les heures du mois actuel.                                                |
| Scanned Logs             | Affiche la somme de tous les octets des logs analysés par le scanner de données sensibles pour toutes les heures du mois actuel.                       |
| Spans ingestées           | Afficher la somme de toutes les spans ingérées pour toutes les heures du mois actuel.                                                    |
| Spans indexées            | Affiche la somme de toutes les spans indexées pour toutes les heures du mois actuel.                                             |
| Analyzed Logs (Security) | Affiche la somme de tous les octets de logs analysés ingérés pour toutes les heures du mois actuel.                                       |
| Serverless Functions     | Affiche le nombre moyen de fonctions qui sont exécutées au moins une fois par heure au cours du mois actuel.              |
| Serverless Invocations   | Affiche la somme de tous les appels pour toutes les heures du mois actuel.                                                       |
| Tâches Fargate            | Affiche la somme de toutes les tâches Fargate pour toutes les heures du mois actuel.                                                     |
| Network Hosts            | Affiche le 99e centile de tous les hosts réseau distincts pour toutes les heures du mois actuel.                                |
| Network Flows            | Affiche la somme de tous les flux réseau indexés pour toutes les heures du mois actuel.                                             |
| Network Devices          | Affiche le 99e centile de tous les périphériques réseau distincts pour toutes les heures du mois actuel.                              |
| Synthetic API Tests      | Affiche la somme de tous les tests API Synthetic pour toutes les heures du mois actuel.                                               |
| Synthetic Browser Tests  | Affiche la somme de tous les tests Browser Synthetic pour toutes les heures du mois actuel.                                           |
| RUM Sessions             | Affiche la somme de toutes les sessions RUM distinctes pour toutes les heures du mois actuel.                                             |
| Incident Management      | Affiche le nombre d'utilisateurs actifs uniques qui ont interagi lors du mois sélectionné avec le cycle de vie et les chronologies d'un incident.     |
| IoT Devices              | Affiche le 99e centile de tous les périphériques ioT distincts pour toutes les heures du mois actuel.                                  |


## Tendances dʼutilisation

La section [Tendances d'utilisation][5] propose des graphiques permettant de visualiser lʼutilisation globale des produits faite par toutes les organisations liées à un compte. Les rapports d'utilisation peuvent être téléchargés via le bouton **Download as CSV**. Ces rapports comprennent une répartition horaire de l'utilisation par produit pour chaque organisation. 

{{< img src="account_management/billing/UsageTrendsOverviewAndCSV.png" alt="Page sur les tendances dʼutilisation dans lʼapplication Datadog avec lʼoption « Download as CSV » mise en évidence" style="width:100%; align:left" >}}

Lorsquʼun produit comporte des sous-types, chaque catégorie est identifiable sur le graphique. 

{{< img src="account_management/billing/UsageGraphsByProductTab.png" alt="Le rapport dʼutilisation. Lʼonglet de lʼinfrastructure est sélectionné et plusieurs graphiques relatifs aux sous-types dʼutilisation de lʼinfrastructure sont affichés, comme les hosts, les hosts de lʼAgent et les conteneurs" style="width:100%; align:left" >}}

Lʼonglet de chaque produit propose des graphiques plus détaillés sur les sous-types de produits. Par exemple, une répartition par type de host est disponible dans lʼonglet de lʼinfrastructure.

{{< img src="account_management/billing/UsageBreakdownByProductSubtype.png" alt="Section relative aux tendances dʼutilisation de lʼonglet de lʼinfrastructure. Le graphique Infra Hosts contient les hosts de lʼAgent et les hosts AWS, et le graphique Indexed Logs affiche les logs quotidiens indexés actuels (Daily Indexed Live Logs) et les logs indexés cumulés actuels (Cumulative Indexed Live Logs)" style="width:100%; align:left" >}}

L'utilisation cumulée dans le temps est disponible pour les produits se basant sur des sommes.

{{< img src="account_management/billing/CumulativeUsageLine.png" alt="Les graphiques correspondant aux spans ingérées et aux spans indexées. Ils représentent les données correspondant aux sommes quotidiennes et cumulées de leurs spans respectives" style="width:100%; align:left" >}}

Des options sont disponibles pour la sélection horaire, permettant de visualiser les graphiques sur lʼutilisation à des intervalles quotidiens, hebdomadaires, mensuels ou annuels.

{{< img src="account_management/billing/TimeGranularity.png" alt="Intervalles des graphiques sur lʼutilisation" style="width:100%; align:left" >}}

## Capsules à la demande et lignes engagées facturables

<div class="alert alert-danger">Cette fonctionnalité est en version bêta. Pour demander l'accès et confirmer que votre organisation répond aux critères de la fonctionnalité, contactez votre représentant de compte ou le <a href="https://docs.datadoghq.com/help/">support client</a>.</div>

Les capsules à la demande violettes mettent en évidence la partie de l'utilisation facturable correspondant à l'utilisation à la demande. Les capsules bleues engagées et allouées mettent en évidence la partie de votre utilisation couverte par les engagements et les <a href="https://www.datadoghq.com/pricing/allotments/">allocations</a> des produits parents. La ligne en pointillés `Committed` indique les engagements par produit, sans aucune allocation (comme pour les métriques custom ou les conteneurs).

Pour afficher les capsules engagées et allouées sur une carte, assurez-vous que le bouton **See included usage** est activé :
1. Sur la carte d'utilisation totale où vous souhaitez voir les données d'utilisation engagée et allouée, cliquez sur l'icône en forme d'œil (**See included usage**).
1. L'icône se transforme en œil barré. Les capsules engagées et allouées s'affichent sur la carte.

{{< img src="account_management/billing/UsageTilesWithPillsUsageTrendsWithCommittedLine.png" alt="Capsules à la demande facturables et lignes d'utilisation engagée sur les graphiques de tendances." style="width:100%; align:left" >}}


## Top Custom Metrics

Dans l'onglet Custom Metrics, le tableau Top Custom Metrics contient deux vues illustrant votre utilisation pour le mois en cours et votre utilisation quotidienne la plus récente (comme l'utilisation à la date de la dernière mise à jour).

La vue Top 5000 comporte les informations suivantes à propos des 5 000 principales métriques custom :
* Nom de la métrique
* Nombre moyen de métriques custom par heure
* Nom maximum de métriques custom par heure
* Part de la métrique dans l'utilisation globale des métriques custom
* Possibilité de rechercher une métrique parmi vos 5 000 principales métriques custom
* Ces données peuvent être téléchargées sous forme de fichier CSV.

La vue All comporte les informations suivantes à propos de toutes vos métriques custom :
* Nom de la métrique
* Nombre moyen de métriques custom par heure
* Nom maximum de métriques custom par heure
* Possibilité de rechercher une métrique parmi toutes vos métriques custom
* Ces données peuvent être téléchargées sous forme de fichier CSV, avec une limite de 300 000 métriques custom. Pour dépasser cette limite, téléchargez vos données à l'aide de notre [endpoint d'API][6].


Pour en savoir plus sur une métrique, passez votre curseur sur sa ligne et cliquez sur l'icône de jauge qui s'affiche sur la droite pour accéder à la page [Metrics Summary][7].

{{< img src="account_management/billing/usage-metrics-05.png" alt="Vue d'ensemble du tableau Top Custom Metrics" >}}

## Logs Usage By Index

Dans l'onglet Log Management, ce tableau affiche votre utilisation horaire, quotidienne, mensuelle et annuelle des logs indexés par nom d'index et période de rétention. Il indique également la répartition entre les logs actuels et les [logs réintégrés][8]. Voici les informations qui sont présentées :

* Le nom de l'index
* Période de rétention en jours
* Nombre de logs indexés
* Part de l'index dans l'utilisation globale des logs indexés pendant la période sélectionnée

Ces données peuvent être téléchargées sous forme de fichier CSV.

{{< img src="account_management/billing/usage-details-v3-03.png" alt="Utilisation des logs par index" >}}

## Notifications d'utilisation pour la première fois

<div class="alert alert-danger">Cette fonctionnalité est en version bêta. Pour demander l'accès et confirmer que votre organisation répond aux critères de la fonctionnalité, contactez votre représentant de compte ou le <a href="https://docs.datadoghq.com/help/">support client</a>.</div>

La fonctionnalité de notifications d'utilisation pour la première fois envoie des emails lorsqu'une utilisation facturable apparaît pour la première fois pour un nouveau produit non inclus dans votre contrat actuel. Les emails sont envoyés environ 48 heures après la première utilisation au cours d'un mois donné.

Après l'activation de la fonctionnalité, un nouvel onglet **Usage Notifications** est ajouté à la page **Plan and Usage** de l'organisation parente. Cet onglet affiche la liste de tous les produits couverts par la fonctionnalité. Si vous décochez une case, cela entraîne l'arrêt des notifications pour ce produit pour tous les utilisateurs du compte. Si une première utilisation en dehors de votre contrat actif le plus récent est détectée, les utilisateurs ne reçoivent pas de notification pour les produits dont la case est décochée.

{{< img src="account_management/plan_and_usage/usage-notifications.png" alt="Page de notifications d'utilisation pour la première fois avec une liste de produits comprenant des éléments cochés et décochés" style="width:100%; align:left" >}}

Tout utilisateur disposant des autorisations _Usage Notifications Read_ ou _Write_ reçoit des emails. Pour la plupart des organisations, cela concerne tous les administrateurs.

Si votre compte Datadog est multi-organisation, les utilisateurs de l'organisation parente disposant des autorisations reçoivent des emails de notification d'utilisation pour les organisations enfants. Ces emails indiquent quelle organisation enfant a généré l'utilisation et pour quel produit. Les utilisateurs de l'organisation enfant disposant de cette autorisation reçoivent des emails uniquement pour leur organisation.

{{< img src="account_management/plan_and_usage/usage-notifications-email.png" alt="Email de notification d'utilisation pour la première fois avec détails sur un exemple d'utilisation initiale" style="width:100%; align:left" >}}

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][9].

Pour toute question concernant la facturation, contactez votre [chargé de compte][10].


[1]: https://app.datadoghq.com/account/usage/hourly
[2]: https://docs.datadoghq.com/fr/api/latest/usage-metering/#get-usage-across-your-multi-org-account
[3]: https://docs.datadoghq.com/fr/api/latest/usage-metering/#get-billable-usage-across-your-account
[4]: /fr/metrics/custom_metrics/
[5]: https://app.datadoghq.com/billing/usage
[6]: https://docs.datadoghq.com/fr/api/latest/usage-metering/#get-all-custom-metrics-by-hourly-average
[7]: https://docs.datadoghq.com/fr/metrics/summary/#overview
[8]: https://docs.datadoghq.com/fr/logs/archives/rehydrating/?tab=awss3#overview
[9]: /fr/help/
[10]: mailto:success@datadoghq.com
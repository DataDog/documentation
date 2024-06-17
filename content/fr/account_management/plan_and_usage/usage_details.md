---
aliases:
- /fr/account_management/billing/usage_details/
kind: documentation
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

Les données d'utilisation ci-dessus correspondent à l'onglet All. Elles contiennent des informations sur des éléments non facturables, comme les évaluations de produit. La plupart des comptes peuvent également consulter les données d'utilisation facturables. La vue Billable affiche uniquement les éléments qui sont facturés. Elle détaille également l'utilisation à la demande dépassant vos engagements et vos allocations.

{{< img src="account_management/billing/usage-details-v2-07.png" alt="Résumé de l'utilisation - Billable" >}}
Pour accéder à ces données depuis une API, sachez que des endpoints sont disponibles pour les onglets [All][2] et [Billable][3].

L'utilisation de chaque produit pour le mois en cours est calculée comme suit :

| Produit                   | Description                                                                                                                |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Infra. Hosts             | Affiche le 99e centile de tous les hosts d'infrastructure distincts pour toutes les heures du mois actuel.                         |
| Conteneurs               | Affiche la limite supérieure de tous les conteneurs distincts pour toutes les heures du mois actuel.                                    |
| Hosts d'APM                | Affiche le nombre total de hosts d'APM distincts au 99e centile pour toutes les heures du mois actuel.                                    |
| Profiled Hosts           | Affiche le 99e centile de tous les hosts profilés distincts pour toutes les heures du mois actuel.                               |
| Profiled Containers      | Affiche la moyenne de tous les conteneurs profilés distincts pour toutes les heures du mois actuel.                                  |
| Custom Metrics           | Affiche le nombre moyen de [métriques custom][4] distinctes pour toutes les heures du mois actuel.                               |
| Métriques custom ingérées  | Affiche le nombre moyen de métriques custom INGÉRÉES distinctes pour toutes les heures du mois actuel.                           |
| Logs ingérés            | Affiche la somme de tous les octets de logs ingérés pour toutes les heures du mois actuel.                                                |
| Indexed Logs             | Affiche la somme de tous les événements de log indexés pour toutes les heures du mois actuel.                                                |
| Scanned Logs             | Affiche la somme de tous les octets des logs analysés par le scanner de données sensibles pour toutes les heures du mois actuel.                       |
| Ingested Spans           | Afficher la somme de toutes les spans ingérées pour toutes les heures du mois actuel.                                                    |
| Indexed Spans            | Affiche la somme de toutes les spans indexées pour toutes les heures du mois actuel.                                             |
| Analyzed Logs (Security) | Affiche la somme de tous les octets de logs analysés ingérés pour toutes les heures du mois actuel.                                       |
| Serverless Functions     | Affiche le nombre moyen de fonctions qui sont exécutées au moins une fois par heure au cours du mois actuel.              |
| Serverless Invocations   | Affiche la somme de tous les appels pour toutes les heures du mois actuel.                                                       |
| Fargate Tasks            | Affiche la somme de toutes les tâches Fargate pour toutes les heures du mois actuel.                                                     |
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

La ligne en pointillé `Committed` affiche les engagements par produit, sans aucun élément alloué (comme les métriques custom et les conteneurs). 

{{< img src="account_management/billing/CommittedLine.png" alt="Ligne relative à lʼengagement sur lʼutilisation dans le graphique Hosts APM, avec comme valeur 10" style="width:100%; align:left" >}}



## Top Custom Metrics

Dans l'onglet Custom Metrics, le tableau Top Custom Metrics contient deux vues illustrant votre utilisation pour le mois en cours et votre utilisation quotidienne la plus récente (comme l'utilisation à la date de la dernière mise à jour).

La vue Top 5000 comporte les informations suivantes à propos des 5 000 principales métriques custom :
* Metric name
* Nombre moyen de métriques custom par heure
* Nom maximum de métriques custom par heure
* Part de la métrique dans l'utilisation globale des métriques custom
* Possibilité de rechercher une métrique parmi vos 5 000 principales métriques custom
* Ces données peuvent être téléchargées sous forme de fichier CSV.

La vue All comporte les informations suivantes à propos de toutes vos métriques custom :
* Metric name
* Nombre moyen de métriques custom par heure
* Nom maximum de métriques custom par heure
* Possibilité de rechercher une métrique parmi toutes vos métriques custom
* Ces données peuvent être téléchargées sous forme de fichier CSV, avec une limite de 300 000 métriques custom. Pour dépasser cette limite, téléchargez vos données à l'aide de notre [endpoint d'API][5].


Pour en savoir plus sur une métrique, passez votre curseur sur sa ligne et cliquez sur l'icône de jauge qui s'affiche sur la droite pour accéder à la page [Metrics Summary][6].

{{< img src="account_management/billing/usage-metrics-05.png" alt="Vue d'ensemble du tableau Top Custom Metrics" >}}

## Logs Usage By Index

Dans l'onglet Log Management, ce tableau affiche votre utilisation horaire, quotidienne, mensuelle et annuelle des logs indexés par nom d'index et période de rétention. Il indique également la répartition entre les logs actuels et les [logs réintégrés][7]. Voici les informations qui sont présentées :

* Le nom de l'index
* Période de rétention en jours
* Nombre de logs indexés
* Part de l'index dans l'utilisation globale des logs indexés pendant la période sélectionnée

Ces données peuvent être téléchargées sous forme de fichier CSV.

{{< img src="account_management/billing/usage-details-v3-03.png" alt="Utilisation des logs par index" >}}

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][2].

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
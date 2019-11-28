---
title: Détails d'utilisation
kind: faq
---
## Présentation

Les administrateurs peuvent accéder à la page [Usage][1] en survolant leur nom d'utilisateur en bas à gauche, puis en accédant à :  
`Plan & Usage` --> `Usage`.

La page Usage contient les sections suivantes :
* Month-to-Date Summary
* Overall Usage (current and historical)
* Top 500 Custom Metrics

### Month-to-Date Summary

Cette section résume votre utilisation mensuelle des hosts, des conteneurs, des métriques custom, des hosts APM, des spans analysées, des logs, des synthetics et de toute autre partie de la plateforme que vous avez utilisée au cours du mois.

{{< img src="account_management/billing/usage-details-01.png" alt="Usage Summary" responsive="true">}}

### Overall Usage

Cette section comprend une utilisation horaire, quotidienne, mensuelle et annuelle affichée sur deux onglets :

* All Products
* Infrastructure Host Types

#### Host, Containers and Custom Metrics

Cet onglet présente l'utilisation horaire, quotidienne, mensuelle et annuelle des éléments suivants :

| Colonne             | Description                                                                                         |
|--------------------|-----------------------------------------------------------------------------------------------------|
| APM Hosts          | Affiche le 99e centile de tous les hosts APM distincts pour toutes les heures du mois actuel.            |
| Infra. Hosts       | Affiche le 99e centile de tous les hosts d'infrastructure distincts pour toutes les heures du mois actuel. |
| Containers         | Affiche la limite supérieure de tous les conteneurs distincts pour toutes les heures du mois actuel.            |
| Custom Metrics     | Affiche le nombre moyen des [métriques custom][2] distinctes pour toutes les heures du mois actuel.       |
| Ingested Logs      | Affiche la somme de tous les octets de logs ingérés pour toutes les heures du mois actuel.                        |
| Indexed Logs       | Affiche la somme de tous les événements de log indexés pour toutes les heures du mois actuel.                        |
| Spans analysées         | Affiche la somme de toutes les spans analysées indexées pour toutes les heures du mois actuel.                        |
| Synthetics API Tests | Affiche la somme de tous les tests API Synthetics pour toutes les heures du mois actuel.                      |
| Synthetics Browser Tests | Affiche la somme de tous les tests Browser Synthetics pour toutes les heures du mois actuel.              |
| Fargate Tasks      | Affiche la somme de toutes les tâches Fargate pour toutes les heures du mois actuel.                            |


{{< img src="account_management/billing/usage-details-02.png" alt="Utilisation horaire" responsive="true">}}

#### Infrastructure Host Types

Ce tableau présente graphiquement la répartition des **hosts d'infrastructure** par type de host :

* Hosts de l'Agent
* Hosts AWS
* Hosts Azure
* Hosts GCP

{{< img src="account_management/billing/usage-details-03.png" alt="Types de hosts d'infrastructure" responsive="true">}}


### Top 500 Custom Metrics

Ce tableau énumère les informations suivantes sur l'utilisation de vos 500 principales métriques custom lors du mois en cours :

* Le nom de la métrique
* La moyenne de métriques custom par heure
* Le maximum de métriques custom par heure
* Le pourcentage d'utilisation de la métrique par rapport à l'utilisation globale des métriques custom

Ces données peuvent être téléchargées sous forme de fichier CSV.

{{< img src="account_management/billing/usage-details-04.png" alt="Métriques custom" responsive="true">}}


## Dépannage
Pour toute question technique, contactez [l'assistance Datadog][3].

Pour toute question concernant la facturation, contactez votre [chargé de compte][4].

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /fr/developers/metrics/custom_metrics
[3]: /fr/help
[4]: mailto:success@datadoghq.com
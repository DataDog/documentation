---
title: Utilisation détaillée
kind: documentation
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

Cette section résume votre utilisation mensuelle ou MTD. Dans l'onglet « All », vous verrez votre utilisation mensuelle des hosts d'infrastructure, des conteneurs, des métriques custom, des hosts APM, des logs et de toute autre partie de la plateforme que vous avez utilisée au cours du mois.

{{< img src="account_management/billing/usage-details-v2-01.png" alt="Résumé de l'utilisation - All" >}}

Chaque onglet spécifique à un produit affiche votre utilisation mensuelle des produits dans cette catégorie.

{{< img src="account_management/billing/usage-details-v2-02.png" alt="Résumé de l'utilisation - Network" >}}

## Overall Usage

Cette section affiche l'utilisation horaire, quotidienne, mensuelle et annuelle. Dans l'onglet « All », vous verrez votre utilisation horaire, quotidienne, mensuelle et annuelle pour les éléments suivants : 

| Colonne                   | Description                                                                                                                 |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| Infra. Hosts             | Affiche le 99e centile de tous les hosts d'infrastructure distincts pour toutes les heures du mois actuel.                         |
| Containers               | Affiche la limite supérieure de tous les conteneurs distincts pour toutes les heures du mois actuel.                                    |
| APM Hosts                | Affiche le nombre total de hosts d'APM distincts au 99e centile pour toutes les heures du mois actuel.                                    |
| Analyzed Spans           | Affiche la somme de toutes les spans analysées indexées pour toutes les heures du mois actuel.                                            |
| Profiled Hosts           | Affiche le 99e centile de tous les hosts profilés distincts pour toutes les heures du mois actuel.                               |
| Profiled Containers      | Affiche le nombre total moyen de conteneurs profilés distincts pour toutes les heures du mois actuel.                                  |
| Custom Metrics           | Affiche le nombre moyen de [métriques custom][2] distinctes pour toutes les heures du mois actuel.                               |
| Ingested Custom Metrics  | Affiche le nombre moyen de métriques custom INGÉRÉES distinctes pour toutes les heures du mois actuel.                           |
| Ingested Logs            | Affiche la somme de tous les octets de logs ingérés pour toutes les heures du mois actuel.                                                |
| Indexed Logs             | Affiche la somme de tous les événements de log indexés pour toutes les heures du mois actuel.                                                |
| Analyzed Logs (Security) | Affiche la somme de tous les octets de logs analysés ingérés pour toutes les heures du mois actuel.                                       |
| Serverless Functions     | Affiche le nombre moyen de fonctions qui sont exécutées au moins une fois par heure au cours du mois actuel.              |
| Fargate Tasks            | Affiche la somme de toutes les tâches Fargate pour toutes les heures du mois actuel.                                                     |
| Network Hosts            | Affiche le 99e centile de tous les hosts réseau distincts pour toutes les heures du mois actuel.                                |
| Network Flows            | Affiche la somme de tous les flux réseau indexés pour toutes les heures du mois actuel.                                             |
| Network Devices          | Affiche le 99e centile de tous les périphériques réseau distincts pour toutes les heures du mois actuel.                              |
| Synthetics API Test Runs      | Affiche la somme de tous les tests API Synthetic pour toutes les heures du mois actuel.                                               |
| Synthetics Browser Test Runs  | Affiche la somme de tous les tests Browser Synthetic pour toutes les heures du mois actuel.                                           |
| RUM Sessions             | Affiche la somme de toutes les sessions RUM distinctes pour toutes les heures du mois actuel.                                             |


{{< img src="account_management/billing/usage-details-v2-03.png" alt="Utilisation horaire - All" >}}

Chaque onglet spécifique à un produit affiche votre utilisation annuelle des produits dans cette catégorie. Dans l'onglet Infrastructure, vous verrez également un graphique **Infra Hosts** détaillé par type de host :

* Agent Hosts
* AWS Hosts
* Azure Hosts
* GCP Hosts
* vSphere Hosts

{{< img src="account_management/billing/usage-details-v2-04.png" alt="Utilisation horaire - Infra Hosts" >}}

## Top Custom Metrics

Dans l'onglet Custom Metrics, ce tableau répertorie les informations suivantes sur les 5 000 principales métriques pour le mois en cours et le jours le plus récent (c.-à-d., la date de la dernière mise à jour) :

* Nom de la métrique
* Nombre moyen de métriques custom par heure
* Nom maximum de métriques custom par heure
* Part de la métrique dans l'utilisation globale des métriques custom

Ces données peuvent être téléchargées sous forme de fichier CSV.

{{< img src="account_management/billing/usage-details-v2-05.png" alt="Métriques custom" >}}

## Logs Usage By Index

Dans l'onglet Log Management, ce tableau affiche votre utilisation horaire, quotidienne, mensuelle et annuelle des logs indexés par nom d'index et période de rétention. Voici les informations qui sont présentées :

* Nom de l'index
* Période de rétention en jours
* Nombre de logs indexés
* Part de l'index dans l'utilisation globale des logs indexés pendant la période sélectionnée

Ces données peuvent être téléchargées sous forme de fichier CSV.

{{< img src="account_management/billing/usage-details-v2-06.png" alt="Utilisation des logs par index" >}}

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][3].

Pour toute question concernant la facturation, contactez votre [chargé de compte][4].

[1]: https://app.datadoghq.com/account/usage/hourly
[2]: /fr/developers/metrics/custom_metrics/
[3]: /fr/help/
[4]: mailto:success@datadoghq.com
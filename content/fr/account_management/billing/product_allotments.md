---
title: Quota du produit
---

Les allocations offrent une utilisation supplémentaire incluse dans les abonnements à certains produits parents. Elles permettent de bénéficier d'un volume d'utilisation défini pour un produit enfant, dans le cadre de l'utilisation engagée ou à la demande du produit parent du compte.

Parmi les exemples de produits suivant cette structure figurent les hosts d'infrastructure et les conteneurs, chaque host étant accompagné d'une allocation de conteneurs.

## Allocations dans les calculs de facturation

L'utilisation totale est classée en utilisation facturable et non facturable. L'utilisation facturable correspond à ce qui peut être facturé à un compte, tandis que l'utilisation non facturable n'est pas facturée. L'utilisation non facturable peut inclure l'utilisation en période d'essai.

Pour établir la facturation de l'utilisation facturable, l'utilisation incluse est d'abord déduite. Les allocations sont intégrées à cette utilisation incluse, laquelle sert ensuite à calculer l'utilisation à la demande à partir de l'utilisation facturable :

- `allocations + utilisation engagée = utilisation incluse`
- `utilisation facturable - utilisation incluse = utilisation à la demande`

Par exemple, un compte peut enregistrer une utilisation totale de 150 Go de spans ingérées, dont 140 Go sont facturables. Avec un engagement préalable de 50 Go et une allocation de 30 Go, soit 80 Go d'utilisation incluse, cette part est déduite des 140 Go facturables. Le solde, soit 60 Go, correspond alors à une utilisation à la demande.

- Pour consulter l'utilisation totale et l'utilisation facturable, ouvrez les onglets **All** et **Billable** dans la page [**Plan and Usage**][2] de Datadog.
- Pour consulter les engagements, reportez-vous à votre contrat.

## Calcul de l'utilisation incluse
L'utilisation incluse totale se compose de **l'engagement lié au produit et de la somme des allocations par produit parent**. Reportez-vous au contrat de l'utilisateur pour connaître les quantités engagées. Les variables suivantes déterminent le calcul de l'utilisation des allocations :

- Option à la demande
- Attributions par produits parents
- Fonction d'agrégation des utilisations

### Option à la demande

L'utilisation des allocations d'un produit peut être calculée en fonction de l'option de mesure à la demande de l'organisation. Les organisations peuvent choisir une option à la demande **mensuelle ou horaire**. Reportez-vous à votre contrat pour plus d'informations sur l'option de mesure applicable.

Par défaut, l'option à la demande est définie au niveau de l'abonnement et s'applique à tous les produits, à l'exception des suivants, qui prennent en charge une seule option à la demande par défaut :

| Produit                                         | Option par défaut |
|-------------------------------------------------|----------------|
| Conteneurs (infrastructure, profilés, sécurité) | Hourly         |
| Incident Management                             | Mensuel        |
| Produits Fargate APM                            | Mensuel        |
| Serverless APM                                  | Mensuel        |
| Produits Logs                                   | Mensuel        |
| Pièges SNMP                                      | Mensuel        |

Avec une mesure horaire, l'allocation mensuelle est ajustée en allocation horaire. Pour les produits cumulés comme les spans APM, par exemple, l'allocation mensuelle est annualisée puis divisée par le nombre d'heures dans une année pour obtenir l'allocation horaire. Pour les produits calculés en moyenne comme les métriques custom, l'allocation mensuelle reste inchangée quelle que soit l'option à la demande, car l'utilisation mensuelle totale correspond à la moyenne de l'utilisation facturable sur l'ensemble des heures du mois.

## Attributions par produits parents

Pour consulter la liste complète des allocations par produit parent, voir le tableau des allocations sur la page [Allotments Calculator][3]. Pour les allocations personnalisées ou non par défaut, reportez-vous à votre contrat pour plus d'informations.

Si l'utilisation facturable d'une organisation pour le produit parent dépasse son engagement, une allocation supplémentaire est accordée à partir de l'utilisation à la demande du produit parent et seule la consommation du produit parent est facturée. Une fois cette allocation supplémentaire épuisée, toute utilisation additionnelle du produit enfant peut être facturée au tarif à la demande. Quelle que soit l'option à la demande choisie, les allocations ne sont pas reportées sur les périodes suivantes : tout solde restant à la fin de la période de mesure horaire ou mensuelle n'est pas appliqué à la période suivante.

Par exemple, si une organisation disposant d'une option à la demande mensuelle s'engage sur 5 hosts APM Pro, elle bénéficie d'une allocation par défaut de spans ingérées de `5 hosts APM Pro x 150 Go de spans ingérées par host = 750 Go` pour le mois. Si elle utilise 6 APM Hosts et 800 Go de spans ingérées, elle est facturée pour l'utilisation de l'host supplémentaire mais pas pour l'utilisation supplémentaire de _spans_, car son allocation de spans ingérées passe à 900 Go. Le solde de 100 Go n'est pas applicable au mois suivant.

## Fonction d'agrégation des utilisations
Les fonctions d'agrégation servent à convertir l'utilisation facturable horaire en une valeur mensuelle utilisable pour la facturation. Chaque produit peut avoir jusqu'à deux fonctions d'agrégation d'utilisation (une pour chaque option à la demande possible). Les fonctions d'agrégation disponibles incluent la somme, la moyenne, le maximum et le plan de repère haut (HWMP).

- **Sum :** correspond au volume total d'utilisation additionné sur toutes les heures du mois. L'utilisation est calculée chaque heure en comparant l'utilisation incluse et l'utilisation facturable de chaque instance distincte du produit. À la fin du mois, l'utilisation à la demande est additionnée pour chaque heure du mois.
- **Average :** avec une option à la demande mensuelle, cela correspond à l'utilisation moyenne sur l'ensemble des heures du mois. L'utilisation à la demande pour le mois est obtenue en soustrayant l'utilisation incluse totale de l'utilisation moyenne du mois.

    Avec une option à la demande horaire, l'utilisation est mesurée chaque heure, puis l'utilisation incluse totale est soustraite de l'utilisation mesurée afin d'obtenir l'utilisation à la demande de chaque heure. À la fin du mois, la moyenne est calculée en additionnant l'utilisation à la demande sur toutes les heures, puis en divisant par le nombre d'heures du mois.
- **Maximum :** correspond au niveau d'utilisation le plus élevé sur l'ensemble des intervalles d'une période donnée, généralement mensuelle.
- **High watermark plan (HWMP) :** le nombre facturable de hosts est calculé en fin de mois en utilisant le nombre maximum des 99 % d'heures d'utilisation les plus basses. Datadog exclut le top 1 % afin de réduire l'impact des pics d'utilisation sur votre facture.

Consultez la section relative aux [fonctions d'agrégation d'utilisation pour les allocations](#fonctions-d-aggregation-d-utilisation-pour-les-allocations) pour plus de détails sur chaque produit.

## Calcul de l'utilisation à la demande

L'utilisation à la demande correspond à l'utilisation au-delà de la somme de l'utilisation engagée et allouée. Pour calculer l'utilisation à la demande, soustrayez l'**utilisation incluse** (c'est-à-dire l'utilisation engagée et allouée) de l'**utilisation facturable**.

L'option à la demande détermine la fréquence de calcul de l'utilisation à la demande. Avec l'option mensuelle, l'utilisation à la demande est calculée à la fin de chaque mois. Avec l'option horaire, elle est calculée chaque heure et le total à facturer en fin de mois correspond à l'agrégat de l'utilisation à la demande sur l'ensemble des heures du mois. L'utilisation à la demande est facturée au tarif à la demande. Consultez la section relative à la [tarification de Datadog][1].

### Exemple
**Une organisation avec une option à la demande mensuelle** s'engage sur 5 hosts APM Pro et aucune span ingérée. Son utilisation incluse totale est de `(5 hosts APM Pro x 150 Go de spans ingérées par host) + 0 engagement = 750 Go de spans ingérées d'utilisation incluse`. Si elle atteint 1 000 Go de spans ingérées, les 250 Go supplémentaires sont considérés comme une utilisation à la demande.

**Une organisation avec une option à la demande horaire** s'engage sur 5 hosts APM Pro et aucune span ingérée. Comme son utilisation à la demande est calculée chaque heure, son allocation mensuelle est annualisée puis divisée par le nombre d'heures dans une année : `(365 x 24 / 12) = 730`. Son allocation horaire de spans ingérées est donc de `(5 hosts APM x (150 Go de spans ingérées/host) / (730 heures)) = 1,027 Go de spans ingérées par heure`.

Si elle utilise 1,1 Go durant la 1re heure, 0,9 Go durant la 2e heure et 1,2 Go durant la 3e heure, son utilisation à la demande pour le mois correspond à la différence entre son utilisation facturable et son allocation, additionnée sur toutes les heures d'utilisation du mois : `((1,1 - 1,027 = 0,073) + (0,9 - 1,027 = 0) + (1,2 - 1,027 = 0,173)) = 0,246 Go d'utilisation à la demande pour les spans ingérées`.

## Calcul de l'utilisation facturable

L'utilisation facturable correspond à toute utilisation brute pouvant apparaître sur la facture d'un utilisateur, à l'exclusion de l'utilisation liée aux essais d'organisation et de produit. Consultez la [page Plan and Usage][2] dans Datadog pour voir votre utilisation facturable. Les variables suivantes déterminent le calcul de l'utilisation facturable :

- Option à la demande
- Fonction d'agrégation des utilisations

### Option à la demande
Avec une mesure mensuelle, l'utilisation à la demande est calculée à la fin du mois en comparant l'utilisation facturable et l'utilisation incluse. Avec une mesure horaire, l'utilisation à la demande est calculée chaque heure plutôt qu'en fin de mois. Elle est ensuite agrégée sur l'ensemble des heures d'utilisation du mois, puis l'engagement est appliqué pour obtenir la valeur finale de l'utilisation facturable à la demande.

### Agrégation des utilisations
Consultez la section [Fonction d'agrégation des utilisations](#fonction-d-agrégation-des-utilisations).

### Exemples

#### Option mensuelle à la demande

Une organisation dispose d'un engagement mensuel de 10 hosts APM Pro et de 100 Go de spans ingérées par mois sur une période de trois mois. Son utilisation est la suivante (avec les valeurs dérivées en *italique*) :

| Mois | Engagement de host APM | Utilisation de host APM | Allocation pour les spans ingérées | Utilisation incluse pour les spans ingérées | Utilisation facturable pour les spans ingérées | Utilisation à la demande pour les spans ingérées |
|-----|--------|--------|-----------|-----------|---------|---|
| 1  | 10  | 5   | *1 500 Go*   | *1 600 Go*   | 2 000 Go | *400 Go  |
| 2  | 10  | 15 | *2 250 Go  | *2 350 Go | 2 000 Go  | *0 Go*      |
| 3 | 10   | 10   | *1 500 Go*  | *1 600 Go*  | 1 600 Go | *0 Go*  |

Avec une option à la demande mensuelle, l'[allocation par défaut](#tableau-des-allocations) de spans ingérées pour chaque host APM Pro est de 150 Go.

Au **mois 1**, l'organisation s'était engagée sur 10 hosts APM mais n'en a utilisé que 5. Son allocation de spans ingérées correspondait au maximum entre son engagement en hosts et son utilisation de hosts, multiplié par l'allocation par défaut : `maximum(5, 10) x 150 Go = 1 500 Go d'allocation de spans ingérées`. Son utilisation incluse de spans ingérées correspondait à la somme de son engagement et de son allocation : `1 500 Go + 100 Go = 1 600 Go`. Son utilisation à la demande de spans ingérées correspondait au maximum entre 0 et la différence entre son utilisation facturable et son allocation : `maximum(0, 2000 – 1600) = 400 Go`.

Au **mois 2**, l'organisation s'était engagée sur 10 hosts APM mais en a utilisé 15. Son allocation de spans ingérées correspondait au maximum entre son engagement en hosts et son utilisation de hosts, multiplié par l'allocation par défaut : `maximum(15, 10) x 150 Go = 2 250 Go d'allocation de spans ingérées`. Son utilisation incluse de spans ingérées correspondait à la somme de son engagement et de son allocation : `2 250 Go + 100 Go = 2 350 Go`. Son utilisation à la demande de spans ingérées correspondait au maximum entre 0 et la différence entre son utilisation et son allocation : `maximum(0, 2 000 – 2 350) = 0 Go`.

Au **mois 3**, l'organisation s'était engagée sur 10 hosts APM et en a utilisé 10. Son allocation de spans ingérées correspondait au maximum entre son engagement en hosts et son utilisation de hosts, multiplié par l'allocation par défaut : `maximum(10, 10) x 150 Go = 1 500 Go d'allocation de spans ingérées`. Son utilisation incluse de spans ingérées correspondait à la somme de son engagement et de son allocation : `1 500 Go + 100 Go = 1 600 Go`. Son utilisation à la demande de spans ingérées correspondait au maximum entre 0 et la différence entre son utilisation et son allocation : `maximum(0, 1 600 – 1 600) = 0 Go`.

#### Option horaire à la demande

Une organisation dispose d'un engagement mensuel de 10 hosts APM Pro et de 0,3 Go de spans ingérées par mois sur une période d'un mois. Son utilisation est la suivante :

| Timestamp    | Engagement de host APM | Utilisation de host APM | Allocation de spans ingérées | Utilisation de spans ingérées | Utilisation des spans ingérées à la demande |
|--------------|---------------------|----------------|--------------------------|----------------------|--------------------------------|
| Heure 1 | 10    | 5      | 2,054 Go     | 2,500 Go    | 0,446 Go           |
| Heure 2 | 10    | 15     | 3,082 Go     | 3,000 Go    | 0 Go               |
| Heure 3 | 10    | 10     | 2,054 Go     | 2,054 Go    | 0 Go               |

Pour un utilisateur avec une option à la demande horaire, l'[allocation par défaut](#tableau-des-allocations) de spans ingérées pour chaque host APM Pro est de 0,2054 Go.

À la **1re heure**, l'organisation s'était engagée sur 10 hosts APM mais n'en a utilisé que 5. Son allocation horaire de spans ingérées correspondait au maximum entre son engagement en hosts et son utilisation de hosts, multiplié par l'allocation par défaut : `maximum(5, 10) x 0,2054 Go = 2,054 Go/heure`. Son utilisation à la demande pour cette heure correspondait au maximum entre 0 et la différence entre son utilisation facturable et son allocation : `maximum(0, 2,500 – 2,054) = 0,446 Go`.

À la **2e heure**, l'organisation s'était engagée sur 10 hosts APM mais en a utilisé 15. Son allocation horaire de spans ingérées correspondait au maximum entre son engagement en hosts et son utilisation de hosts, multiplié par l'allocation par défaut : `maximum(15, 10) x 0,2054 Go = 3,081 Go/heure`. Son utilisation à la demande pour cette heure correspondait au maximum entre 0 et la différence entre son utilisation facturable et son allocation : `maximum(0, 3,000 – 3,081) = 0 Go`.

À la **3e heure**, l'organisation s'était engagée sur 10 hosts APM et en a utilisé 10. Son allocation horaire de spans ingérées correspondait au maximum entre son engagement en hosts et son utilisation de hosts, multiplié par l'allocation par défaut : `maximum(10, 10) x 0,2054 Go = 2,054 Go/heure`. Son utilisation à la demande pour cette heure correspondait au maximum entre 0 et la différence entre son utilisation facturable et son allocation : `maximum(0, 2,054 – 2,054) = 0 Go`.

Comme la fonction d'agrégation par défaut pour les spans ingérées est la somme, l'utilisation est additionnée sur toutes les heures du mois afin d'obtenir l'utilisation totale à la demande du mois. Si cette organisation n'avait que 3 heures d'utilisation de spans ingérées sur le mois, son utilisation mensuelle totale serait de 0,446 Go : `0,446 + 0 + 0 = 0,446 Go`.

De plus, l'organisation dispose d'un engagement mensuel de 0,3 Go de spans ingérées. Son utilisation mensuelle à la demande correspond donc au maximum entre 0 et la différence entre son utilisation mensuelle et son engagement : `maximum(0, 0,446 – 0,3) = 0,146 Go`.

## Fonctions d'agrégation des utilisations pour les allocations

| Allocation             | Produits parents possibles                                      | Fonction d'agrégation mensuelle par défaut de l'utilisation | Fonction d'agrégation horaire par défaut de l'utilisation |
|-----------------------|---------------------------------------------------------------|--------------------------------------------|-------------------------------------------|
| Métriques custom | Hosts Infrastructure Pro, Hosts Infrastructure Pro Plus, Hosts Infrastructure Enterprise, Internet of Things (IoT), Serverless Workload Monitoring - Fonctions, Serverless Workload Monitoring - Apps, Invocations Serverless, Fonctions Serverless  | Moyenne | Moyenne |
| Métriques custom ingérées | Hosts Infrastructure Pro, Hosts Infrastructure Pro Plus, Hosts Infrastructure Enterprise, Internet of Things (IoT), Serverless Workload Monitoring - Fonctions, Serverless Workload Monitoring - Apps | Moyenne | Moyenne |
| Événements personnalisés | Hosts Infrastructure Pro, Hosts Infrastructure Pro Plus, Hosts Infrastructure Enterprise | Somme | Somme |
| Conteneurs Cloud Security    | Cloud Security       |      S. O.     | Somme    |
| Conteneurs CWS      | Cloud Workload Security (CWS)              |       S. O.     | Somme      |
| Conteneurs d'infrastructure    | Hosts Infrastructure Pro, Hosts Infrastructure Pro Plus, Hosts Infrastructure Enterprise |   S. O.   | Somme  |
| Profiled Containers | APM Enterprise, Continuous Profiler    |   S. O.        | Somme   |
| Profiled Hosts        | APM Enterprise       | HWMP   | Somme     |
| Spans CI indexées    | CI Visibility         | Somme     | Somme   |      
| Spans de test indexées    | Test Optimization         | Somme   | Somme   |               
| Spans APM indexées | APM, APM Pro, APM Enterprise, Serverless APM, </br> Ancien - Serverless Invocations, </br> Ancien - Serverless Functions, Fargate Task (APM Pro), </br> Fargate Task (APM Enterprise) | Somme | Somme |
| Spans APM ingérées | APM, APM Pro, APM Enterprise </br> Serverless APM, Ancien - Serverless Invocations </br> Ancien - Serverless Functions </br> Fargate Task (APM Pro), Fargate Task (APM Enterprise) | Somme | Somme | 
| Requêtes normalisées DBM | Database Monitoring (DBM) | Moyenne | Moyenne |
| Suivi des flux de données | APM Pro, APM Enterprise | HWMP | Somme |
| Exécutions de workflows GPSC | Cloud Security | Somme | Somme |
| Tâche Fargate (Continuous Profiler) | Tâche Fargate (APM Enterprise) | Moyenne | S. O. |

[1]: https://www.datadoghq.com/pricing/list/
[2]: https://app.datadoghq.com/billing/usage
[3]: https://www.datadoghq.com/pricing/allotments/
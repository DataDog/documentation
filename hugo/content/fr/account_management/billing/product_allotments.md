---
title: Quota du produit
---
Les quotas offrent une utilisation supplémentaire incluse dans les abonnements à certains produits parents. Ils accordent une certaine quantité d'utilisation pour un produit enfant dans le cadre de l'utilisation engagée et à la demande du produit parent par le compte.

Les exemples de produits présentant cette structure incluent les hosts et les conteneurs d'infrastructure, chaque host étant accompagné d'un quota de conteneurs.

## Quotas dans les calculs de facturation {#allotments-within-billing-calculations}

L'utilisation totale enregistrée est classée en utilisation facturable et non facturable. L'utilisation facturable correspond à ce qui peut être facturé à un compte, tandis que l'utilisation non facturable n'est pas facturée. L'utilisation non facturable peut inclure l'utilisation d'essai.

Afin de facturer l'utilisation facturable, l'utilisation incluse est d'abord soustraite. Les quotas sont pris en compte dans l'utilisation incluse, qui est ensuite utilisée pour calculer l'utilisation à la demande à partir de l'utilisation facturable :

- `allotments + committed usage = included usage`
- `billable usage - included usage = on-demand usage`

Par exemple, un compte peut avoir une utilisation totale de 150 Go pour les spans ingérés. Sur ce total, 140 Go correspondent à une utilisation facturable. S'il existe un engagement préalable de 50 Go et un quota de 30 Go, ces 80 Go d'utilisation sont classés comme utilisation incluse et soustraits des 140 Go d'utilisation facturable. Les 60 Go d'utilisation restants sont classés comme utilisation à la demande.

- Pour consulter l'utilisation totale et l'utilisation facturable, reportez-vous aux onglets {{< ui >}}All{{< /ui >}} et {{< ui >}}Billable{{< /ui >}} de la page [**Plan and Usage**][2] dans Datadog. 
- Pour consulter les engagements, reportez-vous à votre contrat.

## Calcul de l'utilisation incluse {#calculating-included-usage}
L'utilisation incluse totale se compose de l'**engagement pour le produit et de la somme des quotas par produit parent**. Reportez-vous au contrat de l'utilisateur pour connaître les quantités engagées. Les variables suivantes déterminent la manière dont l'utilisation des quotas est calculée :

- Option à la demande
- Quotas par produits parents
- Fonction d'agrégation de l'utilisation

### Option à la demande {#on-demand-option}

L'utilisation des quotas d'un produit peut être calculée en fonction de l'option de mesure à la demande de l'organisation. Les organisations peuvent opter pour une option à la demande **mensuelle ou horaire**. Reportez-vous à votre contrat pour obtenir des informations sur votre option de mesure. 

Par défaut, l'option à la demande est définie au niveau de l'abonnement et s'applique à tous les produits à l'exception des suivants, qui prennent en charge une seule option à la demande par défaut : 

| Produit                                         | Option par défaut |
|-------------------------------------------------|----------------|
| Containers (Infrastructure, Profiled, Security) | Horaire         |
| Incident Management                             | Mensuelle        |
| Produits APM Fargate                            | Mensuelle        |
| APM Serverless                                  | Mensuelle        |
| Produits Logs                                   | Mensuelle        |
| SNMP Traps                                      | Mensuelle        |

En cas de mesure horaire, le quota mensuel est ajusté en un quota horaire. Pour les produits cumulés tels que les spans APM, par exemple, le quota mensuel est annualisé puis divisé par le nombre d'heures dans une année pour obtenir le quota horaire. Pour les produits moyennés tels que les Custom Metrics, le quota mensuel reste le même quelle que soit l'option à la demande, car l'utilisation mensuelle totale est la moyenne de l'utilisation facturable sur toutes les heures du mois.

## Quotas par produits parents {#allotments-by-parent-products}

Pour obtenir la liste complète des quotas par défaut par produit parent, consultez le tableau des quotas sur la page [Allotments Calculator][3]. Pour les quotas personnalisés ou différents des quotas par défaut, consultez votre contrat pour plus d'informations.

Si l'utilisation facturable d'un produit parent par une organisation dépasse son engagement, elle reçoit un quota supplémentaire lié à l'utilisation à la demande du produit parent et n'est facturée que pour le produit parent. Une fois ce quota supplémentaire épuisé, toute utilisation supplémentaire du produit enfant peut être facturée au tarif à la demande. Quelle que soit l'option à la demande, les quotas ne sont généralement pas reportés sur les heures suivantes. Si une organisation a un reliquat à la fin de sa période de mesure horaire ou mensuelle, celui-ci n'est pas applicable à la période suivante (voir la remarque ci-dessous concernant un changement à venir).

Par exemple, si une organisation ayant une option à la demande mensuelle s'est engagée sur 5 APM Pro Hosts, elle dispose d'un quota par défaut d'Ingested Spans de `5 APM Pro Hosts * 150 GB Ingested Spans per host = 750 GB` pour le mois. Si elle utilise 6 APM Hosts et 800 Go d'Ingested Spans, elle est facturée pour l'utilisation supplémentaire des hosts, mais pas pour l'utilisation supplémentaire de _spans_, car son quota d'Ingested Spans passe à 900 Go. Le reliquat de 100 Go n'est pas applicable le mois suivant.

**Remarque** : À partir d'août 2026, certains comptes commencent à constater un changement dans le traitement des quotas. Les changements décrits ci-dessous sont appliqués aux comptes de manière progressive. Une bannière apparaît dans Plan and Usage, sous Bill Overview, lorsque ce changement prend effet. Les utilisateurs peuvent également contacter leur responsable de compte pour comprendre comment leurs quotas sont actuellement appliqués.

Les quotas pour les produits dont l'utilisation est cumulée sur le mois (par exemple, Ingested Spans ou Indexed Spans) s'appliquent sur toute la période de facturation au lieu d'heure par heure, de sorte que les quotas inutilisés peuvent être reportés sur d'autres heures de la même période de facturation. Cela peut réduire le coût à la demande.

Dans l'exemple suivant, les 50 unités de quota inutilisées au cours des deux premières heures sont reportées pour couvrir la troisième heure, plus chargée, de sorte qu'aucune utilisation à la demande n'est facturée :

| Heure | Utilisation | Quota horaire | Coût à la demande facturé |
| --- | --- | --- | --- |
| Heure 1 | 60 | 100 | 0 (40 ajoutés à la réserve mensuelle) |
| Heure 2 | 90 | 100 | 0 (10 ajoutés à la réserve mensuelle) |
| Heure 3 | 150 | 100 | 0 (couvert par les 50 unités mises en réserve précédemment) |
| **Total** | **300** | **300** | **0** |

Pour les produits mesurés selon un nombre simultané, un pic ou une moyenne (tels que les hosts, les Containers et les Custom Metrics), le quota s'applique à chaque instant plutôt que sous la forme d'un budget mensuel. Il n'y a aucune quantité inutilisée à reporter d'une heure à l'autre ; le fonctionnement de ces produits reste donc inchangé.

Ce changement ne s'applique pas à l'utilisation facturée via une place de marché externe (par exemple, AWS, Azure ou Google Cloud), où les quotas continuent de s'appliquer par heure.

Tant qu'un compte n'a pas été migré, les quotas continuent de s'appliquer par heure, comme décrit ci-dessus. Dans tous les cas, les quotas ne sont pas reportés d'une période de facturation à l'autre : tout reliquat à la fin de la période de mesure ne s'applique pas à la période suivante.

## Fonction d'agrégation d'utilisation {#usage-aggregation-function}
Les fonctions d'agrégation sont utilisées pour convertir l'utilisation facturable horaire en une valeur d'utilisation mensuelle pouvant être utilisée pour la facturation. Chaque produit peut avoir jusqu'à deux fonctions d'agrégation d'utilisation (une pour chaque option à la demande possible). Les fonctions d'agrégation disponibles incluent la somme, la moyenne, le maximum et le high watermark plan (HWMP). 

- **Somme :** Il s'agit de la somme du volume total d'utilisation sur toutes les heures du mois. L'utilisation est calculée chaque heure, car l'utilisation incluse est comparée à l'utilisation facturable de chaque instance distincte d'utilisation du produit. À la fin du mois, l'utilisation à la demande est additionnée pour chaque heure du mois.
- **Moyenne :** Sur une option à la demande mensuelle, il s'agit de l'utilisation moyenne sur toutes les heures du mois. L'utilisation à la demande pour le mois est dérivée en soustrayant l'utilisation totale incluse de l'utilisation moyenne pour le mois.

    Sur une option à la demande horaire, l'utilisation est mesurée chaque heure, puis l'utilisation totale incluse est soustraite de l'utilisation mesurée chaque heure pour obtenir l'utilisation à la demande pour chaque heure. À la fin du mois, la moyenne est calculée en additionnant l'utilisation à la demande sur toutes les heures et en divisant par le nombre d'heures dans le mois.
- **Maximum :** Il s'agit de l'utilisation maximale sur tous les intervalles sur une période donnée, généralement mensuelle.
- **Plan de seuil haut (HWMP) :** Le nombre d'hôtes facturables est calculé à la fin du mois à partir du nombre maximal d'hôtes observé pendant les 99 % des heures où l'utilisation est la plus faible. Datadog exclut le 1 % supérieur pour réduire l'impact des pics d'utilisation sur votre facture. 

Voir [Fonctions d'agrégation de l'utilisation pour les allocations](#usage-aggregation-functions-for-allotments) pour plus de détails sur chaque produit.

## Calcul de l'utilisation à la demande {#calculating-on-demand-usage}

L'utilisation à la demande désigne l'utilisation accumulée au-delà de la somme de l'utilisation engagée et allouée. Pour calculer l'utilisation à la demande, soustrayez l'**utilisation incluse** (c'est-à-dire les utilisations engagées et allouées) de l'**utilisation facturable**. 

L'option à la demande détermine la fréquence à laquelle l'utilisation à la demande est calculée. Pour l'option à la demande mensuelle, l'utilisation à la demande est calculée à la fin de chaque mois. Pour l'option à la demande horaire, l'utilisation à la demande est calculée chaque heure et l'utilisation totale à la demande à facturer à la fin du mois est l'agrégat de l'utilisation à la demande horaire sur toutes les heures du mois. L'utilisation à la demande est facturée à un tarif à la demande. Voir [Datadog Pricing][1].

### Exemple {#example}
**Une organisation avec une option à la demande mensuelle** s'engage sur 5 hosts APM Pro et aucun Ingested Spans. Elle aura une utilisation incluse totale de `(5 APM Pro hosts * 150 GB Ingested Spans per host) + 0 commitment = 750 GB Ingested Spans of total included usage`. Si elle utilise 1000 Go d'Ingested Spans, les 250 Go supplémentaires sont classés comme utilisation à la demande.

**Une organisation avec une option à la demande horaire** s'engage sur 5 hosts APM Pro et aucun Ingested Spans. Comme son utilisation à la demande est calculée heure par heure, son quota mensuel est multiplié par douze, puis divisé par le nombre d'heures dans une année : `(365 * 24 / 12) = 730`. Ainsi, son quota horaire d'Ingested Spans est de `(5 APM Hosts * (150 GB Ingested Spans / Host) /  (730 hours))  = 1.027 GB Ingested Spans per hour`.

Si elle a utilisé 1,1 Go pendant l'heure 1, 0,9 Go pendant l'heure 2 et 1,2 Go pendant l'heure 3, son utilisation à la demande pour le mois correspond à la somme, pour toutes les heures d'utilisation du mois, des différences entre son utilisation facturable et son quota d'utilisation : `((1.1 - 1.027 = 0.073) + (0.9 - 1.027 = 0) + (1.2 - 1.027 = 0.173)) = 0.246 GB on-demand usage for Ingested Spans`.

## Calcul de l'utilisation facturable {#calculating-billable-usage}

L'utilisation facturable désigne toute utilisation brute éligible pour figurer sur la facture d'un utilisateur, à l'exclusion de l'utilisation liée aux essais d'organisation et de produit. Consultez la [page Plan and Usage][2] dans Datadog pour voir votre utilisation facturable. Les variables suivantes déterminent la manière dont l'utilisation facturable est calculée :

- Option à la demande
- Fonction d'agrégation de l'utilisation

### Option à la demande {#on-demand-option-1}
Dans le cadre d'un calcul mensuel de l'utilisation, l'utilisation à la demande est calculée à la fin du mois en comparant l'utilisation facturable à l'utilisation incluse. Dans le cadre d'un calcul horaire de l'utilisation, l'utilisation à la demande est calculée chaque heure au lieu d'être calculée à la fin du mois. Elle est ensuite agrégée sur toutes les heures d'utilisation du mois, puis l'engagement est appliqué pour obtenir une valeur finale d'utilisation à la demande facturable.

### Agrégation de l'utilisation {#usage-aggregation}
Voir [Fonction d'agrégation de l'utilisation](#usage-aggregation-function).

### Exemples {#examples}

#### Option à la demande mensuelle {#monthly-on-demand-option}

Une organisation a un engagement mensuel de 10 hosts APM Pro et un engagement de 100 Go d'Ingested Spans par mois sur une période de trois mois. Son utilisation est la suivante (avec les valeurs dérivées en *italique*) : 

| Mois | Engagement de hosts APM | Utilisation de hosts APM | Allocation pour Ingested Spans | Utilisation incluse pour Ingested Spans | Utilisation facturable pour Ingested Spans | Utilisation à la demande pour Ingested Spans |
|-----|--------|--------|-----------|-----------|---------|---|
| 1  | 10  | 5   | *1500 Go*   | *1600 Go*   | 2000 Go | *400 Go*  |
| 2  | 10  | 15 | *2250 Go*  | *2350 Go* | 2000 Go  | *0 Go*      |
| 3 | 10   | 10   | *1500 Go*  | *1600 Go*  | 1600 Go | *0 Go*  |

Pour une option à la demande mensuelle, l'[allocation par défaut](#allotments-table) d'Ingested Spans pour chaque host APM Pro est de 150 Go. 

Au **mois 1**, l'organisation s'était engagée sur 10 hosts APM mais n'en a utilisé que 5. Son allocation d'Ingested Spans correspondait au maximum entre son engagement de hosts et le nombre de hosts utilisés, multiplié par l'allocation par défaut : `maximum(5, 10) * 150 GB = 1500 GB allotment of Ingested Spans`. Son utilisation incluse pour Ingested Spans était la somme de son engagement et de son allocation : `1500 GB + 100 GB = 1600 GB`. Son utilisation à la demande pour Ingested Spans était le maximum entre 0 et la différence entre son utilisation facturable et son allocation : `maximum(0, 2000 – 1600) = 400 GB`.

Au **mois 2**, l'organisation s'était engagée sur 10 hosts APM mais en a utilisé 15. Son allocation d'Ingested Spans correspondait au maximum entre son engagement de hosts et le nombre de hosts utilisés, multiplié par l'allocation par défaut : `maximum(15, 10) * 150 GB = 2250 GB allotment of Ingested Spans`. Son utilisation incluse pour Ingested Spans était la somme de son engagement et de son allocation : `2250 GB + 100 GB = 2350 GB`. Son utilisation à la demande pour Ingested Spans était le maximum entre 0 et la différence entre son utilisation et son allocation : `maximum(0, 2000 – 2350) = 0 GB`.

Au **mois 3**, l'organisation s'était engagée sur 10 hosts APM et en a utilisé 10. Son allocation d'Ingested Spans correspondait au maximum entre son engagement de hosts et le nombre de hosts utilisés, multiplié par l'allocation par défaut : `maximum(10, 10) * 150 GB = 1500 GB allotment of Ingested Spans`. Son utilisation incluse pour Ingested Spans était la somme de son engagement et de son allocation : `1500 GB + 100 GB = 1600 GB`. Son utilisation à la demande pour Ingested Spans était le maximum entre 0 et la différence entre son utilisation et son allocation : `maximum(0, 1600 – 1600) = 0 GB`.

#### Option à la demande horaire {#hourly-on-demand-option}

Une organisation a un engagement mensuel de 10 hosts APM Pro et de 0,3 Go d'Ingested Spans par mois sur une période d'un mois. Son utilisation est la suivante : 

| Horodatage    | Engagement de hosts APM | Utilisation des hosts APM | Allocation d'Ingested Spans | Utilisation d'Ingested Spans | Utilisation à la demande d'Ingested Spans |
|--------------|---------------------|----------------|--------------------------|----------------------|--------------------------------|
| Heure 1 | 10    | 5      | 2.054 Go     | 2.500 Go    | 0.446 Go           |
| Heure 2 | 10    | 15     | 3.082 Go     | 3.000 Go    | 0 Go               |
| Heure 3 | 10    | 10     | 2.054 Go     | 2.054 Go    | 0 Go               |

Pour un utilisateur avec une option à la demande horaire, l'[allocation par défaut](#allotments-table) d'Ingested Spans pour chaque host APM Pro est de 0.2054 Go.

À l'**heure 1**, l'organisation s'était engagée sur 10 hosts APM mais n'en a utilisé que 5. Son allocation horaire d'Ingested Spans correspondait au plus grand des deux nombres, celui des hosts prévus par son engagement et celui des hosts utilisés, multiplié par l'allocation par défaut : `maximum(5, 10)  * 0.2054 GB = 2.054 GB / hour`. Son utilisation à la demande pour l'heure est le maximum entre 0 et la différence entre son utilisation facturable et son utilisation allouée : `maximum(0, 2.500 – 2.054) = 0.446 GB`.

À l'**heure 2**, l'organisation s'était engagée sur 10 hosts APM mais en a utilisé 15. Son allocation horaire d'Ingested Spans correspondait au plus grand des deux nombres, celui des hosts prévus par son engagement et celui des hosts utilisés, multiplié par l'allocation par défaut : `maximum(15,10) * 0.2054 GB = 3.081 GB / hour`. Son utilisation à la demande pour l'heure est le maximum entre 0 et la différence entre son utilisation facturable et son utilisation allouée : `maximum(0, 3.000 – 3.081) = 0 GB`.

À l'**heure 3**, l'organisation s'était engagée sur 10 hosts APM et en a utilisé 10. Son allocation horaire d'Ingested Spans correspondait au plus grand des deux nombres, celui des hosts prévus par son engagement et celui des hosts utilisés, multiplié par l'allocation par défaut : `maximum(10,10) * 0.2054 GB = 2.054 GB / hour`. Son utilisation à la demande pour l'heure est le maximum entre 0 et la différence entre son utilisation facturable et son utilisation allouée : `maximum(0, 2.054 – 2.054) = 0 GB`.

Comme la fonction d'agrégation d'utilisation par défaut pour les Ingested Spans est la somme, l'utilisation est additionnée sur toutes les heures du mois pour obtenir l'utilisation totale à la demande pour le mois. Si cette organisation n'avait que 3 heures d'utilisation d'Ingested Spans sur le mois, son utilisation mensuelle totale serait de 0 : `4452 + 0 + 0 = 0.446 GB`. 

De plus, l'organisation a un engagement mensuel de 0,3 Go d'Ingested Spans. Ainsi, son utilisation mensuelle à la demande est le maximum entre 0 et la différence entre son utilisation mensuelle et son engagement : `maximum(0, 0.446 – 0.3) = 0.146 GB`.

## Fonctions d'agrégation d'utilisation pour les allocations {#usage-aggregation-functions-for-allotments}

| Allocation             | Produits parents possibles                                      | Fonction d'agrégation d'utilisation mensuelle par défaut | Fonction d'agrégation d'utilisation horaire par défaut |
|-----------------------|---------------------------------------------------------------|--------------------------------------------|-------------------------------------------|
| Custom Metrics | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts, Internet des objets (IoT), Serverless Workload Monitoring - Functions, Serverless Workload Monitoring - Apps, Serverless Invocations, Serverless Functions  | Moyenne | Moyenne |
| Ingested Custom Metrics | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts, Internet des objets (IoT), Serverless Workload Monitoring - Functions, Serverless Workload Monitoring - Apps | Moyenne | Moyenne |
| Custom Events | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts | Somme | Somme |
| Cloud Security Containers    | Cloud Security       |      N/A     | Somme    |
| CWS Containers      | Cloud Workload Security (CWS)              |       N/A     | Somme      |
| Infrastructure Containers    | Infrastructure Pro Hosts, Infrastructure Pro Plus Hosts, Infrastructure Enterprise Hosts |   N/A   | Somme  |
| Profiled Containers | APM Enterprise, Continuous Profiler    |   N/A        | Somme   |
| Profiled Hosts        | APM Enterprise       | HWMP   | Somme     |
| CI Indexed Spans    | CI Visibility         | Somme     | Somme   |      
| Test Indexed Spans    | Test Optimization         | Somme   | Somme   |               
| APM Indexed Spans | APM, APM Pro, APM Enterprise, Serverless APM, </br> Legacy - Serverless Invocations, </br> Legacy - Serverless Functions, Fargate Task (APM Pro), </br> Fargate Task (APM Enterprise) | Somme | Somme |
| APM Ingested Spans | APM, APM Pro, APM Enterprise </br> Serverless APM, Legacy - Serverless Invocations </br> Legacy - Serverless Functions </br> Fargate Task (APM Pro), Fargate Task (APM Enterprise) | Somme | Somme | 
| DBM Normalized Queries | Database Monitoring (DBM) | Moyenne | Moyenne |
| Data Streams Monitoring | APM Pro, APM Enterprise | HWMP | Somme |
| CSPM Workflow Runs | Cloud Security | Somme | Somme |
| Fargate Task (Continuous Profiler) | Fargate Task (APM Enterprise) | Moyenne | N/A |

[1]: https://www.datadoghq.com/pricing/list/
[2]: https://app.datadoghq.com/billing/usage
[3]: https://www.datadoghq.com/pricing/allotments/
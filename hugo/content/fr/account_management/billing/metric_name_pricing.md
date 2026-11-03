---
algolia:
  tags:
  - custom metrics billing
  - metric name pricing
further_reading:
- link: /account_management/billing/custom_metrics/
  tag: Documentation
  text: Facturation des Custom Metrics (tarification à la cardinalité)
- link: /metrics/custom_metrics/
  tag: Documentation
  text: En savoir plus sur les Custom Metrics
- link: /metrics/metrics-without-limits/
  tag: Documentation
  text: Metrics without Limits™
- link: /metrics/guide/custom_metrics_governance/
  tag: Guide
  text: Bonnes pratiques pour la gouvernance des Custom Metrics
- link: https://www.datadoghq.com/blog/infinite-cardinality-metrics/
  tag: Blog
  text: 'Métriques à cardinalité infinie : Custom Metrics conçues pour les systèmes
    modernes'
title: Tarification par nom de métrique pour les Custom Metrics
---
## Présentation {#overview}

La tarification par nom de métrique facture les Custom Metrics en fonction du nombre de noms de métriques uniques que vous soumettez et du volume de points de données que ces noms produisent. Il remplace le modèle de [facturation des Custom Metrics][1] basé sur la cardinalité pour les organisations qui choisissent d'y adhérer.

**Remarque** : Cette page s'applique si votre contrat utilise des SKU de tarification par nom de métrique. Ces SKU sont mutuellement exclusifs avec les SKU de tarification par série temporelle (cardinalité). Si votre contrat utilise plutôt la tarification par série temporelle, consultez [Facturation des Custom Metrics][1].

Datadog distingue les points de données ingérés des points de données indexés. Les points de données **ingérés** correspondent à chaque point de données de métrique envoyé par vos services. Les points de données **indexés** sont les points qui restent interrogeables. Par défaut, chaque point de données ingéré est également indexé. [Metrics without Limits™][4] réduit optionnellement votre volume indexé en excluant les tags dont vous n'avez pas besoin, afin que vous ne soyez facturé que pour les points de données qui restent interrogeables. Le volume indexé est toujours inférieur ou égal au volume ingéré.

## SKUs {#skus}

La tarification par nom de métrique introduit trois SKUs :

| SKU             | Ce qu'il facture                                                                      |
|-----------------|------------------------------------------------------------------------------------|
| Nom de métrique     | Chaque nom de métrique unique soumis au cours d'un mois avec plus de 100 points de données indexés |
| Points indexés | Points de données indexés au-dessus de la référence de 10 M par nom de métrique |
| Points ingérés | Points de données ingérés au-dessus de 5 fois votre volume indexé |

Ces SKUs sont mutuellement incompatibles avec les SKUs de tarification par série temporelle (cardinalité).

## Structure tarifaire {#pricing-structure}

Les noms de métriques et les points de données indexés sont facturés avec des remises marginales basées sur le volume, réparties sur 5 niveaux. Les niveaux à volume plus élevé ont des tarifs unitaires plus bas. À mesure que votre utilisation augmente, la partie qui dépasse chaque niveau supérieur est facturée au tarif de ce niveau. L'utilisation précédemment facturée n'est jamais recalculée.

{{< img src="account_management/billing/metric_name_pricing/marginal-pricing-tiers.png" alt="Diagramme illustrant le fonctionnement de la tarification marginale, simplifié en cinq niveaux de volume. Chaque niveau a un tarif unitaire, visualisé par la hauteur d'une barre ; les niveaux à volume plus élevé (côté droit) ont des barres progressivement plus courtes, indiquant des tarifs unitaires inférieurs à ceux des niveaux à volume plus faible (côté gauche)." style="width:100%;" >}}

Les tarifs unitaires varient selon le type de contrat :

| Type de contrat | Tarif par rapport à la référence annuelle |
|-----------------|----------------------------------|
| Annuel | Référence |
| Mensuel | +20 % |
| On-Demand | +40 % |

Les tarifs spécifiques et les limites des niveaux sont définis dans votre contrat. Contactez [Sales][2] ou votre responsable [Customer Success][3] pour plus de détails.

## Utilisation mensuelle et horaire {#monthly-and-hourly-usage}

L'utilisation de la tarification par nom de métrique est suivie heure par heure et facturée soit à l'heure, soit au mois, selon votre contrat. Chaque nom de métrique unique est compté une fois par mois, au cours de l'heure où il soumet ses premiers points de données indexés. Chaque nom de métrique facturé inclut 10 millions de points de données indexés. Les points de données dépassant cette allocation s'accumulent dans un seul compartiment d'excédent mensuel pour l'ensemble de vos métriques.

À la fin de la période de facturation, la facture mensuelle totale est la somme de :

- Les noms de métriques par paliers sont facturés en fonction des noms de métriques uniques du mois
- Les points de données indexés par paliers sont facturés en fonction des points de données excédentaires du mois

Les compteurs mensuels sont réinitialisés pour le cycle de facturation suivant.

La facturation horaire produit le même total que la facturation mensuelle. Le traitement horaire affecte le moment où les limites des paliers sont franchies, et non la charge finale.

### Exemple {#example}

Supposons que, sur un mois, votre utilisation horaire se présente comme suit :

| Heure | Nouveaux noms de métriques cette heure | Noms de métriques cumulés | Nouveaux points de données excédentaires cette heure | Points de données excédentaires cumulés |
|------|----------------------------|-------------------------|-----------------------------------|--------------------------------|
| 1-5  | +6                         | 6                       | +18M                              | 18M                            |
| 6    | +100                       | 106                     | +5M                               | 23M                            |
| 7    | +150                       | 256                     | +10M                              | 33M                            |
| 8    | +200                       | 456                     | +15M                              | 48M                            |
| 9    | +100                       | 556                     | +10M                              | 58M                            |

À la fin du mois:

- Les 556 noms de métriques sont facturés selon les paliers marginaux dans lesquels ils se situent.
- Les 58 millions de points de données excédentaires sont facturés selon les paliers marginaux dans lesquels ils se situent.

## Comportement d'ingestion {#ingestion-behavior}

Dans le cadre de la tarification par nom de métrique, chaque point de données de métrique que vos services envoient à Datadog est comptabilisé dans l'ingestion, indépendamment de la configuration [Metrics without Limits™][4]. Par défaut, tous les points de données ingérés sont indexés. La configuration de Metrics without Limits™ réduit votre volume indexé.

Votre quota d'ingestion gratuit couvre les points de données ingérés jusqu'à cinq fois votre volume indexé. Vous êtes facturé pour les points de données ingérés uniquement au-delà de ce seuil au cours d'un mois donné.

{{< img src="account_management/billing/metric_name_pricing/ingestion-billing.png" alt="Diagramme illustrant la relation de facturation de l'ingestion avec la tarification par nom de métrique. Le volume ingéré se divise en une zone d'ingestion gratuite (jusqu'à cinq fois le volume indexé) et une zone de dépassement facturable au-delà de ce seuil. Le volume indexé se situe en dessous en tant que mesure distincte égale à un segment de la zone d'ingestion gratuite." style="width:100%;" >}}

**Remarque** : Il s'agit d'un changement par rapport au modèle basé sur la cardinalité, dans lequel seules les métriques configurées avec Metrics without Limits™ contribuent au volume ingéré.

### Métriques de distribution{#distribution-metrics}

Pour les [Distribution metrics][5], un multiplicateur s'applique aux points de données ingérés et indexés, que la métrique soit configurée ou non avec Metrics without Limits™. Le multiplicateur est par défaut de **cinq fois** (un pour chacune des agrégations count, sum, min, max et avg générées par Datadog). Lorsque les agrégations de centiles (p50, p75, p90, p95, p99) sont activées, le multiplicateur est de **dix fois**.

- Pour les métriques de distribution non configurées, les volumes ingérés et indexés sont égaux après l'application du multiplicateur.
- Pour les métriques de distribution configurées, le multiplicateur s'applique au volume ingéré, tandis que le volume indexé peut être inférieur en fonction de la configuration des tags et des règles d'indexation.

#### Exemple {#example-1}

Une métrique de distribution qui soumet 100 points de données avec les agrégations par défaut est facturée comme 500 points de données (100 × 5). Avec les agrégations de centiles activées, les mêmes soumissions sont facturées comme 1 000 points de données (100 × 10).

## Ingestion de métriques historiques{#historical-metric-ingestion}

L'utilisation de [Historical Metric Ingestion][6] est calculée en fonction de l'heure d'ingestion, et non de l'horodatage d'origine de la métrique. Chaque point de données HMI contribue à la fois au volume ingéré et au volume indexé.

{{< img src="account_management/billing/metric_name_pricing/ingestion-billing-hmi.png" alt="Diagramme illustrant la facturation HMI avec la tarification par nom de métrique. La barre de volume ingéré et la barre de volume indexé ont la même largeur, reliées par une annotation de rapport 1:1. Pour les métriques HMI, le volume ingéré est toujours égal au volume indexé." style="width:100%;" >}}

## Adoption engagée {#committed-adoption}

Vous pouvez vous engager sur un volume d'utilisation indépendamment pour les noms de métriques et pour les points de données. Chaque engagement est facturé au niveau de tarification marginal dans lequel tombe le volume engagé. Le volume total engagé est facturé au tarif de ce niveau, et la remise marginale ne s'applique pas dans la plage engagée. L'utilisation au-delà du montant engagé suit le barème marginal standard, en commençant à la limite de niveau immédiatement supérieure au volume engagé.

Par exemple, si vous vous engagez sur 15 000 noms de métriques qui tombent dans le niveau 3, les 15 000 sont facturés au tarif du niveau 3. Si votre utilisation réelle atteint 150 000 noms de métriques, les 135 000 supplémentaires suivent le barème marginal du niveau 3 au niveau 4.

## Attribution de l'utilisation {#usage-attribution}

Pour la phase initiale de la tarification des noms de métriques, l'[Attribution de l'utilisation][7] est prise en charge pour les points de données indexés. Le coût des noms de métriques est attribué proportionnellement à la part de chaque tag dans le total des points de données. Un groupe défini par un tag qui contribue à 20 % des points de données se voit attribuer 20 % du coût des noms de métriques.

L'attribution de l'utilisation pour l'ingestion n'est pas prise en charge dans la phase initiale.

## Métriques personnalisées et standard {#custom-and-standard-metrics}

La tarification des noms de métriques utilise la même définition des métriques personnalisées et standard que la tarification à la cardinalité. Pour savoir ce qui est considéré comme une métrique personnalisée, consultez [Custom Metrics][8].

## Dépannage {#troubleshooting}

Pour toute question technique, contactez le [support Datadog][9].

Pour les questions relatives à la facturation, contactez votre gestionnaire de la [réussite client][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/billing/custom_metrics/
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: /fr/metrics/metrics-without-limits/
[5]: /fr/metrics/types/?tab=distribution#metric-types
[6]: /fr/metrics/custom_metrics/historical_metrics/
[7]: /fr/account_management/billing/usage_attribution/
[8]: /fr/metrics/custom_metrics/
[9]: /fr/help/
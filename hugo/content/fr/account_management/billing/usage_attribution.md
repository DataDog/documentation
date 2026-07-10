---
algolia:
  tags:
  - usage attribution
  - cost attribution
aliases:
- /fr/account_management/billing/advanced_usage_reporting/
- /fr/account_management/billing/custom_usage_reporitng/
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentation
  text: Paramètres de formule et d'utilisation
title: Attribution de l'utilisation
---

## Présentation

Les administrateurs ou les utilisateurs disposant de l'autorisation Usage Read peuvent accéder à l'onglet Usage Attribution depuis la section Plan & Usage dans Datadog. La page Usage Attribution fournit les informations et fonctionnalités suivantes :

- Consulter la répartition de l'utilisation en fonction des différentes clés de tag et ajouter ou modifier de nouvelles clés (jusqu'à trois clés de tag)
- Résumez l'utilisation à la fin de chaque mois et visualisez son évolution dans le temps en la répartissant par tags.
- Générez des fichiers CSV au fil du mois ainsi que des fichiers horaires.

Cette fonctionnalité ne prend pas en charge l'utilisation de produits qui ne peuvent pas être associés à des tags lors de l'instrumentation. Par exemple, les utilisateurs d'Incident Management, les utilisateurs de pipelines CI et des tests, les slots de tests parallèles et l'Audit Trail.

## Prise en main

Pour commencer à recevoir des données quotidiennes, un administrateur doit sélectionner des tags pour le rapport.

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Débuter avec l'attribution de l'utilisation dans Datadog" style="width:100%;" >}}

La fenêtre contextuelle **Edit Tags** permet :

- De sélectionner dans une liste déroulante jusqu'à 3 clés de tag. Les valeurs de la liste déroulante correspondent aux tags existants dans le compte racine et dans les organisations enfant sous le compte.
- De supprimer et modifier des tags existants.

{{< img src="account_management/billing/usage_attribution/Edit-Tags-Popover.png" alt="Modifier les tags dans l'attribution de l'utilisation" style="width:80%;" >}}

- Une fois les tags configurés, le premier rapport est généré sous 24 heures.
- Les rapports sont régulièrement générés.
- Si vous modifiez des tags, le nouveau rapport tient compte de vos changements. Cependant, les rapports précédents conservent les anciens tags.
- Les rapports mensuels reflètent le dernier jeu de tags. Si les tags sont modifiés en cours de mois, des rapports partiels sont créés pour chaque période de rapport.

## Utilisation totale

### Attribution de l'utilisation mensuelle

Les rapports mensuels sont mis à jour quotidiennement et fournissent une agrégation des données d'utilisation depuis le début du mois.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Tags appliqués dans Datadog" style="width:100%;" >}}

- Les données pour des produits, des tags et des organisations spécifiques peuvent être sélectionnées à l'aide du sélecteur de facettes.
- Les données peuvent être regroupées ou dissociées en fonction des clés de tags sélectionnées.
- Les options Valeur et Pourcentage sont disponibles pour l'affichage du tableau.
- Les données affichées dans le tableau peuvent être modifiées pour inclure certains produits.
- Si vous avez activé les comptes multi-org, l'utilisation est résumée pour toutes les organisations Datadog du compte parent.
- Utilisez le sélecteur d'intervalle pour accéder aux rapports des mois précédents.
- Les rapports peuvent être téléchargés au format CSV. Ces rapports incluent à la fois les volumes d'utilisation et les pourcentages, ce qui facilite les répartitions et les refacturations. Les pourcentages sont calculés pour chaque organisation.

Les données mensuelles peuvent également être récupérées à l'aide de l'API. Pour plus d'informations, consultez la [documentation sur l'endpoint d'API][1].

### Attribution de l'utilisation horaire

Les données horaires peuvent également être récupérées à l'aide de l'API. Pour plus d'informations, consultez la [documentation sur l'endpoint d'API][2].

### Interprétation des données

Le tableau ci-dessous montre un exemple de rapport quotidien pour l'utilisation d'Infra selon deux tags : `app` et `service`.

| public_id | hour                | app          | service                  | total_usage |
| --------- | ------------------- | ------------- | ------------------------| --------------------- |
| publicid1 | 2022-03-31 00:00:00 | &lt;empty&gt; | service1 &#124; service2  | 50                  |
| publicid1 | 2022-03-31 09:00:00 | app1         |                          | 28                    |
| publicid1 | 2022-03-31 18:00:00 | app2         | service3                 | 1023                  |

- Une valeur `<empty>` indique que la ressource a été taguée avec le tag concerné, mais qu'elle ne présente aucune valeur.
- Si aucune valeur n'est indiquée, cela indique que la ressource ne comporte pas le tag concerné.
- Des valeurs séparées par le symbole `|` (barre verticale) (par exemple, `service1 | service2`) indiquent qu'un tag spécifique a été appliqué plusieurs fois à la ressource.
- Une valeur de tag valide (voir la [documentation sur la définition de tags][3]) indique la valeur réelle du tag concerné.

#### Analyse approfondie des données

Lorsque vous utilisez plusieurs tags, les rapports Hourly Usage Attribution et Monthly Usage Attribution contiennent des données pour toutes les combinaisons possibles de ces tags. Ils constituent ainsi d'excellents ensembles de données de base pour vos tâches d'analyse plus approfondie. Par exemple, vous pouvez utiliser des opérations de regroupement ou de pivotement pour générer des vues afin d'étudier plus précisément un certain sous-ensemble de tags, ou encore d'effectuer des agrégations temporelles personnalisées.

## Surveillance de l'utilisation

Une série chronologique des données d'attribution de l'utilisation peut être affichée en cliquant sur « Track Usage ».
- Les données pour des produits spécifiques, une organisation ou des clés de tags peuvent être sélectionnées à l'aide du sélecteur de facettes.
- Les données peuvent être représentées graphiquement sur une journée, une semaine ou un mois à l'aide du sélecteur de période situé au-dessus des graphiques.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Hourly-Facets.png" alt="Graphiques des hosts d'infra séparés par tags" style="width:100%;" >}}


## Attribution des coûts

Pour les clients en facturation directe, des rapports d'attribution des coûts de fin de mois sont générés à la fin de chaque cycle de facturation afin de permettre les processus mensuels de refacturation et de répartition des coûts.
- Les données de coûts du mois précédent sont disponibles au plus tard le 19 du mois en cours.
- Pour les clients GovCloud, une clause de non-responsabilité doit être approuvée avant l'activation de la fonctionnalité.
- Les données d'attribution des coûts mensuels sont [disponibles avec l'API][4]

{{< img src="account_management/billing/usage_attribution/Cost-Attribution-Monthly.png" alt="Rapport d'attribution des coûts" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/api/v1/usage-metering/#get-monthly-usage-attribution
[2]: https://docs.datadoghq.com/fr/api/v1/usage-metering/#get-hourly-usage-attribution
[3]: https://docs.datadoghq.com/fr/getting_started/tagging/#define-tags
[4]: https://docs.datadoghq.com/fr/api/latest/usage-metering/#get-monthly-cost-attribution
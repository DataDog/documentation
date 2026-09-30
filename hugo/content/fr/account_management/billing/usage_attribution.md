---
algolia:
  tags:
  - usage attribution
  - cost attribution
aliases:
- /fr/account_management/billing/advanced_usage_reporting/
- /fr/account_management/billing/custom_usage_reporting/
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentation
  text: Paramètres de formule et d'utilisation
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#identifying-areas-for-cost-optimization
  tag: Blog
  text: 'Optimisation de Datadog à grande échelle : une observabilité économique chez
    Zendesk'
title: Usage Attribution
---
## Présentation {#overview}

Les administrateurs ou les utilisateurs disposant de l'autorisation Usage Read peuvent accéder à l'onglet Usage Attribution depuis la section Plan & Usage dans Datadog. La page Usage Attribution fournit les informations et fonctionnalités suivantes :

- Répertorie les clés de tag existantes selon lesquelles l'utilisation est ventilée et offre la possibilité d'en modifier et d'en ajouter de nouvelles (jusqu'à trois clés de tag).
- Résume l'utilisation à la fin de chaque mois et visualise l'utilisation au fil du temps ventilée par tags.
- Génère des fichiers CSV cumulés depuis le début du mois et horaires.

Cette fonctionnalité ne prend pas en charge l'utilisation de produits qui ne peuvent pas être tagués lors de l'instrumentation. Par exemple, Incident Management Users, Parallel Testing Slots et Audit Trail.

**Remarque** : pour ventiler la facturation de CI Pipeline et de Test Optimization par équipe ou par d'autres tags organisationnels, consultez [Billing enrichment][5] dans la documentation de facturation de CI Visibility.

## Mise en route {#getting-started}

Pour commencer à recevoir des données quotidiennes, un administrateur doit choisir des tags pour le rapport.

{{< img src="account_management/billing/usage_attribution/advanced-usage-reporting.png" alt="Prise en main de l'attribution de l'utilisation dans Datadog" style="width:100%;" >}}

La fenêtre contextuelle {{< ui >}}Edit Tags{{< /ui >}} permet :

- De saisir jusqu'à trois clés de tag à partir d'une liste déroulante. La liste déroulante est pré-remplie avec les tags existants sur le compte racine et sur toutes les organisations enfants sous le compte.
- De supprimer et de modifier les tags existants.

{{< img src="account_management/billing/usage_attribution/Edit-Tags-Popover.png" alt="Modifier les tags dans l'attribution de l'utilisation" style="width:80%;" >}}

- Une fois les tags configurés, il faut 24 heures pour que le premier rapport soit généré.
- Les rapports sont générés de manière continue.
- Si les tags sont modifiés, le nouveau rapport reflète les nouveaux tags. Cependant, les rapports précédents conservent les anciens tags.
- Les rapports mensuels reflètent le dernier ensemble de tags. Si les tags sont modifiés au milieu d'un mois, des rapports mensuels partiels sont créés pour chaque période de reporting.

## Utilisation totale {#total-usage}

### Attribution de l'utilisation mensuelle {#monthly-usage-attribution}

Les rapports mensuels sont mis à jour quotidiennement et fournissent une agrégation des données d'utilisation depuis le début du mois.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Tags appliqués dans Datadog" style="width:100%;" >}}

- Les données pour des produits, tags et organisations spécifiques peuvent être sélectionnées à l'aide du sélecteur de facettes.
- Les données peuvent être regroupées et dissociées par les clés de tag sélectionnées.
- Les options Valeur et Pourcentage sont disponibles pour l'affichage du tableau. 
- Les données affichées dans le tableau peuvent être modifiées pour inclure certains produits. 
- Si le mode multi-organisation est activé, l'utilisation est résumée pour l'ensemble des organisations Datadog au niveau du compte parent.
- Les rapports des mois précédents sont accessibles via le sélecteur de période.
- Les rapports sont téléchargeables au format CSV. Ces rapports CSV incluent à la fois les chiffres d'utilisation et les pourcentages, ce qui permet de simplifier les allocations et la refacturation. Les pourcentages sont calculés sur une base par organisation.

Les données mensuelles peuvent également être extraites via l'API. Pour plus d'informations, consultez la [documentation du endpoint de l'API][1].

### Attribution de l'utilisation horaire {#hourly-usage-attribution}

Les données horaires peuvent être extraites via l'API. Pour plus d'informations, consultez la [documentation du endpoint de l'API][2].

### Interprétation des données {#interpreting-the-data}

Le tableau ci-dessous présente un exemple de rapport quotidien sur l'utilisation de l'infrastructure par deux tags : `app` et `service`.

| public_id | heure                | app          | service                  | utilisation_totale |
| --------- | ------------------- | ------------- | ------------------------| --------------------- |
| publicid1 | 2022-03-31 00:00:00 | &lt;vide&gt; | service1 &#124; service2  | 50                  |
| publicid1 | 2022-03-31 09:00:00 | app1         |                          | 28                    |
| publicid1 | 2022-03-31 18:00:00 | app2         | service3                 | 1023                  |

- Une valeur `<empty>` signifie que la ressource a été marquée avec le tag respectif mais ne possédait pas de valeur.
- Aucune valeur signifie que la ressource n'a pas été marquée avec ce tag particulier.
- `|` Les valeurs séparées par (pipe) (par exemple, `service1 | service2`) signifient qu'un tag particulier a été appliqué plusieurs fois sur la ressource.
- Une valeur de tag valide (voir la [documentation sur la définition des tags][3]) fait référence à la valeur réelle du tag respectif.

#### Analyse de données approfondie {#further-data-analysis}

Lors de l'utilisation de plusieurs tags, les rapports d'attribution d'utilisation horaire et mensuelle contiennent des données pour toutes les combinaisons possibles de ces tags, et conviennent comme jeux de données de base pour des tâches d'analyse de données approfondie. Par exemple, vous pouvez utiliser le regroupement ou le tableau croisé dynamique pour produire des vues axées sur un sous-ensemble des tags, ou pour effectuer des agrégations sur des plages de dates personnalisées.

## Suivi de l'utilisation {#tracking-usage}

Une série temporelle de données d'attribution d'utilisation peut être consultée en cliquant sur « Suivre l'utilisation »
- Les données relatives à des produits, une organisation ou des clés de tag spécifiques peuvent être sélectionnées à l'aide du sélecteur de facettes.
- Les données peuvent être représentées graphiquement pour un jour, une semaine ou un mois en utilisant le sélecteur de temps au-dessus des graphiques.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Hourly-Facets.png" alt="Graphiques des hosts d'infrastructure séparés par tags" style="width:100%;" >}}


## Attribution des coûts {#cost-attribution}

Pour les clients facturés directement, des rapports d'attribution des coûts de fin de mois sont générés à la fin de chaque cycle de facturation pour permettre les processus de refacturation et d'allocation des coûts mensuels. 
- Les données de coûts pour le mois précédent sont disponibles au plus tard le 19 du mois en cours.
- Pour les clients GovCloud, une clause de non-responsabilité doit être approuvée avant l'activation de la fonctionnalité.
- Les données de Cost Attribution mensuelles sont [disponibles avec l'API][4]

{{< img src="account_management/billing/usage_attribution/Cost-Attribution-Monthly.png" alt="Rapport de Cost Attribution" style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/api/v1/usage-metering/#get-monthly-usage-attribution
[2]: https://docs.datadoghq.com/fr/api/v1/usage-metering/#get-hourly-usage-attribution
[3]: https://docs.datadoghq.com/fr/getting_started/tagging/#define-tags
[4]: https://docs.datadoghq.com/fr/api/latest/usage-metering/#get-monthly-cost-attribution
[5]: /fr/account_management/billing/ci_visibility/#billing-enrichment
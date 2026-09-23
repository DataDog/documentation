---
aliases:
- /fr/product_analytics/experimentation/defining_metrics/
description: Créez les métriques que vous souhaitez mesurer dans vos expériences.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Prenez des décisions de conception basées sur les données avec Product Analytics
- link: https://www.datadoghq.com/blog/how-we-built-datadog-experiments/
  tag: Blog
  text: Comment nous avons conçu Datadog Experiments
title: Créez des métriques d'expérimentation
---
## Présentation {#overview}

Créez les métriques que vous souhaitez mesurer dans vos expériences. Vous pouvez utiliser des données issues de Real User Monitoring (RUM), de Product Analytics ou de votre propre entrepôt pour créer des métriques Datadog Experiments.

<div class="alert alert-info">Si votre organisation utilise des rôles personnalisés, vous devez disposer des <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#product-analytics">autorisations Product Analytics appropriées</a> pour créer des métriques d'expérimentation.</div>

## Créer une métrique {#create-a-metric}

Sélectionnez votre source de données :

{{< tabs >}}
{{% tab "Product Analytics ou RUM" %}}

### Prérequis {#prerequisites}

Pour créer une métrique à partir de données Product Analytics ou RUM, vous devez avoir installé le [SDK côté client][3] de Datadog dans votre application et capturer activement des données. Si vous n'avez pas encore configuré votre SDK, sélectionnez votre type d'application pour commencer :

- [Android et Android TV][4]
- [iOS et tvOS][5]
- [Navigateur (JavaScript)][6]
- [React Native][7]

Product Analytics utilise les mêmes SDK et la même configuration que Real User Monitoring (RUM). Une fois votre SDK configuré à l'aide de la documentation de configuration RUM, créez votre métrique dans l'interface utilisateur de Product Analytics.

### Créer une métrique à l'aide de données Product Analytics ou RUM {#create-a-metric-using-product-analytics-or-rum-data}

Pour créer une métrique pour votre expérimentation :

1. Accédez à la [page Métriques][1] dans Datadog Product Analytics.
1. Sélectionnez l'onglet {{< ui >}}Metrics{{< /ui >}} et cliquez sur {{< ui >}}Create Metric{{< /ui >}} dans le coin supérieur droit.
1. Ajoutez un {{< ui >}}Metric name{{< /ui >}} et, éventuellement, un {{< ui >}}Description{{< /ui >}}.
1. Sous la section {{< ui >}}Metric definition{{< /ui >}}, cliquez sur {{< ui >}}Select an event{{< /ui >}} pour ouvrir le sélecteur d'événements. Le graphique sur la droite se met à jour en temps réel à mesure que vous configurez votre métrique.
   1. Recherchez un événement spécifique ou utilisez le filtre {{< ui >}}By Type{{< /ui >}} pour parcourir par type d'événement.
1. Sélectionnez une [méthode d'agrégation](#aggregation-methods) dans la liste déroulante. La valeur par défaut est {{< ui >}}Count of events{{< /ui >}}.
1. Cliquez sur {{< ui >}}Add Filter{{< /ui >}} pour [filtrer votre métrique](#add-filters) par propriétés supplémentaires.
1. (Facultatif) Sous la section {{< ui >}}Additional settings{{< /ui >}} :
   1. Activez {{< ui >}}Mark as certified{{< /ui >}} pour indiquer que cette métrique est approuvée pour la prise de décisions importantes. Cela nécessite l'autorisation Product Analytics Certified Metrics Write.
   1. Ajustez [{{< ui >}}Experiment settings{{< /ui >}}](#advanced-options) et {{< ui >}}Units{{< /ui >}} selon vos besoins. Les valeurs par défaut conviennent à la plupart des cas d'utilisation.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="/product_analytics/experiment/exp_create_new_metric.png" alt="La page Create Metric avec le Metric name défini sur « Example metric », l'événement « click on ADD TO CART » sélectionné, la méthode d'agrégation définie sur Nombre d'événements, la section Paramètres supplémentaires, un aperçu du graphique à barres sur la droite et le bouton Save mis en surbrillance." style="width:90%;" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[3]: /fr/real_user_monitoring/#get-started
[4]: /fr/real_user_monitoring/application_monitoring/android/setup/?tab=kotlin
[5]: /fr/real_user_monitoring/application_monitoring/ios/setup/?tab=swift-package-manager--spm
[6]: /fr/real_user_monitoring/application_monitoring/browser/setup/client/?tab=npm
[7]: /fr/real_user_monitoring/application_monitoring/react_native/setup/?platform=react_native

### Ajouter des filtres {#add-filters}

Vous pouvez filtrer votre métrique en sélectionnant un filtre {{< ui >}}Event properties{{< /ui >}}, tel que Service, Pays ou Type d'appareil. Utilisez le filtre {{< ui >}}By Data Type{{< /ui >}} pour restreindre la liste des propriétés disponibles par type (par exemple, Chaîne ou Booléen).

Si vous ne voyez pas la propriété dont vous avez besoin, saisissez le nom de la propriété dans le champ {{< ui >}}Custom property{{< /ui >}} (par exemple, `@context.tracking`) et cliquez sur {{< ui >}}Add{{< /ui >}}.

{{< img src="/product_analytics/experiment/exp_filter_by_2.png" alt="Le panneau Filtrer par ouvert dans la section Définition de la métrique, affichant Toutes les propriétés sélectionnées, les propriétés d'événement telles que ID d'application, Service, Nom du navigateur et Pays au centre, un filtre Par type de données avec des options Numérique, Chaîne et Booléen sur la gauche, et une section Propriété personnalisée en bas avec un champ de texte affichant l'espace réservé « e.g. @context.tracking » et un bouton Ajouter." style="width:90%;" >}}

{{% /tab %}}
{{% tab "Entrepôt" %}}

### Prérequis {#prerequisites-1}

Pour créer une métrique à partir des données de votre entrepôt, vous devez [connecter votre entrepôt à Datadog][8]. Datadog prend en charge BigQuery, Databricks, Redshift et Snowflake.

Une fois votre entrepôt connecté, créez un modèle SQL pour mapper vos données vers Datadog, puis utilisez le modèle pour créer une métrique.

### Créer un modèle SQL {#create-a-sql-model}

Rédigez votre requête SQL pour définir et prévisualiser vos données, puis configurez votre modèle pour mapper les données vers Datadog.

#### Rédigez votre SQL {#write-your-sql}

Commencez par rédiger une requête pour récupérer vos données:

1. Accédez à la [page Métriques][1] dans Datadog Product Analytics.
1. Sélectionnez l'onglet {{< ui >}}Metric SQL Models{{< /ui >}} et cliquez sur {{< ui >}}Create SQL Model{{< /ui >}}.
1. Dans la section {{< ui >}}Write SQL{{< /ui >}}, saisissez une requête SQL qui renvoie les données qui vous intéressent. L'éditeur SQL prend en charge `SELECT * FROM` et des instructions SQL plus avancées.
1. Cliquez sur {{< ui >}}Run{{< /ui >}} pour prévisualiser vos données.

{{< img src="/product_analytics/experiment/exp_create_metric_sql_models_writesql_1.png" alt="La section Write SQL de la page Create Metric SQL Model montrant une requête SELECT pour user_id, revenue_timestamp et amount à partir d'un tableau de commandes de revenus, avec un aperçu de requête réussi ci-dessous affichant les colonnes USER_ID, REVENUE_TIMESTAMP et AMOUNT." style="width:80%;" >}}

Pour les grands tableaux, utilisez des [variables de modèle SQL][13] pour appliquer les filtres de date de Datadog à votre requête et réduire la quantité de données que votre entrepôt analyse à chaque exécution.

#### Mappez vos données d'entrepôt à Datadog {#map-your-warehouse-data-to-datadog}

Après avoir prévisualisé vos données, mappez-les à Datadog. Dans la section {{< ui >}}Structure your model{{< /ui >}} :

1. Ajoutez un {{< ui >}}Metric SQL Model Name{{< /ui >}} (par exemple, **Revenue Orders**).
1. (Facultatif) Activez {{< ui >}}Mark as certified{{< /ui >}} pour indiquer que ce modèle SQL est approuvé pour une prise de décision importante. Cela nécessite l'autorisation Product Analytics Certified Metrics Write.
1. Mappez les colonnes de votre tableau d'entrepôt vers les éléments suivants :
   - {{< ui >}}Timestamp column{{< /ui >}}
     - La colonne qui répertorie l'horodatage associé à l'événement de métrique.
     - L'analyse inclut uniquement les lignes créées après l'inscription du sujet à l'expérimentation.
   - {{< ui >}}Subject Type{{< /ui >}}
     - L'attribut que Datadog utilise pour attribuer aléatoirement des groupes d'expérimentation.
     - Vous pouvez définir le type de sujet et sa colonne d'entrepôt par défaut sur la page [Types de sujets][12]. Par exemple, vous pouvez utiliser `user_id` pour un utilisateur individuel ou `org_id` pour un compte d'organisation.
   - {{< ui >}}Measures{{< /ui >}} (facultatif)
     - Les colonnes numériques de votre tableau d'entrepôt que Datadog peut agréger en métriques (par exemple, une colonne `revenue` ou `amount`).
     - Chaque modèle SQL inclut automatiquement une mesure {{< ui >}}each record{{< /ui >}}. Utilisez cette mesure pour compter le nombre de lignes pertinentes dans le tableau pour un sujet d'expérimentation spécifique.
1. Cliquez sur {{< ui >}}Create Metric SQL Model{{< /ui >}} pour enregistrer votre modèle SQL.

{{< img src="/product_analytics/experiment/exp_create_metrics_sql_model_structure4.png" alt="Le panneau Structurez votre modèle avec le champ Nom du modèle SQL de métrique défini sur « Revenue Orders » et mis en surbrillance, un bouton bascule Marquer comme certifié, la colonne Horodatage définie sur REVENUE_TIMESTAMP, le Type de sujet défini sur Utilisateur (@usr.id) avec USER_ID sélectionné dans le sélecteur de colonne, un menu déroulant Mesures affichant « Revenue Orders (chaque enregistrement) » et le bouton Créer un modèle SQL de métrique mis en surbrillance." style="width:80%;" >}}

### Créez une métrique à l'aide de votre modèle SQL {#create-a-metric-using-your-sql-model}

Une fois votre modèle SQL créé, utilisez-le pour créer une métrique :

1. Accédez à la [page Métriques][1] dans Datadog Product Analytics.
1. Sélectionnez l'onglet {{< ui >}}Metrics{{< /ui >}} et cliquez sur {{< ui >}}Create Metric{{< /ui >}} dans le coin supérieur droit.
1. Ajoutez un {{< ui >}}Metric name{{< /ui >}} et, éventuellement, un {{< ui >}}Description{{< /ui >}}.
1. Sous la section {{< ui >}}Metric definition{{< /ui >}}, cliquez sur {{< ui >}}Select an event{{< /ui >}} pour ouvrir le sélecteur d'événements. Le graphique sur la droite se met à jour en temps réel à mesure que vous configurez votre métrique.
   1. Sélectionnez le modèle SQL pertinent. Vos modèles SQL apparaissent sous leur source de données (par exemple, **Revenue Orders** sous **Snowflake**).
1. Sélectionnez une [méthode d'agrégation](#aggregation-methods) dans la liste déroulante.
1. (Facultatif) Sous la section {{< ui >}}Additional settings{{< /ui >}} :
   1. Activez {{< ui >}}Mark as certified{{< /ui >}} pour indiquer que cette métrique est approuvée pour une prise de décision importante. Cela nécessite l'autorisation Product Analytics Certified Metrics Write.
   1. Ajustez [{{< ui >}}Experiment settings{{< /ui >}}](#advanced-options) et {{< ui >}}Units{{< /ui >}} selon vos besoins. Les valeurs par défaut conviennent à la plupart des cas d'utilisation.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{< img src="/product_analytics/experiment/exp_create_metric_from_sqlmodel_2.png" alt="Le sélecteur d'événements Créer une métrique affichant Tous les événements sélectionnés, avec des types d'événements incluant Snowflake, Actions, Vues, Sessions, Erreurs et Tâches longues sur la gauche, et le modèle SQL Revenue Orders mis en surbrillance sous Snowflake sur la droite, affichant Mesures : montant et Dimensions filtrables : N/A." style="width:80%;" >}}

[1]: https://app.datadoghq.com/product-analytics/experimentation-metrics
[8]: /fr/experiments/guide/connecting_a_data_warehouse/
[12]: https://app.datadoghq.com/product-analytics/experiments/settings/subject-types
[13]: /fr/experiments/concepts/sql_template_variables/

{{% /tab %}}
{{< /tabs >}}

## Méthodes d'agrégation {#aggregation-methods}

Les méthodes d'agrégation déterminent la manière dont Datadog résume les données pour chaque sujet d'expérience. Un sujet d'expérience est l'unité que Datadog randomise pour l'expérience. Il s'agit généralement d'un utilisateur, mais cela peut aussi être une organisation, un cookie ou un appareil, selon la façon dont vous configurez votre expérience.

Datadog Experiments prend en charge les méthodes d'agrégation suivantes :

- {{< ui >}}Count of events{{< /ui >}} (par défaut)
- {{< ui >}}Count of unique users{{< /ui >}} (utile pour les métriques de conversion)
- {{< ui >}}Sum of{{< /ui >}} une propriété d'événement (utile pour les métriques de revenus)
- {{< ui >}}Distinct values of{{< /ui >}} une propriété d'événement (utile pour les métriques de pages uniques vues)
- {{< ui >}}Percentile{{< /ui >}} d'une propriété d'événement (utile pour les métriques de latence)
- {{< ui >}}Average of{{< /ui >}} une propriété d'événement (utile pour les métriques de satisfaction)

{{< img src="/product_analytics/experiment/exp_default_metric_agg_1.png" alt="La liste déroulante des méthodes d'agrégation affiche « Count of unique users » (selected) et « Count of events » en haut, suivie d'une section « SELECT A MEASURE » proposant les options « Sum of », « Distinct values of », « Percentile » et « Average of », avec une description indiquant « The number of users who performed the event » sur la droite." style="width:90%;" >}}

Datadog calcule des métriques pour chaque sujet d'expérience. Par exemple, une métrique {{< ui >}}Count of events{{< /ui >}} sur une expérience randomisée par utilisateur calcule le nombre total d'événements pour tous les utilisateurs de la variante (groupe d'expérience) divisé par le nombre d'utilisateurs dans cette variante.

### Métriques de ratio {#ratio-metrics}

Cliquez sur {{< ui >}}Create Ratio{{< /ui >}} pour diviser votre métrique par une valeur autre que le nombre par défaut de sujets de l'expérience. Le dénominateur peut utiliser l'une des [méthodes d'agrégation](#aggregation-methods). Par exemple, divisez les achats par les pages vues des produits pour mesurer la conversion à une étape spécifique de l'entonnoir, plutôt que sur tous les utilisateurs inscrits.

Datadog prend en compte les corrélations entre le numérateur et le dénominateur en utilisant la [méthode delta][2].

{{< img src="/product_analytics/experiment/exp_create_ratio_new_ui.png" alt="La section de définition de la métrique montrant l'événement « click on ADD TO CART » avec l'agrégation Count of events et une option Add Filter, le bouton Create Ratio mis en surbrillance ci-dessous, ainsi que la section Additional settings avec le bouton bascule Mark as certified, Experiment settings et Units." style="width:90%;" >}}

## Options avancées {#advanced-options}

Datadog Experiments prend en charge les options avancées suivantes. Celles-ci peuvent être modifiées sous {{< ui >}}Additional settings{{< /ui >}} > {{< ui >}}Experiment settings{{< /ui >}} lors de la création d'une métrique.

Filtres de période
: Par défaut, Datadog inclut tous les événements entre la première exposition d'un utilisateur et la fin de l'expérience. Utilisez ce paramètre pour mesurer une valeur limitée dans le temps, telle que « sessions within 7 days ». Si vous ajoutez un filtre de période, la métrique inclut uniquement les événements de la fenêtre temporelle spécifiée, à partir du moment où l'utilisateur est inscrit pour la première fois à l'expérience.

Direction souhaitée de la métrique
: Datadog met en évidence les résultats statistiquement significatifs. Utilisez ce paramètre pour spécifier si vous souhaitez que cette métrique augmente ou diminue.

Gestion des singularités
: Les données réelles incluent souvent des singularités extrêmes qui peuvent avoir un impact sur les résultats de l'expérience. Utilisez ce paramètre pour définir un seuil auquel Datadog tronque les données. Par exemple, définissez une limite supérieure de 99 % pour tronquer tous les résultats au 99e percentile de la métrique.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[2]: https://en.wikipedia.org/wiki/Delta_method
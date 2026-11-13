---
description: Renommez, fusionnez ou divisez des environnements pour les spans APM
  avec des règles de remappage d'environnement, sans modifier la configuration du
  traceur ni redéployer de code.
further_reading:
- link: /tracing/services/service_remapping_rules/
  tag: Documentation
  text: Règles de remappage de service
title: Règles de remappage d'environnement
---
{{< callout url="https://www.datadoghq.com/product-preview/env-remapping/" header="Rejoignez la Preview !" >}}
Le remappage d'environnement est en version Preview. Pour demander l'accès, remplissez ce formulaire.
{{< /callout >}}

## Présentation {#overview}

Les règles de remappage d'environnement vous permettent de renommer, fusionner ou diviser des environnements depuis Datadog. Les règles mettent à jour les valeurs `env` des spans APM sans modifier la configuration du traceur ni redéployer de code.

## Prérequis {#prerequisites}

La création, la modification ou la suppression de règles de remappage d'environnement nécessite l'autorisation **APM Service Remapping Write** (`apm_service_renaming_write`). Consultez les [autorisations de rôle Datadog][1].

## Créer une règle de remappage d'environnement {#create-an-env-remapping-rule}

1. Dans Datadog, accédez à {{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > {{< ui >}}Service Tags Remapping{{< /ui >}}.
1. Cliquez sur {{< ui >}}Add Env Rule{{< /ui >}}.
1. Utilisez la barre de recherche pour sélectionner un ou plusieurs environnements à remapper.
1. Saisissez un nom d'environnement unique dans la zone de texte. Un aperçu des noms d'environnement s'affiche à mesure que vous tapez.

    Pour nommer des environnements en fonction de leurs tags, utilisez la syntaxe `{{tagName}}`. Si les valeurs de tag suivent un modèle, appliquez une expression régulière pour extraire la partie souhaitée dans le nom.

    **Note**: When a tag has several values, the preview shows only those with the most spans.

1. Optionnellement, saisissez un nom descriptif pour la règle de remappage afin de pouvoir l'identifier ultérieurement.
1. Vérifiez et enregistrez votre règle de remappage.

Une fois la règle enregistrée, il peut s'écouler environ une minute avant qu'elle ne prenne effet.

## Comportement des règles de remappage d'environnement {#env-remapping-rules-behavior}

Les règles de remappage d'environnement remplacent le tag `env` lors de l'ingestion. La création d'une règle ne modifie aucune configuration préexistante spécifiant un nom d'environnement. Les règles de remappage d'environnement prévalent sur toutes les autres configurations de nom d'environnement.

- **Données impactées** : Le remappage d'environnement s'applique uniquement aux spans APM.
- **Données historiques** : Les règles de remappage d'environnement s'appliquent uniquement aux spans ingérés pendant qu'une règle est active. Les données passées ne sont pas mises à jour rétroactivement. La suppression ou la modification d'une règle empêche son application aux nouvelles spans, mais ne met pas à jour les données précédemment ingérées.
- **Ordre de traitement des règles** : Les règles de remappage d'environnement s'appliquent dans l'ordre dans lequel elles ont été créées. Les règles situées en haut de la liste de remappage d'environnement prévalent sur les règles situées en dessous. Vous pouvez modifier l'ordre des règles.
- **Expressions régulières** : Utilisez des expressions régulières pour définir de nouveaux noms d'environnement. Les quantificateurs gourmands ne sont pas autorisés à l'intérieur du groupe de capture.
- **Interaction avec les règles de remappage de service** : Les règles de remappage d'environnement s'appliquent après les règles de remappage de service [2]. Si une règle de remappage de service modifie le tag `service`, le remappage d'environnement utilise le nom de service mis à jour lors de l'application d'une règle de remappage d'environnement.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/
[2]: /fr/tracing/services/service_remapping_rules/
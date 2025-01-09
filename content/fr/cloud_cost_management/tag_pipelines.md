---
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
title: Pipelines de tags
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Cloud Cost Management n'est pas prise en charge par ce site.</div>
{{< /site-region >}}

## Présentation

Pour surveiller efficacement vos coûts liés au cloud, vous devez comprendre parfaitement l'impact de chaque service, équipe et solution sur vos dépenses globales. Grâce aux pipelines de tags, vous êtes certain que vos ressources cloud utilisent des tags standard, ce qui vous permet de tenir compte de l'ensemble des données relatives aux coûts de vos ressources.

Créez des règles de tag pour vos [pipelines de tags][1] afin de résoudre les problèmes liés aux tags manquants ou incorrects ayant une incidence sur le coût de vos ressources Cloud. Ces règles vous permettent également de déduire de nouveaux tags respectant votre logique opérationnelle.

## Types de règles

<div class="alert alert-warning"> Vous pouvez créer jusqu'à 100 règles. Les tables de référence basées sur une API ne sont pas prises en charge. </div>

Trois types de règles sont prises en charge : **Add Tag**, **Alias Tag Keys** et **Map Multiple Tags**. Vous pouvez organiser vos règles au sein d'ensembles de règles, ceux-ci faisant office de dossiers pour vos règles. Les règles sont exécutées dans un ordre déterministe (de haut en bas). Vous pouvez organiser les règles et ensembles de règles de manière à ce que leur ordre d'exécution corresponde à votre logique opérationnelle.

### Règle Add Tag

Ajoutez un nouveau tag (key et value) basé sur la présence de tags existants liés aux données sur vos coûts cloud.

Vous pouvez par exemple créer une règle qui applique à toutes les ressources un tag, dont la valeur correspond à l'unité commerciale liée aux services dont ces ressources font partie.

{{< img src="cloud_cost/tags_addnew.png" alt="Ajout d'un nouveau tag d'unité commerciale aux ressources avec service:processing, service:creditcard ou service:payment-notification." >}}

### Règle Alias Tag Keys

  Mappez des valeurs de tags existants à un tag plus standard.

Par exemple, si votre organisation souhaite utiliser la clé de tag standard `application`, mais que plusieurs équipes utilisent une variante de ce tag (`app`, `webapp`, ou `apps`, par exemple), vous pouvez créer un alias pour `apps` vers `application`. Chaque règle d'alias de tag vous permet de créer un alias vers un nouveau tag pour un maximum de 25 clés de tag.

La règle cesse de s'exécuter pour chaque ressource dès qu'une première correspondance est trouvée. Par exemple, si une ressource possède déjà un tag `app`, la règle ne tente plus d'identifier un tag `webapp` ou `apps`.
{{< img src="cloud_cost/tags_alias.png" alt="Ajout du tag application aux ressources possédant le tag app, webapp ou apps." >}}

### Règle Map Multiple Tags

Utilisez des [tables de référence][2] pour ajouter plusieurs tags aux données relatives aux coûts sans avoir à créer plusieurs règles. Les valeurs de la colonne des clés primaires de votre table de référence sont alors mappées à celles des tags de coût. Si ces valeurs existent, les pipelines appliquent aux données relatives aux coûts un tag dont la valeur correspond aux données des colonnes de la table de référence.

Par exemple, si vous souhaitez indiquer les responsables, organisations et unités commerciales liés à différents comptes AWS et Azure, vous pouvez créer une table et mapper les tags. Tout comme la règle Alias Tag Keys, cette règle cesse de s'exécuter pour chaque ressource dès qu'une première correspondance est trouvée. Par exemple, si un `aws_member_account_id` est trouvé, la règle ne tente pas de trouver un `subscriptionid`.
{{< img src="cloud_cost/tags_mapmultiple.png" alt="Ajout des métadonnées de compte (responsable, organisation et unité commerciale) à l'aide de tables de référence pour les pipelines de tags" >}}

## Tags réservés
Vous ne pouvez pas ajouter les tags `service`, `env`, `version` et `host` aux pipelines de tags, car ils sont déjà utilisés dans le cadre du [tagging de service unifié][3].

Pour mettre en corrélation des métriques, des traces et des logs, appliquez ces tags à votre infrastructure sous-jacente et tirez parti du tagging de service unifié dans l'ensemble de la plateforme Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/tag-pipelines
[2]: https://docs.datadoghq.com/fr/integrations/guide/reference-tables/?tab=manualupload
[3]: https://docs.datadoghq.com/fr/getting_started/tagging/unified_service_tagging/
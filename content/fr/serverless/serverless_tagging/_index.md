---
title: Tagging de fonctions sans serveur
kind: documentation
further_reading:
  - link: '/getting_started/tagging/unified_service_tagging/#fonctions-lambda-aws'
    tag: Documentation
    text: Tagging de service unifié
---
{{< img src="serverless/serverless_tagging.mp4" video="true" alt="Tagging unifié sans serveur" >}}

## Présentation

Tout tag appliqué à votre fonction Lambda AWS devient automatiquement une nouvelle dimension que vous pouvez utiliser pour filtrer vos métriques, traces et logs.

Les tags sont particulièrement utiles lorsqu'ils sont cohérents sur toute la plateforme Datadog. Les tags `env`, `service` et `version` bénéficient notamment d'une prise en charge étendue.

Avec ces tags, vous pouvez :

- explorer facilement vos métriques, traces et logs à l'aide de tags cohérents ;
- filtrer vos fonctions sur la page d'accueil sans serveur.
- consulter les données de service en fonction de l'environnement ou de la version de manière unifiée dans l'application Datadog.
- organiser votre Service Map par service et environnement.

Pour ajouter à votre application sans serveur les tags `env`, `service` et `version`, consultez la [documentation relative au tagging de service unifié][1].

### Tag « env »

Utilisez le tag `env` pour faire la distinction entre vos environnements de staging, de développement et de production. Ce tag peut être utilisé pour tout type d'infrastructure, et non pas uniquement pour vos fonctions sans serveur. Par exemple, vous pouvez ajouter le tag `env:prod-eu` à vos fonctions Lambda de production pour la région Europe.

Par défaut, les fonctions AWS Lambda reçoivent le tag `env:none` dans Datadog. Ajoutez votre propre tag pour le remplacer.

### Tag « service »

Ajoutez le tag `service` afin de regrouper les fonctions Lambda connexes au sein d'un service.

Le comportement par défaut pour les nouveaux clients de Datadog consiste à regrouper toutes les fonctions Lambda sous le service `aws.lambda` et à les représenter comme un seul nœud sur la Service Map. Taguez vos fonctions par service pour modifier ce comportement.

**Remarque :** pour certains clients de Datadog, chaque fonction Lambda est considérée comme un service distinct. Ajoutez votre propre tag pour modifier ce comportement ou contactez l'assistance Datadog si vous souhaitez que votre compte adopte le nouveau comportement.

### Tag « version »

Ajoutez le tag `version` pour activer la [surveillance des déploiements][2].

## Organiser votre Service Map

La [Service Map][3] regroupe les services au sein de cartes en fonction de leur tag `env`. Elle tire profit du tag `service` pour présenter les relations entre les services et la santé de leurs monitors. Chaque service correspond à un nœud spécifique de la Service Map. La couleur des nœuds représente la santé des monitors associés. Ajoutez aux monitors le tag `service` que vous souhaitez appliquer.

{{< img src="serverless/serverless_service_map.png" alt="Service Map" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[2]: /fr/tracing/deployment_tracking/
[3]: /fr/tracing/visualization/services_map/
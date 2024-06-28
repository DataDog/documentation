---
description: Étapes de dépannage pour l'intégration Datadog/AWS
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Intégration
  text: Intégration AWS

title: Dépannage de l'intégration AWS
---

## Présentation

Référez-vous à ce guide pour diagnostiquer les problèmes liés à l'[intégration Datadog/AWS][1].

## Erreurs d'autorisation IAM

### Erreur « Datadog is not authorized to perform sts:AssumeRole »

L'erreur d'autorisation `sts:Assumerole` signale un problème concernant la stratégie de confiance liée à `DatadogAWSIntegrationRole`. Consultez la section [Erreur : Datadog is not authorized to perform sts.AssumeRole][2] pour découvrir comment résoudre ce problème.

**Remarque** : une fois corrigée, l'erreur peut continuer à s'afficher dans l'interface Datadog pendant quelques heures, le temps que les modifications se propagent.

## Écarts entre les données

### Écart entre vos données dans CloudWatch et Datadog

Il est important de tenir compte des deux distinctions suivantes :

1. Datadog affiche les données brutes d'AWS sous la forme de valeurs par seconde, peu importe l'intervalle sélectionné dans AWS. Ainsi, il est possible que la valeur de Datadog semble plus faible.

2. Les valeurs `min`, `max` et `avg` n'ont généralement pas la même signification dans AWS et dans Datadog. Dans AWS, les latences moyenne, minimale et maximale correspondent à trois métriques distinctes recueillies. Lorsque Datadog récupère des métriques à partir d'AWS CloudWatch, la latence moyenne est transmise sous la forme de séries temporelles distinctes pour chaque Elastic Load Balancer (ELB). Dans Datadog, lorsque vous sélectionnez les valeurs `min`, `max` ou `avg`, vous définissez les critères de rassemblement de séries temporelles. Par exemple, si vous cherchez à obtenir `system.cpu.idle` sans appliquer de filtre, une série est envoyée pour chaque host qui transmet cette métrique. Ces séries doivent être combinées pour être représentées graphiquement. À l'inverse, si vous cherchez à obtenir `system.cpu.idle` pour un seul host, aucune agrégation n'est nécessaire. Les valeurs maximale et moyenne sont identiques.

## Métriques

### Métriques en retard

Lorsque vous utilisez l'intégration AWS, Datadog récupère vos métriques par l'intermédiaire de l'API CloudWatch. Il est possible que les données des métriques AWS accusent un léger retard, en raison des contraintes liées à l'API.

L'API CloudWatch propose uniquement une analyse métrique par métrique afin d'extraire des données. Les API CloudWatch prévoient une limite de débit qui varie selon les informations d'authentification, la région et le service. Les métriques sont transmises par AWS en fonction du niveau du compte. Par exemple, si vous payez pour des « métriques détaillées » dans AWS, vous y avez accès plus rapidement. Ce niveau de service pour les métriques détaillées s'applique également à la granularité. Ainsi, certaines métriques sont transmises toutes les minutes, tandis que d'autres sont envoyées toutes les cinq minutes.

Pour éviter tout retard des métriques, installez l'Agent Datadog sur le host. Consultez la [documentation relative à l'Agent Datadog][3] pour découvrir comment procéder. Datadog peut récupérer en priorité certaines métriques d'un compte, selon les circonstances. Contactez l'[assistance Datadog][4] pour en savoir plus.

### Métriques manquantes

L'API CloudWatch renvoie uniquement les métriques avec des points de données. Ainsi, si un ELB ne possède aucune instance liée, aucune métrique associée à cet ELB n'apparaît dans Datadog.

### Nombre aws.elb.healthy_host_count incorrect

Lorsque l'option d'équilibrage des charges entre zones est activée sur un ELB, toutes les instances liées à cet ELB font partie de toutes les zones de disponibilité (pour CloudWatch). Par exemple, si vous possédez deux instances dans `1a` et trois dans `ab`, la métrique affiche cinq instances par zone de disponibilité. Puisque cela peut s'avérer contre-intuitif, les métriques **aws.elb.healthy_host_count_deduped** et **aws.elb.un_healthy_host_count_deduped** affichent le nombre d'instances saines et non saines par zone de disponibilité, que vous ayez activé ou non l'option d'équilibrage des charges entre zones.

## Application Datadog

### Hosts dupliqués lors de l'installation de l'Agent

Lors de l'installation de l'Agent sur un host AWS, il est possible que des hosts soient dupliqués pendant quelques heures sur la page Infrastructure de Datadog si vous avez défini manuellement le hostname dans la configuration de l'Agent. Ces doublons disparaissent après quelques heures et ne sont pas pris en compte pour la facturation.

## Agent Datadog

### Métadonnées EC2 avec IMDS v2

Dans la [configuration de votre Agent][5], si le paramètre `ec2_prefer_imdsv2` est défini sur `true` (valeur par défaut : `false`), l'Agent demande des métadonnées EC2 à l'aide de Service des métadonnées d'instance Version 2 (IMDSv2), qui offre un meilleur niveau de sécurité en ce qui concerne l'accès aux métadonnées. Dans certaines situations, une configuration supplémentaire peut être requise dans AWS. Par exemple, il est parfois nécessaire d'utiliser un Agent conteneurisé sur une instance EC2 standard. Consultez la rubrique [Passer à l'utilisation de Service des métadonnées d'instance Version 2][6] pour en savoir plus.

Dans les environnements conteneurisés, il est possible que l'endpoint de métadonnées EC2 soit verrouillé, en raison de l'attribution de rôles/identifiants IAM aux pods s'exécutant dans le cluster Kubernetes. Ces opérations sont généralement réalisées par les outils `Kube2IAM` et `kiam`. Pour corriger ce problème, modifiez votre configuration `Kube2IAM` ou `kiam` de façon à autoriser l'accès à cet endpoint.

## Tags

### Hosts conservant des tags AWS après la suppression de l'intégration AWS EC2

L'intégration AWS vous permet de recueillir des données depuis CloudWatch. Vous pouvez également installer l'Agent Datadog directement sur chaque instance EC2, afin de récupérer les données et les tags. Si vous utilisez ces deux approches pour recueillir des données, le backend de Datadog fusionne les données provenant de l'intégration et de l'Agent Datadog au sein d'un unique objet host.

Si vous avez supprimé l'intégration AWS, mais que vous continuez à exécuter l'Agent Datadog sur vos instances EC2, les hosts de votre compte Datadog possèdent toujours les anciens tags de host qui étaient recueillis depuis AWS. Ce comportement est intentionnel ; cela n'indique pas que l'intégration AWS ou AWS EC2 est toujours activée.

Pour vérifier si l'intégration est activée, consultez la rubrique Apps Running du host en question depuis la liste d'infrastructures. Sinon, consultez la synthèse des métriques et créez un notebook basé sur votre host.

Si vous souhaitez supprimer définitivement les tags de host AWS d'un host, utilisez l'[endpoint Remove host tags][7].

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/integrations/faq/error-datadog-not-authorized-sts-assume-role/#pagetitle
[3]: /fr/agent/
[4]: /fr/help/
[5]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
[7]: /fr/api/latest/tags/#remove-host-tags
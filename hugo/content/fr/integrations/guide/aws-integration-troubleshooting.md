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

Dans certaines situations, la configuration du [IMDSv2][5] d'EC2 empêche à lʼAgent d'accéder aux métadonnées, ce qui le conduit à se rabattre sur le fournisseur de nom d'hôte `os` au lieu de `aws`, comme le montre la sortie de `agent status`.

Dans les environnements conteneurisés, il est possible que l'endpoint de métadonnées EC2 soit verrouillé, en raison de l'attribution de rôles/identifiants IAM aux pods s'exécutant dans le cluster Kubernetes. Ces opérations sont généralement réalisées par les outils `Kube2IAM` et `kiam`. Pour corriger ce problème, modifiez votre configuration `Kube2IAM` ou `kiam` de façon à autoriser l'accès à cet endpoint.

L'API AWS permet de désactiver IMDSv1, que lʼAgent utilise par défaut. Si tel est le cas, mais si IMDSv2 est activé et accessible, définissez le paramètre `ec2_prefer_imdsv2` sur `true` (`false` par défaut) dans la [configuration de votre Agent][6]. Consultez la documentation [Transition to using Instance Metadata service Version 2][7] (en anglais) pour en savoir plus.

IMDSv2, dans sa configuration par défaut, refuse les connexions dont le nombre de sauts IP est supérieur à un, c'est-à-dire les connexions qui sont passées par une adresse IP de passerelle. Cela peut poser des problèmes lorsque lʼAgent est exécuté dans un conteneur avec un réseau autre que celui du host, car le runtime fait passer le trafic du conteneur par une adresse IP de passerelle virtuelle. Cette situation est fréquente dans les déploiements dʼECS. Les options suivantes peuvent remédier à ce problème :

 * [Augmenter le nombre maximal de sauts pour atteindre au moins `2`][8]. Cela peut avoir des conséquences sur la sécurité des données stockées dans l'IMDS, car cela permet à des conteneurs autres que lʼAgent d'accéder également à ces données. 
 * Utiliser le hostname détecté par cloud-init, en [définissant `providers.eks.ec2.useHostnameFromFile` sur true][9].
 * Exécuter lʼAgent dans l'espace de nommage UTS du host, en [attribuant la valeur true à `agents.useHostNetwork`][10].


## Tags

### Hosts conservant des tags AWS après la suppression de l'intégration Amazon EC2

L'intégration AWS vous permet de recueillir des données depuis CloudWatch. Vous pouvez également installer l'Agent Datadog directement sur chaque instance EC2, afin de récupérer les données et les tags. Si vous utilisez ces deux approches pour recueillir des données, le backend de Datadog fusionne les données provenant de l'intégration et de l'Agent Datadog au sein d'un unique objet host.

Si vous avez supprimé l'intégration AWS, mais que vous continuez à exécuter l'Agent Datadog sur vos instances EC2, les hosts de votre compte Datadog possèdent toujours les anciens tags de host qui étaient recueillis depuis AWS. Ce comportement est intentionnel ; cela n'indique pas que l'intégration AWS ou Amazon EC2 est toujours activée.

Pour vérifier si l'intégration est activée, consultez la rubrique Apps Running du host en question depuis la liste d'infrastructures. Sinon, consultez la synthèse des métriques et créez un notebook basé sur votre host.

Si vous souhaitez supprimer définitivement les tags de host AWS d'un host, utilisez l'[endpoint de l'API Remove host tags][11].

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[3]: /fr/agent/
[4]: /fr/help/
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html#instance-metadata-transition-to-version-2
[8]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-instance-metadata-options.html
[9]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L1683-L1688
[10]: https://github.com/DataDog/helm-charts/blob/58bf52e4e342c79dbec95659458f7de8c5de7e6c/charts/datadog/values.yaml#L930-L937
[11]: /fr/api/latest/tags/#remove-host-tags
---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - aws
  - containers
  - orchestration
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/amazon_eks/README.md'
display_name: Amazon EKS
git_integration_title: amazon_eks
guid: 9bc1f66e-de05-4460-b082-783c45a07355
integration_id: amazon-eks
integration_title: Amazon-EKS
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aws.eks.
name: amazon_eks
public_title: "Intégration Datadog/Amazon\_EKS"
short_description: "Amazon\_EKS est un service géré qui facilite l'exécution de Kubernetes sur AWS."
support: core
supported_os:
  - linux
  - mac_os
---
![Dashboard EKS][1]

## Présentation

Elastic Container Service for Kubernetes (EKS) est le service le plus récent d'AWS. Il s'agit d'un service Kubernetes géré qui automatise certains aspects des processus de déploiement et de maintenance de tous les environnements Kubernetes standard. Que vous effectuiez la migration d'une application Kubernetes existante vers EKS ou que vous déployiez un nouveau cluster, Datadog vous aide à surveiller votre environnement EKS en temps réel.

## Implémentation

Datadog s'intègre déjà à Kubernetes et à AWS, ce qui en fait la solution idéale pour surveiller EKS. Si vous exécutez l'Agent dans un cluster Kubernetes et que vous souhaitez migrer vers EKS, vous pouvez continuer à surveiller votre cluster avec Datadog. Notre solution prend également en charge les [groupes de nœuds gérés AWS EKS][2].

### Collecte de métriques

La surveillance EKS nécessite la configuration des intégrations Datadog pour :

- [Kubernetes][3]
- [AWS][4]
- [AWS EC2][5]

Vous devez également configurer les intégrations de tous les autres services AWS exécutés avec EKS (p. ex., [ELB][6]).

### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La configuration est identique à celle de Kubernetes. 
Pour lancer la collecte des logs depuis tous vos conteneurs, utilisez les [variables d'environnement][7] de votre Agent Datadog.

Tirez également profit des DaemonSets pour [déployer automatiquement l'Agent Datadog sur l'ensemble de vos nœuds][8]. 

Suivez les [étapes de collecte de logs de conteneur][9] pour en savoir plus sur ces variables d'environnement et découvrir les options de configuration avancées.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin

- [Surveiller Amazon EKS avec Datadog][11]
- [Métriques clés pour la surveillance d'Amazon EKS][12]
- [Amazon EKS sur AWS Fargate][13]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[3]: https://docs.datadoghq.com/fr/integrations/kubernetes/
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[5]: https://docs.datadoghq.com/fr/integrations/amazon_ec2/
[6]: https://docs.datadoghq.com/fr/integrations/amazon_elb/
[7]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
[8]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#container-installation
[9]: https://docs.datadoghq.com/fr/logs/log_collection/docker/#option-2-container-installation
[10]: https://docs.datadoghq.com/fr/help/
[11]: https://www.datadoghq.com/blog/announcing-eks
[12]: https://www.datadoghq.com/blog/eks-cluster-metrics
[13]: https://docs.datadoghq.com/fr/integrations/amazon_eks_fargate/
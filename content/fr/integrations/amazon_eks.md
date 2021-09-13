---
assets:
  dashboards: {}
  logs: {}
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
draft: false
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
  - windows
---
![Dashboard EKS][1]

## Présentation

Amazon Elastic Kubernetes Service (EKS) est un service Kubernetes géré qui permet d'automatiser certains aspects du déploiement et de la maintenance de n'importe quel environnement Kubernetes standard. Que vous effectuiez la migration d'une application Kubernetes existante vers Amazon EKS ou que vous déployiez un nouveau cluster sur Amazon EKS ou AWS Outposts, Datadog vous aide à surveiller vos environnements EKS en temps réel.

## Configuration

Datadog s'intègre déjà à Kubernetes et à AWS, ce qui en fait la solution idéale pour surveiller EKS. Si vous exécutez l'Agent dans un cluster Kubernetes et que vous souhaitez migrer vers EKS, vous pouvez continuer à surveiller votre cluster avec Datadog. 

De plus, les [groupes de nœuds gérés Amazon EKS][2] et le service [Amazon EKS sur AWS Outposts][3] sont pris en charge.

### Collecte de métriques

La surveillance d'EKS nécessite la configuration des intégrations Datadog pour :

- [Kubernetes][4]
- [AWS][5]
- [AWS EC2][6]

Vous devez également configurer les intégrations de tous les autres services AWS exécutés avec EKS (p. ex., [ELB][7]).

### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La configuration est identique à celle de Kubernetes. 
Pour lancer la collecte des logs depuis tous vos conteneurs, utilisez les [variables d'environnement][8] de votre Agent Datadog.

Tirez également parti des DaemonSets pour [déployer automatiquement l'Agent Datadog sur l'ensemble de vos nœuds][9]. 

Suivez les [étapes de collecte de logs de conteneur][10] pour en savoir plus sur ces variables d'environnement et découvrir les options de configuration avancées.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin

- [Surveiller Amazon EKS avec Datadog][12]
- [Métriques clés pour la surveillance d'Amazon EKS][13]
- [Amazon EKS sur AWS Fargate][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[3]: https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html
[4]: https://docs.datadoghq.com/fr/integrations/kubernetes/
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[6]: https://docs.datadoghq.com/fr/integrations/amazon_ec2/
[7]: https://docs.datadoghq.com/fr/integrations/amazon_elb/
[8]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
[9]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#container-installation
[10]: https://docs.datadoghq.com/fr/logs/log_collection/docker/#option-2-container-installation
[11]: https://docs.datadoghq.com/fr/help/
[12]: https://www.datadoghq.com/blog/announcing-eks
[13]: https://www.datadoghq.com/blog/eks-cluster-metrics
[14]: https://docs.datadoghq.com/fr/integrations/amazon_eks_fargate/
---
app_id: amazon-eks
app_uuid: abb8b86b-eeb7-4e38-b436-f4cbb09b4398
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Amazon EKS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- cloud
- configuration & deployment
- containers
- kubernetes
- log collection
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_eks/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_eks
integration_id: amazon-eks
integration_title: Amazon-EKS
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_eks
public_title: Amazon-EKS
short_description: Amazon EKS est un service géré qui facilite l'exécution de Kubernetes
  sur AWS.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Amazon EKS est un service géré qui facilite l'exécution de Kubernetes
    sur AWS.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon-EKS
---



![Dashboard EKS][1]

## Présentation

Amazon Elastic Kubernetes Service (EKS) est un service Kubernetes géré qui permet d'automatiser certains aspects du déploiement et de la maintenance de n'importe quel environnement Kubernetes standard. Que vous effectuiez la migration d'une application Kubernetes existante vers Amazon EKS ou que vous déployiez un nouveau cluster sur Amazon EKS ou AWS Outposts, Datadog vous aide à surveiller vos environnements EKS en temps réel.

## Implémentation

Datadog s'intègre déjà à Kubernetes et à AWS, ce qui en fait la solution idéale pour surveiller EKS. Si vous exécutez l'Agent dans un cluster Kubernetes et que vous souhaitez migrer vers EKS, vous pouvez continuer à surveiller votre cluster avec Datadog. 

De plus, les [groupes de nœuds gérés Amazon EKS][2] et le service [Amazon EKS sur AWS Outposts][3] sont pris en charge.

### EKS Anywhere

Consultez la section relative à l'[intégration Amazon EKS Anywhere][4] pour obtenir des instructions de configuration.

### Collecte de métriques

Pour surveiller EKS, vous devez configurer l'une des intégrations Datadog suivantes, ainsi que les intégrations des services AWS que vous exécutez avec EKS, comme [ELB][5].

- [Kubernetes][6]
- [AWS][7]
- [AWS EC2][8]

### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La configuration est identique à celle de Kubernetes. Pour lancer la collecte des logs depuis tous vos conteneurs, utilisez les [variables d'environnement][9] de votre Agent Datadog.

Tirez également parti des DaemonSets pour [déployer automatiquement l'Agent Datadog sur l'ensemble de vos nœuds][10].

Suivez les [étapes de collecte de logs de conteneur][11] pour en savoir plus sur ces variables d'environnement et découvrir les options de configuration avancées.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

## Pour aller plus loin

- [Surveiller Amazon EKS avec Datadog][13]
- [Métriques clés pour la surveillance d'Amazon EKS][14]
- [Amazon EKS sur AWS Fargate][15]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[3]: https://docs.aws.amazon.com/eks/latest/userguide/eks-on-outposts.html
[4]: https://docs.datadoghq.com/fr/integrations/eks_anywhere/
[5]: https://docs.datadoghq.com/fr/integrations/amazon_elb/
[6]: https://docs.datadoghq.com/fr/integrations/kubernetes/
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[8]: https://docs.datadoghq.com/fr/integrations/amazon_ec2/
[9]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
[10]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#container-installation
[11]: https://docs.datadoghq.com/fr/logs/log_collection/docker/#option-2-container-installation
[12]: https://docs.datadoghq.com/fr/help/
[13]: https://www.datadoghq.com/blog/announcing-eks
[14]: https://www.datadoghq.com/blog/eks-cluster-metrics
[15]: https://docs.datadoghq.com/fr/integrations/eks_fargate/
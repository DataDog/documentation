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
display_name: "Amazon\_EKS"
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
short_description: "Amazon\_EKS est un service géré qui facilite l'exécution de Kubernetes. on AWS"
support: core
supported_os:
  - linux
  - mac_os
---
![Dashboard EKS][1]

## Présentation

Elastic Container Service for Kubernetes (EKS) est le service le plus récent d'AWS. Il s'agit d'un service Kubernetes géré qui automatise certains aspects des processus de déploiement et de maintenance de tous les environnements Kubernetes standard. Que vous effectuiez la migration d'une application Kubernetes existante vers EKS ou que vous déployiez un nouveau cluster, Datadog vous aide à surveiller votre environnement EKS en temps réel.

## Implémentation

Datadog s'intègre déjà à Kubernetes et à AWS, ce qui en fait la solution idéale pour surveiller EKS. Si vous exécutez l'Agent dans un cluster Kubernetes et que vous souhaitez migrer vers EKS, vous pouvez continuer à surveiller votre cluster avec Datadog. 

### Collecte de métriques

La surveillance EKS nécessite la configuration des intégrations Datadog pour :

* [Kubernetes][2]
* [AWS][3]
* [AWS EC2][4]

ainsi que des intégrations pour tous les services AWS que vous utilisez avec EKS (p. ex., [ELB][5]).

### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

La configuration est identique à celle de Kubernetes. 
Pour lancer la collecte des logs depuis tous vos conteneurs, utilisez les [variables d'environnement][6] de votre Agent Datadog.

Tirez également profit des DaemonSets pour [déployer automatiquement l'Agent Datadog sur l'ensemble de vos nœuds][7]. 

Suivez les [étapes de collecte de logs de conteneur][8] pour en savoir plus sur ces variables d'environnement et découvrir plus d'options de configuration avancées.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

* [Surveiller Amazon EKS avec Datadog][10]
* [Métriques clés pour la surveillance d'Amazon EKS][11]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/amazon_eks/images/amazon_eks_dashboard.png
[2]: https://docs.datadoghq.com/fr/integrations/kubernetes
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[4]: https://docs.datadoghq.com/fr/integrations/amazon_ec2
[5]: https://docs.datadoghq.com/fr/integrations/amazon_elb
[6]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#log-collection-setup
[7]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/kubernetes/#container-installation
[8]: https://docs.datadoghq.com/fr/logs/log_collection/docker/#option-2-container-installation
[9]: https://docs.datadoghq.com/fr/help
[10]: https://www.datadoghq.com/blog/announcing-eks
[11]: https://www.datadoghq.com/blog/eks-cluster-metrics


{{< get-dependencies >}}
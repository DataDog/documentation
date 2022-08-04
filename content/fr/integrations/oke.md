---
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- oracle
- containers
- orchestration
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oke/README.md
display_name: Oracle Container Engine for Kubernetes (OKE)
draft: false
git_integration_title: oke
guid: a9d60438-8782-44cb-bd27-1ffc6c5688c1
integration_id: oke
integration_title: Oracle Container Engine for Kubernetes
integration_version: ''
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: oke.
metric_to_check: ''
name: oke
public_title: Intégration Oracle Container Engine for Kubernetes
short_description: OKE est un service d'orchestration de conteneurs géré par Oracle.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Oracle Cloud Infrastructure Container Engine for Kubernetes (OKE) est un service Kubernetes entièrement géré vous permettant de déployer et d'exécuter vos applications conteneurisées sur Oracle Cloud. Grâce à Datadog, vous disposez d'une visibilité complète sur vos clusters Kubernetes gérés par OKE. Une fois l'intégration Datadog activée, vous pouvez consulter votre infrastructure Kubernetes, surveiller des live processes et effectuer le suivi de métriques clés à partir de l'ensemble de vos pods et conteneurs, le tout depuis une interface unique.

## Configuration

Datadog s'intègre déjà à Kubernetes, ce qui en fait la solution idéale pour surveiller OKE. Si vous exécutez l'Agent dans un cluster Kubernetes et que vous souhaitez migrer vers OKE, vous pouvez continuer à surveiller votre cluster avec Datadog. 

De plus, les pools de nœuds OKE sont pris en charge.


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][1].

## Pour aller plus loin

- [Comment surveiller OKE avec Datadog][2]

[1]: https://docs.datadoghq.com/fr/help/
[2]: https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/
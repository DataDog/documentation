---
app_id: oke
app_uuid: c3361861-32be-4ed4-a138-d68b85b8d88b
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Oracle Container Engine for Kubernetes (OKE)
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- oracle
- containers
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oke/README.md
display_on_public_website: true
draft: false
git_integration_title: oke
integration_id: oke
integration_title: Oracle Container Engine for Kubernetes
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: oke
oauth: {}
public_title: Oracle Container Engine for Kubernetes
short_description: OKE est un service d'orchestration de conteneurs géré par Oracle.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Oracle
  - Category::Containers
  - Category::Orchestration
  configuration: README.md#Setup
  description: OKE est un service d'orchestration de conteneurs géré par Oracle.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle Container Engine for Kubernetes
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
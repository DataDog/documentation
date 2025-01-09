---
categories:
- cloud
- aws
- log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Backup.
doc_link: https://docs.datadoghq.com/integrations/amazon_backup/
draft: false
git_integration_title: amazon_backup
has_logo: true
integration_id: amazon-backup
integration_title: Amazon Backup
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_backup
public_title: Intégration Datadog/Amazon Backup
short_description: Surveillez des métriques clés d'Amazon Backup.
version: '1.0'
---

## Présentation

AWS Backup vous permet de centraliser et d'automatiser la protection des données sur les services AWS et les workloads hybrides.

Activez cette intégration pour visualiser vos métriques AWS Backup dans Datadog.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Backup` est cochée dans la section **Metric Collection**.
2. Installez l'[intégration Datadog/Amazon Backup][3].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_backup" >}}


### Événements

L'intégration Amazon Backup n'inclut aucun événement.

### Checks de service

L'intégration Amazon Backup n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-backup
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_backup/amazon_backup_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/
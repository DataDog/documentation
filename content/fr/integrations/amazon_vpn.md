---
categories:
- aws
- cloud
- log collection
- network
dependencies: []
description: Surveillez des métriques clés d'AWS VPN.
doc_link: https://docs.datadoghq.com/integrations/amazon_vpn/
draft: false
git_integration_title: amazon_vpn
has_logo: true
integration_id: ''
integration_title: AWS VPN
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_vpn
public_title: Intégration Datadog/AWS VPN
short_description: Surveillez des métriques clés d'AWS VPN.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

AWS VPN vous permet d'établir un tunnel sécurisé et privé depuis votre réseau ou appareil vers le réseau global AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de VPN.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Sur la [page de l'intégration AWS][2], vérifiez que `VPN` est activé dans l'onglet `Metric Collection`.
2. Installez l'[intégration Datadog/AWS VPN][3].

### Collecte de logs

#### Activer le logging

Configurez AWS VPN de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_vpn` est défini en tant que _Target prefix_.

#### Envoi de logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs AWS VPN dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_vpn" >}}


### Événements

L'intégration AWS VPN n'inclut aucun événement.

### Checks de service

L'intégration AWS VPN n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-vpn
[4]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_vpn/amazon_vpn_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/
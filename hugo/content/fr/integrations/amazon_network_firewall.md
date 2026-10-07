---
categories:
- cloud
- aws
ddtype: crawler
dependencies: []
description: Surveillez vos métriques Amazon Network Firewall.
doc_link: https://docs.datadoghq.com/integrations/amazon_network_firewall/
draft: false
git_integration_title: amazon_network_firewall
has_logo: true
integration_id: amazon-network-firewall
integration_title: Amazon Network Firewall
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_network_firewall
public_title: Amazon Network Firewall
short_description: Surveillez vos métriques Amazon Network Firewall.
version: '1.0'
---

## Présentation

AWS Network Firewall est un service basé sur des états qui vous permet de filtrer le trafic dans le périmètre de votre VPC.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'Amazon Network Firewall.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Network Firewall` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS Amazon Network Firewall][3].

### Collecte de logs

#### Activer le logging

Configurez Amazon Network Firewall de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_network_firewall` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][4].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs Amazon Network Firewall dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][5]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][6]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_network_firewall" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration Amazon Network Firewall n'inclut aucun événement.

### Checks de service

L'intégration Amazon Network Firewall n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-network-firewall
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_network_firewall/amazon_network_firewall_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/
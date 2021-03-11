---
aliases:
  - /fr/integrations/awsdirectconnect/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Direct Connect.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_directconnect/'
draft: false
git_integration_title: amazon_directconnect
has_logo: true
integration_title: Amazon Direct Connect
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_directconnect
public_title: "Intégration Datadog/Amazon\_Direct\_Connect"
short_description: Surveillez des métriques clés d'Amazon Direct Connect.
version: '1.0'
---
## Présentation

Cette intégration récupère des métriques à partir d'AWS Direct Connect (par exemple, l'état de connexion, les débits binaires d'entrée et de sortie, les débits de paquets d'entrée et de sortie, etc.).

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `DirectConnect` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon Direct Connect :

    - `directconnect:DescribeConnections` : utilisé pour énumérer les connexions Direct Connect disponibles.
    - `directconnect:DescribeTags` : utilisé pour recueillir des tags personnalisés appliqués aux connexions Direct Connect.

    Pour en savoir plus sur les stratégies Direct Connect, consultez [la documentation disponible sur le site d'AWS][4].

3. Installez l'[intégration Datadog/AWS Direct Connect][5].

### Collecte de logs

#### Activer le logging

Configurez Amazon Direct Connect de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers Cloudwatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_directconnect` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][6].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs Cloudwatch qui contient vos logs Amazon Direct Connect dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][7]
    - [Ajouter un déclencheur manuel sur le groupe de logs Cloudwatch][8]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_directconnect" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS Direct Connect n'inclut aucun événement.

### Checks de service

L'intégration AWS Direct Connect n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_directconnect.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_directconnect
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_directconnect/amazon_directconnect_metadata.csv
[10]: https://docs.datadoghq.com/fr/help/
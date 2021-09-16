---
aliases:
  - /fr/integrations/awses/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Elasticsearch."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_es/'
draft: false
git_integration_title: amazon_es
has_logo: true
integration_title: Amazon Elasticsearch
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_es
public_title: "Intégration Datadog/Amazon\_Elasticsearch"
short_description: "Surveillez des métriques clés d'Amazon\_Elasticsearch."
version: '1.0'
---
## Présentation

Amazon Elasticsearch Service est un service géré qui facilite le déploiement, l'opération et le dimensionnement d'Elasticsearch dans le cloud AWS.

Activez cette intégration pour visualiser dans Datadog les métriques et tags personnalisés pour vos clusters ES.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `ES` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon ES :

    - `es:ListTags` : ajoute des tags de domaine ES personnalisés aux métriques ES.
    - `es:ListDomainNames` : énumère tous les domaines Amazon ES dont l'utilisateur actuel est le propriétaire dans la région active.
    - `es:DescribeElasticsearchDomains` : collecte l'identifiant de domaine, l'endpoint de service de domaine et l'ARN de domaine pour tous les domaines en tant que tags.

    Pour en savoir plus sur les stratégies ES, consultez [la documentation disponible sur le site d'AWS][4].

3. Installez l'[intégration Datadog/AWS ES][5].

### Collecte de logs

#### Activer le logging

Configurez Amazon Elasticsearch de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers Cloudwatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_elasticsearch` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][6].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs Cloudwatch qui contient vos logs Amazon Elasticsearch dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][7]
    - [Ajouter un déclencheur manuel sur le groupe de logs Cloudwatch][7]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_es" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS ES n'inclut aucun événement.

### Checks de service

L'intégration AWS ES n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_es.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_es
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_es/amazon_es_metadata.csv
[9]: https://docs.datadoghq.com/fr/help/
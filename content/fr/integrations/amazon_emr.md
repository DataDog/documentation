---
aliases:
  - /fr/integrations/awsemr/
categories:
  - cloud
  - processing
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Elastic Map Reduce.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_emr/'
draft: false
git_integration_title: amazon_emr
has_logo: true
integration_title: "Amazon\_Elastic\_Map\_Reduce"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_emr
public_title: "Intégration Datadog/Amazon\_Elastic\_Map\_Reduce"
short_description: Surveillez des métriques clés d'Amazon Elastic Map Reduce.
version: '1.0'
---
## Présentation

Amazon Elastic Map Reduce (Amazon EMR) est un service Web qui facilite le traitement rapide et rentable de grandes quantités de données.

Activez cette intégration pour visualiser dans Datadog vos métriques d'EMR.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `EMR` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon EMR. Pour en savoir plus sur les stratégies EMR, consultez [la documentation du site Web d'AWS][4].

    | Autorisation AWS                     | Description                         |
    | ---------------------------------- | ----------------------------------- |
    | `elasticmapreduce:ListClusters`    | Énumère les clusters disponibles.            |
    | `elasticmapreduce:DescribeCluster` | Ajoute des tags aux métriques EMR de CloudWatch. |

3. Installez l'[intégration Datadog/AWS EMR][5].

### Collecte de logs

#### Activer le logging

Configurez Amazon EMR de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers Cloudwatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_emr` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][6].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs Cloudwatch qui contient vos logs Amazon EMR dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][7]
    - [Ajouter un déclencheur manuel sur le groupe de logs Cloudwatch][8]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_emr" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS Elastic MapReduce n'inclut aucun événement.

### Checks de service

L'intégration AWS Elastic MapReduce n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticmapreduce.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_emr
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_emr/amazon_emr_metadata.csv
[10]: https://docs.datadoghq.com/fr/help/
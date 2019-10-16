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

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `EMR` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon EMR. Pour en savoir plus sur les stratégies EMR, consultez [la documentation du site Web d'AWS][4].

    | Autorisation AWS                     | Description                         |
    |------------------------------------|-------------------------------------|
    | `elasticmapreduce:ListClusters`    | Énumère les clusters disponibles.            |
    | `elasticmapreduce:DescribeCluster` | Ajoute des tags aux métriques EMR de CloudWatch. |

3. Installez l'[intégration Datadog/AWS EMR][5].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_emr" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Elastic MapReduce n'inclut aucun événement.

### Checks de service
L'intégration AWS Elastic MapReduce n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].


[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticmapreduce.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_emr
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_emr/amazon_emr_metadata.csv
[7]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
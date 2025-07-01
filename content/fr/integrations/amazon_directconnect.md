---
aliases:
- /fr/integrations/awsdirectconnect/
categories:
- cloud
- aws
- log collection
dependencies: []
description: Surveillez des métriques clés d'AWS Direct Connect.
doc_link: https://docs.datadoghq.com/integrations/amazon_directconnect/
draft: false
git_integration_title: amazon_directconnect
has_logo: true
integration_id: ''
integration_title: AWS Direct Connect
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_directconnect
public_title: Intégration Datadog/AWS Direct Connect
short_description: Surveillez des métriques clés d'AWS Direct Connect.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Cette intégration récupère des métriques à partir d'AWS Direct Connect, telles que l'état de connexion, les débits binaires d'entrée et de sortie, les débits de paquets d'entrée et de sortie, etc.

## Formule et utilisation

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Sur la [page de l'intégration AWS][2], vérifiez que `DirectConnect` est activé dans l'onglet `Metric Collection`.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'AWS Direct Connect :

    - `directconnect:DescribeConnections` : utilisé pour énumérer les connexions Direct Connect disponibles.
    - `directconnect:DescribeTags` : utilisé pour recueillir des tags personnalisés appliqués aux connexions Direct Connect.

    Pour en savoir plus, consultez la section relative aux [stratégies Direct Connect][4] de la documentation AWS.

3. Installez l'[intégration Datadog/AWS Direct Connect][5].

### APM

#### Activer le logging

Configurez AWS Direct Connect de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_directconnect` est défini en tant que _Target prefix_.

#### Envoi de logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][6].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs AWS Direct Connect dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][7]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][8]

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "amazon_directconnect" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Aide

L'intégration AWS Direct Connect n'inclut aucun événement.

### Aide

L'intégration AWS Direct Connect n'inclut aucun check de service.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/directconnect/latest/UserGuide/security-iam.html
[5]: https://app.datadoghq.com/integrations/amazon-directconnect
[6]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_directconnect/amazon_directconnect_metadata.csv
[10]: https://docs.datadoghq.com/fr/help/
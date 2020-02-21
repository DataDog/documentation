---
aliases:
  - /fr/integrations/awsredshift/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Redshift."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_redshift/'
git_integration_title: amazon_redshift
has_logo: true
integration_title: Amazon Redshift
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_redshift
public_title: "Intégration Datadog/Amazon\_Redshift"
short_description: "Surveillez des métriques clés d'Amazon\_Redshift."
version: '1.0'
---
## Présentation

Amazon Redshift est un service d'entrepôt de données entièrement géré qui stocke des pétaoctets de données et simplifie et rentabilise l'analyse de toutes vos données.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Redshift.

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Redshift` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon Redshift :

    - `redshift:DescribeClusters` : répertorie tous les clusters Redshift de votre compte.
    - `redshift:DescribeLoggingStatus` : récupère le compartiment S3 au sein duquel sont stockés les logs Redshift.
    - `tag:GetResources` : récupère les tags personnalisés sur vos clusters Redshift.

    Pour en savoir plus sur les stratégies Redshift, consultez [la documentation disponible sur le site d'AWS][4].

3. Installez l'[intégration Datadog/AWS Redshift][5].

### Collecte de logs

#### Activer la journalisation AWS Redshift

Commencez par activer la journalisation sur votre cluster Redshift pour recueillir vos logs. Les logs Redshift peuvent être écrits dans un compartiment AWS S3 et [lus par une fonction Lambda][6]. [Pour en savoir plus, consultez la documentation AWS][7]

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][8].
2. Une fois la fonction Lambda installée, vous pouvez recueillir vos logs Redshift de deux façons :

    - Solution automatique : nous gérons les logs Redshift si vous nous accordez les autorisations nécessaires. [Consultez le principal service Web d'Amazon pour configurer la collecte de logs automatique][9].
    - Solution manuelle : ajoutez manuellement un déclencheur sur le compartiment s3 qui contient vos logs Redshift dans la console AWS.

#### Étapes de l'installation manuelle

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][8].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 contenant vos logs Redshift dans la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs :
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuration déclencheur S3" popup="true" style="width:70%;">}}
   Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs Redshift et remplacez le type d'événement par `Object Created (All)`. Cliquez ensuite sur le bouton Add.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuration déclencheur Lambda S3" popup="true" style="width:70%;">}}

Accédez ensuite à la [section Log de Datadog][10] pour commencer à explorer vos logs !

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_redshift" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS Redshift n'inclut aucun événement.

### Checks de service

L'intégration AWS Redshift n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_redshift.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_redshift
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[7]: https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing-console.html
[8]: /fr/integrations/amazon_web_services/#create-a-new-lambda-function
[9]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#collecting-logs-from-s3
[10]: https://app.datadoghq.com/logs
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_redshift/amazon_redshift_metadata.csv
[12]: https://docs.datadoghq.com/fr/help
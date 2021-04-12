---
aliases:
  - /fr/integrations/awss3/
categories:
  - cloud
  - data store
  - aws
  - os & system
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez la latence des requêtes, le nombre de requêtes par type, la taille des compartiments et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_s3/'
draft: false
git_integration_title: amazon_s3
has_logo: true
integration_title: Amazon S3
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_s3
public_title: "Intégration Datadog/Amazon\_S3"
short_description: 'Surveillez la latence des requêtes, le nombre de requêtes par type, la taille des compartiments et plus encore.'
version: '1.0'
---
{{< img src="integrations/amazon_s3/s3_db_screenshot.png" alt="Dashboard S3" popup="true">}}

## Présentation

Amazon Simple Storage Service (S3) est un service de stockage dans le cloud hautement disponible et évolutif.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de S3.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

#### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `S3` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon S3 :

    - `s3:ListAllMyBuckets` : utilisé pour répertorier les compartiments disponibles.
    - `s3:GetBucketTagging` : utilisé pour récupérer les tags personnalisés du compartiment.

    Pour en savoir plus sur les stratégies S3, consultez [la documentation disponible sur le site d'AWS][4].

3. Installez l'[intégration Datadog/AWS S3][5].
4. (facultatif) Pour rassembler des **métriques de demandes**, [activez les métriques de demandes][6] pour vos compartiments Amazon S3 depuis la console AWS.

### Collecte de logs

#### Activer les logs d'accès S3

Sélectionnez le compartiment S3 et cliquez sur l'onglet *properties* :

{{< img src="integrations/amazon_s3/selecting_s3_bucket.png" alt="Sélection compartiment S3" popup="true" style="width:70%;">}}

Cliquez ensuite sur *Server access logging* et choisissez *enable* :

{{< img src="integrations/amazon_s3/server_access_logging.png" alt="Server access logging S3" popup="true" style="width:70%;">}}

Sélectionnez ensuite le compartiment s3 dans lequel les logs doivent être rédigés. Pour obtenir plus d'informations, consultez la [documentation dédiée à AWS S3][7].

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][8].
2. Une fois la fonction Lambda installée, vous pouvez recueillir vos logs d'accès S3 de deux façons :

    - Solution automatique : nous gérons les logs d'accès S3 si vous nous accordez les autorisations nécessaires. [Consultez le principal service Web d'Amazon pour configurer la collecte de logs automatique][9].
    - Solution manuelle : ajoutez manuellement un déclencheur sur le compartiment s3 qui contient vos logs d'accès S3 dans la console AWS.

#### Étapes de l'installation manuelle

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][10].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 contenant vos logs S3 dans la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs :
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuration déclencheur S3" popup="true" style="width:70%;">}}
   Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs S3 et remplacez le type d'événement par `Object Created (All)`. Cliquez ensuite sur le bouton Add.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuration déclencheur Lambda S3" popup="true" style="width:70%;">}}

Accédez ensuite à la [section Log de Datadog][11] pour commencer à explorer vos logs !

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_s3" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS S3 n'inclut aucun événement.

### Checks de service

L'intégration AWS S3 n'inclut aucun check de service.

## Dépannage

### Log chiffré CloudTrail

Si vos données de logs AWS CloudTrail sont chiffrées par KMS dans votre AWS S3, autorisez le rôle Datadog à déchiffrer les données de logs Cloudtrail avec la stratégie suivante : `kms:Decrypt`. [En savoir plus sur votre stratégie de chiffrement/déchiffrement KMS][13].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_s3.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_s3
[6]: http://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html
[7]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/server-access-logging.html
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[9]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#log-collection
[10]: /fr/integrations/amazon_web_services/#create-a-new-lambda-function
[11]: https://app.datadoghq.com/logs
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_s3/amazon_s3_metadata.csv
[13]: https://docs.aws.amazon.com/kms/latest/developerguide/iam-policies.html#iam-policy-example-encrypt-decrypt-one-account
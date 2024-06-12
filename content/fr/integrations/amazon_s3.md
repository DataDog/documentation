---
aliases:
- /fr/integrations/awss3/
categories:
- cloud
- data store
- aws
- os & system
- log collection
dependencies: []
description: Surveillez la latence des requêtes, le nombre de requêtes par type, la
  taille des compartiments et plus encore.
doc_link: https://docs.datadoghq.com/integrations/amazon_s3/
draft: false
git_integration_title: amazon_s3
has_logo: true
integration_id: amazon-s3
integration_title: Amazon S3
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_s3
public_title: Intégration Datadog/Amazon S3
short_description: Surveillez la latence des requêtes, le nombre de requêtes par type,
  la taille des compartiments et plus encore.
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

1. Sur la [page de l'intégration AWS][2], vérifiez que `S3` est activé dans l'onglet `Metric Collection`.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon S3 :

    - `s3:ListAllMyBuckets` : utilisé pour répertorier les compartiments disponibles.
    - `s3:GetBucketTagging` : utilisé pour récupérer les tags personnalisés du compartiment.

    Pour en savoir plus, consultez la section relative aux [stratégies S3][4] de la documentation AWS.

3. Installez l'[intégration Datadog/AWS S3][5].
4. (facultatif) Pour rassembler des **métriques de demandes**, [activez les métriques de demandes][6] pour vos compartiments Amazon S3 depuis la console AWS.

### Collecte de logs

#### Activer les logs d'accès S3

1. Accédez au compartiment S3.
2. Cliquez sur **Properties**.
3. Accédez à la section Services Access Logging et cliquez sur **Edit**.
4. Sélectionnez **Enable**.
5. Sélectionnez le compartiment S3 vers lequel envoyer les logs.

 Pour en savoir plus, consultez la page [Activation de la journalisation des accès au serveur Amazon S3][7].

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][8] dans votre compte AWS. 
2. Une fois la fonction Lambda installée, vous pouvez recueillir vos logs d'accès S3 de deux façons :

    - Solution automatique : les logs S3 sont automatiquement gérés si vous accordez les autorisations nécessaires à Datadog. Consultez la section [Configurer automatiquement des déclencheurs][9] pour en savoir plus sur la configuration de la collecte automatique des logs sur la fonction Lambda du Forwarder Datadog.
    - Solution manuelle : dans la console AWS, ajoutez un déclencheur sur le compartiment S3 qui contient vos logs d'accès S3. Consultez les [étapes de l'installation manuelle](#etapes-de-l-installation-manuelle).

#### Étapes de l'installation manuelle

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][8] dans votre compte AWS.
2. Une fois la fonction Lambda configurée, accédez-y. Dans la section Function Overview, cliquez sur **Add Trigger**.
3. Sélectionnez le déclencheur **S3** pour la Trigger Configuration.
4. Sélectionnez le compartiment S3 où se trouvent vos logs S3.
5. Ne changez pas le type d'événements `All object create events`.
6. Cliquez sur **Add** pour ajouter le déclencheur à votre fonction Lambda.

Accédez au [Log Explorer][10] pour commencer à explorer vos logs.

Pour en savoir plus sur la collecte de logs de service AWS, consultez la section [Envoyer des logs de service AWS avec la fonction Lambda Datadog][11].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_s3" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS S3 n'inclut aucun événement.

### Checks de service

L'intégration AWS S3 n'inclut aucun check de service.

## Dépannage

### Log chiffré CloudTrail

Si vos données de logs AWS CloudTrail sont chiffrées par KMS dans votre AWS S3, autorisez le rôle Datadog à déchiffrer les données de logs CloudTrail avec la stratégie suivante : `kms:Decrypt`. [En savoir plus sur votre stratégie de chiffrement/déchiffrement KMS][13].


[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-overview.html
[5]: https://app.datadoghq.com/integrations/amazon-s3
[6]: http://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html
[7]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/server-access-logging.html
[8]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#log-collection
[10]: https://app.datadoghq.com/logs
[11]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_s3/amazon_s3_metadata.csv
[13]: https://docs.aws.amazon.com/kms/latest/developerguide/iam-policies.html#iam-policy-example-encrypt-decrypt-one-account
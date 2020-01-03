---
aliases:
  - /fr/integrations/awscloudfront/
categories:
  - cloud
  - caching
  - web
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez les taux d''erreur, le nombre de requêtes et les volumes de téléchargement et de chargement.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_cloudfront/'
git_integration_title: amazon_cloudfront
has_logo: true
integration_title: "Amazon\_CloudFront"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_cloudfront
public_title: "Intégration Datadog/Amazon\_CloudFront"
short_description: 'Surveillez les taux d''erreur, le nombre de requêtes et les volumes de téléchargement et de chargement.'
version: '1.0'
---
## Présentation

Amazon CloudFront est un réseau rapide de diffusion de contenu (CDN) qui distribue vos sites Web, API, vidéos et autres ressources Web.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de CloudFront.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `CloudFront` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS CloudFront][3].

### Collecte de logs
#### Activer la journalisation Cloudfront

Lorsque vous activez la journalisation pour une distribution, indiquez le compartiment Amazon S3 dans lequel vous souhaitez que CloudFront stocke vos logs. Si vous utilisez Amazon S3 comme source, nous vous recommandons de ne pas utiliser le même compartiment pour vos fichiers de log. L'utilisation d'un compartiment distinct simplifie la maintenance.

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_1.png" alt="Journalisation Cloudfront 1"   style="width:70%;">}}

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_2.png" alt="Journalisation Cloudfront 1"   style="width:70%;">}}

**Remarque importante** : vous pouvez stocker des fichiers de log de plusieurs distributions dans un même compartiment. Lorsque vous activez la journalisation, vous pouvez indiquer `cloudfront` en tant que préfixe pour les noms de fichiers pour [déterminer à quelle distribution sont associés vos fichiers][4].

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][5].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 contenant vos logs Cloudfront dans la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs :
{{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuration déclencheur S3"   style="width:70%;">}}
    Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs CloudFront et remplacez le type d'événement par `Object Created (All)`. Cliquez ensuite sur le bouton Add.
{{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuration déclencheur Lambda S3"   style="width:70%;">}}

Accédez ensuite à la [section Log de Datadog][6] pour commencer à explorer vos logs !

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_cloudfront" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter `aws_account`, `region` et `distributionid`.

### Événements
L'intégration AWS CloudFront n'inclut aucun événement.

### Checks de service
L'intégration AWS CloudFront n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudfront
[4]: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cloudfront/amazon_cloudfront_metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
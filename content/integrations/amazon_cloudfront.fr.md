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
description: >-
  Suivre le taux d'erreurs, le nombre de requêtes, et le volume d'octets
  downloadé and uploadé.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_cloudfront/'
git_integration_title: amazon_cloudfront
has_logo: true
integration_title: AWS CloudFront
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_cloudfront
public_title: Intégration Datadog-AWS CloudFront
short_description: >-
  Suivre le taux d'erreurs, le nombre de requêtes, et le volume d'octets
  downloadé and uploadé.
version: '1.0'
---
## Aperçu

Amazon CloudFront est un service de diffusion de contenu (CDN) qui accélère la diffusion de vos sites Web, de vos API, de votre contenu vidéo ou d'autres éléments Web.

Activez cette intégration pour voir dans Datadog toutes vos métriques CloudFront.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier][1].

### Collecte de métrique
1. Dans la [vignette d'intégration AWS] [2], assurez-vous que `CloudFront` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS CloudFront] [3].

### Collecte de log
#### Activer le logging Cloudfront

Lorsque vous activez le logging pour une distribution, spécifiez le bucket Amazon S3 dans lequel vous souhaitez que CloudFront stocke les logs. Si vous utilisez Amazon S3 comme origine, nous vous recommandons de ne pas utiliser le même bucket pour vos logs, l'utilisation d'un bucket séparé simplifie la maintenance.

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_1.png" alt="Cloudfront logging 1" responsive="true" popup="true" style="width:70%;">}}

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_2.png" alt="Cloudfront logging 1" responsive="true" popup="true" style="width:70%;">}}

Stockez les logs pour plusieurs distributions dans le même bucket. Lorsque vous activez le logging, spécifiez “cloudfront” comme préfixe pour les noms de fichiers, [pour garder trace des fichiers de logs associés aux distributions][4].

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda pour collecte de log AWS][5].
2. Une fois la fonction lambda installée, ajoutez manuellement un déclencheur sur le bucket S3 contenant vos logs Cloudfront dans la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs:
{{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="S3 trigger configuration" responsive="true" popup="true" style="width:70%;">}}
    Configurez votre déclencheur en choisissant le bucket S3 qui contient vos logs ELB et changez le type d'événement en `Object Created (All)`, puis cliquez sur le bouton *add*.
{{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="S3 Lambda trigger configuration" responsive="true" popup="true" style="width:70%;">}}

Allez désormais dans la section [Log de Datadog][6] pour commencer à explorer vos logs!

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_cloudfront" >}}

Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Cloudfront n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration AWS Cloudfront n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][7].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][8]

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudfront
[4]: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket
[5]: /integrations/amazon_web_services/#create-a-new-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: http://docs.datadoghq.com/help/
[8]: https://www.datadoghq.com/blog/

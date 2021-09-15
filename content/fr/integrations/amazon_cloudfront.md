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
description: Surveillez les taux d'erreur, le nombre de requêtes et les volumes de téléchargement et de chargement.
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudfront/
draft: false
git_integration_title: amazon_cloudfront
has_logo: true
integration_id: amazon-cloudfront
integration_title: Amazon CloudFront
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_cloudfront
public_title: "Intégration Datadog/Amazon\_CloudFront"
short_description: Surveillez les taux d'erreur, le nombre de requêtes et les volumes de téléchargement et de chargement.
version: '1.0'
---
## Présentation

Amazon CloudFront est un réseau rapide de diffusion de contenu (CDN) qui distribue vos sites Web, API, vidéos et autres ressources Web.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de CloudFront.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `CloudFront` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/AWS CloudFront][3].
3. Facultatif : activez les [métriques de distribution CloudFront supplémentaires][4] pour analyser plus en détail les performances de votre trafic CloudFront.

### Collecte de logs

{{< tabs >}}
{{% tab "Logs standard" %}}

#### Activer le logging

Lorsque vous activez la journalisation CloudFront pour une distribution, indiquez le compartiment Amazon S3 dans lequel vous souhaitez que CloudFront stocke vos logs. Si vous utilisez Amazon S3 comme source, Datadog vous déconseille d'utiliser le même compartiment pour vos fichiers de log. L'utilisation d'un compartiment distinct simplifie la maintenance.

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_1.png" alt="Journalisation Cloudfront 1" popup="true" style="width:70%;">}}

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_2.png" alt="Journalisation Cloudfront 2" popup="true" style="width:70%;">}}

**Remarque importante** : vous pouvez stocker des fichiers de log de plusieurs distributions dans un même compartiment. Lorsque vous activez la journalisation, vous pouvez indiquer `cloudfront` en tant que préfixe dans les noms de fichiers pour [déterminer à quelle distribution sont associés vos fichiers][1].

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][2].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 contenant vos logs CloudFront en cliquant sur S3 dans la liste des déclencheurs pour votre Lambda dans la console AWS :
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuration déclencheur S3" popup="true" style="width:70%;">}}
   Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs CloudFront et remplacez le type d'événement par `Object Created (All)`. Cliquez ensuite sur le bouton Add.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuration déclencheur Lambda S3" popup="true" style="width:70%;">}}

Accédez ensuite à la [section Log de Datadog][3] pour commencer à explorer vos logs !

[1]: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#access-logs-choosing-s3-bucket
[2]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[3]: https://app.datadoghq.com/logs
{{% /tab %}}
{{% tab "Logs en temps réel" %}}

#### Activer le logging

##### Créer une configuration spécifique

Lorsque vous créez une configuration pour des logs en temps réel, vous pouvez spécifier les champs de log que vous souhaitez recevoir. Par défaut, tous les [champs disponibles][1] sont sélectionnés.

{{< img src="integrations/amazon_cloudfront/cloudfront_logging_3.png" alt="Journalisation Cloudfront 3" popup="true" style="width:70%;">}}

Il est conseillé de conserver la configuration par défaut et d'ajouter la règle de parsing personnalisée suivante afin de traiter automatiquement les logs avec tous les champs activés :

{{< code-block lang="java" >}}
      real_time_logs (%{number:timestamp:scale(1000)}|%{number:timestamp})\s+%{_client_ip}\s+%{_time_to_first_byte}\s+%{_status_code}\s+%{_bytes_write}\s+%{_method}\s+%{regex("[a-z]*"):http.url_details.scheme}\s+%{notSpace:http.url_details.host:nullIf("-")}\s+%{notSpace:http.url_details.path:nullIf("-")}\s+%{_bytes_read}\s+%{notSpace:cloudfront.edge-location:nullIf("-")}\s+%{_request_id}\s+%{_ident}\s+%{_duration}\s+%{_version}\s+IPv%{integer:network.client.ip_version}\s+%{_user_agent}\s+%{_referer}\s+%{notSpace:cloudfront.cookie}\s+(%{notSpace:http.url_details.queryString:querystring}|%{notSpace:http.url_details.queryString:nullIf("-")})\s+%{notSpace:cloudfront.edge-response-result-type:nullIf("-")}\s+%{_x_forwarded_for}\s+%{_ssl_protocol}\s+%{_ssl_cipher}\s+%{notSpace:cloudfront.edge-result-type:nullIf("-")}\s+%{_fle_encrypted_fields}\s+%{_fle_status}\s+%{_sc_content_type}\s+%{_sc_content_len}\s+%{_sc_range_start}\s+%{_sc_range_end}\s+%{_client_port}\s+%{_x_edge_detailed_result_type}\s+%{notSpace:network.client.country:nullIf("-")}\s+%{notSpace:accept-encoding:nullIf("-")}\s+%{notSpace:accept:nullIf("-")}\s+%{notSpace:cache-behavior-path-pattern:nullIf("-")}\s+%{notSpace:headers:nullIf("-")}\s+%{notSpace:header-names:nullIf("-")}\s+%{integer:headers-count}.*
{{< /code-block >}}

#### Envoyer des logs à Datadog

Les logs en temps réel sont envoyés au flux de données Kinesis de votre choix et peuvent être directement transmis à Datadog grâce à notre [intégration Kinesis Firehose][2].

Vous pouvez également configurer un consommateur, tel qu'Amazon Kinesis Data Firehose, pour envoyer des logs en temps réel vers un compartiment S3 et utiliser le [Forwarder Lambda Datadog][3] pour les transmettre à Datadog.

[1]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html#understand-real-time-log-config-fields
[2]: https://docs.datadoghq.com/fr/integrations/amazon_kinesis/
[3]: https://docs.datadoghq.com/fr/serverless/forwarder/
{{% /tab %}}
{{< /tabs >}}

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_cloudfront" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter `aws_account`, `region` et `distributionid`.

### Événements

L'intégration AWS CloudFront n'inclut aucun événement.

### Checks de service

L'intégration AWS CloudFront n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudfront
[4]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/viewing-cloudfront-metrics.html
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_cloudfront/amazon_cloudfront_metadata.csv
[6]: https://docs.datadoghq.com/fr/help/
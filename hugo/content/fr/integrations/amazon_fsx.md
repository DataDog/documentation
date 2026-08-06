---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_FSx."
doc_link: https://docs.datadoghq.com/integrations/amazon_fsx/
draft: false
git_integration_title: amazon_fsx
has_logo: true
integration_id: amazon-fsx
integration_title: "Amazon\_FSx"
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_fsx
public_title: "Intégration Datadog/Amazon\_FSx"
short_description: "Surveillez des métriques clés d'Amazon\_FSx."
version: '1.0'
---
## Présentation

Amazon FSx est un service entièrement géré qui fournit un stockage évolutif pour Windows File Server ou Lustre.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de FSx.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `FSx` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'AWS FSx.

    | Autorisation AWS                          | Description                                                                                                                                                                                                                                              |
    | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `fsx:ListTagsForResource`               | Permet d'ajouter des tags personnalisés FSx.                                                                                                                                                                                                                    |
    | `fsx:DescribeFileSystems`               | Permet d'ajouter des capacités de stockage et de débit.                                                                                                                                                                                    |

2. Installez l'[intégration Datadog/Amazon FSx][4].


### Collecte de logs

#### Logs d'événements d'audit pour FSx for Windows File Server
Pour surveiller tous les accès utilisateur à des fichiers, dossiers et partages de fichier individuels, intégrez les logs d'événements d'audit à partir de votre FSx for Windows File Server :

1. [Activez la fonctionnalité d'audit des accès aux fichiers][5] pour vos systèmes de fichiers et envoyez les logs à CloudWatch.
2. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs avec Datadog][4] (version 3.35.0+).
3. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le groupe de logs CloudWatch `/aws/fsx/windows` dans la console AWS :
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="groupes de logs cloudwatch" popup="true" style="width:70%;">}}
   Sélectionnez le groupe de logs CloudWatch correspondant, ajoutez un nom de filtre (ou laissez le filtre vide) et ajoutez un déclencheur :
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="déclencheur cloudwatch" popup="true" style="width:70%;">}}
4. Accédez à la [section Log de Datadog][6] pour commencer à explorer vos logs !

**Remarque** : vous pouvez également envoyer ces logs à Datadog avec [Kinesis Data Firehose][7], mais vous devrez créer un [processeur][8] de logs personnalisé pour obtenir la même fonctionnalité de parsing de log et la même expérience de recherche.


#### Activité de l'API FSx

Amazon FSx est intégré à AWS CloudTrail, qui surveille chaque action FSx effectuée par un utilisateur, un rôle ou un service AWS. 
Activez l'[intégration CloudTrail][9] de Datadog pour surveiller tous les appels d'API FSx dans votre compte AWS.

### Métriques
{{< get-metrics-from-git "amazon_fsx" >}}


### Événements

L'intégration Amazon FSx n'inclut aucun événement.

### Checks de service

L'intégration Amazon FSx n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://app.datadoghq.com/account/settings#integrations/amazon-fsx
[5]: https://docs.aws.amazon.com/fsx/latest/WindowsGuide/file-access-auditing.html#faa-log-destinations
[6]: https://app.datadoghq.com/logs
[7]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=kinesisfirehosedeliverystream
[8]: https://docs.datadoghq.com/fr/logs/log_configuration/processors/?tab=ui
[9]: https://docs.datadoghq.com/fr/integrations/amazon_cloudtrail/#log-collection
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_gamelift/amazon_gamelift_metadata.csv
[11]: https://docs.datadoghq.com/fr/help/
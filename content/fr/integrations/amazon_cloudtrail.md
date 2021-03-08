---
aliases:
  - /fr/integrations/awscloudtrail/
  - /fr/integrations/faq/i-think-i-m-missing-some-of-my-cloudtrail-events/
  - /fr/integrations/amazon_cloudtrail/
categories:
  - cloud
  - monitoring
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Recevez des alertes concernant toute activité suspecte sur un compte AWS.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_cloudtrail/'
draft: false
git_integration_title: amazon_cloudtrail
has_logo: true
integration_title: AWS CloudTrail
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_cloudtrail
public_title: "Intégration Datadog/AWS\_CloudTrail"
short_description: Recevez des alertes concernant toute activité suspecte sur un compte AWS.
version: '1.0'
---
## Présentation

AWS CloudTrail fournit un journal d'audit pour votre compte AWS. Datadog consulte ce journal d'audit et crée des événements. Effectuez des recherches sur ces événements au sein de votre flux d'événements Datadog ou utilisez-les pour corréler des éléments dans vos dashboards. Voici un exemple d'événement CloudTrail :

{{< img src="integrations/amazon_cloudtrail/cloudtrail_event.png" alt="événement cloudtrail" popup="true">}}

Pour plus d'informations sur les autres services AWS, consultez [la page relative à l'intégration Amazon Web Services][1].

**Remarque** : l'intégration CloudTrail ne prend **pas** en charge les [journaux de suivi pour les organisations][2].

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte d'événements

1. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] pour recueillir des métriques Amazon CloudTrail. Pour en savoir plus sur les stratégies CloudTrail, [consultez la documentation sur le site Web d'AWS][4]. CloudTrail nécessite également certaines autorisations S3 pour accéder aux journaux de suivi. **Ces autorisations sont requises uniquement pour le compartiment CloudTrail**. Pour en savoir plus sur les stratégies Amazon S3, [consultez la documentation sur le site Web d'AWS][5].

    | Autorisation AWS              | Description                                                     |
    | --------------------------- | --------------------------------------------------------------- |
    | `cloudtrail:DescribeTrails` | Répertorie les journaux de suivi et le compartiment s3 dans lequel elles sont stockées.        |
    | `cloudtrail:GetTrailStatus` | Ignore les journaux de suivi inactifs.                                          |
    | `s3:ListBucket`             | Répertorie les objets dans le compartiment CloudTrail pour obtenir les journaux de suivi disponibles. |
    | `s3:GetBucketLocation`      | Obtient la région du compartiment pour télécharger les journaux de suivi.                 |
    | `s3:GetObject`              | Récupère les journaux de suivi disponibles.                                       |
    | `s3:ListObjects`            | Renvoie une partie ou l'ensemble (jusqu'à 1 000) des objets dans un compartiment.   |

   Ajoutez cette stratégie à votre stratégie IAM Datadog principale déjà existante :

    ```json
    {
        "Sid": "AWSDatadogPermissionsForCloudtrail",
        "Effect": "Allow",
        "Principal": {
            "AWS": "<ARN_FROM_MAIN_AWS_INTEGRATION_SETUP>"
        },
        "Action": ["s3:ListBucket", "s3:GetBucketLocation", "s3:GetObject", "s3:ListObjects"],
        "Resource": [
            "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>",
            "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>/*"
        ]
    }
    ```

    **Remarque** : l'ARN principal est celui spécifié [durant le processus d'installation de l'intégration AWS principale][6]. Si vous mettez à jour votre stratégie (au lieu d'en ajouter une nouvelle), vous n'aurez besoin ni du `SID` ni du `Principal`.

2. Installez l'[intégration Datadog/AWS CloudTrail][3] :
   Depuis le carré de l'intégration, sélectionnez les types d'événements à afficher en priorité normale (le filtre par défaut) dans le flux d'événements Datadog. Les comptes que vous avez configurés dans le carré d'Amazon Web Services apparaissent également ici. Pour visualiser les événements qui ne sont pas mentionnés ici, contactez [l'assistance Datadog][7].

### Collecte de logs

#### Activer la journalisation Cloudtrail

Lorsque vous définissez vos journaux de suivi, sélectionnez un compartiment S3 dans lequel écrire les logs :

{{< img src="integrations/amazon_cloudtrail/cloudtrail_logging.png" alt="Journalisation Cloudtrail" popup="true" style="width:70%;">}}

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][8].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 contenant vos logs Cloudtrail dana la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs :
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuration déclencheur S3" popup="true" style="width:70%;">}}
   Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs Cloudtrail et remplacez le type d'événement par `Object Created (All)`. Cliquez ensuite sur le bouton Add.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuration déclencheur Lambda S3" popup="true" style="width:70%;">}}

Une fois ces étapes terminées, les logs s'affichent dans votre [Datadog Log Explorer][9].

## Données collectées

### Métriques

L'intégration AWS Cloudtrail n'inclut aucune métrique.

### Événements

L'intégration AWS Cloudtrail crée de nombreux événements en fonction du journal d'audit AWS Cloudtrail. Tous les événements dans votre [flux d'événements][10] Datadog se voient assigner le tag `#cloudtrail`. Vous pouvez définir leur priorité dans la configuration de l'intégration.

Voici la liste des événements CloudTrail qui peuvent avoir une priorité normale (afin de s'afficher dans le flux d'événements sous le filtre par défaut) :

* apigateway 
* autoscaling 
* cloudformation 
* cloudfront 
* cloudsearch 
* cloudtrail 
* codedeploy 
* codepipeline 
* config 
* datapipeline  
* ds 
* ec2 
* ecs 
* elasticache 
* elasticbeanstalk 
* elasticfilesystem 
* elasticloadbalancing 
* elasticmapreduce 
* iam 
* kinesis 
* lambda 
* monitoring 
* opsworks 
* rds 
* redshift 
* route53 
* s3 
* ses 
* signin 
* ssm

### Checks de service

L'intégration AWS Cloudtrail n'inclut aucun check de service.

## Dépannage

### Le carré CloudTrail ne s'affiche pas ou aucun compte n'est affiché

Pour configurer le carré CloudTrail, vous devez d'abord configurer le [carré Amazon Web Services][11].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudtrail
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_cloudtrail.html
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_s3.html
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[7]: https://docs.datadoghq.com/fr/help/
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[9]: https://app.datadoghq.com/logs
[10]: https://docs.datadoghq.com/fr/events/
[11]: https://docs.datadoghq.com/fr/integrations/aws/
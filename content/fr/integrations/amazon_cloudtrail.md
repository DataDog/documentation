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
  - security
ddtype: crawler
dependencies: []
description: Recevez des alertes concernant toute activité suspecte sur un compte AWS.
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
draft: false
git_integration_title: amazon_cloudtrail
has_logo: true
integration_id: amazon-cloudtrail
integration_title: AWS CloudTrail
integration_version: ''
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


## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte d'événements

**Remarque** : l'intégration Datadog/CloudTrail exige que les événements soient recueillis dans un compartiment CloudTrail.

1. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][2] pour recueillir des métriques AWS CloudTrail. Pour en savoir plus sur les stratégies CloudTrail, consultez la [documentation de référence sur les API AWS CloudTrail][3]. CloudTrail nécessite également certaines autorisations S3 pour accéder aux pistes. **Ces autorisations sont requises uniquement pour le compartiment CloudTrail**. Pour en savoir plus sur les stratégies Amazon S3, consultez la [documentation de référence sur les API Amazon S3][4].

    | Autorisation AWS              | Description                                                     |
    | --------------------------- | --------------------------------------------------------------- |
    | `cloudtrail:DescribeTrails` | Répertorie les journaux de suivi et le compartiment s3 dans lequel elles sont stockées.        |
    | `cloudtrail:GetTrailStatus` | Ignore les journaux de suivi inactifs.                                          |
    | `s3:ListBucket`             | Répertorie les objets dans le compartiment CloudTrail pour obtenir les journaux de suivi disponibles. |
    | `s3:GetBucketLocation`      | Obtient la région du compartiment pour télécharger les journaux de suivi.                 |
    | `s3:GetObject`              | Récupère les journaux de suivi disponibles.                                       |
    | `organizations:DescribeOrganization` | Renvoie des informations concernant l'organisation d'un compte (nécessaire pour les pistes d'organisation). |

   Ajoutez cette stratégie à votre stratégie IAM Datadog principale déjà existante :

    ```json
    {
        "Sid": "AWSDatadogPermissionsForCloudtrail",
        "Effect": "Allow",
        "Principal": {
            "AWS": "<ARN_FROM_MAIN_AWS_INTEGRATION_SETUP>"
        },
        "Action": ["s3:ListBucket", "s3:GetBucketLocation", "s3:GetObject"],
        "Resource": [
            "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>",
            "arn:aws:s3:::<YOUR_S3_CLOUDTRAIL_BUCKET_NAME>/*"
        ]
    }
    ```

   **Remarque** : l'ARN principal est celui spécifié durant le processus d'installation de l'intégration AWS principale. Consultez la section Resources de la page [Fonctionnement d'AWS CloudTrail avec IAM][5] pour en savoir plus sur les ARN des ressources CloudTrail. Si vous mettez à jour de votre stratégie (au lieu d'en ajouter une nouvelle), vous n'aurez besoin ni du `SID` ni du `Principal`.

2. Installez l'[intégration Datadog/AWS CloudTrail][2] :
   Depuis le carré de l'intégration, sélectionnez le type d'événement à afficher en priorité normale (le filtre par défaut) dans le flux d'événements Datadog. Les comptes que vous avez configurés dans le carré d'Amazon Web Services apparaissent également ici. Pour visualiser les événements qui ne sont pas mentionnés ici, contactez l'[assistance Datadog][6].

### Collecte de logs

#### Activer le logging

Lorsque vous définissez vos journaux de suivi, sélectionnez un compartiment S3 dans lequel écrire les logs :

{{< img src="integrations/amazon_cloudtrail/cloudtrail_logging.png" alt="Journalisation CloudTrail" popup="true" style="width:70%;">}}

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][7].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 contenant vos logs CloudTrail dans la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs :
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuration déclencheur S3" popup="true" style="width:70%;">}}
   Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs CloudTrail et remplacez le type d'événement par `Object Created (All)`. Cliquez ensuite sur le bouton Add :
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuration déclencheur Lambda S3" popup="true" style="width:70%;">}}

Une fois ces étapes terminées, les logs s'affichent dans votre [Datadog Log Explorer][8].

## Données collectées

### Métriques

L'intégration AWS CloudTrail n'inclut aucune métrique.

### Événements

L'intégration AWS CloudTrail crée de nombreux événements en fonction du journal d'audit AWS CloudTrail. Tous les événements dans votre [flux d'événements][9] Datadog se voient assigner le tag `#cloudtrail`. Vous pouvez définir leur priorité dans la configuration de l'intégration.

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

L'intégration AWS CloudTrail n'inclut aucun check de service.

## Dépannage

### Le carré CloudTrail ne s'affiche pas ou aucun compte n'est indiqué

Pour configurer le carré CloudTrail, vous devez d'abord configurer le [carré Amazon Web Services][10].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudtrail
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_Operations.html
[4]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html
[5]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/security_iam_service-with-iam.html#security_iam_service-with-iam-id-based-policies-resources
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[8]: https://app.datadoghq.com/logs
[9]: https://docs.datadoghq.com/fr/events/
[10]: https://docs.datadoghq.com/fr/integrations/aws/
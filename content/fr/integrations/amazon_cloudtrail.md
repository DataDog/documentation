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
dependencies: []
description: Recevez des alertes concernant toute activité suspecte sur un compte
  AWS.
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
public_title: Intégration Datadog/AWS CloudTrail
short_description: Recevez des alertes concernant toute activité suspecte sur un compte
  AWS.
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

Dans AWS CloudTrail, [créez un journal de suivi][7] et sélectionnez un compartiment S3 dans lequel écrire les logs.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][8] dans votre compte AWS.
2. Une fois configuré, accédez à la fonction Lambda du Forwarder Datadog. Dans la section Présentation de Functions, cliquez sur **Add Trigger**.
3. Sélectionnez le déclencheur **S3** pour la Trigger Configuration.
4. Sélectionnez le compartiment S3 où se trouvent vos logs CloudTrail.
5. Ne changez pas le type d'événements `All object create events`.
6. Cliquez sur **Add** pour ajouter le déclencheur à votre fonction Lambda.

Accédez au [Log Explorer][9] pour commencer à explorer vos logs.

Pour en savoir plus sur la collecte de logs de service AWS, consultez la section [Envoyer des logs de service AWS avec la fonction Lambda Datadog][10].

## Données collectées

### Métriques

L'intégration AWS CloudTrail n'inclut aucune métrique.

### Événements

L'intégration AWS CloudTrail crée de nombreux événements basés sur le journal d'audit AWS CloudTrail. Tous les événements dans votre [flux d'événements][11] Datadog se voient assigner le tag `#cloudtrail`. Vous pouvez définir leur priorité dans la configuration de l'intégration.

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

Pour configurer le carré CloudTrail, vous devez d'abord configurer le [carré Amazon Web Services][12].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudtrail
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_Operations.html
[4]: https://docs.aws.amazon.com/AmazonS3/latest/API/API_Operations.html
[5]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/security_iam_service-with-iam.html#security_iam_service-with-iam-id-based-policies-resources
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[8]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[9]: https://app.datadoghq.com/logs
[10]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[11]: https://docs.datadoghq.com/fr/events/
[12]: https://docs.datadoghq.com/fr/integrations/aws/
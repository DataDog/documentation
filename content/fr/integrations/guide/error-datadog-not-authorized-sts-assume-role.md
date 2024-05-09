---
aliases:
- /fr/integrations/faq/error-datadog-not-authorized-sts-assume-role
further_reading:
- link: /integrations/amazon_web_services/#installation
  tag: Documentation
  text: Installation AWS/Datadog
kind: guide
title: 'Erreur : Datadog is not authorized to perform sts:AssumeRole'
---

Cette erreur indique généralement un problème avec la stratégie de confiance associée au rôle dʼintégration de Datadog. La plupart du temps, ce problème est causé par le [processus de délégation de rôle][1].

Vérifiez les points suivants pour le compte AWS mentionné dans l'erreur :

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Si vous avez créé un rôle IAM, assurez-vous que vous utilisez le bon nom de rôle IAM dans la [page de lʼintégration Datadog/AWS][2]. Des espaces ou des caractères supplémentaires dans AWS ou Datadog entraînent l'échec de la délégation de rôle. Si vous avez déployé le rôle à l'aide de CloudFormation, le nom de rôle IAM par défaut est défini sur [DatadogIntegrationRole][3].

2. Sur la page du rôle dʼintégration de Datadog dans AWS, sous lʼonglet **Trust relationships**, assurez-vous que le **Principal** est configuré comme suit :

{{< code-block lang="json" filename="" disable_copy="true" collapsible="false" >}}

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::464622532012:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<YOUR_AWS_EXTERNAL_ID>"
                }
            }
        }
    ]
}

{{< /code-block >}}

[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
{{< /site-region >}}
{{< site-region region="ap1" >}}
1. Si vous avez créé un rôle IAM, assurez-vous que vous utilisez le bon nom de rôle IAM dans la [page de lʼintégration Datadog/AWS][2]. Des espaces ou des caractères supplémentaires dans AWS ou Datadog entraînent l'échec de la délégation de rôle. Si vous avez déployé le rôle à l'aide de CloudFormation, le nom de rôle IAM par défaut est défini sur [DatadogIntegrationRole][3].

2. Sur la page du rôle dʼintégration de Datadog dans AWS, sous lʼonglet **Trust relationships**, assurez-vous que le **Principal** est configuré comme suit :

{{< code-block lang="json" filename="" disable_copy="true" collapsible="false" >}}

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::417141415827:root"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "<YOUR_AWS_EXTERNAL_ID>"
                }
            }
        }
    ]
}

{{< /code-block >}}

[2]: https://ap1.datadoghq.com/integrations/amazon-web-services
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws/datadog_integration_role.yaml
{{< /site-region >}}

3. L'ID externe AWS sur la page du rôle doit correspondre à la valeur de l'ID externe AWS de lʼonglet **Account Details** de la [page de lʼintégration AWS][2]. Mettez à jour le rôle IAM dans AWS avec la valeur de lʼID externe AWS de la page de lʼintégration dans Datadog, ou générez un nouvel ID externe AWS dans Datadog et cliquez sur **Save** :
  {{< img src="integrations/guide/aws_error_sts_assume_role/new-aws-external-id.png" alt="Page de lʼintégration AWS/Datadog avec les champs AWS Role Name et AWS External ID, ainsi que le bouton Generate New ID" >}}

4. Si vous avez généré un nouvel ID externe AWS, ajoutez-le à votre stratégie de confiance AWS :
  {{< img src="integrations/guide/aws_error_sts_assume_role/aws-trust-policy-document.png" alt="Document sur la stratégie de confiance AWS avec le paramètre sts:ExternalId mis en évidence" >}}

**Remarque** : une fois corrigée, l'erreur peut continuer à s'afficher dans l'interface pendant quelques heures, le temps que les modifications se propagent.

Si vous voyez l'erreur STS AssumeRole limitée à une ou plusieurs régions :
```
Datadog is not authorized to perform action sts:AssumeRole Account affected:<account_id> Regions affected: us-east-1, eu-west-1
```
La source du problème pourrait être liée aux [stratégies de contrôle du service AWS][4].
```
Les stratégies de contrôle du service (SCP) sont un type de stratégie d'organisation que vous pouvez utiliser pour gérer les autorisations dans votre organisation. Les SCP offrent un contrôle central sur les autorisations maximales disponibles pour tous les comptes de votre organisation. Les SCP vous permettent de vous assurer que vos comptes restent dans les limites des directives de contrôle d'accès de votre organisation.
```

Pour supprimer l'erreur dans la page de lʼintégration, vous pouvez exclure des régions dans votre intégration AWS sous lʼonglet **General**, ou utiliser l'API [Mettre à jour une intégration AWS][5].

Si vous n'avez pas résolu votre problème, contactez l'[assistance Datadog][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_web_services/?tab=roledelegation#setup
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html
[5]: https://docs.datadoghq.com/fr/api/latest/aws-integration/#update-an-aws-integration
[6]: /fr/help/
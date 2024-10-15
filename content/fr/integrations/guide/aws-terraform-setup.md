---
aliases:
- /fr/integrations/faq/aws-integration-with-terraform/
disable_toc: true
further_reading:
- link: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
  tag: Blog
  text: Gérer Datadog avec Terraform

title: Intégration AWS avec Terraform
---

L'utilisation de [Terraform][1] vous permet de créer le rôle IAM Datadog, le document de stratégie et l'intégration Datadog/AWS à l'aide d'une seule commande `terraform apply`.


1. Configurez le [fournisseur Terraform Datadog][2] pour interagir avec l'API Datadog via une configuration Terraform.

{{< site-region region="us,us3,us5,eu" >}}

2. Définissez votre fichier de configuration Terraform en utilisant l'exemple ci-dessous comme modèle. Mettez à jour les paramètres suivants avant d'appliquer les modifications :
   * `AWS_PERMISSIONS_LIST` : Les stratégies IAM requises pour les intégrations Datadog/AWS. La liste actuelle est disponible dans la documentation de l'[intégration Datadog/AWS][1].
   * `AWS_ACCOUNT_ID` : L'ID de votre compte AWS.

   Consultez la page sur la [ressource de l'intégration Datadog/AWS][2] dans le registre Terraform pour obtenir d'autres exemples d'utilisation, la liste complète des paramètres facultatifs, ainsi que des ressources Datadog supplémentaires.

   ```hcl
   data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
      statement {
      actions = ["sts:AssumeRole"]

      principals {
         type = "AWS"
         identifiers = ["arn:aws:iam::464622532012:root"]
      }
      condition {
         test = "StringEquals"
         variable = "sts:ExternalId"

         values = [
            "${datadog_integration_aws.sandbox.external_id}"
         ]
      }
      }
   }

   data "aws_iam_policy_document" "datadog_aws_integration" {
      statement {
      actions = [<AWS_PERMISSIONS_LIST>]

      resources = ["*"]
      }
   }

   resource "aws_iam_policy" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationPolicy"
      policy = "${data.aws_iam_policy_document.datadog_aws_integration.json}"
   }

   resource "aws_iam_role" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationRole"
      description = "Role for Datadog AWS Integration"
      assume_role_policy = "${data.aws_iam_policy_document.datadog_aws_integration_assume_role.json}"
   }

   resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
      role = "${aws_iam_role.datadog_aws_integration.name}"
      policy_arn = "${aws_iam_policy.datadog_aws_integration.arn}"
   }

   resource "datadog_integration_aws" "sandbox" {
      account_id  = "<AWS_ACCOUNT_ID>"
      role_name   = "DatadogAWSIntegrationRole"
   }
   ```

   [1]: /integrations/amazon_web_services/?tab=manual#aws-iam-permissions
   [2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="ap1" >}}

2. Définissez votre fichier de configuration Terraform en utilisant l'exemple ci-dessous comme modèle. Mettez à jour les paramètres suivants avant d'appliquer les modifications :
   * `AWS_PERMISSIONS_LIST` : Les stratégies IAM requises pour les intégrations Datadog/AWS. La liste actuelle est disponible dans la documentation de l'[intégration Datadog/AWS][1].
   * `AWS_ACCOUNT_ID` : L'ID de votre compte AWS.

   Consultez le [registre Terraform][2] pour obtenir d'autres exemples d'utilisation, la liste complète des paramètres facultatifs ainsi que des ressources Datadog supplémentaires.

   ```hcl
   data "aws_iam_policy_document" "datadog_aws_integration_assume_role" {
      statement {
      actions = ["sts:AssumeRole"]

      principals {
         type = "AWS"
         identifiers = ["arn:aws:iam::417141415827:root"]
      }
      condition {
         test = "StringEquals"
         variable = "sts:ExternalId"

         values = [
            "${datadog_integration_aws.sandbox.external_id}"
         ]
      }
      }
   }

   data "aws_iam_policy_document" "datadog_aws_integration" {
      statement {
      actions = [<AWS_PERMISSIONS_LIST>]

      resources = ["*"]
      }
   }

   resource "aws_iam_policy" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationPolicy"
      policy = "${data.aws_iam_policy_document.datadog_aws_integration.json}"
   }

   resource "aws_iam_role" "datadog_aws_integration" {
      name = "DatadogAWSIntegrationRole"
      description = "Role for Datadog AWS Integration"
      assume_role_policy = "${data.aws_iam_policy_document.datadog_aws_integration_assume_role.json}"
   }

   resource "aws_iam_role_policy_attachment" "datadog_aws_integration" {
      role = "${aws_iam_role.datadog_aws_integration.name}"
      policy_arn = "${aws_iam_policy.datadog_aws_integration.arn}"
   }

   resource "datadog_integration_aws" "sandbox" {
      account_id  = "<AWS_ACCOUNT_ID>"
      role_name   = "DatadogAWSIntegrationRole"
   }
   ```

[1]: /fr/integrations/amazon_web_services/?tab=manual#aws-iam-permissions
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
{{< /site-region >}}

{{< site-region region="gov" >}}

2. Si vous utilisez des clés d'accès pour installer l'intégration Datadog/AWS, assurez-vous d'avoir créé un utilisateur IAM disposant des [autorisations requises][1] ainsi que de la clé d'accès conformément aux instructions de la section [Guide de configuration manuelle d'AWS][3]. Remplacez les placeholders dans l'exemple ci-dessous par l'ID de la clé d'accès et la clé d'accès secrète. Pour en savoir plus sur l'utilisation de Terraform pour configurer l'utilisateur AWS et la clé d'accès associée, consultez les ressources [AWS Provider][2] dans le registre Terraform.

   ```
   resource "datadog_integration_aws" "sandbox" {
      access_key_id = "<ACCESS_KEY_ID>"
      secret_access_key = "<SECRET_ACCESS_KEY>"
   }
   ```

[1]: /fr/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly#aws-integration-iam-policy
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
[3]: /fr/integrations/guide/aws-manual-setup/?tab=accesskeysgovcloudorchinaonly#aws
{{< /site-region>}}

3. Exécutez `terraform apply`. Patientez 10 minutes le temps que les données commencent à être recueillies, puis accédez au [dashboard récapitulatif d'AWS][5] prêt à l'emploi pour visualiser les métriques envoyées par vos services et votre infrastructure AWS.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.terraform.io
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[5]: https://app.datadoghq.com/screen/integration/7/aws-overview
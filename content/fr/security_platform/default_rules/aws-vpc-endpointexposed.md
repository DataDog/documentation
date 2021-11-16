---
aliases:
  - /fr/cut-36a-zvo
  - /fr/security_monitoring/default_rules/cut-36a-zvo
  - /fr/security_monitoring/default_rules/aws-vpc-endpointexposed
cloud: aws
disable_edit: true
integration_id: amazon-vpc
kind: documentation
rule_category:
  - Cloud Configuration
scope: vpc
security: conformité
source: vpc
title: L'endpoint VPC n'est pas accessible au public
type: security_rules
---
## Description

Sécurisez votre endpoint VPC en autorisant uniquement les comptes AWS de confiance à y accéder.

## Raison

Les endpoints VPC accessibles au public risquent d'entraîner des pertes de données, des divulgations d'informations ainsi qu'une hausse inattendue de vos coûts AWS.

## Remédiation

### Console

Suivez les instructions de la page [Ajouter et supprimer des autorisations pour votre service de point de terminaison][1] relatives à la console AWS.

### Interface de ligne de commande

1. Modifiez la stratégie d'accès existante de votre endpoint Amazon VPC et remplacez les identifiants AWS non fiables. Pour créer un nouveau document de stratégie, utilisez le [générateur de stratégie AWS][2] (en anglais).

  {{< code-block lang="bash" filename="vpc-access-policy.json" >}}
  {
    "Id": "VPCCrossAccountAccessPolicy",
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": "*",
        "Effect": "Allow",
        "Resource": "*",
        "Principal": {
          "AWS": [
            "arn:aws:iam::0123456789012:root"
          ]
        }
      }
    ]
  }
  {{< /code-block >}}

2. Exécutez la commande `modify-vpc-endpoint` en indiquant votre [ID d'endpoint VPC et le nouveau document de stratégie][3], afin de remplacer la stratégie existante.

  {{< code-block lang="bash" filename="modify-vpc-endpoint.sh" >}}
  aws ec2 modify-vpc-endpoint
      --vpc-endpoint-id vpce-0a12b345
      --policy-document file://vpc-access-policy.json
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/privatelink/add-endpoint-service-permissions.html
[2]: https://awspolicygen.s3.amazonaws.com/policygen.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/modify-vpc-endpoint.html#synopsis
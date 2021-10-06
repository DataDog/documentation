---
aliases:
  - /fr/9ga-poq-w7v
  - /fr/security_monitoring/default_rules/9ga-poq-w7v
  - /fr/security_monitoring/default_rules/aws-lambda-vpcaccess
cloud: aws
disable_edit: true
integration_id: amazon-lambda
kind: documentation
rule_category:
  - Cloud Configuration
scope: lambda
security: conformité
source: lambda
title: La fonction Lambda a accès aux ressources du VPC
type: security_rules
---
## Description

Configurez votre fonction Amazon Lambda de façon à ce qu'elle ait accès aux ressources du VPC uniquement.

## Raison

Par défaut, les fonctions Amazon Lambda s'exécutent dans un VPC sécurisé avec un accès à n'importe quel service AWS et à Internet. Choisissez les ressources auxquelles l'accès est autorisé afin de sécuriser les connexions au sein de votre VPC privé.

## Remédiation

### Console

Consultez la documentation relative à la [configuration de l'accès au VPC (console)][1] pour configurer l'accès au VPC pour une fonction existante.

### Interface de ligne de commande

1. Exécutez `update-function-configuration` avec [le nom de votre fonction Amazon Lambda et la configuration de votre VPC][2]. Limitez la connectivité réseau aux ressources AWS au sein du VPC configuré.

   {{< code-block lang="bash" filename="update-function-configuration.sh" >}}
   aws lambda update-function-configuration
       --function-name nom-de-votre-fonction-lambda
       --vpc-config SubnetIds="subnet-ab12cd34","subnet-12345678",SecurityGroupIds="id-0abcd1234abcd5678"
   {{< /code-block >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#vpc-configuring
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/lambda/update-function-configuration.html#synopsis
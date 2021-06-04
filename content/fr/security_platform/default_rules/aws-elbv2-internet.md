---
aliases:
  - /fr/b0y-o61-ai4
  - /fr/security_monitoring/default_rules/b0y-o61-ai4
  - /fr/security_monitoring/default_rules/aws-elbv2-internet
cloud: aws
disable_edit: true
integration_id: amazon-elbv2
kind: documentation
rule_category:
  - Cloud Configuration
scope: elbv2
security: conformité
source: elbv2
title: Répartiteur de charge ELBv2 non accessible sur Internet
type: security_rules
---
## Description

Sécurisez vos Application Load Balancers (ALB) ou Network Load Balancers (NLB) avec un répartiteur de charge ELBv2 interne.

## Raison

Les répartiteurs de charge accessibles sur Internet reçoivent un nom DNS public. Sécurisez votre connexion en utilisant plutôt un répartiteur de charge ELBv2.

## Remédiation

### Console

Consultez la documentation relative à la [création d'un répartiteur de charge d'application][1] pour découvrir comment créer un répartiteur de charge interne qui achemine les requêtes vers leurs cibles via des adresses IP privées.

### Interface de ligne de commande

Exécutez `create-load-balancer` avec [un nom, un schéma et un sous-réseau de répartiteur de charge][2].

    {{< code-block lang="bash" filename="create-load-balancer.sh" >}}
    aws elbv2 create-load-balancer
    --name my-internal-load-balancer
    --scheme internal
    --subnets subnet-b7d581c0 subnet-8360a9e7
    {{< /code-block >}}

Consultez la documentation relative à la commande AWS [create-load-balancer][2] pour créer un répartiteur de charge pour un réseau ou une passerelle.

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html#configure-load-balancer
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elbv2/create-load-balancer.html#synopsis
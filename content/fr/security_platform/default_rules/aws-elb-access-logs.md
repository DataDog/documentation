---
aliases:
  - /fr/eag-4ke-cj4
  - /fr/security_monitoring/default_rules/eag-4ke-cj4
  - /fr/security_monitoring/default_rules/aws-elb-access-logs
cloud: aws
disable_edit: true
integration_id: amazon-elb
kind: documentation
rule_category:
  - Cloud Configuration
scope: elb
security: conformité
source: elb
title: ELB génère des logs d'accès
type: security_rules
---
## Description

Configurez la journalisation pour vos Elastic Load Balancers (ELB) AWS pour identifier les problèmes de sécurité.

## Raison

Les journaux d'événements d'accès vous permettent d'analyser chaque requête TCP ou HTTP, qui sont particulièrement utiles durant les audits ou le processus de dépannage.

## Remédiation

### Console

Consultez la documentation relative à l'[activation des logs d'accès pour vos Classic Load Balancer][1] pour apprendre à activer la journalisation pour vos ELB.

### Interface de ligne de commande

1. Exécutez `create-bucket` pour [créer un compartiment S3][2] qui stocke les fichiers de log des ELB.

    **Remarque** : ce compartiment doit être créé dans la même région que l'ELB.

    {{< code-block lang="bash" filename="create-bucket.sh" >}}
    aws s3api create-bucket
        --region us-west-1
        --bucket votre-compartiment-de-journalisation-elb
    {{< /code-block >}}

2. Utilisez [AWS Policy Generator][3] pour créer une nouvelle stratégie.

3. Exécutez `put-bucket-policy` pour [associer le document de stratégie][4] au compartiment S3.

    {{< code-block lang="bash" filename="put-bucket-policy.sh" >}}
    aws s3api put-bucket-policy
        --bucket votre-compartiment-de-journalisation-elb
        --policy file://elb-logging-policy.json
    {{< /code-block >}}

4. Exécutez `modify-load-balancer-attributes` pour [activer le logging][5] pour l'ELB sélectionné.

    {{< code-block lang="bash" filename="modify-load-balancer-attributes.sh" >}}
    aws elb modify-load-balancer-attributes
        --region us-west-1
        --load-balancer-name NomDuLoadBalancer
        --load-balancer-attributes
        "{\"AccessLog\":{\"Enabled\":true,\"EmitInterval\":60,\"S3BucketName\":\"votre-compartiment-de-journalisation\"}}"
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/create-bucket.html
[3]: http://awspolicygen.s3.amazonaws.com/policygen.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-policy.html
[5]: https://docs.aws.amazon.com/cli/latest/reference/elb/modify-load-balancer-attributes.html
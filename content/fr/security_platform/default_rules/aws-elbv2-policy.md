---
aliases:
  - /fr/vn4-vpi-u7q
  - /fr/security_monitoring/default_rules/vn4-vpi-u7q
  - /fr/security_monitoring/default_rules/aws-elbv2-policy
cloud: aws
disable_edit: true
integration_id: amazon-elbv2
kind: documentation
rule_category:
  - Cloud Configuration
scope: elbv2
security: conformité
source: elbv2
title: Le répartiteur de charge ELBv2 utilise la stratégie de sécurité la plus récente
type: security_rules
---
## Description

Sécurisez votre Amazon Application Load Balancer (ALB) avec la stratégie de sécurité AWS prédéfinie la plus récente.

## Raison

Les stratégies de sécurité non sécurisées ou obsolètes peuvent exposer le client et le répartiteur de charge à diverses vulnérabilités SSL/TLS.

## Remédiation

### Console

Consultez la documentation relative à la [mise à jour de la stratégie de sécurité][1] pour découvrir comment mettre à jour votre écouteur HTTPS avec la stratégie de sécurité la plus récente.

### Interface de ligne de commande

Exécutez `modify-listener` avec l'[ARN de l'écouteur et la stratégie SSL conseillée][2].

    {{< code-block lang="bash" filename="create-listener.sh" >}}
    aws elbv2 create-listener
        --load-balancer-arn arn:aws:elasticloadbalancing:region:123456789012:loadbalancer/app/my-load-balancer/12ab3c456d7e8912
        --ssl-policy ELBSecurityPolicy-2016-08 --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:region:123456789012:targetgroup/my-targets/12ab3c456d7e8912
    {{< /code-block >}}

Consultez la documentation relative aux [stratégies de sécurité][3] pour découvrir les stratégies de sécurité conseillées par Amazon.

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-certificates.html#update-security-policy
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elbv2/modify-listener.html
[3]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies
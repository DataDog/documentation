---
aliases:
  - /fr/ix9-ih4-ucg
  - /fr/security_monitoring/default_rules/ix9-ih4-ucg
  - /fr/security_monitoring/default_rules/aws-elbv2-listener
cloud: aws
disable_edit: true
integration_id: amazon-elbv2
kind: documentation
rule_category:
  - Cloud Configuration
scope: elbv2
security: conformité
source: elbv2
title: ELBv2 ALB utilisant un écouteur sécurisé
type: security_rules
---
## Description

Utilisez le protocole HTTPS pour sécuriser les communications entre le client de votre application et l'écouteur de votre répartiteur de charge élastique (ELB).

## Raison

Sans écouteur HTTPS, les connexions frontend peuvent être exploitées, par exemple avec des attaques de type man-in-the-middle. En sécurisant toutes vos connexions entre le client de votre application et l'écouteur du répartiteur de charge élastique, vous protégez vos données sensibles.

## Remédiation

### Console

Suivez les instructions de la section [Création d'un écouteur HTTPS pour votre Application Load Balancer[1] pour découvrir comment créer un écouteur qui analyse les requêtes de connexion.

### Interface de ligne de commande

1. Exécutez `list-certificates` pour récupérer l'ARN de votre certificat SSL. Si vous n'avez pas de certificat SSL, suivez les instructions de la section [Création ou importation d'un certificat SSL/TLS à l'aide d'AWS Certificate Manager][2].
2. Exécutez `create-listener` en utilisant l'[ARN du répartiteur de charge et du certificat SSL][3].

    {{< code-block lang="bash" filename="create-listener.sh" >}}
    aws elbv2 create-listener
        --load-balancer-arn arn:aws:elasticloadbalancing:region:123456789012:loadbalancer/app/my-load-balancer/12ab3c456d7e8912
        --protocol HTTPS
        --port 443
        --certificates CertificateArn=arn:aws:acm:region:123456789012:certificate/1abc0c41-bd73-5445-9ab9-123456a23456
        --ssl-policy ELBSecurityPolicy-2016-08 --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:region:123456789012:targetgroup/my-targets/12ab3c456d7e8912
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html
[2]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/ssl-server-cert.html#create-certificate-acm
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elbv2/create-listener.html
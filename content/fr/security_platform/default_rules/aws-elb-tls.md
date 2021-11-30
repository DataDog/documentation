---
aliases:
  - /fr/7fc-0mg-8e0
  - /fr/security_monitoring/default_rules/7fc-0mg-8e0
  - /fr/security_monitoring/default_rules/aws-elb-tls
cloud: aws
disable_edit: true
integration_id: amazon-elb
kind: documentation
rule_category:
  - Cloud Configuration
scope: elb
security: conformité
source: elb
title: L'écouteur de l'ELB utilise le protocole TLSv1.2
type: security_rules
---
## Description

Mettez à jour l'écouteur de votre Elastic Load Balancer (ELB) vers le protocole TLS v1.2+.

## Raison

Les protocoles TLS non sécurisés ou obsolètes sont vulnérables à des failles, telles que le [SSL stripping et diverses autres attaques][1]. Utilisez une version 1.2+ du protocole TLS pour assurer la confidentialité et la sécurité de vos données lorsqu'une connexion est établie entre le client et le serveur.

## Remédiation

### Console

Consultez les instructions [Mettre à jour une stratégie de sécurité][2] pour découvrir comment modifier un écouteur HTTPS dans la console AWS.

### Interface de ligne de commande

1. Exécutez `modify-listener` avec le flag `ssl-policy` pour définir une nouvelle stratégie. Consultez la [documentation de l'interface de ligne de commande AWS][3] pour obtenir des exemples.

[1]: https://tools.ietf.org/html/rfc7457#page-3
[2]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-certificates.html#update-security-policy
[3]: https://docs.aws.amazon.com/cli/latest/reference/elbv2/modify-listener.html#examples
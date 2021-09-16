---
aliases:
  - /fr/1th-739-cyc
  - /fr/security_monitoring/default_rules/1th-739-cyc
  - /fr/security_monitoring/default_rules/aws-elb-ssl
cloud: aws
disable_edit: true
integration_id: amazon-elb
kind: documentation
rule_category:
  - Cloud Configuration
scope: elb
security: conformité
source: elb
title: L'ELB utilise des protocoles SSL sécurisés
type: security_rules
---
## Description

Mettez à jour le SSL (Secure Socket Layer) de vos ELB (Elastic Load Balancers) pour remplacer les protocoles non sécurisés ou obsolètes, tels que SSLv2, SSLv3 et TLSv1.

## Raison

Un ELB dont la stratégie de sécurité utilise des protocoles non sécurisés ou obsolètes est vulnérable à diverses failles, telles que les attaques [POODLE][1] et [DROWN][2].

## Remédiation

### Console

Suivez les instructions [Mettre à jour un écouteur HTTPS pour votre Application Load Balancer][3] pour découvrir comment mettre à jour votre stratégie de sécurité avec un écouteur HTTPS modifié.

### Interface de ligne de commande

1. Exécutez `modify-listener` avec le flag `ssl-policy` pour définir une nouvelle stratégie SSL. Vous pouvez également modifier le protocole à l'aide du flag `--protocol`. Consultez la [documentation de l'interface de ligne de commande AWS][4] pour obtenir des exemples.

[1]: https://en.wikipedia.org/wiki/POODLE
[2]: https://en.wikipedia.org/wiki/DROWN_attack
[3]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-certificates.html
[4]: https://docs.aws.amazon.com/cli/latest/reference/elbv2/modify-listener.html#examples
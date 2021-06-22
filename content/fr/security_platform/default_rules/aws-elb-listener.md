---
aliases:
  - /fr/31q-rfg-uiu
  - /fr/security_monitoring/default_rules/31q-rfg-uiu
  - /fr/security_monitoring/default_rules/aws-elb-listener
cloud: aws
disable_edit: true
integration_id: amazon-elb
kind: documentation
rule_category:
  - Cloud Configuration
scope: elb
security: conformité
source: elb
title: Vérifier que la configuration d'un écouteur ELB est sécurisée
type: security_rules
---
## Description

Utilisez un protocole sécurisé pour chiffrer la communication entre le client et vos Elastic Load Balancers (ELB).

## Raison

Les canaux de communication non sécurisés augmentent les risques d'attaques, notamment les attaques de type man-in-the-middle et les accès non autorisés aux données sensibles.

## Remédiation

### Console

Consultez la documentation relative à l'[ajout d'un écouteur HTTP][1] pour découvrir comment créer un écouteur HTTP dans la console AWS.

### Interface de ligne de commande

1. Exécutez `aws iam list-server-certificates` pour récupérer l'[ARN du certificat SSL][2] avec AWS IAM.

2. Exécutez `create-load-balancer-listeners` pour [créer un écouteur HTTPS][3] pour le répartiteur de charge sélectionné à l'aide des certificats SSL renvoyés lors de l'étape 1.

    {{< code-block lang="bash" filename="create-load-balancer-listeners.sh" >}}
    aws elb create-load-balancer-listeners
        --load-balancer-name YourLoadBalancerName
        --listeners Protocol=HTTPS, LoadBalancerPort=443, InstanceProtocol=HTTP, InstancePort=80, SSLCertificateId=arn:aws:iam::123456789123:server-certificate/YourSSLCertificate
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-listener.html#add-listener
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/list-server-certificates.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elb/create-load-balancer-listeners.html
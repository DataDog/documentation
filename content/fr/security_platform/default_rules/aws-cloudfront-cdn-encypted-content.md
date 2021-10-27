---
aliases:
  - /fr/7bd-206-905
  - /fr/security_monitoring/default_rules/7bd-206-905
  - /fr/security_monitoring/default_rules/aws-cloudfront-cdn-encypted-content
cloud: aws
disable_edit: true
integration_id: amazon-cloudfront
kind: documentation
rule_category:
  - Cloud Configuration
scope: cloudfront
security: conformité
source: cloudfront
title: Le view CloudFront est chiffré
type: security_rules
---
## Description

Assurez-vous que le réseau de diffusion de contenu (CDN) AWS CloudFront pour votre distribution utilise le protocole HTTPS pour envoyer et recevoir du contenu.

## Raison

Le protocole HTTPS permet d'assurer le chiffrement des communications pour votre distribution AWS CloudFront, ce qui réduit les risques d'attaques malveillantes de type interception de trafic, par exemple.

## Remédiation

### Console

Suivez la documentation relative à la [configuration de CloudFront pour forcer l'utilisation du HTTPS entre les viewers et CloudFront][3] afin de définir le paramètre ViewerProtocolPolicy sur « HTTPS only ».

### Interface de ligne de commande

1. Exécutez `get-distribution-config` avec votre ID de distribution AWS CloudFront pour récupérer les [informations de configuration de votre distribution][1].

    {{< code-block lang="bash" filename="get-distribution-config.sh" >}}
    aws cloudfront get-distribution-config
        --id ID000000000000
    {{< /code-block >}}

2. Dans un nouveau fichier JSON, modifiez la configuration renvoyée. Définissez `ViewerProtocolPolicy` sur `https-only` et enregistrez le fichier de configuration.

    {{< code-block lang="json" filename="https-only.sh" >}}
    {
      "ETag": "ETAG0000000000",
      "DistributionConfig": {
        "Origins": {
          "ViewerProtocolPolicy": "https-only",
          ...
        }
      }
    }
    {{< /code-block >}}

3. Exécutez `update-distribution` pour [mettre à jour votre distribution][2] avec la valeur du paramètre `id` de votre distribution, le chemin du fichier de configuration (créé lors de l'étape 2) et votre `etag`.

    {{< code-block lang="bash" filename="update-distribution.sh" >}}
    aws cloudfront update-distribution
        --id ID000000000000
        --distribution-config https-only.json
        --if-match ETAG0000000000
    {{< /code-block >}}

[1]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/get-distribution-config.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudfront/update-distribution.html
[3]: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-viewers-to-cloudfront.html
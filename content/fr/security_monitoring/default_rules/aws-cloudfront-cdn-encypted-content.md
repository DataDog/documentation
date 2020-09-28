---
aliases:
  - /fr/7bd-206-905
cloud: aws
disable_edit: true
kind: documentation
rule_category:
  - Configuration de cloud
scope: cloudfront
security: compliance
source: cloudfront
title: Stratégie de protocole pour l'accès au contenu CloudFront
type: security_rules
---
## Présentation

### Description

Assurez-vous que le réseau de diffusion de contenu (CDN) AWS CloudFront pour votre distribution utilise le protocole HTTPS pour envoyer et recevoir du contenu.

### Meilleure pratique

Le protocole HTTPS permet d'assurer le chiffrement des communications pour votre distribution AWS CloudFront, ce qui réduit les risques d'attaques malveillantes de type interception de trafic, par exemple.

### Étapes à suivre

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
---
title: Sécurité de la surveillance Synthetic
kind: documentation
aliases:
  - /fr/synthetics/security/
further_reading:
  - link: /security/
    tag: Documentation
    text: Consulter les principales catégories de données envoyées à Datadog
---
<div class="alert alert-info">Cette page est consacrée à la sécurité de Datadog ; si vous recherchez le produit Security Monitoring, consultez la section <a href="/security_monitoring" target="_blank">Security Monitoring</a>.</div>

Cet article fait partie d'une [série d'articles sur la sécurité des données][1].

La [solution de surveillance Synthetic][2] vous permet d'effectuer un suivi proactif des performances de vos systèmes et de vos applications, à l'aide de requêtes et de transactions commerciales fictives. Les tests Synthetic peuvent être initiés depuis n'importe quel pays, à partir d'emplacements gérés ou privés.

## Sécurité des données

### Chiffrement dans les emplacements gérés

#### Configurations et variables des tests

* **Transport** : chiffrement asymétrique (RSA, clé 4096 bits). Toutes les requêtes sont signées à l'aide du processus Signature v1 Datadog (qui fonctionne selon la même logique que le processus [AWS Signature v4][3]), afin de garantir leur authentification et leur intégrité.
* **Stockage** : chiffrement symétrique (AES-GCM, clé 256 bits).

#### Résultats des tests

* **Transport** : chiffrement asymétrique (RSA, clé 4096 bits). Toutes les requêtes sont signées à l'aide du processus Signature v1 Datadog (qui fonctionne selon la même logique que le processus [AWS Signature v4][3]), afin de garantir leur authentification et leur intégrité.
* **Stockage** : les éléments confidentiels (le corps et les en-têtes de réponse) des résultats des tests sont stockés avec un chiffrement asymétrique (RSA, clé 4096 bits). Ils sont déchiffrés en temps réel lors de la récupération des résultats des tests.

#### Artefacts

Les artefacts désignent les captures d'écran, snapshots, erreurs et ressources des tests Browser.

{{< site-region region="us,us3,gov" >}}

* **Stockage **: chiffrement pour les [compartiments AWS S3][1].
* **Transport **: chiffrement pendant le transfert à l'aide du processus [AWS Signature version 4 pour S3][2].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Stockage** : chiffrement par le biais de [comptes de service dans GCS][1] (à l'aide de [AES256][2]).
* **Transport** : chiffrement durant le transfert à l'aide des processus [d'authentification, d'intégrité, et de chiffrement de GCS][3].

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption
[3]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

### Chiffrement dans les emplacements privés

#### Identifiants des emplacements privés

* **Stockage** : les identifiants d'emplacements privés utilisés pour signer les configurations, les variables et les requêtes de résultat des tests sont stockés de manière chiffrée (chiffrement symétrique - AES-GCM), avec une journalisation de l'audit et des stratégies d'accès.

#### Configurations et variables des tests

* **Transport** : chiffrement asymétrique (RSA, clé 4096 bits). Les communications entre les emplacements privés et Datadog sont sécurisées à l'aide du processus Signature v1 Datadog (qui fonctionne selon la même logique que le processus [AWS Signature v4][3]), afin de garantir leur authentification et leur intégrité.
* **Stockage** : chiffrement symétrique (AES-GCM, clé 256 bits).

#### Résultats des tests

* **Transport** : chiffrement asymétrique (RSA, clé 4096 bits). Les communications entre les emplacements privés et Datadog sont sécurisées à l'aide du processus Signature v1 Datadog (qui fonctionne selon la même logique que le processus [AWS Signature v4][3]), afin de garantir leur authentification et leur intégrité.

* **Stockage** : les éléments confidentiels (par défaut, le corps et les en-têtes de réponse) des résultats des tests sont stockés avec un chiffrement asymétrique (RSA, clé 4096 bits). Ils sont déchiffrés en temps réel lors de la récupération des résultats des tests.

#### Artefacts

Les artefacts désignent les captures d'écran, snapshots, erreurs et ressources des tests Browser.

{{< site-region region="us,us3,gov" >}}

* **Stockage** : chiffrement pour [AWS][1].
* **Transport** : transport HTTPS entre l'emplacement privé et Datadog (authentification par clé d'API). Avant d'être stockées, les données transférées par Datadog sont chiffrées à l'aide du [processus AWS Signature Version 4 pour S3][2].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Stockage** : chiffrement par le biais de [comptes de service dans GCS][1] (à l'aide de [AES256][2]).
* **Transport** : transport HTTPS entre l'emplacement privé et Datadog (authentification par clé d'API). Avant d'être stockées, les données transférées par Datadog sont chiffrées à l'aide des processus [d'authentification, d'intégrité et de chiffrement de GCS][3].

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption
[3]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

## Comptes dédiés au testing

Il est fortement recommandé d'utiliser des comptes dédiés au testing pour vos tests Synthetic.

## Stockage des secrets

Vous pouvez stocker des secrets dans des [variables globales][4] grâce à la fonctionnalité d'obfuscation, afin de veiller à ce que les valeurs des variables globales ne dévoilent en aucun cas les configurations et résultats de vos tests. Les [autorisations RBAC relatives aux variables globales][5] permettent ensuite de restreindre l'accès à ces dernières.

## Options de confidentialité

Modifiez les options de confidentialité des [tests API][6], [API à plusieurs étapes][7] et [Browser][8] pour limiter la quantité de données stockées dans les résultats des tests. Sachez néanmoins que ces restrictions peuvent complexifier le diagnostic des échecs.

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/
[2]: /fr/synthetics/
[3]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
[4]: /fr/synthetics/settings/?tab=specifyvalue#global-variables
[5]: /fr/account_management/rbac/permissions/#synthetic-monitoring
[6]: /fr/synthetics/api_tests/http_tests?tab=privacy#define-request
[7]: /fr/synthetics/multistep?tab=privacy#define-the-request 
[8]: /fr/synthetics/browser_tests/?tab=privacy#test-configuration
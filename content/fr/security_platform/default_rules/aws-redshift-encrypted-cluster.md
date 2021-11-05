---
aliases:
  - /fr/ca8-9ec-a27
  - /fr/security_monitoring/default_rules/ca8-9ec-a27
  - /fr/security_monitoring/default_rules/aws-redshift-encrypted-cluster
cloud: aws
disable_edit: true
integration_id: amazon-redshift
kind: documentation
rule_category:
  - Cloud Configuration
scope: redshift
security: conformité
source: redshift
title: Chiffrement des clusters Redshift
type: security_rules
---
## Description

Vérifiez que vos clusters AWS Redshift sont chiffrés.

## Raison

Le chiffrement de vos clusters Redshift protège vos données sensibles contre tout accès non autorisé.

## Remédiation

### Console

Suivez la documentation relative à l'[activation du chiffrement pour un cluster][5] afin de vous assurer que vos clusters sont chiffrés.

### Interface de ligne de commande

1. Exécutez `describe-clusters` avec l'[identifiant de votre cluster][1].

    {{< code-block lang="bash" filename="describe-cluster.sh" >}}
    aws redshift describe-clusters
        --cluster-identifier nom-cluster
    {{< /code-block >}}

2. Exécutez `create-cluster` à l'aide des détails de configuration renvoyés lors de la première étape, avec le [flag `encrypted`][2].

    {{< code-block lang="bash" filename="create-cluster.sh" >}}
    aws redshift create-cluster
        --cluster-identifier nom-cluster
        ...
        --encrypted
    {{< /code-block >}}

3. Exécutez `describe-cluster` avec un [filtre de requête][1] afin d'exposer la nouvelle adresse de l'endpoint.

    {{< code-block lang="bash" filename="describe-cluster.sh" >}}
    aws redshift describe-clusters
        --cluster-identifier cluster-name
        --query 'Clusters[*].Endpoint.Address'
    {{< /code-block >}}

4. Utilisez l'URL de l'endpoint du cluster avec l'outil [Unload/Copy d'Amazon Redshift][3].

5. Modifiez la configuration de votre cluster Redshift chiffré en indiquant la nouvelle URL de l'endpoint du cluster.

6. Après avoir modifié l'endpoint, exécutez `delete-cluster` afin de [supprimer l'ancien cluster non chiffré][4].

    {{< code-block lang="bash" filename="delete-cluster.sh" >}}
    aws redshift delete-cluster
        --cluster-identifier old-cluster
        --final-cluster-snapshot-identifier old-cluster-finalsnapshot
    {{< /code-block >}}

[1]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/describe-clusters.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/create-cluster.html
[3]: https://github.com/awslabs/amazon-redshift-utils/tree/master/src/UnloadCopyUtility
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/delete-cluster.html
[5]: https://docs.aws.amazon.com/redshift/latest/mgmt/changing-cluster-encryption.html
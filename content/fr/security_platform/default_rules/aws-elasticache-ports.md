---
aliases:
  - /fr/n11-17q-3pj
  - /fr/security_monitoring/default_rules/n11-17q-3pj
  - /fr/security_monitoring/default_rules/aws-elasticache-ports
cloud: aws
disable_edit: true
integration_id: amazon-elasticache
kind: documentation
rule_category:
  - Cloud Configuration
scope: elasticache
security: conformité
source: elasticache
title: Le cluster ElastiCache n'utilise pas de ports par défaut
type: security_rules
---
## Description

Modifiez le port d'endpoint de votre cluster AWS ElastiCache afin de ne pas utiliser un port par défaut.

## Raison

L'utilisation du port par défaut expose les clusters à des failles et des attaques. Configurez un port personnalisé pour renforcer la sécurité de vos clusters.

## Remédiation

### Console

Consultez la documentation relative à la [recherche d'endpoints de connexion][1] depuis la console pour découvrir comment rechercher et modifier le port d'endpoint de votre cluster.

### Interface de ligne de commande

1. Exécutez `aws elasticache describe-cache-clusters` avec votre [ID de cluster ElastiCache][2] pour obtenir la configuration de cluster existante.

  {{< code-block lang="bash" filename="describe-cache-clusters.sh" >}}

  aws elasticache describe-cache-clusters
    --cache-cluster-id votre-id-cc

  {{< /code-block >}}

2. Exécutez `aws elasticache create-cache-cluster` avec les données de cluster renvoyées dans l'étape précédente. Configurez le nouveau cluster de cache avec [une valeur personnalisée][3] pour le port d'endpoint. Les métadonnées du nouveau cluster sont alors renvoyées.

  {{< code-block lang="bash" filename="create-cache-cluster.sh" >}}

  aws elasticache create-cache-cluster
    --cache-cluster-id nouvel-id-cc
    ...
    --port 10001

    {{< /code-block >}}

3. Une fois le port d'endpoint de cluster mis à jour, supprimez l'ancien cluster ElastiCache. Exécutez `delete-cache-cluster` avec [l'ID de cluster d'origine][4].

  {{< code-block lang="bash" filename="delete-cache-cluster.sh" >}}

  aws elasticache delete-cache-cluster
    --cache-cluster-id votre-id-cc

  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/Endpoints.html#Endpoints.Find.Redis
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elasticache/describe-cache-clusters.html#synopsis
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elasticache/create-cache-cluster.html#synopsis
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elasticache/delete-cache-cluster.html#synopsis
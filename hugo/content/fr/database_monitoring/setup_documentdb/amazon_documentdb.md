---
title: Configurer Database Monitoring pour Amazon DocumentDB
---

Database Monitoring offre des informations détaillées sur vos bases de données Amazon DocumentDB (avec compatibilité MongoDB) en donnant accès à des métriques essentielles, des échantillons d'opérations, des plans d'explication et des changements d'état de réplication. Pour tirer parti de Database Monitoring pour Amazon DocumentDB, assurez-vous que l'Agent Datadog est installé et configuré pour se connecter à vos instances Amazon DocumentDB. Ce guide décrit les étapes de configuration de Database Monitoring pour Amazon DocumentDB.

## Avant de commencer

Versions majeures d'Amazon DocumentDB prises en charge
: 4.0.0, 5.0.0

Types de clusters Amazon DocumentDB pris en charge
: Clusters basés sur des instances.<br /><br />
**Remarque** : les clusters élastiques Amazon DocumentDB ne sont pas pris en charge.

{{% dbm-documentdb-before-you-begin %}}

## Configuration

Pour activer Database Monitoring pour votre base de données :

1. [Accorder à l'Agent l'accès à vos instances Amazon DocumentDB](#accorder-à-lagent-laccès-à-vos-instances-amazon-documentdb)
2. [Installer et configurer l'Agent](#installer-et-configurer-lagent)
3. [(Facultatif) Installer l'intégration Amazon DocumentDB](#installer-lintégration-amazon-documentdb)

### Accorder à l'Agent l'accès à vos instances Amazon DocumentDB

L'Agent Datadog nécessite un accès en lecture seule à l'instance Amazon DocumentDB pour collecter des statistiques et des requêtes.

Dans un shell Mongo, authentifiez-vous sur le nœud primaire du replica set, créez un utilisateur en lecture seule pour l'Agent Datadog dans la base de données `admin` et accordez les autorisations requises :

{{< code-block lang="shell" >}}

# Authentifiez-vous en tant qu'utilisateur admin.

use admin
db.auth("admin", "<YOUR_AMAZON_DOCUMENTDB_ADMIN_PASSWORD>")

# Créez l'utilisateur pour l'Agent Datadog.

db.createUser({
"user": "datadog",
"pwd": "<UNIQUE_PASSWORD>",
"roles": [
{ role: "read", db: "admin" },
{ role: "read", db: "local" },
{ role: "clusterMonitor", db: "admin" }
]
})
{{< /code-block >}}

Accordez des autorisations supplémentaires à l'utilisateur `datadog` dans les bases de données que vous souhaitez surveiller :

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
{ role: "read", db: "mydatabase" },
{ role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

Vous pouvez également accorder le rôle `readAnyDatabase` à l'utilisateur `datadog` dans la base de données `admin` pour surveiller toutes les bases de données :

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
{ role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

### Stocker votre mot de passe de manière sécurisée

{{% dbm-secret %}}

### Installer et configurer l'Agent

Pour surveiller votre cluster Amazon DocumentDB, vous devez installer et configurer l'Agent Datadog sur un host pouvant [accéder à distance][1] à votre cluster Amazon DocumentDB. Ce host peut être un host Linux, un conteneur Docker ou un pod Kubernetes.

#### Créer le fichier de configuration

{{% dbm-amazon-documentdb-agent-config-replica-set %}}

Si vous avez installé l'[intégration Amazon DocumentDB][3] pour enrichir les instances
avec les données de télémétrie de l'intégration Amazon DocumentDB, ajoutez cette section à votre configuration :

```yaml
## @param aws - mapping - optional
## This block defines the configuration for Amazon DocumentDB instances.
## These values are only applied when `dbm: true` option is set.
#
aws:
    ## @param instance_endpoint - string - optional
    ## Equal to the Endpoint.Address of the instance the Agent is connecting to.
    ## This value is optional if the value of `host` is already configured to the instance endpoint.
    ##
    ## For more information on instance endpoints,
    ## see the AWS docs https://docs.aws.amazon.com/documentdb/latest/developerguide/API_Endpoint.html
    #
    instance_endpoint: <AMAZON_DOCUMENTDB_ENDPOINT>
    ## @param cluster_identifier - string - optional
    ## Equal to the cluster identifier of the instance the Agent is connecting to.
    ## This value is optional if the value of `cluster_name` is already configured to the cluster identifier.
    ##
    ## For more information on cluster identifiers,
    ## see the AWS docs https://docs.aws.amazon.com/documentdb/latest/developerguide/API_DBCluster.html
    #
    cluster_identifier: <AMAZON_DOCUMENTDB_CLUSTER_IDENTIFIER>
```

#### Configurer l'Agent

{{< tabs >}}
{{% tab "Linux Host" %}}
{{% dbm-mongodb-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

### Installer l'intégration Amazon DocumentDB

Pour collecter des métriques de base de données plus complètes depuis Amazon DocumentDB, installez l'[intégration Amazon DocumentDB][3] (facultatif).

## Données collectées

### Métriques

Consultez la [documentation de l'intégration][2] pour obtenir la liste complète des métriques collectées par l'intégration.

{{% dbm-amazon-documentdb-agent-data-collected %}}

[1]: /fr/account_management/api-app-keys/
[2]: /fr/integrations/mongo/?tab=replicaset#metrics
[3]: /fr/integrations/amazon_documentdb/
[4]: /fr/integrations/amazon_documentdb/#metrics
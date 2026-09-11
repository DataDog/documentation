---
further_reading:
- link: /integrations/mongo/
  tag: Documentation
  text: Intégration MongoDB de base
title: Configurer Database Monitoring pour MongoDB auto-hébergé
---

Database Monitoring offre des informations détaillées sur vos bases de données MongoDB en donnant accès à des métriques essentielles, des opérations lentes, des échantillons d'opérations, des plans d'explication et des changements d'état de réplication. Pour tirer parti de Database Monitoring pour MongoDB, assurez-vous que l'Agent Datadog est installé et configuré pour se connecter à vos instances MongoDB. Ce guide décrit les étapes de configuration de Database Monitoring pour MongoDB auto-hébergé.

## Avant de commencer

Versions majeures de MongoDB prises en charge
: 4.4, 5.0, 6.0, 7.0, 8.0

Éditions MongoDB prises en charge
: Communauté, Entreprise

{{% dbm-mongodb-before-you-begin %}}

## Configuration

Pour activer Database Monitoring pour votre base de données :

1. [Accorder à l'Agent l'accès à vos instances MongoDB](#accorder-à-lagent-laccès-à-vos-instances-mongodb)
2. [Installer et configurer l'Agent](#installer-et-configurer-lagent)

### Accorder à l'Agent l'accès à vos instances MongoDB

L'Agent Datadog nécessite un accès en lecture seule à l'instance MongoDB pour collecter des statistiques et des requêtes.

{{< tabs >}}
{{% tab "Déploiement autonome" %}}

Dans un shell Mongo, authentifiez-vous sur l'instance MongoDB, créez un utilisateur en lecture seule pour l'Agent Datadog dans la base de données `admin` et accordez les autorisations requises :

{{< code-block lang="shell" >}}
# Authentifiez-vous en tant qu'utilisateur admin.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

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

{{% /tab %}}
{{% tab "Replica Set" %}}

Dans un shell Mongo, authentifiez-vous sur le nœud primaire du replica set, créez un utilisateur en lecture seule pour l'Agent Datadog dans la base de données `admin` et accordez les autorisations requises :

{{< code-block lang="shell" >}}
# Authentifiez-vous en tant qu'utilisateur admin.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

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

{{% /tab %}}
{{% tab "Sharded Cluster" %}}

1. Pour chaque shard de votre cluster, connectez-vous au nœud primaire du shard, créez un utilisateur en lecture seule pour l'Agent Datadog dans la base de données `admin` et accordez les autorisations requises :

{{< code-block lang="shell" >}}
# Authentifiez-vous en tant qu'utilisateur admin.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

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

2. Suivez les mêmes étapes et créez le même utilisateur depuis un proxy `mongos`. Cette action crée l'utilisateur local dans les serveurs de configuration et permet une connexion directe.

{{% /tab %}}
{{< /tabs >}}

### Stocker votre mot de passe de manière sécurisée
{{% dbm-secret %}}

### Installer et configurer l'Agent

Datadog recommande d'installer l'Agent directement sur le host MongoDB, car cela lui permet de collecter diverses données de télémétrie système (CPU, mémoire, disque, réseau) en plus des données de télémétrie spécifiques à MongoDB.

#### Créer le fichier de configuration

{{< tabs >}}
{{% tab "Standalone" %}}
{{% dbm-mongodb-agent-config-standalone %}}
{{% /tab %}}
{{% tab "Replica Set" %}}
{{% dbm-mongodb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "Sharded Cluster" %}}
{{% dbm-mongodb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

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


## Données collectées

### Métriques

Consultez la [documentation sur l'intégration MongoDB][2] pour obtenir la liste complète des métriques collectées par l'intégration MongoDB.

{{% dbm-mongodb-agent-data-collected %}}

[1]: /fr/account_management/api-app-keys/
[2]: /fr/integrations/mongo/?tab=standalone#metrics
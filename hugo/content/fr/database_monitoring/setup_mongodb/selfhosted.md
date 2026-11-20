---
further_reading:
- link: /integrations/mongo/
  tag: Documentation
  text: Intégration de base de MongoDB
title: Configuration de Database Monitoring pour MongoDB auto-hébergé
---
Database Monitoring offre des informations complètes sur vos bases de données MongoDB en fournissant un accès à des métriques critiques, des opérations lentes, des exemples d'opérations, des plans d'exécution et des changements d'état de réplication. Pour tirer pleinement parti de Database Monitoring pour MongoDB, assurez-vous que le Datadog Agent est installé et configuré pour se connecter à vos instances MongoDB. Ce guide décrit les étapes pour configurer Database Monitoring pour MongoDB auto-hébergé.

## Avant de commencer {#before-you-begin}

Versions majeures de MongoDB prises en charge
: 4.4, 5.0, 6.0, 7.0, 8.0

Éditions de MongoDB prises en charge
: Community, Enterprise

{{% dbm-mongodb-before-you-begin %}}

## Configuration {#setup}

Pour activer Database Monitoring pour votre base de données :

1. [Accorder à l'Agent l'accès à vos instances MongoDB](#grant-the-agent-access-to-your-mongodb-instances)
2. [Installer et configurer l'Agent](#install-and-configure-the-agent)

### Accorder à l'Agent l'accès à vos instances MongoDB {#grant-the-agent-access-to-your-mongodb-instances}

Le Datadog Agent nécessite un accès en lecture seule à l'instance MongoDB pour collecter des statistiques et des requêtes.

{{< tabs >}}
{{% tab "Déploiement autonome" %}}

Dans un shell Mongo, authentifiez-vous auprès de l'instance MongoDB, créez un utilisateur en lecture seule pour le Datadog Agent dans la base de données `admin` et accordez les autorisations requises :

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
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

Alternativement, vous pouvez accorder le rôle `readAnyDatabase` à l'utilisateur `datadog` dans la base de données `admin` pour surveiller toutes les bases de données :

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Jeu de réplicas" %}}

Dans un shell Mongo, authentifiez-vous auprès du nœud primaire du jeu de réplicas, créez un utilisateur en lecture seule pour le Datadog Agent dans la base de données `admin` et accordez les autorisations requises :

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
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

Alternativement, vous pouvez accorder le rôle `readAnyDatabase` à l'utilisateur `datadog` dans la base de données `admin` pour surveiller toutes les bases de données :

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Cluster partitionné" %}}

1. Pour chaque shard de votre cluster, connectez-vous au nœud primaire du shard, créez un utilisateur en lecture seule pour le Datadog Agent dans la base de données `admin` et accordez les autorisations requises :

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
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

Alternativement, vous pouvez accorder le rôle `readAnyDatabase` à l'utilisateur `datadog` dans la base de données `admin` pour surveiller toutes les bases de données :

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

2. Suivez les mêmes étapes et créez le même utilisateur à partir d'un `mongos` proxy. Cette action crée l'utilisateur local dans les serveurs de configuration et permet une connexion directe.

{{% /tab %}}
{{< /tabs >}}

### Stockez votre mot de passe de manière sécurisée {#securely-store-your-password}
{{% dbm-secret %}}

### Installez et configurez l'Agent {#install-and-configure-the-agent}

Datadog recommande d'installer l'Agent directement sur l'hôte MongoDB, car cela permet à l'Agent de collecter diverses télémétries système (CPU, mémoire, disque, réseau) en plus de la télémétrie spécifique à MongoDB.

#### Créez le fichier de configuration {#create-the-configuration-file}

{{< tabs >}}
{{% tab "Déploiement autonome" %}}
{{% dbm-mongodb-agent-config-standalone %}}
{{% /tab %}}
{{% tab "Jeu de réplicas" %}}
{{% dbm-mongodb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "Cluster partitionné" %}}
{{% dbm-mongodb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

#### Configurez l'Agent {#set-up-the-agent}

{{< tabs >}}
{{% tab "Hôte Linux" %}}
{{% dbm-mongodb-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

## Métriques de requête {#query-metrics}

Les métriques de requête pour MongoDB auto-hébergé nécessitent MongoDB 8.0 ou une version ultérieure et reposent sur le pipeline d'agrégation `$queryStats`. La collecte des statistiques de requête est désactivée par défaut sur le serveur MongoDB. Activez-la sur chaque processus `mongod` ou `mongos`. Le paramètre de serveur requis dépend de votre version de MongoDB.

### MongoDB 8.0.20 ou version ultérieure {#mongodb-8020-or-later}

Définissez `internalQueryStatsSampleRate` sur `1.0` (échantillonnage à 100 %).

Ajoutez le paramètre au fichier de configuration MongoDB :

{{< code-block lang="yaml" >}}
setParameter:
  internalQueryStatsSampleRate: 1.0
{{< /code-block >}}

Ou transmettez-le sur la ligne de commande :

{{< code-block lang="shell" >}}
mongod --setParameter internalQueryStatsSampleRate=1.0
{{< /code-block >}}

Pour l'activer au moment de l'exécution jusqu'au prochain redémarrage, exécutez :

{{< code-block lang="javascript" >}}
db.adminCommand({setParameter: 1, internalQueryStatsSampleRate: 1.0})
{{< /code-block >}}

### MongoDB 8.0.0 à 8.0.19 {#mongodb-800-through-8019}

Définissez `internalQueryStatsRateLimit` sur `-1` (sans limite de débit).

Ajoutez le paramètre au fichier de configuration MongoDB :

{{< code-block lang="yaml" >}}
setParameter:
  internalQueryStatsRateLimit: -1
{{< /code-block >}}

Ou transmettez-le sur la ligne de commande :

{{< code-block lang="shell" >}}
mongod --setParameter internalQueryStatsRateLimit=-1
{{< /code-block >}}

Pour l'activer au moment de l'exécution jusqu'au prochain redémarrage, exécutez :

{{< code-block lang="javascript" >}}
db.adminCommand({setParameter: 1, internalQueryStatsRateLimit: -1})
{{< /code-block >}}

Pour plus d'informations sur les paramètres de serveur qui contrôlent la collecte des statistiques de requête, consultez la [documentation sur les statistiques de requête MongoDB][4].

## Données collectées {#data-collected}

### Métriques standard {#standard-metrics}

Consultez la [documentation de l'intégration MongoDB][2] pour obtenir une liste complète des métriques collectées par l'intégration MongoDB.

### Métriques de requête {#query-metrics-1}

<div class="alert alert-info">
  Cela nécessite Datadog Agent v7.78 ou une version ultérieure et MongoDB 8.0+ pour les déploiements auto-hébergés.
</div>

Les métriques de requête fournissent des informations sur les performances de vos opérations MongoDB. Pour plus d'informations, consultez [Métriques de requête][3].

Pour collecter les métriques de requête, assurez-vous d'avoir accordé les autorisations requises comme décrit dans la section [Accorder l'accès à l'Agent](#grant-the-agent-access-to-your-mongodb-instances).

Activez les métriques de requête dans le fichier de configuration `conf.d/mongo.d/conf.yaml`. Voici un exemple :

{{< highlight yaml "hl_lines=11-12" >}}
init_config:
instances:
  - hosts:
      - <HOST>:<PORT>
    username: datadog
    password: "ENC[datadog_user_database_password]"
    options:
      authSource: admin
    tls: true
    dbm: true
    query_metrics:
      enabled: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections_indexes_stats: true
    database_autodiscovery:
      enabled: true
{{< /highlight >}}

{{% dbm-mongodb-agent-data-collected %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/api-app-keys/
[2]: /fr/integrations/mongo/?tab=standalone#metrics
[3]: /fr/database_monitoring/query_metrics/
[4]: https://github.com/mongodb/mongo/blob/master/src/mongo/db/query/query_stats/README.md#server-parameters
---
description: Installez et configurez Database Monitoring pour MongoDB Atlas
further_reading:
- link: /integrations/mongo/
  tag: Documentation
  text: Intégration de base de MongoDB
title: Configuration de Database Monitoring pour MongoDB Atlas
---
Database Monitoring offre des informations complètes sur vos bases de données MongoDB en fournissant un accès à des métriques critiques, des opérations lentes, des exemples d'opérations, des plans d'exécution et des changements d'état de réplication. Pour tirer pleinement parti de Database Monitoring pour MongoDB, assurez-vous que le Datadog Agent est installé et configuré pour se connecter à vos instances MongoDB Atlas. Ce guide décrit les étapes pour configurer Database Monitoring pour MongoDB Atlas.

## Avant de commencer {#before-you-begin}

Versions majeures de MongoDB prises en charge
: 4.4, 5.0, 6.0, 7.0, 8.0, 9.0

Niveaux de cluster MongoDB Atlas pris en charge
: M10 et niveaux supérieurs<br/><br/>
**Remarque** : les instances MongoDB Atlas Serverless ou les clusters partagés (M0 Sandbox, M2, M5) ne sont pas pris en charge.

{{% dbm-mongodb-before-you-begin %}}

## Configuration {#setup}

Pour activer Database Monitoring pour votre base de données :

1. [Accordez à l'Agent l'accès à votre cluster MongoDB Atlas](#grant-the-agent-access-to-your-mongodb-atlas-cluster)
2. [Installer et configurer l'Agent](#install-and-configure-the-agent)
3. [(Facultatif) Installez l'intégration MongoDB Atlas](#install-the-mongodb-atlas-integration)

### Accordez à l'Agent l'accès à votre cluster MongoDB Atlas {#grant-the-agent-access-to-your-mongodb-atlas-cluster}

Le Datadog Agent nécessite un accès en lecture seule au cluster MongoDB Atlas pour collecter des statistiques et des requêtes.

#### Créez un rôle de surveillance personnalisé {#create-a-custom-monitoring-role}

1. Dans l'interface utilisateur de MongoDB Atlas, accédez à l'onglet **Database Access**.
2. Dans l'onglet **Custom Roles**, cliquez sur **Add New Custom Role**.
3. Saisissez un **Custom Role Name**, tel que `datadog`.
4. Ajoutez les autorisations suivantes au rôle personnalisé :
    - `read` sur la base de données `admin`
    - `read` sur la base de données `local`
    - `read` sur la base de données `config` (cluster partitionné uniquement)
    - `clusterMonitor` sur la base de données `admin`
    - `read` sur les bases de données créées par l'utilisateur que vous souhaitez surveiller, ou `readAnyDatabase` pour surveiller toutes les bases de données
5. Cliquez sur **Add Custom Role**.

#### Créez un utilisateur de surveillance avec le rôle de surveillance personnalisé {#create-a-monitoring-user-with-the-custom-monitoring-role}

1. Dans l'interface utilisateur de MongoDB Atlas, accédez à l'onglet **Database Access**.
2. Dans l'onglet **Database Users**, cliquez sur **Add New Database User**.
3. Sous **Authentication Method**, sélectionnez **Password**.
4. Saisissez le nom d'utilisateur et le mot de passe.
5. Sous **Database User Privileges**, développez **Custom Roles** et sélectionnez le rôle de surveillance personnalisé que vous avez créé à l'étape précédente.
6. Cliquez sur **Add User**.
7. Notez le nom d'utilisateur et le mot de passe de l'utilisateur de surveillance afin de pouvoir configurer l'Agent.

### Stockez votre mot de passe de manière sécurisée {#securely-store-your-password}

{{% dbm-secret %}}

### Installez et configurez l'Agent {#install-and-configure-the-agent}

Pour surveiller votre cluster MongoDB Atlas, vous devez installer et configurer le Datadog Agent sur un host qui peut [accéder à distance][1] à votre cluster MongoDB Atlas. Cet host peut être un host Linux, un conteneur Docker ou un pod Kubernetes.

#### Obtenez le nom d'hôte et le port de l'instance MongoDB individuelle à partir de la chaîne de connexion SRV {#get-the-individual-mongodb-instance-hostname-and-port-from-the-srv-connection-string}

Les applications se connectent généralement à MongoDB Atlas à l'aide d'une chaîne de connexion SRV, mais le Datadog Agent doit se connecter directement à l'instance MongoDB individuelle surveillée. Si l'Agent se connecte à une instance MongoDB différente pendant son exécution (comme dans le cas d'un basculement, d'un équilibrage de charge, etc.), l'Agent calcule la différence de statistiques entre deux hosts, ce qui produit des métriques inexactes.

Pour obtenir le nom d'hôte et le port de l'instance MongoDB individuelle, vous pouvez utiliser des outils de ligne de commande réseau comme `dig` sous Linux ou `nslookup` sous Windows pour résoudre la chaîne de connexion SRV.

{{< tabs >}}
{{% tab "Jeu de réplicas" %}}

##### Membres du replica set {#replica-set-members}

Pour un cluster non partitionné (replica set) avec la chaîne de connexion SRV `mongodb+srv://XXXXX.XXX.mongodb.net/` :

Utilisez `dig` sous Linux pour résoudre la chaîne de connexion SRV :

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

La sortie devrait être similaire à :

{{< code-block lang="shell" >}}
0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Utilisez `nslookup` sous Windows pour résoudre la chaîne de connexion SRV :

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

La sortie devrait être similaire à :

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Dans cet exemple, les instances MongoDB individuelles `<HOST>:<PORT>` du replica set sont :

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

Vous pouvez utiliser `<HOST>:<PORT>` récupéré à partir de la chaîne de connexion SRV pour configurer l'Agent.
{{% /tab %}}
{{% tab "Cluster partitionné" %}}

##### routeurs mongos {#mongos-routers}

Pour un cluster partitionné avec la chaîne de connexion SRV `mongodb+srv://XXXXX.XXX.mongodb.net/` :

Utilisez `dig` sous Linux pour résoudre la chaîne de connexion SRV :

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

La sortie devrait être similaire à :

{{< code-block lang="shell" >}}
0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Utilisez `nslookup` sous Windows pour résoudre la chaîne de connexion SRV :

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

La sortie devrait être similaire à :

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Dans cet exemple, les routeurs `mongos` individuels sont :

-   `XXXXX-00-00.4zh9o.mongodb.net:27016`
-   `XXXXX-00-01.4zh9o.mongodb.net:27016`
-   `XXXXX-00-02.4zh9o.mongodb.net:27016`.

Vous pouvez utiliser `<HOST>:<PORT>` récupéré à partir de la chaîne de connexion SRV pour configurer l'Agent.

##### Membres du shard {#shard-members}

Pour obtenir les instances MongoDB individuelles de chaque shard, vous pouvez vous connecter au routeur `mongos` et exécuter la commande suivante :

{{< code-block lang="shell" >}}
use admin
db.runCommand("getShardMap")
{{< /code-block >}}

La sortie devrait être similaire à :

{{< code-block lang="shell" >}}
{
"map" : {
"shard-0": "shard-0/XXXXX-00-00.4zh9o.mongodb.net:27017,XXXXX-00-01.4zh9o.mongodb.net:27017,XXXXX-00-02.4zh9o.mongodb.net:27017",
"shard-1": "shard-1/XXXXX-01-00.4zh9o.mongodb.net:27017,XXXXX-01-01.4zh9o.mongodb.net:27017,XXXXX-01-02.4zh9o.mongodb.net:27017"
},
"hosts": {
"XXXXX-00-00.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-00-01.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-00-02.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-01-00.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-01-01.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-01-02.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-00-00-config.4zh9o.mongodb.net:27017": "config",
"XXXXX-00-01-config.4zh9o.mongodb.net:27017": "config",
"XXXXX-00-02-config.4zh9o.mongodb.net:27017": "config"
},
"ok" : 1
}
{{< /code-block >}}

Dans cet exemple, les instances MongoDB individuelles pour le shard-0 sont :

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

Pour le shard-1, elles sont :

-   `XXXXX-01-00.4zh9o.mongodb.net:27017`
-   `XXXXX-01-01.4zh9o.mongodb.net:27017`
-   `XXXXX-01-02.4zh9o.mongodb.net:27017`

Pour le serveur de configuration, elles sont :

-   `XXXXX-00-00-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02-config.4zh9o.mongodb.net:27017`

Vous pouvez utiliser l'un de ces noms d'hôte pour configurer l'Agent.
{{% /tab %}}
{{< /tabs >}}

#### Créez le fichier de configuration {#create-the-configuration-file}

{{< tabs >}}
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

### Installer l'intégration MongoDB Atlas {#install-the-mongodb-atlas-integration}

Pour collecter des métriques de base de données plus complètes depuis MongoDB Atlas, installez l'[intégration MongoDB Atlas][3] (facultative).

## Données collectées {#data-collected}

### Métriques standard {#standard-metrics}

Consultez la [documentation de l'intégration MongoDB][4] pour obtenir une liste complète des métriques collectées par l'intégration MongoDB.

### Query Metrics {#query-metrics}

<div class="alert alert-info">
  Les métriques de requête nécessitent Datadog Agent 7.78 ou une version ultérieure et MongoDB 7.0 ou une version ultérieure. MongoDB 9.0 nécessite l'Agent 7.85.0 ou une version ultérieure.
</div>

Les métriques de requête fournissent des informations sur les performances de vos opérations MongoDB. Pour plus d'informations, consultez [Query Metrics][5].

Pour collecter les métriques de requête, assurez-vous d'avoir accordé les autorisations requises comme décrit dans la section [Accordez à l'Agent l'accès à votre cluster MongoDB Atlas](#grant-the-agent-access-to-your-mongodb-atlas-cluster).

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

[1]: /fr/database_monitoring/architecture/#cloud-managed-databases
[2]: /fr/account_management/api-app-keys/
[3]: /fr/integrations/mongodb_atlas/
[4]: /fr/integrations/mongodb_atlas/#metrics
[5]: /fr/database_monitoring/query_metrics/
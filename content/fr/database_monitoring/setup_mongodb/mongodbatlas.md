---
description: Installer et configurer Database Monitoring pour MongoDB Atlas
further_reading:
- link: /integrations/mongo/
  tag: Documentation
  text: Intégration MongoDB de base
title: Configurer Database Monitoring pour MongoDB Atlas
---

Database Monitoring offre des informations complètes sur vos bases de données MongoDB en donnant accès à des métriques essentielles, aux opérations lentes, aux échantillons d'opérations, aux plans d'exécution et aux changements d'état de réplication. Pour tirer parti de Database Monitoring pour MongoDB, assurez-vous que l'Agent Datadog est installé et configuré pour se connecter à vos instances MongoDB Atlas. Ce guide décrit les étapes de configuration de Database Monitoring pour MongoDB Atlas.

## Avant de commencer

Versions majeures de MongoDB prises en charge
: 4.4, 5.0, 6.0, 7.0, 8.0

Niveaux de cluster MongoDB Atlas pris en charge
: M10 et supérieur<br/><br/>
**Remarque** : les instances MongoDB Atlas Serverless ou les clusters partagés (M0 Sandbox, M2, M5) ne sont pas pris en charge. 

{{% dbm-mongodb-before-you-begin %}}

## Configuration

Pour activer Database Monitoring pour votre base de données :

1. [Accorder à l'Agent l'accès à votre cluster MongoDB Atlas](#accorder-à-lagent-laccès-à-votre-cluster-mongodb-atlas)
2. [Installer et configurer l'Agent](#installer-et-configurer-lagent)
3. [(Facultatif) Installer l'intégration MongoDB Atlas](#installer-lintégration-mongodb-atlas)

### Accorder à l'Agent l'accès à votre cluster MongoDB Atlas

L'Agent Datadog nécessite un accès en lecture seule au cluster MongoDB Atlas pour collecter des statistiques et des requêtes.

#### Créer un rôle de surveillance personnalisé

1. Dans l'interface MongoDB Atlas, accédez à l'onglet **Database Access**.
2. Dans l'onglet **Custom Roles**, cliquez sur **Add New Custom Role**.
3. Saisissez un **Custom Role Name**, par exemple `datadog`.
4. Ajoutez les autorisations suivantes au rôle personnalisé :
    - `read` sur la base de données `admin` 
    - `read` sur la base de données `local` 
    - `read` sur la base de données `config` (cluster shardé uniquement)
    - `clusterMonitor` sur la base de données `admin` 
    - `read` sur les bases de données créées par l'utilisateur que vous souhaitez surveiller, ou `readAnyDatabase` pour surveiller toutes les bases de données
5. Cliquez sur **Add Custom Role**.

#### Créer un utilisateur de surveillance avec le rôle de surveillance personnalisé

1. Dans l'interface MongoDB Atlas, accédez à l'onglet **Database Access**.
2. Dans l'onglet **Database Users**, cliquez sur **Add New Database User**.
3. Sous **Authentication Method**, sélectionnez **Password**.
4. Saisissez le nom d'utilisateur et le mot de passe.
5. Sous **Database User Privileges**, développez **Custom Roles** et sélectionnez le rôle de surveillance personnalisé créé à l'étape précédente.
6. Cliquez sur **Add User**.
7. Notez le nom d'utilisateur et le mot de passe de l'utilisateur de surveillance afin de pouvoir configurer l'Agent.

### Stocker votre mot de passe de manière sécurisée

{{% dbm-secret %}}

### Installer et configurer l'Agent

Pour surveiller votre cluster MongoDB Atlas, installez et configurez l'Agent Datadog sur un host capable d'[accéder à distance][1] à votre cluster MongoDB Atlas. Ce host peut être un host Linux, un conteneur Docker ou un pod Kubernetes.

#### Obtenir le nom d'host et le port de l'instance MongoDB individuelle à partir de la chaîne de connexion SRV

Les applications se connectent généralement à MongoDB Atlas via une chaîne de connexion SRV, mais l'Agent Datadog doit se connecter directement à l'instance MongoDB individuelle surveillée. Si l'Agent se connecte à une instance MongoDB différente pendant son exécution (en cas de basculement, d'équilibrage de charge, etc.), l'Agent calcule la différence de statistiques entre deux hosts, ce qui produit des métriques inexactes.

Pour obtenir le nom d'host et le port de l'instance MongoDB individuelle, utilisez des outils en ligne de commande utilitaires réseau tels que `dig` sous Linux ou `nslookup` sous Windows pour résoudre la chaîne de connexion SRV.

{{< tabs >}}
{{% tab "Replica Set" %}}

##### Membres du replica set

Pour un cluster non shardé (replica set) avec la chaîne de connexion SRV `mongodb+srv://XXXXX.XXX.mongodb.net/` :

Utilisez `dig` sous Linux pour résoudre la chaîne de connexion SRV :

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

Le résultat devrait être similaire à :

{{< code-block lang="shell" >}}
0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Utilisez `nslookup` sous Windows pour résoudre la chaîne de connexion SRV :

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

Le résultat devrait être similaire à :

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Dans cet exemple, les instances MongoDB individuelles `<HOST>:<PORT>` du replica set sont :

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

Utilisez le `<HOST>:<PORT>` récupéré depuis la chaîne de connexion SRV pour configurer l'Agent.
{{% /tab %}}
{{% tab "Sharded Cluster" %}}

##### Routeurs mongos

Pour un cluster shardé avec la chaîne de connexion SRV `mongodb+srv://XXXXX.XXX.mongodb.net/` :

Utilisez `dig` sous Linux pour résoudre la chaîne de connexion SRV :

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

Le résultat devrait être similaire à :

{{< code-block lang="shell" >}}
0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Utilisez `nslookup` sous Windows pour résoudre la chaîne de connexion SRV :

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

Le résultat devrait être similaire à :

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Dans cet exemple, les routeurs `mongos` individuels sont :

-   `XXXXX-00-00.4zh9o.mongodb.net:27016`
-   `XXXXX-00-01.4zh9o.mongodb.net:27016`
-   `XXXXX-00-02.4zh9o.mongodb.net:27016`.

Utilisez le `<HOST>:<PORT>` récupéré depuis la chaîne de connexion SRV pour configurer l'Agent.

##### Membres des shards

Pour obtenir les instances MongoDB individuelles de chaque shard, connectez-vous au routeur `mongos` et exécutez la commande suivante :

{{< code-block lang="shell" >}}
use admin
db.runCommand("getShardMap")
{{< /code-block >}}

Le résultat devrait être similaire à :

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

Dans cet exemple, les instances MongoDB individuelles du shard-0 sont :

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

Pour le shard-1, ce sont :

-   `XXXXX-01-00.4zh9o.mongodb.net:27017`
-   `XXXXX-01-01.4zh9o.mongodb.net:27017`
-   `XXXXX-01-02.4zh9o.mongodb.net:27017`

Pour le serveur de configuration, ce sont :

-   `XXXXX-00-00-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02-config.4zh9o.mongodb.net:27017`

Utilisez l'un de ces noms d'host pour configurer l'Agent.
{{% /tab %}}
{{< /tabs >}}

#### Créer le fichier de configuration

{{< tabs >}}
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

### Installer l'intégration MongoDB Atlas

Pour collecter des métriques de base de données plus complètes depuis MongoDB Atlas, installez l'[intégration MongoDB Atlas][3] (facultatif).

## Données collectées

### Métriques

Consultez la [documentation sur l'intégration MongoDB][4] pour obtenir la liste complète des métriques collectées par l'intégration MongoDB.

{{% dbm-mongodb-agent-data-collected %}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/architecture/#cloud-managed-databases
[2]: /fr/account_management/api-app-keys/
[3]: /fr/integrations/mongodb_atlas/
[4]: /fr/integrations/mongodb_atlas/#metrics
---
description: Installez et configurez Database Monitoring pour Postgres sur Amazon RDS.
further_reading:
- link: /integrations/postgres/
  tag: Documentation
  text: Intégration Postgres basique
kind: documentation
title: Configuration de Database Monitoring pour Postgres avec une gestion sur Amazon RDS
---

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données Postgres, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des états, des failovers et des événements de base de données.

L'Agent recueille la télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Suivez les étapes ci-dessous pour activer la solution Database Monitoring avec votre base de données Postgres :

1. [Configurer les paramètres de base de données](#configurer-les-parametres-postgres)
1. [Autoriser l'Agent à accéder à la base de données](#accorder-un-acces-a-l-agent)
1. [Installer l'Agent](#installer-l-agent)
1. [Installer l'intégration RDS](#installer-l-integration-rds)

## Avant de commencer

Versions de PostgresSQL prises en charge
: 9.6, 10, 11, 12 et 13

Versions de l'Agent prises en charge
: 7.33.0+

Incidence sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est relativement souple. Néanmoins, vous pouvez ajuster certains paramètres comme l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent monopolise moins d'un pour cent du temps d'exécution des requêtes sur la base de données, et moins d'un pour cent du CPU. <br/><br/>
La solution Database Monitoring de Datadog fonctionne comme une intégration et vient compléter l'Agent de base ([voir les benchmarks][1]).

Proxies, répartiteurs de charge et outils de regroupement de connexions
: L'Agent doit se connecter directement au host surveillé. Pour les bases de données auto-hébergées, il est préférable d'utiliser `127.0.0.1` ou le socket. L'Agent ne doit pas se connecter aux bases de données via un proxy, un répartiteur de charge ni un outil de groupement de connexions comme `pgbouncer`. Bien qu'il puisse s'agir d'un antipattern pour des applications client, chaque Agent doit connaître le hostname sous-jacent et rester sur un seul host pendant toute sa durée de vie, même en cas de failover. Si l'Agent Datadog se connecte à plusieurs hosts pendant son exécution, les valeurs des métriques seront incorrectes.

Considérations relatives à la sécurité des données
: Consultez la rubrique [Informations sensibles][2] pour découvrir les données recueillies par l'Agent à partir de vos bases de données et la méthode à suivre pour garantir leur sécurité.

## Configurer les paramètres Postgres

Configurez les [paramètres][3] suivants dans le [groupe de paramètres de base de données][4]. **Redémarrez ensuite le serveur** pour appliquer la configuration. Pour en savoir plus sur ces paramètres, consultez la [documentation Postgres][5] (en anglais).

| Paramètre | Valeur | Description |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Requis pour les métriques `postgresql.queries.*`. Active la collecte de métriques de requête à l'aide de l'extension [pg_stat_statements][5]. |
| `track_activity_query_size` | `4096` | Requis pour la collecte de requêtes volumineuses. Augmente la taille du texte SQL dans `pg_stat_activity` et `pg_stat_statements`. Si vous conservez la valeur par défaut, les requêtes comportant plus de `1024` caractères ne seront pas recueillies. |
| `pg_stat_statements.track` | `ALL` | Facultatif. Active le suivi des déclarations dans les procédures et fonctions stockées. |
| `pg_stat_statements.max` | `10000` | Facultatif. Augmente le nombre de requêtes normalisées suivies dans `pg_stat_statements`. Ce paramètre est recommandé pour les bases de données générant d'importants volumes ainsi que de nombreux types de requêtes à partir d'un grand nombre de clients. |


## Accorder un accès à l'Agent

L'Agent Datadog requiert un accès en lecture seule pour le serveur de base de données, afin de pouvoir recueillir les statistiques et requêtes.

Choisissez la base de données PostgresSQL à laquelle l'Agent se connectera sur le serveur dédié. L'Agent peut recueillir la télémétrie de toutes les bases de données sur ce serveur, peu importe celle à laquelle il se connecte. Nous vous recommandons donc d'utiliser la base de données `postgres` par défaut. Choisissez une autre base de données uniquement si l'Agent doit exécuter des [requêtes personnalisées sur des données stockées uniquement dans cette base de données][6].

Connectez-vous à la base de données en tant que super-utilisateur (ou en tant qu'un autre utilisateur avec les autorisations nécessaires). Par exemple, pour la base de données `postgres`, exécutez ce qui suit pour vous connecter en tant qu'utilisateur `postgres` avec [psql][7] :

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Créez l'utilisateur `datadog` :

```SQL
CREATE USER datadog WITH password '<MOT_DE_PASSE>';
```

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Créez des fonctions **dans chaque base de données** pour permettre à l'Agent de lire tout le contenu de `pg_stat_activity` et `pg_stat_statements` :

```SQL
CREATE OR REPLACE FUNCTION datadog.pg_stat_activity() RETURNS SETOF pg_stat_activity AS
  $$ SELECT * FROM pg_catalog.pg_stat_activity; $$
LANGUAGE sql
SECURITY DEFINER;
CREATE OR REPLACE FUNCTION datadog.pg_stat_statements() RETURNS SETOF pg_stat_statements AS
    $$ SELECT * FROM pg_stat_statements; $$
LANGUAGE sql
SECURITY DEFINER;
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : pour créer des métriques custom nécessitant d'interroger des tables supplémentaires, vous devrez peut-être accorder à l'utilisateur `datadog` l'autorisation `SELECT` pour ces tables. Exemple de commande : `grant SELECT on <NOM_TABLE> to datadog;`. Pour en savoir plus, consultez la section [Collecte de métriques custom Postgres][6].

Créez la fonction **dans chaque base de données** pour permettre à l'Agent de recueillir les plans d'exécution.

```SQL
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```

### Vérification

Pour vérifier que l'utilisateur de l'Agent possède les autorisations adéquates et qu'il parvient à se connecter à la base de données et à lire les principales tables, exécutez ce qui suit :
{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```
{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

Lorsque vous êtes invité à saisir un mot de passe, indiquez celui que vous avez défini lors de la création de l'utilisateur `datadog`.

## Installation de l'Agent

Pour surveiller les hosts RDS, installez l'Agent Datadog dans votre infrastructure et configurez-le de façon à ce qu'il se connecte à distance à chaque endpoint d'instance. L'Agent n'a pas besoin de s'exécuter sur la base de données : il doit simplement s'y connecter. Pour obtenir d'autres méthodes d'installation de l'Agent, consultez les [instructions d'installation de l'Agent][8].

{{< tabs >}}
{{% tab "Host" %}}

Pour configurer la collecte de métriques Database Monitoring pour un Agent s'exécutant sur un host, par exemple si vous provisionnez une petite instance EC2 pour l'Agent afin de recueillir des données depuis une base de données RDS, procédez comme suit :

1. Modifiez le fichier `postgres.d/conf.yaml` afin de spécifier votre `host` / `port` et de définir les masters à surveiller. Consultez le [fichier d'exemple postgres.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.
   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AWS_INSTANCE_ENDPOINT>'
       port: 5432
       username: datadog
       password: '<PASSWORD>'
       ## Required for Postgres 9.6: Uncomment these lines to use the functions created in the setup
       # pg_stat_statements_view: datadog.pg_stat_statements()
       # pg_stat_activity_view: datadog.pg_stat_activity()
       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'
   ```
2. [Redémarrez l'Agent][2].


[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Pour configurer l'Agent Database Monitoring qui s'exécute dans un conteneur Docker, par exemple dans ECS ou Fargate, vous pouvez définir des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur le conteneur de votre Agent.

**Remarque** : pour que le processus de découverte automatique des étiquettes fonctionne, l'Agent doit être autorisé à lire le socket Docker.

### Ligne de commande

Pour exécuter rapidement l'Agent depuis une interface de ligne de commande, utilisez la commande suivante. Modifiez les valeurs de façon à indiquer votre compte et votre environnement :

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.32.0

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["postgres"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<ENDPOINT_INSTANCE_AWS>",
    "port": 5432,
    "username": "datadog",
    "password": "<MOT_DE_PASSE_UNIQUE>"
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

Pour Postgres 9.6, ajoutez les paramètres suivants à la configuration de l'instance spécifiant le host et le port :

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

### Dockerfile

Vous pouvez également spécifier des étiquettes dans un `Dockerfile`. Cette approche vous permet de concevoir et de déployer un Agent personnalisé sans avoir à modifier la configuration de l'infrastructure :

```Dockerfile
FROM gcr.io/datadoghq/agent:7.32.0

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<ENDPOINT_INSTANCE_AWS>", "port": 5432,"username": "datadog","password": "<MOT_DE_PASSE_UNIQUE>"}]'
```

Pour Postgres 9.6, ajoutez les paramètres suivants à la configuration de l'instance spécifiant le host et le port :

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

Pour éviter d'exposer le mot de passe de l'utilisateur `datadog` en clair, utilisez le [package de gestion des secrets][2] de l'Agent et déclarez le mot de passe à l'aide de la syntaxe `ENC[]`. Sinon, consultez la section [Template variables Autodiscovery][3] pour découvrir comment transmettre le mot de passe en tant que variable d'environnement.


[1]: /fr/agent/docker/integrations/?tab=docker
[2]: /fr/agent/guide/secrets-management
[3]: /fr/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

Pour surveiller des bases de données sur un cluster Kubernetes, utilisez [l'Agent de cluster Datadog][1].

Si vous n'avez pas encore activé les checks de cluster dans votre cluster Kubernetes, suivez [ces instructions][2]. Vous pouvez déclarer la configuration Postgres avec des fichiers statiques montés dans le conteneur de l'Agent de cluster, ou avec des annotations de service :

### Ligne de commande avec Helm

Exécutez la commande [Helm][3] suivante pour installer [l'Agent de cluster Datadog][1] sur votre cluster Kubernetes. Modifiez les valeurs de façon à indiquer votre compte et votre environnement :

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <NOM_VERSION> \
  --set 'datadog.apiKey=<CLÉ_API_DATADOG>' \
  --set 'clusterAgent.enabled=true' \
  --set "clusterAgent.confd.postgres\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <ADRESSE_INSTANCE>
    port: 5432
    username: datadog
    password: <MOT_DE_PASSE_UNIQUE" \
  datadog/datadog
```

Pour Postgres 9.6, ajoutez les paramètres suivants à la configuration de l'instance spécifiant le host et le port :

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

### Configuration avec des fichiers montés

Pour configurer un check de cluster avec un fichier de configuration monté, montez le fichier de configuration dans le conteneur de l'Agent de cluster à l'emplacement suivant : `/conf.d/postgres.yaml`.

```yaml
cluster_check: true  # Bien inclure ce flag
init_config:
instances:
  - dbm: true
    host: '<ADRESSE_INSTANCE>'
    port: 5432
    username: datadog
    password: '<MOT_DE_PASSE>'
    ## Requis : pour Postgres 9.6, supprimer la mise en commentaire de ces lignes pour utiliser les fonctions créées dans la configuration
    # pg_stat_statements_view: datadog.pg_stat_statements()
    # pg_stat_activity_view: datadog.pg_stat_activity()
```

### Configuration avec les annotations de service Kubernetes

Au lieu de monter un fichier, vous pouvez déclarer la configuration d'instance en tant que service Kubernetes. Pour configurer ce check pour un Agent s'exécutant sur Kubernetes, créez un service dans le même espace de nommage que l'Agent de cluster Datadog :


```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENVIRONNEMENT>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["postgres"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<ENDPOINT_INSTANCE_AWS>",
          "port": 5432,
          "username": "datadog",
          "password": "<MOT_DE_PASSE_UNIQUE>"
        }
      ]
spec:
  ports:
  - port: 5432
    protocol: TCP
    targetPort: 5432
    name: postgres
```

Pour Postgres 9.6, ajoutez les paramètres suivants à la configuration de l'instance spécifiant le host et le port :

```yaml
pg_stat_statements_view: datadog.pg_stat_statements()
pg_stat_activity_view: datadog.pg_stat_activity()
```

L'Agent de cluster enregistre automatiquement cette configuration et commence à exécuter le check Postgres.

Pour éviter d'exposer le mot de passe de l'utilisateur `datadog` en clair, utilisez le [package de gestion des secrets][4] de l'Agent et déclarez le mot de passe à l'aide de la syntaxe `ENC[]`.

[1]: /fr/agent/cluster_agent
[2]: /fr/agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /fr/agent/guide/secrets-management
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `postgres` dans la section Checks. Vous pouvez également visiter la page [Databases][10] pour commencer à surveiller vos bases de données.

## Installer l'intégration RDS

Pour recueillir des métriques de base de données plus complètes depuis AWS, installez l'[intégration RDS][11] (facultatif).

## Dépannage

Si vous avez respecté les instructions d'installation et de configuration des intégrations et de l'Agent, mais que vous rencontrez un problème, consultez la section [Dépannage][12].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/agent/basic_agent_usage#agent-overhead
[2]: /fr/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /fr/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings#agent
[9]: /fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://app.datadoghq.com/databases
[11]: /fr/integrations/amazon_rds
[12]: /fr/database_monitoring/troubleshooting/?tab=postgres

---
description: Installez et configurez Database Monitoring pour PostgreSQL avec une
  gestion sur Azure.
further_reading:
- link: /integrations/postgres/
  tag: Documentation
  text: Intégration Postgres basique
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentation
  text: Capturer les valeurs des paramètres de requête SQL
title: Configuration de Database Monitoring pour les bases de données Azure et PostgreSQL
---

La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données Postgres, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des états, des failovers et des événements de base de données.

L'Agent recueille la télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Suivez les étapes ci-dessous pour activer la solution Database Monitoring avec votre base de données Postgres :

1. [Configurer les paramètres de base de données](#configurer-les-parametres-postgres)
1. [Autoriser l'Agent à accéder à la base de données](#accorder-un-acces-a-l-agent)
1. [Installer et configurer l'Agent Datadog](#installer-et-configurer-lagent-datadog)
1. [Installer l'intégration Azure PostgreSQL](#installer-l-integration-azure-postgresql)

## Avant de commencer

Versions de PostgreSQL prises en charge
: 9.6, 10, 11, 12, 13, 14, 15, 16

Types de déploiements Azure PostgreSQL pris en charge
: PostgreSQL sur des VM Azure, un serveur unique et un serveur flexible

Versions de l'Agent prises en charge
: 7.36.1 et versions ultérieures

Incidence sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est relativement souple. Néanmoins, vous pouvez ajuster certains paramètres comme l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent monopolise moins d'un pour cent du temps d'exécution des requêtes sur la base de données, et moins d'un pour cent du CPU. <br/><br/>
La solution Database Monitoring de Datadog fonctionne comme une intégration et vient compléter l'Agent de base ([voir les benchmarks][1]).

Proxies, répartiteurs de charge et poolers de connexion
: L'Agent Datadog doit se connecter directement au host surveillé. Pour les bases de données auto-hébergées, `127.0.0.1` ou le socket est préférable. L'Agent ne doit pas se connecter à la base de données via un proxy, un répartiteur de charge ou un pooler de connexion tel que `pgbouncer`. Si l'Agent se connecte à différents hosts pendant son exécution (comme dans le cas d'un basculement, d'un équilibrage de charge, etc.), il calcule la différence de statistiques entre deux hosts, ce qui produit des métriques inexactes.

Considérations relatives à la sécurité des données
: Consultez la rubrique [Informations sensibles][2] pour découvrir les données recueillies par l'Agent à partir de vos bases de données et la méthode à suivre pour garantir leur sécurité.

## Configurer les paramètres Postgres

Configurez les [paramètres][3] suivants dans la [section relative au serveur][4], puis **redémarrez le serveur** pour appliquer la configuration.

{{< tabs >}}
{{% tab "Serveur unique" %}}

| Paramètre | Valeur | Description |
| --- | --- | --- |
| `track_activity_query_size` | `4096` | Obligatoire pour la collecte des requêtes plus longues. Augmente la taille du texte SQL dans `pg_stat_activity`. Si la valeur par défaut est conservée, les requêtes de plus de `1024` caractères ne sont pas collectées. |
| `pg_stat_statements.track` | `ALL` | Facultatif. Active le suivi des déclarations dans les procédures et fonctions stockées. |
| `pg_stat_statements.max` | `10000` | Facultatif. Augmente le nombre de requêtes normalisées suivies dans `pg_stat_statements`. Ce paramètre est recommandé pour les bases de données générant d'importants volumes ainsi que de nombreux types de requêtes à partir d'un grand nombre de clients. |
| `pg_stat_statements.track_utility` | `off` | Facultatif. Désactive les commandes utilitaires telles que PREPARE et EXPLAIN. Définir cette valeur sur `off` signifie que seules les requêtes de type SELECT, UPDATE et DELETE sont suivies. |
| `track_io_timing` | `on` | Facultatif. Active la collecte des durées de lecture et d'écriture des blocs pour les requêtes. |

{{% /tab %}}
{{% tab "Serveur flexible" %}}

| Paramètre            | Valeur | Description |
|----------------------| -- | --- |
| `azure.extensions` | `pg_stat_statements` | Requis pour les métriques `postgresql.queries.*`. Active la collecte de métriques de requête à l'aide de l'extension [pg_stat_statements][1]. |
| `track_activity_query_size` | `4096` | Obligatoire pour la collecte des requêtes plus longues. Augmente la taille du texte SQL dans `pg_stat_activity`. Si la valeur par défaut est conservée, les requêtes de plus de `1024` caractères ne sont pas collectées. |
| `pg_stat_statements.track` | `ALL` | Facultatif. Active le suivi des déclarations dans les procédures et fonctions stockées. |
| `pg_stat_statements.max` | `10000` | Facultatif. Augmente le nombre de requêtes normalisées suivies dans `pg_stat_statements`. Ce paramètre est recommandé pour les bases de données générant d'importants volumes ainsi que de nombreux types de requêtes à partir d'un grand nombre de clients. |
| `pg_stat_statements.track_utility` | `off` | Facultatif. Désactive les commandes utilitaires telles que PREPARE et EXPLAIN. Définir cette valeur sur `off` signifie que seules les requêtes de type SELECT, UPDATE et DELETE sont suivies. |
| `track_io_timing` | `on` | Facultatif. Active la collecte des durées de lecture et d'écriture des blocs pour les requêtes. |

[1]: https://www.postgresql.org/docs/current/pgstatstatements.html
{{% /tab %}}
{{< /tabs >}}

## Accorder un accès à l'Agent

L'Agent Datadog requiert un accès en lecture seule pour le serveur de base de données, afin de pouvoir recueillir les statistiques et requêtes.

Les commandes SQL suivantes doivent être exécutées sur le serveur de base de données **primaire** (le writer) du cluster si Postgres est répliqué. Choisissez une base de données PostgreSQL sur le serveur de base de données à laquelle l'Agent se connectera. L'Agent peut collecter des données de télémétrie depuis toutes les bases de données du serveur de base de données, quelle que soit celle à laquelle il se connecte ; il est donc conseillé d'utiliser la base de données `postgres` par défaut. Ne choisissez une base de données différente que si vous avez besoin que l'Agent exécute des [requêtes custom sur des données propres à cette base de données][5].

Connectez-vous à la base de données en tant que super-utilisateur (ou en tant qu'un autre utilisateur avec les autorisations nécessaires). Par exemple, pour la base de données `postgres`, exécutez ce qui suit pour vous connecter en tant qu'utilisateur `postgres` avec [psql][6] :

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Créez l'utilisateur `datadog` :

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

**Remarque :** l'authentification par identité gérée Microsoft Entra ID est également prise en charge. Consultez le [guide][13] pour savoir comment la configurer pour votre instance Azure.


{{< tabs >}}
{{% tab "Postgres ≥ 16" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_read_all_settings TO datadog;
GRANT pg_read_all_stats TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres 15" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
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

<div class="alert alert-info">Pour la collecte de données ou les métriques custom nécessitant d'interroger des tables supplémentaires, vous devrez peut-être accorder l'autorisation <code>SELECT</code> sur ces tables à l'utilisateur <code>datadog</code>. Exemple : <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Consultez la section <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">Collecte de métriques custom PostgreSQL</a> pour en savoir plus. </div>

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
   SET TRANSACTION READ ONLY;

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

### Stocker votre mot de passe de manière sécurisée
{{% dbm-secret %}}

### Vérification

Pour vérifier que l'utilisateur de l'Agent possède les autorisations adéquates et qu'il parvient à se connecter à la base de données et à lire les principales tables, exécutez ce qui suit :
{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

```shell
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```
{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h mydb.example.com -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

Lorsque vous êtes invité à saisir un mot de passe, indiquez celui que vous avez défini lors de la création de l'utilisateur `datadog`.

## Installer et configurer l'Agent

Pour surveiller les bases de données Azure Postgres, installez l'Agent Datadog dans votre infrastructure et configurez-le pour qu'il se connecte à chaque point de terminaison d'instance à distance. L'Agent n'a pas besoin de s'exécuter sur la base de données, il doit uniquement s'y connecter. Pour d'autres méthodes d'installation de l'Agent non mentionnées ici, consultez les [instructions d'installation de l'Agent][8].

{{< tabs >}}
{{% tab "Host" %}}
Pour configurer la collecte de métriques Database Monitoring pour un Agent s'exécutant sur un host, par exemple lors du provisionnement d'une petite machine virtuelle pour que l'Agent collecte des données depuis une base de données Azure :

1. Modifiez le fichier `postgres.d/conf.yaml` afin de spécifier votre `host` / `port` et de définir les masters à surveiller. Consultez le [fichier d'exemple postgres.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.
   ```yaml
   init_config:
   instances:
     - dbm: true
       host: '<AZURE_INSTANCE_ENDPOINT>'
       port: 5432
       username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
       password: 'ENC[datadog_user_database_password]'
       ssl: 'require'

       ## Optional: Connect to a different database if needed for `custom_queries`
       # dbname: '<DB_NAME>'

       # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
       azure:
        deployment_type: '<DEPLOYMENT_TYPE>'
        fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
   ```
2. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}

{{% tab "Docker" %}}
Pour configurer l'Agent Database Monitoring s'exécutant dans un conteneur Docker, vous pouvez définir les [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'Agent.

**Remarque** : pour que le processus de découverte automatique des étiquettes fonctionne, l'Agent doit être autorisé à lire le socket Docker.

### Ligne de commande

Utilisez la commande suivante pour exécuter l'Agent depuis une interface de ligne de commande. Modifiez les valeurs de façon à indiquer votre compte et votre environnement :

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["postgres"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AZURE_INSTANCE_ENDPOINT>",
    "port": 5432,
    "username": "datadog@<AZURE_INSTANCE_ENDPOINT>",
    "password": "<UNIQUEPASSWORD>",
    "ssl": "require",
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "name": "<AZURE_INSTANCE_ENDPOINT>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

Pour Postgres 9.6, ajoutez les paramètres suivants à la configuration de l'instance spécifiant le host et le port :

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

### Dockerfile

Vous pouvez également spécifier des étiquettes dans un `Dockerfile`. Cette approche vous permet de concevoir et de déployer un Agent personnalisé sans avoir à modifier la configuration de l'infrastructure :

```Dockerfile
FROM datadog/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["postgres"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AZURE_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog@<AZURE_INSTANCE_ENDPOINT>","password": "ENC[datadog_user_database_password]", "ssl": "require", "azure": {"deployment_type": "<DEPLOYMENT_TYPE>", "name": "<AZURE_INSTANCE_ENDPOINT>"}}]'
```

Pour Postgres 9.6, ajoutez les paramètres suivants à la configuration de l'instance spécifiant le host et le port :

```yaml
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

[1]: /fr/agent/docker/integrations/?tab=docker
{{% /tab %}}

{{% tab "Kubernetes" %}}
Si vous exécutez un cluster Kubernetes, utilisez l'[Agent de cluster Datadog][1] pour activer Database Monitoring.

**Remarque** : vérifiez que les [checks de cluster][2] sont activés pour votre Agent de cluster Datadog avant de continuer.

Vous trouverez ci-dessous des instructions détaillées pour configurer l'intégration Postgres à l'aide de différentes méthodes de déploiement de l'Agent de cluster Datadog.

### Operator

En vous référant aux [instructions relatives à l'Operator dans Kubernetes et les intégrations][3], suivre les étapes ci-dessous pour configurer l'intégration Postgres :

1. Créez ou mettez à jour le fichier `datadog-agent.yaml` avec la configuration suivante :

    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        clusterName: <CLUSTER_NAME>
        site: <DD_SITE>
        credentials:
          apiSecret:
            secretName: datadog-agent-secret
            keyName: api-key

      features:
        clusterChecks:
          enabled: true

      override:
        nodeAgent:
          image:
            name: agent
            tag: <AGENT_VERSION>

        clusterAgent:
          extraConfd:
            configDataMap:
              postgres.yaml: |-
                cluster_check: true
                init_config:
                instances:
                  - host: <AZURE_INSTANCE_ENDPOINT>
                    port: 5432
                    username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
                    password: 'ENC[datadog_user_database_password]'
                    ssl: 'require'
                    dbm: true
                    azure:
                      deployment_type: '<DEPLOYMENT_TYPE>'
                      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
                    tags:
                      - "dbinstanceidentifier:<DB_INSTANCE_NAME>"

    ```

    **Note** : Pour Postgres 9.6, ajoutez les lignes suivantes à la configuration de l'instance où l'hôte et le port sont spécifiés :

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Appliquer les modifications à l'Operator Datadog à l'aide de la commande suivante :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm

En vous référant aux [instructions relatives à Helm dans Kubernetes et les intégrations][4], suivre les étapes ci-dessous pour configurer l'intégration Postgres :

1. Mettez à jour votre fichier `datadog-values.yaml` (utilisé dans les instructions d'installation de l'Agent de cluster) avec la configuration suivante :

    ```yaml
    clusterAgent:
      confd:
        postgres.yaml: |-
          cluster_check: true
          init_config:
          instances:
            - dbm: true
              host: <AZURE_INSTANCE_ENDPOINT>
              port: 5432
              username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
              password: 'ENC[datadog_user_database_password]'
              ssl: 'require'
              azure:
                deployment_type: '<DEPLOYMENT_TYPE>'
                fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'

    clusterChecksRunner:
      enabled: true
    ```

    Pour Postgres 9.6, ajoutez les paramètres suivants à la configuration de l'instance spécifiant le host et le port :

    ```yaml
    pg_stat_statements_view: datadog.pg_stat_statements()
    pg_stat_activity_view: datadog.pg_stat_activity()
    ```

2. Déployez l'Agent avec le fichier de configuration ci-dessus à l'aide de la commande suivante :

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Pour Windows, ajoutez <code>--set targetSystem=windows</code> à la commande <code>helm install</code>.
</div>

### Configuration avec des fichiers montés

Pour configurer un check de cluster avec un fichier de configuration monté, montez le fichier de configuration dans le conteneur de l'Agent de cluster à l'emplacement suivant : `/conf.d/postgres.yaml` :

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AZURE_INSTANCE_ENDPOINT>'
    port: 5432
    username: 'datadog@<AZURE_INSTANCE_ENDPOINT>'
    password: 'ENC[datadog_user_database_password]'
    ssl: "require"
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
```

### Configuration avec les annotations de service Kubernetes

Plutôt que de monter un fichier, vous pouvez déclarer la configuration de l'instance en tant que service Kubernetes. Pour configurer ce check pour un Agent s'exécutant sur Kubernetes, créez un service avec la syntaxe suivante :

#### Annotations Autodiscovery v2

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["postgres"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<AZURE_INSTANCE_ENDPOINT>",
          "port": 5432,
          "username": "datadog@<AZURE_INSTANCE_ENDPOINT>",
          "password": "ENC[datadog_user_database_password]",
          "ssl": "require",
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "fully_qualified_domain_name": "<AZURE_INSTANCE_ENDPOINT>"
          }
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
"pg_stat_statements_view": "datadog.pg_stat_statements()",
"pg_stat_activity_view": "datadog.pg_stat_activity()"
```

Pour en savoir plus, consultez la section [Annotations Autodiscovery][5].

L'Agent de cluster enregistre automatiquement cette configuration et commence à exécuter le check Postgres.

Pour éviter d'exposer le mot de passe de l'utilisateur `datadog` en texte clair, utilisez le [package de gestion des secrets][6] de l'Agent et déclarez le mot de passe avec la syntaxe `ENC[]`.

[1]: /fr/containers/cluster_agent/setup/
[2]: /fr/containers/cluster_agent/clusterchecks/
[3]: /fr/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /fr/containers/kubernetes/integrations/?tab=helm
[5]: /fr/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /fr/agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

Consultez les [spécifications de l'intégration Postgres][7] pour en savoir plus sur la définition des champs `deployment_type` et `name`.

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `postgres` dans la section Checks. Vous pouvez également consulter la page [Databases][10] pour commencer à surveiller vos bases de données.
## Exemples de configuration de l'Agent
{{% dbm-postgres-agent-config-examples %}}
## Installer l'intégration Azure PostgreSQL

Pour recueillir des métriques de base de données plus complètes depuis Azure, installez l'[intégration Azure PostgreSQL][11] (facultatif).

## Problèmes connus

Pour les bases de données Postgres 16, les messages d'erreur suivants sont écrits dans le fichier de log :

```
psycopg2.errors.InsufficientPrivilege: permission denied for function pg_ls_waldir
2024-03-05 12:36:16 CET | CORE | ERROR | (pkg/collector/python/datadog_agent.go:129 in LogMessage) | - | (core.py:94) | Error querying wal_metrics: permission denied for function pg_ls_waldir
2024-03-05 12:36:30 CET | CORE | ERROR | (pkg/collector/python/datadog_agent.go:129 in LogMessage) | postgres:cc861f821fbbc2ae | (postgres.py:239) | Unhandled exception while using database connection postgres
Traceback (most recent call last):
  File "/opt/datadog-agent/embedded/lib/python3.11/site-packages/datadog_checks/postgres/postgres.py", line 224, in db
    yield self._db
  File "/opt/datadog-agent/embedded/lib/python3.11/site-packages/datadog_checks/postgres/postgres.py", line 207, in execute_query_raw
    cursor.execute(query)
psycopg2.errors.InsufficientPrivilege: permission denied for function pg_ls_waldir
```

Par conséquent, l'Agent ne collecte pas les métriques suivantes pour Postgres 16 : `postgresql.wal_count`, `postgresql.wal_size` et `postgresql.wal_age`.

## Dépannage

Si vous avez installé et configuré les intégrations et l'Agent comme décrit et que cela ne fonctionne pas comme prévu, consultez la section [Dépannage][12].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/agent_integration_overhead/?tab=postgres
[2]: /fr/database_monitoring/data_collected/#sensitive-information
[3]: https://www.postgresql.org/docs/current/config-setting.html
[4]: https://docs.microsoft.com/en-us/azure/postgresql/howto-configure-server-parameters-using-portal
[5]: /fr/integrations/faq/postgres-custom-metric-collection-explained/
[6]: https://www.postgresql.org/docs/current/app-psql.html
[7]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L664-L711
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[10]: https://app.datadoghq.com/databases
[11]: /fr/integrations/azure_db_for_postgresql/
[12]: /fr/database_monitoring/setup_postgres/troubleshooting/
[13]: /fr/database_monitoring/guide/managed_authentication
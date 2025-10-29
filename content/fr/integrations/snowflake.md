---
app_id: snowflake
app_uuid: 23e9084d-5801-4a71-88fe-f62b7c1bb289
assets:
  dashboards:
    Snowflake: assets/dashboards/snowflake.json
    Snowflake Organization Metrics: assets/dashboards/organization_metrics.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: snowflake.storage.storage_bytes.total
      metadata_path: metadata.csv
      prefix: snowflake.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10123
    source_type_name: Snowflake
  monitors:
    Snowflake failed logins: assets/monitors/snowflake_failed_logins.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- data stores
- gestion des coûts
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/snowflake/README.md
display_on_public_website: true
draft: false
git_integration_title: snowflake
integration_id: snowflake
integration_title: Snowflake
integration_version: 5.6.0
is_public: true
manifest_version: 2.0.0
name: snowflake
public_title: Snowflake
short_description: Surveillez des métriques clés concernant l'utilisation des crédits,
  le stockage, les requêtes, l'historique utilisateur et plus encore.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  - Category::Data Stores
  - Category::Cost Management
  configuration: README.md#Setup
  description: Surveillez des métriques clés concernant l'utilisation des crédits,
    le stockage, les requêtes, l'historique utilisateur et plus encore.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Snowflake
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Présentation

Ce check permet de surveiller [Snowflake][1] via l'Agent Datadog. Snowflake est un entrepôt de données analytique fourni en tant que SaaS et s'exécute entièrement sur une infrastructure cloud.
Cette intégration permet de surveiller l'utilisation des crédits, la facturation, le stockage, l'historique des requêtes et bien plus encore.

<div class="alert alert-info"><bold>Remarque</bold> :  les métriques sont recueillies par le biais de requêtes envoyées à Snowflake. Les requêtes transmises par l'intégration Datadog sont susceptibles d'être facturées par Snowflake.</div>

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Le check Snowflake est inclus avec le package de l'[Agent Datadog][2].

**Remarque** : le check Snowflake n'est pas disponible dans l'Agent v6 basé sur Python 2. Pour utiliser Snowflake avec l'Agent v6, consultez la section [Utiliser Python 3 avec l'Agent v6 de Datadog][3] ou passez à l'Agent v7.

### Configuration
<div class="alert alert-danger">Snowflake recommande d'accorder des autorisations à un rôle alternatif tel que `SYSADMIN`. En savoir plus sur le contrôle <a href="https://docs.snowflake.com/en/user-guide/security-access-control-considerations.html#control-the-assignment-of-the-accountadmin-role-to-users"> du rôle ACCOUNTADMIN</a> (en anglais).</div>

1. Créez un rôle et un utilisateur spécifiques Datadog pour surveiller Snowflake. Dans Snowflake, exécutez les commandes suivantes pour créer un rôle personnalisé ayant accès au schéma ACCOUNT_USAGE.

   Remarque : par défaut, cette intégration surveille la base de données `SNOWFLAKE` et le schéma `ACCOUNT_USAGE`. Consultez la section « Recueillir les données d'une organisation » pour découvrir comment surveiller le schéma `ORGANIZATION_USAGE`.
    Cette base de données est disponible par défaut et ne peut être consultée que par les utilisateurs disposant du rôle `ACCOUNTADMIN` ou de [tout rôle accordé par ACCOUNTADMIN][4].


    ```text
    use role ACCOUNTADMIN;
    grant imported privileges on database snowflake to role SYSADMIN;

    use role SYSADMIN;

    ```


    Vous pouvez également créer un rôle personnalisé `DATADOG` ayant accès à `ACCOUNT_USAGE`.


    ```text
    -- Créer un nouveau rôle destiné à surveiller l'utilisation de Snowflake.
    create role DATADOG;

    -- Accorder des autorisations sur la base de données SNOWFLAKE au nouveau rôle.
    grant imported privileges on database SNOWFLAKE to role DATADOG;

    -- Accorder l'accès à l'utilisation de votre entrepôt de données par défaut au rôle DATADOG.
   grant usage on warehouse <ENTREPÔT_DONNÉES> to role DATADOG;

    -- Créer un utilisateur. Ignorez cette étape si vous avez déjà un utilisateur existant.
    create user UTILISATEUR_DATADOG
    LOGIN_NAME = UTILISATEUR_DATADOG
    password = '<MOTDEPASSE>'
    default_warehouse = <ENTREPÔT_DONNÉES>
    default_role = DATADOG
    default_namespace = SNOWFLAKE.ACCOUNT_USAGE;

    -- Accorder le rôle de monitor à l'utilisateur.
    grant role DATADOG to user <UTILISATEUR>;
    ```


2. Modifiez le fichier `snowflake.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Snowflake. Consultez le [fichier d'exemple snowflake.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

    ```yaml
        ## @param account - string - required
        ## Name of your account (provided by Snowflake), including the platform and region if applicable.
        ## For more information on Snowflake account names,
        ## see https://docs.snowflake.com/en/user-guide/connecting.html#your-snowflake-account-name
        #
      - account: <ORG_NAME>-<ACCOUNT_NAME>

        ## @param username - string - required
        ## Login name for the user.
        #
        username: <USER>

        ## @param password - string - required
        ## Password for the user
        #
        password: <PASSWORD>

        ## @param role - string - required
        ## Name of the role to use.
        ##
        ## By default, the SNOWFLAKE database is only accessible by the ACCOUNTADMIN role. Snowflake recommends
        ## configuring a role specific for monitoring:
        ## https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
        #
        role: <ROLE>

        ## @param min_collection_interval - number - optional - default: 15
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        ##
        ## NOTE: Most Snowflake ACCOUNT_USAGE views are populated on an hourly basis,
        ## so to minimize unnecessary queries, set the `min_collection_interval` to 1 hour.
        #
        min_collection_interval: 3600

        # @param disable_generic_tags - boolean - optional - default: false
        # Generic tags such as `cluster` will be replaced by <integration_name>_cluster to avoid
        # getting mixed with other integration tags.
        # disable_generic_tags: true
    ```

    <div class="alert alert-info">In the default `conf.yaml`, the <code>min_collection_interval</code> is 1 hour.
    Snowflake metrics are aggregated by day, you can increase the interval to reduce the number of queries.<br>
    <bold>Note</bold>: Snowflake ACCOUNT_USAGE views have a <a href="https://docs.snowflake.com/en/sql-reference/account-usage.html#data-latency">known latency</a> of 45 minutes to 3 hours.</div>

3. [Redémarrez l'Agent][6].

#### Recueillir les données d'une organisation

Par défaut, cette intégration surveille le schéma `ACCOUNT_USAGE`. Vous pouvez toutefois la configurer pour qu'elle surveille les métriques liées à votre organisation.

Pour recueillir les métriques liées à votre organisation, définissez le champ schema sur `ORGANIZATION_USAGE` et le champ `min_collection_interval` sur 43200 dans la configuration de l'intégration. Ce paramètre permet de réduire le nombre de requêtes envoyées à Snowflake, la plupart des métriques affichant une latence pouvant aller jusqu'à 24 heures.

Remarque : pour surveiller les métriques liées à votre organisation, votre `user` doit disposer du rôle `ORGADMIN`.

  ```yaml
      - schema: ORGANIZATION_USAGE
        min_collection_interval: 43200
  ```

Seules certaines métriques sont activées par défaut. Pour recueillir toutes les métriques liées à votre organisation, utilisez l'option de configuration `metric_groups` :

  ```yaml
      metric_groups:
        - snowflake.organization.warehouse
        - snowflake.organization.currency
        - snowflake.organization.credit
        - snowflake.organization.storage
        - snowflake.organization.contracts
        - snowflake.organization.balance
        - snowflake.organization.rate
        - snowflake.organization.data_transfer
  ```

Vous pouvez également surveiller les métriques liées à votre compte en plus de celles liées à votre organisation :

  ```yaml
      instances:
      - account: example-inc
        username: DATADOG_ORG_ADMIN
        password: '<MOTDEPASSE>'
        role: SYSADMIN
        schema: ORGANIZATION_USAGE
        database: SNOWFLAKE
        min_collection_interval: 43200

      - account: example-inc
        username: DATADOG_ACCOUNT_ADMIN
        password: '<MOTDEPASSE>'
        role: DATADOG_ADMIN
        schema: ACCOUNT_USAGE
        database: SNOWFLAKE
        min_collection_interval: 3600
  ```

#### Recueillir les données de plusieurs environnements différents

Si vous souhaitez recueillir les données de plusieurs environnements Snowflake, ajoutez chaque environnement en tant qu'instance dans votre fichier `snowflake.d/conf.yaml`. Par exemple, pour recueillir les données de deux utilisateurs nommés `DATADOG_SYSADMIN` et `DATADOG_USER` :

```yaml
instances:
  - account: example-inc
    username: DATADOG_SYSADMIN
    password: '<MOTDEPASSE>'
    role: SYSADMIN
    database: EXAMPLE-INC

  - account: example-inc
    username: DATADOG_USER
    password: '<MOTDEPASSE>'
    role: DATADOG_USER
    database: EXAMPLE-INC
```

#### Configuration d'un proxy

Snowflake recommande de définir des [variables d'environnement pour configurer un proxy][7].

Vous pouvez également définir `proxy_host`, `proxy_port`, `proxy_user` et `proxy_password` sous `init_config` dans le fichier [snowflake.d/conf.yaml][5].

**REMARQUE** : Snowflake met automatiquement en forme les configurations de proxy et définit [les variables d'environnement de proxy standard][8]. Ces variables ont une incidence sur l'ensemble des requêtes provenant des intégrations, y compris les services d'orchestration comme Docker, ECS et Kubernetes.

#### Connectivité privée dans la configuration Snowflake

Si une [connectivité privée][9] (par exemple [AWS PrivateLink][10]) est activée dans Snowflake, vous pouvez configurer l'intégration Snowflake en mettant à jour l'option de configuration `account` et en appliquant le format suivant :

  ```yaml
        - account: <COMPTE>.<ID_RÉGION>.privatelink
  ```

### Requêtes personnalisées Snowflake

L'intégration Snowflake prend en charge les requêtes personnalisées. Par défaut, elle interagit avec la base de données partagée `SNOWFLAKE` et le schéma `ACCOUNT_USAGE`.

Pour exécuter des requêtes personnalisées avec un autre schéma ou une autre base de données, ajoutez une autre instance au [fichier d'exemple snowflake.d/conf.yaml][5] et configurez les options `database` et `schema`.
Vérifiez que l'utilisateur et le rôle ont accès à la base de données ou au schéma indiqué.

#### Options de configuration
`custom_queries` dispose des options suivantes :

| Option        | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| query         | Oui      | Le SQL à exécuter. Il peut s'agir d'une simple déclaration ou d'un script sur plusieurs lignes. Toutes les rangées des résultats sont évaluées. Utilisez le symbole pipe « | » si vous avez besoin d'un script sur plusieurs lignes.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| columns       | Oui      | Liste représentant toutes les colonnes, triées par ordre séquentiel de gauche à droite.<br><br> Deux types d'informations sont obligatoires :<br> -**`name`** : le suffixe à ajouter à metric_prefix afin de former un nom de métrique complet. Si le `type` est défini sur `tag`, la colonne est considérée comme un tag et appliquée à chaque métrique recueillie par cette requête.<br> - **`type`** :  la méthode d'envoi (`gauge`, `count`, `rate`, etc.). Cette option peut également être définie sur `tag` pour ajouter à chaque métrique de la rangée le nom et la valeur (`<nom>:<valeur_rangée>`) de l'élément en tant que tag dans cette colonne. |
| usage-metering-get-hourly-usage-for-lambda-traced-invocations          | Non       | La liste des tags statiques à appliquer à chaque métrique.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


##### Remarques
- Au moins un élément de `columns` doit correspondre à un type de métrique (`gauge`, `count`, `rate`, etc.).
- Le nombre d'éléments dans columns doit correspondre au nombre de colonnes renvoyées par la requête.
- L'ordre des éléments dans `columns` doit correspondre à celui des valeurs renvoyées par la requête.

```yaml
custom_queries:
  - query: select F3, F2, F1 from Table;
    columns:
      - name: f3_metric_alias
        type: gauge
      - name: f2_tagkey
        type: tag
      - name: f1_metric_alias
        type: count
    tags:
      - test:snowflake
```

#### Exemple
La requête suivante compte toutes les requêtes de la [vue `QUERY_HISTORY`][11] avec un tag comportant les noms de la base de données, du schéma et de l'entrepôt.

```TEXT
select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
```

##### Configuration

Voici un exemple de configuration de requêtes personnalisées dans `instances` :

```yaml
custom_queries:
  - query: select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
    columns:
      - name: query.total
        type: gauge
      - name: database_name
        type: tag
      - name: schema_name
        type: tag
      - name: warehouse_name
        type: tag
    tags:
      - test:snowflake
```

##### Validation

Pour vérifier le résultat, recherchez les métriques à l'aide de la vue [Metrics Summary][12] :

![Résumé des métriques Snowflake][13]


### Validation

[Lancez la sous-commande status de l'Agent][14] et cherchez `snowflake` dans la section Checks.

## Données collectées

<div class="alert alert-info"><bold>Remarque</bold> : seules les métriques des groupes de métriques suivants sont recueillies par défaut : <code>snowflake.query.*</code>, <code>snowflake.billing.*</code>, <code>snowflake.storage.*</code> et <code>snowflake.logins.*</code>.

Si vous souhaitez recueillir des métriques d'autres groupes, consultez l'<a href="https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example">exemple de fichier de configuration pour cette intégration</a>.
</div>

### Métriques
{{< get-metrics-from-git "snowflake-web" >}}


### Événements

Snowflake n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "snowflake-web" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][17].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveillance de Snowflake avec Datadog][18]


[1]: https://www.snowflake.com/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-v6-python-3/?tab=hostagent
[4]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[5]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.snowflake.com/en/user-guide/python-connector-example.html#using-a-proxy-server
[8]: https://github.com/snowflakedb/snowflake-connector-python/blob/d6df58f1c338b255393571a08a1f9f3a71d8f7b6/src/snowflake/connector/proxy.py#L40-L41
[9]: https://docs.snowflake.com/en/user-guide/private-snowflake-service.html
[10]: https://docs.snowflake.com/en/user-guide/admin-security-privatelink.html
[11]: https://docs.snowflake.com/en/sql-reference/account-usage/query_history.html
[12]: https://docs.datadoghq.com/fr/metrics/summary/
[13]: https://raw.githubusercontent.com/DataDog/integrations-core/master/snowflake/images/custom_query.png
[14]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-core/blob/master/snowflake/metadata.csv
[16]: https://github.com/DataDog/integrations-core/blob/master/snowflake/assets/service_checks.json
[17]: https://docs.datadoghq.com/fr/help/
[18]: https://www.datadoghq.com/blog/snowflake-monitoring-datadog/

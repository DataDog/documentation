---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Snowflake: assets/dashboards/snowflake.json
  metrics_metadata: metadata.csv
  monitors:
    Snowflake failed logins: assets/recommended_monitors/snowflake_failed_logins.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - data store
  - gestion des coûts
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/snowflake/README.md'
display_name: Snowflake
draft: false
git_integration_title: snowflake
guid: 4813a514-e9a4-4f28-9b83-b4221b51b18b
integration_id: snowflake
integration_title: Snowflake
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: snowflake.
metric_to_check: snowflake.storage.storage_bytes.total
name: snowflake
public_title: Intégration Datadog/Snowflake
short_description: 'Surveillez des métriques clés concernant l''utilisation des crédits, le stockage, les requêtes, l''historique utilisateur et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [Snowflake][1] via l'Agent Datadog. Snowflake est un entrepôt de données analytique fourni en tant que SaaS et s'exécute entièrement sur une infrastructure cloud. 
Cette intégration permet de surveiller l'utilisation des crédits, la facturation, le stockage, l'historique des requêtes et bien plus encore.

<div class="alert alert-info"><bold>REMARQUE : les métriques sont collectées par le biais de requêtes envoyées à Snowflake. Les requêtes transmises par l'intégration Datadog sont facturables par Snowflake.</bold></div>

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Le check Snowflake est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

**Remarque** : actuellement, le check Snowflake n'est pas disponible pour macOS dans l'Agent Datadog 6 avec Python 2.

<div class="alert alert-warning">Pour les utilisateurs qui configurent l'intégration avec l'Agent <code>v7.23.0</code>, passez à la version <code>2.0.1</code> de l'intégration pour tirer profit des dernières nouveautés.
Pour mettre à niveau l'intégration, utilisez <a href=https://docs.datadoghq.com/agent/guide/integration-management/#install>cette commande</a> :<br>

```text
datadog-agent integration install datadog-snowflake==2.0.1
```
</div>

### Configuration

1. Modifiez le fichier `snowflake.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Snowflake. Consultez le [fichier d'exemple snowflake.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

    **Remarque** : par défaut, cette intégration surveille la base de données `SNOWFLAKE` et le schéma `ACCOUNT_USAGE`.
    Cette base de données est disponible par défaut et ne peut être consultée que par les utilisateurs disposant du rôle `ACCOUNTADMIN` ou de [tout rôle accordé par ACCOUNTADMIN][4].

    ```yaml
        ## @param account - string - required
        ## Name of your account (provided by Snowflake), including the platform and region if applicable.
        ## For more information on Snowflake account names,
        ## see https://docs.snowflake.com/en/user-guide/connecting.html#your-snowflake-account-name
        #
      - account: <ACCOUNT>

        ## @param user - string - required
        ## Login name for the user.
        #
        user: <USER>

        ## @param password - string - required
        ## Password for the user
        #
        password: <PASSWORD>

        ## @param min_collection_interval - number - optional - default: 3600
        ## This changes the collection interval of the check. For more information, see:
        ## https://docs.datadoghq.com/developers/write_agent_check/#collection-interval
        ##
        ## NOTE: Most Snowflake ACCOUNT_USAGE views are populated on an hourly basis,
        ## so to minimize unnecessary queries the `min_collection_interval` defaults to 1 hour.
        #
        # min_collection_interval: 3600
    ```

    <div class="alert alert-info">By default, the <code>min_collection_interval</code> is 1 hour. 
    Snowflake metrics are aggregated by day, you can increase the interval to reduce the number of queries.<br>
    <bold>Note</bold>: Snowflake ACCOUNT_USAGE views have a <a href="https://docs.snowflake.com/en/sql-reference/account-usage.html#data-latency">known latency</a> of 45 minutes to 3 hours.</div>

2. [Redémarrez l'Agent][5].

### Requêtes personnalisées Snowflake

L'intégration Snowflake prend en charge les requêtes personnalisées. Par défaut, elle interagit avec la base de données partagée `SNOWFLAKE` et le schéma `ACCOUNT_USAGE`.

Si vous souhaitez exécuter des requêtes personnalisées avec un autre schéma ou une autre base de données, ajoutez une autre instance au [fichier d'exemple snowflake.d/conf.yaml][3] et configurez les options `database` et `schema`.
Vérifiez que l'utilisateur et le rôle ont accès à la base de données ou au schéma indiqué.

#### Options de configuration
`custom_queries` dispose des options suivantes :

| Option        | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| query         | Oui      | Il s'agit du SQL à exécuter. Cela peut être une simple déclaration ou un script sur plusieurs lignes. Toutes les rangées des résultats sont évaluées. Utilisez le symbole pipe « | » si vous avez besoin d'un script sur plusieurs lignes.                                                                                                                                                                                                                                                                                                                                                                                                                              |
| columns       | Oui      | Il s'agit d'une liste représentant toutes les colonnes, ordonnées séquentiellement de gauche à doirte.<br><br> Deux types d'informations sont obligatoires :<br> -**`name`** : le suffixe à ajouter à metric_prefix afin de former un nom de métrique complet. Si le `type` est défini sur `tag`, la colonne est considérée comme un tag et appliquée à chaque métrique recueillie par cette requête.<br> - **`type`**:  la méthode d'envoi (`gauge`, `count`, `rate`, etc.). Cette option peut également être définie sur `tag` pour appliquer à chaque métrique de la rangée un tag avec le nom et la valeur (`<name>:<row_value>`) de l'élément dans cette colonne. |
| tags          | Non       | La liste des tags statiques à appliquer à chaque métrique.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


##### Remarques
- Au moins un élément des `columns` définies doit correspondre à un type de métrique (`gauge`, `count`, `rate`, etc.).
- Le nombre d'éléments dans `columns` doit correspondre au nombre de colonnes renvoyées par la requête.
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
L'exemple de requête suivante compte toutes les requêtes de la [vue `QUERY_HISTORY`][6] taguées par le nom de la base de données, du schéma et de l'entrepôt.

```TEXT
select count(*), DATABASE_NAME, SCHEMA_NAME, WAREHOUSE_NAME from QUERY_HISTORY group by 2, 3, 4;
```

##### Configuration

Voici à quoi ressemble la configuration de requêtes personnalisées dans `instances` :

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

Pour vérifier le résultat, recherchez les métriques à l'aide de la vue [Metrics Summary][7] :

![Résumé des métriques Snowflake][8]


### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `snowflake` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "snowflake" >}}


### Checks de service

**snowflake.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à s'authentifier et à se connecter à Snowflake. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Snowflake n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://www.snowflake.com/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/snowflake/datadog_checks/snowflake/data/conf.yaml.example
[4]: https://docs.snowflake.com/en/sql-reference/account-usage.html#enabling-account-usage-for-other-roles
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.snowflake.com/en/sql-reference/account-usage/query_history.html
[7]: https://docs.datadoghq.com/fr/metrics/summary/
[8]: https://raw.githubusercontent.com/DataDog/integrations-core/master/snowflake/images/custom_query.png
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/snowflake/metadata.csv
[11]: https://docs.datadoghq.com/fr/help/
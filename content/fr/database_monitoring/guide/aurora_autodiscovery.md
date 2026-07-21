---
aliases:
- /fr/database_monitoring/aurora_autodiscovery
title: Configuration de la surveillance de base de données pour les clusters de bases
  de données Amazon Aurora
---
Ce guide suppose que vous avez configuré la surveillance de base de données pour vos bases de données Amazon Aurora [Postgres][1] ou [MySQL][11].

## Avant de commencer {#before-you-begin}

Bases de données prises en charge
: Postgres, MySQL

Versions d'agent prises en charge
: 7.53.0+

## Aperçu {#overview}

L'[Autodécouverte][4] de Datadog vous permet de configurer la surveillance dans des infrastructures dynamiques. Vous pouvez utiliser cette fonctionnalité pour surveiller vos clusters Aurora sans avoir à lister les points de terminaison des hôtes de base de données individuels (par exemple, `postgres.d/conf.yaml`). Cela est particulièrement utile pour les clusters qui utilisent [Aurora Auto Scaling][6], qui ajuste dynamiquement le nombre d'Aurora Replicas en réponse aux variations de connectivité ou de charge de travail. L'autodécouverte découvre et surveille automatiquement les instances d'endpoint primary et replica.

Avec l'autodécouverte et la surveillance de base de données, vous pouvez définir des modèles de configuration pour les checks Postgres ou MySQL et spécifier à quels clusters appliquer chaque check.

## Activation de l'autodécouverte pour les clusters Aurora {#enabling-autodiscovery-for-aurora-clusters}

1. [Accorder des autorisations AWS](#grant-aws-permissions)
2. [Configurer les balises Aurora](#configure-aurora-tags)
3. [Configurer le Datadog Agent](#configure-the-datadog-agent)
4. [Créer un modèle de configuration](#create-a-configuration-template)

### Accorder des autorisations AWS {#grant-aws-permissions}

Le Datadog Agent nécessite l'autorisation d'exécuter `rds:DescribeDBClusters` et `rds:DescribeDBInstances` dans votre compte AWS. Datadog recommande d'attacher une politique de rôle IAM à l'instance EC2 sur laquelle le Datadog Agent s'exécute.

Un exemple de politique qui accorde ces autorisations :

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:DescribeDBClusters",
        "rds:DescribeDBInstances"
      ],
      "Resource": [
        "arn:aws:rds:<region>:<account>:cluster:*",
        "arn:aws:rds:<region>:<account>:db:*"
      ]
    }
  ]
}
```

Vous pouvez également attacher la politique [`AmazonRDSReadOnlyAccess`][3].

### Configurer les balises Aurora {#configure-aurora-tags}

Le listener découvre tous les clusters Aurora dans le compte et la région où l'Agent est en cours d'exécution et qui ont la balise `datadoghq.com/scrape:true` appliquée. Vous pouvez également configurer le Datadog Agent pour découvrir des clusters avec des balises spécifiques.

Vous devez appliquer ces balises au cluster de base de données (Rôle : `Regional cluster`). Pour plus d'informations sur l'étiquetage des ressources RDS, consultez la [documentation AWS][7].

Si vous configurez `tags` comme un tableau vide, l'Autodécouverte découvrira tous les clusters dans le compte et la région.

### Configurer le Datadog Agent {#configure-the-datadog-agent}

L'autodécouverte utilise un listener de service du Datadog Agent, qui découvre tous les endpoints des hôtes de base de données dans un cluster Aurora et transmet les endpoints découverts au pipeline de planification des checks existants. Vous pouvez configurer le listener dans le fichier `datadog.yaml` :

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

**Remarque** : Le Datadog Agent ne découvre que les instances Aurora s'exécutant dans la même région où il s'exécute. Pour déterminer la région de l'instance, le Datadog Agent utilise [IMDS (Instance Metadata Service)][8]. Si votre instance EC2 nécessite `IMDSv2`, vous devez configurer le Datadog Agent pour utiliser `IMDSv2` en définissant `ec2_prefer_imdsv2: true` dans `datadog.yaml`, comme indiqué ci-dessous :

``` yaml {hl_lines=[1]}
ec2_prefer_imdsv2: true
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true

```

By default, the listener only discovers Aurora clusters in the account and region where the Agent is running, and only those with the `datadoghq.com/scrape:true` tag. You can also configure the listener to discover clusters with specific tags.

To specify custom tags for Aurora cluster discovery in the `datadog.yaml` file:

``` yaml {hl_lines=["5-6"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags:
        - "my-cluster-tag-key:value"
```

To monitor all clusters in the account and region:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags: []

```

The listener queries the AWS API for the list of hosts in a loop. The frequency with which the listener queries the AWS API, in seconds, is configurable in the `datadog.yaml` file:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      discovery_interval: 300
```

The listener provides an `%%extra_dbm%%` variable that can be used to enable or disable DBM for the instance. This value defaults to `true` if the tag `datadoghq.com/dbm:true` is present. To specify a custom tag for this value use `dbm_tag`:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      dbm_tag: "use_dbm:true"

```

The `%%extra_dbm%%` value is true if the tag is present, and false otherwise. It does not set its value to the value of the tag.

The listener provides an `%%extra_global_view_db%%` variable that can be used to set the `global_view_db` for the instance. This value defaults to the value of the tag `datadoghq.com/global_view_db`. To specify a custom tag for this value use `global_view_db_tag`:

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      global_view_db_tag: "my_db_tag"
```

### Create a configuration template 

The Datadog Agent supports configuration templates for the Postgres and MySQL integrations. Define a configuration template for the Aurora clusters you wish to monitor.

{{< tabs >}}
{{% tab "Postgres" %}}

Tout d'abord, ajoutez un `ad_identifier` pour Postgres géré par Aurora à votre modèle de configuration (`postgres.d/conf_aws_aurora.yaml`) :

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
```

Ensuite, définissez le reste du modèle. Utilisez [les variables de modèle](#supported-template-variables) pour les paramètres qui peuvent changer, tels que `host` et `port`.

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: "%%extra_dbm%%"
    database_autodiscovery:
      enabled: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

Dans cet exemple, les variables de modèle `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, `%%extra_dbm%%` et `%%extra_region%%` sont peuplées dynamiquement avec des informations provenant du cluster Aurora.

#### Authentification {#authentication}

Si vous utilisez un mot de passe pour l'authentification, notez que le mot de passe fourni dans ce fichier modèle sera utilisé dans chaque base de données découverte.

{{% collapse-content title="Stockez votre mot de passe en toute sécurité" level="h5" id="securely-store-your-password" %}}
##### Stockez votre mot de passe en toute sécurité {#securely-store-your-password}
{{% dbm-secret %}}

Le modèle de configuration d'exemple suivant est appliqué à chaque instance découverte dans le cluster Aurora :

``` yaml {hl_lines=[8]}
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    password: "ENC[datadog_user_database_password]"
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"

```
{{% /collapse-content %}}

{{% collapse-content title="IAM Authentication" level="h5" id="iam-authentication" %}}
##### IAM Authentication

To use [IAM authentication][2] to connect to your Aurora cluster, use the following template:

``` yaml {hl_lines=["12-13"]}
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
      managed_authentication:
        enabled: "%%extra_managed_authentication_enabled%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"
```

The template variable `%%extra_managed_authentication_enabled%%` resolves to `true` if the instance is using IAM authentication.

[2]: /fr/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}}
{{% collapse-content title="Custom global_view_db (7.75.0+)" level="h5" id="global-view-db" %}}
##### Custom global_view_db {#custom-global-view-database}

Pour définir un Custom global_view_db pour l'autodécouverte de base de données, assurez-vous d'utiliser le Datadog Agent version 7.75.0 ou supérieure et utilisez le modèle suivant :

``` yaml {hl_lines=["11"]}
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    database_autodiscovery:
      enabled: true
      global_view_db: "%%extra_global_view_db%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"

```
{{% /collapse-content %}}
{{% /tab %}}

{{% tab "MySQL" %}}
First, add an `ad_identifier` for Aurora-managed MySQL to your configuration template (`mysql.d/conf_aws_aurora.yaml`) file:

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
```

Then, define the remainder of the template. Use [template variables](#supported-template-variables) for parameters that may change, such as `host` and `port`.

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

In this example, the template variables `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, `%%extra_dbm%%`, and `%%extra_region%%` are dynamically populated with information from the Aurora cluster.

#### Authentication 

If you are using password for authentication note that the password provided in this template file will be used across every database discovered.

{{% collapse-content title="Stockez votre mot de passe en toute sécurité" level="h5" id="securely-store-your-password" %}}
##### Stockez votre mot de passe en toute sécurité {#securely-store-your-password-1}
{{% dbm-secret %}}

Le modèle de configuration d'exemple suivant est appliqué à chaque instance découverte dans le cluster Aurora :

``` yaml {hl_lines=[8]}
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    password: "ENC[datadog_user_database_password]"
    dbm: "%%extra_dbm%%"
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"

```
{{% /collapse-content %}}

{{% collapse-content title="IAM Authentication (7.67.0+)" level="h5" id="iam-authentication" %}}
##### IAM Authentication

To use [IAM authentication][2] to connect to your RDS instance, make sure that you are using Agent version 7.67.0 or above and use the following template:

``` yaml {hl_lines=["12-13"]}
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
      managed_authentication:
        enabled: "%%extra_managed_authentication_enabled%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"
```

The template variable `%%extra_managed_authentication_enabled%%` resolves to `true` if the instance is using IAM authentication.

[2]: /fr/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}

Pour plus d'informations sur la configuration de l'autodécouverte avec des intégrations, consultez la [documentation sur l'autodécouverte][5].

#### Variables de modèle prises en charge {#supported-template-variables}

| Variable de modèle                        | Source                                                                                                                                        |
|:-----------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| %%host%%                                 | L'endpoint de l'instance Aurora                                                                                                                  |
| %%port%%                                 | Le port de l'instance Aurora                                                                                                               |
| %%extra_region%%                         | La région AWS où se trouve l'instance                                                                                                  |
| %%extra_dbclusteridentifier%%            | L'identifiant du cluster de l'Aurora découvert                                                                                       |
| %%extra_dbm%% | Indique si DBM est activé sur le cluster. Déterminé par la présence de `dbm_tag`, qui par défaut est `datadoghq.com/dbm:true`.                                              |
| %%extra_managed_authentication_enabled%% | Indique si l'authentification IAM est activée sur le cluster. <br/>Ceci est utilisé pour déterminer si l'authentification gérée doit être utilisée pour la connexion. |
| %%extra_global_view_db%%                       | La valeur de `global_view_db_tag`, qui par défaut est `datadoghq.com/global_view_db`.                                                      |

[1]: /fr/database_monitoring/setup_postgres/aurora/?tab=postgres10
[3]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonRDSReadOnlyAccess.html
[4]: /fr/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[5]: /fr/containers/docker/integrations/?tab=dockeradv2
[6]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html#Tagging.HowTo
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[9]: https://yum.datadoghq.com/beta/7/x86_64/datadog-agent-7.52.0~dbm~aurora~autodiscovery~beta~0.3-1.x86_64.rpm
[10]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/amazonlinux/?tab=agentv6v7
[11]: /fr/database_monitoring/setup_mysql/aurora?tab=mysql56
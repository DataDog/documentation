---
aliases:
- /fr/database_monitoring/aurora_autodiscovery
title: Configurer Database Monitoring pour les clusters Amazon Aurora DB
---

Ce guide part du principe que vous avez configuré Database Monitoring pour vos bases de données Amazon Aurora [Postgres][1] ou [MySQL][11].

## Avant de commencer

Bases de données prises en charge
: Postgres, MySQL

Versions de l'Agent prises en charge
: 7.53.0+

## Présentation

La fonctionnalité [Autodiscovery][4] de Datadog vous permet de configurer la surveillance dans des infrastructures dynamiques. Utilisez cette fonctionnalité pour surveiller vos clusters Aurora sans avoir à lister les endpoints individuels des hosts de base de données (par exemple, `postgres.d/conf.yaml`). Cela est particulièrement utile pour les clusters qui utilisent [Aurora Auto Scaling][6], qui ajuste dynamiquement le nombre de réplicas Aurora en fonction des variations de connectivité ou de charge de travail. Autodiscovery découvre et surveille automatiquement les instances des endpoints primaires et des réplicas.

Avec Autodiscovery et Database Monitoring, définissez des modèles de configuration pour les checks Postgres ou MySQL et spécifiez les clusters auxquels appliquer chaque check.

## Activer Autodiscovery pour les clusters Aurora

1. [Accorder des autorisations AWS](#accorder-des-autorisations-aws)
2. [Configurer les tags Aurora](#configurer-les-tags-aurora)
3. [Configurer l'Agent Datadog](#configurer-lagent-datadog)
4. [Créer un modèle de configuration](#créer-un-modèle-de-configuration)

### Accorder des autorisations AWS

L'Agent Datadog doit disposer de l'autorisation d'exécuter `rds:DescribeDBClusters` et `rds:DescribeDBInstances` dans votre compte AWS. Datadog recommande d'attacher une politique de rôle IAM à l'instance EC2 sur laquelle l'Agent s'exécute.

Exemple de politique accordant ces autorisations :

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

### Configurer les tags Aurora

Le listener découvre tous les clusters Aurora du compte et de la région où l'Agent s'exécute et auxquels le tag `datadoghq.com/scrape:true` est appliqué. Vous pouvez également configurer l'Agent pour découvrir les clusters avec des tags spécifiques.

Appliquez ces tags au cluster DB (rôle : `Regional cluster`). Pour plus d'informations sur l'application de tags aux ressources RDS, consultez la section [documentation AWS][7].

Si vous configurez `tags` comme un tableau vide, Autodiscovery découvrira tous les clusters du compte et de la région.

### Configurer l'Agent Datadog

Autodiscovery utilise un listener de service de l'Agent qui découvre tous les endpoints des hosts de base de données dans un cluster Aurora et transfère les endpoints découverts au pipeline de planification des checks de l'Agent existant. Configurez le listener dans le fichier `datadog.yaml` :

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

**Remarque** : l'Agent ne découvre que les instances Aurora s'exécutant dans la même région que l'Agent. Pour déterminer la région de l'instance, l'Agent utilise [IMDS (Instance Metadata Service)][8]. Si votre instance EC2 requiert `IMDSv2`, configurez l'Agent pour utiliser `IMDSv2` en définissant `ec2_prefer_imdsv2: true` dans `datadog.yaml`, comme indiqué ci-dessous :

``` yaml {hl_lines=[1]}
ec2_prefer_imdsv2: true
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

Par défaut, le listener ne découvre que les clusters Aurora du compte et de la région où l'Agent s'exécute, et uniquement ceux portant le tag `datadoghq.com/scrape:true`. Vous pouvez également configurer le listener pour découvrir les clusters avec des tags spécifiques.

Pour spécifier des tags personnalisés pour la découverte de clusters Aurora dans le fichier `datadog.yaml` :

``` yaml {hl_lines=["5-6"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags:
        - "my-cluster-tag-key:value"
```

Pour surveiller tous les clusters du compte et de la région :

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags: []
```

Le listener interroge l'API AWS pour obtenir la liste des hosts en boucle. La fréquence à laquelle le listener interroge l'API AWS, en secondes, est configurable dans le fichier `datadog.yaml` :

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      discovery_interval: 300
```

Le listener fournit une variable `%%extra_dbm%%` qui peut être utilisée pour activer ou désactiver DBM pour l'instance. Cette valeur est par défaut `true` si le tag `datadoghq.com/dbm:true` est présent. Pour spécifier un tag personnalisé pour cette valeur, utilisez `dbm_tag` :

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      dbm_tag: "use_dbm:true"
```

La valeur `%%extra_dbm%%` est true si le tag est présent, et false dans le cas contraire. Elle ne prend pas la valeur du tag.

Le listener fournit une variable `%%extra_global_view_db%%` qui peut être utilisée pour définir le `global_view_db` de l'instance. Cette valeur est par défaut celle du tag `datadoghq.com/global_view_db`. Pour spécifier un tag personnalisé pour cette valeur, utilisez `global_view_db_tag` :

``` yaml {hl_lines=["5"]}
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      global_view_db_tag: "my_db_tag"
```

### Créer un modèle de configuration

L'Agent Datadog prend en charge les modèles de configuration pour les intégrations Postgres et MySQL. Définissez un modèle de configuration pour les clusters Aurora que vous souhaitez surveiller.

{{< tabs >}}
{{% tab "Postgres" %}}

Commencez par ajouter un `ad_identifier` pour Postgres géré par Aurora dans votre fichier de modèle de configuration (`postgres.d/conf_aws_aurora.yaml`) :

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
```

Définissez ensuite le reste du modèle. Utilisez des [variables de modèle](#variables-de-modèle-prises-en-charge) pour les paramètres susceptibles de changer, comme `host` et `port`.

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

Dans cet exemple, les variables de modèle `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, `%%extra_dbm%%` et `%%extra_region%%` sont dynamiquement renseignées avec les informations du cluster Aurora.

#### Authentification

Si vous utilisez un mot de passe pour l'authentification, notez que le mot de passe fourni dans ce fichier de modèle sera utilisé pour chaque base de données découverte.

{{% collapse-content title="Stocker votre mot de passe de manière sécurisée" level="h5" id="securely-store-your-password" %}}
##### Stocker votre mot de passe de manière sécurisée
{{% dbm-secret %}}

Le modèle de configuration exemple suivant est appliqué à chaque instance découverte dans le cluster Aurora :

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

{{% collapse-content title="Authentification IAM" level="h5" id="iam-authentication" %}}
##### Authentification IAM

Pour utiliser l'[authentification IAM][2] afin de vous connecter à votre cluster Aurora, utilisez le modèle suivant :

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

La variable de modèle `%%extra_managed_authentication_enabled%%` prend la valeur `true` si l'instance utilise l'authentification IAM.

[2]: /fr/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}}
{{% collapse-content title="Custom global_view_db (7.75.0+)" level="h5" id="global-view-db" %}}
##### Base de données de vue globale personnalisée

Pour définir une base de données de vue globale personnalisée pour la découverte automatique de bases de données, assurez-vous d'utiliser la version 7.75.0 ou ultérieure de l'Agent et utilisez le modèle suivant :

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
      global_view_db: "%%global_view_db%%"
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
Commencez par ajouter un `ad_identifier` pour MySQL géré par Aurora dans votre fichier de modèle de configuration (`mysql.d/conf_aws_aurora.yaml`) :

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
```

Définissez ensuite le reste du modèle. Utilisez des [variables de modèle](#variables-de-modèle-prises-en-charge) pour les paramètres susceptibles de changer, comme `host` et `port`.

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

Dans cet exemple, les variables de modèle `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, `%%extra_dbm%%` et `%%extra_region%%` sont dynamiquement renseignées avec les informations du cluster Aurora.

#### Authentification

Si vous utilisez un mot de passe pour l'authentification, notez que le mot de passe fourni dans ce fichier de modèle sera utilisé pour chaque base de données découverte.

{{% collapse-content title="Stocker votre mot de passe de manière sécurisée" level="h5" id="securely-store-your-password" %}}
##### Stocker votre mot de passe de manière sécurisée
{{% dbm-secret %}}

Le modèle de configuration exemple suivant est appliqué à chaque instance découverte dans le cluster Aurora :

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

{{% collapse-content title="Authentification IAM (7.67.0+)" level="h5" id="iam-authentication" %}}
##### Authentification IAM

Pour utiliser l'[authentification IAM][2] afin de vous connecter à votre instance RDS, assurez-vous d'utiliser la version 7.67.0 ou ultérieure de l'Agent et utilisez le modèle suivant :

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

La variable de modèle `%%extra_managed_authentication_enabled%%` prend la valeur `true` si l'instance utilise l'authentification IAM.

[2]: /fr/database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}

Pour plus d'informations sur la configuration d'Autodiscovery avec des intégrations, consultez la section [documentation Autodiscovery][5].

#### Template variables utilisables

| Template variable                        | Source                                                                                                                                        |
|:-----------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| %%host%%                                 | L'endpoint de l'instance Aurora                                                                                                                  |
| %%port%%                                 | Le port de l'instance Aurora                                                                                                               |
| %%extra_region%%                         | La région AWS où l'instance est hébergée                                                                                                  |
| %%extra_dbclusteridentifier%%            | L'identifiant du cluster Aurora découvert                                                                                       |
| %%extra_dbm%% | Indique si DBM est activé sur le cluster. Déterminé par la présence de `dbm_tag`, dont la valeur par défaut est `datadoghq.com/dbm:true`.                                              |
| %%extra_managed_authentication_enabled%% | Indique si l'authentification IAM est activée sur le cluster. <br/>Utilisé pour déterminer si l'authentification gérée doit être utilisée pour la connexion. |
| %%global_view_db%%                       | La valeur de `global_view_db_tag`, dont la valeur par défaut est `datadoghq.com/global_view_db`.                                                      |

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
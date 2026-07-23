---
description: Installez et configurez Database Monitoring pour MySQL avec une gestion
  sur Google Cloud SQL.
further_reading:
- link: /integrations/mysql/
  tag: Documentation
  text: Intégration MySQL basique
title: Configuration de Database Monitoring pour MySQL avec une gestion sur Google Cloud SQL
---

La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données MySQL, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des données sur les connexions, des métriques système et des données de télémétrie à propos du moteur de stockage InnoDB.

L'Agent recueille la télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Suivez les étapes ci-dessous pour activer la solution Database Monitoring avec votre base de données MySQL :

1. [Configurer les paramètres de base de données](#configurer-les-parametres-mysql)
1. [Autoriser l'Agent à accéder à la base de données](#accorder-un-acces-a-l-agent)
1. [Installer et configurer l'Agent Datadog](#installer-et-configurer-lagent-datadog)
1. [Installer l'intégration Cloud SQL](#installer-l-integration-cloud-sql)

## Avant de commencer

Versions de MySQL prises en charge
: 5.6, 5.7 et 8.0+

Versions de l'Agent prises en charge
: 7.36.1 et versions ultérieures

Exigence en matière de RAM
: Datadog Database Monitoring nécessite au moins 16 Go de RAM sur l'instance SQL pour fonctionner correctement.

Incidence sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est relativement souple. Néanmoins, vous pouvez ajuster certains paramètres comme l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent monopolise moins d'un pour cent du temps d'exécution des requêtes sur la base de données, et moins d'un pour cent du CPU. <br/><br/>
La solution Database Monitoring de Datadog fonctionne comme une intégration et vient compléter l'Agent de base ([voir les benchmarks][1]).

Proxies, répartiteurs de charge et poolers de connexion
: L'Agent Datadog doit se connecter directement au host surveillé, de préférence via l'adresse IP fournie dans la console Google Cloud. L'Agent ne doit pas se connecter à la base de données via un proxy, un répartiteur de charge ou un pooler de connexion. Si l'Agent se connecte à différents hosts pendant son exécution (comme dans le cas d'un basculement, d'un équilibrage de charge, etc.), il calcule la différence de statistiques entre deux hosts, ce qui produit des métriques inexactes.

Considérations relatives à la sécurité des données
: Consultez la rubrique [Informations sensibles][2] pour découvrir les données recueillies par l'Agent à partir de vos bases de données et la méthode à suivre pour garantir leur sécurité.

## Configurer les paramètres MySQL


Configurez les [flags de base de données][3] suivants. **Redémarrez ensuite le serveur** pour appliquer la configuration :

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| Paramètre | Valeur | Description |
| --- | --- | --- |
| `performance_schema` | `on` | Obligatoire. Active le [Performance Schema][9]. |
| `max_digest_length` | `4096` | Obligatoire pour la collecte des requêtes plus longues. Augmente la taille du texte de résumé SQL dans les tables `events_statements_*`. Si la valeur par défaut est conservée, les requêtes de plus de `1024` caractères ne seront pas collectées. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Doit correspondre à `max_digest_length`. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` | Doit correspondre à `max_digest_length`. |

[9]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| Paramètre | Valeur | Description |
| --- | --- | --- |
| `performance_schema` | `on` | Requis. Active le [schéma de performance][1]. |
| `max_digest_length` | `4096` | Requis pour la collecte de requêtes volumineuses. Augmente la taille du texte de synthèse SQL dans les tables `events_statements_*`. Si vous conservez la valeur par défaut, les requêtes comportant plus de `1024` caractères ne seront pas recueillies. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Doit correspondre à la valeur de `max_digest_length`. |


[9]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

## Accorder un accès à l'Agent

L'Agent Datadog requiert un accès en lecture seule pour la base de données, afin de pouvoir recueillir les statistiques et requêtes.

Les instructions suivantes accordent à l'Agent l'autorisation de se connecter depuis n'importe quel host avec `datadog@'%'`. Vous pouvez restreindre l'utilisateur `datadog` pour l'autoriser à se connecter uniquement depuis localhost avec `datadog@'localhost'`. Consultez la [documentation MySQL][11] pour en savoir plus.

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}

Créez l'utilisateur `datadog` et accordez-lui des autorisations de base :

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6" %}}

Créez l'utilisateur `datadog` et accordez-lui des autorisations de base :

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

Créez le schéma suivant :

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
```

Créez la procédure `explain_statement` afin d'activer la collecte de plans d'exécution par l'Agent :

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```

Créez également la procédure suivante **dans chaque schéma** pour lesquels vous souhaitez recueillir des plans d'exécution. Remplacez `<YOUR_SCHEMA>` par le schéma de votre base de données :

```sql
DELIMITER $$
CREATE PROCEDURE <YOUR_SCHEMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <YOUR_SCHEMA>.explain_statement TO datadog@'%';
```

Pour collecter les métriques d'index, accorder à l'utilisateur `datadog` un privilège supplémentaire :

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

À partir de la version 7.65 de l'Agent, l'Agent Datadog peut collecter des informations de schéma à partir des bases de données MySQL. Consultez la section [Collecte des schémas][12] ci-dessous pour en savoir plus sur la façon d'accorder à l'Agent les autorisations nécessaires à cette collecte.

### Exécution des consommateurs de configuration
Datadog vous conseille de créer la procédure suivante afin d'autoriser l'Agent à activer les consommateurs `performance_schema.events_*` lors de l'exécution.

```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name = 'events_waits_current';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

### Stocker votre mot de passe de manière sécurisée
{{% dbm-secret %}}

### Vérification

Vérifiez que l'utilisateur a bien été créé à l'aide des commandes ci-dessous. Remplacez `<UNIQUEPASSWORD>` par le mot de passe que vous avez créé ci-dessus :

```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```
```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```


## Installer et configurer l'Agent

Pour surveiller les hosts Cloud SQL, installez l'Agent Datadog dans votre infrastructure et configurez-le de façon à ce qu'il se connecte à distance à chaque instance. L'Agent n'a pas besoin de s'exécuter sur la base de données : il doit simplement s'y connecter. Pour obtenir d'autres méthodes d'installation de l'Agent, consultez les [instructions d'installation de l'Agent][4].


{{< tabs >}}
{{% tab "Host" %}}

Pour configurer ce check pour un Agent s'exécutant sur un host, par exemple si vous provisionnez une petite instance GCE pour l'Agent afin de recueillir des données depuis une base de données Google Cloud SQL, procédez comme suit :

Modifiez le fichier `mysql.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple mysql.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles, notamment pour les métriques custom.

Ajoutez ce bloc de configuration à votre fichier `mysql.d/conf.yaml` pour recueillir des métriques MySQL :

```yaml
init_config:

instances:
  - dbm: true
    host: '<INSTANCE_ADDRESS>'
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier, stored as a secret

    # After adding your project and instance, configure the Datadog Google Cloud (GCP) integration to pull additional cloud data such as CPU, Memory, etc.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

Consultez la [section GCP du fichier `mysql.conf.yaml`][4] pour en savoir plus sur la configuration des champs `project_id` et `instance_id`.

[Redémarrez l'Agent][3] pour commencer à envoyer des métriques MySQL à Datadog.


[1]: /fr/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example

{{% /tab %}}
{{% tab "Docker" %}}

Pour configurer l'Agent Database Monitoring qui s'exécute dans un conteneur Docker, par exemple dans Google Cloud Run, définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur le conteneur de votre Agent.

**Remarque** : pour que le processus de découverte automatique des étiquettes fonctionne, l'Agent doit être autorisé à lire le socket Docker.

### Ligne de commande

Pour exécuter rapidement l'Agent depuis une interface de ligne de commande, utilisez la commande suivante. Modifiez les valeurs de façon à indiquer votre compte et votre environnement :

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<INSTANCE_ADDRESS>",
    "port": 3306,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "gcp": {
      "project_id": "<PROJECT_ID>",
      "instance_id": "<INSTANCE_ID>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

### Dockerfile

Vous pouvez également spécifier des étiquettes dans un `Dockerfile`. Cette approche vous permet de concevoir et de déployer un Agent personnalisé sans avoir à modifier la configuration de l'infrastructure :

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<INSTANCE_ADDRESS>", "port": 5432,"username": "datadog","password": "ENC[datadog_user_database_password]", "gcp": {"project_id": "<PROJECT_ID>", "instance_id": "<INSTANCE_ID>"}}]'
```

Consultez la [section GCP du fichier `mysql.conf.yaml`][2] pour en savoir plus sur la configuration des champs `project_id` et `instance_id`.


[1]: /fr/agent/docker/integrations/?tab=docker
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example

{{% /tab %}}
{{% tab "Kubernetes" %}}

Si vous avez un cluster Kubernetes, utilisez [l'Agent Datadog Cluster][1] pour Database Monitoring.

Si vous n'avez pas encore activé les checks de cluster dans votre cluster Kubernetes, suivez [ces instructions][2]. Vous pouvez déclarer la configuration MySQL avec des fichiers statiques montés dans le conteneur de l'Agent de cluster, ou avec des annotations de service :

### Opérateur

En vous référant aux [instructions relatives à l'Operator dans Kubernetes et les intégrations][3], suivre les étapes ci-dessous pour configurer l'intégration MySQL :

1. Créer ou mettre à jour le fichier `datadog-agent.yaml` avec la configuration suivante :

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
              mysql.yaml: |-
                cluster_check: true
                init_config:
                instances:
                - host: <INSTANCE_ENDPOINT>
                  port: <PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
                  gcp:
                    project_id: '<PROJECT_ID'
                    instance_id: '<INSTANCE_ID'
    ```

2. Appliquer les modifications à l'Operator Datadog à l'aide de la commande suivante :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm

1. Suivez les [instructions d'installation de l'Agent Datadog][4] pour Helm.
2. Mettez à jour votre fichier de configuration YAML (`datadog-values.yaml` dans les instructions d'installation de l'Agent de cluster) pour y inclure les éléments suivants :
    ```yaml
    clusterAgent:
      confd:
        mysql.yaml: |-
          cluster_check: true
          init_config:
          instances:
            - dbm: true
              host: <INSTANCE_ENDPOINT>
              port: <PORT>
              username: datadog
              password: 'ENC[datadog_user_database_password]'
              gcp:
                project_id: '<PROJECT_ID'
                instance_id: '<INSTANCE_ID'

    clusterChecksRunner:
      enabled: true
    ```

3. Déployez l'Agent avec le fichier de configuration ci-dessus depuis la ligne de commande :

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Pour Windows, ajoutez <code>--set targetSystem=windows</code> à la commande <code>helm install</code>.
</div>

### Configuration avec des fichiers montés

Pour configurer un check de cluster avec un fichier de configuration monté, montez le fichier de configuration dans le conteneur de l'Agent de cluster à l'emplacement suivant : `/conf.d/mysql.yaml`.

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ENDPOINT>
    port: <PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    gcp:
      project_id: '<PROJECT_ID'
      instance_id: '<INSTANCE_ID'
```

### Configuration avec les annotations de service Kubernetes

Plutôt que de monter un fichier, vous pouvez déclarer la configuration d'instance en tant que service Kubernetes. Pour configurer ce check pour un Agent s'exécutant sur Kubernetes, créer un service avec la syntaxe suivante :


```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["mysql"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<INSTANCE_ENDPOINT>",
          "port": <PORT>,
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "gcp": {
            "project_id": "<PROJECT_ID>",
            "instance_id": "<INSTANCE_ID>"
          }
        }
      ]
spec:
  ports:
  - port: <PORT>
    protocol: TCP
    targetPort: <PORT>
    name: mysql
```

L'Agent de cluster enregistre automatiquement cette configuration et commence à exécuter le check MySQL.

Pour éviter d'exposer le mot de passe de l'utilisateur `datadog` en texte clair, utilisez le [package de gestion des secrets][6] de l'Agent et déclarez le mot de passe avec la syntaxe `ENC[]`.

[1]: /fr/containers/cluster_agent/setup/
[2]: /fr/containers/cluster_agent/clusterchecks/
[3]: /fr/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /fr/containers/kubernetes/integrations/?tab=helm
[5]: /fr/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /fr/agent/configuration/secrets-management

{{% /tab %}}

{{< /tabs >}}

### Validation

[Exécutez la sous-commande status de l'Agent][5] et cherchez `mysql` dans la section Checks, ou consultez la page [Databases][6] pour commencer !

## Exemples de configuration de l'Agent
{{% dbm-mysql-agent-config-examples %}}

## Installer l'intégration Cloud SQL

Pour collecter des métriques de base de données plus complètes depuis Google Cloud, installez l'[intégration Cloud SQL][7] (facultatif).


## Dépannage

Si vous avez respecté les instructions d'installation et de configuration des intégrations et de l'Agent, mais que vous rencontrez un problème, consultez la section [Dépannage][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /fr/database_monitoring/data_collected/#sensitive-information
[3]: https://cloud.google.com/sql/docs/mysql/flags
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: /fr/integrations/google_cloudsql
[8]: /fr/database_monitoring/troubleshooting/?tab=mysql
[9]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
[10]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[11]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[12]: /fr/database_monitoring/setup_mysql/gcsql?tab=mysql57#collecting-schemas
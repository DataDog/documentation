---
description: Installez et configurez Database Monitoring pour MySQL avec une gestion
  sur Aurora.
further_reading:
- link: /integrations/mysql/
  tag: Documentation
  text: Intégration MySQL basique
title: Configuration de Database Monitoring pour MySQL avec une gestion sur Aurora
---

La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données MySQL, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des données sur les connexions, des métriques système et des données de télémétrie à propos du moteur de stockage InnoDB.

L'Agent recueille la télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Suivez les étapes ci-dessous pour activer la solution Database Monitoring avec votre base de données MySQL :

1. [Configurer les paramètres de base de données](#configurer-les-parametres-mysql)
1. [Autoriser l'Agent à accéder à la base de données](#accorder-un-acces-a-l-agent)
1. [Installer et configurer l'Agent](#installer-et-configurer-lagent)
1. [Installer l'intégration RDS](#installer-l-integration-rds)

## Avant de commencer

Versions de MySQL prises en charge
: 5.6, 5.7, et 8.0 ou plus récent

Versions de l'Agent prises en charge
: 7.36.1 ou ultérieure

Incidence sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est relativement souple. Néanmoins, vous pouvez ajuster certains paramètres comme l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent monopolise moins d'un pour cent du temps d'exécution des requêtes sur la base de données, et moins d'un pour cent du CPU. <br/><br/>
La solution Database Monitoring de Datadog fonctionne comme une intégration et vient compléter l'Agent de base ([voir les benchmarks][1]).

Proxies, répartiteurs de charge et gestionnaires de connexions
: L'Agent Datadog doit se connecter directement au host surveillé, de préférence via l'endpoint de l'instance. L'Agent ne doit pas se connecter à la base de données via un proxy, un répartiteur de charge, un gestionnaire de connexions ou l'**endpoint du cluster Aurora**. S'il est connecté à l'endpoint du cluster, l'Agent collecte des données depuis un réplica aléatoire et ne fournit une visibilité que sur ce réplica. Si l'Agent se connecte à des hosts différents pendant son exécution (en cas de basculement, d'équilibrage de charge, etc.), l'Agent calcule la différence de statistiques entre deux hosts, ce qui produit des métriques inexactes.

Considérations relatives à la sécurité des données
: Consultez la rubrique [Informations sensibles][2] pour découvrir les données recueillies par l'Agent à partir de vos bases de données et la méthode à suivre pour garantir leur sécurité.


## Configurer les paramètres MySQL

Configurez les paramètres suivants dans le [groupe de paramètres du cluster DB][3], puis **redémarrez le serveur** pour que les paramètres prennent effet :

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| Paramètre | Valeur | Description |
| --- | --- | --- |
| `performance_schema` | `1` | Requis. Active le [Performance Schema][1]. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_current</code> | `1` | Requis. Active la surveillance des requêtes en cours d'exécution. |
| <code style="word-break:break-all;">performance-schema-consumer-events-waits-current</code> | `ON` | Requis. Active la collecte des événements d'attente. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history</code> | `1` | Facultatif. Active le suivi de l'historique récent des requêtes par thread. Si activé, augmente la probabilité de capturer les détails d'exécution des requêtes peu fréquentes. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history_long</code> | `1` | Facultatif. Active le suivi d'un plus grand nombre de requêtes récentes sur tous les threads. Si activé, augmente la probabilité de capturer les détails d'exécution des requêtes peu fréquentes. |
| <code style="word-break:break-all;">performance_schema_max_digest_length</code> | `4096` | Augmente la taille du texte de résumé SQL dans les tables `events_statements_*`. Si la valeur par défaut est conservée, les requêtes de plus de `1024` caractères ne sont pas collectées. |
| <code style="word-break:break-all;">performance_schema_max_sql_text_length</code> | `4096` | Doit correspondre à <code style="word-break:break-all;">performance_schema_max_digest_length</code>. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| Paramètre | Valeur | Description |
| --- | --- | --- |
| `performance_schema` | `1` | Requis. Active le [Performance Schema][1]. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_current</code> | `1` | Requis. Active la surveillance des requêtes en cours d'exécution. | 
| <code style="word-break:break-all;">performance-schema-consumer-events-waits-current</code> | `ON` | Requis. Active la collecte des événements d'attente. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history</code> | `1` | Facultatif. Active le suivi de l'historique récent des requêtes par thread. Si activé, augmente la probabilité de capturer les détails d'exécution des requêtes peu fréquentes. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history_long</code> | `1` | Facultatif. Active le suivi d'un plus grand nombre de requêtes récentes sur tous les threads. Si activé, augmente la probabilité de capturer les détails d'exécution des requêtes peu fréquentes. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

**Remarque** : il est recommandé d'autoriser l'Agent à activer dynamiquement les paramètres `performance-schema-consumer-*` au runtime, dans le cadre de l'octroi de l'accès à l'Agent. Consultez la section [Configuration des consommateurs au runtime](#configuration-des-consommateurs-au-runtime).

## Accorder un accès à l'Agent

L'Agent Datadog requiert un accès en lecture seule pour la base de données, afin de pouvoir recueillir les statistiques et requêtes.

Les instructions suivantes autorisent l'Agent à se connecter depuis n'importe quel host à l'aide de `datadog@'%'`. Vous pouvez restreindre l'utilisateur `datadog` avec `datadog@'localhost'`, de façon à ce qu'il soit uniquement autorisé à se connecter depuis localhost. Consultez la [documentation MYSQL][4] (en anglais) pour en savoir plus.

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}

Créez l'utilisateur `datadog` et accordez-lui des autorisations de base :

```sql
CREATE USER datadog@'%' IDENTIFIED by '<MOT_DE_PASSE_UNIQUE>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6" %}}

Créez l'utilisateur `datadog` et accordez-lui des autorisations de base :

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<MOT_DE_PASSE_UNIQUE>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

Créez le schéma suivant :

```sql
CREATE SCHEMA IF NOT EXISTS datadog ;
GRANT EXECUTE ON datadog.* to datadog@'%' ;
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

Créez également la procédure suivante **dans chaque schéma** pour lesquels vous souhaitez recueillir des plans d'exécution. Remplacez `<VOTRE_SCHÉMA>` par le schéma de votre base de données :

```sql
DELIMITER $$
CREATE PROCEDURE <VOTRE_SCHÉMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <VOTRE_SCHÉMA>.explain_statement TO datadog@'%';
```

Pour collecter des métriques d'index, accorder à l'utilisateur `datadog` une autorisation supplémentaire :

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

À partir de l'Agent v7.65, l'Agent Datadog peut collecter des informations de schéma depuis les bases de données MySQL. Consulter la section [Collecte de schémas][10] ci-dessous pour en savoir plus sur l'octroi des autorisations nécessaires à l'Agent pour cette collecte.

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

## Installer et configurer l'Agent

Pour surveiller les hosts Aurora, installez l'Agent Datadog dans votre infrastructure et configurez-le de façon à ce qu'il se connecte à distance à chaque endpoint d'instance. L'Agent n'a pas besoin de s'exécuter sur la base de données : il doit simplement s'y connecter. Pour obtenir d'autres méthodes d'installation de l'Agent, consultez les [instructions d'installation de l'Agent][5].

{{< tabs >}}
{{% tab "Host" %}}

### Configuration d'Autodiscovery (recommandée)

L'Agent Datadog prend en charge la découverte automatique de tous les endpoints Aurora d'un cluster. Sauf si vous souhaitez des configurations différentes pour différentes instances, ou si vous souhaitez trouver et lister manuellement les endpoints Aurora, suivez les [instructions de configuration d'Autodiscovery pour les clusters Aurora DB][4] plutôt que la section de configuration manuelle ci-dessous.

### Configuration manuelle

Pour configurer ce check pour un Agent s'exécutant sur un host, par exemple lorsque vous provisionnez une petite instance EC2 pour que l'Agent collecte des données depuis une base de données Aurora :

Modifiez le fichier `mysql.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple mysql.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles, notamment pour les métriques custom.

Ajoutez ce bloc de configuration à votre fichier `mysql.d/conf.yaml` pour recueillir des métriques MySQL :

```yaml
init_config:

instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier, stored as a secret

    # After adding your project and instance, configure the Datadog AWS integration to pull additional cloud data such as CPU and Memory.
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
```

<div class="alert alert-danger">Utilisez ici l'endpoint de l'instance Aurora, et non l'endpoint du cluster.</div>

[Redémarrez l'Agent][3] pour commencer à envoyer des métriques MySQL à Datadog.


[1]: /fr/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[4]: /fr/database_monitoring/guide/aurora_autodiscovery/?tab=mysql
{{% /tab %}}
{{% tab "Docker" %}}

Pour configurer l'Agent Database Monitoring qui s'exécute dans un conteneur Docker, par exemple dans ECS ou Fargate, vous pouvez définir des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur le conteneur de votre Agent.

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
    "host": "<AWS_INSTANCE_ENDPOINT>",
    "port": 3306,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>"
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

### Dockerfile

Vous pouvez également spécifier des étiquettes dans un `Dockerfile`. Cette approche vous permet de concevoir et de déployer un Agent personnalisé sans avoir à modifier la configuration de l'infrastructure :

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog","password": "ENC[datadog_user_database_password]"}]'
```

<div class="alert alert-danger">Utilisez ici l'endpoint de l'instance Aurora comme host, et non l'endpoint du cluster.</div> 


[1]: /fr/agent/docker/integrations/?tab=docker
{{% /tab %}}
{{% tab "Kubernetes" %}}

Si vous avez un cluster Kubernetes, utilisez [l'Agent Datadog Cluster][1] pour Database Monitoring.

Si vous n'avez pas encore activé les checks de cluster dans votre cluster Kubernetes, suivez [ces instructions][2]. Vous pouvez déclarer la configuration MySQL avec des fichiers statiques montés dans le conteneur de l'Agent de cluster, ou avec des annotations de service :

### Opérateur

En vous référant aux [instructions relatives à l'Operator dans Kubernetes et les intégrations][3], suivre les étapes ci-dessous pour configurer l'intégration MySQL :

1. Créer ou mettre à jour le fichier `datadog-agent.yaml` avec la configuration suivante :

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
                - host: <AWS_INSTANCE_ENDPOINT>
                  port: <PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
                  aws:
                    instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                    region: <AWS_REGION>
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
              host: <AWS_INSTANCE_ENDPOINT>
              port: <PORT>
              username: datadog
              password: 'ENC[datadog_user_database_password]'
              aws:
                instance_endpoint: <AWS_INSTANCE_ENDPOINT>
                region: <AWS_REGION>

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
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    aws:
      instance_endpoint: <AWS_INSTANCE_ENDPOINT>
      region: <AWS_REGION>
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
          "host": "<AWS_INSTANCE_ENDPOINT>",
          "port": <PORT>,
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "aws": {
            "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
            "region": "<AWS_REGION>"
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

[Exécutez la sous-commande status de l'Agent][6] et cherchez `mysql` dans la section Checks, ou consultez la page [Databases][7] pour commencer !

## Exemples de configuration de l'Agent
{{% dbm-mysql-agent-config-examples %}}

## Installer l'intégration RDS

Pour afficher les métriques d'infrastructure AWS, telles que le CPU, aux côtés des données de télémétrie de base de données dans DBM, installez l'[intégration RDS][8] (facultatif).

## Dépannage

Si vous avez respecté les instructions d'installation et de configuration des intégrations et de l'Agent, mais que vous rencontrez un problème, consultez la section [Dépannage][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /fr/containers/cluster_agent/clusterchecks/?tab=datadogoperator
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html
[4]: https://dev.mysql.com/doc/refman/5.7/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /fr/integrations/amazon_rds
[9]: /fr/database_monitoring/troubleshooting/?tab=mysql
[10]: /fr/database_monitoring/setup_mysql/aurora?tab=mysql57#collecting-schemas
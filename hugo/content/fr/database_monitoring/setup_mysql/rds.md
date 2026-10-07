---
description: Installez et configurez Database Monitoring pour MySQL avec une gestion
  sur Amazon RDS.
further_reading:
- link: /integrations/mysql/
  tag: Documentation
  text: Intégration MySQL basique
- link: /database_monitoring/guide/rds_autodiscovery
  tag: Documentation
  text: Autodiscovery pour RDS
title: Configuration de Database Monitoring pour MySQL avec une gestion sur Amazon RDS
---
La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données MySQL, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des données sur les connexions, des métriques système et des données de télémétrie à propos du moteur de stockage InnoDB.

**Remarque**: Si vous utilisez MariaDB, consultez [Setting Up MariaDB][13] à la place.

L'Agent recueille les données de télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Effectuez la configuration suivante pour activer Database Monitoring avec votre base de données MySQL :

1. [Configurez l'intégration AWS](#configure-the-aws-integration)
1. [Configurer les paramètres de base de données](#configure-mysql-settings)
1. [Accordez à l'Agent l'accès à la base de données](#grant-the-agent-access)
1. [Installez et configurez l'Agent](#install-and-configure-the-agent)
1. [Installez l'intégration RDS](#install-the-rds-integration)

## Avant de commencer {#before-you-begin}

Versions MySQL prises en charge
: 5.6, 5.7 ou 8.0+

Versions de l'Agent prises en charge
: 7.36.1+

Impact sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est prudente, mais vous pouvez ajuster les paramètres tels que l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des charges de travail, l'Agent représente moins d'un pour cent du temps d'exécution des requêtes sur la base de données et moins d'un pour cent du CPU. <br/><br/>
Database Monitoring s'exécute en tant qu'intégration au-dessus de l'Agent de base ([voir les benchmarks][1]).

Proxys, équilibreurs de charge et répartiteurs de connexion
: Le Datadog Agent doit se connecter directement au host surveillé, de préférence via l'endpoint de l'instance. L'Agent ne doit pas se connecter à la base de données via un proxy, un équilibreur de charge ou un pooler de connexions. Si l'Agent se connecte à différents hosts pendant son exécution (comme dans le cas d'un basculement, d'un équilibrage de charge, etc.), l'Agent calcule la différence de statistiques entre deux hosts, ce qui produit des métriques inexactes.

Considérations relatives à la sécurité des données
: Consultez [Informations sensibles][2] pour en savoir plus sur les données que l'Agent collecte à partir de vos bases de données et sur la manière d'en garantir la sécurité.

## Configurez l'intégration AWS {#configure-the-aws-integration}

Activez {{< ui >}}Standard Collection{{< /ui >}} dans la section {{< ui >}}Resource Collection{{< /ui >}} de votre [tuile d'intégration Amazon Web Services][10].

## Configurez les paramètres MySQL {#configure-mysql-settings}

Configurez les éléments suivants dans le [groupe de paramètres de base de données][3], puis **redémarrez le serveur** pour que les paramètres prennent effet :

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| Paramètre | Valeur | Description |
| --- | --- | --- |
| `performance_schema` | `1` | Requis. Active le [Performance Schema][1]. |
| `max_digest_length` | `4096` | Requis pour la collecte de requêtes plus volumineuses. Augmente la taille du texte de résumé SQL dans les tableaux `events_statements_*`. Si la valeur par défaut est conservée, les requêtes de plus de `1024` caractères ne seront pas collectées. |
| `performance_schema_max_digest_length` | `4096` | Doit correspondre à `max_digest_length`. |
| `performance_schema_max_sql_text_length` | `4096` | Doit correspondre à `max_digest_length`. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| Paramètre | Valeur | Description |
| --- | --- | --- |
| `performance_schema` | `1` | Requis. Active le [Performance Schema][1]. |
| `max_digest_length` | `4096` | Requis pour la collecte de requêtes plus volumineuses. Augmente la taille du texte de résumé SQL dans les tableaux `events_statements_*`. Si la valeur par défaut est conservée, les requêtes de plus de `1024` caractères ne seront pas collectées. |
| `performance_schema_max_digest_length` | `4096` | Doit correspondre à `max_digest_length`. |


[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

## Accorder l'accès à l'Agent {#grant-the-agent-access}

Le Datadog Agent requiert un accès en lecture seule pour la base de données, afin de pouvoir recueillir les statistiques et requêtes.

Les instructions suivantes accordent à l'Agent la permission de se connecter depuis n'importe quel host en utilisant `datadog@'%'`. Vous pouvez restreindre l'utilisateur `datadog` pour qu'il ne soit autorisé à se connecter qu'à partir de localhost en utilisant `datadog@'localhost'`. Consultez la [documentation MySQL][4] pour plus d'informations.

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}

Créez l'utilisateur `datadog` et accordez les permissions de base :

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6" %}}

Créez l'utilisateur `datadog` et accordez les permissions de base :

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

Créez la procédure `explain_statement` pour permettre à l'Agent de collecter les plans d'exécution :

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

De plus, créez cette procédure **dans chaque schéma** à partir duquel vous souhaitez collecter des plans d'exécution. Remplacez `<YOUR_SCHEMA>` par votre schéma de base de données :

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

Pour collecter les métriques d'index, accordez à l'utilisateur `datadog` un privilège supplémentaire :

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

À partir de l'Agent v7.65, le Datadog Agent peut collecter des informations de schéma à partir de bases de données MySQL. Consultez la section [Collecte de schémas][12] ci-dessous pour plus d'informations sur la façon d'accorder à l'Agent les autorisations nécessaires pour cette collecte.

### Configuration des consommateurs au runtime {#runtime-setup-consumers}
Avec RDS, les consommateurs de performance_schema ne peuvent pas être activés de manière permanente dans une configuration. Créez la procédure suivante pour donner à l'Agent la capacité d'activer les consommateurs `performance_schema.events_*` au moment de l'exécution.

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

### Stockez votre mot de passe de manière sécurisée {#securely-store-your-password}
{{% dbm-secret %}}

## Installez et configurez l'Agent {#install-and-configure-the-agent}

Pour surveiller les hosts RDS, installez le Datadog Agent dans votre infrastructure et configurez-le pour qu'il se connecte à distance à l'endpoint de chaque instance. L'Agent n'a pas besoin de s'exécuter sur la base de données, il doit seulement s'y connecter. Pour d'autres méthodes d'installation de l'Agent non mentionnées ici, consultez les [instructions d'installation de l'Agent][5].

{{< tabs >}}
{{% tab "Host" %}}

Pour configurer ce check pour un Agent s'exécutant sur un host, par exemple si vous provisionnez une petite instance EC2 pour l'Agent afin de recueillir des données depuis une base de données RDS, procédez comme suit :

Modifiez le fichier `mysql.d/conf.yaml`, dans le dossier `conf.d/` à la racine de votre [répertoire de configuration de l'Agent][1] pour commencer à collecter vos métriques MySQL. Consultez l'[exemple mysql.d/conf.yaml][2] pour connaître toutes les options de configuration disponibles, y compris celles pour les métriques personnalisées.

Ajoutez ce bloc de configuration à votre `mysql.d/conf.yaml` pour collecter les métriques MySQL :

```yaml
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier, stored as a secret

    # After adding your project and instance, configure the Datadog AWS integration to pull additional cloud data such as CPU and Memory.
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
      region: <AWS_REGION>
```

Si vous souhaitez vous authentifier avec IAM, spécifiez les paramètres `region` et `instance_endpoint`, et définissez `managed_authentication.enabled` sur `true`.

**Remarque** : n'activez `managed_authentication` que si vous souhaitez utiliser l'authentification IAM. L'authentification IAM prévaut sur le champ `password`.

```yaml
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: <PORT>
    username: datadog
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
      region: <AWS_REGION>
      managed_authentication:
        enabled: true
```

Pour plus d'informations sur la configuration de l'authentification IAM sur votre instance RDS, consultez [Connexion avec l'authentification gérée][3].

[Redémarrez l'Agent][4] pour commencer à envoyer des métriques MySQL à Datadog.


[1]: /fr/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /fr/database_monitoring/guide/managed_authentication/?tab=mysql#configure-iam-authentication
[4]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Pour configurer Database Monitoring Agent qui s'exécute dans un conteneur Docker, par exemple dans ECS ou Fargate, vous pouvez définir des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur le conteneur de votre Agent.

**Remarque** : L'Agent doit disposer d'une autorisation de lecture sur le socket Docker pour que la découverte automatique des étiquettes fonctionne.

### Ligne de commande{#command-line}

Soyez opérationnel rapidement en exécutant la commande suivante pour lancer l'agent depuis votre ligne de commande. Remplacez les valeurs pour qu'elles correspondent à votre compte et à votre environnement :

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AWS_INSTANCE_ENDPOINT>",
    "port": <PORT>,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "aws": {
      "instance_endpoint": "<AWS_INSTANCE_ENDPOINT>",
      "region": "<AWS_REGION>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

### Dockerfile {#dockerfile}

Les étiquettes peuvent également être spécifiées dans un `Dockerfile`, afin que vous puissiez créer et déployer un agent personnalisé sans modifier la configuration de l'infrastructure :

```Dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": <PORT>,"username": "datadog","password": "ENC[datadog_user_database_password]", "aws": {"instance_endpoint": "<AWS_INSTANCE_ENDPOINT>", "region": "<AWS_REGION>"}}]'
```

[1]: /fr/agent/docker/integrations/?tab=docker
{{% /tab %}}
{{% tab "Kubernetes" %}}

Pour surveiller des bases de données sur un cluster Kubernetes, utilisez [l'Agent de cluster Datadog][1] pour Database Monitoring.

Suivez les instructions pour [activer les checks de cluster][2] s'ils ne sont pas déjà activés dans votre cluster Kubernetes. Vous pouvez déclarer la configuration MySQL soit avec des fichiers statiques montés dans le conteneur du Cluster Agent, soit en utilisant des annotations de service :

### Opérateur{#operator}

En utilisant les [instructions de l'opérateur dans Kubernetes et les intégrations][3] comme référence, suivez les étapes ci-dessous pour configurer l'intégration MySQL :

1. Créez ou mettez à jour le fichier `datadog-agent.yaml` avec la configuration suivante :

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

2. Appliquez les modifications au Datadog Operator en utilisant la commande suivante :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

1. Suivez les [instructions d'installation du Datadog Agent][4] pour Helm.
2. Mettez à jour votre fichier de configuration YAML (`datadog-values.yaml` dans les instructions d'installation du Cluster Agent) pour inclure ce qui suit :
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

3. Déployez l'Agent avec le fichier de configuration ci-dessus depuis la ligne de commande :

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Pour Windows, ajoutez <code>--set targetSystem=windows</code> au <code>helm install</code> .
</div>

### Configuration avec des fichiers montés {#configure-with-mounted-files}

Pour configurer un check de cluster avec un fichier de configuration monté, montez le fichier de configuration dans le conteneur du Cluster Agent sur le chemin `/conf.d/mysql.yaml` :

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

### Configuration avec des annotations de service Kubernetes {#configure-with-kubernetes-service-annotations}

Plutôt que de monter un fichier, vous pouvez déclarer la configuration de l'instance en tant que service Kubernetes. Pour configurer ce check pour un Agent s'exécutant sur Kubernetes, créez un service en utilisant la syntaxe suivante :


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

Pour éviter d'exposer le mot de passe de `datadog`l'utilisateur en texte clair, utilisez le [package de gestion des secrets][6] de l'Agent et déclarez le mot de passe en utilisant la syntaxe `ENC[]`.

[1]: /fr/containers/cluster_agent/setup/
[2]: /fr/containers/cluster_agent/clusterchecks/
[3]: /fr/containers/kubernetes/integrations/?tab=datadogoperator
[4]: /fr/containers/kubernetes/integrations/?tab=helm
[5]: /fr/containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /fr/agent/configuration/secrets-management

{{% /tab %}}
{{< /tabs >}}

### Validez {#validate}

[Exécutez la sous-commande status de l'Agent][6] et recherchez `mysql` dans la section Checks, ou consultez la page [Databases][7] pour commencer !

## Exemples de configurations d'Agent {#example-agent-configurations}
{{% dbm-mysql-agent-config-examples %}}

## Installez l'intégration RDS {#install-the-rds-integration}

Pour voir les métriques d'infrastructure d'AWS, telles que le CPU, parallèlement à la télémétrie de base de données dans DBM, installez l'[intégration RDS][8] (facultatif).

## Dépannage {#troubleshooting}

Si vous avez respecté les instructions d'installation et de configuration des intégrations et de l'Agent, mais que vous rencontrez un problème, consultez la section [Dépannage de la surveillance Datadog][9].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /fr/database_monitoring/data_collected/#sensitive-information
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /fr/integrations/amazon_rds
[9]: /fr/database_monitoring/troubleshooting/?tab=mysql
[10]: https://app.datadoghq.com/integrations/amazon-web-services
[12]: /fr/database_monitoring/setup_mysql/rds?tab=mysql57#collecting-schemas
[13]: /fr/database_monitoring/setup_mariadb/
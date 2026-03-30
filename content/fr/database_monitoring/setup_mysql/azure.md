---
description: Installer et configurer Database Monitoring pour MySQL géré sur Azure.
further_reading:
- link: /integrations/mysql/
  tag: Documentation
  text: Intégration MySQL basique
title: Configuration de Database Monitoring pour Azure Database for MySQL
---

La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données MySQL, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des données sur les connexions, des métriques système et des données de télémétrie à propos du moteur de stockage InnoDB.

L'Agent Datadog collecte les données de télémétrie directement depuis la base de données en se connectant avec un utilisateur en lecture seule. Suivez les étapes ci-dessous pour activer Database Monitoring avec votre base de données MySQL :

1. [Configurer les paramètres de base de données](#configurer-les-parametres-mysql)
1. [Autoriser l'Agent à accéder à la base de données](#accorder-un-acces-a-l-agent)
1. [Installer et configurer l'Agent Datadog](#installer-et-configurer-lagent-datadog)
1. [Installer l'intégration Azure MySQL](#installer-lintegration-azure-mysql)

## Avant de commencer

Versions de MySQL prises en charge
: 5.7, ou 8.0+

Types de déploiement Azure MySQL pris en charge
: MySQL sur les machines virtuelles Azure, Single Server, Flexible Server (la collecte des activités de requêtes et des événements d'attente n'est pas prise en charge pour Flexible Server)

Versions de l'Agent prises en charge
: 7.36.1 et versions ultérieures

Incidence sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est relativement souple. Néanmoins, vous pouvez ajuster certains paramètres comme l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent monopolise moins d'un pour cent du temps d'exécution des requêtes sur la base de données, et moins d'un pour cent du CPU. <br/><br/>
La solution Database Monitoring de Datadog fonctionne comme une intégration et vient compléter l'Agent de base ([voir les benchmarks][1]).

Proxies, répartiteurs de charge et connection poolers
: L'Agent Datadog doit se connecter directement au host surveillé, de préférence via l'endpoint de l'instance. L'Agent Datadog ne doit pas se connecter à la base de données via un proxy, un répartiteur de charge ou un connection pooler. Si l'Agent Datadog se connecte à différents hosts pendant son exécution (en cas de basculement, d'équilibrage de charge, etc.), il calcule la différence de statistiques entre deux hosts, ce qui génère des métriques inexactes.

Considérations relatives à la sécurité des données
: Consultez la rubrique [Informations sensibles][2] pour découvrir les données recueillies par l'Agent à partir de vos bases de données et la méthode à suivre pour garantir leur sécurité.

## Configurer les paramètres MySQL

Configurez les paramètres suivants dans les [paramètres du serveur][3], puis **redémarrez le serveur** pour que les modifications prennent effet :

| Paramètre | Valeur | Rôle |
| --- | -- | --- |
| `performance_schema` | `ON` | Obligatoire. Active le [Performance Schema][1]. |

L'Agent Datadog nécessite également que les consommateurs `performance_schema.events_statements_*` soient définis sur `ON` pour collecter les requêtes en cours d'exécution. Par défaut, Azure MySQL Database active les consommateurs du Performance Schema, aucune configuration supplémentaire n'est donc nécessaire.

## Accorder un accès à l'Agent

L'Agent Datadog requiert un accès en lecture seule pour la base de données, afin de pouvoir recueillir les statistiques et requêtes.

Créez l'utilisateur `datadog` et accordez-lui des autorisations de base :

```sql
CREATE USER datadog@'%' IDENTIFIED by '<MOT_DE_PASSE_UNIQUE>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

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

À partir de l'Agent v7.65, l'Agent Datadog peut collecter des informations de schéma depuis les bases de données MySQL. Consulter la section [Collecte de schémas][11] ci-dessous pour en savoir plus sur l'octroi des autorisations nécessaires à l'Agent pour cette collecte.

### Stocker votre mot de passe de manière sécurisée
{{% dbm-secret %}}

## Installer et configurer l'Agent

Pour surveiller les hosts Azure, installez l'Agent Datadog dans votre infrastructure et configurez-le de façon à ce qu'il se connecte à distance à chaque endpoint d'instance. L'Agent n'a pas besoin de s'exécuter sur la base de données : il doit simplement s'y connecter. Pour obtenir d'autres méthodes d'installation de l'Agent, consultez les [instructions d'installation de l'Agent][5].

{{< tabs >}}
{{% tab "Host" %}}

Pour configurer ce check pour un Agent Datadog s'exécutant sur un host, par exemple lorsque vous provisionnez une petite machine virtuelle pour que l'Agent Datadog collecte les données de la base de données :

Modifiez le fichier `mysql.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos métriques MySQL. Consultez le [fichier d'exemple mysql.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles, notamment pour les métriques custom.

Ajoutez ce bloc de configuration à votre fichier `mysql.d/conf.yaml` pour recueillir des métriques MySQL :

```yaml
init_config:

instances:
  - dbm: true
    host: '<AZURE_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier, stored as a secret

    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU and Memory.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
```

Consultez la [spécification de l'intégration MySQL][4] pour en savoir plus sur la configuration des champs `deployment_type` et `name`.

**Remarque** : ajoutez des guillemets simples autour de votre mot de passe s'il contient un caractère spécial.

[Redémarrez l'Agent][3] pour commencer à envoyer des métriques MySQL à Datadog.


[1]: /fr/agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/master/mysql/assets/configuration/spec.yaml#L523-L552
{{% /tab %}}
{{% tab "Docker" %}}

Pour configurer l'Agent Database Monitoring qui s'exécute dans un conteneur Docker, vous pouvez définir des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur le conteneur de votre Agent.

**Remarque** : pour que le processus de découverte automatique des étiquettes fonctionne, l'Agent doit être autorisé à lire le socket Docker.

### Ligne de commande

Utilisez la commande suivante pour exécuter l'Agent depuis une interface de ligne de commande. Modifiez les valeurs de façon à indiquer votre compte et votre environnement :

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AZURE_INSTANCE_ENDPOINT>",
    "port": 3306,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>",
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "fully_qualified_domain_name": "<AZURE_INSTANCE_ENDPOINT>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

### Dockerfile

Vous pouvez également spécifier des étiquettes dans un `Dockerfile`. Cette approche vous permet de concevoir et de déployer un Agent personnalisé sans avoir à modifier la configuration de l'infrastructure :

```Dockerfile
FROM datadog/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AZURE_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog","password": "ENC[datadog_user_database_password]", "azure": {"deployment_type": "<DEPLOYMENT_TYPE>", "fully_qualified_domain_name": "<AZURE_INSTANCE_ENDPOINT>"}}]'
```

Consultez la [spécification de l'intégration MySQL][4] pour en savoir plus sur la configuration des champs `deployment_type` et `name`.


[1]: /fr/agent/docker/integrations/?tab=docker
[4]: https://github.com/DataDog/integrations-core/blob/master/mysql/assets/configuration/spec.yaml#L523-L552
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
                - host: <INSTANCE_ENDPOINT>
                  port: <PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
                  azure:
                    fully_qualified_domain_name: <INSTANCE_ENDPOINT>
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
              azure:
                fully_qualified_domain_name: <INSTANCE_ENDPOINT>

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
    azure:
      fully_qualified_domain_name: <INSTANCE_ENDPOINT>
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
          "azure": {
            "fully_qualified_domain_name": "<INSTANCE_ENDPOINT>"
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

[Exécutez la sous-commande status de l'Agent Datadog][6] et cherchez `mysql` dans la section **Checks**. Vous pouvez également consulter la page [Databases][7] pour commencer.

## Exemples de configuration de l'Agent
{{% dbm-mysql-agent-config-examples %}}

## Installer l'intégration Azure MySQL

Pour collecter des métriques de base de données plus complètes depuis Azure, installez l'[intégration MySQL][8] (facultatif).

## Dépannage

Si vous avez respecté les instructions d'installation et de configuration des intégrations et de l'Agent, mais que vous rencontrez un problème, consultez la section [Dépannage][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /fr/database_monitoring/data_collected/#sensitive-information
[3]: https://docs.microsoft.com/en-us/azure/mysql/howto-server-parameters
[4]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /fr/integrations/azure_db_for_mysql
[9]: /fr/database_monitoring/setup_mysql/troubleshooting
[10]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
[11]: /fr/database_monitoring/setup_mysql/azure/?tab=host#collecting-schemas
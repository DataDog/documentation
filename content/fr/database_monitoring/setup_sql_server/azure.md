---
description: Installez et configurez Database Monitoring pour SQL Server avec une
  gestion sur Azure.
further_reading:
- link: /integrations/sqlserver/
  tag: Documentation
  text: Intégration SQL Server basique
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentation
  text: Résoudre les problèmes courants
- link: /database_monitoring/guide/sql_deadlock/
  tag: Documentation
  text: Configurer la surveillance des deadlocks
- link: /database_monitoring/guide/sql_extended_events/
  tag: Documentation
  text: Configurer la collecte des fins de requêtes et des erreurs de requêtes
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentation
  text: Capture des valeurs de paramètres de requêtes SQL
title: Configuration de Database Monitoring pour Azure SQL Server
---

La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données Microsoft SQL Server, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, ainsi que des états, des failovers et des événements de base de données.

Pour activer la solution Database Monitoring pour votre base de données, suivez les étapes ci-dessous :

1. [Autoriser l'Agent à accéder à la base de données](#accorder-un-acces-a-l-agent)
2. [Installer et configurer l'Agent Datadog](#installer-et-configurer-lagent-datadog)
3. [Installer l'intégration Azure](#installer-l-integration-azure)

## Avant de commencer

Versions de SQL Server prises en charge : 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Accorder un accès à l'Agent

L'Agent Datadog requiert un accès en lecture seule au serveur de la base de données, afin de pouvoir recueillir les statistiques et requêtes.

{{< tabs >}}

{{% tab "Azure SQL Database" %}}

Créez une connexion en lecture seule pour vous connecter au serveur et attribuer les [rôles Azure SQL][1] requis :
```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
ALTER SERVER ROLE ##MS_ServerStateReader## ADD MEMBER datadog;
ALTER SERVER ROLE ##MS_DefinitionReader## ADD MEMBER datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

Autorisez l'Agent à accéder à chaque base de données Azure SQL sur ce serveur :

```SQL
CREATE USER datadog FOR LOGIN datadog;
```

**Remarque** : l'authentification via les identités gérées par Microsoft Entra ID est également prise en charge. Veuillez consulter [ce guide][3] pour découvrir comment configurer ce type d'authentification pour votre instance Azure SQL DB.

Lors de la configuration de l'Agent Datadog, spécifiez une instance de check pour chaque base de données d'application située sur un serveur Azure SQL DB donné. N'incluez pas la base de données `master` ni les autres [bases de données système][2]. L'Agent Datadog doit se connecter directement à chaque base de données d'application dans Azure SQL DB, car chaque base de données s'exécute dans un environnement de calcul distinct. De même, l'option `database_autodiscovery` ne fonctionne par pour Azure SQL DB : elle doit donc être désactivée.

**Remarque** : Azure SQL Database déploie une base de données au sein d'un réseau isolé ; chaque base de données est gérée en tant que host unique. Ainsi, si vous exécutez Azure SQL Database dans un pool élastique, chaque base de données dans le pool est considérée comme un host distinct.

```yaml
init_config:
instances:
  - host: '<SERVER_NAME>.database.windows.net,<PORT>'
    database: '<DATABASE_1>'
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: 'sql_database'
      fully_qualified_domain_name: '<SERVER_NAME>.database.windows.net'

  - host: '<SERVER_NAME>.database.windows.net,<PORT>'
    database: '<DATABASE_2>'
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: 'sql_database'
      fully_qualified_domain_name: '<SERVER_NAME>.database.windows.net'
```

Consultez la rubrique [Installer l'Agent](#installer-l-agent) pour obtenir des instructions détaillées décrivant comment installer et configurer l'Agent Datadog.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/database/security-server-roles
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/databases/system-databases
[3]: /fr/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Azure SQL Managed Instance" %}}

Créez une connexion en lecture seule pour vous connecter au serveur et attribuez les autorisations requises :

#### Pour la version 2014 et les versions ultérieures de SQL Server

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

**Remarque** : l'authentification via les identités gérées par Azure est également prise en charge. Veuillez consulter [ce guide][1] pour découvrir comment configurer ce type d'authentification pour votre instance Azure SQL DB.

[1]: /fr/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "SQL Server sur une VM Azure Windows" %}}

Pour [SQL Server sur une VM Azure WIndows][1], consultez la section [Configuration de Database Monitoring pour SQL Server auto-hébergé][2] afin d'installer l'Agent Datadog directement sur la VM du host Windows Server.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview
[2]: /fr/database_monitoring/setup_sql_server/selfhosted/
{{% /tab %}}

{{< /tabs >}}

### Stocker votre mot de passe de manière sécurisée
{{% dbm-secret %}}

## Installer et configurer l'Agent

Puisqu'Azure n'accorde pas un accès direct au host, l'Agent Datadog doit être installé sur un host distinct, à partir duquel il peut communiquer avec le host du SQL Server. Il existe plusieurs manières d'installer et d'exécuter l'Agent.

{{< tabs >}}
{{% tab "Host Windows" %}}

Pour commencer à recueillir des données de télémétrie pour SQL Server, commencez par [installer l'Agent Datadog][1].

Créez le fichier conf de l'Agent pour SQL Server : `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. Consultez l'[exemple de fichier conf][2] pour découvrir toutes les options de configuration disponibles. 

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<PORT>'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
```

Consultez les [spécifications de l'intégration SQL Server][3] pour en savoir plus sur la définition des champs `deployment_type` et `name`.

Pour utiliser l'[authentification Windows][4], définissez `connection_string: "Trusted_Connection=yes"` et ne remplissez pas les champs `username` et `password`.

Utilisez les tags `service` et `env` pour lier la télémétrie de votre base de données à d'autres données de télémétrie, par l'intermédiaire d'un schéma de tagging commun. Consultez la section [Tagging de service unifié][5] pour découvrir comment ces tags sont exploités dans l'ensemble de la plateforme Datadog.

### Pilotes compatibles

#### Microsoft ADO

Il est recommandé d'utiliser le fournisseur d'[ADO][6] [Microsoft OLE DB Driver][7]. Vérifiez que le pilote est installé sur le host sur lequel l'Agent s'exécute.
```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Remplacer cette valeur par MSOLEDBSQL pour la version 18 et les versions antérieures
```

Les deux autres fournisseurs, `SQLOLEDB` et `SQLNCLI`, sont considérés comme obsolètes par Microsoft. Ne les utilisez pas.

#### ODBC

Pour ODBC, il est recommandé d'utiliser le pilote [Microsoft ODBC Driver][8]. Depuis la version 7.51 de l'Agent, ODBC Driver 18 pour SQL Server est inclus dans l'Agent pour Linux. Pour Windows, vérifiez que le pilote est installé sur le host sur lequel l'Agent s'exécute.

```yaml
connector: odbc
driver: 'ODBC Driver 18 for SQL Server'
```

Une fois la configuration de l'Agent terminée, [redémarrez l'Agent Datadog][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `sqlserver` dans la section **Checks**. Accédez à la page [Databases][11] dans Datadog pour commencer le processus de validation.


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[5]: /fr/getting_started/tagging/unified_service_tagging
[6]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[7]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[9]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Host Linux" %}}
Pour commencer la collecte des données de télémétrie SQL Server, commencez par [installer l'Agent Datadog][1].

Sous Linux, l'Agent Datadog requiert l'installation d'un pilote ODBC SQL Server, par exemple le [pilote Microsoft ODBC][2]. Une fois ce pilote installé, copiez les fichiers `odbc.ini` et `odbcinst.ini` dans le dossier `/opt/datadog-agent/embedded/etc`.

Utilisez le connecteur `odbc` et spécifiez le bon pilote, tel qu'indiqué dans le fichier `odbcinst.ini`.

Créez le fichier conf de l'Agent SQL Server `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`. Consultez l'[exemple de fichier conf][3] pour découvrir toutes les options de configuration disponibles.

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<PORT>'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: odbc
    driver: '<Driver from the `odbcinst.ini` file>'
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
```

Consultez les [spécifications de l'intégration SQL Server][4] pour en savoir plus sur la définition des champs `deployment_type` et `name`.

Utilisez les tags `service` et `env` pour lier la télémétrie de votre base de données à d'autres données de télémétrie, par l'intermédiaire d'un schéma de tagging commun. Consultez la section [Tagging de service unifié][5] pour découvrir comment ces tags sont exploités dans l'ensemble de la plateforme Datadog.

Une fois la configuration de l'Agent terminée, [redémarrez l'Agent Datadog][6].

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `sqlserver` dans la section **Checks**. Accédez à la page [Databases][8] dans Datadog pour commencer le processus de validation.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /fr/getting_started/tagging/unified_service_tagging
[6]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Docker" %}}
Pour configurer l'Agent Database Monitoring qui s'exécute dans un conteneur Docker, définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur le conteneur de votre Agent.

**Remarque** : pour que le processus de découverte automatique des étiquettes fonctionne, l'Agent doit être autorisé à lire le socket Docker.

Remplacez les valeurs afin qu'elles correspondent à votre compte et votre environnement. Consultez l'[exemple de fichier conf][2] pour découvrir toutes les options de configuration disponibles.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["sqlserver"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<HOSTNAME>,<PORT>",
    "connector": "odbc",
    "driver": "ODBC Driver 18 for SQL Server",
    "username": "datadog",
    "password": "<PASSWORD>",
    "tags": [
      "service:<CUSTOM_SERVICE>"
      "env:<CUSTOM_ENV>"
    ],
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "name": "<AZURE_ENDPOINT_ADDRESS>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

Consultez les [spécifications de l'intégration SQL Server][3] pour en savoir plus sur la définition des champs `deployment_type` et `name`.

Utilisez les tags `service` et `env` pour lier la télémétrie de votre base de données à d'autres données de télémétrie, par l'intermédiaire d'un schéma de tagging commun. Consultez la section [Tagging de service unifié][4] pour découvrir comment ces tags sont exploités dans l'ensemble de la plateforme Datadog.

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `sqlserver` dans la section **Checks**. Sinon, accédez à la page [Databases][6] dans Datadog pour commencer le processus de validation.


[1]: /fr/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: /fr/getting_started/tagging/unified_service_tagging
[5]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Kubernetes" %}}
Si vous exécutez un cluster Kubernetes, utilisez l'[Agent de cluster de Datadog][1] pour activer Database Monitoring. Si les checks de cluster ne sont pas déjà activés, [suivez ces instructions][2] pour les activer avant de continuer.

### Operator

Suivez les étapes ci-dessous pour configurer l'intégration SQL Server en vous appuyant sur les [instructions relatives à l'Operator dans Kubernetes et les intégrations][6] comme référence.

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
              sqlserver.yaml: |-
                cluster_check: true # Make sure to include this flag
                init_config:
                instances:
                - host: <HOSTNAME>,<PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  connector: 'odbc'
                  driver: 'ODBC Driver 18 for SQL Server'
                  dbm: true
                  # Optional: For additional tags
                  tags:
                    - 'service:<CUSTOM_SERVICE>'
                    - 'env:<CUSTOM_ENV>'
                  # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
                  azure:
                    deployment_type: '<DEPLOYMENT_TYPE>'
                    fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
    ```

2. Appliquer les modifications à l'Operator Datadog à l'aide de la commande suivante :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm

Suivez les étapes ci-dessous pour installer l'[Agent de cluster de Datadog][1] sur votre cluster Kubernetes. Remplacez les valeurs pour qu'elles correspondent à votre compte et à votre environnement.

1. Suivez les [instructions d'installation de l'Agent Datadog][3] pour Helm.
2. Mettez à jour votre fichier de configuration YAML (`datadog-values.yaml` dans les instructions d'installation de l'Agent de cluster) pour y inclure les éléments suivants :
    ```yaml
    clusterAgent:
      confd:
        sqlserver.yaml: |-
          cluster_check: true # Required for cluster checks
          init_config:
          instances:
          - dbm: true
            host: <HOSTNAME>,<PORT>
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            connector: 'odbc'
            driver: 'ODBC Driver 18 for SQL Server'
            # Optional: For additional tags
            tags:
              - 'service:<CUSTOM_SERVICE>'
              - 'env:<CUSTOM_ENV>'
            # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
            azure:
              deployment_type: '<DEPLOYMENT_TYPE>'
              fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'

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

Pour configurer un check de cluster avec un fichier de configuration monté, montez le fichier de configuration dans le conteneur de l'Agent de cluster à l'emplacement suivant : `/conf.d/sqlserver.yaml`.

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: <HOSTNAME>,<PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # Optional: For additional tags
    tags:
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
```

### Configuration avec les annotations de service Kubernetes

Plutôt que de monter un fichier, vous pouvez déclarer la configuration d'instance en tant que service Kubernetes. Pour configurer ce check pour un Agent s'exécutant sur Kubernetes, créer un service avec la syntaxe suivante :

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sqlserver-datadog-check-instances
  annotations:
    ad.datadoghq.com/service.check_names: '["sqlserver"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<HOSTNAME>,<PORT>",
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "connector": "odbc",
          "driver": "ODBC Driver 18 for SQL Server",
          "tags": ["service:<CUSTOM_SERVICE>", "env:<CUSTOM_ENV>"],
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "fully_qualified_domain_name": "<AZURE_ENDPOINT_ADDRESS>"
          }
        }
      ]
spec:
  ports:
  - port: 1433
    protocol: TCP
    targetPort: 1433
    name: sqlserver
```

Consultez les [spécifications de l'intégration SQL Server][4] pour en savoir plus sur la définition des champs `deployment_type` et `name`.

L'Agent de cluster enregistre automatiquement cette configuration et commence à exécuter le check SQL Server.

Pour éviter d'exposer le mot de passe de l'utilisateur `datadog` en clair, utilisez le [package de gestion des secrets][5] de l'Agent et déclarez le mot de passe à l'aide de la syntaxe `ENC[]`.


[1]: /fr/agent/cluster_agent
[2]: /fr/agent/cluster_agent/clusterchecks/
[3]: /fr/containers/kubernetes/installation/?tab=helm#installation
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /fr/agent/configuration/secrets-management
[6]: /fr/containers/kubernetes/integrations/?tab=datadogoperator
{{% /tab %}}
{{< /tabs >}}

## Exemples de configuration de l'Agent
{{% dbm-sqlserver-agent-config-examples %}}

## Installer l'intégration Azure

Pour recueillir des métriques et des logs de base de données plus complets depuis Azure, installez l'[intégration Azure][1].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/azure
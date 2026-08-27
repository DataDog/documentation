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
  text: Configurer la surveillance des blocages
- link: /database_monitoring/guide/sql_extended_events/
  tag: Documentation
  text: Configurer l'achèvement des requêtes et la collecte des erreurs de requête.
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentation
  text: Capturer les valeurs des paramètres de requête SQL.
title: Configuration de Database Monitoring pour Azure SQL Server
---
La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données Microsoft SQL Server, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des états, des failovers et des événements de base de données.

Pour activer la solution Database Monitoring pour votre base de données, suivez les étapes ci-dessous :

1. [Accorder à l'Agent l'accès à la base de données](#grant-the-agent-access)
2. [Installer et configurer l'Agent](#install-and-configure-the-agent)
3. [Installer l'intégration Azure](#install-the-azure-integration)

## Avant de commencer{#before-you-begin}

Versions de SQL Server prises en charge
: 2014, 2016, 2017, 2019, 2022, 2025 (nécessite l'Agent 7.79+)

{{% dbm-sqlserver-before-you-begin %}}

## Accorder l'accès à l'Agent{#grant-the-agent-access}

Le Datadog Agent requiert un accès en lecture seule pour le serveur de la base de données, afin de pouvoir recueillir les statistiques et requêtes.

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

**Remarque :** L'authentification par identité gérée Microsoft Entra ID est également prise en charge. Veuillez consulter [le guide][3] sur la façon de configurer cela pour votre instance Azure SQL DB.

Lors de la configuration de Datadog Agent, spécifiez une instance de vérification pour chaque base de données d'application située sur un serveur Azure SQL DB donné. N'incluez pas `master` et d'autres [bases de données système][2]. Le Datadog Agent doit se connecter directement à chaque base de données d'application dans Azure SQL DB car chaque base de données s'exécute dans un environnement de calcul isolé. Cela signifie également que `database_autodiscovery` ne fonctionne pas pour Azure SQL DB, il ne doit donc pas être activé.

**Remarque :** Azure SQL Database déploie une base de données dans un réseau isolé ; chaque base de données est traitée comme un host unique. Cela signifie que si vous exécutez Azure SQL Database dans un pool élastique, chaque base de données du pool est traitée comme un host distinct.

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

Consultez [Installer l'Agent](#install-the-agent) pour des instructions plus détaillées sur la façon d'installer et de configurer Le Datadog Agent.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/database/security-server-roles
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/databases/system-databases
[3]: /fr/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Azure SQL Managed Instance" %}}

Créez une connexion en lecture seule pour vous connecter au serveur en attribuant les autorisations requises :

#### Pour les versions de SQL Server 2014+ {#for-sql-server-versions-2014}

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

**Remarque :** L'authentification par identité gérée Azure est également prise en charge. Veuillez consulter [le guide][1] sur la façon de configurer cela pour votre instance Azure SQL DB.

[1]: /fr/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "SQL Server sur une machine virtuelle Windows Azure" %}}

Pour [SQL Server sur une VM Azure WIndows][1], consultez la section [Configuration de Database Monitoring pour SQL Server auto-hébergé][2] afin d'installer Le Datadog Agent directement sur la VM du host Windows Server.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview
[2]: /fr/database_monitoring/setup_sql_server/selfhosted/
{{% /tab %}}

{{< /tabs >}}

### Stockez votre mot de passe en toute sécurité {#securely-store-your-password}
{{% dbm-secret %}}

## Installez et configurez l'Agent {#install-and-configure-the-agent}

Comme Azure n'accorde pas d'accès direct à l'host, Le Datadog Agent doit être installé sur un host distinct capable de communiquer avec l'host SQL Server. Il existe plusieurs options pour installer et exécuter l'Agent.

{{< tabs >}}
{{% tab "host Windows" %}}

Pour commencer à recueillir des données de télémétrie pour SQL Server, commencez par [installer Le Datadog Agent][1].

Créez le fichier de configuration de l'Agent SQL Server `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. Consultez le [fichier de configuration exemple][2] pour connaître toutes les options de configuration disponibles.

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

Consultez la [spécification de l'intégration SQL Server][3] pour plus d'informations sur la définition des champs `deployment_type` et `fully_qualified_domain_name`.

Pour utiliser l'[authentification Windows][4], définissez `connection_string: "Trusted_Connection=yes"` et omettez les champs `username` et `password`.

Utilisez les tags `service` et `env` pour lier la télémétrie de votre base de données à d'autres télémétries via un schéma de tag commun. Consultez le [Unified Service Tagging][5] pour savoir comment ces tags sont utilisés dans Datadog.

### Pilotes pris en charge {#supported-drivers}

#### Microsoft ADO {#microsoft-ado}

Le fournisseur [ADO][6] recommandé est [Microsoft OLE DB Driver][7]. Assurez-vous que le pilote est installé sur l'host où l'Agent est en cours d'exécution.

```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and lower
```

Les deux autres fournisseurs, `SQLOLEDB` et `SQLNCLI`, sont considérés comme obsolètes par Microsoft et ne devraient plus être utilisés.

#### ODBC {#odbc}

Le pilote ODBC recommandé est [Microsoft ODBC Driver][8]. À partir de l'Agent 7.51, le pilote ODBC 18 pour SQL Server est inclus dans l'Agent pour Linux. Pour Windows, assurez-vous que le pilote est installé sur l'host où l'Agent est en cours d'exécution.

```yaml
connector: odbc
driver: 'ODBC Driver 18 for SQL Server'
```

Une fois la configuration de l'Agent terminée, [redémarrez Le Datadog Agent][9].

### Valider {#validate}

[Exécutez la sous-commande status de l'Agent][10] et recherchez `sqlserver` dans la section **Checks**. Accédez à la page [Databases][11] dans Datadog pour commencer.


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[5]: /fr/getting_started/tagging/unified_service_tagging
[6]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[7]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[9]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "host Linux" %}}
Pour commencer à recueillir des données de télémétrie pour SQL Server, commencez par [installer Le Datadog Agent][1].

Sous Linux, Le Datadog Agent nécessite en outre l'installation d'un pilote ODBC SQL Server, par exemple le [Microsoft ODBC Driver][2]. Une fois qu'un pilote ODBC pour SQL Server est installé, copiez les fichiers `odbc.ini` et `odbcinst.ini` dans le dossier `/opt/datadog-agent/embedded/etc`.

Utilisez le connecteur `odbc` et spécifiez le pilote approprié comme indiqué dans le fichier `odbcinst.ini`.

Créez le fichier de configuration de l'Agent SQL Server `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`. Consultez le [fichier de configuration exemple][3] pour connaître toutes les options de configuration disponibles.

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

Consultez la [spécification de l'intégration SQL Server][4] pour plus d'informations sur la définition des champs `deployment_type` et `fully_qualified_domain_name`.

Utilisez les tags `service` et `env` pour lier votre télémétrie de base de données à d'autres télémétries via un schéma de tag commun. Consultez le [Unified Service Tagging][5] pour savoir comment ces tags sont utilisés dans Datadog.

Une fois la configuration de l'Agent terminée, [redémarrez Le Datadog Agent][6].

### Valider {#validate-1}

[Exécutez la sous-commande status de l'Agent][7] et recherchez `sqlserver` dans la section **Checks**. Accédez à la page [Databases][8] dans Datadog pour commencer.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[5]: /fr/getting_started/tagging/unified_service_tagging
[6]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Docker" %}}
Pour configurer l'Agent Database Monitoring qui s'exécute dans un container Docker, définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur le conteneur de votre Agent.

**Remarque** : L'Agent doit disposer d'une autorisation de lecture sur le socket Docker pour que l'Autodiscovery des labels fonctionne.

Remplacez les valeurs pour qu'elles correspondent à votre compte et à votre environnement. Consultez le [fichier de configuration exemple][2] pour connaître toutes les options de configuration disponibles.

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
      "fully_qualified_domain_name": "<AZURE_ENDPOINT_ADDRESS>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

Consultez la [spécification de l'intégration SQL Server][3] pour plus d'informations sur la définition des champs `deployment_type` et `fully_qualified_domain_name`.

Utilisez les tags `service` et `env` pour lier votre télémétrie de base de données à d'autres télémétries via un schéma de tag commun. Consultez [Unified Service Tagging][4] pour savoir comment ces tags sont utilisés dans Datadog.

### Valider {#validate-2}

[Exécutez la sous-commande status de l'Agent][5] et recherchez `sqlserver` dans la section **Checks**. Sinon, accédez à la page [Databases][6] dans Datadog pour commencer.


[1]: /fr/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[4]: /fr/getting_started/tagging/unified_service_tagging
[5]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Kubernetes" %}}
Si vous exécutez un cluster Kubernetes, utilisez le [Datadog Cluster Agent][1] pour activer la Database Monitoring. Si les vérifications de cluster ne sont pas déjà activées, [suivez ces instructions][2] pour les activer avant de continuer.

### Opérateur {#operator}

Suivez les étapes ci-dessous pour configurer l'intégration SQL Server, en utilisant les [instructions de l'opérateur dans Kubernetes et les Integrations][6] comme référence.

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

2. Appliquez les modifications au Datadog Operator à l'aide de la commande suivante :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

Suivez les étapes suivantes pour installer le [Datadog Cluster Agent][1] sur votre cluster Kubernetes. Remplacez les valeurs pour qu'elles correspondent à votre compte et à votre environnement.

1. Suivez les [instructions d'installation de Le Datadog Agent][3] pour Helm.
2. Mettez à jour votre fichier de configuration YAML (`datadog-values.yaml` dans les instructions d'installation du Cluster Agent) pour inclure ce qui suit :
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

3. Déployez l'Agent avec le fichier de configuration ci-dessus depuis la ligne de commande :
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Pour Windows, ajoutez <code>--set targetSystem=windows</code> à la <code>helm install</code> commande.
</div>

### Configurez avec des fichiers montés {#configure-with-mounted-files}

Pour configurer une vérification de cluster avec un fichier de configuration monté, montez le fichier de configuration dans le container du Cluster Agent sur le chemin : `/conf.d/sqlserver.yaml`

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

### Configurez avec des annotations de service Kubernetes {#configure-with-kubernetes-service-annotations}

Plutôt que de monter un fichier, vous pouvez déclarer la configuration de l'instance en tant que service Kubernetes. Pour configurer cette vérification pour un Agent s'exécutant sur Kubernetes, créez un service en utilisant la syntaxe suivante :

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

Consultez la [spécification de l'intégration SQL Server][4] pour plus d'informations sur la définition des champs `deployment_type` et `fully_qualified_domain_name`.

L'Agent de cluster enregistre automatiquement cette configuration et commence à exécuter le check SQL Server.

Pour éviter d'exposer le mot de passe de l'utilisateur `datadog` en texte clair, utilisez le [package de gestion des secrets][5] de l'Agent et déclarez le mot de passe en utilisant la syntaxe `ENC[]`.


[1]: /fr/agent/cluster_agent
[2]: /fr/agent/cluster_agent/clusterchecks/
[3]: /fr/containers/kubernetes/installation/?tab=helm#installation
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[5]: /fr/agent/configuration/secrets-management
[6]: /fr/containers/kubernetes/integrations/?tab=datadogoperator
{{% /tab %}}
{{< /tabs >}}

## Exemples de configurations d'Agent {#example-agent-configurations}
{{% dbm-sqlserver-agent-config-examples %}}

## Installer l'intégration Azure {#install-the-azure-integration}

Pour recueillir des métriques et des logs de base de données plus complets depuis Azure, installez l'[intégration Azure][1].

## Pour en savoir plus {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/azure
---
description: Installez et configurez la surveillance de la base de données pour SQL
  Server géré sur RDS.
further_reading:
- link: /integrations/sqlserver/
  tag: Documentation
  text: Intégration SQL Server basique
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentation
  text: Résoudre les problèmes courants
- link: /database_monitoring/guide/sql_deadlock/
  tag: Documentation
  text: Configurez la surveillance des blocages.
- link: /database_monitoring/guide/sql_extended_events/
  tag: Documentation
  text: Configurez la collecte de l'achèvement des requêtes et des erreurs de requête.
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentation
  text: Capturez les valeurs des paramètres de requête SQL.
title: Configuration de la surveillance de la base de données pour SQL Server sur
  Amazon RDS.
---
La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données Microsoft SQL Server, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des états, des failovers et des événements de base de données.

Pour activer la solution Database Monitoring pour votre base de données, suivez les étapes ci-dessous :

1. [Configurez l'intégration AWS](#configure-the-aws-integration)
1. [Accordez l'accès à l'Agent](#grant-the-agent-access)
1. [Installez l'Agent](#install-the-agent)
1. [Installez l'intégration RDS](#install-the-rds-integration)

## Avant de commencer {#before-you-begin}

Versions de SQL Server prises en charge
: 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Configurez l'intégration AWS {#configure-the-aws-integration}

Activez {{< ui >}}Standard Collection{{< /ui >}} dans la section {{< ui >}}Resource Collection{{< /ui >}} de votre [tuile d'intégration Amazon Web Services][2].

## Accordez l'accès à l'Agent {#grant-the-agent-access}

L'Agent Datadog requiert un accès en lecture seule pour le serveur de la base de données, afin de pouvoir recueillir les statistiques et requêtes.

Créez une connexion en lecture seule pour vous connecter au serveur en attribuant les autorisations requises :

```SQL
USE [master];
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
GO
--Set context to msdb database and create datadog user
USE [msdb];
CREATE USER datadog FOR LOGIN datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+), comment out the next line:
GRANT SELECT ON dbo.log_shipping_monitor_primary to datadog;
GRANT SELECT ON dbo.log_shipping_monitor_secondary to datadog;
-- If not using SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
GRANT SELECT ON dbo.sysjobs to datadog;
GRANT SELECT ON dbo.sysjobhistory TO datadog;
GRANT SELECT ON dbo.sysjobactivity to datadog;
GO
--Switch back to master and grant datadog user server permissions
USE [master];
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
GO
```

Créez l'utilisateur `datadog` dans chaque base de données d'application supplémentaire :

```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

Ceci est requis car RDS ne permet pas d'accorder `CONNECT ANY DATABASE`. L'Agent Datadog doit se connecter à chaque base de données pour collecter des statistiques spécifiques aux fichiers I/O de la base de données.

### Stockez votre mot de passe de manière sécurisée {#securely-store-your-password}
{{% dbm-secret %}}

## Installez l'Agent {#install-the-agent}

Parce qu'AWS ne permet pas l'accès direct à l'hôte, l'Agent Datadog doit être installé sur un hôte séparé où il peut communiquer avec l'hôte SQL Server. Il existe plusieurs options pour installer et exécuter l'Agent.

{{< tabs >}}
{{% tab "Hôte Windows" %}}
{{% dbm-alwayson-cloud-hosted %}}

Pour commencer à collecter la télémétrie SQL Server, [installez l'Agent Datadog][1], puis créez le fichier de configuration de l'Agent SQL Server à `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. Référez-vous au [fichier de configuration d'exemple][2] pour toutes les options de configuration disponibles.

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
    # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
    aws:
      instance_endpoint: '<INSTANCE_ENDPOINT>'
```

Pour utiliser [l'authentification Windows][4], définissez `connection_string: "Trusted_Connection=yes"` et omettez les champs `username` et `password`.

Utilisez les balises `service` et `env` pour lier votre télémétrie de base de données à d'autres télémétries via un schéma de balisage commun. Consultez [Balisage de service unifié][5] pour des détails sur l'utilisation de ces balises dans Datadog.

### Pilotes pris en charge {#supported-drivers}

#### Microsoft ADO {#microsoft-ado}

Le fournisseur [ADO][6] recommandé est le [Pilote OLE DB de Microsoft][7]. Assurez-vous que le pilote est installé sur l'hôte où l'Agent fonctionne.

```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and lower
```

Les deux autres fournisseurs, `SQLOLEDB` et `SQLNCLI`, sont considérés comme obsolètes par Microsoft et ne doivent pas être utilisés.

#### ODBC {#odbc}

Le pilote ODBC recommandé est le [Pilote ODBC de Microsoft][8]. À partir de l'Agent 7.51, le Pilote ODBC 18 pour SQL Server est inclus par défaut dans l'Agent Linux. Pour Windows, assurez-vous que le pilote est installé sur l'hôte où l'Agent fonctionne.

```yaml
connector: odbc
driver: 'ODBC Driver 18 for SQL Server'
```

Une fois la configuration de l'Agent terminée, [redémarrez l'Agent Datadog][9].

### Valider {#validate}

[Exécutez la sous-commande d'état de l'Agent][10] et recherchez `sqlserver` sous la section **Vérifications**. Naviguez vers la page [Databases][11] dans Datadog pour commencer.

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

{{% tab "Hôte Linux" %}}
{{% dbm-alwayson-cloud-hosted %}}

Pour commencer à recueillir des données de télémétrie pour SQL Server, commencez par [installer l'Agent Datadog][1].

Sur Linux, vous devez également installer un pilote ODBC pour SQL Server, tel que [le pilote ODBC de Microsoft][2]. Après l'installation, copiez les fichiers `odbc.ini` et `odbcinst.ini` dans le dossier `/opt/datadog-agent/embedded/etc`.

Utilisez le connecteur `odbc` et spécifiez le pilote approprié comme indiqué dans le fichier `odbcinst.ini`.

Créez le fichier de configuration de l'Agent SQL Server `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`. Consultez le [fichier de configuration d'exemple][3] pour toutes les options de configuration disponibles.

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
    # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
    aws:
      instance_endpoint: '<INSTANCE_ENDPOINT>'
```

Utilisez les balises `service` et `env` pour lier votre télémétrie de base de données à d'autres télémétries via un schéma de balisage commun. Consultez [Balisage de service unifié][5] pour des détails sur l'utilisation de ces balises dans Datadog.

Une fois la configuration de l'Agent terminée, [redémarrez l'Agent Datadog][6].

### Valider {#validate-1}

[Exécutez la sous-commande d'état de l'Agent][7] et recherchez `sqlserver` dans la section **Vérifications**. Naviguez vers la page [Databases][8] dans Datadog pour commencer.

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
{{% dbm-alwayson-cloud-hosted %}}

Pour configurer l'Agent Database Monitoring qui s'exécute dans un conteneur Docker, définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur le conteneur de votre Agent.

**Remarque** : L'Agent doit avoir l'autorisation de lecture sur le socket Docker pour que l'Autodécouverte des étiquettes fonctionne.

Remplacez les valeurs pour correspondre à votre compte et à votre environnement. Consultez le [fichier de configuration d'exemple][2] pour toutes les options de configuration disponibles.

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
    "aws": {
      "instance_endpoint": "<INSTANCE_ENDPOINT>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

Utilisez les balises `service` et `env` pour lier votre télémétrie de base de données à d'autres télémétries via un schéma de balisage commun. Consultez [l'étiquetage de service unifié][4] pour des informations sur l'utilisation de ces balises dans Datadog.

### Valider {#validate-2}

[Exécutez la sous-commande d'état de l'Agent][5] et recherchez `sqlserver` dans la section **Vérifications**. Alternativement, naviguez vers la page [Databases][6] dans Datadog pour commencer.

[1]: /fr/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: /fr/getting_started/tagging/unified_service_tagging
[5]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}

{{% tab "Kubernetes" %}}
{{% dbm-alwayson-cloud-hosted %}}

Si vous exécutez un cluster Kubernetes, utilisez [l'Agent de cluster Datadog][1] pour activer la surveillance des bases de données. Si les vérifications de cluster ne sont pas déjà activées, [suivez ces instructions][2] pour les activer avant de continuer.

### Opérateur {#operator}

Suivez les étapes ci-dessous pour configurer l'intégration SQL Server, en utilisant les [instructions de l'Opérateur dans Kubernetes et Intégrations][6] comme référence.

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
              sqlserver.yaml: |-
                cluster_check: true # Required for cluster checks
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
                  # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
                  aws:
                    instance_endpoint: <INSTANCE_ENDPOINT>
    ```

2. Appliquez les modifications à l'Opérateur Datadog en utilisant la commande suivante :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

Complétez les étapes suivantes pour installer le [Datadog Cluster Agent][1] sur votre cluster Kubernetes. Remplacez les valeurs pour correspondre à votre compte et à votre environnement.

1. Complétez les [instructions d'installation de l'Agent Datadog][3] pour Helm.
2. Mettez à jour votre fichier de configuration YAML (`datadog-values.yaml` dans les instructions d'installation du Cluster Agent) pour inclure ce qui suit :
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
            # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
            aws:
              instance_endpoint: <INSTANCE_ENDPOINT>

    clusterChecksRunner:
      enabled: true
    ```

3. Déployez l'Agent avec le fichier de configuration ci-dessus depuis la ligne de commande :
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Pour Windows, ajoutez <code>--set targetSystem=windows</code> au <code>helm install</code> commande.
</div>

### Configurez avec des fichiers montés {#configure-with-mounted-files}

Pour configurer un contrôle de cluster avec un fichier de configuration monté, montez le fichier de configuration dans le conteneur du Cluster Agent sur le chemin : `/conf.d/sqlserver.yaml`.

```yaml
cluster_check: true  # Required for cluster checks
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
    # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
    aws:
      instance_endpoint: <INSTANCE_ENDPOINT>
```

### Configurez avec des annotations de service Kubernetes {#configure-with-kubernetes-service-annotations}

Au lieu de monter un fichier, vous pouvez déclarer la configuration de l'instance en tant que Service Kubernetes. Pour configurer ce contrôle pour un Agent fonctionnant sur Kubernetes, créez un service en utilisant la syntaxe suivante :

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
          "aws": {
            "instance_endpoint": "<INSTANCE_ENDPOINT>"
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

Consultez la [spécification d'intégration SQL Server][4] pour des informations supplémentaires sur la définition des champs `deployment_type` et `name` :

L'Agent de cluster enregistre automatiquement cette configuration et commence à exécuter le check SQL Server.

Pour éviter d'exposer le mot de passe de l'utilisateur `datadog` en texte clair, utilisez le [package de gestion des secrets][5] de l'Agent et déclarez le mot de passe en utilisant la syntaxe `ENC[]`.


[1]: /fr/agent/cluster_agent
[2]: /fr/agent/cluster_agent/clusterchecks/
[3]: /fr/containers/kubernetes/installation/?tab=helm#installation
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /fr/agent/configuration/secrets-management
[6]: /fr/containers/kubernetes/integrations/?tab=datadogoperator

{{% /tab %}}

{{< /tabs >}}

## Exemples de configurations d'Agent {#example-agent-configurations}
{{% dbm-sqlserver-agent-config-examples %}}

## Installez l'intégration RDS {#install-the-rds-integration}

Pour collecter des métriques et des journaux de base de données plus complets d'AWS, installez l'[intégration RDS][1].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_rds
[2]: https://app.datadoghq.com/integrations/amazon-web-services
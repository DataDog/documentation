---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    SQLServer-Overview: assets/dashboards/SQLServer-Overview_dashboard.json
    sqlserver: assets/dashboards/sqlserver_dashboard.json
  logs:
    source: sqlserver
  metrics_metadata: metadata.csv
  monitors:
    SQLServer ao not healthy: assets/recommended_monitors/sqlserver_ao_not_healthy.json
    SQLServer db not in sync: assets/recommended_monitors/sqlserver_db_not_sync.json
    SQLServer db not online: assets/recommended_monitors/sqlserver_db_not_online.json
    SQLServer high failed auto param: assets/recommended_monitors/sqlserver_high_number_failed_auto_param.json
    SQLServer high processes blocked: assets/recommended_monitors/sqlserver_high_processes_blocked.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/sqlserver/README.md'
display_name: SQL Server
draft: false
git_integration_title: sqlserver
guid: 635cb962-ee9f-4788-aa55-a7ffb9661498
integration_id: sql-server
integration_title: SQL Server
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sqlserver.
metric_to_check: sqlserver.stats.connections
name: sqlserver
public_title: "Intégration Datadog/SQL\_Server"
short_description: "Recueillez des métriques importantes sur les performances et la santé de SQL\_Server."
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Graphique SQL Server][1]

## Présentation

Le check SQL Server surveille les performances de vos instances SQL Server. Il recueille des métriques concernant le nombre de connexions utilisateur, le nombre de compilations SQL, et plus encore.

Vous pouvez également créer vos propres métriques en demandant au check d'exécuter des requêtes personnalisées.

## Configuration

### Installation

Le check SQL Server est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur vos instances SQL Server.

Vérifiez que votre instance SQL Server prend en charge l'authentification SQL Server en activant « Mode d'authentification SQL Server et Windows » dans les propriétés du serveur :

_Propriétés_ -> _Sécurité_ -> _Mode d'authentification SQL Server et Windows_

### Prérequis

1. Créez un utilisateur en lecture seule pour vous connecter à votre serveur :

    ```text
        CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
        CREATE USER datadog FOR LOGIN datadog;
        GRANT SELECT on sys.dm_os_performance_counters to datadog;
        GRANT VIEW SERVER STATE to datadog;
    ```

2. Assurez-vous que votre instance SQL Server effectue son écoute sur un port fixe spécifique. Par défaut, les instances nommées et SQL Server Express sont configurés pour utiliser des ports dynamiques. Consultez la [documentation de Microsoft][3] pour en savoir plus.

3. Cette étape est obligatoire pour les métriques AlwaysOn. Une autorisation supplémentaire doit être accordée pour rassembler des métriques AlwaysOn :

    ```text
        GRANT VIEW ANY DEFINITION to datadog;
    ```

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `sqlserver.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple sqlserver.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     - host: "<SQL_HOST>,<SQL_PORT>"
       username: datadog
       password: "<YOUR_PASSWORD>"
       connector: odbc # alternative is 'adodbapi'
       driver: SQL Server
   ```

    Consultez [un exemple de configuration du check][2] pour obtenir une description complète de toutes les options, mais également pour découvrir comment utiliser les requêtes personnalisées pour créer vos propres métriques.

    **Remarque** : le fournisseur (par défaut) `SQLOLEDB` est déconseillé. Pour utiliser le nouveau fournisseur `MSOLEDBSQL`, définissez la variable `adoprovider` sur `MSOLEDBSQL` dans votre fichier `sqlserver.d/conf.yaml` après avoir téléchargé le nouveau fournisseur depuis [Microsoft][3]. Vous pouvez également utiliser l'authentification Windows sans fournir de nom d'utilisateur ni de mot de passe en indiquant ce qui suit :

      ```yaml
      connection_string: "Trusted_Connection=yes"
      ```

2. [Redémarrez l'Agent][4].

##### Linux

Des étapes de configuration supplémentaires sont requises pour exécuter l'intégration SQL Server sur un host Linux :

1. Installez un pilote SQL Server ODBC, comme [Microsoft ODBC Driver][5].
2. Copiez les fichiers `odbc.ini` et `odbcinst.ini` dans le dossier `/opt/datadog-agent/embedded/etc`.
3. Modifiez le fichier `conf.yaml` de façon à utiliser le connecteur `odbc` et indiquez le pilote approprié, comme indiqué dans le fichier `odbcinst.ini`.

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `sqlserver.d/conf.yaml` pour commencer à recueillir vos logs SQL Server :

    ```yaml
    logs:
      - type: file
        encoding: utf-16-le
        path: "<LOG_FILE_PATH>"
        source: sqlserver
        service: "<SERVICE_NAME>"
    ```

    Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple sqlserver.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

Consultez la [documentation de Datadog][6] pour découvrir comment configurer l'Agent afin de recueillir les logs dans un environnement Kubernetes.


[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-2017
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017
[6]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `sqlserver`                                                                                                                      |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                                                    |
| `<CONFIG_INSTANCE>`  | `{"host": "%%host%%,%%port%%", "username": "datadog", "password": "<MOTDEPASSEUNIQUE>", "connector": "odbc", "driver": "FreeTDS"}` |

Consultez la documentation relative aux [template variables Autodiscovery][2] pour découvrir comment transmettre `<MOTDEPASSEUNIQUE>` en tant que variable d'environnement plutôt que sous forme d'étiquette.

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][3].

| Paramètre      | Valeur                                             |
| -------------- | ------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "sqlserver", "service": "sqlserver"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `sqlserver` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "sqlserver" >}}


La plupart de ces métriques proviennent de la table `sys.dm_os_performance_counters` de SQL Server.

### Événements

Le check SQL Server n'inclut aucun événement.

### Checks de service

**sqlserver.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à SQL Server pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Développement

Consultez la [documentation principale sur les outils de développement][6] pour découvrir comment tester et développer des intégrations reposant sur l'Agent.

## Pour aller plus loin

- [Surveiller vos bases de données Azure SQL Server Database avec Datadog][7]
- [Métriques clés pour la surveillance de SQL Server][8]
- [Outils de surveillance de SQL Server][9]
- [Surveiller les performances de SQL Server avec Datadog][10]
- [Métriques custom SQL Server pour une surveillance approfondie][11]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/sqlserver/images/sqlserver_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.microsoft.com/en-us/sql/tools/configuration-manager/tcp-ip-properties-ip-addresses-tab
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/help/
[6]: https://docs.datadoghq.com/fr/developers/integrations/
[7]: https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog
[8]: https://www.datadoghq.com/blog/sql-server-monitoring
[9]: https://www.datadoghq.com/blog/sql-server-monitoring-tools
[10]: https://www.datadoghq.com/blog/sql-server-performance
[11]: https://www.datadoghq.com/blog/sql-server-metrics
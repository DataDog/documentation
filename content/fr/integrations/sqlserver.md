---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/sqlserver/README.md'
display_name: "SQL\_Server"
git_integration_title: sqlserver
guid: 635cb962-ee9f-4788-aa55-a7ffb9661498
integration_id: sql-server
integration_title: "SQL\_Server"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sqlserver.
metric_to_check: sqlserver.stats.connections
name: sqlserver
public_title: "Intégration Datadog/SQL\_Server"
short_description: "Recueillez des métriques importantes relatives aux performances et à la santé de SQL\_Server."
support: core
supported_os:
  - linux
  - windows
---
![Graphique SQL Server][1]

## Présentation

Ce check vous permet de suivre les performances de vos instances SQL Server. Il recueille les métriques concernant le nombre de connexions utilisateur, le nombre de compilations SQL, et plus encore.

Vous pouvez également créer vos propres métriques en demandant au check d'exécuter des requêtes personnalisées.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check SQL Server est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos instances SQL Server.

Vérifiez que votre instance SQL Server prend en charge l'authentification SQL Server en activant « Mode d'authentification SQL Server et Windows » dans les propriétés du serveur.
**Propriétés** -> **Sécurité** -> *Mode d'authentification SQL Server et Windows**

### Configuration

1. Créez un utilisateur en lecture seule pour vous connecter à votre serveur :

    ```
        CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
        CREATE USER datadog FOR LOGIN datadog;
        GRANT SELECT on sys.dm_os_performance_counters to datadog;
        GRANT VIEW SERVER STATE to datadog;
    ```

2. Créez un fichier `sqlserver.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4].
    Consultez le [fichier d'exemple sqlserver.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

    ```yaml
        init_config:

        instances:
          - host: <SQL_HOST>,<SQL_PORT>
            username: datadog
            password: <YOUR_PASSWORD>
            connector: odbc # alternative is 'adodbapi'
            driver: SQL Server
    ```

    Consultez [un exemple de configuration du check][5] pour obtenir une description complète de toutes les options, mais également pour découvrir comment utiliser les requêtes personnalisées pour créer vos propres métriques.

    **Remarque** : le fournisseur (par défaut) `SQLOLEDB` est déconseillé. Pour utiliser le nouveau fournisseur `MSOLEDBSQL`, définissez la variable `adoprovider` sur `MSOLEDBSQL` dans votre fichier `sqlserver.d/conf.yaml` après avoir téléchargé le nouveau fournisseur depuis [Microsoft][6].
    **Remarque** : vous pouvez également utiliser l'authentification Windows sans indiquer le nom d'utilisateur/le mot de passe avec
    ```yaml
    connection_string: "Trusted_Connection=yes"
    ```

3. [Redémarrez l'Agent][7] pour commencer à envoyer des métriques SQL Server à Datadog.

#### Linux

Des étapes de configuration supplémentaires sont requises pour exécuter l'intégration SQL Server sur un host Linux :

1. Installez un pilote SQL Server ODBC, comme [Microsoft ODBC Driver][8].
2. Copiez les fichiers `odbc.ini` et `odbcinst.ini` dans le dossier `/opt/datadog-agent/embedded/etc`.
3. Modifiez le fichier `conf.yaml` de façon à utiliser le connecteur `odbc` et indiquez le pilote approprié, comme indiqué dans le fichier `odbcinst.ini`.

### Validation

[Lancez la sous-commande `status` de l'Agent][9] et cherchez `sqlserver` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "sqlserver" >}}


La plupart de ces métriques proviennent de la table `sys.dm_os_performance_counters` de SQL Server.

### Événements
Le check SQL Server n'inclut aucun événement.

### Checks de service

**sqlserver.can_connect** :

Renvoie CRITICAL si l'Agent ne parvient pas à se connecter à SQL Server pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Développement

Consultez la [documentation principale sur les outils de développement][12] pour découvrir comment tester et développer des intégrations reposant sur l'Agent.

### Procédures de test

#### Windows

Pour exécuter les tests sous Windows, une instance de MSSQL doit être ouverte sur le host. Le nom de l'instance de la base de données et les identifiants correspondent à ceux de l'environnement d'intégration continue. Par conséquent, il se peut qu'ils ne fonctionnent pas directement sur un environnement de développement local.

#### Linux

Sous Linux, un conteneur Docker exécutant une instance MSSQL démarre automatiquement avant d'exécuter les tests. Nous utilisons unixODBC et [FreeTDS][13] pour communiquer avec la base de donnée. C'est pourquoi selon la distribution Linux utilisée, vous devez installer des dépendances supplémentaires sur votre environnement de développement local avant d'exécuter les tests. Par exemple, voici les étapes d'installation pour Ubuntu 14.04 :

```
sudo apt-get install unixodbc unixodbc-dev tdsodbc
```

#### OSX

Tout comme Linux, MSSQL s'exécute dans un conteneur Docker et nous communiquons avec la base de données via unixODBC et [FreeTDS][13]. Vous pouvez utiliser [Homebrew][14] pour installer les paquets requis :

```
brew install unixodbc
brew install freetds --with-unixodbc
```

## Pour aller plus loin

* [Surveiller vos bases de données Azure SQL Server Database avec Datadog][15]
* [Métriques clés pour la surveillance de SQL Server][16]
* [Outils de surveillance de SQL Server][17]
* [Surveiller les performances de SQL Server avec Datadog][18]
* [Métriques custom SQL Server pour une surveillance approfondie][19]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/sqlserver/images/sqlserver_dashboard.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[6]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-2017
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/metadata.csv
[11]: https://docs.datadoghq.com/fr/help
[12]: https://docs.datadoghq.com/fr/developers/integrations
[13]: http://www.freetds.org
[14]: https://brew.sh
[15]: https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog
[16]: https://www.datadoghq.com/blog/sql-server-monitoring
[17]: https://www.datadoghq.com/blog/sql-server-monitoring-tools
[18]: https://www.datadoghq.com/blog/sql-server-performance
[19]: https://www.datadoghq.com/blog/sql-server-metrics


{{< get-dependencies >}}
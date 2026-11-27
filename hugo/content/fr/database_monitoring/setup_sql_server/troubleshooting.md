---
description: Dépannage de la configuration de Database Monitoring pour SQL Server
title: Dépannage de la configuration de DBM pour SQL Server
---
Cette page détaille les problèmes courants liés à la configuration et à l'utilisation de Database Monitoring avec SQL Server, ainsi que la manière de les résoudre. Datadog recommande de conserver la dernière version stable de l'Agent et de respecter la [documentation de configuration][1] la plus récente, car celle-ci peut changer avec les versions de l'Agent.

## Validez votre configuration avec la commande diagnose de l'Agent {#agent-diagnose}

À partir de l'Agent v7.81.0, l'intégration SQL Server valide votre configuration via la [commande diagnose][15] de l'Agent. Pour chaque instance configurée, la commande vérifie si :

- L'Agent peut se connecter à SQL Server
- Le pilote ODBC configuré est installé
- La version de SQL Server est prise en charge
- L'Agent dispose des autorisations requises par Database Monitoring, notamment `VIEW SERVER STATE`, `CONNECT ANY DATABASE`, `VIEW ANY DEFINITION`, l'accès à chaque base de données surveillée et `SELECT` sur `msdb`

Exécutez la suite de diagnostics `check-datadog` :

{{< tabs >}}
{{% tab "Windows" %}}

Depuis une invite PowerShell avec élévation de privilèges :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" diagnose --include check-datadog
```

{{% /tab %}}
{{% tab "Linux" %}}

```shell
sudo datadog-agent diagnose --include check-datadog
```

{{% /tab %}}
{{< /tabs >}}

Par défaut, la commande exécute les diagnostics au sein du service Agent en cours d'exécution, en tant que compte de service de l'Agent. La commande `agent.exe check sqlserver` se connecte plutôt en tant qu'utilisateur connecté ; la commande diagnose est donc la méthode recommandée pour tester l'authentification Windows. Pour la configuration de l'authentification Windows, consultez la section [Login Failed for user](#login-failed-for-user).

**Remarque** : si la commande ne parvient pas à atteindre le service Agent, elle affiche `Error running diagnose in Agent process` et exécute les diagnostics en tant qu'utilisateur actuel. L'indicateur `--local` les exécute également en tant qu'utilisateur actuel. Dans les deux cas, les résultats ne reflètent pas l'accès du compte de service de l'Agent.

## Diagnostic des problèmes de connexion courants {#common-connection-issues}

### Impossible de se connecter à SQL Server : « Login Failed for user » {#login-failed-for-user}

Il existe deux manières pour l'Agent de se connecter à une instance SQL Server :

1. [Authentification Windows][2] (disponible uniquement sur les hosts Windows)

2. [Authentification SQL Server][3]

L'authentification Windows est le mode d'authentification par défaut et est plus sécurisée que l'authentification SQL Server. Avec l'authentification Windows, des groupes Windows peuvent être créés au niveau du domaine, et un identifiant de connexion peut être créé sur SQL Server pour l'ensemble du groupe. Afin d'utiliser l'authentification Windows, vous devez :

1. Utilisez le compte de service créé lors de l'[installation de l'Agent][4], et assurez-vous que ce compte dispose de l'accès approprié à SQL Server.

2. Définissez `connection_string: "Trusted_Connection=yes"` et omettez les champs `username` et `password`. L'attribut de connexion `Trusted_Connection=yes` indique au pilote OLE DB pour SQL Server d'utiliser l'authentification Windows pour la validation de la connexion.

L'authentification SQL Server ne repose pas sur les comptes d'utilisateur Windows : les comptes de connexion sont créés dans l'instance et stockés dans SQL Server lui-même. L'authentification SQL nécessite de définir `username` et `password` dans la configuration de l'instance SQL Server pour se connecter.

Si vous obtenez une erreur de connexion, il est important de vérifier d'abord que vous pouvez vous connecter à l'instance en tant qu'utilisateur de l'Agent Datadog. Un moyen simple de le faire est d'utiliser un utilitaire en ligne de commande tel que `sqlcmd`.

Par exemple :

```bash
# this example uses SQL Authentication
sqlcmd -S <INSTANCE_ENDPOINT> -U datadog -P <DATADOG_PASSWORD> -d master

# this example uses Windows Authentication
# Run this command in powershell via selecting the `run as user...` option to run as the ddagentuser
sqlcmd -S <INSTANCE_ENDPOINT> -d master -E
```

Si l'utilisateur `datadog` n'est pas en mesure de se connecter à l'instance SQL Server, vérifiez que l'utilisateur existe. Vérifiez ensuite qu'il dispose des autorisations listées dans la [documentation de configuration][1]. Pour tester la connexion et les autorisations en tant que compte de service de l'Agent, exécutez la commande diagnose de l'Agent décrite dans la section [Validez votre configuration avec la commande diagnose de l'Agent](#agent-diagnose). L'authentification Windows est prise en charge lorsque l'Agent se connecte à une instance SQL Server exécutée sur le même host que l'Agent.

Microsoft fournit également un document utile sur le dépannage de ces types d'erreurs, qui peut être [consulté ici][5].

### Erreur de connexion TCP à SQL Server {#tcp-connection-error}

Les problèmes de connexion TCP sont courants lorsqu'il y a une erreur de configuration avec l'Agent. Les messages d'erreur fournis par le pilote ne sont pas toujours clairs.

Par exemple, l'erreur suivante est due à l'échec de la connexion TCP :

```bash
TCP-connection(ERROR: getaddrinfo failed). Exception: unable to connect: could not open database requested by login
```

Voici quelques erreurs courantes :

**« login failed for user »** : cela signifie que l'Agent a réussi à établir une connexion avec le host, mais que l'ouverture de session a été refusée pour une raison quelconque.

Pour résoudre les problèmes :

1. Vérifiez les identifiants de connexion de l'Agent

2. Essayez de vous connecter manuellement avec ces identifiants en utilisant sqlcmd. Par exemple : `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`

**« could not open database requested for login »** : cette erreur apparaît soit en raison de problèmes réseau, soit en raison d'une base de données inconnue.

Pour résoudre les problèmes :

1. Vérifiez la connexion TCP de l'Agent au host en exécutant `telnet {host} {port}` pour vous assurer qu'il existe une connectivité réseau entre l'Agent et la base de données.

2. Essayez de vous connecter manuellement en utilisant sqlcmd et vérifiez s'il y a un problème avec la base de données configurée. Par exemple : `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`

####  En raison de l'erreur « Invalid connection string attribute » {#due-to-invalid-connection-string-attribute}

Les fournisseurs ADO suivants sont pris en charge sur Windows : `SQLOLEDB`, `MSOLEDBSQL`, `MSOLEDBSQL19`, `SQLNCLI11`.

Les fournisseurs `SQLOLEDB` et `SQLNCLI11` peuvent afficher le message d'erreur `Invalid connection string attribute` en raison de plusieurs problèmes. Par exemple :

```
datadog_checks.sqlserver.connection.SQLConnectionError:
Unable to connect to SQL Server for instance foo.com,1433 - master:
OperationalError(com_error(-2147352567, 'Exception occurred.',
(0, 'Microsoft OLE DB Provider for SQL Server',
'Invalid connection string attribute', None, 0, -2147467259), None),
'Error opening connection to "ConnectRetryCount=2;Provider=SQLOLEDB;Data Source=foo.com,1433;Initial Catalog=master;User ID=datadog;Password=******;"')
```

Cette même erreur s'affiche quelle que soit la raison de l'échec (par exemple, en raison d'un nom de host inconnu, d'une connexion TCP non établie, d'identifiants de connexion non valides ou d'une base de données inconnue).

Recherchez les codes d'erreur HResult dans le message d'erreur. Voici des exemples de codes connus :

`-2147217843` **« login failed for user »** : cela signifie que l'Agent a réussi à établir une connexion avec le host, mais que l'authentification a été refusée pour une raison quelconque.

`-2147467259` **« could not open database requested for login »** : cette erreur apparaît soit en raison de problèmes réseau, soit en raison d'une base de données inconnue.

Si aucune de ces étapes ne permet de résoudre le problème, ou si le code d'erreur que vous voyez n'est pas répertorié, Datadog recommande d'utiliser le pilote `MSOLEDBSQL` ou le `Microsoft ODBC Driver for SQL Server`. Les pilotes fournissent des messages d'erreur plus détaillés, ce qui peut aider à diagnostiquer la raison de l'échec de la connexion.

### SQL Server « Unable to connect: Adaptive Server is unavailable or does not exist » {#adaptive-server-unavailable}

Cette erreur peut parfois résulter d'un paramétrage incorrect du champ `host`. Pour l'intégration, définissez le champ `host` avec la syntaxe suivante : `host:server,port`.

Par exemple, si vous avez défini `host` de cette façon :

```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com
```
Vous devez ajouter le port et le définir plutôt comme suit :

```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com,1433
```

### SSL Provider: The certificate chain was issued by an authority that is not trusted {#certificate-verify-fail}

#### Microsoft OLE DB Driver 2019 {#microsoft-ole-db-driver-2019}

Cette erreur est courante après la mise à niveau vers le pilote [`MSOLEDBSQL` 2019][6] en raison des [modifications incompatibles][7] qui ont été introduites. Dans la dernière version du pilote, toutes les connexions à l'instance SQL sont chiffrées par défaut.

Si vous utilisez la dernière version du pilote Microsoft OLE DB pour SQL Server et que vous essayez de vous connecter à une instance SQL Server qui nécessite des connexions chiffrées, vous pouvez utiliser l'une des solutions de contournement suivantes :

1. Si vous utilisez un certificat auto-signé et le paramètre Force Encryption sur le serveur (`rds.force_ssl=1` sur AWS) pour garantir que les clients se connectent avec un chiffrement :

   - Passez à un certificat approuvé faisant partie de la chaîne de confiance du client.
   - Ajoutez le certificat auto-signé en tant que certificat approuvé sur le client.
   - Ajoutez `Trust Server Certificate=True;` à la chaîne de connexion.

Ceci est décrit plus en détail [dans la documentation Microsoft][7]

2. Si votre instance SQL Server ne nécessite pas de chiffrement pour se connecter (`rds.force_ssl=0` sur AWS), mettez à jour la chaîne de connexion pour inclure `Use Encryption for Data=False;`. Par exemple :

  ```yaml
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trust Server Certificate=True;Use Encryption for Data=False;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL19
  ```

3. Installez la [version 2018 du pilote MSOLEDBSQL][8], qui n'utilise pas le chiffrement par défaut. Après avoir installé le pilote, mettez à jour `adoprovider` vers `MSOLEDBSQL`. Par exemple :

  ```yaml
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trusted_Connection=yes;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL
  ```

#### Autres versions des pilotes Microsoft OLE DB et ODBC {#other-microsoft-ole-db-and-odbc-driver-versions}

Si vous utilisez un pilote OLE DB autre que `MSOLEDBSQL` 2019 ou des pilotes ODBC, cette erreur peut être résolue en définissant `TrustServerCertificate=yes` dans la chaîne de connexion. Par exemple, pour le pilote `ODBC` :

  ```yaml
  # this example uses SQL Server authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      username: datadog
      password: <DD_AGENT_PASSWORD>
      connection_string: "TrustServerCertificate=yes;"
      connector: odbc
      driver: '{ODBC Driver 18 for SQL Server}'
  ```

### SQL Server ne parvient pas à se connecter « SSL Security error (18) » {#ssl-security-error}

Il s'agit d'un problème connu pour les anciennes versions du pilote ODBC SQL Server. Vous pouvez vérifier quelle version du pilote est utilisée par l'Agent en consultant la chaîne de connexion dans le message d'erreur.

Par exemple, si vous voyez `Provider=SQL Server` dans la chaîne de connexion du message d'erreur, la mise à niveau vers une version plus récente du pilote ODBC corrigera l'erreur.

Ce problème est décrit plus en détail dans cet [article de blog Microsoft][9]

### Chaîne de connexion vide {#empty-connection-string}

La vérification SQL Server de Datadog repose sur la bibliothèque Python `adodbapi`, qui présente certaines limitations concernant les caractères qu'elle peut utiliser pour créer une chaîne de connexion à un SQL Server. Si votre Agent rencontre des difficultés pour se connecter à votre SQL Server, et si vous trouvez des erreurs similaires à ce qui suit dans les fichiers collector.logs de votre Agent, votre `sqlserver.yaml` peut inclure certains caractères qui causent des problèmes avec `adodbapi`.

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

Pour le moment, le seul caractère connu pour causer ce problème de connectivité spécifique est le caractère `%`. Si vous devez utiliser le caractère `%` dans votre fichier `sqlserver.yaml` (par exemple, si le mot de passe de votre utilisateur Datadog SQL Server inclut un `%`), vous devez échapper ce caractère en incluant un double `%%` à la place de chaque `%` simple.

## Diagnostiquer les problèmes courants liés aux pilotes SQL Server {#common-driver-issues}

### Nom de source de données introuvable et aucun pilote par défaut spécifié {#data-source-name-not-found}

Il s'agit d'une erreur courante rencontrée sur Linux lors de l'utilisation du paramètre par défaut pour le pilote ODBC. Cela peut se produire parce que le [DSN][10], qui est défini pour votre pilote dans le fichier `/etc/odbcinst.ini`, ne correspond pas au nom du pilote défini dans la configuration de votre Agent.

Par exemple, si vous souhaitez utiliser le pilote ODBC par défaut pour l'Agent (`{ODBC Driver 18 for SQL Server}`), votre configuration d'instance doit contenir ce qui suit :

```yaml
  connector: odbc
```

Lorsque l'Agent démarre et tente d'établir une connexion à votre instance SQL Server, il recherche le fichier `/etc/odbcinst.ini` pour trouver le chemin d'accès aux binaires du pilote.

Par exemple, ce fichier `/etc/odbcinst.ini` définit le pilote :

    

```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 18 for SQL Server]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

Le DSN dans l'exemple ci-dessus est `[ODBC Driver 18 for SQL Server]`, ce qui correspond au nom de pilote par défaut que l'Agent utilise. Si le DSN de votre pilote ne correspond pas au nom du pilote que l'Agent utilise, vous obtiendrez l'erreur `Data source not found`.

Il est possible de définir le `dsn` dans votre configuration d'instance pour qu'il corresponde à ce qui est défini dans votre fichier `/etc/odbcinst.ini`. Par exemple :

    

```text
    $ cat /etc/odbcinst.ini
    [Custom]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

Dans votre configuration d'instance, vous définiriez alors le champ `dsn` :

```yaml
  connector: odbc
  dsn: "Custom"
```

### Fournisseur ou pilote introuvable {#provider-not-found}

Ce message d'erreur peut varier dans sa formulation selon les différents pilotes, mais il ressemble généralement à ce qui suit pour `ODBC` :

1. `Can't open lib .* file not found`
2. `Data source name not found.* and no default driver specified`

Et pour les fournisseurs `MSOLEDBSQL`, le message d'erreur ressemble à :

  ```text
  Provider cannot be found. It may not be properly installed.
  ```

Cela signifie que le pilote ou le fournisseur n'est pas correctement installé sur le host où l'Agent est en cours d'exécution. Vous devez vous assurer d'avoir suivi toutes les instructions d'installation du pilote que vous avez choisi d'utiliser.

Il est possible que l'Agent ne trouve pas le pilote. C'est plus courant avec les pilotes ODBC sur Linux. Consultez la section [connexion à SQL Server sur un host Linux](#connecting-to-sql-server-on-a-linux-host) pour plus d'instructions sur la façon d'installer le pilote ODBC sur Linux.

Pour obtenir de l'aide sur le choix d'un pilote, consultez la section [choix d'un pilote SQL Server](#picking-a-sql-server-driver) pour savoir comment configurer correctement votre pilote avec l'Agent.

### Connexion à SQL Server sur un host Linux {#connecting-to-sql-server-on-a-linux-host}

Pour connecter SQL Server (hébergé sur Linux ou Windows) à un host Linux :

1. Installez le [Microsoft ODBC Driver][11] pour votre distribution Linux.
   Si vous n'êtes pas sûr du nom du pilote à utiliser, vous pouvez le trouver entre crochets en haut de `/etc/odbcinst.ini`.

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 13 for SQL Server]
    Description=Microsoft ODBC Driver 13 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```
2. Copiez les fichiers `odbc.ini` et `odbcinst.ini` dans le dossier `/opt/datadog-agent/embedded/etc`.
3. Si nécessaire, installez le module pyodbc. Cela peut être fait en exécutant pip install pyodbc dans l'environnement Python de votre Agent. Par exemple :

    ```shell
    $ sudo /opt/datadog-agent/embedded/bin/pip install pyodbc
    ```
3. Configurez votre `conf.yaml` SQL Server pour utiliser le connecteur odbc et spécifiez le pilote approprié comme indiqué dans le fichier `odbcinst.ini`.

    ```yaml
    init_config:

    instances:
      - host: <HOST>,<PORT>
        # enable the odbc connector
        connector: odbc
        # enable the ODBC driver
        driver: '{ODBC Driver 13 for SQL Server}'
        username: <USERNAME>
        password: <PASSWORD>
    ```

### Choisir un pilote SQL Server {#picking-a-driver}

Pour que l'Agent puisse se connecter à l'instance SQL Server, vous devez installer soit le [pilote Microsoft ODBC][12], soit le [pilote OLE DB][13].

Le pilote que vous choisissez détermine la valeur à définir pour le champ [connector][14] dans la configuration de votre instance.

Par exemple, pour le [pilote Microsoft ODBC][12] :

  ```yaml
  connector: odbc
  driver: '{ODBC Driver 18 for SQL Server}'
  ```

Pour le [pilote OLE DB][13] :

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL
  ```

Ces valeurs serviront à renseigner la partie `Provider` de la chaîne de connexion.

Ainsi, par exemple, si vous définissez `adoprovider: MSOLEDBSQL`, la chaîne de connexion inclura `Provider=MSOLEDBSQL`. Cela doit correspondre au nom de la version du pilote que vous avez installée.

Dans la dernière version du [pilote Microsoft OLE DB][13], le nom du pilote a été modifié de `MSOLEDBSQL` à `MSOLEDBSQL19`, ce qui signifie que cela doit apparaître dans la configuration de votre instance comme suit :

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL19
  ```

Il est recommandé de rester à jour avec la dernière version disponible du pilote que vous sélectionnez.

## Autres problèmes courants {#other-common-issues}

### Le tag utilisateur SQL Server est absent de Query Metrics et de Plan Samples {#sql-server-user-tag-is-missing-on-the-query-metrics-and-plan-samples}

Le tag `user` n'est plus pris en charge pour Query Metrics et Plan Samples en raison de limitations techniques de SQL Server qui empêchent de collecter l'identité de l'utilisateur qui exécute les requêtes.

Le tag `user` est disponible pour les événements Query Activity et les métriques Database Load.

### Pourquoi y a-t-il autant de requêtes « CREATE PROCEDURE » ? {#why-are-there-so-many-create-procedure-queries}

Dans les versions de l'Agent antérieures à 7.40.0, un bug entraîne une surestimation des statistiques `PROCEDURE`. Cela fait apparaître de nombreuses exécutions de `CREATE PROCEDURE...` dans l'interface Query Metrics de Database Monitoring. Afin de résoudre ce problème, veuillez mettre à jour l'Agent Datadog vers sa dernière version.

### Les SQL Server Agent Jobs ne sont pas collectés et l'erreur « The SELECT permission was denied on the object 'sysjobs' » s'affiche {#sql-server-agent-jobs-are-not-being-collected-with-error-the-select-permission-was-denied-on-the-object-sysjobs}

La vérification SQL Server Agent Jobs nécessite l'autorisation `SELECT` sur la base de données `msdb`. Si vous voyez l'erreur `The SELECT permission was denied on the object 'sysjobs'`, vous devez accorder l'autorisation `SELECT` à l'utilisateur utilisé par l'Agent pour se connecter à l'instance SQL Server.

```SQL
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

## Limitations connues {#known-limitations}

### SQL Server 2012 {#sql-server-2012}

Les métriques suivantes ne sont pas disponibles pour SQL Server 2012 :

- `sqlserver.files.read_io_stall_queued`
- `sqlserver.files.write_io_stall_queued`
- `sqlserver.ao.quorum_type`
- `sqlserver.ao.quorum_state`
- `sqlserver.ao.member.type`
- `sqlserver.ao.member.state`
- `sqlserver.ao.member.number_of_quorum_votes`
- `sqlserver.ao.log_send_queue_size`
- `sqlserver.ao.log_send_rate`
- `sqlserver.ao.redo_queue_size`
- `sqlserver.ao.redo_rate`
- `sqlserver.ao.low_water_mark_for_ghosts`
- `sqlserver.ao.filestream_send_rate`
- `sqlserver.ao.replica_status`
- `sqlserver.ao.secondary_lag_seconds`
- `sqlserver.fci.status`
- `sqlserver.fci.is_current_owner`
- `sqlserver.latches.latch_wait_time`

La collecte des interblocages (`collect_deadlocks: enabled: true`) n'est pas prise en charge sur SQL Server 2012. La requête de collecte utilise `AT TIME ZONE`, un opérateur T-SQL introduit dans SQL Server 2016. L'activation de cette fonctionnalité sur SQL Server 2012 provoque une erreur de syntaxe dans la requête (`Incorrect syntax near 'AT'`) à chaque exécution de la vérification. Pour éviter cette erreur, définissez `collect_deadlocks: enabled: false` dans la configuration de votre instance.

### SQL Server 2014 {#sql-server-2014}

Les métriques suivantes ne sont pas disponibles pour SQL Server 2014 :

- `sqlserver.ao.secondary_lag_seconds`
- `sqlserver.latches.latch_wait_time`

La collecte des interblocages (`collect_deadlocks: enabled: true`) n'est pas prise en charge sur SQL Server 2014. La requête de collecte utilise `AT TIME ZONE`, un opérateur T-SQL introduit dans SQL Server 2016. L'activation de cette fonctionnalité sur SQL Server 2014 provoque une erreur de syntaxe dans la requête (`Incorrect syntax near 'AT'`) à chaque exécution de la vérification. Pour éviter cette erreur, définissez `collect_deadlocks: enabled: false` dans la configuration de votre instance.

[1]: /fr/database_monitoring/setup_sql_server/
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode?view=sql-server-ver16#connecting-through-windows-authentication
[3]: https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode?view=sql-server-ver16#connecting-through-sql-server-authentication
[4]: https://docs.datadoghq.com/fr/agent/guide/windows-agent-ddagent-user/#installation
[5]: https://learn.microsoft.com/en-us/troubleshoot/sql/connect/login-failed-for-user
[6]: https://learn.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-ver16#3-microsoft-ole-db-driver-for-sql-server-msoledbsql
[7]: https://techcommunity.microsoft.com/t5/sql-server-blog/ole-db-driver-19-0-for-sql-server-released/ba-p/3170362
[8]: https://learn.microsoft.com/en-us/sql/connect/oledb/release-notes-for-oledb-driver-for-sql-server?view=sql-server-ver16#1863
[9]: https://community.hostek.com/t/ssl-security-error-for-microsoft-sql-driver/348
[10]: https://learn.microsoft.com/en-us/sql/integration-services/import-export-data/connect-to-an-odbc-data-source-sql-server-import-and-export-wizard?view=sql-server-ver16
[11]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux/installing-the-microsoft-odbc-driver-for-sql-server-on-linux
[12]: https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16
[13]: https://learn.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-ver16
[14]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L201-L208
[15]: /fr/agent/configuration/agent-commands/#other-commands
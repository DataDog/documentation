---
description: Dépannage de la solution Database Monitoring pour SQL Server
title: Dépannage de la solution Database Monitoring pour SQL Server
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

Cette page décrit les problèmes courants liés à la configuration et à l'utilisation de la solution Database Monitoring avec SQL Server et explique comment les résoudre. Datadog recommande de rester sur la dernière version stable de l'Agent et de suivre les dernières [instructions de configuration][1], car elles peuvent changer en fonction des versions de l'Agent.

## Diagnostiquer les problèmes de connexion courants {#problemes-de-connexion-courants}

### SQL Server ne parvient pas à se connecter : "Login Failed for user" {#login-failed-for-user}

L'Agent peut se connecter à une instance SQL Server de deux manières différentes :

1. [Authentification Windows][2] (uniquement disponible sur les hosts Windows)

2. [Authentification SQL Server][3]

Le mode d'authentification par défaut est l'authentification Windows, qui est plus sécurisée que l'authentification SQL Server. L'authentification Windows vous permet de créer des groupes Windows au niveau du domaine et de créer un identifiant sur SQL Server pour l'ensemble du groupe. Pour utiliser l'authentification Windows, vous devez :

1. Utiliser le compte de service créé lors de [l'installation de l'Agent][4] et vous assurer que ce compte dispose de l'accès approprié à SQL Server.

2. Définir `connection_string: "Trusted_Connection=yes"` en omettant les champs `username` et `password`. L'attribut de connexion `Trusted_Connection=yes` indique à l'interface OLE DB Driver pour SQL Server de valider la connexion via l'authentification Windows.

L'authentification SQL Server n'est pas basée sur les comptes utilisateur Windows : elle est créée dans l'instance, puis stockée dans SQL Server. Pour vous connecter via l'authentification SQL, vous devez définir les champs `username` et `password` dans la configuration de l'instance SQL Server.

En cas d'erreur de connexion, commencez par vérifier si vous pouvez vous connecter à l'instance en tant qu'utilisateur datadog. Pour ce faire, utilisez simplement un outil de ligne de commande tel que `sqlcmd`.

Par exemple :

```bash
# Dans cet exemple, l'authentification SQL est utilisée
sqlcmd -S <ENDPOINT_INSTANCE> -U datadog -P <MOTDEPASSE_DATADOG> -d master

# Dans cet exemple, l'authentification Windows est utilisée
# Exécutez cette commande en tant que ddagentuser dans PowerShell en sélectionnant l'option `run as user...`
sqlcmd -S <ENDPOINT_INSTANCE> -d master -E
```

Si l'utilisateur `datadog` ne parvient pas à se connecter à l'instance SQL Server, vérifiez que l'utilisateur a été créé et qu'il dispose des autorisations appropriées conformément à la [documentation relative à la configuration][1].

Microsoft propose également un document pouvant vous aider à résoudre ces types d'erreurs, disponible [ici][5].

### Erreur de connexion TCP à SQL Server {#erreur-de-connexion-tcp}

Les problèmes de connexion TCP sont récurrents lorsque l'Agent est mal configuré. Les messages d'erreur fournis par le pilote ne sont pas toujours clairs.

Par exemple, l'erreur suivante est due à un échec de la connexion TCP :

```shell
TCP-connection(ERROR: getaddrinfo failed). Exception: unable to connect: could not open database requested by login
```

Voici quelques exemples d'erreurs courantes :

**login failed for user** : l'Agent a réussi à établir une connexion avec le host, mais la connexion a été rejetée pour une raison inconnue.

Pour résoudre ce problème :

1. Vérifiez les identifiants de connexion de l'Agent

2. Connectez-vous manuellement avec ces identifiants via l'utilitaire sqlcmd. Par exemple : `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`

**could not open database requested for login** : cette erreur survient en cas de problème réseau ou de base de données inconnue.

Pour résoudre ce problème :

1. Vérifiez la connexion TCP entre l'Agent et le host en exécutant `telnet {host} {port}` afin de vous assurer qu'il existe une connectivité réseau entre l'Agent et la base de données.

2. Connectez-vous manuellement via l'utilitaire sqlcmd et vérifiez s'il y a un problème avec la base de données configurée. Par exemple : `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`

#### Invalid connection string attribute

Les fournisseurs ADO suivants sont pris en charge par Windows : `SQLOLEDB`, `MSOLEDBSQL`, `MSOLEDBSQL19`, `SQLNCLI11`.

Les fournisseurs `SQLOLEDB` et `SQLNCLI11` peuvent afficher le message d'erreur `Invalid connection string attribute` en raison de plusieurs problèmes. Par exemple :

```
datadog_checks.sqlserver.connection.SQLConnectionError:
Unable to connect to SQL Server for instance foo.com,1433 - master:
OperationalError(com_error(-2147352567, 'Exception occurred.',
(0, 'Microsoft OLE DB Provider for SQL Server',
'Invalid connection string attribute', None, 0, -2147467259), None),
'Error opening connection to "ConnectRetryCount=2;Provider=SQLOLEDB;Data Source=foo.com,1433;Initial Catalog=master;User ID=datadog;Password=******;"')
```

Cette erreur s'affiche quelle que soit la cause de l'échec (comme un hostname inconnu, une connexion TCP non établie, des identifiants de connexion non valides ou une base de données inconnue).

Recherchez la présence de codes d'erreur HResult dans le message. Voici quelques exemples de codes connus :

`-2147217843` **login failed for user** : l'Agent a réussi à établir une connexion avec le host, mais la connexion a été rejetée pour une raison inconnue.

`-2147467259` **could not open database requested for login** : cette erreur survient en cas de problème réseau ou de base de données inconnue.

Si aucune des étapes ne résout le problème ou si le code d'erreur affiché n'est pas répertorié, Datadog vous recommande d'utiliser le pilote `MSOLEDBSQL` ou `Microsoft ODBC Driver for SQL Server`. Les pilotes fournissent des messages d'erreur plus détaillés, qui peuvent aider à résoudre les problèmes de connexion.

### SQL Server : Unable to connect: Adaptive Server is unavailable or does not exist {#adaptive-server-indisponible}

Cette erreur peut être due à une mauvaise définition du champ `host`. Pour l'intégration, définissez le champ `host` en respectant la syntaxe suivante : `host:server,port`.

Par exemple, si vous avez défini `host` comme suit :

```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com
```
Vous devez ajouter le port et le définir comme suit :
```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com,1433
```

### Fournisseur SSL : The certificate chain was issued by an authority that is not trusted {#echec-verification-certificat}

Cette erreur se produit souvent après la mise à niveau vers le dernier pilote [MSOLEDBSQL][6] en raison des [changements majeurs][7] qui y ont été apportés. Dans la dernière version du pilote, toutes les connexions à l'instance SQL sont chiffrées par défaut.

Si vous utilisez la dernière version de Microsoft OLE DB Driver pour SQL Server et que vous essayez de vous connecter à une instance SQL Server exigeant des connexions chiffrées, vous pouvez appliquer les solutions suivantes :

1. Si vous utilisez un certificat auto-signé et le paramètre Force Encryption sur le serveur (`rds.force_ssl=1` sur AWS) afin de vous assurer que les clients utilisent une connexion chiffrée :

   - Passez à un certificat vérifié comme étant de confiance au moyen de la chaîne de confiance du client
   - Ajoutez le certificat auto-signé en tant que certificat de confiance côté client
   - Ajoutez `TrustServerCertificate=yes;` à la chaîne de connexion

Pour en savoir plus, consultez [la documentation Microsoft][7].

2. Si votre instance SQL Server ne nécessite aucun chiffrement pour se connecter (`rds.force_ssl=0` sur AWS), ajoutez `Use Encryption for Data=False;` dans la chaîne de connexion. Par exemple :

  ```yaml
  # example uses windows authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trusted_Connection=yes;Use Encryption for Data=False;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL19
  ```

3. Installez la [version 2018 du pilote MSOLEDBSQL][8]. Ce pilote n'applique pas de chiffrement par défaut. Une fois le pilote installé, définissez `adoprovider` sur `MSOLEDBSQL`. Par exemple :

  ```yaml
  # example uses windows authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trusted_Connection=yes;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL
  ```

Si vous utilisez un pilote **autre que `MSOLEDBSQL` 2019**, cette erreur peut être résolue en définissant `TrustServerCertificate=yes` dans la chaîne de connexion. Par exemple, pour la version 2018 du pilote `ODBC` :

  ```yaml
  #  dans cet exemple, l'authentification SQL Server est utilisée
  instances:
    - host: <ENDPOINT_INSTANCE>,<PORT>
      username: datadog
      password: <MOTDEPASSE_AGENT_DD>
      connection_string: "TrustServerCertificate=yes;"
      connector: odbc
      driver: '{ODBC Driver 17 for SQL Server}'
  ```

### SQL Server ne parvient pas à se connecter : SSL Security error (18) {#ssl-security-error}

Il s'agit d'un problème connu dans les anciennes versions du pilote ODBC pour SQL Server. Pour connaître la version du pilote utilisée par l'Agent, examinez la chaîne de connexion dans le message d'erreur.

Par exemple, si `Provider=SQL Server` apparaît dans la chaîne de connexion du message d'erreur, vous pouvez résoudre ce problème en mettant à niveau le pilote ODBC.

Pour en savoir plus sur cette erreur, consultez [l'article de blog de Microsoft][7].

### Chaîne de connexion vide {#chaine-de-connexion-vide}

Le check SQL Server Datadog s'appuie sur la bibliothèque Python `adodbapi`, qui limite le type de caractères utilisables dans une chaîne de connexion vers un serveur SQL. Si votre Agent ne parvient pas à se connecter à votre serveur SQL, et que vous recevez des erreurs semblables à celle qui suit dans les logs collector.logs de votre Agent, votre fichier `sqlserver.yaml` contient peut-être des caractères non pris en charge par `adodbapi`.

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

Actuellement, seul le caractère `%` devrait causer cette erreur de connectivité. Si vous devez l'utiliser dans votre fichier `sqlserver.yaml` (par exemple, si votre mot de passe SQL Server Datadog comprend un `%`), vous devez l'échapper en ajoutant `%%` devant chaque occurrence de `%`.

## Diagnostiquer les problèmes courants du pilote SQL Server {#problemes-de-connexion-courants}

### Data source name not found, and no default driver specified {#data-source-name-not-found}

On trouve généralement cette erreur sous Linux avec le paramètre par défaut du pilote ODBC. Elle peut survenir lorsque le [DSN][10], défini pour votre pilote dans le fichier `/etc/odbcinst.ini`, ne correspond pas au nom du pilote défini dans la configuration de votre Agent.

Par exemple, si vous souhaitez utiliser le pilote ODBC par défaut pour l'Agent (`{ODBC Driver 18 for SQL Server}`), la configuration de votre instance doit contenir les éléments suivants :

```yaml
  connector: odbc
```

Lorsque l'Agent démarre et tente d'établir une connexion avec votre instance SQL Server, il recherche le fichier `/etc/odbcinst.ini` pour déterminer le chemin d'accès aux fichiers exécutables du pilote.

Par exemple, la configuration du pilote est contenue dans ce fichier `/etc/odbcinst.ini` :

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 18 for SQL Server]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

Dans l'exemple ci-dessus, le DSN est `[ODBC Driver 18 for SQL Server]`. Il correspond au nom du pilote par défaut utilisé par l'Agent. Si le DSN de votre pilote ne correspond pas à celui de l'Agent, le message d'erreur `Data source not found` s'affiche.

Vous pouvez définir le `dsn` dans la configuration de votre instance pour qu'il corresponde à ce qui est défini dans votre fichier `/etc/odbcinst.ini`. Par exemple :

    ```text
    $ cat /etc/odbcinst.ini
    [Custom]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

Dans la configuration de votre instance, vous devez ensuite définir le champ `dsn` come suit :

```yaml
  connector: odbc
  dsn: "Custom"
```

### Provider or driver not found {#provider-not-found}

Ce message d'erreur peut varier selon le pilote utilisé, mais en général, il ressemble à ce qui suit pour `ODBC` :

1. `Can't open lib .* file not found`
2. `Data source name not found.* and no default driver specified`

Pour les fournisseurs `MSOLEDBSQL`, le message d'erreur ressemble à ceci :

  ```text
  Provider cannot be found. It may not be properly installed.
  ```

Cela signifie que le pilote ou le fournisseur n'est pas correctement installé sur le host où l'Agent est exécuté. Assurez-vous de bien suivre toutes les instructions d'installation du pilote que vous avez choisi d'utiliser.

Dans certains cas, l'Agent ne parvient pas à trouver le pilote. Ce problème est très courant avec les pilotes ODBC sous Linux. Pour plus d'instructions sur l'installation du pilote ODBC sous Linux, consultez la section [Connexion à SQL Server sur un host Linux](#connexion-a-sql-server-sur-un-host-linux).

Pour vous aider à choisir votre pilote, consultez la section [Choisir un pilote SQL Server](#choisir-un-pilote-sql-server) pour savoir comment configurer correctement votre pilote avec l'Agent.

### Connexion à SQL Server sur un host Linux

Pour connecter SQL Server (hébergé sur Linux ou Windows) à un host Linux, procédez comme suit :

1. Installez le [pilote ODBC Microsoft][11] pour votre distribution Linux.
   Si vous ne savez pas quel pilote utiliser, son nom est indiqué entre crochets en haut du fichier `/etc/odbcinst.ini`.

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 13 for SQL Server]
    Description=Microsoft ODBC Driver 13 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```
2. Copiez les fichiers `odbc.ini` et `odbcinst.ini` dans le dossier `/opt/datadog-agent/embedded/etc`.
3. Si besoin, installez le module pyodbc en exécutant pip install pyodbc dans l'environnement Python de votre Agent. Exemple :

    ```shell
    $ sudo /opt/datadog-agent/embedded/bin/pip install pyodbc
    ```
3. Modifiez le fichier `conf.yaml` de votre serveur SQL de façon à utiliser le connecteur odbc et spécifiez le pilote approprié, qui est indiqué dans le fichier `odbcinst.ini`.

    ```yaml
    init_config:

    instances:
      - host: <HOST>,<PORT>
        # enable the odbc connector
        connector: odbc
        # enable the ODBC driver
        driver: ODBC Driver 13 for SQL Server
        username: <USERNAME>
        password: <PASSWORD>
    ```

### Choisir un pilote SQL Server {#choisir-un-pilote}

Pour que l'Agent se connecte à l'instance SQL Server, vous devez installer le pilote [Microsoft ODBC][12] ou [OLE DB][13].

La valeur à définir dans le champ [connector][14] de la configuration de votre instance dépend du pilote que vous avez choisi.

Par exemple, pour le [pilote Microsoft ODBC][12]  :

  ```yaml
  connector: odbc
  driver: '{ODBC Driver 18 for SQL Server}'
  ```

Pour le [pilote OLE DB][13] :

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL
  ```

Ces valeurs seront utilisées pour mapper la partie `Provider` de la chaîne de connexion.

Par exemple, si vous définissez `adoprovider: MSOLEDBSQL`, la chaîne de connexion inclura alors `Provider=MSOLEDBSQL`. Cette valeur doit correspondre au nom de la version du pilote que vous avez installée.

Dans la dernière version du [pilote Microsoft OLE DB][13], le pilote `MSOLEDBSQL` a été renommé `MSOLEDBSQL19`. La configuration de votre instance doit donc ressembler à ceci :

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL19
  ```

Nous vous recommandons de toujours mettre à jour le pilote que vous avez sélectionné.

## Autres problèmes récurrents

### Le tag user de SQL Server est manquant dans les métriques de requête et les plans d'exécution

Les métriques de requête et les plans d'exécution ne prennent plus en charge le tag `user`, car les requêtes en cours d'exécution de l'utilisateur ne peuvent pas être recueillies en raison de limites techniques dans SQL Server.

Le tag `user` est disponible pour les événements liés aux activités de requête et les métriques relatives à la charge des bases de données.

### Pourquoi les requêtes « CREATE PROCEDURE » sont-elles aussi nombreuses ?

Avant la version 7.40.0 de l'Agent, les statistiques `PROCEDURE` étaient surestimées en raison d'un bug. Par conséquent, l'interface Query Metrics de Database Monitoring affichait un vaste nombre de requêtes `CREATE PROCEDURE...`. Pour résoudre ce problème, installez la dernière version de l'Agent Datadog.

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
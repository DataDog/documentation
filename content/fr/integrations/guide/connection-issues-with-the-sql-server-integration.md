---
aliases:
- /fr/integrations/faq/connection-issues-with-the-sql-server-integration
kind: guide
title: Problèmes de connexion avec l'intégration SQL Server
---

## Problèmes de connexion à SQL Server courants

Vous pouvez configurer l'Agent Datadog de façon à recueillir des métriques à partir de SQL Server : il vous suffit de suivre les instructions du [carré de l'intégration SQL Server][1] sur votre compte. Cette intégration fournit différentes [métriques SQL Server][2] de base, mais il est également possible de récupérer d'[autres métriques pertinentes pour votre environnement][3].

Il arrive régulièrement que l'erreur de connexion suivante survienne lors la configuration de cette intégration. Cette erreur peut s'avérer particulièrement difficile à résoudre, car elle peut être causée par un grand nombre d'éléments. Voici à quoi ressemble cette erreur :

```text
'Unable to connect to SQL Server for instance 127.0.0.1,1433 - None. \n Traceback (most recent call last):\n File "C:\\Program Files (x86)\\Datadog\\Datadog Agent\\files\\..\\checks.d\\sqlserver.py", line 219, in get_cursor\n File "adodbapi\\adodbapi.pyc", line 116, in connect\nOperationalError: (com_error(-2147352567, \'Exception occurred.\', (0, u\'Microsoft OLE DB Provider for SQL Server\', u\'[DBNETLIB][ConnectionOpen (Connect()).]SQL Server does not exist or access denied.\', None, 0, -2147467259), None), \'Error opening connection to "Provider=SQLOLEDB;Data Source=127.0.0.1,1433;Initial Catalog=master;User ID=datadog;Password=******;"\')\n'
```

Elle indique que l'Agent n'est pas parvenu à se connecter à votre serveur SQL afin de réaliser la collecte de ses données. Cette erreur peut être causée par l'une des raisons suivantes :

* Le host, le port, le nom d'utilisateur ou le mot de passe indiqués dans le fichier `conf.yaml` de votre serveur SQL contient une erreur. Prenez bien soin de vérifier que ces éléments sont correctement orthographiés.
* Votre mot de passe contient un point-virgule (`;`). Placez des guillemets `""` autour du mot de passe pour résoudre ce problème : `password: "{<MOT_DE_PASSE>}"`.
* La connexion TCP/IP de votre serveur SQL n'a pas été activée.
* L'adresse IPv4 de votre serveur SQL n'est pas correcte ou ne correspond pas aux informations fournies dans le fichier `conf.yaml` de votre serveur SQL.
* Le port TCP/IP de votre serveur SQL n'est pas correct ou ne correspond pas aux informations fournies dans le fichier `conf.yaml` de votre serveur SQL.
* Le mode d'authentification de votre serveur SQL n'est pas défini sur la bonne option (« SQL Server and WIndows Authentication mode » ou « WIndows Authentication mode »).

Si vous ne savez pas comment configurer un serveur de façon à effectuer une écoute sur le bon port et la bonne adresse TCP/IP, consultez la page [Configurer un serveur pour l’écoute sur un port TCP spécifique][4] de la documentation Microsoft pour obtenir des instructions. Référez-vous aux sections IPv4 et IPALL afin d'y définir votre port sur Dynamic ou Static ; définissez uniquement l'option que vous utiliserez. Si l'Agent est installé sur le même host que votre serveur SQL, il est préférable de définir le paramètre host sur 127.0.0.1, même s'il ne s'agit pas d'un localhost de votre point de vue d'utilisateur. Pour les connexions à SQL Server, le port 1433 est généralement utilisé.

Si vous ne savez pas comment configurer le mode d'authentification de votre serveur SQL, consultez l'article [Choisir un mode d'authentification][5] de Microsoft.

**Remarque** : si vous modifiez votre serveur SQL comme indiqué ci-dessus, vous devez redémarrer le serveur pour appliquer vos modifications.

Voici un exemple de paramètres IP/TCP SQL Server appliqués à l'un des environnements de test Datadog (Windows 2012 R2, SQL Server 2014 Express) :
{{< img src="integrations/faq/sql_server_test_1.png" alt="La fenêtre des propriétés TCP/IP, avec l'onglet IP Addresses sélectionné. La section IP4 est configurée avec l'option Active définie sur Yes et l'option Enable définie sur No. L'adresse IP est définie sur 127.0.0.1 et les ports dynamiques TCP sont définis sur 1433. Aucun port TCP n'est défini." >}}

{{< img src="integrations/faq/sql_server_test_2.png" alt="La fenêtre des propriétés TCP/IP, avec l'onglet IP Addresses sélectionné. Dans la section IPAII, les ports dynamiques TCP sont définis sur 1433 et le port TCP n'est pas défini." >}}

## Chaîne de connexion vide

Le check SQL Server Datadog repose sur la bibliothèque Python adodbapi, qui limite le type de caractères utilisables dans une chaîne de connexion vers un serveur SQL. Si votre Agent ne parvient pas à se connecter à votre serveur SQL, et que vous recevez des erreurs semblables à celle qui suit dans les logs collector.logs de votre Agent, votre fichier `sqlserver.yaml` contient probablement des caractères non pris en charge par adodbapi.

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

Actuellement, seul le caractère `%` devrait causer cette erreur de connectivité. Si vous souhaitez l'utiliser dans votre fichier `sqlserver.yaml` (à savoir, si votre mot de passe SQL Server Datadog comprend un `%`), vous devez l'échapper en ajoutant `%%` devant chaque occurrence de `%`.

## Connexion à SQL Server sur un host Linux

Pour connecter SQL Server (hébergé sur Linux ou Windows) à un host Linux, procédez comme suit :

1. Installez le [pilote ODBC Microsoft][6] pour votre distribution Linux.
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


[1]: https://app.datadoghq.com/account/settings#integrations/sql_server
[2]: /fr/integrations/sqlserver/#metrics
[3]: /fr/integrations/guide/collect-more-metrics-from-the-sql-server-integration/
[4]: https://msdn.microsoft.com/en-us/library/ms177440.aspx
[5]: https://msdn.microsoft.com/en-us/library/ms144284.aspx
[6]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux/installing-the-microsoft-odbc-driver-for-sql-server-on-linux
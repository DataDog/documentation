---
app_id: oracle
app_uuid: 34835d2b-a812-4aac-8cc2-d298db851b80
assets:
  dashboards:
    oracle: assets/dashboards/oracle_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: oracle.session_count
      metadata_path: metadata.csv
      prefix: oracle.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Oracle Database
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data store
- autodiscovery
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oracle/README.md
display_on_public_website: true
draft: false
git_integration_title: oracle
integration_id: oracle
integration_title: Oracle
integration_version: 4.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: oracle
public_title: Oracle
short_description: Système de base de données relationnelle Oracle conçu pour les
  architectures grid computing d'entreprise
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Store
  - Category::Autodiscovery
  configuration: README.md#Setup
  description: Système de base de données relationnelle Oracle conçu pour les architectures
    grid computing d'entreprise
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle
---



![Dashboard Oracle][1]

## Présentation

Recueillez des métriques de serveurs d'Oracle Database en temps réel pour visualiser et surveiller leurs performances et leur disponibilité.

## Configuration

### Installation

#### Prérequis

Pour utiliser l'intégration Oracle, vous pouvez soit utiliser le client natif (aucune étape d'installation supplémentaire requise), soit télécharger le pilote JDBC d'Oracle (Linux uniquement). Pour utiliser l'intégration Oracle avec JDBC, téléchargez le pilote JDBC d'Oracle. Si vous n'utilisez pas la méthode JDBC, la [version minimale prise en charge][2] est Oracle 12c.
En raison des restrictions de licence, la bibliothèque JDBC n'est pas incluse dans l'Agent Datadog, mais elle peut être téléchargée directement sur le site d'Oracle.

Avec l'Agent v7.42.x, l'installation des bibliothèques Instant Client n'est plus requise ni prise en charge. Si vous utilisez une version plus ancienne de l'Agent et que vous voulez utiliser l'Instant Client, reportez-vous aux instructions d'installation d'[Oracle Instant Client][3].

*Remarque* : à partir de la v7.42.x, l'intégration Oracle ne prend plus en charge que Python 3.


##### Pilote JDBC

*REMARQUE* : cette méthode fonctionne uniquement pour Linux.

Pour JPype, l'une des bibliothèques utilisées par l'Agent lors de l'utilisation du pilote JDBC, Java 8 ou ultérieur doit être présent sur votre système.

Une fois l'installation terminée, suivez les étapes ci-dessous :

1. [Téléchargez le fichier JAR du pilote JDBC.][4]
2. Ajoutez le chemin vers le fichier téléchargé dans votre `$CLASSPATH` ou le fichier de configuration du check sous `jdbc_driver_path` (consultez le [fichier d'exemple oracle.yaml][5]).

#### Création d'un utilisateur Datadog

{{< tabs >}}
{{% tab "Déploiement autonome" %}}

Créez un utilisateur `datadog` en lecture seule avec un accès approprié à votre serveur Oracle Database. Connectez-vous à votre base de données Oracle avec un utilisateur bénéficiant des droits administrateur, comme `SYSDBA` ou `SYSOPER`, et exécutez ce qui suit :

```text
-- Activez le script Oracle.
ALTER SESSION SET "_ORACLE_SCRIPT"=true;

-- Créez l'utilisateur Datadog. Remplacez le placeholder du mot de passe par un mot de passe sécurisé.
CREATE USER datadog IDENTIFIED BY <MOTDEPASSE>;

-- Accordez les droits d'accès à l'utilisateur Datadog.
GRANT CONNECT TO datadog;
GRANT SELECT ON GV_$PROCESS TO datadog;
GRANT SELECT ON gv_$sysmetric TO datadog;
GRANT SELECT ON sys.dba_data_files TO datadog;
GRANT SELECT ON sys.dba_tablespaces TO datadog;
GRANT SELECT ON sys.dba_tablespace_usage_metrics TO datadog;
```

**Remarque** : si vous utilisez Oracle 11g, vous n'avez pas besoin d'exécuter la ligne suivante :

```text
ALTER SESSION SET "_ORACLE_SCRIPT"=true;
```

{{% /tab %}}
{{% tab "Déploiement avec plusieurs locataires" %}}

##### Oracle 12c ou 19c

Connectez-vous à la base de données root en tant qu'administrateur pour créer un utilisateur `datadog` et accorder les autorisations nécessaires :

```text
alter session set container = cdb$root;
CREATE USER c##datadog IDENTIFIED BY password CONTAINER=ALL;
GRANT CREATE SESSION TO c##datadog CONTAINER=ALL;
Grant select any dictionary to c##datadog container=all;
GRANT SELECT ON GV_$PROCESS TO c##datadog CONTAINER=ALL;
GRANT SELECT ON gv_$sysmetric TO c##datadog CONTAINER=ALL;
```

{{% /tab %}}
{{< /tabs >}}

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `oracle.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Mettez à jour les paramètres `server` et `port` pour définir les masters à surveiller. Consultez le [fichier d'exemple oracle.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
      ## @param server - string - required
      ## The IP address or hostname of the Oracle Database Server.
      #
      - server: localhost:1521

        ## @param service_name - string - required
        ## The Oracle Database service name. To view the services available on your server,
        ## run the following query: `SELECT value FROM v$parameter WHERE name='service_names'`
        #
        service_name: <SERVICE_NAME>

        ## @param username - string - required
        ## The username for the Datadog user account.
        #
        username: <USERNAME>

        ## @param password - string - required
        ## The password for the Datadog user account.
        #
        password: <PASSWORD>
   ```

2. [Redémarrez l'Agent][3].


#### Requêtes personnalisées uniquement

Pour ignorer les checks de métrique par défaut pour une instance et exécuter uniquement des requêtes personnalisées avec un utilisateur qui recueille les métriques existantes, insérez le tag `only_custom_queries` avec la valeur `true`. Les métriques de système, de processus et de tablespace ne seront alors pas exécutées par les instances configurées de l'intégration Oracle, et les requêtes personnalisées pourront être exécutées sans que l'utilisateur ne dispose des autorisations décrites dans la rubrique [Création d'un utilisateur Datadog](#creation-d-un-utilisateur-datadog). Si vous omettez ce paramètre de configuration, l'utilisateur que vous spécifiez devra disposer de ces autorisations sur les tables pour exécuter une requête personnalisée.

```yaml
init_config:

instances:
  ## @param server - chaîne - obligatoire
  ## L'adresse IP ou le hostname du serveur Oracle Database.
  #
  - server: localhost:1521

    ## @param service_name - chaîne - obligatoire
    ## Le nom du service Oracle Database. Pour afficher les services disponibles sur votre serveur,
    ## exécutez la requête suivante :
    ## `SELECT value FROM v$parameter WHERE name='service_names'`
    #
    service_name: "<NOM_SERVICE>"

    ## @param user - chaîne - obligatoire
    ## Le nom d'utilisateur du compte utilisateur.
    #
    user: <UTILISATEUR>

    ## @param password - chaîne - obligatoire
    ## Le mot de passe du compte utilisateur.
    #
    password: "<MOTDEPASSE>"

    ## @param only_custom_queries - chaîne - facultatif
    ## Définissez ce paramètre sur n'importe quelle valeur pour exécuter uniquement des
    ## requêtes personnalisées pour cette instance.
    #
    only_custom_queries: true
```

#### Connexion à Oracle via TCPS

1. Pour vous connecter à Oracle via TCPS (TCP avec SSL), supprimez la mise en commentaire de l'option de configuration `protocol` et sélectionnez `TCPS`. Modifiez l'option `server` en la définissant sur le serveur TCPS à surveiller.

    ```yaml
    init_config:

    instances:
      ## @param server - string - required
      ## The IP address or hostname of the Oracle Database Server.
      #
      - server: localhost:1522

        ## @param service_name - string - required
        ## The Oracle Database service name. To view the services available on your server,
        ## run the following query:
        ## `SELECT value FROM v$parameter WHERE name='service_names'`
        #
        service_name: "<SERVICE_NAME>"

        ## @param user - string - required
        ## The username for the user account.
        #
        user: <USER>

        ## @param password - string - required
        ## The password for the user account.
        #
        password: "<PASSWORD>"

        ## @param protocol - string - optional - default: TCP
        ## The protocol to connect to the Oracle Database Server. Valid protocols include TCP and TCPS.
        ##
        ## When connecting to Oracle Database via JDBC, `jdbc_truststore` and `jdbc_truststore_type` are required.
        ## More information can be found from Oracle Database's whitepaper:
        ##
        ## https://www.oracle.com/technetwork/topics/wp-oracle-jdbc-thin-ssl-130128.pdf
        #
        protocol: TCPS
    ```

2. Modifiez les options `sqlnet.ora`, `listener.ora` et `tnsnames.ora` de façon à autoriser les connexions TCPS sur votre instance Oracle Database.

##### Connexions TCPS via Oracle sans JDBC

Si vous n'utilisez pas la méthode JDBC, vérifiez que l'Agent Datadog parvient à se connecter à votre base de données. Utilisez l'outil de ligne de commande `sqlplus` en précisant les informations que vous avez indiquées dans vos options de configuration :

```shell
sqlplus <UTILISATEUR>/<MOTDEPASSE>@(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCPS)(HOST=<HOST>)(PORT=<PORT>))(SERVICE_NAME=<NOM_SERVICE>)))
```

##### Connexions TCPS via JDBC

Si vous vous connectez à Oracle Database à l'aide de JDBC, vous devez également spécifier les paramètres `jdbc_truststore_path` et `jdbc_truststore_type`, ainsi que le paramètre `jdbc_truststore_password` (facultatif) si le truststore possède un mot de passe.

**Remarque** : les truststores `SSO` ne nécessitent pas de mot de passe.

```yaml
    # Dans la section `instances:`
    ...

    ## @param jdbc_truststore_path - chaîne, facultatif
    ## Le chemin du fichier truststore JDBC.
    #
    jdbc_truststore_path: /chemin/vers/truststore

    ## @param jdbc_truststore_type - chaîne, facultatif
    ## Le type de fichier truststore JDBC. Valeurs autorisées : JKS, SSO et PKCS12.
    #
    jdbc_truststore_type: SSO

    ## @param jdbc_truststore_password - chaîne, facultatif
    ## Le mot de passe du truststore utilisé lors de la connexion via JDBC.
    #
    # jdbc_truststore_password: <MOTDEPASSE_TRUSTSTORE_JDBC>
```

Pour en savoir plus sur la connexion à Oracle Database via TCPS sur JDBC, consultez le [livre blanc officiel d'Oracle][4] (en anglais).

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://www.oracle.com/technetwork/topics/wp-oracle-jdbc-thin-ssl-130128.pdf
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `oracle`                                                                                                  |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                             |
| `<CONFIG_INSTANCE>`  | `{"server": "%%host%%:1521", "service_name":"<NOM_SERVICE>", "username":"datadog", "password":"<MOTDEPASSE>"}` |


[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `oracle` dans la section Checks.

## Requête personnalisée

L'utilisation de requêtes personnalisées est également prise en charge. Chaque requête doit comporter trois paramètres :

| Paramètre       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `metric_prefix` | Il s'agit du préfixe de chaque métrique.                                                                                                                                                                                                                                                                                                                                                                                                         |
| `query`         | Il s'agit du SQL à exécuter. Cela peut être une simple déclaration ou un script sur plusieurs lignes. Toutes les rangées du résultat sont évaluées.                                                                                                                                                                                                                                                                                                                        |
| `columns`       | Il s'agit d'une liste représentant toutes les colonnes, ordonnées séquentiellement de gauche à droite. Deux types d'informations sont obligatoires : <br> a. `type` : la méthode d'envoi (`gauge`, `count`, etc.). <br> b. nom : le suffixe à ajouter à `metric_prefix` afin de former un nom de métrique complet. Si `type` est défini sur `tag`, cette colonne est alors considérée comme un tag et sera appliquée à chaque métrique recueillie par cette requête spécifique. |

Utilisez le paramètre `tags` (facultatif) pour appliquer une liste de tags à chaque métrique recueillie.

Les métriques suivantes :

```python
self.gauge('oracle.custom_query.metric1', value, tags=['tester:oracle', 'tag1:value'])
self.count('oracle.custom_query.metric2', value, tags=['tester:oracle', 'tag1:value'])
```

représentent ce que deviendrait l'exemple de configuration suivant :

```yaml
- metric_prefix: oracle.custom_query
  query: | # Utilisez une barre verticale si votre script comporte plusieurs lignes.
    SELECT columns
    FROM tester.test_table
    WHERE conditions
  columns:
    # Utilisez ces caractères pour chaque colonne à ignorer :
    - {}
    - name: metric1
      type: gauge
    - name: tag1
      type: tag
    - name: metric2
      type: count
  tags:
    - tester:oracle
```

Consultez le [fichier d'exemple oracle.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

### Exemple

Créez une configuration de requête pour faciliter l'identification des verrouillages de base de données :

1. Pour inclure une requête personnalisée, modifiez `conf.d\oracle.d\conf.yaml`. Supprimez la mise en commentaire du bloc `custom_queries`, ajoutez les requêtes et colonnes nécessaires, puis redémarrez l'Agent.

```yaml
  init_config:
  instances:
      - server: localhost:1521
        service_name: orcl11g.us.oracle.com
        user: datadog
        password: xxxxxxx
        jdbc_driver_path: /u01/app/oracle/product/11.2/dbhome_1/jdbc/lib/ojdbc6.jar
        tags:
          - db:oracle
        custom_queries:
          - metric_prefix: oracle.custom_query.locks
            query: |
              select blocking_session, username, osuser, sid, serial# as serial, wait_class, seconds_in_wait
              from v_$session
              where blocking_session is not NULL order by blocking_session
            columns:
              - name: blocking_session
                type: gauge
              - name: username
                type: tag
              - name: osuser
                type: tag
              - name: sid
                type: tag
              - name: serial
                type: tag
              - name: wait_class
                type: tag
              - name: seconds_in_wait
                type: tag
```

2. Pour accéder à `v_$session`, accordez l'autorisation à `DATADOG` et testez les autorisations.

```text
SQL> grant select on sys.v_$session to datadog;

## connexion avec l'utilisateur DD pour valider l'accès :


SQL> show user
USER is "DATADOG"


## création d'un synonyme pour rendre la vue visible
SQL> create synonym datadog.v_$session for sys.v_$session;


Synonym created.


SQL> select blocking_session,username,osuser, sid, serial#, wait_class, seconds_in_wait from v_$session
where blocking_session is not NULL order by blocking_session;
```

3. Une fois la configuration terminée, vous pouvez créer un [monitor][7] basé sur les métriques `oracle.custom_query.locks`.

## Données collectées

### Métriques
{{< get-metrics-from-git "oracle" >}}


### Événements

Le check Oracle Database n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "oracle" >}}


## Dépannage

### Pilote JDBC (Linux uniquement)
- Si une erreur de type `JVMNotFoundException` survient :

    ```text
    JVMNotFoundException("No JVM shared library file ({jpype._jvmfinder.JVMNotFoundException: No JVM shared library file (libjvm.so) found. Try setting up the JAVA_HOME environment variable properly.})"
    ```

    - Assurez-vous que la variable d'environnement `JAVA_HOME` est définie et qu'elle pointe vers le bon répertoire.
    - Ajoutez la variable d'environnement requise à `/etc/environment` :
        ```text
        JAVA_HOME=/path/to/java
        ```
    - Redémarrez ensuite l'Agent.

- Si l'erreur `Unsupported major.minor version 52.0` s'affiche, cela signifie que vous exécutez une version de Java qui n'est pas
assez récente. Vous devez mettre à niveau Java sur votre système ou installer une nouvelle version et pointer votre variable
`JAVA_HOME` vers la nouvelle installation, tel qu'expliqué ci-dessus.

- Vérifiez que vos variables d'environnement sont définies correctement en exécutant la commande suivante depuis l'Agent.
Assurez-vous que les résultats affichés correspondent à la bonne valeur.

    ```shell script
      sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/python -c "import os; print(\"JAVA_HOME:{}\".format(os.environ.get(\"JAVA_HOME\")))"
    ```

Besoin d'aide ? Contactez [l'assistance Datadog][8].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/oracle/images/oracle_dashboard.png
[2]: https://oracle.github.io/python-oracledb/
[3]: https://github.com/DataDog/integrations-core/tree/7.41.x/oracle#oracle-instant-client
[4]: https://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html
[5]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/monitors/monitor_types/metric/?tab=threshold
[8]: https://docs.datadoghq.com/fr/help/
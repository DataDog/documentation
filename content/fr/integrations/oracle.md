---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    oracle: assets/dashboards/oracle_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/oracle/README.md'
display_name: "Oracle\_Database"
draft: false
git_integration_title: oracle
guid: 6c4ddc46-2763-4c56-8b71-c838b7f82d7b
integration_id: oracle
integration_title: Oracle
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: oracle.
metric_to_check: oracle.session_count
name: Oracle
public_title: Intégration Datadog/Oracle
short_description: Système de base de données relationnelle Oracle conçu pour les architectures grid computing d'entreprise
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard Oracle][1]

## Présentation

Recueillez des métriques de serveurs d'Oracle Database en temps réel pour visualiser et surveiller leurs performances et leur disponibilité.

## Configuration

### Installation

#### Prérequis

Pour utiliser l'intégration Oracle, installez les bibliothèques Oracle Instant Client ou téléchargez le pilote JDBC d'Oracle. En raison des restrictions de licence, ces bibliothèques ne sont pas intégrées à l'Agent Datadog, mais peuvent être téléchargées directement sur le site d'Oracle.

##### Oracle Instant Client

Le check Oracle nécessite un accès au module Python `cx_Oracle` ou au pilote JDBC d'Oracle :

1. Accédez à la [page de téléchargement][2] et installez les packages SDK et Basic d'Instant Client.

    Si vous utilisez Linux, une fois les bibliothèques Instant Client installées, vérifiez que l'éditeur de liens du runtime parvient à trouver les bibliothèques. Par exemple, avec `ldconfig` :

   ```shell
   # Put the library location in an ld configuration file.

   sudo sh -c "echo /usr/lib/oracle/12.2/client64/lib > \
       /etc/ld.so.conf.d/oracle-instantclient.conf"

   # Update the bindings.

   sudo ldconfig
   ```

2. Décompressez ces bibliothèques dans un répertoire donné auquel tous les utilisateurs ont accès sur la machine concernée (par ex., `/opt/oracle`) :

   ```shell
   mkdir -p /opt/oracle/ && cd /opt/oracle/
   unzip /opt/oracle/instantclient-basic-linux.x64-12.1.0.2.0.zip
   unzip /opt/oracle/instantclient-sdk-linux.x64-12.1.0.2.0.zip
   ```

##### Pilote JDBC

Pour JPype, l'une des bibliothèques utilisées par l'Agent lors de l'utilisation du pilote JDBC, les runtimes suivants doivent être présents sur votre système :

- Java 8 ou version ultérieure 
- [Microsoft Visual C++ Runtime 2015][3] sous Windows

Une fois ces runtimes installés, suivez les étapes ci-dessous :

1. [Téléchargez le fichier jar du pilote JDBC][4].
2. Ajoutez le chemin vers le fichier téléchargé dans votre `$CLASSPATH` ou le fichier de configuration du check sous `jdbc_driver_path` (consultez le [fichier d'exemple oracle.yaml][5]).

#### Création d'un utilisateur Datadog

{{< tabs >}}
{{% tab "Standalone" %}}

Créez un utilisateur `datadog` en lecture seule avec un accès approprié à votre serveur Oracle Database. Connectez-vous à votre base de données Oracle avec un utilisateur bénéficiant des droits administrateur (par ex., `SYSDBA` ou `SYSOPER`) et exécutez ce qui suit :

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
{{% tab "Multitenant" %}}

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
       ## run the following query:
       ## `SELECT value FROM v$parameter WHERE name='service_names'`
       #
       service_name: "<SERVICE_NAME>"

       ## @param user - string - required
       ## The username for the user account.
       #
       user: datadog

       ## @param password - string - required
       ## The password for the user account.
       #
       password: "<PASSWORD>"
   ```

2. [Redémarrez l'Agent][3].

#### Requêtes personnalisées uniquement

Pour ignorer les checks de métrique par défaut pour une instance et exécuter uniquement des requêtes personnalisées avec un utilisateur qui recueille les métriques existantes, insérez le tag `only_custom_queries` avec la valeur true. Les métriques de système, de processus et de tablespace ne seront alors pas exécutées par les instances configurées de l'intégration Oracle, et les requêtes personnalisées pourront être exécutées sans que l'utilisateur ne dispose des autorisations décrites dans la section [Création d'un utilisateur Datadog](#creation-d-un-utilisateur-datadog). Si vous omettez ce paramètre de configuration, l'utilisateur que vous spécifiez devra disposer de ces autorisations sur les tables pour exécuter une requête personnalisée.

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

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `oracle`                                                                                                  |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                             |
| `<CONFIG_INSTANCE>`  | `{"server": "%%host%%:1521", "service_name":"<NOM_SERVICE>", "user":"datadog", "password":"<MOT_DE_PASSE>"}` |

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
| `columns`       | Il s'agit d'une liste représentant toutes les colonnes, ordonnées séquentiellement de gauche à droite. Deux types d'informations sont obligatoires : <br> a. `type` : la méthode d'envoi (`gauge`, `count`, etc.). <br> b. nom : le suffixe à ajouter à `metric_prefix` afin de former un nom de métrique complet. Si `type` est `tag`, cette colonne est alors considérée comme un tag et sera appliquée à chaque métrique recueillie par cette requête spécifique. |

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

1. Pour inclure une requête personnalisée, modifiez `conf.d\oracle.d\conf.yaml`. Supprimez la mise en commentaire du bloc `custom_queries` ajoutez les requêtes et colonnes nécessaires, puis redémarrez l'Agent.

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

**oracle.can_connect** :<br>
Permet de vérifier que la base de données est disponible et accepte les connexions.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/oracle/images/oracle_dashboard.png
[2]: https://www.oracle.com/technetwork/database/features/instant-client/index.htm
[3]: https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads
[4]: https://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html
[5]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/monitors/monitor_types/metric/?tab=threshold
[8]: https://docs.datadoghq.com/fr/help/
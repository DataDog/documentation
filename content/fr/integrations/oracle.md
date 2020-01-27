---
assets:
  dashboards:
    oracle: assets/dashboards/oracle_overview.json
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

## Implémentation
### Installation

#### Prérequis
Pour utiliser l'intégration Oracle, installez les bibliothèques Oracle Instant Client ou téléchargez le pilote JDBC d'Oracle. En raison des restrictions de licence, ces bibliothèques ne sont pas intégrées à l'Agent Datadog, mais peuvent être téléchargées directement sur le site d'Oracle.

##### Pilote JDBC

- [Téléchargez le fichier jar du pilote JDBC][2].
- Ajoutez le chemin vers le fichier téléchargé dans votre `$CLASSPATH` ou le fichier de configuration du check sous `jdbc_driver_path` (consultez le [fichier d'exemple oracle.yaml][3]).

##### Oracle Instant Client

Le check Oracle nécessite un accès au module Python `cx_Oracle` ou au pilote JDBC d'Oracle :

1. Accédez à la [page de téléchargement][4] et installez les paquets SDK et Basic d'Instant Client.

    Si vous utilisez Linux, une fois les bibliothèques Instant Client installées, vérifiez que l'éditeur de liens à l'exécution peut trouver les bibliothèques. Par exemple, avec `ldconfig` :

    ```
    # Put the library location in an ld configuration file.

    sudo sh -c "echo /usr/lib/oracle/12.2/client64/lib > \
        /etc/ld.so.conf.d/oracle-instantclient.conf"

    # Update the bindings.

    sudo ldconfig
    ```

2. Décompressez ces bibliothèques dans un répertoire donné auquel tous les utilisateurs ont accès sur la machine concernée (par ex., `/opt/oracle`) :

    ```
    mkdir -p /opt/oracle/ && cd /opt/oracle/
    unzip /opt/oracle/instantclient-basic-linux.x64-12.1.0.2.0.zip
    unzip /opt/oracle/instantclient-sdk-linux.x64-12.1.0.2.0.zip
    ```

3. Mettez à jour votre `LD_LIBRARY_PATH` pour inclure l'emplacement des bibliothèques Instant Client lorsque vous démarrez/redémarrez l'Agent :

    ```
    export LD_LIBRARY_PATH=/opt/oracle/instantclient/lib:$LD_LIBRARY_PATH
    ```

**Remarque** : l'Agent 6 utilise Upstart ou systemd pour orchestrer le service `datadog-agent`. Il est possible que des variables d'environnement doivent être ajoutées aux fichiers de configuration du service aux emplacements par défaut de `/etc/init/datadog-agent.conf` (Upstart) ou `/lib/systemd/system/datadog-agent.service` (systemd). Consultez la documentation sur [Upstart][5] ou [systemd][6] pour en savoir plus sur la configuration de ces paramètres.

Voici un exemple d'ajout de `LD_LIBRARY_PATH` aux fichiers de configuration du service de l'Agent Datadog (`/int/init/datadog-agent.conf`) sur un système par le biais d'Upstart.

```conf
description "Datadog Agent"

start on started networking
stop on runlevel [!2345]

respawn
respawn limit 10 5
normal exit 0

# La collecte de logs vers la console depuis l'Agent est désactivée, car elle est déjà assurée par l'Agent à l'aide du fichier ou
# de syslog en fonction de sa configuration. On demande à Upstart de loguer ce que le processus génère
# pour enregistrer les alertes/incidents dans le log de la console
/var/log/upstart/datadog-agent.log
env DD_LOG_TO_CONSOLE=false
env LD_LIBRARY_PATH=/usr/lib/oracle/11.2/client64/lib/

setuid dd-agent

script
  exec /opt/datadog-agent/bin/agent/agent start -p /opt/datadog-agent/run/agent.pid
end script

post-stop script
  rm -f /opt/datadog-agent/run/agent.pid
end script
```

#### Création d'un utilisateur Datadog

Créez un utilisateur `datadog` en lecture seule avec un accès approprié à votre serveur Oracle Database. Connectez-vous à votre base de données Oracle avec un utilisateur bénéficiant des droits administrateur (par ex., `SYSDBA` ou `SYSOPER`) et exécutez ce qui suit :

```
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

```
ALTER SESSION SET "_ORACLE_SCRIPT"=true;
```

### Configuration
#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

1. Modifiez le fichier `oracle.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7]. Mettez à jour les paramètres `server` et `port` pour définir les masters à surveiller. Consultez le [fichier d'exemple oracle.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

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

2. [Redémarrez l'Agent][8].

#### Environnement conteneurisé

Pour les environnements conteneurisés, consultez la documentation relative aux [modèles d'intégration Autodiscovery][9] pour découvrir comment appliquer les paramètres ci-dessous.

| Paramètre            | Valeur                                                                                                     |
|----------------------|-----------------------------------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `oracle`                                                                                                  |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                             |
| `<CONFIG_INSTANCE>`  | `{"server": "%%host%%:1521", "service_name":"<NOM_SERVICE>", "user":"datadog", "password":"<MOT_DE_PASSE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `oracle` dans la section Checks.

## Requête personnalisée

L'utilisation de requêtes personnalisées est également prise en charge. Chaque requête doit comporter trois paramètres :

| Paramètre       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
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
  query: |  # Utilisez une barre verticale si votre script comporte plusieurs lignes.
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

Consultez le [fichier d'exemple oracle.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

## Données collectées

### Métriques
{{< get-metrics-from-git "oracle" >}}


### Événements
Le check Oracle Database n'inclut aucun événement.

### Checks de service
**oracle.can_connect**
Permet de vérifier que la base de données est disponible et accepte les connexions.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/oracle/images/oracle_dashboard.png
[2]: https://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html
[3]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[4]: https://www.oracle.com/technetwork/database/features/instant-client/index.htm
[5]: http://upstart.ubuntu.com/cookbook/#environment-variables
[6]: https://www.freedesktop.org/software/systemd/man/systemd.service.html#Command%20lines
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations/
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/oracle/metadata.csv
[12]: https://docs.datadoghq.com/fr/help



---
aliases:
- /fr/integrations/zookeeper
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    zookeeper: assets/dashboards/zookeeper_dashboard.json
  logs:
    source: zookeeper
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    zookeeper_processes: assets/saved_views/zookeeper_processes.json
  service_checks: assets/service_checks.json
categories:
- orchestration
- notification
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/zk/README.md
display_name: ZooKeeper
draft: false
git_integration_title: zk
guid: 5519c110-5183-438e-85ad-63678c072ac7
integration_id: zookeeper
integration_title: ZooKeeper
integration_version: 4.2.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: zookeeper.
metric_to_check: zookeeper.connections
name: zk
process_signatures:
- zkServer.sh start
- java zoo.cfg
public_title: Intégration Datadog/ZooKeeper
short_description: Surveillez les connexions client et les latences et soyez informé
  des échecs de traitement des requêtes.
support: core
supported_os:
- linux
- mac_os
---



![Dashboard ZooKeeper][1]

## Présentation

Le check ZooKeeper vérifie les connexions client et les latences, surveille le nombre de requêtes non traitées et bien plus encore.

## Configuration

### Installation

Le check ZooKeeper est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs ZooKeeper.

### Configuration

#### Liste d'inclusion

Depuis la version 3.5, ZooKeeper comprend le paramètre `4lw.commands.whitelist`. Consultez la section sur les [options de cluster ZooKeeper][3]) pour découvrir un exemple permettant d'ajouter des [commandes à 4 lettres][4]. Par défaut, seule la commande `srvr` est ajoutée à la liste blanche. Ajoutez `stat` et `mntr` à la liste blanche, car le processus d'intégration repose sur ces commandes.

#### Activation de l'authentification SSL

La version 3.5 de ZooKeeper prend en charge l'authentification SSL. Pour découvrir comment configurer l'authentification SSL avec ZooKeeper, consultez le [guide ZooKeeper à ce sujet][5] (en anglais).

Après avoir configuré l'authentification SSL pour ZooKeeper, vous pouvez égalemet configuré l'Agent Datadog afin de le connecter à ZooKeeper via SSL. Si vous avez déjà configuré l'authentification à l'aide de fichiers JKS, suivez les étapes ci-dessous pour les convertir en fichiers PEM afin de procéder à la configuration TLS/SSL.

Les exemples de commandes suivants supposent que vos fichiers `truststore` et `keystore` JKS portent les noms suivants :

- `server_truststore.jks`
- `server_keystore.jks` 
- `client_truststore.jks`
- `client_keystore.jks`

Nous partons également du principe que les fichiers `keystore` et `truststore` côté client et serveur disposent chacun des certificats réciproques, avec les alias `server_cert` et `client_cert`. Ainsi, le client ZooKeeper Java peut d'ores et déjà se connecter à un serveur ZooKeeper.
Si votre clé privée est protégée par un mot de passe, assurez-vous d'indiquer le mot de passe pour l'option de configuration `tls_private_key_password` du fichier `config.yaml`.

Pour convertir des fichiers JKS en fichiers PEM :

1. Récupérez le fichier `ca_cert.pem` à partir du fichier `client_truststore.jks`, puisque le `truststore` du client contient le certificat du serveur fiable :
    ```
    keytool -exportcert -file ca_cert.pem -keystore client_truststore.jks -alias server_cert -rfc
    ```

2. Récupérez le fichier `cert.pem` à partir du fichier `client_keystore.jks`, puisque le `keystore` du client contient le certificat du client pour l'alias `client_cert` :
    ```
    keytool -importkeystore -srckeystore client_keystore.jks -destkeystore cert.p12 -srcstoretype jks -deststoretype pkcs12 -srcalias client_cert
    ```   

3. Exécutez la commande `openssl pkcs12`, afin d'exporter le certificat client et la clé privée du certificat. L'option `tls_cert` peut lire et parser le fichier PEM, qui contient à la fois le certificat et la clé privée. Si vous souhaitez obtenir un fichier qui n'est pas protégé par un mot de passe, ajoutez `-nodes` à la commande :
   ```
   openssl pkcs12 -in cert.p12 -out cert.pem
   ``` 

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `zk.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) ZooKeeper.
   Consultez le [fichier d'exemple zk.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

#### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. ZooKeeper utilise le logger `log4j` par défaut. Pour activer la journalisation dans un fichier et personnaliser le format, modifiez le fichier `log4j.properties` :

   ```text
     # Set root logger level to INFO and its only appender to R
     log4j.rootLogger=INFO, R
     log4j.appender.R.File=/var/log/zookeeper.log
     log4j.appender.R.layout=org.apache.log4j.PatternLayout
     log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n
   ```

2. Par défaut, le pipeline d'intégration de Datadog prend en charge les expressions de conversion suivantes :

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
     %r [%t] %p %c %x - %m%n
   ```

    Vérifiez d'avoir bien dupliqué et modifié le pipeline d'intégration si vous utilisez un autre format.

3. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

4. Supprimez la mise en commentaire du bloc de configuration suivant en bas de votre fichier `zk.d/conf.yaml`, puis modifiez-le :

   ```yaml
   logs:
     - type: file
       path: /var/log/zookeeper.log
       source: zookeeper
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    name: log_start_with_date
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple zk.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

5. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/zk/datadog_checks/zk/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                  |
| -------------------- | -------------------------------------- |
| `<NOM_INTÉGRATION>` | `zk`                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                          |
| `<CONFIG_INSTANCE>`  | `{"host": "%%host%%", "port": "2181"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                           |
| -------------- | ----------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "zookeeper", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `zk` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "zk" >}}


#### Métriques obsolètes

Bien qu'elles soient toujours envoyées, les métriques suivantes seront prochainement supprimées :

- `zookeeper.bytes_received`
- `zookeeper.bytes_sent`

### Événements

Le check ZooKeeper n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "zk" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/zk/images/zk_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_clusterOptions
[4]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_4lw
[5]: https://cwiki.apache.org/confluence/display/ZOOKEEPER/ZooKeeper+SSL+User+Guide
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/help/
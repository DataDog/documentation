---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: cacti
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cacti/README.md'
display_name: Cacti
draft: false
git_integration_title: cacti
guid: 566466b0-1422-44ef-b14f-493a64e7b58a
integration_id: cacti
integration_title: Cacti
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cacti.
metric_to_check: cacti.rrd.count
name: cacti
public_title: Intégration Datadog/Cacti
short_description: Transmettez vos données RRD Cacti à Datadog pour recevoir des alertes détaillées et créer de superbes graphiques.
support: core
supported_os:
  - linux
---
## Présentation

Recueillez des métriques de Cacti en temps réel pour :

- Visualiser et surveiller les états de Cacti
- Être informé des failovers et des événements de Cacti

## Configuration

### Installation

Le check Cacti est inclus avec le package de l'[Agent Datadog][1]. Pour commencer à rassembler des métriques, vous devez d'abord :

1. Installer les bibliothèques et en-têtes `librrd`
2. Installer les liaisons python vers `rrdtool`

#### Bibliothèques et en-têtes librrd

Sur Debian/Ubuntu :

```shell
sudo apt-get install librrd-dev
```

Sur RHEL/CentOS :

```shell
sudo yum install rrdtool-devel
```

#### Liaisons Python

Ajoutez maintenant le paquet Python `rrdtool` dans l'Agent avec la commande suivante :

```shell
sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install rrdtool
```

### Configuration

#### Créer un utilisateur Datadog

1. Créez un utilisateur Datadog avec un accès en lecture seule à la base de données Cacti.

   ```shell
   sudo mysql -e "create user 'datadog'@'localhost' identified by '<MYSQL_PASSWORD>';"
   sudo mysql -e "grant select on cacti.* to 'datadog'@'localhost';"
   ```

2. Vérifiez l'utilisateur et ses droits :

   ```shell
   mysql -u datadog --password=<MYSQL_PASSWORD> -e "show status" | \
   grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
   echo -e "\033[0;31mCannot connect to MySQL\033[0m"

   mysql -u datadog --password=<MYSQL_PASSWORD> -D cacti -e "select * from data_template_data limit 1" && \
   echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
   echo -e "\033[0;31mMissing SELECT grant\033[0m"
   ```

3. Accordez à l'utilisateur `datadog-agent` un accès aux fichiers RRD :

   ```shell
   sudo gpasswd -a dd-agent www-data
   sudo chmod -R g+rx /var/lib/cacti/rra/
   sudo su - datadog-agent -c 'if [ -r /var/lib/cacti/rra/ ];
   then echo -e "\033[0;31mdatadog-agent can read the RRD files\033[0m";
   else echo -e "\033[0;31mdatadog-agent can not read the RRD files\033[0m";
   fi'
   ```

#### Configurer l'Agent

1. Configurez l'Agent de façon à ce qu'il se connecte à MySQL et modifiez le fichier `cacti.d/conf.yaml`. Consultez le [fichier d'exemple cacti.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param mysql_host - string - required
     ## url of your MySQL database
     #
     - mysql_host: "localhost"

       ## @param mysql_port - integer - optional - default: 3306
       ## port of your MySQL database
       #
       # mysql_port: 3306

       ## @param mysql_user - string - required
       ## User to use to connect to MySQL in order to gather metrics
       #
       mysql_user: "datadog"

       ## @param mysql_password - string - required
       ## Password to use to connect to MySQL in order to gather metrics
       #
       mysql_password: "<MYSQL_PASSWORD>"

       ## @param rrd_path - string - required
       ## The Cacti checks requires access to the Cacti DB in MySQL and to the RRD
       ## files that contain the metrics tracked in Cacti.
       ## In almost all cases, you'll only need one instance pointing to the Cacti
       ## database.
       ## The `rrd_path` will probably be `/var/lib/cacti/rra` on Ubuntu
       ## or `/var/www/html/cacti/rra` on any other machines.
       #
       rrd_path: "<CACTI_RRA_PATH>"
   ```

2. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `cacti` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "cacti" >}}


### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `cacti.d/conf.yaml` pour commencer à recueillir vos logs Cacti :

    ```yaml
    logs:
      - type: file
        path: /opt/cacti/log/cacti.log
        source: cacti
    ```

    Modifiez la valeur du paramètre `path` en fonction de votre environnement. Consultez le [fichier d'exemple cacti.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

### Événements

Le check Cacti n'inclut aucun événement.

### Checks de service

Le check Cacti n'inclut aucun check de service.

## Dépannage

### Problèmes connus

La bibliothèque Python utilisée par cette intégration provoque des fuites de mémoire dans certaines circonstances. Si vous rencontrez ce problème, vous pouvez installer le paquet [python-rrdtool][6] au lieu de rrdtool. Cet ancien paquet n'est plus mis à jour et n'est pas officiellement pris en charge par cette intégration, mais il a permis à d'autres utilisateurs de résoudre ce problème de mémoire.

Un [ticket Github][7] a été ouvert afin de suivre cette fuite de mémoire.

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/cacti/datadog_checks/cacti/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/cacti/metadata.csv
[6]: https://github.com/pbanaszkiewicz/python-rrdtool
[7]: https://github.com/commx/python-rrdtool/issues/25
[8]: https://docs.datadoghq.com/fr/help/
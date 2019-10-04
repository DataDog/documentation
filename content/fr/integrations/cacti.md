---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cacti/README.md'
display_name: Cacti
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
short_description: Transmettez vos données RRD Cacti à Datadog pour recevoir des alertes détaillées et créer de superbes graphiques. graphing.
support: core
supported_os:
  - linux
---
## Présentation

Recueillez des métriques du service Cacti en temps réel pour :

* Visualiser et surveiller les états de Cacti
* Être informé des failovers et des événements de Cacti

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Cacti est inclus avec le paquet de l'[Agent Datadog][2]. Pour commencer à rassembler des métriques vous devez d'abord :
- Installer les bibliothèques et en-têtes librrd
- Installer les liaisons Python vers rrdtool

#### Bibliothèques et en-têtes librrd

Sur Debian/Ubuntu
```shell
sudo apt-get install librrd-dev
```

Sur RHEL/CentOS
```shell
sudo yum install rrdtool-devel
```

#### Liaisons Python

Ajoutez ensuite le paquet Python `rrdtool` dans l'Agent avec la commande suivante.
```shell
sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install rrdtool
```

### Configuration

Créez un utilisateur Datadog avec un accès en lecture seule à la base de données Cacti.

```shell
sudo mysql -e "create user 'datadog'@'localhost' identified by '<motdepasse>';"
sudo mysql -e "grant select on cacti.* to 'datadog'@'localhost';"
```

Vérifiez l'utilisateur et ses droits.

```shell
mysql -u datadog --password=<motdepasse> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mImpossible de se connecter à MySQL\033[0m"

mysql -u datadog --password=<motdepasse> -D cacti -e "select * from data_template_data limit 1" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing SELECT grant\033[0m"
```

Configurez l'Agent de façon à ce qu'il se connecte à MySQL et modifiez le fichier `cacti.d/conf.yaml`. Consultez le [fichier d'exemple cacti.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

```yaml
init_config:

instances:
    -   mysql_host: localhost
        mysql_user: datadog
        mysql_password: hx3beOpMFcvxn9gXcs0MU3jX
        rrd_path: /chemin/vers/rra/cacti
        #field_names:
        #    - ifName
        #    - dskDevice
        #    - ifIndex
        #rrd_whitelist: /chemin/vers/whitelist_rrd.txt
```

Accordez à l'utilisateur datadog-agent un accès aux fichiers RRD.

```shell
sudo gpasswd -a dd-agent www-data
sudo chmod -R g+rx /var/lib/cacti/rra/
sudo su - datadog-agent -c 'if [ -r /var/lib/cacti/rra/ ];
then echo -e "\033[0;31mdatadog-agent peut lire les fichiers RRD\033[0m";
else echo -e "\033[0;31mdatadog-agent ne peut pas lire les fichiers RRD\033[0m";
fi'
```

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `cacti` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "cacti" >}}


### Événements
Le check Cacti n'inclut aucun événement.

### Checks de service
Le check Cacti n'inclut aucun check de service.

## Dépannage
### Problèmes connus
La bibliothèque Python utilisée par cette intégration provoque des fuites de mémoire dans certaines circonstances. Si vous rencontrez ce problème, vous pouvez installer le paquet [python-rrdtool][6] au lieu de rrdtool. Cet ancien paquet n'est plus mis à jour et n'est pas officiellement pris en charge par cette intégration, mais il a permis à d'autres utilisateurs de résoudre ce problème de mémoire.

Un [ticket Github][7] a été ouvert afin de suivre cette fuite de mémoire.

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/cacti/datadog_checks/cacti/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/cacti/metadata.csv
[6]: https://github.com/pbanaszkiewicz/python-rrdtool
[7]: https://github.com/commx/python-rrdtool/issues/25
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
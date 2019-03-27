---
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
short_description: Transmettez vos bases de données RRD à Datadog pour recevoir des alertes détaillées et créer de magnifiques graphiques. graphing.
support: core
supported_os:
  - linux
---
## Présentation

Recueillez des métriques du service cacti en temps réel pour :

* Visualiser et surveiller les états de cacti
* Être informé des failovers et des événements cacti

## Implémentation
### Installation

Le check Cacti est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs Cacti.

### Configuration

Créez un utilisateur Datadog avec des droits de lecture seule pour la base de données Cacti.

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

Configurez l'Agent de façon à ce qu'il se connecte à MySQL et modifiez le fichier `cacti.d/conf.yaml`. Consultez le [fichier d'exemple cacti.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

```yaml
init_config:

instances:
    -   mysql_host: localhost
        mysql_user: datadog
        mysql_password: hx3beOpMFcvxn9gXcs0MU3jX
        rrd_path: /path/to/cacti/rra
        #field_names:
        #    - ifName
        #    - dskDevice
        #    - ifIndex
        #rrd_whitelist: /path/to/rrd_whitelist.txt
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

[Lancez la sous-commande `status` de l'Agent][3] et cherchez `cacti` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "cacti" >}}


### Événements
Le check Cacti n'inclut aucun événement.

### Checks de service
Le check Cacti n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/cacti/datadog_checks/cacti/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/cacti/metadata.csv
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}
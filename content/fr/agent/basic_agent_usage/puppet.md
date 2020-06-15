---
dependencies:
- "https://github.com/DataDog/puppet-datadog-agent/blob/master/README.md"
kind: documentation
title: Puppet
---


Ce module installe l'Agent Datadog et envoie les rapports Puppet à Datadog.

## Configuration

### Prérequis

Le module Puppet Datadog est pris en charge sur Linux et Windows et est compatible avec la version 4.6 ou une version ultérieure de Puppet, ou avec la version 2016.4 ou une version ultérieure de Puppet Enterprise. Pour obtenir des informations détaillées sur la compatibilité, consultez la [page du module sur Puppet Forge][1] (en anglais).

### Installation

Installez le module Puppet [agent_datadog][1] dans le chemin du module de votre master Puppet :

```shell
puppet module install datadog-datadog_agent
```

**Remarque** : pour les versions de CentOS/RHEL antérieures à 7.0 et les versions d'Ubuntu antérieures à 15.04, indiquez le prestataire de services `upstart` :

```conf
class{ 'datadog_agent':
    service_provider => 'upstart'
  }
```

#### Mise à niveau

- Par défaut, la version 7.x de l'Agent Datadog est installée. Pour utiliser une version antérieure de l'Agent, modifiez le paramètre `agent_major_version`.
- Le paramètre `agent5_enable` n'est plus utilisé. Il a été remplacé par `agent_major_version`.
- Le paramètre `agent6_extra_options` a été renommé `agent_extra_options`, car il concerne désormais les versions 6 et 7 de l'Agent.
- Le paramètre `agent6_log_file` a été renommé `agent_log_file`, car il concerne désormais les versions 6 et 7 de l'Agent.
- Les paramètres `agent5_repo_uri` et `agent6_repo_uri` ont été remplacés par le paramètre `agent_repo_uri` pour toutes les versions de l'Agent.
- Les paramètres `conf_dir` et `conf6_dir` ont été remplacés par le paramètre `conf_dir` pour toutes les versions de l'Agent.
- Le nom du fichier de répertoire créé sur Linux, qui était auparavant `datadog5` ou `datadog6`, est désormais `datadog`.

### Configuration

Une fois le module `datadog_agent` installé sur votre `puppetserver` ou `puppetmaster` (ou sur un host sans master), suivez les étapes de configuration ci-dessous :

1. Obtenez votre [clé d'API Datadog][2].
2. Indiquez le module pour installer l'Agent Datadog sur vos nœuds.

   ```conf
   include datadog_agent
   ```

    Vous pouvez également assigner ce module à l'aide de la classe paramétrable de style Puppet :

   ```conf
   class { 'datadog_agent':
       api_key => "<YOUR_DD_API_KEY>",
   }
   ```

3. Sur votre `puppetserver`, activez l'envoi de données :

   ```conf
   class { 'datadog_agent':
       api_key            => "<YOUR_DD_API_KEY>",
       puppet_run_reports => true,
   }
   ```

    - Pour envoyer des données, le gem [dogapi][3] doit être installé sur votre master Puppet. Pour ce faire, exécutez l'Agent Puppet sur votre master avec cette configuration. Vous pouvez également effectuer une installation manuelle avec `gem`. Vous devrez peut-être redémarrer votre service `puppetserver` après avoir installé le gem `dogapi`.
    - Le paramètre `puppetserver_gem` est défini comme une dépendance de module. Il est installé automatiquement en même temps que le module.

4. (Facultatif) Ajoutez les intégrations à utiliser avec l'Agent, par exemple :

   ```conf
   include 'datadog_agent::integrations::mongo'
   ```

    Si une intégration ne dispose pas d'un [manifeste avec une classe dédiée][6], vous pouvez toujours ajouter une configuration pour celle-ci. Voici un exemple pour le check `ntp` :

   ```conf
   class { 'datadog_agent':
       api_key      => "<YOUR_DD_API_KEY>",
       integrations => {
           "ntp" => {
               init_config => {},
               instances => [{
                   offset_threshold => 30,
               }],
           },
       },
   }
   ```

#### Versions d'intégration

Pour installer et imposer des versions d'intégration spécifiques, indiquez une intégration et un numéro de version à l'aide de `datadog_agent::install_integration`. La commande `datadog-agent integration` est alors utilisée pour s'assurer qu'une intégration spécifique est installée ou désinstallée. Exemple :

```conf
datadog_agent::install_integration { "mongo-1.9":
    ensure => present,
    integration_name => 'datadog-mongo',
    version => '1.9.0',
}
```

`ensure` dispose de deux options :

- `present` (valeur par défaut)
- `absent` (supprime une version préalablement imposée d'une intégration)

### Envoi de données

Assurez-vous que le gem [dogapi][3] est disponible sur votre système.

Pour activer l'envoi de données sur les modifications vers votre flux Datadog, activez le processeur de rapports sur votre master Puppet et l'envoi de données pour vos clients. Les clients renvoient au master un rapport d'exécution après chaque vérification.

Définissez l'option `puppet_run_reports` sur true dans le manifeste de configuration des nœuds pour votre master :

```ruby
class { "datadog-agent":
    api_key => "<VOTRE_CLÉ_API_DD>",
    puppet_run_reports => true
    # ...
}
```

Le fichier de configuration de Puppet se trouve dans `/etc/puppetlabs/puppet/puppet.conf`.


Ajoutez les options de configuration suivantes à l'emplacement approprié :

```ini
[main]
# Aucune modification nécessaire pour cette section
# ...

[master]
# Activer l'envoi de données à Datadog
reports=datadog_reports
# Si vous utilisez d'autres rapports, ajoutez datadog_reports à la fin,
# par exemple : rapports=store,log,datadog_reports
# ...

[agent]
# ...
pluginsync=true
report=true
```

Sur tous vos nœuds client Puppet, ajoutez ce qui suit au même emplacement :

```ini
[agent]
# ...
report=true
```

#### Dépannage

Si vous constatez l'erreur suivante, assurez-vous que `reports=datadog_reports` est défini dans `[master]`, et non dans `[main]`.

```text
err: Could not send report:
Error 400 on SERVER: Could not autoload datadog_reports:
Class Datadog_reports is already defined in Puppet::Reports
```

### Étapes détaillées

Les instructions suivantes décrivent les modifications minimums à apporter pour commencer à utiliser Puppet.

1. Modifiez `/etc/puppetlabs/puppet/puppet.conf` de façon à ajouter l'Agent Puppet :

    ```ini
    [master]
    report = true
    reports = datadog_reports
    pluginsync = true

    [agent]
    report = true
    pluginsync = true
    ```


2. Modifiez `/etc/puppetlabs/code/environments/production/manifests/10_nodes.pp` de façon à configurer votre Agent :

    ```conf
    node "default" {
        class { "datadog_agent":
            api_key => "<YOUR_DD_API_KEY>",
        }
    }
    node "puppetmaster" {
        class { "datadog_agent":
            api_key            => "<YOUR_DD_API_KEY>",
            puppet_run_reports => true
        }
    }
    ```

     **Remarque** : pour les anciennes versions de Puppet, modifiez `/etc/puppet/manifests/nodes.pp`.

3. Exécutez l'Agent Puppet :

    ```shell
    sudo systemctl restart puppetserver
    sudo puppet agent --onetime --no-daemonize --no-splay --verbose
    ```

     Exemple de réponse :

    ```text
    info: Retrieving plugin
    info: Caching catalog for alq-linux.dev.datadoghq.com
    info: Applying configuration version '1333470114'
    notice: Finished catalog run in 0.81 seconds
    ```

4. Vérifiez que vos données Puppet se trouvent dans Datadog en recherchant `sources:puppet` dans le [flux d'événements][5].

## Puppet sans master

1. Le module Datadog et ses dépendances doivent être installés sur tous les nœuds exécutés sans master.
2. Ajoutez ce qui suit au fichier `site.pp` de chaque nœud :
    ```conf
    class { "datadog_agent":
        api_key            => "<YOUR_DD_API_KEY>",
        puppet_run_reports => true
    }
   ```

3. Configurez les rapports dans la section `[main]` de `puppet.conf` :
    ```conf
    [main]
    reports=datadog_reports
    ```
4. Exécutez Puppet avec une configuration sans master :
    ```shell
    puppet apply --modulepath <path_to_modules> <path_to_site.pp>
    ```

## Paramètres client

### Tagging des nœuds client

Le fichier de configuration de l'Agent Datadog est recréé à partir du modèle à chaque exécution de Puppet. Si vous devez taguer vos nœuds, ajoutez une entrée de tableau dans Hiera :

```conf
datadog_agent::tags:
- 'keyname:value'
- 'anotherkey:%{factname}'
```

### Variables de configuration

Ces variables peuvent être définies dans la classe `datadog_agent` afin de contrôler les paramètres de l'Agent :

| nom de la variable                           | description                                                                                                                                                                                      |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`                   | La version de l'Agent à installer : 5, 6 ou 7 (valeur par défaut : 7).                                                                                                                              |
| `agent_version`                         | Cette variable vous permet d'imposer l'installation d'une version mineure spécifique de l'Agent, par exemple :`1:7.16.0-1`. Pour installer la dernière version, n'indiquez aucune valeur.                                                             |
| `collect_ec2_tags`                      | Définissez cette variable sur `true` pour recueillir les tags EC2 personnalisés d'une instance en tant que tags de l'Agent.                                                                                                                             |
| `collect_instance_metadata`             | Définissez cette variable sur `true` pour recueillir les métadonnées EC2 personnalisées d'une instance en tant que tags de l'Agent.                                                                                                                                |
| `datadog_site`                          | Le site Datadog auquel vous envoyez les données. Par défaut, cette variable est définie sur `datadoghq.com`. Définissez-la sur `datadoghq.eu` pour transmettre les données au site européen (Agent v6 et v7 uniquement).                                                               |
| `dd_url`                                | L'URL du serveur entrant de Datadog. Il est peu probable que vous deviez la modifier. Cette variable remplace `datadog_site`.                                                                                                 |
| `host`                                  | Remplace le hostname du nœud.                                                                                                                                                                  |
| `local_tags`                            | Un tableau de chaînes `<KEY:VALUE>` définies en tant que tags pour le nœud.                                                                                                                             |
| `non_local_traffic`                     | Autorise les autres nœuds à relayer leur trafic par ce nœud.                                                                                                                                      |
| `apm_enabled`                           | Une valeur booléenne permettant d'activer l'Agent APM (valeur par défaut : false).                                                                                                                                           |
| `apm_analyzed_spans`                    | Un hash permettant d'ajouter des événements APM pour la recherche et l'analyse de traces (valeur par défaut : undef). Exemple :<br>`{ 'app\|rails.request' => 1, 'service-name\|operation-name' => 0.8 }`                                |
| `process_enabled`                       | Une valeur booléenne permettant d'activer l'Agent de processus (valeur par défaut : false).                                                                                                                                       |
| `scrub_args`                            | Une valeur booléenne permettant d'activer le nettoyage de lignes de commande de processus (valeur par défaut : true).                                                                                                                            |
| `custom_sensitive_words`                | Un tableau permettant d'ajouter des mots supplémentaires pour le nettoyage, en plus des mots par défaut (valeur par défaut : `[]`).                                                                                             |
| `logs_enabled`                          | Une valeur booléenne permettant d'activer l'Agent de logs (valeur par défaut : false).                                                                                                                                          |
| `container_collect_all`                 | Une valeur booléenne permettant d'activer la collecte de logs pour tous les conteneurs.                                                                                                                                          |
| `agent_extra_options`<sup>1</sup>       | Un hash permettant de fournir des options de configuration supplémentaires (Agent v6 et v7 uniquement).                                                                                                                       |
| `hostname_extraction_regex`<sup>2</sup> | Une expression régulière utilisée pour extraire le groupe de capture associé au hostname, afin de transmettre les résultats de l'exécution dans Datadog, plutôt que de transmettre le nom du nœud Puppet. Exemple :<br>`'^(?<hostname>.*\.datadoghq\.com)(\.i-\w{8}\..*)?$'` |

(1) La variable `agent_extra_options` est utilisée pour contrôler précisément des options de configuration supplémentaires de l'Agent v6 ou v7. Le deep merge effectué est susceptible de remplacer les options des paramètres de la classe `datadog_agent`.

(2) La variable `hostname_extraction_regex` s'avère utile lorsque le module Puppet et l'Agent Datadog transmettent des hostnames différents pour un même host dans la liste d'infrastructures.

[1]: https://forge.puppet.com/datadog/datadog_agent
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://github.com/DataDog/dogapi-rb
[4]: https://app.datadoghq.com/account/settings#integrations
[5]: https://app.datadoghq.com/event/stream
[6]: https://github.com/DataDog/puppet-datadog-agent/tree/master/manifests/integrations

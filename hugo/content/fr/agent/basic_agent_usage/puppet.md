---
dependencies:
- https://github.com/DataDog/puppet-datadog-agent/blob/main/README.md
title: Puppet
---
Ce module installe l'Agent Datadog et envoie les rapports Puppet à Datadog.

## Prérequis

Le module Puppet Datadog prend en charge Linux et Windows et est compatible avec Puppet >= 7.34.x ou Puppet Enterprise 
version >= 2021.7.x. Pour des informations détaillées sur la compatibilité, consultez la [page du module sur Puppet Forge][1].

## Installation

Suivez le [guide d'installation dans l'application dans Fleet Automation][9] pour sélectionner vos fonctionnalités requises, copiez l'extrait de manifeste généré, ajoutez-le à votre manifeste Puppet et appliquez votre déploiement Puppet standard pour déployer l'Agent. Consultez le [module de l'Agent Datadog][1] ou la section [Configurations avancées](#configurations-avancees) pour des configurations supplémentaires, notamment la gestion des mises à niveau de l'Agent, l'activation des intégrations de l'Agent et la configuration du reporting des exécutions Puppet.

### Mise à niveau de l'Agent

> [!IMPORTANT]
> Le module Puppet Datadog v4.x abandonne la prise en charge de Puppet <= 6 et de l'Agent Datadog v5. Pour mettre à niveau ou installer 
> l'Agent Datadog v5+ sur Puppet <= 6, utilisez le module v3.x.

- Par défaut, l'Agent Datadog v7.x est installé. Pour utiliser la version 6 de l'Agent, modifiez le paramètre `agent_major_version`.
- Les options héritées spécifiques à l'Agent v5 ont été supprimées. Consultez le fichier CHANGELOG.md pour plus de détails et les commentaires de la classe datadog_agent pour toutes les options disponibles.

> [!IMPORTANT]
> Des mises à jour et des modifications incompatibles ont été apportées dans les intégrations de l'Agent ci-dessous :

  - ActiveMQ_XML
    - Le paramètre `suppress_errors` doit maintenant être utilisé au lieu de `supress_errors` (rétrocompatible)
  - ElasticSearch **[MODIFICATIONS INCOMPATIBLES]**
    - `ssl_verify` accepte uniquement des valeurs booléennes
    - Les options `tls_verify` ont été ajoutées
  - Check Disk **[MODIFICATIONS INCOMPATIBLES]**
    - `use_mount`, `all_partitions` et `tag_by_filesystem` acceptent uniquement des valeurs booléennes
  - Check TCP
    -  L'option `skip_event` a été supprimée depuis Datadog Agent v6.4+

### Configuration

Une fois le module `datadog_agent` installé sur votre `puppetserver` ou `puppetmaster` (ou sur un host sans master), suivez les étapes de configuration ci-dessous :

1. Obtenez votre [clé d'API Datadog][2].
2. Ajoutez la classe Datadog à vos manifestes de nœud (ex. : `/etc/puppetlabs/code/environments/production/manifests/site.pp`).

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
    }
    ```

    Si vous utilisez un site Datadog différent de celui par défaut (datadoghq.com), définissez-le ici également :

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
        datadog_site => "datadoghq.eu",
    }
    ```

    Pour les versions de CentOS/RHEL antérieures à 7.0 et les versions d'Ubuntu antérieures à 15.04, définissez le prestataire de services sur `upstart` :

    ```conf
    class { 'datadog_agent':
        api_key => "<YOUR_DD_API_KEY>",
        service_provider => 'upstart'
    }
    ```

    Consultez la section [Variables de configuration](#variables-de-configuration) pour obtenir la liste des arguments utilisables ici.

4. (Facultatif) Ajoutez les intégrations à utiliser avec l'Agent. Dans l'exemple suivant, l'intégration Mongo est installée :

    ```conf
    class { 'datadog_agent::integrations::mongo':
        # integration arguments go here
    }
    ```

    Référez-vous aux [commentaires dans le code][6] pour obtenir la liste de tous les arguments disponibles pour une intégration donnée.

    Si une intégration ne dispose pas d'un [manifeste avec une classe dédiée][7], vous pouvez toujours ajouter une configuration pour celle-ci. Voici un exemple pour le check `ntp` :

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

5. (Facultatif) Pour recueillir des métriques et des événements liés au service Puppet, consultez la section [Rapports](#rapports).


## Configurations avancées

### Mettre à jour une intégration

Pour installer et imposer une version spécifique d'une intégration, utilisez `datadog_agent::install_integration`. La commande `datadog-agent integration` est alors appelée pour s'assurer qu'une intégration spécifique est installée ou désinstallée. Exemple :

```conf
datadog_agent::install_integration { "mongo-1.9":
    ensure => present,
    integration_name => 'datadog-mongo',
    version => '1.9.0',
    third_party => false,
}
```

L'argument `ensure` accepte deux valeurs :

- `present` (valeur par défaut)
- `absent` (supprime une version préalablement imposée d'une intégration)

Pour installer une intégration tierce (par exemple depuis le Marketplace), définissez l'argument `third_party` sur `true`.

Notez qu'il est possible d'installer une version plus ancienne d'une intégration que cette intégrée à l'Agent.

### Rapports

Pour activer l'envoi de rapports sur les exécutions Puppet vers votre flux Datadog, activez le processeur de rapports sur votre master Puppet et l'envoi de rapports pour vos clients. Les clients renvoient au master un rapport d'exécution après chaque vérification.

1. Définissez l'option `puppet_run_reports` sur true dans le manifeste de configuration des nœuds pour votre master :

    ```ruby
    class { 'datadog-agent':
      api_key            => '<YOUR_DD_API_KEY>',
      puppet_run_reports => true
      # ...
    }
    ```

    Le gem dogapi est automatiquement installé. Définissez `manage_dogapi_gem` sur false pour personnaliser l'installation.

2. Ajoutez ces options de configuration à la configuration du master Puppet (ex. : `/etc/puppetlabs/puppet/puppet.conf`) :

    ```ini
    [main]
    # No modification needed to this section
    # ...

    [master]
    # Enable reporting to Datadog
    reports=datadog_reports
    # If you use other reports, add datadog_reports to the end,
    # for example: reports=store,log,datadog_reports
    # ...

    [agent]
    # ...
    report=true
    ```

Avec le [module `ini_setting`](https://forge.puppet.com/modules/puppetlabs/inifile) :

```puppet
  ini_setting { 'puppet_conf_master_report_datadog_puppetdb':
    ensure  => present,
    path    => '/etc/puppetlabs/puppet/puppet.conf',
    section => 'master',
    setting => 'reports',
    value   => 'datadog_reports,puppetdb',
    notify  => [
      Service['puppet'],
      Service['puppetserver'],
    ],
  }
```

3. Sur tous vos nœuds client Puppet, ajoutez ce qui suit au même emplacement :

    ```ini
    [agent]
    # ...
    report=true
    ```

Avec le [module `ini_setting`](https://forge.puppet.com/modules/puppetlabs/inifile) :

```puppet
  ini_setting { 'puppet_conf_agent_report_true':
    ensure  => present,
    path    => '/etc/puppetlabs/puppet/puppet.conf',
    section => 'agent',
    setting => 'report',
    value   => 'true',
    notify  => [
      Service['puppet'],
    ],
  }
```

4. (Facultatif) Activez le tagging des rapports avec des faits :

    Vous pouvez ajouter des tags aux rapports qui sont envoyés à Datadog sous la forme d'événements. Ces tags peuvent provenir de faits Puppet propres au nœud sur lequel porte le rapport. Ils doivent être individuels et ne pas comprendre de faits structurés (hashs, tableaux, etc.) pour garantir la lisibilité. Pour activer le tagging des faits standard, définissez le paramètre `datadog_agent::reports::report_fact_tags` sur la valeur de tableau des faits, par exemple `["virtual","operatingsystem"]`. Pour activer le tagging des faits de confiance, définissez le paramètre `datadog_agent::reports::report_trusted_fact_tags` sur la valeur de tableau des faits, par exemple `["certname","extensions.pp_role","hostname"]`.

    Remarque : la modification de ces paramètres nécessite un redémarrage de pe-puppetserver (ou de puppetserver) pour lancer une relecture du processeur de rapports. Assurez-vous que les changements sont déployés avant de redémarrer le(s) service(s).

    Conseils :
    - Utilisez une notation par points pour spécifier un fait cible ; sinon, l'ensemble des données de fait devient la valeur sous forme de chaîne (peu utile)
    - Ne dupliquez pas les données de surveillance courantes comme le nom de l'host, l'uptime, la mémoire, etc.
    - Coordonnez les faits essentiels comme le rôle, le propriétaire, le modèle, le centre de données, etc. pour établir des corrélations pertinentes avec les mêmes tags à partir de métriques

5. Vérifiez que vos données Puppet se trouvent dans Datadog en recherchant `sources:puppet` dans le [flux d'événements][5].

### Configuration via NPM

Pour activer les fonctionnalités Network Performance Monitoring (NPM) de l'Agent Datadog, suivez ces étapes :

1. (Windows uniquement) Si l'Agent est déjà installé, désinstallez-le en passant `win_ensure => absent` à la classe principale et en supprimant les définitions des autres classes.
2. (Windows uniquement) Passez l'option `windows_npm_install` avec la valeur `true` à la classe `datadog::datadog_agent`. Supprimez `win_ensure` s'il a été ajouté à l'étape précédente.
3. Utilisez la classe `datadog_agent::system_probe` pour créer correctement le fichier de configuration :

```conf
class { 'datadog_agent::system_probe':
    network_enabled => true,
}
```

### Configuration USM

Pour activer Universal Service Monitoring (USM) de l'Agent Datadog, utilisez la classe `datadog_agent::system_probe` pour créer correctement le fichier de configuration :

```conf
class { 'datadog_agent::system_probe':
    service_monitoring_enabled => true,
}
```

### Dépannage

Vous pouvez exécuter l'Agent Puppet manuellement pour vérifier la présence d'erreurs dans la sortie :

    ```shell
    sudo systemctl restart puppetserver
    sudo puppet agent --onetime --no-daemonize --no-splay --verbose
    ```

     Example response:

    ```text
    info: Retrieving plugin
    info: Caching catalog for alq-linux.dev.datadoghq.com
    info: Applying configuration version '1333470114'
    notice: Finished catalog run in 0.81 seconds
    ```

Si vous constatez l'erreur suivante, assurez-vous que `reports=datadog_reports` est défini dans `[master]`, et non dans `[main]`.

    ```text
    err: Could not send report:
    Error 400 on SERVER: Could not autoload datadog_reports:
    Class Datadog_reports is already defined in Puppet::Reports
    ```

Si vous ne recevez aucun rapport, consultez les logs de votre serveur Puppet.

### Puppet sans master

1. Le module Datadog et ses dépendances doivent être installés sur tous les nœuds exécutés sans master.
2. Ajoutez ce qui suit au fichier `site.pp` de chaque nœud :
    ```conf
    class { "datadog_agent":
        api_key            => "<YOUR_DD_API_KEY>",
        puppet_run_reports => true
    }
   ```

3. Exécutez Puppet avec une configuration sans master :
    ```shell
    puppet apply --modulepath <path_to_modules> <path_to_site.pp>
    ```

### Tagging des nœuds client

Le fichier de configuration de l'Agent Datadog est recréé à partir du modèle à chaque exécution de Puppet. Si vous devez taguer vos nœuds, ajoutez une entrée de tableau dans Hiera :

```conf
datadog_agent::tags:
- 'keyname:value'
- 'anotherkey:%{factname}'
```
Pour générer des tags à partir de faits personnalisés, classez vos nœuds en spécifiant les faits Puppet sous forme de tableau associé au paramètre```facts_to_tags```, soit via la console Puppet Enterprise, soit via Hiera. Voici un exemple :

```conf
class { "datadog_agent":
  api_key            => "<YOUR_DD_API_KEY>",
  facts_to_tags      => ["os.family","networking.domain","my_custom_fact"],
}
```

Conseils :

1. Pour les faits structurés, effectuez l'indexation dans la valeur de fait spécifique ; sinon, le tableau entier est défini comme une chaîne, ce qui rend son utilisation difficile.
2. Les faits dynamiques tels que la charge processeur ou encore la disponibilité changent généralement à chaque exécution, et ne sont donc pas conseillés pour le tagging. À l'inverse, les faits statiques restent généralement identiques pendant toute la durée de vie d'un nœud. Ils sont donc parfaitement adaptés pour le tagging.

### Variables de configuration

Ces variables peuvent être définies dans la classe `datadog_agent` afin de contrôler les paramètres de l'Agent. Consultez les [commentaires dans le code][8] pour obtenir la liste de tous les arguments disponibles.

| nom de la variable                           | description                                                                                                                                                                                      |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `agent_major_version`                   | La version de l'Agent à installer : 6 ou 7 (par défaut : 7).                                                                                                                                 |
| `agent_version`                         | Cette variable vous permet d'imposer l'installation d'une version mineure spécifique de l'Agent, par exemple :`1:7.16.0-1`. Pour installer la dernière version, n'indiquez aucune valeur.                                                             |
| `collect_ec2_tags`                      | Définissez cette variable sur `true` pour recueillir les tags EC2 personnalisés d'une instance en tant que tags de l'Agent.                                                                                                                             |
| `collect_instance_metadata`             | Définissez cette variable sur `true` pour recueillir les métadonnées EC2 personnalisées d'une instance en tant que tags de l'Agent.                                                                                                                                |
| `datadog_site`                          | Le site Datadog auquel envoyer les données. La valeur par défaut est `datadoghq.com`, par exemple : `datadoghq.eu` ou `us3.datadoghq.com`.                                                                                           |
| `dd_url`                                | L'URL du serveur entrant de Datadog. Il est peu probable que vous deviez la modifier. Cette variable remplace `datadog_site`.                                                                                                 |
| `host`                                  | Remplace le hostname du nœud.                                                                                                                                                                  |
| `local_tags`                            | Un tableau de chaînes `<KEY:VALUE>` définies en tant que tags pour le nœud.                                                                                                                             |
| `non_local_traffic`                     | Autoriser d'autres nœuds à relayer leur trafic DogstatsD via ce nœud.                                                                                                                            |
| `apm_enabled`                           | Une valeur booléenne permettant d'activer l'Agent APM (valeur par défaut : false).                                                                                                                                           |
| `process_enabled`                       | Une valeur booléenne permettant d'activer l'Agent de processus (valeur par défaut : false).                                                                                                                                       |
| `scrub_args`                            | Une valeur booléenne permettant d'activer le nettoyage de lignes de commande de processus (valeur par défaut : true).                                                                                                                            |
| `custom_sensitive_words`                | Un tableau permettant d'ajouter des mots supplémentaires pour le nettoyage, en plus des mots par défaut (valeur par défaut : `[]`).                                                                                             |
| `logs_enabled`                          | Une valeur booléenne permettant d'activer l'Agent de logs (valeur par défaut : false).                                                                                                                                          |
| `windows_npm_install`                   | Un booléen pour activer l'installation du pilote NPM Windows (par défaut false).                                                                                                                     |
| `win_ensure`                            | Une énumération (present/absent) pour garantir la présence/absence de l'Agent Datadog sur Windows (par défaut present)                                                                                    |
| `container_collect_all`                 | Une valeur booléenne permettant d'activer la collecte de logs pour tous les conteneurs.                                                                                                                                          |
| `agent_extra_options`<sup>1</sup>       | Un hash permettant de fournir des options de configuration supplémentaires (Agent v6 et v7 uniquement).                                                                                                                       |
| `hostname_extraction_regex`<sup>2</sup> | Une expression régulière utilisée pour extraire le groupe de capture associé au hostname, afin de transmettre les résultats de l'exécution dans Datadog, plutôt que de transmettre le nom du nœud Puppet. Exemple :<br>`'^(?<hostname>.*\.datadoghq\.com)(\.i-\w{8}\..*)?$'` |

(1) La variable `agent_extra_options` est utilisée pour contrôler précisément des options de configuration supplémentaires de l'Agent v6 ou v7. Le deep merge effectué est susceptible de remplacer les options des paramètres de la classe `datadog_agent`. Exemple :

```
class { "datadog_agent":
    < vos autres arguments de la classe >,
    agent_extra_options => {
        use_http => true,
        use_compression => true,
        compression_level => 6,
    },
}
```

(2) La variable `hostname_extraction_regex` s'avère utile lorsque le module Puppet et l'Agent Datadog transmettent des hostnames différents pour un même host dans la liste d'infrastructures.

[1]: https://forge.puppet.com/datadog/datadog_agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://github.com/DataDog/dogapi-rb
[4]: https://app.datadoghq.com/account/settings#integrations
[5]: https://app.datadoghq.com/event/stream
[6]: https://github.com/DataDog/puppet-datadog-agent/blob/master/manifests/integrations/mongo.pp
[7]: https://github.com/DataDog/puppet-datadog-agent/tree/master/manifests/integrations
[8]: https://github.com/DataDog/puppet-datadog-agent/blob/master/manifests/init.pp
[9]: https://app.datadoghq.com/fleet/install-agent/latest?platform=puppet
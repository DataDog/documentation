---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    MapR - Overview: assets/dashboards/mapr_overview.json
  logs:
    source: mapr
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- data store
- os & system
- processing
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mapr/README.md
display_name: MapR
draft: false
git_integration_title: mapr
guid: 7d1de422-85a6-47cc-9962-427a9499d109
integration_id: mapr
integration_title: MapR
integration_version: 1.9.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mapr.
metric_to_check: mapr.metrics.submitted
name: mapr
public_title: Intégration Datadog/MapR
short_description: Recueillez les métriques de surveillance mises à disposition par
  MapR.
support: core
supported_os:
- linux
---



## Présentation

Ce check permet de surveiller [MapR][1] (version 6.1+) avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Le check MapR est inclus avec le package de l'[Agent Datadog][2], mais il nécessite des opérations d'installation supplémentaires.

#### Prérequis

- La [surveillance de MapR][3] fonctionne correctement.
- Vous disposez d'un [utilisateur MapR][4] (comportant un nom, un mot de passe, un UID et un GID) avec l'autorisation « consume » sur le flux `/var/mapr/mapr.monitoring/metricstreams`. Il peut s'agir d'un utilisateur existant ou d'un nouvel utilisateur.
- **Sur un cluster non sécurisé** : suivez la documentation [Configurer l'emprunt d'identité sans sécurité de cluster][5] (en anglais) pour permettre à l'utilisateur `dd-agent` d'emprunter l'identité de cet utilisateur MapR.
- **Sur un cluster sécurisé** : générez un [ticket de service à long terme][6] pour cet utilisateur, lisible par l'utilisateur `dd-agent`.

Suivez ces étapes d'installation pour chaque nœud :

1. [Installez l'Agent][2].
2. Installez la bibliothèque _mapr-streams-library_ à l'aide de la commande suivante :

    `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python`.

    Si vous utilisez Python 3 avec l'Agent v7, remplacez `pip` par `pip3`.

3. Ajoutez `/opt/mapr/lib/` à `/etc/ld.so.conf` (ou un fichier dans `/etc/ld.so.conf.d/`). Sans cela, la bibliothèque _mapr-streams-library_ utilisée par l'Agent ne peut pas trouver les bibliothèques partagées MapR.
4. Rechargez les bibliothèques en exécutant la commande `sudo ldconfig`.
5. Configurez l'intégration en indiquant l'emplacement du ticket.

#### Remarques supplémentaires

- Si vous n'avez pas activé les fonctionnalités de sécurité pour le cluster, vous pouvez continuer sans créer de ticket.
- Si l'utilisation d'outils de compilation comme gcc (requis pour créer la bibliothèque mapr-streams-library) n'est pas autorisée dans votre environnement de production, vous pouvez générer un fichier wheel compilé de la bibliothèque sur une instance de développement, puis distribuer ce fichier aux hosts de production. Pour que le fichier wheel compilé fonctionne, les hosts de développement et de production doivent être suffisamment semblables. Vous pouvez exécuter la commande `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip wheel --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python` pour créer le fichier wheel sur la machine de développement. Exécutez ensuite la commande `sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install <LE_FICHIER_WHEEL>` sur la machine de production.
- Si vous utilisez Python 3 avec l'Agent v7, n'oubliez pas de remplacer `pip` par `pip3` lors de l'installation de _mapr-streams-library_.

### Configuration

#### Collecte de métriques

1. Modifiez le fichier `mapr.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour recueillir vos données de performance MapR. Consultez le [fichier d'exemple mapr.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.
2. Définissez le paramètre `ticket_location` dans la configuration sur le chemin du ticket à long terme que vous avez créé.
3. [Redémarrez l'Agent][8].

#### Collecte de logs

MapR utilise FluentD pour les logs. Utilisez le [plug-in FluentD pour Datadog][9] afin de recueillir des logs MapR. La commande suivante télécharge et installe le plug-in dans le répertoire approprié.

`curl https://raw.githubusercontent.com/DataDog/fluent-plugin-datadog/master/lib/fluent/plugin/out_datadog.rb -o /opt/mapr/fluentd/fluentd-<VERSION>/lib/fluentd-<VERSION>-linux-x86_64/lib/app/lib/fluent/plugin/out_datadog.rb`

Ensuite, mettez à jour `/opt/mapr/fluentd/fluentd-<VERSION>/etc/fluentd/fluentd.conf` avec la section suivante.

```text
<match *>
  @type copy
  <store> # Cette section est présente par défaut et transmet les logs à ElasticCache pour Kibana.
    @include /opt/mapr/fluentd/fluentd-<VERSION>/etc/fluentd/es_config.conf
    include_tag_key true
    tag_key service_name
  </store>
  <store> # Cette section transmet tous les logs à Datadog :
    @type datadog
    @id dd_agent
    include_tag_key true
    dd_source mapr  # Définit « source: mapr » sur chaque log pour permettre le parsing automatique sur Datadog.
    dd_tags "<KEY>:<VALUE>"
    service <NOM_DU_SERVICE>
    api_key <VOTRE_CLÉ_API>
  </store>
```

Consultez la documentation [fluent_datadog_plugin][9] (en anglais) pour en savoir plus sur les options disponibles.

### Validation

Lancez la [sous-commande status de l'Agent][10] et cherchez `mapr` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "mapr" >}}


### Événements

Le check MapR n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "mapr" >}}


## Dépannage

- **L'Agent ne cesse de crasher après avoir configuré l'intégration MapR**

  Il arrive que la bibliothèque C au sein de _mapr-streams-python_ entraîne une erreur de segmentation, en raison de problèmes d'autorisation. Assurez-vous que l'utilisateur `dd-agent` dispose d'une autorisation de lecture pour le fichier du ticket et qu'il peut exécuter des commandes `maprcli` lorsque la variable d'environnement `MAPR_TICKETFILE_LOCATION` est définie sur le ticket.

- **L'intégration semble fonctionner correctement, mais aucune métrique n'est envoyée**

  Laissez l'Agent s'exécuter pendant quelques minutes. Étant donné que l'intégration récupère des données à partir d'une rubrique, MapR doit d'abord transmettre les données à cette rubrique.
  Si cela ne résout pas le problème, et qu'une exécution manuelle de l'Agent avec `sudo` entraîne l'affichage de données, il s'agit d'un problème d'autorisations. Vérifiez toutes les options de configuration. L'utilisateur Linux `dd-agent` doit pouvoir utiliser un ticket stocké en local. Cela lui permet de transmettre des requêtes auprès de MapR en tant qu'utilisateur X (qui peut correspondre ou nom à `dd-agent`). De plus, l'utilisateur X doit disposer de l'autorisation `consume` sur le flux `/var/mapr/mapr.monitoring/metricstreams`.

- **Le message `confluent_kafka was not imported correctly ...` s'affiche**

  L'environnement intégré à l'Agent n'est pas parvenu à exécuter la commande `import confluent_kafka`. Cela signifie que la bibliothèque _mapr-streams-library_ n'a pas été installée au sein de l'environnement intégré, ou qu'elle ne trouve pas les bibliothèques mapr-core. Le message d'erreur fournit davantage d'informations à ce sujet.

Besoin d'aide supplémentaire ? Contactez l'[assistance Datadog][13].


[1]: https://mapr.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://mapr.com/docs/61/AdministratorGuide/Monitoring.html
[4]: https://mapr.com/docs/61/AdministratorGuide/c-managing-users-and-groups.html
[5]: https://docs.datafabric.hpe.com/52/SecurityGuide/t_config_impersonation_notsecure.html?hl=secure%2Ccluster
[6]: https://mapr.com/docs/61/SecurityGuide/GeneratingServiceTicket.html
[7]: https://github.com/DataDog/integrations-core/blob/master/mapr/datadog_checks/mapr/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://www.rubydoc.info/gems/fluent-plugin-datadog
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/mapr/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/mapr/assets/service_checks.json
[13]: https://docs.datadoghq.com/fr/help/
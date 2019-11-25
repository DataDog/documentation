---
assets:
  dashboards:
    MapR - Overview: assets/dashboards/mapr_overview.json
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
  - 'https://github.com/DataDog/integrations-core/blob/master/mapr/README.md'
display_name: MapR
git_integration_title: mapr
guid: 7d1de422-85a6-47cc-9962-427a9499d109
integration_id: mapr
integration_title: MapR
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: mapr.
metric_to_check: mapr.metrics.submitted
name: mapr
public_title: Intégration Datadog/MapR
short_description: Recueillez les métriques de surveillance mises à disposition par MapR.
support: core
supported_os:
  - linux
---
## Présentation

Ce check permet de surveiller [MapR][1] (version 6.1+) avec l'Agent Datadog.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host.

### Installation

Le check MapR est inclus avec le paquet de l'[Agent Datadog][2], mais il nécessite des opérations d'installation supplémentaires.

1. Créez un utilisateur `dd-agent` associé à un mot de passe sur chaque nœud dans le cluster avec un `UID`/`GID` identique pour qu'il soit reconnu par MapR. Consultez la documentation [Managing users and groups][10] (en anglais) pour obtenir des informations supplémentaires.
2. Installez l'Agent sur chaque nœud à surveiller.
3. Installez la bibliothèque *mapr-streams-library* avec la commande suivante : `/opt/datadog-agent/embedded/bin/pip install --global-option=build_ext --global-option="--library-dirs=/opt/mapr/lib" --global-option="--include-dirs=/opt/mapr/include/" mapr-streams-python`. Si vous utilisez Python 3 avec l'Agent 6, remplacez `pip` par `pip3`.
4. Ajoutez `/opt/mapr/lib/` à `/etc/ld.so.conf` (ou un fichier dans `/etc/ld.so.conf.d/`). Cette opération permet à la bibliothèque *mapr-streams-library* utilisée par l'Agent de trouver les bibliothèques partagées MapR.
5. Générez un [ticket à long terme][8] pour l'utilisateur `dd-agent`.
6. Assurez-vous que l'utilisateur `dd-agent` peut lire le ticket.
7. Configurez l'intégration (voir ci-dessous).

**Remarque** : si vous n'avez pas activé les fonctionnalités de sécurité pour le cluster, vous pouvez continuer sans créer de ticket.


### Configuration
#### Collecte de métriques

1. Modifiez le fichier `mapr.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour recueillir vos données de performance MapR. Consultez le [fichier d'exemple mapr.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.
2. Définissez le paramètre `ticket_location` dans la configuration sur le chemin du ticket à long terme que vous avez créé.
3. [Redémarrez l'Agent][4].

#### Collecte de logs

MapR utilise FluentD pour les logs. Utilisez le [plug-in FluentD pour Datadog][11] afin de recueillir des logs MapR.
La commande suivante télécharge et installe le plug-in dans le répertoire approprié.

`curl https://raw.githubusercontent.com/DataDog/fluent-plugin-datadog/master/lib/fluent/plugin/out_datadog.rb -o /opt/mapr/fluentd/fluentd-<VERSION>/lib/fluentd-<VERSION>-linux-x86_64/lib/app/lib/fluent/plugin/out_datadog.rb`

Ensuite, mettez à jour `/opt/mapr/fluentd/fluentd-<VERSION>/etc/fluentd/fluentd.conf` avec la section suivante.

```
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
    dd_source mapr
    dd_tags "<KEY>:<VALUE>"
    service <NOM_DU_SERVICE>
    api_key <VOTRE_CLÉ_API>
  </store>
```

Consultez la documentation de [fluent_datadog_plugin][11] (en anglais) pour en savoir plus sur les options disponibles.


### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `mapr` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "mapr" >}}


### Checks de service

- `mapr.can_connect` :
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter et à souscrire à la rubrique du flux. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Le check MapR n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://mapr.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/mapr/datadog_checks/mapr/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/help
[7]: https://mapr.com/docs/61/MapR_Streams/MapRStreamsPythonExample.html
[8]: https://mapr.com/docs/61/SecurityGuide/GeneratingServiceTicket.html
[9]: https://mapr.com/docs/60/MapR_Streams/MapRStreamCAPISetup.html
[10]: https://mapr.com/docs/61/AdministratorGuide/c-managing-users-and-groups.html
[11]: https://www.rubydoc.info/gems/fluent-plugin-datadog
[12]: https://mapr.com/docs/61/AdvancedInstallation/SettingUptheClient-install-mapr-client.html
[13]: https://github.com/DataDog/integrations-core/blob/master/mapr/metadata.csv
[14]: http://upstart.ubuntu.com/cookbook/#environment-variables
[15]: https://www.freedesktop.org/software/systemd/man/systemd.service.html#Command%20lines


{{< get-dependencies >}}
---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    OctoPrint Overview: assets/dashboards/octoprint_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - orchestration
  - log collection
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/octoprint/README.md
display_name: OctoPrint
draft: false
git_integration_title: octoprint
guid: 77844a89-7202-4f8b-a0fb-642904eb9513
integration_id: octoprint
integration_title: Datadog/OctoPrint
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: gwaldo@gmail.com
manifest_version: 1.0.0
metric_prefix: octoprint.
metric_to_check: octoprint.printer_state
name: octoprint
public_title: Intégration Datadog/OctoPrint
short_description: Surveiller OctoPrint, une interface Web dédiée à la gestion d'imprimantes 3D
support: contrib
supported_os:
  - linux
---
## Présentation

Ce check surveille [OctoPrint][1] via l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

Pour installer le check OctoPrint sur votre host, exécutez ce qui suit :

```shell
sudo -u dd-agent -- datadog-agent integration install datadog-octoprint==<VERSION>
```

**Remarque** : la `VERSION` est indiquée en haut de cette page.

#### Installation depuis les sources (facultatif)

1. Installez le [kit de développement][3] sur n'importe quelle machine.

2. Exécutez `ddev release build octoprint` pour générer le package.

3. [Téléchargez l'Agent Datadog][4].

4. Importez l'artefact du build sur tous les hosts avec un Agent et
 exécutez `datadog-agent integration install -w
 chemin/vers/octoprint/dist/datadog_octoprint*.whl`.

### Configuration

1. Depuis l'interface Web OctoPrint, créez une clé d'API afin de l'utiliser avec Datadog. Pour ce faire, accédez à Settings --> Application Keys.

2. Modifiez le fichier `octoprint.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent. Collez la clé d'API OctoPrint en tant que valeur de `octo_api_key`. Consultez le [fichier d'exemple octoprint.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][6].

### Validation

[Exécutez la sous-commande de statut de l'Agent][7] et recherchez `octoprint` sous la section Checks.

### Logs

Par défaut, cette intégration suppose que vous utilisez l'image [OctoPi][8] qui est préconfigurée pour exécuter OctoPrint à partir d'un Raspberry Pi.

Voici la liste des logs recueillis par défaut (ainsi que leur emplacement par défaut) :

- Log de l'application OctoPrint : `/home/pi/.octoprint/logs`
- Log de la webcam OctoPrint : `/var/log/webcamd.log`
- Log HAProxy : `/var/log/haproxy.log`

L'un ou l'ensemble de ces logs peuvent être changés ou supprimés en modifiant le fichier `conf.yaml` de l'intégration.

#### Processing de logs

OctoPrint utilise son propre format de log (et non un format objet). Pour utiliser ces logs, créez un pipeline de traitement de logs avec des règles de parsing. Exemple :

1. Pipeline principal : « OctoPrint »
    1. Sous-pipeline 1 : « OctoPrint Print Job »
        1. Règle de parser grok :
            - `OctoPrint_Print_Job %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+Print\s+job\s+%{notSpace:job_status}\s+-\s+%{data::keyvalue(":"," ,")}`
    1. Sous-pipeline 2 : « General OctoPrint Log »
        1. Règle de parser grok :
            - `General_OctoPrint_Log %{date("yyyy-MM-dd HH:mm:ss,SSS"):date}\s+-\s+%{notSpace:source}\s+-\s+%{word:level}\s+-\s+%{data:message}`

Pour en savoir plus, consultez la [documentation sur le traitement des logs Datadog][9].

## Données collectées

### Métriques
{{< get-metrics-from-git "octoprint" >}}


### Événements

OctoPrint n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "octoprint" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].


[1]: https://octoprint.org/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/datadog_checks/octoprint/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://octoprint.org/download/
[9]: https://docs.datadoghq.com/fr/logs/processing/
[10]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/metadata.csv
[11]: https://github.com/DataDog/integrations-extras/blob/master/octoprint/assets/service_checks.json
[12]: https://docs.datadoghq.com/fr/help/
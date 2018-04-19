---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/kyototycoon/
git_integration_title: kyototycoon
guid: 2661668b-d804-4c8d-96a7-8019525add8c
has_logo: true
integration_title: Kyoto Tycoon
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.20.0
name: kyototycoon
public_title: Intégration Datadog-Kyoto Tycoon 
short_description: Suivre les opérations get, set et delete; monitorer le retard de réplication.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.2.0
---



## Aperçu

Le check KyotoTycoon de l'agent track les opérations get, set et delete et vous permet de monitorer le délai de réplication.

## Implémentation
### Installation

Le check KyotoTycoon est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur vos serveurs KyotoTycoon.

### Configuration

Créez un fichier `kyototycoon.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas kyototycoon.yaml](https://github.com/DataDog/integrations-core/blob/master/kyototycoon/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

```
init_config:

instances:
#  Each instance needs a report URL.
#  name, and optionally tags keys. The report URL should
#  be a URL to the Kyoto Tycoon "report" RPC endpoint.
#
#  Complete example:
#
- report_url: http://localhost:1978/rpc/report
#   name: my_kyoto_instance
#   tags:
#     foo: bar
#     baz: bat
```

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `kyototycoon` dans la section Checks:

```
  Checks
  ======
    [...]

    kyototycoon
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibilité

Le check KyotoTycoon est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "kyototycoon" >}}


### Evénements
Le check KyotoTycoon n'inclut aucun événement pour le moment.

### Checks de Service

`kyototycoon.can_connect`:

Renvoie CRITICAL si l'agent ne peut pas se connecter à KyotoTycoon pour collecter des métriques, sinon OK.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)


---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/system_swap/
git_integration_title: system_swap
guid: 4b3dcc12-7bc9-474a-960f-14680eb587a3
has_logo: true
integration_title: System Swap
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: system_swap
public_title: Intégration Datadog-System Swap
short_description: Ajoute quelques check facultatives de swap mémoire.
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.1.0
---

## Aperçu

Ce check monitor le nombre d'octets qu'un host a swap.

## Implémentation
### Installation

Le check System swap est packagé avec l'agent, il vous faut donc simplement [installer l'agent] (https://app.datadoghq.com/account/settings#agent) sur n'importe quel host.

### Configuration

Créez un fichier `system_swap.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas cassandra_nodetool.yaml](https://github.com/DataDog/integrations-core/blob/master/system_swap/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

```
# This check takes no initial configuration
init_config:

instances: [{}]
```

[Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent) pour commencer à envoyer vos métriques swap à Datadog

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `system_swap` dans la section Checks:

```
  Checks
  ======
    [...]

    system_swap
    -------
      - instance #0 [OK]
      - Collected 2 metrics, 0 events & 0 service checks

    [...]
```

## Compatibilité

Le check system_swap est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "system_swap" >}}

### Evénements
Le check System Swap n'inclut aucun événement pour le moment.

### Checks de Service
Le check System Swap n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

<<<<<<< HEAD
[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/system_swap/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent
[4]: https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information
[5]: http://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/
=======
>>>>>>> master

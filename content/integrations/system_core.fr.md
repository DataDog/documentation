---
aliases:
  - /fr/integrations/systemcore
categories:
  - os & system
ddtype: check
doc_link: 'https://docs.datadoghq.com/integrations/system_core/'
git_integration_title: system_core
guid: e123ef26-81bb-4c1b-b079-4dd4cc7d7ae7
has_logo: true
integration_title: System Core
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: system_core
public_title: Intégration Datadog-System Core
short_description: Collecter le nombre de cœurs de CPU et les temps CPU sur un host
support: core
supported_os:
  - linux
  - mac_os
  - windows
version: 1.0.0
---
{{< img src="integrations/systemcore/syscoredash.png" alt="System Core" responsive="true" >}}
## Aperçu

Ce check collecte le nombre de cœurs de processeur sur un host et les temps de CPU (c'est-à-dire, système, utilisateur, inactif, etc.).

## Implémentation
### Installation

Le check system_core est packagé avec l'agent, il vous faut donc simplement [installer l'agent] (https://app.datadoghq.com/account/settings#agent) sur n'importe quel host.

### Configuration

Créez un fichier `system_core.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas system_core.yaml](https://github.com/DataDog/integrations-core/blob/master/system_core/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

```
init_config:

instances:
  - foo: bar
```

L'agent n'a besoin que d'un élément dans `instances` pour activer le check. Le contenu de l'élément n'a pas d'importance.

[Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent) pour activer le check.

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `system_core` dans la section Checks:

```
  Checks
  ======
    [...]

    system_core
    -------
      - instance #0 [OK]
      - Collected 5 metrics, 0 events & 0 service checks

    [...]
```

## Compatibilité

Le check system_core est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "system_core" >}}


Selon la plate-forme, la vérification peut collecter d'autres métriques de temps CPU, par ex. `system.core.interrupt` sous Windows,` system.core.iowait` sous Linux, etc...

### Evénements
Le check System Core n'inclut aucun événement pour le moment.

### Checks de Service
{{< get-service-checks-from-git "system_core" >}}


## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
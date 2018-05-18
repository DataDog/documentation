---
categories:
- os & system
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/win32_event_log/
git_integration_title: win32_event_log
guid: b04d6f04-947c-4068-b73d-f861adc39959
has_logo: true
integration_title: Win 32 event log
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.18.0
name: win32_event_log
public_title: Intégration Datadog-Win 32 event log
short_description: Envoyer des événements Windows à votre flux d'événements Datadog.
support: core
supported_os:
- windows
version: 1.1.1
---



## Aperçu

Cette vérification surveille les événements dans Windows Event Log et les transmet à Datadog.

## Implémentation
### Installation

Le check  Windows Event Log est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur n'importe quel host Windows.

### Configuration

Créez un fichier `win32_event_log.yaml` dans le dossier ` conf.d` de l'Agent. Consultez l'exemple du [canevas win32_event_log.yaml](https://github.com/DataDog/integrations-core/blob/master/win32_event_log/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

```
init_config:

instances:
  - host: localhost
```

Ce fichier minimal capture tous les événements de localhost, mais vous pouvez configurer le check pour ne collecter que certains types d'événements. Consultez la [configuration de check d'exemple](https://github.com/DataDog/integrations-core/blob/master/win32_event_log/conf.yaml.example) pour trouver une liste complète et une description des options qui vous permettent de le faire.

[Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent) pour commencer à envoyer vos métriques Windows events à Datadog

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `win32_event_log` dans la section Checks:

```
  Checks
  ======
    [...]

    win32_event_log
    -------
      - instance #0 [OK]
      - Collected 0 metrics, 5 events & 0 service checks

    [...]
```

## Compatibilité

Le check win32_event_log est compatible avec toutes les plateformes Windows.

## Données collectées
### Métriques
L'intégration  Win32 Event log  n'inclut aucune métrique pour le moment.

### Evénements
Tous les événements Windows sont envoyés dans votre application Datadog.

### Checks de Service
Le check Win32 Event log n'inclut aucun check de service pour le moment.

## Troubleshooting

Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
### Base de connaissances

* [Comment ajouter des logs à la classe WMI `Win32_NTLogEvent`](https://docs.datadoghq.com/integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class/)

### Blog

* [Monitorer Windows Server 2012](https://www.datadoghq.com/blog/monitoring-windows-server-2012/)
* [Comment collecter les métriques Windows Server 2012](https://www.datadoghq.com/blog/collect-windows-server-2012-metrics/)
* [Monitorer Windows Server 2012 avec Datadog](https://www.datadoghq.com/blog/windows-server-monitoring/)


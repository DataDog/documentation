---
aliases:
  - /fr/integrations/event_viewer/
  - /fr/integrations/eventviewer/
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/win32_event_log/README.md'
display_name: Win32
git_integration_title: win32_event_log
guid: b04d6f04-947c-4068-b73d-f861adc39959
integration_id: win32-event-log
integration_title: Log d'événement Win32
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: win32_event_log.
name: win32_event_log
public_title: Intégration Datadog/Log d'événements Win32
short_description: Envoyer des événements Windows à votre flux d'événements Datadog.
support: core
supported_os:
  - windows
---
## Présentation

Le check du log d'événements Win32 surveille les logs d'événement Windows et les transmet à Datadog. Activez ce check pour :

- Surveiller des événements système et d'application dans Datadog.
- Corréler les événements système et d'application avec le reste de votre application.

## Implémentation
### Installation

Le check du log d'événements Windows est inclus avec le paquet de l'[Agent Datadog][1]. Aucune installation supplémentaire n'est nécessaire.

### Configuration

1. Modifiez le fichier `win32_event_log.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple win32_event_log.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4] pour commencer à envoyer des événements Windows à Datadog.

### Collecte de logs

Pour recueillir des logs à partir de certains événements Windows, ajoutez manuellement les canaux au fichier `conf.d/win32_event_log.d/conf.yaml` ou via Datadog Agent Manager.

Pour consulter la liste des canaux, exécutez la commande suivante dans PowerShell :

```powershell
Get-WinEvent -ListLog *
```

Pour connaître les canaux les plus actifs, exécutez la commande suivante dans PowerShell :

```powershell
Get-WinEvent -ListLog * | sort RecordCount -Descending
```

Cette commande affiche les canaux au format `LogMode MaximumSizeInBytes RecordCount LogName`. Exemple de réponse :

```
LogMode MaximumSizeInBytes RecordCount LogName
Circular 134217728 249896 Security
```

La valeur sous la colonne `LogName` est le nom du canal. Dans l'exemple ci-dessus, le nom du canal est `Security`.

Ajoutez ensuite les canaux dans votre fichier de configuration `win32_event_log.d/conf.yaml` :

```
logs:
  - type: windows_event
    channel_path: <CANAL_1>
    source: <CANAL_1>
    service: myservice
    sourcecategory: windowsevent

  - type: windows_event
    channel_path: <CANAL_2>
    source: <CANAL_2>
    service: myservice
    sourcecategory: windowsevent
```

Remplacez les paramètres `<CANAL_X>` par le nom du canal Windows pour lequel vous souhaitez recueillir des événements.
Définissez le même nom de canal pour le paramètre `source` correspondant afin de bénéficier de la [configuration de pipeline de traitement d'intégration automatique][5].

Enfin, [redémarrez l'Agent][4].

**Remarque** : pour le canal de logs de sécurité, veillez à ce que votre utilisateur Datadog Agent soit ajouté à la liste `Event Log Readers`.

### Filtres
Utilisez l'observateur d'événements Windows pour afficher la liste de tous les logs d'événement pouvant être capturés avec cette intégration.

Pour déterminer les valeurs exactes, faites en sorte que vos filtres utilisent la commande PowerShell suivante :

```
Get-WmiObject -Class Win32_NTLogEvent
```

Par exemple, pour afficher l'événement le plus récent logué dans le fichier de log `Security`, utilisez :

```
Get-WmiObject -Class Win32_NTLogEvent -Filter "LogFile='Security'" | select -First 1
```

Les valeurs énumérées dans la sortie de commande peuvent être définies dans `win32_event_log.yaml` pour capturer le même type d'événements.

<div class="alert alert-info">
Les informations données par la commande PowerShell <code> Get-EventLog</code> ou l'observateur d'événements Windows peuvent être légèrement différentes de <code>Get-WmiObject</code>.<br>
Vérifiez les valeurs de vos filtres en les comparant avec <code>Get-WmiObject</code> si l'intégration ne capture pas les événements que vous avez définis.
</div>

1. Configurez un ou plusieurs filtres pour le log d'événement. Un filtre vous permet de choisir les événements de log vous souhaitez envoyer à Datadog.

Filtrez les propriétés suivantes :

* type : Warning, Error ou Information
* log_file : Application, System, Setup ou Security
* source_name : n'importe quel nom de source
* user : n'importe quel nom d'utilisateur

Pour chaque filtre, ajoutez une instance dans le fichier de configuration `conf.d/win32_event_log.yaml`.

Quelques exemples de filtres :

```yaml
instances:
    # Le code suivant capture les erreurs et les avertissements de SQL Server,
    # qui applique la source MSSQLSERVER et le tag #sqlserver à tous les événements.
    -   tags:
            - sqlserver
        type:
            - Warning
            - Error
        log_file:
            - Application
        source_name:
            - MSSQLSERVER

    # Cette instance capture toutes les erreurs système en appliquant le tag #system
       -   tags:
            - system
        type:
            - Error
        log_file:
            - System
```

2. [Redémarrez l'Agent][4] à l'aide de Datadog Agent Manager (ou redémarrez le service)

### Validation

Vérifiez la page d'informations dans Datadog Agent Manager ou exécutez la [sous-commande `status` de l'Agent][6] et cherchez `win32_event_log`sous la section Checks. Une section semblable à ce qui suit devrait s'afficher :

```shell
Checks
======

  [...]

  win32_event_log
  ---------------
      - instance #0 [OK]
      - Collected 0 metrics, 2 events & 1 service check
```

## Données collectées
### Métriques
Le check du log d'événement Win32 n'inclut aucune métrique.

### Événements
Tous les événements Windows sont transmis à votre application Datadog.

### Checks de service
Le check du log d'événements Win32 n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin
### Documentation

* [Comment ajouter des fichiers de log d'événement à la classe WMI `Win32_NTLogEvent`][8]

### Blog

* [Surveillance de Windows Server 2012][9]
* [Comment recueillir des métriques de Windows Server 2012][10]
* [Surveillance de Windows Server 2012 avec Datadog][11]


[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/win32_event_log/datadog_checks/win32_event_log/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/logs/processing/pipelines/#integration-pipelines
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/help
[8]: https://docs.datadoghq.com/fr/integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
[9]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[10]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[11]: https://www.datadoghq.com/blog/windows-server-monitoring


{{< get-dependencies >}}
---
disable_toc: false
private: true
title: Commandes de l'Agent 5
---

## Section Overview

Cette page couvre les commandes de l'Agent 5. Datadog recommande d'installer ou de mettre à niveau vers l'Agent 7 pour bénéficier des dernières fonctionnalités. Pour plus d'informations sur l'installation de la dernière version de l'Agent, suivez les [instructions d'installation de l'Agent 7][1]. Pour plus d'informations sur la mise à niveau vers l'Agent 7 depuis une version antérieure, consultez la section [Mettre à niveau vers l'Agent Datadog v7][2].

**Remarque** : si le wrapper de `service` n'est pas disponible sur votre système, utilisez :

* Sur les systèmes basés sur `upstart` : `sudo start/stop/restart/status datadog-agent`
* Sur les systèmes basés sur `systemd` : `sudo systemctl start/stop/restart/status datadog-agent`


## Démarrer, arrêter et redémarrer l'Agent

### Démarrer l'Agent

Liste des commandes pour démarrer l'Agent Datadog :

| Plateforme | Commande                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent start`        |
| Docker   | Consultez la [documentation de l'Agent Docker][3].  |
| macOS    | `/usr/local/bin/datadog-agent start`      |
| Source   | `sudo ~/.datadog-agent/bin/agent start`   |
| Windows  | Consultez la section [Commandes Windows](#commandes-windows). |

### Arrêter l'Agent

Liste des commandes pour arrêter l'Agent Datadog :

| Plateforme | Commande                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent stop`         |
| Docker   | Consultez la [documentation de l'Agent Docker][3].  |
| macOS    | `/usr/local/bin/datadog-agent stop`       |
| Source   | `sudo ~/.datadog-agent/bin/agent stop`    |
| Windows  | Consultez la section [Commandes Windows](#commandes-windows). |

### Redémarrer l'Agent

Liste des commandes pour redémarrer l'Agent Datadog :

| Plateforme | Commande                                   |
|----------|-------------------------------------------|
| Linux    | `sudo service datadog-agent restart`      |
| Docker   | Consultez la [documentation de l'Agent Docker][3].  |
| macOS    | `/usr/local/bin/datadog-agent restart`    |
| Source   | `sudo ~/.datadog-agent/bin/agent restart` |
| Windows  | Consultez la section [Commandes Windows](#commandes-windows). |

## Statut et informations sur l'Agent

### Statut de service

Liste des commandes pour afficher le statut de l'Agent Datadog :

| Plateforme        | Commande                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <NOM_CONTENEUR> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <NOM_POD> -- /etc/init.d/datadog-agent status`        |
| macOS           | `datadog-agent status`                                                   |
| Source          | `sudo ~/.datadog-agent/bin/agent status`                                 |
| Windows         | Consultez la section [Commandes Windows](#commandes-windows).                               |

### Informations sur l'Agent

Liste des commandes pour afficher le statut de votre Agent Datadog et les intégrations activées.

| Plateforme   | Commande                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <NOM_CONTENEUR> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <NOM_POD> -- /etc/init.d/datadog-agent info`        |
| macOS      | `datadog-agent info`                                                   |
| Source     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | Consultez la section [Commandes Windows](#commandes-windows).                             |

Une intégration correctement configurée s'affiche dans la section **Checks** sans aucun avertissement ni aucune erreur, comme dans l'exemple ci-dessous :

```text
Checks
======
 network
 -------
   - instance #0 [OK]
   - Collected 15 metrics, 0 events & 1 service check
```

### Informations de statut sur Windows

Pour vous assurer que l'Agent est bien lancé, vérifiez si l'état du service indique *En cours d'exécution* dans la liste des services Windows. Un processus appelé `ddagent.exe` doit également être présent dans le gestionnaire des tâches.

Pour obtenir plus d'informations sur l'état de l'Agent pour les versions 5.2+, accédez à *Datadog Agent Manager -> Settings -> Agent Status* :

{{< img src="agent/faq/windows_status.png" alt="Statut Windows" style="width:50%;" >}}

Pour connaître le statut des versions 3.9.1 à 5.1 de l'Agent, accédez à `http://localhost:17125/status`.

La commande info est disponible pour PowerShell :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<VERSION_MAJEURE_PYTHON>\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" info
```

ou cmd.exe :

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" info
```

## Commandes Windows

Utilisez Datadog Agent Manager (disponible depuis le menu Démarrer).

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="Menu Démarrer Windows" style="width:75%;">}}

Utilisez les commandes `start`, `stop` et `restart` dans Datadog Agent Manager :

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Snapshot de Datadog Agent Manager" style="width:75%;">}}

Vous pouvez également utiliser Windows PowerShell, lorsqu'il est disponible :
`[start|stop|restart]-service datadogagent`


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /fr/agent/versions/upgrade_to_agent_v7/
[3]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
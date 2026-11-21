---
algolia:
  tags:
  - agent status command
aliases:
- /fr/agent/faq/agent-status-and-information
- /fr/agent/faq/start-stop-restart-the-datadog-agent
- /fr/agent/faq/agent-commands
- /fr/agent/guide/agent-commands
description: Référence complète des commandes de l'Agent Datadog pour démarrer et
  arrêter l'Agent, résoudre les problèmes et le gérer.
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Dépannage de l'Agent
title: Commandes de l'Agent
---
<div class="alert alert-danger">
Pour les systèmes basés sur Linux où la <code>service</code> commande wrapper n'est pas disponible, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">consultez la liste des alternatives</a>.
</div>

## Démarrer, arrêter et redémarrer l'Agent {#start-stop-and-restart-the-agent}

### Démarrer l'Agent {#start-the-agent}

Liste des commandes pour démarrer l'Agent Datadog :

| Plateforme   | Commande                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -g datadog-agent`                                        |
| Linux      | Consultez la [documentation de l'Agent][1] pour votre système d'exploitation.                      |
| Docker     | Utilisez la [commande d'installation][2].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | Consultez la [documentation de l'Agent pour macOS][9].                            |
| Source     | `sudo service datadog-agent start`                                 |
| Windows    | Consultez la [documentation de l'Agent pour Windows][3].                          |

### Arrêter l'Agent {#stop-the-agent}

Liste des commandes pour arrêter l'Agent Datadog :

| Plateforme | Commande                                                                         |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -g datadog-agent`                                                       |
| Linux      | Consultez la [documentation de l'Agent][1] pour votre système d'exploitation.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`— remarque : le pod est automatiquement replanifié |
| macOS      | Consultez la [documentation de l'Agent pour macOS][9].                                          |
| Source     | `sudo service datadog-agent stop`                                                |
| Windows    | Consultez la [documentation de l'Agent pour Windows][3].                                        |

### Redémarrez l'Agent {#restart-the-agent}

Liste des commandes pour redémarrer l'Agent Datadog :

| Plateforme | Commande                                                                         |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -g datadog-agent`, puis `startsrc -g datadog-agent`                     |
| Linux      | Consultez la [documentation de l'Agent][1] pour votre système d'exploitation.                                    |
| Docker     | Utilisez la [commande d'installation][2].                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`— remarque : le pod est automatiquement replanifié |
| macOS      | Consultez la [documentation de l'Agent pour macOS][9].                                          |
| Source     | *Plateforme non prise en charge*                                                           |
| Windows    | Consultez la [documentation de l'Agent pour Windows][3].                                        |


## État et informations de l'Agent {#agent-status-and-information}

### État du service {#service-status}

Liste des commandes pour afficher l'état de l'Agent Datadog :

| Plateforme        | Commande                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -g datadog-agent`                                                      |
| Linux           | Consultez la [documentation de l'Agent][1] pour votre système d'exploitation.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | Consultez la [documentation de l'Agent pour macOS][9].                                       |
| Source          | `sudo service datadog-agent status`                                           |
| Windows         | Consultez la [documentation de l'Agent pour Windows][4].                                     |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`                                     |

### Informations sur l'Agent {#agent-information}

Liste des commandes permettant d'afficher l'état de votre Agent Datadog et des intégrations activées.

| Plateforme   | Commande                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | Consultez la [documentation de l'Agent pour macOS][9].              |
| Source     | `sudo datadog-agent status`                          |
| Windows    | Consultez la [documentation de l'Agent pour Windows][4].            |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`       |

Une intégration correctement configurée s'affiche sous **Running Checks** sans avertissement ni erreur, comme illustré ci-dessous :

```text
Running Checks
==============
  network (1.6.0)
  ---------------
    Total Runs: 5
    Metric Samples: 26, Total: 130
    Events: 0, Total: 0
    Service Checks: 0, Total: 0
    Average Execution Time : 0ms
```

## Autres commandes {#other-commands}

L'interface de ligne de commande de l'Agent est basée sur des sous-commandes. Pour voir la liste des sous-commandes disponibles, exécutez :

```shell
<AGENT_BINARY> --help
```

Pour exécuter une sous-commande, le binaire de l'Agent doit être invoqué :

```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

Certaines options comportent des flags et des options détaillés sous `--help`. Par exemple, utilisez help avec la sous-commande `check` :

```shell
<AGENT_BINARY> check --help
```

| Sous-commande        | Notes                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | Exécute la vérification spécifiée.                                                    |
| `config`          | [Gestion de la configuration d'exécution][7].                                      |
| `configcheck`     | Affiche toutes les configurations chargées et résolues d'un Agent en cours d'exécution.              |
| `diagnose`        | Exécute un diagnostic de connectivité sur votre système.                              |
| `flare`           | [Collecter un flare et l'envoyer à Datadog][8].                                |
| `health`          | Affiche l'état de santé actuel de l'Agent.                                             |
| `help`            | Aide sur n'importe quelle commande.                                                     |
| `hostname`        | Affiche le nom d'hôte utilisé par l'Agent.                                       |
| `import`          | Importe et convertit les fichiers de configuration des versions précédentes de l'Agent. |
| `jmx`             | Dépannage JMX.                                                        |
| `launch-gui`      | Démarre l'interface graphique de l'Agent Datadog.                                                |
| `restart-service` | Redémarre l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.         |
| `start-service`   | Démarre l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.           |
| `stream-logs`     | Affiche en continu les journaux traités par un Agent en cours d'exécution.                         |
| `stopservice`     | Arrête l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.            |
| `version`         | Affiche les informations de version.                                                         |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/agent/docker/
[3]: /fr/agent/basic_agent_usage/windows/
[4]: /fr/agent/basic_agent_usage/windows/#status-and-information
[5]: /fr/containers/cluster_agent/
[6]: /fr/agent/basic_agent_usage/#gui
[7]: /fr/agent/troubleshooting/config/
[8]: /fr/agent/troubleshooting/send_a_flare/
[9]: /fr/agent/supported_platforms/osx/
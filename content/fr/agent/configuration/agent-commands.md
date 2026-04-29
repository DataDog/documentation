---
algolia:
  tags:
  - agent status command
aliases:
- /fr/agent/faq/agent-status-and-information
- /fr/agent/faq/start-stop-restart-the-datadog-agent
- /fr/agent/faq/agent-commands
- /fr/agent/guide/agent-commands
description: Référence complète des commandes de l'Agent Datadog pour démarrer, arrêter,
  dépanner et gérer l'Agent.
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Dépannage de l'Agent
title: Commandes de l'Agent
---
<div class="alert alert-danger">
Pour les systèmes basés sur Linux où la commande <code>service</code> wrapper n'est pas disponible, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">consultez la liste des alternatives</a>.
</div>

## Démarrer, arrêter et redémarrer l’Agent {#start-stop-and-restart-the-agent}

### Démarrer l'Agent {#start-the-agent}

Liste des commandes pour démarrer l'Agent Datadog :

| Plateforme   | Commande                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | Consultez la [documentation de l'Agent][1] pour votre système d'exploitation.                      |
| Docker     | Utilisez la [commande d'installation][2].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *ou* via l'application systray |
| Source     | `sudo service datadog-agent start`                                 |
| Windows    | Consultez la [documentation de l'Agent Windows][3].                          |

### Arrêter l'Agent {#stop-the-agent}

Liste des commandes pour arrêter l'Agent Datadog :

| Plateforme   | Commande                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | Consultez la [documentation de l'Agent][1] pour votre système d'exploitation.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—note : le pod est automatiquement replanifié |
| macOS      | `launchctl stop com.datadoghq.agent` *ou* via l'application systray                |
| Source     | `sudo service datadog-agent stop`                                                |
| Windows    | Consultez la [documentation de l'Agent Windows][3].                                        |

### Redémarrez l'Agent {#restart-the-agent}

Liste des commandes pour redémarrer l'Agent Datadog :

| Plateforme   | Commande                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | Consultez la [documentation de l'Agent][1] pour votre système d'exploitation.                                    |
| Docker     | Utilisez la [commande d'installation][2].                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`—note : le pod est automatiquement replanifié |
| macOS      | Arrêtez puis redémarrez l'Agent avec :<br>`launchctl stop com.datadoghq.agent`<br>`launchctl start com.datadoghq.agent`<br>Ou utilisez l'application systray |
| Source     | * Plateforme non prise en charge *                                                           |
| Windows    | Consultez la [documentation de l'Agent Windows][3].                                        |


## État et informations de l'Agent {#agent-status-and-information}

### État du service {#service-status}

Liste des commandes pour afficher le statut de l'Agent Datadog :

| Plateforme        | Commande                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | Consultez la [documentation de l'Agent][1] pour votre système d'exploitation.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` * ou * via l'application systray             |
| Source          | `sudo service datadog-agent status`                                           |
| Windows         | Consultez la [documentation de l'Agent Windows][4].                                     |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`                                     |

### Informations sur l'agent {#agent-information}

Liste des commandes pour afficher le statut de votre Agent Datadog et les intégrations activées.

| Plateforme   | Commande                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` ou via le [web GUI][6]   |
| Source     | `sudo datadog-agent status`                          |
| Windows    | Consultez la [documentation de l'Agent Windows][4].            |
| [Cluster Agent (Kubernetes)][5] | `datadog-cluster-agent status`       |

Une intégration correctement configurée est affichée sous **Vérifications en cours** sans avertissements ni erreurs, comme indiqué ci-dessous :

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

L'interface de ligne de commande de l'Agent est basée sur des sous-commandes. Pour voir la liste des sous-commandes disponibles, exécutez :

```shell
<AGENT_BINARY> --help
```

Pour exécuter une sous-commande, vous devez invoquer le binaire de l'Agent :

```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

Certaines options ont des flags et des options détaillés sous `--help`. Par exemple, utilisez l'aide avec la sous-commande `check` :

```shell
<AGENT_BINARY> check --help
```

| Sous-commande        | Remarques                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | Exécutez la vérification spécifiée.                                                    |
| `config`          | [Gestion de la configuration d'exécution][7].                                      |
| `configcheck`     | Imprimez toutes les configurations chargées et résolues d'un Agent en cours d'exécution.              |
| `diagnose`        | Exécutez un diagnostic de connectivité sur votre système.                              |
| `flare`           | [Collectez un flare et envoyez-le à Datadog][8].                                |
| `health`          | Imprimez l'état actuel de l'Agent.                                             |
| `help`            | Aide sur n'importe quelle commande.                                                     |
| `hostname`        | Imprimez le nom d'hôte utilisé par l'Agent.                                       |
| `import`          | Importez et convertissez les fichiers de configuration des versions précédentes de l'Agent. |
| `jmx`             | Dépannage JMX.                                                        |
| `launch-gui`      | Démarrez l'interface graphique de l'Agent Datadog.                                                |
| `restart-service` | Redémarrez l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.         |
| `start-service`   | Démarrez l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.           |
| `stream-logs`     | Diffusez les journaux traités par un Agent en cours d'exécution.                         |
| `stopservice`     | Arrêtez l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.            |
| `version`         | Imprimez les informations sur la version.                                                         |

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/agent/docker/
[3]: /fr/agent/basic_agent_usage/windows/
[4]: /fr/agent/basic_agent_usage/windows/#status-and-information
[5]: /fr/containers/cluster_agent/
[6]: /fr/agent/basic_agent_usage/#gui
[7]: /fr/agent/troubleshooting/config/
[8]: /fr/agent/troubleshooting/send_a_flare/
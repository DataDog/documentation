---
algolia:
  tags:
  - commande statut de l'Agent
aliases:
- /fr/agent/faq/agent-status-and-information
- /fr/agent/faq/start-stop-restart-the-datadog-agent
- /fr/agent/faq/agent-commands
- /fr/agent/guide/agent-commands
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Dépannage de l'Agent
title: Commandes de l'Agent
---

<div class="alert alert-warning">
Pour les systèmes basés sur Linux où la commande <code>service</code> wrapper n'est pas disponible, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">consultez la liste des alternatives</a>.
</div>

## Démarrer, arrêter et redémarrer l'Agent

### Démarrer l'Agent

Liste des commandes pour démarrer l'Agent Datadog :

| Plateforme   | Commande                                                            |
|------------|--------------------------------------------------------------------|
| AIX        | `startsrc -s datadog-agent`                                        |
| Linux      | Consultez la [documentation relative à l'Agent][1] pour votre système d'exploitation.                      |
| Docker     | Utilisez la [commande d'installation][2].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *ou* via la barre des menus |
| Source     | `sudo service datadog-agent start`                                 |
| Windows    | Consultez la [documentation dédiée à l'Agent pour Windows][3].                          |

### Arrêter l'Agent

Liste des commandes pour arrêter l'Agent Datadog :

| Plateforme   | Commande                                                                          |
|------------|----------------------------------------------------------------------------------|
| AIX        | `stopsrc -s datadog-agent`                                                       |
| Linux      | Consultez la [documentation relative à l'Agent][1] pour votre système d'exploitation.                                    |
| Docker     | `docker exec -it <NOM_CONTENEUR> agent stop`                                    |
| Kubernetes | `kubectl delete pod <NOM POD AGENT>`— remarque : le pod est automatiquement replanifié |
| macOS      | `launchctl stop com.datadoghq.agent` *ou* via la barre des menus                |
| Source     | `sudo service datadog-agent stop`                                                |
| Windows    | Consultez la [documentation dédiée à l'Agent pour Windows][3].                                        |

### Redémarrer l'Agent

Liste des commandes pour redémarrer l'Agent Datadog :

| Plateforme   | Commande                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | Consultez la [documentation relative à l'Agent][1] pour votre système d'exploitation.                                    |
| Docker     | Utilisez la [commande d'installation][2].                                               |
| Kubernetes | `kubectl delete pod <NOM POD AGENT>`— remarque : le pod est automatiquement replanifié |
| macOS      | Arrêtez puis relancez l'Agent avec :<br>`launchctl stop com.datadoghq.agent`<br>`launchctl start com.datadoghq.agent`<br>. Vous pouvez aussi utiliser l'application systray. |
| Source     | *Plateforme non prise en charge*                                                           |
| Windows    | Consultez la [documentation dédiée à l'Agent pour Windows][3].                                        |


## Statut et informations sur l'Agent

### Statut de service

Liste des commandes pour afficher le statut de l'Agent Datadog :

| Plateforme        | Commande                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | Consultez la [documentation relative à l'Agent][1] pour votre système d'exploitation.                                 |
| Docker (Debian) | `sudo docker exec -it <NOM_CONTENEUR> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <NOM_POD> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *ou* via la barre des menus             |
| Source          | `sudo service datadog-agent status`                                           |
| Windows         | Consultez la [documentation dédiée à l'Agent pour Windows][4].                                     |
| [Agent de cluster (Kubernetes)][5] | `datadog-cluster-agent status`                                     |

### Informations sur l'Agent

Liste des commandes pour afficher le statut de votre Agent Datadog et les intégrations activées.

| Plateforme   | Commande                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <NOM_CONTENEUR> agent status` |
| Kubernetes | `kubectl exec -it <NOM_POD> -- agent status`        |
| macOS      | `datadog-agent status` ou via l'[interface graphique Web][6]   |
| Source     | `sudo datadog-agent status`                          |
| Windows    | Consultez la [documentation dédiée à l'Agent pour Windows][4].            |
| [Agent de cluster (Kubernetes)][5] | `datadog-cluster-agent status`       |

Une intégration correctement configurée s'affiche dans la section **Running Checks** sans aucun avertissement ni aucune erreur, comme dans l'exemple ci-dessous :

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

## Autres commandes

L'interface de ligne de commande pour l'Agent est basée sur un système de sous-commandes. Pour consulter la liste des sous-commandes disponibles, exécutez ce qui suit : 
```shell
<BINAIRE_AGENT> --help
```

Pour exécuter une sous-commande, vous devez appeler le binaire de l'Agent :
```shell
<BINAIRE_AGENT> <SOUS_COMMANDE> <OPTIONS>
```

Certaines options disposent de flags et d'options détaillées que vous pouvez consulter avec `--help`. Par exemple, pour afficher les informations d'aide de la sous-commande `check` :
```shell
<BINAIRE_AGENT> check --help
```

| Sous-commande        | Remarques                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | Exécute le check spécifié.                                                    |
| `config`          | [Gestion de la configuration du runtime][7].                                      |
| `configcheck`     | Affiche toutes les configurations chargées et résolues d'un Agent en cours d'exécution.              |
| `diagnose`        | Exécute un diagnostic de connectivité sur votre système.                              |
| `flare`           | [Recueille et envoie un flare à Datadog][8].                                |
| `health`          | Affiche la santé actuelle de l'Agent.                                             |
| `help`            | Affiche des informations d'aide pour n'importe quelle commande.                                                     |
| `hostname`        | Affiche le hostname utilisé par l'Agent.                                       |
| `import`          | Importe et convertit les fichiers de configuration d'une version précédente de l'Agent. |
| `jmx`             | Dépannage JMX.                                                        |
| `launch-gui`      | Démarre l'interface graphique de l'Agent Datadog.                                                |
| `restart-service` | Redémarre l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.         |
| `start-service`   | Démarre l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.           |
| `stream-logs`     | Diffuse les logs en cours de traitement par un Agent exécuté.                         |
| `stopservice`     | Arrête l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.            |
| `version`         | Affiche les informations sur la version.                                                         |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/agent/docker/
[3]: /fr/agent/basic_agent_usage/windows/
[4]: /fr/agent/basic_agent_usage/windows/#status-and-information
[5]: /fr/containers/cluster_agent/
[6]: /fr/agent/basic_agent_usage/#gui
[7]: /fr/agent/troubleshooting/config/
[8]: /fr/agent/troubleshooting/send_a_flare/
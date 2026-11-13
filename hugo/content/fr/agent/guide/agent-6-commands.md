---
disable_toc: false
private: true
title: Commandes de l'Agent 6
---
## Présentation {#overview}

Cette page couvre les commandes de l'Agent 6. Datadog recommande d'installer ou de mettre à niveau vers l'Agent 7 pour bénéficier des dernières fonctionnalités. Pour plus d'informations sur l'installation de la dernière version de l'Agent, suivez les [instructions d'installation de l'Agent 7][1]. Pour plus d'informations sur la mise à niveau vers l'Agent 7 à partir d'une version antérieure, consultez [Mise à niveau vers Datadog Agent v7][2].

## Démarrer, arrêter et redémarrer l'Agent {#start-stop-and-restart-the-agent}

### Démarrer l'Agent {#start-the-agent}

Liste des commandes pour démarrer le Datadog Agent :

| Plateforme   | Commande                                                            |
|------------|--------------------------------------------------------------------|
| Linux      | Consultez la [documentation de l'Agent][3] pour votre système d'exploitation.                      |
| Docker     | Utilisez la [commande d'installation][4].                                 |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                             |
| macOS      | `launchctl start com.datadoghq.agent` *ou* via l'application de la barre d'état système |
| Source     | `sudo service datadog-agent start`                                 |
| Windows    | Consultez la [documentation de l'Agent Windows][5].                          |

### Arrêter l'Agent {#stop-the-agent}

Liste des commandes pour arrêter le Datadog Agent :

| Plateforme   | Commande                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | Consultez la [documentation de l'Agent][3] pour votre système d'exploitation.                                    |
| Docker     | `docker exec -it <CONTAINER_NAME> agent stop`                                    |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`— remarque : le pod est automatiquement replanifié |
| macOS      | `launchctl stop com.datadoghq.agent` *ou* via l'application de la barre d'état système                |
| Source     | `sudo service datadog-agent stop`                                                |
| Windows    | Consultez la [documentation de l'Agent Windows][5].                                        |

### Redémarrez l'Agent {#restart-the-agent}

Liste des commandes pour redémarrer le Datadog Agent :

| Plateforme   | Commande                                                                          |
|------------|----------------------------------------------------------------------------------|
| Linux      | Consultez la [documentation de l'Agent][3] pour votre système d'exploitation.                                    |
| Docker     | Utilisez la [commande d'installation][4].                                               |
| Kubernetes | `kubectl delete pod <AGENT POD NAME>`— remarque : le pod est automatiquement replanifié |
| macOS      | exécutez `stop` puis `start`, *ou* via l'application de la barre d'état système                            |
| Source     | *Plateforme non prise en charge*                                                           |
| Windows    | Consultez la [documentation de l'Agent Windows][3].                                        |

## État et informations de l'Agent {#agent-status-and-information}

### État du service {#service-status}

Liste des commandes pour afficher l'état du Datadog Agent :

| Plateforme        | Commande                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| Linux           | Consultez la [documentation de l'Agent][3] pour votre système d'exploitation.                                 |
| Docker (Debian) | `sudo docker exec -it <CONTAINER_NAME> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <POD_NAME> -- s6-svstat /var/run/s6/services/agent/`        |
| macOS           | `launchctl list com.datadoghq.agent` *ou* via l'application de la barre d'état système             |
| Source          | `sudo service datadog-agent status`                                           |
| Windows         | Consultez la [documentation de l'Agent Windows][5].                                     |

### Informations sur l'Agent {#agent-information}

Liste des commandes pour afficher l'état de votre Datadog Agent et des Integrations activées.

| Plateforme   | Commande                                              |
|------------|------------------------------------------------------|
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <CONTAINER_NAME> agent status` |
| Kubernetes | `kubectl exec -it <POD_NAME> -- agent status`        |
| macOS      | `datadog-agent status` ou via l'[interface utilisateur Web][7]   |
| Source     | `sudo datadog-agent status`                          |
| Windows    | Consultez la [documentation de l'Agent Windows][5].            |

Une intégration correctement configurée s'affiche sous **Running Checks** sans avertissement ni erreur, comme illustré ci-dessous :

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

L'interface de ligne de commande de l'Agent v6 est basée sur des sous-commandes. Pour voir la liste des sous-commandes disponibles, exécutez :

```shell
<AGENT_BINARY> --help
```

Pour exécuter une sous-commande, le binaire de l'Agent doit être appelé :

```shell
<AGENT_BINARY> <SUB_COMMAND> <OPTIONS>
```

Certaines options possèdent des indicateurs et des options détaillés sous `--help`. Par exemple, utilisez help avec la sous-commande `check` :

```shell
<AGENT_BINARY> check --help
```

| Sous-commande        | Notes                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | Exécute la vérification spécifiée.                                                    |
| `config`          | [Gestion de la configuration du runtime][8].                                      |
| `configcheck`     | Affiche toutes les configurations chargées et résolues d'un Agent en cours d'exécution.              |
| `diagnose`        | Exécute un diagnostic de connectivité sur votre système.                              |
| `flare`           | [Collecte un flare et l'envoie à Datadog][9].                                |
| `health`          | Affiche l'état de santé actuel de l'Agent.                                             |
| `help`            | Aide sur n'importe quelle commande.                                                     |
| `hostname`        | Affiche le nom d'hôte utilisé par l'Agent.                                       |
| `import`          | Importe et convertit les fichiers de configuration des versions précédentes de l'Agent. |
| `jmx`             | Dépannage JMX.                                                        |
| `launch-gui`      | Démarre l'interface graphique du Datadog Agent.                                                |
| `restart-service` | Redémarre l'Agent au sein du gestionnaire de contrôle des services. Windows uniquement.         |
| `start-service`   | Démarre l'Agent au sein du gestionnaire de contrôle des services. Windows uniquement.           |
| `stream-logs`     | Diffuse en continu les journaux traités par un Agent en cours d'exécution.                         |
| `stopservice`     | Arrête l'Agent au sein du gestionnaire de contrôle des services. Windows uniquement.            |
| `version`         | Affiche les informations de version.                                                         |

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /fr/agent/versions/upgrade_to_agent_v7/
[3]: /fr/agent/
[4]: /fr/agent/docker/
[5]: /fr/agent/basic_agent_usage/windows/
[6]: /fr/agent/docker/?tab=standard#setup
[7]: /fr/agent/basic_agent_usage/#gui
[8]: /fr/agent/troubleshooting/config/
[9]: /fr/agent/troubleshooting/send_a_flare/
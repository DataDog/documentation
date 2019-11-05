---
title: Commandes de l'Agent
kind: guide
aliases:
  - /fr/agent/faq/agent-status-and-information
  - /fr/agent/faq/start-stop-restart-the-datadog-agent
  - /fr/agent/faq/agent-commands
further_reading:
  - link: /agent/troubleshooting
    tag: Documentation
    text: Dépannage de l'Agent
---
<div class="alert alert-warning">
Pour les systèmes basés sur Linux où la commande <code>service</code> wrapper n'est pas disponible, <a href="/agent/faq/agent-v6-changes/?tab=linux#service-lifecycle-commands">consultez la liste des alternatives</a>.
</div>

## Démarrer, arrêter et redémarrer l'Agent

### Démarre l'Agent

Liste des commandes pour démarrer l'Agent Datadog :

{{< tabs >}}
{{% tab "Agent v6" %}}

| Plateforme   | Commandes                                                        |
| ---------- | --------------------------                                     |
| AIX        | `startsrc -s datadog-agent`                                    |
| Linux      | `sudo service datadog-agent start`                             |
| Docker     | [Consultez la documentation relative à Docker][1]                    |
| macOS      | `launchctl start com.datadoghq.agent` *ou* via la barre des menus |
| Source     | `sudo service datadog-agent start`                             |
| Windows    | [Consultez la documentation relative à Windows][2]                   |


[1]: /fr/agent/docker
[2]: /fr/agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plateforme | Commandes                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent start`           |
| Docker   | [Consultez la documentation relative à Docker][1]  |
| macOS    | `/usr/local/bin/datadog-agent start`         |
| Source   | `sudo ~/.datadog-agent/bin/agent start`      |
| Windows  | [Consultez la documentation relative à Windows][2] |


[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /fr/agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

### Arrêter l'Agent

Liste des commandes pour arrêter l'Agent Datadog :

{{< tabs >}}
{{% tab "Agent v6" %}}

| Plateforme   | Commandes                                                       |
| ---------- | ---------------------------------------------                 |
| AIX        | `stopsrc -s datadog-agent`                                    |
| Linux      | `sudo service datadog-agent stop`                             |
| Docker     | [Consultez la documentation relative à Docker][1]                   |
| macOS      | `launchctl stop com.datadoghq.agent` *ou* via la barre des menus |
| Source     | `sudo service datadog-agent stop`                             |
| Windows    | [Consultez la documentation relative à Windows][2]                  |


[1]: /fr/agent/docker
[2]: /fr/agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plateforme | Commandes                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent stop`            |
| Docker   | [Consultez la documentation relative à Docker][1]  |
| macOS    | `/usr/local/bin/datadog-agent stop`          |
| Source   | `sudo ~/.datadog-agent/bin/agent stop`       |
| Windows  | [Consultez la documentation relative à Windows][2] |


[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /fr/agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

### Redémarrer l'Agent

Liste des commandes pour redémarrer l'Agent Datadog :

{{< tabs >}}
{{% tab "Agent v6" %}}

| Plateforme | Commandes                                           |
|----------|---------------------------------------------------|
| Linux    | `sudo service datadog-agent restart`              |
| Docker   | [Consultez la documentation relative à Docker][1]       |
| macOS    | exécuter `stop` puis `start` *ou* via la barre des menus |
| Source   | *Plateforme non prise en charge*                            |
| Windows  | [Consultez la documentation relative à Windows][2]      |


[1]: /fr/agent/docker
[2]: /fr/agent/basic_agent_usage/windows
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plateforme | Commandes                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent restart`         |
| Docker   | [Consultez la documentation relative à Docker][1]  |
| macOS    | `/usr/local/bin/datadog-agent restart`       |
| Source   | `sudo ~/.datadog-agent/bin/agent restart`    |
| Windows  | [Consultez la documentation relative à Windows][2] |


[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /fr/agent/basic_agent_usage/windows
{{% /tab %}}
{{< /tabs >}}

## Statut et informations de l'Agent

### Statut du service

Liste des commandes pour afficher le statut de l'Agent Datadog :

{{< tabs >}}
{{% tab "Agent v6" %}}

| Plateforme          | Commandes                                                                       |
| ----------------- | ---------------------------------------------------------                     |
| AIX               | `lssrc -s datadog-agent`                                                      |
| Linux             | `sudo service datadog-agent status`                                           |
| Docker (Debian)   | `sudo docker exec -it <nom_conteneur> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes        | `kubectl exec -it <nom-pod> s6-svstat /var/run/s6/services/agent/`           |
| macOS             | `launchctl list com.datadoghq.agent` *ou* via la barre des menus                 |
| Source            | `sudo service datadog-agent status`                                           |


{{% /tab %}}
{{% tab "Agent v5" %}}

| Plateforme        | Commandes                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <nom_conteneur> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <nom-pod> /etc/init.d/datadog-agent status`           |
| macOS           | `datadog-agent status`                                                   |
| Source          | `sudo ~/.datadog-agent/bin/agent status`                                 |
| Windows         | [Consultez la documentation relative à Windows][1]                             |


[1]: /fr/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Agent de cluster" %}}

| Plateforme   | Commandes                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

### Informations de l'Agent

Liste des commandes pour afficher le statut de votre Agent Datadog et les intégrations activées.

{{< tabs >}}
{{% tab "Agent v6" %}}

| Plateforme     | Commandes                                                |
| ------------ | ------------------------------------------------------ |
| AIX          | `datadog-agent status`                                 |
| Linux        | `sudo datadog-agent status`                            |
| Docker       | `sudo docker exec -it <nom_conteneur> agent status`   |
| Kubernetes   | `kubectl exec -it <nom-pod> agent status`             |
| macOS        | `datadog-agent status` ou via l'[interface Web][1]         |
| Source       | `sudo datadog-agent status`                            |
| Windows      | [Consultez la documentation relative à Windows][2]           |

Une intégration correctement configurée s'affiche dans la section **Running Checks** sans aucun avertissement ni aucune erreur, comme dans l'exemple ci-dessous :

```
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


[1]: /fr/agent/basic_agent_usage/?tab=agentv6#gui
[2]: /fr/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plateforme   | Commandes                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <nom_conteneur> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <nom-pod> /etc/init.d/datadog-agent info`           |
| macOS      | `datadog-agent info`                                                   |
| Source     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | [Consultez la documentation relative à Windows][1]                           |

Une intégration correctement configurée s'affiche dans la section **Checks** sans aucun avertissement ni aucune erreur, comme dans l'exemple ci-dessous :

```
  Checks
  ======

   network
   -------
     - instance #0 [OK]
     - Collected 15 metrics, 0 events & 1 service check
```


[1]: /fr/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Agent de cluster" %}}

| Plateforme   | Commandes                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

## Autres commandes

{{< tabs >}}
{{% tab "Agent v6" %}}

L'interface de ligne de commande pour l'Agent v6 est basée sur un système de sous-commandes. Pour consulter la liste des sous-commandes disponibles, exécutez : 
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

| Commande         | Remarques                                                                       |
|-----------------|-----------------------------------------------------------------------------|
| `check`           | Exécute le check spécifié.                                                    |
| `configcheck`     | Affiche toutes les configurations chargées et résolues d'un Agent en cours d'exécution.            |
| `diagnose`        | Exécute un diagnostic de connectivité sur votre système.                         |
| `flare`           | Recueille et envoie un flare à Datadog.                                     |
| `health`          | Affiche la santé actuelle de l'Agent.                                             |
| `help`            | Aide pour n'importe quelle commande.                                                     |
| `hostname`        | Affiche le hostname utilisé par l'Agent.                                       |
| `import`          | Importe et convertit les fichiers de configuration des versions précédentes de l'Agent. |
| `installservice`  | Installe l'Agent dans le gestionnaire de contrôle de service.                      |
| `launch-gui`      | Démarre l'interface graphique de l'Agent Datadog.                                               |
| `regimport`       | Importe les paramètres de registre dans `datadog.yaml`.                           |
| `remove-service`  | Supprime l'Agent du gestionnaire de contrôle de service.                         |
| `restart-service` | Redémarre l'Agent dans le gestionnaire de contrôle de service.                      |
| `start-service`   | Démarre l'Agent dans le gestionnaire de contrôle de service.                        |
| `stopservice`     | Arrête l'Agent dans le gestionnaire de contrôle de service.                         |
| `jmx`             | Dépannage JMX.                                                         |
| `version`         | Affiche les informations sur la version.                                                     |

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
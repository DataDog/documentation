---
title: Commandes de l'Agent
kind: guide
aliases:
  - /fr/agent/faq/agent-status-and-information
  - /fr/agent/faq/start-stop-restart-the-datadog-agent
  - /fr/agent/faq/agent-commands
further_reading:
  - link: /agent/troubleshooting/
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
{{% tab "Agents v6 et v7" %}}

| Plate-forme | Commandes                                                        |
|----------|----------------------------------------------------------------|
| AIX      | `startsrc -s datadog-agent`                                    |
| Linux    | [Consultez la documentation dédiée à votre OS][1].               |
| Docker   | Utilisez la [commande d'installation][2].                    |
| Kubernetes | `kubectl create -f datadog-agent.yaml`                        |
| macOS    | `launchctl start com.datadoghq.agent` *ou* via la barre des menus |
| Source   | `sudo service datadog-agent start`                             |
| Windows  | [Consultez la documentation dédiée à Windows][3].                   |

[1]: /fr/agent/
[2]: /fr/agent/docker/
[3]: /fr/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plate-forme | Commande                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent start`           |
| Docker   | [Consultez la documentation relative à Docker][1].  |
| macOS    | `/usr/local/bin/datadog-agent start`         |
| Source   | `sudo ~/.datadog-agent/bin/agent start`      |
| Windows  | [Consultez la documentation relative à Windows][2]. |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /fr/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

### Arrêter l'Agent

Liste des commandes pour arrêter l'Agent Datadog :

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Plate-forme | Commande                                                       |
|----------|---------------------------------------------------------------|
| AIX      | `stopsrc -s datadog-agent`                                    |
| Linux    | [Consultez la documentation dédiée pour votre OS][1].              |
| Docker   | `docker exec -it <NOM_CONTENEUR> agent stop`                   |
| Kubernetes | `kubectl delete pod <NOM POD AGENT>`— remarque : le pod est automatiquement replanifié |
| macOS    | `launchctl stop com.datadoghq.agent` *ou* via la barre des menus |
| Source   | `sudo service datadog-agent stop`                             |
| Windows  | [Consultez la documentation relative à Windows][2].                  |

[1]: /fr/agent/
[2]: /fr/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plate-forme | Commande                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent stop`            |
| Docker   | [Consultez la documentation relative à Docker][1].  |
| macOS    | `/usr/local/bin/datadog-agent stop`          |
| Source   | `sudo ~/.datadog-agent/bin/agent stop`       |
| Windows  | [Consultez la documentation relative à Windows][2]. |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /fr/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

### Redémarrez l'Agent

Liste des commandes pour redémarrer l'Agent Datadog :

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Plate-forme | Commande                                           |
|----------|---------------------------------------------------|
| Linux    | [Consultez la documentation dédiée pour votre OS][1].  |
| Docker   | Utilisez la [commande d'installation][2]       |
| Kubernetes | `kubectl delete pod <NOM POD AGENT>`— remarque : le pod est automatiquement replanifié |
| macOS    | exécuter `stop` puis `start` *ou* via la barre des menus |
| Source   | *Plate-forme non prise en charge*                            |
| Windows  | [Consultez la documentation dédiée à Windows][3].      |

[1]: /fr/agent/
[2]: /fr/agent/docker/?tab=standard#setup
[3]: /fr/agent/basic_agent_usage/windows/
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plate-forme | Commande                                      |
|----------|----------------------------------------------|
| Linux    | `sudo service datadog-agent restart`         |
| Docker   | [Consultez la documentation relative à Docker][1].  |
| macOS    | `/usr/local/bin/datadog-agent restart`       |
| Source   | `sudo ~/.datadog-agent/bin/agent restart`    |
| Windows  | [Consultez la documentation relative à Windows][2]. |

[1]: https://github.com/DataDog/docker-dd-agent/blob/master/README.md
[2]: /fr/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

## Statut et informations sur l'Agent

### Statut de service

Liste des commandes pour afficher le statut de l'Agent Datadog :

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Plate-forme        | Commande                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| AIX             | `lssrc -s datadog-agent`                                                      |
| Linux           | [Consulter la documentation dédiée pour votre OS][1]                              |
| Docker (Debian) | `sudo docker exec -it <NOM_CONTENEUR> s6-svstat /var/run/s6/services/agent/` |
| Kubernetes      | `kubectl exec -it <NOM_POD> s6-svstat /var/run/s6/services/agent/`           |
| macOS           | `launchctl list com.datadoghq.agent` *ou* via la barre des menus                 |
| Source          | `sudo service datadog-agent status`                                           |


[1]: /fr/agent/
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plate-forme        | Commande                                                                  |
|-----------------|--------------------------------------------------------------------------|
| Linux           | `sudo service datadog-agent status`                                      |
| Docker (Debian) | `sudo docker exec -it <NOM_CONTENEUR> /etc/init.d/datadog-agent status` |
| Kubernetes      | `kubectl exec -it <NOM_POD> /etc/init.d/datadog-agent status`           |
| macOS           | `datadog-agent status`                                                   |
| Source          | `sudo ~/.datadog-agent/bin/agent status`                                 |
| Windows         | [Consultez la documentation relative à Windows][1]                             |

[1]: /fr/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Agent de cluster" %}}

| Plate-forme   | Commande                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

### Informations sur l'Agent

Liste des commandes pour afficher le statut de votre Agent Datadog et les intégrations activées.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

| Plate-forme   | Commande                                              |
|------------|------------------------------------------------------|
| AIX        | `datadog-agent status`                               |
| Linux      | `sudo datadog-agent status`                          |
| Docker     | `sudo docker exec -it <NOM_CONTENEUR> agent status` |
| Kubernetes | `kubectl exec -it <NOM_POD> agent status`           |
| macOS      | `datadog-agent status` ou via l'[interface Web][1]       |
| Source     | `sudo datadog-agent status`                          |
| Windows    | [Consultez la documentation relative à Windows][2]         |

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

[1]: /fr/agent/basic_agent_usage/#gui
[2]: /fr/agent/basic_agent_usage/windows/#status-and-information
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plate-forme   | Commande                                                                |
|------------|------------------------------------------------------------------------|
| Linux      | `sudo service datadog-agent info`                                      |
| Docker     | `sudo docker exec -it <NOM_CONTENEUR> /etc/init.d/datadog-agent info` |
| Kubernetes | `kubectl exec -it <NOM_POD> /etc/init.d/datadog-agent info`           |
| macOS      | `datadog-agent info`                                                   |
| Source     | `sudo ~/.datadog-agent/bin/info`                                       |
| Windows    | [Consultez la documentation relative à Windows][1]                           |

Une intégration correctement configurée s'affiche dans la section **Checks** sans aucun avertissement ni aucune erreur, comme dans l'exemple ci-dessous :

```text
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

| Plate-forme   | Commande                        |
|------------|--------------------------------|
| Kubernetes | `datadog-cluster-agent status` |

{{% /tab %}}
{{< /tabs >}}

## Autres commandes

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

L'interface de ligne de commande pour l'Agent v6 est basée sur un système de sous-commandes. Pour consulter la liste des sous-commandes disponibles, exécutez ce qui suit : 
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

| Sous-commande        | Remarques                                                                      |
|-------------------|----------------------------------------------------------------------------|
| `check`           | Exécute le check spécifié.                                                   |
| `config`          | [Gestion de la configuration du runtime][1].                                     |
| `configcheck`     | Affiche toutes les configurations chargées et résolues d'un Agent en cours d'exécution.             |
| `diagnose`        | Exécute un diagnostic de connectivité sur votre système.                             |
| `flare`           | [Recueille et envoie un flare à Datadog][2].                               |
| `health`          | Affiche la santé actuelle de l'Agent.                                            |
| `help`            | Aide pour n'importe quelle commande.                                                    |
| `hostname`        | Affiche le hostname utilisé par l'Agent.                                      |
| `import`          | Importe et convertit les fichiers de configuration d'une version précédente de l'Agent.|
| `installservice`  | Installe l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.        |
| `jmx`             | Dépannage JMX.                                                       |
| `launch-gui`      | Démarre l'interface graphique de l'Agent Datadog.                                               |
| `regimport`       | Importe les paramètres de registre dans `datadog.yaml`. Windows uniquement.            |
| `remove-service`  | Supprime l'Agent du gestionnaire de contrôle des services. Windows uniquement.           |
| `restart-service` | Redémarre l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.        |
| `start-service`   | Démarre l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.          |
| `stopservice`     | Arrête l'Agent dans le gestionnaire de contrôle des services. Windows uniquement.           |
| `version`         | Affiche les informations sur la version.                                                        |

[1]: /fr/agent/troubleshooting/config/
[2]: /fr/agent/troubleshooting/send_a_flare/
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
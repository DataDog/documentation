---
description: Présentation de l'architecture du Datadog Agent, incluant les processus
  principaux, les composants tels que le Collector et le Forwarder, ainsi que les
  configurations de ports.
disable_toc: false
further_reading:
- link: /agent/supported_platforms/
  tag: Documentation
  text: Plateformes prises en charge
- link: /agent/configuration/
  tag: Documentation
  text: Configuration de l'Agent
title: Architecture de l'Agent
---
## Architecture de l'Agent {#agent-architecture}

Les Agents 6 et 7 sont composés d'un processus principal responsable de la collecte des métriques d'infrastructure et des logs, ainsi que de la réception des [métriques DogStatsD][1]. Les composants principaux de ce processus sont :

* Le Collector, qui exécute les checks et collecte les métriques.
* Le Forwarder, qui envoie les charges utiles à Datadog.

Les processus optionnels suivants sont lancés par l'Agent s'ils sont activés dans le fichier de configuration `datadog.yaml` :

* L'APM Agent est un processus qui collecte les [traces][2]. Il est activé par défaut.
* Le Process Agent est un processus qui collecte des informations sur les processus en temps réel. Par défaut, le Process Agent collecte uniquement les conteneurs disponibles ; sinon, il est désactivé.
* L'[Agent Data Plane][8] (Preview) est un processus qui reçoit, agrège et transfère les [métriques DogStatsD][1] à la place du processus principal. Elle est désactivée par défaut.

Sous Windows, les services sont listés comme suit :

| Service               | Description           |
|-----------------------|-----------------------|
| DatadogAgent          | Datadog Agent         |
| datadog-trace-agent   | Datadog Trace Agent   |
| datadog-process-agent | Datadog Process Agent |

Par défaut, l'Agent écoute sur trois [ports][3] sous Linux et quatre sous Windows et macOS :

| Port | Description                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Expose les métriques d'exécution concernant l'Agent.                                                    |
| 5001 | Utilisé par l'interface de ligne de commande et l'interface graphique de l'Agent pour envoyer des commandes et extraire des informations de l'Agent en cours d'exécution. |
| 5002 | Héberge le serveur de l'interface graphique sous Windows et macOS.                                                   |
| 8125 | Utilisé par le serveur DogStatsD pour recevoir des métriques externes.                                  |

Lorsque l'Agent Data Plane est activé, il écoute sur le port 8125 à la place du processus principal et sur les ports supplémentaires suivants :

| Port | Description                                                                                           |
|------|-------------------------------------------------------------------------------------------------------|
| 5100 | Expose les métriques d'exécution concernant l'Agent Data Plane.                                                   |
| 5101 | Utilisé par l'interface de ligne de commande de l'Agent Data Plane et le processus principal de l'Agent pour envoyer des commandes à l'Agent Data Plane. |

Pour plus d'informations sur la configuration des ports, consultez [Trafic réseau][4].

### Collector {#collector}

Le Collector collecte toutes les métriques standard toutes les 15 secondes. L'Agent 6 intègre un interpréteur Python 2.7 pour exécuter des Integrations et des [checks personnalisés][5].

### Forwarder {#forwarder}

Le Forwarder de l'Agent envoie les métriques via HTTPS à Datadog. La mise en mémoire tampon empêche les coupures réseau d'affecter la transmission des métriques. Les métriques sont mises en mémoire tampon jusqu'à ce qu'une limite de taille ou de nombre de requêtes d'envoi en attente soit atteinte. Ensuite, les métriques les plus anciennes sont supprimées afin de maintenir l'empreinte mémoire du Forwarder à un niveau gérable. Les logs sont envoyés à Datadog via une connexion TCP chiffrée par SSL.

### DogStatsD {#dogstatsd}

Dans l'Agent 6, DogStatsD est une implémentation en Golang du démon d'agrégation de métriques [StatsD d'Etsy][6]. DogStatsD reçoit et agrège des métriques arbitraires via UDP ou un socket UNIX, ce qui permet d'instrumenter du code personnalisé sans ajouter de latence. Apprenez-en davantage sur [DogStatsD][7].

Lorsque l'[Agent Data Plane][8] est activé, il exécute le serveur DogStatsD à la place du processus principal de l'Agent. Les métriques issues des checks continuent d'être traitées par le processus principal de l'Agent.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /fr/tracing/guide/terminology/
[3]: /fr/agent/configuration/network/#open-ports
[4]: /fr/agent/configuration/network#configure-ports
[5]: /fr/extend/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[8]: /fr/agent/configuration/agent-data-plane/
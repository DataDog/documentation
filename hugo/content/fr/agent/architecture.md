---
description: Aperçu de l’architecture de l’Agent Datadog incluant les processus principaux,
  les composants comme le collector et le forwarder, ainsi que les configurations
  de port.
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

## Architecture de l'Agent

Les Agents 6 et 7 se composent d’un processus principal chargé de collecter les métriques d’infrastructure et les logs, et de recevoir les métriques [DogStatsD][1]. Les principaux composants de ce processus sont :

* Le collector, qui exécute des checks et collecte des métriques.
* Le forwarder, qui envoie les charges utiles à Datadog.

Deux processus facultatifs sont générés par l'Agent s'ils sont activés dans le fichier de configuration `datadog.yaml` :

* L’Agent APM est un processus qui collecte des [traces][2]. Il est activé par défaut.
* L'Agent de processus est un processus qui collecte des informations sur les processus en direct. Par défaut, l'Agent de processus collecte uniquement les conteneurs disponibles, sinon il est désactivé.

Sur Windows, les services sont énumérés comme suit :

| Service               | Rôle           |
|-----------------------|-----------------------|
| DatadogAgent          | Agent Datadog         |
| datadog-trace-agent   | Agent de trace Datadog   |
| datadog-process-agent | Agent de processus Datadog |

Par défaut, l’Agent lie trois [ports][3] sous Linux et quatre ports sous Windows et macOS :

| Port | Rôle                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Expose les métriques runtime à propos de l'Agent.                                                    |
| 5001 | Utilisé par l'interface de ligne de commande et l'interface graphique de l'Agent pour envoyer des commandes et récupérer des informations à partir de l'Agent actif. |
| 5002 | Fait fonctionner le serveur GUI sous Windows et macOS.                                                   |
| 8125 | Utilisé pour le serveur DogStatsD afin de recevoir des métriques externes.                                  |

Pour en savoir plus sur la configuration des ports, consultez la section [Trafic réseau][4].

### Collector

Le collector récupère l'ensemble des métriques standard toutes les 15 secondes. L'Agent 6 intègre un interpréteur Python 2.7 pour exécuter les intégrations et les [checks custom][5].

### Forwarder

Le forwarder de l'Agent envoie les métriques à Datadog via HTTPS. Une mise en mémoire tampon est effectuée afin d'assurer la bonne transmission des métriques en cas de problème de communication. Les métriques sont mises en mémoire tampon jusqu'à ce que la taille du tampon ou le nombre de requêtes en attente d'envoi atteigne un certain seuil. Les métriques les plus anciennes sont alors supprimées de façon à limiter l'empreinte mémoire du Forwarder. Les logs sont envoyés à Datadog via TCP avec chiffrement SSL.

### DogStatsD

Dans l’Agent 6, DogStatsD est une implémentation en Golang du daemon d’agrégation de métriques [StatsD d’Etsy][6]. DogStatsD reçoit et agrège des métriques arbitraires via UDP ou un socket UNIX, ce qui permet d’instrumenter du code custom sans ajouter de latence. Pour en savoir plus, consultez [DogStatsD][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /fr/tracing/guide/terminology/
[3]: /fr/agent/configuration/network/#open-ports
[4]: /fr/agent/configuration/network#configure-ports
[5]: /fr/developers/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
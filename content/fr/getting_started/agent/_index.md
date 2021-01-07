---
title: Débuter avec l'Agent
kind: documentation
aliases:
  - /fr/getting_started/agent
further_reading:
  - link: /agent/basic_agent_usage/
    tag: Documentation
    text: Utilisation de base de l'Agent
  - link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
    tag: FAQ
    text: "Pourquoi installer l'Agent Datadog sur mes instances dans le cloud\_?"
---
## Présentation

L'Agent est un logiciel léger installé sur vos hosts. Il transmet les métriques et les événements issus de votre host à Datadog via les [intégrations][1], [DogStatsD][2] ou l'[API][3]. L'Agent peut également être configuré pour transmettre des [live processes][4], des [logs][5] et des [traces][6].

## Implémentation

Si vous ne l'avez pas encore fait, créez un [compte Datadog][7].

### Installation

L'Agent peut être installé sur de nombreuses plateformes différentes, directement sur le host ou en tant que [version conteneurisée][8]. La plupart des systèmes possèdent une options d'installation en ligne.

{{< partial name="platforms/platforms.html" desc="Choisissez votre plateforme pour voir les instructions d'installation :" links="gs" >}}

### Configuration

Le [fichier de configuration principal][9] de l'Agent est `datadog.yaml`. Vous devez indiquer votre [clé d'API Datadog][10], qui est utilisée pour associer les données de votre Agent à votre organisation, ainsi que le site Datadog ({{< region-param key="dd_site" code="true" >}}). Consultez le [fichier d'exemple config_template.yaml][11] pour découvrir toutes les options de configuration disponibles.

Pour l'[Agent de conteneur][8], les options de configuration de `datadog.yaml` sont transmises à l'aide de [variables d'environnement][12], par exemple :

- `DD_API_KEY` pour la clé d'API Datadog
- `DD_SITE` pour le site Datadog

### Validation

Lancez la [commande status][13] de l'Agent pour vérifier que l'installation s'est bien déroulée.

### Commandes

Consultez la page relative aux [commandes de l'Agent][14] pour [démarrer][15], [arrêter][16] ou [redémarrer][17] votre Agent.

## Données collectées

### Métriques

#### Agent

Les métriques ci-dessous sont disponibles pour la version 6 de l'Agent. Si vous disposez de la version 5, consultez l'intégration [Agent Metrics][18].

| Métrique                           | Description                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **datadog.agent.python.version** | Affiche une valeur de `1` si l'Agent transmet actuellement des données à Datadog. Le tag `python_version` est ajouté à la métrique. |
| **datadog.agent.running**        | Affiche une valeur de `1` si l'Agent transmet actuellement des données à Datadog.                                                 |
| **datadog.agent.started**        | Nombre ayant pour valeur `1` envoyé lorsque l'Agent se lance (disponible pour les versions 6.12 et ultérieures).                                        |

#### Checks

En fonction de votre plateforme, l'Agent présente plusieurs checks de base activés par défaut qui recueillent des métriques.

| Check       | Métriques       | Plateformes          |
| ----------- | ------------- | ------------------ |
| CPU         | [Système][19]  | Toutes                |
| Disk        | [Disque][20]    | Toutes                |
| Docker      | [Docker][21]  | Docker             |
| File Handle | [Système][19]  | Toutes sauf Mac     |
| IO          | [System][19]  | Toutes                |
| Load        | [Système][19]  | Toutes sauf Windows |
| Memory      | [Système][19]  | Toutes                |
| Network     | [Réseau][22] | Toutes                |
| NTP         | [NTP][23]     | Toutes                |
| Uptime      | [Système][19]  | Toutes                |
| Winproc     | [Système][19]  | Windows            |

Pour recueillir des métriques provenant d'autres technologies, consultez la page relative aux [intégrations][24].

### Événements

L'Agent envoie des événements à Datadog lorsqu'un Agent est démarré ou redémarré.

### Checks de service

**datadog.agent.up** : 
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à Datadog. Si ce n'est pas le cas, renvoie `OK`.

**datadog.agent.check_status** : 
Renvoie `CRITICAL` si un check de l'Agent ne parvient pas à envoyer des métriques à Datadog. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Pour dépanner plus facilement l'Agent :

- Consultez la page [Dépannage de l'Agent][25].
- Consultez la page [Fichiers de log de l'Agent][26].
- Contactez l'[assistance Datadog][27].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Étapes suivantes

{{< whatsnext desc="Une fois que l'Agent est installé :">}}
{{< nextlink href="/getting_started/integrations" tag="Documentation" >}}En savoir plus sur les integrations{{< /nextlink >}}
{{< nextlink href="/getting_started/application" tag="Documentation" >}}En savoir plus sur l'interface Datadog{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/integrations/
[2]: /fr/developers/metrics/dogstatsd_metrics_submission/
[3]: /fr/api/
[4]: /fr/infrastructure/process/
[5]: /fr/logs/
[6]: /fr/tracing/
[7]: https://www.datadoghq.com
[8]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[9]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[10]: https://app.datadoghq.com/account/settings#api
[11]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[12]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
[13]: /fr/agent/guide/agent-commands/#agent-status-and-information
[14]: /fr/agent/guide/agent-commands/
[15]: /fr/agent/guide/agent-commands/#start-the-agent
[16]: /fr/agent/guide/agent-commands/#stop-the-agent
[17]: /fr/agent/guide/agent-commands/#restart-the-agent
[18]: /fr/integrations/agent_metrics/
[19]: /fr/integrations/system/#metrics
[20]: /fr/integrations/disk/#metrics
[21]: /fr/agent/docker/data_collected/#metrics
[22]: /fr/integrations/network/#metrics
[23]: /fr/integrations/ntp/#metrics
[24]: /fr/getting_started/integrations/
[25]: /fr/agent/troubleshooting/
[26]: /fr/agent/guide/agent-log-files/
[27]: /fr/help/
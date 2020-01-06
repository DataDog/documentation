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

L'Agent est un logiciel léger installé sur vos hosts. Il transmet les métriques et les événements à partir de votre host à Datadog via les [intégrations][1], [DogStatsD][2] ou l'[API][3]. Avec une configuration supplémentaire, l'Agent peut transmettre des [live processes][4], [logs][5] et [traces][6].

## Implémentation

Si vous ne l'avez pas encore fait, créez un [compte Datadog][7].

### Installation

L'Agent peut être installé sur de nombreuses plateformes différentes, directement sur le host ou en tant que [version conteneurisée][8]. La plupart des systèmes possèdent une options d'installation en ligne.

{{< partial name="platforms/platforms.html" desc="Choisissez votre plateforme pour voir les instructions d'installation :" links="gs" >}}

### Configuration

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

Le [fichier de configuration principal][1] de l'Agent est `datadog.yaml`. L'unique paramètre requis est votre [clé d'API Datadog][2] qui est utilisé pour associer les données de votre Agent à votre organisation. Consultez le [fichier d'exemple config_template.yaml][3] pour découvrir toutes les options de configuration disponibles.

Pour l'[Agent conteneur][4], les options de configuration de `datadog.yaml` sont transmises avec les [variables d'environnement][5]. Par exemple, la variable d'environnement de la clé d'API Datadog est `DD_API_KEY`.

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[4]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[5]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

Le [fichier de configuration principal][1] de l'Agent est `datadog.yaml`. Les paramètres requis sont votre [clé d'API Datadog][2] qui est utilisé pour associer les données de votre Agent à votre organisation et le site de Datadog (`datadoghq.eu`). Consultez le [fichier d'exemple config_template.yaml][3] pour découvrir toutes les options de configuration disponibles.

Pour l'[Agent conteneur][4], les options de configuration de `datadog.yaml` sont transmises avec les [variables d'environnement][5], par exemple :

* `DD_API_KEY` pour la clé d'API Datadog
* `DD_SITE` pour le site de Datadog

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: https://app.datadoghq.eu/account/settings#api
[3]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[4]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[5]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent#environment-variables
{{% /tab %}}
{{< /tabs >}}

### Validation

Exécutez la [commande status][9] de l'Agent pour vérifier l'installation.

### Commandes

Consultez la page relative aux [commandes de l'Agent][10] pour [démarrer][11], [arrêter][12] ou [redémarrer][13] votre Agent.

## Données collectées

### Métriques

#### Agent

Les métriques ci-dessous sont disponibles pour la version 6 de l'Agent. Si vous disposez de la version 5, consultez l'intégration [Métriques de l'Agent][14].

| Métrique                           | Description                                                                                                          |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------|
| **datadog.agent.python.version** | Affiche une valeur de `1` si l'Agent transmet actuellement des données à Datadog. Le tag `python_version` est ajouté à la métrique. |
| **datadog.agent.running**        | Affiche une valeur de `1` si l'Agent transmet actuellement des données à Datadog.                                                 |
| **datadog.agent.started**        | Un nombre d'une valeur de `1` envoyé lorsque l'Agent se lance (disponible pour les versions 6.12 et ultérieures).                                        |

#### Checks

En fonction de votre plateforme, l'Agent présente plusieurs checks de base activés par défaut qui recueillent des métriques.

| Check       | Métriques       | Plateformes          |
|-------------|---------------|--------------------|
| CPU         | [Système][15]  | Toutes                |
| Disk        | [Disque][16]    | Toutes                |
| Docker      | [Docker][17]  | Docker             |
| File Handle | [Système][15]  | Toutes sauf Mac     |
| IO          | [Système][15]  | Toutes                |
| Load        | [Système][15]  | Toutes sauf Windows |
| Memory      | [Système][15]  | Toutes                |
| Network     | [Réseau][18] | Toutes                |
| NTP         | [NTP][19]     | Toutes                |
| Uptime      | [Système][15]  | Toutes                |
| Winproc     | [Système][15]  | Windows            |

Pour recueillir des métriques provenant d'autres technologies, consultez la page relative aux [intégrations][20].

### Événements

L'Agent envoie des événements à Datadog lorsqu'un Agent est démarré ou redémarré.

### Checks de service

**datadog.agent.up** : 
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à Datadog. Si ce n'est pas le cas, renvoie `OK`.

**datadog.agent.check_status** : 
Renvoie `CRITICAL` si un check de l'Agent n'est pas capable d'envoyer des métriques à Datadog. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Pour obtenir de l'aide pour le dépannage de l'Agent :

* Consultez la page [Dépannage de l'Agent][21].
* Consultez la page [Fichiers de log de l'Agent][22].
* Contactez [l'assistance Datadog][23].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
<p>

## Étapes suivantes

{{< whatsnext desc="Une fois que l'Agent est installé :">}}
    {{< nextlink href="/getting_started/integrations" tag="Documentation" >}}En savoir plus sur les intégrations{{< /nextlink >}}
    {{< nextlink href="/getting_started/application" tag="Documentation" >}}En savoir plus sur l'interface utilisateur de Datadog{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/integrations
[2]: /fr/developers/metrics/dogstatsd_metrics_submission
[3]: /fr/api
[4]: /fr/graphing/infrastructure/process
[5]: /fr/logs
[6]: /fr/tracing
[7]: https://www.datadoghq.com
[8]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[9]: /fr/agent/guide/agent-commands/#agent-status-and-information
[10]: /fr/agent/guide/agent-commands
[11]: /fr/agent/guide/agent-commands/#start-the-agent
[12]: /fr/agent/guide/agent-commands/#stop-the-agent
[13]: /fr/agent/guide/agent-commands/#restart-the-agent
[14]: /fr/integrations/agent_metrics
[15]: /fr/integrations/system/#metrics
[16]: /fr/integrations/disk/#metrics
[17]: /fr/integrations/docker_daemon/#metrics
[18]: /fr/integrations/network/#metrics
[19]: /fr/integrations/ntp/#metrics
[20]: /fr/getting_started/integrations
[21]: /fr/agent/troubleshooting
[22]: /fr/agent/guide/agent-log-files
[23]: /fr/help
---
description: Guide d'installation et de configuration du Datadog Agent pour collecter
  des métriques, des événements et des logs au niveau du système à partir de hosts.
further_reading:
- link: agent/
  tag: Documentation
  text: Le Datadog Agent
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour booster la surveillance de votre
    infrastructure
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: FAQ
  text: Pourquoi installer le Datadog Agent sur mes instances dans le cloud ?
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: Blog
  text: Surveiller les instances gérées AWS Lambda avec Datadog
title: Débuter avec l'Agent
---
## Présentation {#overview}

Ce guide présente le Datadog Agent et couvre :

  - [Introduction à l'Agent](#what-is-the-datadog-agent)
  - [Installation](#installation)
  - [Données collectées par l'Agent](#data-collected-by-the-agent)
  - [Configurations et fonctionnalités avancées](#advanced-configurations-and-features)
  - [Dépannage](#troubleshooting)


## Qu'est-ce que le Datadog Agent ? {#what-is-the-datadog-agent}

Le Datadog Agent est un logiciel qui s'exécute sur vos hosts. Il collecte des événements et des métriques à partir des hosts et les envoie à Datadog, où vous pouvez analyser vos données de monitoring et de performance. 

L'Agent peut s'exécuter sur :
- Hosts locaux (Windows, Linux, macOS) 
- Environnements conteneurisés (Docker, Kubernetes)
- Centres de données sur site 

Vous pouvez également installer et configurer l'Agent à l'aide d'outils de gestion de configuration comme Chef, Puppet ou Ansible.

L'Agent peut collecter 75-100 métriques au niveau du système toutes les 15-20 secondes. Avec une configuration supplémentaire, il peut envoyer des données en temps réel, des logs et des traces à partir de processus en cours d'exécution vers Datadog. Le Datadog Agent est open source et son code source est disponible sur GitHub à l'adresse [DataDog/datadog-agent][1].

### Le fichier de configuration de l'Agent {#the-agent-configuration-file}

Le fichier de configuration principal de l'Agent est `datadog.yaml`. Les paramètres requis sont :
- Votre [clé d'API Datadog][16], qui est utilisée pour associer les données de l'Agent à votre organisation. 
- Votre [site Datadog][41] ({{< region-param key="dd_site" code="true" >}}).

Pour toutes les options de configuration disponibles, consultez les [exemples de fichiers de configuration de l'Agent][23] pour votre système d'exploitation. Vous pouvez ajuster les fichiers de configuration de l'Agent pour tirer parti d'autres fonctionnalités Datadog.

## Installation {#installation}

### Prérequis {#prerequisites}
1. Créez un [compte Datadog][15].

2. Ayez votre [clé d'API Datadog][16] à portée de main.

### Configuration {#setup}

Utilisez [Fleet Automation][39], le workflow intégré à l'application Datadog, pour installer, mettre à niveau, configurer et dépanner le Datadog Agent sur un seul host ou à grande échelle. 

Consultez la [documentation de l'Agent][40] pour une configuration supplémentaire de l'Agent pour votre plateforme spécifique.


## Données collectées par l'Agent {#data-collected-by-the-agent}

Pour vous offrir une visibilité complète sur votre infrastructure, le Datadog Agent rapporte des métriques sur sa propre santé et sa configuration, ainsi que des métriques collectées auprès de vos hosts et services via ses checks par défaut.

### Métriques de l'Agent {#agent-metrics}

L'Agent envoie les métriques suivantes à Datadog à son sujet. Ces métriques fournissent des informations sur les hosts ou conteneurs sur lesquels des Agents sont en cours d'exécution, sur le moment où chaque Agent a démarré et sur la version de Python utilisée par l'Agent.

| Métrique                           | Description                                      |
| -------------------------------- |------------------------------------------------- |
| `datadog.agent.running`        | Une valeur de `1` si l'Agent est en cours d'exécution et rapporte des données à Datadog, marquée avec la version de l'Agent.  |
| `datadog.agent.started`        | Un décompte de `1` à chaque démarrage de l'Agent.    |
| `datadog.agent.python.version` | Une valeur de `1`, marquée avec la version de Python.     |


Consultez l'intégration [Agent Metrics][3] pour obtenir la liste complète des métriques de l'Agent.

### Checks {#checks}

En fonction de votre plateforme, l'Agent présente plusieurs checks principaux activés par défaut qui recueillent des métriques.

| Check       | Métriques       | Plateformes          |
| ----------- | ------------- | ------------------ |
| CPU         | [Système][4]  | Toutes                |
| Disque        | [Disque][5]    | Toutes                |
| E/S          | [Système][4]  | Toutes                |
| Mémoire      | [Système][4]  | Toutes                |
| Réseau     | [Réseau][6] | Toutes                |
| NTP         | [NTP][7]     | Toutes                |
| Temps de disponibilité      | [Système][4]  | Toutes                |
| Descripteur de fichier | [Système][4]  | Tous sauf Mac     |
| Charge        | [Système][4]  | Tous sauf Windows |
| Docker      | [Docker][8]  | Docker             |
| Winproc     | [Système][4]  | Windows            |

Pour recueillir des métriques provenant d'autres technologies, consultez la page relative aux [intégrations][9].



### Checks de service {#service-checks}

La configuration de base de l'Agent permet d'obtenir les checks de service suivants :

  - `datadog.agent.up` : Renvoie **OK** si l'Agent se connecte à Datadog.
  - `datadog.agent.check_status` : Renvoie **CRITICAL** si un check de l'Agent ne parvient pas à envoyer des métriques à Datadog ; sinon, renvoie **OK**.

Ces checks peuvent être utilisés dans Datadog pour visualiser le statut de l'Agent via des monitors et des dashboards en un coup d'œil. Consultez [Présentation des checks de service][21] pour en savoir plus.


## Configurations et fonctionnalités avancées {#advanced-configurations-and-features}

{{% collapse-content title="Différences entre l'Agent pour les hosts et les conteneurs" level="h3" expanded=false id="agent-hosts-vs-containers" %}}

Il existe des différences clés entre l'installation d'Agents sur un host et dans un environnement conteneurisé : 

- **Différences de configuration** : 
    - **Host** : L'Agent est configuré à l'aide d'un fichier YAML.
    - **Conteneur** : Les options de configuration sont transmises à l'aide de [variables d'environnement][10], par exemple :
    
    ```sh 
    `DD_API_KEY` # Datadog API key
    `DD_SITE`    # Datadog site
    ```

- **Détection des intégrations** : 
    - **Host** : Les [intégrations][9] sont identifiées via le fichier de configuration de l'Agent.
    - **Conteneur** : Les intégrations sont automatiquement identifiées à l'aide de la fonctionnalité Autodiscovery de Datadog. Consultez [Fonction Autodiscovery de l'Agent][11] pour en savoir plus.

De plus, consultez [Agent Docker][12] ou [Kubernetes][13] pour obtenir un guide sur l'exécution de l'Agent dans un environnement conteneurisé.
{{% /collapse-content %}} 


{{% collapse-content title="Définir des tags via le fichier de configuration de l'Agent" level="h3" expanded=false id="setting-tags-agent-config-file" %}}

Les tags ajoutent une couche supplémentaire de métadonnées à vos métriques et événements. Ils vous permettent de définir le périmètre et de comparer vos données dans les visualisations Datadog. Lorsque des données sont envoyées à Datadog depuis plusieurs hosts, le marquage de ces informations vous permet de restreindre la vue aux données que vous souhaitez visualiser en priorité.

Par exemple, supposons que vous ayez des données collectées auprès de différentes équipes et que vous souhaitiez uniquement voir les métriques de l'équipe alpha ; le marquage de ces hosts spécifiques avec le tag `team:alpha` ou `team:bravo` vous permet de filtrer les métriques marquées avec `team:alpha`. Consultez [Prise en main des tags][24] pour en savoir plus sur le marquage de vos données.

1. Localisez le [fichier de configuration principal][25] de votre Agent. Pour Ubuntu, l'emplacement du fichier est `/etc/datadog-agent/datadog.yaml`.

2. Dans le fichier `datadog.yaml`, localisez le paramètre `tags`. Les tags au niveau du host peuvent être définis dans la configuration `datadog.yaml` pour appliquer des tags à toutes les métriques, traces et logs transférés depuis ce host.

   ```yaml
   ## @param tags  - list of key:value elements - optional
   ## @env DD_TAGS - space separated list of strings - optional
   ## List of host tags. Attached in-app to every metric, event, log, trace, and service check emitted by this Agent.
   ##
   ## This configuration value merges with `DD_EXTRA_TAGS`, allowing some
   ## tags to be set in a configuration file (`tags`), and additional tags to be added
   ## with an environment variable (`DD_EXTRA_TAGS`).
   ##
   ## Learn more about tagging: https://docs.datadoghq.com/tagging/
   #
   # tags:
   #   - team:infra
   #   - <TAG_KEY>:<TAG_VALUE>
   ```

3. Décommentez le paramètre tags et l'exemple de tag `team:infra` fourni. Vous pouvez également ajouter votre propre tag personnalisé, par exemple `test:agent_walkthrough`.
   ```yaml
   ## @param tags  - list of key:value elements - optional
   ## @env DD_TAGS - space separated list of strings - optional
   ## List of host tags. Attached in-app to every metric, event, log, trace, and service check emitted by this Agent.
   ##
   ## This configuration value merges with `DD_EXTRA_TAGS`, allowing some
   ## tags to be set in a configuration file (`tags`), and additional tags to be added
   ## with an environment variable (`DD_EXTRA_TAGS`).
   ##
   ## Learn more about tagging: https://docs.datadoghq.com/tagging/
   #
   tags:
      - team:infra
      - test:agent_walkthrough
   ```

4. Redémarrez l'Agent en exécutant la [commande de redémarrage][26] de l'Agent. La commande de redémarrage pour Ubuntu :

   ```shell
   sudo service datadog-agent restart
   ```

5. Après quelques minutes, accédez à nouveau à la [page {{< ui >}}Metrics Summary{{< /ui >}}][22] et cliquez sur la métrique `datadog.agent.started`. En plus des tags `host` et `version` par défaut, vous pouvez également voir le tag `team` et tous les tags personnels que vous avez ajoutés. Vous pouvez également filtrer les métriques par le champ {{< ui >}}Tag{{< /ui >}} en haut de la page.

6. Accédez à la [page {{< ui >}}Events Explorer{{< /ui >}}][20] et recherchez les tags personnalisés affichés avec le dernier événement de l'Agent.

{{% /collapse-content %}} 

{{% collapse-content title="Recherche de métriques dans l'interface utilisateur Datadog" level="h3" expanded=false id="finding-metrics-in-the-datadog-ui" %}}

Vous pouvez confirmer que l'Agent fonctionne correctement en vérifiant ses métriques par défaut dans l'interface utilisateur Datadog. Accédez à la [page {{< ui >}}Metrics Summary{{< /ui >}}][22] et recherchez la métrique `datadog.agent.started` ou la métrique `datadog.agent.running`. Si ces métriques ne sont pas visibles immédiatement, il peut falloir quelques minutes pour que l'Agent envoie les données à Datadog.

Cliquez sur l'une ou l'autre des métriques et un panneau Métrique s'ouvre. Ce panneau affiche des métadonnées supplémentaires sur l'endroit où ces métriques sont collectées et tous les tags associés. Si aucun tag n'est configuré sur un host, vous ne devriez voir que les tags par défaut que Datadog attribue aux métriques, y compris `version` et `host`. Consultez la section ci-dessus sur la définition des tags via les fichiers de configuration de l'Agent pour en savoir plus sur la façon d'ajouter des tags.

Explorez d'autres métriques par défaut telles que `ntp.offset` ou `system.cpu.idle`.
{{% /collapse-content %}} 


{{% collapse-content title="Traitement de l'Agent" level="h3" expanded=false id="agent-overhead" %}}

La quantité d'espace et de ressources utilisée par l'Agent dépend de la configuration et des données que l'Agent envoie. Au départ, vous pouvez vous attendre à une utilisation moyenne d'environ 0,08 % du CPU avec un espace disque d'environ 880 Mo à 1,3 Go.

Consultez la rubrique [Charge de l'Agent][2] pour en savoir plus sur ces benchmarks.
{{% /collapse-content %}}

{{% collapse-content title="Options de configuration supplémentaires" level="h3" expanded=false id="additional-configuration-options" %}}

La collecte des données de [logs][27], [traces][28] et [processes][29] peut être activée via le fichier de configuration de l'Agent. Ces fonctionnalités ne sont pas activées par défaut. Par exemple, dans le fichier de configuration, le paramètre `logs_enabled` est défini sur false.

```yaml
##################################
## Log collection Configuration ##
##################################

## @param logs_enabled - boolean - optional - default: false
## @env DD_LOGS_ENABLED - boolean - optional - default: false
## Enable Datadog Agent log collection by setting logs_enabled to true.
#
# logs_enabled: false
```

D'autres fonctionnalités Datadog peuvent être configurées par l'intermédiaire du fichier de configuration de l'Agent, notamment :
- Activation de [l'ingestion de traces OTLP][30]
- [Personnalisation de la collecte de logs][31] pour filtrer ou nettoyer les données sensibles
- Configuration de données personnalisées via [DogStatsD][32]

Tout au long de votre configuration, lorsque la documentation fait référence au fichier `datadog.yaml` ou au fichier de configuration de l'Agent, il s'agit du fichier que vous devez configurer.

{{% /collapse-content %}} 


## Commandes{#commands}

Consultez la section [Commandes de l'Agent][33] pour [démarrer][34], [arrêter][35] ou [redémarrer][26] votre Agent.

## Dépannage {#troubleshooting}

Pour obtenir de l'aide pour le dépannage de l'Agent :

- Consultez [Dépannage de l'Agent][36]
- Affichez les [fichiers logs de l'Agent][37]
- Contactez le [support Datadog][38]

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Étapes suivantes {#next-steps}

{{< whatsnext desc="Une fois l'Agent installé :">}}
{{< nextlink href="/getting_started/integrations" >}}En savoir plus sur les intégrations{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}En savoir plus sur l'interface utilisateur Datadog{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Apprenez à collecter des logs via l'Agent{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Apprenez à collecter des traces via l'Agent{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: /fr/agent/basic_agent_usage/?tab=agentv6v7#agent-overhead
[3]: /fr/integrations/agent_metrics/
[4]: /fr/integrations/system/#metrics
[5]: /fr/integrations/disk/#metrics
[6]: /fr/integrations/network/#metrics
[7]: /fr/integrations/ntp/#metrics
[8]: /fr/agent/docker/data_collected/#metrics
[9]: /fr/getting_started/integrations/
[10]: /fr/agent/guide/environment-variables/#overview
[11]: /fr/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[12]: /fr/agent/docker/?tab=standard
[13]: /fr/agent/kubernetes/installation?tab=operator
[14]: /fr/getting_started/agent/#checks
[15]: https://www.datadoghq.com
[16]: https://app.datadoghq.com/organization-settings/api-keys
[17]: /fr/agent/supported_platforms
[18]: https://app.datadoghq.com/account/settings/agent/latest
[19]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[20]: https://app.datadoghq.com/event/explorer
[21]: /fr/extend/service_checks/#visualize-your-service-check-in-datadog
[22]: https://app.datadoghq.com/metric/summary
[23]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example
[24]: /fr/getting_started/tagging/
[25]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[26]: /fr/agent/configuration/agent-commands/#restart-the-agent
[27]: /fr/logs/
[28]: /fr/tracing/
[29]: /fr/infrastructure/process/?tab=linuxwindows#introduction
[30]: /fr/opentelemetry/otlp_ingest_in_the_agent/?tab=host
[31]: /fr/agent/logs/advanced_log_collection/
[32]: /fr/extend/dogstatsd/?tab=hostagent
[33]: /fr/agent/configuration/agent-commands/
[34]: /fr/agent/configuration/agent-commands/#start-the-agent
[35]: /fr/agent/configuration/agent-commands/#stop-the-agent
[36]: /fr/agent/troubleshooting/
[37]: /fr/agent/configuration/agent-log-files/
[38]: /fr/help/
[39]: /fr/agent/fleet_automation/
[40]: /fr/agent/?tab=Host-based
[41]: /fr/getting_started/site/
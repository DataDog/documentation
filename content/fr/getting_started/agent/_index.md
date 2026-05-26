---
description: Guide pour l'installation et la configuration de l'Agent Datadog afin
  de collecter des métriques, des événements et des journaux au niveau système depuis
  les hôtes.
further_reading:
- link: agent/
  tag: Documentation
  text: L'Agent Datadog
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour booster la surveillance de votre
    infrastructure
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: FAQ
  text: Pourquoi installer l'Agent Datadog sur mes instances dans le cloud ?
- link: https://www.datadoghq.com/blog/lambda-managed-instances
  tag: Blog
  text: Surveillez les instances AWS Lambda gérées avec Datadog
title: Débuter avec l'Agent
---
## Aperçu {#overview}

Ce guide présente l'Agent Datadog et couvre :

  - [Introduction à l'Agent](#what-is-the-datadog-agent)
  - [Installation](#installation)
  - [Données collectées par l'Agent](#data-collected-by-the-agent)
  - [Configurations et fonctionnalités avancées](#advanced-configurations-and-features)
  - [Dépannage](#troubleshooting)


## Qu'est-ce que l'Agent Datadog ? {#what-is-the-datadog-agent}

L'Agent Datadog est un logiciel qui s'exécute sur vos hôtes. Il collecte des événements et des métriques depuis les hôtes et les envoie à Datadog, où vous pouvez analyser vos données de surveillance et de performance. 

L'Agent peut s'exécuter sur :
- Hôtes locaux (Windows, Linux, macOS) 
- Environnements conteneurisés (Docker, Kubernetes)
- Centres de données sur site 

Vous pouvez également installer et configurer l'Agent en utilisant des outils de gestion de configuration tels que Chef, Puppet ou Ansible.

L'Agent peut collecter 75 à 100 métriques au niveau système toutes les 15 à 20 secondes. Avec une configuration supplémentaire, il peut envoyer des données en direct, des journaux et des traces des processus en cours d'exécution à Datadog. L'Agent Datadog est open source, et son code source est disponible sur GitHub à [DataDog/datadog-agent][1].

### Le fichier de configuration de l'Agent {#the-agent-configuration-file}

Le fichier de configuration principal de l'Agent est `datadog.yaml`. Les paramètres requis sont :
- Votre [clé API Datadog][16], qui est utilisée pour associer les données de l'Agent à votre organisation. 
- Votre [site Datadog][41] ({{< region-param key="dd_site" code="true" >}}).

Consultez le [fichier d'exemple `config_template.yaml`][23] pour toutes les options de configuration disponibles. Vous pouvez ajuster les fichiers de configuration de l'Agent pour tirer parti d'autres fonctionnalités de Datadog.


## Installation {#installation}

### Prérequis {#prerequisites}
1. Créez un [compte Datadog][15].

2. Ayez votre [clé API Datadog][16] à portée de main.

### Configuration {#setup}

Utilisez [Fleet Automation][39], le flux de travail intégré de Datadog, pour installer, mettre à niveau, configurer et dépanner l'Agent Datadog sur un seul hôte ou à grande échelle. 

Consultez la [documentation de l'Agent][40] pour une configuration supplémentaire de l'Agent pour votre plateforme spécifique.


## Données collectées par l'Agent {#data-collected-by-the-agent}

Pour vous donner une visibilité complète sur votre infrastructure, l'Agent Datadog rapporte des métriques sur sa propre santé et sa configuration, ainsi que des métriques recueillies à partir de vos hôtes et services via ses vérifications par défaut.

### Métriques de l'Agent {#agent-metrics}

L'Agent rapporte les métriques suivantes à Datadog à son sujet. Ces métriques fournissent des informations sur les hôtes ou conteneurs ayant des Agents en cours d'exécution, sur le moment où chaque Agent a démarré, et sur la version de Python que l'Agent utilise.

| Métrique                           | Description                                      |
| -------------------------------- |------------------------------------------------- |
| `datadog.agent.running`        | Une valeur de `1` si l'Agent fonctionne et remonte des données à Datadog, étiqueté avec la version de l'Agent.  |
| `datadog.agent.started`        | Un décompte de `1` chaque fois que l'Agent démarre.    |
| `datadog.agent.python.version` | Une valeur de `1`, étiquetée avec la version de Python.     |


Consultez l'intégration [Agent Metrics][3] pour obtenir la liste complète des métriques de l'Agent.

### Vérifications {#checks}

En fonction de votre plateforme, l'Agent présente plusieurs checks principaux activés par défaut qui recueillent des métriques.

| Vérification       | Métriques       | Plateformes          |
| ----------- | ------------- | ------------------ |
| CPU         | [System][4]  | All                |
| Disk        | [Disk][5]    | All                |
| IO          | [System][4]  | All                |
| Memory      | [System][4]  | All                |
| Network     | [Network][6] | All                |
| NTP         | [NTP][7]     | Tous                |
| Uptime      | [System][4]  | All                |
| File Handle | [System][4]  | All except Mac     |
| Load        | [System][4]  | All except Windows |
| Docker      | [Docker][8]  | Docker             |
| Winproc     | [System][4]  | Windows            |

Pour recueillir des métriques provenant d'autres technologies, consultez la page relative aux [intégrations][9].



### Vérifications de service {#service-checks}

La configuration de base de l'Agent permet d'obtenir les checks de service suivants :

  - `datadog.agent.up`: Retourne **OK** si l'Agent se connecte à Datadog.
  - `datadog.agent.check_status`: Retourne **CRITICAL** si une vérification de l'Agent ne parvient pas à envoyer des métriques à Datadog ; sinon retourne **OK**

Ces vérifications peuvent être utilisées dans Datadog pour visualiser l'état de l'Agent à travers des moniteurs et des tableaux de bord en un coup d'œil. Voir [Aperçu des vérifications de service][21] pour en savoir plus.


## Configurations et fonctionnalités avancées {#advanced-configurations-and-features}

{{% collapse-content title="Différences entre l'Agent pour hôtes et conteneurs" level="h4" expanded=false id="id-for-anchoring" %}}

Il existe des différences clés entre l'installation des Agents sur un hôte et dans un environnement conteneurisé : 

- **Différences de configuration** : 
    - **Hôte** : L'Agent est configuré à l'aide d'un fichier YAML.
    - **Conteneur** : Les options de configuration sont passées à l'aide de [variables d'environnement][10], par exemple :
    
    ```sh 
    `DD_API_KEY` # Datadog API key
    `DD_SITE`    # Datadog site
    ```

- **Détection des intégrations** : 
    - **Host** : [Integrations][9] sont identifiées à travers le fichier de configuration de l'Agent.
    - **Conteneur** : [Integrations][9] sont automatiquement identifiées grâce à la fonctionnalité Autodiscovery de Datadog. Voir [Basic Agent Autodiscovery][11] pour en savoir plus.

De plus, consultez le [Docker Agent][12] ou [Kubernetes][13] pour un guide sur l'exécution de l'Agent dans un environnement conteneurisé.
{{% /collapse-content %}} 


{{% collapse-content title="Définir des tags via le fichier de configuration de l'Agent" level="h4" expanded=false id="id-for-anchoring" %}}

Les tags ajoutent une couche supplémentaire de métadonnées à vos métriques et événements. Ils vous permettent de définir le périmètre et de comparer vos données dans les visualisations de Datadog. Lorsque des données sont envoyées à Datadog depuis plusieurs hôtes, le marquage de ces informations vous permet de vous concentrer sur les données qui vous intéressent le plus à visualiser.

Par exemple, disons que vous avez des données collectées auprès de différentes équipes et que vous êtes uniquement intéressé par les métriques de l'équipe alpha, en marquant ces hôtes spécifiques avec le tag `team:alpha` ou `team:bravo`, vous avez la possibilité de filtrer les métriques qui sont marquées avec `team:alpha`. Voir [Commencer avec les tags][24] pour en savoir plus sur le marquage de vos données.

1. Localisez le [fichier de configuration principal][25] de votre Agent. Pour Ubuntu, l'emplacement du fichier est `/etc/datadog-agent/datadog.yaml`.

2. Dans le fichier `datadog.yaml`, localisez le paramètre `tags`. Les tags au niveau de l'hôte peuvent être définis dans la configuration `datadog.yaml` pour appliquer des tags à toutes les métriques, traces et journaux transférés depuis cet hôte.

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

3. Décommentez le paramètre tags et l'exemple de tag fourni `team:infra`. Vous pouvez également ajouter votre propre tag personnalisé, par exemple `test:agent_walkthrough`.
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

4. Redémarrez l'Agent en exécutant la [commande de redémarrage de l'Agent][26]. La commande de redémarrage d'Ubuntu :

   ```shell
   sudo service datadog-agent restart
   ```

5. Après quelques minutes, retournez à la [page Résumé des métriques][22] et cliquez sur la métrique `datadog.agent.started`. En plus des tags par défaut `host` et `version`, vous pouvez également voir le tag `team` et tous les tags personnels que vous avez ajoutés. Vous pouvez également filtrer les métriques par le champ `Tag` en haut de la page.

6. Allez à la [page Explorateur d'événements][20] et trouvez les tags personnalisés affichés avec le dernier événement de l'Agent.

{{% /collapse-content %}} 

{{% collapse-content title="Trouver des métriques dans l'interface utilisateur de Datadog" level="h4" expanded=false id="id-for-anchoring" %}}

Vous pouvez confirmer que l'Agent fonctionne correctement en vérifiant ses métriques par défaut dans l'interface utilisateur de Datadog. Allez à la [page Résumé des métriques][22] et recherchez la métrique `datadog.agent.started` ou la métrique `datadog.agent.running`. Si ces métriques ne sont pas visibles immédiatement, il peut falloir quelques minutes à l'Agent pour envoyer les données à Datadog.

Cliquez sur l'une des métriques et un panneau de métrique s'ouvre. Ce panneau montre des métadonnées supplémentaires sur l'endroit où ces métriques sont collectées et toutes les balises associées. Si aucun tag n'est configuré sur un hôte, vous ne devriez voir que les tags par défaut que Datadog attribue aux métriques, y compris `version` et `host`. Consultez la section ci-dessus sur la configuration des tags via les fichiers de configuration de l'Agent pour en savoir plus sur la façon d'ajouter des tags.

Explorez d'autres métriques par défaut telles que `ntp.offset` ou `system.cpu.idle`.
{{% /collapse-content %}} 


{{% collapse-content title="Traitement de l'Agent" level="h4" expanded=false id="id-for-anchoring" %}}

La quantité d'espace et de ressources que l'Agent utilise dépend de la configuration et des données que l'Agent envoie. Au début, vous pouvez vous attendre à environ 0,08 % d'utilisation du CPU en moyenne avec un espace disque d'environ 880 Mo à 1,3 Go.

Consultez la rubrique [Charge de l'Agent][2] pour en savoir plus sur ces benchmarks.
{{% /collapse-content %}}

{{% collapse-content title="Options de configuration supplémentaires" level="h4" expanded=false id="id-for-anchoring" %}}

La collecte des [journaux][27], des [traces][28] et des données [processus][29] peut être activée via le fichier de configuration de l'Agent. Ces fonctionnalités ne sont pas activées par défaut. Par exemple, dans le fichier de configuration, le paramètre `logs_enabled` est défini sur faux.

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
- Activation de [OTLP Trace Ingestion][30]
- [Personnalisation de la collecte des journaux][31] pour filtrer ou nettoyer des données sensibles
- Configuration de données personnalisées via [DogStatsD][32]

Tout au long de votre configuration, lorsque la documentation fait référence au fichier `datadog.yaml` ou au fichier de configuration de l'Agent, c'est le fichier que vous devez configurer.

{{% /collapse-content %}} 


## Commandes {#commands}

Consultez la section [Commandes de l'Agent][33] pour [démarrer][34], [arrêter][35] ou [redémarrer][26] votre Agent.

## Dépannage {#troubleshooting}

Pour obtenir de l'aide pour le dépannage de l'Agent :

- Voir [Dépannage de l'Agent][36]
- Voir les [fichiers journaux de l'Agent][37]
- Contacter le [support Datadog][38]

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Prochaines étapes {#next-steps}

{{< whatsnext desc="Après l'installation de l'Agent :">}}
{{< nextlink href="/getting_started/integrations" >}}En savoir plus sur les intégrations{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}En savoir plus sur l'interface utilisateur de Datadog{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Découvrez comment collecter des journaux via l'Agent{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Découvrez comment collecter des traces via l'Agent{{< /nextlink >}}
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
[23]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
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
---
further_reading:
- link: /agent/basic_agent_usage/
  tag: Documentation
  text: Utilisation de base de l'Agent
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour booster la surveillance de votre
    infrastructure
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: FAQ
  text: Pourquoi installer l'Agent Datadog sur mes instances cloud ?
title: Débuter avec l'Agent
---

Ce guide présente le fonctionnement de l'Agent et décrit la marche à suivre pour envoyer des métriques système à la plateforme Datadog. En guise d'exemple, l'installation d'un Agent sur Ubuntu est expliquée. Voici les thèmes abordés :

  - Installation de l'Agent
  - Vérification de l'exécution de l'Agent
  - Configuration des fonctionnalités de l'Agent
  - Ressources pour le dépannage

## Présentation

### Fonctionnement de l'Agent

L'Agent Datadog est un logiciel qui s'exécute sur vos hosts. Il recueille les événements et les métriques des hosts et les envoie à la plateforme Datadog, à partir de laquelle vous pouvez analyser vos données de surveillance et de performance. Il peut être exécuté sur des hosts locaux (Windows ou macOS), des environnements conteneurisés (Docker ou Kubernetes) ainsi que sur site dans des centres de données. Vous pouvez installer et configurer l'Agent à l'aide d'outils de gestion de la configuration (Chef, Puppet ou Ansible).

L'Agent est capable de recueillir 75 à 100 métriques système toutes les 15 à 20 secondes. Avec une configuration supplémentaire, il est même possible d'envoyer en temps réel des données, logs et traces provenant de processus en cours d'exécution à la plateforme Datadog. L'Agent Datadog est open source et son code source est disponible sur GitHub dans [DataDog/datadog-agent][1].

### Charge de l'Agent

L'espace et les ressources requis pour l'Agent varient selon la configuration et les données envoyées. Lors d'une première utilisation, l'Agent utilise en moyenne environ 0,08 % du CPU et 830 à 880 Mo d'espace disque.

Consultez la rubrique [Charge de l'Agent][2] pour en savoir plus sur ces benchmarks.

### Données collectées

#### Métriques de l'Agent

Les métriques de l'Agent suivantes correspondent aux informations envoyées par l'Agent à Datadog à son propre sujet. Elles vous permettent d'identifier les hosts ou conteneurs sur lesquels des Agents s'exécutent, l'heure de lancement d'un Agent, ou encore la version de Python exécutée par un Agent.

| Métrique                           | Description                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `datadog.agent.python.version` | Affiche la valeur `1` si l'Agent transmet des données à Datadog. Le tag `python_version` est ajouté à la métrique. |
| `datadog.agent.running`        | Affiche la valeur `1` si l'Agent transmet des données à Datadog.                                                 |
| `datadog.agent.started`        | Nombre ayant pour valeur `1` envoyé lorsque l'Agent se lance (disponible pour les versions 6.12 et ultérieures).                                        |

Consultez l'intégration [Agent Metrics][3] pour obtenir la liste complète des métriques de l'Agent.

#### Checks

En fonction de votre plateforme, l'Agent présente plusieurs checks de base activés par défaut qui recueillent des métriques.

| Check       | Métriques       | Plateformes          |
| ----------- | ------------- | ------------------ |
| CPU         | [System][4]  | Toutes                |
| Disk        | [Disk][5]    | Toutes                |
| IO          | [System][4]  | Toutes                |
| Memory      | [System][4]  | Toutes                |
| Network     | [Network][6] | Toutes                |
| NTP         | [NTP][7]     | Toutes                |
| Uptime      | [System][4]  | Toutes                |
| File Handle | [System][4]  | Toutes sauf Mac     |
| Load        | [System][4]  | Toutes sauf Windows |
| Docker      | [Docker][8]  | Docker             |
| Winproc     | [System][4]  | Windows            |

Pour recueillir des métriques provenant d'autres technologies, consultez la page relative aux [intégrations][9].

## Différences entre les Agents pour hosts et les Agents pour conteneurs

Ce guide décrit la procédure d'installation et de configuration d'un Agent sur un host. Si vous comptez installer par la suite des Agents dans un environnement conteneurisé, sachez que la marche à suivre diffère légèrement.

1. Pour une installation sur un host, la configuration de l'Agent est basée sur un fichier YAML (tel que décrit plus en détail dans ce guide). À l'inverse, sur un conteneur, les options de configuration sont définies via des [variables d'environnement][10]. Exemples :
    - `DD_API_KEY` pour la clé d'API Datadog
    - `DD_SITE` pour le site Datadog

2. De la même manière, sur un host, les [intégrations][9] sont activées à l'aide du fichier de configuration de l'Agent, tandis que dans un environnement conteneurisé, la fonctionnalité Autodiscovery de Datadog identifie automatiquement les intégrations. Consultez la section [Fonction Autodiscovery de l'Agent][11] pour en savoir plus.

Référez-vous aux sections relatives à [Agent Docker][12] ou à [Kubernetes][13] pour découvrir un exemple d'exécution de l'Agent dans un environnement conteneurisé.

## Pourquoi installer l'Agent

L'Agent doit être installé afin de pouvoir envoyer des données à partir des nombreuses intégrations basées sur l'Agent. Il n'est pas forcément nécessaire d'utiliser l'Agent pour transmettre des données à la plateforme Datadog : par exemple, il est possible d'envoyer des logs et des métriques par l'intermédiaire de l'API Datadog. Toutefois, il s'agit de l'outil recommandé pour transmettre vos données à la plateforme Datadog.

L'Agent recueille des données sur les hosts toutes les 15 secondes, afin que vous puissiez visualiser en détail l'activité de vos environnements. Comme indiqué précédemment à la rubrique [Checks][14], l'Agent dispose de plusieurs checks qui recueillent plus de 50 métriques par défaut, afin d'améliorer votre visibilité sur vos données système.

## Implémentation

### Prérequis

1. Créez un [compte Datadog][15].

2. Notez votre [clé d'API Datadog][16] afin de pouvoir y accéder facilement. 

3. Ouvrez l'interface Datadog.

**Remarque** : l'exemple de ce guide repose sur le système d'exploitation Ubuntu. Référez-vous à la page [Utilisation de base de l'Agent][17] pour consulter la liste complète des plateformes prises en charge. 

### Installation

Dans l'interface Datadog, cliquez sur **Integrations > Agent** pour accéder à la page d'installation de l'Agent, puis sélectionnez Ubuntu. Pour installer l'Agent Datadog sur un host, utilisez la commande d'installation d'une ligne indiquée sur cette page (voir l'exemple ci-dessous), en prenant soin de spécifier votre [clé d'API Datadog][16].

Exemple de commande d'installation Ubuntu d'une ligne :

```shell
DD_API_KEY=<CLÉ_API_DATADOG> DD_SITE="{{< region-param key="dd_site" >}}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Pour obtenir les dernières instructions d'installation, accédez à la [page d'installation de l'Agent][18] pour votre système d'exploitation dans l'application.

### Validation

#### Commande dans le terminal

Exécutez la [commande status][19] de l'Agent pour vérifier que l'installation s'est bien déroulée.

```shell
sudo datadog-agent status
```
Si aucune erreur n'a été rencontrée lors de l'installation, un rapport sur le statut de l'Agent est renvoyé. Les premières lignes ressemblent alors à ce qui suit :

```text
===============
Agent (v7.36.1)
===============

  Status date: 2022-06-15 15:54:48.364 EDT / 2022-06-15 19:54:48.364 UTC (1655322888364)
  Agent start: 2022-06-15 15:54:29.85 EDT / 2022-06-15 19:54:29.85 UTC (1655322869850)
  Pid: 9801
  Go Version: go1.17.6
  Python Version: 3.8.11
  Build arch: amd64
  Agent flavor: agent
  Check Runners: 6
  Log Level: info
```

#### Événements

Dans l'interface Datadog, cliquez sur **Events > Explorer** pour accéder à la page de l'Events Explorer. L'Agent envoie des événements à Datadog dès lors qu'un Agent est démarré ou redémarré. Le message suivant s'affiche si votre Agent a bien été installé :

```text
Datadog agent (v. 7.XX.X) started on <Hostname>
```

#### Checks de service

La configuration de base de l'Agent permet d'obtenir les checks de service suivants :

  - `datadog.agent.up` :
    renvoie `OK` si l'Agent est connecté à Datadog.

  - `datadog.agent.check_status` :
    renvoie `CRITICAL` si un check de l'Agent ne parvient pas à envoyer des métriques à Datadog. Si ce n'est pas le cas, renvoie `OK`.

Grâce à ces checks, vous pouvez visualiser en quelques secondes le statut de l'Agent, par l'intermédiaire des monitors et dashboards de la plateforme Datadog. Consultez la [présentation des checks de service][20] pour en savoir plus.

#### Métriques

Depuis l'interface Datadog, sélectionnez **Metrics > Summary** pour accéder à la page Metrics Summary, puis recherchez la métrique `datadog.agent.started` ou `datadog.agent.running`. Si ces métriques ne s'affichent pas de suite, il est possible que vous deviez attendre quelques minutes le temps que l'Agent envoie les données à la plateforme Datadog.

Cliquez sur l'une des métriques pour ouvrir un volet connexe. Ce dernier contient des métadonnées supplémentaires à propos de l'origine des métriques et des tags associés. Dans cet exemple, nous n'avons pas encore configuré de tag sur ce host. Vous devriez donc voir uniquement les tags par défaut attribués aux métriques, notamment `version` et `host`. Consultez la rubrique « Fichiers de configuration de l'Agent » ci-dessous pour en savoir plus sur l'ajout de tags.

Découvrez plus d'informations sur d'autres métriques par défaut, comme `ntp.offset` et `system.cpu.idle`.

## Fichiers de configuration de l'Agent

Le principal fichier de configuration de l'Agent s'intitule `datadog.yaml`. Il requiert les paramètres suivants :
- votre [clé d'API Datadog][16], qui permet d'associer les données de votre Agent à votre organisation, et
- le site Datadog ({{< region-param key="dd_site" code="true" >}}).

Consultez l'[exemple de fichier `config_template.yaml`][21] pour découvrir toutes les options de configuration disponibles.

Vous pouvez apporter des modifications aux fichiers de configuration d'Agent afin de bénéficier d'autres fonctionnalités Datadog, notamment les tags.

#### Définir des tags via le fichier de configuration de l'Agent

Les tags fournissent une couche de métadonnées supplémentaire pour vos métriques et événements. Ils vous permettent de filtrer et de comparer vos données au sein de visualisations Datadog. Lorsque des données sont envoyées à Datadog à partir de plusieurs hosts, l'ajout de tags vous permet d'afficher uniquement les données les plus pertinentes.

Par exemple, imaginons que vos données soient recueillies à partir de plusieurs équipes et que vous souhaitiez afficher uniquement celles de l'équipe alpha. Si vous ajoutez aux hosts pertinents les tags `team:alpha` ou `team:bravo`, vous pouvez appliquer à vos métriques un filtre basé sur le tag `team:alpha`, afin de n'afficher que les données de cette équipe. Consultez la section [Débuter avec les tags][22] pour en savoir plus sur l'ajout de tags à vos données. 

1. Accédez au [fichier de configuration principal][23] de votre Agent. Sous Ubuntu, il est situé à l'emplacement `/etc/datadog-agent/datadog.yaml`.

2. Dans le fichier `datadog.yaml`, repérez le paramètre `tags`. Les tags au niveau des hosts peuvent être définis dans le fichier de configuration `datadog.yaml`, afin d'appliquer des tags à l'ensemble des métriques, traces et logs transmis à partir de ce host.

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

3. Supprimez la mise en commentaire du paramètre tags et de l'exemple de tag `team:infra` fourni. Vous pouvez également ajouter votre propre tag personnalisé, comme `test:agent_exemple`.
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

4. Exécutez la [commande restart][24] de l'Agent pour le redémarrer. Sous Ubuntu, il s'agit de la commande suivante :

   ```shell
   sudo service datadog-agent restart
   ```

5. Patientez quelques minutes, accédez à nouveau à **Metrics > Summary**, puis cliquez sur la métrique `datadog.agent.started`. En plus des tags `host` et `version` par défaut, le tag `team` ainsi que tous les tags personnalisés que vous avez ajoutés sont affichés. Vous pouvez également filtrer les métriques en fonction du champ `Tag` en haut de la page.

6. Accédez à **Events > Explorer** et recherchez les tags personnalisés affichés dans le dernier événement de l'Agent.

#### Autres options de configuration

La collecte des données de [logs][25], [traces][26] et [processus][27] peut être activée dans le fichier de configuration de l'Agent. Ces fonctionnalités ne sont pas activées par défaut. Par exemple, dans le fichier de configuration, vous pouvez voir que le paramètre `logs_enabled` est défini sur false.

```yaml
##################################
## Configuration de la collecte de logs ##
##################################

## @param logs_enabled - booléen, facultatif, valeur par défaut : false
## @env DD_LOGS_ENABLED - booléen, facultatif, valeur par défaut : false
## Pour activer la collecte de logs de l'Agent Datadog, définir logs_enabled sur true.
#
# logs_enabled: false
```

D'autres fonctionnalités Datadog peuvent être configurées par l'intermédiaire du fichier de configuration de l'Agent, notamment :
- L'[ingestion des traces OTLP][28]
- La [personnalisation de la collecte de logs][29], afin de filtrer ou de nettoyer les données sensibles
- La configuration de données personnalisées via [DogStatsD][30]

Tout au long de la configuration, si la documentation mentionne le fichier `datadog.yaml` ou le fichier de configuration de l'Agent, cela désigne le fichier que vous devez configurer.

## Commandes

Consultez la section [Commandes de l'Agent][31] pour [démarrer][32], [arrêter][33] ou [redémarrer][24] votre Agent.

## Dépannage

Pour dépanner plus facilement l'Agent :

- Consultez la section [Dépannage de l'Agent][34].
- Accédez aux [fichiers de log de l'Agent][35].
- Contactez l'[assistance Datadog][36].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<p>

## Étapes suivantes

{{< whatsnext desc="Ressources utiles après avoir installé l'Agent :">}}
{{< nextlink href="/getting_started/integrations" >}}En savoir plus sur les intégrations{{< /nextlink >}}
{{< nextlink href="/getting_started/application" >}}En savoir plus sur l'interface Datadog{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}Découvrir comment recueillir des logs avec l'Agent{{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}Découvrir comment recueillir des traces avec l'Agent{{< /nextlink >}}
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
[17]: /fr/agent/basic_agent_usage/?tab=agentv6v7
[18]: https://app.datadoghq.com/account/settings/agent/latest
[19]: /fr/agent/guide/agent-commands/#agent-status-and-information
[20]: /fr/developers/service_checks/#visualize-your-service-check-in-datadog
[21]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[22]: /fr/getting_started/tagging/
[23]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[24]: /fr/agent/guide/agent-commands/#restart-the-agent
[25]: /fr/logs/
[26]: /fr/tracing/
[27]: /fr/infrastructure/process/?tab=linuxwindows#introduction
[28]: /fr/opentelemetry/otlp_ingest_in_the_agent/?tab=host
[29]: /fr/agent/logs/advanced_log_collection/
[30]: /fr/developers/dogstatsd/?tab=hostagent
[31]: /fr/agent/guide/agent-commands/
[32]: /fr/agent/guide/agent-commands/#start-the-agent
[33]: /fr/agent/guide/agent-commands/#stop-the-agent
[34]: /fr/agent/troubleshooting/
[35]: /fr/agent/guide/agent-log-files/
[36]: /fr/help/
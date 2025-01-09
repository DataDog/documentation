---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Sonarqube Overview: assets/dashboards/overview.json
  logs:
    source: sonarqube
  metrics_metadata: metadata.csv
  monitors:
    SonarQube vulnerabilities: assets/recommended_monitors/vulnerabilities.json
  saved_views:
    status_overview: assets/saved_views/status_overview.json
  service_checks: assets/service_checks.json
categories:
- security
- issue tracking
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sonarqube/README.md
display_name: SonarQube
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-sonarqube-integration/
  tag: Blog
  text: Surveiller la qualité du code dans Datadog avec SonarQube
git_integration_title: sonarqube
guid: ce089575-93bf-47f0-80b6-ffaf6e34722c
integration_id: sonarqube
integration_title: SonarQube
integration_version: 2.0.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sonarqube.
metric_to_check: sonarqube.server.database.pool_active_connections
name: sonarqube
public_title: SonarQube
short_description: Surveillez votre serveur et vos projets SonarQube.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [SonarQube][1].

## Configuration

### Installation

Le check SonarQube est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

SonarQube recueille des métriques à partir de deux sources : son API Web et JMX. Pour recueillir toutes les [métriques spécifiées ci-dessous](#metriques), configurez trois instances de ce check : la première pour surveiller l'API Web de SonarQube, et les deux autres pour surveiller les beans JMX de SonarQube.

La documentation relative à l'API Web de SonarQube est disponible sous `/web_api` dans l'interface Web de SonarQube. Par défaut, cette intégration recueille toutes les métriques de performance SonarQube pertinentes qui sont exposées via des beans JMX SonarQube. La configuration pour ces métriques par défaut est disponible dans le fichier [sonarqube.d/metrics.yaml][3]. La documentation relative à ces beans figure sur le [site Web de SonarQube][4] (en anglais).

Le serveur JMX de SonarQube n'est **pas activé** par défaut. Tant que vous ne l'activez pas, les métriques `sonarqube.server.*` ne sont pas recueillies. Pour obtenir plus d'informations concernant l'activation et la configuration de JMX dans SonarQube, consultez la documentation [SonarQube][5] (en anglais). Vous trouverez ci-dessous les configurations requises pour activer le serveur JMX pour quelques-uns des processus Java communs :

```conf
# SERVEUR WEB
sonar.web.javaAdditionalOpts="
  -Dcom.sun.management.jmxremote=true
  -Dcom.sun.management.jmxremote.port=10443
  -Dcom.sun.management.jmxremote.rmi.port=10443
  ...
  "

# COMPUTE ENGINE
sonar.ce.javaAdditionalOpts="
  -Dcom.sun.management.jmxremote=true
  -Dcom.sun.management.jmxremote.port=10444
  -Dcom.sun.management.jmxremote.rmi.port=10444
  ...
  "

# ELASTICSEARCH
sonar.search.javaAdditionalOpts="
  -Dcom.sun.management.jmxremote=true
  -Dcom.sun.management.jmxremote.port=10445
  -Dcom.sun.management.jmxremote.rmi.port=10445
  ...
  "
```

Voici un exemple de fichier `sonarqube.d/conf.yaml` de base, reposant sur les valeurs par défaut de SonarQube et JMX. Vous pouvez l'utiliser comme point de départ lorsque vous configurez l'installation de l'Agent, qu'il soit basé sur des hosts ou des conteneurs.

```yaml
init_config:
    is_jmx: false
    collect_default_metrics: true
instances:

  # Instance d'API Web
  - is_jmx: false
    web_endpoint: http://localhost:9000
    auth_type: basic
    username: <nom_utilisateur>    # Défini dans l'interface Web
    password: <mot_de_passe>    # Défini dans l'interface Web
    default_tag: component  # Facultatif
    components:             # Obligatoire
      my-project:
        tag: project_name

  # Instance JMX Web
  - is_jmx: true
    host: localhost
    port: 10443           # Voir sonar.web.javaAdditionalOpts dans le fichier sonar.properties de SonarQube
    user: <nom_utilisateur>      # Défini dans le fichier sonar.properties de SonarQube
    password: <password>  # Défini dans le fichier sonar.properties de SonarQube

  # Instance JMX Compute Engine
  - is_jmx: true
    host: localhost
    port: 10444           # Voir sonar.ce.javaAdditionalOpts dans le fichier sonar.properties de SonarQube
    user: <nom_utilisateur>      # Défini dans le fichier sonar.properties de SonarQube
    password: <mot_de_passe>  # Défini dans le fichier sonar.properties de SonarQube
```

**Remarque** : une fois l'intégration configurée, demandez à SonarQube d'analyser au moins un de vos projets afin que les métriques soient renseignées dans Datadog.

Par défaut, le tag `component` est appliqué aux métriques recueillies par cette intégration. Si vous souhaitez changer le nom du tag pour chaque composant, spécifiez la propriété `tag` dans la définition du composant. Pour configurer ce tag pour tous les projets, définissez la propriété `default_tag` sur la configuration de l'instance.

**Remarque** : les projets dans SonarQube contiennent souvent plusieurs branches de contrôle de source. Cette intégration ne peut recueillir des métriques qu'à partir de la branche par défaut dans SonarQube (généralement `main`).

SonarQube expose un serveur de recherche qui peut être surveillé en utilisant une instance supplémentaire de cette intégration et en configurant les métriques JMX à recueillir. Pour découvrir en détail comment personnaliser les métriques à recueillir, consultez la [documentation relative aux checks JMX][6]. À titre d'exemple, vous pouvez utiliser la configuration ci-dessous ainsi que la configuration de métriques JMX par défaut dans [sonarqube.d/metrics.yaml][3].

```yaml
init_config:
  # La liste des métriques qui seront recueillies par cette intégration.
  config:
    - include:
      domain: SonarQube
      name: <name>
      exclude_tags:
        - name
      attribute:
        MyMetric:
          alias: sonarqube.search_server.my_metric
          metric_type: gauge
instances:
  # Instance JMX du serveur de recherche
  - is_jmx: true
    host: localhost
    port: 10445           # Voir sonar.search.javaAdditionalOpts dans le fichier sonar.properties de SonarQube
    user: <nom_utilisateur>      # Défini dans le fichier sonar.properties de SonarQube
    password: <mot_de_passe>  # Défini dans le fichier sonar.properties de SonarQube
```

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `sonarqube.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données SonarQube.
   Consultez le [fichier d'exemple sonarqube.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance JMX. Le nombre de métriques renvoyées est indiqué sur la page d'informations.
   Choisissez les métriques qui vous intéressent en modifiant la configuration ci-dessous.
   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][2] afin d'obtenir des instructions détaillées.
   Si vous devez surveiller davantage de métriques, contactez [l'assistance Datadog][3].

2. [Redémarrez l'Agent][4].

##### Collecte de logs

1. Activez la [journalisation][5] SonarQube.

2. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

3. Ajoutez le bloc de configuration suivant à votre fichier `sonarqube.d/conf.yaml`. Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple sonarqube.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   logs:
     - type: file
       path: /opt/sonarqube/logs/access.log
       source: sonarqube
     - type: file
       path: /opt/sonarqube/logs/ce.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/es.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/sonar.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
     - type: file
       path: /opt/sonarqube/logs/web.log
       source: sonarqube
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

5. [Redémarrez l'Agent][4].

[1]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/integrations/java/
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.sonarqube.org/latest/instance-administration/system-info/
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

##### Collecte de métriques

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][1].

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][2].

| Paramètre      | Valeur                                              |
| -------------- | -------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "sonarqube"}` |

[1]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/fr/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `sonarqube` dans la section **JMXFetch** :

```text
========
JMXFetch
========
  Initialized checks
  ==================
    sonarqube
      instance_name : sonarqube-localhost-10444
      message : <no value>
      metric_count : 33
      service_check_count : 0
      status : OK
      instance_name : sonarqube-localhost-10443
      message : <no value>
      metric_count : 38
      service_check_count : 0
      status : OK
```

Si vous avez défini une instance sans `is_jmx: true`, cherchez également `sonarqube` dans la section **Collector** :

```text
=========
Collector
=========
  Running Checks
  ==============
    sonarqube (1.1.0)
    -----------------
      Instance ID: sonarqube:1249c1ed7c7b489a [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/sonarqube.d/conf.yaml
      Total Runs: 51
      Metric Samples: Last Run: 39, Total: 1,989
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 51
      Average Execution Time : 1.19s
      Last Execution Date : 2021-03-12 00:00:44.000000 UTC
      Last Successful Execution Date : 2021-03-12 00:00:44.000000 UTC
```

## Données collectées

### Métriques
{{< get-metrics-from-git "sonarqube" >}}


### Événements

SonarQube n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "sonarqube" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://www.sonarqube.org
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/sonarqube/datadog_checks/sonarqube/data/metrics.yaml
[4]: https://docs.sonarqube.org/latest/instance-administration/monitoring/
[5]: https://docs.sonarqube.org/latest/instance-administration/monitoring/#header-4
[6]: https://docs.datadoghq.com/fr/integrations/java/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/fr/help/
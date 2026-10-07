---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    metrics: assets/dashboards/metrics.json
    overview: assets/dashboards/overview.json
  logs:
    source: weblogic
  metrics_metadata: metadata.csv
  monitors:
    active_threads: assets/monitors/active_threads.json
    stuck_threads: assets/monitors/stuck_threads.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- log collection
- web
- oracle
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/weblogic/README.md
display_name: WebLogic
draft: false
git_integration_title: weblogic
guid: 7c48d184-c234-4366-b463-46a1faf27f84
integration_id: weblogic
integration_title: WebLogic
integration_version: 1.1.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: weblogic.
metric_to_check: weblogic.jvm_runtime.heap_size
name: weblogic
process_signatures:
- java weblogic.Server
public_title: WebLogic
short_description: Surveillez l'intégrité et les performances de vos serveurs WebLogic.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller des serveurs [WebLogic][1] Oracle.

## Configuration

### Installation

Le check WebLogic est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

1. Ce check, qui repose sur JMX, recueille les métriques du serveur MBean de la plateforme qui sont exportées par la JVM. La surveillance JMX à distance doit donc être activée pour vos serveurs WebLogic. Consultez la rubrique [Surveillance et gestion à distance][3] (en anglais) pour obtenir des instructions d'installation.

2. Définissez la propriété système `-Djavax.management.builder.initial=weblogic.management.jmx.mbeanserver.WLSMBeanServerBuilder` pour activer ces métriques sur le serveur MBean de la plateforme. Cette propriété peut être configurée dans la console d'administration du serveur WebLogic ou dans des scripts de démarrage de serveur :


   _**Activation dans la console d'administration**_

   ```
   Domain => Configuration => General => Advanced => Platform MBean Server Enabled
   ```

   _**Activation dans des scripts de démarrage de serveur**_

   ```yaml
   -Djavax.management.builder.initial=weblogic.management.jmx.mbeanserver.WLSMBeanServerBuilder
   ```

   Pour en savoir plus, consultez la [documentation WebLogic][4] (en anglais).


3. Vérifiez que l'attribut [`PlatformMBeanServerUsed`][5] est défini sur `true` dans la console d'administration du serveur WebLogic. Il s'agit de la valeur par défaut depuis la version 10.3.3.0 des serveurs WebLogic. Ce paramètre est accessible depuis la console d'administration des serveurs WebLogic ou peut être configuré à l'aide de WebLogic Scripting Tool (WSLT).

   _**Activation dans la console d'administration**_

   ```
   Domain (<WEBLOGIC_SERVER>) => Configuration => General => (Advanced) => Platform MBeanServer Enabled
   ```

   _**Activation dans WLST**_

   Commencez une session d'édition. Accédez au répertoire JMX du domaine et utilisez le paramètre `cmo.setPlatformMBeanServerUsed(true)` pour activer l'attribut si ce dernier est défini sur `false`.

   Par exemple :
   ```
   # > java weblogic.WLST
   (wlst) > connect('weblogic','weblogic')
   (wlst) > edit()
   (wlst) > startEdit()
   (wlst) > cd('JMX/<DOMAIN_NAME>')
   (wlst) > set('EditMBeanServerEnabled','true')
   (wlst) > activate()
   (wlst) > exit()
   ```

   Appliquez les modifications et redémarrez le serveur WebLogic.

### Configuration

1. Modifiez le fichier `weblogic.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance WebLogic.
   Consultez le [fichier d'exemple weblogic.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance. Exécutez la [commande status][7] de l'Agent Datadog pour vérifier le nombre de métriques actuellement renvoyées.
   Choisissez les métriques qui vous intéressent en modifiant la [configuration][6].

   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][8] afin d'obtenir des instructions détaillées.
   Si vous devez surveiller davantage de métriques, contactez [l'assistance Datadog][9].

2. [Redémarrez l'Agent][10].

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `weblogic` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "weblogic" >}}


### Collecte de logs

1. Par défaut, les services de journalisation de WebLogic reposent sur une implémentation basée sur les API de logging Java. Dupliquez et modifiez la [pipeline d'intégration][12] si vous utilisez un autre format. 

2. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :
   ```yaml
   logs_enabled: true
   ```

3. Supprimez la mise en commentaire du bloc de configuration des logs du fichier `weblogic.d/conf.yaml` et modifiez les paramètres. Modifiez les valeurs des paramètres path et service en fonction de votre environnement. Consultez le [fichier d'exemple weblogic.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.
   ```yaml
    - type: file
      path: <DOMAIN_DIR>/servers/<ADMIN_SERVER_NAME>/logs/<ADMIN_SERVER_NAME>.log
      source: weblogic
      service: admin-server
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/<ADMIN_SERVER_NAME>/logs/<DOMAIN_NAME>.log
      source: weblogic
      service: domain
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/<SERVER_NAME>/logs/<SERVER_NAME>.log
      source: weblogic
      service: managed-server
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: (\####)?<\w{3} (0?[1-9]|[12][0-9]|3[01]), \d{4}
    - type: file
      path: <DOMAIN_DIR>/servers/*/logs/access.log 
      source: weblogic
      service: http-access
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_date
          pattern: .*\[\d{2}\/(\w{3}|\w{4})\/\d{4}:\d{2}:\d{2}:\d{2} (\+|-)\d{4}\]
   ```
4. [Redémarrez l'Agent][10].

### Environnement conteneurisé
Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][13].

### Événements

L'intégration WebLogic n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "weblogic" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].


[1]: https://docs.datadoghq.com/fr/integrations/weblogic/?tab=host#pagetitle
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.oracle.com/javase/8/docs/technotes/guides/management/agent.html#gdenl
[4]: https://support.oracle.com/cloud/faces/DocumentDisplay?_afrLoop=308314682308664&_afrWindowMode=0&id=1465052.1&_adf.ctrl-state=10ue97j4er_4
[5]: https://docs.oracle.com/en/middleware/standalone/weblogic-server/14.1.1.0/jmxcu/understandwls.html#GUID-1D2E290E-F762-44A8-99C2-EB857EB12387
[6]: https://github.com/DataDog/integrations-core/blob/master/weblogic/datadog_checks/weblogic/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/fr/integrations/java/
[9]: https://docs.datadoghq.com/fr/help/
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://github.com/DataDog/integrations-core/blob/master/weblogic/metadata.csv
[12]: https://docs.datadoghq.com/fr/logs/processing/#integration-pipelines
[13]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[14]: https://github.com/DataDog/integrations-core/blob/master/weblogic/assets/service_checks.json
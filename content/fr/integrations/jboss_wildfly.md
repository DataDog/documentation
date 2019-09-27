---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/README.md'
display_name: JBoss/WildFly
git_integration_title: jboss_wildfly
guid: ff99b3d2-9c14-4cdf-b869-7b8b1cbf0716
integration_id: jboss-wildfly
integration_title: JBoss/WildFly
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: jboss.
metric_to_check: ''
name: jboss_wildfly
public_title: Intégration Datadog/JBoss/WildFly
short_description: Recueille diverses métriques JMX fournies par des applications JBoss et WildFly
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille les applications [JBoss][1] et [WildFly][2].

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][3] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check JBoss/WildFly est inclus avec le paquet de l'[Agent Datadog][4]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `jboss_wildfly.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir les données de performance
   de votre serveur d'application JBoss ou WildFly. Consultez le [fichier d'exemple jboss_wildfly.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué dans la page d'information.
   Vous pouvez choisir des métriques pertinentes en modifiant la configuration ci-dessous.
   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][6] afin d'obtenir des instructions détaillées. 
   Si vous devez surveiller davantage de métriques, contactez [l'assistance Datadog][7].

2. [Redémarrez l'Agent][8].

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Modifiez ensuite `jboss_wildfly.d/conf.yaml` en supprimant la mise en commentaire des lignes `logs` en bas du fichier. Mettez à jour la ligne `path` en indiquant le bon chemin vers vos fichiers de log JBoss.

    ```
      logs:
        - type: file
          path: /opt/jboss/wildfly/standalone/log/*.log
          source: jboss_wildfly
          service: <APPLICATION_NAME>
    ```

3. [Redémarrez l'Agent][8].

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `jboss_wildfly` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "jboss_wildfly" >}}


### Événements

L'intégration JBoss/WildFly n'inclut aucun événement.

### Checks de service

L'intégration JBoss/WildFly n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://developers.redhat.com/products/eap/overview
[2]: http://wildfly.org
[3]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/integrations/java
[7]: https://docs.datadoghq.com/fr/help
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information


{{< get-dependencies >}}
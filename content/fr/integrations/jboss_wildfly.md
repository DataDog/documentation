---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
  - autodiscovery
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

## Configuration

### Installation

Le check JBoss/WildFly est inclus avec le paquet de l'[Agent Datadog][3]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration
#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `jboss_wildfly.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir les données de performance de votre serveur d'applications JBoss ou WildFly. Consultez le [fichier d'exemple jboss_wildfly.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

  **Remarque** : ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué dans la page d'information. Vous pouvez choisir des métriques pertinentes en modifiant la configuration ci-dessous. Pour découvrir comment modifier la liste des métriques recueillies, consultez la [documentation relative aux checks JMX][5] afin d'obtenir des instructions détaillées. Si vous souhaitez surveiller plus de 350 métriques, contactez [l'assistance Datadog][6].

2. [Redémarrez l'Agent][7].

##### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Modifiez ensuite `jboss_wildfly.d/conf.yaml` en supprimant la mise en commentaire des lignes `logs` en bas du fichier. Mettez à jour la ligne `path` en indiquant le bon chemin vers vos fichiers de log JBoss.

    ```yaml
      logs:
        - type: file
          path: /opt/jboss/wildfly/standalone/log/*.log
          source: jboss_wildfly
          service: <APPLICATION_NAME>
    ```

3. [Redémarrez l'Agent][7].

#### Environnement conteneurisé
##### Collecte de métriques

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][8].

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][9].

| Paramètre      | Valeur                                                      |
|----------------|------------------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "jboss_wildfly", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `jboss_wildfly` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "jboss_wildfly" >}}


### Événements

L'intégration JBoss/WildFly n'inclut aucun événement.

### Checks de service

L'intégration JBoss/WildFly n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://developers.redhat.com/products/eap/overview
[2]: http://wildfly.org
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/integrations/java
[6]: https://docs.datadoghq.com/fr/help
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[9]: https://docs.datadoghq.com/fr/agent/docker/log/
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/metadata.csv
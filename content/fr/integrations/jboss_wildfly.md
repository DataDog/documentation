---
app_id: jboss-wildfly
app_uuid: 4ad5a2e9-106b-43a2-820a-f146c7effffe
assets:
  dashboards:
    JBoss WildFly: assets/dashboards/jboss_wildfly.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: jboss.jdbc_connections.count
      metadata_path: metadata.csv
      prefix: jboss.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: JBoss/WildFly
  logs:
    source: jboss_wildfly
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- web
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/README.md
display_on_public_website: true
draft: false
git_integration_title: jboss_wildfly
integration_id: jboss-wildfly
integration_title: JBoss/WildFly
integration_version: 2.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: jboss_wildfly
public_title: JBoss/WildFly
short_description: Recueille diverses métriques JMX fournies par des applications
  JBoss et WildFly
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Web
  - Category::Log Collection
  configuration: README.md#Setup
  description: Recueille diverses métriques JMX fournies par des applications JBoss
    et WildFly
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: JBoss/WildFly
---



## Présentation

Ce check permet de surveiller les applications [JBoss][1] et [WildFly][2].

## Implémentation

### Installation

Le check JBoss/WildFly est inclus avec le package de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur votre host JBoss/WildFly.

### Configuration

Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué sur la page d'information. Vous pouvez choisir des métriques pertinentes en modifiant la configuration ci-dessous. Pour découvrir comment modifier la liste des métriques recueillies, consultez la [documentation relative aux checks JMX][4] afin d'obtenir des instructions détaillées. Si vous souhaitez surveiller plus de 350 métriques, contactez [l'assistance Datadog][5].

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `jboss_wildfly.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir les données de performance de votre serveur d'applications JBoss ou WildFly. Consultez le [fichier d'exemple jboss_wildfly.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

    Selon la configuration de votre serveur (notamment si vous utilisez le schéma JMX `remote+http`), il se peut que vous deviez spécifier un JAR personnalisé pour vous connecter au serveur. Placez le JAR sur la même machine que votre Agent et spécifiez le chemin via l'option `custom_jar_paths` dans votre fichier `jboss_wildfly.d/conf.yaml`.

    **Remarque** : le format des URL JMX est différent selon votre version de WildFly :

   - Wildfly 9 et versions antérieures : `service:jmx:http-remoting-jmx://<HOST>:<PORT>`
   - Wildfly 10+ : `service:jmx:remote+http://<HOST>:<PORT>`

    Consultez la [page de configuration du sous-système JMX pour WildFly][2] pour en savoir plus.

2. [Redémarrez l'Agent][3].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

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
       service: '<APPLICATION_NAME>'
   ```

3. [Redémarrez l'Agent][3].

[1]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[2]: https://docs.jboss.org/author/display/WFLY9/JMX%20subsystem%20configuration.html
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

##### Collecte de métriques

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][1].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                                      |
| -------------- | ---------------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "jboss_wildfly", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `jboss_wildfly` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "jboss_wildfly" >}}


### Événements

L'intégration JBoss/WildFly n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "jboss_wildfly" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].



[1]: https://developers.redhat.com/products/eap/overview
[2]: http://wildfly.org
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/integrations/java/
[5]: https://docs.datadoghq.com/fr/help/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
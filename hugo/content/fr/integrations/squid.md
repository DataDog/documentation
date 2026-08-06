---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: squid
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- web
- caching
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/squid/README.md
display_name: Squid
draft: false
git_integration_title: squid
guid: e7d4b233-b32a-46f9-8cb2-c582ee8fd251
integration_id: squid
integration_title: Squid
integration_version: 2.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: squid.
metric_to_check: squid.cachemgr.cpu_time
name: squid
public_title: Intégration Datadog/Squid
short_description: Surveillez les métriques de vos serveurs squid-cache avec Datadog
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller les métriques [Squid][1] issues du Cache Manager avec l'Agent Datadog.

## Configuration

### Installation

Le check Squid de l'Agent est inclus avec l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `squid.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple squid.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Supprimez la mise en commentaire du bloc de configuration suivant en bas de votre fichier `squid.d/conf.yaml`, puis modifiez-le :

   ```yaml
   logs:
     - type: file
       path: /var/log/squid/cache.log
       service: "<SERVICE-NAME>"
       source: squid
     - type: file
       path: /var/log/squid/access.log
       service: "<SERVICE-NAME>"
       source: squid
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement.

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/squid/datadog_checks/squid/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `squid`                                                                |
| `<CONFIG_INIT>`      | vide ou `{}`                                                          |
| `<CONFIG_INSTANCE>`  | `{"name": "<NOM_INSTANCE_SQUID>", "host": "%%host%%", "port":"3128"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                               |
| -------------- | --------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "squid", "service": "<NOM_VOTRE_APPLICATION>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `squid` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "squid" >}}


### Événements

Le check Squid n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "squid" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].



[1]: http://www.squid-cache.org/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
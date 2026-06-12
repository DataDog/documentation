---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Twemproxy - Overview: assets/dashboards/twemproxy_overview.json
  logs:
    source: twemproxy
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- web
- autodiscovery
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/twemproxy/README.md
display_name: Twemproxy
draft: false
git_integration_title: twemproxy
guid: a5cca58a-9984-4226-ad1c-8dff73c9d6ac
integration_id: twemproxy
integration_title: Twemproxy
integration_version: 1.13.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: twemproxy.
metric_to_check: twemproxy.total_connections
name: twemproxy
public_title: Intégration Datadog/Twemproxy
short_description: Visualisez les performances de Twemproxy pour les corréler avec
  le reste de vos applications.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Suivez les statistiques globales et les statistiques de chaque pool pour chacun de vos serveurs Twemproxy. Ce check de l'Agent recueille les métriques pour les connexions et les erreurs client/serveur, les taux de requêtes et de réponses, les octets entrants/sortants du proxy, et plus encore.

## Configuration

### Installation

Le check Twemproxy de l'Agent est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs Twemproxy.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `twemproxy.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple twemproxy.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     - host: localhost
       port: 2222
   ```

2. [Redémarrez l'Agent][3] pour commencer à envoyer vos métriques Twemproxy à Datadog.

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `twemproxy.d/conf.yaml` pour commencer à recueillir vos logs Apache :

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: twemproxy
       service: "<SERVICE_NAME>"
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple twemproxy.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/twemproxy/datadog_checks/twemproxy/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                  |
| -------------------- | -------------------------------------- |
| `<NOM_INTÉGRATION>` | `twemproxy`                            |
| `<CONFIG_INIT>`      | vide ou `{}`                          |
| `<CONFIG_INSTANCE>`  | `{"host": "%%host%%", "port":"22222"}` |

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                            |
| -------------- | ------------------------------------------------ |
| `<CONFIG_LOG>` | `{"source": "twemproxy", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

Lancez la [sous-commande status de l'Agent][2] et cherchez `twemproxy` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "twemproxy" >}}


### Événements

Le check Twemproxy n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "twemproxy" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/fr/help/
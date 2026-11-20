---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Harbor Overview: assets/dashboards/overview.json
  logs:
    source: harbor
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- containers
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/harbor/README.md
display_name: Harbor
draft: false
git_integration_title: harbor
guid: 8fcaa5d7-a121-45ea-bde2-f12d55bc6286
integration_id: harbor
integration_title: Harbor
integration_version: 2.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: harbor.
metric_to_check: harbor.projects.count
name: harbor
public_title: Intégration Datadog/Harbor
short_description: Surveiller la santé de votre registre de conteneur Harbor
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [Harbor][1] avec l'Agent Datadog.

## Configuration

### Installation

Le check Harbor est inclus avec le package de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `harbor.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos données de performance Harbor. Consultez le [fichier d'exemple harbor.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

    **Remarque** : vous pouvez spécifier n'importe quel type d'utilisateur dans la configuration, mais un compte avec les autorisations admin est requis pour récupérer les métriques de disque. La métrique `harbor.projects.count` reflète uniquement le nombre de projets auxquels l'utilisateur indiqué a accès.

2. [Redémarrez l'Agent][3].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `harbor.d/conf.yaml` pour commencer à recueillir vos logs Harbor :

   ```yaml
     logs:
       - type: file
         path: /var/log/harbor/*.log
         source: harbor
         service: '<SERVICE_NAME>'
   ```

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/
[2]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `harbor`                                                                              |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                         |
| `<CONFIG_INSTANCE>`  | `{"url": "https://%%host%%", "username": "<ID_UTILISATEUR>", "password": "<MOTDEPASSE_UTILISATEUR>"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                               |
| -------------- | --------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "harbor", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `harbor` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "harbor" >}}


### Événements

L'intégration Harbor n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "harbor" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].



[1]: https://goharbor.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
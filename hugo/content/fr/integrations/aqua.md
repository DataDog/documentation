---
assets:
  dashboards:
    aqua: assets/dashboards/overview.json
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- sécurité
- monitoring
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/aqua/README.md
display_name: Aqua
draft: false
git_integration_title: aqua
guid: c269dad1-8db2-4e91-b25d-af646e80dbbf
integration_id: aqua
integration_title: Aqua
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: oran.moshai@aquasec.com
manifest_version: 1.0.0
metric_prefix: aqua.
metric_to_check: aqua.running_containers
name: aqua
public_title: Intégration Datadog/Aqua
short_description: Solution complète de sécurité pour les applications cloud natives
  et conteneurs, du développement à la production
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check surveille [Aqua][1].

Le check Aqua prévient l'utilisateur lorsque le niveau global de vulnérabilité dépasse un seuil élevé ou si un conteneur s'exécute au sein d'un host non enregistré par Aqua. Aqua envoie également des alertes de données relatives aux événements bloqués durant l'exécution. Vous pouvez aussi déclencher un webhook afin de faire évoluer votre infrastructure si jamais d'autres scanneurs Aqua sont requis.

## Configuration

Le check Aqua n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check Aqua sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-aqua==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

### Configuration

#### Collecte de métriques

1. Modifiez le fichier `aqua.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5] pour commencer à recueillir vos [métriques](#metriques) Aqua. Consultez le [fichier d'exemple aqua.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   instances:
     - url: http://your-aqua-instance.com
       api_user: "<API_USERNAME>"
       password: "<API_USER_PASSWORD>"
   ```

   Modifiez les valeurs des paramètres `api_user` et `password` et configurez-les pour votre environnement.

2. [Redémarrez l'Agent][7].

#### Collecte de logs

Aqua génère deux types de logs :

- Des logs d'audit
- Des logs d'exécution

Pour recueillir des logs d'audit Aqua :

1. Connectez-vous à votre compte Aqua.
2. Accédez à la section `Log Management` de la page `Integration`.
3. Activez l'intégration Webhook.
4. Ajoutez ensuite l'endpoint suivant : `{{< region-param key="http_endpoint" code="true" >}}/v1/input/<CLÉ_API_DATADOG>?ddsource=aqua`
   - Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][8].

Pour les logs d'exécution Aqua (**Disponible à partir des versions > 6.0 de l'Agent**) :

5. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans votre [configuration DaemonSet][9] :

   ```yaml
     # (...)
     env:
       # (...)
       - name: DD_LOGS_ENABLED
           value: "true"
       - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
           value: "true"
     # (...)
   ```

    Assurez-vous que le socket Docker est monté sur l'Agent Datadog. Consultez la documentation Kubernetes pour obtenir des [exemples de manifeste][10].

6. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande `status` de l'Agent][11] et cherchez `aqua` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "aqua" >}}


### Événements

Aqua ne comprend aucun événement.

### Checks de service
{{< get-service-checks-from-git "aqua" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][14].


[1]: https://www.aquasec.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://docs.datadoghq.com/fr/agent/faq/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#log-collection
[10]: https://docs.datadoghq.com/fr/agent/kubernetes/?tab=daemonset#installation
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/aqua/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/aqua/assets/service_checks.json
[14]: https://docs.datadoghq.com/fr/help/
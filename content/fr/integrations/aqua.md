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
  - 'https://github.com/DataDog/integrations-extras/blob/master/aqua/README.md'
display_name: Aqua
draft: false
git_integration_title: aqua
guid: c269dad1-8db2-4e91-b25d-af646e80dbbf
integration_id: aqua
integration_title: Aqua
is_public: true
kind: integration
maintainer: oran.moshai@aquasec.com
manifest_version: 1.0.0
metric_prefix: aqua.
metric_to_check: ''
name: aqua
public_title: Intégration Datadog/Aqua
short_description: 'Solution complète de sécurité pour les applications cloud natives et conteneurs, du développement à la production'
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille [Aqua][1].

Le check Aqua prévient l'utilisateur lorsque le niveau global de vulnérabilité dépasse un seuil élevé ou si un conteneur s'exécute au sein d'un host non enregistré par Aqua. Aqua envoit également des alertes de données relatives aux événements bloqués durant l'exécution. Vous pouvez également déclencher un webhook afin de faire évoluer votre infrastructure si jamais d'autres scanneurs Aqua sont requis.

## Configuration

Le check Aqua n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc
l'installer.

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Aqua sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec une [version < 6.8 de l'Agent][4] ou avec l'[Agent Docker][5] :

1. [Téléchargez et lancez l'Agent Datadog][2].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-aqua==<INTEGRATION_VERSION>
   ```
3. Configurez votre intégration comme [n'importe quelle autre intégration du paquet][6].

### Configuration

#### Collecte de métriques

1. Modifiez le fichier `aqua.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#metriques) Aqua. Consultez le [fichier d'exemple aqua.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   instances:
     - url: http://your-aqua-instance.com
       api_user: "<API_USERNAME>"
       password: "<API_USER_PASSWORD>"
   ```

   Modifiez les valeurs des paramètres `api_user` et `password` et configurez-les pour votre environnement.

2. [Redémarrez l'Agent][9].

#### Collecte de logs

Aqua génère deux types de logs :

- Des logs d'audit
- Des logs d'exécution

Pour recueillir des logs d'audit Aqua :

1. Connectez-vous à votre compte Aqua.
2. Accédez à la section `Log Management` de la page `Integration`.
3. Activez l'intégration Webhook.
4. Ajoutez ensuite l'endpoint suivant : `https://http-intake.logs.datadoghq.com/v1/input/<CLÉ_API_DATADOG>?ddsource=aqua`.

   - Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][10].
   - _Remarque_ : pour les pays de l'UE, remplacez `.com` par `.eu` dans l'endpoint.

    Pour les logs d'exécution Aqua (**Disponible à partir des versions > 6.0 de l'Agent**) :

5. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans votre [configuration DaemonSet][11] :

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

    Assurez-vous que le socket Docker est monté sur l'Agent Datadog, comme dans [ce manifeste][12].

6. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande `status` de l'Agent][13] et cherchez `aqua` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "aqua" >}}


### Checks de service

**aqua.can_connect** :

Renvoie CRITICAL si l'Agent ne parvient pas à se connecter à Aqua pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

### Événements

Aqua ne comprend aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][15].

[1]: https://www.aquasec.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/fr/getting_started/integrations/
[7]: https://docs.datadoghq.com/fr/agent/faq/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[10]: https://app.datadoghq.com/account/settings#api
[11]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#log-collection
[12]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/#create-manifest
[13]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[14]: https://github.com/DataDog/integrations-extras/blob/master/aqua/metadata.csv
[15]: https://docs.datadoghq.com/fr/help/
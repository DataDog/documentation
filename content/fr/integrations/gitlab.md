---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Gitlab Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - collaboration
  - source control
  - issue tracking
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/gitlab/README.md'
display_name: Gitlab
git_integration_title: gitlab
guid: 1cab328c-5560-4737-ad06-92ebc54af901
integration_id: gitlab
integration_title: Gitlab
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gitlab.
metric_to_check:
  - gitlab.process_max_fds
  - gitlab.ruby.process_start_time_seconds
name: gitlab
public_title: Intégration Datadog/Gitlab
short_description: Surveillez toutes vos métriques Gitlab avec Datadog.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Grâce à cette intégration, vous pouvez :

- Visualiser et surveiller des métriques recueillies via Gitlab par l'intermédiaire de Prometheus

Consultez la [documentation de Gitlab][1] (en anglais) pour en savoir plus sur Gitlab et sur son intégration à Prometheus.

## Configuration

### Installation

Le check Gitlab est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Gitlab.

### Configuration

#### Host

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `gitlab.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] afin de spécifier l'[endpoint][4] de métriques de Gitlab. Consultez le [fichier d'exemple gitlab.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. Sur la page des paramètres Gitlab, assurez-vous que l'option `Enable Prometheus Metrics` est activée. Vous devrez disposer des droits administrateur. Pour en savoir plus sur l'activation de la collecte de métriques, consultez la [documentation de Gitlab][6].

3. Autorisez l'accès aux endpoints de surveillance en mettant à jour `/etc/gitlab/gitlab.rb` pour y ajouter la ligne suivante :

    ```
    gitlab_rails['monitoring_whitelist'] = ['127.0.0.0/8', '192.168.0.1']
    ```
    **Remarque** : enregistrez et redémarrez Gitlab pour voir les modifications.

4. [Redémarrez l'Agent][7].

**Remarque** : les métriques dans [gitlab/metrics.py][8] sont collectées par défaut. L'option de configuration `allowed_metrics` dans `init_config` collecte des métriques antérieures spécifiques. Selon la version et la configuration de votre instance Gitlab, il se peut que certaines métriques ne soient pas collectées. Consultez la [documentation de Gitlab][6] pour en savoir plus sur la collecte de ses métriques.


##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Modifiez ensuite `gitlab.d/conf.yaml` en supprimant la mise en commentaire des lignes `logs` en bas du fichier. Mettez à jour la ligne `path` en indiquant le bon chemin vers vos fichiers de log Gitlab.

   ```yaml
     logs:
       - type: file
         path: /var/log/gitlab/gitlab-rails/production_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/production.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/api_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
   ```

3. [Redémarrez l'Agent][7].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `<NOM_INTÉGRATION>` | `gitlab`                                                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                              |
| `<CONFIG_INSTANCE>`  | `{"gitlab_url":"http://%%host%%/", "prometheus_endpoint":"http://%%host%%:10055/-/metrics"}` |

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][10].

| Paramètre      | Valeur                                       |
| -------------- | ------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "gitlab", "service": "gitlab"}` |

### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `gitlab` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "gitlab" >}}


### Événements

Le check Gitlab n'inclut aucun événement.

### Checks de service

Le check Gitlab inclut des checks de service de santé, de préparation et de vivacité.

`gitlab.prometheus_endpoint_up` : renvoie `CRITICAL` si le check ne peut pas accéder à l'endpoint des métriques Prometheus de l'instance Gitlab.
`gitlab.health` : renvoie `CRITICAL` si le check ne peut pas accéder à l'instance Gitlab.
`gitlab.liveness` : renvoie `CRITICAL` si le check ne peut pas accéder à l'instance Gitlab en raison d'un blocage de Rails Controllers.
`gitlab.readiness` : renvoie `CRITICAL` si l'instance Gitlab est capable d'accepter le trafic via Rails Controllers.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].




## Intégration Gitlab Runner

## Présentation

Grâce à cette intégration, vous pouvez :

- Visualiser et surveiller des métriques collectées via Gitlab Runners par l'intermédiaire de Prometheus
- Confirmer que Gitlab Runner parvient à se connecter à Gitlab

Consultez la [documentation de Gitlab Runner][13] (en anglais) pour en savoir plus sur Gitlab Runner et sur son intégration à Prometheus.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][9] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Gitlab Runner est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Gitlab.

### Configuration

Modifiez le fichier `gitlab_runner.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] afin de spécifier l'endpoint de métriques Prometheus de Runner ainsi que le master Gitlab à utiliser pour le check de service. Consultez le [fichier d'exemple gitlab_runner.d/conf.yaml][14] pour découvrir toutes les options de configuration disponibles.

**Remarque** : l'élément `allowed_metrics` de la section `init_config` vous permet d'indiquer les métriques à extraire.

**Attention** : certaines métriques doivent être transmises en tant que `rate` (p. ex., `ci_runner_errors`).

### Validation

[Lancez la sous-commande `status` de l'Agent][11] et cherchez `gitlab_runner` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "gitlab_runner" >}}


### Événements

Le check Gitlab Runner n'inclut aucun événement.

### Checks de service

Le check Gitlab Runner fournit un check de service visant à s'assurer que Runner peut communiquer avec le master Gitlab, ainsi qu'un autre check de service vérifiant la
disponibilité du endpoint Prometheus local.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].


[1]: https://docs.gitlab.com/ee/administration/monitoring/prometheus
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html#collecting-the-metrics
[5]: https://github.com/DataDog/integrations-core/blob/master/gitlab/datadog_checks/gitlab/data/conf.yaml.example
[6]: https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://github.com/DataDog/integrations-core/blob/master/gitlab/datadog_checks/gitlab/metrics.py
[9]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[10]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://docs.datadoghq.com/fr/help/
[13]: https://docs.gitlab.com/runner/monitoring/README.html
[14]: https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example
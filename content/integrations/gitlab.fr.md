---
categories:
- web
- network
doc_link: https://docs.datadoghq.com/integrations/gitlab/
git_integration_title: gitlab
guid: 1cab328c-5560-4737-ad06-92ebc54af901
has_logo: true
integration_title: Gitlab
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.0
max_agent_version: 6.0.0
min_agent_version: 5.14.0
name: gitlab
public_title: Intégration Datadog-Gitlab
short_description: Tracker toutes vos métriques Gitlab dans Datadog
support: core
supported_os:
- linux
- mac_os
- windows
version: 1.1.0
---



## Aperçu

Une intégration qui permet:

* Visualiser et monitorer les métriques collectées via Gitlab à travers Prometheus

Voir https://docs.gitlab.com/ee/administration/monitoring/prometheus/  pour
plus d'informations sur Gitlab et son intégration avec Prometheus

## Implémentation
### Installation

Le check Gitlab est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent).

### Configuration

Editez le fichier `gitlab.yaml` afin de pointer sur l'endpoint de métriques Prometheus afin d'avoir un check de service. Consultez l'exemple du [canevas  agent_metrics.yaml](https://github.com/DataDog/integrations-core/blob/master/gitlab/conf.yaml.example) pour découvrir toutes les options de configuration disponibles:

Le paramètre `allowed_metrics` de la section` init_config` permet de spécifier les métriques à extraire.

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `gitlab` dans la section Checks:

    Checks
    ======

        gitlab
        -----------
          - instance #0 [OK]
          - Collected 8 metrics, 0 events & 3 service checks

## Compatibilité

Le check Gitlab est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "gitlab" >}}


### Evénements
Le check Gitlab n'inclut aucun événement pour le moment.

### Checks de Service
Le chèque Gitlab comprend une vérification de la disponibilité opérationnelle et de la vivacité.
En outre, il fournit un check de service pour s'assurer que l'endpoint Prometheus local est disponible.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)



## Intégration Gitlab Runner

## Aperçu

Une intégration qui permet:

* Visualiser et monitorer les métriques collectées via Gitlab Runners à travers Prometheus
* Validez que le Gitlab Runner peut se connecter à Gitlab

Voir https://docs.gitlab.com/runner/monitoring/README.html pour
plus d'informations sur Gitlab Runner et son intégration avec Prometheus

## Implémentation
### Installation

Le check Gitlab Runner est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent).

### Configuration

Editez le fichier `gitlab_runner.yaml` afin de pointer sur l'endpoint de métriques Prometheus du Runner et du Gitlab master afin d'avoir un check de service. Consultez l'exemple du [canevas  agent_metrics.yaml](https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/conf.yaml.example) pour découvrir toutes les options de configuration disponibles:

Le paramètre `allowed_metrics` de la section` init_config` permet de spécifier les métriques à extraire.

**Remarks:**

 - Certaines métriques doivent être signalées en tant que `rate` (c'est-à-dire, `ci_runner_errors`)


### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `gitlab_runner` dans la section Checks:

    Checks
    ======

        gitlab_runner
        -----------
          - instance #0 [OK]
          - Collected 10 metrics, 0 events & 2 service checks

## Compatibilité

Le check gitlab_runner est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "gitlab_runner" >}}


### Evénements
Le check Gitlab Runner n'inclut aucun événement pour le moment.

### Checks de Service
Le check de Gitlab Runner fournit actuellement un check de service pour s'assurer que le Runner peut parler au Gitlab master et un autre pour s'assurer que le l'endpoint Prometheus local est disponible.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)


---
app_id: calico
app_uuid: 9e361f97-5332-4c86-8119-e1594b83841e
assets:
  dashboards:
    '[calico] dashboard overview': ./assets/dashboards/calico_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: calico.felix.active.local_endpoints
      metadata_path: metadata.csv
      prefix: calico.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Calico
  monitors:
    '[calico] monitor dataplane failures': ./assets/monitors/dataplane_failures.json
    '[calico] monitor ipsets error': ./assets/monitors/ipset_error.json
    '[calico] monitor iptables restore errors': ./assets/monitors/iptables_restore_errors.json
    '[calico] monitor iptables save errors': ./assets/monitors/iptables_save_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- network
- security
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/calico/README.md
display_on_public_website: true
draft: false
git_integration_title: calico
integration_id: calico
integration_title: calico
integration_version: 1.1.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: calico
public_title: calico
short_description: Calico est une solution de mise en réseau et de sécurité réseau
  pour les conteneurs.
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
  - Category::Metrics
  - Category::Network
  - Category::Security
  - Category::Log Collection
  configuration: README.md#Setup
  description: Calico est une solution de mise en réseau et de sécurité réseau pour
    les conteneurs.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: calico
---



## Présentation

Ce check permet de surveiller [Calico][1] avec l'Agent Datadog.

Le check Calico envoie des métriques relatives au réseau et à la sécurité d'un cluster Kubernetes configuré avec Calico.

## Configuration

### Installation

Le check Calico est inclus avec le package de l'[Agent Datadog][2].

#### Installation avec un Agent basé sur un cluster Kubernetes

Avec des annotations :

1. Configurez Calico sur votre cluster.

2. Activez les métriques Prometheus en suivant les instructions fournies sur la page [Surveiller les métriques des composants Calico][3] (en anglais).
   Une fois ces métriques activées, le service `felix-metrics-svc`, ainsi que le service `prometheus-pod`, devraient s'exécuter dans votre cluster.

3. Pour utiliser Autodiscovery, modifiez `prometheus-pod`. Ajoutez l'extrait de code suivant dans votre fichier de configuration YAML Prometheus :

   ```
   metadata:
     [...]
     annotations:
      ad.datadoghq.com/prometheus-pod.check_names: |
      ["openmetrics"]
      ad.datadoghq.com/prometheus-pod.init_configs: |
      [{}]
      ad.datadoghq.com/prometheus-pod.instances: |
        [
           {
              "prometheus_url": "http://<FELIX-SERVICE-IP>:<FELIX-SERVICE-PORT>/metrics",
              "namespace": "calico",
              "metrics": ["*"]
           }
        ]
     spec:
       [....]
   ```

Pour trouver des valeurs pour `<FELIX-SERVICE-IP>` et `<FELIX-SERVICE-PORT>`, exécutez `kubectl get all -all-namespaces`.

#### Installation avec un Agent basé sur le système d'exploitation

1. Suivez les instructions de la page [Surveiller les métriques des composants Calico][3] (en anglais) jusqu'à ce que le service `felix-metrics-svc` s'exécute à l'aide de la commande `kubectl get all --all-namespaces`.

2. Si vous utilisez minikube, vous devez transmettre le port 9091 à `felix-metrics-svc`.
   Exécutez la commande `kubectl port-forward service/felix-metrics-svc 9091:9091 -n kube-system`.

   Si vous n'utilisez pas minikube, vérifiez que `felix-metrics-svc` possède une adresse IP externe. Si ce n'est pas le cas, utilisez `kubectl edit svc` afin de remplacer son type `ClusterIP` par `LoadBalancer`.


### Configuration

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `calico.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Calico.
   Le seul paramètre requis est l'URL `openmetrics_endpoint`. Consultez le [fichier d'exemple calico.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. Si vous utilisez minikube, utilisez 'http://localhost:9091/metrics' comme URL `openmetrics_endpoint`.
   Si vous n'utilisez pas minikube, utilisez `http://<IP-EXTERNE-FELIX-METRICS-SVC>:<PORT>/metrics` comme URL `openmetrics_endpoint`.

3. [Redémarrez l'Agent][2].

##### Collecte de métriques

1. La configuration par défaut de votre fichier `cassandra.d/conf.yaml` active la collecte de vos [métriques Calico](#metriques). Consultez le [fichier d'exemple calico.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][2].

##### Collecte de logs

Étant donné que la structure Calico est configurée dans un cluster Kubernetes, elle est constituée de déploiements, de pods et de services. L'intégration Kubernetes récupère des logs à partir de conteneurs.

Après avoir configuré l'intégration [Kubernetes][3], les logs Calico s'affichent dans le Log Explorer de Datadog.

La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

[1]: https://github.com/DataDog/integrations-core/blob/master/calico/datadog_checks/calico/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/fr/agent/kubernetes
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                      |
|----------------------|------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `calico`                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                              |
| `<CONFIG_INSTANCE>`  | `{openmetrics_endpoint: <ENDPOINT_OPENMETRICS>}`           |

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                                  |
| -------------- | ------------------------------------------------------ |
| `<CONFIG_LOG>` | `{"source": "calico", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `calico` dans la section Checks.

### Métriques
{{< get-metrics-from-git "calico" >}}


### Événements

L'intégration Calico n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "calico" >}}



## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].


[1]: https://www.tigera.io/project-calico/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.projectcalico.org/maintenance/monitor/monitor-component-metrics
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/help/
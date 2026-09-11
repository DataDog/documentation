---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - orchestration
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/gke/README.md
display_name: "Google\_Kubernetes\_Engine"
draft: false
git_integration_title: gke
guid: ba0ef5a7-4507-4c99-bfa6-ab8cdaed9b91
integration_id: gke
integration_title: "Google\_Kubernetes\_Engine"
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: gke.
metric_to_check: ''
name: gke
public_title: "Google\_Kubernetes\_Engine"
short_description: GKE est une plateforme vous permettant d'exécuter et d'orchestrer des applications conteneurisées.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Google Kubernetes Engine (GKE) est un service Google Cloud Platform (GCP). Il s'agit d'une plateforme hébergée vous permettant d'exécuter et d'orchestrer des applications conteneurisées. Tout comme la solution Elastic Container Service (ECS) d'Amazon, GKE gère des conteneurs Docker déployés sur un cluster de machines. Néanmoins, contrairement à ECS, GKE repose sur Kubernetes.

## Configuration

### Prérequis

1. Vérifiez que vous disposez des autorisations nécessaires pour utiliser GKE avec votre rôle dans le [projet GCP][1].

2. Activez l'[API Google Container Engine][2] pour votre projet.

3. Installez le [SDK Google Cloud][3] et l'outil de ligne de commande `kubectl` sur votre machine locale. Dès lors que vous avez [lié le SDK Cloud à votre compte GCP][4], vous pouvez contrôler vos clusters directement depuis votre machine locale, grâce à `kubectl`.

4. Créez un petit cluster GKE intitulé `doglib` et autorisez-le à accéder au Cloud Datastore à l'aide de la commande suivante :

```
$  gcloud container clusters create doglib --num-nodes 3 --zone "us-central1-b" --scopes "cloud-platform"
```

### Configurer l'intégration GCE

Installez l'intégration [Google Cloud Platform][5].

Une fois l'intégration installée, vous pouvez accéder au [dashboard Google Compute Engine][6] prêt à l'emploi. Ce dernier propose des métriques portant sur le disque, l'E/S, l'utilisation du CPU ou encore le trafic réseau.

### Configurer l'intégration GKE

Choisissez un *mode de fonctionnement*, afin de définir le niveau de flexibilité, de responsabilité et de contrôle dont vous disposez sur votre cluster. GKE propose deux modes de fonctionnement :

- **Standard** : vous gérez l'infrastructure sous-jacente du cluster, ce qui vous fournit une plus grande flexibilité pour la configuration des nœuds.

- **Autopilot** : Google provisionne et gère toute l'infrastructure sous-jacente du cluster, y compris les nœuds et les pools de nœuds. Vous disposez ainsi d'un cluster optimisé pour un fonctionnement autonome.

{{< tabs >}}
{{% tab "Intégration standard" %}}

#### Standard

Déployez une [version conteneurisée de l'Agent Datadog][1] sur votre cluster Kubernetes.

Vous pouvez déployer l'Agent avec un [chart Helm][2] ou directement avec un [DaemonSet][3].


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/?tab=helm
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/?tab=daemonset
{{% /tab %}}
{{% tab "Autopilot" %}}

#### Autopilot

1. Installez Helm.

2. Ajoutez le référentiel Datadog à vos référentiels Helm :

  ```bash
  helm repo add datadog https://helm.datadoghq.com
  helm repo update
  ```

3. Déployez l'Agent Datadog et l'Agent de cluster sur Autopilot avec la commande suivante :

  ```bash
  helm install <RELEASE_NAME> \
      --set datadog.apiKey=<DATADOG_API_KEY> \
      --set datadog.appKey=<DATADOG_APP_KEY> \
      --set clusterAgent.enabled=true \
      --set clusterAgent.metricsProvider.enabled=true \
      --set providers.gke.autopilot=true \
      datadog/datadog
  ```

  **Remarque** : si vous souhaitez également activer les logs ou les traces, ajoutez des lignes à cette commande afin de définir `datadog.logs.enabled` (pour les logs) et `datadog.apm.enabled` (pour les traces) sur `true`. Exemple :

  ```bash
  helm install --name <RELEASE_NAME> \
      --set datadog.apiKey=<DATADOG_API_KEY> \
      --set datadog.appKey=<DATADOG_APP_KEY> \
      --set clusterAgent.enabled=true \
      --set clusterAgent.metricsProvider.enabled=true \
      --set providers.gke.autopilot=true \
      --set datadog.logs.enabled=true \
      --set datadog.apm.enabled=true \
      datadog/datadog
  ```

  Consultez le [référentiel helm-charts Datadog][1] pour obtenir la liste complète des valeurs configurables.


[1]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog#values
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

- [Nouvelle prise en charge du mode Autopilot GKE][7]


[1]: https://cloud.google.com/resource-manager/docs/creating-managing-projects
[2]: https://console.cloud.google.com/apis/api/container.googleapis.com
[3]: https://cloud.google.com/sdk/docs/
[4]: https://cloud.google.com/sdk/docs/initializing
[5]: /fr/integrations/google_cloud_platform/
[6]: https://app.datadoghq.com/screen/integration/gce
[7]: https://www.datadoghq.com/blog/gke-autopilot-monitoring/
---
aliases:
- /fr/agent/kubernetes/daemonset_setup
- /fr/agent/kubernetes/helm
- /fr/agent/kubernetes/installation
further_reading:
- link: /agent/kubernetes/configuration
  tag: Documentation
  text: Configuration avancée de l'Agent Datadog sur Kubernertes
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#all-configuration-options
  tag: Code source
  text: Chart Helm Datadog - Toutes les options de configuration
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading
  tag: Code source
  text: Mise à niveau du chart Helm Datadog
title: Installer l'Agent Datadog sur Kubernetes
---

## Présentation

Cette page fournit des instructions pour installer l’Agent Datadog dans un environnement Kubernetes.

Pour parcourir la documentation dédiée aux principales distributions Kubernetes, y compris AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher et Oracle Container Engine pour Kubernetes (OKE) et découvrir des exemples, référez-vous à la section [Distributions Kubernetes][1].

Pour parcourir la documentation dédiée à la surveillance du plan de contrôle Kubernetes ainsi que des exemples, consultez la section [Surveillance du plan de contrôle Kubernetes][2].

### Versions minimales de Kubernetes et de l'Agent Datadog

Pour utiliser certaines fonctionnalités des versions récentes de Kubernetes, vous devez exécuter des versions minimales de l'Agent Datadog et de l'Agent de cluster.

| Version de Kubernetes | Version de l'Agent | Raison                                |
| ------------------ | ------------- | ------------------------------------- |
| 1.16.0+            | 7.19.0+       | Obsolescence des métriques Kubelet           |
| 1.21.0+            | 7.36.0+       | Obsolescence des ressources Kubernetes       |
| 1.22.0+            | 7.37.0+       | Prise en charge du token de compte de service dynamique |

Voir aussi : [Versions minimales de Kubernetes et de l'Agent de cluster][8].

## Installation

Aidez-vous de la page [Installation sur Kubernetes][16] dans Datadog pour vous guider tout au long du processus d'installation.

1. **Sélectionner la méthode d'installation**

   Choisissez l'une des méthodes d'installation suivantes :

   - [Datadog Operator][9] (recommandé) : un [operator][10] Kubernetes que vous pouvez utiliser pour déployer l'Agent Datadog sur Kubernetes et OpenShift. Il indique l'état du déploiement, la santé et les erreurs dans le statut de sa Custom Resource, et réduit le risque de mauvaise configuration grâce à des options de configuration de plus haut niveau.
   - [Helm][11]
   - Installation manuelle. Consultez la rubrique [Manually install and configure the Datadog Agent with a DaemonSet][12] (en anglais)

{{< tabs >}}
{{% tab "Operator Datadog" %}}
<div class="alert alert-info">Nécessite <a href="https://helm.sh">Helm</a> et le <a href="https://kubernetes.io/docs/tasks/tools/#kubectl">CLI kubectl</a>.</div>

2. **Installer l'Operator Datadog**

   Pour installer l'Operator Datadog dans votre espace de nommage actuel, exécutez :
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install datadog-operator datadog/datadog-operator
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   - Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][1].

3. **Configurer `datadog-agent.yaml`**

   Créez un fichier `datadog-agent.yaml` contenant :
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       clusterName: <CLUSTER_NAME>
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
   ```
   - Remplacez `<CLUSTER_NAME>` par un nom pour votre cluster.
   - Remplacez `<DATADOG_SITE>` par votre [site Datadog][2]. Votre site est {{< region-param key="dd_site" code="true" >}}. (Assurez-vous que le bon site est sélectionné à droite.)

4. **Déployer l'Agent avec le fichier de configuration ci-dessus**

   Exécutez :
   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}
<div class="alert alert-info">Requires <a href="https://helm.sh">Helm</a>.</div>

2. **Add the Datadog Helm repository**

   Run:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```

   - Replace `<DATADOG_API_KEY>` with your [Datadog API key][1].

3. **Configure `datadog-values.yaml`**

   Create a file, `datadog-values.yaml`, that contains:
   ```yaml
   datadog:
    apiKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
   ```

   - Replace `<DATADOG_SITE>` with your [Datadog site][2]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).

4. **Deploy Agent with the above configuration file**

   Run:

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

   <div class="alert alert-info">
   For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
   </div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/getting_started/site

{{% /tab %}}
{{< /tabs >}}

5. **Confirm Agent installation**

   Verify that Agent pods (tagged with `app.kubernetes.io/component:agent`) appear on the [Containers][13] page in Datadog. Agent pods are detected within a few minutes of deployment.

<div class="alert alert-info">

<code>&lt;CLUSTER_NAME&gt;</code> allows you to scope hosts and Cluster Checks. This unique name must be dot-separated tokens and abide by the following restrictions:
<ul>
  <li/>Must only contain lowercase letters, numbers, and hyphens
  <li/>Must start with a letter
  <li/>Must end with a number or a letter
  <li/>Must be less than or equal to 80 characters
</ul>
</div>

### Unprivileged installation

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To run an unprivileged installation, add the following to `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=13-18" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <GROUP_ID>
{{< /highlight >}}

- Replace `<USER_ID>` with the UID to run the Datadog Agent. Datadog recommends [setting this value to 100 since Datadog Agent v7.48+][1].
- Replace `<GROUP_ID>` with the group ID that owns the Docker or containerd socket.

[1]: /fr/data_security/kubernetes/#running-container-as-root-user

Then, deploy the Agent:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
To run an unprivileged installation, add the following to your `datadog-values.yaml` file:

{{< highlight yaml "hl_lines=4-7" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <GROUP_ID>
{{< /highlight >}}

- Replace `<USER_ID>` with the UID to run the Datadog Agent.
- Replace `<GROUP_ID>` with the group ID that owns the Docker or containerd socket.

Then, deploy the Agent:

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### Container registries

Datadog publishes container images to Google Artifact Registry, Amazon ECR, Azure ACR, and Docker Hub:

| Google Artifact Registry | Amazon ECR             | Azure ACR            | Docker Hub        |
| ------------------------ | ---------------------- | -------------------- | ----------------- |
| gcr.io/datadoghq         | public.ecr.aws/datadog | datadoghq.azurecr.io | docker.io/datadog |

By default, the Agent image is pulled from Google Artifact Registry (`gcr.io/datadoghq`). If Artifact Registry is not accessible in your deployment region, use another registry.

If you are deploying the Agent in an AWS environment, Datadog recommend that you use Amazon ECR.

<div class="alert alert-danger">Docker Hub is subject to image pull rate limits. If you are not a Docker Hub customer, Datadog recommends that you update your Datadog Agent and Cluster Agent configuration to pull from Google Artifact Registry or Amazon ECR. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}

To use a different container registry, modify `global.registry` in `datadog-agent.yaml`.

For example, to use Amazon ECR:

{{< highlight yaml "hl_lines=8">}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    registry: public.ecr.aws/datadog
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
{{< /highlight >}}

{{% /tab %}}
{{% tab "Helm" %}}

To use a different container registry, modify `registry` in `datadog-values.yaml`.

For example, to use Amazon ECR:

{{< highlight yaml "hl_lines=1">}}
registry: public.ecr.aws/datadog
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
{{< /highlight >}}

{{% /tab %}}
{{< /tabs >}}

For more information, see [Changing your container registry][17].

### Uninstall

{{< tabs >}}
{{% tab "Operator Datadog" %}}
```shell
kubectl delete datadogagent datadog
helm delete datadog-operator
```

This command deletes all Kubernetes resources created by installing Datadog Operator and deploying the Datadog Agent.
{{% /tab %}}
{{% tab "Helm" %}}
```shell
helm uninstall datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

## Étapes suivantes

### Surveiller votre infrastructure dans Datadog
Utilisez la page [Containers][13] pour avoir de la visibilité sur votre infrastructure de conteneurs, avec des métriques de ressources et une recherche par facettes. Pour en savoir plus sur l’utilisation de cette page, consultez [Containers View][14] (en anglais).

Utilisez la page [Container Images][18] (en anglais) pour obtenir des informations sur chaque image utilisée dans votre environnement. Cette page affiche aussi les vulnérabilités détectées dans vos images de conteneurs par [Cloud Security][19]. Pour en savoir plus, consultez la section [Containers Images View][20] (en anglais).

La section [Kubernetes][21] propose un aperçu de toutes vos ressources Kubernetes. L'[Orchestrator Explorer][22] vous permet de surveiller l'état des pods, des déploiements et d'autres concepts Kubernetes dans un espace de nommage ou une zone de disponibilité donnée, de consulter les spécifications des ressources pour les pods défaillants au sein d'un déploiement, de mettre en corrélation l'activité des nœuds avec les logs associés, et bien plus. La page [Utilisation des ressources][23] fournit des informations sur la manière dont vos workloads Kubernetes consomment les ressources informatiques dans toute votre infrastructure. Pour en savoir plus, consultez les rubriques [Orchestrator Explorer][24] et [Utilisation des ressources Kubernetes][25].

### Activer les fonctionnalités

{{< whatsnext >}}
  {{< nextlink href="/containers/kubernetes/apm" >}}<u>APM pour Kubernetes</u> : Configurez la collecte de traces pour votre application Kubernetes.{{< /nextlink >}} 
  {{< nextlink href="/agent/kubernetes/log" >}}<u>Collecte des logs dans Kubernetes</u> : Configurez la collecte des logs dans un environnement Kubernetes.{{< /nextlink >}} 
  {{< nextlink href="/agent/kubernetes/prometheus" >}}<u>Prometheus & OpenMetrics</u> : Collectez les métriques Prometheus et OpenMetrics exposées par votre application dans Kubernetes.{{< /nextlink >}} 
  {{< nextlink href="/agent/kubernetes/control_plane" >}}<u>Surveillance du plan de contrôle</u> : Surveillez le serveur d'API Kubernetes, le gestionnaire de contrôleur, le planificateur et etcd.{{< /nextlink >}} 
  {{< nextlink href="/agent/kubernetes/configuration" >}}<u>Configuration avancée</u> : Collectez les événements, remplacez les paramètres de proxy, envoyez des métriques personnalisées avec DogStatsD, configurez des listes d'autorisation et de blocage de conteneurs, et consultez la liste complète des variables d'environnement disponibles.{{< /nextlink >}} 
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/distributions
[2]: /fr/agent/kubernetes/control_plane
[3]: /fr/infrastructure/livecontainers/configuration/
[4]: /fr/agent/kubernetes/configuration/
[5]: /fr/agent/kubernetes/integrations/
[6]: /fr/agent/kubernetes/apm/
[7]: /fr/agent/kubernetes/log/
[8]: /fr/containers/cluster_agent/#minimum-agent-and-cluster-agent-versions
[9]: /fr/containers/datadog_operator
[10]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[11]: https://helm.sh
[12]: /fr/containers/guide/kubernetes_daemonset/
[13]: https://app.datadoghq.com/containers
[14]: /fr/infrastructure/containers
[15]: /fr/containers/kubernetes/apm
[16]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[17]: /fr/containers/guide/changing_container_registry/
[18]: https://app.datadoghq.com/containers/images
[19]: /fr/security/cloud_security_management
[20]: /fr/infrastructure/containers/container_images
[21]: https://app.datadoghq.com/kubernetes
[22]: https://app.datadoghq.com/orchestration/overview
[23]: https://app.datadoghq.com/orchestration/resource/pod
[24]: /fr/infrastructure/containers/orchestrator_explorer
[25]: /fr/infrastructure/containers/kubernetes_resource_utilization
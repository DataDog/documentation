---
aliases:
- /fr/agent/kubernetes/daemonset_setup
- /fr/agent/kubernetes/helm
- /fr/agent/kubernetes/installation
description: Installez et configurez l'Agent Datadog sur Kubernetes en utilisant l'Opérateur
  Datadog, Helm ou kubectl
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
## Aperçu {#overview}

Cette page fournit des instructions pour installer l’Agent Datadog dans un environnement Kubernetes.

Pour parcourir la documentation dédiée aux principales distributions Kubernetes, y compris AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher et Oracle Container Engine pour Kubernetes (OKE) et découvrir des exemples, référez-vous à la section [Distributions Kubernetes][1].

Pour parcourir la documentation dédiée à la surveillance du plan de contrôle Kubernetes ainsi que des exemples, consultez la section [Surveillance du plan de contrôle Kubernetes][2].

### Versions minimales de Kubernetes et de l'Agent Datadog {#minimum-kubernetes-and-datadog-agent-versions}

Pour utiliser certaines fonctionnalités des versions récentes de Kubernetes, vous devez exécuter des versions minimales de l'Agent Datadog et de l'Agent de cluster.

| Version de Kubernetes | Version de l'Agent | Version du Cluster Agent | Raison |
| ------------------ | ------------- | --------------------- | ------------------------------------------------------------------------------ |
| 1.16.0+ | 7.19.0+ | 1.9.0+ | Dépréciation des métriques Kubelet |
| 1.21.0+ | 7.36.0+ | 1.20.0+ | Dépréciation des ressources Kubernetes |
| 1.22.0+ | 7.37.0+ | 7.37.0+ | Prend en charge le jeton de compte de service dynamique |
| 1.25.0+ | 7.40.0+ | 7.40.0+ | Prend en charge le groupe d'API `v1` |
| 1.33.0+ | 7.67.0+ | 7.67.0+ | Corrige les incompatibilités avec Kubernetes `AllocatedResources` dans `/pods` la sortie |

Pour une compatibilité optimale, Datadog recommande de maintenir votre Cluster Agent et votre Agent sur des versions identiques.

## Installation {#installation}

Aidez-vous de la page [Installation sur Kubernetes][16] dans Datadog pour vous guider tout au long du processus d'installation.

1. **Sélectionnez la méthode d'installation**

   Choisissez l'une des méthodes d'installation suivantes :

   - [Opérateur Datadog][9] (recommandé) : un [opérateur][10] Kubernetes que vous pouvez utiliser pour déployer l'Agent Datadog sur Kubernetes et OpenShift. Il rapporte l'état de déploiement, la santé et les erreurs dans son statut de Ressource Personnalisée, et il limite le risque de mauvaise configuration grâce à des options de configuration de niveau supérieur.
   - [Helm][11]
   - Installation manuelle. Voir [Installer et configurer manuellement l'Agent Datadog avec un DaemonSet][12]
  
<div class="alert alert-info">Si vous prévoyez de mettre en œuvre l'APM avec <a href="/containers/kubernetes/apm">Instrumentation par Étape Unique (SSI)</a> dans votre environnement Kubernetes, installez l'Agent Datadog dans son propre espace de noms. SSI n'instrumente pas les pods dans le même espace de noms que l'Agent Datadog.</div>

{{< tabs >}}
{{% tab "Operator Datadog" %}}
<div class="alert alert-info">Nécessite <a href="https://helm.sh">Helm</a> et le <a href="https://kubernetes.io/docs/tasks/tools/#kubectl">CLI kubectl</a>.</div>

2. **Installez l'Opérateur Datadog**

   Pour installer l'Operator Datadog dans votre espace de nommage actuel, exécutez :
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install datadog-operator datadog/datadog-operator
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   - Remplacez `<DATADOG_API_KEY>` par votre [clé API Datadog][1].

3. **Configurez `datadog-agent.yaml`**

   Créez un fichier, `datadog-agent.yaml`, qui contient :
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
   - Remplacez `<DATADOG_SITE>` par votre [site Datadog][2]. Votre site est {{< region-param key="dd_site" code="true" >}}. (Assurez-vous que le bon SITE est sélectionné à droite).

4. **Déployez l'Agent avec le fichier de configuration ci-dessus**

   Exécutez :
   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}
<div class="alert alert-info">Nécessite <a href="https://helm.sh">Helm</a>.</div>

2. **Ajoutez le dépôt Helm de Datadog**

   Exécutez :
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```

   - Remplacez `<DATADOG_API_KEY>` par votre [clé API Datadog][1].

3. **Configurez `datadog-values.yaml`**

   Créez un fichier, `datadog-values.yaml`, qui contient:
   ```yaml
   datadog:
    apiKeyExistingSecret: datadog-secret
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
   ```
   
   - Remplacez `<CLUSTER_NAME>` par un nom pour votre cluster.
   - Remplacez `<DATADOG_SITE>` par votre [site Datadog][2]. Votre site est {{< region-param key="dd_site" code="true" >}}. (Assurez-vous que le bon SITE est sélectionné à droite).

4. **Déployez l'Agent avec le fichier de configuration ci-dessus**

   Exécutez :

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

   <div class="alert alert-info">
   Pour Windows, ajoutez <code>--set targetSystem=windows</code> à la <code>helm install</code> commande.
   </div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/getting_started/site

{{% /tab %}}
{{< /tabs >}}

5. **Confirmez l'installation de l'Agent**

   Vérifiez que les pods de l'Agent (étiquetés avec `app.kubernetes.io/component:agent`) apparaissent sur la page [Conteneurs][13] dans Datadog. Les pods de l'Agent sont détectés dans les quelques minutes suivant le déploiement.

<div class="alert alert-info">

<code>&lt;CLUSTER_NAME&gt;</code> permet de définir la portée des hôtes et des Cluster Checks. Ce nom unique doit être composé d'éléments séparés par des points et respecter les restrictions suivantes:
<ul>
  <li/>Ne doit contenir que des lettres minuscules, des chiffres et des tirets.
  <li/>Doit commencer par une lettre
  <li/>Doit se terminer par un chiffre ou une lettre
  <li/>Doit être inférieur ou égal à 80 caractères
</ul>
</div>

### Installation non privilégiée {#unprivileged-installation}

Pour exécuter une installation non privilégiée, ajoutez ce qui suit `securityContext` à votre configuration par rapport à votre `<USER_ID>` et `<GROUP ID>` souhaités:

- Remplacez `<USER_ID>` par l'UID pour exécuter l'Agent Datadog. Datadog recommande de définir cette valeur sur `100` pour l'utilisateur `dd-agent` préexistant [pour l'Agent Datadog v7.48+][26].
- Remplacez `<GROUP_ID>` par l'ID de groupe qui possède le socket Docker ou containerd.

Cela définit le `securityContext` au niveau du pod pour l'Agent.

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Pour exécuter une installation non privilégiée, ajoutez ce qui suit à `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=14-19" >}}
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

  override:
    nodeAgent:
      securityContext:
        runAsUser:  <USER_ID>
        supplementalGroups:
          - <GROUP_ID>
{{< /highlight >}}

Ensuite, déployez l'Agent:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Pour exécuter une installation non privilégiée, ajoutez ce qui suit à votre fichier `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-8" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  clusterName: <CLUSTER_NAME>
  site: <DATADOG_SITE>
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <GROUP_ID>
{{< /highlight >}}

Ensuite, déployez l'Agent:

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### Registres de conteneurs {#container-registries}

Datadog publie des images de conteneurs dans le Registre de Conteneurs Datadog, Google Artifact Registry (GAR), Amazon ECR, Azure ACR et Docker Hub:

{{% container-images-table %}}

Par défaut, le graphique Helm de l'Agent Datadog détermine le registre d'images de l'Agent à partir de votre site Datadog, du type de cluster et de `registryMigrationMode`. En fonction de ces valeurs et des exclusions d'environnement, les images de l'Agent peuvent être tirées du Registre de Conteneurs Datadog (`registry.datadoghq.com`) ou d'un registre spécifique au site. Le graphique Datadog Operator est inclus par défaut comme dépendance du graphique Helm de l'Agent Datadog. Depuis la version 2.19.0 du graphique Datadog Operator, lorsque vous installez l'Operator via cette dépendance, le `registryMigrationMode` du graphique Helm de l'Agent Datadog s'applique aux images de l'Agent gérées par l'Operator. Le chart Helm de l'Operator lui-même ne définit pas `registryMigrationMode` ; l'image du pod de l'Operator est contrôlée séparément par la valeur `image.repository` du chart de l'Operator.

<div class="alert alert-warning">Docker Hub est soumis à des limites de taux de tirage d'images. Si vous n'êtes pas client de Docker Hub, Datadog recommande de mettre à jour votre configuration de Datadog Agent et de Cluster Agent pour tirer d'un autre registre. Pour les instructions, voir <a href="/agent/guide/changing_container_registry">Changer votre registre de conteneurs</a>.</div>

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Depuis la version 2.19.0 du graphique Datadog Operator, lorsque l'Operator est installé via la dépendance du graphique Helm de Datadog Agent, le graphique Helm de Datadog Agent `registryMigrationMode` peut utiliser `registry.datadoghq.com` pour les images d'Agent gérées par l'Operator. Les versions antérieures tiraient les images d'Agent de registres spécifiques au site (`gcr.io/datadoghq`, `eu.gcr.io/datadoghq`, `asia.gcr.io/datadoghq` ou `datadoghq.azurecr.io`). Pour continuer à utiliser les registres spécifiques au site précédents pour les images d'Agent dans ce chemin de déploiement, définissez `registryMigrationMode: ""` dans votre graphique Helm de Datadog Agent `values.yaml`. Ce paramètre n'a aucun effet lorsque vous définissez explicitement un registre, et ce n'est pas un paramètre dans le graphique Helm de l'Operator autonome. Pour utiliser un registre différent pour l'image du pod Operator, définissez `image.repository` dans votre Helm `values.yaml` de l'Operator.

Pour utiliser un registre de conteneurs différent, modifiez `global.registry` dans `datadog-agent.yaml`.

Par exemple, pour utiliser Amazon ECR :

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

Pour utiliser un registre de conteneurs différent, modifiez `registry` dans `datadog-values.yaml`.

Par exemple, pour utiliser Amazon ECR :

{{< highlight yaml "hl_lines=1">}}
registry: public.ecr.aws/datadog
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
{{< /highlight >}}

{{% /tab %}}
{{< /tabs >}}

Pour plus d'informations, voir [Changer votre registre de conteneurs][17].

### Désinstaller {#uninstall}

{{< tabs >}}
{{% tab "Operator Datadog" %}}

```shell
kubectl delete datadogagent datadog
helm delete datadog-operator
```

Cette commande supprime toutes les ressources Kubernetes créées par l'installation de Datadog Operator et le déploiement de Datadog Agent.
{{% /tab %}}
{{% tab "Helm" %}}

```shell
helm uninstall datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

## Étapes suivantes {#next-steps}

### Surveillez votre infrastructure dans Datadog {#monitor-your-infrastructure-in-datadog}
Utilisez la page [Conteneurs][13] pour avoir une visibilité sur votre infrastructure de conteneurs, avec des métriques de ressources et une recherche facettée. Pour des informations sur l'utilisation de la page Conteneurs, voir [Vue des Conteneurs][14].

Utilisez la page [Images de Conteneurs][18] pour obtenir des informations sur chaque image utilisée dans votre environnement. Cette page affiche également les vulnérabilités trouvées dans vos images de conteneurs provenant de [Sécurité Cloud][19]. Pour des informations sur l'utilisation de la page Images de Conteneurs, voir la [Vue des Images de Conteneurs][20].

La section [Kubernetes][21] présente un aperçu de toutes vos ressources Kubernetes. [Orchestrator Explorer][22] vous permet de surveiller l'état des pods, des déploiements et d'autres concepts Kubernetes dans un espace de noms ou une zone de disponibilité spécifique, de consulter les spécifications des ressources pour les pods échoués dans un déploiement, de corréler l'activité des nœuds avec les journaux associés, et plus encore. La page [Resource Utilization][23] fournit des informations sur la manière dont vos charges de travail Kubernetes utilisent vos ressources informatiques à travers votre infrastructure. Pour des informations sur l'utilisation de ces pages, consultez [Orchestrator Explorer][24] et [Kubernetes Resource Utilization][25].

### Activer les fonctionnalités {#enable-features}

{{< whatsnext >}}
  {{< nextlink href="/containers/kubernetes/apm">}}<u>APM pour Kubernetes</u> : Configurez la collecte de traces pour votre application Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Collecte de journaux dans Kubernetes</u> : Configurez la collecte de journaux dans un environnement Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus & OpenMetrics</u> : Collectez vos métriques Prometheus et OpenMetrics exposées depuis votre application s'exécutant à l'intérieur de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Surveillance du plan de contrôle</u> : Surveillez le serveur API Kubernetes, le gestionnaire de contrôleurs, le planificateur et etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Configuration supplémentaire</u> : Collectez des événements, remplacez les paramètres du proxy, envoyez des métriques personnalisées avec DogStatsD, configurez les listes d’autorisation et de blocage des conteneurs, et consultez la liste complète des variables d'environnement disponibles.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/kubernetes/distributions
[2]: /fr/agent/kubernetes/control_plane
[3]: /fr/infrastructure/livecontainers/configuration/
[4]: /fr/agent/kubernetes/configuration/
[5]: /fr/agent/kubernetes/integrations/
[6]: /fr/agent/kubernetes/apm/
[7]: /fr/agent/kubernetes/log/
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
[26]: /fr/data_security/kubernetes/#running-container-as-root-user
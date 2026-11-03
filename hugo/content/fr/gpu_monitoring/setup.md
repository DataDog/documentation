---
further_reading:
- link: /gpu_monitoring/summary
  tag: Documentation
  text: Page de résumé de GPU Monitoring
- link: /gpu_monitoring/explorer
  tag: Documentation
  text: GPU Monitoring Explorer
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimisez et dépannez votre infrastructure IA avec Datadog GPU Monitoring
title: Configurez GPU Monitoring
---
Cette page fournit des instructions pour configurer GPU Monitoring de Datadog sur votre infrastructure. Suivez les instructions de configuration qui correspondent à votre environnement d'exploitation ci-dessous.

### Prérequis {#prerequisites}

Pour commencer à utiliser GPU Monitoring de Datadog, votre environnement doit répondre aux critères suivants :

- Vous exécutez Datadog Agent sur les hosts accélérés par GPU que vous souhaitez surveiller. Si ce n'est pas le cas, consultez les guides suivants :
  - [Installer Datadog Agent sur Kubernetes][1]
  - [Installer Datadog Agent sur Docker][7]
  - [Installer Datadog Agent sur Linux non conteneurisé][8]
- Les pilotes NVIDIA sont installés sur les hosts. Si vous utilisez Kubernetes, le plugin de périphérique NVIDIA pour Kubernetes est installé ([directement][3], ou via [NVIDIA GPU Operator][4])

#### Versions minimales requises {#minimum-version-requirements}

- **Datadog Agent** : v7.80
  - (Version recommandée : la [version la plus récente de l'Agent][2]). Datadog déconseille d'utiliser la version 7.82.0 en raison d'un bug provoquant des paniques inattendues du noyau. 
- **Système d'exploitation** : Linux
- **Noyau Linux** : version 5.8 ou ultérieure
- **Pilote NVIDIA** : version 450.51

Si vous utilisez Kubernetes, les exigences supplémentaires suivantes doivent être remplies :

- [**Datadog Operator**][5] : version 1.18, _ou_ [**Datadog Helm chart**][6] : version 3.137.3
- **Kubernetes** : 1.22 avec l'API PodResources active

Si vous utilisez Google Kubernetes Engine, les nœuds Container-Optimized OS ne sont _pas_ pris en charge en raison de limitations du noyau et du système de permissions.

## Configuration de GPU Monitoring {#setting-up-gpu-monitoring}

La configuration de GPU Monitoring ne nécessite pas DCGM. Vous devez activer explicitement la collecte des métriques de GPU Monitoring au niveau de l'Agent. La configuration dépend de votre environnement : environnement non Kubernetes uniforme, cluster Kubernetes ou cluster mixte.

Une fois que vous avez activé la collecte des métriques de GPU Monitoring, vous pouvez activer plusieurs intégrations pour obtenir des informations plus avancées :
- Pour les coûts cloud et les informations sur les types d'instances cloud : activez les intégrations cloud [AWS][9], [Google Cloud][10], [Azure][11] ou [Oracle][12] dans votre interface utilisateur Datadog.
- Pour des informations au niveau des processus, configurez les [Live Processes][13] de Datadog.

### Configurer GPU Monitoring dans un environnement non Kubernetes ou un cluster Kubernetes uniforme {#set-up-gpu-monitoring-on-a-non-kubernetes-environment-or-uniform-kubernetes-cluster}

Les instructions suivantes décrivent les étapes de base pour configurer GPU Monitoring dans les environnements suivants :
- Dans un cluster Kubernetes où **tous** les nœuds possèdent des périphériques GPU
- Dans un environnement non-Kubernetes, tel que Docker ou Linux non conteneurisé.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
1. Assurez-vous que la [dernière version de Datadog Agent][2] est [installée et déployée][1] sur chaque host GPU que vous souhaitez surveiller.
2. Modifiez votre ressource `DatadogAgent` avec les paramètres suivants :

   `gpu.enabled: true`
   : Active GPU Monitoring.

   `gpu.patchCgroupPermissions: true`
   : _Uniquement pour GKE_. Active un chemin de code dans `system-probe` qui aide l'Agent à accéder aux périphériques GPU.

   `gpu.requiredRuntimeClassName:<runtime-name>`
   : _Optionnel_. Spécifie le runtime de conteneur pour les pods qui ont besoin d'accéder aux périphériques GPU, par exemple : `nvidia`, `nvidia-cdi`, `nvidia-legacy`. La valeur par défaut est `nvidia`, car il s'agit du runtime par défaut défini par NVIDIA GPU Operator. Dans EKS et Oracle Cloud, cette valeur doit être définie sur une chaîne vide, car la classe de runtime par défaut autorise déjà l'accès aux périphériques GPU.

   Exemple de `datadog-agent.yaml` exécuté sur GKE :

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     features:
       gpu:
         enabled: true
         patchCgroupPermissions: true # Only for GKE
         requiredRuntimeClassName: "" # Only for AWS EKS or Oracle Cloud
   ```

3. Appliquez vos modifications et redémarrez Datadog Agent.

[1]: /fr/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Helm" %}}
1. Assurez-vous que la [dernière version de Datadog Agent][2] est [installée et déployée][1] sur chaque host GPU que vous souhaitez surveiller.

2. Modifiez votre fichier de configuration `datadog-values.yaml` avec les paramètres suivants :

   `gpuMonitoring.enabled: true`
   : Active GPU Monitoring.

   `gpuMonitoring.configureCgroupPerms: true`
   : _Uniquement pour GKE_. Active un chemin de code dans `system-probe` qui aide l'Agent à accéder aux périphériques GPU.

   `gpuMonitoring.runtimeClassName:<runtime-name>`
   : _Optionnel_. Spécifie le runtime de conteneur pour les pods qui ont besoin d'accéder aux périphériques GPU, par exemple : `nvidia`, `nvidia-cdi`, `nvidia-legacy`. La valeur par défaut est `nvidia`, car il s'agit du runtime par défaut défini par NVIDIA GPU Operator. Dans EKS et Oracle Cloud, cette valeur doit être définie sur une chaîne vide, car la classe de runtime par défaut autorise déjà l'accès aux périphériques GPU.

   Exemple de `datadog-values.yaml` exécuté sur GKE :

   ```yaml
   datadog:
     gpuMonitoring:
       enabled: true
       configureCgroupPerms: true  # Only for GKE
       runtimeClassName: ""        # Only for Oracle Cloud and AWS EKS
   ```

3. Mettez à jour votre chart Helm et redémarrez Datadog Agent.

[1]: /fr/containers/kubernetes/installation/?tab=helm
[2]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Docker" %}}

Pour activer GPU Monitoring dans Docker, utilisez la configuration suivante lors du démarrage du conteneur Agent :

```shell
docker run \
--pid host \
--gpus all \
-e DD_API_KEY="<DATADOG_API_KEY>" \
-e DD_GPU_ENABLED=true \
-v /var/run/docker.sock:/var/run/docker.sock:ro \
-v /proc/:/host/proc/:ro \
-v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
registry.datadoghq.com/agent:latest
```

Remplacez `<DATADOG_API_KEY>` par votre [clé d'API Datadog][1].

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Docker Compose" %}}

Si vous utilisez `docker-compose`, effectuez les ajouts suivants au service Datadog Agent.

```yaml
version: '3'
services:
  datadog:
    image: "registry.datadoghq.com/agent:latest"
    environment:
      - DD_GPU_ENABLED=true
      - DD_API_KEY=<DATADOG_API_KEY>
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
    deploy:
      resources:
        reservations:
          devices:
          - driver: nvidia
            count: all
            capabilities: [gpu]
```

{{% /tab %}}
{{% tab "Linux (non conteneurisé)" %}}

GPU Monitoring nécessite de configurer **à la fois** `datadog.yaml` et `system-probe.yaml`. La configuration de `datadog.yaml` uniquement ne charge pas le module eBPF et n'entraîne aucune collecte de métriques.

1. Ajoutez ce qui suit à `/etc/datadog-agent/datadog.yaml` :

    ```yaml
    gpu:
      enabled: true
    collect_gpu_tags: true
    enable_nvml_detection: true
    ```

2. Si `/etc/datadog-agent/system-probe.yaml` n'existe pas, créez-le à partir de l'exemple :

    ```shell
    sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
    ```

3. Ajoutez ce qui suit à `/etc/datadog-agent/system-probe.yaml` :

    ```yaml
    gpu_monitoring:
      enabled: true
    ```

4. Redémarrez l'Agent et system-probe :

    ```shell
    sudo systemctl restart datadog-agent
    sudo systemctl restart datadog-agent-sysprobe
    ```

{{% /tab %}}

{{< /tabs >}}

## Configurez GPU Monitoring sur un cluster Kubernetes mixte {#set-up-gpu-monitoring-on-a-mixed-kubernetes-cluster}

Dans un cluster Kubernetes mixte, certains nœuds possèdent des périphériques GPU tandis que d'autres n'en ont pas. Deux DaemonSets distincts sont nécessaires : un pour la classe de runtime sur les nœuds dotés de GPU et un autre pour les nœuds sans GPU. Cette séparation est due aux exigences de classe de runtime du plugin de périphérique NVIDIA pour Kubernetes.

La méthode recommandée consiste à utiliser Datadog Operator, version 1.20 ou ultérieure. Cette version fournit des fonctionnalités qui facilitent la configuration. Pour des raisons de compatibilité, des instructions sont également fournies pour les installations Helm et les anciennes versions de Datadog Operator.

{{< tabs >}}
{{% tab "Datadog Operator (1.20 ou version ultérieure)" %}}

Pour configurer GPU Monitoring sur un cluster mixte, utilisez la fonctionnalité [Agent Profiles][2] de l'Operator. Cela active GPU Monitoring uniquement sur les nœuds dotés de GPU.

1. Configurez Datadog Operator pour activer la fonctionnalité Datadog Agent Profile en mode DatadogAgentInternal.

   Si Datadog Operator a été déployé directement avec Helm sans fichier de valeurs, la fonctionnalité peut être activée depuis la ligne de commande :

   ```shell
   helm upgrade --set datadogAgentProfile.enabled=true --set datadogAgentInternal.enabled=true --set datadogCRDs.crds.datadogAgentProfiles=true --set datadogCRDs.crds.datadogAgentInternal=true <release-name> datadog/datadog-operator
   ```

   Si Datadog Operator a été déployé avec un fichier de valeurs, la fonctionnalité peut être activée en ajoutant les paramètres suivants à ce fichier :

   ```yaml
   datadogAgentProfile:
     enabled: true

   datadogAgentInternal:
     enabled: true

    datadogCRDs:
      crds:
        datadogAgentProfiles: true
        datadogAgentInternal: true
   ```

   Redéployez ensuite Datadog Operator avec : `helm upgrade --install <release-name> datadog/datadog-operator -f datadog-operator.yaml`.

2. Modifiez votre ressource `DatadogAgent` en ajoutant l'annotation `agent.datadoghq.com/update-metadata` à la ressource `DatadogAgent`.

   Les ajouts au fichier `datadog-agent.yaml` devraient ressembler à ceci :

   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
     annotations:
       agent.datadoghq.com/update-metadata: "true"  # Required for the Datadog Agent Internal mode to work.
   ```

3. Appliquez vos modifications à la ressource `DatadogAgent`. Ces modifications peuvent être appliquées en toute sécurité à tous les Datadog Agents, qu'ils s'exécutent ou non sur des nœuds GPU.

4. Créez un [Datadog Agent Profile][2] qui cible les nœuds GPU et active GPU Monitoring sur ces nœuds.

   Dans l'exemple suivant, le sélecteur `profileNodeAffinity` cible les nœuds avec le label [`nvidia.com/gpu.present=true`][3], car ce label est couramment présent sur les nœuds sur lesquels NVIDIA GPU Operator est installé. Vous pouvez utiliser un autre label si vous le souhaitez.

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogAgentProfile
   metadata:
     name: gpu-nodes
   spec:
     profileAffinity:
       profileNodeAffinity:
         - key: nvidia.com/gpu.present
           operator: In
           values:
             - "true"
     config:
       features:
         gpu:
           enabled: true
           patchCgroupPermissions: true # Only for GKE
   ```

5. Après avoir appliqué ce nouveau [Datadog Agent Profile][2], le Datadog Operator crée un nouveau DaemonSet, `gpu-nodes-agent`.

[1]: /fr/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/datadog_agent_profiles.md
[3]: http://nvidia.com/gpu.present
[4]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{% tab "Datadog Operator (1.18 ou 1.19)" %}}
Pour configurer GPU Monitoring sur un cluster mixte, utilisez la fonctionnalité [Agent Profiles][2] de l'Operator. Cela active GPU Monitoring uniquement sur les nœuds dotés de GPU.

1. Assurez-vous que la [dernière version du Datadog Agent][4] est [installée et déployée][1] sur chaque host GPU que vous souhaitez surveiller.

2. Modifiez votre ressource `DatadogAgent` avec les modifications suivantes :

   ```yaml
   spec:
     features:
       oomKill:
         # Only enable this feature if there is nothing else that requires the system-probe container in all Agent pods
         # Examples of system-probe features are npm, cws, usm
         enabled: true

   override:
     nodeAgent:
       volumes:
         - name: nvidia-devices
           hostPath:
             path: /dev/null
         - name: pod-resources
           hostPath:
             path: /var/lib/kubelet/pod-resources
       containers:
         agent:
           env:
             - name: NVIDIA_VISIBLE_DEVICES
               value: "all"
           volumeMounts:
             - name: nvidia-devices
               mountPath: /dev/nvidia-visible-devices
             - name: pod-resources
               mountPath: /var/lib/kubelet/pod-resources
         system-probe:
           env:
             - name: NVIDIA_VISIBLE_DEVICES
               value: "all"
           volumeMounts:
             - name: nvidia-devices
               mountPath: /dev/nvidia-visible-devices
             - name: pod-resources
               mountPath: /var/lib/kubelet/pod-resources
   ```

2. Appliquez vos modifications à la ressource `DatadogAgent`. Ces modifications peuvent être appliquées en toute sécurité à tous les Datadog Agents, qu'ils s'exécutent ou non sur des nœuds GPU.

3. Créez un [Datadog Agent Profile][2] qui cible les nœuds GPU et active GPU Monitoring sur ces nœuds.

   Dans l'exemple suivant, le sélecteur `profileNodeAffinity` cible les nœuds avec le label [`nvidia.com/gpu.present=true`][3], car ce label est couramment présent sur les nœuds sur lesquels NVIDIA GPU Operator est installé. Vous pouvez utiliser un autre label si vous le souhaitez.

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogAgentProfile
   metadata:
     name: gpu-nodes
   spec:
     profileAffinity:
       profileNodeAffinity:
         - key: nvidia.com/gpu.present
           operator: In
           values:
             - "true"
     config:
       override:
         nodeAgent:
           runtimeClassName: nvidia  # Only if not in AWS EKS or Oracle Cloud
           containers:
             # Change system-probe environment variables only for advanced
             # eBPF metrics, or if running in GKE
             system-probe:
               env:
                 - name: DD_GPU_MONITORING_ENABLED
                   value: "true"
                 # cgroup permission patching only for GKE
                 - name: DD_GPU_MONITORING_CONFIGURE_CGROUP_PERMS
                   value: "true"
             agent:
               env:
                 - name: DD_GPU_ENABLED
                   value: "true"
                 # Only for advanced eBPF metrics
                 - name: DD_GPU_MONITORING_ENABLED
                   value: "true"
   ```

4. Après avoir appliqué ce nouveau Datadog Agent Profile, le Datadog Operator crée un nouveau DaemonSet, `datadog-agent-with-profile-<namespace>-gpu-nodes`.

[1]: /fr/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/datadog_agent_profiles.md
[3]: http://nvidia.com/gpu.present
[4]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}

{{% tab "Helm" %}}

Pour configurer GPU Monitoring sur un cluster mixte avec Helm, créez deux déploiements Helm. Un déploiement cible les nœuds GPU et l'autre cible les nœuds sans GPU.

1. Assurez-vous que la [dernière version du Datadog Agent][3] est [installée et déployée][1] sur chaque host GPU que vous souhaitez surveiller.

2. Modifiez votre fichier de configuration `datadog-values.yaml` pour cibler les nœuds sans GPU.

   L'exemple suivant cible les nœuds qui **n'ont pas** le label `nvidia.com/gpu.present=true`, car ce label est couramment présent sur les nœuds sur lesquels NVIDIA GPU Operator est installé. Si vous le souhaitez, vous pouvez utiliser un autre label pour exclure les nœuds GPU.

   ```yaml
   agents:
     affinity:
       nodeAffinity:
         requiredDuringSchedulingIgnoredDuringExecution:
           nodeSelectorTerms:
           - matchExpressions:
             - key: nvidia.com/gpu.present
               operator: NotIn
               values:
                 - "true"
   ```

3. Créez un fichier de valeurs, `datadog-gpu-values.yaml`. Configurez ce fichier pour :
   - Cibler uniquement les nœuds GPU
   - [Rejoindre les Datadog Cluster Agents existants][2]
   - Activer GPU Monitoring avec les paramètres suivants :

   `gpuMonitoring.enabled: true`
   : Active GPU Monitoring.

   `gpuMonitoring.configureCgroupPerms: true`
   : _Uniquement pour GKE_. Active un chemin de code dans `system-probe` qui aide l'Agent à accéder aux périphériques GPU.

   `gpuMonitoring.runtimeClassName:<runtime-name>`
   : _Optionnel_. Spécifie le runtime de conteneur pour les pods qui ont besoin d'accéder aux périphériques GPU, par exemple : `nvidia`, `nvidia-cdi`, `nvidia-legacy`. La valeur par défaut est `nvidia`, car il s'agit du runtime par défaut défini par NVIDIA GPU Operator. Dans EKS et Oracle Cloud, cette valeur doit être définie sur une chaîne vide, car la classe de runtime par défaut autorise déjà l'accès aux périphériques GPU.

   Exemple `datadog-gpu-values.yaml` :

   ```
   # GPU-specific datadog-gpu-values.yaml (for GPU nodes)
   datadog:
     kubeStateMetricsEnabled: false # Disabled, as you're joining an existing Cluster Agent
     gpuMonitoring:
       enabled: true
       configureCgroupPerms: true  # Only for GKE
       runtimeClassName: ""        # Only for Oracle Cloud and AWS EKS

   agents:
     affinity:
       nodeAffinity:
         requiredDuringSchedulingIgnoredDuringExecution:
           nodeSelectorTerms:
           - matchExpressions:
             - key: nvidia.com/gpu.present
               operator: In
               values:
                 - "true"

   # Join with existing Cluster Agent
   existingClusterAgent:
     join: true

   # Disabled datadogMetrics deployment, since it should have been already deployed with the other chart release.
   datadog-crds:
     crds:
       datadogMetrics: false
   ```

4. Déployez le chart Helm avec votre `datadog-values.yaml` modifié.

   ```shell
   helm install -f datadog-values.yaml datadog datadog
   ```

5. Déployez à nouveau le chart Helm avec des valeurs de surcharge spécifiques aux GPU.

   ```shell
   helm install -f datadog-values.yaml -f datadog-gpu-values.yaml datadog-gpu datadog
   ```
[1]: /fr/containers/kubernetes/installation/?tab=helm
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#how-to-join-a-cluster-agent-from-another-helm-chart-deployment-linux
[3]: https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/kubernetes/installation/?tab=datadogoperator
[2]: https://github.com/DataDog/datadog-agent/releases
[3]: https://github.com/NVIDIA/k8s-device-plugin
[4]: https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html
[5]: https://github.com/DataDog/datadog-operator
[6]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[7]: /fr/containers/docker/
[8]: /fr/agent/supported_platforms/linux/
[9]: /fr/getting_started/integrations/aws/
[10]: /fr/getting_started/integrations/google_cloud/?tab=orglevel
[11]: /fr/getting_started/integrations/azure/?tab=createanappregistration
[12]: /fr/getting_started/integrations/oci/
[13]: /fr/infrastructure/process?tab=linuxwindows#installation
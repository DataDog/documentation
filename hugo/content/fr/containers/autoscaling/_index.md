---
aliases:
- /fr/containers/monitoring/autoscaling
cascade:
  site_support_id: containers_autoscaling
description: Mise à l'échelle automatique des charges de travail Kubernetes à l'aide
  des métriques Datadog et de recommandations de mise à l'échelle intelligentes
further_reading:
- link: /infrastructure/containers/kubernetes_resource_utilization
  tag: Documentation
  text: Utilisation des ressources Kubernetes
- link: /account_management/rbac/permissions
  tag: Documentation
  text: Autorisations des rôles Datadog
- link: /agent/remote_config/
  tag: Documentation
  text: Remote Configuration
- link: https://www.datadoghq.com/blog/autoscaling-custom-metrics
  tag: Blog
  text: Mise à l'échelle des charges de travail Kubernetes sur des métriques personnalisées
- link: https://www.datadoghq.com/blog/kubernetes-custom-query-autoscaling
  tag: Blog
  text: Optimisez les charges de travail Kubernetes avec Custom Query Scaling.
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralisez et gérez votre pipeline OpenTelemetry avec la passerelle DDOT
- link: https://www.datadoghq.com/blog/datadog-kubernetes-autoscaling/
  tag: Blog
  text: Dimensionnez correctement vos charges de travail et réduisez vos coûts avec
    Datadog Kubernetes Autoscaling.
- link: https://www.datadoghq.com/architecture/kubernetes-workload-autoscaling-with-datadog/
  tag: Centre d'architecture
  text: Mise à l'échelle automatique des charges de travail Kubernetes avec Datadog
title: Kubernetes Autoscaling
---
Datadog Kubernetes Autoscaling surveille en continu vos ressources Kubernetes pour fournir des recommandations de mise à l'échelle immédiates et une mise à l'échelle automatique multidimensionnelle de vos charges de travail Kubernetes. Vous pouvez déployer la mise à l'échelle automatique via l'interface Web Datadog ou avec une `DatadogPodAutoscaler` ressource personnalisée.

## Fonctionnement {#how-it-works}
Datadog utilise des métriques d'utilisation en temps réel et historiques ainsi que des signaux d'événements provenant de vos agents Datadog existants pour formuler des recommandations. Vous pouvez ensuite examiner ces recommandations et choisir de les déployer.

Par défaut, Datadog Kubernetes Autoscaling utilise des valeurs de coût estimées pour le CPU et la mémoire afin d'afficher les opportunités d'économies et les estimations d'impact. Vous pouvez également utiliser Kubernetes Autoscaling avec [Cloud Cost Management](#idle-cost-and-savings-estimates) pour obtenir des rapports basés sur les coûts exacts de vos types d'instances.

La mise à l'échelle automatisée des charges de travail est alimentée par une `DatadogPodAutoscaler` ressource personnalisée qui définit le comportement de mise à l'échelle au niveau de chaque charge de travail. Datadog Cluster Agent agit en tant que contrôleur pour cette ressource personnalisée.

**Remarque :** Chaque cluster peut avoir un maximum de 1000 charges de travail optimisées avec Datadog Kubernetes Autoscaling.

### Compatibilité {#compatibility}

- **Distributions** : cette fonctionnalité est compatible avec l'ensemble des [distributions Kubernetes prises en charge][5] par Datadog.
- **Mise à l'échelle automatique de la charge de travail** : cette fonctionnalité constitue une alternative à l'Horizontal Pod Autoscaler (HPA) et au Vertical Pod Autoscaler (VPA). Datadog recommande de supprimer tout HPA ou VPA d'une charge de travail lors de l'activation de Datadog Kubernetes Autoscaling afin de l'optimiser. Ces charges de travail sont identifiées dans l'application pour votre compte.
**Remarque :** Vous pouvez tester Datadog Kubernetes Autoscaling tout en conservant votre HPA et/ou VPA en créant un `DatadogPodAutoscaler` avec `mode: Preview` dans la section `applyPolicy`.

### Prérequis {#requirements}

- [Remote Configuration][1] doit être activé à la fois au niveau de l'organisation et sur les Agents de votre cluster cible. Consultez [Activation de Remote Configuration][2] pour obtenir des instructions de configuration.
- [Helm][3], pour la mise à jour de votre Datadog Agent.
- (Pour les utilisateurs de Datadog Operator) [`kubectl` CLI][4], pour la mise à jour du Datadog Agent.
- Lorsque vous utilisez la mise à l'échelle automatique en temps réel, Datadog recommande d'utiliser la dernière version du Datadog Agent. Cela permet de garantir l'accès aux dernières améliorations et optimisations. Les recommandations de mise à l'échelle nécessitent que l'intégration [Kubernetes State Core][9] soit activée. <br/><br/>

   | Fonctionnalité | Version minimale de l'Agent |
   |---------|----------------------|
   | Recommandations de mise à l'échelle de la charge de travail dans l'application | 7.50+ |
   | Mise à l'échelle de la charge de travail en temps réel | 7.66.1+ |
   | Recommandations et mise à l'échelle automatique pour Argo Rollout | 7.71+ |
   | Mise à l'échelle automatique du cluster (inscription à la [version préliminaire][10]) | 7.72+ |
   | Redimensionnement vertical de pod sur place (opt-in) | 7.78+ |
   | Activation du profil de cluster, étiquette de charge de travail | 7.78+ |
   | Activation du profil de cluster, étiquette de namespace | 7.79+ |

- Les autorisations utilisateur suivantes :
   - Gestion de l'organisation (requise pour Remote Configuration)
   - API Keys Write (requise pour Remote Configuration)
   - Workload Scaling Write
   - Autoscaling Manage
- (Recommandé) Noyau Linux v5.19+ et cgroup v2

## Configuration {#setup}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Assurez-vous d'utiliser Datadog Operator v1.16.0+. Pour mettre à niveau votre Datadog Operator :

```shell
helm upgrade datadog-operator datadog/datadog-operator
```

2. Ajoutez ce qui suit à votre fichier de configuration `datadog-agent.yaml` :

```yaml
spec:
  features:
    autoscaling:
      workload:
        enabled: true
    eventCollection:
      unbundleEvents: true
  override:
    clusterAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
    nodeAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
```

3. [Admission Controller][1] est activé par défaut avec Datadog Operator. Si vous l'avez désactivé, réactivez-le en ajoutant les lignes surlignées suivantes à `datadog-agent.yaml` :

{{< highlight yaml "hl_lines=4-5" >}}
...
spec:
  features:
    admissionController:
      enabled: true
...
{{< /highlight >}}

4. Appliquez la configuration `datadog-agent.yaml` mise à jour :

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

[1]: /fr/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{% tab "Helm" %}}

1. Assurez-vous d'utiliser le Datadog Agent et le Datadog Cluster Agent v7.66.1+. Ajoutez ce qui suit à votre fichier de configuration `datadog-values.yaml` :

```yaml
datadog:
  autoscaling:
    workload:
      enabled: true
  kubernetesEvents:
    unbundleEvents: true
```

2. [Admission Controller][1] est activé par défaut dans le chart Helm Datadog. Si vous l'avez désactivé, réactivez-le en ajoutant les lignes surlignées suivantes à `datadog-values.yaml` :
{{< highlight yaml "hl_lines=5-6" >}}
...
clusterAgent:
  admissionController:
    enabled: true
...
{{< /highlight >}}

3. Mettez à jour votre version de Helm :

```shell
helm repo update
```

4. Redéployez le Datadog Agent avec votre `datadog-values.yaml` mis à jour :

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

[1]: /fr/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{< /tabs >}}

### Estimations des coûts et économies liés à l'inactivité {#idle-cost-and-savings-estimates}

{{< tabs >}}
{{% tab "Avec Cloud Cost Management" %}}
Si [Cloud Cost Management][1] est activé au sein d'une organisation, Datadog Kubernetes Autoscaling affiche les estimations des coûts inutilisés et des économies basées sur le coût réel de votre facture pour les instances surveillées sous-jacentes.

Consultez les instructions de configuration de Cloud Cost pour [AWS][2], [Azure][3] ou [Google Cloud][4].

Les données de Cloud Cost Management améliorent Kubernetes Autoscaling, mais elles ne sont pas requises. Toutes les recommandations de charge de travail et les décisions d'autoscaling de Datadog sont valides et fonctionnelles sans Cloud Cost Management.

[1]: /fr/cloud_cost_management
[2]: /fr/cloud_cost_management/aws
[3]: /fr/cloud_cost_management/azure
[4]: /fr/cloud_cost_management/google_cloud
{{% /tab %}}

{{% tab "Par défaut" %}}
Si Cloud Cost Management n'est **pas** activé, Datadog Kubernetes Autoscaling affiche les estimations des coûts inutilisés et des économies en utilisant les formules et les valeurs fixes suivantes :

**Inactivité du cluster** :

```
  (cpu_capacity - max(cpu_usage, cpu_requests)) * core_rate_per_hour
+ (mem_capacity - max(mem_usage, mem_requests)) * memory_rate_per_hour
```

**Inactivité de la charge de travail** :

```
  (max(cpu_usage, cpu_requests) - cpu_usage) * core_rate_per_hour
+ (max(mem_usage, mem_requests) - mem_usage) * memory_rate_per_hour
```

**Valeurs fixes** :
- taux_cœur_par_heure = 0,0295 $ par heure de cœur CPU
- taux_mémoire_par_heure = 0,0053 $ par Go de mémoire par heure


_Les valeurs de coût fixes sont susceptibles d'être affinées au fil du temps._
{{% /tab %}}
{{< /tabs >}}

## Utilisation {#usage}

### Identifier les ressources à redimensionner {#identify-resources-to-rightsize}

La [page de résumé de l'autoscaling][6] constitue un point de départ pour les équipes de plateforme afin de comprendre les opportunités totales d'économies de ressources Kubernetes à l'échelle d'une organisation, et de filtrer par clusters et namespaces clés.

La [page de configuration][11] offre la possibilité de sélectionner plusieurs charges de travail à mettre à l'échelle et de gérer votre optimisation par lots.

La [vue de mise à l'échelle du cluster][7] fournit des informations par cluster sur le total de CPU inutilisé, le total de mémoire inutilisée et les coûts.

Cliquez sur un cluster pour obtenir des informations détaillées et un tableau des charges de travail du cluster triées par économies estimées. Si vous êtes propriétaire d'une application ou d'un service individuel, vous pouvez également filtrer par nom d'équipe ou de service directement depuis la [vue de liste Workload Scaling][8].

Depuis l'une de ces vues, cliquez sur {{< ui >}}Optimize{{< /ui >}} sur une charge de travail pour voir sa recommandation de mise à l'échelle, puis passez à [Enable Autoscaling for a workload](#enable-autoscaling-for-a-workload).

### Enable Autoscaling for a workload {#enable-autoscaling-for-a-workload}

Une fois que vous avez identifié une charge de travail à optimiser, inspectez son {{< ui >}}Scaling Recommendation{{< /ui >}}. Cliquez sur {{< ui >}}Configure Recommendation{{< /ui >}} pour ajouter des contraintes ou ajuster les niveaux d'utilisation cibles avant l'activation.

Il existe trois façons d'activer la mise à l'échelle automatique pour une charge de travail. Choisissez le chemin qui correspond à la manière dont vous déployez vos charges de travail aujourd'hui.

| Chemin | Idéal pour | Par où commencer | Gestion continue |
|------|----------|-----------------|--------------------|
| **A. Datadog UI setup wizard** | Démarrez rapidement et itérez sur les paramètres avec un retour visuel immédiat, ou donnez à vos équipes d'application les moyens de prendre de meilleures décisions de configuration de mise à l'échelle | [Setup page][11] in the Datadog UI | Modifiez le `DatadogPodAutoscaler` de la charge de travail depuis l'interface utilisateur ou votre cluster |
| **B. Author a `DatadogPodAutoscaler` manifest** | Existing workflows for shipping Kubernetes manifests (`kubectl`, Helm, ArgoCD, Terraform, or other GitOps tools) | Hand-written or templated YAML applied through your existing tooling | Edit the manifest and reapply through the same tooling |
| **C. Apply a [cluster profile](#cluster-profiles) label** | Activating autoscaling across many workloads or namespaces with a single shared policy | Label the workload or namespace with `autoscaling.datadoghq.com/profile` | Edit the profile to update every workload it manages, or move workloads between profiles by changing the label |

#### Chemin A : Datadog UI {#path-a-datadog-ui}

Le moyen le plus rapide de commencer est la [Setup page][11] dans le Datadog UI. L'assistant vous guide à travers cinq étapes : sélectionner un cluster, vérifier les exigences de l'Agent et des autorisations, choisir une méthode d'installation, sélectionner un modèle de mise à l'échelle et déployer. Modèles disponibles dans l'assistant :

- **Optimiser les coûts** : cible d'utilisation CPU élevée, réduction agressive, seuil de réplicas le plus bas. Idéal pour les charges de travail sans état et sensibles aux coûts.
- **Optimiser l'équilibre** : cible d'utilisation modérée, augmentation rapide, réduction équilibrée. Idéal pour la plupart des charges de travail sans état.
- **Optimiser les performances** : cible d'utilisation prudente, augmentation rapide, réduction lente, seuil de réplicas plus élevé. Idéal pour les services avec état ou critiques.
- **Personnaliser** : commencez à partir de l'un des modèles ci-dessus et ajustez vous-même la cible CPU, les réplicas et les fenêtres de stabilisation.

L'assistant de configuration est idéal pour essayer la mise à l'échelle automatique sur une seule charge de travail, se familiariser avec une recommandation ou intégrer un petit ensemble de charges de travail. (Nécessite les autorisations `Workload Scaling Write` et `Autoscaling Manage`.)

#### Chemin B : GitOps {#path-b-gitops}

Définissez une ressource personnalisée `DatadogPodAutoscaler` qui cible votre charge de travail et appliquez-la via les outils que vous utilisez déjà pour déployer des manifestes Kubernetes, qu'il s'agisse de `kubectl apply`, Helm, ArgoCD, Terraform ou d'un autre outil GitOps. La création du manifeste est la même quel que soit le mécanisme de livraison. Consultez les [exemples de configurations](#example-datadogpodautoscaler-configurations) ci-dessous pour obtenir des points de départ prêts à être modifiés, couvrant l'optimisation des coûts, la mise à l'échelle équilibrée, le redimensionnement vertical uniquement et la mise à l'échelle horizontale par requête personnalisée.

Pour des guides spécifiques aux outils, consultez :

- [Gérer DatadogPodAutoscaler avec ArgoCD][12]
- [Gérer DatadogPodAutoscaler avec Terraform][13]

### Exemples de configurations DatadogPodAutoscaler {#example-datadogpodautoscaler-configurations}

Les exemples suivants présentent des configurations `DatadogPodAutoscaler` courantes pour différentes stratégies de mise à l'échelle. Utilisez-les comme points de départ et ajustez les valeurs pour répondre aux besoins de votre charge de travail. Si vous préférez choisir un modèle dans le Datadog UI, suivez le [Chemin A](#path-a-datadog-ui-setup-wizard) ci-dessus.

{{< tabs >}}
{{% tab "Optimiser les coûts" %}}

Choisissez ce modèle pour une charge de travail sans état et sensible aux coûts, où le contrôleur doit supprimer rapidement la capacité lorsque la charge diminue. Le paramètre déterminant est l'objectif d'utilisation élevée du CPU (85 %), combiné à une règle de réduction d'échelle agressive et à un minimum d'une réplique.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                # Aggressive: allow 50% reduction every 2 minutes
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 300
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 190
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
        # Allow scaling down to 1 replica for maximum savings
        minReplicas: 1
    objectives:
        # High utilization target to maximize cost efficiency
        - type: PodResource
          podResource:
            name: cpu
            value:
                type: Utilization
                utilization: 85
```

{{% /tab %}}
{{% tab "Optimiser l'équilibre" %}}

Choisissez ce modèle lorsque vous souhaitez réaliser des économies sans compromettre la disponibilité. C'est une valeur par défaut raisonnable pour la plupart des charges de travail sans état. Le paramètre déterminant est l'objectif d'utilisation modérée du CPU (70 %), associé à une réduction d'échelle conservatrice et à un minimum de deux répliques. Le contrôleur ajoute rapidement de la capacité mais la supprime lentement.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                # Conservative: allow only 20% reduction every 20 minutes
                - periodSeconds: 1200
                  type: Percent
                  value: 20
            stabilizationWindowSeconds: 600
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 130
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
        # Maintain at least 2 replicas for availability
        minReplicas: 2
    objectives:
        # Moderate utilization target balances cost and performance
        - type: PodResource
          podResource:
            name: cpu
            value:
                type: Utilization
                utilization: 70
```

{{% /tab %}}
{{% tab "CPU et mémoire verticales" %}}

Choisissez ce modèle lorsqu'une charge de travail ne peut pas être mise à l'échelle horizontalement, ou lorsque vous souhaitez un dimensionnement optimal sans modifier le nombre de réplicas. Les cas courants sont les services singleton, les charges de travail avec état et les composants élus leaders. Le paramètre déterminant est `scaleDown.strategy: Disabled` et `scaleUp.strategy: Disabled`, ce qui ne laisse que `update.strategy: Auto` pour appliquer les recommandations de CPU et de mémoire.

Par défaut, le contrôleur applique les recommandations verticales en déclenchant un déploiement (éviction et recréation des pods). L'Agent de cluster **7.78+** prend également en charge **le redimensionnement des pods sur place**, qui met à jour les demandes et les limites de CPU et de mémoire d'un pod sans le redémarrer. Le redimensionnement sur place est optionnel : définissez `autoscaling.workload.in_place_vertical_scaling.enabled: true` sur l'Agent de cluster (ou définissez la variable d'environnement `DD_AUTOSCALING_WORKLOAD_IN_PLACE_VERTICAL_SCALING_ENABLED=true`).

Votre cluster doit également exposer la sous-ressource `pods/resize`. C'est la valeur par défaut dans Kubernetes 1.33+ où le feature gate `InPlacePodVerticalScaling` est en version bêta. Sur Kubernetes 1.27 à 1.32, le feature gate doit être activé sur `kube-apiserver` et chaque `kubelet`.

Lorsque les deux prérequis sont remplis :

- **Par défaut** : Les charges de travail avec `applyPolicy.update.strategy: Auto` (la valeur par défaut) sont redimensionnées sur place.
- **Repli** : Si le kubelet signale un redimensionnement comme `Infeasible`, le contrôleur revient à un déploiement.
- **Opt-out** : Pour forcer une charge de travail à toujours utiliser une mise à l'échelle verticale basée sur un déploiement, indépendamment du paramètre du cluster, définissez `applyPolicy.update.strategy: TriggerRollout` sur son `DatadogPodAutoscaler`.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        # Horizontal scaling disabled; only vertical resizing
        scaleDown:
            strategy: Disabled
        scaleUp:
            strategy: Disabled
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
```

{{% /tab %}}
{{% tab "Requête personnalisée horizontale" %}}

Choisissez ce modèle lorsque le CPU et la mémoire ne sont pas le bon signal de mise à l'échelle. Les exemples incluent un worker de file d'attente qui doit s'adapter à la profondeur du backlog, ou un service API qui doit s'adapter à la latence des requêtes. Le paramètre déterminant est le bloc `objectives`, qui fait référence à une requête de métrique Datadog et à une cible `AbsoluteValue` au lieu d'un pourcentage d'utilisation. Remplacez la requête exemple par une requête correspondant à votre charge de travail.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                - periodSeconds: 1200
                  type: Percent
                  value: 20
            stabilizationWindowSeconds: 600
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 130
        # Vertical updates disabled — horizontal only
        update:
            strategy: Disabled
    constraints:
        maxReplicas: 100
        minReplicas: 2
    objectives:
        - type: CustomQuery
          customQuery:
            # Replace with your own Datadog metric query
            request:
                formula: usage
                queries:
                    - name: usage
                      source: Metrics
                      metrics:
                        query: avg:redis.info.latency_ms{kube_cluster_name:<CLUSTER_NAME>,kube_namespace:<NAMESPACE>,kube_deployment:<WORKLOAD_NAME>}
            value:
                type: AbsoluteValue
                absoluteValue: 500M
            window: 5m0s
    fallback:
        horizontal:
            # With custom queries, local fallback is not activated by default
            enabled: false
            # Direction can be ScaleUp, ScaleDown or All
            direction: ScaleUp
            # When using custom queries, a CPU or Memory fallback objective is required
            objectives:
                - type: PodResource
                  podResource:
                    name: cpu
                    value:
                        type: Utilization
                        utilization: 70
            triggers:
                staleRecommendationThresholdSeconds: 600
```

{{% /tab %}}
{{< /tabs >}}

### Profils de cluster {#cluster-profiles}

Un `DatadogPodAutoscalerClusterProfile` est une ressource à portée de cluster qui contient un modèle de `DatadogPodAutoscaler`. Le Cluster Agent surveille les ressources `Deployment` et `StatefulSet` (et, sur 7.79+, les namespaces qui les contiennent) pour le label `autoscaling.datadoghq.com/profile`, et crée un `DatadogPodAutoscaler` géré pour chaque charge de travail correspondante. Un profil s'applique à de nombreuses charges de travail ; une charge de travail correspond toujours à un `DatadogPodAutoscaler`.

Les profils de cluster et le label au niveau de la charge de travail nécessitent Datadog Cluster Agent 7.78.0+. L'activation au niveau du namespace (labelliser un namespace pour inclure chaque charge de travail prise en charge qu'il contient dans un profil) nécessite Datadog Cluster Agent 7.79.0+. Les Cluster Agents plus anciens ignorent le label de profil.

#### Profils intégrés {#built-in-profiles}

Le Cluster Agent fournit trois profils intégrés et les recrée au démarrage, vous n'avez donc pas besoin de soumettre de YAML de CRD pour les utiliser. Les noms sont réservés.

| Profil | Cible CPU | Réplicas min. | Profil de comportement |
|---|---|---|---|
| `datadog-optimize-cost` | 85 % | 1 | Cible d'utilisation élevée du CPU, réduction agressive, seuil de réplicas le plus bas. Idéal pour les charges de travail sans état et sensibles aux coûts. |
| `datadog-optimize-balance` | 70 % | 2 | Cible d'utilisation modérée du CPU, montée en charge rapide, réduction équilibrée. Idéal pour la plupart des charges de travail sans état. |
| `datadog-optimize-performance` | 60 % | 3 | Cible d'utilisation conservatrice du CPU, montée en charge rapide, réduction lente, seuil de réplicas plus élevé. Idéal pour les services avec état ou critiques. |

Pour activer un profil sur une seule charge de travail, ajoutez le label au `metadata.labels` de la charge de travail :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
spec:
  # ...rest of the Deployment spec
```

Pour activer un profil sur chaque charge de travail prise en charge dans un namespace, labellisez plutôt le namespace (nécessite le Cluster Agent 7.79.0+) :

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
```

#### Profils personnalisés {#custom-profiles}

Créez un `DatadogPodAutoscalerClusterProfile` lorsqu'aucun profil intégré ne correspond à votre politique de mise à l'échelle. Les profils sont à portée de cluster, appliquez-les donc sans flag `--namespace` (ou placez-les dans la couche au niveau du cluster de votre dépôt de configuration).

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscalerClusterProfile
metadata:
  name: cost-optimized-strict-floor
spec:
  template:
    applyPolicy:
      mode: Apply
      scaleUp:
        stabilizationWindowSeconds: 190
        rules:
          - type: Percent
            value: 50
            periodSeconds: 120
      scaleDown:
        stabilizationWindowSeconds: 300
        rules:
          - type: Percent
            value: 50
            periodSeconds: 120
    constraints:
      minReplicas: 1
    objectives:
      - type: PodResource
        podResource:
          name: cpu
          value:
            type: Utilization
            utilization: 85
```

Référencez le profil personnalisé depuis une charge de travail ou un namespace en utilisant le même label :

```yaml
metadata:
  labels:
    autoscaling.datadoghq.com/profile: cost-optimized-strict-floor
```

Le corps du modèle accepte les mêmes champs qu'une spécification `DatadogPodAutoscaler`, moins `targetRef` (le Cluster Agent le remplit pour chaque charge de travail correspondante). Consultez les [exemples de configurations](#example-datadogpodautoscaler-configurations) ci-dessus pour connaître la gamme complète des champs que vous pouvez placer sous `spec.template`.

#### Priorité d'activation {#activation-precedence}

Le Cluster Agent 7.79.0+ ajoute l'activation au niveau du namespace, le `excluded` Opt-out, et la règle de priorité entre eux. Sur le Cluster Agent 7.78.0, seule l'étiquette au niveau de la charge de travail est lue — les règles ci-dessous qui impliquent des namespaces ou la valeur `excluded` ne s'appliquent pas.

- **Les étiquettes de charge de travail prévalent sur les étiquettes de namespace.** Si un namespace est étiqueté `autoscaling.datadoghq.com/profile=ns-profile` et qu'une charge de travail à l'intérieur est étiquetée `autoscaling.datadoghq.com/profile=workload-profile`, la charge de travail utilise `workload-profile`.
- **Opt out with `excluded`.** Définissez `autoscaling.datadoghq.com/profile: excluded` sur une charge de travail pour l'exempter lorsque son namespace est étiqueté. Ceci est utile pour les charges de travail avec état ou critiques dans un espace de nom par ailleurs activé.

  ```yaml
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: payments-ledger
    namespace: production
    labels:
      autoscaling.datadoghq.com/profile: excluded
  ```

- **Les noms de profil inconnus sont ignorés.** Si une charge de travail ou un espace de nom fait référence à un profil qui n'existe pas, le Cluster Agent ne crée pas de `DatadogPodAutoscaler` géré et ne signale aucune erreur. La réconciliation prend en compte l'affectation dès qu'un profil portant ce nom est créé.
- **La réconciliation est automatique.** L'ajout, la modification ou la suppression de l'étiquette se propage à un `DatadogPodAutoscaler` géré en quelques secondes.

#### Types de charges de travail pris en charge {#supported-workload-kinds}

L'activation de profil prend en charge `Deployment` et `StatefulSet`. Pour d'autres types (par exemple, Argo `Rollout`), utilisez [Path B : GitOps](#path-b-gitops) pour créer un `DatadogPodAutoscaler` directement.

### Déployer les recommandations manuellement {#deploy-recommendations-manually}

Si vous souhaitez obtenir les recommandations de Datadog sans activer la mise à l'échelle automatique, vous pouvez les appliquer manuellement en une seule fois. Lorsque vous configurez des ressources pour vos déploiements Kubernetes, utilisez les valeurs suggérées dans la recommandation de mise à l'échelle. Vous pouvez également cliquer sur {{< ui >}}Export Recommendation{{< /ui >}} pour voir une commande générée `kubectl patch`. Datadog continue d'actualiser la recommandation, mais le cluster ne change que lorsque vous réappliquez.

## Gérez les charges de travail à grande échelle{#manage-workloads-at-scale}

Une fois qu'une charge de travail est mise à l'échelle automatiquement, les opérations du deuxième jour sont gérées via une combinaison de la ressource `DatadogPodAutoscaler` et de l'interface utilisateur Datadog :

- **Modifiez le modèle de mise à l'échelle.** Modifiez directement le spec `DatadogPodAutoscaler` de la charge de travail (CPU target, replica bounds, scale-up and scale-down rules), ou choisissez un modèle différent dans la [vue de liste Workload Scaling][8] : Les modifications prennent effet lors de la prochaine réconciliation.
- **Mettez en pause la mise à l'échelle automatique sans supprimer la ressource.** Définissez `applyPolicy.mode: Preview` pour garder les recommandations visibles dans `.status` tout en empêchant le contrôleur de les appliquer. Ceci est utile lors d'une exécution parallèlement à un HPA ou un VPA pendant l'évaluation.
- **Surveillez le déploiement.** La [vue de liste Workload Scaling] affiche le statut en direct de la recommandation de chaque charge de travail, la dernière action appliquée et toute erreur de réconciliation.
- **Supprimez la mise à l'échelle automatique proprement.** Supprimez `DatadogPodAutoscaler` la ressource pour arrêter la mise à l'échelle automatique. Les ressources de pod existantes restent à leurs dernières valeurs appliquées, et la charge de travail revient à ce que son contrôleur parent (Deployment, StatefulSet, etc.) spécifie lors du prochain déploiement.

## Référence {#reference}

### Comment les recommandations verticales sont calculées {#how-vertical-recommendations-are-calculated}

Datadog calcule les recommandations de mise à l'échelle verticale pour le CPU et la mémoire en analysant les données d'utilisation historique des conteneurs sur les 8 derniers jours. La méthodologie utilisée pour chaque ressource dépend du fait que la demande de cette ressource est égale à sa limite, reflétant le concept de [Kubernetes Quality of Service (QoS) class][14]. Le CPU et la mémoire sont évalués indépendamment : une charge de travail peut utiliser la méthodologie Burstable pour le CPU et la méthodologie Guaranteed pour la mémoire, ou vice versa.

#### Recommandations de mémoire {#memory-recommendations}

**Burstable** (la requête de mémoire est inférieure à la limite de mémoire) :

| | Comment c'est calculé |
|---|---|
| **Recommandation de requête** | Basée sur le **p95** de l'utilisation de mémoire au cours des 8 derniers jours, avec un poids décroissant appliqué aux échantillons plus anciens afin que les modèles d'utilisation récents soient priorisés. Une **marge de sécurité de 10 %** est ensuite ajoutée. |
| **Recommandation de limite** | Basée sur le **pic d'utilisation de mémoire maximal** observé au cours des 8 derniers jours. Une **marge de sécurité de 5 %** est ensuite ajoutée. |

**Guaranteed** (la requête de mémoire est égale à la limite de mémoire) :

| | Comment c'est calculé |
|---|---|
| **Recommandation de requête et de limite** | Basée sur le **pic d'utilisation de mémoire maximal** observé au cours des 8 derniers jours. Une **marge de sécurité de 5 %** est ajoutée. Si un **OOMKill** est détecté, une **augmentation supplémentaire de 20 %** est appliquée pour aider à prévenir de futurs événements de manque de mémoire. |

**Remarque :** Le suivi du pic de mémoire capture l'utilisation de mémoire la plus élevée jamais enregistrée par tout conteneur ayant existé au cours de la fenêtre de rétrospection de 8 jours. Cela signifie que même si un conteneur a démarré avant cette fenêtre, son utilisation maximale (par exemple, au démarrage) est toujours prise en compte dans la recommandation.

#### Recommandations de CPU {#cpu-recommendations}

**Burstable** (la requête CPU est inférieure à la limite CPU) :

| | Comment c'est calculé |
|---|---|
| **Recommandation de requête** | Basée sur le **p90** de l'utilisation CPU par rapport à la requête actuelle au cours des 8 derniers jours, avec un poids décroissant appliqué aux échantillons plus anciens afin que les modèles d'utilisation récents soient priorisés. Une **marge de sécurité de 10 %** est ensuite ajoutée. |
| **Recommandation de limite** | Basée sur le **p95** de l'utilisation CPU par rapport à la requête actuelle au cours des 8 derniers jours. Une **marge de sécurité de 5 %** est ensuite ajoutée. Si la recommandation de requête résultante dépasse la recommandation de limite, la valeur de requête est utilisée pour les deux. |

**Guaranteed** (la demande CPU est égale à la limite CPU) :

| | Comment c'est calculé |
|---|---|
| **Recommandation de demande et de limite** | Basée sur le **p95** de l'utilisation CPU par rapport à la demande actuelle sur les 8 derniers jours. Une **marge de sécurité de 5 %** est ensuite ajoutée. |

#### Principes de conception clés {#key-design-principles}

- **Fenêtre de rétrospection de 8 jours** : Toutes les recommandations prennent en compte les données d'utilisation des 8 derniers jours, fournissant suffisamment d'historique pour capturer les modèles de trafic hebdomadaires tout en restant réactif aux changements.
- **Pondérations décroissantes** : Pour les recommandations de demande de classe Burstable (CPU ou mémoire), les échantillons plus anciens sont moins fortement pondérés, de sorte que la recommandation s'adapte plus rapidement aux changements d'utilisation récents.
- **Marges de sécurité** : Chaque recommandation inclut une marge au-dessus de l'utilisation observée (5 à 10 %) pour fournir une réserve contre les pics inattendus.
- **OOMKill response** : Lorsque la mémoire est de type Guaranteed (la demande est égale à la limite) et qu'un OOMKill se produit, une augmentation de 20 % est appliquée pour réduire la probabilité de pannes de mémoire répétées.
- **Guaranteed-class preservation** : Lorsqu'une ressource a une demande égale à la limite, Datadog utilise le calcul le plus conservateur (au niveau de la limite) pour les deux, garantissant que les recommandations n'introduisent pas d'écart entre la demande et la limite.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/remote_config
[2]: /fr/agent/remote_config/?tab=configurationyamlfile#enable-remote-configuration
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: /fr/containers/kubernetes/distributions
[6]: https://app.datadoghq.com/orchestration/scaling/summary
[7]: https://app.datadoghq.com/orchestration/scaling/cluster
[8]: https://app.datadoghq.com/orchestration/scaling/workload
[9]: /fr/integrations/kubernetes_state_core/
[10]: https://www.datadoghq.com/product-preview/kubernetes-cluster-autoscaling/
[11]: https://app.datadoghq.com/orchestration/scaling/setup
[12]: /fr/containers/guide/manage-datadogpodautoscaler-with-argocd/
[13]: /fr/containers/guide/manage-datdadogpodautoscaler-with-terraform/
[14]: https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/
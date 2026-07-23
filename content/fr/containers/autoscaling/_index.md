---
aliases:
- /fr/containers/monitoring/autoscaling
description: Faites évoluer automatiquement les charges de travail Kubernetes à l'aide
  des métriques Datadog et de recommandations intelligentes d'évolutivité.
further_reading:
- link: /infrastructure/containers/kubernetes_resource_utilization
  tag: Documentation
  text: Utilisation des ressources Kubernetes
- link: /account_management/rbac/permissions
  tag: Documentation
  text: Autorisations des rôles Datadog
- link: /agent/remote_config/
  tag: Documentation
  text: Configuration à distance
- link: https://www.datadoghq.com/blog/autoscaling-custom-metrics
  tag: Blog
  text: Mise à l'échelle des charges de travail Kubernetes sur des métriques personnalisées
- link: https://www.datadoghq.com/blog/kubernetes-custom-query-autoscaling
  tag: Blog
  text: Optimisez les charges de travail Kubernetes avec Custom Query Scaling.
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralisez et supervisez votre pipeline OpenTelemetry avec la passerelle
    DDOT
- link: https://www.datadoghq.com/blog/datadog-kubernetes-autoscaling/
  tag: Blog
  text: Dimensionnez correctement les charges de travail et réduisez les coûts avec
    l'autoscaling Kubernetes de Datadog
title: Kubernetes Autoscaling
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
  Cette fonctionnalité n'est pas disponible pour Datadog for Government ({{< region-param key="dd_datacenter" >}})
</div>
{{< /site-region >}}

L'autoscaling Kubernetes de Datadog surveille en continu vos ressources Kubernetes pour fournir des recommandations d'évolutivité immédiates et un autoscaling multidimensionnel de vos charges de travail Kubernetes. Vous pouvez déployer l'autoscaling via l'interface web de Datadog, ou avec une `DatadogPodAutoscaler` ressource personnalisée.

## Comment cela fonctionne {#how-it-works}
Datadog utilise des métriques d'utilisation en temps réel et historiques ainsi que des signaux d'événements de vos agents Datadog existants pour faire des recommandations. Vous pouvez ensuite examiner ces recommandations et choisir de les déployer.

Par défaut, l'autoscaling Kubernetes de Datadog utilise des valeurs estimées de coût CPU et mémoire pour montrer les opportunités d'économies et les estimations d'impact. Vous pouvez également utiliser l'autoscaling Kubernetes en parallèle avec [Cloud Cost Management](#idle-cost-and-savings-estimates) pour obtenir des rapports basés sur les coûts exacts de votre type d'instance.

L'évolutivité automatisée des charges de travail est alimentée par une `DatadogPodAutoscaler` ressource personnalisée qui définit le comportement d'évolutivité au niveau de chaque charge de travail. L'agent de cluster Datadog agit en tant que contrôleur pour cette ressource personnalisée.

**Remarque:** Chaque cluster peut avoir un maximum de 1000 charges de travail optimisées avec l'autoscaling Kubernetes de Datadog.

### Compatibilité {#compatibility}

- **Distributions** : Cette fonctionnalité est compatible avec toutes les [distributions Kubernetes prises en charge par Datadog][5].
- **Autoscaling des charges de travail** : Cette fonctionnalité est une alternative au Horizontal Pod Autoscaler (HPA) et au Vertical Pod Autoscaler (VPA). Datadog recommande de supprimer tout HPA ou VPA d'une charge de travail lors de l'activation de Datadog Kubernetes Autoscaling pour l'optimiser. Ces charges de travail sont identifiées dans l'application en votre nom.
**Remarque :** Vous pouvez expérimenter avec Datadog Kubernetes Autoscaling tout en conservant votre HPA et/ou VPA en créant un `DatadogPodAutoscaler` avec `mode: Preview` dans la section `applyPolicy`.

### Exigences {#requirements}

- [Remote Configuration][1] doit être activée à la fois au niveau de l'organisation et sur les Agents de votre cluster cible. Voir [Enabling Remote Configuration][2] pour les instructions d'installation.
- [Helm][3], pour mettre à jour votre Agent Datadog.
- (Pour les utilisateurs de Datadog Operator) [`kubectl` CLI][4], pour mettre à jour l'Agent Datadog.
- Lorsque vous utilisez la mise à l'échelle automatique en direct, Datadog recommande d'utiliser la dernière version de l'Agent Datadog. Cela permet de garantir l'accès aux dernières améliorations et optimisations. Les recommandations de mise à l'échelle nécessitent que l'intégration [Kubernetes State Core][9] soit activée. <br/><br/>

   | Fonctionnalité | Version minimale de l'Agent |
   |---------|----------------------|
   | Recommandations de mise à l'échelle des charges de travail dans l'application | 7.50+ |
   | Mise à l'échelle des charges de travail en direct | 7.66.1+ |
   | Recommandations Argo Rollout et mise à l'échelle automatique | 7.71+ |
   | Mise à l'échelle automatique du cluster ([inscription à l'aperçu][10]) | 7.72+ |
   | Redimensionnement vertical des pods sur place (opt-in) | 7.78+ |
   | Activation du profil de cluster, étiquette de charge de travail | 7.78+ |
   | Activation du profil de cluster, étiquette de namespace | 7.79+ |

- Les autorisations utilisateur suivantes :
   - Org Management (nécessaire pour Remote Configuration)
   - API Keys Write (nécessaire pour Remote Configuration)
   - Écriture de mise à l'échelle de la charge de travail
   - Gestion de l'autoscaling
- (Recommandé) noyau Linux v5.19+ et cgroup v2

## Configuration {#setup}

{{< tabs >}}
{{% tab "Operator Datadog" %}}

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

3. [Admission Controller][1] est activé par défaut avec le Datadog Operator. Si vous l'avez désactivé, réactivez-le en ajoutant les lignes mises en surbrillance suivantes à `datadog-agent.yaml` :

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

1. Assurez-vous d'utiliser l'Agent et l'Agent de Cluster v7.66.1+. Ajoutez ce qui suit à votre fichier de configuration `datadog-values.yaml` :

```yaml
datadog:
  autoscaling:
    workload:
      enabled: true
  kubernetesEvents:
    unbundleEvents: true
```

2. [Admission Controller][1] est activé par défaut dans le Helm chart de Datadog. Si vous l'avez désactivé, réactivez-le en ajoutant les lignes mises en surbrillance suivantes à `datadog-values.yaml` :
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

4. Redéployez l'Agent Datadog avec votre `datadog-values.yaml` mis à jour :

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

[1]: /fr/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{< /tabs >}}

### Estimations des coûts et économies inactifs {#idle-cost-and-savings-estimates}

{{< tabs >}}
{{% tab "Avec Cloud Cost Management" %}}
Si [Cloud Cost Management][1] est activé au sein d'une organisation, Datadog Kubernetes Autoscaling affiche des estimations de coûts inactifs et d'économies basées sur le coût exact de votre facture des instances surveillées sous-jacentes.

Consultez les instructions de configuration des coûts cloud pour AWS, Azure ou Google Cloud.

Les données de [Cloud Cost Management] améliorent Kubernetes Autoscaling, mais ne sont pas requises. Toutes les recommandations de charge de travail et décisions d'autoscaling de Datadog sont valides et fonctionnelles sans [Cloud Cost Management].

[1]: /fr/cloud_cost_management
[2]: /fr/cloud_cost_management/aws
[3]: /fr/cloud_cost_management/azure
[4]: /fr/cloud_cost_management/google_cloud
{{% /tab %}}

{{% tab "Par défaut" %}}
Si [Cloud Cost Management] **n'est pas** activé, Datadog Kubernetes Autoscaling affiche des estimations de coûts inactifs et d'économies en utilisant les formules et valeurs fixes suivantes :

**Cluster inactif**:

```
  (cpu_capacity - max(cpu_usage, cpu_requests)) * core_rate_per_hour
+ (mem_capacity - max(mem_usage, mem_requests)) * memory_rate_per_hour
```

**Charge de travail inactive**:

```
  (max(cpu_usage, cpu_requests) - cpu_usage) * core_rate_per_hour
+ (max(mem_usage, mem_requests) - mem_usage) * memory_rate_per_hour
```

**Valeurs fixes**:
- core_rate_per_hour = 0,0295 $ par heure de cœur CPU
- memory rate_per_hour = 0,0053 $ par heure de mémoire GB


_Les valeurs de coût fixes sont susceptibles d'être affinées au fil du temps._
{{% /tab %}}
{{< /tabs >}}

## Utilisation{#usage}

### Identifier les ressources à redimensionner{#identify-resources-to-rightsize}

La page de résumé d'autoscaling fournit un point de départ pour les équipes de plateforme afin de comprendre les opportunités d'économies de ressources Kubernetes au sein d'une organisation, et de filtrer vers des clusters et des espaces de noms clés.

La page de configuration offre l'option de sélectionner plusieurs charges de travail à mettre à l'échelle, et de gérer votre optimisation par lots.

La vue de mise à l'échelle des clusters fournit des informations par cluster sur le total des CPU inactifs, la mémoire inactive totale et les coûts.

Cliquez sur un cluster pour des informations détaillées et un tableau des charges de travail du cluster triées par économies estimées. Si vous êtes un propriétaire d'application ou de service individuel, vous pouvez également filtrer par le nom de votre équipe ou de votre service directement depuis la vue de liste de mise à l'échelle des charges de travail.

Depuis n'importe laquelle de ces vues, cliquez {{< ui >}}Optimize{{< /ui >}}sur une charge de travail pour voir sa recommandation de mise à l'échelle, puis activez [l'autoscaling pour une charge de travail](#enable-autoscaling-for-a-workload).

### Activer l'autoscaling pour une charge de travail{#enable-autoscaling-for-a-workload}

Après avoir identifié une charge de travail à optimiser, inspectez son {{< ui >}}Scaling Recommendation{{< /ui >}}. Cliquez sur {{< ui >}}Configure Recommendation{{< /ui >}} pour ajouter des contraintes ou ajuster les niveaux d'utilisation cibles avant d'activer.

Il existe trois façons d'activer l'autoscaling pour une charge de travail. Choisissez le chemin qui correspond à la manière dont vous déployez des charges de travail aujourd'hui.

| Chemin | Meilleur pour | Où commencer | Gestion continue |
|------|----------|-----------------|--------------------|
| **A. Datadog UI setup wizard** | Commencez rapidement et itérez sur les paramètres avec un retour visuel immédiat, ou donnez à vos équipes d'application les moyens de prendre de meilleures décisions de configuration de mise à l'échelle | [Setup page][11] dans Datadog UI | Modifiez le `DatadogPodAutoscaler` de la charge de travail depuis l'interface ou votre cluster |
| **B. Rédigez un `DatadogPodAutoscaler` manifeste** | Flux de travail existants pour l'expédition de manifestes Kubernetes (`kubectl`, Helm, ArgoCD, Terraform ou d'autres outils GitOps) | YAML écrit à la main ou modélisé appliqué via vos outils existants | Modifiez le manifeste et réappliquez-le via les mêmes outils |
| **C. Appliquez un [[cluster profile]](#cluster-profiles) étiquette** | Activer l'autoscaling sur de nombreuses charges de travail ou espaces de noms avec une seule politique partagée | Étiquetez la charge de travail ou l'espace de noms avec `autoscaling.datadoghq.com/profile` | Modifiez le profil pour mettre à jour chaque charge de travail qu'il gère, ou déplacez des charges de travail entre les profils en changeant l'étiquette |

#### Chemin A : Datadog UI {#path-a-datadog-ui}

Le moyen le plus rapide de commencer est la [page de configuration][11] dans le Datadog UI. L'assistant vous guide à travers cinq étapes : sélectionnez un cluster, vérifiez les exigences en matière d'agent et d'autorisations, choisissez une méthode d'installation, optez pour un modèle de mise à l'échelle et déployez. Modèles disponibles dans l'assistant :

- **Optimiser le coût** : cible d'utilisation CPU élevée, réduction agressive, plancher minimal de répliques. Idéal pour les charges de travail sans état sensibles aux coûts.
- **Optimiser l'équilibre** : cible d'utilisation modérée, montée et descente équilibrées. Idéal pour la plupart des charges de travail sans état.
- **Optimiser la performance** : cible d'utilisation conservatrice, réduction lente, et nombre minimal de répliques. Idéal pour les services avec état ou critiques.
- **Personnaliser** : commencez à partir de l'un des éléments ci-dessus et ajustez vous-même la cible CPU, les répliques et les fenêtres de stabilisation.

L'assistant de configuration est idéal pour essayer l'autoscaling sur une seule charge de travail, se familiariser avec une recommandation ou intégrer un petit ensemble de charges de travail. (Nécessite les autorisations `Workload Scaling Write` et `Autoscaling Manage`.)

#### Chemin B : GitOps {#path-b-gitops}

Définissez une `DatadogPodAutoscaler` ressource personnalisée qui cible votre charge de travail et appliquez-la via les outils que vous utilisez déjà pour déployer des manifestes Kubernetes, que ce soit `kubectl apply`, Helm, ArgoCD, Terraform ou un autre outil GitOps. La rédaction du manifeste est la même, quel que soit le mécanisme de livraison. Voir les [exemples de configurations](#example-datadogpodautoscaler-configurations) ci-dessous pour des points de départ prêts à être modifiés couvrant l'optimisation des coûts, l'échelle équilibrée, le redimensionnement vertical uniquement et l'échelle horizontale par requête personnalisée.

Pour des guides spécifiques aux outils, voir :

- [Gérer DatadogPodAutoscaler avec ArgoCD][12]
- [Gérer DatadogPodAutoscaler avec Terraform][13]

### Exemples de configurations DatadogPodAutoscaler {#example-datadogpodautoscaler-configurations}

Les exemples suivants démontrent des `DatadogPodAutoscaler` configurations courantes pour différentes stratégies de mise à l'échelle. Utilisez-les comme points de départ et ajustez les valeurs pour correspondre aux exigences de votre charge de travail. Si vous préférez choisir un modèle dans le Datadog UI, suivez le [Chemin A](#path-a-datadog-ui-setup-wizard) ci-dessus.

{{< tabs >}}
{{% tab "Optimiser le coût" %}}

Choisissez ce modèle pour une charge de travail sans état, sensible aux coûts, où le contrôleur doit retirer rapidement de la capacité lorsque la charge diminue. Le paramètre déterminant est l'objectif d'utilisation CPU élevé (85 %), associé à une règle de réduction agressive et à un minimum d'une réplique.

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
            stabilizationWindowSeconds: 300
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

Choisissez ce modèle lorsque vous souhaitez des économies sans compromettre la disponibilité. C'est un choix par défaut raisonnable pour la plupart des charges de travail sans état. Le paramètre déterminant est l'objectif d'utilisation CPU modéré (70 %) associé à une réduction conservatrice (20 % toutes les 20 minutes) et à un minimum de deux répliques. Le contrôleur ajoute rapidement de la capacité mais la retire lentement.

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
            stabilizationWindowSeconds: 600
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

Choisissez ce modèle lorsque une charge de travail ne peut pas être mise à l'échelle horizontalement, ou lorsque vous souhaitez un redimensionnement pur sans changer le nombre de répliques. Les cas courants sont les services singleton, les charges de travail avec état et les composants élus par un leader. Le paramètre définissant est `scaleDown.strategy: Disabled` et `scaleUp.strategy: Disabled`, ce qui laisse seulement `update.strategy: Auto` pour appliquer les recommandations de CPU et de mémoire.

Par défaut, le contrôleur applique les recommandations verticales en déclenchant un déploiement (évincer et recréer des pods). Le Cluster Agent **7.78+** prend également en charge le **redimensionnement de pod sur place**, qui met à jour les demandes et les limites de CPU et de mémoire d'un pod sans le redémarrer. Le redimensionnement sur place est opt-in : définissez `autoscaling.workload.in_place_vertical_scaling.enabled: true` sur le Cluster Agent (ou définissez la variable d'environnement `DD_AUTOSCALING_WORKLOAD_IN_PLACE_VERTICAL_SCALING_ENABLED=true`).

Votre cluster doit également exposer la sous-ressource `pods/resize`. C'est le paramètre par défaut dans Kubernetes 1.33+ où le `InPlacePodVerticalScaling` feature gate est en version bêta. Sur Kubernetes 1.27 à 1.32, le feature gate doit être activé sur `kube-apiserver` et chaque `kubelet`.

Lorsque les deux conditions préalables sont remplies :

- **Par défaut** : Les charges de travail avec `applyPolicy.update.strategy: Auto` (le paramètre par défaut) se redimensionnent sur place.
- **Repli** : Si le kubelet signale un redimensionnement comme `Infeasible`, le contrôleur revient à un déploiement.
- **Désinscription** : Pour forcer une charge de travail à toujours utiliser un redimensionnement vertical basé sur le déploiement, quelle que soit la configuration du cluster, définissez `applyPolicy.update.strategy: TriggerRollout` sur son `DatadogPodAutoscaler`.

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

Choisissez ce modèle lorsque le CPU et la mémoire ne sont pas le bon signal de mise à l'échelle. Les exemples incluent un travailleur de file d'attente qui devrait se mettre à l'échelle en fonction de la profondeur de la file d'attente, ou un service API qui devrait se mettre à l'échelle en fonction de la latence des requêtes. Le paramètre définissant est le bloc `objectives`, qui fait référence à une requête de métrique Datadog et à une cible `AbsoluteValue` au lieu d'un pourcentage d'utilisation. Remplacez la requête d'exemple par une qui correspond à votre charge de travail.

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
            stabilizationWindowSeconds: 600
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

Un `DatadogPodAutoscalerClusterProfile` est une ressource à portée de cluster qui contient un modèle `DatadogPodAutoscaler`. Le Cluster Agent surveille les ressources `Deployment` et `StatefulSet` (et, sur 7.79+, les espaces de noms qui les contiennent) pour l'étiquette `autoscaling.datadoghq.com/profile`, et crée un `DatadogPodAutoscaler` géré pour chaque charge de travail correspondante. Un profil s'applique à de nombreuses charges de travail ; une charge de travail correspond toujours à un `DatadogPodAutoscaler`.

Les profils de cluster et l'étiquette au niveau de la charge de travail nécessitent le Datadog Cluster Agent 7.78.0+. L'activation au niveau de l'espace de noms (étiquetage d'un espace de noms pour inclure chaque charge de travail prise en charge à l'intérieur dans un profil) nécessite le Datadog Cluster Agent 7.79.0+. Les anciens Cluster Agents ignorent l'étiquette de profil.

#### Profils intégrés {#built-in-profiles}

Le Datadog Cluster Agent fournit trois profils intégrés et les recrée au démarrage, ainsi vous n'avez pas à committer de CRD YAML pour les utiliser. Les noms sont réservés.

| Profil | Cible CPU | Min répliques | Profil de comportement |
|---|---|---|---|
| `datadog-optimize-cost` | 85 % | 1 | Charges de travail sans état, sensibles aux coûts. Montée en charge et descente rapide (fenêtres de stabilisation de 5 minutes, étape de 50% toutes les 2 minutes). |
| `datadog-optimize-balance` | 70 % | 2 | Par défaut pour la plupart des charges de travail sans état. Fenêtres de stabilisation équilibrées de 10 minutes, descente conservatrice (étape de 20% toutes les 20 minutes). |
| `datadog-optimize-performance` | 60 % | 3 | Charges de travail avec état ou sensibles à la latence. Descente très conservatrice (fenêtres de stabilisation de 15 minutes, étape de 10% toutes les 30 minutes). |

Pour activer un profil sur une seule charge de travail, ajoutez l'étiquette à `metadata.labels` de la charge de travail :

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

Pour activer un profil sur chaque charge de travail prise en charge dans un espace de noms, étiquetez plutôt l'espace de noms (nécessite le Cluster Agent 7.79.0+) :

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
```

#### Profils personnalisés {#custom-profiles}

Rédigez un `DatadogPodAutoscalerClusterProfile` lorsque aucun profil intégré ne correspond à votre politique de mise à l'échelle. Les profils sont à portée de cluster, donc appliquez-les sans le flag `--namespace` (ou placez-les dans la couche de niveau cluster de votre dépôt de configuration).

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
        stabilizationWindowSeconds: 300
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

Référencez le profil personnalisé depuis une charge de travail ou un espace de noms en utilisant la même étiquette :

```yaml
metadata:
  labels:
    autoscaling.datadoghq.com/profile: cost-optimized-strict-floor
```

Le corps du modèle accepte les mêmes champs qu'une spécification `DatadogPodAutoscaler`, à l'exception de `targetRef` (le Cluster Agent le remplit pour chaque charge de travail correspondante). Voir les [exemples de configurations](#example-datadogpodautoscaler-configurations) ci-dessus pour l'ensemble des champs que vous pouvez mettre sous `spec.template`.

#### Priorité d'activation {#activation-precedence}

Le Cluster Agent 7.79.0+ ajoute l'activation au niveau de l'espace de noms, l'`excluded` désinscription, et la règle de priorité entre eux. Sur le Cluster Agent 7.78.0, seule l'étiquette au niveau de la charge de travail est lue — les règles ci-dessous qui impliquent des espaces de noms ou la valeur `excluded` ne s'appliquent pas.

- **Les étiquettes de charge de travail ont la priorité sur les étiquettes d'espace de noms.** Si un espace de noms est étiqueté `autoscaling.datadoghq.com/profile=ns-profile` et qu'une charge de travail à l'intérieur est étiquetée `autoscaling.datadoghq.com/profile=workload-profile`, la charge de travail utilise `workload-profile`.
- **Désinscription avec `excluded`.** Définissez `autoscaling.datadoghq.com/profile: excluded` sur une charge de travail pour l'exempter lorsque son espace de noms est étiqueté. Ceci est utile pour les charges de travail à état ou critiques dans un espace de noms autrement inscrit.

  ```yaml
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: payments-ledger
    namespace: production
    labels:
      autoscaling.datadoghq.com/profile: excluded
  ```

- **Les noms de profils inconnus sont ignorés.** Si une charge de travail ou un espace de noms référence un profil qui n'existe pas, le Cluster Agent ne crée pas de `DatadogPodAutoscaler` géré et ne signale pas d'erreur. La réconciliation prend en charge l'attribution dès qu'un profil avec ce nom est créé.
- **La réconciliation est automatique.** L'ajout, la modification ou la suppression de l'étiquette se propage à un `DatadogPodAutoscaler` géré en quelques secondes.

#### Types de charges de travail pris en charge {#supported-workload-kinds}

L'activation de profil prend en charge `Deployment` et `StatefulSet`. Pour d'autres types (par exemple, Argo `Rollout`), utilisez [Path B: GitOps](#path-b-gitops) pour rédiger un `DatadogPodAutoscaler` directement.

### Déployer les recommandations manuellement {#deploy-recommendations-manually}

Si vous souhaitez obtenir les recommandations de Datadog sans activer l'autoscaling, vous pouvez les appliquer manuellement une fois. Lorsque vous configurez des ressources pour vos déploiements Kubernetes, utilisez les valeurs suggérées dans la recommandation de mise à l'échelle. Vous pouvez également cliquer sur {{< ui >}}Export Recommendation{{< /ui >}} pour voir une commande `kubectl patch` générée. Datadog continue de mettre à jour la recommandation, mais le cluster ne change que lorsque vous la réappliquez.

## Gérer les charges de travail à grande échelle {#manage-workloads-at-scale}

Après qu'une charge de travail a été mise à l'échelle automatiquement, les opérations du deuxième jour sont gérées par une combinaison de la ressource `DatadogPodAutoscaler` et de l'interface utilisateur de Datadog :

- **Modifier le modèle de mise à l'échelle.** Modifiez la spécification `DatadogPodAutoscaler` de la charge de travail (cible CPU, limites de réplicas, règles d'augmentation et de diminution) directement, ou choisissez un modèle différent dans la vue liste [Mise à l'échelle des charges de travail][8]. Les changements prennent effet lors de la prochaine réconciliation.
- **Mettre en pause l'autoscaling sans supprimer la ressource.** Définissez `applyPolicy.mode: Preview` pour garder les recommandations visibles dans `.status` tout en empêchant le contrôleur de les appliquer. Ceci est utile lors de l'exécution avec un HPA ou un VPA pendant l'évaluation.
- **Surveiller le déploiement.** La vue liste de mise à l'échelle des charges de travail montre l'état en direct de la recommandation de chaque charge de travail, la dernière action appliquée et les erreurs de réconciliation.
- **Supprimer l'autoscaling proprement.** Supprimez la ressource `DatadogPodAutoscaler` pour arrêter l'autoscaling. Les ressources de pod existantes restent à leurs dernières valeurs appliquées, et la charge de travail revient à ce que son contrôleur parent (Déploiement, StatefulSet, etc.) spécifie lors du prochain déploiement.

## Référence {#reference}

### Comment les recommandations verticales sont calculées {#how-vertical-recommendations-are-calculated}

Datadog calcule des recommandations de mise à l'échelle verticale pour le CPU et la mémoire en analysant les données historiques d'utilisation des conteneurs au cours des 8 derniers jours. La méthodologie utilisée pour chaque ressource dépend de si la demande de cette ressource est égale à sa limite, reflétant le concept de [classe de qualité de service (QoS) Kubernetes][14]. Le CPU et la mémoire sont évalués indépendamment : une charge de travail peut utiliser la méthodologie Burstable pour le CPU et la méthodologie Guaranteed pour la mémoire, ou vice versa.

#### Recommandations de mémoire {#memory-recommendations}

**Burstable** (la demande de mémoire est inférieure à la limite de mémoire) :

| | Comment cela est calculé |
|---|---|
| **Recommandation de demande** | Basée sur le **p95** de l'utilisation de la mémoire au cours des 8 derniers jours, avec un poids décroissant appliqué aux échantillons plus anciens afin que les modèles d'utilisation récents soient prioritaires. Une **marge de sécurité de 10%** est ensuite ajoutée. |
| **Recommandation de limite** | Basée sur le **pic maximum d'utilisation de la mémoire** observé au cours des 8 derniers jours. Une **marge de sécurité de 5%** est ensuite ajoutée. |

**Guaranteed** (la demande de mémoire est égale à la limite de mémoire) :

| | Comment cela est calculé |
|---|---|
| **Recommandation de demande et de limite** | Basée sur le **pic maximum d'utilisation de la mémoire** observé au cours des 8 derniers jours. Une **marge de sécurité de 5%** est ajoutée. Si un **OOMKill** est détecté, une augmentation supplémentaire de **20%** est appliquée pour aider à prévenir de futurs événements de manque de mémoire. |

**Remarque :** Le suivi du pic de mémoire capture la plus haute utilisation de mémoire jamais enregistrée par un conteneur ayant existé dans la fenêtre de retour de 8 jours. Cela signifie que même si un conteneur a démarré avant cette fenêtre, son utilisation maximale (par exemple, au démarrage) est toujours prise en compte dans la recommandation.

#### Recommandations de CPU {#cpu-recommendations}

**Burstable** (la demande de CPU est inférieure à la limite de CPU) :

| | Comment cela est calculé |
|---|---|
| **Recommandation de demande** | Basée sur le **p90** de l'utilisation du CPU par rapport à la demande actuelle au cours des 8 derniers jours, avec un poids décroissant appliqué aux échantillons plus anciens afin que les modèles d'utilisation récents soient prioritaires. Une **marge de sécurité de 10%** est ensuite ajoutée. |
| **Recommandation de limite** | Basée sur le **p95** de l'utilisation du CPU par rapport à la demande actuelle au cours des 8 derniers jours. Une **marge de sécurité de 5%** est ensuite ajoutée. Si la recommandation de demande résultante dépasse la recommandation de limite, la valeur de la demande est utilisée pour les deux. |

**Guaranteed** (la demande de CPU est égale à la limite de CPU) :

| | Comment cela est calculé |
|---|---|
| **Recommandation de demande et de limite** | Basée sur le **p95** de l'utilisation du CPU par rapport à la demande actuelle au cours des 8 derniers jours. Une **marge de sécurité de 5%** est ensuite ajoutée. |

#### Principes de conception clés {#key-design-principles}

- **Fenêtre de rétrospection de 8 jours** : Toutes les recommandations prennent en compte les données d'utilisation des 8 derniers jours, fournissant suffisamment d'historique pour capturer les modèles de trafic hebdomadaires tout en restant réactives aux changements.
- **Poids décroissants** : Pour les recommandations de demande de classe Burstable (CPU ou mémoire), les échantillons plus anciens sont moins pondérés, de sorte que la recommandation s'adapte plus rapidement aux changements récents d'utilisation.
- **Marges de sécurité** : Chaque recommandation inclut une marge au-dessus de l'utilisation observée (5 à 10 %) pour fournir une marge de sécurité contre les pics inattendus.
- **Réponse OOMKill** : Lorsque la mémoire est de classe Garantie (demande égale à la limite) et qu'un OOMKill se produit, une augmentation de 20 % est appliquée pour réduire la probabilité d'échecs répétés de mémoire insuffisante.
- **Préservation de la classe Garantie** : Lorsqu'une ressource a une demande égale à la limite, Datadog utilise le calcul le plus conservateur (niveau limite) pour les deux, garantissant que les recommandations n'introduisent pas d'écart entre la demande et la limite.

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
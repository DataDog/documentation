---
description: Configurez les ressources personnalisées DatadogPodAutoscaler en YAML
  pour accéder aux options que l'interface utilisateur Datadog n'expose pas.
further_reading:
- link: /containers/autoscaling/
  tag: Documentation
  text: Kubernetes Autoscaling
- link: /containers/guide/manage-datadogpodautoscaler-with-argocd/
  tag: Documentation
  text: Gérez DatadogPodAutoscaler avec ArgoCD
- link: /containers/guide/manage-datdadogpodautoscaler-with-terraform/
  tag: Documentation
  text: Gérez DatadogPodAutoscaler avec Terraform
title: Référence du manifeste DatadogPodAutoscaler
---
La ressource personnalisée `DatadogPodAutoscaler` (DPA) définit le comportement de mise à l'échelle automatique pour une seule charge de travail Kubernetes. L'[interface utilisateur d'autoscaling][1] avec {{< ui >}}Export Recommendation{{< /ui >}} est un bon point de départ : configurez une charge de travail, puis copiez le manifeste généré. La modification directe du manifeste vous donne accès à chaque champ de la définition de ressource personnalisée (CRD) et fait du DPA une partie normale de votre workflow GitOps, où le manifeste est la source de vérité révisée et versionnée.

Cette page couvre les options de configuration disponibles dans le manifeste. Les exemples sur cette page utilisent la version d'API `datadoghq.com/v1alpha2`.

Pour la configuration et les prérequis, consultez [Kubernetes Autoscaling][2]. Cette page couvre l'activation de la mise à l'échelle automatique de charge de travail et du contrôleur d'admission sur le Datadog Cluster Agent, les versions d'agent requises, ainsi que l'activation du [redimensionnement vertical sur place][3].

## Anatomie d'un manifeste {#anatomy-of-a-manifest}

Le squelette annoté suivant montre la structure d'un `DatadogPodAutoscaler`. Chaque champ est facultatif, à l'exception de `targetRef`.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-app                      # required: conventionally the workload name
  namespace: my-namespace           # required: must match the target workload
  annotations:                      # optional
    ad.datadoghq.com/tags: '{"team": "my-team"}'   # optional: tags on this DPA's telemetry
spec:
  owner: Local                      # optional: Local = this manifest is the source of truth (use for GitOps)
                                    # Remote = created and managed from the Datadog UI

  targetRef:                        # required: the workload being autoscaled - one DPA per workload
    apiVersion: apps/v1
    kind: Deployment
    name: my-app

  applyPolicy:                      # optional
    mode: Apply                     # Apply | Preview (Preview = compute recommendations, change nothing)

    scaleUp:                        # optional: horizontal, upward
      strategy: Max                 # Max | Min | Disabled
      stabilizationWindowSeconds: 600
      rules:
        - type: Percent             # Percent | Pods
          value: 50
          periodSeconds: 120        # 1..3600

    scaleDown:                      # optional: horizontal, downward
      strategy: Max
      stabilizationWindowSeconds: 600
      rules:
        - type: Percent
          value: 10
          periodSeconds: 1800

    update:                         # optional: vertical
      strategy: Auto                # Auto | Disabled | TriggerRollout
      # resizePendingPeriod: 600    # see Vertical rollout timing
      # rolloutFallbackDelay: 900   # see Vertical rollout timing

  constraints:                      # optional
    minReplicas: 3
    maxReplicas: 100
    containers:                     # optional: per-container vertical configuration
      - name: "*"                   # "*" matches all containers
        enabled: true
        controlledResources: [cpu, memory]
        controlledValues: RequestsAndLimits   # RequestsAndLimits | RequestsOnly
        minAllowed:
          cpu: "500m"
          memory: 1Gi
        maxAllowed:
          cpu: "4"
          memory: 8Gi

  objectives:                       # optional: configures horizontal scaling (also used by multidimensional). Exactly one entry.
    - type: ContainerResource       # PodResource | ContainerResource | CustomQuery
      containerResource:
        container: my-app
        name: cpu                   # cpu | memory
        value:
          type: Utilization         # Utilization | AbsoluteValue
          utilization: 65

  fallback:                         # optional: in-cluster horizontal fallback if recommendations go stale
    horizontal:
      enabled: true
      direction: ScaleUp            # ScaleUp | ScaleDown | All (default ScaleUp)
      triggers:
        staleRecommendationThresholdSeconds: 600   # 100..3600, default 600

  options:                          # optional
    burstable: false                # true = remove CPU limits, keep CPU request recommendations
    outOfMemory:
      bumpUpRatio: "1.2"            # +20% memory limit after an OOMKill (default)
```

### Charges de travail cibles prises en charge {#supported-target-workloads}

| `targetRef.kind` | `apiVersion` | Statut |
|---|---|---|
| `Deployment` | `apps/v1` | Pris en charge |
| `Rollout` (Argo Rollouts) | `argoproj.io/v1alpha1` | Pris en charge |
| `StatefulSet` | `apps/v1` | Pris en charge |

Pour un Argo Rollout, pointez `targetRef` vers le Rollout lui-même plutôt que vers tout déploiement qu'il gère :

```yaml
  targetRef:
    apiVersion: argoproj.io/v1alpha1
    kind: Rollout
    name: my-app
```

### Choisissez un mode de mise à l'échelle {#choose-a-scaling-mode}

La combinaison de `objectives` et `applyPolicy.update.strategy` détermine si un DPA s'adapte horizontalement, verticalement, ou les deux :

| `objectives` définir | `applyPolicy.update.strategy` | Mode résultant |
|---|---|---|
| oui | `Disabled` (ou non défini) | Horizontal uniquement |
| non | `Auto` | Vertical uniquement |
| oui | `Auto` | Multidimensionnel (les deux) |

## Contraintes de conteneur {#container-constraints}

La plupart des options verticales sont exprimées via `spec.constraints.containers[]` :

| Champ | Type | Par défaut | Signification |
|---|---|---|---|
| `name` | chaîne, **requis** | - | Nom du conteneur, ou `"*"` pour correspondre à chaque conteneur qui n'a pas sa propre entrée (voir [Exclure un conteneur](#exclude-a-container)) |
| `enabled` | bool | `true` | `false` désactive la mise à l'échelle automatique des ressources pour ce conteneur |
| `controlledResources` | liste de `cpu`, `memory` | `[cpu, memory]` | quelles ressources reçoivent des recommandations verticales. Une liste vide équivaut à `enabled: false` |
| `controlledValues` | enum | `RequestsAndLimits` | Si les recommandations écrivent à la fois les requêtes _et_ les limites, ou les requêtes uniquement |
| `minAllowed` | carte de ressources | - | Limite inférieure pour les requêtes du conteneur |
| `maxAllowed` | carte de ressources | - | Limite supérieure pour les requêtes du conteneur |

Si `constraints.containers` est entièrement omis, la mise à l'échelle des ressources est activée pour **tous** les conteneurs, sans limites.

## Dimensionner correctement le CPU et la mémoire {#right-size-cpu-and-memory}

Lorsqu'un DPA combine la mise à l'échelle horizontale (`objectives`) avec la mise à l'échelle verticale (`update.strategy: Auto`), le comportement par défaut est de produire des recommandations verticales pour **la mémoire uniquement**. Les requêtes et limites CPU restent inchangées, et la condition `VerticalAbleToRecommend` peut apparaître comme `Unknown`.

Si un DPA ajuste la taille de la mémoire tout en laissant le CPU inchangé, c'est la raison. Cela n'est pas lié à la préservation de la classe de qualité de service (QoS).

Utilisez `controlledResources` pour déclarer quelles ressources reçoivent des recommandations verticales :

| `controlledResources` | Recommandations verticales produites |
|---|---|
| non défini | mémoire uniquement (par défaut) |
| `[memory]` | mémoire uniquement, identique à non défini |
| `[cpu, memory]` | **mémoire et CPU** |
| `[cpu]` | CPU uniquement |

Exemple complet :

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-app
  namespace: my-namespace
spec:
  owner: Local
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto              # required - without it, nothing vertical is applied
  constraints:
    minReplicas: 3
    maxReplicas: 60
    containers:
      - name: "*"
        controlledResources:
          - cpu                   # opts CPU into vertical rightsizing
          - memory
        controlledValues: RequestsAndLimits
  objectives:
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

Cette fonctionnalité nécessite Datadog Cluster Agent 7.78.0+. Sur les versions antérieures, le champ `controlledResources` est accepté par le CRD mais n'a aucun effet.

## Supprimez les limites de CPU avec le mode burstable {#remove-cpu-limits-with-burstable-mode}

Les recommandations de limite de CPU sont dérivées des percentiles d'utilisation soutenue sur une fenêtre de plusieurs jours. Un court pic de montée en charge (par exemple, lors du démarrage de la JVM) a peu d'effet sur ces percentiles, de sorte que la limite de CPU recommandée peut être trop basse et entraîner la limitation de l'application au mauvais moment. La mémoire n'est pas affectée de la même manière car l'utilisation maximale de la mémoire fournit un plafond fiable.

Le mode burstable **supprime entièrement les limites de CPU** tout en appliquant les recommandations de _requête_ de CPU :

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-java-app
  namespace: my-namespace
spec:
  owner: Local
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-java-app
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto
  options:
    burstable: true
```

Si `options.burstable` n'est pas défini, la valeur par défaut à l'échelle du cluster de l'Agent de cluster s'applique. Définissez-le explicitement sur `false` pour exclure une seule charge de travail du comportement par défaut.

Effet sur le pod :

| | Avant | Après |
|---|---|---|
| Demande de CPU | `1` | `400m` (recommandation) |
| Limite de CPU | `2` | **supprimée** |
| Demande de mémoire | `500Mi` | `450Mi` (recommandation) |
| Limite de mémoire | `2Gi` | `2Gi`, préservée |

Avant de l'activer :

- Les pods qui étaient en QoS **Guaranteed** deviennent en QoS **Burstable**. Cela modifie leur priorité d'éviction en cas de pression sur le nœud.
- Sans limite de CPU, un conteneur peut consommer le CPU disponible du nœud. Les parts de CPU du noyau s'appliquent toujours.
- Le mode burstable **a priorité sur** `controlledValues` pour les limites de CPU. Si les deux sont définis, le mode burstable l'emporte.

## Ajustez l'augmentation de mémoire OOMKill {#tune-the-oomkill-memory-bump}

Après un OOMKill, la limite de mémoire est augmentée de 20 % par rapport à la limite en vigueur à ce moment-là. L'augmentation est appliquée immédiatement et répétée après chaque OOMKill ultérieur jusqu'à ce que la charge de travail se stabilise.

Pour modifier le ratio :

```yaml
spec:
  options:
    outOfMemory:
      bumpUpRatio: "1.5"      # 1.2 = +20% (default), 1.5 = +50%
```

Mettez la valeur entre guillemets : il s'agit d'une quantité Kubernetes, pas d'un nombre à virgule flottante.

**Quand l'augmenter.** Augmentez le ratio pour les charges de travail dont l'utilisation de la mémoire peut atteindre des pics nettement supérieurs aux pics précédents. Une augmentation plus importante permet d'atteindre plus rapidement la limite de mémoire appropriée et évite plusieurs augmentations successives avant que la charge de travail ne se stabilise. Lorsque vous l'augmentez, définissez également un seuil minimal de mémoire `minAllowed` (voir [Définir des limites par conteneur](#set-per-container-bounds)) afin que la limite ne puisse pas retomber en dessous d'une valeur sûre entre les cycles de recommandation.

## Dimensionnez uniquement les demandes {#right-size-requests-only}

Si vous avez délibérément ajusté les limites (pour la marge de manœuvre en rafale, une exigence de plateforme ou une garantie QoS) et que vous souhaitez que Datadog dimensionne uniquement les **demandes**, utilisez `controlledValues: RequestsOnly`.

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        controlledResources: [cpu, memory]
        controlledValues: RequestsOnly     # limits are not right-sized
```

| `controlledValues` | Requêtes | Limites |
|---|---|---|
| `RequestsAndLimits` (par défaut) | recommandé | recommandé |
| `RequestsOnly` | recommandé | non ajusté, **sauf** lorsqu'une limite doit être déplacée pour maintenir la validité de la spécification du pod (voir ci-dessous) |

Interactions à connaître :

- Sur un conteneur où `request == limit`, réduire la requête rompt la classe de QoS Garantie. Si vous avez besoin de la classe Garantie, conservez `RequestsAndLimits` ; le recommender gère explicitement les conteneurs `request == limit`.
- Le mode burstable remplace cela pour les limites CPU (voir [Supprimer les limites CPU avec le mode burstable](#remove-cpu-limits-with-burstable-mode)).
- **La gestion des OOMKill ajuste toujours la limite de mémoire.** `RequestsOnly` ne supprime pas l'augmentation de la mémoire. Après un OOMKill, la limite de mémoire est augmentée, et la requête est potentiellement augmentée avec elle (Kubernetes rejette tout pod dont la requête dépasse sa limite). Lisez `RequestsOnly` comme « les limites ne sont pas _ajustées_ », et non « les limites ne sont jamais modifiées ». Voir [Ajuster l'augmentation de la mémoire en cas d'OOMKill](#tune-the-oomkill-memory-bump).

Choisir une combinaison :

| Objectif | Configuration |
|---|---|
| Ajuster tout | `controlledResources: [cpu, memory]` + `controlledValues: RequestsAndLimits` |
| Ajuster les requêtes, laisser les limites telles quelles | `controlledValues: RequestsOnly` |
| Ajuster la mémoire uniquement, ne pas toucher au CPU | `controlledResources: [memory]` |
| Ajuster les requêtes CPU, aucune limite CPU du tout | `options.burstable: true` |
| Ne pas toucher du tout à un conteneur | `enabled: false` |

## Définir les limites par conteneur {#set-per-container-bounds}

`minAllowed` et `maxAllowed` contraignent les demandes de ressources que le recommender peut produire. Ils sont recommandés pour les charges de travail sensibles à la latence. Ils sont également recommandés lorsque vous modifiez le taux d'augmentation OOM (voir [Ajuster l'augmentation de la mémoire OOMKill](#tune-the-oomkill-memory-bump)) pour éviter que les demandes de mémoire ne tombent en dessous d'un minimum sûr entre les cycles de recommandation.

```yaml
spec:
  constraints:
    minReplicas: 2
    maxReplicas: 100
    containers:
      - name: api
        enabled: true
        minAllowed:
          cpu: "1"
          memory: 1Gi
        maxAllowed:
          cpu: "4"
          memory: 5Gi
      - name: worker
        enabled: true          # no bounds - recommendations are unconstrained
```

## Exclure un conteneur {#exclude-a-container}

Vous pouvez exclure un conteneur des recommandations verticales, du signal horizontal, ou les deux.

### Exclure un conteneur des recommandations verticales {#exclude-a-container-from-vertical-recommendations}

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        enabled: true
      - name: istio-proxy
        enabled: false          # resources for this container are never modified
```

Vous pouvez spécifier explicitement la configuration équivalente :

```yaml
      - name: istio-proxy
        controlledResources: []   # empty list is equivalent to enabled: false
```

Un modèle courant consiste à mettre à l'échelle automatique tout, sauf un sidecar connu :

```yaml
spec:
  constraints:
    containers:
      - name: "*"
        enabled: true
        controlledResources: [cpu, memory]
      - name: istio-proxy
        enabled: false
```

**Comment `"*"` et les entrées nommées se combinent :** l'entrée `"*"` s'applique à chaque conteneur qui **n'**a pas d'entrée nommée. Un conteneur avec sa propre entrée nommée utilise uniquement les paramètres déclarés sous ce nom. Les deux **ne sont pas fusionnés**, donc le caractère générique ne lui apporte rien.

Dans l'exemple ci-dessus, `istio-proxy` est régi uniquement par `enabled: false` et n'hérite pas de `controlledResources` du caractère générique. Tous les autres conteneurs du pod utilisent l'entrée générique.

**Remarque** : Si vous ajoutez une entrée nommée uniquement pour définir une limite, répétez tous les paramètres génériques que vous souhaitez conserver. Dans l'exemple ci-dessous, `my-app` revient à la valeur par défaut `RequestsAndLimits` plutôt qu'à `RequestsOnly` définie sur le caractère générique :

```yaml
      - name: "*"
        controlledValues: RequestsOnly
      - name: my-app
        maxAllowed:
          memory: 8Gi          # controlledValues is NOT inherited - repeat it if you want it
```

### Exclure un conteneur du signal horizontal {#exclude-a-container-from-the-horizontal-signal}

`enabled: false` régit uniquement le comportement _vertical_. L'objectif horizontal est choisi séparément, et c'est là que les sidecars faussent le plus souvent les décisions de mise à l'échelle :

```yaml
  objectives:
    # Recommended: scale on the application container's CPU
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

La configuration au niveau du pod suivante peut produire des résultats trompeurs lorsque des sidecars sont présents :

```yaml
  objectives:
    # Risky when sidecars are present: pod-level utilization is diluted by
    # sidecar requests, so a busy application container can appear idle.
    - type: PodResource
      podResource:
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

**Recommandation** : Si le pod possède un sidecar, utilisez `ContainerResource` ciblé sur le conteneur principal. Réservez `PodResource` aux pods à conteneur unique.

## Configurer les sidecars {#configure-sidecars}

### Sidecars ordinaires (`spec.containers`) {#ordinary-sidecars-speccontainers}

Rien de spécial n'est requis. Ils peuvent être limités, exclus ou ciblés comme n'importe quel autre conteneur ; voir [Exclure un conteneur](#exclude-a-container).


### Sidecars natifs (`spec.initContainers` avec `restartPolicy: Always`) {#native-sidecars-specinitcontainers-with-restartpolicy-always}

Kubernetes 1.29+ prend en charge les sidecars à exécution longue déclarés dans `initContainers` avec `restartPolicy: Always`, connus sous le nom de modèle [sidecar natif][4]. Un sidecar natif s'exécute pendant toute la durée de vie du pod.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      initContainers:
        - name: log-shipper
          image: log-shipper:1.2
          restartPolicy: Always      # this is what makes it a native sidecar
          resources:
            requests: {cpu: 100m, memory: 128Mi}
            limits:   {memory: 256Mi}
      containers:
        - name: my-app
          image: my-app:4.5
          resources:
            requests: {cpu: "1", memory: 2Gi}
            limits:   {cpu: "2", memory: 4Gi}
```

**Les sidecars natifs sont entièrement pris en charge.** Ils sont traités comme des conteneurs ordinaires : des recommandations sont générées et appliquées pour eux, et ils apparaissent dans la liste des conteneurs de la charge de travail où ils peuvent être configurés ou exclus. Référencez-les dans `constraints.containers[]` par **nom**, exactement comme n'importe quel autre conteneur. Il n'y a pas de bloc `initContainers` distinct dans la spécification DPA, et une entrée `"*"` les couvre également.

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        controlledResources: [cpu, memory]
        controlledValues: RequestsAndLimits
      - name: log-shipper        # native sidecar, referenced by name
        enabled: false
```

Points à noter :

- `restartPolicy: Always` est ce qui les distingue. Les conteneurs d'initialisation ordinaires (ceux qui s'exécutent jusqu'à leur terme avant le démarrage de l'application) ne sont pas des sidecars natifs et ne sont pas gérés par un DPA.
- **Les chiffres relatifs aux coûts et aux économies peuvent sous-estimer les sidecars natifs.** Leurs demandes de ressources sont rapportées sous une agrégation distincte, de sorte que les chiffres de coût affichés pour une charge de travail avec des sidecars natifs peuvent sembler incohérents avec son utilisation observée. Il s'agit d'une limitation connue qui affecte uniquement l'affichage des coûts ; les recommandations ne sont pas affectées.
- **Les sidecars injectés** (tels que ceux d'Istio) sont ajoutés par un webhook d'admission mutant au niveau du pod et n'apparaissent jamais dans le manifeste du déploiement. Ils sont toujours récupérés, car la liste des conteneurs est réconciliée à partir des pods en cours d'exécution plutôt que du seul manifeste de charge de travail.
- **Ne pas exclure les conteneurs mis à l'échelle automatiquement de la collecte par l'Agent.** Un `DatadogPodAutoscaler` s'appuie sur les métriques que l'Agent collecte pour les conteneurs qu'il gère. Si un conteneur dans une charge de travail mise à l'échelle automatiquement est filtré par la configuration de découverte de conteneurs de l'Agent, aucune métrique n'existe pour lui et il ne peut pas être redimensionné correctement. Confirmez qu'aucun conteneur dans une charge de travail mise à l'échelle automatiquement n'est exclu de la collecte. Pour savoir comment fonctionnent les règles d'inclusion et d'exclusion, consultez [Gestion de la découverte de conteneurs][7].

## Options de manifeste supplémentaires {#additional-manifest-options}

### Mode aperçu (simulation) {#preview-dry-run-mode}

```yaml
spec:
  applyPolicy:
    mode: Preview     # recommendations are computed and visible in .status, but nothing is applied
```

Utile comme interrupteur d'arrêt temporaire. Si une configuration horizontale est invalide, le redimensionnement vertical continue de s'exécuter ; définir `mode: Preview` gèle les deux pendant que vous la corrigez.

### Désactiver une direction de mise à l'échelle {#disable-one-scaling-direction}

```yaml
spec:
  applyPolicy:
    scaleUp:
      strategy: Max
    scaleDown:
      strategy: Disabled     # never scale down
    update:
      strategy: Auto
```

Pour une mise à l'échelle uniquement verticale, omettez `objectives` et définissez `update.strategy: Auto`, comme dans le tableau [Choisir un mode de mise à l'échelle](#choose-a-scaling-mode). Sans `objectives`, la mise à l'échelle horizontale n'a aucune cible sur laquelle agir, vous n'avez donc pas non plus besoin de définir `scaleUp` et `scaleDown` sur `Disabled`.

### Calendrier de déploiement vertical {#vertical-rollout-timing}

Le contrôleur applique un changement vertical par la voie la moins perturbatrice disponible et escalade si cette voie est bloquée. Deux champs contrôlent la durée d'attente à chaque étape :

```yaml
spec:
  applyPolicy:
    update:
      strategy: Auto
      resizePendingPeriod: 600      # 1..3600 seconds
      rolloutFallbackDelay: 900     # 1..3600 seconds
```

| Champ | Contrôle |
|---|---|
| `resizePendingPeriod` | Durée d'attente avant d'évincer un pod lorsque le kubelet signale le redimensionnement comme étant en attente (accepté mais ne progressant pas, souvent parce que le nœud manque de marge de manœuvre) |
| `rolloutFallbackDelay` | Durée d'attente avant de revenir à un déploiement complet lorsque les évictions sont bloquées, généralement par un PodDisruptionBudget |

Les deux sont facultatifs et acceptent de 1 à 3600 secondes. Les laisser non définis utilise les valeurs par défaut intégrées du contrôleur.

- **Augmentez** `resizePendingPeriod` lorsque l'éviction est coûteuse (préchauffage long, caches volumineux, vidage lent). Vous échangez une période plus longue à l'ancienne taille contre moins de redémarrages.
- **Augmentez** `rolloutFallbackDelay` sur les charges de travail avec un PodDisruptionBudget serré, afin qu'une contrainte budgétaire temporaire ne se transforme pas immédiatement en un déploiement complet.
- **Réduisez l'un ou l'autre** lorsque les redémarrages sont peu coûteux et que vous souhaitez que les recommandations prennent effet plus rapidement.

Ceux-ci contrôlent _comment_ un changement est effectué, et non _si_ il se produit. Pour arrêter complètement les changements, utilisez `update.strategy: Disabled` ou `applyPolicy.mode: Preview`. Ces champs s'appliquent à la [mise à l'échelle verticale sur place][3] ; consultez la vue d'ensemble pour l'activation au niveau du cluster et les exigences Kubernetes.

### Réglage de secours local {#local-fallback-tuning}

```yaml
spec:
  fallback:
    horizontal:
      enabled: true
      direction: ScaleUp          # default; use All to allow fallback scale-in as well
      triggers:
        staleRecommendationThresholdSeconds: 600    # 100..3600
```

Les recommandations de secours sont calculées au sein du cluster à partir des métriques collectées par l'Agent, de sorte que la mise à l'échelle se poursuit si Datadog ne peut pas fournir de recommandation dans le délai imparti.

Cette fonctionnalité nécessite également une configuration côté cluster sur le Cluster Agent et sur les Agents de nœud. Consultez [Kubernetes Autoscaling][2] ou contactez le [support Datadog][6].

### Objectifs en valeur absolue {#absolute-value-objectives}

Au lieu d'un pourcentage d'utilisation, ciblez une valeur absolue :

```yaml
  objectives:
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: AbsoluteValue
          absoluteValue: "1.5"     # target cores per pod
```

### Objectifs de requête personnalisée {#custom-query-objectives}

Mettez à l'échelle sur n'importe quelle métrique Datadog plutôt que sur le CPU ou la mémoire :

```yaml
  objectives:
    - type: CustomQuery
      customQuery:
        window: 5m
        request:
          queries:
            - name: a
              source: Metrics
              metrics:
                query: "avg:my.queue.depth{service:my-app}"
        value:
          type: AbsoluteValue
          absoluteValue: "100"
```

`source` peut également être `ApmMetrics`, avec des champs tels que `service`, `resourceName`, `operationName` et `stat`.

Les requêtes personnalisées sont prises en charge pour **la mise à l'échelle horizontale uniquement**. La combinaison d'une requête personnalisée avec une mise à l'échelle verticale **n'est pas prise en charge**, car l'autoscaler ne peut pas déduire sur quelle dimension une requête arbitraire doit agir.

### Taguez la télémétrie d'un DPA {#tag-a-dpas-telemetry}

```yaml
metadata:
  annotations:
    ad.datadoghq.com/tags: '{"team": "my-team", "tier": "critical"}'
```

Ceci ajoute les tags à la télémétrie d'autoscaling émise pour ce DPA. Pour la liste des métriques émises par le Cluster Agent, consultez l'[intégration Datadog Cluster Agent][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/scaling/workload
[2]: /fr/containers/autoscaling/
[3]: /fr/containers/autoscaling/#in-place-vertical-scaling
[4]: https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/
[5]: /fr/integrations/datadog-cluster-agent/#metrics
[6]: /fr/help/
[7]: /fr/containers/guide/container-discovery-management/
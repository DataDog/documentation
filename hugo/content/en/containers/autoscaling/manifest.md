---
title: DatadogPodAutoscaler manifest reference
description: Configure DatadogPodAutoscaler custom resources in YAML to access options that the Datadog UI does not expose.
further_reading:
- link: "/containers/autoscaling/"
  tag: "Documentation"
  text: "Kubernetes Autoscaling"
- link: "/containers/guide/manage-datadogpodautoscaler-with-argocd/"
  tag: "Documentation"
  text: "Manage DatadogPodAutoscaler with ArgoCD"
- link: "/containers/guide/manage-datdadogpodautoscaler-with-terraform/"
  tag: "Documentation"
  text: "Manage DatadogPodAutoscaler with Terraform"
---

The `DatadogPodAutoscaler` (DPA) custom resource defines autoscaling behavior for a single Kubernetes workload. The [Autoscaling UI][1] with {{< ui >}}Export Recommendation{{< /ui >}} is a good place to start: configure a workload, then copy the generated manifest. Editing the manifest directly gives you access to every field in the custom resource definition (CRD) and makes the DPA a normal part of your GitOps workflow, where the manifest is the reviewed, versioned source of truth.

This page covers the configuration options available in the manifest. Examples on this page use API version `datadoghq.com/v1alpha2`.

For setup and prerequisites, see [Kubernetes Autoscaling][2]. That page covers enabling Workload Autoscaling and the Admission Controller on the Datadog Cluster Agent, required Agent versions, and enabling [in-place vertical scaling][3].

## Anatomy of a manifest

The following annotated skeleton shows the structure of a `DatadogPodAutoscaler`. Every field is optional except `targetRef`.

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

### Supported target workloads

| `targetRef.kind` | `apiVersion` | Status |
|---|---|---|
| `Deployment` | `apps/v1` | Supported |
| `Rollout` (Argo Rollouts) | `argoproj.io/v1alpha1` | Supported |
| `StatefulSet` | `apps/v1` | Supported |

For an Argo Rollout, point `targetRef` at the Rollout itself rather than at any Deployment it manages:

```yaml
  targetRef:
    apiVersion: argoproj.io/v1alpha1
    kind: Rollout
    name: my-app
```

### Choose a scaling mode

The combination of `objectives` and `applyPolicy.update.strategy` determines whether a DPA scales horizontally, vertically, or both:

| `objectives` set | `applyPolicy.update.strategy` | Resulting mode |
|---|---|---|
| yes | `Disabled` (or unset) | Horizontal only |
| no | `Auto` | Vertical only |
| yes | `Auto` | Multidimensional (both) |

## Container constraints

Most vertical options are expressed through `spec.constraints.containers[]`:

| Field | Type | Default | Meaning |
|---|---|---|---|
| `name` | string, **required** | - | Container name, or `"*"` to match every container that has no entry of its own (see [Exclude a container](#exclude-a-container)) |
| `enabled` | bool | `true` | `false` disables resource autoscaling for this container |
| `controlledResources` | list of `cpu`, `memory` | `[cpu, memory]` | Which resources receive vertical recommendations. An empty list is equivalent to `enabled: false` |
| `controlledValues` | enum | `RequestsAndLimits` | Whether recommendations write both requests _and_ limits, or requests only |
| `minAllowed` | resource map | - | Lower bound for the container's requests |
| `maxAllowed` | resource map | - | Upper bound for the container's requests |

If `constraints.containers` is omitted entirely, resource scaling is enabled for **all** containers, with no bounds.

## Right-size CPU and memory

When a DPA combines horizontal scaling (`objectives`) with vertical scaling (`update.strategy: Auto`), the default behavior is to produce vertical recommendations for **memory only**. CPU requests and limits are left untouched, and the `VerticalAbleToRecommend` condition may show as `Unknown`.

If a DPA right-sizes memory while leaving CPU unchanged, this is the reason. It is not related to Quality of Service (QoS) class preservation.

Use `controlledResources` to declare which resources receive vertical recommendations:

| `controlledResources` | Vertical recommendations produced |
|---|---|
| unset | memory only (default) |
| `[memory]` | memory only, same as unset |
| `[cpu, memory]` | **memory and CPU** |
| `[cpu]` | CPU only |

Full example:

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

This feature requires Datadog Cluster Agent 7.78.0+. On older versions, the `controlledResources` field is accepted by the CRD but has no effect.

## Remove CPU limits with burstable mode

CPU limit recommendations are derived from sustained usage percentiles over a multi-day window. A short warm-up spike (for example, during JVM startup) has little effect on those percentiles, so the recommended CPU limit can be too low and cause the application to be throttled at the wrong moment. Memory is not affected in the same way because peak memory usage provides a reliable ceiling.

Burstable mode **removes CPU limits entirely** while still applying CPU _request_ recommendations:

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

If `options.burstable` is left unset, the Cluster Agent's cluster-wide default applies. Set it explicitly to `false` to opt a single workload out of the default behavior.

Effect on the pod:

| | Before | After |
|---|---|---|
| CPU request | `1` | `400m` (recommendation) |
| CPU limit | `2` | **removed** |
| Memory request | `500Mi` | `450Mi` (recommendation) |
| Memory limit | `2Gi` | `2Gi`, preserved |

Before enabling it:

- Pods that were **Guaranteed** QoS become **Burstable** QoS. This changes their eviction priority under node pressure.
- Without a CPU limit, a container can consume available node CPU. Kernel CPU shares still apply.
- Burstable mode **takes precedence over** `controlledValues` for CPU limits. If both are set, burstable wins.

## Tune the OOMKill memory bump

After an OOMKill, the memory limit is raised by 20% relative to the limit in force at the time. The increase is applied immediately and repeated after each subsequent OOMKill until the workload stabilizes.

To change the ratio:

```yaml
spec:
  options:
    outOfMemory:
      bumpUpRatio: "1.5"      # 1.2 = +20% (default), 1.5 = +50%
```

Quote the value: it is a Kubernetes quantity, not a floating-point number.

**When to raise it.** Raise the ratio for workloads whose memory usage can peak sharply above previous peaks. A larger bump reaches the right memory limit faster and avoids several successive bumps before the workload stabilizes. When you raise it, also set a `minAllowed` memory floor (see [Set per-container bounds](#set-per-container-bounds)) so the limit cannot fall back below a safe value between recommendation cycles.

## Right-size requests only

If you have deliberately tuned limits (for burst headroom, a platform requirement, or a QoS guarantee) and want Datadog to right-size only **requests**, use `controlledValues: RequestsOnly`.

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        controlledResources: [cpu, memory]
        controlledValues: RequestsOnly     # limits are not right-sized
```

| `controlledValues` | Requests | Limits |
|---|---|---|
| `RequestsAndLimits` (default) | recommended | recommended |
| `RequestsOnly` | recommended | not right-sized, **except** where a limit must move to keep the pod spec valid (see below) |

Interactions to be aware of:

- On a container where `request == limit`, lowering the request breaks the Guaranteed QoS class. If you need Guaranteed, keep `RequestsAndLimits`; the recommender handles `request == limit` containers explicitly.
- Burstable mode overrides this for CPU limits (see [Remove CPU limits with burstable mode](#remove-cpu-limits-with-burstable-mode)).
- **OOMKill handling still adjusts the memory limit.** `RequestsOnly` does not suppress the memory bump. After an OOMKill, the memory limit is raised, and the request is potentially raised with it (Kubernetes rejects any pod whose request exceeds its limit). Read `RequestsOnly` as "limits are not _right-sized_", not "limits are never modified". See [Tune the OOMKill memory bump](#tune-the-oomkill-memory-bump).

Choosing a combination:

| Goal | Configuration |
|---|---|
| Right-size everything | `controlledResources: [cpu, memory]` + `controlledValues: RequestsAndLimits` |
| Right-size requests, leave limits as written | `controlledValues: RequestsOnly` |
| Right-size memory only, leave CPU alone | `controlledResources: [memory]` |
| Right-size CPU requests, no CPU limit at all | `options.burstable: true` |
| Leave a container entirely alone | `enabled: false` |

## Set per-container bounds

`minAllowed` and `maxAllowed` constrain the resource requests that the recommender can produce. They are recommended for latency-sensitive workloads. They are also recommended when you change the OOM bump ratio (see [Tune the OOMKill memory bump](#tune-the-oomkill-memory-bump)) to prevent memory requests from falling below a safe minimum between recommendation cycles.

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

## Exclude a container

You can exclude a container from vertical recommendations, the horizontal signal, or both.

### Exclude a container from vertical recommendations

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        enabled: true
      - name: istio-proxy
        enabled: false          # resources for this container are never modified
```

You can also specify the equivalent configuration explicitly:

```yaml
      - name: istio-proxy
        controlledResources: []   # empty list is equivalent to enabled: false
```

A common pattern is to autoscale everything except a known sidecar:

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

**How `"*"` and named entries combine:** the `"*"` entry applies to every container that does **not** have a named entry. A container with its own named entry takes only the settings declared under that name. The two are **not merged**, so the wildcard contributes nothing to it.

In the example above, `istio-proxy` is governed solely by `enabled: false` and does not inherit `controlledResources` from the wildcard. Every other container in the pod uses the wildcard entry.

**Note**: If you add a named entry only to set a bound, repeat any wildcard settings you still want. In the example below, `my-app` falls back to the default `RequestsAndLimits` rather than the `RequestsOnly` set on the wildcard:

```yaml
      - name: "*"
        controlledValues: RequestsOnly
      - name: my-app
        maxAllowed:
          memory: 8Gi          # controlledValues is NOT inherited - repeat it if you want it
```

### Exclude a container from the horizontal signal

`enabled: false` governs _vertical_ behavior only. The horizontal objective is chosen separately, and this is where sidecars most often distort scaling decisions:

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

The following pod-level configuration can produce misleading results when sidecars are present:

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

**Recommendation**: If the pod has any sidecar, use `ContainerResource` scoped to the main container. Reserve `PodResource` for single-container pods.

## Configure sidecars

### Ordinary sidecars (`spec.containers`)

Nothing special is required. They can be bounded, excluded, or targeted like any other container; see [Exclude a container](#exclude-a-container).


### Native sidecars (`spec.initContainers` with `restartPolicy: Always`)

Kubernetes 1.29+ supports long-running sidecars declared in `initContainers` with `restartPolicy: Always`, known as the [native sidecar][4] pattern. A native sidecar runs for the pod's entire lifetime.

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

**Native sidecars are fully supported.** They are treated as ordinary containers: recommendations are produced and applied for them, and they appear in the workload's container list where they can be configured or excluded. Reference them in `constraints.containers[]` by **name**, exactly like any other container. There is no separate `initContainers` block in the DPA spec, and a `"*"` entry covers them too.

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

Points to be aware of:

- `restartPolicy: Always` is what distinguishes them. Ordinary init containers (those that run to completion before the application starts) are not native sidecars and are not managed by a DPA.
- **Cost and savings figures may under-count native sidecars.** Their resource requests are reported under a separate aggregation, so the cost figures shown for a workload with native sidecars can look inconsistent with its observed usage. This is a known limitation that affects the cost display only; recommendations are unaffected.
- **Injected sidecars** (such as Istio's) are added by a mutating admission webhook at pod level and never appear in the Deployment manifest. They are still picked up, because the container list is reconciled from running pods rather than from the workload manifest alone.
- **Do not exclude autoscaled containers from Agent collection.** A `DatadogPodAutoscaler` relies on the metrics the Agent collects for the containers it manages. If a container in an autoscaled workload is filtered out through the Agent's container discovery configuration, no metrics exist for it and it cannot be right-sized. Confirm that no container in an autoscaled workload is excluded from collection. For how inclusion and exclusion rules work, see [Container Discovery Management][7].

## Additional manifest options

### Preview (dry-run) mode

```yaml
spec:
  applyPolicy:
    mode: Preview     # recommendations are computed and visible in .status, but nothing is applied
```

Useful as a temporary stop switch. If a horizontal configuration is invalid, vertical rightsizing continues to run; setting `mode: Preview` freezes both while you correct it.

### Disable one scaling direction

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

For vertical-only scaling, omit `objectives` and set `update.strategy: Auto`, as in the [Choose a scaling mode](#choose-a-scaling-mode) table. With no `objectives`, horizontal scaling has no target to act on, so you do not also need to set `scaleUp` and `scaleDown` to `Disabled`.

### Vertical rollout timing

The controller applies a vertical change by the least disruptive route available and escalates if that route stalls. Two fields control how long it waits at each step:

```yaml
spec:
  applyPolicy:
    update:
      strategy: Auto
      resizePendingPeriod: 600      # 1..3600 seconds
      rolloutFallbackDelay: 900     # 1..3600 seconds
```

| Field | Controls |
|---|---|
| `resizePendingPeriod` | How long to wait before evicting a pod when the kubelet reports the resize as pending (accepted but not progressing, often because the node lacks headroom) |
| `rolloutFallbackDelay` | How long to wait before falling back to a full rollout when evictions are blocked, typically by a PodDisruptionBudget |

Both are optional and accept 1 to 3600 seconds. Leaving them unset uses the controller's built-in defaults.

- **Raise** `resizePendingPeriod` where eviction is expensive (long warm-up, large caches, slow drain). You trade a longer period at the old size for fewer restarts.
- **Raise** `rolloutFallbackDelay` on workloads with a tight PodDisruptionBudget, so a temporary budget constraint does not immediately escalate to a full rollout.
- **Lower either** where restarts are cheap and you want recommendations to take effect faster.

These control _how_ a change is delivered, not _whether_ one happens. To stop changes entirely, use `update.strategy: Disabled` or `applyPolicy.mode: Preview`. These fields apply to [in-place vertical scaling][3]; see the overview for cluster-level enablement and Kubernetes requirements.

### Local fallback tuning

```yaml
spec:
  fallback:
    horizontal:
      enabled: true
      direction: ScaleUp          # default; use All to allow fallback scale-in as well
      triggers:
        staleRecommendationThresholdSeconds: 600    # 100..3600
```

Fallback recommendations are computed inside the cluster from Agent-collected metrics, so scaling continues if Datadog cannot deliver a recommendation within the threshold.

This feature also requires cluster-side configuration on both the Cluster Agent and the node Agents. See [Kubernetes Autoscaling][2] or contact [Datadog Support][6].

### Absolute-value objectives

Instead of a utilization percentage, target an absolute value:

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

### Custom query objectives

Scale on any Datadog metric rather than CPU or memory:

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

`source` may also be `ApmMetrics`, with fields such as `service`, `resourceName`, `operationName`, and `stat`.

Custom queries are supported for **horizontal scaling only**. Combining a custom query with vertical scaling is **not supported**, because the autoscaler cannot infer which dimension an arbitrary query should act on.

### Tag a DPA's telemetry

```yaml
metadata:
  annotations:
    ad.datadoghq.com/tags: '{"team": "my-team", "tier": "critical"}'
```

This adds the tags to the autoscaling telemetry emitted for this DPA. For the list of metrics the Cluster Agent emits, see the [Datadog Cluster Agent integration][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/scaling/workload
[2]: /containers/autoscaling/
[3]: /containers/autoscaling/#in-place-vertical-scaling
[4]: https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/
[5]: /integrations/datadog-cluster-agent/#metrics
[6]: /help/
[7]: /containers/guide/container-discovery-management/

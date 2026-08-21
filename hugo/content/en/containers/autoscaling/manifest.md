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

This page covers the configuration options available in the manifest. It uses API version `datadoghq.com/v1alpha2`.

For setup and prerequisites, see [Kubernetes Autoscaling][2]. That page covers enabling Workload Autoscaling and the Admission Controller on the Datadog Cluster Agent, required Agent versions, and enabling [in-place vertical scaling][3].

**Feature status labels:** features on this page are generally available unless marked **Preview**, **Beta**, or **Experimental**. Preview and Beta features are available and supported, but their field names and behavior may still change. Experimental features are available but not recommended for production without contacting [Datadog Support][9] first.

## Anatomy of a manifest

The following annotated skeleton shows the structure of a `DatadogPodAutoscaler`. Every field is optional except `targetRef`.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-app                      # conventionally the workload name
  namespace: my-namespace           # must match the target workload
  annotations:
    ad.datadoghq.com/tags: '{"team": "my-team"}'   # optional: tags on this DPA's telemetry
spec:
  owner: Local                      # Local = this manifest is the source of truth (use for GitOps)
                                    # Remote = created and managed from the Datadog UI

  targetRef:                        # the workload being autoscaled - one DPA per workload
    apiVersion: apps/v1
    kind: Deployment
    name: my-app

  applyPolicy:
    mode: Apply                     # Apply | Preview (Preview = compute recommendations, change nothing)

    scaleUp:                        # horizontal, upward
      strategy: Max                 # Max | Min | Disabled
      stabilizationWindowSeconds: 600
      rules:
        - type: Percent             # Percent | Pods
          value: 50
          periodSeconds: 120        # 1..3600

    scaleDown:                      # horizontal, downward
      strategy: Max
      stabilizationWindowSeconds: 600
      rules:
        - type: Percent
          value: 10
          periodSeconds: 1800

    update:                         # vertical
      strategy: Auto                # Auto | Disabled | TriggerRollout
      # resizePendingPeriod: 600    # see Vertical rollout timing
      # rolloutFallbackDelay: 900   # see Vertical rollout timing

  constraints:
    minReplicas: 3
    maxReplicas: 100
    containers:                     # per-container vertical configuration
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

  objectives:                       # HORIZONTAL only. Exactly one entry.
    - type: ContainerResource       # PodResource | ContainerResource | CustomQuery
      containerResource:
        container: my-app
        name: cpu                   # cpu | memory
        value:
          type: Utilization         # Utilization | AbsoluteValue
          utilization: 65

  fallback:                         # in-cluster horizontal fallback if recommendations go stale
    horizontal:
      enabled: true
      direction: ScaleUp            # ScaleUp | ScaleDown | All (default ScaleUp)
      triggers:
        staleRecommendationThresholdSeconds: 600   # 100..3600, default 600

  options:
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
| `name` | string, **required** | N/A | Container name, or `"*"` to match every container that has no entry of its own (see [Exclude a container](#exclude-a-container)) |
| `enabled` | bool | `true` | `false` disables resource autoscaling for this container |
| `controlledResources` | list of `cpu`, `memory` | `[cpu, memory]` | Which resources receive vertical recommendations. An empty list is equivalent to `enabled: false` |
| `controlledValues` | enum | `RequestsAndLimits` | Whether recommendations write both requests _and_ limits, or requests only |
| `minAllowed` | resource map | None | Lower bound for the container's requests |
| `maxAllowed` | resource map | None | Upper bound for the container's requests |

If `constraints.containers` is omitted entirely, resource scaling is enabled for **all** containers, with no bounds.

## Right-size CPU and memory

**Status: Preview.**

When a DPA combines horizontal scaling (`objectives`) with vertical scaling (`update.strategy: Auto`), the default behavior is to produce vertical recommendations for **memory only**. CPU requests and limits are left untouched, and the `VerticalAbleToRecommend` condition may show as `Unknown`.

If you have seen a DPA right-size memory while leaving CPU unchanged, this is the reason. It is not related to Quality of Service (QoS) class preservation.

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

This requires a recent Agent version; see the requirements in [Kubernetes Autoscaling][2]. On older Agents, the field is accepted by the CRD but has no effect.

## Remove CPU limits with burstable mode

**Status: Beta.**

CPU limit recommendations are derived from sustained usage percentiles over a multi-day window. A short warm-up spike (a JVM starting up, for example) is statistically invisible in that window, so the recommended CPU limit can land too low and the application is throttled at the wrong moment. Memory is not affected in the same way, because peak memory usage gives a reliable ceiling.

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

If `options.burstable` is left unset, the Cluster Agent's cluster-wide default applies. Set it explicitly to `false` to opt a single workload out of that default.

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

### Apply burstable mode to many workloads

To onboard a whole category of workloads (every JVM service, for example), set the option in a `DatadogPodAutoscalerClusterProfile` template. It propagates to every DPA the profile generates, and removing it propagates the removal. For more information about profiles, see [Cluster profiles][4].

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscalerClusterProfile
metadata:
  name: java-burstable
spec:
  template:
    options:
      burstable: true
    applyPolicy:
      mode: Apply
      update:
        strategy: Auto
    constraints:
      minReplicas: 2
      maxReplicas: 25
      containers:
        - name: "*"
          enabled: true
    objectives:
      - type: PodResource
        podResource:
          name: cpu
          value:
            type: Utilization
            utilization: 80
```

Then label the workloads that use it:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-service
  namespace: production
  labels:
    autoscaling.datadoghq.com/profile: java-burstable
```

To verify, run `kubectl -n production get dpa -o yaml` and confirm the generated DPA carries `spec.options.burstable: true`.

## Tune the OOMKill memory bump

After an OOMKill, the memory limit is raised by **20%** relative to the limit in force at the time. The bump is applied immediately and re-applied on each subsequent OOMKill until the workload stabilizes. This is a self-correcting ratchet rather than a one-time adjustment.

To change the ratio:

```yaml
spec:
  options:
    outOfMemory:
      bumpUpRatio: "1.5"      # 1.2 = +20% (default), 1.5 = +50%
```

Quote the value: it is a Kubernetes quantity, not a floating-point number.

**When to raise it.** If a container runs out of memory very fast (roughly **under 30 seconds**), the Agent may not capture the memory peak before the restart, so recommendations cannot ratchet upward and the crash loop persists.

If you hit that situation:

1. Confirm the OOM check is enabled on the Agent.
2. Raise `bumpUpRatio`.
3. Set a `minAllowed` memory floor (see [Set per-container bounds](#set-per-container-bounds)) so the limit cannot fall back below a safe value between recommendation cycles.

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
- **OOMKill handling still adjusts the memory limit.** `RequestsOnly` does not suppress the memory bump, and cannot: Kubernetes rejects a container whose request exceeds its limit, so raising the request without raising the limit would produce an invalid pod. Read `RequestsOnly` as "limits are not _right-sized_", not "limits are never modified". See [Tune the OOMKill memory bump](#tune-the-oomkill-memory-bump).

Choosing a combination:

| Goal | Configuration |
|---|---|
| Right-size everything | `controlledResources: [cpu, memory]` + `controlledValues: RequestsAndLimits` |
| Right-size requests, leave limits as written | `controlledValues: RequestsOnly` |
| Right-size memory only, leave CPU alone | `controlledResources: [memory]` |
| Right-size CPU requests, no CPU limit at all | `options.burstable: true` |
| Leave a container entirely alone | `enabled: false` |

## Set per-container bounds

`minAllowed` and `maxAllowed` are guard-rails on the requests the recommender may produce. They are recommended for latency-sensitive workloads, and advisable whenever you change the OOM bump ratio (see [Tune the OOMKill memory bump](#tune-the-oomkill-memory-bump)), so memory cannot drift below a safe floor between recommendation cycles.

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

There are two distinct things you may want to exclude a container from.

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

Equivalent, if you prefer to be explicit:

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

**Note**: if you add a named entry only to set a bound, repeat any wildcard settings you still want. In the example below, `my-app` falls back to the default `RequestsAndLimits` rather than the `RequestsOnly` set on the wildcard:

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

compared with:

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

**Rule of thumb:** if the pod has any sidecar, use `ContainerResource` scoped to the main container. Reserve `PodResource` for genuinely single-container pods.

## Configure sidecars

### Ordinary sidecars (`spec.containers`)

Nothing special is required. They appear as containers and can be bounded, excluded, or targeted like any other; see [Exclude a container](#exclude-a-container).

### Native sidecars (`spec.initContainers` with `restartPolicy: Always`)

Kubernetes 1.29+ allows a long-running sidecar to be declared in `initContainers` with `restartPolicy: Always`, the [native sidecar][7] pattern. It runs for the pod's whole lifetime but lives in a different field of the pod spec:

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
- **Agent-level container exclusions take precedence.** If a sidecar is filtered out of collection on the Agent, no metrics exist for it and no recommendation can be produced. Recommendations for the rest of the pod are unaffected, but that container is reported as missing data.

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
      strategy: Disabled     # never scale in
    update:
      strategy: Auto
```

For vertical-only scaling, set both horizontal strategies to `Disabled`, set `update.strategy: Auto`, and omit `objectives`.

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

This feature also requires cluster-side configuration on both the Cluster Agent and the node Agents. See [Kubernetes Autoscaling][2] or contact [Datadog Support][9].

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

Custom queries are supported for **horizontal-only** scaling. Combining a custom query **with vertical scaling is experimental**, because the autoscaler cannot infer which dimension an arbitrary query should act on. Contact [Datadog Support][9] before relying on it.

### Tag a DPA's telemetry

```yaml
metadata:
  annotations:
    ad.datadoghq.com/tags: '{"team": "my-team", "tier": "critical"}'
```

This adds the tags to the autoscaling telemetry emitted for this DPA.

## Troubleshooting

### `objectives length must be exactly 1, got 2`

```text
Invalid configuration: invalid horizontal policy: objectives length must be exactly 1, got 2
reason: RecommendationError
```

`objectives` configures **horizontal** scaling only and accepts exactly one entry. The CRD accepts multiple entries syntactically, but the controller does not run. The most common cause is trying to combine a CPU objective and a memory objective; choose one.

Two things worth knowing when this occurs:

- The single-objective limit applies to horizontal scaling only. Vertical rightsizing still covers CPU and memory independently.
- When the horizontal policy is invalid, vertical rightsizing **continues to run**. Set `applyPolicy.mode: Preview` if you want everything frozen while you fix the configuration.

### Nothing vertical is happening

Check that `applyPolicy.update.strategy` is set to `Auto`. Without it, no vertical recommendation is applied regardless of what `constraints.containers` says. Then confirm the Admission Controller is enabled; see [Kubernetes Autoscaling][2].

### Only memory is being right-sized

This is expected default behavior. See [Right-size CPU and memory](#right-size-cpu-and-memory).

### The DPA exists but `.status` stays empty

Workload Autoscaling is most likely not enabled on the Cluster Agent. See [Kubernetes Autoscaling][2].

### Deleting a DPA

- `spec.owner: Local` (created in-cluster): delete it from the cluster.
- Created from the Datadog UI (`spec.owner: Remote`): delete it from the UI. Deleting it in-cluster only causes it to be recreated.
- **Delete the DPA before deleting the target workload**, otherwise it is left orphaned and is harder to clean up.

### Multi-region deployments

A DPA has no cross-cluster awareness. Each cluster scales independently within the same `minReplicas` and `maxReplicas`. Clusters under different load diverge, which is expected.

### Manifest managers (Helm, Argo CD, Flux)

- Horizontal scaling writes `replicas` through the `scale` subresource (the equivalent of `kubectl scale`), which manifest managers tolerate well. Remove any static `replicas:` from your manifest after you switch to Apply mode.
- Vertical scaling can reach pods two ways. In-place resize and the admission controller's mutating webhook apply resources to pods without rewriting the workload manifest, so no drift is reported. Rollout-based vertical scaling updates the target Deployment or StatefulSet, which a GitOps tool can detect as drift. If you use Argo CD, configure it to ignore the fields the Cluster Agent owns; see [Manage DatadogPodAutoscaler with ArgoCD][5].

## Rollout checklist

1. Confirm the cluster prerequisites: Workload Autoscaling and the Admission Controller enabled on the Cluster Agent (see [Kubernetes Autoscaling][2]). Without this, the DPA applies cleanly and then does nothing.
2. Generate a baseline in the UI ({{< ui >}}Configure Recommendation{{< /ui >}} > {{< ui >}}Export Recommendation{{< /ui >}}).
3. Add the manifest options you need from this page.
4. Commit with `applyPolicy.mode: Preview`, leaving any existing HPA or VPA in place.
5. Watch the recommendations in the Autoscaling UI for at least one full traffic cycle.
6. Switch to `mode: Apply`, disable the previous autoscaler, and remove any static `replicas`.
7. If you use multidimensional scaling, confirm that both CPU and memory recommendations are being applied.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/scaling/workload
[2]: /containers/autoscaling/
[3]: /containers/autoscaling/#in-place-vertical-scaling
[4]: /containers/autoscaling/#cluster-profiles
[5]: /containers/guide/manage-datadogpodautoscaler-with-argocd/
[7]: https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/
[9]: /help/

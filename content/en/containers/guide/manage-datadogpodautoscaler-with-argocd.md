---
title: Managing DatadogPodAutoscaler with ArgoCD
description: Deploy and manage DatadogPodAutoscaler custom resources for Kubernetes autoscaling using ArgoCD and GitOps
further_reading:
  - link: 'https://www.datadoghq.com/blog/kubernetes-autoscaling-datadog/'
    tag: 'Blog'
    text: 'Kubernetes autoscaling guide: determine which solution is right for your use case'
  - link: "https://docs.datadoghq.com/containers/monitoring/autoscaling/"
    tag: "Documentation"
    text: "Datadog Kubernetes Autoscaling"
  - link: "https://docs.datadoghq.com/agent/cluster_agent/"
    tag: "Documentation"
    text: "Datadog Cluster Agent"
  - link: "https://argo-cd.readthedocs.io/"
    tag: "External Site"
    text: "ArgoCD Documentation"
  - link: "https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/"
    tag: "External Site"
    text: "ArgoCD Sync Waves"
  - link: "https://argo-cd.readthedocs.io/en/stable/user-guide/diffing/"
    tag: "External Site"
    text: "ArgoCD diffing customization"
  - link: "https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/"
    tag: "External Site"
    text: "ArgoCD sync options"
---

## Overview

The DatadogPodAutoscaler (DPA) is a Kubernetes custom resource definition (CRD) that enables autoscaling of Kubernetes workloads using [Datadog Kubernetes Autoscaling (DKA)][1]. This guide demonstrates how to manage DatadogPodAutoscaler resources using ArgoCD and GitOps principles to deploy an autoscaling configuration.

ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It monitors Git repositories containing Kubernetes manifests and keeps your cluster synchronized with the desired state defined in Git. This approach provides version control, audit trails, and automated deployment of your autoscaling infrastructure.

**Activating autoscaling at scale:** To roll out autoscaling across many workloads or namespaces with a shared policy, label the workloads or namespaces with `autoscaling.datadoghq.com/profile` instead of authoring one `DatadogPodAutoscaler` per workload. See [Cluster profiles][2] in the Kubernetes Autoscaling overview.

## Prerequisites

Before you begin, ensure you have the following:

- **Kubernetes cluster**: A working Kubernetes cluster (1.20 or later) with access using `kubectl`
- **ArgoCD installed**: ArgoCD deployed in your cluster and accessible via CLI or UI
- **Datadog API credentials**: Valid Datadog API key and application key
- **Git repository**: A Git repository to store your manifests

## Project structure

This guide uses the App of Apps pattern with ArgoCD sync waves to ensure proper dependency creation and deployment order.

```
.
├── argocd/
│   ├── root-app.yaml              # App of Apps controller
│   └── apps/
│       ├── datadog-operator.yaml  # ArgoCD Application for Operator
│       ├── datadog-agent.yaml     # ArgoCD Application for Agent
│       └── nginx-dka-demo.yaml    # ArgoCD Application for workload
├── manifests/
│   └── stage2-agent/
│       └── datadog-agent.yaml     # DatadogAgent custom resource
└── charts/
    └── nginx-dka-demo/
        ├── Chart.yaml
        ├── values.yaml
        └── templates/
            ├── deployment.yaml
            └── pod-autoscaler.yaml
```

## Deployment stages

A multi-stage deployment approach is essential when working with Kubernetes custom resource definitions (CRDs) and ArgoCD. This ordered approach is necessary to ensure that you create and install the dependencies required for each stage in the process.

Kubernetes CRDs must be installed in the cluster before you can create custom resources that use them. The DatadogPodAutoscaler CRD is created when you install the Datadog Operator in Stage 1. ArgoCD needs these CRDs to be present before it can successfully sync resources that depend on them.

ArgoCD uses **sync waves** to control the deployment order through annotations. Sync waves are executed in ascending order (lower numbers first), and ArgoCD waits for all resources in a wave to be healthy before proceeding to the next wave.

1. **Stage 1 (Wave 0)**: Datadog Operator using Helm (creates CRDs)
2. **Stage 2 (Wave 1)**: Datadog Agent configured for Datadog Kubernetes Autoscaling
   - DatadogAgent custom resource with Autoscaling requirements enabled
3. **Stage 3 (Wave 2)**: Application workload with DatadogPodAutoscaler
   - NGINX deployment in demo namespace
   - DatadogPodAutoscaler resource for autoscaling the NGINX deployment

## Set up configuration files

First, create a Git repository. You need to update all `repoURL` references in the ArgoCD Application manifests to point to your repository, as ArgoCD pulls manifests from Git.

Set up the following configuration files for each stage in the process.

### Stage 1: Root Application (App of Apps)

The root Application is the App of Apps controller that manages all child Applications.

{{< code-block lang="yaml" filename="argocd/root-app.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: dka-root
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: argocd/apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
{{< /code-block >}}

### Stage 2: Datadog Operator application

This ArgoCD application deploys the Datadog Operator using Helm, which creates the necessary CRDs.

{{< code-block lang="yaml" filename="argocd/apps/datadog-operator.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: datadog-operator
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "0"
spec:
  project: default
  source:
    repoURL: https://helm.datadoghq.com
    targetRevision: 2.18.1
    chart: datadog-operator
  destination:
    server: https://kubernetes.default.svc
    namespace: datadog
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
{{< /code-block >}}

### Stage 3: Datadog Agent application

This ArgoCD application deploys the DatadogAgent custom resource.

{{< code-block lang="yaml" filename="argocd/apps/datadog-agent.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: datadog-agent
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "1"
spec:
  project: default
  source:
    repoURL: https://example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: manifests/stage2-agent
  destination:
    server: https://kubernetes.default.svc
    namespace: datadog
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
{{< /code-block >}}

Create the DatadogAgent custom resource manifest:

{{< code-block lang="yaml" filename="manifests/stage2-agent/datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  features:
    autoscaling:
      workload:
        enabled: true
    eventCollection:
      unbundleEvents: true
  global:
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    clusterName: minikube-dka-demo
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
    nodeAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
{{< /code-block >}}

### Stage 4: NGINX application with DatadogPodAutoscaler

This ArgoCD application deploys an NGINX workload with a DatadogPodAutoscaler using a Helm chart.

{{< code-block lang="yaml" filename="argocd/apps/nginx-dka-demo.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: nginx-dka-demo
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "2"
spec:
  project: default
  source:
    repoURL: https:/example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: charts/nginx-dka-demo
  destination:
    server: https://kubernetes.default.svc
    namespace: nginx-dka-demo
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - RespectIgnoreDifferences=true
  ignoreDifferences:
    - group: apps
      kind: Deployment
      name: nginx
      namespace: nginx-dka-demo
      managedFieldsManagers:
        - datadog-cluster-agent
{{< /code-block >}}

The `ignoreDifferences` entry pairs with `RespectIgnoreDifferences=true` to instruct ArgoCD not to revert changes the Datadog Cluster Agent applies to the autoscaled workload. The `managedFieldsManagers` form leverages Kubernetes server-side apply field ownership, so any field the Cluster Agent owns (replicas, annotations under `autoscaling.datadoghq.com/`, container resources) is preserved automatically. See [Allow the Datadog Cluster Agent to update autoscaled workloads](#allow-the-datadog-cluster-agent-to-update-autoscaled-workloads) for the full rationale and global-configuration alternative.

Create the Helm chart for the NGINX application:

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/Chart.yaml" >}}
apiVersion: v2
name: nginx-dka-demo
description: NGINX demo application with DatadogPodAutoscaler
type: application
version: 0.1.0
appVersion: "1.0"
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/values.yaml" >}}
replicaCount: 3

image:
  repository: nginx
  tag: latest
  pullPolicy: IfNotPresent

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

service:
  type: ClusterIP
  port: 80

autoscaler:
  enabled: true
  minReplicas: 3
  maxReplicas: 100
  targetCPUUtilization: 70
  scaleUp:
    rules:
      - type: Percent
        value: 50
        periodSeconds: 120
    stabilizationWindowSeconds: 600
    strategy: Max
  scaleDown:
    rules:
      - type: Percent
        value: 20
        periodSeconds: 1200
    stabilizationWindowSeconds: 600
    strategy: Max
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/templates/deployment.yaml" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  namespace: nginx-dka-demo
  labels:
    app: nginx
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - containerPort: 80
        resources:
          {{- toYaml .Values.resources | nindent 10 }}
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: nginx-dka-demo
spec:
  selector:
    app: nginx
  ports:
  - port: {{ .Values.service.port }}
    targetPort: 80
  type: {{ .Values.service.type }}
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/templates/pod-autoscaler.yaml" >}}
{{- if .Values.autoscaler.enabled }}
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: nginx
  namespace: nginx-dka-demo
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  owner: Local
  constraints:
    minReplicas: {{ .Values.autoscaler.minReplicas }}
    maxReplicas: {{ .Values.autoscaler.maxReplicas }}
    containers:
    - name: nginx
      enabled: true
  objectives:
  - type: PodResource
    podResource:
      name: cpu
      value:
        type: Utilization
        utilization: {{ .Values.autoscaler.targetCPUUtilization }}
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto
    scaleUp:
      strategy: {{ .Values.autoscaler.scaleUp.strategy }}
      stabilizationWindowSeconds: {{ .Values.autoscaler.scaleUp.stabilizationWindowSeconds }}
      rules:
      {{- toYaml .Values.autoscaler.scaleUp.rules | nindent 6 }}
    scaleDown:
      strategy: {{ .Values.autoscaler.scaleDown.strategy }}
      stabilizationWindowSeconds: {{ .Values.autoscaler.scaleDown.stabilizationWindowSeconds }}
      rules:
      {{- toYaml .Values.autoscaler.scaleDown.rules | nindent 6 }}
{{- end }}
{{< /code-block >}}

## Allow the Datadog Cluster Agent to update autoscaled workloads

When `applyPolicy.mode: Apply` is set on a `DatadogPodAutoscaler`, the Datadog Cluster Agent mutates the target workload directly. It updates `spec.replicas`, container resources, and writes annotations under the `autoscaling.datadoghq.com/` prefix to track its recommendations and applied state. Without additional ArgoCD configuration, ArgoCD interprets these mutations as drift and, with `selfHeal: true` enabled, reverts them on every sync. This causes a conflict between ArgoCD and the autoscaler.

Two options are available to prevent this conflict:

- **Option A (per-Application):** Add `ignoreDifferences` and `RespectIgnoreDifferences=true` to each ArgoCD `Application` that contains an autoscaled workload. This is shown in [Stage 4](#stage-4-nginx-application-with-datadogpodautoscaler) above.
- **Option B (global):** Configure `argocd-cm` once so the `ignoreDifferences` rule applies to every Application in the instance.

### Supported target workload kinds

The `ignoreDifferences` configuration must cover every workload kind that a `DatadogPodAutoscaler` can target through `spec.targetRef`:

| Workload kind | API group | Note |
|---|---|---|
| `Deployment` | `apps` | |
| `StatefulSet` | `apps` | |
| `Rollout` | `argoproj.io` | Applies only if you also run Argo Rollouts |

### Option A: per-application configuration

Choose one of the following variants depending on whether server-side apply is active in your cluster.

#### Variant 1: `managedFieldsManagers` (recommended, requires server-side apply)

The `managedFieldsManagers` approach covers every field the Cluster Agent owns (`spec.replicas`, container resources, and all annotations) without enumerating them individually. It requires `ServerSideApply=true` so that Kubernetes populates the field-ownership database.

{{< code-block lang="yaml" >}}
syncPolicy:
  automated:
    prune: true
    selfHeal: true
  syncOptions:
    - ServerSideApply=true
    - RespectIgnoreDifferences=true
ignoreDifferences:
  - group: apps
    kind: Deployment
    managedFieldsManagers:
      - datadog-cluster-agent
  - group: apps
    kind: StatefulSet
    managedFieldsManagers:
      - datadog-cluster-agent
  - group: argoproj.io
    kind: Rollout
    managedFieldsManagers:
      - datadog-cluster-agent
{{< /code-block >}}

This is the approach used in the Stage 4 example above. Only include the `kind` entries for the workload types present in each Application.

#### Variant 2: `jqPathExpressions` (works with client-side apply)

The `jqPathExpressions` approach explicitly targets only annotations beginning with `autoscaling.datadoghq.com/`, making it compatible with client-side apply. Use this variant if `ServerSideApply=true` is not available in your environment.

{{< code-block lang="yaml" >}}
syncPolicy:
  automated:
    prune: true
    selfHeal: true
  syncOptions:
    - RespectIgnoreDifferences=true
ignoreDifferences:
  - group: apps
    kind: Deployment
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
  - group: apps
    kind: StatefulSet
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
  - group: argoproj.io
    kind: Rollout
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
{{< /code-block >}}

**Limitation:** this variant only covers `autoscaling.datadoghq.com/` annotations. If the autoscaler also mutates `spec.replicas` or container resource requests, add separate `jqPathExpressions` entries for those fields. Variant 1 (`managedFieldsManagers`) avoids this gap by automatically covering all fields the Cluster Agent owns.

### Option B: global ArgoCD configuration

To apply `ignoreDifferences` once across all Applications in an ArgoCD instance, configure the `argocd-cm` ConfigMap using `resource.customizations.ignoreDifferences.<group>_<kind>` keys.

#### ConfigMap (kubectl or kustomize installs)

{{< code-block lang="yaml" filename="argocd-cm patch" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
data:
  resource.customizations.ignoreDifferences.apps_Deployment: |
    managedFieldsManagers:
      - datadog-cluster-agent
  resource.customizations.ignoreDifferences.apps_StatefulSet: |
    managedFieldsManagers:
      - datadog-cluster-agent
  resource.customizations.ignoreDifferences.argoproj.io_Rollout: |
    managedFieldsManagers:
      - datadog-cluster-agent
{{< /code-block >}}

#### ArgoCD helm chart values

For users deploying ArgoCD with the official `argo/argo-cd` Helm chart, add the same keys under `configs.cm`:

{{< code-block lang="yaml" filename="values.yaml" >}}
configs:
  cm:
    resource.customizations.ignoreDifferences.apps_Deployment: |
      managedFieldsManagers:
        - datadog-cluster-agent
    resource.customizations.ignoreDifferences.apps_StatefulSet: |
      managedFieldsManagers:
        - datadog-cluster-agent
    resource.customizations.ignoreDifferences.argoproj.io_Rollout: |
      managedFieldsManagers:
        - datadog-cluster-agent
{{< /code-block >}}

Apply the values with:

{{< code-block lang="bash" >}}
helm upgrade --install argocd argo/argo-cd -f values.yaml -n argocd
{{< /code-block >}}

#### Important: `RespectIgnoreDifferences` is still required per-Application

<div class="alert alert-warning">
Global <code>ignoreDifferences</code> configuration only suppresses diff display in the ArgoCD UI. It does not prevent ArgoCD from overwriting those fields during a sync. Each Application containing an autoscaled workload must also set <strong><code>RespectIgnoreDifferences=true</code> in its <code>syncOptions</code></strong>. There is no global equivalent for this sync option.
</div>

To avoid setting `RespectIgnoreDifferences=true` on each Application individually, define it at the `AppProject` level so all Applications in the project inherit it:

{{< code-block lang="yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: default
  namespace: argocd
spec:
  syncOptions:
    - RespectIgnoreDifferences=true
{{< /code-block >}}

Alternatively, use an `ApplicationSet` template to add the sync option to all generated Applications automatically.

### Which option to use

- **Few autoscaled workloads**: use Option A. The configuration stays colocated with the workload.
- **Many workloads or ArgoCD-wide standardization**: use Option B combined with a project-level or `ApplicationSet`-level `RespectIgnoreDifferences=true`.
- **Mixed environments (not all workloads are autoscaled)**: Option B is safe to apply globally. The `managedFieldsManagers` rule is a no-op for workloads that have no Datadog Cluster Agent field ownership.

## Deployment instructions

After you have set up the [configuration files](#set-up-configuration-files) and pushed them to your Git repository, follow these steps to deploy the components using ArgoCD.

### Create Datadog secret

Create a Kubernetes secret with your Datadog API and application keys in the `datadog` namespace:

{{< code-block lang="bash" >}}
kubectl create namespace datadog
kubectl create secret generic datadog-secret \
  --from-literal=api-key=YOUR_API_KEY \
  --from-literal=app-key=YOUR_APP_KEY \
  -n datadog
{{< /code-block >}}

### Deploy root application

Deploy the root application, which manages all child applications using the App of Apps pattern:

{{< code-block lang="bash" >}}
kubectl apply -f argocd/root-app.yaml
{{< /code-block >}}

ArgoCD now monitors your Git repository and automatically deploys all applications in the correct order based on sync waves.

### Enable autoscaling on the cluster in Datadog

Navigate to the [autoscaling settings page](https://app.datadoghq.com/orchestration/scaling/settings) in the Datadog UI to enable autoscaling for the cluster.

### Verify sync wave progression

Watch ArgoCD applications synchronize in order:

{{< code-block lang="bash" >}}
kubectl get applications -n argocd
{{< /code-block >}}

You should see all applications appear and synchronize in wave order: `datadog-operator` (wave 0), then `datadog-agent` (wave 1), and `nginx-dka-demo` (wave 2).

### Validate deployment

Verify that the Datadog Operator and CRDs are deployed:

{{< code-block lang="bash" >}}
kubectl get crd | grep datadoghq
kubectl get pods -n datadog
{{< /code-block >}}

You should see the Datadog CRDs created and the `datadog-operator` pod running.

Verify that the Datadog Agent is deployed:

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
{{< /code-block >}}

You should see the DatadogAgent custom resource created in the `Running` state. Also verify that the Datadog Agent and `datadog-cluster-agent` pods are running:

{{< code-block lang="bash" >}}
kubectl get pods -n datadog
{{< /code-block >}}

Check DatadogPodAutoscaler status:

{{< code-block lang="bash" >}}
kubectl get datadogpodautoscaler -n nginx-dka-demo
kubectl describe datadogpodautoscaler nginx -n nginx-dka-demo
{{< /code-block >}}

Congratulations, you have a workload managed by the Datadog Kubernetes Autoscaler using GitOps!

## Cleanup

To remove all resources, delete the root application. This cascades deletion to all child applications:

{{< code-block lang="bash" >}}
kubectl delete application dka-root -n argocd
{{< /code-block >}}

Alternatively, delete applications individually in reverse order:

{{< code-block lang="bash" >}}
kubectl delete application nginx-dka-demo -n argocd
kubectl delete application datadog-agent -n argocd
kubectl delete application datadog-operator -n argocd
{{< /code-block >}}

Delete the Datadog secret:

{{< code-block lang="bash" >}}
kubectl delete secret datadog-secret -n datadog
{{< /code-block >}}

## Troubleshooting

### ArgoCD sync failures

Check application status and sync errors:

{{< code-block lang="bash" >}}
kubectl describe application datadog-operator -n argocd
kubectl describe application datadog-agent -n argocd
kubectl describe application nginx-dka-demo -n argocd
{{< /code-block >}}

View ArgoCD application Controller logs:

{{< code-block lang="bash" >}}
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller
{{< /code-block >}}

### CRD availability issues

If ArgoCD fails to sync because CRDs are not recognized, verify the Datadog Operator deployed successfully in wave 0:

{{< code-block lang="bash" >}}
kubectl get crd | grep datadoghq
kubectl get pods -n datadog
{{< /code-block >}}

The sync wave annotations ensure proper ordering, but you can manually refresh the application:

{{< code-block lang="bash" >}}
argocd app sync datadog-agent
{{< /code-block >}}

### Secret configuration problems

Verify the Datadog secret exists and contains the correct keys:

{{< code-block lang="bash" >}}
kubectl get secret datadog-secret -n datadog
kubectl describe secret datadog-secret -n datadog
{{< /code-block >}}

The secret must contain `api-key` and `app-key` fields.

### DatadogPodAutoscaler events

Check DatadogPodAutoscaler events for scaling decisions and errors:

{{< code-block lang="bash" >}}
kubectl get events -n nginx-dka-demo --sort-by='.lastTimestamp'
{{< /code-block >}}

### Autoscaled workload keeps reverting

With `selfHeal: true` enabled, ArgoCD syncs approximately every 3 minutes. If `spec.replicas` or `autoscaling.datadoghq.com/` annotations on the autoscaled workload are repeatedly reset, check for one of the following:

1. **`RespectIgnoreDifferences=true` is absent** from the Application's `syncOptions`. Without this flag, ArgoCD only hides the drift in the UI but still overwrites the fields during apply.
2. **The `ignoreDifferences` entry does not match the workload.** Verify that `group`, `kind`, `name`, and `namespace` in the entry exactly match the target workload.
3. **`ServerSideApply=true` is not set** when using `managedFieldsManagers`. Without server-side apply, Kubernetes does not populate the field-ownership database, so the manager name cannot be matched.

To confirm whether server-side apply is active and which manager owns a given field, run:

{{< code-block lang="bash" >}}
kubectl get deployment <name> -n <namespace> -o yaml --show-managed-fields
{{< /code-block >}}

Look for an entry where `manager: datadog-cluster-agent` and `operation: Apply`. If no such entry exists, server-side apply is not active for that resource.

### Cluster Agent logs

Check Cluster Agent logs for autoscaling-related messages:

{{< code-block lang="bash" >}}
kubectl logs -n datadog -l agent.datadoghq.com/component=cluster-agent
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/monitoring/autoscaling/
[2]: /containers/monitoring/autoscaling/#cluster-profiles

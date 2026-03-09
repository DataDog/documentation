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
---

## Overview

The DatadogPodAutoscaler (DPA) is a Kubernetes custom resource definition (CRD) that enables autoscaling of Kubernetes workloads using [Datadog Kubernetes Autoscaling (DKA)][1]. This guide demonstrates how to manage DatadogPodAutoscaler resources using ArgoCD and GitOps principles to deploy an autoscaling configuration.

ArgoCD is a declarative, GitOps continuous delivery tool for Kubernetes. It monitors Git repositories containing Kubernetes manifests and keeps your cluster synchronized with the desired state defined in Git. This approach provides version control, audit trails, and automated deployment of your autoscaling infrastructure.

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
  ignoreDifferences:
    - group: apps
      kind: Deployment
      name: nginx-dka-demo
      namespace: nginx-dka-demo
      managedFieldsManagers:
        - datadog-cluster-agent
{{< /code-block >}}

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

### Cluster Agent logs

Check Cluster Agent logs for autoscaling-related messages:

{{< code-block lang="bash" >}}
kubectl logs -n datadog -l agent.datadoghq.com/component=cluster-agent
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/monitoring/autoscaling/

---
description: Activez le suivi de l'activité GPU pour les charges de travail Kubernetes
  sélectionnées.
further_reading:
- link: /gpu_monitoring/setup
  tag: Documentation
  text: Configurez la surveillance GPU
- link: /gpu_monitoring
  tag: Qu'est-ce que la surveillance GPU ?
  text: En savoir plus sur ce que propose la surveillance GPU
is_beta: true
private: true
title: Suivi continu avec la surveillance GPU
---
{{< beta-callout url="#" btn_hidden="true" >}}
Le suivi continu avec la surveillance GPU est en Early Access Preview.
{{< /beta-callout >}}

## Présentation {#overview}

Le suivi continu avec la surveillance GPU permet un suivi léger de l'activité GPU pour les charges de travail Kubernetes sélectionnées. Le dépannage de charges de travail volumineuses et distribuées peut être fastidieux et long. Grâce à cette capacité de suivi dans la surveillance GPU, vous pouvez identifier et étudier les goulots d'étranglement à l'aide de traces d'exécution détaillées qui relient les opérations CUDA et NCCL à votre modèle et aux opérations PyTorch.

{{< img src="gpu_monitoring/gpu-tracing.png" alt="Vue en flame graph d'une trace torch.step, montrant des segments CPU alignés avec l'activité du flux GPU, y compris les opérations NCCL allgather et les lancements de noyaux CUDA." style="width:100%;" >}}

## Configuration {#setup}

### Prérequis {#prerequisites}

Pour commencer à suivre en continu vos charges de travail, vous devez d'abord remplir les critères suivants :
- Vous exécutez le Datadog Cluster Agent version 7.80 ou ultérieure avec [GPU Monitoring activé][1].
- Version minimale requise de CUDA et CUPTI : 13.

### 1. Configurez le suivi GPU {#1-configure-gpu-tracing}

Fusionnez la configuration suivante dans la ressource `DatadogAgent` existante :

```yaml
spec:
  features:
    apm:
      enabled: true
      instrumentation:
        enabled: true
        targets:
          - name: gpu-monitoring
            podSelector:
              matchLabels:
                admission.datadoghq.com/gpu.enabled: "true"
            ddTraceVersions:
              c: "0.20.0"
            ddTraceConfigs:
              - name: DD_INJECT_NATIVE
                value: "always"
              - name: DD_TRACE_HOOK_MODULES
                value: "gpu"
```

Appliquez la configuration et attendez que le déploiement `DatadogAgent` soit terminé.

### 2. Étiquetez la charge de travail GPU {#2-label-the-gpu-workload}

Ajoutez l'étiquette au modèle de pod du contrôleur. La charge de travail doit être en dehors de l'espace de noms de l'Agent. Pour les Jobs, utilisez `spec.template.metadata.labels`. Pour KubeRay, étiquetez le modèle de pod head et worker :

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

Appliquez la ressource et attendez que le déploiement soit terminé.

### 3. Vérifiez la configuration {#3-verify-setup}

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**Aucun conteneur de configuration ?** Confirmez que l'étiquette figure sur le modèle de pod, que le pod est nouveau et que la charge de travail se trouve en dehors de l'espace de noms de l'Agent. Vérifiez ensuite les logs du Cluster Agent.

### 4. Explorez les traces {#4-explore-traces}

Exécutez la charge de travail, puis interrogez [APM Trace Explorer][2] avec :

```
pod_name:<NEW_GPU_POD> kube_namespace:<GPU_WORKLOAD_NAMESPACE>
```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/gpu_monitoring/setup
[2]: /fr/tracing/trace_explorer/
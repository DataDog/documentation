---
description: Résolvez les problèmes d'exécutions d'entraînement bloquées ou ayant
  échoué et maximisez le débit global de vos charges de travail d'entraînement.
further_reading:
- link: /gpu_monitoring/setup
  tag: Documentation
  text: Configurez la surveillance GPU
- link: /gpu_monitoring/tracing
  tag: Documentation
  text: Suivi continu avec la surveillance GPU
- link: /gpu_monitoring
  tag: Documentation
  text: En savoir plus sur ce que propose la surveillance GPU
title: Optimisez les charges de travail d'entraînement avec la surveillance GPU.
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-training-obs/" >}}
L'optimisation des charges de travail d'entraînement avec la surveillance GPU est en Early Access Preview. Remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

Les charges de travail d'entraînement échouent souvent, et chaque échec gaspille un temps GPU coûteux. Le débogage de charges de travail d'entraînement volumineuses et distribuées peut s'avérer chronophage pour vos équipes MLOps, de plateforme et d'ingénierie ML. La page Entraînement de la surveillance GPU vous aide à résoudre les problèmes de charges de travail bloquées ou ayant échoué et à maximiser le débit global de vos exécutions d'entraînement. La page lie chaque exécution d'entraînement à l'état du matériel GPU et de l'interconnexion réseau sur lesquels elle a été exécutée.

Avec la page Entraînement, vous obtenez :

- **Analyse d'agent pour identifier la cause profonde des échecs ou ralentissements des charges de travail d'entraînement** : Identifiez précisément pourquoi les charges de travail d'entraînement échouent ou ralentissent, que ce soit en raison d'un matériel défaillant, d'une communication inadéquate, d'une bande passante mémoire insuffisante ou d'une planification défaillante.
- **Optimisation des performances d'exécution d'entraînement** : Identifiez les opportunités à fort impact pour accroître le débit lors des exécutions d'entraînement réussies.

{{< img src="gpu_monitoring/training-page.png" alt="La page Entraînement de la surveillance GPU affiche des informations sur les exécutions d'entraînement, un graphique à barres illustrant l'évolution des exécutions dans le temps et une liste des exécutions d'entraînement." style="width:100%;" >}}

## Configuration {#setup}

### Prérequis {#prerequisites}

Pour commencer à surveiller vos charges de travail d'entraînement, vous devez d'abord remplir les critères suivants :
- Vous exécutez le Datadog Cluster Agent version 7.80 ou ultérieure avec [GPU Monitoring activé][1].
- Vous exécutez CUDA et CUPTI version 13 ou ultérieure.

### 1. Connectez les exécutions d'entraînement au matériel GPU {#1-connect-training-runs-to-gpu-hardware}

Vos charges de travail Kubernetes peuvent comporter des étiquettes ou des annotations qui identifient une exécution d'entraînement ou un groupe d'exécutions. Dans cette étape, vous ajoutez ces identifiants aux métriques GPU en tant que tags, ce qui lie directement les données d'exécution de l'entraînement au matériel GPU sur lequel elles ont été exécutées. L'étape 2 ajoute les mêmes identifiants aux traces.

Les exemples suivants utilisent les annotations de pod `company.name/run-id` et `company.name/group-id`. Remplacez-les par les annotations utilisées par vos charges de travail.

Pour les métriques, utilisez [tag extraction][2] pour mapper les annotations aux tags. Fusionnez la configuration suivante dans la ressource `DatadogAgent` existante :

```yaml
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      pods:
        company.name/run-id: training_run_id
        company.name/group-id: training_group_id
```

Pour utiliser les labels de pod au lieu des annotations, utilisez `kubernetesResourcesLabelsAsTags` pour les métriques.

Après avoir appliqué cette configuration, les métriques GPU sont taguées avec `training_run_id` et `training_group_id`.

### 2. Configurer le traçage GPU {#2-configure-gpu-tracing}

Pour activer le traçage GPU et ajouter les identifiants d'exécution d'entraînement et de groupe aux traces, fusionnez la configuration suivante dans la ressource DatadogAgent existante :

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
              - name: DD_TRAINING_RUN_ID
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.annotations['company.name/run-id']
              - name: DD_TRAINING_GROUP_ID
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.annotations['company.name/group-id']
```

Pour utiliser les étiquettes de pod au lieu des annotations, définissez `metadata.labels['<LABEL_KEY>']` comme `fieldPath` pour les traces.

Appliquez la configuration et attendez que le déploiement `DatadogAgent` soit terminé. Avec cette configuration, les traces provenant des charges de travail que vous étiquetez dans l'étape [Étiquetage de la charge de travail GPU](#3-label-the-gpu-workload) sont taguées avec `training.run_id` et `training.group_id`.

### 3. Étiquetage de la charge de travail GPU {#3-label-the-gpu-workload}

Ajoutez l'étiquette `admission.datadoghq.com/gpu.enabled: "true"` au modèle de pod du contrôleur de votre charge de travail, tel qu'un Job. La charge de travail doit s'exécuter en dehors de l'espace de nommage où l'Agent est déployé. Pour les Jobs, ajoutez l'étiquette sous `spec.template.metadata.labels` :

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

Appliquez la ressource et attendez que le déploiement soit terminé.

### 4. Vérifier la configuration {#4-verify-setup}

Exécutez les commandes suivantes sur un pod GPU nouvellement créé pour confirmer la configuration :

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**Aucun conteneur de configuration ?** Confirmez que l'étiquette figure sur le modèle de pod, que le pod a été créé après l'application de la configuration et que la charge de travail s'exécute en dehors de l'espace de nommage de l'Agent. Vérifiez ensuite les logs du Cluster Agent.

Une fois la configuration terminée, les métriques GPU sont taguées avec `training_run_id` et `training_group_id`, et les traces sont taguées avec `training.run_id` et `training.group_id`. Utilisez ces tags pour filtrer les métriques et les traces GPU pour la même exécution d'entraînement.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/gpu_monitoring/setup
[2]: /fr/containers/kubernetes/tag/?tab=datadogoperator#tag-extraction
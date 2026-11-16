---
description: Surveillez la latence, le débit et l'état de santé de vos déploiements
  de modèles ainsi que des GPU sur lesquels ils s'exécutent.
further_reading:
- link: /gpu_monitoring/setup
  tag: Documentation
  text: Configurez GPU Monitoring
- link: /gpu_monitoring/tracing
  tag: Documentation
  text: Continuous Tracing with GPU Monitoring
- link: /gpu_monitoring
  tag: Documentation
  text: En savoir plus sur ce que propose GPU Monitoring
title: Surveillez les charges de travail d'inférence avec GPU Monitoring
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-tracing/" >}}
L'optimisation des charges de travail d'inférence avec Continuous Tracing with GPU Monitoring est en Early Access Preview. Remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

Les charges de travail d'inférence traitent du trafic en direct ; les réponses lentes et les erreurs affectent donc directement vos utilisateurs. Les GPU sous-utilisés augmentent également les coûts de mise à disposition des modèles. La page Inference de GPU Monitoring affiche les performances de chaque déploiement de modèle ainsi que l'état de santé des GPU sur lesquels il s'exécute. Vos équipes MLOps, plateforme et ingénierie ML peuvent trouver et résoudre les problèmes liés à la mise à disposition des modèles au même endroit.

Avec la page Inference, vous obtenez :

- **Latence et débit sur l'ensemble des déploiements de modèles** : comparez le temps jusqu'au premier token (TTFT), la latence inter-tokens (ITL) et le nombre de tokens de sortie par seconde sur vos déploiements de modèles, et filtrez par environnement, déploiement ou espace de noms Kubernetes.
- **État de santé des déploiements en un coup d'œil** : examinez le nombre moyen de requêtes simultanées, le taux d'erreur, l'état de santé, les monitors et l'utilisation du cache KV des GPU de chaque déploiement de modèle pour identifier ceux qui nécessitent une attention particulière.

{{< img src="gpu_monitoring/inference-page2.png" alt="Page Inference de GPU Monitoring affichant, pour un déploiement de modèle donné, des métriques clés telles que le temps jusqu'au premier token et les tokens de sortie." style="width:100%;" >}}

## Configuration {#setup}

La surveillance de l'inférence prend en charge [vLLM][1] comme moteur d'inférence dans les déploiements suivants : autonome, avec NVIDIA Dynamo comme routeur d'inférence, ou sur Ray. Les autres moteurs d'inférence et routeurs ne sont pas pris en charge. Pour demander leur prise en charge, contactez votre représentant Datadog.

Sélectionnez l'onglet qui correspond à votre déploiement :

{{< tabs >}}
{{% tab "Standalone vLLM" %}}

La configuration utilise l'intégration vLLM, qui collecte les métriques du moteur.

### Prérequis {#prerequisites}

Pour commencer à surveiller vos charges de travail d'inférence, vous devez remplir les critères suivants :
- Vous avez [activé GPU Monitoring][1].
- Vous exécutez l'image de l'Agent d'inférence (`7.85.0-rc.5`).
- Vos charges de travail d'inférence s'exécutent sur Kubernetes.
- Vous servez des modèles avec vLLM.

### 0. Activez GPU Monitoring {#0-enable-gpu-monitoring}

Si ce n'est pas déjà fait, [configurez GPU Monitoring][1] sur vos hosts GPU. Les étapes suivantes nécessitent l'activation de GPU Monitoring.

### 1. Utilisez l'image de l'Agent d'inférence {#1-use-the-inference-agent-image}

L'image de l'Agent d'inférence inclut le check vLLM, vous n'avez donc pas besoin d'installer l'intégration vLLM séparément.

Fusionnez la configuration suivante dans la ressource `DatadogAgent` existante. Conservez vos identifiants, votre site et les autres fonctionnalités sans les modifier :

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0-rc.5
```

Pour utiliser une image de l'Agent prenant en charge JMX ou une image complète de l'Agent, définissez `tag` sur `7.85.0-rc.5-jmx` ou `7.85.0-rc.5-full`.

Appliquez la ressource et attendez le déploiement du DaemonSet de l'Agent :

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. Vérifiez l'endpoint et le port des métriques {#2-confirm-the-metrics-endpoint-and-port}

L'intégration vLLM collecte les métriques à partir de l'endpoint suivant :

| Cible | Endpoint | Intégration | Métriques |
|--------|----------|-------------|---------|
| Serveur vLLM | `:8000/metrics` | vLLM | `vllm.*` |

vLLM expose les métriques sur le même port que son serveur d'API compatible avec OpenAI, qui est `8000` par défaut. Si vous démarrez vLLM avec un `--port` différent, remplacez-le dans l'annotation à l'étape 3.

### 3. Configurez l'intégration {#3-configure-the-integration}

Ajoutez l'annotation [Autodiscovery][2] suivante à chaque modèle de pod vLLM. Dans la clé d'annotation, remplacez `<VLLM_CONTAINER_NAME>` par la valeur du champ `name` du conteneur dans `spec.template.spec.containers[]`, et non par le nom de l'image :

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<VLLM_CONTAINER_NAME>.checks: |-
      {
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8000/metrics",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true
          }]
        }
      }
```

Remplacez `<SERVICE_NAME>` par un nom pour le déploiement de votre modèle, tel que `inference-vllm-glm5.3`. La page Inference regroupe les métriques par `service`.

Appliquez les ressources de charge de travail mises à jour et recréez les pods afin que l'Autodiscovery détecte les nouvelles annotations.

### 4. Vérifier la configuration {#4-verify-setup}

Utilisez deux terminaux pour confirmer que l'endpoint vLLM répond et que l'Agent exécute le check. Exécutez le transfert de port dans l'espace de noms Kubernetes de votre charge de travail, ou ajoutez `-n <WORKLOAD_NAMESPACE>` s'il diffère de votre espace de noms actuel.

**Terminal 1** : Établissez un transfert de port vers l'endpoint des métriques vLLM et maintenez-le actif.

```shell
kubectl port-forward pod/<VLLM_POD> 18000:8000
```

**Terminal 2** : Vérifiez l'endpoint et le check de l'Agent.

```shell
# Show vLLM metrics from the endpoint
curl -fsS http://localhost:18000/metrics | grep '^vllm:'

# Look for "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

Lorsque vous avez terminé, appuyez sur **Ctrl+C** dans le terminal 1 pour arrêter le transfert.

Une fois la configuration terminée, Datadog collecte les métriques `vllm.*` de vos pods vLLM.

Si aucune métrique n'apparaît, envoyez du trafic d'inférence vers votre déploiement. vLLM n'émet certaines métriques qu'après avoir traité la première requête.

### 5. Activez les percentiles sur vos métriques {#5-enable-percentiles-on-your-metrics}

Pour représenter graphiquement les percentiles de certaines métriques vLLM, vous devez activer la [fonctionnalité de requête avancée][3] pour les métriques de distribution suivantes :

| Métrique |
|--------|
| `vllm.time_to_first_token.seconds` |
| `vllm.time_per_output_token.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. Activez le traçage GPU (facultatif) {#6-enable-gpu-tracing-optional}

Pour corréler les requêtes d'inférence avec l'activité du GPU, configurez [Continuous Tracing with GPU Monitoring][4] et étiquetez vos charges de travail vLLM. Continuous Tracing nécessite CUDA et CUDA Profiling Tools Interface (CUPTI) version 13 ou ultérieure.

[1]: /fr/gpu_monitoring/setup
[2]: /fr/containers/kubernetes/integrations/?tab=annotations
[3]: /fr/metrics/distributions/#enabling-advanced-query-functionality
[4]: /fr/gpu_monitoring/tracing

{{% /tab %}}
{{% tab "vLLM avec Dynamo" %}}

La configuration utilise deux intégrations. L'intégration Dynamo collecte les métriques d'exécution du frontend et des workers, et l'intégration vLLM collecte les métriques du moteur.

### Prérequis {#prerequisites-1}

Pour commencer à surveiller vos charges de travail d'inférence, vous devez remplir les critères suivants :
- Vous avez [activé GPU Monitoring][1].
- Vous exécutez l'image de l'Agent d'inférence (`7.85.0-rc.5`).
- Vos charges de travail d'inférence s'exécutent sur Kubernetes.
- Vous servez des modèles avec des workers vLLM dans un déploiement NVIDIA Dynamo.

### 0. Activez GPU Monitoring {#0-enable-gpu-monitoring-1}

Si ce n'est pas déjà fait, [configurez GPU Monitoring][1] sur vos hosts GPU. Les étapes suivantes nécessitent l'activation de GPU Monitoring.

### 1. Utilisez l'image de l'Agent d'inférence {#1-use-the-inference-agent-image-1}

L'image de l'Agent d'inférence inclut les checks Dynamo et vLLM, vous n'avez donc pas besoin d'installer ces intégrations séparément.

Fusionnez la configuration suivante dans la ressource `DatadogAgent` existante. Conservez vos identifiants, votre site et les autres fonctionnalités sans les modifier :

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0-rc.5
```

Pour utiliser une image de l'Agent prenant en charge JMX ou une image complète de l'Agent, définissez `tag` sur `7.85.0-rc.5-jmx` ou `7.85.0-rc.5-full`.

Appliquez la ressource et attendez le déploiement du DaemonSet de l'Agent :

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. Confirmez les endpoints et les ports des métriques {#2-confirm-the-metrics-endpoints-and-ports}

Les intégrations collectent des métriques à partir des endpoints suivants :

| Cible | Endpoint | Intégration | Métriques |
|--------|----------|-------------|---------|
| Frontend Dynamo | `:8000/metrics` | Dynamo | `dynamo.frontend.*` |
| Worker Dynamo | `:9090/metrics` | Dynamo | `dynamo.component.*` |
| Moteur vLLM | `:9090/metrics` | vLLM | `vllm.*` |

Par défaut, le worker Dynamo et le moteur vLLM partagent un endpoint. Dynamo expose les métriques du moteur vLLM via l'endpoint des métriques du worker, et chaque intégration collecte ses propres métriques à partir de cet endpoint.

<div class="alert alert-info">Si votre déploiement exécute le moteur vLLM séparément du worker Dynamo, par exemple dans un sidecar, le worker et le moteur exposent les métriques sur des endpoints distincts. Dans ce cas, orientez le <code>dynamo</code> check vers l'endpoint des métriques du worker et le <code>vllm</code> check vers l'endpoint des métriques du moteur à l'étape 3.</div>

Le Dynamo Kubernetes Operator définit `DYN_SYSTEM_PORT=9090` par défaut. Si vous lancez un worker directement, définissez le port explicitement :

```yaml
env:
  - name: DYN_SYSTEM_PORT
    value: "9090"
```

Si vos workers utilisent un port autre que `9090`, remplacez-le dans l'annotation du worker à l'étape 3.

### 3. Configurez les intégrations {#3-configure-the-integrations}

Ajoutez les [annotations Autodiscovery][2] suivantes aux modèles de pod de charge de travail correspondants. Dans chaque clé d'annotation, remplacez l'espace réservé par la valeur du champ `name` du conteneur dans `spec.template.spec.containers[]`, et non par le nom de l'image.

Ajoutez l'annotation suivante au modèle de pod du frontend Dynamo :

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<FRONTEND_CONTAINER_NAME>.checks: |-
      {
        "dynamo": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8000/metrics"
          }]
        }
      }
```

Remplacez `<SERVICE_NAME>` par un nom pour le déploiement de votre modèle, tel que `inference-vllm-glm5.3`. La page Inference regroupe les métriques par `service`.

Ajoutez l'annotation suivante à chaque modèle de pod de worker vLLM. Les deux intégrations utilisent l'endpoint des métriques du worker sur le port `9090` :

```yaml
metadata:
  annotations:
    ad.datadoghq.com/<WORKER_CONTAINER_NAME>.checks: |-
      {
        "dynamo": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:9090/metrics"
          }]
        },
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:9090/metrics",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true
          }]
        }
      }
```

Appliquez les ressources de charge de travail mises à jour et recréez les pods afin que l'Autodiscovery détecte les nouvelles annotations.

### 4. Vérifiez la configuration {#4-verify-setup-1}

Utilisez trois terminaux pour confirmer que chaque endpoint répond et que l'Agent exécute les deux checks. Exécutez les transferts de port dans l'espace de noms Kubernetes de vos charges de travail, ou ajoutez `-n <WORKLOAD_NAMESPACE>` s'il diffère de votre espace de noms actuel.

**Terminal 1** : Établissez une redirection de port vers l'endpoint des métriques du frontend et laissez-la active.

```shell
kubectl port-forward pod/<FRONTEND_POD> 18000:8000
```

**Terminal 2** : Établissez une redirection de port vers l'endpoint des métriques du worker et laissez-la active. Si votre worker utilise un port de métriques différent, remplacez `9090` par ce port.

```shell
kubectl port-forward pod/<WORKER_POD> 19090:9090
```

**Terminal 3** : Vérifiez les deux endpoints et les checks de l'Agent.

```shell
# Show the first ten lines of frontend metrics
curl -fsS http://localhost:18000/metrics | sed -n '1,10p'

# Show Dynamo and vLLM metrics from the worker
curl -fsS http://localhost:19090/metrics | grep -E '^(dynamo_|vllm:)'

# Look for "dynamo" and "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

Confirmez que la sortie du worker inclut les noms de métriques `dynamo_` et `vllm:`, et que le statut de l'Agent répertorie les deux checks. Lorsque vous avez terminé, appuyez sur **Ctrl+C** dans les terminaux 1 et 2 pour arrêter le transfert.

Une fois la configuration terminée, Datadog collecte les éléments suivants :
- `dynamo.frontend.*` métriques provenant des pods frontend
- `dynamo.component.*` métriques provenant des pods worker
- `vllm.*` métriques provenant des pods worker

Si aucune métrique n'apparaît, envoyez du trafic d'inférence vers votre déploiement. Dynamo et vLLM n'émettent certaines métriques qu'après avoir traité la première requête.

### 5. Activez les centiles sur vos métriques {#5-enable-percentiles-on-your-metrics-1}

Pour représenter graphiquement les centiles sur certaines métriques vLLM et Dynamo, vous devez activer [les fonctionnalités de requête avancées][3] sur les métriques de distribution suivantes :

| Métrique |
|--------|
| `dynamo.frontend.time_to_first_token.seconds` |
| `dynamo.frontend.inter_token_latency.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. Activez le traçage GPU (facultatif) {#6-enable-gpu-tracing-optional-1}

Pour corréler les requêtes d'inférence avec l'activité du GPU, configurez [Continuous Tracing with GPU Monitoring][4] et ajoutez des labels à vos charges de travail de worker vLLM. Continuous Tracing nécessite CUDA et CUDA Profiling Tools Interface (CUPTI) version 13 ou ultérieure.

[1]: /fr/gpu_monitoring/setup
[2]: /fr/containers/kubernetes/integrations/?tab=annotations
[3]: /fr/metrics/distributions/#enabling-advanced-query-functionality
[4]: /fr/gpu_monitoring/tracing

{{% /tab %}}
{{% tab "vLLM avec Ray" %}}

La configuration utilise deux intégrations. L'[intégration Ray][5] collecte les métriques du cluster Ray, et l'[intégration vLLM][6] collecte les métriques du moteur.

### Prérequis {#prerequisites-2}

Pour commencer à surveiller vos charges de travail d'inférence, vous devez remplir les critères suivants :
- Vous avez [activé GPU Monitoring][1] avec l'image de l'Agent d'inférence (`7.85.0-rc.5`).
- Vos charges de travail d'inférence s'exécutent sur Kubernetes, avec des clusters Ray gérés par KubeRay.
- Vous servez des modèles avec vLLM au sein de Ray, par exemple avec Ray Serve.

### 1. Utilisez l'image de l'Agent d'inférence {#1-use-the-inference-agent-image-2}

L'image de l'Agent d'inférence inclut les checks Ray et vLLM, vous n'avez donc pas besoin d'installer ces intégrations séparément.

Fusionnez la configuration suivante dans la ressource `DatadogAgent` existante. Conservez vos identifiants, votre site et les autres fonctionnalités sans les modifier :

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0-rc.5
```

Pour utiliser une image de l'Agent prenant en charge JMX ou une image complète de l'Agent, définissez `tag` sur `7.85.0-rc.5-jmx` ou `7.85.0-rc.5-full`.

Appliquez la ressource et attendez le déploiement du DaemonSet de l'Agent :

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. Vérifiez l'endpoint et le port des métriques {#2-confirm-the-metrics-endpoint-and-port-1}

Lorsque vLLM s'exécute au sein de Ray, il n'expose pas son propre endpoint de métriques. Au lieu de cela, vLLM enregistre ses métriques de moteur via Ray, et chaque nœud Ray les publie avec un préfixe `ray_vllm_` sur le même endpoint que les propres métriques de Ray. Les intégrations Ray et vLLM collectent toutes deux à partir de cet endpoint.

Les exemples utilisent le port `8080`, le port défini par `--metrics-export-port` au démarrage de Ray. Si vos nœuds Ray utilisent un port différent, remplacez `8080` dans l'annotation à l'étape 3.

### 3. Configurez les intégrations {#3-configure-the-integrations-1}

Ajoutez l'[annotation Autodiscovery][2] suivante au modèle de pod de chaque groupe de workers KubeRay qui exécute vLLM. Dans une ressource `RayCluster` ou `RayService`, les modèles de pod se trouvent sous `workerGroupSpecs[].template`. Dans la clé d'annotation, remplacez `<RAY_CONTAINER_NAME>` par la valeur du champ `name` du conteneur Ray, et non par le nom de l'image.

L'intégration vLLM utilise `extra_metrics` pour mapper chaque métrique `ray_vllm_` au nom utilisé par la page Inference :

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<RAY_CONTAINER_NAME>.checks: |-
      {
        "ray": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8080"
          }]
        },
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8080",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true,
            "exclude_metrics": ["python_.+", "process_.+"],
            "exclude_labels": ["WorkerId", "SessionName", "otel_scope_name", "otel_scope_schema_url", "otel_scope_version"],
            "extra_metrics": [{
              "ray_vllm_time_to_first_token_seconds": "time_to_first_token.seconds",
              "ray_vllm_e2e_request_latency_seconds": "e2e_request_latency.seconds",
              "ray_vllm_request_prompt_tokens": "request.prompt_tokens",
              "ray_vllm_request_generation_tokens": "request.generation_tokens",
              "ray_vllm_request_params_n": "request.params.n",
              "ray_vllm_prompt_tokens": "prompt_tokens",
              "ray_vllm_generation_tokens": "generation_tokens",
              "ray_vllm_request_success": "request.success",
              "ray_vllm_request_decode_time_seconds": "request.decode_time.seconds",
              "ray_vllm_request_prefill_time_seconds": "request.prefill_time.seconds",
              "ray_vllm_request_queue_time_seconds": "request.queue_time.seconds",
              "ray_vllm_request_prefill_kv_computed_tokens": "request.prefill_kv_computed_tokens",
              "ray_vllm_prompt_tokens_cached": "prompt_tokens.cached"
            }]
          }]
        }
      }
```

Remplacez `<SERVICE_NAME>` par un nom pour le déploiement de votre modèle, tel que `inference-vllm-glm5.3`. La page Inference regroupe les métriques par `service`.

Dans l'instance `vllm` :
- L'option `exclude_metrics` ignore les métriques Python et de processus sur l'endpoint Ray, qui décrivent les processus Ray plutôt que le moteur vLLM.
- L'option `exclude_labels` supprime les labels Ray qui changent à chaque redémarrage d'un worker ou d'un cluster.

<div class="alert alert-info">Si votre <code>ray</code> check collecte déjà des <code>ray_vllm_</code> métriques via <code>extra_metrics</code>, elles sont envoyées deux fois : en tant que <code>ray.ray_vllm_*</code> et en tant que <code>vllm.*</code>. Supprimez ces motifs du <code>ray</code> check après avoir migré les dashboards et monitors qui utilisent les <code>ray.ray_vllm_*</code> noms.</div>

Appliquez les ressources de charge de travail mises à jour. Avec KubeRay, la modification du modèle de pod d'un groupe de workers recrée les pods de ce groupe. Pour un `RayService`, KubeRay peut créer un nouveau cluster Ray à la place, selon la stratégie de mise à niveau.

### 4. Vérifiez la configuration {#4-verify-setup-2}

Utilisez deux terminaux pour confirmer que l'endpoint Ray expose les métriques vLLM et que l'Agent exécute les deux checks. Exécutez le transfert de port dans l'espace de noms Kubernetes de votre charge de travail, ou ajoutez `-n <WORKLOAD_NAMESPACE>` s'il diffère de votre espace de noms actuel.

**Terminal 1** : Établissez une redirection de port vers l'endpoint des métriques Ray d'un pod worker et laissez-la active.

```shell
kubectl port-forward pod/<RAY_WORKER_POD> 18080:8080
```

**Terminal 2** : Vérifiez l'endpoint et les checks de l'Agent.

```shell
# Show vLLM metrics published by Ray
curl -fsS http://localhost:18080 | grep '^ray_vllm_'

# Look for "ray" and "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

Lorsque vous avez terminé, appuyez sur **Ctrl+C** dans le terminal 1 pour arrêter le transfert.

Une fois la configuration terminée, Datadog collecte les éléments suivants :
- `ray.*` métriques provenant des pods Ray
- `vllm.*` métriques provenant des pods worker Ray qui exécutent vLLM

Si aucune métrique n'apparaît, envoyez du trafic d'inférence vers votre déploiement. vLLM n'émet certaines métriques qu'après avoir traité la première requête.

<div class="alert alert-info">Certaines versions de vLLM ne publient pas de métriques de type jauge, telles que le nombre de requêtes en cours et en attente ou l'utilisation du cache KV, via Ray. Si l'endpoint n'a pas de <code>ray_vllm_num_requests_running</code> ou <code>ray_vllm_kv_cache_usage_perc</code> métriques, les colonnes <strong>Requests</strong> et <strong>GPU Cache</strong> de la page Inference restent vides.</div>

### 5. Activez les centiles sur vos métriques {#5-enable-percentiles-on-your-metrics-2}

Pour représenter graphiquement les percentiles de certaines métriques vLLM, vous devez activer la [fonctionnalité de requête avancée][3] pour les métriques de distribution suivantes :

| Métrique |
|--------|
| `vllm.time_to_first_token.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. Activez le traçage GPU (facultatif) {#6-enable-gpu-tracing-optional-2}

Pour corréler les requêtes d'inférence avec l'activité du GPU, configurez [Continuous Tracing with GPU Monitoring][4] et attribuez des labels à vos charges de travail de workers Ray. Continuous Tracing nécessite CUDA et CUDA Profiling Tools Interface (CUPTI) version 13 ou ultérieure.

[1]: /fr/gpu_monitoring/setup
[2]: /fr/containers/kubernetes/integrations/?tab=annotations
[3]: /fr/metrics/distributions/#enabling-advanced-query-functionality
[4]: /fr/gpu_monitoring/tracing
[5]: /fr/integrations/ray/
[6]: /fr/integrations/vllm/

{{% /tab %}}
{{< /tabs >}}

## Explorez la page Inference {#explore-the-inference-page}

Pour commencer, accédez à [Inference page][2] dans GPU Monitoring.

### Filtrez les déploiements de modèles {#filter-model-deployments}

Utilisez la barre de recherche en haut de la page pour rechercher des déploiements de modèles, des modèles, des moteurs ou des espaces de noms. Vous pouvez également filtrer par {{< ui >}}Env{{< /ui >}}, {{< ui >}}Deployment{{< /ui >}} et {{< ui >}}Kube Namespace{{< /ui >}}, ou cliquer sur {{< ui >}}Filter{{< /ui >}} pour ajouter d'autres filtres.

### Comprenez la latence et le débit {#understand-latency-and-throughput}

Les graphiques en haut de la page affichent la latence et le débit de vos déploiements de modèles :

| Graphique | Description |
|-------|-------------|
| Time to First Token | Temps écoulé entre la réception d'une requête et la génération du premier jeton de sortie. |
| Inter-Token Latency | Temps entre deux jetons de sortie consécutifs. |
| Output Tokens | Jetons de sortie générés par seconde. |

Un pic du temps jusqu'au premier jeton ou de la latence inter-jetons pour un déploiement, sans changement correspondant pour les autres, indique un problème lié à ce déploiement plutôt qu'à l'infrastructure partagée.

### Examinez l'état de santé des déploiements de modèles {#review-model-deployment-health}

Le tableau en bas de la page répertorie chaque déploiement de modèle avec son moteur d'inférence, son environnement et son espace de noms Kubernetes, ainsi que les colonnes suivantes :

| Colonne | Description |
|--------|-------------|
| Output Tok/s | Jetons de sortie générés par seconde. |
| Requests | Nombre moyen de requêtes simultanées en cours pour la période sélectionnée. |
| TTFT | Temps jusqu'au premier jeton. |
| ITL | Latence inter-jetons. |
| Error Rate | Pourcentage de requêtes renvoyant une erreur. |
| Health | État de santé du déploiement, tel que {{< ui >}}Warning{{< /ui >}} ou {{< ui >}}Critical{{< /ui >}}. |
| Monitors | Monitors associés au déploiement. |
| GPU Cache | Utilisation du cache KV du GPU. |

Cliquez sur {{< ui >}}Column Settings{{< /ui >}} pour choisir les colonnes à afficher.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/vllm/
[2]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=inference-monitoring
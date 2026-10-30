---
description: Configurez les checks et les logs d'Autodiscovery pour les charges de
  travail Kubernetes via la ressource personnalisée DatadogInstrumentation au lieu
  des annotations de pod.
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Configurez les intégrations avec Autodiscovery
- link: /getting_started/containers/autodiscovery/
  tag: Documentation
  text: Prise en main d'Autodiscovery
- link: /containers/guide/autodiscovery-examples/
  tag: Documentation
  text: Scénarios et exemples d'Autodiscovery
- link: /containers/cluster_agent/
  tag: Documentation
  text: Agent de cluster Datadog
title: Configurez Autodiscovery avec la CRD DatadogInstrumentation.
---
## Présentation {#overview}

La ressource personnalisée (CR) `DatadogInstrumentation` vous permet de configurer les checks et les logs [Autodiscovery][1] avec une seule ressource Kubernetes au lieu des [annotations de pod][2]. Grâce à cette approche, vous pouvez activer, mettre à jour et supprimer des configurations d'intégration sans modifier votre Agent ou votre application et sans déclencher de déploiement.

Utilisez la CR `DatadogInstrumentation` lorsque vous souhaitez :

- Configurer des checks et des logs sans modifier les manifestes de charge de travail ni ajouter d'annotations.
- Utilisez une spécification de ressource structurée avec validation au lieu de JSON brut dans les annotations.
- Gérez de manière centralisée la configuration d'Autodiscovery par charge de travail en tant que ressource Kubernetes dédiée et versionnée.
- Mettez à jour ou supprimez la configuration d'Autodiscovery sans redémarrer vos pods d'application.

Lorsque vous créez ou mettez à jour une ressource `DatadogInstrumentation`, le [Datadog Cluster Agent][3] valide la cible, signale le statut de la ressource et applique la configuration d'Autodiscovery à la charge de travail ciblée.

## Prérequis {#requirements}

Passez à la **v7.82+** du Datadog Agent et du Cluster Agent et installez la CRD `DatadogInstrumentation` avec l'une des options suivantes :
- Datadog Operator **v1.29** ou version ultérieure.
- Datadog Helm chart **v3.236.0** ou version ultérieure.

## Configuration {#setup}

Le contrôleur `DatadogInstrumentation` s'exécute dans le Cluster Agent et est désactivé par défaut. Activez-le avec le Datadog Operator ou Helm.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Mettez à jour vos dépôts Helm :

```shell
helm repo update
```

2. Mettez à jour le Datadog Operator :

```shell
helm upgrade datadog-operator datadog/datadog-operator
```

3. Ajoutez l'annotation `agent.datadoghq.com/instrumentation-crd-enabled` à votre ressource `DatadogAgent`. Le Cluster Agent doit être en version 7.82.0 ou ultérieure.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/instrumentation-crd-enabled: "true"
spec:
  global:
    [...]
```

4. Appliquez la modification :

```shell
kubectl apply -f datadog-agent.yaml
```

Le Datadog Operator définit automatiquement les variables d'environnement requises pour le Cluster Agent et le Node Agent, et configure le RBAC nécessaire pour le Cluster Agent.

{{% /tab %}}
{{% tab "Helm" %}}

1. Mettez à jour vos dépôts Helm :

```shell
helm repo update
```

2. Dans votre fichier `datadog-values.yaml`, activez le contrôleur :

```yaml
datadog:
  instrumentationCrd:
    enabled: true
```

3. Mettez à niveau votre release :

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

Assurez-vous que la CRD `DatadogInstrumentation` est installée avant de créer des ressources :

```shell
kubectl get crd datadoginstrumentations.datadoghq.com
```

Si vous gérez les CRD Datadog séparément, installez ou mettez à niveau le Datadog CRDs Helm chart :

```shell
helm upgrade --install datadog-crds datadog/datadog-crds
```

## Charges de travail ciblées {#target-workloads}

`DatadogInstrumentation` (DDI) pour l'Autodiscovery se compose de trois parties :

- `spec.targetRef`: identifie la charge de travail à configurer, par `apiVersion`, `kind` et `name`. Votre ressource personnalisée et la charge de travail cible doivent se trouver dans le même espace de nommage.
- `spec.config.checks`: définit les checks d'intégration à exécuter sur votre charge de travail.
- `spec.config.logs`: définit les logs à collecter depuis votre charge de travail.

Vous pouvez cibler les ressources Kubernetes suivantes :

| Cible | Groupe/version/ressource | Version minimale de l'Agent | Notes |
|---|---|---|---|
| Deployment | `apps/v1/deployments` | 7.82.0 | |
| DaemonSet | `apps/v1/daemonsets` | 7.82.0 | |
| StatefulSet | `apps/v1/statefulsets` | 7.82.0 | |
| CronJob | `batch/v1/cronjobs` | 7.82.0 | |
| Job | `batch/v1/jobs` | 7.82.0 | |
| Service | `core/v1/services` | 7.82.0 | Prend uniquement en charge les checks. Voir [Services cibles](#target-services). |
| Rollout | `argoproj.io/v1alpha1/rollouts` | 7.83.0 | Nécessite [Argo Rollouts][7]. |

Cet exemple configure une [intégration Redis][4] pour un `StatefulSet` nommé `redis`, en reproduisant cet [exemple basé sur des annotations][2].

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <YOUR_CR_NAME>
  namespace: <YOUR_TARGETS_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: redis
  config:
    checks:
      - integration: redisdb
        containerName: redis
        initConfig: {}
        instances:
          - host: "%%host%%"
            port: "6379"
            password: "%%env_REDIS_PASSWORD%%"
    logs:
      - containerName: redis
        tags:
          - env:demo
```

Appliquez la ressource :

```shell
kubectl apply -f redis-instrumentation.yaml
```

Vérifiez le statut de la ressource :

```shell
kubectl describe datadoginstrumentation <YOUR_CR_NAME> -n <YOUR_TARGETS_NAMESPACE>
```

Chaque entrée dans `checks` accepte les champs suivants :

`integration`
: Requis. Le nom de l'intégration Datadog à exécuter, par exemple `redisdb`.

`containerName`
: Requis pour les cibles de charge de travail. La valeur doit correspondre à un nom de conteneur dans le pod. Omettez ce champ pour les cibles de service.

`initConfig`
: Optionnel. La section `init_config` pour l'intégration.

`instances`
: Optionnel. Vérifiez les paramètres de l'instance. Chaque instance peut utiliser des [variables de modèle d'Autodiscovery][5], y compris `%%host%%`.

Chaque entrée dans `logs` accepte les mêmes options de collecte de logs que les annotations de log d'Autodiscovery, telles que `tags`, `type` et `path`. Chaque entrée nécessite un `containerName` correspondant à un conteneur dans le pod.

### Services cibles {#target-services}

Cibler un `Service` configure un [check d'endpoint][6] similaire à une annotation sur un service Kubernetes.

- Datadog planifie un check d'endpoint pour chaque endpoint du Service.
- `%%host%%` résout vers l'adresse IP de l'endpoint.
- Si un endpoint est pris en charge par un Pod Kubernetes, Datadog ajoute les tags de Pod collectés pour ce Pod.
- Si un endpoint n'est pas pris en charge par un Pod, Datadog convertit le check en un check de cluster classique sans tags spécifiques au Pod.

<div class="alert alert-info">

Les cibles de Service n'utilisent pas `containerName` ; omettez ce champ.

</div>

Voici un exemple de configuration d'un check nginx pour un `Service` Kubernetes :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <YOUR_CR_NAME>
  namespace: <YOUR_SERVICES_NAMESPACE>
spec:
  targetRef:
    apiVersion: v1
    kind: Service
    name: nginx
  config:
    checks:
      - integration: nginx
        initConfig: {}
        instances:
          - name: "My NGINX Service Endpoints"
            nginx_status_url: "http://%%host%%:%%port%%/status/"
```

## Priorité {#precedence}

Lorsqu'une charge de travail est soumise à plusieurs sources de configuration, le Datadog Agent les résout dans l'ordre suivant (priorité la plus élevée en premier) :

1. Annotations de Pod
2. `DatadogInstrumentation` ressource personnalisée
3. Configuration statique, telle que l'auto-configuration ou les fichiers montés

Si une charge de travail possède déjà une configuration d'Autodiscovery basée sur des annotations pour un check ou une collecte de logs, votre configuration `DatadogInstrumentation` ne la remplace pas.

## Une ressource par cible {#one-resource-per-target}

Une charge de travail ou un Service ne peut être la cible que d'une seule ressource `DatadogInstrumentation` au sein d'un espace de nommage. Un webhook de validation rejette une ressource dont le `targetRef` appartient déjà à une autre ressource, ou dont le `targetRef` pointe vers un type non pris en charge.

## Vérifiez les checks planifiés {#verify-scheduled-checks}

Le statut de la ressource indique si le Cluster Agent a accepté la configuration. Pour vérifier que les checks sont planifiées, exécutez `agent configcheck` sur le Node Agent où s'exécute la charge de travail cible.

Les checks configurés via une ressource `DatadogInstrumentation` répertorient `instrumentation-checks` comme fournisseur de configuration et `datadoginstrumentation:<NAMESPACE>/<CR_NAME>` comme source de configuration. L'exemple suivant montre le résultat pour un check `redisdb` planifié à partir d'une ressource ciblant une charge de travail Redis :

```text
> agent configcheck
# other configs...

=== redisdb check ===
Configuration provider: instrumentation-checks
Configuration source: datadoginstrumentation:cache/redis-instrumentation
Config for instance ID: redisdb:d5dd267b580bc10e
host: 10.244.0.7
password: "********"
port: 6379
Init Config:
{}
Log Config:
- tags:
  - env:demo
Auto-discovery IDs:
* redis
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/containers/autodiscovery/
[2]: /fr/containers/kubernetes/integrations/
[3]: /fr/containers/cluster_agent/
[4]: /fr/integrations/redisdb/
[5]: /fr/containers/guide/template_variables/
[6]: /fr/containers/cluster_agent/endpointschecks/
[7]: https://argoproj.github.io/rollouts/
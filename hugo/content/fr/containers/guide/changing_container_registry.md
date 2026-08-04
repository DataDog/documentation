---
aliases:
- /fr/agent/guide/changing_container_registry
description: Passez d'un registre d'images de container Datadog à un autre selon les
  environnements de déploiement et les besoins.
title: Modifier votre registre de containers
---
Datadog publie des images de container sur le Datadog Container Registry, Google Artifact Registry (GAR), Amazon ECR, Azure ACR et Docker Hub :

{{% container-images-table %}}

## Choisir un registre de containers {#choosing-a-container-registry}

Lors de la sélection d'un registre de containers, Datadog recommande l'approche suivante :

1. **Cache de pull-through privé** : Configurez un cache de pull-through dans votre propre infrastructure. Cela offre le meilleur contrôle sur vos dépendances d'images. Consultez la documentation de votre fournisseur cloud :
   - AWS : [Cache de pull-through Amazon ECR][12]
   - GCP : [Dépôts distants Artifact Registry][13]
   - Azure : [Cache de Azure Container Registry][14]

2. **Registres des fournisseurs cloud** : Si votre déploiement s'effectue chez un fournisseur cloud spécifique (AWS, GCP ou Azure), utilisez le registre public Datadog correspondant :
   - Déploiements AWS : `public.ecr.aws/datadog`
   - Déploiements GCP : `gcr.io/datadoghq`, `eu.gcr.io/datadoghq` ou `asia.gcr.io/datadoghq`
   - Déploiements Azure : `datadoghq.azurecr.io`

3. **Datadog Container Registry** : Utilisez `registry.datadoghq.com` pour plus de simplicité. Ce registre ne nécessite aucune configuration supplémentaire et dispose de limites de débit très élevées. Assurez-vous que votre pare-feu autorise le trafic vers `us-docker.pkg.dev/datadog-prod/public-images`, car le registre peut rediriger les requêtes vers cette URL.

4. **Docker Hub** : À éviter sauf si vous disposez d'un abonnement Docker Hub, car il est soumis à des limites de débit.

<div class="alert alert-info">Le chart Helm de Datadog Agent détermine le registre d'images de l'Agent par défaut à partir de votre site Datadog, du type de cluster et <code>registryMigrationMode</code>Le chart de Datadog Operator est inclus par défaut en tant que dépendance du chart Helm de Datadog Agent. À partir de la version 2.19.0 du chart Datadog Operator, lorsque vous installez l'Operator via cette dépendance, le chart Helm de Datadog Agent's <code>registryMigrationMode</code> s'applique aux images de l'Agent gérées par l'Operator. Le chart Helm de l'Operator lui-même ne définit pas <code>registryMigrationMode</code>; l'image du pod de l'Operator est contrôlée séparément par le chart de l'Operator <code>image.repository</code> valeur.</div>

Pour mettre à jour votre registre, mettez à jour vos valeurs de registre en fonction du type d'environnement de container sur lequel vous effectuez le déploiement. Vous pouvez également utiliser un registre privé, mais vous devez [créer un pull secret][1] pour extraire les images.

## Docker {#docker}

### Mise à jour de votre registre {#updating-your-registry}

Pour mettre à jour votre registre de containers, exécutez la commande pull pour le nouveau registre. Pour voir les commandes Docker pull pour différents registres de containers, consultez les exemples dans la [page de présentation de la documentation Docker][2].

## Kubernetes avec le chart Helm{#kubernetes-with-helm-chart}

Pour mettre à jour votre registre de containers lors du déploiement de Datadog Agent (ou Datadog Cluster Agent) avec le chart Helm Datadog sur Kubernetes (y compris GKE, EKS, AKS et OpenShift), mettez à jour le `values.yaml` pour spécifier un registre différent :

### chart Helm Datadog >= v2.7.0{#datadog-helm-chart-v270}

1. Mettez à jour votre `values.yaml`. Par exemple, pour utiliser Amazon ECR :
    ```yaml
    registry: public.ecr.aws/datadog
    ```
2. Supprimez toutes les surcharges pour `agents.image.repository`, `clusterAgent.image.repository` ou `clusterChecksRunner.image.repository` dans le `values.yaml`.

### chart Helm Datadog < v2.7.0{#datadog-helm-chart-v270-1}

Modifiez le dépôt pour le registre de votre choix. Par exemple, en utilisant le Datadog Container Registry :

```yaml
agents:
  image:
    repository: registry.datadoghq.com/agent

clusterAgent:
  image:
    repository: registry.datadoghq.com/cluster-agent

clusterChecksRunner:
  image:
    repository: registry.datadoghq.com/agent
```

Pour plus d'informations sur l'utilisation du chart Helm Datadog, consultez la [documentation Datadog Kubernetes][3] et l'exemple de fichier [`values.yaml`][4].

Si vous utilisez un registre privé, vous devrez ajouter un pull secret au champ `[key].image.pullSecrets` pour chaque image.

```yaml
agents:
  image:
    pullSecrets:
      - name: PrivateRegistrySecret

clusterAgent:
  image:
    pullSecrets:
    - name: PrivateRegistrySecret

clusterChecksRunner:
  image:
    pullSecrets:
    - name: PrivateRegistrySecret
```

## Kubernetes avec le Datadog Operator {#kubernetes-with-the-datadog-operator}

À partir de la version 2.19.0 du chart Datadog Operator, lorsque le Datadog Operator est installé via la dépendance du chart Helm de Datadog Agent, le `registryMigrationMode` du chart Helm de Datadog Agent peut utiliser `registry.datadoghq.com` pour les images de l'Agent gérées par le Datadog Operator. Les versions précédentes tiraient les images de l'Agent depuis des registres spécifiques au site (`gcr.io/datadoghq`, `eu.gcr.io/datadoghq`, `asia.gcr.io/datadoghq` ou `datadoghq.azurecr.io`). Pour utiliser les registres spécifiques au site précédents pour les images de l'Agent dans ce chemin de déploiement, définissez `registryMigrationMode: ""` dans votre chart Helm de Datadog Agent `values.yaml`. Ce paramètre n'a aucun effet lorsque vous définissez explicitement un registre, et il ne s'agit pas d'un paramètre du chart Helm du Datadog Operator autonome. Pour utiliser un registre différent pour l'image du pod du Datadog Operator, définissez `image.repository` dans votre chart Helm du Datadog Operator `values.yaml`.

Pour mettre à jour votre registre lorsque vous déployez Datadog Agent (ou l'Agent de cluster Datadog) avec Datadog Operator :

1. Mettez à jour le fichier manifeste de Datadog Agent pour surcharger le registre résolu. Par exemple, avec `public.ecr.aws/datadog` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    registry: public.ecr.aws/datadog
  // ..
```

2. Supprimez toutes les surcharges pour les champs `spec.override.nodeAgent.image.name`, `spec.override.clusterAgent.image.name` et `spec.override.clusterChecksRunner.image.name`.
3. Si vous utilisez un registre privé, vous devrez ajouter un pull secret au champ `[key].image.pullSecrets` pour chaque image.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
    clusterAgent:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
    clusterChecksRunner:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
  // ..
```

Pour plus d'informations sur le Datadog Operator, consultez [Déploiement d'un Agent avec le Datadog Operator][5].


### Utilisation d'un autre registre de containers avec Helm {#using-another-container-registry-with-helm}

Pour utiliser un autre registre pour l'image du pod du Datadog Operator, tel que `public.ecr.aws/datadog`, lors de l'installation du chart Helm du Datadog Operator autonome :

Mettez à jour [`values.yaml`][6] avec la nouvelle image :

```yaml
image:
  repository: public.ecr.aws/datadog
```

## ECS {#ecs}

Pour mettre à jour votre registre lors du déploiement sur ECS, dans le fichier `datadog-agent-ecs.json`, modifiez la valeur de la clé `"image"` sous `containerDefinitions` par `"public.ecr.aws/datadog/agent:latest"` :

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

Pour plus d'informations sur le déploiement de Datadog sur ECS, consultez la [documentation Datadog ECS][7] et l'exemple de fichier [`datadog-agent-ecs.json`][7].

## Fargate {#fargate}

Pour mettre à jour votre registre lors du déploiement sur Fargate, mettez à jour l'image dans la définition de tâche Fargate pour utiliser `public.ecr.aws` :

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

La prochaine fois que la tâche démarre, elle effectue une extraction depuis `public.ecr.aws` au lieu de Docker Hub. Pour plus d'informations sur le déploiement sur Fargate, consultez [Déploiement de l'Agent sur ECS][8] et [Déploiement de l'Agent sur EKS][9].

## Cluster Agent {#cluster-agent}

Si vous utilisez le chart Helm pour déployer le Datadog Agent et le Datadog Cluster Agent, suivez les instructions dans [Kubernetes avec le chart Helm](#kubernetes-with-helm-chart), et aucune autre mise à jour n'est nécessaire. La modification du `values.yaml` Helm décrite ci-dessus change le dépôt à partir duquel le Datadog Cluster Agent et le Datadog Agent sont extraits.

Si vous utilisez le Datadog Operator pour déployer le Datadog Cluster Agent, suivez les instructions dans [Kubernetes avec le Datadog Operator](#kubernetes-with-the-datadog-operator), et aucune autre mise à jour n'est nécessaire. Les instructions pour mettre à jour la configuration du Datadog Operator mettent à jour le dépôt à partir duquel le Datadog Cluster Agent et le Datadog Agent sont extraits.

Pour plus d'informations sur le Datadog Cluster Agent, consultez la [documentation du Datadog Cluster Agent][10] et la [documentation de configuration][11].

## Kubernetes Helm pour le Datadog Private Location worker {#kubernetes-helm-for-the-datadog-private-location-worker}

Pour mettre à jour votre registre pour le worker d'emplacement privé, mettez à jour l'image `datadog/synthetics-private-location-worker` vers un registre différent tel que `public.ecr.aws/datadog/synthetics-private-location-worker` ou `gcr.io/datadoghq/synthetics-private-location-worker`.

Pour modifier le dépôt par défaut (`gcr.io/datadoghq`), mettez à jour `values.yaml` avec la nouvelle image :

```yaml
image:
  repository: public.ecr.aws/datadog/synthetics-private-location-worker
```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials
[2]: https://docs.datadoghq.com/fr/agent/docker/?tab=standard
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/?tab=helm
[4]: https://github.com/DataDog/helm-charts/blob/dae884481c5b3c9b67fc8dbd69c944bf3ec955e9/charts/datadog/values.yaml#L19
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/?tab=operator#deploy-an-agent-with-the-operator
[6]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/values.yaml#L28
[7]: https://docs.datadoghq.com/fr/agent/amazon_ecs/?tab=awscli
[8]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-ecs
[9]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-eks
[10]: https://docs.datadoghq.com/fr/agent/cluster_agent/
[11]: https://docs.datadoghq.com/fr/agent/cluster_agent/setup/?tab=helm
[12]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/pull-through-cache.html
[13]: https://cloud.google.com/artifact-registry/docs/repositories/remote-repo
[14]: https://learn.microsoft.com/en-us/azure/container-registry/container-registry-artifact-cache
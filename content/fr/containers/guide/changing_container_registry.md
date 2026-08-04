---
aliases:
- /fr/agent/guide/changing_container_registry
description: Passer d'un registre d'images de conteneur Datadog à un autre pour différents
  environnements de déploiement et exigences
title: Modifier votre registre de conteneurs
---

Datadog publie des images de conteneur dans gcr.io de Google, Azure ACR, ECR d'AWS et sur Docker Hub :

{{% container-images-table %}}

L'extraction depuis le registre ACR, GCR ou ECR fonctionne de la même manière (sauf pour Notary) que l'extraction depuis Docker Hub. Vous pouvez utiliser la même commande (avec des paramètres différents) et obtenir la même image.

**Remarque** : ACR, ECR et GCR ne prennent pas en charge Notary. Si vous vérifiez la signature des images extraites de Docker, cette fonctionnalité ne fonctionne pas sur GCR ou ECR.

Pour mettre à jour votre registre, vous devez modifier les valeurs du registre en fonction du type d'environnement de conteneur sur lequel le déploiement sera effectué.

**Remarque** : vous pouvez également utiliser un registre privé, mais vous devrez créer un secret de type pull pour pouvoir extraire les images du registre privé.
Pour plus d'informations sur la création d'un secret de type pull, consultez la [documentation Kubernetes][1].

## Docker

### Mise à jour de votre registre

Pour mettre à jour votre registre de conteneurs, exécutez la commande pull pour le nouveau registre. Pour voir les commandes Docker pull pour différents registres de conteneurs, consultez les exemples de la [page de présentation de la documentation Docker][2].

## Kubernetes avec le chart Helm

Pour mettre à jour votre registre de conteneurs lorsque vous déployez l'Agent Datadog (ou l'Agent de cluster Datadog) avec le chart helm Datadog sur Kubernetes (y compris GKE, EKS, AKS et OpenShift), modifiez le registre spécifié dans le fichier `values.yaml` :

### Chart Helm Datadog >= v2.7.0

1. Mettez à jour votre fichier `values.yaml` :
    ```yaml
    registry: gcr.io/datadoghq
    ```
2. Supprimez les éventuelles valeurs personnalisées définies pour `agents.image.repository`, `clusterAgent.image.repository` ou `clusterChecksRunner.image.repository` dans `values.yaml`.

### Chart Helm Datadog < v2.7.0

Définissez le référentiel `gcr.io` :

```yaml
agents:
  image:
    repository: gcr.io/datadoghq/agent

clusterAgent:
  image:
    repository: gcr.io/datadoghq/cluster-agent

clusterChecksRunner:
  image:
    repository: gcr.io/datadoghq/agent
```

Pour plus d'informations sur l'utilisation du chart Helm Datadog, consultez la [documentation Kubernetes de Datadog][3] et l'exemple de fichier [`values.yaml`][4].

Si vous utilisez un registre privé, vous devrez ajouter un secret de type pull au champ `[key].image.pullSecrets` pour chaque image.
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

## Kubernetes avec l'Operator Datadog

Pour mettre à jour votre registre lors du déploiement de l'Agent Datadog (ou de l'Agent de cluster Datadog) avec le Datadog Operator :

1. Mettez à jour le fichier de manifeste de l'Agent Datadog pour remplacer le registre par défaut (`gcr.io/datadoghq`). Par exemple, avec `public.ecr.aws/datadog` :
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    registry: gcr.io/datadoghq
  // ..
```

2. Supprimez toutes les substitutions pour les champs `spec.override.nodeAgent.image.name`, `spec.override.clusterAgent.image.name` et `spec.override.clusterChecksRunner.image.name`.
3. Si vous utilisez un registre privé, vous devrez ajouter un secret de type pull au champ `[key].image.pullSecrets` pour chaque image.
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

Pour plus d'informations sur le Datadog Operator, consultez la section [Déployer un Agent avec l'opérateur][5].


### Utiliser un autre registre de conteneurs avec Helm

Vous pouvez également passer du registre par défaut `gcr.io/datadoghq` à un autre registre, tel que `datadoghq.azurecr.io` lors de l'installation de l'opérateur avec le chart Helm :

Mettez à jour [`values.yaml`][6] avec la nouvelle image :

```yaml
image:
  repository: datadoghq.azurecr.io
```

## ECS

Pour mettre à jour votre registre lors du déploiement sur ECS, dans le fichier `datadog-agent-ecs.json`, modifiez la valeur de la clé `"image"` sous `containerDefinitions` en `"public.ecr.aws/datadog/agent:latest"` :

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

Pour plus d'informations sur le déploiement de Datadog sur ECS, consultez la [documentation ECS de Datadog][7] et l'exemple de fichier [`datadog-agent-ecs.json`][7].

## Fargate

Pour mettre à jour votre registre lors d'un déploiement sur Fargate, mettez à jour l'image dans la définition de tâche Fargate pour la définir sur `public.ecr.aws` :

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

Au prochain démarrage de la tâche, l'image sera récupérée depuis `public.ecr.aws` au lieu de Docker Hub. Pour en savoir plus sur le déploiement de Datadog sur Fargate, consultez [Déployer l'Agent sur ECS][8] et [Déployer l'Agent sur EKS][9].

## Agent de cluster

Si vous utilisez le chart Helm pour déployer l'Agent Datadog et l'Agent de cluster Datadog, suivez les instructions de la section [Kubernetes avec le chart Helm](#kubernetes-avec-le-chart-helm). Aucune autre modification n'est nécessaire. La modification du référentiel dans le fichier Helm `values.yaml` décrite précédemment s'appliquera aussi bien à l'Agent de cluster qu'à l'Agent Datadog.

Si vous utilisez l'Operator Datadog pour déployer l'Agent de cluster Datadog, suivez les instructions de la section [Kubernetes avec l'Operator Datadog](#kubernetes-avec-l-operator-datadog). Aucune autre modification n'est nécessaire. La mise à jour du référentiel dans la configuration de l'Operator s'appliquera aussi bien à l'Agent de cluster qu'à l'Agent Datadog.

Pour en savoir plus sur l'Agent de cluster Datadog, consultez la [documentation relative à l'Agent de cluster][10] et les [instructions de configuration][11].

## Kubernetes via Helm pour le worker d'emplacement privé Datadog

Pour modifier votre registre pour le worker d'emplacement privé, mettez à jour l'image `datadog/synthetics-private-location-worker` et définissez-la sur `public.ecr.aws/datadog/synthetics-private-location-worker` ou `gcr.io/datadoghq/synthetics-private-location-worker`.

Pour modifier le référentiel par défaut (`gcr.io/datadoghq`), mettez à jour le fichier `values.yaml` avec la nouvelle image :

```yaml
image:
  repository: gcr.io/datadoghq/synthetics-private-location-worker
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
---
title: Modifier votre registre de conteneurs
kind: guide
---
Datadog publie des images de conteneur sur Google gcr.io, AWS ECR et Docker Hub :

| dockerhub.io                               | grc.io                                              | public.ecr.aws                                            |
|--------------------------------------------|-----------------------------------------------------|-----------------------------------------------------------|
| datadog/agent                              | gcr.io/datadoghq/agent                              | public.ecr.aws/datadog/agent                              |
| datadog/cluster-agent                      | gcr.io/datadoghq/cluster-agent                      | public.ecr.aws/datadog/cluster-agent                      |
| datadog/dogstatsd                          | gcr.io/datadoghq/dogstatsd                          | public.ecr.aws/datadog/dogstatsd                          |
| datadog/synthetics-private-location-worker | gcr.io/datadoghq/synthetics-private-location-worker | public.ecr.aws/datadog/synthetics-private-location-worker |


Le téléchargement d'images depuis le registre GCR ou ECR se fait de la même façon que depuis Docker Hub (sauf pour Notary). Vous pouvez utiliser la même commande (avec des paramètres différents) et récupérer la même image. 

**Remarque** : ECR et GCR ne prennent pas en charge Notary. Si vous souhaitez vérifier la signature d'images téléchargées depuis Docker, cette fonctionnalité ne fonctionne pas sur GCR ou ECR.

Pour mettre à jour votre registre, vous devez modifier les valeurs du registre en fonction du type d'environnement de conteneur sur lequel le déploiement sera effectué.

## Docker

### Mise à jour de votre registre

Pour mettre à jour votre registre de conteneurs, exécutez la commande pull sur le nouveau registre. Pour connaître les différentes commandes pull en fonction du registre de conteneurs, consultez les exemples donnés sur la [page de présentation de Docker][1].

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
    repository: grc.io/datadoghq/agent  

clusterAgent:
  image:
    repository: grc.io/datadoghq/cluster-agent

clusterChecksRunner:
  image:
    repository: grc.io/datadoghq/agent
```

Pour en savoir plus sur l'utilisation du chart Helm Datadog, consultez la [documentation de Datadog sur Kubernetes][2] et l'exemple de fichier [`values.yaml`][3].

## Kubernetes avec l'Operator Datadog

Pour mettre à jour votre registre lorsque vous déployez l'Agent Datadog (ou l'Agent de cluster Datadog) avec l'Operator Datadog :

1. Mettez à jour le fichier manifeste de l'Agent Datadog afin de remplacer le registre par défaut (`gcr.io/datadoghq`). Par exemple, pour `public.ecr.aws/datadog` :

    ```yaml
    apiVersion: datadoghq.com/v1alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      // ..
      registry: gcr.io/datadoghq
    ```
2. Supprimez les éventuelles valeurs personnalisées définies pour les champs `spec.agents.image.name`, `spec.clusterAgent.image.name` et `spec.clusterChecksRunner.image.name`.

Pour en savoir plus sur l'Operator Datadog, consultez [Déployer un Agent avec l'Operator][4].


### Utilisation du registre public.ecr.aws/datadog avec Helm

Vous pouvez également modifier le registre par défaut, `gcr.io/datadoghq`, pour le définir sur le registre `public.ecr.aws/datadog` lorsque vous installez l'Operator avec le chart Helm. Pour passer au registre `public.ecr.aws/datadog` :

Mettez à jour le fichier [`values.yaml`][5] avec la nouvelle image :

```yaml
image:
  repository: public.ecr.aws/datadog
```

## ECS

Pour mettre à jour votre registre lors d'un déploiement sur ECS, dans le fichier `datadog-agent-ecs.json`, modifiez la valeur de la clé `"image"` sous `containerDefinitions` pour la définir sur `"public.ecr.aws/datadog/agent:latest"` : 

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

Pour en savoir plus sur le déploiement de Datadog sur ECS, consultez la [documentation de Datadog sur ECS][6] et l'exemple de [fichier `datadog-agent-ecs.json`][6].

## Fargate

Pour mettre à jour votre registre lors d'un déploiement sur Fargate, mettez à jour l'image dans la définition de tâche Fargate pour la définir sur `public.ecr.aws` :

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

Au prochain démarrage de la tâche, l'image sera récupérée depuis `public.ecr.aws` au lieu de Docker Hub. Pour en savoir plus sur le déploiement de Datadog sur Fargate, consultez [Déployer l'Agent sur ECS][7] et [Déployer l'Agent sur EKS][8].


## Agent de cluster

Si vous utilisez le chart Helm pour déployer l'Agent Datadog et l'Agent de cluster Datadog, suivez les instructions de la section [Kubernetes avec le chart Helm](#kubernetes-avec-le-chart-helm). Aucune autre modification n'est nécessaire. La modification du référentiel dans le fichier Helm `values.yaml` décrite précédemment s'appliquera aussi bien à l'Agent de cluster qu'à l'Agent Datadog.

Si vous utilisez l'Operator Datadog pour déployer l'Agent de cluster Datadog, suivez les instructions de la section [Kubernetes avec l'Operator Datadog](#kubernetes-avec-l-operator-datadog). Aucune autre modification n'est nécessaire. La mise à jour du référentiel dans la configuration de l'Operator s'appliquera aussi bien à l'Agent de cluster qu'à l'Agent Datadog.

Pour en savoir plus sur l'Agent de cluster Datadog, consultez la [documentation relative à l'Agent de cluster][9] et les [instructions de configuration][10].

## Kubernetes via Helm pour le worker d'emplacement privé Datadog

Pour modifier votre registre pour le worker d'emplacement privé, mettez à jour l'image `datadog/synthetics-private-location-worker` et définissez-la sur `public.ecr.aws/datadog/synthetics-private-location-worker` ou `gcr.io/datadoghq/synthetics-private-location-worker`.

Pour modifier le référentiel par défaut (`gcr.io/datadoghq`), mettez à jour le fichier `values.yaml` avec la nouvelle image :

```yaml
image:
  repository: gcr.io/datadoghq/synthetics-private-location-worker
```

[1]: https://docs.datadoghq.com/fr/agent/docker/?tab=standard
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/?tab=helm
[3]: https://github.com/DataDog/helm-charts/blob/dae884481c5b3c9b67fc8dbd69c944bf3ec955e9/charts/datadog/values.yaml#L19
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/?tab=operator#deploy-an-agent-with-the-operator
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/values.yaml#L28
[6]: https://docs.datadoghq.com/fr/agent/amazon_ecs/?tab=awscli
[7]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-ecs
[8]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-eks
[9]: https://docs.datadoghq.com/fr/agent/cluster_agent/
[10]: https://docs.datadoghq.com/fr/agent/cluster_agent/setup/?tab=helm
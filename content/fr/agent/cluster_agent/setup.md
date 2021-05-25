---
title: Configuration de l'Agent de cluster
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-cluster-agent/'
    tag: Blog
    text: Présentation de l'Agent de cluster Datadog
  - link: 'https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/'
    tag: Blog
    text: Mettre à l'échelle vos charges de travail Kubernetes avec n'importe quelle métrique Datadog
  - link: /agent/cluster_agent/clusterchecks/
    tag: Documentation
    text: Exécuter des checks de cluster avec Autodiscovery
  - link: /agent/kubernetes/daemonset_setup/
    tag: Documentation
    text: Exécuter l'Agent avec un DaemonSet Kubernetes
  - link: /agent/cluster_agent/troubleshooting/
    tag: Documentation
    text: Dépannage de l'Agent de cluster Datadog
---
Pour configurer l'Agent de cluster Datadog sur votre cluster Kubernetes, suivez ces étapes :

1. [Configurez l'Agent de cluster Datadog](#configurer-l-agent-de-cluster-datadog).
2. [Configurez votre Agent de façon à ce qu'il communique avec l'Agent de cluster Datadog.](#configure-the-datadog-agent)

## Configurer l'Agent de cluster Datadog

### Configurer les autorisations RBAC

L'Agent de cluster Datadog a besoin des autorisations RBAC adéquates pour fonctionner :

1. Examinez les manifestes dans le [dossier RBAC de l'Agent de cluster Datadog][1]. Notez que lorsque vous utilisez l'Agent de cluster, vos Agents de nœud ne peuvent pas interagir avec le serveur d'API Kubernetes ; seul l'Agent de cluster peut le faire.

2. Pour configurer les autorisations RBAC de l'Agent de cluster, appliquez les manifestes suivants. Il se peut que vous ayez déjà effectué cette opération lors de la configuration du [daemonset de l'Agent de nœud][2].

  ```shell
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/rbac.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml"
  ```

  Cela permet de créer les objets `ServiceAccount`, `ClusterRole` et `ClusterRoleBinding` appropriés pour l'Agent de cluster, et de mettre à jour l'objet `ClusterRole` pour l'Agent de nœud.

Si vous utilisez Azure Kubernetes Service (AKS), vous aurez besoin de permissions supplémentaires. Consultez la FAQ dédiée pour les [RBAC sur AKS][3] pour le DCA.

### Sécuriser les communications entre l'Agent de cluster et l'Agent

Utilisez l'une des options suivantes pour sécuriser les communications entre l'Agent Datadog et l'Agent de cluster Datadog.

* Créez un secret et accédez à celui-ci avec une variable d'environnement.
* Définissez un token dans une variable d'environnement.
* Utilisez une ConfigMap pour gérer vos secrets.

Si vous définissez la valeur sans utiliser de secret, le token est alors lisible dans le `PodSpec`.

{{< tabs >}}
{{% tab "Secret" %}}

1. Exécutez la commande suivante pour créer un token de secret. Votre token doit comporter au moins 32 caractères.

    ```shell
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. Exécutez cette commande d'une ligne :

    ```shell
    kubectl create secret generic datadog-cluster-agent --from-literal=token='<ThirtyX2XcharactersXlongXtoken>'
    ```

   Vous pouvez également modifier la valeur du secret dans le fichier `agent-secret.yaml` qui se trouve dans le [répertoire manifest/cluster-agent][1] ou le créer avec :

    `kubectl create -f Dockerfiles/manifests/cluster-agent/agent-secret.yaml`

3. Utilisez ce secret avec la variable d'environnement `DD_CLUSTER_AGENT_AUTH_TOKEN` dans les manifestes de l'Agent de cluster. Consultez la section [Étape 3 : Créer l'Agent de cluster et son service](#etape-3-creer-l-agent-de-cluster-et-son-service) et la section [Étape 2 : Activer l'Agent Datadog](#etape-2-activer-l-agent-datadog).

[1]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/agent-secret.yaml
{{% /tab %}}
{{% tab "Variable d'environnement" %}}

1. Exécutez la commande suivante pour créer un token de secret. Votre token doit comporter au moins 32 caractères.

    ```shell
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. Utilisez ce secret avec la variable d'environnement `DD_CLUSTER_AGENT_AUTH_TOKEN` dans les manifestes de l'Agent de cluster et de l'Agent basé sur des nœuds.

    ```yaml
              - name: DD_CLUSTER_AGENT_AUTH_TOKEN
                value: "<ThirtyX2XcharactersXlongXtoken>"
    ```

{{% /tab %}}
{{% tab "ConfigMap" %}}

1. Exécutez la commande suivante pour créer un token de secret. Votre token doit comporter au moins 32 caractères.

    ```shell
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. Créez votre `datadog-cluster.yaml` avec les variables de votre choix dans le fichier `datadog.yaml` et créez la ConfigMap comme suit :

    ```shell
    kubectl create configmap dca-yaml --from-file datadog-cluster.yaml
    ```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : cela doit être défini dans le manifeste de l'Agent de cluster **et** celui de l'Agent de nœud.

### Créer l'Agent de cluster et son service

1. Téléchargez les manifestes suivants :

  * [`agent-services.yaml` : le manifeste du service de l'Agent de cluster][4]
  * [`secrets.yaml` : le secret contenant la clé d'API Datadog][5]
  * [`cluster-agent-deployment.yaml` : le manifeste de l'Agent de cluster][6]
  * [`install_info-configmap.yaml` : installer la Configmap Info][7]

2. Dans le manifeste `secrets.yaml`, remplacez `PUT_YOUR_BASE64_ENCODED_API_KEY_HERE` par [votre clé d'API Datadog][8] encodée en base64 :

    ```shell
    echo -n '<Your API key>' | base64
    ```

3. Dans le manifeste `cluster-agent-deployment.yaml`, définissez le token conformément à la section [Étape 2 : Sécuriser les communications entre l'Agent de cluster et l'Agent](#etape-2-securiser-les-communications-entre-l-agent-de-cluster-et-l-agent). Le format dépend de la façon dont vous configurez votre secret ; les instructions se trouvent directement dans le manifeste.
4. Exécutez : `kubectl apply -f agent-services.yaml`
5. Exécutez : `kubectl apply -f secrets.yaml`
6. Exécutez : `kubectl apply -f install_info-configmap.yaml`
6. Enfin, déployez l'Agent de cluster Datadog : `kubectl apply -f cluster-agent-deployment.yaml`

**Remarque** : dans votre Agent de cluster Datadog, définissez `<DD_SITE>` sur votre site Datadog : {{< region-param key="dd_site" code="true" >}}. Valeur par défaut : `datadoghq.com`.

### Vérification

À ce stade, vous devriez voir ce qui suit :

```shell
-> kubectl get deploy

NAME                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
datadog-cluster-agent   1         1         1            1           1d

-> kubectl get secret

NAME                         TYPE                                  DATA      AGE
datadog-agent-cluster-agent  Opaque                                1         1d

-> kubectl get pods -l app=datadog-cluster-agent

datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

-> kubectl get service -l app=datadog-cluster-agent

NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

**Remarque** : si l'Agent Datadog est déjà exécuté, vous devrez peut-être appliquer le [manifeste agent-rbac.yaml](#etape-1-configurer-les-autorisations-rbac) pour que l'Agent de cluster puisse s'exécuter.

## Configurer l'Agent Datadog

Une fois l'Agent de cluster Datadog configuré, configurez votre Agent Datadog de façon à le faire communiquer avec l'Agent de cluster Datadog.

### Configuration

#### Configurer les autorisations RBAC des Agents basés sur des nœuds

1. Téléchargez le [manifeste agent-rbac.yaml][9]. **Remarque** : lorsque vous utilisez l'Agent de cluster, vos Agents de nœud ne peuvent pas interagir avec le serveur d'API Kubernetes ; seul l'Agent de cluster peut le faire.

2. Exécutez : `kubectl apply -f agent-rbac.yaml`

#### Activer l'Agent Datadog

1. Téléchargez le [manifeste daemonset.yaml][10].

3. Dans le manifeste `daemonset.yaml`, remplacez `<DD_SITE>` par votre site Datadog : `{{< region-param key="dd_site">}}`. Valeur par défaut : `datadoghq.com`.

4. Dans le manifeste `daemonset.yaml`, définissez le token conformément à la section [Étape 2 : Sécuriser les communications entre l'Agent de cluster et l'Agent](#etape-2-securiser-les-communications-entre-l-agent-de-cluster-et-l-agent). Le format dépend de la façon dont vous configurez votre secret ; les instructions se trouvent directement dans le manifeste.

5. Dans le manifeste `daemonset.yaml`, vérifiez que la variable d'environnement `DD_CLUSTER_AGENT_ENABLED` est bien définie sur `true`.

6. (Facultatif) Si votre cluster comprend un seul environnement, vous pouvez également définir la variable `<DD_ENV>` dans `agent.yaml`.

7. Créez le DaemonSet avec cette commande : `kubectl apply -f daemonset.yaml`

### Vérification

Exécutez :

```shell
kubectl get pods | grep agent
```

Vous devriez voir ce qui suit :

```shell
datadog-agent-4k9cd                      1/1       Running   0          2h
datadog-agent-4v884                      1/1       Running   0          2h
datadog-agent-9d5bl                      1/1       Running   0          2h
datadog-agent-dtlkg                      1/1       Running   0          2h
datadog-agent-jllww                      1/1       Running   0          2h
datadog-agent-rdgwz                      1/1       Running   0          2h
datadog-agent-x5wk5                      1/1       Running   0          2h
[...]
datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h
```

La transmission des événements Kubernetes à votre compte Datadog commence alors. Les métriques pertinentes recueillies par vos Agents se voient assignées le tag correspondant dans les métadonnées de cluster.

#### Surveillance des services AWS gérés

Pour surveiller un service AWS géré comme MSK, ElastiCache ou RDS, créez un pod avec un rôle IAM attribué via la serviceAccountAnnotation dans le chart Helm.

{{< code-block lang="yaml" >}}
clusterChecksRunner:
  enabled: true
  rbac:
    # clusterChecksRunner.rbac.create -- Si true, créer et utiliser des ressources RBAC
    create: true
    dedicated: true
    serviceAccountAnnotations:
      eks.amazonaws.com/role-arn: arn:aws:iam::***************:role/ROLE-NAME-WITH-MSK-READONLY-POLICY
clusterAgent:
  confd:
    amazon_msk.yaml: |-
      cluster_check: true
      instances:
        - cluster_arn: arn:aws:kafka:us-west-2:*************:cluster/gen-kafka/*******-8e12-4fde-a5ce-******-3
          region_name: us-west-2
{{< /code-block >}}



## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/cluster-agent
[2]: /fr/agent/kubernetes/
[3]: /fr/agent/faq/rbac-for-dca-running-on-aks-with-helm/
[4]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/agent-services.yaml
[5]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/secrets.yaml
[6]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-deployment.yaml
[7]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/install_info-configmap.yaml
[8]: https://app.datadoghq.com/account/settings#api
[9]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
[10]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/daemonset.yaml
---
title: Configuration de l'Agent de cluster
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-cluster-agent/"
  tag: Blog
  text: Présentation de l'Agent de cluster Datadog
- link: "https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/"
  tag: Blog
  text: Mettre à l'échelle vos charges de travail Kubernetes avec n'importe quelle métrique Datadog
- link: /agent/autodiscovery/clusterchecks
  tag: Documentation
  text: Exécuter des checks de cluster avec Autodiscovery
- link: agent/kubernetes/daemonset_setup
  tag: Documentation
  text: Exécuter l'Agent avec un DaemonSet Kubernetes
- link: /agent/cluster_agent/troubleshooting
  tag: Documentation
  text: Dépannage de l'Agent de cluster Datadog
---

Pour configurer l'Agent de cluster Datadog sur votre cluster Kubernetes, suivez ces étapes :

1. [Configurez l'Agent de cluster Datadog](#configurer-l-agent-de-cluster-datadog).
2. [Configurez votre Agent de façon à ce qu'il communique avec l'Agent de cluster Datadog.](#configure-the-datadog-agent)

## Configurer l'Agent de cluster Datadog
### Étape 1 : Configurer les autorisations RBAC

L'Agent de cluster Datadog a besoin des autorisations RBAC adéquates pour fonctionner :

1. Examinez les manifestes dans le [dossier RBAC de l'Agent de cluster Datadog][1]. Notez que lorsque vous utilisez l'Agent de cluster, vos Agents de nœud ne peuvent pas interagir avec le serveur d'API Kubernetes ; seul l'Agent de cluster peut le faire.

2. Pour configurer les autorisations RBAC de l'Agent de cluster, appliquez les manifestes suivants :

  ```
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"
  kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
  ```

  Cela permet de créer les objets `ServiceAccount`, `ClusterRole` et `ClusterRoleBinding` appropriés pour l'Agent de cluster.

### Étape 2 : Sécuriser les communications entre l'Agent de cluster et l'Agent

Utilisez l'une des options suivantes pour sécuriser les communications entre l'Agent Datadog et l'Agent de cluster Datadog.

* Créez un secret et accédez à celui-ci avec une variable d'environnement.
* Définissez un token dans une variable d'environnement.
* Utilisez une ConfigMap pour gérer vos secrets.

Si vous définissez la valeur sans utiliser de secret, le token est alors lisible dans le `PodSpec`.

{{< tabs >}}
{{% tab "Secret" %}}

1. Exécutez la commande suivante pour créer un token de secret :

    ```
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. Exécutez cette commande d'une ligne :

    ```
    kubectl create secret generic datadog-auth-token --from-literal=token=<ThirtyX2XcharactersXlongXtoken>
    ```

    Vous pouvez également spécifier le token dans le fichier `dca-secret.yaml` qui se trouve dans le [répertoire `manifest/cluster-agent`][1].

3. Utilisez ce secret avec la variable d'environnement `DD_CLUSTER_AGENT_AUTH_TOKEN` dans les manifestes de l'Agent de cluster. Consultez la section [Étape 3 : Créer l'Agent de cluster et son service](#etape-3-creer-l-agent-de-cluster-et-son-service) et la section [Étape 2 : Activer l'Agent Datadog](#etape-2-activer-l-agent-datadog).

[1]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/dca-secret.yaml
{{% /tab %}}
{{% tab "Variable d'environnement" %}}

1. Exécutez la commande suivante pour créer un token de secret :

    ```
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. Utilisez ce secret avec la variable d'environnement `DD_CLUSTER_AGENT_AUTH_TOKEN` dans les manifestes de l'Agent de cluster et de l'Agent basé sur des nœuds.

    ```
              - name: DD_CLUSTER_AGENT_AUTH_TOKEN
                value: "<ThirtyX2XcharactersXlongXtoken>"
    ```

{{% /tab %}}
{{% tab "ConfigMap" %}}

1. Exécutez la commande suivante pour créer un token de secret :

    ```
    echo -n '<ThirtyX2XcharactersXlongXtoken>' | base64
    ```

2. Créez votre `datadog-cluster.yaml` avec les variables de votre choix dans le fichier `datadog.yaml` et créez la ConfigMap comme suit :

    ```
    kubectl create configmap dca-yaml --from-file datadog-cluster.yaml
    ```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : cela doit être défini dans le manifeste de l'Agent de cluster **et** celui de l'Agent du nœud.

### Étape 3 : Créer l'Agent de cluster et son service

1. Téléchargez les manifestes suivants :

  * [`datadog-cluster-agent_service.yaml` : le manifeste du service de l'Agent de cluster.][2]
  * [`cluster-agent.yaml` : le manifeste de l'Agent de cluster][3]

2. Dans le manifeste `cluster-agent.yaml`, remplacez `<DD_API_KEY>` par [votre clé d'API Datadog][4]:

3. Dans le manifeste `cluster-agent.yaml`, définissez le token conformément à la section [Étape 2 : Sécuriser les communications entre l'Agent de cluster et l'Agent](#etape-2-securiser-les-communications-entre-l-agent-de-cluster-et-l-agent). Le format dépend de la façon dont vous configurez votre secret ; les instructions se trouvent directement dans le manifeste.

4. Exécutez : `kubectl apply -f datadog-cluster-agent_service.yaml`

5. Enfin, déployez l'Agent de cluster Datadog : `kubectl apply -f cluster-agent.yaml`

### Étape 4 : Vérification

À ce stade, vous devriez voir ce qui suit :

```
-> kubectl get deploy

NAME                    DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
datadog-cluster-agent   1         1         1            1           1d

-> kubectl get secret

NAME                   TYPE                                  DATA      AGE
datadog-auth-token     Opaque                                1         1d

-> kubectl get pods -l app=datadog-cluster-agent

datadog-cluster-agent-8568545574-x9tc9   1/1       Running   0          2h

-> kubectl get service -l app=datadog-cluster-agent

NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)          AGE
datadog-cluster-agent   ClusterIP      10.100.202.234   none               5005/TCP         1d
```

## Configurer l'Agent Datadog

Une fois l'Agent de cluster Datadog configuré, configurez votre Agent Datadog de façon à le faire communiquer avec l'Agent de cluster Datadog.

### Implémentation
#### Étape 1 : Configurer les autorisations RBAC des Agents de nœud

1. Téléchargez le manifeste [`rbac-agent.yaml`][5]. Notez que lorsque vous utilisez l'Agent de cluster, vos Agents de nœud ne peuvent pas interagir avec le serveur d'API Kubernetes ; seul l'Agent de cluster peut le faire.

2. Exécutez : `kubectl apply -f rbac-agent.yaml`

#### Étape 2 : Activer l'Agent Datadog

1. Téléchargez le [manifeste `agent.yaml`][6].

2. Dans le manifeste `agent.yaml`, remplacez `<DD_API_KEY>` par [votre clé d'API Datadog][4] :

3. Dans le manifeste `agent.yaml`, définissez le token conformément à la section [Étape 2 : Sécuriser les communications entre l'Agent de cluster et l'Agent](#etape-2-securiser-les-communications-entre-l-agent-de-cluster-et-l-agent). Le format dépend de la façon dont vous configurez votre secret ; les instructions se trouvent directement dans le manifeste.

4. Créez le DaemonSet avec cette commande : `kubectl apply -f agent.yaml`

### Vérification

Exécutez :

```
kubectl get pods | grep agent
```

Vous devriez voir ce qui suit :

```
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

La transmission des événements Kubernetes à votre compte Datadog commence alors. Les métriques pertinentes recueillies par vos Agents se voient assigner le tag correspondant dans les métadonnées de cluster.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/manifests/cluster-agent/rbac
[2]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/datadog-cluster-agent_service.yaml
[3]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/cluster-agent.yaml
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/cluster-agent/rbac/rbac-agent.yaml
[6]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/agent.yaml

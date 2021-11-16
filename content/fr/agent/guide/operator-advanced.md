---
title: Configuration avancée de l'Operator Datadog
kind: faq
further_reading:
  - link: agent/kubernetes/log
    tag: Documentation
    text: Datadog et Kubernetes
---

<div class="alert alert-warning">L'Operator Datadog est en bêta publique. Si vous souhaitez nous faire part de vos remarques ou de vos questions, contactez l'<a href="/help">assistance Datadog</a>.</div>

[L'Operator Datadog][1] est une fonctionnalité permettant de déployer l'Agent Datadog sur Kubernetes et OpenShift. L'Operator transmet des données sur le statut, la santé et les erreurs du déploiement dans le statut de sa ressource personnalisée. Ses paramètres de niveau supérieur permettent également de réduire les erreurs de configuration.

## Prérequis

L'utilisation de l'Operator Datadog nécessite les prérequis suivants :

- **Cluster Kubernetes version >= v1.14.X** : les tests ont été réalisés sur les versions >= `1.14.0`. Néanmoins, les versions `>= v1.11.0` devraient également fonctionner. Pour les versions plus anciennes, en raison de la prise en charge limitée du CRD, il se peut que l'Operator ne fonctionne pas comme prévu.
- [`Helm`][2] pour le déploiement de `datadog-operator`.
- [Interface de ligne de commande `Kubectl`][3] pour l'installation de `datadog-agent`.

## Déployer l'Operator Datadog

Pour utiliser l'Operator Datadog, déployez-le dans votre cluster Kubernetes. Ensuite, créez une ressource Kubernetes `DatadogAgent` qui contient la configuration du déploiement Datadog :

1. Ajoutez le référentiel du Helm Datadog :
  ```
  helm repo add datadog https://helm.datadoghq.com
  ```

2. Installez l'Operator Datadog :
  ```
  helm install my-datadog-operator datadog/datadog-operator
  ```

## Déployer les Agents Datadog avec l'Operator

Après avoir déployé l'Operator Datadog, créez la ressource `DatadogAgent` qui déclenche le déploiement de l'Agent Datadog dans votre cluster Kubernetes. Lorsque cette ressource est créée dans l'espace de nommage `Datadog-Operator`, l'Agent est déployé en tant que `DaemonSet` sur chaque `Node` de votre cluster.

Créez le manifeste `datadog-agent.yaml` à partir de l'un des modèles suivants :

* [Manifeste avec activation des logs, de l'APM, des processus et de la collecte des métriques][4]
* [Manifeste avec activation des logs, de l'APM et de la collecte des métriques][5]
* [Manifeste avec activation des logs et de la collecte des métriques][6]
* [Manifeste avec activation de l'APM et de la collecte des métriques][7]
* [Manifeste avec Agent de cluster][8]
* [Manifeste avec tolérances][9]

Remplacez `<CLÉ_API_DATADOG>` et `<CLÉ_APPLICATION_DATADOG>` par vos [clés d'API et d'application Datadog][10], puis lancez l'installation de l'Agent avec la commande suivante :

```shell
$ kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog created
```

Vous pouvez vérifier l'état de la ressource `DatadogAgent` avec ce qui suit :

```shell
kubectl get -n $DD_NAMESPACE dd datadog
NAME            ACTIVE   AGENT             CLUSTER-AGENT   CLUSTER-CHECKS-RUNNER   AGE
datadog-agent   True     Running (2/2/2)                                           110m
```

Dans un cluster comportant 2 nœuds worker, les pods de l'Agent créés devraient s'afficher sur chaque nœud.

```shell
$ kubectl get -n $DD_NAMESPACE daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get -n $DD_NAMESPACE pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```


## Nettoyage

La commande suivante permet de supprimer toutes les ressources Kubernetes créées par les instructions ci-dessus :

```shell
kubectl delete datadogagent datadog
helm delete datadog
```

### Tolérances

Mettez à jour votre fichier `datadog-agent.yaml` avec la configuration suivante pour ajouter la tolérance dans le `Daemonset.spec.template` de votre `DaemonSet` :

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: "<CLÉ_API_DATADOG>"
    appKey: "<CLÉ_APPLICATION_DATADOG>"
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    config:
      tolerations:
       - operator: Exists
```

Appliquez cette nouvelle configuration :

```shell
$ kubectl apply -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog updated
```

La mise à jour du DaemonSet peut être validée en observant la nouvelle valeur de pod souhaitée :

```shell
$ kubectl get -n $DD_NAMESPACE daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   3         3         3       3            3           <none>          7m31s

$ kubectl get -n $DD_NAMESPACE pod
NAME                                         READY   STATUS     RESTARTS   AGE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running    0          15h
datadog-agent-5ctrq                          1/1     Running    0          7m43s
datadog-agent-lkfqt                          0/1     Running    0          15s
datadog-agent-zvdbw                          1/1     Running    0          8m1s
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-all.yaml
[5]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-logs-apm.yaml
[6]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-logs.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-apm.yaml
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-clusteragent.yaml
[9]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-tolerations.yaml
[10]: https://app.datadoghq.com/account/settings#api

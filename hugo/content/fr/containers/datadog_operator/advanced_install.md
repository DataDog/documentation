---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
title: Installation du Datadog Operator
---
Ce document contient des informations détaillées sur l'installation du Datadog Operator. Pour obtenir des instructions d'installation de base de l'Agent Datadog sur Kubernetes, consultez la section [Installer l'Agent Datadog sur Kubernetes][10].

## Prérequis

- **Version de cluster Kubernetes >= v1.20.X** : les tests ont été effectués sur les versions Kubernetes >= `1.20.0`. Il devrait fonctionner sur les versions `>= v1.11.0`, mais pour les versions antérieures, l'opérateur peut ne pas fonctionner comme prévu en raison d'une prise en charge limitée des CRD.
- **[Helm][1]** pour le déploiement du Datadog Operator
- **[`kubectl` CLI][2]** pour l'installation de l'Agent Datadog


## Installer le Datadog Operator avec Helm

Vous pouvez déployer le Datadog Operator dans votre cluster à l'aide du [chart Helm Datadog Operator][3] :

```shell
helm repo add datadog https://helm.datadoghq.com
helm install my-datadog-operator datadog/datadog-operator
```

Pour personnaliser la configuration de l'opérateur, créez un fichier `values.yaml` qui peut remplacer les valeurs par défaut du chart Helm.

Par exemple :

```yaml
image:
  tag: 1.2.0
clusterName: my-cluster
datadogMonitor:
  enabled: true
```

Ensuite, pour mettre à jour la version de Helm, exécutez :

```shell
helm upgrade my-datadog-operator datadog/datadog-operator -f values.yaml
```

### Ajouter des informations d'identification

1. Créez un Secret Kubernetes qui contient vos clés d'API et d'application.

   ```
   export DD_API_KEY=<YOUR_API_KEY>
   export DD_APP_KEY=<YOUR_APP_KEY>

   kubectl create secret generic datadog-operator-secret --from-literal api-key=$DD_API_KEY --from-literal app-key=$DD_APP_KEY
   ```

2. Faites référence à ce Secret dans votre fichier `values.yaml`.

   ```yaml
   apiKeyExistingSecret: datadog-operator-secret
   appKeyExistingSecret: datadog-operator-secret
   image:
     tag: 1.2.0
   datadogMonitor:
     enabled: true
   ```

3. Mettez à jour la version de Helm.

   ```shell
   helm upgrade my-datadog-operator datadog/datadog-operator -f values.yaml
   ```

### Configurer le nom de cluster (facultatif)

La définition d'un nom de cluster est facultative mais recommandée. Le nom de cluster peut être configuré de la manière suivante :

- **Valeur `clusterName` du chart Helm** (définit la variable d'environnement `DD_CLUSTER_NAME` sur l'opérateur) :
   ```yaml
   clusterName: my-cluster
   ```

- **CRD DatadogAgent `spec.global.clusterName`** :
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       clusterName: my-cluster
   ```

## Installer le Datadog Operator avec Operator Lifecycle Manager

Les instructions pour le déploiement du Datadog Operator avec [Operator Lifecycle Manager][4] (OLM) sont disponibles sur [operatorhub.io][5].

### Remplacer la configuration par défaut de l'opérateur avec OLM

Le framework [Operator Lifecycle Manager][4] permet de remplacer la configuration par défaut de l'opérateur. Consultez la section [Configuration de l'abonnement][6] pour obtenir une liste des paramètres de configuration d'installation pris en charge.

Par exemple, l'élément `Subscription` [Operator Lifecycle Manager][4] suivant modifie les ressources de Pod de l'opérateur Datadog :

```yaml
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: my-datadog-operator
  namespace: operators
spec:
  channel: stable
  name: datadog-operator
  source: operatorhubio-catalog
  sourceNamespace: olm
  config:
    resources:
      requests:
        memory: "250Mi"
        cpu: "250m"
      limits:
        memory: "250Mi"
        cpu: "500m"
```

### Ajouter des informations d'identification

1. Créez un Secret Kubernetes qui contient vos clés d'API et d'application.

   ```
   export DD_API_KEY=<YOUR_API_KEY>
   export DD_APP_KEY=<YOUR_APP_KEY>

   kubectl create secret generic datadog-operator-secret --from-literal api-key=$DD_API_KEY --from-literal app-key=$DD_APP_KEY
   ```

2. Ajoutez des références au Secret dans l'instance de ressource `Subscription` du Datadog Operator.

   ```yaml
   apiVersion: operators.coreos.com/v1alpha1
   kind: Subscription
   metadata:
     name: my-datadog-operator
     namespace: operators
   spec:
     channel: stable
     name: datadog-operator
     source: operatorhubio-catalog
     sourceNamespace: olm
     config:
       env:
         - name: DD_API_KEY
           valueFrom:
             secretKeyRef: 
                key: api-key
                name: datadog-operator-secret
         - name: DD_APP_KEY
           valueFrom:
             secretKeyRef: 
               key: app-key
               name: datadog-operator-secret
   ```


## Déployer la ressource personnalisée DatadogAgent gérée par l'opérateur

Après avoir déployé le Datadog Operator, créez la ressource `DatadogAgent` qui déclenche le déploiement de l'Agent Datadog, de l'Agent de cluster et des Cluster Checks Runners (s'ils sont utilisés) dans votre cluster Kubernetes. L'Agent Datadog est déployé en tant que DaemonSet, exécutant un pod sur chaque nœud de votre cluster.

1. Créez un Secret Kubernetes avec vos clés d'API et d'application.

   ```
   export DD_API_KEY=<YOUR_API_KEY>
   export DD_APP_KEY=<YOUR_APP_KEY>

   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```

1. Créez un fichier avec les spécifications de votre configuration de déploiement `DatadogAgent`. La configuration la plus simple est la suivante :

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     credentials:
       apiSecret:
         secretName: datadog-secret
         keyName: api-key
       appSecret:
         secretName: datadog-secret
         keyName: app-key
   ```

1. Déployez l'Agent Datadog avec le fichier de configuration ci-dessus :
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```

Dans un cluster avec deux nœuds de travail, vous devriez voir les pods de l'Agent créés sur chaque nœud.

```console
$ kubectl get daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   2         2         2       2            2           <none>          5m30s

$ kubectl get pod -owide
NAME                                         READY   STATUS    RESTARTS   AGE     IP            NODE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running   0          1h      10.244.2.11   kind-worker
datadog-agent-k26tp                          1/1     Running   0          5m59s   10.244.2.13   kind-worker
datadog-agent-zcxx7                          1/1     Running   0          5m59s   10.244.1.7    kind-worker2
```

### Tolérances

Mettez à jour votre [fichier `datadog-agent.yaml`][8] avec la configuration suivante pour ajouter des tolérances dans le `Daemonset.spec.template` de votre DaemonSet :

   ```yaml
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     credentials:
       apiSecret:
         secretName: datadog-secret
         keyName: api-key
       appSecret:
         secretName: datadog-secret
         keyName: app-key
     agent:
       config:
         tolerations:
          - operator: Exists
   ```

Appliquez cette nouvelle configuration :

```console
$ kubectl apply -f datadog-agent.yaml
datadogagent.datadoghq.com/datadog updated
```

Validez la mise à jour du DaemonSet en consultant la nouvelle valeur de pod `desired` :

```console
$ kubectl get daemonset
NAME            DESIRED   CURRENT   READY   UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
datadog-agent   3         3         3       3            3           <none>          7m31s

$ kubectl get pod
NAME                                         READY   STATUS     RESTARTS   AGE
agent-datadog-operator-d897fc9b-7wbsf        1/1     Running    0          15h
datadog-agent-5ctrq                          1/1     Running    0          7m43s
datadog-agent-lkfqt                          0/1     Running    0          15s
datadog-agent-zvdbw                          1/1     Running    0          8m1s
```

## Configuration

Pour obtenir une liste complète des options de configuration, consultez la section [Spécification de configuration][12].

## Installer le plugin kubectl 

Consultez la [documentation dédiée au plugin `kubectl`][11].

## Utiliser une image personnalisée du Datadog Operator

Consultez la section [Images de conteneur personnalisées pour l'opérateur][9] pour obtenir des instructions sur la création d'une image de conteneur personnalisée du Datadog Operator basée sur une version officielle.

### Images du Datadog Operator avec les charts Helm 

Pour installer une image personnalisée du Datadog Operator à l'aide du chart Helm, exécutez la commande suivante :

```shell
helm install my-datadog-operator --set image.repository=<custom-image-repository> --set image.tag=<custom-image-tag> datadog/datadog-operator
```

## Nettoyage

La commande suivante supprime toutes les ressources Kubernetes créées par le Datadog Operator et l'élément `DatadogAgent` `datadog` lié.

```shell
kubectl delete datadogagent datadog
```

Cette commande affiche `datadogagent.datadoghq.com/datadog deleted`.

Vous pouvez ensuite supprimer le Datadog Operator avec la commande `helm delete` :

```shell
helm delete my-datadog-operator
```

[1]: https://helm.sh
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[4]: https://olm.operatorframework.io/
[5]: https://operatorhub.io/operator/datadog-operator
[6]: https://github.com/operator-framework/operator-lifecycle-manager/blob/master/doc/design/subscription-config.md
[7]: https://app.datadoghq.com/account/settings#api
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-tolerations.yaml
[9]: https://github.com/DataDog/datadog-operator/blob/main/docs/custom-operator-image.md
[10]: https://docs.datadoghq.com/fr/containers/kubernetes/installation
[11]: https://github.com/DataDog/datadog-operator/blob/main/docs/kubectl-plugin.md
[12]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
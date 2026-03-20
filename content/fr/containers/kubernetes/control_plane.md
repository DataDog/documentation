---
aliases:
- /fr/agent/kubernetes/control_plane
description: Surveiller les composants du plan de contrôle Kubernetes, notamment l'API
  Server, etcd, le Controller Manager et le Scheduler
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/apm
  tag: Documentation
  text: Recueillir les traces de vos applications
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Recueillir vos métriques Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: Recueillir automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag
  tag: Documentation
  text: Attribuer des tags à toutes les données envoyées par un conteneur
title: Surveillance du plan de contrôle Kubernetes
---

## Présentation

Cette section propose des configurations de base efficaces pour la surveillance du plan de contrôle Kubernetes et décrit les spécificités associées. Vous pouvez personnaliser ces configurations afin d'ajouter les fonctionnalités Datadog de votre choix.

Grâce aux intégrations Datadog pour le [serveur d'API][1], [Etcd][2], [Controller Manager][3] et [Scheduler][4], vous pouvez recueillir des métriques clés depuis les quatre composants du plan de contrôle Kubernetes.

* [Kubernetes avec Kubeadm](#Kubeadm)
* [Kubernetes sur Amazon EKS](#EKS)
* [Kubernetes sur OpenShift 4](#OpenShift4)
* [Kubernetes sur OpenShift 3](#OpenShift3)
* [Kubernetes sur Talos Linux](#TalosLinux)
* [Kubernetes sur Rancher Kubernetes Engine (version 2.5+)](#RKE)
* [Kubernetes on Rancher Kubernetes Engine (\<v2.5)](#RKEBefore2_5)
* [Kubernetes sur des services gérés (AKS, GKE)](#services-geres)

## Kubernetes avec Kubeadm {#Kubeadm}

Les configurations suivantes ont été testées pour Kubernetes `v1.18+`. 

### Serveur d'API

L'intégration du serveur d'API est automatiquement configurée. L'Agent Datadog la découvre automatiquement.

### Etcd

Attribuez un accès en lecture aux certificats Etcd situés sur le host pour que le check de l'Agent Datadog puisse communiquer avec Etcd et commencer à recueillir des métriques Etcd.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      extraConfd:
        configMap:
          name: datadog-checks
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/etc/kubernetes/pki/etcd
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
      volumes:
        - name: etcd-certs
          hostPath:
            path: /etc/kubernetes/pki/etcd
        - name: disable-etcd-autoconf
          emptyDir: {}
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-checks
data:
  etcd.yaml: |-
    ad_identifiers:
      - etcd
    init_config:
    instances:
      - prometheus_url: https://%%host%%:2379/metrics
        tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
        tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
        tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  ignoreAutoConfig:
  - etcd
  confd:
    etcd.yaml: |-
      ad_identifiers:
        - etcd
      instances:
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
agents:
  volumes:
    - hostPath:
        path: /etc/kubernetes/pki/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
    operator: Exists
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

### Controller Manager et Scheduler

#### Ports non sécurisés

Si les ports non sécurisés de vos instances Controller Manager et Scheduler sont activés, l'Agent Datadog découvre les intégrations et commence à collecter les métriques sans configuration supplémentaire.

#### Ports sécurisés

Les ports sécurisés activent des processus d'authentification et d'autorisation afin de protéger les composants de votre plan de contrôle. L'Agent Datadog peut recueillir des métriques à partir de Controller Manager et Scheduler en ciblant leurs ports sécurisés.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      extraConfd:
        configMap:
          name: datadog-checks
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/etc/kubernetes/pki/etcd
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
            - name: disable-scheduler-autoconf
              mountPath: /etc/datadog-agent/conf.d/kube_scheduler.d
            - name: disable-controller-manager-autoconf
              mountPath: /etc/datadog-agent/conf.d/kube_controller_manager.d
      volumes:
        - name: etcd-certs
          hostPath:
            path: /etc/kubernetes/pki/etcd
        - name: disable-etcd-autoconf
          emptyDir: {}
        - name: disable-scheduler-autoconf
          emptyDir: {}
        - name: disable-controller-manager-autoconf
          emptyDir: {}
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: datadog-checks
data:
  etcd.yaml: |-
    ad_identifiers:
      - etcd
    init_config:
    instances:
      - prometheus_url: https://%%host%%:2379/metrics
        tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
        tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
        tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
  kube_scheduler.yaml: |-
    ad_identifiers:
      - kube-scheduler
    instances:
      - prometheus_url: https://%%host%%:10259/metrics
        ssl_verify: false
        bearer_token_auth: true
  kube_controller_manager.yaml: |-
    ad_identifiers:
      - kube-controller-manager
    instances:
      - prometheus_url: https://%%host%%:10257/metrics
        ssl_verify: false
        bearer_token_auth: true
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  ignoreAutoConfig:
    - etcd
    - kube_scheduler
    - kube_controller_manager
  confd:
    etcd.yaml: |-
      ad_identifiers:
        - etcd
      instances:
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
    kube_scheduler.yaml: |-
      ad_identifiers:
        - kube-scheduler
      instances:
        - prometheus_url: https://%%host%%:10259/metrics
          ssl_verify: false
          bearer_token_auth: true
    kube_controller_manager.yaml: |-
      ad_identifiers:
        - kube-controller-manager
      instances:
        - prometheus_url: https://%%host%%:10257/metrics
          ssl_verify: false
          bearer_token_auth: true
agents:
  volumes:
    - hostPath:
        path: /etc/kubernetes/pki/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
    operator: Exists
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

**Remarques :**

- Si vous utilisez des certificats autosignés, le champ `ssl_verify` des configurations `kube_controller_manager` et `kube_scheduler` doit être défini sur `false`.
- Lors du ciblage de ports sécurisés, l'Agent Datadog doit pouvoir atteindre l'option `bind-address` de vos configurations Controller Manager et Scheduler. Exemple :

```yaml
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
controllerManager:
  extraArgs:
    bind-address: 0.0.0.0
scheduler:
  extraArgs:
    bind-address: 0.0.0.0
```

## Kubernetes sur Amazon EKS {#EKS}

### Méthode recommandée

<div class="alert alert-info">Cette fonctionnalité est en version Preview.</div>

Datadog prend en charge la surveillance des composants du plan de contrôle Kubernetes, notamment l'API Server, le Controller Manager et le Scheduler.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

#### Prérequis

1. Opérateur Datadog >= `v1.18.0`
1. Agent Datadog >= `v7.69`

#### Configuration générale

La surveillance du plan de contrôle est activée par défaut, mais nécessite l'activation de l'introspection.

Vous pouvez activer l'introspection en utilisant le [chart Helm datadog-operator](https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator) :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

En utilisant la ligne de commande :
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Étant donné que cette fonctionnalité est activée par défaut, vous pouvez déployer une spec DatadogAgent minimale.

{{% /tab %}}

{{% tab "Helm" %}}

#### Prérequis

1. Version chart Helm >= `3.152.0`
1. Agent Datadog >= `v7.69`

#### Configuration générale

Activez la surveillance du plan de contrôle en utilisant l'option `providers.eks.controlPlaneMonitoring` :

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  eks:
    controlPlaneMonitoring: true
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

#### Validation
Vérifier que les checks sont en cours d'exécution :
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Recherchez :
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`

Vous devriez voir les métriques du plan de contrôle dans Datadog, notamment :
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`

### Configuration héritée

Amazon Elastic Kubernetes Service (EKS) prend en charge la surveillance de tous les composants du plan de contrôle à l'aide de cluster checks.

#### Prérequis
- Un cluster EKS exécutant Kubernetes version >= 1.28
- Déployer l'Agent en utilisant l'un des éléments suivants :
  - Version du chart Helm >= `3.90.1`
  - Opérateur Datadog >= `v1.13.0`
- Activez l'[Agent de cluster][6] Datadog.

Ajouter les annotations suivantes au service `default/kubernetes` :

```yaml
annotations:
  ad.datadoghq.com/endpoints.checks: |-
    {
      "kube_apiserver_metrics": {
        "init_config": {},
        "instances": [
          {
            "prometheus_url": "https://%%host%%:%%port%%/metrics",
            "bearer_token_auth": "true"
          }
        ]
      }
    }
  ad.datadoghq.com/service.checks: |-
    {
      "kube_controller_manager": {
        "init_config": {},
        "instances": [
          {
            "prometheus_url": "https://%%host%%:%%port%%/apis/metrics.eks.amazonaws.com/v1/kcm/container/metrics",
            "extra_headers": {"accept":"*/*"},
            "bearer_token_auth": "true",
            "tls_ca_cert": "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
          }
        ]
      },
      "kube_scheduler": {
        "init_config": {},
        "instances": [
          {
            "prometheus_url": "https://%%host%%:%%port%%/apis/metrics.eks.amazonaws.com/v1/ksh/container/metrics",
            "extra_headers": {"accept":"*/*"},
            "bearer_token_auth": "true",
            "tls_ca_cert": "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"
          }
        ]
      }
    }
```

**Remarques :**
- Amazon expose les métriques `kube_controller_manager` et `kube_scheduler` sous le groupe d'API [`metrics.eks.amazonaws.com`][11].
- L'ajout de `"extra_headers":{"accept":"*/*"}` empêche les erreurs `HTTP 406` lors de l'interrogation de l'API de métriques EKS.

## Kubernetes sur OpenShift 4 {#OpenShift4}

<div class="alert alert-info">Cette fonctionnalité est en version Preview.</div>

Datadog prend en charge la surveillance des composants du plan de contrôle Kubernetes, notamment l'API Server, etcd, le Controller Manager et le Scheduler.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

#### Prérequis

1. Opérateur Datadog >= `v1.18.0`
1. Agent Datadog >= `v7.69`

**Remarque** : `etcd` n'est pas pris en charge sur les versions 4.0-4.13.

#### Configuration générale

La surveillance du plan de contrôle est activée par défaut, mais nécessite l'activation de l'introspection.

Vous pouvez activer l'introspection en utilisant le [chart Helm datadog-operator][12] :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

En utilisant la ligne de commande :
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Ou, pour les **utilisateurs d'OpenShift** qui ont installé l'opérateur via OperatorHub/Marketplace (la [méthode recommandée](install-openshift.md)), en patchant la version de service de cluster de l'opérateur :

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

Étant donné que cette fonctionnalité est activée par défaut, vous pouvez déployer une spec DatadogAgent minimale.

Activer `features.clusterChecks.useClusterChecksRunners` pour planifier les checks ici ; sinon, les checks du plan de contrôle s'exécutent sur l'Agent de nœud.

Pour OpenShift 4.14 et versions ultérieures, la surveillance etcd nécessite de copier les certificats etcd. Vérifiez les logs de l'opérateur pour obtenir la commande exacte. Consultez l'exemple suivant (ajustez l'espace de nommage si nécessaire) :

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | \
  sed 's/namespace: openshift-etcd-operator/namespace: datadog/' | \
  oc apply -f -
```

[12]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator

{{% /tab %}}
{{% tab "Helm" %}}

#### Prérequis

1. Version du chart Helm >= `3.150.0`
1. Agent Datadog >= `v7.69`

**Remarque** : `etcd` n'est pas pris en charge sur les versions 4.0-4.13.

#### Configuration générale

Activez la surveillance du plan de contrôle en utilisant l'option `providers.openshift.controlPlaneMonitoring` : 

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  openshift:
    controlPlaneMonitoring: true
{{< /code-block >}}

Pour OpenShift 4.14 et versions ultérieures, la surveillance etcd nécessite de copier les certificats etcd. Pour les copier dans le même espace de nommage que l'Agent Datadog :

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

{{% /tab %}}
{{< /tabs >}}

#### Validation
Vérifiez que les checks sont en cours d'exécution :
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Cherchez :
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`
- `etcd`

Vous devriez voir les métriques du plan de contrôle dans Datadog, notamment :
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`
- `etcd.*`

### Configuration héritée

Sur OpenShift 4, tous les composants du plan de contrôle peuvent être surveillés à l'aide de checks d'endpoint.

#### Prérequis

1. Activez l'[Agent de cluster][6] Datadog.
1. Activez les [checks de cluster][7].
1. Activez les [checks d'endpoint][8].
1. Vérifiez que votre compte dispose de suffisamment d'autorisations pour pouvoir modifier des services et créer des secrets.

#### Serveur d'API

Le serveur d'API s'exécute derrière le service `kubernetes` dans l'espace de nommage `default`. Annotez ce service avec la configuration `kube_apiserver_metrics` :

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La dernière annotation `ad.datadoghq.com/endpoints.resolve` est requise, car le service est exécuté devant les pods statiques. L'Agent de cluster Datadog planifie les checks en tant que checks d'endpoint et les distribue aux exécuteurs de checks de cluster. Pour identifier les nœuds sur lesquels ils s'exécutent, utilisez la commande suivante :

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etcd

{{% collapse-content title= "Etcd OpenShift 4.0 - 4.13" level="h4" %}}
Des certificats sont nécessaires pour communiquer avec le service Etcd, qui peuvent être trouvés dans le secret `kube-etcd-client-certs` dans l'espace de nommage `openshift-monitoring`. Pour donner à l'Agent Datadog l'accès à ces certificats, copiez-les d'abord dans le même espace de nommage dans lequel l'Agent Datadog est exécuté :

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

Ces certificats doivent être montés sur les pods des exécuteurs de checks de cluster, en ajoutant les volumes et volumeMounts tel que décrit ci-dessous.

**Remarque** : des montages sont également inclus pour désactiver le fichier d'autoconfiguration du check Etcd fourni avec l'Agent.


{{< tabs >}}
{{% tab "Operator Datadog" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /etc/etcd-certs
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
      volumes:
        - name: etcd-certs
          secret:
            secretName: kube-etcd-client-certs
        - name: disable-etcd-autoconf
          emptyDir: {}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
...
clusterChecksRunner:
  volumes:
    - name: etcd-certs
      secret:
        secretName: kube-etcd-client-certs
    - name: disable-etcd-autoconf
      emptyDir: {}
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/etcd
      readOnly: true
    - name: disable-etcd-autoconf
      mountPath: /etc/datadog-agent/conf.d/etcd.d
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

Annotez ensuite le service s'exécutant devant Etcd :

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'Agent de cluster Datadog planifie les checks en tant que checks d'endpoint et les distribue aux exécuteurs de check de cluster.

{{% /collapse-content %}}


{{% collapse-content title="Etcd OpenShift 4.14 et versions ultérieures" level="h4" %}}

Des certificats sont nécessaires pour communiquer avec le service Etcd, qui peuvent être trouvés dans le secret `etcd-metric-client` dans l'espace de nommage `openshift-etcd-operator`. Pour donner à l'Agent Datadog l'accès à ces certificats, copiez-les dans le même espace de nommage que l'Agent Datadog :

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

Ces certificats doivent être montés sur les pods des exécuteurs de checks de cluster, en ajoutant les volumes et volumeMounts tel que décrit ci-dessous.

**Remarque** : des montages sont également inclus pour désactiver le fichier d'autoconfiguration du check Etcd fourni avec l'Agent.


{{< tabs >}}
{{% tab "Operator Datadog" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /etc/etcd-certs
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
      volumes:
        - name: etcd-certs
          secret:
            secretName: etcd-metric-client
        - name: disable-etcd-autoconf
          emptyDir: {}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
...
clusterChecksRunner:
  volumes:
    - name: etcd-certs
      secret:
        secretName: etcd-metric-client
    - name: disable-etcd-autoconf
      emptyDir: {}
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/etcd
      readOnly: true
    - name: disable-etcd-autoconf
      mountPath: /etc/datadog-agent/conf.d/etcd.d

{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

Annotez ensuite le service s'exécutant devant Etcd :

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'
```

L'Agent de cluster Datadog planifie les checks en tant que checks d'endpoint et les distribue aux exécuteurs de check de cluster.

{{% /collapse-content %}}


#### Controller Manager

Le Controller Manager s'exécute derrière le service `kube-controller-manager` dans l'espace de nommage `openshift-kube-controller-manager`. Annotez ce service avec la configuration de check :


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'Agent de cluster Datadog planifie les checks en tant que checks d'endpoint et les distribue aux exécuteurs de check de cluster.



#### Scheduler

Le Scheduler s'exécute derrière le service `scheduler` dans l'espace de nommage `openshift-kube-scheduler`. Annotez ce service avec la configuration de check :


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'Agent de cluster Datadog planifie les checks en tant que checks d'endpoint et les distribue aux exécuteurs de check de cluster.


## Kubernetes sur OpenShift 3 {#OpenShift3}

Sur OpenShift 3, tous les composants du plan de contrôle peuvent être surveillés à l'aide de checks d'endpoint.

### Prérequis

1. Activez l'[Agent de cluster][6] Datadog.
1. Activez les [checks de cluster][7].
1. Activez les [checks d'endpoint][8].
1. Vérifiez que votre compte dispose de suffisamment d'autorisations pour pouvoir créer et modifier des services.

### Serveur d'API

Le serveur d'API s'exécute derrière le service `kubernetes` dans l'espace de nommage `default`. Annotez ce service avec la configuration `kube_apiserver_metrics` :

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La dernière annotation `ad.datadoghq.com/endpoints.resolve` est requise, car le service est exécuté devant les pods statiques. L'Agent de cluster Datadog planifie les checks en tant que checks d'endpoint et les distribue aux exécuteurs de checks de cluster. Pour identifier les nœuds sur lesquels ils s'exécutent, utilisez la commande suivante :

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Pour communiquer avec le service Etcd, vous devez utiliser des certificats. Vous trouverez les certificats requis sur le host. Ces certificats doivent être montés sur les pods des exécuteurs de checks de cluster, en ajoutant les volumes et volumeMounts tel que décrit ci-dessous.

**Remarque** : des montages sont également inclus pour désactiver le fichier d'autoconfiguration du check Etcd fourni avec l'Agent.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/etc/etcd
            - name: disable-etcd-autoconf
              mountPath: /etc/datadog-agent/conf.d/etcd.d
      volumes:
        - name: etcd-certs
          hostPath:
            path: /etc/etcd
        - name: disable-etcd-autoconf
          emptyDir: {}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
...
clusterChecksRunner:
  volumes:
    - hostPath:
        path: /etc/etcd
      name: etcd-certs
    - name: disable-etcd-autoconf
      emptyDir: {}
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/etcd
      readOnly: true
    - name: disable-etcd-autoconf
      mountPath: /etc/datadog-agent/conf.d/etcd.d
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

Les modifications directes apportées à ce service ne sont pas persistantes. Veillez donc à dupliquer le service Etcd.

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

Annotez le service dupliqué avec la configuration de check :

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'Agent de cluster Datadog planifie les checks en tant que checks d'endpoint et les distribue aux exécuteurs de check de cluster.


### Controller Manager et Scheduler

Le Controller Manager et le Scheduler sont exécutés derrière le même service, à savoir `kube-controllers`, dans l'espace de nommage `kube-system`. Les modifications directes apportées au service ne sont pas persistantes. Veillez donc à dupliquer le service :

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

Annotez le service dupliqué avec les configurations de check :

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'Agent de cluster Datadog planifie les checks en tant que checks d'endpoint et les distribue aux exécuteurs de check de cluster.

## Kubernetes sur Talos Linux {#TalosLinux}

Helm est la méthode d'installation recommandée pour Talos Linux. Utiliser Helm en définissant le flag `providers.talos.enabled` sur `true`.

### Serveur d'API

L'intégration du serveur d'API est automatiquement configurée. L'Agent Datadog la découvre automatiquement.

### Etcd

En fournissant un accès en lecture aux certificats etcd situés sur l'hôte, le check de l'Agent Datadog peut communiquer avec etcd et commencer à collecter les métriques etcd.

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  ignoreAutoConfig:
  - etcd
  confd:
    etcd.yaml: |-
      # Vous pouvez configurer l'Agent pour exécuter ce check uniquement sur l'hôte où etcd est en cours d'exécution
      # en utilisant `ad_identifiers` pour un pod qui ne serait en cours d'exécution que sur un nœud control plane.
      # Cela permet d'éviter les erreurs lorsque l'Agent est exécuté sur des nœuds worker.
      # Une autre approche consiste à exécuter un pod minimal sur le nœud control plane et à l'utiliser pour `ad_identifiers`.
      ad_identifiers:
        - kube-scheduler
      instances:
          # Il s'agit de l'adresse IP du nœud où les métriques sont exposées car kube-scheduler s'exécute en mode réseau host. 
          # Sinon, l'adresse IP peut être codée en dur sur l'adresse IP du nœud master (également dans la variable d'environnement `DD_KUBERNETES_KUBELET_HOST`).
        - prometheus_url : https://%%host%%:2379/metrics
          tls_ca_cert : /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert : /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key : /host/etc/kubernetes/pki/etcd/server.key
agents:
  # Des tolérances sont nécessaires pour être planifié sur les nœuds de plan de contrôle exécutant etcd
  tolerations:
  - key: node-role.kubernetes.io/control-plane
    operator: Exists
    effect: NoSchedule
  volumes:
    # Sur Talos, les certificats etcd sont stockés dans /system/secrets/etcd
    - hostPath:
        path: /system/secrets/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
providers:
  talos:
    enabled: true
{{< /code-block >}}

### Controller Manager et Scheduler

#### Ports sécurisés

Les ports sécurisés activent des processus d'authentification et d'autorisation afin de protéger les composants de votre plan de contrôle. L'Agent Datadog peut recueillir des métriques à partir de Controller Manager et Scheduler en ciblant leurs ports sécurisés.

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  ignoreAutoConfig:
    - etcd
    - kube_scheduler
    - kube_controller_manager
  confd:
    etcd.yaml: |-
      ad_identifiers:
        - kube-scheduler
      instances:
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
    kube_scheduler.yaml: |-
      ad_identifiers:
        - kube-scheduler
      instances:
        - prometheus_url: https://%%host%%:10259/metrics
          ssl_verify: false
          bearer_token_auth: true
    kube_controller_manager.yaml: |-
      ad_identifiers:
        - kube-controller-manager
      instances:
        - prometheus_url: https://%%host%%:10257/metrics
          ssl_verify: false
          bearer_token_auth: true
agents:
  tolerations:
  - key: node-role.kubernetes.io/control-plane
    operator: Exists
    effect: NoSchedule
  volumes:
    - hostPath:
        path: /system/secrets/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
providers:
  talos:
    enabled: true
{{< /code-block >}}

**Remarques :**

- Si vous utilisez des certificats autosignés, le champ `ssl_verify` des configurations `kube_controller_manager` et `kube_scheduler` doit être défini sur `false`.
- Lors du ciblage de ports sécurisés, l'option `bind-address` dans votre configuration Controller Manager et Scheduler doit être accessible par l'Agent Datadog. Appliquez le patch ci-dessous aux nœuds control-plane lors de la génération du cluster ; ou, pour les nœuds Talos en cours d'exécution, exécutez `talosctl patch mc -n <control-plane-node1,control-plane-node2> --patch @controlplane-datadog-monitoring-patch.yaml`.

{{< code-block lang="yaml" filename="controlplane-datadog-monitoring-patch.yaml" >}}
cluster:
  controllerManager:
    extraArgs:
      bind-address: 0.0.0.0
  scheduler:
    extraArgs:
      bind-address: 0.0.0.0
{{< /code-block >}}

## Kubernetes sur Rancher Kubernetes Engine (version 2.5+) {#RKE}

La version 2.5 de Rancher se base sur [PushProx][9] pour exposer les endpoints de métriques du plan de contrôle. L'Agent Datadog peut ainsi exécuter des checks de plan de contrôle et recueillir des métriques.

### Prérequis

1. Installez l'Agent Datadog avec le [chart rancher-monitoring][10].
2. Les daemonsets `pushprox` sont déployés avec `rancher-monitoring` et s'exécutent dans l'espace de nommage `cattle-monitoring-system`. 

### Serveur d'API

Pour configurer le check `kube_apiserver_metrics`, ajoutez les annotations suivantes au service `default/kubernetes` :

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Ajouter des services Kubernetes pour configurer les checks Autodiscovery

Si vous ajoutez des services Kubernetes headless pour définir des configuration de check, l'Agent Datadog pourra cibler les pods `pushprox` et recueillir des métriques.

Appliquez `rancher-control-plane-services.yaml` :

```yaml
apiVersion: v1
kind: Service
metadata:
  name: pushprox-kube-scheduler-datadog
  namespace: cattle-monitoring-system
  labels:
    component: kube-scheduler
    k8s-app: pushprox-kube-scheduler-client
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["kube_scheduler"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:10251/metrics"
        }
      ]
spec:
  clusterIP: None
  selector:
    k8s-app: pushprox-kube-scheduler-client
---
apiVersion: v1
kind: Service
metadata:
  name: pushprox-kube-controller-manager-datadog
  namespace: cattle-monitoring-system
  labels:
    component: kube-controller-manager
    k8s-app: pushprox-kube-controller-manager-client
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["kube_controller_manager"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:10252/metrics"
        }
      ]
spec:
  clusterIP: None
  selector:
    k8s-app: pushprox-kube-controller-manager-client
---
apiVersion: v1
kind: Service
metadata:
  name: pushprox-kube-etcd-datadog
  namespace: cattle-monitoring-system
  labels:
    component: kube-etcd
    k8s-app: pushprox-kube-etcd-client
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["etcd"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
      [
        {
          "prometheus_url": "https://%%host%%:2379/metrics",
          "tls_ca_cert": "/host/opt/rke/etc/kubernetes/ssl/kube-ca.pem",
          "tls_cert": "/host/opt/rke/etc/kubernetes/ssl/kube-etcd-<node-ip>.pem",
          "tls_private_key": "/host/opt/rke/etc/kubernetes/ssl/kube-etcd-<node-ip>.pem"
        }
      ]
spec:
  clusterIP: None
  selector:
    k8s-app: pushprox-kube-etcd-client
```

Déployez l'Agent Datadog avec des manifestes basés sur les configurations suivantes :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/opt/rke/etc/kubernetes/ssl
      volumes:
        - name: etcd-certs
          hostPath:
            path: /opt/rke/etc/kubernetes/ssl
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
agents:
  volumes:
    - hostPath:
        path: /opt/rke/etc/kubernetes/ssl
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/opt/rke/etc/kubernetes/ssl
      readOnly: true
  tolerations:
    - effect: NoSchedule
      key: node-role.kubernetes.io/controlplane
      operator: Exists
    - effect: NoExecute
      key: node-role.kubernetes.io/etcd
      operator: Exists
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Kubernetes sur Rancher Kubernetes Engine (avant la v2.5) {#RKEBefore2_5}

### API Server, Controller Manager et Scheduler

Installez l'Agent Datadog avec le [chart rancher-monitoring][10].

Les composants du plan de contrôle s'exécutent sur Docker en dehors de Kubernetes. Dans Kubernetes, le service `kubernetes` dans l'espace de nommage `default` cible la ou les IP du nœud du plan de contrôle. Pour vérifier que c'est bien le cas, exécutez la commande `$ kubectl describe endpoints kubernetes`.

Vous pouvez annoter ce service avec des checks d'endpoint (gérés par l'Agent de cluster) Datadog pour surveiller les composants API Server, Controller Manager et Scheduler :

```shell
kubectl edit service kubernetes
```


```yaml
metadata:
  annotations:
    ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics", "kube_controller_manager", "kube_scheduler"]'
    ad.datadoghq.com/endpoints.init_configs: '[{},{},{}]'
    ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" },
      {"prometheus_url": "http://%%host%%:10252/metrics"},
      {"prometheus_url": "http://%%host%%:10251/metrics"}]'
```

### Etcd

Etcd s'exécute dans Docker en dehors de Kubernetes. Des certificats sont requis pour communiquer avec le service Etcd. Pour configurer la surveillance d'Etcd en suivant la procédure recommandée, vous avez besoin d'un accès SSH au nœud du plan de contrôle exécutant Etcd.

1. Commencez par SSH le nœud du plan de contrôle en suivant la [documentation Rancher][9] (en anglais). Vérifiez qu'Etcd s'exécute dans un conteneur Docker avec `$ docker ps`, puis utilisez la commande `$ docker inspect etcd` pour rechercher l'emplacement des certificats utilisés dans la commande d'exécution (`"Cmd"`), ainsi que le chemin hôte des montages.

Recherchez les trois flags suivants dans la commande :

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. À l'aide des informations de montage fournies dans la sortie de `$ docker inspect etcd`, définissez `volumes` et `volumeMounts` dans la configuration de l'Agent Datadog. Ajoutez également des tolérances, afin que l'Agent Datadog puisse s'exécuter sur les nœuds du plan de contrôle.

Vous trouverez ci-dessous des exemples de configuration de l'Agent Datadog avec Helm et l'Operator Datadog :


{{< tabs >}}
{{% tab "Operator Datadog" %}}

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      containers:
        agent:
          volumeMounts:
            - name: etcd-certs
              readOnly: true
              mountPath: /host/opt/rke/etc/kubernetes/ssl
      volumes:
        - name: etcd-certs
          hostPath:
            path: /opt/rke/etc/kubernetes/ssl
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
agents:
  volumes:
    - hostPath:
        path: /opt/rke/etc/kubernetes/ssl
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/opt/rke/etc/kubernetes/ssl
      readOnly: true
  tolerations:
    - effect: NoSchedule
      key: node-role.kubernetes.io/controlplane
      operator: Exists
    - effect: NoExecute
      key: node-role.kubernetes.io/etcd
      operator: Exists
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


3. Configurez un DaemonSet avec un conteneur de pause afin d'exécuter le check Etcd sur les nœuds exécutant Etcd. Ce DamonSet s'exécute sur le réseau hôte pour pouvoir accéder au service Etcd. Il dispose également de la configuration de check et des tolérances nécessaires pour s'exécuter sur les nœuds du plan de contrôle. Veillez à ce que les chemins des fichiers de certificat montés correspondent aux emplacements sur votre instance, et remplacez la partie `<...>` par l'emplacement pertinent.

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: etcd-pause
spec:
  selector:
    matchLabels:
      app: etcd-pause
  updateStrategy:
    type: RollingUpdate
  template:
    metadata:
      annotations:
        ad.datadoghq.com/pause.check_names: '["etcd"]'
        ad.datadoghq.com/pause.init_configs: '[{}]'
        ad.datadoghq.com/pause.instances: |
          [{
            "prometheus_url": "https://%%host%%:2379/metrics",
            "tls_ca_cert": "/host/etc/kubernetes/ssl/kube-ca.pem",
            "tls_cert": "/host/etc/kubernetes/ssl/kube-etcd-<...>.pem",
            "tls_private_key": "/host/etc/kubernetes/ssl/kube-etcd-<...>-key.pem"
          }]
      labels:
        app: etcd-pause
      name: etcd-pause
    spec:
      hostNetwork: true
      containers:
      - name: pause
        image: k8s.gcr.io/pause:3.0
      tolerations:
      - effect: NoExecute
        key: node-role.kubernetes.io/etcd
        operator: Exists
      - effect: NoSchedule
        key: node-role.kubernetes.io/controlplane
        operator: Exists
```

Pour déployer le DaemonSet et la configuration de check, exécutez la commande suivante :

```shell
kubectl apply -f <filename>
```


## Kubernetes sur des services gérés (AKS, GKE) {#services-geres}

Sur d'autres services gérés, comme Azure Kubernetes Service (AKS) et Google Kubernetes Engine (GKE), l'utilisateur ne peut pas accéder aux composants du plan de contrôle. Il n'est donc pas possible d'exécuter les checks `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` et `etcd` dans ces environnements.


[1]: https://docs.datadoghq.com/fr/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/fr/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/fr/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/fr/integrations/kube_scheduler/
[5]: https://aws.github.io/aws-eks-best-practices/reliability/docs/controlplane/#monitor-control-plane-metrics
[6]: https://docs.datadoghq.com/fr/agent/cluster_agent/setup
[7]: https://docs.datadoghq.com/fr/agent/cluster_agent/clusterchecks/
[8]: https://docs.datadoghq.com/fr/agent/cluster_agent/endpointschecks/
[9]: https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/manage-clusters/nodes-and-node-pools
[10]: https://github.com/DataDog/helm-charts/blob/main/examples/datadog/agent_on_rancher_values.yaml
[11]: https://docs.aws.amazon.com/eks/latest/userguide/view-raw-metrics.html
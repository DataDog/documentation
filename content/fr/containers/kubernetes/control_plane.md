---
aliases:
- /fr/agent/kubernetes/control_plane
description: Surveillez les composants du plan de contrôle Kubernetes, y compris le
  serveur API, etcd, le gestionnaire de contrôleur et le planificateur.
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Collectez les journaux de votre application
- link: /agent/kubernetes/apm
  tag: Documentation
  text: Collectez les traces de votre application
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Collectez vos métriques Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: Collectez automatiquement vos métriques et journaux d'application
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs uniquement
- link: /agent/kubernetes/tag
  tag: Documentation
  text: Attribuez des étiquettes à toutes les données émises par un conteneur
title: Surveillance du plan de contrôle Kubernetes
---
## Aperçu

Cette section vise à documenter les spécificités et à fournir de bonnes configurations de base pour la surveillance du plan de contrôle Kubernetes. Vous pouvez ensuite personnaliser ces configurations pour ajouter toute fonctionnalité de Datadog.

Avec les intégrations Datadog pour le [serveur API][1], [Etcd][2], [Gestionnaire de contrôleur][3] et [Planificateur][4], vous pouvez collecter des métriques clés de ces quatre composants du plan de contrôle Kubernetes.

* [Kubernetes avec Kubeadm](#Kubeadm)
* [Kubernetes sur Amazon EKS](#EKS)
* [Kubernetes sur OpenShift 4](#OpenShift4)
* [Kubernetes sur OpenShift 3](#OpenShift3)
* [Kubernetes sur Talos Linux](#TalosLinux)
* [Kubernetes sur Rancher Kubernetes Engine (v2.5+)](#RKE)
* [Kubernetes sur Rancher Kubernetes Engine (\<v2.5)](#RKEBefore2_5)
* [Kubernetes sur des services gérés (AKS, GKE)](#ManagedServices)

## Kubernetes avec Kubeadm {#Kubeadm}

Les configurations suivantes sont testées sur Kubernetes `v1.18+`.

### Serveur API

L'intégration du serveur API est configurée automatiquement. L'Agent Datadog le découvre automatiquement.

### Etcd

En fournissant un accès en lecture aux certificats Etcd situés sur l'hôte, l'Agent Datadog peut communiquer avec Etcd et commencer à collecter des métriques Etcd.

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

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
        name: registry.datadoghq.com/cluster-agent:latest
    nodeAgent:
      image:
        name: registry.datadoghq.com/agent:latest
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

### Gestionnaire de contrôleur et Planificateur

#### Ports non sécurisés

Si les ports non sécurisés de vos instances de Gestionnaire de contrôleur et de Planificateur sont activés, l'Agent Datadog découvre les intégrations et commence à collecter des métriques sans configuration supplémentaire.

#### Ports sécurisés

Les ports sécurisés permettent l'authentification et l'autorisation pour protéger vos composants de plan de contrôle. L'Agent Datadog peut collecter des métriques du Gestionnaire de contrôleur et du Planificateur en ciblant leurs ports sécurisés.

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

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
        name: registry.datadoghq.com/cluster-agent:latest
    nodeAgent:
      image:
        name: registry.datadoghq.com/agent:latest
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

**Notes:**

- Le champ `ssl_verify` dans la configuration `kube_controller_manager` et `kube_scheduler` doit être défini sur `false` lors de l'utilisation de certificats auto-signés.
- Lorsque vous ciblez des ports sécurisés, l'option `bind-address` dans votre configuration du Gestionnaire de Contrôleur et du Planificateur doit être accessible par l'Agent Datadog. Exemple :

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

## Kubernetes sur Amazon EKS {#EKS}

### Méthode recommandée

<div class="alert alert-info">Cette fonctionnalité est en préversion.</div>

Datadog prend en charge la surveillance des composants du Plan de Contrôle Kubernetes, y compris le Serveur API, le Gestionnaire de Contrôleur et le Planificateur.

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

#### Prérequis

1. Datadog Operator >= `v1.18.0`
1. Agent Datadog >= `v7.69`

#### Configuration générale

La surveillance du plan de contrôle est activée par défaut, mais nécessite que l'introspection soit activée.

Vous pouvez activer l'introspection en utilisant le [chart Helm datadog-operator](https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator) :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

En utilisant la ligne de commande :

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Puisque cette fonctionnalité est activée par défaut, vous pouvez déployer une spécification minimale de DatadogAgent.

{{% /tab %}}

{{% tab "Helm" %}}

#### Prérequis

1. Version du chart Helm >= `3.152.0`
1. Datadog Agent >= `v7.69`

#### Configuration générale

Activez la surveillance du plan de contrôle en utilisant l'option `providers.eks.controlPlaneMonitoring` :

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
Vérifiez que les vérifications sont en cours d'exécution :

```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Recherchez :
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`

Vous devriez voir les métriques du plan de contrôle dans Datadog, y compris :
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`

### Configuration héritée

Amazon Elastic Kubernetes Service (EKS) prend en charge la surveillance de tous les composants du plan de contrôle à l'aide de vérifications de cluster.

#### Prérequis
- Un cluster EKS fonctionnant sur la version Kubernetes >= 1.28
- Déployez l'Agent en utilisant l'une des options suivantes :
  - Version du chart Helm >= `3.90.1`
  - Datadog Operator >= `v1.13.0`
- Activez le [Cluster Agent][6] de Datadog

Ajoutez les annotations suivantes au service `default/kubernetes` :

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

**Notes:**
- Amazon expose les métriques `kube_controller_manager` et `kube_scheduler` sous le groupe d'API [`metrics.eks.amazonaws.com`][11].
- L'ajout de `"extra_headers":{"accept":"*/*"}` empêche les erreurs `HTTP 406` lors de la requête de l'API des métriques EKS.

## Kubernetes sur OpenShift 4 {#OpenShift4}

<div class="alert alert-info">Cette fonctionnalité est en préversion.</div>

Datadog prend en charge la surveillance des composants du plan de contrôle Kubernetes, y compris le serveur API, etcd, le gestionnaire de contrôleur et le planificateur.

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

#### Prérequis

1. Datadog Operator >= `v1.18.0`
1. Agent Datadog >= `v7.69`

**Remarque** : `etcd` n'est pas pris en charge sur les versions 4.0-4.13.

#### Configuration générale

La surveillance du plan de contrôle est activée par défaut, mais nécessite que l'introspection soit activée.

Vous pouvez activer l'introspection en utilisant le [chart Helm datadog-operator][12] :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

En utilisant la ligne de commande :

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Ou, pour les **utilisateurs d'OpenShift** qui ont installé l'opérateur via OperatorHub/Marché (la [méthode recommandée](install-openshift.md)), en patchant la version du service de cluster de l'opérateur :

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

Puisque cette fonctionnalité est activée par défaut, vous pouvez déployer une spécification minimale de DatadogAgent.

Activez `features.clusterChecks.useClusterChecksRunners` pour planifier des vérifications là-bas ; sinon, les vérifications du plan de contrôle s'exécutent sur l'Agent Node.

Pour OpenShift 4.14 et versions ultérieures, la surveillance d'etcd nécessite de copier les certificats etcd. Vérifiez les journaux de l'opérateur pour la commande exacte. Voir l'exemple suivant (ajustez l'espace de noms si nécessaire) :

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

**Remarque** : `etcd` n'est pas pris en charge sur les versions 4.0-4.13.

#### Configuration générale

Activez la surveillance du plan de contrôle en utilisant l'option `providers.openshift.controlPlaneMonitoring` :

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  openshift:
    controlPlaneMonitoring: true
{{< /code-block >}}

Pour OpenShift 4.14 et versions ultérieures, la surveillance d'etcd nécessite de copier les certificats etcd. Pour les copier dans le même espace de noms que l'Agent Datadog :

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

{{% /tab %}}
{{< /tabs >}}

#### Validation
Vérifiez que les vérifications sont en cours d'exécution :

```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Recherchez :
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`
- `etcd`

Vous devriez voir les métriques du plan de contrôle dans Datadog, y compris :
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`
- `etcd.*`

### Configuration héritée

Sur OpenShift 4, tous les composants du plan de contrôle peuvent être surveillés à l'aide de vérifications d'endpoint.

#### Prérequis

1. Activez le [Cluster Agent][6] de Datadog
1. Activez les [vérifications de cluster][7]
1. Activez les [vérifications d'endpoint][8]
1. Assurez-vous que vous êtes connecté avec des autorisations suffisantes pour modifier les services et créer des secrets.

#### Serveur API

Le serveur API fonctionne derrière le service `kubernetes` dans l'espace de noms `default`. Annotez ce service avec la configuration `kube_apiserver_metrics` :

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La dernière annotation `ad.datadoghq.com/endpoints.resolve` est nécessaire car le service est devant des pods statiques. L'Agent de Cluster Datadog planifie les vérifications en tant que vérifications de point de terminaison et les dispatches aux Exécuteurs de Vérification de Cluster. Les nœuds sur lesquels ils s'exécutent peuvent être identifiés avec :

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etcd

{{% collapse-content title="Etcd OpenShift 4.0 - 4.13" level="h4" %}}
Des certificats sont nécessaires pour communiquer avec le service Etcd, qui peut être trouvé dans le secret `kube-etcd-client-certs` dans l'espace de noms `openshift-monitoring`. Pour donner à l'Agent Datadog accès à ces certificats, copiez-les d'abord dans le même espace de noms que celui dans lequel l'Agent Datadog s'exécute :

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

Ces certificats doivent être montés sur les pods des Exécuteurs de Vérification de Cluster en ajoutant les volumes et les volumeMounts comme ci-dessous.

**Note** : Les montages sont également inclus pour désactiver le fichier de configuration automatique de vérification Etcd emballé avec l'agent.


{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

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

Ensuite, annotez le service s'exécutant devant Etcd :

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'Agent de Cluster Datadog planifie les vérifications en tant que vérifications de point de terminaison et les dispatches aux Exécuteurs de Vérification de Cluster.

{{% /collapse-content %}}


{{% collapse-content title="Etcd OpenShift 4.14 et versions ultérieures" level="h4" %}}

Des certificats sont nécessaires pour communiquer avec le service Etcd, qui peut être trouvé dans le secret `etcd-metric-client` dans l'espace de noms `openshift-etcd-operator`. Pour donner à l'Agent Datadog accès à ces certificats, copiez-les dans le même espace de noms que l'Agent Datadog :

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

Ces certificats doivent être montés sur les pods des Exécuteurs de Vérification de Cluster en ajoutant les volumes et les volumeMounts comme ci-dessous.

**Note** : Les montages sont également inclus pour désactiver le fichier de configuration automatique de vérification Etcd emballé avec l'agent.


{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

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

Ensuite, annotez le service s'exécutant devant Etcd :

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'
```

L'Agent Cluster Datadog planifie les vérifications en tant que vérifications de point de terminaison et les transmet aux Cluster Check Runners.

{{% /collapse-content %}}


#### Gestionnaire de Contrôleur

Le Gestionnaire de Contrôleur s'exécute derrière le service `kube-controller-manager` dans l'espace de noms `openshift-kube-controller-manager`. Annotez le service avec la configuration de vérification :


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'Agent Cluster Datadog planifie les vérifications en tant que vérifications de point de terminaison et les transmet aux Cluster Check Runners.



#### Planificateur

Le Planificateur s'exécute derrière le service `scheduler` dans l'espace de noms `openshift-kube-scheduler`. Annotez le service avec la configuration de vérification :


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'Agent Cluster Datadog planifie les vérifications en tant que vérifications de point de terminaison et les transmet aux Cluster Check Runners.


## Kubernetes sur OpenShift 3 {#OpenShift3}

Sur OpenShift 3, tous les composants du plan de contrôle peuvent être surveillés à l'aide de vérifications de point de terminaison.

### Prérequis

1. Activez l'[Agent de Cluster Datadog][6]
1. Activer [les vérifications de cluster][7]
1. Activer [les vérifications de point de terminaison][8]
1. Assurez-vous que vous êtes connecté avec des autorisations suffisantes pour créer et modifier des services.

### Serveur API

Le serveur API fonctionne derrière le service `kubernetes` dans l'espace de noms `default`. Annotez ce service avec la configuration `kube_apiserver_metrics` :

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La dernière annotation `ad.datadoghq.com/endpoints.resolve` est nécessaire car le service est devant des pods statiques. L'Agent Cluster Datadog planifie les vérifications en tant que vérifications de point de terminaison et les transmet aux Cluster Check Runners. Les nœuds sur lesquels ils s'exécutent peuvent être identifiés avec :

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Des certificats sont nécessaires pour communiquer avec le service Etcd, qui se trouve sur l'hôte. Ces certificats doivent être montés sur les pods des Cluster Check Runners en ajoutant les volumes et les volumeMounts comme ci-dessous.

**Remarque** : Les montages sont également inclus pour désactiver le fichier de configuration automatique de vérification Etcd fourni avec l'agent.

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

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

Les modifications directes de ce service ne sont pas conservées, donc faites une copie du service Etcd :

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

Annotez le service copié avec la configuration de vérification :

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'Agent Cluster Datadog planifie les vérifications en tant que vérifications de point de terminaison et les transmet aux Cluster Check Runners.


### Gestionnaire de contrôleur et planificateur

Le Gestionnaire de Contrôleur et le Planificateur s'exécutent derrière le même service, `kube-controllers` dans l'espace de noms `kube-system`. Les modifications directes du service ne sont pas conservées, donc faites une copie du service :

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

Annotez le service copié avec les configurations de vérification :

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'Agent Cluster Datadog planifie les vérifications en tant que vérifications de point de terminaison et les transmet aux Cluster Check Runners.

## Kubernetes sur Talos Linux {#TalosLinux}

Helm est la méthode d'installation recommandée pour Talos Linux. Utilisez Helm en définissant le flag `providers.talos.enabled` sur `true`.

### Serveur API

L'intégration du serveur API est configurée automatiquement. L'Agent Datadog le découvre automatiquement.

### Etcd

En fournissant un accès en lecture aux certificats etcd situés sur l'hôte, la vérification de l'agent Datadog peut communiquer avec etcd et commencer à collecter des métriques etcd.

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
      # You can configure the Agent to only run this check on the host where etcd is running
      # by using `ad_identifiers` for a pod that would only be running on a control-plane node.
      # This is to avoid errors when the Agent is running on worker nodes.
      # Another approach is to run a minimal pod on the control-plane node and use it for `ad_identifiers`.
      ad_identifiers:
        - kube-scheduler
      instances:
          # This is the node IP where metrics are exposed because kube-scheduler runs in host network mode.
          # Otherwise, the IP could be hardcoded to the master node IP (also in the environment variable `DD_KUBERNETES_KUBELET_HOST`).
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
agents:
  # Tolerations are needed to be scheduled on control-plane nodes running etcd
  tolerations:
  - key: node-role.kubernetes.io/control-plane
    operator: Exists
    effect: NoSchedule
  volumes:
    # On Talos, etcd certificates are stored in /system/secrets/etcd
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

### Gestionnaire de Contrôleur et Planificateur

#### Ports sécurisés

Les ports sécurisés permettent l'authentification et l'autorisation pour protéger vos composants de plan de contrôle. L'Agent Datadog peut collecter des métriques du Gestionnaire de Contrôleur et du Planificateur en ciblant leurs ports sécurisés.

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

**Notes:**

- Le champ `ssl_verify` dans la configuration `kube_controller_manager` et `kube_scheduler` doit être défini sur `false` lors de l'utilisation de certificats auto-signés.
- Lorsque vous ciblez des ports sécurisés, l'option `bind-address` dans votre configuration du Gestionnaire de Contrôleur et du Planificateur doit être accessible par l'Agent Datadog. Appliquez le patch ci-dessous aux nœuds de plan de contrôle lors de la génération du cluster ; ou, pour les nœuds Talos en cours d'exécution, exécutez `talosctl patch mc -n <control-plane-node1,control-plane-node2> --patch @controlplane-datadog-monitoring-patch.yaml`.

{{< code-block lang="yaml" filename="controlplane-datadog-monitoring-patch.yaml" >}}
cluster:
  controllerManager:
    extraArgs:
      bind-address: 0.0.0.0
  scheduler:
    extraArgs:
      bind-address: 0.0.0.0
{{< /code-block >}}

## Kubernetes sur Rancher Kubernetes Engine (v2.5+) {#RKE}

Rancher v2.5 s'appuie sur [PushProx][9] pour exposer les points de terminaison des métriques du plan de contrôle, ce qui permet à l'Agent Datadog d'exécuter des vérifications du plan de contrôle et de collecter des métriques.

### Prérequis

1. Installez l'Agent Datadog avec le [chart rancher-monitoring][10].
2. Les `pushprox` daemonsets sont déployés avec `rancher-monitoring` et fonctionnent dans l'espace de noms `cattle-monitoring-system`.

### Serveur API

Pour configurer la vérification `kube_apiserver_metrics`, ajoutez les annotations suivantes au service `default/kubernetes` :

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Ajoutez des services Kubernetes pour configurer les vérifications d'Autodécouverte.

En ajoutant des services Kubernetes sans tête pour définir les configurations de vérification, l'Agent Datadog est capable de cibler les pods `pushprox` et de collecter des métriques.

Appliquez `rancher-control-plane-services.yaml` :

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

Déployez l'Agent Datadog avec des manifests basés sur les configurations suivantes :

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

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


## Kubernetes sur Rancher Kubernetes Engine (avant v2.5) {#RKEBefore2_5}

### Serveur API, Gestionnaire de Contrôleur et Planificateur

Installez l'Agent Datadog avec le [chart rancher-monitoring][10].

Les composants du plan de contrôle s'exécutent sur Docker en dehors de Kubernetes. Dans Kubernetes, le service `kubernetes` dans l'espace de noms `default` cible l'IP(s) du nœud du plan de contrôle. Vous pouvez confirmer cela en exécutant `$ kubectl describe endpoints kubernetes`.

Annotez ce service avec des vérifications de point de terminaison (gérées par l'Agent Cluster Datadog) pour surveiller le Serveur API, le Gestionnaire de Contrôleur et le Planificateur :

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

Etcd s'exécute dans Docker en dehors de Kubernetes, et des certificats sont nécessaires pour communiquer avec le service Etcd. Les étapes suggérées pour configurer la surveillance d'Etcd nécessitent un accès SSH à un nœud du plan de contrôle exécutant Etcd.

1. Connectez-vous en SSH au nœud du plan de contrôle en suivant la [documentation de Rancher][9]. Confirmez qu'Etcd s'exécute dans un conteneur Docker avec `$ docker ps`, puis utilisez `$ docker inspect etcd` pour trouver l'emplacement des certificats utilisés dans la commande d'exécution (`"Cmd"`), ainsi que le chemin hôte des montages.

Les trois flags dans la commande à rechercher sont :

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. En utilisant les informations de montage disponibles dans la sortie `$ docker inspect etcd`, définissez `volumes` et `volumeMounts` dans la configuration de l'Agent Datadog. Incluez également des tolérances afin que l'Agent Datadog puisse s'exécuter sur les nœuds du plan de contrôle.

Voici des exemples de configuration de l'Agent Datadog avec Helm et l'Opérateur Datadog :


{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

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


3. Configurez un DaemonSet avec un conteneur de pause pour exécuter la vérification Etcd sur les nœuds exécutant Etcd. Ce DaemonSet s'exécute sur le réseau hôte afin qu'il puisse accéder au service Etcd. Il dispose également de la configuration de vérification et des tolérances nécessaires pour s'exécuter sur le(s) nœud(s) du plan de contrôle. Assurez-vous que les chemins des fichiers de certificat montés correspondent à ce que vous avez configuré sur votre instance, et remplacez la portion `<...>` en conséquence.

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

Pour déployer le DaemonSet et la configuration de vérification, exécutez

```shell
kubectl apply -f <filename>
```


## Kubernetes sur des services gérés (AKS, GKE) {#ManagedServices}

Sur d'autres services gérés, tels que le service Azure Kubernetes (AKS) et Google Kubernetes Engine (GKE), l'utilisateur ne peut pas accéder aux composants du plan de contrôle. En conséquence, il n'est pas possible d'exécuter les vérifications `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` ou `etcd` dans ces environnements.


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
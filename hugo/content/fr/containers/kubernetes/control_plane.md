---
aliases:
- /fr/agent/kubernetes/control_plane
description: Surveillez les composants du plan de contrôle Kubernetes, notamment le
  serveur API, etcd, le gestionnaire de contrôleur et le planificateur
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/apm
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Recueillez vos métriques Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: Recueillez automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
title: Surveillance du plan de contrôle Kubernetes
---
## Présentation {#overview}

Cette section vise à documenter les spécificités et à fournir de bonnes configurations de base pour surveiller le plan de contrôle Kubernetes. Vous pouvez ensuite personnaliser ces configurations pour ajouter n'importe quelle fonctionnalité Datadog.

Grâce aux intégrations Datadog pour le [serveur API][1], [Etcd][2], le [gestionnaire de contrôleur][3] et le [planificateur][4], vous pouvez collecter des métriques clés à partir des quatre composants du plan de contrôle Kubernetes.

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

### Serveur API {#api-server}

L'intégration du serveur API est configurée automatiquement. Le Datadog Agent le découvre automatiquement.

### Etcd {#etcd}

En fournissant un accès en lecture aux certificats Etcd situés sur le host, la vérification du Datadog Agent peut communiquer avec Etcd et commencer à collecter les métriques Etcd.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

### Gestionnaire de contrôleur et planificateur {#controller-manager-and-scheduler}

#### Ports non sécurisés {#insecure-ports}

Si les ports non sécurisés de vos instances du gestionnaire de contrôleur et du planificateur sont activés, le Datadog Agent détecte les intégrations et commence à collecter des métriques sans configuration supplémentaire.

#### Ports sécurisés {#secure-ports}

Les ports sécurisés permettent l'authentification et l'autorisation pour protéger les composants de votre plan de contrôle. Le Datadog Agent peut collecter les métriques du gestionnaire de contrôleur et du planificateur en ciblant leurs ports sécurisés.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

**Remarques :**

- Le champ `ssl_verify` dans la configuration `kube_controller_manager` et `kube_scheduler` doit être défini sur `false` lors de l'utilisation de certificats auto-signés.
- Lors du ciblage de ports sécurisés, l'option `bind-address` dans votre configuration Controller Manager et Scheduler doit être accessible par le Datadog Agent. Exemple :

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

### Méthode recommandée {#recommended-method}

<div class="alert alert-info">Cette fonctionnalité est en préversion.</div>

Datadog prend en charge la surveillance des composants du plan de contrôle Kubernetes, notamment l'API Server, le Controller Manager et le Scheduler.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### Prérequis {#prerequisites}

1. Datadog Operator >= `v1.18.0`
1. Datadog Agent >= `v7.69`

#### Configuration générale {#general-setup}

Avec Datadog Operator `v1.29.0` et les versions ultérieures, Datadog Operator détecte EKS à partir des étiquettes des nœuds et active automatiquement la surveillance du plan de contrôle ; une spécification `DatadogAgent` minimale suffit donc. Aucune configuration supplémentaire n'est requise.

{{% collapse-content title="Datadog Operator de la version v1.18.0 à la version v1.28.x" level="h5" %}}

Sur ces versions, la surveillance du plan de contrôle est activée par défaut mais nécessite une introspection. Activez l'introspection avec le [chart Helm datadog-operator][1] :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Depuis la ligne de commande :

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Déployez ensuite une spécification `DatadogAgent` minimale.

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Helm" %}}

#### Prérequis {#prerequisites-1}

1. Version du chart Helm >= `3.152.0`
1. Datadog Agent >= `v7.69`

#### Configuration générale {#general-setup-1}

Activez la surveillance du plan de contrôle à l'aide de l'option `providers.eks.controlPlaneMonitoring` :

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

#### Validation {#validation}
Vérifiez que les vérifications sont en cours d'exécution :

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

### Configuration héritée {#legacy-setup}

Amazon Elastic Kubernetes Service (EKS) prend en charge la surveillance de tous les composants du plan de contrôle à l'aide de cluster checks.

#### Prérequis {#prerequisites-2}
- Un cluster EKS exécutant une version de Kubernetes >= 1.28
- Déployez l'Agent en utilisant l'une des méthodes suivantes :
  - Version du chart Helm >= `3.90.1`
  - Datadog Operator >= `v1.13.0`
- Activez le [Cluster Agent][6] de Datadog

Ajoutez les annotations suivantes au service `default/kubernetes` :

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

**Remarques :**
- Amazon expose les métriques `kube_controller_manager` et `kube_scheduler` via le groupe d'API [`metrics.eks.amazonaws.com`][11].
- L'ajout de `"extra_headers":{"accept":"*/*"}` évite les erreurs `HTTP 406` lors de l'envoi de requêtes à l'API des métriques EKS.

## Kubernetes sur OpenShift 4 {#OpenShift4}

<div class="alert alert-info">Cette fonctionnalité est en préversion.</div>

Datadog prend en charge la surveillance des composants du plan de contrôle Kubernetes, notamment l'API Server, etcd, le Controller Manager et le Scheduler.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### Prérequis {#prerequisites-3}

1. Datadog Operator >= `v1.18.0`
1. Datadog Agent >= `v7.69`

**Remarque** : `etcd` n'est pas pris en charge sur les versions 4.0 à 4.13.

#### Configuration générale {#general-setup-2}

Avec Datadog Operator `v1.29.0` et les versions ultérieures, l'opérateur détecte OpenShift à partir de l'étiquette de nœud `node.openshift.io/os_id` et active automatiquement la surveillance du plan de contrôle ; une spécification `DatadogAgent` minimale suffit donc. Aucune configuration supplémentaire n'est requise.

{{% collapse-content title="Datadog Operator v1.18.0 à v1.28.x" level="h5" %}}

Sur ces versions, la surveillance du plan de contrôle est activée par défaut mais nécessite une introspection. Activez l'introspection avec le [chart Helm datadog-operator][1] :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Depuis la ligne de commande :

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Si vous avez installé l'opérateur via OperatorHub ou Marketplace, ce qui est la [méthode recommandée][2], appliquez plutôt un patch à la version du service de cluster de l'opérateur :

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

Déployez ensuite une spécification `DatadogAgent` minimale.

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md

{{% /collapse-content %}}

Activez `features.clusterChecks.useClusterChecksRunners` pour y planifier des vérifications ; sinon, les vérifications du plan de contrôle s'exécutent sur le Node Agent.

Pour OpenShift 4.14 et versions ultérieures, la surveillance d'etcd nécessite de copier les certificats etcd. Consultez les logs de l'opérateur pour obtenir la commande exacte. Consultez l'exemple suivant (ajustez l'espace de nommage si nécessaire) :

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | \
  sed 's/namespace: openshift-etcd-operator/namespace: datadog/' | \
  oc apply -f -
```

{{% /tab %}}
{{% tab "Helm" %}}

#### Prérequis {#prerequisites-4}

1. Version du chart Helm >= `3.150.0`
1. Datadog Agent >= `v7.69`

**Remarque** : `etcd` n'est pas pris en charge sur les versions 4.0 à 4.13.

#### Configuration générale {#general-setup-3}

Activez la surveillance du plan de contrôle à l'aide de l'option `providers.openshift.controlPlaneMonitoring` :

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  openshift:
    controlPlaneMonitoring: true
{{< /code-block >}}

Pour OpenShift 4.14 et versions ultérieures, la surveillance d'etcd nécessite de copier les certificats etcd. Pour les copier dans le même espace de nommage que le Datadog Agent :

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

{{% /tab %}}
{{< /tabs >}}

#### Validation {#validation-1}
Vérifiez que les vérifications sont en cours d'exécution :

```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Recherchez :
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`
- `etcd`

Vous devriez voir les métriques du plan de contrôle dans Datadog, notamment :
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`
- `etcd.*`

### Configuration héritée {#legacy-setup-1}

Sur OpenShift 4, tous les composants du plan de contrôle peuvent être surveillés à l'aide de checks d'endpoint.

#### Prérequis {#prerequisites-5}

1. Activez le Datadog [Cluster Agent][6]
1. Activez les [checks de cluster][7]
1. Activez les [checks d'endpoint][8]
1. Assurez-vous d'être connecté avec des autorisations suffisantes pour modifier des services et créer des secrets.

#### Serveur API {#api-server-1}

Le serveur API s'exécute derrière le service `kubernetes` dans l'espace de nommage `default`. Annotez ce service avec la configuration `kube_apiserver_metrics` :

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La dernière annotation `ad.datadoghq.com/endpoints.resolve` est nécessaire car le service se trouve devant des pods statiques. Le Datadog Cluster Agent planifie les checks en tant que checks d'endpoint et les distribue aux Cluster Check Runners. Les nœuds sur lesquels ils s'exécutent peuvent être identifiés avec :

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etcd {#etcd-1}

{{% collapse-content title="Etcd OpenShift 4.0 - 4.13" level="h5" %}}
Les certificats nécessaires pour communiquer avec le service Etcd se trouvent dans le secret `kube-etcd-client-certs` de l'espace de noms `openshift-monitoring`. Pour donner au Datadog Agent accès à ces certificats, copiez-les d'abord dans l'espace de noms où s'exécute le Datadog Agent :

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

Ces certificats doivent être montés sur les pods des Cluster Check Runners en ajoutant les volumes et volumeMounts comme ci-dessous.

**Remarque** : des montages sont également inclus pour désactiver le fichier d'autoconfiguration du check Etcd fourni avec l'Agent.


{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Ensuite, annotez le service s'exécutant devant Etcd :

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

Le Datadog Cluster Agent planifie les checks en tant que checks d'endpoint et les distribue aux Cluster Check Runners.

{{% /collapse-content %}}


{{% collapse-content title="Etcd OpenShift 4.14 et versions ultérieures" level="h5" %}}

Les certificats nécessaires pour communiquer avec le service Etcd se trouvent dans le secret `etcd-metric-client` de l'espace de noms `openshift-etcd-operator`. Pour donner au Datadog Agent accès à ces certificats, copiez-les dans le même espace de noms que le Datadog Agent :

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

Ces certificats doivent être montés sur les pods des Cluster Check Runners en ajoutant les volumes et volumeMounts comme ci-dessous.

**Remarque** : des montages sont également inclus pour désactiver le fichier d'autoconfiguration du check Etcd fourni avec l'Agent.


{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Le Datadog Cluster Agent planifie les checks en tant que checks d'endpoint et les distribue aux Cluster Check Runners.

{{% /collapse-content %}}


#### Controller Manager {#controller-manager}

Le Controller Manager s'exécute derrière le service `kube-controller-manager` dans l'espace de noms `openshift-kube-controller-manager`. Annotez le service avec la configuration du check :


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

Le Datadog Cluster Agent planifie les checks en tant que checks d'endpoint et les distribue aux Cluster Check Runners.



#### Scheduler {#scheduler}

Le Scheduler s'exécute derrière le service `scheduler` dans l'espace de noms `openshift-kube-scheduler`. Annotez le service avec la configuration du check :


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

Le Datadog Cluster Agent planifie les checks en tant que checks d'endpoint et les distribue aux Cluster Check Runners.


## Kubernetes sur OpenShift 3 {#OpenShift3}

Sur OpenShift 3, tous les composants du plan de contrôle peuvent être surveillés à l'aide de checks d'endpoint.

### Prérequis {#prerequisites-6}

1. Activez le Datadog [Cluster Agent][6]
1. Activez les [checks de cluster][7]
1. Activez les [checks d'endpoint][8]
1. Assurez-vous d'être connecté avec des autorisations suffisantes pour créer et modifier des services.

### Serveur API {#api-server-2}

Le serveur API s'exécute derrière le service `kubernetes` dans l'espace de noms `default`. Annotez ce service avec la configuration `kube_apiserver_metrics` :

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La dernière annotation `ad.datadoghq.com/endpoints.resolve` est nécessaire car le service se trouve devant des pods statiques. Le Datadog Cluster Agent planifie les checks en tant que checks d'endpoint et les distribue aux Cluster Check Runners. Les nœuds sur lesquels ils s'exécutent peuvent être identifiés avec :

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd {#etcd-2}

Des certificats sont nécessaires pour communiquer avec le service Etcd, lesquels se trouvent sur l'host. Ces certificats doivent être montés sur les pods des Cluster Check Runners en ajoutant les volumes et volumeMounts comme ci-dessous.

**Remarque** : des montages sont également inclus pour désactiver le fichier d'autoconfiguration du check Etcd fourni avec l'Agent.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Les modifications directes de ce service ne sont pas conservées, créez donc une copie du service Etcd :

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

Annotez le service copié avec la configuration du check :

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

Le Datadog Cluster Agent planifie les checks en tant que checks d'endpoint et les distribue aux Cluster Check Runners.


### Controller Manager et Scheduler {#controller-manager-and-scheduler-1}

Le Controller Manager et le Scheduler s'exécutent derrière le même service, `kube-controllers` dans l'espace de noms `kube-system`. Les modifications directes du service ne sont pas conservées, créez donc une copie du service :

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

Annotez le service copié avec les configurations des checks :

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

Le Datadog Cluster Agent planifie les checks en tant que checks d'endpoint et les distribue aux Cluster Check Runners.

## Kubernetes sur Talos Linux {#TalosLinux}

Le Datadog Operator et Helm prennent tous deux en charge Talos Linux.

Avec le Datadog Operator, la surveillance du plan de contrôle sur Talos nécessite la version 1.32.0 ou ultérieure, qui détecte Talos à partir de l'image du système d'exploitation du nœud et configure les checks pour vous. Avec Helm, définissez `providers.talos.enabled` sur `true` et déclarez chaque check vous-même.

Avant de déployer l'Agent, étiquetez l'espace de noms cible pour le niveau `privileged` de la norme Pod Security Standard, comme décrit dans la [section Talos Linux des distributions Kubernetes][13].

### Serveur API {#api-server-3}

L'intégration du serveur API est configurée automatiquement. Le Datadog Agent le découvre automatiquement.

### Etcd {#TalosEtcd}

En fournissant un accès en lecture aux certificats etcd situés sur l'host, le check du Datadog Agent peut communiquer avec etcd et commencer à collecter les métriques etcd.

Sur Talos, ces certificats n'existent que sur les nœuds du plan de contrôle, l'Agent doit donc tolérer le taint du plan de contrôle pour exécuter le check etcd.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Avec Datadog Operator version 1.32.0 ou ultérieure, la surveillance du plan de contrôle est activée par défaut, et Datadog Operator crée la configuration du check etcd et monte les certificats de l'host pour vous. Le seul ajout à un DatadogAgent standard est la tolérance du plan de contrôle :

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
    nodeAgent:
      # Required for the etcd check only. Without it, the API server,
      # Controller Manager, and Scheduler checks still run as cluster checks.
      tolerations:
        - key: node-role.kubernetes.io/control-plane
          operator: Exists
          effect: NoSchedule
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

{{% /tab %}}
{{< /tabs >}}

### Controller Manager et Scheduler {#controller-manager-and-scheduler-2}

#### Ports sécurisés {#secure-ports-1}

Les ports sécurisés permettent l'authentification et l'autorisation pour protéger les composants de votre plan de contrôle. Le Datadog Agent peut collecter les métriques du Controller Manager et du Scheduler en ciblant leurs ports sécurisés.

Avec Datadog Operator version 1.32.0 ou ultérieure, Datadog Operator exécute les checks du serveur API, du Controller Manager et du Scheduler en tant que checks de cluster ; ils ne nécessitent donc ni tolérance ni configuration de l'Agent. La tolérance dans la section [Etcd](#TalosEtcd) s'applique uniquement au check etcd. Le Controller Manager et le Scheduler nécessitent toujours que `bind-address` soit défini sur `0.0.0.0`.

Avec Helm, déclarez les checks comme suit :

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

**Remarques :**

- Le champ `ssl_verify` dans la configuration `kube_controller_manager` et `kube_scheduler` doit être défini sur `false` lors de l'utilisation de certificats auto-signés. Datadog Operator version 1.32.0 ou ultérieure définit ce paramètre pour vous.
- Lorsque des ports sécurisés sont ciblés, l'option `bind-address` dans la configuration de votre Controller Manager et de votre Scheduler doit être accessible au Datadog Agent. Appliquez le correctif ci-dessous aux nœuds du plan de contrôle lors de la génération du cluster, ou exécutez `talosctl patch mc -n <control-plane-node1,control-plane-node2> --patch @controlplane-datadog-monitoring-patch.yaml` pour les nœuds Talos déjà en cours d'exécution.

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

Rancher v2.5 s'appuie sur [PushProx][9] pour exposer les endpoints de métriques du plan de contrôle, ce qui permet au Datadog Agent d'exécuter des vérifications du plan de contrôle et de collecter des métriques.

### Prérequis {#prerequisites-7}

1. Installez le Datadog Agent avec le [chart rancher-monitoring][10].
2. Les DaemonSets `pushprox` sont déployés avec `rancher-monitoring` et s'exécutent dans l'espace de noms `cattle-monitoring-system`.

### API Server {#api-server-4}

Pour configurer la vérification `kube_apiserver_metrics`, ajoutez les annotations suivantes au service `default/kubernetes` :

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Ajoutez des services Kubernetes pour configurer les vérifications d'Autodiscovery {#add-kubernetes-services-to-configure-autodiscovery-checks}

En ajoutant des services Kubernetes headless pour définir les configurations de vérification, le Datadog Agent peut cibler les pods `pushprox` et collecter des métriques.

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

Déployez le Datadog Agent avec des manifestes basés sur les configurations suivantes :

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

### API Server, Controller Manager et Scheduler {#api-server-controller-manager-and-scheduler}

Installez le Datadog Agent avec le [chart rancher-monitoring][10].

Les composants du plan de contrôle s'exécutent sur Docker en dehors de Kubernetes. Au sein de Kubernetes, le service `kubernetes` dans l'espace de noms `default` cible la ou les adresses IP des nœuds du plan de contrôle. Vous pouvez le confirmer en exécutant `$ kubectl describe endpoints kubernetes`.

Vous pouvez ajouter à ce service des annotations pour les vérifications d'endpoint (gérées par le Datadog Cluster Agent) afin de surveiller l'API Server, le Controller Manager et le Scheduler :

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

### Etcd {#etcd-3}

Etcd est exécuté dans Docker en dehors de Kubernetes, et des certificats sont requis pour communiquer avec le service Etcd. Les étapes suggérées pour configurer la surveillance d'Etcd nécessitent un accès SSH à un nœud du plan de contrôle exécutant Etcd.

1. Connectez-vous en SSH au nœud du plan de contrôle en suivant la [documentation Rancher][9]. Confirmez qu'Etcd s'exécute dans un conteneur Docker avec `$ docker ps`, puis utilisez `$ docker inspect etcd` pour trouver l'emplacement des certificats utilisés dans la commande d'exécution (`"Cmd"`), ainsi que le chemin des montages sur le host.

Les trois options à rechercher dans la commande sont :

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. En utilisant les informations de montage disponibles dans la sortie `$ docker inspect etcd`, définissez `volumes` et `volumeMounts` dans la configuration du Datadog Agent. Incluez également des tolérances afin que le Datadog Agent puisse s'exécuter sur les nœuds du plan de contrôle.

Voici des exemples de configuration du Datadog Agent avec Helm et le Datadog Operator :


{{< tabs >}}
{{% tab "Datadog Operator" %}}

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


3. Configurez un DaemonSet avec un conteneur de pause pour exécuter la vérification Etcd sur les nœuds exécutant Etcd. Ce DaemonSet s'exécute sur le réseau host afin de pouvoir accéder au service Etcd. Il dispose également de la configuration de vérification et des tolérances nécessaires pour s'exécuter sur le ou les nœuds du plan de contrôle. Assurez-vous que les chemins des fichiers de certificat montés correspondent à ce que vous avez configuré sur votre instance, et remplacez la partie `<...>` en conséquence.

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

Sur d'autres services gérés, tels qu'Azure Kubernetes Service (AKS) et Google Kubernetes Engine (GKE), l'utilisateur ne peut pas accéder aux composants du plan de contrôle. Par conséquent, il n'est pas possible d'exécuter les vérifications `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` ou `etcd` dans ces environnements.


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
[13]: /fr/containers/kubernetes/distributions/#Talos
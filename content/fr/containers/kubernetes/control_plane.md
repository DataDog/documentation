---
aliases:
- /fr/agent/kubernetes/control_plane
description: Surveiller les composants du plan de contrôle de Kubernetes, notamment
  le serveur API, etcd, le gestionnaire de contrôleurs et le planificateur
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Récupérez les journaux de votre application
- link: /agent/kubernetes/apm
  tag: Documentation
  text: Recueillez les traces de votre application
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Récupérez vos métriques Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: Collectez automatiquement les métriques et les journaux de votre application
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs uniquement
- link: /agent/kubernetes/tag
  tag: Documentation
  text: Attribuer des balises à toutes les données émises par un conteneur
title: Surveillance du plan de contrôle Kubernetes
---
## Aperçu

Cette section a pour objectif de présenter les spécificités et de fournir des configurations de base adaptées à la surveillance du plan de contrôle Kubernetes. Vous pouvez ensuite personnaliser ces configurations pour y ajouter n'importe quelle fonctionnalité de Datadog.

Grâce aux intégrations Datadog pour le [serveur API][1], [Etcd][2], [Controller Manager][3] et [Scheduler][4], vous pouvez collecter des métriques clés provenant des quatre composants du plan de contrôle Kubernetes.

* [Kubernetes avec ](#Kubeadm)
* [KubeadmKubernetes sur Amazon ](#EKS)
* [EKSKubernetes sur OpenShift ](#OpenShift4)
* [4Kubernetes sur OpenShift ](#OpenShift3)
* [3Kubernetes sur Talos ](#TalosLinux)
* [LinuxKubernetes sur Rancher Kubernetes Engine (v2.5+)](#RKE)
* [Kubernetes sur Rancher Kubernetes Engine (\&lt;v2.5)](#RKEBefore2_5)
* [Kubernetes sur les services gérés (AKS, GKE)](#ManagedServices)

## Kubernetes avec Kubeadm {#Kubeadm}

Les configurations suivantes ont été testées sur le serveur API de `v1.18+`

### Kubernetes

L'intégration du serveur API est configurée automatiquement. L'agent Datadog le détecte automatiquement.

### Etcd

En accordant un accès en lecture aux certificats Etcd stockés sur l'hôte, le contrôle de l'agent Datadog peut communiquer avec Etcd et commencer à collecter les métriques Etcd.

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
{{% tab "Casque" %}}

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

### Gestionnaire de contrôleurs et planificateur - Ports

####  non sécurisés

Si les ports non sécurisés de vos instances Controller Manager et Scheduler sont activés, l'agent Datadog détecte les intégrations et commence à collecter des métriques sans configuration supplémentaire. Ports

####  sécurisés

Les ports sécurisés permettent l'authentification et l'autorisation afin de protéger les composants de votre plan de contrôle. L'agent Datadog peut collecter les métriques du gestionnaire de contrôleurs et du planificateur en ciblant leurs ports sécurisés.

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
{{% tab "Casque" %}}

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

**Remarques : **

- Le`ssl_verify`champ  dans la `kube_controller_manager`configuration  `kube_scheduler`et  doit être défini sur`false`  lors de l'utilisation de certificats auto-signés. 
- Lorsque vous ciblez des ports sécurisés, `bind-address`l'option  dans la configuration de votre Controller Manager et de votre Scheduler doit être accessible par l'agent Datadog. Exemple :

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

## Kubernetes sur Amazon EKS {#EKS}Méthode

###  recommandée

<div class="alert alert-info">Cette fonctionnalité est en phase de préversion.</div>

Datadog prend en charge la surveillance des composants du plan de contrôle de Kubernetes, notamment le serveur API, le gestionnaire de contrôleurs et le planificateur.

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

#### Prérequis

1.  : Datadog Operator >= `v1.18.0`
1. Datadog Agent >= Configuration`v7.69`

####  générale

La surveillance du plan de contrôle est activée par défaut, mais nécessite l'activation de l'introspection.

Vous pouvez activer l'introspection à l'aide du Helm chart[ datadogoperator](https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator) :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

À l'aide de la ligne de commande :
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Cette fonctionnalité étant activée par défaut, vous pouvez déployer une configuration minimale de DatadogAgent.

{{% /tab %}}

{{% tab "Casque" %}}

#### Prérequis

1.  : version de Helm Chart >= `3.152.0`
1. Datadog Agent >= Configuration`v7.69`

####  générale

Activez la surveillance du plan de contrôle à l'aide de `providers.eks.controlPlaneMonitoring`l'option :

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
Vérifiez que les contrôles sont en cours d'exécution :
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Recherchez : 
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`

vous devriez voir les métriques du plan de contrôle dans Datadog, notamment : Configuration
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`

###  héritée

Amazon Elastic Kubernetes Service (EKS) permet de surveiller tous les composants du plan de contrôle à l'aide de vérifications de cluster.

#### 
- PrérequisUn cluster EKS fonctionnant sous Kubernetes version >= 1.
- 28Déployez l'agent à l'aide de l'une des méthodes suivantes :
  - Une carte Helm version >= `3.90.1`
  - Datadog Operator >= `v1.13.0`
- Activez l'agent de cluster Datadog [Cluster Agent][6]

Ajoutez les annotations suivantes au`default/kubernetes`service :

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

**Remarques : **
- Amazon expose les métriques`kube_controller_manager``kube_scheduler`  et  dans le groupe d'API [`metrics.eks.amazonaws.com`][11]. 
- L'ajout de`"extra_headers":{"accept":"*/*"}`  permet d'éviter`HTTP 406`les erreurs lors de l'interrogation de l'API des métriques EKS. 

## Kubernetes sur OpenShift 4 {#OpenShift4}

<div class="alert alert-info">Cette fonctionnalité est en phase de préversion.</div>

Datadog prend en charge la surveillance des composants du plan de contrôle de Kubernetes, notamment le serveur API, etcd, le gestionnaire de contrôleurs et le planificateur.

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}

#### Conditions préalables 

1. : Datadog Operator >= `v1.18.0`
1. Datadog Agent >= `v7.69`

**Remarque **:`etcd`  n'est pas pris en charge dans la version 4.04.13. Configuration

####  générale

La surveillance du plan de contrôle est activée par défaut, mais nécessite l'activation de l'introspection.

Vous pouvez activer l'introspection à l'aide du [chart Helm datadogoperator][12] :

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

À l'aide de la ligne de commande :
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Ou, pour les utilisateurs** **d'OpenShift ayant installé l'opérateur via OperatorHub/Marketplace (méthode [](install-openshift.md)recommandée), en mettant à jour la version du service de cluster de l'opérateur :

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

Cette fonctionnalité étant activée par défaut, vous pouvez déployer une configuration minimale de DatadogAgent.

Activez cette option`features.clusterChecks.useClusterChecksRunners` pour planifier les vérifications à cet endroit ; sinon, les vérifications du plan de contrôle s'exécutent sur l'agent de nœud.

À partir d'OpenShift 4.14, la surveillance d'etcd nécessite de copier les certificats etcd. Consultez les journaux de l'opérateur pour connaître la commande exacte. Consultez l'exemple suivant (adaptez l'espace de noms si nécessaire) :

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | \
  sed 's/namespace: openshift-etcd-operator/namespace: datadog/' | \
  oc apply -f -
```

[12]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator

{{% /tab %}}
{{% tab "Casque" %}}

#### Conditions préalables

1.  : version de Helm Chart >= `3.150.0`
1. Datadog Agent >= `v7.69`

**Remarque **:`etcd`n'est pas pris en charge dans la version 4.04.13. Configuration

####  générale

Activez la surveillance du plan de contrôle à l'aide de `providers.openshift.controlPlaneMonitoring`l'option :

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  openshift:
    controlPlaneMonitoring: true
{{< /code-block >}}

À partir d'OpenShift 4.14, la surveillance d'etcd nécessite de copier les certificats etcd. Pour les copier dans le même espace de noms que l'agent Datadog :

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

{{% /tab %}}
{{< /tabs >}}

#### Validation
Vérifiez que les contrôles sont en cours d'exécution :
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Recherchez : 
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`
- `etcd`

vous devriez voir les métriques du plan de contrôle dans Datadog, notamment : Configuration
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`
- `etcd.*`

###  héritée

Sur OpenShift 4, tous les composants du plan de contrôle peuvent être surveillés à l'aide de vérifications de points de terminaison.

#### Conditions 

1. préalablesActivez l'agent de cluster Datadog [Cluster Agent][6]
1. Activez les vérifications de cluster [Cluster checks][7]
1. Activez les vérifications de points de terminaison [Endpoint checks][8]
1. Assurez-vous d'être connecté avec des autorisations suffisantes pour modifier les services et créer des secrets.

#### Serveur API

Le serveur API s'exécute derrière le service`kubernetes`dans l'espace`default`de noms. Configurez ce service comme suit`kube_apiserver_metrics` :

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

Cette dernière annotation`ad.datadoghq.com/endpoints.resolve`est nécessaire car le service se trouve devant des pods statiques. L'agent de cluster Datadog planifie les vérifications en tant que vérifications de points de terminaison et les transmet aux exécutants de vérifications de cluster. Les nœuds sur lesquels ils s'exécutent peuvent être identifiés comme suit :

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etc.

{{% collapse-content title="Etcd OpenShift 4.0  4.13" level="h4" %}}
Des certificats sont nécessaires pour communiquer avec le service Etcd ; ceux-ci se trouvent dans le secret`kube-etcd-client-certs`de l'espace`openshift-monitoring`de noms. Pour permettre à l'agent Datadog d'accéder à ces certificats, commencez par les copier dans le même espace de noms que celui dans lequel l'agent Datadog s'exécute :

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

Ces certificats doivent être montés sur les pods Cluster Check Runner en ajoutant les volumes et les volumeMounts comme indiqué ci-dessous. 

**Remarque **: des montages sont également inclus pour désactiver le fichier de configuration automatique de la vérification Etcd fourni avec l'agent.


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
{{% tab "Casque" %}}

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

Ensuite, ajoutez une annotation au service s'exécutant devant Etcd :

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'agent de cluster Datadog planifie les vérifications en tant que vérifications de points de terminaison et les transmet aux exécutants de vérifications de cluster.

{{% /collapse-content %}}


{{% collapse-content title="Etcd OpenShift 4.14 et versions ultérieures" level="h4" %}}

Des certificats sont nécessaires pour communiquer avec le service Etcd ; ceux-ci se trouvent dans le secret`etcd-metric-client`de l'espace`openshift-etcd-operator`de noms. Pour permettre à l'agent Datadog d'accéder à ces certificats, copiez-les dans le même espace de noms que l'agent Datadog :

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

Ces certificats doivent être montés sur les pods Cluster Check Runner en ajoutant les volumes et les volumeMounts comme indiqué ci-dessous. 

**Remarque **: des montages sont également inclus pour désactiver le fichier de configuration automatique de la vérification Etcd fourni avec l'agent.


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
{{% tab "Casque" %}}

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

Ensuite, ajoutez une annotation au service s'exécutant devant Etcd :

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'
```

L'agent de cluster Datadog planifie les vérifications en tant que vérifications de points de terminaison et les transmet aux exécutants de vérifications de cluster.

{{% /collapse-content %}}


#### Responsable des contrôleurs

Le gestionnaire de contrôleurs s'exécute en arrière-plan du service`kube-controller-manager`dans l'espace`openshift-kube-controller-manager`de noms. Ajoutez une annotation au service avec la configuration de vérification :


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'agent de cluster Datadog planifie les vérifications en tant que vérifications de points de terminaison et les transmet aux exécutants de vérifications de cluster. 



#### Planificateur

Le planificateur s'exécute en arrière-plan du service`scheduler`dans l'espace`openshift-kube-scheduler`de noms. Ajoutez une annotation au service avec la configuration de vérification :


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'agent de cluster Datadog planifie les vérifications en tant que vérifications de points de terminaison et les transmet aux exécutants de vérifications de cluster. 


## Kubernetes sur OpenShift 3 {#OpenShift3}

Sur OpenShift 3, tous les composants du plan de contrôle peuvent être surveillés à l'aide de vérifications de points de terminaison.

### Conditions 

1. préalablesActivez l'agent de cluster Datadog [Cluster Agent][6]
1. Activez les vérifications de cluster [Cluster checks][7]
1. Activez les vérifications de points de terminaison [Endpoint checks][8]
1. Assurez-vous d'être connecté avec des autorisations suffisantes pour créer et modifier des services.

### Serveur API

Le serveur API s'exécute derrière le service`kubernetes`dans l'espace`default`de noms. Configurez ce service comme suit`kube_apiserver_metrics` :

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

Cette dernière annotation`ad.datadoghq.com/endpoints.resolve`est nécessaire car le service se trouve devant des pods statiques. L'agent de cluster Datadog planifie les vérifications en tant que vérifications de points de terminaison et les transmet aux exécutants de vérifications de cluster. Les nœuds sur lesquels ils s'exécutent peuvent être identifiés comme suit :

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etc.

Des certificats sont nécessaires pour communiquer avec le service Etcd ; ceux-ci se trouvent sur l'hôte. Ces certificats doivent être montés sur les pods Cluster Check Runner en ajoutant les volumes et les volumeMounts comme indiqué ci-dessous. 

**Remarque **: des montages sont également inclus pour désactiver le fichier de configuration automatique de la vérification Etcd fourni avec l'agent.

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
{{% tab "Casque" %}}

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

Les modifications apportées directement à ce service ne sont pas enregistrées ; veuillez donc créer une copie du service Etcd :

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

Ajoutez la configuration de vérification au service copié :

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'agent de cluster Datadog planifie les vérifications en tant que vérifications de points de terminaison et les transmet aux exécuteurs de vérifications de cluster. 


### Gestionnaire de contrôleurs et planificateur

Le gestionnaire de contrôleurs et le planificateur s'exécutent sous le même service,`kube-controllers`dans l'espace`kube-system`de noms. Les modifications apportées directement au service ne sont pas enregistrées ; veuillez donc en créer une copie :

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

Ajoutez les configurations de vérification au service copié :

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'agent de cluster Datadog planifie les vérifications en tant que vérifications de points de terminaison et les transmet aux exécuteurs de vérifications de cluster. 

## Kubernetes sur Talos Linux {#TalosLinux}

Helm est la méthode d'installation recommandée pour Talos Linux. Utilisez Helm en définissant le paramètre`providers.talos.enabled`sur `true`.

### API server

L'intégration du serveur API est configurée automatiquement. L'agent Datadog le détecte automatiquement.

### Etcd

En accordant un accès en lecture aux certificats etcd stockés sur l'hôte, le contrôle de l'agent Datadog peut communiquer avec etcd et commencer à collecter les métriques etcd.

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

### Gestionnaire de contrôleurs et planificateurPorts 

#### sécurisés

Les ports sécurisés permettent l'authentification et l'autorisation afin de protéger les composants de votre plan de contrôle. L'agent Datadog peut collecter les métriques du gestionnaire de contrôleurs et du planificateur en ciblant leurs ports sécurisés.

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

**Remarques : **

- Le`ssl_verify`champ  dans la `kube_controller_manager`configuration  `kube_scheduler`et  doit être défini sur`false`  lors de l'utilisation de certificats auto-signés. 
- Lorsque vous ciblez des ports sécurisés, `bind-address`l'option  dans la configuration de votre Controller Manager et de votre Scheduler doit être accessible par l'agent Datadog. Appliquez le correctif ci-dessous aux nœuds du plan de contrôle lors de la création du cluster ; ou, pour les nœuds Talos déjà en service, exécutez `talosctl patch mc -n <control-plane-node1,control-plane-node2> --patch @controlplane-datadog-monitoring-patch.yaml`la commande .

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

Rancher v2.5 s'appuie sur [PushProx][9] pour exposer les points de terminaison des métriques du plan de contrôle, ce qui permet à l'agent Datadog d'effectuer des vérifications du plan de contrôle et de collecter des métriques.

### 

1. PrérequisInstallez l'agent Datadog à l'aide du [chart ranchermonitoring][10].
2. Les`pushprox`daemonsets sont déployés avec`rancher-monitoring`  et s'exécutent dans l'espace`cattle-monitoring-system`de noms .

### Serveur API

Pour configurer la`kube_apiserver_metrics`vérification, ajoutez les annotations suivantes au`default/kubernetes`service :

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Ajouter des services Kubernetes pour configurer les vérifications d'Autodiscovery

En intégrant des services Kubernetes sans interface utilisateur pour définir les configurations de vérification, l'agent Datadog est en mesure de cibler les`pushprox`pods et de collecter des métriques.

Postuler `rancher-control-plane-services.yaml`:

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

Déployez l'agent Datadog à l'aide de manifestes basés sur les configurations suivantes :

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
{{% tab "Casque" %}}

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


## Kubernetes sur Rancher Kubernetes Engine (avant la version 2.5) {#RKEBefore2_5} : serveur

###  API, gestionnaire de contrôleurs et planificateur

Installez l'agent Datadog à l'aide du [graphique ranchermonitoring][10].

Les composants du plan de contrôle s'exécutent sur Docker, en dehors de Kubernetes. Dans Kubernetes, le`kubernetes`service situé dans`default`l'espace de noms cible la ou les adresses IP des nœuds du plan de contrôle. Vous pouvez le vérifier en exécutant `$ kubectl describe endpoints kubernetes`.

Vous pouvez configurer ce service avec des vérifications de points de terminaison (gérées par l'agent de cluster Datadog) afin de surveiller le serveur API, le gestionnaire de contrôleurs et le planificateur :

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

### Etc.

Etcd est exécuté dans Docker en dehors de Kubernetes, et des certificats sont nécessaires pour communiquer avec le service Etcd. Les étapes recommandées pour configurer la surveillance d'Etcd nécessitent un accès SSH à un nœud du plan de contrôle exécutant Etcd. 

1. Connectez-vous via SSH au nœud du plan de contrôle en suivant les instructions de la [documentation Rancher][9]. Vérifiez qu'Etcd s'exécute dans un conteneur Docker à l'aide de `$ docker ps`, puis utilisez`$ docker inspect etcd`  pour localiser les certificats utilisés dans la commande d'exécution (`"Cmd"`), ainsi que le chemin d'accès sur l'hôte des montages.

Les trois indicateurs à rechercher dans la commande sont les suivants :

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. À l'aide des informations de montage disponibles dans la`$ docker inspect etcd`sortie, configurez`volumes`  et`volumeMounts`  dans la configuration de l'agent Datadog. Prévoyez également des tolérances afin que l'agent Datadog puisse s'exécuter sur les nœuds du plan de contrôle.

Voici quelques exemples illustrant comment configurer l'agent Datadog à l'aide de Helm et de l'opérateur Datadog :


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
{{% tab "Casque" %}}

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


3. Configurez un DaemonSet avec un conteneur « pause » pour exécuter la vérification Etcd sur les nœuds exécutant Etcd. Ce DaemonSet s'exécute sur le réseau hôte afin de pouvoir accéder au service Etcd. Il dispose également de la configuration de vérification et des tolérances nécessaires pour fonctionner sur le ou les nœuds du plan de contrôle. Assurez-vous que les chemins d'accès aux fichiers de certificats montés correspondent à ceux que vous avez configurés sur votre instance, et remplacez la`<...>`partie  en conséquence.

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

Pour déployer le DaemonSet et vérifier la configuration, exécutez

```shell
kubectl apply -f <filename>
```


## Kubernetes sur des services gérés (AKS, GKE) {#ManagedServices}

Sur d'autres services gérés, tels qu'Azure Kubernetes Service (AKS) et Google Kubernetes Engine (GKE), l'utilisateur ne peut pas accéder aux composants du plan de contrôle. Par conséquent, il n'est pas possible d'exécuter les vérifications`kube_apiserver``etcd` , `kube_controller_manager`, `kube_scheduler`, ou  dans ces environnements.


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
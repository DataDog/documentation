---
aliases:
- /fr/agent/kubernetes/control_plane
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
* [Kubernetes sur Rancher Kubernetes Engine (version 2.5+)](#RKE)
* [Kubernetes sur Rancher Kubernetes Engine (version antérieure à 2.5)](#RKEAvant2_5)
* [Kubernetes sur des services gérés (AKS, GKE)](#services-geres)

## Kubernetes avec Kubeadm {#Kubeadm}

Les configurations suivantes ont été testées pour Kubernetes `v1.18+`. 

### Serveur d'API

L'intégration du serveur d'API est automatiquement configurée. L'Agent Datadog la découvre automatiquement.

### Etcd

Attribuez un accès en lecture aux certificats Etcd situés sur le host pour que le check de l'Agent Datadog puisse communiquer avec Etcd et commencer à recueillir des métriques Etcd.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>
  clusterName: <NOM_CLUSTER>
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
```

{{% /tab %}}
{{% tab "Operator" %}}

Ressource Kubernetes DatadogAgent :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
    clusterName: <NOM_CLUSTER>
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
```

{{% /tab %}}
{{< /tabs >}}

### Controller Manager et Scheduler

#### Ports non sécurisés

Si les ports non sécurisés de vos instances Controller Manager et Scheduler sont activés, l'Agent Datadog découvre les intégrations et commence à recueillir des métriques sans nécessiter de configuration supplémentaire.

#### Ports sécurisés

Les ports sécurisés activent des processus d'authentification et d'autorisation afin de protéger les composants de votre plan de contrôle. L'Agent Datadog peut recueillir des métriques à partir de Controller Manager et Scheduler en ciblant leurs ports sécurisés.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>
  clusterName: <NOM_CLUSTER>
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
```

{{% /tab %}}
{{% tab "Operator" %}}

Ressource Kubernetes DatadogAgent :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
    clusterName: <NOM_CLUSTER>
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
```

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

Sur Amazon Elastic Kubernetes Service (EKS), les [métriques du serveur d'API sont exposées][5]. Ainsi, l'Agent Datadog peut récupérer ces métriques à l'aide de checks d'endpoint, tel que décrit dans la [section relative aux checks de métriques du serveur d'API de Kubernetes][1]. Pour configurer le check, ajoutez les annotations suivantes au service `default/kubernetes` :

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

Les autres composants du plan de contrôle ne sont pas exposés dans EKS, et ne peuvent donc pas être surveillés.


## Kubernetes sur OpenShift 4 {#OpenShift4}

Sur OpenShift 4, tous les composants du plan de contrôle peuvent être surveillés à l'aide de checks d'endpoint.

### Prérequis

1. Activez l'[Agent de cluster][6] Datadog.
1. Activez les [checks de cluster][7].
1. Activez les [checks d'endpoint][8].
1. Vérifiez que votre compte dispose de suffisamment d'autorisations pour pouvoir modifier des services et créer des secrets.

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
oc exec -it <pod de l'agent de cluster datadog> -n <espace de nommage datadog> -- agent clusterchecks

```

### Etcd

Pour communiquer avec le service Etcd, vous devez utiliser des certificats. Vous trouverez les certificats requis dans le secret `kube-etcd-client-certs` de l'espace de nommage `openshift-monitoring`. Pour que l'Agent Datadog puisse accéder à ces certificats, commencez par les copier dans le même espace de nommage que celui dans lequel l'Agent Datadog s'exécute :

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <espace de nommage Agent Datadog>/'  | oc create -f -

```

Ces certificats doivent être montés sur les pods des exécuteurs de checks de cluster, en ajoutant les volumes et volumeMounts tel que décrit ci-dessous.

**Remarque** : des montages sont également inclus pour désactiver le fichier d'autoconfiguration du check Etcd fourni avec l'Agent.


{{< tabs >}}
{{% tab "Helm" %}}

```yaml
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
```

{{% /tab %}}
{{% tab "Operator" %}}

```yaml
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
```

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


### Controller Manager

Le Controller Manager s'exécute derrière le service `kube-controller-manager` dans l'espace de nommage `openshift-kube-controller-manager`. Annotez ce service avec la configuration de check :


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

L'Agent de cluster Datadog planifie les checks en tant que checks d'endpoint et les distribue aux exécuteurs de check de cluster.



### Scheduler

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
oc exec -it <pod de l'agent de cluster datadog> -n <espace de nommage datadog> -- agent clusterchecks

```

### Etcd

Pour communiquer avec le service Etcd, vous devez utiliser des certificats. Vous trouverez les certificats requis sur le host. Ces certificats doivent être montés sur les pods des exécuteurs de checks de cluster, en ajoutant les volumes et volumeMounts tel que décrit ci-dessous.

**Remarque** : des montages sont également inclus pour désactiver le fichier d'autoconfiguration du check Etcd fourni avec l'Agent.

{{< tabs >}}
{{% tab "Helm" %}}

```yaml
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
```

{{% /tab %}}
{{% tab "Operator" %}}

```yaml
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
```

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

### Ajouter des services Kubernetes pour configurer les checks de découverte automatique

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
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>
  clusterName: <NOM_CLUSTER>
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
```

{{% /tab %}}
{{% tab "Operator" %}}

Ressource Kubernetes DatadogAgent :

```yaml
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
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
    clusterName: <NOM_CLUSTER>
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
```

{{% /tab %}}
{{< /tabs >}}


## Kubernetes sur Rancher Kubernetes Engine (version antérieure à 2.5) {#RKEAvant2_5}

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
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>
  clusterName: <NOM_CLUSTER>
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
```

{{% /tab %}}
{{% tab "Operator" %}}

Ressource Kubernetes DatadogAgent :

```yaml
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
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
    clusterName: <NOM_CLUSTER>
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
```

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
kubectl apply -f <nom_fichier>
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
[9]: https://rancher.com/docs/rancher/v2.0-v2.4/en/cluster-admin/nodes
[10]: https://github.com/DataDog/helm-charts/blob/main/examples/datadog/agent_on_rancher_values.yaml
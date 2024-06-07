---
aliases:
- /es/agent/kubernetes/control_plane
further_reading:
- link: agent/kubernetes/log
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/kubernetes/apm
  tag: Documentación
  text: Recopila tus trazas de aplicaciones
- link: /agent/kubernetes/prometheus
  tag: Documentación
  text: Recopila tus métricas de Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentación
  text: Recopila las métricas y logs de tus aplicaciones automáticamente
- link: /agent/guide/autodiscovery-management
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
kind: documentación
title: Monitorización de planos de control de Kubernetes
---

## Información general

El objetivo de esta sección es documentar las especificidades y proporcionarte buenas configuraciones de base para la monitorización de planos de control de Kubernetes. Luego, podrás personalizar estas configuraciones para añadir cualquier característica de Datadog.

Con las integraciones de Datadog para el [servidor de la API][1], [Etcd][2], el [Administrador de controladores][3], y el [Programador][4], puedes recopilar métricas clave de los cuatro componentes del plano de control de Kubernetes.

* [Kubernetes con Kubeadm](#Kubeadm)
* [Kubernetes en Amazon EKS](#EKS)
* [Kubernetes en OpenShift 4](#OpenShift4)
* [Kubernetes en OpenShift 3](#OpenShift3)
* [Kubernetes en Rancher Kubernetes Engine (v2.5 o posteriores)](#RKE)
* [Kubernetes en Rancher Kubernetes Engine (v2.5 o anteriores)](#RKEBefore2_5)
* [Kubernetes en servicios gestionados (AKS, GKE)](#ManagedServices)

## Kubernetes con Kubeadm {#Kubeadm}

Las siguientes configuraciones se han probado en Kubernetes `v1.18+`.

### Servidor de API

La integración del servidor de API se configura automáticamente y el Datadog Agent la detecta automáticamente.

### Etcd

Al proporcionar acceso de lectura a los certificados Etcd ubicados en el host, el check del Datadog Agent puede comunicarse con Etcd y empezar a recopilar métricas Etcd.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
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
```

{{% /tab %}}
{{% tab "Operator" %}}

Recurso Kubernetes del Datadog Agent:

```yaml
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
```

{{% /tab %}}
{{< /tabs >}}

### Administrador de controladores y programador

#### Puertos inseguros

Si los puertos inseguros de tus instancias del administrador de controladores y el programador están habilitados, el Datadog Agent detecta las integraciones y comienza a recopilar métricas sin ninguna configuración adicional. 

#### Puertos seguros

Los puertos seguros permiten la autenticación y autorización para proteger los componentes de tu plano de control. Datadog Agent puede recopilar métricas del administrador de controladores y el programador dirigiéndose a sus puertos seguros.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
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
```

{{% /tab %}}
{{% tab "Operator" %}}

Recurso Kubernetes del Datadog Agent:

```yaml
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
```

{{% /tab %}}
{{< /tabs >}}

**Notas:**

- El campo `ssl_verify` de `kube_controller_manager` y la configuración de `kube_scheduler` deben establecerse en `false` cuando se utilizan certificados autofirmados.
- Cuando se dirija a puertos seguros, la opción `bind-address` en la configuración de tu administrador de controladores y tu programador debe ser accesible por el Datadog Agent. Ejemplo:

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

## Kubernetes en Amazon EKS {#EKS}

En el servicio Amazon Elastic Kubernetes (EKS), [las métricas del servidor de API están expuestas][5]. Esto permite al Datadog Agent obtener métricas del servidor de API utilizando checks de endpoint, como se describe en la [documentación de los checks de métricas del servidor de la API de Kubernetes][1]. Para configurar el check, añade las siguientes anotaciones al servicio `default/kubernetes`:

```yaml
anotaciones:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances:
    '[{ "prometheus_url": "https://%%host %% :%%puerto%%/métricas", "bearer_token_auth": "true" }]'
```

Otros componentes del plano de control no están expuestos en EKS y no se pueden monitorizar.


## Kubernetes en OpenShift 4 {#OpenShift4}

En OpenShift 4, todos los componentes del plano de control se pueden monitorizar utilizando checks de endpoint.

### Requisitos previos

1. Habilitar el [Cluster Agent][6] de Datadog
1. Activar los [checks de clúster][7]
1. Habilitar los [checks de endpoint][8]
1. Asegúrate de que has iniciado sesión con permisos suficientes para editar servicios y crear secretos.

### Servidor de API

El servidor de API se ejecuta detrás del servicio `kubernetes` en el espacio de nombres`default`. Anota este servicio con la configuración `kube_apiserver_metrics`:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La última anotación `ad.datadoghq.com/endpoints.resolve` es necesaria porque el servicio se encuentra delante de pods estáticos. El Datadog Cluster Agent programa los checks como checks de endpoint y los envía a ejecutadores de checks de clústeres. Los nodos en los que se están ejecutando se pueden identificar con:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Los certificados son necesarios para comunicarse con el servicio Etcd, que se puede encontrar en el secreto `kube-etcd-client-certs` en el espacio de nombres`openshift-monitoring`. Para dar acceso al Datadog Agent a estos certificados, primero hay que copiarlos en el mismo espacio de nombres en el que se está ejecutando el Datadog Agent:

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

Estos certificados deben montarse en los pods del ejecutador de checks de clústeres añadiendo los volúmenes y los montajes de volúmenes como se indica a continuación.

**Nota**: También se incluyen montajes para desactivar el archivo de auto-configuración del check Etcd empaquetado con el Agent.


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


A continuación, anota el servicio que se ejecuta delante de Etcd:

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa los checks como checks de endpoint y los envía a los ejecutadores de checks de clústeres.


### Administrador de controladores

El administrador de controladores se ejecuta detrás del servicio `kube-controller-manager` en el espacio de nombres `openshift-kube-controller-manager`. Anota el servicio con la configuración del check 


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa los checks como checks de endpoint y los envía a los ejecutadores de checks de clústeres.



### Programador

El programador se ejecuta detrás del servicio `scheduler` en el espacio de nombres`openshift-kube-scheduler`. Anota el servicio con la configuración del check:


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa los checks como checks de endpoint y los envía a los ejecutadores de checks de clústeres.


## Kubernetes en OpenShift 3 {#OpenShift3}

En OpenShift 3, todos los componentes del plano de control se pueden monitorizar utilizando checks de endpoint.

### Requisitos previos

1. Habilitar el [Cluster Agent][6] de Datadog
1. Habilitar los [checks de clústeres][7]
1. Habilitar los [checks de endpoint][8]
1. Asegúrate de que has iniciado sesión con permisos suficientes para crear y editar servicios.

### Servidor de API

El servidor de API se ejecuta detrás del servicio `kubernetes` en el espacio de nombres`default`. Anota este servicio con la configuración `kube_apiserver_metrics`:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La última anotación `ad.datadoghq.com/endpoints.resolve` es necesaria porque el servicio está delante de pods estáticos. El Datadog Cluster Agent programa los checks como checks de endpoint y los envía a los ejecutadores de checks de clústeres. Los nodos en los que se están ejecutando se pueden identificar con:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Los certificados son necesarios para comunicarse con los servicios Etcd, que se encuentran en el host. Estos certificados deben montarse en los pods del ejecutador de checks de clústeres añadiendo los volúmenes y montajes de volúmenes como se indica a continuación.

**Nota**: También se incluyen montajes para desactivar el archivo de auto-configuración del check Etcd empaquetado con el Agent.

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

Las ediciones directas de este servicio no se conservan, así que haz una copia del servicio Etcd:

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

Anota el servicio copiado con la configuración del check:

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa los checks como checks de endpoint y los envía a los ejecutadores de checks de clústeres.


### Administrador de controladores y programador

El administrador de controladores y el programador se ejecutan detrás del mismo servicio, `kube-controllers`, en el espacio de nombres `kube-system`. Las ediciones directas del servicio no se conservan, así que haz una copia del servicio:

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

Anota el servicio copiado con las configuraciones de check:

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa los checks como checks de endpoint y los envía a los ejecutadores de checks de clústeres.



## [Kubernetes en Rancher Kubernetes Engine (v2.5 o posteriores)](#RKE)

Rancher v2.5 se basa en [PushProx][9] para exponer endpoints de métricas del plano de control, lo que permite al Datadog Agent ejecutar checks del plano de control y recopilar métricas.

### Requisitos previos

1. Instala el Datadog Agent con la [tabla de monitorización rancher][10].
2. Los daemonsets `pushprox` se despliegan con `rancher-monitoring` y se ejecutan en el espacio de nombres `cattle-monitoring-system`.

### Servidor de API

Para configurar el check de `kube_apiserver_metrics`, añade las siguientes anotaciones al servicio `default/kubernetes`:

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Añadir servicios Kubernetes para configurar checks de auto-detección

Al añadir servicios Kubernetes headless para definir configuraciones de checks, el Datadog Agent puede dirigirse a los pods `pushprox` y recopilar métricas.

Aplica `rancher-control-plane-services.yaml`:

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

Desplegar el Datadog Agent con manifiestos basados en las siguientes configuraciones:

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
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
```

{{% /tab %}}
{{% tab "Operator" %}}

Recurso Kubernetes del Datadog Agent:

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
```

{{% /tab %}}
{{< /tabs >}}


## Kubernetes en Rancher Kubernetes Engine (antes de v2.5) {#RKEBefore2_5}

### Servidor de API, administrador de controladores y programador

Instala el Datadog Agent con la [tabla de monitorización rancher][10].

Los componentes del plano de control se ejecutan en Docker fuera de Kubernetes. Dentro de Kubernetes, el servicio `kubernetes` en el espacio de nombres `default` se dirige a la(s) IP(s) del nodo del plano de control. Puedes confirmarlo ejecutando `$ kubectl describe endpoints kubernetes`.

Puedes anotar este servicio con checks de endpoint (gestionados por Datadog Cluster Agent) para monitorizar la API de servidor, el administrador de controladores y el programador:

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

Etcd se ejecuta en Docker fuera de Kubernetes y se necesitan certificados para comunicarse con el servicio Etcd. Los pasos sugeridos para configurar la monitorización de Etcd requieren acceso SSH a un nodo del plano de control que ejecute Etcd.

1. Consulta el acceso SSH al nodo del plano de control en la [documentación de Rancher][9]. Confirma que Etcd se está ejecutando en un contenedor de Docker con `$ docker ps` y luego utiliza `$ docker inspect etcd` para encontrar el localización de los certificados utilizados en el comando de ejecución (`"Cmd"`), así como la ruta del host de los montajes.

Las tres marcas que debes buscar en el comando son:

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. Utilizando la información de montaje disponible en la salida `$ docker inspect etcd`, configura `volumes` y `volumeMounts` en la configuración del Datadog Agent. Incluye también tolerancias para que el Datadog Agent pueda ejecutarse en los nodos del plano de control.

Los siguientes son ejemplos de cómo configurar el Datadog Agent con Helm y el Datadog Operator:


{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personalizado:

```yaml
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
```

{{% /tab %}}
{{% tab "Operator" %}}

Recurso Kubernetes del Datadog Agent:

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
```

{{% /tab %}}
{{< /tabs >}}


3. Configura un DaemonSet con un contenedor pausado para ejecutar el check de Etcd en los nodos que ejecutan Etcd. Este DaemonSet se ejecuta en la red del host para que pueda acceder al servicio Etcd. También tiene la configuración del check y las tolerancias necesarias para ejecutarse en el(los) nodo(s) del plano de control. Asegúrate de que las rutas de los archivos de certificados montados coinciden con lo que has configurado en su instancia y reemplaza la parte `<...>` en consecuencia.

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

Para desplegar el DaemonSet y la configuración del check, ejecuta

```shell
kubectl apply -f <filename>
```


## Kubernetes en servicios gestionados (AKS, GKE) {#ManagedServices}

En otros sistemas gestionados como Azure Kubernetes Service (AKS) y Google Kubernetes Engine (GKE), el usuario no puede acceder a los componentes del plano de control. Como resultado, no es posible ejecutar los checks `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` o `etcd` en estos entornos.


[1]: https://docs.datadoghq.com/es/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/es/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/es/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/es/integrations/kube_scheduler/
[5]: https://aws.github.io/aws-eks-best-practices/reliability/docs/controlplane/#monitor-control-plane-metrics
[6]: https://docs.datadoghq.com/es/agent/cluster_agent/setup
[7]: https://docs.datadoghq.com/es/agent/cluster_agent/clusterchecks/
[8]: https://docs.datadoghq.com/es/agent/cluster_agent/endpointschecks/
[9]: https://rancher.com/docs/rancher/v2.0-v2.4/en/cluster-admin/nodes
[10]: https://github.com/DataDog/helm-charts/blob/main/examples/datadog/agent_on_rancher_values.yaml
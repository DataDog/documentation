---
aliases:
- /es/agent/kubernetes/control_plane
description: Monitorizar componentes del planos de control de Kubernetes, incluido
  el servidor de API, etcd, el gestor de controladores y el programador
further_reading:
- link: agent/kubernetes/log
  tag: Documentación
  text: Recopilar tus logs de aplicaciones
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
  text: Asignar tags (etiquetas) a todos los datos emitidos por un contenedor
title: Monitorización de planos de control de Kubernetes
---

## Información general

El objetivo de esta sección es documentar las especificidades y proporcionarte buenas configuraciones de base para la monitorización de planos de control de Kubernetes. Luego, podrás personalizar estas configuraciones para añadir cualquier característica de Datadog.

Con las integraciones de Datadog para el [servidor de API][1], [Etcd][2], el [Administrador de controladores][3], y el [Programador][4], puedes recopilar métricas clave de los cuatro componentes del plano de control de Kubernetes.

* [Kubernetes con Kubeadm](#Kubeadm)
* [Kubernetes en Amazon EKS](#EKS)
* [Kubernetes en OpenShift 4](#OpenShift4)
* [Kubernetes en OpenShift 3](#OpenShift3)
* [Kubernetes en Talos Linux](#TalosLinux)
* [Kubernetes en Rancher Kubernetes Engine (v2.5 o posterior)](#RKE)
* [Kubernetes en Rancher Kubernetes Engine (\<v2.5)](#RKEBefore2_5)
* [Kubernetes en servicios gestionados (AKS, GKE)](#ManagedServices)

## Kubernetes con Kubeadm {#Kubeadm}

Las siguientes configuraciones se han probado en Kubernetes `v1.18+`.

### Servidor de API

La integración del servidor de API se configura automáticamente y el Datadog Agent la detecta automáticamente.

### Etcd

Al proporcionar acceso de lectura a los certificados de Etcd ubicados en el host, el check del Datadog Agent puede comunicarse con Etcd y empezar a recopilar métricas de Etcd.

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

### Administrador de controladores y programador

#### Puertos inseguros

Si los puertos inseguros de tus instancias Controller Manager y Scheduler están habilitados, el Datadog Agent detecta las integraciones y comienza a recopilar métricas sin ninguna configuración adicional.

#### Puertos seguros

Los puertos seguros permiten la autenticación y autorización para proteger los componentes de tu plano de control. El Datadog Agent puede recopilar métricas del administrador de controladores y del programador dirigiéndose a sus puertos seguros.

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

**Notas:**

- El campo `ssl_verify` de `kube_controller_manager` y la configuración de `kube_scheduler` deben establecerse en `false` cuando se utilizan certificados auto-firmados.
- Cuando se dirige a puertos seguros, la opción `bind-address` en la configuración de tu administrador de controladores y de tu programador debe ser accesible por el Datadog Agent. Por ejemplo:

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

### Método recomendado

<div class="alert alert-info">Esta función está en vista previa.</div>

Datadog permite monitorizar los componentes del plano de control de Kubernetes, incluidos el servidor de API, el gestor de controladores y el programador.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### Requisitos previos

1. Datadog Operator >= `v1.18.0`
1. Datadog Agent >= `v7.69`

#### Configuración general

La monitorización de planos de control está activada en forma predeterminada, pero requiere que se active la introspección.

Puedes activar la introspección mediante el [gráfico de datadog-operator Helm](https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator):

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Mediante la línea de comandos:
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Como esta función está activada en forma predeterminada, puedes desplegar una especificación mínima del Datadog Agent.

{{% /tab %}}

{{% tab "Helm" %}}

#### Requisitos previos

1. Versión del gráfico de Helm >= `3.152.0`
1. Datadog Agent >= `v7.69`

#### Configuración general

Activa la monitorización de planos de control mediante la opción `providers.eks.controlPlaneMonitoring`:

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

#### Validación
Comprueba que se están realizando checks:
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Busca:
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`

Debería ver las métricas del plano de control en Datadog, incluido:
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`

### Configuración heredada

Amazon Elastic Kubernetes Service (EKS) admite la monitorización de todos los componentes del plano de control utilizando checks de clúster.

#### Requisitos previos
- Un clúster de EKS que se ejecuta en la versión de Kubernetes >= 1.28
- Despliega el Agent utilizando uno de los siguientes:
  - Versión del Helm chart >= `3.90.1`
  - Datadog Operator >= `v1.13.0`
- Habilitar el Datadog [Cluster Agent][6]

Añade las siguientes anotaciones al servicio `default/kubernetes`:

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

**Notas:**
- Amazon expone métricas `kube_controller_manager` y `kube_scheduler` bajo el grupo de API [`metrics.eks.amazonaws.com`][11].
- Añadir `"extra_headers":{"accept":"*/*"}` evita errores de `HTTP 406` al consultar la API de métricas de EKS.

## Kubernetes en OpenShift 4 {#OpenShift4}

<div class="alert alert-info">Esta función está en vista previa.</div>

Datadog permite monitorizar los componentes del plano de control de Kubernetes, incluidos el servidor API, etcd, el gestor de controladores y el programador.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### Requisitos previos

1. Datadog Operator >= `v1.18.0`
1. Datadog Agent >= `v7.69`

**Nota**: `etcd` no es compatible con las versiones 4.0-4.13.

#### Configuración general

La monitorización del plano de control está activada en forma predeterminada, pero requiere que se active la introspección.

Puedes activar la introspección con el [datadog-operator Helm chart][12]:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Mediante la línea de comandos:
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

O, para **usuarios de OpenShift** que instalaron el operador a través de OperatorHub/Marketplace (el [método recomendado](install-openshift.md)), mediante la aplicación de revisiones de la versión del servicio de clúster del operador:

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

Como esta función está activada en forma predeterminada, puedes desplegar una especificación mínima del Datadog Agent.

Activa allí `features.clusterChecks.useClusterChecksRunners`  para programar checks; de lo contrario, los checks del plano de control se ejecutan en el Node Agent.

Para OpenShift 4.14 y posteriores, la monitorización de etcd requiere que copies los certificados de etcd. Check que los logs del operador para ver el comando exacto. Consulta el siguiente ejemplo (ajusta el espacio de nombres según sea necesario):

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | \
  sed 's/namespace: openshift-etcd-operator/namespace: datadog/' | \
  oc apply -f -
```

[12]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator

{{% /tab %}}
{{% tab "Helm" %}}

#### Requisitos previos

1. Versión del gráfico de Helm >= `3.150.0`
1. Datadog Agent >= `v7.69`

**Nota**: `etcd` no es compatible con las versiones 4.0-4.13.

#### Configuración general

Activa la monitorización del plano de control mediante la opción `providers.openshift.controlPlaneMonitoring`:

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  openshift:
    controlPlaneMonitoring: true
{{< /code-block >}}

Para OpenShift 4.14 y posteriores, la monitorización de etcd requiere que copies los certificados de etcd. Para copiarlos en el mismo espacio de nombres que el Datadog Agent:

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

{{% /tab %}}
{{< /tabs >}}

#### Validación
Comprueba que se están ejecutando checks:
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Busca:
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`
- `etcd`

Deberías ver las métricas del plano de control en Datadog, incluido:
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`
- `etcd.*`

### Configuración heredada

En OpenShift 4, todos los componentes del plano de control se pueden monitorizar utilizando checks de endpoints.

#### Requisitos previos

1. Habilitar el Datadog [Cluster Agent][6]
1. Habilitar los [checks de clústeres][7]
1. Habilitar los [checks de endpoints][8]
1. Asegúrate de que has iniciado sesión con permisos suficientes para editar servicios y crear secretos.

#### Servidor de API

El servidor de API se ejecuta detrás del servicio `kubernetes`, en el espacio de nombres `default`. Anota este servicio con la configuración `kube_apiserver_metrics`:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La última anotación `ad.datadoghq.com/endpoints.resolve` es necesaria porque el servicio está delante de pods estáticos. El Datadog Cluster Agent programa los checks como checks de endpoints y los envía a los ejecutadores de checks de clústeres. Los nodos en los que se están ejecutando se pueden identificar con:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etcd

{{% collapse-content title="Etcd OpenShift 4.0 a 4.13" level="h4" %}}
Los certificados son necesarios para comunicarse con el servicio Etcd, que se pueden encontrar en el secreto `kube-etcd-client-certs` en el espacio de nombres `openshift-monitoring`. Para dar acceso a Datadog Agent a estos certificados, primero hay que copiarlos en el mismo espacio de nombres en el que se está ejecutando el Datadog Agent:

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

Estos certificados deben montarse en los pods del ejecutador de checks de clústeres añadiendo los volúmenes y los montajes de volúmenes como se indica a continuación.

**Nota**: También se incluyen montajes para desactivar el archivo de auto-configuración del check de Etcd empaquetado con el Agent.


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

A continuación, anota el servicio que se ejecuta delante de Etcd:

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa los checks como checks de endpoints y los envía a los ejecutadores de checks de clústeres.

{{% /collapse-content %}}


{{% collapse-content title="Etcd OpenShift 4.14 and later" level="h4" %}}

Se necesitan certificados para comunicarse con el servicio de Etcd, que se encuentran en el `etcd-metric-client` secreto en el espacio de nombres `openshift-etcd-operator`. Para dar acceso al Datadog Agent a estos certificados, cópialos en el mismo espacio de nombres que el Datadog Agent:

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

Estos certificados deben montarse en los pods del ejecutador de checks de clústeres añadiendo los volúmenes y los montajes de volúmenes como se indica a continuación.

**Nota**: También se incluyen montajes para desactivar el archivo de auto-configuración del check de Etcd empaquetado con el Agent.


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

A continuación, anota el servicio que se ejecuta delante de Etcd:

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'
```

El Datadog Cluster Agent programa los checks como checks de endpoints y los envía a los ejecutadores de checks de clústeres.

{{% /collapse-content %}}


#### Administrador de controladores

El administrador de controladores se ejecuta detrás del servicio `kube-controller-manager`, en el espacio de nombres de `openshift-kube-controller-manager`. Anota este servicio con la configuración del check:


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa los checks como checks de endpoints y los envía a los ejecutadores de checks de clústeres.



#### Programador

El programador se ejecuta detrás del servicio `scheduler`, en el espacio de nombres de `openshift-kube-scheduler`. Anota este servicio con la configuración del check:


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa los checks como checks de endpoints y los envía a los ejecutadores de checks de clústeres.


## Kubernetes en OpenShift 3 {#OpenShift3}

En OpenShift 3, todos los componentes del plano de control se pueden monitorizar utilizando checks de endpoints.

### Requisitos previos

1. Habilitar el Datadog [Cluster Agent][6]
1. Habilitar los [checks de clústeres][7]
1. Habilitar los [checks de endpoints][8]
1. Asegúrate de que has iniciado sesión con permisos suficientes para crear y editar servicios.

### Servidor de API

El servidor de API se ejecuta detrás del servicio `kubernetes`, en el espacio de nombres `default`. Anota este servicio con la configuración `kube_apiserver_metrics`:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La última anotación `ad.datadoghq.com/endpoints.resolve` es necesaria porque el servicio está delante de pods estáticos. El Datadog Cluster Agent programa los checks como checks de endpoints y los envía a los ejecutadores de checks de clústeres. Los nodos en los que se están ejecutando se pueden identificar con:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Los certificados son necesarios para comunicarse con el servicio Etcd que se encuentra en el host. Estos certificados deben montarse en los pods del ejecutador de checks de clústeres añadiendo los volúmenes y montajes de volúmenes como se indica a continuación.

**Nota**: También se incluyen montajes para desactivar el archivo de auto-configuración del check de Etcd empaquetado con el Agent.

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

El Datadog Cluster Agent programa los checks como checks de endpoints y los envía a los ejecutadores de checks de clústeres.


### Administrador de controladores y programador

El administrador de controladores y el programador se ejecutan detrás del mismo servicio, `kube-controllers`, en el espacio de nombres de `kube-system`. Las ediciones directas del servicio no se conservan, así que haz una copia del servicio:

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

Anota el servicio copiado con la configuración del check:

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa los checks como checks de endpoints y los envía a los ejecutadores de checks de clústeres.

## Kubernetes en Talos Linux {#TalosLinux}

Helm es el método de instalación recomendado para Talos Linux. Utiliza Helm configurando el marcador `providers.talos.enabled` en `true`.

### Servidor de API

La integración del servidor de API se configura automáticamente y el Datadog Agent la detecta automáticamente.

### Etcd

Al proporcionar acceso de lectura a los certificados etcd ubicados en el host, el check del Datadog Agent puede comunicarse con etcd y comenzar a recopilar métricas de etcd.

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
      # Puedes configurar el Agent para que solo ejecute este check en el host donde se esté ejecutando etcd
      # utilizando `ad_identifiers` para un pod que solo se ejecutaría en un nodo del plano de control.
      # Esto es para evitar errores cuando el Agent se está ejecutando en nodos trabajadores.
      # Otro enfoque es ejecutar un pod mínimo en el nodo del plano de control y utilizarlo para `ad_identifiers`.
      ad_identifiers:
        - kube-scheduler
      instances:
          # Esta es la IP del nodo donde se exponen las métricas porque kube-scheduler se ejecuta en modo de red de host.
          # De lo contrario, la IP se podría hardcode a la IP del nodo maestro (también en la variable de entorno `DD_KUBERNETES_KUBELET_HOST`).
        - prometheus_url: https://%%host%%:2379/metrics
          tls_ca_cert: /host/etc/kubernetes/pki/etcd/ca.crt
          tls_cert: /host/etc/kubernetes/pki/etcd/server.crt
          tls_private_key: /host/etc/kubernetes/pki/etcd/server.key
agents:
  # Es necesario programar tolerancias en los nodos del plano de control que ejecutan etcd
  tolerations:
  - key: node-role.kubernetes.io/control-plane
    operator: Exists
    effect: NoSchedule
  volumes:
    # En Talos, los certificados de etcd se almacenan en /system/secrets/etcd
    - hostPath:
        path: /sistema/secretos/etcd
      name: etcd-certs
  volumeMounts:
    - name: etcd-certs
      mountPath: /host/etc/kubernetes/pki/etcd
      readOnly: true
providers:
  talos:
    enabled: true
{{< /code-block >}}

### Administrador de controladores y programador

#### Puertos seguros

Los puertos seguros permiten la autenticación y autorización para proteger los componentes de tu plano de control. El Datadog Agent puede recopilar métricas del administrador de controladores y del programador dirigiéndose a sus puertos seguros.

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

**Notas:**

- El campo `ssl_verify` de `kube_controller_manager` y la configuración de `kube_scheduler` deben establecerse en `false` cuando se utilizan certificados auto-firmados.
- Cuando te dirijas a puertos seguros, la opción `bind-address` de la configuración de tu Controller Manager y Scheduler debe ser accesible por el Datadog Agent. Aplica el parche siguiente a los nodos del plano de control en la generación del clúster; o, para los nodos de Talos en ejecución, ejecuta `talosctl patch mc -n <control-plane-node1,control-plane-node2> --patch @controlplane-datadog-monitoring-patch.yaml`.

{{< code-block lang="yaml" filename="controlplane-datadog-monitoring-patch.yaml" >}}
cluster:
  controllerManager:
    extraArgs:
      bind-address: 0.0.0.0
  scheduler:
    extraArgs:
      bind-address: 0.0.0.0
{{< /code-block >}}

## [Kubernetes en Rancher Kubernetes Engine (v2.5 o posterior)](#RKE)

Rancher v2.5 se basa en [PushProx][9] para exponer endpoints de métricas del plano de control, lo que permite al Datadog Agent ejecutar checks del plano de control y recopilar métricas.

### Requisitos previos

1. Instala el Datadog Agent con la [tabla de monitorización Rancher][10].
2. Los daemonsets `pushprox` se despliegan con `rancher-monitoring` y se ejecutan en el espacio de nombres de `cattle-monitoring-system`.

### Servidor de API

Para configurar el check de `kube_apiserver_metrics`, añade las siguientes anotaciones al servicio `default/kubernetes`:

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Añadir servicios de Kubernetes para configurar checks de Autodiscovery

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


## Kubernetes en Rancher Kubernetes Engine (antes de v2.5) {#RKEBefore2_5}

### Servidor de API, administrador de controladores y programador

Instala el Datadog Agent con la [tabla de monitorización Rancher][10].

Los componentes del plano de control se ejecutan en Docker fuera de Kubernetes. Dentro de Kubernetes, el servicio `kubernetes`, en el espacio de nombres `default`, se dirige a la(s) IP(s) del nodo del plano de control. Puedes confirmarlo ejecutando `$ kubectl describe endpoints kubernetes`.

Puedes anotar este servicio con checks de endpoints (gestionados por el Datadog Cluster Agent) para monitorizar el servidor de API, el administrador de controladores y el programador:

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

1. Consulta el acceso SSH al nodo del plano de control en la [documentación de Rancher][9]. Confirma que Etcd se está ejecutando en un contenedor de Docker con `$ docker ps` y luego utiliza `$ docker inspect etcd` para localizar los certificados utilizados en el comando de ejecución (`"Cmd"`), así como la ruta del host de los montajes.

Las tres marcas que debes buscar en el comando son:

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. Utilizando la información de montaje disponible en la salida `$ docker inspect etcd`, configura `volumes` y `volumeMounts` en los parámetros del Datadog Agent. Incluye también tolerancias para que el Datadog Agent pueda ejecutarse en los nodos del plano de control.

Los siguientes son ejemplos de cómo configurar el Datadog Agent con Helm y el Datadog Operator:


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


3. Configura un DaemonSet con un contenedor pausado para ejecutar el check de Etcd en los nodos que están ejecutando Etcd. Este DaemonSet se ejecuta en la red del host para poder acceder al servicio Etcd. También tiene la configuración del check y las tolerancias necesarias para ejecutarse en el(los) nodo(s) del plano de control. Asegúrate de que las rutas de los archivos de certificados montados coinciden con lo que has configurado en su instancia y reemplaza la porción `<...>` en consecuencia.

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

En otros sistemas gestionados como Azure Kubernetes Service (AKS) y Google Kubernetes Engine (GKE), el usuario no puede acceder a los componentes del plano de control. Como resultado, no es posible ejecutar los checks de `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` o `etcd` en estos entornos.


[1]: https://docs.datadoghq.com/es/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/es/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/es/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/es/integrations/kube_scheduler/
[5]: https://aws.github.io/aws-eks-best-practices/reliability/docs/controlplane/#monitor-control-plane-metrics
[6]: https://docs.datadoghq.com/es/agent/cluster_agent/setup
[7]: https://docs.datadoghq.com/es/agent/cluster_agent/clusterchecks/
[8]: https://docs.datadoghq.com/es/agent/cluster_agent/endpointschecks/
[9]: https://ranchermanager.docs.rancher.com/how-to-guides/new-user-guides/manage-clusters/nodes-and-node-pools
[10]: https://github.com/DataDog/helm-charts/blob/main/examples/datadog/agent_on_rancher_values.yaml
[11]: https://docs.aws.amazon.com/eks/latest/userguide/view-raw-metrics.html
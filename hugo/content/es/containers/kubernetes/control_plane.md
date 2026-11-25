---
aliases:
- /es/agent/kubernetes/control_plane
description: Monitoree los componentes del plano de control de Kubernetes, incluidos
  el servidor de API, etcd, el administrador de controladores y el programador
further_reading:
- link: agent/kubernetes/log
  tag: Documentación
  text: Recopile los registros de su aplicación
- link: /agent/kubernetes/apm
  tag: Documentación
  text: Recopile las trazas de su aplicación
- link: /agent/kubernetes/prometheus
  tag: Documentación
  text: Recopile sus métricas de Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentación
  text: Recopile automáticamente las métricas y los registros de sus aplicaciones
- link: /agent/guide/autodiscovery-management
  tag: Documentación
  text: Limitar la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/kubernetes/tag
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
title: Monitoreo del plano de control de Kubernetes
---
## Descripción general {#overview}

Esta sección tiene como objetivo documentar las especificidades y proporcionar buenas configuraciones base para monitorear el plano de control de Kubernetes. Puede personalizar estas configuraciones posteriormente para añadir cualquier función de Datadog.

Con las integraciones de Datadog para el [servidor de API][1], [Etcd][2], el [Controller Manager][3] y el [Scheduler][4], puede recopilar métricas clave de los cuatro componentes del plano de control de Kubernetes.

* [Kubernetes con Kubeadm](#Kubeadm)
* [Kubernetes en Amazon EKS](#EKS)
* [Kubernetes en OpenShift 4](#OpenShift4)
* [Kubernetes en OpenShift 3](#OpenShift3)
* [Kubernetes en Talos Linux](#TalosLinux)
* [Kubernetes en Rancher Kubernetes Engine (v2.5+)](#RKE)
* [Kubernetes en Rancher Kubernetes Engine (\<v2.5)](#RKEBefore2_5)
* [Kubernetes en servicios administrados (AKS, GKE)](#ManagedServices)

## Kubernetes con Kubeadm {#Kubeadm}

Las siguientes configuraciones se prueban en Kubernetes `v1.18+`.

### Servidor de API {#api-server}

La integración del servidor de API se configura automáticamente. El Datadog Agent lo descubre automáticamente.

### Etcd {#etcd}

Al proporcionar acceso de lectura a los certificados de Etcd ubicados en el servidor, la comprobación del Datadog Agent puede comunicarse con Etcd y comenzar a recopilar métricas de Etcd.

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

### Controller Manager y Scheduler {#controller-manager-and-scheduler}

#### Puertos inseguros {#insecure-ports}

Si los puertos inseguros de sus instancias de Controller Manager y Scheduler están habilitados, el Datadog Agent descubre las integraciones y comienza a recopilar métricas sin ninguna configuración adicional.

#### Puertos seguros {#secure-ports}

Los puertos seguros permiten la autenticación y autorización para proteger los componentes de su plano de control. El Datadog Agent puede recopilar métricas de Controller Manager y Scheduler dirigiéndose a sus puertos seguros.

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

**Notas:**

- El campo `ssl_verify` en la configuración de `kube_controller_manager` y `kube_scheduler` debe establecerse en `false` cuando se utilizan certificados autofirmados.
- Al dirigirse a puertos seguros, la opción `bind-address` en su configuración de Controller Manager y Scheduler debe ser accesible para el Datadog Agent. Ejemplo:

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

### Método recomendado {#recommended-method}

<div class="alert alert-info">Esta función está en versión preliminar.</div>

Datadog admite la supervisión de los componentes del plano de control de Kubernetes, incluidos el API Server, el Controller Manager y el Scheduler.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### Requisitos previos {#prerequisites}

1. Datadog Operator >= `v1.18.0`
1. Datadog Agent >= `v7.69`

#### Configuración general {#general-setup}

En Datadog Operator `v1.29.0` y versiones posteriores, el Operator detecta EKS a partir de las etiquetas de nodo y habilita la supervisión del plano de control automáticamente, por lo que una especificación `DatadogAgent` mínima es suficiente. No se requiere configuración adicional.

{{% collapse-content title="Datadog Operator v1.18.0 a v1.28.x" level="h5" %}}

En estas versiones, la supervisión del plano de control está habilitada de forma predeterminada, pero requiere introspección. Habilite la introspección con el [gráfico de Helm de datadog-operator][1]:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Desde la línea de comandos:

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Luego, implemente una especificación `DatadogAgent` mínima.

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Helm" %}}

#### Requisitos previos {#prerequisites-1}

1. Versión del gráfico de Helm >= `3.152.0`
1. Datadog Agent >= `v7.69`

#### Configuración general {#general-setup-1}

Habilite la supervisión del plano de control usando la opción `providers.eks.controlPlaneMonitoring`:

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

#### Validación {#validation}
Verifique que las comprobaciones se estén ejecutando:

```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Busque:
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`

Debería ver métricas del plano de control en Datadog, incluyendo:
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`

### Configuración heredada {#legacy-setup}

Amazon Elastic Kubernetes Service (EKS) admite la supervisión de todos los componentes del plano de control mediante comprobaciones de clúster.

#### Requisitos previos {#prerequisites-2}
- Un clúster de EKS ejecutándose en la versión de Kubernetes >= 1.28
- Implemente el Agent usando una de las siguientes opciones:
  - Versión del gráfico de Helm >= `3.90.1`
  - Datadog Operator >= `v1.13.0`
- Habilite el Datadog [Cluster Agent][6]

Agregue las siguientes anotaciones al servicio `default/kubernetes`:

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
- Amazon expone métricas de `kube_controller_manager` y `kube_scheduler` bajo el grupo de API [`metrics.eks.amazonaws.com`][11].
- La adición de `"extra_headers":{"accept":"*/*"}` evita errores de `HTTP 406` al consultar la API de métricas de EKS.

## Kubernetes en OpenShift 4 {#OpenShift4}

<div class="alert alert-info">Esta función está en versión preliminar.</div>

Datadog admite la supervisión de los componentes del plano de control de Kubernetes, incluidos el API Server, etcd, el Controller Manager y el Scheduler.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

#### Requisitos previos {#prerequisites-3}

1. Datadog Operator >= `v1.18.0`
1. Datadog Agent >= `v7.69`

**Nota**: `etcd` no es compatible con las versiones 4.0-4.13.

#### Configuración general {#general-setup-2}

En Datadog Operator `v1.29.0` y versiones posteriores, el Datadog Operator detecta OpenShift a partir de la etiqueta de nodo `node.openshift.io/os_id` y habilita la supervisión del plano de control automáticamente, por lo que basta con una especificación `DatadogAgent` mínima. No se requiere configuración adicional.

{{% collapse-content title="Datadog Operator v1.18.0 a v1.28.x" level="h5" %}}

En estas versiones, la supervisión del plano de control está habilitada de forma predeterminada, pero requiere introspección. Habilite la introspección con el [gráfico de Helm de datadog-operator][1]:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Desde la línea de comandos:

```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Si instaló Datadog Operator a través de OperatorHub o Marketplace, que es el [método recomendado][2], aplique el parche a la versión del servicio de clúster de Datadog Operator en su lugar:

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

Luego, implemente una especificación `DatadogAgent` mínima.

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md

{{% /collapse-content %}}

Habilite `features.clusterChecks.useClusterChecksRunners` para programar comprobaciones allí; de lo contrario, las comprobaciones del plano de control se ejecutan en el Node Agent.

Para OpenShift 4.14 y posterior, la supervisión de etcd requiere que copie los certificados de etcd. Consulte los registros de Datadog Operator para ver el comando exacto. Consulte el siguiente ejemplo (ajuste el espacio de nombres según sea necesario):

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | \
  sed 's/namespace: openshift-etcd-operator/namespace: datadog/' | \
  oc apply -f -
```

{{% /tab %}}
{{% tab "Helm" %}}

#### Requisitos previos {#prerequisites-4}

1. Versión del gráfico de Helm >= `3.150.0`
1. Datadog Agent >= `v7.69`

**Nota**: `etcd` no es compatible con las versiones 4.0-4.13.

#### Configuración general {#general-setup-3}

Habilite la supervisión del plano de control usando la opción `providers.openshift.controlPlaneMonitoring`:

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  openshift:
    controlPlaneMonitoring: true
{{< /code-block >}}

Para OpenShift 4.14 y posterior, la supervisión de etcd requiere que copie los certificados de etcd. Para copiarlos en el mismo espacio de nombres que el Datadog Agent:

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

{{% /tab %}}
{{< /tabs >}}

#### Validación {#validation-1}
Verifique que las comprobaciones se estén ejecutando:

```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Busque:
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`
- `etcd`

Debería ver métricas del plano de control en Datadog, incluyendo:
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`
- `etcd.*`

### Configuración heredada {#legacy-setup-1}

En OpenShift 4, todos los componentes del plano de control pueden monitorearse mediante comprobaciones de punto de conexión.

#### Requisitos previos {#prerequisites-5}

1. Habilite el Datadog [Cluster Agent][6]
1. Habilite las [comprobaciones de clúster][7]
1. Habilite las [comprobaciones de punto de conexión][8]
1. Asegúrese de haber iniciado sesión con los permisos suficientes para editar servicios y crear secretos.

#### Servidor de API {#api-server-1}

El servidor de API se ejecuta detrás del servicio `kubernetes` en el espacio de nombres `default`. Anote este servicio con la configuración `kube_apiserver_metrics`:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La última anotación `ad.datadoghq.com/endpoints.resolve` es necesaria porque el servicio está frente a pods estáticos. El Datadog Cluster Agent programa las comprobaciones como comprobaciones de punto de conexión y las envía a los Cluster Check Runners. Los nodos en los que se ejecutan pueden identificarse con:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etcd {#etcd-1}

{{% collapse-content title="Etcd OpenShift 4.0 - 4.13" level="h5" %}}
Se necesitan certificados para comunicarse con el servicio Etcd, los cuales se pueden encontrar en el secreto `kube-etcd-client-certs` en el espacio de nombres `openshift-monitoring`. Para darle al Datadog Agent acceso a estos certificados, primero cópielos en el mismo espacio de nombres en el que se está ejecutando el Datadog Agent:

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

Estos certificados deben montarse en los pods de Cluster Check Runner añadiendo los volúmenes y volumeMounts como se muestra a continuación.

**Nota**: También se incluyen montajes para deshabilitar el archivo de autoconfiguración de la comprobación de Etcd incluido con el Agent.


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

Luego, anote el servicio que se ejecuta frente a Etcd:

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa las comprobaciones como comprobaciones de punto de conexión y las envía a los Cluster Check Runners.

{{% /collapse-content %}}


{{% collapse-content title="Etcd OpenShift 4.14 y versiones posteriores" level="h5" %}}

Se necesitan certificados para comunicarse con el servicio Etcd, los cuales se pueden encontrar en el secreto `etcd-metric-client` en el espacio de nombres `openshift-etcd-operator`. Para darle al Datadog Agent acceso a estos certificados, cópielos en el mismo espacio de nombres en el que se ejecuta el Datadog Agent:

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

Estos certificados deben montarse en los pods de Cluster Check Runner añadiendo los volúmenes y volumeMounts como se muestra a continuación.

**Nota**: También se incluyen montajes para deshabilitar el archivo de autoconfiguración de la comprobación de Etcd incluido con el Agent.


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

Luego, anote el servicio que se ejecuta frente a Etcd:

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'
```

El Datadog Cluster Agent programa las comprobaciones como comprobaciones de punto de conexión y las envía a los Cluster Check Runners.

{{% /collapse-content %}}


#### Controller Manager {#controller-manager}

El Controller Manager se ejecuta detrás del servicio `kube-controller-manager` en el espacio de nombres `openshift-kube-controller-manager`. Anote el servicio con la configuración de comprobación:


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa las comprobaciones como comprobaciones de punto de conexión y las envía a los Cluster Check Runners.



#### Scheduler {#scheduler}

El Scheduler se ejecuta detrás del servicio `scheduler` en el espacio de nombres `openshift-kube-scheduler`. Anote el servicio con la configuración de comprobación:


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa las comprobaciones como comprobaciones de punto de conexión y las envía a los Cluster Check Runners.


## Kubernetes en OpenShift 3 {#OpenShift3}

En OpenShift 3, todos los componentes del plano de control pueden monitorearse mediante comprobaciones de punto de conexión.

### Requisitos previos {#prerequisites-6}

1. Habilite el Datadog [Cluster Agent][6]
1. Habilite las [comprobaciones de clúster][7]
1. Habilite las [comprobaciones de punto de conexión][8]
1. Asegúrese de haber iniciado sesión con los permisos suficientes para crear y editar servicios.

### Servidor de API {#api-server-2}

El servidor de API se ejecuta detrás del servicio `kubernetes` en el espacio de nombres `default`. Anote este servicio con la configuración `kube_apiserver_metrics`:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La última anotación `ad.datadoghq.com/endpoints.resolve` es necesaria porque el servicio está frente a pods estáticos. El Datadog Cluster Agent programa las comprobaciones como comprobaciones de punto de conexión y las envía a los Cluster Check Runners. Los nodos en los que se ejecutan pueden identificarse con:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd {#etcd-2}

Se necesitan certificados para comunicarse con el servicio Etcd, los cuales se encuentran en el servidor. Estos certificados deben montarse en los pods de Cluster Check Runner añadiendo los volúmenes y volumeMounts como se muestra a continuación.

**Nota**: También se incluyen montajes para deshabilitar el archivo de autoconfiguración de la comprobación de Etcd incluido con el Agent.

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

Las ediciones directas de este servicio no se conservan, así que haga una copia del servicio Etcd:

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

Anote el servicio copiado con la configuración de comprobación:

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa las comprobaciones como comprobaciones de punto de conexión y las envía a los Cluster Check Runners.


### Controller Manager y Scheduler {#controller-manager-and-scheduler-1}

Controller Manager y Scheduler se ejecutan detrás del mismo servicio, `kube-controllers` en el espacio de nombres `kube-system`. Las ediciones directas del servicio no se conservan, así que haga una copia del servicio:

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

Anote el servicio copiado con las configuraciones de comprobación:

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Datadog Cluster Agent programa las comprobaciones como comprobaciones de punto de conexión y las envía a los Cluster Check Runners.

## Kubernetes en Talos Linux {#TalosLinux}

Tanto Datadog Operator como Helm son compatibles con Talos Linux.

Con Datadog Operator, el monitoreo del plano de control en Talos requiere la versión 1.32.0 o posterior, la cual detecta Talos a partir de la imagen del SO del nodo y configura las comprobaciones por usted. Con Helm, establezca `providers.talos.enabled` en `true` y declare cada comprobación usted mismo.

Antes de implementar el Agent, etiquete el espacio de nombres de destino para el Pod Security Standard `privileged`, como se describe en la [sección de Talos Linux de distribuciones de Kubernetes][13].

### Servidor de API {#api-server-3}

La integración del servidor de API se configura automáticamente. El Datadog Agent lo descubre automáticamente.

### Etcd {#TalosEtcd}

Al proporcionar acceso de lectura a los certificados de etcd ubicados en el servidor, la comprobación del Datadog Agent puede comunicarse con etcd y comenzar a recopilar métricas de etcd.

En Talos, esos certificados existen solo en los nodos del plano de control, por lo que el Agent debe tolerar el taint del plano de control para ejecutar la comprobación de etcd.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Con la versión 1.32.0 o posterior de Datadog Operator, el monitoreo del plano de control está habilitado de forma predeterminada, y Datadog Operator crea la configuración de la comprobación de etcd y monta los certificados del servidor por usted. La única adición a un DatadogAgent estándar es la tolerancia del plano de control:

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

### Controller Manager y Scheduler {#controller-manager-and-scheduler-2}

#### Puertos seguros {#secure-ports-1}

Los puertos seguros permiten la autenticación y autorización para proteger los componentes de su plano de control. El Datadog Agent puede recopilar métricas de Controller Manager y Scheduler dirigiéndose a sus puertos seguros.

Con la versión 1.32.0 o posterior de Datadog Operator, Datadog Operator ejecuta las comprobaciones del servidor de API, Controller Manager y Scheduler como comprobaciones de clúster, por lo que no requieren tolerancia ni configuración del Agent. La tolerancia en la sección [Etcd](#TalosEtcd) se aplica solo a la comprobación de etcd. Controller Manager y Scheduler aún necesitan que `bind-address` se establezca en `0.0.0.0`.

Con Helm, declare las comprobaciones de la siguiente manera:

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

- El campo `ssl_verify` en la configuración de `kube_controller_manager` y `kube_scheduler` debe establecerse en `false` cuando se utilizan certificados autofirmados. La versión 1.32.0 o posterior de Datadog Operator configura esto por usted.
- Al dirigirse a puertos seguros, la opción `bind-address` en su configuración de Controller Manager y Scheduler debe ser accesible para el Datadog Agent. Aplique el parche a continuación a los nodos del plano de control en la generación del clúster; o, para nodos de Talos en ejecución, ejecute `talosctl patch mc -n <control-plane-node1,control-plane-node2> --patch @controlplane-datadog-monitoring-patch.yaml`.

{{< code-block lang="yaml" filename="controlplane-datadog-monitoring-patch.yaml" >}}
cluster:
  controllerManager:
    extraArgs:
      bind-address: 0.0.0.0
  scheduler:
    extraArgs:
      bind-address: 0.0.0.0
{{< /code-block >}}

## Kubernetes en Rancher Kubernetes Engine (v2.5+) {#RKE}

Rancher v2.5 depende de [PushProx][9] para exponer los puntos de conexión de métricas del plano de control; esto permite que el Datadog Agent ejecute verificaciones del plano de control y recopile métricas.

### Requisitos previos {#prerequisites-7}

1. Instale el Datadog Agent con el [chart de rancher-monitoring][10].
2. Los daemonsets `pushprox` se implementan con `rancher-monitoring` y se ejecutan en el espacio de nombres `cattle-monitoring-system`.

### Servidor de API {#api-server-4}

Para configurar la verificación `kube_apiserver_metrics`, agregue las siguientes anotaciones al servicio `default/kubernetes`:

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Agregue servicios de Kubernetes para configurar verificaciones de Autodiscovery {#add-kubernetes-services-to-configure-autodiscovery-checks}

Al agregar servicios headless de Kubernetes para definir configuraciones de verificación, el Datadog Agent puede dirigirse a los pods `pushprox` y recopilar métricas.

Aplique `rancher-control-plane-services.yaml`:

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

Implemente el Datadog Agent con manifiestos basados en las siguientes configuraciones:

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


## Kubernetes en Rancher Kubernetes Engine (antes de la v2.5) {#RKEBefore2_5}

### API Server, Controller Manager y Scheduler {#api-server-controller-manager-and-scheduler}

Instale el Datadog Agent con el [chart de rancher-monitoring][10].

Los componentes del plano de control se ejecutan en Docker fuera de Kubernetes. Dentro de Kubernetes, el servicio `kubernetes` en el espacio de nombres `default` apunta a la dirección o las direcciones IP del nodo del plano de control. Puede confirmar esto ejecutando `$ kubectl describe endpoints kubernetes`.

Puede anotar este servicio con verificaciones de punto de conexión (administradas por el Datadog Cluster Agent) para monitorear el API Server, el Controller Manager y el Scheduler:

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

Etcd se ejecuta en Docker fuera de Kubernetes, y se requieren certificados para comunicarse con el servicio Etcd. Los pasos sugeridos para configurar la supervisión de Etcd requieren acceso SSH a un nodo del plano de control que ejecute Etcd.

1. Acceda por SSH al nodo del plano de control siguiendo la [documentación de Rancher][9]. Confirme que Etcd se esté ejecutando en un contenedor de Docker con `$ docker ps` y, luego, use `$ docker inspect etcd` para encontrar la ubicación de los certificados utilizados en el comando de ejecución (`"Cmd"`), así como la ruta de los montajes en el servidor.

Las tres banderas en el comando que debe buscar son:

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. Utilizando la información de montaje disponible en la salida de `$ docker inspect etcd`, configure `volumes` y `volumeMounts` en la configuración del Datadog Agent. Incluya también tolerancias para que el Datadog Agent pueda ejecutarse en los nodos del plano de control.

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


3. Configure un DaemonSet con un contenedor de pausa para ejecutar la verificación de Etcd en los nodos que ejecutan Etcd. Este DaemonSet se ejecuta en la red del servidor para que pueda acceder al servicio de Etcd. También cuenta con la configuración de la verificación y las tolerancias necesarias para ejecutarse en el o los nodos del plano de control. Asegúrese de que las rutas de los archivos de certificados montados coincidan con lo que configuró en su instancia y reemplace la parte `<...>` según corresponda.

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

Para implementar el DaemonSet y la configuración de la verificación, ejecute

```shell
kubectl apply -f <filename>
```


## Kubernetes en servicios administrados (AKS, GKE) {#ManagedServices}

En otros servicios administrados, como Azure Kubernetes Service (AKS) y Google Kubernetes Engine (GKE), el usuario no puede acceder a los componentes del plano de control. Como resultado, no es posible ejecutar las verificaciones `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` o `etcd` en estos entornos.


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
[13]: /es/containers/kubernetes/distributions/#Talos
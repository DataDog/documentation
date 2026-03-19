---
aliases:
- /es/agent/kubernetes/control_plane
description: Monitorea los componentes del plano de control de Kubernetes, incluyendo
  el servidor API, etcd, el administrador de controladores y el programador
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Recopila los registros de tu aplicación
- link: /agent/kubernetes/apm
  tag: Documentation
  text: Recopila las trazas de tu aplicación
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Recopila tus métricas de Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: Recopila automáticamente tus métricas y registros de aplicación
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: Limita la recopilación de datos a un subconjunto de contenedores solamente
- link: /agent/kubernetes/tag
  tag: Documentation
  text: Asigna etiquetas a todos los datos emitidos por un contenedor
title: Monitoreo del Plano de Control de Kubernetes
---
## Resumen

Esta sección tiene como objetivo documentar especificidades y proporcionar buenas configuraciones base para monitorear el Plano de Control de Kubernetes. Luego puedes personalizar estas configuraciones para agregar cualquier característica de Datadog.

Con las integraciones de Datadog para el [servidor API][1], [Etcd][2], [Administrador de Controladores][3] y [Programador][4], puedes recopilar métricas clave de los cuatro componentes del Plano de Control de Kubernetes.

* [Kubernetes con Kubeadm](#Kubeadm)
* [Kubernetes en Amazon EKS](#EKS)
* [Kubernetes en OpenShift 4](#OpenShift4)
* [Kubernetes en OpenShift 3](#OpenShift3)
* [Kubernetes en Talos Linux](#TalosLinux)
* [Kubernetes en Rancher Kubernetes Engine (v2.5+)](#RKE)
* [Kubernetes en Rancher Kubernetes Engine (\<v2.5)](#RKEBefore2_5)
* [Kubernetes en Servicios Administrados (AKS, GKE)](#ManagedServices)

## Kubernetes con Kubeadm {#Kubeadm}

Las siguientes configuraciones se prueban en Kubernetes `v1.18+`.

### Servidor API

La integración del servidor API se configura automáticamente. El Agente de Datadog lo descubre automáticamente.

### Etcd

Al proporcionar acceso de lectura a los certificados de Etcd ubicados en el host, el chequeo del Agente de Datadog puede comunicarse con Etcd y comenzar a recopilar métricas de Etcd.

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

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

### Administrador de Controladores y Programador

#### Puertos inseguros

Si los puertos inseguros de sus instancias de Administrador de Controladores y Programador están habilitados, el Agente de Datadog descubre las integraciones y comienza a recopilar métricas sin ninguna configuración adicional.

#### Puertos seguros

Los puertos seguros permiten la autenticación y autorización para proteger los componentes de su plano de control. El Agente de Datadog puede recopilar métricas del Administrador de Controladores y del Programador dirigiéndose a sus puertos seguros.

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

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

- El campo `ssl_verify` en la configuración `kube_controller_manager` y `kube_scheduler` necesita ser establecido en `false` al usar certificados autofirmados.
- Al apuntar a puertos seguros, la opción `bind-address` en la configuración de tu Administrador de Controladores y Programador debe ser accesible por el Agente de Datadog. Ejemplo:

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

Datadog admite la supervisión de los componentes del plano de control de Kubernetes, incluidos el Servidor API, el Administrador de Controladores y el Programador.

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

#### Requisitos previos

1. Datadog Operator >= `v1.18.0`
1. Agente de Datadog >= `v7.69`

#### Configuración general

La supervisión del plano de control está habilitada por defecto, pero requiere que la introspección esté habilitada.

Puedes habilitar la introspección usando el [chart de Helm datadog-operator](https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator):

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Usando la línea de comandos:
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Dado que esta función está habilitada por defecto, puedes implementar una especificación mínima de DatadogAgent.

{{% /tab %}}

{{% tab "Helm" %}}

#### Requisitos previos

1. Versión del chart de Helm >= `3.152.0`
1. Agente de Datadog >= `v7.69`

#### Configuración general

Habilita la supervisión del plano de control usando la opción `providers.eks.controlPlaneMonitoring`:

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
Verifica que las verificaciones estén en ejecución:
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Busca:
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`

Deberías ver métricas del plano de control en Datadog, incluyendo:
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`

### Configuración heredada

Amazon Elastic Kubernetes Service (EKS) admite la supervisión de todos los componentes del plano de control utilizando verificaciones de clúster.

#### Requisitos previos
- Un clúster de EKS ejecutándose en la versión de Kubernetes >= 1.28
- Despliega el Agente usando uno de:
  - Versión del gráfico de Helm >= `3.90.1`
  - Datadog Operator >= `v1.13.0`
- Habilita el [Agente de Clúster de Datadog][6]

Agrega las siguientes anotaciones al servicio `default/kubernetes`:

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
- La adición de `"extra_headers":{"accept":"*/*"}` previene errores `HTTP 406` al consultar la API de métricas de EKS.

## Kubernetes en OpenShift 4 {#OpenShift4}

<div class="alert alert-info">Esta función está en vista previa.</div>

Datadog admite la supervisión de los componentes del plano de control de Kubernetes, incluidos el servidor API, etcd, el administrador de controladores y el programador.

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

#### Requisitos previos

1. Datadog Operator >= `v1.18.0`
1. Agente de Datadog >= `v7.69`

**Nota**: `etcd` no es compatible con las versiones 4.0-4.13.

#### Configuración general

La supervisión del plano de control está habilitada por defecto, pero requiere que la introspección esté habilitada.

Puedes habilitar la introspección usando el [chart de Helm datadog-operator][12]:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Usando la línea de comandos:
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

O, para **usuarios de OpenShift** que instalaron el operador a través de OperatorHub/Marketplace (el [método recomendado](install-openshift.md)), parcheando la versión del servicio del operador en el clúster:

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

Dado que esta función está habilitada por defecto, puedes implementar una especificación mínima de DatadogAgent.

Habilita `features.clusterChecks.useClusterChecksRunners` para programar verificaciones allí; de lo contrario, las verificaciones del plano de control se ejecutan en el Agente de Nodo.

Para OpenShift 4.14 y versiones posteriores, la supervisión de etcd requiere que copies los certificados de etcd. Revisa los registros del operador para el comando exacto. Consulta el siguiente ejemplo (ajusta el espacio de nombres según sea necesario):

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | \
  sed 's/namespace: openshift-etcd-operator/namespace: datadog/' | \
  oc apply -f -
```

[12]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator

{{% /tab %}}
{{% tab "Helm" %}}

#### Requisitos previos

1. Versión del chart de Helm >= `3.150.0`
1. Agente de Datadog >= `v7.69`

**Nota**: `etcd` no es compatible con las versiones 4.0-4.13.

#### Configuración general

Habilita la supervisión del plano de control usando la `providers.openshift.controlPlaneMonitoring` opción:

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  openshift:
    controlPlaneMonitoring: true
{{< /code-block >}}

Para OpenShift 4.14 y versiones posteriores, la supervisión de etcd requiere que copies los certificados de etcd. Para copiarlos en el mismo espacio de nombres que el Agente de Datadog:

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

{{% /tab %}}
{{< /tabs >}}

#### Validación
Verifica que las verificaciones estén en ejecución:
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Busca:
- `kube_apiserver_metrics`
- `kube_controller_manager`
- `kube_scheduler`
- `etcd`

Deberías ver métricas del plano de control en Datadog, incluyendo:
- `kube_apiserver.*`
- `kube_controller_manager.*`
- `kube_scheduler.*`
- `etcd.*`

### Configuración heredada

En OpenShift 4, todos los componentes del plano de control se pueden supervisar usando verificaciones de endpoint.

#### Requisitos previos

1. Habilita el [Agente de Clúster de Datadog][6]
1. Habilita [Verificaciones de Clúster][7]
1. Habilita [Verificaciones de Endpoint][8]
1. Asegúrate de haber iniciado sesión con permisos suficientes para editar servicios y crear secretos.

#### Servidor API

El servidor API se ejecuta detrás del servicio `kubernetes` en el espacio de nombres `default`. Anota este servicio con la configuración `kube_apiserver_metrics`:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La última anotación `ad.datadoghq.com/endpoints.resolve` es necesaria porque el servicio está frente a pods estáticos. El Agente de Clúster de Datadog programa las verificaciones como verificaciones de punto final y las despacha a los Ejecutores de Verificación de Clúster. Los nodos en los que se están ejecutando se pueden identificar con:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etcd

{{% collapse-content title="Etcd OpenShift 4.0 - 4.13" level="h4" %}}
Se necesitan certificados para comunicarse con el servicio Etcd, que se pueden encontrar en el secreto `kube-etcd-client-certs` en el espacio de nombres `openshift-monitoring`. Para dar acceso al Agente de Datadog a estos certificados, primero cópialos en el mismo espacio de nombres en el que se está ejecutando el Agente de Datadog:

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

Estos certificados deben montarse en los pods de Ejecutores de Verificación de Clúster agregando los volúmenes y volumeMounts como se indica a continuación.

**Nota**: También se incluyen montajes para deshabilitar el archivo de autoconfiguración de verificación de Etcd empaquetado con el agente.


{{< tabs >}}
{{% tab "Operador de Datadog" %}}

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

Luego, anota el servicio que se ejecuta frente a Etcd:

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Agente de Clúster de Datadog programa las verificaciones como verificaciones de punto final y las despacha a los Ejecutores de Verificación de Clúster.

{{% /collapse-content %}}


{{% collapse-content title="Etcd OpenShift 4.14 y versiones posteriores" level="h4" %}}

Se necesitan certificados para comunicarse con el servicio Etcd, que se pueden encontrar en el secreto `etcd-metric-client` en el espacio de nombres `openshift-etcd-operator`. Para dar acceso al Agente de Datadog a estos certificados, cópialos en el mismo espacio de nombres que el Agente de Datadog:

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

Estos certificados deben montarse en los pods de Ejecutores de Verificación de Clúster agregando los volúmenes y volumeMounts como se indica a continuación.

**Nota**: También se incluyen montajes para deshabilitar el archivo de autoconfiguración de verificación de Etcd empaquetado con el agente.


{{< tabs >}}
{{% tab "Operador de Datadog" %}}

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

Luego, anota el servicio que se ejecuta frente a Etcd:

```shell
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/etc/etcd-certs/etcd-client-ca.crt", "tls_cert": "/etc/etcd-certs/etcd-client.crt",
      "tls_private_key": "/etc/etcd-certs/etcd-client.key"}]'
oc annotate service etcd -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'
```

El Agente de Clúster de Datadog programa las verificaciones como verificaciones de punto final y las despacha a los Ejecutores de Verificación de Clúster.

{{% /collapse-content %}}


#### Administrador de Controladores

El Administrador de Controladores se ejecuta detrás del servicio `kube-controller-manager` en el espacio de nombres `openshift-kube-controller-manager`. Anota el servicio con la configuración de verificación:


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Agente de Clúster de Datadog programa las verificaciones como verificaciones de punto final y las despacha a los Ejecutores de Verificación de Clúster.



#### Programador

El Programador se ejecuta detrás del servicio `scheduler` en el espacio de nombres `openshift-kube-scheduler`. Anota el servicio con la configuración de verificación:


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Agente de Clúster de Datadog programa las verificaciones como verificaciones de punto final y las despacha a los Ejecutores de Verificación de Clúster.


## Kubernetes en OpenShift 3 {#OpenShift3}

En OpenShift 3, todos los componentes del plano de control se pueden monitorear utilizando verificaciones de punto final.

### Requisitos previos

1. Habilitar el [Agente de Clúster de Datadog][6]
1. Habilitar [verificaciones de clúster][7]
1. Habilitar [verificaciones de punto final][8]
1. Asegúrate de estar conectado con permisos suficientes para crear y editar servicios.

### Servidor API

El servidor API se ejecuta detrás del servicio `kubernetes` en el espacio de nombres `default`. Anota este servicio con la configuración `kube_apiserver_metrics`:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La última anotación `ad.datadoghq.com/endpoints.resolve` es necesaria porque el servicio está frente a pods estáticos. El Agente de Clúster de Datadog programa las verificaciones como verificaciones de punto final y las despacha a los Ejecutores de Verificación de Clúster. Los nodos en los que se están ejecutando se pueden identificar con:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Se necesitan certificados para comunicarse con el servicio Etcd, que se encuentran en el host. Estos certificados deben montarse en los pods de Ejecutores de Verificación de Clúster agregando los volúmenes y volumeMounts como se indica a continuación.

**Nota**: También se incluyen montajes para deshabilitar el archivo de autoconfiguración de verificación de Etcd empaquetado con el agente.

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

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

Las ediciones directas de este servicio no se persisten, así que haz una copia del servicio Etcd:

```shell
oc get service etcd -n kube-system -o yaml | sed 's/name: etcd/name: etcd-copy/'  | oc create -f -

```

Anota el servicio copiado con la configuración de verificación:

```shell
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.check_names=["etcd"]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "tls_ca_cert": "/host/etc/etcd/ca/ca.crt", "tls_cert": "/host/etc/etcd/server.crt",
      "tls_private_key": "/host/etc/etcd/server.key"}]'
oc annotate service etcd-copy -n openshift-etcd 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Agente de Clúster de Datadog programa las verificaciones como verificaciones de punto final y las despacha a los Ejecutores de Verificación de Clúster.


### Administrador de Controladores y Programador

El Administrador de Controladores y el Programador se ejecutan detrás del mismo servicio, `kube-controllers` en el espacio de nombres `kube-system`. Las ediciones directas del servicio no se persisten, así que haz una copia del servicio:

```shell
oc get service kube-controllers -n kube-system -o yaml | sed 's/name: kube-controllers/name: kube-controllers-copy/'  | oc create -f -

```

Anota el servicio copiado con las configuraciones de verificación:

```shell
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager", "kube_scheduler"]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.init_configs=[{}, {}]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.instances=[{ "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }, { "prometheus_url": "https://%%host%%:%%port%%/metrics",
      "ssl_verify": "false", "bearer_token_auth": "true" }]'
oc annotate service kube-controllers-copy -n kube-system 'ad.datadoghq.com/endpoints.resolve=ip'

```

El Agente de Clúster de Datadog programa las verificaciones como verificaciones de punto final y las despacha a los Ejecutores de Verificación de Clúster.

## Kubernetes en Talos Linux {#TalosLinux}

Helm es el método de instalación recomendado para Talos Linux. Usa Helm configurando la bandera `providers.talos.enabled` a `true`.

### Servidor API

La integración del servidor API se configura automáticamente. El Agente de Datadog lo descubre automáticamente.

### Etcd

Al proporcionar acceso de lectura a los certificados etcd ubicados en el host, la verificación del Agente de Datadog puede comunicarse con etcd y comenzar a recopilar métricas de etcd.

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

### Administrador de Controladores y Programador

#### Puertos seguros

Los puertos seguros permiten la autenticación y autorización para proteger los componentes de su plano de control. El Agente de Datadog puede recopilar métricas del Administrador de Controladores y del Programador dirigiéndose a sus puertos seguros.

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

- El campo `ssl_verify` en la configuración `kube_controller_manager` y `kube_scheduler` necesita ser establecido en `false` al usar certificados autofirmados.
- Al apuntar a puertos seguros, la opción `bind-address` en la configuración de tu Administrador de Controladores y Programador debe ser accesible por el Agente de Datadog. Aplica el parche a continuación a los nodos del plano de control en la generación del clúster; o, para los nodos de Talos en ejecución, ejecuta `talosctl patch mc -n <control-plane-node1,control-plane-node2> --patch @controlplane-datadog-monitoring-patch.yaml`.

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

Rancher v2.5 se basa en [PushProx][9] para exponer los puntos finales de métricas del plano de control, esto permite que el Agente de Datadog ejecute verificaciones del plano de control y recolecte métricas.

### Requisitos previos

1. Instala el Agente de Datadog con el [chart de rancher-monitoring][10].
2. Los `pushprox` daemonsets se despliegan con `rancher-monitoring` y están en ejecución en el espacio de nombres `cattle-monitoring-system`.

### Servidor API

Para configurar la verificación `kube_apiserver_metrics`, agrega las siguientes anotaciones al servicio `default/kubernetes`:

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Agrega servicios de Kubernetes para configurar verificaciones de Autodescubrimiento

Al agregar servicios de Kubernetes sin cabeza para definir configuraciones de verificación, el Agente de Datadog puede dirigirse a los pods `pushprox` y recolectar métricas.

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

Despliega el Agente de Datadog con manifiestos basados en las siguientes configuraciones:

{{< tabs >}}
{{% tab "Operador de Datadog" %}}

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

### Servidor API, Administrador de Controladores y Programador

Instala el Agente de Datadog con el [chart de rancher-monitoring][10].

Los componentes del plano de control se ejecutan en Docker fuera de Kubernetes. Dentro de Kubernetes, el servicio `kubernetes` en el espacio de nombres `default` apunta a la(s) IP(s) del nodo del plano de control. Puedes confirmar esto ejecutando `$ kubectl describe endpoints kubernetes`.

Puedes anotar este servicio con verificaciones de punto final (gestionadas por el Agente de Clúster de Datadog) para monitorear el Servidor API, el Administrador de Controladores y el Programador:

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

Etcd se ejecuta en Docker fuera de Kubernetes, y se requieren certificados para comunicarse con el servicio Etcd. Los pasos sugeridos para configurar la supervisión de Etcd requieren acceso SSH a un nodo del plano de control que ejecute Etcd.

1. Conéctate al nodo del plano de control siguiendo la [documentación de Rancher][9]. Confirma que Etcd está corriendo en un contenedor de Docker con `$ docker ps`, y luego usa `$ docker inspect etcd` para encontrar la ubicación de los certificados utilizados en el comando de ejecución (`"Cmd"`), así como la ruta del host de los montajes.

Las tres banderas en el comando a buscar son:

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. Usando la información de montaje disponible en la salida de `$ docker inspect etcd`, establece `volumes` y `volumeMounts` en la configuración del Agente de Datadog. También incluye tolerancias para que el Agente de Datadog pueda ejecutarse en los nodos del plano de control.

Los siguientes son ejemplos de cómo configurar el Agente de Datadog con Helm y el Operador de Datadog:


{{< tabs >}}
{{% tab "Operador de Datadog" %}}

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


3. Configura un DaemonSet con un contenedor de pausa para ejecutar la verificación de Etcd en los nodos que ejecutan Etcd. Este DaemonSet se ejecuta en la red del host para que pueda acceder al servicio de Etcd. También tiene la configuración de verificación y las tolerancias necesarias para ejecutarse en el/los nodo(s) del plano de control. Asegúrate de que las rutas de los archivos de certificado montados coincidan con lo que configuraste en tu instancia, y reemplaza la parte de `<...>` en consecuencia.

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

Para desplegar el DaemonSet y la configuración de verificación, ejecuta

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
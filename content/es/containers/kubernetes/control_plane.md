---
aliases:
- /es/agent/kubernetes/control_plane
description: Monitoree los componentes del plano de control de Kubernetes, incluido
  el servidor API, etc., el administrador de controladores y el programador
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Recopila tus registros de aplicaciones
- link: /agent/kubernetes/apm
  tag: Documentation
  text: Recopila los rastros de tu aplicación
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Recopila tus métricas de Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: Recopila automáticamente las métricas y registros de tu aplicación
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: Limitar la recopilación de datos a un subconjunto de contenedores solamente
- link: /agent/kubernetes/tag
  tag: Documentation
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
title: Monitoreo del plano de control de Kubernetes
---
## Overview

Esta sección tiene como objetivo documentar especificidades y proporcionar buenas configuraciones base para monitorear el Plano de Control de Kubernetes. A continuación, puede personalizar estas configuraciones para agregar cualquier característica de Datadog.

Con las integraciones de Datadog para el [servidor API][1], [Etcd][2], [Controller Manager][3] y [Scheduler][4], puede recopilar métricas clave de los cuatro componentes del Plano de control de Kubernetes.

* [Kubernetes con Kubeadm](#Kubeadm)
* [Kubernetes en Amazon EKS](#EKS)
* [Kubernetes en OpenShift 4](#OpenShift4)
* [Kubernetes en OpenShift 3](#OpenShift3)
* [Kubernetes en Talos Linux](#TalosLinux)
* [Kubernetes en Rancher Kubernetes Engine (v2.5+)](#RKE)
* [Kubernetes en Rancher Kubernetes Engine (\&lt;v2.5)](#RKEBefore2_5)
* [Kubernetes sobre Servicios Gestionados (AKS, GKE)](#ServiciosGestionados)

## Kubernetes con Kubeadm {#Kubeadm}

Las siguientes configuraciones se prueban en Kubernetes `v1.18+`.

### Servidor API

La integración del servidor API se configura automáticamente. El agente Datadog lo descubre automáticamente.

### Etcd

Al proporcionar acceso de lectura a los certificados de Etcd ubicados en el host, la verificación del agente Datadog puede comunicarse con Etcd y comenzar a recopilar métricas de Etcd.

{{< tabs >}}
{{% tab "Operador Datadog" %}}

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
{{% tab "Timón" %}}

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

### Controller Manager and Scheduler

#### Puertos inseguros

Si los puertos inseguros de las instancias de Controller Manager y Scheduler están habilitados, el Datadog Agent descubre las integraciones y comienza a recopilar métricas sin ninguna configuración adicional.

#### Puertos seguros

Los puertos seguros permiten la autenticación y autorización para proteger los componentes de su Plano de Control. El Datadog Agent puede recopilar métricas de Controller Manager y Scheduler seleccionando sus puertos seguros.

{{< tabs >}}
{{% tab "Operador Datadog" %}}

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
{{% tab "Timón" %}}

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

** Notas:**

 El campo `ssl_verify` en la configuración `kube_controller_manager` y `kube_scheduler` debe establecerse en `false' cuando se usan certificados autofirmados.
 Cuando se dirige a puertos seguros, el agente Datadog debe poder acceder a la opción “bindaddress” en la configuración de su Administrador de controladores y Programador. Ejemplo:

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

<div class="alert alert-info">This feature is in Preview.</div>

Datadog admite la supervisión de componentes del Plano de control de Kubernetes, incluidos el servidor API, el Administrador de controladores y el Programador.

{{< tabs >}}
{{% tab "Operador Datadog" %}}

#### Requisitos previos

1. Operador Datadog >= `v1.18.0`
1. Datadog Agent >= `v7.69`

#### Configuración general

El monitoreo del plano de control está habilitado de forma predeterminada, pero requiere que la introspección esté habilitada.

Puede habilitar la introspección usando el [diagrama del timón datatadogoperator](https://github.com/DataDog/helmcharts/tree/main/charts/datadogoperator):

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Usando la línea de comandos:
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

Dado que esta característica está habilitada de forma predeterminada, puede implementar una especificación mínima de DatadogAgent.

{{% /tab %}}

{{% tab "Timón" %}}

#### Requisitos previos

1. Versión del gráfico de timón >= `3.152.0`
1. Datadog Agent >= `v7.69`

#### Configuración general

Habilite la supervisión del plano de control mediante la opción `providers.eks.controlPlaneMonitoring`:

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
Compruebe que las comprobaciones se ejecutan:
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Busca:
 `kube_apiserver_metrics`
 `kube_controller_manager`
 `kube_scheduler`

Deberías ver las métricas del plano de control en Datadog, incluyendo:
 `kube_apiserver.*`
 `kube_controller_manager.*`
 `kube_scheduler.*`

### Legacy setup

Amazon Elastic Kubernetes Service (EKS) admite la supervisión de todos los componentes del plano de control mediante comprobaciones de clúster.

#### Requisitos previos
 Un clúster EKS que se ejecuta en la versión Kubernetes >= 1.28
 Implemente el agente utilizando uno de:
   Versión del gráfico de timón >= `3.90.1`
   Operador Datadog >= `v1.13.0`
 Habilitar el Datadog [Agente de clúster][6]

Añádanse las siguientes anotaciones al servicio `predeterminado/kubernetes':

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

** Notas:**
 Amazon expone las métricas `kube_controller_manager` y `kube_scheduler` bajo el Grupo API [`metrics.eks.amazonaws.com`][11].
 La adición de `"extra_headers":{"accept":"*/*"}` previene errores de `HTTP 406` al consultar la API de métricas de EKS.

## Kubernetes en OpenShift 4 {#OpenShift4}

<div class="alert alert-info">This feature is in Preview.</div>

Datadog soporta monitorear componentes del Plano de Control de Kubernetes, incluyendo el Servidor API, etcd, el Administrador de Controladores y el Programador.

{{< tabs >}}
{{% tab "Operador Datadog" %}}

#### Requisitos previos

1. Operador Datadog >= `v1.18.0`
1. Datadog Agent >= `v7.69`

**Nota**: `etcd` no es compatible con las versiones 4.04.13.

#### Configuración general

El monitoreo del plano de control está habilitado de forma predeterminada, pero requiere que la introspección esté habilitada.

Puede habilitar la introspección usando el gráfico [datadogoperator Helm chart][12]:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
introspection:
  enabled: true
{{< /code-block >}}

Usando la línea de comandos:
```shell
helm install datadog-operator datadog/datadog-operator --set introspection.enabled=true
```

O, para los **usuarios de OpenShift** que instalaron el operador a través de OperatorHub/Marketplace (el [método recomendado](installopenshift.md)), parcheando la versión del servicio del clúster de operadores:

```shell
oc patch csv <datadog-operator.VERSION> -n <datadog-operator-namespace> \
  --type='json' \
  -p='[{"op": "add", "path": "/spec/install/spec/deployments/0/spec/template/spec/containers/0/args/-", "value": "--introspectionEnabled=true"}]'
```

Dado que esta característica está habilitada de forma predeterminada, puede implementar una especificación mínima de DatadogAgent.

Active `features.clusterChecks.useClusterChecksRunners` para programar comprobaciones allí; de lo contrario, las comprobaciones del plano de control se ejecutan en el agente de nodos.

Para OpenShift 4.14 y posteriores, la supervisión de etcd requiere que copie los certificados etcd. Revise los registros del operador para el comando exacto. Consulte el siguiente ejemplo (ajuste el espacio de nombres según sea necesario):

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | \
  sed 's/namespace: openshift-etcd-operator/namespace: datadog/' | \
  oc apply -f -
```

[12]: https://github.com/DataDog/helmcharts/tree/main/charts/datadogoperator

{{% /tab %}}
{{% tab "Timón" %}}

#### Requisitos previos

1. Versión del gráfico de timón >= `3.150.0`
1. Datadog Agent >= `v7.69`

**Nota**: `etcd` no es compatible con las versiones 4.04.13.

#### Configuración general

Habilite la supervisión del plano de control mediante la opción `providers.openshift.controlPlaneMonitoring`:

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
providers:
  openshift:
    controlPlaneMonitoring: true
{{< /code-block >}}

Para OpenShift 4.14 y posteriores, la supervisión de etcd requiere que copie los certificados etcd. Para copiarlos en el mismo espacio de nombres que el Datadog Agent:

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

{{% /tab %}}
{{< /tabs >}}

#### Validación
Compruebe que las comprobaciones se ejecutan:
```shell
kubectl exec <cluster-agent-pod> -- agent clusterchecks
```

Busca:
 `kube_apiserver_metrics`
 `kube_controller_manager`
 `kube_scheduler`
 «etcd»

Deberías ver las métricas del plano de control en Datadog, incluyendo:
 `kube_apiserver.*`
 `kube_controller_manager.*`
 `kube_scheduler.*`
 «etc.*»

### Legacy setup

En OpenShift 4, todos los componentes del plano de control se pueden monitorear mediante comprobaciones de punto final.

#### Requisitos previos

1. Habilitar el Datadog [Agente de clúster][6]
1. Activar [verificaciones por grupos][7]
1. Habilitar [Verificaciones de punto final][8]
Asegúrese de que ha iniciado sesión con los permisos suficientes para editar servicios y crear secretos.

#### Servidor API

El servidor API se ejecuta detrás del servicio `kubernetes` en el espacio de nombres `predeterminado`. Anote este servicio con la configuración `kube_apiserver_metrics`:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La última anotación `ad.datadoghq.com/endpoints.resolve` es necesaria porque el servicio está delante de pods estáticos. El agente de clúster Datadog programa las comprobaciones como comprobaciones de punto final y las envía a los corredores de comprobación de clúster. Los nodos en los que se ejecutan se pueden identificar con:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```
#### Etcd

{{% collapse-content title="Etcd OpenShift 4.0 4.13" level="h4" %}}
Los certificados son necesarios para comunicarse con el servicio Etcd, que se puede encontrar en los secretos `kubeetcdclientcerts` en el espacio de nombres `openshiftmonitoring`. Para dar acceso al Datadog Agent a estos certificados, primero cópielos en el mismo espacio de nombres en el que se ejecuta el Datadog Agent:

```shell
oc get secret kube-etcd-client-certs -n openshift-monitoring -o yaml | sed 's/namespace: openshift-monitoring/namespace: <datadog agent namespace>/'  | oc create -f -

```

Estos certificados deben montarse en los módulos Cluster Check Runner añadiendo los volúmenes y volumeMounts de la siguiente manera.

**Nota**: También se incluyen monturas para desactivar el archivo de autoconfiguración de comprobación Etcd empaquetado con el agente.


{{< tabs >}}
{{% tab "Operador Datadog" %}}

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
{{% tab "Timón" %}}

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

El agente de clúster Datadog programa las comprobaciones como comprobaciones de punto final y las envía a los corredores de comprobación de clúster.

{{% /collapse-content %}}


{{% collapse-content title="Etcd OpenShift 4.14 y posterior" level="h4" %}}

Los certificados son necesarios para comunicarse con el servicio Etcd, que se puede encontrar en el secreto `etcdmetricclient` en el espacio de nombres `openshiftetcdoperator`. Para dar acceso al Datadog Agent a estos certificados, cópielos en el mismo espacio de nombres que el Datadog Agent:

```shell
oc get secret etcd-metric-client -n openshift-etcd-operator -o yaml | sed 's/namespace: openshift-etcd-operator/namespace: <datadog agent namespace>/'  | oc create -f -
```

Estos certificados deben montarse en los módulos Cluster Check Runner añadiendo los volúmenes y volumeMounts de la siguiente manera.

**Nota**: También se incluyen monturas para desactivar el archivo de autoconfiguración de comprobación Etcd empaquetado con el agente.


{{< tabs >}}
{{% tab "Operador Datadog" %}}

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
{{% tab "Timón" %}}

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

El agente de clúster Datadog programa las comprobaciones como comprobaciones de punto final y las envía a los corredores de comprobación de clúster.

{{% /collapse-content %}}


#### Controller Manager

El Administrador de controladores se ejecuta detrás del servicio `kubecontrollermanager` en el espacio de nombres `openshiftkubecontrollermanager`. Anote el servicio con la configuración de comprobación:


```shell
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.check_names=["kube_controller_manager"]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service kube-controller-manager -n openshift-kube-controller-manager 'ad.datadoghq.com/endpoints.resolve=ip'

```

El agente de clúster Datadog programa las comprobaciones como comprobaciones de punto final y las envía a los corredores de comprobación de clúster.



#### Programador

El Scheduler se ejecuta detrás del servicio `scheduler` en el espacio de nombres `openshiftkubescheduler`. Anote el servicio con la configuración de comprobación:


```shell
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.check_names=["kube_scheduler"]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "ssl_verify": "false", "bearer_token_auth": "true"}]'
oc annotate service scheduler -n openshift-kube-scheduler 'ad.datadoghq.com/endpoints.resolve=ip'

```

El agente de clúster Datadog programa las comprobaciones como comprobaciones de punto final y las envía a los corredores de comprobación de clúster.


## Kubernetes en OpenShift 3 {#OpenShift3}

En OpenShift 3, todos los componentes del plano de control se pueden monitorear mediante comprobaciones de punto final.

### Prerrequisitos

1. Habilitar el Datadog [Agente de clúster][6]
1. Activar [verificaciones por grupos][7]
1. Habilitar [Verificaciones de punto final][8]
Asegúrese de que ha iniciado sesión con los permisos suficientes para crear y editar servicios.

### Servidor API

El servidor API se ejecuta detrás del servicio `kubernetes` en el espacio de nombres `predeterminado`. Anote este servicio con la configuración `kube_apiserver_metrics`:

```shell
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.check_names=["kube_apiserver_metrics"]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.init_configs=[{}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.instances=[{"prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true"}]'
oc annotate service kubernetes -n default 'ad.datadoghq.com/endpoints.resolve=ip'

```

La última anotación `ad.datadoghq.com/endpoints.resolve` es necesaria porque el servicio está delante de pods estáticos. El agente de clúster Datadog programa las comprobaciones como comprobaciones de punto final y las envía a los corredores de comprobación de clúster. Los nodos en los que se ejecutan se pueden identificar con:

```shell
oc exec -it <datadog cluster agent pod> -n <datadog ns> -- agent clusterchecks

```

### Etcd

Se necesitan certificados para comunicarse con el servicio Etcd, que se encuentran en el host. Estos certificados deben montarse en los módulos Cluster Check Runner añadiendo los volúmenes y volumeMounts de la siguiente manera.

**Nota**: También se incluyen monturas para desactivar el archivo de autoconfiguración de comprobación Etcd empaquetado con el agente.

{{< tabs >}}
{{% tab "Operador Datadog" %}}

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
{{% tab "Timón" %}}

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

Las ediciones directas de este servicio no persisten, así que haz una copia del servicio Etcd:

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

El agente de clúster Datadog programa las comprobaciones como comprobaciones de punto final y las envía a los corredores de comprobación de clúster.


### Controller Manager and Scheduler

El Controller Manager y Scheduler se ejecutan detrás del mismo servicio, `kubecontrollers` en el espacio de nombres `kubesystem`. Las ediciones directas del servicio no persisten, así que haz una copia del servicio:

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

El agente de clúster Datadog programa las comprobaciones como comprobaciones de punto final y las envía a los corredores de comprobación de clúster.

## Kubernetes en Talos Linux {#TalosLinux}

Helm es el método de instalación recomendado para Talos Linux. Utilice Helm estableciendo la bandera `providers.talos.enabled` en `true'.

### Servidor API

La integración del servidor API se configura automáticamente. El agente Datadog lo descubre automáticamente.

### Etcd

Al proporcionar acceso de lectura a los certificados etcd ubicados en el host, la verificación del agente Datadog puede comunicarse con etcd y comenzar a recopilar métricas de etcd.

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

### Controller Manager and Scheduler

#### Puertos seguros

Los puertos seguros permiten la autenticación y autorización para proteger los componentes de su Plano de Control. El Datadog Agent puede recopilar métricas de Controller Manager y Scheduler seleccionando sus puertos seguros.

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

** Notas:**

 El campo `ssl_verify` en la configuración `kube_controller_manager` y `kube_scheduler` debe establecerse en `false' cuando se usan certificados autofirmados.
 Cuando se dirige a puertos seguros, el agente Datadog debe poder acceder a la opción “bindaddress” en la configuración de su Administrador de controladores y Programador. Aplique el parche siguiente a los nodos de controlplane en la generación del clúster; o, para ejecutar los nodos de Talos, ejecute `talosctl patch mc n &lt;controlplanenode1,controlplanenode2> patch @controlplanedatadogmonitoringpatch.yaml`.

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

Rancher v2.5 se basa en [PushProx][9] para exponer los puntos finales de las métricas del plano de control, esto permite al agente Datadog ejecutar comprobaciones del plano de control y recopilar métricas.

### Prerrequisitos

1. Instale el Datadog Agent con el [ranchermonitoring chart][10].
2. Los conjuntos de demonios `pushprox` se implementan con `ranchermonitoring` y se ejecutan en el espacio de nombres `cattlemonitoringsystem`.

### Servidor API

Para configurar la comprobación `kube_apiserver_metrics`, añada las siguientes anotaciones al servicio `default/kubernetes':

```yaml
annotations:
  ad.datadoghq.com/endpoints.check_names: '["kube_apiserver_metrics"]'
  ad.datadoghq.com/endpoints.init_configs: '[{}]'
  ad.datadoghq.com/endpoints.instances: '[{ "prometheus_url": "https://%%host%%:%%port%%/metrics", "bearer_token_auth": "true" }]'
```

### Agregar servicios de Kubernetes para configurar comprobaciones de Autodescubrimiento

Al agregar servicios de Kubernetes sin cabeza para definir configuraciones de comprobación, el Datadog Agent es capaz de dirigirse a los pods `pushprox` y recopilar métricas.

Aplicar `ranchercontrolplaneservices.yaml`:

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
{{% tab "Operador Datadog" %}}

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
{{% tab "Timón" %}}

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


## Kubernetes en Rancher Kubernetes Engine (antes de la versión 2.5) {#RKEBefore2_5}

### Servidor API, Administrador de controladores y Programador

Instale el Datadog Agent con el [ranchermonitoring chart][10].

Los componentes del plano de control se ejecutan en Docker fuera de Kubernetes. Dentro de Kubernetes, el servicio `kubernetes' en el espacio de nombres `por defecto' se dirige al nodo IP del plano de control. Puede confirmarlo ejecutando `$ kubectl describe endpoints kubernetes`.

Puede anotar este servicio con comprobaciones de puntos finales (administradas por el agente de clúster de Datadog) para supervisar el servidor API, el administrador de controladores y el programador:

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

Etcd se ejecuta en Docker fuera de Kubernetes, y se requieren certificados para comunicarse con el servicio Etcd. Los pasos sugeridos para configurar la supervisión de Etcd requieren acceso SSH a un nodo del plano de control que ejecuta Etcd.

1. SSH en el nodo del plano de control siguiendo la [documentación Rancher][9]. Confirme que Etcd se está ejecutando en un contenedor Docker con `$ docker ps` y, a continuación, utilice `$ docker inspect etcd` para encontrar la ubicación de los certificados utilizados en el comando run (`"Cmd"`), así como la ruta de host de las monturas.

Las tres banderas en el comando a buscar son:

```shell
--trusted-ca-file
--cert-file
--key-file
```

2. Utilizando la información de montaje disponible en la salida `$ docker inspect etcd`, establezca `volumens` y `volumeMounts` en la configuración del agente Datadog. También incluya tolerancias para que el agente Datadog pueda ejecutarse en los nodos del plano de control.

Los siguientes son ejemplos de cómo configurar el Datadog Agent con Helm y el Datadog Operator:


{{< tabs >}}
{{% tab "Operador Datadog" %}}

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
{{% tab "Timón" %}}

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


3. Configure un DaemonSet con un contenedor de pausa para ejecutar la comprobación Etcd en los nodos que ejecutan Etcd. Este DaemonSet se ejecuta en la red host para que pueda acceder al servicio Etcd. También tiene la configuración de comprobación y las tolerancias necesarias para ejecutarse en el nodo o nodos del plano de control. Asegúrese de que las rutas de acceso de los archivos de certificados montados coincidan con lo que ha configurado en su instancia y sustituya la parte `&lt;...>` en consecuencia.

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

Para implementar el DaemonSet y la configuración de comprobación, ejecute

```shell
kubectl apply -f <filename>
```


## Kubernetes sobre servicios gestionados (AKS, GKE) {#ManagedServices}

En otros servicios gestionados, como Azure Kubernetes Service (AKS) y Google Kubernetes Engine (GKE), el usuario no puede acceder a los componentes del plano de control. Como resultado, no es posible ejecutar las comprobaciones `kube_apiserver`, `kube_controller_manager`, `kube_scheduler` o `etcd' en estos entornos.


[1]: https://docs.datadoghq.com/es/integrations/kube_apiserver_metrics/
[2]: https://docs.datadoghq.com/es/integrations/etcd/?tab=containerized
[3]: https://docs.datadoghq.com/es/integrations/kube_controller_manager/
[4]: https://docs.datadoghq.com/es/integrations/kube_scheduler/
[5]: https://aws.github.io/awseksbestpractices/reliability/docs/controlplane/#monitorcontrolplanemetrics
[6]: https://docs.datadoghq.com/es/agent/cluster_agent/setup
[7]: https://docs.datadoghq.com/es/agent/cluster_agent/clusterchecks/
[8]: https://docs.datadoghq.com/es/agent/cluster_agent/endpointschecks/
[9]: https://ranchermanager.docs.rancher.com/howtoguides/newuserguides/manageclusters/nodesandnodepools
[10]: https://github.com/DataDog/helmcharts/blob/main/examples/datadog/agent_on_rancher_values.yaml
[11]: https://docs.aws.amazon.com/eks/latest/userguide/viewrawmetrics.html
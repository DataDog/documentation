---
app_id: openshift
categories:
- contenedores
- kubernetes
- recopilación de logs
- la red
- orquestación
- suministrar
custom_kind: integración
description: La plataforma de Kubernetes para grandes ideas
integration_version: 1.0.0
media: []
supported_os:
- linux
title: OpenShift
---
## Información general

Red Hat OpenShift es una plataforma de aplicaciones en contenedores de código abierto basada en el orquestador de contenedores de Kubernetes para el desarrollo y despliegue de aplicaciones empresariales.

> Este archivo README describe la configuración necesaria para permitir la recopilación de métricas específicas de OpenShift en el Agent. Los datos descritos aquí son recopilados por el [check de `kubernetes_apiserver`](https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/kubernetes_apiserver.d/conf.yaml.example). Debes configurar el check para recopilar las métricas de `openshift.*`.

## Configuración

### Instalación

Esta configuración central es compatible con OpenShift 3.11 y OpenShift 4, pero funciona mejor con OpenShift 4.

Para instalar el Agent, consulta las [instrucciones de instalación del Agent](https://docs.datadoghq.com/containers/kubernetes/installation) para obtener instrucciones generales de Kubernetes y la [página de distribución de Kubernetes](https://docs.datadoghq.com/containers/kubernetes/distributions/?tab=datadogoperator#Openshift) para obtener ejemplos de configuración de OpenShift.

Como alternativa, puede utilizarse el [Datadog Operator](https://github.com/DataDog/datadog-operator/) para instalar y gestionar el Datadog Agent. El Datadog Operator puede instalarse utilizando [OperatorHub](https://docs.openshift.com/container-platform/4.10/operators/understanding/olm-understanding-operatorhub.html) de OpenShift.

### Configuración de las restricciones del contexto de seguridad

Si estás desplegando el Datadog Agent utilizando cualquiera de los métodos vinculados en las instrucciones de instalación anteriores, debes incluir restricciones de contexto de seguridad (SCC) para el Agent y el Cluster Agent para recopilar datos. Sigue las instrucciones que se indican a continuación en relación con tu despliegue.

{{< tabs >}}

{{% tab "Operator" %}}

Para obtener instrucciones sobre cómo instalar el Datadog Operator y el recurso `DatadogAgent` en OpenShift, consulta la [Guía de instalación de OpenShift](https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md).

Si despliegas el Operator con Operator Lifecycle Manager (OLM), los SCC predeterminados necesarios de OpenShift se asocian automáticamente a la cuenta de servicio `datadog-agent-scc`. A continuación, puedes desplegar los componentes de Datadog con la CustomResourceDefinition `DatadogAgent`, haciendo referencia a esta cuenta de servicio en los pods del Node Agent y Cluster Agent.

Consulta la página [Distribuciones](https://docs.datadoghq.com/containers/kubernetes/distributions/?tab=datadogoperator#Openshift) y [el repositorio del Operator](https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-on-openshift.yaml) para ver más ejemplos.

{{% /tab %}}

{{% tab "Helm" %}}

Puedes crear el SCC directamente dentro de tu `values.yaml` del Datadog Agent. Añade los siguientes parámetros de bloque en la sección `agents` y `clusterAgent` para crear sus respectivos SCC.

```yaml
datadog:
  #(...)

agents:
  podSecurity:
    securityContextConstraints:
      create: true

clusterAgent:
  podSecurity:
    securityContextConstraints:
      create: true
```

Puedes aplicar esto cuando despliegues inicialmente el Agent, o puedes ejecutar un `helm upgrade` después de hacer este cambio para aplicar el SCC.

Consulta la página de [Distribuciones](https://docs.datadoghq.com/containers/kubernetes/distributions/?tab=datadogoperator#Openshift) y el [repositorio de Helm](https://github.com/DataDog/helm-charts/blob/main/examples/datadog/agent_on_openshift_values.yaml) para más ejemplos.

{{% /tab %}}

{{% tab "Daemonset" %}}

En función de tus necesidades y de las [restricciones de seguridad](https://docs.openshift.com/enterprise/3.0/admin_guide/manage_scc.html) de tu clúster, se admiten tres escenarios de despliegue:

- [Operaciones SCC restringidas](#restricted-scc-operations)
- [Operaciones SCC de red de host](#host)
- [SCC de Datadog personalizado para todas las funciones](#custom-datadog-scc-for-all-features)

| Restricciones del contexto de seguridad   | [Restringido](#restricted-scc-operations) | [Red de host](#host) | [Personalizado](#custom-datadog-scc-for-all-features) |
|--------------------------------|------------------------------------------|-----------------------|------------------------------------------------|
| Monitorización de la capa de Kubernetes    | Compatible                                | Compatible             | Compatible                                             |
| Autodiscovery basado en Kubernetes | Compatible                                | Compatible             | Compatible                                             |
| Entrada de DogStatsD               | No compatible                            | Compatible             | Compatible                                             |
| Entrada de trazas de APM               | No compatible                            | Compatible             | Compatible                                             |
| Entrada de red de logs            | No compatible                            | Compatible             | Compatible                                             |
| Métricas de red de host           | No compatible                            | Compatible             | Compatible                                             |
| Monitorización de la capa de Docker        | No compatible                            | No compatible         | Compatible                                             |
| Recopilación de logs de contenedor      | No compatible                            | No compatible         | Compatible                                             |
| Monitorización de contenedores en directo      | No compatible                            | No compatible         | Compatible                                             |
| Monitorización de Live Process        | No compatible                            | No compatible         | Compatible                                             |

#### Operaciones restringidas de SCC

Este modo no requiere conceder permisos especiales al [DaemonSet del `datadog-agent`](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/), aparte de los permisos [RBAC](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions) necesarios para acceder al kubelet y al servidor de la API. Puedes empezar con esta [plantilla solo de kubelet](https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/agent-kubelet-only.yaml).

El método de ingesta recomendado para DogStatsD, APM y logs consiste en vincular el Datadog Agent a un puerto de host. De esta forma, la IP de destino es constante y fácilmente detectable por tus aplicaciones. La SCC por defecto de OpenShift no permite la vinculación al puerto de host. Puedes configurar el Agent para que escuche en su propia IP, pero tendrás que gestionar la detección de esa IP desde tu aplicación.

El Agent permite trabajar en un modo de ejecución de `sidecar`, para habilitar la ejecución del Agent en el pod de tu aplicación para facilitar la detección.

#### Host

Añade el permiso `allowHostPorts` al pod con el SCC estándar `hostnetwork` o `hostaccess`, o creando uno propio. En este caso, puedes añadir los enlaces de puerto relevantes en las especificaciones de tu pod:

```yaml
ports:
  - containerPort: 8125
    name: dogstatsdport
    protocol: UDP
  - containerPort: 8126
    name: traceport
    protocol: TCP
```

{{% /tab %}}

{{< /tabs >}}

#### SCC personalizado de Datadog para todas las funciones

El Helm Chart y Datadog Operator gestionan el SCC por ti de forma predeterminada. Para gestionarlo tú mismo en su lugar, asegúrate de incluir las configuraciones correctas en función de las características que hayas habilitado.

Si SELinux está en modo permisivo o deshabilitado, habilita el SCC `hostaccess` para beneficiarte de todas las características.
Si SELinux está en modo enforcing, se recomienda conceder [el tipo `spc_t`](https://developers.redhat.com/blog/2014/11/06/introducing-a-super-privileged-container-concept) al pod del datadog-agent. Para desplegar el Agent puedes utilizar el siguiente [SCC de datadog-agent](https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml) que puede aplicarse después de [crear la cuenta de servicio del datadog-agent](https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions). Concede los siguientes permisos:

- `allowHostPorts: true`: vincula las entradas de DogStatsD/APM/logs a la IP del nodo.
- `allowHostPID: true`: activa la Detección de origen para las métricas de DogStatsD enviadas por Unix Socket.
- `volumes: hostPath`: accede al socker de Docker y a las carpetas `proc` y `cgroup` de host, para la recopilación de métricas.
- `SELinux type: spc_t`: accede al socket de Docker y a las carpetas `proc` y `cgroup` de todos los procesos, para la recopilación de métricas. Ver [Introducing a Super Privileged Container Concept](https://developers.redhat.com/blog/2014/11/06/introducing-a-super-privileged-container-concept) para más detalles.

<div class="alert alert-info">
No olvides añadir una <a href="https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions">cuenta de servicio datadog-agent</a> a un <a href="https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml">SCC datadog-agent</a> recientemente creado al añadir <code>system:serviceaccount:<datadog-agent namespace>:<datadog-agent service account name></code> a la sección <code>usuarios</code>.
</div>

<div class="alert alert-warning">
<b>OpenShift 4.0+</b>: Si has utilizado el instalador de OpenShift en un proveedor de nube compatible, debes desplegar el SCC con <code>allowHostNetwork: true</code> en el manifiesto <code>scc.yaml</code>, así como <code>hostNetwork: true</code> en la configuración del Agent para obtener etiquetas (tags) de host y alias. Por lo demás, el acceso a los servidores de metadatos desde la red de pod está restringido.
</div>

**Nota**: El socket de Docker es propiedad del grupo raíz, por lo que es posible que tengas que elevar los privilegios del Agent para obtener métricas de Docker. Para ejecutar el proceso del Agent como usuario raíz, puedes configurar tu SCC con lo siguiente:

```yaml
runAsUser:
  type: RunAsAny
```

### Recopilación de logs

La recopilación de logs del Datadog Agent se configura en OpenShift en gran medida igual que otros clústeres de Kubernetes. El Datadog Operator y Helm Chart se montan en el directorio `/var/log/pods`, que el pod de Datadog Agent utiliza para monitorizar los logs de los pods y contenedores en sus respectivos hosts. Sin embargo, con el Datadog Operator, es necesario aplicar opciones de SELinux adicionales para dar al Agent permisos para leer estos archivos de log.

Consulta la [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset) para obtener más información general y la página [Distribuciones](https://docs.datadoghq.com/containers/kubernetes/distributions/?tab=datadogoperator#Openshift) para ver ejemplos de configuración.

### APM

En Kubernetes, hay tres opciones principales para enrutar los datos desde el pod de aplicación al pod del Datadog Agent: el Unix Domain Socket (UDS), la opción HostIP:HostPort (TCP/IP) y el servicio de Kubernetes. El Datadog Operator y Helm Chart utilizan por defecto la opción de UDS por ser la más eficiente en cuanto a recursos. Sin embargo, esta opción no funciona bien en OpenShift, ya que requiere opciones elevadas de SCC y SELinux, tanto en el pod del Agent como en el pod de aplicaciones.

Datadog recomienda deshabilitar la opción de UDS explícitamente para evitar esto y para evitar que el Admission Controller (Controlador de admisión) inyecte esta configuración.

Consulta [recopilación de APM y trazas de Kubernetes](https://docs.datadoghq.com/containers/kubernetes/apm) para más información general y la página [Distribuciones](https://docs.datadoghq.com/containers/kubernetes/distributions/?tab=datadogoperator#Openshift) para ejemplos de configuración.

### Validación

Consulta [kubernetes_apiserver](https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/kubernetes_apiserver.d/conf.yaml.example)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **openshift.appliedclusterquota.cpu.limit** <br>(gauge) | Límite fijo para cpu por cuota de recursos de clúster y espacio de nombres<br>_Se muestra como cpu_ |
| **openshift.appliedclusterquota.cpu.remaining** <br>(gauge) | Cpu disponible restante por cuota de recursos de clúster y espacio de nombres<br>_Se muestra como cpu_ |
| **openshift.appliedclusterquota.cpu.used** <br>(gauge) | Uso de cpu observado por cuota de recursos de clúster y espacio de nombres<br>_Se muestra como cpu_ |
| **openshift.appliedclusterquota.memory.limit** <br>(gauge) | Límite fijo de memoria por cuota de recursos de clúster y espacio de nombres<br>_Se muestra como byte_ |
| **openshift.appliedclusterquota.memory.remaining** <br>(gauge) | Memoria disponible restante por cuota de recursos de clúster y espacio de nombres<br>_Se muestra como byte_ |
| **openshift.appliedclusterquota.memory.used** <br>(gauge) | Uso de memoria observado por cuota de recursos de clúster y espacio de nombres<br>_Se muestra como byte_ |
| **openshift.appliedclusterquota.persistentvolumeclaims.limit** <br>(gauge) | Límite fijo para reclamaciones de volúmenes persistentes por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.persistentvolumeclaims.remaining** <br>(gauge) | Reclamaciones de volúmenes persistentes disponibles por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.persistentvolumeclaims.used** <br>(gauge) | Uso observado de reclamaciones de volumen persistente por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.pods.limit** <br>(gauge) | Límite fijo para pods por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.pods.remaining** <br>(gauge) | Pods disponibles por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.pods.used** <br>(gauge) | Uso de pods observado por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.services.limit** <br>(gauge) | Límite fijo para servicios por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.services.loadbalancers.limit** <br>(gauge) | Límite fijo para equilibradores de carga de servicios por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.services.loadbalancers.remaining** <br>(gauge) | Equilibradores de carga de servicios disponibles por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.services.loadbalancers.used** <br>(gauge) | Uso observado de los equilibradores de carga de servicios por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.services.nodeports.limit** <br>(gauge) | Límite fijo para puertos de nodo de servicio por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.services.nodeports.remaining** <br>(gauge) | Puertos de nodo de servicio disponibles por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.services.nodeports.used** <br>(gauge) | Uso observado de puertos de nodos de servicio por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.services.remaining** <br>(gauge) | Servicios disponibles restantes por cuota de recursos de clúster y espacio de nombres|
| **openshift.appliedclusterquota.services.used** <br>(gauge) | Utilización de servicios observada por cuota de recursos de clúster y espacio de nombres|
| **openshift.clusterquota.cpu.limit** <br>(gauge) | Límite fijo de cpu por cuota de recursos de clúster para todos los espacios de nombres<br>_Se muestra como cpu_ |
| **openshift.clusterquota.cpu.remaining** <br>(gauge) | Cpu disponible restante por cuota de recursos de clúster para todos los espacios de nombres<br>_Se muestra como cpu_ |
| **openshift.clusterquota.cpu.requests.used** <br>(gauge) | Uso de cpu observado por recurso de clúster para solicitud|
| **openshift.clusterquota.cpu.used** <br>(gauge) | Uso de cpu observado por cuota de recursos de clúster para todos los espacios de nombres<br>_Se muestra como cpu_ |
| **openshift.clusterquota.memory.limit** <br>(gauge) | Límite fijo de memoria por cuota de recursos de clúster para todos los espacios de nombres<br>_Se muestra como byte_ |
| **openshift.clusterquota.memory.remaining** <br>(gauge) | Memoria disponible restante por cuota de recursos de clúster para todos los espacios de nombres<br>_Se muestra como byte_ |
| **openshift.clusterquota.memory.used** <br>(gauge) | Uso de memoria observado por cuota de recursos de clúster para todos los espacios de nombres<br>_Se muestra como byte_ |
| **openshift.clusterquota.persistentvolumeclaims.limit** <br>(gauge) | Límite fija para las reclamaciones de volúmenes persistentes por cuota de recursos de clúster para todos los espacios de nombres.|
| **openshift.clusterquota.persistentvolumeclaims.remaining** <br>(gauge) | Reclamaciones de volumen persistente disponibles restantes por cuota de recursos de clúster para todos los espacios de nombres.|
| **openshift.clusterquota.persistentvolumeclaims.used** <br>(gauge) | Uso de reclamaciones de volumen persistente observado por cuota de recursos de clúster para todos los espacios de nombres|
| **openshift.clusterquota.pods.limit** <br>(gauge) | Límite duro para pods por cuota de recursos de clúster para todos los espacios de nombres|
| **openshift.clusterquota.pods.remaining** <br>(gauge) | Pods disponibles restantes por cuota de recursos de clúster para todos los espacios de nombres|
| **openshift.clusterquota.pods.used** <br>(gauge) | Uso de pods observado por cuota de recursos de clúster para todos los espacios de nombres|
| **openshift.clusterquota.services.limit** <br>(gauge) | Límite fijo para servicios por cuota de recursos de clúster para todos los espacios de nombres|
| **openshift.clusterquota.services.loadbalancers.limit** <br>(gauge) | Límite fijo para los equilibradores de carga de servicios por cuota de recursos de clúster para todos los espacios de nombres.|
| **openshift.clusterquota.services.loadbalancers.remaining** <br>(gauge) | Equilibradores de carga de servicio disponibles restantes por cuota de recursos de clúster para todos los espacios de nombres.|
| **openshift.clusterquota.services.loadbalancers.used** <br>(gauge) | Uso observado de los equilibradores de carga de servicios por cuota de recursos de clúster para todos los espacios de nombres|
| **openshift.clusterquota.services.nodeports.limit** <br>(gauge) | Límite fijo para puertos de nodo de servicio por cuota de recursos de clúster para todos los espacios de nombres.|
| **openshift.clusterquota.services.nodeports.remaining** <br>(gauge) | Puertos de nodo de servicio disponibles restantes por cuota de recursos de clúster para todos los espacios de nombres|
| **openshift.clusterquota.services.nodeports.used** <br>(gauge) | Uso observado de puertos de nodo de servicio por cuota de recursos de clúster para todos los espacios de nombres|
| **openshift.clusterquota.services.remaining** <br>(gauge) | Servicios disponibles restantes por cuota de recursos de clúster para todos los espacios de nombres|
| **openshift.clusterquota.services.used** <br>(gauge) | Utilización de servicios observada por cuota de recursos de clúster para todos los espacios de nombres|

### Eventos

El check de OpenShift no incluye ningún evento.

### Checks de servicio

El check de OpenShift no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).
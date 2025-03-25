---
app_id: openshift
app_uuid: e92e309f-7bdc-4ff4-91d4-975497526325
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - openshift.clusterquota.cpu.requests.used
      - openshift.clusterquota.cpu.used
      metadata_path: metadata.csv
      prefix: openshift.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10024
    source_type_name: OpenShift
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- contenedores
- kubernetes
- recopilación de logs
- la red
- orquestación
- suministrar
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openshift/README.md
display_on_public_website: true
draft: false
git_integration_title: openshift
integration_id: openshift
integration_title: OpenShift
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: openshift
public_title: OpenShift
short_description: La plataforma de Kubernetes para grandes ideas
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Network
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: La plataforma de Kubernetes para grandes ideas
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OpenShift
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

Red Hat OpenShift es una plataforma de aplicaciones en contenedores de código abierto basada en el orquestador de contenedores de Kubernetes para el desarrollo y despliegue de aplicaciones empresariales.

> Este README describe la configuración necesaria para permitir la recopilación de métricas específicas de OpenShift en el Agent. Los datos aquí descritos son recopilados por el check de [`kubernetes_apiserver`][1]. Debes configurar el check para recopilar las métricas `openshift.*`.

## Configuración

### Instalación

Esta configuración central es compatible con OpenShift 3.11 y OpenShift 4, pero funciona mejor con OpenShift 4.

Para instalar el Agent, consulta las [instrucciones de instalación del Agent][2] para obtener instrucciones generales de Kubernetes y la [página de distribuciones de Kubernetes][3] para obtener ejemplos de la configuración de OpenShift.

Como alternativa, puede utilizarse [Datadog Operator][4] para instalar y gestionar el Datadog Agent. El Datadog Operator puede instalarse mediante el [OperatorHub][5] de OpenShift.

### Configuración de las restricciones del contexto de seguridad

Si estás desplegando el Datadog Agent utilizando cualquiera de los métodos vinculados en las instrucciones de instalación anteriores, debes incluir restricciones de contexto de seguridad (SCC) para el Agent y el Cluster Agent para recopilar datos. Sigue las instrucciones que se indican a continuación en relación con tu despliegue.

{{< tabs >}}
{{% tab "Operator" %}}

Para obtener instrucciones sobre cómo instalar el Datadog Operator y el recurso `DatadogAgent` en OpenShift, consulta la [Guía de instalación de OpenShift][1].

Si despliegas el Operator con Operator Lifecycle Manager (OLM), los SCC predeterminados necesarios de OpenShift se asocian automáticamente a la cuenta de servicio `datadog-agent-scc`. A continuación, puedes desplegar los componentes de Datadog con la CustomResourceDefinition `DatadogAgent`, haciendo referencia a esta cuenta de servicio en los pods del Node Agent y Cluster Agent.

Consulta la página [Distribuciones][2] y el [repositorio del Operator][3] para ver más ejemplos.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md
[2]: https://docs.datadoghq.com/es/containers/kubernetes/distributions/?tab=datadogoperator#Openshift
[3]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-on-openshift.yaml
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

Consulta la página [Distribuciones][1] y el [repositorio de Helm][2] para más ejemplos.

[1]: https://docs.datadoghq.com/es/containers/kubernetes/distributions/?tab=datadogoperator#Openshift
[2]: https://github.com/DataDog/helm-charts/blob/main/examples/datadog/agent_on_openshift_values.yaml
{{% /tab %}}
{{% tab "Daemonset" %}}

Según tus necesidades y las [restricciones de seguridad][1] de tu clúster, se admiten tres escenarios de despliegue:

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

Este modo no requiere conceder permisos especiales al [DaemonSet del `datadog-agent`][2], aparte de los permisos [RBAC][3] necesarios para acceder al kubelet y al APIserver. Puedes empezar con esta [plantilla kubelet-only][4].

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

[1]: https://docs.openshift.com/enterprise/3.0/admin_guide/manage_scc.html
[2]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/
[3]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions
[4]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/agent-kubelet-only.yaml
{{% /tab %}}
{{< /tabs >}}

#### SCC personalizado de Datadog para todas las funciones

El Helm Chart y Datadog Operator gestionan el SCC por ti de forma predeterminada. Para gestionarlo tú mismo en su lugar, asegúrate de incluir las configuraciones correctas en función de las características que hayas habilitado.

Si SELinux está en modo permisivo o deshabilitado, habilita el SCC `hostaccess` para beneficiarte de todas las características.
Si SELinux está en modo obligatorio, es recomendado conceder [el tipo `spc_t`][6] al pod datadog-agent. Para desplegar el Agent, puedes utilizar el siguiente [SCC datadog-agent][7] que se puede aplicar después de [crear la cuenta de servicio datadog-agent][8]. Concede los siguientes permisos:

- `allowHostPorts: true`: vincula las entradas de DogStatsD/APM/logs a la IP del nodo.
- `allowHostPID: true`: activa la Detección de origen para las métricas de DogStatsD enviadas por Unix Socket.
- `volumes: hostPath`: accede al socker de Docker y a las carpetas `proc` y `cgroup` de host, para la recopilación de métricas.
- `SELinux type: spc_t`: accede al socket de Docker y a las carpetas `proc` y `cgroup` de todos los procesos, para la recopilación de métricas. Consulta [Introducción al concepto de Contenedor con súper privilegios][6] para más detalles.

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

Consulta [Recopilación de logs de Kubernetes][9] para obtener más información general y la página [Distribuciones][3] para ver ejemplos de configuración.

### APM

En Kubernetes, hay tres opciones principales para enrutar los datos desde el pod de aplicación al pod del Datadog Agent: el Unix Domain Socket (UDS), la opción HostIP:HostPort (TCP/IP) y el servicio de Kubernetes. El Datadog Operator y Helm Chart utilizan por defecto la opción de UDS por ser la más eficiente en cuanto a recursos. Sin embargo, esta opción no funciona bien en OpenShift, ya que requiere opciones elevadas de SCC y SELinux, tanto en el pod del Agent como en el pod de aplicaciones.

Datadog recomienda deshabilitar la opción de UDS explícitamente para evitar esto y para evitar que el Admission Controller (Controlador de admisión) inyecte esta configuración.

Consulta [Recopilación de trazas, APM de Kubernetes][10] para más información general y la página [Distribuciones][3] para ver ejemplos de configuración.

### Validación

Ver [kubernetes_apiserver][1]

## Datos recopilados

### Métricas
{{< get-metrics-from-git "openshift" >}}


### Eventos

El check de OpenShift no incluye ningún evento.

### Checks de servicio

El check de OpenShift no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].


[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/kubernetes_apiserver.d/conf.yaml.example
[2]: https://docs.datadoghq.com/es/containers/kubernetes/installation
[3]: https://docs.datadoghq.com/es/containers/kubernetes/distributions/?tab=datadogoperator#Openshift
[4]: https://github.com/DataDog/datadog-operator/
[5]: https://docs.openshift.com/container-platform/4.10/operators/understanding/olm-understanding-operatorhub.html
[6]: https://developers.redhat.com/blog/2014/11/06/introducing-a-super-privileged-container-concept
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml
[8]: https://docs.datadoghq.com/es/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions
[9]: https://docs.datadoghq.com/es/agent/kubernetes/log/?tab=daemonset
[10]: https://docs.datadoghq.com/es/containers/kubernetes/apm
[11]: https://docs.datadoghq.com/es/help/
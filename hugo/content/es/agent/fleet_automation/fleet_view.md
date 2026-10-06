---
description: Visualice e inspeccione los Datadog Agents y OpenTelemetry Collectors
  en toda su flota.
further_reading:
- link: /agent/fleet_automation/
  tag: Documentación
  text: Fleet Automation
- link: /agent/troubleshooting/send_a_flare/
  tag: Documentación
  text: Envíe un flare
- link: /containers/kubernetes/installation/
  tag: Documentación
  text: Instale el Datadog Agent en Kubernetes
title: Fleet View
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
Fleet View está en versión preliminar en los sitios de Datadog Government (US1-FED y US2-FED).<br><br>
La funcionalidad adicional de Fleet Automation, como configurar Agents, actualizar Agents y actualizar SDKs, no es compatible con el sitio de Datadog seleccionado ({{< region-param key=dd_site_name >}}).
</div>
{{< /site-region >}}

Utilice [Fleet View][1] para obtener información sobre las brechas de observabilidad en sus servidores, Agents u OTel Collectors desactualizados, y Agents con problemas de integración.

Para cada Datadog Agent, puede ver:
- La versión del Agent
- Si el Agent tiene integraciones sin configurar o mal configuradas
- Los servicios que el Agent está monitoreando
- El estado de Remote Configuration del Agent
- Los productos que están habilitados en el Agent
- Eventos de Audit Trail del Agent, incluidos cambios de configuración, actualizaciones y flares

Para cada OTel Collector, puede ver:
- La versión del Collector
- La distribución del Collector
- El YAML de configuración del Collector
- Vistas de canalización y topología del Collector

## Requisitos previos {#prerequisites}

- La vista de configuración está habilitada de forma predeterminada para Agents y OTel Collectors con la versión 7.47.0 y posteriores. Para habilitarlo manualmente en versiones anteriores, establezca `inventories_configuration_enabled` en `true` en su [archivo de configuración del Datadog Agent][3], o utilice la variable de entorno `DD_INVENTORIES_CONFIGURATION_ENABLED`.
- La configuración de integración del Datadog Agent está habilitada de forma predeterminada en la versión 7.49.0 del Datadog Agent o posterior. Para habilitarlo manualmente en versiones anteriores, establezca `inventories_checks_configuration_enabled` en `true` en su [archivo de configuración del Datadog Agent][3], o utilice la variable de entorno `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

<div class="alert alert-info">Fleet Automation requiere la <a href="/opentelemetry/integrations/datadog_extension/#setup">Datadog Extension</a> para mostrar la configuración, las canalizaciones y la topología del OpenTelemetry Collector. Configure la extensión antes de utilizar las funciones del OTel Collector descritas en esta página.</div>

## Examine un Datadog Agent o un OpenTelemetry Collector {#examine-a-datadog-agent-or-opentelemetry-collector}

Seleccione un Datadog Agent o un OTel Collector para visualizar su configuración, integraciones conectadas, eventos de auditoría y una pestaña de soporte para enviar un flare remoto.

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="El panel de detalles del Agente que muestra la configuración, las integraciones conectadas y los eventos de auditoría." style="width:100%;" >}}

## Buscar y filtrar {#search-and-filter}

Utilice la barra de búsqueda en la parte superior de Fleet View para encontrar Agentes, colectores OTel o clústeres específicos en toda su flota. Usted puede:

- Realice una búsqueda de texto libre por nombre de servidor o nombre de clúster
- Filtre por etiquetas de servidor y de Agent, como sistema operativo, entorno (`env`), equipo y productos habilitados (`products_enabled`)

## Visualice las canalizaciones OTel {#visualize-otel-pipelines}

La pestaña {{< ui >}}Configuration{{< /ui >}} para un colector OTel incluye vistas de {{< ui >}}Pipeline{{< /ui >}} y {{< ui >}}Topology{{< /ui >}}. Estas vistas proporcionan visibilidad de extremo a extremo sobre cómo fluye la telemetría a través de sus canalizaciones OTel.

Para acceder a estas vistas:

1. Navegue a [**Fleet Automation**][1].
1. Filtre por OTel Collectors.
1. Seleccione un colector para abrir el panel de detalles.
1. Haga clic en la pestaña {{< ui >}}Configuration{{< /ui >}}.
1. Seleccione {{< ui >}}Pipeline{{< /ui >}} o {{< ui >}}Topology{{< /ui >}} de las {{< ui >}}View as{{< /ui >}} opciones.

### Vista de canalización {#pipeline-view}

La vista {{< ui >}}Pipeline{{< /ui >}} muestra la canalización de telemetría para un solo OTel Collector. Utilice la vista de canalización para:

- Valide el enrutamiento de telemetría entre receptores, procesadores y exportadores configurados.
- Identifique problemas de flujo de datos, como pérdidas de datos y cuellos de botella, activando el interruptor {{< ui >}}Show traffic{{< /ui >}}.
- Investigue alertas de canalización examinando las alertas de monitoreo activas que aparecen en los nodos de los componentes.

{{< img src="/agent/fleet_automation/fleet-automation-pipeline-view.png" alt="Vista de canalización que muestra el enrutamiento de telemetría entre los componentes de OTel Collector." style="width:100%;" >}}

### Vista de topología {#topology-view}

La vista {{< ui >}}Topology{{< /ui >}} muestra la cadena de reenvío a través de los OTel Collectors implementados como DaemonSets y gateways. Utilice la vista de topología para:

- Valide el enrutamiento de telemetría a través de los Collectors en una arquitectura de DaemonSet a gateway.
- Detecte pérdidas de datos y cuellos de botella activando el interruptor {{< ui >}}Show traffic{{< /ui >}} para superponer las tasas de flujo de datos en cada borde.
- Investigue problemas de canalización examinando las alertas de monitoreo activas que aparecen en los nodos del Collector.

{{< img src="/agent/fleet_automation/fleet-automation-gateway-topology.png" alt="Vista de topología que muestra los Collectors de DaemonSet reenviando a través de los Collectors de gateway hacia Datadog." style="width:100%;" >}}

## Visualizar eventos de Audit Trail del Agente {#view-agent-audit-trail-events}

La pestaña {{< ui >}}Audit Events{{< /ui >}} muestra los eventos de Audit Trail asociados con el Agent seleccionado.
Utilice esta pestaña para:
- Identificar cambios de configuración, actualizaciones de clave de API, instalaciones, actualizaciones y flares de soporte
- Determinar cuándo y dónde se realizaron los cambios

La visibilidad de los eventos de Audit Trail depende de su plan. Cuando Audit Trail está habilitado en su organización, puede visualizar los eventos del Agent durante un máximo de 90 días según la configuración de retención de su Audit Trail. Si Audit Trail no está habilitado en su organización, puede visualizar los eventos de las últimas 24 horas.

## Envíe una señal remota {#send-a-remote-flare}

Puede enviar una señal desde el Datadog Agent o el DDOT Collector después de habilitar Remote Configuration en el Agent. Para obtener instrucciones, consulte [Enviar una señal desde el sitio de Datadog][2].

Cuando se comunica con el soporte de Datadog con Remote Configuration habilitado, el equipo de soporte puede iniciar una señal desde su entorno para ayudar a resolver su problema más rápido.

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="La pestaña de soporte para un Agent con el botón Enviar señal." style="width:100%;" >}}

## Vista de Kubernetes {#kubernetes-view}

La vista de Kubernetes le permite ver los Datadog Agents y los OTel Collectors que se ejecutan en entornos de Kubernetes. Proporciona una vista unificada de su flota en toda la infraestructura basada en servidores y en contenedores.

De forma predeterminada, Fleet View enumera la infraestructura como servidores individuales. Utilice el interruptor {{< ui >}}View by infra type{{< /ui >}} para cambiar a la [vista de Kubernetes][4], que muestra los Agent por clúster de Kubernetes en su lugar.

Cada fila es un clúster administrado por el Datadog Operator [5] o el Helm chart. Los Node Agents, el Cluster Agent y los Cluster Check Runners del clúster aparecen agrupados en lugar de como servidores individuales.

### Requisitos previos para la vista de Kubernetes {#prerequisites-for-kubernetes-view}

La mayoría de las funciones de la vista de Kubernetes están disponibles sin requisitos de versión. Las capacidades específicas requieren:

| Capacidad | Requisito |
|---|---|
| View `DatadogAgent` configuración | Datadog Operator v1.24 o posterior |
| View Helm Chart values | Datadog Helm Chart v3.157.0 o posterior |
| Editar configuración | [Remote Configuration][6] habilitado y Datadog Operator v1.27 o posterior |
| Editar configuración sin establecer un nombre de clúster | Datadog Operator v1.30.0 o posterior |
| Visualizar integraciones en un Cluster Agent | Agent v7.72.0 o posterior |
| Visualizar estado de integración en un Cluster Agent | Agent v7.79.0 o posterior |

Para editar la configuración desde Fleet View, establezca las siguientes flags en su [configuración del Operator][7]: `remoteConfigEnabled`, `remoteUpdatesEnabled` y `createControllerRevisions`. La edición también requiere que se configure una clave de Datadog API y una clave de aplicación. No se admite la edición de valores de Helm Chart desde Fleet View.

En versiones de Datadog Operator anteriores a la v1.30.0, también debe establecer un nombre de clúster (`clusterName`), de lo contrario, el botón {{< ui >}}Edit{{< /ui >}} permanece deshabilitado. A partir de Datadog Operator v1.30.0, el nombre del clúster es opcional.

Si instala Datadog Operator con su Helm chart, puede habilitar las flags requeridas juntas usando el valor `previewFleetRollouts`:

{{< code-block lang="shell" >}}
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm upgrade --install datadog-operator datadog/datadog-operator \
  --set previewFleetRollouts=true \
  --set apiKeyExistingSecret=datadog-secret \
  --set appKeyExistingSecret=datadog-secret \
  --devel
{{< /code-block >}}

Reemplace `datadog-secret` con el nombre del Secret de Kubernetes que contiene sus claves de Datadog API y de aplicación. La flag `--devel` instala la versión de desarrollo más reciente del chart.

### Visualizar clústeres de Kubernetes {#view-kubernetes-clusters}

Los clústeres se enumeran alfabéticamente por nombre de clúster. La tabla enumera el nombre de cada clúster, el método de implementación (Datadog Operator o Helm), el namespace, la versión del Agent, el estado del pod del Agent, la disponibilidad, la antigüedad y el número de reinicios.

Para encontrar un clúster específico, puede [buscar](#search-and-filter) por nombre de clúster.

Haga clic en un clúster para ver:

- Detalles del clúster, como el entorno y las etiquetas
- Agents a nivel de clúster (Cluster Agent y Cluster Check Runners)
- Node Agents

En la pestaña {{< ui >}}Configuration{{< /ui >}}, puede visualizar la configuración:

- **Datadog Operator v1.24 o posterior**: vea la configuración del recurso personalizado `DatadogAgent`. Con Datadog Operator v1.27 o posterior, también puede editar la configuración desde esta pestaña.
- **Datadog Helm Chart v3.157.0 o posterior**: vea los valores del Helm Chart (`values.yaml`).

### Limitaciones {#limitations}

En comparación con la vista predeterminada, la vista de Kubernetes tiene las siguientes limitaciones:

- No puede enviar flares de soporte remoto.
- Puede ver cuáles OTel Collectors se están ejecutando, pero no puede ver su configuración en la vista de Kubernetes.
- El acceso a la API de Fleet Automation no está disponible.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /es/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[3]: /es/agent/configuration/agent-configuration-files/
[4]: https://app.datadoghq.com/fleet?view_by=clusters
[5]: /es/containers/datadog_operator
[6]: /es/agent/guide/setup_remote_config
[7]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
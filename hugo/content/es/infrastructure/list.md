---
aliases:
- /es/hostnames
- /es/graphing/infrastructure/list/
further_reading:
- link: /infrastructure/hostmap/
  tag: Documentación
  text: Mapa de servidores
- link: /infrastructure/livecontainers/
  tag: Documentación
  text: Mapa de contenedores
- link: /infrastructure/process/
  tag: Documentación
  text: Monitoreo de procesos en tiempo real
title: Lista de servidores
---
## Descripción general {#overview}

La lista de servidores le ofrece un inventario en tiempo real de todos los servidores que reportan a Datadog a través del Agent o integraciones en la nube. De forma predeterminada, muestra los servidores con actividad en los últimos 15 minutos. Para abrir la lista de servidores, navegue a [**Infraestructura > Servidores**][10] en Datadog.

Esta página describe la vista **New** de la lista de servidores. Para cambiar a la vista **Legacy**, utilice el interruptor en la esquina superior derecha.

{{< img src="infrastructure/index/infra-list-overview-2.png" alt="La lista de servidores con un panel de filtros a la izquierda y una lista de servidores con columnas personalizables." style="width:100%;">}}

**Nota**: Esta lista no debe utilizarse para estimar la facturación de servidores de su infraestructura. Consulte la página de [facturación][11] para obtener más detalles.

## Filtrar y buscar {#filter-and-search}

Utilice el panel de filtros a la izquierda para restringir la lista de servidores:

- **Teams**: Utilice el [filtro de equipo][19] para mostrar solo los servidores asociados con los Teams que seleccione.
- **Filtros rápidos**: Utilice las casillas de verificación en la parte superior del panel para filtrar por proveedor de nube (AWS, Azure, Google Cloud, Oracle o Alibaba Cloud), fuente de telemetría (Datadog Agent u OpenTelemetry), sistema operativo (Windows, Linux o Darwin) o hardware (GPU).
- **Filtrar métricas**: Seleccione una métrica y defina un rango de valores para filtrar los servidores por valor de métrica.
- **Facetas de búsqueda**: Filtre por cualquier propiedad o etiqueta de servidor, como proveedor de nube, entorno, región, tipo de recurso, tipo de instancia, sistema operativo, versión del sistema operativo, Agent o versión de Docker.

También puede utilizar el cuadro de búsqueda en la parte superior de la lista para filtrar servidores mediante la [sintaxis de búsqueda de Datadog][16].

## Personalizar columnas {#customize-columns}

Para agregar, eliminar o reordenar columnas, haga clic en **Columnas** sobre la Lista de servidores. Puede agregar cualquiera de los siguientes elementos como columna:

- **Atributos del servidor**: Propiedades del servidor, como el nombre del servidor o el estado.
- **Etiquetas**: Cualquier etiqueta aplicada al servidor.
- **Métricas**: Cualquier métrica reportada por el servidor.

Para reordenar una columna, arrástrela a una nueva posición. Para cambiar el tamaño, arrastre su borde derecho. Para ocultar, desactívela.

{{< img src="infrastructure/index/infra-list-columns.png" alt="El panel de personalización de columnas con secciones para Atributos del servidor, Etiquetas y Métricas, y interruptores para mostrar u ocultar cada columna." style="width:100%;">}}

### Columnas combinadas {#combined-columns}

La lista de servidores incluye tres columnas que combinan múltiples puntos de datos:

- **Configurations**: El proveedor de nube, el sistema operativo y el estado de instalación del Datadog Agent para cada servidor.
- **Software**: El servidor web, la base de datos, el caché y el orquestador de contenedores del servidor (como Docker o Kubernetes), si se detectan.
- **Integrations**: Las integraciones del Datadog Agent habilitadas en el servidor.

## Vistas guardadas {#saved-views}

Para guardar su configuración de filtros y columnas, abra el panel **Views** en la esquina superior izquierda y haga clic en **Save as new view**. Desde este panel, puede filtrar, ordenar, editar y marcar como favorita las vistas guardadas.

{{< img src="infrastructure/index/infra-list-views.png" alt="El panel de Vistas con opciones para guardar, filtrar, ordenar y editar vistas guardadas." style="width:40%;">}}

## Inspeccionar un servidor {#inspect-a-host}

Haga clic en cualquier servidor para abrir su panel de detalles, que es el mismo panel lateral utilizado por el [Resource Catalog][15]. El panel incluye:

- [Hostnames and aliases](/agent/faq/how-datadog-agent-determines-the-hostname/#host-aliases)
- [Tags][2]
- [Metrics][3]
- [Containers][4]
- [Logs][5] (si está habilitado)
- [Agent configuration](#agent-configuration) (si está habilitado)
- [OpenTelemetry Collector configuration](#opentelemetry-collector-configuration) (si está habilitado)

{{< img src="infrastructure/index/infra-list-side-panel.png" alt="El panel lateral de detalles del servidor con secciones para el resumen del servidor, métricas, containers, procesos y otros datos del servidor." style="width:100%;">}}

### Configuración del Agent {#agent-configuration}

Para visualizar la configuración del Agent de un servidor, haga clic en el servidor para abrir el panel lateral y, luego, desplácese a la sección **Agent**. Para visualizar y administrar las configuraciones del Agent en toda su infraestructura, utilice [Fleet Automation][12].

{{< img src="infrastructure/index/infra-list-agent-config.png" alt="La sección Agent del panel lateral del servidor que muestra la configuración del Agent en formato JSON." style="width:100%;">}}

### Configuración de OpenTelemetry Collector {#opentelemetry-collector-configuration}

Cuando configura la [Datadog Extension][14] con su OpenTelemetry Collector, puede visualizar la configuración del Collector y la información de compilación directamente en el panel de detalles del servidor. La extensión también le permite administrar y depurar sus implementaciones de Collector desde Datadog.

Para visualizar la configuración de OpenTelemetry Collector de un servidor, haga clic en el servidor para abrir el panel lateral. Desplácese a la sección **OTel Collector** para ver la información de compilación y la configuración completa del Collector. Para obtener instrucciones de configuración detalladas y requisitos, como la coincidencia de nombres de servidor y la configuración de canalizaciones, consulte la [documentación de Datadog Extension][14].

{{< img src="infrastructure/index/infra-list-otel-config.png" alt="La sección OTel Collector del panel lateral del servidor que muestra la información de compilación y la configuración del Collector." style="width:100%;">}}

## Exportar {#export}

Haga clic en **Export** > **Open in DDSQL Editor**, luego descargue los resultados desde el [DDSQL Editor][18]. También puede exportar a un dashboard, notebook o hoja de cálculo. Para obtener una lista en formato JSON de sus servidores que reportan a Datadog, también puede usar una de las siguientes opciones:

- The [host overview report][17].
- The [search hosts API puntos de conexión][7]. Consulte el [developer guide][8] para ver un ejemplo.

### Audit Agent versions{#audit-agent-versions}

Para auditar qué versiones de Agent se están ejecutando en sus servidores, use el [script get_host_agent_list][9]. El script utiliza el [host overview report][17] para mostrar los Agents en ejecución con sus números de versión. Un script `json_to_csv` también convierte la salida JSON a CSV.

### Lista de servidores sin un Agent{#list-hosts-without-an-agent}

También puede usar la exportación JSON para listar las instancias de Amazon EC2 (excluyendo RDS) que no tienen un Agent instalado. Estas instancias aparecen en la Lista de servidores cuando configura su cuenta de AWS en la integración de AWS de Datadog. El siguiente script de Python 3 los lista:

```python
# 3p
import requests

# stdlib
import json
import pprint
import os

api_key = os.environ['DD_API_KEY']
app_key = os.environ['DD_APP_KEY']

url = "https://app.datadoghq.com/reports/v2/overview?\
window=3h&with_apps=true&with_sources=true&with_aliases=true\
&with_meta=true&with_tags=true&api_key=%s&application_key=%s"

infra = json.loads(requests.get(url %(api_key,app_key)).text)

for host in infra['rows']:
    if (('aws' in host['apps']) and ('rds' not in host['apps']) and ('agent' not in host['apps'])):
        try:
            print(f'HOST: {host["name"]} - TAGS: {host["tags_by_source"]}')
        except:
            pass
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/getting_started/tagging/
[3]: /es/metrics/
[4]: /es/infrastructure/livecontainers/?tab=helm#overview
[5]: /es/logs/
[7]: /es/api/v1/hosts/#get-the-total-number-of-active-hosts
[8]: /es/extend/guide/query-the-infrastructure-list-via-the-api/
[9]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[10]: https://app.datadoghq.com/infrastructure
[11]: https://docs.datadoghq.com/es/account_management/billing/
[12]: https://app.datadoghq.com/release-notes/fleet-automation-is-now-generally-available
[14]: /es/opentelemetry/integrations/datadog_extension/
[15]: /es/infrastructure/resource_catalog/#investigate-a-host-or-resource
[16]: /es/getting_started/search/
[17]: https://app.datadoghq.com/reports/v2/overview?metrics=avg%3Aaws.ec2.cpuutilization%2Cavg%3Aazure.vm.percentage_cpu%2Cavg%3Agcp.gce.instance.cpu.utilization%2Cavg%3Asystem.cpu.idle%2Cavg%3Asystem.cpu.iowait%2Cavg%3Asystem.load.norm.15%2Cavg%3Avsphere.cpu.usage%2Cavg%3Avsphere.cpu.usage.avg%2Cavg%3Aalibabacloud.ecs.cpu_utilization.average&with_apps=true&with_sources=true&with_aliases=true&with_meta=true&with_mute_status=true&with_tags=true
[18]: /es/ddsql_editor/#save-and-share-queries
[19]: /es/account_management/teams/#team-filter
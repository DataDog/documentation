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
  text: Monitoreo de Procesos en Vivo
title: Lista de servidores
---
## Resumen {#overview}

La lista de servidores te proporciona un inventario en vivo de todos los servidores que reportan a Datadog a través del agente o integraciones en la nube. Por defecto, muestra los servidores con actividad en los últimos 15 minutos. Para abrir la lista de servidores, navega a [**Infraestructura > Servidores**][10] en Datadog.

Esta página describe la vista **Nueva** de la lista de servidores. Para cambiar a la vista **Clásica**, utiliza el interruptor en la esquina superior derecha.

{{< img src="infrastructure/index/infra-list-overview-2.png" alt="La lista de servidores con un panel de filtros a la izquierda y una lista de servidores con columnas personalizables." style="width:100%;">}}

**Nota**: Esta lista no debe ser utilizada para estimar la facturación de tus servidores de infraestructura. Consulta la página de [facturación][11] para más detalles.

## Filtrar y buscar {#filter-and-search}

Utiliza el panel de filtros a la izquierda para reducir la lista de servidores:

- **Mis Equipos**: Activa para mostrar solo los servidores asociados con tus equipos.
- **Filtros rápidos**: Utiliza las casillas de verificación en la parte superior del panel para filtrar por proveedor de nube (AWS, Azure, Google Cloud, Oracle o Alibaba Cloud), fuente de telemetría (agente de Datadog u OpenTelemetry), sistema operativo (Windows, Linux o Darwin), o hardware (GPU).
- **Filtrar Métricas**: Selecciona una métrica y define un rango de valores para filtrar servidores por el valor de la métrica.
- **Facetas de búsqueda**: Filtra por cualquier propiedad o etiqueta de servidor, como Proveedor de Nube, Env, Región, Tipo de Recurso, Tipo de Instancia, SO, Versión de SO, Agente o Versión de Docker.

También puedes usar el cuadro de búsqueda en la parte superior de la lista para filtrar servidores utilizando la [sintaxis de búsqueda de Datadog][16].

## Personalizar columnas {#customize-columns}

Para agregar, eliminar o reordenar columnas, haz clic en **Columnas** sobre la lista de servidores. Puedes agregar cualquiera de los siguientes como columna:

- **Atributos del servidor**: Propiedades del servidor, como el nombre del servidor o el estado.
- **Etiquetas**: Cualquier etiqueta aplicada al servidor.
- **Métricas**: Cualquier métrica reportada por el servidor.

Para reordenar una columna, arrástrala a una nueva posición. Para cambiar el tamaño, arrastra su borde derecho. Para ocultar, desactívala.

{{< img src="infrastructure/index/infra-list-columns.png" alt="El panel de personalización de columnas con secciones para Atributos del servidor, Etiquetas y Métricas, y con interruptores para mostrar u ocultar cada columna." style="width:100%;">}}

### Columnas combinadas {#combined-columns}

La lista de servidores incluye tres columnas que combinan múltiples puntos de datos:

- **Configuraciones**: El proveedor de la nube, el sistema operativo y el estado de instalación del Datadog Agent para cada servidor.
- **Software**: El servidor web del servidor, la base de datos, la caché y el orquestador de contenedores (como Docker o Kubernetes), si se detecta.
- **Integraciones**: Las integraciones del Datadog Agent habilitadas en el servidor.

## Vistas guardadas {#saved-views}

Para guardar tu filtro y configuración de columnas, abre el panel de **Vistas** en la esquina superior izquierda y haz clic en **Guardar como nueva vista**. Desde este panel, puedes filtrar, ordenar, editar y marcar vistas guardadas.

{{< img src="infrastructure/index/infra-list-views.png" alt="El panel de Vistas con opciones para guardar, filtrar, ordenar y editar vistas guardadas." style="width:40%;">}}

Inspeccionar un servidor {#inspect-a-host}

Haz clic en cualquier servidor para abrir su panel de detalles, que es el mismo panel lateral utilizado por el [Resource Catalog][15]. El panel incluye:

- [Nombres de servidor y alias](/agent/faq/how-datadog-agent-determines-the-hostname/#host-aliases)
- [Etiquetas][2]
- [Métricas][3]
- [Contenedores][4]
- [Registros][5] (si está habilitado)
- [Configuración del agente](#agent-configuration) (si está habilitado)
- [Configuración del OpenTelemetry Collector](#opentelemetry-collector-configuration) (si está habilitado)

{{< img src="infrastructure/index/infra-list-side-panel.png" alt="El panel lateral de detalles del servidor con secciones para Resumen del Servidor, Métricas, Contenedores, Procesos y otros datos del servidor." style="width:100%;">}}

### Configuración del agente {#agent-configuration}

Para ver la configuración del Datadog Agent de un servidor, haz clic en el servidor para abrir el panel lateral y luego desplázate a la sección **Agent**. Para ver y gestionar las configuraciones del Datadog Agent en toda tu infraestructura, utiliza [Fleet Automation][12].

{{< img src="infrastructure/index/infra-list-agent-config.png" alt="La sección del Datadog Agent del panel lateral del servidor que muestra la configuración del Datadog Agent en formato JSON." style="width:100%;">}}

### Configuración del OpenTelemetry Collector {#opentelemetry-collector-configuration}

Cuando configuras la [Extensión de Datadog][14] con tu OpenTelemetry Collector, puedes ver la configuración del Collector y la información de compilación directamente en el panel de detalles del servidor. La extensión también te permite gestionar y depurar tus implementaciones del Collector desde Datadog.

Para ver la configuración del OpenTelemetry Collector de un servidor, haz clic en el servidor para abrir el panel lateral. Desplázate a la sección **OTel Collector** para ver la información de compilación y la configuración completa del Collector. Para obtener instrucciones detalladas de configuración y requisitos, como la coincidencia de nombres de host y la configuración de la canalización, consulte la [documentación de la extensión de Datadog][14].

{{< img src="infrastructure/index/infra-list-otel-config.png" alt="La sección del recolector OTel en el panel lateral del host que muestra información de compilación y configuración del recolector." style="width:100%;">}}

## Exportar {#export}

Haga clic en **Exportar** > **Abrir en el Editor DDSQL**, luego descargue los resultados del [Editor DDSQL][18]. También puede exportar a un tablero, notebook o hoja de cálculo. Para obtener una lista en formato JSON de sus hosts que reportan a Datadog, también puede usar uno de los siguientes:

- El [informe de resumen de hosts][17].
- El [punto de conexión de la API de búsqueda de hosts][7]. Consulte la [guía del desarrollador][8] para un ejemplo.

### Versiones del Agente de Auditoría {#audit-agent-versions}

Para auditar qué versiones de Agente se están ejecutando en sus hosts, use el [script get_host_agent_list][9]. El script utiliza el [informe de resumen de hosts][17] para mostrar los Agentes en ejecución con sus números de versión. Un `json_to_csv` script también convierte la salida JSON a CSV.

### Lista de hosts sin un Agente {#list-hosts-without-an-agent}

También puede usar la exportación JSON para listar instancias de Amazon EC2 (excluyendo RDS) que no tienen un Agente instalado. Estas instancias aparecen en la Lista de Hosts cuando configura su cuenta de AWS en la integración de Datadog AWS. El siguiente script de Python 3 las lista:

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

## Lectura Adicional {#further-reading}

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
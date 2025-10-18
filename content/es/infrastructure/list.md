---
aliases:
- /es/hostnames
- /es/graphing/infrastructure/list/
further_reading:
- link: /infrastructure/hostmap/
  tag: Documentación
  text: Mapa de hosts
- link: /infrastructure/livecontainers/
  tag: Documentación
  text: Mapa de contenedores
- link: /infrastructure/process/
  tag: Documentación
  text: Monitorización Live Process
title: Lista de infraestructuras
---

## Información general

La lista de infraestructuras te ofrece un inventario en tiempo real de todos los hosts que se comunican con Datadog a través de las integraciones en el Agent o en la nube. En forma predeterminada, muestra los hosts con actividad en las últimas dos horas, pero puedes ampliar la vista para cubrir hasta una semana. Busca tus hosts o agrúpalos por etiquetas. En Datadog, ve a [**Infraestructure > Hosts**][10]  (Infraestructura > Hosts) para ver la lista de infraestructuras. Esta lista no debe utilizarse para estimar la facturación de tu host de infraestructura. Consulta la page (página) de [facturación][11] para obtener más información sobre la facturación.

## Hosts

La siguiente información se muestra en la lista de infraestructuras de tus hosts:

Nombre de host
: El [alias](#aliases) del nombre de host preferido (utiliza el menú de opciones para ver el nombre de la nube o el ID de instancia).

Nombre de la nube
: Un [alias](#aliases) del nombre de host.

ID de instancia
: Un [alias](#aliases) del nombre de host.

Estado
: Muestra `ACTIVE` cuando se reciben las métricas esperadas e `INACTIVE` si no se reciben métricas.

CPU
: El porcentaje de CPU utilizado (todo menos el inactivo).

IOWait
: Porcentaje de CPU dedicado a la espera de E/S (no se informa en todas las plataformas).

Carga 15
: La carga del sistema en los últimos 15 minutos.

Aplicaciones
: Las integraciones de Datadog que informan métricas del host.

Sistema operativo
: El sistema operativo rastreado.

Plataforma en la nube
: Plataforma en la nube en la que se ejecuta el host (por ejemplo, AWS, Google Cloud o Azure).

Datadog Agent
: Versión del Agent que recopila datos del host.

OpenTelemetry
: Versión del recopilador de OpenTelemetry que está recopilando datos del host.

### Nombre de host

El Datadog Agent recopila posibles nombres de host de varias fuentes diferentes. Para obtener más detalles, consulta [¿Cómo determina Datadog el nombre de host del Agent?][1].

**Nota**: Los nombres de host deben ser únicos en una cuenta de Datadog. Si no es así, podrías encontrar algunas incoherencias en las gráficas de tu host.

### Inspeccionar

Haz clic en un host para ver más detalles, incluido:
- [alias](#aliases)
- [etiquetas][2]
- [métricas][3]
- [contenedores][4]
- [logs][5] (si se encuentra habilitado)
- [Configuración del Agent](#agent-configuration) (si se encuentra habilitado)
- [Configuración del recopilador de OpenTelemetry](#OpenTelemetry-collector-configuration) (si está activada)

{{< img src="infrastructure/index/infra-list2.png" alt="Detalles del host de la lista de infraestructuras" style="width:100%;">}}

#### Alias

Datadog crea alias para nombres de host cuando hay varios nombres unívocos para un único host. Los nombres que recopila el Agent se añaden como alias para el nombre canónico elegido. Por ejemplo, un único host que se ejecuta en EC2 podría tener un ID de instancia (`i-abcd1234`), un nombre de host genérico proporcionado por EC2 basado en la dirección IP del host (`ip-192-0-0-1`) y un nombre de host significativo proporcionado por un servidor DNS interno o un archivo de host gestionado mediante configuración (`myhost.mydomain`).

{{< img src="infrastructure/index/infra-list-alias2.png" alt="Alias de host" style="width:100%;">}}

#### Configuración del Agent

Puedes ver y gestionar las configuraciones del Agent en toda tu infraestructura utilizando [Fleet Automation][12].

Para ver las configuraciones del Agent:
1. Haz clic en **Open Host** (Abrir host) en la esquina superior derecha del panel de detalles del host.
2. Selecciona **View Agent Configurations** (Ver configuraciones del Agent) en el menú desplegable para ir directamente a Fleet Automation.

{{< img src="infrastructure/index/infra-list-config-4.png" alt="Ver configuraciones del Agent en Fleet Automation" style="width:100%;">}}

#### Configuración de OpenTelemetry Collector

Cuando la [extensión de Datadog][14] está configurada con tu recopilador de OpenTelemetry, puedes ver la configuración del recopilador y la información de creación directamente en el panel de detalles del host de la lista de infraestructuras. La extensión de Datadog proporciona visibilidad de tu flota de recopiladores desde la interfaz de usuario de Datadog, lo que te ayuda a gestionar y depurar tus despliegues de recopiladores de OpenTelemetry.

Para ver las configuraciones del recopilador de OpenTelemetry:
1. Haz clic en un host que ejecute el recopilador de OpenTelemetry en la lista Infraestructuras.
2. En el panel de detalles del host, selecciona la pestaña **OpenTelemetry Collector** (Recopilador de OpenTelemetry) para ver la información de creación y la configuración completa del recopilador.

Para obtener instrucciones y requisitos de configuración detallados, como la coincidencia de nombres de host y la configuración de pipeline, consulta la [documentación principal de la extensión de Datadog][14].

{{< img src="infrastructure/index/infra-list-config-OpenTelemetry.png" alt="Ver configuraciones del recopilador de OpenTelemetry en la lista de infraestructuras" style="width:100%;">}}


### Exportar

Para obtener una lista con formato JSON de tus hosts que informan a Datadog, utiliza una de las siguientes opciones:

* El **enlace permanente de la API de JSON** en la parte superior de la lista de infraestructuras.
* El [endpoint de búsqueda de la API de los hosts][7]. Para ver un ejemplo, consulta la [guía para desarrolladores][8].

#### Agent version

Puede ser útil auditar tus versiones del Agent para asegurarte de que estés ejecutando la última versión. Para ello, utiliza el [script get_host_agent_list][9], que aprovecha el vínculo permanente a JSON para mostrar los Agents que se están ejecutando con los números de versión. También hay un script `json_to_csv` para convertir la salida JSON en un archivo CSV.

#### Sin Agent

Otro caso de uso de la exportación de JSON es obtener una lista de instancias de Amazon EC2 (excepto RDS) sin ningún Agent instalado. Estas instancias aparecen en la lista de infraestructuras al configurar tu cuenta de AWS en el cuadro de integración de Datadog AWS. Consulta el siguiente script Python3:

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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/faq/how-datadog-agent-determines-the-hostname/
[2]: /es/getting_started/tagging/
[3]: /es/metrics/
[4]: /es/infrastructure/livecontainers/?tab=helm#overview
[5]: /es/logs/
[6]: /es/agent/configuration/agent-configuration-files/
[7]: /es/api/v1/hosts/#get-the-total-number-of-active-hosts
[8]: /es/developers/guide/query-the-infrastructure-list-via-the-api/
[9]: https://github.com/DataDog/Miscellany/tree/master/get_hostname_agentversion
[10]: https://app.datadoghq.com/infrastructure
[11]: https://docs.datadoghq.com/es/account_management/billing/
[12]: https://app.datadoghq.com/release-notes/fleet-automation-is-now-generally-available
[13]: /es/agent/fleet_automation
[14]: /es/opentelemetry/integrations/datadog_extension/
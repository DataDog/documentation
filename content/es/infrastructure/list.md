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

La lista de infraestructuras muestra todos tus hosts con actividad durante las últimas dos horas (por defecto) y hasta una semana, monitorizados por Datadog. Busca tus hosts o agrúpalos por etiquetas (tags). En Datadog, ve a [**infraestructura > Hosts**][10] para ver la lista de infraestructuras. Esta lista no debe utilizarse para estimar tu facturación por el host de la infraestructura. Para obtener más información sobre facturación, consulta la página [Facturación][11].

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

{{< img src="infrastructure/index/infra-list2.png" alt="Detalles del host de la lista de infraestructuras" style="width:100%;">}}

#### Alias

Datadog crea alias para nombres de host cuando hay varios nombres unívocos para un único host. Los nombres que recopila el Agent se añaden como alias para el nombre canónico elegido. Por ejemplo, un único host que se ejecuta en EC2 podría tener un ID de instancia (`i-abcd1234`), un nombre de host genérico proporcionado por EC2 basado en la dirección IP del host (`ip-192-0-0-1`) y un nombre de host significativo proporcionado por un servidor DNS interno o un archivo de host gestionado mediante configuración (`myhost.mydomain`).

{{< img src="infrastructure/index/infra-list-alias2.png" alt="Alias de host" style="width:100%;">}}

#### Configuración del Agent

{{< callout url="#" btn_hidden="true" >}}
La vista de configuración del Agent se encuentra en la versión beta pública y está disponible en las versiones del Agent 7.39/6.39 o posteriores.

A partir de las versiones del Agent 7.47/6.47 o posteriores, esta función se encuentra habilitada de forma predeterminada.
{{< /callout >}}

El Agent puede enviar su propia configuración a Datadog para que se muestre en la sección `Agent Configuration` del panel de detalles del host.

La configuración del Agent no incluye información confidencial y sólo contiene la configuración que has establecido mediante el archivo de configuración o las variables de entorno. Los cambios de configuración se actualizan cada 10 minutos.

Esta función se encuentra habilitada de manera predeterminada en las versiones del Agent 7.47.0/6.47.0 o posteriores.

Para modificar este comportamiento, configura el valor de `inventories_configuration_enabled` en tu [archivo de configuración del Agent][6] como `true` para enviar la configuración o `false` para deshabilitarla.

También puedes utilizar la variable de entorno `DD_INVENTORIES_CONFIGURATION_ENABLED` para habilitar o deshabilitar esta función.

{{< img src="infrastructure/index/infra-list-config3.png" alt="La vista de configuración del Agent" style="width:100%;">}}

### Exportar

Para obtener una lista con formato JSON de tus hosts que informan a Datadog, utiliza una de las siguientes opciones:

* El **enlace permanente de la API de JSON** en la parte superior de la lista de infraestructuras.
* El [endpoint de búsqueda de la API de los hosts][7]. Para ver un ejemplo, consulta la [guía para desarrolladores][8].

#### Versión del Agent

En ciertas ocasiones, también puede resultar útil auditar tus versiones del Agent para asegurarte de que estás ejecutando la última versión. Para ello, utiliza el [script get_host_agent_list][9], que aprovecha el enlace permanente de JSON para generar los Agents en ejecución actuales con sus números de versión. También puedes utilizar el script `json_to_csv` para convertir el resultado JSON en un archivo CSV.

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
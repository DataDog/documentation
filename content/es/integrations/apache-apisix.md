---
app_id: apache-apisix
app_uuid: b842d639-caf6-4b3a-8115-52458b9a0753
assets:
  dashboards:
    Apache APISIX Dashboard: assets/dashboards/apache-apisix_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - apisix.request.counter
      - apisix.request.latency
      - apisix.upstream.latency
      - apisix.apisix.latency
      - apisix.ingress.size
      - apisix.egress.size
      metadata_path: metadata.csv
      prefix: apisix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10244
    source_type_name: Apache APISIX
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: dev@apisix.apache.org
  support_email: dev@apisix.apache.org
categories:
- nube
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apache-apisix/README.md
display_on_public_website: true
draft: false
git_integration_title: apache-apisix
integration_id: apache-apisix
integration_title: Apache APISIX
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: apache-apisix
public_title: Apache APISIX
short_description: Integración Datadog-APISIX
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Métricas
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Integración Datadog-APISIX
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://apisix.apache.org/blog/2021/11/12/apisix-datadog
  support: README.md#Soporte
  title: Apache APISIX
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Apache APISIX es una pasarela API dinámica en tiempo real, de alto rendimiento, que proporciona abundantes funciones de gestión de tráfico como balanceo de carga, upstream dinámico, lanzamientos de tipo canary, ruptura de circuitos, autenticación, observabilidad y más. Por ejemplo, utiliza Apache APISIX para gestionar el tráfico tradicional norte-sur, así como el tráfico este-oeste entre servicios. También se puede utilizar como controlador de entrada en Kubernetes.

El [complemento APISIX-Datadog][1] envía sus métricas personalizadas al servidor DogStatsD y se incluye con el Datadog Agent en la conexión UDP. DogStatsD es una implementación del protocolo StatsD, que recopila métricas personalizadas del Agent [Apache APISIX][2], las agrega en un único punto de datos y las envía al servidor Datadog configurado.

## Configuración

### Instalación

Sigue las siguientes instrucciones de configuración.

### Configuración

1. Si ya utilizas Datadog y tienes instalado el Datadog Agent, asegúrate de que el puerto 8125/UDP está autorizado en tu cortafuegos. Por ejemplo, el Agent Apache APISIX puede acceder al puerto 8125 del Datadog Agent. Si ya tienes esto configurado, puedes pasar directamente al paso 3.

> Para obtener más información sobre cómo instalar el Datadog Agent, consulta la [documentación del Agent][3].

2. Si recién empiezas a utilizar Datadog:

   1. Primero, crea una cuenta visitando el [sitio web de Datadog][4] y haz clic en el botón Get Started Free (Empieza a utilizarlo gratis).
   2. Genera una clave de API.
      ![Generar una clave de API][5]

3. El complemento APISIX-Datadog sólo requiere el componente DogStatsD de `datadog/agent` ya que el complemento envía métricas de forma asíncrona al servidor DogStatsD siguiendo el protocolo statsd mediante un socket UDP estándar. Por esta razón, APISIX recomienda utilizar la imagen independiente `datadog/dogstatsd`, en lugar de la imagen completa del Agent, ya que es extremadamente ligera (sólo ~11 MB de tamaño) en comparación con los ~2,8GB de la imagen `datadog/agent`.

Para ejecutarlo como contenedor:

```shell
# pull the latest image
$ docker pull datadog/dogstatsd:latest
# run a detached container
$ docker run -d --name dogstatsd-agent -e DD_API_KEY=<Your API Key from step 2> -p 8125:8125/udp  datadog/dogstatsd
```

Si utilizas Kubernetes en tu entorno de producción, puedes desplegar `dogstatsd` como `Daemonset` o como `Multi-Container Pod`, junto con el Agent Apache APISIX.

4. El siguiente es un ejemplo de cómo activar el complemento Datadog para una ruta específica. Esto supone que el Agent `dogstatsd` ya está en funcionamiento.

```shell
# enable plugin for a specific route
$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "plugins": {
    "datadog": {}
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  },
  "uri": "/hello"
}'
```

Ahora, cualquier solicitud al URI del endpoint `/hello` generará las métricas anteriores y las enviará al servidor local DogStatsD del Datadog Agent.

5. Para desactivar el complemento, elimina la configuración JSON correspondiente en la configuración del complemento para deshabilitar `datadog`. Los complementos APISIX se recargan en caliente, por lo que no es necesario reiniciar APISIX.

```shell
# disable plugin for a route
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/hello",
  "plugins": {},
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}'
```

5. Para conocer otras opciones personalizadas de configuración, consulta la documentación del [complemento Datadog][1].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `apisix` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "apache-apisix" >}}


### Eventos

El check de Apache APISIX no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

- [Monitorización en la nube con Datadog en Apache APISIX][9]

[1]: https://apisix.apache.org/docs/apisix/plugins/datadog
[2]: https://apisix.apache.org/
[3]: https://docs.datadoghq.com/es/agent/
[4]: https://www.datadoghq.com/
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apache-apisix/images/screenshot_1.png
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/apache-apisix/metadata.csv
[8]: https://docs.datadoghq.com/es/help/
[9]: https://apisix.apache.org/blog/2021/11/12/apisix-datadog
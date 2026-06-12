---
app_id: apache-apisix
categories:
- nube
- métricas
custom_kind: integración
description: Integración Datadog-APISIX
further_reading:
- link: https://apisix.apache.org/blog/2021/11/12/apisix-datadog
  tag: blog
  text: og:title
media: []
supported_os:
- Linux
- Windows
- macOS
title: Apache APISIX
---
## Información general

Apache APISIX es una pasarela API dinámica en tiempo real, de alto rendimiento, que proporciona abundantes funciones de gestión de tráfico como balanceo de carga, upstream dinámico, lanzamientos de tipo canary, ruptura de circuitos, autenticación, observabilidad y más. Por ejemplo, utiliza Apache APISIX para gestionar el tráfico tradicional norte-sur, así como el tráfico este-oeste entre servicios. También se puede utilizar como controlador de entrada en Kubernetes.

El [complemento APISIX-Datadog](https://apisix.apache.org/docs/apisix/plugins/datadog) envía tus métricas personalizadas al servidor DogStatsD y viene incluido con el Datadog Agent mediante conexión UDP. DogStatsD es una implementación del protocolo StatsD. Recopila las métricas personalizadas para el agente [Apache APISIX](https://apisix.apache.org/), las agrega en un único punto de datos y las envía al servidor Datadog configurado.

## Configuración

### Instalación

Sigue las siguientes instrucciones de configuración.

### Configuración

1. Si ya utilizas Datadog y tienes instalado el Datadog Agent, asegúrate de que el puerto 8125/UDP está autorizado en tu cortafuegos. Por ejemplo, el Agent Apache APISIX puede acceder al puerto 8125 del Datadog Agent. Si ya tienes esto configurado, puedes pasar directamente al paso 3.

> Para obtener más información sobre cómo instalar el Datadog Agent, consulta la [documentación del Agent](https://docs.datadoghq.com/agent/).

2. Si recién empiezas a utilizar Datadog:

   1. En primer lugar, crea una cuenta visitando el [sitio web de Datadog](https://www.datadoghq.com/) y haz clic en el botón Get Started Free (Empieza gratis).
   1. Genera una clave de API.
      ![Generar una clave de API](https://raw.githubusercontent.com/DataDog/integrations-extras/master/apache-apisix/images/screenshot_1.png)

1. El complemento APISIX-Datadog sólo requiere el componente DogStatsD de `datadog/agent` ya que el complemento envía métricas de forma asíncrona al servidor DogStatsD siguiendo el protocolo statsd mediante un socket UDP estándar. Por esta razón, APISIX recomienda utilizar la imagen independiente `datadog/dogstatsd`, en lugar de la imagen completa del Agent, ya que es extremadamente ligera (sólo ~11 MB de tamaño) en comparación con los ~2,8GB de la imagen `datadog/agent`.

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

5. Consulta la documentación del [complemento Datadog](https://apisix.apache.org/docs/apisix/plugins/datadog) para ver más opciones de configuración personalizadas.

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `apisix` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **apisix.request.counter** <br>(count) | Número de solicitudes recibidas<br>_Se muestra como conexión_ |
| **apisix.request.latency** <br>(gauge) | Latencia total del ciclo de vida de la respuesta a la solicitud, tiempo que se tarda en procesar la solicitud concreta.<br>_Se muestra como milisegundos_ |
| **apisix.upstream.latency** <br>(gauge) | Latencia entre el tiempo que transcurre desde que se envía la solicitud al servidor ascendente hasta que se recibe una respuesta.<br>_Se muestra como milisegundos_ |
| **apisix.apisix.latency** <br>(gauge) | Latencia añadida por Apache APISIX, tiempo que tarda el agente APISIX únicamente en procesar la solicitud.<br>_Se muestra como milisegundos_ |
| **apisix.ingress.size** <br>(gauge) | Tamaño del cuerpo de la solicitud entrante antes de reenviarla al servidor ascendente.<br>_Se muestra como bytes_ |
| **apisix.egress.size** <br>(gauge) | Tamaño del cuerpo de la respuesta recibida procedente del servidor ascendente reenviado APISIX.<br>_Se muestra como bytes_ |

### Eventos

El check de Apache APISIX no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorización de la nube con Datadog en Apache APISIX](https://apisix.apache.org/blog/2021/11/12/apisix-datadog)
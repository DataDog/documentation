---
app_id: apache
categories:
- log collection
custom_kind: integración
description: Realiza un seguimiento de las solicitudes por segundo, de los bytes servidos,
  de los subprocesos de los workers, de los tiempos de actividad y more.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-apache-web-server-performance
  tag: blog
  text: Monitorización del rendimiento del servidor web Apache
- link: https://www.datadoghq.com/blog/collect-apache-performance-metrics
  tag: blog
  text: Recopilar métricas de rendimiento de Apache
- link: https://www.datadoghq.com/blog/monitor-apache-web-server-datadog
  tag: blog
  text: Monitorizar servidores web Apache con Datadog
integration_version: 7.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Apache
---
![Apache Dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/apache/images/apache_dashboard.png)

## Información general

El check de Apache realiza un seguimiento de las solicitudes por segundo, de los bytes servidos, de los subprocesos de los workers, de los tiempos de actividad y mucho más.

## Configuración

### Instalación

El check de Apache se incluye en el [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). Para empezar a recopilar tus métricas y logs de Apache, necesitas:

1. [Instala el Agent](https://docs.datadoghq.com/agent/) en tus servidores Apache.

1. Instala `mod_status` en tus servidores Apache y habilita `ExtendedStatus`.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `apache.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus métricas de Apache. Consulta el [ejemplo de apache.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     ## @param apache_status_url - string - required
     ## Status url of your Apache server.
     #
     - apache_status_url: http://localhost/server-status?auto
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `apache.d/conf.yaml` para empezar a recopilar tus logs de Apache ajustando los valores `path` y `service` para configurarlos para tu entorno:

   ```yaml
   logs:
     - type: file
       path: /path/to/your/apache/access.log
       source: apache
       service: apache
       sourcecategory: http_web_access

     - type: file
       path: /path/to/your/apache/error.log
       source: apache
       service: apache
       sourcecategory: http_web_error
   ```

   Consulta el [ejemplo de apache.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Docker" %}}

#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Configura [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) como etiquetas (labels) Docker en tu contenedor de aplicaciones:

```yaml
LABEL "com.datadoghq.ad.check_names"='["apache"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"apache_status_url": "http://%%host%%/server-status?auto"}]'
```

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Docker](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation).

A continuación, configura [integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "apache", "service": "<SERVICE_NAME>"}]'
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes

Para Configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes) como anotaciones de pod en tu contenedor de aplicaciones. Aparte de esto, las plantillas también se pueden configurar con [un archivo, un configmap o un almacén clave-valor](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration).

**Anotaciones v1** (para el Datadog Agent \< v7.36)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache"]'
    ad.datadoghq.com/apache.init_configs: '[{}]'
    ad.datadoghq.com/apache.instances: |
      [
        {
          "apache_status_url": "http://%%host%%/server-status?auto"
        }
      ]
spec:
  containers:
    - name: apache
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.checks: |
      {
        "apache": {
          "init_config": {},
          "instances": [
            {
              "apache_status_url": "http://%%host%%/server-status?auto"
            }
          ]
        }
      }
spec:
  containers:
    - name: apache
```

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup).

A continuación, configura [integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como anotaciones de pod. Esto también se puede configurar con [un archivo, un configmap o un almacén clave-valor](https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration).

**Anotaciones v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.logs: '[{"source":"apache","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: apache
```

{{% /tab %}}

{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Configura [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) como etiquetas Docker en tu contenedor de aplicaciones:

```json
{
  "containerDefinitions": [{
    "name": "apache",
    "image": "apache:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"apache\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"apache_status_url\": \"http://%%host%%/server-status?auto\"}]"
    }
  }]
}
```

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de ECS](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux).

A continuación, configura [integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas Docker:

```json
{
  "containerDefinitions": [{
    "name": "apache",
    "image": "apache:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"apache\",\"service\":\"<YOUR_APP_NAME>\"}]"
    }
  }]
}
```

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `apache` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **apache.conns_async_closing** <br>(gauge) | Número de cierres de conexiones asíncronas.<br>_Se muestra como conexión_ |
| **apache.conns_async_keep_alive** <br>(gauge) | Número de conexiones persistentes asíncronas.<br>_Se muestra como conexión_ |
| **apache.conns_async_writing** <br>(gauge) | Número de conexiones de escritura asíncrona.<br>_Se muestra como conexión_ |
| **apache.conns_total** <br>(gauge) | Número total de conexiones realizadas.<br>_Se muestra como conexión_ |
| **apache.net.bytes** <br>(gauge) | Número total de bytes servidos.<br>_Se muestra como byte_ |
| **apache.net.bytes_per_s** <br>(gauge) | Número de bytes servidos por segundo.<br>_Se muestra como byte_ |
| **apache.net.hits** <br>(gauge) | Número total de solicitudes realizadas.<br>_Se muestra como solicitud_ |
| **apache.net.request_per_s** <br>(gauge) | Número de solicitudes realizadas por segundo.<br>_Se muestra como solicitud_ |
| **apache.performance.busy_workers** <br>(gauge) | Número de workers que atienden solicitudes.<br>_Se muestra como subproceso_ |
| **apache.performance.cpu_load** <br>(gauge) | Porcentaje de CPU utilizado.<br>_Se muestra como porcentaje_ |
| **apache.performance.idle_workers** <br>(gauge) | Número de workers inactivos.<br>_Se muestra como subproceso_ |
| **apache.performance.max_workers** <br>(gauge) | Número máximo de workers que Apache puede iniciar.<br>_Se muestra como subproceso_ |
| **apache.performance.uptime** <br>(gauge) | Cantidad de tiempo que el servidor estuvo funcionando.<br>_Se muestra como segundo_ |
| **apache.scoreboard.closing_connection** <br>(gauge) | Cantidad de workers que están actualmente cerrando una conexión.<br>_Se muestra como subproceso_ |
| **apache.scoreboard.disabled** <br>(gauge) | Estas ranuras nunca podrán atender ninguna solicitud, indica una mala configuración.<br>_Se muestra como subproceso_ |
| **apache.scoreboard.dns_lookup** <br>(gauge) | Workers en espera de una búsqueda DNS.<br>_Se muestra como subproceso_ |
| **apache.scoreboard.gracefully_finishing** <br>(gauge) | Número de workers que finalizan su solicitud.<br>_Se muestra como subproceso_ |
| **apache.scoreboard.idle_cleanup** <br>(gauge) | Estos workers estaban inactivos y su proceso se está deteniendo.<br>_Se muestra como subproceso_ |
| **apache.scoreboard.keepalive** <br>(gauge) | Los workers esperaban una nueva solicitiud del mismo cliente, porque pidió mantener activa la conexión.<br>_Se muestra como subproceso_ |
| **apache.scoreboard.logging** <br>(gauge) | Los workers escribiendo algo en logs de Apache.<br>_Se muestra como subproceso_ |
| **apache.scoreboard.open_slot** <br>(gauge) | Cantidad de workers que Apache aún puede iniciar antes de alcanzar el número máximo de workers.<br>_Se muestra como subproceso_ |
| **apache.scoreboard.reading_request** <br>(gauge) | Workers que leen la solicitud entrante.<br>_Se muestra como subproceso_ |
| **apache.scoreboard.sending_reply** <br>(gauge) | Número de workers que envían una respuesta o esperan a que un script (como PHP) termine para poder enviar una respuesta.<br>_Se muestra como subproceso_ |
| **apache.scoreboard.starting_up** <br>(gauge) | Workers que aún están arrancando y todavía no pueden atender una solicitud.<br>_Se muestra como subproceso_ |
| **apache.scoreboard.waiting_for_connection** <br>(gauge) | Workers que pueden procesar inmediatamente una solicitud entrante.<br>_Se muestra como subproceso_ |

### Eventos

El check de Apache no incluye eventos.

### Checks de servicio

**apache.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la instancia Apache monitorizada. Devuelve `OK` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

### URL de estado de Apache

Si tienes problemas con tu integración Apache, la mayoría de las veces se debe a que el Agent no puede acceder a tu URL de estado de Apache. Intenta ejecutar curl para la `apache_status_url` listada en [tu archivo `apache.d/conf.yaml`](https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example) (incluye tus credenciales de acceso, si es necesario).

- [Problemas con certificados SSL Apache](https://docs.datadoghq.com/integrations/faq/apache-ssl-certificate-issues/)

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Despliegue y configuración de Datadog con CloudFormation](https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation)
- [Monitorización del rendimiento del servidor web Apache](https://www.datadoghq.com/blog/monitoring-apache-web-server-performance)
- [Recopilar métricas de rendimiento de Apache](https://www.datadoghq.com/blog/collect-apache-performance-metrics)
- [Monitorizar servidores web Apache con Datadog](https://www.datadoghq.com/blog/monitor-apache-web-server-datadog)
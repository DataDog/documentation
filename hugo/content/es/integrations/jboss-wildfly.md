---
aliases:
- /es/integrations/jboss_wildfly
app_id: jboss-wildfly
categories:
- recopilación de logs
custom_kind: integración
description: Recopila varias métricas de JMX de aplicaciones JBoss y WildFly
integration_version: 3.1.0
media: []
supported_os:
- linux
- windows
- macos
title: JBoss/WildFly
---
## Información general

Este check monitoriza las aplicaciones [JBoss](https://developers.redhat.com/products/eap/overview) y [WildFly](http://wildfly.org).

## Configuración

### Instalación

El check de JBoss/WildFly está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) por lo que no necesitas instalar nada más en tu host de JBoss/WildFly.

### Configuración

Este check tiene un límite de 350 métricas por instancia. El número de métricas devueltas se indica en [la page (página) de estado](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information). Puedes especificar las métricas que te interesan editando la configuración a continuación. Para saber cómo personalizar las métricas recopiladas, consulta la [documentación de checks de JMX](https://docs.datadoghq.com/integrations/java/) para obtener instrucciones más detalladas. Si necesitas monitorizar más métricas, ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

{{< tabs >}}

{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `jboss_wildfly.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar los datos de rendimiento de tu servidor de aplicaciones de JBoss o WildFly. Consulta el [ejemplo de jboss_wildfly.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

   En función de la configuración de tu servidor (particularmente cuando utilices el esquema de JMX de `remote+http` ), puede que necesites especificar un JAR personalizado para conectarte al servidor. Coloca el JAR en la misma máquina que tu Agent y añade su ruta a la opción `custom_jar_paths` de tu archivo `jboss_wildfly.d/conf.yaml`.

   **Nota**: El esquema de url de JMX es diferente según la versión de WildFly:

   - Para Wildfly 9 y posteriores: `service:jmx:http-remoting-jmx://<HOST>:<PORT> `
   - Para Wildfly 10+: `service:jmx:remote+http://<HOST>:<PORT>`

   Consulta la [page (página) de configuración del subsistema de WildFly JMX](https://docs.jboss.org/author/display/WFLY9/JMX%20subsystem%20configuration.html) para obtener más información.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. A continuación, edita `jboss_wildfly.d/conf.yaml` descomentando las líneas `logs` de la parte inferior. Actualiza la `path` de logs con la ruta correcta a tus archivos de log de JBoss.

   ```yaml
   logs:
     - type: file
       path: /opt/jboss/wildfly/standalone/log/*.log
       source: jboss_wildfly
       service: '<APPLICATION_NAME>'
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent).

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

##### Recopilación de métricas

Para entornos en contenedores, consulta la guía [Autodiscovery con JMX](https://docs.datadoghq.com/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta la [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                                      |
| -------------- | ---------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "jboss_wildfly", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `jboss_wildfly` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **jboss.jdbc_connections.active** <br>(gauge) | número de connections (conexiones) activas<br>_Mostrado como connection (conexión)_ |
| **jboss.jdbc_connections.count** <br>(gauge) | número de connections (conexiones) abiertas<br>_Mostrado como connection (conexión)_ |
| **jboss.jdbc_connections.idle** <br>(gauge) | número de connections (conexiones) físicas actualmente inactivas<br>_Mostrado como connection (conexión)_ |
| **jboss.jdbc_connections.request_wait** <br>(rate) | número de solicitudes que han tenido que esperar para obtener una connection (conexión) física<br>_Mostrado como connection (conexión)_ |
| **jboss.jdbc_preparedstatementcache.hit** <br>(rate) | número de veces que se han utilizado sentencias de la caché<br>_Mostrado como acierto_ |
| **jboss.jdbc_preparedstatementcache.miss** <br>(rate) | número de veces que no se ha podido satisfacer una solicitud de sentencia con una sentencia de la caché<br>_Mostrado como fallo_ |
| **jboss.jdbc_preparedstatementcache.size** <br>(gauge) | número de sentencias preparadas y ejecutables almacenadas actualmente en la caché de sentencias|
| **jboss.jdbc_xacommit.count** <br>(rate) | número de invocaciones de confirmación de XAResource<br>_Mostrado como confirmación_ |
| **jboss.jdbc_xarecover.count** <br>(rate) | número de invocaciones de recuperación de XAResource<br>_Mostrado como transacción_ |
| **jboss.jdbc_xarollback.count** <br>(rate) | número de invocaciones de reversiones de XAResource<br>_Mostrado como transacción_ |
| **jboss.transactions.aborted** <br>(rate) | número total de transacciones que se han reverido.<br>_Mostrado como transacción_ |
| **jboss.transactions.application_rollbacks** <br>(rate) | número de transacciones revertidas por la aplicación.<br>_Mostrado como transacción_ |
| **jboss.transactions.committed** <br>(rate) | número de transacciones confirmadas.<br>_Mostrado como transacción_ |
| **jboss.transactions.count** <br>(rate) | número de transacciones (de nivel superior y anidadas) creadas hasta el momento.<br>_Mostrado como transacción_ |
| **jboss.transactions.heuristics** <br>(rate) | número de transacciones que han finalizado con resultados heurísticos<br>_Mostrado como transacción_ |
| **jboss.transactions.inflight** <br>(gauge) | número total de transacciones a bordo (activas).<br>_Mostrado como transacción_ |
| **jboss.transactions.nested** <br>(rate) | número de (sub) transacciones anidadas creadas hasta el momento.<br>_Mostrado como transacción_ |
| **jboss.transactions.resource_rollbacks** <br>(rate) | número de transacciones revertidas por los participantes.<br>_Mostrado como transacción_ |
| **jboss.transactions.system_rollbacks** <br>(rate) | número de transacciones que se han revertido debido a un error interno del sistema.<br>_Mostrado como transacción_ |
| **jboss.transactions.timed_out** <br>(rate) | número total de transacciones revertidas debido al tiempo de expiración.<br>_Mostrado como transacción_ |
| **jboss.undertow_listener.bytes_received** <br>(rate) | número de bytes que se han recibido<br>_Mostrado como byte_ |
| **jboss.undertow_listener.bytes_sent** <br>(rate) | número de bytes que se han enviado<br>_Mostrado como byte_ |
| **jboss.undertow_listener.error_count** <br>(rate) | número de 500 respuestas que se han enviado<br>_Mostrado como solicitud_ |
| **jboss.undertow_listener.processing_time** <br>(gauge) | tiempo total de procesamiento de todas las solicitudes entregadas por este receptor<br>_Mostrado como nanosegundo_. |
| **jboss.undertow_listener.request_count** <br>(rate) | número de solicitudes atendidas<br>_Mostrado como solicitud_ |
| **jboss.undertow_session.active** <br>(gauge) | número de sesiones activas<br>_Mostrado como sesión_ |
| **jboss.undertow_session.alivetime_avg** <br>(gauge) | tiempo medio (en segundos) que han estado activas las sesiones caducadas<br>_Mostrado como segundo_ |
| **jboss.undertow_session.alivetime_max** <br>(gauge) | mayor tiempo (en segundos) que una sesión caducada ha estado activa<br>_Mostrado como segundo_ |
| **jboss.undertow_session.created** <br>(rate) | total de sesiones creadas<br>_Mostrado como sesión_ |
| **jboss.undertow_session.expired** <br>(rate) | número de sesiones que han expirado<br>_Mostrado como sesión_ |
| **jboss.undertow_session.rejected** <br>(rate) | número de sesiones rechazadas<br>_Mostrado como sesión_ |

### Eventos

La integración JBoss/WildFly no incluye ningún evento.

### Checks de servicio

**jboss.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia de JBoss/WildFly monitorizada, `WARNING` si no se recopilan métricas y `OK` en caso contrario.

_Estados: ok, crítico, advertencia_

### Recopilación de métricas con JMXFetch

Puedes configurar el Datadog Agent para recopilar métricas de aplicaciones de Java a través de [JMXFetch](https://docs.datadoghq.com/integrations/java). Para recopilar las métricas predeterminadas configuradas para la integración de JBoss/Wildfly Datadog, configura la propiedad del sistema
`Ddd.jmxfetch.jboss_wildfly.enabled=true`.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).
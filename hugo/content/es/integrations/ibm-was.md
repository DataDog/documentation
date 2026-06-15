---
aliases:
- /es/integrations/ibm_was
app_id: ibm-was
categories:
- recopilación de logs
- sistema operativo y sistema
custom_kind: integración
description: IBM Websphere Application Server es un framework que aloja aplicaciones
  Java.
integration_version: 5.1.0
media: []
supported_os:
- linux
- windows
- macos
title: IBM WAS
---
## Información general

Con este check se monitoriza [IBM Websphere Application Server (WAS)](https://www.ibm.com/cloud/websphere-application-platform) con el Datadog Agent. Este check es compatible con las versiones de IBM WAS >= 8.5.5.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

La integración de IBM WAS de Datadog recopila los contadores de PMI habilitados del entorno de WebSphere Application Server. La configuración requiere la habilitación del PerfServlet, que brinda una manera para que Datadog recupere datos de rendimiento de WAS.

En forma predeterminada, este check recopila métricas de JDBC, JVM, grupo de subprocesos y Servlet Session Manager. Opcionalmente, puedes especificar métricas adicionales en la sección "custom_queries". Consulta el [ejemplo de configuración de check](https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example) para ver ejemplos.

### Instalación

El check de IBM WAS está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).

#### Activar el `PerfServlet`

El archivo .ear del servlet (PerfServletApp.ear) se encuentra en el directorio `<WAS_HOME>/installableApps`, donde `<WAS_HOME>` es la ruta de instalación de WebSphere Application Server.

El servlet de rendimiento se despliega exactamente igual que cualquier otro servlet. Despliega el servlet en una única instancia del servidor de aplicaciones dentro del dominio.

**Nota**: A partir de la versión 6.1, debes habilitar la seguridad de las aplicaciones para que el PerfServlet funcione.

### Modificar el conjunto de estadísticas monitorizadas

De forma predeterminada, el servidor de aplicaciones solo está configurado para una monitorización "básica". Para obtener visibilidad de tu JVM, conexiones JDBC y conexiones servlet, cambia el conjunto de estadísticas monitorizadas del servidor de aplicaciones de "Basic" (Básico) a "All" (Todos).

Desde la consola de administración de Websphere, puedes encontrar esta configuración en `Application servers > <YOUR_APP_SERVER> > Performance Monitoring Infrastructure (PMI)`.

Una vez realizado este cambio, haz clic en "Apply" (Aplicar) para guardar la configuración y reinicia el servidor de aplicaciones. Las métricas adicionales de JDBC, JVM y servlet deberían aparecer en Datadog poco después de este cambio.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `ibm_was.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para recopilar tus datos de rendimiento de IBM WAS. Consulta el [ejemplo de ibm_was.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/ibm_was/datadog_checks/ibm_was/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Luego, edita `ibm_was.d/conf.yaml` y quita los comentarios de las líneas `logs` de la parte inferior. Actualiza `path` con la ruta correcta a tus archivos de logs de WAS.

   ```yaml
   logs:
     - type: file
       path: /opt/IBM/WebSphere/AppServer/profiles/InfoSphere/logs/server1/*.log
       source: ibm_was
       service: websphere
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_was`                                                                     |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                 |
| `<INSTANCE_CONFIG>`  | `{"servlet_url": "http://%%host%%:%%port%%/wasPerfTool/servlet/perfservlet"}` |

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent . Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ibm_was", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `ibm_was` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **ibm_was.can_connect** <br>(gauge) | La capacidad de la integración para conectarse al Servlet Perf para recopilar métricas.|
| **ibm_was.jdbc.allocate_count** <br>(gauge) | El número total de connections (conexiones) gestionadas que se asignaron desde la creación del grupo.<br>_Mostrado como connection (conexión)_ |
| **ibm_was.jdbc.close_count** <br>(gauge) | El número total de connections (conexiones) gestionadas que se han destruido desde la creación del grupo.<br>_Mostrado como connection (conexión)_ |
| **ibm_was.jdbc.connection_handle_count** <br>(gauge) | El número de connections (conexiones) que están en uso. Puede incluir múltiples conexiones que se comparten desde una única connection (conexión) gestionada.<br>_Mostrado como connection (conexión)_ |
| **ibm_was.jdbc.create_count** <br>(gauge) | El número total de connections (conexiones) gestionadas que se han creado desde la creación del grupo.<br>_Mostrado como connection (conexión)_ |
| **ibm_was.jdbc.fault_count** <br>(gauge) | El número total de fallos, como tiempos de espera, en el grupo de connection (conexión).|
| **ibm_was.jdbc.free_pool_size** <br>(gauge) | El número de connections (conexiones) gestionadas que hay en el grupo libre.<br>_Mostrado como connection (conexión)_ |
| **ibm_was.jdbc.jdbc_time** <br>(gauge) | El tiempo medio en milisegundos empleado en la ejecución en el controlador JDBC que incluye el tiempo empleado en el controlador JDBC, la red y la base de datos.<br>_Mostrado como milisegundo_ |
| **ibm_was.jdbc.managed_connection_count** <br>(gauge) | El número total de connections (conexiones) gestionadas en los grupos libres, compartidos y no compartidos.<br>_Mostrado como connection (conexión)_ |
| **ibm_was.jdbc.percent_maxed** <br>(gauge) | El porcentaje del tiempo en que todas las connections (conexiones) están en uso.|
| **ibm_was.jdbc.percent_used** <br>(gauge) | El porcentaje del grupo que está en uso.|
| **ibm_was.jdbc.pool_size** <br>(gauge) | El tamaño del grupo de connection (conexión).|
| **ibm_was.jdbc.prep_stmt_cache_discard_count** <br>(gauge) | El número total de sentencias descartadas por el algoritmo de uso menos reciente (LRU) de la caché de sentencias.|
| **ibm_was.jdbc.return_count** <br>(gauge) | El número total de connections (conexiones) gestionadas que se han devuelto desde la creación del grupo.<br>_Mostrado como connection (conexión)_ |
| **ibm_was.jdbc.use_time** <br>(gauge) | El tiempo medio en milisegundos que una connection (conexión) está en uso.<br>_Mostrado como milisegundo_ |
| **ibm_was.jdbc.wait_time** <br>(gauge) | El tiempo medio de espera en milisegundos hasta que se concede una connection (conexión) si una connection (conexión) no está disponible en ese momento.<br>_Mostrado como milisegundo_ |
| **ibm_was.jdbc.waiting_thread_count** <br>(gauge) | El número de subprocesos que están esperando actualmente una connection (conexión).<br>_Mostrado como subproceso_ |
| **ibm_was.jvm.free_memory** <br>(gauge) | En desuso, utiliza ibm_was.jvm.free_memory_gauge en su lugar<br>_Mostrado kibibyte_ |
| **ibm_was.jvm.free_memory_gauge** <br>(gauge) | La memoria libre en el tiempo de ejecución de la JVM<br>_Mostrado como kibibyte_. |
| **ibm_was.jvm.heap_size** <br>(gauge) | En desuso, utiliza ibm_was.jvm.heap_size_gauge en su lugar<br>_Mostrado como kibibyte_ |
| **ibm_was.jvm.heap_size_gauge** <br>(gauge) | La memoria total en el tiempo de ejecución de la JVM<br>_Mostrado como kibibyte_. |
| **ibm_was.jvm.process_cpu_usage** <br>(gauge) | En desuso, utiliza ibm_was.jvm.process_cpu_usage_gauge en su lugar<br>_Mostrado como porcentaje_ |
| **ibm_was.jvm.process_cpu_usage_gauge** <br>(gauge) | El uso de la CPU (en porcentaje) de la máquina virtual Java.<br>_Mostrado como porcentaje_. |
| **ibm_was.jvm.up_time** <br>(gauge) | En desuso, utiliza ibm_was.jvm.up_time_gauge en su lugar<br>_Mostrado como segundo_ |
| **ibm_was.jvm.up_time_gauge** <br>(gauge) | La cantidad de tiempo que la JVM se está ejecutando<br>_Mostrado como segundo_ |
| **ibm_was.jvm.used_memory** <br>(gauge) | En desuso, utiliza ibm_was.jvm.used_memory_gauge en su lugar<br>_Mostrado como kibibyte_ |
| **ibm_was.jvm.used_memory_gauge** <br>(gauge) | La memoria utilizada en el tiempo de ejecución de la JVM<br>_Mostrado como kibibyte_. |
| **ibm_was.servlet_session.activate_non_exist_session_count** <br>(gauge) | El número de solicitudes para una sesión que ya no existe, presumiblemente porque la sesión expiró. Utiliza este contador para ayudar a determinar si el tiempo de espera es demasiado corto.<br>_Mostrado como solicitud_ |
| **ibm_was.servlet_session.active_count** <br>(gauge) | El número de sesiones activas simultáneamente. Una sesión está activa si WebSphere Application Server está procesando actualmente una solicitud que utiliza esa sesión.<br>_Mostrado como sesión_. |
| **ibm_was.servlet_session.affinity_break_count** <br>(gauge) | El número de solicitudes que se reciben para sesiones a las que se accedió por última vez desde otra aplicación web. Este valor puede indicar un procesamiento de conmutación por error o una configuración de complemento dañada.<br>_Mostrado como solicitud_. |
| **ibm_was.servlet_session.cache_discard_count** <br>(gauge) | El número de objetos de sesión que se han visto forzados a salir de la caché. Un algoritmo de uso menos reciente (LRU) elimina las entradas antiguas para dejar espacio a las nuevas sesiones y a las pérdidas de caché. Aplicable solo a sesiones persistentes.<br>_Mostrado como sesión_ |
| **ibm_was.servlet_session.create_count** <br>(gauge) | El número de sesiones que se han creado<br>_Mostrado como sesión_ |
| **ibm_was.servlet_session.external_read_size** <br>(gauge) | Tamaño de los datos de sesión leídos desde el almacén persistente. Aplicable solo a sesiones persistentes (serializadas); similar al tiempo de lectura externo.|
| **ibm_was.servlet_session.external_read_time** <br>(gauge) | El tiempo (ms) que se tarda en leer los datos de la sesión desde el almacén persistente. Para sesiones de varias filas, las métricas son para el atributo; para sesiones de una sola fila, las métricas son para toda la sesión. Aplicable solo a sesiones persistentes. Cuando se utiliza un almacén persistente de JMS, solo está disponible si los datos replicados están serializados.<br>_Mostrado como milisegundo_ |
| **ibm_was.servlet_session.external_write_size** <br>(gauge) | El tamaño de los datos de sesión escritos en el almacén persistente. Aplicable solo a sesiones persistentes (serializadas). Similar al tiempo de lectura externo.<br>_Mostrado como solicitud_ |
| **ibm_was.servlet_session.external_write_time** <br>(gauge) | El tiempo (milisegundos) que se tarda en escribir los datos de la sesión desde el almacén persistente. Aplicable solo para sesiones persistentes (serializadas). Similar al tiempo de lectura externo.<br>_Mostrado como milisegundo_ |
| **ibm_was.servlet_session.invalidate_count** <br>(gauge) | El número de sesiones invalidadas<br>_Mostrado como sesión_ |
| **ibm_was.servlet_session.life_time** <br>(gauge) | El tiempo medio de duración de la sesión en milisegundos (tiempo invalidado - tiempo creado)<br>_Mostrado como milisegundo_ |
| **ibm_was.servlet_session.live_count** <br>(gauge) | El número de sesiones locales que se almacenan actualmente en la memoria caché desde el momento en que se activa esta métrica.<br>_Mostrado como sesión_ |
| **ibm_was.servlet_session.no_room_for_new_session_count** <br>(gauge) | Solo se aplica a sesiones en memoria con AllowOverflow=false. El número de veces que no se puede gestionar una solicitud de nueva sesión porque supera el count máximo de sesiones.|
| **ibm_was.servlet_session.session_object_size** <br>(gauge) | El tamaño en bytes de (los atributos serializables de) sesiones en memoria. Solo se cuentan los objetos de sesión que contienen al menos un objeto de atributo serializable. Una sesión puede contener algunos atributos serializables y otros no. El tamaño en bytes es a nivel de sesión.|
| **ibm_was.servlet_session.time_since_last_activated** <br>(gauge) | La diferencia de tiempo en milisegundos entre las marcas de tiempo de acceso anterior y actual. No incluye el tiempo de espera de la sesión.<br>_Mostrado como milisegundo_ |
| **ibm_was.servlet_session.timeout_invalidation_count** <br>(gauge) | El número de sesiones invalidadas por tiempo de espera.<br>_Mostrado como sesión_ |
| **ibm_was.thread_pools.active_count** <br>(gauge) | El número de subprocesos activos simultáneamente<br>_Mostrado como subproceso_ |
| **ibm_was.thread_pools.active_time** <br>(gauge) | El tiempo medio en milisegundos que los subprocesos están en estado activo<br>_Mostrado como milisegundo_ |
| **ibm_was.thread_pools.cleared_thread_hang_count** <br>(gauge) | El número de subprocesos colgados eliminados<br>_Mostrado como subproceso_ |
| **ibm_was.thread_pools.concurrent_hung_thread_count** <br>(gauge) | El número de subprocesos colgados simultáneamente<br>_Mostrado como subproceso_ |
| **ibm_was.thread_pools.create_count** <br>(gauge) | El número total de subprocesos creados<br>_Mostrado como subproceso_ |
| **ibm_was.thread_pools.declaredthread_hung_count** <br>(gauge) | El número de hilos declarados colgados<br>_Mostrado como subproceso_ |
| **ibm_was.thread_pools.destroy_count** <br>(gauge) | El número total de subprocesos destruidos<br>_Mostrado como subproceso_ |
| **ibm_was.thread_pools.percent_maxed** <br>(gauge) | El porcentaje medio de tiempo que todos los subprocesos están en uso<br>_Mostrado como porcentaje_ |
| **ibm_was.thread_pools.percent_used** <br>(gauge) | El porcentaje medio del grupo que está en uso. El valor se basa en el número total de subprocesos configurados en ThreadPool y no en el tamaño actual del grupo.<br>_Mostrado como porcentaje_. |
| **ibm_was.thread_pools.pool_size** <br>(gauge) | El número medio de suprocesos en el grupo<br>_Mostrado como subproceso_ |

### Eventos

IBM WAS no incluye eventos.

### Checks de servicio

**ibm_was.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse al PerfServlet por algún motivo. Devuelve `OK` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica Datadog](https://docs.datadoghq.com/help/).
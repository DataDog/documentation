---
aliases:
- /es/integrations/ibm_mq
app_id: ibm-mq
categories:
- recopilación de logs
- colas de mensajes
- red
custom_kind: integración
description: IBM MQ es un servicio de colas de mensajes.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ibmmq-with-datadog
  tag: blog
  text: Monitoriza métricas y logs de IBM MQ con Datadog
integration_version: 8.3.0
media: []
supported_os:
- linux
- windows
- macos
title: IBM MQ
---
## Información general

Con este check se monitorizan las versiones 9.1 y superiores de [IBM MQ](https://www.ibm.com/products/mq).

## Configuración

### Instalación

El check de IBM MQ está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).

Para utilizar el check de IBM MQ, asegúrate de que esté instalado un [Cliente de IBM MQ](https://www.ibm.com/docs/en/ibm-mq/9.3?topic=roadmap-mq-downloads#mq_downloads_admins__familyraclients__title__1) versión 9.1+ (a menos que ya esté instalada una versión compatible del servidor IBM MQ en el host del Agent). Por ejemplo, el [cliente 9.3 Redistributable](https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm~WebSphere&product=ibm/WebSphere/WebSphere+MQ&release=9.3.0.0&platform=All&function=fixid&fixids=*IBM-MQC-Redist-*). Actualmente, el check de IBM MQ no admite la conexión a un servidor IBM MQ en z/OS.

#### En Linux

Actualiza `LD_LIBRARY_PATH` para incluir la localización de las bibliotecas. Crea esta variable de entorno si aún no existe.
Por ejemplo, si instalaste el cliente en `/opt`:

```text
export LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH
```

**Nota**: la versión 6 del Agent o superiores utilizan `upstart`, `systemd` o `launchd` para orquestar el servicio datadog-agent. Puede ser necesario añadir variables de entorno a los archivos de configuración del servicio en las siguientes localizaciones predeterminadas:

- Upstart (Linux): `/etc/init/datadog-agent.conf`
- Systemd (Linux): `/lib/systemd/system/datadog-agent.service`
- Launchd (MacOS): `~/Library/LaunchAgents/com.datadoghq.agent.plist`
  - Esto solo funciona si MacOS SIP está desactivado (podría no ser recomendable según tu política de seguridad). Esto se debe a la [variable de entorno `LD_LIBRARY_PATH` de purga de SIP](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/RuntimeProtections/RuntimeProtections.html#//apple_ref/doc/uid/TP40016462-CH3-SW1).

Ejemplo de la configuración para `systemd`:

```yaml
[Unit]
Description="Datadog Agent"
After=network.target
Wants=datadog-agent-trace.service datadog-agent-process.service
StartLimitIntervalSec=10
StartLimitBurst=5

[Service]
Type=simple
PIDFile=/opt/datadog-agent/run/agent.pid
Environment="LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH"
User=dd-agent
Restart=on-failure
ExecStart=/opt/datadog-agent/bin/agent/agent run -p /opt/datadog-agent/run/agent.pid

[Install]
WantedBy=multi-user.target
```

Ejemplo de la configuración para `upstart`:

```conf
description "Datadog Agent"

start on started networking
stop on runlevel [!2345]

respawn
respawn limit 10 5
normal exit 0

console log
env DD_LOG_TO_CONSOLE=false
env LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH

setuid dd-agent

script
  exec /opt/datadog-agent/bin/agent/agent start -p /opt/datadog-agent/run/agent.pid
end script

post-stop script
  rm -f /opt/datadog-agent/run/agent.pid
end script
```

Ejemplo de la configuración para `launchd`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>KeepAlive</key>
        <dict>
            <key>SuccessfulExit</key>
            <false/>
        </dict>
        <key>Label</key>
        <string>com.datadoghq.agent</string>
        <key>EnvironmentVariables</key>
        <dict>
            <key>DD_LOG_TO_CONSOLE</key>
            <string>false</string>
            <key>LD_LIBRARY_PATH</key>
            <string>/opt/mqm/lib64:/opt/mqm/lib</string>
        </dict>
        <key>ProgramArguments</key>
        <array>
            <string>/opt/datadog-agent/bin/agent/agent</string>
            <string>run</string>
        </array>
        <key>StandardOutPath</key>
        <string>/var/log/datadog/launchd.log</string>
        <key>StandardErrorPath</key>
        <string>/var/log/datadog/launchd.log</string>
        <key>ExitTimeOut</key>
        <integer>10</integer>
    </dict>
</plist>
```

Cada vez que se produce una actualización del Agent, estos archivos se borran y deben actualizarse de nuevo.

De manera alternativa, si utilizas Linux, asegúrate de que el conector del tiempo de ejecución pueda encontrar las bibliotecas una vez instalado el Cliente de MQ. Por ejemplo, con ldconfig:

Pon la localización de la biblioteca en un archivo de configuración ld.

```shell
sudo sh -c "echo /opt/mqm/lib64 > /etc/ld.so.conf.d/mqm64.conf"
sudo sh -c "echo /opt/mqm/lib > /etc/ld.so.conf.d/mqm.conf"
```

Actualiza los enlaces:

```shell
sudo ldconfig
```

#### En Windows

Hay un archivo llamado `mqclient.ini` en el directorio de datos de IBM MQ. Normalmente es `C:\ProgramData\IBM\MQ`.
Configura la variable de entorno `MQ_FILE_PATH` de modo que apunte hacia el directorio de datos.

### Permisos y autenticación

Hay muchas formas de configurar los permisos en IBM MQ. Según cómo funcione tu configuración, crea un usuario `datadog` dentro de MQ con permisos de solo lectura y, opcionalmente, permisos `+chg`. Los permisos `+chg` son necesarios para recopilar métricas para [restablecer estadísticas de cola](https://www.ibm.com/docs/en/ibm-mq/9.1?topic=formats-reset-queue-statistics) (`MQCMD_RESET_Q_STATS`). Si no deseas recopilar estas métricas, puedes desactivar `collect_reset_queue_metrics` en la configuración. La recopilación de datos de rendimiento de estadísticas de cola de restablecimiento también restablecerá los datos de rendimiento.

El siguiente ejemplo define los permisos necesarios en el gestor de colas `QM1` para el grupo `mqclient`, el grupo que el usuario `datadog` está utilizando para ejecutar comandos. Puedes utilizar comodines para conceder permisos a varias colas a la vez.

```shell
setmqaut -m QM1 -n SYSTEM.ADMIN.COMMAND.QUEUE -t queue -g mqclient +dsp +inq +get +put
setmqaut -m QM1 -n SYSTEM.MQEXPLORER.REPLY.MODEL -t queue -g mqclient +dsp +inq +get +put
```

**Nota**: "Queue Monitoring" (Monitorización de cola) debe estar habilitado en el servidor de MQ y configurado como mínimo en "Medium" (Intermedio). Esto se puede hacer mediante la interfaz de usuario de MQ o con un comando `mqsc` en el host del servidor:

```text
> /opt/mqm/bin/runmqsc
5724-H72 (C) Copyright IBM Corp. 1994, 2018.
Starting MQSC for queue manager datadog.


ALTER QMGR MONQ(MEDIUM) MONCHL(MEDIUM)
     1 : ALTER QMGR MONQ(MEDIUM) MONCHL(MEDIUM)
AMQ8005I: IBM MQ queue manager changed.

       :
One MQSC command read.
No commands have a syntax error.
All valid MQSC commands were processed.
```

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `ibm_mq.d/conf.yaml`, en la carpeta `conf.d/` de la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de IBM MQ. Consulta el [ejemplo de ibm_mq.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/ibm_mq/datadog_checks/ibm_mq/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.
   Hay muchas opciones para configurar IBM MQ, dependiendo de cómo lo utilices.

   - `channel`: el canal de IBM MQ.
   - `queue_manager`: el administrador de colas denominado.
   - `host`: el host donde se ejecuta IBM MQ.
   - `port`: el puerto que IBM MQ ha expuesto.
   - `convert_endianness`: debes habilitar esta opción si tu servidor de MQ se ejecuta en AIX o IBM i.

   Si utilizas una configuración de nombre de usuario y contraseña, puedes definir `username` y `password`. Si no defines ningún nombre de usuario, se utiliza el del propietario de procesos del Agent (`dd-agent`).

   **Nota**: El check solo monitoriza las colas que defines con el parámetro `queues`.

   ```yaml
   queues:
     - APP.QUEUE.1
     - ADMIN.QUEUE.1
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Luego, apunta el archivo de configuración hacia los archivos de logs de MQ adecuados. Puedes quitar las líneas al final del archivo de configuración de la integración de MQ y modificarlas como creas conveniente:

   ```yaml
     logs:
       - type: file
         path: '/var/mqm/log/<APPNAME>/active/AMQERR01.LOG'
         service: '<APPNAME>'
         source: ibm_mq
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: "\d{2}/\d{2}/\d{4}"
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_mq`                                                                                                                        |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                                                   |
| `<INSTANCE_CONFIG>`  | `{"channel": "DEV.ADMIN.SVRCONN", "queue_manager": "datadog", "host":"%%host%%", "port":"%%port%%", "queues":["<QUEUE_NAME>"]}` |

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "ibm_mq", "service": "<SERVICE_NAME>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{2}/\d{2}/\d{4}"}}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `ibm_mq` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **ibm_mq.channel.batch_interval** <br>(gauge) | Este atributo es un periodo durante el cual el canal mantiene abierto un lote aunque no haya mensajes en la cola de transmisión (identificador del parámetro: `BATCHINT`).<br>_Mostrado como segundo_ |
| **ibm_mq.channel.batch_size** <br>(gauge) | Este atributo es el número máximo de mensajes que deben enviarse antes de que se tome un punto de sincronización (identificador del parámetro: `BATCHSZ`).<br>_Mostrado como recurso_ |
| **ibm_mq.channel.batches** <br>(gauge) | Este atributo especifica el número de lotes completados (identificador del parámetro: `MQIACH_BATCHES`).|
| **ibm_mq.channel.buffers_rcvd** <br>(gauge) | Este atributo especifica el número de búferes recibidos (identificador del parámetro: `MQIACH_BUFFERS_RCVD`).<br>_Mostrado como búfer_ |
| **ibm_mq.channel.buffers_sent** <br>(gauge) | Este atributo especifica el número de búferes enviados (identificador del parámetro: `MQIACH_BUFFERS_SENT`)<br>_Mostrado como búfer_ |
| **ibm_mq.channel.bytes_rcvd** <br>(gauge) | Este atributo especifica el número de bytes recibidos (identificador del parámetro: `MQIACH_BYTES_RCVD`).<br>_Mostrado como byte_ |
| **ibm_mq.channel.bytes_sent** <br>(gauge) | Este atributo especifica el número de bytes enviados (identificador del parámetro: `MQIACH_BYTES_SENT`).<br>_Mostrado como byte_ |
| **ibm_mq.channel.channel_status** <br>(gauge) | Este atributo especifica el estado del canal (identificador del parámetro: `MQIACH_CHANNEL_STATUS`).|
| **ibm_mq.channel.channels** <br>(gauge) | El número de canales activos.<br>_Mostrado como recurso_ |
| **ibm_mq.channel.conn_status** <br>(gauge) | El estado connection (conexión) para el canal (identificador del parámetro: `MQIACH_CONNS`).<br>_Mostrado como connection (conexión)_ |
| **ibm_mq.channel.connections_active** <br>(gauge) | El número total de connections (conexiones) (instancias) de canal activas por canal.<br>_Mostrado como connection (conexión)_ |
| **ibm_mq.channel.count** <br>(gauge) | Suma por estado para contar canales. Filtra por canal y tags (etiquetas) de estado para crear notificaciones.|
| **ibm_mq.channel.current_msgs** <br>(gauge) | Este atributo especifica el número de mensajes en duda (identificador del parámetro: `MQIACH_CURRENT_MSGS`).<br>_Mostrado como mensaje_ |
| **ibm_mq.channel.disc_interval** <br>(gauge) | Este atributo es el tiempo tras el cual se cierra un canal, si no llega ningún mensaje durante ese periodo (identificador del parámetro: `DISCINT`).<br>_Mostrado como segundo_ |
| **ibm_mq.channel.hb_interval** <br>(gauge) | Este atributo especifica el tiempo aproximado entre flujos de latidos que se deben pasar desde una MCA emisora cuando no hay mensajes en la cola de transmisión (identificador del parámetro: `HBINT`).<br>_Mostrado como segundo_ |
| **ibm_mq.channel.indoubt_status** <br>(gauge) | Este atributo especifica el número si el canal está actualmente en duda (identificador del parámetro: `MQIACH_INDOUBT_STATUS`).|
| **ibm_mq.channel.keep_alive_interval** <br>(gauge) | Este atributo se utiliza para especificar un valor de tiempo de espera para un canal (identificador del parámetro: `KAINT`).<br>_Mostrado como segundo_ |
| **ibm_mq.channel.long_retry** <br>(gauge) | Este atributo especifica el número máximo de veces que el canal debe intentar asignar una sesión a su interlocutor (identificador del parámetro: `LONGRTY`).<br>_Mostrado como tiempo_ |
| **ibm_mq.channel.long_timer** <br>(gauge) | Este atributo es el intervalo aproximado en segundos que el canal debe esperar antes de volver a intentar establecer connection (conexión), durante el modo de reintento largo (identificador del parámetro: `LONGTMR`).<br>_Mostrado como segundo_ |
| **ibm_mq.channel.max_message_length** <br>(gauge) | Este atributo especifica la longitud máxima de un mensaje que puede transmitirse por el canal (identificador del parámetro: `MAXMSGL`).<br>_Mostrado como byte_ |
| **ibm_mq.channel.mca_status** <br>(gauge) | Este atributo especifica el estado de la MCA (identificador del parámetro: `MQIACH_MCA_STATUS`). |
| **ibm_mq.channel.mr_count** <br>(gauge) | Este atributo especifica el número de veces que el canal intenta volver a entregar el mensaje (identificador del parámetro: `MRRTY`).|
| **ibm_mq.channel.mr_interval** <br>(gauge) | Este atributo especifica el intervalo de tiempo mínimo que debe transcurrir antes de que el canal pueda reintentar la operación MQPUT (identificador del parámetro: `MRTMR`).<br>_Mostrado como segundo_ |
| **ibm_mq.channel.msgs** <br>(gauge) | Este atributo especifica el número de mensajes enviados o recibidos o el número de llamadas MQI gestionadas (identificador del parámetro: `MQIACH_MSGS`).<br>_Mostrado como mensaje_ |
| **ibm_mq.channel.network_priority** <br>(gauge) | Este atributo especifica la prioridad de la connection (conexión) de red. La cola distribuida elige la ruta con la prioridad más alta si hay varias rutas disponibles. El valor debe estar comprendido entre 0 y 9; 0 es la prioridad más baja (identificador del parámetro: NETPRTY).|
| **ibm_mq.channel.npm_speed** <br>(gauge) | Este atributo especifica la velocidad a la que deben enviarse los mensajes no persistentes (identificador del parámetro: `NPMSPEED`).|
| **ibm_mq.channel.sharing_conversations** <br>(gauge) | Este atributo especifica el número máximo de conversaciones que pueden compartir una instancia de canal asociada a este canal (identificador del parámetro: `SHARECNV`).|
| **ibm_mq.channel.short_retry** <br>(gauge) | Este atributo especifica el número máximo de intentos que realiza un canal emisor o servidor para establecer una connection (conexión) con la máquina remota (identificador del parámetro: `MQIACH_SHORT_RETRY`).|
| **ibm_mq.channel.short_timer** <br>(gauge) | Este atributo especifica el intervalo corto de espera de reintento para un canal emisor o servidor que inicia automáticamente el iniciador del canal (Identificador del parámetro: `MQIACH_SHORT_TIMER`).<br>_Mostrado como segundo_ |
| **ibm_mq.channel.ssl_key_resets** <br>(gauge) | El valor representa el número total de bytes no cifrados que se envían y reciben en el canal antes de que se renegocie la clave secreta (identificador del parámetro: `SSLRSTCNT`).|
| **ibm_mq.queue.backout_threshold** <br>(gauge) | Umbral de devolución (identificador de parámetro: `MQIA_BACKOUT_THRESHOLD`). Es decir, el número de veces que un mensaje se puede devolver antes de ser transferido a la cola de devolución especificada por BackoutRequeueName.<br>_Mostrado como recurso_. |
| **ibm_mq.queue.depth_current** <br>(gauge) | El número de mensajes actualmente en cola (identificador del parámetro: `MQIA_CURRENT_Q_DEPTH`).<br>_Mostrado como mensaje_ |
| **ibm_mq.queue.depth_high_event** <br>(gauge) | Límite alto de profundidad de cola (identificador del parámetro: `MQIA_Q_DEPTH_HIGH_LIMIT`). Este evento indica que una aplicación ha puesto un mensaje en una cola y esto ha provocado que el número de mensajes en la cola sea mayor o igual que el umbral alto de profundidad de cola.<br>_Mostrado como evento_. |
| **ibm_mq.queue.depth_high_limit** <br>(gauge) | Este atributo especifica el umbral con el que se compara la profundidad de la cola antes de generar un evento alto de cola (identificador del parámetro: `MQIA_Q_DEPTH_HIGH_LIMIT`).<br>_Mostrado como recurso_ |
| **ibm_mq.queue.depth_low_event** <br>(gauge) | Límite bajo de profundidad de cola (identificador del parámetro: `MQIA_Q_DEPTH_LOW_LIMIT`). Este evento indica que una aplicación ha recuperado un mensaje de una cola y esto ha provocado que el número de mensajes en la cola sea menor o igual al umbral bajo de profundidad de cola.<br>_Mostrado como evento_. |
| **ibm_mq.queue.depth_low_limit** <br>(gauge) | Este atributo especifica el límite bajo para la profundidad de la cola. Indica que una aplicación ha recuperado un mensaje de una cola y esto ha provocado que el número de mensajes en la cola sea menor o igual al umbral bajo de profundidad de cola (identificador del parámetro: MQIA_Q_DEPTH_LOW_LIMIT).<br>_Mostrado como elemento_ |
| **ibm_mq.queue.depth_max** <br>(gauge) | Profundidad máxima de la cola (identificador del parámetro: `MQIA_MAX_Q_DEPTH`). El número máximo de mensajes permitidos en la cola. Ten en cuenta que otros factores pueden hacer que la cola se considere llena; por ejemplo, aparecerá como llena si no hay almacenamiento disponible para un mensaje.<br>_Mostrado como mensaje_ |
| **ibm_mq.queue.depth_max_event** <br>(gauge) | Controla si se generan eventos de Cola llena (identificador del parámetro: `MQIA_Q_DEPTH_MAX_EVENT`).<br>_Mostrado como evento_ |
| **ibm_mq.queue.depth_percent** <br>(gauge) | El porcentaje de la cola que se utiliza actualmente.<br>_Mostrado como porcentaje_ |
| **ibm_mq.queue.harden_get_backout** <br>(gauge) | Si reforzar el count de mensajes devueltos. Especifica si el count de mensajes devueltos debe guardarse (reforzarse) en los reinicios del gestor de colas de mensajes (identificador del parámetro: `MQIA_HARDEN_GET_BACKOUT`).<br>_Mostrado como solicitud_ |
| **ibm_mq.queue.high_q_depth** <br>(gauge) | Este atributo especifica el número máximo de mensajes en una cola (identificador del parámetro: `MQIA_HIGH_Q_DEPTH`).<br>_Mostrado como mensaje_ |
| **ibm_mq.queue.inhibit_get** <br>(gauge) | Si se permiten las operaciones get (identificador del parámetro: `MQIA_INHIBIT_GET`).<br>_Mostrado como ocurrencia_ |
| **ibm_mq.queue.inhibit_put** <br>(gauge) | Este atributo especifica si están permitidas las operaciones put (identificador del parámetro: `MQIA_INHIBIT_PUT`).<br>_Mostrado como ocurrencia_ |
| **ibm_mq.queue.input_open_option** <br>(gauge) | Especifica la opción de uso compartido predeterminado para las aplicaciones que abren esta cola de entrada (identificador del parámetro: `MQIA_DEF_INPUT_OPEN_OPTION`).<br>_Mostrado como recurso_ |
| **ibm_mq.queue.last_get_time** <br>(gauge) | El tiempo transcurrido en segundos desde el último mensaje obtenido de una cola.<br>_Mostrado como segundo_ |
| **ibm_mq.queue.last_put_time** <br>(gauge) | El tiempo transcurrido en segundos desde el último mensaje puesto en cola.<br>_Mostrado como segundo_ |
| **ibm_mq.queue.max_channels** <br>(gauge) | Este atributo es el número máximo de canales que pueden ser actuales (identificador del parámetro: `MQIA_MAX_CHANNELS`).<br>_Mostrado como connection (conexión)_ |
| **ibm_mq.queue.max_message_length** <br>(gauge) | Este atributo especifica la longitud máxima del mensaje que puede transmitirse por el canal (identificador del parámetro: `MQIACH_MAX_MSG_LENGTH`). <br> Mostrado como recurso |
| **ibm_mq.queue.message_delivery_sequence** <br>(gauge) | El orden en que se devolverán los mensajes tras una operación get (identificador del parámetro: `MQIA_MSG_DELIVERY_SEQUENCE`).<br>_Mostrado como recurso_ |
| **ibm_mq.queue.msg_deq_count** <br>(count) | Este atributo especifica el número de mensajes puestos en cola (identificador del parámetro: `MQIA_MSG_DEQ_COUNT`).<br>_Mostrado como mensaje_ |
| **ibm_mq.queue.msg_enq_count** <br>(count) | Este atributo especifica el número de mensajes en cola (identificador del parámetro: `MQIA_MSG_ENQ_COUNT`).<br>_Mostrado como mensaje_ |
| **ibm_mq.queue.oldest_message_age** <br>(gauge) | La antigüedad, en segundos, del mensaje más antiguo de la cola (identificador del parámetro: `MSGAGE`).<br>_Mostrado como segundo_ |
| **ibm_mq.queue.open_input_count** <br>(gauge) | Número de llamadas MQOPEN que tienen la cola abierta para la entrada (identificador del parámetro: `MQIA_OPEN_INPUT_COUNT`).<br>_Mostrado como connection (conexión)_ |
| **ibm_mq.queue.open_output_count** <br>(gauge) | Número de llamadas MQOPEN que tienen la cola abierta para la salida (identificador del parámetro: `MQIA_OPEN_OUTPUT_COUNT`).<br>_Mostrado como connection (conexión)_ |
| **ibm_mq.queue.persistence** <br>(gauge) | Especifica el valor predeterminado para la persistencia de mensajes en la cola. La persistencia de mensajes determina si los mensajes se conservan o no en los reinicios del gestor de colas (identificador del parámetro: `MQIA_DEF_PERSISTENCE`).<br>_Mostrado como recurso_ |
| **ibm_mq.queue.priority** <br>(gauge) | Especifica la prioridad predeterminada de los mensajes puestos en cola (identificador del parámetro: `MQIA_DEF_PRIORITY`).<br>_Mostrado como recurso_ |
| **ibm_mq.queue.retention_interval** <br>(gauge) | El número de horas durante las que puede ser necesaria la cola, en función de la fecha y hora en que se creó la cola (identificador del parámetro: `MQIA_RETENTION_INTERVAL`).<br>_Mostrado como hora_ |
| **ibm_mq.queue.scope** <br>(gauge) | Ámbito de la definición de cola (identificador del parámetro: `MQIA_SCOPE`). En OS/400, esto es válido para la recepción por MQSeries para AS/400 V4R2 o posterior. Especifica si el ámbito de la definición de la cola no se extiende más allá del gestor de colas propietario de la cola o si el nombre de la cola está contenido en un directorio de celda, de modo que sea conocido por todos los gestores de colas dentro de la celda.<br>_Mostrado como recurso_ |
| **ibm_mq.queue.service_interval** <br>(gauge) | Este atributo especifica el objetivo para el intervalo de servicio de cola. Se utiliza como comparación para generar los eventos Intervalo de servicio de cola alto e Intervalo de servicio de cola OK (identificador del parámetro: `MQIA_Q_SERVICE_INTERVAL`).<br>_Mostrado como milisegundo_. |
| **ibm_mq.queue.service_interval_event** <br>(gauge) | Controla si se generan eventos de Intervalo de Servicio Alto o Intervalo de Servicio OK (identificador del parámetro: `MQIA_Q_SERVICE_INTERVAL_EVENT`).<br>_Mostrado como ocurrencia_ |
| **ibm_mq.queue.time_since_reset** <br>(count) | Este atributo especifica el tiempo transcurrido desde el restablecimiento de las estadísticas en segundos (identificador del parámetro: `MQIA_TIME_SINCE_RESET`).<br>_Mostrado como segundo_ |
| **ibm_mq.queue.trigger_control** <br>(gauge) | Este atributo especifica si los mensajes de activación se escriben en la cola de iniciación (identificador del parámetro: `MQIA_TRIGGER_CONTROL`).<br>_Mostrado como método_ |
| **ibm_mq.queue.trigger_depth** <br>(gauge) | Este atributo especifica el número de mensajes que iniciarán un mensaje de activación a la cola de iniciación (identificador del parámetro: `MQIA_TRIGGER_DEPTH`). <br> _Mostrado como recurso_ |
| **ibm_mq.queue.trigger_message_priority** <br>(gauge) | Umbral de prioridad de mensajes para activadores (identificador del parámetro: `MQIA_TRIGGER_MSG_PRIORITY`). Especifica la prioridad mínima que debe tener un mensaje antes de que pueda causar o ser contado para un evento de activación. El valor debe estar dentro del rango de valores de prioridad admitidos (de 0 a 9).<br>_Mostrado como recurso_ |
| **ibm_mq.queue.trigger_type** <br>(gauge) | Las condiciones en las que se escriben los mensajes de activación como resultado de los mensajes que llegan a esta cola (identificador del parámetro: `MQIA_TRIGGER_TYPE`).<br>_Mostrado como recurso_ |
| **ibm_mq.queue.type** <br>(gauge) | Tipo de cola a la que resuelve el alias (identificador del parámetro: `MQIA_Q_TYPE`).<br>_Mostrado como recurso_ |
| **ibm_mq.queue.uncommitted_msgs** <br>(gauge) | Especifica el número máximo de mensajes no confirmados. Es decir, el número de mensajes que se pueden recuperar, el número de mensajes que se pueden poner y cualquier mensaje de activación generado dentro de esta unidad de trabajo (identificador del parámetro: `MQIA_MAX_UNCOMMITTED_MSGS`).<br>_Mostrado como mensaje_ |
| **ibm_mq.queue.usage** <br>(gauge) | Este atributo indica si la cola es para uso normal o para transmitir mensajes a un gestor remoto de colas de mensajes (identificador del parámetro: `MQIA_USAGE`).<br>_Mostrado como recurso_ |
| **ibm_mq.queue_manager.dist_lists** <br>(gauge) | Especifica si los mensajes de la lista de distribución pueden colocarse en la cola (identificador del parámetro: `MQIA_DIST_LISTS`).<br>_Mostrado como recurso_ |
| **ibm_mq.queue_manager.max_msg_list** <br>(gauge) | Especifica la longitud máxima del mensaje que puede transmitirse por el canal. Se compara con el valor del canal remoto y el máximo real es el menor de los dos valores (identificador del parámetro: `MQIACH_MAX_MSG_LENGTH`).<br>_Mostrado como byte_. |
| **ibm_mq.stats.channel.avg_batch_size** <br>(gauge) | El tamaño medio de los lotes procesados por el canal (identificador del parámetro: `MQIAMO_AVG_BATCH_SIZE`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.channel.bytes** <br>(count) | El número de bytes enviados o recibidos para mensajes persistentes y no persistentes. (identificador del parámetro: `QCSTNBYT`).<br>_Mostrado como mensaje_. |
| **ibm_mq.stats.channel.full_batches** <br>(count) | El número de lotes procesados por el canal que se enviaron porque se alcanzó el valor de los atributos del canal BATCHSZ o BATCHLIM (identificador del parámetro: `MQIAMO_FULL_BATCHES`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.channel.incomplete_batches** <br>(count) | El número de lotes procesados por el canal, que se enviaron sin que se alcanzara el valor del atributo BATCHSZ del canal (identificador del parámetro: `MQIAMO_INCOMPLETE_BATCHES`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.channel.msgs** <br>(count) | El número de mensajes persistentes y no persistentes enviados o recibidos (identificador del parámetro: `QCSTNMSG`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.channel.put_retries** <br>(count) | El número de veces en el intervalo de tiempo que un mensaje no pudo ser puesto y entró en un bucle de reintento (identificador del parámetro: `MQIAMO_PUT_RETRIES`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.avg_q_time** <br>(gauge) | La latencia media, en microsegundos, de los mensajes recuperados destructivamente de la cola durante el periodo de monitorización para mensajes persistentes y no persistentes (identificador del parámetro: `MQIAMO64_AVG_Q_TIME`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.browse_bytes** <br>(gauge) | El número de bytes leídos en solicitudes get no destructivas para mensajes persistentes y no persistentes (identificador del parámetro: `MQIAMO64_BROWSE_BYTES`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.browse_count** <br>(count) | El número de solicitudes de get no destructivas con éxito para mensajes persistentes y no persistentes (identificador del parámetro: `MQIAMO_BROWSES`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.browse_fail_count** <br>(count) | El número de solicitudes get no destructivas fallidas (identificador del parámetro: `MQIAMO_BROWSES_FAILED`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.expired_msg_count** <br>(count) | El número de mensajes persistentes y no persistentes descartados por haber caducado antes de poder ser recuperados (identificador del parámetro: `MQIAMO_MSGS_EXPIRED`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.get_bytes** <br>(count) | El número de bytes leídos en solicitudes put destructivas para mensajes persistentes y no persistentes (identificador del parámetro: `MQIAMO64_GET_BYTES`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.get_count** <br>(count) | El número de solicitudes de get destructivas con éxito para mensajes persistentes y no persistentes (identificador del parámetro: `MQIAMO_GETS`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.get_fail_count** <br>(count) | El número de solicitudes de get destructivas fallidas (identificador del parámetro: `MQIAMO_GETS_FAILED`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.non_queued_msg_count** <br>(count) | El número de mensajes que eludieron la cola y se transfirieron directamente a una aplicación en espera. Este número representa cuántas veces WebSphere MQ pudo eludir la cola y no el número de veces que una aplicación estuvo en espera (identificador del parámetro: MQIAMO_MSGS_NOT_QUEUED).<br>_Mostrado como mensaje_. |
| **ibm_mq.stats.queue.purge_count** <br>(count) | El número de mensajes purgados (identificador dl parámetro: `MQIAMO_MSGS_PURGED`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.put1_count** <br>(count) | El número de mensajes persistentes y no persistentes colocados con éxito en la cola mediante llamadas MQPUT1 (identificador del parámetro: `MQIAMO_PUT1S`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.put1_fail_count** <br>(count) | El número de intentos fallidos de poner un mensaje utilizando llamadas MQPUT1 (identificador del parámetro: `MQIAMO_PUT1S_FAILED`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.put_bytes** <br>(count) | El número de bytes escritos en solicitudes put a la cola para mensajes persistentes y no persistentes (identificador del parámetro: `MQIAMO64_PUT_BYTES`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.put_count** <br>(count) | El número de mensajes persistentes y no persistentes colocados con éxito en la cola, a excepción de las solicitudes MQPUT1 (identificador del parámetro: `MQIAMO_PUTS`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.put_fail_count** <br>(count) | El número de intentos fallidos de poner un mensaje en la cola (identificador del parámetro: `MQIAMO_PUTS_FAILED`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.q_max_depth** <br>(gauge) | La profundidad máxima de la cola durante el periodo de monitorización (identificador del parámetro: `MQIAMO_Q_MAX_DEPTH`).<br>_Mostrado como mensaje_ |
| **ibm_mq.stats.queue.q_min_depth** <br>(gauge) | La profundidad mínima de la cola durante el periodo de monitorización (identificador del parámetro: `MQIAMO_Q_MIN_DEPTH`).<br>_Mostrado como mensaje_ |

### Eventos

IBM MQ no incluye eventos.

### Checks de servicio

**ibm_mq.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse al servidor MQ por cualquier motivo o `UNKNOWN` si el gestor de colas configurado no coincide con la opción `queue_manager_process`. En caso contrario, devuelve `OK`.

_Estados: ok, crítico, desconocido_

**ibm_mq.queue_manager**

Devuelve `CRITICAL` si el Agent no puede recuperar estadísticas del gestor de colas o `UNKNOWN` si el gestor de colas configurado no coincide con la opción `queue_manager_process`. En caso contrario, devuelve `OK`.

_Estados: ok, crítico, desconocido_

**ibm_mq.queue**

Devuelve `CRITICAL` si el Agent no puede recuperar las estadísticas de la cola. En caso contrario, devuelve `OK`.

_Estados: ok, crítico_

**ibm_mq.channel**

Devuelve `CRITICAL` si el Agent no puede recuperar las estadísticas del canal. En caso contrario, devuelve `OK`.

_Estados: ok, crítico_

**ibm_mq.channel.status**

Devuelve `CRITICAL` si el estado es INACTIVO/DETENIDO/PARADA. Devuelve `OK` si el estado es EN EJECUCIÓN. Devuelve `WARNING` si el estado puede ser EN EJECUCIÓN.

_Estados: ok, crítico, advertencia, desconocido_

## Solucionar problemas

### Advertencia de permiso MQRC_NOT_AUTHORIZED de las estadísticas de cola de restablecimiento

Si recibes la siguiente advertencia:

```
Warning: Error getting pcf queue reset metrics for SAMPLE.QUEUE.1: MQI Error. Comp: 2, Reason 2035: FAILED: MQRC_NOT_AUTHORIZED
```

Esto se debe a que el usuario `datadog` no tiene el permiso `+chg` para recopilar métricas de restablecimiento de cola. Para solucionarlo, puedes otorgar permisos de `+chg` al usuario `datadog` [mediante `setmqaut`](https://www.ibm.com/docs/en/ibm-mq/9.2?topic=reference-setmqaut-grant-revoke-authority) y recopilar métricas de restablecimiento de colas o puedes desactivar `collect_reset_queue_metrics`:

```yaml
collect_reset_queue_metrics: false
```

### Utilización de recursos elevada

El check de IBM MQ realiza consultas en el servidor, y a veces estas consultas pueden ser costosas y provocar una degradación en el check.

Si observas que el check tarda demasiado en ejecutarse o que consume muchos recursos de tu host,
puedes reducir potencialmente el contexto del check al intentar lo siguiente:

- Si utilizas `auto_discover_queues`, prueba usar `queue_patterns` o `queue_regex` en su lugar para descubrir solo determinadas colas. Esto es especialmente importante si tu sistema crea colas dinámicas.
- Si utilizas el autodescubrimiento de colas con `queue_patterns` o `queue_regex`, intenta ajustar el patrón o regex para que coincida con _menos_ colas.
- Deshabilita `auto_discover_channels` si tienes demasiados canales.
- Deshabilita `collect_statistics_metrics`.

### Errores en los logs

- `Unpack for type ((67108864,)) not implemented`: si ves errores como éste y tu servidor de MQ se ejecuta en un sistema operativo de IBM, habilita `convert_endianness` y reinicia el Agent.

### Advertencias en los logs

- `Error getting [...]: MQI Error. Comp: 2, Reason 2085: FAILED: MQRC_UNKNOWN_OBJECT_NAME`: Si ves mensajes como este, es porque la integración está intentando recopilar métricas de una cola que no existe. Esto puede deberse a una configuración incorrecta o, si estás utilizando `auto_discover_queues`, la integración puede descubrir una [cola dinámica](https://www.ibm.com/docs/en/ibm-mq/9.2?topic=queues-dynamic-model) y luego, cuando intenta recopilar sus métricas, la cola ya no existe. En este caso, puedes mitigar el problema proporcionando una `queue_patterns` o `queue_regex` más estricta o simplemente ignorar la advertencia.

### Otro

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitoriza métricas y logs de IBM MQ con Datadog](https://www.datadoghq.com/blog/monitor-ibmmq-with-datadog)
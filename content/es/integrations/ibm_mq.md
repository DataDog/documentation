---
app_id: ibm-mq
app_uuid: d29a1df9-6038-41f5-b017-82bf45f58767
assets:
  dashboards:
    IBM MQ: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_mq.queue.usage
      metadata_path: metadata.csv
      prefix: ibm_mq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10049
    source_type_name: IBM MQ
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- colas de mensajes
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_mq/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_mq
integration_id: ibm-mq
integration_title: IBM MQ
integration_version: 8.2.0
is_public: true
manifest_version: 2.0.0
name: ibm_mq
public_title: IBM MQ
short_description: IBM MQ es un servicio de colas de mensajes.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Colas de mensajes
  - Categoría::Red
  - SO compatible::Linux
  - SO compatible::Windows
  - SO compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: IBM MQ es un servicio de colas de mensajes.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-ibmmq-with-datadog
  support: README.md#Soporte
  title: IBM MQ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [IBM MQ][1] a partir de la versión 9.1.

## Configuración

### Instalación

El check de IBM MQ está incluido en el paquete del [Datadog Agent][2].

Para utilizar el check de IBM MQ, asegúrate de tener instalada la versión 9.1 del [Cliente de IBM MQ][3] o una superior (a menos que ya tengas instalada una versión compatible del servidor de IBM MQ en el host del Agent). Por ejemplo, el [Cliente redistribuible 9.3][4]. Actualmente, el check de IBM MQ no admite la conexión a un servidor de IBM MQ en z/OS.

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
  - Esto solo funciona si la MacOS SIP está deshabilitada (podría no ser lo recomendado dependiendo de tu política de seguridad). Esto se debe a que la [SIP purga la variable de entorno `LD_LIBRARY_PATH`][5].

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

De manera alternativa, si utilizas Linux, asegúrese de que el conector del tiempo de ejecución pueda encontrar las bibliotecas una vez instalado el Cliente de MQ. Por ejemplo, con ldconfig:

Pon la localización de la librería en un archivo de configuración ld.

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

Hay muchas formas de configurar los permisos en IBM MQ. Dependiendo de cómo funcione tu configuración, crea un usuario `datadog` dentro de MQ con permisos de solo lectura y, de manera opcional, permisos `+chg`. Se requieren permisos `+chg` para recopilar métricas de [estadísticas de cola de restablecimiento][6] (`MQCMD_RESET_Q_STATS`). Si no quieres recopilar estas métricas, puedes deshabilitar `collect_reset_queue_metrics` en la configuración. La recopilación de datos de rendimiento de las estadísticas de cola de restablecimiento también restablecerá los datos de rendimiento.

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

#### Host

A fin de configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `ibm_mq.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de IBM MQ. Consulta el [archivo de ejemplo ibm_mq.d/conf.yaml][1] para conocer todas las opciones de configuración disponibles.
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

2. [Reinicia el Agent][2].

##### Recopilación de logs

_Disponible para la versión 6.0 o posterior del Agent_

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Luego, apunta el archivo de configuración hacia los archivos de logs de MQ adecuados. Puedes quitar las líneas al final del archivo de configuración de la integración de MQ y modificarlas como creas conveniente:

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

3. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_mq/datadog_checks/ibm_mq/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### En contenedores

En el caso de los entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_mq`                                                                                                                        |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                                                   |
| `<INSTANCE_CONFIG>`  | `{"channel": "DEV.ADMIN.SVRCONN", "queue_manager": "datadog", "host":"%%host%%", "port":"%%port%%", "queues":["<QUEUE_NAME>"]}` |

##### Recopilación de logs

_Disponible para la versión 6.0 o posterior del Agent_

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "ibm_mq", "service": "<SERVICE_NAME>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{2}/\d{2}/\d{4}"}}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `ibm_mq` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ibm_mq" >}}


### Eventos

IBM MQ no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "ibm_mq" >}}


## Resolución de problemas

### Advertencia de permiso MQRC_NOT_AUTHORIZED de las estadísticas de cola de restablecimiento

Si recibes la siguiente advertencia:

```
Warning: Error getting pcf queue reset metrics for SAMPLE.QUEUE.1: MQI Error. Comp: 2, Reason 2035: FAILED: MQRC_NOT_AUTHORIZED
```

Esto se debe a que el usuario `datadog` no tiene el permiso `+chg` para recopilar las métricas de cola de restablecimiento. Para solucionarlo, puedes otorgar permisos `+chg` al usuario `datadog` [mediante `setmqaut`][8] y recopilar las métricas de cola de restablecimiento, o bien puedes deshabilitar `collect_reset_queue_metrics`:

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

- `Error getting [...]: MQI Error. Comp: 2, Reason 2085: FAILED: MQRC_UNKNOWN_OBJECT_NAME`: si ves mensajes como este, es porque la integración está intentando recopilar métricas de una cola que no existe. Esto puede deberse a una configuración incorrecta o, si estás utilizando `auto_discover_queues`, la integración puede detectar una [cola dinámica][9] y luego, cuando intenta recopilar sus métricas, la cola ya no existe. En este caso, puedes mitigar el problema proporcionando `queue_patterns` o `queue_regex` más estrictos, o simplemente puedes ignorar la advertencia.

### Otro

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Para leer más

Más enlaces, artículos y documentación útiles:

- [Monitorizar métricas y logs de IBM MQ con Datadog][11]


[1]: https://www.ibm.com/products/mq
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://www.ibm.com/docs/en/ibm-mq/9.3?topic=roadmap-mq-downloads#mq_downloads_admins__familyraclients__title__1
[4]: https://www.ibm.com/support/fixcentral/swg/selectFixes?parent=ibm~WebSphere&product=ibm/WebSphere/WebSphere+MQ&release=9.3.0.0&platform=All&function=fixid&fixids=*IBM-MQC-Redist-*
[5]: https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/RuntimeProtections/RuntimeProtections.html#//apple_ref/doc/uid/TP40016462-CH3-SW1
[6]: https://www.ibm.com/docs/en/ibm-mq/9.1?topic=formats-reset-queue-statistics
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://www.ibm.com/docs/en/ibm-mq/9.2?topic=reference-setmqaut-grant-revoke-authority
[9]: https://www.ibm.com/docs/en/ibm-mq/9.2?topic=queues-dynamic-model
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.datadoghq.com/blog/monitor-ibmmq-with-datadog

---
app_id: ping
categories:
- herramientas de desarrollo
- la red
custom_kind: integración
description: Monitoriza la conectividad a hosts remotos.
integration_version: 1.0.2
media: []
supported_os:
- Linux
- Windows
- macOS
title: Ping
---
## Información general

Este check utiliza el comando [ping](https://en.wikipedia.org/wiki/Ping_%28networking_utility%29) del sistema para comprobar la accesibilidad de un host.
También mide opcionalmente el tiempo de ida y vuelta de los mensajes enviados desde el check al host de destino.

Ping funciona enviando paquetes de solicitud de eco del Protocolo de mensajes de control de Internet (ICMP) al host de destino y esperando una respuesta de eco ICMP.

Este check utiliza el comando ping del sistema, en lugar de generar la solicitud de eco del ICMP, ya que la creación de un paquete ICMP requiere un socket sin procesar. La creación de sockets sin procesar requiere privilegios raíz que el Agent no tiene. El comando ping utiliza el marcador de acceso `setuid` para ejecutarse con privilegios elevados y evitar este inconveniente.

**Nota para los usuarios de Windows **: Es posible que este check no funcione correctamente si el idioma del Windows instalado no está configurado en inglés.

## Configuración

El check de Ping no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Ping en tu host. Consulta [Uso de integraciones comunitarias](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para instalar con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   # Linux
   sudo -u dd-agent -- datadog-agent integration install -t datadog-ping==<INTEGRATION_VERSION>

   # Windows
   agent.exe integration install -t datadog-ping==<INTEGRATION_VERSION>
   ```

1. Instala el binario `ping` en función de tu sistema operativo. Por ejemplo, ejecuta el siguiente comando para Ubuntu:

   ```shell
   apt-get install iputils-ping
   ```

1. Configura tu integración de forma similar a las [integraciones] centrales (https://docs.datadoghq.com/getting_started/integrations/).

### Configuración

1. Edita el archivo `ping.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Ping. Consulta el [ejemplo ping.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/ping/datadog_checks/ping/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

Ejecuta el [subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#service-status) y busca `ping` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **network.ping.response_time** <br>(gauge) | Tiempo de respuesta de un host y un puerto de ping determinados, etiquetado con url, por ejemplo, 'host:192.168.1.100'.<br>_Se muestra como milisegundos_ |
| **network.ping.can_connect** <br>(gauge) | Valor de 1 si el Agent puede comunicarse con éxito con el host de destino, 0 en caso contrario|

### Eventos

El check de Ping no incluye eventos.

### Checks de servicio

**network.ping.can_connect**

Devuelve CRITICAL si el Agent no puede comunicarse con el host de destino. Devuelve OK si el ping tiene éxito.

_Estados: ok, crítico_

## Solucionar problemas

### Error `SubprocessOutputEmptyError: get_subprocess_output expected output but had none`

Mientras ejecutas la integración Ping, puedes ver un error como el siguiente:

```
      Traceback (most recent call last):
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/base/checks/base.py", line 1006, in run
          self.check(instance)
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/ping/ping.py", line 65, in check
          lines = self._exec_ping(timeout, host)
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/ping/ping.py", line 48, in _exec_ping
          lines, err, retcode = get_subprocess_output(
        File "/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/base/utils/subprocess_output.py", line 56, in get_subprocess_output
          out, err, returncode = subprocess_output(cmd_args, raise_on_empty_output, env=env)
      _util.SubprocessOutputEmptyError: get_subprocess_output expected output but had none.
```

Debido a que la integración Ping no está incluida por defecto en el Agent, el binario `ping` tampoco está incluido con el Agent. Debes instalar el binario `ping` para poder ejecutar la integración con éxito.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).
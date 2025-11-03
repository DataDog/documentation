---
app_id: ping
app_uuid: 841c9313-628f-4861-ad0b-2d12c37ee571
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: network.ping.response_time
      metadata_path: metadata.csv
      prefix: red.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10200
    source_type_name: Ping
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: jim.stanton@datadoghq.com
  support_email: jim.stanton@datadoghq.com
categories:
- herramientas de desarrollo
- la red
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ping/README.md
display_on_public_website: true
draft: false
git_integration_title: ping
integration_id: ping
integration_title: Ping
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: ping
public_title: Ping
short_description: Monitoriza la conectividad a hosts remotos.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Herramientas de desarrollo
  - Categoría::Red
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza la conectividad a hosts remotos.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Ping
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Este check utiliza el comando [ping][1] del sistema para comprobar la accesibilidad de un host.
También mide opcionalmente el tiempo de ida y vuelta de los mensajes enviados desde el check al host de destino.

El ping funciona enviando paquetes de solicitud de eco del Protocolo de mensajes de control de Internet (ICMP) al host de destino y esperando una respuesta de eco ICMP.

Este check utiliza el comando ping del sistema, en lugar de generar la solicitud de eco del ICMP, ya que la creación de un paquete ICMP requiere un socket sin procesar. La creación de sockets sin procesar requiere privilegios raíz que el Agent no tiene. El comando ping utiliza el marcador de acceso `setuid` para ejecutarse con privilegios elevados y evitar este inconveniente.

**Nota para los usuarios de Windows **: Es posible que este check no funcione correctamente si el idioma del Windows instalado no está configurado en inglés.

## Configuración

El check ping no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para versiones 7.21/6.21 o posteriores del Agent, sigue las siguientes instrucciones para instalar el check ping en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   # Linux
   sudo -u dd-agent -- datadog-agent integration install -t datadog-ping==<INTEGRATION_VERSION>

   # Windows
   agent.exe integration install -t datadog-ping==<INTEGRATION_VERSION>
   ```
2. Instala el binario `ping` en función de tu sistema operativo. Por ejemplo, ejecuta el siguiente comando para Ubuntu:
   ```shell
   apt-get install iputils-ping
   ```

3. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `ping.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de tu ping. Para conocer todas las opciones de configuración disponibles, consulta el [ignite.d/conf.yaml de ejemplo][5].

2. [Reinicia el Agent][6].

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `ping` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ping" >}}


### Eventos

El check ping no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "ping" >}}


## Solucionar problemas

### Error `SubprocessOutputEmptyError: get_subprocess_output expected output but had none`
Mientras ejecutas la integración del ping, puedes ver un error como el siguiente:

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

Debido a que la integración del ping no está incluida por defecto en el Agent, el binario `ping` tampoco está incluido en el Agent. Para poder ejecutar la integración con éxito, debes instalar el binario `ping`.


¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://en.wikipedia.org/wiki/Ping_%28networking_utility%29
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ping/datadog_checks/ping/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#service-status
[8]: https://github.com/DataDog/integrations-extras/blob/master/ping/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/ping/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/
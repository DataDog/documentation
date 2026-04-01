---
algolia:
  tags:
  - uninstall
  - uninstalling
aliases:
- /es/guides/basic_agent_usage/amazonlinux/
- /es/guides/basic_agent_usage/centos/
- /es/guides/basic_agent_usage/deb/
- /es/agent/basic_agent_usage/install_debian_5/
- /es/guides/basic_agent_usage/fedora/
- /es/guides/basic_agent_usage/redhat/
- /es/guides/basic_agent_usage/suse/
- /es/guides/basic_agent_usage/ubuntu/
- /es/agent/basic_agent_usage/alma/
- /es/agent/basic_agent_usage/amazonlinux/
- /es/agent/basic_agent_usage/centos/
- /es/agent/basic_agent_usage/deb/
- /es/agent/basic_agent_usage/fedora/
- /es/agent/basic_agent_usage/oracle/
- /es/agent/basic_agent_usage/redhat/
- /es/agent/basic_agent_usage/ubuntu/
- /es/agent/basic_agent_usage/suse/
- /es/agent/basic_agent_usage/rocky/
- /es/agent/basic_agent_usage/linux/
further_reading:
- link: /logs/
  tag: Documentation
  text: Recoge tus registros
- link: /infrastructure/process/
  tag: Documentation
  text: Recoge tus procesos
- link: /tracing/
  tag: Documentation
  text: Recoge tus trazas
- link: /agent/architecture/#agent-architecture
  tag: Documentation
  text: Descubre más sobre la arquitectura del Agente
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: Configura los puertos de entrada
platform: Linux
title: Linux
---
## Resumen

Esta página describe las características básicas del Agente de Datadog para entornos de Linux. Consulta la documentación de [Plataformas Soportadas][5] para la lista completa de distribuciones y versiones de Linux soportadas.

## Instala el Agente
Para instalar el Agente en Linux, sigue las [instrucciones en la aplicación en Fleet Automation][6], y ejecuta el script generado en tus hosts.

{{< img src="/agent/basic_agent_usage/linux_img_july_25.png" alt="Pasos de instalación en la aplicación para el Agente de Datadog en un host de Linux." style="width:90%;">}}


## Configura el Agente
El archivo de configuración del Agente de Datadog se encuentra en `/etc/datadog-agent/datadog.yaml`. Este archivo YAML contiene los detalles de conexión a nivel de host utilizados para enviar datos a Datadog, incluyendo:
- `api_key`: La [clave API de Datadog][7] de tu organización
- `site`: Región de Datadog objetivo (por ejemplo `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`)
- `proxy`: Puntos finales de proxy HTTP/HTTPS para tráfico saliente (ver [Configuración del Proxy del Agente de Datadog][8])
- Etiquetas predeterminadas, nivel de registro y configuraciones de Datadog

Un archivo de referencia completamente comentado, ubicado en `/etc/datadog-agent/datadog.yaml.example`, lista todas las opciones disponibles para comparación o para copiar y pegar. Alternativamente, consulte el archivo de muestra `config_template.yaml` para todas las opciones de configuración disponibles.

### Archivos de integración
Los archivos de configuración para integraciones se encuentran en `/etc/datadog-agent/conf.d/`. Cada integración tiene su propio subdirectorio, `<INTEGRATION>.d/`, que contiene:
- `conf.yaml`: La configuración activa que controla cómo la integración recopila métricas y registros
- `conf.yaml.example`: Un ejemplo que ilustra las claves y valores predeterminados soportados


## Comandos

| Descripción   | Comando               |
|---------------|-----------------------|
| Iniciar el Agente como un servicio           | `sudo systemctl start datadog-agent`                   |
| Detener el Agente que se ejecuta como un servicio    | `sudo systemctl stop datadog-agent`                    |
| Reiniciar el Agente que se ejecuta como un servicio | `sudo systemctl restart datadog-agent`                 |
| Estado del servicio del Agente            | `sudo systemctl status datadog-agent`                  |
| Página de estado del Agente en ejecución       | `sudo datadog-agent status`                            |
| Enviar señal                         | `sudo datadog-agent flare`                             |
| Mostrar uso del comando              | `sudo datadog-agent --help`                            |
| Ejecutar una verificación                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

**Nota**: Para sistemas basados en upstart, como `CentOS/RHEL 6` o `SUSE 11`, intercambie `systemctl <action>` con `<action>`. Por ejemplo, al iniciar un Agente como servicio en un `SUSE 11` sistema, usa `sudo start datadog-agent`.


## Desinstalar el Agente

Para desinstalar el Agente, ejecuta el comando para el entorno de Linux correspondiente:


### Para CentOS, Rocky, AlmaLinux, Amazon Linux, Oracle Linux y Red Hat

```shell
sudo yum remove datadog-agent
```

### Para Debian, Ubuntu

```shell
sudo apt-get remove datadog-agent -y
```

### Para SUSE

```shell
sudo zypper remove datadog-agent
```

<div class="alert alert-info">

**Los comandos anteriores eliminan el Agente, pero no eliminan**:
* El archivo de configuración `datadog.yaml`
* Archivos creados por el usuario en la carpeta de configuración `/etc/datadog-agent`
* Archivos creados por el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de registro de Datadog

**Para eliminar estos elementos, ejecuta este comando después de eliminar el Agente:**

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```

Para desinstalar los artefactos restantes del Agente para `Debian` y `Ubuntu`, ejecuta:

```shell
sudo apt-get remove --purge datadog-agent -y
```

</div>


### Desinstalar Instrumentación APM de Un Solo Paso
Si instalaste el Agente con Instrumentación APM de Un Solo Paso y deseas desinstalarlo, necesitas [ejecutar comandos adicionales][9] para eliminar la Instrumentación APM. Sigue los pasos para tu [entorno específico][10].


## Solución de problemas

Para pasos detallados, consulta [Solución de Problemas del Agente][2].

## Trabajando con el Agente embebido

El Agente contiene un entorno de Python embebido en `/opt/datadog-agent/embedded/`. Binarios comunes como `python` y `pip` están contenidos dentro de `/opt/datadog-agent/embedded/bin/`.

Consulte las instrucciones sobre cómo [agregar paquetes al Agente embebido][3] para más información.


## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[2]: /es/agent/troubleshooting/
[3]: /es/extend/guide/custom-python-package/
[4]: /es/integrations/
[5]: /es/agent/supported_platforms/?tab=linux
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://docs.datadoghq.com/es/agent/configuration/proxy/
[9]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[10]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux
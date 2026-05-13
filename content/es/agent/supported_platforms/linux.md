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
  tag: Documentación
  text: Reúne tus registros
- link: /infrastructure/process/
  tag: Documentación
  text: Reúne tus procesos
- link: /tracing/
  tag: Documentación
  text: Reúne tus trazas
- link: /agent/architecture/#agent-architecture
  tag: Documentación
  text: Descubre más sobre la arquitectura del Datadog Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentación
  text: Configura los puertos de entrada
platform: Linux
title: Linux
---
## Resumen {#overview}

Esta página describe las características básicas del Datadog Agent para entornos Linux. Consulta la documentación de [Plataformas Soportadas][5] para obtener la lista completa de distribuciones y versiones de Linux soportadas.

## Instalar el Datadog Agent {#install-the-agent}
Para instalar el Datadog Agent en Linux, sigue las [in-app instructions in Fleet Automation][6] y ejecuta el script generado en tus servidores.

{{< img src="/agent/basic_agent_usage/linux_img_july_25.png" alt="Pasos de instalación en la aplicación para el Datadog Agent en un servidor Linux." style="width:90%;">}}


## Configura el Datadog Agent {#configure-the-agent}
El archivo de configuración del Datadog Agent se encuentra en `/etc/datadog-agent/datadog.yaml`. Este archivo YAML contiene los detalles de conexión a nivel de host utilizados para enviar datos a Datadog, incluyendo:
- `api_key`: La [clave de API de Datadog][7] de tu organización
- `site`: Región de Datadog objetivo (por ejemplo `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`)
- `proxy`: Puntos de conexión proxy HTTP/HTTPS para tráfico saliente (ver [Configuración del Proxy del Agente de Datadog][8])
- Etiquetas predeterminadas, nivel de registro y configuraciones de Datadog

Un archivo de referencia completamente comentado, ubicado en `/etc/datadog-agent/datadog.yaml.example`, lista todas las opciones disponibles para comparación o para copiar y pegar. Alternativamente, consulte el archivo de muestra `config_template.yaml` para todas las opciones de configuración disponibles.

### Archivos de integración {#integration-files}
Los archivos de configuración para integraciones se encuentran en `/etc/datadog-agent/conf.d/`. Cada integración tiene su propio subdirectorio, `<INTEGRATION>.d/`, que contiene:
- `conf.yaml`: La configuración activa que controla cómo la integración recopila métricas y registros
- `conf.yaml.example`: Un ejemplo que ilustra las claves y valores predeterminados admitidos


## Comandos {#commands}

| Descripción   | Comando               |
|---------------|-----------------------|
| Iniciar el Datadog Agent como servicio | `sudo systemctl start datadog-agent`                   |
| Detener el Datadog Agent que se ejecuta como servicio | `sudo systemctl stop datadog-agent`                    |
| Reiniciar el Datadog Agent que se ejecuta como servicio | `sudo systemctl restart datadog-agent`                 |
| Estado del servicio del Datadog Agent | `sudo systemctl status datadog-agent`                  |
| Página de estado del Datadog Agent en ejecución | `sudo datadog-agent status`                            |
| Enviar flare | `sudo datadog-agent flare`                             |
| Mostrar uso del comando              | `sudo datadog-agent --help`                            |
| Ejecutar una verificación                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

**Nota**: Para sistemas basados en upstart, como `CentOS/RHEL 6` o `SUSE 11`, intercambie `systemctl <action>` por `<action>`. Por ejemplo, al iniciar el Datadog Agent como servicio en un sistema `SUSE 11`, use `sudo start datadog-agent`.


## Desinstalar el Datadog Agent {#uninstall-the-agent}

Para desinstalar el Datadog Agent, ejecute el comando para el entorno de Linux correspondiente:


### Para CentOS, Rocky, AlmaLinux, Amazon Linux, Oracle Linux y Red Hat {#for-centos-rocky-almalinux-amazon-linux-oracle-linux-and-red-hat}

```shell
sudo yum remove datadog-agent
```

### Para Debian, Ubuntu {#for-debian-ubuntu}

```shell
sudo apt-get remove datadog-agent -y
```

### Para SUSE {#for-suse}

```shell
sudo zypper remove datadog-agent
```

<div class="alert alert-info">

**Los comandos anteriores eliminan el Datadog Agent, pero no eliminan**:
* El archivo de configuración `datadog.yaml`
* Archivos creados por el usuario en la carpeta de configuración `/etc/datadog-agent`
* Archivos creados por el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de registro de Datadog

**Para eliminar estos elementos, ejecute este comando después de eliminar el Datadog Agent:**

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```

Para desinstalar los artefactos restantes del Datadog Agent para `Debian` y `Ubuntu` ejecute:

```shell
sudo apt-get remove --purge datadog-agent -y
```

</div>


### Desinstalar Instrumentación APM de Un Solo Paso {#uninstall-single-step-apm-instrumentation}
Si instaló el Datadog Agent con Instrumentación APM de Un Solo Paso y desea desinstalarlo, necesita [ejecutar comandos adicionales][9] para eliminar la Instrumentación APM. Siga los pasos para su [entorno específico][10].


## Solución de problemas {#troubleshooting}

Para pasos detallados, consulte [Solución de problemas del Datadog Agent][2].

## Trabajando con el Datadog Agent embebido {#working-with-the-embedded-agent}

El Datadog Agent contiene un entorno Python embebido en `/opt/datadog-agent/embedded/`. Binarios comunes como `python` y `pip` están contenidos dentro de `/opt/datadog-agent/embedded/bin/`.

Consulte las instrucciones sobre cómo [agregar paquetes al Datadog Agent embebido][3] para más información.


## Lectura adicional {#further-reading}

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
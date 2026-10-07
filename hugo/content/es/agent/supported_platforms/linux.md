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
  text: Recopile sus registros
- link: /infrastructure/process/
  tag: Documentación
  text: Recopile sus procesos
- link: /tracing/
  tag: Documentación
  text: Recopile sus trazas
- link: /agent/architecture/#agent-architecture
  tag: Documentación
  text: Obtenga más información sobre la arquitectura del Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentación
  text: Configurar puertos de entrada
platform: Linux
title: Linux
---
## Descripción general {#overview}

Esta página describe las características básicas del Datadog Agent para entornos Linux. Consulte la documentación de [Plataformas compatibles][5] para obtener la lista completa de distribuciones y versiones de Linux compatibles.

## Instale el Agent {#install-the-agent}
Para instalar el Agent en Linux, siga las instrucciones en Fleet Automation y ejecute el script generado en sus hosts.

{{< img src="/agent/basic_agent_usage/linux_img_july_25.png" alt="Pasos de instalación in-app para el Datadog Agent en un host Linux." style="width:90%;">}}


## Configure el Agent {#configure-the-agent}
El archivo de configuración del Datadog Agent se encuentra en `/etc/datadog-agent/datadog.yaml`. Este archivo YAML contiene los detalles de conexión a nivel de host que se utilizan para enviar datos a Datadog, incluyendo:
- `api_key`: La [clave de API de Datadog][7] de su organización
- `site`: Región de Datadog de destino (por ejemplo, `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`, `us2.ddog-gov.com`)
- `proxy`: Endpoints de proxy HTTP/HTTPS para tráfico saliente (consulte [Configuración de proxy del Datadog Agent][8])
- Etiquetas predeterminadas, nivel de registro y configuraciones de Datadog

Un archivo de referencia totalmente comentado, ubicado en `/etc/datadog-agent/datadog.yaml.example`, enumera todas las opciones disponibles para comparación o para copiar y pegar. Alternativamente, consulte el archivo de configuración de ejemplo del Agent para Linux en GitHub.

### Archivos de integración {#integration-files}
Los archivos de configuración para las integraciones se encuentran en `/etc/datadog-agent/conf.d/`. Cada integración tiene su propio subdirectorio, `<INTEGRATION>.d/`, que contiene:
- `conf.yaml`: La configuración activa que controla cómo la integración recopila métricas y registros
- `conf.yaml.example`: Una muestra que ilustra las claves admitidas y los valores predeterminados


## Comandos {#commands}

| Descripción   | Comando               |
|---------------|-----------------------|
| Iniciar el Agent como servicio           | `sudo systemctl start datadog-agent`                   |
| Detener el Agent que se ejecuta como servicio    | `sudo systemctl stop datadog-agent`                    |
| Reiniciar el Agent que se ejecuta como servicio | `sudo systemctl restart datadog-agent`                 |
| Estado del servicio del Agent            | `sudo systemctl status datadog-agent`                  |
| Página de estado del Agent en ejecución       | `sudo datadog-agent status`                            |
| Enviar flare | `sudo datadog-agent flare`                             |
| Monitor el uso del comando | `sudo datadog-agent --help`                            |
| Ejecute una verificación | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

**Nota**: Para sistemas basados en upstart, como `CentOS/RHEL 6` o `SUSE 11`, intercambie `systemctl <action>` con `<action>`. Por ejemplo, al iniciar un Agent como servicio en un sistema `SUSE 11`, use `sudo start datadog-agent`.


## Desinstale el Agent {#uninstall-the-agent}

Para desinstalar el Agent, ejecute el comando para el entorno de Linux correspondiente:


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

**Los comandos anteriores eliminan el Agent, pero no eliminan**:
* El archivo de configuración `datadog.yaml`
* Archivos creados por el usuario en la carpeta de configuración `/etc/datadog-agent`
* Archivos creados por el usuario en la carpeta `/opt/datadog-agent`
* El usuario `dd-agent`
* Archivos de registro de Datadog

**Para eliminar estos elementos, ejecute este comando después de eliminar el Agent:**

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```

Para desinstalar los artefactos restantes del Agent para `Debian` y `Ubuntu` ejecute:

```shell
sudo apt-get remove --purge datadog-agent -y
```

</div>


### Desinstalar la instrumentación de APM de un solo paso {#uninstall-single-step-apm-instrumentation}
Si instaló el Agent con la instrumentación de APM de un solo paso y desea desinstalarlo, debe [ejecutar comandos adicionales][9] para eliminar la instrumentación de APM. Siga los pasos para su [entorno específico][10].


## Solución de problemas {#troubleshooting}

Para conocer los pasos detallados, consulte [Solución de problemas del Agent][2].

## Trabajar con el Agent integrado {#working-with-the-embedded-agent}

El Agent contiene un entorno de Python integrado en `/opt/datadog-agent/embedded/`. Los binarios comunes como `python` y `pip` se encuentran dentro de `/opt/datadog-agent/embedded/bin/`.

Consulte las instrucciones sobre cómo [agregar paquetes al Agent integrado][3] para obtener más información.


## Lecturas adicionales {#further-reading}

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
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
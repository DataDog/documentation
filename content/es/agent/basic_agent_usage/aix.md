---
further_reading:
- link: /agent/basic_agent_usage/#agent-architecture
  tag: Documentación
  text: Más información sobre la arquitectura del Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentación
  text: Configurar puertos de entrada
- link: https://www.datadoghq.com/blog/announcing-ibm-aix-agent/
  tag: Blog
  text: Monitorizar AIX con el Datadog Unix Agent
title: Uso básico del Agent para AIX
---

<div class="alert alert-info">
El Datadog UNIX Agent se está desarrollando para arquitecturas de sistema específicas, y no es lo mismo que los Windows, Linux y MacOS Agents.
</div>

En esta página se describe cómo instalar y configurar el Datadog UNIX Agent para AIX.

**Nota**: El Datadog Unix Agent es compatible con la versión 8 de PowerPC (o posteriores) y con las siguientes versiones de AIX:

* AIX 6.1 TL9 SP6+
* AIX 7.1 TL5 SP3+
* AIX 7.2 TL3 SP0+

## Instalación

En la [página de descarga del Agent][1] de Datadog se proporciona un script de instalación ksh de un solo paso. El script es compatible con las siguientes variables de entorno:

* **CHANNEL** (Canal): se establece por defecto como estable. Especifica el canal del repositorio de paquetes.
  * Valores: `stable`, `beta`, `unstable`
* **VERSION** (Versión): por defecto la última. Especifica la versión del paquete.
* **PROXY**: por defecto ninguno. Especifica el URI del proxy.
  * Por ejemplo: `http://proxy.foo.com`
* **PROXY_USER** (Usuario_proxy): vacío por defecto. Especifica el nombre de usuario del servidor proxy.
* **PROXY_PASSWORD** (Contraseña_proxy): vacío por defecto. Especifica la contraseña del servidor proxy. En el caso del Agent de proceso/contenedor, esta variable es obligatoria para habilitar una contraseña de autenticación y no se le puede cambiar el nombre.
* **INSECURE** (Insegura): se establece por defecto como `false`. Permite saltar la validación TLS.

Si lo prefieres, puedes encontrar enlaces para descargar las últimas versiones en [esta página][2].

El instalador puede ejecutarse de la siguiente manera (como usuario root):

{{< code-block lang="shell" wrap="true" >}}
installp -aXYgd ./datadog-unix-agent-<VERSION>.bff -e dd-aix-install.log datadog-unix-agent
{{< /code-block >}}

El Agent se instalará en `/opt/datadog-agent`.

### Archivos del log de la instalación

Puedes encontrar el log de la instalación del Agent en el archivo `dd-aix-install.log`. Para desactivar este log, elimina el parámetro `-e dd-aix-install.log` en el comando de instalación.

## Comandos

| Descripción                     | Comando (como root)           |
|---------------------------------|-----------------------------|
| Ejecutar el Agent como servicio        | `startsrc -s datadog-agent` |
| Detener la ejecución del Agent como servicio | `stopsrc -s datadog-agent`  |
| Estado del servicio Agent         | `lssrc -s datadog-agent`    |
| Página de estado del Agent en ejecución    | `datadog-agent status`      |
| Enviar un flare                      | `datadog-agent flare`       |
| Mostrar el uso de comandos           | `datadog-agent --help`      |

## Configuración

Los archivos y carpetas de configuración para el Agent se encuentran en `/etc/datadog-agent/datadog.yaml`

En `/etc/datadog-agent/datadog.yaml.example` encontrarás un ejemplo de archivo de configuración.

Para una configuración básica suele ser necesaria tu clave API de Datadog. La opción de configuración del `site` puede utilizarse para enviar tus métricas a un sitio diferente (por ejemplo, la instancia de la UE).

En algunas ocasiones también es necesario especificar una configuración proxy en función de la configuración de tu red.

**Archivos de configuración para las integraciones:**
`/etc/datadog-agent/conf.d/`

## Integraciones

El Unix Agent recopila métricas de sistema para probar:

* la cpu
* el sistema de archivos
* el iostat
* la carga
* la memoria
* el tiempo de actividad
* el disco
* la red

También se pueden activar las siguientes integraciones para recopilar otras métricas como:

* el proceso
* las lparstats
* el [ibm_was (WebSphere Application Server)][3]

Copia y edita los archivos de configuración de ejemplo proporcionados para habilitar las integraciones anteriores. Dichos archivos se encuentran en `/etc/datadog-agent/conf.d`. El nombre del archivo de configuración YAML debe coincidir con el de la integración: `/etc/datadog-agent/conf.d/<INTEGRATION_NAME>.d/conf.yaml` habilita la integración `<INTEGRATION_NAME>` y define su configuración. Puedes consultar algunos ejemplos de archivos de configuración en `/etc/datadog-agent/conf.d/<INTEGRATION_NAME>.d/conf.yaml.example`

**Nota**: Algunas de las métricas disponibles son diferentes dependiendo de si la integración es para el Unix Agent o para Linux, Windows y MacOS. Aunque es posible monitorizar procesos y métricas de red con el Unix Agent, las funciones Live Process Monitoring y Network Performance Monitoring no están disponibles. Además, la herramienta Gestión de logs tampoco está disponible con el Unix Agent.

<div class="alert alert-info">El Unix Agent no tiene el componente traza-agent, por lo que no es compatible con el rastreo ni la creación de perfiles de APM.</div>

## Ejecutar DogStatsD

DogStatsD permite recopilar y enviar métricas personalizadas a Datadog. Escucha en un puerto UDP y se le pueden enviar métricas DogStatsD. A continuación, se retransmiten a Datadog.

DogStatsD se basa en el mismo archivo de configuración definido para el Agent, en el que puedes encontrar una sección de configuración de DogStatsD. El servidor DogStatsD normalmente se ejecuta durante el mismo proceso que el Agent, pero si necesitas ejecutar su propio proceso, también puedes hacerlo en modo independiente.

Para habilitar DogStatsD, edita `/etc/datadog-agent/datadog.yaml` y define las opciones de configuración que correspondan.

{{< code-block lang="yaml" filename="/etc/datadog-agent/datadog.yaml" >}}
dogstatsd:                        # opciones de configuración de DogStatsD
  enabled: true                   # desactivado de forma predeterminada
  bind_host: localhost            # dirección a la que se vinculará
  port: 8125                      # puerto de escucha UDP de DogStatsD
  non_local_traffic: false        # escuchar tráfico no local
{{< /code-block >}}

**Nota:** DogStatsD no funciona como daemon y se ejecuta en primer plano.

También existen opciones para ejecutar el Agent con el conocido supervisor Python. Esta podría ser la mejor forma de gestionar el daemon del Agent si se está familiarizado con la herramienta. Encontrarás información tanto para el Agent como para DogStatsD.

## Desinstalar el Agent

Para eliminar un Agent ya instalado, ejecuta el siguiente comando `installp`:

{{< code-block lang="shell" >}}
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
{{< /code-block >}}

Nota: Los logs de desinstalación del Agent se pueden encontrar en el archivo `dd-aix-install.log`. Para desactivar este log, elimina el parámetro `-e` en el comando de desinstalación.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aix
[2]: https://github.com/DataDog/datadog-unix-agent/releases
[3]: https://github.com/DataDog/datadog-unix-agent/blob/master/checks/bundled/ibm_was/README.md
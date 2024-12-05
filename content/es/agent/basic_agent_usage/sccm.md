---
description: SCCM (Systems Center Configuration Manager)
disable_toc: false
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopilación de logs
- link: /infrastructure/process/
  tag: Documentación
  text: Recopilación de procesos
- link: /tracing/
  tag: Documentación
  text: Recopilar trazas
- link: /agent/architecture
  tag: Documentación
  text: Más información sobre la arquitectura del Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentación
  text: Configurar puertos de entrada
title: SCCM
---

Microsoft SCCM (Systems Center Configuration Manager) es una solución de gestión de la configuración que se incluye con el conjunto de herramientas de Systems Center de Microsoft. En esta página se describe la instalación y configuración del Datadog Agent mediante SCCM.

## Requisitos previos

- El Agent es compatible con la versión 2103, o posterior, de SCCM.
- Antes de instalar el Agent, asegúrate de haber instalado y configurado los [puntos de distribución][1] en Configuration Manager.

## Python

### Crear una aplicación desplegable del Datadog Agent

1. Descarga el último archivo de instalación (MSI) de Windows del Datadog Agent en el servidor de SCCM desde la [página del Agent ][2].
1. En SCCM, crea una aplicación y utiliza la localización del MSI del Datadog Agent.
   {{< img src="/agent/basic_agent_usage/sccm/sccm-deployable-app.png" alt="Crea una aplicación nueva y utiliza el MSI del Datadog Agent como el MSI de destino." style="height:100%;" >}}
1. Haz clic en **Next** (Siguiente) hasta llegar a la página **General Information** (Información general).
1. En **Installation program** (Programa de instalación), pega el siguiente comando y reemplaza `MY_API_KEY` por tu clave de API:

   ```powershell
   start /wait msiexec /qn /i datadog-agent-7-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datadoghq.com"
   ```

   Para obtener más opciones de instalación, consulta la lista completa de [variables de instalación][3].

1. Asegúrate de que **Install behavior** (Comportamiento de instalación) se haya establecido en **Install for system** (Instalar para el sistema).
1. Haz clic en **Next** (Siguiente) y sigue las instrucciones para crear la aplicación.
   {{< img src="/agent/basic_agent_usage/sccm/sccm-install-command.png" alt="Ingresa un comando del programa de instalación y asegúrate de que el Comportamiento de instalación se haya establecido en Instalar para el sistema." style="width:80%;" >}}
1. Para verificar que se haya creado la aplicación, búscala en **Software Library** > **Overview** > **Application Management** > **Applications** (Biblioteca de software > Descripción general > Gestión de aplicaciones > Aplicaciones).

### Desplegar la aplicación del Datadog Agent

<div class="alert alert-warning">Antes de desplegar la aplicación del Datadog Agent, asegúrate de haber instalado y configurado los <a href="https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/Configurar/install-and-Configurar-distribution-points">puntos de distribución</a> en Configuration Manager</div>

1. Dirígete a **Software Library** > **Overview** > **Application Management** > **Applications** (Biblioteca de software > Descripción general > Gestión de aplicaciones > Aplicaciones) y selecciona la aplicación del Datadog Agent que creaste anteriormente.
1. En la pestaña **Home** (Inicio), en el grupo **Deployment** (Despliegue), selecciona **Deploy** (Desplegar).

### Configuración del Agent

Los paquetes de SCCM te permiten desplegar archivos de configuración en los Datadog Agents, lo que sobrescribe su configuración predeterminada. La configuración del Agent consta de un archivo de configuración `datadog.yaml` y de archivos `conf.yaml` opcionales para cada integración. Debes crear un paquete para cada archivo de configuración que quieras desplegar.

1. Recopila los archivos `datadog.yaml` y `conf.yaml` en una carpeta de equipo de SCCM local. Consulta el [archivo `config_template.yaml` de ejemplo][4] para ver todas las opciones de configuración disponibles.
1. Crea un paquete de SCCM y selecciona **Standard program** (Programa estándar).
1. Selecciona la localización que contiene el archivo de configuración que quieres desplegar en los Agents.
1. Selecciona una [colección de dispositivos][5] en la que desplegar los cambios.
1. Configura los ajustes de despliegue para preinstalar el paquete en los destinos de inmediato.

{{< img src="agent/basic_agent_usage/sccm/sccm-select-program.png" alt="La pantalla de tipo de programa. Selecciona Programa estándar" style="width:80%;" >}}

### Reiniciar el Datadog Agent

Reinicia el servicio del Agent para observar los cambios de configuración:
1. Crea un script de PowerShell para reiniciar el Datadog Agent mediante los [comandos del Agent][6].
1. Ejecuta el script para reiniciar el Datadog Agent.
1. Busca datos nuevos en la interfaz de usuario de Datadog.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/manage-content-and-content-infrastructure
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[3]: /es/agent/basic_agent_usage/windows/?tab=commandline#configuration
[4]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[5]: https://learn.microsoft.com/en-us/mem/configmgr/core/clients/manage/collections/create-collections#bkmk_create
[6]: /es/agent/basic_agent_usage/windows/#agent-commands
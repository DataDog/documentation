---
aliases:
- /es/agent/basic_agent_usage/sccm/
description: SCCM (Systems Center Configuration Manager)
disable_toc: false
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
- link: /agent/architecture
  tag: Documentación
  text: Obtenga más información sobre la arquitectura del Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentación
  text: Configurar puertos de entrada
title: SCCM
---
Microsoft SCCM (Systems Center Configuration Manager) es una solución de gestión de configuración que viene incluida con el conjunto de herramientas Systems Center de Microsoft. Esta página cubre la instalación y configuración del Datadog Agent mediante SCCM.

## Requisitos previos {#prerequisites}

- El Agent es compatible con SCCM versión 2103 o superior.
- Antes de instalar el Agent, asegúrese de haber instalado y configurado los [Puntos de distribución][1] en Configuration Manager.

## Configuración {#setup}

### Cree una aplicación del Datadog Agent que esté lista para ser desplegada {#create-a-deployable-datadog-agent-application}

1. Descargue el archivo instalador (MSI) más reciente del Datadog Agent para Windows al servidor SCCM desde la [página del Agent][2].
1. En SCCM, cree una aplicación y utilice la ubicación del MSI del Datadog Agent.
   {{< img src="/agent/basic_agent_usage/sccm/sccm-deployable-app.png" alt="Cree una nueva aplicación y utilice el MSI del Datadog Agent como el MSI de destino." style="height:100%;" >}}
1. Haga clic en {{< ui >}}Next{{< /ui >}} hasta llegar a la página {{< ui >}}General Information{{< /ui >}}.
1. En {{< ui >}}Installation program{{< /ui >}}, pegue el siguiente comando, reemplazando `MY_API_KEY` por su clave de API:

   ```powershell
   start /wait msiexec /qn /i datadog-agent-7-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datadoghq.com"
   ```

   Para obtener más opciones de instalación, consulte la lista completa de [variables de instalación][3].

1. Asegúrese de que {{< ui >}}Install behavior{{< /ui >}} esté configurado en {{< ui >}}Install for system{{< /ui >}}.
1. Haga clic en {{< ui >}}Next{{< /ui >}} y siga las instrucciones para crear la aplicación.
   {{< img src="/agent/basic_agent_usage/sccm/sccm-install-command.png" alt="Ingrese un comando de programa de instalación y asegúrese de que el comportamiento de instalación esté configurado para instalarse para el sistema." style="width:80%;" >}}
1. Para verificar que la aplicación se haya creado, búsquela en {{< ui >}}Software Library{{< /ui >}} > {{< ui >}}Overview{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Applications{{< /ui >}}.

### Implemente la aplicación Datadog Agent {#deploy-the-datadog-agent-application}

<div class="alert alert-danger">Antes de implementar la aplicación Datadog Agent, asegúrese de haber instalado y configurado los <a href="https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/install-and-configure-distribution-points">Puntos de distribución</a> en Configuration Manager</div>

1. Vaya a {{< ui >}}Software Library{{< /ui >}} > {{< ui >}}Overview{{< /ui >}} > {{< ui >}}Application Management{{< /ui >}} > {{< ui >}}Applications{{< /ui >}} y seleccione la aplicación Datadog Agent que creó anteriormente.
1. Desde la pestaña {{< ui >}}Home{{< /ui >}} en el grupo {{< ui >}}Deployment{{< /ui >}}, seleccione {{< ui >}}Deploy{{< /ui >}}.

### Configuración del Agent {#agent-configuration}

Los paquetes SCCM le permiten implementar archivos de configuración en sus Datadog Agents, sobrescribiendo sus ajustes predeterminados. Una configuración del Agent consiste en un archivo de configuración `datadog.yaml` y archivos `conf.yaml` opcionales para cada integración. Debe crear un paquete para cada archivo de configuración que desee implementar.

1. Recopile sus archivos `datadog.yaml` y `conf.yaml` en una carpeta local de la máquina SCCM. Consulte el [example Agent configuration file for Windows][4] para ver todas las opciones de configuración disponibles.
1. Cree un paquete SCCM y seleccione {{< ui >}}Standard program{{< /ui >}}.
1. Seleccione la ubicación que contiene el archivo de configuración que desea implementar en sus Agents.
1. Seleccione una [Device collection][5] en la cual implementar los cambios.
1. Configure los ajustes de implementación para preinstalar el paquete en los destinos de inmediato.

{{< img src="agent/basic_agent_usage/sccm/sccm-select-program.png" alt="La pantalla de tipo de programa. Seleccione programa estándar" style="width:80%;" >}}

### Reinicie el Datadog Agent {#restart-the-datadog-agent}

Reinicie el servicio del Agent para observar los cambios en su configuración:
1. Cree un script de PowerShell para reiniciar el Datadog Agent utilizando [Agent commands][6].
1. Ejecute el script para reiniciar el Datadog Agent.
1. Compruebe si hay nuevos datos en la interfaz de usuario de Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/manage-content-and-content-infrastructure
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[3]: /es/agent/basic_agent_usage/windows/?tab=commandline#configuration
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
[5]: https://learn.microsoft.com/en-us/mem/configmgr/core/clients/manage/collections/create-collections#bkmk_create
[6]: /es/agent/basic_agent_usage/windows/#agent-commands
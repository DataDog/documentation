---
algolia:
  tags:
  - install
  - installing
  - uninstall
  - uninstalling
  - windows
aliases:
- /es/guides/basic_agent_usage/windows/
- /es/agent/basic_agent_usage/windows/
description: Funcionalidad básica del Datadog Agent en la plataforma Windows.
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
- link: /agent/guide/windows-agent-ddagent-user
  tag: Documentación
  text: Obtenga más información sobre el Datadog Windows Agent User
platform: Windows
title: Windows
---
## Descripción general {#overview}

Esta página describe las características básicas del Datadog Agent para Windows. Si aún no ha instalado el Agent, consulte las instrucciones de instalación a continuación o [siga las instrucciones en la aplicación][1].

Consulte [Plataformas compatibles][15] para obtener la lista completa de versiones de Windows compatibles.

## Instalación {#installation}

Para instalar el Datadog Agent en sus hosts de Windows, siga el [flujo guiado en la aplicación dentro de Fleet Automation][16], luego copie y ejecute el comando de instalación. Los Datadog Agents se ejecutan bajo el `ddagentuser`. Consulte la documentación de [Datadog Windows Agent User][17] para obtener más información.


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="Pasos de instalación en la aplicación para el Datadog Agent en un host de Windows." style="width:90%;">}}


## Métodos de instalación alternativos {#alternative-installation-methods}

### Instalar con la GUI del Agent Manager {#install-with-the-agent-manager-gui}

<div class="alert alert-info">La ubicación de instalación predeterminada para el Agent es <code>%ProgramFiles%\Datadog\Datadog Agent</code>. Si elige utilizar una ubicación de instalación personalizada, asegúrese de especificar un <code>Datadog</code> subdirectorio para los archivos de Datadog.</div>

1. Descargue el [instalador del Datadog Agent][400] para instalar la versión más reciente del Agent.
2. Ejecute el instalador abriendo `datadog-agent-7-latest.amd64.msi`. Cuando se le solicite, ingrese sus credenciales de administrador.
3. Siga las instrucciones, acepte el acuerdo de licencia e ingrese su [clave de API de Datadog][500].

Cuando finalice la instalación, se le dará la opción de iniciar el Datadog Agent Manager.


#### Opciones de configuración de instalación {#installation-configuration-options}

Cada una de las siguientes opciones de configuración se puede agregar como una propiedad a la línea de comandos al instalar el Agent en Windows. Para obtener opciones de configuración adicionales del Agent, consulte [más opciones de configuración del Agent](#more-agent-configuration-options).


| Variable                                    | Tipo    | Descripción                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | Cadena  | Agrega la CLAVE DE API de Datadog al archivo de configuración.                                                                                                                                                                                 |
| `SITE`   | Cadena  | Establece el sitio de ingesta de Datadog, por ejemplo: `SITE=datadoghq.com`     |
| `TAGS`                                      | Cadena  | Lista de etiquetas separadas por comas para asignar en el archivo de configuración. Ejemplo: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | Cadena  | Configura el nombre de host reportado por el Agent a Datadog (anula cualquier nombre de host calculado en tiempo de ejecución).                                                                                                                            |
| `DDAGENTUSER_NAME`                          | Cadena  | Anula el nombre de usuario `ddagentuser` predeterminado utilizado durante la instalación del Agent _(v6.11.0+)_. [Obtenga más información sobre el Datadog Windows Agent User][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | Cadena  | Anula la contraseña criptográficamente segura generada para el usuario `ddagentuser` durante la instalación del Agent _(v6.11.0+)_. Debe proporcionarse para instalaciones en servidores de dominio. [Obtenga más información sobre el Datadog Windows Agent User][3].  |
| `APPLICATIONDATADIRECTORY`                  | Ruta    | Anula el directorio que se utilizará para el árbol de directorios del archivo de configuración. Solo puede proporcionarse en la instalación inicial; no es válido para actualizaciones. Predeterminado: `C:\ProgramData\Datadog`. _(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | Ruta    | Anula el directorio que se utilizará para el árbol de directorios del archivo binario. Solo puede proporcionarse en la instalación inicial; no es válido para actualizaciones. Predeterminado: `%ProgramFiles%\Datadog\Datadog Agent`. _(v6.11.0+)_<br><br>Si decide anular el directorio predeterminado, asegúrese de especificar un subdirectorio `Datadog` para los archivos de Datadog.                                    |

**Notas**

- La opción `/qn` ejecuta una instalación silenciosa. Para ver las indicaciones de la GUI, elimínela.
- Algunas versiones del Agent pueden causar un reinicio forzado. Para evitar esto, agregue el parámetro: `REBOOT=ReallySuppress`.
- Algunos componentes del Agent requieren un controlador de kernel para recopilar datos. Para saber si se requiere un controlador de kernel para su componente, consulte su página de documentación o busque `kernel driver` en los archivos de configuración del Agent asociados.
- Si se encuentra un `datadog.yaml` válido, ese archivo tiene prioridad sobre todas las opciones de línea de comandos especificadas.

#### Más opciones de configuración del Agent {#more-agent-configuration-options}

Cada una de las siguientes opciones de configuración se puede agregar como una propiedad a la línea de comandos al instalar el Agent en Windows.

**Nota**: Si se encuentra un `datadog.yaml` válido, ese archivo tiene prioridad sobre todas las opciones de línea de comandos especificadas.


| Variable                                    | Tipo    | Descripción                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | Cadena  | Habilite (`"true"`) o deshabilite (`"false"`) la función de recopilación de registro en el archivo de configuración. Los registros están deshabilitados de forma predeterminada.                                                                                                        |
| `APM_ENABLED`                               | Cadena  | Habilite (`"true"`) o deshabilite (`"false"`) el APM Agent en el archivo de configuración. APM está habilitado de forma predeterminada.                                                                                                                        |
| `PROCESS_ENABLED`                           | Cadena  | Habilite (`"true"`) o deshabilite (`"false"`) el Process Agent en el archivo de configuración. El Process Agent está deshabilitado de forma predeterminada.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | Cadena  | Habilite (`"true"`) o deshabilite (`"false"`) el uso de FQDN para el nombre de host del Agent. Es equivalente a establecer `hostname_fqdn` en el archivo de configuración del Agent. El uso de FQDN para el nombre de host está deshabilitado de forma predeterminada. _(v6.20.0+)_ |
| `CMD_PORT`                                  | Número  | Un número de puerto válido entre 0 y 65534. El Datadog Agent expone una API de comandos en el puerto 5001. Si ese puerto ya está en uso por otro programa, el valor predeterminado puede anularse aquí.                                               |
| `PROXY_HOST`                                | Cadena  | (Si usa un proxy) establece su servidor proxy. [Obtenga más información sobre el uso de un proxy con el Datadog Agent][4].                                                                                                                                 |
| `PROXY_PORT`                                | Número  | (Si usa un proxy) establece su puerto de proxy. [Obtenga más información sobre el uso de un proxy con el Datadog Agent][4].                                                                                                                                 |
| `PROXY_USER`                                | Cadena  | (Si usa un proxy) establece su usuario de proxy. [Obtenga más información sobre el uso de un proxy con el Datadog Agent][4].                                                                                                                                 |
| `PROXY_PASSWORD`                            | Cadena  | (Si usa un proxy) establece su contraseña de proxy. Para el Agente de procesos/contenedores, esta variable es necesaria para ingresar una contraseña de autenticación y no se puede cambiar de nombre. [Obtenga más información sobre el uso de un proxy con el Datadog Agent][4]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Booleano | Use el ID de instancia de EC2 para hosts de Windows en EC2. _(v7.28.0+)_                                            |

#### Archivos de registro de instalación {#installation-log-files}

Establezca la opción `/log <FILENAME>` de msiexec para configurar un archivo de registro de instalación. Si esta opción no está establecida, msiexec escribe el registro en `%TEMP%\MSI*.LOG` de forma predeterminada.


## Configuración {#configuration}

El archivo de configuración principal del Agent se encuentra en
`C:\ProgramData\Datadog\datadog.yaml`. Este archivo se utiliza para configuraciones a nivel de host, como la clave de API, el sitio de Datadog seleccionado, los parámetros de proxy, las etiquetas del host y el nivel de registro.

También hay un archivo `datadog.yaml.example` en el mismo directorio, que es una referencia completamente comentada con todas las opciones de configuración disponibles, útil para consultar y copiar configuraciones específicas. Alternativamente, consulte el [archivo de configuración de ejemplo del Agent para Windows][19] en GitHub.


Los archivos de configuración para las integraciones se encuentran en:
`C:\ProgramData\Datadog\conf.d\` También puede haber una ubicación heredada alternativa: `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`.

Cada integración tiene un subdirectorio `<INTEGRATION>.d\` que contiene:
- `conf.yaml`: La configuración activa para la integración
* `conf.yaml.example`: Un archivo de muestra que muestra qué claves de configuración son compatibles

Al realizar cambios en la configuración, asegúrese de reiniciar el Agent para garantizar que los cambios surtan efecto.

La [GUI del Administrador del Datadog Agent][6] se puede utilizar para habilitar, deshabilitar y configurar comprobaciones. Debe reiniciar el Agent para que los cambios surtan efecto.

**Nota**: `ProgramData` es una carpeta oculta.

## Comandos del Agent {#agent-commands}

La ejecución del Agent es controlada por el Windows Service Control Manager.

* El nombre del ejecutable principal es `agent.exe`.
* La GUI de configuración es una aplicación de configuración basada en navegador (solo para Windows de 64 bits).
* Los comandos se pueden ejecutar desde la línea de comandos **elevada (ejecutar como administrador)** (PowerShell o Símbolo del sistema) usando la sintaxis `<PATH_TO_AGENT.EXE> <COMMAND>`.
* Las opciones de la línea de comandos se muestran a continuación:

| Comando         | Descripción                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check | Ejecuta la verificación especificada.                                                        |
| diagnose        | Ejecuta un diagnóstico de conectividad en su sistema.                             |
| flare           | Recopila un flare y lo envía a Datadog.                                         |
| help            | Obtiene ayuda sobre cualquier comando.                                                     |
| hostname        | Imprime el nombre de host utilizado por el Agent.                                           |
| import          | Importa y convierte archivos de configuración de versiones anteriores del Agent.    |
| launch-gui      | Inicia el Datadog Agent Manager.                                                |
| restart-service | Reinicia el Agent dentro del administrador de control de servicios.                           |
| run             | Inicia el Agent.                                                                |
| start           | Inicia el Agent. (Está en desuso, pero se acepta. Utilice `run` como alternativa.) |
| start-service   | Inicia el Agent dentro del Windows Service Control Manager.                             |
| status          | Imprime el estado actual.                                                        |
| stopservice     | Detiene el Agent dentro del Windows Service Control Manager.                              |
| version         | Imprime la información de la versión.                                                         |

**Ejemplos**:
  - PowerShell (`powershell.exe`)

    ```powershell
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

  - Command Prompt (`cmd.exe`)

    ```cmd
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

## Desinstale el Agent {#uninstall-the-agent}

Existen dos métodos diferentes para desinstalar el Agent en Windows. Ambos métodos eliminan el Agent, pero no eliminan la carpeta de configuración `C:\ProgramData\Datadog` en el servidor.

### Agregar o quitar programas {#add-or-remove-programs}

1. Presione **CTRL** y **Esc** o use la tecla de Windows para ejecutar la Búsqueda de Windows.
1. Busque `add` y haga clic en {{< ui >}}Add or remove programs{{< /ui >}}.
1. Busque `Datadog Agent` y haga clic en {{< ui >}}Uninstall{{< /ui >}}.

### PowerShell {#powershell}

**Nota:** Habilite WinRM para usar los comandos a continuación.

Utilice el siguiente comando de PowerShell para desinstalar el Agent sin reiniciar:

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## Solución de problemas {#troubleshooting}

Para conocer los pasos de solución de problemas, consulte la [documentación de solución de problemas del Agent][18] .


### Estado e información del Agent {#agent-status-and-information}

Para verificar que el Agent se esté ejecutando, compruebe si el servicio `DatadogAgent` en el panel de Servicios aparece como *Iniciado*. Un proceso llamado *Datadog Metrics Agent* (`agent.exe`) también debería existir en el Administrador de tareas.

Para recibir más información sobre el estado del Agent, inicie el Datadog Agent Manager:

* Haga clic derecho en el icono de la bandeja del sistema del Datadog Agent > {{< ui >}}Configure{{< /ui >}}, o
* Ejecute el comando `launch-gui` desde una línea de comandos **elevada (ejecutar como administrador)**
	- PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
	- cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

Luego, abra la página de estado yendo a {{< ui >}}Status{{< /ui >}} > {{< ui >}}General{{< /ui >}}.
Obtenga más información sobre cómo ejecutar verificaciones en {{< ui >}}Status{{< /ui >}} > {{< ui >}}Collector{{< /ui >}} y {{< ui >}}Checks{{< /ui >}} > {{< ui >}}Summary{{< /ui >}}.

El comando de estado está disponible para PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

o cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

### Ubicación de los registros {#logs-location}

Los registros del Agent se encuentran en `C:\ProgramData\Datadog\logs\agent.log`.

**Nota**: `ProgramData` es una carpeta oculta.

## Casos de uso {#use-cases}

###  Seguimiento de un servicio de Windows {#monitoring-a-windows-service}

En su host de destino, inicie el Datadog Agent Manager y seleccione la integración {{< ui >}}Windows Service{{< /ui >}} de la lista. Existe un ejemplo predeterminado; sin embargo, este ejemplo utiliza DHCP.

Para obtener el nombre del servicio, abra `services.msc` y localice su servicio de destino. Usando DHCP como destino, puede ver el nombre del servicio en la parte superior de la ventana de propiedades del servicio:

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

Al agregar sus propios servicios, asegúrese de seguir el formato exactamente como se muestra. Si el formato no es correcto, la integración fallará. **Nota**: Los caracteres especiales en un nombre de servicio deben escaparse. Por ejemplo, el nombre `MSSQL$BILLING` puede agregarse con `MSSQL\$BILLING`.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Servicio DHCP de Windows" style="width:75%;">}}

Además, siempre que modifique una integración, es necesario reiniciar el servicio de Datadog. Puede hacer esto desde services.msc o desde la barra lateral de la interfaz de usuario.

Para los servicios, Datadog no rastrea las métricas, solo su disponibilidad. (Para métricas, use la integración [Process](#monitoring-windows-processes) o [WMI][7]). Para configurar un Monitor, seleccione el [Integration monitor type][8] y luego busque {{< ui >}}Windows Service{{< /ui >}}. Desde {{< ui >}}Integration Status{{< /ui >}} > {{< ui >}}Pick Monitor Scope{{< /ui >}}, elija el servicio al que desea hacer un seguimiento.

### Seguimiento de la carga del sistema para Windows {#monitoring-system-load-for-windows}

El Datadog Agent recopila una gran cantidad de métricas del sistema de forma predeterminada. Las métricas del sistema más utilizadas son `system.load.*`, pero estas métricas son específicas de **Unix**.

Aunque Windows no ofrece las métricas `system.load.*`, una opción equivalente disponible de forma predeterminada es `system.proc.queue.length`. Esta métrica muestra la cantidad de subprocesos observados como retrasados en la cola de preparación del procesador que están esperando ser ejecutados.

### Seguimiento de procesos de Windows {#monitoring-windows-processes}

Puede hacer un seguimiento de los procesos de Windows con [Live Process Monitoring][9]. Para habilitar esto en Windows, edite el [archivo de configuración principal del Agent][10] estableciendo el siguiente parámetro en true:

`datadog.yaml`:

```yaml
process_config:
  enabled: "true"
```

Una vez completada la configuración, [reinicie el Agente][11].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /es/agent/supported_platforms/?tab=windows
[3]: /es/agent/faq/windows-agent-ddagent-user/
[4]: /es/agent/configuration/proxy/
[5]: /es/network_monitoring/cloud_network_monitoring
[6]: /es/agent/guide/datadog-agent-manager-windows/
[7]: /es/integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors/create/integration
[9]: /es/infrastructure/process/?tab=linuxwindows#installation
[10]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /es/agent/configuration/agent-commands/#restart-the-agent
[12]: http://127.0.0.1:5002
[13]: /es/agent/guide/python-3/
[14]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[15]: https://docs.datadoghq.com/es/agent/supported_platforms/?tab=windows
[16]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[17]: /es/agent/faq/windows-agent-ddagent-user/
[18]: https://docs.datadoghq.com/es/agent/troubleshooting/
[19]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
[400]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[500]: https://app.datadoghq.com/organization-settings/api-keys
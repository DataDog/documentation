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
description: Funcionalidad básica del Agente de Datadog en la plataforma Windows.
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopila tus registros
- link: /infrastructure/process/
  tag: Documentación
  text: Recopila tus procesos
- link: /tracing/
  tag: Documentación
  text: Recopila tus trazas
- link: /agent/architecture/#agent-architecture
  tag: Documentación
  text: Descubre más sobre la arquitectura del Agente
- link: /agent/configuration/network#configure-ports
  tag: Documentación
  text: Configura los puertos de entrada
- link: /agent/guide/windows-agent-ddagent-user
  tag: Documentación
  text: Aprende más sobre el Usuario del Agente de Datadog para Windows
platform: Windows
title: Windows
---
## Resumen {#overview}

Esta página describe las características básicas del Agente de Datadog para Windows. Si aún no has instalado el Agente, consulta las instrucciones de instalación a continuación o [sigue las instrucciones en la aplicación][1].

Consulta [Plataformas Soportadas][15] para la lista completa de versiones de Windows soportadas.

## Instalación {#installation}

Para instalar el Agente de Datadog en tus hosts de Windows, sigue el [flujo guiado en la aplicación dentro de Fleet Automation][16], luego copia y ejecuta el comando de instalación. Los Agentes de Datadog se ejecutan bajo el `ddagentuser`. Consulta la documentación del [Usuario del Agente de Datadog para Windows][17] para más información.


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="Pasos de instalación en la aplicación para el Agente de Datadog en un host de Windows." style="width:90%;">}}


## Métodos alternativos de instalación {#alternative-installation-methods}

### Instalar con la GUI del Administrador de Agentes {#install-with-the-agent-manager-gui}

<div class="alert alert-info">La ubicación de instalación predeterminada para el Agente es <code>%ProgramFiles%\Datadog\Datadog Agent</code>. Si eliges usar una ubicación de instalación personalizada, asegúrate de especificar un <code>Datadog</code> subdirectorio para los archivos de Datadog.</div>

1. Descarga el [instalador del Agente de Datadog][400] para instalar la última versión del Agente.
2. Ejecuta el instalador abriendo `datadog-agent-7-latest.amd64.msi`. Cuando se te solicite, ingresa tus credenciales de Administrador.
3. Sigue las instrucciones, acepta el acuerdo de licencia e ingresa tu [clave de API de Datadog][500].

Cuando la instalación finalice, se te dará la opción de iniciar el Administrador del Agente de Datadog.


#### Opciones de configuración de instalación {#installation-configuration-options}

Cada una de las siguientes opciones de configuración puede ser añadida como una propiedad a la línea de comandos al instalar el Agente en Windows. Para opciones adicionales de configuración del Agente, consulta [más opciones de configuración del Agente](#more-agent-configuration-options).


| Variable                                    | Tipo    | Descripción                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | Cadena  | Agrega la clave de API de Datadog al archivo de configuración.                                                                                                                                                                                 |
| `SITE`   | Cadena  | Establece el sitio de recepción de Datadog, por ejemplo: `SITE=datadoghq.com`     |
| `TAGS`                                      | Cadena  | Lista de etiquetas separadas por comas para asignar en el archivo de configuración. Ejemplo: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | Cadena  | Configura el nombre de host reportado por el Agente a Datadog (anula cualquier nombre de host calculado en tiempo de ejecución).                                                                                                                            |
| `DDAGENTUSER_NAME`                          | Cadena  | Sobrescribir el nombre de usuario predeterminado utilizado durante la instalación del Agente `ddagentuser`(v6.11.0+)__. [Aprende más sobre el usuario del Agente de Datadog para Windows][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | Cadena  | Sobrescribir la contraseña criptográficamente segura generada para el `ddagentuser` usuario durante la instalación del Agente _(v6.11.0+)_. Debe ser proporcionado para instalaciones en servidores de dominio. [Aprende más sobre el usuario del Agente de Datadog para Windows][3].  |
| `APPLICATIONDATADIRECTORY`                  | Ruta    | Sobrescribir el directorio a utilizar para el árbol de directorios del archivo de configuración. Solo puede ser proporcionado en la instalación inicial; no es válido para actualizaciones. Predeterminado: `C:\ProgramData\Datadog`. _(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | Ruta    | Sobrescribir el directorio a utilizar para el árbol de directorios del archivo binario. Solo puede ser proporcionado en la instalación inicial; no es válido para actualizaciones. Predeterminado: `%ProgramFiles%\Datadog\Datadog Agent`. _(v6.11.0+)_<br><br>Si decides sobrescribir el directorio predeterminado, asegúrate de especificar un `Datadog` subdirectorio para los archivos de Datadog.                                    |

**Notas**

- La `/qn` opción ejecuta una instalación silenciosa. Para ver los mensajes de la GUI, elimínalo.
- Algunas versiones del Agente pueden causar un reinicio forzado. Para prevenir esto, agrega el parámetro: `REBOOT=ReallySuppress`.
- Algunos componentes del Agente requieren un controlador de kernel para recopilar datos. Para saber si se requiere un controlador de kernel para su componente, consulte su página de documentación o busque `kernel driver` en los archivos de configuración del Agente asociados.
- Si se encuentra un `datadog.yaml` válido, ese archivo tiene prioridad sobre todas las opciones de línea de comandos especificadas.

#### Más opciones de configuración del Agente {#more-agent-configuration-options}

Cada una de las siguientes opciones de configuración puede ser añadida como una propiedad a la línea de comandos al instalar el Agente en Windows.

**Nota**: Si se encuentra un `datadog.yaml` válido, ese archivo tiene prioridad sobre todas las opciones de línea de comandos especificadas.


| Variable                                    | Tipo    | Descripción                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | Cadena  | Habilitar (`"true"`) o deshabilitar (`"false"`) la función de recopilación de registros en el archivo de configuración. Los registros están deshabilitados por defecto.                                                                                                        |
| `APM_ENABLED`                               | Cadena  | Habilitar (`"true"`) o deshabilitar (`"false"`) el APM Agent en el archivo de configuración. APM está habilitado por defecto.                                                                                                                        |
| `PROCESS_ENABLED`                           | Cadena  | Habilitar (`"true"`) o deshabilitar (`"false"`) el Agente de Procesos en el archivo de configuración. El Agente de Procesos está deshabilitado por defecto.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | Cadena  | Habilitar (`"true"`) o deshabilitar (`"false"`) el uso de FQDN para el nombre de host del Agente. Es equivalente a establecer `hostname_fqdn` en el archivo de configuración del Agente. El uso de FQDN para el nombre de host está deshabilitado por defecto. _(v6.20.0+)_ |
| `CMD_PORT`                                  | Número  | Un número de puerto válido entre 0 y 65534. El Agente de Datadog expone una API de comandos en el puerto 5001. Si ese puerto ya está en uso por otro programa, el valor predeterminado puede ser sobrescrito aquí.                                               |
| `PROXY_HOST`                                | Cadena  | (Si utiliza un proxy) establece su host de proxy. [Aprende más sobre el uso de un proxy con el Agente de Datadog][4].                                                                                                                                 |
| `PROXY_PORT`                                | Número  | (Si utiliza un proxy) establece su puerto de proxy. [Aprende más sobre el uso de un proxy con el Agente de Datadog][4].                                                                                                                                 |
| `PROXY_USER`                                | Cadena  | (Si utiliza un proxy) establece su usuario de proxy. [Aprende más sobre el uso de un proxy con el Agente de Datadog][4].                                                                                                                                 |
| `PROXY_PASSWORD`                            | Cadena  | (Si utiliza un proxy) establece su contraseña de proxy. Para el Agente de procesos y contenedores, esta variable es necesaria para proporcionar una contraseña de autenticación y no puede ser renombrada. [Aprende más sobre el uso de un proxy con el Agente de Datadog][4]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Booleano | Utilizar el id de instancia de EC2 para hosts de Windows en EC2. _(v7.28.0+)_                                            |

#### Archivos de registro de instalación {#installation-log-files}

Establezca la opción `/log <FILENAME>` msiexec para configurar un archivo de registro de instalación. Si esta opción no se establece, msiexec escribe el registro en `%TEMP%\MSI*.LOG` por defecto.


## Configuración {#configuration}

El archivo de configuración principal del Agente se encuentra en
`C:\ProgramData\Datadog\datadog.yaml`. Este archivo se utiliza para configuraciones a nivel de servidor, como la clave de API, el sitio de Datadog seleccionado, parámetros de proxy, etiquetas de host y nivel de registro.

También hay un archivo `datadog.yaml.example` en el mismo directorio, que es una referencia completamente comentada con todas las opciones de configuración disponibles, útil para referencia y copia de configuraciones específicas.


Los archivos de configuración para integraciones se encuentran en:
`C:\ProgramData\Datadog\conf.d\` También puede haber una ubicación alternativa heredada: `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`.

Cada integración tiene un subdirectorio `<INTEGRATION>.d\` que contiene:
- `conf.yaml`: La configuración activa para la integración
* `conf.yaml.example`: Un archivo de muestra que muestra qué claves de configuración son compatibles

Al realizar cambios en la configuración, asegúrese de reiniciar el Agente para garantizar que los cambios surtan efecto.

La [Interfaz Gráfica del Administrador del Agente de Datadog][6] se puede utilizar para habilitar, deshabilitar y configurar verificaciones. Debe reiniciar el Agente para que sus cambios surtan efecto.

**Nota**: `ProgramData` es una carpeta oculta.

## Comandos del Agente {#agent-commands}

La ejecución del Agente es controlada por el Administrador de Control de Servicios de Windows.

* El nombre del ejecutable principal es `agent.exe`.
* La interfaz gráfica de configuración es una aplicación de configuración basada en navegador (solo para Windows de 64 bits).
* Los comandos se pueden ejecutar desde la **línea de comandos elevada (ejecutar como Administrador)** utilizando la sintaxis `<PATH_TO_AGENT.EXE> <COMMAND>`.
* Las opciones de línea de comandos son las siguientes:

| Comando         | Descripción                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | Ejecuta la verificación especificada.                                                        |
| diagnose        | Ejecuta un diagnóstico de conectividad en su sistema.                             |
| flare           | Recoge un flare y lo envía a Datadog.                                         |
| help            | Obtiene ayuda sobre cualquier comando.                                                     |
| hostname        | Imprime el nombre de host utilizado por el Agente.                                           |
| import          | Importa y convierte archivos de configuración de versiones anteriores del Agente.    |
| launch-gui      | Inicia el Administrador del Agente de Datadog.                                                |
| restart-service | Reinicia el Agente dentro del administrador de control de servicios.                           |
| run             | Inicia el Agente.                                                                |
| start           | Inicia el Agente. (Está siendo desaprobado, pero aceptado.) Utiliza `run` como alternativa.) |
| start-service   | Inicia el Agente dentro del administrador de control de servicios.                             |
| status          | Imprime el estado actual.                                                        |
| stopservice     | Detiene el Agente dentro del administrador de control de servicios.                              |
| version         | Imprime la información de la versión.                                                         |

**Ejemplos**:
  - PowerShell (`powershell.exe`)

    ```powershell
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

  - Símbolo del sistema (`cmd.exe`)

    ```cmd
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

## Desinstalar el Agente {#uninstall-the-agent}

Existen dos métodos diferentes para desinstalar el Agente en Windows. Ambos métodos eliminan el Agente, pero no eliminan la carpeta de configuración `C:\ProgramData\Datadog` en el servidor.

### Agregar o quitar programas {#add-or-remove-programs}

1. Presione **CTRL** y **Esc** o use la tecla de Windows para ejecutar la búsqueda de Windows.
1. Busque `add` y haga clic en {{< ui >}}Add or remove programs{{< /ui >}}.
1. Busque `Datadog Agent` y haga clic en {{< ui >}}Uninstall{{< /ui >}}.

### PowerShell {#powershell}

**Nota:** Habilite WinRM para usar los comandos a continuación.

Utilice el siguiente comando de PowerShell para desinstalar el Agente sin reiniciar:

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## Solución de problemas {#troubleshooting}

Para los pasos de solución de problemas, consulte la [documentación de Solución de problemas del Agente][18].


### Estado e información del Agente {#agent-status-and-information}

Para verificar que el Agente esté en ejecución, verifique si el servicio `DatadogAgent` en el panel de Servicios está listado como *Iniciado*. Un proceso llamado *Datadog Metrics Agent* (`agent.exe`) también debería existir en el Administrador de tareas.

Para recibir más información sobre el estado del Agente, inicie el Administrador del Agente de Datadog:

* Haga clic derecho en el ícono del sistema del Agente de Datadog > {{< ui >}}Configure{{< /ui >}}, o
* Run `launch-gui` el comando desde una **línea de comandos elevada (ejecutar como Administrador)**
	- PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
	- cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

Luego, abra la página de estado yendo a {{< ui >}}Status{{< /ui >}} > {{< ui >}}General{{< /ui >}}.
Obtenga más información sobre la ejecución de checks en {{< ui >}}Status{{< /ui >}} > {{< ui >}}Collector{{< /ui >}} y {{< ui >}}Checks{{< /ui >}} > {{< ui >}}Summary{{< /ui >}}.

El comando status está disponible para PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

o cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

### Ubicación de los registros {#logs-location}

Los registros del Agente se encuentran en `C:\ProgramData\Datadog\logs\agent.log`.

**Nota**: `ProgramData` es una carpeta oculta.

## Casos de uso {#use-cases}

###  Monitoreo de un servicio de Windows {#monitoring-a-windows-service}

En su servidor objetivo, inicie el Administrador del Agente de Datadog y seleccione la integración {{< ui >}}Windows Service{{< /ui >}} de la lista. Hay un ejemplo listo para usar; sin embargo, este ejemplo utiliza DHCP.

Para obtener el nombre del servicio, abra `services.msc` y localice su servicio objetivo. Usando DHCP como objetivo, puede ver el nombre del servicio en la parte superior de la ventana de propiedades del servicio:

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

Al agregar sus propios servicios, asegúrese de seguir el formato exactamente como se muestra. Si el formato no es correcto, la integración falla. **Nota**: Los caracteres especiales en un nombre de servicio deben ser escapados. Por ejemplo, el nombre `MSSQL$BILLING` se puede agregar con `MSSQL\$BILLING`.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Servicio DHCP de Windows" style="width:75%;">}}

Además, cada vez que modifique una integración, el servicio de Datadog necesita ser reiniciado. Puede hacer esto desde services.msc o desde la barra lateral de la interfaz de usuario.

Para los servicios, Datadog no rastrea las métricas, solo su disponibilidad. (Para métricas, use la [Process](#monitoring-windows-processes) o [WMI][7]). Para configurar un Monitor, seleccione el [tipo de monitor de integración][8] y luego busque {{< ui >}}Windows Service{{< /ui >}}. Desde {{< ui >}}Integration Status{{< /ui >}} > {{< ui >}}Pick Monitor Scope{{< /ui >}}, elija el servicio que desea monitorear.

### Monitoreo de carga del sistema para Windows {#monitoring-system-load-for-windows}

El Agente de Datadog recopila un gran número de métricas del sistema por defecto. Las métricas del sistema más comúnmente utilizadas son `system.load.*`, pero estas métricas son **específicas de Unix**.

Aunque Windows no ofrece las métricas `system.load.*`, una opción equivalente que está disponible por defecto es `system.proc.queue.length`. Esta métrica muestra el número de hilos observados como retrasados en la cola de listos del procesador que están esperando ser ejecutados.

### Monitoreando procesos de Windows {#monitoring-windows-processes}

Puedes monitorear procesos de Windows con [Live Process Monitoring][9]. Para habilitar esto en Windows, edita el [archivo de configuración principal del Agente][10] estableciendo el siguiente parámetro en verdadero:

`datadog.yaml`:

```yaml
process_config:
  enabled: "true"
```

Después de completar la configuración, [reinicia el Agente][11].

## Lectura adicional {#further-reading}

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
[400]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[500]: https://app.datadoghq.com/organization-settings/api-keys
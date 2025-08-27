---
algolia:
  tags:
  - instalar
  - instalando
  - desinstalar
  - desinstalando
  - windows
aliases:
- /es/guides/basic_agent_usage/windows/
description: Funcionalidad básica del Datadog Agent en la plataforma de Windows.
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopilar tus logs
- link: /infrastructure/process/
  tag: Documentación
  text: Recopilar tus procesos
- link: /tracing/
  tag: Documentación
  text: Recopilar tus trazas (traces)
- link: /agent/basic_agent_usage/#agent-architecture
  tag: Documentación
  text: Más información sobre la arquitectura del Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentación
  text: Configurar puertos de entrada
- link: /agent/guide/windows-agent-ddagent-user
  tag: Documentación
  text: Más información sobre Datadog Windows Agent User
platform: Windows
title: Uso básico del Agent para Windows
---

## Información general

En esta página se describen las funciones básicas de Datadog Agent para Windows. Si aún no has instalado el Agent, consulta las instrucciones de instalación que aparecen a continuación o [sigue las instrucciones de la aplicación][1].

Consulta las [plataformas compatibles][15] para ver la lista completa de distribuciones y versiones de Linux compatibles.

## Instalación

Para instalar el Datadog Agent en tus hosts Windows, sigue el [flujo guiado dentro de la aplicación en Fleet Automation][16] y, a continuación, copia y ejecuta el comando de instalación. El Datadog Agent se ejecuta bajo el `ddagentuser`. Para obtener más información, consulta la documentación [Usuario del Agent Datadog para Windows][17]. 


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="Pasos de instalación en la aplicación del Datadog Agent en un host Windows." style="width:90%;">}}


## Métodos de instalación alternativos

### Instalación con la GUI del Agent Manager

<div class="alert alert-info">La localización de instalación predeterminada para el Agent es <code>%ProgramFiles%Datadog\Datadog Agent</code>. Si decides utilizar una localización de instalación personalizada, asegúrate de especificar un subdirectorio de <code>Datadog</code> para los archivos de Datadog.</div>

1. Descarga el [instalador del Datadog Agent][400] para instalar la última versión del Agent.
2. Ejecuta el instalador abriendo `datadog-agent-7-latest.amd64.msi`. Cuando se te solicite, introduce tus credenciales de administrador.
3. Sigue las instrucciones, acepta el acuerdo de licencia e introduce tu [clave de API Datadog][500].

Cuando termines la instalación, tendrás la opción de iniciar el Datadog Agent Manager.


#### Opciones de configuración de instalación

Cada una de las siguientes opciones de configuración se puede añadir como propiedad a la línea de comandos al instalar el Agent en Windows. Si lo necesitas, puedes consultar [más opciones de configuración del Agent](#more-agent-configuration-options). 


| Variable                                    | Tipo    | Descripción                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | Cadena  | Añade la clave de API de Datadog al archivo de configuración.                                                                                                                                                                                 |
| `SITE`   | Cadena  | Configura el sitio de admisión en Datadog, por ejemplo: `SITE=datadoghq.com`.     |
| `TAGS`                                      | Cadena  | Lista de etiquetas (tags) que asignar en el archivo de configuración. Los valores están separados por comas. Ejemplo: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | Cadena  | Configura el nombre de host que el Agent envía a Datadog (anula cualquier nombre de host determinado durante el tiempo de ejecución).                                                                                                                            |
| `DDAGENTUSER_NAME`                          | Cadena  | Anula el nombre de usuario `ddagentuser` predeterminado que se utilizó durante la instalación del Agent _(v6.11.0 y posteriores)_. [Más información sobre el usuario del Datadog Windows Agent][3]                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | Cadena  | Anula la contraseña con protección criptográfica que se generó para el usuario `ddagentuser` durante la instalación del Agent _(v6.11.0 y posteriores)_. Se debe proporcionar para instalaciones en servidores de dominios. [Más información sobre el usuario del Datadog Windows Agent][3]  |
| `APPLICATIONDATADIRECTORY`                  | Ruta    | Anula el directorio que se va a utilizar para el árbol de directorios de archivos de configuración. Solo se puede proporcionar en la primera instalación; no es válido para actualizaciones. Valor predeterminado: `C:\ProgramData\Datadog`. _(v6.11.0 y posteriores)_                                           |
| `PROJECTLOCATION`                           | Ruta    | Anula el directorio a utilizar para el árbol de directorios de archivos binarios. Sólo puede proporcionarse en la instalación inicial; no es válido para actualizaciones. Por defecto: `%ProgramFiles%\Datadog\Datadog Agent`. (v6.11.0+)_<br><br>Si decides anular el directorio predeterminado, asegúrate de especificar un subdirectorio `Datadog` para los archivos de Datadog.                                    |

**Notas**

- La opción `/qn` ejecuta una instalación silenciosa. Elimínala para ver las indicaciones de la GUI.
- Algunas versiones del Agent pueden provocar un reinicio forzado. Para evitarlo, añade el siguiente parámetro: `REBOOT=ReallySuppress`.
- Algunos componentes del Agent requieren un controlador de kernel para recopilar datos. Para saber si tu componente lo necesita, consulta la página donde se encuentra su documentación o busca `kernel driver` en los archivos de configuración del Agent asociados.
- Si se encuentra un `datadog.yaml` válido, ese archivo tiene prioridad sobre todas las opciones de línea de comandos especificadas.

#### Más opciones de configuración del Agent

Cada una de las siguientes opciones de configuración se puede añadir como propiedad a la línea de comandos al instalar el Agent en Windows.

**Nota**: Si se encuentra un `datadog.yaml` válido, ese archivo tiene prioridad sobre todas las opciones de línea de comandos especificadas.


| Variable                                    | Tipo    | Descripción                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | Cadena  | Habilita (`"true"`) o deshabilita (`"false"`) la recopilación de logs del archivo de configuración. Los logs se encuentran deshabilitados de manera predeterminada.                                                                                                        |
| `APM_ENABLED`                               | Cadena  | Habilita (`"true"`) o deshabilita (`"false"`) el Agent de APM en el archivo de configuración. El APM se encuentra habilitado de manera predeterminada.                                                                                                                        |
| `PROCESS_ENABLED`                           | Cadena  | Habilita (`"true"`) o deshabilita (`"false"`) el Process Agent del archivo de configuración. El Process Agent se encuentra deshabilitado de manera predeterminada.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | Cadena  | Habilita (`"true"`) o deshabilita (`"false"`) el uso de FQDN para el nombre de host del Agent. Esto equivale a establecer `hostname_fqdn` en el archivo de configuración del Agent. El uso de FQDN para el nombre de host del Agent se encuentra deshabilitado de manera predeterminada. _(v6.20.0 y posteriores)_ |
| `CMD_PORT`                                  | Número  | Número de puerto válido entre 0 y 65534. El Datadog Agent muestra una API de comandos en el puerto 5001. Si ya hay otro programa utilizando ese puerto, se puede anular el valor predeterminado aquí.                                               |
| `PROXY_HOST`                                | Cadena  | (Si utilizas un proxy) establece tu host de proxy. [Más información sobre el uso de proxy con el Datadog Agent][4].                                                                                                                                 |
| `PROXY_PORT`                                | Número  | (Si utilizas un proxy) establece tu puerto de proxy. [Más información sobre el uso de proxy con el Datadog Agent][4].                                                                                                                                 |
| `PROXY_USER`                                | Cadena  | (Si utilizas un proxy) establece tu usuario de proxy. [Más información sobre el uso de proxy con el Datadog Agent][4].                                                                                                                                 |
| `PROXY_PASSWORD`                            | Cadena  | (Si utilizas un proxy) establece tu contraseña de proxy. Para Agent de proceso/contenedor, esta variable se requiere para pasar una contraseña de autenticación y no puede ser renombrada. [Más información sobre el uso de proxy con Datadog Agent][4]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Booleano | Utiliza el ID de instancia EC2 para los hosts de Windows en EC2. _(v7.28.0 y posteriores)_                                            |

#### Archivos de log de la instalación

Define la opción `/log <FILENAME>` msiexec para configurar un archivo de log de instalación. Si no se define esta opción, msiexec escribe el log en `%TEMP%\MSI*.LOG` por defecto.


## Configuración

El archivo de configuración principal del Agent se encuentra en
`C:\ProgramData\Datadog\datadog.yaml`. Este archivo se utiliza para las configuraciones en todo el host, como la clave de API, el sitio Datadog seleccionado, los parámetros proxy, las etiquetas de host y el nivel de log.

También hay un archivo `datadog.yaml.example` en el mismo directorio, que es una referencia completamente comentada con todas las opciones de configuración disponibles. Es útil como referencia y para copiar configuraciones específicas.


Los archivos de configuración de las integraciones están en:
`C:\ProgramData\Datadog\conf.d\` También puede haber una ubicación legacy alternativa: `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`.

Cada integración tiene un subdirectorio `<INTEGRATION>.d\` que contiene:
- `conf.yaml`: Parámetros activos de la integración
* `conf.yaml.example`: Archivo de ejemplo que muestra las claves de configuración compatibles

Cuando realices cambios en la configuración, asegúrate de reiniciar el Agent para que los cambios surtan efecto.

La [GUI del Datadog Agent Manager][6] puede utilizarse para activar, desactivar y configurar checks. Debes reiniciar Agent para que los cambios surtan efecto.

**Nota**: `ProgramData` es una carpeta oculta.

## Comandos del Agent

El administrador de control de servicios de Windows controla la ejecución del Agent.

* El nombre del ejecutable principal es `agent.exe`. 
* La GUI de configuración es una aplicación de configuración basada en navegador (solo para Windows de 64 bits).
* Los comandos se pueden ejecutar desde la línea de comandos **elevada (ejecutar como administrador)** (PowerShell o símbolo del sistema) utilizando la sintaxis `<PATH_TO_AGENT.EXE> <COMMAND>`.
* Estas son las opciones de línea de comandos:

| Comando         | Descripción                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | Ejecuta el check especificado.                                                        |
| diagnose        | Ejecuta un diagnóstico de la conectividad de tu sistema.                             |
| flare           | Recopila un flare y lo envía a Datadog.                                         |
| help            | Encuentra ayuda sobre cualquier comando.                                                     |
| hostname        | Muestra el nombre de host que utiliza el Agent.                                           |
| import          | Importa y convierte archivos de configuración de versiones anteriores del Agent.    |
| launch-gui      | Inicia el Datadog Agent Manager.                                                |
| restart-service | Reinicia el Agent en el administrador de control de servicios.                           |
| run             | Inicia el Agent.                                                                |
| start           | Inicia el Agent. (Obsoleto, pero aceptado. Utiliza `run` como alternativa). |
| start-service   | Inicia el Agent en el administrador de control de servicios.                             |
| status          | Muestra en qué estado se encuentra el Agent en el momento de ejecutar el comando.                                                        |
| stopservice     | Detiene el Agent en el administrador de control de servicios.                              |
| version         | Muestra información acerca de la versión.                                                         |

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

## Desinstalar el Agent

Existen dos métodos diferentes para desinstalar el Agent en Windows. Ambos borran el Agent, pero no eliminan la carpeta de configuración `C:\ProgramData\Datadog` del host.

### Añadir o eliminar programas

1. Pulsa **CTRL** y **Esc** o utiliza la tecla de Windows para ejecutar Windows Search.
1. Busca `add` y haz clic en **Add or remove programs** (Añadir o eliminar programas).
1. Busca `Datadog Agent` y haz clic en **Uninstall** (Desinstalar).

### PowerShell

**Nota:** Habilita WinRM para utilizar los comandos que se muestran a continuación.

Utiliza el siguiente comando de PowerShell para desinstalar el Agent sin tener que reiniciar:

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## Solucionar problemas

Para conocer los pasos a seguir para la resolución de problemas, consulta la [documentación para la resolución de problemas del Agent][18].


### Estado e información del Agent

Para verificar que el Agent se esté ejecutando, comprueba si, en el panel Services (Servicios), el servicio `DatadogAgent` aparece como *Started* (Iniciado). También debería aparecer un proceso llamado *Datadog Metrics Agent* (`agent.exe`) en el Administrador de tareas.

Para obtener más información sobre el estado del Agent, inicia el Datadog Agent Manager de una de estas dos maneras:

* Haz clic con el botón derecho del ratón en el icono de la bandeja del sistema del Datadog Agent y selecciona Configure (Configurar).
* Ejecuta el comando `launch-gui` desde una línea de comando **con privilegios superiores (ejecutada como administrador)**
    - PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
    - cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

Luego, ve a *Status* -> *General* (Estado -> General) para abrir la página de estado.
Tienes más información sobre la ejecución de checks en *Status* -> *Collector* (Estado -> Recopilador) y *Checks* -> *Summary* (Checks -> Resumen).

El comando status se puede usar en PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

También en cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

### Localización de logs

Los logs del Agent se encuentran en `C:\ProgramData\Datadog\logs\agent.log`.

**Nota**: `ProgramData` es una carpeta oculta.

## Casos prácticos

###  Monitorización de un servicio de Windows

En tu host de destino, inicia el Datadog Agent Manager y selecciona la integración "Windows Service" (Servicio de Windows) en la lista. Aunque ya viene un ejemplo predefinido, en este ejemplo se utiliza DHCP.

Para saber el nombre del servicio, abre `services.msc` y localiza tu servicio de destino. Si utilizas DHCP como destino, podrás ver el nombre del servicio en la parte superior de la ventana de propiedades del servicio:

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

Cuando añadas tus propios servicios, asegúrate de respetar el formato tal y como te lo mostramos. La integración fallará si el formato no es correcto. **Nota**: Si quieres usar caracteres especiales en el nombre de un servicio, debes utilizar una secuencia de escape. Por ejemplo, para añadir `MSSQL$BILLING`, se debe escribir `MSSQL\$BILLING`.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Servicio DHCP en Windows" style="width:75%;">}}

Además, cuando modificas una integración, debes reiniciar el servicio de Datadog. Puedes hacerlo con services.msc o desde la barra lateral de la interfaz de usuario.

En el caso de los servicios, Datadog no rastrea las métricas, solo su disponibilidad (para las métricas, utiliza la integración de [Process](#monitoring-windows-processes) o [WMI][7]). Para configurar un monitor, selecciona el [tipo de monitor de la integración][8] y, luego, busca **Windows Service** (Servicio de Windows). En *Integration Status -> Pick Monitor Scope* (Estado de la integración -> Seleccionar alcance del monitor), elige el servicio que te gustaría monitorizar.

### Monitorización de la carga del sistema en Windows

El Datadog Agent recopila un gran número de métricas del sistema de forma predeterminada. Las métricas del sistema que más se utilizan son `system.load.*`, pero son específicas de **Unix**.

Si bien Windows no proporciona las métricas de `system.load.*`, hay una opción equivalente disponible de manera predeterminada: `system.proc.queue.length`. Esta métrica muestra el número de subprocesos que aparecen con retraso en la cola de procesos listos para su ejecución.

### Monitorización de procesos de Windows

Puedes monitorizar procesos de Windows con [Live Process Monitoring][9]. Para habilitar esta función en Windows, modifica el [archivo de configuración principal del Agent][10] dándole al siguiente parámetro el valor "true":

`datadog.yaml`:

```yaml
process_config:
  enabled: "true"
```

Una vez que se haya completado la configuración, [reinicia el Agent][11].

## Referencias adicionales

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
[15]: https://docs.datadoghq.com/es/agent/supported_platforms/?tab=linux
[16]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[17]: /es/agent/faq/windows-agent-ddagent-user/
[18]: https://docs.datadoghq.com/es/agent/troubleshooting/
[400]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[500]: https://app.datadoghq.com/organization-settings/api-keys
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
  tag: Documentation
  text: Recopila tus registros
- link: /infrastructure/process/
  tag: Documentation
  text: Recopila tus procesos
- link: /tracing/
  tag: Documentation
  text: Recopila tus trazas
- link: /agent/architecture/#agent-architecture
  tag: Documentation
  text: Descubre más sobre la arquitectura del Agente
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: Configura los puertos de entrada
- link: /agent/guide/windows-agent-ddagent-user
  tag: Documentation
  text: Aprende más sobre el Usuario del Agente de Datadog para Windows
platform: Windows
title: Windows
---
## Resumen

Esta página describe las características básicas del Agente de Datadog para Windows. Si aún no has instalado el Agente, consulta las instrucciones de instalación a continuación o [sigue las instrucciones en la aplicación][1].

Consulta [Plataformas Soportadas][15] para la lista completa de versiones de Windows soportadas.

## Instalación

Para instalar el Agente de Datadog en tus hosts de Windows, sigue el [flujo guiado en la aplicación dentro de Fleet Automation][16], luego copia y ejecuta el comando de instalación. Los Agentes de Datadog se ejecutan bajo el `ddagentuser`. Consulta la documentación del [Usuario del Agente de Datadog para Windows][17] para más información.


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="Pasos de instalación en la aplicación para el Agente de Datadog en un host de Windows." style="width:90%;">}}


## Métodos alternativos de instalación

### Instalar con la GUI del Administrador de Agentes

<div class="alert alert-info">La ubicación de instalación predeterminada para el Agente es <code>%ProgramFiles%\Datadog\Agente de Datadog</code>. Si eliges usar una ubicación de instalación personalizada, asegúrate de especificar un subdirectorio de <code>Datadog</code> para los archivos de Datadog.</div>

1. Descarga el [instalador del Agente de Datadog][400] para instalar la última versión del Agente.
2. Ejecuta el instalador abriendo `datadog-agent-7-latest.amd64.msi`. Cuando se te solicite, ingresa tus credenciales de Administrador.
3. Sigue las instrucciones, acepta el acuerdo de licencia e ingresa tu [clave API de Datadog][500].

Cuando la instalación finalice, se te dará la opción de iniciar el Administrador del Agente de Datadog.


#### Opciones de configuración de instalación

Cada una de las siguientes opciones de configuración se puede agregar como una propiedad a la línea de comandos al instalar el Agente en Windows. Para opciones adicionales de configuración del Agente, consulta [más opciones de configuración del Agente](#more-agent-configuration-options).


| Variable                                    | Tipo    | Descripción                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | Cadena  | Agrega la CLAVE API de Datadog al archivo de configuración.                                                                                                                                                                                 |
| `SITE`   | Cadena  | Establece el sitio de recepción de Datadog, por ejemplo: `SITE=datadoghq.com`     |
| `TAGS`                                      | Cadena  | Lista de etiquetas separadas por comas para asignar en el archivo de configuración. Ejemplo: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | Cadena  | Configura el nombre de host reportado por el Agente a Datadog (anula cualquier nombre de host calculado en tiempo de ejecución).                                                                                                                            |
| `DDAGENTUSER_NAME`                          | Cadena  | Anula el `ddagentuser` nombre de usuario predeterminado utilizado durante la instalación del Agente _(v6.11.0+)_. [Aprende más sobre el Usuario del Agente de Datadog para Windows][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | Cadena  | Anula la contraseña segura criptográficamente generada para el `ddagentuser` usuario durante la instalación del Agente _(v6.11.0+)_. Debe ser proporcionado para instalaciones en servidores de dominio. [Aprende más sobre el Usuario del Agente de Datadog para Windows][3].  |
| `APPLICATIONDATADIRECTORY`                  | Ruta    | Anula el directorio a utilizar para el árbol de directorios del archivo de configuración. Solo puede ser proporcionado en la instalación inicial; no es válido para actualizaciones. Predeterminado: `C:\ProgramData\Datadog`. _(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | Ruta    | Anula el directorio a utilizar para el árbol de directorios del archivo binario. Solo puede ser proporcionado en la instalación inicial; no es válido para actualizaciones. Predeterminado: `%ProgramFiles%\Datadog\Datadog Agent`. _(v6.11.0+)_<br><br>Si decides anular el directorio predeterminado, asegúrate de especificar un `Datadog` subdirectorio para los archivos de Datadog.                                    |

**Notas**

- La `/qn` opción realiza una instalación silenciosa. Para ver los mensajes de la GUI, elimínalo.
- Algunas versiones de Agent pueden causar un reinicio forzado. Para prevenir esto, añade el parámetro: `REBOOT=ReallySuppress`.
- Algunos componentes de Agent requieren un controlador de kernel para recopilar datos. Para saber si se requiere un controlador de kernel para tu componente, consulta su página de documentación o busca `kernel driver` en los archivos de configuración del Agent asociados.
- Si se encuentra un `datadog.yaml` válido, ese archivo tiene prioridad sobre todas las opciones de línea de comandos especificadas.

#### Más opciones de configuración de Agent

Cada una de las siguientes opciones de configuración se puede agregar como una propiedad a la línea de comandos al instalar el Agente en Windows.

**Nota**: Si se encuentra un `datadog.yaml` válido, ese archivo tiene prioridad sobre todas las opciones de línea de comandos especificadas.


| Variable                                    | Tipo    | Descripción                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | Cadena  | Habilitar (`"true"`) o deshabilitar (`"false"`) la función de recopilación de registros en el archivo de configuración. Los registros están deshabilitados por defecto.                                                                                                        |
| `APM_ENABLED`                               | Cadena  | Habilitar (`"true"`) o deshabilitar (`"false"`) el Agent de APM en el archivo de configuración. APM está habilitado por defecto.                                                                                                                        |
| `PROCESS_ENABLED`                           | Cadena  | Habilitar (`"true"`) o deshabilitar (`"false"`) el Agent de Proceso en el archivo de configuración. El Agente de Proceso está deshabilitado por defecto.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | Cadena | Habilitar (`"true"`) o deshabilitar (`"false"`) el uso de FQDN para el nombre del host del Agente. Es equivalente a establecer `hostname_fqdn` en el archivo de configuración del Agente. El uso de FQDN para el nombre del host está deshabilitado por defecto. _(v6.20.0+)_ |
| `CMD_PORT`                                  | Número | Un número de puerto válido entre 0 y 65534. El Agente de Datadog expone una API de comandos en el puerto 5001. Si ese puerto ya está en uso por otro programa, el valor por defecto puede ser sobrescrito aquí.                                               |
| `PROXY_HOST`                                | Cadena | (Si se utiliza un proxy) establece el host de tu proxy. [Aprende más sobre el uso de un proxy con el Agente de Datadog][4].                                                                                                                                 |
| `PROXY_PORT`                                | Número | (Si se utiliza un proxy) establece el puerto de tu proxy. [Aprende más sobre el uso de un proxy con el Agente de Datadog][4].                                                                                                                                 |
| `PROXY_USER`                                | Cadena | (Si se utiliza un proxy) establece el usuario de tu proxy. [Aprende más sobre el uso de un proxy con el Agente de Datadog][4].                                                                                                                                 |
| `PROXY_PASSWORD`                            | Cadena | (Si se utiliza un proxy) establece la contraseña de tu proxy. Para el Agente de proceso/contenedor, esta variable es necesaria para pasar una contraseña de autenticación y no puede ser renombrada. [Aprende más sobre el uso de un proxy con el Agente de Datadog][4]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Booleano | Utiliza el id de instancia de EC2 para hosts de Windows en EC2. _(v7.28.0+)_                                            |

#### Archivos de registro de instalación

Establezca la opción `/log <FILENAME>` de msiexec para configurar un archivo de registro de instalación. Si esta opción no se establece, msiexec escribe el registro en `%TEMP%\MSI*.LOG` por defecto.


## Configuración

El archivo de configuración principal del Agente se encuentra en
`C:\ProgramData\Datadog\datadog.yaml`. Este archivo se utiliza para configuraciones a nivel de host, como la clave de API, el sitio de Datadog seleccionado, parámetros de proxy, etiquetas de host y nivel de registro.

También hay un archivo `datadog.yaml.example` en el mismo directorio, que es una referencia completamente comentada con todas las opciones de configuración disponibles, útil para referencia y copia de configuraciones específicas.


Los archivos de configuración para integraciones están en:
`C:\ProgramData\Datadog\conf.d\` También puede haber una ubicación alternativa heredada: `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`.

Cada integración tiene un subdirectorio `<INTEGRATION>.d\` que contiene:
- `conf.yaml`: Las configuraciones activas para la integración
* `conf.yaml.example`: Un archivo de muestra que muestra qué claves de configuración son compatibles

Al realizar cambios en la configuración, asegúrese de reiniciar el Agente para que los cambios surtan efecto.

La [Interfaz Gráfica del Administrador del Agente de Datadog][6] se puede utilizar para habilitar, deshabilitar y configurar verificaciones. Debe reiniciar el Agente para que sus cambios surtan efecto.

**Nota**: `ProgramData` es una carpeta oculta.

## Comandos del Agente

La ejecución del Agente es controlada por el Administrador de Control de Servicios de Windows.

* El nombre del ejecutable principal es `agent.exe`.
* La GUI de configuración es una aplicación de configuración basada en navegador (solo para Windows de 64 bits).
* Los comandos se pueden ejecutar desde la línea de comandos **elevada (ejecutar como Administrador)** utilizando la sintaxis `<PATH_TO_AGENT.EXE> <COMMAND>`.
* Las opciones de línea de comandos son las siguientes:

| Comando         | Descripción                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| verificar        | Ejecuta la verificación especificada.                                                        |
| diagnosticar     | Ejecuta un diagnóstico de conectividad en su sistema.                             |
| flare           | Recoge un flare y lo envía a Datadog.                                         |
| ayuda           | Obtiene ayuda sobre cualquier comando.                                                     |
| nombre de host   | Imprime el nombre de host utilizado por el Agente.                                           |
| importar          | Importa y convierte archivos de configuración de versiones anteriores del Agente.    |
| lanzar-gui      | Inicia el Administrador del Agente de Datadog.                                                |
| reiniciar-servicio | Reinicia el Agente dentro del administrador de control de servicios.                           |
| ejecutar             | Inicia el Agente.                                                                |
| iniciar           | Inicia el Agente. (Está siendo desaprobado, pero aceptado. Utiliza `run` como alternativa.) |
| iniciar-servicio   | Inicia el Agente dentro del administrador de control de servicios.                             |
| estado          | Imprime el estado actual.                                                        |
| detener-servicio     | Detiene el Agente dentro del administrador de control de servicios.                              |
| versión         | Imprime la información de la versión.                                                         |

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

## Desinstalar el Agente

Existen dos métodos diferentes para desinstalar el Agente en Windows. Ambos métodos eliminan el Agente, pero no eliminan la carpeta de configuración `C:\ProgramData\Datadog` en el host.

### Agregar o quitar programas

1. Presione **CTRL** y **Esc** o use la tecla de Windows para ejecutar la búsqueda de Windows.
1. Busque `add` y haga clic en **Agregar o quitar programas**.
1. Busque `Datadog Agent` y haga clic en **Desinstalar**.

### PowerShell

**Nota:** Habilite WinRM para usar los comandos a continuación.

Utilice el siguiente comando de PowerShell para desinstalar el Agente sin reiniciar:

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## Solución de problemas

Para pasos de solución de problemas, consulte la [documentación de Solución de problemas del Agente][18].


### Estado e información del agente

Para verificar que el agente está en ejecución, verifica si el servicio `DatadogAgent` en el panel de Servicios está listado como *Iniciado*. Un proceso llamado *Agente de Métricas de Datadog* (`agent.exe`) también debería existir en el Administrador de Tareas.

Para recibir más información sobre el estado del agente, inicia el Administrador de Agentes de Datadog:

* Haz clic derecho en el ícono del agente de Datadog en la bandeja del sistema -> Configurar, o
* Ejecuta el `launch-gui` comando desde una línea de comandos **elevada (ejecutar como Administrador)**
	- PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
	- cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

Luego, abre la página de estado yendo a *Estado* -> *General*.
Obtén más información sobre las verificaciones en *Estado* -> *Colector* y *Verificaciones* -> *Resumen*.

El comando de estado está disponible para PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

o cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

### Ubicación de los registros

Los registros del agente se encuentran en `C:\ProgramData\Datadog\logs\agent.log`.

**Nota**: `ProgramData` es una carpeta oculta.

## Casos de uso

###  Monitoreo de un servicio de Windows

En tu host objetivo, lanza el Administrador de Agentes de Datadog y selecciona la integración "Servicio de Windows" de la lista. Hay un ejemplo listo para usar; sin embargo, este ejemplo utiliza DHCP.

Para obtener el nombre del servicio, abre `services.msc` y localiza tu servicio objetivo. Usando DHCP como objetivo, puedes ver el nombre del servicio en la parte superior de la ventana de propiedades del servicio:

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

Al agregar tus propios servicios, asegúrate de seguir el formato exactamente como se muestra. Si el formato no es correcto, la integración falla. **Nota**: Los caracteres especiales en un nombre de servicio deben ser escapados. Por ejemplo, el nombre `MSSQL$BILLING` se puede agregar con `MSSQL\$BILLING`.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Servicio DHCP de Windows" style="width:75%;">}}

Además, cada vez que modifiques una integración, el servicio de Datadog necesita ser reiniciado. Puedes hacer esto desde services.msc o desde la barra lateral de la interfaz de usuario.

Para los Servicios, Datadog no rastrea las métricas, solo su disponibilidad. (Para métricas, usa la [Integración de Procesos](#monitoring-windows-processes) o [WMI][7]). Para configurar un Monitor, selecciona el [tipo de monitor de integración][8] y luego busca **Servicio de Windows**. Desde *Estado de Integración -> Elegir Alcance del Monitor*, elige el servicio que te gustaría monitorear.

### Monitoreo de carga del sistema para Windows

El Agente de Datadog recopila un gran número de métricas del sistema por defecto. Las métricas del sistema más comúnmente utilizadas son `system.load.*`, pero estas métricas son **específicas de Unix**.

Mientras que Windows no ofrece las `system.load.*` métricas, una opción equivalente que está disponible por defecto es `system.proc.queue.length`. Esta métrica muestra el número de hilos observados como retrasados en la cola de listos del procesador que están esperando ser ejecutados.

### Monitoreo de procesos de Windows

Puede monitorear los procesos de Windows con [Monitoreo de Procesos en Vivo][9]. Para habilitar esto en Windows, edite el [archivo de configuración principal del Agente][10] estableciendo el siguiente parámetro en verdadero:

`datadog.yaml`:

```yaml
process_config:
  enabled: "true"
```

Una vez que la configuración esté completa, [reinicie el Agente][11].

## Lectura adicional

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
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
  text: Recopilar tus trazas
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

## Instalar el Datadog Agent

### Requisitos

- **Versión de Windows**: Windows Server 2016 o posterior, o Windows 10 o posterior. Consulta la documentación de Plataformas compatibles del Agent para conocer las [versiones de sistema operativo compatibles][2].
- ** Cuenta de Datadog**: asegúrate de tener acceso a una cuenta de Datadog y de disponer de tu clave de API de Datadog.
- **Privilegios de administrador**: se requiere acceso de administrador en la máquina de Windows.

{{< tabs >}}
{{% tab "Instalación estándar" %}}

El núcleo y los componentes de APM/Traza de Windows Agent se ejecutan en la cuenta `ddagentuser`. El componente de Live Processes, si está activado, se ejecuta en la cuenta `LOCAL_SYSTEM`. Más información sobre el [Datadog Windows Agent User][3].

### Instalar con la GUI

<div class="alert alert-info">La localización de instalación predeterminada para el Agent es <code>%ProgramFiles%Datadog\Datadog Agent</code>. Si decides utilizar una localización de instalación personalizada, asegúrate de especificar un subdirectorio de <code>Datadog</code> para los archivos de Datadog.</div>

1. Descarga el [instalador del Datadog Agent][4] para instalar la última versión del Agent.
2. Ejecuta el instalador abriendo `datadog-agent-7-latest.amd64.msi`. Cuando se te solicite, introduce tus credenciales de administrador.
3. Sigue las instrucciones, acepta el acuerdo de licencia e introduce tu [clave de API de Datadog][5].

Cuando termine la instalación, tendrás la opción de iniciar el Datadog Agent Manager.

### Instalar con la línea de comandos

1. Abre PowerShell con privilegios de **Administrador**.
2. Ejecuta el siguiente comando para instalar el Datadog Agent:
    ```powershell
    Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>"'
    ```

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /es/agent/supported_platforms/?tab=windows
[3]: /es/agent/faq/windows-agent-ddagent-user/
[4]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[5]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Instalación en dominios de Active Directory" %}}

Al desplegar el Datadog Agent en un entorno de Active Directory, Datadog recomienda utilizar una Group Managed Service Account (gMSA).

El uso de gMSA puede mejorar la seguridad y simplificar la gestión. Algunas de las ventajas son:
- Despliegue en varios servidores: a diferencia de las Managed Service Accounts (MSAs) tradicionales o de las Managed Service Accounts (sMSAs) independientes, las gMSAs pueden desplegarse en varios servidores.
- Gestión automatizada de contraseñas: las contraseñas de las gMSAs se gestionan a nivel de sistema operativo y se rotan periódicamente sin necesidad de intervención manual.

Cuando se ejecuta con una gMSA, los componentes centrales y APM/traza del Windows Agent se ejecutan bajo la cuenta configurada. El componente Live Processes, si está habilitado, se ejecuta bajo la cuenta `LOCAL_SYSTEM`. Más información sobre el [Datadog Windows Agent User][3].

### Requisitos previos

- Un entorno de Active Directory
- Permiso para crear y gestionar gMSAs
- Consulta más [requisitos en la documentación de Microsoft][4].

**Nota**: Para una comprensión completa de la configuración de gMSAs, consulta [Información general de Group Managed Service Accounts de Microsoft][5].

### Crear y configurar una gMSA

1. Cree un grupo de seguridad:
   1. Abre **Active Directory Users and Computers (ADUC) (Usuarios y equipos de Active Directory (ADUC)).
   2. Navega hasta la **Organizational Unit (OU)** (Unidad Organizativa (UO)) apropiada.
   3. Haz clic con el botón derecho y selecciona **New** > **Group** (Nuevo > Grupo).
   4. Asigna un nombre al grupo. Por ejemplo, `DatadogAgentsGroup`.
   5. Establece el contexto del grupo correcto para tu organización. Por ejemplo, **Dominio local**.
   6. Establece el tipo en **Security** (Seguridad).


2. Crear la gMSA:
   1. Abre PowerShell con privilegios de **Administrador**.
   2. Ejecuta el siguiente comando para crear la gMSA, sustituyendo `<YOUR_DOMAIN_NAME>` por tu nombre de dominio:
        ```powershell
        New-ADServiceAccount -Name DatadogGMSA -DNSHostName <YOUR_DOMAIN_NAME> -PrincipalsAllowedToRetrieveManagedPassword DatadogAgentsGroup
        ```


3. Verifica que la gMSA se puede utilizar en la máquina de destino:

   1. Asegúrate de que la máquina de destino forma parte de `DatadogAgentsGroup`.
   2. En el equipo de destino, abre PowerShell y ejecútalo:
        ```powerhsell
        Install-ADServiceAccount -Identity DatadogGMSA
        ```
      Asegúrate de que el comando se ejecuta sin errores.

### Instalación del Agent

Sigue las siguientes instrucciones para instalar la última versión del Datadog Agent. Si necesitas instalar una versión específica del Agent, consulta la [lista de instalador][6].

#### Instalación a través de la GUI

<div class="alert alert-info">La localización de instalación predeterminada para el Agent es <code>%ProgramFiles%Datadog\Datadog Agent</code>. Si decides utilizar una localización de instalación personalizada, asegúrate de especificar un subdirectorio de <code>Datadog</code> para los archivos de Datadog.</div>

1. Descarga el [instalador del Datadog Agent][1] para instalar la última versión del Agent.
2. Ejecuta el instalador abriendo `datadog-agent-7-latest.amd64.msi`. Cuando se te solicite, introduce tus credenciales de administrador.
3. Sigue las indicaciones, acepta el acuerdo de licencia e introduce tu [clave de API de Datadog][2].
4. Cuando se te solicite la "Cuenta de usuario de Datadog Agent", introduce el nombre de usuario de la gMSA. Por ejemplo, `<YOUR_DOMAIN_NAME>\DatadogGMSA. Cuando se te solicite la "Cuenta de usuario de Datadog Agent", introduce el nombre de usuario de la gMSA. Por ejemplo,  y **sin contraseña**.
Cuando termines la instalación, tendrás la opción de iniciar el Datadog Agent Manager.

#### Instalar con la línea de comandos

1. Abre PowerShell con privilegios de **Administrador**.
2. Ejecuta el siguiente comando para instalar el Datadog Agent:

**Nota:** Sustituye `DatadogGMSA$` por el nombre de usuario de tu gMSA. El nombre de usuario **debe terminar con el símbolo $.**.
  ```powershell
  Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>" DDAGENTUSER_NAME="<YOUR_DOMAIN_NAME>\DatadogGMSA$"'
  ```

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /es/agent/supported_platforms/?tab=windows
[3]: /es/agent/faq/windows-agent-ddagent-user/
[4]: https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/group-managed-service-accounts-overview#software-requirements
[5]: https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-managed-service-accounts/group-managed-service-accounts/getting-started-with-group-managed-service-accounts
[6]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json

{{% /tab %}}
{{< /tabs >}}

#### Opciones de configuración de instalación

Cada una de las siguientes opciones de configuración se puede añadir como propiedad a la línea de comandos al instalar el Agent en Windows. Si lo necesitas, puedes consultar [más opciones de configuración del Agent](#more-agent-configuration-options). 


| Variable                                    | Tipo    | Descripción                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | Cadena  | Añade la clave de API de Datadog al archivo de configuración.                                                                                                                                                                                 |
| `SITE`                                      | Cadena  | Configura el sitio de ingesta de Datadog. Ejemplo: `SITE=`{{< region-param key="dd_site" code="true" >}}                                                                                                                                     |
| `TAGS`                                      | Cadena  | Lista de etiquetas que asignar en el archivo de configuración. Los valores están separados por comas. Ejemplo: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
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
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Booleano | Utiliza el ID de instancia EC2 para los hosts de Windows en EC2. _(v7.28.0 y posteriores)_                                                                                                                                                                      |
| [OBSOLETO] `ADDLOCAL` | Cadena | Habilita el componente de Agent adicional. Si se selecciona `"MainApplication,NPM"`, se instalará el componente del controlador para [Network Performance Monitoring][5]. _(Versión 7.44.0 y anteriores)_ |

**Nota**:
Agent 7 sólo es compatible con Python 3. Antes de actualizar, confirma que tus checks personalizados son compatibles con Python 3. Consulta la guía de [Migración de check personalizado de Python 3][13] para más información. Si no estás utilizando checks personalizados o ya has confirmado su compatibilidad, actualiza normalmente.

Si estás actualizando desde una versión del Datadog Agent < 5.12.0, primero actualiza a una versión más reciente del Agent 5 (>= 5.12.0, pero < 6.0.0) con el [instalador EXE][14] y después actualiza al Datadog Agent versión >= 6.

#### Archivos de log de la instalación

Puedes encontrar los archivos de log de la instalación del Agent en `%TEMP%\MSI*.LOG`.

#### Validación

Para verificar tu instalación, sigue las instrucciones que aparecen en la sección [Estado e información del Agent](#agent-status-and-information).

## Comandos del Agent

El administrador de control de servicios de Windows controla la ejecución del Agent.

* El nombre del archivo ejecutable principal es `agent.exe`. En función de la versión del Agent, su localización es la siguiente:
    - Versiones del Agent <= 6.11: `"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe"`
    - Versiones del Agent >= 6.12: `"C:\Program Files\Datadog\Datadog Agent\bin\agent.exe"`
* La GUI de configuración es una aplicación de configuración basada en navegador (solo para Windows de 64 bits).
* Se pueden ejecutar comandos desde una línea de comandos **con privilegios superiores (ejecutada como administrador)** (PowerShell o Símbolo del sistema) con la sintaxis `<PATH_TO_AGENT.EXE> <COMMAND>`.
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

* Ejemplos:
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

## Configuración

Utiliza el [Datadog Agent Manager][6] para habilitar, deshabilitar y configurar checks. Reinicia el Agent para aplicar los cambios.


El archivo principal de configuración del Agent se encuentra en:
`C:\ProgramData\Datadog\datadog.yaml`

Los archivos de configuración para las integraciones se encuentran en:
`C:\ProgramData\Datadog\conf.d\` O
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**Nota**: `ProgramData` es una carpeta oculta.

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

### Enviar un flare

* Navega hasta [http://127.0.0.1:5002][12] para visualizar el Datadog Agent Manager.

* Selecciona la pestaña Flare.

* Introduce tu número de tique (si tienes alguno).

* Introduce la dirección de correo electrónico que utilizas para iniciar sesión en Datadog.

* Pulsa Submit (Enviar).

El comando flare se puede usar en PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

También en cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

{{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Flare en Windows con el Agent 6" style="width:75%;">}}

## Casos de uso

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


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: /es/agent/supported_platforms/?tab=windows
[3]: /es/agent/faq/windows-agent-ddagent-user/
[4]: /es/agent/configuration/proxy/
[5]: /es/network_monitoring/performance
[6]: /es/agent/guide/datadog-agent-manager-windows/
[7]: /es/integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors/create/integration
[9]: /es/infrastructure/process/?tab=linuxwindows#installation
[10]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /es/agent/configuration/agent-commands/#restart-the-agent
[12]: http://127.0.0.1:5002
[13]: /es/agent/guide/python-3/
[14]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
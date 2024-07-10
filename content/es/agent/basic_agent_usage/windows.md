---
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
- link: /agent/guide/network#configure-ports
  tag: Documentación
  text: Configurar puertos de entrada
platform: Windows
title: Uso básico del Agent para Windows
---

## Configuración

Si aún no has instalado el Datadog Agent, sigue leyendo o consulta las [instrucciones de instalación dentro de la propia aplicación][1]. Visita la documentación del Agent para saber qué [versiones del SO son compatibles][2].

Para instalar y configurar el sitio de Datadog de la UE, usa el parámetro `SITE=`. Consulta la tabla de variables de configuración que aparece a continuación.

### Instalación

Del **Agent v6.11.0** en adelante, los componentes de base y APM/rastreo del Agent de Windows se ejecutan en la cuenta de `ddagentuser`, que se crea en el momento de la instalación, en lugar de la cuenta de `LOCAL_SYSTEM`. Si el componente Live Processes está activado, se ejecutará en la cuenta de `LOCAL_SYSTEM`. Obtén más información sobre el [usuario del Datadog Agent de Windows][3].

Para instalar el Datadog Agent en un entorno de dominio, consulta los [requisitos de instalación del Agent][4].

**Nota**: Hay que tener en cuenta ciertas consideraciones especiales con respecto a los [controladores de dominio][5].

{{< tabs >}}
{{% tab "GUI" %}}

1. Descarga el [instalador del Datadog Agent][1] para instalar la última versión del Agent.

   <div class="alert alert-info">Si necesitas instalar una versión específica del Agent, consulta la <a href="https://s3.amazonaws.com/ddagent-windows-stable/installers.json">lista de instaladores</a>.</div>

2. Abre `datadog-agent-7-latest.amd64.msi` y ejecuta el instalador (como **Administrador**).
3. Sigue las indicaciones, acepta el acuerdo de licencia e introduce tu [clave de API de Datadog][2].
4. Cuando termines la instalación, tendrás opción de iniciar el Datadog Agent Manager.

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Línea de comandos" %}}

Para instalar el Agent con la línea de comandos:

1. Descarga el [instalador del Datadog Agent][1].
2. Ejecuta uno de los siguientes comandos dentro del directorio en el que descargaste el instalador.

**Command Prompt**

```shell
start /wait msiexec /qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>"
```

**PowerShell**

```powershell
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-7-latest.amd64.msi APIKEY="<YOUR_DATADOG_API_KEY>"'
```

**Notas**

- La opción `/qn` ejecuta una instalación silenciosa. Para ver las indicaciones de la GUI, elimínala.
- Algunas versiones del Agent pueden provocar un reinicio forzado. Para evitarlo, añade el siguiente parámetro: `REBOOT=ReallySuppress`.

### Configuración

Todos los elementos de la configuración se añaden a la línea de comandos como una propiedad. Cuando instales el Agent en Windows, dispondrás de las siguientes opciones para la línea de comandos de configuración:

| Variable                                    | Tipo    | Descripción                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | Cadena  | Añade la clave de API de Datadog al archivo de configuración.                                                                                                                                                                                 |
| `SITE`                                      | Cadena  | Configura el sitio de ingesta de Datadog. Ejemplo: `SITE=`{{< region-param key="dd_site" code="true" >}}                                                                                                                                     |
| `TAGS`                                      | Cadena  | Lista de etiquetas, separadas entre sí por comas, para asignar en el archivo de configuración. Ejemplo: `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | Cadena  | Configura el nombre de host que el Agent envía a Datadog (anula cualquier nombre de host calculado durante el tiempo de ejecución).                                                                                                                            |
| `LOGS_ENABLED`                              | Cadena  | Activa (`"true"`) o desactiva (`"false"`) la función de recopilación de logs en el archivo de configuración. Los logs están desactivados por defecto.                                                                                                        |
| `APM_ENABLED`                               | Cadena  | Activa (`"true"`) o desactiva (`"false"`) el APM Agent en el archivo de configuración. El APM está activado por defecto.                                                                                                                        |
| `PROCESS_ENABLED`                           | Cadena  | Activa (`"true"`) o desactiva (`"false"`) el Agent de proceso en el archivo de configuración. El Agent de proceso está desactivado por defecto.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | Cadena  | Activa (`"true"`) o desactiva (`"false"`) el uso de FQDN para el nombre de host del Agent. Esto equivale a establecer `hostname_fqdn` en el archivo de configuración del Agent. El uso de FQDN para el nombre de host del Agent está desactivado por defecto. _(v6.20.0 y posteriores)_ |
| `CMD_PORT`                                  | Número  | Un número de puerto válido entre 0 y 65534. El Datadog Agent muestra una API de comando en el puerto 5001. Si ya hay otro programa usando ese puerto, puede anularse el valor predeterminado aquí.                                               |
| `PROXY_HOST`                                | Cadena  | Si estás usando un proxy, esto configura el host de tu proxy. [Más información sobre cómo usar un proxy con el Datadog Agent][2].                                                                                                                                 |
| `PROXY_PORT`                                | Número  | Si estás usando un proxy, esto configura el puerto de tu proxy. [Más información sobre cómo usar un proxy con el Datadog Agent][2].                                                                                                                                 |
| `PROXY_USER`                                | Cadena  | Si estás usando un proxy, esto configura el usuario de tu proxy. [Más información sobre cómo usar un proxy con el Datadog Agent][2].                                                                                                                                 |
| `PROXY_PASSWORD`                            | Cadena  | Si estás usado un proxy, esto configura la contraseña de tu proxy. En el Agent de proceso/contenedor, esta variable es obligatoria para habilitar una contraseña de autenticación y no se le puede cambiar el nombre. [Más información sobre cómo usar un proxy con el Datadog Agent][2]. |
| `DDAGENTUSER_NAME`                          | Cadena  | Anula el nombre de usuario predeterminado de `ddagentuser` que se utilizó durante la instalación del Agent _(v6.11.0 y posteriores)_. [Más información sobre el usuario del Datadog Agent de Windows][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | Cadena  | Anula la contraseña criptográficamente segura que se generó para el usuario `ddagentuser` durante la instalación del Agent _(v6.11.0 y posteriores)_. Debe proporcionarse para instalaciones en servidores de dominios. [Más información sobre el usuario del Datadog Agent de Windows][3].  |
| `APPLICATIONDATADIRECTORY`                  | Ruta    | Anula el directorio que se va a usar para el árbol del directorio del archivo de configuración. Solo puede proporcionarse en la primera instalación; no es válido para actualizaciones. Por defecto: `C:\ProgramData\Datadog`. _(v6.11.0 y posteriores)_                                           |
| `PROJECTLOCATION`                           | Ruta    | Anula el directorio que se va a usar para el árbol del directorio del archivo binario. Solo puede proporcionarse en la primera instalación; no es válido para actualizaciones. Por defecto: `%ProgramFiles%\Datadog\Datadog Agent`. _(v6.11.0 y posteriores)_                                    |
| `ADDLOCAL`                                  | Cadena  | Activa un componente adicional de Agent. Si se define como `"MainApplication,NPM"`, se instala el componente del controlador de [Network Performance Monitoring][4].                                                                          |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Booleano | Usa la ID de instancia EC2 para los hosts de Windows en EC2. _(v7.28.0 y posteriores)_                                                                                                                                                                      |

**Nota**: Si se encuentra un `datadog.yaml` válido y tiene una clave de API configurada, ese archivo tendrá prioridad sobre todas las opciones de la línea de comandos especificadas.

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[2]: /es/agent/proxy/
[3]: /es/agent/faq/windows-agent-ddagent-user/
[4]: /es/network_monitoring/performance
{{% /tab %}}
{{% tab "Actualización" %}}

El Agent 7 solo es compatible con Python 3. Antes de actualizarlo, confirma que tus checks personalizados son compatibles con Python 3. Consulta la guía [Migración de checks personalizados a Python 3][1] para más información. Si no estás usando checks personalizados o ya has confirmado su compatibilidad, sigue las instrucciones que encontrarás en [GUI](?tab=gui) o [Línea de comandos](?tab=commandline) para realizar la actualización.

Si vas a actualizarte a partir de una versión del Datadog Agent anterior a la 5.12.0, primero debes pasarte a una versión más reciente del Agent 5 (igual o posterior a la 5.12.0, pero anterior a la 6.0.0) usando el [instalador EXE][2] y, luego, actualizar el Datadog Agent a una versión igual o posterior a la 6.

[1]: /es/agent/guide/python-3/
[2]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
{{% /tab %}}
{{< /tabs >}}

### Archivos de logs de la instalación

Puedes encontrar los archivos de logs de la instalación del Agent en `%TEMP%\MSI*.LOG`.

### Validación

Para verificar tu instalación, sigue las instrucciones que aparecen en la sección [Estado e información del Agent](#agent-status-and-information).

## Comandos del Agent

La ejecución del Agent la controla el administrador de control de servicios de Windows.

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

* El nombre del archivo ejecutable principal es `agent.exe`. Dependiendo de la versión del Agent, su ubicación es la siguiente:
    - Versiones del Agent <= 6.11: `"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe"`
    - Versiones del Agent >= 6.12: `"C:\Program Files\Datadog\Datadog Agent\bin\agent.exe"`
* La GUI de configuración es una aplicación de configuración basada en el navegador (solo para Windows de 64 bits).
* Se pueden ejecutar comandos desde una línea de comandos **elevada (ejecutada como Admin)** (PowerShell o Command Prompt) con la sintaxis `<PATH_TO_AGENT.EXE> <COMMAND>`.
* Estas son las opciones de línea de comandos:

| Comando         | Descripción                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | Ejecuta el check especificado.                                                        |
| diagnose        | Ejecuta un diagnóstico de la conectividad en tu sistema.                             |
| flare           | Recopila un flare y lo envía a Datadog.                                         |
| help            | Encuentra ayuda sobre cualquier comando.                                                     |
| hostname        | Copia el nombre de host que utiliza el Agent.                                           |
| import          | Importa y convierte archivos de configuración de versiones anteriores del Agent.    |
| launch-gui      | Inicia el Datadog Agent Manager.                                                |
| restart-service | Reinicia el Agent dentro del administrador de control de servicios.                           |
| run             | Inicia el Agent.                                                                |
| start           | Inicia el Agent. (Obsoleto, pero aceptado. Usa `run` como alternativa). |
| start-service   | Inicia el Agent dentro del administrador de control de servicios.                             |
| status          | Copia el estado actual.                                                        |
| stopservice     | Detiene el Agent en el administrador de control de servicios.                              |
| version         | Copia información acerca de la versión.                                                         |

* Ejemplos:
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

{{% /tab %}}
{{% tab "Agent v5" %}}

Usa el Datadog Agent Manager (disponible en el menú de Inicio).

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="Menú de Inicio de Windows" style="width:75%;">}}

Usa los comandos `start`, `stop` y `restart` en el Datadog Agent Manager:

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Snapshot del Manager" style="width:75%;">}}

También puedes usar Windows PowerShell, si está disponible:
`[start|stop|restart]-service datadogagent`

{{% /tab %}}
{{< /tabs >}}

## Configuración

Usa el [Datadog Agent Manager][6] para activar, desactivar y configurar checks. Reinicia el Agent para aplicar los cambios.

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}
El archivo de configuración principal del Agent está en:
`C:\ProgramData\Datadog\datadog.yaml`
{{% /tab %}}
{{% tab "Agent v5" %}}

El archivo de configuración principal del Agent está en:
`C:\ProgramData\Datadog\datadog.conf`
{{% /tab %}}
{{< /tabs >}}

Los archivos de configuración para las integraciones están en:
`C:\ProgramData\Datadog\conf.d\` O
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**Nota**: `ProgramData` es una carpeta oculta.

## Solucionar problemas

### Estado e información del Agent

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

Para verificar que el Agent se está ejecutando, comprueba si el servicio `DatadogAgent` del panel Services (Servicios) aparece como *Started* (Iniciado). También debería aparecer un proceso llamado *Datadog Metrics Agent* (`agent.exe`) en el Administrador de tareas.

Para obtener más información sobre el estado del Agent, inicia el Datadog Agent Manager:

* Haz un clic derecho en el icono de la bandeja del sistema del Datadog Agent -> Configurar, o
* Ejecuta el comando `launch-gui` desde una línea de comando **elevada (ejecutada como Admin)**
    - PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
    - cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

Luego, ve a *Status* -> *General* para abrir la página de estado.
Obtén más información sobre la ejecución de checks en *Status* -> *Collector* y *Checks* -> *Summary*.

El comando de estado está disponible para PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

o cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

{{% /tab %}}
{{% tab "Agent v5" %}}

Para verificar que el Agent se está ejecutando, comprueba si el estado del servicio del panel Services (Servicios) aparece como "Started" (Iniciado). También debería aparecer un proceso llamado `ddagent.exe` en el Administrador de tareas.

La información sobre el estado del Agent en el Agent v5.2 (y posteriores) está disponible en
*Datadog Agent Manager -> Settings -> Agent Status*:

{{< img src="agent/faq/windows_status.png" alt="Estado en Windows" style="width:50%;" >}}

Para conocer el estado del Agent en las versiones que van de la 3.9.1 a la 5.1, dirígete a `http://localhost:17125/status`.

El comando info está disponible para PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" info
```

o cmd.exe:

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" info
```

**Nota**: En el caso del Agent 6.11 (o sus versiones anteriores), la ruta debería ser `%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe`.

{{% /tab %}}
{{< /tabs >}}

### Localización de los logs

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

Los logs del Agent están localizados en `C:\ProgramData\Datadog\logs\agent.log`.

**Nota**: `ProgramData` es una carpeta oculta.

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][1].

[1]: /es/help/
{{% /tab %}}
{{% tab "Agent v5" %}}

En el caso Windows Server 2008, Vista y otros sistemas más recientes, los logs del Agent están localizados en `C:\ProgramData\Datadog\logs`.

**Nota**: `ProgramData` es una carpeta oculta.

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][1].

[1]: /es/help/
{{% /tab %}}
{{< /tabs >}}

### Enviar un flare

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

* Dirígete a [http://127.0.0.1:5002][1] para mostrar el Datadog Agent Manager.

* Selecciona la pestaña Flare.

* Introduce tu número de ticket (si tienes uno).

* Introduce la dirección de correo electrónico que usas para iniciar sesión en Datadog.

* Pulsa Submit (Enviar).

El comando flare está disponible para PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

o cmd.exe:

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare <CASE_ID>
```

{{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Flare en Windows con el Agent 6" style="width:75%;">}}

[1]: http://127.0.0.1:5002
{{% /tab %}}
{{% tab "Agent v5" %}}

Para enviar una copia de tus logs y configuraciones de Windows al equipo de asistencia de Datadog, sigue los siguientes pasos:

* Abre el Datadog Agent Manager.

* Selecciona Actions (Acciones).

* Selecciona Flare.

* Introduce tu número de ticket (si no lo tienes, deja el valor en cero).

* Introduce el correo electrónico que usas para acceder a Datadog.

{{< img src="agent/faq/windows_flare.jpg" alt="Flare en Windows" style="width:70%;">}}

El comando flare está disponible para PowerShell:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

o cmd.exe:

```
"%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe" "%ProgramFiles%\Datadog\Datadog Agent\agent\agent.py" flare <CASE_ID>
```

#### El flare no se carga

El resultado del comando flare te dice donde se guarda el archivo flare comprimido. Si se produce algún error al cargar el archivo a Datadog, lo puedes recuperar desde este directorio y añadirlo manualmente como adjunto a un correo electrónico. Localizaciones en las que suelen guardarse los archivos flare:
- Linux: `\tmp\`
- MacOS: `$TMPDIR`
- Windows: `C:\Users\<DDAGENTUSER>\AppData\Local\Temp\`

Si usas alguna versión anterior del Agent, encontrarás la localización de este archivo ejecutando lo siguiente desde el símbolo del sistema de Python del Agent:

**Paso 1**:

* Agent v5.12 (y posteriores):
    `"%ProgramFiles%\Datadog\Datadog Agent\dist\shell.exe" since`

* Versiones anteriores del Agent:
    `"%ProgramFiles%\Datadog\Datadog Agent\files\shell.exe"`

**Paso 2**:

```python
import tempfile
print tempfile.gettempdir()
```

Ejemplo:

{{< img src="agent/faq/flare_fail.png" alt="Error en el flare" style="width:70%;">}}

{{% /tab %}}
{{< /tabs >}}

## Casos de uso

###  Monitorización de un servicio de Windows

En tu host de destino, inicia el Datadog Agent Manager y selecciona la integración "Windows Service" de la lista. Hay un ejemplo predefinido; sin embargo, este ejemplo usa DHCP.

Para obtener el nombre del servicio, abre `services.msc` y localiza tu servicio de destino. Si usas DHCP como destino, podrás ver el nombre del servicio en la parte superior de la ventana de propiedades del servicio:

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

Cuando añadas tus propios servicios, asegúrate de respetar el formato tal y como te lo mostramos. La integración fallará si el formato no es correcto. **Nota**: Si hay caracteres especiales en un nombre de servicio, debes usar una secuencia de escape. Por ejemplo, el nombre `MSSQL$BILLING` se puede añadir con `MSSQL\$BILLING`.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Servicio DHCP en Windows" style="width:75%;">}}

Además, cuando modificas una integración, hay que reiniciar el servicio de Datadog. Esto se puede hacer desde services.msc o desde la barra lateral de la IU.

En el caso de los servicios, Datadog no rastrea las métricas, sino solo su disponibilidad. (Para las métricas, usa la integración de [Process](#monitoring-windows-processes) o [WMI][7]). Para configurar un monitor, selecciona el [tipo de monitor de la integración][8] y, luego, busca **Windows Service**. En *Integration Status -> Pick Monitor Scope*, selecciona el servicio que te gustaría monitorizar.

### Monitorización de la carga del sistema en Windows

El Datadog Agent recopila de forma predeterminada un gran número de métricas del sistema. Las métricas del sistema que más se utilizan son `system.load.*`, pero estas son específicas para **Unix**.

Aunque Windows no proporciona las métricas de `system.load.*`, hay una opción equivalente disponible por defecto: `system.proc.queue.length`. Esta métrica muestra el número de subprocesos que aparecen con retraso en la cola de procesos listos para su ejecución.

### Monitorización de procesos en Windows

Puedes monitorizar procesos de Windows con [Live Process Monitoring][9]. Para habilitar esta función en Windows, modifica el [archivo de configuración principal del Agent][10] estableciendo el siguiente parámetro como true:

`datadog.yaml`:

```yaml
process_config:
  enabled: "true"
```

Una vez terminada la configuración, [reinicia el Agent][11].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: /es/agent/basic_agent_usage/?tab=agentv6v7#supported-platforms
[3]: /es/agent/faq/windows-agent-ddagent-user/
[4]: /es/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[5]: /es/agent/faq/windows-agent-ddagent-user/#domain-controllers
[6]: /es/agent/guide/datadog-agent-manager-windows/
[7]: /es/integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors#create/integration
[9]: /es/infrastructure/process/?tab=linuxwindows#installation
[10]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file
[11]: /es/agent/guide/agent-commands/#restart-the-agent
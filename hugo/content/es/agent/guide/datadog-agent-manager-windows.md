---
description: Utilice la interfaz gráfica de usuario (GUI) del Datadog Agent Manager
  basada en navegador para configurar y administrar el Agent de Windows con navegadores
  y autenticación compatibles.
further_reading:
- link: /agent/basic_agent_usage/windows/
  tag: Documentación
  text: Uso básico del Agent de Windows
title: Datadog Agent Manager para Windows
---
## Descripción general {#overview}

La GUI del Datadog Agent Manager está basada en navegador. El puerto en el que se ejecuta la GUI se puede configurar en su archivo `datadog.yaml`. Establecer el puerto en `-1` deshabilita la GUI. De forma predeterminada, está habilitada en el puerto 5002 para Windows y Mac, y está deshabilitada en Linux.

### Requisitos {#requirements}

1. Las cookies deben estar habilitadas en su navegador. La GUI genera y guarda un token en su navegador que se utiliza para autenticar todas las comunicaciones con el servidor de la GUI.

2. La GUI solo se inicia si el usuario que la inicia tiene los permisos de usuario correctos. Si puede abrir `datadog.yaml`, puede usar la GUI.

3. Por razones de seguridad, la GUI solo puede ser accedida desde la interfaz de red local (localhost/127.0.0.1), por lo que debe estar en el mismo servidor en el que se ejecuta el Agent para usarla. En otras palabras, no puede ejecutar el Agent en una VM o contenedor y acceder a él desde el servidor.

#### Navegadores compatibles {#supported-browsers}

| Navegador       | Versión compatible (o posterior) | Comentario                 |
|---------------|------------------------------|-------------------------|
| IE            | 11                           |                         |
| Edge          | 12                           |  Edge anterior a Chromium |
| Edge-chromium | 79                           |                         |
| Firefox       | 38                           |                         |
| Chrome        | 60                           |                         |
| Safari        | 8                            |                         |
| iOS           | 12                           |  Mobile Safari          |

### Inicie el Datadog Agent Manager {#start-the-datadog-agent-manager}

Después de que el Agent esté [instalado][1] en su servidor Windows, inicie el Datadog Agent Manager para administrar el Agent de forma gráfica.

Desde el menú de inicio de Windows:

* Haga clic en la carpeta {{< ui >}}Datadog{{< /ui >}}.
* Haga clic derecho en {{< ui >}}Datadog Agent Manager{{< /ui >}}.
* Elija {{< ui >}}Run as Administrator{{< /ui >}}.

Desde un símbolo del sistema de PowerShell con privilegios elevados:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
```

El Datadog Agent Manager se inicia en su navegador web predeterminado. La dirección web es `http://127.0.0.1:5002`.

## Opciones {#options}

Las siguientes secciones proporcionan información sobre las opciones en la barra de navegación izquierda.

### Estado {#status}

#### General {#general}

La página de estado general se muestra de forma predeterminada al iniciar el Datadog Agent Manager. Contiene las siguientes secciones:

| Sección     | Descripción                                                                     |
|-------------|---------------------------------------------------------------------------------|
| {{< ui >}}Agent Info{{< /ui >}}  | Proporciona información sobre el Agent, incluyendo la versión, el nivel de registro y las rutas de archivo. |
| {{< ui >}}System Info{{< /ui >}} | Incluye información sobre la hora del sistema, el desfase NTP y las versiones de Go y Python.       |
| {{< ui >}}Host Info{{< /ui >}}   | Proporciona información sobre el servidor, incluyendo el SO, la plataforma, los procesos y el tiempo de actividad.     |
| {{< ui >}}Hostnames{{< /ui >}}   | Muestra los nombres de servidor y las etiquetas de servidor encontrados por el Agent.                        |
| {{< ui >}}JMX Status{{< /ui >}}  | Una lista de verificaciones JMX con su estado.                                         |
| {{< ui >}}Forwarder{{< /ui >}}   | Información sobre el reenviador del Agent, incluyendo el estado de su clave de API.      |
| {{< ui >}}Endpoints{{< /ui >}}   | Endpoints en uso por el Agent.                                                  |
| {{< ui >}}Logs Agent{{< /ui >}}  | Información sobre el Agent de registro (si está habilitado).                                     |
| {{< ui >}}Aggregator{{< /ui >}}  | Información sobre el agregador de datos del Agent.                                     |
| {{< ui >}}DogStatsD{{< /ui >}}   | Estadísticas sobre los datos enviados con DogStatsD.                                         |

#### Recopilador {#collector}

La página de estado del recopilador muestra detalles sobre las verificaciones en ejecución del Agent, por ejemplo:

```text
cpu
   Instance ID: cpu [OK]
   Total Runs: 1,561
   Metric Samples: 7, Total: 10,921
   Events: 0, Total: 0
   Service Checks: 0, Total: 0
   Average Execution Time: 4ms
```

### Registro {#log}

La página de registro muestra los registros del Agent que se están enviando a `agent.log`. Los registros se pueden ordenar del más reciente al más antiguo o viceversa.

```text
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check cpu
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check cpu
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check disk
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check disk
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check file_handle
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check file_handle
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check io
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check io
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check memory
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check memory
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check network
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check network
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check ntp
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check ntp
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check uptime
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check uptime
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check winproc
2019-07-10 17:46:05 EDT | INFO | (runner.go:302 in work) | Done running check winproc
2019-07-10 17:48:02 EDT | INFO | (transaction.go:114 in Process) | Successfully posted payload to "https://6-2-1-app.agent.datadoghq.com/api/v1/check_run?api_key=*************************12345"
```

### Configuración {#settings}

La página de configuración muestra el contenido del archivo de configuración principal del Agent `datadog.yaml`. Puede editar este archivo directamente desde el Datadog Agent Manager. Después de realizar un cambio, haga clic en {{< ui >}}Save{{< /ui >}} en la parte superior derecha y luego en [reiniciar el Agent](#restart-agent).

Para obtener una lista completa de las opciones disponibles, consulte el [archivo `datadog.yaml` de ejemplo para Windows][6].

### Verificaciones {#checks}

#### Administrar verificaciones {#manage-checks}

La página de gestión de verificaciones muestra el contenido de los archivos de configuración de verificaciones habilitados. Puede editar estos archivos directamente desde el Datadog Agent Manager. Después de realizar un cambio, haga clic en {{< ui >}}Save{{< /ui >}} en la parte superior derecha y luego en [reiniciar el Agent](#restart-agent).

Para agregar una verificación, seleccione {{< ui >}}Add a Check{{< /ui >}} en el menú desplegable. Esto muestra una lista de las verificaciones disponibles para instalar. Consulte la página de [integración][3] de la verificación específica para obtener detalles de configuración.

#### Resumen de verificaciones {#checks-summary}

La página de resumen de verificaciones muestra una lista de las verificaciones en ejecución, el número de instancias para cada verificación y el estado de la verificación.

### Flare {#flare}

Si tiene problemas con el Agente, la página de flare le ayuda a solucionar problemas con el equipo de [soporte de Datadog][4]. Ingrese su número de ticket (opcional) y su dirección de correo electrónico, luego haga clic en {{< ui >}}Submit{{< /ui >}}. Esto transmite una copia de los registros y archivos de configuración de su Agente al soporte de Datadog. Hay más información sobre los flares disponible en la documentación de [Agent Flare][5].

### Reiniciar Agent {#restart-agent}

Al hacer clic en {{< ui >}}Restart Agent{{< /ui >}} desde la barra de navegación izquierda, se reinicia el Agent inmediatamente. No hay ninguna página ni aviso de confirmación. Después de reiniciar el Agent, se le redirige a la página de [estado general](#general).

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/basic_agent_usage/windows/#installation
[3]: /es/integrations/
[4]: /es/help/
[5]: /es/agent/troubleshooting/send_a_flare/
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
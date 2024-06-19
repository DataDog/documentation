---
further_reading:
- link: /agent/basic_agent_usage/windows/
  tag: Documentación
  text: Uso básico del Agent para el Windows Agent
title: Datadog Agent Manager para Windows
---

## Información general

La GUI del Datadog Agent Manager está basada en un navegador. Es posible configurar el puerto en el que se ejecuta la GUI en el archivo `datadog.yaml`. Si el puerto se define como `-1`, se desactiva la GUI. Por defecto, está habilitado en el puerto 5002 para Windows y Mac y está deshabilitado en Linux.

### Requisitos

1. Es necesario habilitar las cookies en tu navegador. La GUI genera y guarda un token en tu navegador para autenticar todas las comunicaciones que se establezcan con el servidor de la GUI.

2. La GUI solo se inicia si el usuario que la ejecuta tiene los permisos correspondientes. Si puedes abrir `datadog.yaml`, puedes utilizar la GUI.

3. Por motivos de seguridad, solo se puede acceder a la GUI desde la interfaz de red local (localhost/127.0.0.1). Por tanto, para utilizarla, debes estar en el mismo host en el que se está ejecutando el Agent. En otras palabras, no puedes ejecutar el Agent en una máquina virtual o en un contenedor, y acceder a él desde el equipo host.

#### Navegadores compatibles

| Navegador       | Versión compatible (o posterior) | Comentario                 |
|---------------|------------------------------|-------------------------|
| Internet Explorer​            | 11                           |                         |
| Edge          | 12                           |  Edge antes de Chromium |
| Edge basado en Chromium | 79                           |                         |
| Firefox       | 38                           |                         |
| Chrome        | 60                           |                         |
| Safari        | 8                            |                         |
| iOS           | 12                           |  Safari para dispositivos móviles          |

### Iniciar el Datadog Agent Manager

Después de [instalar][1] el Agent en tu host de Windows, inicia el Datadog Agent Manager para gestionar el Agent gráficamente.

Desde el menú de inicio de Windows:

* Haz clic en la carpeta Datadog.
* Haz clic con el botón derecho en Datadog Agent Manager.
* Selecciona `Run as Administrator`.

Desde un símbolo del sistema PowerShell avanzado:
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
```

El Datadog Agent Manager se iniciará en tu navegador web predeterminado. La dirección web es `http://127.0.0.1:5002`.

## Opciones

Las siguientes secciones proporcionan información sobre las opciones de la barra de navegación de la izquierda.

### Estado

#### General

La página de estado general se muestra por defecto al iniciar el Datadog Agent Manager. Incluye las siguientes secciones:

| Sección     | Descripción                                                                     |
|-------------|---------------------------------------------------------------------------------|
| Agent Info (Información del Agent)  | Proporciona información sobre el Agent, como la versión, el nivel de log y las rutas de archivo. |
| System Info (Información del sistema) | Incluye información sobre la hora del sistema, diferencia horaria con NTP, Go y las versiones de Python.       |
| Host Info (Información sobre el host)   | Proporciona información sobre el host, como el sistema operativo, la plataforma, los procesos y el tiempo de actividad.     |
| Hostnames (Nombres de host)   | Muestra los nombres de host y las etiquetas (tags) de host detectados por el Agent.                        |
| JMX Status (Estado de JMX)  | Una lista de checks de JMX con su estado.                                         |
| Forwarder   | Información sobre el Forwarder del Agent, como el estado de su clave de API.      |
| Endpoints   | Endpoints utilizados por el Agent.                                                  |
| Logs Agent  | Información sobre el Logs Agent (si está habilitado).                                     |
| Aggregator  | Información sobre el Aggregator de datos del Agent.                                     |
| DogStatsD   | Estadísticas sobre los datos enviados con DogStatsD.                                         |

#### Collector

La página de estado del Collector muestra información sobre los checks en ejecución del Agent. Ejemplo:

```text
cpu
   Instance ID: cpu [OK]
   Total Runs: 1,561
   Metric Samples: 7, Total: 10,921
   Events: 0, Total: 0
   Service Checks: 0, Total: 0
   Average Execution Time: 4ms
```

### Log

La página de logs muestra los logs del Agent que se envían a `agent.log`. Los logs se pueden ordenar de más recientes a más antiguos, o al revés.

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

### Parámetros

La página de parámetros muestra el contenido del archivo de configuración principal del Agent: `datadog.yaml`. Puedes editar este archivo directamente desde el Datadog Agent Manager. Después de realizar cualquier cambio, haz clic en **Save** (Guardar), en la parte superior derecha, y luego [reinicia el Agent](#restart-agent).

Consulta el [ejemplo `config_template.yaml`][2] para ver todas las opciones de configuración disponibles.

### Checks

#### Gestionar checks

La página de gestión de checks muestra el contenido de los archivos de configuración de checks habilitados. Puedes editar estos archivos directamente desde el Datadog Agent Manager. Después de realizar cualquier cambio, haz clic en **Save** (Guardar), en la parte superior derecha, y luego [reinicia el Agent](#restart-agent).

Para añadir un check, selecciona **Add a Check** (Añadir un check) en el menú desplegable. Aparecerá una lista de los checks disponibles que se pueden instalar. Consulta la página de [integración][3] del check en cuestión para obtener más información sobre su configuración.

#### Resumen de los checks

La página de resumen de los checks muestra una lista de los checks en ejecución, el número de veces que se repiten y su estado.

### Flare

Si tienes algún problema con el Agent, la página de flares te ayuda a solucionar el problema con el equipo de [asistencia de Datadog][4]. Introduce tu número de ticket (opcional) y dirección de correo electrónico, y haz clic en **Submit** (Enviar). De este modo, se transmitirá una copia de los logs y archivos de configuración de tu Agent al equipo de asistencia de Datadog. Puedes encontrar más información sobre los flares en la página dedicada al [flare del Agent][5].

### Reiniciar el Agent

Al hacer clic en **Restart Agent** (Reiniciar el Agent) en la barra de navegación de la izquierda, este se reinicia de forma automática. No aparecerá ninguna página ni mensaje de confirmación. Después de reiniciar el Agent, se abrirá la página de [estado general](#general).

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/basic_agent_usage/windows/#installation
[2]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[3]: /es/integrations/
[4]: /es/help/
[5]: /es/agent/troubleshooting/send_a_flare/
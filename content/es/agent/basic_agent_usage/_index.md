---
aliases:
- /es/guides/basic_agent_usage/
- /es/agent/faq/where-is-the-configuration-file-for-the-agent/
- /es/agent/faq/log-location
further_reading:
- link: /agent/faq/how-datadog-agent-determines-the-hostname/
  tag: FAQ
  text: ¿Cómo determina Datadog el nombre de host del Agent?
- link: /agent/guide/agent-commands/
  tag: FAQ
  text: Lista de todos los comandos del Agent
- link: /agent/guide/agent-configuration-files/
  tag: FAQ
  text: Localización de todos los archivos de configuración del Agent
- link: https://www.datadoghq.com/blog/engineering/performance-improvements-in-the-datadog-agent-metrics-pipeline/
  tag: Blog
  text: Mejoras de rendimiento en el pipeline de métricas del Datadog Agent
kind: documentación
title: Uso básico del Agent
---

{{< partial name="platforms/platforms.html" links="platforms" >}}

## Arquitectura del Agent

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

Las versiones 6 y 7 del Agent constan de un proceso principal que se encarga de recopilar métricas de infraestructura y logs, y de recibir [métricas de DogStatsD][1]. Los componentes principales de este proceso son:

* Collector, encargado de ejecutar checks y recopilar métricas.
* Forwarder, que envía cargas útiles a Datadog.

Si se activa en el archivo de configuración `datadog.yaml`, el Agent genera dos procesos opcionales:

* El Agent de APM, un proceso que recopila [trazas][2] (activado por defecto).
* El Agent de proceso, un proceso que recopila información de los procesos en tiempo real. Por defecto, solo recopila los contenedores disponibles; de lo contrario, está desactivado.

En Windows, los servicios se presentan de la forma siguiente:

| Servicio               | Descripción             |
|-----------------------|-------------------------|
| DatadogAgent          | "Datadog Agent"         |
| datadog-trace-agent   | "Datadog Trace Agent"   |
| datadog-process-agent | "Datadog Process Agent" |

Por defecto, el Agent vincula 3 [puertos][3] en Linux y 4 en Windows y OSX:

| Puerto | Descripción                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Muestra métricas de tiempo de ejecución del Agent.                                                    |
| 5001 | La CLI y la GUI del Agent lo usan para enviar comandos y recopilar información del Agent en ejecución. |
| 5002 | Provee al servidor de la GUI en Windows y OSX.                                                   |
| 8125 | El servidor de DogStatsD lo usa para recibir métricas externas.                                  |

Para más información sobre cómo configurar los puertos, consulta [Tráfico de red][4].

### Collector

El recopilador Collector captura todas las métricas estándar cada 15 segundos. El Agent v6 tiene un intérprete de Python 2.7 integrado para ejecutar integraciones y [checks personalizados][5].

### Forwarder

Forwarder, el reenviador del Agent, envía métricas a Datadog sobre HTTPS. El almacenamiento en búfer impide que las desconexiones temporales de la red afecten a las métricas. Las métricas se almacenan en la memoria hasta llegar a un límite de tamaño o de solicitudes de envío en espera. Después, las métricas más antiguas se descartan para mantener la huella de memoria de Forwarder dentro de unos límites razonables. Los logs se envían a través de una conexión TCP encriptada con SSL a Datadog.

### DogStatsD

En la v6, DogStatsD es una implementación Golang del daemon de agregación de métricas [StatsD de Etsy][6]. Se usa para recibir y transferir métricas arbitrarias mediante UDP o un socket de Unix, lo que permite instrumentar código personalizado sin aumentar la latencia. Más información sobre [DogStatsD][7].

[1]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /es/tracing/guide/terminology/
[3]: /es/agent/guide/network/#open-ports
[4]: /es/agent/guide/network#configure-ports
[5]: /es/developers/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/agent5architecture.jpg" alt="Arquitectura del Agent v5" >}}

El Agent v5 tiene cuatro componentes principales, redactados en lenguaje Python, que se ejecutan como procesos independientes:

* **Collector** (`agent.py`): Ejecuta checks en la máquina actual sobre las [integraciones][1] configuradas y captura métricas del sistema, como las de la memoria y la CPU.
* **DogStatsD** (`dogstatsd.py`): Servidor backend compatible con StatsD al que puedes enviar [métricas personalizadas][2] desde tus aplicaciones.
* **Forwarder** (`ddagent.py`): Recopila datos tanto de DogStatsD como de Collector, los añade a la cola y después los envía a Datadog.
* **SupervisorD**: Todo está controlado por un único proceso supervisor. Se mantiene de forma independiente para limitar la sobrecarga de cada aplicación si no se están ejecutando todas las partes. Sin embargo, por lo general, es recomendable ejecutar todas las partes.

**Nota**: En el caso de los usuarios de Windows, los cuatro procesos del Agent se presentan como instancias de `ddagent.exe` con la descripción `DevOps' best friend`.

### Supervisión, privilegios y puertos de red

Se ejecuta un proceso primario de SupervisorD con el usuario `dd-agent`, y todos los subprocesos dependientes se ejecutan con el mismo usuario. Esto también es aplicable a cualquier llamada del sistema (`iostat`/`netstat`) iniciada por el Datadog Agent. La configuración del Agent se almacena en `/etc/dd-agent/datadog.conf` y `/etc/dd-agent/conf.d`. `dd-agent` debe ser capaz de leer toda la configuración. Los permisos recomendados son 0600, ya que los archivos de configuración contienen tu clave de API y otras credenciales necesarias para acceder a las métricas.

Los [puertos][3] siguientes están abiertos para realizar operaciones:

| Puerto      | Descripción                         |
|-----------|-------------------------------------|
| tcp/17123 | Forwarder para operaciones normales |
| tcp/17124 | Forwarder para garantizar la compatibilidad con Graphite  |
| udp/8125  | DogStatsD                           |

Todos los procesos de escucha están vinculados por defecto a `127.0.0.1` o `::1` en el Agent v3.4.1 (y posteriores). En versiones anteriores, estaban vinculados a `0.0.0.0` (todas las interfaces). Para más información sobre cómo ejecutar el Agent a través de un proxy, consulta [Configuración del proxy del Agent][4]. Para más información sobre los intervalos de IP que se pueden permitir, consulta [Tráfico de red][5].

El número recomendado de descriptores de archivos abiertos es de 1024. Puedes ver este valor con el comando `ulimit -a`. Si existe un límite estricto por debajo del valor recomendado, como puede ser el establecido por la Shell Fork Bomb Protection, una solución es añadir lo siguiente en `supervisord.conf`:

```conf
[supervisord]
minfds = 100  # Your hard limit
```

[1]: /es/integrations/
[2]: /es/metrics/custom_metrics/
[3]: /es/agent/guide/network/?tab=agentv5v4#open-ports
[4]: /es/agent/proxy/?tab=agentv5
[5]: /es/agent/faq/network/
{{% /tab %}}
{{< /tabs >}}

## Interfaz gráfica de usuario (GUI)

Puedes configurar el puerto en el que se ejecuta la GUI en el archivo `datadog.yaml`. Para desactivar la GUI, cambia el valor del puerto a `-1`. En Windows y macOS, la GUI viene habilitada de forma predeterminada y se ejecuta en el puerto `5002`. En Linux, en cambio, la GUI está deshabilitada.

Cuando el Agent esté ejecutándose, usa el comando `datadog-agent launch-gui` para abrir la GUI en tu navegador web por defecto.

**Nota**: La GUI del Agent no es compatible con plataformas de Windows de 32 bits.

### Requisitos

1. Es necesario habilitar las cookies en tu navegador. La GUI genera en tu navegador, donde también guarda un token que se utiliza para autenticar todas las comunicaciones con el servidor de la GUI.

2. Para iniciar la GUI, el usuario debe tener los permisos necesarios. Si puedes abrir `datadog.yaml`, puedes usar la GUI.

3. Por motivos de seguridad, **solo** se puede acceder a la GUI desde la interfaz de red local (`localhost`/`127.0.0.1`); por lo tanto, debes estar en el mismo host en el que se está ejecutando el Agent. En otras palabras, no puedes ejecutar el Agent en una máquina virtual o contenedor y acceder a él desde el host.

## Plataformas compatibles

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

| Plataforma (x86 de 64 bits)                    | Versiones compatibles                                        |
|------------------------------------------|-----------------------------------------------------------|
| [Amazon Linux][1]                        | Amazon Linux 2                                            |
| [Debian][2] con systemd                 | Debian 7 (Wheezy) y posteriores en el Agent < 6.36.0/7.36.0, Debian 8 (Jessie) y posteriores en el Agent 6.36.0/7.36.0 (y posteriores) |
| [Debian][2] con SysVinit                | Debian 7 (Wheezy) y posteriores en el Agent 6.6.0 - 6.36.0/7.36.0, Debian 8 (Jessie) y posteriores en el Agent 6.36.0/7.36.0 (y posteriores) |
| [Ubuntu][3]                              | Ubuntu 14.04 (y posteriores)                                             |
| [RedHat/CentOS/AlmaLinux/Rocky][4]       | RedHat/CentOS 6 (y posteriores), AlmaLinux/Rocky 8 (y posteriores) en el Agent 6.33.0/7.33.0 (y posteriores) |
| [Docker][5]                              | Versión 1.12 (y posteriores)                                             |
| [Kubernetes][6]                          | Versión 1.3 (y posteriores)                                              |
| [SUSE Enterprise Linux][7] con systemd  | SUSE 11 SP4 (y posteriores) en el Agent < 6.33.0/7.33.0, SUSE 12 (y posteriores) en el Agent 6.33.0/7.33.0 (y posteriores)                     |
| [SUSE Enterprise Linux][7] con SysVinit | SUSE 11 SP4 en el Agent 6.16.0/7.16.0 - 6.33.0/7.33.0        |
| [OpenSUSE][7] con systemd               | OpenSUSE 15 (y posteriores) en el Agent 6.33.0/7.33.0 (y posteriores)                     |
| [Fedora][8]                              | Fedora 26 (y posteriores)                                                |
| [macOS][9]                               | macOS 10.12 (y posteriores) en el Agent < 6.35.0/7.35.0, macOS 10.13 (y posteriores) en el Agent < 7.39.0, macOS 10.14 (y posteriores) en el Agent 7.39.0 (y posteriores) |
| [Windows Server][10]                     | Windows Server 2008 R2 y posteriores (Server Core incluido)           |
| [Windows][10]                            | Windows 7 (y posteriores)                                                |
| [Azure Stack HCI OS][10]                 | Todas las versiones                                              |

| Plataforma (Arm v8 de 64 bits)                 | Versiones compatibles                                        |
|------------------------------------------|-----------------------------------------------------------|
| [Amazon Linux][1]                        | Amazon Linux 2                                            |
| [Debian][2] con systemd                 | Debian 9 (Stretch) y posteriores                                       |
| [Ubuntu][3]                              | Ubuntu 16.04 (y posteriores)                                             |
| [RedHat/CentOS/AlmaLinux/Rocky][4]       | RedHat/CentOS 8 (y posteriores), AlmaLinux/Rocky 8 (y posteriores) en el Agent 6.33.0/7.33.0 (y posteriores) |
| [Docker][5]                              | Versión 1.12 (y posteriores)                                             |
| [Kubernetes][6]                          | Versión 1.3 (y posteriores)                                              |
| [Fedora][8]                              | Fedora 27 (y posteriores)                                                |
| [macOS][9]                               | macOS 11.0 (y posteriores)                                               |


**Notas**:
- La instalación de [origen][11] podría funcionar en sistemas operativos no listados aquí; por nuestra parte, hacemos lo posible para que sea compatible.
- El Datadog Agent v6 (y posteriores) es compatible con Windows Server 2008 R2, siempre que las últimas actualizaciones de Windows estén instaladas. Asimismo, se tiene constancia de que hay un [problema con el desplazamiento del reloj y Go][12] que afecta a Windows Server 2008 R2.

[1]: /es/agent/basic_agent_usage/amazonlinux/
[2]: /es/agent/basic_agent_usage/deb/
[3]: /es/agent/basic_agent_usage/ubuntu/
[4]: /es/agent/basic_agent_usage/redhat/
[5]: /es/agent/docker/
[6]: /es/agent/basic_agent_usage/kubernetes/
[7]: /es/agent/basic_agent_usage/suse/
[8]: /es/agent/basic_agent_usage/fedora/
[9]: /es/agent/basic_agent_usage/osx/
[10]: /es/agent/basic_agent_usage/windows/
[11]: /es/agent/basic_agent_usage/source/
[12]: https://github.com/golang/go/issues/24489
{{% /tab %}}
{{% tab "Agent v5" %}}

| Plataforma                   | Versiones compatibles     |
|----------------------------|------------------------|
| [Amazon Linux][1]          | Amazon Linux 2         |
| [Debian][2]                | Debian 7 (Wheezy) y posteriores     |
| [Ubuntu][3]                | Ubuntu 12.04 (y posteriores)          |
| [RedHat/CentOS][4]         | RedHat/CentOS 5 (y posteriores)       |
| [Docker][5]                | Versión 1.12 (y posteriores)          |
| [Kubernetes][6]            | De la versión 1.3 a la 1.8     |
| [SUSE Enterprise Linux][7] | SUSE 11 SP4 (y posteriores)           |
| [Fedora][8]                | Fedora 26 (y posteriores)             |
| [macOS][9]                 | macOS 10.10 (y posteriores)           |
| [Windows Server][10]       | Windows Server 2008 (y posteriores)   |
| [Windows][10]              | Windows 7 (y posteriores)             |

**Notas**:

- La instalación de [origen][11] podría funcionar en sistemas operativos no listados aquí; por nuestra parte, hacemos lo posible para que sea compatible.

[1]: /es/agent/basic_agent_usage/amazonlinux/?tab=agentv5
[2]: /es/agent/basic_agent_usage/deb/
[3]: /es/agent/basic_agent_usage/ubuntu/
[4]: /es/agent/basic_agent_usage/redhat/
[5]: /es/agent/docker/
[6]: /es/agent/basic_agent_usage/kubernetes/
[7]: /es/agent/basic_agent_usage/suse/
[8]: /es/agent/basic_agent_usage/fedora/
[9]: /es/agent/basic_agent_usage/osx/
[10]: /es/agent/basic_agent_usage/windows/
[11]: /es/agent/basic_agent_usage/source/
{{% /tab %}}
{{% tab "Unix Agent" %}}

| Plataforma | Versiones compatibles                        |
|----------|-------------------------------------------|
| [AIX][1] | AIX 6.1 TL9 SP6, 7.1 TL5 SP3, 7.2 TL3 SP0 |

[1]: /es/agent/basic_agent_usage/aix/
{{% /tab %}}
{{< /tabs >}}

## Interfaz de línea de comandos (CLI)

Con Agent v6 (y posteriores), la interfaz de la línea de comandos se basa en subcomandos. Para ejecutar un subcomando, primero hay que invocar el archivo binario del Agent:

```text
<AGENT_BIN_PATH> <SUB_COMMAND> <OPTIONS>
```

| Subcomando        | Notas                                                                       |
|-------------------|-----------------------------------------------------------------------------|
| `check`           | Ejecuta el check especificado.                                                    |
| `configcheck`     | Copia todas las configuraciones cargadas y resueltas de un Agent en ejecución.              |
| `diagnose`        | Realiza un diagnóstico de conectividad en tu sistema.                              |
| `flare`           | [Recopila un flare y lo envía a Datadog][1].                                |
| `health`          | Copia el estado de mantenimiento actual del Agent.                                             |
| `help`            | Ofrece ayuda con cualquier comando.                                                     |
| `hostname`        | Copia el nombre de host que utiliza el Agent.                                       |
| `import`          | Importa y convierte archivos de configuración de versiones anteriores del Agent. |
| `launch-gui`      | Inicia la GUI del Datadog Agent.                                                |
| `restart`         | [Reinicia el Agent][2].                                                     |
| `restart-service` | Reinicia el Agent dentro del administrador de control de servicios.                       |
| `start`           | [Inicia el Agent][3].                                                       |
| `start-service`   | Inicia el Agent dentro del administrador de control de servicios.                         |
| `status`          | [Copia el estado actual del Agent][4].                                        |
| `stream-logs`     | Genera un flujo de los logs procesados por un Agent en ejecución.                         |
| `stop`            | [Detiene el Agent][5].                                                        |
| `stopservice`     | Detiene el Agent en el administrador de control de servicios.                          |
| `version`         | Copia información acerca de la versión.                                                         |

**Nota**: Algunas opciones tienen su propio conjunto de indicadores y opciones detallados en un mensaje de ayuda. Por ejemplo, para ver cómo se usa el subcomando `check`, ejecuta lo siguiente:

```text
<AGENT_BIN_PATH> check --help
```

## Sobrecarga del Agent

A continuación, se muestra un ejemplo del consumo de recursos del Datadog Agent. Las pruebas se llevaron a cabo sobre una instancia de máquina AWS EC2 `c5.xlarge` (4 vCPU/ 8 GB de RAM) con resultados comparables para instancias basadas en ARM64 con recursos similares. El `datadog-agent` estándar se estaba ejecutando con una verificación de proceso para monitorizar el propio Agent. La activación de un mayor número de integraciones puede incrementar la cantidad de recursos que consume el Agent.
La activación de los checks de JMX obliga al Agent a usar más memoria, dependiendo del número de beans mostrados por los JVM monitorizados. La activación de los Agents de rastreo y proceso también incrementa el consumo de recursos.

* Versión de prueba del Agent: 7.34.0
* CPU: ~ 0,08 % de uso de la CPU de media
* Memoria: ~ 130 MB de RAM usados (memoria RSS)
* Ancho de banda de red: ~ 140 B/s ▼ | 800 B/s ▲
* Disco:
  * Linux: de 830 MB a 880 MB, dependiendo de la distribución
  * Windows: 870 MB

**Recopilación de logs**:

Los resultados mostrados a continuación se obtuvieron a partir de una recopilación de *110 KB de logs por segundo* desde un archivo con el [Forwarder de HTTP][6] activado. Muestra la evolución del uso de recursos en los distintos niveles de compresión disponibles.

{{< tabs >}}
{{% tab "Nivel 6 de compresión HTTP" %}}

* Versión de prueba del Agent: 6.15.0
* CPU: ~ 1,5 % de uso de la CPU de media
* Memoria: ~ 95 MB de RAM usados.
* Ancho de banda de red: ~ 14 KB/s ▲

{{% /tab %}}
{{% tab "Nivel 1 de compresión HTTP" %}}

* Versión de prueba del Agent: 6.15.0
* CPU: ~ 1 % de uso de la CPU de media
* Memoria: ~ 95 MB de RAM usados.
* Ancho de banda de red: ~ 20 KB/s ▲

{{% /tab %}}
{{% tab "HTTP sin comprimir" %}}

* Versión de prueba del Agent: 6.15.0
* CPU: ~ 0,7 % de uso de la CPU de media
* Memoria: ~ 90 MB de RAM usados (memoria RSS)
* Ancho de banda de red: ~ 200 KB/s ▲

{{% /tab %}}
{{< /tabs >}}

## Aprender más sobre el Datadog Agent

### Actualizar el Agent

Para actualizar el núcleo del Datadog Agent manualmente entre dos versiones secundarias en un mismo host, ejecuta el [comando de instalación correspondiente a tu plataforma][7].

**Nota**: Si deseas actualizar manualmente una integración específica del Agent, consulta la [guía dedicada a la gestión de integraciones][8].

### Archivos de configuración

Consulta la [documentación acerca de los archivos de configuración del Agent][9].

### Sitio de Datadog

Modifica el [archivo de configuración principal del Agent][10], `datadog.yaml`, para configurar el parámetro `site` (por defecto, `datadoghq.com`).

```yaml
site: {{< region-param key="dd_site" >}}
```

**Nota**: Consulta la [Empezando con los sitios de Datadog][11] para obtener más información sobre el parámetro `site`.

### Localización de los logs

Consulta la [documentación acerca de los archivos de logs del Agent][12].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/troubleshooting/send_a_flare/
[2]: /es/agent/guide/agent-commands/#restart-the-agent
[3]: /es/agent/guide/agent-commands/#start-the-agent
[4]: /es/agent/guide/agent-commands/#service-status
[5]: /es/agent/guide/agent-commands/#stop-the-agent
[6]: /es/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings#agent
[8]: /es/agent/guide/integration-management/
[9]: /es/agent/guide/agent-configuration-files/
[10]: /es/agent/guide/agent-configuration-files/#agent-main-configuration-file
[11]: /es/getting_started/site/
[12]: /es/agent/guide/agent-log-files/
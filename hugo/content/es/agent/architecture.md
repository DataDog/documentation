---
disable_toc: false
further_reading:
- link: /agent/supported_platforms/
  tag: Documentación
  text: Plataformas compatibles
- link: /agent/configuration/
  tag: Documentación
  text: Configuración del Agent
title: Arquitectura del Agent
---

## Arquitectura del Agent

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

Las versiones 6 y 7 del Agent cuentan con un proceso principal que se encarga de recopilar logs y métricas de infraestructura, además de recibir [métricas de DogStatsD][1]. Los componentes principales de este proceso son:

* El Collector, que ejecuta checks y recopila métricas.
* El Forwarder, que envía cargas útiles a Datadog.

Si se habilita en el archivo de configuración `datadog.yaml`, el Agent genera dos procesos opcionales:

* El APM Agent es un proceso que recopila [trazas][2]. Se encuentra habilitado de manera predeterminada.
* El Process Agent es un proceso que recopila información de los procesos en tiempo real. De manera predeterminada, el Process Agent solo recopila los contenedores disponibles, de lo contrario se deshabilita.

En Windows, los servicios se presentan de la siguiente forma:

| Servicio               | Descripción           |
|-----------------------|-----------------------|
| DatadogAgent          | Datadog Agent         |
| datadog-trace-agent   | Datadog Trace Agent   |
| datadog-process-agent | Datadog Process Agent |

Por defecto, el Agent vincula tres [puertos][3] en Linux y cuatro puertos en Windows y macOS:

| Puerto | Descripción                                                                                 |
|------|---------------------------------------------------------------------------------------------|
| 5000 | Muestra métricas de tiempo de ejecución del Agent.                                                    |
| 5001 | La CLI y GUI del Agent lo usan para enviar comandos y recopilar información del Agent en ejecución. |
| 5002 | Provee al servidor de la GUI en Windows y macOS.                                                   |
| 8125 | El servidor de DogStatsD lo usa para recibir métricas externas.                                  |

Para obtener más información sobre cómo configurar los puertos, consulta el [tráfico de red][4].

### Collector

El Collector reúne todas las métricas estándar cada 15 segundos. El Agent 6 incorpora un intérprete de Python 2.7 para ejecutar integraciones y [checks personalizados][5].

### Forwarder

El Agent Forwarder envía métricas a través de HTTPS a Datadog. El almacenamiento en búfer evita que las desconexiones de la red afecten a los informes de métricas. Las métricas se almacenan en la memoria hasta que se alcanza un límite de tamaño o cantidad de solicitudes de envío pendientes. Luego, las métricas más antiguas se descartan para que se pueda gestionar el espacio de memoria del Forwarder. Los logs se envían a Datadog a través de una conexión TCP cifrada con SSL.

### DogStatsD

En el Agent 6, DogStatsD es una implementación Golang del daemon de agregación de métricas [StatsD de Etsy][6]. DogStatsD recibe y transfiere métricas arbitrarias mediante UDP o un socket de UNIX, lo que permite instrumentar código personalizado sin aumentar la latencia. Obtén más información sobre [DogStatsD][7].

[1]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#metrics
[2]: /es/tracing/guide/terminology/
[3]: /es/agent/configuration/network/#open-ports
[4]: /es/agent/configuration/network#configure-ports
[5]: /es/developers/custom_checks/write_agent_check/
[6]: https://github.com/etsy/statsd
[7]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/agent5architecture.jpg" alt="Arquitectura del Agent v5" >}}

El Agent 5 cuenta con cuatro componentes principales, cada uno redactado en Python y ejecutado como un proceso independiente:

* **Collector** (`agent.py`): ejecuta checks en la máquina actual sobre las [integraciones][1] configuradas y captura métricas del sistema, como las de la memoria y la CPU.
* **DogStatsD** (`dogstatsd.py`): servidor backend compatible con StatsD al que puedes enviar [métricas personalizadas][2] desde tus aplicaciones.
* **Forwarder** (`ddagent.py`): recupera datos tanto de DogStatsD como del Collector, los pone en cola para su envío y los envía a Datadog.
* **SupervisorD**: un único proceso supervisor controla al Collector, los servidores de DogStatsD y el Forwarder. El supervisor se mantiene separado para limitar la sobrecarga de cada aplicación si no se están ejecutando todas las partes. Sin embargo, por lo general, se recomienda ejecutar todas las partes.

**Nota**: En el caso de los usuarios de Windows, los cuatro procesos del Agent se presentan como instancias de `ddagent.exe` con la descripción `DevOps' best friend`.

### Supervisión, privilegios y puertos de red

Se ejecuta un proceso primario de SupervisorD con el usuario `dd-agent`, y todos los subprocesos dependientes se ejecutan con el mismo usuario. Esto también se aplica a cualquier llamada del sistema (`iostat`/`netstat`) que inicia el Datadog Agent. La configuración del Agent se almacena en `/etc/dd-agent/datadog.conf` y `/etc/dd-agent/conf.d`. `dd-agent` debe ser capaz de leer toda la configuración. Los permisos recomendados son `0600`, ya que los archivos de configuración contienen tu clave de API y otras credenciales necesarias para acceder a las métricas.

Los siguientes [puertos][3] están abiertos para realizar operaciones:

| Puerto      | Descripción                         |
|-----------|-------------------------------------|
| tcp/17123 | El Forwarder para operaciones normales |
| tcp/17124 | El Forwarder para la compatibilidad con Graphite  |
| udp/8125  | DogStatsD                           |

Por defecto, todos los procesos de escucha están vinculados a `127.0.0.1` o `::1` en las versiones 3.4.1 o posteriores del Agent. En versiones anteriores, estaban vinculados a `0.0.0.0` (todas las interfaces). Para obtener información sobre cómo ejecutar el Agent a través de un proxy, consulta la [configuración del proxy del Agent][4]. Para obtener información sobre los intervalos de IP que se pueden permitir, consulta el [tráfico de red][5].

El número recomendado de descriptores de archivos abiertos es de 1024. Puedes ver este valor con el comando `ulimit -a`. Si existe un límite estricto por debajo del valor recomendado, por ejemplo Shell Fork Bomb Protection, una solución es añadir lo siguiente en `supervisord.conf`:

```conf
[supervisord]
minfds = 100  # Your hard limit
```

[1]: /es/integrations/
[2]: /es/metrics/custom_metrics/
[3]: /es/agent/configuration/network/?tab=agentv5v4#open-ports
[4]: /es/agent/configuration/proxy/?tab=agentv5
[5]: /es/agent/faq/network/
{{% /tab %}}
{{< /tabs >}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}
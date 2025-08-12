---
disable_toc: false
private: true
title: Arquitectura del Agent 5
---

Esta página aborda la arquitectura del Agent 5. Para conocer la arquitectura de la última versión del Agent, consulta [Arquitectura del Agent][1].

{{< img src="agent/agent5architecture.jpg" alt="Arquitectura del Agent v5" >}}

El Agent 5 cuenta con cuatro componentes principales, cada uno redactado en Python y ejecutado como un proceso independiente:

* **Collector** (recopilador) (`agent.py`): el recopilador ejecuta checks en la máquina actual para las [integraciones][2] configuradas y captura las métricas del sistema, como la memoria y la CPU.
* **DogStatsD** (`dogstatsd.py`): este es un servidor de backend compatible con StatsD al que puedes enviar [métricas personalizadas][3] desde tus aplicaciones.
* **Forwarder** (`ddagent.py`): recupera datos tanto de DogStatsD como del Collector, los pone en cola para su envío y los envía a Datadog.
* **SupervisorD**: un único proceso supervisor controla al Collector, los servidores de DogStatsD y el Forwarder. El supervisor se mantiene separado para limitar la sobrecarga de cada aplicación si no se están ejecutando todas las partes. Sin embargo, por lo general, se recomienda ejecutar todas las partes.

**Nota**: En el caso de los usuarios de Windows, los cuatro procesos del Agent se presentan como instancias de `ddagent.exe` con la descripción `DevOps' best friend`.

### Supervisión, privilegios y puertos de red

Se ejecuta un proceso primario de SupervisorD con el usuario `dd-agent`, y todos los subprocesos dependientes se ejecutan con el mismo usuario. Esto también se aplica a cualquier llamada del sistema (`iostat`/`netstat`) que inicia el Datadog Agent. La configuración del Agent se almacena en `/etc/dd-agent/datadog.conf` y `/etc/dd-agent/conf.d`. `dd-agent` debe ser capaz de leer toda la configuración. Los permisos recomendados son `0600`, ya que los archivos de configuración contienen tu clave de API y otras credenciales necesarias para acceder a las métricas.

Los siguientes [puertos][4] están abiertos para operaciones:

| Puerto      | Descripción                         |
|-----------|-------------------------------------|
| tcp/17123 | El Forwarder para operaciones normales |
| tcp/17124 | El Forwarder para la compatibilidad con Graphite  |
| udp/8125  | DogStatsD                           |

Todos los procesos de escucha están vinculados por defecto a `127.0.0.1` o `::1` o ambos, en las versiones 3.4.1 o posteriores del Agent. En versiones anteriores, estaban vinculados a `0.0.0.0` (todas las interfaces). Para obtener información sobre cómo ejecutar el Agent a través de un proxy, consulta [Configuración del proxy del Agent][5]. Para información sobre rangos de IP a permitir, consulta [Tráfico de red][6].

El número recomendado de descriptores de archivos abiertos es de 1024. Puedes ver este valor con el comando `ulimit -a`. Si existe un límite estricto por debajo del valor recomendado (por ejemplo, Shell Fork Bomb Protection), una solución es añadir lo siguiente en `supervisord.conf`:

```conf
[supervisord]
minfds = 100  # Your hard limit
```

[1]: /es/agent/architecture
[2]: /es/integrations/
[3]: /es/metrics/custom_metrics/
[4]: /es/agent/configuration/network/?tab=agentv5v4#open-ports
[5]: /es/agent/configuration/proxy/?tab=agentv5
[6]: /es/agent/faq/network/
---
aliases:
- /es/tracing/docker/
- /es/tracing/setup/docker/
- /es/agent/apm/docker
- /es/agent/docker/apm
description: Configura la recopilación de traces (trazas) de APM para las aplicaciones
  que se ejecutan en los contenedores de Docker mediante el Datadog Agent
further_reading:
- link: https://github.com/DataDog/datadog-agent/tree/main/pkg/trace
  tag: Código fuente
  text: Código de origen
- link: /integrations/amazon_ecs/#trace-collection
  tag: Documentación
  text: Rastrear tus aplicaciones de ECS
- link: /agent/docker/log/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/docker/integrations/
  tag: Documentación
  text: Recopila las métricas de tus aplicaciones y logs automáticamente
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/docker/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
title: Rastrear aplicaciones Docker
---

A partir de Agent 6.0.0, el Trace Agent se activa por defecto. Si ha sido desactivado, se puede reactivar en el contenedor `gcr.io/datadoghq/agent` al pasar `DD_APM_ENABLED=true` como una variable de entorno.

Los comandos de CLI en esta página son para el tiempo de ejecución de Docker. Sustituye `docker` por `nerdctl` para el tiempo de ejecución del containerd, o `podman` para el tiempo de ejecución del Podman.

<div class="alert alert-info">Si estás recopilando trazas de una aplicación contenedorizada (tu Agent y tu app se están ejecutando en contenedores separados), una alternativa a las siguientes instrucciones es inyectar la biblioteca de trazas automáticamente en tu aplicación. Consulta <a href="/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers">Inyectar bibliotecas</a> para ver las instrucciones.</div>

## Rastrear desde el host

La opción de rastrear está disponible en el puerto `8126/tcp` desde _tu host únicamente_ al añadir la opción de comando `-p 127.0.0.1:8126:8126/tcp` to the `docker run`.

Para hacerlo disponible desde _cualquier host_, usa `-p 8126:8126/tcp` en su lugar.

Por ejemplo, el comando siguiente permite al Agent recibir trazas de tu host únicamente:

{{< tabs >}}
{{% tab "Linux" %}}

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              gcr.io/datadoghq/agent:latest
```
Donde tu `<DATADOG_SITE>` es {{< region-param key="dd_site" code="true" >}} (por defecto, `datadoghq.com`).

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              gcr.io/datadoghq/agent:latest
```
Donde tu `<DATADOG_SITE>` es {{< region-param key="dd_site" code="true" >}} (por defecto, `datadoghq.com`).

{{% /tab %}}
{{< /tabs >}}

## Variables de entorno del Docker APM Agent

Utiliza las siguientes variables de entorno para configurar la traza del Docker Agent. Consulta el [archivo de ejemplo `config_template.yaml`][8] para obtener más detalles.

`DD_API_KEY`                      
: obligatorio - _cadena_
<br/>tu [clave API de Datadog][1].

`DD_SITE`
: opcional; _cadena_
<br/>Tu [sitio de Datadog][7]. Establécelo en `{{< region-param key="dd_site" >}}`.
<br/>**Predeterminado**: `datadoghq.com`

`DD_APM_ENABLED`                  
: opcional; _booleano_ - **por defecto**: `true`
<br/>Cuando se establece en `true` (por defecto), el Datadog Agent acepta trazas y métricas de traza.

`DD_APM_RECEIVER_PORT`            
: opcional - _entero_ - **por defecto**: `8126` 
<br/>Establece el puerto en el que escucha el receptor de la traza del Datadog Agent. Establece `0` para desactivar el receptor HTTP.

`DD_APM_RECEIVER_SOCKET`          
: opcional: _cadena_
<br/>Para recopilar tus trazas a través de UNIX Domain Sockets, proporciona la ruta al socket UNIX. Si se establece, tiene prioridad sobre el nombre de host y la configuración del puerto, y debe apuntar a un archivo de socket válido. 

`DD_APM_NON_LOCAL_TRAFFIC`        
: opcional - _Booleano_ - **por defecto**: `false`
<br/>Cuando se establece en `true`, el Datadog Agent escucha el tráfico no local. Si estás [rastreando desde otros contenedores](#tracing-from-other-containers), establece esta variable de entorno en `true`. 

`DD_APM_DD_URL`                   
: opcional - _cadena_
<br/>Para utilizar un proxy para APM, proporciona el endpoint y el puerto como `<ENDPOINT>:<PORT>`. El proxy debe poder manejar conexiones TCP.

`DD_APM_CONNECTION_LIMIT`         
: obligatorio - _entero_ - **por defecto**: `2000`
<br/>Establece el máximo de conexiones APM para una ventana temporal de 30 segundos. Consulta [Límites de frecuencia del Agent][6] para obtener más detalles.

`DD_APM_IGNORE_RESOURCES`         
: opcional - _[cadena]_ 
<br/>Proporciona una lista de exclusión de recursos para que Datadog Agent los ignore. Si el nombre de recurso de una traza coincide con una o más de las expresiones regulares de esta lista, la traza no se envía a Datadog. 
<br/>Ejemplo: `"GET /ignore-me","(GET\|POST) and-also-me"`. 

`DD_APM_FILTER_TAGS_REQUIRE`      
: opcional - _objeto_
<br/>Define reglas para el filtrado de trazas basadas en etiqueta. Para enviarlas a Datadog, las trazas deben tener estas etiquetas (tags). Consulta [Ignorar recursos no deseados en APM][5]. 

`DD_APM_FILTER_TAGS_REGEX_REQUIRE` 
: opcional - _objeto_
<br/>Compatible con Agent 7.49+. Define reglas para el filtrado de trazas basadas en etiquetas con expresiones regulares. Para enviarlas a Datadog, las trazas deben tener etiquetas que coincidan con estos patrones regex. 

`DD_APM_FILTER_TAGS_REJECT`       
: opcional - _objeto_ 
<br/>Define reglas para el filtrado de trazas basadas en etiquetas. Si una traza tiene estas etiquetas, no se envía a Datadog. Consulta [Ignorar recursos no deseados en APM][5] para obtener más detalles. 

`DD_APM_FILTER_TAGS_REGEX_REJECT` 
: opcional - _objeto_ 
<br/>Compatible con Agent 7.49+. Define reglas para el filtrado de trazas basadas en etiquetas con expresiones regulares. Si una traza tiene etiquetas que coinciden con estos patrones regex, la traza no se envía a Datadog. 

`DD_APM_REPLACE_TAGS`             
: opcional - _[objeto]_ 
<br/>Define un conjunto de reglas para [reemplazar o eliminar etiquetas que contienen información potencialmente sensible][2].

`DD_HOSTNAME`                     
: opcional - _cadena_ - **por defecto**: detectado automáticamente 
<br/>Establece el nombre de host que se utilizará para métricas si falla la detección automática del nombre de host, o cuando se ejecuta el Datadog Cluster Agent.

`DD_DOGSTATSD_PORT`               
: opcional - _entero_ - **por defecto**: `8125` 
<br/>Establece el puerto DogStatsD.

`DD_PROXY_HTTPS`                  
: opcional - _cadena_
<br/>Para utilizar un [proxy][4] para conectarse a Internet, indica la URL. 

`DD_BIND_HOST`                    
: opcional - _cadena_ - **por defecto**: `localhost` 
<br/>Establece el host para escuchar en DogStatsD y trazas.

`DD_LOG_LEVEL`                    
: opcional - _cadena_ - **por defecto**: `info` 
<br/>Establece el nivel mínimo de registro. Opciones válidas: `trace`, `debug`, `info`, `warn`, `error`, `critical` y `off`.

## Rastreando desde otros contenedores

Al igual que con DogStatsD, se pueden enviar trazas al Agent desde otros contenedores usando [redes de Docker](#docker-network) o [IP de Docker host](#docker-host-ip).

### Red de Docker

El primer paso es crear una red puente definida por el usuario:

```bash
docker network create <NETWORK_NAME>
```

Los comandos de CLI en esta página son para el tiempo de ejecución de Docker. Sustituye `docker` por `nerdctl` para el tiempo de ejecución del containerd, o `podman` para el tiempo de ejecución del Podman.

Luego, inicia el Agent y el contenedor de la aplicación, conectados a la red que se ha creado previamente:

{{< tabs >}}
{{% tab "Estándar" %}}a

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --network <NETWORK_NAME> \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```

Donde tu `<DATADOG_SITE>` es {{< region-param key="dd_site" code="true" >}} (por defecto, `datadoghq.com`).

{{% /tab %}}
{{% tab "Windows" %}}

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --cgroupns host \
              --pid host \
              --network "<NETWORK_NAME>" \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network "<NETWORK_NAME>" \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```
Donde tu `<DATADOG_SITE>` es {{< region-param key="dd_site" code="true" >}} (por defecto, `datadoghq.com`).

{{% /tab %}}
{{< /tabs >}}

Esto expone el nombre del host `datadog-agent` en tu contenedor `app`.
Si estás usando `docker-compose`, los parámetros `<NETWORK_NAME>` son los que están definidos en la sección `networks` de tu `docker-compose.yml`.

Las trazas de tu aplicación deben estas configuradas para que puedan enviar trazas a esta dirección. Configura las variables de entorno con el `DD_AGENT_HOST` como el nombre del contenedor del Agent y `DD_TRACE_AGENT_PORT` como el puerto del Agent Trace en tus contenedores de aplicación. Los ejemplos anteriores usan el host `datadog-agent` y el puerto `8126` (el valor por defecto para que no tengas que configurarlo).

Opcionalmente, consulta los ejemplos a continuación para configurar el host del Agent manualmente en cada lenguaje compatible.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodeJS,.NET" >}}

{{< programming-lang lang="java" >}}

Se puede actualizar la configuración del Java Agent con variables de entorno:

```bash
DD_AGENT_HOST=datadog-agent \
DD_TRACE_AGENT_PORT=8126 \
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```

o mediante propiedades de sistema:

```bash
java -javaagent:/path/to/the/dd-java-agent.jar \
     -Ddd.agent.host=datadog-agent \
     -Ddd.agent.port=8126 \
     -jar /your/app.jar
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

```python
from ddtrace import tracer

tracer.configure(
    hostname='datadog-agent',
    port=8126,
)
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
Datadog.configure do |c|
  c.agent.host = 'datadog-agent'
  c.agent.port = 8126
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

{{% tracing-go-v2 %}}

```go
package main

import (
  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
    tracer.Start(tracer.WithAgentAddr("datadog-agent:8126"))
    defer tracer.Stop()
}
```

{{< /programming-lang >}}

{{< programming-lang lenguaje="nodeJS" >}}

```javascript
const tracer = require('dd-trace').init({
    hostname: 'datadog-agent',
    port: 8126
});
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Establece las variables de entorno antes de ejecutar tu app instrumentado:

```bash
# Environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=<SYSTEM_DEPENDENT_PATH>
export DD_DOTNET_TRACER_HOME=/opt/datadog

# For containers
export DD_AGENT_HOST=datadog-agent
export DD_TRACE_AGENT_PORT=8126

# Start your application
dotnet example.dll
```

El valor de la variable de entorno `CORECLR_PROFILER_PATH` varia, dependiendo del sistema en el se esté ejecutando la aplicación:

   Sistema Operativo y Arquitectura de Proceso | Valor de CORECLR_PROFILER_PATH
   ------------------------------------------|----------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux x64        | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux ARM64      | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   Windows x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

En la tabla de arriba, `<APP_DIRECTORY>` se refiere al directorio que contiene los archivos `.dll` de la aplicación.

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### IP del Docker host

El puerto del contenedor del Agent `8126` debería estar vinculado al host directamente.
Configura el rastreador de tu aplicación a la ruta por defecto de este contenedor (usa el comando `ip route` para obtenerlo).

A continuación hay un ejemplo para el Python Tracer, suponiendo que `172.17.0.1` es la ruta por defecto:

```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```

### Unix Domain Socket (UDS)
Para enviar trazas mediante un socket, éste debe estar montado en el contenedor del Agent y su contenedor de aplicación.

```bash
# Datadog Agent
docker run -d --name datadog-agent \
              --network <NETWORK_NAME> \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -v /var/run/datadog/:/var/run/datadog/ \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
              gcr.io/datadoghq/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -v /var/run/datadog/:/var/run/datadog/ \
              -e DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket \
              company/app:latest
```

Consulta la [documentación específica en tu idioma de la Instrumentación de APM][3] para conocer la configuración del trazador.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/tracing/configure_data_security/#replace-tags
[3]: /es/tracing/setup/
[4]: /es/agent/proxy
[5]: /es/tracing/guide/ignoring_apm_resources/
[6]: /es/tracing/troubleshooting/agent_rate_limits
[7]: /es/getting_started/site/
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
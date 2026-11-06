---
aliases:
- /es/tracing/docker/
- /es/tracing/setup/docker/
- /es/agent/apm/docker
- /es/agent/docker/apm
description: Configure la recopilación de trazas de APM para aplicaciones que se ejecutan
  en contenedores Docker mediante el Datadog Agent
further_reading:
- link: https://github.com/DataDog/datadog-agent/tree/main/pkg/trace
  tag: Código fuente
  text: Código fuente
- link: /integrations/amazon_ecs/#trace-collection
  tag: Documentación
  text: Rastree sus aplicaciones de ECS.
- link: /agent/docker/log/
  tag: Documentación
  text: Recopile los registros de su aplicación
- link: /agent/docker/integrations/
  tag: Documentación
  text: Recopile automáticamente las métricas y los registros de sus aplicaciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limitar la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/docker/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
title: Rastreo de aplicaciones Docker.
---
A partir del Agent 6.0.0, el Trace Agent está habilitado de forma predeterminada. Si se ha desactivado, puede volver a habilitarlo en el contenedor `registry.datadoghq.com/agent` pasando `DD_APM_ENABLED=true` como variable de entorno.

Los comandos de la CLI en esta página son para el tiempo de ejecución de Docker. Reemplace `docker` con `nerdctl` para el tiempo de ejecución de containerd, o `podman` para el tiempo de ejecución de Podman.

<div class="alert alert-info">Si está recopilando trazas de una aplicación en contenedores (su Agent y su aplicación se ejecutan en contenedores separados), como alternativa a las siguientes instrucciones, puede inyectar automáticamente el SDK en su aplicación. Lea <a href="/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers">Inyección de bibliotecas</a> para obtener instrucciones.</div>

## Rastreo desde el servidor {#tracing-from-the-host}

El rastreo está disponible en el puerto `8126/tcp` desde _solo su servidor_ al agregar la opción `-p 127.0.0.1:8126:8126/tcp` al comando `docker run`.

Para que esté disponible desde _cualquier servidor_, utilice `-p 8126:8126/tcp` en su lugar.

Por ejemplo, el siguiente comando permite que el Agent reciba trazas solo desde su servidor:

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
              registry.datadoghq.com/agent:latest
```
Donde su `<DATADOG_SITE>` es {{< region-param key="dd_site" code="true" >}} (se establece de forma predeterminada en `datadoghq.com`).

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              registry.datadoghq.com/agent:latest
```
Donde su `<DATADOG_SITE>` es {{< region-param key="dd_site" code="true" >}} (se establece de forma predeterminada en `datadoghq.com`).

{{% /tab %}}
{{< /tabs >}}

## Variables de entorno del Docker APM Agent {#docker-apm-agent-environment-variables}

Utilice las siguientes variables de entorno para configurar el rastreo para el Docker Agent.

Para ver todas las opciones disponibles y sus valores predeterminados, consulte la sección `apm_config` del [archivo de configuración de ejemplo del Agent][8].

`DD_API_KEY`                      
: obligatorio - _cadena_
<br/>Su [clave de Datadog API][1].

`DD_SITE`
: opcional - _cadena_
<br/>Su [sitio de Datadog][7]. Establezca esto en `{{< region-param key="dd_site" >}}`.
<br/>**Default**: `datadoghq.com`

`DD_APM_ENABLED`                   
: opcional - _booleano_ - **predeterminado**: `true`
<br/>Cuando se establece en `true` (predeterminado), el Datadog Agent acepta trazas y métricas de traza.

`DD_APM_RECEIVER_PORT`             
: opcional - _entero_ - **predeterminado**: `8126` 
<br/>Establece el puerto en el que escucha el receptor de trazas del Datadog Agent. Establezca en `0` para deshabilitar el receptor HTTP.

`DD_APM_RECEIVER_SOCKET`           
: opcional - _cadena_
<br/>Para recopilar sus trazas a través de sockets de dominio UNIX, proporcione la ruta al socket UNIX. Si se establece, esto tiene prioridad sobre la configuración de nombre de host y puerto, y debe apuntar a un archivo de socket válido. 

`DD_APM_NON_LOCAL_TRAFFIC`         
: opcional - _booleano_ - **predeterminado**: `false`
<br/>Cuando se establece en `true`, el Datadog Agent escucha tráfico no local. Si está [realizando el rastreo desde otros contenedores](#tracing-from-other-containers), establezca esta variable de entorno en `true`. 

`DD_APM_DD_URL`                    
: opcional - _cadena_
<br/>Para usar un proxy para APM, proporcione el punto de conexión y el puerto como `<ENDPOINT>:<PORT>`. El proxy debe ser capaz de manejar conexiones TCP.

`DD_APM_CONNECTION_LIMIT`          
: obligatorio - _entero_ - **predeterminado**: `2000`
<br/>Establece el máximo de conexiones APM para una ventana de tiempo de 30 segundos. Consulte [Agent Rate Limits][6] para obtener más detalles.

`DD_APM_IGNORE_RESOURCES`          
: opcional - _[cadena]_ 
<br/>Proporciona una lista de exclusión de recursos para que el Datadog Agent los ignore. Si el nombre del recurso de una traza coincide con una o más de las expresiones regulares de esta lista, la traza no se envía a Datadog. 
<br/>Ejemplo: `"GET /ignore-me","(GET\|POST) and-also-me"`.                                                                                                                                                                                                                                                                                   

`DD_APM_FILTER_TAGS_REQUIRE`       
: opcional - _objeto_
<br/>Define reglas para el filtrado de trazas basado en etiquetas. Para ser enviadas a Datadog, las trazas deben tener estas etiquetas. Consulte [Ignoring Unwanted Resources in APM][5]. 

`DD_APM_FILTER_TAGS_REGEX_REQUIRE` 
: opcional - _objeto_
<br/>Compatible con el Agent 7.49+. Define reglas para el filtrado de trazas basado en etiquetas con expresiones regulares. Para ser enviadas a Datadog, las trazas deben tener etiquetas que coincidan con estos patrones de expresiones regulares. 

`DD_APM_FILTER_TAGS_REJECT`        
: opcional - _objeto_ 
<br/>Define reglas para el filtrado de trazas basado en etiquetas. Si una traza tiene estas etiquetas, no se envía a Datadog. Consulte [Ignoring Unwanted Resources in APM][5] para obtener más detalles. 

`DD_APM_FILTER_TAGS_REGEX_REJECT`  
: opcional - _objeto_ 
<br/>Compatible con el Agent 7.49+. Define reglas para el filtrado de trazas basado en etiquetas con expresiones regulares. Si una traza tiene etiquetas que coinciden con estos patrones de expresiones regulares, la traza no se envía a Datadog. 

`DD_APM_REPLACE_TAGS`              
: opcional - _[objeto]_ 
<br/>Define un conjunto de reglas para [reemplazar o eliminar etiquetas que contienen información potencialmente confidencial][2].

`DD_HOSTNAME`                      
: opcional - _cadena_ - **predeterminado**: detectado automáticamente 
<br/>Establece el nombre de host que se utilizará para las métricas si la detección automática del nombre de host falla, o al ejecutar el Datadog Cluster Agent.

`DD_DOGSTATSD_PORT`                
: opcional - _entero_ - **predeterminado**: `8125` 
<br/>Establece el puerto de DogStatsD.

`DD_PROXY_HTTPS`                   
: opcional - _cadena_
<br/>Para usar un [proxy][4] para conectarse a Internet, proporcione la URL. 

`DD_BIND_HOST`                     
: opcional - _cadena_ - **predeterminado**: `localhost` 
<br/>Establece el servidor en el que escuchar para DogStatsD y las trazas.

`DD_LOG_LEVEL`                     
: opcional - _cadena_ - **predeterminado**: `info` 
<br/>Establece el nivel mínimo de registro. Opciones válidas: `trace`, `debug`, `info`, `warn`, `error`, `critical` y `off`.

## Rastreo desde otros contenedores {#tracing-from-other-containers}

Al igual que con DogStatsD, las trazas se pueden enviar al Agent desde otros contenedores utilizando [redes de Docker](#docker-network) o con la [IP del servidor de Docker](#docker-host-ip).

### Red de Docker {#docker-network}

Como primer paso, cree una red bridge definida por el usuario:

```bash
docker network create <NETWORK_NAME>
```

Los comandos de la CLI en esta página son para el tiempo de ejecución de Docker. Reemplace `docker` con `nerdctl` para el tiempo de ejecución de containerd, o `podman` para el tiempo de ejecución de Podman.

Luego, inicie el Agent y el contenedor de la aplicación, conectados a la red creada anteriormente:

{{< tabs >}}
{{% tab "Standard" %}}

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
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```

Donde su `<DATADOG_SITE>` es {{< region-param key="dd_site" code="true" >}} (se establece de forma predeterminada en `datadoghq.com`).

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
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network "<NETWORK_NAME>" \
              -e DD_AGENT_HOST=datadog-agent \
              company/app:latest
```
Donde su `<DATADOG_SITE>` es {{< region-param key="dd_site" code="true" >}} (se establece de forma predeterminada en `datadoghq.com`).

{{% /tab %}}
{{< /tabs >}}

Esto expone el nombre de servidor `datadog-agent` en su contenedor `app`.
Si está utilizando `docker-compose`, los parámetros `<NETWORK_NAME>` son los definidos en la sección `networks` de su `docker-compose.yml`.

Los SDK de su aplicación deben estar configurados para enviar trazas a esta dirección. Establezca las variables de entorno con `DD_AGENT_HOST` como el nombre del contenedor del Agent y `DD_TRACE_AGENT_PORT` como el puerto de trazas del Agent en los contenedores de su aplicación. El ejemplo anterior utiliza el servidor `datadog-agent` y el puerto `8126` (el valor predeterminado, por lo que no tiene que configurarlo).

Alternativamente, consulte los ejemplos a continuación para configurar el servidor de Agent manualmente en cada lenguaje compatible:

{{< programming-lang-wrapper langs="java,python,ruby,go,nodeJS,.NET" >}}

{{< programming-lang lang="java" >}}

Actualice la configuración del Agent de Java con variables de entorno:

```bash
DD_AGENT_HOST=datadog-agent \
DD_TRACE_AGENT_PORT=8126 \
java -javaagent:/path/to/the/dd-java-agent.jar -jar /your/app.jar
```

o a través de propiedades del sistema:

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

{{< programming-lang lang="nodeJS" >}}

```javascript
const tracer = require('dd-trace').init({
    hostname: 'datadog-agent',
    port: 8126
});
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Establezca las variables de entorno antes de ejecutar su aplicación instrumentada:

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

El valor para la variable de entorno `CORECLR_PROFILER_PATH` varía según el sistema donde se esté ejecutando la aplicación:

   Arquitectura del sistema operativo y del proceso | Valor de CORECLR_PROFILER_PATH
   ------------------------------------------|----------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux x64        | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux ARM64      | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   Windows x64      | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86      | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

En la tabla anterior, `<APP_DIRECTORY>` se refiere al directorio que contiene los archivos `.dll` de la aplicación.

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### IP del servidor de Docker {#docker-host-ip}

El puerto del contenedor de Agent `8126` debe estar vinculado directamente al servidor.
Configure su rastreador de aplicaciones para informar a la ruta predeterminada de este contenedor (determine esto usando el comando `ip route`).

El siguiente es un ejemplo para el rastreador de Python, suponiendo que `172.17.0.1` es la ruta predeterminada:

```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```

### Socket de dominio UNIX (UDS) {#unix-domain-socket-uds}
Para enviar trazas a través de un socket, el socket debe montarse en el contenedor del Agent y en el contenedor de su aplicación.

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
              registry.datadoghq.com/agent:latest
# Application
docker run -d --name app \
              --network <NETWORK_NAME> \
              -v /var/run/datadog/:/var/run/datadog/ \
              -e DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket \
              company/app:latest
```

Consulte la [documentación de instrumentación de APM específica del lenguaje][3] para conocer la configuración del rastreador.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/tracing/configure_data_security/#replace-tags
[3]: /es/tracing/setup/
[4]: /es/agent/proxy
[5]: /es/tracing/guide/ignoring_apm_resources/
[6]: /es/tracing/troubleshooting/agent_rate_limits
[7]: /es/getting_started/site/
[8]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
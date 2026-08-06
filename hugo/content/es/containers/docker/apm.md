---
aliases:
- /es/tracing/docker/
- /es/tracing/setup/docker/
- /es/agent/apm/docker
- /es/agent/docker/apm
description: Configura la recolección de trazas de APM para aplicaciones que se ejecutan
  en contenedores Docker utilizando el Agente de Datadog
further_reading:
- link: https://github.com/DataDog/datadog-agent/tree/main/pkg/trace
  tag: Código fuente
  text: Código fuente
- link: /integrations/amazon_ecs/#trace-collection
  tag: Documentación
  text: Traza tus aplicaciones de ECS
- link: /agent/docker/log/
  tag: Documentación
  text: Recoge los registros de tu aplicación
- link: /agent/docker/integrations/
  tag: Documentación
  text: Recoge automáticamente las métricas y registros de tus aplicaciones
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recolección de datos a un subconjunto de contenedores solamente
- link: /agent/docker/tag/
  tag: Documentación
  text: Asigna etiquetas a todos los datos emitidos por un contenedor
title: Trazando aplicaciones Docker
---
A partir de la versión 6.0.0 del Agente, el Agente de Trazas está habilitado por defecto. Si se ha desactivado, puedes volver a habilitarlo en el contenedor `registry.datadoghq.com/agent` pasando `DD_APM_ENABLED=true` como una variable de entorno.

Los comandos de CLI en esta página son para el tiempo de ejecución de Docker. Reemplaza `docker` con `nerdctl` para el tiempo de ejecución de containerd, o `podman` para el tiempo de ejecución de Podman.

<div class="alert alert-info">Si estás recolectando trazas de una aplicación en contenedores (tu Agente y aplicación ejecutándose en contenedores separados), como alternativa a las siguientes instrucciones, puedes inyectar automáticamente el SDK en tu aplicación. Lee <a href="/tracing/trace_collection/library_injection_local/?tab=agentandappinseparatecontainers">Inyectando bibliotecas</a> para instrucciones.</div>

## Trazando desde el host {#tracing-from-the-host}

La trazabilidad está disponible en el puerto `8126/tcp` desde _tu host solamente_ añadiendo la opción `-p 127.0.0.1:8126:8126/tcp` al comando `docker run`.

Para hacerlo disponible desde _cualquier host_, usa `-p 8126:8126/tcp` en su lugar.

Por ejemplo, el siguiente comando permite que el Agente reciba trazas solo de tu host:

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
Donde se encuentra tu `<DATADOG_SITE>` {{< region-param key="dd_site" code="true" >}} (por defecto es `datadoghq.com`).

{{% /tab %}}
{{% tab "Windows" %}}

```shell
docker run -d -p 127.0.0.1:8126:8126/tcp \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_SITE=<DATADOG_SITE> \
              registry.datadoghq.com/agent:latest
```
Donde se encuentra tu `<DATADOG_SITE>` {{< region-param key="dd_site" code="true" >}} (por defecto es `datadoghq.com`).

{{% /tab %}}
{{< /tabs >}}

## Variables de entorno del agente APM de Docker {#docker-apm-agent-environment-variables}

Utiliza las siguientes variables de entorno para configurar el trazado para el Datadog Agent en Docker. Consulta el [archivo de muestra `config_template.yaml`][8] para más detalles.

`DD_API_KEY`                      
: requerido - _cadena_
<br/>Tu [clave API de Datadog][1].

`DD_SITE`
: opcional - _cadena_
<br/>Tu [sitio de Datadog][7]. Establece esto en `{{< region-param key="dd_site" >}}`.
<br/>**Default**: `datadoghq.com`

`DD_APM_ENABLED`                   
: opcional - _Booleano_ - **por defecto**: `true`
<br/>Cuando se establece en `true` (por defecto), el Datadog Agent acepta trazas y métricas de traza.

`DD_APM_RECEIVER_PORT`             
: opcional - _entero_ - **predeterminado**: `8126` 
<br/>Establece el puerto en el que escucha el receptor de trazas del Agente de Datadog. Establezca en `0` para deshabilitar el receptor HTTP.

`DD_APM_RECEIVER_SOCKET`           
: opcional - _cadena_
<br/>Para recopilar sus trazas a través de Sockets de Dominio UNIX, proporcione la ruta al socket UNIX. Si se establece, esto tiene prioridad sobre la configuración de nombre de host y puerto, y debe apuntar a un archivo de socket válido. 

`DD_APM_NON_LOCAL_TRAFFIC`         
: opcional - _Booleano_ - **predeterminado**: `false`
<br/>Cuando se establece en `true`, el Agente de Datadog escucha tráfico no local. Si está [trazando desde otros contenedores](#tracing-from-other-containers), establezca esta variable de entorno en `true`. 

`DD_APM_DD_URL`                    
: opcional - _cadena_
<br/>Para usar un proxy para APM, proporcione el punto final y el puerto como `<ENDPOINT>:<PORT>`. El proxy debe ser capaz de manejar conexiones TCP.

`DD_APM_CONNECTION_LIMIT`          
: requerido - _entero_ - **predeterminado**: `2000`
<br/>Establece el número máximo de conexiones APM para un intervalo de 30 segundos. Consulte [Límites de Tasa del Agente][6] para más detalles.

`DD_APM_IGNORE_RESOURCES`          
: opcional - _[cadena]_ 
<br/>Proporciona una lista de exclusión de recursos que el Agente de Datadog debe ignorar. Si el nombre del recurso de una traza coincide con una o más de las expresiones regulares en esta lista, la traza no se envía a Datadog. 
<br/>Ejemplo: `"GET /ignore-me","(GET\|POST) and-also-me"`.                                                                                                                                                                                                                                                                                   

`DD_APM_FILTER_TAGS_REQUIRE`       
: opcional - _objeto_
<br/>Define reglas para el filtrado de trazas basado en etiquetas. Para ser enviados a Datadog, las trazas deben tener estas etiquetas. Ver [Ignorando Recursos No Deseados en APM][5]. 

`DD_APM_FILTER_TAGS_REGEX_REQUIRE` 
: opcional - _objeto_
<br/>Compatible en Agente 7.49+. Define reglas para el filtrado de trazas basado en etiquetas con expresiones regulares. Para ser enviados a Datadog, las trazas deben tener etiquetas que coincidan con estos patrones regex. 

`DD_APM_FILTER_TAGS_REJECT`        
: opcional - _objeto_ 
<br/>Define reglas para el filtrado de trazas basado en etiquetas. Si una traza tiene estas etiquetas, no se envía a Datadog. Ver [Ignorando Recursos No Deseados en APM][5] para más detalles. 

`DD_APM_FILTER_TAGS_REGEX_REJECT`  
: opcional - _objeto_ 
<br/>Compatible con Agent 7.49+. Define reglas para el filtrado de trazas basado en etiquetas con expresiones regulares. Si una traza tiene etiquetas que coinciden con estos patrones de expresión regular, la traza no se envía a Datadog. 

`DD_APM_REPLACE_TAGS`              
: opcional - _[objeto]_ 
<br/>Define un conjunto de reglas para [reemplazar o eliminar etiquetas que contienen información potencialmente sensible][2].

`DD_HOSTNAME`                      
: opcional - _cadena_ - **predeterminado**: detectado automáticamente 
<br/>Establece el servidor a utilizar para métricas si la detección automática de servidor falla, o al ejecutar el Agent de clúster de Datadog.

`DD_DOGSTATSD_PORT`                
: opcional - _entero_ - **predeterminado**: `8125` 
<br/>Establece el puerto de DogStatsD.

`DD_PROXY_HTTPS`                   
: opcional - _cadena_
<br/>Para usar un [proxy][4] para conectarse a Internet, proporcione la URL. 

`DD_BIND_HOST`                     
: opcional - _cadena_ - **predeterminado**: `localhost` 
<br/>Establece el servidor para escuchar en DogStatsD y trazas.

`DD_LOG_LEVEL`                     
: opcional - _cadena_ - **predeterminado**: `info` 
<br/>Establece el nivel mínimo de registro. Opciones válidas: `trace`, `debug`, `info`, `warn`, `error`, `critical` y `off`.

## Trazas desde otros contenedores {#tracing-from-other-containers}

Al igual que con DogStatsD, las trazas pueden ser enviadas al Agent desde otros contenedores utilizando [redes de Docker](#docker-network) o con la [IP del servidor de Docker](#docker-host-ip).

### Red de Docker {#docker-network}

Como primer paso, crea una red de puente definida por el usuario:

```bash
docker network create <NETWORK_NAME>
```

Los comandos de CLI en esta página son para el tiempo de ejecución de Docker. Reemplaza `docker` con `nerdctl` para el tiempo de ejecución de containerd, o `podman` para el tiempo de ejecución de Podman.

Luego inicia el Agente y el contenedor de la aplicación, conectados a la red previamente creada:

{{< tabs >}}
{{% tab "Estándar" %}}

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

Donde se encuentra tu `<DATADOG_SITE>` {{< region-param key="dd_site" code="true" >}} (por defecto es `datadoghq.com`).

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
Donde se encuentra tu `<DATADOG_SITE>` {{< region-param key="dd_site" code="true" >}} (por defecto es `datadoghq.com`).

{{% /tab %}}
{{< /tabs >}}

Esto expone el servidor `datadog-agent` en tu contenedor `app`.
Si estás usando `docker-compose`, los parámetros `<NETWORK_NAME>` son los definidos en la sección `networks` de tu `docker-compose.yml`.

Tus SDKs de aplicación deben estar configurados para enviar trazas a esta dirección. Establece variables de entorno con `DD_AGENT_HOST` como el nombre del contenedor del Agent, y `DD_TRACE_AGENT_PORT` como el puerto de trazas del Agent en tus contenedores de aplicación. El ejemplo anterior utiliza el host `datadog-agent` y el puerto `8126` (el valor predeterminado, por lo que no tienes que configurarlo).

Alternativamente, consulta los ejemplos a continuación para establecer manualmente el host del Agente en cada lenguaje soportado:

{{< programming-lang-wrapper langs="java,python,ruby,go,nodeJS,.NET" >}}

{{< programming-lang lang="java" >}}

Actualice la configuración del Java Agent mediante variables de entorno:

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

El valor de la variable de entorno `CORECLR_PROFILER_PATH` varía según el sistema donde se está ejecutando la aplicación:

   Sistema Operativo y Arquitectura de Proceso | Valor de CORECLR_PROFILER_PATH
   ------------------------------------------|----------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux x64 | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so`
   Linux ARM64 | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`
   Windows x64 | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll`
   Windows x86 | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll`

En la tabla anterior, `<APP_DIRECTORY>` se refiere al directorio que contiene los archivos `.dll` de la aplicación.

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### IP del host de Docker {#docker-host-ip}

El puerto del contenedor del Agent `8126` debe estar vinculado directamente al host.
Configure su application tracer para informar a la ruta predeterminada de este contenedor (determine esto usando el comando `ip route`).

Lo siguiente es un ejemplo para el Python Tracer, asumiendo que `172.17.0.1` es la ruta predeterminada:

```python
from ddtrace import tracer

tracer.configure(hostname='172.17.0.1', port=8126)
```

### Socket de dominio Unix (UDS) {#unix-domain-socket-uds}
Para enviar trazas a través de socket, el socket debe estar montado en el contenedor del Agent y en el contenedor de su aplicación.

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

Consulte la [documentación de instrumentación APM específica del lenguaje][3] para la configuración del tracer.

## Lectura Adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/tracing/configure_data_security/#replace-tags
[3]: /es/tracing/setup/
[4]: /es/agent/proxy
[5]: /es/tracing/guide/ignoring_apm_resources/
[6]: /es/tracing/troubleshooting/agent_rate_limits
[7]: /es/getting_started/site/
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
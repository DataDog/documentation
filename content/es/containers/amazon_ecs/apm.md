---
aliases:
- /es/agent/amazon_ecs/apm
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/amazon_ecs/tags/
  tag: Documentación
  text: Asignar etiquetas (tags) a todos los datos emitidos por un contenedor
kind: Documentación
title: Rastrear aplicaciones de ECS
---

## Información general

Para recopilar trazas desde tus contenedores de ECS, actualiza las definiciones de tareas, tanto para el Agent como para el contenedor de aplicaciones, como se describe a continuación.

Una posibilidad es modificar el [archivo de definición de tareas][4] usado anteriormente y [registrar tu definición de tareas actualizada][5]. También puedes editar la definición de tareas directamente desde la interfaz de usuario de Amazon Web.

Una vez activado, el contenedor del Datadog Agent recopila las trazas emitidas desde los otros contenedores de aplicaciones que se encuentran en ese mismo host.

## Configurar el Datadog Agent para aceptar trazas
1. Para recopilar todas las trazas de tus contenedores de ECS en ejecución, actualiza la definición de tareas del Agent mediante los [parámetros de ECS originales][6] con la siguiente configuración.

   Usa [datadog-agent-ecs-apm.json][3] como punto de referencia para la configuración de base requerida. En la definición de tareas del contenedor del Datadog Agent, configura las `portMappings` de un host en el puerto del contenedor `8126` con el protocolo `tcp`.

    ```json
    {
      "containerDefinitions": [
        {
          "name": "datadog-agent",
          "image": "public.ecr.aws/datadog/agent:latest",
          "cpu": 100,
          "memory": 256,
          "essential": true,
          "portMappings": [
            {
              "hostPort": 8126,
              "protocol": "tcp",
              "containerPort": 8126
            }
          ],
          (...)
        }
      ]
    }
    ```

2. Para **versiones del Agent 7.17 o anteriores**, añade las siguientes variables:
    ```json
    "environment": [
      (...)
      {
        "name": "DD_APM_ENABLED",
        "value": "true"
      },
      {
        "name": "DD_APM_NON_LOCAL_TRAFFIC",
        "value": "true"
      }
    ]
    ```

3. Si estás actualizando un archivo local para tu definición de tareas del Agent, [registra tu definición de tareas actualizada][5]. Al hacerlo, se creará una nueva revisión. A continuación, puedes hacer referencia a esta revisión actualizada en el servicio daemon del Datadog Agent.

## Configurar tu contenedor de aplicaciones para enviar trazas al Datadog Agent

### Instalar la biblioteca de rastreo
Sigue las [instrucciones de configuración para instalar la biblioteca de rastreo de Datadog][2] para el lenguaje de tu aplicación. Para ECS, instala el rastreador en la imagen del contenedor de tu aplicación.

### Introducir la dirección IP privada para la instancia EC2
Indica al rastreador la dirección IP privada de la instancia EC2 subyacente en la que se está ejecutando el contenedor de aplicaciones. Esta dirección es el nombre de host del endpoint del rastreador. El contenedor del Datadog Agent que está en el mismo host (con el puerto de host activado) recibe estas trazas.

Usa uno de los siguientes métodos para obtener dinámicamente la dirección IP privada:

{{< tabs >}}
{{% tab "EC2 metadata endpoint" (Endpoint de metadatos EC2) %}}

El [endpoint de metadatos EC2 de Amazon (IMDSv1)][1] permite detectar la dirección IP privada. Para obtener la dirección IP privada de cada host, usa el comando curl para la siguiente URL:

{{< code-block lang="curl" >}}
curl http://169.254.169.254/latest/meta-data/local-ipv4
{{< /code-block >}}

Si estás usando la versión 2 de [Instance Metadata Service (IMDSv2)][2]:

{{< code-block lang="curl" >}}
TOKEN=$(curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600")
curl http://169.254.169.254/latest/meta-data/local-ipv4 -H "X-aws-ec2-metadata-token: $TOKEN"
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
{{% /tab %}}
{{% tab "ECS container metadata file" ("Archivo de metadatos del contenedor de ECS") %}}

El [archivo de metadatos del contenedor de ECS de Amazon][1] permite detectar la dirección IP privada. Para obtener la dirección IP privada de cada host, ejecuta el siguiente comando:

{{< code-block lang="curl" >}}
cat $ECS_CONTAINER_METADATA_FILE | jq -r .HostPrivateIPv4Address
{{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/container-metadata.html#metadata-file-format
{{% /tab %}}
{{< /tabs >}}

Indica el resultado de esta solicitud al rastreador configurando la variable de entorno `DD_AGENT_HOST` para cada contenedor de aplicaciones que envíe trazas. 

### Configurar el endpoint de Trace Agent

En los casos en que las variables de tu aplicación ECS se configuran en el momento de inicio (Java, .NET y PHP), **debes** configurar el nombre de host del endpoint del rastreador como una variable de entorno con `DD_AGENT_HOST` mediante uno de los métodos anteriores. En los siguientes ejemplos se usa el endpoint de metadatos de IMDSv1, aunque es posible intercambiar la configuración si es necesario. Si tienes un script de inicio como punto de entrada, incluye esta llamada como parte del script o añádela al `entryPoint` de la definición de tareas de ECS.

Para otros lenguajes compatibles (Python, JavaScript, Ruby y Go), también puedes configurar el nombre de host en el código fuente de tu aplicación.

{{< programming-lang-wrapper langs="python,nodeJS,ruby,go,java,.NET,PHP" >}}

{{< programming-lang lang="python" >}}

#### Variable de momento de inicio
Actualiza el `entryPoint` de la definición de tareas con lo siguiente, sustituyendo tu `<Python Startup Command>`:

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Python Startup Command>"
]
```
Para Python, el comando de inicio suele ser `ddtrace-run python my_app.py`, aunque puede variar en función del marco utilizado; por ejemplo, usando [uWSGI][1] o instrumentando tu [código manualmente con `patch_all`][2].

#### Código
También puedes actualizar el código para que el rastreador configure el nombre de host explícitamente:

```python
import requests
from ddtrace import tracer


def get_aws_ip():
  r = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4')
  return r.text

tracer.configure(hostname=get_aws_ip())
```

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#uwsgi
[2]: https://ddtrace.readthedocs.io/en/stable/basic_usage.html#patch-all
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

#### Variable de momento de inicio
Actualiza el `entryPoint` de la definición de tareas con lo siguiente, sustituyendo tu `<Node.js Startup Command>`:
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Node.js Startup Command>"
]
```

#### Código
También puedes actualizar el código para que el rastreador configure el nombre de host explícitamente:

```javascript
const tracer = require('dd-trace').init();
const axios = require('axios');

(async () => {
  const { data: hostname } = await axios.get('http://169.254.169.254/latest/meta-data/local-ipv4');
  tracer.setUrl(`http://${hostname}:8126`);
})();
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

#### Variable de momento de inicio
Actualiza el `entryPoint` de la definición de tareas con lo siguiente, sustituyendo tu `<Ruby Startup Command>`:
```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Ruby Startup Command>"
]
```

#### Código
También puedes actualizar el código para que el rastreador configure el nombre de host explícitamente:

```ruby
require 'ddtrace'
require 'net/http'

Datadog.configure do |c|
  c.agent.host = Net::HTTP.get(URI('http://169.254.169.254/latest/meta-data/local-ipv4'))
end
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

#### Variable de momento de inicio
Actualiza el `entryPoint` de la definición de tareas con lo siguiente, sustituyendo tu`<Go Startup Command>`:

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Go Startup Command>"
]
```

#### Código
También puedes actualizar el código para que el rastreador configure el nombre de host explícitamente:

```go
package main

import (
    "net/http"
    "io/ioutil"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    resp, err := http.Get("http://169.254.169.254/latest/meta-data/local-ipv4")
    bodyBytes, err := ioutil.ReadAll(resp.Body)
    host := string(bodyBytes)
    if err == nil {
        //set the output of the curl command to the DD_AGENT_HOST env
        os.Setenv("DD_AGENT_HOST", host)
        // tell the trace agent the host setting
        tracer.Start(tracer.WithAgentAddr(host))
        defer tracer.Stop()
    }
    //...
}
```

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

#### Variable de momento de inicio
Actualiza el `entryPoint` de la definición de tareas con lo siguiente, sustituyendo tu `<Java Startup Command>`:

```java
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); <Java Startup Command>"
]
```
El comando de inicio de Java debería incluir tu `-javaagent:/path/to/dd-java-agent.jar`. Consulta la [documentación de rastreo Java para añadir el rastreador a las JVM][1] para ver más ejemplos.

[1]: /es/tracing/trace_collection/dd_libraries/java/?tab=containers#add-the-java-tracer-to-the-jvm
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

#### Variable de momento de inicio
Actualiza el `entryPoint` de la definición de tareas con lo siguiente, sustituyendo tu `APP_PATH`, si no está configurada:

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); dotnet ${APP_PATH}"
]
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

#### Variable de momento de inicio
Actualiza el `entryPoint` de la definición de tareas con lo siguiente:

```json
"entryPoint": [
  "sh",
  "-c",
  "export DD_AGENT_HOST=$(curl http://169.254.169.254/latest/meta-data/local-ipv4); php-fpm -F"
]
```

#### Apache

Para Apache y `mod_php` en VirtualHost o el archivo de configuración del servidor, usa `PassEnv` para configurar `DD_AGENT_HOST` y otras variables de entorno, como las variables del [etiquetado de servicios unificado][1], como en el siguiente ejemplo:

```
PassEnv DD_AGENT_HOST
PassEnv DD_SERVICE
PassEnv DD_ENV
PassEnv DD_VERSION
```

#### PHP fpm

Cuando el parámetro ini está configurado como `clear_env=on`, en el archivo de workers de grupo`www.conf` también debes configurar variables de entorno para que se lean desde el host. Usa esto para configurar también `DD_AGENT_HOST` y otras variables de entorno, como las variables del [etiquetado de servicios unificado][1], como en el siguiente ejemplo:

```
env[DD_AGENT_HOST] = $DD_AGENT_HOST
env[DD_SERVICE] = $DD_SERVICE
env[DD_ENV] = $DD_ENV
env[DD_VERSION] = $DD_VERSION
```

[1]: https://docs.datadoghq.com/es/getting_started/tagging/unified_service_tagging/
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

#### IMDSv2
Al usar IMDSv2, la configuración de `entryPoint` equivalente será como se muestra a continuación. Sustituye el `<Startup Command>` correspondiente en función de tu lenguaje, como se muestra en los ejemplos anteriores.

```json
"entryPoint": [
  "sh",
  "-c",
  "export TOKEN=$(curl -X PUT \"http://169.254.169.254/latest/api/token\" -H \"X-aws-ec2-metadata-token-ttl-seconds: 21600\"); export DD_AGENT_HOST=$(curl -H \"X-aws-ec2-metadata-token: $TOKEN\" http://169.254.169.254/latest/meta-data/local-ipv4); <Startup Command>"
]
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/container/amazon_ecs/
[2]: /es/tracing/trace_collection/
[3]: /resources/json/datadog-agent-ecs-apm.json
[4]: /es/containers/amazon_ecs/?tab=awscli#managing-the-task-definition-file
[5]: /es/containers/amazon_ecs/?tab=awscli#registering-the-task-definition
[6]: /es/containers/amazon_ecs/?tab=awscli#setup
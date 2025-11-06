---
aliases:
- /es/integrations/awsbeanstalk/
- /es/developers/faq/i-want-my-application-deployed-in-a-container-through-elasticbeanstalk-to-talk-to-dogstatsd/
categories:
- aws
- cloud
- configuration & deployment
- log collection
- network
- provisioning
custom_kind: integration
dependencies: []
description: Seguimiento de métricas clave de AWS Elastic Beanstalk.
doc_link: https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/deploy-datadog-aws-elastic-beanstalk
  tag: Blog
  text: Despliegue de Datadog en AWS Elastic Beanstalk
git_integration_title: amazon_elasticbeanstalk
has_logo: true
integration_id: ''
integration_title: AWS Elastic Beanstalk
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_elasticbeanstalk
public_title: Integración AWS Elastic Beanstalk en Datadog
short_description: Seguimiento de métricas clave de AWS Elastic Beanstalk.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

AWS Elastic Beanstalk es un sitio servicio fácil de utilizar para desplegar y escalar aplicaciones web y servicios desarrolladas con Java, .NET, PHP, Node.js, Python, Ruby, Go y Docker en servidores conocidos como Apache, Nginx, Passenger e IIS.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Amazon Web Services][1]. Para recibir métricas de Elastic Beanstalk, debes habilitar la característica [Habilitación de informes de estado mejorado][2] en tu entorno y configurar tu entorno para [publicar métricas de estado mejorado a CloudWatch][3].

**Nota**: Estos parámetros aumentan los gastos de las métricas personalizadas de CloudWatch.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_elasticbeanstalk" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración AWS Elastic Beanstalk no incluye eventos.

### Checks de servicios

La integración AWS Elastic Beanstalk no incluye checks de servicios.

## Configuración del Datadog Agent

Los siguientes pasos despliegan el Datadog Agent en tus máquinas virtuales de Elastic Beanstalk, para que informen sobre las métricas de hosts, además de las métricas rastreadas por la integración AWS. Para obtener más información, consulta [¿Por qué debería instalar el Datadog Agent en mis instancias en la nube?][4].

Selecciona tu método de instalación para configurar el Agent en tu entorno Elastic Beanstalk:

{{< tabs >}}

{{% tab "Sin contenedores (Linux)" %}}

Para una configuración sin contenedor, instala el Datadog Agent en Elastic Beanstalk utilizando la [Personalización avanzada de entorno con archivos de configuración][1] (.ebextensions):

1. Crea una carpeta llamada `.ebextensions` en la raíz de tu [paquete de aplicaciones de origen][2].
2. Descarga [99datadog.config][3] y colócalo en la carpeta `.ebextensions`.
3. Cambia el valor de `api_key` dentro de la plantilla de archivo por`/etc/datadog-agent/datadog.yaml` con tu [clave de API Datadog][4].
4. Cambia el valor de `site` en `/etc/datadog-agent/datadog.yaml` por el de tu región Datadog (por ejemplo: {{< region-param key="dd_site" code="true" >}}) para asegurarte de que el Agent envía los datos a la localización de Datadog correcta.
5. Fija una versión específica del Agent configurando `DD_Agent_VERSION` en `option_settings` para asegurarte de que todos los hosts ejecutan la misma versión del Agent.
6. Despliega tu aplicación con la [consola de Elastic Beanstalk][5], la [EB CLI][6] o la [AWS CLI][7].

Puedes añadir parámetros adicionales al Agent en `/etc/datadog-agent/datadog.yaml`.

Por ejemplo, para habilitar la Monitorización de procesos en vivo:

```text
process_config:
  enabled: "true"
```

#### Recopilación de trazas

Cuando la aplicación no está en un contenedor y el Datadog Agent está configurado con `99datadog.config`, el rastreo se habilita sin ninguna configuración adicional, siempre que la aplicación esté instrumentada con la [configuración de la librería de rastreo][8].



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[3]: https://docs.datadoghq.com/es/config/99datadog.config
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[8]: https://docs.datadoghq.com/es/tracing/setup/
{{% /tab %}}

{{% tab "Sin contenedores (Windows)" %}}

Para una configuración sin contenedor, instala el Datadog Agent en Elastic Beanstalk utilizando la [Personalización avanzada de entorno con archivos de configuración][1] (.ebextensions):

1. Crea una carpeta llamada `.ebextensions` en la raíz de tu [paquete de aplicaciones de origen][2].
2. Descarga [99datadog-windows.config][3] y desplázalo a la carpeta `.ebextensions`. Revisa el ejemplo de configuración y realiza las modificaciones necesarias.
3. En `99datadog-windows.config`, sustituye el valor `APIKEY` por tu [clave de API Datadog][4].
4. (Opcional) Si necesitas añadir variables de entorno, configúralas en la sección `00_setup-env1` de `99datadog-windows.config`. Puedes eliminar esta sección si no necesitas configurar variables entorno.
5. (Opcional) Si no quieres habilitar APM en tu entorno, elimina la sección `packages.msi.DotnetAPM`, la sección `02_setup-APM1` y la sección `03_setup-APM2`.
7. Para la **recopilación de trazas con .NET APM**:
    1. Sustituye el enlace `packages.msi.DotnetAPM` por el archivo MSI (Windows Installer) de la versión deseada en las [notas de lanzamiento dd-trace-dotnet][5].
    2. (Opcional) Si necesitas añadir variables de entorno para .NET APM, configúralas en la sección `00_setup-env1` de `99datadog-windows.config`.
8. Despliegue su aplicación con [Elastic Beanstalk Console][6], [EB CLI][7], o [AWS CLI][8].


#### Recopilación de trazas

Cuando la aplicación no está en un contenedor y el Datadog Agent está configurado con `99datadog-windows.config`, el rastreo se habilita sin ninguna configuración adicional a los pasos indicados en la sección anterior. Para más información sobre la instrumentación del rastreo, consulta [Configuración de Datadog APM][8].



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[3]: https://docs.datadoghq.com/es/config/99datadog-windows.config
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/dd-trace-dotnet/releases
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[8]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[9]: https://docs.datadoghq.com/es/tracing/setup/
{{% /tab %}}

{{% tab "Contenedor único" %}}

Para la configuración de un contenedor Docker único, instala el Datadog Agent en Elastic Beanstalk utilizando la [Personalización avanzada de entorno con archivos de configuración][1] (.ebextensions).

**Nota**: Esta configuración requiere que tu clave de API se coloque en el directorio .ebextensions, que forma parte del código fuente. Para proteger tu clave de API, utiliza [AWS Secret Manager][2] u otra herramienta de gestión de secretos.

1. Crea una carpeta llamada `.ebextensions` en la raíz de tu [paquete de aplicaciones de origen][3].
2. Descarga [99datadog.config][4] y colócalo en la carpeta `.ebextensions`.
3. Cambia el valor de `api_key` dentro de la plantilla de archivo por`/etc/datadog-agent/datadog.yaml` con tu [clave de API Datadog][5].
4. Cambia el valor de `site` en `/etc/datadog-agent/datadog.yaml` por el de tu región Datadog (por ejemplo: {{< region-param key="dd_site" code="true" >}}) para asegurarte de que el Agent envía los datos a la localización de Datadog correcta.
5. Fija una versión específica del Agent configurando `DD_Agent_VERSION` en `option_settings` para asegurarte de que todos los hosts ejecutan la misma versión del Agent.
6. Despliega tu aplicación con la [consola de Elastic Beanstalk][6], la [EB CLI][7] o la [AWS CLI][8].

Puedes añadir parámetros adicionales al Agent en `/etc/datadog-agent/datadog.yaml`.

Por ejemplo, para habilitar la Monitorización de procesos en vivo:

```text
process_config:
  enabled: "true"
```

#### Recopilación de trazas

Para habilitar el rastreo para contenedores Docker individuales:

1. Actualiza la sección `/etc/datadog-agent/datadog.yaml` del archivo `99datadog.config` con `apm_non_local_traffic`, con el siguiente formato:

    ```
    apm_config:
      enabled: "true"
      apm_non_local_traffic: "true"
    ```

2. Configura las bibliotecas de rastreo para dirigir trazas a la [IP de pasarela del puente de red][9], que por defecto es `172.17.0.1`, desde dentro del contenedor de la aplicación. (Si tienes dudas de que esta sea la IP de la pasarela, ejecuta `docker inspect <container id>` para confirmarlo).

Para todos los lenguajes, define la variable de entorno `DD_AGENT_HOST` en la IP de pasarela. Alternativamente, para los siguientes lenguajes, define el nombre del host mediante programación:

##### Python

```python
from ddtrace import tracer

tracer.configure(hostname="172.17.0.1")
```

##### Node.js

```javascript
const tracer = require('dd-trace');

tracer.init({ hostname: "172.17.0.1" });
```

##### Ruby

```Ruby
require 'ddtrace'

Datadog.Configurar do |c|
  c.tracer hostname: "172.17.0.1")
end
```

##### Go

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
  tracer.Start(tracer.WithAgentAddr("172.17.0.1"))
  defer tracer.Stop()

  // ...
}
```



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://aws.amazon.com/secrets-manager/
[3]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[4]: https://docs.datadoghq.com/es/config/99datadog.config
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[8]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[9]: https://docs.docker.com/network/network-tutorial-standalone/
{{% /tab %}}

{{% tab "Múltiples contenedores" %}}

Para múltiples contenedores Docker, utiliza el Datadog Agent contenedorizado para monitorizar el uso de Docker con un archivo llamado `Dockerrun.aws.json`.

Un archivo `Dockerrun.aws.json` es un archivo JSON específico de Elastic Beanstalk que describe cómo desplegar un conjunto de contenedores Docker como una aplicación Elastic Beanstalk. Puede utilizar este archivo para un multicontenedor Docker entorno . `Dockerrun.aws.json` describe los contenedores que se deben implementar en cada instancia Contenedor del entorno y los volúmenes de datos que se deben crear en la instancia host para que se monten los contenedores.

Un archivo `Dockerrun.aws.json` se puede utilizar solo o comprimido con código fuente adicional en un único archivo. El código fuente que se archiva con `Dockerrun.aws.json` se despliega en instancias de contenedor y es accesible en el directorio `/var/app/current/`. Utiliza la sección `volumes` de la configuración para proporcionar puntos de montaje para los contenedores que se ejecutan en la instancia y la sección `mountPoints` de las definiciones de contenedor integradas para montarlos desde los contenedores.

El siguiente ejemplo de código ilustra un `Dockerrun.aws.json` declarando el Datadog Agent. Actualiza la sección `containerDefinitions` con tu [clave de API Datadog][1], etiquetas (tags) (opcional) y cualquier definición adicional de contenedor. Si es necesario, este archivo se puede comprimir con contenido adicional, como se ha descrito anteriormente. Para obtener más información sobre la sintaxis de este archivo, consulta la [configuración de Docker multicontenedor][2].

**Notas**:

- Para un uso elevado de recursos, es posible que necesites un límite de memoria más alto.
- Para garantizar que todos hosts ejecuten la misma versión Agent, es recomendado cambiar `agent:7` a una versión menor específica de la [ imagenDocker ][3].
{{< site-region region="us3,eu,gov" >}}
- Define `DD_SITE` como {{< region-param key="dd_site" code="true" >}} para garantizar que el Agent envíe datos a la localización correcta de Datadog.
{{< /site-region >}}

```json
{
    "AWSEBDockerrunVersion": 2,
    "volumes": [
        {
            "name": "docker_sock",
            "host": {
                "sourcePath": "/var/run/Docker.sock"
            }
        },
        {
            "name": "proc",
            "host": {
                "sourcePath": "/proc/"
            }
        },
        {
            "name": "cgroup",
            "host": {
                "sourcePath": "/cgroup/"
            }
        }
    ],
    "containerDefinitions": [
        {
            "name": "dd-Agent",
            "image": "gcr.io/datadoghq/Agent:7",
            "entorno": [
                {
                    "name": "DD_API_KEY",
                    "value": "<YOUR_DD_API_KEY>"
                },
                {
                    "name": "DD_SITE",
                    "value": "<YOUR_DD_SITE>"
                },
                {
                    "name": "DD_TAGS",
                    "value": "<SIMPLE_TAG>, <KEY:VALUE_TAG>"
                }
            ],
            "memoria": 256,
            "mountPoints": [
                {
                    "sourceVolume": "docker_sock",
                    "containerPath": "/var/run/Docker.sock",
                    "readOnly": false
                },
                {
                    "sourceVolume": "proc",
                    "containerPath": "/host/proc",
                    "readOnly": true
                },
                {
                    "sourceVolume": "cgroup",
                    "containerPath": "/host/sys/fs/cgroup",
                    "readOnly": true
                }
            ]
        }
    ]
}
```

#### Creación del entorno

Una vez que la definición del contenedor esté lista, envíala a Elastic Beanstalk. Para obtener instrucciones específicas, consulta los [entornos Docker multicontenedor][4] en la documentación de AWS Elastic Beanstalk.

#### DogStatsD

Para recopilar métricas personalizadas de tu contenedor de aplicación utilizando DogStatsD en el [entorno Docker multicontenedor][4], añade lo siguiente a tu `Dockerrun.aws.json`:

1. Añada la variable entorno `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` bajo la `dd-agent` Contenedor :

    ```json
    {
      "name": "DD_DOGSTATSD_NON_LOCAL_TRAFFIC",
      "value": "true"
    }
    ```

2. Añada un enlace a `dd-agent` Contenedor bajo su aplicación Contenedor:

    ```text
    "links": [ "dd-agent:dd-agent"]
    ```

Para obtener más información, consulta [DogStatsD y Docker][5].



[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html
[3]: https://gcr.io/datadoghq/agent
[4]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecstutorial.html
[5]: https://docs.datadoghq.com/es/integrations/faq/dogstatsd-and-docker/
{{% /tab %}}

{{< /tabs >}}

#### Múltiples contenedores Docker

1. En el mismo `Dockerrun.aws.json` de la aplicación, añade un contenedor de Datadog Agent utilizando la imagen `datadog/agent`. Añade lo siguiente:
    - En la sección `portMappings`, añade un `hostPort` 8126 con un `containerPort` 8126.
    - En la sección `environment`, configura `DD_APM_ENABLED` y `DD_APM_NON_LOCAL_TRAFFIC` como `true`.
2. En el contenedor de tu aplicación, que se instrumentó con la [configuración de la librería de rastreo][14], añade lo siguiente:
    - En la sección `environment`, añade una variable de entorno llamada `DD_AGENT_HOST` al nombre del contenedor de Datadog Agent.
    - En la sección `links`, establezca Agent Contenedor para que se utilice como variable entorno.

A continuación se muestra un ejemplo:

```text
 "containerDefinitions": [ {
      "name": "dd-Agent",
      "image": "Datadog/Agent:latest",
      "entorno": [
          {
              "name": "DD_API_KEY",
              "value": "<api key>"
          },
          {
              "name": "DD_APM_ENABLED",
              "value": "true"
          },
          {
             "name": "DD_APM_NON_LOCAL_TRAFFIC",
             "value": "true"
          },
         # cualquier otra variable entorno necesaria
      ],
      "portMappings": [
        {
          "hostPuerto": 8126,
          "containerPort": 8126
        }
      ],
      "memory": 256,
      "mountPoints": [
          # cualquier punto de montaje necesario
         }
      ]
    },
    {
      "name": "aplicación-Contenedor",
      "image": "<application image name>",
      "entorno": [
        {
          "nombre": "DD_AGENT_HOST",
          "value": "dd-Agent",
          # cualquier otra variable entorno necesaria
        }
      ],
      "links": [
        "dd-Agent:dd-Agent"
      ],

```

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html
[3]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced-cloudwatch.html#health-enhanced-cloudwatch-console
[4]: https://docs.datadoghq.com/es/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[5]: https://docs.datadoghq.com/es/help/

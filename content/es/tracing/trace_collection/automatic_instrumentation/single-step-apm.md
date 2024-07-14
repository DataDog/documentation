---
aliases:
- /es/tracing/trace_collection/single-step-apm
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentación
  text: Habilitar métricas de tiempo de ejecución
is_beta: true
kind: documentación
title: Instrumentación de un solo paso APM (Beta)
---
## Información general

La instrumentación de un solo paso APM instala el Datadog Agent e [instrumenta][4] tus aplicaciones en un solo paso, sin necesidad de pasos adicionales de configuración.

## Requisitos

- **Lenguajes y arquitecturas**: la instrumentación de un solo paso APM es únicamente compatible con servicios de rastreo Java, Python, Ruby, Node.js, y .NET Core en arquitecturas `x86_64` y `arm64`.

- **Sistemas operativos**: máquinas virtuales Linux (Debian, Ubuntu, Amazon Linux, CentOS/Red Hat, Fedora), Docker, clústeres Kubernetes con contenedores Linux.

## Habilitar APM en tus aplicaciones

Si [instalas o actualizas un Datadog Agent][1] con la opción **Habilitar la instrumentación APM (beta)** seleccionada, el Agent se instala y configura para habilitar APM. Esto instrumenta automáticamente tu aplicación, sin la necesidad de ningún paso adicional de instalación o configuración.

Los siguientes ejemplos muestran cómo funciona para cada tipo de despliegue.

{{< tabs >}}
{{% tab "Linux host or VM" (Host Linux o máquina virtual) %}}

<div class="alert alert-warning">Si ya has utilizado la instrumentación de un solo paso con hosts Linux, <a href="/tracing/trace_collection/automatic_instrumentation/ssi-0-13-1">actualiza a la última versión</a>.</div>

Para un host Ubuntu:

1. Ejecuta el comando de instalación de una línea:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Sustituye `<YOUR_DD_API_KEY>` por tu [clave de API Datadog][4], `<YOUR_DD_SITE>` por tu [sitio Datadog][3] y `<AGENT_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `staging`).
   <div class="alert alert-info">Para ver más opciones, consulta <a href=#advanced-options>Opciones avanzadas</a>.</div>
2. Inicia una nueva sesión de shell.
3. Reinicia los servicios en el host o la máquina virtual.

[3]: /es/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /es/tracing/service_catalog/
[7]: https://github.com/DataDog/dd-trace-java/releases
[8]: https://github.com/DataDog/dd-trace-js/releases
[9]: https://github.com/DataDog/dd-trace-py/releases
[10]: https://github.com/DataDog/dd-trace-dotnet/releases
[11]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}

{{% tab "Docker" %}}

En un contenedor Linux Docker:

1. Ejecuta el comando de instalación de una línea:
   ```shell
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
   ```
2. Configura el Agent en Docker:
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=<YOUR_DD_API_KEY> \
     -e DD_APM_ENABLED=true \
     -e DD_ENV=<AGENT_ENV> \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
     -v /opt/datadog/apm:/opt/datadog/apm \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   Sustituye `<YOUR_DD_API_KEY>` por tu [clave de API Datadog][5] y `<AGENT_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `staging`).
   <div class="alert alert-info">Para ver más opciones, consulta <a href=#advanced-options>Opciones avanzadas</a>.</div>
3. Reinicia los contenedores Docker.
4. [Explora la observabilidad del rendimiento de tus servicios en Datadog][6].

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /es/tracing/service_catalog/

{{% /tab %}}

{{% tab "Kubernetes" %}}

Puedes habilitar APM instalando el Agent con cualquiera de las dos opciones:

- Datadog Operator
- Helm Chart Datadog

<div class="alert alert-info">La instrumentación de un solo paso no instrumenta aplicaciones en el espacio de nombres donde instalas el Datadog Agent. Se recomienda instalar el Agent en un espacio de nombres separado en tu clúster, donde no ejecutes tus aplicaciones.</div>

### Requisitos

- Kubernetes v1.20 y posterior
- [`Helm`][1] para desplegar el Datadog Operator.
- [CLI `Kubectl`][2] para instalar el Datadog Agent.

{{< collapse-content title="Instalación con el Datadog Operator" level="h4" >}}
Sigue estos pasos para habilitar la instrumentación de un solo paso en todo tu clúster con el Datadog Operator. Esto envía automáticamente trazas para todas las aplicaciones en el clúster que están escritas en lenguajes compatibles.

Para habilitar la instrumentación de un solo paso con el Datadog Operator:

1. Instala el [Datadog Operator:][36] v1.5.0 o superior con Helm:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```
2. Crea un secreto Kubernetes para almacenar tu [clave de API][10] Datadog:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
3. Crea `datadog-agent.yaml` con las especificaciones de configuración del despliegue de tu Datadog Agent. La siguiente configuración es la más sencilla:
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       site: <DATADOG_SITE>
       tags:
         - env:<AGENT_ENV>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
     features:
       apm:
         instrumentation:
           enabled: true  
   ```
   Sustituye `<Datadog_SITE>` por tu [sitio Datadog][12] y `<Agent_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `env:staging`).
   <div class="alert alert-info">Para ver más opciones, consulta <a href=#advanced-options>Opciones avanzadas</a>.</div>

4. Ejecuta el siguiente comando:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
5. Espera unos minutos a que se apliquen los cambios del Datadog Cluster Agent y reinicia tus aplicaciones.
{{< /collapse-content >}} 

{{< collapse-content title="Instalación con Helm" level="h4" >}}
Sigue estos pasos para habilitar la instrumentación de un solo paso en todo tu clúster con Helm. Esto envía automáticamente trazas para todas las aplicaciones en el clúster que están escritas en lenguajes compatibles.

Para habilitar la instrumentación de un solo paso con Helm:

1. Añade el repositorio Helm de Datadog:
   ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Crea un secreto Kubernetes para almacenar tu [clave de API][10] Datadog:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
3. Crea `datadog-values.yaml` y añade la siguiente configuración:
   ```
   datadog:
    apiKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
    tags:
         - env:<AGENT_ENV>
    apm:
      instrumentation:
         enabled: true
   ```
   Sustituye `<Datadog_SITE>` por tu [sitio Datadog][12] y `<Agent_ENV>` por el entorno en el que está instalado tu Agent (por ejemplo, `env:staging`).

   <div class="alert alert-info">Para ver más opciones, consulta <a href=#advanced-options>Opciones avanzadas</a>.</div>

4. Ejecuta el siguiente comando:
   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. Espera unos minutos a que se apliquen los cambios del Datadog Cluster Agent y reinicia tus aplicaciones.

{{< /collapse-content >}} 

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /es/getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[36]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator

{{% /tab %}}
{{< /tabs >}}

Después de completar estos pasos, es posible que quieras habilitar [métricas de tiempo de ejecución][2] o ver los datos de observabilidad de tu aplicación en el [catálogo de servicios][3].

## Opciones avanzadas

Cuando ejecutas el comando de instalación de una línea, hay algunas opciones disponibles para personalizar tu experiencia:

{{< tabs >}}
{{% tab "Linux host or VM" (Host Linux o máquina virtual) %}}

### Especificación de versiones de bibliotecas de rastreo {#lib-linux}

Por defecto, la habilitación de APM en tu servidor instala la compatibilidad para servicios Java, Python, Ruby, Node.js, y .NET Core. Si sólo tienes servicios implementados en algunos de estos lenguajes, configura `DD_APM_INSTRUMENTATION_LIBRARIES` en tu comando de instalación de una línea.

Por ejemplo, para instalar sólo la versión 1.25.0 de la biblioteca de rastreo Java y la última versión de la biblioteca de rastreo Python, añade lo siguiente al comando de instalación:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Puedes proporcionar opcionalmente un número de versión para la biblioteca de rastreo colocando dos puntos después del nombre del lenguaje y especificando la versión de la biblioteca de rastreo. Si no especificas una versión, se utilizará por defecto la versión más reciente. Los nombres de lenguajes están separados por comas.

Las versiones disponibles se enumeran en los repositorios de orígenes de rastreadores para cada lenguaje:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)

[2]: /es/agent/remote_config
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}

{{% tab "Docker" %}}

### Especificación de versiones de bibliotecas de rastreo {#lib-docker}

Por defecto, la habilitación de APM en tu servidor instala la compatibilidad para servicios Java, Python, Ruby, Node.js, y .NET Core. Si sólo tienes servicios implementados en algunos de estos lenguajes, configura `DD_APM_INSTRUMENTATION_LIBRARIES` al ejecutar el script de instalación.

Por ejemplo, para instalar sólo la versión 1.25.0 de la biblioteca de rastreo Java y la última versión de la biblioteca de rastreo Python, añade lo siguiente al comando de instalación:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
```

Puedes proporcionar opcionalmente un número de versión para la biblioteca de rastreo colocando dos puntos después del nombre del lenguaje y especificando la versión de la biblioteca de rastreo. Si no especificas una versión, se utilizará por defecto la versión más reciente. Los nombres de lenguajes están separados por comas.

Las versiones disponibles se enumeran en los repositorios de orígenes de rastreadores para cada lenguaje:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)

[5]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}

{{% tab "Kubernetes" %}}

### Habilitar o deshabilitar la instrumentación para espacios de nombres

Puedes elegir habilitar o deshabilitar la instrumentación para aplicaciones en espacios de nombres específicos. Sólo puedes definir espacios de nombres habilitados o espacios de nombres deshabilitados, no ambos.

El archivo que tienes que configurar depende de si has habilitado la instrumentación de un solo paso con el Datadog Operator o con Helm:

{{< collapse-content title="Datadog Operator" level="h4" >}}

Para habilitar la instrumentación para espacios de nombres específicos, añade la configuración `enabledNamespaces` a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true 
         enabledNamespaces: # Añadir espacios de nombres que se van a instrumentar
           - default
           - applications
{{< /highlight >}}

Para deshabilitar la instrumentación para determinados espacios de nombres, añade la configuración `disabledNamespaces` a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true 
         disabledNamespaces: # Añadir espacios de nombres que no se van a instrumentar
           - default
           - applications
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

Para habilitar la instrumentación para espacios de nombres específicos, añade la configuración `enabledNamespaces` a `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # Añadir espacios de nombres que se van a instrumentar
             - namespace_1
             - namespace_2
{{< /highlight >}}

Para deshabilitar la instrumentación para determinados espacios de nombres, añade la configuración `disabledNamespaces` a `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          disabledNamespaces: # Añadir espacios de nombres que no se van a instrumentar
            - namespace_1
            - namespace_2
{{< /highlight >}}

{{< /collapse-content >}}

### Especificación de versiones de bibliotecas de rastreo

<div class="alert alert-info">A partir del Datadog Cluster Agent v7.52.0 o superior, puedes instrumentar automáticamente un subconjunto de tus aplicaciones, basándose en las bibliotecas de rastreo que especifiques.</div>

Especifica bibliotecas de rastreo de Datadog y sus versiones para instrumentar automáticamente las aplicaciones escritas en esos lenguajes. Puedes configurarlo de dos maneras, que se aplican en el siguiente orden de precedencia:

1. [Especificarlas a nivel del servicio](#specifying-at-the-service-level) o bien
2. [Especificarlas a nivel del clúster](#specifying-at-the-cluster-level).

**Por defecto**: Si no especificas ninguna versión de biblioteca y`apm.instrumentation.enabled=true`, las aplicaciones escritas en los lenguajes soportados se instrumentan automáticamente utilizando las últimas versiones de bibliotecas de rastreo.

#### Especificación a nivel del servicio 

Para instrumentar automáticamente aplicaciones en pods específicos, añade la anotación de lenguaje y la versión de biblioteca adecuadas para tu aplicación en la especificación de tu pod:

| Lenguaje   | Anotación del pod                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |

Sustituye `<CONTAINER IMAGE TAG>` por la versión de biblioteca deseada. Las versiones disponibles se enumeran en los [registros de contenedores de Datadog](#container-registries) y en los repositorios de orígenes de rastreadores para cada lenguaje:

- [Java][31]
- [Node.js][32]
- [Python][33]
- [.NET][34] (Para aplicaciones .NET que utilizan una distribución Linux basada en musl como Alpine, especifica una etiqueta (tag) con el sufijo `-musl`, como en `v2.29.0-musl`).
- [Ruby][35]

<div class="alert alert-warning">Ten cuidado al utilizar la <code>última</code> etiqueta (tag), ya que las mayores versiones de bibliotecas pueden introducir cambios de última hora.</div>

Por ejemplo, para instrumentar aplicaciones Java automáticamente:

{{< highlight yaml "hl_lines=10" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # ...
spec:
  template:
    metadata:
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # ...
{{< /highlight >}}

#### Especificación a nivel del clúster 

Si no habilitas la instrumentación automática para pods específicos utilizando las anotaciones, puedes especificar qué lenguajes instrumentar en todo el clúster utilizando la configuración de la instrumentación de un solo paso. Cuando se define `apm.instrumentation.libVersions`, sólo se instrumentan las aplicaciones escritas en los lenguajes especificados, utilizando las versiones de biblioteca especificadas.

El archivo que tienes que configurar depende de si has habilitado la instrumentación de un solo paso con el Datadog Operator o con Helm:

{{< collapse-content title="Datadog Operator" level="h4" >}}

Por ejemplo, para instrumentar aplicaciones .NET, Python, y Node.js añade la siguiente configuración a tu archivo `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-8" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Añade todas las bibliotecas y versiones que quieres configurar
            dotnet: v2.46.0
            python: v1.20.6
            js: v4.17.0
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

Por ejemplo, para instrumentar aplicaciones .NET, Python, y Node.js añade la siguiente configuración a tu archivo `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-8" >}}
   datadog:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Añade todas las bibliotecas y versiones que quieres configurar
            dotnet: v2.46.0
            python: v1.20.6
            js: v4.17.0
{{< /highlight >}}

{{< /collapse-content >}}


#### Registros de contenedores

Datadog publica imágenes de bibliotecas de instrumentación en gcr.io, Docker Hub y Amazon ECR:

| Lenguaje   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js  | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |

La variable de entorno `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` en la configuración del Datadog Cluster Agent especifica el registro utilizado por el controlador de admisión. El valor por defecto es `gcr.io/datadoghq`.

Puedes extraer la biblioteca de rastreo de un registro diferente cambiándolo por `docker.io/datadog`, `public.ecr.aws/datadog` u otra URL, si alojas las imágenes en un registro de contenedores local.

Para obtener instrucciones sobre cómo cambiar el registro de contenedores, consulta [Para cambiar tu registro de contenedores][30].

[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /es/getting_started/site/
[5]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[6]: /es/getting_started/site
[15]: http://gcr.io/datadoghq/dd-lib-java-init
[16]: http://hub.docker.com/r/datadog/dd-lib-java-init
[17]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[18]: http://gcr.io/datadoghq/dd-lib-js-init
[19]: http://hub.docker.com/r/datadog/dd-lib-js-init
[20]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[21]: http://gcr.io/datadoghq/dd-lib-python-init
[22]: http://hub.docker.com/r/datadog/dd-lib-python-init
[23]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[24]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[25]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[26]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[27]: http://gcr.io/datadoghq/dd-lib-ruby-init
[28]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[29]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[30]: /es/containers/guide/changing_container_registry/
[31]: https://github.com/DataDog/dd-trace-java/releases
[32]: https://github.com/DataDog/dd-trace-js/releases
[33]: https://github.com/DataDog/dd-trace-py/releases
[34]: https://github.com/DataDog/dd-trace-dotnet/releases
[35]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}
{{< /tabs >}}

## Eliminar la instrumentación de un solo paso APM de tu Agent

Si no quieres recopilar datos de trazas de un determinado servicio, host, máquina virtual o contenedor, sigue los pasos que se indican a continuación:

### Eliminar la instrumentación para servicios específicos

Para eliminar la instrumentación APM y dejar de enviar trazas desde un servicio específico, sigue estos pasos:

{{< tabs >}}
{{% tab "Linux host or VM" (Host Linux o máquina virtual) %}}

1. Añade la variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio del servicio: 

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Reinicia el servicio.

{{% /tab %}}

{{% tab "Docker" %}}

1. Añade la variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio del servicio: 
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Reinicia el servicio.
{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Configura la etiqueta (label) `admission.datadoghq.com/enabled:` como `"false"` para la especificación del pod:
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. Aplica la configuración:
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. Reinicia los servicios de los que quieres eliminar la instrumentación.

{{% /tab %}}
{{< /tabs >}}

### Eliminar APM para todos servicios de la infraestructura

Para dejar de producir trazas, desinstala APM y reinicia la infraestructura:

{{< tabs >}}
{{% tab "Linux host or VM" (Host Linux o máquina virtual) %}}

1. Ejecuta:
   ```shell
   dd-host-install --uninstall
   ```
2. Reinicia tu host.

{{% /tab %}}

{{% tab "Docker" %}}

1. Ejecuta:
   ```shell
   dd-container-install --uninstall
   ```
2. Reinicia Docker:
   ```shell
   systemctl restart docker
   ```
   O utiliza el equivalente para tu entorno.

{{% /tab %}}

{{% tab "Kubernetes" %}}

El archivo que tienes que configurar depende de si has habilitado la instrumentación de un solo paso con el Datadog Operator o con Helm:

{{< collapse-content title="Datadog Operator" level="h4" >}}

1. Configura `instrumentation.enabled=false` en `datadog-agent.yaml`:
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Despliega el Datadog Agent con el archivo de configuración actualizado:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

1. Configura `instrumentation.enabled=false` en `datadog-values.yaml`:
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. Ejecuta el siguiente comando:
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{< /collapse-content >}}

{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/tracing/metrics/runtime_metrics/
[3]: /es/tracing/service_catalog/
[4]: /es/tracing/glossary/#instrumentation
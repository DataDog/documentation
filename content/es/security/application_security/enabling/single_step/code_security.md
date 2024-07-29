---
title: Habilitación de la seguridad del código con la instrumentación de un solo paso
---

<div class="alert alert-info">La habilitación de la seguridad del código con la instrumentación de un solo paso está en fase beta.</div>


## Requisitos

- **Versión mínima del Agent: 7.53.0**
- **Versión mínima del Datadog Helm chart: 3.62.0** (para despliegues de Kubernetes).
- **Lenguajes y arquitecturas**: la instrumentación de un solo paso para la seguridad del código es compatible únicamente con servicios de rastreo Java, Node.js, .NET Core en las arquitecturas `x86_64` y `arm64`, y Python (soporte disponible en la fase beta privada).
- **Sistemas operativos**: máquinas virtuales Linux (Debian, Ubuntu, Amazon Linux, CentOS/Red Hat, Fedora), Docker, clústeres de Kubernetes con contenedores Linux.

## Habilitación en un solo paso

Si [instalas o actualizas un Datadog Agent][1] con la opción **Enable Code Security** (Habilitar seguridad del código) seleccionada, el Agent se instala y configura para permitir la detección de vulnerabilidades a nivel de código en las aplicaciones. Esto permite instrumentar automáticamente la aplicación, sin ningún paso adicional de instalación o configuración. Reinicia los servicios para que esta instrumentación surta efecto.


{{< img src="/security/application_security/single_step/asm_single_step_code_security.png" alt="Configuración de la cuenta: página de configuración de Ubuntu que resalta la alternancia para habilitar la instrumentación APM y ASM para la seguridad del código." style="width:100%;" >}}

Los siguientes ejemplos muestran cómo funciona en cada tipo de infraestructura.

{{< tabs >}}
{{% tab "Host Linux o máquina virtual" %}}

Con un solo comando, puedes instalar, configurar e iniciar el Agent, a la vez que instrumentas tus servicios con opciones de seguridad de las aplicaciones.

Para un host Ubuntu:

1. Ejecuta el comando de instalación de una línea:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_IAST_ENABLED=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   a. Sustituye `<YOUR_DD_API_KEY>` por tu [clave de API de Datadog][4].

   b. Sustituye `<YOUR_DD_SITE>` por tu [sitio de Datadog][3].
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-linux">Specifying tracing library versions.</a></li>
         <li><a href="#env-linux">Tagging observability data by environment.</a></li>
      </ul>
   </div>
2. Sal de la sesión de shell actual.
3. Inicia una nueva sesión de shell.
4. Reinicia los servicios en el host o la máquina virtual.
5. [Explora la observabilidad del rendimiento de tus servicios en Datadog][5].

**Nota:** Para configurar un solo paso para la seguridad del código y la protección frente a amenazas, agrega las variables de entorno `DD_IAST_ENABLED=true` _y_ `DD_APPSEC_ENABLED=true` (**ambas**) a tu comando de instalación de una línea.

### Especificación de las versiones de biblioteca de rastreo {#lib-linux}

Por defecto, la activación de APM en tu servidor instala el soporte para los servicios Java, Node.js, .NET Core y Python. Si sólo tienes servicios implementados en algunos de estos lenguajes, configura `DD_APM_INSTRUMENTATION_LIBRARIES` en tu comando de instalación de una línea:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_IAST_ENABLED=true  DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Opcionalmente, puedes proporcionar un número de versión para la biblioteca de rastreo colocando dos puntos después del nombre del lenguaje y especificando la versión de la biblioteca de rastreo. Si no especificas una versión, se utilizará por defecto la versión más reciente. Los nombres de lenguaje están separados por comas.

Los lenguajes admitidos son:

- Java (`java`)
- Node.js (`js`)
- .NET (`dotnet`)
- Python (`python`)

**Nota**: Para la biblioteca de rastreo Node.js, diferentes versiones de Node.js son compatibles con diferentes versiones de la biblioteca de rastreo Node.js. Consulta [DataDog/dd-trace-js: Rastreador de JavaScript APM][6] para obtener más información.

### Datos de observabilidad de etiquetado por entorno {#env-linux}

Establece `DD_ENV` en tu comando de instalación de una línea para Linux a fin de etiquetar automáticamente los servicios instrumentados y otra telemetría que pase a través del Agent con un entorno específico. Por ejemplo, si el Agent está instalado en tu entorno de staging, configura `DD_ENV=staging` para asociar tus datos de observabilidad con `staging`.

Por ejemplo:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_IAST_ENABLED=true DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

[2]: /es/agent/remote_config
[3]: /es/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /es/service_catalog/
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance

{{% /tab %}}

{{% tab "Docker" %}}

Para un contenedor Linux Docker:

1. Instala el inyector de biblioteca:
   ```shell
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
   ```
2. Configura el Agent en Docker:
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=${YOUR_DD_API_KEY} \
     -e DD_APM_ENABLED=true \
     -e DD_IAST_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
     -v /opt/datadog/apm:/opt/datadog/apm \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   Sustituye `<YOUR_DD_API_KEY>` por tu [API de Datadog][5].
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-docker">Specifying tracing library versions.</a></li>
         <li><a href="#env-docker">Tagging observability data by environment.</a></li>
      </ul>
   </div>
3. Reinicia los contenedores Docker.
4. [Explora la observabilidad del rendimiento de tus servicios en Datadog][6].

### Especificación de las versiones de la biblioteca de rastreo {#lib-Docker}

Por defecto, la habilitación de APM en tu servidor instala el soporte para los servicios Java, Python, Node.js, y .NET. Si solo tienes servicios implementados en algunos de estos lenguajes, configura `DD_APM_INSTRUMENTATION_LIBRARIES` cuando ejecutes el script de instalación.

Por ejemplo, para instalar solo la versión v1.25.0 de la biblioteca de rastreo Java y la última versión de la biblioteca de rastreo Python, añade lo siguiente al comando de instalación:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
```

Opcionalmente, puedes proporcionar un número de versión para la biblioteca de rastreo colocando dos puntos después del nombre del leguaje y especificando la versión de la biblioteca de rastreo. Si no especificas una versión, se utilizará por defecto la versión más reciente. Los nombres de lenguaje están separados por comas.

Los lenguajes admitidos son:

- Java (`java`)
- Node.js (`js`)
- .NET (`dotnet`)
- Python (`python`)

**Nota**: Para la biblioteca de rastreo Node.js, diferentes versiones de Node.js son compatibles con diferentes versiones de la biblioteca de rastreo Node.js. Consulta [DataDog/dd-trace-js: Rastreador de JavaScript APM][7] para obtener más información.

### Etiquetado de datos de observabilidad por entorno {#env-docker}

Establece `DD_ENV` en el comando de instalación del inyector de biblioteca para que Docker etiquete automáticamente los servicios instrumentados y otra telemetría que pase por el Agent con un entorno específico. Por ejemplo, si el Agent está instalado en tu entorno de staging, configura `DD_ENV=staging` para asociar los datos de observabilidad con `staging`.

Por ejemplo:

{{< highlight shell "hl_lines=5" >}}
docker run -d --name dd-agent \
  -e DD_API_KEY=${YOUR_DD_API_KEY} \
  -e DD_APM_ENABLED=true \
  -e DD_IAST_ENABLED=true \ 
  -e DD_ENV=staging \
  -e DD_APM_NON_LOCAL_TRAFFIC=true \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
  -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
  -v /opt/datadog/apm:/opt/datadog/apm \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  gcr.io/datadoghq/agent:7
{{< /highlight >}}

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /es/service_catalog/
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance


{{% /tab %}}

{{% tab "Kubernetes" %}}

Puedes habilitar APM instalando el Agent con el Datadog Helm chart. Esto despliega el Datadog Agent a través de todos los nodos en el clúster de Kubernetes basado en Linux con un DaemonSet.

<div class="alert alert-info">La instrumentación de un solo paso no instrumenta aplicaciones en el espacio de nombres donde se instala el Datadog Agent. Se recomienda instalar el Agent en un espacio de nombres separado en un clúster donde no ejecutes tus aplicaciones.</div>

### Requisitos

- Asegúrate de tener instalado [Helm][13].

### Instalación

Para habilitar la instrumentación de un solo paso con Helm:

1. Añade el repositorio de Datadog Helm:
   ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Crea un secreto de Kubernetes para almacenar la [clave de API][10] de Datadog:
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
3. Crea `datadog-values.yaml` y añade la siguiente configuración:
   ```
   datadog:
    apiKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
    apm:
      instrumentation:
         enabled: true
    asm:
      iast:
        enabled: true
   ```
   Sustituye `<DATADOG_SITE>` por tu [sitio de Datadog][12].

4. Ejecuta el siguiente comando:
   ```bash
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. Reinicia tus aplicaciones para que la instrumentación surta efecto.

Para obtener más información sobre la instrumentación de un solo paso de Kubernetes, consulta lo siguiente:

* [Habilitación o deshabilitación de la instrumentación por espacios de nombres][15]
* [Especificación de las versiones de bibliotecas de instrumentación][16]
* [Eliminación de la instrumentación en despliegues específicos][17]

[7]: https://v3.helm.sh/docs/intro/install/
[8]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /es/getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[14]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[15]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#enabling-or-disabling-instrumentation-for-namespaces
[16]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#specifying-tracing-library-versions
[17]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#removing-instrumentation-for-specific-services

{{% /tab %}}
{{< /tabs >}}

## Eliminación del APM de un solo paso y la instrumentación de seguridad de aplicaciones del Agent

Si no deseas recopilar datos de trazas (traces) para un determinado servicio, host, máquina virtual o contenedor, completa los siguientes pasos:

### Eliminación de la instrumentación para servicios específicos

Ejecuta los siguientes comandos y reinicia el servicio para dejar de inyectar la biblioteca en el servicio y dejar de producir trazas a partir de ese servicio.

{{< tabs >}}
{{% tab "Host Linux o máquina virtual" %}}

1. Añade la variable de entorno `DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio de servicio:

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Reinicia el servicio.

3. Para desactivar la seguridad del código, elimina la variable de entorno `DD_IAST_ENABLED=true` de la configuración de tu aplicación y reinicia el servicio.



{{% /tab %}}

{{% tab "Docker" %}}

1. Añade la variable de entorno`DD_INSTRUMENT_SERVICE_WITH_APM` al comando de inicio de servicio:
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Reinicia el servicio.

3. Para deshabilitar la seguridad del código, elimina la variable de entorno `DD_IAST_ENABLED=true` de la configuración de tu aplicación y reinicia el servicio.
{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Establece la etiqueta `admission.datadoghq.com/enabled:` en `"false"` para la especificación del pod:

   ```yaml
   espec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"

<div class="alert alert-info"> Puedes deshabilitar la seguridad del código manteniendo APM al añadir la variable de entorno <code>DD_IAST_ENABLED=false</code> a los despliegues.</div>

{{% /tab %}}

{{< /tabs >}}

### Eliminación de APM para todos los servicios en la infraestructura

Para dejar de producir trazas, retira los inyectores de biblioteca y reinicia la infraestructura:

{{< tabs >}}
{{% tab "Host Linux o máquina virtual" %}}

1. Ejecuta lo siguiente:
   ```shell
   dd-host-install --uninstall
   ```
2. Reinicia el host.

{{% /tab %}}

{{% tab "Docker" %}}

1. Desinstala la inyección de biblioteca local:
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

1. En `apm:`, elimina `instrumentation:` y toda la configuración siguiente en `datadog-values.yaml`.
2. En `asm:`, elimina `iast:` y toda la configuración siguiente en `datadog-values.yaml`.
3. Ejecuta el siguiente comando:

    ```bash
   helm upgrade Datadog-Agent -f Datadog-values.yaml Datadog/Datadog

{{% /tab %}}

{{< /tabs >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/remote_config
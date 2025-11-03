---
aliases:
- /es/continuous_integration/setup_pipelines/jenkins
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explorar los resultados y el rendimiento de la ejecución de pipelines
- link: /continuous_integration/pipelines/custom_commands/
  tag: Documentación
  text: Ampliar la visibilidad de los pipelines mediante el rastreo de comandos individuales
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
title: Configurar el rastreo en un pipeline de Jenkins
---

## Información general

[Jenkins][19] es un servidor de automatización con características de integración y entrega continuas (CI/CD). Con su arquitectura de complementos, Jenkins se puede personalizar para adaptarse a cualquier necesidad de CI/CD y automatiza todos los aspectos del desarrollo, los tests y el despliegue de proyectos.

Configura el rastreo en Jenkins para recopilar datos a través de varias etapas de tus ejecuciones de pipeline, identificar cuellos de botella de rendimiento, resolver desafíos operativos y refinar el despliegue de tus procesos.

### Compatibilidad

| Pipeline Visibility | Plataforma | Definición |.
|---|---|----------------------------------------------------------------------------------------------------------|
| [Pasos manuales][20] | Pasos manuales | Consulta los pipelines activados de forma manual.                                                                       |
| [Tiempo de cola][21] | Tiempo de cola | Consulta el tiempo que los trabajos de pipeline permanecen en la cola antes de procesarse.                                |
| Correlación de logs | Correlación de logs | Correlaciona los tramos (spans) de los pipelines con logs y activa la [recopilación de logs de trabajos][10]. |
| Correlación de métricas de infraestructura | Correlación de métricas de infraestructura | Correlaciona los trabajos con las [métricas del host de la infraestructura][11] para los workers de Jenkins.                                 |
| [Tramos personalizados][26] | Tramos personalizados | Configura los tramos personalizados para tus pipelines.                                                               |
| Etiquetas (tags) personalizadas predefinidas | Etiquetas personalizadas predefinidas | Establece [etiquetas personalizadas predefinidas][12] para todos los pipelines, etapas y tramos de trabajos generados.                                  |
| [Etiquetas personalizadas][22] [y medidas en tiempo de ejecución][23] | Etiquetas personalizadas y medidas en tiempo de ejecución | Configura [etiquetas personalizadas y medidas][12] en tiempo de ejecución.                                                     |
| [Parámetros][24] | Parámetros | Establece parámetros personalizados (como el nombre de la rama predeterminada o la información de Git) cuando se activa un pipeline. |
| [Razones de fallos de pipelines][25] | Identifica las razones de fallos de los pipelines a partir de los mensajes de error.                                                   |
| [Pipelines en ejecución][32] | Pipelines en ejecución | Consulta las ejecuciones de pipelines que se están ejecutando. Requiere la versión >= 8.0.0 del complemento de Jenkins.

Se admiten las siguientes versiones de Jenkins:

- Jenkins >= 2.346.1

Este integración admite tanto la instalación sin el Agent como la instalación con el Agent.
La instalación del Agent es necesaria para la correlación de métricas de infraestructura.

## Instalar el Datadog Agent

Omite este paso si no necesitas la correlación de métricas de infraestructura.

Instala el Datadog Agent en el nodo controlador de Jenkins y en los nodos worker mediante las [instrucciones de instalación del Agent][14].

Si el controlador de Jenkins y el Datadog Agent se han desplegado en un clúster de Kubernetes, Datadog recomienda usar el [controlador de admisión][2], que automáticamente establece la variable de entorno `DD_AGENT_HOST` en el pod del controlador de Jenkins para comunicarse con el Datadog Agent local.

Si deseas enviar los logs de tus trabajos de Jenkins a Datadog, asegúrate de que la recopilación de logs personalizados a través de TCP esté [habilitada y configurada][29] en el Agent.

Si el Agent se ejecuta en un contenedor, añádele la variable de entorno`DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` y asegúrate de que el controlador de Jenkins pueda acceder a los siguientes puertos:
- Puerto [DogStadsD][30]; valor predeterminado `8125/udp`
- [Puerto de trazas (traces) de APM][31]; valor predeterminado `8126/tcp`
- [Puerto de recopilación de logs][29]; valor predeterminado `10518/tcp`

<div class="alert alert-info"><strong>Nota</strong>: No se admite el envío de trazas de CI Visibility a través de sockets de dominio UNIX.</div>

## Instalar el complemento de Jenkins para Datadog

<div class="alert alert-info">Ya sea que decidas utilizar el modo Agentless o el modo basado en el Agent para enviar tus datos a Datadog, <strong>deberás</strong> utilizar el complemento.</div>

Instala y activa la versión 3.1.0 del [complemento de Jenkins para Datadog][3] o una posterior:

1. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Manage Plugins** (Gestionar Jenkins > Gestionar complementos).
2. En [Update Center][4] (Centro de actualizaciones), en la pestaña **Available** (Disponibles), busca `Datadog Plugin` (Complemento de Datadog).
3. Selecciona la casilla junto al complemento e instálalo mediante uno de los dos botones de instalación situados en la parte inferior de la pantalla.
4. Para verificar que el complemento está instalado, busca `Datadog Plugin` (Complemento de Datadog) en la pestaña **Installed** (Instalados).

## Configurar el complemento de Jenkins para Datadog

Existen varias formas de configurar el complemento de Jenkins para Datadog.

### Configurar con la interfaz de usuario de configuración de Jenkins

{{< tabs >}}
{{% tab "Sin el Agent (con una clave de API)" %}}

Usa esta opción para hacer que el complemento de Jenkins envíe datos directamente a Datadog sin usar el Datadog Agent. Esto requiere una clave de API.

1. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Configure System** (Gestionar Jenkins > Configurar sistema).
2. Desplázate por la pantalla de configuración hasta la sección `Datadog Plugin` (Complemento de Datadog).
3. Selecciona el modo `Use Datadog site and API key to report to Datadog` (Utilizar el sitio de Datadog y la clave de API para enviar datos a Datadog).
4. Selecciona tu [sitio de Datadog][1] en el menú desplegable `Pick a site` (Elegir un sitio).
5. Ingresa una `Datadog API Key` (Clave de API de Datadog) válida (o utiliza la opción `Select from credentials` [Seleccionar desde las credenciales]).
6. Haz clic en el botón `Test Key` (Probar clave) para verificar que tu clave de API es válida.
7. Configurar CI Visibility:
   1. Activa la casilla `Enable CI Visibility` (Activar CI Visibility).
   2. (Opcional) Configura el nombre de tu instancia de CI.
8. (Opcional) Configura la recopilación de logs:
   1. Activa la casilla `Enable Log Collection` (Activar la recopilación de logs).
9. (Opcional) Ingresa el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog (por ejemplo, `app.datadoghq.com`) en el campo `Datadog App hostname` (Nombre de host de la aplicación Datadog).
10. Guarda tu configuración.

{{< img src="ci/ci-jenkins-plugin-config-agentless-app-hostname.png" alt="Configuración del complemento de Datadog para Jenkins" style="width:100%;">}}

[1]: /es/getting_started/site/#access-the-datadog-site
{{% /tab %}}
{{% tab "Envío de datos a través del Datadog Agent (recomendado)" %}}

1. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Configure System** (Gestionar Jenkins > Configurar sistema).
2. Desplázate por la pantalla de configuración hasta la sección `Datadog Plugin` (Complemento de Datadog).
3. Selecciona el modo `Use the Datadog Agent to report to Datadog` (Utilizar el Datadog Agent para enviar datos a Datadog).
4. Configura el host `Agent`.
5. Configurar CI Visibility:
   1. Configura el `Traces Collection Port` (Puerto de recopilación de trazas) si no utilizas el puerto predeterminado `8126`.
   2. Haz clic en el botón `Test traces connection` (Probar conexión de trazas) para verificar que tu configuración es válida.
   3. Activa la casilla `Enable CI Visibility` (Activar CI Visibility).
   4. (Opcional) Configura el nombre de tu instancia de CI.
6. (Opcional) Configura la recopilación de logs:
   1. Configura el puerto `Log Collection` (Recopilación de logs) como está configurado en el Datadog Agent.
   2. Haz clic en el botón `Test logs connection` (Probar conexión de logs) para verificar que tu configuración es válida.
   3. Activa la casilla `Enable Log Collection` (Activar la recopilación de logs).
7. (Opcional) Ingresa el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog (por ejemplo, `app.datadoghq.com`) en el campo `Datadog App hostname` (Nombre de host de la aplicación Datadog).
8. Guarda tu configuración.

{{< img src="ci/ci-jenkins-plugin-config-agentful-app-hostname.png" alt="Configuración del complemento de Datadog para Jenkins" style="width:100%;">}}
{{% /tab %}}
{{< /tabs >}}

### Utilizar Configuration-as-Code

{{< tabs >}}

{{% tab "Sin el Agent (con una clave de API)" %}}

Si tu instancia de Jenkins utiliza el complemento de Jenkins [`configuration-as-code`][1]:

1. Crea o modifica el archivo YAML de configuración mediante la adición de una entrada para `datadogGlobalConfiguration`:

    {{% site-region region="us" %}}
    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Selecciona el modo `Agentless` (con la clave de API).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configura tu sitio de Datadog
            site: 'US1'
        apiKey:
          datadogCredentialsApiKey:
            # Configura el ID de las credenciales de Jenkins que almacenan tu clave de API
            credentialsId: 'my-api-key-credentials-id'
    # Activa el indicador de CI Visibility
    enableCiVisibility: true
    # (Opcional) Configura el nombre de tu instancia de CI
    ciInstanceName: 'jenkins'
    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    datadogAppHostname: 'app.datadoghq.com'
    # (Opcional) Activa la recopilación de logs
    collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="eu" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Selecciona el modo `Agentless` (con la clave de API).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configura tu sitio de Datadog
            site: 'EU1'
        apiKey:
          datadogCredentialsApiKey:
            # Configura el ID de las credenciales de Jenkins que almacenan tu clave de API
            credentialsId: 'my-api-key-credentials-id'
    # Activa el indicador de CI Visibility
    enableCiVisibility: true
    # (Opcional) Configura el nombre de tu instancia de CI
    ciInstanceName: 'jenkins'
    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    datadogAppHostname: 'app.datadoghq.eu'
    # (Opcional) Activa la recopilación de logs
    collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="gov" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Selecciona el modo `Agentless` (con la clave de API).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configura tu sitio de Datadog
            site: 'US1_FED'
        apiKey:
          datadogCredentialsApiKey:
            # Configura el ID de las credenciales de Jenkins que almacenan tu clave de API
            credentialsId: 'my-api-key-credentials-id'
    # Activa el indicador de CI Visibility
    enableCiVisibility: true
    # (Opcional) Configura el nombre de tu instancia de CI
    ciInstanceName: 'jenkins'
    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    datadogAppHostname: 'app.ddog-gov.com'
    # (Opcional) Activa la recopilación de logs
    collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us3" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Selecciona el modo `Agentless` (con la clave de API).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configura tu sitio de Datadog
            site: 'US3'
        apiKey:
          datadogCredentialsApiKey:
            # Configura el ID de las credenciales de Jenkins que almacenan tu clave de API
            credentialsId: 'my-api-key-credentials-id'
    # Activa el indicador de CI Visibility
    enableCiVisibility: true
    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    ciInstanceName: 'jenkins'
    # (Opcional) Configura el nombre de host de la aplicación Datadog
    datadogAppHostname: 'app.us3.datadoghq.com'
    # (Opcional) Activa la recopilación de logs
    collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us5" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Selecciona el modo `Agentless` (con la clave de API).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configura tu sitio de Datadog
            site: 'US5'
        apiKey:
          datadogCredentialsApiKey:
            # Configura el ID de las credenciales de Jenkins que almacenan tu clave de API
            credentialsId: 'my-api-key-credentials-id'
    # Activa el indicador de CI Visibility
    enableCiVisibility: true
    # (Opcional) Configura el nombre de tu instancia de CI
    ciInstanceName: 'jenkins'
    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    datadogAppHostname: 'app.us5.datadoghq.com'
    # (Opcional) Activa la recopilación de logs
    collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap1" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Selecciona el modo `Agentless` (con la clave de API).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configura tu sitio de Datadog
            site: 'AP1'
        apiKey:
          datadogCredentialsApiKey:
            # Configura el ID de las credenciales de Jenkins que almacenan tu clave de API
            credentialsId: 'my-api-key-credentials-id'
    # Activa el indicador de CI Visibility
    enableCiVisibility: true
    # (Opcional) Configura el nombre de tu instancia de CI
    ciInstanceName: 'jenkins'
    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    datadogAppHostname: 'app.ap1.datadoghq.com'
    # (Opcional) Activa la recopilación de logs
    collectBuildLogs: true
    {{< /code-block >}}
    {{% /site-region %}}

2. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Configuration as Code** (Gestionar Jenkins > Configuración como código).
3. Aplica o vuelve a cargar la configuración.
4. Comprueba la configuración mediante el botón `View Configuration` (Ver configuración).

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}
{{% tab "Envío de datos a través del Datadog Agent (recomendado)" %}}

Si tu instancia de Jenkins utiliza el complemento de Jenkins [`configuration-as-code`][1]:

1. Crea o modifica el archivo YAML de configuración mediante la adición de una entrada para `datadogGlobalConfiguration`:

   {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Selecciona el modo `Datadog Agent`
      datadogAgentConfiguration:
        # Configura el host del Datadog Agent
        agentHost: '<your-agent-host>'
        # Configura el puerto del Datadog Agent
        agentPort: 8125
        # (Opcional) Configura el puerto de recopilación de logs como está configurado en el Datadog Agent
        agentLogCollectionPort: 10518
        # Configura el puerto de recopilación de trazas
        agentTraceCollectionPort: 8126
    # Activa el indicador de CI Visibility
    enableCiVisibility: true
    # (Opcional) Configura el nombre de tu instancia de CI
    ciInstanceName: 'jenkins'
    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    datadogAppHostname: 'app.datadoghq.com'
    # (Opcional) Activa la recopilación de logs
    collectBuildLogs: true
   {{< /code-block >}}

2. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Configuration as Code** (Gestionar Jenkins > Configuración como código).
3. Aplica o vuelve a cargar la configuración.
4. Comprueba la configuración mediante el botón `View Configuration` (Ver configuración).

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

{{% /tab %}}
{{< /tabs >}}

### Configurar con Groovy

{{< tabs >}}
{{% tab "Sin el Agent (con una clave de API)" %}}

1. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Script Console** (Gestionar Jenkins > Consola de scripts).
2. Ejecuta el script de configuración:

    {{% site-region region="us" %}}
    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.US1) // Elige tu sitio de Datadog
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // o `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.datadoghq.com' // el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Opcional) Activa la recopilación de logs

datadog.ciInstanceName = 'jenkins' // (Opcional) Configura el nombre de tu instancia de CI

// Guarda la configuración
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="eu" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.EU1) // Elige tu sitio de Datadog
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // o `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.datadoghq.eu' // el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Opcional) Activa la recopilación de logs

datadog.ciInstanceName = 'jenkins' // (Opcional) Configura el nombre de tu instancia de CI

// Guarda la configuración
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="gov" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.US1_FED) // Elige tu sitio de Datadog
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // o `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.ddog-gov.com' // el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Opcional) Activa la recopilación de logs

datadog.ciInstanceName = 'jenkins' // (Opcional) Configura el nombre de tu instancia de CI

// Guarda la configuración
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us3" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.US3) // Elige tu sitio de Datadog
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // o `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.us3.datadoghq.com' // el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Opcional) Activa la recopilación de logs

datadog.ciInstanceName = 'jenkins' // (Opcional) Configura el nombre de tu instancia de CI

// Guarda la configuración
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us5" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.US5) // Elige tu sitio de Datadog
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // o `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.us5.datadoghq.com' // el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Opcional) Activa la recopilación de logs

datadog.ciInstanceName = 'jenkins' // (Opcional) Configura el nombre de tu instancia de CI

// Guarda la configuración
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap1" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.AP1) // Elige tu sitio de Datadog
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // o `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.ap1.datadoghq.com' // el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Opcional) Activa la recopilación de logs

datadog.ciInstanceName = 'jenkins' // (Opcional) Configura el nombre de tu instancia de CI

// Guarda la configuración
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}

{{% /tab %}}
{{% tab "Envío de datos a través del Datadog Agent (recomendado)" %}}

1. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Script Console** (Gestionar Jenkins > Consola de scripts).
2. Ejecuta el script de configuración:

   {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogAgentConfiguration

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def agentHost = 'localhost' // Configura el host del Datadog Agent
def agentPort = 8125
def agentLogCollectionPort = 10518 // (Opcional) Configura el puerto de recopilación de logs como está configurado en el Datadog Agent
def agentTraceCollectionPort = 8126 // Configura el puerto de recopilación de trazas
datadog.datadogClientConfiguration = new DatadogAgentConfiguration(agentHost, agentPort, agentLogCollectionPort, agentTraceCollectionPort)

datadog.datadogAppHostname = 'app.datadoghq.com' // el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Opcional) Activa la recopilación de logs

datadog.ciInstanceName = 'jenkins' // (Opcional) Configura el nombre de tu instancia de CI

// Guarda la configuración
datadog.save()
    {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Utilizar variables de entorno

{{< tabs >}}
{{% tab "Agentmenos (usando una clave API)" %}}

1. Establece las siguientes variables de entorno en la máquina de tu instancia de Jenkins:

    {{% site-region region="us" %}}
    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Selecciona el modo Datadog Agent
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configura tu sitio de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=US1

    # Configura tu clave de API
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Activa CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Opcional) Configura el nombre de tu instancia de CI
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Opcional) Activa la recopilación de logs
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.datadoghq.com
    {{< /code-block >}}

    {{% /site-region %}}

    {{% site-region region="eu" %}}
    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Selecciona el modo Datadog Agent
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configura tu sitio de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=EU1

    # Configura tu clave de API
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Activa CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Opcional) Configura el nombre de tu instancia de CI
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Opcional) Activa la recopilación de logs
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.datadoghq.eu
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="gov" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Selecciona el modo Datadog Agent
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configura tu sitio de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=US1_FED

    # Configura tu clave de API
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Activa CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Opcional) Configura el nombre de tu instancia de CI
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Opcional) Activa la recopilación de logs
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.ddog-gov.com
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us3" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Selecciona el modo Datadog Agent
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configura tu sitio de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=US3

    # Configura tu clave de API
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Activa CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Opcional) Configura el nombre de tu instancia de CI
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Opcional) Activa la recopilación de logs
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.us3.datadoghq.com
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us5" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Selecciona el modo Datadog Agent
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configura tu sitio de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=US5

    # Configura tu clave de API
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Activa CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Opcional) Configura el nombre de tu instancia de CI
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Opcional) Activa la recopilación de logs
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.us5.datadoghq.com
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap1" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Selecciona el modo Datadog Agent
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configura tu sitio de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=AP1

    # Configura tu clave de API
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Activa CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Opcional) Configura el nombre de tu instancia de CI
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Opcional) Activa la recopilación de logs
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Opcional) Configura el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.ap1.datadoghq.com
    {{< /code-block >}}
    {{% /site-region %}}

2. Reinicia tu instancia de Jenkins.
{{% /tab %}}
{{% tab "Envío de datos a través del Datadog Agent (recomendado)" %}}

1. Establece las siguientes variables de entorno en la máquina de tu instancia de Jenkins:

    ```bash
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=DSD

    # Configure the Agent host
    DATADOG_JENKINS_PLUGIN_TARGET_HOST=your-agent-host

    # Configure the Traces Collection port (default 8126)
    DATADOG_JENKINS_PLUGIN_TARGET_TRACE_COLLECTION_PORT=8126

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Optional) Configure Log Collection port as configured in your Datadog Agent
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT=10518

    # (Optional) Enable logs collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Optional) Configure the name of the host that you use to access Datadog UI
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.datadoghq.com
    ```

2. Reinicia tu instancia de Jenkins.

{{% /tab %}}
{{< /tabs >}}

## Recopilar logs de trabajos

La recopilación de logs de trabajos puede activarse de manera opcional cuando se configura el complemento de Jenkins (ver sección anterior).
Se admiten las opciones sin el Agent y con el Agent.

Los logs se facturan por separado de CI Visibility.

La retención, la exclusión y los índices de logs se configuran en [Log Management][27] (Gestión de logs). Los logs para los trabajos de Jenkins se pueden identificar por la etiqueta `source:jenkins`.

## Correlacionar las métricas de infraestructura

Si utilizas workers de Jenkins, puedes correlacionar los pipelines con la infraestructura que los ejecuta. Para que esta característica funcione, haz lo siguiente:

1. Instala el [Datadog Agent][1] en todos los workers de Jenkins.
2. Establece y exporta una nueva variable de entorno llamada `DD_CI_HOSTNAME` en cada worker de Jenkins con el nombre de host del worker.
  * Debe ser el mismo nombre de host que envía datos al Datadog Agent en las métricas de infraestructura para ese worker.
  * Puedes utilizar valores fijos u otras variables de entorno como valores válidos.

```bash
export DD_CI_HOSTNAME=my-hostname
```

Si utilizas Kubernetes para gestionar tus instancias de Jenkins, añade la variable de entorno `DD_CI_HOSTNAME` al [pod que ejecuta el trabajo de Jenkins][9]. El valor de esta variable de entorno depende de lo que utilices en el daemonset de tu Datadog Agent al enviar los datos de las métricas de infraestructura.

Esto solo es necesario para los workers de Jenkins. Para el controlador de Jenkins, la correlación de métricas de infraestructura no requiere acciones adicionales.

**Nota**: La correlación de métricas de infraestructura es compatible con la versión 5.0.0 del complemento de Jenkins o una posterior.

## Activar Test Optimization

Se trata de un paso de opcional que permite recopilar los datos de los tests mediante [Test Optimization][16].

Consulta la [documentación de Test Optimization][17] de tu lenguaje para asegurarte de que el marco de tests que utilizas es compatible.

Hay diferentes maneras de activar Test Optimization dentro de un trabajo o pipeline de Jenkins:
1. con la interfaz de usuario de configuración de Jenkins;
2. con la adición del paso `datadog` dentro del script del pipeline;
3. con la configuración manual del rastreador.

En el caso de los pipelines que activan un contenedor de Docker para ejecutar tests, solo puedes configurar el rastreador manualmente.

### Activar con la interfaz de usuario de configuración de Jenkins

La configuración de Test Optimization basada en la interfaz de usuario está disponible en la versión 5.6.0 del complemento de Jenkins para Datadog o una posterior.

Esta opción no es adecuada para los pipelines que se configuran por completo en `Jenkinsfile` (por ejemplo, pipelines de Multibranch o de Organization Folder).
Para estos pipelines, utiliza la configuración declarativa con el paso `datadog` (descrito en la siguiente sección).

Para activar Test Optimization a través de la interfaz de usuario, haz lo siguiente:
1. En la interfaz web de tu instancia de Jenkins, ve al trabajo o pipeline que deseas instrumentar y elige la opción **Configure** (Configurar).
2. En la sección de configuración **General**, marca la casilla **Enable Datadog Test Optimization** (Activar Datadog Test Optimization).
3. Ingresa el nombre del servicio o la librería que se está sometiendo a un test en la entrada **Service Name** (Nombre de servicio). Puedes elegir cualquier valor que tenga sentido para ti.
4. Elige los lenguajes para los que deseas activar la instrumentación de los tests. Algunos de los lenguajes no admiten la configuración a través de la interfaz de usuario. Para configurar Test Optimization con estos lenguajes, sigue las [instrucciones de configuración][18] manuales.
5. De manera opcional, indica los [parámetros de configuración adicionales][18].
6. Haz clic en **Save** (Guardar).

{{< img src="ci/ci-jenkins-plugin-tests-config-2.png" alt="Configuración de Datadog Test Optimization para Jenkins" style="width:100%;">}}

### Activar con el paso de pipeline `datadog`

Esta opción de configuración está disponible en la versión 5.6.2 del complemento de Jenkins para Datadog o una posterior.

En los pipelines declarativos, añade el paso a un bloque de nivel superior de `options` del siguiente modo:

```groovy
pipeline {
    agent any
    options {
        datadog(testOptimization: [
            enabled: true,
            serviceName: "my-service", // el nombre del servicio o la librería que se está sometiendo a un test
            languages: ["JAVA"], // lenguajes que deben instrumentarse (las opciones disponibles son "Java", "JavaScript", "Python", "DOTNET", "Ruby")
            additionalVariables: ["my-var": "value"]  // parámetros de configuración adicionales del rastreador (opcional)
        ])
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello world."
            }
        }
    }
}
```

En un pipeline con script, envuelve la sección correspondiente con el paso `datadog` de la siguiente manera:

```groovy
datadog(testOptimization: [ enabled: true, serviceName: "my-service", languages: ["JAVASCRIPT"], additionalVariables: [:] ]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

Los demás parámetros de `datadog`, como `collectLogs` o `tags`, pueden añadirse junto al bloque `testOptimization`.

### Activar con la configuración manual del rastreador

Sigue las [instrucciones de configuración][17] manuales de Test Optimization específicas de tu lenguaje.

## Propagar la información de Git

Algunas características del complemento de Jenkins para Datadog requieren la información de Git asociada a las compilaciones de Jenkins para funcionar correctamente.

La información de Git mínima requerida para una compilación es la URL del repositorio, la rama, el SHA de confirmación y el correo electrónico del autor de la confirmación.
Esta información puede determinarse mediante el complemento de manera automática, propagarse desde SCM, proporcionarse manualmente con variables de entorno u obtenerse combinando estos enfoques.

**Nota:** Si un pipeline extrae varios repositorios, la información de Git de los repositorios que se extraen más tarde en el pipeline tiene mayor prioridad.

### Propagar la información de Git desde SCM

El complemento de Jenkins puede detectar automáticamente la información de Git asociada a una compilación o a un pipeline.
Sin embargo, dependiendo de la versión de Jenkins y de los detalles del pipeline, puede haber casos en los que la detección automática de datos de Git no sea posible.

En tales casos, puedes hacer que la información de Git esté disponible para el complemento mediante la función `.each {k,v -> env.setProperty(k, v)}` después de ejecutar los pasos `checkout` o `git`. Por ejemplo:

{{< tabs >}}
{{% tab "Usando Pipelines Declarativos" %}}
Si estás usando un pipeline declarativo para Configurar tu pipeline, propaga la información de Git usando un bloque `script` como sigue:

Con el paso `checkout`:
{{< code-block lang="groovy" >}}
pipeline {
  stages {
    stage('Checkout') {
        script {
          checkout(...).each {k,v -> env.setProperty(k,v)}
        }
    }
    ...
  }
}
{{< /code-block >}}

Con el paso `git`:
{{< code-block lang="groovy" >}}
pipeline {
  stages {
    stage('Checkout') {
      script {
        git(...).each {k,v -> env.setProperty(k,v)}
      }
    }
    ...
  }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Using Scripted Pipelines" %}}
Si está utilizando una tubería de secuencias de comandos para Configurar su tubería, puede propagar la información git a entorno variables directamente.

Con el paso `checkout`:
{{< code-block lang="groovy" >}}
nodo {
  stage('Checkout') {
    checkout(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
{{< /code-block >}}

Con el paso `git`:
{{< code-block lang="groovy" >}}
node {
  stage('Checkout') {
    git(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### Establecer manualmente la información de Git

En caso de que el complemento no pueda detectar la información de Git de manera automática y propagar los datos de Git a través de SCM no sea una opción,
la información de Git necesaria puede establecerse manualmente.

Para ello, configura las siguientes variables de entorno.

**Nota:** Estas variables son opcionales, pero si se establecen, tienen prioridad sobre la información de Git establecida en otros complementos de Jenkins.

`DD_GIT_REPOSITORY_URL` (opcional)
: la URL del repositorio de tu servicio.<br/>
**Ejemplo**: `https://github.com/my-org/my-repo.git`

`DD_GIT_BRANCH` (opcional)
: el nombre de la rama.<br/>
**Ejemplo**: `main`

`DD_GIT_TAG` (opcional)
: la etiqueta de la confirmación (si existe).<br/>
**Ejemplo**: `0.1.0`

`DD_GIT_COMMIT_SHA` (opcional)
: la confirmación expresada en forma hexadecimal de 40 caracteres de longitud.<br/>
**Ejemplo**: `faaca5c59512cdfba9402c6e67d81b4f5701d43c`

`DD_GIT_COMMIT_MESSAGE` (opcional)
: el mensaje de la confirmación.<br/>
**Ejemplo**: `Initial commit message`

`DD_GIT_COMMIT_AUTHOR_NAME` (opcional)
: el nombre del autor de la confirmación.<br/>
**Ejemplo**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL` (opcional)
: el correo electrónico del autor de la confirmación.<br/>
**Ejemplo**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE` (opcional)
: la fecha en la que el autor envió la confirmación expresada en formato ISO 8601.<br/>
**Ejemplo**: `2021-08-16T15:41:45.000Z`

`DD_GIT_COMMIT_COMMITTER_NAME` (opcional)
: el nombre de la autora de la confirmación.<br/>
**Ejemplo**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL` (opcional)
: el correo electrónico de la autora de la confirmación.<br/>
**Ejemplo**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE` (opcional)
: la fecha en la que la autora envió la confirmación expresada en formato ISO 8601.<br/>
**Ejemplo**: `2021-08-16T15:41:45.000Z`

Si solo estableces el repositorio, la rama y la confirmación, el complemento intentará extraer el resto de la información de Git de la carpeta `.git`.

Un ejemplo de uso:

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        script {
          def gitVars = git url:'https://github.com/my-org/my-repo.git', branch:'some/feature-branch'

          // Establece manualmente la información de Git a través de las variables de entorno.
          env.DD_GIT_REPOSITORY_URL=gitVars.GIT_URL
          env.DD_GIT_BRANCH=gitVars.GIT_BRANCH
          env.DD_GIT_COMMIT_SHA=gitVars.GIT_COMMIT
        }
      }
    }
    stage('Test') {
      steps {
        // Ejecuta el resto del pipeline.
      }
    }
  }
}
{{< /code-block >}}

## Incluir o excluir pipelines

Puedes configurar el complemento de Jenkins para incluir o excluir pipelines específicos:

1. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Configure System** (Gestionar Jenkins > Configurar sistema).
2. Desplázate por la pantalla de configuración hasta la sección `Datadog Plugin` (Complemento de Datadog).
3. Haz clic en el botón `Advanced` (Avanzada).
4. Configura los `Excluded Jobs` (Trabajos excluidos).
5. Configura los `Included Jobs` (Trabajos incluidos).
6. Guarda tu configuración.

**Trabajos excluidos**
: una lista separada por comas de los trabajos de Jenkins que no se deben monitorizar. La exclusión se aplica a todas métricas, trazas, eventos y checks de servicio. Los trabajos excluidos pueden contener expresiones regulares para hacer referencia a varios trabajos.<br/>
**Variable de entorno**: `DATADOG_JENKINS_PLUGIN_EXCLUDED`<br/>
**Ejemplo**: `susans-job,johns-.*,prod_folder/prod_release`

**Trabajos incluidos**
: una lista separada por comas de los nombres de los trabajos de Jenkins que se deben monitorizar. Si la lista de trabajos incluidos está vacía, se monitorizarán todos los trabajos que no se excluyan explícitamente. La inclusión se aplica a todas las métricas, trazas, eventos y checks de servicio. Los trabajos incluidos pueden contener expresiones regulares para hacer referencia a varios trabajos.<br/>
**Variable de entorno**: `DATADOG_JENKINS_PLUGIN_INCLUDED`<br/>
**Ejemplo**: `susans-job,johns-.*,prod_folder/prod_release`

Las listas de trabajos incluidos y excluidos pueden contener expresiones regulares, pero no patrones glob. Para incluir un trabajo con un prefijo específico, utiliza `prefix-.*`, no `prefix-*`.

## Configuración avanzada

### Establecer el nombre de la rama predeterminada

Para enviar los datos de los resultados del pipeline, adjunta el nombre de la rama predeterminada (por ejemplo, `main`) a los tramos del pipeline en un atributo llamado `git.default_branch`. Esto se hace de forma automática, pero en algunos casos el complemento no puede extraer esta información porque podría no provenir de Jenkins.

Si esto ocurre, establece la rama predeterminada de forma manual mediante la variable de entorno `DD_GIT_DEFAULT_BRANCH` en tu compilación. Por ejemplo:

{{< code-block lang="groovy" >}}
pipeline {
    agent any
    environment {
        DD_GIT_DEFAULT_BRANCH = 'main'
        ...
    }
    stages {
        ...
    }
}
{{< /code-block >}}


### Personalizar las etiquetas para tus pipelines

El complemento de Datadog añade un paso `datadog` que permite añadir etiquetas personalizadas a los trabajos basados en pipelines.

En los pipelines declarativos, añade el paso a un bloque de opciones de nivel superior:

{{< code-block lang="groovy" >}}
def DD_TYPE = "release"
pipeline {
    agent any
    options {
        datadog(tags: ["team:backend", "type:${DD_TYPE}", "${DD_TYPE}:canary"])
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello world."
            }
        }
    }
}
{{< /code-block >}}

En los pipelines con script, envuelve la sección correspondiente con el paso `datadog`:

{{< code-block lang="groovy" >}}
datadog(tags: ["team:backend", "release:canary"]){
    node {
        stage('Example') {
            echo "Hello world."
        }
    }
}
{{< /code-block >}}

#### Integrar con los equipos de Datadg
Para mostrar y filtrar los equipos asociados a tus pipelines, añade `team:<your-team>` como una etiqueta personalizada. El nombre de etiqueta personalizada debe coincidir exactamente con el nombre de tu equipo en [Equipos de Datadog][15].

### Personalizar etiquetas globales

Puedes configurar el complemento de Jenkins para enviar etiquetas personalizadas (como etiquetas globales y etiquetas de trabajo globales) en todas las trazas de los pipelines:

1. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Configure System** (Gestionar Jenkins > Configurar sistema).
2. Desplázate por la pantalla de configuración hasta la sección `Datadog Plugin` (Complemento de Datadog).
3. Haz clic en el botón `Advanced` (Avanzada).
4. Configura las `Global Tags` (Etiquetas globales).
5. Configura las `Global Job Tags` (Etiquetas de trabajo globales).
6. Guarda tu configuración.

**Etiquetas globales**
: una lista separada por comas de etiquetas para aplicar a todas las métricas, trazas, eventos y checks de servicio. Las etiquetas pueden incluir variables de entorno que se definen en la instancia del controlador de Jenkins.<br/>
**Variable de entorno**: `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`<br/>
**Ejemplo**: `key1:value1,key2:${SOME_ENVVAR},${OTHER_ENVVAR}:value3`

**Etiquetas de trabajo globales**
: una lista separada por comas de expresiones regulares que coinciden con un trabajo y una lista de etiquetas para aplicar a ese trabajo. Las etiquetas pueden incluir variables de entorno que se definen en la instancia del controlador de Jenkins. Las etiquetas pueden hacer referencia a grupos coincidentes en la expresión regular mediante el símbolo `$`.<br/>
**Variable de entorno**: `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`<br/>
**Ejemplo**: `(.*?)_job_(.*?)_release, owner:$1, release_env:$2, optional:Tag3`

## Visualizar datos de pipelines en Datadog

Una vez que la integración se ha configurado correctamente, las páginas [**CI Pipeline List**][7] (Lista de pipelines de CI) y [**Executions**][8] (Ejecuciones) se rellenan con datos después de que los pipelines finalizan.

En la página **CI Pipeline List** (Lista de pipelines de CI) solo se muestran datos para la rama predeterminada de cada repositorio. Para obtener más información, consulta [Buscar y gestionar pipelines de CI][28].

## Solucionar problemas

### Generar un flare de diagnóstico

Cuando informes un problema al equipo de asistencia de Datadog, genera un flare de diagnóstico del complemento y facilítalo junto con la descripción del problema.

Para generar el flare, haz lo siguiente:

1. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Troubleshooting > Datadog** (Gestionar Jenkins > Solucionar problemas > Datadog).
2. En el formulario Diagnostic Flare (Flare de diagnóstico), comprueba qué información deseas incluir en el flare. La selección predeterminada es la más adecuada. Cuanta más información facilites, más fácil será diagnosticar tu problema.
3. Haz clic en **Download** (Descargar) para generar y descargar el archivo del flare.

### Activar el nivel de logs DEBUG para el complemento de Datadog

Si tienes algún problema con el complemento de Datadog, puedes configurar los logs del complemento en el nivel `DEBUG`. En este nivel, puedes ver los detalles del stacktrace si se genera una excepción.

1. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > System log** (Gestionar Jenkins > Log del sistema).
2. Haz clic en el botón `Add new log recorder` (Añadir nuevo registrador de logs).
3. Escribe el nombre del registrador de logs. Por ejemplo: **Datadog Plugin Logs** (Logs del complemento de Datadog).
4. Añade los siguientes loggers a la lista:
    - Logger: `org.datadog.jenkins.plugins.datadog.clients` -> Nivel de log `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.traces` -> Nivel de log `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.logs` -> Nivel de log `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.model` -> Nivel de log `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.listeners` -> Nivel de log `ALL`
5. Guarda la configuración.

También puedes querer dividir los loggers en diferentes registradores de logs.

Una vez que los registradores de logs se han configurado correctamente, puedes comprobar los logs en el modo `DEBUG` mediante el acceso al registrador de logs deseado a través de **Manage Jenkins > System log** (Gestionar Jenkins > Log del sistema).

Si activas un pipeline de Jenkins, puedes buscar el mensaje `Send pipeline traces` (Enviar trazas de pipeline) en los **Datadog Plugin Logs** (Logs del complemento de Datadog). Este mensaje indica que el complemento envía datos de **CI Visibility** al **Datadog Agent**.

{{< code-block lang="text" >}}
Send pipeline traces.
...
Send pipeline traces.
...
{{< /code-block >}}

### Los datos de las ejecuciones de pipelines no están disponibles en Datadog

#### Check de conectividad HTTP

Si tu instancia de Jenkins está en un proxy HTTP, ve a **Manage Jenkins** > **Manage Plugins** > **Advanced tab** (Administrar Jenkins > Administrar complementos > Pestaña Avanzado) y asegúrate de que la configuración del proxy es la correcta:
- Si el complemento de Datadog está configurado para enviar datos al Datadog Agent, comprueba que el host del Agent se haya añadido a la sección `No Proxy Hosts` (Hosts sin proxy).
- Si el complemento de Datadog está configurado para enviar datos directamente a Datadog (modo Agentless), comprueba que el host de Datadog se haya añadido a la sección `No Proxy Hosts` (Hosts sin proxy). En la siguiente tabla, se muestran los sitios de Datadog admitidos y sus correspondientes valores de host:

| Sitio de Datadog | Valor del host |
| ------------ | ----------------------- |
| US1          | datadoghq.com           |
| US3          | us3.datadoghq.com       |
| US5          | us5.datadoghq.com       |
| EU1          | datadoghq.eu            |
| AP1          | ap1.datadoghq.com       |

#### El complemento de Datadog no puede escribir cargas útiles en el servidor

Si aparece el siguiente mensaje de error en **Jenkins Log** (Log de Jenkins), asegúrate de que la configuración del complemento es la correcta.

{{< code-block lang="text" >}}
Error writing to server
{{< /code-block >}}

Si utilizas `localhost` como nombre de host, cámbialo por el nombre de host del servidor.

### Los logs de Jenkins no están disponibles en Datadog

Si el complemento de Datadog está configurado para enviar datos al Datadog Agent, haz lo siguiente:
- Asegúrate de que la recopilación personalizada de logs a través de TCP está [activada y configurada][29] en el Agent.
- Ve a la interfaz de usuario de configuración del complemento y haz clic en **Test logs connection** (Probar conexión de logs) para verificar la conectividad de los logs.

### La sección Datadog Plugin (Complemento de Datadog) no aparece en la configuración de Jenkins

Si la sección Datadog Plugin (Complemento de Datadog) no aparece en la sección de configuración de Jenkins, asegúrate de que el complemento está activado. Para ello, haz lo siguiente:

1. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Manage Plugins** (Gestionar Jenkins > Gestionar complementos).
2. Busca `Datadog Plugin` (Complemento de Datadog) en la pestaña **Installed** (Instalados).
3. Comprueba que la casilla `Enabled` (Activado) esté marcada.
4. Si activas el complemento aquí, reinicia tu instancia de Jenkins mediante la ruta de la URL `/safeRestart`.

### La opción CI Visibility no aparece en la sección Datadog Plugin (Complemento de Datadog).

Si la opción CI Visibility no aparece en la sección Datadog Plugin (Complemento de Datadog), asegúrate de que está instalada la versión correcta y reinicia la instancia de Jenkins. Para ello, haz lo siguiente:

1. En la interfaz web de tu instancia de Jenkins, ve a **Manage Jenkins > Manage Plugins** (Gestionar Jenkins > Gestionar complementos).
2. Busca `Datadog Plugin` (Complemento de Datadog) en la pestaña **Installed** (Instalados).
3. Comprueba que la versión instalada es la correcta.
4. Reinicia tu instancia de Jenkins mediante la ruta de la URL `/safeRestart`.

### Las métricas de infraestructura no se correlacionan con los pipelines de Jenkins

Asegúrate de haber seguido los pasos para [correlacionar las métricas de infraestructura con los pipelines de Jenkins][11].

Si, incluso después de seguir los pasos, las métricas de infraestructura siguen sin correlacionarse con los pipelines de Jenkins,
intenta reiniciar la instancia de Jenkins.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: /es/agent/cluster_agent/admission_controller/
[3]: https://plugins.jenkins.io/datadog/
[4]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: https://plugins.jenkins.io/kubernetes/#plugin-content-pod-template
[10]: /es/continuous_integration/pipelines/jenkins/?tab=linux#enable-job-log-collection
[11]: /es/continuous_integration/pipelines/jenkins/?tab=agentlessusinganapikey#correlate-infrastructure-metrics
[12]: /es/continuous_integration/pipelines/custom_tags_and_measures/
[14]: /es/agent/
[15]: /es/account_management/teams/
[16]: /es/continuous_integration/tests/
[17]: /es/continuous_integration/tests/setup/
[18]: /es/tracing/trace_collection/library_config/
[19]: https://www.jenkins.io/
[20]: /es/glossary/#manual-step
[21]: /es/glossary/#queue-time
[22]: /es/glossary/#custom-tag
[23]: /es/glossary/#custom-measure
[24]: /es/glossary/#parameter
[25]: /es/glossary/#pipeline-failure
[26]: /es/glossary/#custom-span
[27]: /es/logs/guide/best-practices-for-log-management/
[28]: /es/continuous_integration/search/#search-for-pipelines
[29]: /es/agent/logs/?tab=tcpudp#custom-log-collection
[30]: /es/developers/dogstatsd/
[31]: /es/containers/docker/apm/#tracing-from-the-host
[32]: /es/glossary/#running-pipeline

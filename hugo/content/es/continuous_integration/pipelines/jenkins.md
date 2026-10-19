---
aliases:
- /es/continuous_integration/setup_pipelines/jenkins
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Explore los resultados de la ejecución del pipeline y su rendimiento
- link: /continuous_integration/pipelines/custom_commands/
  tag: Documentación
  text: Extienda Pipeline Visibility mediante el rastreo de comandos individuales
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solución de problemas de CI Visibility
title: Configuración de Jenkins para CI Visibility
---
## Descripción general {#overview}

[Jenkins][19] es un servidor de automatización con funciones de integración y entrega continuas. Con su arquitectura de plugins, Jenkins puede personalizarse para adaptarse a cualquier necesidad de CI/CD y automatiza todos los aspectos del desarrollo, las pruebas y la implementación de proyectos.

Configure CI Visibility para Jenkins a fin de recopilar datos a través de varias etapas de las ejecuciones de sus pipelines, identificar cuellos de botella en el rendimiento, resolver desafíos operativos y perfeccionar sus procesos de implementación.

### Compatibilidad {#compatibility}

| Pipeline Visibility | Plataforma | Definición                                                                                               |
|---|---|----------------------------------------------------------------------------------------------------------|
| [Pasos manuales][20] | Pasos manuales | Consulte los pipelines activados manualmente.                                                                       |
| [Tiempo de cola][21] | Tiempo de cola | Consulte la cantidad de tiempo que los trabajos de pipeline permanecen en la cola antes de procesarse.                                |
| Correlación de registros | Correlación de registros | Correlacione los spans de pipeline con los registros. Requiere [almacenamiento de registros][10].                                   |
| Correlación de métricas de infraestructura | Correlación de métricas de infraestructura | Correlacione los trabajos con las [métricas de servidor de infraestructura][11] para los trabajadores de Jenkins.                                 |
| [Custom spans][26] | Tramos personalizados | Configure los tramos personalizados para sus pipelines.                                                               |
| Etiquetas personalizadas predefinidas | Etiquetas personalizadas predefinidas | Establezca [etiquetas personalizadas][12] para todos los tramos de pipeline, etapas y trabajos generados.                                  |
| [Etiquetas personalizadas][22] [y medidas en tiempo de ejecución][23] | Etiquetas y medidas personalizadas en tiempo de ejecución | Configure [etiquetas y medidas personalizadas][12] en tiempo de ejecución.                                                     |
| [Parámetros][24] | Parámetros | Establezca parámetros personalizados (como el nombre de la rama predeterminada o información de Git) cuando se active un pipeline. |
| [Motivos de falla del pipeline][25] | Motivos de falla del pipeline | Identifique los motivos de falla del pipeline a partir de los mensajes de error.                                                   |
| [Pipelines en ejecución][32] | Pipelines en ejecución | Consulte las ejecuciones de pipelines que se están ejecutando. Requiere la versión del plugin de Jenkins >= 8.0.0                      |
| [Filtrar trabajos de CI en la ruta crítica][33] | Filtrar trabajos de CI en la ruta crítica | Filtre por trabajos en la ruta crítica. |
| [Tiempo de ejecución][34] | Tiempo de ejecución  | Consulte la cantidad de tiempo que los pipelines han estado ejecutando trabajos. |

Se admiten las siguientes versiones de Jenkins:

- Jenkins >= 2.346.1

Esta integración admite tanto la instalación Agentless como la instalación basada en Agent.
La instalación del Agent es necesaria para la correlación de métricas de infraestructura.

### Terminología {#terminology}

Esta tabla muestra el mapeo de conceptos entre Datadog CI Visibility y Jenkins:

| Datadog  | Jenkins  |
|----------|----------|
| Pipeline | Pipeline |
| Etapa    | Etapa    |
| Trabajo      | Paso     |

## Instale el Datadog Agent {#install-the-datadog-agent}

Omita este paso si no necesita la correlación de métricas de infraestructura.

Instale el Datadog Agent en su nodo controlador de Jenkins y en sus nodos de trabajo siguiendo las [instrucciones de instalación del Agent][14].

Si el controlador de Jenkins y el Datadog Agent se han implementado en un clúster de Kubernetes, Datadog recomienda utilizar el [Admission Controller][2], que establece automáticamente la variable de entorno `DD_AGENT_HOST` en el pod del controlador de Jenkins para comunicarse con el Datadog Agent local.

Si desea enviar los logs de sus trabajos de Jenkins a Datadog, asegúrese de que la recopilación de logs personalizados a través de TCP esté [habilitada y configurada][29] en el Agent.

Si su Agent se ejecuta en un contenedor, añádale la variable de entorno `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` y asegúrese de que los siguientes puertos sean accesibles por el controlador de Jenkins:
- [DogStatsD][30] puerto, predeterminado a `8125/udp`
- [Puerto de trazas de APM][31], predeterminado a `8126/tcp`
- [puerto de recopilación de logs][29], predeterminado a `10518/tcp`

<div class="alert alert-info">El envío de trazas de CI Visibility a través de sockets de dominio UNIX no es compatible.</div>

## Instale el plugin de Jenkins de Datadog {#install-the-datadog-jenkins-plugin}

<div class="alert alert-info">Independientemente de si elige usar el modo Agentless o el modo basado en Agent para reportar sus datos a Datadog, <strong>debe</strong> usar el plugin.</div>

Instale y habilite el [plugin de Datadog para Jenkins][3] v3.1.0 o posterior:

1. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}}.
2. En el [Centro de actualizaciones][4] en la pestaña {{< ui >}}Available{{< /ui >}}, busque {{< ui >}}Datadog Plugin{{< /ui >}}.
3. Seleccione la casilla de verificación junto al plugin e instálelo usando uno de los dos botones de instalación en la parte inferior de la pantalla.
4. Para verificar que el plugin esté instalado, busque {{< ui >}}Datadog Plugin{{< /ui >}} en la pestaña {{< ui >}}Installed{{< /ui >}}.

## Configure el plugin de Datadog para Jenkins {#configure-the-datadog-jenkins-plugin}

Hay varias formas en las que puede configurar el plugin de Datadog para Jenkins.

### Configure con la interfaz de usuario de configuración de Jenkins {#configure-with-the-jenkins-configuration-ui}

#### Reporte a través del Datadog Agent (recomendado) {#report-through-the-datadog-agent-recommended}

1. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}.
2. Vaya a la sección {{< ui >}}Datadog Plugin{{< /ui >}}, desplazándose hacia abajo en la pantalla de configuración.
3. Seleccione el modo {{< ui >}}Use the Datadog Agent to report to Datadog{{< /ui >}}.
4. Configure el servidor {{< ui >}}Agent{{< /ui >}}.
5. Configure CI Visibility:
   1. Configure el {{< ui >}}Traces Collection Port{{< /ui >}} si no utiliza el puerto predeterminado `8126`.
   2. Haga clic en el botón {{< ui >}}Test traces connection{{< /ui >}} para verificar que su configuración sea válida.
   3. Marque la casilla {{< ui >}}Enable CI Visibility{{< /ui >}}.
   4. (Opcional) Configure el nombre de su instancia de CI.
6. (Opcional) Configure la recopilación de logs:
   1. Configure el puerto {{< ui >}}Log Collection{{< /ui >}} tal como se configuró en el Datadog Agent.
   2. Haga clic en el botón {{< ui >}}Test logs connection{{< /ui >}} para verificar que su configuración sea válida.
   3. Habilite la casilla de verificación {{< ui >}}Enable Log Collection{{< /ui >}}.
7. (Opcional) Ingrese el nombre del servidor que utiliza para acceder a la interfaz de usuario de Datadog (por ejemplo, `app.datadoghq.com`) en el campo {{< ui >}}Datadog App hostname{{< /ui >}}.
8. Guarde su configuración.

{{< img src="ci/ci-jenkins-plugin-config-agentful-app-hostname.png" alt="Configuración del plugin de Datadog para Jenkins" style="width:100%;">}}

#### Agentless (usando una clave de API) {#agentless-using-an-api-key}

Utilice esta opción para que el plugin de Jenkins informe directamente a Datadog sin usar el Datadog Agent. Requiere una clave de API.

1. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}.
2. Vaya a la sección {{< ui >}}Datadog Plugin{{< /ui >}}, desplazándose hacia abajo en la pantalla de configuración.
3. Seleccione el modo {{< ui >}}Use Datadog site and API key to report to Datadog{{< /ui >}}.
4. Seleccione su [sitio de Datadog][1] en el menú desplegable {{< ui >}}Pick a site{{< /ui >}}.
5. Ingrese una {{< ui >}}Datadog API Key{{< /ui >}} válida (o use la opción {{< ui >}}Select from credentials{{< /ui >}}).
6. Haga clic en el botón {{< ui >}}Test Key{{< /ui >}} para verificar que su clave de API sea válida.
7. Configure CI Visibility:
   1. Habilite la casilla de verificación {{< ui >}}Enable CI Visibility{{< /ui >}}.
   2. (Opcional) Configure el nombre de su instancia de CI.
8. (Opcional) Configure la recopilación de logs:
   1. Habilite la casilla de verificación {{< ui >}}Enable Log Collection{{< /ui >}}.
9. (Opcional) Ingrese el nombre del servidor que utiliza para acceder a la interfaz de usuario de Datadog (por ejemplo, `app.datadoghq.com`) en el campo {{< ui >}}Datadog App hostname{{< /ui >}}.
10. Guarde su configuración.

{{< img src="ci/ci-jenkins-plugin-config-agentless-app-hostname.png" alt="Configuración del plugin de Datadog para Jenkins" style="width:100%;">}}

[1]: /es/getting_started/site/#access-the-datadog-site

### Utilice Configuration-as-Code {#use-configuration-as-code}

#### Reporte a través del Datadog Agent (recomendado) {#report-through-the-datadog-agent-recommended-1}

Si su instancia de Jenkins utiliza el plugin de Jenkins [`configuration-as-code`][1]:

1. Cree o modifique el YAML de configuración agregando una entrada para `datadogGlobalConfiguration`:

```yaml
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Datadog Agent` mode
      datadogAgentConfiguration:
        # Configure Datadog Agent host
        agentHost: '<your-agent-host>'
        # Configure Datadog Agent port
        agentPort: 8125
        # (Optional) Configure logs collection port as configured in your Datadog Agent
        agentLogCollectionPort: 10518
        # Configure traces collection port
        agentTraceCollectionPort: 8126
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: 'app.datadoghq.com'
    # (Optional) Enable Logs Storage
    collectBuildLogs: true
```

2. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configuration as Code{{< /ui >}}.
3. Aplique o recargue la configuración.
4. Verifique la configuración usando el botón {{< ui >}}View Configuration{{< /ui >}}.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

#### Agentless (usando una clave de API) {#agentless-using-an-api-key-1}

Si su instancia de Jenkins utiliza el plugin de Jenkins [`configuration-as-code`][1]:

1. Cree o modifique el YAML de configuración agregando una entrada para `datadogGlobalConfiguration`:

```yaml
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Agentless` mode (using API key).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configure your Datadog site
            site: '{{< region-param key=jenkins_site_name >}}'
        apiKey:
          datadogCredentialsApiKey:
            # Configure ID of Jenkins credentials that store your API key
            credentialsId: 'my-api-key-credentials-id'
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: '{{< region-param key=dd_full_site >}}'
    # (Optional) Enable Logs Storage
    collectBuildLogs: true
```

2. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configuration as Code{{< /ui >}}.
3. Aplique o recargue la configuración.
4. Verifique la configuración usando el botón {{< ui >}}View Configuration{{< /ui >}}.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

### Configure con Groovy {#configure-with-groovy}

#### Informe a través del Datadog Agent (recomendado) {#report-through-the-datadog-agent-recommended-2}

1. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Script Console{{< /ui >}}.
2. Ejecute el script de configuración:

```groovy
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogAgentConfiguration

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def agentHost = 'localhost' // Configure your Datadog Agent host
def agentPort = 8125
def agentLogCollectionPort = 10518 // (Optional) Configure logs collection port as configured in your Datadog Agent
def agentTraceCollectionPort = 8126 // Configure traces collection port
datadog.datadogClientConfiguration = new DatadogAgentConfiguration(agentHost, agentPort, agentLogCollectionPort, agentTraceCollectionPort)

datadog.datadogAppHostname = 'app.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable Logs Storage

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
```

#### Agentless (usando una clave de API) {#agentless-using-an-api-key-2}

1. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Script Console{{< /ui >}}.
2. Ejecute el script de configuración:

```groovy
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.{{< region-param key=jenkins_site_name >}}) // Pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = '{{< region-param key=dd_full_site >}}' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable Logs Storage

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
```

### Utilice variables de entorno {#use-environment-variables}

#### Informe a través del Datadog Agent (recomendado) {#report-through-the-datadog-agent-recommended-3}

1. Configure las siguientes variables de entorno en la máquina de su instancia de Jenkins:

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

# (Optional) Enable Logs Storage
DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

# (Optional) Configure the name of the host that you use to access Datadog UI
DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.datadoghq.com
```

2. Reinicie su instancia de Jenkins.

#### Agentless (usando una clave de API) {#agentless-using-an-api-key-3}

1. Configure las siguientes variables de entorno en la máquina de su instancia de Jenkins:

```bash
# Select the Datadog Agent mode
DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

# Configure your Datadog site
DATADOG_JENKINS_PLUGIN_DATADOG_SITE={{< region-param key=jenkins_site_name >}}

# Configure your API key
DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

# Enable CI Visibility
DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

# (Optional) Configure your CI Instance name
DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

# (Optional) Enable Logs Storage
DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

# (Optional) Configure the name of the host that you use to access Datadog UI
DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME={{< region-param key=dd_full_site >}}
```

2. Reinicie su instancia de Jenkins.

## Almacenamiento de registros {#logs-storage}

El almacenamiento de registros se puede habilitar opcionalmente al configurar el plugin de Jenkins (consulte `DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS` en la sección anterior).
Se admiten tanto las opciones agentless como las basadas en agente.

El Almacenamiento de registros se factura por separado de CI Visibility.

La retención, exclusión e índices de registros se configuran en [Log Management][27]. Los registros de los trabajos de Jenkins se pueden identificar mediante la etiqueta `source:jenkins`.

## Correlacione métricas de infraestructura {#correlate-infrastructure-metrics}

Si utiliza workers de Jenkins, puede correlacionar pipelines con la infraestructura que los ejecuta. Para que esta función funcione:

1. Instale el [Datadog Agent][1] en cada worker de Jenkins.
2. Configure y exporte una nueva variable de entorno llamada `DD_CI_HOSTNAME` en cada worker de Jenkins con el nombre de host del worker.
  * Debe ser el mismo nombre de host que el Datadog Agent está reportando en las métricas de infraestructura para ese worker.
  * Puede utilizar valores fijos u otras variables de entorno como valores válidos.

```bash
export DD_CI_HOSTNAME=my-hostname
```

Si utiliza Kubernetes para gestionar sus instancias de Jenkins, añada la variable de entorno `DD_CI_HOSTNAME` al [pod que ejecuta el trabajo de Jenkins][9]. El valor de esta variable de entorno depende de lo que esté utilizando en su daemonset de Datadog Agent al reportar las métricas de infraestructura.

Esto solo es necesario para los workers de Jenkins. Para el controlador de Jenkins, la correlación de métricas de infraestructura no requiere acciones adicionales.

**Nota**: La correlación de métricas de infraestructura es compatible desde el plugin de Jenkins v5.0.0 o posterior.

## Habilite Test Optimization {#enable-test-optimization}

Este es un paso opcional que habilita la recopilación de datos de pruebas utilizando [Test Optimization][16].

Consulte la [documentación de Test Optimization][17] para su lenguaje para asegurarse de que el framework de pruebas que utiliza sea compatible.

Existen diferentes formas de habilitar Test Optimization dentro de un trabajo o pipeline de Jenkins:
1. Usando la interfaz de usuario de configuración de Jenkins.
2. Añadiendo el paso `datadog` dentro del script del pipeline.
3. Configurando el SDK manualmente.

Para los pipelines que inician un contenedor Docker para ejecutar pruebas, solo puede configurar el SDK manualmente.

### Habilitar con la interfaz de usuario de configuración de Jenkins {#enable-with-the-jenkins-configuration-ui}

La configuración de Test Optimization basada en la interfaz de usuario está disponible en el plugin de Datadog para Jenkins v5.6.0 o posterior.

Esta opción no es adecuada para pipelines que están configurados completamente en `Jenkinsfile` (por ejemplo, pipelines Multibranch o pipelines de Organization Folder).
Para estos pipelines, utilice la configuración declarativa con el paso `datadog` (descrito en la siguiente sección).

Para habilitar Test Optimization a través de la interfaz de usuario, haga lo siguiente:
1. En la interfaz web de su instancia de Jenkins, vaya al trabajo o pipeline que desea instrumentar y elija la opción {{< ui >}}Configure{{< /ui >}}.
2. En la sección de configuración {{< ui >}}General{{< /ui >}}, marque la casilla {{< ui >}}Enable Datadog Test Optimization{{< /ui >}}.
3. Ingrese el nombre del servicio o la biblioteca que se está probando en el campo {{< ui >}}Service Name{{< /ui >}}. Puede elegir cualquier valor que tenga sentido para usted.
4. Elija los lenguajes para los cuales desea habilitar la instrumentación de pruebas. Algunos de los lenguajes no admiten la configuración a través de la interfaz de usuario. Para configurar Test Optimization para estos lenguajes, siga las [instrucciones de configuración][18] manuales.
5. Opcionalmente, proporcione [ajustes de configuración adicionales][18].
6. Haga clic en {{< ui >}}Save{{< /ui >}}.

{{< img src="ci/ci-jenkins-plugin-tests-config-2.png" alt="Configuración de Datadog Test Optimization para Jenkins" style="width:100%;">}}

### Habilite con el paso de pipeline `datadog` {#enable-with-the-datadog-pipeline-step}

Esta opción de configuración está disponible en el Datadog Jenkins plugin v5.6.2 o posterior.

En Pipelines declarativos, agregue el paso a un bloque `options` de nivel superior de la siguiente manera:

```groovy
pipeline {
    agent any
    options {
        datadog(testOptimization: [
            enabled: true,
            serviceName: "my-service", // the name of service or library being tested
            languages: ["JAVA"], // languages that should be instrumented (available options are "JAVA", "JAVASCRIPT", "PYTHON", "DOTNET", "RUBY")
            additionalVariables: ["my-var": "value"]  // additional tracer configuration settings (optional)
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

En una canalización con script, envuelva la sección relevante con el paso `datadog` de la siguiente manera:

```groovy
datadog(testOptimization: [ enabled: true, serviceName: "my-service", languages: ["JAVASCRIPT"], additionalVariables: [:] ]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

Los otros ajustes de `datadog`, como `collectLogs` o `tags`, se pueden agregar junto al bloque `testOptimization`.

### Habilite con la configuración manual del trazador {#enable-with-manual-tracer-configuration}

Siga las [instrucciones de Test Optimization][17] específicas para su lenguaje.

## Propague información de Git {#propagate-git-information}

Algunas funciones del Datadog Jenkins plugin necesitan información de Git asociada con las builds de Jenkins para funcionar correctamente.

La información mínima requerida de Git para una build es la URL del repositorio, la rama, el commit SHA y el correo electrónico del autor del commit.
Esta información puede ser determinada automáticamente por el plugin, propagada desde SCM, proporcionada manualmente con variables de entorno u obtenida combinando estos enfoques.

**Nota:** Si una pipeline extrae varios repositorios, la información de Git de los repositorios que se extraen más adelante en la pipeline tiene mayor prioridad.

### Propague información de Git desde SCM {#propagate-git-information-from-scm}

El plugin de Jenkins es capaz de detectar automáticamente la información de Git asociada a una build o una pipeline.
Sin embargo, dependiendo de la versión de Jenkins y los detalles de la pipeline, puede haber casos en los que la detección automática de datos de Git no sea posible.

En este caso, puede hacer que la información de Git esté disponible para el plugin utilizando la función `.each {k,v -> env.setProperty(k, v)}` después de ejecutar los pasos `checkout` o `git`. Por ejemplo:

#### Uso de Pipelines declarativos {#using-declarative-pipelines}

Si está utilizando un pipeline declarativo para configurar su pipeline, propague la información de Git utilizando un bloque `script` de la siguiente manera:

Uso del paso `checkout`:

```groovy
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
```

Uso del paso `git`:

```groovy
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
```

#### Uso de Pipelines con script {#using-scripted-pipelines}

Si está utilizando un Pipeline con script para configurar su Pipeline, puede propagar la información de Git directamente a las variables de entorno.

Uso del paso `checkout`:

```groovy
node {
  stage('Checkout') {
    checkout(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
```

Uso del paso `git`:

```groovy
node {
  stage('Checkout') {
    git(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
```


### Establezca información de Git manualmente {#set-git-information-manually}

En caso de que el plugin no pueda detectar la información de Git automáticamente y propagar los datos de Git a través de SCM no sea una opción,
la información de Git necesaria se puede establecer manualmente.

Para hacerlo, establezca las siguientes variables de entorno.

**Nota:** Estas variables son opcionales, pero si se establecen, tienen prioridad sobre la información de Git establecida por otros plugins de Jenkins.

`DD_GIT_REPOSITORY_URL` (Opcional)
: La URL del repositorio de su servicio.<br/>
**Ejemplo**: `https://github.com/my-org/my-repo.git`

`DD_GIT_BRANCH` (opcional)
: El nombre de la rama.<br/>
**Ejemplo**: `main`

`DD_GIT_TAG` (opcional)
: La etiqueta de la confirmación (si existe).<br/>
**Ejemplo**: `0.1.0`

`DD_GIT_COMMIT_SHA` (opcional)
: La confirmación expresada en formato hexadecimal de 40 caracteres de longitud.<br/>
**Ejemplo**: `faaca5c59512cdfba9402c6e67d81b4f5701d43c`

`DD_GIT_COMMIT_MESSAGE` (opcional)
: El mensaje de la confirmación.<br/>
**Ejemplo**: `Initial commit message`

`DD_GIT_COMMIT_AUTHOR_NAME` (opcional)
: El nombre del autor de la confirmación.<br/>
**Ejemplo**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL` (opcional)
: El correo electrónico del autor de la confirmación.<br/>
**Ejemplo**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE` (opcional)
: La fecha en la que el autor envió la confirmación expresada en formato ISO 8601.<br/>
**Ejemplo**: `2021-08-16T15:41:45.000Z`

`DD_GIT_COMMIT_COMMITTER_NAME` (opcional)
: El nombre de quien realiza la confirmación.<br/>
**Ejemplo**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL` (opcional)
: El correo electrónico del autor de la confirmación.<br/>
**Ejemplo**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE` (opcional)
: La fecha en la que el autor envió la confirmación expresada en formato ISO 8601.<br/>
**Ejemplo**: `2021-08-16T15:41:45.000Z`

Si solo establece el repositorio, la rama y la confirmación, el plugin intentará extraer el resto de la información de Git de la carpeta `.git`.

Un ejemplo de uso:

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        script {
          def gitVars = git url:'https://github.com/my-org/my-repo.git', branch:'some/feature-branch'

          // Setting Git information manually via environment variables.
          env.DD_GIT_REPOSITORY_URL=gitVars.GIT_URL
          env.DD_GIT_BRANCH=gitVars.GIT_BRANCH
          env.DD_GIT_COMMIT_SHA=gitVars.GIT_COMMIT
        }
      }
    }
    stage('Test') {
      steps {
        // Execute the rest of the pipeline.
      }
    }
  }
}
{{< /code-block >}}

## Incluir o excluir pipelines {#include-or-exclude-pipelines}

Puede configurar el plugin de Jenkins para incluir o excluir pipelines específicos:

1. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}.
2. Vaya a la sección {{< ui >}}Datadog Plugin{{< /ui >}} desplazándose hacia abajo en la pantalla de configuración.
3. Haga clic en el botón {{< ui >}}Advanced{{< /ui >}}.
4. Configure el {{< ui >}}Excluded Jobs{{< /ui >}}.
5. Configure el {{< ui >}}Included Jobs{{< /ui >}}.
6. Guarde su configuración.

{{< ui >}}Excluded jobs{{< /ui >}}
: Una lista separada por comas de trabajos de Jenkins que no deben ser monitoreados. La exclusión se aplica a todas las métricas, trazas, eventos y comprobaciones de servicio. Los trabajos excluidos pueden usar expresiones regulares para hacer referencia a múltiples trabajos.<br/>
**Variable de entorno**: `DATADOG_JENKINS_PLUGIN_EXCLUDED`<br/>
**Ejemplo**: `susans-job,johns-.*,prod_folder/prod_release`

{{< ui >}}Included jobs{{< /ui >}}
: Una lista separada por comas de nombres de trabajos de Jenkins que deben ser monitoreados. Si la lista de trabajos incluidos está vacía, se monitorean todos los trabajos que no están excluidos explícitamente. La inclusión se aplica a todas las métricas, trazas, eventos y comprobaciones de servicio. Los trabajos incluidos pueden usar expresiones regulares para hacer referencia a múltiples trabajos.<br/>
**Variable de entorno**: `DATADOG_JENKINS_PLUGIN_INCLUDED`<br/>
**Ejemplo**: `susans-job,johns-.*,prod_folder/prod_release`

Las listas de trabajos incluidos y excluidos pueden contener expresiones regulares, pero no patrones glob. Para incluir un trabajo con un prefijo específico, use `prefix-.*`—no `prefix-*`.

## Configuración avanzada {#advanced-configuration}

### Establezca el nombre de la rama predeterminada {#set-the-default-branch-name}

Para reportar los resultados de la canalización, adjunte el nombre de la rama predeterminada (por ejemplo, `main`) a los spans de la canalización en un atributo llamado `git.default_branch`. Esto generalmente se hace de forma automática, pero en algunos casos el complemento no puede extraer esta información porque es posible que Jenkins no la proporcione.

Si esto sucede, establezca la rama predeterminada manualmente usando la variable de entorno `DD_GIT_DEFAULT_BRANCH` en su compilación. Por ejemplo:

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


### Establezca etiquetas personalizadas para sus canalizaciones {#set-custom-tags-for-your-pipelines}

El complemento de Datadog agrega un paso `datadog` que permite agregar etiquetas personalizadas a sus trabajos basados en canalizaciones.

En canalizaciones declarativas, agregue el paso a un bloque de opciones de nivel superior:

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

En canalizaciones con script, envuelva la sección relevante con el paso `datadog`:

{{< code-block lang="groovy" >}}
datadog(tags: ["team:backend", "release:canary"]){
    node {
        stage('Example') {
            echo "Hello world."
        }
    }
}
{{< /code-block >}}

#### Integre con Datadog Teams {#integrate-with-datadog-teams}
Para mostrar y filtrar los equipos asociados con sus canalizaciones, agregue `team:<your-team>` como una etiqueta personalizada. El nombre de la etiqueta personalizada debe coincidir exactamente con el identificador de equipo de [Datadog Teams][15].

### Establezca etiquetas personalizadas globales {#set-global-custom-tags}

Puede configurar el Plugin de Jenkins para enviar etiquetas personalizadas (como etiquetas globales y etiquetas de trabajo globales) en todas las trazas de los pipelines:

1. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Configure System{{< /ui >}}.
2. Vaya a la sección {{< ui >}}Datadog Plugin{{< /ui >}}, desplazándose hacia abajo en la pantalla de configuración.
3. Haga clic en el botón {{< ui >}}Advanced{{< /ui >}}.
4. Configure el {{< ui >}}Global Tags{{< /ui >}}.
5. Configure el {{< ui >}}Global Job Tags{{< /ui >}}.
6. Guarde su configuración.

{{< ui >}}Global tags{{< /ui >}}
: Una lista de etiquetas separadas por comas para aplicar a todas las métricas, trazas, eventos y verificaciones de servicio. Las etiquetas pueden incluir variables de entorno que están definidas en la instancia del controlador de Jenkins.<br/>
**Variable de entorno**: `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`<br/>
**Ejemplo**: `key1:value1,key2:${SOME_ENVVAR},${OTHER_ENVVAR}:value3`

{{< ui >}}Global job tags{{< /ui >}}
: Una lista de expresiones regulares separadas por comas para coincidir con un trabajo y una lista de etiquetas para aplicar a ese trabajo. Las etiquetas pueden incluir variables de entorno que están definidas en la instancia del controlador de Jenkins. Las etiquetas pueden hacer referencia a grupos de coincidencia en la expresión regular usando el símbolo `$`.<br/>
**Variable de entorno**: `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`<br/>
**Ejemplo**: `(.*?)_job_(.*?)_release, owner:$1, release_env:$2, optional:Tag3`

## Visualice datos de Pipelines en Datadog {#visualize-pipeline-data-in-datadog}

Una vez que la integración se configure correctamente, las páginas [**Lista de Pipelines de CI**][7] y [**Ejecuciones**][8] se llenarán de datos después de que los pipelines finalicen.

La página {{< ui >}}CI Pipeline List{{< /ui >}} muestra datos solo para la rama predeterminada de cada repositorio. Para obtener más información, consulte [Buscar y administrar Pipelines de CI][28].

## Solución de problemas {#troubleshooting}

### Generar flare de diagnóstico {#generate-diagnostic-flare}

Al informar un problema al equipo de soporte de Datadog, genere un flare de diagnóstico del plugin y proporciónelo junto con la descripción del problema.

Para generar el flare, haga lo siguiente:

1. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Troubleshooting{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}}.
2. En el formulario de Flare de diagnóstico, marque la información que desea incluir en el flare. La selección predeterminada funciona mejor. Cuanta más información proporcione, más fácil será diagnosticar su problema.
3. Haga clic en {{< ui >}}Download{{< /ui >}} para generar y descargar el archivo del flare.

### Habilitar el nivel de registro DEBUG para el plugin de Datadog {#enable-debug-log-level-for-the-datadog-plugin}

Si tiene algún problema con el plugin de Datadog, puede configurar los registros del plugin en el nivel `DEBUG`. Al usar este nivel, usted puede ver los detalles del stacktrace si se produce una excepción.

1. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}System log{{< /ui >}}.
2. Haga clic en el botón {{< ui >}}Add new log recorder{{< /ui >}}.
3. Escriba el nombre del grabador de registros. P. ej.: **Datadog Plugin Logs**.
4. Agregue los siguientes registros a la lista:
    - Registro: `org.datadog.jenkins.plugins.datadog.clients` -> Nivel de registro `ALL`
    - Registro: `org.datadog.jenkins.plugins.datadog.traces` -> Nivel de registro `ALL`
    - Registro: `org.datadog.jenkins.plugins.datadog.logs` -> Nivel de registro `ALL`
    - Registro: `org.datadog.jenkins.plugins.datadog.model` -> Nivel de registro `ALL`
    - Registro: `org.datadog.jenkins.plugins.datadog.listeners` -> Nivel de registro `ALL`
5. Guarde la configuración.

También puede dividir los registradores en diferentes grabadores de registro.

Una vez que los registros estén configurados correctamente, puede verificar los registros en el modo `DEBUG` accediendo al registro deseado a través de {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}System log{{< /ui >}}.

Si activa una canalización de Jenkins, puede buscar el mensaje `Send pipeline traces` en {{< ui >}}Datadog Plugin Logs{{< /ui >}}. Este mensaje indica que el complemento está enviando datos de CI Visibility al Datadog Agent.

{{< code-block lang="text" >}}
Send pipeline traces.
...
Send pipeline traces.
...
{{< /code-block >}}

### Los datos de ejecuciones de canalización no están disponibles en Datadog {#pipeline-executions-data-is-not-available-in-datadog}

#### Verificación de conectividad HTTP {#http-connectivity-check}

Si su instancia de Jenkins está detrás de un proxy HTTP, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}} > {{< ui >}}Advanced tab{{< /ui >}} y asegúrese de que la configuración del proxy sea correcta:
- Si el complemento de Datadog está configurado para enviar datos a un Datadog Agent, verifique que el servidor del Datadog Agent se haya agregado a la sección {{< ui >}}No Proxy Hosts{{< /ui >}}.
- Si el complemento de Datadog está configurado para enviar datos directamente a Datadog (modo agentless), verifique que el servidor de Datadog se haya agregado a la sección {{< ui >}}No Proxy Hosts{{< /ui >}}. La siguiente tabla muestra los sitios de Datadog admitidos y sus valores de host correspondientes:

| Sitio de Datadog | Valor de servidor |
| ------------ | ----------------------- |
| US1          | datadoghq.com           |
| US3          | us3.datadoghq.com       |
| US5          | us5.datadoghq.com       |
| EU1          | datadoghq.eu            |
| AP1          | ap1.datadoghq.com       |
| UK1          | uk1.datadoghq.com       |

#### El complemento de Datadog no puede escribir cargas útiles en el servidor {#the-datadog-plugin-cannot-write-payloads-to-the-server}

Si aparece el siguiente mensaje de error en {{< ui >}}Jenkins Log{{< /ui >}}, asegúrese de que la configuración del complemento sea correcta.

{{< code-block lang="text" >}}
Error writing to server
{{< /code-block >}}

Si está utilizando `localhost` como nombre de host, cámbielo por el nombre de host del servidor.

### Los registros de Jenkins no están disponibles en Datadog {#jenkins-logs-are-not-available-in-datadog}

Si el complemento de Datadog está configurado para enviar datos a un Datadog Agent, haga lo siguiente:
- Asegúrese de que la recopilación de registros personalizados a través de TCP esté [habilitada y configurada][29] en el Agent.
- Vaya a la interfaz de usuario de configuración del complemento y haga clic en {{< ui >}}Test logs connection{{< /ui >}} para verificar la conectividad de los registros.

### La sección del complemento de Datadog no aparece en la configuración de Jenkins {#the-datadog-plugin-section-does-not-appear-in-the-jenkins-configuration}

Si la sección del complemento de Datadog no aparece en la sección de configuración de Jenkins, asegúrese de que el complemento esté habilitado. Para hacerlo:

1. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}}.
2. Busque {{< ui >}}Datadog Plugin{{< /ui >}} en la pestaña {{< ui >}}Installed{{< /ui >}}.
3. Compruebe que la casilla de verificación {{< ui >}}Enabled{{< /ui >}} esté marcada.
4. Si habilita el complemento aquí, reinicie su instancia de Jenkins usando la ruta de URL `/safeRestart`.

### La opción CI Visibility no aparece en la sección del complemento de Datadog. {#the-ci-visibility-option-does-not-appear-in-the-datadog-plugin-section}

Si la opción CI Visibility no aparece en la sección del complemento de Datadog, asegúrese de que la versión correcta esté instalada y reinicie la instancia de Jenkins. Para hacerlo:

1. En la interfaz web de su instancia de Jenkins, vaya a {{< ui >}}Manage Jenkins{{< /ui >}} > {{< ui >}}Manage Plugins{{< /ui >}}.
2. Busque {{< ui >}}Datadog Plugin{{< /ui >}} en la pestaña {{< ui >}}Installed{{< /ui >}}.
3. Compruebe que la versión instalada sea la correcta.
4. Reinicie su instancia de Jenkins usando la ruta de URL `/safeRestart`.

### Las métricas de infraestructura no se correlacionan con las canalizaciones de Jenkins {#infrastructure-metrics-do-not-get-correlated-with-jenkins-pipelines}

Asegúrese de haber seguido los pasos para [correlacionar las métricas de infraestructura con las canalizaciones de Jenkins][11].

Si, incluso después de seguir los pasos, las métricas de infraestructura aún no están correlacionadas con las canalizaciones de Jenkins,
Intente reiniciar la instancia de Jenkins.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: /es/agent/cluster_agent/admission_controller/
[3]: https://plugins.jenkins.io/datadog/
[4]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: https://plugins.jenkins.io/kubernetes/#plugin-content-pod-template
[10]: /es/continuous_integration/pipelines/jenkins/?tab=linux#logs-storage
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
[30]: /es/extend/dogstatsd/
[31]: /es/containers/docker/apm/#tracing-from-the-host
[32]: /es/glossary/#running-pipeline
[33]: /es/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[34]: /es/glossary/#pipeline-execution-time
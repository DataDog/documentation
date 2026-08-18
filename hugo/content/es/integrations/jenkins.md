---
app_id: jenkins
custom_kind: integración
description: Reenvía automáticamente tus métricas, eventos y checks de servicio de
  Jenkins to Datadog.
title: Jenkins
---

Un complemento de Jenkins para reenviar automáticamente métricas, eventos y checks de servicio a una cuenta de Datadog.

![Dashboard de Jenkins Datadog][16]

**Nota**: La [página del complemento de CI de Jenkins][1] para este complemento hace referencia a esta documentación.

## Configuración

### Instalación

_Este complemento requiere [Jenkins 2.361.4][2] y Java 11._

_Para versiones anteriores de Jenkins (es decir, 1.632+), puedes encontrar la versión 1.2.0 del complemento [aquí](https://updates.jenkins.io/download/plugins/datadog/)._

Este complemento puede ser instalado desde el [Update Center][3] (que se encuentra en `Manage Jenkins -> Manage Plugins`) en tu instalación de Jenkins:

1. Selecciona la pestaña `Available`, busca `Datadog` y marca la casilla situada junto a `Datadog Plugin`.
2. Instala el complemento utilizando uno de los dos botones de instalación situados en la parte inferior de la pantalla.
3. Para comprobar que el complemento está instalado, busca `Datadog Plugin` en la pestaña `Installed`.

  Continúa más abajo para la configuración.

**Nota**: Si aparece una versión inesperada de `Datadog Plugin`, ejecuta `Check Now` desde la pantalla `Manage Jenkins -> Manage Plugins`.

### Configuración

Hay dos maneras de configurar tu complemento para enviar datos a Datadog:

* Con un Datadog Agent que actúa como Forwarder entre Jenkins y Datadog (recomendado).
  - Cuando se utiliza un servidor DogStatsD en lugar de un Datadog Agent completo, sólo se admiten métricas y eventos.
  - Para los datos enviados desde un host externo, el Datadog Agent requiere la siguiente configuración: `dogstatsd_non_local_traffic: true` y `apm_non_local_traffic: true`. Esto puede configurarse mediante el [archivo de configuración][17] `datadog.yaml`.
* Envío de datos directamente a Datadog a través de HTTP.
  - La implementación de cliente HTTP utilizada es de bloqueo con un tiempo de espera de 1 minuto. Si hay un problema de conexión con Datadog, puede ralentizar tu instancia de Jenkins.

La configuración se puede hacer desde la [interfaz de usuario del complemento](#plugin-user-interface) con un [script Groovy](#groovy-script), o a través de [variables de entorno](#environment-variables).

#### Interfaz de usuario del complemento

Para configurar tu complemento de Datadog, navega a la página `Manage Jenkins -> Configure System` en tu instalación Jenkins. Una vez allí, desplázate hacia abajo hasta encontrar la sección `Datadog Plugin`:

##### Reenvío HTTP

1. Selecciona el botón de opción situado junto a **Utilizar el sitio Datadog y la clave de API para informar a Datadog** (seleccionado por defecto).
2. Selecciona tu [sitio Datadog][21] en el desplegable **Elegir un sitio**. 
3. Pega tu [clave de API Datadog][4] en el cuadro de texto `API Key` de la pantalla de configuración de Jenkins. Si quieres almacenar tu clave de API utilizando el [Gestor de credenciales][18], crea una credencial para la clave de API y luego selecciónala en el desplegable `Select from credentials`.
4. Prueba tu clave de API Datadog utilizando el botón `Test Key` de la pantalla de configuración de Jenkins, justo debajo del cuadro de texto de la clave API.
5. (Opcional) Introduce el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog (por ejemplo, `app.datadoghq.com`) en el campo `Datadog App hostname`.
6. (Opcional) Introduce el nombre de host del servidor Jenkins en la pestaña Advanced (Avanzado) para incluirlo con el eventos.
7. (Opcional) Introduce tu [URL de entrada de log de Datadog][15] y selecciona "Enable Log Collection" (Activar recopilación de logs) en la pestaña Advanced (Avanzado).
8. (Opcional) Selecciona "Enable CI Visibility" (Activar CI Visibility), configurando opcionalmente el nombre de tu instancia de CI.
9. Guarda tu configuración.

##### Reenvío de Datadog Agent

1. Selecciona el botón de opción situado junto a **Use the Datadog Agent to report to Datadog** (Utilizar Datadog Agent para informar a Datadog).
2. Especifica tu Datadog Agent `hostname` y `port`.
3. (Opcional) Introduce el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog (por ejemplo, `app.datadoghq.com`) en el campo `Datadog App hostname`.
4. (Opcional) Introduce el nombre de host del servidor Jenkins en la pestaña Advanced (Avanzado) para incluirlo con el eventos.
5. (Opcional) Introduce tu puerto de recopilación de logs, configurar la [recopilación de logs](#log-collection-for-agents) en el Datadog Agent y selecciona "Enable Log Collection" (Activar la recopilación de log).
6. (Opcional) Introduce tu puerto de recopilación de trazas (traces) y selecciona "Enable CI Visibility" (Activar CI Visibility), configurando opcionalmente el nombre de tu instancia de CI.
7. Guarda tu configuración.

#### Script Groovy

Configura tu complemento de Datadog para reenviar datos a través de HTTP o DogStatsD usando los scripts Groovy de abajo. Configura el complemento de esta manera podría ser útil si estás ejecutando tu Jenkins Master en un contenedor de Docker usando la [imagen oficial de Docker de Jenkins][5] o cualquier derivado compatible con `plugins.txt` y scripts init Groovy.

##### Reenvío HTTP usando Groovy

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

def site = new DatadogIntakeSite(DatadogSite.US1) // pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.collectBuildLogs = true // if you want to collect logs
datadog.enableCiVisibility = true // if you want to enable CI Visibility

// Customization, see dedicated section below
datadog.excluded = 'job1,job2'

// Save config
datadog.save()
```

##### Reenvío de Datadog Agent utilizando Groovy

```groovy
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogAgentConfiguration

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def agentHost = 'localhost'
def agentPort = 8125
def agentLogCollectionPort = 10518
def agentTraceCollectionPort = 8126
datadog.datadogClientConfiguration = new DatadogAgentConfiguration(agentHost, agentPort, agentLogCollectionPort, agentTraceCollectionPort)

datadog.datadogAppHostname = 'app.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.collectBuildLogs = true // if you want to collect logs
datadog.enableCiVisibility = true // if you want to enable CI Visibility

// Customization, see dedicated section below
datadog.excluded = 'job1,job2'

// Save config
datadog.save()
```

#### Variables de entorno

Configura tu complemento de Datadog utilizando las variables de entorno con la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH`, que especifica el mecanismo de informe a utilizar.

##### Reenvío HTTP mediante variables de entorno

1. Establece la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH` en `HTTP`.
2. Define la variable `DATADOG_JENKINS_PLUGIN_DATADOG_SITE`, que especifica el [sitio Datadog][21] (por defecto es US1).
3. Establece la variable `DATADOG_JENKINS_PLUGIN_TARGET_API_KEY`, que especifica tu [clave de API de Datadog][4].
4. (Opcional) Define la variable `DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME` con el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog (por ejemplo `app.datadoghq.com`) 
5. (Opcional) Recopilación de logs
  - Establece la variable `DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS` en `true` para activar la recopilación de logs (desactivada por defecto).
6. (Opcional) CI Visibility (recopilación de trazas):
  - Establece la variable `DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY` en `true` para activar la CI Visibility (desactivada por defecto).
  - Establece la variable `DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME`, que especifica el nombre de la instancia de Jenkins para CI Visibility (por defecto es `jenkins`).

##### Reenvío de Datadog Agent mediante variables de entorno 

1. Establece la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH` en `DSD`.
2. Establece la variable `DATADOG_JENKINS_PLUGIN_TARGET_HOST`, que especifica el host de servidor de DogStatsD (por defecto `localhost`).
3. Establece la variable `DATADOG_JENKINS_PLUGIN_TARGET_PORT`, que especifica el puerto del servidor de DogStatsD (por defecto es `8125`).
4. (Opcional) Define la variable `DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME` con el nombre del host que utilizas para acceder a la interfaz de usuario de Datadog (por ejemplo `app.datadoghq.com`)
5. (Opcional) Recopilación de logs
   -  Habilita [recopilación de logs](#log-collection-for-agents) en el Datadog Agent.
   - Establece la variable `DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS` en `true` para activar la recopilación de logs (desactivada por defecto).
   - Establece la variable `DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT`, que especifica el puerto de recopilación de logs de Datadog Agent.
6. (Opcional) CI Visibility (recopilación de trazas):
   - Establece la variable `DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY` en `true` para activar la CI Visibility (desactivada por defecto).
   - Establece la variable `DATADOG_JENKINS_PLUGIN_TARGET_TRACE_COLLECTION_PORT`, que especifica el puerto de recopilación de trazas de Datadog Agent (por defecto `8126`).
   - Establece la variable `DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME`, que especifica el nombre de la instancia de Jenkins para CI Visibility (por defecto es `jenkins`).

Además, puede utilizar las variables de entorno estándar de Datadog:
   - Establece la variable `DD_AGENT_HOST`, que especifica el host del Datadog Agent.
   - Establece la variable `DD_AGENT_PORT`, que especifica el puerto del servidor de DogStatsD.
   - Establece la variable `DD_TRACE_AGENT_PORT`, que especifica el puerto de recopilación de trazas de Datadog Agent.
   - Establece la variable `DD_TRACE_AGENT_URL`, que especifica la URL de Datadog Agent para enviar trazas. Cuando se establece, tiene prioridad sobre `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT`.

Las variables de entorno con el espacio de nombres `DATADOG_JENKINS_PLUGIN` tienen prioridad sobre las variables de entorno estándar de Datadog.

#### Registro

La generación de logs se realiza utilizando `java.util.Logger`, que sigue las [prácticas recomendadas de Jenkins para la generación de logs][6].

El complemento registra automáticamente un generador de logs personalizado llamado "Datadog Plugin Logs" que escribe logs de complementos con un nivel `INFO` o superior.
El generador de logs personalizado puede desactivarse definiendo la variable de entorno `DD_JENKINS_PLUGIN_LOG_RECORDER_ENABLED` en `false`.
Si quieres ver logs de complementos con el máximo detalle, cambia manualmente el nivel del generador de logs personalizado a `ALL`.

## Personalización

### Personalización de pipeline

El complemento de Datadog añade un paso `datadog` que proporciona alguna opción de configuración para tus trabajos basados en pipelines.

| Opción (tipo)              | Descripción                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `collectLogs` (`boolean`)  | Cuando la recopilación de logs está desactivada globalmente, esto la activa para el pipeline. |
| `tags` (`String[]`)        | Una lista de etiquetas para adjuntar a todos los datos recopilados sobre el pipeline.      |

En los pipelines declarativos, añade el paso a un bloque de nivel superior de `options` del siguiente modo:

```groovy
pipeline {
    agent any
    options {
        datadog(collectLogs: true, tags: ["foo:bar", "bar:baz"])
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

En el proceso guiado, envuelve la sección correspondiente con el paso de Datadog de la siguiente manera:

```groovy
datadog(collectLogs: true, tags: ["foo:bar", "bar:baz"]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

**Nota**: Las personalizaciones de pipeline sólo se registran después de que se haya iniciado un trabajo. Las etiquetas especificadas en la personalización del pipeline no se asociarán con `jenkins.job.started`.

### Personalización global

Para personalizar tu configuración global, en Jenkins ve a `Manage Jenkins -> Configure System` y haz clic en el botón **Advanced** (Advanzado). Están disponibles las siguientes opciones:

| Personalización              | Descripción                                                                                                                                                                                                                                 | Variable de entorno                          |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| Nombre de host                   | Un nombre de host para utilizar en cada evento enviado a Datadog.                                                                                                                                                                                           | `DATADOG_JENKINS_PLUGIN_HOSTNAME`             |
| Trabajos excluidos              | Una lista separada por comas de expresiones regulares utilizada para excluir nombres de trabajos de la monitorización, por ejemplo: `susans-job,johns-.*,prod_folder/prod_release`. Esta configuración afecta a todos los aspectos del complemento: eventos, métricas, logs, CI Visibility.               |  `DATADOG_JENKINS_PLUGIN_EXCLUDED`            |
| Trabajos incluidos              | Una lista separada por comas de expresiones regulares utilizada para incluir nombres de trabajos para la monitorización, por ejemplo: `susans-job,johns-.*,prod_folder/prod_release`. Esta configuración afecta a todos los aspectos del complemento: eventos, métricas, logs, CI Visibility.                | `DATADOG_JENKINS_PLUGIN_INCLUDED`            |
| Archivo de etiqueta global            | La ruta a un archivo de espacio de trabajo que contiene una lista separada por comas de etiquetas (no compatible con trabajos de pipeline).                                                                                                                                   | `DATADOG_JENKINS_PLUGIN_GLOBAL_TAG_FILE`      |
| Etiquetas globales                | Una lista separada por comas de etiquetas para aplicar a todas las métricas, eventos y checks de servicio. Las etiquetas pueden incluir variables de entorno que estén definidas en la instancia principal de Jenkins.                                                                                                                                                          | `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`          |
| Etiquetas de trabajo globales            | Una lista separada por comas de expresiones regulares para hacer coincidir un trabajo y una lista de etiquetas para aplicar a ese trabajo. Las etiquetas pueden incluir variables de entorno que se definen en la instancia principal de Jenkins. **Nota**: Las etiquetas pueden hacer referencia a grupos de coincidencias en la expresión regular utilizando el símbolo `$`, por ejemplo: `(.*?)_job_(*?)_release, owner:$1, release_env:$2, optional:Tag3` | `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`      |
| Enviar eventos de auditoría de seguridad | Envía el `Security Events Type` de eventos y métricas (activado por defecto).                                                                                                                                                                | `DATADOG_JENKINS_PLUGIN_EMIT_SECURITY_EVENTS` |
| Enviar eventos de sistema         | Envía el `System Events Type` de eventos y métricas (activado por defecto).                                                                                                                                                                  | `DATADOG_JENKINS_PLUGIN_EMIT_SYSTEM_EVENTS`   |
| Incluir eventos para enviar        | Una lista separada por comas de cadenas de nombres de eventos para enviar, independientemente del tipo de evento que esté activado/desactivado.                                                                               | `DATADOG_JENKINS_PLUGIN_INCLUDE_EVENTS`   |
| Excluir eventos para enviar        | Una lista separada por comas de las cadenas de nombres de eventos que no se deben enviar, independientemente de que el tipo de evento esté activado/desactivado.                                                                               | `DATADOG_JENKINS_PLUGIN_EXCLUDE_EVENTS`   |

### Personalización del trabajo

Desde una página de configuración específica del trabajo:

| Personalización                         | Descripción                                                                                                                                                                                           |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Etiquetas personalizadas                           | Establecido desde un `File` en el espacio de trabajo (no compatible con trabajos de pipeline) o como texto `Properties` directamente desde la página de configuración. Si se establece, anula la configuración `Global Job Tags`. |
| Enviar eventos de gestión de control de fuente | Presenta el `Source Control Management Events Type` de eventos y métricas (activado por defecto).                                                                                                         |

### Configuración de Test Optimization

El complemento puede configurar automáticamente Datadog [Test Optimization[19] para un trabajo o un pipeline. Consulta la [documentación de Test Optimization para tu lenguaje][20] para asegurarte de que el marco de tests que utilizas es compatible. También ten en cuenta que la configuración automática no es compatible con tests que se ejecutan en contenedores. Para habilitar Test Optimization para ejecuciones de tests en contenedores, sigue los [pasos de instrumentación manual][20].

Antes de activar Test Optimization, asegúrate de configurar correctamente el complemento para enviar datos a Datadog.

Existen dos opciones para activar la configuración automática de Test Optimization:

1. Utilizando la interfaz de usuario de Jenkins (disponible en el complemento v5.6.0 o más reciente): ve a la página **Configurar** del trabajo o pipeline cuyos tests necesitan ser rastreados, marca la casilla **Habilitar Datadog Test Optimization** en la sección **General** y guarda tus cambios. Esta opción no está disponible si se utilizan pipelines de varias bifurcaciones, carpetas de organización u otros tipos de pipelines que se configuran completamente con `Jenkinsfile`.
2. Con el paso de pipeline de `datadog` (disponible en el complemento v5.6.2 o posterior):

En los pipelines declarativos, añade el paso a un bloque de nivel superior de `options` del siguiente modo:

```groovy
pipeline {
    agent any
    options {
        datadog(testOptimization: [ 
            enabled: true, 
            serviceName: "my-service", // the name of service or library being tested
            languages: ["JAVA"], // languages that should be instrumented (available options are "JAVA", "JAVASCRIPT", "PYTHON", "DOTNET", "RUBY", "GO")
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

En los pipelines con script, envuelve la sección correspondiente con el paso `datadog` de la siguiente manera:

```groovy
datadog(testOptimization: [ enabled: true, serviceName: "my-service", languages: ["JAVA"], additionalVariables: [:] ]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

Los demás parámetros de `datadog`, como `collectLogs` o `tags`, pueden añadirse junto al bloque `testOptimization`.

Ten en cuenta que Test Optimization es un producto independiente de Datadog y se factura por separado.

## Datos recopilados

Este complemento recopila los siguientes [eventos](#events), [métricas](#metrics) y [checks de servicio](#service-checks):

### Eventos

#### Tipo de eventos por defecto

| Nombre del evento      | Activado en              | Etiquetas predeterminadas                                                              | Métrica RATE asociada  |
|-----------------|---------------------------|---------------------------------------------------------------------------|-------------------------|
| BuildStarted   | `RunListener#onStarted`   | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `user_id`           | `jenkins.job.started`   |
| BuildAborted   | `RunListener#onDeleted`   | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `user_id`           | `jenkins.job.aborted`   |
| BuildCompleted | `RunListener#onCompleted` | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `result`, `user_id` | `jenkins.job.completed` |
| SCMCheckout    | `SCMListener#onCheckout`  | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `user_id`           | `jenkins.scm.checkout`  |

NOTA: `event_type` está siempre ajustado en `default` para los eventos y métricas mencionados.

#### Tipo de eventos de sistemas

| Nombre del evento                   | Activado en                            | Etiquetas predeterminadas                                                            | Métrica RATE asociada                 |
|------------------------------|-----------------------------------------|-------------------------------------------------------------------------|----------------------------------------|
| ComputerOnline              | `ComputerListener#onOnline`             | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.online`              |
| ComputerOffline             | `ComputerListener#onOffline`            | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.offline`             |
| ComputerTemporarilyOnline   | `ComputerListener#onTemporarilyOnline`  | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.temporarily_online`  |
| ComputerTemporarilyOffline  | `ComputerListener#onTemporarilyOffline` | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.temporarily_offline` |
| ComputerLaunchFailure       | `ComputerListener#onLaunchFailure`      | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.launch_failure`      |
| ItemCreated                 | `ItemListener#onCreated`                | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.created`                 |
| ItemDeleted                 | `ItemListener#onDeleted`                | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.deleted`                 |
| ItemUpdated                 | `ItemListener#onUpdated`                | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.updated`                 |
| ItemCopied                  | `ItemListener#onCopied`                 | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.copied`                  |
| ItemLocationChanged        | `ItemListener#onLocationChanged`        | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.location_changed`        |

NOTA: `event_type` se establece siempre en `system` para los anteriores eventos y métricas.

#### Tipo de eventos de seguridad

| Nombre del evento                  | Activado en                            | Etiquetas predeterminadas                                     | Métrica RATE asociada       |
|-----------------------------|-----------------------------------------|--------------------------------------------------|------------------------------|
| UserAuthenticated          | `SecurityListener#authenticated`        | `event_type`, `jenkins_url`, `user_id`           | `jenkins.user.authenticated` |
| UserFailedToAuthenticate | `SecurityListener#failedToAuthenticate` | `event_type`, `jenkins_url`, `user_id`           | `jenkins.user.access_denied` |
| UserLoggedOut              | `SecurityListener#loggedOut`            | `event_type`, `jenkins_url`, `user_id`           | `jenkins.user.logout`        |

NOTA: `event_type` siempre se establece en `security` para los anteriores eventos y métricas.

#### Filtrado de eventos

Este complemento permite filtrar eventos por el tipo de evento así como por los nombres específicos de evento enumerados
arriba. Para incluir/excluir todos los eventos del tipo de sistema o de seguridad:
- **En la interfaz de usuario**: desactiva las casillas de verificación de estos eventos.
- **En un script groovy**: obtén el descriptor global de Datadog y llama a `d.setEmitSystemEvents()` o `d.setEmitSecurityEvents()`.
- **En la sección de [variables de entorno](#environment-variables)**: define las variables de entorno para los eventos de seguridad y de sistema emitidos.

Para obtener un control más específico sobre qué eventos se envían, se proporcionan tres opciones de configuración para permitir una lista de include/exclude (incluir/excluir) separada por comas de cadenas de nombres de evento. La lista include/exclude (incluir/excluir) tiene prioridad sobre el filtrado por tipo de evento. Por ejemplo, los eventos de `security` pueden desactivarse, pero la inclusión de `UserAuthenticated` tiene prioridad, por lo que sólo se enviarán eventos de `UserAuthenticated` del tipo `security`. En la interfaz de usuario, se proporcionan cuadros de texto para las listas incluir/excluir. En un script groovy, los métodos `d.setIncludeEvents()` y `d.setExcludeEvents()` aceptan como entrada una lista de nombres de evento separada por comas, que es otro método válido de configuración. Por último, se proporcionan [variables de entorno](#environment-variables) para configurar manualmente las listas de incluir/excluir.

NOTA: Como se menciona en la sección [personalización del trabajo](#job-customization), existen conmutadores específicos de trabajo para enviar eventos `SCMCheckout`. Si el evento `SCMCheckout` se excluye globalmente, este conmutador no tendrá ningún efecto.

### Métricas

| Nombre de la métrica                            | Descripción                                                                                            | Etiquetas por defecto                                                               |
|----------------------------------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `jenkins.computer.launch_failure`      | Tasa de fallos en el lanzamiento de ordenadores.                                                                      | `jenkins_url`                                                              |
| `jenkins.computer.offline`             | Tasa de desconexión del ordenador.                                                                        | `jenkins_url`                                                              |
| `jenkins.computer.online`              | Tasa de ordenadores que se conectan a Internet.                                                                         | `jenkins_url`                                                              |
| `jenkins.computer.temporarily_offline` | Tasa de ordenadores que se desconectan temporalmente.                                                            | `jenkins_url`                                                              |
| `jenkins.computer.temporarily_online`  | Tasa de ordenadores que se conectan temporalmente.                                                             | `jenkins_url`                                                              |
| `jenkins.config.changed`               | Tasa de cambios de configuración.                                                                         | `jenkins_url`, `user_id`                                                   |
| `jenkins.executor.count`               | Recuento de ejecutores.                                                                                        | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.executor.free`                | Número de ejecutor no utilizado.                                                                             | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.executor.in_use`              | Número de ejecutor inactivo.                                                                               | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.item.copied`                  | Tasa de elementos que se copian.                                                                            | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.created`                 | Tasa de creación de elementos.                                                                           | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.deleted`                 | Tasa de elementos eliminados.                                                                           | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.location_changed`        | Tasa de elementos que se trasladan.                                                                             | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.updated`                 | Tasa de elementos que se actualizan.                                                                           | `jenkins_url`, `user_id`                                                   |
| `jenkins.job.aborted`                  | Tasa de trabajos abandonados.                                                                                  | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.job.build_duration`           | Duración de la compilación sin pausa (en segundos).                                                             | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.completed`                | Tasa de trabajos completados.                                                                                | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.cycletime`                | Duración del ciclo de compilación (en segundos).                                                                         | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.duration`                 | Duración de la compilación (en segundos).                                                                           | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.feedbacktime`             | Tiempo de respuesta desde la confirmación del código hasta el fallo del trabajo (en segundos).                                            | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.leadtime`                 | Tiempo de entrega de la compilación.                                                                                       | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.mtbf`                     | MTBF, tiempo entre el último trabajo realizado con éxito y el trabajo actual fallido (en segundos).                            | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.mttr`                     | MTTR: tiempo transcurrido entre el último trabajo fallido y el trabajo actual con éxito (en segundos).                            | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.pause_duration`           | Duración de la pausa del trabajo de compilación (en segundos).                                                              | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.started`                  | Tasa de trabajos iniciados.                                                                                  | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.job.stage_duration`           | Duración de las etapas individuales.                                                                         | `jenkins_url`, `job`, `user_id`, `stage_name`, `stage_depth`, `stage_parent`, `result` |
| `jenkins.job.stage_pause_duration`     | Duración de la pausa de las etapas individuales (en milisegundos).                                                 | `jenkins_url`, `job`, `user_id`, `stage_name`, `stage_depth`, `stage_parent`, `result` |
| `jenkins.job.stage_completed`          | Tasa de etapas completadas.                                                                              | `jenkins_url`, `job`, `user_id`, `stage_name`, `stage_depth`, `stage_parent`, `result` |
| `jenkins.job.waiting`                  | Tiempo de espera para que se ejecute el trabajo (en segundos).                                                        | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.job.currently_building`       | Recuento de trabajos en compilación (no incluye los trabajos programados pero que aún no han comenzado). | `jenkins_url`                      |
| `jenkins.node.count`                   | Número total de nodos.                                                                                  | `jenkins_url`                                                              |
| `jenkins.node.offline`                 | Recuento de nodos fuera de línea.                                                                                   | `jenkins_url`                                                              |
| `jenkins.node.online`                  | Recuento de nodos en línea.                                                                                    | `jenkins_url`                                                              |
| `jenkins.node_status.count`            | Si este nodo está presente.                                                                               | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.node_status.up`               | Si un nodo determinado está en línea, valor 1. En caso contrario, 0.                                                      | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.plugin.count`                 | Recuento de los complementos.                                                                                         | `jenkins_url`                                                              |
| `jenkins.plugin.active`                | Complementos activos.                                                                                        | `jenkins_url`                                                              |
| `jenkins.plugin.failed`                | Complementos fallidos.                                                                                        | `jenkins_url`                                                              |
| `jenkins.plugin.inactivate`            | Complementos inactivos.                                                                                      | `jenkins_url`                                                              |
| `jenkins.plugin.withUpdate`            | Complementos con actualización.                                                                                   | `jenkins_url`                                                              |
| `jenkins.plugin.withWarning`           | Plugins con aviso.                                                                                  | `jenkins_url`                                                              |
| `jenkins.project.count`                | Recuento de proyectos.                                                                                         | `jenkins_url`                                                              |
| `jenkins.queue.size`                   | Tamaño de la cola.                                                                                            | `jenkins_url`                                                              |
| `jenkins.queue.buildable`              | Número de elementos compilables en cola.                                                                     | `jenkins_url`                                                              |
| `jenkins.queue.pending`                | Número de elementos pendientes en la cola.                                                                       | `jenkins_url`                                                              |
| `jenkins.queue.stuck`                  | Número de elementos detenidos en la cola.                                                                         | `jenkins_url`                                                              |
| `jenkins.queue.blocked`                | Número de elementos bloqueados en la cola.                                                                       | `jenkins_url`                                                              |
| `jenkins.queue.job.in_queue`           | Número de veces que un trabajo ha estado en cola.                                                             | `jenkins_url`, `job_name`                                                  |
| `jenkins.queue.job.buildable`          | Número de veces que un trabajo ha sido compilable en una cola.                                                   | `jenkins_url`, `job_name`                                                  |
| `jenkins.queue.job.pending`            | Número de veces que un trabajo ha estado pendiente en una cola.                                                     | `jenkins_url`, `job_name`                                                  |
| `jenkins.queue.job.stuck`              | Número de veces que un trabajo ha estado detenido en una cola.                                                       | `jenkins_url`, `job_name`                                                  |
| `jenkins.queue.job.blocked`            | Número de veces que se ha bloqueado un trabajo en una cola.                                                     | `jenkins_url`, `job_name`                                                  |
| `jenkins.scm.checkout`                 | Tasa de salidas de SCM.                                                                                 | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.user.access_denied`           | Tasa de usuarios que no consiguen autenticarse.                                                                 | `jenkins_url`, `user_id`                                                   |
| `jenkins.user.authenticated`           | Tasa de usuarios que se autentifican.                                                                          | `jenkins_url`, `user_id`                                                   |
| `jenkins.user.logout`                  | Tasa de usuarios que se desconectan.                                                                             | `jenkins_url`, `user_id`                                                   |

#### Recopilación de logs para Agents

**Nota**: Esta configuración sólo se aplica a aquellos que utilizan la [configuración del Datadog Agent](#plugin-user-interface).

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Para recopilar logs de Jenkins, crea un [archivo fuente personalizado de logs][13] para tu Agent creando un `conf.yaml` dentro de `conf.d/jenkins.d` con lo siguiente:

    ```yaml
    logs:
      - type: tcp
        port: <PORT>
        service: <SERVICE>
        source: jenkins
    ```

3. En Jenkins, envía el puerto que especificaste anteriormente como `Log Collection Port`. Puedes establecerlo utilizando [variables de entorno](#environment-variables), un [script Groovy](#groovy-script), o la [interfaz de usuario de Jenkins](#plugin-user-interface).

4. [Reinicia el Agent][14].

### Checks de servicio

Crea el estado `jenkins.job.status` con las siguientes etiquetas predeterminadas: `jenkins_url`, `job`, `node`, `user_id`

## Solucionar problemas

### Generación de un flare de diagnóstico.

El flare de diagnóstico del complemento contiene datos que pueden utilizarse para diagnosticar problemas con el complemento.
En el momento en que se escribió esta guía, el flare incluía lo siguiente:
- configuración de complementos en formato XML
- resultados de verificaciones de la conectividad del complemento
- datos de tiempo de ejecución (versiones actuales de JVM, Jenkins Core, complemento)
- excepciones recientes ocurridas dentro del código del complemento
- logs de complementos con un nivel `INFO` y superior, y logs recientes del controlador Jenkins
- stacks tecnológicos actuales de los subprocesos del proceso del controlador Jenkins
- variables de entorno que empiezan por `DD_` o `DATADOG_` (excepto claves de API o de aplicación)

Para generar un flare, ve a la página `Manage Jenkins`, busca la sección `Troubleshooting` y selecciona `Datadog`.
Haz clic en `Download Diagnostic Flare` (requiere permisos de "ADMINISTRADOR") para generar el flare.

## Rastreo de problemas

El sistema de rastreo de problemas integrado en GitHub se utiliza para realizar un rastreo de todos los problemas relacionados con este complemento: [jenkinsci/datadog-plugin/issues][7].
Sin embargo, dado cómo se alojan los complementos de Jenkins, pueden haber problemas que también se publiquen en JIRA. Puedes consultar [este problema de Jenkins][8] para esas publicaciones de problemas.

**Nota**: [Problemas sin resolver en JIRA que mencionan a Datadog][9].

## Cambios

Consulta el [CHANGELOG.md][10].

## Cómo contribuir con código

En primer lugar y lo más importante, **gracias** por compartir.

Consulta las [directrices de contribución][11] antes de enviar un problema o una solicitud pull.
Consulta el [documento de desarrollo][12] para obtener consejos sobre cómo poner en marcha un entorno de desarrollo local de forma rápida.

[1]: https://plugins.jenkins.io/datadog
[2]: http://updates.jenkins-ci.org/download/war/2.361.4/jenkins.war
[3]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/jenkinsci/docker
[6]: https://wiki.jenkins-ci.org/display/JENKINS/Logging
[7]: https://github.com/jenkinsci/datadog-plugin/issues
[8]: https://issues.jenkins-ci.org/issues/?jql=project%20%3D%20JENKINS%20AND%20status%20in%20%28Open%2C%20%22In%20Progress%22%2C%20Reopened%29%20AND%20component%20%3D%20datadog-plugin%20ORDER%20BY%20updated%20DESC%2C%20priority%20DESC%2C%20created%20ASC
[9]: https://issues.jenkins-ci.org/issues/?jql=status%20in%20%28Open%2C%20%22In%20Progress%22%2C%20Reopened%2C%20Verified%2C%20Untriaged%2C%20%22Fix%20Prepared%22%29%20AND%20text%20~%20%22datadog%22
[10]: https://github.com/jenkinsci/datadog-plugin/blob/master/CHANGELOG.md
[11]: https://github.com/jenkinsci/datadog-plugin/blob/master/CONTRIBUTING.md
[12]: https://github.com/jenkinsci/datadog-plugin/blob/master/DEVELOPMENT.md
[13]: https://docs.datadoghq.com/es/agent/logs/?tab=tcpudp#custom-log-collection
[14]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[15]: https://docs.datadoghq.com/es/logs/log_collection/?tab=http
[16]: https://raw.githubusercontent.com/jenkinsci/datadog-plugin/master/images/dashboard.png
[17]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=containeragent#
[18]: https://www.jenkins.io/doc/book/using/using-credentials/
[19]: https://docs.datadoghq.com/es/tests/
[20]: https://docs.datadoghq.com/es/tests/setup/
[21]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site
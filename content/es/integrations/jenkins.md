---
categories:
- configuration & deployment
custom_kind: integration
dependencies:
- https://github.com/jenkinsci/datadog-plugin/blob/master/README.md
description: Reenvía automáticamente tus métricas, eventos y checks de servicio de
  Jenkins to Datadog.
doc_link: https://docs.datadoghq.com/integrations/jenkins/
git_integration_title: jenkins
has_logo: true
integration_title: Jenkins
is_public: true
name: jenkins
public_title: Integración de Datadog y Jenkins
short_description: Reenvía automáticamente tus métricas, eventos y servicios de Jenkins
  checks to Datadog.
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

1. Selecciona el botón de opción situado junto a **Use Datadog API URL and Key to report to Datadog** (Utilizar la URL y la clave de la API de Datadog para informar a Datadog) (seleccionado por defecto).
2. Pega tu [clave de API de Datadog][4] en el cuadro de texto `API Key` de la pantalla de configuración de Jenkins. Si deseas almacenar tu clave de API con el [Gestor de credenciales][18], crea una credencial para la clave de API y selecciona esa credencial en el menú desplegable `Datadog API Key (Select from Credentials)`.
3. Prueba tu clave de API de Datadog utilizando el botón `Test Key` en la pantalla de configuración de Jenkins justo debajo del cuadro de texto de la clave de API.
4. (Opcional) Introduce el nombre de host del servidor Jenkins en la pestaña Advanced (Avanzado) para incluirlo con los eventos.
5. (Opcional) Introduce tu [URL de entrada de log de Datadog][15] y selecciona "Enable Log Collection" (Activar recopilación de logs) en la pestaña Advanced (Avanzado).
6. (Opcional) Selecciona "Enable CI Visibility" (Activar CI Visibility), configurando opcionalmente el nombre de tu instancia de CI.
7. Guarda tu configuración.

##### Reenvío de Datadog Agent

1. Selecciona el botón de opción situado junto a **Use the Datadog Agent to report to Datadog** (Utilizar Datadog Agent para informar a Datadog).
2. Especifica tu Datadog Agent `hostname` y `port`.
3. (Opcional) Introduce el nombre de host del servidor Jenkins en la pestaña Advanced (Avanzado) para incluirlo con el eventos.
4. (Opcional) Introduce tu puerto de recopilación de logs, configurar la [recopilación de logs](#log-collection-for-agents) en el Datadog Agent y selecciona "Enable Log Collection" (Activar la recopilación de log).
5. (Opcional) Introduce tu puerto de recopilación de trazas (traces) y selecciona "Enable CI Visibility" (Activar CI Visibility), configurando opcionalmente el nombre de tu instancia de CI.
6. Guarda tu configuración.

#### Script Groovy

Configura tu complemento de Datadog para reenviar datos a través de HTTP o DogStatsD usando los scripts Groovy de abajo. Configura el complemento de esta manera podría ser útil si estás ejecutando tu Jenkins Master en un contenedor de Docker usando la [imagen oficial de Docker de Jenkins][5] o cualquier derivado compatible con `plugins.txt` y scripts init Groovy.

##### Reenvío HTTP usando Groovy

```groovy
import jenkins.model.*
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

def j = Jenkins.getInstance()
def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

// Si deseas utilizar la URL y clave de la API de Datadog para informar a Datadog
d.setReportWith('HTTP')
d.setTargetApiURL('https://api.datadoghq.com/api/')
d.setTargetApiKey('<DATADOG_API_KEY>')

// Personalización, consulta la sección específica a continuación
d.setExcluded('job1,job2')

// Si deseas recopilar logs
d.setLogIntakeUrl('https://http-intake.logs.datadoghq.com/v1/input/')

// Guardar configuración
d.save()
```

##### Reenvío de Datadog Agent utilizando Groovy

```groovy
import jenkins.model.*
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

def j = Jenkins.getInstance()
def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

d.setReportWith('DSD')
d.setTargetHost('localhost')
d.setTargetPort(8125)

// Si deseas recopilar logs
d.setTargetLogCollectionPort(10518)
d.setCollectBuildLogs(true)

// Si deseas activar CI Visibility
d.setTargetTraceCollectionPort(8126)
d.setEnableCiVisibility(true)
d.setCiInstanceName("jenkins")

// Personalización, consulta la sección específica a continuación
d.setExcluded('job1,job2')

// Guardar configuración
d.save()
```

#### Variables de entorno

Configura tu complemento de Datadog utilizando las variables de entorno con la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH`, que especifica el mecanismo de informe a utilizar.

##### Reenvío HTTP mediante variables de entorno

1. Establece la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH` en `HTTP`.
2. Establece la variable `DATADOG_JENKINS_PLUGIN_TARGET_API_URL`, que especifica el endpoint de la API de Datadog (por defecto es `https://api.datadoghq.com/api/`).
3. Establece la variable `DATADOG_JENKINS_PLUGIN_TARGET_API_KEY`, que especifica tu [clave de API de Datadog][4].
4. (Opcional) Recopilación de logs
  - Establece la variable `DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS` en `true` para activar la recopilación de logs (desactivada por defecto).
  - Establece la variable `DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL`, que especifica la URL de entrada de logs de Datadog (por defecto `https://http-intake.logs.datadoghq.com/v1/input/`).
5. (Opcional) CI Visibility (recopilación de trazas):
  - Establece la variable `DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY` en `true` para activar la CI Visibility (desactivada por defecto).
  - Establece la variable `DATADOG_JENKINS_TARGET_WEBHOOK_INTAKE_URL`, que especifica la URL de entrada del Webhook de Datadog (por defecto es `https://webhook-intake.datadoghq.com/api/v2/webhook/`).
  - Establece la variable `DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME`, que especifica el nombre de la instancia de Jenkins para CI Visibility (por defecto es `jenkins`).

##### Reenvío de Datadog Agent mediante variables de entorno 

1. Establece la variable `DATADOG_JENKINS_PLUGIN_REPORT_WITH` en `DSD`.
2. Establece la variable `DATADOG_JENKINS_PLUGIN_TARGET_HOST`, que especifica el host de servidor de DogStatsD (por defecto `localhost`).
3. Establece la variable `DATADOG_JENKINS_PLUGIN_TARGET_PORT`, que especifica el puerto del servidor de DogStatsD (por defecto es `8125`).
4. (Opcional) Recopilación de logs
   -  Habilita [recopilación de logs](#log-collection-for-agents) en el Datadog Agent.
   - Establece la variable `DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS` en `true` para activar la recopilación de logs (desactivada por defecto).
   - Establece la variable `DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT`, que especifica el puerto de recopilación de logs de Datadog Agent.
5. (Opcional) CI Visibility (recopilación de trazas):
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

El registro se realiza utilizando `java.util.Logger`, que sigue las [prácticas recomendadas de registro para Jenkins][6]. Para obtener logs, sigue las instrucciones de la [documentación de registro de Jenkins][6]. Cuando agregues un registrador, todas las funciones del complemento de Datadog comienzan con `org.datadog.jenkins.plugins.datadog.` y el nombre de la función que estás buscando debería autocompletarse. En el momento de escribir esto, la única función disponible era `org.datadog.jenkins.plugins.datadog.listeners.DatadogBuildListener`.

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

### Configuración de Test Visibility

El complemento puede automáticamente configurar Datadog [Test Visibility][19] para un trabajo o un pipeline (ve la [documentación para tu lenguaje][20] de Test Visibility para asegurarte de que el marco de tests que utilizas es compatible; también ten en cuenta que la configuración automática no es compatible para tests que se ejecutan dentro de contenedores; sigue los [pasos de instrumentación manual][20] para habilitar Test Visibility para ejecuciones de tests en contenedores).

Antes de activar Test Visibility, asegúrate de configurar el complemento para enviar datos a Datadog.

Hay dos opciones para activar la configuración automática de Test Visibility:

1. Con la interfaz de usuario de Jenkins (disponible en el complemento v5.6.0 o más reciente): ve a la página **Configure** (Configurar) del trabajo o pipeline cuyos tests necesitan ser rastreados, marca la casilla **Enable Datadog Test Visibility** (Activar Datadog Test Visibility) en la sección **General**, y guarda los cambios. Esta opción no está disponible si estás utilizando pipelines de múltiples ramas, carpetas de organización u otros tipos de pipelines que se configuran completamente con `Jenkinsfile`.
2. Con el paso de pipeline de `datadog` (disponible en el complemento v5.6.2 o posterior):

En los pipelines declarativos, añade el paso a un bloque de nivel superior de `options` del siguiente modo:

```groovy
pipeline {
    agent any
    options {
        datadog(testVisibility: [ 
            enabled: true, 
            serviceName: "my-service", // el nombre de servicio o biblioteca que se está probando
            languages: ["JAVA"], // lenguajes que deben ser instrumentados (las opciones disponibles son "JAVA", "JAVASCRIPT", "PYTHON", "DOTNET")
            additionalVariables: ["my-var": "value"]  // configuración adicional del rastreador (opcional)
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
datadog(testVisibility: [ enabled: true, serviceName: "my-service", languages: ["JAVA"], additionalVariables: [:] ]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

Los demás ajustes de `datadog`, como `collectLogs` o `tags`, pueden añadirse junto al bloque `testVisibility`.

Ten en cuenta que Test Visibility es un producto independiente de Datadog que se factura por separado.

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
- **En la sección [variables de entorno](#environment-variables)**: establece las variables de entorno para los eventos de seguridad y de sistema emitidos.

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

1. La recopilación de logs está desactivada por defecto en el Datadog Agent , actívala en tu archivo `datadog.yaml`:

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
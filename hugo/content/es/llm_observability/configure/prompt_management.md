---
aliases:
- /es/llm_observability/monitoring/prompt_management/
description: Cree, versione y recupere prompts gestionados en aplicaciones de Python
  con Prompt Management.
further_reading:
- link: /llm_observability/instrument/prompt_tracking
  tag: Documentación
  text: Prompt Tracking
- link: /llm_observability/improve/playground
  tag: Documentación
  text: Área de pruebas
- link: /llm_observability/instrument/sdk/?tab=python
  tag: Documentación
  text: SDK de Agent Observability
title: Prompt Management
---
## Descripción general {#overview}

Prompt Management proporciona un registro centralizado para los prompts utilizados por sus aplicaciones de LLM. En lugar de codificar plantillas de prompts en el código de la aplicación o en archivos de configuración, cree, version y actualice prompts a través de Agent Observability, y luego recupérelos en tiempo de ejecución.

La recuperación en tiempo de ejecución es compatible en Python a través del `ddtrace` SDK. La recuperación de prompts y Prompt Tracking son independientes: `LLMObs.get_prompt()` puede recuperar un prompt gestionado sin habilitar Agent Observability, pero Agent Observability debe estar habilitado para crear tramos de LLM y asociarles metadatos de prompts.

Después de crear versiones de prompts, utilice [Prompt Experimentation][10] para compararlas con una prueba A/B o implemente una progresivamente con un Guarded Rollout.

Prompt Management funciona junto con [Prompt Tracking][1]. Cuando Agent Observability está habilitado, los prompts gestionados que se pasan directamente a llamadas de LLM compatibles e instrumentadas automáticamente se asocian con los tramos resultantes.

## Requisitos previos {#prerequisites}

- Python 3.9 o posterior.
- ddtrace>=4.13.0
- Su [sitio de Datadog][2] y un [Datadog API key][3]. La clave de API es necesaria para la recuperación de prompts incluso si los traces se envían a través del Datadog Agent.
- Una [clave de aplicación de Datadog][4] con los permisos `llm_observability_read`, `feature_flag_config_read` y `feature_flag_environment_config_read` para resolver prompts por entorno. Si selecciona una clave de aplicación en Datadog, asegúrese de que tenga estos permisos.
- Para administrar prompts a través de la API o el SDK de Python, la clave de aplicación también requiere los permisos `llm_observability_write` y `feature_flag_config_write`.

## Instale el SDK {#install-the-sdk}

Instale o actualice el `ddtrace` paquete más reciente en el entorno de Python utilizado por su aplicación:

```shell
pip install --upgrade ddtrace
```

## Utilice un prompt gestionado en Python {#use-a-managed-prompt-in-python}

### Integre Prompt Management con un agente de codificación {#integrate-prompt-management-with-a-coding-agent}

Integre un prompt gestionado con el agente de codificación de su elección pegando el siguiente prompt:

```text
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrument/agentic.md to integrate the Datadog managed prompt <PROMPT_ID> into this application for environment <DEPLOYMENT_ENVIRONMENT> and track its use in Agent Observability.

Prompt variables: <PROMPT_VARIABLES>

When configuring the environment, use the following values:

DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
```

Opcionalmente, añada las credenciales de Datadog seleccionadas para que el agente de codificación pueda configurar y verificar la integración en la misma sesión:

```text
Selected Datadog credentials:

DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>

Treat these values as secrets and handle them according to the linked guide. Do not repeat or expose them.
```

**Nota:** Incluir las claves de API y de aplicación en el prompt es opcional y no es necesario para que el agente de codificación integre Prompt Management. Inclúyalos solo en una sesión de agente de codificación de confianza.

Después de completar la integración, ejecute su aplicación y active el flujo de LLM modificado. Regrese a la página de prompts para visualizar el uso; las nuevas llamadas a prompts pueden tardar un minuto en aparecer.

### Configure la recuperación de prompts {#configure-prompt-retrieval}

Proporcione el sitio de Datadog, las credenciales y el entorno de implementación a través del flujo de trabajo de configuración y gestión de secretos que ya utiliza su aplicación. Por ejemplo, utilice el archivo de entorno de la aplicación, la configuración de Docker Compose o Kubernetes, la plataforma de implementación o el gestor de secretos. En tiempo de ejecución, las siguientes variables de entorno deben estar configuradas antes de importar `ddtrace`:

{{< code-block lang="shell" >}}
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APP_KEY>"
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
{{< /code-block >}}

`DD_ENV` selecciona el entorno utilizado para resolver la versión del prompt y debe coincidir con un entorno donde el prompt esté implementado.

### Recupere, formatee y utilice un prompt {#retrieve-format-and-use-a-prompt}

Conserve el prompt que ya utiliza su aplicación como alternativa. La alternativa mantiene la aplicación funcionando si ocurren fallas en el registro, la resolución del entorno, la red o el servidor.

El siguiente ejemplo recupera y formatea un prompt de chat, luego pasa los mensajes formateados directamente a OpenAI:

```python
from ddtrace.llmobs import LLMObs
from openai import OpenAI

default_messages = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

variables = {
    "company": "Acme Inc.",
    "question": "How do I reset my password?",
}

prompt = LLMObs.get_prompt(
    "customer-support-greeting",
    fallback=default_messages,
)
messages = prompt.format(**variables)

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
)
```

`prompt.format()` devuelve una cadena para un prompt de texto y una lista de mensajes para un prompt de chat. Pase el valor formateado al parámetro de texto o mensajes correspondiente de su llamada al proveedor de LLM.

Si la recuperación falla y no se proporciona una alternativa, `get_prompt()` genera un `ValueError`. Una alternativa no reemplaza la autenticación: `DD_API_KEY` siempre es necesario, y `DD_APP_KEY` también es necesario cuando `DD_ENV` está configurado.

Los prompts gestionados no pueden hacer referencia a otros prompts gestionados en sus plantillas. Para componer prompts, combínelos en el código de la aplicación o gestione el prompt final dirigido al proveedor como un solo prompt.

### Seleccione una versión {#select-a-version}

Sin `DD_ENV`, `get_prompt()` recupera la última versión del prompt:

```python
prompt = LLMObs.get_prompt("customer-support-greeting")
```

Con `DD_ENV`, `get_prompt()` resuelve la versión del prompt para ese entorno. Esto requiere `DD_APP_KEY` con los permisos de lectura enumerados en [Requisitos previos](#prerequisites).

Para recuperar una versión numérica exacta independientemente de `DD_ENV`, pase `version`:

```python
prompt = LLMObs.get_prompt("customer-support-greeting", version=2)
```

El argumento `version` tiene prioridad sobre la resolución del entorno.

### Rastrear el uso del prompt {#track-prompt-usage}

Para asociar un prompt gestionado con un tramo de LLM, [habilite Agent Observability][5] y ejecute la aplicación con instrumentación automática a través de su flujo de trabajo de ejecución existente.

Si la aplicación recibe su configuración antes de que se inicie el proceso de Python, utilice `ddtrace-run`. Por ejemplo, el comando de shell equivalente es:

{{< code-block lang="shell" >}}
DD_SITE="<DATADOG_SITE>" \
DD_API_KEY="<DATADOG_API_KEY>" \
DD_APP_KEY="<DATADOG_APP_KEY>" \
DD_ENV="<DEPLOYMENT_ENVIRONMENT>" \
DD_SERVICE="<SERVICE_NAME>" \
DD_LLMOBS_ENABLED=1 \
ddtrace-run python app.py
{{< /code-block >}}

Si la aplicación carga su configuración en Python, cargue la configuración primero, luego importe `ddtrace.auto` antes de importar el proveedor de LLM u otros módulos de la aplicación:

```python
from dotenv import load_dotenv

load_dotenv()

import ddtrace.auto

from ddtrace.llmobs import LLMObs
from openai import OpenAI
```

Ejecute esta configuración con el comando de Python normal de la aplicación, como `python app.py`. No utilice también `ddtrace-run`; inicializa `ddtrace` antes de que la aplicación pueda cargar su configuración.

Si la aplicación no envía datos a través de un Datadog Agent, establezca también `DD_LLMOBS_AGENTLESS_ENABLED=1`.

Para un [proveedor instrumentado automáticamente compatible][6], pase el valor devuelto por `prompt.format()` directamente a la llamada del proveedor, como se muestra en [Recuperar, formatear y usar un prompt](#retrieve-format-and-use-a-prompt). Esto asocia automáticamente el prompt gestionado con el tramo resultante.

Copiar, reconstruir o convertir el valor formateado puede descartar sus metadatos de seguimiento de prompts. Por ejemplo, concatenar un prompt del sistema gestionado con una pregunta del usuario crea una nueva cadena sin esos metadatos. Utilice `LLMObs.annotation_context()` para asociar el prompt gestionado con el tramo de LLM resultante:

```python
prompt = LLMObs.get_prompt(
    "customer-support-system-prompt",
    fallback="You are a helpful support agent writing for a {{audience}} audience.",
)
variables = {"audience": audience}
system_prompt = prompt.format(**variables)
combined_prompt = f"{system_prompt}\n\nUser question: {question}"

with LLMObs.annotation_context(
    prompt=prompt.to_annotation_dict(**variables),
):
    response = client.responses.create(
        model="gpt-4o",
        input=combined_prompt,
    )
```

Pase las mismas variables a `to_annotation_dict()` que pasa a `format()` para que el prompt rastreado incluya los valores utilizados para esa llamada.

`annotation_context()` Asocia metadatos con un tramo de LLM creado dentro del contexto; no crea el tramo. Para proveedores que no están instrumentados automáticamente, primero [instrumente manualmente la llamada al LLM][7] para crear un tramo de LLM. Un `annotation_context()` explícito tiene prioridad sobre el seguimiento automático de prompts. Consulte [Prompt Tracking][1] para obtener más información.

## Crear y administrar prompts {#create-and-manage-prompts}

Cree prompts y publique nuevas versiones en la interfaz de usuario de {{< ui >}}Prompts{{< /ui >}}, a través del SDK de Python o a través de la API.

### Crear un prompt {#create-a-prompt}

#### Promocione un prompt rastreado {#promote-a-tracked-prompt}

Para promocionar un prompt ya rastreado en Agent Observability a un prompt administrado, navegue a la página {{< ui >}}Prompts{{< /ui >}}, abra el prompt y haga clic en {{< ui >}}Register{{< /ui >}}. Luego puede actualizar el prompt en la interfaz de usuario y recuperarlo en tiempo de ejecución.

#### En la interfaz de usuario desde cero {#in-the-ui-from-scratch}

Navegue a la página {{< ui >}}Prompts{{< /ui >}} y haga clic en {{< ui >}}\+ New Prompt{{< /ui >}}.

En el Editor de prompts:

1. Agregue uno o más mensajes y asigne a cada uno un rol: {{< ui >}}System{{< /ui >}}, {{< ui >}}User{{< /ui >}} o {{< ui >}}Assistant{{< /ui >}}.
2. Utilice `{{variable_name}}` en cualquier mensaje para agregar contenido dinámico.
3. Opcional: Haga clic en {{< ui >}}Run{{< /ui >}} para probar el prompt con valores de muestra.
4. Haga clic en {{< ui >}}Save Prompt{{< /ui >}} para abrir el cuadro de diálogo de guardado.

Estructure el prompt de modo que la consulta del usuario y el contexto se inyecten como variables:

{{< img src="llm_observability/monitoring/prompt-creation.png" alt="El Playground con un mensaje de System Prompt que dice 'You are a support agent for {{company}}' y un mensaje de User Prompt que contiene {{question}}, con el botón Save Prompt en la parte superior derecha." style="width:100%;" >}}

En el cuadro de diálogo de guardado:

| Campo | Descripción |
|-------|-------------|
| {{< ui >}}Prompt ID{{< /ui >}} | Un identificador único para el prompt, como `customer-support-greeting`. Utilice este ID para recuperar el prompt con `LLMObs.get_prompt()`. |
| {{< ui >}}Description{{< /ui >}} | Notas opcionales sobre esta versión. |
| {{< ui >}}Deployment{{< /ui >}} | El entorno al cual se implementa esta versión. |

Haga clic en {{< ui >}}Create Prompt{{< /ui >}} para guardar el prompt en el registro.

### Actualice, liste y elimine prompts {#update-list-and-delete-prompts}

#### En la interfaz de usuario {#in-the-ui}

Abra un prompt en la página {{< ui >}}Prompts{{< /ui >}} para:

- **Cree una nueva versión**: Haga clic en {{< ui >}}Edit{{< /ui >}} y actualice los mensajes en el Editor de Prompts.
- **Implemente una versión en otro entorno**: Seleccione una versión y actualice sus entornos {{< ui >}}Deployment{{< /ui >}}.
- **Elimine un prompt**: Seleccione {{< ui >}}Delete{{< /ui >}} en el menú de opciones del prompt. Esto elimina el prompt y su historial de versiones del registro.

### Utilice el SDK de Python {#use-the-python-sdk}

Utilice `LLMObs.create_prompt()` para crear un prompt e implementar su primera versión en uno o más entornos. Los valores `env_ids` son IDs de entorno de Feature Flags, los cuales puede obtener de la [API de listar entornos][9]:

```python
from ddtrace.llmobs import LLMObs

chat_template = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

created_prompt = LLMObs.create_prompt(
    "customer-support-greeting",
    chat_template,
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

Para publicar e implementar otra versión, utilice `LLMObs.create_prompt_version()`:

```python
created_version = LLMObs.create_prompt_version(
    "customer-support-greeting",
    updated_chat_template,
    env_ids=["<FEATURE_FLAG_ENVIRONMENT_ID>"],
)
```

Trate la creación, el versionado y la implementación de prompts como operaciones de configuración. No las realice durante el inicio de la aplicación ni desde una ruta de solicitud. En tiempo de ejecución, recupere los prompts implementados con `LLMObs.get_prompt()`.

Estos métodos requieren los permisos de API y de clave de aplicación enumerados en [Requisitos previos](#prerequisites).

Utilice `LLMObs.list_prompts()` y `LLMObs.list_prompt_versions()` para inspeccionar prompts gestionados, `LLMObs.update_prompt()` y `LLMObs.update_prompt_version()` para actualizar metadatos o implementaciones, y `LLMObs.delete_prompt()` para eliminar un prompt y todas sus versiones.

### Utilice la API {#use-the-api}

Utilice la API de gestión de prompts para crear, recuperar, actualizar y eliminar prompts y versiones de prompts. Consulte la [referencia de la API de Agent Observability][8] para ver esquemas de puntos de conexión, tipos de medios de solicitud y ejemplos.

## Configuración de versión de prompt {#version-prompt-configuration}

<div class="alert alert-info"><strong>Vista previa:</strong> La configuración de versión de prompt está disponible en Vista previa. Para solicitar acceso, comuníquese con <a href="https://www.datadoghq.com/support/">Datadog Support</a> o con su Gerente de éxito del cliente.</div>

Almacene la configuración junto con su prompt para que pueda actualizar y revertir ambos como una sola versión. Utilice la configuración para:

- **Configuración del modelo**, como `model` y `temperature`.
- **Esquemas de salida estructurada**, como `response_format`.
- **Definiciones de herramientas**, como `tools` y `tool_choice`.

La configuración es un objeto JSON cuyos campos usted define. Su aplicación lee y aplica estos ajustes; Datadog no los aplica automáticamente a las ejecuciones en Playground ni a las llamadas al modelo. No almacene secretos en la configuración.

### Agregue configuración {#add-configuration}

1. En la página {{< ui >}}Prompts{{< /ui >}}, haga clic en {{< ui >}}New Prompt{{< /ui >}} y escriba su plantilla.
2. Haga clic en {{< ui >}}Save Prompt{{< /ui >}}. Ingrese un ID de prompt, expanda {{< ui >}}Configuration (optional){{< /ui >}} y agregue la configuración:

   ```json
   {
     "model": "<MODEL_NAME>",
     "temperature": 0.2
   }
   ```

3. Reemplace `<MODEL_NAME>` con un modelo que admita esta configuración, luego haga clic en {{< ui >}}Create prompt{{< /ui >}}.

El editor requiere un objeto JSON válido. Su texto de ejemplo es un marcador de posición, no una configuración guardada.

{{< img src="llm_observability/monitoring/create-prompt-configuration-document-extractor.png" alt="Cuadro de diálogo Crear nuevo prompt con la sección Configuración opcional expandida, que muestra la configuración del modelo, la temperatura y el formato de respuesta JSON." style="width:100%;" >}}

### Actualizar configuración {#update-configuration}

1. Abra una versión de prompt y seleccione la pestaña {{< ui >}}Configuration{{< /ui >}}.
2. Haga clic en {{< ui >}}Update configuration{{< /ui >}} y edite la configuración.
3. Haga clic en {{< ui >}}Save version{{< /ui >}}. Para inspeccionar la diferencia antes de guardar, haga clic primero en {{< ui >}}Review changes{{< /ui >}}.

{{< img src="llm_observability/monitoring/configuration-tab-app-configured-cropped.png" alt="Pestaña de configuración que muestra la configuración del modelo guardada y el botón Actualizar configuración." style="width:100%;" >}}

Esto crea una versión sin sobrescribir la original. Utilice {{< ui >}}Compare{{< /ui >}} para inspeccionar los cambios de configuración.

Implemente la versión en un entorno cuando esté lista. Las aplicaciones que recuperan ese entorno reciben su plantilla y configuración seleccionadas juntas. Para revertir ambas, implemente una versión anterior. Guardar por sí solo no cambia la versión que sirve un entorno.

### Utilice la configuración en su aplicación {#use-configuration-in-your-application}

Recupere el prompt implementado en el entorno de su aplicación y luego pase su configuración al cliente de su modelo.

**Acceso al SDK de vista previa:** Comuníquese con Datadog Support o con su Customer Success Manager para obtener la versión del SDK que debe usar para su lenguaje.

Estos ejemplos utilizan un prompt llamado `summarizer` con la configuración que se muestra arriba.

{{< tabs >}}
{{% tab "Python" %}}

Acceda a la configuración a través de `prompt.config`:

```python
from ddtrace.llmobs import LLMObs

prompt = LLMObs.get_prompt("summarizer")
config = prompt.config

model = config["model"]
temperature = config.get("temperature", 0.2)
```

Utilice estos valores junto con `prompt.format(...)` en su [llamada al modelo](#retrieve-format-and-use-a-prompt).

{{% /tab %}}
{{% tab "Node.js" %}}

Con `dd-trace` inicializado, acceda a `prompt.config` dentro del código de su aplicación asíncrona:

```javascript
const prompt = await tracer.llmobs.prompts.getPrompt('summarizer')
const config = prompt.config

const model = config.model
const temperature = config.temperature ?? 0.2
```

Pase estos valores a su cliente de modelo existente junto con el prompt formateado.

{{% /tab %}}
{{% tab "Go" %}}

Acceda a `prompt.Config()` en su controlador de solicitudes o función de aplicación:

```go
prompt, err := llmobs.GetPrompt(ctx, "summarizer")
if err != nil {
    return err
}
config := prompt.Config()

model := config["model"].(string)
temperature, ok := config["temperature"].(float64)
if !ok {
    temperature = 0.2
}
```

Pase estos valores a su cliente de modelo junto con los mensajes devueltos por `prompt.Format(...)`.

{{% /tab %}}
{{< /tabs >}}

**Creación de API:** También puede crear prompts y versiones con el [Prompt Management API][8]. Omitir `config` crea una configuración vacía para un nuevo prompt o hereda la configuración más reciente para una nueva versión. Envíe `{}` para borrarlo.

## Uso avanzado {#advanced-usage}

### Servir varias versiones desde un mismo entorno {#serve-multiple-versions-from-one-environment}

Prompt Management se basa en Feature Flags de Datadog. Cada entorno resuelve las llamadas de `get_prompt()` a una versión predeterminada y también puede servir una versión diferente para las llamadas que coincidan con una regla de segmentación.

Por ejemplo, despliegue una versión de prompt inestable para un subconjunto de usuarios en `production` con una regla de segmentación, mientras que todos los demás siguen recibiendo la versión estable:

```python
## DD_ENV=production
prompt = LLMObs.get_prompt("my-prompt")               # resolves to the stable version
prompt = LLMObs.get_prompt("my-prompt", tag="unstable") # resolves to the unstable version
```

Para configurar esto:

1. En la lista de versiones del prompt, coloque el cursor sobre un entorno y haga clic en {{< ui >}}Targeting Rules{{< /ui >}}.

   {{< img src="llm_observability/monitoring/prompt-environment-targeting-rules-link.png" alt="Un panel de entorno que muestra el entorno que actualmente sirve una versión de prompt, con un enlace a Reglas de segmentación." style="width:60%;" >}}

2. Haga clic en {{< ui >}}Add Targeting Rule{{< /ui >}}.

   {{< img src="llm_observability/monitoring/prompt-targeting-rules-default-version.png" alt="El panel Reglas de segmentación para un entorno, que muestra la versión predeterminada que se sirve cuando no hay reglas que coincidan y un botón Agregar regla de segmentación." style="width:100%;" >}}

3. Defina el filtro de la regla. Por ejemplo, haga coincidir las llamadas a `get_prompt()` que pasen el atributo `tag=unstable` y establezca la variante resultante en la versión de prompt inestable.

   {{< img src="llm_observability/monitoring/prompt-targeting-rule-tag-filter.png" alt="El generador de filtros de reglas de segmentación, que hace coincidir un atributo de etiqueta establecido en inestable." style="width:100%;" >}}

4. Guarde la regla. Las llamadas con `tag=unstable` se resuelven en la versión coincidente; todas las demás llamadas recurren a la versión predeterminada.

Pase los atributos a los que hacen referencia sus reglas de segmentación como argumentos de palabra clave a `get_prompt()`. Las llamadas que no pasan un atributo coincidente continúan resolviéndose en la versión predeterminada del entorno.

Para recuperar una versión exacta independientemente de cualquier regla de segmentación, pase `version` como se describe en [Seleccione una versión](#select-a-version).

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/instrument/prompt_tracking
[2]: /es/getting_started/site/
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/account_management/api-app-keys/#application-keys
[5]: /es/llm_observability/instrument/sdk/?tab=python
[6]: /es/llm_observability/instrument/auto_instrumentation/?tab=python
[7]: /es/llm_observability/instrument/sdk/?tab=python#manual-instrumentation
[8]: /es/api/latest/agent-observability/
[9]: /es/api/latest/feature-flags/list-environments/
[10]: /es/llm_observability/configure/prompt_experimentation/
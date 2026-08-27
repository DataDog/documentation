---
description: Cree, versione y recupere prompts gestionados en aplicaciones de Python
  con Prompt Management.
further_reading:
- link: /llm_observability/monitoring/prompt_tracking
  tag: Documentación
  text: Seguimiento de prompts
- link: /llm_observability/playground
  tag: Documentación
  text: Playground
- link: /llm_observability/instrumentation/sdk/?tab=python
  tag: Documentación
  text: Agent Observability SDK
title: Prompt Management
---
{{< callout url="https://www.datadoghq.com/" btn_hidden="true">}}
Prompt Management está en versión preliminar.
{{< /callout >}}

## Descripción general {#overview}

Prompt Management proporciona un registro centralizado para los prompts utilizados por sus aplicaciones de LLM. En lugar de codificar plantillas de prompt en el código de la aplicación o en archivos de configuración, cree, versione y actualice prompts a través de Agent Observability, luego recupérelos en tiempo de ejecución.

La recuperación en tiempo de ejecución es compatible en Python a través del `ddtrace` SDK. La recuperación de prompts y el seguimiento de prompts (Prompt Tracking) son independientes: `LLMObs.get_prompt()` puede recuperar un prompt gestionado sin habilitar Agent Observability, pero Agent Observability debe estar habilitado para crear tramos de LLM y asociarles metadatos de prompt.

Prompt Management funciona junto con [Prompt Tracking][1]. Cuando Agent Observability está habilitado, los prompts gestionados que se pasan directamente a llamadas de LLM compatibles e instrumentadas automáticamente se asocian con los tramos resultantes.

## Requisitos previos {#prerequisites}

- Python 3.9 o posterior.
- Su [sitio de Datadog][2] y un [Datadog API key][3]. La clave de API es necesaria para la recuperación de prompts incluso si las trazas se envían a través del Datadog Agent.
- Una [Datadog Application Key][4] con los permisos `llm_observability_read`, `feature_flag_config_read` y `feature_flag_environment_config_read` para resolver prompts por entorno. Si selecciona una clave de aplicación en Datadog, asegúrese de que tenga estos permisos.
- Para administrar prompts a través de la API o el SDK de Python, la clave de aplicación también requiere los permisos `llm_observability_write` y `feature_flag_config_write`.

## Instale el SDK{#install-the-sdk}

Instale o actualice el paquete `ddtrace` más reciente en el entorno de Python utilizado por su aplicación:

```shell
pip install --upgrade ddtrace
```

## Use un prompt administrado en Python {#use-a-managed-prompt-in-python}

### Integre Prompt Management con un agente de codificación {#integrate-prompt-management-with-a-coding-agent}

Integre un prompt administrado con el agente de codificación de su elección pegando el siguiente prompt:

```text
Follow the instructions at https://docs.datadoghq.com/llm_observability/instrumentation/agentic.md to integrate the Datadog managed prompt <PROMPT_ID> into this application for environment <DEPLOYMENT_ENVIRONMENT> and track its use in Agent Observability.

Prompt variables: <PROMPT_VARIABLES>

When configuring the environment, use the following values:

DD_SITE={{< region-param key="dd_site" code="true" >}}
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
```

Opcionalmente, agregue las credenciales de Datadog seleccionadas para que el agente de codificación pueda configurar y verificar la integración en la misma sesión:

```text
Selected Datadog credentials:

DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>

Treat these values as secrets and handle them according to the linked guide. Do not repeat or expose them.
```

**Nota:** Incluir las claves de API y de aplicación en el prompt es opcional y no es necesario para que el agente de codificación integre la administración de prompts. Inclúyalas solo en una sesión de agente de codificación de confianza.

Después de completar la integración, ejecute su aplicación y active el flujo de LLM modificado. Regrese a la página de prompts para ver el uso; las nuevas llamadas a prompts pueden tardar un minuto en aparecer.

### Configure la recuperación de prompts {#configure-prompt-retrieval}

Proporcione el sitio de Datadog, las credenciales y el entorno de implementación a través del flujo de trabajo de configuración y administración de secretos que ya utiliza su aplicación. Por ejemplo, utilice el archivo de entorno de la aplicación, la configuración de Docker Compose o Kubernetes, la plataforma de implementación o el administrador de secretos. En tiempo de ejecución, las siguientes variables de entorno deben establecerse antes de importar `ddtrace`:

{{< code-block lang="shell" >}}
export DD_SITE="<DATADOG_SITE>"
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_APP_KEY="<DATADOG_APP_KEY>"
export DD_ENV="<DEPLOYMENT_ENVIRONMENT>"
{{< /code-block >}}

`DD_ENV` selecciona el entorno utilizado para resolver la versión del prompt y debe coincidir con un entorno donde el prompt esté implementado.

### Recupere, formatee y utilice un prompt {#retrieve-format-and-use-a-prompt}

Conserve el prompt que ya utiliza su aplicación como respaldo. El respaldo mantiene la aplicación funcionando si ocurren fallas en el registro, la resolución del entorno, la red o el servidor.

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

Si la recuperación falla y no se proporciona un respaldo, `get_prompt()` genera un `ValueError`. Un respaldo no reemplaza la autenticación: `DD_API_KEY` siempre es obligatorio, y `DD_APP_KEY` también es obligatorio cuando `DD_ENV` está configurado.

Los prompts gestionados no pueden hacer referencia a otros prompts gestionados en sus plantillas. Para componer prompts, combínelos en el código de la aplicación o gestione el prompt final orientado al proveedor como un único prompt.

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

Si la aplicación recibe su configuración antes de que comience el proceso de Python, utilice `ddtrace-run`. Por ejemplo, el comando de shell equivalente es:

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

Para un [proveedor instrumentado automáticamente][6], pase el valor devuelto por `prompt.format()` directamente a la llamada del proveedor, como se muestra en [Recuperar, formatear y usar un prompt ](#retrieve-format-and-use-a-prompt). Esto asocia automáticamente el prompt administrado con el tramo resultante.

Copiar, reconstruir o convertir el valor formateado puede descartar sus metadatos de seguimiento de prompts. Por ejemplo, concatenar un prompt del sistema administrado con una pregunta del usuario crea una nueva cadena sin esos metadatos. Use `LLMObs.annotation_context()` para asociar el prompt administrado con el tramo de LLM resultante:

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

`annotation_context()` asocia metadatos con un tramo de LLM creado dentro del contexto; no crea el tramo. Para proveedores que no están instrumentados automáticamente, primero [instrumente manualmente la llamada de LLM][7] para crear un tramo de LLM. Un `annotation_context()` explícito tiene prioridad sobre el seguimiento automático de prompts. Consulte [Seguimiento de prompts][1] para obtener más información.

## Crear y administrar prompts {#create-and-manage-prompts}

Cree prompts y publique nuevas versiones en la {{< ui >}}Prompts{{< /ui >}} UI, a través del SDK de Python o a través de la API.

### Cree un prompt {#create-a-prompt}

#### Promocione un prompt rastreado {#promote-a-tracked-prompt}

Para promocionar un prompt ya rastreado en Agent Observability a un prompt administrado, navegue a la página {{< ui >}}Prompts{{< /ui >}}, abra el prompt y haga clic en {{< ui >}}Register{{< /ui >}}. Luego puede actualizar el prompt en la UI y recuperarlo en tiempo de ejecución.

#### En la UI desde cero {#in-the-ui-from-scratch}

Navegue a la página {{< ui >}}Prompts{{< /ui >}} y haga clic en {{< ui >}}+ New Prompt{{< /ui >}}.

En el Editor de prompts:

1. Agregue uno o más mensajes y asigne a cada uno un rol: {{< ui >}}System{{< /ui >}}, {{< ui >}}User{{< /ui >}} o {{< ui >}}Assistant{{< /ui >}}.
2. Use la sintaxis `{{variable_name}}` en cualquier mensaje para agregar contenido dinámico.
3. Opcional: Haga clic en {{< ui >}}Run{{< /ui >}} para probar el prompt con valores de muestra.
4. Haga clic en {{< ui >}}Save Prompt{{< /ui >}} para abrir el cuadro de diálogo de guardado.

Estructure el prompt de modo que la consulta del usuario y el contexto se inserten como variables:

{{< img src="llm_observability/monitoring/prompt-creation.png" alt="El Playground con un mensaje de System Prompt que dice 'You are a support agent for {{company}}' y un mensaje de User Prompt que contiene {{question}}, con el botón Save Prompt en la parte superior derecha." style="width:100%;" >}}

En el cuadro de diálogo de guardado:

| Campo | Descripción |
|-------|-------------|
| {{< ui >}}Prompt ID{{< /ui >}} | Un identificador único para el prompt, como `customer-support-greeting`. Use este ID para recuperar el prompt con `LLMObs.get_prompt()`. |
| {{< ui >}}Description{{< /ui >}} | Notas opcionales sobre esta versión. |
| {{< ui >}}Deployment{{< /ui >}} | El entorno en el que se implementa esta versión. |

Haga clic en {{< ui >}}Create Prompt{{< /ui >}} para guardar el prompt en el registro.

### Actualice, enumere y elimine prompts {#update-list-and-delete-prompts}

#### En la UI {#in-the-ui}

Abra un prompt en la página {{< ui >}}Prompts{{< /ui >}} para:

- **Cree una nueva versión**: Haga clic en {{< ui >}}Edit{{< /ui >}} y actualice los mensajes en el Editor de prompts.
- **Implemente una versión en otro entorno**: Seleccione una versión y actualice sus entornos {{< ui >}}Deployment{{< /ui >}}.
- **Elimine un prompt**: Seleccione {{< ui >}}Delete{{< /ui >}} en el menú de opciones del prompt. Esto elimina el prompt y su historial de versiones del registro.

### Utilice el SDK de Python {#use-the-python-sdk}

Utilice `LLMObs.create_prompt()` para crear un prompt e implementar su primera versión en uno o más entornos. Los valores `env_ids` son IDs de entorno de Feature Flags, que puede obtener de la [API de listar entornos][9]:

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

Trate la creación, el versionado y la implementación de prompts como operaciones de configuración. No los realice durante el inicio de la aplicación ni desde una ruta de solicitud. En tiempo de ejecución, recupere los prompts implementados con `LLMObs.get_prompt()`.

Estos métodos requieren los permisos de API y clave de aplicación enumerados en [Requisitos previos](#prerequisites).

Utilice `LLMObs.list_prompts()` y `LLMObs.list_prompt_versions()` para inspeccionar prompts gestionados, `LLMObs.update_prompt()` y `LLMObs.update_prompt_version()` para actualizar metadatos o implementaciones, y `LLMObs.delete_prompt()` para eliminar un prompt y todas sus versiones.

### Utilice la API {#use-the-api}

Utilice el Prompt Management API para crear, recuperar, actualizar y eliminar prompts y versiones de prompts. Consulte la [referencia de la LLM Observability API][8] para ver esquemas de endpoints, tipos de medios de solicitud y ejemplos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/monitoring/prompt_tracking
[2]: /es/getting_started/site/
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/account_management/api-app-keys/#application-keys
[5]: /es/llm_observability/instrumentation/sdk/?tab=python
[6]: /es/llm_observability/instrumentation/auto_instrumentation/?tab=python
[7]: /es/llm_observability/instrumentation/sdk/?tab=python#manual-instrumentation
[8]: /es/api/latest/llm-observability/
[9]: /es/api/latest/feature-flags/list-environments/
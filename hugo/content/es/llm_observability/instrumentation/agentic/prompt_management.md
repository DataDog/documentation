---
title: Gestión de Prompts Integración Agentic
---
## Objetivo {#goal}

Utilice un prompt gestionado existente de Datadog o promueva un prompt local de una aplicación, conserve el comportamiento existente de la aplicación como alternativa y realice un seguimiento del uso del prompt gestionado en Agent Observability.

## Seleccione el flujo de trabajo {#select-the-workflow}

- **Utilice un prompt gestionado existente:** Si la solicitud del usuario incluye un ID de prompt, un entorno y nombres de variables, utilícelos sin preguntar si desea habilitar la gestión de prompts nuevamente.
- **Promueva un prompt local:** Utilice este flujo de trabajo solo después de que el usuario acepte a través de la guía principal de [Agentic Instrumentation](/llm_observability/instrumentation/agentic). Promueva el prompt de chat local seleccionado, implemente su primera versión en el entorno solicitado y luego integre la recuperación en tiempo de ejecución.

## Directrices {#guidelines}

1. La recuperación en tiempo de ejecución de la gestión de prompts solo es compatible con aplicaciones Python. Si la aplicación de destino no es Python, no añada la recuperación en tiempo de ejecución. Regrese a la guía principal de [Agentic Instrumentation](/llm_observability/instrumentation/agentic) e instrumente los prompts seleccionados con seguimiento de prompts estructurado en su lugar. No implemente un cliente HTTP directo ni reescriba la aplicación en Python.
2. Inspeccione la aplicación antes de modificarla. Identifique su gestor de paquetes, flujo de trabajo de configuración y gestión de secretos, comando de inicio, instrumentación de Datadog existente, proveedor de LLM, construcción de prompts y sitio de llamada al proveedor.
3. Para un prompt gestionado existente, utilice el ID del prompt, el entorno y los nombres de las variables proporcionados en el prompt del usuario sin pedirle que los confirme. Para una promoción, derive un ID de prompt descriptivo a partir del propósito del prompt seleccionado y pídale al usuario que lo confirme antes de crear el prompt.
4. Si hay varios sitios de llamada a prompts o proveedores plausibles, pregúntele al usuario cuál modificar y espere una respuesta antes de editar.
5. Conserve el gestor de paquetes, el flujo de trabajo de configuración, el comando de inicio, el proveedor, el modelo y el comportamiento empresarial existentes de la aplicación. El uso de variables de entorno ambientales existentes, como `os.getenv()`, es una convención de configuración incluso cuando no existe `.env` o un archivo de configuración. Extienda esa convención sin preguntar. Si el repositorio no tiene una convención aplicable, pregunte al usuario qué enfoque utilizar y espere una respuesta en lugar de introducir uno.
6. Mantenga la recuperación de prompts gestionados en el límite de construcción de prompts existente de la aplicación. No mueva la construcción de prompts al sitio de llamada del proveedor ni la duplique allí cuando un helper, biblioteca u otro componente ya la gestione.
7. Cuando se componen múltiples fragmentos de prompt locales en una llamada de proveedor, promueva la lista de mensajes final orientada al proveedor como un único prompt gestionado. No cree referencias de prompts gestionados anidadas. Si el usuario desea explícitamente que un fragmento sea gestionado de forma independiente, preserve la composición existente y rastree ese fragmento explícitamente.
8. Siga los límites de propiedad del repositorio. Si el repositorio extraído es una biblioteca y una aplicación host no disponible posee la configuración de tiempo de ejecución, secretos, instrumentación o inicio, implemente de todos modos la dependencia del paquete, la construcción del prompt y los cambios de llamada al proveedor propiedad de la biblioteca. No invente configuraciones propiedad del host, inicialice el rastreo dentro de la biblioteca ni reclame verificación en vivo. Informe el trabajo exacto del lado del host que queda pendiente. Solicite el host solo cuando un cambio de código requerido no sea propiedad del repositorio extraído.
9. Trate cualquier API o clave de aplicación suministrada en el prompt del usuario como un secreto. No lo confirme ni lo repita en el código fuente, la configuración rastreada, la documentación, los registros o la respuesta final. Configure las credenciales suministradas a través de la configuración local no confirmada existente de la aplicación o el flujo de trabajo de gestión de secretos, y no requiera que el usuario las ingrese de nuevo. Nunca coloque valores de credenciales en argumentos de comando o patrones de búsqueda. Verifique que los secretos no sean rastreados utilizando rutas de archivo, `git status` y `git diff`, sin buscar valores de credenciales literales. Cuando la tarea se suministró directamente en la conversación, no imprima ni vuelva a leer una copia local que contenga credenciales.
10. Nunca cree, actualice ni implemente un managed prompt desde el inicio de la aplicación o una ruta de solicitud. La promoción es una operación de configuración única realizada por el agente de codificación después de que el usuario acepta.

## Instale el SDK de Prompt Management {#install-the-prompt-management-sdk}

Utilice el gestor de paquetes existente de la aplicación para instalar o actualizar a la versión `ddtrace` más reciente en el entorno de Python de la aplicación. Haga que la instalación sea repetible desde un entorno limpio y conserve las convenciones de gestión de dependencias existentes de la aplicación.

## Promueva un prompt local {#promote-a-local-prompt}

Omita esta sección cuando el usuario proporcione un managed prompt ID existente.

1. En el límite de construcción de prompt seleccionado, separe la plantilla de mensaje de chat estática de sus valores dinámicos. Utilice `{{variable}}` placeholders in the template and keep a value available for every variable.
2. Propose a stable, descriptive prompt ID based on the prompt's purpose, then wait for the user to confirm it. If the deployment environment was not supplied, ask which environment to use at the same time.
3. Before creating the prompt, obtain a Datadog API key and a one-time application key with the `llm_observability_write`, `feature_flag_config_write`, and `feature_flag_environment_config_read` permissions. If the user did not already provide a suitable application key, ask for one. Do not add this setup credential to the application's runtime configuration.
4. Follow the [List environments API](/api/latest/feature-flags/list-environments/) and call `GET /api/v2/feature-flags/environments?dd_env=<URL_ENCODED_DD_ENV>`. The `dd_env` filter matches `DD_ENV` exactly against each environment's `attributes.queries`.
   - Si coincide exactamente un entorno, utilice su `data[].id` como el ID de entorno de Feature Flags.
   - Si coincide más de un entorno, pregunte al usuario cuál utilizar. No adivine.
   - Si no coincide ningún entorno, explique que el `DD_ENV` actual de la aplicación no está asignado a un entorno de Feature Flags y pregunte si el usuario desea que cree uno. No solicite un `DD_ENV` diferente ni cree un entorno sin aprobación explícita.
     - Si el usuario está de acuerdo, solicite el nombre para mostrar del entorno y si representa a producción. Luego siga la [API de creación de un entorno](/api/latest/feature-flags/create-an-environment/) para crear un entorno cuyo `queries` contenga el valor `DD_ENV` exacto. Intente la solicitud con la clave de aplicación proporcionada. Si Datadog la rechaza porque a la clave le falta permiso, solicite al usuario que otorgue `feature_flag_environment_config_write` o proporcione una clave de aplicación con ese permiso, luego vuelva a intentarlo. Deje la aprobación de Feature Flag deshabilitada a menos que el usuario la solicite explícitamente, y utilice el `data.id` devuelto.
     - Si el usuario rechaza, no implemente el prompt gestionado en otro entorno. Explique que debe existir un entorno de Feature Flags que coincida con el `DD_ENV` de la aplicación antes de que el prompt pueda implementarse allí.
5. Verifique si hay una coincidencia exacta de ID de prompt con `LLMObs.list_prompts()`. Si el ID ya pertenece a un prompt gestionado, no lo sobrescriba: pregunte si desea integrar ese prompt o elegir un ID diferente. Un prompt rastreado que aún no está gestionado puede promoverse utilizando su ID existente.
6. Cree e implemente la primera versión en una sola operación con `env_ids`:

```python
from ddtrace.llmobs import LLMObs

created_prompt = LLMObs.create_prompt(
    "<PROMPT_ID>",
    chat_template,
    env_ids=[environment_id],
)
```

Utilice este método público de SDK para la promoción. Si el SDK instalado no acepta `env_ids`, informe que no admite la implementación del prompt durante la creación. No llame a métodos privados de SDK ni a la API HTTP de Gestión de Prompts como solución alternativa.

Si la creación informa un conflicto, enumere los prompts nuevamente. Integre el prompt solo si el ID confirmado ahora pertenece al prompt gestionado previsto; de lo contrario, pídale al usuario que elija un ID diferente. No actualice ni reemplace silenciosamente un prompt gestionado existente.

Conserve el valor `created_prompt["id"]` devuelto. Este es el UUID del prompt utilizado por la página de prompt de Datadog. Determine el host de la aplicación de Datadog a partir de `DD_SITE`: utilice `app.datadoghq.com` para `datadoghq.com`, `app.datadoghq.eu` para `datadoghq.eu`, `app.ddog-gov.com` para `ddog-gov.com`, y el valor `DD_SITE` en sí para otros sitios compatibles. Incluya `https://<APPLICATION_HOST>/llm/prompts/<PROMPT_UUID>` en la respuesta final después de una promoción exitosa. Si no se puede determinar el host de la aplicación de forma segura, identifique el prompt creado por su ID de prompt y pídale al usuario que lo abra desde la Gestión de Prompts en lugar de adivinar una URL.

Después de que la promoción tenga éxito, continúe con la configuración y recuperación en tiempo de ejecución a continuación. La clave de aplicación de escritura única puede eliminarse; la recuperación en tiempo de ejecución debe utilizar una clave de aplicación de privilegios mínimos con los permisos de lectura descritos en la siguiente sección.

## Configure la aplicación {#configure-the-application}

Haga que los siguientes valores estén disponibles antes de que `ddtrace` se inicialice, utilizando el flujo de trabajo de configuración y gestión de secretos existente de la aplicación:

```text
DD_SITE=<DATADOG_SITE>
DD_API_KEY=<DATADOG_API_KEY>
DD_APP_KEY=<DATADOG_APP_KEY>
DD_ENV=<DEPLOYMENT_ENVIRONMENT>
DD_LLMOBS_ENABLED=1
```

Conserve la identidad existente de la aplicación. Si `DD_SERVICE` o `DD_LLMOBS_ML_APP` ya están configurados, mantenga ese valor y no cambie el nombre de la aplicación como parte de esta integración. Si ninguno está configurado, establezca `DD_SERVICE` en un nombre lógico basado en el nombre existente de la aplicación, servicio o proyecto.

`DD_API_KEY` es necesario para la recuperación del prompt. Cuando `DD_ENV` está configurado, `DD_APP_KEY` es necesario para resolver la versión del prompt implementada en ese entorno. La clave de aplicación debe tener los permisos `llm_observability_read`, `feature_flag_config_read` y `feature_flag_environment_config_read`.

Si la aplicación no envía datos a través de un Datadog Agent, establezca también:

```text
DD_LLMOBS_AGENTLESS_ENABLED=1
```

Si la configuración está disponible antes del inicio del proceso, conserve el flujo de trabajo de inicio existente y utilice `ddtrace-run` si es necesario para la instrumentación automática. Si la aplicación carga la configuración en Python, cárguela antes de importar `ddtrace.auto`, luego ejecute el comando de Python normal de la aplicación. No combine la carga de configuración a nivel de aplicación con `ddtrace-run`.

Al documentar un inicio basado en shell, confirme que la configuración llegue al proceso de Python secundario exportando las variables, asignándolas en línea en el comando de inicio o conservando el mecanismo existente de la aplicación. No presente asignaciones de shell simples y no exportadas como una configuración ejecutable.

Una clave de aplicación con capacidad de escritura utilizada para promover un prompt es una credencial de configuración de una sola vez. No la agregue a la configuración de tiempo de ejecución de la aplicación a menos que el usuario la haya seleccionado explícitamente para su uso en tiempo de ejecución y también tenga los permisos de lectura requeridos. De lo contrario, utilice una clave de aplicación de tiempo de ejecución separada y con los privilegios mínimos.

Para una integración de prompt administrado existente, si el prompt del usuario no incluye credenciales, no le pida al usuario que las proporcione. Complete las referencias de código y configuración donde sea posible, luego informe que no se pudo verificar la resolución y el seguimiento del prompt en vivo. La promoción es diferente: es una operación de configuración aprobada por el usuario y requiere las credenciales con capacidad de escritura descritas en [Promover un prompt local](#promote-a-local-prompt).

## Recuperar y formatear el prompt administrado {#retrieve-and-format-the-managed-prompt}

1. Utilice el ID del prompt y los nombres de variables proporcionados para un prompt administrado existente sin pedirle al usuario que los confirme. Para un prompt promocionado, utilice el ID y las variables confirmadas durante la promoción. Si falta metadatos requeridos, solicítelos en lugar de adivinarlos.
2. Confirme que cada variable de prompt administrado tenga un valor significativo disponible en el límite de construcción de prompt seleccionado. Si la aplicación no puede suministrar uno, pregunte al usuario cómo mapearlo y espere una respuesta.
3. Importe `LLMObs` desde `ddtrace.llmobs` en el límite de construcción de prompt existente.
4. Reemplace la construcción de prompt existente allí con `LLMObs.get_prompt()` utilizando el ID de prompt suministrado por el usuario.
5. Conserve el prompt de chat existente de la aplicación como una lista de mensajes `fallback`.
6. Exprese los marcadores de posición de respaldo dinámicos con `{{variable}}` syntax, using the exact supplied variable names. Do not leave Python-style `{variable}` placeholders in the fallback.
7. Call `prompt.format()` con valores para cada variable suministrada, luego pase los mensajes formateados a la llamada del proveedor existente sin cambiar el proveedor, el modelo o el comportamiento no relacionado.

Por ejemplo:

```python
from ddtrace.llmobs import LLMObs

default_messages = [
    {"role": "system", "content": "You are a support agent for {{company}}."},
    {"role": "user", "content": "{{question}}"},
]

variables = {
    "company": company,
    "question": question,
}

prompt = LLMObs.get_prompt(
    "<PROMPT_ID>",
    fallback=default_messages,
)
messages = prompt.format(**variables)
```

## Rastrear el uso del prompt {#track-prompt-usage}

Cuando el valor formateado se pasa directamente a un proveedor compatible con instrumentación automática, conserve ese valor sin cambios para que Datadog pueda asociar automáticamente el prompt administrado con el tramo de LLM resultante.

Si la aplicación copia, reconstruye, concatena, muta o transforma de otro modo el valor formateado antes de la llamada al proveedor, envuelva esa llamada con `LLMObs.annotation_context()` y pase las mismas variables a `prompt.to_annotation_dict()` que se pasaron a `prompt.format()`. Trate la acción de añadir o extender una lista de mensajes de chat formateados con mensajes de usuario, respuestas del asistente, llamadas a herramientas o resultados de herramientas (incluso a través de un bucle de múltiples turnos) como una transformación, y mantenga activo el contexto de anotación para cada llamada al proveedor que utilice esa conversación.

Antes de completar la integración, inspeccione el flujo de datos real desde `prompt.format()` hasta cada llamada al proveedor: si algo en el proceso copia, reconstruye, concatena, muta o convierte el valor formateado, utilice `annotation_context()`.

```python
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

`annotation_context()` no crea un tramo de LLM. Asegúrese de que el proveedor esté instrumentado automáticamente o conserve la instrumentación manual de tramo de LLM existente de la aplicación.

## Verifique la integración {#verify-the-integration}

1. Utilice el flujo de trabajo existente de la aplicación para realizar comprobaciones locales que no realicen solicitudes externas.
2. No consulte Datadog ni utilice métodos de lectura de tramo del SDK para verificar el seguimiento de prompts.
3. Si la verificación requiere ejecutar la aplicación, realizar una solicitud al proveedor, incurrir en costos, emitir telemetría o causar otro efecto secundario externo, no finalice la tarea simplemente proporcionando el comando de ejecución. Solicite la aprobación para ese comando exacto a través del mecanismo de aprobación del entorno de codificación, o pregúntele al usuario directamente y espere la confirmación. Una aprobación de ejecución de herramienta cuenta como confirmación.
4. Si el usuario autoriza la ejecución, utilice el flujo de trabajo de ejecución normal de la aplicación y ejecute la llamada al proveedor modificada. Si el usuario rechaza, proporciónele el comando o la acción exacta necesaria para hacerlo.
5. En la respuesta final, indique si la aplicación fue ejecutada. Después de una promoción, incluya el enlace directo a la página de prompt construido a partir del UUID devuelto por `LLMObs.create_prompt()`. De lo contrario, incluya un enlace directo a la página de prompt cuando se conozcan su UUID y el host de la aplicación. Pídale al usuario que active el flujo de LLM modificado si es necesario, regrese a esa página de prompt en Datadog y permita un breve retraso para que aparezca el uso del prompt.
6. Informe cualquier falla de autenticación, autorización, recuperación o seguimiento con precisión. No afirme que el seguimiento del lado de Datadog fue verificado a menos que el usuario lo confirme.
---
code_lang: python
code_lang_weight: 20
description: Capacidades y límites de las expresiones de Python en App Builder
title: Expresiones de Python
type: multi-code-lang
---
La acción de función de Python le permite escribir scripts de Python personalizados para transformaciones de datos, parseo y enriquecimiento de carga útil dentro de sus flujos de trabajo.

## Entorno de Python{#python-environment}

La acción de función de Python se ejecuta en un entorno de ejecución restringido con las siguientes características:

{{< workflow-python-action-characteristics >}}

## Estructura del script{#script-structure}

Todos los scripts de Python deben definir una función `main` que acepte un parámetro `ctx` de tipo `Context`. Por ejemplo:

```python
from execution_context import Context

def main(*, ctx: Context):
  # Use ctx to access Trigger or Steps data
  workflow_name = ctx["WorkflowName"]
  return f"Running workflow {workflow_name!r}"
```

El objeto `ctx` proporciona acceso a todas las variables de contexto del flujo de trabajo, similar a la variable `$` en las expresiones de JavaScript. Utilice el acceso de estilo diccionario (por ejemplo, `ctx["Steps"]["Step_name"]["variable"]`) para hacer referencia a valores de pasos anteriores.

## Agregar una acción de función de Python{#add-a-python-function-action}

En el lienzo del flujo de trabajo: 
1. Haga clic en {{< ui >}}\+{{< /ui >}} para agregar un paso al flujo de trabajo. 
1. Busque `Python`. 
1. Seleccione la acción de Python para agregarla a su flujo de trabajo.

## Escribir scripts de Python con IA{#write-python-scripts-with-ai}

Puede usar Bits AI para ayudar a escribir scripts de Python dentro de un paso del flujo de trabajo.

Para escribir un script con Bits AI:

1. Agregue un paso a su flujo de trabajo.
1. En la sección {{< ui >}}Inputs{{< /ui >}}, haga clic en {{< ui >}}Write Code with AI{{< /ui >}}.
1. Ingrese un prompt personalizado o seleccione uno de los prompts de ejemplo. 
1. Opcionalmente, haga clic en {{< ui >}}Test script{{< /ui >}} para generar una vista previa del paso del flujo de trabajo. 
1. Para guardar el script, haga clic en {{< ui >}}Accept changes{{< /ui >}}. Para continuar editando el script, haga clic en {{< ui >}}Reject changes{{< /ui >}}.
1. Haga clic en {{< ui >}}X{{< /ui >}} para cerrar el cuadro de diálogo de IA. 
1. Ingrese un {{< ui >}}Description{{< /ui >}}. 
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Ejemplos de scripts {#script-examples}

### Analizar y transformar datos JSON {#parse-and-transform-json-data}

Este ejemplo analiza una cadena JSON de un paso anterior y extrae campos específicos.

```python
from execution_context import Context
import json

def main(*, ctx: Context):
    # Get JSON string from previous step
    json_string = ctx["Steps"]["Get_data"]["output"]

    # Parse and transform
    data = json.loads(json_string)
    return {
        "user_ids": [user["id"] for user in data["users"]],
        "total_count": len(data["users"])
    }
```

### Trabajar con fechas y marcas de tiempo {#work-with-dates-and-timestamps}

Este ejemplo utiliza la biblioteca python-dateutil para realizar cálculos de fechas.

```python
from execution_context import Context
from dateutil import parser, relativedelta
from datetime import datetime

def main(*, ctx: Context):
    # Parse a date string
    start_date = parser.parse(ctx["Trigger"]["date_string"])

    # Calculate date 30 days in the future
    future_date = start_date + relativedelta.relativedelta(days=30)

    return {
        "start": start_date.isoformat(),
        "end": future_date.isoformat(),
        "days_difference": 30
    }
```

### Operaciones criptográficas {#cryptographic-operations}

Este ejemplo utiliza la biblioteca rsa para cifrar un mensaje.

```python
from execution_context import Context
import rsa
import base64

def main(*, ctx: Context):
    # Get message from workflow context
    message = ctx["Steps"]["Compose_message"]["text"]

    # Generate RSA key pair
    (public_key, private_key) = rsa.newkeys(512)

    # Encrypt message
    encrypted = rsa.encrypt(message.encode(), public_key)

    return {
        "encrypted_message": base64.b64encode(encrypted).decode(),
        "public_key": public_key.save_pkcs1().decode()
    }
```
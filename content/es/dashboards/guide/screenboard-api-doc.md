---
aliases:
- /es/graphing/faq/screenboard-api-doc
- /es/graphing/guide/screenboard-api-doc
title: API screenboard
---

<div class="alert alert-danger">
Este endpoint está obsoleto. Utiliza en su lugar el <a href="https://docs.datadoghq.com/api/v1/dashboards/">nuevo endpoint dashboard </a>.
</div>

El endpoint `screenboard` permite crear, actualizar, eliminar y consultar screenboards mediante programación.

## Crear un screenboard

### Firma

`POST https://api.datadoghq.com/api/v1/screen`

### Argumentos

* **`board_title`** [*required* (requerido)]:
    El nombre del dashboard.
* **`description`** (descripción) [*opcional*, *por defecto*=**Ninguno**]:
    Una descripción del contenido de dashboard.
* **`widgets`** [*required* (requerido)]:
    Una lista de definiciones de widget. Para obtener una definición de widget, utiliza la *pestaña JSON* en la IU de la configuración de widget.
* **`template_variables`** [*opcional*, *default*=**None**]:
    Una lista de variables de plantilla para utilizar la plantilla dashboard.
* **`read_only`** [*opcional*, *default*=**False**]:
    El estado de solo lectura del screenboard.

### Ejemplos

{{< tabs >}}
{{% tab "Python" %}}

```python
desde inicializar importación datadog, api

opciones = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

inicializar(**opciones)

board_title = "Mi screenboard"
descripción = "Un screenboard informativo."
ancho = 1024
widgets = [{
    "tipo": "imagen",
    "altura": 20,
    "ancho": 32,
    "y": 7,
    "x": 32,
    "url": "https://path/to/image.jpg"
}]
template_variables = [{
    "nombre": "host1",
    "prefijo": "host",
    "por defecto": "host:my-host"
}]

api.Screenboard.create(board_title=board_title,
                       description=description,
                       widgets=widgets,
                       template_variables=template_variables,
                       width=width)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
requerir 'rubygems'
requerir 'dogapi'

api_key='<DATADOG_API_KEY>'
app_key='<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board = {
    "ancho" => 1024,
    "altura" => 768,
    "board_title" => "dogapi test",
    "widgets" => [
        {
          "tipo" => "imagen",
          "altura" => 20,
          "ancho" => 32,
          "y" => 7,
          "x" => 32,
          "url" => "https://path/to/image.jpg"
        }
    ]
}

resultado = dog.create_screenboard(board)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -X POST -H "Tipo de contenido: aplicación/json" \
-d '{
        "ancho": 1024,
        "altura": 768,
        "board_title": "dogapi test",
        "widgets": [
            {
              "tipo": "imagen",
              "altura": 20,
              "ancho": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## Actualizar a screenboard

### Firma

`PONER https://api.datadoghq.com/api/v1/screen/<SCREEENBOARD_ID>`

### Argumentos

* **`board_title`** [*required* (requerido)]:
    El nombre del dashboard.
* **`description`** (descripción) [*opcional*, *default*=**None**]:
    Una descripción del contenido de dashboard.
* **`widgets`** [*required* (requerido)]:
    Una lista de definiciones widget. Para obtener una definición de widget, utiliza la *pestaña JSON* en la IU de la configuración de widget.
* **`template_variables`** [*optional* (opcional), *default*=**None**]:
    Una lista de variables de plantilla para utilizar la plantilla dashboard.
* **`width`** [*optional* (opcional), *default*=**None**]:
    Ancho de screenboard en píxeles
* **`height`** (altura) [*optional* (opcional), *default*=**None**]:
    Altura de screenboard en píxeles.
* **`read_only`** [*optional* (opcional), *default*=**False**]:
    El estado de solo lectura del screenboard.

### Ejemplos

{{< tabs >}}
{{% tab "Python" %}}

```python
desde inicializar importación datadog, api

opciones = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

inicializar(**opciones)
board_id = 2551
board_title = "Mi screenboard"
descripción = "Un screenboard informativo."
ancho = 1024
widgets = [{
    "tipo": "imagen",
    "altura": 20,
    "ancho": 32,
    "y": 7,
    "x": 32,
    "url": "https://path/to/image.jpg"
}]
template_variables = [{
    "nombre": "host1",
    "prefijo": "host",
    "por defecto": "host:my-host"
}]

api.Screenboard.update(board_id,
                       board_title=board_title,
                       description=description,
                       widgets=widgets,
                       template_variables=template_variables,
                       width=width)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
requerir 'rubygems'
requerir 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = 7953
board = {
    "ancho" => 1024,
    "altura" => 768,
    "board_title" => "dogapi test",
    "widgets" => [{
        "tipo" => "imagen",
        "altura" => 20,
        "ancho" => 32,
        "y" => 7,
        "x" => 32,
        "url" => "https://path/to/image.jpg"
    }]
}

resultado = dog.update_screenboard(board_id, board)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -X PONER -H "Tipo de contenido: aplicaciones/json" \
-d '{
        "ancho": 1024,
        "altura": 768,
        "board_title": "dogapi test",
        "widgets": [
            {
              "tipo": "imagen",
              "altura": 20,
              "ancho": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"

```

{{% /tab %}}
{{< /tabs >}}

## Eliminar un screenboard

Eliminar un screenboard existente .
*Este endpoint no toma argumentos JSON.*

### Firma

`ELIMINAR https://api.datadoghq.com/api/v1/screen/<SCREEENBOARD_ID>`

### Argumentos

*Este endpoint no toma argumentos JSON.*

### Ejemplos

{{< tabs >}}
{{% tab "Python" %}}

```python
desde inicializar importación datadog, api

opciones = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

inicializar (**opciones)

api.Screenboard.delete(811)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
requerir 'rubygems'
requerir 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = '2534'
resultado = dog.delete_screenboard(board_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
board_id=2471

# Crear un screenboard para eliminar
board_id=$(curl -X POST -H "Tipo de contenido: aplicación/json" \
-d '{
        "ancho": 1024,
        "altura": 768,
        "board_title": "tests dogapi",
        "widgets": [
            {
              "tipo": "imagen",
              "altura": 20,
              "ancho": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
  }' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}" | jq '.id')

curl -X ELIMINAR\
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## Consigue un screenboard

Obtener una definición existente de screenboard.

### Firma

`OBTENER https://api.datadoghq.com/api/v1/screen/<SCREEENBOARD_ID>`

### Argumentos

*Este endpoint no toma argumentos JSON.*

### Ejemplos

{{< tabs >}}
{{% tab "Python" %}}

```python
desde inicializar importación datadog, api

opciones = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

inicializar (**opciones)

api.Screenboard.get(811)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
requerir 'rubygems'
requerir 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = '6334'
resultado = dog.get_screenboard(board_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
board_id=6334

# Crear un screenboard para obtener
board_id=$(curl -X POST -H "Tipo de contenido: aplicación/json" \
-d '{
        "ancho": 1024,
        "altura": 768,
        "board_title": "tests dogapi",
        "widgets": [
            {
              "tipo": "imagen",
              "altura": 20,
              "ancho": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
  }' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}" | jq '.id')

curl -X OBTENER\
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## Obtén todos los screenboards

Obtén todas las definiciones de tus screenboards.

### Firma

`OBTENER https://api.datadoghq.com/api/v1/screen`

### Argumentos

*Este endpoint no toma argumentos JSON.*

### Ejemplos

{{< tabs >}}
{{% tab "Python" %}}

```python
desde inicializar importación datadog, api

opciones = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

inicializar (**opciones)

api.Screenboard.get_all()

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
requerir 'rubygems'
requerir 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

resultado = dog.get_all_screenboards()
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<Datadog_API_KEY>
app_key=<Datadog_APPLICATION_KEY>

curl -X OBTENER "https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&amp;application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}
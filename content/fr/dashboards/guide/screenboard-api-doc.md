---
title: Documentation de l'API Screenboard
kind: guide
aliases:
  - /fr/graphing/faq/screenboard-api-doc
  - /fr/graphing/guide/screenboard-api-doc
---
<div class="alert alert-danger">
Cet endpoint est obsolète. Utilisez plutôt le <a href="https://docs.datadoghq.com/api/v1/dashboards/">nouvel endpoint Dashboards</a>.
</div>

L'endpoint `Screenboard` vous permet de programmer la création, la mise à jour, la suppression et la récupération de screenboards. [En savoir plus sur les screenboards][1].

## Créer un screenboard

### Signature

`POST https://api.datadoghq.com/api/v1/screen`

### Arguments

* **`board_title`** [*obligatoire*] :
    le nom du dashboard.
* **`description`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    la description du contenu du dashboard.
* **`widgets`** [*obligatoire*] :
    la liste des définitions de widget. Pour obtenir une définition de widget, utilisez l'*onglet JSON* dans l'IU de configuration de widget.
* **`template_variables`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    la liste des template variables utilisables pour la création de modèles de dashboard.
* **`read_only`** [*facultatif*, *défaut*=**False**] :
    indique si le screenboard est en lecture seule ou non.

### Exemples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<CLÉ_API_DATADOG>',
    'app_key': '<CLÉ_APPLICATION_DATADOG>'
}

initialize(**options)

board_title = "Mon Screenboard"
description = "Un screenboard informatif."
width = 1024
widgets = [{
    "type": "image",
    "height": 20,
    "width": 32,
    "y": 7,
    "x": 32,
    "url": "https://path/to/image.jpg"
}]
template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
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
require 'rubygems'
require 'dogapi'

api_key='<CLÉ_API_DATADOG>'
app_key='<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

board = {
    "width" => 1024,
    "height" => 768,
    "board_title" => "dogapi test",
    "widgets" => [
        {
          "type" => "image",
          "height" => 20,
          "width" => 32,
          "y" => 7,
          "x" => 32,
          "url" => "https://chemin/vers/image.jpg"
        }
    ]
}

result = dog.create_screenboard(board)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>

curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi test",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://chemin/vers/image.jpg"
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## Mettre à jour un screenboard

### Signature

`PUT https://api.datadoghq.com/api/v1/screen/<ID_SCREENBOARD>`

### Arguments

* **`board_title`** [*obligatoire*] :
    le nom du dashboard.
* **`description`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    la description du contenu du dashboard.
* **`widgets`** [*obligatoire*] :
    la liste des définitions de widget. Pour obtenir une définition de widget, utilisez l'*onglet JSON* dans l'IU de configuration de widget.
* **`template_variables`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    la liste des template variables utilisables pour la création de modèles de dashboard.
* **`width`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    largeur du screenboard en pixels.
* **`height`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    hauteur du screenboard en pixels.
* **`read_only`** [*facultatif*, *défaut*=**False**] :
    indique si le screenboard est en lecture seule ou non.

### Exemples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<CLÉ_API_DATADOG>',
    'app_key': '<CLÉ_APPLICATION_DATADOG>'
}

initialize(**options)
board_id = 2551
board_title = "Mon Screenboard"
description = "Un screenboard informatif."
width = 1024
widgets = [{
    "type": "image",
    "height": 20,
    "width": 32,
    "y": 7,
    "x": 32,
    "url": "https://chemin/vers/image.jpg"
}]
template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
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
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = 7953
board = {
    "width" => 1024,
    "height" => 768,
    "board_title" => "dogapi test",
    "widgets" => [{
        "type" => "image",
        "height" => 20,
        "width" => 32,
        "y" => 7,
        "x" => 32,
        "url" => "https://chemin/vers/image.jpg"
    }]
}

result = dog.update_screenboard(board_id, board)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>

curl -X PUT -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi test",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://chemin/vers/image.jpg"
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"

```

{{% /tab %}}
{{< /tabs >}}

## Supprimer un screenboard

Supprimez un [screenboard][1] existant.
*Cet endpoint ne prend aucun argument JSON.*

### Signature

`DELETE https://api.datadoghq.com/api/v1/screen/<ID_SCREENBOARD>`

### Arguments

*Cet endpoint ne prend aucun argument JSON*.

### Exemples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<CLÉ_API_DATADOG>',
    'app_key': '<CLÉ_APPLICATION_DATADOG>'
}

initialize(**options)

api.Screenboard.delete(811)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = '2534'
result = dog.delete_screenboard(board_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>
board_id=2471

# Créer un screenboard à supprimer
board_id=$(curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi tests",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://chemin/vers/image.jpg"
            }
        ]
  }' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}" | jq '.id')

curl -X DELETE \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## Récupérer un screenboard

Récupérez la définition d'un screenboard existant.

### Signature

`GET https://api.datadoghq.com/api/v1/screen/<ID_SCREENBOARD>`

### Arguments

*Cet endpoint ne prend aucun argument JSON*.

### Exemples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<CLÉ_API_DATADOG>',
    'app_key': '<CLÉ_APPLICATION_DATADOG>'
}

initialize(**options)

api.Screenboard.get(811)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = '6334'
result = dog.get_screenboard(board_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>
board_id=6334

# Créer un screenboard à récupérer
board_id=$(curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi tests",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://chemin/vers/image.jpg"
            }
        ]
  }' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}" | jq '.id')

curl -X GET \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## Récupérer tous les screenboards

Récupérez toutes les définitions de vos [screenboards][1].

### Signature

`GET https://api.datadoghq.com/api/v1/screen`

### Arguments

*Cet endpoint ne prend aucun argument JSON*.

### Exemples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<CLÉ_API_DATADOG>',
    'app_key': '<CLÉ_APPLICATION_DATADOG>'
}

initialize(**options)

api.Screenboard.get_all()

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

result = dog.get_all_screenboards()
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>

curl -X GET "https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

[1]: /fr/dashboards/screenboard/
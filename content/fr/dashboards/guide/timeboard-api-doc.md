---
title: Documentation de l'API Timeboard
kind: guide
aliases:
  - /fr/graphing/faq/timeboard-api-doc
  - /fr/graphing/guide/timeboard-api-doc
---
<div class="alert alert-danger">
Cet endpoint est obsolète. Utilisez plutôt le <a href="https://docs.datadoghq.com/api/v1/dashboards/">nouvel endpoint Dashboards</a>.
</div>

L'endpoint `Timeboard` vous permet de programmer la création, la mise à jour, la suppression et la récupération de timeboards. [En savoir plus sur les timeboards][1].

## Créer un timeboard

### Signature

`POST https://api.datadoghq.com/api/v1/dash`

### Arguments

* **`title`** [*obligatoire*] :
    le nom du dashboard.
* **`description`** [*obligatoire*] :
    la description du contenu du dashboard.
* **`graphs`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    la liste des définitions de graphique. Les définitions de graphique respectent le format suivant :
    * **`title`** [*obligatoire*] :
       le nom du graphique.
    * **`definition`** [*facultatif*, *valeur par défaut*=**Aucune**] :
        * `events` [*facultatif*, *valeur par défaut*=**Aucune**] :
          la requête pour superposer des événements.
        * `requests` [*facultatif*, *valeur par défaut*=**Aucune**] :
          la requête de la métrique, le type de ligne, le style, les mises en forme conditionnelles et l'agrégateur.
        * `viz` [*facultatif*, *défaut*=**timeseries**] :
          Le type de visualisation.

* **`template_variables`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    la liste des template variables utilisables pour la création de modèles de dashboard. Les définitions de template variables respectent le format suivant :
    * **`name`** [*obligatoire*] :
      Nom de la variable.
    * **`prefix`** [*facultatif*, *valeur par défaut*=**Aucune**] :
        Préfixe de tag associé à la variable. Seuls les tags avec ce préfixe apparaissent dans la liste déroulante des variables.
    * **`default`** [*facultatif*, *valeur par défaut*=**Aucune**] :
        la valeur par défaut de la template variable lors du chargement du dashboard.

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

title = "Mon Timeboard"
description = "Timeboard d'informations."
graphs = [{
    "definition": {
        "events": [],
        "requests": [
            {"q": "avg:system.mem.free{*}"}
        ],
        "viz": "timeseries"
    },
    "title": "Mémoire disponible moyenne"
}]

template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
}]

read_only = True
api.Timeboard.create(title=title,
                     description=description,
                     graphs=graphs,
                     template_variables=template_variables,
                     read_only=read_only)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

# Créer un timeboard.
title = 'Mes premières métriques'
description = 'Et elles sont merveilleuses.'
graphs = [{
    "definition" => {
        "events" => [],
        "requests" => [{
            "q" => "avg:system.mem.free{*}"
        }],
        "viz" => "timeseries"
    },
    "title" => "Mémoire disponible moyenne"
}]
template_variables = [{
    "name" => "host1",
    "prefix" => "host",
    "default" => "host:my-host"
}]

dog.create_dashboard(title, description, graphs, template_variables)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>

curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Mémoire disponible moyenne",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "Shell Mémoire disponible moyenne",
      "description" : "Un dashboard avec des informations sur la mémoire.",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }],
      "read_only": "True"
}' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## Mettre à jour un timeboard

### Signature

`PUT https://api.datadoghq.com/api/v1/dash/<ID_TIMEBOARD>`

### Arguments

* **`title`** [*obligatoire*] :
    le nom du dashboard.
* **`description`** [*obligatoire*] :
   La description du contenu du dashboard.
* **`graphs`** [*obligatoire*] :
    la liste des définitions de graphique. Les définitions de graphique respectent le format suivant :
    * **`title`** [*obligatoire*] :
       le nom du graphique.
    * **`definition`** [*obligatoire*] :
    la définition du graphique. Lisez le [guide sur les graphiques][1] pour en savoir plus sur les graphiques. Exemple :
    `{"requests": [{"q": "system.cpu.idle{*} by {host}"}`

* **`template_variables`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    la liste des template variables utilisables pour la création de modèles de dashboard. Les définitions de template variables respectent le format suivant :
    * **`name`** [*obligatoire*] :
     Le nom de la variable.

    * **`prefix`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    le préfixe de tag associé à la variable. Seuls les tags avec ce préfixe apparaissent dans la liste déroulante des variables.

    * **`default`** [*facultatif*, *valeur par défaut*=**Aucune**] :
    la valeur par défaut de la template variable lors du chargement du dashboard.

### Exemples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {'api_key': '<CLÉ_API_DATADOG>',
           'app_key': '<CLÉ_APPLICATION_DATADOG>'}

initialize(**options)

title = 'Mon Timeboard'
description = 'Un nouveau timeboard amélioré !'
graphs = [{'definition': {'events': [],
                          'requests': [{
                            'q': 'avg:system.mem.free{*} by {host}'}],
                          'viz': 'timeseries'},
          'title': 'Mémoire disponible moyenne par host'}]
template_variables = [{'name': 'host1', 'prefix': 'host',
                       'default': 'host:my-host'}]
read_only = True

api.Timeboard.update(
    4952,
    title=title,
    description=description,
    graphs=graphs,
    template_variables=template_variables,
    read_only=read_only,
)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

dash_id = '2551'
title = 'Nouveau timeboard amélioré'
description = 'Visualisez des informations fascinantes.'
graphs = [{
    "definition" => {
        "events" => [],
        "requests" => [{
            "q" => "avg:system.mem.free{*}"
        }],
        "viz" => "timeseries"
    },
    "title" => "Mémoire disponible moyenne"
}]
template_variables = [{
    "name" => "host1",
    "prefix" => "host",
    "default" => "host:my-host"
}]

dog.update_dashboard(dash_id, title, description, graphs, template_variables)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>
dash_id=2532

# Créer un dashboard à récupérer. Utiliser jq (http://stedolan.github.io/jq/download/) pour récupérer l'id du dashboard.
dash_id=$(curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Mémoire disponible moyenne",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "Shell Mémoire disponible moyenne",
      "description" : "Un dashboard avec des informations sur la mémoire.",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
  }' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}" | jq '.dash.id')

curl  -X PUT -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Mémoire disponible totale",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "sum:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "Shell Mémoire disponible totale",
      "description" : "Un dashboard mis à jour avec des informations sur la mémoire.",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
}' \
"https://api.datadoghq.com/api/v1/dash/${dash_id}?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## Supprimer un timeboard

Supprimez un [timeboard][1] existant.
*Cet endpoint ne prend aucun argument JSON.*

### Signature

`DELETE https://api.datadoghq.com/api/v1/dash/<ID_TIMEBOARD>`

### Arguments

*Cet endpoint ne prend aucun argument JSON.*

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

title = "Mon Timeboard"
description = "Timeboard d'informations."
graphs = [{
    "definition": {
        "events": [],
        "requests": [
            {"q": "avg:system.mem.free{*}"}
        ],
        "viz": "timeseries"
    },
    "title": "Mémoire disponible moyenne"
}]

template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
}]

newboard = api.Timeboard.create(title=title,
                                description=description,
                                graphs=graphs,
                                template_variables=template_variables)

api.Timeboard.delete(newboard['dash']['id'])
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

dash_id = '2534'
dog.delete_dashboard(dash_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>
dash_id=2471

# Créer un dashboard à supprimer. Utiliser jq (http://stedolan.github.io/jq/download/) pour récupérer l'id du dashboard.
dash_id=$(curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Mémoire disponible moyenne",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "Shell Mémoire disponible moyenne",
      "description" : "Un dashboard avec des informations sur la mémoire.",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
  }' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}" | jq '.dash.id')

curl -X DELETE "https://api.datadoghq.com/api/v1/dash/${dash_id}?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## Récupérer un timeboard

Récupérez la définition d'un dashboard existant.

### Signature

`GET https://api.datadoghq.com/api/v1/dash/<ID_TIMEBOARD>`

### Arguments

*Cet endpoint ne prend aucun argument JSON.*

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

api.Timeboard.get(4953)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

dash_id = '2542'
dog.get_dashboard(dash_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>
dash_id=2473

# Créer un dashboard à récupérer. Utiliser jq (http://stedolan.github.io/jq/download/) pour récupérer l'id du dashboard.
dash_id=$(curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Mémoire disponible moyenne",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "Shell Mémoire disponible moyenne",
      "description" : "Un dashboard avec des informations sur la mémoire.",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
  }' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}" | jq '.dash.id')

curl "https://api.datadoghq.com/api/v1/dash/${dash_id}?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## Récupérer tous les timeboards

Récupérez toutes les définitions de [timeboard][1].

### Signature

`GET https://api.datadoghq.com/api/v1/dash`

### Arguments

*Cet endpoint ne prend aucun argument JSON.*

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

print api.Timeboard.get_all()
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

dog.get_dashboards
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>

curl "https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

[1]: /fr/dashboards/timeboard/
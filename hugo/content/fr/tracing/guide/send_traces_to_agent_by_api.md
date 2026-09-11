---
aliases:
- /fr/api/latest/tracing/
- /fr/api/v1/tracing/
- /fr/api/v2/tracing/
further_reading:
- link: /tracing/
  tag: Documentation
  text: En savoir plus sur le tracing de l'APM Datadog
- link: /tracing/glossary/
  tag: Documentation
  text: Terminologie et présentation de l'APM

title: Envoyer des traces à l'Agent via l'API
---

L'APM de Datadog vous permet de recueillir des métriques de performance en traçant votre code pour identifier les éléments lents ou inefficaces de votre application.

Les données de tracing sont envoyées depuis votre code instrumenté à l'Agent Datadog via une API HTTP. Les bibliothèques de tracing de Datadog simplifient l'envoi de métriques à l'Agent Datadog. Cependant, vous pouvez interagir directement avec l'API pour instrumenter des applications qui ne peuvent pas utiliser les bibliothèques ou qui sont écrites dans des langages qui ne possèdent pas encore de bibliothèque de tracing Datadog officielle.

L'API de tracing est une API d'Agent plutôt qu'une API de service. Envoyez vos traces à l'endpoint local `http://localhost:8126/v0.3/traces` afin que votre Agent puisse ensuite les transférer à Datadog.

## Chemin

{{< code-block lang="bash" >}}
PUT http://localhost:8126/v0.3/traces
{{< /code-block >}}

## Requête

Les traces peuvent être envoyées sous la forme d'un tableau de traces :

```
[ trace1, trace2, trace3 ]
```
où chaque trace est un tableau de spans :

```
trace1 = [ span, span2, span3 ]
```
et où chaque span est un dictionnaire avec un `trace_id`, `span_id`, `resource`, etc. Chaque span dans une trace doit utiliser le même `trace_id`. Cependant, `trace_id` et span_id doivent avoir des valeurs différentes.

### Modèle

| Champ      | Type    | Description                           |
|------------|---------|---------------------------------------|
| `duration`   | int64   | La durée de la requête en nanosecondes. |
| `error`      | int32   | Définissez cette valeur sur 1 pour indiquer si une erreur s'est produite. Si une erreur se produit, les informations supplémentaires telles que le message d'erreur, le type et les informations de pile doivent être spécifiées dans la propriété meta. |
| `meta`       | objet  | Un ensemble de métadonnées key/value. Les clés et les valeurs doivent être des chaînes. |
| - `<any-key>` | chaîne | Propriétés supplémentaires pour les métadonnées key/value. |
| metrics    | objet  | Un ensemble de métadonnées key/value. Les clés doivent être des chaînes et les valeurs doivent être des nombres flottants codés sur 64 bits. |
| - `<any-key>` | double | Propriétés supplémentaires pour les métriques key-value. |
| name       | chaîne  | Le nom de la span. Le nom de la span ne doit pas dépasser 100 caractères. |
| `parent_id`  | int64   | L'ID entier de la span parent. |
| `resource`   | chaîne  | La ressource que vous tracez. Le nom de la ressource ne doit pas dépasser 5 000 caractères. |
| `service`    | chaîne  | Le service que vous tracez. Le nom du service ne doit pas dépasser 100 caractères. |
| `span_id`    | int64   | L'ID entier (64 bits non signé) de la span. |
| `start`      | int64   | L'heure de début de la requête en nanosecondes depuis l'epoch UNIX. |
| `trace_id`   | int64   | L'ID entier unique (64 bits non signé) de la trace contenant cette span. |
| `type`       | enum    | Le type de requête. Les valeurs enum autorisées sont : `web`, `db`, `cache`, `custom` |


### Exemple

{{< code-block lang="json" >}}
[
  [
    {
      "duration": 12345,
      "error": "integer",
      "meta": {
        "<any-key>": "string"
      },
      "metrics": {
        "<any-key>": "number"
      },
      "name": "span_name",
      "parent_id": "integer",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789,
      "type": "web"
    }
  ]
]
{{< /code-block >}}


## Réponse

200
: OK

### Exemple

{{< tabs >}}

{{% tab "Shell" %}}

{{< code-block lang="curl" >}}
# Commande curl
curl -X PUT "http://localhost:8126/v0.3/traces" \
-H "Content-Type: application/json" \
-d @- << EOF
[
  [
    {
      "duration": 12345,
      "name": "span_name",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789
    }
  ]
]
EOF
{{< /code-block >}}

{{% /tab %}}

{{% tab "Powershell" %}}
{{< code-block lang="curl" >}}

# Commande Invoke-RestMethod

$uri = "http://localhost:8126/v0.3/traces"
$headers = @{
    "Content-Type" = "application/json"
}
$body = @"
[
  [
    {
      "duration": 12345,
      "name": "span_name",
      "resource": "/home",
      "service": "service_name",
      "span_id": 987654321,
      "start": 0,
      "trace_id": 123456789
    }
  ]
]
"@

Invoke-RestMethod -Uri $uri -Method Put -Body $body -Headers $headers
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
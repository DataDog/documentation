---
aliases:
- /fr/integrations/observability_pipelines/guide/control_log_volume_and_size/
further_reading:
- link: /observability_pipelines/working_with_data/
  tag: Documentation
  text: Transformer des données avec Vector
- link: /observability_pipelines/vector_configurations/
  tag: Documentation
  text: En savoir plus sur les configurations Vector

title: Contrôler le volume et la taille des logs
---

## Présentation

Avec le développement de votre organisation, vos logs deviennent de plus en plus volumineux. Cela a pour effet d'accroître les coûts d'ingestion et d'indexation liés à vos services en aval, comme les solutions de gestion de logs, de SIEM, etc. Ce guide vous explique comment utiliser les transformations Vector pour réduire le volume et la taille de vos logs, afin de contrôler vos coûts *avant* que vos données ne quittent votre infrastructure ou réseau.

## Prérequis
- Vous avez [installé et configuré Vector][1] de façon à recueillir des données à partir de vos sources et à les acheminer vers vos destinations.
- Vous maîtrisez la [configuration de base de Vector][2].

## Utiliser les transformations pour gérer le volume des logs

Au sein des pipelines d'observabilité, les **transformations** effectuent des opérations afin de modifier des événements, à savoir des logs, métriques ou traces passant par les pipelines.

### Dédoubler des événements

Utilisez la [transformation dedupe][3] pour supprimer les données en double passant par votre pipeline. Ajoutez le composant suivant à votre configuration pour appliquer la transformation.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: dedupe
    inputs:
      - my-source-or-transform-id
    cache: null
    fields: null
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "dedupe"
inputs = [ "my-source-or-transform-id" ]
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "dedupe",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "cache": null,
      "fields": null
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

Vector attribue à chaque événement un identifiant unique permettant de suivre les événements dédupliqués. Grâce à l'option `cache`, vous pouvez mettre en cache les événements récents afin de vérifier ultérieurement si des données ont été dupliquées. Par défaut, le cache contient 5 000 événements. L'option `fields` répertorie les champs utilisés pour déterminer si un événement est un doublon.

### Filtrer des événements

Utilisez la [transformation filter][4] pour autoriser uniquement certains logs répondant à des critères spécifiques à passer par un composant de votre pipeline. Ces critères vous permettent par exemple d'accepter uniquement les logs qui contiennent :

- un tag spécifique, par exemple `env` ;
- une valeur de champ spécifique, par exemple `400` pour le champ `status`.

Pour filtrer vos logs, insérez un composant contenant une [transformation filter][4] qui repose sur la syntaxe [Vector Remap Language (VRL)][5] ou sur la [syntaxe de recherche de logs Datadog][6] afin de définir vos conditions. Les logs qui ne répondent pas aux conditions sont ignorés.

L'exemple suivant repose sur la transformation filter et sur VRL pour transmettre uniquement les logs dont le `status` est `500`.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: filter
    inputs:
      - my-source-or-transform-id
    condition:
      type: "vrl"
      source: ".status == 500"
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "filter"
inputs = [ "my-source-or-transform-id" ]

  [transforms.my_transform_id.condition]
  type = "vrl"
  source = ".status == 500"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "filter",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "condition": {
        "type": "vrl",
        "source": ".status == 500"
        }
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Échantillonner des logs

Lorsque vous analysez des volumes importants de données comportant de nombreuses valeurs parasites (par exemple, des logs CDN), il est inutile de transmettre l'ensemble des logs à une destination. Utilisez plutôt la [transformation sample][7] afin d'envoyer uniquement les logs dont vous avez besoin. Vos analyses sont ainsi plus pertinentes d'un point de vue statistique.

Le champ `exclude` permet d'empêcher l'échantillonnage de certains événements. Il prend en charge la syntaxe VRL ainsi que la syntaxe de recherche de logs Datadog. L'exemple de configuration ci-dessous échantillonne chaque lot de 10 événements. Le nombre d'événements est déterminé par l'option `rate`.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: sample
    inputs:
      - my-source-or-transform-id
    exclude:
       type: "datadog_search"
       source: "*stack"
    rate: 10
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "sample"
inputs = [ "my-source-or-transform-id" ]
rate = 10

  [transforms.my_transform_id.exclude]
  type = "datadog_search"
  source = "*stack"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "sample",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "exclude": {
        "type": "datadog_search",
        "source": "*stack"
      },
      "rate": 10
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

### Convertir des logs en métriques

Pour mieux comprendre l'évolution d'une certaine tendance, il est plus intéressant d'étudier les métriques associées aux points de données d'un événement plutôt qu'une série de logs. Utilisez la [transformation log to metric][8] pour réduire le volume de logs passant par votre pipeline en générant des métriques basées sur des tags spécifiques.

Vous pouvez générer quatre types de métriques différents :

- Des métriques counter, qui permettent de compter le nombre de logs contenant un tag spécifique. Vous pouvez incrémenter un compte ou le réinitialiser.
- Des métriques de distribution, qui représentent la distribution des valeurs échantillonnées. Ces métriques sont particulièrement utiles pour créer des synthèses et des histogrammes.
- Des métriques gauge, qui représentent une seule valeur numérique qui augmente ou diminue de façon arbitraire. Ces métriques vous permettent de surveiller des valeurs qui évoluent constamment.
- Des métriques set, qui rassemblent des valeurs uniques au sein d'un tableau. Ces métriques servent par exemple à recueillir des adresses IP uniques.

L'exemple de configuration suivant permet de générer une métrique `counter`. L'option `metrics` définit les paires key/value ajoutées à l'événement.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: log_to_metric
    inputs:
      - my-source-or-transform-id
    metrics:
      - type: counter
        field: status
        name: response_total
        namespace: service
        tags:
          status: "{{status}}"
          host: "{{host}}"
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "log_to_metric"
inputs = [ "my-source-or-transform-id" ]

  [[transforms.my_transform_id.metrics]]
  type = "counter"
  field = "status"
  name = "response_total"
  namespace = "service"

    [transforms.my_transform_id.metrics.tags]
    status = "{{status}}"
    host = "{{host}}"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "log_to_metric",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "metrics": [
        {
          "type": "counter",
          "field": "status",
          "name": "response_total",
          "namespace": "service",
          "tags": {
            "status": "{{status}}",
            "host": "{{host}}"
          }
        }
      ]
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

Si la configuration ci-dessus est appliquée au log suivant :

```
{
  "log": {
    "host": "10.22.11.222",
    "message": "Sent 200 in 54.2ms",
    "status": 200
  }
}
```

Alors la métrique suivante est générée :

```
{"metric":{"counter":{"value":1},"kind":"incremental","name":"response_total","namespace":"service","tags":{"host":"10.22.11.222","status":"200"}}}]

```

### Rassembler plusieurs événements au sein d'un seul log

Il est possible de regrouper plusieurs logs au sein d'un log unique. Ainsi, pour réduire votre volume de logs, une solution consiste à fusionner plusieurs logs. Utilisez la [transformation reduce][9] pour réunir plusieurs logs au sein d'un seul log.

L'exemple de configuration ci-dessous utilise une transformation reduce pour fusionner plusieurs événements d'exception liés à des logs Ruby.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: reduce
    inputs:
      - my-source-or-transform-id
    group_by:
      - host
      - pid
      - tid
    merge_strategies:
      message: concat_newline
    starts_when: match(string!(.message), r'^[^\\s]')
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "reduce"
inputs = [ "my-source-or-transform-id" ]
group_by = [ "host", "pid", "tid" ]
starts_when = "match(string!(.message), r'^[^\\s]')"

[transforms.my_transform_id.merge_strategies]
  message = "concat_newline"
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "reduce",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "group_by": [
        "host",
        "pid",
        "tid"
      ],
      "merge_strategies": {
        "message": "concat_newline"
      },
      "starts_when": "match(string!(.message), r'^[^\\s]')"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

Dans la transformation reduce, la valeur de `group_by` correspond à la liste triée des champs servant à regrouper les événements. Ici, les événements sont regroupés en fonction des champs `host`, `pid` et `tid`.

L'option `merge_strategies` correspond à une map des noms de champs. Elle permet d'applique une stratégie de fusion personnalisée. Il existe [différentes stratégies de fusion][10], notamment `array`, qui annote chaque valeur dans un tableau, et `sum`, qui additionne toutes les valeurs numériques. Dans l'exemple ci-dessous, la stratégie `concat_newline` permet de concaténer toutes les valeurs de chaîne, puis de les délimiter à l'aide d'un retour à la ligne.

La condition `starts_when` permet d'identifier le premier événement d'une transaction. Si la condition génère le statut `true` pour un événement, l'opération précédente est transmise sans cet événement, et une nouvelle opération est initiée. Dans l'exemple ci-dessus, les événements comportant `.message` et qui ne correspondent pas à l'expression régulière `^[^\\s]` sont rassemblés au sein d'un seul événement.

Si la configuration ci-dessus est appliquée aux logs d'exception Ruby suivants :

```
[{"log":{
    "host":"host-1.hostname.com",
    "message":"foobar.rb:6:in `/': divided by 0(ZeroDivisionError)",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:6:in `bar'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:2:in `foo'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"from foobar.rb:9:in `\u003cmain\u003e'",
    "pid":1234,"tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"Hello world, I am a new log",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:22.123528Z"
}}]
```

Alors les logs suivants sont générés :

```
[{
"log": {
    "host":"host-1.hostname.com",
    "message":"foobar.rb:6:in `/': divided by 0 (ZeroDivisionError)\n
               from foobar.rb:6:in `bar'\n
               from foobar.rb:2:in `foo'\n
               from foobar.rb:9:in `\u003cmain\u003e'",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:21.223543Z"}
},
{
"log":{
    "host":"host-1.hostname.com",
    "message":"Hello world, I am a new log",
    "pid":1234,
    "tid":5678,
    "timestamp":"2020-10-07T12:33:22.123528Z"
}}]
```

## Utiliser des transformations pour gérer la taille des logs

### Supprimer des champs inutiles pour réduire la taille de vos logs

Certains champs de vos logs peuvent n'avoir aucune utilité. Si vous traitez des téraoctets de données chaque jour, la suppression de ces champs superflus peut réduire considérablement le volume total de logs ingérés et indexés par votre destination.

Pour remapper vos données de log et ainsi supprimer vos champs inutiles, utilisez la [syntaxe VRL (Vector Remap Language)][5]. L'exemple suivant permet de supprimer les tags inutiles à l'aide de `del`.

{{< tabs >}}
{{% tab "YAML" %}}

```yaml
transforms:
  my_transform_id:
    type: remap
    inputs:
      - my-source-or-transform-id
    source: |-
      del(.unecessary_env_field)
      del(.unecessary_service_field)
      del(.unecessary_tag_field)
```

{{% /tab %}}
{{% tab "TOML" %}}

```toml
[transforms.my_transform_id]
type = "remap"
inputs = [ "my-source-or-transform-id" ]
source = """
del(.unecessary_env_field)
del(.unecessary_service_field)
del(.unecessary_tag_field)"""
```

{{% /tab %}}
{{% tab "JSON" %}}

```json
{
  "transforms": {
    "my_transform_id": {
      "type": "remap",
      "inputs": [
        "my-source-or-transform-id"
      ],
      "source": "del(.unecessary_env_field)\ndel(.unecessary_service_field)\ndel(.unecessary_tag_field)"
    }
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/setup/
[2]: /fr/observability_pipelines/vector_configurations/
[3]: https://vector.dev/docs/reference/configuration/transforms/dedupe/
[4]: https://vector.dev/docs/reference/configuration/transforms/filter/
[5]: https://vector.dev/docs/reference/vrl/
[6]: /fr/logs/explorer/search_syntax/
[7]: https://vector.dev/docs/reference/configuration/transforms/sample/
[8]: https://vector.dev/docs/reference/configuration/transforms/log_to_metric/
[9]: https://vector.dev/docs/reference/configuration/transforms/reduce/
[10]: https://vector.dev/docs/reference/configuration/transforms/reduce/#merge_strategies

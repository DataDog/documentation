---
title: Obfuscation des traces de l'Agent
kind: guide
private: true
disable_toc: true
---
L'obfuscation des [traces][1] de l'Agent est désactivée par défaut. Activez-la dans votre fichier de configuration `datadog.yaml` pour obfusquer toutes les informations associées à vos traces.

Ces options ne fonctionnent actuellement qu'avec les services suivants :

* `mongodb`
* `elasticsearch`
* `redis`
* `memcached`
* `http`
* `remove_stack_traces`


{{< tabs >}}
{{% tab "MongoDB" %}}

S'applique aux [spans][1] de type `mongodb`, plus précisément aux spans de tag `mongodb.query` : 

```
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    mongodb:
      enabled: true
      keep_values:
        - uid
        - cat_id
```

* `keep_values` : définit un ensemble de clés à exclure de l'obfuscation des traces de l'Agent.
[1]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "ElasticSearch" %}}

S'applique aux [spans][1] de type `elasticsearch`, plus précisément aux tags de span `elasticsearch.body` :

```
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    elasticsearch:
      enabled: true
      keep_values:
        - user_id
        - category_id
```

* `keep_values` : définit un ensemble de clés à exclure de l'obfuscation des traces de l'Agent.
[1]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Redis" %}}

S'applique aux [spans][1] de type `redis`, plus précisément aux tags de span `redis.raw_command` :

```
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    redis:
      enabled: true
```
[1]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "MemCached" %}}

S'applique aux [spans][1] de type `memcached`, plus précisément aux tags de span `memcached.command` :

```
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    memcached:
      enabled: true
```
[1]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "HTTP" %}}

Règles d'obfuscation HTTP pour les métadonnées `http.url` dans les [spans][1] de type `http` :

```
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    http:
      remove_query_string: true
      remove_paths_with_digits: true
```

* `remove_query_string` : définir ce paramètre sur true pour obfusquer les chaînes de requête dans les URL.
* `remove_paths_with_digits` : si ce paramètre est défini sur true, les segments de chemin des URL contenant des chiffres sont remplacés par le caractère « ? ».
[1]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Traces de pile" %}}

Définissez le paramètre `remove_stack_traces` sur true afin de supprimer les traces de pile et de les remplacer par le caractère « ? ».
```
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    remove_stack_traces: true
```

{{% /tab %}}
{{< /tabs >}}

[1]: /fr/tracing/visualization/#trace
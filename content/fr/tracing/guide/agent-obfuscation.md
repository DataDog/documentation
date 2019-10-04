---
title: Obfuscation des traces de l'Agent
kind: guide
private: true
disable_toc: true
---

L'obfuscation des traces de l'Agent est désactivée par défaut. Activez-le dans votre fichier de configuration `datadog.yaml` pour obfusquer toutes les informations associées à vos traces.

Ces options ne fonctionnent actuellement qu'avec les services suivants :

* `mongodb`
* `elasticsearch`
* `redis`
* `memcached`
* `http`
* `remove_stack_traces`


{{< tabs >}}
{{% tab "MongoDB" %}}

Applique les spans de type `mongodb`, plus précisément aux métadonnées de span `mongodb.query` :

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

{{% /tab %}}
{{% tab "ElasticSearch" %}}

Applique les spans de type `elasticsearch`, plus précisément aux métadonnées de span `elasticsearch.body` :

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

{{% /tab %}}
{{% tab "Redis" %}}

Applique les spans de type `redis`, plus précisément aux métadonnées de span `redis.raw_command` :

```
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    redis:
      enabled: true
```

{{% /tab %}}
{{% tab "MemCached" %}}

Applique les spans de type `memcached`, plus précisément aux métadonnées de span `memcached.command` :

```
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    memcached:
      enabled: true
```

{{% /tab %}}
{{% tab "HTTP" %}}

Règles d'obfuscation HTTP pour les métadonnées `http.url` dans les spans de type `http` :

```
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    http:
      remove_query_string: true
      remove_paths_with_digits: true
```

* `remove_query_string` : si ce paramètre est défini sur true, il obfusque les chaînes de requête dans les URL.
* `remove_paths_with_digits` : si ce paramètre est défini sur true, les segments de chemin des URL contenant des chiffres sont remplacés par le caractère « ? ».

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

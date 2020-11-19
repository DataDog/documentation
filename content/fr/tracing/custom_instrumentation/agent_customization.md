---
title: Sécurité et personnalisation de l'Agent
kind: documentation
description: Configurez la modification ou la suppression de spans par le traceur ou l'Agent Datadog à des fins de sécurité ou de personnalisation.
aliases:
  - /fr/security/tracing
  - /fr/tracing/security
  - /fr/tracing/guide/security
  - /fr/tracing/guide/agent_obfuscation
  - /fr/tracing/guide/agent-obfuscation
---
## Présentation

Les données de performance et les traces que vous collectez avec Datadog peuvent contenir des informations sensibles que vous souhaitez filtrer, nettoyer, masquer ou modifier, ou que vous ne souhaitez pas collecter du tout. De plus, elles peuvent contenir du trafic Synthetic susceptible de fausser les erreurs détectées ou d'empêcher Datadog d'indiquer correctement la santé de vos services.

L'Agent Datadog et certaines bibliothèques de tracing proposent des options pour remédier à ces problèmes en modifiant ou en supprimant des spans, et plusieurs d'entre elles sont décrites ci-dessous. Cette page couvre plusieurs méthodes courantes pour configurer le traceur et l'Agent et ainsi atteindre ces exigences de sécurité.

Si vos besoins en matière de personnalisation ne sont pas abordés sur cette page et que vous avez besoin d'aide, contactez l'[équipe d'assistance Datadog][1].

## Filtres par défaut

Datadog applique plusieurs règles de filtrage sur les spans afin d'assurer un comportement efficace par défaut en matière de sécurité. Il s'agit notamment des règles suivantes :

* **Les variables d'environnement ne sont pas recueillies par l'Agent**
* **Les variables SQL sont filtrées, même en l'absence de requêtes préparées**. Par exemple, dans l'attribut `sql.query` suivant : `SELECT data FROM table WHERE key=123 LIMIT 10`, les variables sont filtrées afin d'obtenir le nom de ressource suivant : `SELECT data FROM table WHERE key = ? LIMIT ?`
* **Les chiffres dans les noms de ressources (par exemple dans les URL de requête) sont filtrés par défaut**. Par exemple, dans l'attribut `elasticsearch` suivant :

    ```text
    Elasticsearch : {
        method : GET,
        url : /user.0123456789/friends/_count
    }
    ```

    les chiffres dans l'URL sont filtrés afin d'obtenir le nom de ressource suivant : `GET /user.?/friends/_count`

## Obfuscation des traces de l'Agent

L'obfuscation des [traces][2] de l'Agent est désactivée par défaut. Activez-la dans votre fichier de configuration `datadog.yaml` pour obfusquer toutes les informations associées à vos traces.

Ces options fonctionnent avec les services suivants :

* `mongodb`
* `elasticsearch`
* `redis`
* `memcached`
* `http`
* `remove_stack_traces`

**Remarque :** vous pouvez nettoyer automatiquement plusieurs types de services en même temps. Configurez chaque type de service dans la section `obfuscation` de votre fichier `datadog.yaml`.

{{< tabs >}}
{{% tab "MongoDB" %}}

S'applique aux [spans][1] de type `mongodb`, plus précisément aux tags de span `mongodb.query` : 

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    # Règles d'obfuscation MongoDB. S'appliquent aux spans de type « mongodb »,
    # et plus précisément au tag « mongodb.query ».
    mongodb:
      enabled: true
      # Les valeurs des clés répertoriées ici ne feront pas l'objet d'une obfuscation.
      keep_values:
        - document_id
        - template_id
```

* `keep_values` : définit un ensemble de clés à exclure de l'obfuscation des traces de l'Agent.

[1]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Elasticsearch" %}}

S'applique aux [spans][1] de type `elasticsearch`, plus précisément aux tags de span `elasticsearch.body` :

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    # Règles d'obfuscation ElasticSearch. S'appliquent aux spans de type « elasticsearch »,
    # et plus précisément au tag « elasticsearch.body ».
    elasticsearch:
      enabled: true
      # Les valeurs des clés répertoriées ici ne feront pas l'objet d'une obfuscation.
      keep_values:
        - client_id
        - product_id
```

[1]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Redis" %}}

S'applique aux [spans][1] de type `redis`, plus précisément aux tags de span `redis.raw_command` :

```yaml
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

```yaml
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

```yaml
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
{{% tab "Stack traces" %}}

Définissez le paramètre `remove_stack_traces` sur true afin de supprimer les stack traces et de les remplacer par le caractère `?`.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    remove_stack_traces: true
```

{{% /tab %}}
{{< /tabs >}}

## Règles de remplacement pour le filtrage des tags

Pour nettoyer les données sensibles des tags de votre [span][3], utilisez l'option `replace_tags` [de votre fichier de configuration datadog.yaml][4] ou la variable d'environnement `DD_APM_REPLACE_TAGS`. La valeur de l'option ou de la variable d'environnement correspond à une liste contenant un ou plusieurs groupes de paramètres qui indiquent comment remplacer vos données sensibles au sein de vos tags. Les différents paramètres sont :

* `name` : la clé du tag à remplacer. Pour inclure tous les tags, utilisez le caractère `*`. Pour inclure la ressource, utilisez `nom.ressource`.
* `pattern` : l'expression régulière à utiliser.
* `repl`: la chaîne de remplacement.

Par exemple :

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
apm_config:
  replace_tags:
    # Remplacer tous les caractères à partir de la chaîne `token/` dans le tag « http.url » par le caractère « ? » :
    - name: "http.url"
      pattern: "token/(.*)"
      repl: "?"
    # Remplacer toutes les occurrences de « foo » dans tous les tags par « bar » :
    - name: "*"
      pattern: "foo"
      repl: "bar"
    # Remplacer toutes les valeurs du tag « error.stack ».
    - name: "error.stack"
      pattern: "(?s).*"
```

{{% /tab %}}
{{% tab "Variable d'environnement" %}}

```shell
DD_APM_REPLACE_TAGS=[
      {
        "name": "http.url",
        "pattern": "token/(.*)",
        "repl": "?"
      },
      {
        "name": "*",
        "pattern": "foo",
        "repl": "bar"
      },
      {
        "name": "error.stack",
        "pattern": "(?s).*"
      }
]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

**Remarque** : placez cette variable d'environnement dans le conteneur de l'Agent de trace si vous utilisez la [configuration DaemonSet][1] recommandée.

```datadog-agent.yaml
- name: DD_APM_REPLACE_TAGS
  value: '[
            {
              "name": "http.url",
              "pattern": "token/(.*)",
              "repl": "?"
            },
            {
              "name": "*",
              "pattern": "foo",
              "repl": "bar"
            },
            {
              "name": "error.stack",
              "pattern": "(?s).*"
            }
          ]'
```

[1]: /fr/agent/kubernetes/?tab=daemonset
{{% /tab %}}
{{% tab "docker-compose" %}}

```docker-compose.yaml
- DD_APM_REPLACE_TAGS=[{"name":"http.url","pattern":"token/(.*)","repl":"?"},{"name":"*","pattern":"foo","repl":"bar"},{"name":"error.stack","pattern":"(?s).*"}]
```

{{% /tab %}}
{{< /tabs >}}

## Empêcher la collecte de certaines ressources

Si vos services incluent du trafic simulé comme des checks de santé, il peut être préférable de ne pas collecter ces traces afin que les métriques de vos services correspondent au trafic de production.

L'Agent peut être configuré de façon à exclure une ressource spécifique des traces envoyées par l'Agent à Datadog. Pour empêcher l'envoi de ressources spécifiques, utilisez le paramètre `ignore_resources` dans le fichier `datadog.yaml`. Créez ensuite un liste d'une ou de plusieurs expressions régulières, indiquant les ressources que l'Agent doit filtrer selon leur nom.

En cas d'exécution dans un environnement conteneurisé, définissez plutôt `DD_APM_IGNORE_RESOURCES` sur le conteneur avec l'Agent Datadog. Pour en savoir plus, consultez les [Variables d'environnement de l'Agent APM Docker][5].

```text
## @param ignore_resources - liste de chaînes, facultatif
## Une liste d'expressions régulières peut être spécifiée pour exclure certaines traces en fonction de leur nom de ressource.
## Toutes les entrées doivent être entourées de guillemets doubles et séparées par des virgules.
# ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
```

**Remarque** : le traceur NodeJS propose une option supplémentaire pour le filtrage de requête via l'API Node Tracer. Pour en savoir plus, consultez cette [section][6].

## Envoyer des traces directement à l'API de l'Agent

Si vous avez besoin d'une instrumentation personnalisée pour une application spécifique, nous vous conseillons d'utiliser l'API de tracing côté Agent pour sélectionner les spans spécifiques à inclure dans les traces. Consultez la [documentation relative à l'API][7] pour en savoir plus.

## Modifier des spans avec le traceur Datadog

Bien que cette page décrive comment modifier les données une fois qu'elles ont atteint l'Agent Datadog, certaines bibliothèques de tracing sont extensibles. Vous avez la possibilité d'écrire un post-processeur personnalisé pour intercepter des spans et les modifier ou les supprimer comme bon vous semble (par exemple, en fonction d'une expression régulière). Consultez la documentation relative à l'instrumentation personnalisée dans votre langage pour en savoir plus.

* Java : [Interface TraceInterceptor][8]
* Ruby : [Pipeline de processing][9]
* Python : [Filtrage de traces][10]


[1]: /fr/tracing/help
[2]: /fr/tracing/visualization/#trace
[3]: /fr/tracing/visualization/#spans
[4]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[5]: /fr/agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[6]: /fr/tracing/custom_instrumentation/nodejs/#request-filtering
[7]: /fr/api/v1/tracing/
[8]: /fr/tracing/custom_instrumentation/java/#extending-tracers
[9]: /fr/tracing/custom_instrumentation/ruby?tab=activespan#post-processing-traces
[10]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace-filtering
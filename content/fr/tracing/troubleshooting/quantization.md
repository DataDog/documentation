---
further_reading:
- link: /tracing/trace_collection/custom_instrumentation/
  tag: Documentation
  text: Instrumentation personnalisée
- link: /tracing/configure_data_security/#scrub-sensitive-data-from-your-spans
  tag: Documentation
  text: Remplacer des tags dans les spans
- link: /tracing/trace_collection/library_config/
  tag: Documentation
  text: Configuration de la bibliothèque de tracing
kind: Documentation
title: Quantification des données de la solution APM
---

## Présentation

Lors de lʼingestion, Datadog applique une _quantification_ aux données de la solution APM, comme les identificateurs globaux uniques (GUID) aléatoires, les ID numériques et les valeurs de paramètres de requête dans les noms des [spans][1] ou des [ressources][2]. La normalisation qui en résulte permet de limiter le trop grand nombre de noms lié à ces patterns aléatoires en regroupant ces spans et ces ressources, car il sʼagit des mêmes valeurs en terme dʼanalyse.

Certains patterns dans les noms des ressources ou des spans sont remplacés par les chaînes statiques suivantes :
- GUID : `{guid}`
- Les ID numériques (6 chiffres ou plus entourés par des caractères non alphanumériques ou trouvés à la fin dʼune chaîne) : `{num}`
- Valeurs de paramètres de requête : `{val}`

Ces remplacements affectent :;
- le nom des métriques de traces,
- le tag du nom de la ressource dans ces métriques et
- le nom de la ressource et de la span pour toutes les spans ingérées.

### Exemples de quantification

Par exemple, si le _nom dʼune span_ est `find_user_2461685a_80c9_4d9e_85e9_a3b0e9e3ea84`, elle est renommée `find_user_{guid}` et les métriques de trace qui en découlent sont :
- `trace.find_user_guid`
- `trace.find_user_guid.hits`
- `trace.find_user_guid.errors`
- `trace.find_user_guid.duration`
- `trace.find_user_guid.apdex` (si Apdex est configuré pour le service)

Pour rechercher ces spans dans la recherche de traces, utilisez la requête `operation_name:"find_user_{guid}"`.

Si le _nom dʼune ressource_ est `SELECT ? FROM TABLE temp_128390123`, elle est renommée `SELECT ? FROM TABLE temp_{num}` et son tag normalisé pour les métriques est `resource_name:select_from_table_temp_num`.

Pour rechercher ces spans dans la recherche de traces, utilisez la requête `resource_name:"SELECT ? FROM TABLE temp_{num}"`.

## Modifier lʼinstrumentation pour éviter la quantification par défaut

**Remarque** : toutes les modifications apportées au nom de la span ou de la ressource en amont dans lʼinstrumentation ou lʼAgent entraîne la production de nouvelles métriques et de nouveaux tags. Si vous utilisez des requêtes pour des données quantifiées, elles doivent être mises à jour pour fonctionner avec les nouveaux noms.

### Instrumentation dans le code

Si votre application est exécutée dans une configuration sans agent ou si vous préférez modifier lʼinstrumentation de façon plus directe dans votre code, consultez [la documentation relative au tracer du runtime de votre application][3] pour en savoir plus sur la création dʼune configuration personnalisée pour les noms de span et de ressources.

### Configuration de l'Agent

Vous pouvez utiliser lʼoption de configuration YAML `replace_tags` pour configurer vos propres chaînes de remplacement via des expressions régulières compatibles Go :

```yaml
apm_config:
  replace_tags:
    # Remplacer les ID numériques en queue dans les noms de span par "x" :
    - name: "span.name"
      pattern: "get_id_[0-9]+"
      repl: "get_id_x"
    # Remplacer les ID numériques dans les chemins de ressources :
    - name: "resource.name"
      pattern: "/users/[0-9]+/"
      repl: "/users/{user_id}/"
```

Vous pouvez aussi utiliser la variable dʼenvironnement `DD_APM_REPLACE_TAGS` ayant pour valeur une chaîne JSON :

```bash
export DD_APM_REPLACE_TAGS = '[{"name": "span.name", "pattern": "get_id_[0-9]+", "repl": "get_id_x"}, {...}, ...]'
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#spans
[2]: /fr/tracing/glossary/#resources
[3]: /fr/tracing/trace_collection/custom_instrumentation/
---
title: Sécurité
kind: documentation
---
Vous pouvez nettoyer [automatiquement](#nettoyage-automatique) ou [manuellement](#nettoyage-manuel) les informations sensibles de vos [traces][1].

## Nettoyage automatique

Le nettoyage automatique est disponible pour certains [services][2], comme ElasticSearch, MongoDB, Redis et Memcached, ainsi que pour les URL de requête HTTP client et serveur. Vous trouverez ci-dessous un exemple de configuration pour toutes les options disponibles.

```yaml
apm_config:
  # Définit les règles d'obfuscation pour les données sensibles. Désactivé par défaut.
  obfuscation:
    # Règles d'obfuscation ElasticSearch. S'appliquent aux spans de type « elasticsearch »,
    # et plus précisément au tag « elasticsearch.body ».
    elasticsearch:
      enabled: true
      # Les valeurs des clés répertoriées ici ne feront pas l'objet d'une obfuscation.
      keep_values:
        - client_id
        - product_id

    # Règles d'obfuscation MongoDB. S'appliquent aux spans de type « mongodb », 
    # et plus précisément au tag « mongodb.query ».
    mongodb:
      enabled: true
      # Les valeurs des clés répertoriées ici ne feront pas l'objet d'une obfuscation.
      keep_values:
        - document_id
        - template_id

    # Règles d'obfuscation HTTP pour les tags « http.url » dans les spans de type « http ».
    http:
      # Si ce paramètre est défini sur true, les strings de requête dans les URL feront l'objet d'une obfuscation.
      remove_query_string: true
      # Si ce paramètre est défini sur true, les segments de chemin dans les URL contenant des nombres seront remplacés par le caractère « ? ».
      remove_paths_with_digits: true

    # Si cette option est activée, les traces de pile seront supprimées (remplacées par le caractère « ? »).
    remove_stack_traces: true

    # Règles d'obfuscation pour les spans de type « redis ». S'appliquent aux tags « redis.raw_command ».
    redis:
      enabled: true

    # Règles d'obfuscation pour les spans de type « memcached ». S'applique au tag « memcached.command ».
    memcached:
      enabled: true
```

## Règles de remplacement

Pour nettoyer les données sensibles des tags de votre [span][3], utilisez l'option `replace_tags`. Il s'agit d'une liste contenant un ou plusieurs paramètres qui expliquent comment remplacer les données sensibles au sein de vos tags. Les différents paramètres sont :

* `name` : la clé du tag à remplacer. Pour inclure tous les tags, utilisez le caractère `*`. Pour inclure la ressource, utilisez `nom.ressource`.
* `pattern` : l'expression régulière à utiliser.
* `repl`: la chaîne de remplacement.

Par exemple :

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

[1]: /fr/tracing/visualization/#trace
[2]: /fr/tracing/visualization/#services
[3]: /fr/tracing/visualization/#spans
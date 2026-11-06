---
aliases:
- /fr/dynamic_instrumentation/symdb/python
- /fr/tracing/dynamic_instrumentation/symdb/python
code_lang: python
code_lang_weight: 20
description: Configurez les applications Python pour activer des fonctionnalités d'autocomplétion
  et de recherche de type IDE pour Dynamic Instrumentation.
is_beta: true
private: false
title: Activez l'autocomplétion et la recherche pour Python
type: multi-code-lang
---
{{< callout url="#" btn_hidden="true" >}}
L'autocomplétion et la recherche sont en préversion.
{{< /callout >}}

## Prérequis {#requirements}

- [Dynamic Instrumentation][1] est activé pour votre service.
- La bibliothèque de traçage [`dd-trace-py`][6] 2.9.0 ou supérieure est installée.

## Installation {#installation}

Exécutez votre service avec Dynamic Instrumentation activé, et activez en outre l'autocomplétion et la recherche :

1. Exécutez votre service avec Dynamic Instrumentation activé en définissant la variable d'environnement `DD_DYNAMIC_INSTRUMENTATION_ENABLED` sur `true`.
2. Spécifiez `DD_SERVICE` et `DD_VERSION` [Unified Service Tags][5].
3. Appelez votre service :

  ```shell
  export DD_SERVICE=<YOUR_SERVICE>
  export DD_ENV=<YOUR_ENV>
  export DD_VERSION=<YOUR_VERSION>
  export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
  export DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true
  ddtrace-run python -m myapp
  ```

Après avoir démarré votre service avec les fonctionnalités requises activées, vous pouvez utiliser les fonctionnalités de type IDE de Dynamic Instrumentation sur la page [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Dynamic Instrumentation{{< /ui >}}][4].

## Configuration supplémentaire {#additional-configuration}

### Détection de tiers {#third-party-detection}

Si les suggestions d'autocomplétion n'apparaissent pas pour votre package ou module, il se peut qu'il soit incorrectement reconnu comme du code tiers. Les fonctionnalités d'autocomplétion et de recherche utilisent une heuristique pour filtrer le code tiers, ce qui peut parfois entraîner une classification erronée.

Pour vous assurer que votre code est correctement reconnu et pour activer une fonctionnalité d'autocomplétion et de recherche précise, configurez vos paramètres de détection de tiers pour utiliser les options suivantes :

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=<LIST_OF_USER_CODE_MODULES>
export DD_THIRD_PARTY_DETECTION_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>
```

où `<LIST_OF_USER_CODE_MODULES>` et `<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>` sont des listes de préfixes de packages séparées par des virgules. Exemple :

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=shopping,database
```

[1]: /fr/dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /fr/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-py
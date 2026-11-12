---
aliases:
- /fr/dynamic_instrumentation/symdb/dotnet
- /fr/tracing/dynamic_instrumentation/symdb/dotnet
code_lang: dotnet
code_lang_weight: 30
description: Configurez les applications .NET pour activer les fonctionnalités de
  saisie semi-automatique et de recherche de type IDE pour Dynamic Instrumentation.
is_beta: true
private: false
title: Activez la saisie semi-automatique et la recherche pour les applications .NET.
type: multi-code-lang
---
{{< callout url="#" btn_hidden="true" >}}
L'autocomplétion et la recherche sont en préversion.
{{< /callout >}}

## Prérequis {#requirements}

- [Dynamic Instrumentation][1] est activé pour votre service.
- La bibliothèque de traçage [`dd-trace-dotnet`][6] 2.58.0 ou supérieure est installée.

## Installation {#installation}

Exécutez votre service avec Dynamic Instrumentation activé, et activez en outre l'autocomplétion et la recherche :

1. Définissez la variable d'environnement `DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true`.
2. Spécifiez les `DD_SERVICE` et `DD_VERSION` [Unified Service Tags][5].
3. Après avoir démarré votre service avec Dynamic Instrumentation et la saisie semi-automatique et la recherche activées, vous pouvez utiliser les fonctionnalités de type IDE de Dynamic Instrumentation sur la page [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Dynamic Instrumentation{{< /ui >}}][4].

## Configuration supplémentaire {#additional-configuration}

### Détection de tiers {#third-party-detection}

Si les suggestions d'autocomplétion n'apparaissent pas pour votre package ou module, il se peut qu'il soit incorrectement reconnu comme du code tiers. Les fonctionnalités d'autocomplétion et de recherche utilisent une heuristique pour filtrer le code tiers, ce qui peut parfois entraîner une classification erronée.

Pour vous assurer que votre code est correctement reconnu et pour activer la saisie semi-automatique ainsi que la recherche précise, vous pouvez configurer les paramètres de détection tiers en utilisant les options suivantes :

```shell
export DD_THIRD_PARTY_EXCLUDES=<LIST_OF_USER_CODE_PACKAGE_PREFIXES>
export DD_THIRD_PARTY_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES>
```

Où une liste désigne une série de préfixes de paquets séparés par des virgules, par exemple :

```shell
export DD_THIRD_PARTY_EXCLUDES=com.mycompany,io.mycompany
```

[1]: /fr/dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /fr/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-dotnet
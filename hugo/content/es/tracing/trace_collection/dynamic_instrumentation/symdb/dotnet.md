---
aliases:
- /es/dynamic_instrumentation/symdb/dotnet
- /es/tracing/dynamic_instrumentation/symdb/dotnet
code_lang: dotnet
code_lang_weight: 30
description: Configure las aplicaciones de .NET para habilitar funciones de autocompletado
  y búsqueda similares a las de un IDE para Dynamic Instrumentation.
is_beta: true
private: false
title: Habilite el autocompletado y la búsqueda para .NET
type: multi-code-lang
---
{{< callout url="#" btn_hidden="true" >}}
El autocompletado y la búsqueda están en versión preliminar.
{{< /callout >}}

## Requisitos {#requirements}

- [Dynamic Instrumentation][1] está habilitado para su servicio.
- La biblioteca de rastreo [`dd-trace-dotnet`][6] 2.58.0 o superior está instalada.

## Instalación {#installation}

Ejecute su servicio con Dynamic Instrumentation habilitado y, además, habilite el autocompletado y la búsqueda:

1. Establezca la variable de entorno `DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true`.
2. Especifique `DD_SERVICE` y `DD_VERSION` [Unified Service Tags][5].
3. Después de iniciar su servicio con Dynamic Instrumentation y el autocompletado y la búsqueda habilitados, puede usar las funciones similares a las de un IDE de Dynamic Instrumentation en la página [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Dynamic Instrumentation{{< /ui >}}][4].

## Configuración adicional {#additional-configuration}

### Detección de terceros {#third-party-detection}

Si las sugerencias de autocompletado no aparecen para su paquete o módulo, es posible que se reconozca incorrectamente como código de terceros. Las funciones de autocompletado y búsqueda utilizan una heurística para filtrar el código de terceros, lo que a veces puede llevar a una clasificación errónea accidental.

Para asegurarse de que su código se reconozca correctamente y para habilitar una funcionalidad precisa de autocompletado y búsqueda, puede configurar los ajustes de detección de terceros usando las siguientes opciones:

```shell
export DD_THIRD_PARTY_EXCLUDES=<LIST_OF_USER_CODE_PACKAGE_PREFIXES>
export DD_THIRD_PARTY_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES>
```

Donde una lista significa una lista de prefijos de paquetes separados por comas, por ejemplo:

```shell
export DD_THIRD_PARTY_EXCLUDES=com.mycompany,io.mycompany
```

[1]: /es/dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-dotnet
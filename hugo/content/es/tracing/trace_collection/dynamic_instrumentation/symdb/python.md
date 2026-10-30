---
aliases:
- /es/dynamic_instrumentation/symdb/python
- /es/tracing/dynamic_instrumentation/symdb/python
code_lang: python
code_lang_weight: 20
description: Configure las aplicaciones de Python para habilitar funciones de autocompletado
  y búsqueda similares a las de un IDE para Dynamic Instrumentation.
is_beta: true
private: false
title: Habilite el autocompletado y la búsqueda para Python
type: multi-code-lang
---
{{< callout url="#" btn_hidden="true" >}}
El autocompletado y la búsqueda están en versión preliminar.
{{< /callout >}}

## Requisitos {#requirements}

- [Dynamic Instrumentation][1] está habilitado para su servicio.
- La biblioteca de rastreo [`dd-trace-py`][6] 2.9.0 o superior está instalada.

## Instalación {#installation}

Ejecute su servicio con Dynamic Instrumentation habilitado y, además, habilite el autocompletado y la búsqueda:

1. Ejecute su servicio con Dynamic Instrumentation habilitado configurando la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_ENABLED` en `true`.
2. Especifique `DD_SERVICE` y `DD_VERSION` [Unified Service Tags][5].
3. Invoque su servicio:

  ```shell
  export DD_SERVICE=<YOUR_SERVICE>
  export DD_ENV=<YOUR_ENV>
  export DD_VERSION=<YOUR_VERSION>
  export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
  export DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true
  ddtrace-run python -m myapp
  ```

Después de iniciar su servicio con las funciones requeridas habilitadas, puede usar las funciones similares a las de un IDE de Dynamic Instrumentation en la página [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Dynamic Instrumentation{{< /ui >}}][4].

## Configuración adicional {#additional-configuration}

### Detección de terceros {#third-party-detection}

Si las sugerencias de autocompletado no aparecen para su paquete o módulo, es posible que se reconozca incorrectamente como código de terceros. Las funciones de autocompletado y búsqueda utilizan una heurística para filtrar el código de terceros, lo que a veces puede llevar a una clasificación errónea accidental.

Para asegurarse de que su código se reconozca correctamente y para habilitar una funcionalidad precisa de autocompletado y búsqueda, configure sus ajustes de detección de terceros para usar las siguientes opciones:

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=<LIST_OF_USER_CODE_MODULES>
export DD_THIRD_PARTY_DETECTION_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>
```

donde `<LIST_OF_USER_CODE_MODULES>` y `<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>` son listas de prefijos de paquetes separadas por comas. Por ejemplo:

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=shopping,database
```

[1]: /es/dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-py
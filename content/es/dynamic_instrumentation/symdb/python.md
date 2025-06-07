---
code_lang: python
code_lang_weight: 10
is_beta: true
private: false
title: Activar autocompletar y buscar para Python
type: multi-code-lang
---
{{< beta-callout url="#" btn_hidden="true" >}}
Autocompletar y buscar están en beta pública.
{{< /beta-callout >}}

## Requisitos

- [Dynamic Instrumentation][1] está activado para tu servicio.
- El rastreo de bibliotecas [`dd-trace-py`][6] 2.9.0 o superior está instalado.

## Instalación

Ejecuta tu servicio con Dynamic Instrumentation activado y, además, activa la función de autocompletar y buscar:

1. Ejecuta tu servicio con Dynamic Instrumentation activado configurando la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_ENABLED` en `true`.
2. Especifica `DD_SERVICE` y `DD_VERSION` [Etiquetas (tags) de servicio unificado][5].
3. Invoca tu servicio:

  ```shell
  export DD_SERVICE=<YOUR_SERVICE>
  export DD_ENV=<YOUR_ENV>
  export DD_VERSION=<YOUR_VERSION>
  export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
  export DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true
  ddtrace-run python -m myapp
  ```

Después de iniciar tu servicio con las funciones requeridas activadas, puedes utilizar las funciones similares a IDE de Dynamic Instrumentation en la página [**APM** > **Dynamic Instrumentation**][4].

## Configuración adicional

### Detección de terceros

Si no aparecen sugerencias de autocompletar para tu paquete o módulo, es posible que se reconozca incorrectamente como código de terceros. Las funciones de autocompletar y buscar utilizan una heurística para filtrar el código de terceros, lo que a veces puede dar lugar a una clasificación errónea accidental.

Para asegurarte de que tu código se reconozca correctamente y para permitir la funcionalidad precisa de autocompletar y buscar, configura tus parámetros de detección de terceros para utilizar las siguientes opciones:

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=<LIST_OF_USER_CODE_MODULES>
export DD_THIRD_PARTY_DETECTION_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>
```

donde `<LIST_OF_USER_CODE_MODULES>` y `<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>` son listas separadas por comas de prefijos de paquetes. Por ejemplo:

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=shopping,database
```

[1]: /es/dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-py
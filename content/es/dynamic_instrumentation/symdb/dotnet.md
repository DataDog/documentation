---
code_lang: dotnet
code_lang_weight: 10
is_beta: true
private: false
title: Activar Autocompletar y Buscar para .NET
type: lenguaje de código múltiple
---
{{< beta-callout url="#" btn_hidden="true" >}}
Autocompletar y Buscar están en fase beta pública.
{{< /beta-callout >}}

## Requisitos

- [Instrumentación dinámica][1] está activada para tu servicio.
- La biblioteca de rastreo [`dd-trace-dotnet`][6] 2.58.0 o posterior está instalada.

## Instalación

Ejecuta tu servicio con la Instrumentación dinámica activada y, además, activa la función de Autocompletar y Buscar:

1. Configura la variable de entorno `DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true`.
2. Especifica las [Etiquetas de servicio unificado][5] `DD_SERVICE` y `DD_VERSION`.
3. Después de iniciar tu servicio con la Instrumentación dinámica y las funciones de Autocompletar y Buscar activadas, puedes utilizar las funciones similares a un IDE de la Instrumentación dinámica en la página [**APM** > **Dynamic Instrumentation**][4] (Instrumentación dinámica).

## Configuración adicional

### Detección de terceros

Si no aparecen sugerencias de Autocompletar para Tu paquete o módulo, es posible que se reconozca incorrectamente como código de terceros. Las funciones de autocompletar y Buscar utilizan una heurística para filtrar el código de terceros, lo que a veces puede causar una clasificación errónea accidental.

Para asegurarte de que tu código se reconoce correctamente y permitir la funcionalidad precisa de Autocompletar y Buscar, puedes configurar la detección de terceros mediante las siguientes opciones:

```shell
export DD_THIRD_PARTY_EXCLUDES=<LIST_OF_USER_CODE_PACKAGE_PREFIXES>
export DD_THIRD_PARTY_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES>
```

Lista significa una lista de prefijos de paquete separados por comas, por ejemplo:

```shell
export DD_THIRD_PARTY_EXCLUDES=com.mycompany,io.mycompany
```

[1]: /es/dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-dotnet
---
aliases:
- /es/tracing/dynamic_instrumentation/enabling/dotnet/
code_lang: dotnet
code_lang_weight: 30
further_reading:
- link: contenedores
  tag: Documentación
  text: Empezando con Datadog Agent
private: false
title: Activar la Instrumentación dinámica para .NET
type: multi-code-lang
---

La Instrumentación dinámica es una característica de apoyo para las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][1] para tu aplicación, asegúrate de que tu Agent y biblioteca de rastreo están en la versión requerida, y ve directamente a la activación de la Instrumentación dinámica en el paso 4.

## Requisitos previos

Para una mejor experiencia, Datadog recomienda activar [Autocompletar y Buscar (en Vista previa)][8].

## Instalación

1. Instala o actualiza tu Agent a la versión [7.45.0][7] o posterior.
2. Si aún no tienes APM habilitado, en tu configuración del Agent, establece la variable de entorno `DD_APM_ENABLED` en `true` y escuchando en el puerto `8126/TCP`.
3. Instala o actualiza las bibliotecas de rastreo de .NET a la versión 2.54.0, siguiendo las instrucciones pertinentes para [.NET Framework][2] o [.NET Core][3].

   **Nota**: La Instrumentación dinámica está disponible en la biblioteca `dd-trace-dotnet` en las versiones 2.54.0 y posteriores.

4. Ejecuta tu servicio con la Instrumentación dinámica habilitada, al configurar la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_ENABLED` en `true`. Especifica las etiquetas de servicio unificado `DD_SERVICE`, `DD_ENV` y `DD_VERSION` para que puedas filtrar y agrupar tus sondas y dirigirte a los clientes activos a través de estas dimensiones.
5. Después de iniciar tu servicio con la Instrumentación dinámica activada, puedes empezar a utilizar la Instrumentación dinámica en la página [APM > Dynamic Instrumentation][4] (Instrumentación dinámica).

## Configuración

Configura la Instrumentación dinámica mediante las siguientes variables de entorno:

| Variable de entorno                             | Tipo          | Descripción                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Booleano       | Selecciona `true` para activar la Instrumentación dinámica.                                                                          |
| `DD_SERVICE`                                     | Cadena        | El nombre de [servicio][5], por ejemplo, `web-backend`.                                                                        |
| `DD_ENV`                                         | Cadena        | El nombre de [entorno][5], por ejemplo, `production`.                                                                     |
| `DD_VERSION`                                     | Cadena        | La [versión][5] de tu servicio.                                                                                         |
| `DD_TAGS`                                        | Cadena        | Las etiquetas para aplicar a los datos producidos. Debe ser una lista de `<key>:<value>` separados por comas como: `layer:api,team:intake`.   |

## Próximos pasos

Consulta [Instrumentación dinámica][6] para obtener información sobre la configuración de los snapshot y las sondas de métrica y la exploración e indexación de los datos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: /es/tracing/trace_collection/dd_libraries/dotnet-framework/
[3]: /es/tracing/trace_collection/dd_libraries/dotnet-core/
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: /es/dynamic_instrumentation/
[7]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[8]: /es/dynamic_instrumentation/symdb/
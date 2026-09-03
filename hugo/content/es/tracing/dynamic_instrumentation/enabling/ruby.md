---
aliases:
- /es/dynamic_instrumentation/enabling/ruby/
code_lang: ruby
code_lang_weight: 30
further_reading:
- link: contenedores
  tag: Documentación
  text: Empezando con Datadog Agent
private: false
title: Activar Dynamic Instrumentation para Ruby
type: multi-code-lang
---

{{< beta-callout-private url="https://www.datadoghq.com/product-preview/dynamic-instrumentation-for-ruby/" >}}
    Dynamic Instrumentation para Ruby está en vista previa limitada, y no está disponible para todos los clientes.
    Solicita acceso para unirse a la lista de espera.
    Ten en cuenta que se aplican <a href="#limitations">algunas limitaciones</a> a la vista previa.
{{< /beta-callout-private >}}

Dynamic Instrumentation es una característica de apoyo para las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][1] para tu aplicación, asegúrate de que tu Agent y biblioteca de rastreo están en la versión requerida. A continuación, ve directamente a la activación de Dynamic Instrumentation en el paso 4.

**Nota**: Dynamic Instrumentation sólo es compatible con aplicaciones que se ejecuten en el entorno `production` (`RAILS_ENV`, `RACK_ENV`, etc.).

## Instalación

1. Instala o actualiza tu Agent a la versión [7.49.0][7] o posterior.
2. Si aún no tienes APM habilitado, en tu configuración del Agent, establece la variable de entorno `DD_APM_ENABLED` en `true` y escuchando en el puerto `8126/TCP`.
3. Instala o actualiza la librería de rastreo de Ruby a la versión 2.9.0 o posterior, siguiendo las [instrucciones pertinentes][2].
4. Ejecuta tu servicio conDynamic Instrumentation habilitada, al configurar la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_ENABLED` en `true`. Especifica las etiquetas de servicio unificado `DD_SERVICE`, `DD_ENV` y `DD_VERSION` para que puedas filtrar y agrupar tus instrumentaciones y dirigirte a los clientes activos a través de estas dimensiones.
5. Después de iniciar tu servicio con la Dynamic Instrumentation activada, puedes empezar a utilizar Dynamic Instrumentation en la página [APM > Dynamic Instrumentation][3].

## Configuración

Configurar Dynamic Instrumentation utilizando las siguientes variables de entorno:

| Variable de entorno                             | Tipo          | Descripción                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Booleano       | Selecciona `true` para activar Dynamic Instrumentation.                                                                          |
| `DD_SERVICE`                                     | Cadena        | El nombre de [servicio][4], por ejemplo, `web-backend`.                                                                        |
| `DD_ENV`                                         | Cadena        | El nombre de [entorno][4], por ejemplo, `production`.                                                                     |
| `DD_VERSION`                                     | Cadena        | La [versión][4] de tu servicio.                                                                                         |
| `DD_TAGS`                                        | Cadena        | Etiquetas para aplicar a los datos producidos. Debe ser una lista de `<key>:<value>` separada por comas como: `layer:api,team:intake`.   |

## ¿Qué hacer a continuación?

Consulta [Dynamic Instrumentation][5] para obtener información sobre cómo añadir instrumentaciones y explorar e indexar los datos.

## Limitaciones

Las siguientes limitaciones se aplican a la vista previa limitada:

### Funciones compatibles

- [Logs dinámicos][8]
- Captura de variables para logs dinámicos adjuntos a un archivo/línea específica
- [Redacción de PII][10]
- [Integración de código fuente][9]

### Funciones no compatibles

- Métricas, tramos y span tags dinámicos
- Condiciones de logs dinámicos
- Captura de variables locales para logs dinámicos adjuntos a un método
- Evaluación de expresiones en las plantillas de logs dinámicos
- Instrumentación de librerías de terceros

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: /es/tracing/trace_collection/dd_libraries/ruby/
[3]: https://app.datadoghq.com/dynamic-instrumentation
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: /es/dynamic_instrumentation/
[7]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[8]: /es/dynamic_instrumentation/#creating-log-probes
[9]: /es/integrations/guide/source-code-integration/?tab=ruby
[10]: /es/dynamic_instrumentation/sensitive-data-scrubbing/#custom-identifier-redaction

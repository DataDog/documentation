---
aliases:
- /es/tracing/dynamic_instrumentation/enabling/python/
code_lang: python
code_lang_weight: 20
further_reading:
- link: /agent/
  tag: Documentación
  text: Empezando con Datadog Agent
private: false
title: Activar Dynamic Instrumentation para Python
type: multi-code-lang
---

Dynamic Instrumentation es una característica de apoyo para las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][1] para tu aplicación, asegúrate de que tu Agent y biblioteca de rastreo están en la versión requerida. A continuación, ve directamente a la activación de Dynamic Instrumentation en el paso 4.

## Requisitos previos

Recomendado, [autocompletar y buscar (en Vista previa)][6] está activado.

## Instalación

1. Instala o actualiza tu Agent a la versión [7.45.0][2] o posterior.
2. Si aún no tienes APM habilitado, en tu configuración del Agent, establece la variable de entorno `DD_APM_ENABLED` en `true` y escuchando en el puerto `8126/TCP`.

3. Instala `ddtrace`, que proporciona tanto rastreo como Dynamic Instrumentation:

   ```shell
   pip install ddtrace
   ```

   **Nota**: Dynamic Instrumentation está disponible en la biblioteca `ddtrace` a partir de la versión 2.2.0.

4. Ejecuta tu servicio conDynamic Instrumentation habilitada, al configurar la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_ENABLED` en `true`. Especifica las etiquetas de servicio unificado `DD_SERVICE`, `DD_ENV` y `DD_VERSION` para que puedas filtrar y agrupar tus instrumentaciones y dirigirte a los clientes activos a través de estas dimensiones.
{{< tabs >}}
{{% tab "Environment variables" %}}

Invoca tu servicio:
```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
ddtrace-run python -m myapp.py
```
{{% /tab %}}
{{% tab "En código" %}}

```python
from ddtrace.debugging import DynamicInstrumentation

DynamicInstrumentation.enable()
```
{{% /tab %}}
{{< /tabs >}}

4. Después de iniciar tu servicio con la Dynamic Instrumentation activada, puedes empezar a utilizarlo en la página [APM > Dynamic Instrumentation][3].

## Configuración

Configurar Dynamic Instrumentation utilizando las siguientes variables de entorno:

| Variable de entorno                             | Tipo          | Descripción                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Booleano       | Selecciona `true` para activar Dynamic Instrumentation.                                                                          |
| `DD_SERVICE`                                     | Cadena        | El nombre de [servicio][4], por ejemplo, `web-backend`.                                                                        |
| `DD_ENV`                                         | Cadena        | El nombre de [entorno][4], por ejemplo, `production`.                                                                     |
| `DD_VERSION`                                     | Cadena        | La [versión][4] de tu servicio.                                                                                         |
| `DD_TAGS`                                        | Cadena        | Etiquetas para aplicar a los datos producidos. Debe ser una lista de `<key>:<value>` separada por comas como: `layer:api, team:intake`.  |

## ¿Qué hacer a continuación?

Consulta [Dynamic Instrumentation][5] para obtener información sobre cómo añadir instrumentaciones y explorar e indexar los datos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/dynamic-instrumentation
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: /es/dynamic_instrumentation/
[6]: /es/dynamic_instrumentation/symdb/
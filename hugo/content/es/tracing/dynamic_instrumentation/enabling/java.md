---
aliases:
- /es/dynamic_instrumentation/enabling/java/
code_lang: java
code_lang_weight: 10
further_reading:
- link: contenedores
  tag: Documentación
  text: Empezando con Datadog Agent
private: false
title: Activar Dynamic Instrumentation para Java
type: multi-code-lang
---

Dynamic Instrumentation es una característica de apoyo para las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][1] para tu aplicación, asegúrate de que tu Agent y biblioteca de rastreo están en la versión requerida. A continuación, ve directamente a la activación de Dynamic Instrumentation en el paso 4.

## Requisitos

- La librería de Datadog Dynamic Instrumentation es compatible en JDK versión 8 y posteriores.
- Para una mejor experiencia, Datadog recomienda activar [autocompletar y búsqueda (en Vista previa)][7].

## Instalación

1. Instala o actualiza tu Agent a la versión [7.49.0][2] o posterior.
2. Si aún no tienes APM habilitado, en tu configuración del Agent, establece la variable de entorno `DD_APM_ENABLED` en `true` y escuchando en el puerto `8126/TCP`.

3. Descarga `dd-java-agent.jar`:
 {{< tabs >}}
 {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}

   **Nota**: Dynamic Instrumentation está disponible en la librería `dd-java-agent.jar` en las versiones 1.34.0 y posteriores.

3. Ejecuta tu servicio con Dynamic Instrumentation habilitado configurando el indicador `-Ddd.dynamic.instrumentation.enabled` o la variable de entorno `DD_DYNAMIC_INSTRUMENTATION_ENABLED` en `true`. Especifica las etiquetas de servicio unificado `dd.service`, `dd.env` y `dd.version` para que puedas filtrar y agrupar tus instrumentaciones y apuntar a clientes activos a través de estas dimensiones.
   {{< tabs >}}
{{% tab "Argumentos del comando" %}}

Ejemplo del comando de inicio del servicio:
```shell
java \
    -javaagent:dd-java-agent.jar \
    -Ddd.service=<YOUR_SERVICE> \
    -Ddd.env=<YOUR_ENVIRONMENT> \
    -Ddd.version=<YOUR_VERSION> \
    -Ddd.dynamic.instrumentation.enabled=true \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{% tab "Variables de entorno" %}}

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{< /tabs >}}

   **Nota**: El argumento `-javaagent` debe estar antes de `-jar`, añadiéndolo como una opción de JVM en lugar de un argumento de aplicación. Para más información, consulta la [documentación de Oracle][3]:

   ```shell
   # Good:
   java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
   # Bad:
   java -jar my-service.jar -javaagent:dd-java-agent.jar ...
   ```

4. Después de iniciar tu servicio con la Dynamic Instrumentation activada, puedes empezar a utilizar Dynamic Instrumentation en la página [APM > Dynamic Instrumentation][4].

## Configuración

Configurar Dynamic Instrumentation utilizando las siguientes variables de entorno:

| Variable de entorno                             | Tipo          | Descripción                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Booleano       | Alternativa para el argumento `-Ddd.dynamic.instrumentation.enabled`. Establecido en `true` para activar Dynamic Instrumentation.           |
| `DD_SERVICE`                                     | Cadena        | El nombre de [servicio][5], por ejemplo, `web-backend`.                                                                        |
| `DD_ENV`                                         | Cadena        | El nombre de [entorno][5], por ejemplo, `production`.                                                                     |
| `DD_VERSION`                                     | Cadena        | La [versión][5] de tu servicio.                                                                                         |
| `DD_TAGS`                                        | Cadena        | Etiquetas para aplicar a los datos producidos. Debe ser una lista de `<key>:<value>` separada por comas como: `layer:api,team:intake`.   |

## ¿Qué hacer a continuación?

Consulta [Dynamic Instrumentation][6] para obtener información sobre cómo añadir instrumentaciones y explorar e indexar los datos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: /es/tracing/dynamic_instrumentation/
[7]: /es/dynamic_instrumentation/symdb/

---
aliases:
- /es/bits_ai/bits_ai_sre/chat_bits_ai_sre/
title: Chatear con Bits Investigation
---
Dentro de una investigación, puede chatear con Bits para recopilar información adicional sobre la investigación, la telemetría relacionada y más.

{{< img src="bits_ai/bits_ai_sre_chat_example.png" alt="Ejemplo de chat donde un usuario le pregunta a Bits AI sobre incidentes relacionados en curso, y Bits AI responde con una lista de incidentes relacionados y una explicación de qué los hace relacionados" style="width:100%;" >}}

## Fuentes de datos {#data-sources}

El Bits Investigation chatbot tiene acceso a:
- **Detalles de la investigación**: Detalles sobre la alerta del monitor, las consultas exploratorias que se ejecutaron, las hipótesis y sus evaluaciones, y la conclusión sobre la causa raíz
- **Telemetría**: Detalles sobre métricas, registros, trazas, eventos, monitores, eventos RUM, tableros, Notebooks y hosts
- **Incidentes**: Detalles sobre los incidentes y su estado, gravedad y más
- **Servicios**: Servicios en el Catálogo con sus dependencias, propietarios y más
- **Documentación de Datadog**: Información documentada del producto Datadog
- **Documentación de Confluence**: Documentación o runbooks relevantes de su documentación de Confluence (si la [integración de Confluence está configurada para habilitar el rastreo de cuentas][1])

## Ejemplos de preguntas {#example-questions}

| Funcionalidad                                  | Ejemplo de prompt                                                    | Fuente de datos                       |
|------------------------------------------------|-------------------------------------------------------------------|-----------------------------------|
| Pedir aclaraciones sobre los detalles de la investigación | `Why do you think there's database query slowness?`               | Detalles de Bits Investigation |
| Pedir explicaciones sobre los hallazgos de la investigación | `Tell me more about the increased 500s on <web-store>.`           | Detalles de Bits Investigation |
| Aprender a hacer que Bits funcione mejor             | `How can I make the investigation more effective next time?`      | Detalles de Bits Investigation |
| Buscar información sobre un servicio            | `Are there any ongoing incidents for <web-store>?`                | Catálogo e incidentes    |
| Encontrar cambios recientes para un servicio              | `Were there any recent changes on <web-store>?`                   | Change Tracking                   |
| Consultar métricas de solicitudes, errores y duración de APM | `What's the current error rate for <web-store>?`                  | APM                               |
| Consultar y analizar datos de perfilado               | `What performance bottlenecks do you see for <web-store>?`        | Continuous Profiler                               |
| Preguntar sobre los productos de Datadog                     | `Does Bits Investigation connect to Datadog Work Management?`     | Documentación de Datadog             |
| Crear un Notebook                              | `Can you create a notebook with a summary of this investigation?` | Notebooks                         |

[1]: bits_ai/bits_investigation/configure#confluence
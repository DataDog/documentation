---
title: Chatear con SRE de Bits AI
---

Dentro de una investigación, puedes chatear con Bits para obtener información adicional sobre la investigación, la telemetría relacionada y mucho más. 

{{< img src="bits_ai/bits_ai_sre_chat_example.png" alt="Ejemplo de chat en el que un usuario consulta a Bits AI sobre incidentes activos relacionados y Bits AI responde con una lista de incidentes relacionados y con una explicación de por qué están relacionados" style="width:100%;" >}}

## Fuentes de datos

El chatbot de SRE de Bits AI tiene acceso a:
- **Información sobre la investigación**: Información sobre la alerta de monitor, las consultas exploratorias ejecutadas, las hipótesis y sus evaluaciones, y la conclusión sobre la causa.
- **Telemetría**: Información sobre métricas, logs, trazas, eventos, monitores, eventos RUM, dashboards, notebooks y hosts.
- **Incidentes**: Información sobre incidentes y su estado, gravedad, etc.
- **Servicios**: Servicios en el Software Catalog con sus dependencias, propietarios y más.
- **Documentación de Datadog**: Información documentada sobre el producto Datadog 
- **Documentación de Confluence**: Documentación relevante o runbooks de tu documentación de Confluence (si la [integración de Confluence está configurada para permitir el rastreo de cuentas][1]).

## Ejemplos de preguntas

| Funcionalidad                                  | Ejemplo de mensaje                                                    | Fuente de datos                       |
|------------------------------------------------|-------------------------------------------------------------------|-----------------------------------|
| Pedir aclaraciones de la información de la investigación | `¿Por qué crees que existe una lentitud en las consultas de la base de datos?`               | Información de la investigación de SRE de Bits AI |
| Pedir explicaciones sobre los resultados de la investigación | `Necesito más información acerca de los 500 adicionales en <web-store>.`           | Información de la investigación de SRE de Bits AI |
| Más información sobre cómo hacer que Bits funcione mejor             | `¿Cómo puedo lograr que la investigación sea más eficaz la próxima vez?`      | Información de la investigación de SRE de Bits AI |
| Buscar información sobre un servicio            | `¿Existe algún incidente activo de <web-store>?`                | Software Catalog e incidentes    |
| Buscar cambios recientes en un servicio              | `¿Ha habido algún cambio reciente en <web-store>?`                   | Rastreo de cambios                   |
| Consultar métricas de solicitudes APM, errores y duración | `¿Cuál es la tasa actual de error de <web-store>?`                  | APM                               |
| Preguntar acerca de los productos Datadog                      | `¿Se conecta SRE de Bits AI con Datadog Case Management?`            | Documentación de Datadog             |
| Crear un notebook                              | `¿Es posible crear un notebook con el resumen de esta investigación?` | Notebooks                         |

[1]: /es/bits_ai/bits_ai_sre/configure/#configure-knowledge-base-integrations
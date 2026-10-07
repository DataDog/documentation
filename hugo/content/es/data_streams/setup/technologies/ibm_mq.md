---
title: Data Streams Monitoring para IBM MQ
---

### Requisitos previos

* [Datadog Agent v7.34.0 o más reciente][1]

| Lenguaje     | Biblioteca                                                                                        | Versión mínima del rastreador                                                            | Versión recomendada del rastreador                                                            |
|--------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [.NET][2] | [IBMMQDotnetClient][3]           | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="minimal" >}}          | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="recommended" >}}          |
| [Java][4]  | [Clases IBM MQ para Java y JMS][5]  | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="minimal" >}}          | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="recommended" >}}       |

### Limitaciones
Para otras tecnologías de colas, los rastreadores de Datadog añaden un encabezado de propagación de contexto a los mensajes. Sin embargo, la propagación de contexto para IBM MQ es propensa a errores, ya que pueden aparecer campos adicionales inesperados en los mensajes. Para evitar riesgos para los servicios de atención al cliente, Datadog no propaga el contexto para las traces (trazas) de IBM MQ.

Debido a esta limitación, la vista de rutas de Data Streams Monitoring no puede filtrar mensajes IBM MQ en función de la ruta ascendente.

Las métricas de la latencia para rutas que fluyen completamente a través de IBM MQ están disponibles, aunque son aproximadas. El rendimiento de los mensajes y la presencia completa en el mapa de topology (topología) de Data Streams son totalmente compatibles.

### Configuración de Data Streams Monitoring
Consulta las instrucciones de configuración de [.NET][2] o [Java][4].

[1]: /es/agent
[2]: /es/data_streams/setup/language/dotnet
[3]: https://www.nuget.org/packages/IBMMQDotnetClient
[4]: /es/data_streams/setup/language/java
[5]: https://mvnrepository.com/artifact/com.ibm.mq/com.ibm.mq.jakarta.client
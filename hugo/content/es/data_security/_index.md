---
cascade:
  algolia:
    rank: 70
further_reading:
- link: /data_security/logs/
  tag: Documentación
  text: Seguridad de los datos de logs
- link: /data_security/agent/
  tag: Documentación
  text: Seguridad de los datos del Agent
- link: /data_security/synthetics/
  tag: Documentación
  text: Seguridad de datos de Synthetic Monitoring
- link: /tracing/configure_data_security/
  tag: Documentación
  text: Seguridad de los datos de traza
- link: /data_security/real_user_monitoring/
  tag: Documentación
  text: Seguridad de los datos de RUM
- link: /session_replay/privacy_options?platform=browser
  tag: Documentación
  text: Opciones de privacidad de Session Replay
- link: /security/sensitive_data_scanner/
  tag: Documentación
  text: Sensitive Data Scanner
title: Reducción de riesgos relacionados con los datos
---
<div class="alert alert-info">Esta página trata sobre las herramientas y la seguridad para proteger los datos enviados a Datadog. Si busca productos y funciones de seguridad de la nube y de aplicaciones, consulte la sección <a href="/security/" target="_blank">Security</a>.</div>

En el curso normal del uso previsto de Datadog, usted envía datos a Datadog. Datadog trabaja junto con usted para reducir el riesgo de los datos al proporcionarle herramientas para limitar adecuadamente los datos que envía y proteger los datos durante y después de su transmisión.

También puede consultar la información disponible en [Datadog Security][1] y los términos de nuestra [Privacy Policy][2].

## Cómo llegan los datos desde usted a Datadog {#how-data-gets-from-you-to-datadog}

Datadog le permite enviar datos a Datadog de múltiples maneras, incluyendo desde el Agent, [DogStatsD][3], la API pública e integraciones. Además, los SDK de Real User Monitoring y los SDK de APM generan datos basados en el código de sus aplicaciones y servicios, y los envían a Datadog. 

Los datos en tránsito a través de las herramientas proporcionadas por Datadog están protegidos con TLS y HSTS. Los datos almacenados por Datadog están protegidos mediante cifrado, controles de acceso y autenticación. Para obtener detalles específicos, lea más en [Datadog Security][1].

### El Datadog Agent {#the-datadog-agent}

El Agent es el canal principal para que los datos lleguen desde sus sistemas a Datadog. [Lea todo sobre las medidas de seguridad de los datos en el Agent][4]. 

Para saber cómo evitar el almacenamiento de secretos en texto plano en los archivos de configuración del Agent, consulte [Secrets Management][5].

### Integraciones de servicios de terceros {#third-party-services-integrations}

Las integraciones para algunos servicios de terceros se configuran directamente en Datadog y podrían requerir que usted proporcione credenciales para permitir que Datadog se conecte al servicio en su nombre. Las credenciales que usted proporciona son cifradas y almacenadas por Datadog en un almacén de datos de credenciales seguro. 

Todos los datos a través de estas integraciones se cifran cuando están en reposo en los sistemas de Datadog y se cifran en tránsito. El acceso al almacén de datos de credenciales seguras está controlado y auditado, y los servicios o acciones específicos dentro de los servicios de terceros se limitan solo a lo necesario. Las herramientas de detección de comportamiento anómalo hacen un seguimiento continuo del acceso no autorizado. El acceso de los empleados de Datadog para fines de mantenimiento se limita a un subconjunto selecto de ingenieros.

### Integraciones de nube {#cloud-integrations}

Debido a su naturaleza confidencial, se implementan medidas de seguridad adicionales, siempre que sea posible, al realizar integraciones con proveedores de nube, incluido el uso de credenciales dedicadas de Datadog con permisos limitados. Por ejemplo:

* La [integración con Amazon Web Services][6] requiere que configure la delegación de roles mediante AWS IAM, según la [guía de mejores prácticas de AWS IAM][7], y que otorgue permisos específicos con una política de AWS.
* La integración con [Microsoft Azure][8] depende de que usted defina un tenant para Datadog, con acceso a una aplicación específica otorgado solo con el rol de "reader" para las suscripciones que desea monitorizar.
* La integración con [Google Cloud Platform][9] depende de que usted defina una cuenta de servicio para Datadog y le otorgue solo los roles de "Compute Viewer" y "Monitoring Viewer".

## Medidas que puede implementar para reducir el riesgo de sus datos {#measures-you-can-implement-to-reduce-your-data-risk}

El propósito de Datadog es recopilar información de observabilidad de muchas fuentes en torno a su infraestructura y servicios, y reunirla en un solo lugar para que usted la analice e investigue. Esto implica que usted envíe una amplia gama de tipos de contenido de datos a los servidores de Datadog. La mayor parte de los datos recopilados para el uso previsto de los productos de Datadog tiene pocas probabilidades de contener datos privados o personales. Para los datos que puedan contener datos privados o personales innecesarios, proporcionamos instrucciones, herramientas y recomendaciones para permitirle eliminar, ofuscar y, de otro modo, reducir la inclusión de datos privados o personales en los datos compartidos con Datadog.

### Sensitive Data Scanner {#sensitive-data-scanner}

Sensitive Data Scanner es un servicio de coincidencia de patrones basado en flujos que puede utilizar para identificar, etiquetar y, opcionalmente, redactar o aplicar hash a datos confidenciales. Con su implementación, sus equipos de seguridad y cumplimiento pueden introducir una línea de defensa para evitar que los datos confidenciales se filtren fuera de su organización. Para obtener información sobre el escáner y su configuración, lea [Sensitive Data Scanner][10].

### Log Management {#logs-management}

Los logs son registros producidos por sus sistemas y servicios, y por las actividades que ocurren dentro de ellos. Lea sobre las consideraciones de seguridad de los datos de logs, incluida información sobre cómo puede filtrar y ofuscar datos de logs en [Log Management Data Security][11]. 

Profundice en el control de los datos de logs con la guía [Manage Sensitive Logs Data Access][12] y [Agent Advanced Configuration for Logs][13].

Un enfoque clave para reducir el riesgo en torno a la seguridad de los datos de logs es el control de acceso. Lea [How to set up RBAC for Logs][14] y [Logs RBAC Permissions][15] para aprender cómo hacer esto en Datadog.

### Procesos y contenedores en vivo {#live-processes-and-containers}

Para evitar la filtración de datos confidenciales cuando supervisa procesos y contenedores en vivo, Datadog proporciona una depuración de palabras clave confidenciales predeterminada en los argumentos de proceso y en los gráficos de Helm. Puede ofuscar secuencias confidenciales adicionales dentro de comandos o argumentos de proceso mediante el [`custom_sensitive_words` setting][16], y añadir a la lista de palabras de depuración de contenedores mediante la [`DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS` environment variable][17].

### APM y otros productos basados en SDK {#apm-and-other-sdk-based-products}

Los SDK de Datadog se utilizan para instrumentar sus aplicaciones, servicios, pruebas y canalizaciones, y enviar datos de rendimiento a través del Agent a Datadog. Se generan datos de trazas y tramos (junto con mucho más) para que los siguientes productos los utilicen:

- Application Performance Monitoring (APM)
- Continuous Profiler
- CI Visibility
- App and API Protection

Para obtener información detallada sobre cómo se gestionan los datos procedentes de la biblioteca de rastreo, la configuración básica de seguridad predeterminada y la ofuscación, depuración, exclusión y modificación personalizada de elementos relacionados con las trazas, lea [Configuring Agent and Tracer for trace data security][18].

### Serverless distributed tracing {#serverless-distributed-tracing}

Puede usar Datadog para recopilar y visualizar las cargas útiles JSON de solicitud y respuesta de las funciones de AWS Lambda. Para evitar que se envíen a Datadog datos confidenciales dentro de objetos JSON de solicitud o respuesta (como ID de cuenta o direcciones), puede depurar parámetros específicos para que no se envíen a Datadog. Lea [Obfuscating AWS Lambda payload contents][19] para obtener más información.

### Synthetic Monitoring {#synthetic-monitoring}

Las pruebas Synthetic simulan solicitudes y transacciones comerciales desde ubicaciones de prueba en todo el mundo. Lea sobre las consideraciones de cifrado para configuraciones, activos, resultados y credenciales, así como sobre cómo utilizar las opciones de privacidad de las pruebas, en [Synthetic Monitoring Data Security][20].

### RUM y Session Replay {#rum-session-replay}

Puede modificar los datos recopilados por Real User Monitoring en el navegador para proteger la información de identificación personal y para muestrear los datos de RUM que está recopilando. Lea [Modifying RUM Data and Context][21] para obtener más detalles.
 
Las opciones de privacidad de Session Replay están configuradas de forma predeterminada para proteger la privacidad del usuario y evitar que se recopile información confidencial de la organización. Lea sobre cómo enmascarar, sobrescribir y ocultar elementos de una Session Replay en [Session Replay Privacy Options][22]. El enmascaramiento en Session Replay es permanente: Los valores enmascarados nunca salen del dispositivo y no se pueden desenmascarar más tarde. Esto difiere de la [acción de enmascaramiento de Sensitive Data Scanner][26], que ofusca los valores coincidentes en la ingesta y permite a los usuarios con el permiso `Data Scanner Unmask` ver el valor original.

### Database Monitoring {#database-monitoring}

El Agent de Database Monitoring ofusca todos los parámetros de enlace de consulta enviados a la ingesta de Datadog. Por lo tanto, las contraseñas, la PII (información de identificación personal) y otra información potencialmente confidencial almacenada en su base de datos no serán visibles en las métricas de consulta, las muestras de consulta o los planes de explicación. Para leer sobre cómo mitigar el riesgo para otros tipos de datos involucrados en el monitoreo del rendimiento de bases de datos, lea [Database Monitoring Data Collected][23].

## Otras fuentes de datos potencialmente confidenciales {#other-sources-of-potentially-sensitive-data}

Además de los datos confidenciales que puede depurar, ofuscar y evitar recopilar automáticamente, gran parte de los datos recopilados por Datadog son nombres y descripciones de elementos. Recomendamos no incluir información privada o personal en el texto que envía. Considere la siguiente lista (no exhaustiva) de datos de texto que envía a Datadog en el uso previsto del producto:

Metadatos y etiquetas
: Los metadatos consisten principalmente en [etiquetas][24] en el formato `key:value`, por ejemplo, `env:prod`. Datadog utiliza los metadatos para filtrar y agrupar datos con el fin de ayudarle a obtener información significativa. 

Dashboards, notebooks, alertas, monitores, alertas, incidentes, SLOs
: Las descripciones de texto, los títulos y los nombres que les asigna a las cosas que crea en Datadog son datos. 

Métricas
: Las métricas, incluidas las métricas de infraestructura y las métricas generadas a partir de integraciones y otros datos ingeridos como registros, trazas, RUM y pruebas Synthetic, son series temporales utilizadas para completar gráficos. Por lo general, tienen etiquetas asociadas.

Datos de APM
: Los datos de APM incluyen servicios, recursos, perfiles, trazas y spans, junto con etiquetas asociadas. Lea [el Glosario de APM][25] para obtener una explicación sobre cada uno. 

Firmas de consultas de base de datos
: Los datos de Database Monitoring consisten en métricas y muestras, junto con sus etiquetas asociadas, recopiladas por el Agent y utilizadas para rastrear el rendimiento histórico de las consultas normalizadas. La granularidad de estos datos se define por su firma de consulta normalizada y su identificador de servidor único. Todos los parámetros de consulta se ofuscan y se descartan de las muestras recopiladas antes de enviarse a Datadog.

Información de procesos
: Los procesos consisten en métricas y datos del `proc` sistema de archivos, el cual actúa como una interfaz para las estructuras de datos internas en el kernel. Los datos de procesos pueden contener el comando del proceso (incluida su ruta y argumentos), el nombre de usuario asociado, el ID del proceso y su padre, el estado del proceso y el directorio de trabajo. Los datos de procesos generalmente también tienen metadatos de etiquetas asociados.

Eventos y comentarios
: Los datos de eventos se agregan desde múltiples fuentes en una vista consolidada, incluidos los monitores activados, los eventos enviados por integraciones, los eventos enviados por la propia aplicación y los comentarios enviados por los usuarios o a través de la API. Los eventos y comentarios generalmente tienen metadatos de etiquetas asociados.

Canalizaciones y pruebas de Continuous Integration
: Los nombres de las ramas, canalizaciones, pruebas y conjuntos de pruebas son todos datos enviados a Datadog.

### Lecturas Adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/security/
[2]: https://www.datadoghq.com/legal/privacy/
[3]: /es/extend/dogstatsd/
[4]: /es/data_security/agent/
[5]: /es/agent/configuration/secrets-management/
[6]: /es/integrations/amazon_web_services/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[8]: /es/integrations/azure/
[9]: /es/integrations/google_cloud_platform/
[10]: /es/security/sensitive_data_scanner/
[11]: /es/data_security/logs/
[12]: /es/logs/guide/manage-sensitive-logs-data-access/
[13]: /es/agent/logs/advanced_log_collection
[14]: /es/logs/guide/logs-rbac
[15]: /es/logs/guide/logs-rbac-permissions
[16]: /es/infrastructure/process/#process-arguments-scrubbing
[17]: /es/infrastructure/livecontainers/configuration/#scrubbing-sensitive-information
[18]: /es/tracing/configure_data_security/
[19]: /es/serverless/distributed_tracing/collect_lambda_payloads#obfuscating-payload-contents
[20]: /es/data_security/synthetics/
[21]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/
[22]: /es/session_replay/privacy_options?platform=browser
[23]: /es/database_monitoring/data_collected/#sensitive-information
[24]: /es/getting_started/tagging/
[25]: /es/tracing/glossary/
[26]: /es/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action
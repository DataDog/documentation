---
cascade:
  algolia:
    rank: 70
further_reading:
- link: /data_security/logs/
  tag: Documentación
  text: Seguridad de los datos en los logs
- link: /data_security/agent/
  tag: Documentación
  text: Seguridad de los datos en el Agent
- link: /data_security/synthetics/
  tag: Documentación
  text: Seguridad de los datos en la monitorización Synthetic
- link: /tracing/configure_data_security/
  tag: Documentación
  text: Seguridad de los datos de rastreo
- link: /data_security/real_user_monitoring/
  tag: Documentación
  text: Seguridad de los datos en RUM
- link: /real_user_monitoring/session_replay/browser/privacy_options
  tag: Documentación
  text: Opciones de privacidad de Session Replay
- link: /sensitive_data_scanner/
  tag: Documentación
  text: Sensitive Data Scanner
title: Reducir los riesgos que amenazan los datos
---

<div class="alert alert-info">En esta página, hablamos sobre las herramientas y las medidas de seguridad existentes para proteger los datos que se envían a Datadog. Si estás buscando productos y funciones para proteger las aplicaciones y las soluciones en la nube, consulta la sección <a href="/security/" target="_blank">Seguridad</a>.</div>

Si vas a hacer el uso previsto de Datadog, tendrás que enviar datos a Datadog. Datadog te ayuda a reducir los riesgos asociados a los datos y te proporciona herramientas para limitar de forma apropiada los datos que envías y protegerlos durante la transmisión y una vez que esta finaliza.

Es posible que también quieras consultar la información disponible en la [sección de seguridad de Datadog][1] y los términos de nuestra [política de privacidad][2].

## Cómo llegan tus datos a Datadog

Tus datos pueden llegar a Datadog de diversas maneras; por ejemplo, desde el Agent, [DogStatsD][3], la API pública y las integraciones. Además, los SDK de Real User Monitoring (RUM) y las bibliotecas de rastreo generan datos basados en el código de tus aplicaciones y servicios, y los envían a Datadog.

Los datos que se transmiten a través de las herramientas proporcionadas por Datadog se protegen mediante los protocolos TLS y HSTS. Los datos almacenados por Datadog se protegen mediante cifrado, controles de acceso y sistemas de autenticación. Para más detalles, consulta la [sección de seguridad de Datadog][1].

### El Datadog Agent

El Agent representa la principal vía de transmisión de los datos desde tus sistemas a Datadog. [Consulta todo lo que debes saber sobre las medidas de seguridad que aplica el Agent para proteger tus datos][4]. 

Para saber cómo evitar que se almacenen secretos en texto sin formato en los archivos de configuración del Agent, consulta [Gestión de secretos][5].

### Integraciones con servicios de terceros

Las integraciones con algunos servicios de terceros se configuran directamente en Datadog, y es posible que tengas que introducir tus credenciales para que Datadog se conecte a dicho servicio por ti. Datadog cifra esas credenciales y las guarda en un almacén seguro.

Todos los datos que pasan por estas integraciones se cifran cuando están en reposo en los sistemas de Datadog y cuando se están transmitiendo. El acceso al almacén de credenciales seguro está controlado y se somete a auditorías, y los servicios o las acciones en los servicios de terceros se limitan exclusivamente a lo necesario. Existen herramientas de detección de comportamientos anómalos en constante funcionamiento para evitar accesos no autorizados. La autorización de acceso para realizar tareas de mantenimiento se limita a un grupo reducido de ingenieros de Datadog.

### Integraciones con soluciones en la nube

Las integraciones con proveedores de soluciones en la nube son de carácter confidencial. Por tanto, siempre que es posible, se aplican medidas de seguridad adicionales, como usar credenciales específicas de Datadog con permisos limitados. Por ejemplo:

* Para la [integración con Amazon Web Services (AWS)][6], debes configurar la delegación de roles en AWS IAM, tal y como se indica en las [prácticas recomendadas de seguridad en IAM de AWS][7], y conceder ciertos permisos mediante una política de AWS.
* Para la integración con [Microsoft Azure][8], tienes que definir un inquilino para Datadog que tenga acceso a una aplicación específica solo con el rol de lector en las suscripciones que quieres monitorizar.
* Para la integración con [Google Cloud Platform][9], debes asignar una cuenta de servicio a Datadog y concederle solo los roles de “Visualizador de Compute” y “Visualizador de Monitoring”.

## Medidas para mitigar los riesgos que amenazan los datos

El fin de Datadog es recopilar información de observabilidad de varias fuentes de tu infraestructura y tus servicios en un único lugar para que puedas analizarla e investigar. Para ello, es necesario que envíes una amplia variedad de datos a los servidores de Datadog. La mayoría de los datos recopilados para el funcionamiento previsto de los productos de Datadog, en la inmensa mayoría de los casos, no contienen información privada ni personal. Si se diera el caso de que los datos contuvieran información privada y personal innecesaria, para que puedas actuar, te proporcionamos instrucciones, herramientas y recomendaciones de cara a impedir o mitigar la inclusión de información privada o personal en los datos que compartes con Datadog, y enmascararla.

### Sensitive Data Scanner

Sensitive Data Scanner es un servicio de flujos que hace comparaciones con patrones establecidos para detectar, etiquetar y, si se quiere, limpiar o codificar mediante hash datos confidenciales. Al implementarlo, los equipos de seguridad y cumplimiento de tu organización pueden añadir una línea de defensa para impedir que los datos confidenciales salgan de ella. Para obtener información sobre esta herramienta de análisis y su configuración, consulta el artículo [Sensitive Data Scanner][10].

### Gestión de logs

Los logs son registros que producen tus sistemas y servicios, así como las actividades derivadas de ellos. Obtén información sobre cómo proteger los datos de los logs (por ejemplo, cómo filtrarlos y enmascararlos) en el artículo [Seguridad de los datos en Log Management][11]. 

Y si quieres información más detallada, puedes consultar la guía para [controlar los datos confidenciales de los logs][12] y el artículo sobre la [configuración avanzada de Agent para recopilar logs][13].

Para reducir los riesgos que amenazan la seguridad de los datos en los logs, es fundamental controlar los accesos. Descubre cómo [configurar RBAC en los logs][14] y cómo [funcionan los permisos de RBAC][15] en Datadog.

### Live Processes y Live Containers

Para que no se filtren datos confidenciales cuando estás monitorizando procesos activos y contenedores activos, Datadog ofrece la función predeterminada de limpieza de contraseñas confidenciales en argumentos de procesos y charts de Helm. Puedes enmascarar más secuencias confidenciales en comandos o argumentos de procesos con el [parámetro `custom_sensitive_words`][16] y añadirlas a la lista de palabras para limpiar en contenedores con la [variable de entorno `DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS`][17].

### APM y otros productos de bibliotecas de rastreo

Las bibliotecas de rastreo de Datadog sirven para instrumentar aplicaciones, servicios, pruebas y pipelines, y enviar datos de funcionamiento a Datadog mediante el Agent. Se generan datos de trazas (traces) y tramos (spans), entre muchos otros, para que puedan utilizarlos los siguientes productos:

- Application Performance Monitoring (APM)
- Continuous Profiler
- CI Visibility
- Application Security Management

Si quieres obtener información detallada sobre cómo se gestionan los datos que proceden de bibliotecas de rastreo, sobre las configuraciones de seguridad básicas y sobre las operaciones predeterminadas de enmascaramiento, limpieza, exclusión y modificación de elementos relacionados con trazas, consulta el artículo [Configurar Agent y el rastreador para proteger los datos de las trazas][18].

### Rastreo distribuido serverless

Con Datadog, puedes recopilar y visualizar las cargas útiles de solicitud y respuesta JSON de las funciones de AWS Lambda. Para que no se envíen a Datadog los datos confidenciales que puedan incluirse en objetos JSON de solicitud y respuesta (como el ID de cuenta y las direcciones), tienes la posibilidad de limpiar determinados parámetros. Consulta más detalles sobre cómo [enmascarar contenido de las cargas útiles de AWS Lambda][19].

### Synthetic Monitoring

Las pruebas sintéticas simulan solicitudes y transacciones empresariales en localizaciones de prueba de todo el mundo. En el artículo [Seguridad de los datos en Synthetic Monitoring][20] encontrarás todo lo que debes tener en cuenta para cifrar configuraciones, activos, resultados y credenciales, y para aprender a usar las opciones de privacidad de las pruebas.

### RUM y Session Replay

Puedes modificar los datos que recopila Real User Monitoring (RUM) del navegador para no proporcionar información de identificación personal y para muestrear los datos de RUM que se están recopilando. Para obtener más información, consulta el artículo [Modificar los datos y el contexto de RUM][21].

De manera predeterminada, Session Replay protege la privacidad de los usuarios finales e impide la recopilación de datos confidenciales de las organizaciones. Descubre cómo se enmascaran, se anulan y se ocultan elementos en las reproducciones de sesiones en el artículo [Opciones de privacidad de Session Replay][22].

### Database Monitoring

El Database Monitoring Agent enmascara todos los parámetros ligados a consultas que se envían a Datadog. Por lo tanto, ni las contraseñas, ni la información de identificación personal ni cualquier otro dato potencialmente confidencial que tengas en tu base de datos aparecerán en las métricas de consultas, en las muestras de consultas o en los planes explicativos. Para obtener información sobre cómo mitigar los riesgos que amenazan otros datos que se utilizan para monitorizar el funcionamiento de la base de datos, consulta el artículo [Datos recopilados para Database Monitoring][23].

## Otras fuentes de datos que pueden considerarse confidenciales

Además de los datos confidenciales que se pueden limpiar, enmascarar y excluir de la recopilación automáticamente, mucha de la información que recopila Datadog son nombres y descripciones de elementos. Te recomendamos que no incluyas información privada ni personal en los textos que envías. Piensa que para hacer el uso previsto de Datadog, envías los siguientes datos de texto (la lista no es exhaustiva):

Metadatos y etiquetas
: Los metadatos son, principalmente, [etiquetas][24] con el formato `key:value`; por ejemplo, `env:prod`. Datadog los utiliza para filtrar y agrupar datos con el fin de ayudarte a darle sentido a la información.

Dashboards, notebooks, alertas, monitores, incidencias y objetivos de nivel de servicio (SLOs)
: Los textos descriptivos, los títulos y los nombres que asignas a lo que creas en Datadog son datos.

Métricas
: Las métricas (incluidas las métricas de la infraestructura y las métricas provenientes de las integraciones) y los demás datos ingeridos (como logs, trazas, RUM y pruebas sintéticas) son cronologías que sirven para rellenar gráficos. Suelen tener etiquetas asociadas.

Datos de APM
: Entre los datos de APM se incluyen servicios, recursos, perfiles, trazas y tramos, además de sus etiquetas asociadas. En el [glosario de APM][25] lo tienes todo explicado. 

Firmas de consultas de la base de datos
: Entre los datos de monitorización de la base de datos se incluyen las métricas y las muestras (junto con sus etiquetas asociadas) que recopila el Agent y se usan para controlar cómo han funcionado las consultas normalizadas en el pasado. El nivel de detalle de estos datos viene determinado por la firma de la consulta normalizada correspondiente y el identificador de host único. Todos los parámetros de las consultas quedan enmascarados y se descartan en las muestras recopiladas antes de enviarse a Datadog.

Información de procesos
: Los procesos constan de métricas y datos del sistema de archivos `proc`, que actúa como punto de entrada a las estructuras de datos internas del kernel. Entre los datos de procesos, puede haber comandos (incluidos los argumentos y la ruta), el nombre de usuario asociado, el ID del proceso y su elemento superior, el estado del proceso y el directorio de trabajo. Estos datos suelen tener asociados metadatos de etiqueta.

Eventos y comentarios
: Los datos de eventos provienen de varias fuentes y se agregan en una vista unificada, que muestra los monitores activados, los eventos enviados por integraciones, los eventos enviados por la propia aplicación y los comentarios enviados por los usuarios o a través de la API. Los eventos y los comentarios suelen tener asociados metadatos de etiqueta.

Pipelines y tests de integración continua
: Tanto los nombres de las ramas como los pipelines, los tests y los conjuntos de tests son datos que se envían a Datadog.

### Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/security/
[2]: https://www.datadoghq.com/legal/privacy/
[3]: /es/developers/dogstatsd/
[4]: /es/data_security/agent/
[5]: /es/agent/configuration/secrets-management/
[6]: /es/integrations/amazon_web_services/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[8]: /es/integrations/azure/
[9]: /es/integrations/google_cloud_platform/
[10]: /es/sensitive_data_scanner/
[11]: /es/data_security/logs/
[12]: /es/logs/guide/control-sensitive-logs-data/
[13]: /es/agent/logs/advanced_log_collection
[14]: /es/logs/guide/logs-rbac
[15]: /es/logs/guide/logs-rbac-permissions
[16]: /es/infrastructure/process/#process-arguments-scrubbing
[17]: /es/infrastructure/livecontainers/configuration/#scrubbing-sensitive-information
[18]: /es/tracing/configure_data_security/
[19]: /es/serverless/distributed_tracing/collect_lambda_payloads#obfuscating-payload-contents
[20]: /es/data_security/synthetics/
[21]: /es/real_user_monitoring/browser/advanced_configuration/
[22]: /es/real_user_monitoring/session_replay/browser/privacy_options
[23]: /es/database_monitoring/data_collected/#sensitive-information
[24]: /es/getting_started/tagging/
[25]: /es/tracing/glossary/
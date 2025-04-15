---
description: Introducción de datos en Datadog y requisitos previos que debe cumplir
  tu entorno o el de tus clientes.
private: true
title: Introducción de datos
---

Ya has sentado las bases y es hora de empezar a introducir datos en Datadog.

Inicialmente, el objetivo de esta fase debe ser recopilar datos que te aporten valor inmediato a ti o a tus clientes. Pero, a largo plazo, debes considerarla un proceso continuo en el que evalúas constantemente los cambios en tu entorno haciéndote las siguientes preguntas:
- ¿Tú o tus clientes han empleado una nueva tecnología?
- ¿Tú o tus clientes han introducido un nuevo proceso?
- ¿Ha introducido Datadog una nueva función de producto que puedas utilizar?

Considera estas preguntas con frecuencia para asegurarte de que toda la telemetría necesaria se está ingiriendo en Datadog.

## Integraciones

Puedes proporcionar valor inmediato a tus clientes a través de las integraciones. Datadog ofrece integraciones {{< translate key="integration_count" >}}, que recopilan métricas y logs de una amplia gama de tecnologías.

Existen tres categorías principales de integraciones:
- Integraciones de servicios en la nube
- Integraciones del Datadog Agent y basadas en el Agent
- Integraciones de API / biblioteca y checks personalizados

Para obtener más información sobre los distintos tipos de integraciones, consulta [Introducción a integraciones][1].

## Integraciones de servicios en la nube

Las integraciones basadas en servicios o "crawlers" utilizan una conexión autenticada para recopilar información, métricas, logs y eventos de infraestructura de un servicio en la nube utilizando una API.

Configurar una integración de servicios en la nube suele llevar sólo unos minutos y aporta un valor inmediato con métricas y eventos que fluyen a Datadog.

**Nota**: Las integraciones de servicios en la nube pueden generar grandes volúmenes de datos que pueden tener efectos en la facturación tanto de Datadog como del proveedor de la nube.

Ten en cuenta que, en la mayoría de los escenarios, el uso de una integración de servicios en la nube no será suficiente para obtener una comprensión completa de la infraestructura y, especialmente, de las aplicaciones que se ejecutan en estos entornos. Datadog recomienda aprovechar todos los medios de recopilación de datos, además de las integraciones de servicios en la nube.

Para saber más sobre la monitorización de entornos de nube, consulta:
- [Monitorización en la nube][2] (eBook)
- [Introducción a la monitorización AWS Cloud][3] (Blog)
- [Introducción a la monitorización Google Cloud][4] (Blog)
- [Introducción a la monitorización Azure Cloud][5] (Blog)

## Integraciones del Datadog Agent y basadas en el Agent

El Datadog Agent es un software que se ejecuta en hosts y recopila eventos y métricas para enviarlos a Datadog. El Agent está disponible para todas las plataformas de uso común. Aunque el propio Agent puede recopilar una serie de métricas sobre el host en el que se ejecuta (como métricas de CPU, memoria, disco y red), el verdadero punto fuerte del Agent son sus integraciones.

Las integraciones basadas en el Agent permiten al Agent recopilar métricas, logs, trazas (traces)
y eventos de aplicaciones y tecnologías que se ejecutan directamente en
el host o en contenedores que se ejecutan en el host.

Para obtener más información sobre integraciones y el Datadog Agent, consulta:
- [Lista de integraciones Datadog][6]
- [Datadog Agent][7]
- [Empezando con el Agent][8]

## Integraciones de API / biblioteca y checks personalizados

Datadog se centra en la escalabilidad y la extensibilidad y ofrece varias API y SDK para ampliar la plataforma en situaciones en las que:
- La instalación del Agent podría no ser posible debido a restricciones de seguridad o de otro tipo, por ejemplo en dispositivos IoT.
- Las capacidades del Datadog Agent y su integraciones no cubren una tecnología o requisito.

En estos casos, el uso de la API te permite capturar telemetría relevante en la plataforma de observabilidad para tus clientes.

Como proveedor de servicio, hay tres áreas clave de API que podrían interesarte más:
- API públicas para la ingestión de datos
- Checks personalizados
- API locales para la ingestión de datos en el Agent

### API públicas para la ingestión de datos

En los casos en que el uso de integraciones de servicios en la nube o del Agent no sea posible o deseado, las siguientes API pueden ser útiles para la ingesta de datos:

- Los logs pueden reenviarse directamente al [endpoint de ingestión de logs][9] de Datadog.
- Las métricas pueden reenviarse directamente a la [API de métricas][10] de Datadog.
- Los eventos pueden reenviarse directamente a la [API de eventos][11] de Datadog.
- Las trazas pueden reenviarse directamente a la [API de rastreo/tramo (span)][12] de Datadog.

### Checks personalizados

Aunque Datadog ofrece integraciones {{< translate key="integration_count" >}}, es posible que tu cliente ejecute una aplicación personalizada que no pueda ser cubierta por ninguna de las integraciones existentes. Para monitorizar estas aplicaciones, tus clientes pueden utilizar el Agent para ejecutar checks personalizados.

Para obtener más información, consulta [Checks personalizados][13].

### API locales para la ingestión de datos en el Agent

El Datadog Agent viene con DogStatsD, un servicio de agregación de métricas que acepta datos utilizando UDP. DogStatsD es una buena alternativa si un check personalizado no se adapta a tu caso de uso, y no existen integraciones para la aplicación. Por ejemplo, puedes utilizar DogStatsD para recopilar datos de eventos y métricas de un trabajo cron que probablemente no tenga sus propios archivos de logs.

Puedes utilizar los endpoints de DogStatsD o una biblioteca cliente de Datadog para facilitar el envío de métricas y eventos a DogStatsD.

Para obtener más información, consulta:
- [Enviar eventos][14]
- [Enviar métricas personalizadas][15]
- [Bibliotecas][16]
- [Referencia API][17]

## Estrategia de etiquetado

Una buena estrategia de etiquetado es esencial si quieres asegurarte de que tanto tú como tus clientes puedan beneficiarse de todas las funciones de Datadog.

Las etiquetas (tags) son etiquetas (labels) adjuntas a los datos que permiten filtrar, agrupar y correlacionar datos en Datadog. El etiquetado vincula diferentes tipos de telemetría en Datadog, lo que permite la correlación y las llamadas a la acción entre métricas, trazas y logs. Esto se consigue con las claves de etiquetado reservadas.

Definir una estrategia coherente de etiquetado por adelantado allana el camino para una implementación satisfactoria de Datadog y, en última instancia, aumenta la obtención de valor para tus clientes.

Cuando pienses en el etiquetado, ten en cuenta los siguientes factores:
- **Tecnología**: Te permite comparar el uso de una misma tecnología entre equipos o clientes.
- **Entorno**: Te permite comparar el rendimiento entre entornos de test, producción y otros entornos.
- **Localización**: Te permite comprender los problemas relacionados con centros de datos específicos o zonas de disponibilidad de proveedores de servicio en la nube.
- **Servicio empresarial**: Te permite a ti y a tus clientes filtrar los componentes básicos de un servicio empresarial, independientemente de la tecnología.
- **Rol**: Te permite comprender qué rol desempeña una entidad en un servicio empresarial.
- **Responsabilidad**: Permite al equipo responsable filtrar todos sus recursos y permite a otros usuarios y equipos identificar qué equipo es responsable de un determinado servicio.

Para prepararte para el éxito, lee [Empezando con etiquetas (tags)][18].

Para obtener más información sobre el etiquetado y la estrategia de etiquetado, consulta:
- [Prácticas recomendadas para el etiquetado de tu infraestructura y tus aplicaciones][19] (Blog)
- [Prácticas recomendadas para el etiquetado][20] (Capacitación)
- [Etiquetado unificado de servicios][21]
- [Extracción de etiquetas (tags) de Kubernetes][22]
- [Etiquetado AWS][23] (Documentación de AWS)
- [Etiquetado serverless][24]
- [Etiquetado de contenedores en directo][25]

## Implementación del Agent

Estas son las fases clave de implementación del Agent:
- Requisitos previos para la implementación del Agent 
- Despliegue inicial del Agent en la infraestructura existente
- Suministro de una nueva infraestructura
- Monitorización de procesos de suministro continuo

### Requisitos previos para el despliegue del Agent 

Dependiendo de la plataforma y del sistema operativo, puede haber diferentes requisitos previos del Agent. Para familiarizarte con estos requisitos, consulta [la documentación oficial del Agent][7].

El principal requisito previo del Agent en cualquier plataforma es la conectividad de red. El tráfico siempre se inicia desde el Agent hacia Datadog. Nunca se inician sesiones desde Datadog hacia el Agent. Salvo en casos excepcionales, la conectividad entrante (limitada a través de cortafuegos locales) no es un factor a tener en cuenta en los despliegues del Agent.

Para funcionar correctamente, el Agent requiere la capacidad de enviar tráfico al servicio Datadog mediante SSL a través de 443/tcp. Para ver una lista completa de los puertos utilizados por el Agent, consulta [Tráfico de red][26].

En algunas circunstancias, los endpoints específicos de la versión del Agent pueden causar problemas de mantenimiento, en cuyo caso Datadog puede proporcionar un endpoint independiente de la versión. Si necesitas un endpoint independiente de la versión, ponte en contacto con el servicio de asistencia de Datadog.

#### Proxy del Agent

En muchos entornos de clientes, abrir una conectividad directa desde el Agent a Datadog no es posible o deseado. Para habilitar la conectividad, Datadog ofrece algunas opciones diferentes para actuar como intermediarios en el tráfico del Agent.

Para obtener más información, consulta la [configuración del proxy del Agent][27].

### Despliegue, actualización y configuración del Agent

Existen varias formas de desplegar el Datadog Agent en tu propia infraestructura y en la de tus clientes. Como la mayoría de los proveedores de servicios ya disponen de una herramienta de gestión de la configuración, se recomienda utilizar la herramienta existente para el despliegue del Agent.

He aquí algunos ejemplos de cómo gestionar tu Datadog Agent con las herramientas de gestión de la configuración:
- [Despliegue del Datadog Agent con Chef][28] (Blog)
- [Puppet + Datadog: Automatizar + Monitorizar tus sistemas][7] (Blog)
- [Despliegue y configuración de Datadog con CloudFormation][29] (Blog)
- [Uso de Ansible para automatizar la configuración de Datadog][30] (Vídeo)
- [Despliegue del Datadog Agent en hosts AWS con inventarios dinámicos de Ansible][31] (Blog)

Si no tienes previsto utilizar los repositorios de Datadog, siempre puedes encontrar las últimas versiones del Agent en el [repositorio público de GitHub][32]. Se recomienda [verificar el canal de distribución][33] de los paquetes del Agent antes del despliegue.

### Monitorización de procesos de suministro continuo

Aunque es una práctica recomendada utilizar herramientas de gestión de la configuración para desplegar Datadog, también puedes aprovechar Datadog para monitorizar el funcionamiento adecuado de estas herramientas. He aquí algunos ejemplos:
- [Pregunta a tus sistemas qué está pasando: Monitorizar Chef con Datadog][34] (Blog)
- [Ansible + Datadog: Monitorizar tu automatización, automatizar tu monitorización][35] (Blog)

## ¿Qué es lo que sigue?

Ahora que los datos fluyen hacia Datadog, es el momento de centrarte en [ofrecer valor][36] a tus clientes.


[1]: /es/getting_started/integrations/
[2]: https://www.datadoghq.com/pdf/monitoring-in-the-cloud-ebook.pdf
[3]: https://www.datadoghq.com/solutions/aws/
[4]: https://www.datadoghq.com/solutions/gcp/
[5]: https://www.datadoghq.com/solutions/azure/
[6]: /es/integrations/
[7]: /es/agent/
[8]: /es/getting_started/agent/
[9]: /es/getting_started/logs
[10]: /es/api/latest/metrics
[11]: /es/api/latest/events
[12]: /es/api/latest/tracing/
[13]: /es/developers/custom_checks/
[14]: /es/service_management/events/guides/dogstatsd/
[15]: /es/metrics/custom_metrics/
[16]: /es/developers/community/libraries/#api-and-dogstatsd-client-libraries
[17]: /es/api/latest/
[18]: /es/getting_started/tagging/
[19]: https://www.datadoghq.com/blog/tagging-best-practices/
[20]: https://learn.datadoghq.com/courses/tagging-best-practices
[21]: /es/getting_started/tagging/unified_service_tagging?tab=kubernetes
[22]: /es/agent/kubernetes/tag/
[23]: https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
[24]: /es/serverless/serverless_tagging/?tab=serverlessframework#overview
[25]: /es/infrastructure/livecontainers
[26]: /es/agent/configuration/network/
[27]: /es/agent/configuration/proxy/
[28]: https://www.datadoghq.com/blog/deploying-datadog-with-chef-roles/
[29]: https://www.datadoghq.com/blog/monitor-puppet-datadog/
[30]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
[31]: https://www.youtube.com/watch?v=EYoqwiXFrlQ
[32]: https://github.com/DataDog/datadog-agent/releases
[33]: /es/data_security/agent/#agent-distribution
[34]: https://www.datadoghq.com/blog/monitor-chef-with-datadog/
[35]: https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring/
[36]: /es/partners/delivering-value/
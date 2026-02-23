---
aliases:
- /es/agent/faq/why-should-i-install-the-agent-on-my-aws-instances/
- /es/integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch/
- /es/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
description: Explica las ventajas de instalar el Datadog Agent en instancias en la
  nube, incluida una mejor resolución, más métricas, integraciones y funciones de
  monitorización personalizadas.
further_reading:
- link: /integrations/guide/cloud-metric-delay/
  tag: Guía
  text: Tiempo de respuesta de las métricas en la nube
title: ¿Por qué debería instalar el Datadog Agent en mis instancias de nube?
---

El Datadog Agent es un software que se ejecuta en tus hosts. Se encarga de recopilar eventos y métricas de los hosts y los envía a Datadog, donde puedes analizar tus datos de monitorización y rendimiento. El Datadog Agent es de código abierto, y su código fuente está disponible en GitHub: [DataDog/datadog-agent][1].

Si utilizas AWS, Azure, Google Cloud u otro proveedor de métricas basado en la nube, la instalación del Agent de Datadog en tus instancias te ofrece varias ventajas, por ejemplo:

* **Mejor resolución**: los proveedores de la nube monitorizan tus hosts externamente muestreándolos cada 5-25 minutos. Además, AWS proporciona métricas por minuto a través de su API. Como Datadog almacena todas las métricas con una resolución de 1 segundo, las métricas de AWS se promedian en 60 segundos durante el postprocesamiento. Para ofrecer una visión más detallada del rendimiento de host, Datadog Agent recopila estadísticas de rendimiento cada 15 segundos, ofreciendo una visión más detallada de lo que está ocurriendo dentro de tus hosts.

  {{< img src="agent/guide/Agent_VS_AWSA.jpg" alt="Agent vs. AWS CloudWatch" style="width:70%;">}}

* **Métricas expuestas**: Datadog tiene más de 50 métricas activadas por defecto. Se pueden añadir más métricas con [integraciones][2] específicas de la aplicación de Datadog.

* **Integraciones**: más de [{{< translate key="integration_count" >}} integraciones][2] amplían la funcionalidad del Datadog Agent más allá de las métricas nativas.

* **Coherencia de etiquetado en los servicios**: las etiquetas (tags) aplicadas en el Agent se añaden a todas las métricas, logs y trazas (traces) informadas por el Agent. 

* **Métricas personalizadas con DogStatsD**: con el Datadog Agent, utiliza el [cliente StatsD][4] incorporado para enviar métricas personalizadas desde tu aplicación, permitiéndote correlacionar lo que está ocurriendo con tu aplicación, tus usuarios y tu sistema.

* **Checks personalizados del Agent**: para una personalización aún más profunda, implementa [checks personalizados del Agent][5] para recopilar métricas y otros datos de tus sistemas o aplicaciones personalizadas y enviarlos a Datadog.

* **Logs de aplicación**: el Datadog Agent [recopila y reenvía logs de aplicación que se crean localmente][6] en tus máquinas virtuales o contenedores en la nube, por lo que no es necesario reenviarlos a través de la integración del proveedor en la nube. A estos logs también se le aplica etiquetas a nivel del Agent.

* **Application Performance Monitoring (APM)**: [las trazas recopiladas a través del Agent][4] ofrecen una visión completa de tus aplicaciones, ayudándote a comprender el rendimiento del servicio de extremo a extremo e identificar posibles cuellos de botella.  

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: https://docs.datadoghq.com/es/integrations/
[3]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=hostagent
[4]: https://docs.datadoghq.com/es/tracing/
[5]: https://docs.datadoghq.com/es/developers/custom_checks/
[6]: https://docs.datadoghq.com/es/agent/logs/?tab=tailfiles
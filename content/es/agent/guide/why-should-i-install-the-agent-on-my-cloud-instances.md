---
aliases:
- /es/agent/faq/why-should-i-install-the-agent-on-my-aws-instances/
- /es/integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch/
- /es/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
further_reading:
- link: /integrations/guide/cloud-metric-delay/
  tag: Guía
  text: Tiempo de respuesta de las métricas en la nube
title: ¿Por qué debería instalar el Datadog Agent en mis instancias de nube?
---

Si utilizas AWS, Azure, Google Cloud u otro proveedor de métricas basado en la nube, la instalación del Datadog Agent en tus instancias te ofrece varias ventajas, por ejemplo:

* **Mejor resolución**: Los proveedores de la nube observan lo que ocurre desde el exterior realizando un muestreo de los hosts a intervalos de entre 5 y 25 minutos. Además, AWS proporciona métricas por minuto a través de su API. Como todas las métricas de Datadog se almacenan con una resolución de 1 segundo, estas métricas se dividen entre 60 durante su procesamiento posterior. El Datadog Agent registra las estadísticas de rendimiento cada 15 segundos para interpretar con mayor precisión lo que está sucediendo en los hosts.

* **Métricas expuestas**: Datadog incluye más de 50 métricas activadas de forma predeterminada. Se pueden añadir más métricas con las integraciones concretas de aplicaciones de Datadog.

* **Integraciones**: Con ellas es fácil ampliar el Datadog Agent, más allá de las métricas nativas, para que puedas monitorizar el estado de las aplicaciones, la utilización de los procesos y mucho más.

* **Métricas personalizadas con DogStatsD**: Una vez instalado el Datadog Agent, puedes utilizar el cliente StatsD integrado para enviar métricas personalizadas desde tu aplicación, lo que te permite establecer una correlación entre lo que está sucediendo con tu aplicación, tus usuarios y tu sistema.

  {{< img src="agent/guide/Agent_VS_AWSA.jpg" alt="Agent vs. AWS CloudWatch" style="width:70%;">}}

El Datadog Agent es un software ligero y de código abierto, por lo que puedes revisar el código e incluso contribuir haciendo una solicitud pull.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}
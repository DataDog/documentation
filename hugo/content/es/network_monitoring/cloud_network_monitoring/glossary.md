---
description: Glosario de Cloud Network Monitoring (CNM)
further_reading:
- link: /network_monitoring/cloud_network_monitoring/setup/
  tag: Documentación
  text: Configuración de Cloud Network Monitoring
- link: /network_monitoring/cloud_network_monitoring/tags_reference/
  tag: Documentación
  text: Referencia de las etiquetas (tags) de CNM
- link: /monitors/types/cloud_network_monitoring/
  tag: Documentación
  text: Monitores y alertas de CNM
- link: /network_monitoring/network_path/glossary
  tag: Documentación
  text: Términos y conceptos de Network Path
title: Términos y conceptos de CNM
---

## Información general

Cloud Network Monitoring (CNM) proporciona una visibilidad de extremo a extremo de la comunicación de red entre servicios, contenedores, hosts y entornos de nube. Agrega datos de nivel de conexión en dependencias significativas de servicio a servicio, lo que te ayuda a analizar patrones de tráfico, a solucionar problemas de latencia y conectividad, y a monitorizar el estado de tus aplicaciones.

Para ver más definiciones y descripciones de términos importantes de CNM, como _enrutamiento basado en políticas_, consulta el [glosario principal][6]. 

## Terminología

| Concepto                                                 | Descripción                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloud Network Monitoring (CNM)**                      | Cloud Network Monitoring (CNM) proporciona una visibilidad del tráfico de red entre servicios, contenedores, zonas de disponibilidad y otras etiquetas en Datadog, agregando datos sin procesar a nivel de conexión (IP, puerto, PID) en dependencias de capas de aplicación entre endpoints de cliente y de servidor.  |
| **Datos de flujo**                                           | Datos de bajo nivel recopilados por CNM (conexiones a nivel de IP, puerto, PID) que CNM utiliza para crear representaciones claras de las dependencias de red y del flujo de tráfico.                                                                                                                     |
| **Traducción de direcciones de red (NAT)**                   | Método para la reasignación de una dirección IP a otra. Permite que varios dispositivos de una red privada compartan una única dirección IP pública para conectarse a Internet. |
| **[Estado de red][1]**                                      |  Muestra el estado general del entorno de red, para evidenciar problemas e incidentes en hosts y servicios. |
| **[Análisis de red][2]**          | Vista de CNM que te permite representar gráficamente y analizar los datos de red entre cada cliente y servidor en función de las etiquetas de agrupación, para que puedas investigar patrones de tráfico, dependencias o anomalías.  |
| **[Mapa de red][3]**                                         | Vista de visualización de CNM que asigna datos de red entre etiquetas como `service`, `kube_service`, `short_image` y `container_name`.  |
| **[Monitor de CNM][4]**              | Monitor de Datadog que alerta cuando una métrica de CNM (red TCP) cruza un umbral definido por el usuario, por ejemplo, el rendimiento de red entre un cliente y un servidor específicos.                    |
| **[Etiquetas CNM][5]**                               | Etiquetas que CNM utiliza para agrupar y mostrar el tráfico, por ejemplo, la comunicación de servicio a servicio o de zona a zona.                                           |
| **[Volumen de tráfico][9] (bytes enviados y recibidos)**     | Métrica de red primaria en CNM que representa la cantidad de datos transferidos entre endpoints. A menudo se visualiza en la sección de carga de red de los dashboards o en la página de análisis de red para detectar picos o cuellos de botella de tráfico. |
| **[Métricas de TCP][8] (conexiones, retransmisiones, latencia)** | Métricas que CNM rastrea para flujos TCP, incluidas las conexiones abiertas y cerradas, las retransmisiones de paquetes y el tiempo de ida y vuelta para detectar problemas de conectividad, pérdida de paquetes o congestión de la red. |
| **[Tráfico no resuelto o N/D][10]**                     | Flujos de red que no se pueden asociar a etiquetas definidas (cliente o servidor). A menudo se muestran como "no resueltos" o "N/D", lo que indica que el origen o el destino no pueden identificarse o agruparse de forma significativa. |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/cloud_network_monitoring/network_health/
[2]: /es/network_monitoring/cloud_network_monitoring/network_analytics/
[3]: /es/network_monitoring/cloud_network_monitoring/network_map/
[4]: /es/monitors/types/cloud_network_monitoring/
[5]: /es/network_monitoring/cloud_network_monitoring/tags_reference/
[6]: /es/glossary/?product=cloud-network-monitoring
[8]: /es/network_monitoring/cloud_network_monitoring/network_analytics/#tcp
[9]: /es/network_monitoring/cloud_network_monitoring/network_analytics/#network-load
[10]: /es/network_monitoring/cloud_network_monitoring/network_analytics/#unresolved-traffic
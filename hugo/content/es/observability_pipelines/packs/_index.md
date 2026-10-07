---
cascade:
  private: true
description: Más información sobre Paquetes de Observability Pipelines
disable_toc: false
private: true
title: Paquetes
---

## Información general

{{< img src="observability_pipelines/packs/packs.png" alt="La sección de paquetes de Observability Pipelines" style="width:100%;" >}}

Cuando se configura un pipeline para enviar logs de una fuente específica a Observability Pipelines, a menudo es necesario decidir cómo procesar y gestionar esos logs.

Pueden surgir preguntas como las siguientes:

- ¿Qué registros de esta fuente son importantes?
- ¿Qué logs se pueden descartar sin peligro?
- ¿Deben tomarse muestras de los logs repetitivos?
- ¿Qué campos deben analizarse o formatearse para el destino?

La toma de estas decisiones suele requerir la coordinación entre múltiples equipos y un conocimiento detallado de cada fuente de log.

Los paquetes de Observability Pipelines proporcionan configuraciones predefinidas para ayudarte a tomar estas decisiones de forma rápida y coherente. Los paquetes aplican las prácticas recomendadas por Datadog para fuentes específicas de logs como Akamai, AWS CloudTrail, Cloudflare, Fastly, Palo Alto Firewall y Zscaler.

### Qué hacen los paquetes

Cada paquete incluye configuraciones específicas de la fuente que definen:

- **Campos que pueden eliminarse** para reducir el tamaño de la carga útil
- **Logs que pueden eliminarse**, como los eventos duplicados o los checks de estado
- **Logs que deben conservarse o analizarse**, como errores o detecciones de seguridad
- **Reglas de formateo y normalización** para alinear logs en diferentes destinos y entornos

Mediante el uso de paquetes, puedes aplicar un parseo, filtrado y lógica de enrutamiento coherentes para cada fuente de log sin necesidad de crear configuraciones manualmente.

### Por qué utilizar paquetes

Los paquetes ayudan a los equipos a:

- **Reducir el volumen y los costes de ingesta** filtrando o muestreando los eventos repetitivos y de bajo valor.
- **Mantener la coherencia** en el parseo y la asignación de campos en distintos entornos y destinos.
- **Acelerar la instalación** aplicando configuraciones listas para su uso en las fuentes más comunes.

## Paquetes

Estos paquetes están disponibles:

- [Akamai CDN][4]
- [Amazon VPC Flow Logs][5]
- [AWS CloudFront][6]
- [AWS CloudTrail][7]
- [Cisco ASA][8]
- [Cloudflare][9]
- [F5][10]
- [Fastly][11]
- [Firewall Fortinet][12]
- [HAProxy Ingress][13]
- [Istio Proxy][14]
- [Netskope][15]
- [NGINX][16]
- [Okta][17]
- [Palo Alto Firewall][18]
- [Windows XML][19]
- [ZScaler ZIA DNS][20]
- [Zscaler ZIA Firewall][21]
- [Zscaler ZIA Tunnel][22]
- [Zscaler ZIA Web Logs][23]

## Instalación

Para configurar los paquetes:

1. Navega hasta la página [Pipelines][1].
1. Haz clic en **Packs** (Paquetes).
1. Haz clic en el paquete que quieras configurar.
1. Puedes crear un nuevo pipeline a partir del paquete o añadir el paquete a un pipeline existente.
    - Si has hecho clic en **Add to New Pipeline** (Añadir a nuevo pipeline), en el nuevo pipeline que ha sido creado:
        - Haz clic en el grupo de procesadores que ha sido añadido para ver los procesadores individuales que ha ñadido el paquete y editarlos según sea necesario. Consulta [Procesadores][2] para obtener más información.
        - Consulta [Configurar pipelines][3] para obtener información sobre cómo configurar el resto del pipeline.
    - Si has hecho clic en **Add to Existing Pipeline** (Añadir a pipeline existente):
        1. Selecciona el pipeline al que quieres añadir el paquete.
        1. Haz clic en **Add to Existing Pipeline** (Añadir a pipeline existente).
            1. El paquete se añade al último grupo de procesadores de tu pipeline.
            1. Haz clic en el grupo para revisar los procesadores individuales y editarlos según sea necesario. Consulta [Procesadores][2] para obtener más información.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/processors/
[3]: /es/observability_pipelines/set_up_pipelines/
[4]: /es/observability_pipelines/packs/akamai_cdn/
[5]: /es/observability_pipelines/packs/amazon_vpc_flow_logs/
[6]: /es/observability_pipelines/packs/amazon_cloudfront/
[7]: /es/observability_pipelines/packs/aws_cloudtrail/
[8]: /es/observability_pipelines/packs/cisco_asa/
[9]: /es/observability_pipelines/packs/cloudflare/
[10]: /es/observability_pipelines/packs/f5/
[11]: /es/observability_pipelines/packs/fastly/
[12]: /es/observability_pipelines/packs/fortinet_firewall/
[13]: /es/observability_pipelines/packs/haproxy_ingress/
[14]: /es/observability_pipelines/packs/istio_proxy/
[15]: /es/observability_pipelines/packs/netskope/
[16]: /es/observability_pipelines/packs/nginx/
[17]: /es/observability_pipelines/packs/okta/
[18]: /es/observability_pipelines/packs/palo_alto_firewall/
[19]: /es/observability_pipelines/packs/windows_xml/
[20]: /es/observability_pipelines/packs/zscaler_zia_dns/
[21]: /es/observability_pipelines/packs/zscaler_zia_firewall/
[22]: /es/observability_pipelines/packs/zscaler_zia_tunnel/
[23]: /es/observability_pipelines/packs/zscaler_zia_web_logs/
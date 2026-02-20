---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/crest_data_systems_barracuda_waf
app_id: crest-data-systems-barracuda-waf
categories:
- marketplace
- gestión de eventos
- recopilación de logs
custom_kind: integración
description: Visualización de los datos de Barracuda WAF y Barracuda WAAS a través
  de Syslog o API
integration_version: 2.0.3
media:
- caption: 'CDS Barracuda WAF: detalles de acceso'
  image_url: images/cds_barracuda_waf_access_details.png
  media_type: imagen
- caption: 'CDS Barracuda WAF: detalles de auditoría (WAF)'
  image_url: images/cds_barracuda_waf_audit_details_waf.png
  media_type: imagen
- caption: 'CDS Barracuda WAF: detalles de auditoría (WAAS)'
  image_url: images/cds_barracuda_waf_audit_details_waas.png
  media_type: imagen
- caption: 'CDS Barracuda WAF: detalles del firewall de red'
  image_url: images/cds_barracuda_waf_network_firewall_details.png
  media_type: imagen
- caption: 'CDS Barracuda WAF: detalles del sistema'
  image_url: images/cds_barracuda_waf_system_details.png
  media_type: imagen
- caption: 'CDS Barracuda WAF: detalles del firewall web'
  image_url: images/cds_barracuda_waf_web_firewall_details.png
  media_type: imagen
- caption: 'CDS Barracuda WAF: detalles de evento'
  image_url: images/cds_barracuda_waf_event_details.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Barracuda WAF
---
## Información general

Esta integración de Barracuda WAF monitoriza y visualiza Barracuda WAF así como Barracuda WAAS.

### Barracuda Web Application Firewall (WAF)

**Barracuda Web Application Firewall (WAF)** es una solución de seguridad diseñada para proteger las aplicaciones web de varios tipos de ciberamenazas y ataques. Actúa como gateway entre el servidor de aplicaciones web e Internet, monitorizando y filtrando el tráfico entrante y saliente para asegurar la seguridad y disponibilidad de la aplicación.

### Barracuda Web Application Firewall as-a-service (WAAS)

**Barracuda WAF-as-a-Service (WAAS)** proporciona seguridad de aplicaciones de nivel empresarial en la nube sin la sobrecarga administrativa de un dispositivo. Con Barracuda WAF-as-a-Service, puedes proteger tus aplicaciones en cuestión de minutos, independientemente de dónde estén alojadas. No hay nada que desplegar, escalar, dimensionar ni mantener.

### Funciones

| Producto | Método | Logs capturados | Enlace de referencia de documentos |
| ---- | ----------- | -------- | --------- |
| WAF | Syslog | Firewall de red, Acceso, Firewall web, Auditoría, Sistema| [Barracuda WAF](https://campus.barracuda.com/product/webapplicationfirewall/doc/92767349/exporting-log-formats/)|
| WAAS | Syslog | Firewall web, Acceso, Evento| [Barracuda WAAS Syslog](https://campus.barracuda.com/product/WAAS/doc/79462622/log-export)|
| WAAS  | API | Firewall web, Acceso, Auditoría| [Barracuda WAAS API](https://blog.barracuda.com/2021/10/18/barracuda-waf-as-a-service-rest-api)|

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Soporte: [datadog.integrations@crestdata.ai](mailto:datadog.integrations@crestdata.ai)
- Ventas: [datadog-sales@crestdata.ai](mailto:datadog-sales@crestdata.ai)
- Página web: [crestdata.ai](https://www.crestdata.ai/)
- PREGUNTAS FRECUENTES: [Crest Data Datadog Marketplace Integrations FAQ](https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio de Datadog Technology. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-barracuda-waf" target="_blank">Haz clic aquí</a> para comprar esta aplicación.
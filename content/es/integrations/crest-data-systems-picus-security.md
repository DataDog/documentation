---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/crest_data_systems_picus_security
app_id: crest-data-systems-picus-security
categories:
- marketplace
- seguridad
- red
custom_kind: integración
description: Recopila logs de datos de inventario, así como logs de amenazas y actividad
  de Picus Security.
integration_version: 1.0.0
media:
- caption: Picus Security - Inventario
  image_url: images/crest_data_systems_picus_security_inventory.png
  media_type: imagen
- caption: Picus Security - Amenazas
  image_url: images/crest_data_systems_picus_security_threats.png
  media_type: imagen
- caption: Picus Security - Actividad
  image_url: images/crest_data_systems_picus_security_activity.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Picus Security
---
## Información general

[**Picus Security**](https://app.picussecurity.com/) es una plataforma de validación de la seguridad que evalúa y mejora las defensas de una organización. Simula ciberataques del mundo real (por ejemplo, phishing, malware) para evaluar los controles de seguridad como cortafuegos, sistemas de prevención de intrusiones y soluciones de seguridad para endpoints.

- La **integración Picus Security Datadog** permite recopilar y visualizar datos de Picus Security **como logs** en Datadog. Los datos recopilados incluyen:

- **Datos de inventario**: Agents, integraciones, Agents de integraciones, dispositivos de mitigación, simulaciones de Picus.

- **Datos de amenazas**

- **Datos de actividad**

La integración incluye las siguientes reglas de detección predefinidas de [Datadog Cloud SIEM](https://docs.datadoghq.com/security/cloud_siem/) para mejorar la monitorización y la seguridad:

1. Cantidad anómala de intentos de inicio de sesión fallidos detectados en Picus Security
1. Detección de actividad en una localización nueva o sospechosa en Picus Security

### Dashboards

Esta integración incluye **tres dashboards predefinidos**:

1. **Picus Security - Inventario**: Visualiza Agents, integraciones, Agents de integraciones, dispositivos de mitigación y datos de simulaciones de Picus recopilados en un `interval_for_inventory` definido por el usuario.
1. **Picus Security - Amenazas**: Muestra datos sobre amenazas recopilados en un `min_collection_interval`.
1. **Picus Security - Actividad**: Monitoriza las actividades realizadas en la aplicación web Picus Security.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Soporte: [datadog.integrations@crestdata.ai](mailto:datadog.integrations@crestdata.ai)
- Ventas: [datadog-sales@crestdata.ai](mailto:datadog-sales@crestdata.ai)
- Página web: [crestdata.ai](https://www.crestdata.ai/)
- PREGUNTAS FRECUENTES: [Preguntas frecuentes sobre integraciones Crest Data en Datadog Marketplace](https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-picus-security" target="_blank">Haz clic aquí</a> para adquirirla.
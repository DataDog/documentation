---
aliases:
- /es/integrations/azure_customerinsights
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Customer Insights.
doc_link: https://docs.datadoghq.com/integrations/azure_customer_insights/
draft: false
git_integration_title: azure_customer_insights
has_logo: true
integration_id: azure-customerinsights
integration_title: Microsoft Azure Customer Insights
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_customer_insights
public_title: Integración de Datadog y Microsoft Azure Customer Insights
short_description: Rastrea las métricas clave de Azure Customer Insights.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Customer Insights permite a las organizaciones de todos los tamaños reunir diversos conjuntos de datos y generar conocimientos e información para crear una visión holística de 360° de sus clientes.

Utiliza la integración de Azure con Datadog para recopilar métricas de Customer Insights.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_customer_insights" >}}


### Eventos

La integración Azure Customer Insights no incluye eventos.

### Checks de servicios

La integración Azure Customer Insights no incluye checks de servicios.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_customer_insights/azure_customer_insights_metadata.csv
[3]: https://docs.datadoghq.com/es/help/
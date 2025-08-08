---
categories:
- azure
- nube
- gestión de costes
- network
custom_kind: integración
dependencies: []
description: Rastrea el uso en comparación con los límites preconfigurados de los
  recursos de computación, red y almacenamiento de Azure para tu suscripción.
doc_link: https://docs.datadoghq.com/integrations/azure_usage_and_quotas/
draft: false
git_integration_title: azure_usage_and_quotas
has_logo: true
integration_id: azure-usage-and-quotas
integration_title: Microsoft Azure Usage and Quotas
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_usage_and_quotas
public_title: Integración de Datadog y Microsoft Azure Usage and Quotas
short_description: Rastrea el uso en comparación con los límites preconfigurados en
  Azure.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure establece límites preconfigurados para los recursos de tu suscripción. Para evitar errores de aprovisionamiento inesperados, ten en cuenta estos límites al diseñar y escalar tu entorno de Azure. Obtén métricas de Azure Usage and Quotas para:

- Visualizar la utilización de los recursos de computación, red y almacenamiento en comparación con tu cuota.
- Comprender y evitar que los errores de aprovisionamiento alcancen los límites de cuota.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-usage-and-quotas" >}}


### Eventos

La integración Azure Quota no incluye eventos.

### Checks de servicio

La integración de Azure Quota no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_usage_and_quotas/azure_usage_and_quotas_metadata.csv
[3]: https://docs.datadoghq.com/es/help/
---
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de métricas clave de Azure App Configuration.
doc_link: https://docs.datadoghq.com/integrations/azure_app_configuration/
draft: false
git_integration_title: azure_app_configuration
has_logo: true
integration_id: azure-app-configuration
integration_title: Microsoft Azure App Configuration
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_app_configuration
public_title: Integración de Datadog y Microsoft Azure App Configuration
short_description: Realiza el seguimiento de métricas clave de Azure App Configuration.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure App Configuration proporciona un servicio central para gestionar parámetros y marcadores de características de aplicaciones. App Configuration te permite almacenar todos los parámetros de tu aplicación y asegurar su acceso en un solo lugar.

Mediante el uso de la [integración Datadog Azure][1], puedes recopilar métricas de Azure App Configuration para monitorizar solicitudes entrantes, latencias y errores de cuellos de botella.

## Configuración
### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][2]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados
### Métricas
{{< get-metrics-from-git "azure_app_configuration" >}}


### Eventos
La integración Azure App Configuration no incluye eventos.

### Checks de servicios
La integración Azure App Configuration no incluye checks de servicios.

## Resolución de problemas
¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://app.datadoghq.com/integrations/azure
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_configuration/azure_app_configuration_metadata.csv
[4]: https://docs.datadoghq.com/es/help/

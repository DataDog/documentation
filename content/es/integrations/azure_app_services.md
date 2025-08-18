---
categories:
- cloud
- azure
custom_kind: integración
dependencies: []
description: Realiza un seguimiento de las métricas clave de Azure App Service.
doc_link: https://docs.datadoghq.com/integrations/azure_app_services/
draft: false
git_integration_title: azure_app_services
has_logo: true
integration_id: azure-app-services
integration_title: Microsoft Azure App Service
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_app_services
public_title: Integración de Datadog y Microsoft Azure App Service
short_description: Realiza un seguimiento de las métricas clave de Azure App Service.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Azure App Service es una plataforma como servicio que ejecuta aplicaciones web, móviles, API y de lógica empresarial y gestiona automáticamente los recursos requeridos por estas aplicaciones.

Obtén métricas de Azure App Service para:

- Visualizar el rendimiento de tu aplicación
- Correlacionar el rendimiento de tus aplicaciones Azure con el resto de tus aplicaciones

### Vista de Azure App Service 

Además del dashboard preconfigurado de Azure App Service, también puedes utilizar la vista exclusiva de Azure App Service.

Utiliza la vista de Azure App Service para:

- Identificar rápidamente las aplicaciones con alta latencia o errores

- Realizar un seguimiento del uso de tus aplicaciones web, aplicaciones de funciones y planes de Azure App Service

- Obtener información sobre los costes de tus planes de Azure App Service visualizando el número de instancias activas y viendo cuáles son aplicaciones en ejecución que están enviando trazas (traces) o logs a Datadog

- Determinar qué aplicaciones se ejecutan en qué planes de Azure App Service para identificar las aplicaciones que podrían estar afectando a los costes o al rendimiento

Para habilitar Datadog APM y las métricas personalizadas para tus aplicaciones que se ejecutan en Azure App Service, consulta la documentación de la [extensión Datadog Azure App Service][1].

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][2]. No es necesario realizar ningún otro paso de instalación.

Para conocer opciones de monitorización adicionales, incluyendo los logs y la inyección de ID de rastreo, consulta la [extensión Azure App Service][1].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-app-services" >}}


### Eventos

La integración Azure App Service no incluye eventos.

### Checks de servicio

La integración Azure App Service no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://docs.datadoghq.com/es/serverless/azure_app_services/
[2]: https://docs.datadoghq.com/es/integrations/azure/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_app_services/azure_app_services_metadata.csv
[4]: https://docs.datadoghq.com/es/help/
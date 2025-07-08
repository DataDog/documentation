---
categories:
- "cloud"
- "configuration & deployment"
- "network"
- "azure"
custom_kind: "integración"
dependencies: []
description: "Realiza un seguimiento de flujos de trabajo de activación, latencia de acciones, acciones fallidas y mucho más."
doc_link: "https://docs.datadoghq.com/integrations/azure_logic_app/"
draft: false
git_integration_title: "azure_logic_app"
has_logo: true
integration_id: "azure-logic-app"
integration_title: "Microsoft Azure Logic App"
integration_version: ""
is_public: true
manifest_version: "1.0"
name: "azure_logic_app"
public_title: "Integración de Datadog y Microsoft Azure Logic App"
short_description: "Realiza un seguimiento de flujos de trabajo de activación, latencia de acciones, acciones fallidas y mucho más."
version: "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Microsoft Azure Logic App permite a los desarrolladores diseñar flujos de trabajo que articulen intenciones a través de un activador y una serie de pasos.

Obtén métricas de Azure Logic App para:

- Visualizar el rendimiento de tus flujos de Azure Logic App.
- Correlacionar el rendimiento de tus flujos de trabajo de Azure Logic App con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure-logic-app" >}}


### Eventos

La integración Azure Logic App no incluye eventos.

### Checks de servicio

La integración Azure Logic App no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_logic_app/azure_logic_app_metadata.csv
[3]: https://docs.datadoghq.com/help/


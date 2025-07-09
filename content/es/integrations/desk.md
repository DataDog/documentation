---
categories:
- Collaboration
- issue tracking
custom_kind: integration
dependencies: []
description: Visualiza y discute casos nuevos, abiertos, pendientes y resueltos de
  tu flujo (stream) de eventos.
doc_link: https://docs.datadoghq.com/integrations/desk/
draft: false
git_integration_title: desk
has_logo: true
integration_id: desk
integration_title: Desk
integration_version: ''
is_public: true
manifest_version: '1.0'
name: desk
public_title: Integración de Datagog y Desk
short_description: Visualiza y discute casos nuevos, abiertos, pendientes y resueltos
  de tu flujo de eventos.
team: integraciones web
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Conecta Desk a Datadog para ver los datos de tus casos de asistencia de Salesforce en un dashboard predefinido. Este dashboard te permite:

- Rastrear los eventos de casos nuevos en el flujo de eventos
- Visualizar las estadísticas de casos por usuario y estado
- Ver las tendencias de los tickets de asistencia junto con los problemas de DevOps

Para obtener más información, consulta [Mantener la asistencia en la misma página con la integración Salesforce Desk][1].

## Configuración

### Configuración

Desde tu cuenta de Desk, añade una aplicación API en la página Settings -> API -> My Applications (Parámetros -> API -> Mis aplicaciones) (es posible que necesites privilegios de administrador).

Rellena el formulario como se muestra, dejando los dos últimos campos de URL en blanco. Desk debería generar una clave de aplicación, un secreto de aplicación, un token de acceso a la API y un secreto de token de acceso a la API.

{{< img src="integrations/desk/desk_config.png" alt="desk config" popup="true">}}

Luego, desde tu cuenta de Datadog, introduce la información correspondiente en el [cuadro de Desk][2], junto con el nombre de dominio Desk exclusivo de tu empresa. Pulsa el botón de instalación y listo.

Tras la instalación, puedes seleccionar métricas `desk.*` en un dashboard personalizado o verlos en el [dashboard de Desk][3] proporcionado.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "desk" >}}


### Eventos

La integración Desk no incluye eventos.

### Checks de servicios

La integración Desk no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://www.datadoghq.com/blog/keep-support-team-page-salesforce-desk-integration
[2]: https://app.datadoghq.com/integrations/desk
[3]: https://app.datadoghq.com/screen/integration/desk
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/desk/desk_metadata.csv
[5]: https://docs.datadoghq.com/es/help/
---
app_id: desk
categories:
- Collaboration
- issue tracking
custom_kind: integración
description: Consulta y discute los casos nuevos, abiertos, pendientes y resueltos
  en tu evento stream.
title: Desk
---
## Información general

Conecta Desk a Datadog para ver los datos de tus casos de asistencia de Salesforce en un dashboard predefinido. Este dashboard te permite:

- Rastrear los eventos de casos nuevos en el flujo de eventos
- Visualizar las estadísticas de casos por usuario y estado
- Mirar las tendencias de los tickets de asistencia junto con los problemas de DevOps

Para obtener más información, consulta [Mantener la asistencia en la misma page (página) con la integración de Salesforce Desk](https://www.datadoghq.com/blog/keep-support-team-page-salesforce-desk-integration).

## Configuración

### Configuración

Desde tu cuenta de Desk, añade una aplicación de la API en la página Settings -> API -> My Applications (Parámetros -> API -> Mis aplicaciones) (es posible que necesites privilegios de administrador).

Rellena el formulario como se muestra, dejando los dos últimos campos de URL en blanco. Desk debería generar una clave de aplicación, un secreto de aplicación, un token de acceso a la API y un secreto de token de acceso a la API.

{{< img src="integrations/desk/desk_config.png" alt="desk config" popup="true">}}

A continuación, desde tu cuenta de Datadog, introduce la información correspondiente en el [ícono Desk](https://app.datadoghq.com/integrations/desk) junto con el nombre de dominio Desk exclusivo de tu empresa. Pulsa el botón de instalación y listo.

Tras la instalación, puedes seleccionar las métricas de `desk.*` en un dashboard personalizado o verlas en el [dashboard Desk] proporcionado (https://app.datadoghq.com/screen/integration/desk).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **desk.all_open_cases** <br>(gauge) | El número total de casos abiertos.|
| **desk.cases** <br>(gauge) | Número de casos abiertos durante el día en curso.|

### Eventos

La integración Desk no incluye eventos.

### Checks de servicio

La integración Desk no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).
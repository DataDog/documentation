---
disable_toc: false
further_reading:
- link: integrations/statuspage/
  tag: Documentación
  text: Instalar la integración con Statuspage
- link: https://app.datadoghq.com/integrations/statuspage
  tag: En la aplicación
  text: Cuadro de integración de Statuspage en la aplicación
- link: monitors/guide/integrate-monitors-with-statuspage/
  tag: Guía
  text: Integración de monitores con Statuspage
- link: synthetics/guide/synthetic-test-monitors/#integrate-your-synthetic-test-monitor-with-statuspage
  tag: Guía
  text: Integra tu monitor de tests Synthetic con Statuspage
kind: Guía
title: Integrar Statuspage con la Gestión de incidencias de Datadog
---

## Información general

Statuspage de Atlassian transmite el estado en tiempo real de los servicios de una organización en una página web. Activa la integración para vincular y actualizar automáticamente tu incidencia de Statuspage en la plataforma de gestión de incidencias de Datadog. Como Encargado de la incidencia o Persona involucrada puedes:
- Enviar mensajes dirigidos a los clientes con información precisa y actualizada
- Actualizar la página de estado mientras se investiga una incidencia sin abandonar la plataforma de Datadog 
- Resolver tanto las incidencias de Datadog como las de Statuspage vinculadas

## Requisitos previos

Instala la integración a través del [Cuadro de integración de Statuspage][1]. Para obtener más información, consulta la documentación de la [Integración de Statuspage][2].

## Python

1. En la [página Configuración de la integración][3], busca la Integración con Statuspage. 
1. Activa **Enable Statuspage incident creation** (Habilitar la creación de incidencias en Statuspage).

## Añadir una incidencia de Statuspage

1. En la [Página de incidencias][4], abre una incidencia existente.
1. En la parte superior de la página de incidencias, haz clic en **Add a Statuspage incident** (Añadir una incidencia de Statuspage).
1. Introduce todos los campos necesarios, que incluyen Seleccionar una Statuspage, Nombre de la incidencia y Estado de la incidencia. También puedes especificar qué componentes de Statuspage se ven afectados. 

{{< img src="service_management/incidents/guide/statuspage/add_update_statuspage_form.png" alt="Formulario para añadir o actualizar una incidencia de Statuspage, incluidos los campos obligatorios Seleccionar una Statuspage, Nombre de la incidencia y Estado de la incidencia" style="width:70%;" >}}

## Actualizar estado

Después de añadir una Statuspage a un incidente, puedes seguir actualizando la Statuspage hasta que se resuelva la incidencia.

{{< img src="service_management/incidents/guide/statuspage/update_status_modal.png" alt="Ejemplo de una incidencia que resalta la incidencia de Statuspage vinculada y la opción Actualizar la incidencia de Statuspage" style="width:80%;" >}}

1. En la [Página de incidencias][4], abre la incidencia que deseas actualizar.
1. Busca la Statuspage que has añadido y haz clic en el botón para abrir un modal de integración. Puedes desvincular la integración con Statuspage, cambiar el impacto o actualizar la Statuspage.
1. Haz clic en **Update Statuspage** (Actualizar Statuspage) para abrir los detalles de la Statuspage vinculada y realizar modificaciones.
1. Haz clic en **Update** (Actualizar) para actualizar la incidencia de Statuspage.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/statuspage
[2]: /es/integrations/statuspage/
[3]: https://app.datadoghq.com/incidents/settings#Integrations
[4]: https://app.datadoghq.com/incidents
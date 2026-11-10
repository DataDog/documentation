---
aliases:
- /es/service_management/incident_management/response_team/
- /es/incident_response/incident_management/response_team
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/responder_roles
  tag: Documentación
  text: Personalice los roles de respuesta en la Configuración de incidentes
title: Equipo de Incident Response
---
## Descripción general {#overview}

Forme su equipo de Incident Response agregando otros usuarios y asignándoles roles de respuesta para que sepan en qué deben enfocarse durante el Incident Response.

## Adición de respondedores {#adding-responders}

Un respondedor es cualquier usuario de Datadog que participa en el proceso de respuesta para un incidente en particular.

Cuando agrega un respondedor a un incidente:
* Datadog notifica al respondedor sobre el incidente por correo electrónico.
* Si el incidente es privado, el respondedor puede visualizarlo en Datadog.
* Si el incidente tiene un canal de Slack adjunto, los respondedores se agregan automáticamente a ese canal.

Datadog también agrega usuarios automáticamente como respondedores cuando:
* Realizan cualquier acción que actualice el incidente, incluyendo escribir en la línea de tiempo.
* Se les notifica sobre el incidente a través de una regla de notificación o una notificación manual de incidente.

La pestaña **Equipo de respuesta** de la página de Detalles del incidente registra la hora en que una persona fue agregada al equipo de respuesta del incidente. También registra la hora en que el respondedor realizó por última vez una acción que afectó al incidente en Datadog, como actualizar sus atributos o escribir en su línea de tiempo.

Puede eliminar respondedores si no tienen asignado ningún rol de respuesta y si aún no han realizado ninguna acción que actualice el incidente.

## Asignación de roles de respuesta {#assigning-responder-roles}

<div class="alert alert-info">Los roles de respuesta no están relacionados con el sistema de <a href="/account_management/rbac/?tab=datadogapplication">Role Based Access Control (RBAC)</a>. Un rol de respuesta en Incident Management no afecta los permisos de un usuario.</a></div>

Desde la pestaña **Equipo de Incident Response** de la página de Detalles del incidente, puede modificar los roles de respuesta para cualquier respondedor.

Puede definir roles de respuesta adicionales para una o varias personas con nombres y descripciones personalizados en [Configuración de incidentes][1].

## Administración de respondedores en Slack {#managing-responders-in-slack}

En Slack, puede administrar a los respondedores y sus roles de respuesta ingresando el comando `/dd incident responders` dentro de un canal de incidentes. También puede hacer clic en el botón "Administrar respondedores" en la bandeja de acciones de incidentes.

Cuando asigna un rol de respuesta, se notifica al asignado sobre ello en Slack.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/incident_response/incident_management/setup_and_configuration/responder_roles
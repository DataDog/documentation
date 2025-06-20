---
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/datadog-on-call/
  tag: Blog
  text: Enriquece tu experiencia de guardia utilizando la función On-Call de Datadog
title: On-Call
---

Datadog On-Call integra la monitorización, la localización de personas y la respuesta a incidencias en una sola plataforma.

{{< img src="service_management/oncall/oncall_overview.png" alt="Información general sobre cómo las páginas se enrutan. Desde un monitor, incidencia, señal de seguridad o llamada a la API, la página se envía a un equipo (por ejemplo, 'payments-team'), a continuación, a las reglas de procesamiento (por ejemplo, según prioridad), a continuación, a las políticas de escalada. A continuación, se puede enviar a un cronograma o directamente a un usuario." style="width:100%;" >}}

## Conceptos

- Las **Páginas** representan algo por lo que recibir una alerta, como un monitor, una incidencia o una señal de seguridad. Una página puede tener un estado de `Triggered`, `Acknowledged`, o `Resolved`.
- Los **equipos** son grupos configurados dentro de Datadog para gestionar tipos específicos de Páginas, en función de la experiencia y las funciones operativas.
- **Reglas de procesamiento** permiten a los equipos ajustar con precisión sus reacciones a tipos específicos de eventos de entrada. Estas reglas pueden establecer el nivel de urgencia de una página y enrutar las páginas a diferentes políticas de escalado en función de los metadatos de evento.
- **Las políticas de escalado** determinan cómo se escalan las páginas dentro de los equipos o entre ellos.
- Los **Cronogramas** establecen los horarios en los que determinados miembros del Equipo están de guardia para responder a las Páginas.

## Cómo funciona

Los **Equipos** son la unidad organizativa central de Datadog On-Call. Cuando se activa una notificación en Datadog, se envía una **Página** al Equipo de guardia designado.

{{< img src="service_management/oncall/notification_page.png" alt="Notificación que menciona un Equipo On-Call." style="width:80%;" >}}

Cada Equipo posee **políticas de escalado** y **cronogramas**. Las políticas de escalado definen cómo se envía una Página a varios cronogramas, como _Checkout Operations - Interrupt Handler_, _Primary_ y _Secondary_ en la siguiente captura de pantalla. Cada Equipo también puede configurar **reglas de procesamiento** para enrutar Páginas a diferentes políticas de escalamiento.

{{< img src="service_management/oncall/escalation_policy.png" alt="Un ejemplo de política de escalada." style="width:80%;" >}}

Un cronograma define las horas específicas en las que los miembros del Equipo están asignados para responder a las Páginas. Los cronogramas organizan y gestionan la disponibilidad de los miembros del equipo en diferentes zonas horarias y turnos.

{{< img src="service_management/oncall/schedule.png" alt="Un cronograma de ejempo, con múltiples capas para horas laborables de JP, UE y EE. UU." style="width:80%;" >}}

## Empiece a utilizar Datadog On-Call

Para empezar con On-Call [incorpora un equipo de On-Call][1] y asegúrate de que todos los miembros del equipo configuran sus [ajustes del perfil de On-Call][2] para recibir notificaciones.

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/service_management/on-call/teams">}}<u>Incorporar un Equipo</u>: crea un nuevo equipo de On-Call, añade un Equipo de Datadog existente a On-Call o importa un equipo desde PagerDuty o Opsgenie.{{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/pages">}}<u>Enviar una Página</u>: llama a un equipo mediante monitores, incidencias, señales de seguridad, etc.; o envía de forma manual una Página mediante Datadog, Slack, Microsoft Teams, o la API de Datadog. {{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/escalation_policies">}}<u>Políticas de escalada</u>: define pasos para cómo se debe enviar una Página a diferentes cronogramas. {{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/schedules">}}<u>Cronogramas</u>: define las tablas temporales para miembros del Equipo.{{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/profile_settings">}}<u>Ajustes del perfil</u>: configura tu método de contacto y preferencias de notificación para asegurar que recibas las Páginas de forma puntal y eficaz.{{< /nextlink >}}
{{< /whatsnext >}}

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/on-call/teams
[2]: /es/service_management/on-call/profile_settings
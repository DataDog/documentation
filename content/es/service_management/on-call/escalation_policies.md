---
further_reading:
- link: /service_management/on-call/
  tag: Documentation
  text: Datadog On-Call
title: Políticas de elevación
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">El servicio de guardia no es compatible con el <a href="/getting_started/site">sitio Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

En Datadog On-Call, las políticas de elevación garantizan que las páginas se traten con prontitud. Las páginas se elevan a través de pasos predefinidos, a menos que se acuse recibo de ellas en los plazos establecidos.

Datadog crea una política de elevación predeterminada cuando [incorporas un equipo a On-Call][1].

## Crea una nueva política de elevación
{{< img src="service_management/oncall/escalation_policy_2.png" alt="Política de elevación de una muestra" style="width:100%;" >}}

1. Ve a [**On-Call** > **Políticas de elevación**][2].
1. Selecciona [**+ Nueva política de elevación**][3].
1. Introduce un **Nombre** para tu política de elevación. Por ejemplo, _Payment's Escalation Policy_.
1. Selecciona los **Equipos** que poseen esta política de elevación.
1. Ahora empieza a crear la política. Decide quién o qué debe recibir una página cuando se invoque esta política de elevación. Para cada paso de elevación posterior, selecciona a quién notificar. Cada paso puede notificar a usuarios individuales, equipos enteros y/o a quien esté de guardia en un horario.
   Por ejemplo: Cuando se activa esta página, se envía a quien esté de guardia en ese momento para el cronograma principal, en este caso John Doe.
   {{< img src="service_management/oncall/escalation_policy_2_steps.png" alt="Una política de elevación, que muestra dos pasos después de que 'se activa la página'. Cada paso tiene una casilla de entrada 'Notificar' y 'si no se acusa recibo de la página después de N minutos, elevar'. El primer paso está configurado para notificar un cronograma llamado principal y se eleva si se acusa recibo de la página después de 5 minutos. El segundo paso está configurado para notificar a un usuario llamado Jane Doe." style="width:100%;" >}}
1. Configura cuántos minutos se debe esperar para que uno de los destinatarios acuse recibo de la página. Si nadie acusa recibo de la página en ese período de tiempo, la página se eleva a un nivel superior. En el ejemplo, si la persona de guardia principal, John Doe, no acusa recibo de la página en cinco minutos, la página se envía a Jane Doe.
1. Configura cuántas veces deben repetirse estos pasos si nadie acusa recibo de la página.
1. Selecciona si Datadog debe actualizar automáticamente el estado de la página a **Resuelto** después de ejecutar todas las reglas y repeticiones.

## Objetivos de las políticas de elevación
En cada paso de una política de elevación, puedes notificar a usuarios individuales, a equipos enteros o a quien esté de guardia en un horario.

### Cronogramas
{{< img src="service_management/oncall/escalation_policy_notify_schedule.png" alt="Un paso de la política de elevación de muestras que notifica un cronograma" style="width:100%;" >}}

Las políticas de elevación pueden notificar a quien esté de guardia según un cronograma predefinido. El sistema checks el cronograma y notifica a la persona o al grupo que está de guardia activamente durante la incidencia. El uso de cronogramas es beneficioso para lo siguiente:

- Envío de alertas al personal de guardia de distintas zonas horarias para una cobertura ininterrumpida.
- Gestión de la asistencia por niveles, en la que diferentes turnos gestionan distintos niveles de urgencia.
- Notificaciones dinámicas para equipos con responsabilidades de guardia rotativas, lo que garantiza que siempre se llame a la persona adecuada.

Si no hay nadie de guardia para un horario determinado, el paso de elevación se omite lentamente y el proceso avanza sin retrasos ni interrupciones. La interfaz de usuario indica que se ha omitido el paso.

{{< img src="service_management/oncall/escalation_policy_schedule_skipped.png" alt="Una política de elevación de muestras que indica una elevación omitida debido a que no había ninguna persona de guardia" style="width:100%;" >}}

### Usuarios
{{< img src="service_management/oncall/escalation_policy_notify_user.png" alt="Una política de elevación de muestras que especifica un usuario en la política de elevación" style="width:100%;" >}}

Puedes incluir usuarios específicos en una política de elevación para asegurarte de que siempre se notifique a las personas clave en el evento de una página. Los casos de uso más comunes para avisar directamente a un usuario son los siguientes:

- Notificar a un ingeniero senior las incidencias de alta gravedad que requieran conocimientos especializados.
- Alertar a un gerente o director de producto en caso de incidencias de cara al cliente.
- Dirigir alertas a personal de reserva si el contacto principal no está disponible.

### Equipos
{{< img src="service_management/oncall/escalation_policy_notify_team.png" alt="Una política de elevación de muestras que notifica a un equipo entero" style="width:100%;" >}}

Los casos de uso más comunes para avisar a un equipo entero son los siguientes:

- Incidencias que afectan a varios sistemas en los que distintos miembros del equipo pueden contribuir a la solución.
- Elevación a un equipo de DevOps para incidencias relacionadas con la infraestructura.
- Garantizar que se alerte a todos los miembros pertinentes de un equipo de ingeniería o seguridad en caso de interrupciones críticas.

## Limitaciones

- Máximo de pasos de elevación: 10
- Número máximo de objetivos de notificación (individuos, equipos o cronogramas) por paso de elevación: 10
- Tiempo mínimo antes de pasar al siguiente paso: un minuto

[1]: /es/service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/escalation-policies
[3]: https://app.datadoghq.com/on-call/escalation-policies/create
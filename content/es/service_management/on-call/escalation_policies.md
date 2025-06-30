---
further_reading:
- link: /service_management/on-call/
  tag: Documentación
  text: Datadog On-Call
title: Políticas de escalado
---

En Datadog On-Call, las políticas de escalado garantizan que los llamados se traten con prontitud. Los llamados se escalan a través de pasos predefinidos, a menos que se acuse recibo de ellos en los plazos establecidos.

Datadog crea una política de escalado predeterminada cuando [incorporas un equipo a On-Call][1].

## Crea una nueva política de escalado
{{< img src="service_management/oncall/escalation_policy_2.png" alt="Política de escalado de ejemplo" style="width:100%;" >}}

1. Ve a [**On-Call** > **Políticas de escalado**][2].
1. Selecciona [**+ Nueva política de escalado**][3].
1. Introduce un **Nombre** para tu política de escalado. Por ejemplo, _Política de escalado para pagos_.
1. Selecciona los **Equipos** que poseen esta política de escalado.
1. Para cada paso de escalado:
       1. Decide a quién se debe notificar. Puedes especificar usuarios individuales, equipos o quien(es) esté(n) de guardia en un horario.
       1. Selecciona uno de los siguientes métodos de notificación: `Notify All`, `Round Robin`. Para obtener más detalles, consulta los [tipos de notificación de las políticas de escalado](#escalation-policy-step-notification-types).
       1. Especifica cuántos minutos tiene el destinatario para acusar recibo del llamado antes de que se escale al siguiente nivel.
   Por ejemplo, lo siguiente notificará al usuario de guardia actual cuando se active un llamado. Se escalará a Jane Doe si John no se acusa recibo del llamado en un plazo de 5 minutos.
   {{< img src="service_management/oncall/escalation_policy_2_steps_v2.png" alt="Política de escalado configurada para notificar al usuario de guardia previsto y escalar el llamado a Jane Doe si no se acusa recibo del llamado luego de 5 minutos." style="width:100%;" >}}
1. Define cuántas veces se repetirán los pasos si nadie acusa recibo del llamado.
1. Selecciona si Datadog debe actualizar automáticamente el estado del llamado a **Resuelto** después de ejecutar todas las reglas y repeticiones.

## Tipos de notificación de pasos de la política de escalado
En cada paso de una política de escalado, puedes mantener el comportamiento estándar `Notify All` u optar por `Round Robin`.
{{< img src="service_management/oncall/escalation_policy_notification_type.png" alt="Selector del tipo de notificación en la creación de la política de escalado" style="width:100%;" >}}

### Notificar a todos (por defecto)
Notifica a todos los objetivos del paso al mismo tiempo.

Por ejemplo, si un paso incluye un usuario individual, un equipo con tres miembros y un cronograma, se notificará a cinco personas: el usuario individual, cada uno de los tres miembros del equipo y el usuario de guardia del cronograma.

### Round robin
Distribuye automáticamente llamados entre varios objetivos (usuarios, cronogramas, equipos) en un orden rotatorio para garantizar un balanceo de las cargas justo.

Por ejemplo, si tienes un equipo de asistencia de 50 personas, puedes dividir el equipo en cinco cronogramas de 10 personas y configurar la siguiente política para distribuir las cargas de forma uniforme:
- Llamado A → Cronograma de soporte Grupo 1
- Llamado B → Cronograma de soporte Grupo 2
- Llamado C → Cronograma de soporte Grupo 3
- Llamado D → Cronograma de soporte Grupo 4
- Llamado E → Cronograma de soporte Grupo 5
- Llamado F → Cronograma de soporte Grupo 1
- Llamado G → Cronograma de soporte Grupo 2

#### Comportamiento de escalado
En el modo round robin, si no se acusa recibo de un llamado a tiempo, este no pasa a la siguiente persona de la rotación round robin, sino que se escala al siguiente paso de la política.

Si quieres que el llamado pase al siguiente objetivo del round robin, utiliza un solo paso round robin en tu política de escalado y configúralo para que se repita tantas veces como objetivos haya.

## Objetivos del paso de la política de escalado
En cada paso de una política de escalado, puedes notificar a usuarios individuales, a equipos enteros o a quien esté de guardia en un horario.

### Cronogramas
{{< img src="service_management/oncall/escalation_policy_notify_schedule.png" alt="Paso de política de escalado de ejemplo que notifica un cronograma" style="width:100%;" >}}

Las políticas de escalado pueden notificar a quien esté de guardia según un cronograma predefinido. El sistema checks el cronograma y notifica a la persona o al grupo que está de guardia activamente durante la incidencia. El uso de cronogramas es beneficioso para lo siguiente:

- Envío de alertas al personal de guardia de distintas zonas horarias para una cobertura ininterrumpida.
- Gestión de la asistencia por niveles, en la que diferentes turnos gestionan distintos niveles de urgencia.
- Notificaciones dinámicas para equipos con responsabilidades de guardia rotativas, lo que garantiza que siempre se llame a la persona adecuada.

Si no hay nadie de guardia para un horario determinado, el paso de escalado se omite lentamente y el proceso avanza sin retrasos ni interrupciones. La interfaz de usuario indica que se ha omitido el escalado.

{{< img src="service_management/oncall/escalation_policy_schedule_skipped.png" alt="Política de escalado de ejemplo que indica un escalado omitido debido a que no había ninguna persona de guardia" style="width:100%;" >}}

### Usuarios
{{< img src="service_management/oncall/escalation_policy_notify_user.png" alt="Política de escalado de ejemplo que especifica un usuario en la política de escalado" style="width:100%;" >}}

Puedes incluir usuarios específicos en una política de escalado para asegurarte de que siempre se notifique a las personas clave en el caso de un llamado. Los casos de uso más comunes para avisar directamente a un usuario son los siguientes:

- Notificar a un ingeniero senior las incidencias de alta gravedad que requieran conocimientos especializados.
- Alertar a un gerente o director de producto en caso de incidencias de cara al cliente.
- Dirigir alertas a personal de reserva si el contacto principal no está disponible.

### Equipos
{{< img src="service_management/oncall/escalation_policy_notify_team.png" alt="Política de escalado de ejemplo que notifica a un equipo entero" style="width:100%;" >}}

Los casos de uso más comunes para avisar a un equipo entero son los siguientes:

- Incidencias que afectan a varios sistemas en los que distintos miembros del equipo pueden contribuir a la solución.
- Escalado a un equipo de DevOps para incidentes relacionados con la infraestructura.
- Garantizar que se alerte a todos los miembros pertinentes de un equipo de ingeniería o seguridad en caso de interrupciones críticas.

## Limitaciones

- Máximo de pasos de escalado: 10
- Número máximo de objetivos de notificación (individuos, equipos o cronogramas) por paso de escalado: 10
- Tiempo mínimo antes de escalar al siguiente paso: un minuto

[1]: /es/service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/escalation-policies
[3]: https://app.datadoghq.com/on-call/escalation-policies/create
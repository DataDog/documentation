---
further_reading:
- link: /service_management/on-call/
  tag: Documentation
  text: Datadog On-Call
title: Incorporar un equipo
---

Los Teams (Equipos) son la unidad organizativa central de [Datadog On-Call][2]. Las Páginas se envían a un Equipo y los cronogramas del Equipo o las políticas de escalada dirigen la Página a un miembro apropiado del Equipo.

Los Equipos de On-Call son una extensión de [Datadog Teams][1]. Los Equipos On-Call aparecen en la página de descripción general de [Teams][3] (Equipos), junto a los equipos que no realizan tareas de guardia. Datadog recomienda que utilices Equipos existentes para tu configuración de On-Call siempre que sea posible, ya que esto aumenta la visibilidad de tu Equipo On-Call.

### Incorporación de un equipo nuevo o existente

1. Ve a [**On-Call** > **Teams**][4] (On-Call > Equipos) y selecciona **Set Up Team** (Configurar equipo).
1. Crea un nuevo Equipo, selecciona un Equipo existente en Datadog o importa configuraciones de equipo desde PagerDuty u Opsgenie.
  {{< tabs >}}
  {{% tab "Nuevo Equipo" %}}
  - **Nombre del Equipo**: introduce un nombre para tu Equipo. Datadog te recomienda que no utilices acrónimos aquí, a menos que el acrónimo ya se utilice ampliamente en tu organización.
  - **Identificador**: el identificador que se utiliza para localizar al Equipo en la plataforma de Datadog. Puedes cambiar el nombre de tu Equipo en cualquier momento.
  - **Miembros**: añade los miembros de tu Equipo, incluidos los que no realizan funciones de guardia.
  - **Descripción**: proporciona una descripción de las responsabilidades de tu equipo. Por ejemplo: _Nuestro equipo es responsable de [responsabilidad principal]. Aseguramos [objetivos o actividades clave], en funcionamiento [horas o condiciones operativas]._.
  {{% /tab %}}
  {{% tab "Equipo existente" %}}
  Selecciona un Equipo existente de Datadog en el menú desplegable.
  {{% /tab %}}
  {{< /tabs >}}
1. Añade una política de escalada por defecto.
   {{< img src="service_management/oncall/escalation_policy_blank.png" alt="Vista de configuración de una nueva política de escalada. Notifica tres cronogramas propuestos." style="width:80%;" >}}
   - Datadog propone automáticamente cronogramas _Interrupt Handler_ (Interrumpir identificador), _Primary_ (Primario) y _Secondary_ (Secundario) para tu Equipo. Puedes definir estos cronogramas en el siguiente paso. 
   - También puedes notificar un cronograma existente que pertenezca a otro Equipo. 

   Consulta [Políticas de escalado][5] para obtener más detalles.
1. Define los cronogramas creados en el paso anterior. 
   {{< img src="service_management/oncall/schedule_blank.png" alt="Vista de configuración de un nuevo cronograma." style="width:80%;" >}}
   - **Zona horaria del cronograma**: selecciona la zona horaria en la que deseas que funcione tu cronograma. Otros ajustes, como los tiempos de transferencia, siguen esta selección.
   - **Rotaciones de cronograma**: añade las rotaciones que desees.
   Consulta [Cronogramas][6] para obtener más información.

### Siguientes pasos

Configura tus monitores, incidencias u otros recursos para enviar Páginas a tu Equipo On-Call. Consulta [Enviar una página][7].

Asegúrate de que los miembros de tu Equipo On-Call han configurado sus [Ajustes de perfil][8].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/teams/
[2]: /es/service_management/on-call/
[3]: https://app.datadoghq.com/organization-settings/teams
[4]: https://app.datadoghq.com/on-call/
[5]: /es/service_management/on-call/escalation_policies
[6]: /es/service_management/on-call/schedules
[7]: /es/service_management/on-call/pages
[8]: /es/service_management/on-call/profile_settings
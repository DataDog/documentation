---
description: Cree, vincule y mantenga los Datadog Teams sincronizados con los grupos
  de asignación de ServiceNow.
further_reading:
- link: /integrations/servicenow/
  tag: Documentación
  text: Integración de ServiceNow
- link: /account_management/teams/
  tag: Documentación
  text: Datadog Teams
- link: /account_management/teams/github/
  tag: Documentación
  text: Aprovisione Datadog Teams con GitHub
title: Aprovisione Datadog Teams con ServiceNow
---
## Descripción general {#overview}

Si su organización ya mantiene grupos de asignación en ServiceNow, puede usarlos como fuente para Datadog Teams en lugar de volver a crear equipos manualmente. La conexión de grupos de asignación de ServiceNow con Datadog Teams permite:

- Crear Datadog Teams a partir de sus grupos de asignación de ServiceNow.
- Vincular Datadog Teams existentes a grupos de asignación de ServiceNow. Por ejemplo, puede enrutar On-Call e Incidents por grupo de ServiceNow.
- Mantener la membresía de equipos sincronizada con ServiceNow, una sola vez o según un horario recurrente.

Si sus grupos de asignación de ServiceNow tienen grupos principales, Datadog replica esa misma jerarquía durante el aprovisionamiento.

Los Datadog Teams existentes se vinculan, no se duplican, cuando un [handle][7] de equipo de Datadog coincide con el nombre de un grupo de asignación de ServiceNow. La coincidencia no distingue entre mayúsculas y minúsculas e ignora las diferencias de espacios en blanco. Todos los demás Datadog Teams existentes y sus permisos no se ven afectados.

Datadog tiene acceso de solo lectura a los grupos de asignación de ServiceNow. Nunca escribe en ellos, los crea ni los modifica.

## Requisitos previos {#prerequisites}

### Integración de ServiceNow {#servicenow-integration}

Su organización de Datadog debe estar conectada a al menos una instancia de ServiceNow a través de la [integración de ServiceNow][1]. No se requieren permisos de ServiceNow más allá de la configuración estándar de la integración.

La integración se configura por organización de Datadog.

### Permisos{#permissions}

- Vincular y crear equipos requiere el permiso `teams_manage`.
- Sincronizar la membresía de equipos requiere el permiso `user_access_manage`.
- Configurar la integración de ServiceNow, o editar su mosaico para agregar o cambiar un filtro de grupo de asignación, requiere el permiso `manage_integrations`.

## Configuración {#setup}

### Conecte grupos de asignación de ServiceNow a Datadog Teams {#connect-servicenow-assignment-groups-to-datadog-teams}

1. Vaya a [Teams > Data Sources][6].
2. Seleccione {{< ui >}}ServiceNow{{< /ui >}}.
3. Elija el tipo de importación:
   - {{< ui >}}Import, create, and link teams{{< /ui >}}: Datadog crea un equipo para cada grupo de asignación de ServiceNow en el contexto y lo vincula a ese grupo.
   - {{< ui >}}Link only{{< /ui >}}: Datadog vincula los Datadog Teams existentes con los grupos de asignación correspondientes sin crear equipos. Use esta opción cuando administre equipos desde Datadog o SAML y solo necesite el mapeo de Datadog a ServiceNow.
4. Elija si desea administrar la membresía de equipo desde ServiceNow. Si seleccionó {{< ui >}}Import, create, and link teams{{< /ui >}}, active la sincronización de membresía para que los equipos que Datadog crea tengan miembros. La sincronización de membresía puede tardar hasta 24 horas en surtir efecto.
5. Elija la frecuencia de sincronización:
   - {{< ui >}}One-time{{< /ui >}}: Datadog importa los grupos de asignación una vez.
   - {{< ui >}}Recurring{{< /ui >}}: Datadog se sincroniza al menos una vez cada 24 horas.
6. Seleccione cuáles de sus instancias de ServiceNow conectadas desea incluir.
7. Seleccione {{< ui >}}Save{{< /ui >}}.

### Filtrar grupos de asignación {#filter-assignment-groups}

De forma predeterminada, Datadog sincroniza todos los grupos de asignación en las instancias seleccionadas. Para sincronizar solo un subconjunto, agregue un filtro en el [mosaico de integración de ServiceNow][3] usando la [sintaxis de consulta codificada][4] de ServiceNow. Datadog pasa el filtro a ServiceNow y recibe solo los grupos de asignación coincidentes.

Los filtros comunes incluyen:

- Solo grupos de asignación activos.
- Solo grupos de asignación que aparecen en su catálogo de servicios.

Defina el filtro antes de su primera sincronización. Reducirlo más tarde no elimina los equipos que ya existen. Consulte [Eliminación de grupos de asignación de la sincronización](#removing-assignment-groups-from-the-sync).

### Límites {#limits}

Datadog importa hasta 100 000 grupos de asignación por organización y hasta 10 000 miembros por grupo de asignación. Los equipos creados a partir de grupos de asignación también cuentan para los [límites de Datadog Teams][9], incluido el número máximo de equipos y la profundidad de la jerarquía.

Si sus grupos de asignación exceden estos límites, Datadog le solicita que los filtre antes de que comience la importación. Use un [filtro](#filter-assignment-groups) para reducir el número de grupos de asignación importados, o comuníquese con [Datadog Support][8] para solicitar un aumento del límite.

### Visualizar Datadog Teams {#view-datadog-teams}

1. Vaya a [Teams > Data Sources][6].
2. Si no aparece ningún equipo creado o vinculado, seleccione {{< ui >}}Refresh{{< /ui >}}.
3. Opcionalmente, edite Datadog Teams manualmente para alcanzar el estado que desea.

También puede encontrar equipos sincronizados en la lista de [Teams][2]: filtre la faceta {{< ui >}}Connection{{< /ui >}} a `ServiceNow`.

## Coincidencia de usuarios {#user-matching}

Datadog hace coincidir a los usuarios por dirección de correo electrónico. Un usuario se agrega a un equipo cuando su dirección de correo electrónico de Datadog coincide con su dirección de correo electrónico en ServiceNow.

La integración no crea usuarios de Datadog ni envía invitaciones. Si un miembro de un grupo de asignación de ServiceNow no tiene una cuenta de Datadog, Datadog lo omite.

Si la dirección de correo electrónico de un usuario cambia, como después de una migración de dominio, actualice la dirección tanto en Datadog como en ServiceNow. La siguiente sincronización detecta la nueva dirección y vuelve a vincular al usuario.

## Cambio de nombre de grupos de asignación {#renaming-assignment-groups}

Datadog identifica cada grupo de asignación de ServiceNow por su ID único, por lo que cambiar el nombre de un grupo en ServiceNow no crea un equipo de Datadog. El handle del equipo de Datadog nunca cambia, lo que mantiene la telemetría y los dashboards etiquetados con ese handle vinculados al equipo.

El nombre del equipo de Datadog sigue el cambio de nombre de ServiceNow solo cuando se cumplen todas las siguientes condiciones:

- La conexión de ServiceNow creó el equipo de Datadog.
- Ninguna otra fuente, como SCIM, administra el equipo.
- La conexión utiliza {{< ui >}}Import, create, and link teams{{< /ui >}}.

En todos los demás casos, Datadog deja el nombre del equipo sin cambios.

## Eliminación de grupos de asignación de la sincronización {#removing-assignment-groups-from-the-sync}

Cuando un grupo de asignación queda fuera de la sincronización (por ejemplo, porque usted restringió el filtro), Datadog no elimina el equipo de Datadog correspondiente. En su lugar, Datadog elimina a todos los miembros sincronizados del equipo y deja el equipo en su lugar sin miembros. Esto se aplica tanto a las sincronizaciones únicas como a las recurrentes.

Para eliminar los equipos vacíos:

1. Vaya a [Teams][2].
2. Filtre la faceta {{< ui >}}Connection{{< /ui >}} a `ServiceNow`.
3. Seleccione los equipos que desea eliminar y bórrelos.

Los cambios realizados por la sincronización no se pueden revertir automáticamente. [Audit Trail][5] registra cada cambio, el cual puede utilizar para restaurar un estado anterior manualmente.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/servicenow/
[2]: https://app.datadoghq.com/organization-settings/teams
[3]: https://app.datadoghq.com/integrations/servicenow
[4]: https://www.servicenow.com/docs/r/platform-user-interface/c_EncodedQueryStrings.html
[5]: /es/account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/teams/data-sources
[7]: /es/account_management/teams/#team-handle
[8]: /es/help/
[9]: /es/account_management/teams/manage/#limits
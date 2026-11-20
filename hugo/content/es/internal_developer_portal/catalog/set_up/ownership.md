---
aliases:
- /es/internal_developer_portal/software_catalog/set_up/ownership
description: Vincule servicios y otras entidades a Datadog Teams para que pueda filtrar
  vistas, enrutar notificaciones y fomentar la responsabilidad en toda su cartera
  de software.
further_reading:
- link: /account_management/teams/
  tag: Documentación
  text: Teams
- link: /internal_developer_portal/catalog/entity_model/
  tag: Documentación
  text: Agregue metadatos desde la Datadog UI
title: Defina la propiedad de las entidades del Catálogo
---
## Descripción general {#overview}

Defina la propiedad en el Catálogo para conectar las entidades a Datadog Teams responsables de ellas. La información de propiedad aparece en la página de detalles de cada entidad y le permite: 
- Filtrar vistas por equipo en todos los productos de Datadog.
- Atribuya Scorecards y campañas a los propietarios correctos.
- Enrutar notificaciones y contexto de guardia al equipo correcto.

## Crear un Team {#create-a-team}

Puede crear un Team desde la [Configuración de la organización de Datadog][3] o directamente desde el [Catálogo][1]. Para obtener instrucciones completas, consulte [Configuración y configuración del Team][2]. 

Una definición de Team incluye lo siguiente:
1. **Nombre del Team**: Por ejemplo, "Bits Demo".
2. **Identificador**: Un identificador único, como `bits-demo`. Los identificadores se pueden usar como facetas de búsqueda (por ejemplo, `team:bits-demo`).
3. **Miembros**: Uno o más usuarios de Datadog. 
4. **Descripción**: Opcional, pero recomendado para dar contexto.

Después de crear un Team, puede agregar enlaces de referencia, configurar notificaciones y asociar el Team con recursos de Datadog, como Monitors y Dashboards.

## Configurar la propiedad de la entidad {#configure-entity-ownership}

### En Datadog {#in-datadog}

Para agregar o actualizar el propietario de una entidad en Datadog:

1. Vaya a **Catálogo** y abra la entidad.
2. Haga clic en **Edit in UI** en la página de la entidad.
3. En la sección **Propiedad**, establezca el **Propietario** y, opcionalmente, agregue **Propietarios adicionales**.
   - Busque por nombre de equipo o pegue un identificador (por ejemplo, `team:example-team`).
5. Haga clic en **Save Entry**.

### A través de archivos de configuración {#through-configuration-files}

Si administra entidades como código (por ejemplo, a través de definiciones de servicio respaldadas por repositorio o automatización), incluya el o los identificadores de equipo en el campo de metadatos de la entidad que se asigna a los propietarios. Asegúrese de que los identificadores coincidan exactamente con los Datadog Teams existentes.

## Mejores prácticas {#best-practices}

- **Use Teams, no personas:** Asigne entidades a Teams para que los cambios en la membresía no interrumpan los enlaces de propiedad, los filtros ni las notificaciones.
- **Elija un propietario principal:** Designe un Team responsable; agregue propietarios secundarios solo cuando sea necesario.
- **Mantenga los identificadores coherentes:** Use identificadores en minúsculas y con guiones para mayor coherencia y facilidad de búsqueda (por ejemplo, `payments-platform`, no `Payments Platform`).
- **Sincronice desde su IDP:** Si es posible, aprovisione Teams desde SAML o SCIM para mantener la membresía actualizada.
- **Use filtros de Teams:** Anime a los ingenieros a seleccionar sus Teams en el [filtro de Teams][4] para centrar las vistas en las entidades que poseen.
- **Use jerarquías de Teams**: Cree [subteams][5] para reflejar la estructura de su organización y habilitar el filtrado jerárquico. 



[1]: https://app.datadoghq.com/teams
[2]: /es/account_management/teams/
[3]: https://app.datadoghq.com/organization-settings/teams
[4]: /es/account_management/teams/#team-filter
[5]: /es/account_management/teams/manage/#team-hierarchies
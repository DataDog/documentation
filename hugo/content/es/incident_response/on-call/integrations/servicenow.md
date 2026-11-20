---
description: Cree incidentes de ServiceNow a partir de On-Call Pages, manténgalos
  sincronizados y active Pages desde incidentes de ServiceNow.
further_reading:
- link: /integrations/servicenow/
  tag: Documentación
  text: Instale la integración de ServiceNow
- link: /integrations/guide/servicenow-itom-itsm-setup
  tag: Documentación
  text: Configure ServiceNow ITOM e ITSM
- link: /incident_response/on-call/routing_rules/
  tag: Documentación
  text: Reglas de enrutamiento
- link: /incident_response/on-call/integrations/
  tag: Documentación
  text: On-Call Integrations
title: Integre ServiceNow con Datadog On-Call
---
{{< callout url="https://www.datadoghq.com/product-preview/on-call-integrations/" btn_hidden="false" header="Únase a la vista previa">}}
La integración de ServiceNow para Datadog On-Call está en versión preliminar.
{{< /callout >}}

## Descripción general {#overview}

La integración de ServiceNow para Datadog On-Call conecta On-Call Pages con incidentes de ServiceNow. Admite dos flujos:

- **[Sincronizar Pages con ServiceNow](#sync-pages-to-servicenow-incidents)**: Cuando una regla de enrutamiento crea una Page, Datadog crea un incidente de ServiceNow y lo mantiene sincronizado con la Page. El estado, la urgencia y los comentarios se sincronizan según las asignaciones que configure.
- **[Activar Pages desde ServiceNow](#trigger-pages-from-servicenow-incidents)**: Cuando un registro de ServiceNow coincide con una regla de negocio, la regla activa una Page para un equipo o usuario de Datadog On-Call.

## Requisitos previos {#prerequisites}

- Asegúrese de tener el permiso [On-Call Admin (`on_call_admin`)][1], que necesita para crear conexiones de ServiceNow en la configuración de On-Call.
- Complete la [configuración de ServiceNow ITOM/ITSM][2]:
  1. Configure el mosaico de ServiceNow e instale la versión 2.9.3 o posterior de ITOM/ITSM Integration for Datadog.
  1. Complete los pasos en [Sincronizar datos bidireccionalmente entre ServiceNow y Datadog][3]. Ambos flujos en esta página utilizan las credenciales de esa configuración.

## Sincronizar Pages con incidentes de ServiceNow {#sync-pages-to-servicenow-incidents}

### Crear una conexión de ServiceNow {#create-a-servicenow-connection}

Una conexión define qué instancia de ServiceNow recibe los incidentes y cómo se mantienen sincronizadas las Pages y los incidentes. Puede crear más de una conexión, por ejemplo, una para cada grupo de asignación.

1. En Datadog, vaya a [**On-Call > Settings > Integrations**][4].
1. Seleccione **ServiceNow** y haga clic en **Add Connection**.
1. Configure la conexión:
   - **ServiceNow instance**: Seleccione la instancia de ServiceNow configurada en el mosaico de ServiceNow. Para agregar una instancia, haga clic en **Manage accounts**.
   - **Assignment group** (opcional): Seleccione el grupo de asignación de ServiceNow para los incidentes creados desde Pages.
   - **Automatically create ServiceNow incidents from Pages**: Habilite este interruptor para crear un incidente de ServiceNow cada vez que una regla de enrutamiento que utiliza esta conexión cree una Page.
   - **Sync methods and mappings**: Elija cómo se sincroniza cada campo entre la Page y el incidente de ServiceNow, y asigne sus valores. Puede sincronizar el estado de la Page con el campo **State** del incidente, su urgencia con los campos **Impact** y **Urgency** del incidente, y sus comentarios con el campo **Work Notes** del incidente.
1. Guarde la conexión.

### Sincronizar Pages desde una regla de enrutamiento {#sync-pages-from-a-routing-rule}

Después de crear una conexión, agregue la sincronización de ServiceNow a las [reglas de enrutamiento][5] de un equipo:

1. Vaya a [**On-Call > Teams**][6] y seleccione un equipo.
1. Busque la sección **Page Routing** y haga clic en **Edit**.
1. Agregue o edite una regla de enrutamiento.
1. En **Set targets**, haga clic en **Add**, seleccione **Sync with a ServiceNow Incident** y, a continuación, seleccione la conexión que desea utilizar.
1. Guarde la regla de enrutamiento.

Cuando la regla coincide con una alerta, Datadog crea la Page y un incidente de ServiceNow al mismo tiempo. El incidente se mantiene sincronizado con la Page según la configuración de la conexión.

## Activar Pages desde incidentes de ServiceNow {#trigger-pages-from-servicenow-incidents}

La ITOM/ITSM Integration for Datadog incluye un `PublishOnCallPage` script. Llámelo desde una regla de negocio de ServiceNow para activar una Page de On-Call, por ejemplo, cuando se crea un incidente.

1. En ServiceNow, vaya a **System Definition > Business Rules** y haga clic en **New**.
1. Configure la tabla de la regla de negocio, cuándo se ejecuta y sus condiciones de filtro para definir qué registros activan una Page. Seleccione la casilla de verificación **Advanced** para habilitar la creación de scripts.
1. En la pestaña **Advanced**, llame a `PublishOnCallPage` en el script. Por ejemplo, para activar una Page para el equipo `database` con urgencia alta:

   ```javascript
   (function executeRule(current, previous /* null when async */) {
       new PublishOnCallPage("team_handle", "database", "high").execute(current);
   })(current, previous);
   ```

   Para conocer los tipos de destino admitidos, el argumento de urgencia y los alcances de la clave de aplicación que requiere el script, consulte [Crear una Page de Datadog On-Call desde ServiceNow][7].
1. Haga clic en **Enviar**.

Cuando se ejecuta la regla de negocio, Datadog activa una Page para el equipo o usuario de destino.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/#on-call
[2]: /es/integrations/guide/servicenow-itom-itsm-setup/
[3]: /es/integrations/guide/servicenow-itom-itsm-setup/#sync-bidirectionally
[4]: https://app.datadoghq.com/on-call/settings/integrations
[5]: /es/incident_response/on-call/routing_rules/
[6]: https://app.datadoghq.com/on-call/teams
[7]: /es/integrations/guide/servicenow-itom-itsm-setup/#create-on-call-page
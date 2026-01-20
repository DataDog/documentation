---
aliases:
- /es/service_management/on-call/cross_org_paging/
further_reading:
- link: /incident_response/on-call/
  tag: Documentación
  text: Datadog On-Call
private: true
title: Búsquedas entre organizaciones
---

<div class="alert alert-info">
Las búsquedas entre organizaciones está en versión preliminar y solo es compatible con flujos de trabajo automatizados (por ejemplo: alertas de monitor, reglas de notificación de incidentes). Las búsquedas a través de la interfaz de usuario o la API de Datadog se limita a organizaciones y centros de datos locales.
</div>

## Información general

Las búsquedas entre organizaciones permite a los usuarios activar automáticamente alertas para equipos de On-Call que se encuentran en otras organizaciones o centros de datos de Datadog. Las búsquedas entre organizaciones es útil cuando la configuración operativa u organizativa abarca varias organizaciones o centros de datos de Datadog, y se busca centralizar la respuesta a incidentes en una única organización. 

Con las búsquedas entre organizaciones, puedes:

- **Gestionar los equipos de On-Call en una organización centralizada**: Consolida todos los equipos de guardia en una única organización y activa búsquedas desde cualquier organización o región.

- **Evitar duplicar las configuraciones de On-Call**: En lugar de replicar las mismas estructuras de equipo en todas las organizaciones, utiliza un conjunto de configuraciones y activa búsquedas para equipos desde cualquier lugar.

- **Activar búsquedas para equipos más allá de los límites regionales o de cumplimiento**: Activa búsquedas para equipos en regiones que cumplen las normas (como US1 o AP1), manteniendo la lógica de alerta donde se origina.

## Instalación

Para habilitar las búsquedas entre organizaciones o centros de datos, debes establecer una conexión segura entre la **organización de origen** (donde se originan las alertas) y la **organización de destino** (donde se gestiona el equipo de On-Call).

1. En tu organización de destino, [crea una cuenta de servicio][1] con acceso a la API de On-Call. Asigna la cuenta de servicio a un rol que incluya los siguientes permisos:
   - `on_call_read` - Acceso de lectura a equipos y configuraciones de On-Call
   - `on_call_page` - Posibilidad de activar búsquedas para equipos de On-Call
   - `on_call_respond` - Responder a búsquedas de On-Call
   - `user_access_read` - Lectura de información del usuario (incluida automáticamente en la mayoría de los roles)

   <div class="alert alert-danger">
   Service accounts created with Terraform may be missing the <code>user_access_read</code> permission. This permission is automatically added to roles created through the UI, but it cannot be manually added through the UI and may not be included in Terraform-configured roles. If cross-org paging fails with permission errors, add an additional role to your service account that includes the <code>user_access_read</code> permission.
   </div>

2. En tu organización de destino, [crea una clave de API][2].

2. En tu organización de destino, [crea una clave de aplicación][3] para cada organización de origen que quieras incluir. Asegúrate de que cada clave de aplicación no tenga un **contexto** (no esté delimitada a ámbitos específicos).

3. En tu organización de origen, ve a tus [parámetros de On-Call][4] y selecciona [**Cross-Org Paging** (Búsquedas entre organizaciones)][5].

4. Selecciona **Add Connection** (Añadir conexión) e introduce los siguientes valores:
   - **Nombre de conexión**: El nombre de tu nueva conexión.
   - **Centro de datos**: El centro de datos de tu organización de destino.
   - **Clave de API**: La clave de API que has creado en tu organización de destino.
   - **Clave de aplicación**: La clave de aplicación que has creado en tu organización de destino para esta organización de origen.

Cuando creas esta conexión, Datadog almacena de forma segura tus credenciales y obtiene los gestores de equipos de On-Call disponibles de la organización de destino. Este proceso puede tardar hasta cinco minutos.

Una vez finalizado este proceso, los gestores de equipos de la organización de destino aparecerán en los menús para autocompletar de tu organización de origen (por ejemplo, en los monitores).

### Utilización
Una vez finalizado el proceso de configuración, puedes hacer referencia a los gestores de equipos de On-Call entre organizaciones en los flujos de trabajo de alertas automatizadas, del mismo modo que haces referencia a los gestores locales.

Por ejemplo, si tu equipo de `@oncall-core-infra` se gestiona en tu organización de destino, puedes utilizar lo siguiente en una alerta automatizada en tu organización de origen:

```
High memory usage detected on backend services. @oncall-core-infra
```

Cuando se activa una alerta, Datadog detecta que el gestor es externo, y la búsqueda se dirige a la organización de destino correcta utilizando las credenciales de la cuenta de servicio almacenada.

## Limitaciones 
- La búsqueda manual (por ejemplo, a través de la API o la interfaz de usuario web) no es compatible entre organizaciones. La búsqueda manual solo es compatible dentro de tu organización o centro de datos actual.
- Los enlaces de las notificaciones entre organizaciones (por ejemplo, las URL de monitores o incidentes apuntan a la organización de origen. Es posible que no se resuelvan correctamente en la interfaz de usuario de la organización de destino.
- La sincronización de gestores se realiza periódicamente. Los cambios en los equipos de ON-Call de la organización de destino pueden tardar en propagarse.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/service-accounts
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/personal-settings/application-keys
[4]: https://app.datadoghq.com/on-call/settings
[5]: https://app.datadoghq.com/on-call/settings/cross-org-paging
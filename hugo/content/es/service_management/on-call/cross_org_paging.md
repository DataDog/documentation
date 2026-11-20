---
further_reading:
- link: /service_management/on-call/
  tag: Documentación
  text: Datadog On-Call
private: true
title: Paginación entre organizaciones
---

<div class="alert alert-info">
La paginación entre organizaciones está en la vista previa y solo se admite para workflows (UI) / procesos (generic) automatizados (por ejemplo: alertas de monitor (noun), reglas de notificación de incident (incidente) ). La paginación manual a través de la interfaz de usuario o la API de Datadog se limita a organizaciones y centros de datos locales.
</div>

## Información general

La paginación entre organizaciones permite a los usuarios activar automáticamente alertas a equipos de guardia que residen en otras organizaciones o centros de datos de Datadog. La paginación entre organizaciones es útil cuando la configuración operativa u organizativa abarca varias organizaciones o centros de datos de Datadog y se desea centralizar la respuesta a incident (incidente) en una única organización. 

Con la paginación entre organizaciones, puedes:

- **Gestionar equipos de guardia en una organización central**: Consolida todos los equipos de guardia en una única organización y activa páginas desde cualquier organización o región.

- **Evitar duplicar las configuraciones de guardia**: En lugar de replicar las mismas estructuras de equipos de varias organizaciones, utiliza un conjunto de configuraciones y busca equipos de cualquier lugar.

- **Buscar equipos a través de todos los límites regionales o de cumplimiento**: Busca equipos en regiones que cumplen las normas (como US1 o AP1) mientras mantienes la lógica de alerta donde se origina.

## Configuración

Para activar la paginación entre organizaciones o centros de datos, debes establecer una connection (conexión) segura entre la **organización source (fuente)** (donde se originan las alertas) y la **organización de destino** (donde se gestiona el equipo de guardia).

1. En tu organización de destino, [crea una cuenta de servicio][1] con acceso a la API de guardia. Asigna la cuenta de servicio a un rol que incluya los siguientes permisos:
   - `on_call_read` - Acceso de lectura a equipos y configuraciones de guardia
   - `on_call_page` - Posibilidad de enviar páginas a equipos de guardia
   - `on_call_respond` - Responder a pages (páginas) de guardia
   - `user_access_read` - Leer información del usuario (incluido automáticamente en la mayoría de los roles)

   <div class="alert alert-danger">
   Service accounts created with Terraform may be missing the <code>user_access_read</code> permission. This permission is automatically added to roles created through the UI, but it cannot be manually added through the UI and may not be included in Terraform-configured roles. If cross-org paging fails with permission errors, add an additional role to your service account that includes the <code>user_access_read</code> permission.
   </div>

2. En tu organización de destino, [crea una clave de API][2].

2. En tu organización de destino, [crea una clave de la aplicación][3] para cada organización source (fuente) que desees permitir. Asegúrate de que cada clave de la aplicación esté **sin ámbito** (no restringida a ámbitos específicos).

3. En tu organización source (fuente), ve a [Ajustes de guardia][4] y selecciona [**Cross-Org Paging**][5] (Paginación entre organizaciones).

4. Selecciona **Add Connection** (Añadir connection (conexión)) e introduce los siguientes valores:
   - **Nombre de connection (conexión)**: Un nombre para tu nueva connection (conexión).
   - **Centro de datos**: El centro de datos de tu organización de destino.
   - **Clave de API**: La clave de API que creaste en tu organización de destino.
   - **Clave de la aplicación**: La clave de la aplicación que creaste en tu organización de destino para esta organización source (fuente).

Al crear esta connection (conexión), Datadog almacena de forma segura tus credenciales y obtiene los gestores de equipos de guardia disponibles de la organización de destino. Este proceso puede tardar hasta cinco minutos.

Una vez completado este proceso, los gestores de equipos de la organización de destino aparecerán en los menús de autocompletar de tu organización source (fuente) (por ejemplo, en monitores).

### Utilización
Una vez finalizado el proceso de configuración, puedes hacer referencia a los gestores de equipos de guardia entre organizaciones en los workflows (UI) / procesos (generic) de alertas automatizadas, del mismo modo que haces referencia a los gestores locales.

Por ejemplo, si tu equipo `@oncall-core-infra` se gestiona en tu organización de destino, puedes utilizar lo siguiente en una alerta automatizada en tu organización source (fuente):

```
High memory usage detected on backend services. @oncall-core-infra
```

Cuando se activa una alerta, Datadog detecta que el gestor es externo y la page (página) se dirige a la organización de destino correcta utilizando las credenciales de la cuenta de servicio almacenada.

## Limitaciones 
- La paginación manual (por ejemplo, a través de la API o de la interfaz de usuario web) no es compatible con todas las organizaciones. La paginación manual solo se admite en tu organización o centro de datos actual.
- Los enlaces de las notificaciones de todas las organizaciones (por ejemplo, las URL de monitor (noun) o incident (incidente) ) apuntan a la organización source (fuente). Es posible que no se resuelvan correctamente en la interfaz de usuario de la organización de destino.
- La sincronización de los gestores se realiza periódicamente; los cambios en los equipos de guardia de la organización de destino pueden tardar en propagarse.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/service-accounts
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/personal-settings/application-keys
[4]: https://app.datadoghq.com/on-call/settings
[5]: https://app.datadoghq.com/on-call/settings/cross-org-paging
---
aliases:
- /es/graphing/faq/is-there-a-way-to-share-graphs
- /es/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
- /es/graphing/dashboards/shared_graph/
- /es/dashboards/sharing/public_dashboards
description: Cree dashboards públicos, solo por invitación e integrados para acceso
  externo con marcos de tiempo y variables personalizables.
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Comparta dashboards de forma segura con cualquier persona fuera de su organización
- link: /dashboards/
  tag: Documentación
  text: Crear Dashboards en Datadog
- link: /dashboards/template_variables/
  tag: Documentación
  text: Mejore sus Dashboards con variables de plantilla
- link: /dashboards/widgets/
  tag: Documentación
  text: Descubra widgets para su Dashboard
title: Dashboards compartidos
---
## Descripción general {#overview}


Los dashboards compartidos en Datadog permiten que los usuarios externos o aquellos que prefieren no iniciar sesión puedan visualizar sus dashboards. Puede crear múltiples dashboards compartidos, cada uno con su propio conjunto de opciones de configuración.

Para compartir un dashboard, haga clic en {{< ui >}}Share{{< /ui >}} y luego en {{< ui >}}Share dashboard{{< /ui >}} en la parte superior derecha de la página del dashboard. Para ver o editar dashboards compartidos existentes, haga clic en {{< ui >}}Share{{< /ui >}} y luego en {{< ui >}}Manage shared dashboards{{< /ui >}}.

{{< img src="/dashboards/sharing/shared_dashboards/manage_modal.png" alt="Ejemplo de un modal de administración de dashboards compartidos" style="width:90%;" >}}

Todos los dashboards compartidos en la organización y sus configuraciones de acceso público se enumeran en la [página de Dashboards compartidos][2]. También puede agregar configuraciones de seguridad adicionales, como deshabilitar tipos de uso compartido específicos o establecer el Período máximo de acceso para invitaciones en la [página de Configuración de uso compartido público][3].

**Nota**: Cuando la función de dashboards compartidos está deshabilitada, los dashboards ya no son accesibles públicamente. Sin embargo, sus configuraciones siguen siendo visibles y editables. Esta función opera independientemente del estado {{< ui >}}Active{{< /ui >}} o {{< ui >}}Paused{{< /ui >}} de los dashboards individuales, incluso los dashboards compartidos {{< ui >}}Active{{< /ui >}} se vuelven inaccesibles públicamente.

Los dashboards compartidos se actualizan aproximadamente cada 60 segundos, y esta [frecuencia de actualización][1] no se puede personalizar.

Los usuarios que visualizan Dashboards compartidos ven todos los datos de telemetría mostrados en el Dashboard de acuerdo con los [permisos del creador][4]. Revise el contenido de su dashboard antes de compartirlo para asegurarse de que no se expongan datos confidenciales o sensibles.

## Estados de uso compartido {#share-states}

Los dashboards compartidos pueden estar en uno de dos estados de uso compartido:

{{< ui >}}Active{{< /ui >}}
: Al dashboard compartido se le asigna una URL específica y está disponible para los usuarios que están configurados para acceder al dashboard.

{{< ui >}}Paused{{< /ui >}}
Los usuarios no pueden acceder al Dashboard compartido, incluso si han sido invitados. Sin embargo, la URL del Dashboard compartido permanece vinculada al Dashboard y el acceso anterior se restaura si el Dashboard se restablece a {{< ui >}}Active{{< /ui >}}.

**Dejar de compartir** un Dashboard elimina su URL compartida y borra todas las configuraciones compartidas, lo que invalida todos los enlaces. Cuando vuelve a compartir el Dashboard, este no conserva la URL compartida ni la configuración anterior.

## Dashboards compartidos solo por invitación {#invite-only-shared-dashboards}

Los Dashboards solo por invitación le permiten compartir un Dashboard con direcciones de correo electrónico individuales o dominios de correo electrónico específicos.

Para compartir un Dashboard con una o más direcciones de correo electrónico:

1. Haga clic en las opciones {{< ui >}}Share{{< /ui >}} en la esquina superior derecha del Dashboard que desea compartir.
2. Seleccione {{< ui >}}Share Dashboard{{< /ui >}}.
3. Seleccione {{< ui >}}Invite only{{< /ui >}}.
4. Configure las opciones deseadas de tiempo, variables y color. Para obtener más detalles, consulte las [Opciones de configuración](#configuration-options).
5. Agregue los correos electrónicos o dominios de correo electrónico a los que desea otorgar acceso y establezca la fecha de vencimiento para cada invitación. Agregue un dominio para evitar el acceso público y limitar el acceso al Dashboard a cualquier persona con esa dirección de dominio.
6. Haga clic en {{< ui >}}Share Dashboard{{< /ui >}} para generar una URL compartida y enviar por correo electrónico un enlace de acceso a los invitados específicos. Los correos electrónicos solo se envían a direcciones de correo electrónico específicas. Para los dominios de correo electrónico, debe distribuir manualmente el enlace del Dashboard, ya que no se envía ningún correo electrónico.

**Nota**: Los correos electrónicos invitados pierden el acceso a las 12:00 a. m. hora local en la fecha de vencimiento.

De forma predeterminada, las invitaciones no caducan. Para requerir que las invitaciones caduquen después de un período de tiempo específico, un administrador de la organización puede activar el Período máximo de acceso en [Configuración de la organización > Uso compartido público][3]. Cuando esta configuración está habilitada, puede especificar el número máximo de días que una invitación permanece válida.

Para permitir invitaciones sin fecha de vencimiento, desactive el Período máximo de acceso. Si está configurando esta opción a través de la API, establezca el valor en `null`. En la interfaz de usuario, establecer el Período máximo de acceso en `0` desactiva la configuración y establece el valor en `null`.

**Nota**: El Período máximo de acceso se aplica mediante una marca de tiempo exacta. Por ejemplo, con un Período máximo de acceso de un día, una invitación creada el 1 de enero a las 11:00 a. m. debe vencer el 2 de enero a las 11:00 a. m.

### Acceder a un Dashboard compartido solo por invitación {#access-an-invite-only-shared-dashboard}

A los invitados a los Dashboards compartidos se les envía un correo electrónico con un enlace de acceso de tiempo limitado. Los destinatarios del correo electrónico deben hacer clic en el enlace dentro de 1 hora para obtener acceso al Dashboard compartido.

{{< img src="/dashboards/sharing/shared_dashboards/invite_only_dashboard_link.png" alt="Ejemplo de una invitación por correo electrónico con un enlace de acceso a un Dashboard privado" style="width:90%;" >}}

Después de hacer clic en el enlace, los invitados pueden acceder al Dashboard compartido en la misma computadora y navegador durante 30 días antes de necesitar renovar el acceso. Puede seguir renovando el acceso siempre que siga siendo un destinatario válido y el Dashboard esté en un estado activo.

#### Obtener un nuevo enlace de acceso {#get-a-new-access-link}

Los destinatarios válidos pueden solicitar un nuevo enlace de acceso en cualquier momento sin necesidad de aprobación por parte de quien comparte. Si visita el Dashboard compartido sin acceso activo, se le solicitará que ingrese su dirección de correo electrónico para recibir el nuevo enlace de acceso. Solo los destinatarios válidos pueden recibir este correo electrónico.

### Revocar el acceso a un Dashboard compartido solo por invitación {#revoke-access-to-an-invite-only-shared-dashboard}

Para revocar el acceso a un Dashboard compartido, elimine las direcciones de correo electrónico deseadas de la lista y guarde los cambios. Estos destinatarios eliminados ya no tienen acceso ni la capacidad de solicitar un nuevo enlace de acceso.

**Nota**: El usuario que comparte un Dashboard solo por invitación sigue siendo un destinatario válido y no puede ser eliminado.

## Dashboards compartidos públicos {#public-shared-dashboards}

Los Dashboards públicos permiten a los usuarios poner un Dashboard compartido a disposición de cualquier persona en Internet que tenga el enlace.

Para compartir un Dashboard público:

1. Haga clic en las opciones {{< ui >}}Share{{< /ui >}} en la esquina superior derecha del Dashboard que desea compartir.
2. Seleccione {{< ui >}}Share Dashboard{{< /ui >}}.
3. Seleccione la opción {{< ui >}}Public{{< /ui >}} en el paso {{< ui >}}Select a Share Type{{< /ui >}} y confirme que comprende que el Dashboard será accesible para cualquier persona con el enlace.
4. Configure las opciones deseadas de tiempo, variable y color en el paso {{< ui >}}Configure Dashboard{{< /ui >}}.
5. Haga clic en {{< ui >}}Share Dashboard{{< /ui >}} para crear la URL compartida.

De forma predeterminada, los paneles públicos son accesibles durante un año antes de que caduquen y cambien a un estado {{< ui >}}Paused{{< /ui >}}. Puede desactivar o ajustar la fecha de vencimiento en el paso {{< ui >}}Select a Share Type{{< /ui >}}.

## Dashboards compartidos integrados {#embedded-shared-dashboards}

Puede integrar Dashboards compartidos en un sitio web mediante un iFrame. Existen dos tipos de Dashboards integrados: básicos y seguros.

### Integración básica {#basic-embed}

Los Dashboards integrados básicos restringen el acceso según los referentes de solicitud incluidos en la lista de permitidos. Esta función no es compatible con los navegadores web Safari.

El encabezado de referente de la solicitud HTTP se verifica con las entradas de la lista de permitidos para su validación. En la mayoría de los casos, escribir `window.location.origin` en la consola de su navegador le proporciona el referente esperado. Sin embargo, si tiene alguna manipulación especial en los encabezados del navegador (por ejemplo, configuraciones de privacidad del navegador), verifique la solicitud de red real.

Para compartir un Dashboard integrado básico:

1. Haga clic en {{< ui >}}Share{{< /ui >}} en la esquina superior derecha del Dashboard.
2. Seleccione {{< ui >}}Share Dashboard{{< /ui >}}.
3. Seleccione la opción {{< ui >}}Embed{{< /ui >}} en el paso {{< ui >}}Select a Share Type{{< /ui >}}.
4. Configure las opciones de tiempo, variable y color deseadas en el paso {{< ui >}}Configure Dashboard{{< /ui >}}.
5. Agregue los referrers que desea incluir en la lista de permitidos.
6. Haga clic en {{< ui >}}Share Dashboard{{< /ui >}} para crear la URL compartida.

### Embed seguro {#secure-embed}

Los Dashboards embebidos seguros utilizan un token generado por el backend para autenticar cada carga de página en lugar de depender de listas de permitidos de referrers. Su servidor de aplicaciones contiene la credencial y genera una URL de iFrame única por sesión, por lo que la credencial nunca se expone al navegador. Los embeds seguros funcionan en navegadores que bloquean cookies de terceros, incluido Safari.

Para obtener instrucciones de configuración, consulte [Secure Embedded Dashboards][6].

## Opciones de configuración {#configuration-options}

{{< img src="/dashboards/sharing/shared_dashboards/configure_shared_dashboard.png" alt="Sección de configuración para compartir un Dashboard que muestra un marco de tiempo predeterminado de la última hora, permitiendo a los espectadores cambiar el marco de tiempo, y un tema claro predeterminado" style="width:90%;" >}}

En el paso {{< ui >}}Configure Dashboard{{< /ui >}}, realice cambios en el Dashboard compartido.

**Nota**: Los cambios de configuración en los Dashboards compartidos pueden tardar hasta 5 minutos en propagarse a todos los espectadores. Si los cambios no aparecen de inmediato, espere unos minutos y actualice el Dashboard.

{{< ui >}}Published Name{{< /ui >}}
: El nombre publicado reemplazará el título del Dashboard en el Dashboard compartido. Este nombre es también el nombre bajo el cual aparece el Dashboard compartido en la página de lista de Dashboards compartidos.

{{< ui >}}Default Timeframe{{< /ui >}}
: Esto establece el marco de tiempo predeterminado para los espectadores del Dashboard compartido. Si "Permitir que los espectadores cambien el marco de tiempo" está desactivado, este es el único marco de tiempo disponible. Activarlo proporciona a los espectadores un conjunto fijo de opciones de marco de tiempo para elegir, aunque no se admiten marcos de tiempo personalizados ni el desplazamiento por el marco de tiempo.

{{< ui >}}Variables{{< /ui >}}
: Esta configuración permite a los usuarios especificar qué variables de plantilla en el Dashboard están disponibles para los espectadores. Establecer el mismo valor predeterminado y disponible para una variable de plantilla hace que sea inalterable por los espectadores. <br>**Nota**: Esto se aplica incluso si los valores se establecen en un Wildcard (\*). <br><br>De forma predeterminada, el Dashboard compartido hereda los valores seleccionados y disponibles utilizados actualmente por quien comparte.

{{< ui >}}Default Theme{{< /ui >}}
: Esta configuración permite a los usuarios elegir si el Dashboard compartido se muestra en modo claro u oscuro de forma predeterminada. Los espectadores pueden anular esta opción en cualquier momento.

## Restricciones en Dashboards compartidos {#restrictions-on-shared-dashboards}

### Los Dashboards no pueden ser compartidos por usuarios desactivados {#dashboards-cannot-be-shared-by-deactivated-users}

Los Dashboards compartidos deben ser compartidos por un usuario activo dentro de su organización. Si el usuario que comparte es desactivado, el Dashboard compartido **ya no muestra datos** hasta que un usuario activo reclame su propiedad. La URL del Dashboard compartido y las opciones de configuración se conservan durante este estado.

### No todos los tipos de widgets están disponibles {#not-all-widget-types-are-available}

Los Dashboards compartidos admiten los tipos de widgets en la siguiente tabla. Los widgets de cualquier otro tipo no muestran datos cuando el Dashboard se comparte.

| Categoría | Widgets admitidos |
| -------- | ----------------- |
| Series temporales y distribuciones | series temporales, Gráfico de barras, Distribución, Mapa de calor, Gráfico de dispersión, Sankey |
| Valores únicos y resúmenes | Valor de consulta, Cambio, Lista principal, Valor de alerta, Gráfico de alerta, Resumen de servicios |
| Tablas y jerarquías | Tabla, Treemap, Gráfico circular, Embudo, Retención |
| Mapas | Geomap, mapa de servidores |
| Monitors y SLOs | Monitor Summary, Check Status, SLO, SLO List |
| Texto y medios | Notas y enlaces, Texto libre, Imagen, Iframe |
| Otro | Línea de tiempo de eventos, Wildcard |

Compartir un Dashboard que contiene un widget no compatible no produce un error, y la API de Dashboards no rechaza estos widgets. El widget aparece en el Dashboard compartido sin datos.

### Opciones de marco de tiempo limitadas {#limited-timeframe-options}

Los Dashboards compartidos admiten un número limitado de opciones de marco de tiempo y no permiten el desplazamiento por el marco de tiempo ni marcos de tiempo personalizados.

### Restricciones de dirección IP {#ip-address-restrictions}

Puede restringir el acceso a los Dashboards compartidos según la dirección IP. Envíe un correo electrónico a [Datadog support][5] para habilitar la lista de permitidos de direcciones IP. Una vez habilitado, los administradores pueden gestionar las restricciones de IP en la [página de Configuración de uso compartido público][3].

## Editar Dashboards compartidos {#edit-shared-dashboards}

<div class="alert alert-danger">Cualquier cambio en el contenido o diseño de un Dashboard se refleja instantáneamente en la versión compartida. Tenga cuidado al editar para evitar compartir datos privados involuntariamente.</div>

Para realizar un cambio en el tipo de uso compartido, la configuración o los destinatarios de un Dashboard compartido:

1. Haga clic en las opciones {{< ui >}}Share{{< /ui >}} en la esquina superior derecha del Dashboard.
2. Seleccione {{< ui >}}Edit shared dashboard{{< /ui >}}.
3. Ajuste la configuración deseada.
4. Haga clic en {{< ui >}}Save{{< /ui >}} para que los cambios surtan efecto.

Puede pausar temporalmente o volver a habilitar el acceso a un Dashboard compartido desde este menú.

## Ver todos los Dashboards compartidos {#view-all-shared-dashboards}

Visualice todos los Dashboards compartidos en su organización y su configuración en la página [Shared Dashboards][2]. Desde esta página, puede consultar, filtrar y ordenar los Dashboards por tipo de uso compartido, último acceso, quién lo compartió y más. También puede buscar y reclamar cualquier Dashboard compartido sin propietario.

{{< img src="/dashboards/sharing/shared_dashboards/shared_search.png" alt="Ejemplo de la lista de Dashboards compartidos" style="width:90%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/#refresh-rate
[2]: https://app.datadoghq.com/dashboard/shared
[3]: https://app.datadoghq.com/organization-settings/public-sharing
[4]: /es/account_management/rbac/data_access/#dashboards-and-notebooks
[5]: /es/help/
[6]: /es/dashboards/sharing/secure_embedded_dashboards/
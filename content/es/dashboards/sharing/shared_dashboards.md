---
aliases:
- /es/graphing/faq/is-there-a-way-to-share-graphs
- /es/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
- /es/graphing/dashboards/shared_graph/
- /es/dashboards/sharing/public_dashboards
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Comparte dashboards de forma segura con cualquier persona que no pertenezca
    a tu organización
- link: /dashboards/
  tag: Documentación
  text: Crear dashboards en Datadog
- link: /dashboards/template_variables/
  tag: Documentación
  text: Mejora tus dashboards con variables de plantilla
- link: /dashboards/widgets/
  tag: Documentación
  text: Descubre widgets para tus dashboards
title: Dashboards compartidos
---

## Información general


Los dashboards compartidos permiten acceder a ellos a espectadores externos o a usuarios que prefieren no loguear en Datadog. Puedes gestionar el acceso mediante el uso de diferentes tipos de uso compartido, cada uno con opciones específicas de configuración.

Los dashboards compartidos se actualizan aproximadamente cada 60 segundos y esta [frecuencia de actualización][1] no se puede personalizar.

## Compartir estados

Los dashboards compartidos pueden estar en uno de los dos estados de uso compartido:

**Activo**
: El dashboard compartido tiene asignada una URL específica y está disponible para los espectadores que estén configurados para acceder al dashboard.

**Pausado**
: Los espectadores no pueden acceder al dashboard compartido, aunque hayan sido invitados. Sin embargo, el dashboard compartido permanece vinculado al dashboard y el acceso anterior se restablece si el dashboard se restablece a **Activo**.

**Al dejar de compartir** un dashboard, se elimina su URL compartida y se borran todos los parámetros de configuración compartidos, lo que invalida todos los enlaces. Cuando vuelves a compartir el dashboard, no conserva la URL compartida anterior ni la configuración.

## Dashboards compartidos sólo por invitación

Los dashboards sólo por invitación te permiten compartir un dashboard con direcciones de correo electrónico individuales o dominios de correo electrónico específicos.

Para compartir un dashboard con una o varias direcciones de correo electrónico:

1. Haz clic en las opciones **Compartir** en la esquina superior derecha del dashboard que desees compartir.
2. Selecciona **Compartir dashboard.**
3. Selecciona **Sólo invitados**.
4. Configura las opciones deseadas de tiempo, variable y color. Para más detalles, consulta [Opciones de configuración](#configuration-options).
5. Añade los correos electrónicos o dominios de correo electrónico a los que desees conceder acceso y establece la fecha de caducidad de cada invitación. Añade un dominio para impedir el acceso público y limitar el acceso al dashboard a cualquier persona con esa dirección de dominio.
6. Haz clic en **Compartir dashboard** para generar una URL compartida y enviar por correo electrónico un enlace de acceso a invitados específicos. Los correos electrónicos sólo se envían a direcciones de correo electrónico específicas. Para los dominios de correo electrónico, es necesario distribuir manualmente el enlace del dashboard, ya que no se envía ningún mensaje correo electrónico.

**Nota**: Los correos electrónicos invitados pierden el acceso a las 12:00 a.m. hora local en la fecha de caducidad.

### Acceder a un dashboard compartido sólo por invitación

Los invitados a compartir dashboards reciben un correo electrónico con un enlace de acceso de tiempo limitado. Los destinatarios del correo electrónico deben hacer clic en el enlace en el plazo de una hora para acceder al dashboard compartido.

{{< img src="/dashboards/sharing/shared_dashboards/invite_only_dashboard_link.png" alt="Ejemplo de una invitación por correo electrónico con un enlace de acceso al dashboard privado" style="width:90%;" >}}

Tras hacer clic en el enlace, los invitados podrán acceder al dashboard compartido en el mismo ordenador y navegador durante 30 días antes de tener que renovar el acceso. Podrás seguir renovando el acceso mientras sigas siendo un destinatario válido y el dashboard esté en estado activo.

#### Obtener un nuevo enlace de acceso

Los destinatarios válidos pueden solicitar un nuevo enlace de acceso en cualquier momento sin necesidad de la aprobación del que comparte. Si visitas el dashboard compartido sin acceso activo, se te solicitará que introduzcas tu dirección de correo electrónico para recibir el nuevo enlace de acceso. Sólo los destinatarios válidos pueden recibir este correo electrónico.

### Revocar el acceso a un dashboard compartido sólo por invitación

Para revocar el acceso a un dashboard compartido, elimina las direcciones de correo electrónico deseadas de la lista de destinatarios y guarda los cambios. Estos destinatarios eliminados ya no tendrán acceso ni la posibilidad de solicitar un nuevo enlace de acceso.

**Nota**: El usuario que comparte un dashboard sólo por invitación sigue siendo un destinatario válido y no lo puede eliminar.

## Dashboards compartidos públicos

Los dashboards públicos permiten a los usuarios poner un dashboard compartido a disposición de cualquier usuario de internet que disponga del enlace.

Para compartir un dashboard público:

1. Haz clic en las opciones **Compartir** de la esquina superior derecha del dashboard que desees compartir.
2. Selecciona **Compartir dashboard**.
3. Selecciona la opción **Público** en el paso **Selecciona un tipo de uso compartido** y reconoce que comprendes que el dashboard será accesible para cualquier persona que tenga el enlace.
4. Configura las opciones deseadas de tiempo, variable y color en el paso **Configurar dashboard**.
5. Haz clic en **Compartir dashboard** para crear la URL compartida.

En forma predeterminada, los dashboards públicos son accesibles durante un año antes de que caduquen y pasen a un estado **Pausado**. Puedes desactivar o ajustar la fecha de caducidad en el paso **Seleccionar un tipo de uso compartido**.

## Dashboards compartidos insertados

Puedes insertar dashboards compartidos en un sitio web utilizando un iframe. El acceso a estos dashboards insertados está restringido a los remitentes de solicitudes permitidos.

El encabezado de referencia de la solicitud HTTP se check contra las entradas de la lista permitida para la validación. En la mayoría de los casos, escribir `window.location.origin` en la consola de tu navegador debería darte el remitente esperado. Sin embargo, si tienes alguna manipulación especial en los encabezados del navegador (por ejemplo, la configuración de privacidad del navegador) debes check la solicitud real de red. 

Para compartir un dashboard insertado:

1. Haz clic en **Compartir** en la esquina superior derecha del dashboard.
2. Selecciona **Compartir dashboard**.
3. Selecciona la opción **insertar** en el paso **Seleccionar un tipo de uso compartido**.
4. Configura las opciones deseadas de tiempo, variable y color en el paso **Configurar dashboard **.
5. Añade los remitentes que deseas incluir en la lista.
6. Haz clic en **Compartir dashboard** para crear la URL compartida.

## Opciones de configuración

{{< img src="/dashboards/sharing/shared_dashboards/configure_shared_dashboard.png" alt="Sección de configuración para compartir un dashboard en el cual se muestra un período de tiempo de más de una hora, que permite que los espectadores cambien el período de tiempo y un tema claro predeterminado" style="width:90%;" >}}

En el paso **Configurar dashboard**, realiza cambios en el dashboard compartido.

**Nota**: Los cambios de configuración en dashboards compartidos pueden tardar hasta 5 minutos en propagarse a todos los espectadores. Si los cambios no aparecen de inmediato, espera unos minutos y actualiza el dashboard.

**Nombre publicado**
: El nombre publicado sustituirá al título del dashboard en el dashboard compartido. Este nombre es también el nombre con el que aparece el dashboard compartido en la página de la lista de dashboards compartidos.

**Período de tiempo predeterminado**
: Establece el período de tiempo predeterminado para los espectadores del dashboard compartido. Si la opción "Permitir a los espectadores cambiar el período de tiempo" está desactivada, este será el único período de tiempo disponible. Si la opción está activada, los espectadores dispondrán de un conjunto fijo de períodos de tiempo entre los cuales elegir, aunque no se admiten períodos de tiempo personalizados ni la depuración de períodos de tiempo.

**Variables**
: Este parámetro permite a los usuarios especificar qué variables de plantilla del dashboard están disponibles para los espectadores. Configurar el mismo valor predeterminado y disponible para una variable de plantilla hace que no pueda ser modificada por los espectadores. <br>**Nota**: Esto se aplica incluso si los valores se configuran con un comodín (\*). <br><br>En forma predeterminada, el dashboard compartido hereda los valores seleccionados y disponibles utilizados actualmente por quien comparte.

**Tema predeterminado
: Este parámetro permite a los usuarios elegir si el dashboard compartido se muestra en modo claro u oscuro predeterminado. Los espectadores pueden sustituir esta opción en cualquier momento.

## Restricciones en dashboards compartidos

### Los usuarios desactivados no pueden compartir dashboards

Un usuario activo de tu organización debe compartir los dashboards compartidos. Si se desactiva al usuario que lo compartió, el dashboard compartido **deja de mostrar datos** hasta que un usuario activo reclame su propiedad. Las opciones de URL de dashboard compartido y de configuración se conservan durante este estado.

### No todos los tipos de widget están disponibles

Los siguientes tipos de widget no son compatibles con dashboards compartidos. Los widgets de estos tipos en  dashboards compartidos no muestran datos.

* Mapa topológico
* Lista de widgets (todas las fuentes de datos)
* Widget de rectángulos de legacy

### Opciones temporales limitadas

Los dashboards compartidos admiten un número limitado de opciones de períodos de tiempo y no permiten la depuración de períodos de tiempo ni plazos personalizados.

## Editar dashboards compartidos

<div class="alert alert-danger">Cualquier cambio en el contenido o el diseño de un dashboard se refleja instantáneamente en la versión compartida Ten cuidado al editar para evitar compartir involuntariamente datos privados.</div>

Para realizar un cambio en el tipo de uso compartido, en la configuración o en los destinatarios de un dashboard compartido:

1. Haz clic en las opciones **Compartir** de la esquina superior derecha del dashboard.
2. Selecciona **Editar dashboard compartido**.
3. Ajusta la configuración deseada.
4. Haz clic en **Guardar** para que los cambios surtan efecto.

Puedes pausar temporalmente o volver a activar el acceso a un dashboard compartido desde este menú.

## Ver todos los dashboards compartidos

Ver todos los dashboards compartidos en tu organización y tu configuración en los [Dashboards compartidos][2]. Desde esta página, puedes filtrar dashboards por estado y tipo de uso compartido, ver y reclamar cualquier dashboard que no poseas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/#refresh-rate
[2]: https://app.datadoghq.com/dashboard/shared
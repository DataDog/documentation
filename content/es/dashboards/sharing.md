---
aliases:
- /es/graphing/faq/is-there-a-way-to-share-graphs
- /es/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
- /es/graphing/dashboards/shared_graph/
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
  text: Descubre widgets de tu dashboard
kind: documentación
title: Compartir dashboards
---

## Información general

Las visualizaciones compartidas te permiten mostrar visualizaciones de métricas, trazas y logs fuera de Datadog. Puedes compartir [dashboards](#dashboards) completos, así como [gráficos](#graphs) individuales.

## Dashboards

Cuando compartes un dashboard a través de una URL o un enlace de correo electrónico, la página compartida muestra contenidos de sólo lectura en directo de ese dashboard. Cuando generas una URL, se activa la opción de *compartir* y el dashboard se convierte en un dashboard público.

### Compartir un dashboard a través de una URL pública

Para compartir públicamente un dashboard completo, tienes que generar una URL:

1. En la página de dashboards, haz clic en **Share** (Compartir), en la parte superior derecha.
2. Selecciona **Generate public URL* (Generar URL pública), para abrir un modal emergente *Sharing: On* (Compartir: Activado).
3. En **Time & Variable Settings** (Configuración de hora y variables), configura las opciones que quieres para la franja horaria y si los usuarios pueden cambiarla, así como qué etiquetas (tags) son visibles para las variables de plantilla seleccionables. **Nota**: Al menos un widget debe estar configurado para utilizar [`Global Time`][1].
4. Copia la URL y haz clic en **Done** (Listo).

**Nota**: Los widgets basados en consultas de trazas de APM no muestran datos en los dashboards públicos. El widget de flujos de logs tampoco muestra datos, pero otras consultas basadas en logs sí lo hacen.

### Compartir un dashboard con direcciones de correo electrónico individuales

Para autorizar a una o varias direcciones de correo electrónico específicas para ver una página del dashboard, sigue los siguientes pasos:

1. En la página del dashboard, haz clic en **Share** (Compartir), en la parte superior derecha.
2. Selecciona **Configure public URL** (Configurar public URL), para abrir un modal emergente *Sharing: On* (Compartir: Activado).
3. Selecciona **Only specified people** (Solo personas especificadas), para indicar quién puede acceder a este dashboard.
4. Introduce las direcciones de correo electrónico de las personas con las que deseas compartir tu dashboard.
5. En **Time & Variable Settings** (Configuración de hora y variables), configura las opciones que quieras para la franja horaria y si los usuarios pueden cambiarla, así como qué etiquetas son visibles para las variables de plantilla seleccionables. **Nota**: Al menos un widget debe estar configurado para utilizar [`Global Time`][1].
6. (Opcional) Copia la URL para compartirla; las direcciones de correo electrónico especificadas también reciben un mensaje con el enlace.
7. Haz clic en **Done** (Listo).

**Nota**:
- Las personas que se añaden a la lista de personas autorizadas para acceder a un dashboard reciben un enlace por correo electrónico. Si no hacen clic en el enlace en el plazo de una hora, pueden solicitar un nuevo enlace en la página de inicio del dashboard. Si su dirección de correo electrónico está en la lista de personas autorizadas, se les envía un nuevo correo electrónico.
- Una vez que se hace clic en el enlace, el dispositivo queda autorizado para ver el dashboard durante un máximo de 30 días. Una vez transcurrido ese plazo, el usuario puede solicitar un nuevo enlace en la página de inicio del dashboard. Si su dirección de correo electrónico está en la *lista de personas autorizadas*, se le enviará un nuevo mensaje.
- Si se elimina un usuario de la lista de personas autorizadas, se elimina su acceso.
- Los widgets basados en consultas de trazas de APM no muestran datos en los dashboards compartidos. El widget de flujos de logs tampoco muestra datos, pero otras consultas basadas en logs sí lo hacen.

### Revocar

Para revocar el acceso a un dashboard compartido:

1. Ve a la [lista de dashboards][2].
2. Selecciona el dashboard al que quieres revocar el acceso.
3. Haz clic en **Share** (Compartir), en la parte superior derecha.
4. Haz clic en **Configure public URL** (Configurar una URL pública).
5. Haz clic en **Revoke URL** (Revocar URL).

### Actualizar un intervalo

Los dashboards compartidos públicamente se actualizan cada 30 segundos. Este intervalo de actualización no se puede personalizar.

## Gráficos

### Compartir

Para compartir un gráfico desde un [tablero temporal][3] o una [pantalla][4]:

2. En el gráfico que quieras compartir, haz clic en el icono del lápiz de la esquina superior derecha.
3. En la sección *Graph your data* (Representa gráficamente tus datos), selecciona la pestaña **Share** (Compartir).
4. Elige un periodo de tiempo para tu gráfico.
5. Elige el tamaño del gráfico.
6. Selecciona si deseas incluir la leyenda o no.
7. Obtén el código de integración haciendo clic en el botón **Generate embed code** (Generar código de integración).

{{< img src="dashboards/sharing/graph_share_tab.png" alt="Pestaña Share (Compartir) en un editor de gráficos" style="width:95%;">}}

### Revocar

Para revocar las claves utilizadas para compartir gráficos individuales (integrados):

1. Ve a [**Organization Settings -> Public Sharing -> Shared Graphs** (Parámetros de organización -> Compartir públicamente -> Gráficos compartidos**][5], para ver una lista de todos los gráficos compartidas.
2. Haz clic en el botón **Revoke** (Revocar), junto al gráfico que quieres dejar de compartir.
3. El gráfico pasará a la lista de **Revoked** (Revocados).

### Aplicar restricciones

Puedes restringir el acceso a tu dashboard seleccionando direcciones IP. Envía un correo electrónico al [servicio de asistencia de Datadog][6] para activar la función de listado de direcciones IP incluidas que permite a los administradores proporcionar una lista de direcciones IP que tienen acceso a dashboards compartidos. Una vez activada, gestiona tus restricciones en la página [Compartir públicamente][7] de tu organización.

### Modo oscuro

El modo oscuro está disponible en los dashboards públicos para usuarios individuales. Haz clic en el icono del sol o la luna en la parte superior derecha para cambiar los modos. Además, el parámetro URL `theme` está disponible. Los valores posibles son `dark` y `light`.

### Modo TV

El modo TV está disponible en dashboards públicos. Utiliza el atajo de teclado `F` o haz clic en **Configure** (Configurar), en la parte superior derecha, y selecciona **TV mode** (Modo TV).

## API

Datadog tiene una [API exclusiva][8] que te permite interactuar con tus gráficos compartidos (integrados):

| Endpoint                 | Descripción                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Obtener todos los integrados][9]     | Obtén una lista de gráficos integrables creados previamente.                     |
| [Crear integrado][10]       | Crea un nuevo gráfico integrable.                                         |
| [Obtener un integrado específico][11] | Obtén el fragmento HTML de un integrado generado previamente con `embed_id`. |
| [Activar integrado][12]       | Activa el integrado especificado.                                             |
| [Revocar integrado][13]       | Revoca el integrado especificado.                                             |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/widgets/#global-time-selector
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /es/dashboards/#timeboards
[4]: /es/dashboards/#screenboards
[5]: https://app.datadoghq.com/organization-settings/public-sharing/shared-graphs
[6]: /es/help/
[7]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[8]: /es/api/latest/embeddable-graphs/
[9]: /es/api/latest/embeddable-graphs/#get-all-embeds
[10]: /es/api/latest/embeddable-graphs/#create-embed
[11]: /es/api/latest/embeddable-graphs/#get-specific-embed
[12]: /es/api/latest/embeddable-graphs/#enable-embed
[13]: /es/api/latest/embeddable-graphs/#revoke-embed
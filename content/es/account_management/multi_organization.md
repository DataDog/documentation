---
aliases:
- /es/guides/multiaccountorg
- /es/account_management/mult_account
- /es/account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
- /es/account_management/multi_organisations
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configurar SAML para tu cuenta de Datadog
- link: /account_management/billing/usage_details
  tag: Documentación
  text: Consultar los detalles de uso
- link: /account_management/billing/usage_attribution
  tag: Documentación
  text: Configurar la asignación de uso
- link: /account_management/org_settings/cross_org_visibility
  tag: Documentación
  text: Visibilidad entre organizaciones
title: Gestión de cuentas de varias organizaciones
---

## Información general

Es posible gestionar varias organizaciones secundarias desde la cuenta de una organización principal. Esta opción la suelen utilizar los proveedores de servicios que tienen clientes que no deben tener acceso a los datos de los demás. 

La función de cuentas de varias organizaciones no está activada de forma predeterminada. Ponte en contacto con el [servicio de asistencia de Datadog][1] para activarla.

## Funcionalidades

Se pueden añadir usuarios a la organización principal y a varias organizaciones secundarias. Los usuarios pueden cambiar de organización desde el [menú de configuración de la cuenta de usuario][2]. 

Las organizaciones que están dentro de una organización principal no tienen acceso a los datos de las demás. Para habilitar las consultas de métricas entre organizaciones, consulta la [visibilidad entre organizaciones][3].

La organización principal puede visualizar el uso de cada una de las organizaciones secundarias, lo que le permite realizar un seguimiento de las tendencias de uso.

La configuración de cuentas, como las direcciones IP incluidas en la lista de permitidas, no se heredan de la organización principal a las secundarias.

## Organizaciones secundarias

### Crear

1. Una vez activada la función, consulta la [página de la nueva organización][4].
2. Introduce el nombre de la organización secundaria que quieres crear. **Este nombre no puede tener más de 32 caracteres.**
3. También tienes la opción de invitar a usuarios administradores a tu organización secundaria:
    - Introduce una o varias direcciones de correo electrónico.
    - A los usuarios invitados se les asigna el [rol de administrador de Datadog][5]. Puedes invitar a más usuarios en
Parámetros de organización una vez creada la organización.
    - Si el usuario no tiene contraseña, Datadog envía una invitación por correo electrónico con un enlace para establecer una contraseña y unirse a la nueva organización secundaria.
4. Haz clic en **Create** (Crear).

La nueva organización secundaria hereda el plan de la organización principal y se añade a la cuenta de facturación de esta. Si quieres actualizar la cuenta de facturación de la organización secundaria, [ponte en contacto con tu representante de ventas][6].

### Contenido

La incorporación de una nueva suborganización con un conjunto de dashboards y monitores de referencia puede realizarse mediante programación con la [API de Datadog][7] y herramientas como Terraform. Para ello, consulta [Gestión de Datadog con Terraform][8]. Además, se pueden utilizar scripts para realizar copias de seguridad de dashboards y [monitores][9] existentes en forma de código.

### Subdominios personalizados

La función de subdominios personalizados no está activada de forma predeterminada. Ponte en contacto con [el servicio de asistencia de Datadog][1] para activarla.

Si eres miembro de varias organizaciones, los subdominios personalizados te ayudarán a identificar el origen de una alerta o notificación. Además, pueden permitirte cambiar inmediatamente a la organización asociada a ese subdominio.

Por ejemplo, la URL `https://app.datadoghq.com/event/event?id=1` está asociada con un evento de la Organización A. Si un usuario es miembro tanto de la Organización A como de la Organización B, pero está visualizando Datadog dentro del contexto de la Organización B, esta URL devuelve un `404 Not Found error`. El usuario debe cambiar a la Organización A, utilizando el [menú de configuración de la cuenta de usuario][2], y luego volver a ingresar en la URL. Sin embargo, con subdominios personalizados, el usuario podría navegar hasta `https://org-a.datadoghq.com/event/event?id=1`, lo cual cambiaría automáticamente el contexto del usuario a la Organización A y mostraría la página correcta.

**Nota**: Si tienes un subdominio de Datadog personalizado, edita manualmente los enlaces de la documentación de Datadog con tu nombre de subdominio. Por ejemplo, un enlace que redirija a `https://**app**.datadoghq.com/account/settings` pasará a ser `https://**<custom_sub-domain_name>**.datadoghq.com/account/settings`.

## Configurar SAML

La configuración de SAML setup _no_ se hereda de la organización principal a las organizaciones secundarias. Por tanto, es necesario configurar SAML para cada organización secundaria individualmente.

Para configurar SALM para varias organizaciones:

1. Crea una nueva organización.
2. Invita a usuarios de SAML.
3. Inicia sesión como usuario SAML y [configura SAML][10].

### Organizaciones principales estrictas de SAML

En algunas circunstancias, podría ser que no puedas acceder a una organización secundaria recién creada. Cuando una organización requiere que los usuarios inicien sesión utilizando SAML, es posible que sus cuentas de usuario no tengan contraseña. Como las organizaciones secundarias no heredan la configuración de SAML de su organización principal, al iniciar sesión en la organización secundaria se requiere una contraseña que no existe.

Para asegurarte de poder iniciar sesión en una organización secundaria creada a partir de una organización principal estricta de SAML, sigue estos pasos en la organización principal:
1. Haz clic en **Organization Settings** (Parámetros de organización) en el menú de cuentas que encontrarás en la parte inferior del área de navegación, o selecciona  **Organization Settings** (Parámetros de organización) en el menú desplegable del encabezado que hay en la parte superior de la página Personal Settings (Parámetros personales).
2. En el menú de página izquierdo, selecciona **Users** (Usuarios).
3. Selecciona tu perfil de usuario.
4. Activa la opción **Override Default Login Methods** (Anular métodos de inicio de sesión predeterminados).
5. En **Select user's login methods** (Seleccionar métodos de inicio de sesión de usuario), marca la casilla **Password** (Contraseña).
6. Asegúrate de que tu cuenta tiene una contraseña. Si necesitas ayuda para establecer una contraseña, ponte en contacto con [el servicio de asistencia de Datadog][1].

Al seguir los pasos arriba indicados, podrás iniciar sesión en la cuenta principal utilizando una combinación de correo electrónico y contraseña. Una vez creada tu organización secundaria, también puedes iniciar sesión en ella con tu correo electrónico y tu contraseña.

Si ya has creado la organización secundaria y no puedes continuar, podrás iniciar sesión si sigues el procedimiento.

## Uso con varias organizaciones

La organización principal puede ver el uso total y facturable de todas sus organizaciones (organizaciones secundarias y principal) al pasar sobre su nombre de usuario en la esquina inferior izquierda e ir a **Plan & Usage** (Plan y uso) > **Usage** (Uso).

La página Usage (Uso) muestra el uso agregado de la organización principal y todas sus organizaciones secundarias. Tiene dos pestañas:

* Overall (General)
* Individual Organizations (Organizaciones individuales)

### Uso general

Esta pestaña contiene la sección Month-to-Date Total Usage (Uso total del último mes) y la sección Overall Usage (Uso general).

En la sección Month-to-Date Total Usage (Uso total del último mes) se resume tu uso del último mes de hosts, contenedores, métricas personalizadas y cualquier otra parte de la plataforma que hayas usado durante ese mes, tanto en tu organización principal como en todas sus organizaciones secundarias.

{{< img src="account_management/multi-org-v2.png" alt="Uso del último mes >}}

De forma predeterminada, la mayoría de las cuentas pueden ver el uso "Billable" (Facturable), que muestra el uso que computa para tu factura final. En esta vista también se desglosa el uso bajo demanda por encima de tus confirmaciones y asignaciones. La vista "All" (Todo) muestra todo el uso, incluido el uso no facturable, como las pruebas de productos.

La sección Overall Usage (Uso general) muestra el uso agregado mensual de todas las organizaciones en los últimos 6 meses. El uso que aquí se muestra es el uso "All" (Todo), no el uso "Billable" (Facturable), lo que significa que no aplica ajustes para periodos de prueba u otros cambios de facturación utilizados para calcular tu factura final. Esta información se puede descargar como un archivo CSV.

{{< img src="account_management/multi-org-v2-trends.png" alt="Tendencias a largo plazo de uso general" >}}

Es posible filtrar las secciones Month-to-Date Total Usage (Uso total del último mes) y Overall Usage (Uso general) haciendo clic en subpestañas específicas de productos. En la subpestaña "Log Management" (Gestión de logs), puedes ver el uso de logs por tabla de índice, que muestra tu uso del último mes y tu uso de logs indexados del último mes por:

* Nombre de índice
* Organización
* Periodo de retención en días
* Número de logs indexados desglosado en logs activos y rehidratados
* El porcentaje de contribución del índice al uso total de logs indexados

Estos datos se pueden guardar como un archivo CSV.

{{< img src="account_management/multi-org-v2-logs-by-index.png" alt="Uso de logs de varias organizaciones por índice" >}}

### Uso de organización individual

En la pestaña de uso **Individual Organizations** (Organizaciones individuales), puedes ver el uso de tus organizaciones secundarias en unidades absolutas o como un porcentaje de uso total.

{{< img src="account_management/multi-org-percent-billable-v2.png" alt="Porcentaje de uso individual" >}}

La vista predeterminada es "Billable" (Facturables), que muestra el uso que computa para la factura final. En esta vista no se incluyen las organizaciones secundarias no sujetas a facturación, como las organizaciones de prueba, así como otros ajustes que ofrecen un resumen más preciso de qué se incluye en tu factura. Cambia a la vista "All" (Todo) para ver el uso sin procesar y sin ajustes de tu organización principal y todas las organizaciones secundarias. Ambas vistas se pueden descargar como un archivo CSV.

Para ver los [detalles de uso][11] de una organización secundaria, puedes hacer clic en el nombre de esta organización.

## Atribución de uso

La organización principal puede visualizar el uso de las organizaciones secundarias mediante las claves de etiquetas (tags) existentes en la página [Asignación de uso][12]. Los administradores pueden pasar el cursor sobre su nombre de usuario, en la parte inferior izquierda, y luego ir a: `Plan & Usage`--> `Usage Attribution`.

Cuando se encuentra activada en el nivel de la organización principal, la atribución de uso muestra el uso agregado de todas las organizaciones. Esto puede resultar útil si quieres atribuir el uso de tus organizaciones secundarias a ciertos proyectos, equipos u otras agrupaciones.

Entre las funciones se incluyen:

* Cambiar y añadir nuevas claves de etiquetas (hasta tres)
* Acceder al uso mensual en la IU y como descarga en formato .tsv (valores separados por tabulaciones)
* Acceder al uso diario en un archivo .tsv para la mayoría de los tipos de uso.

{{< img src="account_management/Facturación/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Informe sobre la asignación de uso mensual" style="width:100%;" >}}

La atribución de uso también se puede activar en el nivel de la organización secundaria. Cuando se encuentra activada en este nivel, las etiquetas solo se aplican a esa organización secundaria en concreto, y solo se pueden ver en esta. Las etiquetas aplicadas en el nivel de una organización secundaria no tienen rollup y no se pueden ver en la organización principal.

Usage Attribution (Atribución de uso) es una función avanzada incluida en el plan Enterprise. Para cualquier otro plan, ponte en contacto con tu representante de cuenta o escribe a <a href="mailto:success@datadoghq.com">success@datadoghq.com</a>.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/account_management/#managing-your-organizations
[3]: /es/account_management/org_settings/cross_org_visibility/
[4]: https://app.datadoghq.com/account/new_org
[5]: /es/account_management/rbac/permissions/#advanced-permissions
[6]: mailto:success@datadoghq.com
[7]: /es/api/
[8]: https://www.datadoghq.com/blog/managing-datadog-with-terraform
[9]: /es/monitors/manage/
[10]: /es/account_management/saml/
[11]: /es/account_management/plan_and_usage/usage_details/
[12]: /es/account_management/billing/usage_attribution/
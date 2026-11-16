---
aliases:
- /es/guides/multiaccountorg
- /es/account_management/mult_account
- /es/account_management/faq/what-data-from-my-sub-organizations-can-i-see-in-my-parent-account
- /es/account_management/multi_organisations
description: Administre múltiples organizaciones secundarias desde una cuenta principal
  con facturación, seguimiento de uso, y control de acceso independientes para proveedores
  de servicios administrados.
further_reading:
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: Blog
  text: Prácticas recomendadas para administrar organizaciones Datadog a escala
- link: /account_management/saml/
  tag: Documentación
  text: Configure SAML para su cuenta de Datadog
- link: /account_management/billing/usage_details
  tag: Documentación
  text: Obtenga más información sobre los detalles de uso
- link: /account_management/billing/usage_attribution
  tag: Documentación
  text: Configurar la Atribución de uso
- link: /account_management/org_settings/cross_org_visibility
  tag: Documentación
  text: Visibilidad entre organizaciones
title: Administración de cuentas de múltiples organizaciones
---
## Descripción general {#overview}

Es posible administrar múltiples organizaciones secundarias desde una cuenta de organización principal. Esto lo utilizan normalmente los proveedores de servicios administrados que tienen clientes que no deben tener acceso a los datos de los demás. 

La función de cuenta de múltiples organizaciones no está habilitada de forma predeterminada. Comuníquese con el [soporte de Datadog][1] para habilitarla.

## Capacidades {#capabilities}

Se pueden agregar usuarios a la organización principal y a múltiples organizaciones secundarias. Los usuarios cambian entre organizaciones desde el [menú de configuración de la cuenta de usuario][2]. 

Las organizaciones dentro de una organización principal no tienen acceso a los datos de las demás. Para habilitar consultas de métricas entre organizaciones, consulte la [visibilidad entre organizaciones][3].

La organización principal puede visualizar el uso de las organizaciones secundarias individuales, lo que permite a la principal realizar un seguimiento de las tendencias de uso.

La configuración de la cuenta, como las direcciones IP permitidas, no es heredada por las organizaciones secundarias de su organización principal.

## Organizaciones secundarias {#child-organizations}

### Cree {#create}

1. Una vez habilitada la función, consulte la [Página de nueva organización][4].
2. Ingrese el nombre de la organización secundaria que desea crear. **El nombre de la organización secundaria no puede exceder los 32 caracteres.**
3. Opcionalmente, invite a usuarios administradores a su organización secundaria:
    - Ingrese una o más direcciones de correo electrónico.
    - A los usuarios invitados se les asigna el [rol de Datadog Admin][5]. Puede invitar a más usuarios en
Configuración de la organización después de crear su organización.
    - Si el usuario no tiene una contraseña, Datadog envía una invitación por correo electrónico con un enlace para establecer una contraseña y unirse a la nueva organización secundaria.
4. Haga clic en {{< ui >}}Create{{< /ui >}}.

La nueva organización secundaria hereda el plan de la organización principal y se agrega a la cuenta de facturación de la organización principal. Si desea actualizar la facturación de la organización secundaria, [comuníquese con su representante de ventas][6].

### Contenido {#content}

La incorporación de una nueva suborganización con un conjunto de tableros y monitores de referencia se puede realizar mediante programación con la [Datadog API][7] y herramientas como Terraform; consulte [Administración de Datadog con Terraform][8]. Además, se pueden usar scripts para realizar copias de seguridad de los tableros y [monitores][9] existentes como código.

### Subdominios personalizados {#custom-sub-domains}

La función de subdominio personalizado no está habilitada de forma predeterminada. Comuníquese con el [soporte de Datadog][1] para habilitarla.

Si usted es miembro de varias organizaciones, los subdominios personalizados le ayudan a identificar la fuente de una alerta o notificación. Además, pueden cambiarlo inmediatamente a la organización asociada con el subdominio.

Por ejemplo, la URL **https:{{< region-param key=dd_full_site >}}/event/event?id=1**está asociada con un evento en la Organización A. Si un usuario es miembro tanto de la Organización A como de la Organización B, pero está visualizando Datadog dentro del contexto de la Organización B, entonces esa URL devuelve un `404 Not Found error`. El usuario debe cambiar a la Organización A usando el [menú de configuración de usuario][2] y luego volver a visitar la URL. Sin embargo, con subdominios personalizados, el usuario podría navegar a**https://org-a.**{{< region-param key=dd_site >}}/event/event?id=1**lo cual cambiaría automáticamente el contexto del usuario a la Organización A y mostraría la página correcta.**Nota**: Si tiene un subdominio de Datadog personalizado, edite manualmente los enlaces de la documentación de Datadog con el nombre de su subdominio. Por ejemplo, un enlace que redirige a**https:{{< region-param key=dd_full_site >}}/account/settings**se convierte en**https://<custom_sub-domain_name>.{{< region-param key=dd_site >}}/account/settings**.

## Configure SAML {#set-up-saml}

La configuración de SAML _no_ es heredada por las organizaciones secundarias de la organización principal. SAML debe configurarse para cada organización secundaria de forma individual.

Para configurar SAML para organizaciones múltiples:

1. Cree una nueva organización.
2. Invite a usuarios de SAML.
3. Inicie sesión como usuario de SAML y [configure SAML][10].

### Organizaciones principales con SAML estricto {#saml-strict-parent-organizations}

En algunas circunstancias, es posible que no pueda acceder a una organización secundaria recién creada. Cuando una organización requiere que los usuarios inicien sesión mediante SAML, es posible que sus cuentas de usuario no tengan contraseñas. Dado que las organizaciones secundarias no heredan la configuración de SAML de sus principales, iniciar sesión en la organización secundaria requiere una contraseña que no existe.

Para asegurarse de que puede iniciar sesión en una organización secundaria creada a partir de una organización principal con SAML estricto, siga estos pasos en la organización principal:
1. Haga clic en {{< ui >}}Organization Settings{{< /ui >}} desde el menú de cuenta en la parte inferior de la navegación del lado izquierdo, o seleccione {{< ui >}}Organization Settings{{< /ui >}} desde el menú desplegable del encabezado en la parte superior de la página de Configuración personal.
2. En el menú de la página izquierda, seleccione {{< ui >}}Users{{< /ui >}}.
3. Seleccione su perfil de usuario.
4. Coloque el interruptor {{< ui >}}Override Default Login Methods{{< /ui >}} en la posición de encendido.
5. En {{< ui >}}Select user's login methods{{< /ui >}}, marque la casilla de verificación {{< ui >}}Password{{< /ui >}}.
6. Asegúrese de que su cuenta tenga una contraseña. Si necesita ayuda para establecer una contraseña, comuníquese con el [soporte de Datadog][1].

Seguir los pasos anteriores garantiza que pueda iniciar sesión en la cuenta principal utilizando una combinación de correo electrónico y contraseña. Después de crear su organización secundaria, también puede iniciar sesión en ella utilizando su correo electrónico y contraseña.

Si ya creó la organización secundaria y no puede acceder, seguir el procedimiento le permite iniciar sesión.

## Uso multi-org {#multi-org-usage}

La organización principal puede visualizar el uso total y facturable de todas sus organizaciones (organizaciones secundarias y principales) colocando el cursor sobre su nombre de usuario en la esquina inferior izquierda y navegando a [**Plan & Usage** > **Usage & Cost**][11].

La página de Uso muestra el uso agregado de la organización principal y todas sus organizaciones secundarias. Hay dos pestañas en la página de Uso:

* {{< ui >}}Overall{{< /ui >}}
* {{< ui >}}Individual Organizations{{< /ui >}}

### Uso general {#overall-usage}

Esta pestaña contiene una sección de Uso total del mes a la fecha y una sección de Uso general.

La sección de Uso total del mes a la fecha resume su uso mensual de servidores, contenedores, métricas personalizadas y cualquier otra parte de la plataforma que haya utilizado durante el mes, en su organización principal y todas sus organizaciones secundarias.

{{< img src="account_management/multi-org-v2.png" alt="Uso del mes a la fecha" >}}

La mayoría de las cuentas pueden visualizar de forma predeterminada el uso "Facturable", que muestra el uso que contribuye a su factura final. Esta vista también desglosa el uso bajo demanda por encima de sus compromisos y asignaciones. La vista "Todo" le muestra todo el uso, incluido el uso no facturable, como las pruebas de productos.

La sección de Uso general muestra el uso mensual agregado en todas las organizaciones durante los últimos 6 meses. El uso que se muestra aquí es el uso "Todo", no el uso "Facturable", lo que significa que no se ajusta por períodos de prueba u otros cambios de facturación utilizados para calcular su factura final. Esta información se puede descargar como un archivo CSV.

{{< img src="account_management/multi-org-v2-trends.png" alt="Tendencias a largo plazo del uso general" >}}

Tanto la sección de Uso total del mes hasta la fecha como la sección de Uso general se pueden filtrar haciendo clic en las subpestañas específicas del producto. En la subpestaña "Log Management", puede visualizar la tabla de Uso de logs indexados, que muestra el uso de logs indexados del mes hasta la fecha y del mes anterior por:

* Nombre del índice
* Organización
* Período de retención en días
* Recuento de logs indexados desglosado entre logs activos y rehidratados
* El porcentaje de contribución del índice al uso general de logs indexados

Estos datos se pueden descargar como un archivo CSV.

{{< img src="account_management/multi-org-v2-logs-by-index.png" alt="Uso de logs indexados por índice de múltiples organizaciones" >}}

### Uso de organización individual {#individual-organization-usage}

En la pestaña de uso {{< ui >}}Individual Organizations{{< /ui >}}, puede ver el uso de sus organizaciones secundarias en unidades absolutas o como un porcentaje del uso total.

El modo de visualizar predeterminado es el modo "Facturable", que muestra el uso que contribuye a su factura final. Este modo de visualizar elimina las organizaciones secundarias que no son facturables, como las organizaciones de prueba, y otros ajustes que proporcionan un resumen más preciso de lo que determina su factura. Cambie a la opción de visualizar "Todo" para ver el uso bruto y sin ajustar de su organización principal y de todas las organizaciones secundarias. Ambas opciones de visualizar se pueden descargar como un archivo CSV.

Para visualizar los [Detalles de uso][12] de una organización secundaria, puede hacer clic en el nombre de la organización secundaria.

## Atribución de uso {#usage-attribution}

La organización principal puede visualizar el uso de las organizaciones secundarias mediante claves de etiqueta existentes en la página [Atribución de uso][13]. Los administradores pueden pasar el cursor sobre su nombre de usuario en la parte inferior izquierda y luego navegar a: [**Plan y uso > Atribución de uso**][14].

Cuando se habilita a nivel de organización principal, la atribución de uso muestra el uso agregado en todas las organizaciones. Esto puede ser útil si desea atribuir el uso de sus organizaciones secundarias a ciertos proyectos, equipos u otras agrupaciones.

Las funcionalidades incluyen:

* Cambiar y agregar nuevas claves de etiqueta (hasta tres).
* Acceder al uso mensual tanto en la interfaz de usuario como en una descarga .tsv (valores separados por tabulaciones)
* Acceder al uso diario en un archivo .tsv para la mayoría de los tipos de uso.

{{< img src="account_management/billing/usage_attribution/Usage-Attribution-Monthly-Facets.png" alt="Informe de atribución de uso mensual" style="width:100%;" >}}

La atribución de uso también se puede habilitar a nivel de organización secundaria. Cuando se habilita a este nivel, las etiquetas solo se aplican a esa organización secundaria específica y solo se pueden visualizar en esa organización secundaria. Las etiquetas aplicadas a nivel de organización secundaria no se propagan y no se pueden visualizar en la organización principal.

Atribución de uso es una función avanzada incluida en el plan Enterprise. Para todos los demás planes, comuníquese con su representante de cuenta o [success@datadoghq.com][6].

## Lecturas adicionales {#further-reading}

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
[11]: https://app.datadoghq.com/billing/usage?cost_summary
[12]: /es/account_management/plan_and_usage/usage_details/
[13]: /es/account_management/billing/usage_attribution/
[14]: https://app.datadoghq.com/billing/usage-attribution
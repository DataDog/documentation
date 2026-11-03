---
aliases:
- /es/developers/faq/access-your-support-ticket
- /es/account_management/faq/access-your-support-ticket
- /es/account_management/guide/access-your-support-ticket
description: Aprenda a crear y administrar tickets de soporte de Datadog, incluso
  en el portal de soporte de GovCloud.
further_reading:
- link: /getting_started/support/
  tag: Documentación
  text: Introducción al soporte de Datadog
title: Administre sus tickets de soporte
---
<div class="alert alert-info">Seleccione su sitio de Datadog para ver las instrucciones de su portal de soporte.</div>

{{% site-region region="us,us3,us5,eu,ap1,ap2,uk1" %}}

## Crear un ticket de soporte {#create-a-support-ticket}

Para crear un nuevo ticket de soporte, navegue al [sitio de soporte de Datadog][1]. En la parte inferior de la página, haga clic en **Crear un nuevo ticket** para completar un formulario de ticket.

También puede acceder a este formulario a través de Datadog. Desde la navegación izquierda, coloque el cursor sobre **Ayuda** y haga clic en **Soporte**. Alternativamente, navegue a la [página de ayuda de Datadog][2] y haga clic en **Nuevo ticket de soporte**.

## Acceder a tickets existentes {#access-existing-tickets}

Si ha abierto al menos un ticket de soporte de Datadog, siga este proceso para acceder a todos sus tickets de soporte de Datadog:

1. Desde la [página de soporte][1], haga clic en **Iniciar sesión** en la parte superior derecha.
1. Si es la primera vez que inicia sesión en su cuenta de Zendesk de Datadog, haga clic en **¿Es nuevo en su cuenta de Zendesk de Datadog? Registrarse**.
1. Si anteriormente envió un correo electrónico al soporte de Datadog, haga clic en **¿Nos envió un correo electrónico para solicitar soporte? Obtener una contraseña** e ingrese la dirección de correo electrónico que utilizó para contactar al soporte de Datadog.
1. Después de recibir la contraseña en su correo electrónico, inicie sesión y haga clic en **Administrar sus tickets** para ver sus solicitudes.
1. Si no ve la página **Mis actividades** después de iniciar sesión, haga clic en su nombre en la esquina superior derecha y luego haga clic en **Mis actividades**.
1. Para ver los tickets de toda su organización, envíe una solicitud al soporte de Datadog.

## Requisitos de contraseña {#password-requirements}

Para ayudar a garantizar la seguridad de su cuenta, cualquier contraseña utilizada para iniciar sesión en el portal de soporte de Zendesk de Datadog debe cumplir con los siguientes requisitos:

- Complejidad de la contraseña
   - Debe incluir al menos **12 caracteres**.
   - Debe contener **letras mayúsculas y minúsculas (A-Z)**.
   - Debe incluir al menos **un número (0-9)**.
   - Debe incluir al menos **un carácter especial** (por ejemplo, `!`, `@`, `#` o `%`).
   - No debe **parecerse a una dirección de correo electrónico**.
   - No debe **incluir la palabra \"Zendesk\"**.
- Secuencias prohibidas
   - Las contraseñas no pueden incluir más de un número especificado de letras o números consecutivos. Por ejemplo, si el límite se establece en 4, el sistema rechaza contraseñas como `admin12345`.
- Contraseñas anteriores
   - Los usuarios no pueden reutilizar una cierta cantidad de sus contraseñas utilizadas anteriormente.
- Política de caducidad
   - Las contraseñas deben actualizarse al menos **cada 90 días**, o cuando el sistema lo solicite.
- Intentos fallidos y bloqueo
   - Se permite a los usuarios un máximo de **5 intentos** antes de que la cuenta se bloquee temporalmente.

## Solución de problemas {#troubleshooting}

### Error: Se rechazó la conexión {#error-refused-to-connect}

**Los errores de conexión rechazada** provienen de configuraciones de privacidad que bloquean las cookies de terceros. Para resolver este problema, asegúrese de que el navegador permita cookies de terceros de Zendesk. Encuentre instrucciones sobre cómo [borrar, habilitar y administrar cookies en Chrome][3] en la Ayuda de Google Chrome.

Si su navegador tiene bloqueadores de anuncios, desactívelos para ver si esto le permite iniciar sesión. Algunos bloqueadores de anuncios tienen su propia lista de excepciones. En este caso, agregue **datadog.zendesk.com** a la lista de permitidos.

### El ticket ya no está disponible {#ticket-is-no-longer-available}

Datadog elimina los tickets cerrados, incluidos sus archivos adjuntos, 15 meses después de su última actualización.

Si necesita ayuda con un problema relacionado, puede abrir un nuevo ticket o buscar en la documentación de Datadog.

{{% /site-region %}}

{{% site-region region="gov,gov2" %}}

## Requisitos previos {#prerequisites}

Para recibir códigos de verificación de registro, correos electrónicos de restablecimiento de contraseña y correos electrónicos de notificación de incidencias, agregue el dominio `ddog-gov.com` a su lista de permitidos de correo electrónico. Esto incluye `help@ddog-gov.com` y `support@ddog-gov.com`.

## Regístrese en el portal {#register-on-the-portal}

Si es un usuario nuevo, siga estos pasos para registrar una cuenta:

1. Navegue al [portal de soporte de Datadog GovCloud][4].
1. Haga clic en **Registrarse**.
1. Complete el formulario de registro utilizando la dirección de correo electrónico asociada con su cuenta de Datadog GovCloud existente. Mantenga esta página abierta.
1. En una pestaña del navegador diferente, acceda a su cuenta de correo electrónico. Abra el correo electrónico de verificación de `help@ddog-gov.com` y copie el código de verificación.
1. En el portal de soporte de Datadog GovCloud, ingrese el código de verificación.
1. Haga clic en **Verificar**.

**Nota**: Después del registro, su nombre de usuario de inicio de sesión es su correo electrónico con `.ddgov.support` añadido (por ejemplo, `[name]@[domain].ddgov.support`). Utilice este nombre de usuario completo al iniciar sesión.

## Crear una incidencia {#create-a-case}

Para crear una incidencia:

1. Navegue al [portal de soporte de Datadog GovCloud](https://govsupport.ddog-gov.com).
1. Inicie sesión con el formato de nombre de usuario `[name]@[domain].ddgov.support`.
1. Haga clic en **Crear una nueva incidencia**.
1. Complete el formulario.
1. Haga clic en **Enviar y cargar archivos**.
1. Opcionalmente, cargue archivos de respaldo. Los tipos de archivo aceptados incluyen `.txt`, `.csv`, `.xls`, `.xlsx`, `.doc`, `.otf`, `.yaml`, `.log`, `.conf`, `.tf`, `.zip`, `.pcap`, `.png` y `.jpeg`.
1. Haga clic en **Enviar**.

## Acceder a incidencias existentes {#access-existing-cases}

Si ha abierto al menos una incidencia de Datadog, siga este proceso para acceder a sus incidencias:

1. Inicie sesión en [el portal de soporte de Datadog GovCloud][4].
1. Cambie el filtro de **Vistos recientemente** a **Incidencias** para ver todas las incidencias.
1. Haga clic en **Número de incidencia** o **Asunto** para visualizar los detalles.

**Nota**: Las incidencias históricas de Zendesk no se han migrado; el Zendesk heredado es de solo lectura.

## Solución de problemas {#troubleshooting-1}

### No puede ver incidencias nuevas {#cannot-see-new-cases}

Cambie el filtro de **Vistos recientemente** a **Incidencias**.

### Problemas de inicio de sesión {#login-issues}

Asegúrese de que su nombre de usuario completo incluya el sufijo `.ddgov.support`.

### No recibió el restablecimiento de contraseña {#password-reset-not-received}

Haga clic en **¿Olvidó su contraseña?** para abrir la página **Restablecer su contraseña**, luego ingrese su nombre de usuario completo, incluido el sufijo `.ddgov.support`, en el campo **Ingrese su nombre de usuario**. Si aún no recibe el correo electrónico, agregue `ddog-gov.com` a su lista de permitidos de correo electrónico.

### ¿No sabe su nombre de usuario? {#do-not-know-your-username}

Haga clic en **¿Olvidó su contraseña?** > **¿Olvidó su nombre de usuario?** > **Utilice su dirección de correo electrónico**. Este enlace lo lleva fuera del portal de soporte de GovCloud y abre Salesforce Identity. Esa página también se titula **Restablecer su contraseña**, pero su campo **Ingrese su dirección de correo electrónico** acepta su dirección de correo electrónico de trabajo, no su `.ddgov.support`nombre de usuario.

### Error de registro {#registration-error}

Es posible que su cuenta ya exista. Haga clic en **¿Olvidó su contraseña?**, luego ingrese su nombre de usuario completo, incluido el sufijo `.ddgov.support` (por ejemplo, `[name]@[domain].ddgov.support`), en el campo **Ingrese su nombre de usuario**. Si aún no puede acceder a su cuenta, comuníquese con `support@ddog-gov.com`.

{{% /site-region %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.datadoghq.com/
[2]: https://app.datadoghq.com/help
[3]: https://support.google.com/chrome/answer/95647
[4]: https://govsupport.ddog-gov.com
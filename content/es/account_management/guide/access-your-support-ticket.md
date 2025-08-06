---
aliases:
- /es/developers/faq/access-your-support-ticket
- /es/account_management/faq/access-your-support-ticket
title: Acceder a tu ticket de soporte
---

## Crear un ticket de soporte

Para crear un nuevo ticket de soporte, haz clic en el enlace correspondiente en el sitio y haz clic en **Submit a request** (Enviar una solicitud) para rellenar un formulario de ticket.

{{< whatsnext desc="Support page by Datadog site:">}}
    {{< nextlink href="https://help.datadoghq.com/" >}} US1, US3, US5, EU, AP1, AP2 {{< /nextlink >}}
    {{< nextlink href="http://help.ddog-gov.com/" >}}US1-FED{{< /nextlink >}}
{{< /whatsnext >}}

{{< img src="/account_management/guide/access_your_support_ticket/support_page.png" alt="Página de inicio del Soporte de Datadog" style="width:100%;" >}}

También puedes acceder a este formulario en Datadog desde la [página de ayuda][2]: en el panel de navegación izquierdo, haz clic en **?** -> **Resources** (Recursos). En *Support Tickets & Billing Questions* (Tickets de soporte y preguntas sobre facturación), haz clic en **New Support Ticket** (Nuevo ticket de soporte).

## Acceder a tickets existentes

Si ya has abierto al menos un ticket de soporte en Datadog, sigue este proceso para acceder a todos tus tickets de soporte de Datadog:
1. En la página de Soporte, haz clic en **Sign In** (Iniciar sesión) en la esquina superior derecha.

2. Si esta es la primera vez que inicias sesión en tu cuenta de Datadog Zendesk, haz clic en el enlace **New to your Datadog Zendesk account? Sign up** (¿Primera vez en tu cuenta Datadog Zendesk? Regístrate).

3. Si ya enviaste un correo electrónico al equipo de soporte de Datadog, haz clic en **Emailed us for support? Get a password** (¿Nos enviaste un correo? Consigue tu contraseña) e introduce la misma dirección de correo electrónico que usaste para contactar al equipo de soporte de Datadog.

4. Cuando recibas la contraseña en tu correo electrónico, inicia sesión y haz clic en **Manage your tickets** (Gestionar tus tickets) para ver tus solicitudes.

5. Si no puedes ver la página **My Activities** (Mis actividades) tras iniciar sesión, haz clic en tu nombre en la esquina superior derecha y después haz clic en **My Activities** (Mis actividades).

6. Si quieres ver todos los tickets de tu organización, envía una solicitud al equipo de asistencia de Datadog.

{{< whatsnext desc="Support Page by Datadog Site:">}}
    {{< nextlink href="https://help.datadoghq.com/" >}} US1, US3, US5, EU, AP1, AP2 {{< /nextlink >}}
    {{< nextlink href="http://help.ddog-gov.com/" >}}US1-FED{{< /nextlink >}}
{{< /whatsnext >}}

## Requisitos de contraseña

Para garantizar la seguridad de tu cuenta, cualquier contraseña utilizada para iniciar sesión en el portal de soporte de Zendesk de Datadog debe cumplir los siguientes requisitos:

1. Complejidad de la contraseña:
    - Debe incluir al menos **12 caracteres**.
    - Debe contener **letras mayúsculas y minúsculas (A-Z)**.
    - Debe incluir al menos **un número (0-9)**.
    - Debe incluir al menos **un carácter especial** (por ejemplo, `!`, `@`, `#`, o `%`).
    - No debe **parecerse a una dirección de correo electrónico**.
    - No debe **incluir la palabra "Zendesk"**.
1. Intentos fallidos y bloqueo:
    - Se permite a los usuarios un máximo de **5 intentos** antes de que la cuenta se bloquee temporalmente.
1. Secuencias prohibidas:
    - Las contraseñas no pueden incluir más de un número determinado de letras o números consecutivos. Por ejemplo, si el límite se establece en 4, el sistema rechaza contraseñas como `admin12345`.
1. Contraseñas anteriores:
    - Los usuarios no pueden reutilizar un número determinado de sus contraseñas usadas anteriormente.
1. Política de caducidad:
    - Las contraseñas deben actualizarse al menos **cada 90 días**, o cuando el sistema lo solicite.

## Solucionar problemas
### Error: No se ha podido conectar
El error **Refused to connect** (Conexión rechazada) proviene de ajustes de privacidad que bloquean cookies de terceros. Para solucionarlo, asegúrate de que tu navegador permita cookies de terceros de Zendesk. Lee las instrucciones sobre cómo [Borrar, activar y gestionar cookies en Chrome][1] en la página de Ayuda de Google Chrome.

Si tu navegador tiene bloqueadores de publicidad, desactívalos para ver si así puedes iniciar sesión. Algunos bloqueadores de anuncios tienen su propia lista de excepciones. En este caso, añade **datadog.zendesk.com** a la lista de permitidos.

[1]: https://support.google.com/chrome/answer/95647
[2]: https://app.datadoghq.com/help
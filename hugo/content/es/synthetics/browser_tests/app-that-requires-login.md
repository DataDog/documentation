---
aliases:
- /es/synthetics/guide/app-that-requires-login
description: Te contamos cómo asegurarte de que se pueda iniciar sesión en tus aplicaciones
  durante los tests de navegador Sintético.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Prácticas recomendadas para crear tests de extremo a extremo
- link: /synthetics/guide/browser-tests-totp
  tag: Documentación
  text: Algoritmos TOTP para la autenticación multifactor en tests de navegador
- link: /synthetics/guide/browser-tests-passkeys
  tag: Documentación
  text: Más información sobre Passkeys en los tests de navegador
- link: /synthetics/browser_tests/actions
  tag: Documentación
  text: Pasos de los tests de navegador
title: Monitorización de una aplicación que requiere autenticación con pruebas de
  navegador
---

## Información general

<div class="alert alert-info">Si estás interesado en probar aplicaciones que están en segundo plano en la MFA, visita la <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">Sección de autenticación multifactor</a></div>

Es posible que necesites monitorizar los recorridos del usuario situados en segundo plano en un inicio de sesión. Hay dos formas de garantizar que tus tests del navegador Datadog puedan recorrer los pasos de inicio de sesión de tu aplicación para realizar la validación en las páginas después del inicio de sesión:

- [Incluye los pasos de inicio de sesión en la grabación del test de navegador](#include-the-login-steps-in-your-recording)
- [Aprovecha las opciones avanzadas en tus tests de navegador](#leverage-browser-test-configuration-options)

Para garantizar que tus credenciales se almacenen de forma segura y se enmascaren en toda la aplicación, utiliza [variables globales enmascaradas](#account-security).

## Incluye los pasos de inicio de sesión en tu grabación

El primer método consiste en grabar los pasos necesarios para realizar el inicio de sesión al principio de los tests de navegador: introduce tu nombre de usuario, introduce tu contraseña y haz clic en iniciar sesión. A continuación, puedes [empezar a grabar los pasos siguientes][1].
En la ejecución del test, el test de navegador ejecuta sistemáticamente los primeros pasos del inicio de sesión antes de hacer el resto del recorrido.

{{< img src="synthetics/guide/app_that_requires_login/login_test_2.mp4" video="true" alt="Demo de grabación de un inicio de sesión">}}

De forma predeterminada, el iframe/elemento emergente de la grabadora utiliza tu propio navegador. Si inicias la grabación cuando ya has iniciado la sesión en tu aplicación, el iframe/elemento emergente podría mostrar directamente una página posterior al inicio de sesión, lo que te impide grabar tus pasos de inicio de sesión sin cerrar sesión primero.

Para grabar tus pasos sin cerrar sesión de tu aplicación, utiliza el modo incógnito de la grabadora.

{{< img src="synthetics/guide/app_that_requires_login/incognito_2.mp4" video="true" alt="Demo de grabación de un inicio de sesión en incógnito">}}

Abrir un elemento emergente en modo incógnito te permite iniciar la grabación de tu test desde la URL de inicio configurada en tu configuración de test con una sesión completamente aislada de la sesión principal de tu propio navegador y de los datos del usuario. El elemento emergente de incógnito recién abierto ignora todo el historial anterior de tu navegador, incluidas las cookies y los datos locales. La sesión de tu cuenta se cierra automáticamente y puedes empezar a grabar tus pasos de inicio de sesión como si estuvieras visitando tu sitio web por primera vez.

**Nota:** Utiliza [la función de subtest][2] para agrupar los pasos de inicio de sesión en un único subtest que podrás reutilizar luego en cualquier otro test de navegador que requiera un inicio de sesión.

### Inicio de sesión SSO

Si tu sitio web utiliza SSO para el inicio de sesión, introduce la URL de tu aplicación como URL de inicio del test de navegador. El test realiza las redirecciones necesarias como parte del primer paso predeterminado **Ir a la URL**.

Algunos proveedores de SSO pueden detectar los tests de navegador de Datadog como bots y evitar que inicien sesión, por ejemplo, añadiendo un reCAPTCHA. Si este es tu caso, considera la posibilidad de ponerte en contacto con tu proveedor de SSO para ver si es posible desactivar la detección de bots al [identificar las solicitudes como procedentes de tests de navegador Sintético][3] (como para un conjunto específico de credenciales o encabezados específicos de tests Sintético) con fines de prueba.

Una alternativa sería utilizar un enfoque no-SSO y aprovechar una combinación normal de nombre de usuario y contraseña para pasar por el inicio de sesión.

### Passkeys
La monitorización de Datadog Sintético es compatible con [Passkeys][4], un método de seguridad que elimina los riesgos de suplantación de identidad (phishing), todas las formas de robo de contraseñas y los ataques de reinyección.

Crea una variable global de Virtual Authenticator e impórtala en tu test. A continuación, graba cualquier paso relacionado con el passkey en el navegador.

### Autenticación multifactor

La monitorización de Datadog Sintético es compatible con [Contraseñas de un solo uso basadas en el tiempo (TOTP)][5], un método de autenticación multifactor que combina una clave secreta y la hora actual para generar una contraseña de un solo uso.

Los tests de navegador pueden reproducir cualquier acción que un usuario normal realice en su navegador. Cuando configures tu test, registra cualquier paso de autenticación multifactor (incluidos 2FA o TFA) en el navegador.

Algunos proveedores de MFA pueden detectar los tests de navegador de Datadog como bots y evitar que inicien sesión, por ejemplo, añadiendo un reCAPTCHA. En este caso, ponte en contacto con tu proveedor de MFA para ver si es posible desactivar la detección de bots al [identificar solicitudes como procedentes de tests de navegador Sintético][3] (como para un conjunto específico de credenciales o encabezados específicos de test Sintético).

Si tu proceso de MFA implica pasos realizados fuera del navegador (como voz, mensajes de texto o abrir una aplicación móvil que no aprovecha TOTP), considera ponerte en contacto con tu proveedor de MFA para preguntar si la configuración de tu MFA puede modificarse o si la MFA puede desactivarse cuando [se identifican solicitudes como procedentes de tests de navegador Sintético][3] (como para un conjunto específico de credenciales o encabezados específicos de pruebas Sintético) con fines de prueba.
Según cuál sea el tipo de MFA aprovechado por tu aplicación, [los pasos de JavaScript][6] pueden ayudar a solucionarlo.

<div class="alert alert-info">Datadog añade constantemente funciones para ayudarte a grabar escenarios de test más fácilmente. Te agradecemos que <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">nos envíes tus comentarios</a> sobre los sistemas de MFA que más te interesan.</div>

## Aprovechar las opciones de configuración de test de navegador 

La segunda forma de garantizar que tus tests de navegador Datadog puedan iniciar sesión en tus aplicaciones es aprovechar una o varias de las configuraciones de test de navegador disponibles. En efecto, puedes decidir aplicar:

- Encabezados específicos
- Cookies
- Credenciales de Basic Auth, Digest Auth o NTLM

Estas opciones de configuración se configuran en cada ejecución del test y se aplican a cada paso del test de navegador en el momento de la ejecución, no en el momento de la grabación.

Puedes aplicar manualmente estos encabezados, cookies y credenciales configuradas en la página desde la que estás grabando y, a continuación, grabar los pasos que tu test realiza tras el inicio de sesión. De forma predeterminada, el test de navegador pasa automáticamente por la autenticación con tus encabezados, cookies y/o credenciales especificadas en el momento de la ejecución y, a continuación, realiza todos los pasos grabados.

{{< img src="synthetics/guide/app_that_requires_login/bt_adv_options.jpg" alt="Inicia sesión en tu aplicación con las opciones de configuración del test de navegador">}}

## Seguridad de la cuenta

### Proteger tus datos de autenticación

Almacena tus credenciales como [variables globales][7] (por ejemplo, una variable global para el nombre de usuario y otra para la contraseña) y selecciona **Ocultar y enmascarar el valor de la variable** para ocultar sus valores de los resultados del test. Puedes restringir los permisos en un test de navegador para las personas que tienen acceso a tu instancia de Datadog.

Una vez creadas las variables enmascaradas, puedes [importar estas variables globales][8] en tus tests de navegador y aprovecharlas para tus pasos de inicio de sesión.

**Nota:** Aunque las variables globales de Datadog se almacenan y se cifran de forma segura, se recomienda encarecidamente utilizar una cuenta dedicada a realizar tests con credenciales ficticias como la práctica más recomendada de pruebas generales.

Para obtener más información sobre la seguridad de las cuentas, consulta [Seguridad de los datos de la monitorización Sintético][9].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/actions/
[2]: /es/synthetics/browser_tests/actions/#subtests
[3]: /es/synthetics/guide/identify_synthetics_bots/
[4]: /es/synthetics/guide/browser-tests-passkeys
[5]: /es/synthetics/guide/browser-tests-totp
[6]: /es/synthetics/browser_tests/actions/#test-your-ui-with-custom-javascript
[7]: /es/synthetics/settings/?tab=specifyvalue#global-variables
[8]: /es/synthetics/browser_tests/actions#a-global-variable
[9]: /es/data_security/synthetics
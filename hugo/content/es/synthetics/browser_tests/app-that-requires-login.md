---
aliases:
- /es/synthetics/guide/app-that-requires-login
description: Aprenda a asegurarse de que sus pruebas de navegador de Synthetic puedan
  iniciar sesión en sus aplicaciones.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Mejores prácticas para crear pruebas de extremo a extremo
- link: /synthetics/guide/browser-tests-totp
  tag: Documentación
  text: TOTP para autenticación de múltiples factores (MFA) en pruebas de navegador
- link: /synthetics/guide/browser-tests-passkeys
  tag: Documentación
  text: Aprenda sobre Passkeys en las pruebas de navegador
- link: /synthetics/browser_tests/test_steps
  tag: Documentación
  text: Aprenda sobre los pasos de las pruebas de navegador
- link: /synthetics/guide/kerberos-authentication/
  tag: Guía
  text: Autenticación Kerberos para Synthetic Monitoring
title: Monitoree una aplicación que requiere autenticación con pruebas de navegador
---
## Descripción general {#overview}

<div class="alert alert-info">Si le interesa probar aplicaciones protegidas por MFA, consulte la sección de <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">autenticación de múltiples factores.</a></div>

Es posible que necesite monitorear recorridos de usuario que se encuentran detrás de un inicio de sesión. Existen dos formas de asegurarse de que sus pruebas de navegador de Datadog puedan completar los pasos de inicio de sesión de su aplicación para realizar validaciones en páginas posteriores al inicio de sesión:

- [Incluya los pasos de inicio de sesión en la grabación de su prueba de navegador](#include-the-login-steps-in-your-recording)
- [Aproveche las opciones avanzadas en sus pruebas de navegador](#leverage-browser-test-configuration-options)

Para asegurarse de que sus credenciales se almacenen de forma segura y se ofusquen en toda la aplicación, utilice [variables globales ofuscadas](#account-security).

## Incluya los pasos de inicio de sesión en su grabación {#include-the-login-steps-in-your-recording}

El primer método consiste en grabar los pasos necesarios para realizar el inicio de sesión al principio de sus pruebas de navegador: ingrese su nombre de usuario, ingrese su contraseña y haga clic en iniciar sesión. Luego puede continuar y [comenzar a grabar los pasos siguientes][1].
Durante la ejecución de la prueba, la prueba de navegador ejecuta sistemáticamente los primeros pasos de inicio de sesión antes de realizar el resto del recorrido.

{{< img src="synthetics/guide/app_that_requires_login/login_test_2.mp4" video="true" alt="Demostración de la grabación de un inicio de sesión">}}

De forma predeterminada, el iframe/ventana emergente de la grabadora utiliza su propio navegador. Si comienza la grabación ya habiendo iniciado sesión en su aplicación, es posible que el iframe/ventana emergente muestre directamente una página posterior al inicio de sesión, lo que le impide grabar sus pasos de inicio de sesión sin cerrar la sesión primero.

Para grabar sus pasos sin cerrar la sesión de su aplicación, utilice el modo incógnito de la grabadora.

{{< img src="synthetics/guide/app_that_requires_login/incognito_2.mp4" video="true" alt="Demostración de la grabación de un inicio de sesión en modo incógnito">}}

Abrir una ventana emergente en modo incógnito le permite iniciar la grabación de su prueba desde la URL inicial establecida en la configuración de su prueba con una sesión completamente aislada de la sesión principal y los datos de usuario de su navegador. La ventana emergente de incógnito recién abierta ignora todo su historial de navegación anterior, incluyendo cookies y datos locales. Se cierra automáticamente la sesión de su cuenta y puede comenzar a grabar sus pasos de inicio de sesión como si estuviera visitando su sitio web por primera vez.

**Nota:** Utilice [la función de subprueba][2] para agrupar sus pasos de inicio de sesión en una única subprueba que luego pueda reutilizar en cualquier otra prueba de navegador que requiera un inicio de sesión.

### Inicio de sesión SSO {#sso-login}

Si su sitio web utiliza SSO para el inicio de sesión, ingrese la URL de su aplicación como la URL inicial de su prueba de navegador. La prueba realiza las redirecciones necesarias como parte del primer paso predeterminado {{< ui >}}Navigate to URL{{< /ui >}}.

Algunos proveedores de SSO pueden detectar las pruebas de navegador de Datadog como bots y evitar que inicien sesión, por ejemplo, añadiendo un reCAPTCHA. Si ese es su caso, considere comunicarse con su proveedor de SSO para ver si es posible desactivar la detección de bots al [identificar las solicitudes como provenientes de pruebas de navegador Synthetic][3] (por ejemplo, para un conjunto específico de credenciales o encabezados específicos de las pruebas Synthetic) con fines de prueba.

Una alternativa sería utilizar un enfoque sin SSO y aprovechar una combinación habitual de nombre de usuario y contraseña para realizar el inicio de sesión.

### Passkeys {#passkeys}
Datadog Synthetic Monitoring admite [llaves de acceso][4], un método de seguridad que reduce los riesgos de phishing, robo de contraseñas y ataques de repetición. En las pruebas de navegador, las llaves de acceso solo funcionan en Google Chrome y Microsoft Edge.

Cree una variable global de Virtual Authenticator e impórtela en su prueba. Luego, grabe cualquier paso relacionado con la llave de acceso dentro del navegador.

### Autenticación de múltiples factores {#multi-factor-authentication}

Datadog Synthetic Monitoring admite [contraseñas de un solo uso basadas en tiempo (TOTP)][5], un método de autenticación de múltiples factores que combina una clave secreta y la hora actual para generar una contraseña de un solo uso.

Las pruebas de navegador pueden reproducir cualquier acción que un usuario habitual realice dentro de su navegador. Al configurar su prueba, grabe cualquier paso de autenticación de múltiples factores (incluyendo 2FA o TFA) dentro del navegador.

Algunos proveedores de MFA pueden detectar las pruebas de navegador de Datadog como bots y evitar que inicien sesión, por ejemplo, añadiendo un reCAPTCHA. En este caso, comuníquese con su proveedor de MFA para ver si es posible desactivar la detección de bots al [identificar solicitudes provenientes de pruebas de navegador Synthetic][3] (por ejemplo, para un conjunto específico de credenciales o encabezados específicos de las pruebas Synthetic).

Si su proceso de MFA implica pasos realizados fuera del navegador (como recibir una llamada de voz o un mensaje de texto, o abrir una aplicación móvil que no utiliza TOTP), considere comunicarse con su proveedor de MFA para preguntar si se puede modificar su configuración de MFA o si se puede desactivar MFA al [identificar solicitudes provenientes de pruebas de navegador Synthetic][3] (por ejemplo, para un conjunto específico de credenciales o encabezados específicos de las pruebas Synthetic) con fines de prueba.
Dependiendo del tipo de MFA que aproveche su aplicación, los [pasos de JavaScript][6] pueden ayudar a solucionar eso.

<div class="alert alert-info">Datadog agrega constantemente funciones para ayudarlo a grabar escenarios de prueba con mayor facilidad. Agradecemos que <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">envíe comentarios</a> sobre los sistemas de MFA que más le importan.</div>

## Aproveche las opciones de configuración de pruebas de navegador {#leverage-browser-test-configuration-options}

Alternativamente, puede configurar sus pruebas de navegador de Datadog para autenticarse utilizando opciones de configuración de prueba de navegador integradas. Puede aplicar lo siguiente:

- Encabezados específicos
- Cookies
- Credenciales HTTP Basic, Digest o NTLM (nombre de usuario y contraseña)

Para obtener más información, consulte la sección [Opciones avanzadas][10].

Estas opciones de configuración se establecen en cada ejecución de prueba y se aplican a cada paso de su prueba de navegador en el momento de la ejecución, no en el momento de la grabación. 

Puede aplicar manualmente estos encabezados, cookies y credenciales a la página de grabación y, luego, grabar los pasos que realiza su prueba después de iniciar sesión. Durante la ejecución de la prueba, la prueba de navegador se autentica automáticamente utilizando su configuración especificada y ejecuta todos los pasos grabados.

{{< img src="synthetics/guide/app_that_requires_login/browser_test_adv_options_2.png" alt="Inicie sesión en su aplicación con opciones de configuración de prueba de navegador">}}

Para aplicaciones que utilizan otros métodos de autenticación, como SSO, llaves de acceso o MFA, consulte la sección [Incluir los pasos de inicio de sesión en su grabación][11].

## Seguridad de la cuenta {#account-security}

### Proteja sus datos de autenticación {#secure-your-authentication-data}

Almacene sus credenciales como [variables globales][7] (por ejemplo, una variable global para el nombre de usuario y otra para la contraseña) y seleccione {{< ui >}}Hide and obfuscate variable value{{< /ui >}} para ocultar sus valores de los resultados de la prueba. Puede restringir los permisos en una prueba de navegador para las personas que tienen acceso a su instancia de Datadog.

Después de crear las variables ofuscadas, puede [importar estas variables globales][8] a sus pruebas de navegador y utilizarlas en sus pasos de inicio de sesión.

**Nota:** Aunque las variables globales de Datadog se almacenan de forma segura y están cifradas, se recomienda encarecidamente que utilice una cuenta dedicada a las pruebas con credenciales ficticias como una práctica recomendada general de pruebas.

Para obtener más información sobre la seguridad de la cuenta, consulte [Security de los datos de Synthetic Monitoring][9].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/test_steps/
[2]: /es/synthetics/browser_tests/test_steps/#subtests
[3]: /es/synthetics/guide/identify_synthetics_bots/
[4]: /es/synthetics/guide/browser-tests-passkeys
[5]: /es/synthetics/guide/browser-tests-totp
[6]: /es/synthetics/browser_tests/test_steps/#test-your-ui-with-custom-javascript
[7]: /es/synthetics/settings/?tab=specifyvalue#global-variables
[8]: /es/synthetics/browser_tests/test_steps#a-global-variable
[9]: /es/data_security/synthetics
[10]: /es/synthetics/browser_tests/?tab=requestoptions#advanced-options
[11]: #include-the-login-steps-in-your-recording
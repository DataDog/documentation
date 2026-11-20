---
further_reading:
- link: https://www.datadoghq.com/blog/mfa-synthetic-testing-datadog/
  tag: Blog
  text: Introducción a la autenticación multifactor en las pruebas Synthetic de Datadog
- link: /synthetics/guide/browser-tests-passkeys
  tag: Documentación
  text: Obtenga información sobre las llaves de acceso (Passkeys) en las pruebas de
    navegador
- link: synthetics/settings/?tab=specifyvalue#global-variables
  tag: Documentación
  text: Obtenga más información sobre las variables globales
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Cómo ayudé a mi cliente a escalar sus pruebas de navegador con Datadog.
title: Utilice contraseñas de un solo uso basadas en tiempo (TOTP) para la autenticación
  multifactor (MFA) en pruebas de navegador
---
## Descripción general {#overview}

Los métodos de autenticación multifactor, como TFA y MFA, ayudan a proteger sus aplicaciones contra el acceso no autorizado; sin embargo, estos métodos pueden dificultar la prueba de funciones.

Las variables globales de MFA de Datadog Synthetic le permiten probar los módulos de MFA basados en TOTP de su aplicación y los recorridos críticos del usuario sin deshabilitar medidas de seguridad críticas ni ingresar manualmente códigos de autenticación con herramientas dispares. No necesita crear ni mantener entornos dedicados para probar recorridos de usuario habilitados para MFA.

**Nota**: Datadog genera TOTP con el algoritmo SHA-1 y no admite tokens que utilicen otros algoritmos. Si su token TOTP funciona en Google Authenticator, es probable que sea compatible con Datadog.


## Almacene su clave secreta o código QR en una variable global {#store-your-secret-key-or-qr-code-in-a-global-variable}

Cree una variable global donde ingrese una clave secreta o cargue un código QR de su proveedor de autenticación. En la pestaña {{< ui >}}Global Variables{{< /ui >}} de su página {{< ui >}}Settings{{< /ui >}}, haga clic en {{< ui >}}Create Global Variable{{< /ui >}}.
1. En {{< ui >}}Choose variable type{{< /ui >}}, seleccione {{< ui >}}MFA Token{{< /ui >}}.
2. En {{< ui >}}Define variable{{< /ui >}}, ingrese un {{< ui >}}Variable Name{{< /ui >}}. El nombre de su variable solo puede usar letras mayúsculas, números y guiones bajos.
3. Ingrese un {{< ui >}}Description{{< /ui >}} para su variable (opcional).
4. Seleccione {{< ui >}}Tags{{< /ui >}} para asociar con su variable (opcional).
5. Siga la documentación de su aplicación de autenticación para obtener instrucciones sobre cómo crear una clave secreta o agregar un nuevo código QR.
6. Ingrese el {{< ui >}}Secret Key{{< /ui >}} en su variable o cargue una imagen de código QR.

    **Nota**: Cuando carga un código QR, Datadog solo lee la clave secreta. Si su proveedor utiliza una longitud de código o un período de actualización diferente, configúrelo en el paso 7.

7. (Opcional) Para usar una longitud de código o un período de actualización diferente, expanda {{< ui >}}Advanced Options{{< /ui >}} en {{< ui >}}Generate the OTP{{< /ui >}} y ajuste los valores.
8. Haga clic en {{< ui >}}\+ Generate{{< /ui >}} para crear una TOTP. Puede copiar la TOTP generada con el icono {{< ui >}}Copy{{< /ui >}}.
9. En {{< ui >}}Permissions settings{{< /ui >}}, restrinja el acceso a su variable según los roles en su organización. Para obtener más información sobre los roles, consulte la [documentación de RBAC][1].

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Cree un token MFA" style="width:100%;" >}}

## Use TOTP en sus pruebas Synthetic {#use-totp-in-your-synthetic-tests}
Puede usar la clave secreta o el código QR almacenado en una variable global en todas sus pruebas Synthetic. Al crear una [prueba de navegador][2], inyecte la TOTP generada a partir de la clave secreta o el código QR almacenado en la variable global para verificar el flujo de trabajo de autenticación de su aplicación.

{{< img src="synthetics/guide/browser-tests-totp/mfa-token-totp.mp4" alt="Grabación de una validación de TOTP" video="true" >}}

Para usar TOTP en sus [pruebas de navegador][2]:

1. Importe su variable global.
2. Al grabar su prueba, haga clic en el icono {{< ui >}}Hand{{< /ui >}} para generar una TOTP. 
3. En la aplicación del navegador de su prueba, haga clic en un campo para pegar la TOTP. Inyectar el código calculado en su prueba crea otro paso de prueba. 
4. Después de grabar los pasos de su prueba, haga clic en {{< ui >}}Save & Launch Test{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[2]: /es/synthetics/browser_tests/
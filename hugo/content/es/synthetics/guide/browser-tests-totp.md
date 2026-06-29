---
further_reading:
- link: https://www.datadoghq.com/blog/mfa-synthetic-testing-datadog/
  tag: Blog
  text: Introducción de la autenticación multifactor en los tests de Datadog Sintético
- link: /synthetics/guide/browser-tests-passkeys
  tag: Documentación
  text: Más información sobre Passkeys en los tests de navegador
- link: synthetics/settings/?tab=specifyvalue#global-variables
  tag: Documentación
  text: Más información sobre las variables globales
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Cómo ayudé a mi cliente a ampliar sus tests de navegador con Datadog
title: Utiliza contraseñas de un solo uso basadas en el tiempo (TOTP) para la autenticación
  multifactor (MFA) en los tests de navegador
---

## Información general

Los métodos de autenticación multifactor como TFA y MFA ayudan a proteger tus aplicaciones contra el acceso no autorizado, sin embargo, estos métodos pueden dificultar las pruebas de las funciones.

Las variables globales de MFA de Datadog Sintético te permiten hacer tests de los módulos de MFA basados en TOTP de tu aplicación y los recorridos críticos de los usuarios sin desactivar medidas de seguridad críticas ni introducir manualmente códigos de autenticación con herramientas dispares. No es necesario crear ni mantener entornos dedicados para hacer tests de los recorridos de los usuarios habilitados para MFA.

**Nota**: Si tu token TOTP funciona en Google Authenticator, es probable que sea compatible con Datadog.
Algunos códigos QR están limitados a métodos de verificación específicos y puede que no funcionen en todas las plataformas. Para garantizar la compatibilidad, utiliza un código QR o secreto que siga los protocolos TOTP estándar.


## Guarda tu clave secreta o código QR en una variable global

Crea una variable global donde introducir una clave secreta o cargar un código QR de tu proveedor de autenticación. En la pestaña **Variables globales** de tu página **Configuración**, haz clic en **Create Global Variable** (Crear variable global).
1. En **Choose variable type** (Elegir el tipo de variable), selecciona **MFA Token** (Token para MFA).
2. En **Definir variable**, introduce un **Nombre de variable**. Tu nombre de variable solo puede utilizar letras mayúsculas, números y guiones bajos.
3. Introduce una **Descripción** para tu variable (opcional).
4. Selecciona **Etiquetas** (tags) para asociarlas a tu variable (opcional).
5. Sigue la documentación de tu aplicación de autenticación para obtener instrucciones sobre cómo crear una clave secreta o añadir un nuevo código QR.
6. Añade la **clave secreta** a tu variable o carga la imagen de un código QR.
7. Haz clic en **+ Generar** para crear una TOTP. Puedes copiar la TOTP generada con el icono **Copiar**.
8. En **Configuración de permisos**, restringe el acceso a tu variable en función de los roles en tu organización. Para más información sobre roles, consulta la [documentación de RBAC][1].

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Crear un token para MFA" style="width:100%;" >}}

## Utiliza TOTP en tus tests Sintético 
Puedes utilizar la clave secreta o el código QR almacenados en una variable global en todos tus tests de Sintético. Cuando crees un [test de navegador][2], inserta la TOTP generada a partir de la clave secreta o el código QR almacenado en la variable global para verificar el flujo de trabajo de autenticación de tu aplicación.

{{< img src="synthetics/guide/browser-tests-totp/mfa-token-totp.mp4" alt="Grabación de una validación de TOTP" vídeo="true" >}}

Para utilizar TOTP en tus [tests de navegador][2]:

1. Importa tu variable global.
2. Cuando grabes tu test, haz clic en el icono **Mano** para generar una TOTP. 
3. En tu aplicación de test de navegador, haz clic en un campo para pegar la TOTP. Al insertar el código calculado en tu test se crea otro paso de test.
4. Una vez grabados los pasos del test, haz clic en **Save & Launch Test** (Guardar e iniciar test).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[2]: /es/synthetics/browser_tests/
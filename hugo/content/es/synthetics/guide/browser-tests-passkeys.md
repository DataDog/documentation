---
description: Aprende cómo asegurarte de que tus tests de navegador Synthetic pueden
  iniciar sesión en tus aplicaciones.
further_reading:
- link: /synthetics/guide/app-that-requires-login/
  tag: Documentación
  text: Más información sobre la autenticación en tests de navegadores
- link: /synthetics/guide/browser-tests-totp
  tag: Documentación
  text: Algoritmos TOTP para la autenticación multifactor (MFA) en tests de navegador
- link: synthetics/settings/?tab=specifyvalue#global-variables
  tag: Documentación
  text: Variables globales
title: Utilizar Claves de paso (FIDO2) en tests de navegador
---

## Información general

Las Claves de paso (FIDO2) son mucho más seguras que la tupla estándar de nombre de usuario y contraseña, además utilizan credenciales criptográficas únicas para cada sitio web. Las Claves de paso tampoco abandonan jamás los dispositivos de los usuarios, ni se almacenan en servidores de aplicaciones web. Con este modelo de seguridad se elimina el riesgo de ser víctima de suplantaciones de identidad y de sufrir robos de contraseñas o ataques de repetición.

Las claves de paso sustituyen al sistema de nombre de usuario y contraseña y se pueden utilizar para la autenticación de dos factores. Dado que la monitorización Synthetic genera, almacena y utiliza claves de paso, podrás probar recorridos de usuario críticos, protegidos con claves de paso, sin tener que anular esta medida de seguridad tan importante.

## Crear una variable global del autenticador virtual

En la monitorización Synthetic, las claves de paso se gestionan mediante las variables globales del autenticador virtual. Para crear una variable de este tipo que almacene tus claves de paso, consulta la [sección **Variables globales** en los parámetros de Monitorización Synthetic y tests continuos][4]

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Crear una variable global del autenticador virtual" style="width:70%;" >}}

## Uso de claves de paso en tests de navegador Synthetics
<div class="alert alert-danger">La monitorización Synthetic admite el uso de claves de paso en tests de navegadores Chrome y Edge.</div>

### Añadir claves de paso a un test de navegador

1. Haz clic en [Digital Experience > New Test > Browser Test (Experiencia digital > Nuevo test > Test de navegador)][3].
2. Haz clic en **Save & Edit Recording** (Guardar y editar grabación).
3. En la página de la grabación, haz clic en **Add Variable** > **Create variable from Global Variable** (Añadir variable > Crear variable a partir de variable global).
4. Proporciona las claves de paso almacenadas en la variable global de tu autenticador virtual que creaste en el [paso anterior](#create-your-virtual-authenticator-global-variable).

{{< img src="synthetics/guide/browser-tests-passkeys/synthetics_add_variable.png" alt="Añadir tu variable global del autenticador virtual a tu test de navegador" style="width:70%;" >}}

### Probar el flujo (flow) de registro

Para probar el flujo de registro con claves de paso en tus [tests de navegador][3]:

1. [Importa la variable global de tu autenticador virtual][5] en el test.
2. Ve a la página para registrar la clave de paso. Cuando se está grabando el test, Datadog automáticamente genera y almacena una nueva clave de paso a partir de la variable global del autenticador virtual que se ha importado.
3. Una vez grabados los pasos del test, haz clic en **Save & Launch Test** (Guardar e iniciar test).

### Probar el flujo de inicio de sesión

Para probar el flujo de inicio de sesión con una clave de paso en tus [tests de navegador][3], primero tienes que registrar la clave de paso de Datadog en la aplicación web (consulta la sección anterior). Este proceso debe llevarse a cabo una vez por cada clave de paso y aplicación.

Puedes emplear uno de estos dos métodos:

- Completar el flujo de registro en el propio grabador, pero sin grabar los pasos de registro o puedes
- Crear un test que integre los pasos tanto del flujo de registro como del flujo de inicio de sesión

1. [Importa la variable global de tu autenticador virtual][5].
2. Ve a la página para iniciar sesión con la clave de paso. Cuando se está grabando el test, Datadog automáticamente inicia sesión con la clave de paso que ya se ha registrado en la aplicación web con el autenticador virtual seleccionado.
3. Una vez grabados los pasos del test, haz clic en **Save & Launch Test** (Guardar e iniciar test).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings/variables
[2]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[3]: /es/synthetics/browser_tests/
[4]: /es/synthetics/settings/?tab=virtualauthenticator
[5]: /es/synthetics/browser_tests#use-global-variables
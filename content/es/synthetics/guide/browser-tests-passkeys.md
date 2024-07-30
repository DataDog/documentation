---
description: Te contamos cómo asegurarte de que se pueda iniciar sesión en tus aplicaciones
  durante los tests navegador de Synthetics.
further_reading:
- link: /synthetics/guide/app-that-requires-login/
  tag: Documentación
  text: Autenticación en tests de navegador
- link: /synthetics/guide/browser-tests-totp
  tag: Documentación
  text: Algoritmos TOTP para la autenticación multifactor en tests de navegador
- link: synthetics/settings/?tab=specifyvalue#global-variables
  tag: Documentación
  text: Variables globales
title: Usar claves de paso (FIDO2) en tests de navegador
---

## Información general

El sistema de claves de paso (FIDO2) es mucho más seguro que la tupla estándar de nombre de usuario y contraseña, además de que se usan credenciales criptográficas únicas para cada sitio web. Las claves de paso tampoco salen jamás de los dispositivos de los usuarios ni se almacenan en servidores de aplicaciones web. Con este modelo de seguridad, desaparece el riesgo de ser víctima de suplantaciones de identidad y de sufrir cualquier robo de contraseñas o ataques de reinyección.

Las claves de paso sustituyen al sistema de nombre de usuario y contraseña y se pueden usar para la autenticación de dos factores. Como Synthetic Monitoring genera, almacena y utiliza claves de paso, podrás probar recorridos de usuario protegidos con clave de paso que resultan esenciales sin tener que anular esta medida de seguridad tan importante.

## Crear una variable global del autenticador virtual

En Synthetic Monitoring, las claves de paso se gestionan mediante las variables globales del autenticador virtual. Para crear una variable de este tipo que almacene claves de paso, consulta la sección [**Global Variables** (Variables globales) del apartado de configuración en la página Synthetic Monitoring & Continuous Testing][4] (Synthetic Monitoring y tests continuos).

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Crear una variable global del autenticador virtual" style="width:70%;" >}}

## Usar claves de paso en tests de navegador de Synthetics
<div class="alert alert-warning">Synthetic Monitoring permite usar claves de paso en los tests de los navegadores Chrome y Edge.</div>

Cuando vayas a [crear un test de navegador][3], completa el flujo de registro de claves de paso y autenticación de tu aplicación con las claves de paso almacenadas en tu variable global del autenticador virtual.

### Probar el flujo de registro

Para probar el flujo de registro con claves de paso en tus [tests de navegador][3], haz lo siguiente:

1. [Importa la variable global del autenticador virtual][5] en el test. 
2. Ve a la página para registrar la clave de paso. Cuando se está grabando el test, Datadog automáticamente genera y almacena una nueva clave de paso a partir de la variable global del autenticador virtual que se ha importado.
3. Una vez grabados los pasos del test, haz clic en **Save & Launch Test** (Guardar e iniciar test).

### Probar el flujo de inicio de sesión

Para probar el flujo de inicio de sesión con una clave de paso en tus [tests de navegador][3], primero tienes que registrar la clave de paso de Datadog en la aplicación web (consulta la sección anterior). Este proceso debe llevarse a cabo una vez por clave de paso y aplicación.

Puedes emplear uno de estos dos métodos:

- Completar el flujo de registro en la propia herramienta de grabación, pero sin grabar los pasos de registro
- Crear un test que englobe los pasos tanto del flujo de registro como del flujo de inicio de sesión

1. [Importa la variable global del autenticador virtual][5].
2. Ve a la página para iniciar sesión con la clave de paso. Cuando se está grabando el test, Datadog automáticamente inicia sesión con la clave de paso que ya se ha registrado en la aplicación web con el autenticador virtual seleccionado.
3. Una vez grabados los pasos del test, haz clic en **Save & Launch Test** (Guardar e iniciar test).

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings/variables
[2]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[3]: /es/synthetics/browser_tests/
[4]: /es/synthetics/settings/?tab=virtualauthenticator
[5]: /es/synthetics/browser_tests#use-global-variables
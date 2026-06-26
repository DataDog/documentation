---
description: Navega entre varias organizaciones de Datadog utilizando el conmutador
  de organizaciones con la autenticación y la gestión de sesiones adecuadas en las
  distintas organizaciones.
further_reading:
- link: account_management/multi_organization/
  tag: Documentación
  text: Gestión de cuentas de varias organizaciones
title: Cambiar de una organización a otra
---

Si perteneces a varias organizaciones de Datadog, el conmutador de organizaciones situado en la parte inferior izquierda de la barra de navegación te permite alternar entre ellas. También puedes ver todas las organizaciones y cambiar entre ellas desde la página [**Organizations** (Organizaciones)][1] en **Personal Settings** (Parámetros personales).

{{< img src="account_management/org_switching_062024.png" alt="Dos formas de conmutar entre organizaciones" style="width:90%;" >}}

Por motivos de seguridad, debes tener una sesión válida para cada organización a la que cambies. Si no tienes una sesión activa, debes autenticarte con un nombre de usuario y contraseña o mediante SAML.

1. **Enfoques de autenticación mixta**: En los casos en los que dispongas tanto de autenticación SAML como de nombre de usuario y contraseña, deberás iniciar sesión con el tipo requerido por cada organización (nombre de usuario y contraseña, o SAML) en lugar de iniciar sesión en una y obtener acceso a todas.

2. **SAML estricto**: si tu organización está configurada para [SAML Estricto][2], debes autenticarte con SAML. Deberás volver a autenticarte cada vez que cambies de organización. Dado que los IdP mantienen las sesiones, esto suele ser una redirección.

## Restablecer contraseñas de usuarios multiorganización

Se comparte una contraseña entre organizaciones para cada usuario multiorganización. Si restableces tu contraseña, el cambio afectará a todas las organizaciones a las que pertenezcas.

**Nota**: No puedes utilizar la misma contraseña dos veces.

## Solucionar problemas

Si tienes un problema y no puedes iniciar sesión, intenta lo siguiente:

1. Vuelve a introducir o restablece tu contraseña, aunque no hayas necesitado hacer esto antes.

2. Comprueba con un miembro administrador de tu equipo si esta cuenta requiere un nombre de usuario y contraseña, SAML o Google OAuth para asegurarte de que estás utilizando el enfoque correcto.

3. Comprueba con un miembro administrador de tu equipo si esta cuenta requiere un nombre de usuario y contraseña, SAML o Google OAuth para asegurarte de que estás utilizando el enfoque correcto.

Si los pasos anteriores de solucionar problemas fallan, ponte en contacto con el [equipo de soporte de Datadog][3] e indícales el comportamiento esperado y lo que has intentado hasta ahora.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/personal-settings/organizations
[2]: /es/account_management/saml/#saml-strict
[3]: /es/help/
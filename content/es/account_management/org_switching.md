---
title: Cambiar de una organización a otra
---

En los casos en los que pertenezcas a varias organizaciones de Datadog, puedes utilizar el conmutador de organización que aparece en la parte inferior izquierda de la barra de navegación para cambiar de una a otra. También puedes ver todas las organizaciones y cambiar entre ellas en la pestaña **Organizations** (Organizaciones) de **Personal Settings** (Parámetros personales).

{{< img src="account_management/org_switching.png" alt="Dos formas de cambiar de una organización a otra" style="width:70%;" >}}

Por motivos de seguridad, debes tener una sesión válida para cada organización a la que cambies. Si no tienes una sesión activa, debes autenticarte con un nombre de usuario y contraseña o mediante SAML.

1. **Enfoques de autenticación mixta**: En los casos en los que dispongas tanto de autenticación SAML como de nombre de usuario y contraseña, deberás iniciar sesión con el tipo requerido por cada organización (nombre de usuario y contraseña, o SAML) en lugar de iniciar sesión en una y obtener acceso a todas.

2. **SAML estricto**: Si tu organización está configurada para aplicar [SAML estricto][1], debes autenticarte con SAML. Asimismo, tendrás que volver a autenticarte cada vez que cambies de organización. Dado que los IdP mantienen las sesiones, esto suele ser una redirección.

## Restablecer contraseñas de usuarios multiorganización

Se comparte una contraseña entre organizaciones para cada usuario multiorganización. Si restableces tu contraseña, el cambio afectará a todas las organizaciones a las que pertenezcas.

**Nota**: No puedes utilizar la misma contraseña dos veces.

## Solucionar problemas

Si tienes un problema y no puedes iniciar sesión, intenta lo siguiente:

1. Vuelve a introducir o restablece tu contraseña, aunque no hayas necesitado hacer esto antes.

2. Comprueba con un miembro administrador de tu equipo si esta cuenta requiere un nombre de usuario y contraseña, SAML o Google OAuth para asegurarte de que estás utilizando el enfoque correcto.

3. Comprueba con un miembro administrador de tu equipo si esta cuenta requiere un nombre de usuario y contraseña, SAML o Google OAuth para asegurarte de que estás utilizando el enfoque correcto.

Si los pasos anteriores para solucionar problemas fallan, contacta con el [equipo de asistencia de Datadog][2] para informarlo sobre el comportamiento esperado y lo que has intentado hasta ahora.

[1]: /es/account_management/saml/#saml-strict
[2]: /es/help/
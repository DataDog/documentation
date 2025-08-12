---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: Blog
  text: Mejora tu prestación de servicios con los widgets de dashboard móviles de
    Datadog
title: Datadog para Intune
---

Esta guía proporciona instrucciones paso a paso para configurar e implementar la aplicación móvil Datadog para Intune en tu organización.

## Requisitos previos
Antes de empezar, asegúrate de que se cumplen los siguientes requisitos:

- Tienes permisos de administrador en **Intune, Azure y Datadog**
- Los usuarios deben descargar e instalar la aplicación **Datadog para Intune** de su tienda de aplicaciones móviles o de la tienda de Microsoft Partner.

Quienes quieran crear una configuración personalizada utilizando el ID del paquete de la aplicación móvil, pueden consultar los enlaces siguientes:

| Plataforma   | Enlace a la tienda                                                                                            | ID del paquete                    |
|------------|-------------------------------------------------------------------------------------------------------|-----------------------------|
| iOS/iPadOS | [Datadog Intune en la App Store](https://apps.apple.com/app/datadog-intune/id1673106321)             | com.datadog.flagship-intune |
| Android    | [Datadog Intune en Google Play](https://play.google.com/store/apps/details?id=com.datadog.app.intune) | com.datadog.app.intune      |

## Configuración inicial de Datadog para Intune
Para empezar, un administrador de Intune y Azure necesita configurar los parámetros necesarios. Estos son los pasos **mínimos** necesarios para garantizar que Datadog para Intune funcione correctamente. Las políticas adicionales, como las de configuración o acceso condicional, se pueden configurar más adelante.

### Paso 1: Añadir Datadog para Intune al centro de administración de Microsoft Intune
1. Abre el [centro de administración de Microsoft Intune][1], ve a la pestaña **Aplicaciones** y haz clic en **Add** (Añadir) en el **tipo de aplicación** correspondiente (iOS/iPadOS o Android):
   - Para iOS/iPadOS: Selecciona **"iOS store app"** y luego busca "Datadog Intune".
   - Para Android: Selecciona **"Android store app"** y luego copia los datos necesarios de la [página de Google Play store][2].
2. Asigna la aplicación a los usuarios o grupos pertinentes.

Para obtener una guía adicional sobre cómo agregar una aplicación a Intune, lee la [guía de inicio rápido de Intune][3] de Microsoft.

### Paso 2: Aplicar una política de protección de aplicaciones
Para permitir que los usuarios se registren e inicien sesión de forma segura, debe aplicarse una **Política de protección de aplicaciones**. Esto garantiza que el acceso a la aplicación esté protegido por la configuración de seguridad de Microsoft Intune.

1. En el [centro de administración][1], ve a la pestaña **Aplicaciones** y selecciona **Políticas de protección de las aplicaciones**.
2. Crea un política para la plataforma adecuada (iOS y Android requieren políticas separadas).
3. Haz clic en **Select custom apps** (Seleccionar aplicaciones personalizadas) y añade **Datadog Intune** a la política. Si no puedes verlo, asegúrate de haber completado el [paso 1](#step-1-add-datadog-for-intune-to-microsoft-intune-admin-center).
4. Configura tus **parámetros de seguridad** y asigna la política a usuarios o grupos específicos.
5. Haz clic en **Save** (Guardar).

**Nota:** La nueva política de protección de aplicaciones puede tardar algún tiempo en aplicarse a todos los dispositivos. Puedes verificar la configuración siguiendo [la guía de Microsoft][5].

### Paso 3: Conceder el consentimiento de administración a tu organización
En este paso, cambia del centro de administración de Intune al portal de Azure para Microsoft Entra-ID.

El consentimiento de administración es necesario para que los usuarios puedan registrarse correctamente. Sigue estos pasos:

1. Abre [Microsoft Entra-ID][7] (antes Azure Active Directory) y ve a **Aplicaciones empresariales**.
2. Busca **"Datadog"**:
   - Si no aparece en la lista, haz clic en **Add** (Añadir) y luego busca "Datadog" en Microsoft Entra Gallery.
3. Selecciona **Permisos** y luego haz clic en **Grant admin consent for \<your organization name\>** (Conceder permiso a -nombre de tu organización-).

Para obtener ayuda adicional con los parámetros de gestión de aplicaciones, consulta la [documentación de Microsoft][8].

**Nota:** Si tu organización tiene varias aplicaciones "Datadog" configuradas, la que gestiona el acceso a la web y a las aplicaciones móviles tiene el ID de aplicación **f21cb7e8-00ab-4b0e-aa94-b1e2f674606d**.

#### Datadog para los permisos requeridos por Intune
Los permisos se añaden automáticamente al configurar la aplicación:

| Nombre                                    | Valor del argumento                              | Permiso                                      | Tipo      |
|-----------------------------------------|------------------------------------------|-------------------------------------------------|-----------|
| Microsoft Graph                         | `User.Read`                              | Iniciar sesión y leer el perfil de usuario                   | Delegado |
| Gestión de aplicaciones móviles de Microsoft | `DeviceManagementManagedApps.ReadWrite`  | Leer y escribir en el dispositivo de gestión de aplicaciones del usuario | Delegado |

**Notas:**
- La aplicación móvil sólo utiliza estos dos permisos. Al conceder el consentimiento es posible que veas más permisos, ya que la aplicación móvil comparte la misma aplicación Microsoft Entra que la aplicación web y la [integración Microsoft Teams](https://docs.datadoghq.com/integrations/microsoft_teams). Si no la estás utilizando, puedes revocar esos permisos desde la pestaña **Permisos** en la página del [paso 3](#step-3-grant-admin-consent-for-your-organization).
- Aunque `DeviceManagementManagedApps.Read` existe, es un permiso de la API MS Graph y la aplicación móvil requiere un permiso MAM. `DeviceManagementManagedApps.ReadWrite` es el único permiso MAM disponible, pero la aplicación móvil sólo lee y no escribe nada.

## Despliegue de Datadog Intune en dispositivos móviles
Para desplegar en dispositivos Android, los usuarios deben instalar lo siguiente:

- La [aplicación Portal de empresa Microsoft][9]
- [Datadog - Intune][10]

Para dispositivos iOS, sólo se requiere [Datadog - Intune][11], pero la aplicación [Portal de empresa][12] puede instalarse opcionalmente.

En ambas plataformas, la aplicación **Microsoft Authenticator** puede ayudar con el inicio de sesión, si está instalada.

## Solucionar problemas

### Registro de dispositivos
Si los usuarios encuentran problemas al registrar sus dispositivos para Datadog Intune, los administradores deben verificar las siguientes configuraciones:

- Se ha concedido el **consentimiento de administración** en Microsoft Entra-ID.
- Se asigna al usuario una **política de protección de aplicaciones**.
  - **Nota**: Las actualizaciones de políticas pueden tardar algún tiempo en llegar a los dispositivos.
- Si existe una **política de configuración de aplicaciones** exclusiva, asegúrate de que contiene las claves y los valores correctos.

Si persisten los problemas de registro, ponte en contacto con nosotros en [support@datadoghq.com][14] con los diagnósticos de Intune adjuntos. Para recopilar los diagnósticos:

1. En la pantalla de inicio de sesión, pulsa **View Intune Diagnostics.** (Ver diagnósticos de Intune).
2. Selecciona **Iniciar** y luego **Compartir logs**.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://intune.microsoft.com/
[2]: https://play.google.com/store/apps/details?id=com.datadog.app.intune
[3]: https://learn.microsoft.com/en-us/mem/intune/apps/quickstart-add-assign-app
[4]: https://docs.microsoft.com/en-us/mem/intune/apps/app-protection-policy-delivery
[5]: https://docs.microsoft.com/en-us/mem/intune/apps/app-protection-policies-validate
[6]: https://learn.microsoft.com/en-us/entra/identity-platform/application-consent-experience
[7]: https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/Overview
[8]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/
[9]: https://play.google.com/store/apps/details?id=com.microsoft.windowsintune.companyportal
[10]: https://play.google.com/store/apps/details?id=com.datadog.app.intune
[11]: https://apps.apple.com/app/datadog-intune/id1673106321
[12]: https://apps.apple.com/app/intune-company-portal/id719171358
[13]: https://docs.datadoghq.com/es/mobile/enterprise_configuration/
[14]: mailto:support@datadoghq.com
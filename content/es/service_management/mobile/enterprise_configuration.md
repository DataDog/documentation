---
aliases:
- /es/mobile/enterprise-configuration
further_reading:
- link: /monitors/
  tag: Documentación
  text: Guías
- link: /dashboards/
  tag: Documentación
  text: PHP
- link: https://www.datadoghq.com/blog/datadog-mobile-widgets/
  tag: Blog
  text: Mejora tu prestación de servicios con los widgets de dashboard móviles de
    Datadog
kind: documentation
title: Configuración de Enterprise
---
La aplicación móvil de Datadog es totalmente compatible con [AppConfig][1] y los proveedores de gestión de dispositivos móviles (MDM) compatibles con AppConfig.

## Funciones compatibles

La aplicación móvil es compatible con todas las funciones predeterminadas de MDM para [iOS][2] y [Android][3], así como con las siguientes funciones específicas:

| Clave | Descripción |Tipo|Valor por defecto| 
|---------|---------|-----|-----|
|`datadogDefaultLoginOrganizationUUID`|Define el UUID de la organización `dd_oid` que se pasa como parámetro durante el inicio de sesión.|Cadena|nulo|
|`datadogDefaultLoginOrganizationPublicID`|Define la organización `public_id` (disponible a través del [endpoint de la API para enumerar tus organizaciones gestionadas][4]) pasada como parámetro durante el inicio de sesión. Si se ha definido `datadogDefaultLoginOrganizationUUID`, tiene prioridad sobre `public_id`.|Cadena|nulo|
|`disableSharing`|Desactiva el uso compartido de contenidos desde la aplicación.|Booleano|false|
|`disableHomeScreenWidgets`|Deshabilita el acceso a los widgets de la pantalla de inicio (y en su lugar muestra "deshabilitado por tu organización").|Booleano|false|

Para obtener más información sobre las funciones predeterminadas, consulta la documentación de tu proveedor de gestión de dispositivos móviles.

## Casos de uso

### Opciones de inicio de sesión específicas de la organización
La aplicación móvil te permite configurar la información de la organización para mostrar una página de inicio de sesión dedicada a la aplicación móvil si tu organización tiene un subdominio dedicado, u opciones dedicadas para que los usuarios se autentiquen. Por ejemplo, la aplicación móvil te permite desactivar Google SSO y la autenticación por correo electrónico/contraseña o añadir un botón de inicio de sesión SAML específico. 

Puedes configurar `datadogDefaultLoginOrganizationPublicID` o `datadogDefaultLoginOrganizationUUID` para identificar la organización predeterminada que se pasa como parámetro durante el inicio de sesión; si se establecen ambos, `datadogDefaultLoginOrganizationUUID` tiene prioridad.

`datadogDefaultLoginOrganizationPublicID` está disponible a través de la API.  

`datadogDefaultLoginOrganizationUUID` está disponible haciendo clic en **Log in to Mobile App** (Iniciar sesión en la aplicación móvil) desde **Personal Settings > My Organizations** (Configuración personal > Mis organizaciones).

### Prevención de filtración de datos de tus usuarios
Si te preocupa el riesgo de filtración de datos de los usuarios, puedes desactivar la función de copiar/pegar y las capturas de pantalla mediante las configuraciones estándar (para [iOS][2] y [Android][3]). Para mitigar aún más el riesgo de filtración de datos, la aplicación móvil de Datadog ofrece las siguientes funciones que puedes activar:  

- **Desactivar el uso compartido desde la aplicación**, que elimina todos los botones para compartir de las páginas de producto de la aplicación móvil de Datadog.  
    *Nota Los botones para compartir de la aplicación móvil crean un enlace a la página del producto correspondiente que requiere autenticación para visualizarlo. Evalúa si este control predeterminado es suficiente; desactivar el uso compartido desde la aplicación móvil puede impedir la colaboración de tus equipos mediante la aplicación móvil.
- **Desactivación de los widgets de la pantalla de inicio**, que muestra "Desactivado por tu organización" en el widget de la pantalla de inicio en lugar de los datos reales de tus monitores, incidencias, SLO o dashboards.

### Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.appconfig.org/
[2]: https://www.appconfig.org/ios.html
[3]: https://www.appconfig.org/android.html
[4]: https://docs.datadoghq.com/es/api/latest/organizations/#list-your-managed-organizations
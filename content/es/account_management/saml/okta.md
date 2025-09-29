---
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configurar SAML para tu cuenta de Datadog
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configurar equipos y organizaciones con varias cuentas
title: Configuración del poveedor de identidad Okta SAML
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    En el sitio {{< region-param key="dd_site_name" >}}, debes configurar manualmente la aplicación Datadog en Okta siguiendo las <a href="/account_management/FAQ/okta/">instrucciones heredadas </a>. Ignora las instrucciones de esta página sobre la aplicación Datadog preconfigurada en el catálogo de aplicaciones de Okta.
</div>
{{% /site-region %}}

## Información general

En esta página se explica cómo configurar la aplicación Datadog en Okta. 

Antes de continuar, asegúrate de estar utilizando la última versión de la aplicación Datadog:
1. En Okta, haz clic en **Aplicaciones**.
1. Abre la aplicación Datadog.
1. 2. Selecciona la pestaña **General**.
1. 2. Busca el campo **SSO Base URL**.

{{< img src="account_management/saml/okta/sso_base_url.png" alt="Configuración de la aplicación Datadog en Okta, que destaca la SSO base URL" style="width:80%;" >}}

Si no ves el campo URL Base SSO, configura Okta utilizando las [instrucciones heredadas][1].

## Funciones admitidas

La integración de Datadog Okta SAML es compatible con lo siguiente:
- SSO iniciado por IdP
- SSO iniciado por el SP
- Aprovisionamiento de JIT

Para las definiciones de los términos anteriores, consulta el  [glosario][2] de Okta.

## Configuración

Configura Okta como el proveedor de identidad (IdP) SAML para Datadog con las siguientes instrucciones. El proceso de configuración requiere que alternes entre tus cuentas de Okta y Datadog.

### Añadir la integración de Datadog en Okta

1. Inicia sesión en tu dashboard de administrador de Okta.
1. En la navegación de la izquierda, haz clic en **Aplicaciones**.
1. Haz clic en **Buscar en el catálogo de aplicaciones**.
1. Utiliza la barra de búsqueda para buscar "Datadog".
1. 2. Selecciona la aplicación Datadog para SAML y SCIM.
1. Haz clic en **Añadir integración**. Aparece el cuadro de diálogo Configuración general.
1. Completa el campo **SSO Base URL** con tu [URL del sitio web de Datadog][3].
1. Haz clic en **Hecho**.

**Nota:** El campo URL base SSO acepta subdominios personalizados si no utilizas una URL del sitio web Datadog estándar.

A continuación, descarga los detalles de metadatos para cargarlos en Datadog:
1. En el cuadro de diálogo de configuración de la aplicación Datadog en Okta, haz clic en la pestaña **Iniciar sesión**.
1. Desplázate hacia abajo hasta que veas la **URL de metadatos**.
1. Haz clic en **Copiar**.
1. Abre una nueva pestaña de navegador y pega la URL de metadatos en la barra de direcciones.
1. Utiliza el navegador para guardar el contenido de la URL de metadatos como un archivo XML.

{{< img src="account_management/saml/okta/metadata_url.png" alt="Inicia sesión en configuración in Okta" style="width:80%;" >}}

### Configurar Datadog

#### Cargar detalles de metadatos

1. Ve a [Métodos de inicio de sesión][4] en Parámetros de organización.
1. 2. En el componente SAML, haz clic en **Configurar** o **Actualizar**, según si has configurado SAML previamente. Aparecerá la page (página) de configuración de SAML.
1. Haz clic en **Seleccionar archivo** y selecciona el archivo de metadatos que descargaste previamente de Okta.

{{< img src="account_management/saml/okta/choose_file.png" alt="Configuración de SAML en Datadog, que destaca el botón de carga de metadatos" style="width:100%;" >}}

#### Activar inicio de sesión iniciado por IdP

Para que la aplicación Datadog funcione correctamente, debes activar el inicio de sesión iniciado por IdP.

<div class="alert alert-info">Después de activar el inicio de sesión iniciado por IdP, los usuarios pueden iniciar sesión en Datadog desde Okta</div>

Para activar el inicio de sesión iniciado por IdP, ejecuta los siguientes pasos:
1. Ve a la página de [configuración de SAML][5].
1. En **Additional Features* (Características adicionales), haz clic en la casilla checkpara **Identity Provider (IdP) Initiated Login** (Inicio de sesión iniciado por el proveedor de identidad (IdP)). El componente muestra la **URL del servicio de consumidor para aserción**.
1. El contenido de la URL del servicio de consumidor de aserciones después de `/saml/assertion` es el ID de tu empresa. Introduce este valor con el prefijo `/id/` en Okta para finalizar tu configuración.
1. Haz clic en **Save Changes** (Guardar cambios).

{{< img src="account_management/saml/okta/company_id.png" alt="Configuración de SAML en Datadog, donde se resalta la parte del ID de empresa de la URL del servicio de consumidor para aserción" style="width:100%;" >}}

Vuelve a Okta para ver la siguiente serie de pasos de configuración.

### Añade el ID de la empresa en Okta

1. Regresa al dashboard de administrador de Okta.
1. Selecciona la pestaña **Iniciar sesión**.
1. Haz clic en **Edit** (Editar).
1. Desplázate hasta la sección **Advanced Sign-on Settings** (Configuración avanzada del inicio de sesión).
1. Pega el ID completo de tu empresa, incluido el prefijo `/id/`, en el campo **ID de la empresa** (`/id/XXXXXX-XXXX-XXX-XXXX-XXXXXXX`).
1. Haz clic en **Save** (Guardar).

## Inicio de sesión iniciado por el proveedor de servicios (SP)

Para iniciar sesión en Datadog utilizando el inicio de sesión iniciado por el proveedor de servicios (SSO iniciado por SP), necesitas la URL de inicio de sesión único (SSO). Puedes encontrar tu URL de SSO de dos formas: en la página de configuración de SAML o a través del correo electrónico.

### Página de configuración de SAML
La página [página de configuración de SAML][5] en Datadog muestra la URL de SSO junto al encabezado **Single Sign-on URL** (Inicio de sesión único).

### Correo electrónico
1. Ve a la URL del sitio web Datadog correspondiente a tu organización.
1. Selecciona **Using Single Sign-On ?** (¿Utilizar el inicio de sesión único?).
1. Introduce tu dirección de correo electrónico y haz clic en **Next** (Siguiente).
1. En tu correo electrónico, busca un mensaje que contenga la URL de SSO, que aparece como **Login URL**.

Una vez que encuentres tu URL de SSO de cualquiera de los métodos, márcala para futuras referencias.

## Asignación de roles SAML

Sigue los pasos que se indican a continuación para asignar atributos de Okta a entidades de Datadog. Este paso es opcional.

1. Ve al dashboard de administrador de Okta.
1. Selecciona la pestaña **Iniciar sesión**.
1. Haz clic en **Edit** (Editar).
1. Rellena los **Atributos** con tus [sentencias de atributos de grupo][6].
1. Configura las [asignaciones][7] elegidas en Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/faq/okta/
[2]: https://help.okta.com/en/prod/Content/Topics/Reference/glossary.htm
[3]: /es/getting_started/site/#access-the-datadog-site
[4]: https://app.datadoghq.com/organization-settings/login-methods
[5]: https://app.datadoghq.com/organization-settings/login-methods/saml
[6]: /es/account_management/faq/okta/#group-attribute-statements-optional
[7]: /es/account_management/saml/mapping/
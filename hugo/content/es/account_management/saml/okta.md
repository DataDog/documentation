---
description: Configure Okta como proveedor de identidad SAML para Datadog con SSO
  iniciado por IdP y SP, aprovisionamiento JIT y configuración de asignación de roles.
further_reading:
- link: /account_management/saml/
  tag: Documentación
  text: Configure SAML para su cuenta de Datadog
- link: /account_management/multi_organization/
  tag: Documentación
  text: Configuración de Teams y organizaciones con múltiples cuentas
title: Configuración del proveedor de identidad SAML de Okta
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
    En el {{< region-param key="dd_site_name" >}} sitio, debe configurar manualmente la aplicación Datadog en Okta usando las <a href="/account_management/faq/okta/">instrucciones heredadas</a>. Ignore las instrucciones de esta página sobre la aplicación Datadog preconfigurada en el catálogo de aplicaciones de Okta.
</div>
{{% /site-region %}}

## Descripción general {#overview}

Esta página le indica cómo configurar la aplicación Datadog en Okta. 

Antes de continuar, asegúrese de estar utilizando la versión más reciente de la aplicación Datadog:
1. En Okta, haga clic en {{< ui >}}Applications{{< /ui >}}.
1. Abra la aplicación Datadog.
1. Seleccione la pestaña {{< ui >}}General{{< /ui >}}.
1. Busque un campo etiquetado como {{< ui >}}SSO Base URL{{< /ui >}}.

{{< img src="account_management/saml/okta/sso_base_url.png" alt="Configuración de la aplicación Datadog en Okta, resaltando la URL base de SSO" style="width:80%;" >}}

Si no ve el campo SSO Base URL, configure Okta usando las [instrucciones heredadas][1].

## Funciones compatibles {#supported-features}

La integración de Datadog con Okta SAML admite lo siguiente:
- SSO iniciado por IdP
- SSO iniciado por SP
- Aprovisionamiento JIT

Para obtener definiciones de los términos anteriores, consulte el [glosario][2] de Okta.

## Configuración {#setup}

Configure Okta como el proveedor de identidad (IdP) SAML para Datadog siguiendo las siguientes instrucciones. El proceso de configuración requiere que alterne entre sus cuentas de Okta y Datadog.

<div class="alert alert-info">La dirección de correo electrónico que Okta envía a Datadog debe coincidir exactamente con el identificador del usuario en Datadog.</div>

### Agregue la integración de Datadog en Okta {#add-the-datadog-integration-in-okta}

1. Inicie sesión en su panel de administración de Okta.
1. En el panel de navegación izquierdo, haga clic en {{< ui >}}Applications{{< /ui >}}.
1. Haga clic en {{< ui >}}Browse App Catalog{{< /ui >}}.
1. Utilice la barra de búsqueda para buscar "Datadog".
1. Seleccione la aplicación Datadog para SAML y SCIM.
1. Haga clic en {{< ui >}}Add Integration{{< /ui >}}. Aparece el cuadro de diálogo General Settings.
1. Rellene el campo {{< ui >}}SSO Base URL{{< /ui >}} con su [URL del sitio web de Datadog][3].
1. Haga clic en {{< ui >}}Done{{< /ui >}}.

**Nota:** El campo SSO Base URL acepta subdominios personalizados si no está utilizando una URL estándar del sitio web de Datadog.

A continuación, descargue los detalles de los metadatos para cargarlos en Datadog:
1. Mientras esté en el cuadro de diálogo de configuración de la aplicación Datadog en Okta, haga clic en la pestaña {{< ui >}}Sign on{{< /ui >}}.
1. Desplácese hacia abajo hasta que vea {{< ui >}}Metadata URL{{< /ui >}}.
1. Haga clic en {{< ui >}}Copy{{< /ui >}}.
1. Abra una nueva pestaña del navegador y pegue la URL de los metadatos en la barra de direcciones.
1. Utilice su navegador para guardar el contenido de la URL de los metadatos como un archivo XML.

{{< img src="account_management/saml/okta/metadata_url.png" alt="Configuración de inicio de sesión en Okta" style="width:80%;" >}}

### Configure Datadog {#configure-datadog}

#### Cargar detalles de metadatos {#upload-metadata-details}

1. Vaya a [Login Methods][4] en Organization Settings.
1. En el componente SAML, haga clic en {{< ui >}}Configure{{< /ui >}} o {{< ui >}}Update{{< /ui >}}, dependiendo de si ha configurado SAML anteriormente. Aparece la página de configuración de SAML.
1. Haga clic en {{< ui >}}Choose File{{< /ui >}} y seleccione el archivo de metadatos que descargó anteriormente de Okta.

{{< img src="account_management/saml/okta/choose_file.png" alt="Configuración de SAML en Datadog, resaltando el botón de carga de metadatos" style="width:100%;" >}}

#### Activar el inicio de sesión iniciado por el IdP {#activate-idp-initiated-login}

Para que la aplicación Datadog funcione correctamente, debe activar el inicio de sesión iniciado por el IdP.

<div class="alert alert-info">Después de activar el inicio de sesión iniciado por el IdP, los usuarios pueden iniciar sesión en Datadog desde Okta</div>

Para activar el inicio de sesión iniciado por el IdP, siga estos pasos:
1. Navegue a la [página de configuración de SAML][5].
1. En {{< ui >}}Additional Features{{< /ui >}}, haga clic en la casilla de verificación para {{< ui >}}Identity Provider (IdP) Initiated Login{{< /ui >}}. El componente muestra {{< ui >}}Assertion Consumer Service URL{{< /ui >}}.
1. El contenido de Assertion Consumer Service URL después de `/saml/assertion` es el ID de su empresa. Ingrese este valor con el prefijo `/id/` en Okta para finalizar la configuración.
1. Haga clic en {{< ui >}}Save Changes{{< /ui >}}.

{{< img src="account_management/saml/okta/company_id.png" alt="Configuración de SAML en Datadog, resaltando la parte del ID de la empresa de la URL del servicio de consumo de aserciones" style="width:100%;" >}}

Regrese a Okta para el siguiente conjunto de pasos de configuración.

### Agregue el ID de la empresa en Okta {#add-the-company-id-in-okta}

1. Regrese al panel de administración de Okta.
1. Seleccione la pestaña {{< ui >}}Sign on{{< /ui >}}.
1. Haga clic en {{< ui >}}Edit{{< /ui >}}.
1. Desplácese hacia abajo hasta la sección {{< ui >}}Advanced Sign-on Settings{{< /ui >}}.
1. Pegue su ID de empresa completo, incluido el prefijo `/id/`, en el campo {{< ui >}}Company ID{{< /ui >}} (`/id/XXXXXX-XXXX-XXX-XXXX-XXXXXXX`).
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Inicio de sesión iniciado por el proveedor de servicios (SP) {#service-provider-sp-initiated-login}

Para iniciar sesión en Datadog mediante el inicio de sesión iniciado por el proveedor de servicios (SSO iniciado por SP), necesita la URL de inicio de sesión único (SSO). Puede encontrar su URL de SSO de dos maneras: en la página de configuración de SAML o a través de correo electrónico.

### Página de configuración de SAML {#saml-configuration-page}
La [página de configuración de SAML][5] de Datadog muestra la URL de SSO junto al encabezado {{< ui >}}Single Sign-on URL{{< /ui >}}.

### Correo electrónico {#email}
1. Navegue a la URL del sitio web de Datadog para su organización.
1. Seleccione {{< ui >}}Using Single Sign-On?{{< /ui >}}.
1. Ingrese su dirección de correo electrónico y haga clic en {{< ui >}}Next{{< /ui >}}.
1. Revise su correo electrónico para ver un mensaje que contenga la URL de SSO, que aparece como {{< ui >}}Login URL{{< /ui >}}.

Después de encontrar su URL de SSO mediante cualquiera de los métodos, guárdela en marcadores para futuras consultas.

## Asignación de roles SAML {#saml-role-mapping}

Datadog utiliza la asignación de grupos SAML para asignar atributos de Okta a roles y Teams de Datadog. Este paso es opcional.

**Nota**: La asignación de roles solo está disponible a través de SAML. SCIM aprovisiona usuarios y Teams desde Okta, pero no asigna roles. Para configurar SCIM, consulte [Configurar SCIM con Okta][8].

1. Navegue al panel de administración de Okta.
1. Seleccione la pestaña {{< ui >}}Sign on{{< /ui >}}.
1. Haga clic en {{< ui >}}Edit{{< /ui >}}.
1. En {{< ui >}}Attributes{{< /ui >}}, agregue una declaración de atributo de grupo llamada `memberOf`, con el formato de nombre {{< ui >}}Unspecified{{< /ui >}} y el valor `.*` para recuperar todos los grupos. Comuníquese con su administrador de IdP si necesita limitar más el contexto.
1. Configure las [asignaciones][7] que desee en Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/faq/okta/
[2]: https://help.okta.com/en/prod/Content/Topics/Reference/glossary.htm
[3]: /es/getting_started/site/#access-the-datadog-site
[4]: https://app.datadoghq.com/organization-settings/login-methods
[5]: https://app.datadoghq.com/organization-settings/login-methods/saml
[7]: /es/account_management/saml/mapping/
[8]: /es/account_management/scim/okta/
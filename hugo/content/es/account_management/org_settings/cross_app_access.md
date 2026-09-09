---
algolia:
  tags:
  - cross-app access
  - XAA
  - Okta
  - AI agent
  - MCP
  - ID-JAG
description: Configure Okta Cross-App Access para que los AI Agents puedan llamar
  a la Datadog API en nombre de los usuarios autorizados en Okta.
further_reading:
- link: /mcp_server/setup/
  tag: Documentación
  text: Configure el Datadog MCP Server
- link: /account_management/org_settings/mobile_third_party_access/
  tag: Documentación
  text: Acceso móvil y de terceros
- link: /account_management/saml/
  tag: Documentación
  text: Configure el inicio de sesión único SAML
title: Acceso entre aplicaciones
---
{{< callout url="#" btn_hidden="true" header="false">}}
  El acceso entre aplicaciones está en versión preliminar. Okta controla el acceso a la versión preliminar y lo habilita para su inquilino, y las capacidades de Okta de las que depende esta configuración aún no están disponibles de forma general. Cualquier organización de Datadog puede habilitar el acceso entre aplicaciones en el lado de Datadog hoy mismo.
{{< /callout >}}

## Resumen {#overview}

El acceso entre aplicaciones (XAA) permite que los AI Agents llamen a la Datadog API en nombre de los usuarios que su organización ya autorizó en Okta. Sin esto, cada usuario autoriza al Agent de forma individual a través de una pantalla de consentimiento del navegador. Con esto, su administrador de Okta otorga ese acceso una vez, de forma centralizada, y los usuarios omiten el paso de consentimiento por usuario.

Okta emite al Agent un token de corta duración llamado ID-JAG (Identity Assertion JWT Authorization Grant). El Agent presenta este token a Datadog, y Datadog lo intercambia por un token de acceso propiedad del usuario que inició la llamada. Debido a que Okta genera el token, sus administradores otorgan y revocan el acceso de Datadog para los AI Agents desde Okta.

En la versión preliminar, el acceso entre aplicaciones admite a Okta como el único proveedor de identidad y a Claude como el único Agent.

## Valores que intercambia {#values-you-exchange}

La configuración mueve valores en ambas direcciones entre Datadog y Okta. Dos de ellos son URL de emisor que nombran diferentes sistemas, así que confirme que ingresa cada uno en el lugar correcto.

| Valor                               | Dirección       | Dónde ingresarlo                                                                        |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| UUID de la organización de Datadog           | Datadog a Okta | Aplicación de Datadog en Okta: {{< ui >}}Resource Server{{< /ui >}} pestaña > {{< ui >}}Audience/tenant ID{{< /ui >}}              |
| ID de cliente del Agent                     | Datadog a Okta | Okta AI Agent: {{< ui >}}Resource Connection{{< /ui >}} > {{< ui >}}Client ID at resource{{< /ui >}}                         |
| URL de recurso y URL de emisor de Datadog | Datadog a Okta | Aplicación de Datadog en Okta: {{< ui >}}Resource Server{{< /ui >}} pestaña > {{< ui >}}Resource URL{{< /ui >}} y {{< ui >}}Issuer URL{{< /ui >}} |
| URL del emisor del inquilino de Okta              | Okta a Datadog | Datadog: {{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}, {{< ui >}}Issuer URL{{< /ui >}}                      |

## Requisitos previos {#prerequisites}

- Su organización utiliza Okta para el inicio de sesión único SAML en Datadog. El acceso entre aplicaciones resuelve usuarios a través de su conexión SAML existente, por lo que no funciona sin una. Consulte [Configurar el inicio de sesión único SAML](/account_management/saml/).
- Cada usuario que utiliza Claude existe en su organización de Datadog y está asignado tanto a la aplicación Claude como a la aplicación Datadog en Okta.
- Tiene el permiso `org_management` en Datadog. Para configurar el acceso entre aplicaciones a través de la API en lugar de la interfaz de usuario, también necesita un [Token de acceso personal](/account_management/personal-access-tokens/) (PAT), que se utiliza como `DD_TOKEN` en los ejemplos.
- Su inquilino de Okta tiene habilitadas las funciones de acceso anticipado {{< ui >}}AI Agent Identity Assertion{{< /ui >}} y {{< ui >}}Agent to Agent Connections{{< /ui >}}, y usted tiene acceso de Superadministrador de Okta.

## Configurar el acceso entre aplicaciones en Datadog {#configure-cross-app-access-in-datadog}

Complete los pasos de Datadog antes que los pasos de Okta. Datadog rechaza los tokens de las organizaciones que no han habilitado el acceso entre aplicaciones, por lo que configurar Okta primero producirá errores hasta que termine aquí.

Navegue a [{{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/cross-app-access).

{{< img src="account_management/cross_app_access/cross-app-access-settings.png" alt="Página de acceso entre aplicaciones en la Configuración de la organización, que muestra el estado de habilitación, el campo URL del emisor, el UUID de la organización y la tabla de ID de cliente registrados" style="width:100%;">}}

### Habilitar el acceso entre aplicaciones {#enable-cross-app-access}

Haga clic en {{< ui >}}Enable{{< /ui >}}. Esto se aplica a toda su organización. Haga clic en {{< ui >}}Disable{{< /ui >}} para desactivar el Acceso entre aplicaciones más tarde.

### Establezca su URL de emisor de Okta {#set-your-okta-issuer-url}

En el campo {{< ui >}}Issuer URL{{< /ui >}}, ingrese la URL de emisor de su propio inquilino de Okta y luego haga clic en {{< ui >}}Save{{< /ui >}}. Datadog deriva la ubicación de las claves de firma de token a partir de este valor, por lo que debe ser exacto.

La URL de emisor debe cumplir con todo lo siguiente, o Datadog la rechazará:

- Use `https`.
- Use un subdominio de `.okta.com`, `.oktapreview.com` o `.okta-emea.com`. Datadog rechaza el dominio raíz, por lo que `example.okta.com` funciona y `okta.com` no funciona.

Haga clic en {{< ui >}}Remove{{< /ui >}} para quitar el emisor. Datadog deja de aceptar tokens después de que usted lo elimine.

### Copie el UUID de su organización {#copy-your-organization-uuid}

Copie el valor en el campo {{< ui >}}Org UUID{{< /ui >}}. Okta envía este valor como la reclamación `aud_tenant`, la cual le indica a Datadog a qué organización apunta un token cuando varias organizaciones comparten un mismo inquilino de Okta. No es lo mismo que el ID de compañía que Okta solicita en otros lugares.

### Copie el ID de cliente del Agent {#copy-the-agent-client-id}

La tabla {{< ui >}}Registered client IDs{{< /ui >}} enumera todos los Agents que Datadog admite para el acceso entre aplicaciones y el ID de cliente OAuth que utiliza cada uno. Copie el ID de cliente para el Agent que está configurando. Usted lo ingresará en Okta como {{< ui >}}Client ID at resource{{< /ui >}}.

Datadog agrega Agents a esta tabla a medida que los admite, así que consulte la tabla en lugar de reutilizar un ID de cliente de otra fuente.

Haga clic en {{< ui >}}Manage app{{< /ui >}} en una fila para abrir la configuración del contexto para ese Agent. Consulte [ Control del contexto en Datadog](#control-scopes-in-datadog).

{{% collapse-content title="Opcional: configurar con la API" level="h3" expanded=false %}}

Utilice estas llamadas para programar la configuración. Hacen lo mismo que el botón {{< ui >}}Enable{{< /ui >}} y el campo {{< ui >}}Issuer URL{{< /ui >}}. Ambos requieren un PAT con el permiso `org_management`.

Habilite el acceso entre aplicaciones configurando la configuración de la organización `mcp_cross_app_access_enabled` en `true`. Para desactivarlo más tarde, envíe la misma solicitud con `"value": false`.

```shell
curl -X PATCH "{{< region-param key="dd_api" >}}/api/v2/org_configs/mcp_cross_app_access_enabled" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DD_TOKEN}" \
  -d '{
    "data": {
      "type": "org_configs",
      "attributes": {
        "value": true
      }
    }
  }'
```

Configure la URL del emisor de Okta. Se aplican las mismas reglas de validación, y un valor que las infringe devuelve `400`. Enviar una cadena vacía quita el emisor.

```shell
curl -X PUT "{{< region-param key="dd_api" >}}/api/v2/login/org_configs/mcp_cross_app_access_issuer_url" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DD_TOKEN}" \
  -d '{
    "data": {
      "type": "org_config",
      "attributes": {
        "issuer_url": "https://<YOUR_OKTA_SUBDOMAIN>.okta.com"
      }
    }
  }'
```

Para leer el UUID de su organización desde la API, llame a [{{< region-param key="dd_api" >}}/api/v2/current_user](https://app.datadoghq.com/api/v2/current_user) con una sesión activa en la organización de destino. El UUID es el `id` de la entrada `orgs` en la matriz `included`.

{{% /collapse-content %}}

## Finalice la configuración en Okta {#finish-the-setup-in-okta}

Complete la configuración en la Admin Console de Okta como Superadministrador. Esta sección enumera los valores que Datadog espera y los campos de Okta a los que pertenecen. Consulte [la documentación de Cross-App Access de Okta](https://help.okta.com/oie/en-us/content/topics/apps/apps-cross-app-access.htm) para obtener más detalles. 

### Configure la aplicación de Datadog como un servidor de recursos {#configure-the-datadog-application-as-a-resource-server}

En su aplicación de Datadog, abra la pestaña {{< ui >}}Resource Server{{< /ui >}} y habilite {{< ui >}}Cross-app access (XAA){{< /ui >}}. Configure los siguientes campos.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<p>Los valores a continuación coinciden con su <a href="/getting_started/site/">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}). Para ver los valores de otro sitio, utilice el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página.</p>
<table>
<thead><tr><th>Campo de Okta</th><th>Valor</th></tr></thead>
<tbody>
<tr><td>{{< ui >}}Resource URL{{< /ui >}}</td><td>{{< region-param key="mcp_xaa_resource_url" code="true" >}}</td></tr>
<tr><td>{{< ui >}}Issuer URL{{< /ui >}}</td><td>{{< region-param key="mcp_xaa_issuer_url" code="true" >}}</td></tr>
<tr><td>{{< ui >}}Audience/tenant ID{{< /ui >}}</td><td>UUID de su organización de Datadog</td></tr>
</tbody>
</table>
{{< /site-region >}}

La URL del emisor identifica al servidor de autorización de Datadog, no al punto de conexión del token. Okta lo escribe en la reclamación `aud` de los tokens que emite, y Datadog acepta un token solo cuando esa reclamación coincide.

**Nota**: Cambiar la URL del emisor más adelante requiere eliminar y volver a crear la conexión de recursos descrita en [Conectar Claude a la aplicación de Datadog](#connect-claude-to-the-datadog-application).

### Registrar a Claude como un AI Agent {#register-claude-as-an-ai-agent}

Cree una entrada de AI Agent para Claude en Okta y luego intercambie claves con Anthropic. Anthropic firma las solicitudes que recibe Okta, por lo que Okta necesita la clave pública de Anthropic antes de emitir cualquier token.

1. Crear la entrada del AI Agent para Claude.
2. Asignar propietarios al AI Agent. Okta requiere un propietario antes de que pueda activarlo.
3. Enviar el ID del AI Agent que genera Okta a Anthropic.
4. Agregar la clave pública que devuelve Anthropic a la entrada del AI Agent, en la pestaña {{< ui >}}Credentials{{< /ui >}}.

Hasta que la clave pública esté en su lugar, el intercambio de tokens fallará aunque todos los demás valores sean correctos. Este intercambio es manual, así que inícielo pronto.

### Conecte Claude a la aplicación Datadog {#connect-claude-to-the-datadog-application}

En el AI Agent de Claude, agregue la aplicación SAML de Claude como un llamador delegado, luego conecte el AI Agent a su aplicación Datadog.

1. En la pestaña {{< ui >}}Delegations{{< /ui >}}, agregue la aplicación SAML de Claude como llamador.
2. En la pestaña {{< ui >}}Resource connections{{< /ui >}}, agregue una conexión de recurso. Seleccione {{< ui >}}Application{{< /ui >}} como el tipo de recurso, luego seleccione su aplicación Datadog.
3. Establezca los siguientes campos.

   | Campo de Okta                | Valor                                                                                                |
   | ------------------------- | ---------------------------------------------------------------------------------------------------- |
   | {{< ui >}}Client ID at resource{{< /ui >}} | El ID de cliente de Claude que copió de [{{< ui >}}Registered client IDs{{< /ui >}}](#copy-the-agent-client-id)          |
   | {{< ui >}}Scope Condition{{< /ui >}}       | {{< ui >}}Allow all{{< /ui >}}, el único valor admitido. Consulte [Controlar contextos en Datadog](#control-scopes-in-datadog) |

4. Active el AI Agent desde el menú {{< ui >}}Actions{{< /ui >}}.

## Controlar contextos en Datadog {#control-scopes-in-datadog}

{{< ui >}}Allow all{{< /ui >}} es el único {{< ui >}}Scope Condition{{< /ui >}} admitido para el acceso entre aplicaciones. Establézcalo en Okta y luego restrinja a qué accede Claude desde Datadog.

Okta no filtra los contextos. Con {{< ui >}}Allow all{{< /ui >}}, Okta copia todo lo que Claude solicita en el token, lo que convierte a Datadog en el punto de cumplimiento.

<div class="alert alert-warning">No ingrese una lista de contextos en Okta. Okta rechaza cualquier solicitud de token que contenga un contexto fuera de la lista, por lo que la integración falla con un error en lugar de recurrir a un acceso más limitado.</div>

Para establecer los contextos que Claude tiene permitidos:

1. Navegue a [{{< ui >}}Organization Settings > Mobile and Third-Party Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/mobile-third-party-access). También puede hacer clic en {{< ui >}}Manage app{{< /ui >}} junto a Claude en la tabla {{< ui >}}Registered client IDs{{< /ui >}} en la página de Acceso entre aplicaciones.
2. Seleccione la aplicación Claude y, a continuación, seleccione la pestaña {{< ui >}}Scopes{{< /ui >}}.
3. Utilice la casilla de verificación {{< ui >}}Allowed{{< /ui >}} para cada contexto a fin de controlar a qué accede Claude.
4. Haga clic en {{< ui >}}Enable{{< /ui >}} para guardar.

Agregar o eliminar un contexto afecta a todos los usuarios de su organización, y eliminar un contexto revoca las autorizaciones existentes que dependen de él. Consulte [Administración de contextos de aplicación](/account_management/org_settings/mobile_third_party_access/#application-scope-management).

Un contexto que no está permitido en Datadog nunca se concede, independientemente de lo que solicite el token.

## Agregue Datadog como conector en Claude {#add-datadog-as-a-connector-in-claude}

1. En Claude, haga clic en el icono {{< ui >}}+{{< /ui >}} en la parte inferior de cualquier prompt y, a continuación, haga clic en {{< ui >}}Add Connector{{< /ui >}}.
2. Busque **Datadog** en el directorio y habilite el conector.
3. Complete el flujo de inicio de sesión cuando se le solicite.

Utilice el conector de Datadog del directorio, no un conector personalizado.

## Verifique la configuración {#verify-the-configuration}

Inicie sesión en Claude como un usuario asignado a ambas aplicaciones de Okta y, a continuación, ejecute una solicitud que llame a Datadog. Una llamada exitosa confirma la ruta completa: Okta emite el token, Datadog lo acepta y Datadog resuelve al usuario.

Si un usuario inició sesión antes de que usted habilitara el Acceso entre aplicaciones, pídale que cierre la sesión de Claude y vuelva a iniciarla a través de Okta. Las sesiones establecidas anteriormente carecen del token de identidad que necesita el AI Agent.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
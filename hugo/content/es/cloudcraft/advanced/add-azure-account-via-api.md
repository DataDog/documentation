---
title: Añadir cuentas Azure a través de la API Cloudcraft
---

Cloudcraft actualmente no ofrece una manera de añadir varias cuentas de Azure a la vez utilizando la interfaz web, pero puedes hacerlo a través de la [API][1].

<div class="alert alert-info">La posibilidad de añadir y analizar cuentas de Azure, así como de utilizar la API para desarrolladores de Cloudcraft, sólo está disponible para los suscriptores Pro. Para obtener más información, consulta la <a href="https://www.cloudcraft.co/pricing">página de precios de Cloudcraft</a>.</div>

## Requisitos previos

Antes de empezar, asegúrate de tener lo siguiente:

- Un usuario de Cloudcraft con el rol de [Propietario o Administrador][2].
- Una [suscripción Cloudcraft Pro][3] activa.
- Una cuenta de Azure con los permisos adecuados.
- Un entorno de tipo Unix, como Linux, macOS o WSL en Windows con cURL instalado.
- Conocimientos básicos de la interfaz de línea de comandos.
- Conocimientos básicos sobre el uso de API.

También debes tener el **ID de la aplicación**, el **ID del directorio**, el **ID de la suscripción** y el **Secreto del cliente** de tu cuenta de Azure. Para obtener ayuda para localizar estos valores, consulta [Conectar tu cuenta de Azure con Cloudcraft][4].

## Añadir una cuenta de Azure

Para añadir tu cuenta de Azure a Cloudcraft, abre la línea de comandos e introduce el siguiente comando cURL:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/azure/account' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer ${API_KEY}" \
  --data-raw '{"name":"AZURE_ACCOUNT_NAME","applicationId": "APPLICATION_ID","directoryId": "DIRECTORY_ID","subscriptionId": "SUBSCRIPTION_ID","clientSecret": "CLIENT_SECRET"}'
{{< /code-block >}}

Sustituye `_AZURE_ACCOUNT_NAME_` por el nombre que quieres que tenga la cuenta en Cloudcraft y los otros valores por los valores reales. Sustituye `_API_KEY_` por tu clave de API.

Después de añadir con éxito la cuenta, puedes utilizar el mismo comando para añadir cuentas adicionales a Cloudcraft.

[1]: https://developers.cloudcraft.co/
[2]: /es/cloudcraft/account-management/roles-and-permissions/
[3]: https://www.cloudcraft.co/pricing
[4]: /es/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
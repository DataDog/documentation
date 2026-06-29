---
title: Añadir cuentas AWS a través de la API Cloudcraft
---

Cloudcraft actualmente no ofrece una manera de añadir varias cuentas de AWS a la vez utilizando la interfaz web, pero puedes hacerlo a través de la [API][1].

<div class="alert alert-info">La posibilidad de añadir y analizar cuentas de AWS, así como de utilizar la API para desarrolladores de Cloudcraft, sólo está disponible para los suscriptores Pro. Para obtener más información, consulta la <a href="https://www.cloudcraft.co/pricing">página de precios de Cloudcraft</a>.</div>

## Requisitos previos

Antes de empezar, asegúrate de tener lo siguiente:

- Un usuario de Cloudcraft con el rol de [Propietario o Administrador][2].
- Una [suscripción Cloudcraft Pro][3] activa.
- Una cuenta de AWS con permiso para crear roles IAM.
- Un entorno de tipo Unix, como Linux, macOS o WSL en Windows con cURL y [la CLI AWS][4] instalado.
- Conocimientos básicos de la interfaz de línea de comandos.
- Conocimientos básicos sobre el uso de API.

## Obtener parámetros del rol IAM de AWS 

Comienza utilizando el endpoint [Obtener mis parámetros del rol IAM de AWS][5] de la API Cloudcraft y guardando la respuesta.

Para ello, abre la línea de comandos e introduce el siguiente comando cURL:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/aws/account/iamParameters' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer ${API_KEY}"
{{< /code-block >}}

Sustituye `API_KEY` por tu clave de API Cloudcraft. La respuesta debería ser algo parecido a lo siguiente:

{{< code-block lang="json" filename="cloudcraft-response.json" >}}
{
  "accountId": "1234567890",
  "externalId": "ex53e827-a724-4a2a-9fec-b13761540785",
  "awsConsoleUrl": "https://console.aws.amazon.com/iam/home?#/roles..."
}
{{< /code-block >}}

Guarda una copia de los campos `accountId` y `externalId`, ya que los necesitarás cuando crees el rol IAM en el siguiente paso.

## Creación del rol IAM

A continuación, utiliza el comando _create-role_ en la CLI AWS para crear el rol IAM.

{{< code-block lang="shell" >}}
aws iam create-role \
  --role-name 'cloudcraft' \
  --description 'Programmatically created IAM role for use with Cloudcraft.' \
  --max-session-duration '3600' \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":"arn:aws:iam::ACCOUNT_ID:root"},"Action":"sts:AssumeRole","Condition":{"StringEquals":{"sts:ExternalId":"EXTERNAL_ID"}}}]}' \
  --query 'Role.Arn' \
  --output 'text'
{{< /code-block >}}

Sustituye `ACCOUNT_ID` y `EXTERNAL_ID` por los valores obtenidos en el paso anterior.

Si todo sale bien, se muestra una respuesta con el ARN de la cuenta del rol. Guarda este valor para más adelante.

Sin embargo, el rol aún no tiene ningún permiso asociado. Para conectar el rol `ReadOnlyAccess`, utiliza el comando `attach-role-policy` en la CLI AWS.

{{< code-block lang="shell" >}}
aws iam attach-role-policy \
  --role-name 'cloudcraft' \
  --policy-arn 'arn:aws:iam::aws:policy/ReadOnlyAccess'
{{< /code-block >}}

**Nota**: Si le diste un nombre diferente al rol en el paso anterior, asegúrate de sustituir _cloudcraft_ por el nombre que utilizaste.

## Añadir la cuenta de AWS a Cloudcraft

Por último, una vez que hayas creado el rol IAM, puedes añadir la cuenta de AWS a Cloudcraft. Puedes hacerlo utilizando el ARN del rol que has creado y llamando a la [API para desarrolladores de Cloudcraft][7].

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/aws/account' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer ${API_KEY}" \
  --data-raw '{"name":"AWS_ACCOUNT_NAME","roleArn":"ROLE_ARN","region":"us-east-1"}' \
{{< /code-block >}}

Sustituye `AWS_ACCOUNT_NAME` por el nombre que quieres que tenga la cuenta en Cloudcraft y `ROLE_ARN` por el ARN del rol que has creado en el paso anterior. También debes sustituir `us-east-1` por la región desde la que quieres que se compruebe la cuenta y `API_KEY` por tu clave de API.

Después de añadir con éxito la cuenta, puedes utilizar el mismo comando para añadir cuentas adicionales a Cloudcraft.

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/85-roles-and-permissions
[3]: https://www.cloudcraft.co/pricing
[4]: https://aws.amazon.com/cli/
[5]: https://developers.cloudcraft.co/#aa18999e-f6da-4628-96bd-49d5a286b928
[6]: https://app.cloudcraft.co/support
[7]: https://developers.cloudcraft.co
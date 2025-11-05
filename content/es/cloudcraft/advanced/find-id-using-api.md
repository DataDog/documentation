---
title: Encuentra una cuenta de Cloud o un ID de equipo utilizando nuestra API
---

## Información general

Actualmente, la interfaz de Cloudcraft no muestra el ID de tus cuentas o equipos de AWS o Azure. Sin embargo, puedes encontrar estos ID utilizando nuestra API y un poco de trabajo manual.

## Requisitos previos

Antes de empezar, asegúrate de tener lo siguiente:

- Un usuario de Cloudcraft con el rol de [Propietario o Administrador][1].
- Una [suscripción a Cloudcraft Pro][2].
- Un entorno similar a Unix, como Linux, macOS, o WSL en Windows con cURL y [jq][3] instalados.
- Conocimientos básicos de la interfaz de línea de comandos.
- Conocimientos básicos sobre el uso de APIs.

También debes tener al menos una cuenta de AWS o Azure añadida a Cloudcraft.

## Encontrar el ID de la cuenta en la nube

Encontrar el ID de tu cuenta de AWS o Azure es fácil; puedes hacerlo realizando una única llamada a la API.

Para encontrar el ID de tu cuenta en la nube, ejecuta el siguiente comando:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer API_KEY" | jq .
{{< /code-block >}}

Sustituye `PROVIDER` por `aws` o `azure` y `API_KEY` por tu clave de API de Cloudcraft.

La respuesta debería ser algo parecido a esto para AWS:

{{< code-block lang="json" filename="cloudcraft-aws-response.json" >}}
{
  "accounts": [
    {
      "id": "8bfc6773-7fa2-49b3-8016-5e0e9a2e2aff",
      "name": "Development",
      "roleArn": "arn:aws:iam::600111810075:role/cloudcraft",
      "externalId": "93cf2e38-742a-4321-bcee-1d8b8fe35b8b",
      "readAccess": null,
      "writeAccess": null,
      "createdAt": "2024-02-21T15:19:26.232Z",
      "updatedAt": "2024-02-21T15:19:26.701Z",
      "CreatorId": "f179a0f9-ebf6-4a6a-afd8-74d608498a1f",
      "source": "aws"
    }
  ]
}
{{< /code-block >}}

Y algo así para Azure:

{{< code-block lang="json" filename="cloudcraft-azure-response.json" >}}
{
  "accounts": [
    {
      "id": "e18da22b-330d-4091-bb57-c46654df5351",
      "name": "Development",
      "applicationId": "598c6f24-c2e2-4870-88bd-d42fe6f5c998",
      "directoryId": "c6444a86-1cfe-4312-add5-61e2c140648b",
      "subscriptionId": "74efa8fe-0997-49b0-963d-ea88bf80fe11",
      "readAccess": null,
      "writeAccess": null,
      "createdAt": "2023-11-20T22:11:43.688Z",
      "updatedAt": "2023-11-20T22:11:43.688Z",
      "CreatorId": "2d95eeb8-7161-48f8-88e4-8f0d6bb7b47f",
      "hint": "9NP",
      "source": "azure"
    }
  ]
}
{{< /code-block >}}

El campo `id` contiene el ID de tu cuenta en la nube.

## Encontrar el ID del equipo

Cloudcraft no expone el ID del equipo en la interfaz de usuario o a través de una simple llamada a la API. Sin embargo, puedes encontrar el ID del equipo utilizando la interfaz de Cloudcraft en combinación con la API.

Para encontrar el ID de tu equipo, sigue estos pasos:

1. Abre la interfaz de usuario de Cloudcraft y crea un nuevo plano vacío.
2. Haz clic en el botón **Share & Export** (Compartir y exportar) de la esquina superior derecha.
3. En **Share with a team...** (Compartir con un equipo...), haz clic en el campo y selecciona el equipo o equipos para los que deseas obtener el ID.

{{< img src="cloudcraft/advanced/find-id-using-api/share-with-team.mp4" alt="Un rápido vídeo que muestra a un usuario de Cloudcraft seleccionando los equipos de Datadog y Cloudcraft desde el menú Compartir y exportar." video="true">}}

4. Copia el ID del plano de la URL. El ID es la parte de la URL que viene después de `blueprint/`.

5. Pasa al terminal y ejecuta el siguiente comando:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/blueprint/ID' \
  --tlsv1.2 \
  --proto '=https' \
  --compressed \
  --silent \
  --header "Authorization: Bearer API_KEY" | jq '.readAccess'
{{< /code-block >}}

Sustituye `ID` por el ID del plano que has creado y `API_KEY` por tu clave de API de Cloudcraft.

La respuesta debería ser algo parecido a esto:

{{< code-block lang="json" filename="cloudcraft-blueprint-response.json" >}}
[
  "team/9e7e8b46-cfb7-486e-ade5-bd8c1ec1971a",
  "team/af6b55f1-f604-4b88-8b4f-c4779cb7a799"
]
{{< /code-block >}}

El UUID después de `team/` es el ID de tu equipo.

[1]: https://help.cloudcraft.co/article/85-roles-and-permissions
[2]: https://www.cloudcraft.co/pricing
[3]: https://jqlang.github.io/jq/
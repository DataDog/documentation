---
title: Automatizar snapshots de cuentas en la nube a través de la API de Cloudcraft
---

## Información general

La función **Auto Layout** de Cloudcraft, accesible a través de la aplicación web, es una potente herramienta para generar automáticamente diagramas de tu entorno de AWS. Esta funcionalidad puede agilizar significativamente los procesos de documentación y facilitar la incorporación de nuevos miembros al equipo.

Esta guía proporciona un enfoque paso a paso para la utilización de esta función a través de utilidades comunes de línea de comandos y la API para desarrolladores de Cloudcraft.

<div class="alert alert-info">La posibilidad de añadir y escanear cuentas de AWS y Azure, así como de utilizar la API para desarrolladores de Cloudcraft, sólo está disponible para los suscriptores de Pro. Consulta <a href="https://www.cloudcraft.co/pricing">la página de precios de Cloudcraft</a> para obtener más información.</div>

## Requisitos previos

- Una [suscripción de Cloudcraft Pro][1] activa.
- Una clave de API con permisos de lectura y escritura.
- El ID de cuenta de la cuenta de AWS o Azure que deseas escanear.
- Acceso a un entorno tipo Unix (Linux, macOS o Windows Subsystem for Linux).
- Familiaridad con las operaciones de línea de comandos.
- Conocimientos básicos de uso de API.

## Tomar un snapshot de la cuenta

Empieza creando un snapshot de tu cuenta de AWS o Azure usando los endpoints de [snapshot de cuenta de AWS][2] o [snapshot de cuenta de Azure][3]. Este proceso refleja la funcionalidad del botón **Scan Now** (Escanear ahora) en la interfaz de Cloudcraft y muestra el snapshot en formato JSON.

Ejecuta el siguiente comando en tu terminal:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account/ACCOUNT_ID/REGION/json' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header "Authorization: Bearer API_KEY"
{{< /code-block >}}

Sustituye `PROVIDER` por el proveedor de la nube, por ejemplo, `azure` o `aws`, `ACCOUNT_ID` por el ID de tu cuenta de AWS o Azure en Cloudcraft, `REGION` por la región de escaneo que desees y `API_KEY` por tu clave de la API de Cloudcraft.

Tras ejecutar el comando, se muestra la representación JSON de tu snapshot de cuenta de AWS. Para guardar esta salida directamente en un archivo, utiliza el siguiente comando:

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account/ACCOUNT_ID/REGION/json' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header "Authorization: Bearer API_KEY" > '/tmp/account-infra.json'
{{< /code-block >}}

El snapshot se guarda con el nombre de archivo `account-infra.json` en tu directorio temporal.

## Generar un nuevo blueprint

A continuación, crea un nuevo plano en tu cuenta de Cloudcraft utilizando el endpoint de la API [Crear blueprint][4]. Los datos guardados en snapshot sirven como carga útil para esta solicitud.

Ejecuta el siguiente comando en tu terminal:

{{< code-block lang="shell" >}}
curl \
  --request 'POST' \
  --url 'https://api.cloudcraft.co/blueprint' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer API_KEY" \
  --data '@/tmp/account-infra.json'
{{< /code-block >}}

Recuerda sustituir `API_KEY` por tu clave de la API real de Cloudcraft.

Una vez completado, se crea un nuevo blueprint que refleja tu infraestructura en la nube en tu cuenta de Cloudcraft, replicando el efecto de usar manualmente los botones **Scan Now** (Escanear ahora) y **Auto Layout**.

Si tienes alguna pregunta o problema con el proceso, [ponte en contacto con el equipo de asistencia de Cloudcraft][5].

[1]: https://www.cloudcraft.co/pricing
[2]: /es/cloudcraft/api/aws-accounts/#snapshot-aws-account
[3]: /es/cloudcraft/api/azure-accounts/#snapshot-an-azure-account
[4]: /es/cloudcraft/api/blueprints/#create-a-blueprint
[5]: https://app.cloudcraft.co/app/support
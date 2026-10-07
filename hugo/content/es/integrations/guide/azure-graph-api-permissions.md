---
further_reading:
- link: /integrations/azure/
  tag: Documentación
  text: Integración de Datadog y Azure
title: Permisos de la API de Microsoft Graph para la monitorización de Azure
---

Para obtener los detalles de registro de la aplicación de Azure, [la integración de Datadog y Azure][1] requiere acceso a la [API de Microsoft Graph][2], que se consulta a nivel de inquilino.

**Nota**: En el cuadro de integración de Azure en Datadog, si hay varios registros de aplicación (ID de cliente) utilizados para el mismo inquilino, solo necesitas permisos en un registro de aplicación.

## Configuración

1. En tu portal de Azure, ve a la página **App registrations** (Registros de aplicaciones). Haz clic en el registro de la aplicación que deseas modificar.
2. En la barra lateral izquierda, en la sección _Manage_ (Gestionar), haz clic en **API permissions** (Permisos de API). 
3. Haz clic en **+ Add a permission** (+ Añadir un permiso).
4. En el panel que se abre, selecciona **Microsoft Graph**.
5. En la página siguiente, selecciona (Permisos de aplicación). A continuación, en _Select permissions_ (Seleccionar permisos), busca y habilita cada uno de los siguientes permisos. 
   - `Application.Read.All`
   - `Directory.Read.All`
   - `Group.Read.All`
   - `Policy.Read.All`
   - `User.Read.All`

   Haz clic en la casilla de la izquierda y en el botón **Add permissions** (Añadir permisos) de la parte inferior para añadir cada permiso.
   {{< img src="integrations/guide/azure-graph-api-permissions/permission-select-1.png" alt="Panel para añadir permisos de la API de Microsoft Graph. 'Permisos de aplicación' está seleccionado. En la sección 'Seleccionar permisos', un usuario ha tipeado en 'Application.Read.All'. En la sección a continuación, en 'Application (1)', el permiso Application.Read.All aparece al lado de la casilla seleccionada.">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/azure
[2]: https://learn.microsoft.com/en-us/graph/permissions-reference
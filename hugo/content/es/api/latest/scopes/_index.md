---
disable_sidebar: true
title: Contextos de autorización
type: api
---
## Contextos de autorización para clientes OAuth

Los contextos son un mecanismo de autorización que permite limitar y definir el acceso específico que tienen las aplicaciones a los datos de Datadog de una organización. Cuando se autoriza el acceso a los datos en nombre de un usuario o cuenta de servicio, las aplicaciones solo pueden acceder a la información explícitamente permitida por su contexto asignado.

<div class="alert alert-danger">Esta página enumera solo los ámbitos de autorización que pueden asignarse a los clientes de OAuth. Para ver la lista completa de permisos asignables para claves de aplicación con ámbito, consulta <a href="/account_management/rbac/permissions/#permissions-list">Permisos de rol de Datadog</a>.

<ul>
  <li><strong>Clientes de OAuth</strong> → Solo se pueden asignar ámbitos de autorización (conjunto limitado).</li>
  <li><strong>Claves de aplicación de ámbito</strong> → Se les puede asignar cualquier permiso de Datadog.</li>
</ul>
</div>

La práctica recomendada para delimitar las aplicaciones es seguir el principio del mínimo privilegio. Asigna solo el mínimo contexto necesario para que una aplicación funcione según lo previsto. Esto mejora la seguridad y proporciona visibilidad de cómo interactúan las aplicaciones con los datos de tu organización. Por ejemplo, una aplicación de terceros que solo lee dashboards no necesita permisos para eliminar o gestionar usuarios.

Puede utilizar contextos de autorización con clientes OAuth2 para tus [aplicaciones Datadog][1].

{{< api-scopes >}}

[1]: https://docs.datadoghq.com/es/developers/datadog_apps/#oauth-api-access
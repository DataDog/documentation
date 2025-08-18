---
disable_sidebar: true
title: Contextos de autorización
type: documentación
---
## Contextos de autorización para clientes OAuth

Los contextos son un mecanismo de autorización que permite limitar y definir el acceso específico que tienen las aplicaciones a los datos de Datadog de una organización. Cuando se autoriza el acceso a los datos en nombre de un usuario o cuenta de servicio, las aplicaciones sólo pueden acceder a la información explícitamente permitida por su contexto asignado.

<div class="alert alert-warning">Esta página enumera únicamente los contextos de autorización que pueden asignarse a los clientes OAuth. Para ver la lista completa de permisos asignables para claves de aplicación delimitadas, consulta <a href="/account_management/rbac/permissions/#permissions-list">Permisos para roles Datadog</a>.

<ul>
  <li><strong>Clientes OAuth</strong> → Sólo se les pueden asignar contextos de autorización (conjunto limitado).</li>
  <li><strong>Claves de aplicación delimitadas</strong> → Se les puede asignar cualquier permiso Datadog.</li>
</ul>
</div>

La práctica recomendada para delimitar las aplicaciones es seguir el principio del mínimo privilegio. Asigna sólo el mínimo contexto necesario para que una aplicación funcione según lo previsto. Esto mejora la seguridad y proporciona visibilidad de cómo interactúan las aplicaciones con los datos de tu organización. Por ejemplo, una aplicación de terceros que sólo lee dashboards no necesita permisos para eliminar o gestionar usuarios.

Puede utilizar contextos de autorización con clientes OAuth2 para tus [aplicaciones Datadog][1].

{{< api-scopes >}}

[1]: https://docs.datadoghq.com/es/developers/datadog_apps/#oauth-api-access
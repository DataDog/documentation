---
disable_sidebar: true
title: Contextos de autorización
type: documentación
---
## Contextos de autorización

El contexto es un mecanismo de autorización que permite limitar y definir el acceso detallado que tienen las aplicaciones a los datos de Datadog de una organización. Cuando se autoriza el acceso en nombre de un usuario o de una cuenta de servicio, las aplicaciones sólo pueden acceder a la información solicitada explícitamente y nada más.

La práctica recomendada para definir el alcance de las aplicaciones es mantener los privilegios mínimos y los contextos más restrictivos necesarios para que una aplicación función según lo previsto. Esto proporciona a los usuarios un control de acceso detallado de las aplicaciones y transparencia sobre cómo una aplicación está utilizando sus datos. Por ejemplo, una aplicación de terceros que sólo lee datos de dashboard no necesita permisos para eliminar o gestionar usuarios en una organización.

Puedes utilizar contextos con clientes OAuth2 para tus [aplicaciones Datadog][1].

{{< api-scopes >}}

[1]: https://docs.datadoghq.com/es/developers/datadog_apps/#oauth-api-access
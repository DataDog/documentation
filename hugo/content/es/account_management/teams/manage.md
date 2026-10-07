---
title: Gestión de equipos
---

## Detalles del equipo

Cada equipo tiene una página de detalles que muestra información sobre el equipo, sus miembros y sus recursos asociados. Para acceder a la página detallada de un equipo, haz clic en el equipo en el [Directorio de equipos][1].

La página de equipo muestra los siguientes recursos asociados a tu equipo:
- Dashboards
- Notebooks
- Monitores
- Servicios
- Enlaces
- Incidentes en curso
- Endpoints de la API

Puedes cambiar los recursos que se muestran y su orden en la página.

Personaliza el aspecto de tu equipo eligiendo un avatar emoji y un cartel. El avatar emoji se muestra junto al nombre del equipo en las listas de Datadog.

Consulta las siguientes instrucciones para personalizar tu equipo.

### Personalizar el diseño

Para modificar el diseño de la página del equipo, debes tener el permiso `user_access_manage` o `teams_manage`. Alternativamente, puedes ser miembro o administrador de un equipo que esté configurado para permitir a los miembros y administradores editar los detalles del equipo.

1. Haz clic en **Page Layout** (Diseño de página). Aparecerá el cuadro de diálogo de diseño de página.
1. Para reordenar los recursos, haz clic y arrastra los iconos de identificador de arrastre.
1. Para ocultar un recurso, pasa el ratón por encima de un elemento y haz clic en el icono del ojo (**Hide content* [Ocultar contenido]).

Los recursos ocultos aparecen en la parte inferior del diálogo de diseño de página. Para mostrar un recurso, pasa el ratón sobre él y haz clic en el icono **Unhide content** (Mostrar contenido).

### Personalizar la configuración

Para modificar los detalles del equipo, debes tener el permiso `user_access_manage` o `teams_manage`. Alternativamente, puedes ser miembro o administrador de un equipo que esté configurado para permitir a los miembros y administradores editar los detalles del equipo.

Haz clic en **Settings** (Configuración). Aparece el cuadro de diálogo de configuración.

En el cuadro de diálogo de configuración, utiliza el menú para personalizar los siguientes ajustes del equipo:
- Miembros
- Enlaces
- Nombre y descripción
- Avatar y cartel
- Diseño de página
- Permisos
- Notificaciones
- Conexión de GitHub

## Miembros de equipos

Para diferenciar a los miembros de tu equipo, desígnalos como jefes de equipo. En la lista de miembros, aparecerá un distintivo con el texto "TEAM MANAGER" junto a los nombres de los jefes de los equipos.

En los parámetros del equipo, define qué usuarios pueden modificar los miembros de un equipo. Puedes elegir entre las siguientes opciones:
- Solo usuarios con el permiso `user_access_manage` 
- Jefes de equipos
- Jefes y miembros de equipos
- Cualquier persona de la organización

Los usuarios con el permiso `user_access_manage` pueden definir reglas predeterminadas sobre quién puede añadir o eliminar miembros, o editar la información del equipo. Define reglas predeterminadas con el botón **Parámetros predeterminados en la página del directorio de equipos. Sustituye estas políticas para un equipo determinado en el panel de información del equipo.

## Gestionar equipos a través de un proveedor de identidades

Cuando se configura un equipo gestionado, las siguientes propiedades del equipo se configuran externamente a través de la integración de un proveedor de identidades:
 - Nombre del equipo
 - Identificador de equipos
 - Pertenencia a un equipo (sincronizada desde el grupo de proveedores de identidad correspondiente)

Para asegurarte de que los equipos gestionados se mantienen coherentes con tu configuración en el proveedor de identidades, debes realizar cambios en las propiedades gestionadas en el proveedor de identidades, no a través del sitio o la API de Datadog.

Datadog admite Okta y otros proveedores de identidades compatibles con SCIM para los equipos administrados.

Para más información sobre las capacidades de equipos gestionados y cómo configurarlos, consulta [SCIM][3].

## Asignación de atributos SAML

Para gestionar equipos y la pertenencia a equipos mediante atributos SAML, consulta [Asignar atributos SAML a equipos][2].

## Delegar la gestión de equipos

Si quieres crear un modelo abierto para definir los miembros de un equipo, configura los parámetros del equipo para que **cualquier persona de la organización** pueda añadir o eliminar miembros de forma predeterminada. Asigna el permiso `teams_manage` a los roles apropiados para que cualquiera pueda crear equipos o editar sus detalles.

Si prefieres un modelo gestionado por los propios equipos para definir los miembros de un equipo, configura los parámetros del equipo para que los **Jefes del equipo** o los **Jefes y miembros del equipo** puedan añadir o eliminar miembros. Asigna el permiso `teams_manage` a un rol que contenga a todos los jefes de tu equipo.

Si quieres reforzar un modelo estricto para definir los miembros de un equipo, configura tus parámetros de equipo predeterminados para que **Solo usuarios con el permiso user_access_manage** puedan añadir o eliminar miembros. Asigna el permiso `teams_manage` sólo a administradores de la organización.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /es/account_management/saml/mapping/#map-saml-attributes-to-teams
[3]: /es/account_management/scim/
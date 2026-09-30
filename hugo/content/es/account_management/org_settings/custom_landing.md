---
description: Configura un dashboard personalizado como página de inicio de tu organización
  para definir la primera impresión y controlar la información que ven los usuarios
  al iniciar sesión en Datadog.
title: Página de destino personalizada de una organización
---

## Información general

La página de destino de la organización Datadog es la primera página que ven tus usuarios cuando inician sesión en Datadog o navegan a la página raíz de Datadog. Datadog establece una página de destino predeterminada para tu organización. Si utilizas APM, Datadog establece la raíz APM como página de destino. Si no utilizas APM, la página de destino predeterminada es la lista de dashboards.

Como alternativa a la página predeterminada, Datadog permite a los administradores establecer un dashboard como página de destino de la organización. Una página de destino personalizada ayuda a una pequeña o gran organización a controlar la narrativa para sus usuarios.

Puedes personalizar un dashboard con la información que quieres que vean tus usuarios cuando inician una sesión en Datadog. Utiliza [parámetros de la organización][1] para definir ese dashboard como la página de destino personalizada de tu organización.

## Establecer una página de destino personalizada

Solo los usuarios con el rol de administrador de Datadog o el permiso de gestión de la organización (`org_management`) pueden configurar la página de inicio personalizada de una organización. Las páginas de inicio personalizadas no están disponibles durante los periodos de pruebas gratuitos.

Para configurar una página de destino personalizada, sigue los pasos que se indican a continuación:

1. Ve a [Parámetros de organización][1].
2. En las pestañas de la izquierda, selecciona [**Preferences** (Preferencias)][2].
3. En la sección de la página de inicio de Datadog, haz clic en **Individual Dashboard** (Dashboard individual).
4. Utiliza la lista desplegable para seleccionar un dashboard.
5. Pulsa el botón **Save** (Guardar).

## Uso de la página de destino predeterminada

Sólo los usuarios con un rol de administrador de Datadog o un permiso de gestión de la organización (`org_management`) pueden modificar la página de destino de una organización.

Para restaurar la página de destino predeterminada de APM Home, sigue los pasos que se indican a continuación:

1. Ve a [Parámetros de organización][1].
2. En las pestañas de la izquierda, selecciona [**Preferences** (Preferencias)][2].
3. En la sección de la página de inicio de Datadog, haz clic en **Default: Dashboard List** (D Por defecto: Lista de dashboards).
4. Pulsa el botón **Save** (Guardar).

[1]: https://app.datadoghq.com/organization-settings/
[2]: https://app.datadoghq.com/organization-settings/preferences
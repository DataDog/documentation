---
title: Integración de Datadog
---

## Información general

La integración entre Datadog y Cloudcraft proporciona a los usuarios un flujo de trabajo racionalizado para monitorizar y visualizar su infraestructura en la nube.

Aprovechando la potente plataforma de monitorización de Datadog, los usuarios pueden iniciar sesión en Cloudcraft con su cuenta de Datadog, pasar sin problemas de cualquier recurso en Cloudcraft a las vistas pertinentes en Datadog y extraer automáticamente las cuentas en la nube que ya se han configurado en Datadog para su uso en Cloudcraft.

## Inicio de sesión único (SSO) de Datadog

Cloudcraft permite a los usuarios registrarse e iniciar sesión mediante su cuenta de Datadog. Esta integración ofrece una experiencia unificada, vinculando tus datos de monitorización de Datadog con tus diagramas de arquitectura de Cloudcraft.

### Regístrarte con Datadog SSO

Para empezar, elige la opción **Sign up with Datadog** (Regístrarte con Datadog) durante el proceso de registro en Cloudcraft. Después de registrarte, puedes iniciar sesión en Cloudcraft utilizando tus credenciales de Datadog. Esto simplifica el proceso de inicio de sesión y permite la integración entre las dos plataformas.

Al utilizar Datadog SSO, obtendrás automáticamente acceso a:

- **Funcionalidad entre plataformas**: muévete sin esfuerzo entre Cloudcraft y Datadog para analizar tu infraestructura en la nube y su rendimiento.
- **Integración de cuenta en la nube automatizada**: las cuentas en la nube configuradas en Datadog se añaden automáticamente a Cloudcraft, ofreciéndote una visión completa de tu infraestructura en ambas plataformas.

### Habilitar Datadog SSO para las cuentas existentes

Si te registraste originalmente con un método de inicio de sesión diferente, por ejemplo, Google SSO o un nombre de usuario y contraseña estándar, no tendrás acceso al conjunto completo de funciones de la integración de Datadog. Para cambiar a Datadog SSO, [contacta con el equipo de soporte de Cloudcraft][1] y te ayudarán a convertir tu cuenta.

## Integración de la cuenta en la nube

<div class="alert alert-info">Esta función sólo es compatible con las cuentas de Amazon Web Services (AWS). La sincronización con Azure u otros proveedores de la nube no está disponible en este momento.</div>

La integración entre Cloudcraft y Datadog agiliza la gestión de cuentas en la nube, permitiendo que las cuentas ya configuradas en Datadog se añadan automáticamente a Cloudcraft. No se requiere ninguna configuración adicional en Cloudcraft.

Por defecto, estas cuentas se comparten con todos los miembros de tu equipo de Cloudcraft, asegurando un fácil acceso para todos.

{{< img src="cloudcraft/getting-started/datadog-integration/manage-aws-accounts.png" alt="Administrar la interfaz de cuentas de AWS en Cloudcraft con la integración de Datadog." responsive="true" style="width:100%;">}}

Para visualizar y diagramar recursos en Cloudcraft, [asegúrate de que la recopilación de recursos está habilitada en Datadog][2]. Cuando la recopilación de recursos está habilitada, Datadog recopila información sobre tus recursos de AWS realizando llamadas de sólo lectura a la API de tu cuenta de AWS. Cloudcraft se basa en esta información para visualizar tu infraestructura. Sin esta característica, tus cuentas de AWS serán añadidas a Cloudcraft, pero no habrá recursos disponibles para diagramar.

Si no tienes ninguna cuenta de AWS añadida en Datadog, tendrás que añadirla primero. Sigue las instrucciones de la [guía de la integración de AWS][3].

### Gestionar las cuentas extraídas de AWS en Cloudcraft

Las cuentas de AWS extraídas de Datadog están marcadas con el icono Bits en el selector de cuentas en la pestaña **Live** en Cloudcraft.

{{< img src="cloudcraft/getting-started/datadog-integration/bits-icon.png" alt="Selector de cuenta en la nube que muestra las cuentas de AWS administradas en la integración de Cloudcraft y Datadog." responsive="true" style="width:100%;">}}

Si tienes muchas cuentas, pero sólo necesitas centrarte en unas pocas, puedes utilizar los ajustes de visibilidad para ocultar cuentas específicas del selector de cuentas en la pestaña **Live**.

Para gestionar la configuración de visibilidad de estas cuentas:

1. Ve a **User > AWS Accounts** (Usuario > Cuentas de AWS).
2. Selecciona el icono **Edit** (Editar) (el icono del lápiz junto al nombre de la cuenta).
3. Activa la pestaña **Visibility on Live** (Visibilidad en Live) para controlar si la cuenta es visible para el equipo.

Para gestionar el nombre de la cuenta:

1. Ve a **User > AWS Accounts** (Usuario > Cuentas de AWS).
2. Selecciona el icono **Edit** (Editar) (el icono del lápiz junto al nombre de la cuenta).
3. Actualiza el nombre de la cuenta en el campo **Name** (Nombre).

<div class="alert alert-info">Los cambios en la configuración del nombre o la visibilidad no afectarán a la cuenta en Datadog.</div>

### Ventajas de rendimiento

Las cuentas de AWS extraídas de Datadog ofrecen un mejor rendimiento al crear diagramas en Cloudcraft en comparación con las cuentas añadidas directamente en Cloudcraft, ya que Cloudcraft utiliza datos ya recopilados por Datadog en lugar de las API de AWS.

## El menú Bits

El menú Bits de Cloudcraft es tu gateway a la información relevante de Datadog desde cualquier recurso de tu diagrama de arquitectura. Tanto si necesitas consultar logs, ver trazas (traces) de APM, o analizar métricas, el menú Bits ofrece una navegación fluida y contextual desde Cloudcraft a Datadog con un solo clic.

Para obtener información más detallada sobre cómo utilizar el menú Bits, consulta [la documentación del menú Bits][4].

[1]: https://app.cloudcraft.co/app/support
[2]: /es/integrations/amazon_web_services/#resource-collection
[3]: /es/integrations/amazon_web_services/
[4]: /es/cloudcraft/getting-started/using-bits-menu/
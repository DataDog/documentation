---
title: Crear una política de IAM personalizada para utilizarla con Cloudcraft
---

Cloudcraft utiliza un rol de IAM de _sólo lectura_ para escanear tu cuenta de AWS y hacer ingeniería inversa de las relaciones de servicio entre componentes para autogenerar un diagrama de tu arquitectura.

La forma más fácil de configurar todo es seguir las instrucciones dentro de la aplicación, que crea el rol y configura los permisos por ti en tan sólo unos clics. Al rol se le asigna la política de IAM`ReadOnlyAccess` administrada por AWS por defecto.

Si necesitas un control más preciso de los permisos, por ejemplo para excluir ciertos servicios o APIs, una política de IAM personalizada de Cloudcraft te permitirá hacerlo.

<div class="alert alert-info">Si utilizas una política de IAM personalizada, debes mantenerla actualizada manualmente a medida que se añaden nuevos servicios y funciones a Cloudcraft. Si ves un aviso en la aplicación de <strong>acceso limitado de AWS </strong>, intenta actualizar tu política de IAM personalizada con la última versión de abajo.</div>

## Creación de una política de IAM personalizada

Comienza abriendo la [Consola de políticas de IAM][1] y haz clic en el botón **Create Policy** (Creación de política).

{{< img src="cloudcraft/advanced/minimal-iam-policy/create-policy.png" alt="Consola de gestión de AWS IAM con el botón de Crear política resaltado." responsive="true" style="width:100%;">}}

Cambia a la pestaña de JSON y copia el contenido de una de las políticas enlazadas a continuación:

También puedes personalizar la política para adaptarla a tus necesidades.

- **[Política de IAM personalizada de Cloudcraft][2]:** esta política es más estricta que la política predeterminada `ReadOnlyAccess`. La política sólo incluye los servicios individuales y los permisos de sólo lectura que Cloudcraft utiliza. La política normalmente necesitará ser actualizada cuando Cloudcraft añada soporte para un servicio completamente nuevo.
- **[Política de IAM mínima de Cloudcraft][3]:** esta es la forma más estricta de política. La política enumera cada permiso individual de sólo lectura para la funcionalidad completa de Cloudcraft. Esta política necesita ser actualizada con más frecuencia, tanto cuando se añade soporte para nuevos servicios como cuando se mejoran los servicios existentes.
- Puedes utilizar cualquiera de las políticas anteriores como base para tus propias personalizaciones. Por ejemplo, se pueden eliminar permisos o servicios individuales. Si un servicio no puede ser accedido por Cloudcraft, el servicio será excluido del diagrama resultante.

Haz clic en el botón **Review policy** (Revisar política) en la parte inferior de la pantalla y, a continuación, introduce un nombre y una descripción. Cloudcraft recomienda utilizar los siguientes valores para mantener todo organizado y más fáciles de auditar.

- **Nombre de política:** Cloudcraft
- **Descripción de política:** política personalizada para Cloudcraft.

A continuación, haz clic en **Create policy** (Crear política) para crear la política. La consola de AWS te redirige de nuevo a la página de políticas.

Por último, adjunta la política recién creada al [rol de IAM de Cloudcraft][4]. Si aún no has creado el rol, sigue las instrucciones de la aplicación.

[1]: https://console.aws.amazon.com/iamv2/home#/policies
[2]: https://api.cloudcraft.co/aws/account/iamParameters/policy/custom
[3]: https://api.cloudcraft.co/aws/account/iamParameters/policy/minimal
[4]: https://console.aws.amazon.com/iam/home?#/roles/cloudcraft
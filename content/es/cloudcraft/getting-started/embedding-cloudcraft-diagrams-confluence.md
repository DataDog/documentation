---
title: Inserción de diagramas de Cloudcraft en la aplicación Confluence
---

En este artículo te guiaremos a través del proceso de integración continua de tus diagramas actuales de Cloudcraft en una página de Confluence utilizando la aplicación Confluence de Cloudcraft.

Este proceso te permite conceder acceso a diagramas a los usuarios autorizados, sin necesidad de que tengan suscripciones individuales a Cloudcraft, a la vez que les proporcionas una versión centralizada y actualizada de tu documentación de infraestructura.

## Instalación de la aplicación

Para instalar la aplicación Confluence de Cloudcraft, inicia sesión en Confluence como administrador, ve a la [lista del Marketplace de Cloudcraft][1] y haz clic en **Get it now** (Obtener ahora).

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/marketplace-listing.png" alt="Aplicación de Cloudcraft en el Marketplace de Atlassian." responsive="true" style="width:100%;">}}

## Uso de la aplicación

Con una página de Confluence abierta, escribe **/cloudcraft** y luego haz clic en el comando de la aplicación que aparece.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/embed-command.png" alt="Herramienta de integración de Cloudcraft para la inserción de diagramas en un documento de Confluence." responsive="true" style="width:100%;">}}

Luego, haz clic en **Sign in** (Iniciar sesión) para acceder a tu cuenta de Cloudcraft.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/signin-or-signup.png" alt="Página de inicio de sesión de Cloudcraft para la integración Confluence, que muestra opciones de inicio de sesión con Datadog, Google o correo electrónico." responsive="true" style="width:100%;">}}

Una vez iniciada la sesión, aparecerá el selector de diagramas. En la lista, selecciona el diagrama que quieres insertar.

<div class="alert alert-info">También puedes buscar, filtrar y ordenar diagramas en el selector de diagramas.</div>

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/blueprint-picker.png" alt="Aplicación Confluence de Cloudcraft que muestra opciones de inserción de planos de arquitecturas de nube en una página de Confluence, con diagramas etiquetados de entornos de staging y producción." responsive="true" style="width:100%;">}}

Tras seleccionar un diagrama, aparecerá una vista previa del diagrama insertado en tu página de Confluence. En este punto, también puedes cambiar el ancho del diagrama en el menú de tamaño de ventana o hacer clic en el icono del lápiz para volver a abrir el selector de diagramas.

{{< img src="cloudcraft/getting-started/embedding-cloudcraft-diagrams-confluence/window-size-menu.png" alt="Vista isométrica del diseño de una infraestructura de nube en Cloudcraft, que muestra instancias EC2, balanceadores de carga y bases de datos integrados en la página de Confluence." responsive="true" style="width:100%;">}}

Al publicar o previsualizar la página de Confluence, tu diagrama de Cloudcraft estará totalmente integrado en la página.

Los diagramas integrados sólo pueden ser vistos por las cuentas de usuario de Confluence, pero no son visibles cuando se accede a la URL pública de una página de Confluence.

[1]: https://marketplace.atlassian.com/apps/1233281/cloudcraft-aws-and-azure-cloud-diagrams-for-confluence?hosting=cloud&tab=overview
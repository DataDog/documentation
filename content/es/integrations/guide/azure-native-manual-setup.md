---
description: Pasos para configurar de manera manual la integración nativa de Azure
  con Datadog
further_reading:
- link: https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentación
  text: ¿Por qué debería instalar el Datadog Agent en mis instancias de nube?
- link: https://docs.datadoghq.com/integrations/guide/azure-portal/
  tag: Documentación
  text: Datadog en Azure Portal
- link: https://www.datadoghq.com/blog/azure-government-monitoring-datadog/
  tag: Blog
  text: Monitorizar Azure Government con Datadog
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: Blog
  text: Monitorizar Azure Container Apps con Datadog
- link: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/
  tag: Blog
  text: Cómo monitorizar máquinas virtuales de Microsoft Azure
- link: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
  tag: Blog
  text: Explorar Azure App Service con la vista serverless de Datadog
title: Guía de configuración manual de la integración nativa de Azure
---

{{< site-region region="us3" >}}

## Información general

Usa esta guía para configurar de manera manual la integración de nativa de Azure con Datadog mediante la creación del recurso de Datadog en Azure.

El recurso de Datadog optimiza la gestión y la recopilación de datos para tu entorno de Azure. Datadog recomienda usar este método cuando sea posible. Esto reemplaza el proceso de credenciales de registro de aplicaciones que usa la integración estándar de Azure para la recopilación de métricas y la configuración del centro de eventos para el reenvío de logs.

### Requisitos previos

#### Permisos necesarios

Para configurar la integración nativa de Azure, debes ser **propietario** de cualquier suscripción de Azure que quieras vincular y **administrador** de la organización de Datadog a la que las vincularás. Asegúrate de tener el acceso adecuado antes de comenzar la configuración.

## Configuración

Para configurar la integración de Azure, es necesario crear un recurso de Datadog en Azure. Estos recursos representan la conexión o el vínculo entre una organización de Datadog y una suscripción de Azure. Se pueden conectar varias suscripciones de Azure a Datadog con un único recurso de Datadog. 

Hay dos opciones para crear un recurso de Datadog en Azure:

1. Vincular a una organización de Datadog existente. Esta es la acción más común. Úsala a fin de configurar tu organización de Datadog para que monitorice una suscripción de Azure que aún no se haya vinculado. Esta acción no afecta tu plan de facturación de Datadog.

2. Crear una organización de Datadog nueva. Este flujo es menos común. Úsalo si aún no tienes una organización de Datadog y quieres comenzar con un plan pago a través de Azure Marketplace. Este flujo crea una organización de Datadog nueva, te permite seleccionar un plan de facturación y vincula la suscripción de Azure asociada para la monitorización.

**Nota**: Las pruebas no se encuentran disponibles a través de la opción **Create a new Datadog organization** (Crear una organización de Datadog nueva) en Azure. Para comenzar con una prueba gratuita, primero [crea una organización de Datadog de prueba en el sitio US3][1]. Luego, usa el flujo de vinculación para añadir las suscripciones que quieras monitorizar.

Una vez que crees un recurso de Datadog, comienza la recopilación de datos para la suscripción asociada. Consulta los detalles sobre cómo usar este recurso para configurar, gestionar y desplegar Datadog en la guía de [gestión de la integración nativa de Azure][2].

### Crear un recurso de Datadog

Para comenzar a monitorizar una suscripción de Azure, dirígete a la [página de servicios de Datadog en Azure][3] y selecciona la opción a fin de crear un recurso de Datadog nuevo:
{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Servicio de Datadog de Azure US3" responsive="true" style="width:90%;">}}

Selecciona **Link Azure subscription to an existing Datadog organization** (Vincular suscripción de Azure a una organización de Datadog existente) o **Create a new Datadog organization** (Crear una organización de Datadog nueva). La vinculación es la acción más común. Úsala para configurar la monitorización de una suscripción de Azure que aún no se haya vinculado. Solo elige el flujo **Create** (Crear) si aún no eres cliente de Datadog y quieres comenzar con un plan pago y nuevo.

{{< img src="integrations/azure/azure-us3-create-dd-resource1.png" alt="Azure US3 crea un recurso de Datadog" responsive="true" style="width:90%;">}}

**Nota**: Las organizaciones de Datadog nuevas que se crean a través de Azure Portal tienen la facturación consolidada de manera automática en tu factura de Azure. Este uso se contabiliza para el [MACC][4] de tu organización, si corresponde.

### Configuración de SSO

_(Opcional)_: Puedes configurar el [inicio de sesión único (SSO)][5] durante el proceso de creación de una organización de Datadog nueva en Azure. También puedes configurar el SSO más adelante. Para configurar el SSO durante la creación inicial, primero crea una aplicación de galería empresarial de Datadog.

### Configuración {#configuration-us3}

{{< tabs >}}
{{% tab "Vincular" %}}

#### Conceptos básicos {#basics-link}

Después de seleccionar la vinculación a una organización de Datadog existente, el portal muestra un formulario para crear el recurso de Datadog:
{{< img src="integrations/azure/azure-us3-link-sub.png" alt="Vincular una suscripción de Azure a una organización de Datadog existente" responsive="true" style="width:90%;">}}

Proporciona los siguientes valores:

| Propiedad             | Descripción                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Suscripción         | La suscripción de Azure que quieres monitorizar con Datadog. El recurso de Datadog existe en esta suscripción. Debes tener acceso de propietario.                                                                                       |
| Grupo de recursos       | Crea un grupo de recursos nuevo o usa uno existente. Un [grupo de recursos][5] es un contenedor que contiene recursos relacionados para una solución de Azure.                                                                                 |
| Nombre del recurso        | Especifica un nombre para el recurso de Datadog. La convención de nombres recomendada es: `subscription_name-datadog_org_name`.                                                                                                         |
| Localización             | La localización es Oeste US2, donde se encuentra alojado el sitio US3 de Datadog en Azure. Esto no afecta el uso que haces de Datadog. Como todos los [sitios de Datadog][1], el sitio US3 es completamente SaaS y admite la monitorización de todas las regiones de Azure, así como de otros proveedores de nube y hosts locales. |
| Organización de Datadog | Una vez que se complete el paso de autenticación, el nombre de la organización de Datadog se establece en el nombre de la organización de Datadog que se vincula. El sitio de Datadog se establece en US3.                                                                                                                                |

Haz clic en **Link to Datadog organization** (Vincular a la organización de Datadog) para abrir una ventana de autenticación de Datadog, luego inicia sesión en Datadog.

De manera predeterminada, Azure vincula tu organización de Datadog actual a tu recurso de Datadog. Si quieres vincular una organización diferente, selecciona la organización adecuada en la ventana de autenticación:

{{< img src="integrations/azure/azure-us3-select-org.png" alt="Seleccionar la organización de Datadog de Azure US3" responsive="true" style="width:90%;">}}

Cuando se complete el flujo de OAuth, verifica que el nombre de la organización de Datadog sea correcto.

[1]: /es/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
[5]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{% tab "Crear" %}}

#### Conceptos básicos {#basics-create}

Después de seleccionar la creación de una organización de Datadog nueva, el portal muestra un formulario para crear tanto el recurso de Datadog como la organización de Datadog nueva:
{{< img src="integrations/azure/azure-us3-create-dd-resource2.png" alt="Crear un recurso de Datadog de Azure US3" responsive="true" style="width:90%;">}}

Proporciona los siguientes valores:

| Propiedad             | Descripción                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Suscripción         | La suscripción de Azure que quieres monitorizar con Datadog. El recurso de Datadog existe en esta suscripción. Debes tener acceso de propietario.                                                                                       |
| Grupo de recursos       | Crea un grupo de recursos nuevo o usa uno existente. Un [grupo de recursos][2] es un contenedor que contiene recursos relacionados para una solución de Azure.                                                                                 |
| Nombre del recurso        | El nombre del recurso de Datadog. Este nombre se asigna a la organización de Datadog nueva.                                                                                                                                    |
| Localización             | La localización es Oeste US2, donde se encuentra alojado el sitio US3 de Datadog en Azure. Esto no afecta el uso que haces de Datadog. Como todos los [sitios de Datadog][1], el sitio US3 es completamente SaaS y admite la monitorización de todas las regiones de Azure, así como de otros proveedores de nube y hosts locales. |
| Organización de Datadog | El nombre de la organización de Datadog se establece en el nombre del recurso y el sitio de Datadog se establece en US3.                                                                                                                                |
| Plan de precios         | Una lista de los planes de precios de Datadog disponibles. Si tienes una oferta privada, se encontrará disponible en este menú desplegable.                                                                                                                 |
| Plazo de facturación         | Mensual.                                                                                                                                                                                                                      |

[1]: /es/getting_started/site/
[2]: https://docs.microsoft.com/en-us/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{< /tabs >}}

### Desplegar el Datadog Agent

{{< tabs >}}
{{% tab "Extensión de VM" %}}

Para ver una lista de máquinas virtuales (VMs) en la suscripción, selecciona **Virtual machine agent** (Agent de máquina virtual) en la barra lateral izquierda. En esta página, puedes instalar el Datadog Agent en una VM como extensión.

{{< img src="integrations/guide/azure_native_manual_setup/azure_native_vm_extension.png" alt="El recurso de Datadog en Azure con el Agent de máquina virtual seleccionado y la opción Instalar extensión resaltada" responsive="true" style="width:90%;">}}

Para cada VM, se muestra la siguiente información:

| Columna               | Descripción                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Nombre del recurso        | El nombre de la VM                                                                                                                                                  |
| Estado del recurso      | Ya sea que la VM se encuentre detenida o en ejecución. El Datadog Agent solo se puede instalar en una VM en ejecución. Si la VM se encuentra detenida, la instalación del Datadog Agent se deshabilita. |
| Versión del Agent        | El número de versión del Datadog Agent                                                                                                                               |
| Estado del Agent         | Si el Datadog Agent se encuentra en ejecución en la VM.                                                                                                                |
| Integraciones habilitadas | Las métricas clave que recopilan las integraciones habilitadas en el Datadog Agent.                                                                                  |
| Método de instalación       | La herramienta específica que se usa para instalar el Datadog Agent, como Chef, la extensión de VM de Azure, etc.                                                                    |
| Envío de logs         | Si el Datadog Agent envía logs a Datadog.                                                                                                          |

#### Instalación

Puedes instalar el Datadog Agent directamente en Azure con la extensión de VM. Para instalar el Datadog Agent: 

1. Selecciona la VM adecuada.
2. Haz clic en **Install Extension** (Instalar extensión). 
3. El portal solicita confirmación para instalar el Agent con la clave predeterminada. Selecciona **OK** (Aceptar) para comenzar la instalación. Azure muestra el estado `Installing` (Instalando) hasta que el Agent esté instalado y aprovisionado. Una vez instalado el Datadog Agent, el estado cambia a `Installed` (Instalado).

#### Desinstalar

Si el Datadog Agent se instaló con la extensión de VM de Azure:

1. Selecciona la VM adecuada.
2. Haz clic en **Uninstall Agent** (Desinstalar Agent).

Si el Agent se instaló con un método diferente, no puedes usar el recurso de Datadog para desplegar o eliminar el Agent, pero la información sobre el Agent seguirá reflejada en esta página.

{{% /tab %}}
{{% tab "Extensión del clúster de AKS" %}}

La extensión del clúster de AKS de Datadog te permite desplegar el Datadog Agent de manera nativa en Azure AKS, lo que evita la complejidad de las herramientas de gestión de terceros. 

#### Instalación

Para instalar el Datadog Agent con la extensión del clúster de AKS: 

1. Haz clic en tu clúster de AKS en la sección **Monitored Resources** (Recursos monitorizados) de la barra lateral izquierda.
2. En la barra lateral izquierda del clúster de AKS, selecciona **Extensions + applications** (Extensiones + aplicaciones) en **Settings** (Configuración).
3. Busca y selecciona `Datadog AKS Cluster Extension` (Extensión del clúster de AKS de Datadog).
4. Haz clic en **Create** (Crear) y sigue las instrucciones del cuadro con tus [credenciales de Datadog][1] y el [sitio de Datadog][2].

#### Desinstalar

1. Haz clic en tu clúster de AKS en la sección **Monitored Resources** (Recursos monitorizados) de la barra lateral izquierda.
2. En la barra lateral izquierda del clúster de AKS, selecciona **Extensions + applications** (Extensiones + aplicaciones) en **Settings** (Configuración).
3. Selecciona la extensión del clúster de AKS de Datadog (su **Type** [Tipo] es `Datadog.AKSExtension`).
4. Haz clic en **Uninstall** (Desinstalar).

[1]: /es/account_management/api-app-keys/
[2]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

[1]: https://us3.datadoghq.com/signup
[2]: https://docs.datadoghq.com/es/integrations/guide/azure-portal/
[3]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[4]: https://learn.microsoft.com/en-us/partner-center/marketplace/azure-consumption-commitment-enrollment
[5]: https://docs.datadoghq.com/es/integrations/azure/?tab=link#saml-sso-configuration
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,ap1" >}}
<div class="alert alert-info">La integración nativa de Azure solo se encuentra disponible para las organizaciones en el sitio US3 de Datadog. Si usas un sitio de Datadog diferente, consulta la <a href="https://docs.datadoghq.com/integrations/guide/azure-manual-setup/" target="_blank">guía de configuración manual de Azure</a> a fin de obtener instrucciones sobre cómo crear un registro de aplicaciones con permisos de lectura para tus suscripciones de Azure. Si usas el sitio US3 de Datadog, <a href="?site=us3" target="_blank">cambia el selector de sitios</a> a la derecha de esta página.</div>

[1]: ?site=us3
{{< /site-region >}}

{{< partial name="whats-next/whats-next.html" >}}
---
further_reading:
- link: /integrations/azure/
  tag: Documentación
  text: Integración de Azure
- link: https://www.datadoghq.com/blog/monitor-enterprise-azure-environments-with-datadog/
  tag: Blog
  text: Habilita la monitorización de entornos de Azure a escala empresarial en minutos
    con Datadog
private: true
title: Azure Resource Manager (ARM)
---

## Información general

Azure Resource Manager (ARM) es un servicio que puedes utilizar para crear, actualizar y eliminar recursos en tu entorno de Azure. Para obtener más información, consulta [¿Qué es Azure Resource Manager?][1].

## Requisitos previos

Debes tener permiso en el **grupo de gestión** para configurar el reenvío de datos y logs para las suscripciones que desees monitorizar.

## ¿Cuándo elegir ARM frente a otros métodos de configuración?

Utiliza el método de configuración de ARM si deseas:
   - automatizar el despliegue a través del portal Azure
   - gestionar tu infraestructura mediante plantillas declarativas
   - controlar en forma centralizado accesos, tags (etiquetas) y facturación
   - desplegar nuevamente tus recursos en el orden correcto y de forma coherente

Elige otros métodos de configuración si deseas:
   - crear recursos que ARM no puede gestionar directamente (como los registros de aplicaciones)
   - aplicar tags (etiquetas) personalizadas a tus recursos

## Configuración

1. En el cuadro de integración de Azure, selecciona **Configuration** > **New App Registration** > **Using Azure Portal** (Configuración > Registro de aplicación nueva > Con Azure Portal).

2. Selecciona **Management Group (Auto-Discover)** (Grupo de gestión [detección automática]) o **Individual Subscriptions** (Suscripciones individuales).
   - Si seleccionas el grupo de gestión, Datadog detecta y monitoriza de manera automática todas las suscripciones en ese contexto seleccionado, incluidas las suscripciones que se creen en el futuro. Debes tener seleccionado el rol de propietario en el grupo de gestión.
   - Si seleccionas las suscripciones individuales, debes tener el rol de propietario en todas las suscripciones que quieras monitorizar.

3. Haz clic en **Open Template** (Abrir plantilla).

{{< img src="integrations/guide/azure_manual_setup/azure_tile_arm_template.png" alt="El cuadro de Azure en la página de integraciones de Datadog con las opciones Con Azure Portal y Grupo de gestión seleccionadas" popup="true" style="width:80%;" >}}

4. Selecciona la **Region** (Región), **Subscription** (Suscripción) y **Resource Group** (Grupo de recursos) para la plantilla que se desplegará.

   **Nota**: La selección de región, suscripción y grupo de recursos solo define dónde se despliega esta plantilla. No tiene ningún efecto en las suscripciones que monitoriza Datadog.

5. Haz clic en **Siguiente**.

6. Selecciona la opción _Create new_ (Crear nuevo) en **Service principal type** (Tipo de entidad de servicio). 
7. Haz clic en el enlace **Change selection** (Cambiar selección) en **Service principal** (Entidad de servicio).
Aparece un formulario para crear un registro de aplicaciones nuevo:

{{< img src="integrations/guide/azure_manual_setup/arm_template_service_principal.png" alt="La página de la entidad de servicio en la plantilla de Azure ARM con la opción Crear nuevo seleccionada y el enlace Cambiar selección resaltado" popup="true" style="width:80%;" >}}

8. Ingresa un nombre para el registro de aplicaciones, selecciona los tipos de cuentas admitidos y haz clic en **Register** (Registrar).

9. Se abrirá una página para crear un secreto de cliente. Haz clic en **+ New client secret** (+ Secreto de cliente nuevo) para añadir un secreto de cliente.

10. Copia el valor del secreto de cliente y haz clic en el botón de cerrar **(X)** en la esquina superior derecha de la pantalla.

11. Pega el valor del secreto de cliente en el campo correspondiente de la plantilla y haz clic en **Next** (Siguiente).

12. Proporciona una clave de API de Datadog y un valor de clave de aplicación de Datadog en los campos correspondientes. Si lanzaste la plantilla desde la page (página) de integración de Azure en Datadog, puedes copiar las claves proporcionadas allí. De lo contrario, puedes encontrar tus claves de API y de aplicación en la sección Acceso de la page (página) Parámetros de la organización en Datadog.

    **Nota**: Si has elegido monitorizar suscripciones individuales en lugar de un grupo de gestión, selecciona las suscripciones a monitorizar en el menú desplegable **Subscriptions to monitor** (Suscripciones a monitorizar).

13. Selecciona tu sitio de Datadog, así como cualquier otra opción de configuración de la integración, como filtros de host y si deseas recopilar recursos para [Cloud Security][2].

14. Haz clic en **Review + create** (Revisar + crear) y, a continuación, en **Create** (Crear).

15. Una vez finalizado el despliegue, haz clic en **Done** (Hecho) en la page (página) de integración de Azure en Datadog para actualizar la lista y revisar el registro de la aplicación recién añadida.

## Siguientes pasos

- Verifique al [dashboard de Azure Overview][3] para empezar a obtener información sobre tu entorno de Azure.
- Verifica [plantillas de monitor (noun) de Azure][4] para empezar a recibir alertas de los datos importantes para tu organización.


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/azure/azure-resource-manager/management/overview
[2]: /es/security/cloud_security_management/
[3]: https://app.datadoghq.com/dash/integration/71/azure-overview
[4]: https://app.datadoghq.com/monitors/templates?q=azure
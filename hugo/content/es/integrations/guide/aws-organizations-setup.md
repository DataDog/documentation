---
description: Pasos para configurar la integración de AWS de Datadog para una organización
  de AWS
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-integrating-100-aws-accounts-with-datadog/
  tag: Centro de arquitectura
  text: Una guía para integrar más de 100 cuentas de AWS con Datadog
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: Guía
  text: Solución de problemas de la integración de AWS
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: Blog
  text: Métricas clave para hacer un seguimiento de AWS
- link: https://www.datadoghq.com/blog/cloud-security-posture-management/
  tag: Blog
  text: Presentación de Datadog Cloud Security Posture Management
- link: https://www.datadoghq.com/blog/datadog-workload-security/
  tag: Blog
  text: Proteja su infraestructura en tiempo real con Datadog Cloud Workload Security
- link: https://www.datadoghq.com/blog/announcing-cloud-siem/
  tag: Blog
  text: Anuncio de Datadog Security Monitoring
title: Configuración de la integración de AWS para varias cuentas para AWS Organizations
---
## Descripción general {#overview}

Esta guía proporciona una descripción general del proceso para configurar la [integración de AWS][8] con varias cuentas dentro de una organización de AWS.

La plantilla de CloudFormation StackSet proporcionada por Datadog automatiza la creación del rol de IAM requerido y las políticas asociadas en cada cuenta de AWS bajo una organización o unidad organizativa (OU), y configura las cuentas dentro de Datadog, eliminando la necesidad de una configuración manual. Una vez configurada, la integración comienza automáticamente a recopilar métricas y eventos de AWS para que pueda comenzar a hacer un seguimiento de su infraestructura.

El StackSet de CloudFormation de Datadog realiza los siguientes pasos:

1. Implementa el stack de AWS CloudFormation de Datadog en cada cuenta bajo una organización o unidad organizativa (OU) de AWS.
2. Crea automáticamente el rol y las políticas de IAM necesarios en las cuentas de destino.
3. Inicia automáticamente la ingesta de métricas y eventos de AWS CloudWatch desde los recursos de AWS en las cuentas.
4. Deshabilita opcionalmente la recopilación de métricas para la infraestructura de AWS. Esto es útil para casos de uso específicos de Cloud Cost Management (CCM) o Cloud Security Misconfigurations.
5. Configura opcionalmente Cloud Security Misconfigurations para monitorear las configuraciones erróneas de recursos en sus cuentas de AWS.

**Nota**: El StackSet no configura el reenvío de registros en las cuentas de AWS. Para configurar los registros, siga los pasos en la guía de [Recopilación de registros][2].


## Requisitos previos {#prerequisites}

1. **Acceso a la cuenta de administración**: Su usuario de AWS necesita poder acceder a la cuenta de administración de AWS.
2. **Un administrador de cuentas ha habilitado el acceso de confianza con AWS Organizations**: Consulte [Habilitar el acceso de confianza con AWS Organizations][3] para habilitar el acceso de confianza entre StackSets y Organizations, para crear e implementar stacks utilizando permisos administrados por el servicio.

**Nota**: La configuración de varias cuentas de AWS Organizations no admite la implementación sobre integraciones de cuentas de AWS configuradas individualmente existentes. Si un StackSet apunta a una cuenta que ya está integrada individualmente con Datadog, la integración de cuenta existente se elimina.

## Configuración {#setup}

Para comenzar, vaya a la [página de configuración de integración de AWS][1] en Datadog y haga clic en **Agregar cuenta(s) de AWS** -> **Agregar varias cuentas de AWS** -> **CloudFormation StackSet**.

Haga clic en **Iniciar CloudFormation StackSet**. Esto abre la consola de AWS y carga un nuevo StackSet de CloudFormation. Mantenga la opción predeterminada de `Service-managed permissions` en AWS.  
  
Siga los pasos a continuación en la consola de AWS para crear e implementar su StackSet:

1. **Elija una plantilla**  
Copie la URL de la plantilla de la página de configuración de integración de AWS de Datadog para usarla en el parámetro `Specify Template` en el StackSet.


2. **Especifique los detalles del StackSet**
    - Seleccione su clave de Datadog API en la página de configuración de integración de AWS de Datadog y utilícela en el parámetro `DatadogApiKey` en el StackSet.
    - Seleccione su clave de APP de Datadog en la página de configuración de integración de AWS de Datadog y utilícela en el parámetro `DatadogAppKey` en el StackSet.

    - *Opcional:*  
        1. Habilite [Cloud Security Misconfigurations][5] para escanear su entorno de nube, hosts y contenedores en busca de configuraciones erróneas y riesgos de seguridad.  
        1. Deshabilite la recopilación de métricas si no desea hacer un seguimiento de su infraestructura de AWS. Esto se recomienda solo para casos de uso específicos de [Cloud Cost Management][6] (CCM) o [Cloud Security Misconfigurations][5].

3. **Configure las opciones de StackSet**  
Mantenga la opción **Execution configuration** como `Inactive` para que el StackSet realice una operación a la vez.

4. **Establezca las opciones de implementación**
    - Puede configurar su `Deployment targets` para implementar la integración de Datadog en toda una Organización o en una o más Unidades Organizativas.


    - Mantenga `Automatic deployment` habilitado para implementar automáticamente la integración de AWS de Datadog en las nuevas cuentas que se agreguen a la Organización o a la OU.

    - En **Specify regions**, seleccione una única región en la que desee implementar la integración en cada cuenta de AWS.   
      **NOTA**: El StackSet crea recursos IAM globales que no son específicos de una región. Si se seleccionan varias regiones en este paso, la implementación fallará. 

    - Establezca la configuración predeterminada en **Deployment options** como secuencial, para que las operaciones de StackSets se implementen en una región a la vez.

5. **Revisar**  
    Vaya a la página **Revisar** y haga clic en **Enviar**. Esto inicia el proceso de creación para el StackSet de Datadog. Esto podría tomar varios minutos dependiendo de cuántas cuentas necesiten ser integradas. Asegúrese de que el StackSet cree correctamente todos los recursos antes de continuar.

    Después de que se creen los stacks, regrese a la página de configuración de integración de AWS en Datadog y haga clic en **Done**. Puede tomar unos minutos ver las métricas y los eventos reportados desde sus cuentas de AWS recién integradas.

6. *(Opcional)* **Integrar la cuenta de administración de AWS**

   La cuenta de administración de AWS no se implementa automáticamente después de esta configuración de StackSet, debido a las restricciones de AWS sobre [Service-managed permissions][10].
   Siga los pasos en [Datadog-Amazon Cloudformation][9] para integrar la cuenta de administración de AWS.


## Habilitar integraciones para servicios individuales de AWS {#enable-integrations-for-individual-aws-services}

Consulte la [página de integraciones][4] para obtener una lista completa de las subintegraciones disponibles que se pueden habilitar en cada cuenta de AWS monitoreada. Cualquier subintegración que envíe datos a Datadog se instala automáticamente cuando se reciben datos de la integración.

## Enviar registros {#send-logs}

El StackSet no configura el reenvío de registros en las cuentas de AWS. Para configurar los registros, siga los pasos en la guía de [Recopilación de registros][2].

## Desinstalar la integración de AWS {#uninstall-aws-integration}

Para desinstalar la integración de AWS de todas las cuentas y regiones de AWS en una organización, primero elimine todas las StackInstances y luego el StackSet. Siga los pasos descritos en [Eliminar un StackSet][7] para eliminar las StackInstances y el StackSet creados. 

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services/
[2]: /es/integrations/amazon_web_services/#log-collection
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-orgs-enable-trusted-access.html
[4]: /es/integrations/#cat-aws
[5]: /es/security/cloud_security_management/setup/
[6]: https://docs.datadoghq.com/es/cloud_cost_management/?tab=aws
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-delete.html
[8]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[9]: https://docs.datadoghq.com/es/integrations/guide/amazon_cloudformation/
[10]: https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_DeploymentTargets.html
---
description: Pasos para configurar la integración Datadog AWS para una organización
  AWS
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: Guía
  text: Solucionar problemas de integración de AWS
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: Blog
  text: Métricas clave para la monitorización de AWS
- link: https://www.datadoghq.com/blog/cloud-security-posture-management/
  tag: Blog
  text: Presentación de Datadog Cloud Security Posture Management
- link: https://www.datadoghq.com/blog/datadog-workload-security/
  tag: Blog
  text: Asegura tu infraestructura en tiempo real con Datadog Cloud Workload Security
- link: https://www.datadoghq.com/blog/announcing-cloud-siem/
  tag: Blog
  text: Presentación de Datadog Security Monitoring
title: Configuración multicuenta de la integración AWS para organizaciones AWS
---

## Información general

En esta guía se proporciona información general del proceso para configurar la [integración AWS][8] con múltiples cuentas dentro de una organización AWS.

La plantilla del CloudFormation StackSet proporcionada por Datadog automatiza la creación del rol IAM requerido y las políticas asociadas en cada cuenta AWS bajo una organización o unidad organizativa (OU) y configura las cuentas en Datadog, eliminando la necesidad de configuración manual. Una vez configurada, la integración comienza automáticamente a recopilar métricas y eventos de AWS para que comiences a monitorizar tu infraestructura.

El Datadog CloudFormation StackSet realiza los siguientes pasos:

1. Despliega el stack tecnológico CloudFormation de Datadog AWS en todas las cuentas de una organización o unidad organizativa de AWS.
2. Crea automáticamente el rol y las políticas IAM necesarios en las cuentas de destino.
3. Inicia automáticamente la ingestión de métricas y eventos de AWS CloudWatch desde los recursos AWS de las cuentas.
4. Desactiva opcionalmente la recopilación de métricas de la infraestructura AWS. Esto es útil para casos de uso específicos de Cloud Cost Management (CCM) o Cloud Security Management Misconfigurations (CSM Misconfigurations).
5. También puedes configurar CSM Misconfigurations para monitorizar errores de configuración de recursos en tus cuentas de AWS.

**Nota**: El StackSet no configura el reenvío de logs en las cuentas de AWS. Para configurar logs, sigue los pasos de la guía [Recopilación de logs][2].


## Requisitos previos

1. **Acceso a la cuenta de gestión**: Tu usuario de AWS debe poder acceder a la cuenta de gestión de AWS.
2. **Un administrador de cuenta ha habilitado el acceso de confianza con organizaciones AWS**: Consulta [Habilitar el acceso de confianza con organizaciones AWS][3] para habilitar el acceso de confianza entre StackSets y organizaciones, con el fin de crear y desplegar stacks tecnológicos utilizando permisos gestionados por servicios.

## Configuración

Para empezar, ve a la [página de configuración de la integración AWS][1] en Datadog y haz clic en **Add AWS Account(s)** -> **Add Multiple AWS Accounts** -> **CloudFormation StackSet** (Añadir cuenta(s) de AWS -> Añadir múltiples cuentas de AWS -> CloudFormation StackSet).

Haz clic en **Launch CloudFormation StackSet** (Lanzar CloudFormation StackSet). Esto abre la consola AWS y carga una CloudFormation StackSet nueva. Mantén la opción predeterminada de `Service-managed permissions` en AWS. 

Sigue los pasos que se indican a continuación en la consola AWS para crear y desplegar tu StackSet:

1. **Elegir una plantilla**
Copia la URL de la plantilla de la página de configuración de la integración Datadog AWS para utilizarla en el parámetro `Specify Template` del StackSet.


2. **Especificar los detalles del StackSet**
    - Selecciona tu clave de API Datadog en la página de configuración de la integración Datadog AWS y utilízala en el parámetro `DatadogApiKey` del StackSet.
    - Selecciona tu clave de API Datadog en la página de configuración de la integración Datadog AWS y utilízala en el parámetro `DatadogAppKey` del StackSet.

    - *Opcionalmente:*  
        a. Activa [Cloud Security Management Misconfigurations][5] (CSM Misconfigurations) para analizar tus entornos, hosts, y contenedores de nube en busca de errores de configuración y riesgos de seguridad.
        b. Desactiva la recopilación de métricas si no quieres monitorizar tu infraestructura AWS. Esto es recomendado sólo para casos de uso específicos de [Cloud Cost Management][6] (CCM) o [CSM Misconfigurations][5].

3. **Configurar opciones de StackSet**
Mantén la opción **Configuración de la ejecución** como `Inactive` para que el StackSet realice una operación por vez.

4. **Configurar opciones de despliegue**
    - Puedes configurar tu `Deployment targets` para desplegar la integración Datadog en una organización o en una o más unidades organizativas.


    - Mantén `Automatic deployment` activado para desplegar automáticamente la integración Datadog AWS en las nuevas cuentas que se añadan a la organización o unidad organizativa.

    - En **Especificar regiones**, selecciona una única región en la que quieras desplegar la integración en cada cuenta de AWS.   
      **NOTA**: El StackSet crea recursos IAM globales que no son específicos de una región. Si se seleccionan varias regiones en este paso, el despliegue fallará. 

    - Define la configuración predeterminada en **Opciones de despliegue** para que sea secuencial, de modo que las operaciones de los StackSets se desplieguen en una región por vez.

5. **Revisar**
    Ve a la página **Revisión** y haz clic en **Submit** (Enviar). Esto inicia el proceso de creación del Datadog StackSet. Esto puede tardar varios minutos dependiendo del número de cuentas que deban integrarse. Asegúrate de que el StackSet crea correctamente todos los recursos antes de continuar.

    Una vez creados los stacks tecnológicos vuelve a la página de configuración de la integración AWS en Datadog y haz clic en **Done** (Listo). Podrías tardar unos minutos en ver métricas y eventos informar de tus cuentas de AWS recién integradas.

6. *(Opcional)* **Integrar la cuenta de gestión de AWS**

   La cuenta de gestión de AWS no se despliega automáticamente después de esta configuración del StackSet, debido a las restricciones de AWS en los [permisos gestionados por servicios][10].
   Sigue los pasos indicados en [Datadog-Amazon Cloudformation][9] para integrar la cuenta de gestión de AWS.


## Habilitar las integraciones de servicios concretos de AWS

Consulta la [página Integraciones][4] para obtener una lista completa de las sub-integraciones disponibles que pueden habilitarse en cada cuenta de AWS monitorizada. Cualquier sub-integración que envíe datos a Datadog se instala automáticamente cuando se reciben datos de la integración.

## Enviar logs

El StackSet no configura el reenvío de logs en las cuentas de AWS. Para configurar los logs, sigue los pasos de la guía [Recopilación de logs][2].

## Desinstalar la integración AWS

Para desinstalar la integración AWS de todas las cuentas y regiones de AWS de una organización, elimina primero todas las StackInstances y después el StackSet. Sigue los pasos descritos en [Eliminar un StackSet][7] para eliminar las StackInstances y el StackSet creados. 

## Referencias adicionales

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
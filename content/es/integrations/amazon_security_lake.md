---
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
- network
- seguridad
custom_kind: integración
dependencies: []
description: Incorpora logs de Amazon Security Lake.
doc_link: ''
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
  tag: Blog
  text: Aspectos destacados de AWS re:Invent 2022
git_integration_title: amazon_security_lake
has_logo: true
integration_id: amazon-security-lake
integration_title: Amazon Security Lake
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_security_lake
public_title: Integración de Datadog con Amazon Security Lake
short_description: Incorpora logs de Amazon Security Lake.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon Security Lake es un lago de datos de seguridad para agregar y gestionar datos de eventos y logs de seguridad.

Esta integración incorpora los logs de seguridad almacenados en Amazon Security Lake a Datadog para realizar investigaciones más exhaustivas y detectar amenazas en tiempo real. Para obtener más información sobre Amazon Security Lake, consulta la [guía del usuario de Amazon Security Lake][1] en AWS.

## Configuración

### Requisitos previos

1. Amazon Security Lake se debe configurar para tu cuenta u organización de AWS. Consulta la [guía del usuario de Amazon Security Lake][1] para obtener más detalles.
2. Debes tener una cuenta de Datadog que use [Datadog Log Management][2] y [Datadog Cloud SIEM][3].
3. Si aún no lo has hecho, configura la [integración de Amazon Web Services][4] para la cuenta de AWS donde almacena datos Amazon Security Lake.

**Nota:** Si solo quieres integrar esta cuenta de AWS para usar la integración de Amazon Security Lake, puedes deshabilitar la recopilación de métricas en la [página de la integración de AWS][5] a fin de que Datadog no monitorice tu infraestructura de AWS y no se te facture por la [monitorización de infraestructura][6].

### Recopilación de logs
1. Añade la siguiente política de IAM a tu rol de IAM `DatadogIntegrationRole` existente para que Datadog pueda incorporar archivos de log nuevos añadidos a tu lago de seguridad.
{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DatadogSecurityLakeAccess",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::aws-security-data-lake-*"
      }
  ]
}
{{< /code-block >}}

2. En la consola de AWS para Amazon Security Lake, crea un suscriptor para Datadog y completa el formulario. Para obtener más información sobre un suscriptor de Amazon Security Lake, lee la [guía del usuario de Amazon Security Lake][1].
   - Ingresa `Datadog` para el nombre del suscriptor.
   - Selecciona `All log and event sources` (Todas las fuentes de logs y eventos) o `Specific log and event sources` (Fuentes de logs y eventos específicos) para enviar a Datadog.
   - Selecciona `S3` como método de acceso a los datos.

{{< site-region region="us,us3,us5,eu,gov" >}}
3. En el mismo formulario, completa las credenciales del suscriptor.
   - En **Account ID** (ID de cuenta), ingresa `464622532012`.
   - En **External ID** (ID externo), abre una pestaña nueva y dirígete a la [página de la integración de AWS][7] en Datadog para tu cuenta de AWS. El **AWS External ID** (ID externo de AWS) se encuentra en la pestaña **Account Details** (Detalles de la cuenta). Cópialo y pégalo en el formulario de AWS.
   - En **Subscriber role** (Rol del suscriptor), ingresa `DatadogSecurityLakeRole`. **Nota:** Datadog no usará este rol ya que `DatadogIntegrationRole` tendrá los permisos necesarios en el paso 1.
   - En **API destination role** (Rol de destino de la API), ingresa `DatadogSecurityLakeAPIDestinationRole`.
   - En **Subscription endpoint** (Endpoint de suscripción), el valor depende del [sitio de Datadog][8] que uses: <code>https://api.{{< region-param key="dd_site" >}}/api/intake/aws/securitylake</code>

     **Nota:** Si el endpoint anterior no refleja tu región, alterna el menú desplegable **Datadog site** (Sitio de Datadog) a la derecha de esta página de documentación para cambiar de región.
   - En **HTTPS key name** (Nombre de clave HTTPS), ingresa `DD-API-KEY`.
   - En **HTTPS key value** (Valor de clave HTTPS), abre una pestaña nueva y dirígete a la [página de claves de API][9] en Datadog para buscar o crear una clave de API de Datadog. Cópiala y pégala en el formulario en AWS.

[7]: https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details
[8]: https://docs.datadoghq.com/es/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="ap1" >}}
3. En el mismo formulario, completa las credenciales del suscriptor.
   - En **Account ID** (ID de cuenta), ingresa `417141415827`.
   - En **External ID** (ID externo), abre una pestaña nueva y dirígete a la [página de la integración de AWS][7] en Datadog para tu cuenta de AWS. El **AWS External ID** (ID externo de AWS) se encuentra en la pestaña **Account Details** (Detalles de la cuenta). Cópialo y pégalo en el formulario de AWS.
   - En **Subscriber role** (Rol del suscriptor), ingresa `DatadogSecurityLakeRole`. **Nota:** Datadog no usará este rol ya que `DatadogIntegrationRole` tendrá los permisos necesarios en el paso 1.
   - En **API destination role** (Rol de destino de la API), ingresa `DatadogSecurityLakeAPIDestinationRole`.
   - En **Subscription endpoint** (Endpoint de suscripción), el valor depende del [sitio de Datadog][8] que uses: <code>https://api.{{< region-param key="dd_site" >}}/api/intake/aws/securitylake</code>

     **Nota:** Si el endpoint anterior no refleja tu región, alterna el menú desplegable **Datadog site** (Sitio de Datadog) a la derecha de esta página de documentación para cambiar de región.
   - En **HTTPS key name** (Nombre de clave HTTPS), ingresa `DD-API-KEY`.
   - En **HTTPS key value** (Valor de clave HTTPS), abre una pestaña nueva y dirígete a la [página de claves de API][9] en Datadog para buscar o crear una clave de API de Datadog. Cópiala y pégala en el formulario en AWS.

[7]: https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details
[8]: https://docs.datadoghq.com/es/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

4. Haz clic en **Create** (Crear) para completar la creación del suscriptor.
5. Espera unos minutos y luego comienza a explorar tus logs de Amazon Security Lake en el [explorador de logs de Datadog][7].

A fin de obtener más información sobre cómo puedes usar esta integración para la detección de amenazas en tiempo real, consulta el [blog][8].

## Datos recopilados

### Métricas

La integración de Amazon Security Lake no incluye métricas.

### Eventos

La integración de Amazon Security Lake no incluye eventos.

### Checks de servicios

La integración de Amazon Security Lake no incluye checks de servicio.

## Solucionar problemas

### Permisos

Repasa la [guía de solución de problemas][9] a fin de asegurarte de que tu cuenta de AWS haya configurado de manera correcta el rol de IAM para Datadog.

### Creación de suscriptores

Consulta la [guía del usuario de Amazon Security Lake][1] sobre cómo crear un suscriptor para obtener orientación sobre la solución de problemas.

¿Necesitas ayuda adicional? Ponte en contacto con el [servicio de asistencia de Datadog][10].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/security-lake/latest/userguide/
[2]: https://www.datadoghq.com/product/log-management/
[3]: https://www.datadoghq.com/product/cloud-security-management/cloud-siem/
[4]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[5]: https://app.datadoghq.com/integrations/amazon-web-services?panel=metric-collection
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[7]: https://app.datadoghq.com/logs?query=source%3Aamazon-security-lake&cols=host%2Cservice%2C%40task_name%2C%40identity.user.type%2Caws.source%2C%40network.client.ip%2C%40identity.session.mfa%2C%40evt.name%2C%40connection_info.direction&index=%2A&messageDisplay=inline
[8]: https://www.datadoghq.com/blog/analyze-amazon-security-lake-logs-with-datadog
[9]: https://docs.datadoghq.com/es/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[10]: https://docs.datadoghq.com/es/help/
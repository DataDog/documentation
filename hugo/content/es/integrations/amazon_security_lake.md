---
app_id: amazon_security_lake
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
- network
- seguridad
custom_kind: integración
description: Incorpora logs de Amazon Security Lake.
further_reading:
- link: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
  tag: Blog
  text: Aspectos destacados de AWS re:Invent 2022
title: Amazon Security Lake
---
## Información general

Amazon Security Lake es un lago de datos de seguridad para agregar y gestionar datos de eventos y logs de seguridad.

Esta integración ingiere logs de seguridad almacenados en Amazon Security Lake en Datadog para su posterior investigación y detección de amenazas en tiempo real. Para obtener más información sobre Amazon Security Lake, visita la [Guía del usuario de Amazon Security Lake](https://docs.aws.amazon.com/security-lake/latest/userguide/) en AWS.

## Configuración

### Requisitos previos

1. Amazon Security Lake debe configurarse para tu cuenta de AWS u organización de AWS. Consulta la [Guía del usuario de Amazon Security Lake](https://docs.aws.amazon.com/security-lake/latest/userguide/) para obtener más detalles.
1. Debes tener una cuenta de Datadog que utilice [Datadog Log Management](https://www.datadoghq.com/product/log-management/) y [Datadog Cloud SIEM](https://www.datadoghq.com/product/cloud-security-management/cloud-siem/).
1. Si aún no lo has hecho, configura la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/) para la cuenta de AWS en la que Amazon Security Lake almacena datos.

**Nota:** Si solo deseas integrar esta cuenta de AWS para utilizar la integración de Amazon Security Lake, puedes desactivar la recopilación de métricas en la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services?panel=metric-collection) para que Datadog no monitorice tu infraestructura de AWS y no se te facture [Infrastructure Monitoring](https://www.datadoghq.com/product/infrastructure-monitoring/).

### Recopilación de logs

1. Añade la siguiente política de IAM a tu rol de IAM `DatadogIntegrationRole` existente para que Datadog pueda incorporar archivos de log nuevos añadidos a tu lago de seguridad.
   {{< code-block lang="yaml" collapsible="true" >}}
   {
   "Version": "2012-10-17",
   "Statement": \[
   {
   "Sid": "DatadogSecurityLakeAccess"
   "Effect": "Allow"
   "Action": \[
   "s3:GetObject"
   \],
   "Resource": "arn:aws:s3:::aws-security-data-lake-\*"
   }
   \]
   }
   {{< /code-block >}}

1. En la consola de AWS para Amazon Security Lake, crea un suscriptor para Datadog y rellena el formulario. Para obtener más información sobre un suscriptor de Amazon Security Lake, lee la [Guía del usuario de Amazon Security Lake](https://docs.aws.amazon.com/security-lake/latest/userguide/).

   - Ingresa `Datadog` para el nombre del suscriptor.
   - Selecciona `All log and event sources` (Todas las fuentes de logs y eventos) o `Specific log and event sources` (Fuentes de logs y eventos específicos) para enviar a Datadog.
   - Selecciona `S3` como método de acceso a los datos.

{{< site-region region="us,us3,us5,eu,gov" >}}
3\. En el mismo formulario, rellena las Credenciales del suscriptor.

- En **Account ID** (ID de cuenta), ingresa `464622532012`.

- En **External ID** (ID externo), abre una nueva pestaña y ve a la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details) en Datadog para tu cuenta de AWS. El **ID externo** de AWS se encuentra en la pestaña **Account Details** (Detalles de la cuenta). Cópialo y pégalo en el formulario de AWS.

- En **Subscriber role** (Rol del suscriptor), ingresa `DatadogSecurityLakeRole`. **Nota:** Datadog no usará este rol ya que `DatadogIntegrationRole` tendrá los permisos necesarios en el paso 1.

- En **API destination role** (Rol de destino de la API), ingresa `DatadogSecurityLakeAPIDestinationRole`.

- En **Subscription endpoint** (Endpoint de suscripción), este valor depende del [sitio de Datadog](https://docs.datadoghq.com/getting_started/site/) que estés utilizando: <code>https://api.{{< region-param key="dd_site" >}}/api/intake/aws/securitylake</code>

  **Nota:** Si el endpoint anterior no refleja tu región, alterna el menú desplegable **Datadog site** (Sitio de Datadog) a la derecha de esta página de documentación para cambiar de región.

- En **HTTPS key name** (Nombre de clave HTTPS), ingresa `DD-API-KEY`.

- En **HTTPS key value** (Valor de clave HTTPS), abre una pestaña nueva y dirígete a la [página de claves de API](https://app.datadoghq.com/organization-settings/api-keys) en Datadog para buscar o crear una clave de API de Datadog. Cópiala y pégala en el formulario en AWS.

{{< /site-region >}}

{{< site-region region="ap1" >}}
3\. En el mismo formulario, rellena las Credenciales del suscriptor.

- En **Account ID** (ID de cuenta), ingresa `417141415827`.

- En **External ID** (ID externo), abre una nueva pestaña y ve a la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details) en Datadog para tu cuenta de AWS. El **ID externo** de AWS se encuentra en la pestaña **Account Details** (Detalles de la cuenta). Cópialo y pégalo en el formulario de AWS.

- En **Subscriber role** (Rol del suscriptor), ingresa `DatadogSecurityLakeRole`. **Nota:** Datadog no usará este rol ya que `DatadogIntegrationRole` tendrá los permisos necesarios en el paso 1.

- En **API destination role** (Rol de destino de la API), ingresa `DatadogSecurityLakeAPIDestinationRole`.

- En **Subscription endpoint** (Endpoint de suscripción), este valor depende del [sitio de Datadog](https://docs.datadoghq.com/getting_started/site/) que estés utilizando: <code>https://api.{{< region-param key="dd_site" >}}/api/intake/aws/securitylake</code>

  **Nota:** Si el endpoint anterior no refleja tu región, alterna el menú desplegable **Datadog site** (Sitio de Datadog) a la derecha de esta página de documentación para cambiar de región.

- En **HTTPS key name** (Nombre de clave HTTPS), ingresa `DD-API-KEY`.

- En **HTTPS key value** (Valor de clave HTTPS), abre una pestaña nueva y dirígete a la [página de claves de API](https://app.datadoghq.com/organization-settings/api-keys) en Datadog para buscar o crear una clave de API de Datadog. Cópiala y pégala en el formulario en AWS.

{{< /site-region >}}

{{< site-region region="ap2" >}}
3\. En el mismo formulario, rellena las Credenciales del suscriptor.

- En **Account ID** (ID de cuenta), introduce `412381753143`.

- En **External ID** (ID externo), abre una nueva pestaña y ve a la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details) en Datadog para tu cuenta de AWS. El **ID externo** de AWS se encuentra en la pestaña **Account Details** (Detalles de la cuenta). Cópialo y pégalo en el formulario de AWS.

- En **Subscriber role** (Rol del suscriptor), ingresa `DatadogSecurityLakeRole`. **Nota:** Datadog no usará este rol ya que `DatadogIntegrationRole` tendrá los permisos necesarios en el paso 1.

- En **API destination role** (Rol de destino de la API), ingresa `DatadogSecurityLakeAPIDestinationRole`.

- En **Subscription endpoint** (Endpoint de suscripción), este valor depende del [sitio de Datadog](https://docs.datadoghq.com/getting_started/site/) que estés utilizando: <code>https://api.{{< region-param key="dd_site" >}}/api/intake/aws/securitylake</code>

  **Nota:** Si el endpoint anterior no refleja tu región, alterna el menú desplegable **Datadog site** (Sitio de Datadog) a la derecha de esta página de documentación para cambiar de región.

- En **HTTPS key name** (Nombre de clave HTTPS), ingresa `DD-API-KEY`.

- En **HTTPS key value** (Valor de clave HTTPS), abre una pestaña nueva y dirígete a la [página de claves de API](https://app.datadoghq.com/organization-settings/api-keys) en Datadog para buscar o crear una clave de API de Datadog. Cópiala y pégala en el formulario en AWS.

{{< /site-region >}}

4. Haz clic en **Create** (Crear) para completar la creación del suscriptor.
1. Espera varios minutos, luego comienza a explorar tus logs desde Amazon Security Lake en el [Log Explorer de Datadog](https://app.datadoghq.com/logs?query=source%3Aamazon-security-lake&cols=host%2Cservice%2C%40task_name%2C%40identity.user.type%2Caws.source%2C%40network.client.ip%2C%40identity.session.mfa%2C%40evt.name%2C%40connection_info.direction&index=%2A&messageDisplay=inline).

Para obtener más información sobre cómo puedes utilizar esta integración para la detección de amenazas en tiempo real, consulta el [blog](https://www.datadoghq.com/blog/analyze-amazon-security-lake-logs-with-datadog).

## Datos recopilados

### Métricas

La integración de Amazon Security Lake no incluye métricas.

### Eventos

La integración de Amazon Security Lake no incluye eventos.

### Checks de servicio

La integración de Amazon Security Lake no incluye checks de servicio.

## Solucionar problemas

### Permisos

Revisa la [guía de solución de problemas](https://docs.datadoghq.com/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle) para asegurarte de que tu cuenta de AWS ha configurado correctamente el rol de IAM para Datadog.

### Creación de suscriptores

Revisa la [Guía del usuario de Amazon Security Lake](https://docs.aws.amazon.com/security-lake/latest/userguide/) sobre la creación de un suscriptor para obtener orientación sobre la solución de problemas.

¿Necesitas más ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}
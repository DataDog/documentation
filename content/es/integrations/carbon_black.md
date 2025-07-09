---
categories:
- recopilación de logs
- Seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/carbon_black.md
description: Recopilar tus registros de defensa de Carbon Black
doc_link: https://docs.datadoghq.com/integrations/carbon_black/
has_logo: true
integration_id: carbonblack
integration_title: Carbon Black
is_public: true
name: carbon_black
public_title: Integración de Datadog y Carbon Black
short_description: Recopilar tus registros de defensa de Carbon Black
version: '1.0'
---

## Información general

Utiliza la integración de Carbon Black con Datadog para reenviar tus eventos y alertas de Carbon Black EDR como logs de Datadog.


## Configuración

### Instalación

Datadog utiliza el reenvío de eventos de Carbon Black y el reenvío Lambda de Datadog para recopilar eventos y alertas de Carbon Black de tu bucket de S3.

Carbon Black proporciona una [colección de Postman][1] para la API que utilizas para crear el reenvío de eventos de Carbon Black.

#### Configuración

1. [Instala el Datadog Forwarder][2].
2. [Crea un bucket en tu consola de administración de AWS][3] para reenviar eventos.
3. [Configura el bucket de S3 para permitir que el forwarder de Carbon Black escriba datos][4].
   - **Importante**: El bucket de S3 debe tener un prefijo con la palabra clave `carbon-black` en el que entran los eventos de CB. Esto permite que Datadog reconozca correctamente la fuente de los logs.
5. [Crea un nivel de acceso en la consola de Carbon Black Cloud][5].
6. [Crea una clave API en la consola de Carbon Black Cloud][6].
7. [Configura la API en Postman][7] actualizando el valor de las siguientes variables de entorno de Postman con la clave creada anteriormente: `cb_url`, `cb_org_key`, `cb_custom_id` y `cb_custom_key`.
8. [Crea dos forwarders de eventos de Carbon Black][8] con diferentes nombres para las alertas de Carbon Black (`"type": "alert"`) y los eventos de endpoint (`"type": "endpoint.event"`).
9. [Configura el Datadog Forwarder para que se active en el bucket de S3][9].


## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

[1]: https://documenter.getpostman.com/view/7740922/SWE9YGSs?version=latest
[2]: /es/logs/guide/forwarder/
[3]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-a-bucket
[4]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#configure-bucket-to-write-events
[5]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-access-level
[6]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-new-api-key
[7]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#configure-api-in-postman
[8]: https://community.carbonblack.com/t5/Developer-Relations/Carbon-Black-Cloud-Data-Forwarder-Quick-Setup-amp-S3-Bucket/td-p/89194#create-new-forwarder
[9]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#collecting-logs-from-s3-buckets
[10]: /es/help/
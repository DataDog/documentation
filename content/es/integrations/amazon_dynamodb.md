---
"aliases":
- "/integrations/awsdynamo/"
"app_id": "amazon-dynamodb"
"app_uuid": "dc7abf1f-b346-49bb-a02d-83a4bda1d493"
"assets":
  "dashboards":
    "amazon-dynamodb": "assets/dashboards/amazon_dynamodb_overview.json"
  "integration":
    "auto_install": falso
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "aws.dynamodb.table_size"
      "metadata_path": "assets/metrics/metric-spec.yaml"
      "prefix": "aws.dynamodb"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "96"
    "source_type_name": "Amazon DynamoDB"
  "monitors":
    "DynamoDB Throttled Requests is High": "assets/monitors/rec_mon_throttles.json"
    "Read Consumed Capacity is High": "assets/monitors/rec_mon_read_cap_high.json"
    "Write Consumed Capacity is High": "assets/monitors/rec_mon_write_cap_high.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "aws"
- "metrics"
- "cloud"
"custom_kind": "integración"
"dependencies": []
"description": "Controla el tamaño de la tabla, la capacidad de lectura/escritura, la latencia de las solicitudes y mucho más"
"display_on_public_website": verdadero
"doc_link": "https://docs.datadoghq.com/integrations/amazon_dynamodb/"
"draft": falso
"git_integration_title": "amazon_dynamodb"
"has_logo": verdadero
"integration_id": "amazon-dynamodb"
"integration_title": "Amazon DynamoDB"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "amazon_dynamodb"
"public_title": "Amazon DynamoDB"
"short_description": "Amazon DynamoDB es un servicio de base de datos NoSQL rápido y flexible"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::AWS"
  - "Category::Métricas"
  - "Category::Cloud"
  - "Offering::Integration"
  "configuration": "README.md#Configuración"
  "description": "Amazon DynamoDB es un servicio de base de datos NoSQL rápido y flexible"
  "media": []
  "overview": "README.md#Información general"
  "support": "README.md#Soporte"
  "title": "Amazon DynamoDB"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
![DynamoDB default dashboard][1]

## Información general

Amazon DynamoDB es un servicio en la nube de base de datos NoSQL totalmente gestionado, que forma parte de la cartera de AWS. Rápido y fácilmente escalable, está pensado para servir a aplicaciones que requieren una latencia muy baja, incluso cuando se trata de grandes cantidades de datos. Es compatible con los modelos de almacén de documentos y de clave-valor, y tiene propiedades tanto de base de datos como de tabla hash distribuida.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Amazon Web Services][2].

### Recopilación de métricas

1. En la [página de la integración de AWS][3], asegúrate de que `DynamoDB` está habilitado en la pestaña `Metric Collection`.
2. Añade estos permisos a tu [política de IAM de Datadog][4] para recopilar métricas de Amazon DynamoDB:

    - `dynamodb:ListTables`: se utiliza para hacer una lista de las tablas de DynamoDB disponibles.
    - `dynamodb:DescribeTable`: se utiliza para añadir métricas sobre el tamaño de una tabla y el recuento de elementos.
    - `dynamodb:ListTagsOfResource`: se utiliza para recopilar todas las etiquetas (tags) de un recurso de DynamoDB.

    Para obtener más información, consulta las [políticas de DynamoDB][5] en el sitio web de AWS.

3. Instala la [integración Datadog - Amazon DynamoDB][6].

### Recopilación de logs

#### Activar logging

En AWS CloudTrail, [crea un Trail][7] y selecciona un bucket de S3 en el que escribir logs.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder][8] en tu cuenta AWS.
2. Una vez configurada, ve a la función de Lambda del Datadog Forwarder. En la sección Información general de la función, haz clic en **Add Trigger** (Añadir activador).
3. Para configurar un activador, selecciona el activador **S3**.
4. Selecciona el bucket de S3 que contiene tus logs de Amazon DynamoDB.
5. Deja el tipo de evento como `All object create events`.
6. Haz clic en **Add** (Añadir) para añadir el activador a tu Lambda.

Ve al [Explorador de logs][9] para empezar a explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios AWS, consulta [Enviar logs de servicios AWS con la función Lambda en Datadog][10].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_dynamodb" >}}


A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de Amazon DynamoDB no incluye ningún evento.

### Checks de servicios

La integración de Amazon DynamoDB no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][12].

[1]: images/dynamodb.png
[2]: https://docs.datadoghq.com/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.datadoghq.com/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/authentication-and-access-control.html
[6]: https://app.datadoghq.com/integrations/amazon-dynamodb
[7]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-create-and-update-a-trail.html
[8]: https://docs.datadoghq.com/logs/guide/forwarder/
[9]: https://app.datadoghq.com/logs
[10]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[11]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_dynamodb/assets/metrics/metric-spec.yaml
[12]: https://docs.datadoghq.com/help/


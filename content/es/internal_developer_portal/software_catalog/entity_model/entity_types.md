---
disable_toc: false
further_reading:
- link: /internal_developer_portal/software_catalog/set_up/create_entities
  tag: Documentación
  text: Crear entidades en el Catálogo de software
- link: /internal_developer_portal/software_catalog/set_up/discover_entities
  tag: Documentación
  text: Más información sobre cómo se detectan entidades en el Catálogo de software
- link: /internal_developer_portal/software_catalog/set_up/import_entities
  tag: Documentación
  text: Importar entidades en el Catálogo de software
title: Tipos de entidades
---

## Información general

En el Catálogo de software, una entidad representa el bloque de construcción más pequeño de la arquitectura moderna basada en microservicios. A partir de la [definición del esquema v3.0 o posterior][1], una entidad puede ser un servicio instrumentado de APM, un almacén de datos, un sistema, una API, una cola o incluso una entidad definida a medida. 

Consulta GitHub para ver [definiciones completas del esquema][2].

## Tipos de entidades

{{< tabs >}}

{{% tab "Service" %}}

En APM, un [servicio][1] (`kind:service`) es un grupo de endpoints, consultas o trabajos relacionados que realizan un trabajo para tu aplicación. Por ejemplo, un servicio puede ser un grupo de endpoints, un grupo de consultas a bases de datos o un grupo de trabajos periódicos.

A través de la [instrumentación personalizada en APM][3], puedes crear un `service` arbitrario. En la práctica, la arquitectura basada en microservicios incluye múltiples servicios APM, cada uno de los cuales mide el rendimiento de los subcomponentes de la aplicación a través de [Métricas de trazas (traces)][2].

En el Catálogo de software, puedes recopilar servicios no instrumentados declarándolos a través de [metadata][4] o importándolos a través de fuentes externas como [Backstage][5] o [ServiceNow][6].

[1]: /es/glossary/#service
[2]: /es/opentelemetry/integrations/trace_metrics/
[3]: /es/tracing/trace_collection/custom_instrumentation/
[4]: /es/internal_developer_portal/software_catalog/set_up/create_entities
[5]: /es/internal_developer_portal/software_catalog/set_up/import_entities#import-from-backstage
[6]: /es/internal_developer_portal/software_catalog/set_up/import_entities#import-from-servicenow

{{% /tab %}}

{{% tab "System" %}}

En el Catálogo de software, un sistema (`kind:system`) es un grupo de entidades que cooperan para realizar una función más amplia. Por ejemplo, puedes agrupar varios servicios instrumentados de APM en un sistema, ya que los gestiona el mismo equipo. También puedes utilizar `system` para representar una arquitectura completa basada en microservicios e incluir componentes como API, almacenes de datos, colas y otros bloques de construcción comunes.

**Nota**: **Sistema** en Datadog tiene el mismo significado que el [Modelo de sistema][1] de Backstage. 

Para definir componentes dentro de un sistema, puedes especificar valores para la clave `components` en el campo `spec` de la definición de la v3 de la entidad.

Ejemplo de YAML para `kind:system`:
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
metadata:
  name: product-recommendation
  description: Surfaces personalized product suggestions in Shopist
  displayName: "Product Recommendation"
  tags:
  - producto: recomendaciones
  - business-line:shared-components
  propietario: comprador
  additionalOwners:
    - nombre: Equipo de asistencia de Shopist
      tipo: operador
spec:
  ciclo de vida: producción
  nivel: "0"
  componentes:
  - servicio: recomendación de producto
  - servicio: aplicación pedidos
  - api: productos
  - sistema: shopist-user-trends
{{< /code-block >}}

Este sistema definido por el usuario aparece en Catálogo se muestra como se muestra:
{{< img src="/tracing/software_catalog/product-rec-systemV3.png" alt="Página de sistema del sistema de recomendación de productos en el Catálogo de software" style="width:90%;" >}}

Esta página contiene datos de relación de los componentes entre el sistema y las dependencias ascendentes y descendentes, así como cuadros de mando, logs y eventos agregados de todos los componentes del sistema.

**Nota**: Si un mismo componente forma parte de varios sistemas, debes especificar dicho componente en el YAML de cada sistema.

[1]: https://backstage.io/docs/features/software-catalog/system-model/

{{% /tab %}}

{{% tab "API" %}}

En el Catálogo de software, una API (`kind:API`) se refiere a una colección de endpoints que son lógicamente inseparables. Las API ofrecen una forma alternativa de agrupar endpoints más allá de los servicios de APM (la correspondencia entre endpoints  y servicios no es modificable).

Para definir componentes dentro de una API, puedes especificar valores para la clave `components` en el campo `spec` de la definición de la v3 de la entidad. 

Ejemplo de YAML para `kind:api`:
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
{
 "apiVersion": "v3",
 "kind": "api",
 "metadata": {
   "name": "payments",
   "displayName": "Payments",
   "owner": "Payments Team",
   "links": [
     {
       "name": "Deployment Information",
       "type": "doc",
       "url": "https://wiki/products
"
     },
     {
       "name": "Source",
       "type": "repo",
       "provider": "github",
       "url": "https://github.com/"
     },
     {
       "name": "Performance Dashboard",
       "type": "dashboard",
       "url": "https://datadoghq.com"
     }
   ]
 },
 "integrations": {
   "pagerduty": {
     "serviceURL": "https://www.pagerduty.com/service-directory/products"
   }
 },
 "spec": {
   "type": "openapi",
   "implementedBy": [
     "service:payment",
     "service:payments-go"
   ],
   "interface": {
     "definition": {
       "info": {
         "title": "Payments"
       },
       "openapi": "3.0.0",
       "paths": {
         "/add_item": {
           "post": {
             "responses": {
               "200": {
                 "description": "OK"
               }
             }
           }
         },
         "/add_purchases": {
           "post": {
             "responses": {
               "200": {
                 "description": "OK"
               }
             }
           }
         },
         "/admin/update_user": {
           "post": {
             "responses": {
               "200": {
                 "description": "OK"
               }
             }
           }
         },
         "/carts": {
           "get": {
             "responses": {
               "200": {
                 "description": "OK"
               }
             }
           }
         }
       }
     }
   },
   "lifecycle": "production",
   "tier": "Tier 0"
 }
}
{{< /code-block >}}

La API definida por el usuario aparece en el Catálogo de software como se muestra:
{{< img src="/tracing/software_catalog/api-page-v3.png" alt="Página de API de la API de pagos en el Catálogo de software" style="width:90%;" >}}

Esta página contiene datos de relación de cómo la API interactúa con las dependencias, los componentes de la API, una vista previa de OpenAPI, y logs y eventos agregados a través de todos los endpoints.

**Nota**: El Catálogo de software contiene endpoints HTTP que son detectados automáticamente por APM. El concepto de endpoints corresponde a los [recursos APM][1] de un servicio web APM.

[1]: /es/tracing/glossary/#resources

{{% /tab %}}

{{% tab "Datastore" %}}

En el Catálogo de software, un almacén de datos (`kind:datastore`) representa un componente de almacenamiento de datos o una base de datos de la que dependen los servicios. Los almacenes de datos pueden representar bases de datos relacionales (como PostgreSQL o MySQL), almacenes de datos NoSQL (como Redis o MongoDB), otros almacenes de datos y cachés.

Las entidades de almacenes de datos pueden ser:
- [**Inferidas por APM**][1] cuando los servicios instrumentados realizan llamadas salientes a una base de datos (por ejemplo, una consulta PostgreSQL).
- [**Definidss manualmente**][2] para representar almacenes de datos no instrumentados o enriquecer los inferidos con metadatos adicionales.

**Nota**: Si Database Monitoring está activado, la página de la entidad del almacén de datos muestra el rendimiento de la consulta, la latencia y las tasas de error. De lo contrario, la página muestra métricas básicas derivadas de trazas y relaciones de dependencia.

### Definiciones de ejemplo de YAML

{{% collapse-content title="Definición de YAML de un almacén de datos inferido" level="h4" expanded=false id="id-para-anclaje" %}}

Este ejemplo muestra una definición de `kind:datastore` para una base de datos detectada automáticamente por APM.

**Nota**: El valor `metadata.name` debe coincidir exactamente con las [etiquetas (tags) pares](#datastore-peer-tags) utilizadas por APM.

```
apiVersion: v3
kind: datastore
metadata:
  name: peer.db.name:web-store-mongo,peer.db.system:mongodb                
  displayName: "Store Inventory DB (MongoDB)"   
  description: Stores order transaction data for Shopist e-commerce
  owner: shopist            
  additionalOwners:
    - name: infra-team
      type: team
  links:
    - name: "DB Runbook"
      type: runbook
      url: https://wiki.internal/runbooks/orders-db
    - name: "Schema Repo"
      type: repo
      provider: github
      url: https://github.com/org/orders-db-schema
integrations:
  pagerduty:
    serviceURL: https://pagerduty.com/services/ORD123  
spec:
  lifecycle: "production"              
  tier: "Tier 1"               
```

{{% /collapse-content %}}

{{% collapse-content title="Definición de YAML de un almacén de datos definido manualmente" level="h4" expanded=false id="id-para-anclaje" %}}

Este ejemplo muestra una definición de `kind:datastore` para un almacén de datos declarado manualmente.

```
apiVersion: v3
kind: datastore
metadata:
  name: web-store-mongo               
  displayName: "Store Inventory DB (MongoDB)"   
  description: Stores order transaction data for Shopist e-commerce
  owner: shopist            
  additionalOwners:
    - name: infra-team
      type: team
  links:
    - name: "DB Runbook"
      type: runbook
      url: https://wiki.internal/runbooks/orders-db
    - name: "Schema Repo"
      type: repo
      provider: github
      url: https://github.com/org/orders-db-schema
integrations:
  pagerduty:
    serviceURL: https://pagerduty.com/services/ORD123  
spec:
  lifecycle: "production"              
  tier: "Tier 1"               
```

{{% /collapse-content %}}

### Etiquetas pares de almacenes de datos

Para entidades inferidas, Datadog utiliza atributos de span (tramo) estándar para crear etiquetas `peer.*`. El valor `metadata.name` en la definición de tu entidad debe coincidir exactamente con las etiquetas pares inferidas. Los almacenes de datos definidos manualmente no necesitan seguir esta convención.

Etiquetas pares comunes para entidades de almacenes de datos:

Etiqueta par | Atributos de origen
--------------------|-------------------
`peer.aws.dynamodb.table` | `tablename`
`peer.aws.s3.bucket` | `bucketname`, `aws.s3.bucket`
`peer.cassandra.contact.points` | `db.cassandra.contact.points`
`peer.couchbase.seed.nodes` | `db.couchbase.seed.nodes`
`peer.db.name` | `db.name`, `mongodb.db`, `db.instance`, `cassandra.keyspace`, `db.namespace`
`peer.db.system` | `db.system`

Más información sobre [etiquetas pares y entidades inferidas][3].


[1]: /es/internal_developer_portal/software_catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum
[2]: /es/internal_developer_portal/software_catalog/set_up/create_entities
[3]: /es/tracing/services/inferred_services/?tab=agentv7600#naming-inferred-entities

{{% /tab %}}


{{% tab "Queue" %}}

En el Catálogo de software, una cola (`kind:queue`) representa una cola de mensajes o un componente de mensajería basado en flujos (streams) con el que interactúan los servicios. Las colas pueden representar sistemas como Apache Kafka, Amazon SQS, RabbitMQ y Google Pub/Sub.

Las entidades de cola pueden ser:
- [**Inferidas por APM**][1] cuando los servicios instrumentados producen hacia o consumen desde un sistema de mensajería.
- [**Definidas manualmente**][2] para representar colas no instrumentadas o enriquecer las inferidas con metadatos adicionales.

**Nota**: Si [Data Streams Monitoring][3] está activado, la página de la entidad de la cola muestra métricas como el rendimiento, la latencia del servicio y los errores de procesamiento. De lo contrario, la página muestra métricas básicas derivadas de trace (traza) y relaciones de dependencias de servicios.

### Definiciones de ejemplo de YAML

{{% collapse-content title="YAML for an inferred queue" level="h4" expanded=false id="inferred-queue" %}}

Este ejemplo muestra una definición de `kind:queue` para una cola detectada automáticamente por APM.

**Nota**: El valor `metadata.name` debe coincidir exactamente con las [etiquetas pares](#queue-peer-tags) utilizadas por APM.

```
apiVersion: v3
kind: queue
metadata:
  name: peer.messaging.destination:checkout-events
  displayName: "Checkout Events Queue (Kafka)"
  description: Captures all checkout-related events for downstream processing
  owner: shopist
  additionalOwners:
    - name: platform-team
      type: team
  links:
    - name: "Queue Runbook"
      type: runbook
      url: https://wiki.internal/runbooks/checkout-events
    - name: "Schema Repo"
      type: repo
      provider: github
      url: https://github.com/org/checkout-schema
integrations:
  pagerduty:
    serviceURL: https://pagerduty.com/services/MESSAGING123
spec:
  lifecycle: "production"
  tier: "Tier 1"
```

{{% /collapse-content %}}

{{% collapse-content title="YAML de una cola definida manualmente" level="h4" expanded=false id="manual-queue" %}}

Este ejemplo muestra una definición de `kind:queue` para una cola declarada manualmente.

```
apiVersion: v3
kind: queue
metadata:
  name: checkout-events-kafka
  displayName: "Checkout Events Queue (Kafka)"
  description: Captures all checkout-related events for downstream processing
  owner: shopist
  additionalOwners:
    - name: platform-team
      type: team
  links:
    - name: "Queue Runbook"
      type: runbook
      url: https://wiki.internal/runbooks/checkout-events
    - name: "Schema Repo"
      type: repo
      provider: github
      url: https://github.com/org/checkout-schema
integrations:
  pagerduty:
    serviceURL: https://pagerduty.com/services/MESSAGING123
spec:
  lifecycle: "production"
  tier: "Tier 1"
```

{{% /collapse-content %}}

### Cola de etiquetas pares

Para entidades inferidas, Datadog utiliza atributos de span estándar para crear etiquetas `peer.*`. El valor `metadata.name` en la definición de tu entidad debe coincidir exactamente con las etiquetas pares inferidas. Las colas definidas manualmente no necesitan seguir esta convención.

Etiquetas pares comunes para entidades de `kind:queue`:

Etiqueta par | Atributos de origen
--------------------|-------------------
`peer.aws.kinesis.stream` | `streamname`
`peer.aws.sqs.queue` | `queuename`
`peer.kafka.bootstrap.servers` | `messaging.kafka.bootstrap.servers`
`peer.messaging.destination` | `topicname`, `messaging.destination`, `messaging.destination.name`, `messaging.rabbitmq.exchange`, `amqp.destination`, `ampqb.queue`, `amqp.exchange`, `msmq.queue.path`, `aws.queue.name`
`peer.messaging.system` | `messaging.system`

Más información sobre [etiquetas pares y entidades inferidas][4].

[1]: /es/internal_developer_portal/software_catalog/set_up/discover_entities#automatic-discovery-with-apm-usm-and-rum
[2]: /es/internal_developer_portal/software_catalog/set_up/create_entities
[3]: /es/data_streams/
[4]: /es/tracing/services/inferred_services/?tab=agentv7600#naming-inferred-entities

{{% /tab %}}

{{% tab "Custom entities" %}}

Puedes definir tipos de entidades personalizadas más allá de servicio, sistema, almacén de datos, cola y API. Las entidades personalizadas te permiten representar cualquier componente o recurso que sea importante para tu organización pero que no encaje en las categorías estándar.

Ejemplo de YAML:
  {{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
  apiVersion: v3
  kind: library
  metadata:
    name: my-library
    displayName: My Library
    tags:
      - tag:value
    links:
      - name: shopping-cart runbook
        type: runbook
        url: https://runbook/shopping-cart
      - name: shopping-cart architecture
        provider: gdoc
        url: https://google.drive/shopping-cart-architecture
        type: doc
      - name: shopping-cart Wiki
        provider: wiki
        url: https://wiki/shopping-cart
        type: doc
      - name: shopping-cart source code
        provider: github
        url: http://github/shopping-cart
        type: repo
    contacts:
      - name: Support Email
        type: email
        contact: team@shopping.com
      - name: Support Slack
        type: slack
        contact: https://www.slack.com/archives/shopping-cart
    owner: myteam
    additionalOwners:
      - name: opsTeam
        type: operator
  {{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}

[1]: /es/internal_developer_portal/software_catalog/entity_model
[2]: https://github.com/DataDog/schema/tree/main/service-catalog/v3


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}
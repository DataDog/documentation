---
further_reading:
- link: /tracing/
  tag: Documentación
  text: Más información sobre el rastreo de Datadog APM
- link: /tracing/glossary/
  tag: Documentación
  text: Terminología y descripción general de APM
title: Captura de solicitudes y respuestas de servicios AWS
---

## Información general

AWS Payload Extraction captura los datos de solicitudes y respuestas intercambiados entre tu aplicación y los servicios AWS. Esta función adjunta la información extraída como etiquetas (tags) a tus trazas (traces), lo que te permite ver los datos en dashboards y utilizarlos para generar alertas.

## Requisitos

Se admiten los siguientes servicios AWS:

- Amazon Simple Notification Service (SNS)
- Amazon Simple Queue Service (SQS)
- Amazon Kinesis
- Amazon S3
- Amazon EventBridge

Se admiten las siguientes versiones de trazador y paquetes SDK de AWS:

| Lenguaje | Versión            | Paquetes SDK instrumentados por AWS   |
|----------|--------------------|--------------------------------|
| Node.js  | v5.25.0 o v4.49.0 o sus versiones posteriores | `@aws-sdk/*` (SDK de AWS v3)      |
| Java     | v1.42.1 o posterior            | `aws-sdk-v2`                   |
| Python   | v 2.17.0 o posterior            | `botocore` (incluyendo `boto3`) |

## Cómo funciona

AWS Payload Extraction extrae pares clave-valor de cuerpos jerárquicos de solicitudes y respuestas, convirtiéndolos en etiquetas separadas por puntos. Por ejemplo:

JSON de entrada:

```json
{  
  "Message": {  
    "foo.bar": "baz",  
    "Arr": ["a", "b"]  
  }  
}
```

Etiquetas generadas:

```text
aws.request.body.Message.foo\.bar: baz  
aws.request.body.Message.Arr.0: a  
aws.request.body.Message.Arr.1: b
```

Los rastreadores están configurados para coincidir con datos JSON anidados dentro de documentos JSON, que es un patrón común con las cargas útiles de SQS.

## Configuración general

### Activar AWS Payload Extraction

Para activar AWS Payload Extraction, configura estas variables de entorno:

```sh
# Analizar solicitudes
DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING=all

# Analizar respuestas  
DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING=all
```

Puedes elegir analizar:

- Sólo cuerpos de solicitudes
- Sólo cuerpos de de respuestas
- Tanto cuerpos de solicitudes como de respuestas

El valor `all` indica que se utiliza todo el cuerpo para generar etiquetas. Para ver más opciones de configuración, consulta [Proteger la información confidencial](#protect-sensitive-information).

### Proteger la información confidencial

Se espera que muchas de estas cargas útiles contengan *información personal identificable* (PII).

Para proteger la información confidencial, los rastreadores sustituyen los campos PII comunes por `'redacted'` (como los números de teléfono en SNS). **Nota**: No puedes desactivar los datos ocultos por defecto.

Puedes especificar campos adicionales para ocultar utilizando la sintaxis [JSONPath][1] en las variables de entorno. Por ejemplo:

```sh
DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING=$.Metadata.UserId,$.Attributes.0.Pass
```

Este ejemplo:
- Oculta el campo `UserId` dentro del objeto `Metadata`
- Oculta el campo `Pass` en el primer elemento de la matriz `Attributes`
- Aplica el ocultamiento por defecto
- Sólo procesa cuerpos de solicitudes

<div class="alert alert-info">Las reglas de ocultamiento se aplican a todos los servicios y no pueden configurarse por servicio.</div>

### Control de la profundidad de extracción de cargas útiles

Controla la profundidad máxima de extracción de cargas útiles con:

```sh
DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_DEPTH=10
```

El valor por defecto es `10`. Los nodos que superan esta profundidad se ignoran durante la generación de etiquetas. La principal razón para modificar este valor es ajustar el rendimiento.

### Desactivar AWS Payload Extraction

Configura estas variables como una cadena vacía u omitirlas desactiva la función:

```sh
DD_TRACE_CLOUD_REQUEST_PAYLOAD_TAGGING=""
DD_TRACE_CLOUD_RESPONSE_PAYLOAD_TAGGING=""
```

## Configuración específica del lenguaje

Cada implementación del rastreador proporciona opciones adicionales de configuración específicas para ese lenguaje.

{{< programming-lang-wrapper langs="nodejs,python,java" >}}

{{< programming-lang lang="nodejs" >}}
### Servicios compatibles

Los siguientes servicios son compatibles:

- SNS
- SQS
- Kinesis
- S3
- EventBridge

<div class="alert alert-info">Para solicitar compatibilidad adicional para servicios, abre una solicitud de función con el <a href="/help/">equipo de asistencia de Datadog</a>.</div>

### Reglas de ocultamiento por defecto

El rastreador Node.js aplica reglas de ocultamiento por cada servicio. Por ejemplo:
- El campo `$.Endpoint` sólo se oculta para las solicitudes de servicio SNS.
- Otros rastreadores ocultan este campo en todos los servicios.

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
### Servicios compatibles

Los siguientes servicios son compatibles:
- SNS
- SQS
- Kinesis
- S3
- EventBridge

#### Configurar servicios

Para activar la extracción de etiquetas de servicios adicionales utiliza esta variable de entorno:

```sh
# Valores por defecto
DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES=s3,sns,sqs,kinesis,eventbridge
```

Añade servicios a la lista separada por comas. Por ejemplo, para añadir la compatibilidad con AWS Amplify:

```sh
DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES=s3,sns,sqs,kinesis,eventbridge,amplify
```

<div class="alert alert-danger">
Los servicios añadidos no incluyen el ocultamiento por defecto. Prueba tu aplicación en staging para identificar y configurar ocultamientos necesarios.
</div>

#### Nombres de servicios

Los nombres de servicios distinguen entre mayúsculas y minúsculas. Para encontrar nombres válidos de servicios:
1. Visita la página [Servicios Boto3 disponibles][1].
1. Haz clic en el nombre de servicio que quieres utilizar.
1. Utiliza el nombre de servicio de la llamada `boto3.client()`.

### Configurar el número de etiquetas extraídas

Controla el número máximo de etiquetas extraídas con:

```sh
# Valor por defecto
DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS=758
```

<div class="alert alert-danger">
El valor por defecto (758) es el máximo que puede aceptar el Datadog Agent. No se recomienda aumentar este valor.
</div>

[1]: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/index.html
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}
### Servicios compatibles

Los siguientes servicios son compatibles:
- SNS
- SQS
- Kinesis
- S3
- EventBridge
- API Gateway



#### Configurar servicios

Para activar la extracción de etiquetas de servicios adicionales utiliza esta variable de entorno:

```sh
# Valores por defecto
DD_TRACE_CLOUD_PAYLOAD_TAGGING_SERVICES=ApiGateway,ApiGatewayV2,EventBridge,Sqs,Sns,S3,Kinesis
```

<div class="alert alert-danger">
Los servicios añadidos no incluyen el ocultamiento por defecto. Prueba tu aplicación en staging para identificar y configurar ocultamientos necesarios.
</div>

#### Nombres de servicios

Los nombres de servicios distinguen entre mayúsculas y minúsculas. Para encontrar un nombres de servicio:

1. Genera una traza que incluya el servicio AWS.
1. Encuentra el tramo (span) del servicio.
1. Busca el campo `aws_service`.

Por ejemplo:
- Para AWS SSO, el nombre del recurso es `Sso.GetRoleCredentials`.
- El campo `aws_service` muestra `Sso`.
- Utiliza `Sso` en tu configuración.

### Configurar el número de etiquetas extraídas

Controla el número máximo de etiquetas extraídas con:

```sh
DD_TRACE_CLOUD_PAYLOAD_TAGGING_MAX_TAGS=758
```

<div class="alert alert-danger">
El valor por defecto (758) es el máximo que puede aceptar el Datadog Agent. No se recomienda aumentar este valor.
</div>

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Prácticas recomendadas

- Los diferentes rastreadores utilizan diferentes implementaciones de JSONPath, así que prueba tus consultas con cada rastreador individualmente.
- Comprueba siempre el comportamiento del ocultamiento en un entorno en staging antes de activarlo en producción.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://jsonpath.com/
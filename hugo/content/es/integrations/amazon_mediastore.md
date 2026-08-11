---
app_id: amazon_mediastore
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Rastrea las métricas clave de AWS Elemental MediaStore.
title: AWS Elemental MediaStore
---
## Información general

AWS Elemental MediaStore es un servicio de almacenamiento de AWS optimizado para medios de comunicación.

Habilita esta integración para ver todas tus métricas de AWS Elemental MediaStore en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En el [ícono de integración de AWS ](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `MediaStore` esté marcada
   en la pestaña de recopilación de métricas.
1. Instala la [integración de Datadog y AWS Elemental MediaStore](https://app.datadoghq.com/integrations/amazon-mediastore).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.mediastore.4xx_error_count** <br>(count) | El número de solicitudes HTTP realizadas a MediaStore que dieron lugar a un error 4xx.<br>_Mostrado como error_ |
| **aws.mediastore.5xx_error_count** <br>(count) | El número de solicitudes HTTP realizadas a MediaStore que han dado lugar a un error 5xx.<br>_Mostrado como error_ |
| **aws.mediastore.bytes_downloaded** <br>(gauge) | El número medio de bytes descargados para las solicitudes realizadas a un contenedor MediaStore, donde la respuesta incluye un cuerpo.<br>_Mostrado como byte_ |
| **aws.mediastore.bytes_downloaded.maximum** <br>(gauge) | El número máximo de bytes descargados para las solicitudes realizadas a un contenedor MediaStore, donde la respuesta incluye un cuerpo.<br>_Mostrado como byte_ |
| **aws.mediastore.bytes_downloaded.minimum** <br>(gauge) | El número mínimo de bytes descargados para las solicitudes realizadas a un contenedor MediaStore, cuando la respuesta incluye un cuerpo.<br>_Mostrado como byte_ |
| **aws.mediastore.bytes_downloaded.samplecount** <br>(count) | El count de muestras de bytes descargados para las solicitudes realizadas a un contenedor MediaStore, donde la solicitud incluye un cuerpo.|
| **aws.mediastore.bytes_downloaded.sum** <br>(count) | La suma del número de bytes descargados para las solicitudes realizadas a un contenedor MediaStore, donde la respuesta incluye un cuerpo.<br>_Mostrado como byte_ |
| **aws.mediastore.bytes_uploaded** <br>(gauge) | El número medio de bytes cargados para las solicitudes realizadas a un contenedor MediaStore, donde la solicitud incluye un cuerpo.<br>_Mostrado como byte_ |
| **aws.mediastore.bytes_uploaded.maximum** <br>(gauge) | El número máximo de bytes cargados para las solicitudes realizadas a un contenedor MediaStore, cuando la solicitud incluye un cuerpo.<br>_Mostrado como byte_ |
| **aws.mediastore.bytes_uploaded.minimum** <br>(gauge) | El número mínimo de bytes cargados para las solicitudes realizadas a un contenedor MediaStore, cuando la solicitud incluye un cuerpo.<br>_Mostrado como byte_ |
| **aws.mediastore.bytes_uploaded.samplecount** <br>(count) | El count de muestras de bytes cargados para las solicitudes realizadas a un contenedor MediaStore, donde la solicitud incluye un cuerpo.|
| **aws.mediastore.bytes_uploaded.sum** <br>(count) | La suma del número de bytes cargados para las solicitudes realizadas a un contenedor MediaStore, donde la solicitud incluye un cuerpo.<br>_Mostrado como byte_ |
| **aws.mediastore.request_count** <br>(count) | El número total de solicitudes HTTP realizadas a un contenedor MediaStore, separadas por tipo de operación (Colocar, Obtener, Eliminar, Describir, Enumerar).<br>_Mostrado como solicitud_ |
| **aws.mediastore.throttle_count** <br>(count) | El número de solicitudes HTTP realizadas a MediaStore que limitaron.<br>_Mostrado como solicitud_ |
| **aws.mediastore.total_time** <br>(gauge) | El número medio de milisegundos que la solicitud estuvo en vuelo desde la perspectiva del servidor. Este valor se mide desde el momento en que MediaStore recibe la solicitud hasta el momento en que envías el último byte de la respuesta. Este valor se mide desde la perspectiva del servidor porque las mediciones realizadas desde la perspectiva del cliente se ven afectadas por la latencia de la red.<br>_Mostrado como milisegundo_ |
| **aws.mediastore.total_time.maximum** <br>(gauge) | El número máximo de milisegundos que la solicitud estuvo en vuelo desde la perspectiva del servidor. Este valor se mide desde el momento en que MediaStore recibe la solicitud hasta el momento en que envía el último byte de la respuesta. Este valor se mide desde la perspectiva del servidor porque las mediciones realizadas desde la perspectiva del cliente se ven afectadas por la latencia de la red.<br>_Mostrado como milisegundo_ |
| **aws.mediastore.total_time.minimum** <br>(gauge) | El número mínimo de milisegundos que la solicitud estuvo en vuelo desde la perspectiva del servidor. Este valor se mide desde el momento en que MediaStore recibe la solicitud hasta el momento en que envía el último byte de la respuesta. Este valor se mide desde la perspectiva del servidor porque las mediciones realizadas desde la perspectiva del cliente se ven afectadas por la latencia de la red.<br>_Mostrado como milisegundo_ |
| **aws.mediastore.total_time.samplecount** <br>(count) | El count de muestras de la métrica de milisegundos que la solicitud estuvo en vuelo desde la perspectiva del servidor.|
| **aws.mediastore.total_time.sum** <br>(count) | El número total de milisegundos que las solicitudes estuvieron en vuelo desde la perspectiva del servidor. Este valor se mide desde el momento en que MediaStore recibe la solicitud hasta el momento en que envía el último byte de la respuesta. Este valor se mide desde la perspectiva del servidor porque las mediciones realizadas desde la perspectiva del cliente se ven afectadas por la latencia de la red.<br>_Mostrado como milisegundo_ |
| **aws.mediastore.turnaround_time** <br>(gauge) | El número medio de milisegundos que MediaStore ha tardado en procesar la solicitud. Este valor se mide desde el momento en que MediaStore recibe el último byte de la solicitud hasta el momento en que envía el primer byte de la respuesta.<br>_Mostrado como milisegundo_. |
| **aws.mediastore.turnaround_time.maximum** <br>(gauge) | El número máximo de milisegundos que MediaStore ha tardado en procesar la solicitud. Este valor se mide desde el momento en que MediaStore recibe el último byte de la solicitud hasta el momento en que envía el primer byte de la respuesta.<br>_Mostrado como milisegundo_. |
| **aws.mediastore.turnaround_time.minimum** <br>(gauge) | El número mínimo de milisegundos que MediaStore ha tardado en procesar la solicitud. Este valor se mide desde el momento en que MediaStore recibe el último byte de la solicitud hasta el momento en que envía el primer byte de la respuesta.<br>_Mostrado como milisegundo_. |
| **aws.mediastore.turnaround_time.samplecount** <br>(count) | El count de muestras de la métrica de milisegundos que MediaStore pasó procesando tu solicitud.|
| **aws.mediastore.turnaround_time.sum** <br>(count) | El número total de milisegundos que MediaStore ha empleado en procesar la solicitud. Este valor se mide desde el momento en que MediaStore recibe el último byte de la solicitud hasta el momento en que envía el primer byte de la respuesta.<br>_Mostrado como milisegundo_. |

### Eventos

La integración de AWS Elemental MediaStore no incluye ningún evento.

### Checks de servicio

La integración de AWS Elemental MediaStore no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).
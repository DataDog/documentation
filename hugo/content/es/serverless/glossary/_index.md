---
title: Glosario de Serverless
---

Este glosario se centra en términos y conceptos específicos de arquitecturas serverless, proveedores de plataformas en la nube y monitorización de Datadog Serverless.

### Conceptos serverless generales

| Concepto                         | Descripción                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Serverless          | Un modelo de desarrollo en el que un proveedor de nube asigna recursos backend bajo demanda. Este paradigma permite a los desarrolladores crear, ejecutar y desplegar aplicaciones y servicios sin tener que gestionar infraestructura.                              |
| Función          | En el paradigma serverless, una función es una aplicación autónoma que se ejecuta en la nube.                             |
| Desarrollo basado en la nube          | Un flujo de trabajo en el que los desarrolladores ejecutan su código en la nube durante el proceso de desarrollo, en lugar de hacerlo solo en sus máquinas locales. Por lo general, la creación de aplicaciones serverless requiere un desarrollo basado en la nube.                                |
| Arranque en frío          | La primera vez que se invoca una función determinada, puede tardar más tiempo en ejecutarse que en las invocaciones posteriores. Este fenómeno se conoce como arranque en frío y puede deberse a distintos factores: por ejemplo, el proveedor de la nube puede necesitar cierto tiempo para suministrar los recursos subyacentes.                                |
| Arquitectura basada en eventos          | Un patrón de arquitectura en el que los eventos impulsan la comunicación entre los servicios desvinculados.                                 |
| Función como servicio (FaaS)          | Un subconjunto de funciones serverless. FaaS se refiere de forma explícita a los paradigmas basados en eventos.                               |

## Conceptos específicos de la nube

Datadog Serverless ofrece monitorización para aplicaciones serverless en varios entornos de nube.

{{< tabs >}}
{{% tab "AWS Lambda" %}}

AWS Lambda es la plataforma de FaaS de Amazon Web Services. Consulta la [documentación de AWS Lambda][1] para obtener más información.

| Concepto                         | Descripción                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Nombre de recurso de Amazon (ARN)         | Una convención de nomenclatura para los recursos en AWS.                              |
| AWS CloudFormation          | Un servicio de AWS que utiliza plantillas para crear y eliminar recursos de AWS. Puedes crear y eliminar colecciones de recursos como una unidad; estas colecciones se denominan "stacks tecnológicos" o pilas.                               |
| AWS Identity and Access Management (IAM)         | Un servicio de AWS para gestionar usuarios y permisos de usuario en AWS.                       |
| AWS Lambda          | La oferta de FaaS de AWS. De manera alternativa, "una Lambda" se utiliza a menudo como una abreviatura de "una función de Lambda".                      |
| Step Functions          | Step Functions es un servicio de AWS que ofrece una forma de orquestar flujos de trabajo comunes compuestos por múltiples funciones de Lambda o eventos de servicios de nube, sin necesidad de escribir código "plumbing" para manejar el estado del flujo de trabajo y la lógica de reintento, etc.                     |
| Paquete de despliegue | El código de una función de Lambda puede desplegarse con un paquete de despliegue: ya sea un archivo ZIP que contiene el código de la función y las dependencias, o bien una imagen de contenedor que es compatible con la especificación [Open Container Initiative (OCI)][2]. |
| Localización periférica         | Un centro de datos de AWS que se utiliza para ejecutar las operaciones específicas de cada servicio.                      |
| Evento | Un documento JSON que contiene los datos que una función de Lambda debe procesar. |
| Función de Lambda | Una función serverless en Lambda. Cada función tiene código para procesar eventos y puede ser invocada para ejecutarse. |
| Capa de Lambda | Un archivo ZIP que contiene código adicional, como bibliotecas, un tiempo de ejecución personalizado, archivos de configuración u otras dependencias. Puedes usar capas de Lambda para utilizar bibliotecas en tus funciones serverless sin tener que incluir estas bibliotecas en el paquete de despliegue. |
| Política gestionada | Una política de IAM que puede adjuntarse a varios usuarios, grupos y roles. Estos pueden ser creados y gestionados por AWS o por un cliente.|
| Recurso | Un bucket de S3, una instancia de EC2, un usuario de IAM u otra entidad que pueda utilizarse en AWS. |
| Propiedad de recurso| Al incluir un recurso en un stack tecnológico de AWS CloudFormation, cada recurso puede tener una o más propiedades asociadas. |
| Serverless Application Model (SAM)          | SAM es un marco de infraestructura como código desarrollado por AWS y centrado específicamente en las aplicaciones serverless.                                |



### Conceptos de Datadog Serverless para AWS Lambda

| Concepto                         | Descripción                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Métricas de Lambda mejoradas][3] | Las métricas de Lambda mejoradas ofrecen una visión que va más allá de las métricas de Lambda predeterminadas que se habilitan con la integración de AWS Lambda. Estas métricas se distinguen por estar en el espacio de nombres `aws.lambda.enhanced.*`, y son la práctica recomendada de Datadog para configurar monitores en tiempo real para supervisar el estado de las aplicaciones serverless.|
| [Biblioteca Lambda][4]       | La librería Lambda de Datadog recopila datos (como las métricas de Lambda mejoradas y las trazas [traces]) del tiempo de ejecución de tu función de Lambda. Luego, la librería Lambda envía estos datos a logs (para que los recopile el [Forwarder][5]) o a la [Extensión de Lambda][6]. La librería Lambda de Datadog suele agruparse junto con la librería de rastreo de Datadog en una [Capa de Lambda][7] para facilitar su instalación.                          |
| [Forwarder][5]          | Una función de AWS Lambda que analiza y envía datos de monitorización serverless de logs de CloudWatch a Datadog.                             |
| [Extensión de Lambda][6] | Un Datadog Agent ligero que se ejecuta dentro del entorno de ejecución de Lambda y envía datos de monitorización serverless a Datadog con una sobrecarga de rendimiento mínima. La extensión se distribuye como una [Capa de Lambda][7] para facilitar su instalación. |
| [Serverless CLI][8] | La CLI habilita la instrumentación mediante la modificación de la configuración de las funciones de Lambda existentes. Es la forma más rápida de empezar a utilizar la monitorización serverless de Datadog. |
| [Macro de Serverless][9] | La macro de CloudFormation de Datadog Serverless habilita automáticamente la instrumentación de aplicaciones serverless mediante la transformación de la plantilla de CloudFormation.|
| [Complemento de Serverless][10] | El complemento de Serverless habilita automáticamente la instrumentación de las aplicaciones gestionadas por el [Serverless Framework][11] mediante la modificación de la configuración de las funciones de Lambda. |
| [Constructo del CDK de Serverless][12] | El complemento de Serverless habilita automáticamente la instrumentación de las aplicaciones gestionadas por el [AWS CDK][13] mediante la modificación de la configuración de las funciones de Lambda. |
| [Fusión de trazas][14] | La fusión de trazas de Serverless es necesaria para ver una sola traza conectada cuando configuras tanto las bibliotecas de rastreo de Datadog (`dd-trace`) como las bibliotecas de rastreo de AWS X-Ray en tu aplicación. |
| [Propagación de trazas][15] | El contexto de rastreo de Datadog debe propagarse a través de los servicios gestionados de AWS, como SQS, Kinesis y las funciones de Lambda, para generar una sola traza conectada de las aplicaciones serverless. |
| [Serverless Insights][16] | Datadog genera automáticamente sugerencias para resolver errores y problemas de rendimiento y optimiza el coste de tus aplicaciones serverless. |



[1]: https://docs.aws.amazon.com/lambda/index.html
[2]: https://opencontainers.org/
[3]: /es/serverless/enhanced_lambda_metrics
[4]: /es/serverless/libraries_integrations/
[5]: /es/logs/guide/forwarder/
[6]: /es/serverless/libraries_integrations/extension/
[7]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[8]: /es/serverless/libraries_integrations/cli
[9]: /es/serverless/libraries_integrations/macro/
[10]: /es/serverless/libraries_integrations/plugin/
[11]: https://www.serverless.com/
[12]: https://github.com/DataDog/datadog-cdk-constructs
[13]: https://aws.amazon.com/cdk/
[14]: /es/serverless/distributed_tracing/serverless_trace_merging
[15]: /es/serverless/distributed_tracing/serverless_trace_propagation
[16]: /es/serverless/troubleshooting/insights/
{{% /tab %}}
{{% tab "Azure Functions" %}}

Azure Functions es la plataforma de FaaS de Microsoft Azure. Consulta la [documentación de Microsoft Azure Functions][1] para obtener más información.

| Concepto                         | Descripción                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Azure Functions          | La oferta de FaaS de Microsoft.                          |
| Azure App Service          | Un servicio de alojamiento para crear aplicaciones web, servicios y API.                               |
| Plantilla de Azure Resource Manager (ARM)          | Un documento JSON en el que defines la infraestructura y la configuración de tu proyecto.                         |


### Conceptos de Datadog Serverless para Azure Functions

| Concepto                         | Descripción                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Vista de Azure App Service][2]      | La oferta de Datadog para la monitorización de los recursos de Azure App Services.                            |


[1]: https://docs.microsoft.com/en-us/azure/azure-functions/
[2]: https://app.datadoghq.com/functions
{{% /tab %}}
{{% tab "Google Cloud Functions" %}}

Cloud Functions es el entorno de ejecución serverless de Google. Consulta la [documentación de Google Cloud Functions][1] para obtener más información.

| Concepto                         | Descripción                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cloud Functions          | La oferta de FaaS de Google.                          |

[1]: https://cloud.google.com/functions/docs
{{% /tab %}}
{{< /tabs >}}

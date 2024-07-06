---
aliases:
- /es/tracing/serverless_functions/enable_aws_xray/
description: Rastrea tus funciones de Lambda con AWS X-Ray
kind: documentación
title: Activar el rastreo de AWS X-Ray
---
## Activar AWS X-Ray

**Requisito previo:** [Instalar la integración de AWS][1].

1. Asegúrate de que los siguientes permisos están presentes en el documento de política para tu rol de AWS/Datadog:

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

    El permiso `BatchGetTraces` se utiliza para devolver las trazas completas. El permiso `GetTraceSummaries` se utiliza para obtener una lista de resúmenes de las últimas trazas.

2. [Activa la integración de X-Ray en Datadog][2].

3. Si estás utilizando una clave maestra de cliente para cifrar trazas, añade el método `kms:Decrypt` a tu política donde el recurso es la clave maestra de cliente utilizada para X-Ray.

**Nota:** Activar la integración de AWS X-Ray aumenta la cantidad de tramos (spans) indexados utilizados, lo que puede incrementar tu factura.

### Activar AWS X-Ray para tus funciones

Para sacar el máximo provecho de la integración de AWS X-Ray:

- Actívalo en tus funciones de Lambda y API Gateways, ya sea utilizando el complemento de Serverless Framework o manualmente; e
- Instala las bibliotecas de rastreo en tus funciones de Lambda.

#### [Recomendado] Complemento de Datadog Serverless Framework

El [complemento de Datadog Serverless Framework][3] activa automáticamente X-Ray para tus funciones de Lambda e instancias de API Gateway. El complemento también añade automáticamente la [Datadog Lambda Layer][4] a todas tus funciones de Node.js y Python.

[Empieza a utilizar el complemento Serverless Framework][5] y [lee la documentación][3].

Por último, [instala e importa la biblioteca de cliente de X-Ray en tu función de Lambda](#installing-the-x-ray-client-libraries).

#### Configuración manual

Si no utilizas Serverless Framework para desplegar tu aplicación serverless, sigue estas instrucciones para la configuración manual:

1. Navega a la función de Lambda en la consola de AWS que deseas instrumentar. En la sección "Debugging and error handling" (Depuración y gestión de errores), marca la casilla **Enable active tracing** (Activar rastreo activo). Esto activa el rastreo activo para esa función.
2. Navega hasta la [consola de API Gateway][6]. Selecciona tu API y, a continuación, la etapa.
3. En la pestaña **Logs/Tracing** (Logs/Rastreo), selecciona **Enable X-Ray Tracing** (Activar rastreo de X-Ray).
4. Para que estos cambios surtan efecto, ve a **Resources** (Recursos) en el panel de navegación izquierdo y selecciona **Actions** (Acciones) y haz clic en **Deploy API** (Desplegar API).

**Nota: Datadog Lambda Layer y la biblioteca de cliente incluyen el SDK de X-Ray como dependencia, por lo que no es necesario instalarlo explícitamente en los proyectos.

Por último, [instala e importa la biblioteca de cliente de X-Ray en tu función de Lambda](#installing-the-x-ray-client-libraries).

#### Instalación de las bibliotecas de cliente de X-Ray

La biblioteca de cliente de X-Ray ofrece información sobre tus solicitudes HTTP a APIs y sobre las llamadas a DynamoDB, S3, MySQL y PostgreSQL (autoalojado, Amazon RDS y Amazon Aurora), SQS y SNS.

Instala la biblioteca, impórtalo en tus proyectos de Lambda y parchea los servicios que desees instrumentar.

{{< programming-lang-wrapper langs="nodejs,python,go,ruby,java,.NET" >}}

{{< programming-lang lang="nodejs" >}}

Instala la biblioteca de rastreo de X-Ray

```bash

npm install aws-xray-sdk

# for Yarn users
yarn add aws-xray-sdk
```

Para instrumentar el SDK de AWS:

```js
var AWSXRay = require('aws-xray-sdk-core');
var AWS = AWSXRay.captureAWS(require('aws-sdk'));
```

Para instrumentar todas las llamadas HTTP descendentes:

```js
var AWSXRay = require('aws-xray-sdk');
AWSXRay.captureHTTPsGlobal(require('http'));
var http = require('http');
```

Para instrumentar consultas de PostgreSQL:

```js
var AWSXRay = require('aws-xray-sdk');
var pg = AWSXRay.capturePostgres(require('pg'));
var client = new pg.Client();
```

Para instrumentar consultas de MySQL:

```js
var AWSXRay = require('aws-xray-sdk');
var mysql = AWSXRay.captureMySQL(require('mysql'));
//...
var connection = mysql.createConnection(config);
```

Para más información sobre la configuración, la creación de subsegmentos y el registro de anotaciones, consulta la [documentación de X-Ray Node.js][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-nodejs.html
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Instala la biblioteca de rastreo de X-Ray:

```bash
pip install aws-xray-sdk
```

Para parchear [todas las bibliotecas][1] por defecto, añade lo siguiente al archivo que contiene tus controladores de Lambda:

```python
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all
patch_all()
```

Ten en cuenta que el rastreo de `aiohttp` requiere una [instrumentación][2] específica.

Para más información sobre la configuración, la creación de subsegmentos y el registro de anotaciones, consulta la [documentación de X-Ray Python][3].


[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-patching.html
[2]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-httpclients.html
[3]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python.html
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
Consulta:
- [documentación del SDK de X-Ray para Go][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-go.html
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
Consulta:
- [documentación del SDK de X-Ray para Ruby][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-ruby.html
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Consulta:
- [documentación del SDK de X-Ray para Java][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-java.html
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Consulta:
- [documentación del SDK de X-Ray para .Net][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-dotnet.html
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

[1]: /es/integrations/amazon_web_services/#setup
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[3]: https://github.com/DataDog/serverless-plugin-datadog
[4]: https://docs.datadoghq.com/es/integrations/amazon_lambda/?tab=python#installing-and-using-the-datadog-layer
[5]: https://www.datadoghq.com/blog/serverless-framework-plugin
[6]: https://console.aws.amazon.com/apigateway/
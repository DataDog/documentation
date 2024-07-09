---
aliases:
- /es/serverless/troubleshooting/installing_the_forwarder/
- /es/serverless/forwarder/
- /es/serverless/libraries_integrations/forwarder/
dependencies:
- https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/README.md
title: Datadog Forwarder
---

## Información general

El Datadog Forwarder es una función AWS Lambda que envía logs desde AWS a Datadog, concretamente:

- Reenvía logs de CloudWatch, ELB, S3, CloudTrail, VPC, SNS y CloudFront a Datadog.
- Reenvía eventos S3 a Datadog.
- Reenvía eventos de flujos (streams) de datos Kinesis a Datadog (sólo se admiten logs de CloudWatch).
- Reenvía métricas, trazas y logs de funciones AWS Lambda a Datadog. Datadog te recomienda que utilices la [extensión Lambda de Datadog][1] para monitorizar tus funciones Lambda.

Los clientes serverless que utilizan el Forwarder para reenviar métricas, trazas y logs desde AWS Lambda a Datadog deben [migrar a la extensión Lambda de Datadog][3] para recopilar telemetría directamente desde los entornos de ejecución Lambda. El Forwarder sigue estando disponible para su uso en monitorizaciones serverless, pero no se actualizará para admitir las funciones más recientes.

Para obtener más información sobre el envío de logs de servicios AWS con el Datadog Forwarder, consulta la guía [Enviar logs de servicios AWS con la función Lambda de Datadog][2].

## Instalación

Datadog recomienda utilizar [CloudFormation](#cloudformation) para instalar automáticamente el Forwarder. También puedes completar el proceso de configuración utilizando [Terraform](#terraform) o [manualmente](#manually). Una vez instalado, puedes asignar fuentes de logs al Forwarder, como buckets S3 o grupos de logs CloudWatch [setting up triggers][4].

{{< tabs >}}
{{% tab "CloudFormation" %}}

### CloudFormation

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml)

1. Inicia sesión en tu cuenta o rol de administrador AWS y despliega la pila de CloudFormation utilizando el botón de arriba.
2. Rellena la `DdApiKey` y selecciona la opción de `DdSite` adecuada. Todos los demás parámetros son opcionales.
3. Haz clic en **Create stack** (Crear pila) y espera a que se complete la creación.
4. Busca la función Lambda del Forwarder instalada en la pestaña "Resources" (Recursos) de la pila con el `Forwarder` de ID lógico.
5. [Configura los activadores del Forwarder instalado][101].
6. Si operas en varias regiones AWS, repite los pasos anteriores en otra región.

Si ya habías habilitado tu integración AWS utilizando la [siguiente plantilla de CloudFormation][102] desde tu página de integraciones AWS en Datadog, es posible que tu cuenta ya incluya la función Lambda del Forwarder de Datadog, si has decidido incluirla. En ese caso, sólo tendrás que instalar Lambda Datadog en las regiones AWS adicionales de tu cuenta a las que quieres exportar logs.

**Nota**: Se espera que el bloque de código de la función Lambda del Forwarder de Datadog esté vacío, ya que la lógica se implementa a través de una capa Lambda.

[101]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#set-up-triggers
[102]: https://github.com/DataDog/cloudformation-template/tree/master/aws

{{% /tab %}}
{{% tab "Terraform" %}}

### Terraform

Instala el Forwarder utilizando el recurso Terraform [`aws_cloudformation_stack`][101] como encapsulador, además de la plantilla de CloudFormation proporcionada.

Datadog recomienda crear configuraciones de Terraform separadas:

- Utiliza la primera para almacenar la [clave de API de Datadog][102] en el AWS Secrets Manager y anota el ARN de secretos de la salida de aplicación
- A continuación, crea una configuración para el Forwarder y proporciona el ARN de secretos a través del parámetro `DdApiKeySecretArn`.
- Por último, crea una configuración para [configurar los activadores en el Forwarder][103].

Al separar las configuraciones de la clave de API y del Forwarder, no es necesario proporcionar la clave de API de Datadog al actualizar el Forwarder. Para actualizar o mejorar el Forwarder en el futuro, vuelve a aplicar la configuración del Forwarder.

#### Ejemplo de configuración

```tf
# Almacenar la clave de API de Datadog en AWS Secrets Manager
variable "dd_api_key" {
  type        = string
  description = "Datadog API key"
}

resource "aws_secretsmanager_secret" "dd_api_key" {
  name        = "datadog_api_key"
  description = "Encrypted Datadog API Key"
}

resource "aws_secretsmanager_secret_version" "dd_api_key" {
  secret_id     = aws_secretsmanager_secret.dd_api_key.id
  secret_string = var.dd_api_key
}

output "dd_api_key" {
  value = aws_secretsmanager_secret.dd_api_key.arn
}
```

```tf
# Utiliza el Datadog Forwarder para enviar logs desde S3 y CloudWatch, así como los datos de observabilidad de funciones Lambda a Datadog. Para obtener más información, consulta https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring
resource "aws_cloudformation_stack" "datadog_forwarder" {
  name         = "datadog-forwarder"
  capabilities = ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
  parameters   = {
    DdApiKeySecretArn  = "REPLACE ME WITH THE SECRETS ARN",
    DdSite             = "<SITE>",
    FunctionName       = "datadog-forwarder"
  }
  template_url = "https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml"
}
```

**Nota**: Asegúrate de que el parámetro `DdSite` coincide con tu [sitio Datadog][104]. Selecciona tu sitio en la parte derecha de esta página. Sustituye `<SITE>` en el ejemplo de configuración anterior por {{< region-param key="dd_site" code="true" >}}.

[101]: https://www.terraform.io/docs/providers/aws/r/cloudformation_stack
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#set-up-triggers
[104]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site

{{% /tab %}}
{{% tab "Manual" %}}

### Manual

Si no puedes instalar el Forwarder utilizando la plantilla de CloudFormation proporcionada, puedes instalarlo manualmente siguiendo los pasos que se indican a continuación. No dudes en abrir una incidencia o en crear una solicitud de extracción para hacernos saber si hay algo que podríamos mejorar para que la plantilla funcione.

1. Crea una función Lambda Python 3.10 utilizando `aws-dd-forwarder-<VERSION>.zip` de las últimas [versiones][101].
2. Guarda tu [clave de API de Datadog][102] en AWS Secrets Manager, configura la variable de entorno `DD_API_KEY_SECRET_ARN` con el ARN de secretos en la función Lambda y añade el permiso `secretsmanager:GetSecretValue` al rol de ejecución Lambda.
3. Si necesitas reenviar logs desde buckets S3, añade el permiso `s3:GetObject` al rol de ejecución Lambda.
4. Configura la variable de entorno `DD_ENHANCED_METRICS` como `false` en el Forwarder. Esto evita que el Forwarder genere métricas mejoradas por sí mismo, aunque seguirá reenviando métricas personalizadas desde otras funciones Lambda.
5. Algunas cuentas de AWS están configuradas para que los activadores no creen automáticamente políticas basadas en recursos que permitan a grupos de logs de CloudWatch invocar el Forwarder. Consulta [Permisos para logs de CloudWatch][103] para ver qué permisos son necesarios para que el Forwarder sea invocado por eventos de logs de CloudWatch.
6. [Configura activadores][104].
7. Crea un bucket S3 y configura la variable de entorno `DD_S3_BUCKET_NAME` con el nombre del bucket. También proporciona permisos `s3:GetObject`, `s3:PutObject`, `s3:ListBucket` y `s3:DeleteObject` en este bucket al rol de ejecución Lambda. Este bucket se utiliza para almacenar el caché de diferentes etiquetas (tags), a saber, Lambda, S3, función Step y grupo de logs. Además, este bucket se utilizará para almacenar eventos no reenviados en caso de excepciones de reenvío.
8. Configura la variable de entorno `DD_STORE_FAILED_EVENTS` como `true` para permitir que el Forwarder también almacene datos de eventos en el bucket S3. En caso de excepciones al enviar logs, métricas o trazas para consumir, el Forwarder almacenará los datos pertinentes en el bucket S3. En invocaciones personalizadas, es decir, al recibir un evento con la palabra clave `retry` asignada a una cadena no vacía (que puede activarse manualmente; consulta más adelante), el Forwarder volverá a intentar enviar los eventos almacenados. Si tiene éxito, borrará lo que se almacena en el bucket.

```bash
aws lambda invoke --function-name <function-name> --payload '{"retry":"true"}' out
```

[101]: https://github.com/DataDog/datadog-serverless-functions/releases
[102]: https://app.datadoghq.com/organization-settings/api-keys
[103]: https://github.com/DataDog/datadog-serverless-functions/blob/029bd46e5c6d4e8b1ae647ed3b4d1917ac3cd793/aws/logs_monitoring/template.yaml#L680
[104]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers

{{% /tab %}}
{{< /tabs >}}

### Actualizar a una nueva versión

1. Busca la pila [datadog-forwarder (si no le has cambiado el nombre)][5] de CloudFormation. Si has instalado el Forwarder como parte de la pila de la [integración AWS en Datadog][6], asegúrate de actualizar la pila anidada del Forwarder en lugar de la pila raíz.
2. Encuentra la función real Lambda del Forwarder en la pestaña "Resources" (Recursos) de la pila de CloudFormation y ve a su página de configuración. Anota el valor de la etiqueta `dd_forwarder_version` , como `3.73.0`, por si tienes problemas con la nueva versión y necesitas revertirla.
3. Actualiza la pila utilizando la plantilla `https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml`. También puedes sustituir `latest` por una versión específica, como `3.73.0.yaml`, si es necesario. Asegúrate de revisar los conjuntos de cambios antes de aplicar la actualización.

Si tienes problemas para actualizar a la última versión, consulta la sección Solucionar problemas.

### Actualizar una versión anterior a la v3.107.0 o superior

A partir de la versión, 3.107.0 se ha añadido una nueva característica para permitir que la función Lambda almacene eventos no reenviados en caso de excepciones en el punto de entrada. Si la función se habilita utilizando la variable de entorno `DD_STORE_FAILED_EVENTS`, los eventos que fallen se almacenarán en un directorio definido en el mismo bucket S3 utilizado para almacenar el caché de las etiquetas. El mismo bucket puede utilizarse para almacenar logs de varias funciones Lambda en subdirectorios únicos.

### Actualizar una versión anterior a la v3.106.0 o superior

A partir de la versión 3.106.0, la función Lambda se ha actualizado para añadir un prefijo a los nombres de archivos de caché almacenados en el bucket S3 configurado en `DD_S3_BUCKET_NAME`. Esto permite utilizar el mismo bucket para almacenar archivos de caché de varias funciones. 
Además, a partir de esta versión, el Forwarder adjuntará por defecto etiquetas del bucket S3 personalizadas a todos los logs exportados a S3. Por ejemplo, si un servicio está configurado para enviar logs a un bucket S3 de destino, el Forwarder añadirá las etiquetas del bucket a los logs mientras los extrae y los reenvía.

### Actualizar una versión anterior a la v3.99.0 o superior

A partir de la versión 3.99.0, la función Lambda se ha actualizado para requerir **Python 3.11**. Si actualizas una instalación anterior del Forwarder a la versión 3.99.0 o superior, asegúrate de que la función AWS Lambda está configurada para utilizar Python 3.11

### Actualizar una versión anterior a la v3.98.0 o superior

A partir de la versión 3.98.0, la función Lambda ha sido actualizada para requerir **Python 3.10**. Si actualizas una instalación anterior del Forwarder a la versión 3.98.0 o superior, asegúrate de que la función AWS Lambda está configurada para utilizar Python 3.10.

### Actualizar una versión anterior a la v3.74.0 o superior

A partir de la versión 3.74.0, la función Lambda ha sido actualizada para requerir **Python 3.9**. Si actualizas una instalación anterior del Forwarder a la versión 3.74.0 o superior, asegúrate de que la función AWS Lambda está configurada para utilizar Python 3.9.

### Actualizar una versión anterior a la v3.49.0 o superior

A partir de la la versión 3.49.0, la función Lambda ha sido actualizada para requerir **Python 3.8**. Si actualizas una instalación anterior del Forwarder a la versión 3.49.0 o superior, asegúrate de que la función AWS Lambda está configurada para utilizar Python 3.8.

### Actualizar una versión anterior a la v3.0.0 o superior

A partir de la versión 3.0.0, la función Lambda del Forwarder se gestiona utilizando CloudFormation. Para actualizar una instalación anterior del Forwarder a la versión 3.0.0 o superior, sigue los pasos que se indican a continuación.

1. Instala un nuevo Forwarder siguiendo los pasos de [instalación](#installation).
2. Busca la función Lambda del Forwarder instalada en la pestaña "Resources" (Recursos) de la pila con el `Forwarder` de ID lógico.
3. Migra manualmente algunos activadores (filtro de suscripción de grupos de logs de CloudWatch y notificación de eventos de buckets S3) del antiguo Forwarder al nuevo.
4. Asegúrate de que el nuevo Forwarder funciona como se espera, por ejemplo, que se invoca regularmente sin errores.
5. Asegúrate de que los logs de los activadores migrados (fuentes) aparecen en el explorador de logs de Datadog y que su aspecto es correcto.
6. Migra todos los activadores al nuevo Forwarder.
   - Si has dejado que Datadog gestione los activadores [automáticamente][6], actualiza el ARN de Lambda del Forwarder en la pestaña **Log Collection** (Recopilación de logs) de la página de integraciones AWS.
   - Si has gestionado los activadores [manualmente][7], entonces tienes que migrarlos manualmente (o utilizando un script).
7. Asegúrate de que el recuento de invocaciones de la función Lambda del antiguo Forwarder baja a cero.
8. Elimina la función Lambda del antiguo Forwarder cuando lo creas conveniente.
9. Si tienes instaladas funciones Lambda del antiguo Forwarder en varias cuentas y regiones AWS, repite los pasos anteriores en cada combinación de cuenta y región.

### Eliminación

Para eliminar de forma segura el Forwarder y otros recursos de AWS creados por la pila de CloudFormation del Forwarder, sigue los pasos que se indican a continuación.

1. Busca la pila de CloudFormation [datadog-forwarder (si no le has cambiado el nombre)][5] o encuéntrala utilizando la consola de administración de funciones Lambda del Forwarder, haciendo clic en el enlace del mensaje "This function belongs to an application. Click here to manage it." (Esta función corresponde a una aplicación. Haz clic aquí para gestionarla) y, a continuación, haz clic en la pestaña "Deployments" (Despliegues), de la página de la aplicación.
2. "Elimina" la pila de CloudFormation.

### Ajuste de los parámetros del Forwarder 

1. Busca la pila de CloudFormation [datadog-forwarder (si no le has cambiado el nombre)][5].
2. Actualiza la pila utilizando la plantilla actual.
3. Ajusta los valores de los parámetros.

Datadog recomienda ajustar los parámetros de tu Forwarder a través de CloudFormation, en lugar de editar directamente la función Lambda. Encuentra la descripción de los parámetros en el [archivo`template.yaml`][8] y en la interfaz de usuario de creación de pilas de CloudFormation, cuando inicies la pila. Siéntete libre de enviar una solicitud de extracción para realizar configuraciones adicionales, ajustables a través de la plantilla.

## Solucionar problemas

No olvides comprobar si el problema ya se ha solucionado en las últimas [versiones][9].

### Gestión de logs

Configura la variable de entorno `DD_LOG_LEVEL` como `debug` en la función Lambda del Forwarder para habilitar temporalmente la gestión de logs detallada (no olvides eliminarla). La depuración de logs debería poder mostrarte la carga útil de eventos exacta que recibe la función Lambda y la carga útil de datos (logs, métricas o trazas) que se envían a Datadog.

También puedes añadir la gestión de logs o código adicionales para una investigación más profunda. Para ver las instrucciones de creación del código del Forwarder con cambios locales, consulta la sección de [colaboración](#contributing).

### Problemas al actualizar el Forwarder

Actualizar manualmente el código `.zip` del Forwarder puede generar conflictos con las actualizaciones de CloudFormation en instalaciones del Forwarder donde el código está empaquetado en una capa Lambda (opción de instalación por defecto a partir de la versión `3.33.0`) y generar errores de invocación. En este caso, actualizar la pila a la última versión disponible a través de CloudFormation dos veces seguidas (con `InstallAsLayer` configurado primero como `false` y luego como `true`) debería resolver el problema, ya que eliminará cualquier resto de `.zip` e instalará la última capa disponible.

Si aún así no lo consigues, crea un ticket para el [servicio de asistencia de Datadog][10] con una copia de los logs de depuración.

### Los logs con formato JSON no aparecen en Datadog

Si tus logs contienen un atributo que Datadog interpreta como una marca de tiempo, debes asegurarte de que la marca de tiempo es actual y tiene el formato correcto. Consulta [Reasignador de fechas en logs][24] para saber qué atributos se analizan como marcas de tiempo y cómo asegurarte de que la marca de tiempo es válida.

### Problemas al crear activadores S3

En caso de que encuentres el siguiente error al crear activadores S3, te recomendamos que consideres seguir la arquitectura de cargabilidad de salida (fan-out) propuesta por AWS [en este artículo](https://aws.amazon.com/blogs/compute/fanout-s3-event-notifications-to-multiple-endpoints/)

```
An error occurred when creating the trigger: Configuration is ambiguously defined. Cannot have overlapping suffixes in two rules if the prefixes are overlapping for the same event type.
```

## Colaboración

Nos encantan las solicitudes de extracción. Aquí tienes una guía rápida.

1. Si quieres discutir una función o la corrección de errores antes de la implementación, ponte en contacto con nosotros en el canal `#serverless` de la [Comunidad Slack Datadog][11].
1. Bifurca, clona y crea una rama:
   ```bash
   git clone git@github.com:<your-username>/datadog-serverless-functions.git
   git checkout -b <my-branch>
   ```
1. Realiza cambios en el código.
1. Crea utilizando tus cambios locales.
   ```bash
   cd aws/logs_monitoring
   ./tools/build_bundle.sh <SEMANTIC_VERSION> # any unique version is fine
   ```
1. Actualiza tu Forwarder de test con el código modificado y pruébalo:
   ```bash
   # Upload in the AWS Lambda console if you don't have AWS CLI
   aws lambda update-function-code \
       --region <AWS_REGION> \
       --function-name <FORWARDER_NAME> \
       --zip-file fileb://.forwarder/aws-dd-forwarder-<SEMANTIC_VERSION>.zip
   ```
1. Ejecuta tests unitarios.
   ```
   python -m unittest discover . # for code in Python
   ./trace_forwarder/scripts/run_tests.sh # for code in Go
   ```
1. Ejecuta los tests de integraciones.

   ```bash
   ./tools/integration_tests/integration_tests.sh

   # to update the snapshots if changes are expected
   ./tools/integration_tests/integration_tests.sh --update
   ```

1. Si los cambios afectan a la plantilla de CloudFormation, ejecuta el test de instalación con tu propia cuenta de AWS.
   ```bash
   ./tools/installation_test.sh
   ```
1. Envíalo a tu bifurcación y [envía una solicitud de extracción][12].

## Avanzado

### Envío de logs a varios destinos

Si necesitas enviar logs a varias organizaciones Datadog u otros destinos, configura el parámetro `AdditionalTargetLambdaArns` de CloudFormation para que el Datadog Forwarder copie los logs entrantes en las funciones Lambda especificadas. Estas funciones Lambda adicionales serán llamadas de forma asíncrona, exactamente con el mismo `event` que recibe el Datadog Forwarder.

### Compatibilidad de AWS PrivateLink

Puedes ejecutar el Forwarder en una subred privada de VPC y enviar datos a Datadog a través de AWS PrivateLink. AWS PrivateLink sólo puede configurarse con [sitios Datadog][13] alojados en AWS (por ejemplo: `datadoghq.com`, no `datadoghq.eu`).

1. Sigue [estas instrucciones][14] para añadir los endpoints `api` , `http-logs.intake` y `trace.agent` de Datadog a tu VPC.
2. Sigue las [instrucciones][15] para añadir endpoints de AWS Secrets Manager y S3 a tu VPC.
3. Al instalar el Forwarder con la plantilla de CloudFormation:
   1. Configura `UseVPC` como `true`.
   2. Configura `VPCSecurityGroupIds` y `VPCSubnetIds` en función de la configuración de tu VPC.
   3. Configura `DdFetchLambdaTags` como `false`, ya que la API de etiquetado de AWS Resource Groups no admite PrivateLink.

#### DdUsePrivateLink está obsoleto

La opción `DdUsePrivateLink` está obsoleta desde la [v3.41.0][16]. Esta opción se utilizaba anteriormente para indicar al Forwarder que debía utilizar un conjunto especial de endpoints de PrivateLink para recibir datos: `pvtlink.api.{{< region-param key="dd_site" code="true" >}}`, `api-pvtlink.logs.{{< region-param key="dd_site" code="true" >}}` y `trace-pvtlink.agent.{{< region-param key="dd_site" code="true" >}}`. A partir de la versión 3.41.0, el Forwarder puede enviar datos a Datadog, a través de PrivateLink, utilizando los nombres comunes del DNS de los endpoints de entrada: `api.{{< region-param key="dd_site" code="true" >}}`, `http-intake.logs.{{< region-param key="dd_site" code="true" >}}` y `trace.agent.{{< region-param key="dd_site" code="true" >}}`. Por lo tanto, la opción `DdUsePrivateLink` ya no es necesaria.

Si tienes una implementación antigua del Forwarder con `DdUsePrivateLink` configurado como `true`, puede que encuentres discordancias entre los endpoints de PrivateLink configurados y aquellos [documentados en Datadog][14], lo cual es de esperar. Aunque los endpoints de PrivateLink más antiguos se hayan eliminado de ese documento, siguen funcionando. No se requiere ningún cambio al actualizar el Forwarder. Esto significa que puedes mantener habilitado `DdUsePrivateLink` y seguir utilizando los endpoints más antiguos.

Pero si te interesa cambiar a los nuevos endpoints, debes seguir las instrucciones actualizadas anteriores para:

1. Configurar los nuevos endpoints en `api.{{< region-param key="dd_site" code="true" >}}`, `http-intake.logs.{{< region-param key="dd_site" code="true" >}}` y `trace.agent.{{< region-param key="dd_site" code="true" >}}`.
2. Configurar `DdUseVPC` como `true`.
3. Configurar `DdUsePrivateLink` como `false`.

### Compatibilidad de AWS con VPC y proxy 

Si necesitas desplegar el Forwarder en una VPC sin acceso público directo a Internet y no puedes utilizar AWS PrivateLink para conectarte a Datadog (por ejemplo, si tu organización está alojada en el sitio Datadog EU: `datadoghq.eu`), puedes enviar datos a través de un proxy.

1. A menos que el Forwarder esté desplegado en una subred pública, sigue las [instrucciones][15] para añadir endpoints para Secrets Manager y S3 a la VPC, de modo que el Forwarder pueda acceder a esos servicios.
2. Actualiza tu proxy con las siguientes configuraciones ([HAproxy][17] o [NGINX][18]). Si estás utilizando otro proxy o proxy web, autoriza el dominio Datadog, por ejemplo: `.{{< region-param key="dd_site" code="true" >}}`.
3. Al instalar el Forwarder con la plantilla de CloudFormation, configura `DdUseVPC`, `VPCSecurityGroupIds` y `VPCSubnetIds`.
4. Asegúrate de que la opción `DdFetchLambdaTags` está deshabilitada, ya que la VPC de AWS aún no ofrece un endpoint para la API de etiquetado de AWS Resource Groups.
5. Si utilizas HAproxy o NGINX:

- Configura `DdApiUrl` como `http://<proxy_host>:3834` o `https://<proxy_host>:3834`.
- Configura `DdTraceIntakeUrl` como `http://<proxy_host>:3835` o `https://<proxy_host>:3835`.
- Configura `DdUrl` como `<proxy_host>` y `DdPort` como `3837`.

En cambio, si utilizas el proxy web:

- Configura `DdHttpproxyURL` en el endpoint de tu proxy, por ejemplo: `http://<proxy_host>:<port>` o, si tu proxy tiene nombre de usuario y contraseña, `http://<username>:<password>@<proxy_host>:<port>`.

7. Configura `DdNoSsl` como `true` si te conectas al proxy utilizando `http`.
8. Configura `DdSkipSslValidation` como `true` si te conectas al proxy utilizando `https` con un certificado firmado automáticamente.

### Firma de códigos

El Datadog Forwarder está firmado por Datadog. Para verificar la integridad del Forwarder, utiliza el método de instalación manual. [Crea una configuración para la firma de códigos][19] que incluya el ARN del perfil de firma de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) y asócialo a la función Lambda del Forwarder antes de cargar el archivo ZIP del Forwarder.

## Parámetros de CloudFormation

### Obligatorio

`DdApiKey`
: Tu [clave de API de Datadog][20], que puedes encontrar en **Organization Settings** > **API Keys** (Parámetros de organización > Claves de API). La clave de API se almacena en AWS Secrets Manager. Si ya tienes una clave de API de Datadog almacenada en AWS Secrets Manager, utiliza `DdApiKeySecretArn` en su lugar.

`DdApiKeySecretArn`
: El ARN del secreto que almacena la clave de API de Datadog, si ya la tienes almacenada en AWS Secrets Manager. Debes almacenar el secreto como texto sin formato, en lugar de como un par clave-valor.

`DdSite`
: El [sitio Datadog][13] al que se enviarán tus métricas y logs. Tu sitio Datadog es {{< region-param key="dd_site" code="true" >}}.

### Función Lambda (opcional)

`FunctionName`
: El nombre de la función Lambda del Forwarder de Datadog. No lo cambies al actualizar una pila de CloudFormation existente, de lo contrario se sustituirá la función actual del Forwarder y se perderán todos los activadores.

`MemorySize`
: Tamaño de la memoria para la función Lambda del Forwarder de Datadog.

`Timeout`
: Tiempo de espera para la función Lambda del Forwarder de Datadog.

`ReservedConcurrency`
: Concurrencia reservada para la función Lambda del Forwarder de Datadog. Si está vacío, utiliza la concurrencia no reservada de la cuenta.
Datadog recomienda utilizar al menos 10 de concurrencia reservada, pero este valor por defecto es 0, ya que puede que necesites aumentar sus límites. Si utilizas concurrencia de cuenta no reservada, puedes limitar otras funciones Lambda en tu entorno.

`LogRetentionInDays`
: Conservación de logs CloudWatch generada por la función Lambda del Forwarder de Datadog.

### Reenvío de logs (opcional)

`DdTags`
: Añade etiquetas personalizadas a logs reenviados, en cadenas delimitadas por comas, sin comas finales, como `env:prod,stack:classic`.

`DdMultilineLogRegexPattern`
: Utiliza la expresión regular proporcionada para detectar una nueva línea de logs para logs de múltiples líneas de S3, como `\d{2}\/\d{2}\/\d{4}` para los logs de múltiples líneas que comienzan con el patrón "11/10/2014".

`DdUseTcp`
: Por defecto, el Forwarder envía logs utilizando HTTPS a través del puerto 443. Para enviar logs a través de una
conexión TCP cifrada SSL, configura este parámetro como true (verdadero).

`DdNoSsl`
: Deshabilita SSL al reenviar logs y configúralo como true (verdadero) al reenviar logs a través de un proxy.

`DdUrl`
: La URL del endpoint al cual reenviar los logs, útil para reenviar logs a través de un proxy.

`DdPort`
: El puerto del endpoint al cual reenviar los logs, útil para reenviar logs a través de un proxy.

`DdSkipSslValidation`
: Envía logs a través de HTTPS, sin validar el certificado proporcionado por el endpoint. Se seguirá cifrando el tráfico entre el Forwarder y el endpoint de entrada de logs, pero no se verificará si el certificado SSL de destino es válido.

`DdUseCompression`
: Configúralo como false (falso) para deshabilitar la compresión de logs. Sólo es válido cuando se envían logs a través de HTTP.

`DdCompressionLevel`
: Ajusta el nivel de compresión de 0 (sin compresión) a 9 (mejor compresión). El nivel de compresión por defecto es 6. Si aumentas el nivel de compresión, es posible que veas algún beneficio en cuanto a la disminución del tráfico de red saliente, a expensas de un aumento en la duración de la ejecución del Forwarder.

`DdForwardLog`
: Configúralo como false (falso) para deshabilitar el reenvío de logs, mientras se siguen reenviando otros datos de observabilidad, como métricas y trazas de funciones Lambda.

`DdFetchLambdaTags`
: Permite que el Forwarder recupere etiquetas de Lambda mediante llamadas a la API de GetResources y las aplique a logs, métricas y trazas. Si se configura como true (verdadero), el permiso `tag:GetResources` se añadirá automáticamente al rol IAM de ejecución Lambda.

`DdFetchLogGroupTags`
: Permite que el Forwarder recupere etiquetas de grupos de logs mediante ListTagsLogGroup y las aplique a logs, métricas y trazas. Si se configura como true (verdadero), el permiso `logs:ListTagsLogGroup` se añadirá automáticamente al rol IAM de ejecución Lambda.

`DdFetchStepFunctionsTags`
: Permite que Forwarder recupere tags de funciones Step mediante llamadas a la API GetResources y las aplique a logs y trazas (si está habilitado el rastreo de funciones Step). Si se configura como true (verdadero), el permiso `tag:GetResources` se añadirá automáticamente al rol IAM de ejecución de Lambda.

### Limpieza de logs (opcional)

`redactIp`
: Sustituye el texto que coincide con `\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}` por `xxx.xxx.xxx.xxx`.

`redactEmail`
: Sustituye el texto que coincide con `[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+` por `xxxxx@xxxxx.com`.

`DdScrubbingRule`
: Sustituye el texto que coincide con la expresión regular proporcionada por `xxxxx` (por defecto) o por `DdScrubbingRuleReplacement` (si se proporciona). La regla de limpieza de logs se aplica a todo el log con formato JSON, incluidos los metadatos añadidos automáticamente por la función Lambda. Cada instancia de coincidencia de patrón se sustituye hasta que no se encuentren más coincidencias en ningún log. El uso de expresiones regulares ineficaces, como `.*`, puede ralentizar la función Lambda.

`DdScrubbingRuleReplacement`
: Sustituye el texto que coincide con DdScrubbingRule por el texto proporcionado.

### Filtrado de logs (opcional)

`ExcludeAtMatch`
: No envíes logs que coincidan con la expresión regular proporcionada. Si un log coincide tanto con `ExcludeAtMatch` como con `IncludeAtMatch`, se excluye.

`IncludeAtMatch`
: Sólo envía logs que coinciden con la expresión regular proporcionada, no excluida por `ExcludeAtMatch`.

Las reglas de filtrado se aplican a todo el log con formato JSON, incluidos los metadatos que el Forwarder. añade automáticamente Sin embargo, las transformaciones aplicadas por [pipelines de logs][21], que se producen después del envío de logs a Datadog, no pueden utilizarse para filtrar logs en el Forwarder. El uso de una expresión regular ineficaz, como `.*`, puede ralentizar el Forwarder.

Los siguientes son algunos ejemplos de expresiones regulares que pueden utilizarse para el filtrado de logs:

- Incluye (o excluye) logs de la plataforma Lambda: `"(START|END) RequestId:\s`. El precedente `"` es necesario para que coincida con el inicio del mensaje del log, que está en un blob JSON (`{"message": "START RequestId...."}`). Datadog recomienda conservar los logs de `REPORT`, ya que se utilizan para rellenar la lista de invocaciones en las vistas de funciones serverless.
- Incluye sólo mensajes de error de CloudTrail: `errorMessage`.
- Incluye sólo logs que contienen un código de error HTTP 4XX o 5XX: `\b[4|5][0-9][0-9]\b`.
- Incluye sólo logs de CloudWatch cuando el campo `message` contiene un par clave/valor JSON específico: `\"awsRegion\":\"us-east-1\"`.
  - El campo de mensaje de un evento de log de CloudWatch se codifica como una cadena. Por ejemplo,`{"awsRegion": "us-east-1"}` se codifica como `{\"awsRegion\":\"us-east-1\"}`. Por lo tanto, el patrón que proporciones debe incluir `\` caracteres de escape, como en el siguiente ejemplo: `\"awsRegion\":\"us-east-1\"`.

Para probar diferentes patrones en tus logs, activa la [limpieza de logs](#troubleshooting).

### Avanzado (opcional)

`SourceZipUrl`
: No lo cambies a menos que sepas lo que estás haciendo. Sustituye la localización predeterminada del código fuente de la función.

`PermissionsBoundaryArn`
: ARN para la política de límites de permisos.

`DdUsePrivateLink` (OBSOLETO)
: Configurado como true (verdadero) para permitir el envío de logs y métricas a través de AWS PrivateLink. Consulta [Conectarse a Datadog a través de AWS PrivateLink][2].

`DdHttpproxyURL`
: Configura las variables de entorno estándar del proxy web HTTP_PROXY y HTTPS_PROXY. Estos son los endpoints de URL que tu servidor proxy expone. No lo utilices en combinación con AWS Private Link. Asegúrate también de configurar `DdSkipSslValidation` como true (verdadero).

`DdNoproxy`
: Configura la variable de entorno estándar del proxy web `NO_proxy` . Se trata de una lista separada por comas de los nombres de dominio que deben excluirse del proxy web.

`VPCSecurityGroupIds`
: Lista separada por comas de los ID de grupo de seguridad de VPC. Se utiliza cuando AWS PrivateLink está habilitado.

`VPCSubnetIds`
: Lista separada por comas de los ID de subred de VPC. Se utiliza cuando AWS PrivateLink está habilitado.

`AdditionalTargetLambdaArns`
: Lista separada por comas de los ARN de Lambda que serán llamados de forma asíncrona con el mismo `event` que recibe el Datadog Forwarder.

`InstallAsLayer`
: Determinar si se utiliza el flujo de instalación basado en capas o no. Configúralo como false (falso) para utilizar el flujo de instalación heredado, que instala una segunda función que copia el código del Forwarder desde GitHub a un bucket S3. Por defecto es true (verdadero).

`LayerARN`
: ARN de la capa que contiene el código del Forwarder. Si está vacío, el script utilizará la versión de la capa con la que se ha publicado el Forwarder. Por defecto está vacío.

## Permisos

Para desplegar la pila de CloudFormation con las opciones predeterminadas, necesitas tener los permisos que se indican a continuación. Estos sirven para guardar tu clave de API Datadog como secreto, crear un bucket S3 para almacenar el código del Forwarder (archivo ZIP) y crear funciones Lambda (incluidos los roles de ejecución y los grupos de logs).

**Sentencias IAM**:

```json
{
  "Effect": "Allow",
  "Action": [
    "cloudformation:*",
    "secretsmanager:CreateSecret",
    "secretsmanager:TagResource",
    "s3:CreateBucket",
    "s3:GetObject",
    "s3:PutEncryptionConfiguration",
    "s3:PutBucketPublicAccessBlock",
    "iam:CreateRole",
    "iam:GetRole",
    "iam:PassRole",
    "iam:PutRolePolicy",
    "iam:AttachRolePolicy",
    "lambda:CreateFunction",
    "lambda:GetFunction",
    "lambda:GetFunctionConfiguration",
    "lambda:GetLayerVersion",
    "lambda:InvokeFunction",
    "lambda:PutFunctionConcurrency",
    "lambda:AddPermission",
    "lambda:TagResource",
    "logs:CreateLogGroup",
    "logs:DescribeLogGroups",
    "logs:PutRetentionPolicy"
  ],
  "Resource": "*"
}
```

Las siguientes capacidades son necesarias para crear una pila de CloudFormation:

- CAPABILITY_AUTO_EXPAND, ya que la plantilla del Forwarder utiliza macros como la [macro AWS SAM][23].
- CAPABILTY_IAM/NAMED_IAM, ya que el Forwarder crea roles IAM.

La pila de CloudFormation crea los siguientes roles IAM:

- Rol de Forwarder: rol de ejecución para que la función Lambda del Forwarder lea logs de S3, recupere tu clave de API de Datadog de Secrets Manager y escriba sus propios logs.

**Sentencias IAM**:

```json
[
  {
    "Effect": "Allow",
    "Action": [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ],
    "Resource": "*"
  },
  {
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::*",
    "Effect": "Allow"
  },
  {
    "Action": ["secretsmanager:GetSecretValue"],
    "Resource": "<ARN of DdApiKeySecret>",
    "Effect": "Allow"
  }
]
```

- `ForwarderZipCopierRole`: rol de ejecución para la función Lambda ForwarderZipCopier para descargar el archivo ZIP de despliegue del Forwarder a un bucket S3.

**Sentencias IAM**:

```json
[
  {
    "Effect": "Allow",
    "Action": [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ],
    "Resource": "*"
  },
  {
    "Action": ["s3:PutObject", "s3:DeleteObject"],
    "Resource": "<S3Bucket to Store the Forwarder Zip>",
    "Effect": "Allow"
  },
  {
    "Action": ["s3:ListBucket"],
    "Resource": "<S3Bucket to Store the Forwarder Zip>",
    "Effect": "Allow"
  }
]
```

## Leer más

Más enlaces, artículos y documentación útiles:

- [Enviar logs de servicios AWS con la función Lambda de Datadog][2]

[1]: https://github.com/DataDog/datadog-lambda-extension
[2]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[3]: https://docs.datadoghq.com/es/serverless/guide/extension_motivation/
[4]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[5]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[6]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[7]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#manually-set-up-triggers
[8]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/template.yaml
[9]: https://github.com/DataDog/datadog-serverless-functions/releases
[10]: https://docs.datadoghq.com/es/help/
[11]: https://chat.datadoghq.com/
[12]: https://github.com/your-username/datadog-serverless-functions/compare/datadog:master...master
[13]: https://docs.datadoghq.com/es/getting_started/site/
[14]: https://docs.datadoghq.com/es/agent/guide/private-link/?tab=logs#create-your-vpc-endpoint
[15]: https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint
[16]: https://github.com/DataDog/datadog-serverless-functions/releases/tag/aws-dd-forwarder-3.41.0
[17]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/haproxy.txt
[18]: https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/nginx.txt
[19]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-console
[20]: https://app.datadoghq.com/organization-settings/api-keys
[21]: https://docs.datadoghq.com/es/logs/processing/pipelines/
[22]: https://docs.datadoghq.com/es/agent/guide/private-link/
[23]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-aws-serverless.html
[24]: https://docs.datadoghq.com/es/logs/log_configuration/processors/?tab=ui#log-date-remapper
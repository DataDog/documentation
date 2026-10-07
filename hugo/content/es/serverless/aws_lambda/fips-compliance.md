---
algolia:
  rank: 80
  tags:
  - fips
  - conformidad
  - fedramp
  - govcloud
  - aws lambda
further_reading:
- link: /serverless/aws_lambda/installation/
  tag: Documentación
  text: Instalar Serverless Monitoring para AWS Lambda
- link: /serverless/aws_lambda/configuration/
  tag: Documentación
  text: Configurar Serverless Monitoring para AWS Lambda
title: Conformidad con FIPS de AWS Lambda
---

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
<div class="alert alert-danger">La extensión Lambda Datadog conforme con FIPS está disponible en todas las regiones AWS. Aunque puedes utilizar estos componentes Lambda conformes con FIPS en cualquier sitio Datadog, la conformidad con FIPS de extremo a extremo requiere el envío de datos al sitio US1-FED (ddog-gov.com).</div>
{{< /site-region >}}

Datadog proporciona una monitorización conforme con FIPS para las funciones AWS Lambda mediante el uso de módulos criptográficos certificados por FIPS y capas de extensión Lambda especialmente diseñadas.

## Componentes conformes con FIPS

La conformidad con FIPS de Datadog para AWS Lambda se implementa a través de dos componentes principales:

1. **Extensión Lambda conforme con FIPS**:
   - La versión de compatibilidad de la extensión es un binario Go creado utilizando el [módulo BoringCrypto certificado por FIPS](https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4407).
   - La extensión Lambda de última generación es un binario Rust creado con el [módulo criptográfico AWS-LC certificado por FIPS](https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4816).

2. **Soporte para bibliotecas de tiempo de ejecución**:
   - Las capas Lambda Python y JavaScript de Datadog y la biblioteca Lambda Go de Datadog ofrecen un funcionamiento conforme con FIPS, controlado por la variable de entorno `DD_LAMBDA_FIPS_MODE`.
     - `DD_LAMBDA_FIPS_MODE` es por defecto `true` en GovCloud y es `false` en caso contrario.
   - Cuando el modo FIPS está activado:
     - Las bibliotecas de tiempo de ejecución utilizan endpoints FIPS AWS para la recuperación de claves de API de Datadog
     - Las funciones de ayuda para métricas de Lambda requieren la extensión conforme con FIPS para el envío de métricas:
       - Python: `lambda_metric` de `datadog_lambda.metric`
       - Node.js: `sendDistributionMetric` de `datadog-lambda-js`
       - Go: `Metric()` de `ddlambda`

## Capas de extensión FIPS

Datadog proporciona capas de extensión Lambda independientes para la conformidad con FIPS, tanto en arquitecturas x86 como ARM:

{{< tabs >}}
{{% tab "Regiones AWS GovCloud" %}}

```
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
```

Sustituye `<AWS_REGION>` por una región AWS GovCloud válida como `us-gov-west-1`.

{{% /tab %}}
{{% tab "Regiones comerciales AWS" %}}

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
```

Sustituye `<AWS_REGION>` por una región AWS válida como `us-east-1`.

{{% /tab %}}
{{< /tabs >}}

## Soporte de tiempo de ejecución

### Python, JavaScript y Go

Para las funciones Lambda de Python, JavaScript y Go, la conformidad con FIPS se controla mediante la variable de entorno `DD_LAMBDA_FIPS_MODE`:

- En entornos GovCloud, `DD_LAMBDA_FIPS_MODE` es por defecto `true`.
- En las regiones comerciales, `DD_LAMBDA_FIPS_MODE` es por defecto `false`.

Cuando el modo FIPS está activado:

- Los endpoints AWS FIPS se utilizan para búsquedas de claves de API de Datadog en almacenes de datos seguros de AWS.
- El envío directo de métricas a la API de Datadog está desactivado, por lo que se requiere la extensión conforme con FIPS para el envío de métricas.

### Ruby, .NET y Java

Las bibliotecas de tiempos de ejecución de Ruby, .NET y Java no requieren la variable de entorno `DD_LAMBDA_FIPS_MODE`, ya que estos tiempos de ejecución no:

- Contactan con las API de AWS directamente
- Envían métricas directamente a Datadog

## Instalación y configuración

Para utilizar la monitorización conforme con FIPS en tus funciones AWS Lambda:

1. **Selecciona la capa de extensión conforme con FIPS**:
   - Utiliza el ARN de la capa de extensión FIPS adecuado para tu arquitectura (x86 o ARM) y región (comercial o GovCloud).

2. **Configura variables de entorno**:
   - En entornos GovCloud, `DD_LAMBDA_FIPS_MODE` está activado por defecto.
   - Para las regiones comerciales, configura `DD_LAMBDA_FIPS_MODE=true` para activar el modo FIPS.
   - Para una conformidad con FIPS de extremo a extremo total, configura `DD_SITE` como `ddog-gov.com` para enviar datos al sitio US1-FED.

3. **Sigue las instrucciones de instalación estándar**:
   - Consulta las [guías de instalación][1] para conocer las configuraciones específicas de cada lenguaje.
   - Utiliza los ARN de la capa de extensión FIPS en lugar de las capas de extensión estándar.

Para obtener instrucciones detalladas de instalación específicas para el tiempo de ejecución y el método de despliegue de tu lenguaje, consulta la [documentación de instalación][1].

## Limitaciones y consideraciones

- **Conformidad FIPS de extremo a extremo**: Para una conformidad FIPS total, deben utilizarse los componentes Lambda conformes con FIPS para enviar telemetría a la región US1-FED (`ddog-gov.com`). Aunque los propios componentes Lambda implementan una criptografía conforme con FIPS independientemente del destino, solo el sitio US1-FED tiene endpoints de entrada conformes con FIPS.

- **Responsabilidad del cliente**: Tú, cliente de Datadog, eres responsable de:
  - La postura de seguridad de tu propio código de función Lambda
  - Garantizar que el resto del código que puedas estar ejecutando en tu entorno de ejecución Lambda conserve la conformidad con FIPS según sea necesario.

- **Ámbito de conformidad con FIPS**: La conformidad con FIPS solo se aplica a la comunicación entre componentes Datadog Lambda y endpoints de la API de entrada de Datadog. Esta solución no hace que otras formas de comunicación que se originan o terminan en tus funciones Lambda se vuelvan conformes con FIPS.

- **Requisitos de versión**: Utiliza las últimas versiones de la extensión y las bibliotecas Datadog Lambda para garantizar una funcionalidad completa y una seguridad actualizada.

## Referencias adicionales

- [Conformidad con FIPS del Agent][2] - Nota: Estas directrices se aplican únicamente a despliegues del Agent y no a los entornos sin servidor.
- [Información general de seguridad de AWS Lambda][3] - Documentación de AWS sobre la seguridad y la conformidad de Lambda.


[1]: /es/serverless/aws_lambda/installation/
[2]: /es/agent/configuration/fips-compliance/
[3]: https://docs.aws.amazon.com/whitepapers/latest/security-overview-aws-lambda/lambda-and-compliance.html
---
aliases:
- /es/integrations/aws_pricing
app_id: aws-pricing
categories:
- aws
- nube
- gestión de costes
custom_kind: integración
description: Recopila información de AWS Pricing para servicios por código de tarifa.
media: []
supported_os:
- linux
- macos
- windows
title: AWS Pricing
---
## Información general

Este check extrae información sobre precios [publicados por AWS](https://aws.amazon.com/pricing/) para facilitar la medición del coste del uso de recursos dentro de Datadog.

## Configuración

El check de AWS Pricing no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de AWS Pricing en tu host. Consulta [Uso de integraciones comunitarias](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para instalar con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-aws_pricing==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones](https://docs.datadoghq.com/getting_started/integrations/) centrales.

### Configuración

1. Edita el archivo `aws_pricing.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de AWS Pricing. Consulta el ejemplo [aws_pricing.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/datadog_checks/aws_pricing/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-information) y busca `aws_pricing` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.pricing.awsamplify** <br>(gauge) | El coste de awsamplify por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsappsync** <br>(gauge) | El coste de awsappsync por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsbackup** <br>(gauge) | El coste de awsbackup por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsbudgets** <br>(gauge) | El coste de awsbudgets por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awscertificatemanager** <br>(gauge) | El coste de awscertificatemanager por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awscloudmap** <br>(gauge) | El coste de awscloudmap por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awscloudtrail** <br>(gauge) | El coste de awscloudtrail por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awscodecommit** <br>(gauge) | El coste de awscodecommit por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awscodedeploy** <br>(gauge) | El coste de awscodedeploy por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awscodepipeline** <br>(gauge) | El coste de awscodepipeline por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsconfig** <br>(gauge) | El coste de awsconfig por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awscostexplorer** <br>(gauge) | El coste de awscostexplorer por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsdatasync** <br>(gauge) | El coste de awsdatasync por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsdatatransfer** <br>(gauge) | El coste de awsdatatransfer por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsdatabasemigrationsvc** <br>(gauge) | El coste de awsdatabasemigrationsvc por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsdevelopersupport** <br>(gauge) | El coste de awsdevelopersupport por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsdevicefarm** <br>(gauge) | Coste de awsdevicefarm por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsdirectconnect** <br>(gauge) | El coste de awsdirectconnect por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsdirectoryservice** <br>(gauge) | El coste del servicio awsdirectorys por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awselementalmediaconvert** <br>(gauge) | El coste de awselementalmediaconvert por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awselementalmedialive** <br>(gauge) | El coste de awselementalmedialive por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awselementalmediapackage** <br>(gauge) | El coste de awselementalmediapackage por unidad.<br>_Se muestra en dólares_. |
| **aws.pricing.awselementalmediastore** <br>(gauge) | El coste de awselementalmediastore por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awselementalmediatailor** <br>(gauge) | El coste de unelementalmediatailor por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsevents** <br>(gauge) | El coste de awsevents por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsfms** <br>(gauge) | El coste de awsfms por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsglue** <br>(gauge) | El coste de awsglue por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsgreengrass** <br>(gauge) | El coste de awsgreengrass por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsiot1click** <br>(gauge) | El coste de awsiot1click por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsiotanalytics** <br>(gauge) | El coste de awsiotanalytics por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsiot** <br>(gauge) | El coste de awsiot por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awslambda** <br>(gauge) | El coste de awslambda por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsmediaconnect** <br>(gauge) | El coste de awsmediaconnect por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsqueueservice** <br>(gauge) | El coste de awsqueueservice por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsrobomaker** <br>(gauge) | El coste de awsrobomaker por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awssecretsmanager** <br>(gauge) | El coste de awssecretsmanager por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsservicecatalog** <br>(gauge) | El coste de awsservicecatalog por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsshield** <br>(gauge) | El coste de awsshield por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsstoragegatewaydeeparchive** <br>(gauge) | El coste de awsstoragegatewaydeeparchive por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsstoragegateway** <br>(gauge) | El coste de awsstoragegateway por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awssupportbusiness** <br>(gauge) | El coste de awssupportbusiness por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awssupportenterprise** <br>(gauge) | El coste de awssupportenterprise por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awssystemsmanager** <br>(gauge) | El coste de awssystemsmanager por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awstransfer** <br>(gauge) | El coste de awstransfer por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.awsxray** <br>(gauge) | El coste de awsxray por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.alexatopsites** <br>(gauge) | El coste de alexatopsites por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.alexawebinfoservice** <br>(gauge) | El coste de alexawebinfoservice por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonapigateway** <br>(gauge) | El coste de amazonapigateway por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonappstream** <br>(gauge) | El coste de amazonappstream por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonathena** <br>(gauge) | El coste de amazonathena por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonchimebusinesscalling** <br>(gauge) | El coste de amazonchimebusinesscalling por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonchimecallme** <br>(gauge) | El coste de amazonchimecallme por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonchimedialin** <br>(gauge) | El coste de amazonchimedialin por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonchimevoiceconnector** <br>(gauge) | El coste de amazonchimevoiceconnector por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonchime** <br>(gauge) | El coste de amazonchime por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonclouddirectory** <br>(gauge) | El coste de amazonclouddirectory por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazoncloudfront** <br>(calibre) | El coste de amazoncloudfront por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazoncloudsearch** <br>(gauge) | El coste de amazoncloudsearch por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazoncloudwatch** <br>(gauge) | El coste de amazoncloudwatch por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazoncognitosync** <br>(gauge) | El coste de amazoncognitosync por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazoncognito** <br>(gauge) | El coste de amazoncognito por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonconnect** <br>(gauge) | El coste de amazonconnect por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazondax** <br>(gauge) | El coste de amazondax por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazondocdb** <br>(gauge) | El coste de amazondocdb por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazondynamodb** <br>(gauge) | El coste de amazondynamodb por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonec2** <br>(gauge) | El coste de amazonec2 por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonecr** <br>(gauge) | El coste de amazonecr por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonecs** <br>(gauge) | El coste de amazonecs por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonefs** <br>(gauge) | El coste de amazonefs por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonei** <br>(gauge) | El coste de amazonei por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazoneks** <br>(gauge) | El coste de amazoneks por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazones** <br>(gauge) | El coste de amazones por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonets** <br>(gauge) | El coste de amazonets por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonelasticache** <br>(gauge) | El coste de amazonelasticache por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonfsx** <br>(gauge) | El coste de amazonfsx por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazongamelift** <br>(gauge) | El coste de amazongamelift por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonglacier** <br>(gauge) | El coste de amazonglacier por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonguardduty** <br>(gauge) | El coste de amazonguardduty por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazoninspector** <br>(gauge) | El coste de amazoninspector por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonkinesisanalytics** <br>(gauge) | El coste de amazonkinesisanalytics por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonkinesisfirehose** <br>(gauge) | El coste de amazonkinesisfirehose por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonkinesis** <br>(gauge) | El coste de amazonkinesis por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonlex** <br>(gauge) | El coste de amazonlex por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonlightsail** <br>(gauge) | El coste de amazonlightsail por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonml** <br>(gauge) | El coste de amazonml por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonmq** <br>(gauge) | El coste de amazonmq por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonmsk** <br>(gauge) | El coste de amazonmsk por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonmacie** <br>(gauge) | El coste de amazonmacie por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonneptune** <br>(gauge) | El coste de amazonneptune por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonpinpoint** <br>(gauge) | El coste de amazonpinpoint por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonpolly** <br>(gauge) | El coste de amazonpolly por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonquicksight** <br>(gauge) | El coste de amazonquicksight por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonrds** <br>(gauge) | El coste de amazonrds por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonredshift** <br>(gauge) | El coste de amazonredshift por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonrekognition** <br>(gauge) | El coste de la amazonrecognición por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonroute53** <br>(gauge) | El coste de amazonroute53 por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazons3glacierdeeparchive** <br>(gauge) | El coste de amazons3glacierdeeparchive por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazons3** <br>(gauge) | El coste de las amazons3 por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonses** <br>(gauge) | El coste de las amazonses por unidad.<br>_Se muestra en dólares_ |
| **aws.pricing.amazonsns** <br>(gauge) | El coste de amazonsns por unidad.<br>_Se muestra en dólares_ |

### Eventos

AWS Pricing no incluye eventos.

### Checks de servicio

**aws_pricing.status**

Devuelve `OK` si se han recopilado todos los datos de precios, `WARNING` si no se han podido encontrar algunos datos de precios y `CRITICAL` si se produce algún error al utilizar el cliente Boto3.

_Estados: ok, advertencia, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).
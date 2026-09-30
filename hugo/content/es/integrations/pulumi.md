---
app_id: pulumi
app_uuid: 7604c52b-dc07-4854-a5e4-799ab62798d8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: pulumi.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10220
    source_type_name: Pulumi
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Pulumi
  sales_email: team@pulumi.com
  support_email: team@pulumi.com
categories:
- aws
- automatización
- nube
- configuración y despliegue
- herramientas de desarrollo
- orquestación
- suministro
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pulumi/README.md
display_on_public_website: true
draft: false
git_integration_title: pulumi
integration_id: pulumi
integration_title: Pulumi
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pulumi
public_title: Pulumi
short_description: Infraestructura como código para cualquier nube que utilice tus
  lenguajes de programación favoritos
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::AWS
  - Categoría::Automatización
  - Categoría::Nube
  - Categoría::Configuración y despliegue
  - Categoría::Herramientas de desarrollo
  - Categoría::Orquestación
  - Categoría::Suministro
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Infraestructura como código para cualquier nube que utilice tus lenguajes
    de programación favoritos
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Pulumi
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Pulumi][1] es una moderna plataforma de infraestructura como código que permite a los equipos de ingeniería de la nube definir, desplegar y gestionar recursos en cualquier nube utilizando sus lenguajes de programación favoritos.

La integración Pulumi se utiliza para aprovisionar cualquiera de los recursos en la nube disponibles en Datadog. Esta integración debe configurarse con credenciales para desplegar y actualizar recursos en Datadog.

**Nota**: Necesitas definir permisos IAM en AWS para que la integración pueda hacer cambios. Puedes ver los pasos para configurar permisos IAM en AWS en nuestra [documentación de la integración con AWS][2].

## Configuración

### Instalación

La [integración de Pulumi en Datadog][3] utiliza el SDK de Datadog para gestionar y aprovisionar recursos.

### Configuración

1. [Inscríbete para obtener una cuenta gratuita o comercial de Pulumi][4]

2. [Instalación de Pulumi][5]

3. Una vez que lo hagas, existen dos formas de configurar tus tokens de autorización de Datadog para Pulumi:


Define las variables de entorno `DATADOG_API_KEY` y `DATADOG_APP_KEY`:

```
export DATADOG_API_KEY=XXXXXXXXXXXXXX && export DATADOG_APP_KEY=YYYYYYYYYYYYYY
```

O bien, defínelas utilizando la configuración si prefieres que se almacenen junto a tu stack tecnológico de Pulumi para facilitar el acceso de varios usuarios:

```
pulumi config set datadog:apiKey XXXXXXXXXXXXXX --secret && pulumi config set datadog:appKey YYYYYYYYYYYYYY --secret
```

**Nota**: Pasa `--secret` cuando configures `datadog:apiKey` y `datadog:appKey` para que se cifren correctamente.

4. Ejecuta `pulumi new` para inicializar un directorio de proyecto para tu stack tecnológico de infraestructura y sigue la [documentación de la API][6] para definir nuevas métricas, monitores, dashboards u otros recursos.

5. Una vez que hayas definido tus recursos en la nube en código, ejecuta `pulumi up` para crear los nuevos recursos definidos en tu programa Pulumi. 

## Datos recopilados

### Métricas

Pulumi no incluye métricas.

### Checks de servicios

Pulumi no incluye checks de servicio.

### Eventos

Pulumi no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://pulumi.com
[2]: https://docs.datadoghq.com/es/integrations/amazon_web_services/?tab=roledelegation#aws-iam-permissions
[3]: https://www.pulumi.com/docs/intro/cloud-providers/datadog/
[4]: https://www.pulumi.com/pricing/
[5]: https://www.pulumi.com/docs/get-started/
[6]: https://www.pulumi.com/docs/reference/pkg/datadog/
[7]: https://docs.datadoghq.com/es/help/
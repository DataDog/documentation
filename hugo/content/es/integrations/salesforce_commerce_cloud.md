---
app_id: salesforce-commerce-cloud
app_uuid: fe465a7e-7702-40fb-9a88-a0e4198d1983
assets:
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 616
    source_type_name: Salesforce Commerce Cloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: salesforce_commerce_cloud
integration_id: salesforce-commerce-cloud
integration_title: Salesforce Commerce Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: salesforce_commerce_cloud
public_title: Salesforce Commerce Cloud
short_description: Importa tus logs de Salesforce Commerce Cloud a Datadog
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Logs
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Setup
  description: Importa tus logs de Salesforce Commerce Cloud a Datadog
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/integrations/salesforce_commerce_cloud/
  support: README.md#Support
  title: Salesforce Commerce Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Información general

Salesforce Commerce Cloud es una plataforma de comercio multiinquilino basada en la nube. Integra Salesforce Commerce Cloud con
Datadog para ver y analizar tus logs utilizando [logs de Datadog][1].

## Configuración

### Instalación

No se requiere ninguna instalación.

### Configuración

Para configurar Salesforce Commerce Cloud para que permita el acceso de Datadog para importar datos de log, debes crear
un cliente de API. A continuación, registra ese cliente de API en Datadog.

#### Creación de un cliente de API
1. Sigue los pasos indicados en las [Instrucciones de Commerce Cloud para crear un cliente][2]. En el campo `Token Endpoint Auth Method`, elige `private_key_jwt`. En el campo `Access Token Format`, elige `JWT`. **Nota**: Esta integración sólo admite clientes de API aprovisionados mediante la instancia principal de Account Manager en `https://account.demandware.com/`.
2. Anota el ID y el secreto del cliente de la API (también denominados nombre de usuario y contraseña), ya que son necesarios en los pasos siguientes.
3. En **Administration > Organization > WebDAV Client Permissions** (Administración > Organización > Permisos del cliente WebDAV** en tu interfaz de Business Manager, añade el siguiente JSON. Asegúrate de insertar tu ID de cliente en el lugar apropiado.

```json
{  
   "clients":[  
      {  
         "client_id":"<your-client-id-here>",
         "permissions":[  
            {  
               "path":"/logs",
               "operations":[  
                  "read"
               ]
            }
         ]
      }
   ]
}
```

#### Conexión de la integración de Datadog

1. Haz clic en **Add New** (Añadir nuevo) en la pestaña Configuration (Configuración) del [cuadro de integración de Salesforce Commerce Cloud][3].
2. Introduce tu dominio de Business Manager (por ejemplo, `my-0001.sandbox.us02.dx.commercecloud.salesforce.com`) y el ID y secreto de cliente de API obtenidos en el paso anterior.
3. Haz clic en el botón verde **Save** (Guardar).

#### Resultados

Espera diez minutos para ver [Logs][1] entrando en la fuente `salesforce.commerce.cloud`. 

El centro de logs de SFCC representa los datos de log de forma diferente a como lo hace Datadog. Por ejemplo, algunos logs de error con grandes stack traces se dividen en dos eventos de log en el centro de logs de SFCC, mientras que los detalles del stack trace se omiten en Datadog. Esto da lugar a una discrepancia en el recuento total de eventos de log entre los dos sistemas.

## Datos recopilados

### Métricas

La integración de Salesforce Commerce Cloud no incluye ninguna métrica.

### Logs

La integración de Salesforce Commerce Cloud recopila logs a través de una conexión webdav a tu instancia de Commerce Cloud. 

### Checks de servicios

La integración de Salesforce Commerce Cloud no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://app.datadoghq.com/logs/
[2]: https://help.salesforce.com/s/articleView?id=cc.b2c_account_manager_add_api_client_id.htm&type=5
[3]: https://app.datadoghq.com/account/settings#integrations/salesforce-commerce-cloud
[4]: https://docs.datadoghq.com/es/help/
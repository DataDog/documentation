---
categories:
- cloud
- compliance
- cost management
- security
custom_kind: integración
dependencies: []
description: 'Ayuda a CloudHealth a ayudarte: proporciónale métricas por instancia
  de Datadog.'
doc_link: https://docs.datadoghq.com/integrations/cloudhealth/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog/
  tag: Blog
  text: 'CloudHealth + Datadog: gestiona eficazmente tus activos en la nube'
git_integration_title: cloudhealth
has_logo: true
integration_id: cloudhealth
integration_title: Cloudhealth
integration_version: ''
is_public: true
manifest_version: '1.0'
name: cloudhealth
public_title: Integración de Datadog y Cloudhealth
short_description: 'Ayuda a CloudHealth a ayudarte: proporciónale métricas por instancia
  de Datadog.'
team: web-integrations
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Si utilizas CloudHealth y Datadog, puedes configurar tu cuenta de CloudHealth para recopilar métricas de uso de recursos por instancia de Datadog. Esto ayuda a CloudHealth a brindarte recomendaciones más precisas para ajustar tus recursos en la nube.

Esta integración **NO** extrae nada de CloudHealth para Datadog. Solo ayuda a CloudHealth a sondear tu cuenta de Datadog para obtener métricas.

## Configuración

### Configuración

Si aún no has comenzado a optimizar tu nube con CloudHealth, primero regístrate para una [prueba sin riesgo de 14 días][1]. Los clientes actuales de CloudHealth solo deben seguir estos cuatro sencillos pasos para configurar la integración de Datadog en CloudHealth y mejorar la visibilidad en todas las dimensiones de su entorno de nube.

1. En la plataforma CloudHealth, ve a Setup -> Accounts -> Datadog y haz clic en el botón New Account en el margen superior derecho.
   {{< img src="integrations/cloudhealth/cloudhealth_config_2.png" alt="CloudHealth Config 2" popup="true">}}

2. Rellena el formulario con la información de la cuenta de Datadog que deseas integrar:

    - **Name**: nombre descriptivo, puedes actualizarlo en cualquier momento.
    - **API Key**: las claves de API son exclusivas de tu organización.
    - **Application Key**: las claves de aplicación, junto con la clave de API de tu organización, dan acceso a la API de Datadog. CloudHealth solo consulta Datadog para obtener información de hosts y métricas, y no escribe nada en Datadog.
    - **Import Tags**: permite importar etiquetas (tags) de Datadog en la plataforma.

3. Allowed tags: si la opción "Import tags" está activada, las etiquetas se recopilan de forma activa y se te proporciona un campo adicional para permitir que se importen etiquetas específicas en CloudHealth. Selecciona las etiquetas que se deben importar dentro de la plataforma CloudHealth.
   {{< img src="integrations/cloudhealth/cloudhealth_config_1.png" alt="CloudHealth Config 1" popup="true">}}

## Datos recopilados

### Métricas

La integración de CloudHealth no incluye métricas.

### Eventos

La integración de CloudHealth envía eventos de Catchpoint a tu flujo de eventos de Datadog.

### Checks de servicio

La integración de CloudHealth no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cloudhealthtech.com
[2]: https://docs.datadoghq.com/es/help/
---
algolia:
  subcategory: Integraciones del Marketplace
app_id: doctor-droid-doctor-droid
app_uuid: 21cab2f6-0f10-4302-9b61-7d99433a9294
assets: {}
author:
  homepage: https://drdroid.io/
  name: Doctor Droide
  sales_email: sales@drdroid.io
  support_email: support@drdroid.io
  vendor_id: doctor-droid
categories:
- ia/ml
- automatización
- rum
- events
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: doctor_droid_doctor_droid
integration_id: doctor-droid-doctor-droid
integration_title: Doctor Droide
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: doctor_droid_doctor_droid
pricing:
- billing_type: tag_count
  includes_assets: false
  metric: datadog.marketplace.doctor-droid.usage
  product_id: doctor-droid
  short_description: 10$ por cada 100 consultas (gratuito para las 100 primeras consultas)
  tag: consultas
  unit_label: consultas
  unit_price: 10.0
public_title: Doctor Droide
short_description: Análisis automatizado de causa raíz, inteligencia de guardia y
  automatización del manual
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Automation
  - Category::Incidents
  - Category::Alerting
  - Category::Marketplace
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Software License
  configuration: README.md#Setup
  description: Análisis automatizado de causa raíz, inteligencia de guardia y automatización
    del manual
  media:
  - caption: Añadir la integración de slack de Doctor Droide en tu espacio de trabajo
    image_url: images/1.png
    media_type: imagen
  - caption: Añadir el webhook de Doctor Droid como destino a tu monitor
    image_url: images/2.png
    media_type: image
  - caption: Conectar cualquiera de tus cuadernos de estrategias existentes en Doctor
      Droid
    image_url: images/3.png
    media_type: imagen
  - caption: Recibe la respuesta del análisis del cuaderno de estrategias, directamente
      en tu bandeja de entrada.
    image_url: images/4.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Doctor Droid
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

En Doctor Droid, estamos creando herramientas para ayudar a los equipos a resolver retos en su monitorización y observabilidad. Los cuadernos de estrategias de Doctor Droid son una herramienta de automatización diseñada para eliminar el trabajo de los ingenieros agilizando las tareas manuales repetitivas.

Doctor Droid se integra a la perfección con múltiples orígenes de datos y proporciona una plataforma para crear potentes cuadernos de estrategias definidas por el usuario. Tanto si se trata de búsquedas en logs como de consultas en bases de datos, la monitorización de métricas o si necesitas una visión consolidada de tus métricas operativas, Doctor Droid cubre todas tus necesidades.

Doctor Droid mejora las alertas y analiza automáticamente tu cuenta de Datadog en busca de otras anomalías en todo tu sistema.

**¿Cómo funciona?**

1.  Instalar la [integración de Doctor Droid][1]
2.  Define los pasos de la investigación en Doctor Droid como un cuaderno de estrategias (por ejemplo, define pasos como check de métricas descendentes, check de despliegues recientes, check de logs de error y así sucesivamente).
3.  Añade un webhook de Doctor Droid a tu monitor.
4.  Obtén automáticamente un resumen de la investigación e información cuando se active tu monitor.

## Asistencia

Puedes ponerte en contacto con nuestro equipo en support@drdroid.io para cualquier consulta de asistencia.


[1]: https://app.datadoghq.com/integrations/doctordroid

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/doctor-droid-doctor-droid" target="_blank">adquiere esta aplicación en Marketplace</a>.
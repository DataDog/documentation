---
algolia:
  subcategory: Integraciones del Marketplace
app_id: seagence-seagence
app_uuid: 194f32bb-fc70-41e5-a742-bcacc3db13ed
assets: {}
author:
  homepage: https://www.seagence.com
  name: Seagence Technologies
  sales_email: sales@seagence.com
  support_email: support@seagence.com
  vendor_id: seagence
categories:
- events
- automatización
- marketplace
- herramientas de desarrollo
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: seagence_seagence
integration_id: seagence-seagence
integration_title: seagence
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: seagence_seagence
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.seagence.seagence
  product_id: seagence
  short_description: Licencia Seagence por host al mes
  tag: host
  unit_label: host
  unit_price: 21
public_title: seagence
short_description: Herramienta de detección y resolución de defectos en tiempo real
  que elimina la necesidad de depuración.
supported_os:
- todos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Todos
  - Categoría::Alertas
  - Categoría::Automatización
  - Categoría::Marketplace
  - Categoría::Herramientas de desarrollo
  - Oferta::Licencia de software
  configuration: README.md#Configuración
  description: Herramienta de detección y resolución de defectos en tiempo real que
    elimina la necesidad de depuración.
  media:
  - caption: Dashboard de información general de defectos de Seagence
    image_url: images/datadog-dashboard.png
    media_type: imagen
  - caption: La vista cronológica de las transacciones destaca las transacciones fallidas
      y exitosas
    image_url: images/timeline.png
    media_type: imagen
  - caption: La agrupación en clústeres Seagence reúne las transacciones fallidas
      y exitosas en clústeres separados
    image_url: images/defect-and-success-clusters.png
    media_type: imagen
  - caption: Lista de transacciones y excepciones
    image_url: images/list-of-transactions-and-exceptions.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: seagence
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

[Seagence][1] es una herramienta de detección y resolución de defectos en tiempo real de nivel de producción para aplicaciones Java. Mediante un enfoque único, Seagence detecta defectos conocidos y desconocidos en tiempo real causados por problemas de subprocesos numerosos, excepciones tragadas, gestionadas y no gestionadas, y otros, incluyendo defectos disfrazados en un código de respuesta HTTP exitosos 200. Cuando se detecta un defecto, nuestra [integración predefinida][5] enviará un evento a Datadog para alertar a tu equipo. El dashboard [predefinido] proporciona visibilidad sobre los defectos detectados y las causas de origen para eliminar la depuración y solucionar problemas. Puedes encontrar más información sobre el defecto en [SeagenceWeb][2].

Seagence está diseñado desde cero para entornos de producción y arquitecturas modernas como despliegues Kubernetes, microservicios, arquitecturas monolíticas, contenedores y aplicaciones serverless.

**Detección de defectos en tiempo real**: Mediante un enfoque único, Seagence detecta defectos conocidos y desconocidos en tiempo real causados por problemas de subprocesos numerosos, excepciones tragadas, gestionadas y no gestionadas. El único requisito previo para Seagence es que el defecto ocurra aproximadamente 5 veces (Este es el **Tiempo de razonamiento** de Seagence). Cuando se cumple este requisito previo, Seagence empieza a detectar cada caso del defecto a partir de la 6ª vez en tiempo real. Seagence detecta los defectos incluso antes de que los usuarios finales empiecen a notificarlos y aunque los archivos de logs no tengan **trazas** (traces).

**Eliminar la depuración y solucionar problemas**: No hay necesidad de depuración ni de resolución de problemas. Con el defecto y la causa de origen proporcionados por Seagence a mano, podrás reparar tu código roto y reducirás el tiempo medio de recuperación (MTTR) de 3 días a medio día.

**No se requieren cambios en el código**: Seagence utiliza un pequeño agente Java, por lo que no se requieren cambios en el código. Seagence registra todos los errores y excepciones lanzadas, incluyendo las excepciones gestionadas, no gestionadas y tragadas. Así tendrás todo el contexto que necesitas para cada transacción.

**Agrupación en clústeres**: Utilizando la agrupación en clústeres se deja de analizar el ruido. La agrupación en clústeres reúne transacciones similares. Analiza 1 transacción del clúster y descubre inmediatamente cómo se procesan 1 millón de transacciones de ese clúster.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Seagence][4].

[1]: https://www.seagence.com
[2]: https://app.seagence.com/SeagenceWeb/
[3]: https://seagence.com/product/getting-started/
[4]: mailto:support@seagence.com
[5]: https://app.datadoghq.com/integrations/seagence

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/seagence-seagence" target="_blank">adquiere esta aplicación en el Marketplace</a>.
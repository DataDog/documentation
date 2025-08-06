---
categories:
- aws
- nube
- configuración y despliegue
- recopilación de logs
custom_kind: integración
dependencies: []
description: Rastrea métricas clave de Amazon Keyspaces.
doc_link: https://docs.datadoghq.com/integrations/amazon_keyspaces/
draft: false
git_integration_title: amazon_keyspaces
has_logo: true
integration_id: ''
integration_title: Amazon Keyspaces (para Apache Cassandra)
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_keyspaces
public_title: Integración de Datadog y Amazon Keyspaces (para Apache Cassandra)
short_description: Rastrea métricas clave de Amazon Keyspaces.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Amazon Keyspaces (para Apache Cassandra) es un servicio de base de datos escalable, de alta disponibilidad y administrada, compatible con Apache Cassandra. Con Amazon Keyspaces, puedes ejecutar tus cargas de trabajo de Cassandra en AWS utilizando el mismo código de aplicación de Cassandra y herramientas de desarrollo que utilizas actualmente.

Habilita esta integración para ver todas tus métricas de Keyspaces en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services][1].

### Recopilación de métricas

1. En la [página de la integración de AWS][2], asegúrate de que `Cassandra` está habilitado en la pestaña `Metric Collection`.
2. Instala la [integración de Datadog y Amazon Keyspaces (para Apache Cassandra)][3].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "amazon_keyspaces" >}}


### Eventos

La integración de Amazon Keyspaces no incluye ningún evento.

### Checks de servicio

La integración de Amazon Keyspaces no incluye ningún check de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-keyspaces
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_keyspaces/amazon_certificate_manager_metadata.csv
[5]: https://docs.datadoghq.com/es/help/

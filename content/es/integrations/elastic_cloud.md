---
app_id: elastic-cloud
app_uuid: f00a0b0b-b25f-4b9b-af4d-dda28f33609a
assets:
  dashboards:
    elastic_cloud: assets/dashboards/elastic_cloud_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: elastic_cloud.docs.count
      metadata_path: metadata.csv
      prefix: elastic_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10315
    source_type_name: Elastic Cloud
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: nube_elástica
integration_id: elastic-cloud
integration_title: Elastic Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: elastic_cloud
public_title: Nube elástica
short_description: Monitorización de métricas de servicios Elasticsearch alojados
  en Elastic Cloud.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría:Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorización de métricas de servicios Elasticsearch alojados en Elastic
    Cloud.
  media: []
  overview: README.md#Información general
  support: README.md#Solucionar problemas
  title: Elastic Cloud
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Integración con Elastic Cloud para mantenerte al día con tus servicios Elasticsearch alojados.

La integración proporciona métricas de tus servicios Elastic Cloud, incluyendo lo siguiente:

- Estadísticas de clúster
- Estados de clúster
- Estadísticas de nodos e índices
- Métricas de uso de recursos

## Configuración

### Instalación

No requiere pasos de instalación.

### Configuración

#### Recopilación de métricas

Crea un usuario de Elastic Cloud de solo lectura para tu despliegue e introduce las credenciales de usuario en el [cuadro de la integración Elastic Cloud][1].

1. Accede a todos tus [despliegues de Elastic Cloud][2].
2. Selecciona el nombre de tu despliegue.
3. Haz clic en **Manage permissions** (Gestionar permisos) en **Gestión**.
4. En la pestaña **Roles**, crea un rol haciendo clic en **Create role** (Crear rol).
    1. Introduce **Datadog-Role** en **Nombre del rol**.
    2. Introduce **Monitor, read_slm** en **Privilegios de clúster de Elasticsearch**.
    3. En **Índices**, introduce los índices de los que quieres obtener métricas.
    4. En **Privilegios**, introduce **Monitor**.
    5. Haz clic en **Create role** (Crear rol).
5. Selecciona la pestaña **Usuarios**.
    1. Haz clic en **Create user** (Crear usuario).
    2. Rellena el formulario con un nombre de usuario, un correo electrónico y una contraseña.
    3. En **Privilegios**, selecciona **Datadog-Role** en el desplegable **Roles**.
    4. Haz clic en **Create user** (Crear usuario).

Obtén la URL de tu despliegue de Elastic Cloud a través de los siguientes pasos:
1. Accede a todos tus [despliegues de Elastic Cloud][2].
2. Selecciona tu despliegue.
3. Busca **Elasticsearch** en **Aplicaciones**.
4. Haz clic en **Copy Endpoint** (Copiar endpoint) para copiar la URL de tu despliegue.

Por defecto, la integración recopilará estadísticas de los nodos de tus clústeres, como el número de nodos o el número de
documentos en cada nodo.

Los siguientes son indicadores configurables que puedes definir en el cuadro de la integración para recibir métricas específicas:

Estadísticas de fragmentos primarios
: Sólo métricas de los fragmentos de clúster primarios.

Apagado ordenado de fragmentos primarios
: Las métricas de fragmentos primarios de clúster pueden llegar a ser muy grandes, por lo que existe la posibilidad de que se agote el tiempo de espera de la solicitud. Habilita este
indicador para seguir recopilando todas las demás métricas a pesar del tiempo de espera.

Estadísticas detalladas de índices
: Habilita esta opción para obtener estadísticas de fragmentos primarios específicas de índices.

Estadísticas de tareas pendientes
: Métricas de cambios de nivel de clúster que aún no se han ejecutado.

Estadísticas de asignación de fragmentos
: Métricas del número de fragmentos asignados a cada nodo de datos y su espacio en disco.

Estadísticas de gestión del ciclo de vida de snapshots
: Métricas de acciones llevadas a cabo por la gestión del ciclo de vida de snapshots.

Estadísticas de índices
: Habilítalas para recopilar métricas de índices individuales.

### Filtro de tráfico IP

Elastic Cloud permite filtrar el tráfico, ya sea por dirección IP o por bloque CIDR, como capa de seguridad. Limita la forma en que
se puede acceder a los despliegues.
Deben permitirse determinados prefijos de direcciones IP para que Datadog pueda recuperar métricas del despliegue.

Sigue estos [pasos][3] para crear un conjunto de reglas de filtrado de tráfico. Después de crear el conjunto de reglas, asócialo
a tu despliegue.

Para incluir los prefijos IP de Datadog:

1. Busca los rangos IP de Datadog [aquí][4].
2. Introduce cada prefijo bajo **webhooks** en el conjunto de reglas de tráfico como **fuente**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "elastic-cloud" >}}


### Logs

La integración Elastic Cloud no incluye logs.

### Eventos

La integración Elastic Cloud no incluye eventos.

### Checks de servicio

La integración Elastic Cloud no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].






[1]: https://app.datadoghq.com/account/settings#integrations/elastic-cloud
[2]: https://cloud.elastic.co/deployments
[3]: https://www.elastic.co/guide/en/cloud-enterprise/current/ece-traffic-filtering-ip.html
[4]: https://docs.datadoghq.com/es/api/latest/ip-ranges/
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/elastic_cloud/metadata.csv
[6]: https://docs.datadoghq.com/es/help
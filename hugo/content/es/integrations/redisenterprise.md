---
app_id: redisenterprise
app_uuid: a353f8c5-240c-48f9-b2a1-c86d2da0c07e
assets:
  dashboards:
    Redis Enterprise Active/Active Statistics: assets/dashboards/redis_enterprise_active_active.json
    Redis Enterprise Cluster Overview: assets/dashboards/redisenterprise_cluster_top_view.json
    Redis Enterprise Database Overview: assets/dashboards/redisenterprise_overview.json
    Redis Enterprise Redis on Flash: assets/dashboards/redisenterprise_rof.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: redisenterprise.total_node_count
      metadata_path: metadata.csv
      prefix: redisenterprise.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10190
    source_type_name: Redis Enterprise
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Redis
  sales_email: github@mague.com
  support_email: github@mague.com
categories:
- almacenes de datos
- almacenamiento en caché
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/README.md
display_on_public_website: true
draft: false
git_integration_title: redisenterprise
integration_id: redisenterprise
integration_title: Redis Enterprise (obsoleto)
integration_version: 1.2.0
is_public: true
manifest_version: 2.0.0
name: redisenterprise
public_title: Redis Enterprise (obsoleto)
short_description: Observabilidad Redis Enterprise
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Almacenes de datos
  - Categoría::Almacenamiento en caché
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Observabilidad Redis Enterprise
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Redis Enterprise (obsoleto)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


![img][1]

## Información general

**Esta integración será obsoleta a partir del 1 de noviembre de 2024. De ahora en adelante, utiliza la [integración Redis Enterprise Datadog][2] más reciente. Esta nueva integración expone todas las métricas más recientes de Redis Enterprise e incluye dashboards actualizados.**

Esta integración proporciona monitorización y métricas de [Redis Enterprise][3] para Datadog.

### ¿Qué es Redis Enterprise?

[Redis Enterprise][3] es la versión empresarial de Redis totalmente compatible. Además del conjunto de funciones básicas de código abierto de Redis, Redis Enterprise añade la geodistribución activo-activo, funciones de base de datos multimodelo, una observabilidad mejorada y una gestión multiinquilino más sencilla para tiempos de actividad más elevados.

### Dashboard de Redis Enterprise en Datadog

La integración de Redis Enterprise en Datadog proporciona una vista de plantilla de tus clústeres y bases de datos, lo que te permite acceder a conocimientos operativos que no están disponibles en otros productos. Comprende los patrones de uso y planifica el crecimiento con los datos necesarios para tomar decisiones informadas.

#### Información general de la base de datos
![información general][4]

#### Información general del clúster
![información general][5]

#### Redis en Flash
![rofdash][6]

#### Redis activo/activo
![rofdash][7]

#### Eventos Redis Enterprise
![eventos][8]

### Proveedor

![proveedor][9]

Esta integración es proporcionada por Redis Labs.

## Configuración

### Instalación

Si utilizas el Agent v7.21/v6.21 o posteriores, sigue las siguientes instrucciones para instalar el check de Redis Enterprise en tu host. Consulta la guía específica del Agent para la [instalación de integraciones de la comunidad][10] para instalar checks con [versiones del Agent anteriores a 7.21/6.21][11] o el [Agent Docker][11]:

1. [Descarga e inicia el Datadog Agent][13].
2. Ejecuta el siguiente comando para instalar la rueda de integraciones con el Agent:

   ```shell
   datadog-agent integration install -t datadog-redisenterprise==<INTEGRATION_VERSION>
   ```
  Puedes encontrar la versión más reciente en la [página de versiones de integraciones para Datadog][14]

   **Nota**: Si fuera necesario, antepón `sudo -u dd-agent` al comando de instalación.

3. Configura tu integración como [cualquier otra integración en paquete][15].

### Configuración

Copia la [configuración de ejemplo][16] y actualiza las secciones necesarias para recopilar datos de tu clúster Redis Enterprise.

```yml
    ## @param host - cadena - obligatorio
    ## Host RedisEnterprise
    #
    host: myrediscluster.example.com

    ## @param puerto - entero - opcional - por defecto: 9443
    #
    puerto: 9443

    ## @param usuario - cadena - obligatorio
    ## Usuario de API RedisEnterprise
    #
    nombre de usuario: redisadmin@example.com

    ## @param nombre de usuario - cadena - obligatorio
    ## Credencial de API RedisEnterprise
    #
    nombre de usuario: mySecretPassword
```

Consulta el archivo de ejemplo completo para ver otros parámetros opcionales disponibles que se ajusten a la configuración de tu clúster.

Los usuarios pueden configurarse de acuerdo con la [documentación][17].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "redisenterprise" >}}


### Checks de servicio

**`redisenterprise.running`**

El check devuelve:

- `OK`, si la API del clúster RedisEnterprise responde correctamente a los comandos
- `CRITICAL`, si la API no responde correctamente

**`redisenterprise.license_check`**

El check devuelve:

- `OK`, si la licencia del clúster tiene una validez superior a 7 días.
- `WARNING`, si la licencia del clúster caduca en menos de 7 días.
- `CRITICAL`, si la licencia del clúster caducó.

**Nota:** El clúster sigue funcionando normalmente con una licencia caducada, pero durante este tiempo no se pueden realizar cambios de configuración. Ponte en contacto con tu representante de ventas para solicitar la renovación.

### Eventos

Se recopilan todos los [eventos Redis Enterprise][19].

## Solucionar problemas

Ponte en contacto con el [equipo de ingeniería de campo de Redis][20].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/redis-enterprise.jpg
[2]: https://docs.datadoghq.com/es/integrations/redis_enterprise/
[3]: http://www.redislabs.com
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/dashboard.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/datadog_cluster_top_view.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/ROF_dashboard.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/active_active_dashboard.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/events.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/logo-redis.png
[10]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/?tab=agentv721v621
[11]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/?tab=agentearlierversions
[12]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/?tab=docker
[13]: https://app.datadoghq.com/account/settings/agent/latest
[14]: https://github.com/DataDog/integrations-extras/tags
[15]: https://docs.datadoghq.com/es/getting_started/integrations/
[16]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/datadog_checks/redisenterprise/data/conf.yaml.example
[17]: https://docs.redislabs.com/latest/rc/security/database-security/passwords-users-roles/
[18]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/metadata.csv
[19]: https://docs.redislabs.com/latest/rs/administering/monitoring-metrics/#cluster-alerts
[20]: mailto:redis.observability@redis.com?subject=Datadog%20Integration%20Support
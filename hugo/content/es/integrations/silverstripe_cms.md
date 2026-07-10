---
app_id: silverstripe-cms
app_uuid: acd6d383-dfe8-4e70-8c68-e5f3b6da84af
assets:
  dashboards:
    Silverstripe CMS - Overview: assets/dashboards/silverstripe_cms_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - silverstripe_cms.files.count
      metadata_path: metadata.csv
      prefix: silverstripe_cms.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 35271991
    source_type_name: Silverstripe CMS
  monitors:
    Pages with broken files are higher: assets/monitors/pages_with_broken_files_are_higher.json
    Pages with broken links are higher: assets/monitors/pages_with_broken_links_are_higher.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/silverstripe_cms/README.md
display_on_public_website: true
draft: false
git_integration_title: silverstripe_cms
integration_id: silverstripe-cms
integration_title: Silverstripe CMS
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: silverstripe_cms
public_title: Silverstripe CMS
short_description: Monitoriza el contenido de Silverstripe CMS y la actividad de los
  usuarios.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitoriza el contenido de Silverstripe CMS y la actividad de los usuarios.
  media:
  - caption: Silverstripe CMS - Información general
    image_url: images/silverstripe_cms_overview.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Silverstripe CMS
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


## Información general

Silverstripe CMS es una plataforma de código abierto para la creación y la gestión de sitios y aplicaciones web. Ofrece un panel de administración intuitivo que facilita la edición y personalización de contenidos sin necesidad de código. Su marco flexible lo hace ideal tanto para sitios sencillos como para proyectos complejos.

La integración SilverStripe CMS recopila métricas de archivos, páginas e intentos fallidos de inicio de sesión, y los envía a Datadog para su análisis y monitorización.

## Configuración

### Instalación

La integración de Silverstripe CMS está incluida en el [paquete del Datadog Agent][1]. No es necesaria ninguna instalación adicional.

### Obtener credenciales de bases de datos Silverstripe CMS
| **Parámetro**        | **Descripción**                                            |
|----------------------|------------------------------------------------------------|
| Tipo de base de datos        | El tipo de servidor de base de datos, ya sea MySQL o PostgreSQL.   |
| Nombre de base de datos        | El nombre de la base de datos configurada.                       |
| Nombre de usuario de base de datos    | El nombre de usuario utilizado para conectarse a la base de datos.              |
| Contraseña de base de datos    | La contraseña asociada al usuario de la base de datos.            |
| IP de servidor de base de datos   | La dirección IP del servidor de la base de datos.                     |
| Puerto de base de datos        | El número de puerto del servidor de la base de datos.                    |

### Conectar tu cuenta de Silverstripe CMS al Agent

1. Copia el archivo `conf.yaml.example`.
   ```sh
   cp /etc/datadog-agent/conf.d/silverstripe_cms.d/conf.yaml.example /etc/datadog-agent/conf.d/silverstripe_cms.d/conf.yaml
   ```

2. Añade este bloque de configuración a tu archivo `silverstripe_cms.d/conf.yaml` para empezar a recopilar tus métricas.
   - Consulta el ejemplo de [silverstripe_cms.d/conf.yaml][2] para ver las opciones de configuración disponibles.
   - Si necesitas configurar varias instancias de Silverstripe CMS en el archivo `conf.yaml`, consulta el siguiente ejemplo:
     ```yaml
       init_config:
       instances:
         - SILVERSTRIPE_DATABASE_TYPE: PostgreSQL
           SILVERSTRIPE_DATABASE_NAME: <DATABASE_NAME_1>
           SILVERSTRIPE_DATABASE_SERVER_IP: <IPV4>
           SILVERSTRIPE_DATABASE_PORT: <PORT_NUMBER>
           SILVERSTRIPE_DATABASE_USERNAME: <USERNAME_1>
           SILVERSTRIPE_DATABASE_PASSWORD: <PASSWORD_1>
           min_collection_interval: 300
         - SILVERSTRIPE_DATABASE_TYPE: MySQL
           SILVERSTRIPE_DATABASE_NAME: <DATABASE_NAME_2>
           SILVERSTRIPE_DATABASE_SERVER_IP: <IPV4>
           SILVERSTRIPE_DATABASE_PORT: <PORT_NUMBER>
           SILVERSTRIPE_DATABASE_USERNAME: <USERNAME_2>
           SILVERSTRIPE_DATABASE_PASSWORD: <PASSWORD_2>
           min_collection_interval: 300
     ```

3. [Reinicia el Agent][3].

### Validación

- [Ejecuta el subcomando de estado del Agent][4] y busca `silverstripe_cms` en la sección **Checks**.

- También puedes utilizar el siguiente comando para obtener información detallada sobre la integración:
    ```sh
    sudo datadog-agent check silverstripe_cms
    ```

   El check devuelve OK si todas las configuraciones son correctas y el Agent es capaz de comunicarse con Silverstripe CMS.

## Datos recopilados

### Log

La integración Silverstripe CMS no incluye logs.

### Métricas

La integración Silverstripe CMS recopila y envía las siguientes métricas a Datadog.

{{< get-metrics-from-git "silverstripe_cms" >}}

### Checks de servicio

La integración Silverstripe CMS incluye checks de servicios que se enumeran en el archivo [service_checks.json][5].

### Eventos

- `Silverstripe.CMS.silverstripe_cms_authentication` activada para la autenticación de los parámetros proporcionados.

## Desinstalación

Para integraciones que se ejecutan en el Agent:

- Elimina totalmente la integración utilizando el comando `datadog-agent integration remove`. Para obtener más información, consulta [Gestión de integraciones][6].

## Ayuda

Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][7].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/silverstripe_cms/datadog_checks/silverstripe_cms/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/silverstripe_cms/assets/service_checks.json
[6]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#remove
[7]: https://docs.datadoghq.com/es/help
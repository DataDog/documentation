---
app_id: openldap
app_uuid: ea3487c9-2c55-417c-bed5-17a42bdf71cf
assets:
  dashboards:
    OpenLDAP Overview: assets/dashboards/openldap_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: openldap.connections.current
      metadata_path: metadata.csv
      prefix: openldap.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10040
    source_type_name: OpenLDAP
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openldap/README.md
display_on_public_website: true
draft: false
git_integration_title: openldap
integration_id: openldap
integration_title: OpenLDAP
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: openldap
public_title: OpenLDAP
short_description: 'Recopila métricas de tu servidor OpenLDAP utilizando el backend
  cn=monitor '
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopila métricas de tu servidor OpenLDAP utilizando el backend cn=monitor
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OpenLDAP
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Utiliza la integración de OpenLDAP para obtener métricas del backend `cn=Monitor` de tus servidores OpenLDAP.

## Configuración

### Instalación

La integración de OpenLDAP se empaqueta con el Agent. Para empezar a recopilar tus métricas de OpenLDAP:

1. Ten configurado el backend `cn=Monitor` en tus servidores OpenLDAP.
2. [Instala el Agent][1] en tus servidores OpenLDAP.

### Configuración

#### Preparar OpenLDAP

Si el backend `cn=Monitor` no está configurado en tu servidor, sigue estos pasos:

1. Comprueba si la monitorización está activada en tu instalación:

   ```shell
    sudo ldapsearch -Y EXTERNAL -H ldapi:/// -b cn=module{0},cn=config
   ```

   Si ves una línea con `olcModuleLoad: back_monitor.la`, la monitorización ya está activada, ve al paso 3.

2. Activa la monitorización en tu servidor:

   ```text
       cat <<EOF | sudo ldapmodify -Y EXTERNAL -H ldapi:///
       dn: cn=module{0},cn=config
       changetype: modify
       add: olcModuleLoad
       olcModuleLoad: back_monitor.la
       EOF
   ```

3. Crea una contraseña cifrada con `slappasswd`.
4. Añade un nuevo usuario:

   ```text
       cat <<EOF | ldapadd -H ldapi:/// -D <YOUR BIND DN HERE> -w <YOUR PASSWORD HERE>
       dn: <USER_DISTINGUISHED_NAME>
       objectClass: simpleSecurityObject
       objectClass: organizationalRole
       cn: <COMMON_NAME_OF_THE_NEW_USER>
       description: LDAP monitor
       userPassword:<PASSWORD>
       EOF
   ```

5. Configura la base de datos del monitor:

   ```text
       cat <<EOF | sudo ldapadd -Y EXTERNAL -H ldapi:///
       dn: olcDatabase=Monitor,cn=config
       objectClass: olcDatabaseConfig
       objectClass: olcMonitorConfig
       olcDatabase: Monitor
       olcAccess: to dn.subtree='cn=Monitor' by dn.base='<USER_DISTINGUISHED_NAME>' read by * none
       EOF
   ```

#### Configurar la integración de OpenLDAP

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

###### Recopilación de métricas

1. Edita tu `openldap.d/conf.yaml` en la carpeta `conf.d` en la raíz de tu directorio de configuración del Agent. Consulta el [openldap.d/conf.yaml de ejemplo][1] para todas las opciones disponibles de configuración.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Full URL of your ldap server. Use `ldaps` or `ldap` as the scheme to
     ## use TLS or not, or `ldapi` to connect to a UNIX socket.
     #
     - url: ldaps://localhost:636

       ## @param username - string - optional
       ## The DN of the user that can read the monitor database.
       #
       username: "<USER_DISTINGUISHED_NAME>"

       ## @param password - string - optional
       ## Password associated with `username`
       #
       password: "<PASSWORD>"
   ```

2. [Reinicia el Agent][2].

###### Recopilación de logs

_Disponible para las versiones >6.0 del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `openldap.d/conf.yaml` para empezar a recopilar logs de OpenLDAP:

   ```yaml
   logs:
     - type: file
       path: /var/log/slapd.log
       source: openldap
       service: "<SERVICE_NAME>"
   ```

    Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [openldap.d/conf.yaml de ejemplo][1] para ver todas las opciones disponibles de configuración.

3. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/openldap/datadog_checks/openldap/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

###### Recopilación de métricas

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `openldap`                                                                                      |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                   |
| `<INSTANCE_CONFIG>`  | `{"url":"ldaps://%%host%%:636","username":"<USER_DISTINGUISHED_NAME>","password":"<PASSWORD>"}` |

###### Recopilación de logs

_Disponible para las versiones >6.0 del Agent_

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                                 |
| -------------- | ----------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "openldap", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][2] y busca `openldap` en la sección Checks.

## Compatibilidad

El check es compatible con las principales plataformas.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "openldap" >}}


### Eventos

El check de openldap no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "openldap" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/es/help/
---
app_id: zabbix
app_uuid: 9b7022c4-95c7-4872-83b6-7eaba2cc9d88
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: zabbix.system.uptime
      metadata_path: metadata.csv
      prefix: zabbix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10166
    source_type_name: Zabbix (versión de la comunidad)
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: KosukeKamiya@users.noreply.github.com
  support_email: KosukeKamiya@users.noreply.github.com
categories:
- red
- gestión de eventos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/zabbix/README.md
display_on_public_website: true
draft: false
git_integration_title: zabbix
integration_id: zabbix
integration_title: zabbix
integration_version: 1.1.1
is_public: true
manifest_version: 2.0.0
name: zabbix
public_title: zabbix
short_description: Recopila el historial de artículos con la API Zabbix e infórmalos
  a Datadog en forma de métricas.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Red
  - Categoría::Gestión de costes
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Recopila el historial de artículos con la API Zabbix e infórmalos a
    Datadog en forma de métricas.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: zabbix
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Conéctate a Zabbix para:

- Monitorizar [Zabbix][1] a través de Datadog Agent.
- Enviar alertas de Zabbix a Datadog para ver las alertas como eventos en tu flujo (stream) de eventos Datadog.

## Configuración

El check de Zabbix no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de Zabbix en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-zabbix==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Asegúrate de que la zona horaria de tu servidor Zabbix esté configurada en UTC. Puedes encontrar más información sobre las zonas horarias de Zabbix en la [documentación de Zabbix][5].

2. Edita el archivo `zabbix.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de Zabbix. Consulta el [zabbix.d/conf.yaml de ejemplo][6] para conocer todas las opciones de configuración disponibles.

3. [Reinicia el Agent][7].

#### Recopilación de eventos

##### Crear un tipo de soporte Datadog 

1. Ve a *Administration > Media Types > Create Media Type* (Administración > Tipos de soporte > Crear un tipo de soporte).
2. Añade parámetros al webhook utilizando variables de plantilla Zabbix. Añade tu api_key Datadog y las siguientes variables de plantilla Zabbix como parámetros:

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `api_key`            | `Your Datadog API key`               |
| `event_date`         | `{EVENT.DATE}`                       |
| `event_name`         | `{EVENT.NAME}`                       |
| `event_nseverity`    | `{EVENT.NSEVERITY}`                  |
| `event_tags`         | `{EVENT.TAGSJSON}`                   |
| `event_time`         | `{EVENT.TIME}`                       |
| `event_value`        | `{EVENT.VALUE}`                      |
| `item_name`          | `{ITEM.NAME}`                        |
| `alert_message`      | `{ALERT.MESSAGE}`                    |
| `alert_subject`      | `{ALERT.SUBJECT}`                    |


3. Define el **Nombre** como `Datadog`, el **Tipo** como `Webhook` e introduce el siguiente código como **Script**:
``` 
try {
    Zabbix.Log(4, '[datadog webhook] received value=' + value);

    var params = JSON.parse(value);
    var req = new HttpRequest();
    req.addHeader('Content-Type: application/json');
    var webhook_url = 'https://app.datadoghq.com/intake/webhook/zabbix?api_key=' + params.api_key;
    var webhook_data = value;
    var resp = req.post(webhook_url, webhook_data);
    if (req.getStatus() != 202) {
        throw 'Response code: '+req.getStatus();
    }
    Zabbix.Log(4, '[datadog webhook] received response with status code ' + req.getStatus() + '\n' + resp);
} catch (error) {
    Zabbix.Log(4, '[datadog webhook] event creation failed json : ' + webhook_data)
    Zabbix.Log(4, '[datadog webhook] event creation failed : ' + error);
}
return JSON.stringify({});

```
4. Confirma que el webhook está configurado correctamente utilizando el botón "Test".

##### Asignar soportes webhook a un usuario existente

1. Después de configurar el tipo de soporte webhook, ve a *Administration > Users* (Administración > Usuarios) y crea un usuario Zabbix exclusivo para representar el webhook. Por ejemplo, utiliza el alias `Datadog` para el webhook Datadog. Todos los parámetros, excepto los soportes, se pueden dejar en sus valores predeterminados, ya que este usuario no inicia sesión en Zabbix.
2. En el perfil de usuario, ve a la pestaña **Soporte** y añade un webhook con la información de contacto requerida. Si el webhook no utiliza un campo de destino de envíos, introduce cualquier combinación de caracteres admitidos para omitir los requisitos de validación.
3. Conceda a este usuario al menos permisos de lectura en todos los hosts a los que deba enviar alertas.

##### Configurar una acción de alerta para el webhook

1. Ve a *Configuration > Actions* (Configuración > Acciones).
2. En el menú desplegable del título de la página, selecciona el tipo de acción preferida.
3. Haz clic en **Create Action** (Crear acción).
4. Pon un nombre a la acción.
5. Elige las condiciones en las que se realizan las operaciones.
6. Elige las operaciones que se van a realizar.

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `zabbix` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "zabbix" >}}


### Eventos

Las alertas de Zabbix se recopilan como eventos en el flujo de eventos Datadog.

### Checks de servicios
{{< get-service-checks-from-git "zabbix" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].


[1]: https://www.zabbix.com/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://www.zabbix.com/documentation/current/en/manual/web_interface/time_zone
[6]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/datadog_checks/zabbix/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/
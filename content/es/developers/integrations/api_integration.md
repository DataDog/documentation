---
description: Aprende a desarrollar y publicar una integración de API en Datadog.
further_reading:
- link: /api/latest/using-the-api/
  tag: Documentación
  text: Aprender a utilizar la API de Datadog
- link: /developers/authorization/
  tag: Documentación
  text: Obtener más información sobre el uso de OAuth para integraciones de API
- link: /developers/
  tag: Documentación
  text: Aprender a desarrollar en la plataforma de Datadog
title: Crear una integración de API
type: Documentación
---
## Información general

Esta página guía a los socios tecnológicos en la creación de una integración de API en Datadog. 

## Integraciones de API

Utiliza [endpoints de API Datadog][1] para enriquecer la experiencia del cliente, enviando datos desde tu backend y extrayendo datos de la cuenta Datadog de un usuario. Los socios tecnológicos escriben y alojan su código dentro de su entorno. 

Las integraciones de API son ideales para los socios tecnológicos que se basan en SaaS y tienen una plataforma existente que autentica a los usuarios.

Las integraciones de API pueden enviar los siguientes tipos de datos a Datadog:

- [Métricas][2]
- [Logs][3]
- [Eventos][4]
- [Checks de servicios][5]
- [Trazas][6]
- [Incidentes] [7]

Puedes incluir recursos listos para utilizar como [monitores][25], [dashboards][26] y [pipelines de logs][27] con tu integración de API. Cuando un usuario hace clic en **Install** (Instalar) en tu cuadro de integración, se le pide que siga las instrucciones de configuración, y todos los dashboards listos para utilizar aparecen en su cuenta. Otros recursos, como los pipelines de logs, aparecen para los usuarios después de una correcta instalación y configuración de la integración.

Para mostrar tu oferta en las páginas **Integraciones** o **Marketplace**, debes crear un cuadro (imagen a continuación). Este cuadro incluirá instrucciones sobre cómo configurar tu oferta, así como información general sobre lo que hace la integración y cómo utilizarla. 

{{< img src="developers/integrations/integration_tile.png" alt="Cuadro que representa un ejemplo de oferta en la página Integraciones" style="width:25%" >}}

## Proceso de desarrollo

### OAuth

En lugar de solicitar claves de API y de aplicación directamente a un usuario, Datadog requiere el uso de un [cliente OAuth][14] para gestionar la autorización y el acceso para integraciones basadas en la API. Las implementaciones de OAuth deben admitir todos los [sitios Datadog][12].

Para obtener más información, consulta [OAuth para integraciones][15] y [Endpoints de autorización][16].

Para empezar, puedes explorar ejemplos que utilizan OAuth en el repositorio `integrations-extras`, como por ejemplo [Vantage][17].

### Crear tu integración

El proceso de creación de una API basada en integraciones tiene el siguiente aspecto:

1. Una vez que te hayan aceptado en la [red de socios Datadog][29], te reunirás con el equipo de socios tecnológicos de Datadog para analizar tu oferta y tus casos de uso.
2. Solicita una cuenta sandbox de Datadog para desarrolladores.
3. Comienza a desarrollar tu integración, lo que incluye escribir y alojar código de integraciones en tu extremo, así como implementar el [protocolo OAuth][28].
4. Prueba tu integración y tu cliente OAuth en tu cuenta sandbox de Datadog.
5. Una vez que tu trabajo de desarrollo haya sido probado y completado, sigue los pasos en [Crear un cuadro][24], para mostrar tu integración en la página **Integraciones** o **Marketplace**.
6. Una vez enviada y aprobada tu solicitud de extracción, el equipo de socios tecnológicos de Datadog programará una demostración de la revisión final de tu integración.
7. Tendrás la opción de probar el cuadro y la integración en tu cuenta sandbox de Datadog antes de publicar o de publicar inmediatamente la integración para todos los clientes.  

Empieza a crear tu integración de API [creando un cuadro][24].

## Actualizar tu integración
Puedes actualizar tu integración en cualquier momento editando los archivos relevantes y abriendo una nueva solicitud de extracción en el directorio de tu integración, en el repositorio [`integrations-extras`][21]. 

En el caso de las integraciones basadas en la API, se recomienda actualizar la versión de una integración cuando se añaden nuevas funciones, como el envío de nuevos datos, o cuando se corrigen errores importantes. 

Si se actualiza una versión de integración, asegúrate de añadir una entrada al archivo `CHANGELOG.md`, que se ajuste al siguiente formato:

   ```
   ## Número de versión / Fecha

   ***Added***: 

   * New feature
   * New feature

   ***Fixed***:

   * Bug fix
   * Bug fix
   ```

Si se editan o añaden nuevos contenidos LÉEME, información de manifiestos o recursos como dashboards y monitores recomendado, no es necesario actualizar la versión. 

Las actualizaciones de recursos como los dashboards y los monitores recomendados están disponibles para los clientes una vez que se han combinado las solicitudes de extracción correspondientes y se han publicado los recursos. Las actualizaciones de `README.md`, `manifest.json` o de cualquier otro archivo que no sea de código también están disponibles inmediatamente para los clientes tras su publicación. 


## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/api/latest/using-the-api/
[2]: https://docs.datadoghq.com/es/api/latest/metrics/
[3]: https://docs.datadoghq.com/es/logs/faq/partner_log_integration/
[4]: https://docs.datadoghq.com/es/api/latest/events/
[5]: https://docs.datadoghq.com/es/api/latest/service-checks/
[6]: https://docs.datadoghq.com/es/tracing/guide/send_traces_to_agent_by_api/
[7]: https://docs.datadoghq.com/es/api/latest/incidents/
[8]: https://docs.datadoghq.com/es/api/latest/security-monitoring/
[9]: https://docs.datadoghq.com/es/developers/#creating-your-own-solution
[10]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[11]: https://docs.datadoghq.com/es/account_management/api-app-keys/#application-keys
[12]: https://docs.datadoghq.com/es/getting_started/site
[13]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[14]: https://docs.datadoghq.com/es/developers/authorization/
[15]: https://docs.datadoghq.com/es/developers/integrations/oauth_for_integrations/
[16]: https://docs.datadoghq.com/es/developers/authorization/oauth2_endpoints/
[17]: https://github.com/DataDog/integrations-extras/tree/master/vantage
[18]: https://www.python.org/downloads/
[19]: https://pypi.org/project/datadog-checks-dev/
[20]: https://docs.datadoghq.com/es/developers/integrations/check_references/#manifest-file
[21]: https://github.com/DataDog/integrations-extras/
[22]: https://app.datadoghq.com/integrations
[23]: https://docs.datadoghq.com/es/developers/integrations/python
[24]: https://docs.datadoghq.com/es/developers/integrations/create_a_tile
[25]: https://docs.datadoghq.com/es/monitors/
[26]: https://docs.datadoghq.com/es/dashboards/
[27]: https://docs.datadoghq.com/es/logs/log_configuration/pipelines/
[28]: /es/developers/authorization/oauth2_in_datadog/
[29]: https://partners.datadoghq.com/
---
app_id: onepassword
app_uuid: ccfcdbb7-f4b2-43b4-a176-a1f0d7b08bba
assets:
  dashboards:
    1Password-Overview: assets/dashboards/1password_overview.json
  integration:
    auto_install: false
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10351
    source_type_name: 1password
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- gestión de eventos
- seguimiento de problemas
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: 1password
integration_id: onepassword
integration_title: 1Password
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: 1password
public_title: 1Password
short_description: Obtén eventos de tu cuenta de 1Password.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Gestión de eventos
  - Categoría::Seguimiento de incidentes
  - Categoría::Seguridad
  - Tipo de datos enviados::Logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Obtén eventos de tu cuenta de 1Password.
  media:
  - caption: Información general del dashboard de 1Password
    image_url: images/onepassword-dashboard.png
    media_type: imagen
  - caption: Mapa del dashboard de 1Password
    image_url: images/onepassword-map.png
    media_type: imagen
  - caption: Regla de detección de 1Password
    image_url: images/onepassword-detection-rules.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Solucionar problemas
  title: 1Password
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Con [1Password Business][1], puedes enviar eventos de tu cuenta a Datadog Cloud SIEM utilizando la API de eventos de 1Password. Además, puedes:

- Gestionar la conservación de datos de 1Password.
- Crear widgets y dashboards personalizados.
- Establecer reglas de detección que desencadenen acciones específicas.
- Realizar referencias cruzadas entre eventos de 1Password con datos de otros servicios.

La integración de Datadog con 1Password recopila logs utilizando la [API de eventos de 1Password][2], que genera tres tipos de logs:

- **Intentos de acceso**: Estos logs incluyen el nombre y la dirección IP del usuario que intentó iniciar sesión en la cuenta, cuándo se realizó el intento y, para los intentos fallidos, la causa del fallo, como una contraseña, una clave o un segundo factor incorrectos.
- **Uso de elementos**: Este tipo de logs contiene acciones que describen cómo se ha utilizado un elemento, por ejemplo, una contraseña u otra credencial. Los valores posibles para la acción incluyen rellenar, modo introducir-elemento-editar, exportar, compartir, copia-segura, revelar, seleccionar-proveedor-sso, crear-servidor, actualizar-servidor y recuperar-servidor.
- **Eventos de auditoría**: Estos logs incluyen las acciones realizadas por los miembros del equipo en una cuenta de 1Password, como los cambios realizados en la cuenta, los almacenes, los grupos, los usuarios, etc.

Después de analizar tus logs de 1Password, Datadog rellena el [dashboard de información general de 1Password][3] con información de eventos relacionados con la seguridad a partir de los valores, elementos y usuarios de 1Password. Los widgets incluyen listas principales que muestran los eventos más frecuentes e infrecuentes y un mapa de geolocalización que muestra el país de origen de los intentos de inicio de sesión.

## Configuración

**Paso 1: Generar un token de acceso en 1Password**.

Para empezar, [inicia sesión][4] en tu cuenta de 1Password, haz clic en **Integrations** (Integraciones) en la barra lateral y elige **Datadog**.

A continuación, añade la integración a tu cuenta de 1Password y crea un token web JSON de portador:

1. Introduce un **Nombre** para la integración y haz clic en **Add Integration** (Añadir integración).
2. Introduce un **Nombre** para el token de portador y elige su fecha de caducidad.
3. Selecciona los tipos de eventos a los que tendrá acceso tu token:
    a. Intentos de inicio de sesión
    b. Eventos de uso de elementos
    c. Eventos de auditoría
4. Haz clic en **Issue Token** (Generar token) para generar la clave del token de acceso. Para obtener información adicional sobre la emisión o revocación de tokens de portador de 1Password, consulta la [documentación de 1Password][5].
5. Haz clic en **Save in 1Password** (Guardar en 1Password) y elige en qué vault quieres guardar tu token.
6. Haz clic en **View Integration Details* (Ver detalles de la integración) para ver el token.

Necesitarás este token en el siguiente paso.

**Paso 2: Conectar tu cuenta de 1Password a Datadog**

Para empezar, copia la clave del token de acceso del paso anterior.

1. Introduce un **Nombre** para la cuenta.
2. Pega la **clave del token de acceso* de tu cuenta de 1Password en el campo **Access Token** (Token de acceso).
3. En el tipo de host, selecciona la **región y el plan de tu cuenta de 1Password**.
4. También puedes definir **etiquetas** (tags) para estos logs.
5. Haz clic en **Save** (Guardar).

### Validación

Busca tus logs de Datadog con `source:1password`. Si has instalado la integración correctamente, deberías poder ver eventos de 1Password.

## Datos recopilados

### Métricas

La integración 1Password no incluye métricas.

### Checks de servicios

La integración 1Password no incluye checks de servicio.

### Eventos

La integración 1Password no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda de Datadog? Ponte en contacto con el [servicio de asistencia de Datadog][6]. Alternativamente, si necesitas ayuda de 1Password, ponte en contacto con el [servicio de asistencia de 1Password][7].

[1]: https://support.1password.com/explore/business/
[2]: https://developer.1password.com/docs/events-api/
[3]: https://app.datadoghq.com/dash/integration/1Password-Overview
[4]: https://start.1password.com/signin
[5]: https://support.1password.com/events-reporting/#appendix-issue-or-revoke-bearer-tokens
[6]: https://docs.datadoghq.com/es/help/
[7]: https://support.1password.com/contact/?o=https%3a%2f%2fsupport.1password.com%2fevents-reporting%2f
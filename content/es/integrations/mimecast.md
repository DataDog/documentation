---
app_id: mimecast
app_uuid: 537f740f-1612-4ced-bddd-1bc666a56ed3
assets:
  dashboards:
    Mimecast - Audit: assets/dashboards/mimecast_audit.json
    Mimecast - DLP: assets/dashboards/mimecast_dlp.json
    Mimecast - Rejection: assets/dashboards/mimecast_rejection.json
    Mimecast - TTP Attachment: assets/dashboards/mimecast_ttp_attachment.json
    Mimecast - TTP Impersonation: assets/dashboards/mimecast_ttp_impersonation.json
    Mimecast - TTP URL: assets/dashboards/mimecast_ttp_url.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18241205
    source_type_name: mimecast
  logs:
    source: mimecast
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mimecast/README.md
display_on_public_website: true
draft: false
git_integration_title: mimecast
integration_id: mimecast
integration_title: mimecast
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: mimecast
public_title: mimecast
short_description: Obtén información sobre los logs de mimecast
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Category::Security
  - Submitted Data Type::Logs
  - Oferta::Integración
  configuration: README.md#Setup
  description: Obtén información sobre los logs de mimecast
  media:
  - caption: 'Mimecast: auditoría'
    image_url: images/mimecast_audit.png
    media_type: imagen
  - caption: 'Mimecast: DLP'
    image_url: images/mimecast_dlp.png
    media_type: imagen
  - caption: 'Mimecast: rechazo'
    image_url: images/mimecast_rejection.png
    media_type: imagen
  - caption: 'Mimecast: protección de adjunto de TTP'
    image_url: images/mimecast_ttp_attachment.png
    media_type: imagen
  - caption: 'Mimecast: protección de la suplantación de identidad de TTP'
    image_url: images/mimecast_ttp_impersonation_protect.png
    media_type: imagen
  - caption: 'Mimecast: URL de TTP'
    image_url: images/mimecast_ttp_url.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: mimecast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

[Mimecast][1] es una solución basada en la nube diseñada para proteger a las organizaciones de una amplia gama de amenazas basadas en el correo electrónico. El producto ofrece un conjunto completo de funciones de seguridad que ayuda a proteger frente a amenazas avanzadas, como el phishing, el malware, el spam y los ataques selectivos, al tiempo que ofrece prevención de fugas de datos y servicios de continuidad del correo electrónico.

Esta integración ingiere los siguientes logs:

- Auditoría: los logs de auditoría te permiten buscar, revisar y exportar logs en relación con el acceso a las cuentas y la configuración de los cambios realizados por los administradores.
- DLP : la Prevención de pérdida de datos (DLP) es un conjunto de prácticas diseñadas para proteger los datos confidenciales de las empresas, así como para detectar y evitar la pérdida de datos resultante de violaciones y ataques maliciosos.
- Rechazo: los mensajes rechazados contienen una firma de virus, o están destinados a un destinatario que no existe. En estos casos, Mimecast no acepta ningún dato de correo electrónico y los mensajes rechazados no pueden recuperarse.
- Protección de adjuntos de TTP: la protección de adjuntos de Targeted Threat Protection (TTP) protege a los clientes de los ataques de spear phishing que utilizan archivos adjuntos de correo electrónico.
- Protección de suplantación de la identidad de TTP: la protección de suplantación de la identidad de Targeted Threat Protection (TTP) ayuda a prevenir los ataques de suplantación de identidad analizando los correos electrónicos en tiempo real en busca de indicios de un ataque.
- URL de TTP: la protección de URL de Targeted Threat Protection (TTP) es un servicio de seguridad de correo electrónico que reescribe todos los enlaces entrantes de correo electrónico y escanea el sitio web de destino en tiempo real cuando el usuario hace clic en él.

La integración de Mimecast recopila sin problemas todos los logs mencionados y los canaliza a Datadog para su análisis. Aprovechando el pipeline de logs integrado, estos logs se analizan y enriquecen, lo que permite realizar análisis y buscar sin esfuerzo. La integración proporciona información sobre auditoría, DLP, archivos adjuntos maliciosos en el correo electrónico, correo electrónico enviado por el usuario como una identidad suplantada, enlaces de correo electrónico de phishing y mucho más a través de dashboards.

## Configuración

### Generar credenciales de API en Mimecast

1. Iniciar sesión en tu **cuenta de Mimecast**.
2. Navega hasta la **Administration Console** (Consola de administración), selecciona **Services** (Servicios) y, a continuación, elige la sección **API and Platform Integrations** (API e integraciones de plataforma).
3. Pasa a tus **API 2.0 Applications** (Aplicaciones de API 2.0).
4. Busca tu aplicación en la lista.
5. Si la aplicación está ausente, significa que aún no se ha configurado, y tendrás que configurarla con los siguientes pasos:
   - En la página **API and Platform Integrations** (API e integraciones de plataforma), haz clic en la pestaña **Available Integrations** (Integraciones disponibles).
   - Haz clic en el botón **Genrate keys** (Generar claves) del cuadro de la API de Mimecast API 2.0.
   - Marca la casilla **I accept** (Acepto), haz clic en **Next** (Siguiente).
   - En el paso **Application Details** (Detalles de la aplicación), rellena los siguientes datos de acuerdo con las instrucciones:
     - Nombre de la aplicación: ingresa un nombre significativo para la aplicación
     - Categoría: selecciona **SIEM Integration** (Integración de SIEM)
     - Productos: haz clic en la opción **Select all** (Seleccionar todo).
     - Rol de la aplicación: selecciona **Basic Administrator** (Administrador básico)
     - Descripción: introduce la descripción que desees
   - En **Notifications** (Notificaciones), indica los datos de contacto de tu administrador técnico y haz clic en **Next** (Siguiente).
   - Haz clic en **Add and Generate Keys** (Añadir y generar claves). Aparece una ventana emergente que muestra el ID de cliente y el secreto de cliente.
6. Si la aplicación está presente, haz clic en su nombre.
7. Haz clic en el botón **Manage API 2.0 credentials** (Gestionar credenciales de la API 2.0) y haz clic en **Generate** (Generar). Esto genera un nuevo ID de cliente y un nuevo secreto de cliente.

### Conectar tu cuenta de Mimecast a Datadog

1. Añade tus credenciales de Mimecast.

    | Parámetros | Descripción |
    | ------------------- | ------------------------------------------------------------ |
    | ID de cliente | El ID de cliente de tu aplicación registrada en Mimecast.     |
    | Secreto de cliente | El secreto de cliente de tu aplicación registrada en Mimecast. |

2. Haz clic en el botón Save (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración de Mimecast recopila y reenvía los logs de auditoría, DLP, Rechazo, Protección de adjuntos de TTP, Protección de suplantación de identidad de TTP y URL de TTP de Mimecast a Datadog.

### Métricas

La integración de Mimecast no incluye ninguna métrica.

### Checks de servicio

La integración de Mimecast no incluye ningún check de servicio.

### Eventos

La integración de Mimecast no incluye ningún evento.

## Ayuda

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].

[1]: https://www.mimecast.com/
[2]: https://docs.datadoghq.com/es/help/
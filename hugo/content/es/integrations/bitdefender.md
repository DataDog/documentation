---
app_id: bitdefender
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Proporciona información sobre logs generados por Bitdefender Agent.
integration_version: 1.0.0
media:
- caption: Bitdefender - Eventos de control avanzado de amenazas
  image_url: images/bitdefender_advanced_threat_control_events.png
  media_type: imagen
- caption: Bitdefender - Eventos antiphishing
  image_url: images/bitdefender_antiphishing_events.png
  media_type: imagen
- caption: Bitdefender - Eventos Hyper Detect
  image_url: images/bitdefender_hyper_detect_events.png
  media_type: imagen
- caption: Bitdefender - Detalles de incidentes
  image_url: images/bitdefender_incident_details.png
  media_type: imagen
- caption: Bitdefender - Eventos de malware
  image_url: images/bitdefender_malware_events.png
  media_type: imagen
- caption: Bitdefender - Detalles de eventos de defensa contra ataques de red
  image_url: images/bitdefender_network_attack_defense_event_details.png
  media_type: imagen
- caption: Bitdefender - Información general
  image_url: images/bitdefender_overview.png
  media_type: imagen
- caption: Bitdefender - Detalles de eventos de control de usuarios
  image_url: images/bitdefender_user_control_event_details.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Bitdefender
---
## Información general

[Bitdefender](https://www.bitdefender.com/en-in/business/products/endpoint-detection-response) ofrece soluciones de ciberseguridad con una eficacia líder en seguridad, rendimiento y facilidad de uso para pequeñas y medianas empresas, empresas del mercado medio y consumidores. Bitdefender EDR detiene eficazmente el ransomware y las infracciones con una correlación automatizada entre endpoints y una prevención, protección, detección y respuesta perfectamente integradas.

La integración de Bitdefender utiliza un webhook para ingerir logs de Bitdefender EDR. La integración proporciona dashboards predefinidos y reglas de detección para los siguientes tipos de eventos:

| Evento                         | Activación                                                                                                                                                           |
|-------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Antiphishing                  | El agente de endpoint detecta un intento de phishing conocido al acceder a una página web.                                                                                         |
| Antimalware                   | Bitdefender detecta malware en un endpoint de tu red.                                                                                                        |
| Control avanzado de amenazas (ATC) | Se detecta y bloquea una aplicación potencialmente peligrosa en un endpoint.                                                                                          |
| Protección de datos               | El tráfico de datos se bloquea en un endpoint, de acuerdo con las normas de protección de datos.                                                                                        |
| Detección de malware en Exchange    | Bitdefender detecta malware en un servidor Exchange de tu red.                                                                                                 |
| Firewall                      | El agente de endpoint bloquea el análisis de un puerto o de una aplicación, según la política aplicada.                                                   |
| Evento Hyper Detect            | El módulo Hyper Detect detecta malware.                                                                                                                               |
| Detección de Sandbox Analyzer    | Sandbox Analyzer detecta una nueva amenaza entre los archivos enviados.                                                                                                   |
| Evento Antiexploit             | Anti-Exploit avanzado activa una detección.                                                                                                                        |
| Evento de Network Attack Defense  | El módulo Network Attack Defense activa una detección.                                                                                                                |
| Control de usuarios/Control de contenidos  | La actividad del usuario, como la navegación web o la aplicación de software, se bloquea en el endpoint de acuerdo con la política aplicada.                                           |
| Evento de antimalware de almacenamiento     | SVA detecta una nueva amenaza en el almacenamiento protegido (NAS).                                                                                                        |
| Detección de actividad de ransomware | El agente de endpoint bloquea un ataque de ransomware.                                                                                                                           |
| Nuevo incidente                  | El nuevo Análisis de Causa Raíz (RCA) se muestra en la sección Incidents (Incidentes) del Centro de control. El evento contiene una lista de elementos relevantes extraídos del JSON del RCA. |

## Configuración

### Crear una clave de API de Bitdefender

1. Inicia sesión en el portal de seguridad empresarial Bitdefender de la empresa utilizando una cuenta de administrador. Tu cuenta debe tener los siguientes derechos:

   - Gestión de redes
   - Gestión de usuarios
   - Gestión de la empresa
   - Ver y analizar datos

1. Haz clic en **User menu** (Menú de usuario) y luego en **My Account** (Mi cuenta).

1. Ve a la sección **API keys** (Claves de API).

1. Haz clic en **Add** (Añadir). Se abre la ventana de configuración de la clave de API.

1. Proporciona la siguiente información:

   - **Descripción de la clave de API**: Un nombre relevante para tu clave de API.
   - **API habilitadas**: Selecciona todos los servicios.

1. Haz clic en **Generate** (Generar) y copia la clave de API generada.

1. Realiza la codificación Base64 en la clave de API generada. Utilizarás la clave de API codificada para la configuración del webhook.

   1. En tu clave de API, añade dos puntos (:), así: `<api_key>:`
   1. Codifica la cadena resultante utilizando un codificador Base64.

   Por ejemplo, si tu clave de API es abc123, la cadena a codificar es `abc123:`. Tras la codificación Base64, el resultado será algo
   como `YWJjMTIzOg==`.

1. Ve a la sección **Control Center API** (API del Centro de control) y anota la URL de acceso. En la siguiente sección, utilizarás esta URL en el comando curl como **\<control_center_apis_access_url>**.

Para obtener más información, consulta el [documento de referencia sobre claves de API y autenticación](https://www.bitdefender.com/business/support/en/77209-125277-public-api.html#UUID-2a74c3b5-6159-831d-4f8a-ca42797ce3b0_section-idm4640169987334432655171029621).

### Configurar un webhook en Datadog

1. En Datadog, ve a la pestaña **Integrations** (Integraciones) y busca la integración de Bitdefender.

1. Haz clic en la integración **Bitdefender**. Se abrirá la ventana de la integración. En la pestaña **Configure** (Configurar), selecciona una clave de API existente o crea una nueva.

1. Tras seleccionar una clave de API, haz clic en **Add API key* (Añadir clave de API) y luego en **Click Here to Copy URL** (Haz clic aquí para copiar la URL).

1. Realiza una solicitud curl. Utiliza la plantilla siguiente, colocando valores en los campos siguientes:

   - **<control_center_apis_access_url>**: La URL de la sección anterior
   - **<bitdefender-encoded-api-key>**: Tu clave de API codificada
   - **<dd-api-key>**: Tu clave de API Datadog 
   - **<webhook_url>**:  La URL que copiaste en el paso 3

   ```bash
   curl -X POST -k "<control_center_apis_access_url>/v1.0/jsonrpc/push" --header "Authorization: Basic <bitdefender-encoded-api-key>" --header "Content-Type: application/json" --data "{\"params\": {\"status\": 1,\"serviceType\": \"jsonRPC\",\"serviceSettings\": {\"url\": \"<webhook_url>\",\"requireValidSslCertificate\": false,\"authorization\": \"<dd-api-key>\"},\"subscribeToEventTypes\": {\"av\": true,\"aph\": true,\"fw\": true,\"avc\": true,\"uc\": true,\"dp\": true,\"hd\": true,\"exchange-malware\": true,\"network-sandboxing\": true,\"new-incident\": true,\"antiexploit\": true,\"network-monitor\": true,\"ransomware-mitigation\": true,\"storage-antimalware\": true}},\"jsonrpc\": \"2.0\",\"method\": \"setPushEventSettings\",\"id\": \"bitdefender_push\"}"
   ```

   **Nota**: Si utiliza Windows, añade `^` antes de `&ddsource` en el parámetro **webhook_url**.
   Este es un ejemplo de una solicitud curl finalizada:

   ```bash
   curl -X POST -k "https://cloudap.gravityzone.bitdefender.com/api/v1.0/jsonrpc/push" --header "Authorization: Basic <bitdefender-encoded-api-key>" --header "Content-Type: application/json" --data "{\"params\": {\"status\": 1,\"serviceType\": \"jsonRPC\",\"serviceSettings\": {\"url\": \"https://http-intake.logs.datadoghq.com/api/v2/logs?dd-api-key=<dd-api-key>&ddsource=bitdefender\",\"requireValidSslCertificate\": false,\"authorization\": \"<dd-api-key>\"},\"subscribeToEventTypes\": {\"av\": true,\"aph\": true,\"fw\": true,\"avc\": true,\"uc\": true,\"dp\": true,\"hd\": true,\"exchange-malware\": true,\"network-sandboxing\": true\"new-incident\": true,\"antiexploit\": true,\"network-monitor\": true,\"ransomware-mitigation\": true,\"storage-antimalware\": true,}},\"jsonrpc\": \"2.0\",\"method\": \"setPushEventSettings\",\"id\": \"bitdefender_push\"}"
   ```

   Después de realizar la solicitud curl, deberías recibir una respuesta indicando que tu conexión se ha establecido correctamente.

1. En Datadog, filtra tus logs en Log Explorer para asegurarte de que los datos se rellenan correctamente en tu dashboard.

## Datos recopilados

### Logs

La integración de Bitdefender recopila y envía logs de Bitdefender a Datadog.

### Métricas

La integración de Bitdefender no incluye métricas.

### Eventos

La integración de Bitdefender no incluye eventos.

## Soporte

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).
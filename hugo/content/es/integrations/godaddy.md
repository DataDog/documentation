---
app_id: godaddy
categories:
- métricas
custom_kind: integración
description: Obtén información y monitoriza los certificados SSL de GoDaddy.
integration_version: 1.0.0
media:
- caption: Información general de GoDaddy
  image_url: images/godaddy_1.png
  media_type: imagen
- caption: Información general de GoDaddy
  image_url: images/godaddy_2.png
  media_type: imagen
title: GoDaddy
---
## Información general

[GoDaddy](https://www.godaddy.com/en-in) es una empresa de alojamiento web y registro de dominios que ayuda a particulares y empresas a establecer su presencia en Internet. Una de sus principales ofertas son los servicios de certificados SSL. GoDaddy ofrece varios tipos de certificados SSL, como SSL estándar para proteger un sitio, SSL comodín para proteger varios subdominios y soluciones avanzadas para sitios de comercio electrónico que requieren mayor seguridad.

La integración de GoDaddy recopila métricas de los certificados SSL y sus dominios, dirigiéndolos a Datadog para su análisis. Esta integración proporciona puntos de datos como el número total de certificados, certificados emitidos, certificados caducados, certificados revocados y dominios asociados a cada certificado. También incluye métricas específicas para los certificados próximos a caducar. Se puede acceder a todas estas métricas a través de dashboards y monitores.

## Configuración

### Generar credenciales de API en GoDaddy

1. Ve al [Portal para desarrolladores de GoDaddy](https://developer.godaddy.com/).
1. Inicia sesión con tu cuenta de GoDaddy.
1. Selecciona "API Keys" (Claves de API).
1. Selecciona "Create New API Key" (Crear nueva clave de API).
1. Proporciona un nombre para tu API.
1. Selecciona "Production" (Producción) en Environment (Entorno).
1. Haz clic en "Next" (Siguiente). Tu clave de API ya está creada.
1. Haz clic en "Got It" (Entendido).

### Encuentra tu número de cliente de GoDaddy

1. Ve a tu [page (página) de inicio de sesión y PIN](https://sso.godaddy.com/security). Es posible que se te pida que inicies sesión.
1. En **Login Info** (Información de inicio de sesión), encuentra tu **Customer number** (Número de cliente) (también conocido como tu **ID de comprador**).

### Conecta tu cuenta de GoDaddy a Datadog

1. Añade tu clave de API, clave secreta y número de cliente

| Parámetros                               | Descripción                                                  |
| ---------------------------------------- | ------------------------------------------------------------ |
| Clave de API de GoDaddy                          | La clave de API de tu cuenta de GoDaddy                          |
| Clave secreta de GoDaddy                       | El secreto de API de tu cuenta de GoDaddy                       |
| Número de cliente de GoDaddy (o ID de comprador)  | El número de cliente (ID de comprador) de tu cuenta de GoDaddy      |

2. Haz clic en el botón Save (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración de GoDaddy no incluye ningún log.

### Métricas

La integración de GoDaddy recopila y reenvía los certificados y sus métricas de dominios a Datadog.

| | |
| --- | --- |
| **godaddy.certificate.canceled_certificates** <br>(count) | El número total de certificados anulados|
| **godaddy.certificate.certificate_expiration_days** <br>(count) | Número de días de caducidad por certificado<br>_Mostrado como día_. |
| **godaddy.certificate.certificate_status** <br>(count) | Contiene el certificado y su estado actual|
| **godaddy.certificate.denied_certificates** <br>(count) | Número total de certificados denegados|
| **godaddy.certificate.domain_status** <br>(count) | Contiene el dominio y su estado actual por certificado|
| **godaddy.certificate.domains_count** <br>(count) | Número total de dominios por certificado|
| **godaddy.certificate.expired_certificates** <br>(count) | Número total de certificados caducados|
| **godaddy.certificate.issued_certificates** <br>(count) | Número total de certificados expedidos|
| **godaddy.certificate.pending_issuance_certificates** <br>(count) | El número total de certificados expedidos pendientes|
| **godaddy.certificate.pending_rekey_certificates** <br>(count) | El número total de certificados de repetición de clave pendientes|
| **godaddy.certificate.pending_revocation_certificates** <br>(count) | Número total de certificados de revocación pendientes|
| **godaddy.certificate.revoked_certificates** <br>(count) | Número total de certificados revocados|
| **godaddy.certificate.total_certificates** <br>(count) | El número total de certificados|
| **godaddy.certificate.unused_certificates** <br>(count) | El número total de certificados no utilizados|

### Eventos

La integración de GoDaddy no incluye ningún evento.

## Soporte

Para obtener más ayuda, ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).
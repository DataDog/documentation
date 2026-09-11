---
app_id: confluence
categories:
- colaboración
custom_kind: integración
description: Integrar Confluence con Datadog
integration_version: 1.0.0
media: []
title: Confluence
---
## Información general

{{< site-region region="gov" >}}
**La integración de Confluence Cloud no es compatible con este sitio de Datadog ({{< region-param key="dd_site_name" >}})**.
{{< /site-region >}}

Confluence es un espacio de trabajo en equipo donde confluyen el conocimiento y la colaboración.
Permite a los equipos crear, compartir y colaborar en contenido en un solo lugar.
La integración de Datadog para Confluence te permite:

- Crear un análisis retrospectivo en Confluence desde la aplicación de incidentes
- Proporcionar datos de la página de Confluence a Bits AI

Conecta Datadog a Confluence utilizando nuestra aplicación de conexión en el Atlassian Marketplace.

## Configuración

### Instalación

1. Inicia sesión en tu cuenta de Confluence Cloud y navega hasta Atlassian Marketplace.
1. Busca la aplicación "Datadog for Confluence Cloud" y selecciona la versión correspondiente a tu sitio de Datadog.
1. Una vez instalado, ve al menú de la aplicación y haz clic en el botón "Configure" (Configurar).
1. Genera un código de un solo uso.
1. Navega al [cuadro de integración de Datadog Confluence](https://app.datadoghq.com/integrations/confluence) en tu cuenta de Datadog.
1. Haz clic en **Add Account** (Añadir cuenta).
1. Copia el código generado y pégalo en el cuadro de texto Código único.
1. Haz clic en **Connect** (Conectar) para vincular tus cuentas de Datadog y Confluence Cloud.

### Configuración

Para configurar tu plantilla de análisis retrospectivo en la aplicación de incidentes:

1. Ve a la aplicación de incidentes en Datadog.
1. Ve a **Settings > Postmortem Templates (under any incident type)** (Configuración > Plantillas de análisis retrospectivo (para cualquier tipo de incidente)).
1. Crea una nueva plantilla o modifica una existente.
1. En el menú desplegable **Save Location** (Guardar ubicación), selecciona Confluence y, a continuación, configura el espacio.
1. Tu plantilla se utilizará cuando se creen análisis retrospectivos a partir de incidentes.

Para activar el rastreo de cuentas en Bits AI:

1. Navega hasta el cuadro de integración de Confluence en tu cuenta de Datadog.
1. Haz clic en el icono de engranaje de la cuenta que deseas actualizar y selecciona **Edit** (Editar).
1. Selecciona la casilla **Enable account crawling** (Habilitar rastreo de cuentas).
1. Haz clic en **Save** (Guardar).

## Rastreo de cuentas

Después de conectar tu cuenta de Datadog a tu cuenta de Confluence Cloud, puedes habilitar el rastreo de cuentas en la cuenta de Confluence Cloud. Esto permite que la integración de Confluence Datadog lea cualquier página de Confluence accesible para el usuario que instaló la aplicación de Atlassian Marketplace. La integración almacena una copia de la información textual de la página en los servidores de Datadog para que se pueda hacer referencia a ella en los resultados de las consultas de Bits AI.

La integración borra los datos guardados de la página de Confluence cuando detecta que se cumple alguna de las siguientes condiciones:

- La página ya no existe en tu cuenta de Confluence Cloud.
- El usuario que instaló la aplicación de Atlassian Marketplace pierde el acceso a esa página.
- El rastreo de cuentas está desactivado.
- Se desinstala la aplicación de Atlassian Marketplace.

## Tratamiento y conservación de datos

1. **Acceso a metadatos**: la integración de Datadog Confluence puede recibir campos de metadatos de Confluence que incluyan IIP, como el campo de propietario o el historial de revisiones, cuando descarga datos de Confluence en nombre del cliente. Estos metadatos no se almacenan de forma persistente.
1. **Sincronización de datos**: Datadog mantiene su copia de una página de Confluence sincronizada con la versión del cliente. Si un cliente elimina datos personales de una página de Confluence, esos datos también se eliminan de la copia de Datadog. Datadog no conserva versiones anteriores de una página de Confluence ni mantiene deltas entre versiones.
1. **Eliminación de datos al desinstalar**: si un cliente desinstala la integración de Datadog Confluence o finaliza su relación con Datadog, se eliminan todos los datos de Confluence almacenados localmente. Esto se aplica incluso si la cuenta de Confluence utilizada para la integración de Datadog sigue teniendo acceso a la cuenta de Confluence Cloud.
1. **Almacenamiento de datos específico de la región**: los datos de Confluence recuperados por la integración se almacenan únicamente en la región de Datadog en la que se encuentra la cuenta del cliente. No se sincronizan con otras regiones de Datadog.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).
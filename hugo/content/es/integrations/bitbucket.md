---
categories:
- Source Control
- Collaboration
- issue tracking
custom_kind: integración
dependencies: []
description: Conoce qué confirmaciones y solicitudes de extracción afectan el rendimiento
  de tus servicios.
doc_link: https://docs.datadoghq.com/integrations/bitbucket/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/understand-code-changes-impact-system-performance-bitbucket-datadog/
  tag: Blog
  text: 'Bitbucket + Datadog: conoce cómo los cambios de código afectan tu infraestructura'
git_integration_title: bitbucket
has_logo: true
integration_id: bitbucket
integration_title: Bitbucket
integration_version: ''
is_public: true
manifest_version: '1.0'
name: bitbucket
public_title: Integración de Bitbucket con Datadog
short_description: Conoce qué confirmaciones y solicitudes de extracción afectan el
  rendimiento de tus servicios.
team: web-integrations
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
{{< img src="integrations/bitbucket/integrations-bitbucket.mp4" alt="integrations bitbucket" video="true" >}}

## Información general

Captura eventos de confirmaciones y solicitudes de extracción directamente desde Bitbucket Cloud o Server para:

- Hacer un seguimiento de los cambios de código en tiempo real
- Añadir marcadores de cambio de código en todos tus dashboards
- Discutir los cambios de código con tu equipo

Una vez configurada la integración, los elementos que selecciones (confirmaciones o solicitudes de extracción) se completarán en su flujo de eventos de Datadog.

**Ejemplos**:

- Cuando se realizan confirmaciones.
- Cuando se crea un PR.
- Cuando se hace/elimina un comentario en un PR.

## Configuración

### Instalación

Consulta la documentación de Bitbucket para [gestionar webhooks][1] para cualquier comportamiento de Bitbucket que desees rastrear en Datadog. Establece la URL del webhook en:

```text
https://app.datadoghq.com/intake/webhook/bitbucket?api_key=<YOUR_DATADOG_API_KEY>
```

Consulta la documentación de Bitbucket para [gestionar direcciones IP][2]; asegúrate de tener los rangos de IP correctos habilitados para las conexiones salientes, de modo que los eventos se reciban como se espera.

### Configuración

La [integración de Bitbucket][3] se configura a través del cuadro de integración.

1. Ingresa el nombre completo de cada repositorio que deseas monitorizar. Si la URL de tu repositorio es `https://bitbucket.org/groupname/reponame`, ingresa `groupname/reponame` en el cuadro de texto **Repository**.
2. Selecciona el tipo de eventos que deseas enviar a Datadog:

    - Bitbucket Cloud: elige de la lista completa de activadores (confirmaciones, solicitudes de extracción o problemas).
    - Bitbucket Server: selecciona confirmaciones o solicitudes de extracción.

3. Haz clic en **Update Configuration**.

### Validación

Cada entrada en el cuadro de integración se valida al introducirla.

## Caso práctico

Superpone eventos de Bitbucket en los gráficos de tu dashboard escribiendo `sources:bitbucket` en la barra de búsqueda superior izquierda. Observa el GIF de ejemplo en la parte superior de esta página.

## Datos recopilados

### Métricas

La integración Bitbucket no incluye métricas.

### Eventos

Los eventos de Bitbucket, incluidas las confirmaciones y las solicitudes de extracción tanto de Bitbucket Cloud como de Server, se reenvían a Datadog.

### Checks de servicios

La integración Bitbucket no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html
[2]: https://support.atlassian.com/organization-administration/docs/ip-addresses-and-domains-for-atlassian-cloud-products/
[3]: https://app.datadoghq.com/integrations/bitbucket
[4]: https://docs.datadoghq.com/es/help/
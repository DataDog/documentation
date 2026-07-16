---
"app_id": "statuspage"
"app_uuid": "04411bc4-4af1-482e-b05d-eeec3a40c464"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": true
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "135"
    "source_type_name": "Statuspage"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "incidents"
- "issue tracking"
- "notifications"
"custom_kind": "integración"
"dependencies": []
"display_on_public_website": verdadero
"draft": falso
"git_integration_title": "statuspage"
"integration_id": "statuspage"
"integration_title": "Statuspage"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "statuspage"
"public_title": "Statuspage"
"short_description": "Statuspage.io ayuda a las empresas a configurar páginas de estado con métricas públicas y actualizaciones automáticas para los clientes"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Incidents"
  - "Category::Issue Tracking"
  - "Category::Notifications"
  - "Offering::Integration"
  "configuration": "README.md#Configuración"
  "description": "Statuspage.io ayuda a las empresas a configurar páginas de estado con métricas públicas y actualizaciones automáticas para los clientes"
  "media": []
  "overview": "README.md#Información general"
  "support": "README.md#Soporte"
  "title": "Statuspage"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

[Atlassian Statuspage][1] es una herramienta de gestión de estados e incidentes que te permite ver y crear incidentes notificados por tus servicios de terceros en Datadog.

Aprovecha la integración con Statuspage para:

- Crear y actualizar un incidente de Statuspage y vincularlo a un incidente de Datadog.
- Consultar el incidente de Statuspage que corresponde a un incidente de Datadog.
- Correlacionar los incidentes con tus métricas y eventos propios.

## Configuración

### Instalación

#### Conectar tu cuenta de Statuspage

{{% site-region region="gov" %}}

<div class="alert alert-danger">
La integración de la Gestión de incidentes no es compatible con el sitio {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

Conecta tu cuenta de Statuspage para crear y actualizar incidentes de Statuspage a partir de la Gestión de incidentes.

![Status Incident Create Modal][2]

1. Inicia sesión en tu [cuenta][3].
2. Haz clic en tu avatar en la parte superior derecha de tu pantalla para acceder al menú de usuario.
3. Haz clic en API info (Información de la API).
4. En `Organization API keys`, crea o copia una clave de API existente.
5. Introduce tu clave de API en el campo `API key` del [cuadro de la integración][4].

#### Correlacionar los incidentes con tus métricas y eventos propios

Puedes correlacionar eventos Statuspage con tus métricas y eventos propios para su análisis y configurar monitores para recibir notificaciones sobre todo aquello que pueda tener un impacto en tu entorno. Esta parte de la integración no requiere que tengas tu propia cuenta de Statuspage.

En la sección **URL de Statuspage** del [cuadro de la integración][4], introduce la URL de Statuspage del servicio que quieres monitorizar. Introduce cualquier etiqueta (tag) personalizada que quieras asociar a la página.

## Datos recopilados

### Métricas

La integración Statuspage no incluye métricas.

### Eventos

La integración Statuspage extrae eventos de Datadog de tus páginas de estado configuradas, permitiéndote correlacionar estos eventos con tus métricas o [enviar alertas basadas en estos eventos][5].

### Configuración

Puedes configurar esta integración utilizando URL tanto `http://` como `https://`. Sin embargo, sólo las URL de `https://` con TLS validado cumplen los requisitos de conformidad. Aunque las URL de `http://` funcionarán correctamente, no cumplen las normas de conformidad.

Para los entornos que deben ser conformes, asegúrate de utilizar URL `https://` en lugar de `http://`.

### Checks de servicio

La integración Statuspage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [soporte técnico de Datadog][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.atlassian.com/software/statuspage
[2]: images/integrations_statuspage_incident_modal.png
[3]: https://manage.statuspage.io/login
[4]: https://app.datadoghq.com/integrations/statuspage
[5]: https://docs.datadoghq.com/monitors/monitor_types/event/
[6]: https://docs.datadoghq.com/help/


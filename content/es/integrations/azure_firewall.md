---
categories:
- azure
- nube
- red
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure Firewall.
doc_link: https://docs.datadoghq.com/integrations/azure_firewall/
draft: false
git_integration_title: azure_firewall
has_logo: true
integration_id: ''
integration_title: Microsoft Azure Firewall
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_firewall
public_title: Integración de Datadog y Microsoft Azure Firewall
short_description: Rastrea las métricas clave de Azure Firewall.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure Firewall es una seguridad de red nativa de la nube que se utiliza para proteger tus recursos de Azure Virtual Network.

Utiliza la integración de Azure con Datadog para recopilar métricas de Firewall.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Microsoft Azure][1]. No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_firewall" >}}


### Eventos

La integración Azure Firewall no incluye eventos.

### Checks de servicio

La integración de Azure Firewall no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_firewall/azure_firewall_metadata.csv
[3]: https://docs.datadoghq.com/es/help/

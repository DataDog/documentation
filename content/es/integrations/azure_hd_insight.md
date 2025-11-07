---
aliases:
- /es/integrations/azure_hdinsight
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas principales de Azure HDInsight.
doc_link: https://docs.datadoghq.com/integrations/azure_hd_insight/
draft: false
git_integration_title: azure_hd_insight
has_logo: true
integration_id: azure-hdinsight
integration_title: Microsoft Azure HDInsight
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_hd_insight
public_title: Integración de Datadog y Microsoft Azure HDInsight
short_description: Rastrea las métricas principales de Azure HDInsight.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
## Información general

Azure HDInsight es un servicio en la nube que permite procesar de forma fácil, rápida y rentable grandes cantidades de datos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure HDInsight.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{ get-metrics-from-git "azure-hdinsight" }}


### Eventos

La integración Azure HDInsight no incluye ningún evento.

### Checks de servicio

La integración Azure HDInsight no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_hd_insight/azure_hd_insight_metadata.csv
[3]: https://docs.datadoghq.com/es/help/
---
categories:
- nube
- azure
custom_kind: integración
dependencies: []
description: Rastrea las métricas clave de Azure SQL Managed Instance.
doc_link: https://docs.datadoghq.com/integrations/azure_sql_managed_instance/
draft: false
git_integration_title: azure_sql_managed_instance
has_logo: true
integration_id: azure-sql-managed-instance
integration_title: Microsoft Azure SQL Managed Instance
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_sql_managed_instance
public_title: Integración de Datadog y Microsoft Azure SQL Managed Instance
short_description: Rastrea las métricas clave de Azure SQL Managed Instance.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Azure SQL Managed Instance es un servicio de base de datos en la nube escalable que combina la más amplia compatibilidad del motor SQL Server con los beneficios de una plataforma totalmente gestionada como servicio.

Utiliza la integración de Azure con Datadog para recopilar métricas de SQL Managed Instance.

## Configuración
### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados
### Métricas
{{< get-metrics-from-git "azure-sql-managed-instance" >}}


### Eventos
La integración Azure SQL Managed Instance no incluye eventos.

### Checks de servicios
La integración Azure SQL Managed Instance no incluye checks de servicios.

## Resolución de problemas
¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Leer más

- [https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/][4]

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_sql_managed_instance/azure_sql_managed_instance_metadata.csv
[3]: https://docs.datadoghq.com/es/help/
[4]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
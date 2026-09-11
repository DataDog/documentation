---
description: Aprende a definir las condiciónes por las cuales excluir eventos específicos
  de ser procesados por CI Visibility.
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: Blog
  text: Agiliza tus tests de CI con Datadog Test Impact Analysis
- link: /continuous_integration/pipelines
  tag: Documentación
  text: Más información sobre Pipeline Visibility
title: Establecer Ingestion Control para CI Visibility
---

## Información general

Los filtros de exclusión proporcionan un control detallado sobre tu presupuesto de CI Visibility al permitirte definir una o más condiciones por las cuales excluir eventos específicos de ser procesados por Datadog.

### Compatibilidad
Hay filtros disponibles para Pipeline Visibility.

## Añadir un filtro de exclusión
Los filtros de exclusión no son necesarios para configurar Pipeline Visibility. Por defecto, se ingieren y procesan todos los datos.

Para crear filtros para tu organización, tu cuenta de usuario debe tener el [permiso][1] `ci_ingestion_control_write`.

1. En Datadog, navega a **CI** > **Settings** > **Ingestion Settings** (CI > Configuración > Configuración de ingesta).
2. Selecciona **Add an Exclusion Filter** (Añadir un filtro de exclusión).

{{< img src="ci/add-ci-exclusion-filter.png" alt="Botón Añadir un filtro de exclusión" style="width:90%;">}}

3. Asigna un nombre al filtro y define una consulta. Una vez definida la consulta, la vista previa sobre los campos de entrada muestra los datos ingeridos que coinciden con la consulta. Una vez creado y activado el filtro, eventos, como los que se muestran en la vista previa, quedan excluidos de la ingesta.

{{< img src="ci/exclusion-filter-pipeline.png" alt="Crear un filtro de exclusión para un pipeline específico" style="width:100%;">}}

Una vez que hayas añadido un filtro, se mostrará cada fila de esta página:
- **Filter name** (Nombre del filtro): el nombre del filtro
- **Exclusion query** (Consulta de exclusión): la consulta que se definió para ese filtro.
- Activa/desactiva el filtro](#enabling-and-disabling-filters): los filtros recién creados se activan por defecto

Todos los tramos (spans) que coincidan con uno o varios filtros no son ingeridos ni procesados por Datadog.

## Definición de consultas para un filtro de exclusión
Los filtros se definen de forma flexible a través de una interfaz de editor de consultas. Utiliza [etiquetas][3] y atributos para crear tus filtros.

### Ejemplos de filtros de exclusión
A continuación, encontrarás ejemplos de cómo los filtros de exclusión pueden ayudar a optimizar el uso y la facturación de CI Visibility.

#### Filtrar por dirección de correo electrónico del autor de git
Puedes excluir uno o más commiters específicos de ser monitorizados definiendo un filtro con la dirección de correo electrónico del autor git (`@git.commit.author.email`). La siguiente captura de pantalla muestra un filtro en el que todos los tramos asociados con commits de este correo electrónico de autor git en particular no se ingieren.

{{< img src="ci/exclusion-filter-email.png" alt="Filtro de exclusión del control de ingesta para dirección de correo electrónico" style="width:100%;">}}

#### Filtrar por dominio de correo electrónico del autor de git
También puedes excluir a muchos committers a la vez por dominio de correo electrónico (por ejemplo, puede que desees excluir a colaboradores externos que realicen commits en repositorios monitorizados). La siguiente captura de pantalla muestra un filtro en el que todos los tramos (spans) asociados con commits de dominios de direcciones de correo electrónico que no coinciden con el de la consulta no se ingieren.

{{< img src="ci/exclusion-filter-domain.png" alt="Filtro de exclusión del control de ingesta para dominio de correo electrónico" style="width:100%;">}}

#### Filtrar por repositorio
Puedes excluir repositorios específicos de ser monitorizados (por ejemplo, un repositorio de test interno) definiendo un filtro con el nombre del repositorio (`@git.repository.name`) o ID (`@git.repository.id`). La siguiente captura de pantalla muestra un filtro en el que todos los tramos asociados con commits en este repositorio no son ingeridos.

{{< img src="ci/exclusion-filter-repo.png" alt="Filtro de exclusión de control de ingesta para repositorio" style="width:100%;">}}

## Actualización de los filtros de exclusión
Los filtros de exclusión pueden ser activados/desactivados, actualizados y eliminados por usuarios con [permisos][4] `ci_ingestion_control_write`. Se aplican a nivel de organización. Puede ver información detallada sobre quién modificó los filtros de exclusión utilizando [Audit Trail][5] de Datadog.

### Activar y desactivar filtros
Un conmutador a la derecha de cada filtro permite activarlo y desactivarlo en cualquier momento. Los filtros recién creados se activan por defecto.

**Nota**: En la mayoría de los casos, los filtros se aplican a los datos ingeridos en menos de 1 segundo (p95) desde su activación. Sin embargo, es posible que un filtro activado tarde varios minutos en surtir efecto.

### Actualización de filtros
Puedes cambiar el nombre de un filtro o modificar la consulta de un filtro de exclusión en cualquier momento dentro de la página **Ingestion Settings** (Configuración de la ingesta).

{{< img src="ci/exclusion-filter-edit.png" alt="Botón Filtro de exclusión de la edición del control de ingesta" style="width:90%;">}}

### Eliminar filtros
Puedes eliminar un filtro haciendo clic en el icono de eliminación.

{{< img src="ci/exclusion-filter-delete.png" alt="Botón Filtro de exclusión de la eliminación del control de ingesta" style="width:90%;">}}

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/#ci-visibility
[3]: /es/getting_started/tagging/
[4]: /es/account_management/rbac/permissions/#ci-visibility
[5]: /es/account_management/audit_trail/events/#ci-visibility-events
[6]: /es/monitors/types/apm/
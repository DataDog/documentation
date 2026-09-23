---
description: Utilice Data Access Control para restringir un proyecto de Agent Observability,
  y todo lo que contiene, a equipos o roles específicos.
further_reading:
- link: /account_management/rbac/data_access/
  tag: Documentación
  text: Data Access Control
- link: /llm_observability/data_governance/
  tag: Documentación
  text: Gobernanza de datos
- link: /account_management/rbac/permissions/#access-management
  tag: Documentación
  text: Permisos de gestión de acceso
title: Data Access Control en Agent Observability
---
## Descripción general {#overview}

Los proyectos de Agent Observability pueden contener material confidencial, incluidos prompts de conjuntos de datos y resultados esperados, traces de ejecuciones de experimentos, resultados de evaluación y traces bajo revisión en colas de anotación. [Data Access Control][1] le permite restringir un proyecto para que solo los equipos o roles que usted especifique puedan verlo.

Cuando un proyecto está restringido, los usuarios fuera de los equipos o roles a los que usted otorgó acceso no pueden:

- Ver el proyecto, o sus experimentos, conjuntos de datos y colas de anotación, en cualquier vista de lista o resultado de búsqueda
- Leer los registros del conjunto de datos del proyecto, incluidos los datos de entrada y los resultados esperados
- Leer las métricas de evaluación producidas por las ejecuciones de experimentos del proyecto
- Leer los tramos producidos por esas ejecuciones, excepto para los experimentos ejecutados a través del SDK (consulte [Limitaciones](#limitations))
- Leer las colas de anotación del proyecto, incluidos los traces bajo revisión y las etiquetas aplicadas a ellos
- Crear, modificar o eliminar cualquier elemento dentro del proyecto, incluso con un ID que hayan obtenido anteriormente

Los usuarios fuera de esos equipos o roles reciben una respuesta de *no encontrado* cuando abren un enlace directo al proyecto o a cualquier elemento dentro de él.

Las restricciones se aplican en la interfaz de usuario de Datadog y en la API. Las claves de aplicación están sujetas a las mismas restricciones que el usuario que las posee.

## Requisitos previos {#prerequisites}

- Data Access Control está configurado para su organización. Consulte [Data Access Control][1].
- Usted tiene el rol de Datadog Admin, u otro rol que tenga el permiso [`user_access_manage`][2].
- El proyecto que desea restringir ya existe en Agent Observability.

## Restrinja un proyecto en la interfaz de usuario {#restrict-a-project-in-the-ui}

<div class="alert alert-info">Datadog está implementando una página de Access Control rediseñada. Su organización tiene la página <strong>Data Access Controls</strong> o la página rediseñada <strong>Access Control</strong>. El enlace en el paso 1 lo lleva a la que usted tenga, y ambas configuran la misma restricción.</div>

1. Navegue a [Organization Settings > Data Access Controls][3].
2. Cree una restricción que cubra un subconjunto de datos:
   - En la página Data Access Controls, haga clic en **New Restricted Dataset**.
   - En la página Access Control, haga clic en **New Policy > Sensitive Data Partition**.
3. Asígnele un nombre que identifique el proyecto que protege, por ejemplo `Experiments - Fraud Detection`.
4. Agregue un filtro en el producto **Agent Observability**, luego especifique el proyecto:
   - En la página Access Control, seleccione el proyecto de la lista de valores. La lista tiene dos grupos: sus proyectos y las aplicaciones que envían trazas a Agent Observability. Seleccione del grupo de proyectos.
       
       <div class="alert alert-warning"><ul><li>Escribir el nombre del proyecto, incluso parcialmente o con un error tipográfico, no coincide con ningún dato de Experiments. El proyecto permanece visible para todos y la restricción parece estar funcionando.</li><li>Los proyectos que ya están cubiertos por otro Restricted Dataset no aparecen en la lista. Un proyecto puede pertenecer a un solo Restricted Dataset a la vez.</li></ul></div>
   
   - En la página Data Access Controls, ingrese el ID del proyecto como el valor `ml_app`. Consulte [Encontrar el ID de un proyecto](#find-a-projects-id).

5. Otorgue acceso a los equipos o roles que deben mantener el acceso al proyecto. Se puede asignar un máximo de 50 equipos o roles a un Restricted Dataset.
6. Guarde el Restricted Dataset.

**Nota**: La clave de filtro puede estar bloqueada. Agent Observability utiliza una clave de etiqueta, `ml_app`, tanto para aplicaciones como para proyectos, y Data Access Control permite una clave de etiqueta por tipo de telemetría. Si su organización ya tiene un Agent Observability Restricted Dataset, los nuevos reutilizan la misma clave.

La restricción entra en vigor tan pronto como se guarda. El proyecto y sus experimentos, conjuntos de datos, registros de conjuntos de datos y colas de anotación se ocultan inmediatamente, independientemente de cuándo se crearon. Los tramos y las métricas de evaluación están sujetos a las excepciones en [Limitaciones](#limitations).

## Restrinja un proyecto a través de la API {#restrict-a-project-through-the-api}

También puede crear una restricción con el Data Access Control [Datasets API][5]. El filtro de producto `ml_obs` toma el ID del proyecto como su valor `ml_app`:

```json
{
  "data": {
    "type": "dataset",
    "attributes": {
      "name": "Experiments - Fraud Detection",
      "product_filters": [
        {
          "product": "ml_obs",
          "filters": ["ml_app:3547f4ac-3af4-4733-9a70-8fe596e1e76d"]
        }
      ],
      "principals": ["team:f771276e-0847-4c24-a277-6744f8520bb4"]
    }
  }
}
```

## Colas de anotación {#annotation-queues}

Una cola de anotación que pertenece a un proyecto hereda la restricción de ese proyecto. Restringir un proyecto oculta sus colas, los seguimientos que contienen para revisión, las etiquetas que aplicaron los revisores y el esquema de etiquetas de cada cola. Los usuarios fuera de los equipos o roles otorgados no pueden anotar, editar ni eliminar una cola, y no pueden exportar sus interacciones anotadas a un conjunto de datos o a CSV.

La [configuración de acceso][7] propia de una cola es independiente: las restricciones de revisor y asignado controlan quién puede anotar una cola que un usuario ya puede ver. El Data Access Control controla quién puede ver la cola en absoluto.

Cada cola de anotación que cree debe pertenecer a un proyecto. Las colas creadas antes de que este requisito entrara en vigor pueden no tener proyecto. Consulte [Limitaciones](#limitations).

## Encuentre el ID de un proyecto {#find-a-projects-id}

La página de Data Access Controls y la Datasets API toman un ID de proyecto como el valor `ml_app`, no un nombre de proyecto. Tome el ID del proyecto de la URL del proyecto en Experiments, o del campo `id` devuelto por la [Experiments API][4] al listar proyectos.

## Otorgar y revocar acceso {#grant-and-revoke-access}

Otorgue acceso editando los equipos o roles en el Restricted Dataset. Eliminar un equipo o rol tiene efecto inmediato. Eliminar el Restricted Dataset elimina la restricción por completo, y el proyecto vuelve a ser visible para todos en la organización con acceso de lectura a Agent Observability.

Ser administrador no lo exime de una restricción. El permiso `user_access_manage` le permite crear y editar Restricted Datasets, pero el acceso a un proyecto restringido sigue solo la membresía de equipo y rol. Un administrador que no está en un equipo o rol otorgado ve el proyecto como no encontrado, exactamente como lo haría cualquier otro usuario.

## Limitaciones {#limitations}

- **Los tramos de una ejecución de experimento a través del SDK no están restringidos por un Restricted Dataset en el proyecto.** Estos tramos se atribuyen a la aplicación que ejecutó el experimento, no al proyecto. Un Restricted Dataset en el proyecto oculta el proyecto y sus conjuntos de datos, registros de conjuntos de datos y métricas de evaluación, pero no las entradas y salidas en esos tramos. Para restringir esos tramos también, agregue un segundo filtro para el valor `ml_app` de la aplicación al mismo Restricted Dataset.
- **Los tramos y las métricas de evaluación que no fueron etiquetados con el proyecto en la ingesta no están restringidos.** El proyecto se adjunta a estos eventos como una etiqueta en el momento de la ingesta, y los eventos pasados no se vuelven a etiquetar. Los eventos que llevan la etiqueta se ocultan tan pronto como se guarda la restricción. Las vistas de lista, los metadatos y los registros de conjuntos de datos se ocultan independientemente de cuándo fueron creados.
- **Los prompts administrados no son compatibles** con el Data Access Control. Consulte [Data Access Control][1] para obtener la lista completa de telemetría admitida.
- **Una cola de anotación que no pertenece a un proyecto es visible para todos** con acceso de lectura a Agent Observability, y ningún Restricted Dataset puede ocultarla. Mueva la cola a un proyecto, o vuelva a crearla en uno, para someterla a una restricción.
- **Un proyecto sin un Restricted Dataset es visible para todos** con acceso de lectura a Agent Observability. Data Access Control es permisivo de forma predeterminada, a menos que su organización haya habilitado el [Modo estricto][6] para Agent Observability. Un Restricted Dataset cuyo valor no coincide con ningún proyecto no restringe nada de forma silenciosa. Confirme cada nueva restricción con un usuario fuera de los equipos o roles otorgados.
- **En el [Modo estricto][6], un proyecto solo es visible si un conjunto de datos restringido nombra su ID de proyecto.** Un valor de `ml_app` que es un nombre de aplicación no otorga nada en Experimentos, por lo que el proyecto permanece oculto para todos, incluidos los equipos y roles en sus otros conjuntos de datos restringidos. Consulte [Encontrar el ID de un proyecto](#find-a-projects-id).

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/data_access/
[2]: /es/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/data-access-controls/
[4]: /es/llm_observability/improve/experiments/api/
[5]: /es/api/latest/datasets/
[6]: /es/account_management/rbac/data_access/#strict-mode
[7]: /es/llm_observability/investigate/annotation_queues/#managing-queue-access
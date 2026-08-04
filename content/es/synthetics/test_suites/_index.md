---
description: Organiza los tests de Synthetic Monitoring en grupos lógicos.
further_reading:
- link: /synthetics/
  tag: Documentación
  text: Más información sobre la monitorización Synthetic
- link: /monitors/types/synthetic_monitoring/
  tag: Documentación
  text: Configurar los monitores de tests de Synthetic Monitoring
- link: /synthetics/troubleshooting/
  tag: Documentación
  text: Solución de problemas de Synthetic Monitoring
- link: https://www.datadoghq.com/blog/test-suites/
  tag: Blog
  text: Obtén información organizada y práctica de entornos de test complejos
title: Conjuntos de tests
---


## Información general

Los conjuntos de test de Synthetic Monitoring te permiten organizar varios tests en una única colección para simplificar la gestión y la resolución de problemas. Agrupa tests por recorrido del usuario, entorno, ubicación, servicio, equipo o cualquier otra dimensión que se ajuste a tu proceso. Ve los resultados agregados, identifica los componentes que fallan y comprende el rendimiento de la aplicación a través de tests relacionados, todo desde una vista unificada. 

## Características principales

- **Visibilidad centralizada**: visualiza todos los tests de un conjunto y sus resultados en un solo lugar.
- **Gestión simplificada**: crea y ejecuta grupos de tests en lugar de gestionar cada test por separado.
- **Mantenimiento más sencillo**: identifica qué test necesita actualizaciones cuando se realicen cambios en la aplicación.

## Crear un conjunto de tests

Para crear un nuevo conjunto de tests:
1. En Datadog, navega hasta **Digital Experience** (Experiencia digital).
2. Haz clic en **New Test Suite** (Nuevo conjunto de tests).
3. Opcionalmente, navega hasta la página [Synthetic Monitoring tests][1] (Tests de Synthetic Monitoring), y haz clic en **+ New Suite** (+ Nuevo conjunto).

## Configuración del conjunto de tests

1. Introduce un nombre para tu conjunto (por ejemplo, `Checkout flow` o `API health checks`).
2. Haz clic en **Add Tests** (Añadir tests) para incluir los tests existentes de Synthetic Monitoring.
   Puedes:
   - **Search** (Buscar) por nombre o etiqueta.  
   - **Filter** (Filtrar) por tipo de test (como Navegador, API, Ubicación privada o Móvil).
   - **Select** (Seleccionar) uno o más tests para incluir.
3. Haz clic en **Add Selected Tests** (Añadir tests seleccionados) para confirmar.
4. Opcionalmente, elimina tests utilizando el icono **Remove Test from Suite** (Eliminar test del conjunto) situado junto a cada entrada.
5. Haz clic en **Save suite** (Guardar conjunto) cuando hayas terminado.

{{< img src="synthetics/test_suites/test_suite_creation.png" alt="Página de creación del Conjunto de tests de Synthetic Monitoring" style="width:80%;">}}

## Ver y gestionar

Después de crear tu conjunto, éste aparece en la pestaña **Suites** (Conjuntos) de la página [Tests de Synthetic Monitoring][1], o puedes acceder a conjuntos de tests desde **Digital Experience > Test Suites** (Experiencia Digital > Conjunto de tests). Haz clic en un conjunto de tests para ver lo siguiente:

- Un **resumen** de los resultados de test (éxitos, fracasos, omitidos).
- **Detalles de la ejecución**, como el horario, el entorno y el tipo de test.
- **Filtros** para refinar por ubicación, marco temporal o etiqueta.
- **Enlaces de detalles** a las ejecuciones individuales de cada test para una investigación más profunda.

Puedes ordenar o buscar dentro del conjunto para centrarte en los tests que fallan o que se han actualizado recientemente. Utiliza la opción **View All** (Ver todo) para visualizar el rendimiento agregado de todos los tests incluidos.

**Nota**: Las ejecuciones de test aparecen en el conjunto solo a partir de la fecha en que se añadió el test. Para ver resultados anteriores, consulta la página individual del test. Si cambias el nombre de un test, las ejecuciones anteriores siguen apareciendo con el nombre original. Se puede añadir un máximo de 300 tests por conjunto.

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Página de resumen del conjunto de tests de Synthetic Monitoring" style="width:100%;">}}

## Solucionar problemas

Si algunos tests no aparecen en un conjunto:

- Asegúrate de que los test están activos y no se han borrado.
- Confirma que tienes los permisos necesarios para ver esos tests.
- Actualiza los filtros o borra términos de búsqueda al añadir tests.

Si los resultados de la ejecución parecen incompletos:

- Verifica la frecuencia de ejecución del test y la actividad reciente.
- Comprueba si hay coincidencias de etiqueta o ubicación que podrían filtrar las ejecuciones.
- Vuelve a guardar el conjunto de tests para actualizar la asociación con sus tests.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
---
core_product:
- ci-cd
related_terms:
- regresión del rendimiento
short_definition: Una ejecución de test se marca como regresión cuando su duración
  es cinco veces la media y mayor que la duración máxima para el mismo test en la
  rama por defecto. Además, la ejecución del test debe tener una duración mínima de
  500 ms para que se considere una regresión.
title: regresión de test
---
En Datadog Test Optimization, una ejecución de test se marca como regresión cuando su duración es cinco veces la media y mayor que la duración máxima para el mismo test en la rama por defecto. Además, la ejecución del test debe tener una duración mínima de 500 ms para que se considere una regresión. Una ejecución de test de referencia (`@test.type:benchmark`) se marca como regresión cuando su duración es cinco veces la desviación estándar por encima de la media para el mismo test en la rama por defecto.

Las duraciones media y máxima de la rama por defecto se calculan a partir de los tests de la semana anterior. Para que el algoritmo considere una ejecución de test, debe haber un mínimo de 100 ejecuciones de test en la rama por defecto. Para las ejecuciones de test de referencia, el número mínimo de ejecuciones de test es 10.
Para más información sobre Test Optimization (optimización de tests), <a href="/tests/">consulta la documentación</a>.
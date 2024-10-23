---
core_product:
- ci-cd
related_terms:
- regresión del rendimiento
title: regresión de test
---
En Datadog CI Test Visibility, una ejecución de test se marca como una regresión cuando su duración es cinco veces la media y mayor que la duración máxima para el mismo test en la rama predeterminada. Además, la ejecución de test debe tener una duración mínima de 500 ms para que se considere una regresión. Una ejecución de test de referencia (`@test.type:benchmark`) se marca como una regresión cuando su duración es cinco veces la desviación estándar por encima de la media para el mismo test en la rama predeterminada.

Las duraciones media y máxima de la rama predeterminada se calculan en función de las ejecuciones de test de la semana pasada. Para que el algoritmo considere una ejecución de test, debe haber un mínimo de 100 ejecuciones de test en la rama predeterminada. Para ejecuciones de test de referencia, el número mínimo es 10.
Para obtener más información, <a href="/tests/search/#test-regressions">consulta la documentación</a>.
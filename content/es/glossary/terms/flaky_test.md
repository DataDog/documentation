---
core_product:
- ci-cd
short_definition: Una test defectuosa es una test que muestra tanto un estado de aprobación
  como de fallo en varias ejecuciones de la misma confirmación.
title: test defectuosa
---
Una test defectuosa es una test que muestra tanto un estado de aprobación como de fallo a través de múltiples ejecuciones de tests para la misma confirmación. Si confirmas un código y lo ejecutas a través de CI y una test falla y lo ejecutas a través de CI de nuevo y la test pasa, esa test no es fiable como prueba de código de calidad. Para obtener más información, <a href="/tests/flaky_test_management">consulta la documentación</a>.
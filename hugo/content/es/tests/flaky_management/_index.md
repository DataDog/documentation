---
description: Rastrea, clasifica y gestiona los tests de errores.
further_reading:
- link: /continuous_integration/tests/
  tag: Documentación
  text: Más información sobre Test Optimization
- link: /tests/flaky_tests/
  tag: Documentación
  text: Aprende a trabajar con tests de errores
- link: https://www.datadoghq.com/knowledge-center/flaky-tests/
  tag: Centro de conocimiento
  text: Información general de tests con errores
title: Gestión de tests con errores
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Test Optimization no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

## Información general

La página [Gestión de tests defectuosos][1] proporciona una vista centralizada para realizar un seguimiento, clasificar y remediar tests defectuosos en toda la organización. Puedes ver el estado de cada test junto con métricas de impacto clave como el número de fallos de pipeline, el tiempo de CI perdido y la tasa de fallos.

Desde esta interfaz, puedes actuar sobre los tests defectuosos para mitigar su impacto. Pon en cuarentena o desactiva los tests problemáticos para evitar que los fallos conocidos rompan las compilaciones, y crea casos e incidentes en Jira para realizar un seguimiento del trabajo realizado para solucionarlos.

{{< img src="tests/flaky_management.png" alt="Información general de la interfaz de usuario de gestión de tests defectuosos" style="width:100%;" >}}

## Cambiar el estado de un test defectuoso

Utiliza el menú desplegable de estado para cambiar cómo se gestiona un test defectuoso en tu pipeline CI. Esto puede ayudar a reducir el ruido de CI, manteniendo la trazabilidad y el control. Los estados disponibles son:

| Estado | Descripción |
| ----------- | ----------- |
| **Activo** | Se sabe que el test es defectuoso y se está ejecutando en CI. |
| **En cuarentena** | El test se mantiene ejecutándose en segundo plano, pero los fallos no afectan al estado de CI ni rompen los pipelines. Esto es útil para aislar los tests defectuosos sin bloquear las fusiones. |
| **Desactivado** El test se omite por completo en CI. Utilízalo cuando un test ya no sea relevante o necesite ser eliminado temporalmente del pipeline. |
| **Corregido** | El test ha pasado la prueba de forma consistente y ya no tiene fallos. Si es compatible, utiliza el [flujo de corrección](#confirm-fixes-for-flaky-tests) para confirmar una corrección y aplicar automáticamente este estado, en lugar de cambiarlo manualmente. |

<div class="alert alert-info">Las acciones de estado tienen requisitos de versión mínimos para la biblioteca de instrumentación de cada lenguaje de programación. Consulta <a href="#compatibility">Compatibilidad</a> para obtener más detalles.</div>

## Configura políticas para automatizar el ciclo de vida de los tests defectuosos

Configura políticas de tests defectuosos automatizadas para controlar cómo se gestionan los tests defectuosos en cada repositorio. Por ejemplo, un test con defectos en la rama preeterminada puede ser automáticamente puesto en cuarentena y luego desactivado si permanece sin corregir después de 30 días.

1. Haz clic en el botón **Policies* (Políticas) situado en la parte superior derecha de la página de gestión de tests defectuosos. También puedes ir a [**Políticas de tests defectuosos**][13] en los parámetros de entrega de software.
2. Busca y selecciona el repositorio que quieres configurar. Se abrirá el menú desplegable **Edit Policies** (Editar políticas).
    {{< img src="tests/flaky-policies-2.png" alt="Página Políticas de tests defectuosos con el menú Edit Policies (Editar políticas) abierto para configurar una política" style="width:100%;" >}}

3. Utiliza los conmutadores para activar acciones automatizadas específicas y utiliza reglas de automatización para personalizar aún más la forma en que los tests son colocados en cuarentena, se desactivan o se vuelven a intentar:

| Acción    | Descripción |
| ---- | ---- |
| **Cuarentena**     | Utiliza los conmutadores para permitir que los tests defectuosos se coloquen en cuarentena para este repositorio. Personaliza reglas de automatización basadas en: <li>Tiempo: Coloca en cuarentena un test si su estado es `Active` durante un número especificado de días. <li>Rama: Coloca en cuarentena un test `Active` si presenta defectos en una o más ramas especificadas.|
| **Desactivar**        | Utiliza los conmutadores para permitir que los tests defectuosos esté desactiven para este repositorio. Es posible que quieras hacer esto después de colocarlos en cuarentena o para proteger ramas específicas de potenciales defectos. Personaliza reglas de automatización basadas en: <li>Estado y hora: Desactiva un test si tiene un estado especificado durante un número especificado de días. <li>Rama: Desactiva un test `Active` o `Quarantined` si presenta defectos en una o más ramas especificadas. |
| **Intento de corregir** | Cuando intentes corregir un test defectuoso, vuelve a intentar automáticamente el test un número especificado de veces en el commit que contiene la corrección. |
| **Corregido**          | Si un test defectuoso deja de presentar defectos durante 30 días, pasa automáticamente al estado Corregido. Esta automatización es el comportamiento por defecto y no se puede personalizar. |

## Rastreo de la evolución de tests con errores

Rastrea la evolución del número de tests con errores con la métrica predefinida `test_optimization.test_management.flaky_tests`. La métrica se enriquece con las siguientes tags (etiquetas) para ayudarte a investigar los counts con más detalle.

- `repository_id`
- `branch`
- `flaky_status`
- `test_codeowners`
- `flaky_category`

La tag (etiqueta) `branch` sólo existe cuando el test tiene errores en la rama predeterminada del repositorio durante los últimos 30 días. Esto te ayuda a descartar tests que sólo han mostrado errores en ramas de funciones, ya que estas pueden no ser relevantes. Puedes configurar la rama predeterminada de tus repositorios en [Configuración del repositorio][2].

## Investigar un test con errores

Para obtener más información sobre un test específico con errores, utiliza estas opciones en el menú de acciones al final de cada fila:

- **Ver la última ejecución fallida de test **: Abre el panel lateral con los detalles de la última ejecución fallida de test.
- **Ver ejecuciones relacionadas de test **: Abre el [Explorer de test optimization (optimización de tests)][3] poblado con todas las ejecuciones recientes del test.

## Crea casos para los tests con errores

Para cualquier test con errores, puedes crear un case (incidencia) y utilizar [Case Management][4] para rastrear cualquier trabajo de corrección. Haz clic en el botón **Crear case (incidencia)** o utiliza el menú de acciones situado al final de la fila.

## Confirmar las correcciones de los tests con errores

Cuando se corrige un test con errores, el flujo de corrección de test optimization (optimización de tests) puede confirmar la corrección reintentando el test varias veces. Si tiene éxito, el estado del test se actualiza automáticamente a `Fixed`. Para activar el flujo de corrección:

1. En la página de test que estás corrigiendo, haz clic en **Link commit to Flaky test fix** (Vincular commit con la corrección del test defectuoso) en la interfaz de gestión de tests defectuosos.
1. Copia la clave única de test con errores que aparece (por ejemplo, `DD_ABC123`).
1. Incluye la clave del test en el título de tu confirmación Git o en el mensaje de la corrección (por ejemplo, `git commit -m "DD_ABC123"`).
1. Cuando Datadog detecta la clave del test en tu confirmación, activa automáticamente el flujo de corrección para ese test:
   - Reintenta 20 veces cualquier test que estés intentando corregir.
   - Ejecuta tests aunque estén marcados como `Disabled`.
   - Si se superan todos los reintentos, se actualiza el estado del test a `Fixed`.
   - Si falla algún reintento, mantiene el estado actual del test(`Active`, `Quarantined`, o `Disabled`).

## Categorización de tests defectuosos mediante IA

La Gestión de tests defectuosos utiliza la IA para asignar automáticamente una categoría de causa raíz a cada test defectuoso en función de patrones de ejecución y señales de error. Esto te ayuda a filtrar, clasificar y priorizar tests defectuosos con mayor eficacia.

<div class="alert alert-info">Un test debe tener al menos una ejecución fallida que incluya las etiquetas (tags) <code>@error.message</code> y <code>@error.stack</code> para poder ser categorizado. Si el test se ha detectado recientemente, la categorización puede tardar varios minutos en finalizar.</div>

### Categorías

| Categoría                | Descripción |
|-------------------------|-------------|
| **Simultaneidad**         | Test que invoca múltiples subprocesos que interactúan de forma insegura o imprevista. Los defectos son causados, por ejemplo, por condiciones de carrera resultantes de suposiciones implícitas sobre el orden de ejecución, que conducen a bloqueos en determinadas ejecuciones de tests. |
| **Aleatoriedad**          | Test que utiliza el resultado de un generador de datos aleatorios. Si el test no tiene en cuenta todos los casos posibles, puede fallar de forma intermitente, por ejemplo, solo cuando el resultado de un generador de números aleatorios es cero. |
| **Punto flotante**      | Test que utiliza el resultado de una operación de coma flotante. Las operaciones de coma flotante pueden sufrir excesos y defectos de precisión, sumas no asociativas, etc., que, si no se tienen en cuenta adecuadamente, pueden dar lugar a resultados incoherentes (por ejemplo, comparar un resultado de coma flotante con un valor real exacto en una aserción). |
| **Colección desordenada**| Test que supone un orden de iteración particular para un objeto de colección desordenada. Dado que no se especifica ningún orden, los tests que suponen un orden fijo probablemente serán defectuoso por varias razones (por ejemplo, la implementación de la clase de colección). |
| **Rango demasiado restrictivo**| Test cuyas aserciones solo aceptan parte del rango de salida válido. Falla intermitentemente en casos límite no gestionados. |
| **Tiempo de espera**             | Test que falla debido a limitaciones de tiempo, ya sea a nivel de test individual o como parte de un conjunto. Esto incluye aquellos tests que superan su límite de tiempo de ejecución (por ejemplo, test individual o todo el conjunto) y fallan intermitentemente debido a tiempos de ejecución variables. |
| **Dependencia del orden**    | Test que depende de un valor o recurso compartido modificado por otro test. Cambiar el orden de ejecución de test puede romper esas dependencias y producir resultados incoherentes. |
| **Fuga de recursos**       | Test que gestiona incorrectamente un recurso externo (por ejemplo, no logra liberar memoria). Los siguientes tests que reutilicen el recurso pueden presentar defectos. |
| **Espera asíncrona**   | Test que realiza una llamada asíncrona o espera a que los elementos se carguen/representen, pero no espera explícitamente a que se completen (a menudo utilizando un retraso fijo). Si la llamada o la representación tardan más que el retraso, el test falla. |
| **E/S**                  | Test defectuoso debido a su gestión de entrada/salida, por ejemplo, fallando cuando se agota el espacio en disco durante una escritura. |
| **Red**             | Test que depende de la disponibilidad de la red (por ejemplo, consultas a un servidor). Si la red no está disponible o está congestionada, el test puede fallar. |
| **Tiempo**                | Test que se basa en la hora del sistema y puede fallar debido a discrepancias de precisión o de zona horaria (por ejemplo, falla cuando pasa la medianoche en UTC). |
| **Dependencia del entorno** | Test que depende de sistemas operativos, versiones de bibliotecas o hardwares específicos. Puede ser aprobado en un entorno, pero fallar en otro, especialmente en entornos CI de nube donde las máquinas varían de forma no determinista. |
| **Desconocido**             | El test es defectuoso por una razón desconocida. |

## Recibir notificaciones

Configura notificaciones para realizar un seguimiento de los cambios en tus tests defectuosos. Cada vez que un usuario o una política cambia el estado de un test defectuoso, se envía un mensaje a los destinatarios seleccionados. Puedes enviar notificaciones a direcciones de correo electrónico o a canales de Slack (consulta la [integración de Datadog con Slack][5]) y enrutar los mensajes en función de los propietarios de códigos de test. Si no se especifica ningún propietario de código, se notifica a todos los destinatarios seleccionados de los cambios en tests defectuosos del repositorio. Configura la notificación para cada repositorio desde la página [**Políticas de tests defectuosos**][13] en los parámetros de entrega de software.

Las notificaciones no se envían inmediatamente, sino que se agrupan por lotes cada pocos minutos para reducir el ruido.

{{< img src="tests/flaky_management_notifications_settings.png" alt="Interfaz de usuario de parámetros de notificación" style="width:100%;" >}}

## Compatibilidad

Para utilizar las funciones de la gestión de tests defectuosos, debes utilizar la instrumentación nativa de Datadog para tu marco de test. En la tabla siguiente se indican las versiones mínimas de cada biblioteca de rastreo Datadog necesaria para poner en cuarentena, desactivar e intentar reparar tests con errores. Haz clic en el nombre de un lenguaje para obtener información sobre la configuración:

| Lenguaje        | Cuarentena y desactivación          | Intento de corrección               |
| --------------- | ----------------------------- | ---------------------------- |
| [.NET][6]       | 3.13.0+                       | 3.17.0+                      |
| [Go][7]         | 1.73.0 o posterior (Orchestrion v1.3.0 o posterior) | 2.2.2 o posterior (Orchestrion v1.6.0 o posterior) |
| [Java][8]       | 1.48.0+                       | 1.50.0+                      |
| [JavaScript][9] | 5.44.0+                       | 5.52.0+                      |
| [Python][10]    | 3.3.0+                        | 3.8.0+                       |
| [Ruby][11]      | 1.13.0+                       | 1.17.0+                      |
| [Swift][12]     | 2.6.1 o posterior                        | 2.6.1 o posterior                       |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/flaky
[2]: https://app.datadoghq.com/source-code/repositories
[3]: /es/tests/explorer
[4]: /es/service_management/case_management
[5]: /es/integrations/slack/?tab=datadogforslack
[6]: /es/tests/setup/dotnet/
[7]: /es/tests/setup/go/
[8]: /es/tests/setup/java/
[9]: /es/tests/setup/javascript/
[10]: /es/tests/setup/python/
[11]: /es/tests/setup/ruby/
[12]: /es/tests/setup/swift/
[13]: https://app.datadoghq.com/ci/settings/test-optimization/flaky-test-management
---
description: Rastree, clasifique y gestione las pruebas inestables.
further_reading:
- link: /continuous_integration/tests/
  tag: Documentación
  text: Aprenda sobre Test Optimization
- link: /tests/flaky_tests/
  tag: Documentación
  text: Aprenda sobre cómo trabajar con pruebas inestables
- link: https://www.datadoghq.com/knowledge-center/flaky-tests/
  tag: Knowledge Center
  text: Descripción general de las pruebas inestables
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: Centro de aprendizaje
  text: Introducción a Test Optimization
title: Gestión de pruebas inestables
---
## Descripción general {#overview}

La página de [Gestión de pruebas inestables][1] proporciona una vista centralizada para rastrear, clasificar y remediar pruebas inestables en toda su organización. Puede visualizar el estado de cada prueba junto con métricas de impacto clave como el número de fallas en el pipeline, el tiempo de CI desperdiciado y la tasa de fallas.

Desde esta UI, puede actuar sobre las pruebas inestables para mitigar su impacto. Ponga en cuarentena o deshabilite las pruebas problemáticas para evitar que las inestabilidades conocidas rompan las compilaciones, y cree elementos de trabajo y problemas de Jira para rastrear el trabajo hacia las correcciones.

Cada prueba inestable tiene un identificador único y estable derivado de un hash del ID del repositorio y el nombre completo de la prueba. En el Test Optimization Explorer, esta es la faceta `@test.fingerprint_fqn`. En la [Flaky Tests Management API][18], es el `id` de la prueba, y puede filtrar el punto de conexión de "Search flaky tests" usando la clave `fingerprint_fqn`. Use este identificador para buscar o actualizar una prueba específica a través de la API.

{{< img src="tests/flaky_management-2.png" alt="Descripción general de la Flaky Tests Management UI" style="width:100%;" >}}

## Cambiar el estado de una prueba inestable {#change-a-flaky-tests-state}

Use el menú desplegable de estado para cambiar cómo se maneja una prueba inestable en su pipeline de CI. Esto puede ayudar a reducir el ruido en la CI mientras mantiene la trazabilidad y el control. Los estados disponibles son:

| Estado     | Descripción |
| ----------- | ----------- |
| {{< ui >}}Active{{< /ui >}} | Se sabe que la prueba es inestable y se está ejecutando en CI. |
| {{< ui >}}Quarantined{{< /ui >}} | Mantenga la prueba ejecutándose en segundo plano, pero las fallas no afectan el estado de CI ni interrumpen las canalizaciones. Esto es útil para aislar pruebas inestables sin bloquear las fusiones. Datadog etiqueta los eventos de ejecución de prueba con `@test.test_management.is_quarantined:true` cuando están en cuarentena. |
| {{< ui >}}Disabled{{< /ui >}} | Omita la prueba por completo en CI. Utilícelo cuando una prueba ya no sea relevante o deba eliminarse temporalmente del pipeline. Datadog etiqueta los eventos de ejecución de prueba con `@test.test_management.is_disabled:true` cuando están deshabilitados. Las pruebas deshabilitadas se excluyen del movimiento automático a {{< ui >}}Fixed{{< /ui >}}. |
| {{< ui >}}Fixed{{< /ui >}} | La prueba ha pasado consistentemente y ya no es inestable. Si es compatible, utilice el [flujo de remediación](#confirm-fixes-for-flaky-tests) para confirmar la corrección y aplicar automáticamente este estado después de que se fusione en la rama predeterminada.|

<div class="alert alert-info">Las acciones de estado tienen requisitos de versión mínima para la biblioteca de instrumentación de cada lenguaje de programación. Consulte <a href="#compatibility">Compatibilidad</a> para obtener más detalles.</div>

## Configure políticas para automatizar el ciclo de vida de las pruebas inestables {#configure-policies-to-automate-the-flaky-test-lifecycle}

Configure las Flaky Test Policies automatizadas para controlar cómo se manejan las pruebas inestables en cada repositorio. Por ejemplo, una prueba inestable en la rama predeterminada puede ponerse automáticamente en cuarentena y, posteriormente, deshabilitarse si permanece sin corregirse después de 30 días.

1. Haga clic en el botón {{< ui >}}Policy Settings{{< /ui >}} en la parte superior derecha de la página de Flaky Management. También puede abrir [{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}][13] y hacer clic en la fila {{< ui >}}Flaky Test Policies{{< /ui >}} para configurar las políticas predeterminadas para su organización o anularlas por repositorio.
2. Busque y seleccione el repositorio que desea configurar. Esto abre el panel lateral {{< ui >}}Flaky Test Policies{{< /ui >}}.
    {{< img src="tests/flaky-policies-4.png" alt="Página de políticas de pruebas inestables con el panel de edición de políticas abierto para configurar una política." style="width:100%;" >}}

3. Utilice los interruptores para habilitar acciones automatizadas específicas y utilice reglas de automatización para personalizar aún más cómo se ponen en cuarentena, se deshabilitan o se reintentan las pruebas:
   <table>
     <thead>
       <tr>
         <th>Acción</th>
         <th>Descripción</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>{{< ui >}}Quarantine{{< /ui >}}</td>
         <td>
           <p>Utilice el interruptor para permitir que las pruebas inestables se pongan en cuarentena para este repositorio.</p>
           <p>Personalice las reglas de automatización según:</p>
           <ul>
             <li>{{< ui >}}Time{{< /ui >}}: Poner en cuarentena una prueba si su estado es <code>Active</code> durante un número específico de días. La regla se activa todos los días a las 12:15 UTC.</li>
             <li>{{< ui >}}Branch{{< /ui >}}: Poner en cuarentena una <code>Active</code> prueba si es inestable en una o más ramas especificadas.</li>
             <li>{{< ui >}}Failure rate{{< /ui >}}: Poner en cuarentena una <code>Active</code> prueba si su tasa de fallos en los últimos 7 días es mayor o igual al umbral especificado. La regla se activa cada 15 minutos.</li>
           </ul>
         </td>
       </tr>
       <tr>
         <td>{{< ui >}}Disable{{< /ui >}}</td>
         <td>
           <p>Utilice el interruptor para permitir que las pruebas inestables se deshabiliten para este repositorio. Es posible que desee hacer esto después de poner en cuarentena o para proteger ramas específicas de la inestabilidad.</p>
           <p>Personalice las reglas de automatización según:</p>
           <ul>
             <li>{{< ui >}}State and time{{< /ui >}}: Deshabilite una prueba si tiene un estado especificado durante un número determinado de días. La regla se activa todos los días a las 12:30 UTC.</li>
             <li>{{< ui >}}Branch{{< /ui >}}: Deshabilitar un <code>Active</code> o <code>Quarantined</code> prueba si es inestable en una o más ramas especificadas.</li>
             <li>{{< ui >}}Failure rate{{< /ui >}}: Deshabilitar un <code>Active</code> o <code>Quarantined</code> prueba si su tasa de fallos en los últimos 7 días es mayor o igual al umbral especificado. La regla se activa cada 15 minutos.</li>
           </ul>
         </td>
       </tr>
       <tr>
         <td>{{< ui >}}Attempt&nbsp;to&nbsp;Fix{{< /ui >}}</td>
         <td>Cuando intente corregir una prueba inestable, vuelva a intentar la prueba automáticamente un número determinado de veces en la confirmación que contiene la corrección.</td>
       </tr>
       <tr>
         <td>{{< ui >}}Fixed{{< /ui >}}</td>
         <td>
           <p>Si una prueba inestable deja de fallar durante 30 días, se mueve automáticamente al estado Fixed. Esta automatización es el comportamiento predeterminado y no se puede personalizar.</p>
           <p>Las pruebas en el estado {{< ui >}}Disabled{{< /ui >}} se excluyen de esta automatización y nunca se mueven automáticamente a {{< ui >}}Fixed{{< /ui >}}. Debido a que las pruebas deshabilitadas se omiten en la CI, Datadog no tiene señal sobre si siguen siendo inestables. Para que una prueba deshabilitada vuelva a ser elegible, cambie su estado a {{< ui >}}Active{{< /ui >}} o {{< ui >}}Quarantined{{< /ui >}}.</p>
           <p>Antes de que Datadog mueva automáticamente una prueba inestable a {{< ui >}}Fixed{{< /ui >}}, verifica si la prueba podría estar rota en lugar de marcarla como Fixed. Una prueba rota es una prueba inestable cuyas ejecuciones recientes fallaron todas, lo que resulta en una tasa de fallos del 100% en los últimos 7 días. Datadog no marca automáticamente estas pruebas como Fixed, lo que ayuda a evitar que las pruebas en cuarentena que aún fallan vuelvan a romper la CI.</p>
           <p>Utilice la faceta {{< ui >}}Broken test{{< /ui >}} en el Flaky Tests Management Explorer para identificar estas pruebas. Filtrar por <code>broken_test:true</code> para mostrar pruebas con una tasa de fallos del 100% en los últimos 7 días.</p>
         </td>
       </tr>
     </tbody>
   </table>

## Realice un seguimiento de la evolución de las pruebas inestables {#track-evolution-of-flaky-tests}

Realice un seguimiento de la evolución del número de pruebas inestables con la métrica `test_optimization.test_management.flaky_tests` lista para usar. La métrica está enriquecida con las etiquetas a continuación para ayudarle a investigar los conteos con más detalle.

- `repository_id`
- `test_service`
- `branch`
- `flaky_status`
- `test_codeowners`
- `flaky_category`

La etiqueta `branch` solo existe cuando la prueba ha sido inestable en la rama predeterminada del repositorio durante los últimos 30 días. Esto le ayuda a descartar pruebas inestables que solo han mostrado inestabilidad en ramas de funciones, ya que estas podrían no ser relevantes. Puede configurar la rama predeterminada de sus repositorios en [Repository Settings][2].

## Investigue una prueba inestable {#investigate-a-flaky-test}

Para obtener más información sobre una prueba inestable específica, utilice estas opciones en el menú de acciones al final de cada fila:

- {{< ui >}}View Last Failed Test Run{{< /ui >}}: Abra el panel lateral con los detalles de la ejecución fallida más reciente de la prueba.
- {{< ui >}}View related test executions{{< /ui >}}: Abra el [Test Optimization Explorer][3] con todas las ejecuciones recientes de la prueba.

## Cree elementos de trabajo para pruebas inestables {#create-work-items-for-flaky-tests}

Para cualquier prueba inestable, puede crear un elemento de trabajo y utilizar [Work Management][4] para realizar un seguimiento de cualquier trabajo hacia la corrección. Haga clic en el botón {{< ui >}}Create Work Item{{< /ui >}} o utilice el menú de acciones al final de la fila.

## Confirmar las correcciones de pruebas inestables {#confirm-fixes-for-flaky-tests}

Cuando corrige una prueba inestable, el flujo de remediación de Test Optimization puede confirmar la corrección reintentando la prueba varias veces. Para habilitar el flujo de remediación:

1. Para la prueba que está corrigiendo, haga clic en {{< ui >}}Link commit to Flaky Test fix{{< /ui >}} en la Flaky Tests Management UI.
1. Copie la clave única de prueba inestable que se muestra (por ejemplo, `DD_ABC123`).
1. Incluya la clave de prueba en el título o mensaje de su confirmación de Git para la corrección (por ejemplo, `git commit -m "DD_ABC123"`).
1. Cuando Datadog detecta la clave de prueba, activa automáticamente el flujo de remediación para esa prueba. La clave no necesita estar en la confirmación más reciente. Datadog también verifica las confirmaciones anteriores recientes, por lo que el flujo aún se activa cuando envía varias confirmaciones juntas o cuando su proveedor de CI informa solo la confirmación más reciente. El flujo de remediación:
    - Reintenta 20 veces las pruebas que intenta corregir (o el número de reintentos que especificó en su [configuración de Políticas de Pruebas Inestables](#configure-policies-to-automate-the-flaky-test-lifecycle)).
      - Etiqueta cada reintento con `@test.test_management.is_attempt_to_fix:true` en los eventos de ejecución de prueba.
    - Ejecuta las pruebas incluso si están marcadas como `Disabled`.
    - Si todos los reintentos pasan, marca la corrección como {{< ui >}}in progress{{< /ui >}} en la Flaky Tests Management UI, la asocia con la rama utilizada para la corrección y espera a que esa rama se fusione.
      - Etiqueta el último reintento de prueba con `@test.test_management.attempt_to_fix_passed:true` en los eventos de ejecución de pruebas.
      - Inicia un [periodo de gracia](#grace-period-mechanism) de 14 días para dar tiempo a que la corrección se propague por todo el repositorio.
    - Si algún reintento falla, mantiene el estado actual de la prueba (`Active`, `Quarantined` o `Disabled`).
      - Etiqueta el último reintento de prueba con `@test.test_management.attempt_to_fix_passed:false` en los eventos de ejecución de prueba.

<div class="alert alert-danger">Para Cypress, este flujo de remediación requiere que el <a href="https://docs.cypress.io/app/core-concepts/test-isolation">aislamiento de prueba</a> esté habilitado. Con <code>testIsolation: false</code>, los intentos de corrección no se ejecutan. Consulte también <a href="/tests/setup/javascript/?tab=cypress#retries-require-cypress-test-isolation">Los reintentos requieren aislamiento de prueba de Cypress</a>.</div>

### Realice un seguimiento de las correcciones que están en curso {#track-fixes-that-are-in-progress}

Después de una ejecución de corrección exitosa, la Gestión de pruebas inestables rastrea la rama que contiene la corrección y muestra un {{< ui >}}Fix in progress{{< /ui >}} indicador hasta que la corrección llega a la rama predeterminada del repositorio. Cuando se fusiona la solicitud de extracción asociada, la prueba se mueve automáticamente a `Fixed` y se elimina el indicador. Si la corrección se envía directamente a la rama predeterminada, la prueba se marca como `Fixed` inmediatamente.

Requisitos y limitaciones:
- La Integración de código fuente debe estar configurada para un proveedor de SCM compatible (GitHub, GitLab o Azure DevOps) para que Datadog pueda recibir webhooks de fusión de solicitudes de extracción. Consulte [Configuración de la Integración de código fuente][17].
- Cambiar el nombre o eliminar la rama de funciones después de la ejecución de la corrección impide que Datadog detecte la fusión.
- Las ramas con correcciones de más de tres meses dejan de ser monitoreadas; vuelva a ejecutar el flujo de remediación para actualizar el seguimiento.
- Si su proveedor de SCM no es compatible o la Integración de código fuente no está configurada, Datadog no puede detectar las fusiones automáticamente. Transicione manualmente la prueba a `Fixed` después de que se implemente la corrección.

### Mecanismo de período de gracia {#grace-period-mechanism}

Después de corregir una prueba inestable, puede tomar tiempo para que la corrección se propague a todas las ramas, lo que puede causar que la prueba siga siendo inestable en ramas obsoletas. Un mecanismo de período de gracia evita que las pruebas inestables aparezcan en ramas obsoletas después de aplicar la corrección.

Se aplica un período de gracia de 14 días a cada prueba inestable con una corrección exitosa después de usar el [flujo de corrección](#confirm-fixes-for-flaky-tests). Durante este período, Datadog trata la prueba según su estado antes de que comenzara el período de gracia:
- Si la prueba estaba {{< ui >}}Active{{< /ui >}} o {{< ui >}}Quarantined{{< /ui >}}, Datadog trata la prueba como {{< ui >}}Quarantined{{< /ui >}}.
- Si la prueba estaba {{< ui >}}Disabled{{< /ui >}}, Datadog trata la prueba como {{< ui >}}Disabled{{< /ui >}}.

Este método evita fallas innecesarias de CI y ahorra tiempo a los desarrolladores.

## Soluciones para pruebas inestables impulsadas por Bits AI {#bits-ai-powered-flaky-test-fixes}

Después de que Test Optimization detecta una prueba inestable, [Bits Code][16] puede diagnosticarla y corregirla automáticamente. Bits Code analiza los patrones de falla de la prueba y genera cambios de código listos para producción. Luego, puede crear una solicitud de extracción (pull request) de GitHub directamente desde las sugerencias de Bits Code.

Para que Bits Code cree una corrección, la prueba inestable debe cumplir con los siguientes criterios:
- **Tasa de fallas**: Al menos 5%.
- **Tiempo desperdiciado**: Al menos 2 horas.
- **Pipelines fallidos**: Al menos 2 pipelines.
- **Rama**: Debe haber fallado en la rama predeterminada.
- **Ejecuciones fallidas**: Debe tener al menos 1 ejecución fallida que incluya tanto las etiquetas `@error.message` como `@test.source.file`.

{{< img src="tests/bits_ai_flaky_test_fixes-2.png" alt="Bits Code mostrando una corrección propuesta para una prueba inestable." style="width:100%;" >}}

### Configuración {#setup}

Para permitir que Bits Code sugiera correcciones para pruebas inestables, habilite Bits Code para Test Optimization siguiendo las instrucciones de configuración en la [documentación de Bits Code][16]. Bits Code crea automáticamente correcciones para las pruebas inestables detectadas por Test Optimization.

Después de haber habilitado Bits Code, al ver una prueba inestable, haga clic en {{< ui >}}Generate fix{{< /ui >}}.

## Categorización de pruebas inestables impulsada por Bits AI {#ai-powered-flaky-test-categorization}

Flaky Tests Management utiliza IA para asignar automáticamente una categoría de causa raíz a cada prueba inestable según los patrones de ejecución y las señales de error. Esto le ayuda a filtrar, clasificar y priorizar las pruebas inestables de manera más efectiva.

<div class="alert alert-info">Una prueba debe tener al menos una ejecución fallida que incluya tanto <code>@error.message</code> y <code>@error.stack</code> etiquetas para ser elegible para la categorización. Si la prueba fue detectada recientemente, la categorización puede tardar varios minutos en completarse.</div>

### Categorías {#categories}

| Categoría                | Descripción |
|-------------------------|-------------|
| {{< ui >}}Concurrency{{< /ui >}}         | Prueba que invoca múltiples hilos que interactúan de una manera insegura o imprevista. La inestabilidad es causada, por ejemplo, por condiciones de carrera resultantes de suposiciones implícitas sobre el orden de ejecución, lo que lleva a interbloqueos en ciertas ejecuciones de prueba. |
| {{< ui >}}Randomness{{< /ui >}}          | La prueba utiliza el resultado de un generador de datos aleatorios. Si la prueba no tiene en cuenta todos los casos posibles, entonces la prueba puede fallar de forma intermitente, por ejemplo, solo cuando el resultado de un generador de números aleatorios es cero. |
| {{< ui >}}Floating Point{{< /ui >}}      | La prueba utiliza el resultado de una operación de punto flotante. Las operaciones de punto flotante pueden sufrir de desbordamientos y subdesbordamientos de precisión, suma no asociativa, etc., lo que, si no se tiene en cuenta adecuadamente, puede resultar en resultados inconsistentes (por ejemplo, comparar un resultado de punto flotante con un valor real exacto en una aserción). |
| {{< ui >}}Unordered Collection{{< /ui >}}| La prueba asume un orden de iteración particular para un objeto de colección no ordenado. Dado que no se especifica ningún orden, las pruebas que asumen un orden fijo probablemente serán inestables por varias razones (por ejemplo, la implementación de la clase de colección). |
| {{< ui >}}Too Restrictive Range{{< /ui >}}| La prueba cuyas aserciones aceptan solo una parte del rango de salida válido. Falla de forma intermitente en casos extremos no controlados. |
| {{< ui >}}Timeout{{< /ui >}}             | La prueba falla debido a limitaciones de tiempo, ya sea a nivel de prueba individual o como parte de un conjunto. Esto incluye pruebas que exceden su límite de tiempo de ejecución (por ejemplo, una prueba individual o todo el conjunto) y fallan de forma intermitente debido a tiempos de ejecución variables. |
| {{< ui >}}Order Dependency{{< /ui >}}    | La prueba depende de un valor o recurso compartido modificado por otra prueba. Cambiar el orden de ejecución de las pruebas puede romper esas dependencias y producir resultados inconsistentes. |
| {{< ui >}}Resource Leak{{< /ui >}}       | La prueba maneja incorrectamente un recurso externo (por ejemplo, al no liberar memoria). Las pruebas posteriores que reutilizan el recurso pueden volverse inestables. |
| {{< ui >}}Asynchronous Wait{{< /ui >}}   | La prueba realiza una llamada asíncrona o espera a que los elementos se carguen/rendericen y no espera explícitamente a que finalicen (a menudo utilizando un retraso fijo). Si la llamada o el procesamiento tardan más que el retraso, la prueba falla. |
| {{< ui >}}IO{{< /ui >}}                  | La prueba es inestable debido a su manejo de entrada/salida; por ejemplo, falla cuando se agota el espacio en disco durante una escritura. |
| {{< ui >}}Network{{< /ui >}}             | La prueba depende de la disponibilidad de la red (por ejemplo, consultar un servidor). Si la red no está disponible o está congestionada, la prueba puede fallar. |
| {{< ui >}}Time{{< /ui >}}                | La prueba depende del tiempo del sistema y puede ser inestable debido a discrepancias de precisión o zona horaria (por ejemplo, falla cuando pasa la medianoche en UTC). |
| {{< ui >}}Environment Dependency{{< /ui >}} | La prueba depende de un sistema operativo, versiones de biblioteca o hardware específicos. Puede pasar en un entorno pero fallar en otro, especialmente en entornos de CI en la nube donde las máquinas varían de forma no determinista. |
| {{< ui >}}Unknown{{< /ui >}}             | La prueba es inestable por una razón desconocida. |

## Recibir notificaciones {#receive-notifications}

Configure notificaciones para realizar un seguimiento de los cambios en sus pruebas inestables. Las Notifications se envían cuando:
- Se detecta una nueva prueba inestable en la rama predeterminada del repositorio.
- Un usuario o una política cambia el estado de una prueba inestable.
- El flujo de corrección para una prueba inestable tiene éxito o falla.

Puede enviar notificaciones a direcciones de correo electrónico o canales de Slack (consulte la [integración de Slack de Datadog][5]) y enrutar mensajes según los propietarios del código de prueba. Cuando se especifican varios propietarios de código, una prueba inestable debe ser propiedad de todos los propietarios de código especificados para que la regla de notificación coincida. Si no se especifican propietarios de código, se notifica a todos los destinatarios seleccionados sobre todos los cambios de pruebas inestables en el repositorio. Configure las notificaciones para cada repositorio desde el panel lateral [{{< ui >}}Flaky Test Policies{{< /ui >}}][13] en la configuración de Optimización de CI/CD.

Las Notifications se agrupan durante un período breve para reducir el ruido. El resumen semanal solo se envía a las reglas de notificaciones que tienen propietarios de código configurados.

### Tipos de notificaciones {#notification-types}

| Tipo de notificaciones | Descripción |
|---|---|
| {{< ui >}}New flaky test detected{{< /ui >}} | Se detecta una nueva prueba inestable en la rama predeterminada del repositorio. |
| {{< ui >}}Test quarantined{{< /ui >}} | Una prueba es puesta en cuarentena por una regla de política automatizada (basada en tiempo, basada en rama o tasa de fallos). |
| {{< ui >}}Test disabled{{< /ui >}} | Una prueba es deshabilitada por una regla de política automatizada (basada en tiempo, basada en rama o tasa de fallos). |
| {{< ui >}}Fix successful{{< /ui >}} | Una prueba supera todos los reintentos en el flujo de remediación y se marca como \"corrección en curso\". |
| {{< ui >}}Fix failed{{< /ui >}} | Una prueba falla durante el flujo de remediación. |
| {{< ui >}}Manual state change{{< /ui >}} | Un usuario cambia manualmente el estado de una prueba inestable. |
| {{< ui >}}Weekly digest summary{{< /ui >}} | **Beta**: Un resumen semanal enviado cada lunes, que informa sobre el estado actual de las pruebas inestables y los cambios desde la semana anterior, agrupados por repositorio y propietario del código. Solo se envía a las reglas de notificaciones que tienen propietarios de código configurados, y se puede desactivar por regla desde la configuración de notificaciones de la regla. |

{{< img src="tests/flaky_management_notifications_settings-3.png" alt="Interfaz de usuario de configuración de Notifications." style="width:100%;" >}}

## Compatibilidad {#compatibility}

Para usar las funciones de Gestión de pruebas inestables, debe usar la instrumentación nativa de Datadog para su marco de pruebas. La siguiente tabla describe las versiones mínimas de cada SDK de Datadog necesarias para poner en cuarentena, deshabilitar e intentar corregir pruebas inestables. Haga clic en el nombre de un lenguaje para obtener información de configuración:

| Lenguaje        | Poner en cuarentena y deshabilitar          | Intentar corregir               |
| --------------- | ----------------------------- | ---------------------------- |
| [.NET][6]       | 3.13.0+                       | 3.23.0+                      |
| [Go][7]         | 1.73.0+ (Orchestrion v1.3.0+) | 2.2.2+ (Orchestrion v1.6.0+) |
| [Java][8]       | 1.47.0+                       | 1.52.0+                      |
| [JavaScript][9] | 5.44.0+                       | 5.59.0+                      |
| [Python][10]    | 3.3.0+                        | 3.8.0+                       |
| [Ruby][11]      | 1.13.0+                       | 1.17.0+                      |
| [Swift][12]     | 2.6.1+                        | 2.6.1+                       |

## Solución de problemas {#troubleshooting}

### Las pruebas inestables deshabilitadas no se mueven automáticamente a Corregido {#disabled-flaky-tests-are-not-automatically-moved-to-fixed}

Datadog no mueve automáticamente las pruebas {{< ui >}}Disabled{{< /ui >}} al estado {{< ui >}}Fixed{{< /ui >}}, incluso después de que dejan de ser inestables durante 30 días. Una prueba deshabilitada se omite en CI, por lo que Datadog no recibe datos de ejecución de prueba para ella y no puede verificar si sigue siendo inestable.

Para corregir una prueba deshabilitada, haga una de las siguientes acciones:

- Active el [flujo de remediación de intento de corrección](#confirm-fixes-for-flaky-tests). Esto reintenta la prueba incluso mientras está deshabilitada, y la mueve a {{< ui >}}Fixed{{< /ui >}} una vez que la corrección se confirma y se fusiona.
- Cambie manualmente el estado de la prueba a {{< ui >}}Active{{< /ui >}} o {{< ui >}}Quarantined{{< /ui >}} utilizando el [menú desplegable de estado](#change-a-flaky-tests-state). Datadog entonces mueve automáticamente la prueba a {{< ui >}}Fixed{{< /ui >}} la próxima vez que se ejecute la automatización, a menos que la prueba vuelva a ser inestable.

### Las notificaciones de Slack no se entregan {#slack-notifications-are-not-delivered}

Si las notificaciones de Slack no se están entregando, verifique que su regla de notificación use el formato `@slack-ACCOUNT-CHANNEL`.

Si está utilizando `@slack-CHANNEL` (sin el nombre de la cuenta), la notificación se dirige a la primera cuenta de Slack configurada. Para organizaciones con múltiples espacios de trabajo de Slack, es posible que este no sea el espacio de trabajo deseado.

Para encontrar el nombre de su cuenta, vaya al [mosaico de integración de Slack][5] y verifique el
{{< ui >}}Account Name{{< /ui >}} campo para el espacio de trabajo que desea utilizar.

### El flujo de remediación de intento de corrección no se activa después de vincular una corrección {#attempt-to-fix-remediation-does-not-trigger-after-linking-a-fix}

Después de incluir la clave de prueba (por ejemplo, `DD_ABC123`) en una confirmación, Datadog escanea la confirmación que activó la ejecución de prueba y hasta las 10 confirmaciones más recientes anteriores a ella. Si el flujo de remediación no comienza, verifique lo siguiente:

- **La clave está en una confirmación anterior.** Datadog escanea solo la confirmación que activa el proceso y las 10 confirmaciones más recientes de su historial. Si envía más de 10 confirmaciones a la vez, incluya la clave en la confirmación que activa el proceso o en uno de las 10 confirmaciones más recientes.
- **La corrección se fusionó mediante squash.** Una fusión squash combina las confirmaciones originales en una sola confirmación, por lo que Datadog solo lee el mensaje de la confirmación squash; las confirmaciones individuales previas al squash ya no se escanean. La mayoría de los proveedores incluyen los mensajes de confirmación originales en la confirmación squash, por lo que se conserva cualquier clave que contengan. Si su proveedor los omite, agregue la clave al mensaje de la confirmación squash.
- **La clave no coincide con el formato esperado.** Utilice la clave exacta que se muestra en la interfaz de usuario de gestión de pruebas inestables (por ejemplo, `DD_ABC123`) en el título o mensaje de la confirmación.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/flaky
[2]: https://app.datadoghq.com/source-code/repositories
[3]: /es/tests/explorer
[4]: /es/incident_response/work_management
[5]: /es/integrations/slack/?tab=datadogforslack
[6]: /es/tests/setup/dotnet/
[7]: /es/tests/setup/go/
[8]: /es/tests/setup/java/
[9]: /es/tests/setup/javascript/
[10]: /es/tests/setup/python/
[11]: /es/tests/setup/ruby/
[12]: /es/tests/setup/swift/
[13]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[16]: /es/bits_ai/bits_code/
[17]: /es/integrations/guide/source-code-integration/
[18]: /es/api/latest/test-optimization/
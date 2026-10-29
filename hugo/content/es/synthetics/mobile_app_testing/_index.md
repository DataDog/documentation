---
aliases:
- /es/mobile_testing
- /es/mobile_app_testing
- /es/mobile_app_testing/mobile_app_tests/
cascade:
  algolia:
    tags:
    - mobile_testing
description: Cree pruebas móviles inteligentes y de mantenimiento automático para
  garantizar que las partes más críticas de sus aplicaciones móviles estén en funcionamiento
  desde dispositivos reales.
further_reading:
- link: /synthetics/mobile_app_testing/
  tag: Documentación
  text: Aprenda a crear pruebas de aplicaciones móviles sintéticas
- link: /synthetics/mobile_app_testing/settings
  tag: Documentación
  text: Aprenda a cargar sus aplicaciones móviles iOS o Android
- link: /continuous_testing/
  tag: Documentación
  text: Obtenga información sobre Continuous Testing y CI/CD
- link: /synthetics/guide/version_history/
  tag: Guía
  text: Historial de versiones de Synthetic Monitoring
- link: /synthetics/guide/mobile-test-auth-tokens/
  tag: Guía
  text: Inyecte y actualice automáticamente tokens de autenticación en pruebas de
    aplicaciones móviles
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Simplificación de la resolución de problemas a lo largo del recorrido del
    usuario con Datadog Synthetic Monitoring.
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Mejores prácticas para crear pruebas de extremo a extremo
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: Blog
  text: Cómo crear pruebas Synthetic confiables y precisas para sus aplicaciones móviles.
- link: /api/latest/synthetics/#create-or-clone-a-test
  tag: API
  text: Synthetics API
title: Pruebas de aplicaciones móviles y hacer un seguimiento
---
## Descripción general {#overview}

Las pruebas de aplicaciones móviles le permiten probar y hacer un seguimiento de flujos de negocio clave para aplicaciones Android e iOS utilizando dispositivos reales.
Datadog ejecuta estas pruebas en dispositivos reales para proporcionar una representación realista y paso a paso de los flujos de trabajo clave de la aplicación, capturas de pantalla de cada paso y resultados detallados de aprobación o falla para que su equipo pueda visualizar rápidamente qué salió mal.
Las pruebas de aplicaciones móviles pueden ejecutarse según un horario, bajo demanda o directamente dentro de sus [CI/CD pipelines][1].

Opcionalmente, vincule los datos de pruebas móviles de Synthetics con los datos móviles de RUM si se utiliza el [RUM SDK][15] dentro de la aplicación probada. 

Puede crear pruebas de aplicaciones móviles en Datadog navegando a [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}New Test{{< /ui >}}][12] y seleccionando {{< ui >}}Mobile Application Test{{< /ui >}}.

{{< img src="mobile_app_testing/new_test_2.png" alt="Crear una prueba móvil Synthetics" style="width:50%;">}}

## Configuración {#configuration}

Puede crear una prueba utilizando una de las siguientes opciones:

### Crear una prueba a partir de una plantilla {#create-a-test-from-a-template}

  1. Pase el cursor sobre una de las plantillas precargadas y haga clic en {{< ui >}}View Template{{< /ui >}}. Esto abre un panel lateral que muestra información de configuración precargada, incluyendo: Detalles de la prueba, Detalles de la solicitud, Condiciones de alerta y pasos.
  2. Haga clic en {{< ui >}}\+ Create Test{{< /ui >}} para abrir la página de configuración, donde puede revisar y editar las opciones de configuración prellenadas. Los campos presentados son idénticos a los disponibles al crear una prueba desde cero.
  3. Haga clic en {{< ui >}}Save & Quit{{< /ui >}} en la esquina superior derecha para enviar su prueba de aplicación móvil.<br /><br>
       {{< img src="/mobile_app_testing/templates_mobile_app.mp4" alt="Video de la página de inicio de pruebas de aplicaciones móviles con plantillas" video="true" >}}

### Cree una prueba desde cero {#build-a-test-from-scratch}

  1. Haga clic en la plantilla {{< ui >}}\+{{< /ui >}}, luego seleccione una aplicación móvil del menú desplegable. Si aún no ha creado una, cree una aplicación móvil en la [{{< ui >}}Applications List{{< /ui >}} sección][2] en la [{{< ui >}}Synthetic Monitoring & Continuous Testing Settings{{< /ui >}} página][3]. 
  1. Seleccione una {{< ui >}}version{{< /ui >}} o haga clic en {{< ui >}}Always run the latest version{{< /ui >}} para usar la versión más reciente de su aplicación móvil cada vez que se ejecute su prueba.
  1. Agregue un {{< ui >}}name{{< /ui >}} para su prueba.
  1. Seleccione {{< ui >}}environment and additional tags{{< /ui >}} que se relacionen con su prueba. Utilice el formato `<KEY>:<VALUE>` para filtrar por una `<VALUE>` para una `<KEY>` determinada.
  1. Seleccione [{{< ui >}}devices{{< /ui >}}](#devices) en los que ejecutar su prueba.
  1. Establezca [condiciones de reintento](#test-retries) para su prueba.
  1. Establezca el [{{< ui >}}test frequency{{< /ui >}}](#scheduling-and-alerts) haciendo clic en intervalos de tiempo básicos o personalizando la frecuencia de su prueba y {{< ui >}}alert conditions{{< /ui >}} para su hacer un seguimiento de prueba. 
  1. Ingrese un nombre para el hacer un seguimiento de prueba, seleccione un servicio o miembro del equipo al cual notificar y agregue una notificación de mensaje.
  1. Haga clic en {{< ui >}}Save & Edit Recording{{< /ui >}} para enviar su prueba de aplicación móvil.

### Fragmentos {#snippets}

Al configurar una nueva prueba de aplicación móvil, utilice fragmentos para completar automáticamente sus versiones de SO, tamaños de dispositivo, fabricantes y tiempo de actividad, en lugar de seleccionar estas opciones manualmente. Los siguientes fragmentos están disponibles:

* {{< ui >}}Device Size{{< /ui >}}: Realice automáticamente sus pruebas de aplicación móvil en una pantalla de tamaño específico en todos los dispositivos:

  - {{< ui >}}Multi-screen size{{< /ui >}}
  - {{< ui >}}Tablet{{< /ui >}}
  - {{< ui >}}Large Screen (iOS only){{< /ui >}}
  - {{< ui >}}Standard Screen (iOS only){{< /ui >}}
  - {{< ui >}}Small Screen (iOS only){{< /ui >}}

* {{< ui >}}OS Version{{< /ui >}}: Pruebe automáticamente sus aplicaciones iOS o Android en varias versiones. Esta selección cambia a iOS o Android según la elección de su aplicación móvil.

* {{< ui >}}Device Manufacturer (Android only){{< /ui >}}: Pruebe automáticamente sus aplicaciones Android en varios fabricantes de dispositivos.

* {{< ui >}}Uptime{{< /ui >}}: Configure automáticamente una prueba con la frecuencia más corta disponible (cada 15 minutos).

<br/>
  {{< img src="mobile_app_testing/mobile_app_snippets_2.png" alt="Captura de pantalla del lado izquierdo de la creación de una prueba de aplicación móvil, que muestra los ejemplos de fragmentos" width="70%" >}}

### Opciones avanzadas {#advanced-options}

Puede configurar opciones avanzadas al crear una prueba móvil para ajustar dinámicamente el comportamiento de la aplicación sin modificar su código. Por ejemplo, puede aceptar alertas automáticamente, permitir fallos de la aplicación y capturar recursos de red. Estas configuraciones se pueden acceder en la {{< ui >}}Advanced Options{{< /ui >}} sección de su prueba móvil.

#### Opciones de comportamiento de la prueba: {#test-behavior-options}

{{< ui >}}Auto-accept alerts{{< /ui >}}
: Cuando está habilitado, acepta automáticamente todas las alertas del sistema operativo durante la ejecución de la prueba.

{{< ui >}}Allow application crash{{< /ui >}}
: Cuando está habilitado, evita que la prueba falle si se detecta un bloqueo de la aplicación. Debe incluir un paso para reiniciar la aplicación después del bloqueo esperado para continuar la prueba.

{{< ui >}}Capture network resources{{< /ui >}}
: Cuando está habilitado, recopila las solicitudes y respuestas de red para cada paso de la prueba y las muestra en los resultados. </br>
**Nota**: Esta configuración puede afectar el rendimiento de la aplicación y podría evitar que la aplicación se inicie.

#### Argumentos de la aplicación: {#application-arguments}

Puede pasar pares `key:value` a su aplicación cuando se inicia la prueba, permitiéndole modificar el comportamiento de la aplicación de forma programática. El código de su aplicación debe estar configurado para leer y procesar explícitamente estos pares clave-valor. 

Por ejemplo, [inyecte un token de autenticación de actualización automática][17] para omitir el flujo de inicio de sesión de su aplicación.

**Ejemplos:**

{{< tabs >}}
{{% tab "Android (Extras de intent iniciales)" %}}

Para pruebas de Android, agregue los pares `key:value` apropiados en la sección Opciones avanzadas de su prueba:

```json
{
  "username": "example_user",
  "password": "{{ EXAMPLE_VARIABLE }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_android.png" alt="Página de creación de pruebas de aplicaciones móviles, que muestra un ejemplo de una opción avanzada para un dispositivo Android." style="width:100%;" >}}
{{% /tab %}}

{{% tab "iOS (Argumentos de proceso)" %}}

Para pruebas de iOS, agregue los pares `key:value` apropiados en la sección Opciones avanzadas:

```json
{
  "username": "example_user",
  "password": "{{ EXAMPLE_VARIABLE }}",
  "enable_feature_x": "true"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_iOS.png" alt="Página de creación de pruebas de aplicaciones móviles, que muestra un ejemplo de una opción avanzada para un dispositivo iOS." style="width:100%;" >}}
    
{{% /tab %}}
{{< /tabs >}}

## Dispositivos {#devices}

En la pantalla de selección de dispositivo, puede elegir probar dispositivos móviles que se encuentran en Europa (EU) o en los Estados Unidos (US). 
Para configurar una prueba móvil para usar dispositivos alojados en EU o US:

1. Abra la página de edición de pruebas para una prueba móvil existente o cree una nueva.
2. Expanda la {{< ui >}}Devices{{< /ui >}} sección y elija la(s) ubicación(es) del dispositivo para su prueba:
   - {{< ui >}}All locations{{< /ui >}}: Ejecuta pruebas tanto en la UE como en EE. UU.
   - {{< ui >}}EU{{< /ui >}}: Ejecuta pruebas solo en la UE.
   - {{< ui >}}US{{< /ui >}}: Ejecuta pruebas solo en EE. UU.
3. Utilice el menú desplegable {{< ui >}}Select Device(s){{< /ui >}} para seleccionar los dispositivos en los que desea probar.
4. Haga clic en {{< ui >}}Save & Edit Recording{{< /ui >}} para guardar la configuración de su prueba.

**Notas**: 
- Las pruebas ejecutadas en dispositivos alojados en EE. UU. se ejecutan desde AWS US West (Oregón). De manera similar, las pruebas en dispositivos alojados en la UE se ejecutan desde AWS Alemania (Fráncfort).
- No todos los dispositivos están disponibles tanto en la UE como en EE. UU. Para obtener más detalles, consulte la lista de [dispositivos compatibles][16].

{{< img src="mobile_app_testing/mobile_app_devices_EU.mp4" alt="Selección de uno o más dispositivos móviles en las regiones de EE. UU. y la UE" video=true >}}

### Familias de dispositivos móviles {#mobile-device-families}

Una familia de dispositivos móviles representa un conjunto de dispositivos que comparten características comunes, como una línea de modelo o una versión de sistema operativo. En lugar de elegir un dispositivo único y específico, puede elegir una familia. Cuando se ejecuta una prueba, Datadog la ejecuta en uno de los dispositivos disponibles en la familia en ese momento. Elegir una familia aumenta la disponibilidad de los resultados de sus pruebas, ya que la prueba puede ejecutarse en cualquier dispositivo disponible en la familia en lugar de depender de uno solo y específico.

Datadog proporciona familias integradas que aparecen junto a los dispositivos individuales en el menú desplegable **Seleccionar dispositivo(s)**. Por ejemplo:

- **Familia iPhone más reciente en la versión de iOS más reciente** (iOS)
- **Cualquier iPhone Pro** (iOS)
- **Última familia Pixel en la versión más reciente de Android** (Android)
- **Cualquier dispositivo Samsung** (Android)

Seleccione una familia de la misma manera que selecciona un dispositivo individual. Una sola prueba puede dirigirse a dispositivos individuales, familias o ambos.

## Reintentos de prueba {#test-retries}

Puede especificar cuánto tiempo necesita fallar una prueba antes de activar una alerta de notificación.

* Reintentar `X` veces después de `Y` ms en caso de fallo.

{{< img src="mobile_app_testing/retry_condition.png" alt="Paso de condición de reintento, que muestra el reintento de la prueba 0 veces después de 300 ms en caso de fallo" width="90%" >}}

## Programación y alertas {#scheduling-and-alerts}

De forma predeterminada, las pruebas de aplicaciones móviles están configuradas para pruebas bajo demanda, lo que significa que estas pruebas pueden ejecutarse [directamente en una canalización de CI](#run-tests-in-ci).

{{< img src="mobile_app_testing/alerting_rules.png" alt="Condiciones de programación y de alerta para una prueba móvil" style="width:90%" >}}

Puede personalizar las condiciones de alerta para definir con qué frecuencia desea enviar una alerta y las circunstancias bajo las cuales desea que una prueba envíe una alerta de notificación.

* Se activa una alerta si alguna aserción falla durante `X` minutos.

<div class="alert alert-info">
Para obtener más información sobre cómo las notificaciones de Synthetic Monitoring evalúan los resultados de las pruebas y activan alertas, consulte <a href="/synthetics/guide/how-synthetics-monitors-trigger-alerts/">Understanding Synthetic Monitor Alerting</a>.
</div>

{{% synthetics-downtimes %}}

### Configure el seguimiento de prueba {#configure-the-test-monitor}

Se envía una notificación de acuerdo con el conjunto de condiciones de alerta. Use esta sección para definir cómo y qué comunicar a sus equipos.

1. Ingrese un {{< ui >}}message{{< /ui >}} o utilice mensajes de seguimiento prellenados para la prueba de la aplicación móvil. Este campo permite el [formato Markdown][5] estándar y admite las siguientes [variables condicionales][6]:

    | Variable condicional       | Descripción                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the monitor alerts.                                       |
    | `{{^is_alert}}`            | Show unless the monitor alerts.                                     |
    | `{{#is_recovery}}`         | Show when the monitor recovers from `alerta`.                          |
    | `{{^is_recovery}}`         | Show unless the monitor recovers from `alerta`.                        |
    | `{{#is_renotify}}`         | Show when the monitor renotifies.                                   |
    | `{{^is_renotify}}`         | Show unless the monitor renotifies.                                 |
    | `{{#is_priority}}`         | Show when the monitor matches priority (P1 to P5).                  |Prioridad
    | `{{^is_priority}}`         | Mostrar a menos que el seguimiento coincida con la prioridad (P1 a P5).                |

    Notification messages include the {{< ui >}}message{{< /ui >}} defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

    {{< img src="/mobile_app_testing/mobile_app_synthetic_monitor.png" alt="Sección de seguimiento de pruebas de aplicaciones móviles, que destaca los mensajes de seguimiento prellenados" style="width:100%;" >}}

    For example, to create a monitor that iterates over steps extracting variables for mobile tests, add the following to the monitor message:

      ```text
      {{! Liste las variables extraídas en todos los pasos exitosos }}
      # Variables extraídas
      {{#each synthetics.attributes.result.steps}}
      {{#if extractedValue}}
      * **Nombre**: `{{extractedValue.name}}`
      **Valor:** {{#if extractedValue.secure}}*Ofuscado (valor oculto)*{{else}}`{{{extractedValue.value}}}`{{/if}}
      {{/if}}
      {{/each}}
      ```

2. Elija los miembros del equipo y los servicios a notificar.
3. Especifique una frecuencia de renotificación. Para evitar la renotificación en pruebas fallidas, marque la opción {{< ui >}}Stop re-notifying on X occurrences{{< /ui >}}.
4. Haga clic en {{< ui >}}Save & Edit Recording{{< /ui >}} para guardar la configuración de su prueba y registrar los pasos de prueba de su aplicación móvil.

Para obtener más información, consulte [Notificaciones de Synthetic Monitoring][7].

## Inestabilidad {#flakiness}

La inestabilidad es un punto crítico en las pruebas de extremo a extremo. Las fallas en las pruebas a veces son causadas por cambios válidos en el código del frontend que afectan un identificador, no por un problema real de la aplicación.

Para evitar pruebas inestables, Datadog utiliza un algoritmo que aprovecha un conjunto de localizadores para apuntar a elementos en las pruebas de aplicaciones móviles. Un pequeño cambio en la interfaz de usuario puede modificar un elemento (por ejemplo, moverlo a otra ubicación). La prueba de la aplicación móvil localiza automáticamente el elemento de nuevo basándose en puntos de referencia que no se ven afectados por el cambio. 

Cuando la prueba se ejecuta correctamente, la prueba de la aplicación móvil vuelve a calcular (o "se autorrepara") cualquier localizador roto con valores actualizados. Esto garantiza que sus pruebas no se interrumpan por actualizaciones simples de la interfaz de usuario y que sus pruebas se adapten automáticamente a la interfaz de usuario de su aplicación móvil. 

## Ejecutar pruebas en CI {#run-tests-in-ci}

Puede ejecutar pruebas de aplicaciones móviles en una canalización de CI definiendo la opción `mobileApplicationVersionFilePath` en un [archivo de `synthetics.json` prueba][13] y un [archivo de `synthetics-ci.config` configuración global][14] según sea necesario. Las opciones del archivo de configuración global tienen prioridad sobre las opciones del archivo de configuración de prueba.

En este ejemplo, la prueba `aaa-aaa-aaa` se ejecuta con la versión de la aplicación de anulación encontrada en `application/path`.

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "aaa-aaa-aaa",
      "testOverrides": {
        "mobileApplicationVersionFilePath": "application/path"
      }
    }
  ]
}
```

Luego, ejecute `$ datadog-ci synthetics run-tests --config synthetics-ci.config`.

Para obtener más información, consulte [Continuous Testing and CI/CD][1].

## Permisos {#permissions}

De forma predeterminada, solo los usuarios con los roles Datadog Admin y Datadog Standard pueden crear, editar y eliminar pruebas de aplicaciones móviles sintéticas. Para obtener acceso para crear, editar y eliminar pruebas de aplicaciones móviles sintéticas, actualice su usuario a uno de esos dos [default roles][8].

Si está utilizando la [custom role feature][9], agregue su usuario a cualquier custom role que incluya los permisos `synthetics_read` y `synthetics_write`.

### Restringir acceso {#restrict-access}

{{% synthetics_grace_permissions %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_testing/cicd_integrations/
[2]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[3]: /es/mobile_app_testing/settings/
[4]: /es/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://daringfireball.net/projects/markdown/syntax
[6]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[7]: /es/synthetics/notifications/
[8]: /es/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[11]: /es/mobile_app_testing/mobile_app_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /es/continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /es/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
[15]: /es/real_user_monitoring/application_monitoring/
[16]: /es/synthetics/mobile_app_testing/devices
[17]: /es/synthetics/guide/mobile-test-auth-tokens/
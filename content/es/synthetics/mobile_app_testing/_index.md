---
aliases:
- /es/mobile_testing
- /es/mobile_app_testing
cascade:
  algolia:
    tags:
    - tests_móviles
description: Cree tests móviles inteligentes y automantenibles para garantizar que
  las partes más críticas de tus aplicaciones móviles se ejecutan en dispositivos
  reales.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: Blog
  text: Prácticas recomendadas para crear tests de extremo a extremo
- link: /synthetics/mobile_app_testing/mobile_app_tests
  tag: Documentación
  text: Aprenda a crear tests de aplicaciones móviles Synthetic
- link: /synthetics/mobile_app_testing/settings
  tag: Documentación
  text: Aprender a cargar tus aplicaciones móviles iOS o Android
- link: /continuous_testing/
  tag: Documentación
  text: Más información sobre tests continuos y CI/CD
title: Tests y monitorización de aplicaciones móviles
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Este sitio no admite tests de aplicaciones móviles.</div>
{{< /site-region >}}

## Información general

Los tests de aplicaciones móviles te permiten probar y monitorizar flujos (flows) de negocios clave para aplicaciones Android e iOS utilizando dispositivos reales. 
Datadog ejecuta estos tests en dispositivos reales para proporcionar una representación realista, paso a paso, de los flujos de trabajo clave de la aplicación, capturas de pantalla de cada paso y resultados detallados de tests superados o fallidos, para que tu equipo pueda visualizar rápidamente qué ha salido mal.
Los tests de aplicaciones móviles pueden ejecutarse de forma programada, bajo demanda o directamente en tus [pipelines CI/CD][1].

Puedes crear tests de aplicaciones móviles en Datadog accediendo a [**Experiencia digital** > **Nuevo test**][12] y seleccionando **Mobile Application Test** (Test de aplicaciones móviles).

{{< img src="mobile_app_testing/new_test_2.png" alt="Crear un test móvil en Synthetic" style="width:50%;">}}

### Inestabilidad

La inestabilidad es un punto sensible en los tests de extremo a extremo, ya que los tests a menudo fallan cuando el frontend genera cambios de código válidos que afectan a un identificador, en lugar de que los genere un problema real de una aplicación.

Para evitar tests defectuosos, Datadog utiliza un algoritmo que aprovecha un conjunto de localizadores que se dirigen a ciertos elementos de los tests de aplicaciones móviles. Un pequeño cambio en la interfaz de usuario puede modificar un elemento (por ejemplo, desplazándolo a otra localización). El test de aplicaciones móviles vuelve a localizar automáticamente el elemento basándose en puntos de referencia que no se han visto afectados por el cambio. 

Cuando el test se ejecuta correctamente, el test de aplicaciones móviles vuelve a calcular (o "autocura") cualquier localizador por medio de valores actualizados, lo que asegura que tus tests no se rompan tras simples actualizaciones de la interfaz de usuario y que se adapten automáticamente a la interfaz de usuario de tu aplicación móvil.

## Configuración

Define la configuración de tu test de aplicaciones móviles.

1. Selecciona una aplicación móvil en el menú desplegable. Si aún no has creado ninguna, crea una aplicación móvil en la [sección Lista de aplicaciones][2] de la [página de parámetros de Monitorización Synthetic y tests continuos][3]. 
2. Selecciona una **versión** o haz clic en **Always run the latest version** (Ejecutar siempre la última versión) para utilizar la última versión de tu aplicación móvil cada vez que se ejecute el test.
3. Añade un **nombre** para tu test.
4. Seleccione **entorno y etiquetas (tags)** adicionales, relacionados con tu test. Utiliza el formato `<KEY>:<VALUE>` para filtrar por un `<VALUE>` para una `<KEY>` concreta.
4. Selecciona los **dispositivos** en los que quieres realizar el test.
5. Configura las condiciones de reintento para tu test.
6. Define la **frecuencia de test** haciendo clic en los intervalos de tiempo básicos o personalizando la frecuencia de test y las **condiciones de alerta** para tu monitor de tests.
7. Introduce un nombre para el monitor de tests, selecciona un servicio o miembro del equipo al que notificar y añade un mensaje de notificación.

{{% synthetics-variables %}}

### Uso de variables globales

Puedes utilizar las [variables globales definidas en **Parámetros**][4] en la información **URL de inicio** y **Opciones avanzadas** de test de tu aplicación móvil, así como en la grabación del test para definir variables locales. Para mostrar una lista de las variables disponibles, escribe `{{` en el campo elegido.

Antes de empezar a grabar, define las variables que quieres incorporar al recorrido del usuario.

Puedes inyectar las variables disponibles mientras grabas. Para obtener más información sobre el uso de variables en la grabación de tests móviles, consulta [Pasos de test de aplicaciones móviles][11].

## Reintentos de tests

Puedes especificar durante cuánto tiempo debe fallar un test antes de que se active una alerta de notificación.

* Reintentar `X` veces después de `Y` ms, en caso de falla.

## Programación y alertas

Por defecto, los tests de aplicaciones móviles están configurados para tests bajo demanda, lo que significa que estos tests pueden ejecutarse [directamente en un pipeline CI](#run-tests-in-ci).

{{< img src="mobile_app_testing/alerting_rules.png" alt="Programación y condiciones de alerta de un test móvil" style="width:90%" >}}

Puedes personalizar las condiciones de alerta para definir la frecuencia con la que quieres enviar una alerta y las circunstancias en las que quieres que un test envíe una alerta de notificación.

* Se activa una alerta si falla alguna aserción durante `X` minutos.

### Configurar el monitor de tests

Se envía una notificación según el conjunto de condiciones de alerta. Utiliza esta sección para definir qué mensajes enviar a tus equipos y cómo hacerlo.

1. Introduce un **mensaje** para el test de aplicaciones móviles. Este campo permite el [formato Markdown][5] estándar y admite las siguientes [variables condicionales][6]:

    | Variable condicional       | Descripción                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`             | Mostrar cuando el monitor envía alertas.                                       |
    | `{{^is_alert}}`            | Mostrar a menos que el monitor envía alertas.                                     |
    | `{{#is_recovery}}`         | Mostrar cuando el monitor se recupera de una `alert`.                          |
    | `{{^is_recovery}}`         | Mostrar a menos que el monitor se recupere de una `alert`.                        |
    | `{{#is_renotify}}`         | Mostrar cuando el monitor vuelva a enviar una notificación.                                  |
    | `{{^is_renotify}}`         | Mostrar a menos que el monitor vuelva a enviar una notificación.                                 |
    | `{{#is_priority}}`         | Mostrar cuando el monitor coincide con la prioridad (de P1 a P5).                  |
    | `{{^is_priority}}`         | Mostrar a menos que el monitor coincida con la prioridad (de P1 a P5).                |

   Los mensajes de notificación incluyen el **mensaje** definido en esta sección e información sobre las localizaciones que fallan.

2. Selecciona los miembros del equipo y los servicios a los que notificar.
3. Especifica una frecuencia de reenvío de notificaciones. Para evitar el reenvío de notificaciones en caso de tests fallidos, deja la opción como `Never renotify if the monitor has not been resolved`.
4. Haz clic en **Save & Edit Recording** (Guardar y editar grabación) para guardar tu configuración de test y grabar los pasos de test de tu aplicación móvil.

Para obtener más información, consulta [Uso de monitores de tests Synthetic][7].

## Ejecución de tests en CI

Puede ejecutar tests de aplicaciones móviles en un pipeline CI definiendo la opción `mobileApplicationVersionFilePath` en un [archivo de test `synthetics.json`][13] y un [archivo de configuración global `synthetics-ci.config`][14], según sea necesario. Las opciones del archivo de configuración global tienen prioridad sobre las opciones del archivo de configuración de tests.

En este ejemplo, el test `aaa-aaa-aaa` se ejecuta con la versión de la aplicación anulada que se encuentra en `application/path`.

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "aaa-aaa-aaa",
      "config": {
        "mobileApplicationVersionFilePath": "application/path"
      }
    }
  ]
}
```

A continuación, ejecuta `$ datadog-ci synthetics run-tests --config synthetics-ci.config`.

Para obtener más información, consulta [Tests continuos y CI/CD][1].

## Permisos

De manera predeterminada, sólo los usuarios con los roles de administrador de Datadog y estándar de Datadog pueden crear, editar y eliminar tests de aplicaciones móviles Synthetic. Para crear, editar y eliminar tests de aplicaciones móviles Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][8].

Si estás utilizando la función [rol personalizado][9], añade tu usuario a cualquier rol personalizado que incluya permisos de `synthetics_read` y `synthetics_write`.

### Restringir el acceso

La restricción del acceso está disponible para clientes que utilizan [roles personalizados][10] en sus cuentas.

Puedes restringir el acceso a un test de aplicación móvil en función de los roles de tu organización. Al crear un test de aplicación móvil, elige qué roles (además de tu usuario) pueden leer y escribir tu test.

{{< img src="synthetics/settings/restrict_access_1.png" alt="Definir permisos para tu test" style="width:70%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_testing/cicd_integrations/
[2]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[3]: /es/mobile_app_testing/settings/
[4]: /es/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://daringfireball.net/projects/markdown/syntax
[6]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[7]: /es/synthetics/guide/synthetic-test-monitors/
[8]: /es/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[10]: /es/account_management/rbac/?tab=datadogapplication#create-a-custom-role
[11]: /es/mobile_app_testing/mobile_app_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /es/continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /es/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
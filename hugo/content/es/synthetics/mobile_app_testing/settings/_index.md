---
aliases:
- /es/mobile_testing/settings
- /es/mobile_app_testing/settings
further_reading:
- link: /synthetics/mobile_app_testing/
  tag: Documentación
  text: Aprender a crear un test móvil
- link: /continuous_testing/cicd_integrations
  tag: Documentación
  text: Ejecutar tus tests Synthetic en un pipeline CI
is_beta: true
title: Parámetros de los tests de aplicaciones móviles
---
{{< jqmath-vanilla >}}

## Información general

Gestiona tus aplicaciones móviles cargadas y tus parámetros de paralelización en la [página de parámetros de Monitorización Synthetic y tests continuos][1].

{{< img src="mobile_app_testing/applications_list_2.png" alt="Parámetros de aplicaciones móviles" style="width:100%;">}}

## Crear una aplicación

Para añadir una aplicación móvil, ve a la [pestaña **Lista de aplicaciones móviles**][5] y haz clic en **+ Create Application** (+ Crear aplicación).

{{< tabs >}}
{{% tab "Android" %}}

1. Selecciona **Android** como sistema operativo para tu aplicación móvil.
2. Ponle un nombre a tu aplicación móvil.
3. Añade etiquetas `env` y etiquetas adicionales a tu aplicación móvil. Puedes utilizar estas etiquetas para filtrar rápidamente los tests de tu aplicación móvil en la [página Monitorización Synthetic y tests continuos][101]. 
4. También puedes introducir una descripción de tu aplicación móvil.
5. Carga un [archivo `.apk`][102].
6. Introduce un nombre para la versión de tu aplicación móvil. También puedes seleccionar **Mark this version as latest** (Marcar esta versión como la más reciente).
7. Haz clic en **Create Application** (Crear aplicación).

[101]: https://app.datadoghq.com/synthetics/tests
[102]: https://developer.android.com/tools/bundletool

{{% /tab %}}
{{% tab "iOS" %}}

1. Selecciona **iOS** como sistema operativo para tu aplicación móvil.
2. Ponle un nombre a tu aplicación móvil.
3. Añade etiquetas `env` y etiquetas adicionales a tu aplicación móvil. Puedes utilizar estas etiquetas para filtrar rápidamente los tests de tu aplicación móvil en la [página Monitorización Synthetic y tests continuos][101]. 
4. También puedes introducir una descripción de tu aplicación móvil.
5. Carga un archivo `.ipa`.
6. Introduce un nombre para la versión de tu aplicación móvil. También puedes seleccionar **Mark this version as latest** (Marcar esta versión como la más reciente).
7. Haz clic en **Create Application** (Crear aplicación).

[101]: https://app.datadoghq.com/synthetics/tests

{{% /tab %}}
{{< /tabs >}}

Para editar o eliminar una aplicación móvil, sitúa el cursor sobre una aplicación móvil en la **Lista de aplicaciones móviles** y haz clic en el icono correspondiente.

**Nota**: Los tests de aplicaciones móviles no son completamente compatibles con las aplicaciones Flutter.

## Gestionar las versiones de las aplicaciones

Al hacer clic en una aplicación móvil en la **Lista de aplicaciones móviles** se muestran las versiones existentes de la aplicación. Pasa el cursor sobre una versión y haz clic en el icono **+** para [crear un test de aplicación móvil][6] con la versión de la aplicación móvil seleccionada.

Para editar o eliminar una versión de una aplicación móvil, pasa el cursor sobre una versión de la aplicación móvil y haz clic en el icono correspondiente.

### Añadir una versión

Para añadir una versión de una aplicación móvil existente:

1. Pasa el cursor sobre el icono `+` de una aplicación móvil en la **Lista de aplicaciones móviles** y haz clic en **Add new version** (Añadir nueva versión).
2. Carga un archivo [`.apk`][4] o `.ipa`.
3. Introduce un nombre de versión.
4. También puedes seleccionar **Mark this version as latest** (Marcar esta versión como la última).
5. Haz clic en **Add Version** (Añadir versión).

{{< img src="mobile_app_testing/add_new_version.png" alt="Añadir una nueva versión de la aplicación móvil" style="width:50%;">}}

## Personalizar tu paralelización

Para obtener más información sobre cómo paralelizar tests Synthetic, consulta [Parámetros de tests continuos][7].



## Permisos

De manera predeterminada, sólo los usuarios con los roles de administrador de Datadog y estándar de Datadog pueden acceder a la página de la **Lista de aplicaciones** de la monitorización Synthetic. Para acceder a la página de la **Lista de aplicaciones**, actualiza tu usuario a uno de esos dos [roles predeterminados][2].

Si estás utilizando la [función rol personalizado][3], añade tu usuario a cualquier rol personalizado que incluya permisos de `synthetics_read` y `synthetics_write`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/settings/
[2]: /es/account_management/rbac/#datadog-default-roles
[3]: /es/account_management/rbac/#custom-roles
[4]: https://developer.android.com/tools/bundletool
[5]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[6]: /es/mobile_app_testing/mobile_app_tests/
[7]: /es/continuous_testing/settings/
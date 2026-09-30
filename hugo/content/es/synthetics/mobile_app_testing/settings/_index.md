---
aliases:
- /es/mobile_testing/settings
- /es/mobile_app_testing/settings
further_reading:
- link: /synthetics/mobile_app_testing/
  tag: Documentación
  text: Aprenda a crear una prueba móvil
- link: /continuous_testing/cicd_integrations
  tag: Documentación
  text: Ejecute sus pruebas Synthetic en una canalización de CI.
is_beta: true
title: Mobile Application Testing Settings
---
{{< jqmath-vanilla >}}

## Descripción general {#overview}

Administre sus aplicaciones móviles cargadas y su configuración de paralelización en la [Synthetic Monitoring & Continuous Testing Settings page][1].

{{< img src="mobile_app_testing/applications_list_2.png" alt="Configuración de aplicaciones móviles" style="width:100%;">}}

## Cree una aplicación {#create-an-application}

Para agregar una aplicación móvil, navegue a la [{{< ui >}}Mobile Applications List{{< /ui >}} pestaña][5] y haga clic en {{< ui >}}\+ Create Application{{< /ui >}}.

{{< tabs >}}
{{% tab "Android" %}}

1. Seleccione {{< ui >}}Android{{< /ui >}} como el sistema operativo para su aplicación móvil.
2. Seleccione el marco de trabajo con el que se creó su aplicación. Los frameworks compatibles son los nativos de Android y React Native.
3. Asigne un nombre a su aplicación móvil.
4. Agregue `env` etiquetas, así como etiquetas adicionales a su aplicación móvil. Puede usar estas etiquetas para filtrar sus pruebas de aplicaciones móviles en la [Synthetic Monitoring & Continuous Testing Settings page][101]. 
5. Opcionalmente, ingrese una descripción para su aplicación móvil.
6. Cargue un [`.apk` archivo][102].
7. Ingrese un nombre para la versión de su aplicación móvil. Opcionalmente, seleccione {{< ui >}}Mark this version as latest{{< /ui >}}.
8. Haga clic en {{< ui >}}Create Application{{< /ui >}}.

[101]: https://app.datadoghq.com/synthetics/tests
[102]: https://developer.android.com/tools/bundletool

{{< img src="mobile_app_testing/settings/mobile_app_settings_android.png" alt="Cree una prueba de aplicación móvil con Android y Native (predeterminado) seleccionados" height="400px" >}}

{{% /tab %}}
{{% tab "iOS" %}}

1. Seleccione {{< ui >}}iOS{{< /ui >}} como el sistema operativo para su aplicación móvil.
2. Seleccione el marco de trabajo con el que se creó su aplicación. Los frameworks compatibles son los nativos de iOS y React Native.
3. Asigne un nombre a su aplicación móvil.
4. Agregue `env` etiquetas, así como etiquetas adicionales a su aplicación móvil. Puede usar estas etiquetas para filtrar sus pruebas de aplicaciones móviles en la [Synthetic Monitoring & Continuous Testing Settings page][101]. 
5. Opcionalmente, ingrese una descripción para su aplicación móvil.
6. Cargue un archivo `.ipa`.
7. Ingrese un nombre para la versión de su aplicación móvil. Opcionalmente, seleccione {{< ui >}}Mark this version as latest{{< /ui >}}.
8. Haga clic en {{< ui >}}Create Application{{< /ui >}}.

[101]: https://app.datadoghq.com/synthetics/tests

{{< img src="mobile_app_testing/settings/mobile_app_settings_ios.png" alt="Cree una prueba de aplicación móvil con iOS y Native (predeterminado) seleccionados" height="400px" >}}

{{% /tab %}}
{{< /tabs >}}

Para editar o eliminar una aplicación móvil, pase el cursor sobre una aplicación móvil en {{< ui >}}Mobile Applications List{{< /ui >}} y haga clic en el icono correspondiente.

<div class="alert alert-info">
  <strong>Nota</strong>: A partir de julio de 2025, las aplicaciones de React Native son oficialmente compatibles con Mobile Application Testing. No se requiere ninguna acción para las aplicaciones de React Native que se cargaron antes del soporte oficial: las pruebas continúan ejecutándose como se esperaba. Mobile Application Testing no proporciona soporte completo para aplicaciones de Flutter.
</div>

## Administrar versiones de la aplicación {#manage-application-versions}

Al hacer clic en una aplicación móvil en {{< ui >}}Mobile Applications List{{< /ui >}} se muestran las versiones existentes de la aplicación. Pase el cursor sobre una versión y haga clic en el icono {{< ui >}}\+{{< /ui >}} para [crear una prueba de aplicación móvil][6] con la versión de la aplicación móvil seleccionada.

Para editar o eliminar una versión de una aplicación móvil, pase el cursor sobre una versión en la aplicación móvil y haga clic en el icono correspondiente.

### Agregar una versión {#add-a-version}

Para agregar una versión de una aplicación móvil existente:

1. Pase el cursor sobre el icono {{< ui >}}\+{{< /ui >}} en una aplicación móvil en {{< ui >}}Mobile Applications List{{< /ui >}} y haga clic en {{< ui >}}Add new version{{< /ui >}}. 
2. Cargue un archivo [`.apk`][4] o `.ipa`.
3. Ingrese un nombre de versión. 
4. Opcionalmente, seleccione {{< ui >}}Mark this version as latest{{< /ui >}}.
5. Haga clic en {{< ui >}}Add Version{{< /ui >}}.

{{< img src="mobile_app_testing/add_new_version.png" alt="Agregar una nueva versión de una aplicación móvil" style="width:50%;">}}

## Personalice su paralelización {#customize-your-parallelization}

Para obtener más información sobre cómo paralelizar sus pruebas Synthetic, consulte [Continuous Testing Settings][7].



## Permisos {#permissions}

De forma predeterminada, solo los usuarios con los roles Datadog Admin y Datadog Standard pueden acceder a la página de Synthetic Monitoring {{< ui >}}Applications List{{< /ui >}}. Para obtener acceso a la página {{< ui >}}Applications List{{< /ui >}}, actualice su usuario a uno de esos dos [default roles][2]. 

Si está utilizando la [custom role feature][3], agregue su usuario a cualquier custom role que incluya los permisos `synthetics_read` y `synthetics_write`. 

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/settings/
[2]: /es/account_management/rbac/#datadog-default-roles
[3]: /es/account_management/rbac/#custom-roles
[4]: https://developer.android.com/tools/bundletool
[5]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[6]: /es/mobile_app_testing/mobile_app_tests/
[7]: /es/continuous_testing/settings/
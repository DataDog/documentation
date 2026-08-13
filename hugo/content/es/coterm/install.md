---
further_reading:
- link: /coterm
  tag: Documentación
  text: Datadog CoTerm
- link: /coterm/usage
  tag: Documentación
  text: Uso de CoTerm
- link: /coterm/rules
  tag: Documentación
  text: Reglas de configuración de CoTerm
title: Instalar Datadog CoTerm
---

CoTerm es compatible con macOS y Linux.

1. Instala Datadog CoTerm con Homebrew o curl:

   **brew** (sólo macOS)
   ```shell
   brew install coterm
   ```

   **curl**
   ```shell
   curl --tlsv1.2 --proto '=https' -sSf 'https://coterm.datadoghq.com/install-ddcoterm.sh' | bash
   ```

   Este comando descarga la última versión de CoTerm en `.ddcoterm/bin/ddcoterm` y actualiza tu PATH en `.bashrc` y `.zshrc`. Reinicia tu terminal o crea tu perfil. Si utilizas un shell distinto de Bash o Zsh, añade manualmente `path/to/.ddcoterm/bin` a tu PATH.

2. Si tu [sitio de Datadog][6] no es `https://app.datadoghq.com`, configura tu sitio en `.ddcoterm/config.yaml` bajo `connection_config.host`:
   ```yaml
   ...
   connection_config:
     host: {{< region-param key=dd_full_site code="true" >}}
   ...
   ```

3. Inicializa tu archivo de configuración ejecutando:

   ```shell
   ddcoterm init
   ```

   Selecciona tu configuración. Puedes cambiar estos ajustes en el [archivo`~/.ddcoterm/config.yaml` ](#configure-your-coterm-settings).

## Autorizar a CoTerm a conectarse a Datadog

Durante la inicialización, puedes elegir una de las siguientes formas de autorizar a CoTerm a acceder a tu cuenta de Datadog:
- **OAuth**: abre un navegador para que puedas iniciar sesión con OAuth.
- **Clave API + Clave de aplicación**: te pide que configures tu [clave de API de Datadog][1] y [clave de aplicación][2] en `~/.ddcoterm/config.yaml`.
- **Sólo clave de API**: te pide que introduzcas tu clave de API de Datadog en `~/.ddcoterm/config.yaml`.

<div class="alert alert-info">Si seleccionas la opción <strong>Sólo clave de API</strong>, no podrás <a href="/coterm/usage/#require-approval-for-commands">requerir aprobaciones con Case Management</a>.</div>

## Configurar tus ajustes de CoTerm

El archivo `~/.ddcoterm/config.yaml` contiene las configuraciones de CoTerm:

`process_config`
: configura CoTerm para actuar como un linter y realizar ciertas acciones cuando intercepta un comando que coincide con una regla. Consulta [Reglas de configuración de CoTerm][4].

`enable_telemetry`
: activa o desactiva el envío de telemetría a Datadog. Por defecto es `false`.

`enable_ptrace`
: activa o desactiva la monitorización del proceso basado en `ptrace` experimental en Linux. Por defecto es `false`.

`connection_config`
: 
  `host`
  : host para conectarse a Datadog. Por defecto es `https://app.datadoghq.com`.

  `port`
  : puerto para conectarse a Datadog. Por defecto es `443`.

  `api_key`
  : si no estás utilizando OAuth, tu [clave de API de Datadog][1]. Si has activado OAuth, CoTerm utiliza por defecto OAuth e ignora `api_key`.

  `app_key`
  : si no utilizas OAuth, tu [clave de aplicación de Datadog][2]. <br/>**Nota**: Para [requerir aprobaciones con Case Management][5], debes utilizar OAuth _o_ especificar tanto tu clave de API como tu clave de aplicación en este archivo.

## Siguientes pasos

- Ejecuta `ddcoterm` para iniciar una sesión de terminal grabada.
- Más información sobre [el uso de CoTerm][3].

## Desinstalar

Para desinstalar CoTerm, elimina la carpeta `.ddcoterm`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /es/coterm/usage
[4]: /es/coterm/rules
[5]: /es/coterm/usage/#require-approval-for-commands
[6]: /es/getting_started/site/
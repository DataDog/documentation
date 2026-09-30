---
description: Instale CoTerm en macOS y Linux, configure la autorización con Datadog
  y establezca sus ajustes de configuración de CoTerm.
further_reading:
- link: /coterm
  tag: documentación
  text: Datadog CoTerm
- link: /coterm/usage
  tag: documentación
  text: Uso de CoTerm
- link: /coterm/rules
  tag: documentación
  text: Reglas de configuración de CoTerm
title: Instalar Datadog CoTerm
---
CoTerm es compatible con macOS y Linux.

1. Instale Datadog CoTerm con Homebrew o curl:

   **brew** (solo macOS)
   ```shell
   brew install coterm
   ```
  
   **curl**
   ```shell
   curl --tlsv1.2 --proto '=https' -sSf 'https://coterm.datadoghq.com/install-ddcoterm.sh' | bash
   ```
   
   Este comando descarga la última versión de CoTerm a `.ddcoterm/bin/ddcoterm` y actualiza su PATH en `.bashrc` y `.zshrc`. Reinicie su terminal o ejecute 'fuente' en su perfil. Si está utilizando un shell que no sea Bash o Zsh, agregue `path/to/.ddcoterm/bin` a su PATH manualmente.

2. Si su [sitio de Datadog][6] no es `https://app.datadoghq.com`, establezca su sitio en `.ddcoterm/config.yaml` bajo `connection_config.host`:
   ```yaml
   ...
   connection_config:
     host: {{< region-param key=dd_full_site code="true" >}}
   ...
   ```

3. Initialize your configuration file by running:

   ```shell
   ddcoterm init
   ```

   Seleccione sus ajustes. Puede cambiar estos ajustes en el archivo [`~/.ddcoterm/config.yaml`](#configure-your-coterm-settings).

## Autorice a CoTerm para conectarse a Datadog {#authorize-coterm-to-connect-to-datadog}

Durante la inicialización, puede elegir una de las siguientes formas para autorizar a CoTerm a acceder a su cuenta de Datadog:
- {{< ui >}}OAuth{{< /ui >}}: Abre un navegador para que inicie sesión con OAuth.
- {{< ui >}}API Key + App Key{{< /ui >}}: Le solicita que establezca su [clave de API de Datadog][1] y su [clave de aplicación][2] en `~/.ddcoterm/config.yaml`.
- {{< ui >}}API Key Only{{< /ui >}}: Le solicita que establezca su clave de API de Datadog en `~/.ddcoterm/config.yaml`.

<div class="alert alert-info">Si selecciona la opción <strong>API Key Only</strong>, no puede <a href="/coterm/usage/#require-approval-for-commands">requerir aprobaciones con Work Management</a>.</div>

## Configure sus ajustes de CoTerm {#configure-your-coterm-settings}

El `~/.ddcoterm/config.yaml` archivo contiene sus configuraciones de CoTerm:

`process_config`
: Configure CoTerm para que actúe como un linter y realice ciertas acciones cuando intercepte un comando que coincida con una regla. Consulte [Reglas de configuración de CoTerm][4].

`enable_telemetry`
: Habilite o deshabilite el envío de telemetría a Datadog. El valor predeterminado es `false`.

`enable_ptrace`
: Habilite o deshabilite la supervisión de procesos experimental basada en `ptrace` en Linux. El valor predeterminado es `false`.

`connection_config`
: 
  `host`
  : Servidor para conectarse a Datadog. El valor predeterminado es `https://app.datadoghq.com`.

  `port`
  : Puerto para conectarse a Datadog. El valor predeterminado es `443`.

  `api_key`
  : Si no está utilizando OAuth, su [clave de API de Datadog][1]. Si ha habilitado OAuth, CoTerm utiliza OAuth de forma predeterminada e ignora `api_key`.

  `app_key`
  : Si no está utilizando OAuth, su [clave de aplicación de Datadog][2]. <br/>**Nota**: Para [requerir aprobaciones con Work Management][5], debe usar OAuth _o_ especificar tanto su clave de API como su clave de aplicación en este archivo.

## Próximos pasos {#next-steps}

- Ejecute `ddcoterm` para iniciar una sesión de terminal grabada.
- Obtenga más información sobre [cómo usar CoTerm][3].

## Desinstalar {#uninstall}

Para desinstalar CoTerm, elimine la carpeta `.ddcoterm`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /es/coterm/usage
[4]: /es/coterm/rules
[5]: /es/coterm/usage/#require-approval-for-commands
[6]: /es/getting_started/site/
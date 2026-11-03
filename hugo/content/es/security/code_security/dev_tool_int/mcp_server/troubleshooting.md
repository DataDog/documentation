---
description: Problemas comunes y soluciones para el Datadog Code Security MCP Server.
further_reading:
- link: /security/code_security/dev_tool_int/mcp_server/
  tag: Documentación
  text: Descripción general y configuración del Code Security MCP Server
- link: /security/code_security/dev_tool_int/mcp_server/tools_reference/
  tag: Documentación
  text: Referencia de herramientas
is_beta: true
title: Solución de problemas
---
Si experimenta problemas con el [Datadog Code Security MCP Server][3], utilice las siguientes soluciones para diagnosticar y resolver problemas comunes.

<div class="alert alert-info">Este servidor MCP es independiente del <a href="/mcp_server">Datadog MCP Server</a>, que proporciona acceso basado en la nube a las funciones y datos de Datadog. El Code Security MCP Server se ejecuta localmente y se centra en el escaneo de seguridad a nivel de código.</div>

## Binario no encontrado {#binary-not-found}

Si un escaneo devuelve un error sobre un binario faltante, liste todos los escáneres requeridos:

```shell
datadog-code-security-mcp version --detailed
```

Instale un binario faltante con las instrucciones en [Install security binaries][1]. Después de instalar las habilidades de agente, `dd-codesec-setup-toolchain` instala, actualiza y diagnostica los mismos binarios. Consulte [Install agent skills][4].

## Errores de autenticación {#authentication-errors}

Las claves establecidas en la configuración del servidor MCP no se exportan a su shell. `echo $DD_API_KEY` muestra solo una clave exportada en ese shell, que es lo que utiliza un comando CLI directo.

- Para el servidor MCP, confirme que `DD_API_KEY` y `DD_APP_KEY` estén configurados en la configuración del cliente en la página [Code Security MCP Server][3].
- Para un comando CLI directo, exporte `DD_API_KEY` y `DD_APP_KEY` en el mismo shell. Opcionalmente, exporte `DD_SITE`.

Si los valores están configurados pero los escaneos siguen fallando, verifique que sus claves tengan los permisos correctos. Consulte [API and Application Keys][2] para obtener más detalles.

## El servidor MCP no responde {#mcp-server-not-responding}

1. Verifique que el binario esté instalado y sea accesible:

    ```shell
    datadog-code-security-mcp version
    ```

2. Verifique los registros del servidor MCP:

    ```shell
    tail -f ~/Library/Logs/Claude/mcp*.log
    tail -f ~/.claude/logs/mcp*.log
    ```

3. Verifique que la configuración de su cliente apunte a la ruta binaria correcta. Si se instaló a través de Homebrew, el binario debería estar en su `PATH`. De lo contrario, utilice una ruta absoluta en su configuración.

## Resultados parciales {#partial-results}

Al ejecutar un escaneo integral, algunos tipos de escaneo pueden tener éxito mientras que otros fallan (por ejemplo, si solo algunos binarios están instalados). El servidor devuelve:

- Resultados de todos los escáneres exitosos.
- Mensajes de error con instrucciones de instalación para cualquier escáner que haya fallado.

Este es el comportamiento esperado. Instale los binarios faltantes y vuelva a ejecutar para obtener resultados completos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/dev_tool_int/mcp_server/#install-security-binaries
[2]: /es/account_management/api-app-keys/
[3]: /es/security/code_security/dev_tool_int/mcp_server/
[4]: /es/security/code_security/dev_tool_int/mcp_server/#install-agent-skills
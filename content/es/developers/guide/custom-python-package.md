---
aliases:
- /es/agent/custom_python_package
- /es/agent/faq/custom_python_package
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopilación de logs
- link: /infrastructure/process/
  tag: Documentación
  text: Recopilación de procesos
- link: /tracing/
  tag: Documentación
  text: Recopilar trazas
kind: documentación
title: Añadir un paquete personalizado de Python al Agent
---

{{< tabs >}}
{{% tab "Linux" %}}

El Agent tiene un entorno Python integrado en `/opt/datadog-agent/embedded/`. Los sistemas binarios comunes como `python` y `pip` se encuentran dentro de `/opt/datadog-agent/embedded/bin/`.

Los paquetes de Python pueden instalarse con el `pip` integrado:

```shell
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install <PACKAGE_NAME>
```

{{% /tab %}}
{{% tab "macOS" %}}

El Agent tiene un entorno Python integrado en `/opt/datadog-agent/embedded/`. Los sistemas binarios comunes como `python` y `pip` se encuentran dentro de `/opt/datadog-agent/embedded/bin/`.

Los paquetes de Python pueden instalarse con el `pip` integrado:

```shell
sudo /opt/datadog-agent/embedded/bin/pip install <PACKAGE_NAME>
```

{{% /tab %}}

{{% tab "Windows" %}}

Los paquetes personalizados de Python pueden instalarse utilizando Python incrustado en el Agent mediante el siguiente comando en una línea de comandos de PowerShell **elevada** (ejecutada como administrador):

En el Agent 6.12 y posteriores:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python" -m pip install <PACKAGE_NAME>
```

En el Agent 6.11 y anteriores:

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python" -m pip install <PACKAGE_NAME>
```

También se puede añadir el paquete en la carpeta de biblioteca comprimida que se encuentra en

```
%ProgramFiles%\Datadog\Datadog Agent\files
```

y luego [reinicia tu Agent][1].

{{< img src="agent/windows_python_package.png" alt="paquete de windows python" >}}

[1]: /es/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}
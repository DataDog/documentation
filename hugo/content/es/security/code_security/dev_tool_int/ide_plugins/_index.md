---
aliases:
- /es/code_analysis/ide_plugins/
description: Aprenda a configurar Datadog IDE Plugins para mejorar Code Security y
  la garantía de calidad en su entorno de desarrollo.
disable_toc: false
title: Datadog IDE Plugins para Code Security
---
## Descripción general {#overview}

[Code Security][1] se integra con VS Code, Cursor e IDEs de JetBrains para proporcionar retroalimentación en tiempo real sobre Code Security y calidad. La compatibilidad varía según el IDE:

| Capacidad | Visual Studio Code y Cursor | IDEs de JetBrains |
|---|---|---|
| [Static Code Analysis (SAST)][2] | Compatible | Compatible |
| [Software Composition Analysis (SCA)][3] | Compatible | Compatible |
| [Runtime Code Analysis (IAST)][4] | Compatible | Compatible |
| [Secret Scanning][5] | Compatible | Compatible |
| [Infrastructure as Code (IaC) Scanning][6] | Compatible | No compatible |

{{< whatsnext desc="Consulte la documentación para obtener información sobre las siguientes integraciones:">}}
    {{< nextlink href="ide_plugins/idea/" >}}<u>IDEs de JetBrains</u>: IntelliJ IDEA, GoLand, PyCharm, RubyMine, WebStorm y PhpStorm{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/" >}}<u>Visual Studio Code y Cursor</u>{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /es/security/code_security/
[2]: /es/security/code_security/static_analysis/
[3]: /es/security/code_security/software_composition_analysis/
[4]: /es/security/code_security/iast/
[5]: /es/security/code_security/secret_scanning/
[6]: /es/security/code_security/iac_security/
---
title: Datadog IDE Plugins for Code Security
description: Learn how to set up Datadog IDE plugins for enhanced code security and quality assurance in your development environment.
aliases:
    - /code_analysis/ide_plugins/
disable_toc: false
---

## Overview

[Code Security][1] integrates with VS Code, Cursor, and JetBrains IDEs to provide real-time feedback on code security and quality. Support varies by IDE:

| Capability | Visual Studio Code & Cursor | JetBrains IDEs |
|---|---|---|
| [Static Code Analysis (SAST)][2] | Supported | Supported |
| [Software Composition Analysis (SCA)][3] | Supported | Supported |
| [Runtime Code Analysis (IAST)][4] | Supported | Supported |
| [Secret Scanning][5] | Supported | Supported |
| [Infrastructure as Code (IaC) Scanning][6] | Supported | Not supported |

{{< whatsnext desc="See the documentation for information about the following integrations:">}}
    {{< nextlink href="ide_plugins/idea/code_security/" >}}<u>JetBrains IDEs</u>: IntelliJ IDEA, GoLand, PyCharm, RubyMine, WebStorm, and PhpStorm{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/code_security/" >}}<u>Visual Studio Code & Cursor</u>{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /security/code_security/
[2]: /security/code_security/static_analysis/
[3]: /security/code_security/software_composition_analysis/
[4]: /security/code_security/iast/
[5]: /security/code_security/secret_scanning/
[6]: /security/code_security/iac_security/

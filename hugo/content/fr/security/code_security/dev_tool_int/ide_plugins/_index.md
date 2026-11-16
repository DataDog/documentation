---
aliases:
- /fr/code_analysis/ide_plugins/
description: Apprenez à configurer les plugins IDE Datadog pour une sécurité du code
  et une assurance qualité renforcées dans votre environnement de développement.
disable_toc: false
title: Datadog IDE Plugins pour Code Security
---
## Présentation {#overview}

[Code Security][1] s'intègre à VS Code, Cursor et aux IDE JetBrains pour fournir des retours en temps réel sur la sécurité et la qualité du code. La prise en charge varie selon l'IDE :

| Fonctionnalité | Visual Studio Code & Cursor | IDE JetBrains |
|---|---|---|
| [Static Code Analysis (SAST)][2] | Pris en charge | Pris en charge |
| [Software Composition Analysis (SCA)][3] | Pris en charge | Pris en charge |
| [Runtime Code Analysis (IAST)][4] | Pris en charge | Pris en charge |
| [Secret Scanning][5] | Pris en charge | Pris en charge |
| [Infrastructure as Code (IaC) Scanning (IaC)][6] | Pris en charge | Non pris en charge |

{{< whatsnext desc="Consultez la documentation pour obtenir des informations sur les intégrations suivantes :">}}
    {{< nextlink href="ide_plugins/idea/" >}}<u>IDE JetBrains</u> : IntelliJ IDEA, GoLand, PyCharm, RubyMine, WebStorm et PhpStorm{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/" >}}<u>Visual Studio Code & Cursor</u>{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /fr/security/code_security/
[2]: /fr/security/code_security/static_analysis/
[3]: /fr/security/code_security/software_composition_analysis/
[4]: /fr/security/code_security/iast/
[5]: /fr/security/code_security/secret_scanning/
[6]: /fr/security/code_security/iac_security/
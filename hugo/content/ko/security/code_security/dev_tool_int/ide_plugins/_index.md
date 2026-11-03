---
aliases:
- /ko/code_analysis/ide_plugins/
description: 개발 환경에서 향상된 Code Security와 품질 보증을 위해 Datadog IDE Plugins을 설정하는 방법을 알아보세요.
disable_toc: false
title: Datadog IDE Plugins for Code Security
---
## 개요 {#overview}

[Code Security][1]는 VS Code, Cursor, JetBrains IDE와 통합되어 코드 보안 및 품질에 대한 실시간 피드백을 제공합니다. IDE별 지원 현황:

| 기능 | Visual Studio Code & Cursor | JetBrains IDEs |
|---|---|---|
| [Static Code Analysis (SAST)][2] | 지원됨 | 지원됨 |
| [Software Composition Analysis (SCA)][3] | 지원됨 | 지원됨 |
| [Runtime Code Analysis (IAST)][4] | 지원됨 | 지원됨 |
| [Secret Scanning][5] | 지원됨 | 지원됨 |
| [Infrastructure as Code (IaC) Scanning][6] | 지원됨 | 지원되지 않음 |

{{< whatsnext desc="다음 통합에 대한 자세한 정보는 설명서를 참조하세요.">}}
    {{< nextlink href="ide_plugins/idea/" >}}<u>JetBrains IDEs</u>: IntelliJ IDEA, GoLand, PyCharm, RubyMine, WebStorm, and PhpStorm{{< /nextlink >}}
    {{< nextlink href="ide_plugins/vscode/" >}}<u>Visual Studio Code & Cursor</u>{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /ko/security/code_security/
[2]: /ko/security/code_security/static_analysis/
[3]: /ko/security/code_security/software_composition_analysis/
[4]: /ko/security/code_security/iast/
[5]: /ko/security/code_security/secret_scanning/
[6]: /ko/security/code_security/iac_security/
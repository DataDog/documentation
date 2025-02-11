---
title: Code Security
disable_toc: false
aliases:
- /code_analysis/
---

Code Security scans your first-party code and open source libraries used in your applications in both your repositories and running services, providing end-to-end visibility from development to production. It encompasses the following capabilities:

- [Static Code Analysis (SAST)][1] for identifying security and quality issues in your first-party code
- [Software Composition Analysis (SCA)][2] for identifying open source dependencies in both your repositories and your services
- [Runtime Code Analysis (IAST)][3] for code-level vulnerabilities in your services

Code Security helps teams implement DevSecOps throughout the organization:
- **Developers:** early vulnerability detection, code quality improvements, faster development as developers spend less time debugging and patching.
- **Security Administrators:** enhanced security posture, improved patch management in response to early vulnerability alerts, and compliance monitoring.
- **Site Reliability Engineers (SREs):** automated security checks throughout CI/CD workflow, security compliance, and system resilience. SAST reduces manual overhead for SREs and ensures that each release is thoroughly tested for vulnerabilities.

## Static Code Analysis (SAST)
Static Code Analysis (SAST) analyzes pre-production code to identify security and quality issues. You can embed best security and development practices throughout the software development lifecycle with:
- IDE integration to flag violations in real time with deterministic suggested fixes
- In-line GitHub pull request comments with deterministic suggested fixes and incremental/diff-aware scanning
- Ability to open a pull request to fix a violation directly from Datadog 

Scans can run via your CI/CD pipelines or directly in Datadog with hosted scanning (GitHub-only).
See [Static Code Analysis Setup][6] to get started.

## Software Composition Analysis
Software Composition Analysis (SCA) analyzes open source libraries in both your repositories and running services. You can track and manage dependencies across the software development lifecycle with:
- IDE integration to flag vulnerabilities affecting libraries running on your services
- Ability to open a pull request to fix a library vulnerability directly from Datadog
- Runtime-informed prioritization of vulnerabilities with the Datadog severity score

SCA supports both static and runtime dependency detection.
For static scanning, you can scan via your CI/CD pipelines or directly via Datadog with hosted scanning (GitHub-only). See [static setup][4] to get started.
For runtime vulnerability detection, you can easily enable SCA on your services instrumented with Datadog APM. See [runtime setup][5] to get started.

## Runtime Code Analysis (IAST)
Runtime Code Analysis (IAST) identifies code-level vulnerabilities in your running services. It relies on inspection of legitimate application traffic as opposed to external testing that often requires extra configuration or periodic scheduling. IAST provides an up-to-date view of your attack surface area by:
- Monitoring your code's interactions with other components of your stack (such as libraries and infrastructure)
- Providing 100% coverage of the OWASP Top 10
- Runtime-informed prioritization of vulnerabilities with the Datadog severity score

You can enable IAST on your services instrumented with Datadog APM. See [IAST setup][3] to get started.

[1]: /security/code_security/static_analysis/
[2]: /security/code_security/software_composition_analysis/
[3]: /security/code_security/iast/
[4]: /security/code_security/software_composition_analysis/setup_static/
[5]: /security/code_security/software_composition_analysis/setup_runtime/
[6]: /security/code_security/static_analysis/setup/
[7]: /security/code_security/iast/setup/




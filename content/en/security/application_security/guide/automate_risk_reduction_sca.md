---
title: Automate open source risk reduction with Datadog SCA
disable_toc: false
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-software-composition-analysis/"
  tag: "Blog"
  text: "Mitigate vulnerabilities from third-party libraries with Datadog Software Composition Analysis"
---

Datadog Software Composition Analysis (SCA) enables you to easily identify, prioritize, and resolve vulnerabilities and other risks in the third-party, open source software (OSS) libraries used in your application services.

This topic describes how to use SCA to view and resolve vulnerabilities and risks in your open source libraries.

## Benefits of SCA

SCA addresses the following risks associated with open source libraries:

- **Security vulnerabilities:** Known vulnerabilities, particularly those with CVEs (Common Vulnerabilities and Exposures).
- **Malware:** Malicious actors using techniques like typosquatting and hijacking to distribute malware.
- **Licensing issues:** Non-compliance with varied open source licenses can lead to legal problems.
- **Deprecated libraries:** Using outdated components can introduce unpatched vulnerabilities and compatibility issues.
- **Unmaintained libraries:** Lack of active development can lead to unresolved bugs and security flaws.
- **Poor security hygiene:** Some projects lack best practices in security, such as proper code reviews.

Datadog SCA helps automate risk reduction processes, enhancing productivity in the following ways:

- **Integration across development lifecycle:** Analyzes open source and third-party components, providing a detailed library catalog.
- **Continuous evaluation:** Offers real-time visibility into deployed services, enhancing the security posture by enabling prioritization of vulnerabilities in sensitive environments.
- **Collaboration:** Breaks down silos and involves more teams in security (DevOps, Operations, SREs), fostering a culture of collaboration.


## View the libraries used in your services

The Libraries catalog displays the libraries and versions used across your services. 

The catalog surfaces all library details using several public data sources (GuardDog, NIST, osv.dev, OpenSSF scores, etc.) and private data sources (including Datadog’s Security Research group). 

To use the Libraries catalog, see [Libraries][1] or select **Security > Application Security > Catalogs > Libraries**.

{{< img src="/security/application_security/software_composition_analysis/libraries_catalog.png" alt="Libraries catalog dashboard" style="width:100%;" >}}


In the Libraries catalog, you can:

- View all of the libraries used in each of your services.
- In **View**, select **Runtime** to view libraries detected at runtime.
- In **View**, select **Static** to view libraries detected in your source code repositories.
- Use the **Vulnerability Severity** facet to filter libraries according to vulnerability rating.
- View the source repository for each library.
- See library details such as the current version used in a service and the latest version available.
- View the [OpenSSF Scorecard][2] for the library.


## View vulnerabilities and risks in libraries

In the **Vulnerabilities** explorer, you can view the vulnerabilities and risks for the libraries you are using.

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities.png" alt="Libraries vulnerabilities dashboard" style="width:100%;" >}}

### Library vulnerabilities

A library vulnerability is a security bug in a library. 

To view your library vulnerabilities, see [Library Vulnerabilities][3] or select **Security > Vulnerabilities > Library Vulnerabilities**.

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities_detail.png" alt="Libraries vulnerability example expanded in dashboard" style="width:100%;" >}}

In **Library Vulnerabilities**, you can:

- Use the **Vulnerability** facet to view different vulnerability types.
  - For example, every vulnerability has an associated CVE ID, displayed in the explorer and each library detail. You can use the Vulnerability facet to sort by CVE ID. 
- View vulnerability details like:
  - Explanation
  - Service and environment
  - First and last detection
  - Window of exposure
  - Severity breakdown
  - Remediation steps

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities_remediation_steps.png" alt="Libraries vulnerability remediation steps" style="width:100%;" >}}

### Library risks

A library's risks are a group of weaknesses that are not directly tied to security. For example, the library is deprecated, the licensing of the project is too restrictive, or the team follows poor security practices.

To view your library risks, see [Library Risks][4] or select **Security > Vulnerabilities > Library Risks**.

{{< img src="/security/application_security/software_composition_analysis/library_risks.png" alt="library risks example" style="width:100%;" >}}

In Library Risks, you can:
- In **View**, select **Runtime** to view risks detected at runtime.
- In **View**, select **Static** to view risks detected in your source code repositories.
- View risk details like:
  - Explanation
  - Service and environment
  - First and last detection
  - Window of exposure
  - Severity breakdown


## Best practices to mitigate risks

To mitigate risks, follow these best practices:

   - **Due diligence:** Evaluate open source projects thoroughly before use.
   - **Stay updated:** Regularly update components and subscribe to security advisories.
   - **Vulnerability management:** Establish processes to triage and remediate vulnerabilities.
   - **Measurement:** Track metrics to understand and improve the security posture over time.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/inventory/libraries
[2]: https://github.com/ossf/scorecard?tab=readme-ov-file#what-is-scorecard
[3]: https://app.datadoghq.com/security/appsec/vm/library
[4]: https://app.datadoghq.com/security/appsec/vm/library-risk
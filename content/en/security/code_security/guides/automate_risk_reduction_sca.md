---
title: Automate open source risk reduction with Datadog SCA
disable_toc: false
aliases:
  - /security/application_security/guide/automate_risk_reduction_sca/
---

Datadog Software Composition Analysis (SCA) enables you to identify, prioritize, and resolve vulnerabilities and other risks in the third-party, open source software (OSS) libraries used in your repositories and application services.

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

- **Integration across development lifecycle:** Analyzes open source and third-party components from development to production, providing a detailed library inventory.
- **Continuous evaluation:** Offers real-time visibility into deployed services, enhancing the security posture by enabling prioritization of vulnerabilities in sensitive environments.
- **Collaboration:** Breaks down silos and involves more teams in security (DevOps, Operations, SREs), fostering a culture of collaboration.


## View the libraries used in your services

The Libraries inventory displays the libraries and versions used across your services and repositories. 

The inventory surfaces all library details using several public data sources (such as GuardDog, NIST, osv.dev, and OpenSSF scores) and private data sources (including Datadog’s Security Research group). 

To use the Libraries inventory, see [Libraries][1] or select **Security > Code Security**, and then select **Libraries**.

In **Libraries**, you can:

- View all of the libraries used in each of your services.
- Use the **Datadog Severity** facet to filter libraries according to vulnerability rating.
- View the source repository for each library.
- See library details such as the current version used in a service and the latest version available.
- View the [OpenSSF Scorecard][2] for the library.


## View vulnerabilities and risks in libraries

In the **Vulnerabilities** explorer, you can view the vulnerabilities for the libraries you are using.

### Library vulnerabilities

A library vulnerability is a security bug in a library. 

To view your library vulnerabilities, see [Library Vulnerabilities][3] or navigate to **Security > Code Security > Vulnerabilities > Libraries**.

In **Libraries**, you can:

- Use **Libraries** to view different vulnerability types.
  - For example, every vulnerability has an associated CVE ID, displayed in the explorer and each library detail. You can use the Vulnerability facet to sort by CVE ID. 
- View vulnerability details like:
  - Explanation
  - Service and environment
  - First and last detection
  - Window of exposure
  - Severity breakdown
  - Remediation steps

<!-- ### Library risks

A library's risks are a group of weaknesses that are not directly tied to security. For example, the library is deprecated, the licensing of the project is too restrictive, or the team follows poor security practices.

To view your library risks, see [Library Risks][4] or select **Security > Inventory > Libraries**.

In **Libraries**, you can:
- In **View**, select **Runtime** to view risks detected at runtime.
- In **View**, select **Static** to view risks detected in your source code repositories.
- View risk details like:
  - Explanation
  - Service and environment
  - First and last detection
  - Window of exposure
  - Severity breakdown -->


## Best practices to mitigate risks

To mitigate risks, follow these best practices:

   - **Due diligence:** Evaluate open source projects thoroughly before use.
   - **Stay updated:** Regularly update components and subscribe to security advisories.
   - **Vulnerability management:** Establish processes to triage and remediate vulnerabilities.
   - **Measurement:** Track metrics to understand and improve the security posture over time.

[1]: https://app.datadoghq.com/security/appsec/vm/summary/sca?query=source%3Alibrary
[2]: https://github.com/ossf/scorecard?tab=readme-ov-file#what-is-scorecard
[3]: https://app.datadoghq.com/security/appsec/vm/library?query=status%3A%28Open%20OR%20%22In%20progress%22%29&group=library
[4]: https://app.datadoghq.com/security/appsec/inventory/libraries?column=uniqueVulnerabilitySeverityScore&detection=runtime&group=library-version&order=desc&page=1
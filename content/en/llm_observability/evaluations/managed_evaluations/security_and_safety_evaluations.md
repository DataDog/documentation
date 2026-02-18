---
title: Security and Safety Evaluations
description: Learn how to configure managed evaluations for your LLM applications.
further_reading:
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about LLM Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up LLM Observability"
aliases:
    - /llm_observability/evaluations/security_and_safety_evaluations
---

Security and safety evaluations help ensure your LLM-powered applications resist malicious inputs and unsafe outputs. 

#### Sensitive Data Scanning

This check ensures that sensitive information is handled appropriately and securely, reducing the risk of data breaches or unauthorized access.

{{< img src="llm_observability/evaluations/sensitive_data_scanning_4.png" alt="A Security and Safety evaluation detected by the Sensitive Data Scanner in LLM Observability" style="width:100%;" >}}

| Evaluation Stage | Evaluation Method | Evaluation Definition |
|---|---|---|
| Evaluated on Input and Output | Sensitive Data Scanner | Powered by the [Sensitive Data Scanner][1], LLM Observability scans, identifies, and redacts sensitive information within every LLM application's prompt-response pairs. This includes personal information, financial data, health records, or any other data that requires protection due to privacy or security concerns. |

[1]: /security/sensitive_data_scanner/

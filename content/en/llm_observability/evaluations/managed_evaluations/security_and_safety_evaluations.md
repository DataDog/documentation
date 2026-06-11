---
title: Sensitive Data Scanner
description: Learn how to configure managed evaluations for your LLM applications.
further_reading:
- link: "/llm_observability/terms/"
  tag: "Documentation"
  text: "Learn about Agent Observability terms and concepts"
- link: "/llm_observability/setup"
  tag: "Documentation"
  text: "Learn how to set up Agent Observability"
aliases:
    - /llm_observability/evaluations/sensitive_data_scanner
---

This check ensures that sensitive information is handled appropriately and securely, reducing the risk of data breaches or unauthorized access.

{{< img src="llm_observability/evaluations/sensitive_data_scanning_4.png" alt="A Security and Safety evaluation detected by the Sensitive Data Scanner in Agent Observability" style="width:100%;" >}}

| Evaluation Stage | Evaluation Method | Evaluation Definition |
|---|---|---|
| Evaluated on Input and Output | Sensitive Data Scanner | Powered by the [Sensitive Data Scanner][1], Agent Observability scans, identifies, and redacts sensitive information within every LLM application's prompt-response pairs. This includes personal information, financial data, health records, or any other data that requires protection due to privacy or security concerns. |

[1]: /security/sensitive_data_scanner/

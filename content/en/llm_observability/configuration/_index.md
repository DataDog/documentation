--- 
title: Configuration
description: Learn how to configure topics and evaluations for your LLM applications on the Configuration page.
further_reading: 
- link: "/llm_observability/terms/" 
  tag: "Documentation" 
  text: "Learn about Evaluations"
- link: "/llm_observability/submit_evaluations/" 
  tag: "Documentation" 
  text: "Learn how to submit Evaluations"
- link: "/llm_observability/setup" 
  tag: "Documentation" 
  text: "Learn how to set up LLM Observability"
---

## Overview

You can configure your LLM applications on the Configuration page with settings that can optimize your application's performance and security. 

Topics
: Helps identify irrelevant input for the `topic relevancy` out-of-the-box evaluation, ensuring your LLM application stays focused on its intended purpose. 

Evaluations
: Enables Datadog to assess your LLM application against respective dimensions like Quality and Security and Safety. By enabling evaluations, you can assess the effectiveness of your application's responses and maintain high standards for both performance and user safety. 

Select an LLM application set up with LLM Observability to start customizing its topics and evaluations. 

{{< img src="llm_observability/configuration.png" alt="An example of an LLM application's configuration settings in LLM Observability" style="width:100%;" >}}

Enabling any of the [out-of-the-box evaluations](#select-evaluations) outside of `Language Mismatch` shares your input and output to OpenAI. 

## Enter a topic

To enter a topic, click the Edit icon and add keywords. For example, for an LLM application that was designed for incident management, add `observability`, `software engineering`, or `incident resolution`. 

Topics can contain multiple words and should be as specific and descriptive as possible. For example, if your application handles customer inquiries for an e-commerce store, you can use "Customer questions about purchasing furniture on an e-commerce store".

## Select evaluations

To enable evaluations, click the toggle for the respective evaluations that you'd like to assess your LLM application against in the Quality and Security and Safety sections. For more information about evaluations, see [Terms and Concepts][1].

<div class="alert alert-warning">By enabling the out-of-the-box evaluations, you acknowledge that Datadog is authorized to share your company's data with OpenAI LLC for the purpose of providing and improving LLM Observability. OpenAI will not use your data for training or tuning purposes. If you have any questions or want to opt out of features that depend on OpenAI, reach out to your account representative.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /llm_observability/terms/

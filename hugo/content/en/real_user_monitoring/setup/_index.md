---
title: Setup RUM
private: true
description: "Set up Real User Monitoring: create an application, install the Datadog SDK, and enable the RUM module."
further_reading:
- link: "/real_user_monitoring/application_monitoring/browser/advanced_configuration/"
  tag: "Documentation"
  text: "Advanced Configuration"
- link: "/real_user_monitoring/guide/"
  tag: "Documentation"
  text: "RUM Guides"
---

{{< learning-center-callout header="Try \"Intro to Real User Monitoring (RUM)\" in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-rum" hide_image="false" >}}
  Learn the fundamentals of Real User Monitoring, including how to instrument your application and use RUM data to improve user experience.
{{< /learning-center-callout >}}

## Overview

Real User Monitoring (RUM) collects data about how real users experience your web and mobile applications. Set up RUM in three steps: create an application, install the Datadog SDK, and enable the RUM module to start collecting data.

## Setup steps

{{< whatsnext desc=" " >}}
    {{< nextlink href="/real_user_monitoring/setup/create_application/" >}}
    <h3>1. Create a RUM app</h3>
    Create a RUM application in Datadog to generate the application ID and client token your SDK uses to send data.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/setup/install/" >}}
    <h3>2. Install the DD SDK</h3>
    Add and initialize the Datadog SDK for your platform.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/setup/enable_rum/" >}}
    <h3>3. Enable the DD RUM module</h3>
    Enable the RUM module to start collecting sessions, errors, and performance data.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

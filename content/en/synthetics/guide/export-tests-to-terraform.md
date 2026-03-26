---
title: Export Synthetic API Tests to Terraform
description: Generate Terraform configurations from your existing Synthetic API tests.
further_reading:
- link: '/synthetics/api_tests'
  tag: 'Documentation'
  text: 'Learn about API Tests'
- link: '/synthetics/multistep'
  tag: 'Documentation'
  text: 'Learn about Multistep API Tests'
- link: 'https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test'
  tag: 'External Site'
  text: 'Manage Synthetic Tests with Terraform'
---

## Overview

You can export existing Synthetic API tests to Terraform directly from the Datadog UI. The export generates a ready-to-use `datadog_synthetics_test` resource block in HCL format and copies it to your clipboard. Paste it into your Terraform files to start managing your tests as code.

Export to Terraform is supported for the following test types:
- API tests: HTTP, SSL, DNS, TCP, UDP, ICMP, WebSocket, and gRPC
- Multistep API tests, including per-step configuration

## Export from the test details page

To export an API test from the test details page:

1. Open any API test in Synthetic Monitoring.
2. Click **More** in the upper right corner of the page.
3. Select **Export to Terraform**.

{{< img src="synthetics/guide/export-tests-to-terraform/export_to_terraform.png" alt="The More dropdown menu on the test details page with Export to Terraform highlighted" style="width:100%;" >}}

The generated HCL configuration is copied to your clipboard. Paste it into your `.tf` file as a `datadog_synthetics_test` resource.

## Export from the multistep API test recorder

To export a multistep API test while building or editing it:

1. Open or create a Multistep API test.
2. In the recorder view, click **Export to Terraform**.

{{< img src="synthetics/guide/export-tests-to-terraform/multistep_export_to_terraform.png" alt="The Export to Terraform button in the multistep API test recorder" style="width:80%;" >}}

The generated Terraform configuration is copied to your clipboard. Paste it into your `.tf` file as a `datadog_synthetics_test` resource.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

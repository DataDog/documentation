---
title: Injecting Libraries Remotely
kind: documentation
description: "Inject instrumentation libraries into Kubernetes services with remote Agent configuration"
is_beta: true
private: true

---

{{< callout url="#" btn_hidden="true">}}
Remote instrumentation is in beta. Contact your CSM or account manager if you would like to access it.
{{< /callout >}}

## Overview

To instrument your application, you can:
* **Kubernetes**: Inject the instrumentation library remotely from Datadog, as described on this page; or
* [Inject the instrumentation library locally (at the Agent)][5]; or
* [Manual adding the instrumentation library in the application][1].

To set up remote instrumentation on a Kubernetes deployment:

1. Follow the steps in [Enabling Remote Configuration][2] with an Agent of at least version 7.43.0, including adding the following to your Helm Chart:

   ```yaml
   clusterAgent:
     admissionController:
       remoteInstrumentation:
         enabled: true
   ```

2. Ensure you have the Datadog Admin Role with appropriate RBAC Permissions: `APM Remote Configuration Read` and `APM Remote Configuration Write`.

3. Navigate to **APM** --> **Setup & Configuration** --> **Service Setup** --> **Datadog Remote Instrumentation** and follow the in-app instructions to configure APM instrumentation on your Kubernetes deployed service.

   {{< img src="tracing/trace_collection/remote-instrumentation-setup-page.png" alt="Remote Instrumentation setup page" style="width:100%;" >}}

[1]: /tracing/trace_collection/
[2]: /agent/guide/how_remote_config_works/?tab=configurationyamlfile#prerequisites
[5]: /tracing/trace_collection/library_injection_local/

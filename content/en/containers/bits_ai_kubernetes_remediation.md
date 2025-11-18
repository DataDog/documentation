---
title: Bits AI Kubernetes Remediation
description: Discover and automatically remediate Kubernetes errors with Bits AI Kubernetes Remediation
further_reading:
  - link: 'https://www.datadoghq.com/blog/kubernetes-active-remediation-ai/'
    tag: 'blog'
    text: 'Accelerate Kubernetes issue resolution with AI-powered guided remediation'
---

Bits AI Kubernetes Remediation analyzes and fixes Kubernetes errors in your infrastructure.

The following Kubernetes errors are supported:
- `CrashLoopBackOff`
- `ErrImagePull`
- `ImagePullBackOff`
- `OOMKilled`
- `CreateContainerError`
- `CreateContainerConfigError`

## Usage

You can launch Bits AI Kubernetes Remediation from multiple locations within Datadog:
- **From a Kubernetes monitor**: In the _Troubleshooting_ section, select a workload under _Problematic Workloads_.
- **From [Kubernetes Explorer][2]**: Hover over a pod status with an error to see more information about the alert and the affected workload(s), and click _Start Remediation_.
- **From the [Kubernetes Remediation][1] tab**: Select a workload from the list.

Any one of these actions opens a Remediation side panel that displays:

- An AI-powered explanation for root cause, based on collected telemetry and known patterns
- Recommended next steps, which you may be able to [perform directly from Datadog](#remediate-from-datadog)
- Related information on an adjustable timeframe: recent deployments, error logs, Kubernetes events, etc., including relevant metrics based on specific issue type

{{< img src="containers/remediation/side_panel2.png" alt="Remediation side panel opened for a workload with a CrashLoopBackOff error. Displays a What Happened section with a Bits AI-powered explanation of the error's root cause. Below, a Recommended Next Steps section where the user can inspect the workload manifest. Step-by-step instructions for a suggested fix are also displayed." style="width:80%;" >}}

### Remediate from Datadog

{{< callout url="http://datadoghq.com/product-preview/bits-ai-dev-agent"
 btn_hidden="false" header="Join the Bits Dev Agent Preview!">}}
Generating pull requests requires <a href="/bits_ai/bits_ai_dev_agent"><strong>Bits Dev Agent</strong></a>, now in Preview. To sign up, click <strong>Request Access</strong> and complete the form.
{{< /callout >}}

If your repositories are [connected to Datadog][4], and an error can be fixed by changing code in one of these connected repositories, then you can use Bits AI to perform the remediation action directly from Datadog. For other problem scenarios, Bits AI provides a detailed list of remediation steps to follow.

{{% collapse-content title="Example: Increasing memory limit for a deployment" level="h4" expanded=true id="example-pr" %}}

{{< img src="containers/remediation/bitsai_action2.mp4" alt="In a Remediation side panel, the Recommended Next Steps section suggests that the user 'Increase memory limit'. The user enters a new value for the memory limit, increasing it from 10 mebibytes to 20 mebibytes. Clicking Fix with Bits AI brings up a dialog that prompts the user to select a connected repository. " video="true" style="width:80%;" >}}

When a pod is terminated because the memory usage exceeded its limit, you may be able to fix the error by increasing your container's memory limit.

1. Click **Edit Memory Limit**.
2. Adjust your limit so that it is higher than what your container normally uses.
3. Click **Fix with Bits AI**.
4. On the next page, select the repository where your deployment is defined, and review the proposed changes. Click **Fix with Bits** to create a pull request.
5. You are redirected to a Bits [Code Session][3], where you can verify that the Bits AI Dev Agent identified the specific configuration file where your memory limits are defined. Click **Create Pull Request** to initiate the creation of the pull request.
6. Click **View Pull Request** to view the pull request in GitHub.
{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/remediation
[2]: https://app.datadoghq.com/orchestration/explorer/pod
[3]: https://app.datadoghq.com/code?tab=my-sessions
[4]: https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=githubsaasonprem#connect-your-git-repositories-to-datadog
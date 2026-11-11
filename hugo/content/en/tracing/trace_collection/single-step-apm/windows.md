---
title: Single Step APM Instrumentation on Windows
code_lang: windows
type: multi-code-lang
code_lang_weight: 30
aliases: 
- /tracing/trace_collection/automatic_instrumentation/single-step-apm/windows
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

## Overview

With Single Step Instrumentation (SSI), you can enable APM for your Java and .NET applications on Windows VMs using a single Datadog Agent installation command.

{{< skill-callout
    title="Set up APM with an agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Enable APM on Windows

<div class="alert alert-info">Before proceeding, confirm that your environment is compatible by reviewing the <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI compatibility guide.</a></div>

### New Agent installation

If you don't yet have a Datadog Agent installed, follow these steps to install the Agent and enable SSI simultaneously.

You can enable APM on Windows in the following ways:
* Instrument only .NET applications on IIS
* Instrument all Java and .NET applications across your entire Windows host

{{< tabs >}}
{{% tab "IIS" %}}

To instrument only .NET applications running on IIS:

1. From an administrator PowerShell session on your Windows host, run one of the following commands. Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][2].

   Use the PowerShell installer:

   ```powershell
   [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; $env:DD_API_KEY = '<YOUR_DD_API_KEY>'; $env:DD_SITE = '{{< region-param key="dd_site" >}}'; $env:DD_APM_INSTRUMENTATION_ENABLED = 'iis'; $env:DD_APM_INSTRUMENTATION_LIBRARIES = 'dotnet:3'; (New-Object System.Net.WebClient).DownloadFile('https://install.datadoghq.com/datadog-installer-x86_64.exe', 'C:\Windows\SystemTemp\datadog-installer-x86_64.exe'); C:\Windows\SystemTemp\datadog-installer-x86_64.exe
   ```

   Alternatively, install with the MSI:

   ```powershell
   $p = Start-Process -Wait -PassThru msiexec -ArgumentList '/qn /norestart /i "https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi" /log C:\Windows\SystemTemp\install-datadog.log APIKEY="<YOUR_DD_API_KEY>" SITE="{{< region-param key="dd_site" >}}" DD_APM_INSTRUMENTATION_ENABLED="iis" DD_APM_INSTRUMENTATION_LIBRARIES="dotnet:3"'
   if ($p.ExitCode -ne 0) { Write-Host "msiexec failed with exit code $($p.ExitCode) please check the logs at C:\Windows\SystemTemp\install-datadog.log" -ForegroundColor Red }
   ```

   To install a different .NET version, change `dotnet:3`, or omit `DD_APM_INSTRUMENTATION_LIBRARIES` to install the latest.

   **Note**: The Chocolatey installation method does not preserve the SSI settings and cannot be used to enable SSI.

1. Restart the IIS applications you want instrumented. (You do not need to restart the entire IIS server.)

The Agent then automatically loads the Datadog .NET SDK into supported application processes to enable distributed tracing.

**Generate the command from Datadog**: To get a command pre-filled with your API key and site, go to [Install the Datadog Agent on Windows][1] and, in the {{< ui >}}Customize your observability coverage{{< /ui >}} section, toggle {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}. To pin the .NET SDK version, select {{< ui >}}Customize Library Versions{{< /ui >}} under {{< ui >}}Instrumentation Configuration{{< /ui >}}. Then copy and run the generated command.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}

{{% tab "Host-wide (Preview)" %}}

<div class="alert alert-info">
<strong>Join the Preview!</strong><br>
Host-wide instrumentation for Windows is in Preview and limited to Preview participants. The installation and configuration options described in this tab appear in Datadog only after you are enrolled. <a href="https://www.datadoghq.com/product-preview/single-step-instrumentation-on-windows-vms/" class="alert-link">Request access</a> to join the Preview.
</div>

To instrument Java and .NET applications across your entire Windows host:

1. In Datadog, go to [Install the Datadog Agent on Windows][1].
1. In the {{< ui >}}Customize your observability coverage{{< /ui >}} section, toggle {{< ui >}}Application Performance Monitoring (APM){{< /ui >}}.
1. (Optional) Set your SDK version:
   
   By default, Single Step Instrumentation installs the latest supported version of the Datadog .NET and Java SDK. If you need to pin a specific version:

   1. Under {{< ui >}}Instrumentation Configuration{{< /ui >}}, select {{< ui >}}Customize Library Versions{{< /ui >}}.
   1. Under .NET, choose the version you want to use.

1. Copy and run the provided installation command on your Windows host. Datadog generates this command in-app after you are enrolled in the Preview.
1. Configure instrumentation rules.

   Host-wide SSI automatically instruments all Java applications on the host and all .NET applications running in IIS. To instrument .NET applications running outside of IIS, you must [define an instrumentation rule](#define-instrumentation-rules) that allows them. You can also use instrumentation rules for granular control over which Java applications on the host or .NET applications in IIS are instrumented.

1. Restart the services you want instrumented.

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

### Existing Agent installation

If you already have a Datadog Agent installed, enable SSI remotely from Datadog. You do not need to run commands on each host.

1. In Datadog, go to [**APM > Instrument a Service**][6].
1. Under {{< ui >}}How do you want to instrument these hosts?{{< /ui >}}, select {{< ui >}}Deploy on existing hosts{{< /ui >}} to instrument your services remotely through the Datadog Agent.
1. Under {{< ui >}}Which hosts should we instrument?{{< /ui >}}, use the scope filters ({{< ui >}}Environments{{< /ui >}}, {{< ui >}}Hostname{{< /ui >}}, {{< ui >}}APM enabled{{< /ui >}}) to narrow down your hosts. Then select the Agents you want to instrument on the {{< ui >}}Eligible for deployment{{< /ui >}} tab. Hosts that can't be instrumented appear on the {{< ui >}}Excluded from deployment{{< /ui >}} tab.
1. In {{< ui >}}Configure SDKs installation{{< /ui >}}, click {{< ui >}}Yes{{< /ui >}} to have Datadog automatically install the tracing SDKs. To pin specific SDK versions instead of the latest, expand {{< ui >}}Customize library versions{{< /ui >}}.
1. In {{< ui >}}Configure rollout strategy{{< /ui >}}, choose what percentage of Agents to deploy to at a time. Datadog shows the resulting stages and an estimated duration. Deployments automatically pause if three consecutive Agents fail or if failures reach 10% of the total. You can re-run the deployment later.
1. In {{< ui >}}Review and apply APM instrumentation{{< /ui >}}, check the {{< ui >}}Configuration Summary{{< /ui >}} (toggle between {{< ui >}}Summary{{< /ui >}} and {{< ui >}}YAML{{< /ui >}}), then click {{< ui >}}Apply Instrumentation{{< /ui >}}.
1. Configure instrumentation rules.

   Host-wide SSI automatically instruments all Java applications on the host and all .NET applications running in IIS. To instrument .NET applications running outside of IIS, you must [define an instrumentation rule](#define-instrumentation-rules) that allows them. You can also use instrumentation rules for granular control over which Java applications on the host or .NET applications in IIS are instrumented.

## Verify the installation

1. From an administrator PowerShell session, confirm the Agent is healthy and the APM Agent is running:

   ```powershell
   & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
   ```

   Check the **APM Agent** section of the output.

1. After your instrumented applications receive traffic, confirm your services appear on the [APM Services page][7]. If they don't appear within a few minutes, follow the [SSI troubleshooting guide][4].

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Windows services][2].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK:

{{< ssi-products >}}

To enable products, [set environment variables][3] in your application configuration.

## Advanced options

### Define instrumentation rules

{{< site-region region="gov" >}}
<div class="alert alert-warning">Instrumentation rules are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<div class="alert alert-info">Instrumentation rules apply only to host-wide instrumentation. They are not supported for IIS-only installation.</div>
{{< /site-region >}}

Instrumentation rules let you control which processes SSI automatically instruments on Windows hosts. Each rule matches process attributes, then allows or blocks instrumentation for matching processes. Rules are required to instrument .NET applications running outside of IIS. They are also useful for granular control over which Java applications on the host or .NET applications in IIS are instrumented.

You can deploy a rule to all eligible hosts, or scope it to one or more [host groups](#create-host-groups) to limit where it applies. To view and manage instrumentation rules, go to {{< ui >}}APM{{< /ui >}} > {{< ui >}}Instrument a Service{{< /ui >}} > [{{< ui >}}Instrumentation Rules{{< /ui >}}][5].

{{< img src="tracing/trace_collection/apm-instrumentation-rules-for-hosts.png" alt="The APM Instrumentation Rules page with Hosts selected, showing the Default Behavior, Hosts in Scope, and Deployment Status cards above a list of instrumentation rules" style="width:100%;" >}}

#### Prerequisites for instrumentation rules

- **Agent**: v7.73 or later on each host, with SSI and [Remote Configuration][8] enabled. Hosts that meet these requirements are eligible for instrumentation rules.
- **Permissions**: The **APM Workload Selection Write** [permission][9], which is required to create and manage instrumentation rules and host groups.

#### Set the default behavior

The default behavior applies to processes on eligible hosts that do not match any instrumentation rule. It also applies when you have not created any rules.

1. On the [Instrumentation Rules][5] page, go to the {{< ui >}}Default Behavior{{< /ui >}} card and click {{< ui >}}Edit{{< /ui >}}.
1. Select one of the following options:
   - {{< ui >}}Allow everything else{{< /ui >}}: Supported applications are instrumented unless a rule blocks them. The exception is .NET applications running outside of IIS, which remain blocked unless a rule allows them.
   - {{< ui >}}Block everything else{{< /ui >}}: Applications are not instrumented unless a rule allows them.
1. Click {{< ui >}}Save{{< /ui >}}.

#### Create host groups

Host groups are reusable collections of hosts that you can target with instrumentation rules.

To create a host group:

1. On the [Instrumentation Rules][5] page, go to the {{< ui >}}Hosts in Scope{{< /ui >}} card and click {{< ui >}}Manage host groups{{< /ui >}}.
1. Click {{< ui >}}New Host Group{{< /ui >}} and enter a name for the group.
1. Click {{< ui >}}Add Hosts{{< /ui >}}, then search for and select the hosts to add. You can search by hostname, facets, or host tags.

   <div class="alert alert-info">Host groups are dynamic, so new hosts that match your search are added to the group automatically. A host can belong to more than one group, but all hosts in a group must run on the same platform, such as Linux or Windows.</div>

   {{< img src="tracing/trace_collection/instrumentation-rules-add-hosts.png" alt="The new host group form, with two of three hosts selected in the Add Hosts list" style="width:80%;" >}}

1. Click {{< ui >}}Save Group{{< /ui >}}.

Datadog maintains an {{< ui >}}All hosts{{< /ui >}} group automatically. It lists the eligible hosts that do not belong to any other group, so you can see which hosts are left to group. You cannot edit its host list.

If you delete a host group, Datadog removes the group's rules, and the Agent stops applying them the next time it polls Remote Configuration.

To change the order of host groups, drag a group by its handle in the group list. Group order affects [how instrumentation rules are evaluated](#how-instrumentation-rules-are-evaluated).

{{< img src="tracing/trace_collection/instrumentation-rules-host-groups.png" alt="The Host Groups page, showing a Canary group ordered above the All hosts group, with the Canary group's hosts listed" style="width:100%;" >}}

#### Create instrumentation rules

**Note**: You can use Bits AI to create instrumentation rules with natural language. In the Create instrumentation rule window, click {{< ui >}}Generate with Bits{{< /ui >}} and describe which processes to instrument. Bits AI generates the corresponding rule.

To create an instrumentation rule:

1. On the [Instrumentation Rules][5] page, click {{< ui >}}New Rule{{< /ui >}}. Alternatively, on the Host Groups page, select a group, open its {{< ui >}}Rules{{< /ui >}} tab, and click {{< ui >}}Create a new rule{{< /ui >}}.
1. Define one or more conditions, then select {{< ui >}}Block Instrumentation{{< /ui >}} or {{< ui >}}Allow Instrumentation{{< /ui >}}. See the [Define rule conditions](#define-rule-conditions) section.

   {{< img src="tracing/trace_collection/instrumentation-rules-create-rule.png" alt="The Create instrumentation rule window, with a condition of Language equals Python, the Allow Instrumentation action, and the Rule Impact Preview panel" style="width:100%;" >}}

1. Under {{< ui >}}Set host targeting{{< /ui >}}, select {{< ui >}}All eligible hosts{{< /ui >}} or {{< ui >}}Select host groups{{< /ui >}}.

   If you select more than one group, the groups share a single rule, and editing it later updates every selected group.

   {{< img src="tracing/trace_collection/instrumentation-rules-host-targeting.png" alt="The Set host targeting step, with Select host groups chosen and a host group named Test selected" style="width:80%;" >}}

1. Name the rule, then click {{< ui >}}Next{{< /ui >}}.
1. Review the rule. Datadog adds new rules to the end of each targeted group's rule list. Optionally, under {{< ui >}}Set evaluation order{{< /ui >}}, drag rules to change their order in each group. See the [How instrumentation rules are evaluated](#how-instrumentation-rules-are-evaluated) section.

   {{< img src="tracing/trace_collection/instrumentation-rules-review-order.png" alt="The rule review step, showing the rule summary and the evaluation order of rules in the Test host group" style="width:100%;" >}}

1. Click {{< ui >}}Create Rule{{< /ui >}}.

Datadog deploys rules to eligible hosts through Remote Configuration within 50 seconds. After the rules are deployed, restart the affected services for the changes to take effect. The {{< ui >}}Deployment Status{{< /ui >}} card on the [Instrumentation Rules][5] page shows how many eligible hosts have received the current rules.

To apply rules manually, such as on hosts without Remote Configuration enabled, click {{< ui >}}Export{{< /ui >}} above the rules list to export the configuration file, then apply it to your hosts.

#### How instrumentation rules are evaluated

For each process, Datadog evaluates instrumentation rules in the following order and applies the first rule that matches:

1. Rules from the groups that the process's host belongs to, in group order from top to bottom. Within each group, rules are evaluated in the order set under {{< ui >}}Set evaluation order{{< /ui >}}.
1. Rules that target {{< ui >}}All eligible hosts{{< /ui >}}. These rules apply to every eligible host, including hosts in host groups.

If no rule matches, the [default behavior](#set-the-default-behavior) applies.

#### Define rule conditions

Each rule consists of one or more conditions. A process must match all of a rule's conditions for the rule to apply. A condition includes the following elements:
- {{< ui >}}Attribute{{< /ui >}}: The process property that the rule evaluates.
- {{< ui >}}Operator{{< /ui >}}: The comparison logic (`equals`, `not equals`, `prefix`, or `contains`).
- {{< ui >}}Value{{< /ui >}}: The text or pattern to match, such as a process name or command-line flag.

Supported attributes include:
| Attribute | Description | Example |
| --------- | ----------- | ------- |
| Operating System | OS of the host. | `windows` |
| Executable | Executable name of the process. | `w3wp.exe` |
| Executable Full Path | Full path of the executable. | `C:\Windows\System32\inetsrv\w3wp.exe` |
| Arguments | Command-line arguments used to start the process. | `--env=production` |
| Working Directory | Working directory of the process. | `C:\inetpub\wwwroot` |
| Language | Programming language detected for the process. | `dotnet` |
| Entry Point File | The specific file used to launch the application. | `MyService.dll`, `app.py` |
| IIS Application Pool | The IIS application pool hosting the worker process. Because all IIS workers share the `w3wp.exe` executable, this is the most reliable way to target a specific .NET app on IIS. | `DefaultAppPool`, `MyWebApp` |

#### Example use cases

Review the following examples demonstrating how to apply instrumentation rules:

{{% collapse-content title="Example 1: Instrument all processes except specific ones" level="h5" %}}

Instrument all processes by default. Add block rules to exclude services that would add noise without value, such as analytics cron jobs and Java batch processors.

1. Set the default behavior to {{< ui >}}Allow everything else{{< /ui >}}.
1. Create the following rules, each targeting {{< ui >}}All eligible hosts{{< /ui >}}:

   | Rule name | Condition | Action |
   | --------- | --------- | ------ |
   | Exclude analytics cron job | <code>Working Directory</code> <code>contains</code> <code>analytics-service</code> | Block Instrumentation |
   | Exclude batch services | <code>Entry Point File</code> <code>contains</code> <code>batch-processor.jar</code> | Block Instrumentation |

{{% /collapse-content %}}

{{% collapse-content title="Example 2: Instrument only specific IIS applications" level="h5" %}}

Block all instrumentation by default. Add allow rules to opt specific IIS applications into APM. Because all IIS workers share the <code>w3wp.exe</code> executable, use {{< ui >}}IIS Application Pool{{< /ui >}} to identify target applications.

For example, to instrument only a checkout application and a customer portal:

1. Set the default behavior to {{< ui >}}Block everything else{{< /ui >}}.
1. Create the following rules, each targeting {{< ui >}}All eligible hosts{{< /ui >}}:

   | Rule name | Condition | Action |
   | --------- | --------- | ------ |
   | Checkout | <code>IIS Application Pool</code> <code>equals</code> <code>CheckoutPool</code> | Allow Instrumentation |
   | Customer portal | <code>IIS Application Pool</code> <code>equals</code> <code>CustomerPortalPool</code> | Allow Instrumentation |

{{% /collapse-content %}}

{{% collapse-content title="Example 3: Roll out instrumentation gradually with a host group" level="h5" %}}

Block all instrumentation by default, and allow it only on a small set of canary hosts. After you validate the results, add more hosts to the group, or change the rule to target all eligible hosts.

1. Set the default behavior to {{< ui >}}Block everything else{{< /ui >}}.
1. Create a host group named <code>canary</code> and add the hosts to instrument first.
1. Create a rule with the following settings:

   | Setting | Value |
   | ------- | ----- |
   | Condition | <code>Language</code> <code>equals</code> <code>java</code> |
   | Action | Allow Instrumentation |
   | Host targeting | Select host groups: <code>canary</code> |

Only Java applications on hosts in the <code>canary</code> group are instrumented. All other applications are not instrumented.

{{% /collapse-content %}}

## Remove Single Step APM instrumentation from your Agent

To disable SSI for .NET on your host, run:

```shell
&"C:\Program Files\Datadog\Datadog Agent\bin\datadog-installer.exe" remove datadog-apm-library-dotnet
```

## Troubleshooting

If you encounter problems enabling APM with SSI, see the [SSI troubleshooting guide][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /integrations/windows-service/#tags
[3]: /tracing/trace_collection/library_config/
[4]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[5]: https://app.datadoghq.com/apm/service-setup/workload-selection
[6]: https://app.datadoghq.com/apm/instrumentation
[7]: https://app.datadoghq.com/apm/services
[8]: /remote_configuration/
[9]: /account_management/rbac/permissions/

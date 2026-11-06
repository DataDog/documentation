---
title: Single Step APM Instrumentation on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 0
aliases:
- /tracing/trace_collection/automatic_instrumentation/single-step-apm/linux/
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
  - link: "https://www.datadoghq.com/blog/single-step-instrumentation-rules/"
    tag: "Blog"
    text: "Manage service tracing across hosts with Single Step Instrumentation rules"
---

## Overview

On a Linux host or VM, use Single Step Instrumentation (SSI) for APM to install the Datadog Agent and [instrument][14] your applications in one step, with no additional configuration required. 

{{< skill-callout
    title="Set up APM with an agent"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## Enable APM on your applications

<div class="alert alert-info">Before proceeding, confirm that your environment is compatible by reviewing the <a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI compatibility guide.</a></div>

### New Agent installation

If you don't yet have a Datadog Agent installed, install the Agent and enable SSI in one step.

1. Run the following command on your Linux host or VM:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> \
   DD_SITE="{{< region-param key="dd_site" >}}" \
   DD_APM_INSTRUMENTATION_ENABLED=host \
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][22]. The command installs or updates the Agent and the SSI packages.

   By default, SSI installs the latest SDK versions. To pin specific versions, add the `DD_APM_INSTRUMENTATION_LIBRARIES` variable with comma-separated `language:major` pairs. Available versions are listed in the source repositories for each language: [Java][8] (`java`), [Node.js][9] (`js`), [Python][10] (`python`), [.NET][11] (`dotnet`), [Ruby][12] (`ruby`), [PHP][13] (`php`).

1. Restart your applications.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

#### Generate the command from Datadog

To get a command pre-filled with your API key and site, go to the [Install the Datadog Agent on Linux][15] page and turn on {{< ui >}}Application Performance Monitoring{{< /ui >}} under {{< ui >}}Core Observability{{< /ui >}}.

{{< img src="tracing/trace_collection/enable_apm.png" alt="The 'Customize your Agent coverage' section of in-app instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
To select SDK versions from dropdowns, click {{< ui >}}Customize Library Versions{{< /ui >}}.

{{< img src="tracing/trace_collection/customize_library_versions.png" alt="The 'Customize library versions' dropdown in the instructions for installing the Datadog Agent on Linux" style="width:100%;" >}}
{{< /site-region >}}

Then copy and run the generated command.

### Existing Agent installation

If you already have a Datadog Agent installed, enable SSI remotely from Datadog. You do not need to run commands on each host.

1. In Datadog, go to [**APM > Instrument a Service**][21].

1. Under {{< ui >}}How do you want to instrument these hosts?{{< /ui >}}, select {{< ui >}}Deploy on existing hosts{{< /ui >}} to instrument your services remotely through the Datadog Agent.

1. Under {{< ui >}}Which hosts should we instrument?{{< /ui >}}, use the scope filters ({{< ui >}}Environments{{< /ui >}}, {{< ui >}}Hostname{{< /ui >}}, {{< ui >}}APM enabled{{< /ui >}}) to narrow down your hosts. Then select the Agents you want to instrument on the {{< ui >}}Eligible for deployment{{< /ui >}} tab. Hosts that can't be instrumented appear on the {{< ui >}}Excluded from deployment{{< /ui >}} tab.

1. In {{< ui >}}Configure SDKs installation{{< /ui >}}, click {{< ui >}}Yes{{< /ui >}} to have Datadog automatically install the tracing SDKs. To pin specific SDK versions instead of the latest, expand {{< ui >}}Customize library versions{{< /ui >}}.

1. In {{< ui >}}Configure rollout strategy{{< /ui >}}, choose what percentage of Agents to deploy to at a time. Datadog shows the resulting stages and an estimated duration. Deployments automatically pause if three consecutive Agents fail or if failures reach 10% of the total. You can re-run the deployment later.

1. In {{< ui >}}Review and apply APM instrumentation{{< /ui >}}, check the {{< ui >}}Configuration Summary{{< /ui >}} (toggle between {{< ui >}}Summary{{< /ui >}} and {{< ui >}}YAML{{< /ui >}}), then click {{< ui >}}Apply Instrumentation{{< /ui >}}.

## Verify the installation

1. Confirm the Agent is running:

   ```shell
   sudo datadog-agent status
   ```

1. Confirm that SSI injection is armed on the host:

   ```shell
   cat /etc/ld.so.preload && ls /opt/datadog-packages/ | grep apm
   ```

   The output lists the APM injector library in `/etc/ld.so.preload` and one or more `datadog-apm-*` packages.

1. After your applications receive traffic, confirm your services appear on the [APM Services page][23]. If they don't appear within a few minutes, follow the [SSI troubleshooting guide][19].

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Linux services][16].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK:

{{< ssi-products >}}

Use one of the following setup methods:

- **[Configure in `application_monitoring.yaml`][18]**:

  Configure products and features across all services on a host without modifying application command lines.

- **[Set environment variables][17]**:

  Enable products by setting environment variables directly in your application configuration. 

## Advanced options

### Update SDK version

The SDK version is fixed when you run the Agent installation command.

To update the SDK versions:

1. Re-run the Agent installation command. This command also updates the Agent to the latest version.
1. Restart your applications.

### Define instrumentation rules

{{< site-region region="gov" >}}
<div class="alert alert-warning">Instrumentation rules are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Instrumentation rules let you control which processes SSI automatically instruments on Linux hosts. Each rule matches process attributes, then allows or blocks instrumentation for matching processes. You can deploy a rule to all eligible hosts, or scope it to one or more [host groups](#create-host-groups) to limit where it applies.

A host is eligible for instrumentation rules when it runs Agent v7.73 or later with SSI and [Remote Configuration][24] enabled. Datadog delivers rules to eligible hosts through Remote Configuration.

To create and manage instrumentation rules and host groups, you need the **APM Workload Selection Write** [permission][25].

To view and manage instrumentation rules, go to {{< ui >}}APM{{< /ui >}} > {{< ui >}}Instrument a Service{{< /ui >}} > [{{< ui >}}Instrumentation Rules{{< /ui >}}][20]. {{< ui >}}Hosts{{< /ui >}} is selected by default in the dropdown in the page title.

{{< img src="tracing/trace_collection/apm-instrumentation-rules-for-hosts.png" alt="The APM Instrumentation Rules page with Hosts selected, showing the Default Behavior, Hosts in Scope, and Deployment Status cards above a list of instrumentation rules" style="width:100%;" >}}

#### Set the default behavior

The default behavior applies to processes on eligible hosts that don't match any instrumentation rule. It also applies when you haven't created any rules.

1. On the [Instrumentation Rules][20] page, go to the {{< ui >}}Default Behavior{{< /ui >}} card and click {{< ui >}}Edit{{< /ui >}}.
1. Select one of the following options:
   - {{< ui >}}Allow everything else{{< /ui >}}: Supported applications are instrumented unless a rule blocks them.
   - {{< ui >}}Block everything else{{< /ui >}}: Applications are not instrumented unless a rule allows them.
1. Click {{< ui >}}Save{{< /ui >}}.

#### Create host groups

Host groups are reusable collections of hosts that you can target with instrumentation rules. Use host groups to apply rules to part of your fleet, such as canary hosts for a gradual rollout.

To create a host group:

1. On the [Instrumentation Rules][20] page, go to the {{< ui >}}Hosts in Scope{{< /ui >}} card and click {{< ui >}}Manage host groups{{< /ui >}}.
1. Click {{< ui >}}New Host Group{{< /ui >}} and enter a name for the group.
1. Click {{< ui >}}Add Hosts{{< /ui >}}, then search for and select the hosts to add. You can search by hostname, facets, or host tags.

   <div class="alert alert-info">Host groups are dynamic, so new hosts that match your search are added to the group automatically. A host can belong to more than one group, but all hosts in a group must run on the same platform, such as Linux or Windows.</div>

   {{< img src="tracing/trace_collection/instrumentation-rules-add-hosts.png" alt="The new host group form, with two of three hosts selected in the Add Hosts list" style="width:80%;" >}}

1. Click {{< ui >}}Save Group{{< /ui >}}.

Datadog maintains an {{< ui >}}All hosts{{< /ui >}} group automatically. It lists the eligible hosts that don't belong to any other group, so you can see which hosts are left to group. You can't edit its host list.

To change the order of host groups, drag a group by its handle in the group list. Group order affects [how instrumentation rules are evaluated](#how-instrumentation-rules-are-evaluated).

{{< img src="tracing/trace_collection/instrumentation-rules-host-groups.png" alt="The Host Groups page, showing a Canary group ordered above the All hosts group, with the Canary group's hosts listed" style="width:100%;" >}}

#### Create instrumentation rules

**Note**: You can use Bits AI to create instrumentation rules with natural language. Click {{< ui >}}Generate with Bits{{< /ui >}} and describe which processes you want to instrument, and Bits AI generates the corresponding rule.

To create an instrumentation rule:

1. On the [Instrumentation Rules][20] page, click {{< ui >}}New Rule{{< /ui >}}. Alternatively, on the Host Groups page, select a group, open its {{< ui >}}Rules{{< /ui >}} tab, and click {{< ui >}}Create a new rule{{< /ui >}}.
1. Define one or more conditions, then select {{< ui >}}Block Instrumentation{{< /ui >}} or {{< ui >}}Allow Instrumentation{{< /ui >}}. See [Define rule conditions](#define-rule-conditions) to learn more.

   {{< img src="tracing/trace_collection/instrumentation-rules-create-rule.png" alt="The Create instrumentation rule window, with a condition of Language equals Python, the Allow Instrumentation action, and the Rule Impact Preview panel" style="width:100%;" >}}

1. Under {{< ui >}}Set host targeting{{< /ui >}}, select {{< ui >}}All eligible hosts{{< /ui >}} or {{< ui >}}Select host groups{{< /ui >}}.

   If you select more than one group, the groups share a single rule, and editing it later updates every selected group.

   {{< img src="tracing/trace_collection/instrumentation-rules-host-targeting.png" alt="The Set host targeting step, with Select host groups chosen and a host group named Test selected" style="width:80%;" >}}

1. Name the rule, then click {{< ui >}}Next{{< /ui >}}.
1. Review the rule. Datadog adds new rules to the end of each targeted group's rule list. Optionally, under {{< ui >}}Set evaluation order{{< /ui >}}, drag rules to change their order in each group. See [How instrumentation rules are evaluated](#how-instrumentation-rules-are-evaluated).

   {{< img src="tracing/trace_collection/instrumentation-rules-review-order.png" alt="The rule review step, showing the rule summary and the evaluation order of rules in the Test host group" style="width:100%;" >}}

1. Click {{< ui >}}Create Rule{{< /ui >}}.

Datadog deploys rules to eligible hosts through Remote Configuration within 50 seconds. After the rules are deployed, restart the affected services for the changes to take effect. The {{< ui >}}Deployment Status{{< /ui >}} card on the [Instrumentation Rules][20] page shows how many eligible hosts have received the current rules.

To apply rules manually instead, click {{< ui >}}Export{{< /ui >}} above the rules list to export the configuration file, then apply it to your hosts.

#### How instrumentation rules are evaluated

For each process, Datadog evaluates instrumentation rules in the following order and applies the first rule that matches:

1. Rules from the host's groups, in group order from top to bottom. Within each group, rules are evaluated in the order set under {{< ui >}}Set evaluation order{{< /ui >}}.
1. Rules that target {{< ui >}}All eligible hosts{{< /ui >}}. These rules apply to every eligible host, including hosts in host groups.
1. If no rule matches, the [default behavior](#set-the-default-behavior) applies.

#### Define rule conditions

Each rule consists of one or more conditions. A process must match all of a rule's conditions for the rule to apply. A condition includes the following elements:
- {{< ui >}}Attribute{{< /ui >}}: The process property that the rule evaluates.
- {{< ui >}}Operator{{< /ui >}}: The comparison logic (`equals`, `not equals`, `prefix`, or `contains`).
- {{< ui >}}Value{{< /ui >}}: The text or pattern to match, such as a process name or command-line flag.

Supported attributes include:
| Attribute | Description | Example |
| --------- | ----------- | ------- |
| Operating System | OS of the host. | `linux` |
| Executable | Executable name of the process. | `python3.11` |
| Executable Full Path | Full path of the executable. | `/usr/bin/python3.11` |
| Arguments | Command-line arguments used to start the process. | `--env=production` |
| Working Directory | Working directory of the process. | `/app` |
| Language | Programming language detected for the process. | `python` |
| Entry Point File | The specific file used to launch the application. | `app.py`, `server.js` |

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

{{% collapse-content title="Example 2: Instrument only specific processes" level="h5" %}}

Block all instrumentation by default. Add allow rules to opt specific processes into APM. This approach gives you precise control.

For example, to instrument only a checkout service and a customer portal:

1. Set the default behavior to {{< ui >}}Block everything else{{< /ui >}}.
1. Create the following rules, each targeting {{< ui >}}All eligible hosts{{< /ui >}}:

| Rule name | Condition | Action |
| --------- | --------- | ------ |
| Checkout service | <code>Working Directory</code> <code>equals</code> <code>/srv/checkout</code> | Allow Instrumentation |
| Customer portal | <code>Working Directory</code> <code>equals</code> <code>/srv/customer-portal</code> | Allow Instrumentation |

{{% /collapse-content %}}

{{% collapse-content title="Example 3: Roll out instrumentation gradually with a host group" level="h5" %}}

Block all instrumentation by default, and allow it only on a small set of canary hosts. After you validate the results, add more hosts to the group, or change the rule to target all eligible hosts.

1. Set the default behavior to {{< ui >}}Block everything else{{< /ui >}}.
1. Create a host group named <code>canary</code> and add the hosts to instrument first.
1. Create a rule with the following settings:

| Setting | Value |
| ------- | ----- |
| Condition | <code>Language</code> <code>equals</code> <code>python</code> |
| Action | Allow Instrumentation |
| Host targeting | Select host groups: <code>canary</code> |

Python applications on hosts in the <code>canary</code> group are instrumented. Applications on all other eligible hosts remain uninstrumented.

{{% /collapse-content %}}

## Remove Single Step APM instrumentation from your Agent

To stop producing traces for all services on your infrastructure:

1. Run:
   ```shell
   dd-host-install --uninstall
   ```
2. Restart the services on the host or VM.

## Troubleshooting

If you encounter problems enabling APM with SSI, see the [SSI troubleshooting guide][19].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[16]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#non-containerized-environment
[17]: /tracing/trace_collection/library_config/
[18]: /tracing/trace_collection/library_config/application_monitoring_yaml/
[19]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[20]: https://app.datadoghq.com/apm/service-setup/workload-selection
[21]: https://app.datadoghq.com/apm/instrumentation
[22]: https://app.datadoghq.com/organization-settings/api-keys
[23]: https://app.datadoghq.com/apm/services
[24]: /agent/remote_config/
[25]: /account_management/rbac/permissions/

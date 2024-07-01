---
title: Fine-tuning CSM Threats Security Signals
aliases:
  - /security_platform/cloud_workload_security/guide/tuning-rules/
  - /security_platform/cloud_security_management/guide/tuning-rules/
---

## Overview 

Cloud Security Management Threats (CSM Threats) monitors suspicious activity occurring at the workload level. However, in some cases, benign activities are flagged as malicious because of particular settings in the user's environment. When a benign expected activity is triggering a signal, you can suppress the trigger on the activity to limit noise. 

This guide provides considerations for best practices and steps for fine-tuning signal suppression.

## Suppression strategy

Before suppressing benign patterns, identify common characteristics in signals based on the type of detection activity. The more specific combinations of attributes are, the more precise the suppression is.

From a risk management perspective, suppressing based on fewer attributes increases the possibility of tuning out actual malicious activities. To fine-tune effectively and without losing coverage of any malicious behaviors, consider the following list of common key attributes, categorized by activity types:

### Process activity

Common keys:
- `@process.args`
- `@process.executable.name`
- `@process.group`
- `@process.args`
- `@process.envs`
- `@process.parent.comm`
- `@process.parent.args`
- `@process.parent.executable.path`
- `@process.executable.user`
- `@process.ancestors.executable.user`
- `@process.ancestors.executable.path`
- `@process.ancestors.executable.envs`

To determine if a process is legitimate, review its parent process in the process tree. The process ancestry tree traces a process back to its origin, providing context for its execution flow. This helps in understanding the sequence of events leading up to the current process.

Usually, it's sufficient to suppress based on both the parent process and on unwanted process attributes.

Example combination:
- `@process.args`
- `@process.executable.group`
- `@process.parent.executable.comm`
- `@process.parent.executable.args`
- `@process.user`

If you decide to suppress on a wide time frame, avoid using processes that have arguments with temporary values because the suppression stops being effective when the value changes.

For example, certain programs when rebooting or executing use temporary files (`/tmp`). Building suppressions based on these values isn't effective in the event a similar activity is detected.

Suppose you want to completely suppress noise of all signals from a particular activity on a container. You choose the full command within the process tree that initiates the process to spin up the container. While executing, the process accesses files which exist for as long as the container exists. If the behavior you intend to target is instead tied to your workload logic, the suppression definition based on ephemeral process instances becomes ineffective for tuning out similar activities on other containers.

### File activity

Refine your file activity-related suppression based on attributes that reflect identifying information about your workloads, the file in question, and the process that is accessing the file.

Common keys:
- Workload tags:
  - `kube_container_name`
  - `kube_service`
  - `host`
  - `env`
- Process:
  - `@process.args`
  - `@process.executable.path`
  - `@process.executable.user`
  - `@process.group`
  - `@process.args`
  - `@process.parent.comm`
  - `@process.parent.args`
  - `@process.parent.executable.path`
  - `@process.user`
- File:
  - `@file.path` 
  - `@file.inode`
  - `@file.mode`

To determine an actual malicious activity while inspecting a signal, validate if the context in which the process is accessing and modifying the file is expected. To avoid suppressing intended behaviors on files across all of your infrastructure, you should always have a combination that gathers all relevant context information from the common keys listed above.

Example combination: 
  - `@process.args`
  - `@process.executable.path`
  - `@process.user`
  - `@file.path`
  - `kube_service `
  - `host`
  - `kube_container_name`

### Network DNS based activity

Network Activity Monitoring checks DNS traffic and aims to detect suspicious behaviors which can compromise your network of servers. While checking for queries made to your DNS server by certain IPs, it can trigger on benign access from a known set of IP addresses, such as Private Network IPs or Cloud Network IPs.

Common keys:
- Process:
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- Network/DNS related:
  - `@dns.question.name`
  - `@network.destination.ip/port`
  - `@network.ip/port`

Whenever a local application makes connections to resolve a DNS name, the first characteristics you are looking to check are the list of IPs that instigated the lookup as well as the DNS query.

Example combination:
  - `@network.ip/port`
  - `@network.destination.ip/port`
  - `@dns.question.*`

### Kernel activity

With kernel related signals, noise usually comes from your workload logic or vulnerabilities associated with a certain kernel version. Consider the following attributes before deciding what to suppress:

Common keys:
- Process
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- File
  - `@file.path `
  - `@file.inode`
  - `@file.mode`

Defining a combination for this type of activity is similar to file or process activities, with some additional specificity tied to the system call used for the attack. 

For example the Dirty Pipe exploitation is a privilege escalation vulnerability. Since it becomes critical if local users escalate their privileges on the system leveraging this attack, it makes sense to suppress noise created from root users running expected processes. 
- `@process.executable.user`
- `@process.executable.uid`

Additionally you might notice that signals are created even when some of your machines are running patched kernel versions (for example, Linux versions 5.16.11, 5.15.25, and 5.10 that are patched for Dirty Pipe vulnerability). In this case, add a workload level tag such as `host`, `kube_container_name`, or `kube_service` to the combination. However, when you use a workload level attribute or tag, be aware that it applies to a wide range of candidates which decreases your detection surface and coverage. To prevent that from happening, always combine a workload level tag with process or file based attributes to define a more granular suppression criteria.

## Adding a suppression from the signal

When you are in the process of investigating a potential threat reported by CSM Threats detection rules, you can encounter some signals that alert on known benign behaviors that are specific to your environment.  

Consider a Java process utility exploitation. An attacker intentionally targets vulnerabilities in your application code that runs Java processes. This kind of attack entails persistent access to your application by spawning its own Java shell utility. 

In some cases, CSM Threats rules might also detect expected activity, for example from your security team running a pentest session to evaluate the robustness of your applications. In this case, you can evaluate the accuracy of alerts reported and suppress noise.

Open the signal details side panel and navigate from one tab to the other to gain context, including key process metadata like command-line arguments and environment variable keys. For containerized workloads, the information includes the relevant image, pod, Kubernetes cluster, and more.

{{< img src="/security/cws/guide/cws-tuning-rules.png" alt="A signal side-panel showing events, logs, and other data related to a signal." width="75%">}}

To define suppression criteria, click on any attribute value and select **Never trigger signals for**.

In this example, assess whether the use of these environment variables were actually preceded by actions that escalated privileges within the process ancestry tree. Tags can indicate where in your infrastructure the action occurred and help in decreasing its severity. With all of this information, you can decide to tune out the rule on any process that has inherited these environment variables.

If you do decide to tune down a rule, the combination of certain attributes in your signals improves your suppression precision. It's usually best to use the following common keys, which increase suppression effectiveness:

- `@process.parent.comm`: The context in which the process responsible for the signal was called. This key helps you assess whether its execution was expected. Usually, the parent process contextualizes the execution and so is a good candidate to tune out similar benign behaviors.
- `@process.parent.path`: Similarly, adding the parent process's corresponding binary path complements the suppression by specifying its location.
- `host`: If the host in question is not running in a vulnerable environment, for example, a staging environment, you could suppress signals from being triggered whenever events come from it.
- `container.id`: Suppressing becomes more efficient if attributes related to your workloads are also in the mix. If you are aware that a container is dedicated to a benign activity, add its name or ID to substantially decrease noise.
- `@user.id`: If you have identified a user as a known member of your team, you can suppress activity related to that user.

For additional granularity, the following attributes provide information about past processes when reassembling the execution chain. They can be found under the prefix `@process.ancestors.*`:
- `file.name`
- `args`
- `file.path`

## Adding a suppression from the rule editor

Signals surface relevant context within security alerts. Although event data can be leveraged for suppression filters, the observability data that the detection rule is built on may offer a better tuning candidate.

In CSM Threats, the runtime Agent logs are generated from collected kernel events. You can preview the logs from the signal side-panel without context switching. 

1. Go to your chosen signal details side-panel and click the Events tab. 
2. Click **View in Log Explorer** to navigate to Log Management, which displays the full list of logs that instigate this signal.
   Because there can be many logs, the signal side-panel combines these logs and their shared attributes into a JSON structure.
3. Go back to the Events tab and scroll to the end of the panel. Expand the JSON dropdown to access all log attributes contained in runtime Agent events.
4. Identify key-value pairs to suppress signals by common keys, including `@process.args`, `@process.group`, `@process.ancestors.comm`, or `@process.ancestors.args`.
5. Open the rule in the Rule editor and in the **Exclude benign activity with suppression queries**. Add the list of key-value pairs that you identified as helpful.

For example, suppose you have a `Java process spawned shell/utility` rule that you want to suppress for the following combination of attributes:
- `@process.args:+x`
- `@process.executable.group:exec`
- `@process.ancestors.executable.comm:root`
- `@process.ancestors.executable.args:init`

Enter these key values under **This rule will not generate a signal if there is a match** to suppress undesired signals.

If, on the other hand, you want to fire signals under specific conditions by identifying the right set of attributes, specify the combination **Only generate a signal if there is a match**.



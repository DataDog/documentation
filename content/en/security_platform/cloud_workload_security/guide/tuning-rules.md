---
title: Fine-tuning CWS security signals
kind: guide
---

## Overview	

Datadog Cloud Workload Security monitors suspicious activity occurring at the workload level. However in some cases, benign activities are flagged as malicious because of particular settings in the user's environment. When a benign expected activity is triggering a signal, you can suppress the trigger on the activity to limit noise. 

This guide provides considerations for best practices and steps for fine-tuning signal suppression.

## Suppression strategy

Before suppressing benign patterns, identify common characteristics in signals depending on the type of detection activity. The more specific combinations of attributes are, the more precise the suppression is.

From a risk management perspective, suppressing based on fewer attributes widens the possibility of tuning out actual malicious activities. To fine-tune effectively and without losing coverage of any malicious behaviors, consider the following list of common key attributes, categorized by Activity types:

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

When evaluating if a process is legitimate, checking past processes can help you contextualize its execution flow. To do so, the ancestry process tree traces back the process to its origin.

Usually, it's sufficient to suppress based on both the parent process and the unwanted process attributes.

Combination:
- `@process.args`
- `@process.executable.group`
- `@process.parent.executable.comm`
- `@process.parent.executable.args`
- `@process.user`

If you decide to suppress on a wider time window, avoid using processes that have arguments with temporary values because the suppression stops being effective when the value changes.

For example certain programs when rebooting or while executing, can use temporary files (`/tmp`). Building suppressions based on these values isn't effective in the event a similar activity is detected.

Suppose you want to completely suppress noise of a specific container activity. You decide to choose a command line based on the initialization of the container in question. While executing, the process is going to access files which remain for as long as the container lives. If the behavior you are targeting is actually tied to your workload logic, the suppression process becomes inconsistent for tuning out similar activities.

### File activity

When it comes to abnormal file activity, refine your suppression based on attributes that reflect identifying information on your workloads, the file in question, and the process that is accessing the file.

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

To determine an actual malicious activity while inspecting a signal, validate if the context in which the process is accessing and modifying the file is expected. To avoid suppressing intended behaviors on files across all of your infrastructure, you should always have a combination that gathers the above information.

Combination: 
  - `@process.args`
  - `@process.executable.path`
  - `@process.user`
  - `@file.path`
  - `kube_service `
  - `host`
  - `kube_container_name`

### Network DNS based Activity

Network Activity Monitoring checking DNS traffic aims to detect any suspicious behaviors which can compromise the overall network of your servers. While checking for queries made to your DNS server by certain IPs, it can sometimes trigger on benign access from a known set of IP addresses. For instance Private Network IPs or Cloud Networks IPs.

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

Combination:
  - `@network.ip/port`
  - `@network.destination.ip/port`
  - `@dns.question.*`

### Kernel activity

With kernel related signals, noise usually comes from your workload logic or vulnerabilities associated with a certain kernel version. In that sense there are a few attributes to have a look at before deciding what to suppress.

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

Defining a combination for this type of activity is similar to File or Process activities, with some additional specificity tied to the system call used for the attack. 

For example the dirty pipe exploitation is a privilege escalation vulnerability. Since it becomes critical if local users escalate their privileges on the system leveraging this attack, it makes sense to suppress noise created from root users running expected processes. 
- `@process.executable.user`
- `@process.executable.uid`

Additionally you might notice that signals are created even when some of your machines are running patched kernel versions (Linux versions 5.16.11, 5.15.25, and 5.10 that are patched for Dirty Pipe vulnerability). In this case, add to the combination a workload level tag such as `host`, `kube_container_name` or `kube_service`. However when you use a workload level attribute or tag, please be aware that it applies to a wide range of candidates, decreasing your detection surface and coverage. To prevent that from happening, always combine a workload level tag with process or file based attributes to define more granular suppression criteria.

## Adding a suppression from the signal

When investigating a potential threat reported by our CWS Detection rules, some signals are alerting on known benign behaviors that are specific to your environment.  

Let’s consider a Java process utility exploitation - an attacker would intentionally target vulnerabilities in your application code running Java processes. This kind of attack entails persistent access to your application by spawning its own Java shell utility. 

In some cases, we may detect expected activity from your security team’s workloads, for example,  a pentesting session to evaluate the robustness of your applications. 
In this case, you can easily evaluate the accuracy of alerts reported to your internal teams.

When opening our signal side-panel, you can navigate from one tab to the other to gain context, including key process metadata like command-line arguments, environment variable keys, and, for containerized workloads, the relevant image, pod, Kubernetes cluster, and more.

{{< img src="/security_platform/cws/guide/cws-tuning-rules.png" alt="A signal side-panel showing events, logs, and other data related to a signal." width="75%">}}

Define suppression criteria by clicking on any attribute value and selecting `Never trigger signals for`.

In this example, assess whether the use of these environment variables were actually preceded by actions that escalated privileges within the Process Ancestry Tree. Tags on the other hand can help identify where in your infrastructure the action occurred and thus, help in decreasing its severity.

With all this information, you can decide to tune out the rule on any process that has inherited these environment variables.

If you do decide to tune out a rule, some attributes in your signals combined greatly improve your suppression precision. It's usually best to use the following common keys as they increase effectiveness in the suppression:

- `@process.parent.comm`: The context, in which the process responsible for the signal was called, helps assess whether its execution was expected. Usually the parent process contextualizes the execution hence represents a good candidate to tune out any similar benign behaviors.
- `@process.parent.path`: Similar to the above, adding the parent process corresponding binary path compliments the suppression by specifying its location.
- `host`: If the host in question is actually not running in a vulnerable environment, for example, a staging environment, you could suppress signals from being triggered whenever events come from the latter.
- `container.id`: Suppressing becomes more efficient if attributes related to your workloads are also in the mix. If you are aware that a container is dedicated to a benign activity, adding its name or ID allows it to decrease substantially the load of signals.
- `@user.id`: If you have identified a user as a known member of your team, you could suppress any related activity.

For additional granularity, there are attributes which provide information about each past process when reassembling the execution chain. Those can be found under the prefix `@process.ancestors.*`. Common useful keys would be:
- `file.name`
- `args`
- `file.path`

## Adding a suppression from the rule editor

Signals are meant to surface relevant context within security alerts. Although Event data can be leveraged for suppression filters, the observability data the detection rule is built on may offer a better tuning candidate.

In Cloud Workload Security, the runtime Agent logs are generated from collected kernel events. You can preview logs from the signal side-panel without context switching. 

1. Go to your chosen signal and click the Events tab. 
2. Click **View in Log Explorer** to be navigate to Log Management, which displays the full list of logs that instigate this signals.
   As the amount of logs can be a bit overwhelming to consult one by one, the signal side panel offers a way to marshall these logs and their shared attributes into a JSON.
3. Go back to the Event tab and scroll all the way to the end of the panel. Expand the JSON dropdown, to access all log attributes contained in runtime Agent events.
4. Identify key-value pairs to suppress signals by common keys, including `@process.args`, `@process.group`, `@process.ancestors.comm`, or `@process.ancestors.args`.
5. Open the rule in the Rule editor and in the **Exclude benign activity with suppression queries**, add queries.

For example, suppose you have a `Java process spawned shell/utility` rule that you want to suppress for the following combination of attributes:
- `@process.args:+x`
- `@process.executable.group:exec`
- `@process.ancestors.executable.comm:root`
- `@process.ancestors.executable.args:init`

Enter these key values under **This rule will not generate a signal if there is a match** to suppress undesired signals.

If, on the other hand, you want to fire signals under specific conditions by identifying the right set of attributes, specify the combination **Only generate a signal if there is a match**.

## Adding a suppression from the facet list 


TKTK

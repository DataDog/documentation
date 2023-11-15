---
title: Workload Security Profiles
kind: documentation
aliases:
  - /security/cloud_workload_security/security_profiles
further_reading:
  - link: "/security/threats/setup"
    tag: "Documentation"
    text: "Setting Up CSM Threats"
  - link: "/security/threats/workload_security_rules"
    tag: "Documentation"
    text: "Managing CSM Threats Detection Rules"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workload Security Profiles are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Workload Security Profiles provides a baseline of expected workload activity through a behavioral learning model that helps identify potential threats or misconfigurations. This insight can be used when investigating security alerts, including [generating suppression suggestions](#suppress-signals-based-on-suggestions) for known, acceptable workload behavior, as well as identifying previously unseen, anomalous behavior.

## Compatibility

For Workload Security Profiles to be compatible with your Datadog configuration, you must have [Cloud Security Management Threats enabled][1], use Datadog Agent 7.44 or later, and have activity snapshots enabled. Workload Security Profiles are enabled by default and support containerized workloads only.

## How Workload Security Profiles are generated

Workload Security Profiles are generated when [activity snapshots](#activity-snapshots) from containers sharing a common image name and image version tag are merged together to form a security profile. A different security profile is generated for each version of a container image. As a result, one profile is generated per `{ image-name, image-version}` tag combination.

Each security profile acts as a [behavior model](#behavior-learning-model) for a given workload image to identify known, acceptable behavior.

### Activity snapshots

Activity snapshots are the building blocks of Workload Security Profiles. Each snapshot captures kernel-level activity on a container, including process, network, and file access details. This information is collected by the Agent in 30 minute (default) intervals and sent to the Datadog backend.

When activity snapshots are enabled in the Agent configuration, the Agent automatically generates snapshots for any running containers, including those already running when you start the Agent. It also captures snapshots for any new containers in your cloud native environments using the Linux kernel control groups or cgroups.

Each Agent can profile multiple containers on the host system simultaneously. To minimize performance overhead, no more than five (default) containers are profiled at any given time.

The following diagram shows a high-level representation of how activity snapshots from multiple containers are merged into a single Workload Security Profile. The commonality score represents how likely a given process or file activity is normal, known behavior.

{{< img src="security/cws/security_profiles/security-profiles-diagram.png" alt="CSM Threats Security Profiles page with auto-generated security profiles" width="50%">}}

### Behavior learning model

A Workload Security Profile is a behavior model for a specific workload image and image version. Capturing and comparing activity snapshots from individual containers enables each security profile to provide a model of the aggregate workload behavior of similar containers. As more containers are profiled, this representation results in a more precise behavior model for a specific workload. Since containerized workloads are expected to be immutable, there should be few variations between workloads that share common image name and image version tags.

A visual representation of the behavior model, including process nodes and file and network activity relationships is shown on the [security profile details page](#explore-security-profiles). The profile visualization displays how consistent or common these relationships are across the various containers that have been profiled.

#### Profile status

A security profile can have one of two possible statuses:

- **Learning**: The security profile is still being modeled from activity snapshots collected by the Agent from different containers in the cloud infrastructure. These containers can exist in different hosts and environments with a common image name and image version tag.
- **Stable**: A specified activity snapshot threshold has been reached in terms of the number of snapshots received or elapsed time since the first activity snapshot was processed. The current default thresholds are 200 snapshots and 2 days (48 hours), whichever threshold is reached first.

Once a profile is in a Stable status, it becomes immutable and no further activity is added until a new version and profile is created. In contrast, when a profile is in a Learning status, additional activity is processed and commonality scores updated.

## Explore security profiles

Security profiles generated by CSM Threats are displayed on the [Security Profiles][2] page, grouped by image name. Click an image name to see the full list of security profiles associated with the image, including different image versions or image tags. Details shown for each security profile include the number of activity snapshots that were merged to create the profile, the status of the behavior learning model, and the date on which the profile was last updated.

{{< img src="security/cws/security_profiles/security-profiles.png" alt="CSM Threats Security Profiles page with auto-generated security profiles" width="100%">}}

Select a security profile to view its details page. Explore the processes that make up the security profile, view related security signals, observability status of infrastructure containers tagged with the image name, and the activity snapshots that were used to create the profile.

### Commonality score

The **Behavior Commonality** scores exist at both the overall security profile level, as well as for individual process, file, and network DNS activity levels. The profile-level percentage is the aggregate level similarity for all activity snapshots that were used to construct the security profile behavior model.

{{< img src="security/cws/security_profiles/security-profile.png" alt="CSM Threats security profile details page" width="100%">}}

When you select a process node, additional commonality scores are displayed on the side panel that show how common the individual process executions, file access, and network requests are across the different containers that make up the security profile.

In general, the higher the commonality score, the more likely that a given process or file activity is normal, known behavior. Commonality percentages may fluctuate during the learning stage as more activity snapshots are merged into the profile, but should remain consistent once the security profiles reaches a stable state. Releasing a new version of a workload image restarts the learning cycle and resets the commonality score as a new profile is created.

### Security signals side panel

Security profile details also appear in the signal panel in the [Threats Explorer][3]. You can use this information to better understand the workload activity and potentially help distinguish between potential threats and normal workload behavior. You can also navigate directly to the relevant security profile using the **View Security Profile** link. 

{{< img src="security/cws/security_profiles/signal-security-profile.png" alt="CSM Threats security profile page" width="80%">}}

## Suppress signals based on suggestions

If a signal matches known workload behavior for a security profile, a suppression suggestion is displayed on the security signal side panel. You can view the corresponding security profile and the process triggering the signal before choosing whether to accept the suggestion.

To accept the suggestion, click **Suppress Signals**, then click **Add Suppression to Rule**. This creates a suppression query for the rule which prevents the process from triggering future security signals.

{{< img src="security/cws/security_profiles/suppression-suggestion.png" alt="The security signal panel showing a suppression suggestion" width="80%">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threats/setup
[2]: https://app.datadoghq.com/security/workload/profiles
[3]: /security/threats/security_signals
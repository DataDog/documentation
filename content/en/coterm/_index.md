---
title: Datadog CoTerm
description: "Record terminal sessions, analyze them in Datadog, and protect against dangerous terminal commands with CoTerm's validation layer."
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-coterm/"
  tag: "Blog"
  text: "Livestream, record, and log terminal sessions with Datadog CoTerm"
---

Datadog CoTerm is a CLI utility that can record terminal sessions and add a layer of validation to your terminal commands.

{{< img src="coterm/hero.png" alt="In Datadog, a page titled Terminal Session. An embedded video showing a terminal session. A scrubber bar controls video playback." style="width:100%;" >}}

With CoTerm, you can:

- **Record terminal sessions and analyze these recordings in Datadog**. 

   Investigating terminal sessions provides context about how system and security incidents were caused and remediated.
- **Protect against the accidental execution of dangerous terminal commands**.

   CoTerm can intercept terminal commands and warn you before you execute a risky command. For even more oversight, you can use CoTerm with [Datadog Case Management][3] to require approvals for particularly impactful commands.

For your security, CoTerm uses [Sensitive Data Scanner][2] to detect and obfuscate sensitive data, such as passwords and API keys.

## Get started

{{< whatsnext desc="This section contains the following pages:">}}
  {{< nextlink href="/coterm/install">}}<u>Installation</u>: Install CoTerm and authorize it to access your Datadog account.{{< /nextlink >}}
  {{< nextlink href="/coterm/usage">}}<u>Usage</u>: Use the CoTerm CLI, set up automatic recording, and safeguard against dangerous commands. {{< /nextlink >}}
  {{< nextlink href="/coterm/rules">}}<u>Configuration Rules</u>: Set highly configurable rules for how CoTerm handles specific commands.{{< /nextlink >}}
{{< /whatsnext >}}

## Review terminal sessions in Datadog

You can review your recorded terminal sessions and process data in Datadog:

- **As replays**: Watch [terminal sessions][6] in a video-like player.
- **As events**: In [Event Explorer][4], each recorded command appears as an event.
- **As logs**: In [Log Explorer][5], you can perform full-text searches and queries of terminal sessions as multi-line logs.

## Known limitations

- The maximum duration of a recorded session is approximately 24 hours.
- [Sensitive data redaction][2] can fail if the sensitive data is spread across multiple lines.
- On Linux, `seccomp`-based tracing prevents you from elevating your permissions during a recording.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /security/sensitive_data_scanner/
[3]: /incident_response/case_management/
[4]: http://app.datadoghq.com/event/explorer?query=source%3Acoterm_process_info
[5]: https://app.datadoghq.com/logs?query=service%3Addcoterm
[6]: https://app.datadoghq.com/terminal-streams
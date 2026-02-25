---
title: Live Call Routing
aliases:
- /service_management/on-call/triggering_pages/live_call_routing/
further_reading:
- link: '/incident_response/On-Call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

<div class="alert alert-info">
Live call routing is provisioned by Datadog. To enable it for your organization, contact your account manager or <a href="mailto:support@datadoghq.com">Datadog Support</a>. Include your use case and the country and country code where you need the number provisioned (for example, <code>+1</code>, United States).
</div>


## Overview

Live call routing connects phone calls to your On-Call team. When someone calls your dedicated number, the system handles the call according to your configuration. 

Datadog On-Call supports two routing types:

- **Direct call routing**: Connects the caller to an active responder, following the escalation policy for the On-Call team. Enables real-time coordination during critical incidents.
- **Voicemail routing**: Prompts the caller to leave a voicemail, then converts the voice message to a page for the On-Call team. Useful for non-technical callers or third-party vendors who need to report issues without a live conversation.

## Configuration

### Basic route settings

Each live call route includes:

- **Name**: A descriptive label, such as "Production Incidents" or "Security Escalations."
- **Phone Number**: The dedicated number provisioned by Datadog for this route.
- **Region Code**: The geographic region for the phone number (for example, `US` for the United States).
- **Active Status**: Whether the route is accepting calls.
- **Routing Type**: How calls are handled (see [Routing types](#routing-types)).

### Keypad options

Keypad options offer callers a menu when they dial your routing number. 

You can configure up to nine options per route. Each option maps a key (1-9) to an On-Call team and triggers that team's paging process. To improve usability:
- Use option 1 for the most critical team or escalation path.
- Group related teams under adjacent keys.
- Keep menu prompts concise and clear.

## Routing types

Datadog On-Call supports two routing types: direct call routing and voicemail routing. 

### Direct call routing

In direct call routing, the system follows the On-Call team's escalation policy to connect the caller to the first available responder.

Responders must have valid phone numbers in their profiles; On-Call skips any responders that don't.

Responders then have the following options:
- Press `1` to acknowledge the call.
- Press `2` to escalate it.
- Press `3` to resolve it.

#### Escalation logic

For direct call routing, escalation proceeds as follows:

- **Multiple responders at the same level**: All responders are called simultaneously. The first to answer is connected.
- **Responder rejects a call**: The system immediately escalates to the next responder.
- **Responder has no phone number**: The system skips the responder.
- **Only one escalation level is defined**: If the responder is unreachable, the caller is informed that no one is available, and the call ends.
- **No responders have valid phone numbers**: The caller is informed that no one is available, and the call ends.

#### Best practices

- Use multi-level escalation policies to avoid dropped calls.
- Add multiple responders at critical levels for redundancy.
- Test your routing setup regularly:
  - Test each keypad option to verify it routes to the correct team.
  - Simulate escalation behavior by rejecting or not answering a call.
  - Check that responders' phone numbers are valid, reachable, and configured with appropriate voicemail settings.
  - Verify that calls successfully connect to available responders.

### Voicemail routing 

In voicemail routing, callers are prompted to leave a message. The message is transcribed and sent as a page to the On-Call team.

#### Best practices

- Confirm team members have notification preferences configured to receive pages.
- Test your routing setup regularly:
  - Test each keypad option to verify it routes to the correct team.
  - Confirm that voicemail recordings are properly captured and transcribed.
  - Verify that pages are created and sent to the correct team members.

## Troubleshooting

### Route issues

If your route isn't accepting calls:
- Confirm the route is set to active.
- Confirm that provisioning is complete. If provisioning is still in progress, contact [Datadog Support][1].
- Verify the phone number is correctly configured for this route.

### Keypad problems

If a keypad option is not routing calls correctly:
- Confirm each keypad option is linked to a valid On-Call team.
- Test each option individually by dialing the route and pressing the corresponding key.
- Verify that your phone system supports DTMF (touch-tone) input, as some VoIP systems disable it by default.

### Direct call routing: calls not connecting or no page created

If calls are not reaching a responder or no page is created:
- Confirm that the On-Call team has an active escalation policy with at least one escalation level defined.
- Verify that all responders in the escalation policy have a valid phone number in their profile. On-Call skips responders without a phone number.
- Check that each responder's phone number is reachable and not blocked or forwarded to an unavailable destination.
- Confirm that each team member has notification preferences configured to receive pages.

### Voicemail routing: voicemail not converting to a page

If a voicemail is left but no page is created:
- Confirm the route's routing type is set to **Voicemail routing**, not **Direct call routing**.
- Verify the On-Call team assigned to the route has an active escalation policy.
- Confirm that team members have notification preferences configured to receive pages.
- Check that the voicemail recording completed successfully. Callers who hang up before the beep may not leave a recording that the system can process.

[1]: /help/

---
title: Live Call Routing
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

<div class="alert alert-info">
Live call routing is a feature that must be provisioned by Datadog. If you are interested in enabling live call routing for your organization, please reach out to your account manager or [support@datadoghq.com](mailto:support@datadoghq.com). When contacting support, be sure to include your use case and specify the country code where you need the phone number to be provisioned (for example, `+1` for the US).
</div>

## Overview

Live call routing transforms your phone into a direct gateway to your On-Call teams. When you call your dedicated phone number, the system routes your call according to your configured routing type and keypad options, ultimately triggering the paging process for the appropriate team to ensure urgent matters reach the right responders immediately.

## Configuration

### Basic Route Settings

Each live call route includes the following core attributes:

- **Name**: Use clear, descriptive names like "Production Incidents" or "Security Escalations" that help team members quickly identify the route's purpose
- **Phone Number**: Your dedicated phone number provisioned by Datadog that callers use to reach your on-call team
- **Region Code**: The geographic region where your phone number is provisioned (for example, "US" for United States)
- **Active Status**: Controls whether the route accepts incoming calls - inactive routes provide callers with an appropriate message
- **Routing Type**: Determines how the system handles incoming calls (see routing types below)

### Routing Types

#### Voicemail Routing
When you configure voicemail routing, callers leave detailed voice messages that the system converts into Pages, triggering the paging process for your designated On-Call team. This works well when you need detailed context about incidents or when callers may not be familiar with your escalation procedures.

### Keypad Options

Keypad options provide callers with interactive menu choices when they call your live routing number. Structure these options logically - reserve option 1 for the most critical escalation path, group related teams under consecutive numbers, and keep menu options concise.

Each keypad option connects to specific On-Call teams, triggering the paging process for the designated team when selected. You can configure up to 9 keypad options based on your team structure.

## Call Handling and Escalation

When a caller selects a keypad option, the system identifies the on-call responder(s) for the selected team and calls their configured phone number. Understanding how the system handles various scenarios helps you configure your teams for optimal incident response.

### Responder Requirements

For live call routing to work effectively, ensure your on-call responders have valid phone numbers configured in their profiles. Responders without phone numbers are automatically skipped during escalation. 

**Important**: Configure responder phones to ring for at least 4-6 rings before voicemail activates. If a responder's personal voicemail picks up immediately, the system treats this as an answered call, connecting the caller to personal voicemail instead of continuing escalation.

### Escalation Logic

The system handles escalation intelligently based on responder availability:

- **Multiple responders at the same level**: The system rings all responders simultaneously. The first to pick up receives the call, and others stop ringing immediately.
- **Call rejection**: When a responder actively rejects a call, the system immediately escalates to the next responder without waiting for the escalation timeout.
- **Missing phone numbers**: The system skips responders without configured phone numbers and moves to the next available responder.
- **Single-level policies**: If your escalation policy has only one level and that responder is unreachable, the system routes to voicemail after the escalation timer expires.
- **No valid phone numbers**: If no responders in the entire escalation policy have valid phone numbers, the call immediately routes to voicemail.

### Team Structure Recommendations

Design escalation policies with multiple levels to ensure coverage, and configure multiple responders at critical escalation levels for redundancy. This prevents calls from going directly to voicemail when single responders are unavailable.

## Testing and Validation

Regularly test your live call routing setup by calling your dedicated number to verify routing works correctly. Test each keypad option to ensure proper team routing, and confirm voicemail functionality captures and converts messages appropriately.

Test escalation scenarios by having responders not answer or reject calls to verify proper escalation behavior. Validate that all configured responder phone numbers are reachable and properly configured with appropriate voicemail settings.

## Troubleshooting

### Route Issues
If your route isn't accepting calls, verify it's active and provisioning has completed successfully. Confirm your phone number is correctly configured.

### Keypad Problems
Ensure keypad options are properly linked to valid On-Call Teams and test each option individually. Verify your phone system supports DTMF (touch-tone) input.

### Escalation Issues
If calls aren't reaching responders, check that on-call responders have valid phone numbers configured and are actually on-call during the time period. Verify escalation timeouts are set appropriately (typically 2-5 minutes).

If callers reach personal voicemail instead of the system, responders need to configure their phones to ring longer before voicemail activates or use dedicated on-call phone numbers without personal voicemail.

### Voicemail Conversion
If voicemail isn't converting to Pages, check that your routing type is set to "voicemail," verify the connected On-Call team is properly configured, and ensure team members have valid notification preferences configured to receive pages.




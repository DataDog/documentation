---
title: Modifying On-Call Rotations (Temporary Leave and Rotation Changes)
aliases:
- /service_management/on-call/guides/modify-on-call-rotations/
further_reading:
- link: "/incident_response/"
  tag: "Documentation"
  text: "Incident Response"
- link: "/incident_response/on-call/"
  tag: "Documentation"
  text: "On-Call"
- link: "/incident_response/on-call/schedules/"
  tag: "Documentation"
  text: "Schedules"
---

On-call rotations change as teams evolve. People go on vacation, take extended leave, or move to different teams. This guide explains how to safely modify Datadog On-Call schedules without creating coverage gaps, unexpected escalations, or misaligned rotation cycles.

A single user can appear in multiple schedules (for example, a weekday rotation and a weekend rotation, or schedules for different teams). When modifying a rotation for a user, review **all schedules they belong to**, not just their primary one.

This guide shows you how to:

- Use overrides for short-term absences
- Clone and adjust rotation layers for longer changes
- Remove someone from a rotation permanently
- Truncate a rotation cycle safely
- Validate changes before they go live

## Quick decision guide

| Scenario | Recommended approach | Why |
|---|---|---|
| Short PTO (1–2 weeks) | Use overrides | Minimal disruption; rotation resumes automatically |
| Multi-month leave | End the layer and create a new one | Avoid large override stacks; maintain deterministic ordering |
| Permanent removal | End the layer and create a new one | Preserves historical integrity |
| One-time shift swap | Override the specific shift | Quick, reversible |
| Truncating a rotation cycle | Create a new layer with remaining members | Prevents misaligned recomputation |

## Scenario 1: Short-term leave (1–2 weeks)

For brief absences like vacation or personal leave, overrides are the most straightforward option. Overrides replace the assigned responder during a specific time window without altering the underlying rotation structure.

### Steps

1. Go to [**On-Call** > **Schedules**][1].
1. Open the schedule containing the rotation.
1. Select the shift and click **Override**.
1. Choose the covering responder.
1. Set the start and end time.
1. Repeat as needed.

Overrides can also be requested from Slack or Microsoft Teams using `/dd override`.

### Using overrides

When creating an override, you must choose how it applies:

- **Only Shifts From 1 User**: Replaces shifts assigned to a specific user within the selected time window. Use this when one person is unavailable (for example, PTO) and other users in the rotation should remain unaffected. If the time range spans multiple of their shifts, all of those shifts are replaced.
- **All Shifts**: Replaces any shift that falls within the selected time range, regardless of which user was scheduled. Use this when you want a single person to cover the entire period or the override spans multiple users' shifts.

To set the time window:

1. Go to [**On-Call** > **Schedules**][1].
1. Open the schedule.
1. Click a shift and select **Override**.
1. Choose either **Only Shifts From 1 User** or **All Shifts**.
1. Select the covering responder.
1. Set the **From** and **To** date and time.
1. Click **Override**.

The override applies to all computed shifts within that time window based on the option you selected.

### When to use overrides

- Absence is fewer than two weeks.
- Only a small number of shifts are affected.
- The underlying rotation should resume automatically.

### Risks to watch for

- Forgetting to override one shift leaves the original person on-call.
- Overrides do not automatically extend into future cycles.
- Stacked overrides can make schedule behavior harder to reason about.

### Validation

After creating overrides:

- Review the **Preview** section in the schedule editor.
- Confirm the **Final** row shows the expected responder.
- Verify continuous coverage with no unintended gaps.
- Check that the correct responder appears across shift boundaries.

## Scenario 2: Long-term leave (multiple months)

For extended leave, overrides become difficult to manage. Instead, create a new rotation layer.

### Steps

1. Go to [**On-Call** > **Schedules**][1] and open the relevant schedule.
1. Note the current layer configuration (members, shift length, timezone, handoff time).
1. Set an **End time** on the existing layer aligned with the next handoff boundary.
1. Create a new layer with identical configuration but without the absent member.
1. Set the new layer's **Start time** to exactly match the old layer's end time.
1. If the person returns later, repeat the process to reintroduce them in a future layer.

### Why this approach works

- Keeps ordering deterministic.
- Avoids excessive override stacking.
- Preserves historical layer integrity.
- Makes future reinstatement predictable.

### Aligning with shift boundaries

Always align transitions with a handoff time (for example, 09:00 UTC Monday). Misaligned boundaries create partial shifts or brief coverage gaps.

## Scenario 3: Permanent removal

When someone permanently leaves a rotation, do not edit the existing layer directly.

### Why not edit a live layer?

Rotations are anchored to a start date. The schedule engine calculates shifts forward using:

- Start date
- Shift length
- Member order

Editing a live layer causes the engine to recompute future shifts and may alter how historical shifts appear in reporting and audit views.

To preserve historical accuracy, end the existing layer and create a new one.

### Steps

1. Go to [**On-Call** > **Schedules**][1] and open the relevant schedule.
1. End the current layer at the next shift boundary.
1. Create a new layer excluding the removed member.
1. Match the new layer start time to the old layer end time.
1. Validate the next two to three rotation cycles.
1. Update any [escalation policies][2] referencing the user directly.

### After removal

- Confirm the removed person does not appear in future shifts.
- Validate ordering of remaining members.
- Review [escalation policies][2].
- Adjust notification preferences if necessary. See the [offboarding guide][3] for details.

## Scenario 4: Truncating a rotation cycle

Removing a member shortens the rotation cycle.

**Before:**

A → B → C → D (4-week cycle)

**After:**

A → C → D (3-week cycle)

If you edit the existing layer's member list, the engine recalculates the entire future sequence based on the original start date. This can shift assignments to unexpected dates.

### Steps

1. Go to [**On-Call** > **Schedules**][1] and open the relevant schedule.
1. End the current layer at the next handoff boundary.
1. Create a new layer with the remaining members in the desired order.
1. Set its start time equal to the previous layer's end time.
1. Preview multiple future cycles.

This ensures a predictable sequence from that point forward.

### Why this matters

Rotations are deterministic: the schedule engine computes shifts based on the layer's start date, shift length, and member list. Changing the member list on an existing layer shifts the entire sequence, because the engine redistributes members across the same timeline. A new layer with a known start date gives you a predictable sequence from that point forward.

## Scenario 5: Safely modifying a live rotation

Before making structural changes, understand these principles:

- **Rotations are anchored to a start date.** The engine calculates future shifts by counting forward from the layer's start date using the shift length and member order.
- **The engine computes shifts deterministically.** Editing a layer's members or shift length causes the engine to recompute everything from the start date.
- **Overlapping active layers create ambiguity.** If two layers are active during the same time window, the schedule engine evaluates them in layer order. Only the highest-priority active layer determines the effective on-call responder, but lower layers may still generate computed shifts in previews and reports.
- **Timezone mismatches create gaps.** If a new layer uses a different timezone than the schedule, handoff times might not align, creating brief windows with no coverage.

Always ensure the old layer's end time exactly matches the new layer's start time.

## Validation checklist

Before completing changes:

- [ ] New layer start aligns with a shift boundary.
- [ ] Old layer end time matches new layer start exactly.
- [ ] **Final Schedule** view shows correct coverage for the next two to three cycles.
- [ ] No unintended layer overlap exists.
- [ ] No override stacking remains.
- [ ] [Escalation policies][2] remain valid.
- [ ] All [schedules][1] the user belongs to are updated.
- [ ] Notification settings are correct.

## Common pitfalls

- **Editing historical layers**: Modifying an existing layer changes computed past shifts. Always create a new layer for future changes.
- **Misaligned transition times**: If the new layer's start date does not align with a handoff boundary, you get a partial shift at the transition point.
- **Leaving overlapping layers active**: Forgetting to set an end time on the old layer results in two layers generating shifts simultaneously.
- **Forgetting escalation policies**: [Schedules][1] feed into [escalation policies][2]. If you remove someone from a schedule, check whether they are also referenced directly in an escalation policy.
- **Forgetting other schedules**: A user can belong to multiple [schedules][1]. If you only update one, the user still appears in their other rotations.
- **Uneven load redistribution**: Removing a member from a rotation increases the on-call burden for remaining members. Communicate changes to the team and consider adjusting shift lengths if needed.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/schedules
[2]: /incident_response/on-call/escalation_policies/
[3]: /incident_response/on-call/guides/offboarding-teams-and-users/

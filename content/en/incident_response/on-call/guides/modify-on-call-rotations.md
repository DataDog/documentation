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

On-call rotations change as teams evolve. People go on vacation, take extended leave, or move to different teams. This guide covers how to handle these situations in Datadog On-Call without creating coverage gaps or misaligning future shifts.

This guide shows you how to:

- Use overrides for short-term absences
- Clone and adjust rotation layers for longer changes
- Remove someone from a rotation permanently
- Truncate a rotation cycle after removing a member
- Validate changes before they go live

## Quick decision guide

Use the following table to determine the right approach for your situation:

| Scenario | Recommended approach | Why |
|---|---|---|
| Short PTO (1–2 weeks) | Override individual shifts | Minimal disruption; the rotation resumes automatically |
| Multi-month leave | Clone the layer and remove the user | Overrides are impractical at scale; a new layer keeps things clean |
| Permanent removal | Clone the layer and remove the user | Preserves historical records while adjusting future shifts |
| One-time shift swap | Override the specific shift | Quick, reversible, and does not affect the underlying rotation |
| Truncating a rotation cycle | Clone the layer with remaining members | Prevents shift misalignment caused by removing a user mid-cycle |

## Scenario 1: Short-term leave (1–2 weeks)

For brief absences like a vacation or a few personal days, overrides are the most straightforward option. An override replaces the absent person on specific shifts without changing the underlying rotation.

### Steps

1. Go to [**On-Call** > **Schedules**][1].
1. Open the schedule containing the affected rotation.
1. Select the shift you want to override and click **Override**.
1. Choose who covers the shift and set the start and end times.
1. Repeat for each shift during the absence.

You can also request overrides directly from Slack or Microsoft Teams using `/dd override`. This sends a message to the channel so teammates can volunteer to cover the shift.

[//]: # (GIF: Creating a user override for a single shift)

### When to use this approach

- The absence is fewer than two weeks.
- Only a small number of shifts need to be covered.
- You want the original rotation to resume automatically after the absence.

### Risks to watch for

- If you forget to override a shift, the absent person remains on-call for that period.
- Overrides do not propagate to future rotation cycles. If the absence spans a cycle boundary, you need overrides in both cycles.

### Validation

After creating overrides, check the schedule's **Final Schedule** view to confirm:
- Every shift during the absence is covered.
- No gaps exist between overrides.
- The correct person is assigned to each overridden shift.

## Scenario 2: Long-term leave (multiple months)

For absences lasting several weeks or months, managing individual overrides becomes impractical. Instead, clone the rotation layer and remove the absent person from the new layer.

### Steps

1. Go to [**On-Call** > **Schedules**][1] and open the relevant schedule.
1. Note the current layer's configuration: members, shift length, handoff time, and any conditions.
1. Set an **End time** on the existing layer. Choose a time that aligns with the next shift boundary (for example, the next handoff time).
1. Create a new layer with the same settings, but exclude the absent person from the **Members** list.
1. Set the new layer's **Starts** date to match the old layer's end time exactly.
1. If the person returns on a known date, set an **End time** on the new layer and create a third layer that includes them again.

[//]: # (GIF: Cloning a layer and removing a user)

### Why this approach works

- Avoids dozens of individual overrides.
- Keeps rotation order deterministic for the remaining members.
- Makes it straightforward to reinstate the person when they return.

### Aligning with shift boundaries

When you set the old layer's end time and the new layer's start time, align both with a handoff time. If your rotation hands off at 09:00 UTC every Monday, end the old layer and start the new one at 09:00 UTC on a Monday. Misaligned boundaries create partial shifts or brief coverage gaps.

## Scenario 3: Permanent removal from a rotation

When someone permanently leaves a rotation—due to a team change, offboarding, or role shift—avoid editing the existing layer directly. Historical layers serve as a record of past on-call assignments and are useful for auditing and post-incident reviews.

### Steps

1. Go to [**On-Call** > **Schedules**][1] and open the relevant schedule.
1. Set an **End time** on the current layer, aligned to the next shift boundary.
1. Create a new layer with the same configuration, excluding the removed person.
1. Set the new layer's **Starts** date to match the old layer's end time.
1. Check the schedule's **Final Schedule** view and verify the next two to three rotation cycles.
1. Update any [escalation policies][2] that reference the removed person directly (not through a schedule).

[//]: # (GIF: Removing a user from a rotation safely)

### Why not edit the existing layer

Editing a live layer changes computed past shifts, which can affect:
- Post-incident reviews that reference who was on-call at a given time.
- Audit trails that depend on historical schedule data.
- Shift analytics and reporting.

Creating a new layer preserves the historical record while applying the change going forward.

### After removal

- Verify the removed person does not appear in future shifts.
- Check that the rotation order among remaining members is correct.
- If the person was also listed individually in escalation policies, update those policies.
- Review the person's notification preferences if they are leaving On-Call entirely. See the [offboarding guide][3] for details.

## Scenario 4: Truncating a rotation cycle

Removing a member from a rotation shortens the cycle. For example, a four-person rotation with weekly shifts has a four-week cycle. Removing one person changes it to a three-week cycle.

**Before:**

A → B → C → D (4-week cycle)

**After:**

A → C → D (3-week cycle, B removed)

If you remove B by editing the existing layer, the rotation engine recalculates all future shifts from the layer's original start date. This can cause shifts to land on unexpected dates and people.

[//]: # (Diagram: Rotation sequence before and after truncation)

### Steps

1. Set an **End time** on the current layer, aligned to the next handoff time.
1. Create a new layer with the remaining members (A, C, D) in the desired order.
1. Set the new layer's **Starts** date to match the old layer's end time.
1. Preview the next two to three cycles to confirm the order and timing are correct.

### Why this matters

Rotations are deterministic: the schedule engine computes shifts based on the layer's start date, shift length, and member list. Changing the member list on an existing layer shifts the entire sequence, because the engine redistributes members across the same timeline. A new layer with a known start date gives you a predictable sequence from that point forward.

## Scenario 5: Safely modifying a live rotation

Before making any change to a live rotation, understand how the schedule engine works:

- **Rotations are anchored to a start date.** The engine calculates future shifts by counting forward from the layer's start date using the shift length and member order.
- **Changes affect all computed future shifts.** Editing a layer's members or shift length causes the engine to recompute everything from the start date.
- **Overlapping layers cause double coverage.** If a new layer's time range overlaps with an existing layer, lower layers take precedence, but higher layers still generate shifts. This can cause unexpected pages.
- **Timezone mismatches create gaps.** If a new layer uses a different timezone than the schedule, handoff times might not align, creating brief windows with no coverage.

### Validation checklist

Before finalizing changes to a rotation:

- [ ] The new layer's start date aligns with the next shift boundary.
- [ ] The old layer's end time matches the new layer's start time exactly.
- [ ] The **Final Schedule** view shows correct coverage for the next two to three cycles.
- [ ] No coverage gaps exist between the old and new layers.
- [ ] Escalation policies referencing the schedule are still valid.
- [ ] Notification preferences for affected members are up to date.

## Common pitfalls

- **Editing historical layers**: Modifying an existing layer changes computed past shifts. Always create a new layer for future changes.
- **Misaligned start dates**: If the new layer's start date does not align with a handoff boundary, you get a partial shift at the transition point.
- **Overlapping layers**: Forgetting to set an end time on the old layer results in two layers generating shifts simultaneously.
- **Forgetting escalation policies**: Schedules feed into escalation policies. If you remove someone from a schedule, check whether they are also referenced directly in an escalation policy.
- **Uneven load redistribution**: Removing a member from a rotation increases the on-call burden for remaining members. Communicate changes to the team and consider adjusting shift lengths if needed.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/schedules
[2]: /incident_response/on-call/escalation_policies/
[3]: /incident_response/on-call/guides/offboarding-teams-and-users/

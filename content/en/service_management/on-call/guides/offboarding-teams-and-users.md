---
title: Offboarding teams and users from Datadog On-Call
further_reading:
- link: "/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call"
- link: "/service_management/on-call/teams/"
  tag: "Documentation"
  text: "Teams"
- link: "/service_management/on-call/schedules/"
  tag: "Documentation"
  text: "Schedules"
---

When teams or individuals leave your organization or no longer need access to Datadog On-Call, proper offboarding ensures continuity of incident response while maintaining security and operational integrity. This guide provides a systematic approach to safely remove teams and users from your On-Call configuration.

You'll learn how to:

- Assess dependencies and plan the offboarding process
- Transfer ownership of critical On-Call responsibilities
- Remove users and teams without disrupting active schedules
- Clean up configurations and documentation
- Validate that incident response remains intact

The guide includes checklists and validation steps to ensure a smooth transition that maintains your organization's incident response capabilities.

**Who should use this guide**

This guide is intended for administrators, team leads, and operations personnel responsible for managing Datadog On-Call configurations, including Site Reliability Engineers (SREs), DevOps engineers, and incident response coordinators.

## Plan the offboarding process

Before removing any teams or users from Datadog On-Call, conduct a thorough assessment to understand dependencies and plan the transition. Hasty removal can create gaps in coverage that compromise incident response.

### Inventory current responsibilities

Start by documenting what the departing team or user is responsible for:

- **Active schedules**: Identify all schedules where the team or user is currently assigned
- **Escalation policies**: Review policies that route to the departing team or include the user
- **Team ownership**: Note any teams the user owns or has administrative privileges for
- **Integration ownership**: Check for monitors, webhooks, or API integrations tied to the team
- **Documentation and runbooks**: Identify knowledge that needs to be transferred

### Assess coverage gaps

For each responsibility, determine:

- **Immediate coverage**: Who can handle On-Call duties during the transition period?
- **Long-term ownership**: Which team or individual will permanently assume these responsibilities?
- **Knowledge transfer needs**: What documentation, training, or handoff sessions are required?
- **Timeline constraints**: Are there any critical periods (such as product launches or maintenance windows) that require special consideration?

### Create a transition plan

Document your offboarding plan with clear timelines and ownership:

1. **Knowledge transfer phase**: Schedule handoff sessions and documentation updates
2. **Coverage assignment**: Assign temporary coverage during the transition
3. **Configuration updates**: Plan schedule, escalation policy, and team membership changes
4. **Validation phase**: Test that all changes work as expected
5. **Cleanup phase**: Remove access and archive unused configurations

Communicate the plan to all affected teams and stakeholders, including backup responders who may see increased On-Call load during the transition.

## Transfer ownership and coverage

Before removing users or teams from Datadog On-Call, ensure that all their responsibilities are properly transferred to maintain uninterrupted incident response coverage.

### Update team membership

For teams losing members:

1. **Add replacement members**: Add new team members before removing departing ones to avoid coverage gaps
2. **Transfer administrative roles**: If the departing user has team admin privileges, assign these to another team member
3. **Update contact information**: Ensure team contact details and escalation preferences reflect the new membership

### Modify schedules

For each schedule involving the departing team or user:

1. **Identify replacement coverage**: Determine who will cover the departing person's shifts
2. **Update schedule assignments**: 
   - Replace individual user assignments with new team members
   - Redistribute shifts among remaining team members
   - Consider temporary coverage during the transition period
3. **Validate schedule coverage**: Ensure there are no gaps in coverage, especially during critical periods
4. **Communicate changes**: Notify all affected team members about schedule modifications

### Update escalation policies

Review and modify escalation policies that involve the departing team or user:

1. **Replace team references**: Update policies that escalate to the departing team
2. **Remove individual user references**: Replace direct user escalations with team-based escalations where possible
3. **Adjust escalation timing**: Consider whether escalation delays need adjustment based on new team capacity
4. **Test escalation paths**: Validate that modified policies work as expected

### Transfer integration ownership

If the departing team or user owns monitors or integrations:

1. **Update monitor ownership**: Reassign monitors to the appropriate new team
2. **Modify notification handles**: Update monitor notifications to reference new teams or users
3. **Review API integrations**: Check for any custom integrations or webhooks that need updating
4. **Update documentation**: Ensure integration documentation reflects new ownership

## Remove users and teams

After ensuring proper coverage transfer, you can safely remove users and teams from Datadog On-Call. Follow this sequence to avoid disrupting active configurations.

### Remove individual users

1. **Verify replacement coverage**: Confirm that all the user's responsibilities have been transferred
2. **Remove from teams**: Remove the user from all On-Call teams they belong to
3. **Clear direct assignments**: Ensure the user is not directly assigned to any schedules or escalation policies
4. **Revoke access**: Remove the user's On-Call permissions in Datadog's role-based access control
5. **Archive user-specific configurations**: Document any custom settings or preferences for future reference

<div class="alert alert-warning">
Before removing a user, double-check that they are not the sole member of any critical team or the only person assigned to upcoming On-Call shifts.
</div>

### Decommission teams

For teams that are being completely dissolved:

1. **Transfer all team responsibilities**: Ensure all schedules, escalation policies, and integrations have been reassigned
2. **Remove team from routing rules**: Update any routing rules that direct pages to the departing team
3. **Clear team assignments**: Remove the team from all escalation policies and schedules
4. **Archive team configuration**: Export team settings and member lists for historical records
5. **Delete the team**: Remove the team from Datadog On-Call once all dependencies are cleared

### Clean up configurations

After removing users and teams:

1. **Review unused schedules**: Delete or archive schedules that are no longer needed
2. **Simplify escalation policies**: Remove unnecessary escalation steps or combine similar policies
3. **Update routing rules**: Ensure routing logic reflects the new team structure
4. **Clean up notification preferences**: Remove obsolete notification channels or contact methods

## Validate and monitor the transition

After completing the offboarding process, thoroughly validate that your incident response capabilities remain intact and monitor for any issues during the transition period.

### Validation checklist

Perform these validation steps to ensure successful offboarding:

- **Schedule coverage**: Verify that all schedules have complete coverage with no gaps
- **Escalation testing**: Test escalation policies to ensure they route correctly to new teams
- **Notification delivery**: Confirm that test pages reach the intended recipients
- **Integration functionality**: Validate that monitors and integrations work with new team assignments
- **Permission verification**: Ensure new team members have appropriate access levels
- **Documentation accuracy**: Confirm that all documentation reflects the updated team structure

### Monitor the transition

During the first few weeks after offboarding:

1. **Track incident response metrics**: Monitor response times and escalation patterns for any degradation
2. **Watch for coverage gaps**: Be alert for periods where incidents go unacknowledged
3. **Gather feedback**: Check with remaining team members about any challenges or concerns
4. **Review page volume**: Ensure new teams can handle their increased On-Call load
5. **Monitor escalation patterns**: Watch for unusual escalation behavior that might indicate configuration issues

### Address issues promptly

If you identify problems during monitoring:

- **Immediate fixes**: Address critical coverage gaps or notification failures immediately
- **Process improvements**: Update your offboarding procedures based on lessons learned
- **Team adjustments**: Consider redistributing responsibilities if any team becomes overloaded
- **Documentation updates**: Keep runbooks and contact information current

## Maintain operational continuity

Successful offboarding extends beyond the immediate removal of users and teams. Focus on long-term operational health and continuous improvement of your incident response capabilities.

### Update documentation and runbooks

After offboarding is complete:

1. **Refresh contact lists**: Update all emergency contact information and escalation matrices
2. **Revise runbooks**: Ensure operational procedures reflect new team responsibilities
3. **Update training materials**: Modify onboarding documentation for new team members
4. **Archive historical information**: Preserve important context about previous team structures for future reference

### Optimize team structure

Use the offboarding process as an opportunity to improve your overall On-Call organization:

1. **Consolidate similar responsibilities**: Consider merging teams with overlapping duties
2. **Standardize escalation patterns**: Simplify complex escalation logic where possible
3. **Balance workloads**: Ensure On-Call responsibilities are distributed fairly across teams
4. **Improve cross-training**: Reduce single points of failure by increasing knowledge sharing

### Plan for future changes

Establish processes to handle future team changes more smoothly:

1. **Create offboarding templates**: Document repeatable procedures for common scenarios
2. **Implement regular reviews**: Schedule periodic assessments of team structures and responsibilities
3. **Maintain succession planning**: Identify backup coverage for critical roles
4. **Automate where possible**: Use Datadog's APIs to streamline routine configuration changes

### Monitor long-term health

Track key metrics to ensure your On-Call organization remains healthy:

- **Response time trends**: Monitor whether incident response times remain consistent
- **Escalation frequency**: Watch for increased escalations that might indicate coverage issues
- **Team satisfaction**: Survey team members about On-Call workload and effectiveness
- **Knowledge retention**: Ensure critical operational knowledge doesn't leave with departing team members

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/on-call/
[2]: /service_management/on-call/teams/
[3]: /service_management/on-call/schedules/
[4]: /service_management/on-call/escalation_policies/
[5]: /account_management/rbac/

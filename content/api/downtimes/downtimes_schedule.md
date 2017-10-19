---
title: Schedule Monitor Downtime
type: apicontent
order: 9.1
---

## Schedule Monitor Downtime

##### ARGUMENTS
<ul class="arguments">
    {{< argument name="scope" description="The scope(s) to which the downtime will apply, e.g. 'host:app2'. Provide multiple scopes as a comma-separated list, e.g. 'env:dev,env:prod'. The resulting downtime applies to sources that matches ALL provided scopes (i.e. env:dev AND env:prod), NOT any of them." >}}
    {{< argument name="monitor_id" description="A single monitor to which the downtime will apply. If not provided, the downtime will apply to all monitors." default="None" >}}
    {{< argument name="start" description="POSIX timestamp to start the downtime. If not provided, the downtime starts the moment it is created." default="None" >}}
    {{< argument name="end" description="POSIX timestamp to end the downtime. If not provided, the downtime will be in effect indefinitely (i.e. until you cancel it)." default="None" >}}
    {{< argument name="message" description="A message to include with notifications for this downtime. Email notifications can be sent to specific users by using the same '@username' notation as events" default="None" >}}
    {{< argument name="monitor_id" description="The id of a specific monitor to apply the downtime to." default="None" >}}
    <li>
        <strong>recurrence [optional, default=None]</strong>
        <div>An object defining the recurrence of the downtime with a variety of parameters:</div>
        <ul>
            <li>
                <code>type</code> the type of recurrence. Choose from: <code>days</code>, <code>weeks</code>, <code>months</code>, <code>years</code>.
            </li>
            <li>
                <code>period</code> how often to repeat as an integer. For example to repeat every 3 days, select a type of <code>days</code> and a period of <code>3</code>.
            </li>
            <li>
                <code>week_days</code> (optional) a list of week days to repeat on. Choose from: <code>Mon</code>, <code>Tue</code>, <code>Wed</code>, <code>Thu</code>, <code>Fri</code>, <code>Sat</code> or <code>Sun</code>. Only applicable when <code>type</code> is <code>weeks</code>. <strong>First letter must be capitalized.</strong>
            </li>
            <li>
                <code>until_occurrences</code> (optional) how many times the downtime will be rescheduled. <strong><code>until_occurences</code> and <code>until_date</code></strong> are mutually exclusive
            </li>
            <li>
                <code>until_date</code> (optional) the date at which the recurrence should end as a POSIX timestmap. <strong><code>until_occurences</code> and <code>until_date</code></strong> are mutually exclusive
            </li>
        </ul>
    </li>
    {{< argument name="timezone" description="The timezone for the downtime." default="UTC" >}}
</ul>
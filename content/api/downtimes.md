## Downtimes
Downtiming gives you greater control over monitor notifications by allowing you to globally exclude scopes from alerting. Downtime settings, which can be scheduled with start and end times, prevent all alerting related to specified Datadog tags.

## Schedule Monitor Downtime
ARGUMENTS

scope [required]
The scope(s) to which the downtime will apply, e.g. 'host:app2'. Provide multiple scopes as a comma-separated list, e.g. 'env:dev,env:prod'. The resulting downtime applies to sources that matches ALL provided scopes (i.e. env:dev AND env:prod), NOT any of them.
monitor_id [optional, default=None]
A single monitor to which the downtime will apply. If not provided, the downtime will apply to all monitors.
start [optional, default=None]
POSIX timestamp to start the downtime. If not provided, the downtime starts the moment it is created.
end [optional, default=None]
POSIX timestamp to end the downtime. If not provided, the downtime will be in effect indefinitely (i.e. until you cancel it).
message [optional, default=None]
A message to include with notifications for this downtime. Email notifications can be sent to specific users by using the same '@username' notation as events
monitor_id [optional, default=None]
The id of a specific monitor to apply the downtime to.
recurrence [optional, default=None]
An object defining the recurrence of the downtime with a variety of parameters:
type the type of recurrence. Choose from: days, weeks, months, years.
period how often to repeat as an integer. For example to repeat every 3 days, select a type of days and a period of 3.
week_days (optional) a list of week days to repeat on. Choose from: Mon, Tue, Wed, Thu, Fri, Sat or Sun. Only applicable when type is weeks. First letter must be capitalized.
until_occurrences (optional) how many times the downtime will be rescheduled. until_occurences and until_date are mutually exclusive
until_date (optional) the date at which the recurrence should end as a POSIX timestmap. until_occurences and until_date are mutually exclusive
timezone [optional, default=UTC]
The timezone for the downtime.

## Update Monitor Downtime
ARGUMENTS

id [required]
The integer id of the downtime to be updated
scope [optional, default=original scope]
The scope to which the downtime will apply, e.g. 'host:app2'. Provide multiple scopes as a comma-separated list, e.g. 'env:dev,env:prod'. The resulting downtime applies to sources that matches ALL provided scopes (i.e. env:dev AND env:prod), NOT any of them.
monitor_id [optional, default=None]
A single monitor to which the downtime will apply. If not provided, the downtime will apply to all monitors.
start [optional, default=original]
POSIX timestamp to start the downtime.
end [optional, default=original end]
POSIX timestamp to end the downtime. If not provided, the downtime will be in effect indefinitely (i.e. until you cancel it).
message [optional, default=original message]
A message to include with notifications for this downtime. Email notifications can be sent to specific users by using the same '@username' notation as events
recurrence [optional, default=original recurrence]
An object defining the recurrence of the downtime with a variety of parameters:
type the type of recurrence. Choose from: days, weeks, months, years.
period how often to repeat as an integer. For example to repeat every 3 days, select a type of days and a period of 3.
week_days (optional) a list of week days to repeat on. Choose from: Mon, Tue, Wed, Thu, Fri, Sat or Sun. Only applicable when type is weeks. First letter must be capitalized.
until_occurrences (optional) how many times the downtime will be rescheduled. until_occurences and until_date are mutually exclusive
until_date (optional) the date at which the recurrence should end as a POSIX timestmap. until_occurences and until_date are mutually exclusive
timezone [optional, default=original timezone]
The timezone for the downtime.

## Cancel Monitor Downtime
ARGUMENTS

id [required]
The integer id of the downtime to be canceled

## Cancel Monitor Downtimes By Scope
ARGUMENTS

scope [required]
Cancel all downtimes with the given scope(s), e.g. 'env:prod', 'role:db,role:db-slave'.

## Get A Monitor Downtime
ARGUMENTS

This end point takes no JSON arguments.'

## Get All Monitor Downtimes
ARGUMENTS

current_only [optional, default=false]
Only return downtimes that are activewhen the request is made.
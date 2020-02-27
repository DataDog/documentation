---
title: Schedule monitor downtime
type: apicontent
order: 10.1
external_redirect: /api/#schedule-monitor-downtime
---

## Schedule monitor downtime

**ARGUMENTS**:

* **`scope`** [*required*]:
    The scope(s) to which the downtime applies, e.g. `host:app2`. Provide multiple scopes as a comma-separated list, e.g. `env:dev,env:prod`. The resulting downtime applies to sources that matches ALL provided scopes (i.e. `env:dev` **AND** `env:prod`), NOT any of them.
* **`monitor_tags`** [*optional*, *default*=**no monitor tag filter**]:
    A comma-separated list of monitor tags, i.e. tags that are applied directly to monitors, *not* tags that are used in monitor queries (which are filtered by the `scope` parameter), to which the downtime applies. The resulting downtime applies to monitors that match ALL provided monitor tags (i.e. `service:postgres` **AND** `team:frontend`), NOT any of them.
* **`monitor_id`** [*optional*, *default*=**None**]:
    A single monitor to which the downtime applies. If not provided, the downtime applies to all monitors.
* **`start`** [*optional*, *default*=**None**]:
    POSIX timestamp to start the downtime. If not provided, the downtime starts the moment it is created.
* **`end`** [*optional*, *default*=**None**]:
    POSIX timestamp to end the downtime. If not provided, the downtime is in effect indefinitely (i.e. until you cancel it).
* **`message`** [*optional*, *default*=**None**]:
    A message to include with notifications for this downtime. Email notifications can be sent to specific users by using the same '@username' notation as events
* **`timezone`** [*optional*, *default* = **UTC**]:
    The timezone for the downtime.
* **`recurrence`** [*optional*, *default*=**None**]:
    An object defining the recurrence of the downtime with a variety of parameters:
    *   **`type`** the type of recurrence. Choose from: `days`, `weeks`, `months`, `years`.
    *   **`rrule`** standard for defining recurring events. For example to have a recurring event on the first day of each month, select a type of `rrule` and set the `FREQ` to `MONTHLY` and `BYMONTHDAY` to `1`. Most common RRULE options from the [iCalendar Spec][1] are supported.

        **Note**: Attributes specifying the duration in RRULE are not supported, e.g. `DTSTART`, `DTEND`, `DURATION`.
    *   **`period`** how often to repeat as an integer. For example to repeat every 3 days, select a type of `days` and a period of `3`.
    *   **`week_days`** (optional) a list of week days to repeat on. Choose from: `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat` or `Sun`. Only applicable when `type` is `weeks`. **First letter must be capitalized.**
    *   **`until_occurrences`** (optional) how many times the downtime is rescheduled. **`until_occurences` and `until_date`** are mutually exclusive
    *   **`until_date`** (optional) the date at which the recurrence should end as a POSIX timestmap. **`until_occurences` and `until_date`** are mutually exclusive

[1]: https://tools.ietf.org/html/rfc2445#section-4.8.5.4

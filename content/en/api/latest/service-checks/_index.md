---
title: Service Checks
---
The service check endpoint allows you to post check statuses for use with monitors.
Service check messages are limited to 500 characters. If a check is posted with a message
containing more than 500 characters, only the first 500 characters are displayed. Messages
are limited for checks with a Critical or Warning status, they are dropped for checks with
an OK status.

- [Read more about Service Check monitors.][1]
- [Read more about Process Check monitors.][2]
- [Read more about Network Check monitors.][3]
- [Read more about Custom Check monitors.][4]
- [Read more about Service Check and status codes.][5]

[1]: https://docs.datadoghq.com/monitors/create/types/host/?tab=checkalert
[2]: https://docs.datadoghq.com/monitors/create/types/process_check/?tab=checkalert
[3]: https://docs.datadoghq.com/monitors/create/types/network/?tab=checkalert
[4]: https://docs.datadoghq.com/monitors/create/types/custom_check/?tab=checkalert
[5]: https://docs.datadoghq.com/developers/service_checks/

## Submit a Service Check

Submit a list of Service Checks.

**Notes**:
- A valid API key is required.
- Service checks can be submitted up to 10 minutes in the past.


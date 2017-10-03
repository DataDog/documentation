## Service Checks
The service check endpoint allows you to post check statuses for use with monitors.

## Post A Check Run
ARGUMENTS

check [required]
The text for the message
host_name [required]
The name of the host submitting the check
status [required]
An integer for the status of the check.
Options: '0': OK, '1': WARNING, '2': CRITICAL, '3': UNKNOWN
timestamp [optional, default=now]
POSIX timestamp of the event.
message [optional, default=None]
A description of why this status occurred
tags [optional, default=None]
A list of key:val tags for this check
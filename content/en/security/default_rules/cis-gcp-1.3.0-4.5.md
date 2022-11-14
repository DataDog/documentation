---
aliases:
- a12-i5a-82d
- /security_monitoring/default_rules/a12-i5a-82d
- /security_monitoring/default_rules/cis-gcp-1.3.0-4.5
disable_edit: true
integration_id: google_compute_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_instance
title: "\u2018connecting to serial ports\u2019 is not enabled for VM Instance"
type: security_rules
---

## Description
Interacting with a serial port is often referred to as the serial console, which is similar to
using a terminal window, in that input and output is entirely in text mode and there is no
graphical interface or mouse support.
If you enable the interactive serial console on an instance, clients can attempt to connect to
that instance from any IP address. Therefore interactive serial console support should be
disabled.

## Rationale
A virtual machine instance has four virtual serial ports. The instance's operating system, BIOS,
and other system-level entities often write output to the serial ports, and can accept input
such as commands or answers to prompts. Typically, these system-level entities use the
first serial port (port 1) and serial port 1 is often referred to as the serial console.
The interactive serial console does not support IP-based access restrictions such as IP
allow lists. If you enable the interactive serial console on an instance, clients can attempt to
connect to that instance from any IP address. This allows anybody to connect to that
instance if they know the correct SSH key, username, project ID, zone, and instance name.
Therefore interactive serial console support should be disabled.

## Remediation

### From the console
1. Login to Google Cloud console.
2. Go to Computer Engine.
3. Go to VM instances.
4. Click on the specific VM.
5. Click `EDIT`.
6. in the `Remote access` section, clear the `Enable connecting to serial ports`.
7. Click `Save`.

### From the command line
Use the following command to disable connecting to serial ports:
   ```
   gcloud compute instances add-metadata <INSTANCE_NAME> --zone=<ZONE> --metadata=serial-port-enable=false
   ```
or
   ```
   gcloud compute instances add-metadata <INSTANCE_NAME> --zone=<ZONE> --metadata=serial-port-enable=0
   ```

## Prevention:
You can prevent VMs from having serial port access by enabling the `Disable VM serial port access` organization policy:
[https://console.cloud.google.com/iam-admin/orgpolicies/compute-disableSerialPortAccess][1]

## Default value
By default, connecting to serial ports is not enabled.

## References
1. [https://cloud.google.com/compute/docs/instances/interacting-with-serial-console][2]


## CIS Controls

Version 8 - 4.8: Uninstall or Disable Unnecessary Services on Enterprise
Assets and Software
- Uninstall or disable unnecessary services on enterprise assets and software, such
as an unused file sharing service, web application module, or service function.

Version 7 - 9.2 Ensure Only Approved Ports, Protocols and Services Are Running
- Ensure Only Approved Ports, Protocols and Services Are Running

[1]: https://console.cloud.google.com/iam-admin/orgpolicies/compute-disableSerialPortAccess
[2]: https://cloud.google.com/compute/docs/instances/interacting-with-serial-console

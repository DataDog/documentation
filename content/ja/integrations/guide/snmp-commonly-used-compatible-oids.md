---
title: SNMP commonly used and compatible OIDs
kind: guide
aliases:
  - /integrations/faq/for-snmp-does-datadog-have-a-list-of-commonly-used-compatible-oids
---

For Cisco devices, you can use the command:

```text
show snmp-server oidlist
```

To see the available OIDs for your system, login to your Cisco account and search in the object navigator: http://tools.cisco.com/Support/SNMP/do/BrowseOID.do?local=en

Linux OIDs (these tend to work for network devices like F5 too)

## Statistics

### CPU

* 1 minute Load: .1.3.6.1.4.1.2021.10.1.3.1
* 5 minute Load: .1.3.6.1.4.1.2021.10.1.3.2
* 15 minute Load: .1.3.6.1.4.1.2021.10.1.3.3
* percentage of user CPU time: .1.3.6.1.4.1.2021.11.9.0
* raw user cpu time: .1.3.6.1.4.1.2021.11.50.0
* percentages of system CPU time: .1.3.6.1.4.1.2021.11.10.0
* raw system cpu time: .1.3.6.1.4.1.2021.11.52.0
* percentages of idle CPU time: .1.3.6.1.4.1.2021.11.11.0
* raw idle cpu time: .1.3.6.1.4.1.2021.11.53.0
* raw nice cpu time: .1.3.6.1.4.1.2021.11.51.0

### Memory

* Total Swap Size: .1.3.6.1.4.1.2021.4.3.0
* Available Swap Space: .1.3.6.1.4.1.2021.4.4.0
* Total RAM in machine: .1.3.6.1.4.1.2021.4.5.0
* Total RAM used: .1.3.6.1.4.1.2021.4.6.0
* Total RAM Free: .1.3.6.1.4.1.2021.4.11.0
* Total RAM Shared: .1.3.6.1.4.1.2021.4.13.0
* Total RAM Buffered: .1.3.6.1.4.1.2021.4.14.0
* Total Cached Memory: .1.3.6.1.4.1.2021.4.15.0

### Disk

* Path where the disk is mounted: .1.3.6.1.4.1.2021.9.1.2.1
* Path of the device for the partition: .1.3.6.1.4.1.2021.9.1.3.1
* Total size of the disk/partion (kBytes): .1.3.6.1.4.1.2021.9.1.6.1
* Available space on the disk: .1.3.6.1.4.1.2021.9.1.7.1
* Used space on the disk: .1.3.6.1.4.1.2021.9.1.8.1
* Percentage of space used on disk: .1.3.6.1.4.1.2021.9.1.9.1
* Percentage of inodes used on disk: .1.3.6.1.4.1.2021.9.1.10.1

### Uptime

* System Uptime: .1.3.6.1.2.1.1.3.0

---
title: On Missing Data
further_reading:
- link: "/api/latest/monitors/"
  tag: "API"
  text: "Monitors API Documentation"
---


## Overview



## Monitors managed through the UI

If you manage your monitors from the UI, they will be automatically updated for you. If you'd like to update them sooner, you can do it through the API as explained below.

## Monitors managed through the API or Terraform

If you are managing your monitors with API or Terraform, replace `notify_no_data` and `no_data_timeframe` with `on_missing_data`. 

"**no\_data\_timeframe**" is no longer needed since "on\_missing\_data" uses the same timeframe as the time window.  
The available values for "**on\_missing\_data**" are:

* default  
* show\_no\_data  
* show\_and\_notify\_no\_data  
* resolve

You can find all the available fields here: [Documentation](https://docs.datadoghq.com/api/latest/monitors/) 

Here's an example of before and after of a JSON monitor with those fields:

**Before**  
---

{  
"name": "CPU usage is high for host $host.value",  
            "type": "query alert",  
            "query": "avg(last\_5m):100 \- avg:system.cpu.idle{$host} \> 90",  
            "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
            "tags": \[\],  
            "options": {  
                    "thresholds": {  
                            "critical": 90  
                    },  
                    "notify\_audit": false,  
                    "include\_tags": false,  
	        "notify\_no\_data": true,  
                   "no\_data\_timeframe": 10  
            }  
    }

---

**After**  
---

{  
"name": "CPU usage is high for host $host.value",  
            "type": "query alert",  
            "query": "avg(last\_5m):100 \- avg:system.cpu.idle{$host} \> 90",  
            "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
            "tags": \[\],  
            "options": {  
                    "thresholds": {  
                            "critical": 90  
                    },  
                    "notify\_audit": false,  
                    "include\_tags": false,  
	        "on\_missing\_data": "show\_and\_notify\_no\_data"  
            }  
    }  
---


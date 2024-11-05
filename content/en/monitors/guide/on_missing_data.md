# On Missing Data

# Overview

# If you manage your monitors from the UI

If you manage your monitors from the UI, they will be automatically updated for you. If you’d like to update them sooner, you can do it through the API as explained below.

# If you manage your monitors with the API/Terraform

If you are managing your monitors with the API or Terraform, you’ll want to change the field “**notify\_no\_data**” and “**no\_data\_timeframe**” with “**on\_missing\_data**”. 

“**no\_data\_timeframe**” is no longer needed since “on\_missing\_data” uses the same timeframe as the time window.  
The available values for “**on\_missing\_data**” are:

* default  
* show\_no\_data  
* show\_and\_notify\_no\_data  
* resolve

You can find all the available fields here: [Documentation](https://docs.datadoghq.com/api/latest/monitors/) 

Here’s an example of before and after of a JSON monitor with those fields:

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
	        "on\_missing\_data”: “show\_and\_notify\_no\_data”  
            }  
    }  
---


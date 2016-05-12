---
title: Datadog-Windows Services Integration
integration_title: Windows Services
kind: integration
doclevel: basic
---



Monitor the state of your Windows Services.

![Windows Service Event](https://app.datadoghq.com/static/v/33.3471/images/setup/windows_service/snapshot-windows-service.png)

### Prerequisites

To capture Windows Services activity you need to install the Datadog Agent.

### Integration Configuration

Configure the Agent using the Agent Manager
Edit the "Windows Service" configuration in the Agent Manager. It should look something like this:

    init_config:

	instances:
	    # For each instance you define what host to connect to (defaulting to the
	    # current host) as well as a list of services you care about. The service
	    # names should match the Service name in the properties and NOT the display
	    # name in the services.msc list.
	    #
	    # If you want to check services on a remote host, you have to specify a
	    # hostname and (optional) credentials
	    #
	    #-  host: MYREMOTESERVER
	    #   username: MYREMOTESERVER\fred
	    #   password: mysecretpassword
	    #   tags:
	    #       - fredserver
	    #
	    # The sample configuration will monitor the WMI Performance Adapter service,
	    # named "wmiApSrv" in the service properties.
	    #
	    -   host: . # "." means the current host
	        services:
	            - wmiApSrv

After you restart the agent, Check the info page in the Agent Manager and verify that the integration check has passed. It should display a section similar to the following:


    Checks
	======

	  [...]

	  windows_service
	  ---------------
	      - instance #0 [OK]
	      - Collected 8 metrics & 0 events
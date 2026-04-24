---
title: Installing the Agent with a gMSA Account
description: Instructions for installing the Agent using a gMSA account.
further_reading:
- link: "/agent/guide/python-3/"
  tag: "Documentation"
  text: "Migrate your Custom Checks from python 2 to python 3"
---

## Overview
A Group Managed Service Account (gMSA) is a special account type that is available in Active Directory (AD) domains.
With gMSA, you do not need to:
- provide a password to the installer: this eliminates the need for password and secret management.
- manually rotate the `ddagentuser` account password: eliminates how frequently passwords are changed and the need to reinstall the Agent on hosts in order to update the Windows Service configuration. 

## Prerequisites 

Creating a gMSA account requires the following:
- forest schema has been updated to Windows Server 2012 , 
- the master root key for Active Directory has been deployed,
- there is at least one Windows Server 2012 DC (data center?) in the domain in which the gMSA will be created.

See more information about this in the Microsoft documentation: Manage Group Managed Service Accounts 


To use gMSA accounts, you must configure the [Active Directory domain][link]. 


Note: The setup steps are all standard Windows configuration and are not specific to Datadog. Any extended questions or issues with the setup that do not specifically relate to the Windows Agent installer or one of the Datadog Agent services are best handled by the customer’s standard channels for Windows host management.


## Setup

1. Create a KDS root key: Create a Key Distribution Service (KDS) Root Key
    1. By default the KDS root key is not usable for some time after creation, ~10 hours by default. Read the MSDN docs carefully if you need the key to be available immediately.
2. [Optional] Create a security group to use for PrincipalsAllowedToRetrieveManagedPassword
3. Create the gMSA account with the New-AdServiceAccount cmdlet
4. Grant access to the gMSA account to hosts that will use the gMSA account
    1. If using a security group, add the host to the security group
    2. otherwise, add the host to the gMSA account’s PrincipalsAllowedToRetrieveManagedPassword
Microsoft documentation: Manage Group Managed Service Accounts 



## Troubleshooting 
When troubleshooting issues with the Datadog Agent and. gMSA account, first verify that the that the gMSA account is properly configured on the host the customer is trying to install the Datadog Agent on. If that does not resolve the issue, follow the other troubleshooting steps below or reach out to [Datadog support][LINK]

COLLAPSIBLE CONTENT 1:  Verify configuration
COLLAPSIBLE CONTENT 2:  Issue with remote installation with Ansible or WinRM
COLLAPSIBLE CONTENT 3: Error “A password was not provided. Passwords are required for domain accounts.”
COLLAPSIBLE CONTENT 4: Error: “The system cannot find the file specified.”
 










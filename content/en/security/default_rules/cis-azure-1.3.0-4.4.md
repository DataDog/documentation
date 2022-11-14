---
aliases:
- 6xs-k14-ies
- /security_monitoring/default_rules/6xs-k14-ies
- /security_monitoring/default_rules/cis-azure-1.3.0-4.4
disable_edit: true
integration_id: azure.sql
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: azure.sql
title: Azure Active Directory Admin is configured for Azure SQL
type: security_rules
---

## Description

Use Azure Active Directory Authentication for authentication with SQL Database.

## Rationale

Azure Active Directory authentication is a mechanism to connect to the Microsoft Azure SQL Database and SQL Data Warehouse by using identities in Azure Active Directory (Azure AD). With Azure AD authentication, manage identities of database users and other Microsoft services in one central location. Central ID management provides a single place to manage database users and simplifies permission management in the following ways:

- Provides an alternative to SQL Server authentication. 
- Helps stop the proliferation of user identities across database servers. 
- Allows password rotation in a single place. 
- Customers can manage database permissions using external (AAD) groups. 
- Eliminates storing passwords by enabling integrated Windows authentication and other forms of authentication supported by Azure Active Directory. 
- Uses contained database users to authenticate identities at the database level. 
- Token-based authentication for applications connecting to SQL Database. 
- ADFS (domain federation) or native user/password authentication for a local Azure Active Directory without domain synchronization. 
- Connections from SQL Server Management Studio that use Active Directory Universal Authentication, which includes Multi-Factor Authentication (MFA). MFA includes strong authentication with a range of easy verification options phone call, text message, smart cards with a pin, or mobile app notification.

## Remediation

### From the console

1. Go to SQL servers
2. For each SQL server, click on Active Directory admin
3. Click on Set admin
4. Select an admin
5. Click Save
6. Using the Azure PowerShell for each Server, set `AD Admin Set-AzureRmSqlServerActiveDirectoryAdministrator -ResourceGroupName <resource group name> -ServerName <server name> -DisplayName "<Display name of AD account to set as DB administrator>"`.
6. From Azure Command Line Interface, get the ObjectID of user: `az ad user list --query "[?mail==<emailId of user>].{mail:mail, userPrincipal`.

## References

1. https://docs.microsoft.com/en-us/azure/sql-database/sql-database-aad-authentication-configure
2. https://docs.microsoft.com/en-us/azure/sql-database/sql-database-aad-authentication
3. https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/get-azurermsqlserveractivedirectoryadministrator?view=azurermps-5.2.0
4. https://docs.microsoft.com/en-us/powershell/module/azurerm.sql/set-azurermsqlserveractivedirectoryadministrator?view=azurermps-5.2.0
5. https://docs.microsoft.com/en-us/azure/security/benchmarks/security-controls-v2-identity-management#im-1-standardize-azure-active-directory-as-the-central-identity-and-authentication-system

**Note**: Assigning an administrator in Azure Active Directory (AAD) is just the first step. When using AAD for central authentication there are many other groups and roles that need to be configured base on the needs of your organization. To determine what roles should be assigned and what groups should be created to manage permissions and access to resources, see the How-to Guides.

## CIS Controls

Version 7 16.2 Configure Centralized Point of Authentication: Configure access for all accounts through as few centralized points of authentication as possible, including network, security, and cloud systems.

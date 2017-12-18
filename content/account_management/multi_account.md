---
title: Configuring Teams & Organizations with Multiple Accounts
kind: documentation
autotocdepth: 2
aliases:
  - /guides/multiaccountorg
customnav: accountmanagementnav
further_reading:
- link: "/account_management/saml"
  tag: "Documentation"
  text: Configure SAML for your Datadog account
---

There are two ways to allow multiple accounts to have access to the same data. First, simply add multiple users to the same team from the [Team Page][1].  
The second is through the use of organizations. Organizations are typically used by Managed Service Providers which have multiple large-scale customers which should not have access to each others' data. When a user is added to multiple organizations, they are able to quickly switch between them from the avatar menu in the main menu.

{{< img src="account_management/multi_account/guides-multacct-switchaccts.png" alt="Switch Accounts" responsive="true" popup="true">}}

## Organizations

The Multi-Account Organizations feature must be enabled by support. If this is a feature you need, contact [us](/help)!

### Create a New Organization

1. After the feature has been enabled, visit the [New Account Page][3].

2. Enter the name of the organization you wish to create and click the **Create** button. **The organization name cannot exceed 32 characters.**

{{< img src="account_management/multi_account/guides-multacct-createorg.png" alt="Create Org" responsive="true" popup="true">}}

A new trial account is created. If you wish to add this account to your existing billing settings, contact your sales representative.

### Leave an Organization

1. Go to your [Account Profile page][4].
2. Scroll down to Organizations and click **Leave** next to the org you want to leave.


{{< img src="account_management/multi_account/guides-multacct-leaveorg.png" alt="Leave Org" responsive="true" popup="true">}}

## Switch between Organization

For users that belong to more than one Datadog organization, it's possible to switch to another organization from any page by hovering over your avatar in the lower left hand corner.

Once the menu appears, transition to the other Datadog accounts you're associated with:
{{< img src="account_management/multi_account/Switch_Accounts.jpg" alt="Switch Accounts" responsive="true" popup="true">}}

## Custom domains for each sub-organizations


**Email [the Datadog support team](/help) to enable custom sub-domains.**

Custom sub-domains allow for easy differentiation of the source of notifications and easy switching between organizations when logged in as a member of multiple Datadog organizations.

Custom sub-domains can be especially helpful as when an alert link is generated, (https://account-a.datadoghq.com/event/event?id=<id>) it always points to a particular Datadog account, whereas the regular alert link (https://app.datadoghq.com/event/event?id=<id>) only looks for the event in the account the user is currently logged into and may result in an unexpected 404 error.


[1]: https://app.datadoghq.com/account/team
[3]: https://app.datadoghq.com/account/new_org
[4]: https://app.datadoghq.com/account/profile

## Organization API

Here are some API calls that allow you to manage organizations programmatically.

### Create a new organization
Request:
```
POST /api/v1/org?api_key=:api_key&application_key=:app_key
{
    "name" : "new org",
    "subscription" : {
        "type" : "pro"
    },
    "billing" : {
        type : "parent_billing"
    }
}
```

Sample bash script:
```bash
#!/bin/sh
# Replace the API and/or APP key below with the ones for your account

api_key="MY_APY_KEY"
app_key="MY_APP_KEY"

curl  -X POST -H "Content-type: application/json" \
   -d "{
               \"name\" :\"new org\",
               \"subscription\" :{\"type\":\"pro\"},
               \"billing\" :{\"type\":\"parent_billing\"}
    }" \
    "https://app.datadoghq.com/api/v1/org?api_key=${api_key}&application_key=${app_key}" 
```

Sample python script:
```python
import requests 
import json

data = json.dumps({'name': 'Test Org', 'subscription': {'type': 'pro'}, 'billing': {'type': 'parent_billing'}}) 
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
response = requests.post('https://app.datadoghq.com/api/v1/org', params={'api_key': 'MY_API_KEY', 'application_key': 'MY_APP_KEY'}, data=data, headers=headers) 
print response.content 
```

**Notes**:

* Available 'subscription' types : ['free', 'trial', 'pro']
* Available 'pro' billing types : ['parent_billing']
* At the moment only 'parent billing' can be enabled as a valid payment method, more methods will be added.

Response:
```
{
    "org" : {
        "name" : "",
        "public_id" : "axd2s",
        "subscription" : {
            "type" : "pro"
        },
        "billing" : {
            "type" : "parent_billing"
        }
    },
    "user" : {
        "name" : "Organization admin",
        "handle" : "test@datadoghq.com",
        ...
    },
    "api_key" : {
        "created_by": "user",
        "key": "6ccdfb88ff1aa63192c326"
        ...
    },
    "application_key": {
        "owner": "Organization admin",
        "hash": "88e5ae6a71f51d1d5a0071a24f",
        ...
    }
}
```

**Notes**:

* This call requires a feature to be turned on for the parent organization. Contact support@datadoghq.com for more information.
* The new organization is completely independent from the parent (except for billing purposes if 'parent_billing' was specified) hence parent organizations have no edit/view/disable rights in the organizations they create.
* Commands such as getting organization info or adding users can be issued directly as the child organization by using `org.public_id`, `api_key.key` and `application_key.hash` provided in this response.

### Get all managed organizations

As specified in the [Create a new organization section](/#create-a-new-organization), this command is only useful to retrieve information about the current organization until further changes.

Request:

```
GET /api/v1/org:public_id?api_key=:api_key&application_key=:app_key
```

Response:
```
{
    "orgs" : [{
        "name" : "",
        "public_id" : "axd2s",
        "subscription" : {
            "type" : "pro"
        },
        "billing" : {
            "type" : "bill-parent”
        }
    }]
}
```

### Update managed organization 

As specified in the Create a new organization section, this command is only useful to retrieve information about the current organization until further changes.
Available arguments:

* settings
    * saml
        * enabled: true or false
    * saml_idp_initiated_login
        * enabled: true or false
    * saml_strict_mode
        * enabled: true or false
    * saml_autocreate_users_domains
        * enabled: true or false
        * domains: list of domains (without @ - ex. ["datadoghq.com"])
* name

[More info on SAML and available settings](/account_management/saml).

Request:
```
PUT /api/v1/org:public_id?api_key=:api_key&application_key=:app_key

{
   "settings": {
       "saml": {
           "enabled": true
       },
       "saml_strict_mode": {
           "enabled": true
       },
       "saml_idp_initiated_login": {
           "enabled": true
       },
       "saml_autocreate_users_domains": {
           "enabled": true,
           "domains": [
               "datadoghq.com",
               "datadog.com"
           ]
       }
    }
}
```

Response:
```
{
   "org": {
       "public_id": "c81e728d9",
       "name": "DataDog HQ",
       "billing": {},
       "created": "2016-10-06 21:41:12",
       "description": "Datadog helps developers and ops visualize and grok their IT Data",
       "settings": {
           "saml_can_be_enabled": true,
           "saml_idp_initiated_login": {
               "enabled": true
            },
           "saml": {
               "enabled": true
           },
          "saml_idp_endpoint": "https://idp.datadoghq.com/idp/profile/SAML2/POST/SSO",
          "saml_autocreate_users_domains": {
              "domains": [
                  "datadoghq.com",
                  "datadog.com"
              ],
              "enabled": true
              },
          "saml_login_url": "https://app.datadoghq.com/account/login/id/c81e728d9",
          "saml_idp_metadata_uploaded": true,
          "saml_strict_mode": {
              "enabled": true
          }
       },
      "subscription": {
          "type": "pro"
      }
   }
}
```

### Upload SAML IdP metadata

As specified in the Create a new organization section, this command is only useful to retrieve information about the current organization until further changes.
Arguments:

* idp_file (required): path to XML metadata file you wish to upload

Request:
```
POST /api/v1/org:public_id/idp_metadata?api_key=:api_key&application_key=:app_key
```

Sample bash script:
```bash
#!/bin/sh
# Replace the API & APP key below with the ones for your account

api_key="MY_APY_KEY"
app_key="MY_APP_KEY"
public_id="MY_PUBLIC_ID"

curl -X POST -H "Content-Type: multipart/form-data" -F "idp_file=@metadata.xml" \ 
'https://app.datadoghq.com/api/v1/org/${public_id}/idp_metadata?api_key=${api_key}&application_key=${app_key}'
```

Response:
```
{
    "message": "IdP metadata successfully uploaded for org DataDog HQ"
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
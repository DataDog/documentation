---
title: Manage organizations programmatically  
kind: faq
customnav: main_references
---

## Organization API

Here are some API calls that will allow you to manage organizations programmatically.

Note: [This feature](/account_management/multi_account) must first be enabled by support, please [reach out](/help) if you're interested in activating it for your account.

## Create a new organization
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
# Make sure you replace the API and/or APP key below
# with the ones for your account

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

Notes:

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
        "name" : "Org admin",
        "handle" : "test@datadoghq.com",
        ...
    },
    "api_key" : {
        "created_by": "user",
        "key": "6ccdfb88ff1aa63192c326"
        ...
    },
    "application_key": {
        "owner": "Org admin",
        "hash": "88e5ae6a71f51d1d5a0071a24f",
        ...
    }
}
```

Notes:

* This call requires a feature to be turned on for the parent org. Please contact support@datadoghq.com for more information.
* The new organization is completely independent from the parent (except for billing purposes if 'parent_billing' was specified) hence parent orgs have no edit/view/disable rights in the orgs they create.
* Commands such as getting org info or adding users can be issued directly as the child org by using org.public_id, api_key.key and application_key.hash provided in this response.

## Get all managed organizations

As specified in the Create a new organization section, this command is only useful to retrieve information about the current org until further changes.

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

## Update managed org 

As specified in the Create a new organization section, this command is only useful to retrieve information about the current org until further changes.
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

More info on SAML and available settings [here](/account_management/saml).

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
       "description": "Datadog helps dev and ops visualize and grok their IT Data",
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

## Upload SAML IdP metadata

As specified in the Create a new organization section, this command is only useful to retrieve information about the current org until further changes.
Arguments:

* idp_file (required): path to XML metadata file you wish to upload

Request:
```
POST /api/v1/org:public_id/idp_metadata?api_key=:api_key&application_key=:app_key
```

Sample bash script:
```bash
#!/bin/sh
# Make sure you replace the API & APP key below
# with the ones for your account

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
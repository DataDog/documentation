---
title: Capturing EC2 tags at startup
kind: faq
customnav: integrationsnav
---

## Goal: capture all EC2 tags at startup

The list of instance tags that can be retrieved using the local metadata interface excludes custom tags set using the EC2 API.

In order to gather all tags including custom tags, the agent has to query the EC2 API. And to do so it needs credentials to sign all its requests. Rather than forcing credentials to be passed at startup time, AWS IAM allows for temporary credentials to be requested by an instance to then make API calls.

## Details

1. Set in `datadog.conf` the IAM role name that the instance was created as, e.g. role.
2. On startup, if configured to do so, the agent queries the metadata service to get temporary credentials GET `http://169.254.169.254/latest/meta-data/iam/security-credentials/[role]`
3. It then uses the EC2 API [DescribeTags](http://docs.aws.amazon.com/AWSEC2/latest/APIReference/ApiReference-query-DescribeTags.html) to get all the EC2 tags
4. Last it merges these tags with the regular instance tags (e.g. region:us-west-1).
5. Once the tags are sent, boto, the python library to query the EC2 API is unloaded until the next time it is needed (assuming tags are sent on a regular basis).

## Implementation

* boto, bundled with the agent and deployed to /usr/share/datadog/agent
* Configuration entries in `datadog.conf` to specify the IAM role to query to retrieve temporary credentials
---
title: Récupérer les tags EC2 au démarrage
kind: faq
---

## Objectif: Récupérer touts les tags EC2 au démarrage

La liste des tags d'instance pouvant être récupérées à l'aide de l'interface de métadonnées locale exclut les tags personnalisées définies à l'aide de l'API EC2.

In order to gather all tags including custom tags, the Agent has to query the EC2 API. And to do so it needs credentials to sign all its requests. Rather than forcing credentials to be passed at startup time, AWS IAM allows for temporary credentials to be requested by an instance to then make API calls.

## Details

1. Set in `datadog.yaml` the IAM role name that the instance was created as, e.g. role.
2. On startup, if configured to do so, the Agent queries the metadata service to get temporary credentials GET `http://169.254.169.254/latest/meta-data/iam/security-credentials/[role]`
3. It then uses the EC2 API [DescribeTags][1] to get all the EC2 tags
4. Last it merges these tags with the regular instance tags (e.g. region:us-west-1).
5. Once the tags are sent, boto, the python library to query the EC2 API is unloaded until the next time it is needed (assuming tags are sent on a regular basis).

## Implémentation

* boto, bundled with the Agent and deployed to /usr/share/datadog/agent
* Configuration entries in `datadog.yaml` to specify the IAM role to query to retrieve temporary credentials

[1]: http://docs.aws.amazon.com/AWSEC2/latest/APIReference/ApiReference-query-DescribeTags.html

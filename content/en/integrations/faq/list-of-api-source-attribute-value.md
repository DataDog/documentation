---
title: API Source Attributes
kind: faq
disable_toc: true
private: true
---

## Overview

Post events for specific integrations using the [Events API][1] and the `source_type_name`.

Search for events in the event stream using `sources:<SEARCH_TERM>`.


## Parameters

| Integration name              | source_type_name              | Search term                |
|-------------------------------|-------------------------------|----------------------------|
| Dotnet                        | dotnet                        | dotnet                     |
| Activemq                      | activemq                      | activemq                   |
| Airbrake                      | airbrake                      | airbrake                   |
| Akamai Datastream             | akamai datastream             | akamaidatastream           |
| Akamai Mpulse                 | akamai mpulse                 | akamaimpulse               |
| Alibaba Cloud                 | alibaba cloud                 | alibabacloud               |
| Amazon Appstream              | amazon appstream              | appstream                  |
| Amazon Appsync                | amazon appsync                | appsync                    |
| Amazon Api Gateway            | amazon api gateway            | apigateway                 |
| Amazon Athena                 | amazon athena                 | athena                     |
| Amazon Auto Scaling           | amazon auto scaling           | autoscaling                |
| Bigpanda                      | bigpanda                      | bigpanda                   |
| Amazon App Runner             | amazon app runner             | awsapprunner               |
| Amazon Backup                 | amazon backup                 | awsbackup                  |
| Amazon Billing                | amazon billing                | billing                    |
| Amazon Certificate Manager    | amazon certificate manager    | awscertificatemanager      |
| Amazon Cloudfront             | amazon cloudfront             | cloudfront                 |
| Amazon Cloudhsm               | amazon cloudhsm               | cloudhsm                   |
| Amazon Cloudsearch            | amazon cloudsearch            | cloudsearch                |
| Amazon Cloudtrail             | amazon cloudtrail             | cloudtrail                 |
| Amazon Codebuild              | amazon codebuild              | codebuild                  |
| Amazon Codedeploy             | amazon codedeploy             | codedeploy                 |
| Amazon Cognito                | amazon cognito                | cognito                    |
| Amazon Connect                | amazon connect                | awsconnect                 |
| Amazon Directconnect          | amazon directconnect          | directconnect              |
| Amazon Dms                    | amazon dms                    | awsdms                     |
| Amazon Documentdb             | amazon documentdb             | documentdb                 |
| Amazon Dynamodb               | amazon dynamodb               | dynamodb                   |
| Amazon Ebs                    | amazon ebs                    | ebs                        |
| Amazon Ec2                    | amazon ec2                    | ec2                        |
| Amazon Ec2 Spot               | amazon ec2 spot               | ec2spot                    |
| Amazon Ecs                    | amazon ecs                    | ecs                        |
| Amazon Efs                    | amazon efs                    | efs                        |
| Amazon Elasticache            | amazon elasticache            | elasticache                |
| Amazon Elasticbeanstalk       | amazon elasticbeanstalk       | elasticbeanstalk           |
| Amazon Elastic Transcoder     | amazon elastic transcoder     | elastictranscoder          |
| Amazon Mediaconnect           | amazon mediaconnect           | mediaconnect               |
| Amazon Mediaconvert           | amazon mediaconvert           | mediaconvert               |
| Amazon Mediapackage           | amazon mediapackage           | mediapackage               |
| Amazon Mediatailor            | amazon mediatailor            | mediatailor                |
| Amazon Elb                    | amazon elb                    | elb                        |
| Amazon Emr                    | amazon emr                    | emr                        |
| Amazon Es                     | amazon es                     | es                         |
| Amazon Eventbridge            | amazon eventbridge            | awseventhub                |
| Amazon Firehose               | amazon firehose               | firehose                   |
| Amazon Fsx                    | amazon fsx                    | awsfsx                     |
| Amazon Gamelift               | amazon gamelift               | gamelift                   |
| Amazon Glue                   | amazon glue                   | glue                       |
| Amazon Health                 | amazon health                 | health                     |
| Amazon Inspector              | amazon inspector              | inspector                  |
| Amazon Iot                    | amazon iot                    | iot                        |
| Amazon Keyspaces              | amazon keyspaces              | keyspaces                  |
| Amazon Kinesis Data Analytics | amazon kinesis data analytics | kinesisanalytics           |
| Amazon Kinesis                | amazon kinesis                | kinesis                    |
| Amazon Kms                    | amazon kms                    | kms                        |
| Amazon Lambda                 | amazon lambda                 | lambda                     |
| Amazon Lex                    | amazon lex                    | awslex                     |
| Amazon App Mesh               | amazon app mesh               | amazonappmesh              |
| Amazon Machine Learning       | amazon machine learning       | machinelearning            |
| Amazon Mwaa                   | amazon mwaa                   | mwaa                       |
| Amazon Mq                     | amazon mq                     | mq                         |
| Amazon Msk                    | amazon msk                    | msk                        |
| Amazon Nat Gateway            | amazon nat gateway            | natgateway                 |
| Amazon Neptune                | amazon neptune                | neptune                    |
| Amazon Ops Works              | amazon ops works              | opsworks                   |
| Amazon Polly                  | amazon polly                  | polly                      |
| Amazon Rds                    | amazon rds                    | rds                        |
| Amazon Rds Proxy              | amazon rds proxy              | rdsproxy                   |
| Amazon Redshift               | amazon redshift               | redshift                   |
| Amazon Rekognition            | amazon rekognition            | rekognition                |
| Amazon Route53                | amazon route53                | route53                    |
| Amazon S3                     | amazon s3                     | s3                         |
| Amazon S3 Storage Lens        | amazon s3 storage lens        | s3storagelens              |
| Amazon Sagemaker              | amazon sagemaker              | sagemaker                  |
| Amazon Security Hub           | amazon security hub           | awssecurityhub             |
| Amazon Ses                    | amazon ses                    | ses                        |
| Amazon Shield                 | amazon shield                 | shield                     |
| Amazon Sns                    | amazon sns                    | sns                        |
| Amazon Sqs                    | amazon sqs                    | sqs                        |
| Amazon Step Functions         | amazon step functions         | stepfunctions              |
| Amazon Storage Gateway        | amazon storage gateway        | storagegateway             |
| Amazon Swf                    | amazon swf                    | swf                        |
| Amazon Translate              | amazon translate              | translate                  |
| Amazon Trusted Advisor        | amazon trusted advisor        | trustedadvisor             |
| Amazon Waf                    | amazon waf                    | waf                        |
| Amazon Network Firewall       | amazon network firewall       | networkfirewall            |
| Amazon Vpn                    | amazon vpn                    | awsvpn                     |
| Amazon Web Services           | amazon web services           | cloudwatch                 |
| Amazon Workspaces             | amazon workspaces             | workspaces                 |
| Amazon Xray                   | amazon xray                   | awsxray                    |
| Ansible                       | ansible                       | ansible                    |
| Apache                        | apache                        | apache                     |
| Azure Analysis Services       | azure analysis services       | azureanalysisservices      |
| Azure Api Management          | azure api management          | azureapimanagement         |
| Azure App Service Environment | azure app service environment | azureappserviceenvironment |
| Azure App Service Plan        | azure app service plan        | azureappserviceplan        |
| Azure App Services            | azure app services            | azureappservices           |
| Azure Application Gateway     | azure application gateway     | azureapplicationgateway    |
| Azure Automation              | azure automation              | azureautomation            |
| Azure Batch                   | azure batch                   | azurebatch                 |
| Azure Blob Storage            | azure blob storage            | azureblobstorage           |
| Azure Cognitive Services      | azure cognitive services      | azurecognitiveservices     |
| Azure Container Instances     | azure container instances     | azurecontainerinstances    |
| Azure Container Service       | azure container service       | azurecontainerservice      |
| Azure Cosmosdb                | azure cosmosdb                | azurecosmosdb              |
| Azure Customer Insights       | azure customer insights       | azurecustomerinsights      |
| Azure Data Factory            | azure data factory            | azuredatafactory           |
| Azure Data Lake Analytics     | azure data lake analytics     | azuredatalakeanalytics     |
| Azure Data Lake Store         | azure data lake store         | azuredatalakestore         |
| Azure Db For Mariadb          | azure db for mariadb          | azuredbformariadb          |
| Azure Db For Mysql            | azure db for mysql            | azuredbformysql            |
| Azure Db For Postgresql       | azure db for postgresql       | azuredbforpostgresql       |
| Azure Devops                  | azure devops                  | azuredevops                |
| Azure Event Grid              | azure event grid              | azureeventgrid             |
| Azure Event Hub               | azure event hub               | azureeventhub              |
| Azure Express Route           | azure express route           | azureexpressroute          |
| Azure File Storage            | azure file storage            | azurefilestorage           |
| Azure Hd Insight              | azure hd insight              | azurehdinsight             |
| Azure Iot Hub                 | azure iot hub                 | azureiothub                |
| Azure Key Vault               | azure key vault               | azurekeyvault              |
| Azure Load Balancer           | azure load balancer           | azureloadbalancer          |
| Azure Logic App               | azure logic app               | azurelogicapp              |
| Azure Network Interface       | azure network interface       | azurenetworkinterface      |
| Azure Notification Hubs       | azure notification hubs       | azurenotificationhubs      |
| Azure Public Ip Address       | azure public ip address       | azurepublicipaddress       |
| Azure Queue Storage           | azure queue storage           | azurequeuestorage          |
| Azure Redis Cache             | azure redis cache             | azurerediscache            |
| Azure Relay                   | azure relay                   | azurerelay                 |
| Azure Search                  | azure search                  | azuresearch                |
| Azure Service Bus             | azure service bus             | azureservicebus            |
| Azure Sql Database            | azure sql database            | azuresqldatabase           |
| Azure Sql Elastic Pool        | azure sql elastic pool        | azuresqlelasticpool        |
| Azure Stream Analytics        | azure stream analytics        | azurestreamanalytics       |
| Azure Table Storage           | azure table storage           | azuretablestorage          |
| Azure Usage And Quotas        | azure usage and quotas        | azureusageandquotas        |
| Azure Virtual Network         | azure virtual network         | azurevirtualnetwork        |
| Azure Vm Scale Set            | azure vm scale set            | azurevmscaleset            |
| Azure Vm                      | azure vm                      | azurevm                    |
| Azure                         | azure                         | azure                      |
| Bitbucket                     | bitbucket                     | bitbucket                  |
| Btrfs                         | btrfs                         | btrfs                      |
| Bugsnag                       | bugsnag                       | bugsnag                    |
| Cacti                         | cacti                         | cacti                      |
| Campfire                      | campfire                      | campfire                   |
| Capistrano                    | capistrano                    | capistrano                 |
| Carbon Black                  | carbon black                  | carbonblack                |
| Cassandra                     | cassandra                     | cassandra                  |
| Catchpoint                    | catchpoint                    | catchpoint                 |
| Ceph                          | ceph                          | ceph                       |
| Chatwork                      | chatwork                      | chatwork                   |
| Chef                          | chef                          | chef                       |
| Circleci                      | circleci                      | circleci                   |
| Cisco Aci                     | cisco aci                     | ciscoaci                   |
| Cloudflare                    | cloudflare                    | cloudflare                 |
| Cloudhealth                   | cloudhealth                   | cloudhealth                |
| Confluent Cloud               | confluent cloud               | confluentcloud             |
| Consul                        | consul                        | consul                     |
| Conviva                       | conviva                       | conviva                    |
| Couchbase                     | couchbase                     | couchbase                  |
| Couchdb                       | couchdb                       | couchdb                    |
| Crowdstrike                   | crowdstrike                   | crowdstrike                |
| Desk                          | desk                          | desk                       |
| Dingtalk                      | dingtalk                      | dingtalk                   |
| Docker                        | docker                        | docker                     |
| Dyn                           | dyn                           | dyn                        |
| Elasticsearch                 | elasticsearch                 | elasticsearch              |
| Etcd                          | etcd                          | etcd                       |
| Event Viewer                  | event viewer                  | eventviewer                |
| Express                       | express                       | express                    |
| Fabric                        | fabric                        | fabric                     |
| Fastly                        | fastly                        | fastly                     |
| Flowdock                      | flowdock                      | flowdock                   |
| Fluentd                       | fluentd                       | fluentd                    |
| Git                           | git                           | git                        |
| Github                        | github                        | github                     |
| Github Apps                   | github apps                   | githubapps                 |
| GitLab                        | gitlab                        | gitlab                     |
| G Suite                       | g suite                       | gsuite                     |
| Go                            | go                            | go                         |
| Go Expvar                     | go expvar                     | goexpvar                   |
| Google App Engine             | google app engine             | gae                        |
| Google Cloud Apis             | google cloud apis             | gcpapis                    |
| Google Cloud Audit Logs       | google cloud audit logs       | gcpauditlogs               |
| Google Cloud Big Query        | google cloud big query        | gcpbigquery                |
| Google Cloud Bigtable         | google cloud bigtable         | gcpbigtable                |
| Google Cloud Composer         | google cloud composer         | gcpcomposer                |
| Google Cloud Dataflow         | google cloud dataflow         | gcpdataflow                |
| Google Cloud Dataproc         | google cloud dataproc         | gcpdataproc                |
| Google Cloud Datastore        | google cloud datastore        | gcpdatastore               |
| Google Cloud Filestore        | google cloud filestore        | gcpfilestore               |
| Google Cloud Firebase         | google cloud firebase         | gcpfirebase                |
| Google Cloud Firestore        | google cloud firestore        | gcpfirestore               |
| Google Cloud Functions        | google cloud functions        | gcpcloudfunctions          |
| Google Cloud Interconnect     | google cloud interconnect     | gcpinterconnect            |
| Google Cloud Iot              | google cloud iot              | gcpiot                     |
| Google Cloud Loadbalancing    | google cloud loadbalancing    | gcploadbalancing           |
| Google Stackdriver Logging    | google stackdriver logging    | gcplogging                 |
| Google Cloud Ml               | google cloud ml               | gcpml                      |
| Google Cloud Platform         | google cloud platform         | gcp                        |
| Google Cloud Pubsub           | google cloud pubsub           | gcppubsub                  |
| Google Cloud Redis            | google cloud redis            | gcpredis                   |
| Google Cloud Router           | google cloud router           | gcprouter                  |
| Google Cloud Run              | google cloud run              | gcpcloudrun                |
| Google Cloud Run For Anthos   | google cloud run for anthos   | gcpcloudrunforanthos       |
| Google Cloud Spanner          | google cloud spanner          | gcpspanner                 |
| Google Cloud Storage          | google cloud storage          | gcpstorage                 |
| Google Cloud Tasks            | google cloud tasks            | gcptasks                   |
| Google Cloud Tpu              | google cloud tpu              | gcptpu                     |
| Google Cloud Vpn              | google cloud vpn              | gcpvpn                     |
| Google Cloudsql               | google cloudsql               | gcpcloudsql                |
| Google Compute Engine         | google compute engine         | gcpcompute                 |
| Google Container Engine       | google container engine       | gcpcontainer               |
| Google Hangouts Chat          | google hangouts chat          | hangouts                   |
| Google Kubernetes Engine      | google kubernetes engine      | gke                        |
| Google Workspace Alert Center | google workspace alert center | googleworkspacealertcenter |
| Gunicorn                      | gunicorn                      | gunicorn                   |
| Haproxy                       | haproxy                       | haproxy                    |
| Hdfs                          | hdfs                          | hdfs                       |
| Hipchat                       | hipchat                       | hipchat                    |
| Honeybadger                   | honeybadger                   | honeybadger                |
| Iis                           | iis                           | iis                        |
| Immunio                       | immunio                       | immunio                    |
| Java                          | java                          | java                       |
| Jenkins                       | jenkins                       | jenkins                    |
| Jira                          | jira                          | jira                       |
| Jumpcloud                     | jumpcloud                     | jumpcloud                  |
| Kafka                         | kafka                         | kafka                      |
| Kong                          | kong                          | kong                       |
| Kubernetes                    | kubernetes                    | kubernetes                 |
| Kyoto Tycoon                  | kyoto tycoon                  | kyototycoon                |
| Lightbendrp                   | lightbendrp                   | lightbendrp                |
| Lighttpd                      | lighttpd                      | lighttpd                   |
| Mapreduce                     | mapreduce                     | mapreduce                  |
| Marathon                      | marathon                      | marathon                   |
| Memcached                     | memcached                     | memcached                  |
| Meraki                        | meraki                        | meraki                     |
| Mesos                         | mesos                         | mesos                      |
| Microsoft 365                 | microsoft 365                 | microsoft365               |
| Microsoft Teams               | microsoft teams               | microsoftteams             |
| Mongodb                       | mongodb                       | mongodb                    |
| Mongodb Atlas                 | mongodb atlas                 | mongodbatlas               |
| Moxtra                        | moxtra                        | moxtra                     |
| Mparticle                     | mparticle                     | mparticle                  |
| Mysql                         | mysql                         | mysql                      |
| Nagios                        | nagios                        | nagios                     |
| Netlify                       | netlify                       | netlify                    |
| New Relic                     | new relic                     | newrelic                   |
| Nginx                         | nginx                         | nginx                      |
| Node                          | node                          | node                       |
| Okta                          | okta                          | okta                       |
| Openstack                     | openstack                     | openstack                  |
| Opsgenie                      | opsgenie                      | opsgenie                   |
| Opsmatic                      | opsmatic                      | opsmatic                   |
| Oracle Cloud Infrastructure   | oracle cloud infrastructure   | oraclecloudinfrastructure  |
| Pagerduty                     | pagerduty                     | pagerduty                  |
| Papertrail                    | papertrail                    | papertrail                 |
| Pgbouncer                     | pgbouncer                     | pgbouncer                  |
| Php                           | php                           | php                        |
| Phpfpm                        | phpfpm                        | phpfpm                     |
| Pingdom                       | pingdom                       | pingdomv3                  |
| Pivotal                       | pivotal                       | pivotal                    |
| Postfix                       | postfix                       | postfix                    |
| Postgres                      | postgres                      | postgres                   |
| Powerdns Recursor             | powerdns recursor             | powerdnsrecursor           |
| Puppet                        | puppet                        | puppet                     |
| Pusher                        | pusher                        | pusher                     |
| Python                        | python                        | python                     |
| Rabbitmq                      | rabbitmq                      | rabbitmq                   |
| Redis                         | redis                         | redis                      |
| Redmine                       | redmine                       | redmine                    |
| Riak                          | riak                          | riak                       |
| Riakcs                        | riakcs                        | riakcs                     |
| Rollbar                       | rollbar                       | rollbar                    |
| Ruby                          | ruby                          | ruby                       |
| Salesforce                    | salesforce                    | salesforce                 |
| Segment                       | segment                       | segment                    |
| Sentry                        | sentry                        | sentry                     |
| Servicenow                    | servicenow                    | servicenow                 |
| Slack                         | slack                         | slack                      |
| Snmp                          | snmp                          | snmp                       |
| Solarwinds                    | solarwinds                    | solarwinds                 |
| Solr                          | solr                          | solr                       |
| Spark                         | spark                         | spark                      |
| Splunk                        | splunk                        | splunk                     |
| Sql Server                    | sql server                    | sqlserver                  |
| Ssh                           | ssh                           | ssh                        |
| Statuspage                    | statuspage                    | statuspage                 |
| Sumo Logic                    | sumo logic                    | sumologic                  |
| Supervisord                   | supervisord                   | supervisord                |
| System                        | system                        | system                     |
| Teamcity                      | teamcity                      | teamcity                   |
| Tokumx                        | tokumx                        | tokumx                     |
| Tomcat                        | tomcat                        | tomcat                     |
| Travis Ci                     | travis ci                     | travisci                   |
| User                          | user                          | dogwebpublisher            |
| Varnish                       | varnish                       | varnish                    |
| Victorops                     | victorops                     | victorops                  |
| Vsphere                       | vsphere                       | vsphere                    |
| Webhooks                      | webhooks                      | webhooks                   |
| Windows Service               | windows service               | windowsservice             |
| Wmi                           | wmi                           | wmi                        |
| Xmatters                      | xmatters                      | xmatters                   |
| Yarn                          | yarn                          | yarn                       |
| Zabbix                        | zabbix                        | zabbix                     |
| Zendesk                       | zendesk                       | zendesk                    |
| Zookeeper                     | zookeeper                     | zookeeper                  |


[1]: /api/latest/events/

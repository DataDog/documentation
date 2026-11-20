---
title: Setting Up Database Monitoring for IBM Db2 on AWS EC2
description: Install and configure Database Monitoring for IBM Db2 running on AWS EC2 using the Datadog Agent container image.
further_reading:
- link: "/integrations/ibm-db2/"
  tag: "Documentation"
  text: "IBM Db2 Integration"
- link: "/database_monitoring/setup_db2/selfhosted/"
  tag: "Documentation"
  text: "Self-hosted IBM Db2 setup"
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/guide/database_identifier/"
  tag: "Documentation"
  text: "Specifying a Database Identifier"
---

<div class="alert alert-info">
This feature is in preview and requires Datadog Agent v7.86 or later. Customers who participate in the Datadog Database Monitoring for IBM Db2 preview <strong>are not charged</strong> for usage incurred during the preview period. To request access, contact your Datadog account team.
</div>

Datadog Database Monitoring (DBM) for IBM Db2 collects database instance metadata, query performance metrics, and obfuscated SQL. This page covers running Db2 on an Amazon EC2 instance with the Datadog Agent deployed as a Docker container on the same host.

## Before you begin

Supported IBM Db2 versions
: 11.1, 11.5, and 12.1.

Supported Agent versions
: 7.86 or later. The Agent container image does not bundle the `ibm_db` Python driver. Build a custom image as described in [Step 3](#step-3-build-a-custom-agent-image).

EC2 requirements
: Linux AMI with Docker installed. Outbound network access on TCP 443 to your Datadog site. Network access from the EC2 host to each Db2 server on the Db2 service port (`50000` by default).

## Step 1: Prepare the EC2 host

1. Launch an EC2 instance in the same VPC as your Db2 servers, or in a VPC with routed access to them. Attach a security group that allows egress to Datadog and to Db2.
2. Install Docker. On Amazon Linux 2023:

   ```shell
   sudo dnf install -y docker
   sudo systemctl enable --now docker
   sudo usermod -aG docker ec2-user
   ```

## Step 2: Prepare Db2

Complete the Db2-side preparation on each database you want to monitor. These steps run against Db2, not the EC2 host:

1. Enable the required monitor switches. See [Step 1: Enable monitoring][2] in the self-hosted guide.
2. Create the `datadog` user and grant access to the monitoring functions. See [Step 2: Create the Datadog user][3].
3. Store the Datadog user's password with the Agent's [secret backend][4].

## Step 3: Build a custom Agent image

The stock Agent image does not include `ibm_db`. On the EC2 host, create a `Dockerfile`:

```dockerfile
FROM registry.datadoghq.com/agent:<AGENT_VERSION>
RUN /opt/datadog-agent/embedded/bin/pip install ibm_db==3.2.6
```

Replace `<AGENT_VERSION>` with `7.86.0` or later. Build the image:

```shell
docker build -t dd-agent-db2:<AGENT_VERSION> .
```

Installing `ibm_db` downloads the IBM CLI driver and requires outbound network access to IBM during the build. For environments without that access, see [Installing the ibm_db client library offline][5].

## Step 4: Add the Db2 check configuration

Create `ibm_db2.yaml` on the EC2 host, for example at `/etc/datadog-agent/conf.d/ibm_db2.d/conf.yaml`. Configure one instance per database per server:

```yaml
init_config: {}
instances:
  - dbm: true
    host: db2-a.example.internal
    port: 50000
    db: <DB_NAME>
    username: datadog
    password: "ENC[datadog_user_database_password]"
    service: <SERVICE>
    database_identifier:
      template: "$resolved_hostname:$port"
    tags:
      - env:<ENV>
```

Use each Db2 server's direct address. Do not use a virtual IP, load balancer, or failover DNS name. For high availability disaster recovery (HADR) pairs, use distinct identifiers for each member. See [Connect to a fixed server][6] and [HADR configuration][7].

### Disable automatic client reroute

Rerouting mixes the workloads of two servers under one identifier. Disable it for the Agent's IBM driver.

Create `/etc/datadog-agent/db2dsdriver.cfg` with both `enableAcr` and `enableAlternateServerListFirstConnect` set to `false` for each configured database, host, and port. For a complete example, see [Disable automatic client reroute][8].

## Step 5: Run the Agent container

Replace `<YOUR_API_KEY>` and `<DD_SITE>` (for example, `datadoghq.com`):

```shell
docker run -d --name dd-agent \
  --restart unless-stopped \
  --cgroupns host \
  --pid host \
  -e DD_API_KEY=<YOUR_API_KEY> \
  -e DD_SITE=<DD_SITE> \
  -e DD_HOSTNAME=$(hostname) \
  -e DD_APM_ENABLED=true \
  -e DD_LOGS_ENABLED=true \
  -e DB2DSDRIVER_CFG_PATH=/etc/datadog-agent/db2dsdriver.cfg \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -v /etc/datadog-agent/conf.d/ibm_db2.d:/etc/datadog-agent/conf.d/ibm_db2.d:ro \
  -v /etc/datadog-agent/db2dsdriver.cfg:/etc/datadog-agent/db2dsdriver.cfg:ro \
  -p 8125:8125/udp \
  -p 8126:8126/tcp \
  dd-agent-db2:<AGENT_VERSION>
```

Replace `<AGENT_VERSION>` with the tag you built in [Step 3](#step-3-build-a-custom-agent-image).

The `DB2DSDRIVER_CFG_PATH` environment variable must be set on the container. Setting it in the host shell does not affect the Agent process inside the container.

## Step 6: Validate

Run the Agent status command inside the container:

```shell
docker exec dd-agent agent status
```

Look for `ibm_db2` under **Checks** and confirm the check has no errors. In Datadog, open **Database Monitoring > Databases** to find the instance, then **Database Monitoring > Queries** and select **IBM Db2** to view query metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/setup_db2/selfhosted/
[2]: /database_monitoring/setup_db2/selfhosted/#step-1-enable-monitoring
[3]: /database_monitoring/setup_db2/selfhosted/#step-2-create-the-datadog-user-and-grant-access
[4]: /agent/configuration/secrets-management/
[5]: /integrations/ibm-db2/#installing-ibm_db-client-library-offline
[6]: /integrations/ibm-db2/#connect-to-a-fixed-server
[7]: /integrations/ibm-db2/#high-availability-disaster-recovery-hadr
[8]: /integrations/ibm-db2/#disable-automatic-client-reroute

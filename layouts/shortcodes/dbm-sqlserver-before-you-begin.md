Supported SQL Server versions
: 2012, 2014, 2016, 2017, 2019

Supported Agent versions
: To ensure you have the best Database Monitoring for SQL Server experience install the latest release `7.35` Datadog Agent release candidate build:
: * Docker: https://hub.docker.com/r/datadog/agent/tags?page=1&name=7.35.0-rc.8
: * Windows MSI: https://dd-agent-mstesting.s3.amazonaws.com/builds/beta/datadog-agent-7.35.0-rc.8-1-x86_64.msi
: * Deb: https://apt.datad0g.com/pool/d/da/datadog-agent-dbg_7.35.0~rc.8-1_amd64.deb
: * Rpm: https://yum.datad0g.com/beta/7/x86_64/datadog-agent-7.35.0~rc.8-1.x86_64.rpm

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Agent must connect directly to the host being monitored. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. While this can be an anti-pattern for client applications, for Database Monitoring each Agent must have knowledge of the underlying host and should stick to a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, then the metrics will be incorrect.

Data security considerations
: Read about how Database Management handles [sensitive information][2] for information about what data the Agent collects from your databases and how to ensure it is secure.

[1]: /agent/basic_agent_usage#agent-overhead
[2]: /database_monitoring/data_collected/#sensitive-information

Supported Agent versions
: 7.41.0+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][100]).

Proxies, load balancers, and connection poolers
: The Datadog Agent must connect directly to the host being monitored. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. If the Agent connects to different hosts while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

Data security considerations
: Read about how Database Management handles [sensitive information][101] for information about what data the Agent collects from your databases and how to ensure it is secure.

[100]: /database_monitoring/agent_integration_overhead/?tab=sqlserver
[101]: /database_monitoring/data_collected/#sensitive-information

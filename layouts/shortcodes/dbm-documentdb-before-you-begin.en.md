Supported Agent versions
: 7.59.0+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and operation sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>

Connection strings or SRV strings
: Although Amazon DocumentDB connection strings provide many benefits such as automatic failover and load balancing, the Datadog Agent must connect directly to the DocumentDB instance being monitored. If the Agent connects to a different DocumentDB instance while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics. <br/><br/>

Data security considerations
: Read about how Database Management handles [sensitive information][3000] for information about what data the Agent collects from your databases and how to ensure it is secure.

[3000]: /database_monitoring/data_collected/#sensitive-information

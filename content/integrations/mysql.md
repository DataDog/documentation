---
title: Datadog-MySQL Integration
integration_title: MySQL
kind: integration
git_integration_title: mysql
---
### Overview

Connect MySQL to Datadog in order to:

  * Visualize your database performance
  * Correlate the performance of MySQL with the rest of your applications

### Installation

1. Create a ```datadog``` user with replication rights on your MySQL server with the following command, replacing ```<UNIQUEPASSWORD>``` with a unique password:

       sudo mysql -e "CREATE USER 'datadog'@'localhost' IDENTIFIED BY '<UNIQUEPASSWORD>';"
       sudo mysql -e "GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'localhost' WITH MAX_USER_CONNECTIONS 5;"

2. Verify that the user was created successfully using the following command, replacing ```<UNIQUEPASSWORD>``` with the password above:

       mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
       grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
       echo -e "\033[0;31mCannot connect to MySQL\033[0m"
       mysql -u datadog --password=<UNIQUEPASSWORD> -e "show slave status" && \
       echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
       echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"

### Configuration

1. Edit the mysql.yaml file in your agent's conf.d directory, replacing ```<UNIQUEPASSWORD>``` with the password used above.

       init_config:

       instances:
         - server: localhost
           user: datadog
           pass: <UNIQUEPASSWORD>

           tags:
               - optional_tag1
               - optional_tag2
           options:
               replication: 0
               galera_cluster: 1

### Validation

To validate your installation and configuration, restart the agent and execute the info command. The output should contain a section similar to the following:


    Checks
    ======
      [...]
      mysql
      -----
          - instance #0 [OK]
          - Collected 8 metrics & 0 events

### Metrics

<%= get_metrics_from_git()%>






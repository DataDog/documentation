export const dbData = {
  allowlist: {
    prefsById: {
      color: {
        id: 'color',
        display_name: 'Color',
        description: 'DO NOT USE, testing purposes only.'
      },
      item: {
        id: 'item',
        display_name: 'Item',
        description: 'DO NOT USE, testing purposes only.'
      },
      postgres_version: {
        id: 'postgres_version',
        display_name: 'Postgres version',
        description:
          'Any Postgres version regardless of its granularity, such as 15, 9.1.2, or ~10.0.0.'
      },
      agent_version: {
        id: 'agent_version',
        display_name: 'Agent version',
        description:
          'Any Agent version regardless of its granularity, such as 7, 6.32.1, or ~7.0.0.'
      },
      host: {
        id: 'host',
        display_name: 'Host',
        description:
          'Hosting platform, such as AWS. Can also refer to containers like Kubernetes.'
      },
      host_type: {
        id: 'host_type',
        display_name: 'Host type',
        description:
          'The machine or container type within a given host, such as EC2. Use only as a followup to a `host` selection.'
      },
      prog_lang: {
        id: 'prog_lang',
        display_name: 'Language',
        description: 'Programming language, such as Python.'
      },
      os: {
        id: 'os',
        display_name: 'OS',
        description:
          'Env operating system, such as Linux. Can refer to a mobile OS, but `mobile_os` is preferred for lists of mobile-only options.'
      },
      database: {
        id: 'database',
        display_name: 'Database'
      },
      mobile_os: {
        id: 'mobile_os',
        display_name: 'OS',
        description: 'Mobile operating system, such as Android.'
      },
      pkg_mgr: {
        id: 'pkg_mgr',
        display_name: 'Package manager',
        description: 'Software package manager, such as npm.'
      }
    },
    optionsById: {
      dot_net: {
        id: 'dot_net',
        display_name: '.NET'
      },
      agent: {
        id: 'agent',
        display_name: 'Agent'
      },
      agent_v5: {
        id: 'agent_v5',
        display_name: 'v5'
      },
      agent_v6: {
        id: 'agent_v6',
        display_name: 'v6'
      },
      agent_v7: {
        id: 'agent_v7',
        display_name: 'v7'
      },
      agentless_using_an_api_key: {
        id: 'agentless_using_an_api_key',
        display_name: 'Agentless (using an API key)'
      },
      amazon_ecs: {
        id: 'amazon_ecs',
        display_name: 'Amazon ECS'
      },
      amazon_opensearch: {
        id: 'amazon_opensearch',
        display_name: 'Amazon OpenSearch'
      },
      android: {
        id: 'android',
        display_name: 'Android'
      },
      ansible: {
        id: 'ansible',
        display_name: 'Ansible'
      },
      api: {
        id: 'api',
        display_name: 'API'
      },
      auth: {
        id: 'auth',
        display_name: 'Authentication'
      },
      aws: {
        id: 'aws',
        display_name: 'AWS'
      },
      aws_cdk: {
        id: 'aws_cdk',
        display_name: 'AWS CDK'
      },
      aws_cli: {
        id: 'aws_cli',
        display_name: 'AWS CLI'
      },
      amazon_eks: {
        id: 'amazon_eks',
        display_name: 'Amazon EKS'
      },
      aws_fargate: {
        id: 'aws_fargate',
        display_name: 'AWS Fargate'
      },
      aws_s3: {
        id: 'aws_s3',
        display_name: 'AWS S3'
      },
      aws_sam: {
        id: 'aws_sam',
        display_name: 'AWS SAM'
      },
      azure: {
        id: 'azure',
        display_name: 'Azure'
      },
      azure_aks: {
        id: 'azure_aks',
        display_name: 'Azure AKS'
      },
      azure_storage: {
        id: 'azure_storage',
        display_name: 'Azure Storage'
      },
      bash: {
        id: 'bash',
        display_name: 'Bash'
      },
      browser: {
        id: 'browser',
        display_name: 'Browser'
      },
      carthage: {
        id: 'carthage',
        display_name: 'Carthage'
      },
      cdn_async: {
        id: 'cdn_async',
        display_name: 'CDN async'
      },
      cdn_sync: {
        id: 'cdn_sync',
        display_name: 'CDN sync'
      },
      check_alert: {
        id: 'check_alert',
        display_name: 'Check Alert'
      },
      chef: {
        id: 'chef',
        display_name: 'Chef'
      },
      chronicle: {
        id: 'chronicle',
        display_name: 'Chronicle'
      },
      cloudformation: {
        id: 'cloudformation',
        display_name: 'CloudFormation'
      },
      cluster_alert: {
        id: 'cluster_alert',
        display_name: 'Cluster Alert'
      },
      cocoapods: {
        id: 'cocoapods',
        display_name: 'CocoaPods'
      },
      configmap: {
        id: 'configmap',
        display_name: 'ConfigMap'
      },
      configuration_file: {
        id: 'configuration_file',
        display_name: 'Configuration file'
      },
      container_image: {
        id: 'container_image',
        display_name: 'Container Image'
      },
      containerized: {
        id: 'containerized',
        display_name: 'Containerized'
      },
      containerized_agent: {
        id: 'containerized_agent',
        display_name: 'Containerized Agent'
      },
      cucumber: {
        id: 'cucumber',
        display_name: 'Cucumber'
      },
      curl: {
        id: 'curl',
        display_name: 'curl'
      },
      daemonset: {
        id: 'daemonset',
        display_name: 'DaemonSet'
      },
      datadog: {
        id: 'datadog',
        display_name: 'Datadog'
      },
      datadog_application: {
        id: 'datadog_application',
        display_name: 'Datadog application'
      },
      datadog_archives: {
        id: 'datadog_archives',
        display_name: 'Datadog Archives'
      },
      datadog_cli: {
        id: 'datadog_cli',
        display_name: 'Datadog CLI'
      },
      datadog_operator: {
        id: 'datadog_operator',
        display_name: 'Datadog Operator'
      },
      debian: {
        id: 'debian',
        display_name: 'Debian'
      },
      ubuntu: {
        id: 'ubuntu',
        display_name: 'Ubuntu'
      },
      dedupe: {
        id: 'dedupe',
        display_name: 'Dedupe'
      },
      docker: {
        id: 'docker',
        display_name: 'Docker'
      },
      docker_cli: {
        id: 'docker_cli',
        display_name: 'Docker CLI'
      },
      docker_compose: {
        id: 'docker_compose',
        display_name: 'Docker Compose'
      },
      dockerfile: {
        id: 'dockerfile',
        display_name: 'Dockerfile'
      },
      elasticsearch: {
        id: 'elasticsearch',
        display_name: 'Elasticsearch'
      },
      flutter: {
        id: 'flutter',
        display_name: 'Flutter'
      },
      github_actions: {
        id: 'github_actions',
        display_name: 'Github Actions'
      },
      go: {
        id: 'go',
        display_name: 'Go'
      },
      google: {
        id: 'google',
        display_name: 'Google'
      },
      google_cloud: {
        id: 'google_cloud',
        display_name: 'Google Cloud'
      },
      google_cloud_storage: {
        id: 'google_cloud_storage',
        display_name: 'Google Cloud Storage'
      },
      google_gke: {
        id: 'google_gke',
        display_name: 'Google GKE'
      },
      gradle: {
        id: 'gradle',
        display_name: 'Gradle'
      },
      grok_parser: {
        id: 'grok_parser',
        display_name: 'Grok Parser'
      },
      helm: {
        id: 'helm',
        display_name: 'Helm'
      },
      http: {
        id: 'http',
        display_name: 'HTTP'
      },
      ios: {
        id: 'ios',
        display_name: 'iOS'
      },
      java: {
        id: 'java',
        display_name: 'Java'
      },
      jenkins: {
        id: 'jenkins',
        display_name: 'Jenkins'
      },
      json: {
        id: 'json',
        display_name: 'JSON'
      },
      kotlin: {
        id: 'kotlin',
        display_name: 'Kotlin'
      },
      kubernetes: {
        id: 'kubernetes',
        display_name: 'Kubernetes'
      },
      linux: {
        id: 'linux',
        display_name: 'Linux'
      },
      linux_apt: {
        id: 'linux_apt',
        display_name: 'Linux (APT)'
      },
      linux_rpm: {
        id: 'linux_rpm',
        display_name: 'Linux (RPM)'
      },
      log4j: {
        id: 'log4j',
        display_name: 'Log4j'
      },
      log4j_2: {
        id: 'log4j_2',
        display_name: 'Log4j 2'
      },
      logs: {
        id: 'logs',
        display_name: 'Logs'
      },
      mac_os: {
        id: 'mac_os',
        display_name: 'MacOS'
      },
      manual: {
        id: 'manual',
        display_name: 'Manual'
      },
      maven: {
        id: 'maven',
        display_name: 'Maven'
      },
      mongo_db: {
        id: 'mongo_db',
        display_name: 'MongoDB'
      },
      multitenant: {
        id: 'multitenant',
        display_name: 'Multi-tenant'
      },
      mysql: {
        id: 'mysql',
        display_name: 'MySQL'
      },
      n_log: {
        id: 'n_log',
        display_name: 'NLog'
      },
      node_js: {
        id: 'node_js',
        display_name: 'Node.js'
      },
      non_cdb: {
        id: 'non_cdb',
        display_name: 'Non-CDB'
      },
      npm: {
        id: 'npm',
        display_name: 'NPM'
      },
      nu_get: {
        id: 'nu_get',
        display_name: 'NuGet'
      },
      objective_c: {
        id: 'objective_c',
        display_name: 'Objective-C'
      },
      on_premises_ci_provider: {
        id: 'on_premises_ci_provider',
        display_name: 'On-Premises CI Provider'
      },
      open_search: {
        id: 'open_search',
        display_name: 'OpenSearch'
      },
      operator: {
        id: 'operator',
        display_name: 'Operator'
      },
      oracle: {
        id: 'oracle',
        display_name: 'Oracle'
      },
      php: {
        id: 'php',
        display_name: 'PHP'
      },
      pip: {
        id: 'pip',
        display_name: 'pip'
      },
      poetry: {
        id: 'poetry',
        display_name: 'Poetry'
      },
      postgres: {
        id: 'postgres',
        display_name: 'Postgres'
      },
      puppet: {
        id: 'puppet',
        display_name: 'Puppet'
      },
      python: {
        id: 'python',
        display_name: 'Python'
      },
      quota: {
        id: 'quota',
        display_name: 'Quota'
      },
      rate: {
        id: 'rate',
        display_name: 'RATE'
      },
      rds: {
        id: 'rds',
        display_name: 'RDS'
      },
      react_native: {
        id: 'react_native',
        display_name: 'React Native'
      },
      redhat: {
        id: 'redhat',
        display_name: 'RedHat'
      },
      centos: {
        id: 'centos',
        display_name: 'CentOS'
      },
      suse: {
        id: 'suse',
        display_name: 'SUSE'
      },
      reduce: {
        id: 'reduce',
        display_name: 'Reduce'
      },
      replica_set: {
        id: 'replica_set',
        display_name: 'Replica Set'
      },
      ruby: {
        id: 'ruby',
        display_name: 'Ruby'
      },
      sensitive_data_scanner: {
        id: 'sensitive_data_scanner',
        display_name: 'Sensitive Data Scanner'
      },
      serilog: {
        id: 'serilog',
        display_name: 'Serilog'
      },
      serverless_framework: {
        id: 'serverless_framework',
        display_name: 'Serverless Framework'
      },
      sharded_cluster: {
        id: 'sharded_cluster',
        display_name: 'Sharded Cluster'
      },
      splunk_hec: {
        id: 'splunk_hec',
        display_name: 'Splunk HEC'
      },
      standalone: {
        id: 'standalone',
        display_name: 'Standalone'
      },
      standard: {
        id: 'standard',
        display_name: 'Standard'
      },
      sumo_logic: {
        id: 'sumo_logic',
        display_name: 'Sumo Logic'
      },
      swift: {
        id: 'swift',
        display_name: 'Swift'
      },
      spm: {
        id: 'spm',
        display_name: 'Swift Package Manager (SPM)'
      },
      syslog: {
        id: 'syslog',
        display_name: 'Syslog'
      },
      tcp: {
        id: 'tcp',
        display_name: 'TCP'
      },
      terraform: {
        id: 'terraform',
        display_name: 'Terraform'
      },
      terraform_aws: {
        id: 'terraform_aws',
        display_name: 'Terraform (AWS)'
      },
      threshold: {
        id: 'threshold',
        display_name: 'Threshold'
      },
      toml: {
        id: 'toml',
        display_name: 'TOML'
      },
      wget: {
        id: 'wget',
        display_name: 'Wget'
      },
      windows: {
        id: 'windows',
        display_name: 'Windows'
      },
      windows_host: {
        id: 'windows_host',
        display_name: 'Windows Host'
      },
      windows_powershell: {
        id: 'windows_powershell',
        display_name: 'Windows PowerShell'
      },
      yaml: {
        id: 'yaml',
        display_name: 'YAML'
      },
      sql_server: {
        id: 'sql_server',
        display_name: 'SQL Server'
      },
      self_hosted: {
        id: 'self_hosted',
        display_name: 'Self-hosted'
      },
      fluent: {
        id: 'fluent',
        display_name: 'Fluent'
      },
      http_client: {
        id: 'http_client',
        display_name: 'HTTP Client'
      },
      splunk_forwarders: {
        id: 'splunk_forwarders',
        display_name: 'Splunk Forwarders (TCP)'
      },
      sumo_logic_hosted_collector: {
        id: 'sumo_logic_hosted_collector',
        display_name: 'Sumo Logic Hosted Collector'
      },
      red: {
        id: 'red',
        display_name: 'Red'
      },
      yellow: {
        id: 'yellow',
        display_name: 'Yellow'
      },
      green: {
        id: 'green',
        display_name: 'Green'
      },
      blue: {
        id: 'blue',
        display_name: 'Blue'
      },
      ocean: {
        id: 'ocean',
        display_name: 'Ocean'
      },
      sky: {
        id: 'sky',
        display_name: 'Sky'
      },
      jeans: {
        id: 'jeans',
        display_name: 'Jeans'
      },
      blueberry: {
        id: 'blueberry',
        display_name: 'Blueberry'
      },
      grass: {
        id: 'grass',
        display_name: 'Grass'
      },
      emerald: {
        id: 'emerald',
        display_name: 'Emerald'
      },
      lime: {
        id: 'lime',
        display_name: 'Lime'
      },
      frog: {
        id: 'frog',
        display_name: 'Frog'
      },
      apple: {
        id: 'apple',
        display_name: 'Apple'
      },
      firetruck: {
        id: 'firetruck',
        display_name: 'Firetruck'
      },
      stop_sign: {
        id: 'stop_sign',
        display_name: 'Stop sign'
      },
      banana: {
        id: 'banana',
        display_name: 'Banana'
      },
      sunflower: {
        id: 'sunflower',
        display_name: 'Sunflower'
      },
      lemon: {
        id: 'lemon',
        display_name: 'Lemon'
      },
      school_bus: {
        id: 'school_bus',
        display_name: 'School bus'
      },
      '7_x_x': {
        id: '7_x_x',
        display_name: '7'
      },
      '6_x_x': {
        id: '6_x_x',
        display_name: '6'
      },
      '5_x_x': {
        id: '5_x_x',
        display_name: '5'
      },
      ecs: {
        id: 'ecs',
        display_name: 'ECS'
      },
      gte_10_x_x: {
        id: 'gte_10_x_x',
        display_name: '10+'
      },
      lte_9_6_x: {
        id: 'lte_9_6_x',
        display_name: '9.6 and below'
      }
    }
  }
};

import { AuthorConsoleData } from '../../../schemas/authorConsole';

export const dbData: AuthorConsoleData = {
  glossary: {
    filtersById: {
      color: {
        id: 'color',
        label: 'Color',
        description: 'DO NOT USE, testing purposes only.'
      },
      item: {
        id: 'item',
        label: 'Item',
        description: 'DO NOT USE, testing purposes only.'
      },
      postgres_version: {
        id: 'postgres_version',
        label: 'Postgres version',
        description:
          'Any Postgres version regardless of its granularity, such as 15, 9.1.2, or ~10.0.0.'
      },
      agent_version: {
        id: 'agent_version',
        label: 'Agent version',
        description:
          'Any Agent version regardless of its granularity, such as 7, 6.32.1, or ~7.0.0.'
      },
      host: {
        id: 'host',
        label: 'Host',
        description:
          'Hosting platform, such as AWS. Can also refer to containers like Kubernetes.'
      },
      host_type: {
        id: 'host_type',
        label: 'Host type',
        description:
          'The machine or container type within a given host, such as EC2. Use only as a followup to a `host` selection.'
      },
      prog_lang: {
        id: 'prog_lang',
        label: 'Language',
        description: 'Programming language, such as Python.'
      },
      os: {
        id: 'os',
        label: 'OS',
        description:
          'Env operating system, such as Linux. Can refer to a mobile OS, but `mobile_os` is preferred for lists of mobile-only options.'
      },
      database: {
        id: 'database',
        label: 'Database'
      },
      mobile_os: {
        id: 'mobile_os',
        label: 'OS',
        description: 'Mobile operating system, such as Android.'
      },
      pkg_mgr: {
        id: 'pkg_mgr',
        label: 'Package manager',
        description: 'Software package manager, such as npm.'
      }
    },
    optionsById: {
      dot_net: {
        id: 'dot_net',
        label: '.NET'
      },
      agent: {
        id: 'agent',
        label: 'Agent'
      },
      agent_v5: {
        id: 'agent_v5',
        label: 'v5'
      },
      agent_v6: {
        id: 'agent_v6',
        label: 'v6'
      },
      agent_v7: {
        id: 'agent_v7',
        label: 'v7'
      },
      agentless_using_an_api_key: {
        id: 'agentless_using_an_api_key',
        label: 'Agentless (using an API key)'
      },
      amazon_ecs: {
        id: 'amazon_ecs',
        label: 'Amazon ECS'
      },
      amazon_opensearch: {
        id: 'amazon_opensearch',
        label: 'Amazon OpenSearch'
      },
      android: {
        id: 'android',
        label: 'Android'
      },
      ansible: {
        id: 'ansible',
        label: 'Ansible'
      },
      api: {
        id: 'api',
        label: 'API'
      },
      auth: {
        id: 'auth',
        label: 'Authentication'
      },
      aws: {
        id: 'aws',
        label: 'AWS'
      },
      aws_cdk: {
        id: 'aws_cdk',
        label: 'AWS CDK'
      },
      aws_cli: {
        id: 'aws_cli',
        label: 'AWS CLI'
      },
      amazon_eks: {
        id: 'amazon_eks',
        label: 'Amazon EKS'
      },
      aws_fargate: {
        id: 'aws_fargate',
        label: 'AWS Fargate'
      },
      aws_s3: {
        id: 'aws_s3',
        label: 'AWS S3'
      },
      aws_sam: {
        id: 'aws_sam',
        label: 'AWS SAM'
      },
      azure: {
        id: 'azure',
        label: 'Azure'
      },
      azure_aks: {
        id: 'azure_aks',
        label: 'Azure AKS'
      },
      azure_storage: {
        id: 'azure_storage',
        label: 'Azure Storage'
      },
      bash: {
        id: 'bash',
        label: 'Bash'
      },
      browser: {
        id: 'browser',
        label: 'Browser'
      },
      carthage: {
        id: 'carthage',
        label: 'Carthage'
      },
      cdn_async: {
        id: 'cdn_async',
        label: 'CDN async'
      },
      cdn_sync: {
        id: 'cdn_sync',
        label: 'CDN sync'
      },
      check_alert: {
        id: 'check_alert',
        label: 'Check Alert'
      },
      chef: {
        id: 'chef',
        label: 'Chef'
      },
      chronicle: {
        id: 'chronicle',
        label: 'Chronicle'
      },
      cloudformation: {
        id: 'cloudformation',
        label: 'CloudFormation'
      },
      cluster_alert: {
        id: 'cluster_alert',
        label: 'Cluster Alert'
      },
      cocoapods: {
        id: 'cocoapods',
        label: 'CocoaPods'
      },
      configmap: {
        id: 'configmap',
        label: 'ConfigMap'
      },
      configuration_file: {
        id: 'configuration_file',
        label: 'Configuration file'
      },
      container_image: {
        id: 'container_image',
        label: 'Container Image'
      },
      containerized: {
        id: 'containerized',
        label: 'Containerized'
      },
      containerized_agent: {
        id: 'containerized_agent',
        label: 'Containerized Agent'
      },
      cucumber: {
        id: 'cucumber',
        label: 'Cucumber'
      },
      curl: {
        id: 'curl',
        label: 'curl'
      },
      daemonset: {
        id: 'daemonset',
        label: 'DaemonSet'
      },
      datadog: {
        id: 'datadog',
        label: 'Datadog'
      },
      datadog_application: {
        id: 'datadog_application',
        label: 'Datadog application'
      },
      datadog_archives: {
        id: 'datadog_archives',
        label: 'Datadog Archives'
      },
      datadog_cli: {
        id: 'datadog_cli',
        label: 'Datadog CLI'
      },
      datadog_operator: {
        id: 'datadog_operator',
        label: 'Datadog Operator'
      },
      debian: {
        id: 'debian',
        label: 'Debian'
      },
      ubuntu: {
        id: 'ubuntu',
        label: 'Ubuntu'
      },
      dedupe: {
        id: 'dedupe',
        label: 'Dedupe'
      },
      docker: {
        id: 'docker',
        label: 'Docker'
      },
      docker_cli: {
        id: 'docker_cli',
        label: 'Docker CLI'
      },
      docker_compose: {
        id: 'docker_compose',
        label: 'Docker Compose'
      },
      dockerfile: {
        id: 'dockerfile',
        label: 'Dockerfile'
      },
      elasticsearch: {
        id: 'elasticsearch',
        label: 'Elasticsearch'
      },
      flutter: {
        id: 'flutter',
        label: 'Flutter'
      },
      github_actions: {
        id: 'github_actions',
        label: 'Github Actions'
      },
      go: {
        id: 'go',
        label: 'Go'
      },
      google: {
        id: 'google',
        label: 'Google'
      },
      google_cloud: {
        id: 'google_cloud',
        label: 'Google Cloud'
      },
      google_cloud_storage: {
        id: 'google_cloud_storage',
        label: 'Google Cloud Storage'
      },
      google_gke: {
        id: 'google_gke',
        label: 'Google GKE'
      },
      gradle: {
        id: 'gradle',
        label: 'Gradle'
      },
      grok_parser: {
        id: 'grok_parser',
        label: 'Grok Parser'
      },
      helm: {
        id: 'helm',
        label: 'Helm'
      },
      http: {
        id: 'http',
        label: 'HTTP'
      },
      ios: {
        id: 'ios',
        label: 'iOS'
      },
      java: {
        id: 'java',
        label: 'Java'
      },
      jenkins: {
        id: 'jenkins',
        label: 'Jenkins'
      },
      json: {
        id: 'json',
        label: 'JSON'
      },
      kotlin: {
        id: 'kotlin',
        label: 'Kotlin'
      },
      kubernetes: {
        id: 'kubernetes',
        label: 'Kubernetes'
      },
      linux: {
        id: 'linux',
        label: 'Linux'
      },
      linux_apt: {
        id: 'linux_apt',
        label: 'Linux (APT)'
      },
      linux_rpm: {
        id: 'linux_rpm',
        label: 'Linux (RPM)'
      },
      log4j: {
        id: 'log4j',
        label: 'Log4j'
      },
      log4j_2: {
        id: 'log4j_2',
        label: 'Log4j 2'
      },
      logs: {
        id: 'logs',
        label: 'Logs'
      },
      mac_os: {
        id: 'mac_os',
        label: 'MacOS'
      },
      manual: {
        id: 'manual',
        label: 'Manual'
      },
      maven: {
        id: 'maven',
        label: 'Maven'
      },
      mongo_db: {
        id: 'mongo_db',
        label: 'MongoDB'
      },
      multitenant: {
        id: 'multitenant',
        label: 'Multi-tenant'
      },
      mysql: {
        id: 'mysql',
        label: 'MySQL'
      },
      n_log: {
        id: 'n_log',
        label: 'NLog'
      },
      node_js: {
        id: 'node_js',
        label: 'Node.js'
      },
      non_cdb: {
        id: 'non_cdb',
        label: 'Non-CDB'
      },
      npm: {
        id: 'npm',
        label: 'NPM'
      },
      nu_get: {
        id: 'nu_get',
        label: 'NuGet'
      },
      objective_c: {
        id: 'objective_c',
        label: 'Objective-C'
      },
      on_premises_ci_provider: {
        id: 'on_premises_ci_provider',
        label: 'On-Premises CI Provider'
      },
      open_search: {
        id: 'open_search',
        label: 'OpenSearch'
      },
      operator: {
        id: 'operator',
        label: 'Operator'
      },
      oracle: {
        id: 'oracle',
        label: 'Oracle'
      },
      php: {
        id: 'php',
        label: 'PHP'
      },
      pip: {
        id: 'pip',
        label: 'pip'
      },
      poetry: {
        id: 'poetry',
        label: 'Poetry'
      },
      postgres: {
        id: 'postgres',
        label: 'Postgres'
      },
      puppet: {
        id: 'puppet',
        label: 'Puppet'
      },
      python: {
        id: 'python',
        label: 'Python'
      },
      quota: {
        id: 'quota',
        label: 'Quota'
      },
      rate: {
        id: 'rate',
        label: 'RATE'
      },
      rds: {
        id: 'rds',
        label: 'RDS'
      },
      react_native: {
        id: 'react_native',
        label: 'React Native'
      },
      redhat: {
        id: 'redhat',
        label: 'RedHat'
      },
      centos: {
        id: 'centos',
        label: 'CentOS'
      },
      suse: {
        id: 'suse',
        label: 'SUSE'
      },
      reduce: {
        id: 'reduce',
        label: 'Reduce'
      },
      replica_set: {
        id: 'replica_set',
        label: 'Replica Set'
      },
      ruby: {
        id: 'ruby',
        label: 'Ruby'
      },
      sensitive_data_scanner: {
        id: 'sensitive_data_scanner',
        label: 'Sensitive Data Scanner'
      },
      serilog: {
        id: 'serilog',
        label: 'Serilog'
      },
      serverless_framework: {
        id: 'serverless_framework',
        label: 'Serverless Framework'
      },
      sharded_cluster: {
        id: 'sharded_cluster',
        label: 'Sharded Cluster'
      },
      splunk_hec: {
        id: 'splunk_hec',
        label: 'Splunk HEC'
      },
      standalone: {
        id: 'standalone',
        label: 'Standalone'
      },
      standard: {
        id: 'standard',
        label: 'Standard'
      },
      sumo_logic: {
        id: 'sumo_logic',
        label: 'Sumo Logic'
      },
      swift: {
        id: 'swift',
        label: 'Swift'
      },
      spm: {
        id: 'spm',
        label: 'Swift Package Manager (SPM)'
      },
      syslog: {
        id: 'syslog',
        label: 'Syslog'
      },
      tcp: {
        id: 'tcp',
        label: 'TCP'
      },
      terraform: {
        id: 'terraform',
        label: 'Terraform'
      },
      terraform_aws: {
        id: 'terraform_aws',
        label: 'Terraform (AWS)'
      },
      threshold: {
        id: 'threshold',
        label: 'Threshold'
      },
      toml: {
        id: 'toml',
        label: 'TOML'
      },
      wget: {
        id: 'wget',
        label: 'Wget'
      },
      windows: {
        id: 'windows',
        label: 'Windows'
      },
      windows_host: {
        id: 'windows_host',
        label: 'Windows Host'
      },
      windows_powershell: {
        id: 'windows_powershell',
        label: 'Windows PowerShell'
      },
      yaml: {
        id: 'yaml',
        label: 'YAML'
      },
      sql_server: {
        id: 'sql_server',
        label: 'SQL Server'
      },
      self_hosted: {
        id: 'self_hosted',
        label: 'Self-hosted'
      },
      fluent: {
        id: 'fluent',
        label: 'Fluent'
      },
      http_client: {
        id: 'http_client',
        label: 'HTTP Client'
      },
      splunk_forwarders: {
        id: 'splunk_forwarders',
        label: 'Splunk Forwarders (TCP)'
      },
      sumo_logic_hosted_collector: {
        id: 'sumo_logic_hosted_collector',
        label: 'Sumo Logic Hosted Collector'
      },
      red: {
        id: 'red',
        label: 'Red'
      },
      yellow: {
        id: 'yellow',
        label: 'Yellow'
      },
      green: {
        id: 'green',
        label: 'Green'
      },
      blue: {
        id: 'blue',
        label: 'Blue'
      },
      ocean: {
        id: 'ocean',
        label: 'Ocean'
      },
      sky: {
        id: 'sky',
        label: 'Sky'
      },
      jeans: {
        id: 'jeans',
        label: 'Jeans'
      },
      blueberry: {
        id: 'blueberry',
        label: 'Blueberry'
      },
      grass: {
        id: 'grass',
        label: 'Grass'
      },
      emerald: {
        id: 'emerald',
        label: 'Emerald'
      },
      lime: {
        id: 'lime',
        label: 'Lime'
      },
      frog: {
        id: 'frog',
        label: 'Frog'
      },
      apple: {
        id: 'apple',
        label: 'Apple'
      },
      firetruck: {
        id: 'firetruck',
        label: 'Firetruck'
      },
      stop_sign: {
        id: 'stop_sign',
        label: 'Stop sign'
      },
      banana: {
        id: 'banana',
        label: 'Banana'
      },
      sunflower: {
        id: 'sunflower',
        label: 'Sunflower'
      },
      lemon: {
        id: 'lemon',
        label: 'Lemon'
      },
      school_bus: {
        id: 'school_bus',
        label: 'School bus'
      },
      '7_x_x': {
        id: '7_x_x',
        label: '7'
      },
      '6_x_x': {
        id: '6_x_x',
        label: '6'
      },
      '5_x_x': {
        id: '5_x_x',
        label: '5'
      },
      ecs: {
        id: 'ecs',
        label: 'ECS'
      },
      gte_10_x_x: {
        id: 'gte_10_x_x',
        label: '10+'
      },
      lte_9_6_x: {
        id: 'lte_9_6_x',
        label: '9.6 and below'
      }
    }
  },
  buildStatus: {
    hasErrors: true,
    errorsByFilePath: {
      '/Users/jen.gilbert/go/src/github.com/DataDog/documentation/markdoc/markdoc-hugo-integration/test/mocks/invalidSite/content/en/bad_interpolated_options_source.mdoc.md':
        [
          {
            message:
              "Invalid options source: The options source 'orange_item_options', which is required for the filter ID 'item', does not exist."
          },
          {
            message:
              "Invalid options source: The options source 'green_item_options', which is required for the filter ID 'item', does not exist."
          },
          {
            message:
              "Invalid options source: The options source 'indigo_item_options', which is required for the filter ID 'item', does not exist."
          },
          {
            message:
              "Invalid options source: The options source 'violet_item_options', which is required for the filter ID 'item', does not exist."
          }
        ],
      '/Users/jen.gilbert/go/src/github.com/DataDog/documentation/markdoc/markdoc-hugo-integration/test/mocks/invalidSite/content/en/bad_literal_options_source.mdoc.md':
        [
          {
            message:
              "Invalid options source: The options source 'red_object_options', which is required for the filter ID 'item', does not exist."
          },
          {
            message:
              "Invalid options source: The options source 'yellow_object_options', which is required for the filter ID 'item', does not exist."
          },
          {
            message:
              "Invalid options source: The options source 'blue_object_options', which is required for the filter ID 'item', does not exist."
          }
        ],
      '/Users/jen.gilbert/go/src/github.com/DataDog/documentation/markdoc/markdoc-hugo-integration/test/mocks/invalidSite/content/en/bad_nested_pref_value_reference.mdoc.md':
        [
          {
            message:
              'Invalid value found in markup: "bleu" is not a valid value for the filter ID "color".',
            searchTerm: 'bleu'
          }
        ],
      '/Users/jen.gilbert/go/src/github.com/DataDog/documentation/markdoc/markdoc-hugo-integration/test/mocks/invalidSite/content/en/bad_placeholder.mdoc.md':
        [
          {
            message:
              "Invalid placeholder: The placeholder <COLOUR> in the options source '<COLOUR>_item_options' refers to an unrecognized filter ID. The file frontmatter must contain a filter with the ID 'colour', and it must be defined before the filter with the ID item.",
            searchTerm: '<COLOUR>_item_options'
          }
        ],
      '/Users/jen.gilbert/go/src/github.com/DataDog/documentation/markdoc/markdoc-hugo-integration/test/mocks/invalidSite/content/en/bad_pref_value_reference.mdoc.md':
        [
          {
            message:
              'Invalid value found in markup: "bleu" is not a valid value for the filter ID "color".',
            searchTerm: 'bleu'
          }
        ],
      '/Users/jen.gilbert/go/src/github.com/DataDog/documentation/markdoc/markdoc-hugo-integration/test/mocks/invalidSite/content/en/bad_variable_id.mdoc.md':
        [
          {
            message: 'Invalid filter ID found in markup: colour',
            searchTerm: 'colour'
          }
        ],
      '/Users/jen.gilbert/go/src/github.com/DataDog/documentation/markdoc/markdoc-hugo-integration/test/mocks/invalidSite/content/en/missing_closing_tag.mdoc.md':
        [
          {
            message: "Node 'if' is missing closing",
            lines: [6, 7]
          },
          {
            message: "Node 'if' is missing closing",
            lines: [9, 10]
          }
        ]
    },
    timestamp: 1733868046
  }
};

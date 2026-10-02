---
title: Automating SQL Server DBM Setup with Terraform
further_reading:
- link: "/database_monitoring/setup_sql_server/selfhosted/"
  tag: "Documentation"
  text: "Setting Up Database Monitoring for self-hosted SQL Server"
- link: "/database_monitoring/troubleshooting/?tab=sqlserver"
  tag: "Documentation"
  text: "Troubleshoot Common Issues"
- link: "/integrations/sqlserver/"
  tag: "Documentation"
  text: "Basic SQL Server Integration"
---

## Overview

This guide demonstrates how to automate the deployment and configuration of SQL Server with Datadog Database Monitoring (DBM) using Terraform and Ansible. This approach is ideal for teams that want to:

- Standardize SQL Server deployments with DBM pre-configured
- Quickly spin up development or testing environments
- Implement infrastructure-as-code best practices
- Reduce manual configuration errors

The automation handles:
- Provisioning Windows Server instances with SQL Server on AWS
- Configuring security groups with least-privilege access
- Installing and configuring the Datadog Agent
- Setting up DBM users with proper permissions
- Configuring Windows authentication for SQL Server monitoring

## Architecture

The solution uses:
- **Terraform** to provision AWS infrastructure (EC2, security groups, key pairs)
- **Ansible** to configure SQL Server and install the Datadog Agent
- **Windows authentication** for secure, password-free SQL Server access
- **ADO provider** for optimal Windows SQL Server integration

```
┌─────────────────────────────────────────┐
│           AWS VPC                       │
│  ┌───────────────────────────────────┐  │
│  │  Subnet                           │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  EC2 Instance (Windows)      │  │  │
│  │  │  ┌────────────────────────┐ │  │  │
│  │  │  │  SQL Server 2022       │ │  │  │
│  │  │  └────────────────────────┘ │  │  │
│  │  │  ┌────────────────────────┐ │  │  │
│  │  │  │  Datadog Agent         │ │  │  │
│  │  │  │  + SQL Server Check    │ │  │  │
│  │  │  │  (Windows Auth)        │ │  │  │
│  │  │  └────────────────────────┘ │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
│     Security Group (IP-restricted)      │
└─────────────────────────────────────────┘
          │
          ▼
   ┌─────────────┐
   │  Datadog    │
   │  Platform   │
   └─────────────┘
```

## Prerequisites

### Required tools

- [Terraform](https://www.terraform.io/downloads.html) >= 1.0
- [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) >= 2.9
- [AWS CLI](https://aws.amazon.com/cli/) (optional, for finding VPC/subnet IDs)
- Python 3 with pip
- PowerShell Core (for verification, optional)

### Required access

1. **AWS Account** with permissions to:
   - Create EC2 instances
   - Create/modify security groups
   - Create key pairs
   - Access specified VPC and subnet

2. **Datadog Account** with:
   - Valid API key
   - Access to Database Monitoring feature

## Project structure

```
windows/
├── providers.tf              # Terraform provider configuration
├── variables.tf             # Input variables with validation
├── main.tf                  # Infrastructure resources
├── outputs.tf               # Helpful outputs
├── terraform.tfvars.example # Configuration template
├── ansible.yaml             # Ansible playbook
├── inventory.tftpl          # Ansible inventory template
├── Makefile                 # Convenience commands
├── verify-dbm.ps1          # Verification script
└── README.md               # Detailed documentation
```

## Configuration

### Step 1: Get your current IP address

For security, the configuration requires your current public IP address instead of allowing access from anywhere (`0.0.0.0/0`):

```bash
# Get your current public IP
curl -s ifconfig.me
# Example output: 203.0.113.42
```

### Step 2: Create configuration file

Copy the example configuration and customize it:

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your values:

```hcl
# AWS Configuration
aws_region  = "us-east-1"
environment = "dev"

# Network Configuration (REQUIRED)
# Find your VPC: aws ec2 describe-vpcs
# Find your subnet: aws ec2 describe-subnets --filters "Name=vpc-id,Values=vpc-xxxxxx"
vpc_id    = "vpc-xxxxxxxxx"     # Your VPC ID
subnet_id = "subnet-xxxxxxxxx"  # Your subnet ID

# Instance Configuration
instance_count = 1
instance_type  = "r5.xlarge"

# Security Configuration
# REQUIRED: Use your current public IP address
# Format: ["YOUR_IP/32"] for a single IP
allowed_rdp_cidr    = ["203.0.113.42/32"]  # Your IP for Remote Desktop
allowed_winrm_cidr  = ["203.0.113.42/32"]  # Your IP for Ansible/WinRM
allowed_mssql_cidr  = ["203.0.113.42/32"]  # Your IP for SQL Server
```

**Important security notes:**
- The `/32` suffix means only that specific IP address is allowed
- For multiple IPs: `["IP1/32", "IP2/32"]`
- For a CIDR range: `["10.0.0.0/24"]`
- Some organizations automatically remove overly permissive `0.0.0.0/0` rules
- Variables include validation to ensure IP addresses are provided

### Step 3: Export Datadog API key

```bash
export DD_API_KEY=your_datadog_api_key
```

## Terraform configuration

### Variables with security validation

The `variables.tf` file defines all configurable parameters with built-in security validation:

```hcl
variable "allowed_rdp_cidr" {
  description = "CIDR blocks allowed to connect via RDP. Use your current IP. Run: curl -s ifconfig.me"
  type        = list(string)

  validation {
    condition     = length(var.allowed_rdp_cidr) > 0
    error_message = "At least one CIDR block must be specified. Use your current IP (e.g., [\"YOUR_IP/32\"])."
  }
}

variable "allowed_winrm_cidr" {
  description = "CIDR blocks allowed to connect via WinRM. Use your current IP."
  type        = list(string)

  validation {
    condition     = length(var.allowed_winrm_cidr) > 0
    error_message = "At least one CIDR block must be specified. Use your current IP (e.g., [\"YOUR_IP/32\"])."
  }
}

variable "allowed_mssql_cidr" {
  description = "CIDR blocks allowed to connect to SQL Server. Use your current IP."
  type        = list(string)

  validation {
    condition     = length(var.allowed_mssql_cidr) > 0
    error_message = "At least one CIDR block must be specified. Use your current IP (e.g., [\"YOUR_IP/32\"])."
  }
}
```

This approach ensures:
- Configuration is **secure by default** - no `0.0.0.0/0` defaults
- Users must explicitly set their IP address
- Terraform validates configuration before applying
- Clear error messages guide users to fix issues

### Infrastructure resources

The `main.tf` file provisions:

1. **Windows Server AMI lookup**:
```hcl
data "aws_ami" "windows" {
  most_recent = true
  owners      = [var.ami_owner]

  filter {
    name   = "name"
    values = [var.ami_name_filter]  # Windows_Server-2022-English-Full-SQL_2022_Enterprise-*
  }
}
```

2. **Security group with IP restrictions**:
```hcl
resource "aws_security_group" "mssql" {
  name        = var.security_group_name
  description = "Security group for Windows SQL Server with Datadog DBM"
  vpc_id      = var.vpc_id

  ingress {
    description = "SQL Server"
    from_port   = 1433
    to_port     = 1433
    protocol    = "tcp"
    cidr_blocks = var.allowed_mssql_cidr  # User's IP only
  }

  ingress {
    description = "Remote Desktop Protocol"
    from_port   = 3389
    to_port     = 3389
    protocol    = "tcp"
    cidr_blocks = var.allowed_rdp_cidr  # User's IP only
  }

  ingress {
    description = "WinRM (HTTP and HTTPS)"
    from_port   = 5985
    to_port     = 5986
    protocol    = "tcp"
    cidr_blocks = var.allowed_winrm_cidr  # User's IP only
  }

  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.security_group_name
  }
}
```

3. **EC2 instance with encrypted storage**:
```hcl
resource "aws_instance" "db" {
  count = var.instance_count

  ami                    = data.aws_ami.windows.id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.aws_key.key_name
  vpc_security_group_ids = [aws_security_group.mssql.id]
  subnet_id              = var.subnet_id
  get_password_data      = true

  root_block_device {
    volume_type = "gp3"
    volume_size = 100
    encrypted   = true  # Encrypted by default
  }

  user_data = <<-EOF
    <powershell>
    iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/ansible/ansible-documentation/devel/examples/scripts/ConfigureRemotingForAnsible.ps1'))
    </powershell>
  EOF

  tags = {
    Name        = "dbm-mssql-windows-example-${count.index + 1}"
    Environment = var.environment
  }
}
```

4. **SSH key generation and storage**:
```hcl
resource "tls_private_key" "key" {
  algorithm = "RSA"
}

resource "local_sensitive_file" "private_key" {
  content         = tls_private_key.key.private_key_pem
  filename        = pathexpand(var.ssh_key_path)
  file_permission = "0600"
}

resource "aws_key_pair" "aws_key" {
  key_name   = var.key_pair_name
  public_key = tls_private_key.key.public_key_openssh
}
```

5. **Ansible inventory generation**:
```hcl
resource "local_file" "ansible_inventory" {
  content = templatefile("inventory.tftpl", {
    ip_addrs     = aws_instance.db[*].public_ip
    ssh_keyfile  = local_sensitive_file.private_key.filename
    ec2_password = var.instance_count > 0 ? rsadecrypt(aws_instance.db[0].password_data, local_sensitive_file.private_key.content) : ""
  })
  filename = "inventory.ini"
}
```

## Ansible configuration

### Playbook structure

The `ansible.yaml` playbook handles:
1. Datadog Agent installation using the official role
2. Creating the DBM Windows user
3. Granting SQL Server permissions
4. Configuring the SQL Server integration

### Key configuration

```yaml
- hosts: dbs
  vars:
    datadog_api_key: # Set with env var: DD_API_KEY

    datadog_checks:
      sqlserver:
        init_config:
        instances:
          - dbm: true
            host: localhost,1433
            connection_string: "Trusted_Connection=yes"  # Windows authentication
            connector: adodbapi
            adoprovider: MSOLEDBSQL
            tags:
              - "service:dbm-example-sqlserver-windows"
              - "env:dev"

  tasks:
    - name: Set the Datadog API Key
      set_fact:
        datadog_api_key: "{{ lookup('env', 'DD_API_KEY') }}"

    - name: Validate Datadog API Key
      fail:
        msg: "DD_API_KEY environment variable is not set or is empty"
      when: datadog_api_key is not defined or datadog_api_key | length == 0

    - name: Install the Datadog Agent
      import_role:
        name: datadog.dd.agent

    - name: Copy the SQL Setup Script
      ansible.builtin.copy:
        dest: 'C:\Users\Administrator\AppData\Local\Temp\setup-dbm-user.sql'
        content: |
          USE master;
          GO

          -- Create login if it doesn't exist
          IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = '{{ ansible_hostname }}\ddagentuser')
          BEGIN
              PRINT 'Creating login [{{ ansible_hostname }}\ddagentuser]';
              CREATE LOGIN [{{ ansible_hostname }}\ddagentuser] FROM WINDOWS WITH DEFAULT_DATABASE=master;
          END
          ELSE
          BEGIN
              PRINT 'Login [{{ ansible_hostname }}\ddagentuser] already exists';
          END
          GO

          -- Create user if it doesn't exist
          IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'ddagentuser')
          BEGIN
              PRINT 'Creating user ddagentuser';
              CREATE USER ddagentuser FOR LOGIN [{{ ansible_hostname }}\ddagentuser];
          END
          ELSE
          BEGIN
              PRINT 'User ddagentuser already exists';
          END
          GO

          -- Grant required permissions for DBM
          PRINT 'Granting permissions to ddagentuser';
          GRANT CONNECT ANY DATABASE to [{{ ansible_hostname }}\ddagentuser];
          GRANT VIEW SERVER STATE to [{{ ansible_hostname }}\ddagentuser];
          GRANT VIEW ANY DEFINITION to [{{ ansible_hostname }}\ddagentuser];
          GO

    - name: Grant permissions to the ddagentuser
      win_shell: |
        try {
            Invoke-Sqlcmd -InputFile "C:\Users\Administrator\AppData\Local\Temp\setup-dbm-user.sql" -ServerInstance "localhost" -ErrorAction Stop
            Write-Output "SQL script executed successfully"
        }
        catch {
            Write-Error "Failed to execute SQL script: $_"
            exit 1
        }
      args:
        executable: powershell.exe
      register: sql_result

    - name: Display SQL execution result
      debug:
        var: sql_result.stdout_lines
```

### Why Windows authentication?

Windows authentication offers several advantages over SQL authentication:
- **No password storage**: Credentials managed by Windows, not in configuration files
- **Integrated with Active Directory**: Works with domain accounts
- **Better security**: Leverages Windows security features
- **Automatic credential rotation**: When Windows credentials change, no config updates needed
- **Native Windows integration**: Optimal for Windows Server environments

## Deployment

### Install dependencies

```bash
make deps
```

This installs:
- Ansible collections (community.general, community.windows, datadog.dd)
- Python dependencies (pymssql, pywinrm)

### Initialize Terraform

```bash
make terraform-init
make terraform-validate
make terraform-plan
```

Review the planned changes. You should see:
- EC2 instance(s) with Windows Server 2022 and SQL Server 2022
- Security group (restricted to your IP)
- SSH key pair
- Local files for SSH key and Ansible inventory

### Deploy infrastructure

```bash
make terraform-apply
```

This creates all AWS resources. The Windows instance takes 5-10 minutes to initialize and configure WinRM.

**Tip**: The Makefile includes helpful targets. Run `make help` to see all available commands.

### Configure SQL Server and Datadog

After waiting for Windows initialization:

```bash
make ansible
```

This:
- Installs the Datadog Agent
- Creates the `ddagentuser` Windows account
- Grants SQL Server DBM permissions
- Configures the SQL Server integration
- Restarts the Datadog Agent

## Verification

### Check deployment outputs

```bash
make terraform-output
```

Example output:
```
instance_public_ips = [
  "3.82.191.32",
]
rdp_commands = [
  "mstsc /v:3.82.191.32",
]
security_group_id = "sg-0767b592634884c5b"
```

### Run verification script

If you have PowerShell Core installed:

```bash
make verify
```

The verification script checks:
1. WinRM connectivity
2. SQL Server service status
3. Datadog Agent service status
4. SQL Server integration configuration
5. DBM user permissions
6. Metrics collection

Example successful output:
```
1. Checking WinRM connectivity...
   [OK] WinRM is accessible on port 5985

2. Checking remote PowerShell session...
   [OK] Remote PowerShell session established

3. Checking SQL Server service status...
   [OK] SQL Server service is running

4. Checking Datadog Agent service status...
   [OK] Datadog Agent service is running

5. Checking Datadog SQL Server integration...
   [OK] SQL Server integration is configured and running

6. Checking ddagentuser account...
   [OK] ddagentuser Windows account exists

7. Checking SQL Server permissions for DBM...
   [OK] DBM permissions found:
      CONNECT ANY DATABASE
      VIEW SERVER STATE
      VIEW ANY DEFINITION
```

### Verify in Datadog UI

1. Log in to your Datadog account
2. Navigate to **APM** > **Database Monitoring** > **Databases**
3. Look for your instance with tags:
   - `service:dbm-example-sqlserver-windows`
   - `env:dev`

You should see:
- Query metrics and performance data
- Execution plans
- Wait events
- Database statistics
- Active queries

## Troubleshooting

### WinRM connection issues

**Problem**: Cannot connect via WinRM after deployment

**Solution**: Windows instances need 5-10 minutes to initialize. Wait longer or check:

```bash
# Test WinRM connectivity (requires PowerShell Core)
Test-WSMan -ComputerName <PUBLIC_IP> -Port 5985
```

If it fails, connect via RDP and check:
```powershell
# Check WinRM service
Get-Service WinRM

# Check WinRM listeners
winrm enumerate winrm/config/listener
```

### Datadog Agent not reporting

**Problem**: Agent installed but no metrics in Datadog

**Solution**: Connect via RDP and check agent status:

```powershell
& "C:\Program Files\Datadog\Datadog Agent\bin\agent.exe" status
```

Look for the SQL Server integration section. If it shows errors:

1. **Check permissions**:
```powershell
# Verify ddagentuser exists
Get-LocalUser ddagentuser

# Test SQL connection as ddagentuser
sqlcmd -S localhost -Q "SELECT SUSER_NAME()"
```

2. **Check configuration**:
```powershell
# View SQL Server check config
Get-Content "C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml"
```

3. **Restart the agent**:
```powershell
Restart-Service datadogagent
```

### SQL Server permissions issues

**Problem**: Integration running but missing some DBM metrics

**Solution**: Verify all required permissions are granted:

```sql
-- Check permissions for ddagentuser
SELECT
    dp.name as principal_name,
    p.permission_name,
    p.state_desc
FROM sys.server_permissions p
INNER JOIN sys.server_principals dp ON p.grantee_principal_id = dp.principal_id
WHERE dp.name LIKE '%ddagentuser%'
ORDER BY p.permission_name;
```

Expected permissions:
- `CONNECT ANY DATABASE`
- `VIEW SERVER STATE`
- `VIEW ANY DEFINITION`

If permissions are missing, re-run the Ansible playbook:
```bash
make ansible
```

### AMI not found

**Problem**: Terraform cannot find the Windows Server AMI

**Solution**: Check available AMIs in your region:

```bash
aws ec2 describe-images \
  --owners 801119661308 \
  --filters "Name=name,Values=Windows_Server-2022-English-Full-SQL_2022_Enterprise-*" \
  --query 'Images[*].[ImageId,Name,CreationDate]' \
  --output table
```

Update the `ami_name_filter` variable in `terraform.tfvars` if needed.

## Cleanup

### Destroy infrastructure

```bash
make terraform-destroy
```

This removes:
- EC2 instances
- Security groups
- Key pairs

**Note**: VPC and subnet are preserved (they're data sources, not managed resources).

### Clean local files

```bash
make full-clean
```

This removes:
- `.terraform/` directory
- `.terraform.lock.hcl`
- `terraform.tfstate*` files
- `inventory.ini`
- SSH key file

## Production considerations

### Security hardening

1. **Use specific CIDR blocks**:
   - Never use `0.0.0.0/0` in production
   - Restrict to known IP ranges (VPN, office networks)
   - Use AWS VPC security groups for internal communication

2. **Implement IAM roles**:
   - Assign IAM instance profiles instead of using access keys
   - Use AWS Systems Manager Session Manager for secure access
   - Enable CloudTrail for audit logging

3. **Enable additional monitoring**:
   - AWS CloudWatch integration
   - VPC Flow Logs
   - GuardDuty for threat detection

4. **Use secrets management**:
   - Store API keys in AWS Secrets Manager
   - Use Parameter Store for configuration
   - Rotate credentials regularly

### High availability

For production deployments:

1. **SQL Server AlwaysOn**:
   - Deploy multiple instances across availability zones
   - Configure AlwaysOn Availability Groups
   - Use Application Load Balancer for routing
   - See: [Monitor your AlwaysOn availability groups](https://docs.datadoghq.com/database_monitoring/guide/sql_alwayson/)

2. **Automated backups**:
   - Enable automated EBS snapshots
   - Configure SQL Server backup jobs
   - Store backups in S3 with lifecycle policies

3. **Disaster recovery**:
   - Cross-region replication
   - Documented recovery procedures
   - Regular disaster recovery drills

### Performance optimization

1. **Instance sizing**:
   - Start with `r5.xlarge` (4 vCPUs, 32 GB RAM)
   - Monitor CPU, memory, and I/O utilization
   - Scale vertically (larger instance) or horizontally (read replicas)

2. **Storage optimization**:
   - Use gp3 volumes with provisioned IOPS for high-throughput workloads
   - Consider io2 volumes for mission-critical databases
   - Separate tempdb onto dedicated volumes

3. **Network optimization**:
   - Use Placement Groups for low-latency requirements
   - Enable Enhanced Networking
   - Consider Direct Connect for on-premises integration

### Cost optimization

1. **Right-size instances**:
   - Use CloudWatch metrics to identify over-provisioned resources
   - Consider Reserved Instances for long-term workloads
   - Use Savings Plans for flexible commitments

2. **Storage costs**:
   - Implement S3 lifecycle policies for backups
   - Delete old EBS snapshots
   - Use S3 Intelligent-Tiering for logs

3. **Development environments**:
   - Shut down instances during off-hours
   - Use smaller instance types for dev/test
   - Implement auto-shutdown policies

## Example: Multi-environment setup

For managing multiple environments (dev, staging, production):

### Directory structure

```
terraform/
├── modules/
│   └── sql-server-dbm/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   └── terraform.tfvars
│   ├── staging/
│   │   ├── main.tf
│   │   └── terraform.tfvars
│   └── production/
│       ├── main.tf
│       └── terraform.tfvars
└── ansible/
    └── dbm-setup.yaml
```

### Environment-specific configuration

**dev/terraform.tfvars**:
```hcl
environment    = "dev"
instance_type  = "r5.large"    # Smaller for dev
instance_count = 1
```

**production/terraform.tfvars**:
```hcl
environment    = "production"
instance_type  = "r5.2xlarge"  # Larger for prod
instance_count = 3              # HA setup
```

### Using Terraform workspaces

```bash
# Create workspace for each environment
terraform workspace new dev
terraform workspace new staging
terraform workspace new production

# Deploy to dev
terraform workspace select dev
terraform apply -var-file=environments/dev/terraform.tfvars

# Deploy to production
terraform workspace select production
terraform apply -var-file=environments/production/terraform.tfvars
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

| Field                         | Description                                                                                                                                           |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vault_auth_type`             | Authentication method. Supported values: `aws`, `kubernetes`. When unset, AppRole, userpass, or LDAP is used based on which credentials are provided. |
| `vault_role_id`               | AppRole role ID. Use with `vault_secret_id`.                                                                                                          |
| `vault_secret_id`             | AppRole secret ID. Use with `vault_role_id`.                                                                                                          |
| `vault_username`              | Username for userpass authentication. Use with `vault_password`.                                                                                      |
| `vault_password`              | Password for userpass authentication. Use with `vault_username`.                                                                                      |
| `vault_ldap_username`         | Username for LDAP authentication. Use with `vault_ldap_password`.                                                                                     |
| `vault_ldap_password`         | Password for LDAP authentication. Use with `vault_ldap_username`.                                                                                     |
| `vault_aws_role`              | Vault role name for AWS IAM authentication. Required when `vault_auth_type: aws`.                                                                     |
| `vault_aws_iam_server_id`     | Value for the `X-Vault-AWS-IAM-Server-ID` header, used to prevent replay attacks.                                                                     |
| `aws_region`                  | AWS region for IAM authentication requests. Defaults to `us-east-1`.                                                                                  |
| `vault_kubernetes_role`       | Vault role name for Kubernetes authentication. Required when `vault_auth_type: kubernetes`.                                                           |
| `vault_kubernetes_jwt`        | Kubernetes service account JWT token as a string.                                                                                                     |
| `vault_kubernetes_jwt_path`   | Path to the Kubernetes JWT token file. Defaults to `/var/run/secrets/kubernetes.io/serviceaccount/token`.                                             |
| `vault_kubernetes_mount_path` | Vault mount path for the Kubernetes auth method.                                                                                                      |
| `implicit_auth`               | Set to `true` to skip authentication and use the token already set in the Vault client environment (for example, `VAULT_TOKEN`).                      |

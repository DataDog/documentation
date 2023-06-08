---
title: Setting up Oracle
kind: documentation
description: Setting up Database Monitoring on an Oracle database
disable_sidebar: true
private: true
is_beta: true
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-info">
The features described on this page are in private beta. Contact your Customer Success Manager for information on the required Agent build and installation instructions.
</div>

### Oracle versions supported

|  | Self-hosted | RDS |
|--|-------------|-----| 
| Oracle 19c | {{< X >}} | {{< X >}} |
| Oracle 21c | {{< X >}} | {{< X >}} |

The following deployment configurations are supported: self-managed, RDS, single-node, and multi-tenant. Note these do not include RAC and Exadata or legacy architectures.

For setup instructions, select your hosting type:

{{< partial name="dbm/dbm-setup-oracle" >}}

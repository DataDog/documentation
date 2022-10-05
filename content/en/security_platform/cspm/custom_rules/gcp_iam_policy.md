---
title: gcp_iam_policy
kind: documentation
---

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `audit_configs`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: Specifies cloud audit logging configuration for this policy.<br>
  **GCP name**: `auditConfigs`
   - `audit_log_configs`<br>
      **Type**: `UNORDERED_LIST_STRUCT`<br>
      **Description**: The configuration for logging of each type of permission.<br>
      **GCP name**: `auditLogConfigs`
       - `exempted_members`<br>
        **Type**: `UNORDERED_LIST_STRING`<br>
            **Description**: Specifies the identities that do not cause logging for this type of permission. Follows the same format of `Binding.members`.<br>
            **GCP name**: `exemptedMembers`<br>
       - `log_type`<br>
        **Type**: `STRING`<br>
            **Description**: The log type that this config enables. <br>
            **GCP name**: `logType`<br>
                **Possible values**:<br>
          - `LOG_TYPE_UNSPECIFIED` - Default case. Should never be this.<br>
          - `ADMIN_READ` - Admin reads. Example: CloudIAM getIamPolicy<br>
          - `DATA_WRITE` - Data writes. Example: CloudSQL Users create<br>
          - `DATA_READ` - Data reads. Example: CloudSQL Users list<br>
   - `service`<br>
    **Type**: `STRING`<br>
        **Description**: Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.<br>
        **GCP name**: `service`<br>
## `bindings`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`.<br>
  **GCP name**: `bindings`
   - `condition`<br>
      **Type**: `STRUCT`<br>
      **Description**: The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation][1].<br>
      **GCP name**: `condition`
       - `description`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. Description of the expression. This is a longer text which describes the expression, for example, when hovered over it in a UI.<br>
            **GCP name**: `description`<br>
       - `expression`<br>
        **Type**: `STRING`<br>
            **Description**: Textual representation of an expression in Common Expression Language syntax.<br>
            **GCP name**: `expression`<br>
       - `location`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. String indicating the location of the expression for error reporting, for example, a file name and a position in the file.<br>
            **GCP name**: `location`<br>
       - `title`<br>
        **Type**: `STRING`<br>
            **Description**: Optional. Title for the expression, a short string describing its purpose. This can be used, for example, in UIs which allow to enter the expression.<br>
            **GCP name**: `title`<br>
   - `members`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
    **Description**: Specifies the principals requesting access for a Google Cloud resource. <br>
    **Possible values**:<br>
    - `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. <br>
    - `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. <br>
    - `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com`.<br>
    - `serviceAccount:{emailid}`: An email address that represents a service account. For example, `my-other-app@appspot.gserviceaccount.com`. <br>
    - `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. <br>
    - `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. <br>
    - `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. <br>
    - `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. <br>
    - `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. <br>
        **GCP name**: `members`<br>
   - `role`<br>
    **Type**: `STRING`<br>
        **Description**: Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`.<br>
        **GCP name**: `role`<br>
## `gcp_resource_type`
**Type**: `STRING`<br>
    **Description**: The resource type this iam policy is associated with.<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `member_to_roles`
  **Type**: `UNORDERED_LIST_STRUCT`<br>
  **Description**: A map between each member to all the memberships that it belongs to. It is derived from the bindings field.<br>
  **GCP name**: `na`
   - `roles`<br>
    **Type**: `UNORDERED_LIST_STRING`<br>
   - `member`<br>
    **Type**: `STRING`<br>
## `organization_id`
**Type**: `STRING`<br>
## `parent`
**Type**: `STRING`<br>
## `project_id`
**Type**: `STRING`<br>
## `project_number`
**Type**: `STRING`<br>
## `resource_name`
**Type**: `STRING`<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `version`
**Type**: `INT32`<br>
**Description**: Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: 
- Getting a policy that includes a conditional role binding 
- Adding a conditional role binding to a policy 
- Changing a conditional role binding in a policy 
- Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation][1].<br>
    **GCP name**: `version`<br>


[1]: https://cloud.google.com/iam/help/conditions/resource-policies

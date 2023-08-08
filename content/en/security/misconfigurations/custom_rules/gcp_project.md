---
dependencies: []
disable_edit: true
---
# gcp_project

## `ancestors`
**Type**: `UNORDERED_LIST_STRING`<br>
## `create_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `createTime`<br>
**Description**: Output only. Creation time.<br>
## `delete_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `deleteTime`<br>
**Description**: Output only. The time at which this resource was requested for deletion.<br>
## `etag`
**Type**: `STRING`<br>
**Provider name**: `etag`<br>
**Description**: Output only. A checksum computed by the server based on the current value of the Project resource. This may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding.<br>
## `gcp_display_name`
**Type**: `STRING`<br>
**Provider name**: `displayName`<br>
**Description**: Optional. A user-assigned display name of the project. When present it must be between 4 to 30 characters. Allowed characters are: lowercase and uppercase letters, numbers, hyphen, single-quote, double-quote, space, and exclamation point. Example: `My Project`<br>
## `labels`
**Type**: `UNORDERED_LIST_STRING`<br>
## `name`
**Type**: `STRING`<br>
**Provider name**: `name`<br>
**Description**: Output only. The unique resource name of the project. It is an int64 generated number prefixed by "projects/". Example: `projects/415104041262`<br>
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
## `state`
**Type**: `STRING`<br>
**Provider name**: `state`<br>
**Description**: Output only. The project lifecycle state. <br>
**Possible values**:<br>
  - `STATE_UNSPECIFIED` - Unspecified state. This is only used/useful for distinguishing unset values.<br>
  - `ACTIVE` - The normal and active state.<br>
  - `DELETE_REQUESTED` - The project has been marked for deletion by the user (by invoking DeleteProject) or by the system (Google Cloud Platform). This can generally be reversed by invoking UndeleteProject.<br>
## `tags`
**Type**: `UNORDERED_LIST_STRING`<br>
## `update_time`
**Type**: `TIMESTAMP`<br>
**Provider name**: `updateTime`<br>
**Description**: Output only. The most recent time this resource was modified.<br>

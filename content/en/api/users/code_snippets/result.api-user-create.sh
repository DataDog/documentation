{
    "included": [
        {
            "type": "roles",
            "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
            "attributes": {"name": "Datadog Admin Role", "created_at": "2019-09-12T06:46:59.050993+00:00", "modified_at": "2019-09-12T06:46:59.050993+00:00"},
            "relationships": {"permissions": {"data": [{"type": "permissions", "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}]}}
        },
        {
            "type": "permissions",
            "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
            "attributes": {
                "name": "admin",
                "display_name": "Privileged Access",
                "description": "This permission gives you the ability to view and edit everything in your Datadog organization that does not have an explicitly defined permission. This includes billing and usage, user, key, and organization management. This permission is inclusive of all Standard access permissions.",
                "created": "2018-10-19T15:35:23.734317+00:00",
                "group_name": "General",
                "display_type": "other",
                "restricted": false
            }
        }
    ],
    "data": {
        "type": "users",
        "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
        "attributes": {
            "name": "Test",
            "handle": "test@datadoghq.com",
            "created_at": "2020-01-31T12:28:45.283905+00:00",
            "email": "test@datadoghq.com",
            "icon": "https://secure.gravatar.com/avatar/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
            "title": "Test title",
            "verified": false,
            "disabled": false,
            "allowed_login_methods": [],
            "status": "Pending"
        },
        "relationships": {"roles": {"data": [{"type": "roles", "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}]}, "org": {"data": {"type": "orgs", "id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"}}}
    }
}
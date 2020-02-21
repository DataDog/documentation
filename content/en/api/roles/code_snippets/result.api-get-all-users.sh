{
    "included": [
        {
            "type": "roles",
            "id": "$ROLE_ID",
            "attributes": {"name": "$ROLE_NAME", "created_at": "2000-02-29T16:50:43.607749+00:00", "modified_at": "2000-02-29T16:50:43.607749+00:00"},
            "relationships": {"permissions": {"data": [{"type": "permissions", "id": "$PERMISSION_ID"}, {"type": "permissions", "id": "$PERMISSION_ID"}]}}
        }
    ],
    "meta": {"page": {"total_filtered_count": 1, "total_count": 1}},
    "data": [
        {
            "type": "users",
            "id": "$USER_ID",
            "attributes": {
                "name": "Example user",
                "handle": "user@example.org",
                "created_at": "2000-02-29T14:26:26.983187+00:00",
                "email": "user@example.org",
                "icon": "https://secure.gravatar.com/avatar/abc123abc123",
                "title": null,
                "verified": true,
                "disabled": false,
                "allowed_login_methods": [],
                "status": "Active"
            },
            "relationships": {"roles": {"data": [{"type": "roles", "id": "$ROLE_ID"}]}, "org": {"data": {"type": "orgs", "id": "$ORG_ID"}}}
        }
    ]
}
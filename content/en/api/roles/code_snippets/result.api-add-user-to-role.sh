{
    "meta": {"page": {"total_count": 1}},
    "data": [
        {
            "type": "users",
            "id": "$USER_UUID",
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
            "relationships": {"roles": {"data": [{"type": "roles", "id": "$ROLE_UUID"}]}, "org": {"data": {"type": "orgs", "id": "$ORG_UUID"}}}
        }
    ]
}
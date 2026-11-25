- (Optional) Toggle **Verify client identities** to only allow clients whose certificate identities match an allowlist. This requires **Verify certificate** and a `CA Certificate Path`, and Worker version 2.27.0 or later. See [Client identity allowlists][10250] for the rule format and matching behavior.
  - Select a **Mode**:
    - **Enforce** (default): Reject clients that no rule allows during the TLS handshake.
    - **Audit**: Accept clients that no rule allows, and report them in Worker logs and metrics. Use this mode to test an allowlist before enforcing it.
  - Select an **Allowlist**:
    - **File**: Enter the path to an allowlist file. The Worker reloads the file within a minute of a change, without a pipeline update.
    - **Inline**: Add one or more rules. Each rule has a name and at least one list of common name, DNS SAN, or URI SAN patterns.

[10250]: /observability_pipelines/sources/#client-identity-allowlists

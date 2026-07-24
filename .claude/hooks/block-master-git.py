#!/usr/bin/env python3

"""
Claude Code PreToolUse hook that blocks git commits and pushes targeting master.

Enforces the Critical Rules in CLAUDE.md at the harness layer, before git runs.
This supplements the .husky hooks rather than replacing them: because this hook
runs before the git process starts, it also catches --no-verify and HUSKY=0,
which bypass husky entirely.

Reads a JSON payload on stdin with `tool_name` and `tool_input`. Exit code 2
blocks the tool call and feeds stderr back to Claude; exit 0 allows it.

Fails open. A malformed payload, a non-git command, or an unreadable git state
allows the call through -- a hook that hard-failed would block every Bash call.
"""

import json
import os
import re
import shlex
import subprocess
import sys

PROTECTED = {"master"}

# Splits a command line on shell operators so `cd foo && git push` is inspected.
SEGMENT_SPLIT = re.compile(r"&&|\|\||;|\||\n")

# Leading VAR=value assignments, e.g. `HUSKY=0 git commit`.
ASSIGNMENT = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*=")

# `git` global flags that consume the following token. `-c` and `--config-env`
# matter here beyond argument counting: `git -c core.hooksPath=/dev/null commit`
# disables the .husky hooks, so the subcommand behind them must still be found.
GIT_GLOBAL_VALUE_FLAGS = {
    "-C",
    "-c",
    "--config-env",
    "--git-dir",
    "--work-tree",
    "--namespace",
    "--exec-path",
}

# `git push` flags that consume the following token, so it is not mistaken for
# a remote or a refspec.
PUSH_VALUE_FLAGS = {
    "-o",
    "--push-option",
    "--repo",
    "--receive-pack",
    "--exec",
}

FORCE_FLAGS = {"--force", "--force-with-lease", "--force-if-includes"}

# Refspec destinations that resolve to whatever branch HEAD points at, so the
# current branch decides whether the push is protected.
HEAD_ALIASES = {"HEAD", "@"}

BRANCH_ADVICE = (
    "Create a feature branch first: git checkout -b <name>/<description>\n"
    "See the Critical Rules and Branch Naming sections in CLAUDE.md."
)


def fail(message):
    """Format a block message for stderr."""
    return "[block-master-git] {}\n".format(message)


def has_force_flag(args):
    """
    Return True if any argument is a force flag.

    Matches on the flag name only, so the value forms
    (`--force-with-lease=refs/heads/x`) are caught alongside the bare flags.
    """
    return any(arg.split("=", 1)[0] in FORCE_FLAGS for arg in args)


def git(*args):
    """Run a git command, returning stripped stdout or None on any failure."""
    try:
        result = subprocess.run(
            ["git"] + list(args),
            capture_output=True,
            text=True,
        )
    except (OSError, subprocess.SubprocessError):
        return None
    if result.returncode != 0:
        return None
    return result.stdout.strip()


def current_branch_state():
    """
    Return a description of the current HEAD if it is on master, else None.

    Mirrors .husky/pre-commit, including the detached-HEAD case: when HEAD is
    detached, `git branch --show-current` returns an empty string, so a plain
    name comparison silently passes even when HEAD sits on master's tip.
    Compare SHAs to catch that.
    """
    branch = git("branch", "--show-current")
    if branch is None:
        return None
    if branch in PROTECTED:
        return "HEAD is on {}".format(branch)

    if branch == "":
        head_sha = git("rev-parse", "HEAD")
        if head_sha is None:
            return None
        for protected in sorted(PROTECTED):
            protected_sha = git("rev-parse", "refs/heads/{}".format(protected))
            if protected_sha and head_sha == protected_sha:
                return "HEAD is detached at {}'s tip".format(protected)
    return None


def strip_assignments(tokens):
    """Split leading VAR=value assignments off the front of a command."""
    assigns = {}
    rest = list(tokens)
    while rest and ASSIGNMENT.match(rest[0]):
        name, _, value = rest.pop(0).partition("=")
        assigns[name] = value
    return assigns, rest


def find_subcommand(tokens):
    """
    Split `git` global flags off the subcommand.

    Returns (globals, subcommand, remaining_args). The globals are returned
    rather than discarded so `-c core.hooksPath=...` can be inspected.
    """
    index = 0
    while index < len(tokens):
        token = tokens[index]
        if not token.startswith("-"):
            return tokens[:index], token, tokens[index + 1 :]
        if token in GIT_GLOBAL_VALUE_FLAGS:
            index += 2
        else:
            index += 1
    return tokens, None, []


def disables_hooks(globals_):
    """Return True if the global flags turn off the repository's git hooks."""
    for index, token in enumerate(globals_):
        value = None
        if token in ("-c", "--config-env"):
            value = globals_[index + 1] if index + 1 < len(globals_) else ""
        elif token.startswith("-c") and token != "-c":
            # Attached form, e.g. `-ccore.hooksPath=/dev/null`.
            value = token[2:]
        elif token.startswith("--config-env="):
            value = token[len("--config-env=") :]
        if value is None:
            continue
        if value.split("=", 1)[0].strip().lower() == "core.hookspath":
            return True
    return False


def refspec_destination(refspec):
    """Return the branch name a refspec writes to, stripped of any prefix."""
    # `foo:refs/heads/master` -> take the part after the LAST colon so the
    # refs/heads/ prefix is handled rather than tripping on the first colon.
    destination = refspec.rsplit(":", 1)[-1] if ":" in refspec else refspec
    destination = destination.strip()
    if destination.startswith("refs/heads/"):
        destination = destination[len("refs/heads/") :]
    return destination


def destination_is_protected(refspec):
    """Return the protected branch a refspec targets, or None."""
    destination = refspec_destination(refspec)
    return destination if destination in PROTECTED else None


def push_targets_protected(args):
    """
    Return a reason string if a `git push` would write to a protected branch.

    Deliberately branch-independent for explicit refspecs: a push of
    `some-branch:master` from a feature branch must still be blocked.
    """
    if "--all" in args or "--mirror" in args:
        return "this push includes all branches, which covers {}".format(
            "/".join(sorted(PROTECTED))
        )

    positional = []
    index = 0
    while index < len(args):
        token = args[index]
        if token.startswith("-"):
            # --flag=value is self-contained; --flag value consumes the next token.
            if token in PUSH_VALUE_FLAGS:
                index += 2
                continue
            if token in ("--delete", "-d"):
                index += 1
                continue
            index += 1
            continue
        positional.append(token)
        index += 1

    # First positional is the remote; anything after it is a refspec.
    refspecs = positional[1:] if len(positional) > 1 else []

    for refspec in refspecs:
        protected = destination_is_protected(refspec)
        if protected:
            return "this push targets {}".format(protected)

    # `git push origin HEAD` names a refspec but still resolves through HEAD,
    # so it writes to master when HEAD is on master. Fall through to the
    # current-branch check rather than treating it as an explicit destination.
    follows_head = any(
        refspec_destination(refspec) in HEAD_ALIASES for refspec in refspecs
    )

    if refspecs and not follows_head:
        # Explicit, non-protected destinations. Allow.
        return None

    # No refspec, or one that resolves through HEAD: git resolves the
    # destination from the current branch.
    state = current_branch_state()
    if state:
        return "{}, so this push would write to a protected branch".format(state)

    if not refspecs and git("config", "push.default") == "matching":
        return (
            "push.default is 'matching', so a bare push can write to "
            "a protected branch. Name the branch explicitly."
        )
    return None


def check_segment(segment):
    """Inspect one command segment. Return a block reason, or None to allow."""
    try:
        tokens = shlex.split(segment, comments=False)
    except ValueError:
        # Unbalanced quotes. Be conservative: block only if this fragment looks
        # like a git command carrying a danger token.
        lowered = segment.lower()
        if "git" in lowered and any(
            marker in lowered for marker in ("--force", "--no-verify", "husky=0")
        ):
            return "unparseable git command contains a forbidden flag"
        return None

    if not tokens:
        return None

    assigns, tokens = strip_assignments(tokens)
    if not tokens:
        return None

    invoked = os.path.basename(tokens[0])
    if invoked != "git":
        return None

    if assigns.get("HUSKY") == "0":
        return (
            "HUSKY=0 disables the repository's git hooks.\n"
            "CLAUDE.md forbids bypassing the .husky hooks."
        )

    globals_, subcommand, args = find_subcommand(tokens[1:])
    if subcommand is None:
        return None

    if disables_hooks(globals_):
        return (
            "core.hooksPath disables the repository's git hooks.\n"
            "CLAUDE.md forbids bypassing the .husky hooks."
        )

    short_flags = "".join(
        token[1:] for token in args if token.startswith("-") and not token.startswith("--")
    )

    if subcommand == "push":
        if has_force_flag(args) or "f" in short_flags:
            return (
                "force-push is forbidden. It rewrites history and destroys "
                "commit history in open PRs.\nSee the Critical Rules in CLAUDE.md."
            )
        if "--no-verify" in args:
            return (
                "--no-verify skips the .husky pre-push guards.\n"
                "CLAUDE.md forbids bypassing the .husky hooks."
            )
        reason = push_targets_protected(args)
        if reason:
            return "{}.\n{}".format(reason, BRANCH_ADVICE)
        return None

    if subcommand == "commit":
        # For commit, -n means --no-verify. (For push it means --dry-run, which
        # is harmless, so that check lives in the push branch above.)
        if "--no-verify" in args or "n" in short_flags:
            return (
                "--no-verify skips the .husky pre-commit guards.\n"
                "CLAUDE.md forbids bypassing the .husky hooks."
            )
        state = current_branch_state()
        if state:
            return "{}. Do not commit directly to a protected branch.\n{}".format(
                state, BRANCH_ADVICE
            )
        return None

    if has_force_flag(args):
        return (
            "force-push is forbidden. It rewrites history and destroys "
            "commit history in open PRs.\nSee the Critical Rules in CLAUDE.md."
        )

    return None


def main():
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, UnicodeDecodeError, ValueError):
        return 0

    if not isinstance(payload, dict) or payload.get("tool_name") != "Bash":
        return 0

    tool_input = payload.get("tool_input")
    if not isinstance(tool_input, dict):
        return 0

    command = tool_input.get("command")
    if not isinstance(command, str) or not command.strip():
        return 0

    for segment in SEGMENT_SPLIT.split(command):
        reason = check_segment(segment)
        if reason:
            sys.stderr.write(fail(reason))
            return 2

    return 0


if __name__ == "__main__":
    sys.exit(main())

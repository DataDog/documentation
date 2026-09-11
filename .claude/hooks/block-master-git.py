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

# `git` global flags that consume the following token.
GIT_GLOBAL_VALUE_FLAGS = {"-C", "--git-dir", "--work-tree", "--namespace", "--exec-path"}

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

# `--force-with-lease` and `--force-if-includes` accept an optional `=value`
# suffix (e.g. `--force-with-lease=refs/heads/x:sha`). Matching FORCE_FLAGS by
# exact membership misses that form, so check prefixes too.
FORCE_FLAG_PREFIXES = tuple(flag + "=" for flag in FORCE_FLAGS)


def has_force_flag(args):
    return any(
        flag in FORCE_FLAGS or flag.startswith(FORCE_FLAG_PREFIXES) for flag in args
    )

BRANCH_ADVICE = (
    "Create a feature branch first: git checkout -b <name>/<description>\n"
    "See the Critical Rules and Branch Naming sections in CLAUDE.md."
)


def fail(message):
    """Format a block message for stderr."""
    return "[block-master-git] {}\n".format(message)


def git(*args, global_flags=()):
    """
    Run a git command, returning stripped stdout or None on any failure.

    `global_flags` are spliced in before the subcommand (e.g. `-C <dir>`) so
    callers inspecting repo state honor a `-C`/`--git-dir`/`--work-tree` the
    caller passed on the original command line, rather than always
    inspecting the hook process's own cwd.
    """
    try:
        result = subprocess.run(
            ["git"] + list(global_flags) + list(args),
            capture_output=True,
            text=True,
        )
    except (OSError, subprocess.SubprocessError):
        return None
    if result.returncode != 0:
        return None
    return result.stdout.strip()


def current_branch_state(global_flags=()):
    """
    Return a description of the current HEAD if it is on master, else None.

    Mirrors .husky/pre-commit, including the detached-HEAD case: when HEAD is
    detached, `git branch --show-current` returns an empty string, so a plain
    name comparison silently passes even when HEAD sits on master's tip.
    Compare SHAs to catch that.
    """
    branch = git("branch", "--show-current", global_flags=global_flags)
    if branch is None:
        return None
    if branch in PROTECTED:
        return "HEAD is on {}".format(branch)

    if branch == "":
        head_sha = git("rev-parse", "HEAD", global_flags=global_flags)
        if head_sha is None:
            return None
        for protected in sorted(PROTECTED):
            protected_sha = git(
                "rev-parse", "refs/heads/{}".format(protected), global_flags=global_flags
            )
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


# `env` flags that consume the following token, so it is not mistaken for the
# wrapped command (e.g. `env -u PATH git push` should still resolve to `git`).
ENV_VALUE_FLAGS = {"-u", "--unset", "-C", "--chdir"}

# `env -S/--split-string STRING` re-parses STRING itself as a command line
# (its own quoting/escaping rules, not the shell's), so it needs its own
# recursive split rather than being treated as an opaque value token.
ENV_SPLIT_STRING_FLAGS = {"-S", "--split-string"}

# Shell builtins/prefixes that run their argument as-is without changing what
# binary is ultimately invoked, so they can simply be peeled off.
TRANSPARENT_WRAPPERS = {"command", "builtin", "exec"}

# `sh -c '...'` / `bash -c '...'` hand a whole command line to a fresh shell.
SHELL_C_INVOCATIONS = {"sh", "bash", "zsh", "dash", "ksh"}


def strip_backslash_escape(token):
    """`\\git` is a bare escape that stops alias/function lookup but still runs git."""
    if token.startswith("\\") and len(token) > 1:
        return token[1:]
    return token


def strip_env_wrapper(assigns, tokens):
    """
    Unwrap one leading `env [OPTIONS] [VAR=value ...] command ...` layer.

    `env VAR=value git push` sets VAR for the child process the same as a
    plain leading assignment, but the earlier assignment stripping alone
    doesn't see it because `env` is the token in position 0. Without
    unwrapping, `invoked` resolves to "env" and every git-specific check
    downstream is skipped.

    Returns (assigns, tokens, changed). `changed` is False when nothing was
    unwrapped, so the caller's peel loop can stop.
    """
    if not tokens or os.path.basename(tokens[0]) != "env":
        return assigns, tokens, False

    rest = tokens[1:]
    index = 0
    while index < len(rest):
        token = rest[index]
        if token in ENV_SPLIT_STRING_FLAGS:
            # Consume the flag and its STRING argument, then splice the
            # re-parsed tokens from STRING in as the new front of the command
            # so downstream checks see through it (e.g. `env -S "HUSKY=0 git
            # push origin feature:master"`).
            if index + 1 >= len(rest):
                return assigns, [], True
            try:
                inner = shlex.split(rest[index + 1], comments=False)
            except ValueError:
                return assigns, [], True
            return assigns, inner + rest[index + 2 :], True
        if token.startswith("-"):
            if token in ENV_VALUE_FLAGS:
                index += 2
            else:
                index += 1
            continue
        if ASSIGNMENT.match(token):
            name, _, value = token.partition("=")
            assigns[name] = value
            index += 1
            continue
        break

    return assigns, rest[index:], True


def strip_transparent_wrapper(tokens):
    """Peel a leading `command`/`builtin`/`exec` or backslash-escape."""
    if not tokens:
        return tokens, False

    head = tokens[0]
    if os.path.basename(head) in TRANSPARENT_WRAPPERS:
        return tokens[1:], True

    unescaped = strip_backslash_escape(head)
    if unescaped != head:
        return [unescaped] + tokens[1:], True

    return tokens, False


def unwrap_shell_c(assigns, tokens):
    """
    If the command is `sh -c '...'` (or bash/zsh/dash/ksh), recurse into the
    quoted command line so `sh -c "git push --force origin master"` is
    inspected the same as a bare `git push --force origin master`.

    Any positional arguments after the STRING become $0, $1, ... inside the
    child shell and are not part of the command itself, so they are dropped.
    """
    if not tokens or os.path.basename(tokens[0]) not in SHELL_C_INVOCATIONS:
        return assigns, tokens, False

    rest = tokens[1:]
    index = 0
    while index < len(rest):
        token = rest[index]
        if token == "-c":
            if index + 1 >= len(rest):
                return assigns, [], True
            try:
                inner = shlex.split(rest[index + 1], comments=False)
            except ValueError:
                return assigns, [], True
            return assigns, inner, True
        if token.startswith("-"):
            index += 1
            continue
        break

    return assigns, tokens, False


def unwrap_command(assigns, tokens):
    """Repeatedly peel wrapper layers until the real invoked command surfaces."""
    for _ in range(10):
        assigns, tokens, changed_env = strip_env_wrapper(assigns, tokens)
        tokens, changed_transparent = strip_transparent_wrapper(tokens)
        assigns, tokens, changed_shell = unwrap_shell_c(assigns, tokens)
        if not (changed_env or changed_transparent or changed_shell):
            break
    return assigns, tokens


def find_subcommand(tokens):
    """Skip `git` global flags and return (subcommand, remaining_args, global_flags)."""
    global_flags = []
    index = 0
    while index < len(tokens):
        token = tokens[index]
        if not token.startswith("-"):
            return token, tokens[index + 1 :], global_flags
        if token in GIT_GLOBAL_VALUE_FLAGS:
            global_flags.extend(tokens[index : index + 2])
            index += 2
        else:
            global_flags.append(token)
            index += 1
    return None, [], global_flags


def destination_is_protected(refspec):
    """Return the protected branch a refspec targets, or None."""
    # `foo:refs/heads/master` -> take the part after the LAST colon so the
    # refs/heads/ prefix is handled rather than tripping on the first colon.
    destination = refspec.rsplit(":", 1)[-1] if ":" in refspec else refspec
    destination = destination.strip()
    if destination.startswith("refs/heads/"):
        destination = destination[len("refs/heads/") :]
    return destination if destination in PROTECTED else None


def push_targets_protected(args, global_flags=()):
    """
    Return a reason string if a `git push` would write to a protected branch.

    Deliberately branch-independent for explicit refspecs: a push of
    `some-branch:master` from a feature branch must still be blocked.
    """
    if "--all" in args or "--branches" in args or "--mirror" in args:
        return "this push includes all branches, which covers {}".format(
            "/".join(sorted(PROTECTED))
        )

    # `--repo <remote>` names the remote explicitly, so it must not be
    # consumed-and-discarded: every remaining positional is then a refspec,
    # not "the first positional is the remote."
    explicit_remote = False

    positional = []
    index = 0
    while index < len(args):
        token = args[index]
        if token.startswith("-"):
            if token == "--repo" or token.startswith("--repo="):
                explicit_remote = True
                if token == "--repo":
                    index += 2
                else:
                    index += 1
                continue
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

    # First positional is the remote; anything after it is a refspec. When
    # --repo already supplied the remote, every positional left is a refspec.
    if explicit_remote:
        refspecs = positional
    else:
        refspecs = positional[1:] if len(positional) > 1 else []

    for refspec in refspecs:
        protected = destination_is_protected(refspec)
        if protected:
            return "this push targets {}".format(protected)

    if refspecs:
        # Explicit, non-protected destinations. Allow.
        return None

    # No refspec: git resolves the destination from the current branch.
    state = current_branch_state(global_flags=global_flags)
    if state:
        return "{}, so a bare push would write to a protected branch".format(state)

    if git("config", "push.default", global_flags=global_flags) == "matching":
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

    assigns, tokens = unwrap_command(assigns, tokens)
    if not tokens:
        return None

    # `sh -c` may have unwrapped into a whole new command line containing its
    # own shell operators (e.g. `sh -c "cd x && git push --force origin y"`).
    # Re-split and recurse rather than assuming tokens[0] is still the head.
    rejoined = shlex.join(tokens)
    if SEGMENT_SPLIT.search(rejoined):
        for inner_segment in SEGMENT_SPLIT.split(rejoined):
            reason = check_segment(inner_segment)
            if reason:
                return reason
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

    subcommand, args, global_flags = find_subcommand(tokens[1:])
    if subcommand is None:
        return None

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
        reason = push_targets_protected(args, global_flags=global_flags)
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
        state = current_branch_state(global_flags=global_flags)
        if state:
            return "{}. Do not commit directly to a protected branch.\n{}".format(
                state, BRANCH_ADVICE
            )
        return None

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

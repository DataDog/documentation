#!/usr/bin/env python3
"""
Download files from public S3 bucket using AWS CLI.
"""

import subprocess
import sys
import os

def main():
    """Download files from S3 using aws s3 sync."""
    bucket = os.getenv("S3_BUCKET", "dd-websites-sources")
    path_prefix = os.getenv("S3_PATH_PREFIX", "staging")
    
    # Ensure path_prefix ends with / for proper S3 path
    if path_prefix and not path_prefix.endswith("/"):
        path_prefix += "/"
    
    s3_uri = f"s3://{bucket}/{path_prefix}"
    print(f"Downloading from {s3_uri}...")
    
    try:
        result = subprocess.run([
            "aws", "s3", "cp",
            s3_uri,
            ".",
            "--recursive",
            "--no-sign-request",
            "--only-show-errors"
        ], check=True)
        
        print("Download completed!")
        
    except subprocess.CalledProcessError as e:
        print(f"Download failed with exit code {e.returncode}")
        sys.exit(1)
    except FileNotFoundError:
        print("AWS CLI not found")
        sys.exit(1)

if __name__ == "__main__":
    main() 